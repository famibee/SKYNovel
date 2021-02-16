/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2021 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import { SysBase } from "./SysBase";
import {CmnLib, getDateStr, argChk_Boolean, argChk_Num} from './CmnLib';
import {IConfig, IHTag, IVariable, IMain, HArg, ITag, IFn2Path, IData4Vari} from './CmnInterface';
import {Main} from './Main';

import {set, get} from 'store';
import {Application} from 'pixi.js';
import 'devtools-detect';

export class SysWeb extends SysBase {
	private	path_base	= '';
	constructor(hPlg = {}, arg = {cur: 'prj/', crypto: false, dip: ''}) {
		super(hPlg, arg);

		const a = arg.cur.split('/');
		this.path_base = (a.length > 2) ? a.slice(0, -2).join('/') +'/' :'';

		globalThis.onload = ()=> {
			// 全画面状態切替
			const tgl_full_scr = ('requestFullscreen' in document.body)
			? ()=> {
				((this.isFullScr = ! Boolean(document.fullscreenElement))
				? document.body.requestFullscreen()
				: document.exitFullscreen())
				.then(()=> this.resizeFramesWork())
			}
			: ()=> {
				const doc: any = document;
				((this.isFullScr = ! Boolean(doc.webkitFullscreenElement))
				? doc.body.webkitRequestFullscreen()
				: doc.webkitCancelFullScreen())
				.then(()=> this.resizeFramesWork())
			};
			this.tgl_full_scr = (hArg: HArg)=> {
				if (! hArg.key) {tgl_full_scr(); return false;}

				const key = hArg.key.toLowerCase();
				document.addEventListener('keydown', (e: KeyboardEvent)=> {
					const key2 = (e.altKey ?(e.key === 'Alt' ?'' :'alt+') :'')
					+	(e.ctrlKey ?(e.key === 'Control' ?'' :'ctrl+') :'')
					+	(e.shiftKey ?(e.key === 'Shift' ?'' :'shift+') :'')
					+	e.key.toLowerCase();
					if (key2 !== key) return;

					e.stopPropagation();
					tgl_full_scr();
				}, {passive: true});

				return false;
			};

			document.querySelectorAll('[data-prj]').forEach(v=> {
				const elm = v.attributes.getNamedItem('data-prj');
				if (elm) v.addEventListener('click', ()=> this.runSN(elm.value), {passive: true});
			});
			document.querySelectorAll('[data-reload]').forEach(v=>
				v.addEventListener('click', ()=> this.run(), {passive: true})
			);
			if (arg.dip) CmnLib.hDip = JSON.parse(arg.dip);

			const sp = new URLSearchParams(location.search);
			const dip = sp.get('dip');	// ディップスイッチ
			if (dip) CmnLib.hDip = {...CmnLib.hDip, ...JSON.parse(dip.replace(/%2C/g, ','))};
			if (! argChk_Boolean(CmnLib.hDip, 'oninit_run', true)) return;

			if (argChk_Boolean(CmnLib.hDip, 'dbg', false)) this.isDbg = ()=> true;
			this.extPort = argChk_Num(CmnLib.hDip, 'port', this.extPort);

			const cur = sp.get('cur');
			if (cur) arg.cur = this.path_base + cur +'/';
			this.run();
		}
	}
	private resizeFramesWork() {
		const is_fs = this.isFullScr;	// この状態へ移行する
		//this.reso4frame = this.$isFullScr ?1 :screen.width /CmnLib.stageW;
			// 全画面を使う

		const ratioWidth  = screen.width  / CmnLib.stageW;
		const ratioHeight = screen.height / CmnLib.stageH;
		const ratio = (ratioWidth < ratioHeight) ?ratioWidth :ratioHeight;
		this.reso4frame = is_fs ?ratio :1;
			// document.body.clientWidth が時々正しい値を返さないのでscreen.widthで
		this.ofsLeft4frm = is_fs
			? (screen.width -CmnLib.stageW *this.reso4frame *CmnLib.cvsScale) /2
			: 0;
		this.ofsTop4frm  = is_fs
			? (screen.height-CmnLib.stageH *this.reso4frame *CmnLib.cvsScale) /2
			: 0;
		this.resizeFrames();
	}
	private isFullScr	= false;

	private now_prj		= ':';
	runSN(prj: string) {
		this.arg.cur = this.path_base + prj +'/';
		if (this.now_prj === this.arg.cur) return;

		this.now_prj = this.arg.cur;
		this.run();
	}
	protected	run = async ()=> {
		if (this.main) {
			const ms_late = 10;	// NOTE: ギャラリーでのえもふり/Live 2D用・魔法数字
			this.main.destroy(ms_late);
			await new Promise(r=> setTimeout(r, ms_late));
		}

		this.main = new Main(this);
	}
	stop() {
		if (! this.main) return;
		this.main.destroy();
		this.main = null;
	}
	private main: Main | null;


	loadPathAndVal(hPathFn2Exts: IFn2Path, fncLoaded: ()=> void, cfg: IConfig) {
		super.loadPathAndVal(hPathFn2Exts, fncLoaded, cfg);
		(async ()=> {
			const fn = this.arg.cur +'path.json';
			const res = await fetch(fn);
			if (! res.ok) throw Error(res.statusText);

			const mes = await res.text();
			const json = JSON.parse(await this.pre(fn, mes));
			for (const nm in json) {
				const h = hPathFn2Exts[nm] = json[nm];
				for (const ext in h) if (ext !== ':cnt') h[ext] = this.arg.cur + h[ext];
			}
			fncLoaded();	// ここでnew Variable、clearsysvar()、次にinitVal()
		})();
	}

	initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari)=> void) {
		// システム情報
		const hn = document.location.hostname;
		hTmp['const.sn.isDebugger'] = (hn === 'localhost' || hn ==='127.0.0.1');

		this.val.defTmp('const.sn.displayState', ()=> this.isFullScr);

		const ns = this.cfg.getNs();
		this.flush = this.crypto
		? ()=> {
			set(ns +'sys_', String(this.enc(JSON.stringify(this.data.sys))));
			set(ns +'mark_', String(this.enc(JSON.stringify(this.data.mark))));
			set(ns +'kidoku_', String(this.enc(JSON.stringify(this.data.kidoku))));
		}
		: ()=> {
			set(ns +'sys', this.data.sys);
			set(ns +'mark', this.data.mark);
			set(ns +'kidoku', this.data.kidoku);
		};
		const nm = ns +(this.arg.crypto ?'sys_' :'sys');
		if (hTmp['const.sn.isFirstBoot'] = (get(nm) === undefined)) {
			// データがない（初回起動）場合の処理
			this.data.sys = data.sys;
			this.data.mark = data.mark;
			this.data.kidoku = data.kidoku;
			this.flush();	// 初期化なのでここのみ必要
			comp(this.data);
			return;
		}

		// データがある場合の処理
		if (! this.crypto) {
			this.data.sys = get(ns +'sys');
			this.data.mark = get(ns +'mark');
			this.data.kidoku = get(ns +'kidoku');
			comp(this.data);
			return;
		}

		(async ()=> {
			let mes = '';
			try {
				mes = 'sys';	// tst sys
				this.data.sys = JSON.parse(
					await this.pre('json', get(ns +'sys_'))
				);
				mes += Number(this.val.getVal('sys:TextLayer.Back.Alpha', 1));
				mes = 'mark';	// tst mark
				this.data.mark = JSON.parse(
					await this.pre('json', get(ns +'mark_'))
				);
				mes = 'kidoku';	// tst kidoku
				this.data.kidoku = JSON.parse(
					await this.pre('json', get(ns +'kidoku_'))
				);
			} catch (e) {
				console.error(`セーブデータ（${mes}）が壊れています。一度クリアする必要があります %o`, e);
			}
			comp(this.data);
		})();
	}

	init(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain) {
		super.init(hTag, appPixi, val, main);

		if (! this.cfg.oCfg.debug.devtool) window.addEventListener('devtoolschange', e=> {
			if (! e.detail.isOpen) return;
			console.error(`DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。`);
			main.destroy();
		}, {once: true, passive: true});
	}

	pathBaseCnvSnPath4Dbg = '${pathbase}/';

	// プレイデータをエクスポート
	protected readonly	_export: ITag = ()=> {
		const s = JSON.stringify({
			'sys': this.data.sys,
			'mark': this.data.mark,
			'kidoku': this.data.kidoku,
		});
		const s2 = this.crypto ?String(this.enc(s)) :s;
		const blob = new Blob([s2], {'type':'text/json'});

		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = (this.crypto ?'' :'no_crypto_')
			+ this.cfg.getNs() + getDateStr('-', '_', '') +'.swpd';
		a.click();

		if (CmnLib.debugLog) console.log('プレイデータをエクスポートしました');
		setTimeout(()=> this.fire('sn:exported', new Event('click')), 10);

		return false;
	}

	// プレイデータをインポート
	protected readonly	_import: ITag = ()=> {
		new Promise((rs, rj)=> {
			const inp = document.createElement('input');
			inp.type = 'file';
			inp.accept = '.swpd, text/plain';
			inp.onchange = ()=> {if (inp.files) rs(inp.files[0].path); else rj();};
			inp.click();
		})
		.then((file: any)=> new Promise(rs=> {
			const rd = new FileReader();
			rd.readAsText(file);
			rd.onload = ()=> rs(rd.result);
		}))
		.then(async (s: string)=> {
			const o = JSON.parse(this.crypto ?await this.pre('json', s) :s);
			if (! o.sys || ! o.mark || ! o.kidoku) throw new Error('異常なプレイデータです');
			if (o.sys[SysBase.VALNM_CFG_NS] !== this.cfg.oCfg.save_ns) {
				console.error(`別のゲーム【プロジェクト名=${o.sys[SysBase.VALNM_CFG_NS]}】のプレイデータです`);
				return;
			}

			this.data.sys = o.sys;
			this.data.mark = o.mark;
			this.data.kidoku = o.kidoku;
			this.flush();
			this.val.updateData(o);

			if (CmnLib.debugLog) console.log('プレイデータをインポートしました');
			this.fire('sn:imported', new Event('click'));
		})
		.catch(e=> console.error(`異常なプレイデータです ${e.message}`));

		return false;
	}


	// ＵＲＬを開く
	protected readonly	navigate_to: ITag = hArg=> {
		const url = hArg.url;
		if (! url) throw '[navigate_to] urlは必須です';
	//	globalThis.open(url);		// 近年セキュリティ的に効かない
		globalThis.open(url, '_blank');		// 効くがポップアップブロック
	//	location.href = url;	// これは効くがSKYNovelが終了してしまう

		return false;
	}
	// タイトル指定
	protected titleSub(txt: string) {
		document.title = txt;
		document.querySelectorAll('[data-title]').forEach(v=> v.textContent = txt);
	}


	async savePic(fn: string, data_url: string) {
		const a = document.createElement('a');
		a.href = data_url;
		a.download = fn;
		a.click();
		if (CmnLib.debugLog) console.log('画像ファイルをダウンロードします');
	}

	private	readonly	hAppendFile: {[path: string]: string} = {};
	async appendFile(path: string, data: any, _callback: (err: NodeJS.ErrnoException)=> void) {
		const txt = (this.hAppendFile[path] ?? '') + data;
		this.hAppendFile[path] = txt;

		const blob = new Blob([txt], {'type':'text/json'});
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = path;
		a.click();
	}

}
