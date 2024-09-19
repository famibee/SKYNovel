/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {SysBase} from "./SysBase";
import {CmnLib, getDateStr, argChk_Boolean, argChk_Num} from './CmnLib';
import {IHTag, ITag} from './Grammar';
import {IVariable, IMain, IData4Vari, HPlugin, HSysBaseArg} from './CmnInterface';
import {Main} from './Main';

import store from 'store';
import {Application} from 'pixi.js';
import 'devtools-detect';
import {IFn2Path, IConfig} from './ConfigBase';


export class SysWeb extends SysBase {
	#path_base	= '';
	constructor(hPlg = {}, arg = {cur: 'prj/', crypto: false, dip: ''}) {
		super(hPlg, arg);

		const a = arg.cur.split('/');
		this.#path_base = (a.length > 2) ? a.slice(0, -2).join('/') +'/' :'';

		globalThis.onload = async ()=> this.loaded(hPlg, arg);
	}
	protected override async loaded(hPlg: HPlugin, arg: HSysBaseArg) {
		await super.loaded(hPlg, arg);

		document.querySelectorAll('[data-prj]').forEach(v=> {
			const elm = v.attributes.getNamedItem('data-prj');
			if (elm) v.addEventListener('click', ()=> this.runSN(elm.value), {passive: true});
			//if (elm) this.elc.add(v, 'click', ()=> this.runSN(elm.value), {passive: true});
				// ギャラリーであっても、ここには一度しか来ないので
		});
		document.querySelectorAll('[data-reload]').forEach(v=>
			v.addEventListener('click', ()=> this.run(), {passive: true})
			//this.elc.add(v, 'click', ()=> this.run(), {passive: true})
				// ギャラリーであっても、ここには一度しか来ないので
		);
		if (arg.dip) CmnLib.hDip = JSON.parse(arg.dip);

		const sp = new URLSearchParams(location.search);
		const dip = sp.get('dip');	// ディップスイッチ
		if (dip) CmnLib.hDip = {...CmnLib.hDip, ...JSON.parse(dip.replaceAll(`%2C`, ','))};
		if (! argChk_Boolean(CmnLib.hDip, 'oninit_run', true)) return;

		if (argChk_Boolean(CmnLib.hDip, 'dbg', false)) {
			CmnLib.isDbg = true;
			this.fetch = (url: string, init?: RequestInit)=> fetch(url, {...init,　mode: 'cors'});
		}
		this.extPort = argChk_Num(CmnLib.hDip, 'port', this.extPort);

		const cur = sp.get('cur');
		if (cur) arg.cur = this.#path_base + cur +'/';
		this.run();
	}

	#now_prj	= ':';
	runSN(prj: string) {
		this.arg.cur = this.#path_base + prj +'/';
		if (this.#now_prj === this.arg.cur) return;

		this.#now_prj = this.arg.cur;
		this.run();
	}
	protected	override run = async ()=> {
		if (this.#main) {
			const ms_late = 10;	// NOTE: ギャラリーでのえもふり/Live 2D用・魔法数字
			this.#main.destroy(ms_late);
			await new Promise(rs=> setTimeout(rs, ms_late));
				// clearTimeout()不要と判断
		}

		this.#main = new Main(this);
	}
	stop() {
		if (! this.#main) return;
		this.#main.destroy();
		this.#main = undefined;
	}
	#main: Main | undefined = undefined;


	override async loadPath(hPathFn2Exts: IFn2Path, cfg: IConfig) {
		await super.loadPath(hPathFn2Exts, cfg);

		const fn = this.arg.cur +'path.json';
		const res = await fetch(fn);
		if (! res.ok) throw Error(res.statusText);

		const src = await res.text();
		const oJs = JSON.parse(await this.dec(fn, src));
		for (const [nm, v] of Object.entries(oJs)) {
			const h = hPathFn2Exts[nm] = <any>v;
			for (const [ext, w] of Object.entries(h)) {
				if (ext !== ':cnt') h[ext] = this.arg.cur + w;
			}
		}
	}

	override async	initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari)=> void) {
		// システム情報
		const hn = encodeURIComponent(document.location.hostname);
		hTmp['const.sn.isDebugger'] = (hn === 'localhost' || hn ==='127.0.0.1');

		const ns = this.cfg.getNs();
		this.flushSub = this.crypto
		? async ()=> {
			store.set(ns +'sys_', await this.enc(JSON.stringify(this.data.sys)));
			store.set(ns +'mark_', await this.enc(JSON.stringify(this.data.mark)));
			store.set(ns +'kidoku_',await this.enc(JSON.stringify(this.data.kidoku)));
		}
		: ()=> {
			store.set(ns +'sys', this.data.sys);
			store.set(ns +'mark', this.data.mark);
			store.set(ns +'kidoku', this.data.kidoku);
		};
		const nm = ns +(this.arg.crypto ?'sys_' :'sys');
		if (hTmp['const.sn.isFirstBoot'] = (store.get(nm) === undefined)) {
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
			this.data.sys = store.get(ns +'sys');
			this.data.mark = store.get(ns +'mark');
			this.data.kidoku = store.get(ns +'kidoku');
			comp(this.data);
			return;
		}

		let mes = '';
		try {
			mes = 'sys';	// tst sys
			this.data.sys = JSON.parse(await this.dec('json', store.get(ns +'sys_')));
			mes += Number(this.val.getVal('sys:TextLayer.Back.Alpha', 1));
			mes = 'mark';	// tst mark
			this.data.mark = JSON.parse(await this.dec('json', store.get(ns +'mark_')));
			mes = 'kidoku';	// tst kidoku
			this.data.kidoku = JSON.parse(await this.dec('json', store.get(ns +'kidoku_')));
		} catch (e) {
			console.error(`セーブデータ（${mes}）が壊れています。一度クリアする必要があります(a) %o`, e);
		}
		comp(this.data);
	}

	override init(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): Promise<void>[] {
		super.init(hTag, appPixi, val, main);

		// 全画面状態切替
		const pCvs: any = appPixi.view.parentElement!;
		if ('requestFullscreen' in document.body) {
			this.tglFlscr_sub = ()=> this.isFullScr
				? document.exitFullscreen()
				: pCvs.requestFullscreen();

			this.elc.add(document, 'fullscreenchange', ()=> this.isFullScr = Boolean(document.fullscreenElement));	// Escの場合もあるので
		}
		else {
			const doc: any = document;	// Safariなど
			this.tglFlscr_sub = ()=> this.isFullScr
				? doc.webkitCancelFullScreen()
				: pCvs.webkitRequestFullscreen();

			this.elc.add(document, 'fullscreenchange', ()=> this.isFullScr = Boolean(doc.webkitFullscreenElement));	// Escの場合もあるので
		}

		if (! this.cfg.oCfg.debug.devtool) this.elc.add(window, 'devtoolschange', e=> {
			if (! e.detail.isOpen) return;
			console.error(`DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。`);
			main.destroy();
		}, {once: true, passive: true});
		return [];
	}


	override cvsResize() {
		super.cvsResize();

		if (this.isFullScr) {
			const s = Main.cvs.style;
			s.width = s.height = '';	// ブラウザ版のセンタリングに必須
		}
	}


	override pathBaseCnvSnPath4Dbg = '${pathbase}/';

	// プレイデータをエクスポート
	protected override readonly	_export: ITag = ()=> {
		(async ()=> {
			const s = JSON.stringify({
				'sys': this.data.sys,
				'mark': this.data.mark,
				'kidoku': this.data.kidoku,
			});
			const s2 = this.crypto ?await this.enc(s) :s;
			const blob = new Blob([s2], {'type':'text/json'});

			const a = document.createElement('a');
			a.href = URL.createObjectURL(blob);
			a.download = (this.crypto ?'' :'no_crypto_')
				+ this.cfg.getNs() + getDateStr('-', '_', '') +'.swpd';
			a.click();

			if (CmnLib.debugLog) console.log('プレイデータをエクスポートしました');
			setTimeout(()=> this.fire('sn:exported', new Event('click')), 10);
				// clearTimeout()不要と判断
		})();

		return false;
	}

	// プレイデータをインポート
	protected override readonly	_import: ITag = ()=> {
		new Promise((rs: (file: Blob)=> void, rj)=> {
			const inp = document.createElement('input');
			inp.type = 'file';
			inp.accept = '.swpd, text/plain';
			inp.onchange = ()=> {if (inp.files) rs(inp.files[0]); else rj()};
			inp.click();
		})
		.then(file=> new Promise(rs=> {
			const rd = new FileReader;
			rd.readAsText(file);
			rd.onload = ()=> rs(rd.result);
		}))
		.then(async (s: string)=> {
			const o = JSON.parse(this.crypto ?await this.dec('json', s) :s);
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
	protected override readonly	navigate_to: ITag = hArg=> {
		const {url} = hArg;
		if (! url) throw '[navigate_to] urlは必須です';
	//	globalThis.open(url);		// 近年セキュリティ的に効かない
		globalThis.open(url, '_blank');		// 効くがポップアップブロック
	//	location.href = url;	// これは効くがSKYNovelが終了してしまう

		return false;
	}
	// タイトル指定
	protected override titleSub(txt: string) {
		document.title = txt;
		document.querySelectorAll('[data-title]').forEach(v=> v.textContent = txt);
	}


	override async savePic(fn: string, data_url: string) {
		const a = document.createElement('a');
		a.href = data_url;
		a.download = fn;
		a.click();
		if (CmnLib.debugLog) console.log('画像ファイルをダウンロードします');
	}

	readonly	#hAppendFile: {[path: string]: string} = {};
	override async appendFile(path: string, data: any) {
		const txt = (this.#hAppendFile[path] ?? '') + data;
		this.#hAppendFile[path] = txt;

		await this.outputFile(path, txt);
	}
	override async outputFile(path: string, txt: string) {
		const blob = new Blob([txt], {'type':'text/json'});
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = path;
		a.click();
	}

}
