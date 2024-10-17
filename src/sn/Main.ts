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
import {PropParser} from './PropParser';
import {DebugMng} from './DebugMng';
import {Variable} from './Variable';
import {LayerMng} from './LayerMng';
import {EventMng} from './EventMng';
import {ScriptIterator} from './ScriptIterator';
import {SysBase} from './SysBase';

import {Application, IApplicationOptions, utils} from 'pixi.js';

const	SN_ID	= 'skynovel';

export class Main implements IMain {
	static	cvs	: HTMLCanvasElement;

	#hTag		: IHTag		= Object.create(null);	// タグ処理辞書

	#val		: Variable;
	#prpPrs		: PropParser;
	#scrItr		: ScriptIterator;
	#layMng		: LayerMng;
	#evtMng		: EventMng;


	constructor(private readonly sys: SysBase) {
		utils.skipHello();

		Config.generate(sys)
		.then(c=> this.#init(c))
		.catch(e=> console.error(`load err fn:prj.json e:%o`, e));
	}

	#aDest: {(): void}[]	= [];
	async #init(cfg: Config) {
		const hApp: IApplicationOptions = {
			width			: cfg.oCfg.window.width,
			height			: cfg.oCfg.window.height,
			backgroundColor	: parseColor(String(cfg.oCfg.init.bg_color)),
				// このString()は後方互換性のため必須
		//	resolution		: sys.resolution,
			resolution		: globalThis.devicePixelRatio ?? 1,	// 理想
		};

		const cvs = <HTMLCanvasElement>document.getElementById(SN_ID);
		if (cvs) {
			const clone_cvs = <HTMLCanvasElement>cvs.cloneNode(true);
			clone_cvs.id = SN_ID;
			hApp.view = cvs;
			const p = cvs.parentNode!;
			this.#aDest.unshift(()=> p.appendChild(clone_cvs));
		}

		const app = new Application(hApp);
		this.#aDest.unshift(()=> {
			utils.clearTextureCache();
			this.sys.destroy();
			app.destroy(true);
		});

		Main.cvs = app.view;
		Main.cvs.id = SN_ID +'_act';
		if (! cvs) document.body.appendChild(Main.cvs);


		const cc = document.createElement('canvas')?.getContext('2d');
		if (! cc) throw '#init cc err';
		CmnLib.cc4ColorName = cc;


		// 変数
		this.#val = new Variable(cfg, this.#hTag);
		this.#prpPrs = new PropParser(this.#val, cfg.oCfg.init.escape ?? '\\');

		// システム
		await Promise.allSettled(this.sys.init(this.#hTag, app, this.#val,this));	// 変数準備完了
		this.#hTag.title({text: cfg.oCfg.book.title || 'SKYNovel'});

		// ＢＧＭ・効果音
		const {SoundMng} = await import('./SoundMng');
		const sndMng = new SoundMng(cfg, this.#hTag, this.#val, this, this.sys);
		this.#aDest.unshift(()=> sndMng.destroy());

		// 条件分岐、ラベル・ジャンプ、マクロ、しおり
		this.#scrItr = new ScriptIterator(cfg, this.#hTag, this, this.#val, this.#prpPrs, sndMng, this.sys);
		this.#aDest.unshift(()=> this.#scrItr.destroy());

		// デバッグ・その他
		const dbgMng = new DebugMng(this.sys, this.#hTag, this.#scrItr);
		this.#aDest.unshift(()=> dbgMng.destroy());

		// レイヤ共通、文字レイヤ（16/17）、画像レイヤ
		this.#layMng = new LayerMng(cfg, this.#hTag, app, this.#val, this, this.#scrItr, this.sys, sndMng, this.#prpPrs);
		this.#aDest.unshift(()=> this.#layMng.destroy());

		// イベント
		this.#evtMng = new EventMng(cfg, this.#hTag, app, this, this.#layMng, this.#val, sndMng, this.#scrItr, this.sys);
		this.#aDest.unshift(()=> this.#evtMng.destroy());

		this.#aDest.unshift(()=> {
			this.stop();
			this.#isLoop = false;

			this.#hTag = {};
		});

		this.#hTag.jump({fn: 'main'});
		this.stop();
	}


	destroy() {
		if (this.#destroyed) return;	// destroy()連打対策
		this.#destroyed = true;
		this.#aDest.forEach(f=> f());
		this.#aDest = [];
	}
	#destroyed = false;
	readonly isDestroyed = ()=> this.#destroyed;


	errScript(mes: string, isThrow = true) {
		this.stop();
		DebugMng.myTrace(mes);
		if (CmnLib.debugLog) console.log('🍜 SKYNovel err!');
		if (isThrow) throw mes;
	}

	fire(KEY: string, e: Event) {this.#evtMng.fire(KEY, e)}


	resumeByJumpOrCall(hArg: HArg) {
		if (hArg.url) {
			this.#hTag.navigate_to(hArg);
			this.#scrItr.jumpJustBefore();
			return;
		}

		this.#val.setVal_Nochk('tmp', 'sn.eventArg', hArg.arg ?? '');
		this.#val.setVal_Nochk('tmp', 'sn.eventLabel', hArg.label ?? '');
//console.log(`%cfn:Main.ts line:159 - resumeByJumpOrCall:%o`, 'color:#3B0;', hArg);
		if (argChk_Boolean(hArg, 'call', false)) {
			this.#scrItr.subIdxToken();	// 「コール元の次」に進めず、「コール元」に戻す
			this.#hTag.call(hArg);
		}
		else {
			this.#hTag.clear_event({});
			this.#hTag.jump(hArg);
		}
		this.resume();
	}

	resume() {
//console.log(`-- resume!`);
		if (this.#destroyed) return;	// destroy()連打対策

		this.#layMng.clearBreak();	// スクリプトが動くとき、ブレイクマーク消去
		this.#scrItr.noticeBreak(false);

		requestAnimationFrame(()=> this.#main());
	}
	readonly stop = ()=> {
//console.log(`-- stop!`);
		this.#scrItr.noticeBreak(true);
	};

	setLoop(isLoop: boolean, mes = '') {
		///console.log('setLoop:'+ (isLoop ?'resume!' :'stop!') +' mes:'+ mes);
		if (this.#isLoop = isLoop) this.resume(); else this.stop();
		this.sys.setTitleInfo(mes ?` -- ${mes}中` :'');
	}
	#isLoop = true;

	//MARK: メイン処理（シナリオ解析）
	#main() {
		while (this.#isLoop) {
			let token = this.#scrItr.nextToken();
//console.log(`fn:Main.ts main (fn:${this.#scrItr.scriptFn} ln:${this.#scrItr.lineNum}) token=${token}=`);
			if (! token) return;	// 初期化前に終了した場合向け

			const uc = token.charCodeAt(0);	// TokenTopUnicode
			// \t タブ
			if (uc === 9) continue;
			// \n 改行
			if (uc === 10) {this.#scrItr.addLineNum(token.length); continue}
			// [ タグ開始
			if (uc === 91) {
//console.log(`(fn:${this.#scrItr.scriptFn} ln:${this.#scrItr.lineNum}) %c${token.slice(0, 64)}`, 'background-color:#30B;');
				if (this.#scrItr.isBreak(token)) return;
				try {
					const cl = (token.match(/\n/g) ?? []).length;
					if (cl > 0) this.#scrItr.addLineNum(cl);
					if (this.#scrItr.タグ解析(token)) {this.stop(); return}
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
					if (! token.endsWith('&')) {	//変数操作
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
	}

}
