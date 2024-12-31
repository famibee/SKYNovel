/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Grammar, REG_TAG, splitAmpersand} from '../src/sn/Grammar';
import {type IConfig, type IExts, SEARCH_PATH_ARG_EXT, type T_CFG, type T_SEARCHPATH} from '../src/sn/ConfigBase';

//===== Test Class =====
class CfgTest implements IConfig {
	oCfg	: T_CFG;
	getNs = ()=> '';
	searchPath: T_SEARCHPATH;
	matchPath = (fnptn: string, extptn?: SEARCH_PATH_ARG_EXT): ReadonlyArray<IExts>=> [];
	addPath(fn: string, h_exts: IExts) {}
}
//===== Test Class =====


let cfg: CfgTest;
let	grm: Grammar;

beforeEach(()=> {
	cfg = new CfgTest;
	grm = new Grammar(cfg);
});

it('testAnalyzeScript0', ()=> {
	const sScr = '';
	expect(grm).not.toBeNull();
	const {aToken, len} = grm.resolveScript(sScr);
	expect(aToken).not.toBeNull();
	expect(len).toBe(0);
});

it('testAnalyzeScript_str1', ()=> {
	const sScr = 'うひょー';
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(1);
	expect(aToken[0]).toBe('うひょー');
});

it('testAnalyzeScript_n1', ()=> {
	const sScr = '\n';
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(1);
	expect(aToken[0]).toBe('\n');
});
it('testAnalyzeScript_n8', ()=> {
	const sScr = '\n\n\n\n\n\n\n\n';
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(1);
	expect(aToken[0]).toBe('\n\n\n\n\n\n\n\n');
});
it('testAnalyzeScript_n3t2n5', ()=> {
	const sScr = '\n\n\n\t\t\n\n\n\n\n';
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(3);
	expect(aToken[0]).toBe('\n\n\n');
	expect(aToken[1]).toBe('\t\t');
	expect(aToken[2]).toBe('\n\n\n\n\n');
});

it('testAnalyzeScript_ans', ()=> {
	const sScr = `\t[add_lay layer=mes class=txt]\n\t[add_lay layer=upd class=grp]\n\t[lay layer="mes" visible=true b_alpha=0 r_size=12 r_align="121" layout='blockProgression="rl" lineHeight="36" paddingTop="15" paddingRight="15" fontSize="24" color="0xffffff"']\n\n\t[title text="&tmp:const.flash.desktop.NativeApplication.nativeApplication.applicationDescriptor.filename +'  ver '+ tmp:const.flash.desktop.NativeApplication.nativeApplication.applicationDescriptor.version"]\n\n\t空気《え あ》小説《のべる》[r]\n\tばい　ふぁみべぇ[r]\n[r]\n\tクリックで更新確認[r]\n\tするよー[p][er]\n\n\t[lay layer=upd fn="update" visible=true left=86 top=86]\n[update_check url="http://ugainovel.ddo.jp/ans/ver.xml" config_fn="update.xml"]\n\t何かあれば[r]\n\t通知します。[r]\n[r][r][r][r]\n\t数秒経っても無反応なら更新はありません。\n*loop\n[l]\n[jump label=*loop]\n`;
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(58);
	expect(aToken[0]).toBe('\t');
	expect(aToken[1]).toBe('[add_lay layer=mes class=txt]');
	expect(aToken[2]).toBe('\n');
	expect(aToken[3]).toBe('\t');
	expect(aToken[4]).toBe('[add_lay layer=upd class=grp]');
	expect(aToken[5]).toBe('\n');
	expect(aToken[6]).toBe('\t');
	expect(aToken[7]).toBe(`[lay layer="mes" visible=true b_alpha=0 r_size=12 r_align="121" layout='blockProgression="rl" lineHeight="36" paddingTop="15" paddingRight="15" fontSize="24" color="0xffffff"']`);
	expect(aToken[8]).toBe("\n\n");
	expect(aToken[9]).toBe("\t");
	expect(aToken[10]).toBe('[title text="&tmp:const.flash.desktop.NativeApplication.nativeApplication.applicationDescriptor.filename +\'  ver \'+ tmp:const.flash.desktop.NativeApplication.nativeApplication.applicationDescriptor.version"]');
	expect(aToken[11]).toBe('\n\n');
	expect(aToken[12]).toBe('\t');
	expect(aToken[13]).toBe('空気《え あ》小説《のべる》');
	expect(aToken[14]).toBe('[r]');
	expect(aToken[15]).toBe('\n');
	expect(aToken[16]).toBe('\t');
	expect(aToken[17]).toBe('ばい　ふぁみべぇ');
	expect(aToken[18]).toBe('[r]');
	expect(aToken[19]).toBe('\n');
	expect(aToken[20]).toBe('[r]');
	expect(aToken[21]).toBe('\n');
	expect(aToken[22]).toBe('\t');
	expect(aToken[23]).toBe('クリックで更新確認');
	expect(aToken[24]).toBe('[r]');
	expect(aToken[25]).toBe('\n');
	expect(aToken[26]).toBe('\t');
	expect(aToken[27]).toBe('するよー');
	expect(aToken[28]).toBe('[p]');
	expect(aToken[29]).toBe('[er]');
	expect(aToken[30]).toBe('\n\n');
	expect(aToken[31]).toBe('\t');
	expect(aToken[32]).toBe('[lay layer=upd fn="update" visible=true left=86 top=86]');
	expect(aToken[33]).toBe('\n');
	expect(aToken[34]).toBe(`[update_check url="http://ugainovel.ddo.jp/ans/ver.xml" config_fn="update.xml"]`);
	expect(aToken[35]).toBe('\n');
	expect(aToken[36]).toBe('\t');
	expect(aToken[37]).toBe('何かあれば');
	expect(aToken[38]).toBe('[r]');
	expect(aToken[39]).toBe('\n');
	expect(aToken[40]).toBe('\t');
	expect(aToken[41]).toBe('通知します。');
	expect(aToken[42]).toBe('[r]');
	expect(aToken[43]).toBe('\n');
	expect(aToken[44]).toBe('[r]');
	expect(aToken[45]).toBe('[r]');
	expect(aToken[46]).toBe('[r]');
	expect(aToken[47]).toBe('[r]');
	expect(aToken[48]).toBe('\n');
	expect(aToken[49]).toBe('\t');
	expect(aToken[50]).toBe('数秒経っても無反応なら更新はありません。');
	expect(aToken[51]).toBe('\n');
	expect(aToken[52]).toBe('*loop');
	expect(aToken[53]).toBe('\n');
	expect(aToken[54]).toBe('[l]');
	expect(aToken[55]).toBe('\n');
	expect(aToken[56]).toBe('[jump label=*loop]');
	expect(aToken[57]).toBe('\n');
});
it('testAnalyzeScript_tag_in_string', ()=> {
	const sScr = '[lay layer="mes" chk_overrow=false over_ins_tag="[plc]"]\n';
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(2);
	expect(aToken[0]).toBe('[lay layer="mes" chk_overrow=false over_ins_tag="[plc]"]');
	expect(aToken[1]).toBe("\n");
});
it('testAnalyzeScript_bug120904', ()=> {
	const sScr = '; [hoge\n[s]\n[trace text="error"]';
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(5);
	expect(aToken[0]).toBe("; [hoge");
	expect(aToken[1]).toBe("\n");
	expect(aToken[2]).toBe("[s]");
	expect(aToken[3]).toBe("\n");
	expect(aToken[4]).toBe('[trace text="error"]');
});
it('testAnalyzeScript_bug120904_2', ()=> {
	const sScr = '; [hoge\n[s]\n[trace text="["]';
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(5);
	expect(aToken[0]).toBe("; [hoge");
	expect(aToken[1]).toBe("\n");
	expect(aToken[2]).toBe("[s]");
	expect(aToken[3]).toBe("\n");
	expect(aToken[4]).toBe('[trace text="["]');
});
it('testAnalyzeScript_bug120904_3', ()=> {
	const sScr = '; [hoge\n[s]\n[trace text="]"]';
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(5);
	expect(aToken[0]).toBe("; [hoge");
	expect(aToken[1]).toBe("\n");
	expect(aToken[2]).toBe("[s]");
	expect(aToken[3]).toBe("\n");
	expect(aToken[4]).toBe('[trace text="]"]');
});
it('testAnalyzeScript_bug140108', ()=> {
	const sScr = '[let name="sysse_ok1" text="BurstB_11"]\n\n\n; 立ち絵配置位置定数\n;	[lay pos=&pos.l	等として使用。\n;	組み込みで「c」という指定が出来る。例：pos=c、pos="c"\n[let name="pos.l" text="140"]';
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(9);
	expect(aToken[0]).toBe('[let name="sysse_ok1" text="BurstB_11"]');
	expect(aToken[1]).toBe('\n\n\n');
	expect(aToken[2]).toBe('; 立ち絵配置位置定数');
	expect(aToken[3]).toBe('\n');
	expect(aToken[4]).toBe(';	[lay pos=&pos.l	等として使用。');
	expect(aToken[5]).toBe('\n');
	expect(aToken[6]).toBe(';	組み込みで「c」という指定が出来る。例：pos=c、pos="c"');
	expect(aToken[7]).toBe('\n');
	expect(aToken[8]).toBe('[let name="pos.l" text="140"]');
});
it('testAnalyzeScript_bug150603_0', ()=> {
	const sScr = '[a][ab][あ][あい]';
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(4);
	expect(aToken[0]).toBe("[a]");
	expect(aToken[1]).toBe("[ab]");
	expect(aToken[2]).toBe("[あ]");
	expect(aToken[3]).toBe("[あい]");

	const a_tag = REG_TAG.exec(sScr);
	if (a_tag == null) throw new Error("Error:bug150603_0");
});
it('testAnalyzeScript_bug150603_1', ()=> {
	const sScr = '[あ]';
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(1);
	expect(aToken[0]).toBe("[あ]");

	const a_tag = REG_TAG.exec(sScr);
	if (a_tag == null) throw new Error("Error:bug150603_1");
});
it('testAnalyzeScript_bug150603_2', ()=> {
	const sScr = '[あい]';
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(1);
	expect(aToken[0]).toBe("[あい]");

	const a_tag = REG_TAG.exec(sScr);
	if (a_tag == null) throw new Error("Error:bug150603_2");
});
it('testAnalyzeScript_bug150603_3', ()=> {
	const sScr = '[あ a=0]';
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(1);
	expect(aToken[0]).toBe("[あ a=0]");

	const a_tag = REG_TAG.exec(sScr);
	if (a_tag == null) throw new Error("Error:bug150603_3");
});
it('testAnalyzeScript_bug150603_4', ()=> {
	const sScr = '[あい a=0]';
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(1);
	expect(aToken[0]).toBe("[あい a=0]");

	const a_tag = REG_TAG.exec(sScr);
	if (a_tag == null) throw new Error("Error:bug150603_4");
});

it('test_let_expansion_0_cr', ()=> {
	const sScr = '&text=1+2=int\n[tcy t="!!"] あ。/\nあ。/';
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(6);
	expect(aToken[0]).toBe('&text=1+2=int');
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe("\n");
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[2]).toBe('[tcy t="!!"]');
	ch = aToken[2]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[3]).toBe(" あ。/");
	ch = aToken[3]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(false);

	expect(aToken[4]).toBe("\n");
	ch = aToken[4]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[5]).toBe("あ。/");
	ch = aToken[5]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(false);
});
it('test_let_expansion_0_cr_spc', ()=> {
	const sScr = '&text = 1 + 2 = int\t;';
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(2);
	expect(aToken[0]).toBe('&text = 1 + 2 = int\t');
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe(';');
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});
it('test_let_expansion_0_cr_spc_var', ()=> {
	const sScr = '&text = hA[#ar$BB#]\t;';
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(2);
	expect(aToken[0]).toBe('&text = hA[#ar$BB#]\t');
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe(';');
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});
it('test_let_expansion_1_tab', ()=> {
	const sScr = '&text=1+2=int\t;';
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(2);
	expect(aToken[0]).toBe('&text=1+2=int\t');
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe(';');
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});
it('test_let_expansion_1_tab_spc', ()=> {
	const sScr = '&text = 1 + 2 = int\t;';
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(2);
	expect(aToken[0]).toBe('&text = 1 + 2 = int\t');
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe(';');
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});
it('test_let_expansion_1_tab_spc_var', ()=> {
	const sScr = '&text = hA[#ar$BB#]\t;';
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(2);
	expect(aToken[0]).toBe('&text = hA[#ar$BB#]\t');
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe(';');
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});
	it('test_let_expansion_1_tab_spc_var2', ()=> {
		const sScr = '&text = hA[#a;r$BB#]\t;';
		const {aToken, len} = grm.resolveScript(sScr);
		let ch: string = '';

		expect(len).toBe(2);
		expect(aToken[0]).toBe('&text = hA[#a;r$BB#]\t');
		ch = aToken[0]!.charAt(0);
		expect(grm.testNoTxt(ch)).toBe(true);

		expect(aToken[1]).toBe(';');
		ch = aToken[1]!.charAt(0);
		expect(grm.testNoTxt(ch)).toBe(true);
	});
it('test_let_expansion_2_spc', ()=> {
	const sScr = '&text=1+2=int ;';
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(2);
	expect(aToken[0]).toBe('&text=1+2=int ');
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe(';');
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});
it('test_let_expansion_2_spc2', ()=> {
	const sScr = '&text=1+2=int  ;';
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(2);
	expect(aToken[0]).toBe('&text=1+2=int  ');
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe(';');
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});
it('test_let_expansion_3_comment', ()=> {
	const sScr = '&text=1+2=int\t; [tcy t="!!"]';
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(2);
	expect(aToken[0]).toBe('&text=1+2=int\t');
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe('; [tcy t="!!"]');
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});
it('test_let_expansion_3_comment2', ()=> {
	const sScr = '&text=1+2=int\t\t; [tcy t="!!"]';
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(2);
	expect(aToken[0]).toBe('&text=1+2=int\t\t');
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe('; [tcy t="!!"]');
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});
it('test_let_expansion_4_OperatorEq', ()=> {
	const sScr = '&text=1+2 == null\t\t; [tcy t="!!"]';
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(2);
	expect(aToken[0]).toBe('&text=1+2 == null\t\t');
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe('; [tcy t="!!"]');
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});
it('test_let_expansion_4_OperatorNotEq', ()=> {
	const sScr = '&text=1+2 != null\t\t; [tcy t="!!"]';
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(2);
	expect(aToken[0]).toBe('&text=1+2 != null\t\t');
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe('; [tcy t="!!"]');
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});
it('test_let_bug_20120321s_aira', ()=> {
	const sScr = "&&'tex'+0 = 1+2\t;[tcy t='!!']";
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(2);
	expect(aToken[0]).toBe("&&'tex'+0 = 1+2\t");
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe(";[tcy t='!!']");
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});

it('test_ch_expansion_0_cr', ()=> {
	const sScr = '&test&\n[tcy t="!!"]';
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(3);
	expect(aToken[0]).toBe('&test&');
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe("\n");
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[2]).toBe('[tcy t="!!"]');
	ch = aToken[2]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});
it('test_ch_expansion_0_cr_spc', ()=> {
	const sScr = '&test cr spc&\n[tcy t="!!"]';
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(3);
	expect(aToken[0]).toBe('&test cr spc&');
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe("\n");
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[2]).toBe('[tcy t="!!"]');
	ch = aToken[2]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});
it('test_ch_expansion_0_cr_spc_var', ()=> {
	const sScr = '&test hA[#ar$BB#]&\n[tcy t="!!"]';
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(3);
	expect(aToken[0]).toBe('&test hA[#ar$BB#]&');
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe("\n");
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[2]).toBe('[tcy t="!!"]');
	ch = aToken[2]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});
it('test_ch_expansion_1_tab', ()=> {
	const sScr = '&test&\t[tcy t="!!"]';
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(3);
	expect(aToken[0]).toBe('&test&');
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe("\t");
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[2]).toBe('[tcy t="!!"]');
	ch = aToken[2]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});
it('test_ch_expansion_1_tab_spc', ()=> {
	const sScr = '&test tab spc&\t[tcy t="!!"]';
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(3);
	expect(aToken[0]).toBe('&test tab spc&');
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe("\t");
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[2]).toBe('[tcy t="!!"]');
	ch = aToken[2]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});
it('test_ch_expansion_1_tab_spc_var', ()=> {
	const sScr = '&test hA[#ar$BB#]&\t[tcy t="!!"]';
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(3);
	expect(aToken[0]).toBe('&test hA[#ar$BB#]&');
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe("\t");
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[2]).toBe('[tcy t="!!"]');
	ch = aToken[2]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});
it('test_ch_expansion_2_spc', ()=> {
	const sScr = '&test& [tcy t="!!"]';
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(3);
	expect(aToken[0]).toBe('&test&');
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe(" ");
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(false);

	expect(aToken[2]).toBe('[tcy t="!!"]');
	ch = aToken[2]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});
it('test_ch_expansion_2_spc2', ()=> {
	const sScr = '&test&  [tcy t="!!"]';
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(3);
	expect(aToken[0]).toBe('&test&');
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe("  ");
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(false);

	expect(aToken[2]).toBe('[tcy t="!!"]');
	ch = aToken[2]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});
it('test_ch_expansion_2_comment', ()=> {
	const sScr = '&test&\t; [tcy t="!!"]';
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(3);
	expect(aToken[0]).toBe('&test&');
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe("\t");
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[2]).toBe('; [tcy t="!!"]');
	ch = aToken[2]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});
it('test_ch_expansion_miss_0', ()=> {
	const sScr = '&te\nst&\n[tcy t="!!"]';
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(5);
	expect(aToken[0]).toBe('&te');
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe("\n");
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[2]).toBe("st&");
	ch = aToken[2]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(false);

	expect(aToken[3]).toBe("\n");
	ch = aToken[3]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[4]).toBe('[tcy t="!!"]');
	ch = aToken[4]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});
it('test_ch_expansion_miss_1', ()=> {
	const sScr = '&te\n\tst&\n[tcy t="!!"]';
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(6);
	expect(aToken[0]).toBe('&te');
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe("\n");
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[2]).toBe('\t');
	ch = aToken[2]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[3]).toBe('st&');
	ch = aToken[3]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(false);

	expect(aToken[4]).toBe("\n");
	ch = aToken[4]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[5]).toBe('[tcy t="!!"]');
	ch = aToken[5]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});

it('test_let_bug_20140606_comment_in_str', ()=> {
	const sScr = `&st_hv='back;'\t\t; [tcy t="!!"]`;
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(2);
	expect(aToken[0]).toBe(`&st_hv='back;'\t\t`);
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe('; [tcy t="!!"]');
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});



it('test_char2macro_0', ()=> {
	const sScr = '[tcy t="!!"] あ。/\nあ。/';
	const {aToken, len} = grm.resolveScript(sScr);
	let ch: string = '';

	expect(len).toBe(4);
	expect(aToken[0]).toBe('[tcy t="!!"]');
	ch = aToken[0]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[1]).toBe(" あ。/");
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(false);

	expect(aToken[2]).toBe("\n");
	ch = aToken[2]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[3]).toBe("あ。/");
	ch = aToken[3]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(false);
});

it('test_multiline_tag_nochg0', ()=> {
	const sScr = '[r]';
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(1);
	expect(aToken[0]).toBe(sScr);
});
it('test_multiline_tag_nochg1', ()=> {
	const sScr = '[ch]';
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(1);
	expect(aToken[0]).toBe(sScr);
});
it('test_multiline_tag0', ()=> {
	const sScr =
`[r
]`;
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(1);
	expect(aToken[0]).toBe(sScr);
});
it('test_multiline_tag1', ()=> {
	const sScr =
`[ch
]`;
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(1);
	expect(aToken[0]).toBe(sScr);
});
it('test_multiline_tag10', ()=> {
	const sScr =
`[r
a= 0]`;
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(1);
	expect(aToken[0]).toBe(sScr);
});
it('test_multiline_tag11', ()=> {
	const sScr =
`[ch
;===
text=""]`;
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(1);
	expect(aToken[0]).toBe(sScr);
});
it('test_multiline_tag12', ()=> {
	const sScr =
`[ch
]`;
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(1);
	expect(aToken[0]).toBe(sScr);
});
it('test_multiline_tag20', ()=> {
	const sScr =
`[r
]あ[r
a= 0]ん[r]こ[ch
;===
text=""]`;
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(7);
	expect(aToken[0]).toBe(`[r
]`);
	expect(aToken[1]).toBe('あ');
	expect(aToken[2]).toBe(`[r
a= 0]`);
	expect(aToken[3]).toBe(`ん`);
	expect(aToken[4]).toBe(`[r]`);
	expect(aToken[5]).toBe(`こ`);
	expect(aToken[6]).toBe(
`[ch
;===
text=""]`);
});
it('test_multiline_tag21', ()=> {
	const sScr =
`こ[ch
page=fore\t;===
text=""]`;
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(2);
	expect(aToken[0]).toBe(`こ`);
	expect(aToken[1]).toBe(
`[ch
page=fore\t;===
text=""]`);
});
it('test_multiline_tag_bug120904', ()=> {
	const sScr =
`; [hoge
[s]
[trace text="error"]`;
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(5);
	expect(aToken[0]).toBe(`; [hoge`);
	expect(aToken[1]).toBe('\n');
	expect(aToken[2]).toBe(`[s]`);
	expect(aToken[3]).toBe('\n');
	expect(aToken[4]).toBe(`[trace text="error"]`);
});
it('test_multiline_tag_bug120904_2', ()=> {
	const sScr =
`め[ch
page=fore\t;===
text="["]`;
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(2);
	expect(aToken[0]).toBe(`め`);
	expect(aToken[1]).toBe(
`[ch
page=fore\t;===
text="["]`);
});
it('test_multiline_tag_bug120904_3', ()=> {
	const sScr =
`め[ch
page=fore\t;===
text="]"]`;
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(2);
	expect(aToken[0]).toBe(`め`);
	expect(aToken[1]).toBe(
`[ch
page=fore\t;===
text="]"]`);
});
it('test_multiline_tag_bug140108', ()=> {
	const sScr =
`[let name="sysse_ok1" text="BurstB_11"]


; 立ち絵配置位置定数
;	[lay pos=&pos.l	等として使用。
;	組み込みで「c」という指定が出来る。例：pos=c、pos="c"
[let name="pos.l" text="140"]`;
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(9);
	expect(aToken[0]).toBe(`[let name="sysse_ok1" text="BurstB_11"]`);
	expect(aToken[1]).toBe('\n\n\n');
	expect(aToken[2]).toBe('; 立ち絵配置位置定数');
	expect(aToken[3]).toBe('\n');
	expect(aToken[4]).toBe(';	[lay pos=&pos.l	等として使用。');
	expect(aToken[5]).toBe('\n');
	expect(aToken[6]).toBe(';	組み込みで「c」という指定が出来る。例：pos=c、pos="c"');
	expect(aToken[7]).toBe('\n');
	expect(aToken[8]).toBe('[let name="pos.l" text="140"]');
});
it('20200415upd_test_multiline_tag_180623gallery0', ()=> {
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
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(20);
	expect(aToken[0]).toBe(
`[add_lay
	layer=mes
class=txt
]`);
	expect(aToken[1]).toBe('\n\n');
	expect(aToken[2]).toBe('\t\t');
	expect(aToken[3]).toBe('multi');
	expect(aToken[4]).toBe('\n');
	expect(aToken[5]).toBe('\t');
	expect(aToken[6]).toBe('line tag');
	expect(aToken[7]).toBe('[r]');
	expect(aToken[8]).toBe('\n');
	expect(aToken[9]).toBe('\t');
	expect(aToken[10]).toBe(
`[span
		layout
	=
		'color="0xaaaaaa"'
	]`);
	expect(aToken[11]).toBe('\n');
	expect(aToken[12]).toBe('\t');
	expect(aToken[13]).toBe('タグやマクロは複数行に改行して書ける');
	expect(aToken[14]).toBe('[r]');
	expect(aToken[15]).toBe('\n');
	expect(aToken[16]).toBe('\t');
	expect(aToken[17]).toBe('[span]');
	expect(aToken[18]).toBe('\n');
	expect(aToken[19]).toBe('[s]');
});

it('20200415upd_test_multiline_tag_180731', ()=> {	// 文字列リテラル内の「;」が効く不具合
	const sScr =
`[lay
style="&'color: '+ fcol +'; writing-mode: vertical-rl;'"]`;
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(1);
	expect(aToken[0]).toBe(sScr);
});


it('20200416_test_multiline_tag_0', ()=> {	// regex101.comで発見
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
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(15);
	expect(aToken[0]).toBe(
`[ch
	page=fore	;===
	text="]"]`);
	expect(aToken[1]).toBe('\n\n');
	expect(aToken[2]).toBe(
`[add_lay
	layer=mes
class=txt
]`);
	expect(aToken[3]).toBe('\n');
	expect(aToken[4]).toBe('\t');
	expect(aToken[5]).toBe(
`[span
		layout
		def	;=====
		ghi;=====
	=
		'color="0xaaaaaa"'
	]`);
	expect(aToken[6]).toBe('\n');
	expect(aToken[7]).toBe('\t');
	expect(aToken[8]).toBe('タグやマクロは複数行に改行して書ける');
	expect(aToken[9]).toBe('[r]');
	expect(aToken[10]).toBe('\n\n');
	expect(aToken[11]).toBe(
`[add_lay	;=====
	layer=mes	;=====
class=txt	;======
	;=====
]`);
	expect(aToken[12]).toBe('\n');
	expect(aToken[13]).toBe('\t');
	expect(aToken[14]).toBe(
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


it('test_let_ml_0', ()=> {
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
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(3);
	expect(aToken[0]).toBe(`[let_ml name=ml]`);
	expect(aToken[1]).toBe(`
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
	expect(aToken[2]).toBe(`[endlet_ml]`);
});
it('test_let_ml_1', ()=> {
	const sScr =
`[let_ml name=ml]
[
	{"fn": "../bgimage/yun_1317.jpg").toBe("dt": "2018/12/18 11:44").toBe("txt": "　ああ、桜の樹の下には屍体が埋まつてゐる！"},
]
[endlet_ml]`;
	const {aToken, len} = grm.resolveScript(sScr);
	let ch = '';

	expect(len).toBe(3);
	expect(aToken[0]).toBe(`[let_ml name=ml]`);
	expect(aToken[1]).toBe(`
[
	{"fn": "../bgimage/yun_1317.jpg").toBe("dt": "2018/12/18 11:44").toBe("txt": "　ああ、桜の樹の下には屍体が埋まつてゐる！"},
]
`);
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[2]).toBe(`[endlet_ml]`);
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});
it('test_let_ml_2', ()=> {
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
	const {aToken, len} = grm.resolveScript(sScr);
	let ch = '';

	expect(len).toBe(3);
	expect(aToken[0]).toBe(`[let_ml name=const.db]`);
	expect(aToken[1]).toBe(`
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
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[2]).toBe(`[endlet_ml]`);
	ch = aToken[2]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});
it('test_let_ml_2022/10/15_0', ()=> {
	const sScr =
`[let_ml
	name=ml]
	[endlet_ml]
[endlet_ml]`;
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(5);
	expect(aToken[0]).toBe(`[let_ml
	name=ml]`);
	expect(aToken[1]).toBe(`
	`);
	expect(aToken[2]).toBe(`[endlet_ml]`);
	expect(aToken[3]).toBe(`
`);
	expect(aToken[4]).toBe(`[endlet_ml]`);
});
it('test_let_ml_2022/10/15_1', ()=> {
	const sScr =
`[let_ml name=ml
	aaa
`;
	const {len} = grm.resolveScript(sScr);
	// const {aToken, len} = grm.resolveScript(sScr);

	// bun 版
	expect(len).toBe(0);

	// jest/vtest 版
// 	expect(len).toBe(5);
// 	expect(aToken[0]).toBe(`let_ml name=ml`);// [ が飛ばされるのは正規表現のくせ
// 	expect(aToken[1]).toBe(`
// `);
// 	expect(aToken[2]).toBe(`	`);
// 	expect(aToken[3]).toBe(`aaa`);
// 	expect(aToken[4]).toBe(`
// `);
});
it('test_let_ml_2022/10/15_2_負荷100%', ()=> {
	const sScr =
`[let_ml name=aa
`;
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(2);
	expect(aToken[0]).toBe(`let_ml name=aa`);
		// [ が飛ばされるのは正規表現のくせ
	expect(aToken[1]).toBe(`
`);
});

it('test_let_ml_2023/04/06 [let_ml]の[if]はさまない', ()=> {
	const sScr =
`[let_ml name=dicUI]
	{
		"ja": {
			"screen name": "アルバム",
		},
		"es": {
			"screen name": "Galería",
		}
	}
[endlet_ml]`;
	const {aToken, len} = grm.resolveScript(sScr);
	let ch = '';

	expect(len).toBe(3);
	expect(aToken[0]).toBe(`[let_ml name=dicUI]`);
	expect(aToken[1]).toBe(`
	{
		"ja": {
			"screen name": "アルバム",
		},
		"es": {
			"screen name": "Galería",
		}
	}
`);
	ch = aToken[1]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[2]).toBe(`[endlet_ml]`);
	ch = aToken[2]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);
});
it('test_let_ml_2023/04/06 [let_ml]の[if]はさみ', ()=> {
	const sScr =
`[if exp=true]
[let_ml name=dicUI]
	{
		"ja": {
			"screen name": "アルバム",
		},
		"es": {
			"screen name": "Galería",
		}
	}
[endlet_ml]
	[endif]`;
	const {aToken, len} = grm.resolveScript(sScr);
	let ch = '';

	expect(len).toBe(8);
	expect(aToken[0]).toBe('[if exp=true]');
	expect(aToken[1]).toBe('\n');
	expect(aToken[2]).toBe(`[let_ml name=dicUI]`);
	expect(aToken[3]).toBe(`
	{
		"ja": {
			"screen name": "アルバム",
		},
		"es": {
			"screen name": "Galería",
		}
	}
`);
	ch = aToken[3]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[4]).toBe(`[endlet_ml]`);
	ch = aToken[4]!.charAt(0);
	expect(grm.testNoTxt(ch)).toBe(true);

	expect(aToken[5]).toBe('\n');
	expect(aToken[6]).toBe('\t');
	expect(aToken[7]).toBe(`[endif]`);
});


// [char2macro char=@ name=zzz]
it('test_char2macro_0', ()=> {
	const sScr = '[ab]@[あ]@@[aa]';
	const scr = grm.resolveScript(sScr);
	const {aToken, len} = scr;

	expect(len).toBe(5);
	expect(aToken[0]).toBe('[ab]');
	expect(aToken[1]).toBe('@');
	expect(aToken[2]).toBe('[あ]');
	expect(aToken[3]).toBe('@@');
	expect(aToken[4]).toBe('[aa]');

	grm.char2macro({char: `@`, name: `zzz`,}, {
		zzz: ()=> false,
	}, scr, 0);
	expect(aToken).toHaveLength(6);
	expect(aToken[0]).toBe('[ab]');
	expect(aToken[1]).toBe('[zzz]');
	expect(aToken[2]).toBe('[あ]');
	expect(aToken[3]).toBe('[zzz]');
	expect(aToken[4]).toBe('[zzz]');
	expect(aToken[5]).toBe('[aa]');
});
it('test_char2macro_1', ()=> {
	const sScr = '@[ab]@[あ]@@[aa]';
	const scr = grm.resolveScript(sScr);
	const {aToken, len} = scr;

	expect(len).toBe(6);
	expect(aToken[0]).toBe('@');
	expect(aToken[1]).toBe('[ab]');
	expect(aToken[2]).toBe('@');
	expect(aToken[3]).toBe('[あ]');
	expect(aToken[4]).toBe('@@');
	expect(aToken[5]).toBe('[aa]');

	grm.char2macro({char: `@`, name: `zzz`,}, {
		zzz: ()=> false,
	}, scr, 1);
	expect(aToken).toHaveLength(7);
	expect(aToken[0]).toBe('@');
	expect(aToken[1]).toBe('[ab]');
	expect(aToken[2]).toBe('[zzz]');
	expect(aToken[3]).toBe('[あ]');
	expect(aToken[4]).toBe('[zzz]');
	expect(aToken[5]).toBe('[zzz]');
	expect(aToken[6]).toBe('[aa]');
});

// [bracket2macro text="〔〕" name=セリフ]
it('test_bracket2macro_0', ()=> {
	const sScr = '〔黒柳〕[ab]〔梨香〕[あ]〔黒柳〕〔梨香〕[zzz]';
	const scr = grm.resolveScript(sScr);
	const {aToken, len} = scr;

	expect(len).toBe(6);
	expect(aToken[0]).toBe('〔黒柳〕');
	expect(aToken[1]).toBe('[ab]');
	expect(aToken[2]).toBe('〔梨香〕');
	expect(aToken[3]).toBe('[あ]');
	expect(aToken[4]).toBe('〔黒柳〕〔梨香〕');
	expect(aToken[5]).toBe('[zzz]');

	grm.bracket2macro({text: `〔〕`, name: `セリフ`,}, {
		セリフ: ()=> false,
	}, scr, 1);
	expect(aToken).toHaveLength(7);
	expect(aToken[0]).toBe('〔黒柳〕');
	expect(aToken[1]).toBe('[ab]');
	expect(aToken[2]).toBe(`[セリフ text='梨香']`);
	expect(aToken[3]).toBe('[あ]');
	expect(aToken[4]).toBe(`[セリフ text='黒柳']`);
	expect(aToken[5]).toBe(`[セリフ text='梨香']`);
	expect(aToken[6]).toBe('[zzz]');
});
it('test_bracket2macro_1', ()=> {
	const sScr = '[ab]〔梨香〕[あ]〔黒柳〕〔梨香〕[zzz]';
	const scr = grm.resolveScript(sScr);
	const {aToken, len} = scr;

	expect(len).toBe(5);
	expect(aToken[0]).toBe('[ab]');
	expect(aToken[1]).toBe('〔梨香〕');
	expect(aToken[2]).toBe('[あ]');
	expect(aToken[3]).toBe('〔黒柳〕〔梨香〕');
	expect(aToken[4]).toBe('[zzz]');

	grm.bracket2macro({text: `〔〕`, name: `セリフ`,}, {
		セリフ: ()=> false,
	}, scr, 0);
	expect(aToken).toHaveLength(6);
	expect(aToken[0]).toBe('[ab]');
	expect(aToken[1]).toBe(`[セリフ text='梨香']`);
	expect(aToken[2]).toBe('[あ]');
	expect(aToken[3]).toBe(`[セリフ text='黒柳']`);
	expect(aToken[4]).toBe(`[セリフ text='梨香']`);
	expect(aToken[5]).toBe('[zzz]');
});



// Main.splitAmpersand
it('test_mth_splitAmpersand0', ()=> {
	const o = splitAmpersand("pl = 70");
	expect(o['name']).toBe("pl ");
	expect(o['text']).toBe(" 70");
	expect(o['cast']).toBeUndefined();
});
it('test_mth_splitAmpersand1', ()=> {
	const o = splitAmpersand("text=1+2=int");
	expect(o['name']).toBe("text");
	expect(o['text']).toBe("1+2");
	expect(o['cast']).toBe("int");
});
it('test_mth_splitAmpersand2', ()=> {
	const o = splitAmpersand(
		"buf_page.0 = -999");
	expect(o['name']).toBe("buf_page.0 ");
	expect(o['text']).toBe(" -999");
	expect(o['cast']).toBeUndefined();
});
it('test_mth_splitAmpersand3', ()=> {
	const o = splitAmpersand(
		"b = (1 == 0) = uint");
	expect(o['name']).toBe("b ");
	expect(o['text']).toBe(" (1 == 0) ");
	expect(o['cast']).toBe("uint");
});
it('test_mth_splitAmpersand4', ()=> {
	const o = splitAmpersand(
		"b = (1 != 0) = int");
	expect(o['name']).toBe("b ");
	expect(o['text']).toBe(" (1 != 0) ");
	expect(o['cast']).toBe("int");
});

it('test_mth_splitAmpersand_err0', ()=> {
	try {
		splitAmpersand("b=1=0=uint");
		throw new Error("Error:ccc");
	}
	catch (s) {
		expect(s).toBe("「&計算」書式では「=」指定が一つか二つ必要です");
	}
});
it('test_mth_splitAmpersand_err1', ()=> {
	try {
		splitAmpersand("text=&1+2=int");
		throw new Error("Error:ccc");
	}
	catch (s) {
		expect(s).toBe("「&計算」書式では「&」指定が不要です");
	}
});

it('testAnalyzeScript_escetc', ()=> {
	grm.setEscape('\\');
	const sScr = '\\&\\[\\;\\*\\｜\\《\\\\';
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(7);
	expect(aToken[0]).toBe('\\&');
	expect(aToken[1]).toBe('\\[');
	expect(aToken[2]).toBe('\\;');
	expect(aToken[3]).toBe('\\*');
	expect(aToken[4]).toBe('\\｜');
	expect(aToken[5]).toBe('\\《');
	expect(aToken[6]).toBe('\\\\');
});
it('testAnalyzeScript_esc¥etc', ()=> {
	grm.setEscape('¥');
	const sScr = '¥&¥[¥;¥*¥｜¥《¥¥';
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(7);
	expect(aToken[0]).toBe('¥&');
	expect(aToken[1]).toBe('¥[');
	expect(aToken[2]).toBe('¥;');
	expect(aToken[3]).toBe('¥*');
	expect(aToken[4]).toBe('¥｜');
	expect(aToken[5]).toBe('¥《');
	expect(aToken[6]).toBe('¥¥');
});
it('testAnalyzeScript_esc¥etc', ()=> {
	grm.setEscape('\\');
	const sScr = '\\｜｜　論語《ろんごに》\\｜　曰《いはく》';
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(4);
	expect(aToken[0]).toBe('\\｜');
	expect(aToken[1]).toBe('｜　論語《ろんごに》');
	expect(aToken[2]).toBe('\\｜');
	expect(aToken[3]).toBe('　曰《いはく》');
});

it('testAnalyzeScript_tag_in_string_esc', ()=> {
	grm.setEscape('\\');
	const sScr = '[lay layer="mes" chk_overrow=false over_ins_tag="\\"\\\'\\#\\\n"]\n';
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(2);
	expect(aToken[0]).toBe('[lay layer="mes" chk_overrow=false over_ins_tag="\\"\\\'\\#\\\n"]');
	expect(aToken[1]).toBe("\n");
});
it('testAnalyzeScript_tag_in_string_esc¥', ()=> {
	grm.setEscape('¥');
	const sScr = '[lay layer="mes" chk_overrow=false over_ins_tag="¥"¥\'¥#¥\n"]\n';
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(2);
	expect(aToken[0]).toBe('[lay layer="mes" chk_overrow=false over_ins_tag="¥"¥\'¥#¥\n"]');
	expect(aToken[1]).toBe("\n");
});

it('20221003_test_multilang_token', ()=> {
	const sScr =
`[싱글룸][单人间][單人房][¿Como_esta?][أهلا][𣛠𩙻]`;
	const {aToken, len} = grm.resolveScript(sScr);

	expect(len).toBe(6);
	expect(aToken[0]).toBe('[싱글룸]');
	expect(aToken[1]).toBe('[单人间]');
	expect(aToken[2]).toBe('[單人房]');
	expect(aToken[3]).toBe('[¿Como_esta?]');
	expect(aToken[4]).toBe('[أهلا]');
	expect(aToken[5]).toBe('[𣛠𩙻]');
});
