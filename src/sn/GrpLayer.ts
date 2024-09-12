/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Layer} from './Layer';

import {CmnLib, argChk_Boolean, argChk_Num} from './CmnLib';
import {HArg} from './Grammar';
import {IMain, IVariable} from './CmnInterface';
import {Config} from './Config';
import {SysBase} from './SysBase';
import {EventListenerCtn} from './EventListenerCtn';
import {SoundMng} from './SoundMng';
import {IMakeDesignCast} from './LayerMng';
import {GrpLayDesignCast} from './DesignCast';
import {SpritesMng} from './SpritesMng';
import {enableEvent, disableEvent} from './ReadState';

import {Sprite, AnimatedSprite, RenderTexture, Application} from 'pixi.js';


export class GrpLayer extends Layer {
	static	readonly	#elc	= new EventListenerCtn;

	static	#appPixi: Application;
	static	init(main: IMain, cfg: Config, appPixi: Application, sys: SysBase, sndMng: SoundMng, val: IVariable): void {
		GrpLayer.#appPixi = appPixi;
		SpritesMng.init(cfg, val, sys, main, sndMng);
	}
	static	destroy() {GrpLayer.#elc.clear(); SpritesMng.destroy()}

	readonly	#idc	= new GrpLayDesignCast(this.spLay, this);
	constructor() {
		super();
		if (CmnLib.isDbg) {
			this.#setIdcSp = sp=> this.#idc.setSp(sp);
			this.cvsResize = ()=> {super.cvsResize(); this.#idc.cvsResize()}
		}
	}
	#setIdcSp	: (sp: Sprite)=> void	= ()=> {};

	#csvFn		= '';
	#sBkFn		= '';
	#sBkFace	= '';
	override readonly	lay = (hArg: HArg)=> {
		const ret = this.#laySub(hArg, isStop=> {
			if (isStop) enableEvent();
		});
		if (ret) disableEvent();
		return ret;
	}
	#laySub(hArg: HArg, resolve: (isStop: boolean)=> void): boolean {
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

		this.clearLay({clear_filter: argChk_Boolean(hArg, 'clear_filter', true)});
		if (inFn) this.#sBkFn = fn;	// clearLay()後に置く事
		if (inFace) this.#sBkFace = face;
		super.lay(hArg);	// filter設定してる場合も

		hArg.dx = 0;
		hArg.dy = 0;

		this.#sps.destroy();
		this.#sps = new SpritesMng(
			this.#csvFn = fn + (face ?','+ face :''),
			this.spLay,
			sp=> {
				if ('width' in hArg || 'height' in hArg) {
					sp.width = argChk_Num(hArg, 'width', 0);
					sp.height = argChk_Num(hArg, 'height', 0);
				}
				this.#width = sp.width;
				this.#height = sp.height;
				Layer.setXY(sp, hArg, this.spLay, true);
				Layer.setBlendmode(this.spLay, hArg);
			//	if (hArg.page === 'fore') this.rsvEvent(sp);	// ======
					// [lay page=fore]のみswfアニメ終了イベント発生
				this.#setIdcSp(sp);
			},
			isStop=> resolve(isStop),
		);
		return this.#sps.ret;
	}
	#sps	= new SpritesMng;
	#width	= 0;
	#height	= 0;
	override	get	width() {return this.#width}
	override	get	height() {return this.#height}


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
			for (const s of this.spLay.children) s.visible = true;
			this.#spTsy.visible = false;
			GrpLayer.#appPixi.renderer.render(this.spLay, {renderTexture: this.#rtTsy});	// clear: true
			this.spLay.alpha = a;
			for (const s of this.spLay.children) s.visible = false;
		}
		if (! this.containMovement) {
			let oldFnc = fncRenderFore;	// 動きがないなら最初に一度
			fncRenderFore = ()=> {fncRenderFore = ()=> {}; oldFnc()};
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
		for (const s of this.spLay.children) s.visible = true;
		this.#spTsy.destroy(true);
	}


	setPos(hArg: HArg): void {
		Layer.setXY(
			(this.spLay.children.length === 0) ?this.spLay :this.spLay.children[0],
			hArg,
			this.spLay,
			true
		);
	}

	// アニメ・動画を含むか
	override get containMovement(): boolean {
		if (this.#csvFn === '') return false;

		const c = this.spLay.children;
		return this.#csvFn.split(',').some(
			(fn, i)=> c[i] instanceof AnimatedSprite || SpritesMng.getHFn2VElm(fn)
		);
	}

	override clearLay(hArg: HArg): void {
		super.clearLay(hArg);
		this.#sps.destroy();
		this.#sBkFn		= '';
		this.#sBkFace	= '';
		this.#csvFn		= '';
	}
	override readonly record = ()=> ({...super.record(),
		sBkFn		: this.#sBkFn,
		sBkFace		: this.#sBkFace,
//		idc_hArg	: this.#idc.gethArg(),
	});
	override playback(hLay: any, aPrm: Promise<void>[]): void {
		super.playback(hLay, aPrm);
		if (hLay.sBkFn === '' && hLay.sBkFace === '') {
			this.#sBkFn		= hLay.sBkFn;
			this.#sBkFace	= hLay.sBkFace;
//			this.#idc.sethArg(hLay.idc_hArg);
			return;
		}

		aPrm.push(new Promise(re=> this.#laySub(
			{fn: hLay.sBkFn, face: hLay.sBkFace, left: hLay.x, top: hLay.y, alpha: hLay.alpha, blendmode: Layer.getNum2Blendmode(hLay.blendMode), rotation: hLay.rotation, scale_x: hLay.scale_x, scale_y: hLay.scale_y},
			_isStop=> {this.spLay.position.set(hLay.x, hLay.y); re()},
				// Layer.setXY()の後に再度移動
		)));
	}

	override makeDesignCast(gdc: IMakeDesignCast) {
		if (! this.spLay.visible) return;
		gdc(this.#idc);
	}
	//makeDesignCastChildren(_gdc: IMakeDesignCast) {}

	override cvsResize() {super.cvsResize()}

	override showDesignCast() {this.#idc.visible = true}
	//showDesignCastChildren() {}

	override readonly dump = ()=> super.dump() +`, "pic":"${this.#csvFn}"`;

}
