/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2025-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {SAVE_WIN_INF, TAG_WINDOW} from './preload';
import type {T_CFG} from './sn/ConfigBase';

import type {BrowserWindow, MessageBoxOptions, OpenDialogOptions, Size} from 'electron/main';
import {app, dialog, screen, shell} from 'electron';

import {appendFile, copy, ensureFile, existsSync, outputFile, remove, WriteFileOptions, writeFile, readFile, ensureDir} from 'fs-extra';
import Store from 'electron-store';
import AdmZip from 'adm-zip';


export	type	T_ipc_appMain_cmn = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-redundant-type-constituents
	handle(channel: string, listener: (e: unknown, ...args: any[])=> any | Promise<any>): void;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	on(channel: string, listener: (e: unknown, ...args: any[]) => void): void;

	// dispose(): void;
}


export	type	T_HINFO	= {
	getAppPath	: string;
	isPackaged	: boolean;
	downloads	: string;
	userData	: string;
	getVersion	: string;
	env			: {
		SKYNOVEL_DBG?	: string;
		SKYNOVEL_PORT?	: string;
	};
	platform	: string;
	arch		: string;
}


// 純粋クラスの世界
// appMain.ts は cjs / esm 別の処理を残したものになる
export class appMain_cmn {
	static	init(ipc: T_ipc_appMain_cmn) {
		appMain_cmn.#ipc = ipc;

		Store.initRenderer();
	}
	static	#ipc: T_ipc_appMain_cmn;


	readonly	#isWin;	// import {os} from 'platform'; は動作しない

	readonly	#hInfo	: T_HINFO = {
		getAppPath	: app.getAppPath(),
		isPackaged	: app.isPackaged,
		downloads	: app.getPath('downloads'),
		userData	: app.getPath('userData'),
		getVersion	: '',	// constructor で
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, no-process-env
		env			: <any>{...process.env},
		platform	: process.platform,
		arch		: process.arch,
	};
	#winX	= 0;
	#winY	= 0;
	#csW	= 0;
	#csH	= 0;


	constructor(protected readonly bw: BrowserWindow, readonly version: string) {
		const ipc = appMain_cmn.#ipc;
		this.#isWin = process.platform === 'win32';


		bw.webContents.on('devtools-opened', ()=> this.#evDevtoolsOpened());
		ipc.handle('openDevTools', ()=> bw.webContents.openDevTools());

		this.#hInfo.getVersion = version;
		ipc.handle('getInfo', ()=> this.#hInfo);
		ipc.handle('inited', (_, c: T_CFG, tagW: TAG_WINDOW)=> this.#inited(c, tagW));


		// === vite-electron 用コード ===
		ipc.handle('fetch', async (_, url: string)=> {
			const o = await fetch(url, {cache: 'no-store'});
			return {
				ok	: o.ok,
				txt	: await o.text(),
			};
		});
		ipc.handle('fetchAb', async (_, url: string)=> {
			const o = await fetch(url, {cache: 'no-store'});
			return {
				ok	: o.ok,
				ab	: await o.arrayBuffer(),
			};
		});


		ipc.handle('existsSync', (_, path: string)=> existsSync(path));
		ipc.handle('copy', (_, path_from: string, path_to: string)=> copy(path_from, path_to));
		ipc.handle('remove', (_, path: string)=> remove(path));
		ipc.handle('ensureFile', (_, path: string)=> ensureFile(path));

		// === vite-electron 用コード ===
		ipc.handle('readFile', (_, path: string, encoding: Parameters<typeof readFile>[1])=> readFile(path, encoding));
		ipc.handle('writeFile', (_, path: string, data: string | NodeJS.ArrayBufferView, o?: WriteFileOptions)=> writeFile(path, data, o));
		ipc.handle('appendFile', (_, path: string, data: string | Uint8Array)=> appendFile(path, data).catch((e: unknown)=> console.error(e)));
		ipc.handle('outputFile', (_, path: string, data: string | NodeJS.ArrayBufferView)=> outputFile(path, data).catch((e: unknown)=> console.error(e)));

		ipc.handle('win_close', ()=> bw.close());
		ipc.handle('win_setTitle', (_, title: string)=> bw.setTitle(title));

		ipc.handle('showMessageBox', (_, o: MessageBoxOptions)=> dialog.showMessageBox(bw, o));
		ipc.handle('showOpenDialog', (_, o: OpenDialogOptions)=> dialog.showOpenDialog(bw, o));

		ipc.handle('capturePage', (_, path: string, width: number, height: number)=> bw.webContents.capturePage()
		.then(async ni=> {
			await ensureFile(path);	// 【必須】ディレクトリ、なければ作る

			const c = ni.resize({width, height, quality: 'best'});
			const d = path.endsWith('.png') ?c.toPNG() :c.toJPEG(80);
			await writeFile(path, d);
		}));
		ipc.handle('navigate_to', (_, url: string)=> shell.openExternal(url));


		let	st: Store;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		ipc.handle('Store', (_, o)=> {st = new Store(o); return});	// return必要、Storeをcloneしてしまうので
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
				this.#onMove = ()=> { /* empty */ };
				bw.setSimpleFullScreen(b);	// これだけで #onMove 発生
				if (! b) {
					bw.setPosition(this.#winX, this.#winY);
					bw.setContentSize(this.#csW, this.#csH);
				}
				this.#onMove = ()=> this.#onMove_Proc();
			});
			// 以下のイベントは winで必ず、macでは「Command + Control + F」でのみ発生
			bw.on('enter-full-screen', ()=> {
				this.#onMove = ()=> { /* empty */ };
				bw.setContentSize(this.#scrSize.width, this.#scrSize.height);
				this.#onMove = ()=> this.#onMove_Proc();
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
	}

	//MARK: Renderer からの初期化通知を受けて
	#inited(oCfg: T_CFG, rctW: TAG_WINDOW) {
		const {width, height} = oCfg.window;
		const {c, x, y, w} = rctW;
		this.#numAspectRatio = width / height;
		const h = w === width ?height : w /this.#numAspectRatio;
// console.log('fn:appMain_cmn.ts #inited-0 ');
		if (! this.#isWin) this.bw.setAspectRatio(this.#numAspectRatio);
		this.#window(c, x, y, w, h);
		this.bw.show();

// console.log('fn:appMain_cmn.ts #inited-9 [onMove 有効]');
		this.#onMove = ()=> this.#onMove_Proc();

		if (oCfg.debug.devtool) {
			this.#evDevtoolsOpened = ()=> { /* empty */ };
			this.openDevTools = ()=> this.bw.webContents.openDevTools({
				mode	: 'detach',	// 別ウィンドウに切り離すが画面内に戻せない
			//	activate: false,	// 他のウインドウの後ろに回って見失いがち
			});
			this.openDevTools();
			return;
		}

		this.#evDevtoolsOpened = ()=> {
			this.bw.webContents.closeDevTools();	// 開こうとしたら閉じる
			this.bw.setTitle('DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。');
			this.sendShutdown();
		};
	}
	#numAspectRatio	= 0;
	#evDevtoolsOpened = ()=> this.bw.webContents.closeDevTools();	// 開こうとしたら閉じる

	//MARK: 現時点でウインドウが存在するデスクトップでの情報取得
	#chgDsp() {
		const csp = screen.getCursorScreenPoint();
		const dsp = screen.getDisplayNearestPoint(csp);
		this.#scrSize = dsp.workAreaSize;
	}
	#scrSize: Size;

	#onMove = ()=> { /* empty */ };
	#onMove_Proc() {
		if (this.#tid) return;

		this.#onMove = ()=> { /* empty */ };
		const [ox, oy] = this.bw.getPosition();
		const [ow, oh] = this.bw.getContentSize();
		this.#tid = setTimeout(()=> {	// clearTimeout()不要と判断
			this.#tid = undefined;

			// 変化があればやり直し（動きが止まるまで次に行かない）
			const [nx=0, ny=0] = this.bw.getPosition();
			const [nw=0, nh=0] = this.bw.getContentSize();
			if (ox !== nx || oy !== ny || ow !== nw || oh !== nh) {this.#onMove_Proc(); return}
// console.log(`fn:appMain.ts onMove o(${ox},${oy},${ow},${oh}) n(${nx},${ny},${nw},${nh})`);

			this.#onMove = ()=> this.#onMove_Proc();
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
	#tid: NodeJS.Timeout | undefined = undefined;

	#window(ic: boolean, ix: number, iy: number, iw: number, ih: number) {
		if (this.bw.simpleFullScreen) return;
			// 全画面時に無効にする意味合いと、
			// winでのみ全画面移行時に【setContentSize】から発生

// // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
// console.log(`fn:appMain.ts window c:${ic} (${ix},${iy},${iw},${ih}) scr(${this.#scrSize.width},${this.#scrSize.height})`);
		this.#onMove = ()=> { /* empty */ };
		const x = this.#winX = Math.round(ic
			? (this.#scrSize.width - iw) *0.5
				// this.scrSize のディスプレイサイズ情報は更新不要につき
			: ix);	// 小数値を渡すと例外？ ぽい（四捨五入でいく）
		const y = this.#winY = Math.round(ic
			? (this.#scrSize.height - ih) *0.5
				// this.scrSize のディスプレイサイズ情報は更新不要につき
			: iy);	// 小数値を渡すと例外？ ぽい（四捨五入でいく）
		this.bw.setPosition(x, y);

		const w = this.#csW = Math.round(iw);
		const h = this.#csH = Math.round(ih);
		this.bw.setContentSize(w, h);

		// 移動後にウインドウが表示されているディスプレイサイズ情報を更新
		if (! ic) this.#chgDsp();

		this.sendSaveWinInf({x, y, w, h});
		this.#onMove = ()=> this.#onMove_Proc();
	}


	protected	sendShutdown() { /* empty */ }
	protected	sendSaveWinInf(_arg: SAVE_WIN_INF) { /* empty */ }


	// doc/app.js 等から呼ぶので public
	openDevTools	= ()=> { /* empty */ };

}
