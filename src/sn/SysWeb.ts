/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {SysBase} from './SysBase';
import {CmnLib, getDateStr, argChk_Boolean, argChk_Num, type T_DIP} from './CmnLib';
import type {T_HTag, TTag} from './Grammar';
import type {T_Variable, T_Data4Vari, T_SysBaseParams, T_SysBaseLoadedParams, T_H_TMP_DATA, T_H_VAL_KIDOKU, T_H_VAL_MARK, T_H_SYS_DATA} from './CmnInterface';

import type {Application} from 'pixi.js';
import store from 'store';
import type {DevToolsEvent} from 'devtools-detect';
import 'devtools-detect';


export class SysWeb extends SysBase {
	#path_base;
	constructor(...[hPlg = {}, arg = {cur: 'prj/', crypto: false, dip: ''}]: T_SysBaseParams) {	// DOMContentLoaded は呼び出し側でやる
		super(hPlg, arg);

		const a = arg.cur.split('/');
		this.#path_base = a.length > 2 ? a.slice(0, -2).join('/') +'/' :'';

		void this.loaded(hPlg, arg);
	}
	protected override async loaded(...[hPlg, arg]: T_SysBaseLoadedParams) {
		await super.loaded(hPlg, arg);

		document.querySelectorAll('[data-prj]').forEach(v=> {
			const elm = v.attributes.getNamedItem('data-prj');
			if (elm) v.addEventListener('click', ()=> {void this.runSN(elm.value)}, {passive: true});
			//if (elm) this.elc.add(v, 'click', ()=> this.runSN(elm.value), {passive: true});
				// ギャラリーであっても、ここには一度しか来ないので
		});
		document.querySelectorAll('[data-reload]').forEach(v=>
			v.addEventListener('click', ()=> {void this.run()}, {passive: true})
			//this.elc.add(v, 'click', ()=> {void this.run()}, {passive: true})
				// ギャラリーであっても、ここには一度しか来ないので
		);
		if (arg.dip) CmnLib.hDip = <T_DIP>JSON.parse(arg.dip);

		const sp = new URLSearchParams(location.search);
		const dip = sp.get('dip');	// ディップスイッチ
		if (dip) CmnLib.hDip = <T_DIP>{...CmnLib.hDip, ...JSON.parse(dip.replaceAll('%2C', ','))};
		if (! argChk_Boolean(CmnLib.hDip, 'oninit_run', true)) return;

		if (argChk_Boolean(CmnLib.hDip, 'dbg', false)) {
			CmnLib.isDbg = true;
			this.fetch = (url: string, init?: RequestInit)=> fetch(url, {...init, mode: 'cors'});
		}
		this.extPort = argChk_Num(CmnLib.hDip, 'port', this.extPort);

		const cur = sp.get('cur');
		if (cur) arg.cur = this.#path_base + cur +'/';
		await this.run();
	}

	#now_prj	= ':';
	async runSN(prj: string) {
		this.arg.cur = this.#path_base + prj +'/';
		if (this.#now_prj === this.arg.cur) return;

		this.#now_prj = this.arg.cur;
		await this.run();
	}


	override async	initVal(hTmp: T_H_TMP_DATA, comp: (data: T_Data4Vari)=> void) {
		// システム情報
		const hn = encodeURIComponent(document.location.hostname);
		hTmp['const.sn.isDebugger'] = hn === 'localhost' || hn ==='127.0.0.1';

		const ns = this.cfg.headNs;
		this.flushSub = this.arg.crypto
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
		// eslint-disable-next-line no-cond-assign
		if (hTmp['const.sn.isFirstBoot'] = store.get(nm) === undefined) {
			// データがない（初回起動）場合の処理
			this.data.sys = <T_H_SYS_DATA>{};
			this.data.mark = {};
			this.data.kidoku = {};
			// this.flush();	// ここでは仮置き、外でやってもらう
			comp(this.data);
			return;
		}

		// データがある場合の処理
		if (! this.arg.crypto) {
			this.data.sys = <T_H_SYS_DATA>store.get(ns +'sys');
			this.data.mark = <T_H_VAL_MARK>store.get(ns +'mark');
			this.data.kidoku = <T_H_VAL_KIDOKU>store.get(ns +'kidoku');
			comp(this.data);
			return;
		}

		let mes = '';
		try {
			mes = 'sys';	// tst sys
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			this.data.sys = <T_H_SYS_DATA>JSON.parse(await this.dec('json', store.get(ns +'sys_')));
			mes += String(this.val.getVal('sys:TextLayer.Back.Alpha', 1));
			mes = 'mark';	// tst mark
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			this.data.mark = <T_H_VAL_MARK>JSON.parse(await this.dec('json', store.get(ns +'mark_')));
			mes = 'kidoku';	// tst kidoku
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			this.data.kidoku = <T_H_VAL_KIDOKU>JSON.parse(await this.dec('json', store.get(ns +'kidoku_')));
		} catch (e) {
			console.error(`セーブデータ（${mes}）が壊れています。一度クリアする必要があります(a) %o`, e);
		}
		comp(this.data);
	}

	override init(hTag: T_HTag, appPixi: Application, val: T_Variable) {
		const aP = super.init(hTag, appPixi, val);

		// 全画面状態切替
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const pCvs = appPixi.view.parentElement!;
		if ('requestFullscreen' in document.body) {
			this.tglFlscr_sub = this.isFullScr
				? ()=> document.exitFullscreen()
				: ()=> pCvs.requestFullscreen();

			this.elc.add(document, 'fullscreenchange', ()=> {this.isFullScr = Boolean(document.fullscreenElement)});	// Escの場合もあるので
		}
		else {
			const doc = <{
				webkitCancelFullScreen	: ()=> Promise<void>;
				webkitRequestFullscreen	: ()=> Promise<void>;
				webkitFullscreenElement	: HTMLElement | undefined;
			}><unknown>document;	// Safariなど
			this.tglFlscr_sub = this.isFullScr
				? ()=> doc.webkitCancelFullScreen()
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
				: ()=> (<any>pCvs).webkitRequestFullscreen();

			this.elc.add(document, 'fullscreenchange', ()=> {this.isFullScr = Boolean(doc.webkitFullscreenElement)});	// Escの場合もあるので
		}

		// window.addEventListener('devtoolschange', event => {});
		if (! this.cfg.oCfg.debug.devtool) this.elc.add(globalThis, 'devtoolschange', (e: DevToolsEvent)=> {
			if (! e.detail.isOpen) return;
			console.error('DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。');
			this.main?.destroy();
		}, {once: true, passive: true});

		return aP;
	}


	override cvsResize() {
		super.cvsResize();

		if (! this.isFullScr) return;
		if (! this.main) return;

		const s = this.main.cvs.style;
		s.width = s.height = '';	// ブラウザ版のセンタリングに必須
	}


	override pathBaseCnvSnPath4Dbg = '${pathbase}/';

	// プレイデータをエクスポート
	protected override readonly	_export: TTag = ()=> {
		(async ()=> {
			const s = JSON.stringify({
				'sys': this.data.sys,
				'mark': this.data.mark,
				'kidoku': this.data.kidoku,
			});
			const s2 = this.arg.crypto ?await this.enc(s) :s;
			const blob = new Blob([s2], {'type':'text/json'});

			const a = document.createElement('a');
			a.href = URL.createObjectURL(blob);
			a.download = (this.arg.crypto ?'' :'no_crypto_')
				+ this.cfg.headNs + getDateStr('-', '_', '') +'.swpd';
			a.click();

			if (CmnLib.debugLog) console.log('プレイデータをエクスポートしました');
			setTimeout(()=> this.fire('sn:exported', new MouseEvent('click')), 10);
				// clearTimeout()不要と判断
		})();

		return false;
	}

	// プレイデータをインポート
	protected override readonly	_import: TTag = ()=> {
		new Promise((rs: (file: Blob)=> void, rj)=> {
			const inp = document.createElement('input');
			inp.type = 'file';
			inp.accept = '.swpd, text/plain';
			inp.onchange = ()=> {
				const f = inp.files?.[0];
				if (f) rs(f); else rj(new Error('ファイル選択に失敗しました'))
			};
			inp.click();
		})
		.then(async blob=> {
			const s = await blob.text();
			const o = <T_Data4Vari>JSON.parse(this.arg.crypto ?await this.dec('json', s) :s);
			if (o.sys['const.sn.cfg.ns'] !== this.cfg.oCfg.save_ns) {
				console.error(`別のゲーム【プロジェクト名=${o.sys['const.sn.cfg.ns']}】のプレイデータです`);
				return;
			}

			this.data.sys = o.sys;
			this.data.mark = o.mark;
			this.data.kidoku = o.kidoku;
			this.flush();
			this.val.updateData(o);

			if (CmnLib.debugLog) console.log('プレイデータをインポートしました');
			this.fire('sn:imported', new MouseEvent('click'));
		})
		.catch((e: unknown)=> console.error(`異常なプレイデータです ${String(e)}`));

		return false;
	}


	// ＵＲＬを開く
	protected override readonly	navigate_to: TTag = hArg=> {
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
		document.querySelectorAll('[data-title]').forEach(v=> {v.textContent = txt});
	}


	// eslint-disable-next-line @typescript-eslint/require-await
	override async savePic(path: string, data_url: string) {
		const a = document.createElement('a');
		a.href = data_url;
		a.download = path;
		a.click();
		if (CmnLib.debugLog) console.log('画像ファイルをダウンロードします');
	}

	readonly	#hAppendFile: {[path: string]: string} = {};
	override async appendFile(path: string, data: string) {
		const txt = (this.#hAppendFile[path] ?? '') + data;
		this.#hAppendFile[path] = txt;

		await this.outputFile(path, txt);
	}
	// eslint-disable-next-line @typescript-eslint/require-await
	override async outputFile(path: string, data: string) {
		const blob = new Blob([data], {'type':'text/json'});
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = path;
		a.click();
	}

}
