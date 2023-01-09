/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2021-2023 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {contextBridge, ipcRenderer} from 'electron';

export	type	HPROC	= {
	getInfo		: ()=> Promise<HINFO>;

	existsSync	: (path: string)=> Promise<boolean>;
	copySync	: (path_from: string, path_to: string)=> void;
	removeSync	: (path: string)=> Promise<void>;
	ensureFileSync	: (path: string)=> Promise<void>;
	readFileSync: (path: string)=> Promise<string>;
	readFile	: (path: string, callback: (err: NodeJS.ErrnoException, data: Buffer)=> void)=> void;
	writeFileSync	: (path: string, data: string | NodeJS.ArrayBufferView, o?: object)=> Promise<void>;
	appendFile		: (path: string, data: string, callback: (err: Error)=> void)=> Promise<void>;

	window	: (centering: boolean, x: number, y: number, w: number, h: number)=> void;
	isSimpleFullScreen	: ()=> Promise<boolean>;
	setSimpleFullScreen	: (b: boolean)=> Promise<void>;
	win_close		: ()=> void;
	win_setTitle	: (title: string)=> void;

	showMessageBox	: (o: Electron.MessageBoxOptions)=> Promise<Electron.MessageBoxReturnValue>;

	capturePage	: (fn: string)=> Promise<void>;
	navigate_to	: (url: string)=> void;

	openDevTools	: ()=> void;
	win_ev_devtools_opened	: (fnc: ()=> void)=> void;

	Store	: (o: object)=> Promise<void>;
	flush	: (o: object)=> Promise<void>;
	Store_isEmpty	: ()=> Promise<boolean>;
	Store_get		: ()=> Promise<any>;

	zip		: (inp: string, out: string)=> void;
	unzip	: (inp: string, out: string)=> void;

	// メイン → レンダラー
	on: (channel: string, callback: Function) => void;
};

export	type	HINFO	= {
	getAppPath	: string;
	isPackaged	: boolean;
	downloads	: string;
	userData	: string;
	getVersion	: string;
	env			: {[name: string]: any};
	platform	: string;
	arch		: string;
}

const fncE = console.error;

export const	hProc	: HPROC	= {
	// console.log は【アプリ】のターミナルに出る
	getInfo		: ()=> ipcRenderer.invoke('getInfo').catch(fncE),

	existsSync	: path=> ipcRenderer.invoke('existsSync', path).catch(fncE),
	copySync	: (path_from, path_to)=>
		ipcRenderer.invoke('copySync', path_from, path_to).catch(fncE),
	removeSync	: path=> ipcRenderer.invoke('removeSync', path).catch(fncE),
	ensureFileSync	: path=>
		ipcRenderer.invoke('ensureFileSync', path).catch(fncE),
	readFileSync	: path=>
		ipcRenderer.invoke('readFileSync', path).catch(fncE),
	readFile	: (path, callback)=>
		ipcRenderer.invoke('readFile', path, callback).catch(fncE),
	writeFileSync	: (path, data, o?)=>
		ipcRenderer.invoke('writeFileSync', path, data, o).catch(fncE),
	appendFile		: (path, data, callback)=>
		ipcRenderer.invoke('appendFile', path, data, callback).catch(fncE),

	win_close	: ()=> ipcRenderer.invoke('win_close').catch(fncE),
	win_setTitle	: title=>
		ipcRenderer.invoke('win_setTitle', title).catch(fncE),

	showMessageBox	: o=> ipcRenderer.invoke('showMessageBox', o).catch(fncE),

	capturePage	: fn=>	ipcRenderer.invoke('capturePage', fn).catch(fncE),
	navigate_to	: url=> ipcRenderer.invoke('navigate_to', url).catch(fncE),

	openDevTools	: ()=> ipcRenderer.invoke('openDevTools').catch(fncE),
	win_ev_devtools_opened	: fnc=>
		ipcRenderer.invoke('win_ev_devtools_opened', fnc).catch(fncE),

	Store	: o=> ipcRenderer.invoke('Store', o).catch(fncE),
	flush	: o=> ipcRenderer.invoke('flush', o).catch(fncE),
	Store_isEmpty	: ()=> ipcRenderer.invoke('Store_isEmpty').catch(fncE),
	Store_get	: ()=> ipcRenderer.invoke('Store_get').catch(fncE),

	zip		: (inp, out)=> ipcRenderer.invoke('zip', inp, out).catch(fncE),
	unzip	: (inp, out)=> ipcRenderer.invoke('unzip', inp, out).catch(fncE),

	isSimpleFullScreen	: ()=>
		ipcRenderer.invoke('isSimpleFullScreen').catch(fncE),
	setSimpleFullScreen	: b=>
		ipcRenderer.invoke('setSimpleFullScreen', b).catch(fncE),
	window	: (centering, x, y, w, h)=>
		ipcRenderer.invoke('window', centering, x, y, w, h).catch(fncE),


	// メイン → レンダラー
	on	: (ch, cb)=> {switch (ch) {
		case 'save_win_pos':
			ipcRenderer.on(ch, (e, x, y)=> cb(e, x, y));	break;
		case 'fire':
			ipcRenderer.on(ch, (e, KEY)=> cb(e, KEY));	break;
		//case 'call':	// 実験・保留コード。セキュリティ懸念
		//	ipcRenderer.on(ch, (e, fn, label)=> cb(e, fn, label));	break;
	}},

};
contextBridge.exposeInMainWorld('to_app', hProc);
