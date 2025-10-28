/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, argChk_Boolean, parseColor} from './CmnLib';
import type {IHTag, HArg} from './Grammar';
import type {IMain, Scope, T_VAL_BSNU, T_VAL_DATA} from './CmnInterface';
import type {SysBase} from './SysBase';
import {DebugMng} from './DebugMng';
import {Config} from './Config';
import {splitAmpersand, tagToken2Name_Args} from './Grammar';
import type {ScriptIterator} from './ScriptIterator';
import type {LayerMng} from './LayerMng';
import type {EventMng} from './EventMng';

import {Application, type IApplicationOptions, utils} from 'pixi.js';


const	SN_ID	= 'skynovel';

export class Main implements IMain {
	cvs			: HTMLCanvasElement;

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	#hTag		: IHTag		= Object.create(null);	// タグ処理辞書

	#scrItr		: ScriptIterator;
	#layMng		: LayerMng;
	#evtMng		: EventMng;


	constructor(private readonly sys: SysBase) {
		utils.skipHello();

		Config.generate(sys)
		.then(c=> this.#init(c))
		.catch((e: unknown)=> console.error('load err fn:prj.json e:%o', e));
	}

	#aDest: (()=> void)[]	= [];
	async #init(cfg: Config) {
		const hApp: IApplicationOptions = {
			width			: cfg.oCfg.window.width,
			height			: cfg.oCfg.window.height,
			backgroundColor	: parseColor(String(cfg.oCfg.init.bg_color)),
				// このString()は後方互換性のため必須
		//	resolution		: sys.resolution,
			resolution		: globalThis.devicePixelRatio,
		};

		const cvs = <HTMLCanvasElement | null>document.getElementById(SN_ID);
		if (cvs) {
			const clone_cvs = <HTMLCanvasElement>cvs.cloneNode(true);
			clone_cvs.id = SN_ID;
			hApp.view = cvs;
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const p = cvs.parentNode!;
			this.#aDest.unshift(()=> p.appendChild(clone_cvs));
		}
		else {	// 自動的に作ってくれるが、どうも appendChild に遅延があるので
			const c = document.createElement('canvas');
			c.id = SN_ID;
			hApp.view = c;
			document.body.appendChild(c);
			this.#aDest.unshift(()=> document.body.removeChild(c));
		}

		const app = new Application(hApp);
		this.#aDest.unshift(()=> {
			utils.clearTextureCache();
			this.sys.destroy();
			app.destroy(false);	// remove canvas from DOM が非同期なのでウチがやる
		});

		this.cvs = app.view;
		this.cvs.id = SN_ID +'_act';
		if (! cvs) document.body.appendChild(this.cvs);


		const cc = document.createElement('canvas').getContext('2d');
		if (! cc) throw '#init cc err';
		CmnLib.cc4ColorName = cc;

		const [{Variable}, {PropParser}, {SoundMng}, {ScriptIterator}, {LayerMng}, {EventMng}] = await Promise.all([
			import('./Variable'),
			import('./PropParser'),
			import('./SoundMng'),
			import('./ScriptIterator'),
			import('./LayerMng'),
			import('./EventMng'),
		]);

		// 変数
		const val = new Variable(cfg, this.#hTag);
		const prpPrs = new PropParser(val, cfg.oCfg.init.escape);
		this.#setVal_Nochk = (scope, nm, v, autocast)=> val.setVal_Nochk(scope, nm, v, autocast);
		this.#getValAmpersand = v=> prpPrs.getValAmpersand(v);
		this.#parse = s=> prpPrs.parse(s);

		// システム
		await Promise.allSettled(this.sys.init(this.#hTag, app, val, this));	// 変数準備完了
		this.#hTag.title({text: cfg.oCfg.book.title || 'SKYNovel'});

		// ＢＧＭ・効果音
		const sndMng = new SoundMng(cfg, this.#hTag, val, this, this.sys);
		this.#aDest.unshift(()=> sndMng.destroy());

		// 条件分岐、ラベル・ジャンプ、マクロ、しおり
		this.#scrItr = new ScriptIterator(cfg, this.#hTag, this, val, prpPrs, sndMng, this.sys);
		this.#aDest.unshift(()=> this.#scrItr.destroy());

		// デバッグ・その他
		const dbgMng = new DebugMng(this.sys, this.#hTag, this.#scrItr);
		this.#aDest.unshift(()=> dbgMng.destroy());
		this.errScript = (mes: string, isThrow = true)=> {
			this.stop();
			DebugMng.myTrace(mes);
			if (CmnLib.debugLog) console.log('🍜 SKYNovel err!');
			if (isThrow) throw mes;
		}

		// レイヤ共通、文字レイヤ、画像レイヤ
		this.#layMng = new LayerMng(cfg, this.#hTag, app, val, this, this.#scrItr, this.sys, sndMng, prpPrs);
		this.#aDest.unshift(()=> this.#layMng.destroy());

		// イベント
		this.#evtMng = new EventMng(cfg, this.#hTag, app, this, this.#layMng, val, sndMng, this.#scrItr, this.sys);
		this.#aDest.unshift(()=> this.#evtMng.destroy());

		this.#aDest.unshift(()=> {
			this.stop();
			this.#isLoop = false;

			const fncDummy = ()=> true;
			for (const key in this.#hTag) this.#hTag[<keyof IHTag>key] = fncDummy;
		});
	}


	destroy() {
		this.resume = this.destroy = ()=> { /* empty */ };	// destroy()連打対策

		this.cvs.parentElement?.removeChild(this.cvs);
			// （ギャラリーで）document.body はエラーになる
		for (const f of this.#aDest) f();
		this.#aDest = [];
	}


	errScript = (_mes: string, _isThrow = true)=> { /* empty */ }


	resumeByJumpOrCall(hArg: HArg) {
		if (hArg.url) {
			this.#hTag.navigate_to(hArg);
			this.#scrItr.jumpJustBefore();
			return;
		}

		// eslint-disable-next-line @typescript-eslint/no-base-to-string
		this.#setVal_Nochk('tmp', 'sn.eventArg', String(hArg.arg ?? ''));
		this.#setVal_Nochk('tmp', 'sn.eventLabel', hArg.label ?? '');
// console.log(`📜 %cresumeByJumpOrCall:%o`, 'color:#3B0;', hArg);
		if (argChk_Boolean(hArg, 'call', false)) {
			this.#scrItr.subIdxToken();	// 「コール元の次」に進めず、「コール元」に戻す
			if (this.#hTag.call(hArg)) return;
		}
		else {
			this.#hTag.clear_event({});
			if (this.#hTag.jump(hArg)) return;
		}
		this.resume();
	}
		#setVal_Nochk = (_scope: Scope, _nm: string, _val: T_VAL_BSNU, _autocast = false)=> { /* empty */ }

	resume() {
// console.log(`📜🟢 resume!`);
		// スクリプトが動くとき、ブレイクマークなど消去
		this.#layMng.clearBreak();
		this.#scrItr.noticeBreak(false);
		this.#evtMng.hideHint();

		queueMicrotask(()=> {void this.#main()});
	}
	readonly stop = ()=> {
// console.log(`📜🔴 stop!`);
		this.#scrItr.noticeBreak(true);
	};

	setLoop(isLoop: boolean, mes = '') {
		///console.log('setLoop:'+ (isLoop ?'resume!' :'stop!') +' mes:'+ mes);
		// eslint-disable-next-line no-cond-assign
		if (this.#isLoop = isLoop) this.resume(); else this.stop();
		this.sys.setTitleInfo(mes ?` -- ${mes}中` :'');
	}
	// oxlint-disable-next-line no-unused-private-class-members
	#isLoop = true;

	//MARK: メイン処理（シナリオ解析）
	async #main() {
		let errHd = '';
		try {
			while (this.#isLoop) {
				let token = this.#scrItr.nextToken();
				if (! token) return;	// 初期化前に終了した場合向け

				const uc = token.charCodeAt(0);	// TokenTopUnicode
				// \t タブ
				if (uc === 9) continue;
				// \n 改行
				if (uc === 10) {this.#scrItr.addLineNum(token.length); continue}
				// [ タグ開始
				if (uc === 91) {
					errHd = 'タグ開始';
					if (this.#scrItr.isBreak(token)) return;

					const [tag_name, args] = tagToken2Name_Args(token);
					errHd = `[${tag_name}]例外`;

					const cl = (token.match(/\n/g) ?? []).length;
					if (cl > 0) this.#scrItr.addLineNum(cl);
					if (await this.#scrItr.タグ解析(
						<keyof IHTag>tag_name, args
					)) {this.stop(); return}
					continue;
				}
				// & 変数操作・変数表示
				if (uc === 38) {
					if (! token.endsWith('&')) {
						errHd = '変数計算';
						if (this.#scrItr.isBreak(token)) return;
						const o = splitAmpersand(token.slice(1));
						o.name = this.#getValAmpersand(o.name);
						o.text = String(this.#parse(o.text));
						this.#hTag.let(o);
						continue;
					}

					errHd = '変数操作';
					if (token.charAt(1) === '&') throw new Error('「&表示&」書式では「&」指定が不要です');
					token = String(this.#parse( token.slice(1, -1) ));
						// -> 文字表示 へ
				}
				// ; コメント
				else if (uc === 59) continue;
				// * ラベル
				else if (uc === 42 && token.length > 1) continue;

				// 文字表示
				errHd = '文字表示';
				this.#layMng.setNormalChWait();
				const tl = this.#layMng.currentTxtlayForeNeedErr;
				tl.tagCh(token);
			}
		} catch (e) {
			this.errScript(`${errHd} ${
				e instanceof Error ?`mes=${e.message}(${e.name})` :String(e)
			}`, false);
		}
	}
		#getValAmpersand	= (_v: string)=> '';
		#parse				: (_s: string)=> T_VAL_DATA;

}
