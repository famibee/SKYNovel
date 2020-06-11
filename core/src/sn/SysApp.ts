/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {SysNode} from "./SysNode";
import {SysBase} from "./SysBase";
import {CmnLib, getDateStr, argChk_Boolean, argChk_Num} from './CmnLib';
import {ITag, IHTag, IVariable, IData4Vari, IMain, IFncHook} from './CmnInterface';
import {Main} from './Main';
import {Application} from 'pixi.js';

const {remote, shell, ipcRenderer} = require('electron');
const Store = require('electron-store');

const {Readable} = require('stream');
const {createWriteStream, removeSync, ensureDirSync, createReadStream, readFileSync, readFile, existsSync, copySync} = require('fs-extra');
const crypto = require('crypto');
const tar = require('tar-fs');
import {createServer, createConnection} from 'net';

export class SysApp extends SysNode {
	constructor(hPlg = {}, arg = {cur: 'prj/', crypto: false, dip: ''}) {
		super(hPlg, {...arg, cur: remote.app.getAppPath().replace(/\\/g, '/') + (remote.app.isPackaged ?'/doc/' :'/')+ arg.cur});

		globalThis.addEventListener('DOMContentLoaded', ()=>this.run(), {once: true, passive: true});
		ipcRenderer.on('log', (e: any, arg: any)=> console.log(`[main log] e:%o arg:%o`, e, arg));

		if (this.isDbg()) {
			const gs = document.createElement('style');
			gs.type = 'text/css';
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
		}
	}
	protected 			$path_userdata	: string;
	protected readonly	$path_downloads	= remote.app.getPath('downloads').replace(/\\/g, '/') +'/';

	protected readonly	normalize = (src: string, form: string)=> src.normalize(form);

	initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari)=> void) {
		this.$path_userdata	= this.isDbg()
			? this.cur.slice(0, -8) +'.vscode/'	// /doc/prj/ → /
			: remote.app.getPath('userData').replace(/\\/g, '/') +'/';
		const st = new Store({
			cwd: this.$path_userdata +'storage',
			name: this.arg.crypto ?'data_' :'data',
			encryptionKey: this.arg.crypto ?this.stk() :undefined,
		});
		this.flush = ()=> st.store = this.data;

/*
Uncaught Error: ENOENT: no such file or directory, open
'/Users/ugai/Library/Application Support/hatsune_tst/777/pic.jpg'
	hatsune_tst直下ではマズそう。
	【[copybookmark][erasebookmark]は自動でフォルダも扱う。中身にタッチしない】
	という機能は、【hatsune_tst/bookmark/〜】下に限定する？

	【※fnを「userdata:/」で始まるファイル名にするとセーブデータと同じフォルダに保存します】
	と書いたし、
	this.$path_userdata はこのままで、
	「userdata:/」 = this.$path_userdata + 'storage/' かなと。


*/


		if (hTmp['const.sn.isFirstBoot'] = (st.size === 0)) {
			// データがない（初回起動）場合の処理
			this.data.sys = data.sys;
			this.data.mark = data.mark;
			this.data.kidoku = data.kidoku;
			this.flush();	// 初期化なのでここのみ必要
		}
		else {
			// データがある場合の処理
			this.data.sys = st.store.sys;
			this.data.mark = st.store.mark;
			this.data.kidoku = st.store.kidoku;
		}
		comp(this.data);

		// システム情報
		hTmp['const.sn.isDebugger'] = false;
			// システムがデバッグ用の特別なバージョンか
			// AIRNovel の const.flash.system.Capabilities.isDebugger
		hTmp['const.sn.screenResolutionX'] = this.dsp.size.width;
			// 画面の最大水平解像度
		hTmp['const.sn.screenResolutionY'] = this.dsp.size.height;
			// 画面の最大垂直解像度
			// AIRNovel の const.flash.system.Capabilities.screenResolutionX、Y
			// 上のメニューバーは含んでいない（たぶん an も）。含むのは workAreaSize

		this.val.defTmp('const.sn.displayState', ()=> this.win.isSimpleFullScreen());

		globalThis.addEventListener('resize', ()=> {
			// NOTE: 2019/07/14 Windowsでこのように遅らせないと正しい縦幅にならない
			this.window((hTmp['const.sn.isFirstBoot']) ?{centering: true} :{});
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
		if (this.posMovingWin[0] !== p[0] || this.posMovingWin[1] !== p[1]) {
			this.posMovingWin = p;
			setTimeout(()=> this.delayWinPos(), 500);
			return;
		}
		this.window({x: p[0], y: p[1]});
		this.isMovingWin = false;
	}
	private readonly	dsp	= remote.screen.getPrimaryDisplay();


	private main: Main;
	private async run() {
		if (this.main) {
			const ms_late = 10;	// NOTE: リソース解放待ち用・魔法数字
			this.main.destroy(ms_late);
			await new Promise(r=> setTimeout(r, ms_late));
		}

		this.main = new Main(this);
	}


	private readonly	win	= remote.getCurrentWindow();
	private readonly	wc	= this.win.webContents;
	init(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): void {
		super.init(hTag, appPixi, val, main);

		if (this.cfg.oCfg.debug.devtool) this.wc.openDevTools();
		else this.wc.on('devtools-opened', ()=> {
			console.error(`DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。`);
			main.destroy();
		});
		this.win.setContentSize(CmnLib.stageW, CmnLib.stageH);

		if (this.isDbg()) {
			this.addHook((type: string, o: any)=> {
//console.log(`fn:SysApp.ts line:162 hook type:${type}`);
				switch (type) {	// 接続
					case 'continue':	this.toast('再生');	break;
					case 'disconnect':	this.toast('切断');	break;
					case 'restart':	this.sendDbg(o?.ri, {}); this.endSkt();
						// これ以前の this は旧Main。以後は this必須
						// 以後は新Mainによる本メソッドinit()→launch接続待ち
						this.run();	break;
					case 'attach':
					case 'pause':
					case 'stopOnEntry':	this.toast('一時停止');	break;
					case 'stopOnDataBreakpoint':
					case 'stopOnBreakpoint': this.toast('注意');	break;
					case 'stopOnStep': this.toast('一歩進む');	break;
					case 'stopOnStepIn': this.toast('ステップイン');	break;
					case 'stopOnStepOut': this.toast('ステップアウト');	break;
					case 'stopOnBackstep': this.toast('一歩戻る');	break;
				}
			});

			const UNIX_SOCK = '.vscode/skynovel.sock';	// UNIXドメインソケット
			try {removeSync(UNIX_SOCK);} catch {}
				// ソケットファイルを削除（存在するとlistenできない）
			const srv = createServer(skt=> {// launchサーバーはMainごとに生成
				srv.close();	// 最初の接続のみ
				skt.on('data', b=> {
					const s = b.toString();
					if (s.charAt(0) !== '\x1f') return;

					s.slice(1).split('\x1f').forEach(f=> {
						const o = JSON.parse(f);
						this.callHook(o.type, o);
					});
				})
				.on('error', err=> {console.error(err.message); this.endSkt();})
				// endイベントは接続がきれいにクローズされないと発火しないらしい
				.on('close', ()=> this.sendDbg = ()=> {});
				this.sendDbg = (type, o)=> skt.write('\x1f'+ JSON.stringify({...o, type: type}));

				this.endSkt = ()=> {
					this.endSkt = ()=> {};
					this.aFncHook = [];
					this.sendDbg = ()=> {};
					skt.end();
				};

				this.toast('接続');
			}).listen(UNIX_SOCK);

			createConnection('.vscode/sn_launch.sock')	// launch
			.on('error', ()=> main.setLoop(true));		// attach
		}
	}
	private	endSkt = ()=> {};

	private toast(nm: string) {
		const cvs = document.getElementById(CmnLib.SN_ID) as HTMLCanvasElement;
		if (! cvs) return;

		const p = cvs.parentNode!;
		p.querySelectorAll('.sn_BounceIn, .sn_HopIn').forEach(v=> p.removeChild(v));

		const img = document.createElement('img');
		const td = SysApp.hToastDat[nm];
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
	: {[nm: string] :{dat: string, dx?: number, dy?: number, ease?: string}}	= {
		'接続'	: {dx: -1, dat: 'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtNjQwIDMyMGMwIDE3Ni43My0xNDMuMjcgMzIwLTMyMCAzMjBzLTMyMC0xNDMuMjctMzIwLTMyMCAxNDMuMjctMzIwIDMyMC0zMjAgMzIwIDE0My4yNyAzMjAgMzIweiIvPjxwYXRoIGlkPSJiIiBkPSJtMCAyOTJ2NTUuODhoMTI3LjEzYzEyLjM3IDQ2IDU0LjEyIDc5Ljg3IDEwNCA3OS44N2g3Ny44N3YtMjE1LjYyYy00Ni43MyAwLTcyLjY4IDAtNzcuODggMC00OS43NCAwLTkxLjYyIDMzLjg3LTEwMy45OSA3OS44Ny0xNi45NSAwLTU5LjMzIDAtMTI3LjEzIDB6Ii8+PHBhdGggaWQ9ImMiIGQ9Im01MTIuODggMjkyYy0xMi4zOC00Ni01NC4xMy03OS44Ny0xMDQtNzkuODctNS4yMSAwLTMxLjIxIDAtNzggMHYyMTUuNzRoNzcuODdjNDkuODggMCA5MS43NS0zMy44NyAxMDQtNzkuODdoMTI3LjI1di01NmMtNzYuMjcgMC0xMTguNjUgMC0xMjcuMTIgMHoiLz48L2RlZnM+PHVzZSBmaWxsPSIjMmUyZTJlIiB4bGluazpocmVmPSIjYSIvPjx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIGZpbGw9IiMzYWFiZDIiIHhsaW5rOmhyZWY9IiNiIi8+PHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjYiIvPjx1c2UgZmlsbD0iIzNhYWJkMiIgeGxpbms6aHJlZj0iI2MiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNjIi8+PC9zdmc+'},
		'切断'	: {dat: 'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtNjQwIDMyMGMwIDE3Ni43My0xNDMuMjcgMzIwLTMyMCAzMjBzLTMyMC0xNDMuMjctMzIwLTMyMCAxNDMuMjctMzIwIDMyMC0zMjAgMzIwIDE0My4yNyAzMjAgMzIweiIvPjxwYXRoIGlkPSJiIiBkPSJtMTkxLjUzIDIyMS4yNGMtNDUuNjggMC04NC4wMSAzMS4wNC05NS4zIDczLjE2LTYuNDEgMC0zOC40OSAwLTk2LjIzIDB2NTEuMjFoOTYuMjNjMTEuMyA0Mi4xMSA0OS42MyA3My4xNiA5NS4zIDczLjE2aDcxLjMzdi00OC4yNGg1My43OHYtMTAxLjA1aC01My43OHYtNDguMjRjLTQyLjggMC02Ni41NyAwLTcxLjMzIDB6Ii8+PHBhdGggaWQ9ImMiIGQ9Im00NDguNDcgMjIxLjIzYy00Ljc2IDAtMjguNTMgMC03MS4zMyAwdjE5Ny41M2g3MS4zM2M0NS42OCAwIDgzLjk5LTMxLjA0IDk1LjI5LTczLjE1aDk2LjI0di01MS4yMWgtOTYuMjRjLTMzLjA4LTQ4Ljc4LTY0Ljg0LTczLjE3LTk1LjI5LTczLjE3eiIvPjwvZGVmcz48dXNlIGZpbGw9IiMyZTJlMmUiIHhsaW5rOmhyZWY9IiNhIi8+PHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjYSIvPjx1c2UgZmlsbD0iI2RmNTY1NiIgeGxpbms6aHJlZj0iI2IiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNiIi8+PHVzZSBmaWxsPSIjZGY1NjU2IiB4bGluazpocmVmPSIjYyIvPjx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI2MiLz48L3N2Zz4='},
		'再生'	: {dat: 'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjBjMCAxNzYuNzIgMTQzLjI4IDMyMCAzMjAgMzIwczMyMC0xNDMuMjggMzIwLTMyMC0xNDMuMjgtMzIwLTMyMC0zMjAtMzIwIDE0My4yOC0zMjAgMzIwem0yNTguODMgMTExLjA1Yy0xLjI5Ljc5LTIuOTMuODMtNC4yNi4wNC0xLjI5LS43NC0yLjExLTIuMTItMi4xMS0zLjY3IDAtNy4xNiAwLTQyLjk3IDAtMTA3LjQzczAtMTAwLjI3IDAtMTA3LjQzYzAtMS41My44Mi0yLjkzIDIuMTEtMy42OCAxLjMzLS43NiAyLjk3LS43MiA0LjI2LjA0IDE4IDEwLjc1IDE2MiA5Ni43MSAxODAgMTA3LjQ2IDEuMjkuNzMgMi4wNSAyLjE0IDIuMDUgMy42MSAwIDEuNDktLjc2IDIuODgtMi4wNSAzLjYzLTM2IDIxLjQ5LTE2MiA5Ni42OS0xODAgMTA3LjQzeiIvPjwvZGVmcz48cGF0aCBkPSJtMTU0LjU3IDE3MC4xOWgzNDYuMTV2MzA3LjY5aC0zNDYuMTV6IiBmaWxsPSIjZmZmIi8+PHVzZSBmaWxsPSIjMmUyZTJlIiB4bGluazpocmVmPSIjYSIvPjx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI2EiLz48L3N2Zz4='},
		'一時停止'	: {ease: 'sn_BounceIn', dat:  'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjBjMCAxNzYuNzIgMTQzLjI4IDMyMCAzMjAgMzIwczMyMC0xNDMuMjggMzIwLTMyMC0xNDMuMjgtMzIwLTMyMC0zMjAtMzIwIDE0My4yOC0zMjAgMzIwem0yMDAgMTAwdi0yMDBoODB2MjAwem0xNjAgMHYtMjAwaDgwdjIwMHoiLz48L2RlZnM+PHBhdGggZD0ibTE0Ny40OSAxODAuNDFoMzUyLjR2MjgyLjY5aC0zNTIuNHoiIGZpbGw9IiNmZmYiLz48dXNlIGZpbGw9IiMyZTJlMmUiIHhsaW5rOmhyZWY9IiNhIi8+PHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjYSIvPjwvc3ZnPg=='},
		'注意'	: {ease: 'sn_HopIn', dat: 'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMzQzLjM0IDI5LjJjLTEwLjM3LTE3Ljk3LTM2LjMxLTE3Ljk3LTQ2LjY5IDAtMjkuMyA1MC43NS0yNjMuNyA0NTYuNzQtMjkzIDUwNy40OS0xMC4zNyAxNy45NyAyLjU5IDQwLjQ0IDIzLjM0IDQwLjQ0aDU4Ni4wMWMyMC43NSAwIDMzLjcyLTIyLjQ2IDIzLjM1LTQwLjQ0LTU4LjYtMTAxLjUtMjYzLjctNDU2Ljc0LTI5My4wMS01MDcuNDl6bS0yMy4zNCA0ODIuODNjLTE0LjUyIDAtMjYuMjktMi43MS0yNi4yOS02LjA2IDAtNC4yMSAwLTM3Ljg2IDAtNDIuMDcgMC0zLjM1IDExLjc3LTYuMDcgMjYuMjktNi4wN3MyNi4yOSAyLjcyIDI2LjI5IDYuMDd2NDIuMDdjLTcuODQgNC4wNC0xNi42MSA2LjA2LTI2LjI5IDYuMDZ6bTIxLjk5LTEwMy44NGMwIDUuNDMtOS44NSA5LjgzLTIxLjk5IDkuODMtMTIuMTUgMC0yMS45OS00LjQtMjEuOTktOS44MyAwLS4xMy4wNy0uMjUuMDgtLjM4LTEuMzctMTcuNTYtMTIuMy0xNTguMDYtMTMuNjctMTc1LjYyIDAtNS40MyAxNS45My05Ljg0IDM1LjU4LTkuODRzMzUuNTggNC40MSAzNS41OCA5Ljg0Yy0uOTEgMTEuNy01LjQ3IDcwLjI1LTEzLjY3IDE3NS42Mi4wNi4xNi4wOC4yOS4wOC4zOHoiLz48L2RlZnM+PHBhdGggZD0ibTI0MS4yOSAxOTEuNDRoMTQ1LjQ5djM1MS42NmgtMTQ1LjQ5eiIgZmlsbD0iI2ZmZiIvPjx1c2UgZmlsbD0iI2QyYmYzYSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNhIi8+PC9zdmc+'},
		'一歩進む'	: {dat: 'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjBjMCAxNzYuNzIgMTQzLjI4IDMyMCAzMjAgMzIwczMyMC0xNDMuMjggMzIwLTMyMC0xNDMuMjgtMzIwLTMyMC0zMjAtMzIwIDE0My4yOC0zMjAgMzIwem0zNzYuOTMgOTEuOTdjMC01My41MSAwLTgzLjI0IDAtODkuMTktLjE1LjE0LS4yNS4zNC0uNDQuNDUtMTYuMTEgOS42Mi0xNDQuOTUgODYuNTQtMTYxLjA2IDk2LjE1LTEuMTUuNjktMi42Mi43My0zLjgxLjAyLTEuMTUtLjY0LTEuODktMS44OS0xLjg5LTMuMjggMC02LjQxIDAtMzguNDQgMC05Ni4xMSAwLTU3LjY5IDAtODkuNzQgMC05Ni4xNSAwLTEuMzUuNzQtMi42MiAxLjg5LTMuMjkgMS4xOS0uNjggMi42Ni0uNjQgMy44MS4wNCAxNi4xMSA5LjYyIDE0NC45NSA4Ni41NCAxNjEuMDYgOTYuMTYuMTkuMS4yOS4zMS40NC40NSAwLTYuMTMgMC0zNi43NyAwLTkxLjkyaDUzLjMydjE4Ni42N3oiLz48L2RlZnM+PHBhdGggZD0ibTE0Ny40OSAxNTQuMmgzNTIuNHYzMDguOWgtMzUyLjR6IiBmaWxsPSIjZmZmIi8+PHVzZSBmaWxsPSIjMmUyZTJlIiB4bGluazpocmVmPSIjYSIvPjx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI2EiLz48L3N2Zz4='},
		'一歩戻る'	: {dat: 'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjBjMCAxNzYuNzIgMTQzLjI4IDMyMCAzMjAgMzIwczMyMC0xNDMuMjggMzIwLTMyMC0xNDMuMjgtMzIwLTMyMC0zMjAtMzIwIDE0My4yOC0zMjAgMzIwem00MzAuMjcgOTYuMTRjMCAxLjM1LS43NCAyLjYyLTEuODkgMy4yOC0xLjE5LjY5LTIuNjYuNjUtMy44MS0uMDMtMTYuMTEtOS42Mi0xNDQuOTUtODYuNTQtMTYxLjA1LTk2LjE2LS4yLS4xLS4yOS0uMzEtLjQ1LS40NXY5MS45MmgtNTMuMzJ2LTE4Ni42N2g1My4zMnY4OS4xOWMuMTYtLjE0LjI1LS4zNC40NS0uNDUgMTYuMS05LjYyIDE0NC45NC04Ni41NCAxNjEuMDUtOTYuMTYgMS4xNS0uNjggMi42Mi0uNzIgMy44MS0uMDEgMS4xNS42NCAxLjg5IDEuODkgMS44OSAzLjI4djk2LjExeiIvPjwvZGVmcz48cGF0aCBkPSJtMTQ3LjQ5IDE1NC4yaDM1Mi40djMwOC45aC0zNTIuNHoiIGZpbGw9IiNmZmYiLz48dXNlIGZpbGw9IiMyZTJlMmUiIHhsaW5rOmhyZWY9IiNhIi8+PHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjYSIvPjwvc3ZnPg=='},
		'ステップイン'	: {dat: 'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMTkuOTljMCAxNzYuNzQgMTQzLjI3IDMyMC4wMSAzMjAuMDEgMzIwLjAxIDE3Ni43MiAwIDMxOS45OS0xNDMuMjcgMzE5Ljk5LTMyMC4wMSAwLTE3Ni43Mi0xNDMuMjctMzE5Ljk5LTMxOS45OS0zMTkuOTktMTc2Ljc0IDAtMzIwLjAxIDE0My4yNy0zMjAuMDEgMzE5Ljk5em0xNTMuMDUtMjkuNzIgNTUuMTItNTUuMTMgMTExLjg0IDExMS44MiAxMTEuODItMTExLjgyIDU1LjEyIDU1LjEyLTE2Ni45NCAxNjYuOTd6Ii8+PC9kZWZzPjxwYXRoIGQ9Im0xNDcuNDkgMTU0LjJoMzUyLjR2MzA4LjloLTM1Mi40eiIgZmlsbD0iI2ZmZiIvPjx1c2UgZmlsbD0iIzJlMmUyZSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNhIi8+PC9zdmc+'},
		'ステップアウト'	: {dat: 'PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjAuMDFjMCAxNzYuNzIgMTQzLjI3IDMxOS45OSAzMTkuOTkgMzE5Ljk5IDE3Ni43NCAwIDMyMC4wMS0xNDMuMjcgMzIwLjAxLTMxOS45OSAwLTE3Ni43NC0xNDMuMjctMzIwLjAxLTMyMC4wMS0zMjAuMDEtMTc2LjcyIDAtMzE5Ljk5IDE0My4yNy0zMTkuOTkgMzIwLjAxem0zMTkuOTktMjYuOTgtMTExLjgyIDExMS44My01NS4xMi01NS4xMyAxNjYuOTQtMTY2Ljk2IDE2Ni45NiAxNjYuOTYtNTUuMTIgNTUuMTN6Ii8+PC9kZWZzPjxwYXRoIGQ9Im0xNDcuNDkgMTU0LjJoMzUyLjR2MzA4LjloLTM1Mi40eiIgZmlsbD0iI2ZmZiIvPjx1c2UgZmlsbD0iIzJlMmUyZSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNhIi8+PC9zdmc+'},
	};


	private	aFncHook: IFncHook[]	= [];
	addHook(fnc: IFncHook) {this.aFncHook.push(fnc);}
	callHook: IFncHook = (type, o)=> this.aFncHook.forEach(fnc=> fnc(type, o));

	copyBMFolder = (from: number, to: number)=> {
		const path_from = `${this.$path_userdata}storage/${from}/`;
		const path_to = `${this.$path_userdata}storage/${to}/`;
		if (! existsSync(path_from)) return;	// 使ってない場合もある

		copySync(path_from, path_to);
	};
	eraseBMFolder = (place: number)=> {
		removeSync(`${this.$path_userdata}storage/${place}/`);
	};

	protected readonly	isPackaged = ()=> remote.app.isPackaged;
	readonly isDbg = ()=> Boolean(process.env['SKYNOVEL_DBG']) && ! this.isPackaged();	// 配布版では無効

	// アプリの終了
	protected readonly	close = ()=> {this.win.close(); return false;}

	// プレイデータをエクスポート
	protected readonly	_export: ITag = ()=> {
		const r = tar.pack(this.$path_userdata +'storage/')
		r.on('end', ()=> {
			if (CmnLib.debugLog) console.log('プレイデータをエクスポートしました');
			this.fire('sn:exported', new Event('click'));
		});
		r.pipe(createWriteStream(
			this.$path_downloads + (this.crypto ?'' :'no_crypto_')
			+ this.cfg.getNs() + getDateStr('-', '_', '') +'.spd'
		));

		return false;
	}

	// プレイデータをインポート
	protected readonly	_import: ITag = ()=> {
		const flush = this.flush;
		new Promise((rs, rj)=> {
			const inp = document.createElement('input');
			inp.type = 'file';
			inp.accept = '.spd, text/plain';
			inp.onchange = (e: any)=> {
				const path = e?.target?.files?.[0]?.path;
				if (path) rs(path); else rj();
			};
			inp.click();
		})
		.then((inp_path: any)=> new Promise(rs=> {
			this.flush = ()=> {};
			const out_path = this.$path_userdata +'storage/';
			removeSync(out_path);
			ensureDirSync(out_path);	// ディレクトリ、なければ作る

			createReadStream(inp_path)
			.pipe(tar.extract(out_path, {finish: ()=> rs()}));
		}))
		.then(async ()=> {
			const fn = this.$path_userdata +'storage/data.json'+ (this.crypto ?'_': '');
			const s = String(readFileSync(fn));
			const o = JSON.parse(this.crypto ?await this.pre('json', s) :s);
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
		});

		return false;
	}

	// ＵＲＬを開く
	protected readonly	navigate_to: ITag = hArg=> {
		const url = hArg.url;
		if (! url) throw '[navigate_to] urlは必須です';
		shell.openExternal(url);

		return false;
	}
	// タイトル指定
	protected titleSub(txt: string) {this.win.setTitle(txt);}
	// 全画面状態切替
	protected readonly	tgl_full_scr: ITag = hArg=> {
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
		if (url.slice(-1) !== '/') throw '[update_check] urlの最後は/です';

		(async ()=> {
			const res = await this.fetch(url +`latest${CmnLib.isMac ?'-mac' :''}.yml`);
			if (! res.ok) return;
			if (CmnLib.debugLog) console.log(`[update_check] ymlを取得しました url=${url}`);
			const txt = await res.text();
			const mv = /version: (.+)/.exec(txt);
			if (! mv) throw `[update_check] ファイル内にversionが見つかりません`;
			const netver = mv[1];

			const myver = String(remote.app.getVersion());
			if (netver === myver) {
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

				readFile(pathDL, (err: any, data: any)=> {
					if (err) throw err;

					const h = crypto.createHash('SHA512');
					h.update(data)
					const hash = String(h.digest('base64'));

					const isOk = sha === hash;
					if (CmnLib.debugLog) console.log(`[update_check] SHA512 Checksum:${isOk}`, sha, hash);
					if (! isOk) removeSync(pathDL);

					o.buttons.pop();
					o.message = `アプリ【${this.cfg.oCfg.book.title}】の更新パッケージを\nダウンロードしました`+ (isOk ?'' :'が、破損しています。\n開発元に連絡してください');
					remote.dialog.showMessageBox(o);
				});
			});
			pipe_dl.pipe(createWriteStream(pathDL));
		})();

		return false;
	}
	// アプリウインドウ設定
	protected readonly	window: ITag = hArg=> {
		const screenRX = this.dsp.size.width;
		const screenRY = this.dsp.size.height;
		if (argChk_Boolean(hArg, 'centering', false)) {
			const s = this.win.getPosition();
			hArg.x = (screenRX - s[0]) *0.5;
			hArg.y = (screenRY - s[1]) *0.5;
		}
		else {
			hArg.x = argChk_Num(hArg, 'x', Number(this.val.getVal('sys:const.sn.nativeWindow.x', 0)));
			hArg.y = argChk_Num(hArg, 'y', Number(this.val.getVal('sys:const.sn.nativeWindow.y', 0)));
			if (hArg.x < 0) hArg.x = 0;
			else if (hArg.x > screenRX) hArg.x = 0;
			if (hArg.y < 0) hArg.y = 0;
			else if (hArg.y > screenRY) hArg.y = 0;
		}
		this.win.setPosition(hArg.x, hArg.y);
		this.win.setContentSize(CmnLib.stageW, CmnLib.stageH);
			// 2019/07/06 Windowsでこれがないとどんどん縦に短くなる
		const hz = this.win.getContentSize()[1];
		this.win.setContentSize(CmnLib.stageW, CmnLib.stageH *2 -hz);
			// 2019/07/14 setContentSize()したのにメニュー高さぶん勝手に削られた値にされる不具合ぽい動作への対応
		this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.x', hArg.x);
		this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.y', hArg.y);
		this.flush();

		return false;
	}

}
