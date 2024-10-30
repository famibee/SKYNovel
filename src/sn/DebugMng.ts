/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, getDateStr} from './CmnLib';
import {HArg, ITag, IHTag} from './Grammar';
import {SysBase} from './SysBase';
import {ScriptIterator} from './ScriptIterator';

import platform from 'platform';

export class DebugMng {
	static	#scrItr	: ScriptIterator;
	static	#hTag	: IHTag;
	static	#title	: ITag;
	static	#spnDbg	: HTMLSpanElement;

	constructor(private readonly sys: SysBase, hTag: IHTag, scrItr: ScriptIterator) {
		DebugMng.#scrItr = scrItr;
		DebugMng.#hTag = hTag;
		DebugMng.#title = hTag.title!;
		DebugMng.myTrace = DebugMng.#st_trace;

		//	デバッグ・その他
		//hTag.clearsysvar	// Variableで定義				// システム変数の全消去
		//hTag.clearvar		// Variableで定義				// ゲーム変数の全消去
		//hTag.dump_lay		// LayerMngで定義				// レイヤのダンプ
		//hTag.dump_val		// Variableで定義				// 変数のダンプ
		//hTag.dump_stack	// ScriptIteratorで定義			// スタックのダンプ
		hTag.log			= o=> this.#log(o);				// ログ出力
		//hTag.reload_script// ScriptIterator.ts内で定義	// スクリプト再読込
		hTag.trace			= o=> this.#trace(o);			// デバッグ表示へ出力

		DebugMng.#spnDbg = document.createElement('span');
		DebugMng.#spnDbg.hidden = true;
		DebugMng.#spnDbg.textContent = '';
		DebugMng.#spnDbg.style.cssText =
		`	z-index: ${Number.MAX_SAFE_INTEGER};
			position: absolute; left: 0; top: 0;
			color: black;
			background-color: rgba(255, 255, 255, 0.7);`
		document.body.appendChild(DebugMng.#spnDbg);
	}
	destroy() {
		DebugMng.#title = ()=> false;
		document.body.removeChild(DebugMng.#spnDbg);

		DebugMng.myTrace = DebugMng.trace_beforeNew;
	}

	// ログ出力
	#first = true;
	#log(hArg: HArg) {
		let dat = '';
		if (this.#first) {
			this.#first = false;
			dat = `== ${platform.description} ==\n`;
		}
		this.sys.appendFile(
			this.sys.path_downloads +'log.txt',
			`${dat}--- ${getDateStr('-', '_', '')
			} [fn:${DebugMng.#scrItr.scriptFn} line:${DebugMng.#scrItr.lineNum
			}] prj:${this.sys.cur
			}\n${hArg.text || `(text is ${hArg.text})`}\n`,
		);

		return false;
	}

	#trace(hArg: HArg) {
		DebugMng.myTrace(hArg.text || `(text is ${hArg.text})`, 'I');

		return false;
	}

	// private禁止、galleryでエラーになる
	static trace_beforeNew(txt: string, lvl: 'D'|'W'|'F'|'E'|'I'|'ET' = 'E') {
		let mes = `{${lvl}} `+ txt;
		let sty = '';
		switch (lvl) {
			case 'D':	sty = `color:#${CmnLib.isDarkMode ?'49F' :'05A'};`;	break;
			case 'W':	sty = 'color:#FF8800;';	break;
			case 'F':	sty = 'color:#BB0000;';	break;
			case 'ET':	throw mes;
			case 'E':	console.error('%c'+ mes, 'color:#FF3300;');	return;
			default:	sty = 'color:black;';	mes = ' '+ mes;
		}
		console.info('%c'+ mes, sty);
	}
	static myTrace = DebugMng.trace_beforeNew;
	static strPos = ()=> DebugMng.#scrItr.lineNum > 0
		? `(fn:${DebugMng.#scrItr.scriptFn} line:${DebugMng.#scrItr.lineNum}) `
		: '';
	static #st_trace(txt: string, lvl: 'D'|'W'|'F'|'E'|'I'|'ET' = 'E') {
		let mes = `{${lvl}} `+ DebugMng.strPos() + txt;
		DebugMng.#dspDbg(mes, lvl);

		let sty = '';
		switch (lvl) {
			case 'D':	sty = `color:#${CmnLib.isDarkMode ?'49F' :'05A'};`;	break;
			case 'W':	sty = 'color:#F80;';	break;
			case 'F':	sty = 'color:#B00;';	break;
			case 'ET':
			case 'E':	DebugMng.#title({text: txt});
				/*if (CmnLib.osName === "AND") {
					const buf = "mailto:foo@hoge.co.jp"
						+ "?subject=AIRNovel_ERR&body="
						+ CmnLib.escapeZenkaku(mes) + "\n"
						+ "※一部記号は全角表示しています。";
					flash.net.navigateToURL(new URLRequest(buf));
				}*/
				this.#hTag.dump_lay!({});
				this.#hTag.dump_val!({});
				DebugMng.#scrItr.dumpErrForeLine();
				this.#hTag.dump_stack!({});

				if (lvl === 'ET') throw mes;
				console.error('%c'+ mes, 'color:#F30;');	return;
			default:	sty = '';	mes = ' '+ mes;
		}
		console.info('%c'+ mes, sty);
	}

	static	#dspDbg(mes: string, lvl: 'D'|'W'|'F'|'E'|'I'|'ET') {
		let sty = '';
		switch (lvl) {
			case 'D':	sty = 'color:#05A;';	break;
			case 'W':	sty = 'color:#F80;';	break;
			case 'F':	sty = 'color:#B00;';	break;
			case 'ET':
			case 'E':	sty = 'color:#F30;';	break;
			default:	sty = '';
		}
		DebugMng.#spnDbg.innerHTML += `<span style='${sty}'>${mes}</span><br/>`;
		DebugMng.#spnDbg.hidden = false;
	};

}
