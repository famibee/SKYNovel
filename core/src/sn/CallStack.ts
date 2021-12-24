/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2021 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {IHEvt2Fnc, IValMp} from './CmnInterface';

export interface ICallStackArg {
	':resvToken'?	: string;		// call元のtoken
	':hEvt1Time'	: IHEvt2Fnc;	// call元のローカル予約イベント
	':hMp'			: IValMp;		// call元のmp:
	':タグ名'?		: string;
}

export class CallStack {
	constructor(private readonly $fn = '', private readonly $idx = 0, private readonly $csArg: ICallStackArg = {':hEvt1Time': {}, ':hMp': {}}) {}

	get fn() {return this.$fn}
	get idx() {return this.$idx}
	get csArg() {return this.$csArg}
	readonly	toString = ()=> `[fn:${this.$fn}, idx:${this.$idx}, csArg:${this.$csArg}]`;

}
