/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {IHTag, ITag} from './Grammar';
import type {IVariable, ISysBase, T_Data4Vari, ILayerFactory, IMain, IFire, IFncHook, PLUGIN_DECAB_RET, T_PLUGIN_INFO, T_SysBaseLoadedParams, HPlugin, T_H_TMP_DATA} from './CmnInterface';
import {creSYS_DATA} from './CmnInterface';
import {argChk_Boolean, CmnLib, EVNM_KEY} from './CmnLib';
import {EventListenerCtn} from './EventListenerCtn';
import type {IConfig, IFn2Path, ISysRoots, HSysBaseArg} from './ConfigBase';
import {SEARCH_PATH_ARG_EXT} from './ConfigBase';

import type {Application, DisplayObject, Loader, RenderTexture} from 'pixi.js';
import {io, type Socket} from 'socket.io-client';


export class SysBase implements ISysRoots, ISysBase {
	hFactoryCls: {[name: string]: ILayerFactory}	= {};

	protected	readonly	elc		= new EventListenerCtn;

	constructor(readonly hPlg: HPlugin = {}, public arg: HSysBaseArg) {}
	protected async loaded(...[hPlg,]: T_SysBaseLoadedParams) {
		const fncPre = hPlg.snsys_pre;	// prj・path.json_ の為に先読み
		delete hPlg.snsys_pre;
		return fncPre?.init({
			getInfo: this.#getInfo,
			addTag: ()=> { /* empty */ },
			addLayCls: ()=> { /* empty */ },
			searchPath: ()=> '',
			getVal: ()=> ({}),
			resume: ()=> { /* empty */ },
			render: ()=> { /* empty */ },
			setDec: fnc=> {this.dec = fnc},
			setDecAB: fnc=> {this.#plgDecAB = fnc},
			setEnc: fnc=> {this.enc = fnc},
			getStK: fnc=> {this.stk = fnc},
			getHash: fnc=> {this.hash = fnc},
		});
	}
	fetch = (url: string, init?: RequestInit)=> fetch(url, init);

	destroy() {this.elc.clear()}

	resolution	= 1;

	protected	cfg: IConfig;
	// eslint-disable-next-line @typescript-eslint/require-await
	async loadPath(_hPathFn2Exts: IFn2Path, cfg: IConfig) {this.cfg = cfg}

	protected	readonly	data: T_Data4Vari = {
		sys		: creSYS_DATA(),
		mark	: {},
		kidoku	: {},
	};
	async	initVal(_data: T_Data4Vari, _hTmp: T_H_TMP_DATA, _comp: (data: T_Data4Vari)=> void) { /* empty */ }
	flush() {
		// 立て続きの保存を回避し最短 500ms の間隔を開ける
		if (this.#tidFlush) {this.#rsvFlush = true; return}	// 次の Timeout 時に予約

		this.flushSub();	// ひとまず即時
		this.#tidFlush = setTimeout(()=> {
			this.#tidFlush = undefined;
			if (! this.#rsvFlush) return;	// 予約もないのでなにもせず通常状態に

			this.#rsvFlush = false;			// 次の予約を待つためリセット
			this.flush();	// 次の Timeout 後に
		}, 500);
	}
	#tidFlush	: NodeJS.Timeout | undefined = undefined;
	#rsvFlush	 = false;
	protected	flushSub() { /* empty */ }


	// === vite-electron 用コード ===
	use4ViteElectron(_src: string, _path: string, _ld: Loader, _main: IMain): boolean {return false}


	protected async run() { /* empty */ }


	protected	val		: IVariable;
	protected	main	: IMain;
	init(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain) {
		const aP: Promise<void>[] = [];

		this.val = val;
		this.main = main;
		let mes = '';
		aP.push(
			val.setSys(this)
			.then(()=> {
				//l = String(val.getVal('save:const.sn.sLog'));
				mes = 'sys';	// tst sys
				mes += String(val.getVal('sys:TextLayer.Back.Alpha', 1));
				mes = 'kidoku';	// tst kidoku
				val.saveKidoku();
			//	mes = 'save';	// tst save
			//	mes += String(val.getVal('save:sn.doRecLog', 'false'));
			})
			.catch((e: unknown)=> console.error(`セーブデータ（${mes}）が壊れています。一度クリアする必要があります(b) %o`, e))
		);

		//	システム
		hTag.close			= o=> this.close(o);	// アプリの終了
		hTag.export			= o=> this._export(o);	// プレイデータをエクスポート
		hTag.import			= o=> this._import(o);	// プレイデータをインポート

	//	hTag.loadplugin		// LayerMng.ts内で定義	// cssの読み込み
//		hTag.mouse			= o=> this.mouse(o);	// マウスの設定
		hTag.navigate_to	= o=> this.navigate_to(o);	// ＵＲＬを開く
	//	hTag.set_focus		// LayerMng.ts内で定義	// フォーカス移動
	//	hTag.snapshot		// LayerMng.ts内で定義	// スナップショット
		hTag.title			= o=> this.title(o);	// タイトル指定
		hTag.toggle_full_screen = o=> this.#tglFlscr(o);	// 全画面状態切替
//		hTag.unzip			= o=> this.unzip(o);	// ネット素材取得
		hTag.update_check	= o=> this.update_check(o);	// 更新チェック
		hTag.window			= o=> this.window(o);	// アプリウインドウ設定

		val.defTmp('const.sn.isApp', ()=> this.isApp);
		val.defTmp('const.sn.isDbg', ()=> CmnLib.isDbg);
		val.defTmp('const.sn.isPackaged', ()=> CmnLib.isPackaged);

		val.defTmp('const.sn.displayState', ()=> this.isFullScr);

		val.setVal_Nochk('sys', 'const.sn.cfg.ns', this.cfg.oCfg.save_ns);

		val.flush();

		if (CmnLib.isDbg) this.attach_debug(main);

		this.hFactoryCls = {};	// ギャラリーなどで何度も初期化される対策
		// プラグイン初期化
		return [
			...aP,
			...Object.values(this.hPlg).map(v=> v.init({
				getInfo: this.#getInfo,
				addTag: (name: string, tag_fnc: ITag)=> {
					if (name in hTag) throw `すでに定義済みのタグ[${name}]です`;
					hTag[<keyof IHTag>name] = tag_fnc;
				},
				addLayCls: (cls: string, fnc: ILayerFactory)=> {
					if (this.hFactoryCls[cls]) throw `すでに定義済みのレイヤcls【${cls}】です`;
					this.hFactoryCls[cls] = fnc;
				},
				searchPath: (fn, extptn = SEARCH_PATH_ARG_EXT.DEFAULT)=>	this.cfg.searchPath(fn, extptn),
				getVal: (arg_name: string, def?: number | string)=> val.getVal(arg_name, def),
				resume: ()=> main.resume(),
				render: (dsp: DisplayObject, renderTexture: RenderTexture, clear = false)=> appPixi.renderer.render(dsp, {renderTexture, clear}),
				setDec: ()=> { /* empty */ },
				setDecAB: ()=> { /* empty */ },
				setEnc: ()=> { /* empty */ },
				getStK: ()=> { /* empty */ },
				getHash: ()=> { /* empty */ },
			})),
		];
	}
	#getInfo: ()=> T_PLUGIN_INFO	= ()=> ({
		window: {
			width	: CmnLib.stageW,
			height	: CmnLib.stageH,
		},
	});


	#cvsWidth	= 0;
	#cvsHeight	= 0;
	#cvsScale	= 1;
	#ofsLeft4elm = 0;
	#ofsTop4elm  = 0;
	#ofsPadLeft_Dom2PIXI	= 0;
	#ofsPadTop_Dom2PIXI		= 0;
	get	cvsWidth(): number {return this.#cvsWidth}
	get	cvsHeight(): number {return this.#cvsHeight}
	get	cvsScale(): number {return this.#cvsScale}
	get	ofsLeft4elm(): number {return this.#ofsLeft4elm}
	get	ofsTop4elm(): number {return this.#ofsTop4elm}
	get	ofsPadLeft_Dom2PIXI(): number {return this.#ofsPadLeft_Dom2PIXI}
	get	ofsPadTop_Dom2PIXI(): number {return this.#ofsPadTop_Dom2PIXI}
	protected	isFullScr	= false;
	cvsResize() {
		let w = globalThis.innerWidth;
		let h = globalThis.innerHeight;
		const cvs = this.main.cvs;
		const isGallery = cvs.parentElement !== document.body;
		if (isGallery) {
			const st = globalThis.getComputedStyle(cvs);
			w = parseFloat(st.width);
			h = parseFloat(st.height);
		}
		if (CmnLib.isMobile) {
			const angle = screen.orientation.angle;
				// const {angle=0} = screen.orientation;
				// この記法は、Safari で以下のエラーになる
				// TypeError: Right side of assignment cannot be destructured
			const isP = angle % 180 === 0;	// 4Safari
			if (isP && w > h || ! isP && w < h) [w, h] = [h, w];
		}

		const cr = cvs.getBoundingClientRect();
		if (argChk_Boolean(CmnLib.hDip, 'expanding', true) || isGallery
		||	CmnLib.stageW > w
		||	CmnLib.stageH > h) {
			if (CmnLib.stageW /CmnLib.stageH <= w /h) {
				this.#cvsHeight = h;
				this.#cvsWidth  = CmnLib.stageW /CmnLib.stageH *h;
			}
			else {
				this.#cvsWidth  = w;
				this.#cvsHeight = CmnLib.stageH /CmnLib.stageW *w;
			}
			this.#cvsScale = this.#cvsWidth /CmnLib.stageW;

			if (isGallery) {
				this.#ofsPadLeft_Dom2PIXI	= 0;
				this.#ofsPadTop_Dom2PIXI	= 0;
			}
			else {
				const sc = 1 -this.#cvsScale;
				if (CmnLib.isMobile) {
					this.#ofsPadLeft_Dom2PIXI = (w -this.#cvsWidth) /2 *sc;
					this.#ofsPadTop_Dom2PIXI  = (h -this.#cvsHeight)/2 *sc;
				}
				else {
					this.#ofsPadLeft_Dom2PIXI = cr.left*sc;
					this.#ofsPadTop_Dom2PIXI  = cr.top *sc;
				}
					// [left] /this.#cvsScale -[left]
					// PaddingLeft を DOMで引いてPIXIで足すイメージ
			}
		}
		else {
			this.#cvsWidth = CmnLib.stageW;
			this.#cvsHeight = CmnLib.stageH;
			this.#cvsScale = 1;
			this.#ofsPadLeft_Dom2PIXI	= 0;
			this.#ofsPadTop_Dom2PIXI	= 0;
		}

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const ps = cvs.parentElement!.style;
		if (! isGallery) {
			ps.position = 'relative';
			ps.width = `${String(this.#cvsWidth)}px`;
			ps.height= `${String(this.#cvsHeight)}px`;
		}
		const s = cvs.style;
		s.width = ps.width;
		s.height= ps.height;

		if (isGallery) {
			this.#ofsLeft4elm = cr.left;
			this.#ofsTop4elm  = cr.top;
		}
		else {
			this.#ofsLeft4elm = 0;
			this.#ofsTop4elm  = 0;
		}
		if (this.isFullScr) {
			this.#ofsLeft4elm += (w -this.#cvsWidth) /2;
			this.#ofsTop4elm  += (h -this.#cvsHeight)/2;
		}
	}


	// デバッガ接続
	attach_debug(main: IMain) {
		this.attach_debug = ()=> { /* empty */ };

		const gs = document.createElement('style');
		gs.innerHTML = `/* SKYNovel Dbg */
.sn_BounceInOut { animation: sn_kfBounceInOut linear 1.5s; }
@keyframes sn_kfBounceInOut{
0%	{opacity: 0;	transform: scaleX(0.30) scaleY(0.30);}
10%	{opacity: 1;	transform: scaleX(1.10) scaleY(1.10);}
20%	{				transform: scaleX(0.95) scaleY(0.95);}
30%	{				transform: scaleX(1.00) scaleY(1.00);}
70%	{opacity: 1;}
100%{opacity: 0;}
}
.sn_BounceIn { animation: sn_kfBounceIn linear 0.3s; }
@keyframes sn_kfBounceIn{
0%	{opacity: 0;	transform: scaleX(0.30) scaleY(0.30);}
50%	{opacity: 1;	transform: scaleX(1.10) scaleY(1.10);}
100%{				transform: scaleX(0.95) scaleY(0.95);}
}
.sn_HopIn { animation: sn_kfHopIn linear 0.8s; }
@keyframes sn_kfHopIn{
0%	{transform:	translate(0px,   0px);}
15% {transform:	translate(0px, -25px);}
30% {transform:	translate(0px,   0px);}
45% {transform:	translate(0px, -15px);}
60% {transform:	translate(0px,   0px);}
75% {transform:	translate(0px,  -5px);}
100%{transform:	translate(0px,   0px);}
}`;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		document.getElementsByTagName('head')[0]!.appendChild(gs);


		this.addHook((type, o)=> this.#hHook[type]?.(o));

		this.#sk = io(`http://localhost:${String(this.extPort)}`);
		this.#sk
		.on('data', (type: string, o: unknown)=> {
//console.log(`fn:SysBase.ts RSV dbg -> sn type:${type} o:${JSON.stringify(o).slice(0, 150)}`);
			this.callHook(type, o);
		})
		.on('disconnect', ()=> main.setLoop(true));
			// reasonという引数で理由が分かる
			// https://socket.io/docs/v3/client-socket-instance/

		this.callHook = (type, o)=> {
			for (const fnc of this.#aFncHook) fnc(type, o);
		}
	}
	protected	extPort = 3776;

	end() {
		this.#sk?.disconnect();
		this.#sk = undefined;
	}
	#sk: Socket | undefined = undefined;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	readonly	#hHook: {[type: string]: (o: any)=> void}	= {
		auth		: o=> {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			if (o.t !== this.cfg.oCfg.debuger_token) {this.end(); return}

			this.toast('接続');
		},
		continue	: ()=> this.toast('再生'),
		disconnect	: ()=> this.toast('切断'),
		restart		: o=> {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
			this.send2Dbg(o?.ri ?? '', {});
			this.end();
			// これ以前の this は旧Main。以後は this必須
			// 以後は新Mainによる本メソッドinit()→launch接続待ち
			void this.run();
		},
		pause			: ()=> this.toast('一時停止'),
		stopOnEntry		: ()=> this.toast('一時停止'),
		stopOnDataBreakpoint	: ()=> this.toast('注意'),
		stopOnBreakpoint		: ()=> this.toast('注意'),
		stopOnStep			: ()=> this.toast('一歩進む'),
		stopOnStepIn		: ()=> this.toast('ステップイン'),
		stopOnStepOut		: ()=> this.toast('ステップアウト'),
		stopOnBackstep		: ()=> this.toast('一歩戻る'),

		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
		_addPath		: o=> this.cfg.addPath(o.fn, o.o),
	};
	protected toast(nm: string) {
		const p = document.body;
		for (const e of [
			...Array.from(p.getElementsByClassName('sn_BounceIn')),
			...Array.from(p.getElementsByClassName('sn_HopIn')),
		]) e.remove();

		const img = document.createElement('img');
		const td = SysBase.#hToastDat[nm];
		if (! td) throw new Error(`toast 名ミス=${nm}`);
		img.src = `data:image/svg+xml;base64,${td.dat}`;
		const size = Math.min(CmnLib.stageW, CmnLib.stageH) /4 *this.#cvsScale;
		img.width = img.height = size;
		img.style.cssText =
`position: absolute;
left: ${String(
	(CmnLib.stageW -size) /2 *this.#cvsScale +size *(td.dx ?? 0)
)}px;
top: ${String(
	(CmnLib.stageH -size) /2 *this.#cvsScale +size *(td.dy ?? 0)
)}px;`;
		img.classList.add('sn_toast', td.ease ?? 'sn_BounceInOut');
		if (! td.ease) img.addEventListener('animationend', ()=> p.removeChild(img), {once: true, passive: true});
		p.insertBefore(img, this.main.cvs);
	}
	static	readonly	#hToastDat
	: {[nm: string] :{dat: string, dx?: number, dy?: number, ease?: string}}	= {	// Thanks ICOOON MONO https://icooon-mono.com/ 、 https://vectr.com/ で 640x640化、ImageOptim経由、Base64エンコーダー https://lab.syncer.jp/Tool/Base64-encode/
		'接続'	: {dx: -1, dat: 'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtNjQwIDMyMGMwIDE3Ni43My0xNDMuMjcgMzIwLTMyMCAzMjBzLTMyMC0xNDMuMjctMzIwLTMyMCAxNDMuMjctMzIwIDMyMC0zMjAgMzIwIDE0My4yNyAzMjAgMzIweiIvPjxwYXRoIGlkPSJiIiBkPSJtMCAyOTJ2NTUuODhoMTI3LjEzYzEyLjM3IDQ2IDU0LjEyIDc5Ljg3IDEwNCA3OS44N2g3Ny44N3YtMjE1LjYyYy00Ni43MyAwLTcyLjY4IDAtNzcuODggMC00OS43NCAwLTkxLjYyIDMzLjg3LTEwMy45OSA3OS44Ny0xNi45NSAwLTU5LjMzIDAtMTI3LjEzIDB6Ii8+PHBhdGggaWQ9ImMiIGQ9Im01MTIuODggMjkyYy0xMi4zOC00Ni01NC4xMy03OS44Ny0xMDQtNzkuODctNS4yMSAwLTMxLjIxIDAtNzggMHYyMTUuNzRoNzcuODdjNDkuODggMCA5MS43NS0zMy44NyAxMDQtNzkuODdoMTI3LjI1di01NmMtNzYuMjcgMC0xMTguNjUgMC0xMjcuMTIgMHoiLz48L2RlZnM+PHVzZSBmaWxsPSIjMmUyZTJlIiB4bGluazpocmVmPSIjYSIvPjx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIGZpbGw9IiMzYWFiZDIiIHhsaW5rOmhyZWY9IiNiIi8+PHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjYiIvPjx1c2UgZmlsbD0iIzNhYWJkMiIgeGxpbms6aHJlZj0iI2MiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNjIi8+PC9zdmc+'},
		'切断'	: {dat: 'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtNjQwIDMyMGMwIDE3Ni43My0xNDMuMjcgMzIwLTMyMCAzMjBzLTMyMC0xNDMuMjctMzIwLTMyMCAxNDMuMjctMzIwIDMyMC0zMjAgMzIwIDE0My4yNyAzMjAgMzIweiIvPjxwYXRoIGlkPSJiIiBkPSJtMTkxLjUzIDIyMS4yNGMtNDUuNjggMC04NC4wMSAzMS4wNC05NS4zIDczLjE2LTYuNDEgMC0zOC40OSAwLTk2LjIzIDB2NTEuMjFoOTYuMjNjMTEuMyA0Mi4xMSA0OS42MyA3My4xNiA5NS4zIDczLjE2aDcxLjMzdi00OC4yNGg1My43OHYtMTAxLjA1aC01My43OHYtNDguMjRjLTQyLjggMC02Ni41NyAwLTcxLjMzIDB6Ii8+PHBhdGggaWQ9ImMiIGQ9Im00NDguNDcgMjIxLjIzYy00Ljc2IDAtMjguNTMgMC03MS4zMyAwdjE5Ny41M2g3MS4zM2M0NS42OCAwIDgzLjk5LTMxLjA0IDk1LjI5LTczLjE1aDk2LjI0di01MS4yMWgtOTYuMjRjLTMzLjA4LTQ4Ljc4LTY0Ljg0LTczLjE3LTk1LjI5LTczLjE3eiIvPjwvZGVmcz48dXNlIGZpbGw9IiMyZTJlMmUiIHhsaW5rOmhyZWY9IiNhIi8+PHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjYSIvPjx1c2UgZmlsbD0iI2RmNTY1NiIgeGxpbms6aHJlZj0iI2IiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNiIi8+PHVzZSBmaWxsPSIjZGY1NjU2IiB4bGluazpocmVmPSIjYyIvPjx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI2MiLz48L3N2Zz4='},
		'再生'	: {dat: 'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjBjMCAxNzYuNzIgMTQzLjI4IDMyMCAzMjAgMzIwczMyMC0xNDMuMjggMzIwLTMyMC0xNDMuMjgtMzIwLTMyMC0zMjAtMzIwIDE0My4yOC0zMjAgMzIwem0yNTguODMgMTExLjA1Yy0xLjI5Ljc5LTIuOTMuODMtNC4yNi4wNC0xLjI5LS43NC0yLjExLTIuMTItMi4xMS0zLjY3IDAtNy4xNiAwLTQyLjk3IDAtMTA3LjQzczAtMTAwLjI3IDAtMTA3LjQzYzAtMS41My44Mi0yLjkzIDIuMTEtMy42OCAxLjMzLS43NiAyLjk3LS43MiA0LjI2LjA0IDE4IDEwLjc1IDE2MiA5Ni43MSAxODAgMTA3LjQ2IDEuMjkuNzMgMi4wNSAyLjE0IDIuMDUgMy42MSAwIDEuNDktLjc2IDIuODgtMi4wNSAzLjYzLTM2IDIxLjQ5LTE2MiA5Ni42OS0xODAgMTA3LjQzeiIvPjwvZGVmcz48cGF0aCBkPSJtMTU0LjU3IDE3MC4xOWgzNDYuMTV2MzA3LjY5aC0zNDYuMTV6IiBmaWxsPSIjZmZmIi8+PHVzZSBmaWxsPSIjMmUyZTJlIiB4bGluazpocmVmPSIjYSIvPjx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI2EiLz48L3N2Zz4='},
		'一時停止'	: {dat:  'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjBjMCAxNzYuNzIgMTQzLjI4IDMyMCAzMjAgMzIwczMyMC0xNDMuMjggMzIwLTMyMC0xNDMuMjgtMzIwLTMyMC0zMjAtMzIwIDE0My4yOC0zMjAgMzIwem0yMDAgMTAwdi0yMDBoODB2MjAwem0xNjAgMHYtMjAwaDgwdjIwMHoiLz48L2RlZnM+PHBhdGggZD0ibTE0Ny40OSAxODAuNDFoMzUyLjR2MjgyLjY5aC0zNTIuNHoiIGZpbGw9IiNmZmYiLz48dXNlIGZpbGw9IiMyZTJlMmUiIHhsaW5rOmhyZWY9IiNhIi8+PHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjYSIvPjwvc3ZnPg=='},
		'注意'	: {ease: 'sn_HopIn', dat: 'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMzQzLjM0IDI5LjJjLTEwLjM3LTE3Ljk3LTM2LjMxLTE3Ljk3LTQ2LjY5IDAtMjkuMyA1MC43NS0yNjMuNyA0NTYuNzQtMjkzIDUwNy40OS0xMC4zNyAxNy45NyAyLjU5IDQwLjQ0IDIzLjM0IDQwLjQ0aDU4Ni4wMWMyMC43NSAwIDMzLjcyLTIyLjQ2IDIzLjM1LTQwLjQ0LTU4LjYtMTAxLjUtMjYzLjctNDU2Ljc0LTI5My4wMS01MDcuNDl6bS0yMy4zNCA0ODIuODNjLTE0LjUyIDAtMjYuMjktMi43MS0yNi4yOS02LjA2IDAtNC4yMSAwLTM3Ljg2IDAtNDIuMDcgMC0zLjM1IDExLjc3LTYuMDcgMjYuMjktNi4wN3MyNi4yOSAyLjcyIDI2LjI5IDYuMDd2NDIuMDdjLTcuODQgNC4wNC0xNi42MSA2LjA2LTI2LjI5IDYuMDZ6bTIxLjk5LTEwMy44NGMwIDUuNDMtOS44NSA5LjgzLTIxLjk5IDkuODMtMTIuMTUgMC0yMS45OS00LjQtMjEuOTktOS44MyAwLS4xMy4wNy0uMjUuMDgtLjM4LTEuMzctMTcuNTYtMTIuMy0xNTguMDYtMTMuNjctMTc1LjYyIDAtNS40MyAxNS45My05Ljg0IDM1LjU4LTkuODRzMzUuNTggNC40MSAzNS41OCA5Ljg0Yy0uOTEgMTEuNy01LjQ3IDcwLjI1LTEzLjY3IDE3NS42Mi4wNi4xNi4wOC4yOS4wOC4zOHoiLz48L2RlZnM+PHBhdGggZD0ibTI0MS4yOSAxOTEuNDRoMTQ1LjQ5djM1MS42NmgtMTQ1LjQ5eiIgZmlsbD0iI2ZmZiIvPjx1c2UgZmlsbD0iI2QyYmYzYSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNhIi8+PC9zdmc+'},
		'一歩進む'	: {ease: 'sn_BounceIn', dat: 'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjBjMCAxNzYuNzIgMTQzLjI4IDMyMCAzMjAgMzIwczMyMC0xNDMuMjggMzIwLTMyMC0xNDMuMjgtMzIwLTMyMC0zMjAtMzIwIDE0My4yOC0zMjAgMzIwem0zNzYuOTMgOTEuOTdjMC01My41MSAwLTgzLjI0IDAtODkuMTktLjE1LjE0LS4yNS4zNC0uNDQuNDUtMTYuMTEgOS42Mi0xNDQuOTUgODYuNTQtMTYxLjA2IDk2LjE1LTEuMTUuNjktMi42Mi43My0zLjgxLjAyLTEuMTUtLjY0LTEuODktMS44OS0xLjg5LTMuMjggMC02LjQxIDAtMzguNDQgMC05Ni4xMSAwLTU3LjY5IDAtODkuNzQgMC05Ni4xNSAwLTEuMzUuNzQtMi42MiAxLjg5LTMuMjkgMS4xOS0uNjggMi42Ni0uNjQgMy44MS4wNCAxNi4xMSA5LjYyIDE0NC45NSA4Ni41NCAxNjEuMDYgOTYuMTYuMTkuMS4yOS4zMS40NC40NSAwLTYuMTMgMC0zNi43NyAwLTkxLjkyaDUzLjMydjE4Ni42N3oiLz48L2RlZnM+PHBhdGggZD0ibTE0Ny40OSAxNTQuMmgzNTIuNHYzMDguOWgtMzUyLjR6IiBmaWxsPSIjZmZmIi8+PHVzZSBmaWxsPSIjMmUyZTJlIiB4bGluazpocmVmPSIjYSIvPjx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI2EiLz48L3N2Zz4='},
		'一歩戻る'	: {ease: 'sn_BounceIn', dat: 'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjBjMCAxNzYuNzIgMTQzLjI4IDMyMCAzMjAgMzIwczMyMC0xNDMuMjggMzIwLTMyMC0xNDMuMjgtMzIwLTMyMC0zMjAtMzIwIDE0My4yOC0zMjAgMzIwem00MzAuMjcgOTYuMTRjMCAxLjM1LS43NCAyLjYyLTEuODkgMy4yOC0xLjE5LjY5LTIuNjYuNjUtMy44MS0uMDMtMTYuMTEtOS42Mi0xNDQuOTUtODYuNTQtMTYxLjA1LTk2LjE2LS4yLS4xLS4yOS0uMzEtLjQ1LS40NXY5MS45MmgtNTMuMzJ2LTE4Ni42N2g1My4zMnY4OS4xOWMuMTYtLjE0LjI1LS4zNC40NS0uNDUgMTYuMS05LjYyIDE0NC45NC04Ni41NCAxNjEuMDUtOTYuMTYgMS4xNS0uNjggMi42Mi0uNzIgMy44MS0uMDEgMS4xNS42NCAxLjg5IDEuODkgMS44OSAzLjI4djk2LjExeiIvPjwvZGVmcz48cGF0aCBkPSJtMTQ3LjQ5IDE1NC4yaDM1Mi40djMwOC45aC0zNTIuNHoiIGZpbGw9IiNmZmYiLz48dXNlIGZpbGw9IiMyZTJlMmUiIHhsaW5rOmhyZWY9IiNhIi8+PHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjYSIvPjwvc3ZnPg=='},
		'ステップイン'	: {ease: 'sn_BounceIn', dat: 'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMTkuOTljMCAxNzYuNzQgMTQzLjI3IDMyMC4wMSAzMjAuMDEgMzIwLjAxIDE3Ni43MiAwIDMxOS45OS0xNDMuMjcgMzE5Ljk5LTMyMC4wMSAwLTE3Ni43Mi0xNDMuMjctMzE5Ljk5LTMxOS45OS0zMTkuOTktMTc2Ljc0IDAtMzIwLjAxIDE0My4yNy0zMjAuMDEgMzE5Ljk5em0xNTMuMDUtMjkuNzIgNTUuMTItNTUuMTMgMTExLjg0IDExMS44MiAxMTEuODItMTExLjgyIDU1LjEyIDU1LjEyLTE2Ni45NCAxNjYuOTd6Ii8+PC9kZWZzPjxwYXRoIGQ9Im0xNDcuNDkgMTU0LjJoMzUyLjR2MzA4LjloLTM1Mi40eiIgZmlsbD0iI2ZmZiIvPjx1c2UgZmlsbD0iIzJlMmUyZSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNhIi8+PC9zdmc+'},
		'ステップアウト'	: {ease: 'sn_BounceIn', dat: 'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjAuMDFjMCAxNzYuNzIgMTQzLjI3IDMxOS45OSAzMTkuOTkgMzE5Ljk5IDE3Ni43NCAwIDMyMC4wMS0xNDMuMjcgMzIwLjAxLTMxOS45OSAwLTE3Ni43NC0xNDMuMjctMzIwLjAxLTMyMC4wMS0zMjAuMDEtMTc2LjcyIDAtMzE5Ljk5IDE0My4yNy0zMTkuOTkgMzIwLjAxem0zMTkuOTktMjYuOTgtMTExLjgyIDExMS44My01NS4xMi01NS4xMyAxNjYuOTQtMTY2Ljk2IDE2Ni45NiAxNjYuOTYtNTUuMTIgNTUuMTN6Ii8+PC9kZWZzPjxwYXRoIGQ9Im0xNDcuNDkgMTU0LjJoMzUyLjR2MzA4LjloLTM1Mi40eiIgZmlsbD0iI2ZmZiIvPjx1c2UgZmlsbD0iIzJlMmUyZSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNhIi8+PC9zdmc+'},
	};

	pathBaseCnvSnPath4Dbg = '';

	protected fire: IFire;
	setFire(fire: IFire) {this.fire = fire}

	#aFncHook: IFncHook[]	= [];
	addHook(fnc: IFncHook) {this.#aFncHook.push(fnc)}
	callHook: IFncHook = (_type, _o)=> { /* empty */ };

	send2Dbg: IFncHook = (type, o)=> {
//console.log(`fn:SysBase.ts 新SND isBuf:${!(this.sk)} type:${type} o:${JSON.stringify(o)}`);
		this.#sk?.emit('data', type, o);
	}


	copyBMFolder = (_from: number, _to: number)=> { /* empty */ };
	eraseBMFolder = (_place: number)=> { /* empty */ };


	protected readonly	close			: ITag = ()=> false;
	protected readonly	_export			: ITag = ()=> false;
	protected readonly	_import			: ITag = ()=> false;
	protected readonly	navigate_to		: ITag = ()=> false;
	protected readonly	title			: ITag = hArg=> {
		const {text} = hArg;
		if (! text) throw '[title] textは必須です';

		this.#main_title = text;
		this.titleSub(this.#main_title + this.#info_title);

		return false;
	};
		#main_title	= '';
		protected titleSub(_txt: string) { /* empty */ }

	readonly	#tglFlscr: ITag = hArg=> {
		if (! hArg.key) {
			this.tglFlscr_sub()
			.catch((e: unknown)=> SysBase.tglFlscr_HdrErr(e));
			return false;
		}

		const key = hArg.key.toLowerCase();
		this.elc.add(document, EVNM_KEY, (e: KeyboardEvent)=> {
			const key2 = SysBase.modKey(e) + e.key.toLowerCase();
			if (key2 !== key) return;

			e.stopPropagation();
			this.tglFlscr_sub()
			.catch((e: unknown)=> SysBase.tglFlscr_HdrErr(e));
		}, {passive: true});

		return false;
	};
		static	tglFlscr_HdrErr(e: unknown) {
			if (e instanceof TypeError) {
				console.error('フルスクリーン化でエラーです。ブラウザ環境でキー入力きっかけでないと発生します');
			}
			console.error(`fn:SysBase.ts tglFlscr ${String(e)}`);
		}
		static	modKey(e: KeyboardEvent): string {
			return  (e.altKey ?e.key === 'Alt' ?'' :'alt+' :'')
			+	(e.ctrlKey ?e.key === 'Control' ?'' :'ctrl+' :'')
			+	(e.metaKey ?e.key === 'Meta' ?'' :'meta+' :'')
			+	(e.shiftKey ?e.key === 'Shift' ?'' :'shift+' :'')
		}
		protected	async	tglFlscr_sub() { /* empty */ }

	protected readonly	update_check	: ITag = ()=> false;
	protected readonly	window			: ITag = ()=> false;

	#info_title	= '';
	setTitleInfo(txt: string) {
		this.#info_title = txt;
		this.titleSub(this.#main_title + this.#info_title);
	}


	#plgDecAB: (ab: ArrayBuffer)=> Promise<PLUGIN_DECAB_RET> = ()=> Promise.resolve({ext_num: 0, ab: new ArrayBuffer(0)});

	dec = (_ext: string, tx: string)=> Promise.resolve(tx);
	async decAB(iab: ArrayBuffer): Promise<HTMLImageElement | HTMLVideoElement | ArrayBuffer> {
		const {ext_num, ab} = await this.#plgDecAB(iab);
		const fm = this.#hN2Ext[ext_num];
		return fm?.fnc ?await fm.fnc(ab) :ab;
	}
	readonly #hN2Ext: {[id: number]: {
		ext	: string;
		fnc	: (ab: ArrayBuffer)=> Promise<HTMLImageElement | HTMLVideoElement | ArrayBuffer>;	// サウンドファイル用
	}} = {
		1	: {ext: 'jpeg', fnc: ab=> this.#genImage(ab, 'image/jpeg')},
		2	: {ext: 'png', fnc: ab=> this.#genImage(ab, 'image/png')},
		3	: {ext: 'svg', fnc: ab=> this.#genImage(ab, 'image/svg+xml')},
		4	: {ext: 'webp', fnc: ab=> this.#genImage(ab, 'image/webp')},
	//	10	: {ext: 'mp3', fnc: async ab=> ab},
	//	11	: {ext: 'm4a', fnc: async ab=> ab},
	//	12	: {ext: 'ogg', fnc: async ab=> ab},
	//	13	: {ext: 'aac', fnc: async ab=> ab},
	//	14	: {ext: 'flac', fnc: async ab=> ab},
	//	15	: {ext: 'wav', fnc: async ab=> ab},
		20	: {ext: 'mp4', fnc: ab=> this.#genVideo(ab, 'video/mp4')},
		21	: {ext: 'webm', fnc: ab=> this.#genVideo(ab, 'video/webm')},
		22	: {ext: 'ogv', fnc: ab=> this.#genVideo(ab, 'video/ogv')},
	};
	#genImage = (ab: ArrayBuffer, type: string): Promise<HTMLImageElement> => new Promise((rs, rj)=> {
		const bl = new Blob([ab], {type});
		const img = new Image;
		img.onload = ()=> rs(img);
		img.onerror = e=> rj(new Error(e instanceof Event ?e.type :e));
		img.src = URL.createObjectURL(bl);
	});
	#genVideo = (ab: ArrayBuffer, type: string): Promise<HTMLVideoElement> => new Promise((rs, rj)=> {
		const bl = new Blob([ab], {type});
		const v = document.createElement('video');
	//	this.elc.add(v, 'loadedmetadata', ()=> console.log(`loadedmetadata duration:${v.duration}`));
		this.elc.add(v, 'error', ()=> rj(new Error(v.error?.message ?? '')));
		this.elc.add(v, 'canplay', ()=> rs(v));
		v.src = URL.createObjectURL(bl);
	});

	// eslint-disable-next-line @typescript-eslint/require-await
	protected enc = async (tx: string)=> tx;
	protected stk = ()=> '';
	hash = (_str: string)=> '';

	readonly	isApp: boolean = false;
	protected $path_downloads	= '';
	get path_downloads() {return this.$path_downloads}
	protected $path_userdata	= '';
	get path_userdata() {return this.$path_userdata}

	capturePage(_path: string, _w: number, _h: number, _fnc: ()=> void) { /* empty */ }
	async savePic(_path: string, _data_url: string) { /* empty */ }
	async ensureFile(_path: string) { /* empty */ }
	async appendFile(_path: string, _data: string) { /* empty */ }
	async outputFile(_path: string, _data: string) { /* empty */ }

}
