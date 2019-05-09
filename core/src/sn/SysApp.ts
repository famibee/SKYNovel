/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import { SysNode } from "./SysNode";
import {CmnLib} from './CmnLib';
import {HArg, IHTag, IVariable, IData4Vari, IPlugin, IConfig, IMain} from './CmnInterface';
import {remote, BrowserWindow, webContents} from 'electron';
import {Main} from './Main';
const Store = require('electron-store');
const shell = require('electron').shell;

export class SysApp extends SysNode {
	constructor(protected hPlg: {[name: string]: IPlugin} = {}) {
		super(hPlg, remote.app.getAppPath().replace(/\\/g, '/') +'/prj/');
		window.onload = ()=> new Main(this);
	}
	protected	readonly $path_desktop	= remote.app.getPath('desktop').replace(/\\/g, '/') +'/';
	protected	readonly $path_userdata	= remote.app.getPath('userData').replace(/\\/g, '/') +'/';

	protected	readonly	normalize = (src: string, form: string)=> src.normalize(form);

	private	readonly	store = new Store({cwd: 'storage', name: 'data'});
	initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari)=> void) {
		// TODO: 暗号化 this.store.encryptionKey
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

		if (hTmp['const.sn.isFirstBoot']) {
			this.window({centering: true});
		}
		else {
			this.win.setPosition(
				Number(this.val.getVal('sys:const.sn.nativeWindow.x', 0)),
				Number(this.val.getVal('sys:const.sn.nativeWindow.y', 0))
			);
		}
		this.win.on('moved', ()=> {
			const p = this.win.getPosition();
			this.window({x: p[0], y: p[1]});
		});
	}
	private	readonly	dsp	= remote.screen.getPrimaryDisplay();
	flush() {this.store.store = this.data;}

	private	readonly win		: BrowserWindow	= remote.getCurrentWindow();
	private	readonly wc		: webContents	= this.win.webContents;
	init(cfg: IConfig, hTag: IHTag, val: IVariable, appPixi: PIXI.Application, main: IMain): void {
		super.init(cfg, hTag, val, appPixi, main);

		if (CmnLib.devtool) this.wc.openDevTools();
		this.win.setContentSize(CmnLib.stageW, CmnLib.stageH);
	}

	// アプリの終了
	protected readonly close = ()=> {this.win.close(); return false;}
	// ＵＲＬを開く
	protected readonly navigate_to = (hArg: HArg)=> {
		const url = hArg.url;
		if (! url) throw '[navigate_to] urlは必須です';
		shell.openExternal(url);

		return false;
	}
	// タイトル指定
	protected readonly title = (hArg: HArg)=> {
		const text = hArg.text;
		if (! text) throw '[title] textは必須です';

		this.win.setTitle(text);

		return false;
	}
	// 全画面状態切替
	protected readonly tgl_full_scr = (hArg: HArg)=> {
		if (hArg.key) return false;
			// アプリ版は[toggle_full_screen key=w]でなにもしないように。

		this.val.setVal_Nochk('tmp', 'const.sn.displayState', this.win.isFullScreen());	// const.flash.display.Stage.displayState
		// ブラウザ版と違って「:full-screen」などが効かないようなのでプログラマブルに解決
		if (this.win.isFullScreen()) {
			this.win.setFullScreen(false);	// これはこの位置
			this.win.setSize(CmnLib.stageW, CmnLib.stageH);
			this.appPixi.view.style.width = CmnLib.stageW +'px';
			this.appPixi.view.style.height = CmnLib.stageH +'px';
			this.appPixi.view.style.marginLeft = '0px';
			this.appPixi.view.style.marginTop = '0px';
			if (CmnLib.osName == 'WIN') {
				//	hTag.window({x:win_x, y:win_y, width: CmnLib.stageW, height: CmnLib.stageH});
			}
		}
		else {
			const size = remote.screen.getPrimaryDisplay().size;
			const ratioWidth = size.width / CmnLib.stageW;
			const ratioHeight = size.height / CmnLib.stageH;
			const ratio = (ratioWidth < ratioHeight) ?ratioWidth :ratioHeight;
			this.win.setSize(CmnLib.stageW * ratio, CmnLib.stageH * ratio);
			this.appPixi.view.style.width = (CmnLib.stageW * ratio) +'px';
			this.appPixi.view.style.height = (CmnLib.stageH * ratio) +'px';
			if (ratioWidth < ratioHeight) {	// 左に寄る対策
				this.appPixi.view.style.marginTop
				= (size.height -CmnLib.stageH *ratio) /2 +'px';
			}
			else {
				this.appPixi.view.style.marginLeft
				= (size.width -CmnLib.stageW *ratio) /2 +'px';
			}
			this.win.setFullScreen(true);	// これはこの位置
		}

		return false;
	}
	// アプリウインドウ設定
	protected readonly window = (hArg: HArg)=> {
		const screenRX = this.dsp.size.width;
		const screenRY = this.dsp.size.height;
		if (CmnLib.argChk_Boolean(hArg, 'centering', false)) {
			hArg.x = (screenRX - this.win.getPosition()[0]) *0.5;
			hArg.y = (screenRY - this.win.getPosition()[1]) *0.5;
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
		this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.x', hArg.x);
		this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.y', hArg.y);
		this.flush();

		return false;
	}

}
