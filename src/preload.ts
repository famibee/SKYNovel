/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2021-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {T_HINFO} from './appMain_cmn';
import type {T_Data4Vari} from './sn/CmnInterface';
import type {T_CFG} from './sn/ConfigBase';

import {contextBridge, ipcRenderer} from 'electron';
import type {IpcRendererEvent, MessageBoxOptions, MessageBoxReturnValue, OpenDialogOptions, OpenDialogReturnValue} from 'electron/renderer';

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
};

export	type	HPROC	= {
	openDevTools	: ()=> void;

	getInfo		: ()=> Promise<T_HINFO>;
	inited		: (oCfg: T_CFG, tagW: TAG_WINDOW)=> Promise<void>;

	existsSync	: (path: string)=> Promise<boolean>;
	copy		: (path_from: string, path_to: string)=> Promise<void>;
	remove		: (path: string)=> Promise<void>;
	ensureFile	: (path: string)=> Promise<void>;
	writeFile	: (path: string, data: string | NodeJS.ArrayBufferView, o?: object)=> Promise<void>;
	appendFile	: (path: string, data: string)=> Promise<void>;
	outputFile	: (path: string, data: string)=> Promise<void>;

	window	: (centering: boolean, x: number, y: number, w: number, h: number)=> void;
	isSimpleFullScreen	: ()=> Promise<boolean>;
	setSimpleFullScreen	: (b: boolean)=> Promise<void>;
	win_close		: ()=> void;
	win_setTitle	: (title: string)=> void;

	showMessageBox	: (o: MessageBoxOptions)=> Promise<MessageBoxReturnValue>;
	showOpenDialog	: (o: OpenDialogOptions)=> Promise<OpenDialogReturnValue>;

	capturePage	: (path: string, w: number, h: number)=> Promise<void>;
	navigate_to	: (url: string)=> void;

	Store	: (o: object)=> Promise<void>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	flush	: (o: any)=> Promise<void>;
	Store_isEmpty	: ()=> Promise<boolean>;
	Store_get		: ()=> Promise<T_Data4Vari>;

	zip		: (inp: string, out: string)=> Promise<void>;
	unzip	: (inp: string, out: string)=> Promise<void>;

	// メイン → レンダラー
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	on: (channel: string, callback: (e: IpcRendererEvent, arg?: any)=> void)=> void;
};

const fncE = console.error;

export const	hProc	: HPROC = {
	// console.log は【アプリ】のターミナルに出る
	getInfo		: ()=> ipcRenderer.invoke('getInfo').catch(fncE),
	inited		: (oCfg: T_CFG, tagW: TAG_WINDOW)=> ipcRenderer.invoke('inited', oCfg, tagW).catch(fncE),

	existsSync	: path=> ipcRenderer.invoke('existsSync', path).catch(fncE),
	copy		: (path_from, path_to)=>
		ipcRenderer.invoke('copy', path_from, path_to).catch(fncE),
	remove		: path=> ipcRenderer.invoke('remove', path).catch(fncE),
	ensureFile	: path=> ipcRenderer.invoke('ensureFile', path).catch(fncE),
	writeFile	: (path, data, o?)=>
		ipcRenderer.invoke('writeFile', path, data, o).catch(fncE),
	appendFile	: (path, data)=>
		ipcRenderer.invoke('appendFile', path, data).catch(fncE),
	outputFile	: (path, data)=>
		ipcRenderer.invoke('outputFile', path, data).catch(fncE),

	win_close	: ()=> {ipcRenderer.invoke('win_close').catch(fncE)},
	win_setTitle	: title=>
		{ipcRenderer.invoke('win_setTitle', title).catch(fncE)},

	showMessageBox	: o=> ipcRenderer.invoke('showMessageBox', o).catch(fncE),
	showOpenDialog	: o=> ipcRenderer.invoke('showOpenDialog', o).catch(fncE),

	capturePage	: (path, w, h)=>	ipcRenderer.invoke('capturePage', path, w, h).catch(fncE),
	navigate_to	: url=> {ipcRenderer.invoke('navigate_to', url).catch(fncE)},

	openDevTools	: ()=> {ipcRenderer.invoke('openDevTools').catch(fncE)},

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
		{ipcRenderer.invoke('window', centering, x, y, w, h).catch(fncE)},


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
