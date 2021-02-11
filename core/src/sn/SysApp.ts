/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2021 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {SysNode} from "./SysNode";
import {SysBase} from "./SysBase";
import {CmnLib, getDateStr, argChk_Boolean, argChk_Num, uint} from './CmnLib';
import {ITag, IHTag, IVariable, IData4Vari, IMain} from './CmnInterface';
import {Main} from './Main';
import {Application} from 'pixi.js';

import {remote} from 'electron';
const app = remote.app;
//import * as Store from 'electron-store';

//import {createWriteStream, removeSync, ensureDirSync, createReadStream, readFileSync, readFile, existsSync, copySync} from 'fs-extra';
	let createWriteStream: Function;
	let removeSync: Function;
	let ensureDirSync: Function;
	let createReadStream: Function;
	let readFileSync: Function;
	let readFile: Function;
	let existsSync: Function;
	let copySync: Function;
import {createHash} from 'crypto';
//import {pack, extract} from 'tar-fs';
	let pack: Function;
	let extract: Function;

export class SysApp extends SysNode {
	constructor(hPlg = {}, arg = {cur: 'prj/', crypto: false, dip: ''}) {
		super(hPlg, {...arg, cur: app.getAppPath().replace(/\\/g, '/') + (app.isPackaged ?'/doc/' :'/')+ arg.cur});

		globalThis.addEventListener('DOMContentLoaded', ()=>this.run(), {once: true, passive: true});

		(async ()=> {
			const {ipcRenderer} = await import('electron');
			ipcRenderer.on('log', (e: any, arg: any)=> console.log(`[main log] e:%o arg:%o`, e, arg));

			const {createWriteStream: fe0, removeSync: fe1, ensureDirSync: fe2, createReadStream: fe3, readFileSync: fe4, readFile: fe5, existsSync: fe6, copySync: fe7} = await import('fs-extra');
			createWriteStream = fe0;
			removeSync = fe1;
			ensureDirSync = fe2;
			createReadStream = fe3;
			readFileSync = fe4;
			readFile = fe5;
			existsSync = fe6;
			copySync = fe7;

			const {pack: pc, extract: ext} = await import('tar-fs');
			pack = pc;
			extract = ext;
		})();
	}
	protected 			$path_userdata	: string;
	protected readonly	$path_downloads	= app.getPath('downloads').replace(/\\/g, '/') +'/';

	protected readonly	normalize = (src: string, form: string)=> src.normalize(form);

	initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari)=> void) {
		this.$path_userdata	= this.isDbg()
			? app.getAppPath().slice(0, -3) +'.vscode/'	// /doc → /
			: app.getPath('userData').replace(/\\/g, '/') +'/';
		const Store = require('electron-store');
		const st = new Store({
			cwd: this.$path_userdata +'storage',
			name: this.arg.crypto ?'data_' :'data',
			encryptionKey: this.arg.crypto ?this.stk() :undefined,
		});
		this.flush = ()=> st.store = this.data;

		if (hTmp['const.sn.isFirstBoot'] = (st.size === 0)) {
			// データがない（初回起動）場合の処理
			this.data.sys = data.sys;
			this.data.mark = data.mark;
			this.data.kidoku = data.kidoku;
			this.flush();	// 初期化なのでここのみ必要
		}
		else {
			// データがある場合の処理
			this.data.sys = st.store.sys as any;
			this.data.mark = st.store.mark as any;
			this.data.kidoku = st.store.kidoku as any;
		}
		comp(this.data);

		// システム情報
		hTmp['const.sn.isDebugger'] = false;
			// システムがデバッグ用の特別なバージョンか
			// AIRNovel の const.flash.system.Capabilities.isDebugger
		hTmp['const.sn.screenResolutionX'] = this.dsp.size.width;
			// 画面の最大水平解像度
		hTmp['const.sn.screenResolutionY'] = this.dsp.size.height;
			// 画面の最大垂直解像度
			// AIRNovel の const.flash.system.Capabilities.screenResolutionX、Y
			// 上のメニューバーは含んでいない（たぶん an も）。含むのは workAreaSize

		this.val.defTmp('const.sn.displayState', ()=> this.win.isSimpleFullScreen());

		globalThis.addEventListener('resize', ()=> {
			// NOTE: 2019/07/14 Windowsでこのように遅らせないと正しい縦幅にならない
			this.window((hTmp['const.sn.isFirstBoot']) ?{centering: true} :{});
		}, {once: true, passive: true});

		this.win.on('move', ()=> {
			if (this.isMovingWin) return;
			this.isMovingWin = true;
			this.posMovingWin = this.win.getPosition();
			setTimeout(()=> this.delayWinPos(), 500);
		});
	}
	private	isMovingWin	= false;
	private posMovingWin= [0, 0];
	private delayWinPos() {
		if (this.win.isSimpleFullScreen()) return;

		const p = this.win.getPosition();
		if (this.posMovingWin[0] !== p[0] || this.posMovingWin[1] !== p[1]) {
			this.posMovingWin = p;
			setTimeout(()=> this.delayWinPos(), 500);
			return;
		}
		this.window({x: p[0], y: p[1]});
		this.isMovingWin = false;
	}
	private readonly	dsp	= remote.screen.getPrimaryDisplay();


	private main: Main;
	protected async run() {
		if (this.main) {
			const ms_late = 10;	// NOTE: リソース解放待ち用・魔法数字
			this.main.destroy(ms_late);
			await new Promise(r=> setTimeout(r, ms_late));
		}

		this.main = new Main(this);
	}


	private readonly	win	= remote.getCurrentWindow();
	private readonly	wc	= this.win.webContents;
	init(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain) {
		super.init(hTag, appPixi, val, main);

		if (this.cfg.oCfg.debug.devtool) this.wc.openDevTools();
		else this.wc.on('devtools-opened', ()=> {
			console.error(`DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。`);
			main.destroy();
		});
		this.win.setContentSize(CmnLib.stageW, CmnLib.stageH);
	}


	copyBMFolder = (from: number, to: number)=> {
		const path_from = `${this.$path_userdata}storage/${from}/`;
		const path_to = `${this.$path_userdata}storage/${to}/`;
		if (! existsSync(path_from)) return;	// 使ってない場合もある

		copySync(path_from, path_to);
	};
	eraseBMFolder = (place: number)=> {
		removeSync(`${this.$path_userdata}storage/${place}/`);
	};

	protected readonly	isPackaged = ()=> app.isPackaged;
	isDbg = ()=> {	// 配布版では無効
		const ret = Boolean(process.env['SKYNOVEL_DBG']) && ! this.isPackaged();
		this.isDbg = ret ?()=> true :()=> false;
		if (ret) this.extPort = uint(process.env['SKYNOVEL_PORT'] ?? '3776');
		return ret;
	};

	// アプリの終了
	protected readonly	close = ()=> {this.win.close(); return false;}

	// プレイデータをエクスポート
	protected readonly	_export: ITag = ()=> {
		const r = pack(this.$path_userdata +'storage/')
		r.on('end', ()=> {
			if (CmnLib.debugLog) console.log('プレイデータをエクスポートしました');
			this.fire('sn:exported', new Event('click'));
		});
		r.pipe(createWriteStream(
			this.$path_downloads + (this.crypto ?'' :'no_crypto_')
			+ this.cfg.getNs() + getDateStr('-', '_', '') +'.spd'
		));

		return false;
	}

	// プレイデータをインポート
	protected readonly	_import: ITag = ()=> {
		const flush = this.flush;
		new Promise((rs, rj)=> {
			const inp = document.createElement('input');
			inp.type = 'file';
			inp.accept = '.spd, text/plain';
			inp.onchange = ()=> {if (inp.files) rs(inp.files[0].path); else rj();};
			inp.click();
		})
		.then((inp_path: any)=> {
			this.flush = ()=> {};
			const out_path = this.$path_userdata +'storage/';
			removeSync(out_path);
			ensureDirSync(out_path);	// ディレクトリ、なければ作る

			createReadStream(inp_path)
			.on('end', async ()=> {
				const fn = this.$path_userdata +'storage/data.json'+ (this.crypto ?'_': '');
				const s = String(readFileSync(fn));
				const o = JSON.parse(this.crypto ?await this.pre('json', s) :s);
				if (! o.sys || ! o.mark || ! o.kidoku) throw new Error('異常なプレイデータです');
				if (o.sys[SysBase.VALNM_CFG_NS] !== this.cfg.oCfg.save_ns) {
					console.error(`別のゲーム【プロジェクト名=${o.sys[SysBase.VALNM_CFG_NS]}】のプレイデータです`);
					return;
				}

				this.data.sys = o.sys;
				this.data.mark = o.mark;
				this.data.kidoku = o.kidoku;
				this.flush = flush;
				this.flush();
				this.val.updateData(o);

				if (CmnLib.debugLog) console.log('プレイデータをインポートしました');
				this.fire('sn:imported', new Event('click'));
			})
			.pipe(extract(out_path));
		});

		return false;
	}

	// ＵＲＬを開く
	protected readonly	navigate_to: ITag = hArg=> {
		const url = hArg.url;
		if (! url) throw '[navigate_to] urlは必須です';

		const fnc =	async ()=> {
			const {shell} = await import('electron');
			shell.openExternal(url);
		}
		fnc();

		return false;
	}
	// タイトル指定
	protected titleSub(txt: string) {this.win.setTitle(txt);}
	// 全画面状態切替
	protected readonly	tgl_full_scr: ITag = hArg=> {
		if (! hArg.key) {this.tgl_full_scr_sub(); return false;}

		const key = hArg.key.toLowerCase();
		document.addEventListener('keydown', (e: KeyboardEvent)=> {
			const key2 = (e.altKey ?(e.key === 'Alt' ?'' :'alt+') :'')
			+	(e.ctrlKey ?(e.key === 'Control' ?'' :'ctrl+') :'')
			+	(e.shiftKey ?(e.key === 'Shift' ?'' :'shift+') :'')
			+	e.key.toLowerCase();
			if (key2 !== key) return;

			e.stopPropagation();
			this.tgl_full_scr_sub();
		}, {passive: true});
		return false;
	}
	protected readonly	tgl_full_scr_sub = ()=> {
		if (this.win.isSimpleFullScreen()) {
			this.win.setSimpleFullScreen(false);	// これはこの位置
			this.win.setSize(CmnLib.stageW, CmnLib.stageH);
			this.appPixi.view.style.width  = CmnLib.stageW +'px';
			this.appPixi.view.style.height = CmnLib.stageH +'px';
			this.appPixi.view.style.marginLeft = '0px';
			this.appPixi.view.style.marginTop  = '0px';
			this.window({});

			this.reso4frame = 1;
		}
		else {
			const w = this.dsp.size.width;
			const h = this.dsp.size.height;
			const ratioWidth  = w / CmnLib.stageW;
			const ratioHeight = h / CmnLib.stageH;
			const ratio = (ratioWidth < ratioHeight) ?ratioWidth :ratioHeight;
			this.win.setSize(CmnLib.stageW * ratio, CmnLib.stageH * ratio);
			this.appPixi.view.style.width  = (CmnLib.stageW * ratio) +'px';
			this.appPixi.view.style.height = (CmnLib.stageH * ratio) +'px';
			if (ratioWidth < ratioHeight) {	// 左に寄る対策
				this.appPixi.view.style.marginTop = (h -CmnLib.stageH *ratio) /2 +'px';
			}
			else {
				this.appPixi.view.style.marginLeft= (w -CmnLib.stageW *ratio) /2 +'px';
			}
			this.win.setSimpleFullScreen(true);	// これはこの位置

			this.win.setContentSize(screen.width, screen.height);
				// これがないとWinアプリ版で下部が短くなり背後が見える
			const cr = this.appPixi.view.getBoundingClientRect();
			this.reso4frame = cr.width / CmnLib.stageW;
		}
		this.resizeFrames();
	}
	// 更新チェック
	protected readonly	update_check: ITag = hArg=> {
		const url = hArg.url;
		if (! url) throw '[update_check] urlは必須です';
		if (url.slice(-1) !== '/') throw '[update_check] urlの最後は/です';

		(async ()=> {
			const res = await this.fetch(url +`latest${CmnLib.isMac ?'-mac' :''}.yml`);
			if (! res.ok) return;
			if (CmnLib.debugLog) console.log(`[update_check] ymlを取得しました url=${url}`);
			const txt = await res.text();
			const mv = /version: (.+)/.exec(txt);
			if (! mv) throw `[update_check] ファイル内にversionが見つかりません`;
			const netver = mv[1];

			const myver = String(app.getVersion());
			if (netver === myver) {
				if (CmnLib.debugLog) console.log(`[update_check] バージョン更新なし ver:${myver}`);
				return;
			}
			if (CmnLib.debugLog) console.log(`[update_check] 現在ver=${myver} 新規ver=${netver}`);

			const o = {
				title: 'アプリ更新',
				icon: app.getAppPath() +'/app/icon.png',
				buttons: ['OK', 'Cancel'],
				defaultId: 0,
				cancelId: 1,
				message: `アプリ【${this.cfg.oCfg.book.title}】に更新があります。\nダウンロードしますか？`,
				detail: `現在ver ${myver}\n新規ver ${netver}`,
			};
			const di = await remote.dialog.showMessageBox(o as any);// iconのせい
			if (di.response > 0) return;

			if (CmnLib.debugLog) console.log(`[update_check] アプリダウンロード開始`);
			const mp = /path: (.+)/.exec(txt);
			if (! mp) throw `[update_check] ファイル内にpathが見つかりません`;
			const fn = mp[1];

			const mc = /sha512: (.+)/.exec(txt);
			if (! mc) throw `[update_check] ファイル内にsha512が見つかりません`;
			const sha = mc[1];

			const res_dl = await this.fetch(url + fn);
			if (! res_dl.ok) return;
			const pathDL = app.getPath('downloads') +'/'+ fn;
			const rd_dl = async (res: Response)=> {
				const reader = res!.body!.getReader();
				const {Readable} = await import('stream');
				const rdb = new Readable();
				rdb._read = async ()=> {
					const {done, value} = await reader.read();
					if (done) {rdb.push(null); return;}
					rdb.push(Buffer.from(value!));
				};
				return rdb;
			}
			const pipe_dl = await rd_dl(res_dl);
			pipe_dl.on('end', ()=> {
				if (CmnLib.debugLog) console.log(`[update_check] アプリダウンロード完了`);

				readFile(pathDL, (err: any, data: any)=> {
					if (err) throw err;

					const h = createHash('SHA512');
					h.update(data)
					const hash = String(h.digest('base64'));

					const isOk = sha === hash;
					if (CmnLib.debugLog) console.log(`[update_check] SHA512 Checksum:${isOk}`, sha, hash);
					if (! isOk) removeSync(pathDL);

					o.buttons.pop();
					o.message = `アプリ【${this.cfg.oCfg.book.title}】の更新パッケージを\nダウンロードしました`+ (isOk ?'' :'が、破損しています。\n開発元に連絡してください');
					remote.dialog.showMessageBox(o as any);	// iconのせい
				});
			});
			pipe_dl.pipe(createWriteStream(pathDL));
		})();

		return false;
	}
	// アプリウインドウ設定
	protected readonly	window: ITag = hArg=> {
		const screenRX = this.dsp.size.width;
		const screenRY = this.dsp.size.height;
		if (argChk_Boolean(hArg, 'centering', false)) {
			const s = this.win.getPosition();
			hArg.x = (screenRX - s[0]) *0.5;
			hArg.y = (screenRY - s[1]) *0.5;
		}
		else {
			hArg.x = argChk_Num(hArg, 'x', Number(this.val.getVal('sys:const.sn.nativeWindow.x', 0)));
			hArg.y = argChk_Num(hArg, 'y', Number(this.val.getVal('sys:const.sn.nativeWindow.y', 0)));
			if (hArg.x < 0) hArg.x = 0;
			else if (hArg.x > screenRX) hArg.x = 0;
			if (hArg.y < 0) hArg.y = 0;
			else if (hArg.y > screenRY) hArg.y = 0;
		}
		this.win.setPosition(hArg.x, hArg.y);
		this.win.setContentSize(CmnLib.stageW, CmnLib.stageH);
			// 2019/07/06 Windowsでこれがないとどんどん縦に短くなる
		const hz = this.win.getContentSize()[1];
		this.win.setContentSize(CmnLib.stageW, CmnLib.stageH *2 -hz);
			// 2019/07/14 setContentSize()したのにメニュー高さぶん勝手に削られた値にされる不具合ぽい動作への対応
		this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.x', hArg.x);
		this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.y', hArg.y);
		this.flush();

		return false;
	}

}
