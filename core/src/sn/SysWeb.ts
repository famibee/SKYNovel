/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import { SysBase } from "./SysBase";
import {CmnLib} from './CmnLib';
import {IConfig, HArg, IFn2Path, IData4Vari, IPlugin} from './CmnInterface';
import {Main} from './Main';
const strLocal = require('store');

export class SysWeb extends SysBase {
	constructor(protected hPlg: {[name: string]: IPlugin} = {}, protected $cur = 'prj/') {
		super(hPlg, $cur);

		const idxCur = this.$cur.lastIndexOf('/', this.$cur.length -2);
		this.def_prj = this.$cur.slice(idxCur +1, -1);
		//	(idxCur == -1)
		//	? this.$cur.slice(0, -1)
		//	: this.$cur.slice(idxCur +1, -1);

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
			this.run((new URLSearchParams(location.search)).get('cur') || '');
		}

		if ('webkitFullscreenEnabled' in document) this.tgl_full_scr = o=> this.regEvt_FullScr(
			o,	//Chrome15+, Safari5.1+, Opera15+
			'webkitRequestFullscreen',
			'webkitCancelFullScreen',
			'webkitFullscreenElement'
		);
		else if ('mozFullScreenEnabled' in document) this.tgl_full_scr = o=> this.regEvt_FullScr(
			o,	//FF10+
			'mozRequestFullScreen',
			'mozCancelFullScreen',
			'mozFullScreenElement'
		);
		else if ('msFullscreenEnabled' in document) this.tgl_full_scr = o=> this.regEvt_FullScr(
			o,	//IE11+
			'msRequestFullscreen',
			'msExitFullscreen',
			'msFullscreenElement'
		);
		else if (document['fullscreenEnabled']) this.tgl_full_scr = o=> this.regEvt_FullScr(
			o,	// HTML5 Fullscreen API仕様
			'requestFullscreen',
			'exitFullscreen',
			'fullscreenElement'
		);
	}
	private def_prj = 'prj';
	private	readonly run = async (prj: string)=> {
		if (this.main) {
			const ms_late = 10;	// NOTE: ギャラリーでのえもふり/Live 2D用・魔法数字
			this.main.destroy(ms_late);
			await new Promise(r=> setTimeout(r, ms_late));
		}

		this.now_prj = prj || this.def_prj;
		const idxEnd = this.$cur.lastIndexOf('/', this.$cur.length -2) +1;
		const idxStart = this.$cur.lastIndexOf('/', idxEnd -2) +1;
		this.$cur = location.href.slice(0, location.href.lastIndexOf('/') +1)
			+ (idxEnd == 0 ?'' :this.$cur.slice(idxStart, idxEnd))
			+ this.now_prj +'/';
		this.main = new Main(this);
	}
	private now_prj = ':';
	private main: Main;


	loadPathAndVal(hPathFn2Exts: IFn2Path, fncLoaded: ()=> void, cfg: IConfig): void {
		(async ()=> {
			const res = await fetch(this.$cur +'path.json');
			if (! res.ok) throw Error(res.statusText);

			const json = await res.json();
			for (const nm in json) {
				const h = hPathFn2Exts[nm] = json[nm];
				for (const ext in h) if (ext != ':cnt') h[ext] = this.$cur + h[ext]
			}

			//strLocal.clearAll();
			// NOTE: サーバ非同期データならここで解決
			this.ns = cfg.getNs();
			this.sys = strLocal.get(this.ns +'sys');

			fncLoaded();
		})();
	}
	private ns	= '';
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
			this.data.mark = strLocal.get(this.ns +'mark');
			this.data.kidoku = strLocal.get(this.ns +'kidoku');
		}
		comp(this.data);

		// システム情報
		const hn = document.location.hostname;
		hTmp['const.sn.isDebugger'] = (hn == 'localhost' || hn == '127.0.0.1');
	}
	flush() {
		strLocal.set(this.ns +'sys', this.data.sys);
		strLocal.set(this.ns +'mark', this.data.mark);
		strLocal.set(this.ns +'kidoku', this.data.kidoku);
		// TODO: 暗号化
	}

	// ＵＲＬを開く
	protected	readonly navigate_to = (hArg: HArg)=> {
		const url = hArg.url;
		if (! url) throw '[navigate_to] urlは必須です';
	//	window.open(url);		// 近年セキュリティ的に効かない
		window.open(url, '_blank');		// 効くがポップアップブロック
	//	location.href = url;	// これは効くがSKYNovelが終了してしまう

		return false;
	}
	// タイトル指定
	protected	readonly title = (hArg: HArg)=> {
		const text = hArg.text;
		if (! text) throw '[title] textは必須です';

		document.title = text;
		for (const v of document.querySelectorAll('[data-title]')) v.textContent = text;

		return false;
	}
	// 全画面状態切替（タグではない手段で提供）
	private regEvt_FullScr(hArg: HArg, go_fnc_name: string, exit_fnc_name: string, get_fnc_name: string): boolean {
		// ユーザーのキーイベントでの全画面しか許さないので、処理なし
		if (! hArg.key) return false;

		const elm: any = document.body;
		const doc: any = document;
		const key = hArg.key.toLowerCase();
		elm.addEventListener('keydown', (e: KeyboardEvent)=> {
			const key2 = (e.altKey ?(e.key == 'Alt' ?'' :'alt+') :'')
			+	(e.ctrlKey ?(e.key == 'Control' ?'' :'ctrl+') :'')
			+	(e.shiftKey ?(e.key == 'Shift' ?'' :'shift+') :'')
			+	e.key.toLowerCase();
			if (key2 != key) return;

			e.stopPropagation();
			if (doc[get_fnc_name] != null) doc[exit_fnc_name]();
			else elm[go_fnc_name]();
			// 特定の要素を全画面(フルスクリーン)にするFullscreen API https://w3g.jp/blog/html5_fullscreen_api
		});
		return false;
	}


	readonly	readFile = (path: string, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void)=> {
		try {
			(async ()=> {
				const res = await fetch(path);	//fetch(path, {mode: 'same-origin'})
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

	readonly	savePic = (fn: string, data_url: string)=> {
		const anchor = document.createElement('a');
		anchor.href = data_url;
		anchor.download = fn;
		const e = document.createEvent('MouseEvent');
		e.initEvent('click');
		anchor.dispatchEvent(e);
		if (CmnLib.devtool) console.log('画像ファイルをダウンロードします');
	};

}
