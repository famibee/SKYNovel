/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2022 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {uint, int, getDateStr, argChk_Boolean, argChk_Num} from './CmnLib';
import {HArg, IHTag, IVariable, ISetVal, typeProcVal, ISysBase, IData4Vari, IMark, IFncHook, IValMp, IValSave} from './CmnInterface';
import {Config} from './Config';
import {Areas} from './Areas';
import {PropParser} from './PropParser';

import platform from 'platform';

export class Variable implements IVariable {
	#hScopes	: {[name: string]: any}	= {sys:{}, save:{}, tmp:{}, mp:{}};
	#hSave	: any	= this.#hScopes.save;
	#hTmp	: any	= this.#hScopes.tmp;


	constructor(private readonly cfg: Config, hTag: IHTag) {
		//	変数操作
		hTag.let			= o=> this.#let(o);			// 変数代入・演算
		hTag.let_abs		= o=> this.#let_abs(o);		// 絶対値
		hTag.let_char_at	= o=> this.#let_char_at(o);	// 文字列から一字取りだし
		hTag.let_index_of	= o=> this.#let_index_of(o);	// 文字列で検索
		hTag.let_length		= o=> this.#let_length(o);	// 文字列の長さ
		// let_mlはScriptIteratorにて定義				// インラインテキスト代入
		hTag.let_replace	= o=> this.#let_replace(o);	// 正規表現で置換
		hTag.let_round		= o=> this.#let_round(o);	// 四捨五入
		hTag.let_search		= o=> this.#let_search(o);	// 正規表現で検索
		hTag.let_substr		= o=> this.#let_substr(o);	// 文字列から抜きだし

		//	デバッグ・その他
		hTag.clearsysvar	= ()=> this.#clearsysvar();	// システム変数の全消去
		hTag.clearvar		= ()=> this.#clearvar();		// ゲーム変数の全消去
		hTag.dump_val		= ()=> this.#dump_val();		// 変数のダンプ

		// しおり
		hTag.copybookmark	= o=> this.#copybookmark(o);	// しおりの複写
		hTag.erasebookmark	= o=> this.#erasebookmark(o);// しおりの消去
		//hTag.load			// ScriptIterator.ts内で定義	// しおりの読込
		//hTag.record_place	// ScriptIterator.ts内で定義	// セーブポイント指定
		//hTag.save			// ScriptIterator.ts内で定義	// しおりの保存

		// save:
		this.#hSave['sn.userFnTail']	= '';
		this.defTmp('const.sn.bookmark.json', ()=> {
			const a: object[] = [];
			Object.keys(this.#data.mark).sort().forEach(k=> {
				const o = {...this.#data.mark[k].json};
				o.place = k;
				a.push(o);	// パスを searchPath() で展開してはいけない
			});
			return JSON.stringify(a);
		});

		// tmp:
		this.#hTmp['const.sn.isFirstBoot'] = true;

		this.#hTmp['sn.tagL.enabled'] = true;	// 頁末まで一気に読み進むか(l無視)
		this.#hTmp['sn.skip.all']	= false;	// falseなら既読のみをスキップ
		this.#hTmp['sn.skip.enabled'] = false;	// 次の選択肢(/未読)まで進むが有効か
		this.#hTmp['sn.auto.enabled'] = false;	// 自動読みすすみモードかどうか

		this.#hTmp['const.sn.last_page_text'] = '';

		//this.hTmp['const.sn.mouse.middle']	// ScriptIterator で定義

		//this.hTmp['const.sn.vctCallStk.length']	// ScriptIterator で定義

/*		this.hTmp['const.Stage.supportsOrientationChange']
			= Stage.supportsOrientationChange;
		if (this.hTmp['const.Stage.supportsOrientationChange']) {
			this.hTmp['const.Stage.orientation']
				= ()=> {return stage.orientation;};
			this.hTmp['const.Stage.deviceOrientation']
				= ()=> {return stage.deviceOrientation;};

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
		this.#hTmp['const.sn.displayState'] = false;
			// const.flash.display.Stage.displayState

		this.#hTmp['const.Date.getTime'] = ()=> (new Date).getTime();
		this.#hTmp['const.Date.getDateStr'] = ()=> getDateStr();

		this.#hTmp['const.sn.platform'] = JSON.stringify(platform);

		this.#clearsysvar();
		this.#clearvar();

		// prj.json
		this.#hTmp['const.sn.config.window.width'] = cfg.oCfg.window.width;
		this.#hTmp['const.sn.config.window.height']= cfg.oCfg.window.height;
		this.#hTmp['const.sn.config.book.title'] = cfg.oCfg.book.title;
		this.#hTmp['const.sn.config.book.version'] = cfg.oCfg.book.version;

		this.#hTmp['const.sn.Math.PI'] = Math.PI;


		if (typeof window === 'undefined') return;
		const win: any = window;
		const ac = win['AudioContext'] ?? win['webkitAudioContext'];
		this.#hTmp['const.sn.needClick2Play'] = ()=> new ac().state === 'suspended';
	}


	#sys	: ISysBase;
	#data	: IData4Vari	= {sys:{}, mark:{}, kidoku:{}};
	#hSys	: any;
	#hAreaKidoku	: {[name: string]: Areas}	= {};
	#callHook		: IFncHook;
	setSys(sys: ISysBase) {
		this.#sys = sys;
		sys.initVal(this.#data, this.#hTmp, data=> {
			this.updateData(data);

			sessionStorage.clear();
			const ns = this.cfg.getNs();
			this.#flush = (this.cfg.oCfg.debug.variable) ?()=> {
				const oSys: any = {};
				Object.keys(this.#hSys).forEach(k=> {
					const v = this.#hSys[k];
					oSys['sys:'+ k] = (v instanceof Function) ?v(): v;
				});
				sessionStorage[ns +'sys'] = JSON.stringify(oSys);

				const oSave: any = {};
				Object.keys(this.#hSave).forEach(k=> {
					const v = this.#hSave[k];
					oSave['save:'+ k] = (v instanceof Function) ?v(): v;
				});
				sessionStorage[ns+'save'] = JSON.stringify(oSave);

				const oTmp: any = {};
				Object.keys(this.#hTmp).forEach(k=> {
					const v = this.#hTmp[k];
					oTmp[k] = (v instanceof Function) ?v(): v;
				});
				sessionStorage[ns +'tmp'] = JSON.stringify(oTmp);

				const oMp: any = {};
				Object.keys(this.#hScopes.mp).forEach(k=> {
					const v = this.#hScopes.mp[k];
					oMp[k] = (v instanceof Function) ?v(): v;
				});
				sessionStorage[ns +'mp'] = JSON.stringify(oMp);

				const oMark: any = {};
				Object.keys(this.#data.mark).forEach(k=> {
					const v = this.#data.mark[k];
					oMark[k] = (v instanceof Function) ?v(): v;
				});
				sessionStorage[ns+'mark'] = JSON.stringify(oMark);

				const oKidoku: any = {};
				Object.keys(this.#data.kidoku).forEach(k=> {
					const v = this.#data.kidoku[k];
					oKidoku[k] = (v instanceof Function) ?v(): v;
				});
				sessionStorage[ns +'kidoku'] = JSON.stringify(oKidoku);

				sys.flush();
			}
			: ()=> sys.flush();

			this.#callHook = (type, o)=> sys.callHook(type, o);
		//x	this.callHook = sys.callHook;
			sys.addHook((type, o)=> this.#hProcDbgRes[type]?.(type, o));

			// 初回の初期化と、v1.11.0 まで未初期化変数があった件の対策
			const tm = this.getVal('sys:sn.tagCh.msecWait', -1);
			if (this.#hTmp['const.sn.isFirstBoot'] || tm === -1) this.#clearsysvar();
		});
	}
	readonly	#hProcDbgRes
	: {[type: string]: (type: string, o: any)=> void}	= {
		auth: (_, o)=> this.#set_data_break(o.hBreakpoint.aData),
		var	: (_,o)=> this.#sys.send2Dbg(o.ri, {v: this.#hScopes[o.scope] ?? {}}),
		set_var	: (_, o)=> {
			try {this.#setVal(o.nm, o.val); this.#sys.send2Dbg(o.ri, {})} catch {}
		},
		set_data_break	: (_, o)=> {
			this.#set_data_break(o.a);
			this.#sys.send2Dbg(o.ri, {});
		},
		disconnect: _=> Variable.#hSetEvent = {},
	}
	#set_data_break(a: any[]) {	// o.a.length === 0 なら削除
		Variable.#hSetEvent = {};
		a.forEach((v: any)=> Variable.#hSetEvent[v.dataId] = 1);
	}

	updateData(data: IData4Vari): void {
		this.#data = data;
		this.#hSys = this.#hScopes.sys = this.#data.sys;

		this.#hAreaKidoku = {};
		for (const fn in this.#data.kidoku) {
			const areas = new Areas;
			areas.hAreas = {...this.#data.kidoku[fn]};
			this.#hAreaKidoku[fn] = areas;
		}
	}
	#flush	= ()=> {};
	flush() {this.#flush();}	// 先にこのメソッドへの参照を配ってしまうので、中身を入れ替える

	setDoRecProc(fnc: (doRec: boolean)=> void) {this.#doRecProc = fnc;}
	#doRecProc = (_doRec: boolean)=> {};

	defTmp(name: string, fnc: typeProcVal) {this.#hTmp[name] = fnc;};
	cloneMp(): IValMp {return {...this.#hScopes.mp}}
	setMp(mp: IValMp) {this.#hScopes.mp = mp;}
	setMark(place: number, mark: IMark) {this.#data.mark[place] = mark; this.flush()}
	readonly	getMark = (place: number)=> this.#data.mark[place];
	cloneSave(): IValSave {return {...this.#hScopes.save}}
	mark2save(mark: IMark) {
		this.#hSave = this.#hScopes.save = {...mark.hSave};
		this.#doRecLog	= this.#hSave['sn.doRecLog'] ?? false;
	}


	// 既読系
	loadScrWork(fn: string) {
		if (! (fn in this.#hAreaKidoku)) this.#hAreaKidoku[fn] = new Areas;
	}
	getAreaKidoku = (fn: string): Areas=> this.#hAreaKidoku[fn];
	saveKidoku() {
		for (const fn in this.#hAreaKidoku) {
			this.#data.kidoku[fn] = {...this.#hAreaKidoku[fn].hAreas};
		}
		this.flush();
	}


//	// しおり
	// しおりの複写
	#copybookmark(hArg: HArg) {
		if (! ('from' in hArg)) throw 'fromは必須です';
		if (! ('to' in hArg)) throw 'toは必須です';

		const from = Number(hArg.from);
		const to = Number(hArg.to);
		if (from === to) return false;

		if (! (from in this.#data.mark)) throw `from:${from} のセーブデータは存在しません`;
		this.setMark(to, {...this.#data.mark[from]});
		this.#sys.copyBMFolder(from, to);

		return false;
	}

	// しおりの消去
	#erasebookmark(hArg: HArg) {
		const {place} = hArg;
		if (! place) throw 'placeは必須です';

		delete this.#data.mark[place];
		this.flush();

		this.#sys.eraseBMFolder(place);

		return false;
	}


//	//	変数操作
	// 変数代入・演算
	#let(hArg: HArg) {
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
	#let_abs(hArg: HArg) {
		const n = argChk_Num(hArg, 'text', 0);
		//hArg.text = Math.abs(n);
		hArg.text = String((n < 0) ?-n :n);
			// JavaScriptのMath.abs()で絶対値を取得しないほうが良い理由 | iwb.jp https://iwb.jp/javascript-math-abs-deprecated/
			// 数値以外だとほとんどがNaNを返し、booleanは0や1を返しているため使い方によってはバグの原因になることがある。
		this.#let(hArg);

		return false;
	}

	// 文字列から一字取りだし
	#let_char_at(hArg: HArg) {
		hArg.text = (hArg.text ?? '').charAt(argChk_Num(hArg, 'pos', 0));
		this.#let(hArg);

		return false;
	}

	// 文字列で検索
	#let_index_of(hArg: HArg) {
		const {val} = hArg;
		if (! val) throw 'valは必須です';
		const start = argChk_Num(hArg, 'start', 0);

		hArg.text = String((hArg.text ?? '').indexOf(val, start));
		this.#let(hArg);

		return false;
	}

	// 文字列の長さ
	#let_length(hArg: HArg) {
		hArg.text = String((hArg.text ?? '').length);
		this.#let(hArg);

		return false;
	}

	// 正規表現で置換
	#let_replace(hArg: HArg) {
		if (! hArg.reg) throw 'regは必須です';

		const {flags} = hArg;
		const reg = (! flags)
			? new RegExp(hArg.reg)
			: new RegExp(hArg.reg, flags);
		hArg.text = String(hArg.text ?? '').replace(reg, String(hArg.val));
		this.#let(hArg);

		return false;
	}

	// 四捨五入
	#let_round(hArg: HArg) {
		const n = argChk_Num(hArg, 'text', 0);
		hArg.text = String(Math.round(n));
		this.#let(hArg);

		return false;
	}

	// 正規表現で検索
	#let_search(hArg: HArg) {
		if (! hArg.reg) throw 'regは必須です';

		const {flags} = hArg;
		const reg = (! flags)
			? new RegExp(hArg.reg)
			: new RegExp(hArg.reg, flags);
		hArg.text = String((hArg.text ?? '').search(reg));
		this.#let(hArg);

		return false;
	}

	// 文字列から抜きだし
	#let_substr(hArg: HArg) {
		const i = argChk_Num(hArg, 'pos', 0);
		hArg.text = (hArg.len !== 'all')
			? (hArg.text ?? '').slice(i, i +int(argChk_Num(hArg, 'len', 1)))
			: (hArg.text ?? '').slice(i);
		this.#let(hArg);

		return false;
	}


//	// デバッグ・その他
	// システム変数の全消去
	#clearsysvar() {
		const sys = this.#hSys = this.#hScopes['sys'] = this.#data.sys = {};

		const is_nw = (typeof process !== 'undefined');
		if (is_nw) {
		//	//	this.setVal_Sub('sys:const.sn.window.x', stage.nativeWindow.x);
		//	//	this.setVal_Sub('sys:const.sn.window.y', stage.nativeWindow.y);
		}
		else {
			this.setVal_Nochk('sys', 'const.sn.window.x', 0);
			this.setVal_Nochk('sys', 'const.sn.window.y', 0);
		}

		// 文字表示Waitをかけるか
		this.setVal_Nochk('sys', 'sn.tagCh.doWait', true);
		this.setVal_Nochk('sys', 'sn.tagCh.doWait_Kidoku', true);	// 【既読】
		// 文字表示Wait時間
		this.setVal_Nochk('sys', 'sn.tagCh.msecWait', this.cfg.oCfg.init.tagch_msecwait);
		this.setVal_Nochk('sys', 'sn.tagCh.msecWait_Kidoku', this.cfg.oCfg.init.tagch_msecwait);
			// 【既読】
		// 文字表示Wait中スキップのモード
		this.setVal_Nochk('sys', 'sn.tagCh.canskip', true);

		// スキップのモード
		this.setVal_Nochk('sys', 'sn.skip.mode', 's');	// l, p, s

		// 自動読みすすみモード時の改ページ時のウェイト
		//	//	runFirst_sys_an_auto_msecPageWait('sn.auto.msecPageWait', '');
		this.setVal_Nochk('sys', 'sn.auto.msecPageWait', argChk_Num(sys, 'sn.auto.msecPageWait', this.cfg.oCfg.init.auto_msecpagewait ?? 3500));
		this.setVal_Nochk('sys', 'sn.auto.msecPageWait_Kidoku', argChk_Num(sys, 'sn.auto.msecPageWait', this.cfg.oCfg.init.auto_msecpagewait ?? 3500));
		// 自動読みすすみモード時の行クリック待ち時のウェイト
		this.setVal_Nochk('sys', 'sn.auto.msecLineWait', 500);
		this.setVal_Nochk('sys', 'sn.auto.msecLineWait_Kidoku', 500);	// 【既読】

		//	SoundMixer.soundTransform = new SoundTransform(
		//		(sys['flash.media.SoundMixer.soundTransform.volume'] = 1)
		//	);
		this.setVal_Nochk('sys', 'const.sn.sound.BGM.volume', 1);
		this.setVal_Nochk('sys', 'const.sn.sound.SE.volume', 1);
		this.setVal_Nochk('sys', 'const.sn.sound.SYS.volume', 1);
		for (const fn in this.#data.kidoku) {
			this.#data.kidoku[fn].hAreas = {};
			this.#hAreaKidoku[fn].clear();
		}


		this.setVal_Nochk('sys', 'TextLayer.Back.Alpha', 0.5);


		this.#hScopes['mark'] = this.#data.mark = {};
		this.setVal_Nochk('sys', 'const.sn.save.place', 1);


		this.flush();

		return false;
	}

	// ゲーム変数の全消去
	#clearvar() {
		const mesLayer	= this.#hSave['const.sn.mesLayer'] ?? '';
		const doRecLog	= this.#hSave['sn.doRecLog'] ?? false;
		const sLog		= this.#hSave['const.sn.sLog'] ?? '[]';

		this.#hSave = this.#hScopes.save = {};

		this.setVal_Nochk('save', 'const.sn.mesLayer', mesLayer);
		this.setVal_Nochk('save', 'sn.doRecLog', doRecLog);
		this.setVal_Nochk('save', 'const.sn.sLog', sLog);

		return false;
	}

	readonly #setVal = (arg_name: string, val: any, autocast = true)=> {
		if (! arg_name) throw '[変数に値セット] nameは必須です';
		if (val == null) throw '[変数に値セット] textは必須です（空文字はOK）';

		const o = PropParser.getValName(arg_name);
		if (o === undefined) throw '[変数参照] name('+ arg_name +')が変数名として異常です';

		const hScope = this.#hScopes[o.scope];
		if (! hScope) throw '[変数に値セット] scopeが異常【'+ o.scope +'】です';

		const nm = o['name'];
		if (nm.slice(0, 6) === 'const.' && (nm in hScope)) {
			throw '[変数に値セット] 変数【'+ nm +'】は書き換え不可です';
		}

		this.setVal_Nochk(o.scope, nm, val, autocast);
	}
	setVal_Nochk(scope: string, nm: string, val: any, autocast = false) {
		const hScope = this.#hScopes[scope];
		if (autocast) val = this.#castAuto(val);

		const fullnm = scope +':'+ nm;
		if (fullnm in Variable.#hSetEvent) {
			const old_v = hScope[nm];
			const new_v = val;
			if (old_v != new_v) this.#callHook('data_break', {
				dataId: fullnm,
				old_v: old_v,
				new_v: new_v,
			});
		}

		hScope[nm] = val;

		this.#hValTrg[fullnm]?.(nm, val);

		// if (scope === 'sys') this.flush()
			// 厳密にはここですべきだが、パフォーマンスに問題があるので
			// クリック待ちを期待できるwait、waitclick、s、l、pタグで
			// saveKidoku()をコール。（中で保存しているのでついでに）

		//console.log(`\tlet s[${scope}] n[${nm}]='${val}' trg[${(trg)}]`);
	}
	// reload 再生成 Main に受け渡すため static
	static	#hSetEvent: {[fullnm: string]: 1} = {};

	readonly getVal = (arg_name: string, def?: number | string)=> {
		if (! arg_name) throw '[変数参照] nameは必須です';

		const o = PropParser.getValName(arg_name);
		if (o === undefined) throw '[変数参照] name('+ arg_name +')が変数名として異常です';

		const hScope = this.#hScopes[o['scope']];
		if (! hScope) throw '[変数参照] scopeが異常【'+ o['scope'] +'】です';

		const val_name = o['name'];
		let val = hScope[val_name];
//console.log(`fn:Variable.ts line:527 ・getVal arg_name=${arg_name}= val_name=${val_name}= A:${! (val_name in hScope)} val:%o`, val);
		if (! (val_name in hScope)) {	// 存在しない変数名の場合、刻んで調べていく
			val = def;

			let nm = '';
			const aNm = val_name.split('.');
			const len = aNm.length;
			for (let i=0; i<len; ++i, nm += '.') {
				nm += aNm[i];
//console.log(`fn:Variable.ts line:546  nm:${nm}`);
				if (! (nm in hScope)) continue;	// 存在しない変数名の場合、延ばす

				let v = JSON.parse(hScope[nm]);
//console.log(`fn:Variable.ts line:550   nm:${nm} type:${Object.prototype.toString.call(v)} v:%o`, v);
				if (Object.prototype.toString.call(v) !== '[object Object]') {
//console.log(`fn:Variable.ts line:552   != o i:${i} len:${len} C:${i +1 === len}`);
					if (i +1 === len) {val = v; break;}	// 最下層ならそのまま返す
					continue;
						// 短い名前でヒットしたが、JSONでもなく
						// 変数名にはまだ続きがあるので探索続行
				}

				let j = i;	// JSONオブジェクトの階層を降りつつ探索
				while (++j < len) {
//console.log(`fn:Variable.ts line:561   nm:${nm} j:${j} aNm[j]=${aNm[j]}= A:${! (aNm[j] in v)}`);
					if (! (aNm[j] in v)) {val = def; break;}
					v = v[aNm[j]];
//console.log(`fn:Variable.ts line:564   v:${v} J:${j +1 === len}`);
					if (Object.prototype.toString.call(v) !== '[object Object]'
						|| j +1 === len) {val = v; break;}// 最下層ならそのまま返す
				}

				if (val instanceof Object) val = JSON.stringify(val);
				break;
			}
		}
		if (val instanceof Function) val = (val as Function)();
		//console.log('\tget ['+ arg_name +'] -> s['+ o['scope'] +'] a['+ o['at'] +'] n['+ name +'] ret['+ val +']('+ typeof val +')');

		return (o['at'] === '@str') ?val :this.#castAuto(val);
	}

	#castAuto(val: Object): any {
		const s_val = val as string;
		if (s_val === 'true') return true;
		if (s_val === 'false') return false;
		if (s_val === 'null') return null;
		if (s_val === 'undefined') return undefined;
		if (this.#REG_NUMERICLITERAL.test(s_val)) return parseFloat(s_val);

		return val;
	}
	#REG_NUMERICLITERAL	:RegExp	= /^-?[\d\.]+$/;


	// 変数のダンプ
	readonly #dump_val = ()=> {
		const val: any = {tmp:{}, sys:{}, save:{}, mp:{}};
		for (let scope in val) {
			const hVal = this.#hScopes[scope];
			const hRet = val[scope];
			for (let key in hVal) {
				const v = hVal[key];
				if (Object.prototype.toString.call(v) === '[object Function]') {
					hRet[key] = v();
				}
				else hRet[key] = v;
			}
		}
		console.info('🥟 [dump_val]', val);

		return false;
	}

	#doRecLog	= false;
	doRecLog() {return this.#doRecLog;}


	#hValTrg	: {[name: string]: ISetVal}	= {
		// sys
		'sys:sn.tagCh.doWait'			: name=>
			this.#runFirst_Bool_hSysVal_true(name),
		'sys:sn.tagCh.doWait_Kidoku'	: name=>
			this.#runFirst_Bool_hSysVal_true(name),
		'sys:sn.tagCh.msecWait'			: name=>
			this.#runFirst_sys_an_tagCh_msecWait(name),
		'sys:sn.tagCh.msecWait_Kidoku'	: name=>
			this.#runFirst_sys_an_tagCh_msecWait_Kidoku(name),
		'sys:sn.tagCh.canskip'			: name=>
			this.#runFirst_Bool_hSysVal_true(name),

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
		'save:sn.userFnTail'	: (_name, val)=> this.cfg.userFnTail = val,

		// tmp
		'tmp:sn.tagL.enabled'	: name=>
			this.#runFirst_Bool_hTmp_true(name),
		'tmp:sn.skip.all'		: name=>
			this.#runFirst_Bool_hTmp_false(name),
		'tmp:sn.skip.enabled'	: name=>
			this.#runFirst_Bool_hTmp_false(name),
		'tmp:sn.auto.enabled'	: name=>
			this.#runFirst_Bool_hTmp_false(name),
		'tmp:flash.desktop.NativeApplication.nativeApplication.systemIdleMode'	: (
			()=> {
			//	NativeApplication.nativeApplication.systemIdleMode = val;
			}
		),
	};
	defValTrg(name: string, fnc: ISetVal) {this.#hValTrg[name] = fnc;}
	#runFirst_Bool_hSysVal_true(name: string): void {
			argChk_Boolean(this.#hSys, name, true);
		}
	#runFirst_sys_an_tagCh_msecWait(name: string): void {
			argChk_Num(this.#hSys, name, 10);
			if (this.#hSys['sn.tagCh.doWait']) {
//				LayerMng.msecChWait = this.hSysVal[name];
			}
		}
	#runFirst_sys_an_tagCh_msecWait_Kidoku(name: string): void {
		argChk_Num(this.#hSys, name,
			(this.cfg.oCfg.init.tagch_msecwait === undefined)
				? 10
				: this.cfg.oCfg.init.tagch_msecwait
		);
		if (this.#hSys['sn.tagCh.doWait_Kidoku']) {
//			LayerMng.msecChWait = this.hSysVal[name];
		}
	}
	#runFirst_sys_an_auto_msecPageWait(name: string): void {
		argChk_Num(this.#hSys, name,
			(this.cfg.oCfg.init.auto_msecpagewait === undefined)
				? 3500
				: this.cfg.oCfg.init.auto_msecpagewait
		);
	}
	#runFirst_sys_an_auto_msecLineWait(name: string): void {
		argChk_Num(this.#hSys, name, 500);
	}

	#runFirst_Bool_hSaveVal_true(name: string) {
		return argChk_Boolean(this.#hSave, name, true);
	}

	#runFirst_Bool_hTmp_true(name: string): void {
		argChk_Boolean(this.#hTmp, name, true);
	}
	#runFirst_Bool_hTmp_false(name: string): void {
		argChk_Boolean(this.#hTmp, name, false);
	}

};