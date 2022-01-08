/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2022 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {BaseTexture, utils} from "pixi.js";

type  IEmitter = BaseTexture
	| utils.EventEmitter
	| Window | Document | Element;

export class EventListenerCtn {	// リソースリーク対策
	#vctEvt	: {(): void}[]	= [];

	add(ed: IEmitter, type: string, fnc: (e: any)=> void, ctx: any = {}): void {
		if (ed instanceof BaseTexture) {
			switch (type) {
			case 'loaded':
			case 'update':
			case 'error':
			case 'dispose':
				(ed as utils.EventEmitter).on(type, fnc, ctx);
				this.#vctEvt.push(()=> (ed as utils.EventEmitter).off(type, fnc, ctx));
				break;
			}
			return;
		}
		if (ed instanceof utils.EventEmitter) {
			ed.on(type, fnc, ctx);
			this.#vctEvt.push(()=> ed.off(type, fnc, ctx));
			return;
		}
		ed.addEventListener(type, fnc, ctx);
		this.#vctEvt.push(()=> ed.removeEventListener(type, fnc, {capture: ctx.capture ?? false}));
	}

	clear(): void {
		this.#vctEvt.forEach(f=> f());
		this.#vctEvt = [];
	}

}
