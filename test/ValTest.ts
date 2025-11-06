/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2025-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {T_Variable, T_ProcVal, T_fncSetVal, T_Mark, T_Data4Vari, T_H_VAL_DATA, T_VAL_DATA, T_VAL_BSNU} from '../src/sn/CmnInterface';
import {creSAVEDATA} from '../src/sn/CmnInterface';
import {Areas} from '../src/sn/Areas';


export class ValTest implements T_Variable {
	#hGetVal: T_H_VAL_DATA = {
		...<T_H_VAL_DATA><unknown>{
			'mp:fn'			: 'うひひ',
			'mp:lay'		: 'もきゅ',
			'mp:pos'		: 'うひひ',
			'ぎょへー'		: 'もきゅ',
			'春夏'			: '秋冬',
			'から'			: '',
			'ひきす'		: 'args',
			'hA.args'		: 'めけ',
			'hB.5'			: 'ニョホ',
			'hC.5reg'		: 'ニョホ2',
			'hC.args9'		: 'ニョホ3',
			'hA.秋冬.args'	: 'よいと',
			'hD.数値'		: '1.20',
			'hD.数値1'		: 1.20,
			'hD.数値2'		: 3,
			'tmp:zero_n'	: 0,
			'tmp:one_n'		: 1,
			'tmp:zero_s'	: '0',
			'tmp:one_s'		: '1',
			'tmp:null_n'	: null,
			'tmp:null_s'	: 'null',
			'tmp:nan'		: NaN,
			'sys:_album.img.渡り廊下・桜昼'	: true,
			'、〇〰〽ぁヿ㐂一豈！￥'			: true,
	//		"true ? tmp:sys:zero_s"	: "",	// どうなる、どうすべき
		},
	};

	async init() { /* empty */ }
	flush(): void { /* empty */ }
	setDoRecProc(_doRecProc: (doRec: boolean)=> void): void { /* empty */ }

	getVal(arg_name: string): T_VAL_DATA {return <T_VAL_DATA>this.#hGetVal[arg_name]}
	setVal_Nochk = (_sc: string, _nm: string, _v: T_VAL_BSNU, _ac?: boolean)=> { /* empty */ };

	defTmp = (_name: string, _fnc: T_ProcVal)=> { /* empty */ };
	cloneMp = ()=> ({
		'const.sn.macro': '{}',
		'const.sn.me_call_scriptFn': '',
	});
	// cloneMp = ()=> ({});
	setMp = ()=> { /* empty */ };
	setMark(_place: number, _mark: T_Mark) {return undefined}
	getMark(_place: number) {return <T_Mark>{
		hSave	: creSAVEDATA(),
		hPages	: {},
		aIfStk	: [],
	}}
	cloneSave = ()=> creSAVEDATA();
	mark2save(_mark: T_Mark) { /* empty */ }

	touchAreaKidoku = (_fn: string)=> new Areas;
	getAreaKidoku = (_fn: string)=> new Areas;
	saveKidoku(): void { /* empty */ }
	updateData(_data: T_Data4Vari): void { /* empty */ }

	defValTrg(_name: string, _fnc: T_fncSetVal): void { /* empty */ }

	doRecLog = ()=> false;

	readonly tagCh_doWait = false;
	readonly tagCh_doWait_Kidoku = false;
	readonly tagCh_msecWait = 0;
	readonly tagCh_msecWait_Kidoku = 0;
}
