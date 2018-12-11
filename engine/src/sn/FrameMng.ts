/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, IHTag, IVariable, IMain} from './CmnLib';
import {Application} from 'pixi.js';
import {SysBase} from './SysBase';

export class FrameMng {
	constructor(hTag: IHTag, private appPixi: Application, private val: IVariable, private main: IMain, private sys: SysBase) {
		//	HTMLフレーム
		hTag.add_frame		= o=> this.add_frame(o);		// HTMLフレーム追加
		hTag.let_frame		= o=> this.let_frame(o);		// HTML要素を取得
		hTag.set_frame		= o=> this.set_frame(o);		// HTML要素に設定
		hTag.frame			= o=> this.frame(o);			// HTMLフレームに設定
		hTag.tsy_frame		= o=> this.tsy_frame(o);		// HTMLフレームをアニメ
	}

	//	HTMLフレーム
	// HTMLフレーム追加
	private add_frame(hArg) {
		const id = hArg.id;
		if (! id) throw 'idは必須です';
		const src = hArg.src;
		if (! src) throw 'srcは必須です';

		const cvs = this.appPixi.view;
		const rect = cvs.getBoundingClientRect();
		const x = CmnLib.argChk_Num(hArg, 'x', rect.top + window.pageYOffset);
		const y = CmnLib.argChk_Num(hArg, 'y', rect.left + window.pageXOffset);
		const w = CmnLib.argChk_Num(hArg, 'width', CmnLib.stageW);
		const h = CmnLib.argChk_Num(hArg, 'height', CmnLib.stageH);
//console.log(`fn:LayerMng.ts line:109 sys.cur:${sys.cur}`);
		const v = CmnLib.argChk_Boolean(hArg, 'visible', true);
		cvs.insertAdjacentHTML('beforebegin', `<iframe id="${id
		}" sandbox="allow-scripts allow-same-origin" src="${this.sys.cur + src
		}" style="z-index: 1; position: absolute; left:${x}px; top: ${y
		}px; border: 0px; overflow: hidden; visibility: ${v ?'visible' :'hidden'
		};" width="${w}" height="${h}"></iframe>`);

		const ifrm = document.getElementById(id) as HTMLIFrameElement;
		const win = ifrm.contentWindow;
		win.addEventListener('load', ()=> {
			// 組み込み変数
			const htmnm = `const.sn.htm.${id}`;
			this.val.setVal_Nochk('tmp', htmnm, true);
			// alpha
			this.val.defTmp(htmnm +'.height', ()=> h);
			this.val.defTmp(htmnm +'.visible', ()=> v);
			this.val.defTmp(htmnm +'.width', ()=> w);

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
		const ease = hArg.ease ?CmnLib.hEase[hArg.ease]: TWEEN.Easing.Linear.None;
		if (! ease) throw '異常なease指定です';

		const hTo = {};
		const repeat = CmnLib.argChk_Num(hArg, 'repeat', 1);
		const tw = new TWEEN.Tween(hTo)
			.to(hTo, CmnLib.argChk_Num(hArg, 'time', NaN)
				* (Boolean(this.val.getVal('tmp:sn.skip.enabled')) ?0 :1))
			.delay(CmnLib.argChk_Num(hArg, 'delay', 0))
			.easing(ease)
			.repeat(repeat == 0 ?Infinity :(repeat -1))	// 一度リピート→計二回なので
			.yoyo(CmnLib.argChk_Boolean(hArg, 'yoyo', false))
			.onUpdate(()=> {
				;
//				box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)');
			})
			.start();

/*
	var coords = { x: 0, y: 0 };
	var tween = new TWEEN.Tween(coords)
		.to({ x: 300, y: 200 }, 1000)
		.onUpdate(function() {
		})
*/


//	[frame id=config x=0 y=0]

		return false;
	}

	// HTMLフレームをアニメ
	private tsy_frame(hArg) {
		;
/*
	[tsy_frame id=config x=300 y=200 time=1000]
	// tsy用
	alpha
	height
	width
	x
	y
	pivot_x
	pivot_y
	rotation
	scale_x
	scale_y
*/

		return false;
	}

}
