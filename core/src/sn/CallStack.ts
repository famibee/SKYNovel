/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {IHEvt2Fnc} from './CmnLib';

export interface ICallStackArg {
	csAnalyBf	: {[name: string]: any};
	resvToken?	: string;
	hEvt1Time	: IHEvt2Fnc;
	hMpVal?		: {[name: string]: any};
	タグ名?		: string;
}

export class CallStack {
	constructor(private readonly $fn = '', private readonly $idx = 0, private readonly $hArg: ICallStackArg | null = null) {}

	get fn() {return this.$fn}
	get idx() {return this.$idx}
	get hArg() {return this.$hArg}
	readonly	toString = ()=> `[fn:${this.$fn}, idx:${this.$idx}, hArg:${this.$hArg}]`;

}
