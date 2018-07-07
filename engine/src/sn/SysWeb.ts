/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import { SysBase } from "./SysBase";
import {CmnLib, HArg, IPathFn2Exts} from './CmnLib';
import {Main} from './Main';
import {Config} from './Config';

export class SysWeb extends SysBase {
	constructor() {
		super();

		window.onload = ()=> {
			for (const v of document.querySelectorAll('[data-prj]')) {
				v.addEventListener('click', ()=> {
					const elm = v.attributes.getNamedItem('data-prj');
					if (! elm) return;
					const prj = elm.value;
					if (this.now_prj != prj) this.run(prj);
				});
			}
			for (const v of document.querySelectorAll('[data-reload]')) {
				v.addEventListener('click', ()=> this.run(this.now_prj));
			}
			this.run(this.getURLQ(location)['cur']);
		}

		if (document['webkitFullscreenEnabled']) {
			//Chrome15+, Safari5.1+, Opera15+
			this.toggle_full_screen = o=> this.regEvt_FullScr(o, 'webkitRequestFullscreen');
		}
		else if (document['mozFullScreenEnabled']) {	//FF10+
			this.toggle_full_screen = o=> this.regEvt_FullScr(o, 'mozRequestFullScreen');
		}
		else if (document['msFullscreenEnabled']) {	//IE11+
			this.toggle_full_screen = o=> this.regEvt_FullScr(o, 'msRequestFullscreen');
		}
		else if (document['fullscreenEnabled']) {	// HTML5 Fullscreen API仕様
			this.toggle_full_screen = o=> this.regEvt_FullScr(o, 'requestFullscreen');
		}
	}
	private getURLQ = (loc: Location): {[name: string]: string}=> {
		const arg : {[name: string]: string} = {};
		const urlq = loc.search.slice(1);
		if (urlq) for (const v of urlq.split('&')) {
			const elm = v.split('=');
			arg[elm[0]] = elm[1];
		}
		return arg;
	}
	private run = (prj: string)=> {
		if (this.main) {this.main.destroy(); this.main = null;}
		this.now_prj = prj || 'prj';
		this.$cur = location.href.slice(0, location.href.lastIndexOf('/') +1) + this.now_prj +'/';
		this.main = new Main(this);
	}
	private now_prj = ':';
	private main: Main | null = null;


	getHPathFn2Exts = (hPathFn2Exts: IPathFn2Exts, fncLoaded: ()=> void, oCfg: any, cfg: Config): void=> {
		fetch(this.$cur +'path.json')
		.then(res=> {
			if (! res.ok) throw Error(res.statusText);
			return res;
		})
		.then(res=> res.json())
		.then(json=> {
			for (const nm in json) {
				const h = hPathFn2Exts[nm] = json[nm];
				for (const ext in h) if (ext != ':cnt') h[ext] = this.$cur + h[ext]
			}
			fncLoaded();
		})
		.catch(e => console.error('Error:', e));
	}


	readFile = (path: string, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void)=> {

		fetch(path)
		//fetch(path, {mode: 'same-origin'})
		.then(res=> {
			if (! res.ok) throw Error(res.statusText);
			return res;
		})
		.then(res=> res.text())
		//.then(res=> res.json())
		.then(o=> callback(null, new Buffer(o)))
		.catch(e=> console.error('Error:', e));
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

	savePic = (fn: string, data_url: string)=> {
		const anchor = document.createElement('a');
		anchor.href = data_url;
		anchor.download = fn;
		const e = document.createEvent('MouseEvent');
		e.initEvent('click');
		anchor.dispatchEvent(e);
		if (CmnLib.devtool) console.log('画像ファイルをダウンロードします');
	};

	/*protected navigate_to = hArg=> {
		const url = hArg['url'];
		if (! url) throw('[title] urlは必須です');

		//window.open(url, 'newtab');

		//let a = document.createElement('a');
		//a.setAttribute('target', 'newtab');
		//a.setAttribute('href', url);
		//a.textContent = 'click me';
		//document.body.appendChild(a).click();

		//window.open("https://www.yahoo.co.jp/","byskynovel", "width=600, height=500, menubar=no, toolbar=no, scrollbars=yes");
		//window.open("https://www.yahoo.co.jp/","byskynovel");

		return false;
	}*/
	protected title = (hArg: HArg)=> {
		const text = hArg.text;
		if (! text) throw('[title] textは必須です');

		document.title = text;
		for (const v of document.querySelectorAll('[data-title]')) v.textContent = text;

		return false;
	}

	protected toggle_full_screen = (hArg: HArg)=> false;
	private regEvt_FullScr(hArg: HArg, to_fnc_name: string): boolean {
		const cvs = document.getElementById('skynovel') as HTMLCanvasElement;
		const elm = cvs ?cvs :document.body;
		const key = hArg.key;
		if (key) {
			elm.addEventListener('keydown', (e: KeyboardEvent)=> {
				if (e.key != key) return;	// ちなみに全画面ではESCしか効かないみたい？

				e.stopPropagation();
				elm[to_fnc_name]();
				// 特定の要素を全画面(フルスクリーン)にするFullscreen API https://w3g.jp/blog/html5_fullscreen_api
			});
			return false;
		}

		// ユーザーのキーイベントでの全画面しか許さないので、処理なし
		return false;
	}

}
