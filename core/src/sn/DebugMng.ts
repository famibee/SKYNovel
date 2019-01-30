/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, int, getDateStr} from './CmnLib';
import {HArg, ITag, IHTag} from './CmnInterface';
import {SysBase} from './SysBase';
import {ScriptIterator} from './ScriptIterator';

const Stats = require('stats.js');
	// mrdoob/stats.js: JavaScript Performance Monitor https://github.com/mrdoob/stats.js/

export class DebugMng {
	private _stats		: Stats;
	private fncUpd		= ()=> {};

	private	static	scrItr	: ScriptIterator;
	private	static	hTag	: IHTag;
	private static	title	: ITag		= ()=> false;
	constructor(private sys: SysBase, hTag: IHTag, scrItr: ScriptIterator) {
		DebugMng.scrItr = scrItr;
		DebugMng.hTag = hTag;
		DebugMng.title = hTag.title;
		DebugMng.myTrace = DebugMng.fncMyTrace;

		//	デバッグ・その他
		//hTag.clearsysvar	// Variableで定義				// システム変数の全消去
		//hTag.clearvar		// Variableで定義				// ゲーム変数の全消去
		//hTag.dump_lay		// LayerMngで定義				// レイヤのダンプ
		//hTag.dump_val		// Variableで定義				// 変数のダンプ
		//hTag.dump_stack	// ScriptIteratorで定義			// スタックのダンプ
		hTag.log			= o => this.log(o);				// ログ出力
		//hTag.reload_script// ScriptIterator.ts内で定義	// スクリプト再読込
		hTag.stats			= o => this.stats(o);			// パフォーマンス表示
		hTag.trace			= o => this.trace(o);			// デバッグ表示へ出力
	}
	destroy() {DebugMng.title = ()=> false}

	update() {this.fncUpd()}		// 外部に呼んでもらう

	// ログ出力
	private log(hArg: HArg) {
		if (!('text' in hArg)) throw '[log] textは必須です';

		const dat = '--- '+ getDateStr('-', '_', '')
				  +' [fn:'+ DebugMng.scrItr.scriptFn
				  +' line:'+ DebugMng.scrItr.lineNum +']'
						+' os:'+ CmnLib.osName
						+' prj:'+ this.sys.cur
			//			+' prj:'+ hTmp['const.flash.desktop.NativeApplication.nativeApplication.applicationDescriptor.filename']
						+'\n'+ hArg.text +'\n';
		this.sys.appendFile(this.sys.path_desktop +'log.txt', dat, err=> {if (err) console.log(err);});

		return false;
	}

	// パフォーマンス表示
	private stats(hArg: HArg) {
		if (this._stats) {
			this._stats.dom.style.right = '0px';
			this._stats.dom.style.top = '0px';
			return false;
		}

		this._stats = new Stats();
		this._stats.showPanel(0);
		this._stats.dom.style.position = 'fixed';
		this._stats.dom.style.right = '0px';
		this._stats.dom.style.top = '0px';
		//if (! ('left' in hArg)) tfDbg.x = this._stats.width;
			// コンソールあるけど、モバイルなどのために画面表示版も必要だろうね
		this._stats.dom.style.right = CmnLib.argChk_Num(hArg, 'left', int(this._stats.dom.style.right)) +'px';
		this._stats.dom.style.top = CmnLib.argChk_Num(hArg, 'top', int(this._stats.dom.style.top)) +'px';

		document.body.appendChild(this._stats.dom);
		this.fncUpd = ()=> {this._stats.update()}

		return false;
	}

	private trace(hArg: HArg) {
		DebugMng.myTrace((hArg.text ?hArg.text :`(text is ${String(hArg.text)})`), 'I');

		return false;
	}

	static myTrace	= (txt: string, lvl: 'D'|'W'|'F'|'E'|'I'|'ET' = 'E')=> {
		let mes = '{'+ lvl +'} '+ txt;
		let sty = '';
		switch (lvl) {
			case 'D':	sty = 'color:#0055AA;';	break;
			case 'W':	sty = 'color:#FF8800;';	break;
			case 'F':	sty = 'color:#BB0000;';	break;
			case 'ET':	throw mes;
			case 'E':	console.error('%c'+ mes, 'color:#FF3300;');	return;
			default:	sty = 'color:black;';	mes = ' '+ mes;
		}
		console.info('%c'+ mes, sty);
	}
	private static fncMyTrace(txt: string, lvl: 'D'|'W'|'F'|'E'|'I'|'ET' = 'E') {
		let mes = '{'+ lvl +'} ';
		mes += DebugMng.scrItr
		? '(fn:'+ DebugMng.scrItr.scriptFn +' line:'+ DebugMng.scrItr.lineNum+') '
		: '';
		mes += txt;
		let sty = '';
		switch (lvl) {
			case 'D':	sty = 'color:#0055AA;';	break;
			case 'W':	sty = 'color:#FF8800;';	break;
			case 'F':	sty = 'color:#BB0000;';	break;
			case 'ET':
			case 'E':	DebugMng.title({text: txt});
				/*if (CmnLib.osName == "AND") {
					const buf = "mailto:foo@hoge.co.jp"
						+ "?subject=AIRNovel_ERR&body="
						+ CmnLib.escapeZenkaku(mes) + "\n"
						+ "※一部記号は全角表示しています。";
					flash.net.navigateToURL(new URLRequest(buf));
				}*/
				this.hTag.dump_lay({});
				this.hTag.dump_val({});
				DebugMng.scrItr.dumpErrForeLine();
				this.hTag.dump_stack({});

				if (lvl == 'ET') throw mes;
				console.error('%c'+ mes, 'color:#FF3300;');	return;
			default:	sty = 'color:black;';	mes = ' '+ mes;
		}
		console.info('%c'+ mes, sty);
	}

}