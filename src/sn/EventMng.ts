/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, IEvtMng, argChk_Boolean, addStyle, mesErrJSON} from './CmnLib';
import {IHTag, HArg} from './Grammar';
import {IVariable, IMain, IHEvt2Fnc} from './CmnInterface';
import {LayerMng} from './LayerMng';
import {ScriptIterator} from './ScriptIterator';
import {TxtLayer} from './TxtLayer';
import {EventListenerCtn} from './EventListenerCtn';
import {Button} from './Button';
import {FocusMng} from './FocusMng';
import {Main} from './Main';
import {SoundMng} from './SoundMng';
import {Config} from './Config';
import {SysBase} from './SysBase';
import {SEARCH_PATH_ARG_EXT} from './ConfigBase';
import {ReadState} from './ReadState';

import {Container, Application, utils} from 'pixi.js';
const {GamepadListener} = require('gamepad.js');
import {createPopper, Instance as InsPop} from '@popperjs/core';

export class EventMng implements IEvtMng {
	readonly	#elc		= new EventListenerCtn;

	readonly	#gamepad	= new GamepadListener({
		analog	: false,
		deadZone: 0.3,
	});
	readonly	#fcs		= new FocusMng;

	#rs	: ReadState;

	constructor(private readonly cfg: Config, private readonly hTag: IHTag, readonly appPixi: Application, private readonly main: IMain, readonly layMng: LayerMng, readonly val: IVariable, sndMng: SoundMng, private readonly scrItr: ScriptIterator, readonly sys: SysBase) {
		//	イベント
		hTag.clear_event	= o=> ReadState.clear_event(o);	// イベントを全消去
		// enable_event		// LayerMng.ts内で定義		//イベント有無の切替
		hTag.event			= o=> this.#event(o);	// イベントを予約
		//hTag.gesture_event	（形式変更）			// ジェスチャイベントを予約
		hTag.l				= o=> this.#rs.l(o);		// 行末クリック待ち
		hTag.p				= o=> this.#rs.p(o);		// 改ページクリック待ち
		hTag.s				= o=> this.#rs.s(o);		// 停止する
		hTag.set_cancel_skip= ()=> false;			// (2023/05/27 廃止)スキップ中断予約
		hTag.set_focus		= o=> this.#set_focus(o);	// フォーカス移動
		hTag.wait			= o=> this.#rs.wait(o);		// ウェイトを入れる
		hTag.waitclick		= o=> this.#rs.waitclick(o);	// クリックを待つ

		// ラベル・ジャンプ
		hTag.page			= o=> this.#rs.page(o);		// ページ移動

		sndMng.setEvtMng(this);
		scrItr.setOtherObj(this, layMng);
		TxtLayer.setEvtMng(this, sys, scrItr);
		layMng.setEvtMng(this);
		sys.setFire((KEY, e)=> this.fire(KEY, e));

		if (CmnLib.isDbg) {
			const hHook	: {[type: string]: ()=> void}	= {
				pause	: ()=> {
//					this.#isDbgBreak = true;
					if (! this.#rs.isWait) return;

					const hArg: HArg = {};
					scrItr.recodeDesign(hArg);
					sys.callHook('_enterDesign', hArg);
					sys.send2Dbg('_enterDesign', hArg);
				},
//				stopOnBreakpoint		: ()=> this.#isDbgBreak = true,
//				stopOnDataBreakpoint	: ()=> this.#isDbgBreak = true,
//				continue				: ()=> this.#isDbgBreak = false,
//				disconnect				: ()=> this.#isDbgBreak = false,
			};
			hHook.attach =
			hHook.stopOnEntry =
			hHook.stopOnStep =
			hHook.stopOnStepIn =
			hHook.stopOnStepOut =
			hHook.stopOnBackstep = hHook.pause;

			sys.addHook(type=> hHook[type]?.());
		}

		addStyle(`
.sn_hint {
	background-color: #3c3225;
	color: white;
	padding: 4px 8px;
	border-radius: 4px;
	font-size: 1.2em;
	z-index: 10000;
	pointer-events: none;
	user-select: none;
}

.sn_hint_ar,
.sn_hint_ar::before {
	position: absolute;
	width: 8px;
	height: 8px;
	background: inherit;
}
.sn_hint_ar {
	visibility: hidden;
}
.sn_hint_ar::before {
	visibility: visible;
	content: '';
	transform: rotate(45deg);
}

.sn_hint[data-popper-placement^='top']		> .sn_hint_ar {bottom: -4px;}
.sn_hint[data-popper-placement^='bottom']	> .sn_hint_ar {top: -4px;}
.sn_hint[data-popper-placement^='left']		> .sn_hint_ar {right: -4px;}
.sn_hint[data-popper-placement^='right']	> .sn_hint_ar {left: -4px;}
`);

		for (const v of Array.from(document.getElementsByClassName('sn_hint'))) v.parentElement?.removeChild(v);
			// ギャラリーリロード用初期化
		Main.cvs.parentElement?.insertAdjacentHTML('beforeend', `
<div class="sn_hint" role="tooltip">
	<span>Dummy</span>
	<div class="sn_hint_ar" data-popper-arrow></div>
</div>`);
		this.#elmHint = document.querySelector('.sn_hint') as HTMLElement;
		this.#spanHint = this.#elmHint.querySelector('span')!;
		this.#popper = createPopper(this.#elmV, this.#elmHint);
		this.#elmHint.hidden = true;


		appPixi.stage.interactive = true;
		if (CmnLib.isMobile) appPixi.stage.on('pointerdown', e=> this.fire('click', e));
		else this.#elc.add(appPixi.stage, 'pointerdown', e=> {
			switch (e.data.button) {
				case 0:	this.fire('click', e);	break;
				case 1:	this.fire('middleclick', e);	break;
			}
		});
		this.#elc.add(window, 'keydown', e=> this.#ev_keydown(e));
		this.#elc.add(Main.cvs, 'contextmenu', e=> this.#ev_contextmenu(e));

		// 言語切り替え通知
		const fncUpdNavLang = ()=> val.setVal_Nochk('tmp', 'const.sn.navigator.language', navigator.language);
		// TODO: アプリ版で[event key=sn:chgNavLang]が発生しない件
//		this.#elc.add(globalThis, 'languagechange', e=> {
		this.#elc.add(window, 'languagechange', e=> {
//console.log(`fn:EventMng.ts languagechange `);
			fncUpdNavLang();
			this.fire('sn:chgNavLang', e);
			utils.clearTextureCache();
		});
		fncUpdNavLang();

		// ダークモード切り替え検知
		const fncMql = (mq: MediaQueryList | MediaQueryListEvent)=> {
			CmnLib.isDarkMode = mq.matches;
			val.setVal_Nochk('tmp', 'const.sn.isDarkMode', CmnLib.isDarkMode);
		};
		const mql = globalThis.matchMedia('(prefers-color-scheme: dark)');
		fncMql(mql);
		this.#elc.add(mql, 'change', e=> {
			fncMql(e);
			this.fire('sn:chgDarkMode', e);
		});

		let procWheel4wle = (_elc: EventListenerCtn, _onIntr: ()=> void)=> {};
		if ('WheelEvent' in window) {
			this.#elc.add(Main.cvs, 'wheel', e=> this.#ev_wheel(e), {passive: true});
			this.#resvFlameEvent4Wheel = win=> this.#elc.add(win, 'wheel', e=> this.#ev_wheel(e), {passive: true});

			procWheel4wle = (elc: EventListenerCtn, fnc: ()=> void)=> elc.add(Main.cvs, 'wheel', e=> {
				//if (! e.isTrusted) return;
				if (e['isComposing']) return; // サポートしてない環境でもいける書き方
				if (e.deltaY <= 0) return;

				e.stopPropagation();
				fnc();
			});
		}
		ReadState.init((rs: ReadState)=> this.#rs = rs, main, val, layMng, scrItr, sndMng, hTag, this.#fcs, procWheel4wle, this.#elmHint, cfg);

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
			if (! document.hasFocus()) return;
//console.log(`fn:EventMng.ts line:155 👺 'gamepad:button' detail:%o`, e.detail);
			if (e.detail.button % 2 === 0) {
				const cmp = this.#fcs.getFocus();
				((! cmp || cmp instanceof Container) ?globalThis :cmp)
				.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', bubbles: true}));
			}
			else Main.cvs.dispatchEvent(new Event('contextmenu'));
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
		this.#elc.add(win, 'keydown', e=> this.#ev_keydown(e));
		this.#elc.add(win, 'contextmenu', e=> this.#ev_contextmenu(e));
		this.#resvFlameEvent4Wheel(win);
	}
	#resvFlameEvent4Wheel = (_win: Window)=> {};
	#ev_keydown(e: KeyboardEvent) {
		//if (! e.isTrusted) return;
		if (e['isComposing']) return;	// サポートしてない環境でもいける書き方

		if (e.key in this.#hDownKeys) this.#hDownKeys[e.key] = e.repeat ?2 :1;

		this.fire(SysBase.modKey(e) + e.key, e);
	}
	#ev_contextmenu(e: MouseEvent) {
		//if (! e.isTrusted) return;

		this.fire(this.#modKey4MouseEvent(e) +'rightclick', e);
		e.preventDefault();		// イベント未登録時、メニューが出てしまうので
	}
		#modKey4MouseEvent(e: MouseEvent) {
			return (e.altKey ?'alt+' :'')
			+	(e.ctrlKey ?'ctrl+' :'')
			+	(e.metaKey ?'meta+' :'')
			+	(e.shiftKey ?'shift+' :'');
		}

	#ev_wheel(e: WheelEvent) {
		//if (! e.isTrusted) return;

		if (this.#wheeling) {this.#extend_wheel = true; return}
		this.#wheeling = true;
		this.#ev_wheel_waitstop();

		// 今のところ縦回転ホイールのみ想定
		const key = this.#modKey4MouseEvent(e)
		+	(e.deltaY > 0 ?'downwheel' :'upwheel');
		this.fire(key, e);
	}
	#wheeling = false;
	#extend_wheel = false;
	#ev_wheel_waitstop() {
		setTimeout(()=> {	// clearTimeout()不要と判断
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
	}

	fire(KEY: string, e: Event) {this.#rs.fire(KEY, e)}

	popLocalEvts(): IHEvt2Fnc {return ReadState.popLocalEvts()}
	pushLocalEvts(h: IHEvt2Fnc) {ReadState.pushLocalEvts(h)}

	unButton(ctnBtn: Container) {this.#fcs.remove(ctnBtn)}
	button(hArg: HArg, ctnBtn: Container, normal: ()=> void, hover: ()=> boolean, clicked: ()=> void) {
		if (! hArg.fn && ! hArg.label && ! hArg.url) this.main.errScript('fnまたはlabelまたはurlは必須です');
		hArg.fn ??= this.scrItr.scriptFn;

		// クリックイベント
		ctnBtn.interactive = true;
		ctnBtn.cursor = 'pointer';
		const key = hArg.key?.toLowerCase() ?? ' ';
		const glb = argChk_Boolean(hArg, 'global', false);
		ReadState.setEvt2Fnc(glb, key, ()=> this.main.resumeByJumpOrCall(hArg));
		ctnBtn.on('pointerdown', (e: any)=> this.#rs.fire(key, e));

		// マウスカーソルを載せるとヒントをツールチップス表示する
		const onHint = hArg.hint ?()=> this.#dispHint(hArg, ctnBtn) :()=> {};
		// マウスオーバーでの見た目変化
		const nr = ()=> {normal(); this.#elmHint.hidden = true};
		const hv = ()=> {onHint(); return hover()};
		ctnBtn.on('pointerover', hv);
		ctnBtn.on('pointerout', ()=> {if (this.#fcs.isFocus(ctnBtn)) hv(); else nr()});
		ctnBtn.on('pointerdown', ()=> {
			this.#elmHint.hidden = true;
			const f = this.#fcs.getFocus();
			clicked();
			if (f instanceof Button) f.normal();// 旧フォーカスボタンを通常状態に
		});
		ctnBtn.on('pointerup', CmnLib.isMobile
			? nr
			: ()=> {if (this.#fcs.isFocus(ctnBtn)) hv(); else nr()}
		);
		// フォーカス処理対象として登録
		this.#fcs.add(ctnBtn, hv, nr);

		// 音関係
		if (hArg.clickse) {	//	clickse	クリック時に効果音
			hArg.clicksebuf ??= 'SYS';
			this.cfg.searchPath(hArg.clickse, SEARCH_PATH_ARG_EXT.SOUND);// 存在チェック
			ctnBtn.on('pointerdown', ()=> {
				this.hTag.playse({fn: hArg.clickse, buf: hArg.clicksebuf, join: false});
			});
		}
		if (hArg.enterse) {	//	enterse	ボタン上にマウスカーソルが載った時に効果音
			hArg.entersebuf ??= 'SYS';
			this.cfg.searchPath(hArg.enterse, SEARCH_PATH_ARG_EXT.SOUND);// 存在チェック
			ctnBtn.on('pointerover', ()=> {
				this.hTag.playse({fn: hArg.enterse, buf: hArg.entersebuf, join: false});
			});
		}
		if (hArg.leavese) {	//	leavese	ボタン上からマウスカーソルが外れた時に効果音
			hArg.leavesebuf ??= 'SYS';
			this.cfg.searchPath(hArg.leavese, SEARCH_PATH_ARG_EXT.SOUND);// 存在チェック
			ctnBtn.on('pointerout', ()=> {
				this.hTag.playse({fn: hArg.leavese, buf: hArg.leavesebuf, join: false});
			});
		}

		if (hArg.onenter) {
			// マウス重なり（フォーカス取得）時、ラベルコール。必ず[return]で戻ること
			const k = key + hArg.onenter.toLowerCase();
			const o: HArg = {fn: hArg.fn, label: hArg.onenter, call: true, key: k};
			ReadState.setEvt2Fnc(glb, k, ()=> this.main.resumeByJumpOrCall(o));
			ctnBtn.on('pointerover', (e: any)=> this.fire(k, e));
		}
		if (hArg.onleave) {
			// マウス外れ（フォーカス外れ）時、ラベルコール。必ず[return]で戻ること
			const k = key + hArg.onleave.toLowerCase();
			const o: HArg = {fn: hArg.fn, label: hArg.onleave, call: true, key: k};
			ReadState.setEvt2Fnc(glb, k, ()=> this.main.resumeByJumpOrCall(o));
			ctnBtn.on('pointerout', (e: any)=> this.fire(k, e));
		}
	}
	readonly	#elmV = {
		getBoundingClientRect: (x = 0, y = 0)=> DOMRect.fromRect({x, y, width: 0, height: 0,}),
	};
	readonly	#elmHint	: HTMLElement;
	readonly	#spanHint	: HTMLElement;
	readonly	#popper		: InsPop;
	readonly	#oHintOpt	= {
		placement: 'bottom',
		modifiers: [
			{	// Flip | Popper https://popper.js.org/docs/v2/modifiers/flip/
				name: 'flip',
				options: {
					fallbackPlacements: ['top', 'bottom'],
				},
			},
		],
	};
	#dispHint(hArg: HArg, ctnBtn: Container) {
		const rctBtn = ctnBtn instanceof Button
			? ctnBtn.getBtnBounds()
			: ctnBtn.getBounds();
		const isLink = (hArg[':タグ名'] === 'link');
		if (! isLink) {
			const cpp = ctnBtn.parent.parent;
			rctBtn.x += cpp.x;	// レイヤ位置を加算
			rctBtn.y += cpp.y;
		}
		if (! hArg.hint) {this.#elmHint.hidden = true; return}

		this.#elmHint.style.cssText = `position:${this.#elmHint.style.position}; transform:${this.#elmHint.style.transform};`+ (hArg.hint_style ?? '');
		this.#spanHint.style.cssText = '';
		this.#spanHint.textContent = hArg.hint ?? '';

		try {
			const o = hArg.hint_opt ?{...this.#oHintOpt, ...JSON.parse(hArg.hint_opt)}: this.#oHintOpt;
			this.#popper.setOptions(o);
		} catch (e) {console.error(mesErrJSON(hArg, 'hint_opt', e.message))}

		this.#elmV.getBoundingClientRect = ()=> DOMRect.fromRect({
			x: this.sys.ofsLeft4elm +rctBtn.x *this.sys.cvsScale,
			y: this.sys.ofsTop4elm  +rctBtn.y *this.sys.cvsScale,
			width: rctBtn.width, height: rctBtn.height,
		});
		this.#popper.update();

		this.#elmHint.hidden = false;
	}
	hideHint() {this.#elmHint.hidden = true}
	cvsResize() {this.hideHint()}


	#event(hArg: HArg): boolean {
		const KeY = hArg.key;
		if (! KeY) throw 'keyは必須です';
		const key = KeY.toLowerCase();

		const call = argChk_Boolean(hArg, 'call', false);
		const glb = argChk_Boolean(hArg, 'global', false);
		if (argChk_Boolean(hArg, 'del', false)) {
			if (hArg.fn || hArg.label || call || hArg.url) throw 'fn/label/callとdelは同時指定できません';

			ReadState.clear_eventer(KeY, glb, key);

			// その他・キーボードイベント
			return false;
		}

		if (! hArg.fn && ! hArg.label && ! hArg.url) throw 'fn,label,url いずれかは必須です';
		hArg.fn ??= this.scrItr.scriptFn;

		// domイベント
		if (KeY.slice(0, 4) === 'dom=') {
			const g = ReadState.getHtmlElmList(KeY);
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
					if (! this.#rs.isWait || this.layMng.getFrmDisabled(g.id)) return;
					if (v === 'keydown' && e.key !== 'Enter') return;

					const d = elm.dataset;
					for (const [k, v] of Object.entries(d)) this.val.setVal_Nochk('tmp', `sn.event.domdata.${k}`, v);
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
		ReadState.setEvt2Fnc(glb, key, ()=> this.main.resumeByJumpOrCall(hArg));

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

	// フォーカス移動
	#set_focus(hArg: HArg) {
		const {add, del, to} = hArg;
		if (add?.slice(0, 4) === 'dom=') {
			const g = ReadState.getHtmlElmList(add);
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

		if (del?.slice(0, 4) === 'dom=') {
			const g = ReadState.getHtmlElmList(del);
			if (g.el.length === 0 && argChk_Boolean(hArg, 'need_err', true)) throw `HTML内にセレクタ（${g.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;

			g.el.forEach(elm=> this.#fcs.remove(elm));
			return false;
		}

		if (! to) throw '[set_focus] add か to は必須です';
		switch (to) {
			case 'null':	this.#fcs.blur();	break;
			case 'next':	this.#fcs.next();	break;
			case 'prev':	this.#fcs.prev();	break;
		}
		return false;
	}


	// テキスト表示待ちと処理終了待ち（予約イベント受付しない）
	//	waitEvent を使用する場合、通常 break 時は breakLimitedEvent() すること
	readonly	waitEvent = (evnm: string, hArg: HArg, onIntr: ()=> void)=> this.#rs.waitEvent(evnm, hArg, onIntr);
	breakEvent(evnm: string) {this.#rs.breakEvent(evnm)}


	// キー押下によるスキップ中か
	get	isSkipping(): boolean {
		if (this.#rs.isSkipping) return true;
		return Object.keys(this.#hDownKeys).some(k=> this.#hDownKeys[k] === 2);
	}
	// 0:no push  1:one push  2:push repeating
	readonly #hDownKeys	: {[key: string]: number}	= {
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
