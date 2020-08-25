/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Container, Text, Rectangle, Texture, TextStyle} from 'pixi.js';
import {Graphics} from 'pixi.js';
import {uint, CmnLib, IEvtMng, argChk_Boolean, argChk_Num} from './CmnLib';
import {HArg, IMain} from './CmnInterface';
import {GrpLayer} from './GrpLayer';
import {Layer} from './Layer';
import {Config} from './Config';

export class Button extends Container {
	static	fontFamily	= "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif";

	private	static	cfg		: Config;
	static	init(cfg: Config): void {Button.cfg = cfg;}

	constructor(private readonly main: IMain, private readonly evtMng: IEvtMng, hArg: HArg) {
		super();

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
		};
		const enabled = oName.enabled = argChk_Boolean(hArg, 'enabled', true);
		if (enabled) this.evtMng.button(hArg, this);

		// 文字列から生成
		if ('text' in hArg) {
			const style = new TextStyle({
				align: 'center',
				dropShadow: true,
				dropShadowAlpha: 0.7,
			//	dropShadowColor: 'white',	// pixi.js v5.0.3 で色名前が使えない
				dropShadowColor: '#ffffff',
				dropShadowBlur: 7,
				dropShadowDistance: 0,
				fill: 'black',
				fontFamily: Button.fontFamily,
				fontSize: uint(hArg.height ?? 30),
				padding: 5,
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
			txt.width = uint(hArg.width ?? 100);
			txt.height = parseInt(String(style.fontSize));

			oName.type = 'text';	// dump用
			oName = {...oName, ...style};
			oName.alpha = txt.alpha;
			oName.text = txt.text;
			oName.width = txt.width;
			oName.height = txt.height;

			if (hArg.b_pic) {
				oName.b_pic = hArg.b_pic;
				this.isStop = GrpLayer.csv2Sprites(
					hArg.b_pic,
					this,
					sp=> {
						this.setChildIndex(sp, 0);
						sp.alpha = txt.alpha;
						sp.setTransform(
							txt.x, txt.y,
							1, 1, txt.rotation, 0, 0,
							(sp.width -txt.width) /2,
							(sp.height -txt.height) /2,
						);
					},
					isStop=> {
						Layer.setBlendmode(this, hArg);
						if (isStop) this.main.resume();
					}
				);
			}
			txt.name = JSON.stringify(oName);

			this.addChild(txt);
			if (! hArg.b_pic) Layer.setBlendmode(this, hArg);	// 重なり順でここ
			if (Button.cfg.oCfg.debug.masume) {
				const grpDbgMasume = new Graphics;
				grpDbgMasume.clear();
				grpDbgMasume.beginFill(0x883388, 0.2);
				grpDbgMasume.lineStyle(1, 0x883388, 1);
				grpDbgMasume.drawRect(txt.x, txt.y, txt.width, txt.height);
				grpDbgMasume.endFill();
				this.addChild(grpDbgMasume);
			}
			if (! enabled) return;

			const normal = ()=> txt.style = {...txt.style, ...style};

			const style_hover = {...style};
			if (hArg.style_hover) try {
				const o = JSON.parse(hArg.style_hover);
				for (const nm in o) (style as any)[nm] = o[nm];
			} catch (e) {
				throw new Error(`[button] style_hover指定が異常です。JSON文字列は「"」で囲んで下さい err:${e}`);
			}
			else style_hover.fill = 'white';
			const hover = ()=> txt.style = {...txt.style, ...style_hover};

			const style_clicked = {...style_hover};
			if (hArg.style_clicked) try {
				const o = JSON.parse(hArg.style_clicked);
				for (const nm in o) (style as any)[nm] = o[nm];
			} catch (e) {
				throw new Error(`[button] style_clicked指定が異常です。JSON文字列は「"」で囲んで下さい err:${e}`);
			}
			else style_clicked.dropShadow = false;
			const clicked = ()=> txt.style = {...txt.style, ...style_clicked};

			this.on('pointerover', hover);
			this.on('pointerout', normal);
			this.on('pointerdown', clicked);
			this.on('pointerup', CmnLib.isMobile ?normal :hover);
			return;
		}

		if (! hArg.pic) throw 'textまたはpic属性は必須です';
		// 画像から生成
		oName.type = 'pic';	// dump用
		this.isStop = GrpLayer.csv2Sprites(
			hArg.pic,
			this,
			sp=> {
				oName.alpha = sp.alpha = argChk_Num(hArg, 'alpha', sp.alpha);

				const w3 = sp.width /3;
				const h = sp.height;
				const tx = sp.texture.baseTexture;
				const txNormal = new Texture(tx, new Rectangle(0, 0, w3, h));
				const txClicked = new Texture(tx, new Rectangle(w3, 0, w3, h));
				const txHover = new Texture(tx, new Rectangle(w3 *2, 0, w3, h));
				const normal = ()=> sp.texture = txNormal;
				const hover = ()=> sp.texture = txHover;
				const clicked = ()=> sp.texture = txClicked;
				this.on('pointerover', hover);
				this.on('pointerout', normal);
				this.on('pointerdown', clicked);
				this.on('pointerup', CmnLib.isMobile ?normal :hover);
				normal();

				if ('width' in hArg) {
					oName.width = uint(hArg.width);
					this.scale.x *= oName.width /w3;
				}
				else oName.width = w3;
				if ('height' in hArg) {
					oName.height = uint(hArg.height);
					this.scale.y *= oName.height /w3;
				}
				else oName.height = w3;
				sp.name = JSON.stringify(oName);	// dump用

				if (Button.cfg.oCfg.debug.masume) {
					const grpDbgMasume = new Graphics;
					grpDbgMasume.clear();
					grpDbgMasume.beginFill(0x883388, 0.2);
					grpDbgMasume.lineStyle(1, 0x883388, 1);
					grpDbgMasume.drawRect(sp.x, sp.y, w3, h);
					grpDbgMasume.endFill();
					this.addChild(grpDbgMasume);
				}
			},
			isStop=> {if (isStop) this.main.resume()}
		);
	}
	isStop = false;

}
