/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {BaseTexture, utils} from "pixi.js";

type IEmitter = BaseTexture | utils.EventEmitter | {
	addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
	removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

export class EventListenerCtn {	// リソースリーク対策
	#aOffEvt	: {(): void}[]	= [];

	add(ed: IEmitter, type: string, fnc: (e: any)=> void, ctx: any = {}): void {
		if (ed instanceof BaseTexture) {
			switch (type) {
			case 'loaded':
			case 'update':
			case 'error':
			case 'dispose':
				ed.on(type, fnc, ctx);
				this.#aOffEvt.push(()=> ed.off(type, fnc, ctx));
				break;
			}
			return;
		}
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
