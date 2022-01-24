/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2022 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Container, Text, Rectangle, Texture, TextStyle, Sprite, Graphics, IDestroyOptions} from 'pixi.js';
import {uint, IEvtMng, argChk_Boolean, argChk_Num, CmnLib} from './CmnLib';
import {HArg} from './CmnInterface';
import {GrpLayer} from './GrpLayer';
import {Layer} from './Layer';
import {Config} from './Config';
import {IMakeDesignCast} from './LayerMng';
import {DesignCast, TxtBtnDesignCast, PicBtnDesignCast} from './DesignCast';

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

	#idc		: DesignCast;
	#sp_b_pic	: Sprite | undefined = undefined;
	#sp_pic		: Sprite | undefined = undefined;
	constructor(private readonly hArg: HArg, private readonly evtMng: IEvtMng, readonly resolve: ()=> void, private readonly canFocus: ()=> boolean) {
		super();

		if (CmnLib.isDbg) {
			this.makeDesignCast = gdc=> gdc(this.#idc);
			this.cvsResize = ()=> this.#idc.cvsResize();
		}

		let oName: any = {
			x: this.x = uint(hArg.left ?? 0),
			y: this.y = uint(hArg.top ?? 0),
			rotation: this.angle = argChk_Num(hArg, 'rotation', this.angle),
				// flash : rotation is in degrees.
				// pixijs: rotation is in radians, angle is in degrees.
			pivot_x: this.pivot.x = argChk_Num(hArg, 'pivot_x', this.pivot.x),
			pivot_y: this.pivot.y = argChk_Num(hArg, 'pivot_y', this.pivot.y),
			scale_x: this.scale.x = argChk_Num(hArg, 'scale_x', this.scale.x),
			scale_y: this.scale.y = argChk_Num(hArg, 'scale_y', this.scale.y),
			width: 0, height: 0,
		};
		const enabled = oName.enabled = argChk_Boolean(hArg, 'enabled', true);
		this.getBtnBounds = ()=> {
			this.#rctBtnTxt.x = oName.x;
			this.#rctBtnTxt.y = oName.y;
			return this.#rctBtnTxt;
		};

		// == 画像から生成
		if (hArg.pic) {
			oName.type = 'pic';	// dump用
			this.#idc = new PicBtnDesignCast(this, hArg);

			if (enabled) this.evtMng.button(this.hArg, this, ()=> this.#normal(), ()=> this.#hover(), ()=> this.#clicked());	// あとで差し替えるのでアロー必須

			if (! GrpLayer.csv2Sprites(
				hArg.pic,
				this,
				sp=> {
					this.#loaded_pic(sp, oName);
					this.#rctBtnTxt.width  = sp.width  * oName.scale_x;
					this.#rctBtnTxt.height = sp.height * oName.scale_y;
				},
				isStop=> {if (isStop) resolve()},
			)) resolve();
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
			fill		: 'black',
			fontFamily	: Button.fontFamily,
			fontSize	: height,
			padding		: 5,
		});
		if (hArg.style) try {
			const o = JSON.parse(hArg.style);
			for (const nm in o) (style as any)[nm] = o[nm];
		//	style = {...style, ...JSON.parse(hArg.style)};	// 上手くいかない
		} catch (e) {
			throw new Error(`[button] style指定が異常です。JSON文字列は「"」で囲んで下さい err:${e}`);
		}

		const txt = new Text(hArg.text ?? '', style);
		txt.alpha = argChk_Num(hArg, 'alpha', txt.alpha);	// 上にまとめない
		txt.width = argChk_Num(hArg, 'width', 100);
		txt.height = hArg.height = height;
		this.setText = text=> txt.text = text;

		oName.type = 'text';	// dump用
		oName = {...oName, ...style};
		oName.alpha = txt.alpha;
		oName.text = txt.text;
		oName.width = txt.width;
		oName.height = txt.height;
		this.#idc = new TxtBtnDesignCast(this, hArg, txt);

		let isStop = false;
		if (hArg.b_pic) {
			oName.b_pic = hArg.b_pic;
			isStop = GrpLayer.csv2Sprites(
				hArg.b_pic,
				this,
				sp=> {
					this.#loaded_b_pic(sp, txt);
					oName.width = this.width;
					oName.height = this.height;
				},
				isStop=> {
					Layer.setBlendmode(this, hArg);
					if (isStop) resolve();
				},
			);
		}
		txt.name = JSON.stringify(oName);

		this.addChild(txt);
		this.#rctBtnTxt.width = txt.width;	// addChild()後に取得すること
		this.#rctBtnTxt.height = txt.height;
	//x	this.#rctBtnTxt = txt.getBounds();	// 上手くいかない
		oName.width = this.width;
		oName.height = this.height;

		if (! hArg.b_pic) Layer.setBlendmode(this, hArg);	// 重なり順でここ
		Button.#procMasume4txt(this, txt);
		if (! enabled) {if (! isStop) resolve(); return;}

		const style_hover = style.clone();
		if (hArg.style_hover) try {
			const o = JSON.parse(hArg.style_hover);
			for (const nm in o) (style_hover as any)[nm] = o[nm];
		} catch (e) {
			throw new Error(`[button] style_hover指定が異常です。JSON文字列は「"」で囲んで下さい err:${e}`);
		}
		else style_hover.fill = 'white';

		const style_clicked = style_hover.clone();
		if (hArg.style_clicked) try {
			const o = JSON.parse(hArg.style_clicked);
			for (const nm in o) (style_clicked as any)[nm] = o[nm];
		} catch (e) {
			throw new Error(`[button] style_clicked指定が異常です。JSON文字列は「"」で囲んで下さい err:${e}`);
		}
		else style_clicked.dropShadow = false;

		evtMng.button(hArg, this, ()=> txt.style = style, ()=> {
			if (! canFocus()) return false;
			txt.style = style_hover;
			return true;
		}, ()=> txt.style = style_clicked);

		if (! isStop) resolve();
	}

	override	destroy(_options?: IDestroyOptions | boolean): void {
		this.evtMng.unButton(this);
		super.destroy();
	}

	makeDesignCast(_gdc: IMakeDesignCast) {}
	showDesignCast() {this.#idc.visible = true;}
	cvsResize() {}

	update_b_pic(fn: string, txt: Text) {
		const oName = JSON.parse(txt.name ?? '{}');
		if (this.#sp_b_pic) this.removeChild(this.#sp_b_pic);
		this.hArg.b_pic = oName.b_pic = fn;
		txt.name = JSON.stringify(oName);
		if (! fn) return;

		GrpLayer.csv2Sprites(
			fn,
			this,
			sp=> this.#loaded_b_pic(sp, txt),
			()=> Layer.setBlendmode(this, this.hArg),
		);
	}
	#loaded_b_pic(sp: Sprite, txt: Text) {
		this.#sp_b_pic = sp;
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

	update_pic(fn: string, sp: Sprite) {
		const oName = JSON.parse(sp.name ?? '{}');
		if (this.#sp_pic) this.removeChild(this.#sp_pic);
		this.hArg.pic = oName.pic = fn;
		sp.name = JSON.stringify(oName);
		if (! fn) return;

		GrpLayer.csv2Sprites(
			fn,
			this,
			sp=> this.#loaded_pic(sp, oName),
			()=> Layer.setBlendmode(this, this.hArg),
		);
	}
	#normal		: ()=> void		= ()=> {};
	#hover		: ()=> boolean	= ()=> false;
	#clicked	: ()=> void		= ()=> {};
	#loaded_pic(sp: Sprite, oName: any) {
		this.#sp_pic = sp;
		oName.alpha = sp.alpha = argChk_Num(this.hArg, 'alpha', sp.alpha);
		(<PicBtnDesignCast>this.#idc).setSp(sp);

		const w3 = sp.width /3;
		const h = sp.height;
		const tx = sp.texture.baseTexture;
		const txNormal = new Texture(tx, new Rectangle(0, 0, w3, h));
		const txClicked = new Texture(tx, new Rectangle(w3, 0, w3, h));
		const txHover = new Texture(tx, new Rectangle(w3 *2, 0, w3, h));
		const normal = ()=> sp.texture = txNormal;
		normal();

		this.#normal	= normal;
		this.#hover		= ()=> {
			if (! this.canFocus()) return false;
			sp.texture = txHover;
			return true;
		};
		this.#clicked	= ()=> sp.texture = txClicked;

		if ('width' in this.hArg) {
			oName.width = uint(this.hArg.width);
			this.scale.x *= oName.width /w3;
		}
		else oName.width = w3;
		if ('height' in this.hArg) {
			oName.height = uint(this.hArg.height);
			this.scale.y *= oName.height /w3;
		}
		else oName.height = w3;
		sp.name = JSON.stringify(oName);	// dump用

		Button.#procMasume4pic(this, sp, w3, h);
	}

}
