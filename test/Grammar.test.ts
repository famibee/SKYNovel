/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2022 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Grammar, REG_TAG, splitAmpersand} from '../src/sn/Grammar';

let	vctToken	: RegExpMatchArray | null	= null;
let	vctTokenLen	= 0;

let	grm: Grammar;

beforeEach(()=> {
	grm = new Grammar;
	vctToken = null;
});

it('testAnalyzeScript0',()=> {
	const sScr = "";
	expect(grm).not.toBeNull();
	vctToken = grm.matchToken(sScr);
	expect(vctToken).not.toBeNull();
////	compile	err	= Vector.<String>(sScr.toLocaleString().match(REG_TOKEN));
//	if (vctToken.length === null) return;

	expect(vctToken).toHaveLength(0);
});

it('testAnalyzeScript_str1',()=> {
	const sScr = "うひょー";
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
/*
trace("len:"+ vctTokenLen);
for (let i=0; i<vctTokenLen; ++i) trace(i +"@"+ vctToken[i]);
*/
	expect(vctToken).toHaveLength(1);
	expect(vctToken[0]).toBe("うひょー");
});

it('testAnalyzeScript_n1',()=> {
	const sScr = "\n";
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(1);
	expect(vctToken[0]).toBe("\n");
});
it('testAnalyzeScript_n8',()=> {
	const sScr = "\n\n\n\n\n\n\n\n";
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(1);
	expect(vctToken[0]).toBe("\n\n\n\n\n\n\n\n");
});
it('testAnalyzeScript_n3t2n5',()=> {
	const sScr = "\n\n\n\t\t\n\n\n\n\n";
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(3);
	expect(vctToken[0]).toBe("\n\n\n");
	expect(vctToken[1]).toBe("\t\t");
	expect(vctToken[2]).toBe("\n\n\n\n\n");
});

it('testAnalyzeScript_ans',()=> {
	const sScr = '\t[add_lay layer=mes class=txt]\n\t[add_lay layer=upd class=grp]\n\t[lay layer="mes" visible=true b_alpha=0 r_size=12 r_align="121" layout=\'blockProgression="rl" lineHeight="36" paddingTop="15" paddingRight="15" fontSize="24" color="0xffffff"\']\n\n\t[title text="&tmp:const.flash.desktop.NativeApplication.nativeApplication.applicationDescriptor.filename +\'  ver \'+ tmp:const.flash.desktop.NativeApplication.nativeApplication.applicationDescriptor.version"]\n\n\t空気《え あ》小説《のべる》[r]\n\tばい　ふぁみべぇ[r]\n[r]\n\tクリックで更新確認[r]\n\tするよー[p][er]\n\n\t[lay layer=upd fn="update" visible=true left=86 top=86]\n[update_check url="http://ugainovel.ddo.jp/ans/ver.xml" config_fn="update.xml"]\n\t何かあれば[r]\n\t通知します。[r]\n[r][r][r][r]\n\t数秒経っても無反応なら更新はありません。\n*loop\n[l]\n[jump label=*loop]\n';
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(58);
	expect(vctToken[0]).toBe("\t");
	expect(vctToken[1]).toBe("[add_lay layer=mes class=txt]");
	expect(vctToken[2]).toBe("\n");
	expect(vctToken[3]).toBe("\t");
	expect(vctToken[4]).toBe("[add_lay layer=upd class=grp]");
	expect(vctToken[5]).toBe("\n");
	expect(vctToken[6]).toBe("\t");
	expect(vctToken[7]).toBe('[lay layer="mes" visible=true b_alpha=0 r_size=12 r_align="121" layout=\'blockProgression="rl" lineHeight="36" paddingTop="15" paddingRight="15" fontSize="24" color="0xffffff"\']');
	expect(vctToken[8]).toBe("\n\n");
	expect(vctToken[9]).toBe("\t");
	expect(vctToken[10]).toBe('[title text="&tmp:const.flash.desktop.NativeApplication.nativeApplication.applicationDescriptor.filename +\'  ver \'+ tmp:const.flash.desktop.NativeApplication.nativeApplication.applicationDescriptor.version"]');
	expect(vctToken[11]).toBe("\n\n");
	expect(vctToken[12]).toBe("\t");
	expect(vctToken[13]).toBe("空気《え あ》小説《のべる》");
	expect(vctToken[14]).toBe("[r]");
	expect(vctToken[15]).toBe("\n");
	expect(vctToken[16]).toBe("\t");
	expect(vctToken[17]).toBe("ばい　ふぁみべぇ");
	expect(vctToken[18]).toBe("[r]");
	expect(vctToken[19]).toBe("\n");
	expect(vctToken[20]).toBe("[r]");
	expect(vctToken[21]).toBe("\n");
	expect(vctToken[22]).toBe("\t");
	expect(vctToken[23]).toBe("クリックで更新確認");
	expect(vctToken[24]).toBe("[r]");
	expect(vctToken[25]).toBe("\n");
	expect(vctToken[26]).toBe("\t");
	expect(vctToken[27]).toBe("するよー");
	expect(vctToken[28]).toBe("[p]");
	expect(vctToken[29]).toBe("[er]");
	expect(vctToken[30]).toBe("\n\n");
	expect(vctToken[31]).toBe("\t");
	expect(vctToken[32]).toBe('[lay layer=upd fn="update" visible=true left=86 top=86]');
	expect(vctToken[33]).toBe("\n");
	expect(vctToken[34]).toBe('[update_check url="http://ugainovel.ddo.jp/ans/ver.xml" config_fn="update.xml"]');
	expect(vctToken[35]).toBe("\n");
	expect(vctToken[36]).toBe("\t");
	expect(vctToken[37]).toBe("何かあれば");
	expect(vctToken[38]).toBe("[r]");
	expect(vctToken[39]).toBe("\n");
	expect(vctToken[40]).toBe("\t");
	expect(vctToken[41]).toBe("通知します。");
	expect(vctToken[42]).toBe("[r]");
	expect(vctToken[43]).toBe("\n");
	expect(vctToken[44]).toBe("[r]");
	expect(vctToken[45]).toBe("[r]");
	expect(vctToken[46]).toBe("[r]");
	expect(vctToken[47]).toBe("[r]");
	expect(vctToken[48]).toBe("\n");
	expect(vctToken[49]).toBe("\t");
	expect(vctToken[50]).toBe("数秒経っても無反応なら更新はありません。");
	expect(vctToken[51]).toBe("\n");
	expect(vctToken[52]).toBe("*loop");
	expect(vctToken[53]).toBe("\n");
	expect(vctToken[54]).toBe("[l]");
	expect(vctToken[55]).toBe("\n");
	expect(vctToken[56]).toBe("[jump label=*loop]");
	expect(vctToken[57]).toBe("\n");
});
it('testAnalyzeScript_tag_in_string',()=> {
	const sScr = '[lay layer="mes" chk_overrow=false over_ins_tag="[plc]"]\n';
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(2);
	expect(vctToken[0]).toBe('[lay layer="mes" chk_overrow=false over_ins_tag="[plc]"]');
	expect(vctToken[1]).toBe("\n");
});
it('testAnalyzeScript_bug120904',()=> {
	const sScr = '; [hoge\n[s]\n[trace text="error"]';
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(5);
	expect(vctToken[0]).toBe("; [hoge");
	expect(vctToken[1]).toBe("\n");
	expect(vctToken[2]).toBe("[s]");
	expect(vctToken[3]).toBe("\n");
	expect(vctToken[4]).toBe('[trace text="error"]');
});
it('testAnalyzeScript_bug120904_2',()=> {
	const sScr = '; [hoge\n[s]\n[trace text="["]';
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(5);
	expect(vctToken[0]).toBe("; [hoge");
	expect(vctToken[1]).toBe("\n");
	expect(vctToken[2]).toBe("[s]");
	expect(vctToken[3]).toBe("\n");
	expect(vctToken[4]).toBe('[trace text="["]');
});
it('testAnalyzeScript_bug120904_3',()=> {
	const sScr = '; [hoge\n[s]\n[trace text="]"]';
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(5);
	expect(vctToken[0]).toBe("; [hoge");
	expect(vctToken[1]).toBe("\n");
	expect(vctToken[2]).toBe("[s]");
	expect(vctToken[3]).toBe("\n");
	expect(vctToken[4]).toBe('[trace text="]"]');
});
it('testAnalyzeScript_bug140108',()=> {
	const sScr = '[let name="sysse_ok1" text="BurstB_11"]\n\n\n; 立ち絵配置位置定数\n;	[lay pos=&pos.l	等として使用。\n;	組み込みで「c」という指定が出来る。例：pos=c、pos="c"\n[let name="pos.l" text="140"]';
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(9);
	expect(vctToken[0]).toBe('[let name="sysse_ok1" text="BurstB_11"]');
	expect(vctToken[1]).toBe('\n\n\n');
	expect(vctToken[2]).toBe('; 立ち絵配置位置定数');
	expect(vctToken[3]).toBe('\n');
	expect(vctToken[4]).toBe(';	[lay pos=&pos.l	等として使用。');
	expect(vctToken[5]).toBe('\n');
	expect(vctToken[6]).toBe(';	組み込みで「c」という指定が出来る。例：pos=c、pos="c"');
	expect(vctToken[7]).toBe('\n');
	expect(vctToken[8]).toBe('[let name="pos.l" text="140"]');
});
it('testAnalyzeScript_bug150603_0',()=> {
	const sScr = '[a][ab][あ][あい]';
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(4);
	expect(vctToken[0]).toBe("[a]");
	expect(vctToken[1]).toBe("[ab]");
	expect(vctToken[2]).toBe("[あ]");
	expect(vctToken[3]).toBe("[あい]");

	const a_tag = REG_TAG.exec(sScr);
	if (a_tag == null) fail("Error:bug150603_0");
});
it('testAnalyzeScript_bug150603_1',()=> {
	const sScr = '[あ]';
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(1);
	expect(vctToken[0]).toBe("[あ]");

	const a_tag = REG_TAG.exec(sScr);
	if (a_tag == null) fail("Error:bug150603_1");
});
it('testAnalyzeScript_bug150603_2',()=> {
	const sScr = '[あい]';
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(1);
	expect(vctToken[0]).toBe("[あい]");

	const a_tag = REG_TAG.exec(sScr);
	if (a_tag == null) fail("Error:bug150603_2");
});
it('testAnalyzeScript_bug150603_3',()=> {
	const sScr = '[あ a=0]';
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(1);
	expect(vctToken[0]).toBe("[あ a=0]");

	const a_tag = REG_TAG.exec(sScr);
	if (a_tag == null) fail("Error:bug150603_3");
});
it('testAnalyzeScript_bug150603_4',()=> {
	const sScr = '[あい a=0]';
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(1);
	expect(vctToken[0]).toBe("[あい a=0]");

	const a_tag = REG_TAG.exec(sScr);
	if (a_tag == null) fail("Error:bug150603_4");
});

it('test_let_expansion_0_cr',()=> {
	const sScr = '&text=1+2=int\n[tcy t="!!"] あ。/\nあ。/';
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(6);
	expect(vctToken[0]).toBe('&text=1+2=int');
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe("\n");
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[2]).toBe('[tcy t="!!"]');
	ch = vctToken[2].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[3]).toBe(" あ。/");
	ch = vctToken[3].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(false);

	expect(vctToken[4]).toBe("\n");
	ch = vctToken[4].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[5]).toBe("あ。/");
	ch = vctToken[5].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(false);
});
it('test_let_expansion_0_cr_spc',()=> {
	const sScr = '&text = 1 + 2 = int\t[tcy t="!!"]';
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(3);
	expect(vctToken[0]).toBe('&text = 1 + 2 = int');
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe("\t");
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[2]).toBe('[tcy t="!!"]');
	ch = vctToken[2].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});
it('test_let_expansion_0_cr_spc_var',()=> {
	const sScr = '&text = hA[#ar$BB#]\t[tcy t="!!"]';
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(3);
	expect(vctToken[0]).toBe('&text = hA[#ar$BB#]');
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe("\t");
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[2]).toBe('[tcy t="!!"]');
	ch = vctToken[2].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});
it('test_let_expansion_1_tab',()=> {
	const sScr = '&text=1+2=int\t[tcy t="!!"]';
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(3);
	expect(vctToken[0]).toBe('&text=1+2=int');
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe("\t");
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[2]).toBe('[tcy t="!!"]');
	ch = vctToken[2].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});
it('test_let_expansion_1_tab_spc',()=> {
	const sScr = '&text = 1 + 2 = int\t[tcy t="!!"]';
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(3);
	expect(vctToken[0]).toBe('&text = 1 + 2 = int');
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe("\t");
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[2]).toBe('[tcy t="!!"]');
	ch = vctToken[2].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});
it('test_let_expansion_1_tab_spc_var',()=> {
	const sScr = '&text = hA[#ar$BB#]\t[tcy t="!!"]';
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(3);
	expect(vctToken[0]).toBe('&text = hA[#ar$BB#]');
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe("\t");
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[2]).toBe('[tcy t="!!"]');
	ch = vctToken[2].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});
it('test_let_expansion_2_spc',()=> {
	const sScr = '&text=1+2=int [tcy t="!!"]';
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(1);
	expect(vctToken[0]).toBe('&text=1+2=int [tcy t="!!"]');
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});
it('test_let_expansion_2_spc2',()=> {
	const sScr = '&text=1+2=int  [tcy t="!!"]';
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(1);
	expect(vctToken[0]).toBe('&text=1+2=int  [tcy t="!!"]');
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});
it('test_let_expansion_3_comment',()=> {
	const sScr = '&text=1+2=int\t; [tcy t="!!"]';
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(3);
	expect(vctToken[0]).toBe('&text=1+2=int');
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe("\t");
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[2]).toBe('; [tcy t="!!"]');
	ch = vctToken[2].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});
it('test_let_expansion_3_comment2',()=> {
	const sScr = '&text=1+2=int\t\t; [tcy t="!!"]';
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(3);
	expect(vctToken[0]).toBe('&text=1+2=int');
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe("\t\t");
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[2]).toBe('; [tcy t="!!"]');
	ch = vctToken[2].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});
it('test_let_expansion_4_OperatorEq',()=> {
	const sScr = '&text=1+2 == null\t\t; [tcy t="!!"]';
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(3);
	expect(vctToken[0]).toBe('&text=1+2 == null');
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe("\t\t");
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[2]).toBe('; [tcy t="!!"]');
	ch = vctToken[2].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});
it('test_let_expansion_4_OperatorNotEq',()=> {
	const sScr = '&text=1+2 != null\t\t; [tcy t="!!"]';
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(3);
	expect(vctToken[0]).toBe('&text=1+2 != null');
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe("\t\t");
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[2]).toBe('; [tcy t="!!"]');
	ch = vctToken[2].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});
it('test_let_bug_20120321s_aira',()=> {
	const sScr = "&&'tex'+0 = 1+2\t[tcy t='!!']";
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(3);
	expect(vctToken[0]).toBe("&&'tex'+0 = 1+2");
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe("\t");
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[2]).toBe("[tcy t='!!']");
	ch = vctToken[2].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});

it('test_ch_expansion_0_cr',()=> {
	const sScr = '&test&\n[tcy t="!!"]';
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(3);
	expect(vctToken[0]).toBe('&test&');
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe("\n");
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[2]).toBe('[tcy t="!!"]');
	ch = vctToken[2].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});
it('test_ch_expansion_0_cr_spc',()=> {
	const sScr = '&test cr spc&\n[tcy t="!!"]';
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(3);
	expect(vctToken[0]).toBe('&test cr spc&');
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe("\n");
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[2]).toBe('[tcy t="!!"]');
	ch = vctToken[2].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});
it('test_ch_expansion_0_cr_spc_var',()=> {
	const sScr = '&test hA[#ar$BB#]&\n[tcy t="!!"]';
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(3);
	expect(vctToken[0]).toBe('&test hA[#ar$BB#]&');
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe("\n");
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[2]).toBe('[tcy t="!!"]');
	ch = vctToken[2].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});
it('test_ch_expansion_1_tab',()=> {
	const sScr = '&test&\t[tcy t="!!"]';
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(3);
	expect(vctToken[0]).toBe('&test&');
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe("\t");
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[2]).toBe('[tcy t="!!"]');
	ch = vctToken[2].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});
it('test_ch_expansion_1_tab_spc',()=> {
	const sScr = '&test tab spc&\t[tcy t="!!"]';
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(3);
	expect(vctToken[0]).toBe('&test tab spc&');
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe("\t");
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[2]).toBe('[tcy t="!!"]');
	ch = vctToken[2].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});
it('test_ch_expansion_1_tab_spc_var',()=> {
	const sScr = '&test hA[#ar$BB#]&\t[tcy t="!!"]';
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(3);
	expect(vctToken[0]).toBe('&test hA[#ar$BB#]&');
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe("\t");
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[2]).toBe('[tcy t="!!"]');
	ch = vctToken[2].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});
it('test_ch_expansion_2_spc',()=> {
	const sScr = '&test& [tcy t="!!"]';
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(3);
	expect(vctToken[0]).toBe('&test&');
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe(" ");
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(false);

	expect(vctToken[2]).toBe('[tcy t="!!"]');
	ch = vctToken[2].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});
it('test_ch_expansion_2_spc2',()=> {
	const sScr = '&test&  [tcy t="!!"]';
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(3);
	expect(vctToken[0]).toBe('&test&');
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe("  ");
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(false);

	expect(vctToken[2]).toBe('[tcy t="!!"]');
	ch = vctToken[2].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});
it('test_ch_expansion_2_comment',()=> {
	const sScr = '&test&\t; [tcy t="!!"]';
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(3);
	expect(vctToken[0]).toBe('&test&');
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe("\t");
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[2]).toBe('; [tcy t="!!"]');
	ch = vctToken[2].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});
it('test_ch_expansion_miss_0',()=> {
	const sScr = '&te\nst&\n[tcy t="!!"]';
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(5);
	expect(vctToken[0]).toBe('&te');
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe("\n");
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[2]).toBe("st&");
	ch = vctToken[2].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(false);

	expect(vctToken[3]).toBe("\n");
	ch = vctToken[3].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[4]).toBe('[tcy t="!!"]');
	ch = vctToken[4].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});
it('test_ch_expansion_miss_1',()=> {
	const sScr = '&te\n\tst&\n[tcy t="!!"]';
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(6);
	expect(vctToken[0]).toBe('&te');
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe("\n");
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[2]).toBe('\t');
	ch = vctToken[2].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[3]).toBe('st&');
	ch = vctToken[3].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(false);

	expect(vctToken[4]).toBe("\n");
	ch = vctToken[4].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[5]).toBe('[tcy t="!!"]');
	ch = vctToken[5].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});



it('test_char2macro_0',()=> {
	const sScr = '[tcy t="!!"] あ。/\nあ。/';
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(4);
	expect(vctToken[0]).toBe('[tcy t="!!"]');
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe(" あ。/");
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(false);

	expect(vctToken[2]).toBe("\n");
	ch = vctToken[2].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[3]).toBe("あ。/");
	ch = vctToken[3].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(false);
});

it('test_multiline_tag_nochg0',()=> {
	const sScr = '[r]';
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(1);
	expect(vctToken[0]).toBe(sScr);
});
it('test_multiline_tag_nochg1',()=> {
	const sScr = '[ch]';
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(1);
	expect(vctToken[0]).toBe(sScr);
});
it('test_multiline_tag0',()=> {
	const sScr =
`[r
]`;
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(1);
	expect(vctToken[0]).toBe(sScr);
});
it('test_multiline_tag1',()=> {
	const sScr =
`[ch
]`;
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(1);
	expect(vctToken[0]).toBe(sScr);
});
it('test_multiline_tag10',()=> {
	const sScr =
`[r
a= 0]`;
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(1);
	expect(vctToken[0]).toBe(sScr);
});
it('test_multiline_tag11',()=> {
	const sScr =
`[ch
;===
text=""]`;
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(1);
	expect(vctToken[0]).toBe(sScr);
});
it('test_multiline_tag12',()=> {
	const sScr =
`[ch
]`;
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(1);
	expect(vctToken[0]).toBe(sScr);
});
it('test_multiline_tag20',()=> {
	const sScr =
`[r
]あ[r
a= 0]ん[r]こ[ch
;===
text=""]`;
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(7);
	expect(vctToken[0]).toBe(`[r
]`);
	expect(vctToken[1]).toBe('あ');
	expect(vctToken[2]).toBe(`[r
a= 0]`);
	expect(vctToken[3]).toBe(`ん`);
	expect(vctToken[4]).toBe(`[r]`);
	expect(vctToken[5]).toBe(`こ`);
	expect(vctToken[6]).toBe(
`[ch
;===
text=""]`);
});
it('test_multiline_tag21',()=> {
	const sScr =
`こ[ch
page=fore\t;===
text=""]`;
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(2);
	expect(vctToken[0]).toBe(`こ`);
	expect(vctToken[1]).toBe(
`[ch
page=fore\t;===
text=""]`);
});
it('test_multiline_tag_bug120904',()=> {
	const sScr =
`; [hoge
[s]
[trace text="error"]`;
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(5);
	expect(vctToken[0]).toBe(`; [hoge`);
	expect(vctToken[1]).toBe('\n');
	expect(vctToken[2]).toBe(`[s]`);
	expect(vctToken[3]).toBe('\n');
	expect(vctToken[4]).toBe(`[trace text="error"]`);
});
it('test_multiline_tag_bug120904_2',()=> {
	const sScr =
`め[ch
page=fore\t;===
text="["]`;
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(2);
	expect(vctToken[0]).toBe(`め`);
	expect(vctToken[1]).toBe(
`[ch
page=fore\t;===
text="["]`);
});
it('test_multiline_tag_bug120904_3',()=> {
	const sScr =
`め[ch
page=fore\t;===
text="]"]`;
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(2);
	expect(vctToken[0]).toBe(`め`);
	expect(vctToken[1]).toBe(
`[ch
page=fore\t;===
text="]"]`);
});
it('test_multiline_tag_bug140108',()=> {
	const sScr =
`[let name="sysse_ok1" text="BurstB_11"]


; 立ち絵配置位置定数
;	[lay pos=&pos.l	等として使用。
;	組み込みで「c」という指定が出来る。例：pos=c、pos="c"
[let name="pos.l" text="140"]`;
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(9);
	expect(vctToken[0]).toBe(`[let name="sysse_ok1" text="BurstB_11"]`);
	expect(vctToken[1]).toBe('\n\n\n');
	expect(vctToken[2]).toBe('; 立ち絵配置位置定数');
	expect(vctToken[3]).toBe('\n');
	expect(vctToken[4]).toBe(';	[lay pos=&pos.l	等として使用。');
	expect(vctToken[5]).toBe('\n');
	expect(vctToken[6]).toBe(';	組み込みで「c」という指定が出来る。例：pos=c、pos="c"');
	expect(vctToken[7]).toBe('\n');
	expect(vctToken[8]).toBe('[let name="pos.l" text="140"]');
});
it('20200415upd_test_multiline_tag_180623gallery0',()=> {
	const sScr =
`[add_lay
	layer=mes
class=txt
]

		multi
	line tag[r]
	[span
		layout
	=
		'color="0xaaaaaa"'
	]
	タグやマクロは複数行に改行して書ける[r]
	[span]
[s]`;
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(20);
	expect(vctToken[0]).toBe(
`[add_lay
	layer=mes
class=txt
]`);
	expect(vctToken[1]).toBe('\n\n');
	expect(vctToken[2]).toBe('\t\t');
	expect(vctToken[3]).toBe('multi');
	expect(vctToken[4]).toBe('\n');
	expect(vctToken[5]).toBe('\t');
	expect(vctToken[6]).toBe('line tag');
	expect(vctToken[7]).toBe('[r]');
	expect(vctToken[8]).toBe('\n');
	expect(vctToken[9]).toBe('\t');
	expect(vctToken[10]).toBe(
`[span
		layout
	=
		'color="0xaaaaaa"'
	]`);
	expect(vctToken[11]).toBe('\n');
	expect(vctToken[12]).toBe('\t');
	expect(vctToken[13]).toBe('タグやマクロは複数行に改行して書ける');
	expect(vctToken[14]).toBe('[r]');
	expect(vctToken[15]).toBe('\n');
	expect(vctToken[16]).toBe('\t');
	expect(vctToken[17]).toBe('[span]');
	expect(vctToken[18]).toBe('\n');
	expect(vctToken[19]).toBe('[s]');
});

it('20200415upd_test_multiline_tag_180731',()=> {	// 文字列リテラル内の「;」が効く不具合
	const sScr =
`[lay
style="&'color: '+ fcol +'; writing-mode: vertical-rl;'"]`;
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(1);
	expect(vctToken[0]).toBe(sScr);
});


it('20200416_test_multiline_tag_0',()=> {	// regex101.comで発見
	const sScr =
`[ch
	page=fore	;===
	text="]"]

[add_lay
	layer=mes
class=txt
]
	[span
		layout
		def	;=====
		ghi;=====
	=
		'color="0xaaaaaa"'
	]
	タグやマクロは複数行に改行して書ける[r]

[add_lay	;=====
	layer=mes	;=====
class=txt	;======
	;=====
]
	[span	;=====
		layout;=====
	=	;"""""
'color="0xaaaaaa"'	;=====
text=%fcol|&0x000000;=====
text=%fcol|'&0x000000';=====
a='2009';=====
a='#{fcol}'|true;=====
	]`;
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(15);
	expect(vctToken[0]).toBe(
`[ch
	page=fore	;===
	text="]"]`);
	expect(vctToken[1]).toBe('\n\n');
	expect(vctToken[2]).toBe(
`[add_lay
	layer=mes
class=txt
]`);
	expect(vctToken[3]).toBe('\n');
	expect(vctToken[4]).toBe('\t');
	expect(vctToken[5]).toBe(
`[span
		layout
		def	;=====
		ghi;=====
	=
		'color="0xaaaaaa"'
	]`);
	expect(vctToken[6]).toBe('\n');
	expect(vctToken[7]).toBe('\t');
	expect(vctToken[8]).toBe('タグやマクロは複数行に改行して書ける');
	expect(vctToken[9]).toBe('[r]');
	expect(vctToken[10]).toBe('\n\n');
	expect(vctToken[11]).toBe(
`[add_lay	;=====
	layer=mes	;=====
class=txt	;======
	;=====
]`);
	expect(vctToken[12]).toBe('\n');
	expect(vctToken[13]).toBe('\t');
	expect(vctToken[14]).toBe(
`[span	;=====
		layout;=====
	=	;"""""
'color="0xaaaaaa"'	;=====
text=%fcol|&0x000000;=====
text=%fcol|'&0x000000';=====
a='2009';=====
a='#{fcol}'|true;=====
	]`);
});


it('test_let_ml_0',()=> {
	const sScr =
`[let_ml name=ml]
precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform float tick;

void main(void) {
	vec2 pos = vTextureCoord;
	pos.x = pos.x + tick;
	gl_FragColor = texture2D(uSampler).toBe(pos);
}
[endlet_ml]`;
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(2);
	expect(vctToken[0]).toBe(
`[let_ml name=ml]
precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform float tick;

void main(void) {
	vec2 pos = vTextureCoord;
	pos.x = pos.x + tick;
	gl_FragColor = texture2D(uSampler).toBe(pos);
}
`);
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe('[endlet_ml]');
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});
it('test_let_ml_1',()=> {
	const sScr =
`[let_ml name=ml]
[
{"fn": "../bgimage/yun_1317.jpg").toBe("dt": "2018/12/18 11:44").toBe("txt": "　ああ、桜の樹の下には屍体が埋まつてゐる！"},
]
[endlet_ml]`;
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(2);
	expect(vctToken[0]).toBe(
`[let_ml name=ml]
[
{"fn": "../bgimage/yun_1317.jpg").toBe("dt": "2018/12/18 11:44").toBe("txt": "　ああ、桜の樹の下には屍体が埋まつてゐる！"},
]
`);
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe('[endlet_ml]');
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});
it('test_let_ml_2',()=> {
	const sScr =
`[let_ml name=const.db]
{
"紀子": {
"fn"	: "nori",
"col"	: "lightskyblue"
},
"晶": {
"fn"	: "akir",
"col"	: "gold"
}
}
[endlet_ml]`;
	vctToken = grm.matchToken(sScr);
	vctTokenLen = vctToken.length;
	let ch = "";

	expect(vctToken).toHaveLength(2);
	expect(vctToken[0]).toBe(
`[let_ml name=const.db]
{
"紀子": {
"fn"	: "nori",
"col"	: "lightskyblue"
},
"晶": {
"fn"	: "akir",
"col"	: "gold"
}
}
`);
	ch = vctToken[0].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);

	expect(vctToken[1]).toBe('[endlet_ml]');
	ch = vctToken[1].charAt(0);
	expect(grm.REG_TOKEN_NOTXT.test(ch)).toBe(true);
});


// Main.splitAmpersand
it('test_mth_splitAmpersand0',()=> {
	const o = splitAmpersand("pl = 70");
	expect(o['name']).toBe("pl ");
	expect(o['text']).toBe(" 70");
	expect(o['cast']).toBeUndefined();
});
it('test_mth_splitAmpersand1',()=> {
	const o = splitAmpersand("text=1+2=int");
	expect(o['name']).toBe("text");
	expect(o['text']).toBe("1+2");
	expect(o['cast']).toBe("int");
});
it('test_mth_splitAmpersand2',()=> {
	const o = splitAmpersand(
		"buf_page.0 = -999");
	expect(o['name']).toBe("buf_page.0 ");
	expect(o['text']).toBe(" -999");
	expect(o['cast']).toBeUndefined();
});
it('test_mth_splitAmpersand3',()=> {
	const o = splitAmpersand(
		"b = (1 == 0) = uint");
	expect(o['name']).toBe("b ");
	expect(o['text']).toBe(" (1 == 0) ");
	expect(o['cast']).toBe("uint");
});
it('test_mth_splitAmpersand4',()=> {
	const o = splitAmpersand(
		"b = (1 != 0) = int");
	expect(o['name']).toBe("b ");
	expect(o['text']).toBe(" (1 != 0) ");
	expect(o['cast']).toBe("int");
});

it('test_mth_splitAmpersand_err0',()=> {
	try {
		splitAmpersand("b=1=0=uint");
		fail("Error:ccc");
	}
	catch (s) {
		expect(s).toBe("「&計算」書式では「=」指定が一つか二つ必要です");
	}
});
it('test_mth_splitAmpersand_err1',()=> {
	try {
		splitAmpersand("text=&1+2=int");
		fail("Error:ccc");
	}
	catch (s) {
		expect(s).toBe("「&計算」書式では「&」指定が不要です");
	}
});

it('testAnalyzeScript_escetc',()=> {
	grm.setEscape('\\');
	const sScr = '\\&\\[\\;\\*\\｜\\《\\\\';
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(7);
	expect(vctToken[0]).toBe('\\&');
	expect(vctToken[1]).toBe('\\[');
	expect(vctToken[2]).toBe('\\;');
	expect(vctToken[3]).toBe('\\*');
	expect(vctToken[4]).toBe('\\｜');
	expect(vctToken[5]).toBe('\\《');
	expect(vctToken[6]).toBe('\\\\');
});
it('testAnalyzeScript_esc¥etc',()=> {
	grm.setEscape('¥');
	const sScr = '¥&¥[¥;¥*¥｜¥《¥¥';
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(7);
	expect(vctToken[0]).toBe('¥&');
	expect(vctToken[1]).toBe('¥[');
	expect(vctToken[2]).toBe('¥;');
	expect(vctToken[3]).toBe('¥*');
	expect(vctToken[4]).toBe('¥｜');
	expect(vctToken[5]).toBe('¥《');
	expect(vctToken[6]).toBe('¥¥');
});
it('testAnalyzeScript_esc¥etc',()=> {
	grm.setEscape('\\');
	const sScr = '\\｜｜　論語《ろんごに》\\｜　曰《いはく》';
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(4);
	expect(vctToken[0]).toBe('\\｜');
	expect(vctToken[1]).toBe('｜　論語《ろんごに》');
	expect(vctToken[2]).toBe('\\｜');
	expect(vctToken[3]).toBe('　曰《いはく》');
});

it('testAnalyzeScript_tag_in_string_esc',()=> {
	grm.setEscape('\\');
	const sScr = '[lay layer="mes" chk_overrow=false over_ins_tag="\\"\\\'\\#\\\n"]\n';
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(2);
	expect(vctToken[0]).toBe('[lay layer="mes" chk_overrow=false over_ins_tag="\\"\\\'\\#\\\n"]');
	expect(vctToken[1]).toBe("\n");
});
it('testAnalyzeScript_tag_in_string_esc¥',()=> {
	grm.setEscape('¥');
	const sScr = '[lay layer="mes" chk_overrow=false over_ins_tag="¥"¥\'¥#¥\n"]\n';
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(2);
	expect(vctToken[0]).toBe('[lay layer="mes" chk_overrow=false over_ins_tag="¥"¥\'¥#¥\n"]');
	expect(vctToken[1]).toBe("\n");
});

it('20221003_test_multilang_token',()=> {
	const sScr =
`[싱글룸][单人间][單人房][¿Como_esta?][أهلا][𣛠𩙻]`;
	vctToken = grm.matchToken(sScr);

	expect(vctToken).toHaveLength(6);
	expect(vctToken[0]).toBe('[싱글룸]');
	expect(vctToken[1]).toBe('[单人间]');
	expect(vctToken[2]).toBe('[單人房]');
	expect(vctToken[3]).toBe('[¿Como_esta?]');
	expect(vctToken[4]).toBe('[أهلا]');
	expect(vctToken[5]).toBe('[𣛠𩙻]');
});
