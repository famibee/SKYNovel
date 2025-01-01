/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {type Container, utils} from 'pixi.js';

type IEmitter = utils.EventEmitter | {
	addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
	removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export class EventListenerCtn {	// リソースリーク対策
	#aOffEvt	: {(): void}[]	= [];

	addC(ed: Container, type: string, fnc: (e: any)=> void, ctx: any = {}): void {
		ed.on(type, fnc, ctx);
		this.#aOffEvt.push(()=> ed.off(type, fnc, ctx));
	}
	add(ed: IEmitter, type: string, fnc: (e: any)=> void, ctx: any = {}): void {
		if (ed instanceof utils.EventEmitter) {
			ed.on(type, fnc, ctx);
			this.#aOffEvt.push(()=> ed.off(type, fnc, ctx));
			return;
		}
		ed.addEventListener(type, fnc, ctx);
		this.#aOffEvt.push(()=> ed.removeEventListener(type, fnc, {capture: ctx.capture ?? false}));
	}

	clear(): void {
		for (const f of this.#aOffEvt) f();
		this.#aOffEvt = [];
	}

	get	isEmpty() {return this.#aOffEvt.length === 0}

}
