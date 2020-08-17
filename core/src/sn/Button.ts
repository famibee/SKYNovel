/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Container, Text, Rectangle, Texture} from 'pixi.js';
import {uint, CmnLib, IEvtMng, argChk_Boolean, argChk_Num} from './CmnLib';
import {HArg, IMain} from './CmnInterface';
import {GrpLayer} from './GrpLayer';
import {Layer} from './Layer';

export class Button extends Container {
	static	fontFamily	= "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif";

	constructor(private readonly main: IMain, private readonly evtMng: IEvtMng, hArg: HArg) {
		super();

		let oName: any = {};
		const enabled = oName.enabled = argChk_Boolean(hArg, 'enabled', true);
		if (enabled) this.evtMng.button(hArg, this);
		// 文字列から生成
		if ('text' in hArg) {
			const fontSize = uint(hArg.height || 30);
			const style = {
				fill: 'black',
				align: 'center',
				fontFamily: Button.fontFamily,
				fontSize: fontSize,
				padding: 5,
				dropShadow: true,
				dropShadowAlpha: 0.7,
			//	dropShadowColor: 'white',	// pixi.js v5.0.3 で色名前が使えない
				dropShadowColor: '#ffffff',
				dropShadowBlur: 7,
				dropShadowDistance: 0,
			};
			if (hArg.style) Button.s2hStyle(style, hArg.style);
			const txt = new Text(hArg.text ?? '', style);
			txt.alpha = argChk_Num(hArg, 'alpha', txt.alpha);
			txt.pivot.set(
				argChk_Num(hArg, 'pivot_x', txt.pivot.x),
				argChk_Num(hArg, 'pivot_y', txt.pivot.y)
			);
			txt.rotation = argChk_Num(hArg, 'rotation', txt.rotation);
			txt.scale.set(
				argChk_Num(hArg, 'scale_x', txt.scale.x),
				argChk_Num(hArg, 'scale_y', txt.scale.y)
			);
			txt.width = uint(hArg.width || 100);
			txt.height = fontSize;
			txt.x = uint(hArg.left || 0);
			txt.y = uint(hArg.top || 0);

			oName.type = 'text';	// dump用
			oName = {...oName, ...style};
			oName.alpha = txt.alpha;
			oName.text = txt.text;
			oName.rotation = txt.rotation;
			oName.pivot_x = txt.pivot.x;
			oName.pivot_y = txt.pivot.y;
			oName.scale_x = txt.scale.x;
			oName.scale_y = txt.scale.y;
			oName.width = txt.width;
			oName.height = txt.height;
			oName.x = txt.x;
			oName.y = txt.y;

			if (hArg.b_pic) {
				oName.b_pic = hArg.b_pic;
				const cnt = new Container();
				this.addChild(cnt);
				this.isStop = GrpLayer.csv2Sprites(
					hArg.b_pic,
					cnt,
					sp=> {
						sp.alpha = txt.alpha;
						sp.rotation = txt.rotation;
						sp.x = txt.x;
						sp.y = txt.y;
						sp.pivot.set(
							(sp.width -txt.width) /2,
							(sp.height -txt.height) /2
						);
					},
					isStop=> {
						Layer.setBlendmode(this, hArg);
						if (isStop) this.main.resume()
					}
				);
			}
			txt.name = JSON.stringify(oName);

			this.addChild(txt);
			if (! hArg.b_pic) Layer.setBlendmode(this, hArg);	// 重なり順でここ
			if (! enabled) return;

			const normal = ()=> txt.style = {...txt.style, ...style};

			const style_hover = {...style};
			if (hArg.style_hover) Button.s2hStyle(style_hover, hArg.style_hover);
			else style_hover.fill = 'white';
			const hover = ()=> txt.style = {...txt.style, ...style_hover};

			const style_clicked = {...style_hover};
			if (hArg.style_clicked) Button.s2hStyle(style_clicked, hArg.style_clicked);
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
				sp.alpha = argChk_Num(hArg, 'alpha', sp.alpha);
				sp.pivot.set(
					argChk_Num(hArg, 'pivot_x', sp.pivot.x),
					argChk_Num(hArg, 'pivot_y', sp.pivot.y)
				);
				sp.rotation = argChk_Num(hArg, 'rotation', sp.rotation);
				sp.scale.set(
					argChk_Num(hArg, 'scale_x', sp.scale.x),
					argChk_Num(hArg, 'scale_y', sp.scale.y)
				);
				sp.x = uint(hArg.left || 0);
				sp.y = uint(hArg.top || 0);

				oName.alpha = sp.alpha;	// dump用
				oName.rotation = sp.rotation;
				oName.pivot_x = sp.pivot.x;
				oName.pivot_y = sp.pivot.y;
				oName.scale_x = sp.scale.x;
				oName.scale_y = sp.scale.y;
				oName.width = sp.width;
				oName.height = sp.height;
				oName.x = sp.x;
				oName.y = sp.y;
				sp.name = JSON.stringify(oName);

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
			},
			isStop=> {if (isStop) this.main.resume()}
		);
	}
	isStop = false;

	private	static	cln: HTMLSpanElement;
	private	static	s2hStyle(hStyle: any, style: string) {
		Button.cln	= document.createElement('span');
		const s = Button.cln.style;
		s.cssText = style;

		// hStyle = {...hStyle, ...s};
			// 不要要素もコピーしすぎて不具合になるので、以下のようにする
		const len = s.length;
		for (let i=0; i<len; ++i) {
			const nm: any = s[i];
			hStyle[nm] = s[nm];
		}
	}

}
