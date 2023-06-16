/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2023-2023 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {IVariable, IMain, IHEvt2Fnc, IEvt2Fnc, IMark} from './CmnInterface';
import {CmnLib, argChk_Boolean, argChk_Num} from './CmnLib';
import {HArg, IHTag, ITag} from './Grammar';
import {LayerMng} from './LayerMng';
import {ScriptIterator} from './ScriptIterator';
import {EventListenerCtn} from './EventListenerCtn';
import {SoundMng} from './SoundMng';
import {FocusMng} from './FocusMng';
import {Config} from './Config';

import {Container, utils} from 'pixi.js';
import {Tween, remove} from '@tweenjs/tween.js'

let	chgSt	: (rs: ReadState)=> void;
let main	: IMain;
let val		: IVariable;
let layMng	: LayerMng;
let scrItr	: ScriptIterator;
let sndMng	: SoundMng;
let hTag	: IHTag;
let fcs		: FocusMng;
let	goTxt	: ()=> void;
let procWheel4wle: (elc: EventListenerCtn, onIntr: ()=> void)=> void;
let	elmHint	: HTMLElement;
let	cfg		: Config;

let	tagL_enabled	= true;		// 頁末まで一気に読み進むか(l無視)
let	skip_all		= false;	// falseなら既読のみをスキップ
let	skip_enabled	= false;	// 次の選択肢(/未読)まで進むが有効か
let	auto_enabled	= false;	// 自動読みすすみモードかどうか

let	hLocalEvt2Fnc	: IHEvt2Fnc = {};
let	hGlobalEvt2Fnc	: IHEvt2Fnc = {};
//let	isDbgBreak		= false;

function	cancelAutoSkip() {
	if (! tagL_enabled) {	// 頁末まで一気に読み進むか(l無視)
		tagL_enabled = true;
		val.setVal_Nochk('tmp', 'sn.tagL.enabled', true);
	}

	if (skip_enabled) {		// 次の選択肢(/未読)まで進むが有効か
		skip_enabled = false;
		val.setVal_Nochk('tmp', 'sn.skip.enabled', false);
	}
	if (auto_enabled) {		// 自動読みすすみモードかどうか
		auto_enabled = false;
		val.setVal_Nochk('tmp', 'sn.auto.enabled', false);
	}
}

interface IPageLog {
	key		: string;
	fn		: string;
	index	: number;
	mark	: IMark;
	week	: boolean;
};

export class ReadState {
	static	init($chgSt: (rs: ReadState)=> void, $main: IMain, $val: IVariable, $layMng: LayerMng, $scrItr: ScriptIterator, $sndMng: SoundMng, $hTag: IHTag, $fcs: FocusMng, $procWheel4wle: (elc: EventListenerCtn, onIntr: ()=> void)=> void, $elmHint: HTMLElement, $cfg: Config) {
		chgSt = $chgSt;
		main = $main;
		val = $val;
		layMng = $layMng;
		scrItr = $scrItr;
		sndMng = $sndMng;
		hTag = $hTag;
		fcs = $fcs;
		goTxt = ()=> layMng.goTxt();
		procWheel4wle = $procWheel4wle;
		elmHint = $elmHint;
		cfg = $cfg;
		new RsEvtRsv;

		val.defTmp('sn.tagL.enabled', ()=> tagL_enabled);
		val.defValTrg('tmp:sn.tagL.enabled', (_name: string, val: any)=> tagL_enabled = String(val) !== 'false');
		val.defTmp('sn.skip.all', ()=> skip_all);
		val.defValTrg('tmp:sn.skip.all', (_name: string, val: any)=> skip_all = String(val) !== 'false');
		val.defTmp('sn.skip.enabled', ()=> skip_enabled);
		val.defValTrg('tmp:sn.skip.enabled', (_name: string, val: any)=> skip_enabled = String(val) !== 'false');
		val.defTmp('sn.auto.enabled', ()=> auto_enabled);
		val.defValTrg('tmp:sn.auto.enabled', (_name: string, val: any)=> auto_enabled = String(val) !== 'false');

		hLocalEvt2Fnc = {};
		hGlobalEvt2Fnc = {};
	}

	protected	constructor(protected readonly hArg: HArg) {chgSt(this)}

	get	isSkipping(): boolean {return skip_enabled}

	static	getHtmlElmList(KeY: string): {el: NodeListOf<HTMLElement>, id: string, sel: string} {
		const idx = KeY.indexOf(':');
		let sel = '';
		if (idx >= 0) {		// key='dom=config:#ctrl2val
			const id = KeY.slice(4, idx);
			const frmnm = `const.sn.frm.${id}`;
			if (! val.getVal(`tmp:${frmnm}`, 0)) throw `HTML【${id}】が読み込まれていません`;

			const ifrm = document.getElementById(id) as HTMLIFrameElement;
			const win = ifrm.contentWindow!;
			sel = KeY.slice(idx +1);
			return {el: win.document.querySelectorAll(sel), id, sel};
		}

		sel = KeY.slice(4);
		return {el: document.querySelectorAll(sel), id: '', sel};
	}


	static	setEvt2Fnc(glb: boolean, key: string, fnc: IEvt2Fnc) {
		if (glb)
			hGlobalEvt2Fnc[key] = fnc;
		else hLocalEvt2Fnc[key] = fnc;
	}
	static	getEvt2Fnc = (key: string): IEvt2Fnc | undefined => hLocalEvt2Fnc[key] ?? hGlobalEvt2Fnc[key];
	static	clear_eventer(KeY: string, glb: boolean, key: string) {
		if (KeY.slice(0, 4) !== 'dom=') return;

		const e2f = glb ? hGlobalEvt2Fnc[key] : hLocalEvt2Fnc[key];
		ReadState.getHtmlElmList(KeY).el.forEach(v=> v.removeEventListener('click', e2f));
		if (glb) delete hGlobalEvt2Fnc[key]; else delete hLocalEvt2Fnc[key];
	}


	static	clear_event(hArg: HArg): boolean {
		const glb = argChk_Boolean(hArg, 'global', false);
		const h = glb ?hGlobalEvt2Fnc :hLocalEvt2Fnc;
		for (const [KeY, e2f] of Object.entries(h)) {
			if (KeY.slice(0, 4) !== 'dom=') continue;

			ReadState.getHtmlElmList(KeY).el.forEach(v=> v.removeEventListener('click', e2f));
		}
		if (glb) hGlobalEvt2Fnc = {}; else hLocalEvt2Fnc = {};

		return false;
	}

	s(hArg: HArg) {this.#recodePage(); return Rs_S.go(hArg)}

	readonly	wait: ITag = hArg=> {
		if (skip_enabled) {		// Fスキップ時
			if (! skip_all && ! scrItr.isNextKidoku) {cancelAutoSkip(); return false}

			return false;
		}

		return Rs_Wait.go(hArg);
	}
	readonly	waitclick: ITag = hArg=> Rs_WaitClick.go(hArg);

	protected	waitTxtAndTimer(time: number, hArg: HArg): boolean {
		ReadState.eeTextBreak.once(ReadState.NOTICE_COMP_TXT, ()=> {
//console.log(`fn:ReadState.ts B) Txt Fin... time Wait:${time}`);
			this.finishLimitedEvent();		// 1)文字表示待ち
			if (time === 0) {this.onFinish(); return}

			const tw = new Tween({})
			.to({}, time)
			.onComplete(()=> {
//console.log(`fn:ReadState.ts 2) COMP`);
				this.finishLimitedEvent();		// 2)時間待ち
				remove(tw);
				this.onFinish();
			})
			.start();
			this.waitLimitedEvent(hArg, ()=> {	// 2)時間待ち
//console.log(`fn:ReadState.ts 2) CANCEL`);
				tw.stop();
				remove(tw);	//x	tw.end();
//console.log(`fn:ReadState.ts waitTxtAndTimer 2)`);
				this.onUserAct();
			});
		});

		return this.waitLimitedEvent(hArg, ()=> {	// 1)文字表示待ち
//console.log(`fn:ReadState.ts b) Txt Skip`);
			ReadState.eeTextBreak.off(ReadState.NOTICE_COMP_TXT);
	///		if (this.#elcLimEvt.isEmpty) return;	// イベント登録解除に失敗するケースがあるので
//console.log(`fn:ReadState.ts waitTxtAndTimer 1)`);
			this.onUserAct();	// 並び重要
		});
	}
	static	noticeCompTxt() {ReadState.eeTextBreak.emit(ReadState.NOTICE_COMP_TXT)}
	protected	static	readonly	eeTextBreak	= new utils.EventEmitter;	// static必須
	protected	static	readonly	NOTICE_COMP_TXT	= 'sn:notice_comp_txt';


	static	popLocalEvts(): IHEvt2Fnc {
		const ret = hLocalEvt2Fnc;
		hLocalEvt2Fnc = {};
		return ret;
	}
	static	pushLocalEvts(h: IHEvt2Fnc) {hLocalEvt2Fnc = h}

	// 予約イベントの発生待ち
	protected	waitRsvEvent(canUserAct: boolean, glb: boolean): void {
		val.saveKidoku();

		if (canUserAct) {
			//hTag.event({key:'click', breakout: fnc});
			//hTag.event({key:'middleclick', breakout: fnc});
			//	hTag.event()は内部で使わず、こうする
			hLocalEvt2Fnc['click'] =
			//this.hTag.event({key:'enter', breakout: fnc});
			//hTag.event({key:'down', breakout: fnc});
			//	hTag.event()は内部で使わず、こうする
			hLocalEvt2Fnc['enter'] =
			hLocalEvt2Fnc['arrowdown'] =

			// hTag.event({key:'downwheel', breakout: fnc});
			//	hTag.event()は内部で使わず、こうする
			hLocalEvt2Fnc['wheel.y>0'] = ()=> this.onUserAct();
		}
		else {
			delete hLocalEvt2Fnc['click'];
			delete hLocalEvt2Fnc['enter'];
			delete hLocalEvt2Fnc['arrowdown'];
			delete hLocalEvt2Fnc['wheel.y>0'];
		}
		ReadState.getEvt2Fnc = glb
			? key=> hLocalEvt2Fnc[key]
				?? hGlobalEvt2Fnc[key]
			: key=> hLocalEvt2Fnc[key];

		scrItr.noticeWait();
		if (CmnLib.debugLog) {
			const o = Object.create(null);
			o.local = Object.keys(hLocalEvt2Fnc);
			o.global= Object.keys(hGlobalEvt2Fnc);
			console.log(`🎍 wait event... %o`, o);
		}
	}


	// 予約イベントの発生待ちしない waitRsvEvent()
	// 使う場合、外部要因でキャンセルした際は finishLimitedEvent() で後始末を忘れないこと
	waitLimitedEvent(hArg: HArg, onIntr: ()=> void): boolean {
		goTxt();
		val.saveKidoku();
		const fnc = ()=> {
	///		if (this.#elcLimEvt.isEmpty) return;	// イベント登録解除に失敗するケースがあるので
			this.#elcLimEvt.clear(); cancelAutoSkip(); onIntr()
		};

		// 既読スキップ時
		if (skip_enabled) {
			if (! skip_all && ! scrItr.isNextKidoku) cancelAutoSkip();	// 未読で停止
		//	else {fnc(); return false}	// これを有効にすると Fスキップ時速すぎて文字が見えない
		}

		if (argChk_Boolean(hArg, 'canskip', true)) {
			this.#elcLimEvt.add(window, 'pointerdown', e=> {e.stopPropagation(); fnc()});
			this.#elcLimEvt.add(window, 'keydown', (e: any)=> {
				//if (! e.isTrusted) return;
				if (e['isComposing']) return; // サポートしてない環境でもいける書き方
				e.stopPropagation();
				fnc();
			});
			procWheel4wle(this.#elcLimEvt, fnc);
		}

		return true;
	}
	finishLimitedEvent() {this.#elcLimEvt.clear()}
	readonly	#elcLimEvt	= new EventListenerCtn;


	l(hArg: HArg): boolean {
		if (! tagL_enabled) return false;
		this.#recodePage(true);

		if (auto_enabled) {
			const time = Number(val.getVal(`sys:sn.auto.msecLineWait${scrItr.isKidoku ?'_Kidoku' :''}`));
			return Rs_L_AutoSkip.go(time, hArg);
		}
		if (skip_enabled) {		// Fスキップ時
			if (! skip_all && ! scrItr.isNextKidoku) return Rs_L_Wait.go(hArg);	// 未読で停止

			if ('ps'.includes(val.getVal('sys:sn.skip.mode'))) return Rs_L_AutoSkip.go(50, hArg);	// 改行待ち=しない	// 魔法数字、見えるぐらい少し待つ
		}

		return Rs_L.go(hArg);
	}

	p(hArg: HArg): boolean {
		this.#recodePage();

		if (auto_enabled) {
			const time = Number(val.getVal(`sys:sn.auto.msecPageWait${scrItr.isKidoku ?'_Kidoku' :''}`));
			return Rs_P_AutoSkip.go(time, hArg);
		}
		if (skip_enabled) {		// Fスキップ時
			if (! skip_all && ! scrItr.isNextKidoku) return Rs_P_Wait.go(hArg);	// 未読で停止

			if ('s' == val.getVal('sys:sn.skip.mode')) {	// 改行待ち＆改ページ待ち=しない
				return Rs_P_AutoSkip.go(50, hArg);	// 魔法数字、見えるぐらい少し待つ
				//return false;	// このほうが高速だが、Fスキップ時文字を見せたい
			}
		}

		return Rs_P.go(hArg);
	}

	waitEvent(hArg: HArg, onFire: ()=> void) {
		if (skip_enabled) {		// Fスキップ時
			if (! skip_all && ! scrItr.isNextKidoku) return Rs_WaitAny_Wait.go(hArg, onFire);	// 未読で停止
		}

		return Rs_WaitAny.go(hArg, onFire);
	}

	protected	onFinish(): void {}
	protected	onUserAct(): void {}

	readonly	isWait: boolean		= false;	// 予約イベントの発生待ち中か
	fire(_KEY: string, _e: Event) {}

	protected	static	aPage	: IPageLog[]	= [];
	protected	static	stylePage	= 'color: yellow;';
	page(hArg: HArg): boolean {
		if (! ('clear' in hArg || 'style' in hArg || 'to' in hArg)) throw 'clear か style か to は必須です';

		if (argChk_Boolean(hArg, 'clear', false)) ReadState.aPage = [];

		const {to, style} = hArg;
		if (style) ReadState.stylePage = style;

		switch (to) {
			case 'prev':	if (ReadState.aPage.length < 2) return false;	break;
		//	case 'next':	return false;
			default:	return false;
		}

		return RsPagination.go(hArg);	// ページ移動開始
	}

	#recodePage(week = false) {
		if (! val.getVal('save:sn.doRecLog')) return;

		const {fn, idx} = scrItr.nowScrIdx();
		const key = (idx -1) +':'+ fn;
		if (ReadState.aPage.findIndex(p=> p.key === key) > -1) return;

		if (ReadState.aPage.at(-1)?.week) ReadState.aPage.pop();
		const max_len = cfg.oCfg.log.max_len;	// 一定数を保つ
		if (ReadState.aPage.push({key, week,
			fn		: val.getVal('save:const.sn.scriptFn', fn),
			index	: val.getVal('save:const.sn.scriptIdx', 0),
			mark	: scrItr.nowMark(),
		}) > max_len) ReadState.aPage = ReadState.aPage.slice(-max_len);
	}
}


// === イベント予約受付中 ===
export class RsEvtRsv extends ReadState {
	constructor() {super({}); main.resume(); elmHint.hidden = true}
}


// === [s] ===
class Rs_S_base extends ReadState {
	override	readonly	isWait		= true;	// 予約イベントの発生待ち中か
	override	fire(KEY: string, e: Event) {
//		if (this.#isDbgBreak) return;

		// 予約実行
		const key = KEY.toLowerCase();
		if (CmnLib.debugLog) console.log(`👺 fire<(key:\`${key}\` type:${e.type} e:%o)`, {...e});
		if (key === 'enter') {
			const em = fcs.getFocus();
			if (em instanceof Container) {
				em.emit('pointerdown', new Event('pointerdown'));
				return;
			}
		}

		const ke = ReadState.getEvt2Fnc(key);
		if (! ke) {
			// スマホ用疑似スワイプスクロール
			if (key.slice(0, 5) === 'swipe') globalThis.scrollBy(
				-(<any>e).deltaX ?? 0,
				-(<any>e).deltaY ?? 0,
			);
			return;
		}

		if (key.slice(-5) !== 'wheel') e.preventDefault?.();
		e.stopPropagation();
		if (key.slice(0, 4) !== 'dom=') if (layMng.clickTxtLay()) return;

		ke(e);
		//this.hLocalEvt2Fnc = {};	// ここで消去禁止、Main.resumeByJumpOrCall()が担当
	}
}
class Rs_S extends Rs_S_base {
	static	readonly	go: ITag = hArg=> new Rs_S(hArg).waitTxtAndTimer(0, {});
	protected	override	onFinish() {
		cancelAutoSkip();
		const glb = argChk_Boolean(this.hArg, 'global', true);
		this.waitRsvEvent(false, glb);
	}
	protected	override	onUserAct() {this.onFinish()}
}


// === [wait] ===
class Rs_Wait extends ReadState {		// 文字表示終了待ち→[wait]
	static	readonly	go: ITag = hArg=> {
		const time = argChk_Num(hArg, 'time', NaN);	// skip時でもエラーは出したげたい
		return new Rs_Wait(hArg).waitTxtAndTimer(time, hArg);
	}	// 魔法数字、見えるぐらい少し待つ
	protected	override	onFinish() {new RsEvtRsv}
	protected	override	onUserAct() {this.onFinish()}
}


// === [l] ===
class Rs_L extends ReadState {		// 文字表示終了待ち（そして[l]）
	static	readonly	go: ITag = hArg=> new Rs_L(hArg).waitTxtAndTimer(0, hArg);
	protected	override	onFinish() {Rs_L_Wait.go(this.hArg)}
	protected	override	onUserAct() {this.onFinish()}
}

class Rs_L_AutoSkip extends ReadState {	// 文字表示終了待ち（そして[l]auto/skipウェイト待ち）
	static	readonly	go = (time: number, hArg: HArg)=> new Rs_L_AutoSkip(hArg).waitTxtAndTimer(time, hArg);
	protected	override	onFinish() {new RsEvtRsv}
	protected	override	onUserAct() {Rs_L_Wait.go(this.hArg)}
}

class Rs_L_Wait extends Rs_S {		// [p] クリック待ち
	static	override	readonly	go: ITag = hArg=> {
		if (argChk_Boolean(hArg, 'visible', true)) {layMng.breakLine(hArg); goTxt()}

		const glb = argChk_Boolean(hArg, 'global', true);
		new Rs_L_Wait(hArg).waitRsvEvent(true, glb);
		return true;
	}
	protected	override	onFinish() {new RsEvtRsv}
	protected	override	onUserAct() {new RsEvtRsv}
}


// === [p] ===
class Rs_P extends ReadState {		// 文字表示終了待ち（そして[p]）
	static	readonly	go: ITag = hArg=> new Rs_P(hArg).waitTxtAndTimer(0, hArg);
	protected	override	onFinish() {Rs_P_Wait.go(this.hArg)}
	protected	override	onUserAct() {this.onFinish()}
}

class Rs_P_AutoSkip extends ReadState {	// 文字表示終了待ち（そして[p]auto/skipウェイト待ち）
	static	readonly	go = (time: number, hArg: HArg)=> new Rs_P_AutoSkip(hArg).waitTxtAndTimer(time, hArg);
	protected	override	onFinish() {new RsEvtRsv}
	protected	override	onUserAct() {Rs_P_Wait.go(this.hArg)}
}

class Rs_P_Wait extends Rs_S {		// [p] クリック待ち
	static	override	readonly	go: ITag = hArg=> {
		// [p]メソッド内でやるとスキップの利きが悪い
		if (argChk_Boolean(hArg, 'visible', true)) {layMng.breakPage(hArg); goTxt()}

		const glb = argChk_Boolean(hArg, 'global', true);
		new Rs_P_Wait(hArg).waitRsvEvent(true, glb);
		return true;
	}
	protected	override	onFinish() {
		if (argChk_Boolean(this.hArg, 'er', false)) hTag.er(this.hArg);

		sndMng.clearCache();
//		scrItr.turnPage();
		new RsEvtRsv;
	}
	protected	override	onUserAct() {this.onFinish()}
}


// === [waitclick] ===
class Rs_WaitClick extends Rs_S {
	static	override	go: ITag = hArg=> new Rs_WaitClick(hArg).waitTxtAndTimer(0, hArg);
	protected	override	onFinish() {
		cancelAutoSkip();
		const glb = argChk_Boolean(this.hArg, 'global', true);
		this.waitRsvEvent(true, glb);
	}
	protected	override	onUserAct() {new RsEvtRsv}
}


// === [wt][wait_tsy][wv][ws][wl][wf][wb] ===
class Rs_WaitAny extends ReadState {		// 文字表示終了待ち（そして[*]）
	private	constructor(hArg: HArg, private readonly onIntr: ()=> void) {super(hArg)}
	static	readonly	go = (hArg: HArg, onIntr: ()=> void)=> new Rs_WaitAny(hArg, onIntr).waitTxtAndTimer(0, hArg);
	protected	override	onFinish() {Rs_WaitAny_Wait.go(this.hArg, this.onIntr)}
	protected	override	onUserAct() {this.onFinish()}
}

//	class Rs_WaitAny_AutoSkip extends... {	// 文字表示終了待ち（そして[*]auto/skipウェイト待ち）

class Rs_WaitAny_Wait extends Rs_S_base {
	private	constructor(hArg: HArg, private readonly onIntr: ()=> void) {super(hArg)}
	static	go(hArg: HArg, onFire: ()=> void) {
		const glb = argChk_Boolean(hArg, 'global', true);
		new Rs_WaitAny_Wait(hArg, onFire).waitRsvEvent(true, glb);
		return true;
	}
	protected	override	onFinish() {new RsEvtRsv}
	protected	override	onUserAct() {this.onIntr(); this.onFinish()}
}


// === ページ移動中 ===
export class RsPagination extends Rs_S {
	override	get	isSkipping(): boolean {return ! ReadState.aPage[this.#pos].week}
		// return true で良いのだが、[l]でページ移動モードになったあと、[l]に戻ってモード終了してから、[p]に至る文字表示が瞬時表示になる対策

	override	readonly	s: ITag = hArg=> Rs_S.go(hArg);

	override	readonly	wait = ()=> false;
	override	readonly	waitclick = ()=> false;
	protected	override	readonly	waitTxtAndTimer = ()=> false;

	override	l(hArg: HArg): boolean {
		if (! ReadState.aPage[this.#pos].week) return false;

		const len = ReadState.aPage.length;
		if (this.#pos === len -1) return Rs_L_Wait.go(hArg);	// ページ末尾ならページ移動終了

		if (argChk_Boolean(hArg, 'visible', true)) {layMng.breakLine(hArg); goTxt()}
		this.waitRsvEvent(false, true);
		return true;
	}

	override	p(hArg: HArg): boolean {
		const len = ReadState.aPage.length;
		if (this.#pos === len -1) return Rs_P_Wait.go(hArg);	// ページ末尾ならページ移動終了

		if (argChk_Boolean(hArg, 'visible', true)) {layMng.breakPage(hArg); goTxt()}
		this.waitRsvEvent(false, true);
		return true;
	}

	static	override	readonly	go: ITag = hArg=> new RsPagination(hArg).page(hArg);
	#pos	= ReadState.aPage.length -1;
	override	page(hArg: HArg): boolean {
		const {to} = hArg;
		if (! to) return false;

		const len = ReadState.aPage.length;
		switch (to) {
			case 'prev':	if (this.#pos === 0) return false;
				--this.#pos;	break;

			case 'next':	if (this.#pos === len -1) return false;
				++this.#pos;	break;

			default:	throw `属性to「${to}」は異常です`;
		}

		const {fn, index, mark} = ReadState.aPage[this.#pos];
		return scrItr.loadFromMark({fn, index,
			style	: (this.#pos === len -1) ?undefined :ReadState.stylePage,
			//r_style までは不要か
		}, mark);
	}

	protected	override	onFinish() {}
	protected	override	onUserAct() {}
}
