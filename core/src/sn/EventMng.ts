/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, uint, IEvtMng, argChk_Boolean, argChk_Num} from './CmnLib';
import {HArg, IHTag, IVariable, IMain, IEvt2Fnc, IHEvt2Fnc} from './CmnInterface';
import {LayerMng} from './LayerMng';
import {ScriptIterator} from './ScriptIterator';
import {TxtLayer} from './TxtLayer';
import {EventListenerCtn} from './EventListenerCtn';

const Tween = require('@tweenjs/tween.js').default;
import {DisplayObject, Application} from 'pixi.js';
import {SoundMng} from './SoundMng';
import {Config} from './Config';
import {SysBase} from './SysBase';
import * as Hammer from 'hammerjs';

export class EventMng implements IEvtMng {
	private	readonly	elc		= new EventListenerCtn;

	private ham		: any;
	private	readonly hHamEv :{[name: string]: null | {(e: any): void}}	= {
	//	tap			: null,
		tap2		: null,
		press		: null,	// 長押し
		//swipe		: null,
		swipeleft	: null,
		swiperight	: null,
		swipeup		: null,
		swipedown	: null,
	};

	constructor(private readonly cfg: Config, private readonly hTag: IHTag, readonly appPixi: Application, private readonly main: IMain, private readonly layMng: LayerMng, private readonly val: IVariable, private readonly sndMng: SoundMng, private readonly scrItr: ScriptIterator, readonly sys: SysBase) {
		//	イベント
		hTag.clear_event	= o=> this.clear_event(o);	// イベントを全消去
		// enable_event		// LayerMng.ts内で定義		//イベント有無の切替
		hTag.event			= o=> this.event(o);		// イベントを予約
		//hTag.gesture_event	（形式変更）			// ジェスチャイベントを予約
		hTag.l				= o=> this.l(o);			// 行末クリック待ち
		hTag.p				= o=> this.p(o);			// 改ページクリック待ち
		hTag.s = ()=> {this.waitEventBase(()=> {}, false, true); return true;};
														// 停止する
							// waitEventBase()したらreturn true;
		hTag.set_cancel_skip= ()=> this.set_cancel_skip();	// スキップ中断予約
		hTag.wait			= o=> this.wait(o);				// ウェイトを入れる
		hTag.waitclick		= ()=> this.waitclick();	// クリックを待つ

		sndMng.setEvtMng(this);
		scrItr.setOtherObj(this, layMng);
		TxtLayer.setEvtMng(main, this);
		layMng.setEvtMng(this);
		sys.setFire((KEY, e)=> this.fire(KEY, e));
		sys.addHook((type: string, o: object)=> this.procHook(type, o));

		this.ham = new Hammer(appPixi.view, {recognizers: [
			//	[Hammer.Tap],
				[Hammer.Press],
				[Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}],
				//[Hammer.Rotate],
				//[Hammer.Pinch, { enable: false }, ['rotate']],
				// http://hammerjs.github.io/api/
			]});

		/*const manager = new Hammer.Manager(document.body, {recognizers: [
			[Hammer.Tap, {pointers: 2}],
		]});*/
		// Add the recognizer to the manager.
		this.hHamEv.tap2 = null;
		for (const key in this.hHamEv) {
			const fnc = this.hHamEv[key] = e=> {
				val.defTmp('sn.eventArg.type', e.type);
				val.defTmp('sn.eventArg.pointers', e.pointers);
				this.fire(e.type, e);
			}
			this.ham.on(key, fnc);
		}
		/*manager.add(new Hammer.Tap({event: 'tap2', pointers: 2}));
		manager.on('tap2', e=> {
			val.defTmp('sn.eventArg', e.type);
		//hTag['title']({text: 'DBG:'+ e.type});
			this.evt2Fnc(e, e.type);
		});*/


		appPixi.stage.interactive = true;
		if (CmnLib.isMobile) appPixi.stage.on('pointerdown', (e: any)=> this.fire('click', e));
		else this.elc.add(appPixi.stage, 'pointerdown', e=> {
			switch (e.data.button) {
				case 0:	this.fire('click', e);	break;
				case 1:	this.fire('middleclick', e);	break;
			}
		});
		this.elc.add(window, 'keydown', e=> this.ev_keydown(e));
		this.elc.add(appPixi.view, 'contextmenu', e=> this.ev_contextmenu(e));

		if ('WheelEvent' in window) {
			this.elc.add(appPixi.view, 'wheel', e=> this.ev_wheel(e), {passive: true});
			this.resvFlameEvent4Wheel = win=> win.addEventListener('wheel', e=> this.ev_wheel(e), {passive: true});
			this.procWheel4wle = (elc: EventListenerCtn, fnc: ()=> void)=> elc.add(appPixi.view, 'wheel', e=> {
				//if (! e.isTrusted) return;
				if (e['isComposing']) return; // サポートしてない環境でもいける書き方
				if (e.deltaY <= 0) return;

				e.stopPropagation();
				fnc();
			});
		}

		// Gamepad APIの利用 - ウェブデベロッパーガイド | MDN https://developer.mozilla.org/ja/docs/Web/Guide/API/Gamepad
		// Gamepad の接続
		this.elc.add(window, 'gamepadconnected', (e: any)=> {
			if (CmnLib.debugLog) console.log(
				'👺 Gamepad connected at index %d: %s. %d buttons, %d axes.',
				e['gamepad'].index, e['gamepad'].id,
				e['gamepad'].buttons.length, e['gamepad'].axes.length);

			const key = e.type;
			this.fire(key, e);
		});
		// Gamepad の切断
		this.elc.add(window, 'gamepaddisconnected', (e: any)=> {
			if (CmnLib.debugLog) console.log(
				'👺 Gamepad disconnected from index %d: %s', e['gamepad'].index,
				e['gamepad'].id);

			const key = e.type;
			this.fire(key, e);
		});

		this.elc.add(window, 'keyup', (e: any)=> {
			if (e['isComposing']) return;	// サポートしてない環境でもいける書き方

			if (e.key in this.hDownKeys) this.hDownKeys[e.key] = 0;
		});
		val.defTmp('const.sn.key.alternate', ()=> (this.hDownKeys['Alt'] > 0));
		val.defTmp('const.sn.key.command', ()=> (this.hDownKeys['Meta'] > 0));
		val.defTmp('const.sn.key.control', ()=> (this.hDownKeys['Control'] > 0));
		val.defTmp('const.sn.key.end', ()=> (this.hDownKeys['End'] > 0));
		val.defTmp('const.sn.key.escape', ()=> (this.hDownKeys['Escape'] > 0));
		val.defTmp('const.sn.key.back', ()=> (this.hDownKeys['GoBack'] > 0));
	}
	resvFlameEvent(win: Window) {
		win.addEventListener('keydown', e=> this.ev_keydown(e));
		win.addEventListener('contextmenu', e=> this.ev_contextmenu(e));
		this.resvFlameEvent4Wheel(win);
	}
	private resvFlameEvent4Wheel = (_win: Window)=> {};
	private ev_keydown(e: any) {
		//if (! e.isTrusted) return;
		if (e['isComposing']) return;	// サポートしてない環境でもいける書き方

		if (e.key in this.hDownKeys) this.hDownKeys[e.key] = e.repeat ?2 :1;

		const key = (e.altKey ?(e.key === 'Alt' ?'' :'alt+') :'')
		+	(e.ctrlKey ?(e.key === 'Control' ?'' :'ctrl+') :'')
		+	(e.shiftKey ?(e.key === 'Shift' ?'' :'shift+') :'')
		+	e.key;
		this.fire(key, e);
	}
	private ev_contextmenu(e: any) {
		//if (! e.isTrusted) return;

		const key = (e.altKey ?(e.key === 'Alt' ?'' :'alt+') :'')
		+	(e.ctrlKey ?(e.key === 'Control' ?'' :'ctrl+') :'')
		+	(e.shiftKey ?(e.key === 'Shift' ?'' :'shift+') :'')
		+	'rightclick';
		this.fire(key, e);
		e.preventDefault();		// イベント未登録時、メニューが出てしまうので
	}

	private ev_wheel(e: any) {
		//if (! e.isTrusted) return;
		if (e['isComposing']) return;	// サポートしてない環境でもいける書き方

		if (this.wheeling) {this.extend_wheel = true; return;}
		this.wheeling = true;
		this.ev_wheel_waitstop();

		// 今のところ縦回転ホイールのみ想定
		const key = (e.altKey ?'alt+' :'')
		+	(e.ctrlKey ?'ctrl+' :'')
		+	(e.shiftKey ?'shift+' :'')
		+	(e.deltaY > 0 ?'downwheel' :'upwheel');
		this.fire(key, e);
	}
	private wheeling = false;
	private extend_wheel = false;
	private ev_wheel_waitstop() {
		setTimeout(()=> {
			if (this.extend_wheel) {
				this.extend_wheel = false;
				this.ev_wheel_waitstop();
				return;
			}
			this.wheeling = false;
		}, 250);
	}

	destroy() {
		this.elc.clear();

		for (const key in this.hHamEv) {
			this.ham.off(key);
			//this.ham.off(key, this.hHamEv[key]);
		}
		this.ham.destroy();
	}

	private hLocalEvt2Fnc	: IHEvt2Fnc = {};
	private hGlobalEvt2Fnc	: IHEvt2Fnc = {};
	fire(KEY: string, e: Event) {
		if (this.isDbgBreak) return;
		if (! this.isWait) return;

		const key = KEY.toLowerCase();
		//if (CmnLib.debugLog) console.log(`👺 <(key:\`${key}\` type:${e.type} e:%o)`, {...e});
		const ke = this.getEvt2Fnc(key);
		if (! ke) {
			if (key.slice(0, 5) === 'swipe') {	// スマホ用疑似スワイプスクロール
				const esw: any = e;
				globalThis.scrollBy(-(esw.deltaX ?? 0), -(esw.deltaY ?? 0));
			}
			return;
		}

		if (key.slice(-5) !== 'wheel') e.preventDefault?.();
		e.stopPropagation();
		if (key.slice(0, 4) !== 'dom=') this.layMng.clickTxtLay();

		this.isWait = false;
		ke(e);
		//this.hLocalEvt2Fnc = {};	// Main.ts resumeByJumpOrCall()が担当
	}
	private isWait = false;
	private getEvt2Fnc	: (key: string)=> IEvt2Fnc
		= key=> this.hLocalEvt2Fnc[key]
			?? this.hGlobalEvt2Fnc[key];

	popLocalEvts(): IHEvt2Fnc {
		const ret = this.hLocalEvt2Fnc;
		this.hLocalEvt2Fnc = {};
		return ret;
	}
	pushLocalEvts(h: IHEvt2Fnc) {this.hLocalEvt2Fnc = h;}

	waitEvent(onFinish: ()=> void, canskip = true, global = false): boolean {
		if (canskip && global) throw `canskipとglobalを同時にtrue指定できません`;

		// 既読スキップ時
		if (this.val.getVal('tmp:sn.skip.enabled')) {
			if (! this.val.getVal('tmp:sn.skip.all')
			&& ! this.scrItr.isNextKidoku) this.fncCancelSkip();	// 未読で停止
			else {onFinish(); return false;}	// 既読スキップ
		}

		this.waitEventBase(onFinish, canskip, global);
		return true;
	}
	private waitEventBase(onFinish: ()=> void, canskip = true, global = true) {
		this.goTxt();
		this.val.saveKidoku();

		if (canskip) {
			//hTag.event({key:'click', breakout: fnc});
			//hTag.event({key:'middleclick', breakout: fnc});
			//	hTag.event()は内部で使わず、こうする
			this.hLocalEvt2Fnc['click'] = onFinish;
			//this.hTag.event({key:'enter', breakout: fnc});
			//hTag.event({key:'down', breakout: fnc});
			//	hTag.event()は内部で使わず、こうする
			this.hLocalEvt2Fnc['enter'] = onFinish;
			this.hLocalEvt2Fnc['arrowdown'] = onFinish;

			// hTag.event({key:'downwheel', breakout: fnc});
			//	hTag.event()は内部で使わず、こうする
			this.hLocalEvt2Fnc['wheel.y>0'] = onFinish;
		}
		else {
			delete this.hLocalEvt2Fnc['click'];
			delete this.hLocalEvt2Fnc['enter'];
			delete this.hLocalEvt2Fnc['arrowdown'];
			delete this.hLocalEvt2Fnc['wheel.y>0'];
		}
		this.getEvt2Fnc = global
			? key=> this.hLocalEvt2Fnc[key]
				?? this.hGlobalEvt2Fnc[key]
			: key=> this.hLocalEvt2Fnc[key];

		this.isWait = true;		// 予約イベントの発生待ち
	}
	private	procHook(type: string, _o: any): void {
		switch (type) {
			case 'continue':
			case 'disconnect':	this.isDbgBreak = false;	break;
			default:	this.isDbgBreak = true;
		}
	}
	private isDbgBreak = false;

	button(hArg: HArg, em: DisplayObject) {
		if (! hArg.fn && ! hArg.label) this.main.errScript('fnまたはlabelは必須です');

		em.interactive = em.buttonMode = true;
		const key = (hArg.key ?? ' ').toLowerCase();
		if (! hArg.fn) hArg.fn = this.scrItr.scriptFn;
		const glb = argChk_Boolean(hArg, 'global', false);
		if (glb) this.hGlobalEvt2Fnc[key] = ()=> this.main.resumeByJumpOrCall(hArg);
			else this.hLocalEvt2Fnc[key] = ()=> this.main.resumeByJumpOrCall(hArg);
		em.on('pointerdown', (e: any)=> this.fire(key, e));

		// TODO: hint マウスカーソルを載せるとヒントをチップス表示する

		if (hArg.clickse) {
			this.cfg.searchPath(hArg.clickse, Config.EXT_SOUND);	// 存在チェック
			em.on('pointerdown', ()=> {
				//	clickse	効果音ファイル名	クリック時に効果音
				const o: HArg = {fn: hArg.clickse, join: false};
				if (hArg.clicksebuf) o.buf = hArg.clicksebuf;
				this.hTag.playse(o);
			});
		}
		if (hArg.enterse) {
			this.cfg.searchPath(hArg.enterse, Config.EXT_SOUND);	// 存在チェック
			em.on('pointerover', ()=> {
				//	enterse	効果音ファイル名	ボタン上にマウスカーソルが載った時に効果音
				const o: HArg = {fn: hArg.enterse, join: false};
				if (hArg.entersebuf) o.buf = hArg.entersebuf;
				this.hTag.playse(o);
			});
		}
		if (hArg.leavese) {
			this.cfg.searchPath(hArg.leavese, Config.EXT_SOUND);	// 存在チェック
			em.on('pointerout', ()=> {
				//	leavese	効果音ファイル名	ボタン上からマウスカーソルが外れた時に効果音
				const o: HArg = {fn: hArg.leavese, join: false};
				if (hArg.leavesebuf) o.buf = hArg.leavesebuf;
				this.hTag.playse(o);
			});
		}
		if (hArg.onenter) {
			// マウス重なり（フォーカス取得）時、ラベルコール。必ず[return]で戻ること
			const key2 = key + hArg.onenter.toLowerCase();
			const o: HArg = {fn: hArg.fn, label: hArg.onenter, call: true, key: key2};
			if (glb) this.hGlobalEvt2Fnc[key2] = ()=>this.main.resumeByJumpOrCall(o);
			else this.hLocalEvt2Fnc[key2] = ()=> this.main.resumeByJumpOrCall(o);
			em.on('pointerover', (e: any)=> this.fire(key2, e));
		}
		if (hArg.onleave) {
			// マウス外れ（フォーカス外れ）時、ラベルコール。必ず[return]で戻ること
			const key2 = key + hArg.onleave.toLowerCase();
			const o: HArg = {fn: hArg.fn, label: hArg.onleave, call: true, key: key2};
			if (glb) this.hGlobalEvt2Fnc[key2] = ()=>this.main.resumeByJumpOrCall(o);
			else this.hLocalEvt2Fnc[key2] = ()=> this.main.resumeByJumpOrCall(o);
			em.on('pointerout', (e: any)=> this.fire(key2, e));
		}

		this.sndMng.loadAheadSnd(hArg);
	}


	// 予約イベントの発生待ちしない waitEvent()
	waitLimitedEvent(hArg: HArg, onFinish: ()=> void): boolean {
		this.goTxt();
		this.val.saveKidoku();
		const fnc = ()=> {this.elcWLE.clear(); onFinish();};

		// 既読スキップ時
		if (this.val.getVal('tmp:sn.skip.enabled')) {
			if (! this.val.getVal('tmp:sn.skip.all')
			&& ! this.scrItr.isNextKidoku) this.fncCancelSkip();	// 未読で停止
			else {fnc(); return false;}	// 既読スキップ
		}

		if (! argChk_Boolean(hArg, 'canskip', true)) return true;

		this.elcWLE.add(window, 'pointerdown', e=>{e.stopPropagation(); fnc()});
		this.elcWLE.add(window, 'keydown', (e: any)=> {
			//if (! e.isTrusted) return;
			if (e['isComposing']) return; // サポートしてない環境でもいける書き方
			e.stopPropagation();
			fnc();
		});
		this.procWheel4wle(this.elcWLE, fnc);

		return true;
	}
	private procWheel4wle = (_elc: EventListenerCtn, _fnc: ()=> void)=> {};
	private	elcWLE	= new EventListenerCtn;


	// イベントを全消去
	private clear_event(hArg: HArg) {
		const glb = argChk_Boolean(hArg, 'global', false);
		const h = glb ?this.hGlobalEvt2Fnc :this.hLocalEvt2Fnc;
		for (const nm in h) this.clear_eventer(nm, h[nm]);
		if (glb) this.hGlobalEvt2Fnc = {}; else this.hLocalEvt2Fnc = {};

		return false;
	}
		private clear_eventer(KeY: string, e2f: IEvt2Fnc) {
			if (KeY.slice(0, 4) !== 'dom=') return;
			this.getHtmlElmList(KeY).el.forEach(v=> v.removeEventListener('click', e2f));
		}


	// イベントを予約
	private event(hArg: HArg) {
		const KeY = hArg.key;
		if (! KeY) throw 'keyは必須です';
		const key = KeY.toLowerCase();

		const call = argChk_Boolean(hArg, 'call', false);
		const h = argChk_Boolean(hArg, 'global', false)
			? this.hGlobalEvt2Fnc
			: this.hLocalEvt2Fnc;
		if (argChk_Boolean(hArg, 'del', false)) {
			if (hArg.fn || hArg.label || call) throw 'fn/label/callとdelは同時指定できません';

			this.clear_eventer(KeY, h[key]);

			// その他・キーボードイベント
			delete h[key];
			return false;
		}
		hArg.fn = hArg.fn ?? this.scrItr.scriptFn;

		// domイベント
		if (KeY.slice(0, 4) === 'dom=') {
			const g = this.getHtmlElmList(KeY);
			if (g.el.length === 0 && argChk_Boolean(hArg, 'need_err', true)) throw `HTML内にセレクタ（${g.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;

			const ie = g.el[0] as HTMLInputElement;
			const type = ie?.type ?? '';
			((type === 'range' || type === 'checkbox' || type === 'text'
			|| type === 'textarea') ?['input', 'change'] :['click'])
			.forEach(v=> g.el.forEach(elm=> this.elc.add(elm, v, e=> {
				if (! this.isWait || this.layMng.getFrmDisabled(g.id)) return;

				const e2 = (elm as HTMLElement).dataset;
				for (const k2 in e2) if (e2.hasOwnProperty(k2)) this.val.setVal_Nochk('tmp', `sn.event.domdata.${k2}`, e2[k2]);
				this.fire(KeY, e);
			})));

			// return;	// hGlobalEvt2Fnc(hLocalEvt2Fnc)登録もする
		}

		// その他・キーボードイベント
		h[key] = ()=> this.main.resumeByJumpOrCall(hArg);

		return false;
	}
	private	getHtmlElmList(KeY: string): {el: NodeListOf<HTMLElement>, id: string, sel: string} {
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


	private goTxt = ()=> this.layMng.goTxt();


	// 行末クリック待ち
	private l(hArg: HArg) {
		if (! this.val.getVal('tmp:sn.tagL.enabled')) {this.goTxt(); return false;}

		// 既読スキップ時
		if (this.val.getVal('tmp:sn.skip.enabled')) {
			if (! this.val.getVal('tmp:sn.skip.all')
			&& ! this.scrItr.isNextKidoku) this.fncCancelSkip();	// 未読で停止
			else if ('ps'.includes(String(this.val.getVal('sys:sn.skip.mode')))) return false;	// 既読スキップ
		}

		// 自動読み進み
		if (this.val.getVal('tmp:sn.auto.enabled')) return this.wait({
			time: Number(this.scrItr.isKidoku
				? this.val.getVal('sys:sn.auto.msecLineWait_Kidoku')
				: this.val.getVal('sys:sn.auto.msecLineWait'))
		});

		if (argChk_Boolean(hArg, 'visible', true)) this.layMng.breakLine();

		this.waitEventBase(()=> this.main.resume());
		return true;	// waitEventBase()したらreturn true;
	}


	// 改ページクリック待ち
	private p(hArg: HArg) {
		// 既読スキップ時
		if (this.val.getVal('tmp:sn.skip.enabled')) {
			if (! this.val.getVal('tmp:sn.skip.all')
			&& ! this.scrItr.isNextKidoku) this.fncCancelSkip();	// 未読で停止
			else if ('s' === String(this.val.getVal('sys:sn.skip.mode'))) {this.goTxt(); return false;}	// 既読スキップ
		}

		// 自動読み進み
		if (this.val.getVal('tmp:sn.auto.enabled')) return this.wait({
			time: Number(this.scrItr.isKidoku
				? this.val.getVal('sys:sn.auto.msecPageWait_Kidoku')
				: this.val.getVal('sys:sn.auto.msecPageWait'))
		});

		if (argChk_Boolean(hArg, 'visible', true)) this.layMng.breakPage();

		this.waitEventBase(
			this.layMng.getCurrentTxtlayFore() && argChk_Boolean(hArg, 'er', false)
				? ()=> {this.hTag.er(hArg); this.main.resume();}
				: ()=> this.main.resume(),
		);
		return true;	// waitEventBase()したらreturn true;
	}


	// スキップ中断予約
	private	fncCancelSkip	= ()=> {};
	private set_cancel_skip() {
		this.fncCancelSkip = ()=> {
			this.fncCancelSkip = ()=> {};

			this.val.setVal_Nochk('tmp', 'sn.tagL.enabled', true);	// 頁末まで一気に読み進むか(l無視)
			this.val.setVal_Nochk('tmp', 'sn.skip.enabled', false);// 次の選択肢(/未読)まで進むが有効か
			this.val.setVal_Nochk('tmp', 'sn.auto.enabled', false);// 自動読みすすみモードかどうか

			this.layMng.setNormalWaitTxtLayer();
		};

		this.unregisterClickEvts();

		return false;
	}
	private unregisterClickEvts() {
		const len = this.scrItr.lenCallStk;
		for (let i=0; i<len; ++i) {
			const cs = this.scrItr.getCallStk(i);
			if (! cs) continue;
			const hE1T = cs.hEvt1Time;
			if (! hE1T) continue;

			delete hE1T['Click'];
			delete hE1T['Enter'];
			delete hE1T['ArrowDown'];
			delete hE1T['wheel.y>0'];
		}
	}


	// ウェイトを入れる
	private wait(hArg: HArg) {
		// 既読スキップ時
		if (this.val.getVal('tmp:sn.skip.enabled')) {
			if (! this.val.getVal('tmp:sn.skip.all')
			&& ! this.scrItr.isNextKidoku) this.fncCancelSkip();	// 未読で停止
			else return false;	// 既読スキップ
		}

		const tw = new Tween.Tween()
		.to({}, uint(argChk_Num(hArg, 'time', NaN)))
		.onComplete(()=> {tw.stop(); this.main.resume()})
			// TODO: global=trueのとき、resumeしてはいけない
		.start();

		return this.waitEvent(
			()=> tw.end(),
			argChk_Boolean(hArg, 'canskip', true),
			argChk_Boolean(hArg, 'global', false),
		);
	}

	// クリックを待つ
	private waitclick(): boolean {
		// 既読スキップ時
		if (this.val.getVal('tmp:sn.skip.enabled')) {
			if (! this.val.getVal('tmp:sn.skip.all')
			&& ! this.scrItr.isNextKidoku) this.fncCancelSkip();	// 未読で停止
			else return false;	// 既読スキップ
		}

		this.waitEventBase(()=> this.main.resume());
		return true;	// waitEventBase()したらreturn true;
	}

	isSkipKeyDown(): boolean {
		for (const v in this.hDownKeys) if (this.hDownKeys[v] === 2) return true;
		return false;
	}
	// 0:no push  1:one push  2:push repeating
	private	readonly hDownKeys	: {[name: string]: number}	= {
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
