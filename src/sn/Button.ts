/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Container, Text, Rectangle, Texture, TextStyle, Sprite, Graphics, IDestroyOptions} from 'pixi.js';
import {uint, IEvtMng, argChk_Boolean, argChk_Num, mesErrJSON} from './CmnLib';
import {HArg} from './Grammar';
import {SpritesMng} from './SpritesMng';
import {Layer} from './Layer';
import {Config} from './Config';
import {IMakeDesignCast} from './LayerMng';
//import {DesignCast, TxtBtnDesignCast, PicBtnDesignCast} from './DesignCast';

export class Button extends Container {
	static	fontFamily	= "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif";
	static	#procMasume4txt = (_me: Button, _txt: Text)=> {};
	static	#procMasume4pic = (_me: Button, _sp: Sprite, _w3: number, _h: number)=> {};
	static	init(cfg: Config) {
		if (! cfg.oCfg.debug.masume) return;

		Button.#procMasume4txt = (me, txt)=> me.addChild(
			(new Graphics)
			.beginFill(0x883388, 0.2)
			.lineStyle(1, 0x883388, 1)
			.drawRect(txt.x, txt.y, txt.width, txt.height)
			.endFill()
		);
		Button.#procMasume4pic = (me, sp, w3, h)=> me.addChild(
			(new Graphics)
			.beginFill(0x883388, 0.2)
			.lineStyle(1, 0x883388, 1)
			.drawRect(sp.x, sp.y, w3, h)
			.endFill()
		);
	}

	setText(_text: string) {}
	getBtnBounds = ()=> this.#rctBtnTxt;
		// 文字ボタンは背景画像を含まない位置指定なので、その当たり判定用
	#rctBtnTxt	= new Rectangle;

	#sps		= new SpritesMng;

//	#idc		: DesignCast;
	readonly	#o	: {
		type	: 'pic'|'text';
		enabled	: boolean;
		x		: number;
		y		: number;
		rotation: number;
			// flash : rotation is in degrees.
			// pixijs: rotation is in radians, angle is in degrees.
		pivot_x	: number;
		pivot_y	: number;
		scale_x	: number;
		scale_y	: number;
		alpha	: number;
		text	: string;
		b_pic	: string;
		width	: number;
		height	: number;
	};

	constructor(private readonly hArg: HArg, readonly evtMng: IEvtMng, readonly resolve: ()=> void, private readonly canFocus: ()=> boolean) {
		super();
/*
		if (CmnLib.isDbg) {
			this.makeDesignCast = gdc=> gdc(this.#idc);
			this.cvsResize = ()=> this.#idc.cvsResize();
		}
*/
		this.#o = {
			type	: 'pic',
			enabled	: argChk_Boolean(hArg, 'enabled', true),
			x		: this.x = uint(hArg.left ?? 0),
			y		: this.y = uint(hArg.top ?? 0),
			rotation: this.angle = argChk_Num(hArg, 'rotation', this.angle),
				// flash : rotation is in degrees.
				// pixijs: rotation is in radians, angle is in degrees.
			pivot_x	: this.pivot.x = argChk_Num(hArg, 'pivot_x', this.pivot.x),
			pivot_y	: this.pivot.y = argChk_Num(hArg, 'pivot_y', this.pivot.y),
			scale_x	: this.scale.x = argChk_Num(hArg, 'scale_x', this.scale.x),
			scale_y	: this.scale.y = argChk_Num(hArg, 'scale_y', this.scale.y),
			alpha	: 1,
			text	: '',
			b_pic	: '',
			width	: 0,
			height	: 0,
		};
		this.getBtnBounds = ()=> {
			this.#rctBtnTxt.x = this.#o.x;
			this.#rctBtnTxt.y = this.#o.y;
			return this.#rctBtnTxt;
		};

		if (this.#o.enabled) evtMng.button(this.hArg, this, ()=> this.normal(), ()=> this.#hover(), ()=> this.#clicked());	// あとで差し替えるのでアロー必須

		// == 画像から生成
		if (hArg.pic) {
			this.#o.type = 'pic';	// dump用
//			this.#idc = new PicBtnDesignCast(this, hArg);

			this.#sps = new SpritesMng(
				hArg.pic,
				this,
				sp=> {
					this.#loaded_pic(sp);
					this.#rctBtnTxt.width  = sp.width  * this.#o.scale_x;
					this.#rctBtnTxt.height = sp.height * this.#o.scale_y;
				},
				_isStop=> resolve,
			);
			return;
		}
		if (! hArg.text) throw 'textまたはpic属性は必須です';

		// == 文字列から生成
		const height = argChk_Num(hArg, 'height', 30);
		const style = new TextStyle({
			align		: 'center',
			dropShadow	: true,
			dropShadowAlpha	: 0.7,
			dropShadowColor	: 'white',
			dropShadowBlur	: 7,
			dropShadowDistance	: 0,
			fill		: this.#o.enabled ?'black' :'gray',
			fontFamily	: Button.fontFamily,
			fontSize	: height,
			padding		: 5,
		});
		if (hArg.style) try {
			const o = JSON.parse(hArg.style);
			for (const [nm, v] of Object.entries(o)) (style as any)[nm] = v;
		//	style = {...style, ...JSON.parse(hArg.style)};	// 上手くいかない
		} catch (e) {
			throw new Error(mesErrJSON(hArg, 'style', e.message));
		}

		const txt = new Text(hArg.text ?? '', style);
		txt.alpha = argChk_Num(hArg, 'alpha', txt.alpha);	// 上にまとめない
		txt.width = argChk_Num(hArg, 'width', 100);
		txt.height = hArg.height = height;
		this.setText = text=> txt.text = text;

		this.#o.type = 'text';	// dump用
		this.#o = {...this.#o, ...style};
		this.#o.alpha = txt.alpha;
		this.#o.text = txt.text;
		this.#o.width = txt.width;
		this.#o.height = txt.height;
//		this.#idc = new TxtBtnDesignCast(this, hArg, txt);

		let isStop = false;
		this.#o.width = this.width;
		this.#o.height = this.height;
		if (hArg.b_pic) {
			this.#o.b_pic = hArg.b_pic;
			this.#sps = new SpritesMng(
				hArg.b_pic,
				this,
				sp=> {
					this.#loaded_b_pic(sp, txt);
					this.#o.width = this.width;
					this.#o.height = this.height;
				},
				isStop=> {
					Layer.setBlendmode(this, hArg);
					if (isStop) resolve();
				},
			);
			isStop = this.#sps.ret;
		}
		txt.name = JSON.stringify(this.#o);

		this.addChild(txt);
		this.#rctBtnTxt.width = txt.width;	// addChild()後に取得すること
		this.#rctBtnTxt.height = txt.height;
	//x	this.#rctBtnTxt = txt.getBounds();	// 上手くいかない

		if (! hArg.b_pic) Layer.setBlendmode(this, hArg);	// 重なり順でここ
		Button.#procMasume4txt(this, txt);
		if (! this.#o.enabled) {if (! isStop) resolve(); return}

		const style_hover = style.clone();
		if (hArg.style_hover) try {
			const o = JSON.parse(hArg.style_hover);
			for (const [nm, v] of Object.entries(o)) (style_hover as any)[nm] = v;
		} catch (e) {
			throw new Error(mesErrJSON(hArg, 'style_hover', e.message));
		}
		else style_hover.fill = 'white';

		const style_clicked = style_hover.clone();
		if (hArg.style_clicked) try {
			const o = JSON.parse(hArg.style_clicked);
			for (const [nm, v] of Object.entries(o)) (style_clicked as any)[nm] = v;
		} catch (e) {
			throw new Error(mesErrJSON(hArg, 'style_clicked', e.message));
		}
		else style_clicked.dropShadow = false;

		this.normal = ()=> txt.style = style;
		this.#hover = ()=> {
			if (! canFocus()) return false;
			txt.style = style_hover;
			return true;
		};
		this.#clicked = ()=> txt.style = style_clicked;

		if (! isStop) resolve();
	}

	override	destroy(_options?: IDestroyOptions | boolean): void {
		this.evtMng.unButton(this);
		this.#sps.destroy();
		super.destroy();
	}

	makeDesignCast(_gdc: IMakeDesignCast) {}
	showDesignCast() {}
//	showDesignCast() {this.#idc.visible = true}
	cvsResize() {}

	#loaded_b_pic(sp: Sprite, txt: Text) {
		this.setChildIndex(sp, 0);
		sp.alpha = txt.alpha;
		sp.setTransform(
			txt.x, txt.y,
			1, 1, txt.rotation, 0, 0,
			(sp.width -txt.width) /2,
			(sp.height -txt.height) /2,
		);

		sp.name = txt.name;
	}

	normal		: ()=> void		= ()=> {};
	#hover		: ()=> boolean	= ()=> false;
	#clicked	: ()=> void		= ()=> {};
	#loaded_pic(sp: Sprite) {
		this.#o.alpha = sp.alpha = argChk_Num(this.hArg, 'alpha', sp.alpha);
//		(this.#idc as PicBtnDesignCast).setSp(sp);

		const w_3 = sp.width /3;
		const w = this.#o.enabled ?w_3 :sp.width;
		const h = sp.height;
		const tx = sp.texture.baseTexture;
		const txNormal = new Texture(tx, new Rectangle(0, 0, w_3, h));
		const txClicked = new Texture(tx, new Rectangle(w_3, 0, w_3, h));
		const txHover = new Texture(tx, new Rectangle(w_3 *2, 0, w_3, h));
		const normal = ()=> sp.texture = txNormal;
		if (this.#o.enabled) normal();

		this.normal	= normal;
		this.#hover		= ()=> {
			if (! this.canFocus()) return false;
			sp.texture = txHover;
			return true;
		};
		this.#clicked	= ()=> sp.texture = txClicked;

		if ('width' in this.hArg) {
			this.#o.width = uint(this.hArg.width);
			this.scale.x *= this.#o.width /w;
		}
		else this.#o.width = w;
		if ('height' in this.hArg) {
			this.#o.height = uint(this.hArg.height);
			this.scale.y *= this.#o.height /h;
		}
		else this.#o.height = h;
		sp.name = JSON.stringify(this.#o);	// dump用

		Button.#procMasume4pic(this, sp, w, h);
	}

}
