/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2021-2022 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

const {contextBridge, ipcRenderer} = require('electron');
import {WriteStream, ReadStream} from 'fs-extra';
import {Pack, Extract} from 'tar-fs';

export	type	HPROC	= {
	getInfo		: ()=> Promise<HINFO>;

	existsSync	: (path: string)=> Promise<boolean>;
	copySync	: (path_from: string, path_to: string)=> void;
	removeSync	: (path: string)=> Promise<void>;
	ensureDirSync	: (path: string)=> Promise<void>;
	ensureFileSync	: (path: string)=> Promise<void>;
	createWriteStream	: (path: string)=> Promise<WriteStream>;
	createReadStream	: (path: string)=> Promise<ReadStream>;
	readFileSync: (path: string)=> Promise<string>;
	readFile	: (path: string, callback: (err: NodeJS.ErrnoException, data: Buffer)=> void)=> void;
	writeFileSync	: (path: string, data: string | NodeJS.ArrayBufferView, o?: object)=> Promise<void>;
	appendFile		: (path: string, data: string, callback: (err: Error)=> void)=> Promise<void>;

	window	: (centering: boolean, x: number, y: number, w: number, h: number)=> void;
	isSimpleFullScreen	: ()=> Promise<boolean>;
	setSimpleFullScreen	: (b: boolean, w: number, h: number)=> Promise<void>;
	win_close		: ()=> void;
	win_setTitle	: (title: string)=> void;
	win_setContentSize	: (w: number, h: number)=> Promise<void>;
	win_setSize			: (w: number, h: number)=> Promise<void>;

	showMessageBox	: (o: Electron.MessageBoxOptions)=> Promise<Electron.MessageBoxReturnValue>;

	capturePage	: (fn: string)=> Promise<void>;
	navigate_to	: (url: string)=> void;

	openDevTools	: ()=> void;
	win_ev_devtools_opened	: (fnc: ()=> void)=> void;

	Store	: (o: object)=> Promise<void>;
	flush	: (o: object)=> Promise<void>;
	Store_isEmpty	: ()=> Promise<boolean>;
	Store_get	: ()=> Promise<any>;

	tarFs_pack		: (path: string)=> Promise<Pack>;
	tarFs_extract	: (path: string)=> Promise<Extract>;

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
	screenResolutionX	: number;
	screenResolutionY	: number;
}

const fncE = console.error;

export const	hProc	: HPROC	= {
	// console.log は【アプリ】のターミナルに出る
	getInfo		: ()=> ipcRenderer.invoke('getInfo').catch(fncE),

	existsSync	: path=> ipcRenderer.invoke('existsSync', path).catch(fncE),
	copySync	: (path_from, path_to)=>
		ipcRenderer.invoke('copySync', path_from, path_to).catch(fncE),
	removeSync	: path=> ipcRenderer.invoke('removeSync', path).catch(fncE),
	ensureDirSync	: path=>
		ipcRenderer.invoke('ensureDirSync', path).catch(fncE),
	ensureFileSync	: path=>
		ipcRenderer.invoke('ensureFileSync', path).catch(fncE),
	createWriteStream	: path=>
		ipcRenderer.invoke('createWriteStream', path).catch(fncE),
	createReadStream	: path=>
		ipcRenderer.invoke('createReadStream', path).catch(fncE),
	readFileSync	: path=>
		ipcRenderer.invoke('readFileSync', path).catch(fncE),
	readFile	: (path, callback)=>
		ipcRenderer.invoke('readFile', path, callback).catch(fncE),
	writeFileSync	: (path, data, o?)=>
		ipcRenderer.invoke('writeFileSync', path, data, o).catch(fncE),
	appendFile		: (path, data, callback)=>
		ipcRenderer.invoke('appendFile', path, data, callback).catch(fncE),


	window	: (centering, x, y, w, h)=>
		ipcRenderer.invoke('window', centering, x, y, w, h).catch(fncE),
	isSimpleFullScreen	: ()=>
		ipcRenderer.invoke('isSimpleFullScreen').catch(fncE),
	setSimpleFullScreen	: (b, w, h)=>
		ipcRenderer.invoke('setSimpleFullScreen', b, w, h).catch(fncE),
	win_close	: ()=> ipcRenderer.invoke('win_close').catch(fncE),
	win_setTitle	: title=>
		ipcRenderer.invoke('win_setTitle', title).catch(fncE),
	win_setContentSize	: (w, h)=>
		ipcRenderer.invoke('win_setContentSize', w, h).catch(fncE),
	win_setSize	: (w, h)=>
		ipcRenderer.invoke('win_setSize', w, h).catch(fncE),

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

	tarFs_pack	: path=> ipcRenderer.invoke('tarFs_pack', path).catch(fncE),
	tarFs_extract: path=> ipcRenderer.invoke('tarFs_extract', path).catch(fncE),


	// メイン → レンダラー
	on	: (ch, cb)=> {switch (ch) {
		case 'save_win_pos':
			ipcRenderer.on(ch, (e, x, y)=> cb(e, x, y));	break;
	}},

};
contextBridge.exposeInMainWorld('to_app', hProc);
