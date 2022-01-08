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
		screenResolutionX	: 0,
		screenResolutionY	: 0,
	};

	protected override	readFileSync = to_app.readFileSync;
	protected override	writeFileSync = to_app.writeFileSync;
	override	appendFile = to_app.appendFile;
	override	ensureFileSync = to_app.ensureFileSync;

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
			if (hTmp['const.sn.isFirstBoot'] = await to_app.Store_isEmpty()) {
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
	protected override readonly	_export: ITag = ()=> {
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
	protected override readonly	_import: ITag = ()=> {
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
			// バージョン更新チェック
			const res = await this.fetch(url +`latest${CmnLib.isMac ?'-mac' :''}.yml`);
			if (! res.ok) {
				if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] [update_check] .ymlが見つかりません`);
				return;
			}
			if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] .ymlを取得しました`, 'D');
			const txtYml = await res.text();
			const mv = /version: (.+)/.exec(txtYml);
			if (! mv) throw `[update_check] .yml に version が見つかりません`;
			const netver = mv[1];

			const appver = this.#hInfo.getVersion;
			if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] 現在ver=${appver} 新規ver=${netver}`, 'D');
			if (netver === appver) {
				if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] バージョン更新なし`, 'I');
				return;
			}

			// アプリダウンロード
			if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] アプリダウンロード開始`, 'D');
			const mp = /path: (.+)/.exec(txtYml);
			if (! mp) throw `[update_check] .yml に path が見つかりません`;
			const path = mp[1];
			if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] path=${path}`, 'D');

			const mc = /sha512: (.+)/.exec(txtYml);
			if (! mc) throw `[update_check] .yml に sha512 が見つかりません`;
			const sha = mc[1];
			if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] sha=${sha}=`, 'D');

			const res_dl = await this.fetch(url + path);
			if (! res_dl.ok) {
				if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] アプリファイルが見つかりません url=${url + path}`);
				return;
			}
			const pathDL = this.#hInfo.downloads +'/'+ path;
			if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] pathDL=${pathDL}`, 'D');

// 仮作成
			const b = await res_dl.blob();

			const url2 = URL.createObjectURL(b);
			const a = document.createElement('a');
			document.body.appendChild(a);
			a.download = path;
			a.href = url2;
			a.click();
			a.remove();
/*
			setTimeout(()=> {
				URL.revokeObjectURL(url2);
			}, 1E4);
*/


/*
			try {
console.log(`fn:SysApp.ts line:328 `);
//				const r = res_dl.body;
				const r = res_dl.body?.getReader();
console.log(`fn:SysApp.ts line:330 r:%o`, r);
				if (r) {
					const ws = await to_app.createWriteStream(pathDL);
					r.pipeTo(ws);
/ *
					r.on('end', ()=> {
						if (CmnLib.debugLog) console.log('プレイデータをエクスポートしました');
						this.fire('sn:exported', new Event('click'));
					});
					r.pipe(await to_app.createWriteStream(
						this.$path_downloads + (this.crypto ?'' :'no_crypto_')
						+ this.cfg.getNs() + getDateStr('-', '_', '') +'.spd'
					));
* /
				}
*/


/*
				const ab = await res_dl.arrayBuffer();
console.log(`fn:SysApp.ts line:343 `);
				await this.writeFileSync(pathDL, Buffer.from(ab));
console.log(`fn:SysApp.ts line:345 `);
*/

				if (CmnLib.debugLog) DebugMng.myTrace(`アプリファイルを保存しました`, 'D');
//			} catch (e) {throw e;}

//console.log(`fn:SysApp.ts line:340 `);

/*
			const o = {
				title: 'アプリ更新',
				icon: this.#hInfo.getAppPath +'/app/icon.png',
				buttons: ['OK', 'Cancel'],
				defaultId: 0,
				cancelId: 1,
				message: `アプリ【${this.cfg.oCfg.book.title}】に更新があります。\nダウンロードしますか？`,
				detail: `現在ver ${appver}\n新規ver ${netver}`,
			};
//			const di = await remote.dialog.showMessageBox(o as any);// iconのせい
//			if (di.response > 0) return;
*/
/*
			const rd_dl = async (res: Response)=> {
DebugMng.myTrace(`fn:SysApp.ts line:337 `, 'I');
console.log(`fn:SysApp.ts line:340 res:%o`, res);
				const reader = res.body!.getReader();
console.log(`fn:SysApp.ts line:342 `);
				const {Readable} = await import('stream');
console.log(`fn:SysApp.ts line:344 `);
				const rdb = new Readable();
console.log(`fn:SysApp.ts line:346 `);
				rdb._read = async ()=> {
console.log(`fn:SysApp.ts line:349 `);
					const {done, value} = await reader.read();
console.log(`fn:SysApp.ts line:351 `);
					if (done) {rdb.push(null); return;}
					rdb.push(Buffer.from(value!));
				};
console.log(`fn:SysApp.ts line:356 `);
				return rdb;
			}
			const pipe_dl = await rd_dl(res_dl);
			pipe_dl.on('end', ()=> {
				if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] アプリダウンロード完了`, 'D');

				to_app.readFile(pathDL, async (err: any, data: any)=> {
					if (err) throw err;

					const h = createHash('SHA512');
					h.update(data)
					const hash = String(h.digest('base64'));

					const isOk = sha === hash;
					if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] SHA512 Checksum:${isOk} sha:${sha} hash:${hash}`, 'D');
					if (! isOk) await to_app.removeSync(pathDL);

					o.buttons.pop();
					o.message = `アプリ【${this.cfg.oCfg.book.title}】の更新パッケージを\nダウンロードしました`+ (isOk ?'' :'が、破損しています。\n開発元に連絡してください');
//					remote.dialog.showMessageBox(o as any);	// iconのせい
				});
			})
			.pipe(await to_app.createWriteStream(pathDL));
*/
		})();

		return false;
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
