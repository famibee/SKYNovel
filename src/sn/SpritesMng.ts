/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2023-2023 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Sprite, Container, Texture, AnimatedSprite, LoaderResource, utils, Loader, Rectangle, BLEND_MODES} from 'pixi.js';
import {Config} from './Config';
import {IEvtMng, argChk_Boolean, argChk_Num, getFn, int} from './CmnLib';
import {IMain, IVariable, SYS_DEC_RET} from './CmnInterface';
import {DebugMng} from './DebugMng';
import {SEARCH_PATH_ARG_EXT} from './ConfigBase';
import {SysBase} from './SysBase';
import {SoundMng} from './SoundMng';
import {HArg} from './Grammar';
import {Layer} from './Layer';

type IFncCompSpr = (sp: Sprite)=> void;

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


export class SpritesMng {
	static	#cfg	: Config;
	static	#val	: IVariable;
	static	#sys	: SysBase;
	static	#main	: IMain;
	static	init(cfg: Config, val: IVariable, sys: SysBase, main: IMain, sndMng: SoundMng) {
		SpritesMng.#cfg = cfg;
		SpritesMng.#val = val;
		SpritesMng.#sys = sys;
		SpritesMng.#main = main;
		if (sys.crypto) SpritesMng.#dec2cache = SpritesMng.#dec2cache4Cripto;

		const fnc = ()=> {
			const vol = SpritesMng.#glbVol * SpritesMng.#movVol;
			for (const v of Object.values(SpritesMng.#hFn2VElm)) v.volume = vol;
		};
		sndMng.setNoticeChgVolume(
			vol=> {SpritesMng.#glbVol = vol; fnc()},
			vol=> {SpritesMng.#movVol = vol; fnc()}
		);
	}
	static	#movVol	= 1;
	static	#glbVol	= 1;

	static	#evtMng	: IEvtMng;
	static	setEvtMng(evtMng: IEvtMng) {SpritesMng.#evtMng = evtMng}


	constructor(readonly csvFn = '', readonly spLay?: Container, private fncFirstComp: IFncCompSpr = ()=> {}, private fncAllComp: (isStop: boolean)=> void = ()=> {}) {
		if (! csvFn) return;

		this.#addChild = spLay ? sp=> {spLay.addChild(sp); this.#aSp.push(sp)} : ()=> {};
		this.ret = SpritesMng.#csv2Sprites(
			csvFn,
			sp=> this.fncFirstComp(sp),			// 差し替え考慮
			isStop=> this.fncAllComp(isStop),	// 差し替え考慮
			sp=> this.#addChild(sp)				// 差し替え考慮
		);
	}
	readonly ret: boolean		= false;
	#addChild	: (sp: Sprite)=> void;
	#aSp		: Container[]	= [];

	destroy() {		// これをやるためのクラス、とすら云える
		this.fncFirstComp	= ()=> {};
		this.fncAllComp		= ()=> {};
		this.#addChild		= ()=> {};

		this.#aSp.forEach(sp=> {sp.parent?.removeChild(sp); sp.destroy()});
		this.#aSp = [];
	}

	static	destroy() {
		SpritesMng.#hFace	= {};
		SpritesMng.#hFn2ResAniSpr	= {};
//		SpritesMng.ldrHFn	= {};
		SpritesMng.#hFn2VElm	= {};
	}


//	static #ldrHFn: {[fn: string]: 1} = {};
	static #csv2Sprites(csv: string, fncFirstComp: IFncCompSpr, fncAllComp: (isStop: boolean)=> void, addChild: (sp: Sprite)=> void): boolean {
		// Data URI
		let needLoad = false;
		if (csv.slice(0, 5) === 'data:') {
			const fnc = ()=> {
				const sp = Sprite.from(csv);
				addChild(sp);
				fncFirstComp(sp);
				fncAllComp(needLoad);
			};
			if (csv in utils.TextureCache) fnc();
			else {needLoad = true; (new Loader).add(csv, csv).load(fnc)}

			return needLoad;
		}

		const aComp: {fn: string, fnc: IFncCompSpr}[] = [];
		const ldr = new Loader;
		csv.split(',').forEach((fn0, i)=> {
			if (! fn0) throw 'face属性に空要素が含まれます';

			// 差分絵を重ねる
			const {dx, dy, blendmode, fn} = SpritesMng.#hFace[fn0] || {
				fn	: fn0,
				dx	: 0,
				dy	: 0,
				blendmode	: BLEND_MODES.NORMAL
			};
			const fnc = (i === 0) ?fncFirstComp :(sp: Sprite)=> {
				sp.x = dx;
				sp.y = dy;
				sp.blendMode = blendmode;
			};
			aComp.push({fn, fnc});

			if (fn in SpritesMng.#hFn2ResAniSpr) return;
			if (fn in utils.TextureCache) return;
			if (fn in Loader.shared.resources) return;
//			if (fn in SpritesMng.ldrHFn) {
				// ここに来るという中途半端な状態がある。お陰で警告が出てしまう
// 以下の試みは効かない
//	Texture.removeFromCache(fn);
//	delete utils.TextureCache[fn];
//	delete Loader.shared.resources[fn];
				// return;	// これは厳禁、御法度。
					// 画像ボタンや文字ボタン背景で同じ画像を、間を置かずロードした場合に最初一つしか表示されなくなる。以下は確認用
					// http://localhost:8082/index.html?cur=ch_button
//			}
//			SpritesMng.ldrHFn[fn] = 1;

			needLoad = true;
			const url = SpritesMng.#cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SP_GSM);
			const xt = this.#sys.crypto
			? {xhrType: (url.slice(-5) === '.json')
				? LoaderResource.XHR_RESPONSE_TYPE.TEXT
				: LoaderResource.XHR_RESPONSE_TYPE.BUFFER}
			: {};
			ldr.add({...xt, name: fn, url});
		});

		const fncLoaded = (hRes: {[fn: string]: LoaderResource})=> {
			for (const {fn, fnc} of aComp) {
				const sp = SpritesMng.#mkSprite(fn, hRes);
				sp.name = fn;	// 4 Debug?
				addChild(sp);
				fnc(sp);
			}
			fncAllComp(needLoad);
		}
		if (needLoad) {
			ldr.use((res, next)=> {
				this.#sys.dec(res.extension, res.data)
				.then(r=> SpritesMng.#dec2cache(r, res, ()=> next?.()))
				.catch(e=> this.#main.errScript(`Graphic ロード失敗です fn:${res.name} ${e}`, false));
			})
			.load((_ldr, hRes)=> fncLoaded(hRes));
		}
		else fncLoaded({});

		return needLoad;
	}
	static	#hFace			: Ihface	= {};
	static	#hFn2ResAniSpr	: {[fn: string]:	IResAniSpr} = {};


	static #dec2cache = (_r: SYS_DEC_RET, res: any, next: ()=> void)=> {
		switch (res.type) {
			case LoaderResource.TYPE.JSON:
				// アニメ登録
				const aFn: string[] = res.spritesheet._frameKeys;
				SpritesMng.#sortAFrameName(aFn);
				SpritesMng.#hFn2ResAniSpr[res.name] = {
					aTex: aFn.map(fn=> Texture.from(fn)),
					meta: res.data.meta,
				};
				break;

			case LoaderResource.TYPE.VIDEO:
				const hve = res.data as HTMLVideoElement;
				hve.volume = SpritesMng.#glbVol;
				SpritesMng.#hFn2VElm[res.name] = SpritesMng.#charmVideoElm(hve);
		}
		next();
	}
	static #sortAFrameName(aFn: string[]): string[] {
		const a_base_name = /([^\d]+)\d+\.(\w+)/.exec(aFn[0]);
		if (! a_base_name) return [];

		const is = a_base_name[1].length;
		const ie = -a_base_name[2].length -1;
		return aFn.sort((a, b)=>
			int(a.slice(is, ie)) > int(b.slice(is, ie)) ?1 :-1
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
//				URL.revokeObjectURL(r.src);	// TODO: キャッシュ破棄
			}
			else if (r instanceof HTMLVideoElement) {
				r.volume = SpritesMng.#glbVol;
				SpritesMng.#hFn2VElm[res.name] = SpritesMng.#charmVideoElm(r);

				res.type = LoaderResource.TYPE.VIDEO;
//				URL.revokeObjectURL(r.src);
			}
		}
		if (res.extension !== 'json') {next(); return}

		// アニメ登録
		if (typeof r !== 'string') {next(); return}

		const {meta, frames} = res.data = JSON.parse(r);
		res.type = LoaderResource.TYPE.JSON;
		if (! meta?.image) {next(); return}

		const fn = getFn(meta.image);
		const url = SpritesMng.#cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SP_GSM);
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
			for (const {data} of Object.values(ldr.resources)) {
				const {baseTexture} = Texture.from(data);
				const aFr = Object.values(<{[nm: string]: {
					frame: {x: number; y: number; w: number; h: number;}
				}}>frames);
				SpritesMng.#hFn2ResAniSpr[res.name] = {
					aTex: aFr.map(({frame: {x, y, w, h}})=> new Texture(
						baseTexture,
						new Rectangle(x, y, w, h),
					)),
					meta,
				};
			}

			next();
		});
	}
	static #charmVideoElm(v: HTMLVideoElement): HTMLVideoElement {
		// 【PixiJS】iOSとChromeでAutoPlay可能なビデオSpriteの設定 - Qiita https://qiita.com/masato_makino/items/8316e7743acac514e361
		// v.muted = true;// Chrome対応：自動再生を許可。ないと再開時に DOMException
		if (SpritesMng.#val.getVal('const.sn.needClick2Play')) {
			// ブラウザ実行で、クリックされるまで音声再生が差し止められている状態か。なにかクリックされれば falseになる
			DebugMng.trace_beforeNew(`[lay系] ${DebugMng.strPos()}未クリック状態で動画を自動再生します。音声はミュートされます`, 'W');
			v.muted = true;
		}
		v.setAttribute('playsinline', '');	// iOS対応
		return v;
	}
	static #mkSprite(fn: string, hRes: {[fn: string]: LoaderResource}): Sprite {
		const ras = SpritesMng.#hFn2ResAniSpr[fn];
		if (ras) {
			const asp = new AnimatedSprite(ras.aTex);
			asp.animationSpeed = ras.meta.animationSpeed ?? 1.0;
			asp.play();
			return asp;
		}
		if (fn in utils.TextureCache) return Sprite.from(fn);
		if (fn in SpritesMng.#hFn2VElm) return Sprite.from(SpritesMng.#hFn2VElm[fn]);

		return (fn in hRes) ?new Sprite(hRes[fn].texture) :new Sprite;
	}
	static #hFn2VElm	: {[fn: string]: HTMLVideoElement} = {};
	static	getHFn2VElm(fn: string) {return SpritesMng.#hFn2VElm[fn]}

	static	wv(hArg: HArg): boolean {
		// 動画ファイル名指定でいいかなと。なぜなら「ループで再生しつつ」
		// 同ファイル名の別の動画の再生は待ちたい、なんて状況は普通は無いだろうと
		const {fn} = hArg;
		if (! fn) throw 'fnは必須です';
		const hve = SpritesMng.#hFn2VElm[fn];
		if (! hve || hve.loop) return false;

		if (SpritesMng.#evtMng.isSkipping() || hve.ended) {SpritesMng.stopVideo(fn); return false}

		const fncBreak = ()=> SpritesMng.#evtMng.breakLimitedEvent();	// waitEvent 使用者の通常 break 時義務
		hve.addEventListener('ended', fncBreak, {once: true, passive: true});

		const stop = argChk_Boolean(hArg, 'stop', true);
		return SpritesMng.#evtMng.waitEvent(hArg, ()=> {
			hve.removeEventListener('ended', fncBreak);
			if (stop) SpritesMng.stopVideo(fn);
			fncBreak()
		});
	}

	static	stopVideo(fn: string) {
		const hve = SpritesMng.#hFn2VElm[fn];
		if (! hve) return;

		delete SpritesMng.#hFn2VElm[fn];
		hve.pause();
		hve.currentTime = hve.duration;
	}


	static	add_face(hArg: HArg): boolean {
		const {name} = hArg;
		if (! name) throw 'nameは必須です';
		if (name in SpritesMng.#hFace) throw '一つのname（'+ name +'）に対して同じ画像を複数割り当てられません';

		const {fn = name} = hArg;
		SpritesMng.#hFace[name] = {
			fn,
			dx: argChk_Num(hArg, 'dx', 0),
			dy: argChk_Num(hArg, 'dy', 0),
			blendmode: Layer.getBlendmodeNum(hArg.blendmode || '')
		};

		return false;
	}
//	static	clearFace2Name(): void {SpritesMng.hFace = {}}

}
