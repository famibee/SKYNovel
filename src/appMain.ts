/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2021-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {HINFO, RECT_WINDOW} from './preload';
import {T_CFG} from './sn/ConfigBase';

import {screen, app, BrowserWindow, ipcMain, shell, dialog, MessageBoxOptions} from 'electron';
	// ギャラリーでエラーになる【error TS2503: Cannot find namespace 'Electron'.】ので const ではなく import の形に
import {existsSync, copySync, removeSync, ensureDirSync, readFileSync, writeFileSync, appendFile, ensureFileSync, outputFile, WriteFileOptions} from 'fs-extra';
import Store from 'electron-store';
import AdmZip from 'adm-zip';

export class appMain {
	static	initRenderer(path_htm: string, version: string, _o: object): BrowserWindow {
		// ギャラリーでエラーになる【error TS2503: Cannot find namespace 'Electron'.】のでこの形に
		let bw: BrowserWindow;
		let opLocalDevTools = ()=> {};
		try {
			Store.initRenderer();

			process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
			// 2018/05/08
			// disable security-warnings not working · Issue #11970 · electron/electron https://github.com/electron/electron/issues/11970

			bw = new BrowserWindow({
			//	...o,
				// 以下で上書き
				show		: false,	// ウインドウ位置（とサイズ）決定時に表示
				minWidth	: 300,
				minHeight	: 300,
				acceptFirstMouse: true,
				maximizable		: false,// Macで最大化ボタンでフルスクリーンにしない
				webPreferences	: {
					// XSS対策としてnodeモジュールをレンダラープロセスで使えなくする
					nodeIntegration		: false,
					// レンダラープロセスに公開するAPIのファイル
					contextIsolation	: true,
					preload				: `${__dirname}/preload.js`,
				},
			});
			const am = new appMain(bw, version, path_htm);
			opLocalDevTools = ()=> am.openDevTools();
		}
		catch (e) {
			console.error(`early err:${e}`);
			opLocalDevTools();
			throw 'initRenderer error';
		}

		return bw;
	}


	openDevTools	= ()=> {};
	#inited(oCfg: T_CFG, rctW: RECT_WINDOW) {
		const {c, x, y, w, h} = rctW;
		this.#window(c, x, y, w, h);
		this.bw.setAspectRatio(w / h);
		this.bw.show();

		if (oCfg.debug.devtool) {
			this.#evDevtoolsOpened = ()=> {};
			this.openDevTools = ()=> this.bw.webContents.openDevTools({
				mode	: 'detach',	// 別ウィンドウに切り離すが画面内に戻せない
			//	activate: false,	// 他のウインドウの後ろに回って見失いがち
			});
			this.openDevTools();
			this.bw.focus();	// 【activate: false】よりいい挙動
			return;
		}

		this.#evDevtoolsOpened = ()=> {
			this.bw.webContents.closeDevTools();	// 開こうとしたら閉じる
			this.bw.setTitle(`DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。`);
			this.bw.webContents.send('shutdown');
		};
	}
	#evDevtoolsOpened = ()=> this.bw.webContents.closeDevTools();	// 開こうとしたら閉じる

	readonly	#dspSize= screen.getPrimaryDisplay().size;
	readonly	#scrRX	= this.#dspSize.width;
	readonly	#scrRY	= this.#dspSize.height;
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
	readonly	#isWin	= process.platform === 'win32';
	readonly	#menu_height;

	private	constructor(private readonly bw: BrowserWindow, readonly version: string, readonly path_htm: string) {
		bw.webContents.on('devtools-opened', ()=> this.#evDevtoolsOpened());


		this.#hInfo.getVersion = version;
		ipcMain.handle('getInfo', ()=> this.#hInfo);
		ipcMain.handle('inited', (_, c: T_CFG, rctW: RECT_WINDOW)=> this.#inited(c, rctW));

		ipcMain.handle('existsSync', (_, fn: string)=> existsSync(fn));
		ipcMain.handle('copySync', (_, path_from: string, path_to: string)=> copySync(path_from, path_to));
		ipcMain.handle('removeSync', (_, fn: string)=> removeSync(fn));
		ipcMain.handle('ensureFileSync', (_, fn: string)=> ensureFileSync(fn));
		ipcMain.handle('readFileSync', (_, path: string)=> readFileSync(path, {encoding: 'utf8'}));
		ipcMain.handle('writeFileSync', (_, path: string, data: string | NodeJS.ArrayBufferView, o: WriteFileOptions)=> writeFileSync(path, data, o));
		ipcMain.handle('appendFile', (_, path: string, data: string | Uint8Array)=> appendFile(path, data).catch(err=> console.log(err)));
		ipcMain.handle('outputFile', (_, path: string, data: string | NodeJS.ArrayBufferView)=> outputFile(path, data).catch(err=> console.log(err)));

		ipcMain.handle('win_close', ()=> bw.close());
		ipcMain.handle('win_setTitle', (_, title: string)=> bw.setTitle(title));
		// console.log は【プロジェクト】のターミナルに出る

		ipcMain.handle('showMessageBox', (_, o: MessageBoxOptions)=> dialog.showMessageBox(o));

		ipcMain.handle('capturePage', (_, fn: string, width: number, height: number)=> bw.webContents.capturePage()
		.then(ni=> {
			ensureFileSync(fn);	// 【必須】ディレクトリ、なければ作る

			const c = ni.resize({width, height, quality: 'best'});
			const d = (fn.slice(-4) === '.png') ?c.toPNG() :c.toJPEG(80);
			writeFileSync(fn, d);
		}));
		ipcMain.handle('navigate_to', (_, url: string)=> shell.openExternal(url));

		ipcMain.handle('openDevTools', ()=> bw.webContents.openDevTools());

		let	st: any;
		ipcMain.handle('Store', (_, o)=> {st = new Store(o); return});	// return必要、Storeをcloneしてしまうので
		ipcMain.handle('flush', (_, o)=> {st.store = o; return});
		ipcMain.handle('Store_isEmpty', ()=> st.size === 0);
		ipcMain.handle('Store_get', ()=> st.store);

		ipcMain.handle('zip', (_, inp: string, out: string)=> {
			const zip = new AdmZip;
			zip.addLocalFolder(inp);
			zip.writeZip(out);
		});
		ipcMain.handle('unzip', (_, inp: string, out: string)=> {
			removeSync(out);
			ensureDirSync(out);	// ディレクトリ、なければ作る

			const zip = new AdmZip(inp);
			zip.extractAllTo(out, true);
		});

		bw.setMenuBarVisibility(false);
		const cs_no_menu_h = bw.getContentSize()[1];
		bw.setMenuBarVisibility(true);
		const cs_menu_h = bw.getContentSize()[1];
		const menu_height = this.#menu_height = cs_no_menu_h -cs_menu_h;
			// win10 で 20 ぐらいに。macOSでは 0
			//dialog.showMessageBox({message: `fn:appMain.ts A:${cs_no_menu_h} B:${cs_menu_h}`});
		ipcMain.handle('isSimpleFullScreen', ()=> bw.simpleFullScreen);
		if (this.#isWin) {
			ipcMain.handle('setSimpleFullScreen', (_, b: boolean)=> {
				this.#isMovingWin = true;
				bw.setSimpleFullScreen(b);	// これだけで #onMove 発生
				if (! b) {
					bw.setPosition(this.#winX, this.#winY);
					bw.setContentSize(this.#stageW, this.#stageH +menu_height);	// メニュー高さぶん足す
				}
				this.#isMovingWin = false;
			});
			// winでのみ必要な処理なので、winでのみ処理させる
			// 以下のイベントは winで必ず、macでは「Command + Control + F」でのみ発生
			bw.on('enter-full-screen', ()=> {
				//this.#isMovingWin = true;	// 効かない
				bw.setContentSize(this.#scrRX, this.#scrRY -menu_height);	// メニュー高さぶん引く
				//this.#isMovingWin = false;
			});
			bw.on('leave-full-screen', ()=> {
				this.#window(false, this.#winX, this.#winY, this.#stageW, this.#stageH +menu_height);	// メニュー高さぶん足す
			});
		}
		else ipcMain.handle('setSimpleFullScreen', (_, b: boolean)=> {
			bw.setSimpleFullScreen(b);
			if (! b) bw.setContentSize(this.#stageW, this.#stageH +menu_height);	// メニュー高さぶん足す
		});
		ipcMain.handle('window', (_, c: boolean, x: number, y: number, w: number, h: number)=> this.#window(c, x, y, w, h));

		bw.on('move', ()=> this.#onMove());
		bw.on('resize', ()=> this.#onMove());

		bw.loadFile(path_htm);
	}
	#tid: NodeJS.Timeout | undefined = undefined;
	#onMove() {
//console.log(`fn:appMain.ts #onMove #isMovingWin:${this.#isMovingWin}`);
		if (this.#tid) return;

		if (this.#isMovingWin) return;
		this.#isMovingWin = true;

		const {x: ox, y: oy} = this.bw.getBounds();
		const {width: ow, height: oh} = this.bw.getContentBounds();
		this.#tid = setTimeout(()=> {	// clearTimeout()不要と判断
			this.#tid = undefined;
			if (this.#skipDelayWinPos) {this.#skipDelayWinPos = false; return}

			this.#isMovingWin = false;
			const {x: nx, y: ny} = this.bw.getBounds();
			const {width: nw, height: nh} = this.bw.getContentBounds();
			if (ox !== nx || oy !== ny || ow !== nw || oh !== nh) {this.#onMove(); return}
			this.#window(false, nx, ny, nw, nh);
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
			x = (this.#scrRX - w) *0.5;
			y = (this.#scrRY - h) *0.5;
		}
		if (this.#winX !== x || this.#winY !== y) {
			this.#winX = x;
			this.#winY = y;
			this.bw.setPosition(x, y);
		}

		this.#stageW = w;
		this.#stageH = h;
		this.bw.setContentSize(w, h +this.#menu_height);// メニュー高さぶん足す
			// Sizeは変更時のみの送信、をするとどんどん小さくなるので注意

		this.bw.webContents.send('save_win_inf', {c: centering, x, y, w, h});
		this.#isMovingWin = false;
	}

}

module.exports = appMain;
