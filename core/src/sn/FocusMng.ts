/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2020-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Container} from 'pixi.js';

interface IFocusBtn {
	btn	: Container;
	on	: ()=> boolean;
	off	: ()=> void;
};

export class FocusMng {
	private		aBtn	: IFocusBtn[]	= [];
	private		idx		= -1;

	add(btn: Container, on: ()=> boolean, off: ()=> void) {
		this.aBtn.push({btn: btn, on: on, off: off});
	}
	destroy() {this.aBtn = []; this.idx = -1;}
	isFocus(btn: Container) {
		if (this.idx === -1 || this.aBtn.length === 0) return false;
		return this.aBtn[this.idx].btn === btn;
	}

	prev() {
		this.allOff();
		const len = this.aBtn.length;
		if (len === 0) return;

		if (--this.idx < 0) this.idx = len -1;
		for (let i=len; i>=1; --i) {
			const j = (this.idx +i) % len;
			if (this.aBtn[j].on()) {this.idx = j; break;}
		}
	}
	next() {
		this.allOff();
		const len = this.aBtn.length;
		if (len === 0) return;

		if (++this.idx >= len) this.idx = 0;
		for (let i=0; i<len; ++i) {
			const j = (this.idx +i) % len;
			if (this.aBtn[j].on()) {this.idx = j; break;}
		}
	}

	getFocus(): Container | null {
		if (this.idx == -1) return null;

		this.allOff();
		if (this.idx >= this.aBtn.length) this.idx = 0;
		const b = this.aBtn[this.idx];
		return b.on() ?b.btn : null;
	}

	blur() {this.allOff(); this.idx = -1;}
	private	allOff() {
		const len = this.aBtn.length;
		for (let i=len -1; i>=0; --i) {
			const b = this.aBtn[i];
			if (b.btn.parent) b.off(); else this.aBtn.splice(i, 1);
		}
	}

}
