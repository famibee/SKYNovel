/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib} from './CmnLib';
import {IHTag, IMain, HArg} from './CmnInterface';
import {Config} from './Config';
import {AnalyzeTagArg} from './AnalyzeTagArg';
import {PropParser} from './PropParser';
import {DebugMng} from './DebugMng';
import {Variable} from './Variable';
import {SoundMng} from './SoundMng';
import {LayerMng} from './LayerMng';
import {EventMng} from './EventMng';
import {ScriptIterator} from './ScriptIterator';

import m_xregexp = require('xregexp');
import {SysBase} from './SysBase';
import { Application, utils, ApplicationOptions } from 'pixi.js';

export class Main implements IMain {
	private cfg			: Config;

	private appPixi		: Application;

	private hTag		: IHTag		= {};	// タグ処理辞書

	private val			: Variable;
	private prpPrs		: PropParser;
	private sndMng		: SoundMng;
	private	scrItr		: ScriptIterator;
	private dbgMng		: DebugMng;
	private layMng		: LayerMng;
	private evtMng		: EventMng;

	private fncNext		= ()=> {};
	private	alzTagArg	= new AnalyzeTagArg;


	constructor(private sys: SysBase) {
		utils.skipHello();

		this.cfg = new Config(sys, ()=> {
			const hApp: ApplicationOptions = {
				backgroundColor: ('init' in this.cfg.oCfg)
					? this.cfg.oCfg.init.bg_color || 0
					: 0,
				resolution : sys.resolution,
			};
			const cvs = document.getElementById('skynovel') as HTMLCanvasElement;
			if (cvs) {
				this.clone_cvs = cvs.cloneNode(true) as HTMLCanvasElement;
				this.clone_cvs.id = 'skynovel';

				hApp.view = cvs;
			}
			this.appPixi = new Application(this.cfg.oCfg.window.width, this.cfg.oCfg.window.height, hApp);
			if (! cvs) document.body.appendChild(this.appPixi.view);
			//console.log('is WebGLRenderer:'+ (this.appPixi.renderer instanceof WebGLRenderer));

			// タグ定義 //
			// 変数操作（9/9）
			this.val = new Variable(this.cfg, this.hTag);
			// 組み込み変数定義 //
			this.prpPrs = new PropParser(this.val);

			// システム（5/13）[snapshot]は LayerMng 担当
			this.sys.init(this.cfg, this.hTag, this.val, this.appPixi);	// ここで変数準備完了
			this.hTag['title']({text: this.cfg.oCfg.book.title || 'SKYNovel'});

			// ＢＧＭ・効果音（1/16）
			this.sndMng = new SoundMng(this.cfg, this.hTag, this.val, this);

			// 条件分岐（4/4）
			// ラベル・ジャンプ（5/5）[button]は LayerMng 担当
			// マクロ（5/5）
			// しおり（5/5）[copybookmark][erasebookmark]は Variable 担当
			this.scrItr = new ScriptIterator(this.cfg, this.hTag, this, this.val, this.alzTagArg, ()=> this.runAnalyze(), this.prpPrs.parse, this.sndMng);

			// デバッグ・その他（8/9）[reload_script]のみ残る
			this.dbgMng = new DebugMng(this.sys, this.hTag, this.scrItr);

			// レイヤ共通（6/6）
			// 文字・文字レイヤ（15/17）
			// 画像・画像レイヤ（1/6）
			// 立体・３Ｄレイヤ（0/0）
			this.layMng = new LayerMng(this.cfg, this.hTag, this.appPixi, this.val, this, this.scrItr, this.sys);

			// イベント（9/10）
			this.evtMng = new EventMng(this.cfg, this.hTag, this.appPixi, this, this.layMng, this.val, this.sndMng, this.scrItr);

			this.appPixi.ticker.add(this.fncTicker);
			this.resumeByJumpOrCall({fn: this.cfg.oCfg.first_script});
		});
	}
	private fncTicker = ()=> {
		this.fncNext();
		this.dbgMng.update();
	};

	errScript(mes: string, isThrow = true) {
		this.stop();
		DebugMng.myTrace(mes);
		if (CmnLib.devtool) console.log('🍜 SKYNovel err!');
		if (isThrow) throw mes;
	}


	// メイン処理（シナリオ解析）
	private fncresume = (fnc = this.runAnalyze)=> {
		// スクリプトが動き出すとき、ブレイクマークは消去する
		if (this.destroyed) return;	// destroy()連打対策
		this.layMng.clearBreak();

		//console.log('resume!');
		this.fncNext = fnc;
		this.resume = (fnc = this.runAnalyze)=> {
			//console.log('resume!');
			this.fncNext = fnc;
		};
		this.scrItr.noticeBreak(false);
	};
	resume = this.fncresume;
	resumeByJumpOrCall(hArg: HArg) {
		const url = hArg['url'];
		if (url) {window.open(url); return;}

		this.val.setVal_Nochk('tmp', 'sn.eventArg', hArg.arg || '');
		this.val.setVal_Nochk('tmp', 'sn.eventLabel', hArg.label || '');
		if (CmnLib.argChk_Boolean(hArg, 'call', false)) {
			this.scrItr.subIdxToken();	// 「コール元の次」に進めず、「コール元」に戻す
			this.resume(()=> this.hTag.call(hArg));
		}
		else {
			this.hTag.clear_event({});
			this.resume(()=> this.hTag.jump(hArg));
		}
	}
	stop = ()=> {
		//console.log('stop!');
		this.fncNext = ()=> {};
		this.resume = this.fncresume;
		this.scrItr.noticeBreak(true);
	};

	private runAnalyze() {
		while (true) {
			let token = this.scrItr.runAnalyzeSub();
			if (! token) continue;

			const uc = token.charCodeAt(0);	// TokenTopUnicode
			if (this.cfg.oCfg.debug.token) console.log(`🌱 トークン fn:${this.scrItr.scriptFn} lnum:${this.scrItr.lineNum} uc:${uc} token<${token}>`);
			// \t タブ
			if (uc == 9) continue;
			// \n 改行
			if (uc == 10) {this.evtMng.cr(token.length); continue;}
			// [ タグ開始
			if (uc == 91) {
				try {
					if (this.タグ解析(token)) {this.stop(); break;} else continue;
				}
				catch (err) {
					let mes = '';
					if (err instanceof Error) {
						const e = err as Error;
					//	if (e is StackOverflowError) traceDbg(e.getStackTrace())
						mes = 'タグ解析中例外 mes='+ e.message +'('+ e.name +')';
						const a_tag: any = CmnLib.REG_TAG.exec(token);
						if (a_tag != null) mes = '['+ a_tag.name +']'+ mes;
					}
					else {
						mes = err as string;
					}
					this.errScript(mes, false);
					return;
				}
			}
			// & 変数操作・変数表示
			if (uc == 38) {
				try {
					if (token.substr(-1) != '&') {//変数操作
						//変数計算
						const o: any = CmnLib.splitAmpersand(token.slice(1));
						o.name = this.getValAmpersand(o.name);
						o.text = String(this.prpPrs.parse(o.text));
						this.hTag.let(o);
						continue;
					}

					if (token.charAt(1) == '&') throw new Error('「&表示&」書式では「&」指定が不要です');
					token = String(this.prpPrs.parse( token.slice(1, -1) ));
				}
				catch (err) {
					let mes = '';
					if (err instanceof Error) {
						const e = err as Error;
						mes = '& 変数操作・変数表示 mes='+ e.message +'('+ e.name +')';
					}
					else {
						mes = err as string;
					}
					this.errScript(mes, false);
					return;
				}
			}
			// ; コメント
			else if (uc == 59) continue;
			// * ラベル
			else if ((uc == 42) && (token.length > 1)) continue;

			// 文字表示
			try {
				const tl = this.layMng.getCurrentTxtlayForeNeedErr();
				tl.tagCh(token);
			}
			catch (err) {
				let mes = '';
				if (err instanceof Error) {
					const e = err as Error;
					mes = '文字表示 mes='+ e.message +'('+ e.name +')';
				}
				else {
					mes = err as string;
				}
				this.errScript(mes, false);
				return;
			}
		}

//		if (CmnLib.devtool) console.log('🍵 waiting...');
	}


	// result = true : waitする  resume()で再開
	private タグ解析(tagToken: string): boolean {
		const a_tag: any = m_xregexp.exec(tagToken, CmnLib.REG_TAG);
		if (a_tag == null) throw 'タグ記述['+ tagToken +']異常です(タグ解析)';

		const tag_name = a_tag['name'];
		const tag_fnc = this.hTag[tag_name];
		if (tag_fnc == null) throw '未定義のタグ['+ tag_name +']です';

		if (! this.alzTagArg.go(a_tag['args'])) throw '属性「'+ this.alzTagArg.literal +'」は異常です';
		if (this.cfg.oCfg.debug.tag) console.log(`🌲 タグ解析 fn:${this.scrItr.scriptFn} lnum:${this.scrItr.lineNum} [${tag_name} %O]`, this.alzTagArg.hPrm);

		if (this.alzTagArg.hPrm['cond']) {
			const cond = this.alzTagArg.hPrm['cond'].val;
			if (cond.charAt(0) == '&') throw '属性condは「&」が不要です';
			const p = this.prpPrs.parse(cond);
			const ps = String(p);
			if (ps == 'null' || ps == 'undefined') return false;
			if (! p) return false;
		}

		const hArg: any = {タグ名: tag_name};
		if (this.alzTagArg.isKomeParam) {
			if (this.scrItr.isEmptyCallStk) throw '属性「*」はマクロのみ有効です';
			const hArgDef = this.scrItr.lastHArg;
			if (! hArgDef) throw '属性「*」はマクロのみ有効です';
			for (const k in hArgDef) hArg[k] = hArgDef[k];
		}

		for (const k in this.alzTagArg.hPrm) {
			let val = this.alzTagArg.hPrm[k].val;
			//console.log('タグ解析 2 val:'+ val);
			if (val.charAt(0) == '%') {
				if (this.scrItr.isEmptyCallStk) throw '属性「%」はマクロのみ有効です';
				const mac = this.scrItr.lastHArg[val.substr(1)];
				if (mac) {hArg[k] = mac; continue;}

				val = this.alzTagArg.hPrm[k].def;
				if (! val || val == 'null') continue;
					// defのnull指定。%指定が無い場合、マクロに属性を渡さない
			}

			hArg[k] = this.getValAmpersand(val);
		}

		return tag_fnc(hArg);
	}
	private getValAmpersand = (val: string)=> (val.charAt(0) == '&')
		? String(this.prpPrs.parse(val.substr(1)))
		: val;

	pauseDev = ()=> this.appPixi.stop();
	resumeDev = ()=> this.appPixi.start();


	destroy() {
		if (this.destroyed) return;
		this.destroyed = true;

		this.appPixi.ticker.remove(this.fncTicker);
		this.stop();
		this.hTag = {};
		this.evtMng.destroy();
		this.layMng.destroy();
		this.dbgMng.destroy();

		if (this.clone_cvs && this.appPixi) {
			this.appPixi.view.parentElement!.insertBefore(this.clone_cvs, this.appPixi.view);
		}
		utils.destroyTextureCache();
		this.appPixi.destroy(true);
	}
	private	destroyed = false;
	isDestroyed = () => this.destroyed;
	private clone_cvs	: HTMLCanvasElement;

}
