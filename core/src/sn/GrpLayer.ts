/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2022 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Layer} from './Layer';

import {CmnLib, int, IEvtMng, argChk_Boolean, argChk_Num, getFn} from './CmnLib';
import {HArg, IMain, SYS_DEC_RET} from './CmnInterface';
import {Config} from './Config';
import {SysBase} from './SysBase';
import {Sprite, Container, Texture, BLEND_MODES, utils, Loader, LoaderResource, AnimatedSprite, Rectangle, RenderTexture, Application} from 'pixi.js';
import {EventListenerCtn} from './EventListenerCtn';
import {SoundMng} from './SoundMng';
import {IMakeDesignCast} from './LayerMng';
import {GrpLayDesignCast} from './DesignCast';

export interface IFncCompSpr { (sp: Sprite): void; };

interface Iface {
	fn			: string;
	dx			: number;
	dy			: number;
	blendmode	: number;
};
interface Ihface { [name: string]: Iface; };

interface IResAniSpr {
	aTex	: Texture[];
	meta	: {
		animationSpeed? :number;
	};
}

export class GrpLayer extends Layer {
	static	readonly	#elc	= new EventListenerCtn;

	static	#hFace	: Ihface	= {};

	static	#main	: IMain;
	static	#cfg	: Config;
	static	#appPixi: Application;
	static	#sys	: SysBase;
	static	#glbVol	= 1;
	static	#movVol	= 1;
	static	init(main: IMain, cfg: Config, appPixi: Application, sys: SysBase, sndMng: SoundMng): void {
		GrpLayer.#main = main;
		GrpLayer.#cfg = cfg;
		GrpLayer.#appPixi = appPixi;
		GrpLayer.#sys = sys;
		const fnc = ()=> {
			const vol = GrpLayer.#glbVol * GrpLayer.#movVol;
			for (const fn in GrpLayer.hFn2VElm) GrpLayer.hFn2VElm[fn].volume = vol;
		};
		sndMng.setNoticeChgVolume(
			vol=> {GrpLayer.#glbVol = vol; fnc();},
			vol=> {GrpLayer.#movVol = vol; fnc();}
		);

		if (GrpLayer.#sys.crypto) GrpLayer.#dec2cache = GrpLayer.#dec2cache4Cripto;
	}
	static	#evtMng	: IEvtMng;
	static	setEvtMng(evtMng: IEvtMng) {GrpLayer.#evtMng = evtMng;}
	static	destroy() {
		GrpLayer.#elc.clear();

		GrpLayer.#hFace	= {};
		GrpLayer.hFn2ResAniSpr	= {};
//		GrpLayer.ldrHFn	= {};
		GrpLayer.hFn2VElm	= {};
	}

	readonly	#idc	= new GrpLayDesignCast(this.spLay, this);
	constructor() {
		super();
		if (CmnLib.isDbg) {
			this.setSp = sp=> this.#idc.setSp(sp);
			this.cvsResize = ()=> {super.cvsResize(); this.#idc.cvsResize();}
		}
	}
	private	setSp(_sp: Sprite) {}

	#csvFn		= '';
	#sBkFn		= '';
	#sBkFace	= '';
	static	hFn2ResAniSpr	: {[name: string]:	IResAniSpr} = {};
	override readonly	lay = (hArg: HArg)=> this.laySub(hArg, isStop=> {
		if (isStop) GrpLayer.#main.resume();
	});
	private	laySub(hArg: HArg, resolve: (isStop: boolean)=> void): boolean {
		const {fn, face = ''} = hArg;
		this.#idc.sethArg(hArg);
		if (! fn) {
			super.lay(hArg);

			if (this.spLay.children.length > 0) this.setPos(hArg);
			this.#sBkFn = '';
			this.#csvFn = this.#sBkFace = face;
			resolve(false);
			return false;
		}

		const inFn = 'fn' in hArg;
		const inFace = 'face' in hArg;

		this.clearLay({filter: 'true'});
		if (inFn) this.#sBkFn = fn;	// clearLay()後に置く事
		if (inFace) this.#sBkFace = face;
		super.lay(hArg);

		hArg.dx = 0;
		hArg.dy = 0;

		const ret = GrpLayer.csv2Sprites(
			this.#csvFn = fn + (face ? ','+ face : ''),
			this.spLay,
			sp=> {
				if ('width' in hArg || 'height' in hArg) {
					sp.width = argChk_Num(hArg, 'width', 0);
					sp.height = argChk_Num(hArg, 'height', 0);
				}
				this.#width = sp.width;
				this.#height = sp.height;
				Layer.setXY(sp, hArg, this.spLay, true);
			//	if (hArg.page === 'fore') this.rsvEvent(sp);	// ======
					// [lay page=fore]のみswfアニメ終了イベント発生
				this.setSp(sp);
			},
			isStop=> {
				Layer.setBlendmode(this.spLay, hArg);
				resolve(isStop);
			}
		);
		if (! ret) resolve(false);
		return ret;
	}
	#width	= 0;
	#height	= 0;
	override	get	width() {return this.#width}
	override	get	height() {return this.#height}

//	static #ldrHFn: {[name: string]: 1} = {};
	static csv2Sprites(csv: string, parent: Container | undefined, fncFirstComp: IFncCompSpr, fncAllComp: (isStop: boolean)=> void = ()=> {}): boolean {
		// Data URI
		let needLoad = false;
		if (csv.slice(0, 5) === 'data:') {
			const fnc = ()=> {
				const sp = Sprite.from(csv);
				parent?.addChild(sp);
				fncFirstComp(sp);
				fncAllComp(needLoad);
			};
			if (csv in utils.TextureCache) fnc();
			else {needLoad = true; (new Loader).add(csv, csv).load(fnc);}

			return needLoad;
		}

		const aComp: {fn: string, fnc: IFncCompSpr}[] = [];
		const ldr = new Loader;
		csv.split(',').forEach((fn, i)=> {
			if (! fn) throw 'face属性に空要素が含まれます';

			// 差分絵を重ねる
			const f = GrpLayer.#hFace[fn] || {
				fn: fn,
				dx: 0,
				dy: 0,
				blendmode: BLEND_MODES.NORMAL
			};
			const fnc = (i === 0) ?fncFirstComp :(sp: Sprite)=> {
				sp.x = f.dx;
				sp.y = f.dy;
				sp.blendMode = f.blendmode;
			};
			aComp.push({fn: f.fn, fnc});

			if (f.fn in GrpLayer.hFn2ResAniSpr) return;
			if (f.fn in utils.TextureCache) return;
			if (f.fn in Loader.shared.resources) return;
//			if (f.fn in GrpLayer.ldrHFn) {
				// ここに来るという中途半端な状態がある。お陰で警告が出てしまう
// 以下の試みは効かない
//	Texture.removeFromCache(f.fn);
//	delete utils.TextureCache[f.fn];
//	delete Loader.shared.resources[f.fn];
				// return;	// これは厳禁、御法度。
					// 画像ボタンや文字ボタン背景で同じ画像を、間を置かずロードした場合に最初一つしか表示されなくなる。以下は確認用
					// http://localhost:8082/index.html?cur=ch_button
//			}
//			GrpLayer.ldrHFn[f.fn] = 1;

			needLoad = true;
			const url = GrpLayer.#cfg.searchPath(f.fn, Config.EXT_SPRITE);
			const xt = this.#sys.crypto
			? {xhrType: (url.slice(-5) === '.json')
				? LoaderResource.XHR_RESPONSE_TYPE.TEXT
				: LoaderResource.XHR_RESPONSE_TYPE.BUFFER}
			: {};
			ldr.add({...xt, name: f.fn, url});
		});

		const fncLoaded = (hRes: {[fn: string]: LoaderResource})=> {
			for (const v of aComp) {
				const sp = GrpLayer.#mkSprite(v.fn, hRes);
				/**/sp.name = v.fn;
				parent?.addChild(sp);
				v.fnc(sp);
			}
			fncAllComp(needLoad);
		}
		if (needLoad) {
			ldr.use((res, next)=> {
				this.#sys.dec(res.extension, res.data)
				.then(r=> GrpLayer.#dec2cache(r, res, ()=> next?.()))
				.catch(e=> this.#main.errScript(`Graphic ロード失敗です fn:${res.name} ${e}`, false));
			})
			.load((_ldr, hRes)=> fncLoaded(hRes));
		}
		else fncLoaded({});

		return needLoad;
	}
	static #dec2cache = (_r: SYS_DEC_RET, res: any, next: ()=> void)=> {
		switch (res.type) {
			case LoaderResource.TYPE.JSON:
				// アニメ登録
				const aFn: string[] = res.spritesheet._frameKeys;
				GrpLayer.#sortAFrameName(aFn);
				GrpLayer.hFn2ResAniSpr[res.name] = {
					aTex: aFn.map(fn=> Texture.from(fn)),
					meta: res.data.meta,
				};
				break;

			case LoaderResource.TYPE.VIDEO:
				const hve = res.data as HTMLVideoElement;
				hve.volume = GrpLayer.#glbVol;
				GrpLayer.hFn2VElm[res.name] = hve;
		}
		next();
	}
	static #sortAFrameName(aFn: string[]) {
		const a_base_name = /([^\d]+)\d+\.(\w+)/.exec(aFn[0]);
		if (! a_base_name) return

		const is = a_base_name[1].length;
		const ie = -a_base_name[2].length -1;
		aFn.sort((a, b)=>
			(int(a.slice(is, ie)) > int(b.slice(is, ie))) ?1 :-1
		);
	}
	static #dec2cache4Cripto(r: SYS_DEC_RET, res: any, next: ()=> void) {
		res.data = r;
		if (res.extension === 'bin') {
			if (r instanceof HTMLImageElement) {
				res.texture = Texture.fromLoader(r, res.url, res.name);
				//Texture.addToCache(Texture.from(r), res.name);
				// res.texture = Texture.from(r);
					// でも良いが、キャッシュ追加と、それでcsv2Sprites()内で使用するので
				res.type = LoaderResource.TYPE.IMAGE;
				URL.revokeObjectURL(r.src);
			}
			else if (r instanceof HTMLVideoElement) {
				r.volume = GrpLayer.#glbVol;
				GrpLayer.hFn2VElm[res.name] = r;

				res.type = LoaderResource.TYPE.VIDEO;
				URL.revokeObjectURL(r.src);
			}
		}
		if (res.extension !== 'json') {next(); return;}

		if (typeof r !== 'string') {next(); return;}
		const o = res.data = JSON.parse(r);
		res.type = LoaderResource.TYPE.JSON;
		if (! o.meta?.image) {next(); return;}
		const fn = getFn(o.meta.image);
		const url = GrpLayer.#cfg.searchPath(fn, Config.EXT_SPRITE);
		(new Loader)
		.use((res2, next2)=> {
			this.#sys.dec(res2.extension, res2.data)
			.then(r2=> {
				res2.data = r2;
				if (r2 instanceof HTMLImageElement) {
					res2.type = LoaderResource.TYPE.IMAGE;
					URL.revokeObjectURL(r2.src);
				}
				next2?.();
			})
			.catch(e=> this.#main.errScript(`Graphic ロード失敗です dec2res4Cripto fn:${res2.name} ${e}`, false));
		})
		.add({name: fn, url, xhrType: LoaderResource.XHR_RESPONSE_TYPE.BUFFER})
		.load((ldr, _hRes)=> {
			// アニメ登録
			for (const fn in ldr.resources) {
				const bt = Texture.from(ldr.resources[fn].data).baseTexture;
				const aFn: any[] = Object.values(o.frames);
				GrpLayer.#sortAFrameName(aFn);
				GrpLayer.hFn2ResAniSpr[res.name] = {
					aTex: aFn.map(f=> new Texture(
						bt,
						new Rectangle(
							f.frame.x,
							f.frame.y,
							f.frame.w,
							f.frame.h),
					)),
					meta: o.meta,
				};
			}

			next();
		});
	}
	static #mkSprite(fn: string, hRes: {[fn: string]: LoaderResource}): Sprite {
		const ras = GrpLayer.hFn2ResAniSpr[fn];
		if (ras) {
			const asp = new AnimatedSprite(ras.aTex);
			asp.animationSpeed = ras.meta.animationSpeed ?? 1.0;
			asp.play();
			return asp;
		}
		if (fn in utils.TextureCache) return Sprite.from(fn);
		if (fn in GrpLayer.hFn2VElm) return Sprite.from(GrpLayer.hFn2VElm[fn]);

		return (fn in hRes) ?new Sprite(hRes[fn].texture) :new Sprite;
	}
	static hFn2VElm	: {[name: string]: HTMLVideoElement} = {};
	static wv(hArg: HArg) {
		// 動画ファイル名指定でいいかなと。なぜなら「ループで再生しつつ」
		// 同ファイル名の別の動画の再生は待ちたい、なんて状況は普通は無いだろうと
		const {fn} = hArg;
		if (! fn) throw 'fnは必須です';
		const hve = GrpLayer.hFn2VElm[fn];
		if (! hve || hve.loop) return false;
		if (hve.ended) {delete GrpLayer.hFn2VElm[fn]; return false;}

		const fnc = ()=> {
			hve.removeEventListener('ended', fnc);
			delete GrpLayer.hFn2VElm[fn];
			this.#main.resume();
		};
		hve.addEventListener('ended', fnc, {once: true, passive: true});

		return GrpLayer.#evtMng.waitEvent(
			()=> {hve.pause(); fnc();},
			argChk_Boolean(hArg, 'canskip', true),
			argChk_Boolean(hArg, 'global', false),
		);
	}


	override	renderStart() {
		this.#rtTsy = RenderTexture.create({
			width	: CmnLib.stageW,
			height	: CmnLib.stageH,
		});
		this.#spTsy = new Sprite(this.#rtTsy);
		this.#spTsy.visible = false;
		this.spLay.addChildAt(this.#spTsy, 0);
		this.#spTsy.position.set(-this.spLay.x, -this.spLay.y);

		let fncRenderFore = ()=> {
			const a = this.spLay.alpha;
			this.spLay.alpha = 1;
			this.spLay.children.forEach(s=> s.visible = true);
			this.#spTsy.visible = false;
			GrpLayer.#appPixi.renderer.render(this.spLay, {renderTexture: this.#rtTsy});	// clear: true
			this.spLay.alpha = a;
			this.spLay.children.forEach(s=> s.visible = false);
		}
		if (! this.containMovement) {
			let oldFnc = fncRenderFore;	// 動きがないなら最初に一度
			fncRenderFore = ()=> {fncRenderFore = ()=> {}; oldFnc();};
		}
		this.#fncRender = ()=> {
			fncRenderFore();
			this.#spTsy.visible = true;
		};
		GrpLayer.#appPixi.ticker.add(this.#fncRender);
	}
	#rtTsy	: RenderTexture;
	#spTsy	: Sprite;
	#fncRender = ()=> {};
	override	renderEnd() {
		GrpLayer.#appPixi.ticker.remove(this.#fncRender);
		this.spLay.removeChild(this.#spTsy);
		this.spLay.children.forEach(s=> s.visible = true);
		this.#spTsy.destroy(true);
	}


	static	loadPic2Img(src: string, img: HTMLImageElement, onload?: (img2: HTMLImageElement)=> void) {
		const oUrl = this.#hEncImgOUrl[src];
		if (oUrl) {img.src = oUrl; return}

		const aImg = this.#hAEncImg[src];
		if (aImg) {aImg.push(img); return}
		this.#hAEncImg[src] = [img];

		const url2 = GrpLayer.#cfg.searchPath(src, Config.EXT_SPRITE);
		const ld2 = (new Loader)
		.add({name: src, url: url2, xhrType: LoaderResource.XHR_RESPONSE_TYPE.BUFFER,});
		if (GrpLayer.#sys.crypto) ld2.use((res, next)=> {
			GrpLayer.#sys.dec(res.extension, res.data)
			.then(r=> {
				if (res.extension !== 'bin') {next?.(); return;}
				res.data = r;
				if (r instanceof HTMLImageElement) {
					res.type = LoaderResource.TYPE.IMAGE;
				}
				next?.();
			})
			.catch(e=> GrpLayer.#main.errScript(`GrpLayer loadPic ロード失敗です fn:${res.name} ${e}`, false));
		})
		ld2.load((_ldr, hRes)=> {
			for (const s2 in hRes) {
				const u2 = this.#hEncImgOUrl[s2] = hRes[s2].data.src;
				this.#hAEncImg[s2].forEach(i=> {
					i.src = u2;
					if (onload) i.onload = ()=> onload(i);
				});
				delete this.#hAEncImg[s2];
			//	URL.revokeObjectURL(u2);// 画面遷移で毎回再生成するので
			}
		});
	}
	static	#hAEncImg		: {[name: string]: HTMLImageElement[]}	= {};
	static	#hEncImgOUrl	: {[name: string]: string}				= {};


	setPos(hArg: HArg): void {
		Layer.setXY(
			(this.spLay.children.length === 0) ?this.spLay :this.spLay.children[0],
			hArg,
			this.spLay,
			true
		);
	}

	static	add_face(hArg: HArg): boolean {
		const {name} = hArg;
		if (! name) throw 'nameは必須です';
		if (name in GrpLayer.#hFace) throw '一つのname（'+ name +'）に対して同じ画像を複数割り当てられません';

		const {fn = name} = hArg;
		GrpLayer.#hFace[name] = {
			fn,
			dx: argChk_Num(hArg, 'dx', 0),
			dy: argChk_Num(hArg, 'dy', 0),
			blendmode: Layer.getBlendmodeNum(hArg.blendmode || '')
		};

		return false;
	}
	static	clearFace2Name(): void {GrpLayer.#hFace = {};}

	// アニメ・動画を含むか
	override get containMovement(): boolean {
		if (this.#csvFn === '') return false;

		const c = this.spLay.children;
		return this.#csvFn.split(',').some(
			(fn, i)=> c[i] instanceof AnimatedSprite || GrpLayer.hFn2VElm[fn]
		);
	}

	override clearLay(hArg: HArg): void {
		super.clearLay(hArg);
		for (const c of this.spLay.removeChildren()) c.destroy();
		this.#sBkFn	= '';
		this.#sBkFace= '';
		this.#csvFn	= '';
	}
	override readonly record = ()=> Object.assign(super.record(), {
		sBkFn		: this.#sBkFn,
		sBkFace		: this.#sBkFace,
		idc_hArg	: this.#idc.gethArg(),
	});
	override playback(hLay: any, aPrm: Promise<void>[]): void {
		super.playback(hLay, aPrm);
		if (hLay.sBkFn === '' && hLay.sBkFace === '') {
			this.#sBkFn		= hLay.sBkFn;
			this.#sBkFace	= hLay.sBkFace;
			this.#idc.sethArg(hLay.idc_hArg);
			return;
		}

		aPrm.push(new Promise(re=> this.laySub(
			{fn: hLay.sBkFn, face: hLay.sBkFace, left: hLay.x, top: hLay.y, alpha: hLay.alpha, blendmode: hLay.blendMode, rotation: hLay.rotation, scale_x: hLay.scale_x, scale_y: hLay.scale_y},
			_isStop=> {this.spLay.position.set(hLay.x, hLay.y); re();},
				// Layer.setXY()の後に再度移動
		)));
	}

	override makeDesignCast(gdc: IMakeDesignCast) {
		if (! this.spLay.visible) return;
		gdc(this.#idc);
	}
	//makeDesignCastChildren(_gdc: IMakeDesignCast) {}

	override cvsResize() {super.cvsResize();}

	override showDesignCast() {this.#idc.visible = true;}
	//showDesignCastChildren() {}

	override readonly dump = ()=> super.dump() +`, "pic":"${this.#csvFn}"`;

}
