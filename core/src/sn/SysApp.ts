/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import { SysNode } from "./SysNode";
import {CmnLib} from './CmnLib';
import {HArg, IHTag, IVariable, IData4Vari, IPlugin, IConfig, IMain} from './CmnInterface';
import {Main} from './Main';
import {Application} from 'pixi.js';

const {remote, shell, ipcRenderer} = require('electron');
const Store = require('electron-store');

export class SysApp extends SysNode {
	constructor(hPlg: {[name: string]: IPlugin} = {}, arg = {cur: 'prj/', crypt: false}) {
		super(hPlg, {cur: remote.app.getAppPath().replace(/\\/g, '/') +'/'+ arg.cur, crypt: arg.crypt});
		window.addEventListener('DOMContentLoaded', ()=>new Main(this), {once: true, passive: true});

		ipcRenderer.on('log', (e: any, arg: any)=>console.log(`[main log] e:%o arg:%o`, e, arg));
	}
	protected readonly	$path_desktop	= remote.app.getPath('desktop').replace(/\\/g, '/') +'/';
	protected readonly	$path_userdata	= remote.app.getPath('userData').replace(/\\/g, '/') +'/';

	protected readonly	normalize = (src: string, form: string)=> src.normalize(form);

	private readonly	store = new Store({cwd: 'storage', name: 'data'+ this.crypt_});
	initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari)=> void) {
		if (this.crypt) this.store.encryptionKey = this.stk();
		if (this.store.size == 0) {
			// データがないときの処理
			hTmp['const.sn.isFirstBoot'] = true;
			this.data.sys = data['sys'];
			this.data.mark = data['mark'];
			this.data.kidoku = data['kidoku'];
			this.flush();
		}
		else {
			// データがあるときの処理
			hTmp['const.sn.isFirstBoot'] = false;
			this.data.sys = this.store.store['sys'];
			this.data.mark = this.store.store['mark'];
			this.data.kidoku = this.store.store['kidoku'];
		}
		comp(this.data);

		// システム情報
		hTmp['const.sn.isDebugger'] = false;
			// システムがデバッグ用の特別なバージョンか
			// AIRNovel の const.flash.system.Capabilities.isDebugger
		/*
		hTmp['const.flash.system.Capabilities.language']
			= Capabilities.language;
			// コンテンツが実行されているシステムの言語コード
		hTmp['const.flash.system.Capabilities.os']
			= Capabilities.os;
			// 現在のオペレーティングシステム
		hTmp['const.flash.system.Capabilities.pixelAspectRatio']
			= Capabilities.pixelAspectRatio;
			// 画面のピクセル縦横比を指定
		hTmp['const.flash.system.Capabilities.playerType']	→ const.sn.isApp
		hTmp['const.flash.system.Capabilities.screenDPI']
			= Capabilities.screenDPI;
			// 画面の1インチあたりのドット数(dpi)解像度をピクセル単位で指定
		*/
		hTmp['const.sn.screenResolutionX'] = this.dsp.size.width;
			// 画面の最大水平解像度
		hTmp['const.sn.screenResolutionY'] = this.dsp.size.height;
			// 画面の最大垂直解像度
			// AIRNovel の const.flash.system.Capabilities.screenResolutionX、Y
			// 上のメニューバーは含んでいない（たぶん an も）。含むのは workAreaSize
		/*
		hTmp['const.flash.system.Capabilities.version']
			= Capabilities.version;
			// Flash Player又はAdobe® AIRのプラットフォームとバージョン

		hTmp['const.flash.display.Stage.displayState']
			= StageDisplayState.NORMAL;
			//	stage.displayState;
		*/

		this.val.defTmp('const.sn.displayState', ()=> this.win.isSimpleFullScreen());

		window.addEventListener('resize', ()=> {
			// NOTE: 2019/07/14 Windowsでこのように遅らせないと正しい縦幅にならない
			this.window((hTmp['const.sn.isFirstBoot']) ?{centering: true}: {});
		}, {once: true, passive: true});

		this.win.on('move', ()=> {
			if (this.isMovingWin) return;
			this.isMovingWin = true;
			this.posMovingWin = this.win.getPosition();
			setTimeout(()=> this.delayWinPos(), 500);
		});
	}
	private	isMovingWin	= false;
	private posMovingWin= [0, 0];
	private delayWinPos() {
		if (this.win.isSimpleFullScreen()) return;

		const p = this.win.getPosition();
		if (this.posMovingWin[0] != p[0] || this.posMovingWin[1] != p[1]) {
			this.posMovingWin = p;
			setTimeout(()=> this.delayWinPos(), 500);
			return;
		}
		this.window({x: p[0], y: p[1]});
		this.isMovingWin = false;
	}
	private readonly	dsp	= remote.screen.getPrimaryDisplay();
	flush() {this.store.store = this.data;}

	private readonly	win	= remote.getCurrentWindow();
	private readonly	wc	= this.win.webContents;
	init(cfg: IConfig, hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): void {
		super.init(cfg, hTag, appPixi, val, main);

		if (CmnLib.devtool) this.wc.openDevTools();
		this.win.setContentSize(CmnLib.stageW, CmnLib.stageH);
	}

	// アプリの終了
	protected readonly	close = ()=> {this.win.close(); return false;}
	// ＵＲＬを開く
	protected readonly	navigate_to = (hArg: HArg)=> {
		const url = hArg.url;
		if (! url) throw '[navigate_to] urlは必須です';
		shell.openExternal(url);

		return false;
	}
	// タイトル指定
	protected readonly	title = (hArg: HArg)=> {
		const text = hArg.text;
		if (! text) throw '[title] textは必須です';

		this.win.setTitle(text);

		return false;
	}
	// 全画面状態切替
	protected readonly	tgl_full_scr = (hArg: HArg)=> {
		if (! hArg.key) {this.tgl_full_scr_sub(); return false;}

		const key = hArg.key.toLowerCase();
		document.addEventListener('keydown', (e: KeyboardEvent)=> {
			const key2 = (e.altKey ?(e.key == 'Alt' ?'' :'alt+') :'')
			+	(e.ctrlKey ?(e.key == 'Control' ?'' :'ctrl+') :'')
			+	(e.shiftKey ?(e.key == 'Shift' ?'' :'shift+') :'')
			+	e.key.toLowerCase();
			if (key2 != key) return;

			e.stopPropagation();
			this.tgl_full_scr_sub();
		}, {passive: true});
		return false;
	}
	protected readonly	tgl_full_scr_sub = ()=> {
		if (this.win.isSimpleFullScreen()) {
			this.win.setSimpleFullScreen(false);	// これはこの位置
			this.win.setSize(CmnLib.stageW, CmnLib.stageH);
			this.appPixi.view.style.width  = CmnLib.stageW +'px';
			this.appPixi.view.style.height = CmnLib.stageH +'px';
			this.appPixi.view.style.marginLeft = '0px';
			this.appPixi.view.style.marginTop  = '0px';
			this.window({});

			this.reso4frame = 1;
		}
		else {
			const w = this.dsp.size.width;
			const h = this.dsp.size.height;
			const ratioWidth  = w / CmnLib.stageW;
			const ratioHeight = h / CmnLib.stageH;
			const ratio = (ratioWidth < ratioHeight) ?ratioWidth :ratioHeight;
			this.win.setSize(CmnLib.stageW * ratio, CmnLib.stageH * ratio);
			this.appPixi.view.style.width  = (CmnLib.stageW * ratio) +'px';
			this.appPixi.view.style.height = (CmnLib.stageH * ratio) +'px';
			if (ratioWidth < ratioHeight) {	// 左に寄る対策
				this.appPixi.view.style.marginTop = (h -CmnLib.stageH *ratio) /2 +'px';
			}
			else {
				this.appPixi.view.style.marginLeft= (w -CmnLib.stageW *ratio) /2 +'px';
			}
			this.win.setSimpleFullScreen(true);	// これはこの位置

			this.win.setContentSize(screen.width, screen.height);
				// これがないとWinアプリ版で下部が短くなり背後が見える
			const cr = this.appPixi.view.getBoundingClientRect();
			this.reso4frame = cr.width / CmnLib.stageW;
		}
		this.resizeFrames();
	}
	// 更新チェック
	protected readonly	update_check = (hArg: HArg)=> {
		const url = hArg.url;
		if (! url) throw '[update_check] urlは必須です';

		ipcRenderer.send('update_check', JSON.stringify(hArg));

		return false;
	}
	// アプリウインドウ設定
	protected readonly	window = (hArg: HArg)=> {
		const screenRX = this.dsp.size.width;
		const screenRY = this.dsp.size.height;
		if (CmnLib.argChk_Boolean(hArg, 'centering', false)) {
			const s = this.win.getPosition();
			hArg.x = (screenRX - s[0]) *0.5;
			hArg.y = (screenRY - s[1]) *0.5;
		}
		else {
			hArg.x = CmnLib.argChk_Num(hArg, 'x', Number(this.val.getVal('sys:const.sn.nativeWindow.x', 0)));
			hArg.y = CmnLib.argChk_Num(hArg, 'y', Number(this.val.getVal('sys:const.sn.nativeWindow.y', 0)));
			if (hArg.x < 0) hArg.x = 0;
			else if (hArg.x > screenRX) hArg.x = 0;
			if (hArg.y < 0) hArg.y = 0;
			else if (hArg.y > screenRY) hArg.y = 0;
		}
		this.win.setPosition(hArg.x, hArg.y);
		this.win.setContentSize(CmnLib.stageW, CmnLib.stageH);
			// NOTE: 2019/07/06 Windowsでこれがないとどんどん縦に短くなる
		const hz = this.win.getContentSize()[1];
		this.win.setContentSize(CmnLib.stageW, CmnLib.stageH *2 -hz);
			// NOTE: 2019/07/14 setContentSize()したのにメニュー高さぶん勝手に削られた値にされる不具合ぽい動作への対応
		this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.x', hArg.x);
		this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.y', hArg.y);
		this.flush();

		return false;
	}

}
