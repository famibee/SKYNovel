/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import { SysNode } from "./SysNode";
import {CmnLib} from './CmnLib';
import {ITag, IHTag, IVariable, IData4Vari, IConfig, IMain} from './CmnInterface';
import {Main} from './Main';
import {Application} from 'pixi.js';

const {remote, shell, ipcRenderer} = require('electron');
const Store = require('electron-store');

const {Readable} = require('stream');
import m_fs = require('fs-extra');
const crypto = require('crypto');

export class SysApp extends SysNode {
	constructor(hPlg = {}, arg = {cur: 'prj/', crypto: false, dip: ''}) {
		super(hPlg, {cur: remote.app.getAppPath().replace(/\\/g, '/') +'/'+ arg.cur, crypto: arg.crypto, dip: ''});
		window.addEventListener('DOMContentLoaded', ()=>new Main(this), {once: true, passive: true});

		ipcRenderer.on('log', (e: any, arg: any)=>console.log(`[main log] e:%o arg:%o`, e, arg));
	}
	protected readonly	$path_desktop	= remote.app.getPath('desktop').replace(/\\/g, '/') +'/';
	protected readonly	$path_userdata	= remote.app.getPath('userData').replace(/\\/g, '/') +'/';

	protected readonly	normalize = (src: string, form: string)=> src.normalize(form);

	private readonly	store = new Store({cwd: 'storage', name: this.arg.crypto ?'data_' :'data'});
	initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari)=> void) {
		if (this.crypto) this.store.encryptionKey = this.stk();
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
	private	cfg: IConfig;
	init(cfg: IConfig, hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): void {
		super.init(cfg, hTag, appPixi, val, main);
		this.cfg = cfg;

		if (cfg.oCfg.debug.devtool) this.wc.openDevTools();
		else this.wc.on('devtools-opened', ()=> {
			console.error(`DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。`);
			main.destroy();
		})
		this.win.setContentSize(CmnLib.stageW, CmnLib.stageH);
	}

	// アプリの終了
	protected readonly	close = ()=> {this.win.close(); return false;}
	// ＵＲＬを開く
	protected readonly	navigate_to: ITag = hArg=> {
		const url = hArg.url;
		if (! url) throw '[navigate_to] urlは必須です';
		shell.openExternal(url);

		return false;
	}
	// タイトル指定
	protected readonly	title: ITag = hArg=> {
		const text = hArg.text;
		if (! text) throw '[title] textは必須です';

		this.win.setTitle(text);

		return false;
	}
	// 全画面状態切替
	protected readonly	tgl_full_scr: ITag = hArg=> {
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
	protected readonly	update_check: ITag = hArg=> {
		const url = hArg.url;
		if (! url) throw '[update_check] urlは必須です';
		if (url.slice(-1) != '/') throw '[update_check] urlの最後は/です';

		(async ()=> {
			const res = await this.fetch(url +`latest${CmnLib.isMac ?'-mac' :''}.yml`);
			if (! res.ok) return;
			if (CmnLib.debugLog) console.log(`[update_check] ymlを取得しました url=${url}`);
			const txt = await res.text();
			const mv = /version: (.+)/.exec(txt);
			if (! mv) throw `[update_check] ファイル内にversionが見つかりません`;
			const netver = mv[1];

			const myver = remote.app.getVersion();
			if (netver == myver) {
				if (CmnLib.debugLog) console.log(`[update_check] バージョン更新なし ver:${myver}`);
				return;
			}
			if (CmnLib.debugLog) console.log(`[update_check] 現在ver=${myver} 新規ver=${netver}`);

			const o = {
				title: 'アプリ更新',
				icon: remote.app.getAppPath() +'/app/icon.png',
				buttons: ['OK', 'Cancel'],
				defaultId: 0,
				cancelId: 1,
				message: `アプリ【${this.cfg.oCfg.book.title}】に更新があります。\nダウンロードしますか？`,
				detail: `現在ver ${myver}\n新規ver ${netver}`,
			};
			const di = await remote.dialog.showMessageBox(o);
			if (di.response > 0) return;

			if (CmnLib.debugLog) console.log(`[update_check] アプリダウンロード開始`);
			const mp = /path: (.+)/.exec(txt);
			if (! mp) throw `[update_check] ファイル内にpathが見つかりません`;
			const fn = mp[1];

			const mc = /sha512: (.+)/.exec(txt);
			if (! mc) throw `[update_check] ファイル内にsha512が見つかりません`;
			const sha = mc[1];

			const res_dl = await this.fetch(url + fn);
			if (! res_dl.ok) return;
			const pathDL = remote.app.getPath('downloads') +'/'+ fn;
			const rd_dl = (res: Response)=> {
				const reader = res!.body!.getReader();
				const rdb = new Readable();
				rdb._read = async ()=> {
					const {done, value} = await reader.read();
					if (done) {rdb.push(null); return;}
					rdb.push(Buffer.from(value!));
				};
				return rdb;
			}
			const pipe_dl = await rd_dl(res_dl);
			pipe_dl.on('end', ()=> {
				if (CmnLib.debugLog) console.log(`[update_check] アプリダウンロード完了`);

				m_fs.readFile(pathDL, (err, data)=> {
					if (err) throw err;

					const h = crypto.createHash('SHA512');
					h.update(data)
					const hash = h.digest('base64');

					const isOk = sha == hash;
					if (CmnLib.debugLog) console.log(`[update_check] SHA512 Checksum:${isOk}`, sha, hash);
					if (! isOk) m_fs.unlink(pathDL);

					o.buttons.pop();
					o.message = `アプリ【${this.cfg.oCfg.book.title}】の更新パッケージを\nダウンロードしました`+ (isOk ?'' :'が、破損しています。\n開発元に連絡してください');
					remote.dialog.showMessageBox(o);
				});
			});
			pipe_dl.pipe(m_fs.createWriteStream(pathDL));
		})();

		return false;
	}
	// アプリウインドウ設定
	protected readonly	window: ITag = hArg=> {
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
