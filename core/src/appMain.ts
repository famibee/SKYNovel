/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2021-2021 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {screen, app, BrowserWindow, ipcMain} from 'electron';
	// ギャラリーでエラーになる【error TS2503: Cannot find namespace 'Electron'.】ので const ではなく import の形に
import {existsSync, copySync, removeSync, ensureDirSync, createWriteStream, createReadStream, readFileSync, readFile, writeFileSync, appendFile, ensureFileSync} from 'fs-extra';
const Store = require('electron-store');
import {pack, extract} from 'tar-fs';
import {HINFO} from './preload';

export class appMain {
	private	readonly	dsp = screen.getPrimaryDisplay();
	private	readonly	screenRX = this.dsp.size.width;
	private	readonly	screenRY = this.dsp.size.height;
	private	readonly	hInfo	: HINFO = {
		getAppPath	: app.getAppPath(),
		isPackaged	: app.isPackaged,
		downloads	: app.getPath('downloads'),
		userData	: app.getPath('userData'),
		getVersion	: String(app.getVersion()),
		env			: {...process.env},
		screenResolutionX	: this.screenRX,
		screenResolutionY	: this.screenRY,
	};

	// console.log は【プロジェクト】のターミナルに出る
	private	constructor(private readonly bw: BrowserWindow) {
//	private	constructor(private readonly bw: Electron.BrowserWindow) {
		ipcMain.handle('getInfo', ()=> this.hInfo);

		ipcMain.handle('existsSync', (_: any, fn: string)=> existsSync(fn));
		ipcMain.handle('copySync', (_: any, path_from: string, path_to: string)=> copySync(path_from, path_to));
		ipcMain.handle('removeSync', (_: any, fn: string)=> removeSync(fn));
		ipcMain.handle('ensureDirSync', (_: any, fn: string)=> ensureDirSync(fn));
		ipcMain.handle('ensureFileSync', (_: any, fn: string)=> ensureFileSync(fn));
		ipcMain.handle('createWriteStream', (_: any, path: string)=> createWriteStream(path));
		ipcMain.handle('createReadStream', (_: any, path: string)=> createReadStream(path));
		ipcMain.handle('readFileSync', (_: any, path: string)=> readFileSync(path, {encoding: 'utf8'}));
		ipcMain.handle('readFile', (_: any, path: string, callback: (err: NodeJS.ErrnoException, data: Buffer)=> void)=>readFile(path, callback));
		ipcMain.handle('writeFileSync', (_: any, path: string, data: Buffer, o: object)=> writeFileSync(path, data, o));
		ipcMain.handle('appendFile', (_: any, path: string, data: string, callback: (err: Error)=> void)=> appendFile(path, data, callback));

		ipcMain.handle('window', (_: any, centering: boolean, x: number, y: number, w: number, h: number)=> this.window(centering, x, y, w, h));
		ipcMain.handle('isSimpleFullScreen', ()=> bw.isSimpleFullScreen());
		ipcMain.handle('setSimpleFullScreen', (_: any, b: boolean)=> bw.setSimpleFullScreen(b));
		ipcMain.handle('win_close', ()=> bw.close());
		ipcMain.handle('win_setTitle', (_: any, title: string)=> bw.setTitle(title));
		ipcMain.handle('win_setContentSize', (_: any, w: number, h: number)=> bw.setContentSize(w, h));
		ipcMain.handle('win_setSize', (_: any, w: number, h: number)=> bw.setSize(w, h));

		ipcMain.handle('openDevTools', ()=> bw.webContents.openDevTools());
		ipcMain.handle('win_ev_devtools_opened', (_: any, fnc: ()=> void)=> bw.webContents.on('devtools-opened', fnc));
		ipcMain.handle('tgl_full_scr_sub', (_: any, centering: boolean, x: number, y: number, w: number, h: number)=> this.window(centering, x, y, w, h));

		let	st: any;
		ipcMain.handle('Store', (_: any, o: object)=> {st = new Store(o); return;});	// return必要、Storeをcloneしてしまうので
		ipcMain.handle('flush', (_: any, o: object)=> {st.store = o; return;});
		ipcMain.handle('Store_isEmpty', ()=> st.size === 0);
		ipcMain.handle('Store_get', ()=> st.store);

		ipcMain.handle('tarFs_pack', (_: any, path: string)=> pack(path));
		ipcMain.handle('tarFs_extract', (_: any, path: string)=>extract(path));


		bw.on('move', ()=> {
			if (this.isMovingWin) return;
			this.isMovingWin = true;
			this.posMovingWin = bw.getPosition();
			setTimeout(()=> this.delayWinPos(), 500);
		});
	}
	private	isMovingWin		= false;
	private	posMovingWin	= [0, 0];
	private	delayWinPos() {
		if (this.bw.isSimpleFullScreen()) return;

		const p = this.bw.getPosition();
		if (this.posMovingWin[0] !== p[0] || this.posMovingWin[1] !== p[1]) {
			this.posMovingWin = p;
			setTimeout(()=> this.delayWinPos(), 500);
			return;
		}
		this.window(false, p[0], p[1], 0, 0);
		this.isMovingWin = false;
	}

	private	window(centering: boolean, x: number, y: number, w: number, h: number) {
		if (centering) {
			const s = this.bw.getPosition();
			x = (this.screenRX - s[0]) *0.5;
			y = (this.screenRY - s[1]) *0.5;
		}
		else {
			if (x < 0) x = 0; else if (x > this.screenRX) x = 0;
			if (y < 0) y = 0; else if (y > this.screenRY) y = 0;
		}
		this.bw.setPosition(x, y);
		this.bw.setContentSize(w, h);
			// 2019/07/06 Windowsでこれがないとどんどん縦に短くなる
		const hz = this.bw.getContentSize()[1];
		this.bw.setContentSize(w, h *2 -hz);
			// 2019/07/14 setContentSize()したのにメニュー高さぶん勝手に削られた値にされる不具合ぽい動作への対応
	}

	openDevTools() {this.bw.webContents.openDevTools();}


	private	static	ins: appMain;
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
	//== old ==
					nodeIntegration: true,
					contextIsolation: false,	// electron v12.0.0対応
					enableRemoteModule: true,
//					preload: '../lib/core/lib/preload.js',
	//== old ==
/*	//== new ==
					nodeIntegration: false,
					contextIsolation: true,
					enableRemoteModule: false,
//					preload: __dirname + '/core/lib/preload.js',
*/	//== new ==
				},
			});
//	bw.webContents.openDevTools();
			appMain.ins = new appMain(bw);
			openDevTools = ()=> appMain.ins.openDevTools();
			bw.loadFile(path_htm);
		}
		catch (e) {
			console.error(`ealy err:${e}`);
			openDevTools();
			throw 'initRenderer error';
		}

		return bw;
	}

}

module.exports = appMain;
