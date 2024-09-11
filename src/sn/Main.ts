/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, argChk_Boolean, parseColor} from './CmnLib';
import {IHTag, HArg} from './Grammar';
import {IMain} from './CmnInterface';
import {Config} from './Config';
import {tagToken2Name, splitAmpersand} from './Grammar';
import {AnalyzeTagArg} from './AnalyzeTagArg';
import {PropParser} from './PropParser';
import {DebugMng} from './DebugMng';
import {Variable} from './Variable';
import {SoundMng} from './SoundMng';
import {LayerMng} from './LayerMng';
import {EventMng} from './EventMng';
import {ScriptIterator} from './ScriptIterator';

import {SysBase} from './SysBase';
import {Application, IApplicationOptions, utils} from 'pixi.js';

export class Main implements IMain {
	#cfg		: Config;

	#appPixi	: Application;
	static	cvs	: HTMLCanvasElement;

	#hTag		: IHTag		= Object.create(null);	// タグ処理辞書

	#val		: Variable;
	#prpPrs		: PropParser;
	#sndMng		: SoundMng;
	#scrItr		: ScriptIterator;
	#dbgMng		: DebugMng;
	#layMng		: LayerMng;
	#evtMng		: EventMng;

	#fncNext	= ()=> {};
	readonly	#alzTagArg	= new AnalyzeTagArg;


	#inited = false;
	constructor(private readonly sys: SysBase) {
		utils.skipHello();

		Config.generate(sys)
		.then(c=> this.#cfg = c)
		.then(()=> this.#init())
		.catch(e=> console.error(`load err fn:prj.json e:%o`, e));
	}
	readonly	#SN_ID	= 'skynovel';
	async #init() {
		const cc = document.createElement('canvas')?.getContext('2d');
		if (! cc) throw 'argChk_Color err';
		CmnLib.cc4ColorName = cc;
		const hApp: IApplicationOptions = {
			width			: this.#cfg.oCfg.window.width,
			height			: this.#cfg.oCfg.window.height,
			backgroundColor	: parseColor(String(this.#cfg.oCfg.init.bg_color)),
				// このString()は後方互換性のため必須
		//	resolution		: sys.resolution,
			resolution		: globalThis.devicePixelRatio ?? 1,	// 理想
		};
		const cvs = document.getElementById(this.#SN_ID) as HTMLCanvasElement;
		if (cvs) {
			this.#clone_cvs = cvs.cloneNode(true) as HTMLCanvasElement;
			this.#clone_cvs.id = this.#SN_ID;
			hApp.view = cvs;
		}
		this.#appPixi = new Application(hApp);
		Main.cvs = this.#appPixi.view;
		if (! cvs) {
			document.body.appendChild(Main.cvs);
			Main.cvs.id = this.#SN_ID;
		}

		// 変数
		this.#val = new Variable(this.#cfg, this.#hTag);
		this.#prpPrs = new PropParser(this.#val, this.#cfg.oCfg.init.escape ?? '\\');

		// システム（11/13）
		await Promise.allSettled(this.sys.init(this.#hTag, this.#appPixi, this.#val,this));
			// 変数準備完了
		this.#hTag.title({text: this.#cfg.oCfg.book.title || 'SKYNovel'});

		// ＢＧＭ・効果音
		this.#sndMng = new SoundMng(this.#cfg, this.#hTag, this.#val, this, this.sys);

		// 条件分岐、ラベル・ジャンプ、マクロ、しおり
		this.#scrItr = new ScriptIterator(this.#cfg, this.#hTag, this, this.#val, this.#alzTagArg, ()=> this.#runAnalyze(), this.#prpPrs, this.#sndMng, this.sys);

		// デバッグ・その他
		this.#dbgMng = new DebugMng(this.sys, this.#hTag, this.#scrItr);

		// レイヤ共通、文字レイヤ（16/17）、画像レイヤ
		this.#layMng = new LayerMng(this.#cfg, this.#hTag, this.#appPixi, this.#val, this, this.#scrItr, this.sys, this.#sndMng, this.#alzTagArg, this.#prpPrs);

		// イベント
		this.#evtMng = new EventMng(this.#cfg, this.#hTag, this.#appPixi, this, this.#layMng, this.#val, this.#sndMng, this.#scrItr, this.sys);

		this.#appPixi.ticker.add(this.#fncTicker);
		this.resumeByJumpOrCall({fn: 'main'});

		this.#inited = true;
	}
	readonly #fncTicker = ()=> this.#fncNext();	// thisの扱いによりメソッド代入はダメ

	errScript(mes: string, isThrow = true) {
		this.stop();
		DebugMng.myTrace(mes);
		if (CmnLib.debugLog) console.log('🍜 SKYNovel err!');
		if (isThrow) throw mes;
	}


	// メイン処理（シナリオ解析）
	#fncresume = (fnc = this.#runAnalyze)=> {
		// スクリプトが動き出すとき、ブレイクマークは消去する
		if (this.#destroyed) return;	// destroy()連打対策
		this.#layMng.clearBreak();

		///console.log('resume!');
		this.#fncNext = fnc;
		this.resume = (fnc = this.#runAnalyze)=> {
			///console.log('resume!');
			this.#fncNext = fnc;
		};
		this.#scrItr.noticeBreak(false);
	};
	resume = this.#fncresume;
	resumeByJumpOrCall(hArg: HArg) {
		if (hArg.url) {
			this.#hTag.navigate_to(hArg);
			this.#scrItr.jumpJustBefore();
			return;
		}

		this.#val.setVal_Nochk('tmp', 'sn.eventArg', hArg.arg ?? '');
		this.#val.setVal_Nochk('tmp', 'sn.eventLabel', hArg.label ?? '');
		if (argChk_Boolean(hArg, 'call', false)) {
			this.#scrItr.subIdxToken();	// 「コール元の次」に進めず、「コール元」に戻す
			this.resume(()=> this.#hTag.call(hArg));
		}
		else {
			this.#hTag.clear_event({});
			this.resume(()=> this.#hTag.jump(hArg));
		}
	}
	readonly stop = ()=> {
		///console.log('stop!');
		this.#fncNext = ()=> {};
		this.resume = this.#fncresume;
		this.#scrItr.noticeBreak(true);
	};

	setLoop(isLoop: boolean, mes = '') {
		///console.log('setLoop:'+ (isLoop ?'resume!' :'stop!') +' mes:'+ mes);
		if (this.#isLoop = isLoop) this.resume(); else this.stop();
		this.sys.setTitleInfo(mes ?` -- ${mes}中` :'');
	}
	#isLoop = true;
	#runAnalyze() {
		while (this.#isLoop) {
			let token = this.#scrItr.nextToken();
			if (! token) break;	// 初期化前に終了した場合向け

			const uc = token.charCodeAt(0);	// TokenTopUnicode
			// \t タブ
			if (uc === 9) continue;
			// \n 改行
			if (uc === 10) {this.#scrItr.addLineNum(token.length); continue}
			// [ タグ開始
			if (uc === 91) {
				if (this.#scrItr.isBreak(token)) return;
				try {
					const cl = (token.match(/\n/g) ?? []).length;
					if (cl > 0) this.#scrItr.addLineNum(cl);
					if (this.#scrItr.タグ解析(token)) {this.stop(); break}
					continue;
				}
				catch (e) {
					if (e instanceof Error) this.errScript(`[${tagToken2Name(token)}]タグ解析中例外 mes=${e.message}(${e.name})`, false);
					else this.errScript(String(e), false);
					return;
				}
			}
			// & 変数操作・変数表示
			if (uc === 38) {
				try {
					if (token.at(-1) !== '&') {//変数操作
						// 変数計算
						if (this.#scrItr.isBreak(token)) return;
						const o = splitAmpersand(token.slice(1));
						o.name = this.#prpPrs.getValAmpersand(o.name);
						o.text = String(this.#prpPrs.parse(o.text));
						this.#hTag.let(o as HArg);
						continue;
					}

					if (token.charAt(1) === '&') throw new Error('「&表示&」書式では「&」指定が不要です');
					token = String(this.#prpPrs.parse( token.slice(1, -1) ));
				}
				catch (err) {
					this.errScript(
						err instanceof Error
							? `& 変数操作・表示 mes=${err.message}(${err.name})`
							: err as string,
						false
					);
					return;
				}
			}
			// ; コメント
			else if (uc === 59) continue;
			// * ラベル
			else if (uc === 42 && token.length > 1) continue;

			// 文字表示
			try {
				this.#layMng.setNormalChWait();
				const tl = this.#layMng.currentTxtlayForeNeedErr;
				tl.tagCh(token);
			}
			catch (err) {
				this.errScript(
					err instanceof Error
						? `文字表示 mes=${err.message}(${err.name})`
						: err as string,
					false
				);
				return;
			}
		}

//		if (CmnLib.debugLog) console.log('🍵 waiting...');
	}

	fire(KEY: string, e: Event) {this.#evtMng.fire(KEY, e)}


	async destroy(ms_late = 0) {
		if (this.#destroyed) return;
		this.#destroyed = true;

		if (! this.#inited) return;

		this.stop();
		this.#isLoop = false;

		this.#layMng.before_destroy();
		if (ms_late > 0) await new Promise(re=> setTimeout(re, ms_late));
			// clearTimeout()不要と判断

		this.#hTag = {};
		this.#evtMng.destroy();
		this.#scrItr.destroy();
		this.#layMng.destroy();
		this.#dbgMng.destroy();
		this.#sndMng.destroy();
		this.#appPixi.ticker.remove(this.#fncTicker);

		if (this.#clone_cvs && this.#appPixi) {
		//x	document.body.insertBefore(this.#clone_cvs, this.#cvs);
				// DOMException: Failed to execute ‘insertBefore’ on ‘Node’:
				// The node before which the new node is to be inserted is not a child of this node.
			Main.cvs.parentNode!.appendChild(this.#clone_cvs);
		}
		utils.clearTextureCache();
		this.#appPixi.destroy(true);
		this.sys.destroy();
	}
	#destroyed = false;
	readonly isDestroyed = ()=> this.#destroyed;
	#clone_cvs	: HTMLCanvasElement;

}
