/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2021-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {T_CFG} from './sn/ConfigBase';

import {contextBridge, ipcRenderer, IpcRendererEvent, MessageBoxOptions, MessageBoxReturnValue} from 'electron';

export	type	TAG_WINDOW	= {
	c	: boolean;
	x	: number;
	y	: number;
	w	: number;
	h	: number;
};

export	type	SAVE_WIN_INF	= {
	x	: number;
	y	: number;
	w	: number;
	h	: number;
	scrw: number;
	scrh: number;
};

export	type	HPROC	= {
	getInfo		: ()=> Promise<HINFO>;
	inited		: (oCfg: T_CFG, tagW: TAG_WINDOW)=> Promise<void>;

	existsSync	: (path: string)=> Promise<boolean>;
	copySync	: (path_from: string, path_to: string)=> void;
	removeSync	: (path: string)=> Promise<void>;
	ensureFileSync	: (path: string)=> Promise<void>;
	readFileSync: (path: string)=> Promise<string>;
	writeFileSync	: (path: string, data: string | NodeJS.ArrayBufferView, o?: object)=> Promise<void>;
	appendFile		: (path: string, data: string)=> Promise<void>;
	outputFile		: (path: string, data: string)=> Promise<void>;

	window	: (centering: boolean, x: number, y: number, w: number, h: number)=> void;
	isSimpleFullScreen	: ()=> Promise<boolean>;
	setSimpleFullScreen	: (b: boolean)=> Promise<void>;
	win_close		: ()=> void;
	win_setTitle	: (title: string)=> void;

	showMessageBox	: (o: MessageBoxOptions)=> Promise<MessageBoxReturnValue>;

	capturePage	: (fn: string, w: number, h: number)=> Promise<void>;
	navigate_to	: (url: string)=> void;

	openDevTools	: ()=> void;

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
	inited		: (oCfg: T_CFG, tagW: TAG_WINDOW)=> ipcRenderer.invoke('inited', oCfg, tagW).catch(fncE),

	existsSync	: path=> ipcRenderer.invoke('existsSync', path).catch(fncE),
	copySync	: (path_from, path_to)=>
		ipcRenderer.invoke('copySync', path_from, path_to).catch(fncE),
	removeSync	: path=> ipcRenderer.invoke('removeSync', path).catch(fncE),
	ensureFileSync	: path=>
		ipcRenderer.invoke('ensureFileSync', path).catch(fncE),
	readFileSync	: path=>
		ipcRenderer.invoke('readFileSync', path).catch(fncE),
	writeFileSync	: (path, data, o?)=>
		ipcRenderer.invoke('writeFileSync', path, data, o).catch(fncE),
	appendFile		: (path, data)=>
		ipcRenderer.invoke('appendFile', path, data).catch(fncE),
	outputFile		: (path, data)=>
		ipcRenderer.invoke('outputFile', path, data).catch(fncE),

	win_close	: ()=> ipcRenderer.invoke('win_close').catch(fncE),
	win_setTitle	: title=>
		ipcRenderer.invoke('win_setTitle', title).catch(fncE),

	showMessageBox	: o=> ipcRenderer.invoke('showMessageBox', o).catch(fncE),

	capturePage	: (fn, w, h)=>	ipcRenderer.invoke('capturePage', fn, w, h).catch(fncE),
	navigate_to	: url=> ipcRenderer.invoke('navigate_to', url).catch(fncE),

	openDevTools	: ()=> ipcRenderer.invoke('openDevTools').catch(fncE),

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
		case 'log':
			ipcRenderer.on(ch, (e: IpcRendererEvent, arg: string)=> cb(e, arg));	break;
		case 'shutdown':
			ipcRenderer.on(ch, (e: IpcRendererEvent)=> cb(e));	break;
		case 'save_win_inf':
			ipcRenderer.on(ch, (e: IpcRendererEvent, swi: SAVE_WIN_INF)=> cb(e, swi));	break;
		case 'fire':
			ipcRenderer.on(ch, (e: IpcRendererEvent, KEY: string)=> cb(e, KEY));	break;
		//case 'call':	// 実験・保留コード。セキュリティ懸念
		//	ipcRenderer.on(ch, (e, fn, label)=> cb(e, fn, label));	break;
	}},

};
contextBridge.exposeInMainWorld('to_app', hProc);
