/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2021-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {HINFO, TAG_WINDOW} from './preload';
import type {T_CFG} from './sn/ConfigBase';

import {app, BrowserWindow, dialog, ipcMain as ipc, screen, shell} from 'electron';
import type {MessageBoxOptions, Size, OpenDialogOptions} from 'electron/main';
	// ギャラリーでエラーになる【error TS2503: Cannot find namespace 'Electron'.】ので const ではなく import の形に
import {appendFile, copySync, ensureDir, ensureFileSync, existsSync, outputFile, remove, removeSync, WriteFileOptions, writeFileSync} from 'fs-extra';
import Store from 'electron-store';
import AdmZip from 'adm-zip';


export class appMain {
	static	initRenderer(path_htm: string, version: string, _o: object): BrowserWindow {
		// ギャラリーでエラーになる【error TS2503: Cannot find namespace 'Electron'.】のでこの形に
		let bw: BrowserWindow;
		let opLocalDevTools = ()=> {};
		try {
			Store.initRenderer();

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
	#csW	= 0;
	#csH	= 0;

	readonly	#isWin;	// import {os} from 'platform'; は動作しない

	private	constructor(private readonly bw: BrowserWindow, readonly version: string, readonly path_htm: string) {
		this.#isWin = process.platform === 'win32';

		// 以下コメントアウトなら【プロジェクト】のターミナルに出る
		console.log = (arg: any)=> this.bw.webContents.send('log', arg);

		bw.webContents.on('devtools-opened', ()=> this.#evDevtoolsOpened());
		ipc.handle('openDevTools', ()=> bw.webContents.openDevTools());

		this.#hInfo.getVersion = version;
		ipc.handle('getInfo', ()=> this.#hInfo);
		ipc.handle('inited', (_, c: T_CFG, tagW: TAG_WINDOW)=> this.#inited(c, tagW));

		ipc.handle('existsSync', (_, path: string)=> existsSync(path));
		ipc.handle('copySync', (_, path_from: string, path_to: string)=> copySync(path_from, path_to));
		ipc.handle('removeSync', (_, path: string)=> removeSync(path));
		ipc.handle('ensureFileSync', (_, path: string)=> ensureFileSync(path));
		ipc.handle('writeFileSync', (_, path: string, data: string | NodeJS.ArrayBufferView, o?: WriteFileOptions)=> writeFileSync(path, data, o));
		ipc.handle('appendFile', (_, path: string, data: string | Uint8Array)=> appendFile(path, data).catch(err=> console.log(err)));
		ipc.handle('outputFile', (_, path: string, data: string | NodeJS.ArrayBufferView)=> outputFile(path, data).catch(err=> console.log(err)));

		ipc.handle('win_close', ()=> bw.close());
		ipc.handle('win_setTitle', (_, title: string)=> bw.setTitle(title));

		ipc.handle('showMessageBox', (_, o: MessageBoxOptions)=> dialog.showMessageBox(bw, o));
		ipc.handle('showOpenDialog', (_, o: OpenDialogOptions)=> dialog.showOpenDialog(bw, o));

		ipc.handle('capturePage', (_, path: string, width: number, height: number)=> bw.webContents.capturePage()
		.then(ni=> {
			ensureFileSync(path);	// 【必須】ディレクトリ、なければ作る

			const c = ni.resize({width, height, quality: 'best'});
			const d = (path.endsWith('.png')) ?c.toPNG() :c.toJPEG(80);
			writeFileSync(path, d);
		}));
		ipc.handle('navigate_to', (_, url: string)=> shell.openExternal(url));

		let	st: any;
		ipc.handle('Store', (_, o)=> {st = new Store(o); return});	// return必要、Storeをcloneしてしまうので
		ipc.handle('flush', (_, o)=> {st.store = o; return});
		ipc.handle('Store_isEmpty', ()=> st.size === 0);
		ipc.handle('Store_get', ()=> st.store);

		ipc.handle('zip', async (_, inp: string, out: string)=> {
			const zip = new AdmZip;
			zip.addLocalFolder(inp);
			await zip.writeZipPromise(out);
		});
		ipc.handle('unzip', async (_, inp: string, out: string)=> {
			await remove(out);
			await ensureDir(out);	// ディレクトリ、なければ作る

			const zip = new AdmZip(inp);
			zip.extractAllTo(out, true);
		});

		ipc.handle('isSimpleFullScreen', ()=> bw.simpleFullScreen);
		if (this.#isWin) {	// winでのみ必要な処理
			ipc.handle('setSimpleFullScreen', (_, b: boolean)=> {
				this.#onMove = ()=> {};
				bw.setSimpleFullScreen(b);	// これだけで #onMove 発生
				if (! b) {
					bw.setPosition(this.#winX, this.#winY);
					bw.setContentSize(this.#csW, this.#csH);
				}
				this.#onMove = this.#onMove_Proc;
			});
			// 以下のイベントは winで必ず、macでは「Command + Control + F」でのみ発生
			bw.on('enter-full-screen', ()=> {
				this.#onMove = ()=> {};
				bw.setContentSize(this.#scrSize.width, this.#scrSize.height);
				this.#onMove = this.#onMove_Proc;
			});
			bw.on('leave-full-screen', ()=> {
				this.#window(false, this.#winX, this.#winY, this.#csW, this.#csH);
			});
		}
		else ipc.handle('setSimpleFullScreen', (_, b: boolean)=> {
			bw.setSimpleFullScreen(b);
			if (b) return;

			bw.setContentSize(this.#csW, this.#csH);
		});
		ipc.handle('window', (_, c: boolean, x: number, y: number, w: number, h: number)=> this.#window(c, x, y, w, h));

		bw.on('move', ()=> this.#onMove());
		bw.on('resize', ()=> this.#onMove());

		this.#chgDsp();	// 必須

		bw.loadFile(path_htm);
	}

	#numAspectRatio	= 0;
	openDevTools	= ()=> {};
	#evDevtoolsOpened = ()=> this.bw.webContents.closeDevTools();	// 開こうとしたら閉じる
	#inited(oCfg: T_CFG, rctW: TAG_WINDOW) {
		const {width, height} = oCfg.window;
		const {c, x, y, w} = rctW;
		this.#numAspectRatio = width / height;
		const h = w === width ?height : w /this.#numAspectRatio;
// console.log(`fn:appMain.ts #inited-0 `);
		if (! this.#isWin) this.bw.setAspectRatio(this.#numAspectRatio);
		this.#window(c, x, y, w, h);
		this.bw.show();

// console.log(`fn:appMain.ts #inited-9 [onMove 有効]`);
		this.#onMove = this.#onMove_Proc;

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
	#onMove = ()=> {};
	#onMove_Proc() {
		if (this.#tid) return;

		this.#onMove = ()=> {};
		const [ox, oy] = this.bw.getPosition();
		const [ow, oh] = this.bw.getContentSize();
		this.#tid = setTimeout(()=> {	// clearTimeout()不要と判断
			this.#tid = undefined;

			// 変化があればやり直し（動きが止まるまで次に行かない）
			const [nx=0, ny=0] = this.bw.getPosition();
			const [nw=0, nh=0] = this.bw.getContentSize();
			if (ox !== nx || oy !== ny || ow !== nw || oh !== nh) {this.#onMove_Proc(); return}
// console.log(`fn:appMain.ts #onMove o(${ox},${oy},${ow},${oh}) n(${nx},${ny},${nw},${nh})`);

			this.#onMove = this.#onMove_Proc;
			//NOTE: Electron API 不具合の対処療法（後者はどうしようもない）
			// ・ウインドウ右辺をクリックするだけで nh が縦に短くなる件
			// ・ウインドウ下辺を変更しても、ContentSizeやSizeのhが変化しない件
			let nw2 = nw;
			let nh2 = nh;
			if (this.#isWin) {
				if (ow === nw) nh2 = nw /this.#numAspectRatio;
				else nw2 = nh *this.#numAspectRatio;
			}
			this.#window(false, nx, ny, nw2, nh2);
		}, 1000 /60 *10);
	}

	#window(c: boolean, x: number, y: number, w: number, h: number) {
		if (this.bw.simpleFullScreen) return;
			// 全画面時に無効にする意味合いと、
			// winでのみ全画面移行時に【setContentSize】から発生

// console.log(`fn:appMain.ts #window c:${c} (${x},${y},${w},${h}) scr(${this.#scrSize.width},${this.#scrSize.height})`);
		this.#onMove = ()=> {};
		if (c) {
			this.#chgDsp();
			x = (this.#scrSize.width - w) *0.5;
			y = (this.#scrSize.height- h) *0.5;
		}
		this.#winX = x = Math.round(x);	// 小数値を渡すと例外？　ぽい（四捨五入でいく）
		this.#winY = y = Math.round(y);
		this.bw.setPosition(x, y);
		this.#csW = w = Math.round(w);
		this.#csH = h = Math.round(h);
		this.bw.setContentSize(w, h);

		this.bw.webContents.send('save_win_inf', {x, y, w, h, scrw: this.#scrSize.width, scrh: this.#scrSize.height});
		this.#onMove = this.#onMove_Proc;
	}

}

module.exports = appMain;
