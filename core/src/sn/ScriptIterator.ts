/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, uint} from './CmnLib';
import {IHTag, IMain, IVariable, IMark, HArg} from './CmnInterface';
import {Config} from './Config';
import {CallStack, ICallStackArg} from './CallStack';
import {AnalyzeTagArg} from './AnalyzeTagArg';
import {IParse} from './PropParser';

import m_xregexp = require('xregexp');
import {EventMng} from './EventMng';
import { loaders } from 'pixi.js';
import { LayerMng } from './LayerMng';
import { DebugMng } from './DebugMng';
import {SoundMng} from './SoundMng';

interface Script {
	aToken	: string[];		// トークン群
	len		: number;		// トークン数
	aLNum	: number[];		// トークンの行番号
};
interface HScript {
	[name: string]: Script;
};

interface ISeek {
	idx		: number;
	lineNum	: number;
};

export class ScriptIterator {
	private script		: Script	= {aToken: [''], len: 1, aLNum: [1]};

	private scriptFn_	= '';
	get scriptFn(): string {return this.scriptFn_;};
	private idxToken_	= 0;
	get idxToken(): number {return this.idxToken_;};
	subIdxToken(): void {--this.idxToken_;};
	private lineNum_	= 0;
	get lineNum(): number {return this.lineNum_;}
	readonly addLineNum	= (len: number)=> {this.lineNum_ += len;};

	get now_token(): string {return this.script.aToken[this.idxToken_ -1];};


	private aCallStk	: CallStack[]	= [];
	get isEmptyCallStk(): boolean {return this.aCallStk.length == 0;};
	get lenCallStk(): number {return this.aCallStk.length;};
	get lastHArg(): any {return this.aCallStk[this.lenCallStk -1].hArg;};
	readonly getCallStk = (idx: number)=> this.aCallStk[idx].hArg;

	private csAnalyBf	: CallStack		= new CallStack('', 0);


	constructor(private cfg: Config, private hTag: IHTag, private main: IMain, private val: IVariable, private alzTagArg: AnalyzeTagArg, private runAnalyze: ()=> void, private parse: IParse, private sndMng: SoundMng) {
		//	変数操作
		hTag.let_ml		= o=> this.let_ml(o);	// インラインテキスト代入

		// デバッグ・その他
		hTag.dump_stack	= ()=> this.dump_stack();	// スタックのダンプ
		hTag.dump_script= o=> this.dump_script(o);	// スクリプトのダンプ

		// 条件分岐
		hTag['else']	=							// その他ifブロック開始
		hTag.elsif		=							// 別条件のifブロック開始
		hTag.endif		= ()=> this.endif();		// ifブロックの終端
		hTag['if']		= o=> this.if(o);			// ifブロックの開始

		// ラベル・ジャンプ
		//hTag.button	// LayerMng.ts内で定義		// ボタンを表示
		hTag.call		= o=> this.call(o);			// サブルーチンコール
		hTag.jump		= o=> this.jump(o);			// シナリオジャンプ
		hTag.pop_stack	= o=> this.pop_stack(o);	// コールスタック破棄
		hTag.return		= ()=> this.return();		// サブルーチンから戻る

		// マクロ
		hTag.bracket2macro	= o=> this.bracket2macro(o);// 括弧マクロの定義
		hTag.break_macro	= o=> this.break_macro(o);	// マクロから脱出
		hTag.char2macro		= o=> this.char2macro(o);	// 一文字マクロの定義
		hTag.endmacro		= o=> this.break_macro(o);	// マクロ定義の終了
		hTag.macro			= o=> this.macro(o);		// マクロ定義の開始

		// しおり
		//hTag.copybookmark		// Variable.ts内で定義	// しおりの複写
		//hTag.erasebookmark	// Variable.ts内で定義	// しおりの消去
		hTag.load			= o=> this.load(o);			// しおりの読込
		hTag.reload_script	= o=> this.reload_script(o);	// スクリプト再読込
		hTag.record_place	= ()=> this.record_place();	// セーブポイント指定
		hTag.save			= o=> this.save(o);			// しおりの保存


		val.defTmp('const.sn.vctCallStk.length', ()=> this.aCallStk.length);
	}

	private	evtMng	: EventMng;
	private	layMng	: LayerMng;
	setOtherObj(evtMng: EventMng, layMng: LayerMng): void {
		this.evtMng = evtMng;
		this.layMng = layMng;
	}


		//	変数操作
	// インラインテキスト代入
	private let_ml(hArg: HArg) {
		const name = hArg.name;
		if (! name) throw 'nameは必須です';

		const ml = this.script.aToken[++this.idxToken_];
		hArg.text = ml;
		hArg.cast = 'str';
		this.hTag['let'](hArg);
		this.idxToken_ += 2;
		this.lineNum_ += (ml.match(/\n/g) || []).length;

		return false;
	}


	// デバッグ・その他
	// スタックのダンプ
	private dump_stack() {
		if (this.idxToken_ == 0) {
			console.group(`🥟 [dump_stack] スクリプト現在地 fn:${this.scriptFn_} line:${1} col:${0}`);
			console.groupEnd();
			return false;
		}

		const lc0 = this.getScr2lineCol(this.script, this.idxToken_);
		const now = `スクリプト現在地 fn:${this.scriptFn_} line:${lc0.line} col:${lc0.col_s +1}`;
		console.group(`🥟 [dump_stack] ${now}`);
		const len = this.aCallStk.length;
		if (len > 0) {
			console.info(now);
			for (let i=len -1; i>=0; --i) {
				const cs = this.aCallStk[i];
				const lc = this.getScr2lineCol(this.hScript[cs.fn], cs.idx);
				if (! cs.hArg) continue;

				const csa = cs.hArg.hMpVal;
				const from_macro_nm = csa ?csa['タグ名'] :null;
				const call_nm = cs.hArg.タグ名;
				console.info(
					`${len -i}つ前のコール元 fn:${cs.fn} line:${lc.line
					} col:${lc.col_s +1
					}`+ (from_macro_nm ?'（['+ from_macro_nm +']マクロ内）' :' ')+
					`で [${call_nm} ...]をコール`
				);
			}
		}
		console.groupEnd();

		return false;
	}
	private getScr2lineCol(st: Script, idx: number): {line: number, col_s: number, col_e: number} {
		const ret = {line: 0, col_s: 0, col_e: 0};
		if (st == null) return ret;

		const lN = ret.line = st.aLNum[idx -1];
		let col_e = 0;
		let i = idx -1;
		while (st.aLNum[i] == lN) {
			col_e += st.aToken[i].length;
			if (--i < 0) break;
		}
		ret.col_e = col_e;
		ret.col_s = col_e -st.aToken[idx -1].length

		return ret;
	}


	// 外部へスクリプトを表示
	private dump_script(hArg: HArg) {
		const set_fnc = hArg.set_fnc;
		if (! set_fnc) throw 'set_fncは必須です';

		this.fncSet = (window as any)[set_fnc];
		if (! this.fncSet) {
			if (CmnLib.argChk_Boolean(hArg, 'need_err', true)) throw `HTML内に関数${set_fnc}が見つかりません`;
			this.fncSet = ()=> {};
			return false;
		}

		this.noticeBreak = (set: boolean)=> {
			if (this.fnLastBreak != this.scriptFn_) {
				this.fnLastBreak = this.scriptFn_;
				this.fncSet(
					this.hScrCache4Dump[this.scriptFn_]
					=  this.hScrCache4Dump[this.scriptFn_]
					|| this.script.aToken.join(''));
			}
			this.fncBreak(this.lineNum_, set);
		};
		this.noticeBreak(true);	// 一度目のthis.fncBreak()はスルー（まだ読んでないし）

		const break_fnc = hArg.break_fnc;
		if (! break_fnc) return false;

		this.fncBreak = (window as any)[break_fnc];
		if (! this.fncBreak) {
			if (CmnLib.argChk_Boolean(hArg, 'need_err', true)) throw `HTML内に関数${break_fnc}が見つかりません`;
			this.fncBreak = ()=> {};
		}

		return false;
	}
	private fncSet: (txt: string)=> void = ()=> {};
	private fncBreak: (line: number, set: boolean)=> void = ()=> {};
	private fnLastBreak = '';
	private hScrCache4Dump: {[name: string]: string;} = {};
	noticeBreak = (_set: boolean)=> {}


	private dumpErrLine = 5;
	dumpErrForeLine() {
		if (this.idxToken_ == 0) {
			console.group(`🥟 Error line (from 0 rows before) fn:${this.scriptFn_}`);
			console.groupEnd();
			return;
		}

		let s = '';
		for (let i=this.idxToken_ -1; i>=0; --i) {
			s = this.script.aToken[i] + s;
			if ((s.match(/\n/g) || []).length >= this.dumpErrLine) break;
		}
		const a = s.split('\n').slice(-this.dumpErrLine);
		const len = a.length;
		console.group(`🥟 Error line (from ${len} rows before) fn:${this.scriptFn_}`);
		const ln_txt_width = String(this.lineNum_).length;
		const lc = this.getScr2lineCol(this.script, this.idxToken_);
		for (let i=0; i<len; ++i) {
			const ln = this.lineNum_ -len +i +1;
			const mes = `${String(ln).padStart(ln_txt_width, ' ')}: %c`;
			const e = a[i];
			const line = (e.length > 75) ?e.substr(0, 75) +'…' :e;	// 長い場合は後略
			if (i == len -1) console.info(
				mes + line.slice(0, lc.col_s) +'%c'+ line.slice(lc.col_s),
				'background-color: skyblue;', 'background-color: pink;'
			)
			else console.info(mes + line, 'background-color: skyblue;');
		}
		console.groupEnd();
		//console.log('Linkの出力   : %o', 'file:///Volumes/MacHD2/_Famibee/SKYNovel/prj/mat/main.sn');
	}



		// 条件分岐
	private aIfStk	: number[]	= [-1];
	private endif() {
		if (this.aIfStk[0] == -1) throw 'ifブロック内ではありません';

		this.idxToken_ = this.aIfStk[0];
		this.lineNum_ =  this.script.aLNum[this.idxToken_ -1];
		this.aIfStk.shift();

		return false;
	}
	private if(hArg: HArg) {
		//console.log('if idxToken:'+ this.idxToken_);
		const exp = hArg.exp;
		if (! exp) throw 'expは必須です';
		if (exp.charAt(0) == '&') throw '属性expは「&」が不要です';

		let cntDepth = 0;		// if深度カウンター
		let	idxGo = this.parse(exp) ?this.idxToken_ :-1;
		for (; this.idxToken_<this.script.len; ++this.idxToken_) {
			if (! this.script.aLNum[this.idxToken_]) this.script.aLNum[this.idxToken_] = this.lineNum_;
			const t = this.script.aToken[this.idxToken_];
			//console.log(`[if]トークン fn:${this.scriptFn_} lnum:${this.lineNum_} idx:${this.idxToken_} realLn:${this.script.aLNum[this.idxToken_]} idxGo:${idxGo} cntDepth:${cntDepth} token<${t}>`);
			if (! t) continue;

			const uc = t.charCodeAt(0);	// TokenTopUnicode
			if (uc == 10) {this.addLineNum(t.length); continue;}	// \n 改行
			if (uc != 91) continue;		// [ タグ開始以外

			const a_tag: any = m_xregexp.exec(t, CmnLib.REG_TAG);
			if (a_tag == null) throw 'タグ記述['+ t +']異常です(if文)';
			const tag_name = a_tag['name'];
			if (! (tag_name in this.hTag)) throw '未定義のタグ['+ tag_name +']です';
			if (! this.alzTagArg.go(a_tag['args'])) throw '属性「'+ this.alzTagArg.literal +'」は異常です';

			switch (tag_name) {
			case 'if':	++cntDepth; break;

			case 'elsif':
				if (cntDepth > 0) break;
				if (idxGo > -1) break;

				const e = this.alzTagArg.hPrm['exp'].val;
				if (e.charAt() == '&') throw '属性expは「&」が不要です';
				if (this.parse(e)) idxGo = this.idxToken_ +1;
				break;

			case 'else':
				if (cntDepth > 0) break;
				if (idxGo == -1) idxGo = this.idxToken_ +1;
				break;

			case 'endif':
				if (cntDepth > 0) {--cntDepth; break;}
				if (idxGo == -1) {
					++this.idxToken_;
					this.script.aLNum[this.idxToken_] = this.lineNum_;
				}
				else {
					this.aIfStk.unshift(this.idxToken_ +1);
					this.idxToken_ = idxGo;
					this.lineNum_ =  this.script.aLNum[this.idxToken_];
				}
				return false;
			}
		}
		throw '[endif]がないままスクリプト終端です';
		//return false;
	}


		// ラベル・ジャンプ
	// サブルーチンコール
	private call(hArg: HArg) {
		if (! CmnLib.argChk_Boolean(hArg, 'count', false)) this.eraseKidoku();

		const fn = hArg.fn;
		//console.log('\t[call] fn:'+ fn);
		if (fn) this.cfg.searchPath(fn, Config.EXT_SCRIPT);	// chk only
		const hPushArg: ICallStackArg = {
			csAnalyBf	: this.csAnalyBf,
			hEvt1Time	: this.evtMng.popLocalEvts()
		};
		if (this.fncReserveToken != null) {
			hPushArg.strReserveToken = this.fncReserveToken();
			this.fncReserveToken = null;
		}
		this.pushCallStack(hPushArg);
		this.fncReserveToken = null;
		this.aIfStk.unshift(-1);

		if (CmnLib.argChk_Boolean(hArg, 'clear_local_event', false)) this.hTag.clear_event({});
		this.jumpWork(fn, hArg.label);

		return true;
	}

	// シナリオジャンプ
	private jump(hArg: HArg) {
		if (! CmnLib.argChk_Boolean(hArg, 'count', true)) this.eraseKidoku();

		this.aIfStk[0] = -1;
		this.jumpWork(hArg.fn, hArg.label);

		return true;
	}

	// コールスタック破棄
	private pop_stack(hArg: HArg) {
		if (CmnLib.argChk_Boolean(hArg, 'clear', false)) {
			while (this.aCallStk.length > 0) this.aCallStk.pop();
		}
		else {
			if (this.aCallStk.length == 0) throw'[pop_stack] スタックが空です';
			this.aCallStk.pop();
		}
		this.fncReserveToken = null;
		this.aIfStk = [-1];

		return false;
	}

	// サブルーチンから戻る
	private return() {
		if (this.aCallStk.length == 0) throw'[return] スタックが空です';
		const cs = this.aCallStk.pop();		// cs != nullはcall()で保証
		const osac = cs!.hArg!.csAnalyBf;	// cs.hArg != nullはcall()で保証
		if (osac) this.csAnalyBf = new CallStack(osac.fn, osac.idx);
		this.aIfStk.shift();

		const after_token = cs!.hArg!.strReserveToken;
		if (after_token) this.fncReserveToken = ()=> {
			this.fncReserveToken = null;
			return after_token;
		};
		else this.fncReserveToken = null;
		if (cs!.hArg!.hEvt1Time) this.evtMng.pushLocalEvts(cs!.hArg!.hEvt1Time);

		//	lineNum = hScrTokens[cs.fn].tokens.aLNum[cs.idx -1];
		// 上のを下に分解。通常は不要なチェックだが、[load fn= label=]文法用に。
		const oscr = this.hScript[cs!.fn];
		if (! oscr) {
			this.jumpWork(cs!.fn, '', cs!.idx);
			return true;	// 確実にスクリプトロードなので
		}
		this.lineNum_ = oscr.aLNum[cs!.idx -1];

		this.jump_light(cs!.fn, cs!.idx);

		return false;
	}


	private skipLabel = '';
	private jumpWork(fn = '', label = '', idx = 0) {
		if (! fn && ! label) this.main.errScript('[jump系] fnまたはlabelは必須です');
		this.skipLabel = label || '';
		if (this.skipLabel && this.skipLabel.charAt(0) != '*') {
			this.main.errScript('[jump系] labelは*で始まります');
		}
		this.idxToken_	= idx;

		if (! fn) {this.analyzeInit(); return;}

		const full_path = this.cfg.searchPath(fn, Config.EXT_SCRIPT);// chk only
		if (fn == this.scriptFn_) {this.analyzeInit(); return;}
		this.scriptFn_ = fn;
		const st = this.hScript[this.scriptFn_];
		if (st) {this.script = st; this.analyzeInit(); return;}

		//include 'addition_script.as';

		if (this.onlyCodeScript && (full_path.substr(-1) != '_')) {
			this.main.errScript('[セキュリティ] 最初のスクリプトが暗号化だったため、以降は暗号化スクリプト以外許されません');
		}

		const ldr = new loaders.Loader;
		ldr.add(this.scriptFn_, this.cfg.searchPath(this.scriptFn_, Config.EXT_SCRIPT));
		ldr.load((_loader: any, res: any)=> {
			if (res.error) throw 'Main: config.anprj ロード失敗('+ res.error +')です'

			this.resolveScript(res[this.scriptFn_].data);
			this.hTag.record_place({});
			this.main.resume(()=> this.analyzeInit());
				// 直接呼んでもいいのだが、内部コールスタック積んだままになるのがなんかイヤで
		});
		this.main.stop();
	}
	private onlyCodeScript	= false;
	private analyzeInit(): void {
		const o = this.seekScript(this.script, Boolean(this.val.getVal('mp:const.sn.macro_name')), this.lineNum_, this.skipLabel, this.idxToken_);
		this.idxToken_	= o.idx;
		this.lineNum_	= o.lineNum;
		this.runAnalyze();
	}


	private	readonly	REG_NONAME_LABEL		= /(\*{2,})(.*)/;
	private	readonly	REG_LABEL_ESC			= /\*/g;
	private	readonly	REG_TOKEN_MACRO_BEGIN	= /\[macro\s/;
	private	readonly	REG_TOKEN_MACRO_END		= /\[endmacro[\s\]]/;
	private	seekScript(tokens: Script, inMacro: boolean, lineNum: number, skipLabel: string, idxToken: number): ISeek {
		//console.log('seekScript (from)inMacro:'+ inMacro +' (from)lineNum:'+ lineNum +' (to)skipLabel:'+ skipLabel +': (to)idxToken:'+ idxToken);
		const len = this.script.aToken.length;
		if (! skipLabel) {
			if (idxToken >= len) DebugMng.myTrace('[jump系] 内部エラー idxToken:'+ idxToken +' は、最大トークン数:'+ len +'を越えます', 'ET');
			if (! tokens.aLNum[idxToken]) {	// undefined
				lineNum = 1;
				for (let j=0; j<idxToken; ++j) {
					// 走査ついでにトークンの行番号も更新
					if (! tokens.aLNum[j]) tokens.aLNum[j] = lineNum;

					const token_j = this.script.aToken[j];
					if (token_j.charCodeAt(0) == 10) {	// \n 改行
						lineNum += token_j.length;
					}
				}
				tokens.aLNum[idxToken] = lineNum;
			}
			else {
				lineNum = tokens.aLNum[idxToken];
			}

			return {
				idx: idxToken,
				lineNum	: lineNum
			}
		}

		let i = 0;
		tokens.aLNum[0] = 1;		// 先頭トークン＝一行目
		const a_skipLabel = skipLabel.match(this.REG_NONAME_LABEL);
		if (a_skipLabel) {
			const base_skipLabel = skipLabel;
			skipLabel = a_skipLabel[1];
			switch (a_skipLabel[2]) {
			case 'before':
				while (tokens.aLNum[i] != lineNum) ++i;	// 前から起点探し
				while (this.script.aToken[i] != skipLabel) {
					if (i == 0) DebugMng.myTrace('[jump系 無名ラベルbefore] '
						+ lineNum +'行目以前で'+ (inMacro ?'マクロ内に' :'')
						+ 'ラベル【'+ skipLabel +'】がありません', 'ET');
					if (inMacro && this.script.aToken[i].search(this.REG_TOKEN_MACRO_BEGIN) > -1) DebugMng.myTrace('[jump系 無名ラベルbefore] マクロ内にラベル【'+ skipLabel +'】がありません', 'ET');
					--i;
				}
				return {
					idx: i +1,
					lineNum	: tokens.aLNum[i]
				}	//	break;

			case 'after':
				i = len -1;
				while (tokens.aLNum[i] != lineNum) --i;	// 後ろから起点探し
				if (! inMacro) break;

				while (this.script.aToken[i] != skipLabel) {
					if (i == len) DebugMng.myTrace('[jump系 無名ラベルafter] '
						+ lineNum +'行目以後でマクロ内にラベル【'+ skipLabel +'】がありません', 'ET');
					if (this.script.aToken[i].search(this.REG_TOKEN_MACRO_END) > -1) DebugMng.myTrace('[jump系 無名ラベルafter] '
						+ lineNum +'行目以後でマクロ内にラベル【'+ skipLabel +'】がありません', 'ET');
					++i;
				}
				return {
					idx: i +1,
					lineNum	: tokens.aLNum[i]
				}	//	break;

			default:
				DebugMng.myTrace('[jump系] 無名ラベル指定【label='+ base_skipLabel +'】が間違っています', 'ET');
			}
		}

		lineNum = 1;
		const reLabel = new RegExp(
			'^'+ skipLabel.replace(this.REG_LABEL_ESC, '\\*')
			+'(?:\\s|;|\\[|$)');
		let in_let_ml = false;
		for (let i=0; i<len; ++i) {
			// 走査ついでにトークンの行番号も更新
			if (! tokens.aLNum[i]) tokens.aLNum[i] = lineNum;

			const token = this.script.aToken[i];
			const uc = token.charCodeAt(0);	// TokenTopUnicode
			if (uc != 42) {	// 42 = *
				if (in_let_ml) {
					this.REG_TAG_ENDLET_ML.lastIndex = 0;
					if (this.REG_TAG_ENDLET_ML.test(token)) {
						in_let_ml = false;
						continue;
					}
					lineNum += (token.match(/\n/g) || []).length;	// \n 改行
				}
				else {
					this.REG_TAG_LET_ML.lastIndex = 0;
					if (this.REG_TAG_LET_ML.test(token)) {
						in_let_ml = true;
						continue;
					}
					if (uc == 10) lineNum += token.length;	// \n 改行
				}
				continue;
			}

			if (token.search(reLabel) > -1) return {
				idx: i +1,
				lineNum	: lineNum
			}	//	break;
		}
		if (in_let_ml) throw '[let_ml]の終端・[endlet_ml]がありません';

		DebugMng.myTrace(`[jump系] ラベル【`+ skipLabel +`】がありません`, 'ET');
		throw 'Dummy';
	}

	private hScript		: HScript	= {};	// シナリオキャッシュ
	private	readonly REG_TAG_LET_ML		= m_xregexp(`^\\[let_ml\\s`, 'g');
	private	readonly REG_TAG_ENDLET_ML	= m_xregexp(`^\\[endlet_ml\\s*]`, 'g');
	private resolveScript(txt: string) {
		txt = txt.replace(/(\r\n|\r)/g, '\n');
		const v = CmnLib.cnvMultilineTag(txt).match(CmnLib.REG_TOKEN);
		if (! v) throw 'CmnLib.cnvMultilineTag fail';
		for (let i=v.length -1; i>=0; --i) {
			const e = v[i];
			this.REG_TAG_LET_ML.lastIndex = 0;
			if (this.REG_TAG_LET_ML.test(e)) {
				const idx = e.indexOf(']') +1;
				if (idx == 0) throw '[let_ml]で閉じる【]】がありません';
				const a = e.slice(0, idx);
				const b = e.slice(idx);
				v.splice(i, 1, a, b);
			}
		}
		this.script = {aToken :v, len :v.length, aLNum :[]};

		let mes = '';
		try {
			mes = 'ScriptIterator.replaceScriptChar2macro';
			if (this.hC2M) this.replaceScriptChar2macro_And_let_ml();
			mes = 'ScriptIterator.replaceScript_Wildcard';
			this.replaceScript_Wildcard();
		}
		catch (err) {
			if (err instanceof Error) {
				const e = err as Error;
				mes += '例外 mes='+ e.message +'('+ e.name +')';
			}
			else {
				mes = err as string;
			}
			this.main.errScript(mes, false);
		}
		this.hScript[this.scriptFn_] = this.script;

		this.val.loadScrWork(this.scriptFn_);
	}

	private jump_light(fn: string, idx: number) {
		// jumpでは連続マクロでスタックオーバーフローになるので簡易版を
		// 主に[return]やマクロ終了でジャンプ先がチェック不要な場合用
		// analyzeInit()とかもジャンプ前にやってて不要だし
		this.scriptFn_	= fn;
		this.idxToken_	= idx;
		const st = this.hScript[this.scriptFn_];
		if (st != null) this.script = st;
	}


	private	readonly REG_WILDCARD	= /^\[(call|loadplugin)\s/;
	private	readonly REG_WILDCARD2	= /\bfn\s*=\s*[^\s\]]+/;
			// Unit testの為publicにする
	private replaceScript_Wildcard = ()=> {
		for (let i=this.script.len -1; i>=0; --i) {
			const token = this.script.aToken[i];
			this.REG_WILDCARD.lastIndex = 0;
			if (! this.REG_WILDCARD.test(token)) continue;

			const a_tag: any = m_xregexp.exec(token, CmnLib.REG_TAG);
			if (! this.alzTagArg.go(a_tag['args'])) continue;

			const p_fn = this.alzTagArg.hPrm['fn'];
			if (! p_fn) continue;
			const fn = p_fn.val;
			if (! fn || fn.substr(-1) != '*') continue;

			//console.log('* fn:'+ fn);
			const ext = a_tag['name'] == 'loadplugin' ?'swf' :'sn';
			const a = this.cfg.matchPath('^'+ fn.slice(0, -1) +'.*', ext);
			//console.log('* a:%o', a);
			const lnum = this.script.aLNum[i];
			this.script.aToken.splice(i, 1, '\t', '; '+ token);
			this.script.aLNum.splice(i, 1, lnum, lnum);

			for (const v of a) {
				const nt = token.replace(
					this.REG_WILDCARD2,
					'fn='+ decodeURIComponent(CmnLib.getFn(v[ext]))
				);
				//console.log('\t='+ nt +'=');
				this.script.aToken.splice(i, 0, nt);
				this.script.aLNum.splice(i, 0, lnum);
			}
		}
		this.script.len = this.script.aToken.length;
	}

	private hC2M	: {[char: string]: string};
	private replaceScriptChar2macro_And_let_ml = (start_idx = 0): void => {
		for (let i=this.script.len- 1; i >= start_idx; --i) {
			const token = this.script.aToken[i];
			this.REG_TAG_LET_ML.lastIndex = 0;
			if (this.REG_TAG_LET_ML.test(token)) {
				const idxSpl = token.indexOf(']') +1;
				const ml = token.slice(idxSpl);
				const cnt = (ml.match(/\n/g) || []).length;
				this.script.aToken.splice(i, 1, token.slice(0, idxSpl), ml);
				this.script.aLNum.splice(i, 0, this.script.aLNum[i]);
				const len = this.script.aToken.length;
				for (let j=i +2; j<len; ++j) this.script.aLNum[j] += cnt;
				continue;
			}
			CmnLib.REG_TOKEN_NOTXT.lastIndex = 0;
			if (CmnLib.REG_TOKEN_NOTXT.test(token.charAt(0))) continue;

			const lnum = this.script.aLNum[i];
			const a = token.match(this.regC2M);
			if (! a) continue;
			const len = a.length -1;
			let del = 1;
			for (let j=len; j>=0; --j) {
				let ch = a[j];
				const macro = this.hC2M[ch.charAt(0)];
				if (macro) {
					ch = macro +((macro.substr(-1) == ']')
						? ''
						: (`'${ch.slice(1, -1)}']`));
					// 文字列は半角空白を意識して''で囲むが、いずれ変えたい場合がある？
				}
				this.script.aToken.splice(i, del, ch);

				this.script.aLNum.splice(i, del, lnum);
				del = 0;
			}
		}
		this.script.len = this.script.aToken.length;
	}
	private regC2M	: RegExp	= new RegExp('');

	// シナリオ解析処理ループ・冒頭処理
	private fncReserveToken	: {(): string} | null	= null;
	runAnalyzeSub() {
		if (this.fncReserveToken != null) return this.fncReserveToken();

		if (this.idxToken_ == this.script.len) this.main.errScript('スクリプト終端です  idxToken:' + this.idxToken_ + ' this.tokens.aToken.length:' + this.script.aToken.length);

		this.recordKidoku();

		// トークンの行番号更新
		if (! this.script.aLNum[this.idxToken_]) this.script.aLNum[this.idxToken_] = this.lineNum_;
		const token = this.script.aToken[this.idxToken_];
		//console.log(`🌱 fn:${this.scriptFn_} idxToken:${this.idxToken_} lineNum:${this.lineNum} token【${token}】`);
		this.main.stop();
		++this.idxToken_;

		return token;
	}


	private recordKidoku(): void {
		const areas = this.val.getAreaKidoku(this.scriptFn_);
		if (! areas) throw `recordKidoku fn:'${this.scriptFn_}' (areas == null)`;

		// マクロ内やサブルーチンではisKidokuを変更させない
		if (this.aCallStk.length > 0) {areas.record(this.idxToken_); return;}

		this.isKidoku_ = areas.search(this.idxToken_);
		this.val.setVal_Nochk('tmp', 'const.sn.isKidoku', this.isKidoku_);
		if (this.isKidoku_) return;

		areas.record(this.idxToken_);
		// saveKidoku()
			// 厳密にはここですべきだが、パフォーマンスに問題があるので
			// クリック待ちを期待できるwait、waitclick、s、l、pタグで
			// saveKidoku()をコール。
	}
	private isKidoku_	= false;
	get isKidoku(): boolean {return this.isKidoku_;};
	private eraseKidoku(): void {
		const areas = this.val.getAreaKidoku(this.scriptFn_);
		if (areas) areas.erase(this.idxToken_);
		this.isKidoku_ = false;
	}
	get isNextKidoku(): boolean {
		let fn	= this.scriptFn;
		let idx	= this.idxToken;
		let len	= this.script.len;
		if (this.aCallStk.length > 0) {
			const cs = this.aCallStk[0];
			fn  = cs.fn;
			idx = cs.idx;
			const st = this.hScript[fn];
			if (st != null) len = st.len;
		}

		const areas = this.val.getAreaKidoku(fn);
		if (! areas) return false;
		if (idx == len) return false;	// スクリプト終端

		//traceDbg("isNextKidoku fn:"+ fn +" idx:"+ idx +" ret="+ (areas.search(idx)));
		//traceDbg("【"+ vctT[idx-1] +"】【"+ vctT[idx] +"】");

		return areas.search(idx);
	}


	private pushCallStack(hArg: ICallStackArg): void {
		this.aCallStk.push(new CallStack(this.scriptFn_, this.idxToken_, hArg));
	}

	get normalWait(): number {
		return this.isKidoku_
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


		// マクロ
	// 括弧マクロの定義
	private bracket2macro(hArg: HArg) {
		const name = hArg.name;
		if (! name) throw '[bracket2macro] nameは必須です';
		const text = hArg.text;
		if (! text) throw '[bracket2macro] textは必須です';
		if (text.length != 2) throw '[bracket2macro] textは括弧の前後を示す二文字を指定してください';

		this.hC2M = this.hC2M || {};

		const op = text.charAt(0);
		const cl = text.charAt(1);
		if (op in this.hC2M) throw '[bracket2macro] text【'+ op +'】が登録済みの括弧マクロまたは一文字マクロです';
		if (cl in this.hC2M) throw '[bracket2macro] text【'+ cl +'】が登録済みの括弧マクロまたは一文字マクロです';
		this.REG_CANTC2M.lastIndex = 0;
		if (this.REG_CANTC2M.test(op)) throw '[bracket2macro] text【'+ op +'】は括弧マクロに使用できない文字です';
		this.REG_CANTC2M.lastIndex = 0;
		if (this.REG_CANTC2M.test(cl)) throw '[bracket2macro] text【'+ cl +'】は括弧マクロに使用できない文字です';

		this.hC2M[cl] = '0';	// チェック用ダミー
		this.hC2M[op] = '['+ name +' text=';

		this.regStrC2M += '\\'+ op +'[^\\'+ cl +']*\\'+ cl +'|';
		this.regStrC2M4not += '\\'+ op +'\\'+ cl;
		this.regC2M = new RegExp('('+ this.regStrC2M +'[^'+ this.regStrC2M4not +']+)', 'g');

		this.replaceScriptChar2macro_And_let_ml(this.idxToken_);

		return false;
	}

	private	readonly REG_CANTC2M	= /[\w\s;[\]*=&｜《》]/;
	private regStrC2M			= '';
	private regStrC2M4not		= '';

	// マクロから脱出
	private break_macro(hArg: HArg) {
		const len = this.aCallStk.length;
		if (len == 0) throw '[endmacro] マクロ外で呼ばれました';

		// cs.hArg != nullはcall()で保証
		const hPopArg = this.aCallStk[len -1].hArg!.hMpVal;
		if (hPopArg) this.val.setMp(hPopArg);

		return this.hTag['return'](hArg);
	}

	// 一文字マクロの定義
	private char2macro(hArg: HArg) {
		this.hC2M = this.hC2M || {};

		const char = hArg.char;
		if (! char) throw '[char2macro] charは必須です';
		if (char in this.hC2M) throw '[char2macro] char【'+ char +'】が登録済みの括弧マクロまたは一文字マクロです';
		this.REG_CANTC2M.lastIndex = 0;
		if (this.REG_CANTC2M.test(char)) throw '[char2macro] char【'+ char +'】は一文字マクロに使用できない文字です';

		const name = hArg.name;
		if (! name) throw '[char2macro] nameは必須です';
		if (! (name in this.hTag)) throw '[char2macro] 未定義のタグ又はマクロ['+ name +']です';

		this.hC2M[char] = '['+ name +']';

		this.regStrC2M += '\\'+ char +'|';
		this.regStrC2M4not += '\\'+ char;
		this.regC2M = new RegExp('('+ this.regStrC2M +'[^'+ this.regStrC2M4not +']+)', 'g');

		this.replaceScriptChar2macro_And_let_ml(this.idxToken_);

		return false;
	}

	// マクロ定義の開始
	private macro(hArg: HArg) {
		const name = hArg.name;
		if (! name) throw 'nameは必須です';
		//if (hScopeVal.mp['const.sn.macro_name']) throw '[macro] マクロ内で[macro]義禁止です');

		if (name in this.hTag) {	// 重複定義エラー
			const o = this.hTagInf[name];
			if (! o) throw 'すでに定義済みのタグ['+ name +']です';
			//if (o.by == 'macro')
			throw 'すでに '+ o.fn +'.sn にて定義済みのマクロ['+ name +']です';
			//if (o.by == 'plugin')
			//throw ' すでに plugin( '+ o.fn +' ) にて定義済みのマクロ['+ name +']です';
		}

		const cs = new CallStack(this.scriptFn_, this.idxToken_);
		const ln = this.lineNum_;
		this.hTag[name] = hArg=> {
			const hPushArg: any = {...hArg};
			hPushArg.hMpVal = this.val.cloneMp();

			if (this.fncReserveToken != null) {
				hPushArg.strReserveToken = this.fncReserveToken();
				this.fncReserveToken = null;
			}
			this.pushCallStack(hPushArg);
			this.aIfStk.unshift(-1);

			// AIRNovelの仕様：親マクロが子マクロコール時、*がないのに値を引き継ぐ
			//for (const k in hArg) this.val.setVal_Nochk('mp', k, hArg[k]);
			this.val.setMp(hArg);
			this.val.setVal_Nochk('mp', 'const.sn.macro_name', name);
			this.val.setVal_Nochk('mp', 'const.sn.me_call_scriptFn', this.scriptFn_);

			this.lineNum_ = ln;
			const keep_cs = cs;
			this.jump_light(keep_cs.fn, keep_cs.idx);

			return false;
		};
		this.hTagInf[name] = {by: 'macro', fn: this.scriptFn_};

		for (; this.idxToken_ < this.script.len; ++this.idxToken_) {
			// トークンの行番号更新
			if (! this.script.aLNum[this.idxToken_]) this.script.aLNum[this.idxToken_] = this.lineNum_;

			const token = this.script.aToken[this.idxToken_];
			if (token.search(this.REG_TOKEN_MACRO_END) > -1) {
				++this.idxToken_;
				return false;
			}

			if (token.charCodeAt(0) == 10) this.lineNum_ += (token.match(/\n/g) || []).length;
		}
		throw 'マクロ'+ name +'定義の終端・[endmacro]がありません';
	}
	private hTagInf	: any	= {};	// タグ/マクロ情報


		// しおり
	// しおりの読込
	private load(hArg: HArg) {
		const place = hArg.place;
		if (! place) throw 'placeは必須です';
		if (('fn' in hArg) != ('label' in hArg)) throw 'fnとlabelはセットで指定して下さい';

		const mark = this.val.getMark(place);
		if (! mark) throw `place【${place}】は存在しません`;

		return this.loadFromMark(hArg, mark);
	}
	private loadFromMark(hArg: HArg, mark: IMark, reload_sound = true) {
		this.layMng.cover(true);
		this.hTag.clear_event({});
		this.val.mark2save(mark);

		if (reload_sound) this.sndMng.playLoopFromSaveObj();

		if (CmnLib.argChk_Boolean(hArg, 'do_rec', true)) this.mark = {
			hSave	: this.val.cloneSave(),
			hPages	: {...mark.hPages},
			aIfStk	: [...mark.aIfStk],
		}

		const fn = String(this.val.getVal('save:const.sn.scriptFn'));
		const idx = Number(this.val.getVal('save:const.sn.scriptIdx'));
		delete this.hScript[fn];	// 必ずスクリプトを再読込。吉里吉里に動作を合わせる
		this.aIfStk = [...this.mark.aIfStk];
		this.aCallStk = [];
		this.layMng.playback(this.mark.hPages, 'label' in hArg
			? ()=> {
				this.layMng.cover(false);
				this.scriptFn_ = fn;
				this.idxToken_ = idx;
				this.csAnalyBf = new CallStack('', 0);
				this.hTag.call({fn: hArg.fn, label: hArg.label});
			}
			: ()=> {
				this.layMng.cover(false);
				this.jumpWork(fn, '', idx);
			}
		);

		return true;
	}

	// スクリプト再読込
	private reload_script(hArg: HArg) {	// 最後の[record_place]から再開
		const mark = this.val.getMark(0);
		// 起動から再読込までの間に追加・変更・削除されたファイルがあるかも、に対応
		//	delete this.hScript[this.scriptFn_];	// これだと[reload_script]位置になる
		delete this.hScript[CmnLib.getFn(mark.hSave['const.sn.scriptFn'])];

	//	CmnLib.setSearchPath(MainThread.xmlConfig);	// TODO: 後々にはこれもリロード

		hArg.do_rec = false;
		return this.loadFromMark(hArg, mark, false);
	}


	// セーブポイント指定
	private	mark: IMark = {
		hSave	: {},
		hPages	: {},
		aIfStk	: [-1],
	};
	private record_place() {
		if (this.main.isDestroyed()) return false;

		if (this.aCallStk.length == 0) {
			this.val.setVal_Nochk('save', 'const.sn.scriptFn', this.scriptFn);
			this.val.setVal_Nochk('save', 'const.sn.scriptIdx', this.idxToken);
		}
		else {
			this.val.setVal_Nochk('save', 'const.sn.scriptFn', this.aCallStk[0].fn);
			this.val.setVal_Nochk('save', 'const.sn.scriptIdx', this.aCallStk[0].idx);
		}
		this.mark = {
			hSave	: this.val.cloneSave(),
			hPages	: this.layMng.record(),
			aIfStk	: this.aIfStk.slice(this.aCallStk.length),
		};

		return false;
	}

	// しおりの保存
	private save(hArg: HArg) {
		const place = hArg.place;
		if (! place) throw 'placeは必須です';
		delete hArg.タグ名;
		delete hArg.place;

		this.mark.json = hArg;
		this.val.setMark(place, this.mark);

		return false;
	}

}
