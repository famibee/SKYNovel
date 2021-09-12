/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2021 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {SysNode} from './SysNode';
import {SysBase} from './SysBase';
import {CmnLib, getDateStr, argChk_Boolean, argChk_Num, uint} from './CmnLib';
import {ITag, IHTag, IVariable, IData4Vari, IMain, HPlugin, HSysBaseArg} from './CmnInterface';
import {Main} from './Main';
import {Application} from 'pixi.js';
import {createHash} from 'crypto';

import {HINFO} from '../preload';
/*	//== new ==
const {to_app} = window;
*/	//== new ==


	//== old ==
import {remote} from 'electron';
const app = remote.app;

const dsp = remote.screen.getPrimaryDisplay();
const screenRX = dsp.size.width;
const screenRY = dsp.size.height;

import {HPROC} from '../preload';
import {existsSync, copySync, removeSync, ensureDirSync, ensureFileSync, createWriteStream, createReadStream, readFileSync, readFile, writeFileSync, appendFile} from 'fs-extra';
const Store = require('electron-store');
import {pack, extract} from 'tar-fs';

const to_app: HPROC = {
	getInfo		: async ()=> {return {
		getAppPath	: app.getAppPath(),
		isPackaged	: app.isPackaged,
		downloads	: app.getPath('downloads'),
		userData	: app.getPath('userData'),
		getVersion	: String(app.getVersion()),
		env			: process.env,
		screenResolutionX	: screenRX,
		screenResolutionY	: screenRY,
	}},

	existsSync	: async (path: string)=> existsSync(path),
	copySync	: (path_from: string, path_to: string)=> copySync(path_from, path_to),
	removeSync	: async (path: string)=> removeSync(path),
	ensureDirSync	: async (path: string)=> ensureDirSync(path),
	ensureFileSync	: async (path: string)=> ensureFileSync(path),
	createWriteStream	: async (path: string)=> createWriteStream(path),
	createReadStream	: async (path: string)=> createReadStream(path),
	readFileSync: async (path: string)=> readFileSync(path, {encoding: 'utf8'}),
	readFile	: (path: string, callback: (err: NodeJS.ErrnoException, data: Buffer)=> void)=> readFile(path, callback),
	writeFileSync	: async (path: string, data: Buffer, o?: object)=> writeFileSync(path, data, o),
	appendFile		: async (path: string, data: string, callback: (err: Error)=> void)=> appendFile(path, data, callback),

	window	: (centering: boolean, x: number, y: number, w: number, h: number)=> window(centering, x, y, w, h),
	isSimpleFullScreen	: async ()=> bw.isSimpleFullScreen(),
	setSimpleFullScreen	: async (b: boolean)=> bw.setSimpleFullScreen(b),
	win_close		: ()=> bw.close(),
	win_setTitle	: (title: string)=> bw.setTitle(title),
	win_setContentSize	: async (w: number, h: number)=> bw.setContentSize(w, h),
	win_setSize			: async (w: number, h: number)=> bw.setSize(w, h),

	openDevTools	: ()=> bw.webContents.openDevTools(),
	win_ev_devtools_opened	: (fnc: ()=> void)=> bw.webContents.on('devtools-opened', fnc),

	Store	: async (o: object)=> {st = new Store(o); return;},
	flush	: async (o: object)=> {st.store = o; return;},
	Store_isEmpty	: async ()=> st.size === 0,
	Store_get	: async ()=> st.store,

	tarFs_pack		: async (path: string)=> pack(path),
	tarFs_extract	: async (path: string)=> extract(path),
};

let	st: any;


let bw: Electron.BrowserWindow = remote.getCurrentWindow();
function window(centering: boolean, x: number, y: number, w: number, h: number) {
	if (centering) {
		const s = bw.getPosition();
		x = (screenRX - s[0]) *0.5;
		y = (screenRY - s[1]) *0.5;
	}
	else {
		if (x < 0) x = 0; else if (x > screenRX) x = 0;
		if (y < 0) y = 0; else if (y > screenRY) y = 0;
	}
	bw.setPosition(x, y);
	bw.setContentSize(w, h);
		// 2019/07/06 Windowsでこれがないとどんどん縦に短くなる
	const hz = bw.getContentSize()[1];
	bw.setContentSize(w, h *2 -hz);
		// 2019/07/14 setContentSize()したのにメニュー高さぶん勝手に削られた値にされる不具合ぽい動作への対応
}

bw.on('move', ()=> {
	if (isMovingWin) return;
	isMovingWin = true;
	posMovingWin = bw.getPosition();
	setTimeout(()=> delayWinPos(), 500);
});

let	isMovingWin		= false;
let	posMovingWin	= [0, 0];
function	delayWinPos() {
	if (bw.isSimpleFullScreen()) return;

	const p = bw.getPosition();
	if (posMovingWin[0] !== p[0] || posMovingWin[1] !== p[1]) {
		posMovingWin = p;
		setTimeout(()=> delayWinPos(), 500);
		return;
	}
	window(false, p[0], p[1], 0, 0);
	isMovingWin = false;
}
	//== old ==


export class SysApp extends SysNode {
	constructor(hPlg = {}, arg = {cur: 'prj/', crypto: false, dip: ''}) {
		super(hPlg, {...arg, cur: ''});

		globalThis.addEventListener('DOMContentLoaded', async ()=> this.loaded(hPlg, arg), {once: true, passive: true});
	}
	protected override async loaded(hPlg: HPlugin, arg: HSysBaseArg) {
		await super.loaded(hPlg, arg);

		this.hInfo = await to_app.getInfo();
		CmnLib.isPackaged = this.hInfo.isPackaged;
		arg = {...arg, cur: this.hInfo.getAppPath.replace(/\\/g, '/') + (CmnLib.isPackaged ?'/doc/' :'/')+ arg.cur};

//== old ==
		this.readFileSync = to_app.readFileSync;
		this.writeFileSync = to_app.writeFileSync;
		this.appendFile = to_app.appendFile;
		this.ensureFileSync = to_app.ensureFileSync;
//== old ==

		this.$path_downloads	= this.hInfo.downloads.replace(/\\/g, '/') +'/';

//		ipcRenderer.on('log', (e: any, arg: any)=> console.log(`[main log] e:%o arg:%o`, e, arg));

		CmnLib.isDbg = Boolean(this.hInfo.env['SKYNOVEL_DBG']) && ! CmnLib.isPackaged;	// 配布版では無効
		if (CmnLib.isDbg) this.extPort = uint(this.hInfo.env['SKYNOVEL_PORT'] ?? '3776');

		this.run();
	}
	private	hInfo:  HINFO = {
		getAppPath	: '',
		isPackaged	: false,
		downloads	: '',
		userData	: '',
		getVersion	: '',
		env			: {},
		screenResolutionX	: 0,
		screenResolutionY	: 0,
	};

/*	//== new ==
	protected	readFileSync = to_app.readFileSync;
	protected	writeFileSync = to_app.writeFileSync;
	appendFile = to_app.appendFile;
	ensureFileSync = to_app.ensureFileSync;
*/	//== new ==

	protected 	override $path_userdata		= '';
	protected	override $path_downloads	= '';

	override initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari)=> void) {
		// システム情報
		hTmp['const.sn.isDebugger'] = false;
			// システムがデバッグ用の特別なバージョンか
			// AIRNovel の const.flash.system.Capabilities.isDebugger
		hTmp['const.sn.screenResolutionX'] = this.hInfo.screenResolutionX;
			// 画面の最大水平解像度
		hTmp['const.sn.screenResolutionY'] = this.hInfo.screenResolutionY;
			// 画面の最大垂直解像度
			// AIRNovel の const.flash.system.Capabilities.screenResolutionX、Y
			// 上のメニューバーは含んでいない（たぶん an も）。含むのは workAreaSize

		this.val.defTmp('const.sn.displayState', async ()=> await to_app.isSimpleFullScreen());

/*
		globalThis.addEventListener('resize', ()=> {
			// NOTE: 2019/07/14 Windowsでこのように遅らせないと正しい縦幅にならない
			this.window((hTmp['const.sn.isFirstBoot']) ?{centering: true} :{});
		}, {once: true, passive: true});
*/

		this.$path_userdata	= CmnLib.isDbg
			? this.hInfo.getAppPath.slice(0, -3) +'.vscode/'	// /doc → /
			: this.hInfo.userData.replace(/\\/g, '/') +'/';

		to_app.Store({
			cwd: this.$path_userdata +'storage',
			name: this.arg.crypto ?'data_' :'data',
			encryptionKey: this.arg.crypto ?this.stk() :undefined,
		});
		this.flush = ()=> to_app.flush(this.data);

		(async ()=> {
			if (hTmp['const.sn.isFirstBoot'] = await to_app.Store_isEmpty()) {
				// データがない（初回起動）場合の処理
				this.data.sys = data.sys;
				this.data.mark = data.mark;
				this.data.kidoku = data.kidoku;
				this.flush();	// 初期化なのでここのみ必要
			}
			else {
				// データがある場合の処理
				const store = await to_app.Store_get();
				this.data.sys = store.sys;
				this.data.mark = store.mark;
				this.data.kidoku = store.kidoku;
			}
			comp(this.data);
		})();
	}


	private main: Main;
	protected override async run() {
		if (this.main) {
			const ms_late = 10;	// NOTE: リソース解放待ち用・魔法数字
			this.main.destroy(ms_late);
			await new Promise(r=> setTimeout(r, ms_late));
		}

		this.main = new Main(this);
	}


	override init(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): Promise<void>[] {
		super.init(hTag, appPixi, val, main);

		if (this.cfg.oCfg.debug.devtool) to_app.openDevTools();
		else to_app.win_ev_devtools_opened(()=> {
			console.error(`DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。`);
			main.destroy();
		});
		to_app.win_setContentSize(CmnLib.stageW, CmnLib.stageH);
		return [];
	}


	override copyBMFolder = async (from: number, to: number)=> {
		const path_from = `${this.$path_userdata}storage/${from}/`;
		const path_to = `${this.$path_userdata}storage/${to}/`;
		if (! await to_app.existsSync(path_from)) return;	// 使ってない場合もある

		await to_app.copySync(path_from, path_to);
	};
	override eraseBMFolder = async (place: number)=> {
		await to_app.removeSync(`${this.$path_userdata}storage/${place}/`);
	};

	// アプリの終了
	protected override readonly	close = ()=> {to_app.win_close(); return false;}

	// プレイデータをエクスポート
	protected override readonly	_export: ITag = ()=> {
		(async()=> {
			const r = await to_app.tarFs_pack(this.$path_userdata +'storage/')
			r.on('end', ()=> {
				if (CmnLib.debugLog) console.log('プレイデータをエクスポートしました');
				this.fire('sn:exported', new Event('click'));
			});
			r.pipe(await to_app.createWriteStream(
				this.$path_downloads + (this.crypto ?'' :'no_crypto_')
				+ this.cfg.getNs() + getDateStr('-', '_', '') +'.spd'
			));
		})();

		return false;
	}

	// プレイデータをインポート
	protected override readonly	_import: ITag = ()=> {
		const flush = this.flush;
		new Promise((rs, rj)=> {
			const inp = document.createElement('input');
			inp.type = 'file';
			inp.accept = '.spd, text/plain';
			inp.onchange = ()=> {if (inp.files) rs(inp.files[0].path); else rj();};
			inp.click();
		})
		.then(async (inp_path: any)=> {
			this.flush = ()=> {};
			const out_path = this.$path_userdata +'storage/';
			await to_app.removeSync(out_path);
			await to_app.ensureDirSync(out_path);	// ディレクトリ、なければ作る

			(await to_app.createReadStream(inp_path))
			.on('end', async ()=> {
				const fn = this.$path_userdata +'storage/data.json'+ (this.crypto ?'_': '');
				const s = await to_app.readFileSync(fn);
				const o = JSON.parse(this.crypto ? this.decStr('json', s) :s);
				if (! o.sys || ! o.mark || ! o.kidoku) throw new Error('異常なプレイデータです');
				if (o.sys[SysBase.VALNM_CFG_NS] !== this.cfg.oCfg.save_ns) {
					console.error(`別のゲーム【プロジェクト名=${o.sys[SysBase.VALNM_CFG_NS]}】のプレイデータです`);
					return;
				}

				this.data.sys = o.sys;
				this.data.mark = o.mark;
				this.data.kidoku = o.kidoku;
				this.flush = flush;
				await this.flush();
				this.val.updateData(o);

				if (CmnLib.debugLog) console.log('プレイデータをインポートしました');
				this.fire('sn:imported', new Event('click'));
			})
			.pipe(await to_app.tarFs_extract(out_path));
		});

		return false;
	}

	// ＵＲＬを開く
	protected override readonly	navigate_to: ITag = hArg=> {
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
	protected override titleSub(title: string) {to_app.win_setTitle(title);}
	// 全画面状態切替
	protected override readonly	tgl_full_scr: ITag = hArg=> {
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
	protected readonly	tgl_full_scr_sub = async ()=> {
		if (await to_app.isSimpleFullScreen()) {
			await to_app.setSimpleFullScreen(false);	// これはこの位置
			await to_app.win_setSize(CmnLib.stageW, CmnLib.stageH);
			this.appPixi.view.style.width  = CmnLib.stageW +'px';
			this.appPixi.view.style.height = CmnLib.stageH +'px';
			this.appPixi.view.style.marginLeft = '0px';
			this.appPixi.view.style.marginTop  = '0px';
			this.window({});

			this.reso4frame = 1;
		}
		else {
			const w = this.hInfo.screenResolutionX;
			const h = this.hInfo.screenResolutionY;
			const ratioWidth  = w / CmnLib.stageW;
			const ratioHeight = h / CmnLib.stageH;
			const ratio = (ratioWidth < ratioHeight) ?ratioWidth :ratioHeight;
			await to_app.win_setSize(CmnLib.stageW * ratio, CmnLib.stageH * ratio);
			this.appPixi.view.style.width  = (CmnLib.stageW * ratio) +'px';
			this.appPixi.view.style.height = (CmnLib.stageH * ratio) +'px';
			if (ratioWidth < ratioHeight) {	// 左に寄る対策
				this.appPixi.view.style.marginTop = (h -CmnLib.stageH *ratio) /2 +'px';
			}
			else {
				this.appPixi.view.style.marginLeft= (w -CmnLib.stageW *ratio) /2 +'px';
			}
			await to_app.setSimpleFullScreen(true);	// これはこの位置

			await to_app.win_setContentSize(screen.width, screen.height);
				// これがないとWinアプリ版で下部が短くなり背後が見える
			const cr = this.appPixi.view.getBoundingClientRect();
			this.reso4frame = cr.width / CmnLib.stageW;
		}
		this.resizeFrames();
	}
	// 更新チェック
	protected override readonly	update_check: ITag = hArg=> {
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

			const myver = this.hInfo.getVersion;
			if (netver === myver) {
				if (CmnLib.debugLog) console.log(`[update_check] バージョン更新なし ver:${myver}`);
				return;
			}
			if (CmnLib.debugLog) console.log(`[update_check] 現在ver=${myver} 新規ver=${netver}`);

			const o = {
				title: 'アプリ更新',
				icon: this.hInfo.getAppPath +'/app/icon.png',
				buttons: ['OK', 'Cancel'],
				defaultId: 0,
				cancelId: 1,
				message: `アプリ【${this.cfg.oCfg.book.title}】に更新があります。\nダウンロードしますか？`,
				detail: `現在ver ${myver}\n新規ver ${netver}`,
			};
//			const di = await remote.dialog.showMessageBox(o as any);// iconのせい
//			if (di.response > 0) return;

			if (CmnLib.debugLog) console.log(`[update_check] アプリダウンロード開始`);
			const mp = /path: (.+)/.exec(txt);
			if (! mp) throw `[update_check] ファイル内にpathが見つかりません`;
			const fn = mp[1];

			const mc = /sha512: (.+)/.exec(txt);
			if (! mc) throw `[update_check] ファイル内にsha512が見つかりません`;
			const sha = mc[1];

			const res_dl = await this.fetch(url + fn);
			if (! res_dl.ok) return;
			const pathDL = this.hInfo.downloads +'/'+ fn;
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

				to_app.readFile(pathDL, async (err: any, data: any)=> {
					if (err) throw err;

					const h = createHash('SHA512');
					h.update(data)
					const hash = String(h.digest('base64'));

					const isOk = sha === hash;
					if (CmnLib.debugLog) console.log(`[update_check] SHA512 Checksum:${isOk}`, sha, hash);
					if (! isOk) await to_app.removeSync(pathDL);

					o.buttons.pop();
					o.message = `アプリ【${this.cfg.oCfg.book.title}】の更新パッケージを\nダウンロードしました`+ (isOk ?'' :'が、破損しています。\n開発元に連絡してください');
//					remote.dialog.showMessageBox(o as any);	// iconのせい
				});
			});
			pipe_dl.pipe(await to_app.createWriteStream(pathDL));
		})();

		return false;
	}
	// アプリウインドウ設定
	protected override readonly	window: ITag = hArg=> {
		(async()=> {
			const x = argChk_Num(hArg, 'x', Number(this.val.getVal('sys:const.sn.nativeWindow.x', 0)));
			const y = argChk_Num(hArg, 'y', Number(this.val.getVal('sys:const.sn.nativeWindow.y', 0)));
			await to_app.window(argChk_Boolean(hArg, 'centering', false), x, y, CmnLib.stageW, CmnLib.stageH);
			this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.x', x);
			this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.y', y);
			await this.flush();
		})();

		return false;
	}

}
