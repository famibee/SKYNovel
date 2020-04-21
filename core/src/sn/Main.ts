/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib} from './CmnLib';
import {IHTag, IMain, HArg} from './CmnInterface';
import {Config} from './Config';
import {Grammar} from './Grammar';
import {AnalyzeTagArg} from './AnalyzeTagArg';
import {PropParser} from './PropParser';
import {DebugMng} from './DebugMng';
import {Variable} from './Variable';
import {SoundMng} from './SoundMng';
import {LayerMng} from './LayerMng';
import {EventMng} from './EventMng';
import {ScriptIterator} from './ScriptIterator';

import {SysBase} from './SysBase';
import {Application, utils} from 'pixi.js';

export class Main implements IMain {
	private cfg			: Config;

	private appPixi		: Application;

	private hTag		: IHTag		= Object.create(null);	// タグ処理辞書

	private val			: Variable;
	private prpPrs		: PropParser;
	private sndMng		: SoundMng;
	private	scrItr		: ScriptIterator;
	private dbgMng		: DebugMng;
	private layMng		: LayerMng;
	private evtMng		: EventMng;

	private fncNext		= ()=> {};
	private	readonly	alzTagArg	= new AnalyzeTagArg;


	private	inited = false;
	constructor(private readonly sys: SysBase) {
		utils.skipHello();

		this.cfg = new Config(sys, ()=> {
			const hApp: any = {
				width			: this.cfg.oCfg.window.width,
				height			: this.cfg.oCfg.window.height,
				backgroundColor	: this.cfg.oCfg.init.bg_color,
			//	resolution		: sys.resolution,
				resolution		: window.devicePixelRatio ?? 1,	// NOTE: 理想
				autoResize		: true,
			};
			const cvs = document.getElementById(CmnLib.SN_ID) as HTMLCanvasElement;
			if (cvs) {
				this.clone_cvs = cvs.cloneNode(true) as HTMLCanvasElement;
				this.clone_cvs.id = CmnLib.SN_ID;
				hApp.view = cvs;
			}
			this.appPixi = new Application(hApp);
			if (! cvs) {
				document.body.appendChild(this.appPixi.view);
				this.appPixi.view.id = CmnLib.SN_ID;
			}

			// 変数
			this.val = new Variable(this.cfg, this.hTag);
			this.prpPrs = new PropParser(this.val);

			// システム（5+3/13）
			this.sys.init(this.cfg, this.hTag, this.appPixi, this.val, this);	// ここで変数準備完了
			this.hTag['title']({text: this.cfg.oCfg.book.title || 'SKYNovel'});

			// ＢＧＭ・効果音
			this.sndMng = new SoundMng(this.cfg, this.hTag, this.val, this, this.sys);

			// 条件分岐、ラベル・ジャンプ、マクロ、しおり
			this.scrItr = new ScriptIterator(this.cfg, this.hTag, this, this.val, this.alzTagArg, ()=> this.runAnalyze(), this.prpPrs, this.sndMng, this.sys);

			// デバッグ・その他
			this.dbgMng = new DebugMng(this.sys, this.hTag, this.scrItr);

			// レイヤ共通、文字レイヤ（16/17）、画像レイヤ
			this.layMng = new LayerMng(this.cfg, this.hTag, this.appPixi, this.val, this, this.scrItr, this.sys);

			// イベント
			this.evtMng = new EventMng(this.cfg, this.hTag, this.appPixi, this, this.layMng, this.val, this.sndMng, this.scrItr);

			this.appPixi.ticker.add(this.fncTicker);
			this.resumeByJumpOrCall({fn: 'main'});

			this.inited = true;
		});
	}
	private fncTicker = ()=> {
		this.fncNext();
		this.dbgMng.update();
	};

	errScript(mes: string, isThrow = true) {
		this.stop();
		DebugMng.myTrace(mes);
		if (CmnLib.debugLog) console.log('🍜 SKYNovel err!');
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
		if (hArg.url) {window.open(hArg.url); return;}

		this.val.setVal_Nochk('tmp', 'sn.eventArg', hArg.arg ?? '');
		this.val.setVal_Nochk('tmp', 'sn.eventLabel', hArg.label ?? '');
		if (CmnLib.argChk_Boolean(hArg, 'call', false)) {
			this.scrItr.subIdxToken();	// 「コール元の次」に進めず、「コール元」に戻す
			this.resume(()=> this.hTag.call(hArg));
		}
		else {
			this.hTag.clear_event({});
			this.resume(()=> this.hTag.jump(hArg));
		}
	}
	readonly stop = ()=> {
		//console.log('stop!');
		this.fncNext = ()=> {};
		this.resume = this.fncresume;
		this.scrItr.noticeBreak(true);
	};

	private runAnalyze() {
		while (true) {
			let token = this.scrItr.nextToken();
			if (! token) break;	// 初期化前に終了した場合向け

			const uc = token.charCodeAt(0);	// TokenTopUnicode
			if (this.cfg.oCfg.debug.token) console.log(`🌱 トークン fn:${this.scrItr.scriptFn} lnum:${this.scrItr.lineNum} uc:${uc} token<${token}>`);
			// \t タブ
			if (uc == 9) continue;
			// \n 改行
			if (uc == 10) {this.evtMng.cr(token.length); continue;}
			// [ タグ開始
			if (uc == 91) {
				try {
					let cntLines = 0;
					let i = -1;
					while ((i = token.indexOf('\n', i +1)) >= 0) ++cntLines;
					if (cntLines > 0) this.evtMng.cr(cntLines);
					if (this.scrItr.タグ解析(token)) {this.stop(); break;}
					continue;
				}
				catch (err) {
					let mes = '';
					if (err instanceof Error) {
						const e = err as Error;
					//	if (e is StackOverflowError) traceDbg(e.getStackTrace())
						mes = 'タグ解析中例外 mes='+ e.message +'('+ e.name +')';
						const a_tag: any = Grammar.REG_TAG.exec(token);
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
						const o: any = Grammar.splitAmpersand(token.slice(1));
						o.name = this.prpPrs.getValAmpersand(o.name);
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

//		if (CmnLib.debugLog) console.log('🍵 waiting...');
	}


	readonly pauseDev = ()=> this.appPixi.stop();
	readonly resumeDev = ()=> this.appPixi.start();


	async destroy(ms_late = 0) {
		if (this.destroyed) return;
		this.destroyed = true;

		if (! this.inited) return;
		await this.layMng.before_destroy();
		if (ms_late > 0) await new Promise(r=> setTimeout(r, ms_late));

		this.stop();
		this.hTag = {};
		this.evtMng.destroy();
		this.layMng.destroy();
		this.dbgMng.destroy();
		this.appPixi.ticker.remove(this.fncTicker);

		if (this.clone_cvs && this.appPixi) {
			this.appPixi.view.parentElement!.insertBefore(this.clone_cvs, this.appPixi.view);
		}
		utils.clearTextureCache();
		this.appPixi.destroy(true);
	}
	private	destroyed = false;
	readonly isDestroyed = ()=> this.destroyed;
	private clone_cvs	: HTMLCanvasElement;

}
