/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2022 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {uint, argChk_Boolean, getFn, CmnLib} from './CmnLib';
import {IHTag, IMain, IVariable, IMark, HArg, Script, IPropParser} from './CmnInterface';
import {Config} from './Config';
import {CallStack, ICallStackArg} from './CallStack';
import {Grammar, tagToken2Name_Args, tagToken2Name} from './Grammar';
import {AnalyzeTagArg} from './AnalyzeTagArg';

import {EventMng} from './EventMng';
import {Loader} from 'pixi.js';
import {LayerMng} from './LayerMng';
import {DebugMng} from './DebugMng';
import {SoundMng} from './SoundMng';
import {SysBase} from './SysBase';

interface HScript {
	[fn: string]: Script;
};

interface ISeek {
	idx		: number;
	ln		: number;
};

interface IPageLog {
	key		: string,
	fn		: string,
	idx		: number,
	retFn	: string,
	retIdx	: number,
	retMark	: IMark,
};

enum BreakState {running, wait, break, breaking, step, stepping, stepouting, stepout};

export class ScriptIterator {
	#script		: Script	= {aToken: [''], len: 1, aLNum: [1]};

	#scriptFn	= '';
	get scriptFn() {return this.#scriptFn;};
	#idxToken	= 0;
	subIdxToken() {--this.#idxToken;};
	#lineNum	= 0;
	get lineNum() {return this.#lineNum;}
	readonly addLineNum	= (len: number)=> this.#lineNum += len;


	#aCallStk	: CallStack[]	= [];	// FILOバッファ（push/pop）

	#grm	= new Grammar;


	constructor(private readonly cfg: Config, private readonly hTag: IHTag, private readonly main: IMain, private readonly val: IVariable, private readonly alzTagArg: AnalyzeTagArg, private readonly runAnalyze: ()=> void, private readonly prpPrs: IPropParser, private readonly sndMng: SoundMng, private readonly sys: SysBase) {
		// 変数操作
		hTag.let_ml		= o=> this.#let_ml(o);	// インラインテキスト代入

		// デバッグ・その他
		hTag.dump_stack	= ()=> this.#dump_stack();	// スタックのダンプ
		hTag.dump_script= o=> this.#dump_script(o);	// スクリプトのダンプ

		// 条件分岐
		hTag['else']	=							// その他ifブロック開始
		hTag.elsif		=							// 別条件のifブロック開始
		hTag.endif		= ()=> this.#endif();		// ifブロックの終端
		hTag['if']		= o=> this.#if(o);			// ifブロックの開始

		// ラベル・ジャンプ
		//hTag.button	// LayerMng.ts内で定義		// ボタンを表示
		hTag.call		= o=> this.#call(o);		// サブルーチンコール
		hTag.jump		= o=> this.#jump(o);		// シナリオジャンプ
		hTag.page		= o=> this.#page(o);		// ページ移動
		hTag.pop_stack	= o=> this.#pop_stack(o);	// コールスタック破棄
		hTag.return		= ()=> this.#return();		// サブルーチンから戻る

		// マクロ
		hTag.bracket2macro	= o=> this.#bracket2macro(o);// 括弧マクロの定義
		hTag.char2macro		= o=> this.#char2macro(o);	// 一文字マクロの定義
		hTag.endmacro		= ()=> this.#return();		// マクロ定義の終了
		hTag.macro			= o=> this.#macro(o);		// マクロ定義の開始

		// しおり
		//hTag.copybookmark		// Variable.ts内で定義	// しおりの複写
		//hTag.erasebookmark	// Variable.ts内で定義	// しおりの消去
		hTag.load			= o=> this.#load(o);			// しおりの読込
		hTag.reload_script	= o=> this.#reload_script(o);	// スクリプト再読込
		hTag.record_place	= ()=> this.#record_place();	// セーブポイント指定
		hTag.save			= o=> this.#save(o);			// しおりの保存


		if (cfg.oCfg.debug.token) this.#dbgToken = token=> console.log(`🌱 トークン fn:${this.#scriptFn} idx:${this.#idxToken} ln:${this.#lineNum} token【${token}】`);

		val.defTmp('const.sn.vctCallStk.length', ()=> this.#aCallStk.length);

		this.#grm.setEscape(cfg.oCfg.init.escape);

		if (CmnLib.isDbg) {
			sys.addHook((type, o)=> this.#hHook[type]?.(o));
			this.isBreak = this.#isBreak_base;

			const fnc = this.analyzeInit;
			this.analyzeInit = ()=> {
				this.analyzeInit = ()=> {};
				this.sys.send2Dbg('hi', {});
			};
			this.#hHook.auth = o=> {
				const hLineBP = o.hBreakpoint.hFn2hLineBP;
				for (const fn in hLineBP) this.#regBreakPoint(fn, hLineBP[fn]);

				ScriptIterator.#hFuncBP = {};
				o.hBreakpoint.aFunc.forEach((v: any)=> ScriptIterator.#hFuncBP[v.name] = 1);

				if (o.stopOnEntry) {
					while (true) {
						let tkn = this.nextToken();
						if (! tkn) break;	// 初期化前に終了した場合向け

						const uc = tkn.charCodeAt(0);	// TokenTopUnicode
						if (uc === 91) break;	// [ タグ開始
						if (uc === 38) break;	// & 変数操作・変数表示
						if (uc === 42 && tkn.length === 1) break;	// 単文字の *
						if (uc === 10) this.#lineNum += tkn.length;	// \n 改行
					}
					this.sys.callHook('stopOnEntry', {});
					this.analyzeInit = fnc;
					this.analyzeInit();
				}
				else {
					this.firstWait = ()=> {
						this.sys.callHook('stopOnEntry', {});	// sn全体へ通知

//						this.sys.callHook('continue', {});	// sn全体へ通知
//						this.breakState = BreakState.breaking;
					};

					this.analyzeInit = fnc;
					this.analyzeInit();
				}
			}
		}
		else this.recodeDesign = ()=> {};
		if (cfg.oCfg.debug.tag) this.#procDebugtag = tag_name=> console.log(`🌲 タグ解析 fn:${this.#scriptFn} idx:${this.#idxToken} ln:${this.#lineNum} [${tag_name} %o]`, this.alzTagArg.hPrm);
	}
	firstWait = ()=> {};
	#regBreakPoint(fn: string, o: {[ln: number]: any}) {
		ScriptIterator.#hFn2hLineBP[this.#cnvSnPath4Dbg(fn)] = o;
	}

	destroy() {this.isBreak = ()=> false;}

	readonly #hHook	: {[type: string]: (o: any)=> void}	= {
		//auth: // constructorで
		//launch:	// ここでは冒頭停止に間に合わないのでanalyzeInit()で
		disconnect: ()=> {
			ScriptIterator.#hFn2hLineBP = {};
			ScriptIterator.#hFuncBP = {};
			this.isBreak = ()=> false;

			this.#hHook.continue({});
			this.#breakState = BreakState.running;
		},
		restart: ()=> this.isBreak = ()=> false,

		// ブレークポイント登録
		add_break: o=> this.#regBreakPoint(o.fn, o.o),
		data_break: o=> {
			if (this.#breakState !== BreakState.running) return;

			this.#breakState = BreakState.wait;
			this.main.setLoop(false, `変数 ${o.dataId}【${o.old_v}】→【${o.new_v}】データブレーク`);
			this.sys.callHook('stopOnDataBreakpoint', {});	// sn全体へ通知
			this.sys.send2Dbg('stopOnDataBreakpoint', {});
		},
		set_func_break: o=> {
			ScriptIterator.#hFuncBP = {};
			o.a.forEach((v: any)=> ScriptIterator.#hFuncBP[v.name] = 1);
			this.sys.send2Dbg(o.ri, {});
		},

		// 情報問い合わせ系
		stack: o=> this.sys.send2Dbg(o.ri, {a: this.#aStack()}),
		eval: o=> {this.sys.send2Dbg(o.ri, {v: this.prpPrs.parse(o.txt)})},

		// デバッガからの操作系
		continue: ()=> {
			if (this.#isIdxOverLast()) return;

			this.#idxToken -= this.#idxDx4Dbg;
			this.#breakState = BreakState.breaking;
			this.main.setLoop(true);
			this.main.resume();	// jumpループ後などで停止している場合があるので
		},
		stepover: o=> this.#go_stepover(o),
		stepin: ()=> {
			if (this.#isIdxOverLast()) return;

			const tkn = this.#script.aToken[this.#idxToken -this.#idxDx4Dbg];
			this.sys.callHook(`stopOnStep${this.#REGSTEPIN.test(tkn) ?'In' :''}`, {});	// sn全体へ通知

			this.#idxToken -= this.#idxDx4Dbg;
			this.#breakState = this.#breakState === BreakState.wait
				? BreakState.step
				: BreakState.stepping;
			this.main.setLoop(true);
			this.main.resume();	// jumpループ後などで停止している場合があるので
		},
		stepout: o=> {
			if (this.#isIdxOverLast()) return;

			if (this.#aCallStk.length > 0) this.#go_stepout(true);
			else this.#go_stepover(o);
		},
		pause: ()=> {
			this.#breakState = BreakState.step;
			this.main.setLoop(false, '一時停止');
			this.sys.send2Dbg('stopOnStep', {});
		},
		stopOnEntry: ()=> {
			this.#breakState = BreakState.step;
			this.main.setLoop(false, '一時停止');
			this.sys.send2Dbg('stopOnEntry', {});
		},
	};
	readonly #cnvSnPath = (fn: string)=> this.cfg.searchPath(fn, Config.EXT_SCRIPT);
	static	readonly	#REG4CODE_FN	= /(.+)\/crypto_prj\/([^\/]+)\/[^\.]+(\.\w+)/;	// https://regex101.com/r/Km54EK/1 141 steps (~0ms)
	readonly #cnvSnPath4Dbg = (fn: string)=>
		(this.sys.pathBaseCnvSnPath4Dbg + this.#cnvSnPath(fn))
		.replace(ScriptIterator.#REG4CODE_FN, `$1/prj/$2/${this.#scriptFn}$3`);
	cnvPath4Dbg = (fn: string)=> this.sys.pathBaseCnvSnPath4Dbg + fn.replace('/crypto_prj/', '/prj/');
	#go_stepover(o: any) {
		if (this.#isIdxOverLast()) return;

		const tkn = this.#script.aToken[this.#idxToken -this.#idxDx4Dbg];
		if (this.#REGSTEPIN.test(tkn)) this.#go_stepout(false);
		else {
			this.sys.callHook('stopOnStep', {});	// sn全体へ通知
			this.#hHook.stepin(o);
		}
	}
	#go_stepout(out: boolean) {
		this.sys.callHook(`stopOnStep${out ?'Out' :''}`, {});	// sn全体へ通知
		this.#csDepth_macro_esc = this.#aCallStk.length -(out ?1 :0);
		this.#idxToken -= this.#idxDx4Dbg;
		this.#breakState = out ?BreakState.stepout :BreakState.stepouting;
		this.main.setLoop(true);
		this.main.resume();	// jumpループ後などで停止している場合があるので
	}
	#csDepth_macro_esc	= 0;
	get #idxDx4Dbg() {
		return this.#breakState === BreakState.break
			|| this.#breakState === BreakState.step ?1 :0
	};
	#isIdxOverLast(): boolean {
		if (this.#idxToken < this.#script.len) return false;
		this.sys.callHook('stopOnEntry', {});	// sn全体へ通知
		this.main.setLoop(false, 'スクリプト終端です');
		return true;
	}

	// reload 再生成 Main に受け渡すため static
	static	#hFn2hLineBP: {[fn: string]: {[ln: number]: any}} = {};
	static	#hFuncBP: {[tag_name: string]: 1} = {};
	#breakState	= BreakState.running;
		// https://raw.githubusercontent.com/famibee/SKYNovel-vscode-extension/master/res/img/breakState.svg
	isBreak = (_token: string)=> false;
	#isBreak_base(token: string): boolean {
		switch (this.#breakState) {
			case BreakState.stepouting:	this.#subHitCondition();
				this.#breakState = BreakState.stepout;	break;
			case BreakState.stepout:
				if (this.#aCallStk.length !== this.#csDepth_macro_esc) break;

				this.#breakState = BreakState.step;
				this.main.setLoop(false, 'ステップ実行');
				this.sys.send2Dbg('stopOnStep', {});
				return true;	// タグを実行せず、直前停止

			case BreakState.stepping:	this.#subHitCondition();
				this.#breakState = BreakState.step;	break;
			case BreakState.step:		this.#subHitCondition();
				this.main.setLoop(false, 'ステップ実行');
				this.sys.send2Dbg('stopOnStep', {});
				return true;	// タグを実行せず、直前停止

			case BreakState.breaking:	this.#subHitCondition();
				this.#breakState = BreakState.running;	break;

			default:
			{	// 関数ブレークポイント
				if (tagToken2Name(token) in ScriptIterator.#hFuncBP) {
					this.#breakState = BreakState.break;
					this.main.setLoop(false, `関数 ${token} ブレーク`);
					this.sys.callHook('stopOnBreakpoint', {});	// sn全体へ通知
					this.sys.send2Dbg('stopOnBreakpoint', {});
					return true;	// タグを実行せず、直前停止
				}
			}
			{	// ブレークポイント
				const bp = ScriptIterator.#hFn2hLineBP[this.#cnvSnPath4Dbg(this.#scriptFn)];
				if (! bp) break;
				const o = bp[this.#lineNum];
				if (! o) break;
//console.log(`fn:ScriptIterator.ts line:145 👺 【bs:${this.#breakState} idx:${this.#idxToken} ln:${this.#lineNum} tkn:${this.#script.aToken[this.#idxToken -1]}:】 o:%o`, o);
				if (o.condition) {if (! this.prpPrs.parse(o.condition)) break;}
				else if (('hitCondition' in o) && --o.hitCondition > 0) break;
				const isBreak = this.#breakState === BreakState.running;
				this.#breakState = BreakState.break;
				this.main.setLoop(false, isBreak ?(
					(o.condition ? '条件' :'ヒットカウント') +'ブレーク'
					) :'ステップ実行');
				const type = isBreak ?'stopOnBreakpoint' :'stopOnStep';
				this.sys.callHook(type, {});	// sn全体へ通知
				this.sys.send2Dbg(type, {});
			}
				return true;	// タグを実行せず、直前停止
		}

		return false;	// no break、タグを実行
	}
	#subHitCondition() {	// step実行中でbreakしないがヒットカウントだけ減算
		const o = ScriptIterator.#hFn2hLineBP[getFn(this.#scriptFn)]?.[this.#lineNum];
		if (o?.hitCondition) --o.hitCondition;
	}

	#aStack(): {fn: string, ln: number, col: number, nm: string, ma: string}[] {
		const idx_n = this.#breakState === BreakState.breaking ?1 :0;
		const tkn0 = this.#script.aToken[this.#idxToken -1 +idx_n];

		const fn0 = this.#cnvSnPath4Dbg(this.#scriptFn);
		const tag_name0 = tagToken2Name(tkn0);
		const nm = tag_name0 ?`[${tag_name0}]` :tkn0;
//console.log(`fn:ScriptIterator.ts aStack breakState:${this.#breakState} idx:${this.#idxToken -1} idx_n:${idx_n} tkn0:${tkn0}: fn0:${fn0} nm:${nm} tkn02:${this.#script.aToken[this.#idxToken -1]}: +tkn02:${this.#script.aToken[this.#idxToken]}:`);
//console.log(`fn:ScriptIterator.ts     a:%o anum:%o`, this.script.aToken, this.script.aLNum);
		const ma = this.val.getVal('mp:const.sn.macro') ?? '{}';
		if (this.#idxToken === 0) return [{fn: fn0, ln: 1, col: 1, nm: nm, ma: ma,}];

		const lc0 = this.#cnvIdx2lineCol(this.#script, this.#idxToken);// -1不要
//console.log(`fn:ScriptIterator.ts     ln:${lc0.ln} col:${lc0.col_s} col2:${this.#script.aLNum[this.#idxToken -1]}`);
		const a = [{fn: fn0, ln: lc0.ln, col: lc0.col_s +1, nm: nm, ma: ma}];
		const len = this.#aCallStk.length;
		if (len === 0) return a;

		for (let i=len -1; i>=0; --i) {
			const cs = this.#aCallStk[i];
			const st = this.#hScript[cs.fn];
			const tkn = st.aToken[cs.idx -1];
			const lc = this.#cnvIdx2lineCol(st, cs.idx);	// -1不要

			const tag_name = tagToken2Name(tkn);
			a.push({
				fn	: this.#cnvSnPath4Dbg(cs.fn),
				ln	: lc.ln,
				col	: lc.col_s +1,
				nm	: tag_name ?`[${tag_name}]` :tkn,
				ma	: cs.csArg[':hMp']['const.sn.macro'] ?? '{}',
			});
		}

		return a;
	}

	// result = true : waitする  resume()で再開
	#procDebugtag	= (_tag_name: string)=> {};
	タグ解析(tagToken: string): boolean {
		const [tag_name, args] = tagToken2Name_Args(tagToken);
		const tag_fnc = this.hTag[tag_name];
		if (! tag_fnc) throw `未定義のタグ【${tag_name}】です`;

		this.alzTagArg.go(args);
		this.#procDebugtag(tag_name);

		const hPrm = this.alzTagArg.hPrm;
		if (hPrm.cond) {
			const cond = hPrm.cond.val;
			if (! cond || cond.charAt(0) === '&') throw '属性condは「&」が不要です';
			const p = this.prpPrs.parse(cond);
			const ps = String(p);
			if (ps === 'null' || ps === 'undefined') return false;
			if (! p) return false;
		}

		let hArg: HArg | ICallStackArg = {};
		const len = this.#aCallStk.length;
		if (this.alzTagArg.isKomeParam) {
			if (len === 0) throw '属性「*」はマクロのみ有効です';
			hArg = {...this.#aCallStk[this.#aCallStk.length -1].csArg};
		}
		hArg[':タグ名'] = tag_name;
		// valやdefの値について。null はありえない。'null'や'undefined' はありえる。
		// 省略時以外で undefined はない。a=undefined と書いても 'undefined' になる
		for (const arg_nm in hPrm) {
			let v = hPrm[arg_nm].val;
			if (v?.charAt(0) === '%') {
				if (len === 0) throw '属性「%」はマクロ定義内でのみ使用できます（そのマクロの引数を示す簡略文法であるため）';
				const mac = (<any>this.#aCallStk[this.#aCallStk.length -1].csArg)[v.slice(1)];
				if (mac) {(<any>hArg)[arg_nm] = mac; continue;}

				v = hPrm[arg_nm].def;
				if (v === undefined || v === 'null') continue;
					// defの'null'指定。%変数が無い場合、タグやマクロに属性を渡さない
			}

			v = this.prpPrs.getValAmpersand(v ?? '');
			if (v !== 'undefined') {(<any>hArg)[arg_nm] = v; continue;}

			const def = hPrm[arg_nm].def;
			if (def === undefined) continue;
			v = this.prpPrs.getValAmpersand(def);
			if (v !== 'undefined') (<any>hArg)[arg_nm] = v;
				// 存在しない値の場合、属性を渡さない
		}

		return tag_fnc(hArg);
	}


	#evtMng	: EventMng;
	#layMng	: LayerMng;
	setOtherObj(evtMng: EventMng, layMng: LayerMng): void {
		this.#evtMng = evtMng;
		this.#layMng = layMng;
	}


//	//	変数操作
	// インラインテキスト代入
	#let_ml(hArg: HArg) {
		const name = hArg.name;
		if (! name) throw 'nameは必須です';

		let ml = '';
		const len = this.#script.len;
		for (; this.#idxToken<len; ++this.#idxToken) {
			ml = this.#script.aToken[this.#idxToken];
			if (ml !== '') break;
		}
		hArg.text = ml;
		hArg.cast = 'str';
		this.hTag['let'](hArg);
		this.#idxToken += 2;
		this.#lineNum += (ml.match(/\n/g) ?? []).length;

		return false;
	}


//	// デバッグ・その他
	// スタックのダンプ
	#dump_stack() {
		if (this.#idxToken === 0) {
			console.group(`🥟 [dump_stack] スクリプト現在地 fn:${this.#scriptFn} line:${1} col:${0}`);
			console.groupEnd();
			return false;
		}

		const lc0 = this.#cnvIdx2lineCol(this.#script, this.#idxToken);
		const now = `スクリプト現在地 fn:${this.#scriptFn} line:${lc0.ln} col:${lc0.col_s +1}`;
		console.group(`🥟 [dump_stack] ${now}`);
		const len = this.#aCallStk.length;
		if (len > 0) {
			console.info(now);
			for (let i=len -1; i>=0; --i) {
				const cs = this.#aCallStk[i];
				const hMp = cs.csArg[':hMp'];
				const from_macro_nm = hMp ?hMp[':タグ名'] :null;
				const call_nm = cs.csArg[':タグ名'] ?? '';
				const lc = this.#cnvIdx2lineCol(this.#hScript[cs.fn], cs.idx);
				console.info(
					`${len -i}つ前のコール元 fn:${cs.fn} line:${lc.ln
					} col:${lc.col_s +1
					}`+ (from_macro_nm ?'（['+ from_macro_nm +']マクロ内）' :' ')+
					`で [${call_nm} ...]をコール`
				);
			}
		}
		console.groupEnd();

		return false;
	}
	#cnvIdx2lineCol(st: Script, idx: number): {ln: number, col_s: number, col_e: number} {
		const ret = {ln: 1, col_s: 0, col_e: 0};
		if (! st) return ret;

		let i = idx -1;
		const lN = ret.ln = st.aLNum[i];
		while (st.aLNum[i] === lN) {
			if (st.aToken[i].charAt(0) !== '\n') {
				const len = st.aToken[i].length;
//console.log(`fn:ScriptIterator.ts line:586 cnvIdx2lineCol tkn:${st.aToken[i]} len:${len} s:${ret.col_s} e:${ret.col_e}`);
				if (ret.col_e > 0) ret.col_s += len;
				ret.col_e += len;
			}
			if (--i < 0) break;
		}

		return ret;
	}


	// 外部へスクリプトを表示
	#dump_script(hArg: HArg) {
		const set_fnc = hArg.set_fnc;	// スクリプトを返すコールバック
		if (! set_fnc) throw 'set_fncは必須です';

		this.#fncSet = (globalThis as any)[set_fnc];
		if (! this.#fncSet) {
			if (argChk_Boolean(hArg, 'need_err', true)) throw `HTML内に関数${set_fnc}が見つかりません`;
			this.#fncSet = ()=> {};
			return false;
		}

		this.noticeBreak = (goto: boolean)=> {
			if (this.#fnLastBreak !== this.#scriptFn) {
				this.#fnLastBreak = this.#scriptFn;
				this.#fncSet(
					this.#hScrCache4Dump[this.#scriptFn]
					=  this.#hScrCache4Dump[this.#scriptFn]
					?? this.#script.aToken.join('')
				);
			}
			this.#fncBreak(this.#lineNum, goto);
		};
		this.noticeBreak(true);	// 一度目のthis.fncBreak()はスルー（まだ読んでないし）

		const break_fnc = hArg.break_fnc;	// Break通知コールバック
		if (! break_fnc) return false;

		this.#fncBreak = (globalThis as any)[break_fnc];
		if (! this.#fncBreak) {
			if (argChk_Boolean(hArg, 'need_err', true)) throw `HTML内に関数${break_fnc}が見つかりません`;
			this.#fncBreak = ()=> {};
		}

		return false;
	}
	#fncSet: (txt: string)=> void = ()=> {};
	#fncBreak: (ln: number, goto: boolean)=> void = ()=> {};
	#fnLastBreak = '';
	#hScrCache4Dump: {[fn: string]: string;} = {};
	noticeBreak = (_goto: boolean)=> {}


	#dumpErrLine = 5;
	dumpErrForeLine() {
		if (this.#idxToken === 0) {
			console.group(`🥟 Error line (from 0 rows before) fn:${this.#scriptFn}`);
			console.groupEnd();
			return;
		}

		let s = '';
		for (let i=this.#idxToken -1; i>=0; --i) {
			s = this.#script.aToken[i] + s;
			if ((s.match(/\n/g) ?? []).length >= this.#dumpErrLine) break;
		}
		const a = s.split('\n').slice(-this.#dumpErrLine);
		const len = a.length;
		console.group(`🥟 Error line (from ${len} rows before) fn:${this.#scriptFn}`);
		const ln_txt_width = String(this.#lineNum).length;
		const lc = this.#cnvIdx2lineCol(this.#script, this.#idxToken);
		for (let i=0; i<len; ++i) {
			const ln = this.#lineNum -len +i +1;
			const mes = `${String(ln).padStart(ln_txt_width, ' ')}: %c`;
			const e = a[i];
			const line = (e.length > 75) ?e.slice(0, 75) +'…' :e;	// 長い場合は後略
			if (i === len -1) console.info(
				mes + line.slice(0, lc.col_s) +'%c'+ line.slice(lc.col_s),
				'color: black; background-color: skyblue;', 'color: black; background-color: pink;'
			)
			else console.info(mes + line, 'color: black; background-color: skyblue;');
		}
		console.groupEnd();
		//console.log('Linkの出力   : %o', 'file:///Volumes/MacHD2/_Famibee/SKYNovel/prj/mat/main.sn');
	}


//	// 条件分岐
	#aIfStk	: number[]	= [-1];	// FIFOバッファ（push/unshift）
	#endif() {
		if (this.#aIfStk[0] === -1) throw 'ifブロック内ではありません';

		this.#idxToken = this.#aIfStk[0];
		this.#aIfStk.shift();	// 最初の要素を取り除く

		return false;
	}
	#if(hArg: HArg) {
		//console.log('if idxToken:'+ this.#idxToken);
		const exp = hArg.exp;
		if (! exp) throw 'expは必須です';
		if (exp.charAt(0) === '&') throw '属性expは「&」が不要です';

		let cntDepth = 0;		// if深度カウンター
		let	idxGo = this.prpPrs.parse(exp) ?this.#idxToken :-1;
		const lnIf = this.#script.aLNum[this.#idxToken];
		let zLn = this.#lineNum -(lnIf || 0);	// ??ではなく。NaN は falsy
		const len = this.#script.len;
		for (; this.#idxToken<len; ++this.#idxToken) {
			const ln = this.#script.aLNum[this.#idxToken];
			this.#script.aLNum[this.#idxToken] = (ln || 0)+ zLn; // ??はNaN不可
			const tkn = this.#script.aToken[this.#idxToken];
			//console.log(`[if]トークン fn:${this.#scriptFn} lnum:${this.#lineNum} idx:${this.#idxToken} realLn:${this.#script.aLNum[this.#idxToken]} idxGo:${idxGo} cntDepth:${cntDepth} token<${tkn}>`);
			if (! tkn) continue;

			const uc = tkn.charCodeAt(0);	// TokenTopUnicode
			if (uc === 10) {this.#lineNum += tkn.length; continue;}	// \n 改行
			if (uc !== 91) continue;	// [ タグ開始以外

			const [tag_name, args] = tagToken2Name_Args(tkn);
			if (! (tag_name in this.hTag)) throw `未定義のタグ[${tag_name}]です`;
			this.alzTagArg.go(args);

			switch (tag_name) {
			case 'if':	++cntDepth; break;

			case 'elsif':
				if (cntDepth > 0) break;
				if (idxGo > -1) break;

				const e = this.alzTagArg.hPrm.exp.val ?? '';
				if (e.charAt(0) === '&') throw '属性expは「&」が不要です';
				if (this.prpPrs.parse(e)) idxGo = this.#idxToken +1;
				break;

			case 'else':
				if (cntDepth > 0) break;
				if (idxGo === -1) idxGo = this.#idxToken +1;
				break;

			case 'endif':
				if (cntDepth > 0) {--cntDepth; break;}
				if (idxGo === -1) {
					++this.#idxToken;
					this.#script.aLNum[this.#idxToken] += zLn;
				}
				else {
					this.#aIfStk.unshift(this.#idxToken +1);	// 先頭に要素追加
					this.#idxToken = idxGo;
					this.#lineNum = this.#script.aLNum[this.#idxToken];
						// +zLn 不要
				}
				return false;
			}
		}
		throw '[endif]がないままスクリプト終端です';
		//return false;
	}


//	// ラベル・ジャンプ
	// サブルーチンコール
	#call(hArg: HArg) {
		if (! argChk_Boolean(hArg, 'count', false)) this.#eraseKidoku();

		const fn = hArg.fn;
		if (fn) this.#cnvSnPath(fn);	// chk only
		this.#callSub({':hEvt1Time': this.#evtMng.popLocalEvts(), ':hMp': this.val.cloneMp()});

		if (argChk_Boolean(hArg, 'clear_local_event', false)) this.hTag.clear_event({});
		this.#jumpWork(fn, hArg.label);

		return true;
	}
	#callSub(csa: ICallStackArg) {
		this.#script.aLNum[this.#idxToken] = this.#lineNum;	// 戻ったときの行番号
		if (! this.#resvToken) {csa[':resvToken'] = ''; this.#clearResvToken();}
		this.#aCallStk.push(new CallStack(this.#scriptFn, this.#idxToken, csa));
		this.#aIfStk.unshift(-1);	// 最初に要素を追加
	}

	// シナリオジャンプ
	#jump(hArg: HArg) {
		if (! argChk_Boolean(hArg, 'count', true)) this.#eraseKidoku();

		this.#aIfStk[0] = -1;
		this.#jumpWork(hArg.fn, hArg.label);

		return true;
	}

	// ページ移動
	#page(hArg: HArg) {
		if (this.#posAPageLog === -1) return false;
		if (argChk_Boolean(hArg, 'clear', false)) {
			this.#aPageLog = [];
			this.#posAPageLog = -1;
			return false;
		}

		const to = hArg.to;
		if (! to) throw 'clearかtoは必須です';
		const oldPos = this.#posAPageLog;
		switch (to) {
			case 'prev':
				if (this.#posAPageLog > 0) --this.#posAPageLog;
				break;

			case 'next':
				const len = this.#aPageLog.length;
				if (this.#posAPageLog < len -1) ++this.#posAPageLog;
				break;

			default:	throw `属性to「${to}」は異常です`;
		}
		if (oldPos === this.#posAPageLog) return false;

		const o = this.#aPageLog[this.#posAPageLog];
		const {fn, idx} = this.#nowScrIdx();
//console.log(`fn:ScriptIterator.ts #page to:${to} key=${o.key} retFn:${o.retFn} retIdx:${o.retIdx} pos:${this.#posAPageLog}`);
		if (o.key === idx +':'+ fn) return false;
/*
	const st = this.#hScript[o.fn];
	const tkn = st.aToken[o.idx];
	const lc = this.#cnvIdx2lineCol(st, o.idx +1);	// -1不要
console.log(`fn:ScriptIterator.ts       - \x1b[44mln:${lc.ln}\x1b[49m col:${lc.col_s +1} -- token:${tkn}`);
*/
		return this.#loadFromMark({fn: o.retFn, index: o.retIdx,}, o.retMark);
	}

	// コールスタック破棄
	#pop_stack(hArg: HArg) {
		if (argChk_Boolean(hArg, 'clear', false)) this.#aCallStk = [];
		else if (! this.#aCallStk.pop()) throw '[pop_stack] スタックが空です';
		this.#clearResvToken();
		this.#aIfStk = [-1];
		this.val.setMp({});

		return false;
	}

	// サブルーチンから戻る
	#return() {
		const cs = this.#aCallStk.pop();
		if (! cs) throw '[return] スタックが空です';
		const csa = cs.csArg;
		this.#aIfStk.shift();	// 最初の要素を取り除く

		const hMp = csa[':hMp'];	// マクロからの復帰の場合にmp:値も復帰
		if (hMp) this.val.setMp(hMp);

		const after_token = csa[':resvToken'];
		if (after_token) this.nextToken = ()=> {
			this.#clearResvToken();
			return after_token;
		}
		else this.#clearResvToken();
		if (csa[':hEvt1Time']) this.#evtMng.pushLocalEvts(csa[':hEvt1Time']);

		if (cs.fn in this.#hScript) {this.#jump_light(cs); return false;}
		this.#jumpWork(cs.fn, '', cs.idx);	// 確実にスクリプトロードなので
		return true;
	}

	#resvToken	= '';
	#clearResvToken() {
		this.#resvToken = '';
		this.nextToken = this.#nextToken_Proc;
	}


	#skipLabel = '';
	#jumpWork(fn = '', label = '', idx = 0) {
		if (! fn && ! label) this.main.errScript('[jump系] fnまたはlabelは必須です');
		if (label) {
			if (label.charAt(0) !== '*') this.main.errScript('[jump系] labelは*で始まります');
			this.#skipLabel = label;
			if (this.#skipLabel.slice(0, 2) !== '**') this.#idxToken = idx;
		}
		else {
			this.#skipLabel = '';
			this.#idxToken = idx;
		}

		if (! fn) {this.analyzeInit(); return;}

		const full_path = this.#cnvSnPath(fn);
		if (fn === this.#scriptFn) {this.analyzeInit(); return;}
		this.#scriptFn = fn;
		const st = this.#hScript[this.#scriptFn];
		if (st) {this.#script = st; this.analyzeInit(); return;}

		(new Loader).add({name: this.#scriptFn, url: full_path})
		.use((res, next)=> {
			try {
				res.data = this.sys.decStr(res.extension, res.data);
			} catch (e) {
				this.main.errScript(`[jump系]snロード失敗です fn:${res.name} ${e}`, false);
			}
			next?.();
		})
		.load((_ldr, hRes)=> {
			this.nextToken = this.#nextToken_Proc;
			this.#lineNum = 1;

			this.#resolveScript(hRes[fn].data);
			this.hTag.record_place({});
			this.main.resume(()=> this.analyzeInit());
				// 直接呼んでもいいが、内部コールスタック積んだままになるのがなんかイヤで
		});
		this.main.stop();
	}
	private	analyzeInit(): void {
		const o = this.#seekScript(this.#script, Boolean(this.val.getVal('mp:const.sn.macro.name')), this.#lineNum, this.#skipLabel, this.#idxToken);
		this.#idxToken	= o.idx;
		this.#lineNum	= o.ln;
		this.runAnalyze();
	}

	// シナリオ解析処理ループ・冒頭処理
	nextToken = ()=> '';	// 初期化前に終了した場合向け
	#nextToken_Proc(): string {
		if (this.#errOverScr()) return '';

		this.#recordKidoku();

		// トークンの行番号更新
		this.#script.aLNum[this.#idxToken] ||= this.#lineNum;	// ??はNaN不可
		const token = this.#script.aToken[this.#idxToken];
		this.#dbgToken(token);
		++this.#idxToken;

		return token;
	}
	#dbgToken = (_token: string)=> {};
	#errOverScr(): boolean {
		if (this.#idxToken < this.#script.len) return false;
		this.main.errScript('スクリプト終端です');
		return true;
	}


	readonly #REG_NONAME_LABEL		= /(\*{2,})(.*)/;
	readonly #REG_TOKEN_MACRO_BEGIN	= /\[macro\s/;
	readonly #REG_TOKEN_MACRO_END	= /\[endmacro[\s\]]/;
	readonly #REG_TAG_LET_ML		= /^\[let_ml\s/g;
	readonly #REG_TAG_ENDLET_ML		= /^\[endlet_ml\s*]/g;
	#seekScript(st: Script, inMacro: boolean, ln: number, skipLabel: string, idx: number): ISeek {
		//console.log(`seekScript (from)inMacro:${inMacro} (from)ln:${ln} (to)skipLabel:${skipLabel}: (to)idx:${idx}`);
		const len = st.aToken.length;
		if (! skipLabel) {	// ラベルジャンプ以外（先頭から開始）
			if (this.#errOverScr()) return {idx, ln};

			if (! st.aLNum[idx]) {	// NaN、undefined は falsy
				ln = 1;
				for (let j=0; j<idx; ++j) {
					// 走査ついでにトークンの行番号も更新
					st.aLNum[j] ||= ln;	// ??はNaN不可

					const tkn = st.aToken[j];
					if (tkn.charCodeAt(0) === 10) ln += tkn.length;	// \n 改行
					else ln += (tkn.match(/\n/g) ?? []).length;
				}
				st.aLNum[idx] = ln;
			}
			else ln = st.aLNum[idx];

			return {idx, ln};
		}

		// 無名ラベルジャンプ
		st.aLNum[0] = 1;
		const a_skipLabel = skipLabel.match(this.#REG_NONAME_LABEL);
		if (a_skipLabel) {
			skipLabel = a_skipLabel[1];
			let i = idx;
			switch (a_skipLabel[2]) {
			case 'before':
				while (st.aToken[--i] !== skipLabel) {
					if (i === 0) DebugMng.myTrace('[jump系 無名ラベルbefore] '
						+ ln +'行目以前で'+ (inMacro ?'マクロ内に' :'')
						+ 'ラベル【'+ skipLabel +'】がありません', 'ET');
					if (inMacro && st.aToken[i].search(this.#REG_TOKEN_MACRO_BEGIN) > -1) DebugMng.myTrace('[jump系 無名ラベルbefore] マクロ内にラベル【'+ skipLabel +'】がありません', 'ET');
				}
				return {idx: i +1, ln: st.aLNum[i]};	//	break;

			case 'after':
				while (st.aToken[++i] !== skipLabel) {
					if (i === len) DebugMng.myTrace('[jump系 無名ラベルafter] '
						+ ln +'行目以後でマクロ内にラベル【'+ skipLabel +'】がありません', 'ET');
					if (st.aToken[i].search(this.#REG_TOKEN_MACRO_END) > -1) DebugMng.myTrace('[jump系 無名ラベルafter] '
						+ ln +'行目以後でマクロ内にラベル【'+ skipLabel +'】がありません', 'ET');
				}
				return {idx: i +1, ln: st.aLNum[i]};	//	break;

			default:
				DebugMng.myTrace('[jump系] 無名ラベル指定【label='+ skipLabel +'】が間違っています', 'ET');
			}
		}

		// ラベルジャンプ
		ln = 1;
		const reLabel = new RegExp(
			'^'+ skipLabel.replaceAll('*', '\\*') +'(?:\\s|;|\\[|$)');
		let in_let_ml = false;
		for (let i=0; i<len; ++i) {
			// 走査ついでにトークンの行番号も更新
			st.aLNum[i] ||= ln;	// ??はNaN不可

			const tkn = st.aToken[i];
			if (in_let_ml) {
				this.#REG_TAG_ENDLET_ML.lastIndex = 0;
				if (this.#REG_TAG_ENDLET_ML.test(tkn)) in_let_ml = false;
				else ln += (tkn.match(/\n/g) ?? []).length;
				continue;
			}

			const uc = tkn.charCodeAt(0);	// TokenTopUnicode
			if (uc === 10) {ln += tkn.length; continue;}	// \n 改行
			if (uc === 42) {	// 42 = *
				if (tkn.search(reLabel) > -1) return {idx: i +1, ln};//	break;
				continue;
			}
			if (uc !== 91) continue;	// [ タグ開始

			ln += (tkn.match(/\n/g) ?? []).length;
			this.#REG_TAG_LET_ML.lastIndex = 0;
			if (this.#REG_TAG_LET_ML.test(tkn)) in_let_ml = true;
		}
		if (in_let_ml) throw '[let_ml]の終端・[endlet_ml]がありません';

		DebugMng.myTrace(`[jump系] ラベル【${skipLabel}】がありません`, 'ET');
		throw 'Dummy';
	}

	#hScript	: HScript	= Object.create(null);	//{} シナリオキャッシュ
	#resolveScript(txt: string) {
		const v = txt
			.replace(/(\r\n|\r)/g, '\n')
			.match(this.#grm.REG_TOKEN) ?? [];
		for (let i=v.length -1; i>=0; --i) {
			const e = v[i];
			this.#REG_TAG_LET_ML.lastIndex = 0;
			if (this.#REG_TAG_LET_ML.test(e)) {
				const idx = e.indexOf(']') +1;
				if (idx === 0) throw '[let_ml]で閉じる【]】がありません';
				const a = e.slice(0, idx);
				const b = e.slice(idx);
				v.splice(i, 1, a, b);
			}
		}
		this.#script = {aToken :v, len :v.length, aLNum :[]};

		let mes = '';
		try {
			mes = 'ScriptIterator.replaceScriptChar2macro';
			this.#grm.replaceScr_C2M_And_let_ml(this.#script);
			mes = 'ScriptIterator.replaceScript_Wildcard';
			this.#replaceScript_Wildcard();
		}
		catch (err) {
			if (err instanceof Error) {
				const e = err as Error;
				mes += `例外 mes=${e.message}(${e.name})`;
			}
			else {
				mes = err as string;
			}
			this.main.errScript(mes, false);
		}
		this.#hScript[this.#scriptFn] = this.#script;

		this.val.loadScrWork(this.#scriptFn);
	}

	#jump_light(cs: CallStack) {
		// jumpでは連続マクロでスタックオーバーフローになるので簡易版を
		// 主に[return]やマクロ終了でジャンプ先がチェック不要な場合用
		// analyzeInit()とかもジャンプ前にやってて不要だし
		this.#scriptFn	= cs.fn;
		this.#idxToken	= cs.idx;
		const st = this.#hScript[this.#scriptFn];
		if (st) this.#script = st;
		this.#lineNum = this.#script.aLNum[cs.idx];
	}


	readonly #REG_WILDCARD	= /^\[(call|loadplugin)\s/;
	readonly #REG_WILDCARD2	= /\bfn\s*=\s*[^\s\]]+/;
	#replaceScript_Wildcard = ()=> {
		for (let i=this.#script.len -1; i>=0; --i) {
			const token = this.#script.aToken[i];
			this.#REG_WILDCARD.lastIndex = 0;
			if (! this.#REG_WILDCARD.test(token)) continue;

			const [tag_name, args] = tagToken2Name_Args(token);
			this.alzTagArg.go(args);

			const p_fn = this.alzTagArg.hPrm.fn;
			if (! p_fn) continue;
			const fn = p_fn.val;
			if (! fn || fn.slice(-1) !== '*') continue;

			const ext = (tag_name === 'loadplugin') ?'css' :'sn';
			const a = this.cfg.matchPath('^'+ fn.slice(0, -1) +'.*', ext);

			this.#script.aToken.splice(i, 1, '\t', '; '+ token);
			this.#script.aLNum.splice(i, 1, NaN, NaN);

			for (const v of a) {
				const nt = token.replace(
					this.#REG_WILDCARD2,
					'fn='+ decodeURIComponent(getFn(v[ext]))
				);
				//console.log('\t='+ nt +'=');
				this.#script.aToken.splice(i, 0, nt);
				this.#script.aLNum.splice(i, 0, NaN);
			}
		}
		this.#script.len = this.#script.aToken.length;
	}


	#recordKidoku(): void {
		const areas = this.val.getAreaKidoku(this.#scriptFn);
		if (! areas) throw `recordKidoku fn:'${this.#scriptFn}' (areas === null)`;

		// マクロ内やサブルーチンではisKidokuを変更させない
		if (this.#aCallStk.length > 0) {areas.record(this.#idxToken); return;}

		this.#isKidoku = areas.search(this.#idxToken);
		this.val.setVal_Nochk('tmp', 'const.sn.isKidoku', this.#isKidoku);
		if (this.#isKidoku) return;

		areas.record(this.#idxToken);
		// saveKidoku()
			// 厳密にはここですべきだが、パフォーマンスに問題があるので
			// クリック待ちを期待できるwait、waitclick、s、l、pタグで
			// saveKidoku()をコール。
	}
	#isKidoku	= false;
	get isKidoku(): boolean {return this.#isKidoku;};
	#eraseKidoku(): void {
		this.val.getAreaKidoku(this.#scriptFn)?.erase(this.#idxToken);
		this.#isKidoku = false;
	}
	get isNextKidoku(): boolean {
		let fn	= this.#scriptFn;
		let idx	= this.#idxToken;
		let len	= this.#script.len;
		if (this.#aCallStk.length > 0) {
			const cs = this.#aCallStk[0];
			fn  = cs.fn;
			idx = cs.idx;
			const st = this.#hScript[fn];
			if (st) len = st.len;
		}

		const areas = this.val.getAreaKidoku(fn);
		if (! areas) return false;
		if (idx === len) return false;	// スクリプト終端

		//traceDbg("isNextKidoku fn:"+ fn +" idx:"+ idx +" ret="+ (areas.search(idx)));
		//traceDbg("【"+ vctT[idx-1] +"】【"+ vctT[idx] +"】");

		return areas.search(idx);
	}


	get normalWait(): number {
		return this.#isKidoku
		? (
			this.val.getVal('sys:sn.tagCh.doWait_Kidoku')
			?	uint(this.val.getVal('sys:sn.tagCh.msecWait_Kidoku'))
			:	0
		)
		: (
			this.val.getVal('sys:sn.tagCh.doWait')
			?	uint(this.val.getVal('sys:sn.tagCh.msecWait'))
			:	0
		);
	}


//	// マクロ
	// 括弧マクロの定義
	#bracket2macro(hArg: HArg) {
		this.#grm.bracket2macro(hArg, this.#script, this.#idxToken);

		return false;
	}

	// 一文字マクロの定義
	#char2macro(hArg: HArg) {
		this.#grm.char2macro(hArg, this.hTag, this.#script, this.#idxToken);

		return false;
	}

	// マクロ定義の開始
	#macro(hArg: HArg) {
		const name = hArg.name;
		if (! name) throw 'nameは必須です';
		if (name in this.hTag) throw `[${name}]はタグかすでに定義済みのマクロです`;

		const ln = this.#lineNum;
		const cs = new CallStack(this.#scriptFn, this.#idxToken);
		this.#strStepin += '|'+ name;
		this.#REGSTEPIN = new RegExp(`\\[(${this.#strStepin})\\b`);
		this.hTag[name] = hArgM=> {
			hArgM.design_unit = hArg.design_unit;
			this.#callSub({...hArgM, ':hMp': this.val.cloneMp()} as any);

			// AIRNovelの仕様：親マクロが子マクロコール時、*がないのに値を引き継ぐ
			//for (const k in hArg) this.val.setVal_Nochk('mp', k, hArg[k]);
			this.val.setMp(hArgM as any);
			this.val.setVal_Nochk('mp', 'const.sn.macro', JSON.stringify(hArg));
			this.val.setVal_Nochk('mp', 'const.sn.me_call_scriptFn', this.#scriptFn);

			this.#lineNum = ln;
			this.#jump_light(cs);

			return false;
		};

		for (; this.#idxToken < this.#script.len; ++this.#idxToken) {
			// トークンの行番号更新
			this.#script.aLNum[this.#idxToken] ||= this.#lineNum; // ??はNaN不可

			const token = this.#script.aToken[this.#idxToken];
			if (token.search(this.#REG_TOKEN_MACRO_END) > -1) {
				++this.#idxToken;
				return false;
			}

			const uc = token.charCodeAt(0);	// TokenTopUnicode
			if (uc === 10) this.#lineNum += token.length;	// \n 改行
			else if (uc === 91) this.#lineNum += (token.match(/\n/g) ?? []).length;	// [ タグ開始
		}
		throw `マクロ[${name}]定義の終端・[endmacro]がありません`;
	}
	#strStepin	= 'call';
	#REGSTEPIN	= /\[(call)\b/;	// https://regex101.com/r/Lk9ASK/1


//	// しおり
	// しおりの読込
	#load(hArg: HArg) {
		if (! ('place' in hArg)) throw 'placeは必須です';
		const place = Number(hArg.place);
		if (('fn' in hArg) !== ('label' in hArg)) throw 'fnとlabelはセットで指定して下さい';

		const mark = this.val.getMark(place);
		if (! mark) throw `place【${place}】は存在しません`;

		return this.#loadFromMark(hArg, mark);
	}
	#loadFromMark(hArg: HArg, mark: IMark, reload_sound = true) {
		this.hTag.clear_event({});
		this.val.mark2save(mark);
		this.val.setMp({});
		this.#layMng.recText('', true);

		if (reload_sound) this.sndMng.playLoopFromSaveObj();

		if (argChk_Boolean(hArg, 'do_rec', true)) this.#mark = {
			hSave	: this.val.cloneSave(),
			hPages	: {...mark.hPages},
			aIfStk	: [...mark.aIfStk],
		}

		const o: HArg = {
			enabled	: this.val.getVal('save:const.sn.autowc.enabled'),
			text	: this.val.getVal('save:const.sn.autowc.text'),
			time	: Number(this.val.getVal('save:const.sn.autowc.time')),
		};
		this.hTag.autowc(o);

		const fn = String(this.val.getVal('save:const.sn.scriptFn'));
		const idx = Number(this.val.getVal('save:const.sn.scriptIdx'));
		this.#aIfStk = [...this.#mark.aIfStk];
		this.#aCallStk = [];

		this.#layMng.cover(true);
		this.#layMng.stopAllTw();
		if ('index' in hArg) {	// #page 用
//console.log(`fn:ScriptIterator.ts \x1b[42mmove!\x1b[49m fn:${hArg.fn ?? fn} idx:${hArg.index ?? idx}`);
			this.#layMng.playback(this.#mark.hPages, ()=> {
				this.#layMng.cover(false);
				this.#skip4page = true;
				this.#jumpWork(hArg.fn ?? fn, '', hArg.index ?? idx);
			});
			return true;
		}

		delete this.#hScript[fn];	// 必ずスクリプトを再読込。吉里吉里に動作を合わせる
		this.#layMng.playback(this.#mark.hPages, 'label' in hArg
			? ()=> {
				this.#layMng.cover(false);
				this.#scriptFn = fn;
				this.#idxToken = idx;
				this.hTag.call({fn: hArg.fn, label: hArg.label});
			}
			: ()=> {
				this.#layMng.cover(false);
				this.#jumpWork(fn, '', idx);
			}
		);

		return true;
	}
	#skip4page = false;
	get skip4page() {return this.#skip4page}

	// スクリプト再読込
	#reload_script(hArg: HArg) {	// 最後の[record_place]から再開
		const mark = this.val.getMark(0);
		// 起動から再読込までの間に追加・変更・削除されたファイルがあるかも、に対応
		//	delete this.hScript[this.#scriptFn];	// これだと[reload_script]位置になる
		delete this.#hScript[getFn(mark.hSave['const.sn.scriptFn'])];

		hArg.do_rec = false;
		return this.#loadFromMark(hArg, mark, false);
	}


	// セーブポイント指定
	#mark: IMark = {
		hSave	: {},
		hPages	: {},
		aIfStk	: [-1],
	};
	#record_place() {
		if (this.main.isDestroyed()) return false;

		const {fn, idx} = this.#nowScrIdx();
		this.val.setVal_Nochk('save', 'const.sn.scriptFn', fn);
		this.val.setVal_Nochk('save', 'const.sn.scriptIdx', idx);
		this.#mark = {
			hSave	: this.val.cloneSave(),
			hPages	: this.#layMng.record(),
			aIfStk	: this.#aIfStk.slice(this.#aCallStk.length),
		};

		return false;
	}
	#nowScrIdx(): {fn: string, idx: number} {
		const len = this.#aCallStk.length;
		if (len === 0) return {
			fn	: this.#scriptFn,
			idx	: this.#idxToken,
		};

		const cs = this.#aCallStk[0];
		return {
			fn	: cs.fn,
			idx	: cs.idx,
		}
	}

	// しおりの保存
	#save(hArg: HArg) {
		if (! ('place' in hArg)) throw 'placeは必須です';
		const place = Number(hArg.place);

		delete hArg[':タグ名'];
		delete hArg.place;
		hArg.text = (hArg.text ?? '').replace(/^(<br\/>)+/, '');
		this.#mark.json = hArg;
		this.val.setMark(place, this.#mark);

		const now_sp = Number(this.val.getVal('sys:const.sn.save.place'));
		if (place === now_sp) this.val.setVal_Nochk('sys', 'const.sn.save.place', now_sp +1);

		return false;
	}


	#aPageLog	: IPageLog[]	= [];
	#posAPageLog	= -1;
	recodePage() {
		this.#skip4page = false;
		if (! this.val.getVal('save:sn.doRecLog')) return;

		const {fn, idx} = this.#nowScrIdx();
		const i = idx -1;
		const key = i +':'+ fn;
		const iPl = this.#aPageLog.findIndex(p=> p.key === key);
		if (iPl > -1) {this.#posAPageLog = iPl; return;}

		const o: IPageLog = {key, fn, idx: i,
			retFn: fn, retIdx: 0, retMark: {...this.#mark},};
		if (this.#posAPageLog >= 0) {
			const pl = this.#aPageLog[this.#posAPageLog];
			o.retFn = pl.fn;
			o.retIdx = pl.idx +1;
		}

		if (++this.#posAPageLog === this.#aPageLog.length) this.#aPageLog.push(o);
		else this.#aPageLog[this.#posAPageLog] = o;
/*
	const st = this.#hScript[fn];
	const tkn = st.aToken[i];
	const lc = this.#cnvIdx2lineCol(st, idx);	// -1不要
console.log(`fn:ScriptIterator.ts recodePage == key=${key} retFn:${o.retFn} retIdx:${o.retIdx} pos:${this.#posAPageLog} = \x1b[45mln:${lc.ln}\x1b[49m col:${lc.col_s +1} == token:${tkn}`);
*/
		// NOTE: 【Node.js】 コンソール(CLI)出力に色や装飾をつける方法 https://note.affi-sapo-sv.com/nodejs-console-color-output.php
	}


	recodeDesign(hArg: HArg) {
		let fn = '';
		let idx = 0;

		const len = this.#aCallStk.length;
		if (hArg.design_unit && len > 0) {
			// デザインモードでこのマクロへの引数変更とするか（内部をサーチさせない）
			const cs = this.#aCallStk[0];
			fn = cs.fn;
			idx = cs.idx;
		}
		else {
			fn = this.#scriptFn;
			idx = this.#idxToken;
		}
		hArg[':path']	= this.#cnvSnPath4Dbg(fn);
		const lc = this.#cnvIdx2lineCol(this.#hScript[fn], idx);
		hArg[':ln']		= lc.ln;
		hArg[':col_s']	= lc.col_s;
		hArg[':col_e']	= lc.col_e;
		const idx_1 = idx -1;
		hArg[':idx_tkn']= idx_1;
		hArg[':token']	= this.#hScript[fn].aToken[idx_1];

		this.sys.send2Dbg('_recodeDesign', hArg);
	}
	replace(idx: number, val: string) {this.#script.aToken[idx] = val;}

}
