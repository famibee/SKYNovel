/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, IEvtMng} from './CmnLib';
import {ITwInf, CmnTween} from './CmnTween';
import {IHTag, IVariable, IMain, HArg} from './CmnInterface';
import {Application} from 'pixi.js';
import {SysBase} from './SysBase';

import TWEEN = require('@tweenjs/tween.js');

export class FrameMng {
	constructor(hTag: IHTag, private readonly appPixi: Application, private readonly val: IVariable, private readonly main: IMain, private readonly sys: SysBase, private readonly hTwInf: {[name: string]: ITwInf}) {
		//	HTMLフレーム
		hTag.add_frame		= o=> this.add_frame(o);	// フレーム追加
		hTag.let_frame		= o=> this.let_frame(o);	// フレーム変数を取得
		hTag.set_frame		= o=> this.set_frame(o);	// フレーム変数に設定
		hTag.frame			= o=> this.frame(o);		// フレームに設定
		hTag.tsy_frame		= o=> this.tsy_frame(o);	// フレームをトゥイーン開始
	}

	private evtMng	: IEvtMng;
	setEvtMng(evtMng: IEvtMng) {this.evtMng = evtMng;}

	//	HTMLフレーム
	// フレーム追加
	private add_frame(hArg: HArg) {
		const id = hArg.id;
		if (! id) throw 'idは必須です';
		const src = hArg.src;
		if (! src) throw 'srcは必須です';
		const frmnm = `const.sn.frm.${id}`;
		if (this.val.getVal(`tmp:${frmnm}`)) throw `frame【${id}】はすでにあります`;

		const a = CmnLib.argChk_Num(hArg, 'alpha', 1);
		const sx = CmnLib.argChk_Num(hArg, 'scale_x', 1);
		const sy = CmnLib.argChk_Num(hArg, 'scale_y', 1);
		const r = CmnLib.argChk_Num(hArg, 'rotate', 0);
		const v = CmnLib.argChk_Boolean(hArg, 'visible', true);
		const rct = this.rect(hArg);
		const cr = this.appPixi.view.getBoundingClientRect();
		this.appPixi.view.insertAdjacentHTML('beforebegin', `<iframe id="${id
		}" sandbox="allow-scripts allow-same-origin" src="${this.sys.cur + src
		}" style="z-index: 1; opacity: ${a}; position: absolute; left:${
			this.sys.ofsLeft4frm +cr.left +rct.x *this.sys.reso4frame
		}px; top: ${
			this.sys.ofsTop4frm  +cr.top  +rct.y *this.sys.reso4frame
		}px; border: 0px; overflow: hidden; display: ${v ?'inline' :'none'
		};" width="${rct.width *this.sys.reso4frame
		}" height="${rct.height *this.sys.reso4frame
		}" transform: scale(${sx}, ${sy}) rotate(${r}deg);></iframe>`);

		const ifrm = document.getElementById(id) as HTMLIFrameElement;
		const win = ifrm.contentWindow!;
		win.addEventListener('load', ()=> {
			// 組み込み変数
			this.val.setVal_Nochk('tmp', frmnm, true);
			this.val.setVal_Nochk('tmp', frmnm +'.alpha', a);
			this.val.setVal_Nochk('tmp', frmnm +'.x', rct.x);
			this.val.setVal_Nochk('tmp', frmnm +'.y', rct.y);
			this.val.setVal_Nochk('tmp', frmnm +'.scale_x', sx);
			this.val.setVal_Nochk('tmp', frmnm +'.scale_y', sy);
			this.val.setVal_Nochk('tmp', frmnm +'.rotate', r);
			this.val.setVal_Nochk('tmp', frmnm +'.width', rct.width);
			this.val.setVal_Nochk('tmp', frmnm +'.height', rct.height);
			this.val.setVal_Nochk('tmp', frmnm +'.visible', v);

			this.evtMng.resvFlameEvent(win);

			this.main.resume();
		}, {once: true, passive: true});

		return true;
	}
	private rect(hArg: HArg): DOMRect {
		const a = {...hArg};
		const re = this.sys.resolution;
		return new DOMRect(
			CmnLib.argChk_Num(a, 'x', 0) *re,
			CmnLib.argChk_Num(a, 'y', 0) *re,
			CmnLib.argChk_Num(a, 'width', CmnLib.stageW) *re,
			CmnLib.argChk_Num(a, 'height', CmnLib.stageH) *re,
		);
	}

	// フレーム変数を取得
	private let_frame(hArg: HArg) {
		const id = hArg.id;
		if (! id) throw 'idは必須です';
		const frmnm = `const.sn.frm.${id}`;
		if (! this.val.getVal(`tmp:${frmnm}`)) throw `frame【${id}】が読み込まれていません`;
		const var_name = hArg.var_name;
		if (! var_name) throw 'var_nameは必須です';

		const ifrm = document.getElementById(id) as HTMLIFrameElement;
		const win: Window = ifrm.contentWindow!;
		if (! win.hasOwnProperty(var_name)) throw `frame【${id}】に変数/関数【${var_name}】がありません。変数は var付きにして下さい`;

		const v = (win as any)[var_name];
		// var変数 / 関数実行の戻り値 -> 組み込み変数
		this.val.setVal_Nochk(
			'tmp',
			frmnm +'.'+ var_name,
			CmnLib.argChk_Boolean(hArg, 'function', false) ?v() :v
		);

		return false;
	}

	// フレーム変数に設定
	private set_frame(hArg: HArg) {
		const id = hArg.id;
		if (! id) throw 'idは必須です';
		const frmnm = `const.sn.frm.${id}`;
		if (! this.val.getVal(`tmp:${frmnm}`)) throw `frame【${id}】が読み込まれていません`;
		const var_name = hArg.var_name;
		if (! var_name) throw 'var_nameは必須です';
		const text = hArg.text;
		if (! text) throw 'textは必須です';

		// -> 組み込み変数
		this.val.setVal_Nochk('tmp', frmnm +'.'+ var_name, text);

		// -> var変数に設定
		const ifrm = document.getElementById(id) as HTMLIFrameElement;
		const win: any = ifrm.contentWindow!;
		win[var_name] = text;

		return false;
	}

	// フレームに設定
	private frame(hArg: HArg) {
		const id = hArg.id;
		if (! id) throw 'idは必須です';
		const frmnm = `const.sn.frm.${id}`;
		if (! this.val.getVal(`tmp:${frmnm}`)) throw `frame【${id}】が読み込まれていません`;

		const ifrm = document.getElementById(id) as HTMLIFrameElement;
		if ('alpha' in hArg) {
			const a = String(hArg.alpha);
			ifrm.style.opacity = a;
			this.val.setVal_Nochk('tmp', frmnm +'.alpha', a);
		}
		const rct = this.rect(hArg);
		if ('x' in hArg || 'y' in hArg) {
			const cr = this.appPixi.view.getBoundingClientRect();
			ifrm.style.left = this.sys.ofsLeft4frm +cr.left +rct.x *this.sys.reso4frame +'px';
			ifrm.style.top  = this.sys.ofsTop4frm  +cr.top  +rct.y *this.sys.reso4frame +'px';
			this.val.setVal_Nochk('tmp', frmnm +'.x', rct.x);
			this.val.setVal_Nochk('tmp', frmnm +'.y', rct.y);
		}
		if ('scale_x' in hArg || 'scale_y' in hArg || 'rotate' in hArg) {
			const sx = CmnLib.argChk_Num(hArg, 'scale_x', 1);
			const sy = CmnLib.argChk_Num(hArg, 'scale_y', 1);
			const r = CmnLib.argChk_Num(hArg, 'rotate', 0);
			ifrm.style.transform = `scale(${sx}, ${sy}) rotate(${r}deg)`;
			this.val.setVal_Nochk('tmp', frmnm +'.scale_x', sx);
			this.val.setVal_Nochk('tmp', frmnm +'.scale_y', sy);
			this.val.setVal_Nochk('tmp', frmnm +'.rotate', r);
		}
		if ('width' in hArg) {
			ifrm.style.width = String(rct.width *this.sys.reso4frame);
			this.val.setVal_Nochk('tmp', frmnm +'.width', rct.width);
		}
		if ('height' in hArg) {
			ifrm.style.height = String(rct.height *this.sys.reso4frame);
			this.val.setVal_Nochk('tmp', frmnm +'.height', rct.height);
		}
		if ('visible' in hArg) {
			const v = CmnLib.argChk_Boolean(hArg, 'visible', true);
			ifrm.style.display = v ?'inline' :'none';
			this.val.setVal_Nochk('tmp', frmnm +'.visible', v);
		}

		return false;
	}

	// フレームをトゥイーン開始
	private tsy_frame(hArg: HArg) {
		const id = hArg.id;
		if (! id) throw 'idは必須です';
		const frmnm = `const.sn.frm.${id}`;
		if (! this.val.getVal(`tmp:${frmnm}`, 0)) throw `frame【${id}】が読み込まれていません`;

		const ease = CmnTween.ease(hArg.ease);
		const ifrm = document.getElementById(id) as HTMLIFrameElement;
		const hNow: any = {};
		const hTo: any = {};
		const repeat = CmnLib.argChk_Num(hArg, 'repeat', 1);
		let fncA = ()=> {};
		if ('alpha' in hArg) {
			hNow.a = ifrm.style.opacity;
			hTo.a = CmnLib.argChk_Num(hArg, 'alpha', 0);
			fncA = ()=> {
				ifrm.style.opacity = hNow.a;
				this.val.setVal_Nochk('tmp', 'alpha', hNow.a);
			}
		}
		let fncXYSR = ()=> {};
		const rct = this.rect(hArg);
		if ('x' in hArg || 'y' in hArg
		|| 'scale_x' in hArg || 'scale_y' in hArg || 'rotate' in hArg) {
			hNow.x = Number(this.val.getVal(`tmp:${frmnm}.x`));
			hNow.y = Number(this.val.getVal(`tmp:${frmnm}.y`));
			hNow.sx = Number(this.val.getVal(`tmp:${frmnm}.scale_x`));
			hNow.sy = Number(this.val.getVal(`tmp:${frmnm}.scale_y`));
			hNow.r = Number(this.val.getVal(`tmp:${frmnm}.rotate`));
			hTo.x = rct.x;
			hTo.y = rct.y;
			hTo.sx = CmnLib.argChk_Num(hArg, 'scale_x', 1);
			hTo.sy = CmnLib.argChk_Num(hArg, 'scale_y', 1);
			hTo.r = CmnLib.argChk_Num(hArg, 'rotate', 0);
			const cr = this.appPixi.view.getBoundingClientRect();
			fncXYSR = ()=> {
				ifrm.style.left = this.sys.ofsLeft4frm +cr.left +hNow.x *this.sys.reso4frame +'px';
				ifrm.style.top  = this.sys.ofsTop4frm  +cr.top  +hNow.y *this.sys.reso4frame +'px';
				ifrm.style.transform = `scale(${hNow.sx}, ${hNow.sy}) rotate(${hNow.r}deg)`;
				this.val.setVal_Nochk('tmp', frmnm +'.x', hNow.x);
				this.val.setVal_Nochk('tmp', frmnm +'.y', hNow.y);
				this.val.setVal_Nochk('tmp', frmnm +'.scale_x', hNow.sx);
				this.val.setVal_Nochk('tmp', frmnm +'.scale_y', hNow.sy);
				this.val.setVal_Nochk('tmp', frmnm +'.rotate', hNow.r);
			};
		}
		let fncW = ()=> {};
		if ('width' in hArg) {
			hNow.w = this.val.getVal(`tmp:${frmnm}.width`);
			hTo.w = rct.width;
			fncW = ()=> {
				ifrm.style.width = hNow.w *this.sys.reso4frame +'px';
				this.val.setVal_Nochk('tmp', frmnm +'.width', hNow.w);
			};
		}
		let fncH = ()=> {};
		if ('height' in hArg) {
			hNow.h = this.val.getVal(`tmp:${frmnm}.height`);
			hTo.h = rct.height;
			fncH = ()=> {
				ifrm.style.height = hNow.h *this.sys.reso4frame +'px';
				this.val.setVal_Nochk('tmp', frmnm +'.height', hNow.h);
			};
		}

		this.appPixi.stage.interactive = false;
		const tw_nm = `frm\n${hArg.id}`;
		const tw = new TWEEN.Tween(hNow)
			.to(hTo, CmnLib.argChk_Num(hArg, 'time', NaN)
				* (Boolean(this.val.getVal('tmp:sn.skip.enabled')) ?0 :1))
			.delay(CmnLib.argChk_Num(hArg, 'delay', 0))
			.easing(ease)
			.repeat(repeat == 0 ?Infinity :(repeat -1))	// 一度リピート→計二回なので
			.yoyo(CmnLib.argChk_Boolean(hArg, 'yoyo', false))
			.onUpdate(()=> {fncA(); fncXYSR(); fncW(); fncH();})
			.onComplete(()=> {
				this.appPixi.stage.interactive = true;
				const twInf = this.hTwInf[tw_nm];
				if (! twInf) return;

				delete this.hTwInf[tw_nm];
				this.evtMng.popLocalEvts();	// [wait_tsy]したのにキャンセルされなかった場合向け
				if (twInf.resume) this.main.resume();
				if (twInf.onComplete) twInf.onComplete();
			})
			.start();

		this.hTwInf[tw_nm] = {tw: tw, resume: false, onComplete: ()=> {}}

		return false;
	}

}
