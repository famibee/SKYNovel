/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2020-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib} from './CmnLib';
import {EventListenerCtn} from './EventListenerCtn';

import {Container} from 'pixi.js';

interface IFocusBtn {
	btn	: Container | HTMLElement;
	on	: ()=> boolean;
	off	: ()=> void;
};

export class FocusMng {
	#aBtn	: IFocusBtn[]	= [];
	#idx					= -1;
	readonly	#elc		= new EventListenerCtn;

	destroy() {this.#aBtn = []; this.#idx = -1; this.#elc.clear()}

	add(cmp: Container | HTMLElement, on: ()=> boolean, off: ()=> void) {
//console.log(`fn:FocusMng.ts line:62 ADD idx:${this.aBtn.length} local:${(cmp as HTMLElement).localName} type:${(cmp as HTMLInputElement).type} cmp:%o`, cmp);
		// 重複チェック
		if (this.#aBtn.findIndex(b=> b.btn === cmp) >= 0) return;
		if (cmp instanceof Container) {
			// フレーム部品に【 if (btn instanceof HTMLElement) 】が上手く使えない
			cmp.on('pointerdown', ()=> {
				for (let i=this.#aBtn.length -1; i>=0; --i) {
					const b = this.#aBtn[i]!;
					if (b.btn === cmp) {this.#idx = i; return}
				}
				this.#idx = -1;
			});

			this.#aBtn.push({btn: cmp, on: on, off: off});
			return;
		}

		this.#elc.add(cmp, 'focus', ()=> {
			for (let i=this.#aBtn.length -1; i>=0; --i) {
				const b = this.#aBtn[i]!;
				if (b.btn === cmp) {this.#idx = i; return}
			}
			this.#idx = -1;
		});

		let fnc = (_: KeyboardEvent)=> {};
		let fnc4EnterSwitch: (e: KeyboardEvent)=> boolean
		= (cmp.localName === 'button' || cmp.localName === 'a')
			? e=> ! e.isTrusted && e.key === 'Enter'
			: e=> e.key === 'Enter';
			// Enterで全画面スイッチは切り替わるが画面が全画面化しない対応
		const inp = cmp as HTMLInputElement;
		switch (inp.type ?? '') {
	//	switch (btn.getAttribute('type') ?? '') {	// textareaで''になる
			case 'checkbox':	fnc = ()=> inp.checked = ! inp.checked;	break;
			case '':
				// ラジオボタン
				if (cmp.querySelectorAll('input[type]').length > 0) {
					fnc = e=> this.#radio_next(cmp, e.key);
					fnc4EnterSwitch = ()=> false;
				}
				break;
			case 'range':
				fnc = e=> {
					if (e.isTrusted) return;	// Gamepadのみ処理したい
					if (e.key === 'ArrowUp') inp.stepUp(); else inp.stepDown();
				};
				break;
			case 'text':
			case 'textarea':
				fnc = e=> {
					if (e.isTrusted) return;	// Gamepadのみ処理したい
					let cur = (inp.selectionStart ?? 0)
						+(e.key === 'ArrowUp' ?-1 :1);
					if (cur < 0) cur = 0;
					inp.setSelectionRange(cur, cur);
				};
				break;
		}
		this.#elc.add(cmp, 'keydown', (e: KeyboardEvent)=> {
			if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown'
			&& e.key !== 'Enter') return;

			e.stopPropagation(); e.stopImmediatePropagation();
			if (fnc4EnterSwitch(e)) {
				cmp.dispatchEvent(new MouseEvent('click'));
				return;
			}
			fnc(e);
		}, {passive: true});

		// spanなどでもフォーカスを持つように
		if (! cmp.hasAttribute('tabindex')) cmp.tabIndex = 0;

		this.#aBtn.push({btn: cmp, on: on, off: off});
	}
	remove(cmp: Container | HTMLElement) {
		const idx = this.#aBtn.findIndex(b=> b.btn === cmp);
		if (idx < 0) return;
		this.#aBtn.splice(idx, 1);
		if (this.#aBtn.length === 0) this.#idx = -1;
		else if (idx <= this.#idx) --this.#idx;	// -1 でもOK
	}
	#radio_next(elm: HTMLElement, key: string) {
		const op = elm.querySelectorAll('input[type]') as NodeListOf<HTMLInputElement>;
		const len = op.length;
		for (let i=0; i<len; ++i) {
			if (! op[i]!.checked) continue;

			op[(i +len +(key === 'ArrowUp' ?-1 :1)) %len]!.checked = true;
			break;
		}
	}

	isFocus(cmp: Container | HTMLElement) {
		if (this.#idx < 0) return false;	//  || this.aBtn.length === 0 は略できる
		return this.#aBtn[this.#idx]!.btn === cmp;
	}

	prev() {
		this.#allOff();
		const len = this.#aBtn.length;
		if (len === 0) return;

		if (--this.#idx < 0) this.#idx = len -1;
		for (let i=len; i>=1; --i) {
			const j = (this.#idx +i) % len;
			if (this.#aBtn[j]!.on()) {this.#idx = j; this.#logFocus(j); return}
		}
		this.#idx = -1;
	}
	next() {
		this.#allOff();
		const len = this.#aBtn.length;
		if (len === 0) return;

		if (++this.#idx >= len) this.#idx = 0;
		for (let i=0; i<len; ++i) {
			const j = (this.#idx +i) % len;
			if (this.#aBtn[j]!.on()) {this.#idx = j; this.#logFocus(j); return}
		}
		this.#idx = -1;
	}
	readonly	#logFocus = CmnLib.debugLog
		? (i: number)=> console.log(`👾 <FocusMng idx:${i} btn:%o`, this.#aBtn[i]!.btn)
		: ()=> {};
	getFocus(): Container | HTMLElement | null {
		if (this.#idx < 0) return null;

		this.#allOff();
		if (this.#idx >= this.#aBtn.length) this.#idx = 0;
		const b = this.#aBtn[this.#idx]!;
		return b.on() ?b.btn : null;
	}

	blur() {this.#allOff(); this.#idx = -1; globalThis.focus()}
	#allOff() {
		for (let i=this.#aBtn.length -1; i>=0; --i) {
			const b = this.#aBtn[i]!;
			if (! (b.btn instanceof Container) || b.btn.parent) b.off();
			else this.#aBtn.splice(i, 1);
		}
	}

}
