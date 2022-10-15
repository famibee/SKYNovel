/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2022 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {PropParser} from '../src/sn/PropParser';

import {IVariable, ISysBase, typeProcVal, ISetVal, IMark, IData4Vari} from '../src/sn/CmnInterface';
import {Areas} from '../src/sn/Areas';

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

	getVal(arg_name: string): any {return this.#hGetVal[arg_name];}
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

	loadScrWork = (_fn: string)=> {};
	getAreaKidoku = (_fn: string)=> new Areas;
	saveKidoku(): void {};
	updateData(_data: IData4Vari): void {};

	defValTrg(_name: string, _fnc: ISetVal): void {};

	doRecLog = ()=> false;
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
it('Num-bug20180618_0s', ()=> {	// Error: (PropParser)不明な単語【 0】です
	expect(parser.parse(" 0")).toBe(0);
});
it('Num-bug20180618_1s', ()=> {	// ok
	expect(parser.parse(" 1")).toBe(1);
});
it('Num-bug20180618_0', ()=> {	// Error: (PropParser)不明な単語【 0】です
	expect(parser.parse("0")).toBe(0);
});
it('Num-bug20180618_1', ()=> {	// ok
	expect(parser.parse(" 1")).toBe(1);
});
it('Num-bug20180618_0.0', ()=> {	// ok
	expect(parser.parse("0.0")).toBe(0.0);
});
it('Num-bug20180618_1.0', ()=> {	// ok
	expect(parser.parse(" 1.0")).toBe(1.0);
});
it('Num-bug20180618_null', ()=> {	// ok
	expect(parser.parse("null")).toBeNull();
});

it('Num-1', ()=> {
	expect(parser.parse("(1 + 2)")).toBe(3);
});
it('Num0', ()=> {
	expect(parser.parse("5 * (1 + 2)")).toBe(15);
});
it('Num0.1', ()=> {
	expect(parser.parse("5 * 1 + 2")).toBe(7);
});
it('Num0.2', ()=> {
	expect(parser.parse("1 + 2 * 5")).toBe(11);
});
it('Num0.3', ()=> {
	expect(parser.parse("5 ** (1 + 2)")).toBe(125);
});
it('Num0.5', ()=> {
	expect(parser.parse("0.5")).toBe(0.5);
});
it('Num1', ()=> {
	expect(parser.parse("1 * 4 > 2 && 3 % 2 == 1 ? 100 / 3 : 3")).toBe(33.333333333333336);
});
it('Num2', ()=> {
	expect(parser.parse("0xff")).toBe(255);
});
it('Num3', ()=> {
	expect(parser.parse("0xffffff")).toBe(16777215);
});
it('Num4', ()=> {
	expect(parser.parse("10 ¥ 4")).toBe(2);
});
it('Num5', ()=> {
	expect(parser.parse("10 / 4")).toBe(2.5);
});
it('Num6', ()=> {
	expect(parser.parse("11 % 4")).toBe(3);
});
it('Num7_10', ()=> {
	expect(parser.parse("14 & 9")).toBe(8);	// Add
		// 1001 -- 9
		// 1110 --14
		// 1000 -- 8
});
it('Num7_11', ()=> {
	expect(parser.parse("14 ^ 9")).toBe(7);	// Add
		// 1001 -- 9
		// 1110 --14
		// 0111 -- 7
});
it('Num7_12', ()=> {
	expect(parser.parse("14 | 9")).toBe(15);	// Add
		// 1001 -- 9
		// 1110 --14
		// 1111 --15
});
it('Num7_13', ()=> {
	expect(parser.parse("~ 9")).toBe(-10);	// Add
		// 00001001 --   9
		// 11110110 -- -10
});
it('Num7_15', ()=> {
	expect(parser.parse("9 << 2")).toBe(36);	// Add
		// 00001001 --  9
		// 00100100 -- 36
});
it('Num7_16', ()=> {
	expect(parser.parse("9 >> 2")).toBe(2);	// Add
		// 00001001 --  9
		// 00000010 --  2
});
it('Num7_16_', ()=> {
	expect(parser.parse("-9 >> 2")).toBe(-3);	// Add
		// 11110111 -- -9
		// 11111101 -- -3
});
it('Num7_17', ()=> {
	expect(parser.parse("9 >>> 2")).toBe(2);	// Add
		// 00001001 --  9
		// 00000010 --  2
});
it('Num7_17_', ()=> {
	expect(parser.parse("-9 >>> 2")).toBe(1073741821);	// Add
		// 11111111111111111111111111110111 -- -9
		// 00111111111111111111111111111101 -- -3
});

it('Num20', ()=> {	// 2018/07/12
	expect(parser.parse("-2")).toBe(-2);
});
it('Num21', ()=> {
	expect(()=> parser.parse("--2"))	// まぁ文法エラーかなと
	.toThrowError('(PropParser)文法エラー【--2】');
});
it('Num22', ()=> {
	expect(()=> parser.parse("+2"))		// まぁ文法エラーかなと
	.toThrowError('(PropParser)文法エラー【+2】');
});
it('Num25', ()=> {
	expect(parser.parse("-2.3")).toBe(-2.3);
});
it('Num26', ()=> {
	expect(()=> parser.parse("--2.3"))	// まぁ文法エラーかなと
	.toThrowError('(PropParser)文法エラー【--2.3】');
});
it('Num27', ()=> {
	expect(()=> parser.parse("+2.3"))	// まぁ文法エラーかなと
	.toThrowError('(PropParser)文法エラー【+2.3】');
});

// 未使用 -> SKYNovelからサポート
it('Num_int0', ()=> {
	expect(parser.parse("int(10)")).toBe(10);
});
it('Num_int1', ()=> {
	expect(parser.parse("int(2.5)")).toBe(2);
});
it('Num_int2', ()=> {
	expect(parser.parse("int(10 / 4)")).toBe(2);
});
it('Num_int2b', ()=> {
	expect(()=> parser.parse("int('10 / 4')"))
	.toThrowError('(PropParser)引数【10 / 4】が数値ではありません');
});
it('Num_int2c', ()=> {
	expect(parser.parse("parseInt('10 / 4')"),).toBe(2);
});
	it('Num_Num2c', ()=> {
		expect(parser.parse("Number('10 / 4')")).toBe(2.5);
	});
it('Num_int2d', ()=> {
	expect(parser.parse("parseInt(10 / 4)")).toBe(2);
});
it('Num_ceil', ()=> {
	expect(parser.parse("ceil( 3.5)")).toBe(4);
	expect(parser.parse("ceil(-3.5)")).toBe(-3);
	expect(parser.parse("ceil(-3.5) ")).toBe(-3);
});
it('Num_floor', ()=> {
	expect(parser.parse("floor( 3.5)")).toBe(3);
	expect(parser.parse("floor(-3.5)")).toBe(-4);
});
it('Num_round', ()=> {
	expect(parser.parse("round( 3.5)")).toBe(4);
	expect(parser.parse("round( 3.49)")).toBe(3);
	expect(parser.parse("round(-3.5)")).toBe(-3);
	expect(parser.parse("round(-3.51)")).toBe(-4);
});
it('Num_NaN0', ()=> {
	expect(parser.parse('1 + undefined')).toBeNaN();
	expect(parser.parse('"#{1 + undefined}"')).toBe('NaN');
		// 1 + undefined は NaN
		// https://www.ikkitang1211.site/entry/defer-null-undefined
		// JavaScriptの仕様として、 toNumber(null) は 0 / toNumber(undefined) は NaN とするという取り決めがある
			// NaN が判定できると数値 undefined 判定の取りこぼししなくなる
});
it('Num_NaN1', ()=> {
	expect(parser.parse('isNaN(1 + undefined)')).toBe(true);
});
it('Num_NaN2', ()=> {
	expect(parser.parse('! isNaN(1 + undefined)')).toBe(false);
});
it('Num_NaN3', ()=> {
	expect(parser.parse('isNaN(tmp:nan)')).toBe(true);
});

// 比較
it('Num10', ()=> {
	expect(parser.parse("5 * (1 + 2)<14")).toBe(false);
});
it('Num11', ()=> {
	expect(parser.parse("5 * (1 + 2)<=14")).toBe(false);
});
it('Num12', ()=> {
	expect(parser.parse("5 * (1 + 2)==14")).toBe(false);
});
it('Num12_', ()=> {
	expect(parser.parse("5 * (1 + 2)!=14")).toBe(true);
});
it('Num13', ()=> {
	expect(parser.parse("5 * (1 + 2)>=14")).toBe(true);
});
it('Num14', ()=> {
	expect(parser.parse("5 * (1 + 2)>14")).toBe(true);
});


it('Num20', ()=> {
	expect(parser.parse("5 * (1 + 2)<15")).toBe(false);
});
it('Num21', ()=> {
	expect(parser.parse("5 * (1 + 2)<=15")).toBe(true);
});
it('Num22', ()=> {
	expect(parser.parse("5 * (1 + 2)==15")).toBe(true);
});
it('Num22_', ()=> {
	expect(parser.parse("5 * (1 + 2)!=15")).toBe(false);
});
it('Num23', ()=> {
	expect(parser.parse("5 * (1 + 2)>=15")).toBe(true);
});
it('Num24', ()=> {
	expect(parser.parse("5 * (1 + 2)>15")).toBe(false);
});


it('Num30', ()=> {
	expect(parser.parse("5 * (1 + 2)<16")).toBe(true);
});
it('Num31', ()=> {
	expect(parser.parse("5 * (1 + 2)<=16")).toBe(true);
});
it('Num32', ()=> {
	expect(parser.parse("5 * (1 + 2)==16")).toBe(false);
});
it('Num32_', ()=> {
	expect(parser.parse("5 * (1 + 2)!=16")).toBe(true);
});
it('Num33', ()=> {
	expect(parser.parse("5 * (1 + 2)>=16")).toBe(false);
});
it('Num34', ()=> {
	expect(parser.parse("5 * (1 + 2)>16")).toBe(false);
});


it('Num40', ()=> {
	expect(parser.parse("5 * (1 + 2)==15 == true")).toBe(true);
});
it('Num40_', ()=> {
	expect(parser.parse("5 * (1 + 2)==15 != true")).toBe(false);
});
it('Num41', ()=> {
	expect(parser.parse("5 * (1 + 2)==15 == false")).toBe(false);
});
it('Num41_', ()=> {
	expect(parser.parse("5 * (1 + 2)==15 != false")).toBe(true);
});
it('Num42', ()=> {
	expect(parser.parse("5 * (1 + 2)==15 === true")).toBe(true);
});
it('Num42_', ()=> {
	expect(parser.parse("5 * (1 + 2)==15 !== true")).toBe(false);
});
it('Num42_2', ()=> {
	expect(parser.parse("5 * (1 + 2)==15 === 'true'")).toBe(false);
});
it('Num43', ()=> {
	expect(parser.parse("5 * (1 + 2)==15 === false")).toBe(false);
});
it('Num43_', ()=> {
	expect(parser.parse("5 * (1 + 2)==15 !== false")).toBe(true);
});

it('Num50', ()=> {
	expect(parser.parse("! false")).toBe(true);
});
it('Num51', ()=> {
	expect(parser.parse("! true")).toBe(false);
});
it('Num52', ()=> {
	expect(parser.parse("! (5 * (1 + 2)==15)")).toBe(false);
});
it('Num53', ()=> {
	expect(parser.parse("! (5 * (1 + 2)!=15)")).toBe(true);
});

it('Num60 err', ()=> {
	expect(()=> parser.parse("4 : 10"))
	.toThrowError('(PropParser)三項演算子の文法エラーです。? が見つかりません');
});
it('Num60_ err', ()=> {
	expect(()=> parser.parse("4 ? 10"))
	.toThrowError('(PropParser)三項演算子の文法エラーです。: が見つかりません');
});
it('Num60_2 err', ()=> {
	expect(()=> parser.parse("true ? 10 = 2"))
	.toThrowError('(PropParser)文法エラー【true ? 10 = 2】');
});
it('Num60_3 err', ()=> {
	expect(()=> parser.parse("false ? 10 = 2"))
	.toThrowError('(PropParser)文法エラー【false ? 10 = 2】');
});
it('Num60_4 err', ()=> {
	expect(()=> parser.parse("4 ? 10 = 2"))
	.toThrowError('(PropParser)文法エラー【4 ? 10 = 2】');
});
it('Num61', ()=> {
	expect(parser.parse("false ? 4 : 10")).toBe(10);
});
it('Num62', ()=> {
	expect(parser.parse("true ? 4 : 10")).toBe(4);
});
it('Num63', ()=> {
	expect(parser.parse("5 > 1 + 2 ? 4 : 10")).toBe(4);
});
it('Num64', ()=> {
	expect(parser.parse("5 < 1 + 2 ? 4 : 10")).toBe(10);
});
it('Num65 err', ()=> {
	expect(parser.parse("1 ? 4 : 10")).toBe(4);
});
it('Num66 err', ()=> {
	expect(()=> parser.parse("true ? 4"))
	.toThrowError('(PropParser)三項演算子の文法エラーです。: が見つかりません');
});
it('Num67 err', ()=> {
	expect(()=> parser.parse("false : 10"))
	.toThrowError('(PropParser)三項演算子の文法エラーです。? が見つかりません');
});

// 変な文法
it('BadStr0', ()=> {
	expect(()=> parser.parse("@@").toString())
	.toThrowError('(PropParser)文法エラー【@@】');
});
it('BadStr1', ()=> {
	expect(()=> parser.parse(""))
	.toThrowError('(PropParser)文法エラー【】');
});
it('BadStr2', ()=> {
	expect(()=> parser.parse("(´ω⊂"))
	.toThrowError('(PropParser)文法エラー【(´ω⊂】');
//					'(PropParser)不明な単語【´ω⊂】です');
});


// 文字列
it('Str0', ()=> {
	expect(parser.parse("'@@'")).toBe("@@");
});
it('Str1', ()=> {
	expect(parser.parse("''")).toBe("");
});
it('Str2', ()=> {
	expect(parser.parse("'(´ω⊂'")).toBe("(´ω⊂");
});
it('Str3', ()=> {
	expect(parser.parse('"(´Д⊂"')).toBe("(´Д⊂");
});
it('Str4', ()=> {
	expect(parser.parse("'0<5'")).toBe("0<5");
});

it('Str5', ()=> {
	expect(parser.parse("' @+@ '")).toBe(" @+@ ");
});
it('Str6', ()=> {
	expect(parser.parse("'@ + @'")).toBe("@ + @");
});
it('Str7', ()=> {
	expect(parser.parse("'いろは' + 'にほへ'")).toBe("いろはにほへ");
});
	it('Str7_2', ()=> {
		expect(parser.parse("'いろは' + 55")).toBe("いろは55");
	});
	it('Str7_3', ()=> {
		expect(parser.parse("74 + 'にほへ'")).toBe("74にほへ");
	});
it('Str8', ()=> {	// 2018/07/12
	expect(parser.parse("'05'")).toBe("05");
});
it('Str9', ()=> {	// 2018/07/12
	expect(parser.parse("' 05　'")).toBe(" 05　");
});
it('Str10', ()=> {	// 2021/09/29 エスケープシーケンス導入
	expect(parser.parse(`'\\''`)).toBe(`'`);
	expect(parser.parse(`"\\""`)).toBe(`"`);
	expect(parser.parse(`#\\##`)).toBe(`#`);
	expect(parser.parse(`#\\\n#`)).toBe(`\n`);
});

// 変数
it('Var0', ()=> {	// からまーぞふ、は未定義リテラル
	expect(parser.parse("からまーぞふ")).toBeUndefined();
});
it('Var0_1', ()=> {	// JavaScriptでは undefined == null。==がポイント
	expect(parser.parse("からまーぞふ")).toBeUndefined();
});
	it('Var0_2', ()=> {
		expect(parser.parse("tmp:null_n")).toBeNull();
	});
	it('Var0_3', ()=> {
		expect(parser.parse("tmp:null_s")).toBe('null');
	});
it('Var1', ()=> {
	expect(parser.parse("から")).toBe("");
});
it('Var2', ()=> {
	expect(parser.parse("'いろ' + 春夏 + 'は'")).toBe("いろ秋冬は");
});

it('Var10', ()=> {
	expect(parser.parse("mp:fn")).toBe("うひひ");
});
it('Var10_1', ()=> {
	expect(true).toBe(parser.parse("sys:_album.img.渡り廊下・桜昼"));
});
it('Var10_2', ()=> {
	expect(true).toBe(parser.parse("、〇〰〽ぁヿ㐂一豈！￥"));
});
it('Var11', ()=> {
	expect(parser.parse("mp:fn == mp:lay")).toBe(false);
});
it('Var11_1', ()=> {
	expect(parser.parse("mp:fn != mp:lay")).toBe(true);
});
it('Var11_2', ()=> {
	expect(parser.parse("!(mp:fn == mp:lay)")).toBe(true);
});
it('Var11_3', ()=> {
	expect(parser.parse("!(mp:fn != mp:lay)")).toBe(false);
});
it('Var11_4', ()=> {
	expect(parser.parse("!!(mp:fn == mp:lay)")).toBe(false);
});
it('Var11_5', ()=> {
	expect(parser.parse("!!(mp:fn != mp:lay)")).toBe(true);
});

it('Var12', ()=> {
	expect(parser.parse("mp:fn == mp:pos")).toBe(true);
});
it('Var12_', ()=> {
	expect(parser.parse("mp:fn != mp:pos")).toBe(false);
});
it('Var12_2', ()=> {
	expect(parser.parse("!(mp:fn == mp:pos)")).toBe(false);
});
it('Var12_3', ()=> {
	expect(parser.parse("!(mp:fn != mp:pos)")).toBe(true);
});
it('Var12_4', ()=> {
	expect(parser.parse("!!(mp:fn == mp:pos)")).toBe(true);
});
it('Var12_5', ()=> {
	expect(parser.parse("!!(mp:fn != mp:pos)")).toBe(false);
});

it('Var13', ()=> {
	expect(parser.parse("春夏")).toBe("秋冬");
});
it('Var14', ()=> {
	expect(parser.parse("春夏 == '秋冬'")).toBe(true);
});


it('Var20', ()=> {
	expect(parser.parse("ぎょへー")).toBe("もきゅ");
});
it('Var21', ()=> {
	expect(parser.parse("ぎょへー == mp:lay")).toBe(true);
});
it('Var22', ()=> {
	expect(parser.parse("ぎょへー == 'もきゅ'")).toBe(true);
});
it('Var23', ()=> {
	expect(parser.parse("ぎょへー != 'きゅ'")).toBe(true);
});

it('Var30', ()=> {	// うきょ、は未定義リテラル
	expect(parser.parse("うきょ == null")).toBe(true);
});
it('Var31', ()=> {
	expect(parser.parse("うきょ != null")).toBe(false);
});
it('Var32', ()=> {
//	expect(parser.parse("うきょ === null")).toBe(true);
	expect(parser.parse("うきょ === null")).toBe(false);	// SKYNovelから
});
it('Var33', ()=> {
//	expect(parser.parse("うきょ !== null")).toBe(false);
	expect(parser.parse("うきょ !== null")).toBe(true);	// SKYNovelから
});


it('Var35', ()=> {	// うきょ、は未定義リテラル
	expect(parser.parse("うきょ == 'null'")).toBe(false);
});
it('Var36', ()=> {
	expect(parser.parse("うきょ != 'null'")).toBe(true);
});
it('Var37', ()=> {
	expect(parser.parse("うきょ === 'null'")).toBe(false);
});
it('Var38', ()=> {
	expect(parser.parse("うきょ !== 'null'")).toBe(true);
});
it('Var39', ()=> {
//	expect(parser.parse("null == 'null'")).toBe(false);
	expect(parser.parse("null == 'null'")).toBe(true);	// SKYNovelから
});
it('Var40', ()=> {
	expect(parser.parse("null == tmp:null_n")).toBe(true);
});
it('Var41', ()=> {
	expect(parser.parse("tmp:null_n|0xF == 0xF")).toBeTruthy();	// 1
});
it('Var42', ()=> {
//	expect(parser.parse("null == tmp:null_s")).toBe(false);
	expect(parser.parse("null == tmp:null_s")).toBe(true);	// SKYNovelから
});
it('Var43', ()=> {
	expect(parser.parse("tmp:null_s|0xF == 0xF")).toBeTruthy();	// 1
});


it('VarLogic01', ()=> {
	expect(parser.parse("true")).toBe(true);
});
it('VarLogic02', ()=> {
	expect(parser.parse("false")).toBe(false);
});
it('VarLogic03', ()=> {
	expect(parser.parse("! false || false")).toBe(true);
});
it('VarLogic04', ()=> {
	expect(parser.parse("true &&(true)")).toBe(true);
});
/*		it('VarLogic05', ()=> {
//			expect(parser.parse("true &&(true || false)")).toBe(true);
	expect(parser.parse("true &&(true | false)")).toBe(true);
		// 独自不具合仕様か
		// （SKYNovel）意図がわからないのでテスト無効
});
*/		it('VarLogic06', ()=> {
	expect(parser.parse("true &&(!true || true)")).toBe(true);
});
it('VarLogic07', ()=> {
//	expect(parser.parse("true == 'true'")).toBe(false);
	// テストが間違ってる気がする
	// SKYNovelから
	expect(parser.parse("true == 'true'")).toBe(true);
});
it('VarLogic07_', ()=> {
	expect(parser.parse("true === 'true'")).toBe(false);
});
it('VarLogic08', ()=> {
//	expect(parser.parse("false == 'false'")).toBe(false);
	// テストが間違ってる気がする
	// SKYNovelから
	expect(parser.parse("false == 'false'")).toBe(true);
});
it('VarLogic08_', ()=> {
	expect(parser.parse("false === 'false'")).toBe(false);
});
it('VarLogic10', ()=> {
	expect(parser.parse("undefined")).toBeUndefined();
});
it('VarLogic10_2', ()=> {	// JavaScriptでは undefined == null。==がポイント
	expect(parser.parse("undefined")).toBeUndefined();
});
it('VarLogic10_3', ()=> {
	expect(parser.parse("undefined == null")).toBe(true);
});
it('VarLogic10_4', ()=> {	// むきょー、は未定義リテラル
	expect(parser.parse("むきょー == null")).toBe(true);
});
it('VarLogic11', ()=> {
	expect(parser.parse("! undefined")).toBe(true);
});
it('VarLogic12', ()=> {
	expect(parser.parse("null")).toBeNull();
});
it('VarLogic13', ()=> {
	expect(parser.parse("! null")).toBe(true);
});


// 連想配列
it('Hash-2', ()=> {
	expect(parser.parse("hA.秋冬.args")).toBe("よいと");
});
it('Hash-1', ()=> {
	expect(parser.parse("hA.args")).toBe("めけ");
});
it('Hash0', ()=> {
	expect(parser.parse("hA['args']")).toBe("めけ");
});
it('Hash0b', ()=> {
	expect(parser.parse('hA["args"]')).toBe("めけ");
});
it('Hash1', ()=> {
	expect(parser.parse("hA[ひきす]")).toBe("めけ");
});
it('Hash2', ()=> {
	expect(parser.parse("hB[1 + 4]")).toBe("ニョホ");
});
it('Hash3', ()=> {
	expect(parser.parse("hC[5 + 'reg']")).toBe("ニョホ2");
});
it('Hash4', ()=> {
	expect(parser.parse("hC['args'+ 9]")).toBe("ニョホ3");
});

it('Hash5', ()=> {
	expect(parser.parse("hC[ひきす + 9]")).toBe("ニョホ3");
});
it('Hash6', ()=> {
	expect(parser.parse("hA[春夏][ひきす]")).toBe("よいと");
});
it('Hash7', ()=> {
	expect(parser.parse("hA[春夏].args")).toBe("よいと");
});
it('Hash8', ()=> {
	expect(parser.parse("hA['秋冬']['args']")).toBe("よいと");
});

it('Hash10_err', ()=> {
	expect(parser.parse("hA['秋冬err']['args']")).toBeUndefined();
});
it('Hash11_err', ()=> {
	expect(parser.parse("hA['秋冬']['argsERR']")).toBeUndefined();
});
it('Hash12_err', ()=> {
	expect(parser.parse("hAerr['秋冬']['args']")).toBeUndefined();
});

// 変数埋め込み
it('EmbedPerl0', ()=> {
	expect(parser.parse("'せを$春夏 はやみ'")).toBe("せを秋冬 はやみ");
});
it('EmbedPerl1', ()=> {
	expect(parser.parse("'せを$春夏'+'はやみ'")).toBe("せを秋冬はやみ");
});
it('EmbedPerl2', ()=> {
	expect(parser.parse("'せを$春夏$mp:pos'+'はや'")).toBe("せを秋冬うひひはや");
});
it('EmbedPerl3', ()=> {
	expect(parser.parse("'せ$hC.5reg は'")).toBe("せニョホ2 は");
});
it('EmbedPerl4', ()=> {
	expect(parser.parse("'$hD.数値'")).toBe("1.20");
});

it('EmbedPerl5', ()=> {
	expect(parser.parse("tmp:zero_s + tmp:one_s")).toBe("01");
});
it('EmbedPerl6', ()=> {
	expect(parser.parse("tmp:zero_s + tmp:one_n")).toBe("01");
});
it('EmbedPerl7', ()=> {
	expect(parser.parse("tmp:zero_n + tmp:one_s")).toBe("01");
});
it('EmbedPerl8', ()=> {
	expect(parser.parse("tmp:zero_n + tmp:one_n")).toBe(1);
});

it('EmbedPerl10', ()=> {	// 2018/07/12 加減算ではなく＋−の正号・負号
	expect(parser.parse("-hD.数値")).toBe(-1.20);
});
it('EmbedPerl11', ()=> {
	expect(()=> parser.parse("+hD.数値"))
	.toThrowError('(PropParser)文法エラー【+hD.数値】');
});
it('EmbedPerl12', ()=> {
	expect(parser.parse("0-hD.数値")).toBe(-1.20);
});
it('EmbedPerl13', ()=> {
	expect(parser.parse("0+hD.数値")).toBe('01.20');
});
it('EmbedPerl14', ()=> {
	expect(()=> parser.parse("-むきょー"))	// むきょー、は未定義リテラル
	.toThrowError('(PropParser)数値以外に-符号がついています');
});
it('EmbedPerl15', ()=> {
	expect(()=> parser.parse("-tmp:null_n"))	// まぁ文法エラーかなと
	.toThrowError('(PropParser)数値以外に-符号がついています');
});
it('EmbedPerl16', ()=> {
	expect(()=> parser.parse("-tmp:null_s"))
	.toThrowError('(PropParser)数値以外に-符号がついています');
});
it('EmbedPerl17', ()=> {
	expect(parser.parse("!tmp:null_n")).toBe(true);
});
it('EmbedPerl18', ()=> {
	expect(()=> parser.parse("-false"))
	.toThrowError('(PropParser)数値以外に-符号がついています');
});
it('EmbedPerl19', ()=> {
	expect(()=> parser.parse("-true"))
	.toThrowError('(PropParser)数値以外に-符号がついています');
});

it('EmbedPer20', ()=> {
	expect(parser.parse("'を$春夏,は'")).toBe("を秋冬,は");
});
it('EmbedPer21', ()=> {
	expect(parser.parse("'を$春夏{は'")).toBe("を秋冬{は");
});
it('EmbedPer22', ()=> {
	expect(parser.parse("'を$春夏}は'")).toBe("を秋冬}は");
});
it('EmbedPer23', ()=> {
	expect(parser.parse("'を$春夏[は'")).toBe("を秋冬[は");
});
it('EmbedPer24', ()=> {
	expect(parser.parse("'を$春夏]は'")).toBe("を秋冬]は");
});
it('EmbedPer25', ()=> {
	expect(parser.parse("'を$春夏(は'")).toBe("を秋冬(は");
});
it('EmbedPer26', ()=> {
	expect(parser.parse("'を$春夏)は'")).toBe("を秋冬)は");
});
it('EmbedPer27', ()=> {
	expect(parser.parse("'を$春夏<は'")).toBe("を秋冬<は");
});
it('EmbedPer28', ()=> {
	expect(parser.parse("'を$春夏>は'")).toBe("を秋冬>は");
});
it('EmbedPer29', ()=> {
	expect(parser.parse("'を$春夏/は'")).toBe("を秋冬/は");
});
//		it('EmbedPer30', ()=> {	// エスケープシーケンス導入で不可に
//			expect(parser.parse("'を$春夏\\は'")).toBe("を秋冬\\は");
//		});


it('EmbedRuby0', ()=> {
	expect(parser.parse("'せを#{春夏} はやみ'")).toBe("せを秋冬 はやみ");
});
it('EmbedRuby1', ()=> {
	expect(parser.parse("'せを#{春夏}'+'はやみ'")).toBe("せを秋冬はやみ");
});
it('EmbedRuby2', ()=> {
	expect(parser.parse("'せを#{春夏}はやみ'")).toBe("せを秋冬はやみ");
});
it('EmbedRuby3', ()=> {
	expect(parser.parse("'せを#{10 / 4}やみ'")).toBe("せを2.5やみ");
//			expect(parser.parse("'せを#{10 / 4}やみ'")).toBe("せをnullやみ");
});

it('EmbedPerlRuby0', ()=> {
	expect(parser.parse("'せを$春夏$mp:pos#{hB.5}は'")).toBe("せを秋冬うひひニョホは");
});


it('_getValName0', ()=> {
	const o = PropParser.getValName('mp:fn');
	expect(o?.scope).toBe('mp');
	expect(o?.name).toBe('fn');
	expect(o?.at).toBe('');
});
it('_getValName1', ()=> {
	const o = PropParser.getValName('fn');
	expect(o?.scope).toBe('tmp');
	expect(o?.name).toBe('fn');
	expect(o?.at).toBe('');
});
it('_getValName2', ()=> {
	const o = PropParser.getValName('ぎょへー');
	expect(o?.scope).toBe('tmp');
	expect(o?.name).toBe('ぎょへー');
	expect(o?.at).toBe('');
});
it('_getValName3', ()=> {
	const o = PropParser.getValName('hC.5reg');
	expect(o?.scope).toBe('tmp');
	expect(o?.name).toBe('hC.5reg');
	expect(o?.at).toBe('');
});
it('_getValName4', ()=> {
	const o = PropParser.getValName('hA.秋冬.args');
	expect(o?.scope).toBe('tmp');
	expect(o?.name).toBe('hA.秋冬.args');
	expect(o?.at).toBe('');
});
it('_getValName5', ()=> {
	const o = PropParser.getValName('sys:_album.img.渡り廊下・桜昼');
	expect(o?.scope).toBe('sys');
	expect(o?.name).toBe('_album.img.渡り廊下・桜昼');
	expect(o?.at).toBe('');
});

it('_getValName10', ()=> {
	const o = PropParser.getValName("hA['args']");
	expect(o?.scope).toBe('tmp');
	expect(o?.name).toBe('hA.args');
	expect(o?.at).toBe('');
});
it('_getValName11', ()=> {
	const o = PropParser.getValName('hA["args"]');
	expect(o?.scope).toBe('tmp');
	expect(o?.name).toBe('hA.args');
	expect(o?.at).toBe('');
});
it('_getValName12', ()=> {
	const o = PropParser.getValName('hA["args"]["rrr"]');
	expect(o?.scope).toBe('tmp');
	expect(o?.name).toBe('hA.args.rrr');
	expect(o?.at).toBe('');
});

	// 不具合
	it('Var170109_0', ()=> {
		expect(parser.parse("true && ( 1080 > 1440 || 1920 > 2560 )")).toBe(false);
		expect(parser.parse("true && ( false || false )")).toBe(false);
		expect(parser.parse("( false || false )")).toBe(false);
	});

	// あとで直す
	it('Var170109_1', ()=> {
		expect(parser.parse("true && ( 1441 > 1440 || 1920 > 2560 )")).toBe(true);
		expect(parser.parse("true && ( true || false )")).toBe(true);
		expect(parser.parse("( true || false )")).toBe(true);
			// Error: No match for )
	});

it('_getValName_err0', ()=> {
	const o = PropParser.getValName('mp:f:n');
	expect(o).toBeUndefined();
});
