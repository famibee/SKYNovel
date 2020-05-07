/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, uint} from './CmnLib';
import {IHTag, IMain, IVariable, IMark, HArg, Script, IPropParser} from './CmnInterface';
import {Config} from './Config';
import {CallStack, ICallStackArg} from './CallStack';
import {Grammar} from './Grammar';
import {AnalyzeTagArg} from './AnalyzeTagArg';

import {EventMng} from './EventMng';
import {Loader, LoaderResource} from 'pixi.js';
import {LayerMng} from './LayerMng';
import {DebugMng} from './DebugMng';
import {SoundMng} from './SoundMng';
import {SysBase} from './SysBase';

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
	subIdxToken(): void {--this.idxToken_;};
	private lineNum_	= 0;
	get lineNum(): number {return this.lineNum_;}
	readonly addLineNum	= (len: number)=> {this.lineNum_ += len;};


	private aCallStk	: CallStack[]	= [];
	get lenCallStk(): number {return this.aCallStk.length;};
	get lastHArg(): any {return this.aCallStk[this.lenCallStk -1].csArg;};
	readonly getCallStk = (idx: number)=> this.aCallStk[idx].csArg;

	private	grm			= new Grammar;


	constructor(private readonly cfg: Config, private readonly hTag: IHTag, private readonly main: IMain, private readonly val: IVariable, private readonly alzTagArg: AnalyzeTagArg, private readonly runAnalyze: ()=> void, private readonly prpPrs: IPropParser, private readonly sndMng: SoundMng, private readonly sys: SysBase) {
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
		hTag.char2macro		= o=> this.char2macro(o);	// 一文字マクロの定義
		hTag.endmacro		= ()=> this.return();		// マクロ定義の終了
		hTag.macro			= o=> this.macro(o);		// マクロ定義の開始

		// しおり
		//hTag.copybookmark		// Variable.ts内で定義	// しおりの複写
		//hTag.erasebookmark	// Variable.ts内で定義	// しおりの消去
		hTag.load			= o=> this.load(o);			// しおりの読込
		hTag.reload_script	= o=> this.reload_script(o);	// スクリプト再読込
		hTag.record_place	= ()=> this.record_place();	// セーブポイント指定
		hTag.save			= o=> this.save(o);			// しおりの保存


		val.defTmp('const.sn.vctCallStk.length', ()=> this.aCallStk.length);

		this.grm.setEscape(cfg.oCfg.init.escape);
	}


	// result = true : waitする  resume()で再開
	タグ解析(tagToken: string): boolean {
		const e = Grammar.REG_TAG.exec(tagToken);
		const g = e?.groups;
		if (! g) throw 'タグ記述【'+ tagToken +'】異常です(タグ解析)';

		const tag_name = g.name;
		const tag_fnc = this.hTag[tag_name];
		if (tag_fnc == null) throw '未定義のタグ【'+ tag_name +'】です';

		this.alzTagArg.go(g.args);
		if (this.cfg.oCfg.debug.tag) console.log(`🌲 タグ解析 fn:${this.scriptFn_} lnum:${this.lineNum_} [${tag_name} %o]`, this.alzTagArg.hPrm);

		if (this.alzTagArg.hPrm.cond) {
			const cond = this.alzTagArg.hPrm.cond.val;
			if (! cond || cond.charAt(0) == '&') throw '属性condは「&」が不要です';
			const p = this.prpPrs.parse(cond);
			const ps = String(p);
			if (ps == 'null' || ps == 'undefined') return false;
			if (! p) return false;
		}

		let hArg: any = {};
		const lenStk = this.aCallStk.length;
		if (this.alzTagArg.isKomeParam) {
			if (lenStk == 0) throw '属性「*」はマクロのみ有効です';
			if (! this.lastHArg) throw '属性「*」はマクロのみ有効です';
			hArg = {...hArg, ...this.lastHArg};
		}
		hArg['タグ名'] = tag_name;

		for (const k in this.alzTagArg.hPrm) {
			let v = this.alzTagArg.hPrm[k].val;
			if (v && v.charAt(0) == '%') {
				if (lenStk == 0) throw '属性「%」はマクロ定義内でのみ使用できます（そのマクロの引数を示す簡略文法であるため）';
				const mac = this.lastHArg[v.slice(1)];
				if (mac) {hArg[k] = mac; continue;}

				v = this.alzTagArg.hPrm[k].def;
				if (! v || v == 'null') continue;
					// defのnull指定。%指定が無い場合、タグやマクロに属性を渡さない
			}

			v = this.prpPrs.getValAmpersand(v ?? '');
			if (v != 'undefined') {hArg[k] = v; continue;}

			const def = this.alzTagArg.hPrm[k].def;
			if (def == null) continue;
			v = this.prpPrs.getValAmpersand(def);
			if (v != 'undefined') hArg[k] = v;	// 存在しない値の場合、属性を渡さない
		}

		return tag_fnc(hArg);
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

		let ml = '';
		const len = this.script.len;
		for (; this.idxToken_<len; ++this.idxToken_) {
			ml = this.script.aToken[this.idxToken_];
			if (ml != '') break;
		}
		hArg.text = ml;
		hArg.cast = 'str';
		this.hTag['let'](hArg);
		this.idxToken_ += 2;
		this.lineNum_ += (ml.match(/\n/g) ?? []).length;

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
				if (! cs.csArg) continue;

				const csa = cs.csArg.hMp;
				const from_macro_nm = csa ?csa['タグ名'] :null;
				const call_nm = cs.csArg.タグ名;
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
			if ((s.match(/\n/g) ?? []).length >= this.dumpErrLine) break;
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
				'color: black; background-color: skyblue;', 'color: black; background-color: pink;'
			)
			else console.info(mes + line, 'color: black; background-color: skyblue;');
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
		this.aIfStk.shift();	// 最初の要素を取り除く

		return false;
	}
	private if(hArg: HArg) {
		//console.log('if idxToken:'+ this.idxToken_);
		const exp = hArg.exp;
		if (! exp) throw 'expは必須です';
		if (exp.charAt(0) == '&') throw '属性expは「&」が不要です';

		let cntDepth = 0;		// if深度カウンター
		let	idxGo = this.prpPrs.parse(exp) ?this.idxToken_ :-1;
		for (; this.idxToken_<this.script.len; ++this.idxToken_) {
			if (! this.script.aLNum[this.idxToken_]) this.script.aLNum[this.idxToken_] = this.lineNum_;
			const t = this.script.aToken[this.idxToken_];
			//console.log(`[if]トークン fn:${this.scriptFn_} lnum:${this.lineNum_} idx:${this.idxToken_} realLn:${this.script.aLNum[this.idxToken_]} idxGo:${idxGo} cntDepth:${cntDepth} token<${t}>`);
			if (! t) continue;

			const uc = t.charCodeAt(0);	// TokenTopUnicode
			if (uc == 10) {this.addLineNum(t.length); continue;}	// \n 改行
			if (uc != 91) continue;		// [ タグ開始以外

			const a_tag = Grammar.REG_TAG.exec(t);
			const g = a_tag?.groups;
			if (! g) throw 'タグ記述['+ t +']異常です(if文)';
			const tag_name = g.name;
			if (! (tag_name in this.hTag)) throw `未定義のタグ[${tag_name}]です`;
			this.alzTagArg.go(g.args);

			switch (tag_name) {
			case 'if':	++cntDepth; break;

			case 'elsif':
				if (cntDepth > 0) break;
				if (idxGo > -1) break;

				const e = this.alzTagArg.hPrm.exp.val ?? '';
				if (e.charAt(0) == '&') throw '属性expは「&」が不要です';
				if (this.prpPrs.parse(e)) idxGo = this.idxToken_ +1;
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
					this.aIfStk.unshift(this.idxToken_ +1);	// 最初に要素を追加
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
		if (fn) this.cfg.searchPath(fn, Config.EXT_SCRIPT);	// chk only
		this.callSub({hEvt1Time: this.evtMng.popLocalEvts()});

		if (CmnLib.argChk_Boolean(hArg, 'clear_local_event', false)) this.hTag.clear_event({});
		this.jumpWork(fn, hArg.label);

		return true;
	}
	private callSub(csa: ICallStackArg) {
		this.script.aLNum[this.idxToken_] = this.lineNum_;	// 戻ったときの行番号
		if (! this.resvToken) {csa.resvToken = ''; this.clearResvToken();}
		this.aCallStk.push(new CallStack(this.scriptFn_, this.idxToken_, csa));
		this.aIfStk.unshift(-1);	// 最初に要素を追加
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
		if (CmnLib.argChk_Boolean(hArg, 'clear', false)) this.aCallStk = [];
		else if (! this.aCallStk.pop()) throw '[pop_stack] スタックが空です';
		this.clearResvToken();
		this.aIfStk = [-1];

		return false;
	}

	// サブルーチンから戻る
	private return() {
		const cs = this.aCallStk.pop();
		if (! cs) throw '[return] スタックが空です';
		const csArg = cs.csArg;
		if (! csArg) return false;
		this.aIfStk.shift();	// 最初の要素を取り除く

		const hMp = csArg.hMp;	// マクロからの復帰の場合にmp:値も復帰
		if (hMp) this.val.setMp(hMp);

		const after_token = csArg.resvToken;
		if (after_token) this.nextToken = ()=> {
			this.clearResvToken();
			return after_token;
		}
		else this.clearResvToken();
		if (csArg.hEvt1Time) this.evtMng.pushLocalEvts(csArg.hEvt1Time);

		if (cs.fn in this.hScript) {this.jump_light(cs); return false;}
		this.jumpWork(cs.fn, '', cs.idx);	// 確実にスクリプトロードなので
		return true;
	}

	private resvToken	= '';
	private clearResvToken() {
		this.resvToken = '';
		this.nextToken = this.nextToken_Proc;
	}


	private skipLabel = '';
	private jumpWork(fn = '', label = '', idx = 0) {
		if (! fn && ! label) this.main.errScript('[jump系] fnまたはlabelは必須です');
		if (label) {
			if (label.charAt(0) != '*') this.main.errScript('[jump系] labelは*で始まります');
			this.skipLabel = label;
			if (this.skipLabel.slice(0, 2) != '**') this.idxToken_ = idx;
		}
		else {
			this.skipLabel = '';
			this.idxToken_ = idx;
		}

		if (! fn) {this.analyzeInit(); return;}

		const full_path = this.cfg.searchPath(fn, Config.EXT_SCRIPT);
		if (fn == this.scriptFn_) {this.analyzeInit(); return;}
		this.scriptFn_ = fn;
		const st = this.hScript[this.scriptFn_];
		if (st) {this.script = st; this.analyzeInit(); return;}

		(new Loader()).add(this.scriptFn_, full_path)
		.pre((res: LoaderResource, next: Function)=> res.load(()=> {
			this.sys.pre(res.extension, res.data)
			.then(r=> {res.data = r; next();})
				// TODO: 暗号化スクリプトかは、前方から一定の長さに(\n|\t)有無で分かる
//		if (this.onlyCodeScript()) this.main.errScript('[セキュリティ] 暗号化スクリプト以外許されません');
			.catch(e=> this.main.errScript(`[jump系]snロード失敗です fn:${res.name} ${e}`, false));
		}))
		.load((_ldr: any, hRes: any)=> {
			this.nextToken = this.nextToken_Proc;

			this.resolveScript(hRes[fn].data);
			this.hTag.record_place({});
			this.main.resume(()=> this.analyzeInit());
				// 直接呼んでもいいが、内部コールスタック積んだままになるのがなんかイヤで
		});
		this.main.stop();
	}
	private analyzeInit(): void {
		const o = this.seekScript(this.script, Boolean(this.val.getVal('mp:const.sn.macro_name')), this.lineNum_, this.skipLabel, this.idxToken_);
		this.idxToken_	= o.idx;
		this.lineNum_	= o.lineNum;
		this.runAnalyze();
	}

	// シナリオ解析処理ループ・冒頭処理
	nextToken = ()=> '';	// 初期化前に終了した場合向け
	private nextToken_Proc() {
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


	private	readonly REG_NONAME_LABEL		= /(\*{2,})(.*)/;
	private	readonly REG_LABEL_ESC			= /\*/g;
	private	readonly REG_TOKEN_MACRO_BEGIN	= /\[macro\s/;
	private	readonly REG_TOKEN_MACRO_END	= /\[endmacro[\s\]]/;
	private	readonly REG_TAG_LET_ML			= /^\[let_ml\s/g;
	private	readonly REG_TAG_ENDLET_ML		= /^\[endlet_ml\s*]/g;
	private	seekScript(st: Script, inMacro: boolean, ln: number, skipLabel: string, idxToken: number): ISeek {
		//console.log('seekScript (from)inMacro:'+ inMacro +' (from)lineNum:'+ ln +' (to)skipLabel:'+ skipLabel +': (to)idxToken:'+ idxToken);
		const len = st.aToken.length;
		if (! skipLabel) {
			if (idxToken >= len) DebugMng.myTrace('[jump系] 内部エラー idxToken:'+ idxToken +' は、最大トークン数:'+ len +'を越えます', 'ET');
			if (! st.aLNum[idxToken]) {	// undefined
				ln = 1;
				for (let j=0; j<idxToken; ++j) {
					// 走査ついでにトークンの行番号も更新
					if (! st.aLNum[j]) st.aLNum[j] = ln;

					const token_j = st.aToken[j];
					if (token_j.charCodeAt(0) == 10) {	// \n 改行
						ln += token_j.length;
					}
				}
				st.aLNum[idxToken] = ln;
			}
			else {
				ln = st.aLNum[idxToken];
			}

			return {
				idx: idxToken,
				lineNum	: ln
			}
		}

		st.aLNum[0] = 1;		// 先頭トークン＝一行目
		const a_skipLabel = skipLabel.match(this.REG_NONAME_LABEL);
		if (a_skipLabel) {
			skipLabel = a_skipLabel[1];
			let i = idxToken;
			switch (a_skipLabel[2]) {
			case 'before':
				while (st.aToken[--i] != skipLabel) {
					if (i == 0) DebugMng.myTrace('[jump系 無名ラベルbefore] '
						+ ln +'行目以前で'+ (inMacro ?'マクロ内に' :'')
						+ 'ラベル【'+ skipLabel +'】がありません', 'ET');
					if (inMacro && st.aToken[i].search(this.REG_TOKEN_MACRO_BEGIN) > -1) DebugMng.myTrace('[jump系 無名ラベルbefore] マクロ内にラベル【'+ skipLabel +'】がありません', 'ET');
				}
				return {
					idx: i +1,
					lineNum	: st.aLNum[i]
				}	//	break;

			case 'after':
				while (st.aToken[++i] != skipLabel) {
					if (i == len) DebugMng.myTrace('[jump系 無名ラベルafter] '
						+ ln +'行目以後でマクロ内にラベル【'+ skipLabel +'】がありません', 'ET');
					if (st.aToken[i].search(this.REG_TOKEN_MACRO_END) > -1) DebugMng.myTrace('[jump系 無名ラベルafter] '
						+ ln +'行目以後でマクロ内にラベル【'+ skipLabel +'】がありません', 'ET');
				}
				return {
					idx: i +1,
					lineNum	: st.aLNum[i]
				}	//	break;

			default:
				DebugMng.myTrace('[jump系] 無名ラベル指定【label='+ skipLabel +'】が間違っています', 'ET');
			}
		}

		ln = 1;
		const reLabel = new RegExp(
			'^'+ skipLabel.replace(this.REG_LABEL_ESC, '\\*')
			+'(?:\\s|;|\\[|$)');
		let in_let_ml = false;
		for (let i=0; i<len; ++i) {
			// 走査ついでにトークンの行番号も更新
			if (! st.aLNum[i]) st.aLNum[i] = ln;

			const token = st.aToken[i];
			const uc = token.charCodeAt(0);	// TokenTopUnicode
			if (uc != 42) {	// 42 = *
				if (in_let_ml) {
					this.REG_TAG_ENDLET_ML.lastIndex = 0;
					if (this.REG_TAG_ENDLET_ML.test(token)) {
						in_let_ml = false;
						continue;
					}
					ln += (token.match(/\n/g) ?? []).length;	// \n 改行
				}
				else {
					this.REG_TAG_LET_ML.lastIndex = 0;
					if (this.REG_TAG_LET_ML.test(token)) {
						in_let_ml = true;
						continue;
					}
					if (uc == 10) ln += token.length;	// \n 改行
				}
				continue;
			}

			if (token.search(reLabel) > -1) return {
				idx: i +1,
				lineNum	: ln
			}	//	break;
		}
		if (in_let_ml) throw '[let_ml]の終端・[endlet_ml]がありません';

		DebugMng.myTrace(`[jump系] ラベル【`+ skipLabel +`】がありません`, 'ET');
		throw 'Dummy';
	}

	private hScript	: HScript	= Object.create(null);	//{} シナリオキャッシュ
	private resolveScript(txt: string) {
		const v = txt
			.replace(/(\r\n|\r)/g, '\n')
			.match(this.grm.REG_TOKEN) ?? [];
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
			this.grm.replaceScr_C2M_And_let_ml(this.script);
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

	private jump_light(cs: CallStack) {
		// jumpでは連続マクロでスタックオーバーフローになるので簡易版を
		// 主に[return]やマクロ終了でジャンプ先がチェック不要な場合用
		// analyzeInit()とかもジャンプ前にやってて不要だし
		this.scriptFn_	= cs.fn;
		this.idxToken_	= cs.idx;
		const st = this.hScript[this.scriptFn_];
		if (st != null) this.script = st;
		this.lineNum_ = this.script.aLNum[cs.idx];
	}


	private	readonly REG_WILDCARD	= /^\[(call|loadplugin)\s/;
	private	readonly REG_WILDCARD2	= /\bfn\s*=\s*[^\s\]]+/;
	private replaceScript_Wildcard = ()=> {
		for (let i=this.script.len -1; i>=0; --i) {
			const token = this.script.aToken[i];
			this.REG_WILDCARD.lastIndex = 0;
			if (! this.REG_WILDCARD.test(token)) continue;

			const e = Grammar.REG_TAG.exec(token);
			const g = e?.groups;
			if (! g) continue;
			this.alzTagArg.go(g.args);

			const p_fn = this.alzTagArg.hPrm.fn;
			if (! p_fn) continue;
			const fn = p_fn.val;
			if (! fn || fn.slice(-1) != '*') continue;

			const ext = (g.name == 'loadplugin') ?'css' :'sn';
			const a = this.cfg.matchPath('^'+ fn.slice(0, -1) +'.*', ext);

			this.script.aToken.splice(i, 1, '\t', '; '+ token);
			this.script.aLNum.splice(i, 1, NaN, NaN);

			for (const v of a) {
				const nt = token.replace(
					this.REG_WILDCARD2,
					'fn='+ decodeURIComponent(CmnLib.getFn(v[ext]))
				);
				//console.log('\t='+ nt +'=');
				this.script.aToken.splice(i, 0, nt);
				this.script.aLNum.splice(i, 0, NaN);
			}
		}
		this.script.len = this.script.aToken.length;
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
		let idx	= this.idxToken_;
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
		this.grm.bracket2macro(hArg, this.script, this.idxToken_);

		return false;
	}

	// 一文字マクロの定義
	private char2macro(hArg: HArg) {
		this.grm.char2macro(hArg, this.hTag, this.script, this.idxToken_);

		return false;
	}

	// マクロ定義の開始
	private macro(hArg: HArg) {
		const name = hArg.name;
		if (! name) throw 'nameは必須です';
		if (name in this.hTag) throw `[${name}]はタグかすでに定義済みのマクロです`;

		const ln = this.lineNum_;
		const cs = new CallStack(this.scriptFn_, this.idxToken_);
		this.hTag[name] = (hArgM: HArg)=> {
			this.callSub({...hArgM, hMpVal: this.val.cloneMp()} as any);

			// AIRNovelの仕様：親マクロが子マクロコール時、*がないのに値を引き継ぐ
			//for (const k in hArg) this.val.setVal_Nochk('mp', k, hArg[k]);
			this.val.setMp(hArgM);
			this.val.setVal_Nochk('mp', 'const.sn.macro_name', name);
			this.val.setVal_Nochk('mp', 'const.sn.me_call_scriptFn', this.scriptFn_);

			this.lineNum_ = ln;
			this.jump_light(cs);

			return false;
		};

		for (; this.idxToken_ < this.script.len; ++this.idxToken_) {
			// トークンの行番号更新
			if (! this.script.aLNum[this.idxToken_]) this.script.aLNum[this.idxToken_] = this.lineNum_;

			const token = this.script.aToken[this.idxToken_];
			if (token.search(this.REG_TOKEN_MACRO_END) > -1) {
				++this.idxToken_;
				return false;
			}

			if (token.charCodeAt(0) == 10) this.lineNum_ += (token.match(/\n/g) ?? []).length;
		}
		throw `マクロ[${name}]定義の終端・[endmacro]がありません`;
	}


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
		this.layMng.recText('', true);

		if (reload_sound) this.sndMng.playLoopFromSaveObj();

		if (CmnLib.argChk_Boolean(hArg, 'do_rec', true)) this.mark = {
			hSave	: this.val.cloneSave(),
			hPages	: {...mark.hPages},
			aIfStk	: [...mark.aIfStk],
		}

		const o: any = {
			enabled: this.val.getVal('save:const.sn.autowc.enabled'),
			text: String(this.val.getVal('save:const.sn.autowc.text')),
			time: String(this.val.getVal('save:const.sn.autowc.time')),
		};
		this.hTag.autowc(o);

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

		const len = this.aCallStk.length;
		if (len == 0) {
			this.val.setVal_Nochk('save', 'const.sn.scriptFn', this.scriptFn);
			this.val.setVal_Nochk('save', 'const.sn.scriptIdx', this.idxToken_);
		}
		else {
			this.val.setVal_Nochk('save', 'const.sn.scriptFn', this.aCallStk[0].fn);
			this.val.setVal_Nochk('save', 'const.sn.scriptIdx', this.aCallStk[0].idx);
		}
		this.mark = {
			hSave	: this.val.cloneSave(),
			hPages	: this.layMng.record(),
			aIfStk	: this.aIfStk.slice(len),
		};

		return false;
	}

	// しおりの保存
	private save(hArg: HArg) {
		const place = hArg.place;
		if (! place) throw 'placeは必須です';

		delete hArg.タグ名;
		delete hArg.place;
		hArg.text = (hArg.text ?? '').replace(/^(<br\/>)+/, '');
		this.mark.json = hArg;
		this.val.setMark(place, this.mark);

		const now_sp = Number(this.val.getVal('sys:const.sn.save.place'));
		if (place == now_sp) this.val.setVal_Nochk('sys', 'const.sn.save.place', now_sp +1);

		return false;
	}

}
