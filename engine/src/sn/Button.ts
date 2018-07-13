/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import { Container, Text } from "pixi.js";
import { HArg, uint, IEvtMng, CmnLib } from "./CmnLib";
import {GrpLayer} from "./GrpLayer";

export class Button extends Container {
	constructor(hArg: HArg, evtMng: IEvtMng) {
		super();

		const enabled = CmnLib.argChk_Boolean(hArg, 'enabled', true);
		if (enabled) {
			this.makeRsv = ()=> evtMng.button(hArg, this);
			this.makeRsv();
		}
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
			txt.x = uint(hArg.left || 0);
			txt.y = uint(hArg.top || 0);
			txt.width = uint(hArg.width || 100);
			txt.height = fontSize;
			this.addChild(txt);
			if (! enabled) return;

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
			return;
		}

		if (hArg.pic) GrpLayer.csv2Sprites(
			hArg.pic,
			this,
			sp=> {
				sp.x = uint(hArg.left || 0);
				sp.y = uint(hArg.top || 0);
			}
		)
		else throw 'textまたはpic属性は必須です';
	}
	makeRsv	= ()=> {};


//	href	n	何もしない	URL	クリック時にブラウザで指定URLを開く
//	target	n	何もしない	HTML <a>タグのtarget属性	hrefにてブラウザを開く際のtarget属性

//	hint	n		String	設定した場合のみ、マウスカーソルを載せるとヒントをチップス表示する

//	clickse	n	省略時は無音	効果音ファイル名	指定すると、クリック時に効果音を再生する
//	enterse	n	省略時は無音	効果音ファイル名	指定すると、ボタン上にマウスカーソルが載った時に効果音を再生する
//	leavese	n	省略時は無音	効果音ファイル名	指定すると、ボタン上からマウスカーソルが外れた時に効果音を再生する
//	clicksebuf	n	SYS	サウンドバッファ名	クリック時効果音を再生するサウンドバッファを指定する
//	entersebuf	n	SYS	サウンドバッファ名	クリック時効果音を再生するサウンドバッファを指定する
//	leavesebuf	n	SYS	サウンドバッファ名	クリック時効果音を再生するサウンドバッファを指定する

//	onenter	n	何もしない	ラベル名	マウス重なり（フォーカス取得）時、指定したラベルをコールする。 必ず[return]で戻ること。
//	onleave	n	何もしない	ラベル名	マウス重なり外れ（フォーカス外れ）時、指定したラベルをコールする。 必ず[return]で戻ること。

//	arg	n		String	指定した場合、クリック時ジャンプ先で「&sn.eventArg」にて値を受け取れる

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