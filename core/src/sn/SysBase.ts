/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2021 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {IConfig, IHTag, ITag, IVariable, IFn2Path, ISysBase, IData4Vari, HPlugin, HSysBaseArg, ILayerFactory, IMain, IFire, IFncHook} from './CmnInterface';
import {CmnLib} from './CmnLib';

import {Application, DisplayObject, RenderTexture} from 'pixi.js';
import * as io from 'socket.io-client';

export class SysBase implements ISysBase {
	hFactoryCls: {[name: string]: ILayerFactory}	= {};

	constructor(protected readonly hPlg: HPlugin = {}, protected readonly arg: HSysBaseArg) {
		const fncPre = hPlg.snsys_pre;	// prj・path.json_ の為に先読み
		fncPre?.init({
			addTag: ()=> {},
			addLayCls: ()=> {},
			searchPath: ()=> '',
			getVal: ()=> {return {}},
			resume: ()=> {},
			render: ()=> {},
			setPre: fnc=> this.pre = fnc,
			setEnc: fnc=> this.enc = fnc,
			getStK: fnc=> this.stk = fnc,
			getHash: fnc=> this.hash = fnc,
		});
	}
	get cur() {return this.arg.cur}
	get crypto() {return this.arg.crypto}
	fetch = (url: string)=> fetch(url);

	resolution	= 1;
	reso4frame	= 1;

	protected	cfg	: IConfig;
	loadPathAndVal(_hPathFn2Exts: IFn2Path, _fncLoaded: ()=> void, cfg: IConfig) {this.cfg = cfg;}

	protected	readonly	data	= {sys:{}, mark:{}, kidoku:{}};
	initVal(_data: IData4Vari, _hTmp: any, _comp: (data: IData4Vari)=> void) {}
	flush() {}


	protected async run() {}


	protected	val		: IVariable;
	protected	appPixi	: Application;
	init(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain) {
		this.val = val;
		this.appPixi = appPixi;
		let mes = '';
		try {
			this.val.setSys(this);

			//l = String(this.val.getVal('save:const.sn.sLog'));
			mes = 'sys';	// tst sys
			mes += Number(this.val.getVal('sys:TextLayer.Back.Alpha', 1));
			mes = 'kidoku';	// tst kidoku
			this.val.saveKidoku();
		//	mes = 'save';	// tst save
		//	mes += String(this.val.getVal('save:sn.doRecLog', 'false'));
		} catch (e) {
			console.error(`セーブデータ（${mes}）が壊れています。一度クリアする必要があります %o`, e);
		}

		this.hFactoryCls = {};	// ギャラリーなどで何度も初期化される対策
		for (const nm in this.hPlg) this.hPlg[nm].init({	// プラグイン初期化
			addTag: (name: string, tag_fnc: ITag)=> {
				if (hTag[name]) throw `すでに定義済みのタグ[${name}]です`;
				hTag[name] = tag_fnc;
			},
			addLayCls: (cls: string, fnc: ILayerFactory)=> {
				if (this.hFactoryCls[cls]) throw `すでに定義済みのレイヤcls【${cls}】です`;
				this.hFactoryCls[cls] = fnc;
			},
			searchPath: (fn, extptn = '')=>	this.cfg.searchPath(fn, extptn),
			getVal: val.getVal,
			resume: ()=> main.resume(),
			render: (dsp: DisplayObject, renTx: RenderTexture, clear = false)=> this.appPixi.renderer.render(dsp, renTx, clear),
			setPre: fnc=> this.pre = fnc,
			setEnc: fnc=> this.enc = fnc,
			getStK: fnc=> this.stk = fnc,
			getHash: fnc=> this.hash = fnc,
		});

		//	システム
		hTag.close			= o=> this.close(o);	// アプリの終了
		hTag.export			= o=> this._export(o);	// プレイデータをエクスポート
		hTag.import			= o=> this._import(o);	// プレイデータをインポート

	//	hTag.loadplugin		// LayerMng.ts内で定義	// cssの読み込み
//		hTag.mouse			= o=> this.mouse(o);	// マウスの設定
		hTag.navigate_to	= o=> this.navigate_to(o);	// ＵＲＬを開く
//		hTag.set_focus		// LayerMng.ts内で定義	// フォーカス移動
	//	hTag.snapshot		// LayerMng.ts内で定義	// スナップショット
		hTag.title			= o=> this.title(o);	// タイトル指定
		hTag.toggle_full_screen = o=> this.tgl_full_scr(o);	// 全画面状態切替
//		hTag.unzip			= o=> this.unzip(o);	// ネット素材取得
		hTag.update_check	= o=> this.update_check(o);	// 更新チェック
		hTag.window			= o=> this.window(o);	// アプリウインドウ設定

		val.setVal_Nochk('tmp', 'const.sn.isApp', this.isApp());
		val.setVal_Nochk('tmp', 'const.sn.isDbg', this.isDbg());
		val.setVal_Nochk('tmp', 'const.sn.isPackaged', this.isPackaged());

		val.setVal_Nochk('sys', SysBase.VALNM_CFG_NS, this.cfg.oCfg.save_ns);
			// [import]時のチェック用
		val.flush();

		if (this.isDbg()) this.attach_debug(main);
	}
	protected	static	readonly	VALNM_CFG_NS = 'const.sn.cfg.ns';


	// デバッガ接続
	private	attach_debug(main: IMain) {
		this.attach_debug = ()=> {};

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
		document.getElementsByTagName('head')[0].appendChild(gs);


		this.addHook((type, o)=> this.hHook[type]?.(o));

		this.sk = io(`http://localhost:${this.extPort}`);
		this.sk
		.on('data', (type: string, o: any)=> {
//console.log(`fn:SysBase.ts RSV dbg -> sn type:${type} o:${JSON.stringify(o).slice(0, 150)}`);
			this.callHook(type, o);
		})
		.on('disconnect', ()=> main.setLoop(true));
			// reasonという引数で理由が分かる
			// https://socket.io/docs/v3/client-socket-instance/
	}
	protected	extPort = 3776;

	end() {
		this.sk?.disconnect();
		this.sk = null;
	}
	private	sk: SocketIOClient.Socket | null = null;
	private	readonly	hHook	: {[type: string]: (o: any)=> void}	= {
		'auth'			: o=> {
			if (o.t !== this.cfg.oCfg.debuger_token) {this.end(); return;}

			this.aSkBuf.forEach(v=> this.sendDbg(v.type, v.o));
			this.aSkBuf = [];

			this.toast('接続');
		},
		'continue'		: ()=> this.toast('再生'),
		'disconnect'	: ()=> this.toast('切断'),
		'restart'		: o=> {
			this.sendDbg(o?.ri ?? '', {});
			this.end();
			// これ以前の this は旧Main。以後は this必須
			// 以後は新Mainによる本メソッドinit()→launch接続待ち
			this.run();
		},
		'pause'			: ()=> this.toast('一時停止'),
		'stopOnEntry'	: ()=> this.toast('一時停止'),
		'stopOnDataBreakpoint'	: ()=> this.toast('注意'),
		'stopOnBreakpoint'		: ()=> this.toast('注意'),
		'stopOnStep'			: ()=> this.toast('一歩進む'),
		'stopOnStepIn'			: ()=> this.toast('ステップイン'),
		'stopOnStepOut'			: ()=> this.toast('ステップアウト'),
		'stopOnBackstep'		: ()=> this.toast('一歩戻る'),
	};
	protected toast(nm: string) {
		const cvs = document.getElementById(CmnLib.SN_ID) as HTMLCanvasElement;
		if (! cvs) return;

		const p = cvs.parentNode!;
		p.querySelectorAll('.sn_BounceIn, .sn_HopIn').forEach(v=> p.removeChild(v));

		const img = document.createElement('img');
		const td = SysBase.hToastDat[nm];
		img.src = `data:image/svg+xml;base64,${td.dat}`;
		const size = Math.min(CmnLib.stageW, CmnLib.stageH) /4;
		img.width = img.height = size;
		img.style.cssText =
`position: absolute;
left: ${(CmnLib.stageW -size) /2 +size *(td.dx ?? 0)}px;
top: ${(CmnLib.stageH -size) /2 +size *(td.dy ?? 0)}px;`;
		img.classList.add('sn_toast', td.ease ?? 'sn_BounceInOut');
		if (! td.ease) img.addEventListener('animationend', ()=> p.removeChild(img), {once: true, passive: true});
		p.insertBefore(img, cvs);
	}
	private	static	readonly	hToastDat
	: {[nm: string] :{dat: string, dx?: number, dy?: number, ease?: string}}	= {	// Thanks ICOOON MONO https://icooon-mono.com/ 、 https://vectr.com/ で 640x640化、ImageOptim経由、Base64エンコーダー https://lab.syncer.jp/Tool/Base64-encode/ 
		'接続'	: {dx: -1, dat: 'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtNjQwIDMyMGMwIDE3Ni43My0xNDMuMjcgMzIwLTMyMCAzMjBzLTMyMC0xNDMuMjctMzIwLTMyMCAxNDMuMjctMzIwIDMyMC0zMjAgMzIwIDE0My4yNyAzMjAgMzIweiIvPjxwYXRoIGlkPSJiIiBkPSJtMCAyOTJ2NTUuODhoMTI3LjEzYzEyLjM3IDQ2IDU0LjEyIDc5Ljg3IDEwNCA3OS44N2g3Ny44N3YtMjE1LjYyYy00Ni43MyAwLTcyLjY4IDAtNzcuODggMC00OS43NCAwLTkxLjYyIDMzLjg3LTEwMy45OSA3OS44Ny0xNi45NSAwLTU5LjMzIDAtMTI3LjEzIDB6Ii8+PHBhdGggaWQ9ImMiIGQ9Im01MTIuODggMjkyYy0xMi4zOC00Ni01NC4xMy03OS44Ny0xMDQtNzkuODctNS4yMSAwLTMxLjIxIDAtNzggMHYyMTUuNzRoNzcuODdjNDkuODggMCA5MS43NS0zMy44NyAxMDQtNzkuODdoMTI3LjI1di01NmMtNzYuMjcgMC0xMTguNjUgMC0xMjcuMTIgMHoiLz48L2RlZnM+PHVzZSBmaWxsPSIjMmUyZTJlIiB4bGluazpocmVmPSIjYSIvPjx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIGZpbGw9IiMzYWFiZDIiIHhsaW5rOmhyZWY9IiNiIi8+PHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjYiIvPjx1c2UgZmlsbD0iIzNhYWJkMiIgeGxpbms6aHJlZj0iI2MiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNjIi8+PC9zdmc+'},
		'切断'	: {dat: 'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtNjQwIDMyMGMwIDE3Ni43My0xNDMuMjcgMzIwLTMyMCAzMjBzLTMyMC0xNDMuMjctMzIwLTMyMCAxNDMuMjctMzIwIDMyMC0zMjAgMzIwIDE0My4yNyAzMjAgMzIweiIvPjxwYXRoIGlkPSJiIiBkPSJtMTkxLjUzIDIyMS4yNGMtNDUuNjggMC04NC4wMSAzMS4wNC05NS4zIDczLjE2LTYuNDEgMC0zOC40OSAwLTk2LjIzIDB2NTEuMjFoOTYuMjNjMTEuMyA0Mi4xMSA0OS42MyA3My4xNiA5NS4zIDczLjE2aDcxLjMzdi00OC4yNGg1My43OHYtMTAxLjA1aC01My43OHYtNDguMjRjLTQyLjggMC02Ni41NyAwLTcxLjMzIDB6Ii8+PHBhdGggaWQ9ImMiIGQ9Im00NDguNDcgMjIxLjIzYy00Ljc2IDAtMjguNTMgMC03MS4zMyAwdjE5Ny41M2g3MS4zM2M0NS42OCAwIDgzLjk5LTMxLjA0IDk1LjI5LTczLjE1aDk2LjI0di01MS4yMWgtOTYuMjRjLTMzLjA4LTQ4Ljc4LTY0Ljg0LTczLjE3LTk1LjI5LTczLjE3eiIvPjwvZGVmcz48dXNlIGZpbGw9IiMyZTJlMmUiIHhsaW5rOmhyZWY9IiNhIi8+PHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjYSIvPjx1c2UgZmlsbD0iI2RmNTY1NiIgeGxpbms6aHJlZj0iI2IiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNiIi8+PHVzZSBmaWxsPSIjZGY1NjU2IiB4bGluazpocmVmPSIjYyIvPjx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI2MiLz48L3N2Zz4='},
		'再生'	: {dat: 'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjBjMCAxNzYuNzIgMTQzLjI4IDMyMCAzMjAgMzIwczMyMC0xNDMuMjggMzIwLTMyMC0xNDMuMjgtMzIwLTMyMC0zMjAtMzIwIDE0My4yOC0zMjAgMzIwem0yNTguODMgMTExLjA1Yy0xLjI5Ljc5LTIuOTMuODMtNC4yNi4wNC0xLjI5LS43NC0yLjExLTIuMTItMi4xMS0zLjY3IDAtNy4xNiAwLTQyLjk3IDAtMTA3LjQzczAtMTAwLjI3IDAtMTA3LjQzYzAtMS41My44Mi0yLjkzIDIuMTEtMy42OCAxLjMzLS43NiAyLjk3LS43MiA0LjI2LjA0IDE4IDEwLjc1IDE2MiA5Ni43MSAxODAgMTA3LjQ2IDEuMjkuNzMgMi4wNSAyLjE0IDIuMDUgMy42MSAwIDEuNDktLjc2IDIuODgtMi4wNSAzLjYzLTM2IDIxLjQ5LTE2MiA5Ni42OS0xODAgMTA3LjQzeiIvPjwvZGVmcz48cGF0aCBkPSJtMTU0LjU3IDE3MC4xOWgzNDYuMTV2MzA3LjY5aC0zNDYuMTV6IiBmaWxsPSIjZmZmIi8+PHVzZSBmaWxsPSIjMmUyZTJlIiB4bGluazpocmVmPSIjYSIvPjx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI2EiLz48L3N2Zz4='},
		'一時停止'	: {ease: 'sn_BounceIn', dat:  'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjBjMCAxNzYuNzIgMTQzLjI4IDMyMCAzMjAgMzIwczMyMC0xNDMuMjggMzIwLTMyMC0xNDMuMjgtMzIwLTMyMC0zMjAtMzIwIDE0My4yOC0zMjAgMzIwem0yMDAgMTAwdi0yMDBoODB2MjAwem0xNjAgMHYtMjAwaDgwdjIwMHoiLz48L2RlZnM+PHBhdGggZD0ibTE0Ny40OSAxODAuNDFoMzUyLjR2MjgyLjY5aC0zNTIuNHoiIGZpbGw9IiNmZmYiLz48dXNlIGZpbGw9IiMyZTJlMmUiIHhsaW5rOmhyZWY9IiNhIi8+PHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjYSIvPjwvc3ZnPg=='},
		'注意'	: {ease: 'sn_HopIn', dat: 'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMzQzLjM0IDI5LjJjLTEwLjM3LTE3Ljk3LTM2LjMxLTE3Ljk3LTQ2LjY5IDAtMjkuMyA1MC43NS0yNjMuNyA0NTYuNzQtMjkzIDUwNy40OS0xMC4zNyAxNy45NyAyLjU5IDQwLjQ0IDIzLjM0IDQwLjQ0aDU4Ni4wMWMyMC43NSAwIDMzLjcyLTIyLjQ2IDIzLjM1LTQwLjQ0LTU4LjYtMTAxLjUtMjYzLjctNDU2Ljc0LTI5My4wMS01MDcuNDl6bS0yMy4zNCA0ODIuODNjLTE0LjUyIDAtMjYuMjktMi43MS0yNi4yOS02LjA2IDAtNC4yMSAwLTM3Ljg2IDAtNDIuMDcgMC0zLjM1IDExLjc3LTYuMDcgMjYuMjktNi4wN3MyNi4yOSAyLjcyIDI2LjI5IDYuMDd2NDIuMDdjLTcuODQgNC4wNC0xNi42MSA2LjA2LTI2LjI5IDYuMDZ6bTIxLjk5LTEwMy44NGMwIDUuNDMtOS44NSA5LjgzLTIxLjk5IDkuODMtMTIuMTUgMC0yMS45OS00LjQtMjEuOTktOS44MyAwLS4xMy4wNy0uMjUuMDgtLjM4LTEuMzctMTcuNTYtMTIuMy0xNTguMDYtMTMuNjctMTc1LjYyIDAtNS40MyAxNS45My05Ljg0IDM1LjU4LTkuODRzMzUuNTggNC40MSAzNS41OCA5Ljg0Yy0uOTEgMTEuNy01LjQ3IDcwLjI1LTEzLjY3IDE3NS42Mi4wNi4xNi4wOC4yOS4wOC4zOHoiLz48L2RlZnM+PHBhdGggZD0ibTI0MS4yOSAxOTEuNDRoMTQ1LjQ5djM1MS42NmgtMTQ1LjQ5eiIgZmlsbD0iI2ZmZiIvPjx1c2UgZmlsbD0iI2QyYmYzYSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNhIi8+PC9zdmc+'},
		'一歩進む'	: {ease: 'sn_BounceIn', dat: 'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjBjMCAxNzYuNzIgMTQzLjI4IDMyMCAzMjAgMzIwczMyMC0xNDMuMjggMzIwLTMyMC0xNDMuMjgtMzIwLTMyMC0zMjAtMzIwIDE0My4yOC0zMjAgMzIwem0zNzYuOTMgOTEuOTdjMC01My41MSAwLTgzLjI0IDAtODkuMTktLjE1LjE0LS4yNS4zNC0uNDQuNDUtMTYuMTEgOS42Mi0xNDQuOTUgODYuNTQtMTYxLjA2IDk2LjE1LTEuMTUuNjktMi42Mi43My0zLjgxLjAyLTEuMTUtLjY0LTEuODktMS44OS0xLjg5LTMuMjggMC02LjQxIDAtMzguNDQgMC05Ni4xMSAwLTU3LjY5IDAtODkuNzQgMC05Ni4xNSAwLTEuMzUuNzQtMi42MiAxLjg5LTMuMjkgMS4xOS0uNjggMi42Ni0uNjQgMy44MS4wNCAxNi4xMSA5LjYyIDE0NC45NSA4Ni41NCAxNjEuMDYgOTYuMTYuMTkuMS4yOS4zMS40NC40NSAwLTYuMTMgMC0zNi43NyAwLTkxLjkyaDUzLjMydjE4Ni42N3oiLz48L2RlZnM+PHBhdGggZD0ibTE0Ny40OSAxNTQuMmgzNTIuNHYzMDguOWgtMzUyLjR6IiBmaWxsPSIjZmZmIi8+PHVzZSBmaWxsPSIjMmUyZTJlIiB4bGluazpocmVmPSIjYSIvPjx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI2EiLz48L3N2Zz4='},
		'一歩戻る'	: {ease: 'sn_BounceIn', dat: 'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjBjMCAxNzYuNzIgMTQzLjI4IDMyMCAzMjAgMzIwczMyMC0xNDMuMjggMzIwLTMyMC0xNDMuMjgtMzIwLTMyMC0zMjAtMzIwIDE0My4yOC0zMjAgMzIwem00MzAuMjcgOTYuMTRjMCAxLjM1LS43NCAyLjYyLTEuODkgMy4yOC0xLjE5LjY5LTIuNjYuNjUtMy44MS0uMDMtMTYuMTEtOS42Mi0xNDQuOTUtODYuNTQtMTYxLjA1LTk2LjE2LS4yLS4xLS4yOS0uMzEtLjQ1LS40NXY5MS45MmgtNTMuMzJ2LTE4Ni42N2g1My4zMnY4OS4xOWMuMTYtLjE0LjI1LS4zNC40NS0uNDUgMTYuMS05LjYyIDE0NC45NC04Ni41NCAxNjEuMDUtOTYuMTYgMS4xNS0uNjggMi42Mi0uNzIgMy44MS0uMDEgMS4xNS42NCAxLjg5IDEuODkgMS44OSAzLjI4djk2LjExeiIvPjwvZGVmcz48cGF0aCBkPSJtMTQ3LjQ5IDE1NC4yaDM1Mi40djMwOC45aC0zNTIuNHoiIGZpbGw9IiNmZmYiLz48dXNlIGZpbGw9IiMyZTJlMmUiIHhsaW5rOmhyZWY9IiNhIi8+PHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjYSIvPjwvc3ZnPg=='},
		'ステップイン'	: {ease: 'sn_BounceIn', dat: 'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMTkuOTljMCAxNzYuNzQgMTQzLjI3IDMyMC4wMSAzMjAuMDEgMzIwLjAxIDE3Ni43MiAwIDMxOS45OS0xNDMuMjcgMzE5Ljk5LTMyMC4wMSAwLTE3Ni43Mi0xNDMuMjctMzE5Ljk5LTMxOS45OS0zMTkuOTktMTc2Ljc0IDAtMzIwLjAxIDE0My4yNy0zMjAuMDEgMzE5Ljk5em0xNTMuMDUtMjkuNzIgNTUuMTItNTUuMTMgMTExLjg0IDExMS44MiAxMTEuODItMTExLjgyIDU1LjEyIDU1LjEyLTE2Ni45NCAxNjYuOTd6Ii8+PC9kZWZzPjxwYXRoIGQ9Im0xNDcuNDkgMTU0LjJoMzUyLjR2MzA4LjloLTM1Mi40eiIgZmlsbD0iI2ZmZiIvPjx1c2UgZmlsbD0iIzJlMmUyZSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNhIi8+PC9zdmc+'},
		'ステップアウト'	: {ease: 'sn_BounceIn', dat: 'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjAuMDFjMCAxNzYuNzIgMTQzLjI3IDMxOS45OSAzMTkuOTkgMzE5Ljk5IDE3Ni43NCAwIDMyMC4wMS0xNDMuMjcgMzIwLjAxLTMxOS45OSAwLTE3Ni43NC0xNDMuMjctMzIwLjAxLTMyMC4wMS0zMjAuMDEtMTc2LjcyIDAtMzE5Ljk5IDE0My4yNy0zMTkuOTkgMzIwLjAxem0zMTkuOTktMjYuOTgtMTExLjgyIDExMS44My01NS4xMi01NS4xMyAxNjYuOTQtMTY2Ljk2IDE2Ni45NiAxNjYuOTYtNTUuMTIgNTUuMTN6Ii8+PC9kZWZzPjxwYXRoIGQ9Im0xNDcuNDkgMTU0LjJoMzUyLjR2MzA4LjloLTM1Mi40eiIgZmlsbD0iI2ZmZiIvPjx1c2UgZmlsbD0iIzJlMmUyZSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNhIi8+PC9zdmc+'},
	};

	pathBaseCnvSnPath4Dbg = '';

	protected fire: IFire;
	setFire(fire: IFire) {this.fire = fire}

	private	aFncHook: IFncHook[]	= [];
	addHook(fnc: IFncHook) {this.aFncHook.push(fnc);}
	callHook: IFncHook = (type, o)=> this.aFncHook.forEach(fnc=> fnc(type, o));

	sendDbg: IFncHook = (type, o)=> {
//console.log(`fn:SysBase.ts 新SND isBuf:${!(this.sk)} type:${type} o:${JSON.stringify(o)}`);
		if (this.sk) this.sk.emit('data', type, o);
		else this.aSkBuf.push({type: type, o: o});
	}
	private	aSkBuf	: {type: string, o: any}[]	= [];


	copyBMFolder = (_from: number, _to: number)=> {};
	eraseBMFolder = (_place: number)=> {};


	protected readonly	close			: ITag = ()=> false;
	protected readonly	_export			: ITag = ()=> false;
	protected readonly	_import			: ITag = ()=> false;
	protected readonly	navigate_to		: ITag = ()=> false;
	protected readonly	title			: ITag = hArg=> {
		const text = hArg.text;
		if (! text) throw '[title] textは必須です';

		this.main_title = text;
		this.titleSub(this.main_title + this.info_title);

		return false;
	};
		private main_title	= '';
		protected titleSub(_txt: string) {}
	protected			tgl_full_scr	: ITag = ()=> false;
	protected readonly	update_check	: ITag = ()=> false;
	protected readonly	window			: ITag = ()=> false;

	private info_title	= '';
	setTitleInfo(txt: string) {
		this.info_title = txt;
		this.titleSub(this.main_title + this.info_title);
	}

	pre = async (_ext: string, data: string)=> data;
	protected enc = async (data: string)=> data;
	protected stk = ()=> '';
	hash = (_data: string)=> '';

	protected readonly	isApp = ()=> false;
	protected readonly	isPackaged = ()=> false;
	isDbg = ()=> false;
	protected $path_downloads	= '';
	get path_downloads() {return this.$path_downloads}
	protected $path_userdata= '';
	get path_userdata() {return this.$path_userdata}

	readonly	savePic = (_fn: string, _data_url: string)=> {};
	readonly	appendFile = (_path: string, _data: any, _callback: (err: NodeJS.ErrnoException)=> void)=> {};
	readonly	ensureFileSync = (_path: string)=> {};

	// 既存のiframeのサイズと表示位置を調整
	ofsLeft4frm	= 0;
	ofsTop4frm	= 0;
	protected	resizeFrames() {
		const cr = this.appPixi.view.getBoundingClientRect();
		const a = document.getElementsByTagName('iframe');
		const len = a.length;
		for (let i=0; i<len; ++i) {
			const it = a[i];
			const frmnm = `const.sn.frm.${it.id}`;
			it.style.left = this.ofsLeft4frm +cr.left
				+ Number(this.val.getVal(`tmp:${frmnm}.x`)) *this.reso4frame
				+'px';
			it.style.top  = this.ofsTop4frm +cr.top
				+ Number(this.val.getVal(`tmp:${frmnm}.y`)) *this.reso4frame
				+'px';
			it.width  = String(Number(this.val.getVal(`tmp:${frmnm}.width`))
				*this.reso4frame);
			it.height = String(Number(this.val.getVal(`tmp:${frmnm}.height`))
				*this.reso4frame);
		}
	}

}
