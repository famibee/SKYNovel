/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {T_HEvt2Fnc} from './CmnInterface';
import type {HArg} from './Grammar';


// マクロ変数(mp:)
export type T_H_VAL_MP = {
	'const.sn.macro'			: string;	// (json)実行中マクロのスクリプター用情報
	'const.sn.me_call_scriptFn'	: string;	// マクロの呼び元スクリプト
}
export function creMP(): T_H_VAL_MP {return {
		'const.sn.macro'			: '{}',
		'const.sn.me_call_scriptFn'	: '',
}}

export type ICallStackArg = HArg & {
	':resvToken'?	: string;		// call元のtoken
	':hEvt1Time'?	: T_HEvt2Fnc;	// call元のローカル予約イベント
	':hMp'			: T_H_VAL_MP;	// call元のmp:
	':タグ名'?		: string;
	':lenIfStk'		: number;
}
export function creCSArg(): ICallStackArg {return {
	':hEvt1Time': {},
	':hMp'		: creMP(),
	':lenIfStk'	: 1,
}}


export class CallStack {
	constructor(readonly fn = '', readonly idx = 0, readonly csArg: ICallStackArg = creCSArg()) {}

	readonly	toString = ()=> `[fn:${this.fn}, idx:${String(this.idx)}, csArg:${JSON.stringify(this.csArg)}]`;

}
