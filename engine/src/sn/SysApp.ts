/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import { SysNode } from "./SysNode";
import {CmnLib, HArg, IHTag, IVariable, IData4Vari} from './CmnLib';
import {remote, BrowserWindow, webContents, screen} from 'electron';
import {Main} from './Main';
const Store = require('electron-store');

export class SysApp extends SysNode {
	constructor() {
		super(remote.app.getAppPath().replace(/\\/g, '/') +'/prj/');
		window.onload = ()=> new Main(this);
	}
	protected $path_desktop	= remote.app.getPath('desktop').replace(/\\/g, '/') +'/';
	protected $path_userdata	= remote.app.getPath('userData').replace(/\\/g, '/') +'/';

	protected	normalize = (src: string, form: string)=> src.normalize(form);

	private win		: BrowserWindow	= remote.getCurrentWindow();
	private wc		: webContents	= this.win.webContents;
	init(hTag: IHTag, val: IVariable, appPixi: PIXI.Application): void {
		super.init(hTag, val, appPixi);

		if (CmnLib.devtool) this.wc.openDevTools();
		this.win.setContentSize(CmnLib.stageW, CmnLib.stageH);

		//	デバッグ・その他
		// アプリウインドウ設定
		hTag.window = this.window;
	}

	private	store = new Store({cwd: 'storage', name: 'data'});
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

		/*
		// システム情報
		hTmp['const.flash.system.Capabilities.isDebugger']
			= Capabilities.isDebugger;
			// システムがデバッグ用の特別なバージョンか
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
		hTmp['const.sn.Capabilities.screenResolutionX'] = this.dsp.size.width;
			// 画面の最大水平解像度
		hTmp['const.sn.Capabilities.screenResolutionY'] = this.dsp.size.height;
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
	private	dsp	= screen.getPrimaryDisplay();
	flush() {this.store.store = this.data;}

	protected close = ()=> {this.win.close(); return false;}
	protected title = (hArg: HArg)=> {
		const text = hArg.text;
		if (! text) throw '[title] textは必須です';

		this.win.setTitle(text);

		return false;
	}
	protected toggle_full_screen = (hArg: HArg)=> {
		const key = hArg.key;
		if (key) {
			window.addEventListener('keydown', (e: KeyboardEvent)=> {
				if (e.key != key) return;

				e.stopPropagation();
				this.toggle_full_screen({});
			});
			return false;
		}

		/*if (stage.displayState == StageDisplayState.NORMAL) {
			win_x = stage.nativeWindow.x;
			win_y = stage.nativeWindow.y;
		//myTrace('x:'+ win_x +' y:'+ win_y);
		}*/
		this.val.setVal_Nochk('tmp', 'const.sn.displayState', this.win.isFullScreen());	// const.flash.display.Stage.displayState
		if (this.win.isFullScreen()) {
			this.win.setFullScreen(true);	// これはこの位置
			this.win.setSize(CmnLib.stageW, CmnLib.stageH);
			this.appPixi.view.style.width = CmnLib.stageW +'px';
			this.appPixi.view.style.height = CmnLib.stageH +'px';
			if (CmnLib.osName == 'WIN') {
				//	hTag.window({x:win_x, y:win_y, width: CmnLib.stageW, height: CmnLib.stageH});
			}
		}
		else {
			const size = screen.getPrimaryDisplay().size;
			const ratioWidth = size.width / CmnLib.stageW;
			const ratioHeight = size.height / CmnLib.stageH;
			const ratio = (ratioWidth < ratioHeight)
				? ratioWidth
				: ratioHeight;
			this.win.setSize(CmnLib.stageW * ratio, CmnLib.stageH * ratio);
			this.appPixi.view.style.width = (CmnLib.stageW * ratio) +'px';
			this.appPixi.view.style.height = (CmnLib.stageH * ratio) +'px';
			this.win.setFullScreen(false);	// これはこの位置
		}

		return false;
	}

	// アプリウインドウ設定
	private window(hArg: HArg) {
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
