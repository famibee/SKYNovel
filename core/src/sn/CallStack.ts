/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {IHEvt2Fnc} from './CmnInterface';

export interface ICallStackArg {
	resvToken?	: string;
	hEvt1Time	: IHEvt2Fnc;
	hMp?		: {[name: string]: string};
	タグ名?		: string;
}

export class CallStack {
	constructor(private readonly $fn = '', private readonly $idx = 0, private readonly $hArg: ICallStackArg | null = null) {}

	get fn() {return this.$fn}
	get idx() {return this.$idx}
	get csArg() {return this.$hArg}
	readonly	toString = ()=> `[fn:${this.$fn}, idx:${this.$idx}, hArg:${this.$hArg}]`;

}
