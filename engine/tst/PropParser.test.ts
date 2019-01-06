/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import assert = require('power-assert');

import {PropParser} from '../src/sn/PropParser';

import {IVariable, ISysBase, typeProcVal, ISetVal} from '../src/sn/CmnLib';

class MyVal implements IVariable {
	private hGetVal = {
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
		"sys:_album.img.渡り廊下・桜昼"	: true,
		"、〇〰〽ぁヿ㐂一豈！￥"			: true,
//			"true ? tmp:sys:zero_s"	: "",	// どうなる、どうすべき
	};

	setSys(_sys: ISysBase): void {};
	flush(): void {};

	getVal(arg_name: string): object {return this.hGetVal[arg_name];}
	setVal_Nochk = (_sc: string, _nm: string, _v: any, _ac?: boolean)=> {};

	defTmp = (_name: string, _fnc: typeProcVal)=> {};
	cloneMp = ()=> null;
	setMp = ()=> {};
	setMark = (_place: number, _mark: object)=> {};
	getMark = (_place: number)=> null;
	cloneSave = ()=> null;
	loadWark(_place: number) {};

	newScrKidoku = (_fn: string)=> {};
	getAreaKidoku = (_fn: string)=> null;
	saveKidoku4scrItr(): void {};

	defValTrg(_name: string, _fnc: ISetVal): void {};
};

context('class PropParser', ()=>{
	let parser;
	beforeEach(() => {
		parser = new PropParser(new MyVal);
	});

	false
	? describe('⏰ Time', () => {
		it('console.time', ()=> {
			for (let j=0; j<5; ++j) {
				console.time('PropParser.getValName');
//				for (let i=0; i<10000; ++i) {
					const o = PropParser.getValName('hA["args"]["rrr"]');
//				}
				console.timeEnd('PropParser.getValName');
			}
/*	一万回やらなくても傾向が見えるみたい
PropParser.getValName: 0.408ms
PropParser.getValName: 0.065ms
PropParser.getValName: 0.017ms
PropParser.getValName: 0.017ms
PropParser.getValName: 0.016ms
*/
		});
	})
	: describe('Tst', () => {
		// 数値計算
		it('Num-bug20180618_0s', ()=> {	// Error: (PropParser)不明な単語【 0】です
			assert.equal(parser.parse(" 0"), "0");
		});
		it('Num-bug20180618_1s', ()=> {	// ok
			assert.equal(parser.parse(" 1"), "1");
		});
		it('Num-bug20180618_0', ()=> {	// Error: (PropParser)不明な単語【 0】です
			assert.equal(parser.parse("0"), "0");
		});
		it('Num-bug20180618_1', ()=> {	// ok
			assert.equal(parser.parse(" 1"), "1");
		});
		it('Num-bug20180618_0.0', ()=> {	// ok
			assert.equal(parser.parse("0.0"), "0.0");
		});
		it('Num-bug20180618_1.0', ()=> {	// ok
			assert.equal(parser.parse(" 1.0"), "1.0");
		});
		it('Num-bug20180618_null', ()=> {	// ok
			assert.equal(parser.parse("null"), null);
		});

		it('Num-1', ()=> {
			assert.equal(parser.parse("(1 + 2)"), "3");
		});
		it('Num0', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)"), "15");
		});
		it('Num0.1', ()=> {
			assert.equal(parser.parse("5 * 1 + 2"), "7");
		});
		it('Num0.2', ()=> {
			assert.equal(parser.parse("1 + 2 * 5"), "11");
		});
		it('Num0.3', ()=> {
			assert.equal(parser.parse("5 ** (1 + 2)"), "125");
		});
		it('Num0.5', ()=> {
			assert.equal(parser.parse("0.5"), "0.5");
		});
		it('Num1', ()=> {
			assert.equal(parser.parse("1 * 4 > 2 && 3 % 2 == 1 ? 100 / 3 : 3")
				, "33.333333333333336");
		});
		it('Num2', ()=> {
			assert.equal(parser.parse("0xff"), "255");
		});
		it('Num3', ()=> {
			assert.equal(parser.parse("0xffffff"), "16777215");
		});
		it('Num4', ()=> {
			assert.equal(parser.parse("10 ¥ 4"), "2");
		});
		it('Num5', ()=> {
			assert.equal(parser.parse("10 / 4"), "2.5");
		});
		it('Num6', ()=> {
			assert.equal(parser.parse("11 % 4"), "3");
		});
		it('Num7_10', ()=> {
			assert.equal(parser.parse("14 & 9"), "8");	// Add
				// 1001 -- 9
				// 1110 --14
				// 1000 -- 8
		});
		it('Num7_11', ()=> {
			assert.equal(parser.parse("14 ^ 9"), "7");	// Add
				// 1001 -- 9
				// 1110 --14
				// 0111 -- 7
		});
		it('Num7_12', ()=> {
			assert.equal(parser.parse("14 | 9"), "15");	// Add
				// 1001 -- 9
				// 1110 --14
				// 1111 --15
		});
		it('Num7_13', ()=> {
			assert.equal(parser.parse("~ 9"), "-10");	// Add
				// 00001001 --   9
				// 11110110 -- -10
		});
		it('Num7_15', ()=> {
			assert.equal(parser.parse("9 << 2"), "36");	// Add
				// 00001001 --  9
				// 00100100 -- 36
		});
		it('Num7_16', ()=> {
			assert.equal(parser.parse("9 >> 2"), "2");	// Add
				// 00001001 --  9
				// 00000010 --  2
		});
		it('Num7_16_', ()=> {
			assert.equal(parser.parse("-9 >> 2"), "-3");	// Add
				// 11110111 -- -9
				// 11111101 -- -3
		});
		it('Num7_17', ()=> {
			assert.equal(parser.parse("9 >>> 2"), "2");	// Add
				// 00001001 --  9
				// 00000010 --  2
		});
		it('Num7_17_', ()=> {
			assert.equal(parser.parse("-9 >>> 2"), "1073741821");	// Add
				// 11111111111111111111111111110111 -- -9
				// 00111111111111111111111111111101 -- -3
		});

		it('Num20', ()=> {	// 2018/07/12
			assert.equal(parser.parse("-2"), "-2");
		});
		it('Num21', ()=> {
			try {	// まぁ文法エラーかなと
				assert.equal(parser.parse("--2"), "2");
				assert.equal('fail', '起こるべき例外が起こっていない');
			}
			catch (e) {
				assert.equal(e.message,
					'(PropParser)文法エラー【--2】');
			}
		});
		it('Num22', ()=> {
			try {	// まぁ文法エラーかなと
				assert.equal(parser.parse("+2"), "+2");
				assert.equal('fail', '起こるべき例外が起こっていない');
			}
			catch (e) {
				assert.equal(e.message,
					'(PropParser)文法エラー【+2】');
			}
		});
		it('Num25', ()=> {
			assert.equal(parser.parse("-2.3"), "-2.3");
		});
		it('Num26', ()=> {
			try {	// まぁ文法エラーかなと
				assert.equal(parser.parse("--2.3"), "2.3");
				assert.equal('fail', '起こるべき例外が起こっていない');
			}
			catch (e) {
				assert.equal(e.message,
					'(PropParser)文法エラー【--2.3】');
			}
		});
		it('Num27', ()=> {
			try {	// まぁ文法エラーかなと
				assert.equal(parser.parse("+2.3"), "+2.3");
				assert.equal('fail', '起こるべき例外が起こっていない');
			}
			catch (e) {
				assert.equal(e.message,
					'(PropParser)文法エラー【+2.3】');
			}
		});

		// 未使用 -> SKYNovelからサポート
		it('Num_int0', ()=> {
			assert.equal(parser.parse("int(10)"), "10");
		});
		it('Num_int1', ()=> {
			assert.equal(parser.parse("int(2.5)"), "2");
		});
		it('Num_int2', ()=> {
			assert.equal(parser.parse("int(10 / 4)"), "2");
		});
		it('Num_int2b', ()=> {
			try {
				parser.parse("int('10 / 4')");
				assert.equal('fail', '起こるべき例外が起こっていない');
			}
			catch (e) {
				assert.equal(e.message,
					'(PropParser)引数【10 / 4】が数値ではありません');
			}
		});
		it('Num_int2c', ()=> {
			assert.equal(parser.parse("parseInt('10 / 4')"), "2");
		});
			it('Num_Num2c', ()=> {
				assert.equal(parser.parse("Number('10 / 4')"), "2.5");
			});
		it('Num_int2d', ()=> {
			assert.equal(parser.parse("parseInt(10 / 4)"), "2");
		});
		it('Num_ceil', ()=> {
			assert.equal(parser.parse("ceil( 3.5)"), "4");
			assert.equal(parser.parse("ceil(-3.5)"), "-3");
			assert.equal(parser.parse("ceil(-3.5) "), "-3");
		});
		it('Num_floor', ()=> {
			assert.equal(parser.parse("floor( 3.5)"), "3");
			assert.equal(parser.parse("floor(-3.5)"), "-4");
		});
		it('Num_round', ()=> {
			assert.equal(parser.parse("round( 3.5)"), "4");
			assert.equal(parser.parse("round( 3.49)"), "3");
			assert.equal(parser.parse("round(-3.5)"), "-3");
			assert.equal(parser.parse("round(-3.51)"), "-4");
		});

		// 比較
		it('Num10', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)<14"), false);
		});
		it('Num11', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)<=14"), false);
		});
		it('Num12', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)==14"), false);
		});
		it('Num12_', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)!=14"), true);
		});
		it('Num13', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)>=14"), true);
		});
		it('Num14', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)>14"), true);
		});


		it('Num20', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)<15"), false);
		});
		it('Num21', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)<=15"), true);
		});
		it('Num22', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)==15"), true);
		});
		it('Num22_', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)!=15"), false);
		});
		it('Num23', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)>=15"), true);
		});
		it('Num24', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)>15"), false);
		});


		it('Num30', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)<16"), true);
		});
		it('Num31', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)<=16"), true);
		});
		it('Num32', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)==16"), false);
		});
		it('Num32_', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)!=16"), true);
		});
		it('Num33', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)>=16"), false);
		});
		it('Num34', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)>16"), false);
		});


		it('Num40', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)==15 == true"), true);
		});
		it('Num40_', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)==15 != true"), false);
		});
		it('Num41', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)==15 == false"), false);
		});
		it('Num41_', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)==15 != false"), true);
		});
		it('Num42', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)==15 === true"), true);
		});
		it('Num42_', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)==15 !== true"), false);
		});
		it('Num42_2', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)==15 === 'true'"), false);
		});
		it('Num43', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)==15 === false"), false);
		});
		it('Num43_', ()=> {
			assert.equal(parser.parse("5 * (1 + 2)==15 !== false"), true);
		});

		it('Num50', ()=> {
			assert.equal(parser.parse("! false"), true);
		});
		it('Num51', ()=> {
			assert.equal(parser.parse("! true"), false);
		});
		it('Num52', ()=> {
			assert.equal(parser.parse("! (5 * (1 + 2)==15)"), false);
		});
		it('Num53', ()=> {
			assert.equal(parser.parse("! (5 * (1 + 2)!=15)"), true);
		});

		it('Num60 err', ()=> {
			try {
				parser.parse("4 : 10");
				assert.equal('fail', '起こるべき例外が起こっていない');
			}
			catch (e) {
				assert.equal(e.message,
					'(PropParser)三項演算子の文法エラーです。? が見つかりません');
			}
		});
		it('Num60_ err', ()=> {
			try {
				parser.parse("4 ? 10");
				assert.equal('fail', '起こるべき例外が起こっていない');
			}
			catch (e) {
				assert.equal(e.message,
					'(PropParser)三項演算子の文法エラーです。: が見つかりません');
			}
		});
		it('Num60_2 err', ()=> {
			try {
				assert.equal(parser.parse("true ? 10 = 2"), null);
				assert.equal('fail', '起こるべき例外が起こっていない');
			}
			catch (e) {
				assert.equal(e.message,
					'(PropParser)文法エラー【true ? 10 = 2】');
			}
		});
		it('Num60_3 err', ()=> {
			try {
				assert.equal(parser.parse("false ? 10 = 2"), null);
				assert.equal('fail', '起こるべき例外が起こっていない');
			}
			catch (e) {
				assert.equal(e.message,
					'(PropParser)文法エラー【false ? 10 = 2】');
			}
		});
		it('Num60_4 err', ()=> {
			try {
				assert.equal(parser.parse("4 ? 10 = 2"), null);
				assert.equal('fail', '起こるべき例外が起こっていない');
			}
			catch (e) {
				assert.equal(e.message,
					'(PropParser)文法エラー【4 ? 10 = 2】');
			}
		});
		it('Num61', ()=> {
			assert.equal(parser.parse("false ? 4 : 10"), 10);
		});
		it('Num62', ()=> {
			assert.equal(parser.parse("true ? 4 : 10"), 4);
		});
		it('Num63', ()=> {
			assert.equal(parser.parse("5 > 1 + 2 ? 4 : 10"), 4);
		});
		it('Num64', ()=> {
			assert.equal(parser.parse("5 < 1 + 2 ? 4 : 10"), 10);
		});
		it('Num65 err', ()=> {
			assert.equal(parser.parse("1 ? 4 : 10"), 4);
		});
		it('Num66 err', ()=> {
			try {
				parser.parse("true ? 4");
				assert.equal('fail', '起こるべき例外が起こっていない');
			}
			catch (e) {
				assert.equal(e.message,
					'(PropParser)三項演算子の文法エラーです。: が見つかりません');
			}
		});
		it('Num67 err', ()=> {
			try {
				parser.parse("false : 10");
				assert.equal('fail', '起こるべき例外が起こっていない');
			}
			catch (e) {
				assert.equal(e.message,
					'(PropParser)三項演算子の文法エラーです。? が見つかりません');
			}
		});

		// 変な文法
		it('BadStr0', ()=> {
			try {
				parser.parse("@@").toString();
				assert.equal('fail', '起こるべき例外が起こっていない');
			}
			catch (e) {
				assert.equal(e.message,
					'(PropParser)文法エラー【@@】');
			}
		});
		it('BadStr1', ()=> {
			try {
				parser.parse("").toString();
				assert.equal('fail', '起こるべき例外が起こっていない');
			}
			catch (e) {
				assert.equal(e.message,
					'(PropParser)文法エラー【】');
			}
		});
		it('BadStr2', ()=> {
			try {
				parser.parse("(´ω⊂").toString();
				assert.equal('fail', '起こるべき例外が起こっていない');
			}
			catch (e) {
				assert.equal(e.message,
					'(PropParser)文法エラー【(´ω⊂】');
//					'(PropParser)不明な単語【´ω⊂】です');
			}
		});


		// 文字列
		it('Str0', ()=> {
			assert.equal(parser.parse("'@@'"), "@@");
		});
		it('Str1', ()=> {
			assert.equal(parser.parse("''"), "");
		});
		it('Str2', ()=> {
			assert.equal(parser.parse("'(´ω⊂'"), "(´ω⊂");
		});
		it('Str3', ()=> {
			assert.equal(parser.parse('"(´Д⊂"'), "(´Д⊂");
		});
		it('Str4', ()=> {
			assert.equal(parser.parse("'0<5'"), "0<5");
		});

		it('Str5', ()=> {
			assert.equal(parser.parse("' @+@ '"), " @+@ ");
		});
		it('Str6', ()=> {
			assert.equal(parser.parse("'@ + @'"), "@ + @");
		});
		it('Str7', ()=> {
			assert.equal(parser.parse("'いろは' + 'にほへ'"), "いろはにほへ");
		});
			it('Str7_2', ()=> {
				assert.equal(parser.parse("'いろは' + 55"), "いろは55");
			});
			it('Str7_3', ()=> {
				assert.equal(parser.parse("74 + 'にほへ'"), "74にほへ");
			});
		it('Str8', ()=> {	// 2018/07/12
			assert.equal(parser.parse("'05'"), "05");
		});
		it('Str9', ()=> {	// 2018/07/12
			assert.equal(parser.parse("' 05　'"), " 05　");
		});

	// 変数
		it('Var0', ()=> {	// からまーぞふ、は未定義リテラル
			assert.equal(parser.parse("からまーぞふ"), undefined);
		});
		it('Var0_1', ()=> {	// JavaScriptでは undefined == null。==がポイント
			assert.equal(parser.parse("からまーぞふ"), null);
		});
			it('Var0_2', ()=> {
				assert.equal(parser.parse("tmp:null_n"), null);
			});
			it('Var0_3', ()=> {
				assert.equal(parser.parse("tmp:null_s"), 'null');
			});
		it('Var1', ()=> {
			assert.equal(parser.parse("から"), "");
		});
		it('Var2', ()=> {
			assert.equal(parser.parse("'いろ' + 春夏 + 'は'"), "いろ秋冬は");
		});

		it('Var10', ()=> {
			assert.equal(parser.parse("mp:fn"), "うひひ");
		});
		it('Var10_1', ()=> {
			assert.equal(true, parser.parse("sys:_album.img.渡り廊下・桜昼"));
		});
		it('Var10_2', ()=> {
			assert.equal(true, parser.parse("、〇〰〽ぁヿ㐂一豈！￥"));
		});
		it('Var11', ()=> {
			assert.equal(parser.parse("mp:fn == mp:lay"), false);
		});
		it('Var11_1', ()=> {
			assert.equal(parser.parse("mp:fn != mp:lay"), true);
		});
		it('Var11_2', ()=> {
			assert.equal(parser.parse("!(mp:fn == mp:lay)"), true);
		});
		it('Var11_3', ()=> {
			assert.equal(parser.parse("!(mp:fn != mp:lay)"), false);
		});
		it('Var11_4', ()=> {
			assert.equal(parser.parse("!!(mp:fn == mp:lay)"), false);
		});
		it('Var11_5', ()=> {
			assert.equal(parser.parse("!!(mp:fn != mp:lay)"), true);
		});

		it('Var12', ()=> {
			assert.equal(parser.parse("mp:fn == mp:pos"), true);
		});
		it('Var12_', ()=> {
			assert.equal(parser.parse("mp:fn != mp:pos"), false);
		});
		it('Var12_2', ()=> {
			assert.equal(parser.parse("!(mp:fn == mp:pos)"), false);
		});
		it('Var12_3', ()=> {
			assert.equal(parser.parse("!(mp:fn != mp:pos)"), true);
		});
		it('Var12_4', ()=> {
			assert.equal(parser.parse("!!(mp:fn == mp:pos)"), true);
		});
		it('Var12_5', ()=> {
			assert.equal(parser.parse("!!(mp:fn != mp:pos)"), false);
		});

		it('Var13', ()=> {
			assert.equal(parser.parse("春夏"), "秋冬");
		});
		it('Var14', ()=> {
			assert.equal(parser.parse("春夏 == '秋冬'"), true);
		});


		it('Var20', ()=> {
			assert.equal(parser.parse("ぎょへー"), "もきゅ");
		});
		it('Var21', ()=> {
			assert.equal(parser.parse("ぎょへー == mp:lay"), true);
		});
		it('Var22', ()=> {
			assert.equal(parser.parse("ぎょへー == 'もきゅ'"), true);
		});
		it('Var23', ()=> {
			assert.equal(parser.parse("ぎょへー != 'きゅ'"), true);
		});

		it('Var30', ()=> {	// うきょ、は未定義リテラル
			assert.equal(parser.parse("うきょ == null"), true);
		});
		it('Var31', ()=> {
			assert.equal(parser.parse("うきょ != null"), false);
		});
		it('Var32', ()=> {
//			assert.equal(parser.parse("うきょ === null"), true);
			assert.equal(parser.parse("うきょ === null"), false);	// SKYNovelから
		});
		it('Var33', ()=> {
//			assert.equal(parser.parse("うきょ !== null"), false);
			assert.equal(parser.parse("うきょ !== null"), true);	// SKYNovelから
		});


		it('Var35', ()=> {	// うきょ、は未定義リテラル
			assert.equal(parser.parse("うきょ == 'null'"), false);
		});
		it('Var36', ()=> {
			assert.equal(parser.parse("うきょ != 'null'"), true);
		});
		it('Var37', ()=> {
			assert.equal(parser.parse("うきょ === 'null'"), false);
		});
		it('Var38', ()=> {
			assert.equal(parser.parse("うきょ !== 'null'"), true);
		});
		it('Var39', ()=> {
//			assert.equal(parser.parse("null == 'null'"), false);
			assert.equal(parser.parse("null == 'null'"), true);	// SKYNovelから
		});
		it('Var40', ()=> {
			assert.equal(parser.parse("null == tmp:null_n"), true);
		});
		it('Var41', ()=> {
			assert.equal(parser.parse("tmp:null_n|0xF == 0xF"), true);
		});
		it('Var42', ()=> {
//			assert.equal(parser.parse("null == tmp:null_s"), false);
			assert.equal(parser.parse("null == tmp:null_s"), true);	// SKYNovelから
		});
		it('Var43', ()=> {
			assert.equal(parser.parse("tmp:null_s|0xF == 0xF"), true);
		});


		it('VarLogic01', ()=> {
			assert.equal(parser.parse("true"), true);
		});
		it('VarLogic02', ()=> {
			assert.equal(parser.parse("false"), false);
		});
		it('VarLogic03', ()=> {
			assert.equal(parser.parse("! false || false"), true);
		});
		it('VarLogic04', ()=> {
			assert.equal(parser.parse("true &&(true)"), true);
		});
/*		it('VarLogic05', ()=> {
//			assert.equal(parser.parse("true &&(true || false)"), true);
			assert.equal(parser.parse("true &&(true | false)"), true);
				// 独自不具合仕様か
				// （SKYNovel）意図がわからないのでテスト無効
		});
*/		it('VarLogic06', ()=> {
			assert.equal(parser.parse("true &&(!true || true)"), true);
		});
		it('VarLogic07', ()=> {
//			assert.equal(parser.parse("true == 'true'"), false);
				// テストが間違ってる気がする
				// SKYNovelから
				assert.equal(parser.parse("true == 'true'"), true);
		});
		it('VarLogic07_', ()=> {
			assert.equal(parser.parse("true === 'true'"), false);
		});
		it('VarLogic08', ()=> {
//			assert.equal(parser.parse("false == 'false'"), false);
				// テストが間違ってる気がする
				// SKYNovelから
			assert.equal(parser.parse("false == 'false'"), true);
		});
		it('VarLogic08_', ()=> {
			assert.equal(parser.parse("false === 'false'"), false);
		});
		it('VarLogic10', ()=> {
			assert.equal(parser.parse("undefined"), undefined);
		});
		it('VarLogic10_2', ()=> {	// JavaScriptでは undefined == null。==がポイント
			assert.equal(parser.parse("undefined"), null);
		});
		it('VarLogic10_3', ()=> {
			assert.equal(parser.parse("undefined == null"), true);
		});
		it('VarLogic10_4', ()=> {	// むきょー、は未定義リテラル
			assert.equal(parser.parse("むきょー == null"), true);
		});
		it('VarLogic11', ()=> {
			assert.equal(parser.parse("! undefined"), true);
		});
		it('VarLogic12', ()=> {
			assert.equal(parser.parse("null"), null);
		});
		it('VarLogic13', ()=> {
			assert.equal(parser.parse("! null"), true);
		});


		// 連想配列
		it('Hash-2', ()=> {
			assert.equal(parser.parse("hA.秋冬.args"), "よいと");
		});
		it('Hash-1', ()=> {
			assert.equal(parser.parse("hA.args"), "めけ");
		});
		it('Hash0', ()=> {
			assert.equal(parser.parse("hA['args']"), "めけ");
		});
		it('Hash0b', ()=> {
			assert.equal(parser.parse('hA["args"]'), "めけ");
		});
		it('Hash1', ()=> {
			assert.equal(parser.parse("hA[ひきす]"), "めけ");
		});
		it('Hash2', ()=> {
			assert.equal(parser.parse("hB[1 + 4]"), "ニョホ");
		});
		it('Hash3', ()=> {
			assert.equal(parser.parse("hC[5 + 'reg']"), "ニョホ2");
		});
		it('Hash4', ()=> {
			assert.equal(parser.parse("hC['args'+ 9]"), "ニョホ3");
		});

		it('Hash5', ()=> {
			assert.equal(parser.parse("hC[ひきす + 9]"), "ニョホ3");
		});
		it('Hash6', ()=> {
			assert.equal(parser.parse("hA[春夏][ひきす]"), "よいと");
		});
		it('Hash7', ()=> {
			assert.equal(parser.parse("hA[春夏].args"), "よいと");
		});
		it('Hash8', ()=> {
			assert.equal(parser.parse("hA['秋冬']['args']"), "よいと");
		});

		it('Hash10_err', ()=> {
			assert.equal(parser.parse("hA['秋冬err']['args']"), undefined);
		});
		it('Hash11_err', ()=> {
			assert.equal(parser.parse("hA['秋冬']['argsERR']"), undefined);
		});
		it('Hash12_err', ()=> {
			assert.equal(parser.parse("hAerr['秋冬']['args']"), undefined);
		});

		// 変数埋め込み
		it('EmbedPerl0', ()=> {
			assert.equal(parser.parse("'せを$春夏 はやみ'"), "せを秋冬 はやみ");
		});
		it('EmbedPerl1', ()=> {
			assert.equal(parser.parse("'せを$春夏'+'はやみ'"), "せを秋冬はやみ");
		});
		it('EmbedPerl2', ()=> {
			assert.equal(parser.parse("'せを$春夏$mp:pos'+'はや'"), "せを秋冬うひひはや");
		});
		it('EmbedPerl3', ()=> {
			assert.equal(parser.parse("'せ$hC.5reg は'"), "せニョホ2 は");
		});
		it('EmbedPerl4', ()=> {
			assert.equal(parser.parse("'$hD.数値'"), "1.20");
		});

		it('EmbedPerl5', ()=> {
			assert.equal(parser.parse("tmp:zero_s + tmp:one_s"), "01");
		});
		it('EmbedPerl6', ()=> {
			assert.equal(parser.parse("tmp:zero_s + tmp:one_n"), "01");
		});
		it('EmbedPerl7', ()=> {
			assert.equal(parser.parse("tmp:zero_n + tmp:one_s"), "01");
		});
		it('EmbedPerl8', ()=> {
			assert.equal(parser.parse("tmp:zero_n + tmp:one_n"), "1");
		});

		it('EmbedPerl10', ()=> {	// 2018/07/12 加減算ではなく＋−の正号・負号
			assert.equal(parser.parse("-hD.数値"), -1.20);
		});
		it('EmbedPerl11', ()=> {
			try {	// まぁ文法エラーかなと
				assert.equal(parser.parse("+hD.数値"), 1.20);
				assert.equal('fail', '起こるべき例外が起こっていない');
			}
			catch (e) {
				assert.equal(e.message,
					'(PropParser)文法エラー【+hD.数値】');
			}
		});
		it('EmbedPerl12', ()=> {
			assert.equal(parser.parse("0-hD.数値"), -1.20);
		});
		it('EmbedPerl13', ()=> {
			assert.equal(parser.parse("0+hD.数値"), 1.20);
		});
		it('EmbedPerl14', ()=> {
			try {	// むきょー、は未定義リテラル
				assert.equal(parser.parse("-むきょー"), 0);
				assert.equal('fail', '起こるべき例外が起こっていない');
			}
			catch (e) {
				assert.equal(e.message,
					'(PropParser)数値以外に-符号がついています');
			}
		});
		it('EmbedPerl15', ()=> {
			try {	// まぁ文法エラーかなと
				assert.equal(parser.parse("-tmp:null_n"), null);
				assert.equal('fail', '起こるべき例外が起こっていない');
			}
			catch (e) {
				assert.equal(e.message,
					'(PropParser)数値以外に-符号がついています');
			}
		});
		it('EmbedPerl16', ()=> {
			try {
				assert.equal(parser.parse("-tmp:null_s"), NaN);
				assert.equal('fail', '起こるべき例外が起こっていない');
			}
			catch (e) {
				assert.equal(e.message,
					'(PropParser)数値以外に-符号がついています');
			}
		});
		it('EmbedPerl17', ()=> {
			assert.equal(parser.parse("!tmp:null_n"), true);
		});
		it('EmbedPerl18', ()=> {
			try {
				assert.equal(parser.parse("-false"), -1.20);
				assert.equal('fail', '起こるべき例外が起こっていない');
			}
			catch (e) {
				assert.equal(e.message,
					'(PropParser)数値以外に-符号がついています');
			}
		});
		it('EmbedPerl19', ()=> {
			try {
				assert.equal(parser.parse("-true"), -1.20);
				assert.equal('fail', '起こるべき例外が起こっていない');
			}
			catch (e) {
				assert.equal(e.message,
					'(PropParser)数値以外に-符号がついています');
			}
		});

		it('EmbedPer20', ()=> {
			assert.equal(parser.parse("'を$春夏,は'"), "を秋冬,は");
		});
		it('EmbedPer21', ()=> {
			assert.equal(parser.parse("'を$春夏{は'"), "を秋冬{は");
		});
		it('EmbedPer22', ()=> {
			assert.equal(parser.parse("'を$春夏}は'"), "を秋冬}は");
		});
		it('EmbedPer23', ()=> {
			assert.equal(parser.parse("'を$春夏[は'"), "を秋冬[は");
		});
		it('EmbedPer24', ()=> {
			assert.equal(parser.parse("'を$春夏]は'"), "を秋冬]は");
		});
		it('EmbedPer25', ()=> {
			assert.equal(parser.parse("'を$春夏(は'"), "を秋冬(は");
		});
		it('EmbedPer26', ()=> {
			assert.equal(parser.parse("'を$春夏)は'"), "を秋冬)は");
		});
		it('EmbedPer27', ()=> {
			assert.equal(parser.parse("'を$春夏<は'"), "を秋冬<は");
		});
		it('EmbedPer28', ()=> {
			assert.equal(parser.parse("'を$春夏>は'"), "を秋冬>は");
		});
		it('EmbedPer29', ()=> {
			assert.equal(parser.parse("'を$春夏/は'"), "を秋冬/は");
		});
		it('EmbedPer30', ()=> {
			assert.equal(parser.parse("'を$春夏\\は'"), "を秋冬\\は");
		});


		it('EmbedRuby0', ()=> {
			assert.equal(parser.parse("'せを#{春夏} はやみ'"), "せを秋冬 はやみ");
		});
		it('EmbedRuby1', ()=> {
			assert.equal(parser.parse("'せを#{春夏}'+'はやみ'"), "せを秋冬はやみ");
		});
		it('EmbedRuby2', ()=> {
			assert.equal(parser.parse("'せを#{春夏}はやみ'"), "せを秋冬はやみ");
		});
		it('EmbedRuby3', ()=> {
			assert.equal(parser.parse("'せを#{10 / 4}やみ'"), "せを2.5やみ");
//			assert.equal(parser.parse("'せを#{10 / 4}やみ'"), "せをnullやみ");
		});

		it('EmbedPerlRuby0', ()=> {
			assert.equal(parser.parse("'せを$春夏$mp:pos#{hB.5}は'"), "せを秋冬うひひニョホは");
		});


		it('_getValName0', ()=> {
			const o = PropParser.getValName('mp:fn');
			assert.equal(o['scope'], 'mp');
			assert.equal(o['name'], 'fn');
			assert.equal(o['at'], '');
		});
		it('_getValName1', ()=> {
			const o = PropParser.getValName('fn');
			assert.equal(o['scope'], 'tmp');
			assert.equal(o['name'], 'fn');
			assert.equal(o['at'], '');
		});
		it('_getValName2', ()=> {
			const o = PropParser.getValName('ぎょへー');
			assert.equal(o['scope'], 'tmp');
			assert.equal(o['name'], 'ぎょへー');
			assert.equal(o['at'], '');
		});
		it('_getValName3', ()=> {
			const o = PropParser.getValName('hC.5reg');
			assert.equal(o['scope'], 'tmp');
			assert.equal(o['name'], 'hC.5reg');
			assert.equal(o['at'], '');
		});
		it('_getValName4', ()=> {
			const o = PropParser.getValName('hA.秋冬.args');
			assert.equal(o['scope'], 'tmp');
			assert.equal(o['name'], 'hA.秋冬.args');
			assert.equal(o['at'], '');
		});
		it('_getValName5', ()=> {
			const o = PropParser.getValName('sys:_album.img.渡り廊下・桜昼');
			assert.equal(o['scope'], 'sys');
			assert.equal(o['name'], '_album.img.渡り廊下・桜昼');
			assert.equal(o['at'], '');
		});

		it('_getValName10', ()=> {
			const o = PropParser.getValName("hA['args']");
			assert.equal(o['scope'], 'tmp');
			assert.equal(o['name'], 'hA.args');
			assert.equal(o['at'], '');
		});
		it('_getValName11', ()=> {
			const o = PropParser.getValName('hA["args"]');
			assert.equal(o['scope'], 'tmp');
			assert.equal(o['name'], 'hA.args');
			assert.equal(o['at'], '');
		});
		it('_getValName12', ()=> {
			const o = PropParser.getValName('hA["args"]["rrr"]');
			assert.equal(o['scope'], 'tmp');
			assert.equal(o['name'], 'hA.args.rrr');
			assert.equal(o['at'], '');
		});

	// 不具合
	it('Var170109_0', ()=> {
		assert.equal(parser.parse("true && ( 1080 > 1440 || 1920 > 2560 )"), false);
		assert.equal(parser.parse("true && ( false || false )"), false);
		assert.equal(parser.parse("( false || false )"), false);
	});

	// あとで直す
	it('Var170109_1', ()=> {
		assert.equal(parser.parse("true && ( 1441 > 1440 || 1920 > 2560 )"), true);
		assert.equal(parser.parse("true && ( true || false )"), true);
		assert.equal(parser.parse("( true || false )"), true);
			// Error: No match for )
	});

		it('_getValName_err0', ()=> {
			const o = PropParser.getValName('mp:f:n');
			assert.equal(o, null);
		});
	});

});
