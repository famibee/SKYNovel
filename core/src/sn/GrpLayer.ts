/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Layer} from './Layer';

import {CmnLib, int, IEvtMng} from './CmnLib';
import {HArg, IMain} from './CmnInterface';
import {Config} from './Config';
import {SysBase} from './SysBase';
import {Sprite, Container, Texture, BLEND_MODES, utils, Loader, LoaderResource, AnimatedSprite} from 'pixi.js';
import {EventListenerCtn} from './EventListenerCtn';

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
	static	init(main: IMain, cfg: Config, sys: SysBase): void {
		GrpLayer.main = main;
		GrpLayer.cfg = cfg;
		GrpLayer.sys = sys;
	}
	private static	evtMng	: IEvtMng;
	static	setEvtMng(evtMng: IEvtMng) {GrpLayer.evtMng = evtMng;}
	static	destroy() {
		GrpLayer.elc.clear();

		GrpLayer.hFace	= {};
		GrpLayer.hFn2ResAniSpr	= {};
	}

	private csvFn		= '';
	private sBkFn		= '';
	private sBkFace		= '';
	static	hFn2ResAniSpr	: {[name: string]:	IResAniSpr} = {};
	lay(hArg: HArg): boolean {
		const fn = hArg.fn;
		const face = hArg.face ?? '';
		//console.log('layer:%s page:%s fn:%s face:%s', hArg['layer'], hArg['page'], fn, face);
		if (! fn) {
			super.lay(hArg);

			if (this.cnt.children.length > 0) this.setPos(hArg);
			this.sBkFn = '';
			this.csvFn = this.sBkFace = face;
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

		return GrpLayer.csv2Sprites(
			this.csvFn = fn + (face ? ','+ face : ''),
			this.cnt,
			sp=> {
				Layer.setXY(sp, hArg, this.cnt, true);
//				if (hArg.page == 'fore') this.rsvEvent(sp);	// ======
					// [lay page=fore]のみswfアニメ終了イベント発生
			},
			GrpLayer.fncAllComp
		);
	}
	private static	fncDefAllComp	= (isStop: boolean)=> {if (isStop) GrpLayer.main.resume()};
	private static	fncAllComp	= GrpLayer.fncDefAllComp;

	static csv2Sprites(csv: string, parent: Container, fncFirstComp: IFncCompSpr, fncAllComp: (isStop: boolean)=> void = ()=> {}): boolean {
		const aComp : {fn: string, fnc: IFncCompSpr}[] = [];
		let needLoad = false;
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
			const fnc = (i == 0) ?fncFirstComp :(sp: Sprite)=> {
				sp.x = f.dx;
				sp.y = f.dy;
				sp.blendMode = f.blendmode;
			};
			aComp.push({fn: f.fn, fnc: fnc});

			if (f.fn in GrpLayer.hFn2ResAniSpr) return;
			if (f.fn in utils.TextureCache) return;
			if (f.fn in Loader.shared.resources) return;

			needLoad = true;
			ldr.add(f.fn, GrpLayer.cfg.searchPath(f.fn, Config.EXT_SPRITE), this.sys.crypto ?{xhrType: 'arraybuffer'} :{});
		});

		const fncLoaded = (res: any)=> {
			for (const v of aComp) {
				const sp = GrpLayer.mkSprite(v.fn, res);
				parent.addChild(sp);
				v.fnc(sp);
			}
			fncAllComp(needLoad);
		}
		if (needLoad) {
			ldr.pre((res: LoaderResource, next: Function)=> res.load(()=> {
				this.sys.pre(res.extension, res.data)
				.then(r=> {
					if (res.extension != 'bin') {next(); return;}
					res.data = r;
					if (res.data instanceof HTMLImageElement) {
						res.type = LoaderResource.TYPE.IMAGE;
						URL.revokeObjectURL(res.data.src);
					}
					next();
				})
				.catch(e=> this.main.errScript(`Graphic ロード失敗です fn:${res.name} ${e}`, false));
			}))
			.load((_ldr: any, hRes: any)=> fncLoaded(hRes));
		}
		else fncLoaded(utils.TextureCache);

		return needLoad;
	}
	private static mkSprite(fn: string, res: LoaderResource): Sprite {
		//console.log(`fn:GrpLayer.ts line:153 fn:${fn} a:%O b:%O c:%O`, GrpLayer.hFn2ResAniSpr[fn], utils.TextureCache[fn], Loader.shared.resources[fn]);
		if (fn in utils.TextureCache) return new Sprite(Texture.from(fn));
		const ras = GrpLayer.hFn2ResAniSpr[fn];
		if (ras) {
			const asp = new AnimatedSprite(ras.aTex);
			asp.animationSpeed = ras.meta['animationSpeed'] ?? 1.0;
			asp.play();
			return asp;
		}

		const r: any = (res as any)[fn];
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
				for (const v of aFK) aTex.push(Texture.from(v));
				GrpLayer.hFn2ResAniSpr[r.name] = {aTex: aTex, meta: r.data.meta};
				return GrpLayer.mkSprite(fn, res);

			case LoaderResource.TYPE.VIDEO:
				const hve = r.data as HTMLVideoElement;
				GrpLayer.fn2Video[fn] = hve;
				// NOTE: hve.loop = true;	[wv]でもループ時はスルーするように
				return new Sprite(Texture.from(r.data));

			default:	return new Sprite(r.texture);
		}
	}
	static fn2Video	: {[name: string]: HTMLVideoElement} = {};
	static wv(hArg: HArg) {
		// 動画ファイル名指定でいいかなと。だって、「ループ」「それは再生しつつ」
		// 同じファイル名の別の動画の再生は待ちたい、なんて状況は普通は無いだろうと
		const fn = hArg.fn;
		if (! fn) throw 'fnは必須です';
		const hve = GrpLayer.fn2Video[fn];
		if (! hve) return false;
		if (hve.ended) {delete GrpLayer.fn2Video[fn]; return false;}
		const fnc = ()=> {
			hve.removeEventListener('ended', fnc);
			delete GrpLayer.fn2Video[fn];
			this.main.resume();
		};
		hve.addEventListener('ended', fnc, {once: true, passive: true});

		GrpLayer.evtMng.stdWait(
			()=> {hve.pause(); fnc();},
			CmnLib.argChk_Boolean(hArg, 'canskip', true)
		);	// stdWait()したらreturn true;
		return true;
	}

	static ldPic(fn: string, fnc: (tx: Texture)=> void): void {
		const url = GrpLayer.cfg.searchPath(fn, Config.EXT_SPRITE);
		const tx = utils.TextureCache[url];
		if (tx) {fnc(tx); return;}

		const tx2 = Texture.from(url);
		GrpLayer.elc.add(tx2.baseTexture, 'loaded', ()=> fnc(tx2));	// ノイズ対策
	}

	setPos(hArg: HArg): void {
		Layer.setXY(
			(this.cnt.children.length == 0) ?this.cnt :this.cnt.children[0],
			hArg,
			this.cnt,
			true
		);
	}
	/*private rsvEvent(_$do: DisplayObject): void {
		const ldr:Loader = $do as Loader;
		if (ldr == null) return;
		const mc:MovieClip = ldr.content as MovieClip;
		if (mc == null) return;
		GrpLayer.elc.add(mc, Event.EXIT_FRAME, rsvEvent_ExitFrame);
	}*/

	static	add_face(hArg: HArg): boolean {
		const name = hArg.name;
		if (! name) throw 'nameは必須です';
		if (name in GrpLayer.hFace) throw '一つのname（'+ name +'）に対して同じ画像を複数割り当てられません';

		const fn = hArg.fn ?? name;
		GrpLayer.hFace[name] = {
			fn: fn,
			dx: CmnLib.argChk_Num(hArg, 'dx', 0) * CmnLib.retinaRate,
			dy: CmnLib.argChk_Num(hArg, 'dy', 0) * CmnLib.retinaRate,
			blendmode: Layer.cnvBlendmode(hArg.blendmode || '')
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
	playback(hLay: any, fncComp: undefined | {(): void} = undefined): boolean {
		super.playback(hLay);
		if (hLay.sBkFn == '' && hLay.sBkFace == '') {
			this.sBkFn	= hLay.sBkFn;
			this.sBkFace= hLay.sBkFace;
			if (fncComp != undefined) fncComp();
			return false;
		}

		if (fncComp != undefined) GrpLayer.fncAllComp = ()=> {
			GrpLayer.fncAllComp = GrpLayer.fncDefAllComp;
			fncComp();
		};

		return this.lay({fn: hLay.sBkFn, face: hLay.sBkFace, left: hLay.x, top: hLay.y});
	}

	readonly dump = ()=> super.dump() +`, "pic":"${this.csvFn}"`;

}
