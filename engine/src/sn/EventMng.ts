/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, HArg, IHTag, IVariable, IMain, IEvtMng, IEvt2Fnc, IHEvt2Fnc, uint} from './CmnLib';
import {LayerMng} from './LayerMng';
import {ScriptIterator} from './ScriptIterator';
import {TxtLayer} from './TxtLayer';
import {EventListenerCtn} from './EventListenerCtn';

import TWEEN = require('@tweenjs/tween.js');
import { interaction, DisplayObject, Application } from 'pixi.js';
import { SoundMng } from './SoundMng';
import { Config } from './Config';

const Hammer = require('hammerjs');

export class EventMng implements IEvtMng {
	private	elc			= new EventListenerCtn;

	private	enMDownTap	= 'pointerdown';
	private ham			= null;
	private hHamEv		= {
	//	tap			: null,
		press		: null,	// 長押し
		//swipe		: null,
		swipeleft	: null,
		swiperight	: null,
		swipeup		: null,
		swipedown	: null,
	};

	constructor(private cfg: Config, private hTag: IHTag, private appPixi: Application, private main: IMain, private layMng: LayerMng, private val: IVariable, sndMng: SoundMng, private scrItr: ScriptIterator) {
		sndMng.setEvtMng(this);
		scrItr.setOtherObj(this, layMng);
		TxtLayer.setEvtMng(main, this);
		layMng.setEvtMng(this);
		layMng.setEvtMng(this);

		// イベント
		hTag.clear_event	= o=> this.clear_event(o);	// イベントを全消去
		// enable_event		//イベント有無の切替			// LayerMng.ts内で定義
		hTag.event			= o=> this.event(o);		// イベントを予約
		//hTag.gesture_event	（形式変更）			// ジェスチャイベントを予約
		hTag.l				= o=> this.l(o);			// 行末クリック待ち
		hTag.p				= o=> this.p(o);			// 改ページクリック待ち
		hTag.s				= ()=> {this.stdWait(()=> {}, false); return true;};
			// 停止する
			// stdWait()したらreturn true;
		hTag.set_cancel_skip= ()=> this.set_cancel_skip();	// スキップ中断予約
		hTag.wait			= o=> this.wait(o);				// ウェイトを入れる
		hTag.waitclick		= ()=> {this.stdWait(()=> this.main.resume()); return true;}	// クリックを待つ
			// stdWait()したらreturn true;

//		switch (platform.os.family) {
		switch (String(val.getVal('tmp:const.sn.platform.os.family'))) {
			case 'Android':
			case 'iOS':
			case 'Windows Phone':
//				this.enMDownTap	= 'tap';
				break;
		}
		//this.enMDownTap	= 'tap';

		this.ham = new Hammer(appPixi.view, {recognizers: [
			//	[Hammer.Tap],
				[Hammer.Press],
				[Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}],
				//[Hammer.Rotate],
				//[Hammer.Pinch, { enable: false }, ['rotate']],
				// http://hammerjs.github.io/api/
			]})
		/*const manager = new Hammer.Manager(document.body, {recognizers: [
			[Hammer.Tap, {pointers: 2}],
		]});*/
		// Add the recognizer to the manager.
		this.hHamEv['tap2'] = null;
		for (const key in this.hHamEv) {
			const fnc = this.hHamEv[key] = e=> {
				val.defTmp('sn.eventArg', e.type);
				val.defTmp('sn.eventArg.pointers', e.pointers);
				this.defEvt2Fnc(e, e.type);
			}
			this.ham.on(key, fnc);
		}
		/*manager.add(new Hammer.Tap({event: 'tap2', pointers: 2}));
		manager.on('tap2', e=> {
			val.defTmp('sn.eventArg', e.type);
		//console.log(e.type);	// これどうなってる？　最前面にデバッグ情報表示ほしい。
		//hTag['title']({text: 'DBG:'+ e.type});
			this.evt2Fnc(e, e.type);
		});*/


		appPixi.stage.interactive = true;
		this.elc.add(appPixi.stage, this.enMDownTap, e=> this.defEvt2Fnc(e, 'Click'));
		this.elc.add(window, 'keydown', (e: any)=> {
			//if (! e.isTrusted) return;
			if (e['isComposing']) return;	// サポートしてない環境でもいける書き方

			const key = (e.altKey ?(e.key == 'Alt' ?'' :'alt+') :'')
			+	(e.ctrlKey ?(e.key == 'Control' ?'' :'ctrl+') :'')
			+	(e.shiftKey ?(e.key == 'Shift' ?'' :'shift+') :'')
			+	e.key
			this.defEvt2Fnc(e, key);
		});
		if (window['WheelEvent']) this.elc.add(appPixi.view, 'wheel', (e: any)=> {
			//if (! e.isTrusted) return;
			if (e['isComposing']) return;	// サポートしてない環境でもいける書き方

			const key = (e.altKey ?'alt+' :'')
			+	(e.ctrlKey ?'ctrl+' :'')
			+	(e.shiftKey ?'shift+' :'')
			+	`${e.type}.`
			+	(e.deltaX != 0 ?(e.deltaX > 0 ?'x>0' :'x<0') :'')
			+	(e.deltaY != 0 ?(e.deltaY > 0 ?'y>0' :'y<0') :'')
			+	(e.deltaZ != 0 ?(e.deltaZ > 0 ?'z>0' :'z<0') :'')
			this.defEvt2Fnc(e, key);
		});
		this.elc.add(appPixi.view, 'contextmenu', (e: any)=> {
			//if (! e.isTrusted) return;

			const key = (e.altKey ?(e.key == 'Alt' ?'' :'alt+') :'')
			+	(e.ctrlKey ?(e.key == 'Control' ?'' :'ctrl+') :'')
			+	(e.shiftKey ?(e.key == 'Shift' ?'' :'shift+') :'')
			+	'rightclick'
			this.defEvt2Fnc(e, key);
			e.preventDefault();		// イベント未登録時、メニューが出てしまうので
		});

		// Gamepad APIの利用 - ウェブデベロッパーガイド | MDN https://developer.mozilla.org/ja/docs/Web/Guide/API/Gamepad
		// Gamepad の接続
		this.elc.add(window, 'gamepadconnected', (e: any)=> {
			if (CmnLib.devtool) console.log('👺 Gamepad connected at index %d: %s. %d buttons, %d axes.',
			e['gamepad'].index, e['gamepad'].id,
			e['gamepad'].buttons.length, e['gamepad'].axes.length);

			const key = e.type;
			this.defEvt2Fnc(e, key);
		});
		// Gamepad の切断
		this.elc.add(window, 'gamepaddisconnected', (e: any)=> {
			if (CmnLib.devtool) console.log('👺 Gamepad disconnected from index %d: %s',
				e['gamepad'].index, e['gamepad'].id);

			const key = e.type;
			this.defEvt2Fnc(e, key);
		});

		this.elc.add(window, 'keydown', (e: any)=> {
			if (e['isComposing']) return;	// サポートしてない環境でもいける書き方

			if (e.key in this.hDownKeys) this.hDownKeys[e.key] = e.repeating ?2 :1;
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
	destroy() {
		this.elc.clear();

		for (const key in this.hHamEv) {
			this.ham.off(key);
			//this.ham.off(key, this.hHamEv[key]);
		}
		this.ham.destroy();

		this.scrItr.setOtherObj(null, null);
		TxtLayer.setEvtMng(null, null);
		this.layMng.setEvtMng(null);
	}

	private hLocalEvt2Fnc	: IHEvt2Fnc = {};
	private hGlobalEvt2Fnc	: IHEvt2Fnc = {};
	private defEvt2Fnc(e: Event, key: string) {
		//if (CmnLib.devtool) console.log(`👺 <(key:\`${key}\` type:${e.type})`);
		const ke = this.hLocalEvt2Fnc[key]
				|| this.hGlobalEvt2Fnc[key];
		if (! ke) return;
		if ('preventDefault' in e) e.preventDefault();

		e.stopPropagation();
		if (this.layMng.clickTxtLay()) return;

		ke(e);
	}

	popLocalEvts(): IHEvt2Fnc {
		const ret = this.hLocalEvt2Fnc;
		this.hLocalEvt2Fnc = {};
		return ret;
	}
	pushLocalEvts(a: IHEvt2Fnc) {this.hLocalEvt2Fnc = a;}

	// stdWait()したらreturn true;
	stdWait(fnc: (e: interaction.InteractionEvent)=> void, stdEvt = true) {
		this.goTxt();
		if (stdEvt) {
			//hTag.event({key:'click', breakout: fnc});
			//hTag.event({key:'middleclick', breakout: fnc});
			//	hTag.event()は内部で使わず、こうする
			const fncKey = ()=> fnc(null);
			this.hLocalEvt2Fnc['Click'] = fncKey;
			//this.hTag.event({key:'enter', breakout: fnc});
			//hTag.event({key:'down', breakout: fnc});
			//	hTag.event()は内部で使わず、こうする
			this.hLocalEvt2Fnc['Enter'] = fncKey;
			this.hLocalEvt2Fnc['ArrowDown'] = fncKey;

			// hTag.event({key:'downwheel', breakout: fnc});
			//	hTag.event()は内部で使わず、こうする
			this.hLocalEvt2Fnc['wheel.y>0'] = fncKey;
		}

		// evtfncWait();
		this.scrItr.saveKidoku(); // これはそのままか
		this.fncCancelSkip();
		//this.hHook_waiting();
	}

	button(hArg: HArg, em: DisplayObject) {
		em.interactive = em.buttonMode = true;
		const key = hArg.key;
		const glb = CmnLib.argChk_Boolean(hArg, 'global', false);
		if (glb) this.hGlobalEvt2Fnc[key] = ()=> this.main.resumeByJumpOrCall(hArg);
			else this.hLocalEvt2Fnc[key] = ()=> this.main.resumeByJumpOrCall(hArg);
		em.on('pointerdown', (e: any)=> this.defEvt2Fnc(e, key));

//	hint	n		String	マウスカーソルを載せるとヒントをチップス表示する

		if (hArg.clickse) {
			this.cfg.searchPath(hArg.clickse, Config.EXT_SOUND);	// 存在チェック
			em.on('pointerdown', ()=> {
				//	clickse	効果音ファイル名	クリック時に効果音
				const o = {fn: hArg.clickse, join: false};
				if (hArg.clicksebuf) o['buf'] = hArg.clicksebuf;
				this.hTag.playse(o);
			});
		}
		if (hArg.enterse) {
			this.cfg.searchPath(hArg.enterse, Config.EXT_SOUND);	// 存在チェック
			em.on('pointerover', ()=> {
				//	enterse	効果音ファイル名	ボタン上にマウスカーソルが載った時に効果音
				const o = {fn: hArg.enterse, join: false};
				if (hArg.entersebuf) o['buf'] = hArg.entersebuf;
				this.hTag.playse(o);
			});
		}
		if (hArg.leavese) {
			this.cfg.searchPath(hArg.leavese, Config.EXT_SOUND);	// 存在チェック
			em.on('pointerout', ()=> {
				//	leavese	効果音ファイル名	ボタン上からマウスカーソルが外れた時に効果音
				const o = {fn: hArg.leavese, join: false};
				if (hArg.leavesebuf) o['buf'] = hArg.leavesebuf;
				this.hTag.playse(o);
			});
		}
		if (hArg.onenter) {
			//	onenter	ラベル名	マウス重なり（フォーカス取得）時、指定したラベルをコールする。 必ず[return]で戻ること。
			const key2 = key + hArg.onenter;
			const o: HArg = {fn: hArg.fn, label: hArg.onenter, call: 'true', key: key2};
			if (glb) this.hGlobalEvt2Fnc[key2] = ()=>this.main.resumeByJumpOrCall(o);
			else this.hLocalEvt2Fnc[key2] = ()=> this.main.resumeByJumpOrCall(o);
			em.on('pointerover', (e: any)=> this.defEvt2Fnc(e, key2));
		}
		if (hArg.onleave) {
			//	onleave	ラベル名	マウス重なり外れ（フォーカス外れ）時、指定したラベルをコールする。 必ず[return]で戻ること。
			const key2 = key + hArg.onleave;
			const o: HArg = {fn: hArg.fn, label: hArg.onleave, call: 'true', key: key2};
			if (glb) this.hGlobalEvt2Fnc[key2] = ()=>this.main.resumeByJumpOrCall(o);
			else this.hLocalEvt2Fnc[key2] = ()=> this.main.resumeByJumpOrCall(o);
			em.on('pointerout', (e: any)=> this.defEvt2Fnc(e, key2));
		}

		// レスポンス向上のため音声ファイルを先読み。結果再生時にjoin不要
//		this.soundMng.loadAheadSnd([hArg.clickse, hArg.enterse, hArg.leavese]);
	}


	waitCustomEvent(hArg: HArg, elc: EventListenerCtn, fnc: ()=> void) {
		this.goTxt();
		if (! CmnLib.argChk_Boolean(hArg, 'canskip', true)) return;

		elc.add(window, 'pointerdown', (e: any) => {
			e.stopPropagation();
			fnc();
		});
		elc.add(window, 'keydown', (e: any) => {
			//if (! e.isTrusted) return;
			if (e['isComposing']) return; // サポートしてない環境でもいける書き方
			/*	限定する？
				this.hLocalEvt2Fnc['Enter'] = fncKey;
				this.hLocalEvt2Fnc['ArrowDown'] = fncKey;
			*/
			e.stopPropagation();
			fnc();
		});
		if (window['WheelEvent']) elc.add(this.appPixi.view, 'wheel', (e: any) => {
			//if (! e.isTrusted) return;
			if (e['isComposing'])
				return; // サポートしてない環境でもいける書き方
			if (e.deltaY <= 0)
				return;
			e.stopPropagation();
			fnc();
		});
	}


	// イベントを全消去
	private clear_event(hArg: HArg) {
		const glb = CmnLib.argChk_Boolean(hArg, 'global', false);
		const h = glb ?this.hGlobalEvt2Fnc :this.hLocalEvt2Fnc;
		for (const nm in h) this.clear_eventer(nm, h[nm]);
		if (glb) this.hGlobalEvt2Fnc = {}; else this.hLocalEvt2Fnc = {};

		return false;
	}
		private clear_eventer(key: string, e2f: IEvt2Fnc) {
			if (key.slice(0, 4) != 'dom=') return;
			for (const v of document.querySelectorAll(key.slice(4))) {
				v.removeEventListener('click', e2f);
			}
		}


	// イベントを予約
	//	Key Values - Web APIs | MDN https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
	private event(hArg: HArg) {
		const key = hArg.key;
		if (! key) throw('keyは必須です');

		const call = CmnLib.argChk_Boolean(hArg, 'call', false);
		const h = CmnLib.argChk_Boolean(hArg, 'global', false)
			? this.hGlobalEvt2Fnc
			: this.hLocalEvt2Fnc;
		if (CmnLib.argChk_Boolean(hArg, 'del', false)) {
			if (hArg.fn || hArg.label || call) throw 'fn/label/callとdelは同時指定できません';

			this.clear_eventer(key, h[key]);

			// その他・キーボードイベント
			delete h[key];
			return false;
		}
		hArg.fn = hArg.fn || this.scrItr.scriptFn;

		// domイベント
		if (key.slice(0, 4) == 'dom=') {
			let elmlist = null;
			const idx = key.indexOf(':');
			if (idx >= 0) {		// key='dom=config:#ctrl2val
				const name = key.slice(4, idx);
				const htmnm = `const.sn.htm.${name}`;
				if (! this.val.getVal(`tmp:${htmnm}`, 0)) throw(`HTML【${name}】が読み込まれていません`);

				const ifrm = document.getElementById(name) as HTMLIFrameElement;
				const win = ifrm.contentWindow;
				elmlist = win.document.querySelectorAll(key.slice(idx +1));
			}
			else {
				elmlist = document.querySelectorAll(key.slice(4));
			}
			if (elmlist.length == 0 && CmnLib.argChk_Boolean(hArg, 'need_err', true)) throw 'セレクタに対応する要素が見つかりません';

			for (const elm of elmlist) this.elc.add(elm, 'click', e=> this.defEvt2Fnc(e, key));
			// return;	// hGlobalEvt2Fnc(hLocalEvt2Fnc)登録もする
		}

		// その他・キーボードイベント
		h[key] = ()=> this.main.resumeByJumpOrCall(hArg);

		return false;
	}


	private goTxt = ()=> this.layMng.goTxt();


	// 行末クリック待ち
	private l(hArg: HArg) {
		//traceDbg('[l]0 :'+ this.val.getVal('tmp:sn.skip.enabled'] +' :'+ (! this.val.getVal('tmp:sn.skip.all') +' isKidoku:'+ isKidoku);
		if (! this.val.getVal('tmp:sn.tagL.enabled')) {this.goTxt(); return false;}

		if (this.val.getVal('tmp:sn.skip.enabled') && ! this.val.getVal('tmp:sn.skip.all')
		&& ! this.scrItr.isNextKidoku) {
			//traceDbg('[l] skip stop');
			this.fncCancelSkip();
			this.val.setVal_Nochk('tmp', 'sn.skip.enabled', false);// 次の選択肢(/未読)まで進むが有効か
		}

		if (this.val.getVal('tmp:sn.skip.enabled') && ('ps'.indexOf(String(this.val.getVal('sys:sn.skip.mode'))) != -1)) return false;
		if (this.val.getVal('tmp:sn.auto.enabled')) {
			//traceDbg('l:'+ (isKidoku?'既':'未') +' fn:'+ scriptFn +' idx:'+ idxToken +' cs:'+ vctCallStk.length);
			return this.hTag.wait({
				time: String(this.scrItr.isKidoku
					? this.val.getVal('sys:sn.auto.msecLineWait_Kidoku')
					: this.val.getVal('sys:sn.auto.msecLineWait'))
			});
		}

		if (CmnLib.argChk_Boolean(hArg, 'visible', true)) this.layMng.breakLine();

		this.stdWait(()=> this.main.resume());	// stdWait()したらreturn true;
		return true;
	};


	// 改ページクリック待ち
	private p(hArg: HArg) {
		//traceDbg('[p]0 sk_en:'+ hTmp['sn.skip.enabled'] +' all:'+ (! hTmp['sn.skip.all']) +' isKidoku:'+ isKidoku +' mode:'+hSysVal['sn.skip.mode'] +' au_en:'+ hTmp['sn.auto.enabled'] +' au:'+ hTmp['sn.auto.enabled']);
		if (this.val.getVal('tmp:sn.skip.enabled') && ! this.val.getVal('tmp:sn.skip.all')
		&& ! this.scrItr.isNextKidoku) {
			//traceDbg('[p] skip stop');
			this.fncCancelSkip();
			this.val.setVal_Nochk('tmp', 'sn.skip.enabled', false);// 次の選択肢(/未読)まで進むが有効か
		}

		if (this.val.getVal('tmp:sn.skip.enabled') && ('s' == String(this.val.getVal('sys:sn.skip.mode')))) {this.goTxt(); return false;}
		if (this.val.getVal('tmp:sn.auto.enabled')) {
			//traceDbg('p:'+ (isKidoku?'既':'未') +' fn:'+ scriptFn +' idx:'+ idxToken +' cs:'+ vctCallStk.length);
			return this.hTag.wait({
				time: String(this.scrItr.isKidoku
					? this.val.getVal('sys:sn.auto.msecPageWait_Kidoku')
					: this.val.getVal('sys:sn.auto.msecPageWait'))
			});
		}

		if (CmnLib.argChk_Boolean(hArg, 'visible', true)) this.layMng.breakPage();

		this.stdWait(
			this.layMng.getCurrentTxtlayFore()
				&& CmnLib.argChk_Boolean(hArg, 'er', false)
				? ()=> {this.hTag.er(hArg); this.main.resume();}
				: ()=> this.main.resume()
		);	// stdWait()したらreturn true;
		return true;
	};


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
	};
	private unregisterClickEvts(): void {
		const len = this.scrItr.lenCallStk;
		for (let i=0; i<len; ++i) {
			const hE1T = this.scrItr.getCallStk(i)['const.sn.hEvt1Time'];
			if (! hE1T) continue;

			delete hE1T['Click'];
			delete hE1T['Enter'];
			delete hE1T['ArrowDown'];
			delete hE1T['wheel.y>0'];
		}
	}


	// ウェイトを入れる
	private wait(hArg: HArg) {
		this.scrItr.saveKidoku();

		const twSleep = new TWEEN.Tween(this)
		.to({}, uint(CmnLib.argChk_Num(hArg, 'time', NaN)))
		.onComplete(()=> this.main.resume())
		.start();

		this.stdWait(()=> twSleep.stop().end(), CmnLib.argChk_Boolean(hArg, 'canskip', true));	// stdWait()したらreturn true;
		return true;
	};

	cr = (len: number)=> this.scrItr.addLineNum(len);

	isSkipKeyDown(): boolean {
		for (const v in this.hDownKeys) if (this.hDownKeys[v] == 2) return true;
		return false;
	};
	// 0:no push  1:one push  2:push repeating
	private hDownKeys	: {[name: string]: number}	= {
		'Alt'		: 0,
		'Meta'		: 0,	// COMMANDキー
		'Control'	: 0,
		'ArrowDown'	: 0,
		'End'		: 0,
		'Enter'		: 0,
		'Escape'	: 0,
		' '			: 0,
		'GoBack'	: 0,	// AndroidのBackキーだと思う
	};

};
