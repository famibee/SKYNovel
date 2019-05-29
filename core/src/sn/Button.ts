/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Container, Text, Rectangle, Texture} from "pixi.js";
import {uint, CmnLib, IEvtMng} from "./CmnLib";
import {HArg, IMain} from "./CmnInterface";
import {GrpLayer} from "./GrpLayer";

export class Button extends Container {
	static	fontFamily	= "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif";

	constructor(private main: IMain, private evtMng: IEvtMng, hArg: HArg) {
		super();

		const enabled = CmnLib.argChk_Boolean(hArg, 'enabled', true);
		if (enabled) this.evtMng.button(hArg, this);
		// 文字列から生成
		if (hArg.text) {
			const fontSize = uint(hArg.height || 30);
			const style = {
				fill: 'black',
				align: 'center',
				fontFamily: Button.fontFamily,
				fontSize: fontSize,
				padding: 5,
				dropShadow: true,
				dropShadowAlpha: 0.7,
				dropShadowColor: 'white',
				dropShadowBlur: 3,
				dropShadowDistance: 0,
			};
			if (hArg.style) Button.s2hStyle(style, hArg.style);
			const txt = new Text(hArg.text, style);
			txt.alpha = CmnLib.argChk_Num(hArg, 'alpha', txt.alpha);
			txt.pivot.set(
				CmnLib.argChk_Num(hArg, 'pivot_x', txt.pivot.x),
				CmnLib.argChk_Num(hArg, 'pivot_y', txt.pivot.y)
			);
			txt.rotation = CmnLib.argChk_Num(hArg, 'rotation', txt.rotation);
			txt.scale.set(
				CmnLib.argChk_Num(hArg, 'scale_x', txt.scale.x),
				CmnLib.argChk_Num(hArg, 'scale_y', txt.scale.y)
			);
			txt.width = uint(hArg.width || 100);
			txt.height = fontSize;
			txt.x = uint(hArg.left || 0);
			txt.y = uint(hArg.top || 0);
			this.addChild(txt);
			if (! enabled) return;

			const normal = ()=> Object.assign(txt.style, style);

			const style_hover = {...style};
			if (hArg.style_hover) Button.s2hStyle(style_hover, hArg.style_hover);
			else style_hover.fill = 'white';
			const hover = ()=> Object.assign(txt.style, style_hover);

			const style_clicked = {...style_hover};
			if (hArg.style_clicked) Button.s2hStyle(style_clicked, hArg.style_clicked);
			else style_clicked.dropShadow = false;
			const clicked = ()=> Object.assign(txt.style, style_clicked);

			this.on('pointerover', hover);
			this.on('pointerout', normal);
			this.on('pointerdown', clicked);
			this.on('pointerup', hover);
			return;
		}

		if (! hArg.pic) throw 'textまたはpic属性は必須です';
		// 画像から生成
		this.isStop = GrpLayer.csv2Sprites(
			hArg.pic,
			this,
			sp=> {
				sp.alpha = CmnLib.argChk_Num(hArg, 'alpha', sp.alpha);
				sp.pivot.set(
					CmnLib.argChk_Num(hArg, 'pivot_x', sp.pivot.x),
					CmnLib.argChk_Num(hArg, 'pivot_y', sp.pivot.y)
				);
				sp.rotation = CmnLib.argChk_Num(hArg, 'rotation', sp.rotation);
				sp.scale.set(
					CmnLib.argChk_Num(hArg, 'scale_x', sp.scale.x),
					CmnLib.argChk_Num(hArg, 'scale_y', sp.scale.y)
				);
				sp.x = uint(hArg.left || 0);
				sp.y = uint(hArg.top || 0);

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
				this.on('pointerup', hover);
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

		//Object.assign(hStyle, s);
			// 不要要素もコピーしすぎて不具合になるので、以下のようにする
		const len = s.length;
		for (let i=0; i<len; ++i) {
			const nm: any = s[i];
			hStyle[nm] = s[nm];
		}
	}

}
