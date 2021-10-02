/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2021-2021 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {screen, app, BrowserWindow, ipcMain, shell} from 'electron';
	// ギャラリーでエラーになる【error TS2503: Cannot find namespace 'Electron'.】ので const ではなく import の形に
import {existsSync, copySync, removeSync, ensureDirSync, createWriteStream, createReadStream, readFileSync, readFile, writeFileSync, appendFile, ensureFileSync} from 'fs-extra';
const Store = require('electron-store');
import {pack, extract} from 'tar-fs';
import {HINFO} from './preload';

export class appMain {
	readonly	#dsp = screen.getPrimaryDisplay();
	readonly	#screenRX = this.#dsp.size.width;
	readonly	#screenRY = this.#dsp.size.height;
	readonly	#hInfo	: HINFO = {
		getAppPath	: app.getAppPath(),
		isPackaged	: app.isPackaged,
		downloads	: app.getPath('downloads'),
		userData	: app.getPath('userData'),
		getVersion	: String(app.getVersion()),
		env			: {...process.env},
		screenResolutionX	: this.#screenRX,
		screenResolutionY	: this.#screenRY,
	};

	// console.log は【プロジェクト】のターミナルに出る
	private	constructor(private readonly bw: BrowserWindow) {
//	private	constructor(private readonly bw: Electron.BrowserWindow) {
		ipcMain.handle('getInfo', ()=> this.#hInfo);

		ipcMain.handle('existsSync', (_, fn)=> existsSync(fn));
		ipcMain.handle('copySync', (_, path_from, path_to)=> copySync(path_from, path_to));
		ipcMain.handle('removeSync', (_, fn)=> removeSync(fn));
		ipcMain.handle('ensureDirSync', (_, fn)=> ensureDirSync(fn));
		ipcMain.handle('ensureFileSync', (_, fn)=> ensureFileSync(fn));
		ipcMain.handle('createWriteStream', (_, path)=> createWriteStream(path));
		ipcMain.handle('createReadStream', (_, path)=> createReadStream(path));
		ipcMain.handle('readFileSync', (_, path)=> readFileSync(path, {encoding: 'utf8'}));
		ipcMain.handle('readFile', (_, path, callback)=>readFile(path, callback));
		ipcMain.handle('writeFileSync', (_, path, data, o)=> writeFileSync(path, data, o));
		ipcMain.handle('appendFile', (_, path, data, callback)=> appendFile(path, data, callback));

		ipcMain.handle('window', (_, centering: boolean, x, y, w, h)=> this.#window(centering, x, y, w, h));
		ipcMain.handle('isSimpleFullScreen', ()=> bw.isSimpleFullScreen());
		ipcMain.handle('setSimpleFullScreen', (_, b)=> bw.setSimpleFullScreen(b));
		ipcMain.handle('win_close', ()=> bw.close());
		ipcMain.handle('win_setTitle', (_, title)=> bw.setTitle(title));
		ipcMain.handle('win_setContentSize', (_, w, h)=> {
			this.#isMovingWin = true;
			bw.setContentSize(w, h +appMain.#menu_height);
			this.#isMovingWin = false;
		});
		ipcMain.handle('win_setSize', (_, w, h)=> {
			this.#isMovingWin = true;
			bw.setSize(w, h);
			this.#isMovingWin = false;
		});

		ipcMain.handle('capturePage', (_, fn)=> bw.webContents.capturePage()
		.then(ni=> writeFileSync(fn, (fn.slice(-4) === '.png') ?ni.toPNG() :ni.toJPEG(80))));
		ipcMain.handle('navigate_to', (_, url)=> shell.openExternal(url));

		ipcMain.handle('openDevTools', ()=> bw.webContents.openDevTools());
		ipcMain.handle('win_ev_devtools_opened', (_, fnc)=> bw.webContents.on('devtools-opened', fnc));
		ipcMain.handle('tgl_full_scr_sub', (_, centering, x, y, w, h)=> this.#window(centering, x, y, w, h));

		let	st: any;
		ipcMain.handle('Store', (_, o)=> {st = new Store(o); return;});	// return必要、Storeをcloneしてしまうので
		ipcMain.handle('flush', (_, o)=> {st.store = o; return;});
		ipcMain.handle('Store_isEmpty', ()=> st.size === 0);
		ipcMain.handle('Store_get', ()=> st.store);

		ipcMain.handle('tarFs_pack', (_, path)=> pack(path));
		ipcMain.handle('tarFs_extract', (_, path)=>extract(path));


		bw.on('move', ()=> {
			if (this.#isMovingWin) return;
			this.#isMovingWin = true;
			this.#posMovingWin = bw.getPosition();
			setTimeout(()=> this.#delayWinPos(), 500);
		});
	}
	#isMovingWin	= false;
	#posMovingWin	= [0, 0];
	#delayWinPos() {
		if (this.bw.isSimpleFullScreen()) return;

		const p = this.bw.getPosition();
		if (this.#posMovingWin[0] !== p[0] || this.#posMovingWin[1] !== p[1]) {
			this.#posMovingWin = p;
			setTimeout(()=> this.#delayWinPos(), 500);
			return;
		}
		this.#window(false, p[0], p[1], 0, 0);
		//this.isMovingWin = false;	// this.window()内でやってるので
	}

	#window(centering: boolean, x: number, y: number, w: number, h: number) {
		this.#isMovingWin = true;
		if (centering) {
			const s = this.bw.getPosition();
			x = (this.#screenRX - s[0]) *0.5;
			y = (this.#screenRY - s[1]) *0.5;
		}
		else {
			if (x < 0) x = 0; else if (x > this.#screenRX) x = 0;
			if (y < 0) y = 0; else if (y > this.#screenRY) y = 0;
		}
		this.bw.setPosition(x, y);
		this.bw.setContentSize(w, h);
			// 2019/07/06 Windowsでこれがないとどんどん縦に短くなる
		const hz = this.bw.getContentSize()[1];
		this.bw.setContentSize(w, h *2 -hz);
			// 2019/07/14 setContentSize()したのにメニュー高さぶん勝手に削られた値にされる不具合ぽい動作への対応
		this.#isMovingWin = false;
	}

	openDevTools() {this.bw.webContents.openDevTools();}


	static	#ins: appMain;
	static	initRenderer(path_htm: string, o: object): BrowserWindow {
//	static	initRenderer(path_htm: string, o: object): Electron.BrowserWindow {
		// ギャラリーでエラーになる【error TS2503: Cannot find namespace 'Electron'.】のでこの形に
		let openDevTools = ()=> {};
		let bw: Electron.BrowserWindow;
		try {
			Store.initRenderer();

			process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
			// 2018/05/08
			// disable security-warnings not working · Issue #11970 · electron/electron https://github.com/electron/electron/issues/11970

			bw = new BrowserWindow({
				...o,
				webPreferences	: {
					nativeWindowOpen: true,		// electron 14 以降のデフォルト

					// XSS対策としてnodeモジュールをレンダラープロセスで使えなくする
					enableRemoteModule: false,
					nodeIntegration: false,
					// レンダラープロセスに公開するAPIのファイル
					contextIsolation: true,
					preload: `${__dirname}/core/lib/preload.js`,
				},
			});
//	bw.webContents.openDevTools();

			bw.setMenuBarVisibility(false);
			const cs_no_menu_h = bw.getContentSize()[1];
			bw.setMenuBarVisibility(true);
			const cs_menu_h = bw.getContentSize()[1];
			appMain.#menu_height = cs_no_menu_h -cs_menu_h;
				// win10 で 20 ぐらいに。macOSでは 0

			appMain.#ins = new appMain(bw);
			openDevTools = ()=> appMain.#ins.openDevTools();
			bw.loadFile(path_htm);
		}
		catch (e) {
			console.error(`ealy err:${e}`);
			openDevTools();
			throw 'initRenderer error';
		}

		return bw;
	}
	static	#menu_height = 0;

}

module.exports = appMain;
