/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import { SysBase } from "./SysBase";
import {CmnLib, getDateStr, argChk_Boolean} from './CmnLib';
import {IConfig, IHTag, IVariable, IMain, HArg, ITag, IFn2Path, IData4Vari} from './CmnInterface';
import {Main} from './Main';

import {set, get} from 'store';
import {Application} from 'pixi.js';
import 'devtools-detect';

export class SysWeb extends SysBase {
	constructor(hPlg = {}, arg = {cur: 'prj/', crypto: false, dip: ''}) {
		super(hPlg, arg);

		const idxCur = arg.cur.lastIndexOf('/', arg.cur.length -2);
		this.def_prj = arg.cur.slice(idxCur +1, -1);
		//	(idxCur === -1)
		//	? arg.cur.slice(0, -1)
		//	: arg.cur.slice(idxCur +1, -1);

		globalThis.onload = ()=> {
			document.querySelectorAll('[data-prj]').forEach(v=> {
				v.addEventListener('click', ()=> {
					const elm = v.attributes.getNamedItem('data-prj');
					if (! elm) return;
					const prj = elm.value;
					if (this.now_prj !== prj) this.run(prj);
				}, {passive: true});
			});
			document.querySelectorAll('[data-reload]').forEach(v=> {
				v.addEventListener('click', ()=> this.run(this.now_prj), {passive: true});
			});
			if (arg.dip) CmnLib.hDip = JSON.parse(arg.dip);
			const sp = new URLSearchParams(location.search);
			const dip = sp.get('dip');	// ディップスイッチ
			if (dip) CmnLib.hDip = {...CmnLib.hDip, ...JSON.parse(dip)};
			if (! argChk_Boolean(CmnLib.hDip, 'oninit_run', true)) return;
			this.run(sp.get('cur') ?? '');
		}

		if ('webkitFullscreenEnabled' in document) this.tgl_full_scr = o=> this.regEvt_FullScr(
			o,	//Chrome15+, Safari5.1+, Opera15+
			'webkitRequestFullscreen',
			'webkitCancelFullScreen',
			'webkitFullscreenElement'
		);
		else if ('mozFullScreenEnabled' in document) this.tgl_full_scr = o=> this.regEvt_FullScr(
			o,	//FF10+
			'mozRequestFullScreen',
			'mozCancelFullScreen',
			'mozFullScreenElement'
		);
		else if ('msFullscreenEnabled' in document) this.tgl_full_scr = o=> this.regEvt_FullScr(
			o,	//IE11+
			'msRequestFullscreen',
			'msExitFullscreen',
			'msFullscreenElement'
		);
		else if (document['fullscreenEnabled']) this.tgl_full_scr = o=> this.regEvt_FullScr(
			o,	// HTML5 Fullscreen API仕様
			'requestFullscreen',
			'exitFullscreen',
			'fullscreenElement'
		);
	}
	private def_prj = 'prj';
	private	readonly	run = async (prj: string)=> {
		if (this.main) {
			const ms_late = 10;	// NOTE: ギャラリーでのえもふり/Live 2D用・魔法数字
			this.main.destroy(ms_late);
			await new Promise(r=> setTimeout(r, ms_late));
		}

		this.now_prj = prj || this.def_prj;
		const idxEnd = this.arg.cur.lastIndexOf('/', this.arg.cur.length -2) +1;
		const idxStart = this.arg.cur.lastIndexOf('/', idxEnd -2) +1;
		this.arg.cur = location.href.slice(0, location.href.lastIndexOf('/') +1)
			+ (idxEnd === 0 ?'' :this.arg.cur.slice(idxStart, idxEnd))
			+ this.now_prj +'/';
		this.main = new Main(this);
	}
	stop() {
		if (! this.main) return;
		this.main.destroy();
		this.main = null;
	}
	private now_prj = ':';
	private main: Main | null;


	loadPathAndVal(hPathFn2Exts: IFn2Path, fncLoaded: ()=> void, cfg: IConfig): void {
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

		this.val.defTmp('const.sn.displayState', ()=> this.isFullScr());

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

	init(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): void {
		super.init(hTag, appPixi, val, main);

		if (! this.cfg.oCfg.debug.devtool) window.addEventListener('devtoolschange', e=> {
			if (! e.detail.isOpen) return;
			console.error(`DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。`);
			main.destroy();
		}, {once: true, passive: true});
	}

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
		for (const v of document.querySelectorAll('[data-title]')) v.textContent = txt;
	}
	// 全画面状態切替（タグではない手段で提供）
	private readonly isFullScr = ()=> ('webkitFullscreenElement' in document)
		? document['webkitFullscreenElement']	// Safari
		: document.fullscreen;
	private regEvt_FullScr(hArg: HArg, go_fnc_name: string, exit_fnc_name: string, get_fnc_name: string): boolean {
		const elm: any = document.body;
		const doc: any = document;
		if (! hArg.key) {
			if (doc[get_fnc_name]) doc[exit_fnc_name]();
			else elm[go_fnc_name]();
			this.resizeFramesWork();

			return false;
		}

		const key = hArg.key.toLowerCase();
		doc.addEventListener('keydown', (e: KeyboardEvent)=> {
			const key2 = (e.altKey ?(e.key === 'Alt' ?'' :'alt+') :'')
			+	(e.ctrlKey ?(e.key === 'Control' ?'' :'ctrl+') :'')
			+	(e.shiftKey ?(e.key === 'Shift' ?'' :'shift+') :'')
			+	e.key.toLowerCase();
			if (key2 !== key) return;

			e.stopPropagation();
			if (doc[get_fnc_name]) doc[exit_fnc_name]();
			else elm[go_fnc_name]();
			this.resizeFramesWork();
		}, {passive: true});

		return false;
	}
	private resizeFramesWork() {
		const is_fs = this.isFullScr();
		//this.reso4frame = is_fs ?screen.width /CmnLib.stageW :1;
			// 全画面を使う

		const ratioWidth  = screen.width  / CmnLib.stageW;
		const ratioHeight = screen.height / CmnLib.stageH;
		const ratio = (ratioWidth < ratioHeight) ?ratioWidth :ratioHeight;
		this.reso4frame = is_fs ?1 :ratio;
			// document.body.clientWidth が時々正しい値を返さないのでscreen.widthで
		this.ofsLeft4frm = is_fs ?0 :(screen.width -CmnLib.stageW *this.reso4frame *CmnLib.cvsScale) /2;
		this.ofsTop4frm  = is_fs ?0 :(screen.height -CmnLib.stageH *this.reso4frame *CmnLib.cvsScale) /2;
		this.resizeFrames();
	}


	readonly	readFile = (path: string, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void)=> {
		fetch(path)	//fetch(path, {mode: 'same-origin'})
		.then(res=> {
			if (! res.ok) throw Error(res.statusText);

			callback(null, Buffer.from(res.text()));
		})
		.catch(e=> console.error('Error:', e));
	};

	readonly	savePic = (fn: string, data_url: string)=> {
		const a = document.createElement('a');
		a.href = data_url;
		a.download = fn;
		a.click();
		if (CmnLib.debugLog) console.log('画像ファイルをダウンロードします');
	};

	private	readonly	hAppendFile: {[path: string]: string} = {};
	readonly	appendFile = (path: string, data: any, _callback: (err: NodeJS.ErrnoException)=> void)=> {
		const txt = (this.hAppendFile[path] ?? '') + data;
		this.hAppendFile[path] = txt;

		const blob = new Blob([txt], {'type':'text/json'});
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = path;
		a.click();
	};

}
