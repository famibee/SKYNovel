/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import { SysBase } from "./SysBase";
import {IConfig, IPathFn2Exts, IData4Vari, IPlugin} from './CmnInterface';
import {Main} from './Main';
// TODO: const strLocal = require('store');

export class SysMob extends SysBase {
	constructor(protected hPlg: {[name: string]: IPlugin} = {}, protected $cur = 'prj/') {
		super(hPlg, $cur);

		document.addEventListener('deviceready', ()=> {
			const main = new Main(this);
			document.addEventListener('pause', ()=> main.pauseDev(), false);
			document.addEventListener('resume', ()=> main.resumeDev(), false);
		}, false);
	}

	loadPathAndVal(hPathFn2Exts: IPathFn2Exts, fncLoaded: ()=> void, _cfg: IConfig): void {
		(async ()=> {
			const res = await this.fetch(this.$cur +'path.json');
			if (! res.ok) throw Error(res.statusText);

			const json = await res.json();
			for (const nm in json) {
				const h = hPathFn2Exts[nm] = json[nm];
				for (const ext in h) if (ext != ':cnt') h[ext] = this.$cur + h[ext]
			}

			//strLocal.clearAll();
			// NOTE: サーバ非同期データならここで解決
// TODO: 			this.ns = cfg.getNs();
// TODO: 	this.sys = strLocal.get(this.ns +'sys');

			fncLoaded();

			// 全体が入るよう拡大・縮小
			const cvs: HTMLCanvasElement = document.getElementById('skynovel') as HTMLCanvasElement;
			if (cvs) {
				const isWidthLongSide = screen.width > screen.height;
console.log(`fn:SysMob.ts line:45 screen.width:${screen.width} screen.height:${screen.height} isWidthLongSide:${isWidthLongSide}`);
				const wp = (isWidthLongSide ?screen.width :screen.height)
					/ _cfg.oCfg.window.width;
				const hp = (!isWidthLongSide ?screen.width :screen.height)
					/ _cfg.oCfg.window.height;
console.log(`fn:SysMob.ts line:49 wp:${wp} hp:${hp}`);
/*
				const zoom = isWidthLongSide
					? (wp > hp ?wp :hp)
					: (wp < hp ?wp :hp);
*/
				const zoom = isWidthLongSide
					? wp
					: hp;

//				const zoom = 0.71875;

console.log(`fn:SysMob.ts line:53 zoom:${zoom}`);
var hasIndexedDB = !!indexedDB;
console.log(`fn:SysMob.ts line:53 hasIndexedDB:${hasIndexedDB}`);
				cvs.style.zoom = `${zoom *100}%`;
			}
		})();
	}
	fetch = (url: string): Promise<Response> => new Promise((resolve, reject)=> {
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


	readFile = (path: string, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void)=> {
		try {
			(async ()=> {
				const res = await this.fetch(path);
				if (! res.ok) throw Error(res.statusText);

				callback(null, new Buffer(await res.text()));
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
		if (CmnLib.devtool) console.log('画像ファイルをダウンロードします');
	};
*/
}
