/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2021-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {appMain_cmn} from './appMain_cmn';
import type {SAVE_WIN_INF} from './preload';

import {BrowserWindow, ipcMain as ipc} from 'electron';	// ギャラリーでエラーになる【error TS2503: Cannot find namespace 'Electron'.】ので const ではなく import の形に


	// console.log はテンプレの VSCode に出る
export class appMain extends appMain_cmn {
	static	initRenderer(path_htm: string, version: string, _o: object): BrowserWindow {
		// ギャラリーでエラーになる【error TS2503: Cannot find namespace 'Electron'.】のでこの形に
		let bw: BrowserWindow;
		let opLocalDevTools = ()=> { /* empty */ };
		try {
			appMain_cmn.init(ipc);

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
			// 以下コメントアウトなら【プロジェクト】のターミナルに出る
			console.log = (arg: unknown)=> bw.webContents.send('log', arg);

			const am = new appMain(bw, version);
			opLocalDevTools = ()=> am.openDevTools();

			void bw.loadFile(path_htm);
		}
		catch (e) {
			console.error(`early err:${String(e)}`);
			opLocalDevTools();
			throw 'initRenderer error';
		}

		return bw;
	}

	protected override	sendShutdown() {
		this.bw.webContents.send('shutdown');
	}

	protected override	sendSaveWinInf(arg: SAVE_WIN_INF) {
		this.bw.webContents.send('save_win_inf', arg);
	}

}
module.exports = appMain;
