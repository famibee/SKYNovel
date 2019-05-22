/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, uint, int, getDateStr} from './CmnLib';
import {HArg, IHTag, IVariable, ISetVal, typeProcVal, ISysBase, IData4Vari, IMark} from './CmnInterface';
import {Config} from './Config';
import {Areas} from './Areas';
import {PropParser} from './PropParser';
const platform = require('platform');

export class Variable implements IVariable {
	private	hScope	: any	= {sys:{}, save:{}, tmp:{}, mp:{}};
								// TODO: save:って作ってない気が
	private	hSave	: any	= this.hScope.save;
	private	hTmp	: any	= this.hScope.tmp;


	constructor(private cfg: Config, hTag: IHTag) {
		//	変数操作
		hTag.let			= o=> this.let(o);			// 変数代入・演算
		hTag.let_abs		= o=> this.let_abs(o);		// 絶対値
		hTag.let_char_at	= o=> this.let_char_at(o);	// 文字列から一字取りだし
		hTag.let_index_of	= o=> this.let_index_of(o);	// 文字列で検索
		hTag.let_length		= o=> this.let_length(o);	// 文字列の長さ
		// let_mlはScriptIteratorにて定義				// インラインテキスト代入
		hTag.let_replace	= o=> this.let_replace(o);	// 正規表現で置換
		hTag.let_round		= o=> this.let_round(o);	// 四捨五入
		hTag.let_search		= o=> this.let_search(o);	// 正規表現で検索
		hTag.let_substr		= o=> this.let_substr(o);	// 文字列から抜きだし

		//	デバッグ・その他
		hTag.clearsysvar	= ()=> this.clearsysvar();	// システム変数の全消去
		hTag.clearvar		= ()=> this.clearvar();		// ゲーム変数の全消去
		hTag.dump_val		= ()=> this.dump_val();		// 変数のダンプ

		// しおり
		hTag.copybookmark	= o=> this.copybookmark(o);	// しおりの複写
		hTag.erasebookmark	= o=> this.erasebookmark(o);// しおりの消去
		//hTag.load			// ScriptIterator.ts内で定義	// しおりの読込
		//hTag.record_place	// ScriptIterator.ts内で定義	// セーブポイント指定
		//hTag.save			// ScriptIterator.ts内で定義	// しおりの保存

		// save:
		this.hSave['sn.userFnTail']	= '';
		this.defTmp('const.sn.bookmark.json', ()=> {
			const a: object[] = [];
			Object.keys(this.data.mark).sort().map(k=> {
				const o = {...this.data.mark[k].json};
				for (const key in o) {
					const v = o[key];
					if (typeof v != 'string') continue;
					if (v.substr(0, 10) != 'userdata:/') continue;
					o[key] = cfg.searchPath(v);
				}
				o.place = k;
				a.push(o);
			});
			return JSON.stringify(a);
		});

		// tmp:
		/// この辺でsys:ロード処理か
		this.hTmp['const.sn.isFirstBoot'] = true;

		this.hTmp['sn.tagL.enabled'] = true;	// 頁末まで一気に読み進むか(l無視)
		this.hTmp['sn.skip.all']	= false;	// falseなら既読のみをスキップ
		this.hTmp['sn.skip.enabled'] = false;	// 次の選択肢(/未読)まで進むが有効か
		this.hTmp['sn.auto.enabled'] = false;	// 自動読みすすみモードかどうか

		this.hTmp['const.sn.last_page_text'] = '';

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
		this.hTmp['const.sn.displayState'] = false;
			// const.flash.display.Stage.displayState

		const win: any = window;
		const ac = win['AudioContext'] || win['webkitAudioContext'];
		this.hTmp['const.sn.needClick2Play'] = ()=> new ac().state == 'suspended';
		this.hTmp['const.Date.getTime'] = ()=> (new Date).getTime();
		this.hTmp['const.Date.getDateStr'] = ()=> getDateStr();
		this.hTmp['const.Stage.mouseX'] = ()=> {
//			return stage.mouseX;
			return 0;
		};
		this.hTmp['const.Stage.mouseY'] = ()=> {
//			return stage.mouseY;
			return 0;
		};

		this.hTmp['const.sn.platform.os.family'] = platform.os.family;

// TODO: CmnLib.osName

		this.clearsysvar();
		this.clearvar();

		// prj.json
		this.hTmp['const.sn.config.window.width'] = cfg.oCfg.window.width;
		this.hTmp['const.sn.config.window.height']= cfg.oCfg.window.height;
			// AIRNovel の const.sn.xmlConfig.window.width、.height
			// NOTE: AIRNovel の const.flash.display.Stage.stageWidth は未定
			// 使うならここで初期化だろうと
		this.hTmp['const.sn.config.book.title'] = cfg.oCfg.book.title;
		this.hTmp['const.sn.config.book.version'] = cfg.oCfg.book.version;

		this.hTmp['const.sn.Math.PI'] = Math.PI;
	}


	private	data	: IData4Vari	= {sys:{}, mark:{}, kidoku:{}};
	private	hSys	: any;
	private	hAreaKidoku	: {[name: string]: Areas}	= {};
	setSys(sys: ISysBase) {
		sys.initVal(this.data, this.hTmp, data=> {
			this.data = data;
			this.hSys = this.hScope.sys = this.data.sys;

			for (const fn in this.data.kidoku) {
				const areas = new Areas();
				areas.hAreas = {...this.data.kidoku[fn]};
				this.hAreaKidoku[fn] = areas;
			}

			sessionStorage.clear();
			this.flush_ = (this.cfg.oCfg.debug.variable)
				? ()=> {
					const oSys: any = {};
					Object.keys(this.hSys).map(k=> {
						const v = this.hSys[k];
						oSys['sys:'+ k] = (v instanceof Function) ?v(): v;
					});
					sessionStorage[this.cfg.oCfg.save_ns +' - sys'] = JSON.stringify(oSys);

					const oSave: any = {};
					Object.keys(this.hSave).map(k=> {
						const v = this.hSave[k];
						oSave['save:'+ k] = (v instanceof Function) ?v(): v;
					});
					sessionStorage[this.cfg.oCfg.save_ns +' - save'] = JSON.stringify(oSave);

					const oTmp: any = {};
					Object.keys(this.hTmp).map(k=> {
						const v = this.hTmp[k];
						oTmp[k] = (v instanceof Function) ?v(): v;
					});
					sessionStorage[this.cfg.oCfg.save_ns +' - tmp'] = JSON.stringify(oTmp);

					const oMp: any = {};
					Object.keys(this.hScope.mp).map(k=> {
						const v = this.hScope.mp[k];
						oMp[k] = (v instanceof Function) ?v(): v;
					});
					sessionStorage[this.cfg.oCfg.save_ns +' - mp'] = JSON.stringify(oMp);

					const oMark: any = {};
					Object.keys(this.data.mark).map(k=> {
						const v = this.data.mark[k];
						oMark[k] = (v instanceof Function) ?v(): v;
					});
					sessionStorage[this.cfg.oCfg.save_ns +' - mark'] = JSON.stringify(oMark);

					const oKidoku: any = {};
					Object.keys(this.data.kidoku).map(k=> {
						const v = this.data.kidoku[k];
						oKidoku[k] = (v instanceof Function) ?v(): v;
					});
					sessionStorage[this.cfg.oCfg.save_ns +' - kidoku'] = JSON.stringify(oKidoku);

					sys.flush();
				}
				: ()=> sys.flush();
		});
	}
	private flush_	= ()=> {};
	flush() {this.flush_();}	// 先にこのメソッドへの参照を配ってしまうので、中身を入れ替える

	defTmp(name: string, fnc: typeProcVal): void {this.hTmp[name] = fnc;};
	cloneMp(): object {return {...this.hScope.mp}}
	setMp(mp: object) {this.hScope.mp = mp;}
	setMark(place: number, mark: IMark) {this.data.mark[place] = mark; this.flush()}
	readonly	getMark = (place: number)=> this.data.mark[place];
	cloneSave(): object {return {...this.hScope.save}}
	mark2save(mark: IMark) {
		this.hSave = this.hScope.save = {...mark.hSave};
		this.hSave['const.sn.sLog'] += '\f';
			// 吉里吉里に動作を合わせる
			// 改ページは履歴がページからあふれるため
	}


	// 既読系
	loadScrWork(fn: string): void {
		if (! (fn in this.hAreaKidoku)) this.hAreaKidoku[fn] = new Areas;
	}
	getAreaKidoku = (fn: string): Areas=> this.hAreaKidoku[fn];
	saveKidoku(): void {
		for (const fn in this.hAreaKidoku) {
			this.data.kidoku[fn] = {...this.hAreaKidoku[fn].hAreas};
		}
		this.flush();
	}


		// しおり
	// しおりの複写
	private copybookmark(hArg: HArg) {
		if (! ('from' in hArg)) throw 'fromは必須です';
		if (! ('to' in hArg)) throw 'toは必須です';

		const from = Number(hArg.from);
		const to = Number(hArg.to);
		if (from != to) this.setMark(to, {...this.data.mark[from]});

		return false;
	}

	// しおりの消去
	private erasebookmark(hArg: HArg) {
		const place = hArg.place;
		if (! place) throw 'placeは必須です';

		delete this.data.mark[place];
		this.flush();

		return false;
	}


		//	変数操作
	// 変数代入・演算
	private let(hArg: HArg) {
		if (! hArg.name) throw 'nameは必須です';

		let autocast = true;
		if (hArg.cast) {
			//switch (trim(hArg.cast)) {
			switch (hArg.cast) {
			case 'num':
				CmnLib.argChk_Num(hArg, 'text', NaN);
				break;
			case 'int':
				hArg.text = String(int(CmnLib.argChk_Num(hArg, 'text', NaN)));
				break;
			case 'uint':
				hArg.text = String(uint(CmnLib.argChk_Num(hArg, 'text', NaN)));
				break;
			case 'bool':
				CmnLib.argChk_Boolean(hArg, 'text', false);
				break;
			case 'str':
				autocast = false;
				break;
			default:
				throw 'cast【'+ hArg.cast +'】は未定義です';
			}
		}

		this.setVal(hArg.name, hArg.text, autocast);

		return false;
	}

	// 絶対値
	private let_abs(hArg: HArg) {
		const n = CmnLib.argChk_Num(hArg, 'text', 0);
		//hArg.text = Math.abs(n);
		hArg.text = String((n < 0) ?-n :n);
			// JavaScriptのMath.abs()で絶対値を取得しないほうが良い理由 | iwb.jp https://iwb.jp/javascript-math-abs-deprecated/
			// 数値以外だとほとんどがNaNを返し、booleanは0や1を返しているため使い方によってはバグの原因になることがある。
		this.let(hArg);

		return false;
	}

	// 文字列から一字取りだし
	private let_char_at(hArg: HArg) {
		hArg.text = (hArg.text || '').charAt(CmnLib.argChk_Num(hArg, 'pos', 0));
		this.let(hArg);

		return false;
	}

	// 文字列で検索
	private let_index_of(hArg: HArg) {
		const val = hArg.val;
		if (! val) throw 'valは必須です';
		const start = CmnLib.argChk_Num(hArg, 'start', 0);

		hArg.text = String((hArg.text || '').indexOf(val, start));
		this.let(hArg);

		return false;
	}

	// 文字列の長さ
	private let_length(hArg: HArg) {
		hArg.text = String((hArg.text || '').length);
		this.let(hArg);

		return false;
	}

	// 正規表現で置換
	private let_replace(hArg: HArg) {
		if (! hArg.reg) throw 'regは必須です';

		const flags = hArg.flags;
		const reg = (! flags)
			? new RegExp(hArg.reg)
			: new RegExp(hArg.reg, flags);
		hArg.text = String(hArg.text || '').replace(reg, String(hArg.val));
		this.let(hArg);

		return false;
	}

	// 四捨五入
	private let_round(hArg: HArg) {
		const n = CmnLib.argChk_Num(hArg, 'text', 0);
		hArg.text = String(Math.round(n));
		this.let(hArg);

		return false;
	}

	// 正規表現で検索
	private let_search(hArg: HArg) {
		if (! hArg.reg) throw 'regは必須です';

		const flags = hArg.flags;
		const reg = (! flags)
			? new RegExp(hArg.reg)
			: new RegExp(hArg.reg, flags);
		hArg.text = String((hArg.text || '').search(reg));
		this.let(hArg);

		return false;
	}

	// 文字列から抜きだし
	private let_substr(hArg: HArg) {
		const i = CmnLib.argChk_Num(hArg, 'pos', 0);
		hArg.text = (hArg.len != 'all')
			? (hArg.text || '').substr(i, int(CmnLib.argChk_Num(hArg, 'len', 1)))
			: (hArg.text || '').substr(i);
		this.let(hArg);

		return false;
	}


// デバッグ・その他
	// システム変数の全消去
	private clearsysvar() {
		const sys = this.hSys = this.hScope['sys'] = this.data.sys
			= {};

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
		this.setVal_Nochk('sys', 'sn.auto.msecPageWait', CmnLib.argChk_Num(sys, 'sn.auto.msecPageWait', this.cfg.oCfg.init.auto_msecpagewait || 3500));
		this.setVal_Nochk('sys', 'sn.auto.msecPageWait_Kidoku', CmnLib.argChk_Num(sys, 'sn.auto.msecPageWait', this.cfg.oCfg.init.auto_msecpagewait || 3500));
		// 自動読みすすみモード時の行クリック待ち時のウェイト
		this.setVal_Nochk('sys', 'sn.auto.msecLineWait', 500);
		this.setVal_Nochk('sys', 'sn.auto.msecLineWait_Kidoku', 500);	// 【既読】

		//	SoundMixer.soundTransform = new SoundTransform(
		//		(sys['flash.media.SoundMixer.soundTransform.volume'] = 1)
		//	);
		this.setVal_Nochk('sys', 'const.sn.sound.BGM.volume', 1);
		this.setVal_Nochk('sys', 'const.sn.sound.SE.volume', 1);
		this.setVal_Nochk('sys', 'const.sn.sound.SYS.volume', 1);
		for (const fn in this.data.kidoku) this.data.kidoku[fn].hAreas = {};


		this.setVal_Nochk('sys', 'TextLayer.Back.Alpha', 1);
		this.flush();

		return false;
	}

	// ゲーム変数の全消去
	private clearvar() {
		const mesLayer	= this.hSave['const.sn.mesLayer'] || '';
		const doRecLog	= this.hSave['sn.doRecLog'] || false;
		const sLog		= this.hSave['const.sn.sLog'] || '';

		this.hSave = this.hScope.save = {};

		this.setVal_Nochk('save', 'const.sn.mesLayer', mesLayer);
		this.setVal_Nochk('save', 'sn.doRecLog', doRecLog);
		this.setVal_Nochk('save', 'const.sn.sLog', sLog);

		return false;
	}

	private readonly setVal = (arg_name: string, val: any, autocast = true)=> {
		if (! arg_name) throw '[変数に値セット] nameは必須です';
		if (val == null) throw '[変数に値セット] textは必須です（空文字はOK）';

		const o = PropParser.getValName(arg_name);
		if (o == undefined) throw '[変数参照] name('+ arg_name +')が変数名として異常です';

		const hScope = this.hScope[o.scope];
		if (! hScope) throw '[変数に値セット] scopeが異常【'+ o.scope +'】です';

		const nm = o['name'];
		if (nm.slice(0, 6) == 'const.' && (nm in hScope)) {
			throw '[変数に値セット] 変数【'+ nm +'】は書き換え不可です';
		}

		this.setVal_Nochk(o.scope, nm, val, autocast);
	}
	setVal_Nochk(scope: string, nm: string, val: any, autocast = false) {
		const hScope = this.hScope[scope];
		if (autocast) val = this.castAuto(val);
		hScope[nm] = val;

		const trg = this.hValTrg[scope +':'+ nm];
		if (trg != null) trg(nm, val);

		// if (scope == 'sys') this.flush()
			// 厳密にはここですべきだが、パフォーマンスに問題があるので
			// クリック待ちを期待できるwait、waitclick、s、l、pタグで
			// saveKidoku()をコール。（中で保存しているのでついでに）

		//console.log(`\tlet s[${scope}] n[${nm}]='${val}' trg[${(trg != null)}]`);
	}

	readonly getVal = (arg_name: string, def?: number | string)=> {
		if (! arg_name) throw '[変数参照] nameは必須です';

		const o = PropParser.getValName(arg_name);
		if (o == undefined) throw '[変数参照] name('+ arg_name +')が変数名として異常です';

		const hScope = this.hScope[o['scope']];
		if (! hScope) throw '[変数参照] scopeが異常【'+ o['scope'] +'】です';

		const name = o['name'];
		if ((! (name in hScope)) && def != undefined) hScope[name] = def;
		let val = hScope[name];
		if (val instanceof Function) val = (val as Function)();
		//console.log('\tget ['+ arg_name +'] -> s['+ o['scope'] +'] a['+ o['at'] +'] n['+ name +'] ret['+ val +']('+ typeof val +')');

		if (o['at'] == '@str') return val;

		return this.castAuto(val);
	}

	private castAuto(val: Object): any {
		const s_val = val as string;
		if (s_val == 'true') return true;
		if (s_val == 'false') return false;
		if (s_val == 'null') return null;
		if (s_val == 'undefined') return undefined;
		this.REG_NUMERICLITERAL.lastIndex = 0;
		if (this.REG_NUMERICLITERAL.test(s_val)) return parseFloat(s_val);

		return val;
	}
	private REG_NUMERICLITERAL	:RegExp	= /^-?[\d\.]+$/;


	// 変数のダンプ
	private readonly dump_val = ()=> {
		const val: any = {tmp:{}, sys:{}, save:{}, mp:{}};
		for (let scope in val) {
			const hVal = this.hScope[scope];
			const hRet = val[scope];
			for (let key in hVal) {
				const v = hVal[key];
				if (Object.prototype.toString.call(v) == '[object Function]') {
					hRet[key] = v();
				}
				else hRet[key] = v;
			}
		}
		console.info('🥟 [dump_val]', val);

		return false;
	}


	private hValTrg	: {[name: string]: ISetVal}	= {
		// sys
		'sys:sn.tagCh.doWait'			: name=>
			this.runFirst_Bool_hSysVal_true(name),
		'sys:sn.tagCh.doWait_Kidoku'	: name=>
			this.runFirst_Bool_hSysVal_true(name),
		'sys:sn.tagCh.msecWait'			: name=>
			this.runFirst_sys_an_tagCh_msecWait(name),
		'sys:sn.tagCh.msecWait_Kidoku'	: name=>
				this.runFirst_sys_an_tagCh_msecWait_Kidoku(name),
		'sys:sn.tagCh.canskip'			: name=>
			this.runFirst_Bool_hSysVal_true(name),

		'sys:sn.auto.msecPageWait'			: name=>
			this.runFirst_sys_an_auto_msecPageWait(name),
		'sys:sn.auto.msecPageWait_Kidoku'	: name=>
				this.runFirst_sys_an_auto_msecPageWait(name),
		'sys:sn.auto.msecLineWait'			: name=>
			this.runFirst_sys_an_auto_msecLineWait(name),
		'sys:sn.auto.msecLineWait_Kidoku'	: name=>
				this.runFirst_sys_an_auto_msecLineWait(name),

		// save
		'save:sn.doRecLog'		: name=>
			this.runFirst_Bool_hSaveVal_true(name),
		'save:sn.userFnTail'	: (_name, val)=> this.cfg.userFnTail = val,

		// tmp
		'tmp:sn.tagL.enabled'	: name=>
			this.runFirst_Bool_hTmp_true(name),
		'tmp:sn.skip.all'		: name=>
			this.runFirst_Bool_hTmp_false(name),
		'tmp:sn.skip.enabled'	: name=>
			this.runFirst_Bool_hTmp_false(name),
		'tmp:sn.auto.enabled'	: name=>
			this.runFirst_Bool_hTmp_false(name),
		'tmp:flash.desktop.NativeApplication.nativeApplication.systemIdleMode'	: (
			()=>
				 {
			//	NativeApplication.nativeApplication.systemIdleMode = val;
			}
		),
		'tmp:sn.chkFontMode'
		: ()=> {
			if (this.hTmp['const.sn.onLauncher']) return;
			if (! this.hTmp['const.sn.isDebugger']) return;

			//	Hyphenation.chkFontMode = CmnLib.argChk_Boolean(this.hTmp, name, true)
		}
	};
	defValTrg(name: string, fnc: ISetVal) {this.hValTrg[name] = fnc;}
	private runFirst_Bool_hSysVal_true(name: string): void {
			CmnLib.argChk_Boolean(this.hSys, name, true);
		}
	private runFirst_sys_an_tagCh_msecWait(name: string): void {
			CmnLib.argChk_Num(this.hSys, name, 10);
			if (this.hSys['sn.tagCh.doWait']) {
//				LayerMng.msecChWait = this.hSysVal[name];
			}
		}
	private runFirst_sys_an_tagCh_msecWait_Kidoku(name: string): void {
		CmnLib.argChk_Num(this.hSys, name,
			(this.cfg.oCfg.init.tagch_msecwait == undefined)
				? 10
				: this.cfg.oCfg.init.tagch_msecwait
		);
		if (this.hSys['sn.tagCh.doWait_Kidoku']) {
//			LayerMng.msecChWait = this.hSysVal[name];
		}
	}
	private runFirst_sys_an_auto_msecPageWait(name: string): void {
		CmnLib.argChk_Num(this.hSys, name,
			(this.cfg.oCfg.init.auto_msecpagewait == undefined)
				? 3500
				: this.cfg.oCfg.init.auto_msecpagewait
		);
	}
	private runFirst_sys_an_auto_msecLineWait(name: string): void {
		CmnLib.argChk_Num(this.hSys, name, 500);
	}

	private runFirst_Bool_hSaveVal_true(name: string): void {
		CmnLib.argChk_Boolean(this.hSave, name, true);
	}

	private runFirst_Bool_hTmp_true(name: string): void {
		CmnLib.argChk_Boolean(this.hTmp, name, true);
	}
	private runFirst_Bool_hTmp_false(name: string): void {
		CmnLib.argChk_Boolean(this.hTmp, name, false);
	}

};
