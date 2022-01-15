/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2022 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {SysNode} from './SysNode';
import {SysBase} from './SysBase';
import {CmnLib, getDateStr, argChk_Boolean, argChk_Num, uint} from './CmnLib';
import {ITag, IHTag, IVariable, IData4Vari, IMain, HPlugin, HSysBaseArg} from './CmnInterface';
import {Main} from './Main';
import {DebugMng} from './DebugMng';

import {Application} from 'pixi.js';
//import {createHash} from 'crypto';

import {HINFO} from '../preload';
import {IpcRendererEvent} from 'electron/renderer';
const {to_app} = window;


export class SysApp extends SysNode {
	constructor(hPlg = {}, arg = {cur: 'prj/', crypto: false, dip: ''}) {
		super(hPlg, arg);

		globalThis.addEventListener('DOMContentLoaded', async ()=> this.loaded(hPlg, arg), {once: true, passive: true});
	}
	protected override async loaded(hPlg: HPlugin, arg: HSysBaseArg) {
		await super.loaded(hPlg, arg);

		this.#hInfo = await to_app.getInfo();
		CmnLib.isPackaged = this.#hInfo.isPackaged;
		this.arg = arg = {...arg, cur: this.#hInfo.getAppPath.replaceAll('\\', '/') + (CmnLib.isPackaged ?'/doc/' :'/')+ arg.cur};

		this.$path_downloads = this.#hInfo.downloads.replaceAll('\\', '/') +'/';

//		ipcRenderer.on('log', (e: any, arg: any)=> console.log(`[main log] e:%o arg:%o`, e, arg));

		CmnLib.isDbg = Boolean(this.#hInfo.env['SKYNOVEL_DBG']) && ! CmnLib.isPackaged;	// 配布版では無効
		if (CmnLib.isDbg) this.extPort = uint(this.#hInfo.env['SKYNOVEL_PORT'] ?? '3776');

		this.run();
	}
	#hInfo:  HINFO = {
		getAppPath	: '',
		isPackaged	: false,
		downloads	: '',
		userData	: '',
		getVersion	: '',
		env			: {},
		platform	: '',
		arch		: '',
		screenResolutionX	: 0,
		screenResolutionY	: 0,
	};

	protected override	readFileSync = to_app.readFileSync;
	protected override	writeFileSync = to_app.writeFileSync;
	override	appendFile		= to_app.appendFile;
	override	ensureFileSync	= to_app.ensureFileSync;

	protected 	override $path_userdata		= '';
	protected	override $path_downloads	= '';

	override initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari)=> void) {
		// システム情報
		hTmp['const.sn.isDebugger'] = false;
			// システムがデバッグ用の特別なバージョンか
			// AIRNovel の const.flash.system.Capabilities.isDebugger
		hTmp['const.sn.screenResolutionX'] = this.#hInfo.screenResolutionX;
			// 画面の最大水平解像度
		hTmp['const.sn.screenResolutionY'] = this.#hInfo.screenResolutionY;
			// 画面の最大垂直解像度
			// AIRNovel の const.flash.system.Capabilities.screenResolutionX、Y
			// 上のメニューバーは含んでいない（たぶん an も）。含むのは workAreaSize

		this.val.defTmp('const.sn.displayState', async ()=> await to_app.isSimpleFullScreen());

/*
		globalThis.addEventListener('resize', ()=> {
			// NOTE: 2019/07/14 Windowsでこのように遅らせないと正しい縦幅にならない
			this.window((hTmp['const.sn.isFirstBoot']) ?{centering: true} :{});
		}, {once: true, passive: true});
*/

		this.$path_userdata	= CmnLib.isDbg
			? this.#hInfo.getAppPath.slice(0, -3) +'.vscode/'	// /doc → /
			: this.#hInfo.userData.replaceAll('\\', '/') +'/';

		to_app.Store({
			cwd: this.$path_userdata +'storage',
			name: this.arg.crypto ?'data_' :'data',
			encryptionKey: this.arg.crypto ?this.stk() :undefined,
		});
		this.flush = ()=> to_app.flush(this.data);

		(async ()=> {
			const first = hTmp['const.sn.isFirstBoot']
			= await to_app.Store_isEmpty();
			if (first) {
				// データがない（初回起動）場合の処理
				this.data.sys = data.sys;
				this.data.mark = data.mark;
				this.data.kidoku = data.kidoku;
				this.flush();	// 初期化なのでここのみ必要
			}
			else {
				// データがある場合の処理
				const store = await to_app.Store_get();
				this.data.sys = store.sys;
				this.data.mark = store.mark;
				this.data.kidoku = store.kidoku;
			}

			// ウインドウ位置
			const x = (<any>this.data.sys)['const.sn.nativeWindow.x'] ?? 0;
			const y = (<any>this.data.sys)['const.sn.nativeWindow.y'] ?? 0;
			//x	const x = Number(this.val.getVal('sys:const.sn.nativeWindow.x'
			//x	const y = Number(this.val.getVal('sys:const.sn.nativeWindow.y'
				// ここではまだ使えない
			to_app.window(first, x, y, CmnLib.stageW, CmnLib.stageH);
			
			to_app.on('save_win_pos', (_e: IpcRendererEvent, x: number, y: number)=> {
				this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.x', x);
				this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.y', y);
				this.flush();
			});

			comp(this.data);
		})();
	}


	#main: Main;
	protected override async run() {
		if (this.#main) {
			const ms_late = 10;	// NOTE: リソース解放待ち用・魔法数字
			this.#main.destroy(ms_late);
			await new Promise(r=> setTimeout(r, ms_late));
		}

		this.#main = new Main(this);
	}


	override init(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): Promise<void>[] {
		super.init(hTag, appPixi, val, main);

		if (this.cfg.oCfg.debug.devtool) to_app.openDevTools();
		else to_app.win_ev_devtools_opened(()=> {
			console.error(`DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。`);
			main.destroy();
		});
		to_app.win_setContentSize(CmnLib.stageW, CmnLib.stageH);
			// これがないとWinアプリ版で下部が短くなり背後が見える
		return [];
	}


	override copyBMFolder = async (from: number, to: number)=> {
		const path_from = `${this.$path_userdata}storage/${from}/`;
		const path_to = `${this.$path_userdata}storage/${to}/`;
		if (! await to_app.existsSync(path_from)) return;	// 使ってない場合もある

		await to_app.copySync(path_from, path_to);
	};
	override eraseBMFolder = async (place: number)=> {
		await to_app.removeSync(`${this.$path_userdata}storage/${place}/`);
	};

	// アプリの終了
	protected override readonly	close = ()=> {to_app.win_close(); return false;}

	// プレイデータをエクスポート
	protected override readonly	_export = ()=> {
		(async ()=> {
			const r = await to_app.tarFs_pack(this.$path_userdata +'storage/')
			r.on('end', ()=> {
				if (CmnLib.debugLog) console.log('プレイデータをエクスポートしました');
				this.fire('sn:exported', new Event('click'));
			});
			r.pipe(await to_app.createWriteStream(
				this.$path_downloads + (this.crypto ?'' :'no_crypto_')
				+ this.cfg.getNs() + getDateStr('-', '_', '') +'.spd'
			));
		})();

		return false;
	}

	// プレイデータをインポート
	protected override readonly	_import = ()=> {
		const flush = this.flush;
		new Promise((rs, rj)=> {
			const inp = document.createElement('input');
			inp.type = 'file';
			inp.accept = '.spd, text/plain';
			inp.onchange = ()=> {if (inp.files) rs(inp.files[0].path); else rj();};
			inp.click();
		})
		.then(async (inp_path: any)=> {
			this.flush = ()=> {};
			const out_path = this.$path_userdata +'storage/';
			await to_app.removeSync(out_path);
			await to_app.ensureDirSync(out_path);	// ディレクトリ、なければ作る

			(await to_app.createReadStream(inp_path))
			.on('end', async ()=> {
				const fn = this.$path_userdata +'storage/data.json'+ (this.crypto ?'_': '');
				const s = await to_app.readFileSync(fn);
				const o = JSON.parse(this.crypto ? this.decStr('json', s) :s);
				if (! o.sys || ! o.mark || ! o.kidoku) throw new Error('異常なプレイデータです');
				if (o.sys[SysBase.VALNM_CFG_NS] !== this.cfg.oCfg.save_ns) {
					console.error(`別のゲーム【プロジェクト名=${o.sys[SysBase.VALNM_CFG_NS]}】のプレイデータです`);
					return;
				}

				this.data.sys = o.sys;
				this.data.mark = o.mark;
				this.data.kidoku = o.kidoku;
				this.flush = flush;
				this.flush();
				this.val.updateData(o);

				if (CmnLib.debugLog) console.log('プレイデータをインポートしました');
				this.fire('sn:imported', new Event('click'));
			})
			.pipe(await to_app.tarFs_extract(out_path));
		});

		return false;
	}

	// ＵＲＬを開く
	protected override readonly	navigate_to: ITag = hArg=> {
		const url = hArg.url;
		if (! url) throw '[navigate_to] urlは必須です';

		to_app.navigate_to(url);

		return false;
	}
	// タイトル指定
	protected override titleSub(title: string) {to_app.win_setTitle(title);}
	// 全画面状態切替
	protected override readonly	tgl_full_scr: ITag = hArg=> {
		if (! hArg.key) {this.tgl_full_scr_sub(); return false;}

		const key = hArg.key.toLowerCase();
		document.addEventListener('keydown', (e: KeyboardEvent)=> {
			const key2 = (e.altKey ?(e.key === 'Alt' ?'' :'alt+') :'')
			+	(e.ctrlKey ?(e.key === 'Control' ?'' :'ctrl+') :'')
			+	(e.shiftKey ?(e.key === 'Shift' ?'' :'shift+') :'')
			+	e.key.toLowerCase();
			if (key2 !== key) return;

			e.stopPropagation();
			this.tgl_full_scr_sub();
		}, {passive: true});
		return false;
	}
	protected readonly	tgl_full_scr_sub = async ()=> {
		const st = this.appPixi.view.style;
		if (await to_app.isSimpleFullScreen()) {
			await to_app.setSimpleFullScreen(false, CmnLib.stageW, CmnLib.stageH);
			st.width  = CmnLib.stageW +'px';
			st.height = CmnLib.stageH +'px';
			st.marginLeft = '0px';
			st.marginTop  = '0px';

			this.reso4frame = 1;
		}
		else {
			const w = this.#hInfo.screenResolutionX;
			const h = this.#hInfo.screenResolutionY;
			const ratioWidth  = w / CmnLib.stageW;
			const ratioHeight = h / CmnLib.stageH;
			const ratio = (ratioWidth < ratioHeight) ?ratioWidth :ratioHeight;
			await to_app.setSimpleFullScreen(true, screen.width, screen.height);
//			await to_app.setSimpleFullScreen(true, CmnLib.stageW * ratio, CmnLib.stageH * ratio);

			st.width  = (CmnLib.stageW * ratio) +'px';
			st.height = (CmnLib.stageH * ratio) +'px';
			if (ratioWidth < ratioHeight) {	// 左に寄る対策
				st.marginTop  = (h -CmnLib.stageH *ratio) /2 +'px';
			}
			else st.marginLeft= (w -CmnLib.stageW *ratio) /2 +'px';

			await to_app.win_setContentSize(screen.width, screen.height);
				// これがないとWinアプリ版で下部が短くなり背後が見える

			const cr = this.appPixi.view.getBoundingClientRect();
			this.reso4frame = cr.width / CmnLib.stageW;
		}
		this.resizeFrames();
	}
	// 更新チェック
	protected override readonly	update_check: ITag = hArg=> {
		const url = hArg.url;
		if (! url) throw '[update_check] urlは必須です';
		if (url.slice(-1) !== '/') throw '[update_check] urlの最後は/です';
		if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] url=${url}`, 'D');

		(async ()=> {
			let oIdx: any = {};
			let sYml = '';

			// バージョン更新チェック
			let netver = '';
			const resIdxJS = await this.fetch(url +'_index.json');
			if (resIdxJS.ok) {
				if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] _index.jsonを取得しました`, 'D');
				oIdx = await resIdxJS.json();
				netver = oIdx.version;
			}
			else {
				const resYml = await this.fetch(url +`latest${CmnLib.isMac ?'-mac' :''}.yml`);
				if (! resYml.ok) {
					if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] [update_check] .ymlが見つかりません`);
					return;
				}
				if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] .ymlを取得しました`, 'D');
				sYml = await resYml.text();
				const mv = /version: (.+)/.exec(sYml);
				if (! mv) throw `[update_check] .yml に version が見つかりません`;
				netver = mv[1];
			}

			const appver = this.#hInfo.getVersion;
			if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] 現在ver=${appver} 新規ver=${netver}`, 'D');
			if (netver === appver) {
				if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] バージョン更新なし`, 'I');
				return;
			}

			const mbo: Electron.MessageBoxOptions = {
				title	: 'アプリ更新',
				icon	: <any>(this.#hInfo.getAppPath +'/app/icon.png'),
				buttons	: ['OK', 'Cancel'],
				defaultId	: 0,
				cancelId	: 1,
				message	: `アプリ【${this.cfg.oCfg.book.title}】に更新があります。\nダウンロードしますか？`,
				detail	: `現在 NOW ver ${appver}\n新規 NEW ver ${netver}`,
			};
			const di = await to_app.showMessageBox(mbo);
			if (di.response > 0) return;

			// アプリダウンロード
			if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] アプリダウンロード開始`, 'D');
			if (resIdxJS.ok) {
				const key = this.#hInfo.platform +'_'+ this.#hInfo.arch;
			//	const key = this.#hInfo.platform +'_@'+ this.#hInfo.arch;
					// アーキテクチャがない場合の動作テスト
				let pa = oIdx[key];
				if (pa) await this.#dl_app(url, key +'-'+ pa.cn, pa.path);
				else {
					let d = '';
					const aApp: {url: string, urlApp: string, fn: string}[] =[];
					const regOldSameKey = new RegExp('^'+ this.#hInfo.platform +'_');
					for (const k in oIdx) {
						if (! regOldSameKey.test(k)) continue;
						const ap = oIdx[k];
						d += '\n- '+ ap.path;
						aApp.push({url, urlApp: k +'-'+ ap.cn, fn: String(ap.path)});
					}
					mbo.message = `CPU = ${this.#hInfo.arch}\nに対応するファイルが見つかりません。同じOSのファイルをすべてダウンロードしますか？`;
					mbo.detail = aApp.length +' 個ファイルがあります'+ d;
					const di = await to_app.showMessageBox(mbo);
					if (di.response > 0) return;

					await Promise.allSettled(aApp.map(ap=> this.#dl_app(ap.url, ap.urlApp, ap.fn)));
				}
			}
			else {
				const mp = /path: (.+)/.exec(sYml);
				if (! mp) throw `[update_check] path が見つかりません`;
				const path = mp[1];
				if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] path=${path}`, 'D');

				const mc = /sha512: (.+)/.exec(sYml);
				if (! mc) throw `[update_check] sha512 が見つかりません`;
				const sha = mc[1];
				if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] sha=${sha}=`, 'D');

				// (id)-1.0.0-arm64.dmg
				const mm = /(.+)(\.\w+)/.exec(path) ?? ['', '', ''];
				await this.#dl_app(url, mm[1] + '-' + this.#hInfo.arch + mm[2], path);
			}

			if (CmnLib.debugLog) DebugMng.myTrace(`アプリファイルを保存しました`, 'D');

			mbo.buttons!.pop();
			mbo.message = `アプリ【${this.cfg.oCfg.book.title}】の更新パッケージを\nダウンロードしました`;
//			mbo.message = `アプリ【${this.cfg.oCfg.book.title}】の更新パッケージを\nダウンロードしました`+ (isOk ?'' :'が、破損しています。\n開発元に連絡してください');
			to_app.showMessageBox(mbo);
		})();

		return false;
	}
	async	#dl_app(url: string, urlApp: string, fn: string) {
		if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] アプリファイルDL試行... url=${url + urlApp}`, 'D');
		const res = await this.fetch(url + urlApp);
		if (! res.ok) {
			if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] アプリファイルが見つかりません url=${url + fn}`);
			return;
		}

		const pathDL = this.#hInfo.downloads +'/'+ fn;
		if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] pathDL=${pathDL}`, 'D');

		const ab = await res.arrayBuffer();
		await this.writeFileSync(pathDL, new DataView(ab));	//o
	//	await this.writeFileSync(pathDL, Buffer.from(ab));	//x
			// ReferenceError: Buffer is not defined
	//	await this.writeFileSync(pathDL, new Buffer(ab));	//x
	}

	// アプリウインドウ設定
	protected override readonly	window: ITag = hArg=> {
		const x = argChk_Num(hArg, 'x', Number(this.val.getVal('sys:const.sn.nativeWindow.x', 0)));
		const y = argChk_Num(hArg, 'y', Number(this.val.getVal('sys:const.sn.nativeWindow.y', 0)));
		to_app.window(argChk_Boolean(hArg, 'centering', false), x, y, CmnLib.stageW, CmnLib.stageH);
		this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.x', x);
		this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.y', y);
		this.flush();

		return false;
	}

	override readonly	canCapturePage = (fn: string)=> {
		to_app.capturePage(fn);
		return true;
	}

}
