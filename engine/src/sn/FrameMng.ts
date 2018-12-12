/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, IHTag, IVariable, IMain, uint, ITwInf, IEvtMng} from './CmnLib';
import {Application} from 'pixi.js';
import {SysBase} from './SysBase';

import TWEEN = require('@tweenjs/tween.js');

export class FrameMng {
	constructor(hTag: IHTag, private appPixi: Application, private val: IVariable, private main: IMain, private sys: SysBase, private hTwInf: {[name: string]: ITwInf}) {
		//	HTMLフレーム
		hTag.add_frame		= o=> this.add_frame(o);	// HTMLフレーム追加
		hTag.let_frame		= o=> this.let_frame(o);	// HTML要素を取得
		hTag.set_frame		= o=> this.set_frame(o);	// HTML要素に設定
		hTag.frame			= o=> this.frame(o);		// HTMLフレームに設定
		hTag.tsy_frame		= o=> this.tsy_frame(o);	// HTMLフレームトゥイーン開始
	}

	private evtMng	: IEvtMng	= null;
	setEvtMng(evtMng: IEvtMng) {this.evtMng = evtMng;}

	//	HTMLフレーム
	// HTMLフレーム追加
	private add_frame(hArg) {
		const id = hArg.id;
		if (! id) throw 'idは必須です';
		const src = hArg.src;
		if (! src) throw 'srcは必須です';
		const frmnm = `const.sn.frm.${id}`;
		if (this.val.getVal(`tmp:${frmnm}`)) throw(`frame【${id}】はすでにあります`);

		const cvs = this.appPixi.view;
		const rect = cvs.getBoundingClientRect();
		const a = CmnLib.argChk_Num(hArg, 'alpha', 1);
		const x = ('x' in hArg) ? hArg.x : rect.left+ window.pageYOffset +'px';
		const y = ('y' in hArg) ? hArg.y : rect.top + window.pageXOffset +'px';
		const w = ('width' in hArg) ? hArg.width : CmnLib.stageW;
		const h = ('height' in hArg) ? hArg.height : CmnLib.stageH;
		const sx = CmnLib.argChk_Num(hArg, 'scale_x', 1);
		const sy = CmnLib.argChk_Num(hArg, 'scale_y', 1);
		const r = CmnLib.argChk_Num(hArg, 'rotate', 0);
		const v = CmnLib.argChk_Boolean(hArg, 'visible', true);
		cvs.insertAdjacentHTML('beforebegin', `<iframe id="${id
		}" sandbox="allow-scripts allow-same-origin" src="${this.sys.cur + src
		}" style="z-index: 1; opacity: ${a}; position: absolute; left:${x}; top: ${y
		}; border: 0px; overflow: hidden; visibility: ${v ?'visible' :'hidden'
		};" width="${w}" height="${h}" transform: scale(${sx}, ${sy}) rotate(${r
		}deg);></iframe>`);

		const ifrm = document.getElementById(id) as HTMLIFrameElement;
		const win = ifrm.contentWindow;
		win.addEventListener('load', ()=> {
			// 組み込み変数
			this.val.setVal_Nochk('tmp', frmnm, true);
			this.val.setVal_Nochk('tmp', frmnm +'.alpha', a);
			this.val.setVal_Nochk('tmp', frmnm +'.x', x);
			this.val.setVal_Nochk('tmp', frmnm +'.y', y);
			this.val.setVal_Nochk('tmp', frmnm +'.scale_x', sx);
			this.val.setVal_Nochk('tmp', frmnm +'.scale_y', sy);
			this.val.setVal_Nochk('tmp', frmnm +'.rotate', r);
			this.val.setVal_Nochk('tmp', frmnm +'.width', w);
			this.val.setVal_Nochk('tmp', frmnm +'.height', h);
			this.val.setVal_Nochk('tmp', frmnm +'.visible', v);

			this.main.resume();
		});

		return true;
	}

	// HTML要素を取得
	private let_frame(hArg) {
		const id = hArg.id;
		if (! id) throw 'idは必須です';
		const frmnm = `const.sn.frm.${id}`;
		if (! this.val.getVal(`tmp:${frmnm}`)) throw(`frame【${id}】が読み込まれていません`);
		const var_name = hArg.var_name;
		if (! var_name) throw 'var_nameは必須です';

		const ifrm = document.getElementById(id) as HTMLIFrameElement;
		const win = ifrm.contentWindow;
		if (! (var_name in win)) throw `frame【${id}】に変数/関数【${var_name}】がありません。変数は var付きにして下さい`;

		// var変数 / 関数実行の戻り値 -> 組み込み変数
		this.val.setVal_Nochk(
			'tmp',
			frmnm +'.'+ var_name,
			CmnLib.argChk_Boolean(hArg, 'function', false)
				? win[var_name]()
				: win[var_name]
		);

		return false;
	}

	// HTML要素に設定
	private set_frame(hArg) {
		const id = hArg.id;
		if (! id) throw 'idは必須です';
		const frmnm = `const.sn.frm.${id}`;
		if (! this.val.getVal(`tmp:${frmnm}`)) throw(`frame【${id}】が読み込まれていません`);
		const var_name = hArg.var_name;
		if (! var_name) throw 'var_nameは必須です';
		const text = hArg.text;
		if (! text) throw 'textは必須です';

		// -> 組み込み変数
		this.val.setVal_Nochk('tmp', frmnm +'.'+ var_name, text);

		// -> var変数に設定
		const ifrm = document.getElementById(id) as HTMLIFrameElement;
		const win = ifrm.contentWindow;
		win[var_name] = text;

		return false;
	}

	// HTMLフレームに設定
	private frame(hArg) {
		const id = hArg.id;
		if (! id) throw 'idは必須です';
		const frmnm = `const.sn.frm.${id}`;
		if (! this.val.getVal(`tmp:${frmnm}`)) throw(`frame【${id}】が読み込まれていません`);

		const ifrm = document.getElementById(id) as HTMLIFrameElement;
		if ('alpha' in hArg) {
			const a = hArg.alpha;
			ifrm.style.opacity = a;
			this.val.setVal_Nochk('tmp', frmnm +'.alpha', a);
		}
		if ('x' in hArg || 'y' in hArg || 'scale_x' in hArg || 'scale_y' in hArg
		|| 'rotate' in hArg) {
			const x = CmnLib.argChk_Num(hArg, 'x', 0);
			const y = CmnLib.argChk_Num(hArg, 'y', 0);
			const sx = CmnLib.argChk_Num(hArg, 'scale_x', 1);
			const sy = CmnLib.argChk_Num(hArg, 'scale_y', 1);
			const r = CmnLib.argChk_Num(hArg, 'rotate', 0);
			ifrm.style.transform = `matrix(${sx}, 0, 0, ${sy}, ${x}, ${y}) rotate(${
				r}deg)`;
			this.val.setVal_Nochk('tmp', frmnm +'.x', x);
			this.val.setVal_Nochk('tmp', frmnm +'.y', y);
			this.val.setVal_Nochk('tmp', frmnm +'.scale_x', sx);
			this.val.setVal_Nochk('tmp', frmnm +'.scale_y', sy);
			this.val.setVal_Nochk('tmp', frmnm +'.rotate', r);
		}
		if ('width' in hArg) {
			const w = hArg.width;
			ifrm.style.width = w;
			this.val.setVal_Nochk('tmp', frmnm +'.width', w);
		}
		if ('height' in hArg) {
			const h = hArg.height;
			ifrm.style.height = h;
			this.val.setVal_Nochk('tmp', frmnm +'.height', h);
		}
		if ('visible' in hArg) {
			const v = CmnLib.argChk_Boolean(hArg, 'visible', true);
			ifrm.style.visibility = v ?'visible' :'hidden';
			this.val.setVal_Nochk('tmp', frmnm +'.visible', v);
		}

		return false;
	}

	// HTMLフレームをトゥイーン開始
	private tsy_frame(hArg) {
		const id = hArg.id;
		if (! id) throw 'idは必須です';
		const frmnm = `const.sn.frm.${id}`;
		if (! this.val.getVal(`tmp:${frmnm}`, 0)) throw(`frame【${id}】が読み込まれていません`);
		const ease = hArg.ease ?CmnLib.hEase[hArg.ease]: TWEEN.Easing.Linear.None;
		if (! ease) throw '異常なease指定です';

		const ifrm = document.getElementById(id) as HTMLIFrameElement;
		const hNow = {};
		const hTo = {};
		const repeat = CmnLib.argChk_Num(hArg, 'repeat', 1);
		let fncA = ()=> {};
		if ('alpha' in hArg) {
			hNow['a'] = ifrm.style.opacity;
			hTo['a'] = CmnLib.argChk_Num(hArg, 'alpha', 0);
			fncA = ()=> {
				ifrm.style.opacity = hNow['a'];
				this.val.setVal_Nochk('tmp', 'alpha', hNow['a']);
			}
		}
		let fncR = ()=> {};
		if ('rotate' in hArg) {
			hNow['rotate'] = this.val.getVal(`tmp:${frmnm}.rotate`);
			hTo['rotate'] = CmnLib.argChk_Num(hArg, 'rotate', 0);
			fncR = ()=> {
				ifrm.style.transform = `rotate(${hNow['rotate']}deg)`;
				this.val.setVal_Nochk('tmp', frmnm +'.rotate', hNow['rotate']);
			};
		}

/*
		if ('x' in hArg || 'y' in hArg || 'scale_x' in hArg || 'scale_y' in hArg
		|| 'rotate' in hArg) {
			const x = CmnLib.argChk_Num(hArg, 'x', 0);
			const y = CmnLib.argChk_Num(hArg, 'y', 0);
			const sx = CmnLib.argChk_Num(hArg, 'scale_x', 1);
			const sy = CmnLib.argChk_Num(hArg, 'scale_y', 1);
			const r = CmnLib.argChk_Num(hArg, 'rotate', 0);
			ifrm.style.transform = `matrix(${sx}, 0, 0, ${sy}, ${x}, ${y}) rotate(${
				r}deg)`;
			this.val.setVal_Nochk('tmp', 'x', x);
			this.val.setVal_Nochk('tmp', 'y', y);
			this.val.setVal_Nochk('tmp', 'scale_x', sx);
			this.val.setVal_Nochk('tmp', 'scale_y', sy);
			this.val.setVal_Nochk('tmp', 'rotate', r);
		}
		if ('width' in hArg) {
			const w = hArg.width;
			ifrm.style.width = w;
			this.val.setVal_Nochk('tmp', 'width', w);
		}
		if ('height' in hArg) {
			const h = hArg.height;
			ifrm.style.height = h;
			this.val.setVal_Nochk('tmp', 'height', h);
		}
		if ('visible' in hArg) {
			const v = CmnLib.argChk_Boolean(hArg, 'visible', true);
			ifrm.style.visibility = v ?'visible' :'hidden';
			this.val.setVal_Nochk('tmp', 'visible', v);
		}
*/



/*
const transform = getComputedStyle(ifrm, null).getPropertyValue('-webkit-transform');
console.log(`fn:FrameMng.ts line:183 transform:${transform}:`);
*/
/*
		hNow['sx'] = 1;	// ===
		hNow['sy'] = 1;	// ===
		hTo['sx'] = CmnLib.argChk_Num(hArg, 'scale_x', 1);
		hTo['sy'] = CmnLib.argChk_Num(hArg, 'scale_y', 1);
		let fncXY = ()=> {};
		if ('x' in hArg || 'y' in hArg) {
			const rect = ifrm.getBoundingClientRect();
			hNow['x'] = rect.left;
			hNow['y'] = rect.top;
			hTo['x'] = CmnLib.argChk_Num(hArg, 'x', 0);
			hTo['y'] = CmnLib.argChk_Num(hArg, 'y', 0);
			fncXY = ()=> {
				const x = uint(hNow['x']) +'px';
				ifrm.style.left = x;
				this.val.setVal_Nochk('tmp', 'x', x);
				const y = uint(hNow['y']) +'px';
				ifrm.style.top = y;
				this.val.setVal_Nochk('tmp', 'y', y);
			}
		}
*/
		const tw_nm = `frm\n${hArg.id}`;
		const tw = new TWEEN.Tween(hNow)
			.to(hTo, CmnLib.argChk_Num(hArg, 'time', NaN)
				* (Boolean(this.val.getVal('tmp:sn.skip.enabled')) ?0 :1))
			.delay(CmnLib.argChk_Num(hArg, 'delay', 0))
			.easing(ease)
			.repeat(repeat == 0 ?Infinity :(repeat -1))	// 一度リピート→計二回なので
			.yoyo(CmnLib.argChk_Boolean(hArg, 'yoyo', false))
			.onUpdate(()=> {
				fncA();
//				fncXY();
				fncR();
			})
			.onComplete(()=> {
				const twInf = this.hTwInf[tw_nm];
				if (! twInf) return;
				delete this.hTwInf[tw_nm];
				this.evtMng.popLocalEvts();	// [wait_tsy]したのにキャンセルされなかった場合向け
				if (twInf.resume) this.main.resume();
				if ('onComplete' in twInf) twInf.onComplete();
			})
			.start();

		this.hTwInf[tw_nm] = {tw: tw, resume: false, onComplete: ()=> {}}

		return false;
	}

}
