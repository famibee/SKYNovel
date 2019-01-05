/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import { BaseTexture, utils } from "pixi.js";

type  IEmitter = BaseTexture
	| utils.EventEmitter
	| Window | Document | Element;

export class EventListenerCtn {	// リソースリーク対策
	private vctEvt	: {(): void}[]	= [];

	add(ed: IEmitter, type: string, fnc: (e: any)=> void, useCapture = false): void {
		if (ed instanceof BaseTexture) {
			switch (type) {
			case 'loaded':
			case 'update':
			case 'error':
			case 'dispose':
				ed.on(type, fnc, useCapture);
				this.vctEvt.push(()=> ed.off(type, fnc, useCapture));
				break;
			}
			return;
		}
		if (ed instanceof utils.EventEmitter) {
			ed.on(type, fnc, useCapture);
			this.vctEvt.push(()=> ed.off(type, fnc, useCapture));
			return;
		}
		ed.addEventListener(type, fnc, useCapture);
		this.vctEvt.push(()=> ed.removeEventListener(type, fnc, useCapture));
	}

	clear(): void {
		for (const fnc of this.vctEvt) fnc();
		this.vctEvt = [];
	}
}
