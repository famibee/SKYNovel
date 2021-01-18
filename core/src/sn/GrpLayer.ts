/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2021 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Layer} from './Layer';

import {CmnLib, int, IEvtMng, argChk_Boolean, argChk_Num, getFn, getExt} from './CmnLib';
import {HArg, IMain} from './CmnInterface';
import {Config} from './Config';
import {SysBase} from './SysBase';
import {Sprite, Container, Texture, BLEND_MODES, utils, Loader, LoaderResource, AnimatedSprite} from 'pixi.js';
import {EventListenerCtn} from './EventListenerCtn';
import {SoundMng} from './SoundMng';

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
	private static	readonly	elc		= new EventListenerCtn;

	private static	hFace	: Ihface	= {};

	private static	main	: IMain;
	private static	cfg		: Config;
	private static	sys		: SysBase;
	private static	glbVol	: number	= 1;
	private static	movVol	: number	= 1;
	static	init(main: IMain, cfg: Config, sys: SysBase, sndMng: SoundMng): void {
		GrpLayer.main = main;
		GrpLayer.cfg = cfg;
		GrpLayer.sys = sys;
		const fnc = ()=> {
			const vol = GrpLayer.glbVol * GrpLayer.movVol;
			for (const fn in GrpLayer.fn2Video) GrpLayer.fn2Video[fn].volume = vol;
		};
		sndMng.setNoticeChgVolume(
			vol=> {GrpLayer.glbVol = vol; fnc();},
			vol=> {GrpLayer.movVol = vol; fnc();}
		);

		if (GrpLayer.sys.crypto) GrpLayer.preThen = GrpLayer.preThen4Cripto;
	}
	private static	evtMng	: IEvtMng;
	static	setEvtMng(evtMng: IEvtMng) {GrpLayer.evtMng = evtMng;}
	static	destroy() {
		GrpLayer.elc.clear();

		GrpLayer.hFace	= {};
		GrpLayer.hFn2ResAniSpr	= {};
		GrpLayer.ldrHFn	= {};
		GrpLayer.fn2Video	= {};
	}

	private csvFn		= '';
	private sBkFn		= '';
	private sBkFace		= '';
	static	hFn2ResAniSpr	: {[name: string]:	IResAniSpr} = {};
	readonly	lay = (hArg: HArg)=> this.laySub(hArg, isStop=> {
		if (isStop) GrpLayer.main.resume();
	});
	private	laySub(hArg: HArg, resolve: (isStop: boolean)=> void): boolean {
		const fn = hArg.fn;
		const face = hArg.face ?? '';
		if (! fn) {
			super.lay(hArg);

			if (this.cnt.children.length > 0) this.setPos(hArg);
			this.sBkFn = '';
			this.csvFn = this.sBkFace = face;
			resolve(false);
			return false;
		}

		const inFn = 'fn' in hArg;
		const inFace = 'face' in hArg;

		this.clearLay({filter: 'true'});
		if (inFn) this.sBkFn = fn;	// clearLay()後に置く事
		if (inFace) this.sBkFace = face;
		super.lay(hArg);

		hArg.dx = 0;
		hArg.dy = 0;

		const ret = GrpLayer.csv2Sprites(
			this.csvFn = fn + (face ? ','+ face : ''),
			this.cnt,
			sp=> {
				Layer.setXY(sp, hArg, this.cnt, true);
			//	if (hArg.page === 'fore') this.rsvEvent(sp);	// ======
					// [lay page=fore]のみswfアニメ終了イベント発生
			},
			isStop=> {
				Layer.setBlendmode(this.cnt, hArg);
				resolve(isStop);
			}
		);
		if (! ret) resolve(false);
		return ret;
	}

	private	static ldrHFn: {[name: string]: 1} = {};
	static csv2Sprites(csv: string, parent: Container | null, fncFirstComp: IFncCompSpr, fncAllComp: (isStop: boolean)=> void = ()=> {}): boolean {
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
			else {needLoad = true; new Loader().add(csv, csv).load(fnc);}

			return needLoad;
		}

		const aComp: {fn: string, fnc: IFncCompSpr}[] = [];
		const ldr = new Loader();
		csv.split(',').forEach((fn, i)=> {
			if (! fn) throw 'face属性に空要素が含まれます';

			// 差分絵を重ねる
			const f = GrpLayer.hFace[fn] || {
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
			aComp.push({fn: f.fn, fnc: fnc});

			if (f.fn in GrpLayer.hFn2ResAniSpr) return;
			if (f.fn in utils.TextureCache) return;
			if (f.fn in Loader.shared.resources) return;
			if (f.fn in GrpLayer.ldrHFn) return;
			GrpLayer.ldrHFn[f.fn] = 1;

			needLoad = true;
			const path = GrpLayer.cfg.searchPath(f.fn, Config.EXT_SPRITE);
			const xt = this.sys.crypto
			? {xhrType: (path.slice(-5) === '.json')
				? LoaderResource.XHR_RESPONSE_TYPE.TEXT
				: LoaderResource.XHR_RESPONSE_TYPE.BUFFER}
			: {};

			ldr.add(f.fn, path, xt);
		});

		const fncLoaded = (res: any)=> {
			for (const v of aComp) {
				const sp = GrpLayer.mkSprite(v.fn, res);
				parent?.addChild(sp);
				v.fnc(sp);
			}
			fncAllComp(needLoad);
		}
		if (needLoad) {
			ldr.pre((res: LoaderResource, next: Function)=> res.load(()=> {
				this.sys.pre(res.extension, res.data)
				.then(r=> GrpLayer.preThen(r, res, next))
				.catch(e=> this.main.errScript(`Graphic ロード失敗です fn:${res.name} ${e}`, false));
			}))
			.load((_ldr: any, hRes: any)=> fncLoaded(hRes));
		}
		else fncLoaded(utils.TextureCache);

		return needLoad;
	}
	private static preThen = (_r: any, _res: LoaderResource, next: Function)=> next();
	private static preThen4Cripto(r: any, res: LoaderResource, next: Function): void {
		res.data = r;
		if (res.extension === 'bin') {
			if (res.data instanceof HTMLImageElement) {
				res.type = LoaderResource.TYPE.IMAGE;
				URL.revokeObjectURL(res.data.src);
			}
			else if (res.data instanceof HTMLVideoElement) {
				res.type = LoaderResource.TYPE.VIDEO;
				URL.revokeObjectURL(res.data.src);
			}
		}
		if (res.extension !== 'json') {next(); return;}

		const o = res.data = JSON.parse(r);
		res.type = LoaderResource.TYPE.JSON;
		if (! o.meta?.image) {next(); return;}

		const fn = getFn(o.meta.image);
		const url = GrpLayer.cfg.searchPath(fn, Config.EXT_SPRITE);
		(new Loader())
		.pre((res2: LoaderResource, next2: Function)=> res2.load(()=> {
			this.sys.pre(res2.extension, res2.data)
			.then(r=> {
				res2.data = r;
				if (res2.data instanceof HTMLImageElement) {
					res2.type = LoaderResource.TYPE.IMAGE;
					const mime = `image/${getExt(o.meta.image)}`;
					o.meta.image = GrpLayer.im2Base64(res2.data, mime);
					res2.data = o.meta.image;
				}
			/*	else if (res2.data instanceof HTMLVideoElement) {
					res2.type = LoaderResource.TYPE.VIDEO;
					o.meta.image = res2.data.src;
				}*/
				next2();
			})
			.catch(e=> this.main.errScript(`Graphic ロード失敗です fn:${res2.name} ${e}`, false));
		}))
		.add(fn, url, {xhrType: LoaderResource.XHR_RESPONSE_TYPE.BUFFER})
		.load(()=> next());
	}
	private static im2Base64(img: HTMLImageElement, mime: string) {
		const cvs = document.createElement('canvas');
		cvs.width  = img.width;
		cvs.height = img.height;
		const ctx = cvs.getContext('2d');
		ctx?.drawImage(img, 0, 0);
		return cvs.toDataURL(mime);
	}
	private static mkSprite(fn: string, res: LoaderResource): Sprite {
		//console.log(`fn:GrpLayer.ts line:153 fn:${fn} a:%O b:%O c:%O`, GrpLayer.hFn2ResAniSpr[fn], utils.TextureCache[fn], Loader.shared.resources[fn]);
		if (fn in utils.TextureCache) return Sprite.from(fn);
		const ras = GrpLayer.hFn2ResAniSpr[fn];
		if (ras) {
			const asp = new AnimatedSprite(ras.aTex);
			asp.animationSpeed = ras.meta.animationSpeed ?? 1.0;
			asp.play();
			return asp;
		}

		const r = (res as any)[fn];
		if (! r) return new Sprite;	// ロード中にリソース削除

		switch (r.type) {
			case LoaderResource.TYPE.JSON:	// アニメスプライト
				const aFK: string[] = r.spritesheet._frameKeys;
				const a_base_name = /([^\d]+)\d+\.(\w+)/.exec(aFK[0]);
				if (a_base_name) {
					const is = a_base_name[1].length;
					const ie = -a_base_name[2].length - 1;
					aFK.sort((a, b)=>
						(int(a.slice(is, ie)) > int(b.slice(is, ie))) ?1 :-1
					);
				}
				const aTex: Texture[] = [];
				aFK.forEach(v=> aTex.push(Texture.from(v)));
				GrpLayer.hFn2ResAniSpr[r.name] = {aTex: aTex, meta: r.data.meta};
				return GrpLayer.mkSprite(fn, res);

			case LoaderResource.TYPE.VIDEO:
				const hve = r.data as HTMLVideoElement;
				hve.volume = GrpLayer.glbVol;
				GrpLayer.fn2Video[fn] = hve;
				delete GrpLayer.ldrHFn[fn];	// 毎回来て欲しいのでキャッシュとしない
				return Sprite.from(r.data);

			default:	return new Sprite(r.texture);
		}
	}
	static fn2Video	: {[name: string]: HTMLVideoElement} = {};
	static wv(hArg: HArg) {
		// 動画ファイル名指定でいいかなと。なぜなら「ループで再生しつつ」
		// 同ファイル名の別の動画の再生は待ちたい、なんて状況は普通は無いだろうと
		const fn = hArg.fn;
		if (! fn) throw 'fnは必須です';
		const hve = GrpLayer.fn2Video[fn];
		if (! hve || hve.loop) return false;
		if (hve.ended) {delete GrpLayer.fn2Video[fn]; return false;}

		const fnc = ()=> {
			hve.removeEventListener('ended', fnc);
			delete GrpLayer.fn2Video[fn];
			this.main.resume();
		};
		hve.addEventListener('ended', fnc, {once: true, passive: true});

		return GrpLayer.evtMng.waitEvent(
			()=> {hve.pause(); fnc();},
			argChk_Boolean(hArg, 'canskip', true),
			argChk_Boolean(hArg, 'global', false),
		);
	}

	setPos(hArg: HArg): void {
		Layer.setXY(
			(this.cnt.children.length === 0) ?this.cnt :this.cnt.children[0],
			hArg,
			this.cnt,
			true
		);
	}

	static	add_face(hArg: HArg): boolean {
		const name = hArg.name;
		if (! name) throw 'nameは必須です';
		if (name in GrpLayer.hFace) throw '一つのname（'+ name +'）に対して同じ画像を複数割り当てられません';

		const fn = hArg.fn ?? name;
		GrpLayer.hFace[name] = {
			fn: fn,
			dx: argChk_Num(hArg, 'dx', 0) * CmnLib.retinaRate,
			dy: argChk_Num(hArg, 'dy', 0) * CmnLib.retinaRate,
			blendmode: Layer.getBlendmodeNum(hArg.blendmode || '')
		};

		return false;
	}
	static	clearFace2Name(): void {GrpLayer.hFace = {};}

	clearLay(hArg: HArg): void {
		super.clearLay(hArg);
		for (const c of this.cnt.removeChildren()) c.destroy();
		this.sBkFn	= '';
		this.sBkFace= '';
		this.csvFn	= '';
	}
	readonly record = ()=> Object.assign(super.record(), {
		sBkFn	: this.sBkFn,
		sBkFace	: this.sBkFace,
	});
	playback(hLay: any, aPrm: Promise<void>[]): void {
		super.playback(hLay, aPrm);
		if (hLay.sBkFn === '' && hLay.sBkFace === '') {
			this.sBkFn	= hLay.sBkFn;
			this.sBkFace= hLay.sBkFace;
			return;
		}

		aPrm.push(new Promise(re=> this.laySub(
			{fn: hLay.sBkFn, face: hLay.sBkFace, left: hLay.x, top: hLay.y, alpha: hLay.alpha, blendmode: hLay.blendMode, rotation: hLay.rotation, scale_x: hLay.scale_x, scale_y: hLay.scale_y},
			_isStop=> {this.cnt.position.set(hLay.x, hLay.y); re();},
				// Layer.setXY()の後に再度移動
		)));
	}

	readonly dump = ()=> super.dump() +`, "pic":"${this.csvFn}"`;

}
