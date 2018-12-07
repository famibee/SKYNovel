/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import { SysNode } from "./SysNode";
import {CmnLib, HArg, IHTag, IVariable} from './CmnLib';
import {remote, BrowserWindow, webContents, screen} from 'electron';
import {Main} from './Main';
const storage = require('electron-json-storage');

export class SysApp extends SysNode {
	constructor() {
		super(remote.app.getAppPath().replace(/\\/g, '/') +'/prj/');
		window.onload = ()=> new Main(this);
	}
	protected $path_desktop	= remote.app.getPath('desktop').replace(/\\/g, '/') +'/';

	protected	normalize = (src: string, form: string)=> src.normalize(form);

	private win		: BrowserWindow	= remote.getCurrentWindow();
	private wc		: webContents	= this.win.webContents;
	init(hTag: IHTag, val: IVariable, appPixi: PIXI.Application): void {
		super.init(hTag, val, appPixi);

		if (CmnLib.devtool) this.wc.openDevTools();
		this.win.setContentSize(CmnLib.stageW, CmnLib.stageH);
	}

	initData(data: object, hTmp: object, comp: (data: object)=> void) {
		storage.get('data', (err, strDat)=> {
			if (err) throw err;

			if (Object.keys(strDat).length === 0) {
				// データがないときの処理
				hTmp['const.an.isFirstBoot'] = true;
				this.data.sys = data['sys'];
				this.data.mark = data['mark'];
				this.data.kidoku = data['kidoku'];
				this.flush();
			}
			else {
				// データがあるときの処理
				hTmp['const.an.isFirstBoot'] = false;
				this.data.sys = strDat['sys'];
				this.data.mark = strDat['mark'];
				this.data.kidoku = strDat['kidoku'];
			}
			comp(this.data);
		});
	}
	flush() {
		storage.set('data', this.data, err=> {
			if (err) throw err;
		});
	}

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
		const toFullScreen = ! this.win.isFullScreen();
		this.val.setVal_Nochk('tmp', 'const.flash.display.Stage.displayState', toFullScreen);
		if (toFullScreen) {
			const size = screen.getPrimaryDisplay().size;
			const ratioWidth = size.width / CmnLib.stageW;
			const ratioHeight = size.height / CmnLib.stageH;
			const ratio = (ratioWidth < ratioHeight)
				? ratioWidth
				: ratioHeight;
			this.win.setSize(CmnLib.stageW * ratio, CmnLib.stageH * ratio);
			this.appPixi.view.style.width = (CmnLib.stageW * ratio) +'px';
			this.appPixi.view.style.height = (CmnLib.stageH * ratio) +'px';
			this.win.setFullScreen(toFullScreen);	// これはこの位置
		}
		else {
			this.win.setFullScreen(toFullScreen);	// これはこの位置
			this.win.setSize(CmnLib.stageW, CmnLib.stageH);
			this.appPixi.view.style.width = CmnLib.stageW +'px';
			this.appPixi.view.style.height = CmnLib.stageH +'px';
			if (CmnLib.osName == 'WIN') {
				//	hTag.window({x:win_x, y:win_y, width: CmnLib.stageW, height: CmnLib.stageH});
			}
		}

		return false;
	}

}
