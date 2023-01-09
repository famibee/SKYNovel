/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2021-2023 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {screen, app, BrowserWindow, ipcMain, shell, dialog} from 'electron';
	// ギャラリーでエラーになる【error TS2503: Cannot find namespace 'Electron'.】ので const ではなく import の形に
import {existsSync, copySync, removeSync, ensureDirSync, readFileSync, readFile, writeFileSync, appendFile, ensureFileSync} from 'fs-extra';
import Store from 'electron-store';
import AdmZip from 'adm-zip';
import {HINFO} from './preload';

export class appMain {
	readonly	#dspSize = screen.getPrimaryDisplay().size;
	readonly	#screenRX = this.#dspSize.width;
	readonly	#screenRY = this.#dspSize.height;
	readonly	#hInfo	: HINFO = {
		getAppPath	: app.getAppPath(),
		isPackaged	: app.isPackaged,
		downloads	: app.getPath('downloads'),
		userData	: app.getPath('userData'),
		getVersion	: '',
		env			: {...process.env},
		platform	: process.platform,
		arch		: process.arch,
	};
	#winX	= 0;
	#winY	= 0;
	#stageW = 0;
	#stageH = 0;
	#isWin	= process.platform === 'win32';

	private	constructor(private readonly bw: BrowserWindow, version: string) {
		this.#hInfo.getVersion = version;
		ipcMain.handle('getInfo', ()=> this.#hInfo);

		ipcMain.handle('existsSync', (_, fn)=> existsSync(fn));
		ipcMain.handle('copySync', (_, path_from, path_to)=> copySync(path_from, path_to));
		ipcMain.handle('removeSync', (_, fn)=> removeSync(fn));
		ipcMain.handle('ensureFileSync', (_, fn)=> ensureFileSync(fn));
		ipcMain.handle('readFileSync', (_, path)=> readFileSync(path, {encoding: 'utf8'}));
		ipcMain.handle('readFile', (_, path, callback)=>readFile(path, callback));
		ipcMain.handle('writeFileSync', (_, path, data, o)=> writeFileSync(path, data, o));
		ipcMain.handle('appendFile', (_, path, data, callback)=> appendFile(path, data, callback));

		ipcMain.handle('win_close', ()=> bw.close());
		ipcMain.handle('win_setTitle', (_, title)=> bw.setTitle(title));
		// console.log は【プロジェクト】のターミナルに出る

		ipcMain.handle('showMessageBox', (_, o)=> dialog.showMessageBox(o));

		ipcMain.handle('capturePage', (_, fn)=> bw.webContents.capturePage()
		.then(ni=> writeFileSync(fn, (fn.slice(-4) === '.png') ?ni.toPNG() :ni.toJPEG(80))));
		ipcMain.handle('navigate_to', (_, url)=> shell.openExternal(url));

		ipcMain.handle('openDevTools', ()=> bw.webContents.openDevTools());
		ipcMain.handle('win_ev_devtools_opened', (_, fnc)=> bw.webContents.on('devtools-opened', fnc));

		let	st: any;
		ipcMain.handle('Store', (_, o)=> {st = new Store(o); return;});	// return必要、Storeをcloneしてしまうので
		ipcMain.handle('flush', (_, o)=> {st.store = o; return;});
		ipcMain.handle('Store_isEmpty', ()=> st.size === 0);
		ipcMain.handle('Store_get', ()=> st.store);

		ipcMain.handle('zip', (_, inp, out)=> {
			const zip = new AdmZip();
			zip.addLocalFolder(inp);
			zip.writeZip(out);
		});
		ipcMain.handle('unzip', (_, inp, out)=> {
			removeSync(out);
			ensureDirSync(out);	// ディレクトリ、なければ作る

			const zip = new AdmZip(inp);
			zip.extractAllTo(out, true);
		});

		ipcMain.handle('isSimpleFullScreen', ()=> bw.simpleFullScreen);
		if (this.#isWin) {
			ipcMain.handle('setSimpleFullScreen', (_, b)=> {
				this.#isMovingWin = true;
				bw.setSimpleFullScreen(b);	// これだけで #onMove 発生
				if (! b) {
					bw.setPosition(this.#winX, this.#winY);
					bw.setContentSize(this.#stageW, this.#stageH +appMain.#menu_height);	// メニュー高さぶん足す
				}
				this.#isMovingWin = false;
			});
			// winでのみ必要な処理なので、winでのみ処理させる
			// 以下のイベントは winで必ず、macでは「Command + Control + F」でのみ発生
			bw.on('enter-full-screen', ()=> {
				//this.#isMovingWin = true;	// 効かない
				bw.setContentSize(this.#screenRX, this.#screenRY -appMain.#menu_height);	// メニュー高さぶん引く
				//this.#isMovingWin = false;
			});
			bw.on('leave-full-screen', ()=> {
				this.#window(false, this.#winX, this.#winY, this.#stageW, this.#stageH +appMain.#menu_height);	// メニュー高さぶん足す
			});
		}
		else ipcMain.handle('setSimpleFullScreen', (_, b)=> {
			bw.setSimpleFullScreen(b);
			if (! b) bw.setContentSize(this.#stageW, this.#stageH +appMain.#menu_height);	// メニュー高さぶん足す
		});

		ipcMain.handle('window', (_, centering, x, y, w, h)=> this.#window(centering, x, y, w, h));
		bw.on('move', ()=> this.#onMove());
	}
	#tid: NodeJS.Timeout | undefined = undefined;
	#onMove() {
//console.log(`fn:appMain.ts #onMove #isMovingWin:${this.#isMovingWin}`);
		if (this.#tid) return;

		if (this.#isMovingWin) return;
		this.#isMovingWin = true;

		const {x, y} = this.bw.getBounds();
		this.#tid = setTimeout(()=> {	// clearTimeout()不要と判断
			this.#tid = undefined;
			if (this.#skipDelayWinPos) {this.#skipDelayWinPos = false; return;}

			this.#isMovingWin = false;
			const rct = this.bw.getBounds();
			if (x !== rct.x || y !== rct.y) {this.#onMove(); return;}
			this.#window(false, rct.x, rct.y, this.#stageW, this.#stageH);
		}, 1000 /60 *10);
	}
	#skipDelayWinPos	= false;
	#isMovingWin		= false;

	#window(centering: boolean, x: number, y: number, w: number, h: number) {
//console.log(`#window isFS:${this.bw.simpleFullScreen} isMovingWin:${this.#isMovingWin} (${x}, ${y}, ${w}, ${h})`);
		if (this.#isMovingWin) return;
		this.#isMovingWin = true;
		if (this.bw.simpleFullScreen) return;
			// 全画面時に無効にする意味合いと、
			// winでのみ全画面移行時に【setContentSize】から発生

		if (centering) {
			[x, y] = this.bw.getPosition();
			x = (this.#screenRX - x) *0.5;
			y = (this.#screenRY - y) *0.5;
		}
		else {
			if (x < 0 || x > this.#screenRX) x = 0;
			if (y < 0 || y > this.#screenRY) y = 0;
		}
		if (this.#winX !== x || this.#winY !== y) {
			this.#winX = x;
			this.#winY = y;
			this.bw.webContents.send('save_win_pos', x, y);
			this.bw.setPosition(x, y);
		}

		this.#stageW = w;
		this.#stageH = h;
		this.bw.setContentSize(w, h +appMain.#menu_height);// メニュー高さぶん足す
			// Sizeは変更時のみの送信、をするとどんどん小さくなるので注意

		this.#isMovingWin = false;
	}

	openDevTools() {this.bw.webContents.openDevTools();}


	static	#ins: appMain;
	static	initRenderer(path_htm: string, version: string, o: object): BrowserWindow {
		// ギャラリーでエラーになる【error TS2503: Cannot find namespace 'Electron'.】のでこの形に
		let openDevTools = ()=> {};
		let bw: BrowserWindow;
		try {
			Store.initRenderer();

			process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
			// 2018/05/08
			// disable security-warnings not working · Issue #11970 · electron/electron https://github.com/electron/electron/issues/11970

			bw = new BrowserWindow({
				...o,
				fullscreenable	: true,
				maximizable		: false,// Macで最大化ボタンでフルスクリーンにしない
				webPreferences	: {
					// XSS対策としてnodeモジュールをレンダラープロセスで使えなくする
					enableRemoteModule	: false,
					nodeIntegration		: false,
					// レンダラープロセスに公開するAPIのファイル
					contextIsolation	: true,
					preload				: `${__dirname}/preload.js`,
					backgroundColor		: '#000',
					show				: false,// 起動中真っ白対策
				},
			});

			bw.setMenuBarVisibility(false);
			const cs_no_menu_h = bw.getContentSize()[1];
			bw.setMenuBarVisibility(true);
			const cs_menu_h = bw.getContentSize()[1];
			appMain.#menu_height = cs_no_menu_h -cs_menu_h;
				// win10 で 20 ぐらいに。macOSでは 0

			appMain.#ins = new appMain(bw, version);
			openDevTools = ()=> appMain.#ins.openDevTools();
			bw.loadFile(path_htm);
			bw.once('ready-to-show', ()=> bw.show());
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
