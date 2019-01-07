/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {IHEvt2Fnc} from './CmnLib';

export interface ICallStackArg {
	csAnalyBf	: {[name: string]: any};
	strReserveToken?	: string;
	hEvt1Time			: IHEvt2Fnc;
	hMpVal?		: {[name: string]: any};
	タグ名?		: string;
}

export class CallStack {
	constructor(private _fn = '', private _idx = 0, private _hArg: ICallStackArg | null = null) {
	}

	get fn() {return this._fn}
	get idx() {return this._idx}
	get hArg() {return this._hArg}
	toString() {return '[fn:'+ this._fn +', idx:'+ this._idx +', hArg:'+ this._hArg +']';}

}
