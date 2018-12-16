/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, IHTag, uint, IMain, IVariable, getDateStr} from './CmnLib';
import {Areas} from './Areas';
import {Config} from './Config';
import {CallStack} from './CallStack';
import {AnalyzeTagArg} from './AnalyzeTagArg';
import {IParse} from './PropParser';

import m_xregexp = require('xregexp');
import {EventMng} from './EventMng';
import { loaders } from 'pixi.js';
import { LayerMng } from './LayerMng';
import { DebugMng } from './DebugMng';

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
	addLineNum	= len=> {this.lineNum_ += len;};

	get now_token(): string {return this.script.aToken[this.idxToken_ -1];};


	private vctCallStk	: CallStack[]	= [];
	get isEmptyCallStk(): boolean {return this.vctCallStk.length == 0;};
	get lenCallStk(): number {return this.vctCallStk.length;};
	get lastHArg(): any {return this.vctCallStk[this.lenCallStk -1].hArg;};
	getCallStk = (idx: number)=> this.vctCallStk[idx].hArg;

	private csAnalyBf	: CallStack		= new CallStack('', 0);


	private	hAreaKidoku	: {[name: string]: Areas}	= {};
	private hByteKidoku	: any		= null;

	private isKidoku_	= false;
	get isKidoku(): boolean {return this.isKidoku_;};


	constructor(private cfg: Config, private hTag: IHTag, private main: IMain, private val: IVariable, private alzTagArg: AnalyzeTagArg, private fncLoaded: ()=> void, private parse: IParse) {
		//	変数操作
		hTag.let_ml		= o=> this.let_ml(o);	// インラインテキスト代入

		// デバッグ・その他
		hTag.dump_stack	= ()=> this.dump_stack();	// スタックのダンプ
		hTag.dump_script= o=> this.disp_script(o);	// スクリプトのダンプ

		// 条件分岐
		hTag['else']	=						// その他ifブロック開始
		hTag.elsif		=						// 別条件のifブロック開始
		hTag.endif		= ()=> this.endif();	// ifブロックの終端
		hTag['if']		= o=> this.if(o);		// ifブロックの開始

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
		hTag.copybookmark	= o=> this.copybookmark(o);	// しおりの複写
		hTag.erasebookmark	= o=> this.erasebookmark(o);// しおりの消去
		hTag.load			= o=> this.load(o);			// しおりの読込
		hTag.record_place	= o=> this.record_place(o);	// セーブポイント指定
		hTag.save			= o=> this.save(o);			// しおりの保存


//		this.hByteKidoku = soSys.data.kidoku;
		this.hByteKidoku = {};
		for (const fn in this.hByteKidoku) {
			const areas = new Areas();
			areas.hAreas = {...this.hByteKidoku[fn]};
			this.hAreaKidoku[fn] = areas;
		}

		val.defTmp('const.sn.vctCallStk.length', ()=> this.vctCallStk.length);
		this.flush = val.flush;
	}
	private flush	= () =>{};

	private	evtMng	: EventMng | null	= null;
	private	layMng	: LayerMng | null	= null;
	setOtherObj(evtMng: EventMng, layMng: LayerMng): void {
		this.evtMng = evtMng;
		this.layMng = layMng;
	};


		//	変数操作
	// インラインテキスト代入
	private let_ml(hArg) {
		const name = hArg.name;
		if (! name) throw 'nameは必須です';
		if (this.idxToken_ +1 >= this.script.len ||
			! this.REG_TAG_ENDLET_ML.test(this.script.aToken[this.idxToken_ +1])
		) throw '[let_ml]の終端・[endlet_ml]がありません';

		const ml = this.script.aToken[this.idxToken_];
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
		const len = this.vctCallStk.length;
		if (len > 0) {
			console.info(now);
			for (let i=len -1; i>=0; --i) {
				const cs = this.vctCallStk[i];
				const lc = this.getScr2lineCol(this.hScript[cs.fn], cs.idx);
				const csa = cs.hArg['const.sn.hMpVal'];
				const from_macro_nm = csa ?csa['タグ名'] :null;
				const call_nm = cs.hArg['タグ名'];
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
	private disp_script(hArg) {
		const set_fnc = hArg['set_fnc'];
		if (! set_fnc) throw('set_fncは必須です');

		this.fncSet = window[set_fnc];
		if (this.fncSet == null) {
			if (CmnLib.argChk_Boolean(hArg, 'need_err', true)) throw `HTML内に関数${set_fnc}が見つかりません`;
			this.fncSet = ()=> {};
			return false;
		}
		this.fncSet(this.script.aToken.join(''));
		this.fnLastBreak = this.scriptFn_;

		const break_fnc = hArg['break_fnc'];
		if (break_fnc) {
			this.fncBreak = window[break_fnc];
			if (this.fncBreak == null) {
				if (CmnLib.argChk_Boolean(hArg, 'need_err', true)) throw `HTML内に関数${break_fnc}が見つかりません`;
				this.fncBreak = ()=> {};
			}
		}

		return false;
	}
	private fncSet: (txt: string)=> void = ()=> {};
	private fncBreak: (line: number, set: boolean)=> void = ()=> {};
	private fnLastBreak = '';
	break(set: boolean) {
		if (this.fnLastBreak != this.scriptFn_) {
			this.fnLastBreak = this.scriptFn_;
			this.fncSet(this.script.aToken.join(''));
		}
		this.fncBreak(this.lineNum_, set);
	}


	private dumpErrLine = 5;
	dumpErrForeLine() {
		if (this.idxToken_ == 0) {
			console.group(`🥟 Error line (from ${0} rows before) fn:${this.scriptFn_}`);
			console.groupEnd();
			return;
		}

		const aLine = [];
		let cnt = this.dumpErrLine;
		let tmp = '';
		for (let i=this.idxToken_ -1; i>=0; --i) {
			const token = this.script.aToken[i];
			if (token.charAt(0) != '\n') {tmp = token + tmp; continue;}

			aLine.unshift(tmp);
			tmp = '';
			if (--cnt == 0) break;
		}
		if (tmp != '') aLine.unshift(tmp);

		const err_ln = this.script.aLNum[this.idxToken_ -1];
		const ln_txt_width = String(err_ln).length;
		const len = aLine.length;
		const dump_ln_begin = err_ln -(len -1);
		console.group(`🥟 Error line (from ${len} rows before) fn:${this.scriptFn_}`);

		const lc = this.getScr2lineCol(this.script, this.idxToken_);
		for (let i=0; i<len; ++i) {
			const mes = `${
				String(dump_ln_begin +i).padStart(ln_txt_width, ' ')
			}: %c`;
			if (i == len -1) console.info(
				mes + aLine[i].slice(0, lc.col_s)+
				'%c'+ aLine[i].slice(lc.col_s),
				'background-color: skyblue;',
				'background-color: pink;'
			)
			else console.info(mes + aLine[i], 'background-color: skyblue;');
		}
		console.groupEnd();
		//console.log('Linkの出力   : %o', 'file:///Volumes/MacHD2/_Famibee/SKYNovel/prj/mat/main.sn');
	}



		// 条件分岐
	private vctIfStk	: number[]	= [-1];
	private endif() {
		if (this.vctIfStk[0] == -1) throw 'ifブロック内ではありません';

		this.idxToken_ = this.vctIfStk[0];
		this.lineNum_ =  this.script.aLNum[this.idxToken_ -1];
		this.vctIfStk.shift();

		return false;
	}
	private if(hArg) {
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
			if (a_tag == null) throw 'タグ記述['+ t +']異常です';
			const tag_name = a_tag['name'];
			if (! (tag_name in this.hTag)) throw '未定義のタグ['+ tag_name +']です';
			if (! this.alzTagArg.go(a_tag['args'])) throw '属性「'+ this.alzTagArg.literal +'」は異常です';

			switch (tag_name) {
			case 'if':	++cntDepth; break;

			case 'elsif':
				if (cntDepth > 0) break;
				if (idxGo > -1) break;

				const e = this.alzTagArg.hPrm['exp'].val;
				if (e.charAt() == '&') throw('属性expは「&」が不要です');
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
					this.vctIfStk.unshift(this.idxToken_ +1);
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
	private call(hArg) {
		if (! CmnLib.argChk_Boolean(hArg, 'count', false)) this.eraseKidoku();

		const fn = hArg.fn;
		//console.log('\t[call] fn:'+ fn);
		if (fn) this.cfg.searchPath(fn, Config.EXT_SCRIPT);	// chk only
		const hPushArg: any = {
			csAnalyBf			: this.csAnalyBf,
			'const.sn.hEvt1Time': this.evtMng.popLocalEvts()
		};
		if (this.fncReserveToken != null) {
			hPushArg['const.sn.strReserveToken'] = this.fncReserveToken();
			this.fncReserveToken = null;
		}
		this.pushCallStack(hPushArg);
		this.fncReserveToken = null;
		this.vctIfStk.unshift(-1);

		if (CmnLib.argChk_Boolean(hArg, 'clear_local_event', false)) this.hTag.clear_event({});
		this.jumpWork(fn, hArg.label);

		return true;
	};

	// シナリオジャンプ
	private jump(hArg) {
		if (! CmnLib.argChk_Boolean(hArg, 'count', true)) this.eraseKidoku();

		this.vctIfStk[0] = -1;
		this.jumpWork(hArg.fn, hArg.label);

		return true;
	};

	// コールスタック破棄
	private pop_stack(hArg) {
		if (CmnLib.argChk_Boolean(hArg, 'clear', false)) {
			while (this.vctCallStk.length > 0) this.vctCallStk.pop();
		}
		else {
			if (this.vctCallStk.length == 0) throw'[pop_stack] スタックが空です';
			this.vctCallStk.pop();
		}
		this.fncReserveToken = null;
		this.vctIfStk = [-1];

		return false;
	};

	// サブルーチンから戻る
	private return() {
		if (this.vctCallStk.length == 0) throw'[return] スタックが空です';
		const cs = this.vctCallStk.pop();
		const osac = cs.hArg['csAnalyBf'];
		if (osac) this.csAnalyBf = new CallStack(osac.fn, osac.idx);
		this.vctIfStk.shift();

		const after_token = cs.hArg['const.sn.strReserveToken'];
		if (after_token) this.fncReserveToken = ()=> {
			this.fncReserveToken = null;
			return after_token;
		};
		else this.fncReserveToken = null;
		if ('const.sn.hEvt1Time' in cs.hArg) this.evtMng.pushLocalEvts(cs.hArg['const.sn.hEvt1Time']);

		//	lineNum = hScrTokens[cs.fn].tokens.aLNum[cs.idx -1];
		// 上のを下に分解。通常は不要なチェックだが、[load fn= label=]文法用に。
		const oscr = this.hScript[cs.fn];
		if (! oscr) {
			this.jumpWork(cs.fn, '', cs.idx);
			return true;	// 確実にスクリプトロードなので
		}
		this.lineNum_ = oscr.aLNum[cs.idx -1];

		this.jump_light(cs.fn, cs.idx);

		return false;
	};


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
		ldr.load((loader: any, res: any)=> {
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
		this.fncLoaded();
	}


	private	REG_LABEL				= /(\*{2,})(.*)/;
	private	REG_LABEL_ESC			= /\*/g;
	private	REG_TOKEN_MACRO_BEGIN	= /\[macro\s/;
	private	REG_TOKEN_MACRO_END		= /\[endmacro[\s\]]/;
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
		const a_skipLabel = skipLabel.match(this.REG_LABEL);
		if (! a_skipLabel) {
			lineNum = 1;
		}
		else {
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

		const reLabel = new RegExp(
			'^'+ skipLabel.replace(this.REG_LABEL_ESC, '\\*')
			+'(?:\\s|;|\\[|$)');
		for (let i=0; i<len; ++i) {
			// 走査ついでにトークンの行番号も更新
			if (! tokens.aLNum[i]) tokens.aLNum[i] = lineNum;

			const token = this.script.aToken[i];
			const uc = token.charCodeAt(0);	// TokenTopUnicode
			if (uc != 42) {	// 42 = *
				if (uc == 10) lineNum += token.length;	// \n 改行
				continue;
			}

			if (token.search(reLabel) > -1) return {
				idx: i +1,
				lineNum	: lineNum
			}	//	break;
		}

		DebugMng.myTrace(`[jump系] ラベル【`+ skipLabel +`】がありません`, 'ET');
		throw 'Dummy';
	}

	private hScript		: HScript	= {};	// シナリオキャッシュ
	private REG_TAG_LET_ML		= m_xregexp(`^\\[let_ml\\s`, 'g');
	private REG_TAG_ENDLET_ML	= m_xregexp(`^\\[endlet_ml\\s*]`, 'g');
	private resolveScript(txt: string) {
		//console.log('* resolveScript scriptFn:'+ scriptFn);
		txt = txt.replace(/(\r\n|\r)/g, '\n');
		const v = CmnLib.cnvMultilineTag(txt).match(CmnLib.REG_TOKEN);
		if (! v) throw '[error] CmnLib.cnvMultilineTag fail';
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

		if (! (this.scriptFn_ in this.hAreaKidoku)) this.hAreaKidoku[this.scriptFn_] = new Areas;
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


	private REG_WILDCARD	= /^\[(call|loadplugin)\s/;
	private REG_WILDCARD2	= /\bfn\s*=\s*[^\s\]]+/;
			// Unit testの為publicにする
	private replaceScript_Wildcard = ()=> {
		for (let i=this.script.len -1; i>=0; --i) {
			const token = this.script.aToken[i];
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

	private hC2M			: {[char: string]: string} | null		= null;
	private replaceScriptChar2macro_And_let_ml = (start_idx = 0): void => {
		for (let i=this.script.len- 1; i >= start_idx; --i) {
			const token = this.script.aToken[i];
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
	private fncReserveToken		: {(): string} | null	= null;
	runAnalyzeSub() {
		if (this.fncReserveToken != null) return this.fncReserveToken();

		if (this.idxToken_ == this.script.len) this.main.errScript('スクリプト終端です  idxToken:' + this.idxToken_ + ' this.tokens.aToken.length:' + this.script.aToken.length);

		this.recordKidoku();

		// トークンの行番号更新
		if (! this.script.aLNum[this.idxToken_]) this.script.aLNum[this.idxToken_] = this.lineNum_;
		const token = this.script.aToken[this.idxToken_];
		//console.log('🌱 token【'+ token +'】 idxToken:'+ this.idxToken_ +' lineNum:'+ this.lineNum);
		this.main.stop();
		++this.idxToken_;

		return token;
	}

	private recordKidoku(): void {
		const areas = this.hAreaKidoku[this.scriptFn_];
		if (areas == null) throw `recordKidoku fn:${this.scriptFn_} (areas == null)`;

		if (this.vctCallStk.length > 0) {
			// マクロ内やサブルーチンではisKidokuを変更させない
			areas.record(this.idxToken_);
			return;
		}

		this.isKidoku_ = areas.search(this.idxToken_);
		this.val.setVal_Nochk('tmp', 'const.sn.isKidoku', this.isKidoku_);
		if (this.isKidoku_) return;

		areas.record(this.idxToken_);
		//hByteKidoku[this.scriptFn_] = CmnLib.clone(hAreaKidoku[this.scriptFn_].hAreas);
		//soSys.flush();
			// 厳密にはここですべきだが、パフォーマンスに問題があるので
			// クリック待ちを期待できるwait、waitclick、s、l、pタグで
			// saveKidoku()をコール。
	}
	private eraseKidoku(): void {
		const areas = this.hAreaKidoku[this.scriptFn_];
		if (areas) areas.erase(this.idxToken_);
	}
	saveKidoku(): void {
		if (this.hAreaKidoku == null) return

		for (const fn in this.hAreaKidoku) {
			const areas = this.hAreaKidoku[fn];
			if (areas) this.hByteKidoku[fn] = {...areas.hAreas};
		}
		this.flush();
	}
	get isNextKidoku(): boolean {
		let fn	= this.scriptFn;
		let idx	= this.idxToken;
		let len	= this.script.len;
		if (this.vctCallStk.length > 0) {
			const cs = this.vctCallStk[0];
			fn  = cs.fn;
			idx = cs.idx;
			const st = this.hScript[fn];
			if (st != null) len = st.len;
		}

		const areas = this.hAreaKidoku[fn];
		if (areas == null) return false;
		if (idx == len) return false;	// スクリプト終端

		//traceDbg("isNextKidoku fn:"+ fn +" idx:"+ idx +" ret="+ (areas.search(idx)));
		//traceDbg("【"+ vctT[idx-1] +"】【"+ vctT[idx] +"】");

		return areas.search(idx);
	}

	private pushCallStack(hArg: object): void {
		this.vctCallStk.push(new CallStack(this.scriptFn_, this.idxToken_, hArg));
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
	};


		// マクロ
	// 括弧マクロの定義
	private bracket2macro(hArg) {
		const name = hArg.name;
		if (! name) throw('[bracket2macro] nameは必須です');
		const text = hArg.text;
		if (! text) throw('[bracket2macro] textは必須です');
		if (text.length != 2) throw('[bracket2macro] textは括弧の前後を示す二文字を指定してください');

		this.hC2M = this.hC2M || {};

		const op = text.charAt(0);
		const cl = text.charAt(1);
		if (op in this.hC2M) throw('[bracket2macro] text【'+ op +'】が登録済みの括弧マクロまたは一文字マクロです');
		if (cl in this.hC2M) throw('[bracket2macro] text【'+ cl +'】が登録済みの括弧マクロまたは一文字マクロです');
		if (this.REG_CANTC2M.test(op)) throw('[bracket2macro] text【'+ op +'】は括弧マクロに使用できない文字です');
		if (this.REG_CANTC2M.test(cl)) throw('[bracket2macro] text【'+ cl +'】は括弧マクロに使用できない文字です');

		this.hC2M[cl] = '0';	// チェック用ダミー
		this.hC2M[op] = '['+ name +' text=';

		this.regStrC2M += '\\'+ op +'[^\\'+ cl +']*\\'+ cl +'|';
		this.regStrC2M4not += '\\'+ op +'\\'+ cl;
		this.regC2M = new RegExp('('+ this.regStrC2M +'[^'+ this.regStrC2M4not +']+)', 'g');

		this.replaceScriptChar2macro_And_let_ml(this.idxToken_);

		return false;
	};

	private REG_CANTC2M			= /[\w\s;[\]*=&｜《》]/;
	private regStrC2M			= '';
	private regStrC2M4not		= '';

	// マクロから脱出
	private break_macro(hArg) {
		const len = this.vctCallStk.length;
		if (len == 0) throw('[endmacro] マクロ外で呼ばれました');

		const hPopArg = this.vctCallStk[len -1].hArg['const.sn.hMpVal']
		if (hPopArg) this.val.setMp(hPopArg);

		return this.hTag['return'](hArg);
	};

	// 一文字マクロの定義
	private char2macro(hArg) {
		this.hC2M = this.hC2M || {};

		const char = hArg.char;
		if (! char) throw '[char2macro] charは必須です';
		if (char in this.hC2M) throw '[char2macro] char【'+ char +'】が登録済みの括弧マクロまたは一文字マクロです';
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
	};

	// マクロ定義の開始
	private macro(hArg) {
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
			hPushArg['const.sn.hMpVal'] = this.val.cloneMp();

			if (this.fncReserveToken != null) {
				hPushArg['const.sn.strReserveToken'] = this.fncReserveToken();
				this.fncReserveToken = null;
			}
			this.pushCallStack(hPushArg);
			this.vctIfStk.unshift(-1);

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

			if (token.charCodeAt(0) == 10) this.lineNum_ += token.length;	// 改行
		}
		throw 'マクロ'+ name +'定義の終端・[endmacro]がありません';
	};
	private hTagInf	: any	= {};	// タグ/マクロ情報


		// しおり
	// しおりの複写
	private copybookmark(hArg) {
		return false;
	}

	// しおりの消去
	private erasebookmark(hArg) {
		const place = hArg.place;
		if (! place) throw 'placeは必須です';

		if (! this.val.getVal('sys:const.sn.bookmark.'+ place)) return false;

//		if (hSysVal['const.sn.bookmark.'+ place +'.isfile']) {
//			deleteFile(hSysVal['const.sn.bookmark.path'] + place +'.sd');
//		}

//		delete soSys.data.mark[place];
//		delete hSysVal['const.sn.bookmark.'+ place];
		this.val.setVal_Nochk('sys', 'const.sn.bookmark.'+ place, undefined);
		this.flush();

		return false;
	}

	// しおりの読込
	private load(hArg) {
		return false;
	}

	// セーブポイント指定
	private	hPagesRec	= {};
	private	hSaveValRec	= {};
	private	vctIfStkRec	: number[]	= [-1];
	private record_place(hArg) {
		if (! this.layMng) this.return;

		if (this.vctCallStk.length == 0) {
			this.val.setVal_Nochk('save', 'const.sn.scriptFn', this.scriptFn);
			this.val.setVal_Nochk('save', 'const.sn.scriptIdx', this.idxToken);
		}
		else {
			this.val.setVal_Nochk('save', 'const.sn.scriptFn', this.vctCallStk[0].fn);
			this.val.setVal_Nochk('save', 'const.sn.scriptIdx', this.vctCallStk[0].idx);
		}

		this.hSaveValRec = this.val.cloneSave();
		this.hPagesRec = {};
		this.layMng.recordAMF(hArg, this.hPagesRec);
		this.vctIfStkRec = this.vctIfStk.slice(this.vctCallStk.length);

		return false;
	}

	// しおりの保存
	private save(hArg) {
		const place = hArg.place;
		if (! place) throw 'placeは必須です';

		const is_file = (hArg.path);
		const o = {
			hSaveVal	: this.hSaveValRec,
			hPages		: this.hPagesRec,
			vctIfStk	: this.vctIfStkRec,
		};
		if (is_file) {
//			hArg.path = CmnLib.cnv_path(hArg.path);
//			saveObjToFile(o, hArg, place);
		}
		else {
//			if (hSysVal['const.sn.bookmark.'+ place +'.isfile']) {
//				deleteFile(hSysVal['const.sn.bookmark.path'] + place +'.sd');
//			}
//			soSys.data.mark[place] = o;
		}
		this.val.setVal_Nochk('sys', 'const.sn.bookmark.'+ place, true);
		this.val.setVal_Nochk('sys', 'const.sn.bookmark.'+ place +'.UpdateTime', getDateStr());
		this.val.setVal_Nochk('sys', 'const.sn.bookmark.'+ place +'.isfile', is_file);
		this.flush();

		return false;
	}

};
