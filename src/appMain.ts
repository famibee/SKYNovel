/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2021-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {HINFO, TAG_WINDOW} from './preload';
import {T_CFG} from './sn/ConfigBase';

import {screen, app, BrowserWindow, ipcMain, shell, dialog, MessageBoxOptions, Size} from 'electron';
	// ギャラリーでエラーになる【error TS2503: Cannot find namespace 'Electron'.】ので const ではなく import の形に
import {existsSync, copySync, removeSync, ensureDirSync, readFileSync, writeFileSync, appendFile, ensureFileSync, outputFile, WriteFileOptions} from 'fs-extra';
import Store from 'electron-store';
import AdmZip from 'adm-zip';

const	isWin	= process.platform === 'win32';

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
	#cvsW	= 0;
	#cvsH	= 0;

	private	constructor(private readonly bw: BrowserWindow, readonly version: string, readonly path_htm: string) {
		// 以下コメントアウトなら【プロジェクト】のターミナルに出る
		console.log = (arg: any)=> this.bw.webContents.send('log', arg);

		bw.webContents.on('devtools-opened', ()=> this.#evDevtoolsOpened());
		ipcMain.handle('openDevTools', ()=> bw.webContents.openDevTools());

		this.#hInfo.getVersion = version;
		ipcMain.handle('getInfo', ()=> this.#hInfo);
		ipcMain.handle('inited', (_, c: T_CFG, tagW: TAG_WINDOW)=> this.#inited(c, tagW));

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

		ipcMain.handle('showMessageBox', (_, o: MessageBoxOptions)=> dialog.showMessageBox(o));

		ipcMain.handle('capturePage', (_, fn: string, width: number, height: number)=> bw.webContents.capturePage()
		.then(ni=> {
			ensureFileSync(fn);	// 【必須】ディレクトリ、なければ作る

			const c = ni.resize({width, height, quality: 'best'});
			const d = (fn.endsWith('.png')) ?c.toPNG() :c.toJPEG(80);
			writeFileSync(fn, d);
		}));
		ipcMain.handle('navigate_to', (_, url: string)=> shell.openExternal(url));

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

		ipcMain.handle('isSimpleFullScreen', ()=> bw.simpleFullScreen);
		if (isWin) {
			ipcMain.handle('setSimpleFullScreen', (_, b: boolean)=> {
				this.#isMovingWin = true;
				bw.setSimpleFullScreen(b);	// これだけで #onMove 発生
				if (! b) {
					bw.setPosition(this.#winX, this.#winY);
					bw.setContentSize(this.#cvsW, this.#cvsH);
				}
				this.#isMovingWin = false;
			});
			// winでのみ必要な処理なので、winでのみ処理させる
			// 以下のイベントは winで必ず、macでは「Command + Control + F」でのみ発生
			bw.on('enter-full-screen', ()=> {
				//this.#isMovingWin = true;	// 効かない
				bw.setContentSize(this.#scrSize.width, this.#scrSize.height);	// メニュー高さぶん引く
				//this.#isMovingWin = false;
			});
			bw.on('leave-full-screen', ()=> {
				this.#window(false, this.#winX, this.#winY, this.#cvsW, this.#cvsH);
			});
		}
		else ipcMain.handle('setSimpleFullScreen', (_, b: boolean)=> {
			bw.setSimpleFullScreen(b);
			if (b) return;

			bw.setContentSize(this.#cvsW, this.#cvsH);
		});
		ipcMain.handle('window', (_, c: boolean, x: number, y: number, w: number, h: number)=> this.#window(c, x, y, w, h));

		bw.on('move', ()=> this.#onMove());
		bw.on('resize', ()=> this.#onMove());

		this.#chgDsp();	// 必須

		bw.loadFile(path_htm);
	}

	#numAspectRatio	= 0;
	openDevTools	= ()=> {};
	#evDevtoolsOpened = ()=> this.bw.webContents.closeDevTools();	// 開こうとしたら閉じる
	#inited(oCfg: T_CFG, rctW: TAG_WINDOW) {
		const {c, x, y, w, h} = rctW;
		this.#numAspectRatio = w / h;
		if (! isWin) this.bw.setAspectRatio(this.#numAspectRatio);
		this.#window(c, x, y, w, h);
		this.bw.show();

		if (oCfg.debug.devtool) {
			this.#evDevtoolsOpened = ()=> {};
			this.openDevTools = ()=> this.bw.webContents.openDevTools({
				mode	: 'detach',	// 別ウィンドウに切り離すが画面内に戻せない
			//	activate: false,	// 他のウインドウの後ろに回って見失いがち
			});
			this.openDevTools();
			return;
		}

		this.#evDevtoolsOpened = ()=> {
			this.bw.webContents.closeDevTools();	// 開こうとしたら閉じる
			this.bw.setTitle(`DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。`);
			this.bw.webContents.send('shutdown');
		};
	}

	#scrSize: Size;
	#chgDsp() {
		const csp = screen.getCursorScreenPoint();
		const dsp = screen.getDisplayNearestPoint(csp);
		this.#scrSize = dsp.workAreaSize;
	}

	#tid: NodeJS.Timeout | undefined = undefined;
	#skipDelayWinPos	= false;
	#isMovingWin		= false;
	#onMove() {
//console.log(`fn:appMain.ts #onMove #isMovingWin:${this.#isMovingWin}`);
		if (this.#tid) return;

		if (this.#isMovingWin) return;
		this.#isMovingWin = true;

		const [ox, oy] = this.bw.getPosition();
		const [ow, oh] = this.bw.getContentSize();
//console.log(`fn:appMain.ts #onMove - ox:${ox} oy:${oy} ow:${ow} oh:${oh}`);
		this.#tid = setTimeout(()=> {	// clearTimeout()不要と判断
			this.#tid = undefined;
			if (this.#skipDelayWinPos) {this.#skipDelayWinPos = false; return}

			this.#isMovingWin = false;
			const [nx, ny] = this.bw.getPosition();
			const [nw, nh] = this.bw.getContentSize();
//console.log(`fn:appMain.ts #onMove = ow:${ow} nw:${nw} oh:${oh} nh:${nh}`);
			if (ox !== nx || oy !== ny || ow !== nw || oh !== nh) {this.#onMove(); return}
			this.#window(false, nx, ny, nw, nh);
		}, 1000 /60 *10);
	}

	#window(centering: boolean, x: number, y: number, w: number, h: number) {
		if (this.#isMovingWin) return;
		this.#isMovingWin = true;
		if (this.bw.simpleFullScreen) return;
			// 全画面時に無効にする意味合いと、
			// winでのみ全画面移行時に【setContentSize】から発生

//console.log(`fn:appMain.ts #window (${x}, ${y}, ${w}, ${h}) w/h=${w/h} scr(${this.#scrSize.width}, ${this.#scrSize.height})`);
		if (centering) {
			this.#chgDsp();
			x = (this.#scrSize.width - w) *0.5;
			y = (this.#scrSize.height- h) *0.5;
		}
		this.#winX = x = Math.round(x);
		this.#winY = y = Math.round(y);
		this.bw.setPosition(x, y);	// 小数値を渡すと例外？　ぽい（四捨五入でいく）

//console.log(`fn:appMain.ts #window - w:${w} h:${w /this.#numAspectRatio} cw:${this.#cvsW} ch:${this.#cvsH} +${(this.#cvsW !== w)}+${(this.#cvsW !== w) ?Math.round(w /this.#numAspectRatio) :Math.round(h *this.#numAspectRatio)}+`);
		if (isWin) {
			if (this.#cvsW !== w) h = w /this.#numAspectRatio;
			else w = h *this.#numAspectRatio;
		}
		this.#cvsW = w = Math.round(w);
		this.#cvsH = h = Math.round(h);
		this.bw.setContentSize(w, h);	// 小数値を渡すと例外？　ぽい（四捨五入でいく）

		this.bw.webContents.send('save_win_inf', {c: centering, x, y, w, h, scrw: this.#scrSize.width, scrh: this.#scrSize.height});
		this.#isMovingWin = false;
	}

}

module.exports = appMain;
