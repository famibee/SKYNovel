/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Layer} from './Layer';

import {CmnLib, HArg, IMain, int} from './CmnLib';
import {Config} from './Config';
import { Sprite, Container, extras, Texture, BLEND_MODES, utils, loaders, DisplayObject } from 'pixi.js';
import { EventListenerCtn } from './EventListenerCtn';

export interface IFncCompSpr { (sp: Sprite): void; };

interface Iface {
	fn: string;
	dx: number;
	dy: number;
	blendmode: number;
};
interface Ihface { [name: string]: Iface; };

interface IResAniSpr {
	aTex	: Texture[]
	meta	: {
		animationSpeed? :number;
	};
}

export class GrpLayer extends Layer {
	private static	elc			= new EventListenerCtn;

	private static	hFace		: Ihface	= {};

	private static	main		: IMain;
	private static	cfg			: Config;
	private static	ldr			: loaders.Loader;
	static	init(main: IMain, cfg: Config): void {
		GrpLayer.main = main;
		GrpLayer.cfg = cfg;
		GrpLayer.ldr = new loaders.Loader();
	}
	static	destroy() {
		GrpLayer.elc.clear();

		GrpLayer.hFace	= {};
		GrpLayer.hFn2ResAniSpr	= {};
		if (GrpLayer.ldr) GrpLayer.ldr.destroy();
	}

	private csvFn		= '';
	private sBkFn		= '';
	private sBkFace		= '';
	static	hFn2ResAniSpr	: {[name: string]:	IResAniSpr} = {};
	lay(hArg: HArg): boolean {
		const fn = hArg.fn;
		const face = hArg.face || '';
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
				if (hArg.page == 'fore') this.rsvEvent(sp);	// ======
					// [lay page=fore]のみswfアニメ終了イベント発生
			},
			GrpLayer.fncAllComp
		);
	}
	private static	fncDefAllComp	= (isStop: boolean)=> {if (isStop) GrpLayer.main.resume()};
	private static	fncAllComp	= GrpLayer.fncDefAllComp;

	static csv2Sprites(csv: string, parent: Container, fncFirstComp: IFncCompSpr, fncAllComp: (isStop: boolean)=> void = ()=> {}): boolean {
		const aComp : {fn: string, fnc: IFncCompSpr}[] = [];
		//GrpLayer.ldr.destroy();	// あまりキビキビ殺すと、表示する前に消える
		let needLoad = false;
		// .forEach((fn, i)=> {	// NOTE: mapの方が速い＆値を返すのでチェーンにできる
		csv.split(',').map((fn, i)=> {
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
			if (f.fn in GrpLayer.ldr.resources) return;

			needLoad = true;
			if (GrpLayer.ldr.loading) GrpLayer.ldr = new loaders.Loader();
			GrpLayer.ldr.add(f.fn, GrpLayer.cfg.searchPath(f.fn, Config.EXT_SPRITE));
		});

		const fncLoaded = (res: any)=> {
			for (const v of aComp) {
				const sp = GrpLayer.mkSprite(v.fn, res);
				parent.addChild(sp);
				v.fnc(sp);
			}
			fncAllComp(needLoad);
		}
		if (needLoad) GrpLayer.ldr.load((_loader: any, res: any)=> fncLoaded(res));
		else fncLoaded(utils.TextureCache);

		return needLoad;
	}
	private static mkSprite(fn: string, res: loaders.Resource): Sprite {
		//console.log('a:%O b:%O c:%O', res[fn], utils.TextureCache[fn], GrpLayer.hFn2ResAniSpr[fn]);
		if (fn in utils.TextureCache) return new Sprite(Texture.from(fn));
		if (fn in GrpLayer.hFn2ResAniSpr) {
			const ras = GrpLayer.hFn2ResAniSpr[fn];
			const asp = new extras.AnimatedSprite(ras.aTex);
			asp.animationSpeed = ras.meta['animationSpeed'] || 1.0;
			asp.play();
			return asp;
		}

		const r: any = (res as any)[fn];
		if (! r) return new Sprite;	// ロード中にリソース削除
		switch (r.type) {
			case loaders.Resource.TYPE.JSON:	// アニメスプライト
				const aFK: string[] = r.spritesheet._frameKeys;
				const a_base_name = /([^\d]+)\d+\.(\w+)/.exec(aFK[0]);
				if (a_base_name) {
					const is = a_base_name[1].length;
					const ie = -a_base_name[2].length - 1;
					aFK.sort((a, b) => {
						return (int(a.slice(is, ie)) > int(b.slice(is, ie)))
						? 1 : -1;
					});
				}
				//console.log('aKey:%O:', aKey);
				const aTex: Texture[] = [];
				for (const v of aFK) aTex.push(Texture.fromFrame(v));
				GrpLayer.hFn2ResAniSpr[r.name] = {aTex: aTex, meta: r.data.meta};
				return GrpLayer.mkSprite(fn, res);

			case loaders.Resource.TYPE.VIDEO:
				return new Sprite(Texture.fromVideo(r.data));
				//	const hve = vsp.texture.baseTexture.source as HTMLVideoElement;
				//const hve = r.data as HTMLVideoElement;
				//hve.loop = true;

			default:
				return new Sprite(r.texture);
		}
	}

	static ldPic(fn: string, fnc: (tx: Texture)=> void): void {
		const url = GrpLayer.cfg.searchPath(fn, Config.EXT_SPRITE);
		const tx = utils.TextureCache[url];
		if (tx) {fnc(tx); return;}

		const tx2 = Texture.fromImage(url);
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
	private rsvEvent(_$do: DisplayObject): void {
		/*
		const ldr:Loader = $do as Loader;
		if (ldr == null) return;
		const mc:MovieClip = ldr.content as MovieClip;
		if (mc == null) return;
		GrpLayer.elc.add(mc, Event.EXIT_FRAME, rsvEvent_ExitFrame);
		*/
	}

	static	add_face(hArg: HArg): boolean {
		const name = hArg.name;
		if (! name) throw('nameは必須です');
		if (name in GrpLayer.hFace) throw('一つのname（'+ name +'）に対して同じ画像を複数割り当てられません');

		const fn = hArg.fn || name;
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
	record() {return Object.assign(super.record(), {
		sBkFn	: this.sBkFn,
		sBkFace	: this.sBkFace,
	});}
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

		return this.lay({fn: hLay.sBkFn, face: hLay.sBkFace});
	};

	dump(): string {return super.dump() +`, "pic":"${this.csvFn}"`;};

};
