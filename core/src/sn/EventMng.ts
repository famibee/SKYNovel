/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2021 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, uint, IEvtMng, argChk_Boolean, argChk_Num} from './CmnLib';
import {HArg, IHTag, IVariable, IMain, IEvt2Fnc, IHEvt2Fnc} from './CmnInterface';
import {LayerMng} from './LayerMng';
import {ScriptIterator} from './ScriptIterator';
import {TxtLayer} from './TxtLayer';
import {EventListenerCtn} from './EventListenerCtn';
import {Button} from './Button';
import {FocusMng} from './FocusMng';

import {Tween} from '@tweenjs/tween.js'
import {Container, Application, utils, Graphics, Rectangle} from 'pixi.js';
import {SoundMng} from './SoundMng';
import {Config} from './Config';
import {SysBase} from './SysBase';
import {GrpLayer} from './GrpLayer';
const {GamepadListener} = require('gamepad.js');

export class EventMng implements IEvtMng {
	readonly	#elc		= new EventListenerCtn;
	readonly	#cvsHint	= document.createElement('canvas');
				#picHint_w	= 100;
				#picHint_h	= 50;
	readonly	#padHint	: number;	// hintの文字と左端との幅
	readonly	#grpHint	= new Graphics;	// Hint 表示確認用
	setTxtHint = (_txt: string, _fillStyle: string, _hint_font: string)=> {};

	readonly	#gamepad	= new GamepadListener({
		analog: false,
		deadZone: 0.3,
	});
	readonly	#fcs		= new FocusMng;

	constructor(private readonly cfg: Config, private readonly hTag: IHTag, readonly appPixi: Application, private readonly main: IMain, private readonly layMng: LayerMng, private readonly val: IVariable, private readonly sndMng: SoundMng, private readonly scrItr: ScriptIterator, readonly sys: SysBase) {
		//	イベント
		hTag.clear_event	= o=> this.#clear_event(o);	// イベントを全消去
		// enable_event		// LayerMng.ts内で定義		//イベント有無の切替
		hTag.event			= o=> this.#event(o);		// イベントを予約
		//hTag.gesture_event	（形式変更）			// ジェスチャイベントを予約
		hTag.l				= o=> this.#l(o);			// 行末クリック待ち
		hTag.p				= o=> this.#p(o);			// 改ページクリック待ち
		hTag.s = ()=> {									// 停止する
			this.scrItr.recodePage();
			this.#waitEventBase(()=> {}, false, true);
			return true;	// waitEventBase()したらreturn true;
		};
		hTag.set_cancel_skip= ()=> this.#set_cancel_skip();	// スキップ中断予約
		hTag.set_focus		= o=> this.#set_focus(o);	// フォーカス移動
		hTag.wait			= o=> this.#wait(o);		// ウェイトを入れる
		hTag.waitclick		= ()=> this.#waitclick();	// クリックを待つ

		sndMng.setEvtMng(this);
		scrItr.setOtherObj(this, layMng);
		TxtLayer.setEvtMng(main, this);
		layMng.setEvtMng(this);
		sys.setFire((KEY, e)=> this.fire(KEY, e));

		if (CmnLib.isDbg) {
			const hHook	: {[type: string]: ()=> void}	= {
				pause	: ()=> {
					this.#isDbgBreak = true;
					if (! this.#isWait) return;

					const hArg: HArg = {};
					this.scrItr.recodeDesign(hArg);
					this.sys.callHook('_enterDesign', hArg);
					this.sys.send2Dbg('_enterDesign', hArg);
				},
				stopOnBreakpoint		: ()=> this.#isDbgBreak = true,
				stopOnDataBreakpoint	: ()=> this.#isDbgBreak = true,
				continue				: ()=> this.#isDbgBreak = false,
				disconnect				: ()=> this.#isDbgBreak = false,
			};
			hHook.attach =
			hHook.stopOnEntry =
			hHook.stopOnStep =
			hHook.stopOnStepIn =
			hHook.stopOnStepOut =
			hHook.stopOnBackstep = hHook.pause;

			sys.addHook(type=> hHook[type]?.());
		}

		let fnHint = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAyBAMAAABYG2ONAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGuGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDYwLCAyMDIwLzA1LzEyLTE2OjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMDgtMTlUMDM6MDk6MjUrMDk6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIwLTA4LTE5VDIzOjUyOjI5KzA5OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTA4LTE5VDIzOjUyOjI5KzA5OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI5ZjM1YWNlLTc0NzMtNGI3My05OGJjLWQ1OTk4ZDk5MjQzNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDphY2U0MDcwOS04ZTQxLTQ1YjYtYTMwZi05NDU1YWM1OTAwMmEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphY2U0MDcwOS04ZTQxLTQ1YjYtYTMwZi05NDU1YWM1OTAwMmEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmFjZTQwNzA5LThlNDEtNDViNi1hMzBmLTk0NTVhYzU5MDAyYSIgc3RFdnQ6d2hlbj0iMjAyMC0wOC0xOVQwMzowOToyNSswOTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjA3Mzg4MzYwLWJjMjctNDRkZi1hMTYwLTk5N2M4ODNmYTA0ZCIgc3RFdnQ6d2hlbj0iMjAyMC0wOC0xOVQyMjo0NTozNiswOTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjI5ZjM1YWNlLTc0NzMtNGI3My05OGJjLWQ1OTk4ZDk5MjQzNiIgc3RFdnQ6d2hlbj0iMjAyMC0wOC0xOVQyMzo1MjoyOSswOTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+WWAYXwAAACdQTFRF////PDIlPDIlPDIlPDIlPDIlPDIlPDIlPDIlPDIlPDIlPDIlPDIlCOA6SAAAAA10Uk5TACB/MID/EJBA8NCwYDCdv6cAAABoSURBVHgBYxicYBQIKZEIlJmMSQWGTKS7a8RpGdUyqmVUy6iWUS3y7zGBAlwai+wnrOZwTA2FgBnE220F0RFlQLwWtq1gLdtI8SI7SEc4acFyMjQ08gBpgWzlAEKkgayoBJJj7AAuCQAm1kUjHh83WgAAAABJRU5ErkJggg==';
		let isCustomHint = false;
		try {
			fnHint = cfg.searchPath('hint', Config.EXT_SPRITE);
			isCustomHint = true;
		} catch {}
		const ctx = this.#cvsHint.getContext('2d');
		if (ctx) {
			const cvs = document.getElementById(CmnLib.SN_ID) as HTMLCanvasElement;
			this.#cvsHint.hidden = true;
			cvs.parentElement!.appendChild(this.#cvsHint);
			const s = this.#cvsHint.style;
			s.position = 'absolute';
			s.left = s.top = '0';
			s.zIndex = '10000';
			s.pointerEvents = 'none';
			s.userSelect = 'none';
			this.#padHint = 10;

			const img = new Image;
			const initHint = ()=> {
				this.#cvsHint.width = this.#picHint_w = img.width;
				this.#cvsHint.height= this.#picHint_h = img.height;
				this.setTxtHint('行方向の変更', 'white', '22px Arial');
			};
			this.setTxtHint = (txt, fillStyle, hint_font)=> {
				ctx.clearRect(0, 0, this.#cvsHint.width, this.#cvsHint.height);
				ctx.drawImage(img, 0, 0);
				ctx.textBaseline = 'top';
				ctx.font = hint_font;
			//	ctx.textAlign = 'center';
				ctx.fillStyle = fillStyle;
				ctx.fillText(txt, this.#padHint, 16, this.#picHint_w -this.#padHint *2);
			};
			if (isCustomHint) GrpLayer.loadPic2Img('hint', img, i=> {
				if (img === i) initHint();
			});
			else {img.src = fnHint; img.onload = initHint;}
		}
		if (this.cfg.oCfg.debug.masume) appPixi.stage.addChild(this.#grpHint);
		else this.#dispHint_masume = ()=> {};


		appPixi.stage.interactive = true;
		if (CmnLib.isMobile) (appPixi.stage as utils.EventEmitter).on('pointerdown', (e: any)=> this.fire('click', e));
		else this.#elc.add(appPixi.stage, 'pointerdown', e=> {
			switch (e.data.button) {
				case 0:	this.fire('click', e);	break;
				case 1:	this.fire('middleclick', e);	break;
			}
		});
		this.#elc.add(window, 'keydown', e=> this.#ev_keydown(e));
		this.#elc.add(appPixi.view, 'contextmenu', e=> this.#ev_contextmenu(e));

		// ダークモード切り替え検知
		const fncMql = (mq: MediaQueryList | MediaQueryListEvent)=> {
			CmnLib.isDarkMode = mq.matches;
			val.setVal_Nochk('tmp', 'const.sn.isDarkMode', CmnLib.isDarkMode);
		};
		const mql = globalThis.matchMedia('(prefers-color-scheme: dark)');
		fncMql(mql);
		mql.addEventListener('change', e=> {
			fncMql(e);
			this.fire('sn:chgDarkMode', e);
		});

		if ('WheelEvent' in window) {
			this.#elc.add(appPixi.view, 'wheel', e=> this.#ev_wheel(e), {passive: true});
			this.#resvFlameEvent4Wheel = win=> win.addEventListener('wheel', e=> this.#ev_wheel(e), {passive: true});
			this.#procWheel4wle = (elc: EventListenerCtn, fnc: ()=> void)=> elc.add(appPixi.view, 'wheel', e=> {
				//if (! e.isTrusted) return;
				if (e['isComposing']) return; // サポートしてない環境でもいける書き方
				if (e.deltaY <= 0) return;

				e.stopPropagation();
				fnc();
			});
		}

		// Gamepad
		if (CmnLib.debugLog) {
			this.#gamepad.on('gamepad:connected', (e: any)=> console.log(`👺<'gamepad:connected' index:${e.detail.index} id:${e.detail.gamepad.id}`));
			this.#gamepad.on('gamepad:disconnected', (e: any)=> console.log(`👺<'gamepad:disconnected' index:${e.detail.index} id:${e.detail.gamepad.id}`));
		}
		const aStick: string[] = [
			'',			'ArrowUp',	'',				// '7', '8', '9',
			'ArrowLeft', '',		'ArrowRight',	// '4', '5', '6',
			'',			'ArrowDown', '',			// '1', '2', '3',
		];
		const stick_xy = [0, 0];
		this.#gamepad.on('gamepad:axis', (e: any)=> {
			if (! document.hasFocus() || e.detail.stick !== 0) return;
			stick_xy[e.detail.axis] = e.detail.value;
			const s = (stick_xy[1] +1)*3 + (stick_xy[0] +1);
//console.log(`fn:EventMng.ts line:137 👺 'gamepad:axis' detail:%o`, e.detail);
			const s2 = aStick[s];
			if (! s2) return;
			const cmp = this.#fcs.getFocus();
			((! cmp || cmp instanceof Container) ?globalThis :cmp)
			.dispatchEvent(new KeyboardEvent('keydown', {key: s2, bubbles: true}));

			if (! cmp || cmp instanceof Container) return;
			if (cmp.getAttribute('type') === 'range') cmp.dispatchEvent(new InputEvent('input', {bubbles: true}));	// スライダー変更時、表示数字が変わらない対応
		});
		this.#gamepad.on('gamepad:button', (e: any)=> {
			if (! document.hasFocus() || e.detail.value === 0) return;
//console.log(`fn:EventMng.ts line:155 👺 'gamepad:button' detail:%o`, e.detail);
			if (e.detail.button % 2 === 0) {
				const cmp = this.#fcs.getFocus();
				((! cmp || cmp instanceof Container) ?globalThis :cmp)
				.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', bubbles: true}));
			}
			else appPixi.view.dispatchEvent(new Event('contextmenu'));
		});
		this.#gamepad.start();

		this.#elc.add(window, 'keyup', (e: any)=> {
			if (e['isComposing']) return;	// サポートしてない環境でもいける書き方

			if (e.key in this.#hDownKeys) this.#hDownKeys[e.key] = 0;
		});
		val.defTmp('const.sn.key.alternate', ()=> this.#hDownKeys['Alt'] > 0);
		val.defTmp('const.sn.key.command', ()=> this.#hDownKeys['Meta'] > 0);
		val.defTmp('const.sn.key.control', ()=> this.#hDownKeys['Control'] > 0);
		val.defTmp('const.sn.key.end', ()=> this.#hDownKeys['End'] > 0);
		val.defTmp('const.sn.key.escape', ()=> this.#hDownKeys['Escape'] > 0);
		val.defTmp('const.sn.key.back', ()=> this.#hDownKeys['GoBack'] > 0);
	}
	resvFlameEvent(win: Window) {
		win.addEventListener('keydown', e=> this.#ev_keydown(e));
		win.addEventListener('contextmenu', e=> this.#ev_contextmenu(e));
		this.#resvFlameEvent4Wheel(win);
	}
	#resvFlameEvent4Wheel = (_win: Window)=> {};
	#ev_keydown(e: any) {
		//if (! e.isTrusted) return;
		if (e['isComposing']) return;	// サポートしてない環境でもいける書き方

		if (e.key in this.#hDownKeys) this.#hDownKeys[e.key] = e.repeat ?2 :1;

		const key = (e.altKey ?(e.key === 'Alt' ?'' :'alt+') :'')
		+	(e.ctrlKey ?(e.key === 'Control' ?'' :'ctrl+') :'')
		+	(e.shiftKey ?(e.key === 'Shift' ?'' :'shift+') :'')
		+	e.key;
		this.fire(key, e);
	}
	#ev_contextmenu(e: any) {
		//if (! e.isTrusted) return;

		const key = (e.altKey ?(e.key === 'Alt' ?'' :'alt+') :'')
		+	(e.ctrlKey ?(e.key === 'Control' ?'' :'ctrl+') :'')
		+	(e.shiftKey ?(e.key === 'Shift' ?'' :'shift+') :'')
		+	'rightclick';
		this.fire(key, e);
		e.preventDefault();		// イベント未登録時、メニューが出てしまうので
	}

	#ev_wheel(e: any) {
		//if (! e.isTrusted) return;
		if (e['isComposing']) return;	// サポートしてない環境でもいける書き方

		if (this.#wheeling) {this.#extend_wheel = true; return;}
		this.#wheeling = true;
		this.#ev_wheel_waitstop();

		// 今のところ縦回転ホイールのみ想定
		const key = (e.altKey ?'alt+' :'')
		+	(e.ctrlKey ?'ctrl+' :'')
		+	(e.shiftKey ?'shift+' :'')
		+	(e.deltaY > 0 ?'downwheel' :'upwheel');
		this.fire(key, e);
	}
	#wheeling = false;
	#extend_wheel = false;
	#ev_wheel_waitstop() {
		setTimeout(()=> {
			if (this.#extend_wheel) {
				this.#extend_wheel = false;
				this.#ev_wheel_waitstop();
				return;
			}
			this.#wheeling = false;
		}, 250);
	}

	destroy() {
		this.#fcs.destroy();
		this.#elc.clear();
		this.#cvsHint?.parentElement!.removeChild(this.#cvsHint);
	}

	#hLocalEvt2Fnc	: IHEvt2Fnc = {};
	#hGlobalEvt2Fnc	: IHEvt2Fnc = {};
	#isDbgBreak		= false;
	fire(KEY: string, e: Event) {
		if (this.#isDbgBreak) return;
		if (! this.#isWait) return;

		const key = KEY.toLowerCase();
		if (CmnLib.debugLog) console.log(`👺 fire<(key:\`${key}\` type:${e.type} e:%o)`, {...e});
		if (key === 'enter') {
			const em = this.#fcs.getFocus();
			if (em && em instanceof Container) {
				(em as utils.EventEmitter).emit('pointerdown', new Event('pointerdown'));
				return;
			}
		}

		const ke = this.#getEvt2Fnc(key);
		if (! ke) {
			if (key.slice(0, 5) === 'swipe') {	// スマホ用疑似スワイプスクロール
				const esw: any = e;
				globalThis.scrollBy(-esw.deltaX ?? 0, -esw.deltaY ?? 0);
			}
			return;
		}

		if (key.slice(-5) !== 'wheel') e.preventDefault?.();
		e.stopPropagation();
		if (key.slice(0, 4) !== 'dom=') this.layMng.clickTxtLay();

		this.#isWait = false;
		ke(e);
		this.#cvsHint.hidden = true;
		//this.hLocalEvt2Fnc = {};	// Main.ts resumeByJumpOrCall()が担当
	}
	#isWait		= false;
	#getEvt2Fnc	: (key: string)=> IEvt2Fnc
		= key=> this.#hLocalEvt2Fnc[key]
			?? this.#hGlobalEvt2Fnc[key];

	popLocalEvts(): IHEvt2Fnc {
		const ret = this.#hLocalEvt2Fnc;
		this.#hLocalEvt2Fnc = {};
		return ret;
	}
	pushLocalEvts(h: IHEvt2Fnc) {this.#hLocalEvt2Fnc = h;}

	waitEvent(onFinish: ()=> void, canskip = true, global = false): boolean {
		if (canskip && global) throw `canskipとglobalを同時にtrue指定できません`;
		//this.scrItr.recodePage();	// [wait][wv][wait_tsy][wf][ws]ではやらない

		// 既読スキップ時
		if (this.val.getVal('tmp:sn.skip.enabled')) {
			if (this.val.getVal('tmp:sn.skip.all')	// 既読スキップ
			|| this.scrItr.isNextKidoku) {onFinish(); return false;}

			this.#fncCancelSkip();	// 未読で停止
		}

		this.#waitEventBase(onFinish, canskip, global);
		return true;
	}
	#waitEventBase(onFinish: ()=> void, canskip = true, global = true) {
		this.#goTxt();
		this.val.saveKidoku();

		if (canskip) {
			//hTag.event({key:'click', breakout: fnc});
			//hTag.event({key:'middleclick', breakout: fnc});
			//	hTag.event()は内部で使わず、こうする
			this.#hLocalEvt2Fnc['click'] = onFinish;
			//this.hTag.event({key:'enter', breakout: fnc});
			//hTag.event({key:'down', breakout: fnc});
			//	hTag.event()は内部で使わず、こうする
			this.#hLocalEvt2Fnc['enter'] = onFinish;
			this.#hLocalEvt2Fnc['arrowdown'] = onFinish;

			// hTag.event({key:'downwheel', breakout: fnc});
			//	hTag.event()は内部で使わず、こうする
			this.#hLocalEvt2Fnc['wheel.y>0'] = onFinish;
		}
		else {
			delete this.#hLocalEvt2Fnc['click'];
			delete this.#hLocalEvt2Fnc['enter'];
			delete this.#hLocalEvt2Fnc['arrowdown'];
			delete this.#hLocalEvt2Fnc['wheel.y>0'];
		}
		this.#getEvt2Fnc = global
			? key=> this.#hLocalEvt2Fnc[key]
				?? this.#hGlobalEvt2Fnc[key]
			: key=> this.#hLocalEvt2Fnc[key];

		this.#isWait = true;		// 予約イベントの発生待ち
		this.#firstWait();
		if (CmnLib.debugLog) {
			const o = Object.create(null);
			o.local = Object.keys(this.#hLocalEvt2Fnc);
			o.global= Object.keys(this.#hGlobalEvt2Fnc);
			console.log(`🎍 wait event... %o`, o);
		}
	}
	#firstWait = ()=> {
		this.#firstWait = ()=> {};
		this.scrItr.firstWait();
	};

	unButton(ctnBtn: Container) {this.#fcs.remove(ctnBtn);}
	button(hArg: HArg, ctnBtn: Container, normal: ()=> void, hover: ()=> boolean, clicked: ()=> void) {
		if (! hArg.fn && ! hArg.label) this.main.errScript('fnまたはlabelは必須です');

		// クリックイベント
		ctnBtn.interactive = ctnBtn.buttonMode = true;
		const key = hArg.key?.toLowerCase() ?? ' ';
		if (! hArg.fn) hArg.fn = this.scrItr.scriptFn;
		const glb = argChk_Boolean(hArg, 'global', false);
		if (glb)
			this.#hGlobalEvt2Fnc[key] = ()=> this.main.resumeByJumpOrCall(hArg);
		else this.#hLocalEvt2Fnc[key] = ()=> this.main.resumeByJumpOrCall(hArg);
		const ee = ctnBtn as utils.EventEmitter;
		ee.on('pointerdown', (e: any)=> this.fire(key, e));

		// マウスカーソルを載せるとヒントをツールチップス表示する
		const onHint = hArg.hint ?()=> this.#dispHint(hArg, ctnBtn) :()=> {};
		// マウスオーバーでの見た目変化
		const nr = ()=> {normal(); this.#cvsHint.hidden = true;};
		const hv = ()=> {onHint(); return hover();};
		ee.on('pointerover', hv);
		ee.on('pointerout', ()=> {if (this.#fcs.isFocus(ctnBtn)) hv(); else nr()});
		ee.on('pointerdown', clicked);
		ee.on('pointerup', CmnLib.isMobile
			? nr
			: ()=> {if (this.#fcs.isFocus(ctnBtn)) hv(); else nr()}
		);
		// フォーカス処理対象として登録
		this.#fcs.add(ctnBtn, hv, nr);

		// 音関係
		if (hArg.clickse) {	//	clickse	クリック時に効果音
			this.cfg.searchPath(hArg.clickse, Config.EXT_SOUND);// 存在チェック
			ee.on('pointerdown', ()=> {
				const o: HArg = {fn: hArg.clickse, join: false};
				if (hArg.clicksebuf) o.buf = hArg.clicksebuf;
				this.hTag.playse(o);
			});
		}
		if (hArg.enterse) {	//	enterse	ボタン上にマウスカーソルが載った時に効果音
			this.cfg.searchPath(hArg.enterse, Config.EXT_SOUND);// 存在チェック
			ee.on('pointerover', ()=> {
				const o: HArg = {fn: hArg.enterse, join: false};
				if (hArg.entersebuf) o.buf = hArg.entersebuf;
				this.hTag.playse(o);
			});
		}
		if (hArg.leavese) {	//	leavese	ボタン上からマウスカーソルが外れた時に効果音
			this.cfg.searchPath(hArg.leavese, Config.EXT_SOUND);// 存在チェック
			ee.on('pointerout', ()=> {
				const o: HArg = {fn: hArg.leavese, join: false};
				if (hArg.leavesebuf) o.buf = hArg.leavesebuf;
				this.hTag.playse(o);
			});
		}
		if (hArg.onenter) {
			// マウス重なり（フォーカス取得）時、ラベルコール。必ず[return]で戻ること
			const k = key + hArg.onenter.toLowerCase();
			const o: HArg = {fn: hArg.fn, label: hArg.onenter, call: true, key: k};
			if (glb)
				this.#hGlobalEvt2Fnc[k] = ()=> this.main.resumeByJumpOrCall(o);
			else this.#hLocalEvt2Fnc[k] = ()=> this.main.resumeByJumpOrCall(o);
			ee.on('pointerover', (e: any)=> this.fire(k, e));
		}
		if (hArg.onleave) {
			// マウス外れ（フォーカス外れ）時、ラベルコール。必ず[return]で戻ること
			const k = key + hArg.onleave.toLowerCase();
			const o: HArg = {fn: hArg.fn, label: hArg.onleave, call: true, key: k};
			if (glb)
				this.#hGlobalEvt2Fnc[k] = ()=> this.main.resumeByJumpOrCall(o);
			else this.#hLocalEvt2Fnc[k] = ()=> this.main.resumeByJumpOrCall(o);
			ee.on('pointerout', (e: any)=> this.fire(k, e));
		}

		this.sndMng.loadAheadSnd(hArg);
	}
	#dispHint(hArg: HArg, ctnBtn: Container, masume = true) {
		this.#dispHint_hArg = hArg;
		this.#dispHint_ctnBtn = ctnBtn;

		const rctBtn = ctnBtn instanceof Button
			? ctnBtn.getBtnBounds()
			: ctnBtn.getBounds();
		const isLink = (hArg[':タグ名'] === 'link');
		if (! isLink) {
			const cpp = ctnBtn.parent.parent;
			rctBtn.x += cpp.x;	// レイヤ位置を加算
			rctBtn.y += cpp.y;
		}
		this.setTxtHint(hArg.hint ?? '', hArg.hint_color ?? 'white', hArg.hint_font ?? '22px Arial');
		const hint_width = argChk_Num(hArg, 'hint_width', this.#picHint_w);
		const scale_x = hint_width /this.#picHint_w;
		const hint_tate = argChk_Boolean(hArg, 'hint_tate', false);

		const scale = this.sys.reso4frame *CmnLib.cvsScale;
		this.#cvsHint.style.left= `${this.sys.ofsLeft4frm+rctBtn.x *scale}px`;
		this.#cvsHint.style.top = `${this.sys.ofsTop4frm +rctBtn.y *scale}px`;
		this.#cvsHint.style.transformOrigin = 'top left';
		this.#cvsHint.style.transform = `rotateZ(${
			ctnBtn.rotation +(hint_tate ?Math.PI *90 /180 :0)
		}rad) scale(${scale_x *scale}, ${scale}) translate(${
			((hint_tate ?rctBtn.height :rctBtn.width) -hint_width)/2 /scale_x
		}px, ${
			(hint_tate ?-rctBtn.width :0) -this.#picHint_h
		}px)`;
		this.#cvsHint.hidden = false;

		if (masume) this.#dispHint_masume(hArg, ctnBtn, rctBtn, isLink, hint_width, hint_tate);
	}
	#dispHint_hArg	: HArg;
	#dispHint_ctnBtn: Container;
	cvsResize() {
		if (this.#cvsHint.hidden) return;
		this.#dispHint(this.#dispHint_hArg, this.#dispHint_ctnBtn, false);
	}
	readonly	#dispHint_masume = (hArg: HArg, ctnBtn: Container, rctBtn: Rectangle, isLink: boolean, hint_width: number, hint_tate: boolean)=> {
//console.log(`fn:EventMng.ts == hint_tate:${hint_tate} pic(w:${hint_width}, h:${this.#heightHintPic50}) #cvsHint(${this.#cvsHint.style.left}, ${this.#cvsHint.style.top}, ${this.#cvsHint.width}, ${this.#cvsHint.height}) rctBtn(${rctBtn.x}, ${rctBtn.y}, ${rctBtn.width}, ${rctBtn.height})`);

		// === Button/Link 表示確認用
		this.#grpHint.zIndex = 1000;
		this.#grpHint.x = rctBtn.x;
		this.#grpHint.y = rctBtn.y;
	//x	this.#g_hint.x = this.#g_hint.y = 0;
		this.#grpHint.rotation = ctnBtn.rotation;
		const p = (isLink ?ctnBtn.parent :ctnBtn).scale;
			// 文字リンクのクリック用Spriteだと、
			// scale.x = 文字サイズという謎動作なので
		const isBtnPic = (hArg[':タグ名'] === 'button') && (hArg.pic);
		this.#grpHint.clear()
		.beginFill(0x33FF00, 0.2)
		.lineStyle(1, 0x33FF00, 1)
	//x	.drawRect(rctBtn.x, rctBtn.y, rctBtn.width, rctBtn.height)
		.drawRect(0, 0, rctBtn.width, rctBtn.height)
		.endFill()

		// === Hint 表示確認用
		.beginFill(0x0033FF, 0.2)
		.lineStyle(2, 0x0033FF, 1);
		if (hint_tate) this.#grpHint.drawRect(
			isLink ?rctBtn.height :rctBtn.width,
			((isLink ?rctBtn.width :rctBtn.height) -hint_width) /2,
			this.#picHint_h *(isBtnPic ?1 :p.x),
			hint_width *(isBtnPic ?1 :p.y),
		);
		else this.#grpHint.drawRect(
			(rctBtn.width -hint_width) /2,
			-this.#picHint_h,
			hint_width *(isBtnPic ?1 :p.x),
			this.#picHint_h *(isBtnPic ?1 :p.y),
		);
		this.#grpHint.endFill();
	}


	// 予約イベントの発生待ちしない waitEvent()
	waitLimitedEvent(hArg: HArg, onFinish: ()=> void): boolean {
		this.#goTxt();
		this.val.saveKidoku();
		const fnc = ()=> {this.#elcWLE.clear(); onFinish();};

		// 既読スキップ時
		if (this.val.getVal('tmp:sn.skip.enabled')) {
			if (! this.val.getVal('tmp:sn.skip.all')
			&& ! this.scrItr.isNextKidoku) this.#fncCancelSkip();	// 未読で停止
			else {fnc(); return false;}	// 既読スキップ
		}

		if (! argChk_Boolean(hArg, 'canskip', true)) return true;

		this.#elcWLE.add(window, 'pointerdown', e=>{e.stopPropagation(); fnc()});
		this.#elcWLE.add(window, 'keydown', (e: any)=> {
			//if (! e.isTrusted) return;
			if (e['isComposing']) return; // サポートしてない環境でもいける書き方
			e.stopPropagation();
			fnc();
		});
		this.#procWheel4wle(this.#elcWLE, fnc);

		return true;
	}
	#procWheel4wle = (_elc: EventListenerCtn, _fnc: ()=> void)=> {};
	#elcWLE	= new EventListenerCtn;


	// イベントを全消去
	#clear_event(hArg: HArg) {
		const glb = argChk_Boolean(hArg, 'global', false);
		const h = glb ?this.#hGlobalEvt2Fnc :this.#hLocalEvt2Fnc;
		for (const nm in h) this.#clear_eventer(nm, h[nm]);
		if (glb) this.#hGlobalEvt2Fnc = {}; else this.#hLocalEvt2Fnc = {};
		this.#isWait = false;	// ScriptIterator からコールされた時用

		return false;
	}
		#clear_eventer(KeY: string, e2f: IEvt2Fnc) {
			if (KeY.slice(0, 4) !== 'dom=') return;
			this.#getHtmlElmList(KeY).el.forEach(v=> v.removeEventListener('click', e2f));
		}


	// イベントを予約
	#event(hArg: HArg) {
		const KeY = hArg.key;
		if (! KeY) throw 'keyは必須です';
		const key = KeY.toLowerCase();

		const call = argChk_Boolean(hArg, 'call', false);
		const h = argChk_Boolean(hArg, 'global', false)
			? this.#hGlobalEvt2Fnc
			: this.#hLocalEvt2Fnc;
		if (argChk_Boolean(hArg, 'del', false)) {
			if (hArg.fn || hArg.label || call) throw 'fn/label/callとdelは同時指定できません';

			this.#clear_eventer(KeY, h[key]);

			// その他・キーボードイベント
			delete h[key];
			return false;
		}
		hArg.fn ??= this.scrItr.scriptFn;

		// domイベント
		if (KeY.slice(0, 4) === 'dom=') {
			const g = this.#getHtmlElmList(KeY);
			if (g.el.length === 0) {
				if (argChk_Boolean(hArg, 'need_err', true)) throw `HTML内にセレクタ（${g.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
				return false;
			}

			let aEv = ['click', 'keydown'];	// ラジオボタンも
			const inp = g.el[0] as HTMLInputElement;
			switch (inp.type ?? '') {
		//	switch (g.el[0].getAttribute('type') ?? '') { textareaで''になる
				case 'checkbox':	aEv = ['input'];	break;
				case 'range':		aEv = ['input'];	break;
				case 'text':
				case 'textarea':	aEv = ['input', 'change'];	break;
			}
			aEv.forEach((v, i)=> g.el.forEach(elm=> {
				this.#elc.add(elm, v, e=> {
					if (! this.#isWait || this.layMng.getFrmDisabled(g.id)) return;
					if (v === 'keydown' && e.key !== 'Enter') return;

					const d = (elm as HTMLElement).dataset;
					for (const n in d) if (d.hasOwnProperty(n)) this.val.setVal_Nochk('tmp', `sn.event.domdata.${n}`, d[n]);
					this.fire(KeY, e);
				});

				// フォーカス処理対象として登録
				if (i === 0) this.#fcs.add(
					elm,
					()=> {
						if (! this.#canFocus(elm)) return false;
						elm.focus();
						return true;
					},
					()=> {},
				);
			}));

			// return;	// hGlobalEvt2Fnc(hLocalEvt2Fnc)登録もする
		}

		// その他・キーボードイベント
		h[key] = ()=> this.main.resumeByJumpOrCall(hArg);

		return false;
	}
	#canFocus(elm: HTMLElement): boolean {
		if (elm.offsetParent === null) return false;

		let el: HTMLElement | null = elm;
		do {
			const style = getComputedStyle(el);
			if (style.display === 'none'
			|| el.dataset.focus === 'false'
		//	|| style.visibility !== 'visible'
			|| (el as any)?.disabled
		//	|| parseFloat(style.opacity ?? '') <= 0.0
		//	|| parseInt(style.height ?? '', 10) <= 0
		//	|| parseInt(style.width ?? '', 10) <= 0
			) return false;
			el = el.parentElement;
		}
		while (el !== null);

		return true;
	}
	#getHtmlElmList(KeY: string): {el: NodeListOf<HTMLElement>, id: string, sel: string} {
		const idx = KeY.indexOf(':');
		let sel = '';
		if (idx >= 0) {		// key='dom=config:#ctrl2val
			const id = KeY.slice(4, idx);
			const frmnm = `const.sn.frm.${id}`;
			if (! this.val.getVal(`tmp:${frmnm}`, 0)) throw `HTML【${id}】が読み込まれていません`;

			const ifrm = document.getElementById(id) as HTMLIFrameElement;
			const win = ifrm.contentWindow!;
			sel = KeY.slice(idx +1);
			return {el: win.document.querySelectorAll(sel), id: id, sel: sel};
		}

		sel = KeY.slice(4);
		return {el: document.querySelectorAll(sel), id: '', sel: sel};
	}


	#goTxt = ()=> this.layMng.goTxt();


	// 行末クリック待ち
	#l(hArg: HArg) {
		if (this.scrItr.skip4page) return false;
		if (! this.val.getVal('tmp:sn.tagL.enabled')) {this.#goTxt(); return false;}

		// 既読スキップ時
		if (this.val.getVal('tmp:sn.skip.enabled')) {
			if (! this.val.getVal('tmp:sn.skip.all')
			&& ! this.scrItr.isNextKidoku) this.#fncCancelSkip();	// 未読で停止
			else if ('ps'.includes(String(this.val.getVal('sys:sn.skip.mode')))) return false;	// 既読スキップ
		}

		// 自動読み進み
		if (this.val.getVal('tmp:sn.auto.enabled')) return this.#wait({
			time: Number(this.scrItr.isKidoku
				? this.val.getVal('sys:sn.auto.msecLineWait_Kidoku')
				: this.val.getVal('sys:sn.auto.msecLineWait'))
		});

		if (argChk_Boolean(hArg, 'visible', true)) this.layMng.breakLine();

		this.#waitEventBase(()=> this.main.resume());
		return true;	// waitEventBase()したらreturn true;
	}


	// 改ページクリック待ち
	#p(hArg: HArg) {
		this.scrItr.recodePage();

		// 既読スキップ時
		if (this.val.getVal('tmp:sn.skip.enabled')) {
			if (! this.val.getVal('tmp:sn.skip.all')
			&& ! this.scrItr.isNextKidoku) this.#fncCancelSkip();	// 未読で停止
			else if ('s' === String(this.val.getVal('sys:sn.skip.mode'))) {this.#goTxt(); return false;}	// 既読スキップ
		}

		// 自動読み進み
		if (this.val.getVal('tmp:sn.auto.enabled')) return this.#wait({
			time: Number(this.scrItr.isKidoku
				? this.val.getVal('sys:sn.auto.msecPageWait_Kidoku')
				: this.val.getVal('sys:sn.auto.msecPageWait'))
		});

		if (argChk_Boolean(hArg, 'visible', true)) this.layMng.breakPage();

		const fnc = ()=> {this.sndMng.clearCache(); this.main.resume()};
		this.#waitEventBase(
			this.layMng.getCurrentTxtlayFore()
			&& argChk_Boolean(hArg, 'er', false)
				? ()=> {this.hTag.er(hArg); fnc();}
				: fnc,
		);
		return true;	// waitEventBase()したらreturn true;
	}


	// スキップ中断予約
	#fncCancelSkip	= ()=> {};
	#set_cancel_skip() {
		this.#fncCancelSkip = ()=> {
			this.#fncCancelSkip = ()=> {};

			this.val.setVal_Nochk('tmp', 'sn.tagL.enabled', true);	// 頁末まで一気に読み進むか(l無視)
			this.val.setVal_Nochk('tmp', 'sn.skip.enabled', false);// 次の選択肢(/未読)まで進むが有効か
			this.val.setVal_Nochk('tmp', 'sn.auto.enabled', false);// 自動読みすすみモードかどうか

			this.layMng.setNormalWaitTxtLayer();
		};

		this.scrItr.unregisterClickEvts();

		return false;
	}


	// フォーカス移動
	#set_focus(hArg: HArg) {
		const add = hArg.add;
		if (add?.slice(0, 4) === 'dom=') {
			const g = this.#getHtmlElmList(add);
			if (g.el.length === 0 && argChk_Boolean(hArg, 'need_err', true)) throw `HTML内にセレクタ（${g.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;

			g.el.forEach(elm=> this.#fcs.add(
				elm,
				()=> {
					if (! this.#canFocus(elm)) return false;
					elm.focus();
					return true;
				},
				()=> {},
			));
			return false;
		}

		const del = hArg.del;
		if (del?.slice(0, 4) === 'dom=') {
			const g = this.#getHtmlElmList(del);
			if (g.el.length === 0 && argChk_Boolean(hArg, 'need_err', true)) throw `HTML内にセレクタ（${g.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;

			g.el.forEach(elm=> this.#fcs.remove(elm));
			return false;
		}

		const to = hArg.to;
		if (! to) throw '[set_focus] add か to は必須です';

		switch (to) {
			case 'null':	this.#fcs.blur();	break;
			case 'next':	this.#fcs.next();	break;
			case 'prev':	this.#fcs.prev();	break;
		}
		return false;
	}

	// ウェイトを入れる
	#wait(hArg: HArg) {
		if (this.scrItr.skip4page) return false;

		// 既読スキップ時
		if (this.val.getVal('tmp:sn.skip.enabled')) {
			if (! this.val.getVal('tmp:sn.skip.all')
			&& ! this.scrItr.isNextKidoku) this.#fncCancelSkip();	// 未読で停止
			else return false;	// 既読スキップ
		}

		const tw = new Tween({})
		.to({}, uint(argChk_Num(hArg, 'time', NaN)))
		.onComplete(()=> {tw.stop(); this.main.resume();})
		.start();

		return this.waitEvent(
			()=> tw.end(),
			argChk_Boolean(hArg, 'canskip', true),
			argChk_Boolean(hArg, 'global', false),
		);
	}

	// クリックを待つ
	#waitclick(): boolean {
		if (this.scrItr.skip4page) return false;

		// 既読スキップ時
		if (this.val.getVal('tmp:sn.skip.enabled')) {
			if (! this.val.getVal('tmp:sn.skip.all')
			&& ! this.scrItr.isNextKidoku) this.#fncCancelSkip();	// 未読で停止
			else return false;	// 既読スキップ
		}

		this.#waitEventBase(()=> this.main.resume());
		return true;	// waitEventBase()したらreturn true;
	}

	isSkipKeyDown(): boolean {
		if (this.scrItr.skip4page) return true;
		for (const v in this.#hDownKeys) if (this.#hDownKeys[v] === 2) return true;
		return false;
	}
	// 0:no push  1:one push  2:push repeating
	readonly #hDownKeys	: {[name: string]: number}	= {
		'Alt'		: 0,
		'Meta'		: 0,	// COMMANDキー
		'Control'	: 0,
		'ArrowDown'	: 0,
		'End'		: 0,
		'Enter'		: 0,
		'Escape'	: 0,
		' '			: 0,
		'GoBack'	: 0,	// AndroidのBackキーだと思う
	}

}
