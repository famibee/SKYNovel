/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import { Container, Text, Rectangle } from "pixi.js";
import { HArg, uint, IEvtMng, CmnLib, IMain } from "./CmnLib";
import {GrpLayer} from "./GrpLayer";

export class Button extends Container {
	private	static	main	: IMain		= null;
	private	static	evtMng	: IEvtMng	= null;
	static	init(main: IMain, evtMng: IEvtMng): void {
		Button.main = main;
		Button.evtMng = evtMng;
	}

	init(hArg: HArg, parent: Container): boolean {
		parent.addChild(this);

		const enabled = CmnLib.argChk_Boolean(hArg, 'enabled', true);
		if (enabled) Button.evtMng.button(hArg, this);
		if (hArg.text) {
			const fontSize = uint(hArg.height || 30);
			const style = {
				fill: 'black',
				align: 'center',
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
			if (! enabled) return false;

			const normal = ()=> {for (const k in style) txt.style[k] = style[k]};

			const style_hover = {...style};
			if (hArg.style_hover) Button.s2hStyle(style_hover, hArg.style_hover);
			else style_hover.fill = 'white';
			const hover = ()=> {
				for (const k in style_hover) txt.style[k] = style_hover[k]
			};

			const style_clicked = {...style_hover};
			if (hArg.style_clicked) Button.s2hStyle(style_clicked, hArg.style_clicked);
			else style_clicked.dropShadow = false;
			const clicked = ()=> {
				for (const k in style_clicked) txt.style[k] = style_clicked[k]
			};
			this.on('pointerover', hover);
			this.on('pointerout', normal);
			this.on('pointerdown', clicked);
			this.on('pointerup', hover);
			return false;
		}

		if (! ('pic' in hArg)) throw 'textまたはpic属性は必須です';
		const join = CmnLib.argChk_Boolean(hArg, 'join', false);
		return GrpLayer.csv2Sprites(
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
				const txNormal = new PIXI.Texture(tx, new Rectangle(0, 0, w3, h));
				const txClicked = new PIXI.Texture(tx, new Rectangle(w3, 0, w3, h));
				const txHover = new PIXI.Texture(tx, new Rectangle(w3 *2, 0, w3, h));
				const normal = ()=> sp.texture = txNormal;
				const hover = ()=> sp.texture = txHover;
				const clicked = ()=> sp.texture = txClicked;
				this.on('pointerover', hover);
				this.on('pointerout', normal);
				this.on('pointerdown', clicked);
				this.on('pointerup', hover);
				normal();
			},
			isStop=> {if (isStop && join) Button.main.resume()}
		);
	}

	private	static	cln	= document.createElement('span');
	private	static	s2hStyle(hStyle: {}, style: string) {
		Button.cln.style.cssText = style;
		const len = Button.cln.style.length;
		for (let i=0; i<len; ++i) {
			const key = Button.cln.style[i];
			hStyle[key] = Button.cln.style[key];
		}
	}

}