/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {uint, int, argChk_Boolean, argChk_Num} from './CmnLib';
import {creCSArg, type T_H_VAL_MP} from './CallStack';
import type {TArg, T_HTag} from './Grammar';
import type {T_Variable, T_fncSetVal, T_ProcVal, T_SysBase, T_Data4Vari, T_Mark, T_FncHook, Scope, T_H_TMP_DATA, T_H_VAL_MARK, T_H_SYS_DATA, T_VAL_DATA_FNC, T_VAL_DATA, T_VAL_BSNU, T_H_SAVE_DATA} from './CmnInterface';
import {creSAVEDATA, creSYS_DATA, creTMP_DATA} from './CmnInterface';
import type {Config} from './Config';
import {Areas} from './Areas';
import {PropParser} from './PropParser';
import {ReadingState} from './Reading';


export class Variable implements T_Variable {
	#hSave		: T_H_SAVE_DATA	= creSAVEDATA();
	#hTmp		: T_H_TMP_DATA	= creTMP_DATA();
	#hScopes	= {
		sys		: {},	// clearsysvarを呼ぶので
		save	: this.#hSave,
		tmp		: this.#hTmp,
		mp		: <T_H_VAL_MP>{},
		mark	: <T_H_VAL_MARK>{},
	};


	constructor(private readonly sys: T_SysBase, private readonly cfg: Config, hTag: T_HTag) {
		//	変数操作
		hTag.let			= o=> this.#let(o);			// 変数代入・演算
		hTag.let_abs		= o=> this.#let_abs(o);		// 絶対値
		hTag.let_char_at	= o=> this.#let_char_at(o);	// 文字列から一字取りだし
		hTag.let_index_of	= o=> this.#let_index_of(o);// 文字列で検索
		hTag.let_length		= o=> this.#let_length(o);	// 文字列の長さ
		// let_mlはScriptIteratorにて定義				// インラインテキスト代入
		hTag.let_replace	= o=> this.#let_replace(o);	// 正規表現で置換
		hTag.let_round		= o=> this.#let_round(o);	// 四捨五入
		hTag.let_search		= o=> this.#let_search(o);	// 正規表現で検索
		hTag.let_substr		= o=> this.#let_substr(o);	// 文字列から抜きだし

		//	デバッグ・その他
		hTag.clearsysvar	= ()=> this.#clearsysvar();	// システム変数の全消去
		hTag.clearvar		= ()=> this.#clearvar();	// ゲーム変数の全消去
		hTag.dump_val		= ()=> this.#dump_val();	// 変数のダンプ

		// しおり
		hTag.copybookmark	= o=> this.#copybookmark(o);	// しおりの複写
		hTag.erasebookmark	= o=> this.#erasebookmark(o);	// しおりの消去
		//hTag.load			// ScriptIterator.ts内で定義	// しおりの読込
		//hTag.record_place	// ScriptIterator.ts内で定義	// セーブポイント指定
		//hTag.save			// ScriptIterator.ts内で定義	// しおりの保存

		// save:
		this.defTmp('const.sn.bookmark.json', ()=> {
			const a: TArg[] = [];
			for (const [nm, mk] of Object.entries(this.#d4v.mark)) {
				const o = {...mk.json};
				o.place = uint(nm);
				a.push(o);	// パスを searchPath() で展開してはいけない
			}
			return JSON.stringify(a);
		});

		// tmp:
		/*
			this.hTmp['const.Stage.supportsOrientationChange']
				= Stage.supportsOrientationChange;
			if (this.hTmp['const.Stage.supportsOrientationChange']) {
				this.hTmp['const.Stage.orientation']
					= ()=> {return stage.orientation};
				this.hTmp['const.Stage.deviceOrientation']
					= ()=> {return stage.deviceOrientation};

				const lenSO:uint = stage.supportedOrientations.length;
				for (let iSO:uint=0; iSO<lenSO; ++iSO) {
					this.hTmp['const.Stage.supportedOrientations.'
						+ stage.supportedOrientations[iSO]
					] = true;
				}
			}
			else {
				//	import flash.display.StageOrientation;
				this.hTmp['const.Stage.orientation'] =
				this.hTmp['const.Stage.deviceOrientation'] =
				//		StageOrientation.DEFAULT;
					'default';
			}
		*/

		// ・画面サイズ：screen.width ウインドウが表示されているディスプレイのサイズ
		//	※ macOSなら【設定】-【ディスプレイ】-【使用形態】のイメージボタンにホバーすると出る数字と同じ
// DebugMng.myTrace(`fn:Variable.ts 画面サイズ(${String(screen.width)} x ${String(screen.height)}) 利用可能領域(${String(screen.availWidth)} x ${String(screen.availHeight)})`, 'W');

		// prj.json
		this.#hTmp['const.sn.config.window.width']	= cfg.oCfg.window.width;
		this.#hTmp['const.sn.config.window.height']	= cfg.oCfg.window.height;
		this.#hTmp['const.sn.config.book.title']	= cfg.oCfg.book.title;
		this.#hTmp['const.sn.config.book.version']	= cfg.oCfg.book.version;
	}


	#d4v	: T_Data4Vari	= {
		sys		: <T_H_SYS_DATA>{},	// clearsysvarを呼ぶので
		mark	: {},
		kidoku	: {},
	};
	#hSys	: T_H_SYS_DATA;
	#hAreaKidoku	: {[fn: string]: Areas}	= {};
	#callHook		: T_FncHook;
	async init() {return this.sys.initVal(this.#hTmp, data=> {
		this.updateData(data);

		if (this.cfg.oCfg.debug.variable) this.#dbgVariable(this.sys);
		else this.flush = ()=> this.sys.flush();
		this.flush();

		this.#callHook = (type, o)=> this.sys.callHook(type, o);
		this.sys.addHook((type, o)=> this.#hProcDbgRes[type]?.(type, o));

		// 初回の初期化と、v1.11.0 まで未初期化変数があった件の対策
		const tm = int(this.getVal('sys:sn.tagCh.msecWait', -1));
		if (tm === -1) this.#clearsysvar(true);

		this.#tagCh_doWait = Boolean(this.getVal('sys:sn.tagCh.doWait'));
		this.#tagCh_doWait_Kidoku = Boolean(this.getVal('sys:sn.tagCh.doWait_Kidoku'));
		this.#tagCh_msecWait = int(this.getVal('sys:sn.tagCh.msecWait'));
		this.#tagCh_msecWait_Kidoku = int(this.getVal('sys:sn.tagCh.msecWait_Kidoku'));

		this.#saPageLog();
	})}

	//MARK: SessionStorage で確認できるデバッグ機能
	#dbgVariable(sys: T_SysBase) {
		sessionStorage.clear();
		const ns = this.cfg.headNs;

		this.flush = () => {
			const oSys = creSYS_DATA();
			for (const [k, v] of Object.entries(this.#hSys)) {
				if (v instanceof Function) continue;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
				(<any>oSys)[k] = v;
			}
			sessionStorage[ns + 'sys'] = JSON.stringify(oSys);

			const oSave = creSAVEDATA();
			for (const [k, v] of Object.entries(this.#hSave)) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
				(<any>oSave)[k] = v;
			}
			sessionStorage[ns + 'save'] = JSON.stringify(oSave);

			const oTmp = creTMP_DATA();
			for (const [k, v] of Object.entries(this.#hTmp)) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
				(<any>oTmp)[k] = v instanceof Function ? v() : v;
				//TODO: 実行するのか無視するのか問題
			}
			sessionStorage[ns + 'tmp'] = JSON.stringify(oTmp);

			const oMp = creCSArg();
			for (const [k, v] of Object.entries(this.#hScopes.mp)) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
				(<any>oMp)[k] = v;
			}
			sessionStorage[ns + 'mp'] = JSON.stringify(oMp);

			const oMark: T_H_VAL_MARK = {};
			for (const [k, v] of Object.entries(this.#d4v.mark)) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
				oMark[int(k)] = v instanceof Function ? v() : v;
			}
			sessionStorage[ns + 'mark'] = JSON.stringify(oMark);

			sessionStorage[ns + 'kidoku'] = structuredClone(this.#d4v.kidoku);

			sys.flush();
		};
	}


	#saPageLog() {ReadingState.playbackPage(
		String(this.getVal('sys:const.sn.aPageLog', '[]')),
		String(this.getVal('save:const.sn.styPaging', ReadingState.INI_STYPAGE)),
	)}
	readonly	#hProcDbgRes
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	: {[type: string]: (type: string, o: any)=> void}	= {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
		auth: (_, o)=> this.#set_data_break(o.hBreakpoint.aData),
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
		var	: (_,o)=> this.sys.send2Dbg(o.ri, {v: this.#hScopes[<Scope>o.scope] ?? {}}),
		set_var	: (_, o)=> {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
			try {this.#setVal(o.nm, o.val); this.sys.send2Dbg(o.ri, {})} catch { /* empty */ }
		},
		set_data_break	: (_, o)=> {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
			this.#set_data_break(o.a);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
			this.sys.send2Dbg(o.ri, {});
		},
		disconnect: _=> {Variable.#hSetEvent = {}},
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	#set_data_break(a: any[]) {	// o.a.length === 0 なら削除
		Variable.#hSetEvent = {};
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		for (const v of a) Variable.#hSetEvent[v.dataId] = 1;
	}


	//MARK: 外からのデータで保持データを更新
	//	初期化時やインポートなどで使用
	updateData(d4v: T_Data4Vari): void {
		this.#d4v = d4v;
		this.#hSys = this.#hScopes.sys = d4v.sys;

		this.#hAreaKidoku = {};
		for (const [fn, dk] of Object.entries(d4v.kidoku)) {
			this.#hAreaKidoku[fn] = Areas.from(dk);
		}
		// this.flush();	// saveKidoku() に任せる
	}
	flush	= ()=> { /* empty */ };

	setDoRecProc(fnc: (doRec: boolean)=> void) {this.#doRecProc = fnc}
	#doRecProc = (_doRec: boolean)=> { /* empty */ };

	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
	defTmp(name: string, fnc: T_ProcVal) {(<any>this.#hTmp)[name] = fnc}

	cloneMp() {return {...this.#hScopes.mp}}
	setMp(mp: T_H_VAL_MP) {this.#hScopes.mp = mp}

	setMark(place: number, mark: T_Mark) {
		this.#d4v.mark[place] = mark;
		this.flush();
	}
	getMark(place: number) {
		const mark = this.#d4v.mark[place];
		if (! mark) throw `place【${String(place)}】は存在しません`;
		return mark;
	}

	cloneSave() {return {...this.#hScopes.save}}
	mark2save(mark: T_Mark) {
		this.#hSave = this.#hScopes.save = {...mark.hSave};
		this.#doRecLog	= this.#hSave['sn.doRecLog'];
	}


	// 既読系
	touchAreaKidoku(fn: string): Areas {
		const ar = this.#hAreaKidoku[fn];
		if (ar) return ar;

		this.#d4v.kidoku[fn] = {};
		const ret = this.#hAreaKidoku[fn] = new Areas;
		return ret;
	}
	getAreaKidoku(fn: string): Areas {
		const ar = this.#hAreaKidoku[fn];
		if (! ar) throw `hAreaKidoku${fn}】は存在しません`;
		return ar;
	}
	saveKidoku() {
		for (const [fn, ak] of Object.entries(this.#hAreaKidoku)) {
			this.#d4v.kidoku[fn] = ak.val();
		}
		this.flush();
	}


//	// しおり
	// しおりの複写
	#copybookmark(hArg: TArg) {
		const from = argChk_Num(hArg, 'from', NaN);
		const to = argChk_Num(hArg, 'to', NaN);
		// const from = hArg.from;
		// const to = hArg.to;
		if (from === to) return false;

		const f = this.#d4v.mark[from];
		if (! f) throw `from:${String(from)} のセーブデータは存在しません`;
		this.setMark(to, {...f});
		this.sys.copyBMFolder(from, to);

		return false;
	}

	// しおりの消去
	#erasebookmark(hArg: TArg) {
		const place = argChk_Num(hArg, 'place', NaN);

		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		delete this.#d4v.mark[place];
		this.flush();

		this.sys.eraseBMFolder(place);

		return false;
	}


//	//	変数操作
	// 変数代入・演算
	#let(hArg: TArg) {
		if (! hArg.name) throw 'nameは必須です';

		let autocast = true;
		if (hArg.cast) {
			//switch (trim(hArg.cast)) {
			switch (hArg.cast) {
			case 'num':
				argChk_Num(hArg, 'text', NaN);
				break;
			case 'int':
				hArg.text = String(int(argChk_Num(hArg, 'text', NaN)));
				break;
			case 'uint':
				hArg.text = String(uint(argChk_Num(hArg, 'text', NaN)));
				break;
			case 'bool':
				argChk_Boolean(hArg, 'text', false);
				break;
			case 'str':
				autocast = false;
				break;
			default:
				throw 'cast【'+ hArg.cast +'】は未定義です';
			}
		}

		this.#setVal(hArg.name, hArg.text, autocast);

		return false;
	}

	// 絶対値
	#let_abs(hArg: TArg) {
		const n = argChk_Num(hArg, 'text', 0);
		//hArg.text = Math.abs(n);
		hArg.text = String(n < 0 ?-n :n);
			// JavaScriptのMath.abs()で絶対値を取得しないほうが良い理由 | iwb.jp https://iwb.jp/javascript-math-abs-deprecated/
			// 数値以外だとほとんどがNaNを返し、booleanは0や1を返しているため使い方によってはバグの原因になることがある。
		this.#let(hArg);

		return false;
	}

	// 文字列から一字取りだし
	#let_char_at(hArg: TArg) {
		hArg.text = (hArg.text ?? '').charAt(argChk_Num(hArg, 'pos', 0));
		this.#let(hArg);

		return false;
	}

	// 文字列で検索
	#let_index_of(hArg: TArg) {
		const {val} = hArg;
		if (! val) throw 'valは必須です';
		const start = argChk_Num(hArg, 'start', 0);

		hArg.text = String((hArg.text ?? '').indexOf(val, start));
		this.#let(hArg);

		return false;
	}

	// 文字列の長さ
	#let_length(hArg: TArg) {
		hArg.text = String((hArg.text ?? '').length);
		this.#let(hArg);

		return false;
	}

	// 正規表現で置換
	#let_replace(hArg: TArg) {
		if (! hArg.reg) throw 'regは必須です';

		const {flags} = hArg;
		const reg = ! flags
			? new RegExp(hArg.reg)
			: new RegExp(hArg.reg, flags);
		hArg.text = (hArg.text ?? '').replace(reg, String(hArg.val));
		this.#let(hArg);

		return false;
	}

	// 四捨五入
	#let_round(hArg: TArg) {
		const n = argChk_Num(hArg, 'text', 0);
		hArg.text = String(Math.round(n));
		this.#let(hArg);

		return false;
	}

	// 正規表現で検索
	#let_search(hArg: TArg) {
		if (! hArg.reg) throw 'regは必須です';

		const {flags} = hArg;
		const reg = ! flags
			? new RegExp(hArg.reg)
			: new RegExp(hArg.reg, flags);
		hArg.text = String((hArg.text ?? '').search(reg));
		this.#let(hArg);

		return false;
	}

	// 文字列から抜きだし
	#let_substr(hArg: TArg) {
		const i = argChk_Num(hArg, 'pos', 0);
		hArg.text = hArg.len !== 'all'
			? (hArg.text ?? '').slice(i, i +int(argChk_Num(hArg, 'len', 1)))
			: (hArg.text ?? '').slice(i);
		this.#let(hArg);

		return false;
	}


//	// デバッグ・その他
	// システム変数の全消去
	#clearsysvar(init = false) {
		const sys = this.#hSys = this.#hScopes.sys = this.#d4v.sys = creSYS_DATA();

		const is_nw = typeof process !== 'undefined';
		if (is_nw) {
		//	//	this.setVal_Sub('sys:const.sn.window.x', stage.nativeWindow.x);
		//	//	this.setVal_Sub('sys:const.sn.window.y', stage.nativeWindow.y);
			//NOTE: これは？？
		}
		else {
			this.setVal_Nochk('sys', 'const.sn.window.x', 0);
			this.setVal_Nochk('sys', 'const.sn.window.y', 0);
		}

		// 文字表示Wait時間
		this.setVal_Nochk('sys', 'sn.tagCh.msecWait', this.cfg.oCfg.init.tagch_msecwait);
		this.setVal_Nochk('sys', 'sn.tagCh.msecWait_Kidoku', this.cfg.oCfg.init.tagch_msecwait);

		// 自動読みすすみモード時の改ページ時のウェイト
		//	//	runFirst_sys_an_auto_msecPageWait('sn.auto.msecPageWait', '');
		this.setVal_Nochk('sys', 'sn.auto.msecPageWait', argChk_Num(sys, 'sn.auto.msecPageWait', this.cfg.oCfg.init.auto_msecpagewait));
		this.setVal_Nochk('sys', 'sn.auto.msecPageWait_Kidoku', argChk_Num(sys, 'sn.auto.msecPageWait', this.cfg.oCfg.init.auto_msecpagewait));

		//	SoundMixer.soundTransform = new SoundTransform(
		//		(sys['flash.media.SoundMixer.soundTransform.volume'] = 1)
		//	);

		for (const ar of Object.values(this.#hAreaKidoku)) ar.clear();
			// this.#data.kidoku へのコピーは saveKidoku() に任せる

		this.#hScopes.mark = this.#d4v.mark = {};

		if (! init) this.#saPageLog();


		this.flush();

		return false;
	}

	// ゲーム変数の全消去
	#clearvar() {
		const mesLayer	: string = this.#hSave['const.sn.mesLayer'];
		const doRecLog	: boolean= this.#hSave['sn.doRecLog'];
		const sLog		: string = this.#hSave['const.sn.sLog'];
		const styPaging	: string = this.#hSave['const.sn.styPaging'];

		this.#hSave = this.#hScopes.save = creSAVEDATA();

		this.setVal_Nochk('save', 'const.sn.mesLayer', mesLayer);
		this.setVal_Nochk('save', 'sn.doRecLog', doRecLog);
		this.setVal_Nochk('save', 'const.sn.sLog', sLog);
		this.setVal_Nochk('save', 'const.sn.styPaging', styPaging);

		return false;
	}

	#setVal(arg_name: string, val: T_VAL_BSNU, autocast = true) {
		if (! arg_name) throw '[変数に値セット] nameは必須です';
		if (val === undefined) throw '[変数に値セット] textは必須です（空文字はOK）';

		const o = PropParser.getValName(arg_name);
		if (! o) throw `[変数参照] name(${arg_name})が変数名として異常です`;

		const hScope = this.#hScopes[<Scope>o.scope];
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (! hScope) throw `[変数に値セット] scopeが異常【${String(o.scope)}】です`;

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const nm = o.name!;
		if (nm.startsWith('const.') && nm in hScope) {
			throw `[変数に値セット] 変数【${nm}】は書き換え不可です`;
		}

		this.setVal_Nochk(<Scope>o.scope, nm, val, autocast);
	}
	setVal_Nochk(scope: Scope, nm: string, ival: T_VAL_BSNU, autocast = false) {
		const hScope = this.#hScopes[scope];
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const val = autocast ?this.#castAuto(ival) : ival;

		const fullnm = scope +':'+ nm;
		if (fullnm in Variable.#hSetEvent) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
			const old_v = (<any>hScope)[nm];
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const new_v = val;
			// eslint-disable-next-line eqeqeq
			if (old_v != new_v) this.#callHook('data_break', {
				dataId: fullnm,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				old_v,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				new_v,
			});
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
		(<any>hScope)[nm] = val;

		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		this.#hSetValTrg[fullnm]?.(nm, val ?? '');

		// if (scope === 'sys') this.flush()
			// 厳密にはここですべきだが、パフォーマンスに問題があるので
			// クリック待ちを期待できるwait、waitclick、s、l、pタグで
			// saveKidoku()をコール。（中で保存しているのでついでに）

		//console.log(`\tlet s[${scope}] n[${nm}]='${val}' trg[${(trg)}]`);
	}
	// reload 再生成 Main に受け渡すため static
	static	#hSetEvent: {[fullnm: string]: 1} = {};


	// readonly getVal_save = (arg_name: string, def?: number | string)=> {
	// 	if (! arg_name) throw '[変数参照] nameは必須です';

	getVal(arg_name: string, def?: number | string, touch = false): T_VAL_DATA {
		if (! arg_name) throw '[変数参照] nameは必須です';

		const o = PropParser.getValName(arg_name);
		if (! o) throw '[変数参照] name('+ arg_name +')が変数名として異常です';

		const hScope = this.#hScopes[<Scope>o.scope];
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (! hScope) throw `[変数参照] scopeが異常【${String(o.scope)}】です`;

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const val_name = o.name!;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
		let val = <T_VAL_DATA_FNC>(<any>hScope)[val_name];
		// let val = (<any>hScope)[val_name];
// console.log(`fn:Variable.ts  ・getVal arg_name=${arg_name}= val_name=${val_name}= A:${String(! (val_name in hScope))} val:%o`, val);
		if (! (val_name in hScope)) {	// 存在しない変数名の場合、刻んで調べていく
			val = def;
			if (touch) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
				(<any>hScope)[val_name] = def;
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				return o.at === '@str' ?val :this.#castAuto(val);
			}

			let nm = '';
			const aNm = val_name.split('.');
			const len = aNm.length;
			for (let i=0; i<len; ++i, nm += '.') {
				// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
				nm += aNm[i];
				if (! (nm in hScope)) continue;	// 存在しない変数名の場合、延ばす

				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
				let v = JSON.parse((<any>hScope)[nm]);
				if (Object.prototype.toString.call(v) !== '[object Object]') {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					if (i +1 === len) {val = v; break}	// 最下層ならそのまま返す
					continue;
						// 短い名前でヒットしたが、JSONでもなく
						// 変数名にはまだ続きがあるので探索続行
				}

				let j = i;	// JSONオブジェクトの階層を降りつつ探索
				while (++j < len) {
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					const nj = aNm[j]!;
					if (! (nj in v)) {val = def; break}

					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
					v = v[nj];
					if (Object.prototype.toString.call(v) !== '[object Object]'
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						|| j +1 === len) {val = v; break}// 最下層ならそのまま返す
				}

				if (val instanceof Object) val = JSON.stringify(val);
				break;
			}
		}
		if (val instanceof Function) val = val();
// console.log(`\tget [${arg_name}] -> s[${o.scope ?? 'tmp'}'] a[${o.at ?? ''}] n[${val_name}'] ret['${String(val)}']('${typeof val}')'`);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return o.at === '@str' ?val :this.#castAuto(val);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	#castAuto(val: T_VAL_DATA): any {
		const s_val = <string>val;
		if (s_val === 'true') return true;
		if (s_val === 'false') return false;
		if (s_val === 'null') return null;
		if (s_val === 'undefined') return undefined;
		if (this.#REG_NUMERICLITERAL.test(s_val)) return parseFloat(s_val);

		return val;
	}
	#REG_NUMERICLITERAL		= /^-?[\d.]+$/;


	// 変数のダンプ
	#dump_val() {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const val: any = {tmp:{}, sys:{}, save:{}, mp:{}};
		for (const scope in val) {
			const hVal = this.#hScopes[<Scope>scope];
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
			const hRet = val[scope];
			for (const [key, v] of Object.entries(hVal)) {
				if (v instanceof Function) continue;

				// // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				// hRet[key] = v instanceof Function ?v() :v;
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				hRet[key] = v;
					//TODO: 実行するのか無視するのか問題
			}
		}
		console.info('🥟 [dump_val]', val);

		return false;
	}

	#doRecLog	= false;
	doRecLog() {return this.#doRecLog}


	#tagCh_doWait = false;
	get tagCh_doWait() {return this.#tagCh_doWait;}
	#tagCh_doWait_Kidoku = false;
	get tagCh_doWait_Kidoku() {return this.#tagCh_doWait_Kidoku;}
	#tagCh_msecWait		= 0;
	get tagCh_msecWait() {return this.#tagCh_msecWait;}
	#tagCh_msecWait_Kidoku= 0;
	get tagCh_msecWait_Kidoku() {return this.#tagCh_msecWait_Kidoku;}

	#hSetValTrg	: {[name: string]: T_fncSetVal}	= {
		// sys
		'sys:sn.tagCh.doWait'			: name=> {
			this.#tagCh_doWait =
			this.#runFirst_Bool_hSysVal_true(name);
		},
		'sys:sn.tagCh.doWait_Kidoku'	: name=> {
			this.#tagCh_doWait_Kidoku =
			this.#runFirst_Bool_hSysVal_true(name);
		},
		'sys:sn.tagCh.msecWait'			: name=> {
			this.#tagCh_msecWait =
			this.#runFirst_sys_an_tagCh_msecWait(name);
		},
		'sys:sn.tagCh.msecWait_Kidoku'	: name=> {
			this.#tagCh_msecWait_Kidoku =
			this.#runFirst_sys_an_tagCh_msecWait_Kidoku(name);
		},
		'sys:sn.tagCh.canskip'			: name=> this.#runFirst_Bool_hSysVal_true(name),

		'sys:sn.auto.msecPageWait'			: name=>
			this.#runFirst_sys_an_auto_msecPageWait(name),
		'sys:sn.auto.msecPageWait_Kidoku'	: name=>
			this.#runFirst_sys_an_auto_msecPageWait(name),
		'sys:sn.auto.msecLineWait'			: name=>
			this.#runFirst_sys_an_auto_msecLineWait(name),
		'sys:sn.auto.msecLineWait_Kidoku'	: name=>
			this.#runFirst_sys_an_auto_msecLineWait(name),

		// save
		'save:sn.doRecLog'		: name=> {
			this.#doRecProc(
				this.#doRecLog = this.#runFirst_Bool_hSaveVal_true(name)
			);
		},
		'save:sn.userFnTail'	: (_name, ival)=> {
			const val = String(ival);
			if (val.includes('@')) throw 'この変数では文字「@」は禁止です';
			this.cfg.userFnTail = val;
		},

		// tmp
		'tmp:flash.desktop.NativeApplication.nativeApplication.systemIdleMode'	:
			()=> {
			//	NativeApplication.nativeApplication.systemIdleMode = val;
			}
		,
	};
	defValTrg(name: string, fnc: T_fncSetVal) {this.#hSetValTrg[name] = fnc}
	readonly	#runFirst_Bool_hSysVal_true = (name: string)=> argChk_Boolean(this.#hSys, name, true);
	readonly	#runFirst_sys_an_tagCh_msecWait = (name: string)=> argChk_Num(this.#hSys, name, 10);
	readonly	#runFirst_sys_an_tagCh_msecWait_Kidoku = (name: string)=> argChk_Num(
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		this.#hSys, name, this.cfg.oCfg.init.tagch_msecwait ?? 10
	);
	readonly	#runFirst_sys_an_auto_msecPageWait = (name: string)=> argChk_Num(
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		this.#hSys, name, this.cfg.oCfg.init.auto_msecpagewait ?? 3500
	);
	readonly	#runFirst_sys_an_auto_msecLineWait = (name: string)=> argChk_Num(this.#hSys, name, 500);

	#runFirst_Bool_hSaveVal_true(name: string) {
		return argChk_Boolean(this.#hSave, name, true);
	}

}
