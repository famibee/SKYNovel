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
			const htmnm = `const.sn.htm.${id}`;
			this.val.setVal_Nochk('tmp', htmnm, true);
			this.val.setVal_Nochk('tmp', 'alpha', a);
			this.val.setVal_Nochk('tmp', 'x', x);
			this.val.setVal_Nochk('tmp', 'y', y);
			this.val.setVal_Nochk('tmp', 'scale_x', sx);
			this.val.setVal_Nochk('tmp', 'scale_y', sy);
			this.val.setVal_Nochk('tmp', 'rotate', r);
			this.val.setVal_Nochk('tmp', 'width', w);
			this.val.setVal_Nochk('tmp', 'height', h);
			this.val.setVal_Nochk('tmp', 'visible', v);

			this.main.resume();
		});

		return true;
	}

	// HTML要素を取得
	private let_frame(hArg) {
		const id = hArg.id;
		if (! id) throw 'idは必須です';
		const htmnm = `const.sn.htm.${id}`;
		if (! this.val.getVal(`tmp:${htmnm}`, 0)) throw(`HTML【${id}】が読み込まれていません`);
		const var_name = hArg.var_name;
		if (! var_name) throw 'var_nameは必須です';

		const ifrm = document.getElementById(id) as HTMLIFrameElement;
		const win = ifrm.contentWindow;
		if (! (var_name in win)) throw `HTML【${id}】に変数/関数【${var_name}】がありません。変数は var付きにして下さい`;

		// var変数 / 関数実行の戻り値 -> 組み込み変数
		this.val.setVal_Nochk(
			'tmp',
			htmnm +'.'+ var_name,
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
		const htmnm = `const.sn.htm.${id}`;
		if (! this.val.getVal(`tmp:${htmnm}`, 0)) throw(`HTML【${id}】が読み込まれていません`);
		const var_name = hArg.var_name;
		if (! var_name) throw 'var_nameは必須です';
		const text = hArg.text;
		if (! text) throw 'textは必須です';

		// -> 組み込み変数
		this.val.setVal_Nochk('tmp', htmnm +'.'+ var_name, text);

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
		const htmnm = `const.sn.htm.${id}`;
		if (! this.val.getVal(`tmp:${htmnm}`, 0)) throw(`HTML【${id}】が読み込まれていません`);

		const ifrm = document.getElementById(id) as HTMLIFrameElement;
		if ('alpha' in hArg) {
			const a = hArg.alpha;
			ifrm.style.opacity = a;
			this.val.setVal_Nochk('tmp', 'alpha', a);
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

		return false;
	}

	// HTMLフレームをトゥイーン開始
	private tsy_frame(hArg) {
		const id = hArg.id;
		if (! id) throw 'idは必須です';
		const htmnm = `const.sn.htm.${id}`;
		if (! this.val.getVal(`tmp:${htmnm}`, 0)) throw(`HTML【${id}】が読み込まれていません`);
		const ease = hArg.ease ?CmnLib.hEase[hArg.ease]: TWEEN.Easing.Linear.None;
		if (! ease) throw '異常なease指定です';

		const ifrm = document.getElementById(id) as HTMLIFrameElement;
		const hNow = {};
		const hTo = {};
		const repeat = CmnLib.argChk_Num(hArg, 'repeat', 1);
/*
const transform = getComputedStyle(ifrm, null).getPropertyValue('-webkit-transform');
console.log(`fn:FrameMng.ts line:183 transform:${transform}:`);
*/
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
		let fncR = ()=> {};
		if ('rotate' in hArg) {
			hNow['r'] = ifrm.style.rotate || 0;
console.log(`fn:FrameMng.ts line:191 hNow['r']:${hNow['r']}:`);
			hTo['r'] = CmnLib.argChk_Num(hArg, 'rotate', 0);
console.log(`fn:FrameMng.ts line:193 hTo['r']:${hTo['r']}`);
			fncR = ()=> {
				ifrm.style.rotate = hNow['r'] +'deg';
console.log(`fn:FrameMng.ts line:195 ifrm.style.rotate:${ifrm.style.rotate}:`);
			}
		}
		let fncRX = ()=> '';
		if ('rotate_x' in hArg) {
			hTo['rotate_x'] = CmnLib.argChk_Num(hArg, 'rotate_x', 0);
			hNow['rotate_x'] = CmnLib.argChk_Num(hArg, 'rotate_x', 0);
			fncRX = ()=> `rotate_x(${hNow['rotate_x']}deg); `;
		}
		let fncRY = ()=> '';
		if ('rotate_y' in hArg) {
			hTo['rotate_y'] = CmnLib.argChk_Num(hArg, 'rotate_y', 0);
			hNow['rotate_y'] = CmnLib.argChk_Num(hArg, 'rotate_y', 0);
			fncRX = ()=> `rotate_y(${hNow['rotate_y']}deg); `;
		}
		let fncRZ = ()=> '';
		if ('rotate_z' in hArg) {
			hTo['rotate_z'] = CmnLib.argChk_Num(hArg, 'rotate_z', 0);
			hNow['rotate_z'] = CmnLib.argChk_Num(hArg, 'rotate_z', 0);
			fncRX = ()=> `rotate_z(${hNow['rotate_z']}deg); `;
		}
		const tw_nm = `htm.${id}-`;
		const tw = new TWEEN.Tween(hNow)
			.to(hTo, CmnLib.argChk_Num(hArg, 'time', NaN)
				* (Boolean(this.val.getVal('tmp:sn.skip.enabled')) ?0 :1))
			.delay(CmnLib.argChk_Num(hArg, 'delay', 0))
			.easing(ease)
			.repeat(repeat == 0 ?Infinity :(repeat -1))	// 一度リピート→計二回なので
			.yoyo(CmnLib.argChk_Boolean(hArg, 'yoyo', false))
			.onUpdate(()=> {
				fncXY();
				fncR();
				ifrm.style.transform
				= fncRX() + fncRY() + fncRZ()
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

		return false;
	}

}
