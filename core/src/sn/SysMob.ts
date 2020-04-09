/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib} from './CmnLib';
import { SysBase } from "./SysBase";
import {IConfig, IFn2Path, IData4Vari, IPlugin} from './CmnInterface';
import {Main} from './Main';
// TODO: const strLocal = require('store');

export class SysMob extends SysBase {
	constructor(hPlg: {[name: string]: IPlugin} = {}, arg = {cur: 'prj/', crypt: false, dip: ''}) {
		super(hPlg, arg);

		document.addEventListener('deviceready', ()=> {
			const main = new Main(this);
			document.addEventListener('pause', ()=> main.pauseDev(), {passive: true});
			document.addEventListener('resume', ()=> main.resumeDev(), {passive: true});
		}, {once: true, passive: true});
	}

	loadPathAndVal(hPathFn2Exts: IFn2Path, fncLoaded: ()=> void, cfg: IConfig): void {
		(async ()=> {
			const fn = this.arg.cur +'path.json';
			const res = await this.fetch(fn);
			if (! res.ok) throw Error(res.statusText);

			const mes = await res.text()
			const json = JSON.parse(await this.pre('json', mes));
			for (const nm in json) {
				const h = hPathFn2Exts[nm] = json[nm];
				for (const ext in h) if (ext != ':cnt') h[ext] = this.arg.cur + h[ext]
			}

			//strLocal.clearAll();
			// NOTE: サーバ非同期データならここで解決
// TODO: 			this.ns = cfg.getNs();
// TODO: 	this.sys = strLocal.get(this.ns +'sys');

			// 全体が入るよう拡大・縮小
			const cvs: HTMLCanvasElement = document.getElementById(CmnLib.SN_ID) as HTMLCanvasElement;
			if (cvs) {
				const zoom = (screen.width > screen.height ?screen.height :screen.width)/ cfg.oCfg.window.height;
//console.log(`fn:SysMob.ts line:45 screen.width:${screen.width} screen.height:${screen.height} zoom:${zoom}`);
				this.resolution = zoom;

				fncLoaded();
			}
		})();
	}
	readonly	fetch = (url: string): Promise<Response> => new Promise((resolve, reject)=> {
		const xhr = new XMLHttpRequest
		xhr.onload = ()=> resolve(new Response(xhr.responseText, {status: xhr.status}));
		xhr.onerror = ()=> reject(new TypeError('Local request failed'));
		xhr.open('GET', url)
		xhr.send(null)
	});
// TODO: 	private ns	= '';
	private sys: any;
	initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari)=> void) {
		if (this.sys == undefined) {
			hTmp['const.sn.isFirstBoot'] = true;
			this.data.sys = data['sys'];
			this.data.mark = data['mark'];
			this.data.kidoku = data['kidoku'];
			this.flush();
		}
		else {
			hTmp['const.sn.isFirstBoot'] = false;
			this.data.sys = this.sys;
// TODO: 	this.data.mark = strLocal.get(this.ns +'mark');
// TODO: 	this.data.kidoku = strLocal.get(this.ns +'kidoku');
		}
		comp(this.data);

		// システム情報
		const hn = document.location.hostname;
		hTmp['const.sn.isDebugger'] = (hn == 'localhost' || hn == '127.0.0.1');
	}
	flush() {
/* TODO: strLocal.set(this.ns +'sys', this.data.sys);
		strLocal.set(this.ns +'mark', this.data.mark);
		strLocal.set(this.ns +'kidoku', this.data.kidoku);
		// TODO: 暗号化*/
	}

	// ＵＲＬを開く
/* TODO: protected navigate_to = (hArg: HArg)=> {
		const url = hArg.url;
		if (! url) throw '[navigate_to] urlは必須です';
	//	window.open(url);		// 近年セキュリティ的に効かない
		window.open(url, '_blank');		// 効くがポップアップブロック
	//	location.href = url;	// これは効くがSKYNovelが終了してしまう

		return false;
	}*/


	readonly	readFile = (path: string, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void)=> {
		try {
			(async ()=> {
				const res = await this.fetch(path);
				if (! res.ok) throw Error(res.statusText);

				callback(null, Buffer.from(await res.text()));
			})();
		} catch (e) {
			console.error('Error:', e);
		}
/*
		const FETCH_TIMEOUT = 5000;
		let didTimeOut = false;
		const timeout = setTimeout(function() {
			didTimeOut = true;
			//reject(new Error('Request timed out'));
		}, FETCH_TIMEOUT);

//	'⏰ Time Out'
*/
	};
/* TODO:
	savePic = (fn: string, data_url: string)=> {
		const anchor = document.createElement('a');
		anchor.href = data_url;
		anchor.download = fn;
		const e = document.createEvent('MouseEvent');
		e.initEvent('click');
		anchor.dispatchEvent(e);
		if (CmnLib.debugLog) console.log('画像ファイルをダウンロードします');
	};
*/
}
