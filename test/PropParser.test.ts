/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {PropParser} from '../src/sn/PropParser';

import {IVariable, ISysBase, typeProcVal, ISetVal, IMark, IData4Vari} from '../src/sn/CmnInterface';
import {Areas} from '../src/sn/Areas';

import {beforeEach, it, expect} from 'vitest';

//===== Test Class =====
class MyVal implements IVariable {
	#hGetVal: {[nm: string]: any} = {
		"mp:fn"			: "うひひ",
		"mp:lay"		: "もきゅ",
		"mp:pos"		: "うひひ",
		"ぎょへー"		: "もきゅ",
		"春夏"		: "秋冬",
		"から"		: "",
		"ひきす"		: "args",
		"hA.args"		: "めけ",
		"hB.5"			: "ニョホ",
		"hC.5reg"		: "ニョホ2",
		"hC.args9"		: "ニョホ3",
		"hA.秋冬.args"	: "よいと",
		"hD.数値"			: "1.20",
		"tmp:zero_n"	: 0,
		"tmp:one_n"		: 1,
		"tmp:zero_s"	: "0",
		"tmp:one_s"		: "1",
		"tmp:null_n"	: null,
		"tmp:null_s"	: "null",
		"tmp:nan"		: NaN,
		"sys:_album.img.渡り廊下・桜昼"	: true,
		"、〇〰〽ぁヿ㐂一豈！￥"			: true,
//			"true ? tmp:sys:zero_s"	: "",	// どうなる、どうすべき
	};

	setSys(_sys: ISysBase): Promise<void> {return Promise.resolve()};
	flush(): void {};
	setDoRecProc(_doRecProc: (doRec: boolean)=> void): void {}

	getVal(arg_name: string): any {return this.#hGetVal[arg_name]}
	setVal_Nochk = (_sc: string, _nm: string, _v: any, _ac?: boolean)=> {};

	defTmp = (_name: string, _fnc: typeProcVal)=> {};
	cloneMp = ()=> ({});
	setMp = ()=> {};
	setMark = (_place: number, _mark: IMark)=> {};
	getMark = (_place: number)=> ({
		hSave	: {},
		hPages	: {},
		aIfStk	: [],
	});
	cloneSave = ()=> ({});
	mark2save(_mark: IMark) {};

	touchAreaKidoku = (_fn: string)=> new Areas;
	getAreaKidoku = (_fn: string)=> new Areas;
	saveKidoku(): void {};
	updateData(_data: IData4Vari): void {};

	defValTrg(_name: string, _fnc: ISetVal): void {};

	doRecLog = ()=> false;

	get tagCh_doWait() {return false}
	get tagCh_doWait_Kidoku() {return false}
	get tagCh_msecWait() {return 0}
	get tagCh_msecWait_Kidoku() {return 0}
};
//===== Test Class =====


let parser: PropParser;
beforeEach(()=> {
	parser = new PropParser(new MyVal);
});

/*
	describe('⏰ Time', ()=> {
		it('console.time', ()=> {
			for (let j=0; j<5; ++j) {
				console.time('PropParser.getValName');
//				for (let i=0; i<10000; ++i) {
					PropParser.getValName('hA["args"]["rrr"]');
//				}
				console.timeEnd('PropParser.getValName');
			}
/ *	一万回やらなくても傾向が見えるみたい
PropParser.getValName: 0.408ms
PropParser.getValName: 0.065ms
PropParser.getValName: 0.017ms
PropParser.getValName: 0.017ms
PropParser.getValName: 0.016ms
* /
		});
	})
*/

// 数値計算
it.each([
	// Num-bug20180618_0s	// Error: (PropParser)不明な単語【 0】です
	{i: ' 0', o: 0},
	// Num-bug20180618_1s	// ok
	{i: ' 1', o: 1},
	// Num-bug20180618_0	// Error: (PropParser)不明な単語【 0】です
	{i: '0', o: 0},
	// Num-bug20180618_1	// ok
	{i: ' 1', o: 1},
	// Num-bug20180618_0.0	// ok
	{i: '0.0', o: 0.0},
	// Num-bug20180618_1.0	// ok
	{i: ' 1.0', o: 1.0},
	// Num-bug20180618_null	// ok
	{i: 'null', toBeNull: true},

	// Num-1
	{i: '(1 + 2)', o: 3},
	// Num0
	{i: '5 * (1 + 2)', o: 15},
	// Num0.1
	{i: '5 * 1 + 2', o: 7},
	// Num0.2
	{i: '1 + 2 * 5', o: 11},
	// Num0.3
	{i: '5 ** (1 + 2)', o: 125},
	// Num0.5
	{i: '0.5', o: 0.5},
	// Num1
	{i: '1 * 4 > 2 && 3 % 2 == 1 ? 100 / 3 : 3',
		o: 33.333333333333336}, 	// Num2
	{i: '0xff', o: 255},
	// Num3
	{i: '0xffffff', o: 16777215},
	// Num4
	{i: '10 ¥ 4', o: 2},
	// Num5
	{i: '10 / 4', o: 2.5},
	// Num6
	{i: '11 % 4', o: 3},
	// Num7_10
	{i: '14 & 9', o: 8},	// Add
			// 1001 -- 9
			// 1110 --14
			// 1000 -- 8
	// Num7_11
	{i: '14 ^ 9', o: 7},	// Add
		// 1001 -- 9
		// 1110 --14
		// 0111 -- 7
	// Num7_12
	{i: '14 | 9', o: 15},	// Add
		// 1001 -- 9
		// 1110 --14
		// 1111 --15
	// Num7_13
	{i: '~ 9', o: -10},	// Add
		// 00001001 --   9
		// 11110110 -- -10
	// Num7_15
	{i: '9 << 2', o: 36},	// Add
		// 00001001 --  9
		// 00100100 -- 36
	// Num7_16
	{i: '9 >> 2', o: 2},	// Add
		// 00001001 --  9
		// 00000010 --  2
	// Num7_16_
	{i: '-9 >> 2', o: -3},	// Add
		// 11110111 -- -9
		// 11111101 -- -3
	// Num7_17
	{i: '9 >>> 2', o: 2},	// Add
		// 00001001 --  9
		// 00000010 --  2
	// Num7_17_
	{i: '-9 >>> 2', o: 1073741821},	// Add
		// 11111111111111111111111111110111 -- -9
		// 00111111111111111111111111111101 -- -3

	// Num20	// 2018/07/12
	{i: '-2', o: -2},
	// Num21
	{i: '--2',	// まぁ文法エラーかなと
		toThrowError: '(PropParser)文法エラー【--2】'},
	// Num22
	{i: '+2',		// まぁ文法エラーかなと
		toThrowError: '(PropParser)文法エラー【+2】'},
	// Num25
	{i: '-2.3', o: -2.3},
	// Num26
	{i: '--2.3',	// まぁ文法エラーかなと
		toThrowError: '(PropParser)文法エラー【--2.3】'},
	// Num27
	{i: '+2.3',	// まぁ文法エラーかなと
		toThrowError: '(PropParser)文法エラー【+2.3】'},

	// 2023/04/30
	{i: '-(40-740)', o: 700},
	{i: '- -4', o: 4},
	{i: '- - -4', o: -4},
	{i: '- - - -4', o: 4},


// 未使用 -> SKYNovelからサポート
	// Num_int0
	{i: 'int(10)', o: 10},
	// Num_int1
	{i: 'int(2.5)', o: 2},
	// Num_int2
	{i: 'int(10 / 4)', o: 2},
	// Num_int2b
	{i: `int('10 / 4')`,
		toThrowError: '(PropParser)引数【10 / 4】が数値ではありません'},
	// Num_int2c
	{i: `parseInt('10 / 4')`, o: 2},
		// Num_Num2c
		{i: `Number('10 / 4')`, o: 2.5},
	// Num_int2d
	{i: 'parseInt(10 / 4)', o: 2},
	// Num_ceil
	{i: 'ceil( 3.5)', o: 4},
	{i: 'ceil(-3.5)', o: -3},
	{i: 'ceil(-3.5) ', o: -3},
	// Num_floor
	{i: 'floor( 3.5)', o: 3},
	{i: 'floor(-3.5)', o: -4},
	// Num_round
	{i: 'round( 3.5)', o: 4},
	{i: 'round( 3.49)', o: 3},
	{i: 'round(-3.5)', o: -3},
	{i: 'round(-3.51)', o: -4},
	// Num_NaN0
	{i: '1 + undefined', toBeNaN: true},
	{i: '"#{1 + undefined}"', o: 'NaN'},
		// 1 + undefined は NaN
		// https://www.ikkitang1211.site/entry/defer-null-undefined
		// JavaScriptの仕様として、 toNumber(null) は 0 / toNumber(undefined) は NaN とするという取り決めがある
			// NaN が判定できると数値 undefined 判定の取りこぼししなくなる
	// Num_NaN1
	{i: 'isNaN(1 + undefined)', o: true},
	// Num_NaN2
	{i: '! isNaN(1 + undefined)', o: false},
	// Num_NaN3
	{i: 'isNaN(tmp:nan)', o: true},

// 比較
	// Num10
	{i: '5 * (1 + 2)<14', o: false},
	// Num11
	{i: '5 * (1 + 2)<=14', o: false},
	// Num12
	{i: '5 * (1 + 2)==14', o: false},
	// Num12_
	{i: '5 * (1 + 2)!=14', o: true},
	// Num13
	{i: '5 * (1 + 2)>=14', o: true},
	// Num14
	{i: '5 * (1 + 2)>14', o: true},


	// Num20
	{i: '5 * (1 + 2)<15', o: false},
	// Num21
	{i: '5 * (1 + 2)<=15', o: true},
	// Num22
	{i: '5 * (1 + 2)==15', o: true},
	// Num22_
	{i: '5 * (1 + 2)!=15', o: false},
	// Num23
	{i: '5 * (1 + 2)>=15', o: true},
	// Num24
	{i: '5 * (1 + 2)>15', o: false},


	// Num30
	{i: '5 * (1 + 2)<16', o: true},
	// Num31
	{i: '5 * (1 + 2)<=16', o: true},
	// Num32
	{i: '5 * (1 + 2)==16', o: false},
	// Num32_
	{i: '5 * (1 + 2)!=16', o: true},
	// Num33
	{i: '5 * (1 + 2)>=16', o: false},
	// Num34
	{i: '5 * (1 + 2)>16', o: false},


	// Num40
	{i: '5 * (1 + 2)==15 == true', o: true},
	// Num40_
	{i: '5 * (1 + 2)==15 != true', o: false},
	// Num41
	{i: '5 * (1 + 2)==15 == false', o: false},
	// Num41_
	{i: '5 * (1 + 2)==15 != false', o: true},
	// Num42
	{i: '5 * (1 + 2)==15 === true', o: true},
	// Num42_
	{i: '5 * (1 + 2)==15 !== true', o: false},
	// Num42_2
	{i: `5 * (1 + 2)==15 === 'true'`, o: false},
	// Num43
	{i: '5 * (1 + 2)==15 === false', o: false},
	// Num43_
	{i: '5 * (1 + 2)==15 !== false', o: true},

	// Num50
	{i: '! false', o: true},
	// Num51
	{i: '! true', o: false},
	// Num52
	{i: '! (5 * (1 + 2)==15)', o: false},
	// Num53
	{i: '! (5 * (1 + 2)!=15)', o: true},

	// Num60 err
	{i: '4 : 10',
	toThrowError: '(PropParser)三項演算子の文法エラーです。? が見つかりません'},
	// Num60_ err
	{i: '4 ? 10',
	toThrowError: '(PropParser)三項演算子の文法エラーです。: が見つかりません'},
	// Num60_2 err
	{i: 'true ? 10 = 2',
	toThrowError: '(PropParser)文法エラー【true ? 10 = 2】'},
	// Num60_3 err
	{i: 'false ? 10 = 2',
	toThrowError: '(PropParser)文法エラー【false ? 10 = 2】'},
	// Num60_4 err
	{i: '4 ? 10 = 2',
	toThrowError: '(PropParser)文法エラー【4 ? 10 = 2】'},
	// Num61
	{i: 'false ? 4 : 10', o: 10},
	// Num62
	{i: 'true ? 4 : 10', o: 4},
	// Num63
	{i: '5 > 1 + 2 ? 4 : 10', o: 4},
	// Num64
	{i: '5 < 1 + 2 ? 4 : 10', o: 10},
	// Num65 err
	{i: '1 ? 4 : 10', o: 4},
	// Num66 err
	{i: 'true ? 4',
	toThrowError: '(PropParser)三項演算子の文法エラーです。: が見つかりません'},
	// Num67 err
	{i: 'false : 10',
	toThrowError: '(PropParser)三項演算子の文法エラーです。? が見つかりません'},
	// 2023/05/05
	{i: 'undefined ? null : 10', o: 10},
	{i: 'false ? null : 10', o: 10},
	{i: '存在しない変数 ? null : 10', o: 10},
	{i: 'ひきす ? null : 10', o: null},

// 変な文法
	// BadStr0
	{i: '@@',	// .toString()
	toThrowError: '(PropParser)文法エラー【@@】'},
	// BadStr1
	{i: '',
	toThrowError: '(PropParser)文法エラー【】'},
	// BadStr2
	{i: '(´ω⊂',
	toThrowError: '(PropParser)文法エラー【(´ω⊂】'},
//					'(PropParser)不明な単語【´ω⊂】です');


// 文字列
	// Str0
	{i: `'@@'`, o: '@@'},
	// Str1
	{i: `''`, o: ''},
	// Str2
	{i: `'(´ω⊂'`, o: '(´ω⊂'},
	// Str3
	{i: `'(´Д⊂'`, o: '(´Д⊂'},
	// Str4
	{i: `'0<5'`, o: '0<5'},

	// Str5
	{i: `' @+@ '`, o: ' @+@ '},
	// Str6
	{i: `'@ + @'`, o: '@ + @'},
	// Str7
	{i: `'いろは' + 'にほへ'`, o: 'いろはにほへ'},
		// Str7_2
		{i: `'いろは' + 55`, o: 'いろは55'},
		// Str7_3
		{i: `74 + 'にほへ'`, o: '74にほへ'},
	// Str8	// 2018/07/12
	{i: `'05'`, o: '05'},
	// Str9	// 2018/07/12
	{i: `' 05　'`, o: ' 05　'},
	// Str10	// 2021/09/29 エスケープシーケンス導入
	{i: `'\\''`, o: `'`},
	{i: `'\\''`, o: `'`},
	{i: `#\\##`, o: `#`},
	{i: `#\\\n#`, o: `\n`},

// 変数
	// Var0	// からまーぞふ、は未定義リテラル
	{i: 'からまーぞふ', toBeUndefined: true},
	// Var0_1	// JavaScriptでは undefined == null。==がポイント
	{i: 'からまーぞふ', toBeUndefined: true},
		// Var0_2
		{i: 'tmp:null_n', toBeNull: true},
		// Var0_3
		{i: 'tmp:null_s', o: 'null'},
	// Var1
	{i: 'から', o: ''},
	// Var2
	{i: `'いろ' + 春夏 + 'は'`, o: 'いろ秋冬は'},

	// Var10
	{i: 'mp:fn', o: 'うひひ'},
	// Var10_1
	{i: 'sys:_album.img.渡り廊下・桜昼', o: true},
	// Var10_2
	{i: '、〇〰〽ぁヿ㐂一豈！￥', o: true},
	// Var11
	{i: 'mp:fn == mp:lay', o: false},
	// Var11_1
	{i: 'mp:fn != mp:lay', o: true},
	// Var11_2
	{i: '!(mp:fn == mp:lay)', o: true},
	// Var11_3
	{i: '!(mp:fn != mp:lay)', o: false},
	// Var11_4
	{i: '!!(mp:fn == mp:lay)', o: false},
	// Var11_5
	{i: '!!(mp:fn != mp:lay)', o: true},

	// Var12
	{i: 'mp:fn == mp:pos', o: true},
	// Var12_
	{i: 'mp:fn != mp:pos', o: false},
	// Var12_2
	{i: '!(mp:fn == mp:pos)', o: false},
	// Var12_3
	{i: '!(mp:fn != mp:pos)', o: true},
	// Var12_4
	{i: '!!(mp:fn == mp:pos)', o: true},
	// Var12_5
	{i: '!!(mp:fn != mp:pos)', o: false},

	// Var13
	{i: '春夏', o: '秋冬'},
	// Var14
	{i: `春夏 == '秋冬'`, o: true},


	// Var20
	{i: 'ぎょへー', o: 'もきゅ'},
	// Var21
	{i: 'ぎょへー == mp:lay', o: true},
	// Var22
	{i: `ぎょへー == 'もきゅ'`, o: true},
	// Var23
	{i: `ぎょへー != 'きゅ'`, o: true},

	// Var30	// うきょ、は未定義リテラル
	{i: 'うきょ == null', o: true},
	// Var31
	{i: 'うきょ != null', o: false},
	// Var32
//	{i: 'うきょ === null', o: true},
	{i: 'うきょ === null', o: false},	// SKYNovelから
	// Var33
//	{i: 'うきょ !== null', o: false},
	{i: 'うきょ !== null', o: true},	// SKYNovelから


	// Var35	// うきょ、は未定義リテラル
	{i: `うきょ == 'null'`, o: false},
	// Var36
	{i: `うきょ != 'null'`, o: true},
	// Var37
	{i: `うきょ === 'null'`, o: false},
	// Var38
	{i: `うきょ !== 'null'`, o: true},
	// Var39
//	{i: `null == 'null'`, o: false},
	{i: `null == 'null'`, o: true},	// SKYNovelから
	// Var40
	{i: 'null == tmp:null_n', o: true},
	// Var41
	{i: 'tmp:null_n|0xF == 0xF', toBeTruthy: true},	//
	// Var42
//	{i: 'null == tmp:null_s', o: false},
	{i: 'null == tmp:null_s', o: true},	// SKYNovelから
	// Var43
	{i: 'tmp:null_s|0xF == 0xF', toBeTruthy: true},	//


	// VarLogic01
	{i: 'true', o: true},
	// VarLogic02
	{i: 'false', o: false},
	// VarLogic03
	{i: '! false || false', o: true},
	// VarLogic04
	{i: 'true &&(true)', o: true},
	/*		// VarLogic05
//			{i: 'true &&(true || false)', o: true},
	{i: 'true &&(true | false)', o: true},
		// 独自不具合仕様か
		// （SKYNovel）意図がわからないのでテスト無効
	*/		// VarLogic06
	{i: 'true &&(!true || true)', o: true},
	// VarLogic07
//	{i: 'true == 'true'', o: false},
	// テストが間違ってる気がする
	// SKYNovelから
	{i: `true == 'true'`, o: true},
	// VarLogic07_
	{i: `true === 'true'`, o: false},
	// VarLogic08
//	{i: 'false == 'false'', o: false},
	// テストが間違ってる気がする
	// SKYNovelから
	{i: `false == 'false'`, o: true},
	// VarLogic08_
	{i: `false === 'false'`, o: false},
	// VarLogic10
	{i: 'undefined', toBeUndefined: true},
	// VarLogic10_2	// JavaScriptでは undefined == null。==がポイント
	{i: 'undefined', toBeUndefined: true},
	// VarLogic10_3
	{i: 'undefined == null', o: true},
	// VarLogic10_4	// むきょー、は未定義リテラル
	{i: 'むきょー == null', o: true},
	// VarLogic11
	{i: '! undefined', o: true},
	// VarLogic12
	{i: 'null', toBeNull: true},
	// VarLogic13
	{i: '! null', o: true},


// 連想配列
	// Hash-2
	{i: 'hA.秋冬.args', o: 'よいと'},
	// Hash-1
	{i: 'hA.args', o: 'めけ'},
	// Hash0
	{i: `hA['args']`, o: 'めけ'},
	// Hash0b
	{i: `hA['args']`, o: 'めけ'},
	// Hash1
	{i: 'hA[ひきす]', o: 'めけ'},
	// Hash2
	{i: 'hB[1 + 4]', o: 'ニョホ'},
	// Hash3
	{i: `hC[5 + 'reg']`, o: 'ニョホ2'},
	// Hash4
	{i: `hC['args'+ 9]`, o: 'ニョホ3'},

	// Hash5
	{i: 'hC[ひきす + 9]', o: 'ニョホ3'},
	// Hash6
	{i: 'hA[春夏][ひきす]', o: 'よいと'},
	// Hash7
	{i: 'hA[春夏].args', o: 'よいと'},
	// Hash8
	{i: `hA['秋冬']['args']`, o: 'よいと'},

	// Hash10_err
	{i: `hA['秋冬err']['args']`, toBeUndefined: true},
	// Hash11_err
	{i: `hA['秋冬']['argsERR']`, toBeUndefined: true},
	// Hash12_err
	{i: `hAerr['秋冬']['args']`, toBeUndefined: true},

// 変数埋め込み
	// EmbedPerl0
	{i: `'せを$春夏 はやみ'`, o: 'せを秋冬 はやみ'},
	// EmbedPerl1
	{i: `'せを$春夏'+'はやみ'`, o: 'せを秋冬はやみ'},
	// EmbedPerl2
	{i: `'せを$春夏$mp:pos'+'はや'`, o: 'せを秋冬うひひはや'},
	// EmbedPerl3
	{i: `'せ$hC.5reg は'`, o: 'せニョホ2 は'},
	// EmbedPerl4
	{i: `'$hD.数値'`, o: '1.20'},

	// EmbedPerl5
	{i: 'tmp:zero_s + tmp:one_s', o: '01'},
	// EmbedPerl6
	{i: 'tmp:zero_s + tmp:one_n', o: '01'},
	// EmbedPerl7
	{i: 'tmp:zero_n + tmp:one_s', o: '01'},
	// EmbedPerl8
	{i: 'tmp:zero_n + tmp:one_n', o: 1},

	// EmbedPerl10	// 2018/07/12 加減算ではなく＋−の正号・負号
	{i: '-hD.数値', o: -1.20},
	// EmbedPerl11
	{i: '+hD.数値',
	toThrowError: '(PropParser)文法エラー【+hD.数値】'},
	// EmbedPerl12
	{i: '0-hD.数値', o: -1.20},
	// EmbedPerl13
	{i: '0+hD.数値', o: '01.20'},
	// EmbedPerl14
	{i: '-むきょー', o: NaN},	// v 1.43.2 以降は NaN を返すように
//	{i: '-むきょー', toThrowError: '(PropParser)数値以外に-符号がついています'},
		// むきょー、は未定義リテラル
	// EmbedPerl15
	{i: '-tmp:null_n', o: -0},	// v 1.43.2 以降は jsにあわせる（-null → -0）
//	{i: '-tmp:null_n', toThrowError: '(PropParser)数値以外に-符号がついています'},
	// EmbedPerl16
//	{i: '-tmp:null_s', NaN},	// v 1.43.2 以降は NaN を返すように
	{i: '-tmp:null_s', toThrowError: '(PropParser)数値以外に-符号がついています'},
		// TODO: これも NaN を返すべき
	// EmbedPerl17
	{i: '!tmp:null_n', o: true},
	// EmbedPerl18
	{i: '-false', o: -0},	// v 1.43.2 以降は jsにあわせる（-0）
//	{i: '-false', toThrowError: '(PropParser)数値以外に-符号がついています'},
	// EmbedPerl19
	{i: '-true', o: -1},	// v 1.43.2 以降は jsにあわせる（-1）
//	{i: '-true', toThrowError: '(PropParser)数値以外に-符号がついています'},

	// EmbedPer20
	{i: `'を$春夏,は'`, o: 'を秋冬,は'},
	// EmbedPer21
	{i: `'を$春夏{は'`, o: 'を秋冬{は'},
	// EmbedPer22
	{i: `'を$春夏}は'`, o: 'を秋冬}は'},
	// EmbedPer23
	{i: `'を$春夏[は'`, o: 'を秋冬[は'},
	// EmbedPer24
	{i: `'を$春夏]は'`, o: 'を秋冬]は'},
	// EmbedPer25
	{i: `'を$春夏(は'`, o: 'を秋冬(は'},
	// EmbedPer26
	{i: `'を$春夏)は'`, o: 'を秋冬)は'},
	// EmbedPer27
	{i: `'を$春夏<は'`, o: 'を秋冬<は'},
	// EmbedPer28
	{i: `'を$春夏>は'`, o: 'を秋冬>は'},
	// EmbedPer29
	{i: `'を$春夏/は'`, o: 'を秋冬/は'},
//	// EmbedPer30	// エスケープシーケンス導入で不可に
//	{i: `'を$春夏\\は'`, o: 'を秋冬\\は'},


	// EmbedRuby0
	{i: `'せを#{春夏} はやみ'`, o: 'せを秋冬 はやみ'},
	// EmbedRuby1
	{i: `'せを#{春夏}'+'はやみ'`, o: 'せを秋冬はやみ'},
	// EmbedRuby2
	{i: `'せを#{春夏}はやみ'`, o: 'せを秋冬はやみ'},
	// EmbedRuby3
	{i: `'せを#{10 / 4}やみ'`, o: 'せを2.5やみ'},
//	{i: `'せを#{10 / 4}やみ'`, o: 'せをnullやみ'},

	// EmbedPerlRuby0
	{i: `'せを$春夏$mp:pos#{hB.5}は'`, o: 'せを秋冬うひひニョホは'},


	// 不具合
		// Var170109_0
		{i: "true && ( 1080 > 1440 || 1920 > 2560 )", o: false},
		{i: "true && ( false || false )", o: false},
		{i: "( false || false )", o: false},

	// あとで直す
		// Var170109_1
		{i: "true && ( 1441 > 1440 || 1920 > 2560 )", o: true},
		{i: "true && ( true || false )", o: true},
		{i: "( true || false )", o: true},
			// Error: No match for )


])(`$i`, ({i, o, toBeNull, toBeNaN, toBeUndefined, toBeTruthy, toThrowError})=> {
	if (toThrowError) {expect(()=> parser.parse(i)).toThrowError(); return}

	const ex = expect(parser.parse(i));
	if (toBeNull) {ex.toBeNull(); return}
	if (toBeNaN) {ex.toBeNaN(); return}
	if (toBeUndefined) {ex.toBeUndefined(); return}
	if (toBeTruthy) {ex.toBeTruthy(); return}
	ex.toBe(o);
});


// getValName
it.each([
	// _getValName0
	{i: 'mp:fn', h: {
		scope: 'mp',
		name: 'fn',
		at: ''}},
	// _getValName1
	{i: 'fn', h: {
		scope: 'tmp',
		name: 'fn',
		at: ''}},
	// _getValName2
	{i: 'ぎょへー', h: {
		scope: 'tmp',
		name: 'ぎょへー',
		at: ''}},
	// _getValName3
	{i: 'hC.5reg', h: {
		scope: 'tmp',
		name: 'hC.5reg',
		at: ''}},
	// _getValName4
	{i: 'hA.秋冬.args', h: {
		scope: 'tmp',
		name: 'hA.秋冬.args',
		at: ''}},
	// _getValName5
	{i: 'sys:_album.img.渡り廊下・桜昼', h: {
		scope: 'sys',
		name: '_album.img.渡り廊下・桜昼',
		at: ''}},

	// _getValName10
	{i: "hA['args']", h: {
		scope: 'tmp',
		name: 'hA.args',
		at: ''}},
	// _getValName11
	{i: 'hA["args"]', h: {
		scope: 'tmp',
		name: 'hA.args',
		at: ''}},
	// _getValName12
	{i: 'hA["args"]["rrr"]', h: {
		scope: 'tmp',
		name: 'hA.args.rrr',
		at: ''}},

])(`$i`, ({i, h})=> {
	const o = PropParser.getValName(i);
	for (const [k, v] of Object.entries(h)) expect(o?.[k]).toBe(v);
});



it('_getValName_err0', ()=> {
	const o = PropParser.getValName('mp:f:n');
	expect(o).toBeNull();
});
