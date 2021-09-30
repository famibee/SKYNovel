/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2021 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import assert = require('power-assert');

import {Grammar, REG_TAG, splitAmpersand} from '../core/src/sn/Grammar';

context('class Grammar & ScriptIterator', ()=>{
	let	vctToken	: RegExpMatchArray | null	= null;
	let	vctTokenLen				= 0;

	let	grm: Grammar;

	beforeEach(()=> {
		grm = new Grammar;
	});
/*	after(()=> {
		jsdomify.destroy();
	});
*/
	describe('Tst', ()=> {
		it('testAnalyzeScript0', ()=> {
			const sScr = "";
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
		//	compile	err	= Vector.<String>(sScr.toLocaleString().match(REG_TOKEN));
			if (vctToken.length === null) return;
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 0);
		});

		it('testAnalyzeScript_str1', ()=> {
			const sScr = "うひょー";
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
/*
trace("len:"+ vctTokenLen);
for (let i=0; i<vctTokenLen; ++i) trace(i +"@"+ vctToken[i]);
*/
			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], "うひょー");
		});

		it('testAnalyzeScript_n1', ()=> {
			const sScr = "\n";
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], "\n");
		});
		it('testAnalyzeScript_n8', ()=> {
			const sScr = "\n\n\n\n\n\n\n\n";
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], "\n\n\n\n\n\n\n\n");
		});
		it('testAnalyzeScript_n3t2n5', ()=> {
			const sScr = "\n\n\n\t\t\n\n\n\n\n";
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], "\n\n\n");
			assert.equal(vctToken[1], "\t\t");
			assert.equal(vctToken[2], "\n\n\n\n\n");
		});

		it('testAnalyzeScript_ans', ()=> {
			const sScr = '\t[add_lay layer=mes class=txt]\n\t[add_lay layer=upd class=grp]\n\t[lay layer="mes" visible=true b_alpha=0 r_size=12 r_align="121" layout=\'blockProgression="rl" lineHeight="36" paddingTop="15" paddingRight="15" fontSize="24" color="0xffffff"\']\n\n\t[title text="&tmp:const.flash.desktop.NativeApplication.nativeApplication.applicationDescriptor.filename +\'  ver \'+ tmp:const.flash.desktop.NativeApplication.nativeApplication.applicationDescriptor.version"]\n\n\t空気《え あ》小説《のべる》[r]\n\tばい　ふぁみべぇ[r]\n[r]\n\tクリックで更新確認[r]\n\tするよー[p][er]\n\n\t[lay layer=upd fn="update" visible=true left=86 top=86]\n[update_check url="http://ugainovel.ddo.jp/ans/ver.xml" config_fn="update.xml"]\n\t何かあれば[r]\n\t通知します。[r]\n[r][r][r][r]\n\t数秒経っても無反応なら更新はありません。\n*loop\n[l]\n[jump label=*loop]\n';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 58);
			assert.equal(vctToken[0], "\t");
			assert.equal(vctToken[1], "[add_lay layer=mes class=txt]");
			assert.equal(vctToken[2], "\n");
			assert.equal(vctToken[3], "\t");
			assert.equal(vctToken[4], "[add_lay layer=upd class=grp]");
			assert.equal(vctToken[5], "\n");
			assert.equal(vctToken[6], "\t");
			assert.equal(vctToken[7], '[lay layer="mes" visible=true b_alpha=0 r_size=12 r_align="121" layout=\'blockProgression="rl" lineHeight="36" paddingTop="15" paddingRight="15" fontSize="24" color="0xffffff"\']');
			assert.equal(vctToken[8], "\n\n");
			assert.equal(vctToken[9], "\t");
			assert.equal(vctToken[10], '[title text="&tmp:const.flash.desktop.NativeApplication.nativeApplication.applicationDescriptor.filename +\'  ver \'+ tmp:const.flash.desktop.NativeApplication.nativeApplication.applicationDescriptor.version"]');
			assert.equal(vctToken[11], "\n\n");
			assert.equal(vctToken[12], "\t");
			assert.equal(vctToken[13], "空気《え あ》小説《のべる》");
			assert.equal(vctToken[14], "[r]");
			assert.equal(vctToken[15], "\n");
			assert.equal(vctToken[16], "\t");
			assert.equal(vctToken[17], "ばい　ふぁみべぇ");
			assert.equal(vctToken[18], "[r]");
			assert.equal(vctToken[19], "\n");
			assert.equal(vctToken[20], "[r]");
			assert.equal(vctToken[21], "\n");
			assert.equal(vctToken[22], "\t");
			assert.equal(vctToken[23], "クリックで更新確認");
			assert.equal(vctToken[24], "[r]");
			assert.equal(vctToken[25], "\n");
			assert.equal(vctToken[26], "\t");
			assert.equal(vctToken[27], "するよー");
			assert.equal(vctToken[28], "[p]");
			assert.equal(vctToken[29], "[er]");
			assert.equal(vctToken[30], "\n\n");
			assert.equal(vctToken[31], "\t");
			assert.equal(vctToken[32], '[lay layer=upd fn="update" visible=true left=86 top=86]');
			assert.equal(vctToken[33], "\n");
			assert.equal(vctToken[34], '[update_check url="http://ugainovel.ddo.jp/ans/ver.xml" config_fn="update.xml"]');
			assert.equal(vctToken[35], "\n");
			assert.equal(vctToken[36], "\t");
			assert.equal(vctToken[37], "何かあれば");
			assert.equal(vctToken[38], "[r]");
			assert.equal(vctToken[39], "\n");
			assert.equal(vctToken[40], "\t");
			assert.equal(vctToken[41], "通知します。");
			assert.equal(vctToken[42], "[r]");
			assert.equal(vctToken[43], "\n");
			assert.equal(vctToken[44], "[r]");
			assert.equal(vctToken[45], "[r]");
			assert.equal(vctToken[46], "[r]");
			assert.equal(vctToken[47], "[r]");
			assert.equal(vctToken[48], "\n");
			assert.equal(vctToken[49], "\t");
			assert.equal(vctToken[50], "数秒経っても無反応なら更新はありません。");
			assert.equal(vctToken[51], "\n");
			assert.equal(vctToken[52], "*loop");
			assert.equal(vctToken[53], "\n");
			assert.equal(vctToken[54], "[l]");
			assert.equal(vctToken[55], "\n");
			assert.equal(vctToken[56], "[jump label=*loop]");
			assert.equal(vctToken[57], "\n");
		});
		it('testAnalyzeScript_tag_in_string', ()=> {
			const sScr = '[lay layer="mes" chk_overrow=false over_ins_tag="[plc]"]\n';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 2);
			assert.equal(vctToken[0], '[lay layer="mes" chk_overrow=false over_ins_tag="[plc]"]');
			assert.equal(vctToken[1], "\n");
		});
		it('testAnalyzeScript_bug120904', ()=> {
			const sScr = '; [hoge\n[s]\n[trace text="error"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 5);
			assert.equal(vctToken[0], "; [hoge");
			assert.equal(vctToken[1], "\n");
			assert.equal(vctToken[2], "[s]");
			assert.equal(vctToken[3], "\n");
			assert.equal(vctToken[4], '[trace text="error"]');
		});
		it('testAnalyzeScript_bug120904_2', ()=> {
			const sScr = '; [hoge\n[s]\n[trace text="["]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 5);
			assert.equal(vctToken[0], "; [hoge");
			assert.equal(vctToken[1], "\n");
			assert.equal(vctToken[2], "[s]");
			assert.equal(vctToken[3], "\n");
			assert.equal(vctToken[4], '[trace text="["]');
		});
		it('testAnalyzeScript_bug120904_3', ()=> {
			const sScr = '; [hoge\n[s]\n[trace text="]"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 5);
			assert.equal(vctToken[0], "; [hoge");
			assert.equal(vctToken[1], "\n");
			assert.equal(vctToken[2], "[s]");
			assert.equal(vctToken[3], "\n");
			assert.equal(vctToken[4], '[trace text="]"]');
		});
		it('testAnalyzeScript_bug140108', ()=> {
			const sScr = '[let name="sysse_ok1" text="BurstB_11"]\n\n\n; 立ち絵配置位置定数\n;	[lay pos=&pos.l	等として使用。\n;	組み込みで「c」という指定が出来る。例：pos=c、pos="c"\n[let name="pos.l" text="140"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 9);
			assert.equal(vctToken[0], '[let name="sysse_ok1" text="BurstB_11"]');
			assert.equal(vctToken[1], '\n\n\n');
			assert.equal(vctToken[2], '; 立ち絵配置位置定数');
			assert.equal(vctToken[3], '\n');
			assert.equal(vctToken[4], ';	[lay pos=&pos.l	等として使用。');
			assert.equal(vctToken[5], '\n');
			assert.equal(vctToken[6], ';	組み込みで「c」という指定が出来る。例：pos=c、pos="c"');
			assert.equal(vctToken[7], '\n');
			assert.equal(vctToken[8], '[let name="pos.l" text="140"]');
		});
		it('testAnalyzeScript_bug150603_0', ()=> {
			const sScr = '[a][ab][あ][あい]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 4);
			assert.equal(vctToken[0], "[a]");
			assert.equal(vctToken[1], "[ab]");
			assert.equal(vctToken[2], "[あ]");
			assert.equal(vctToken[3], "[あい]");

			const a_tag = REG_TAG.exec(sScr);
			if (a_tag == null) assert.fail("Error:bug150603_0");
		});
		it('testAnalyzeScript_bug150603_1', ()=> {
			const sScr = '[あ]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], "[あ]");

			const a_tag = REG_TAG.exec(sScr);
			if (a_tag == null) assert.fail("Error:bug150603_1");
		});
		it('testAnalyzeScript_bug150603_2', ()=> {
			const sScr = '[あい]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], "[あい]");

			const a_tag = REG_TAG.exec(sScr);
			if (a_tag == null) assert.fail("Error:bug150603_2");
		});
		it('testAnalyzeScript_bug150603_3', ()=> {
			const sScr = '[あ a=0]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], "[あ a=0]");

			const a_tag = REG_TAG.exec(sScr);
			if (a_tag == null) assert.fail("Error:bug150603_3");
		});
		it('testAnalyzeScript_bug150603_4', ()=> {
			const sScr = '[あい a=0]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], "[あい a=0]");

			const a_tag = REG_TAG.exec(sScr);
			if (a_tag == null) assert.fail("Error:bug150603_4");
		});

		it('test_let_expansion_0_cr', ()=> {
			const sScr = '&text=1+2=int\n[tcy t="!!"] あ。/\nあ。/';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 6);
			assert.equal(vctToken[0], '&text=1+2=int');
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\n");
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[3], " あ。/");
			ch = vctToken[3].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), false);

			assert.equal(vctToken[4], "\n");
			ch = vctToken[4].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[5], "あ。/");
			ch = vctToken[5].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), false);
		});
		it('test_let_expansion_0_cr_spc', ()=> {
			const sScr = '&text = 1 + 2 = int\t[tcy t="!!"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&text = 1 + 2 = int');
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t");
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_let_expansion_0_cr_spc_var', ()=> {
			const sScr = '&text = hA[#ar$BB#]\t[tcy t="!!"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&text = hA[#ar$BB#]');
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t");
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_let_expansion_1_tab', ()=> {
			const sScr = '&text=1+2=int\t[tcy t="!!"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&text=1+2=int');
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t");
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_let_expansion_1_tab_spc', ()=> {
			const sScr = '&text = 1 + 2 = int\t[tcy t="!!"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&text = 1 + 2 = int');
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t");
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_let_expansion_1_tab_spc_var', ()=> {
			const sScr = '&text = hA[#ar$BB#]\t[tcy t="!!"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&text = hA[#ar$BB#]');
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t");
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_let_expansion_2_spc', ()=> {
			const sScr = '&text=1+2=int [tcy t="!!"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], '&text=1+2=int [tcy t="!!"]');
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_let_expansion_2_spc2', ()=> {
			const sScr = '&text=1+2=int  [tcy t="!!"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], '&text=1+2=int  [tcy t="!!"]');
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_let_expansion_3_comment', ()=> {
			const sScr = '&text=1+2=int\t; [tcy t="!!"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&text=1+2=int');
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t");
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '; [tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_let_expansion_3_comment2', ()=> {
			const sScr = '&text=1+2=int\t\t; [tcy t="!!"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&text=1+2=int');
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t\t");
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '; [tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_let_expansion_4_OperatorEq', ()=> {
			const sScr = '&text=1+2 == null\t\t; [tcy t="!!"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&text=1+2 == null');
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t\t");
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '; [tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_let_expansion_4_OperatorNotEq', ()=> {
			const sScr = '&text=1+2 != null\t\t; [tcy t="!!"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&text=1+2 != null');
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t\t");
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '; [tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_let_bug_20120321s_aira', ()=> {
			const sScr = "&&'tex'+0 = 1+2\t[tcy t='!!']";
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], "&&'tex'+0 = 1+2");
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t");
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], "[tcy t='!!']");
			ch = vctToken[2].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});

		it('test_ch_expansion_0_cr', ()=> {
			const sScr = '&test&\n[tcy t="!!"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&test&');
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\n");
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_ch_expansion_0_cr_spc', ()=> {
			const sScr = '&test cr spc&\n[tcy t="!!"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&test cr spc&');
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\n");
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_ch_expansion_0_cr_spc_var', ()=> {
			const sScr = '&test hA[#ar$BB#]&\n[tcy t="!!"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&test hA[#ar$BB#]&');
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\n");
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_ch_expansion_1_tab', ()=> {
			const sScr = '&test&\t[tcy t="!!"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&test&');
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t");
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_ch_expansion_1_tab_spc', ()=> {
			const sScr = '&test tab spc&\t[tcy t="!!"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&test tab spc&');
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t");
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_ch_expansion_1_tab_spc_var', ()=> {
			const sScr = '&test hA[#ar$BB#]&\t[tcy t="!!"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&test hA[#ar$BB#]&');
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t");
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_ch_expansion_2_spc', ()=> {
			const sScr = '&test& [tcy t="!!"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&test&');
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], " ");
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), false);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_ch_expansion_2_spc2', ()=> {
			const sScr = '&test&  [tcy t="!!"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&test&');
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "  ");
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), false);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_ch_expansion_2_comment', ()=> {
			const sScr = '&test&\t; [tcy t="!!"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&test&');
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t");
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '; [tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_ch_expansion_miss_0', ()=> {
			const sScr = '&te\nst&\n[tcy t="!!"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 5);
			assert.equal(vctToken[0], '&te');
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\n");
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], "st&");
			ch = vctToken[2].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), false);

			assert.equal(vctToken[3], "\n");
			ch = vctToken[3].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[4], '[tcy t="!!"]');
			ch = vctToken[4].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_ch_expansion_miss_1', ()=> {
			const sScr = '&te\n\tst&\n[tcy t="!!"]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 6);
			assert.equal(vctToken[0], '&te');
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\n");
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '\t');
			ch = vctToken[2].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[3], 'st&');
			ch = vctToken[3].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), false);

			assert.equal(vctToken[4], "\n");
			ch = vctToken[4].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[5], '[tcy t="!!"]');
			ch = vctToken[5].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});



		it('test_char2macro_0', ()=> {
			const sScr = '[tcy t="!!"] あ。/\nあ。/';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 4);
			assert.equal(vctToken[0], '[tcy t="!!"]');
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], " あ。/");
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), false);

			assert.equal(vctToken[2], "\n");
			ch = vctToken[2].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[3], "あ。/");
			ch = vctToken[3].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), false);
		});

		it('test_multiline_tag_nochg0', ()=> {
			const sScr = '[r]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], sScr);
		});
		it('test_multiline_tag_nochg1', ()=> {
			const sScr = '[ch]';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], sScr);
		});
		it('test_multiline_tag0', ()=> {
			const sScr =
`[r
]`;
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], sScr);
		});
		it('test_multiline_tag1', ()=> {
			const sScr =
`[ch
]`;
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], sScr);
		});
		it('test_multiline_tag10', ()=> {
			const sScr =
`[r
a= 0]`;
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], sScr);
		});
		it('test_multiline_tag11', ()=> {
			const sScr =
`[ch
;===
text=""]`;
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], sScr);
		});
		it('test_multiline_tag12', ()=> {
			const sScr =
`[ch
]`;
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], sScr);
		});
		it('test_multiline_tag20', ()=> {
			const sScr =
`[r
]あ[r
a= 0]ん[r]こ[ch
;===
text=""]`;
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 7);
			assert.equal(vctToken[0],
`[r
]`);
			assert.equal(vctToken[1], 'あ');
			assert.equal(vctToken[2],
`[r
a= 0]`);
			assert.equal(vctToken[3], `ん`);
			assert.equal(vctToken[4], `[r]`);
			assert.equal(vctToken[5], `こ`);
			assert.equal(vctToken[6],
`[ch
;===
text=""]`);
		});
		it('test_multiline_tag21', ()=> {
			const sScr =
`こ[ch
	page=fore\t;===
	text=""]`;
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 2);
			assert.equal(vctToken[0], `こ`);
			assert.equal(vctToken[1],
`[ch
	page=fore\t;===
	text=""]`);
		});
		it('test_multiline_tag_bug120904', ()=> {
			const sScr =
`; [hoge
[s]
[trace text="error"]`;
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 5);
			assert.equal(vctToken[0], `; [hoge`);
			assert.equal(vctToken[1], '\n');
			assert.equal(vctToken[2], `[s]`);
			assert.equal(vctToken[3], '\n');
			assert.equal(vctToken[4], `[trace text="error"]`);
		});
		it('test_multiline_tag_bug120904_2', ()=> {
			const sScr =
`め[ch
	page=fore\t;===
	text="["]`;
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 2);
			assert.equal(vctToken[0], `め`);
			assert.equal(vctToken[1],
`[ch
	page=fore\t;===
	text="["]`);
		});
		it('test_multiline_tag_bug120904_3', ()=> {
			const sScr =
`め[ch
	page=fore\t;===
	text="]"]`;
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 2);
			assert.equal(vctToken[0], `め`);
			assert.equal(vctToken[1],
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
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 9);
			assert.equal(vctToken[0],
`[let name="sysse_ok1" text="BurstB_11"]`);
			assert.equal(vctToken[1], '\n\n\n');
			assert.equal(vctToken[2], '; 立ち絵配置位置定数');
			assert.equal(vctToken[3], '\n');
			assert.equal(vctToken[4], ';	[lay pos=&pos.l	等として使用。');
			assert.equal(vctToken[5], '\n');
			assert.equal(vctToken[6], ';	組み込みで「c」という指定が出来る。例：pos=c、pos="c"');
			assert.equal(vctToken[7], '\n');
			assert.equal(vctToken[8], '[let name="pos.l" text="140"]');
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
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 20);
			assert.equal(vctToken[0],
`[add_lay
	layer=mes
class=txt
]`);
			assert.equal(vctToken[1], '\n\n');
			assert.equal(vctToken[2], '\t\t');
			assert.equal(vctToken[3], 'multi');
			assert.equal(vctToken[4], '\n');
			assert.equal(vctToken[5], '\t');
			assert.equal(vctToken[6], 'line tag');
			assert.equal(vctToken[7], '[r]');
			assert.equal(vctToken[8], '\n');
			assert.equal(vctToken[9], '\t');
			assert.equal(vctToken[10],
`[span
		layout
	=
		'color="0xaaaaaa"'
	]`);
			assert.equal(vctToken[11], '\n');
			assert.equal(vctToken[12], '\t');
			assert.equal(vctToken[13], 'タグやマクロは複数行に改行して書ける');
			assert.equal(vctToken[14], '[r]');
			assert.equal(vctToken[15], '\n');
			assert.equal(vctToken[16], '\t');
			assert.equal(vctToken[17], '[span]');
			assert.equal(vctToken[18], '\n');
			assert.equal(vctToken[19], '[s]');
		});

		it('20200415upd_test_multiline_tag_180731', ()=> {	// 文字列リテラル内の「;」が効く不具合
			const sScr =
`[lay
style="&'color: '+ fcol +'; writing-mode: vertical-rl;'"]`;
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], sScr);
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
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 15);
			assert.equal(vctToken[0],
`[ch
	page=fore	;===
	text="]"]`);
			assert.equal(vctToken[1], '\n\n');
			assert.equal(vctToken[2],
`[add_lay
	layer=mes
class=txt
]`);
			assert.equal(vctToken[3], '\n');
			assert.equal(vctToken[4], '\t');
			assert.equal(vctToken[5],
`[span
		layout
		def	;=====
		ghi;=====
	=
		'color="0xaaaaaa"'
	]`);
			assert.equal(vctToken[6], '\n');
			assert.equal(vctToken[7], '\t');
			assert.equal(vctToken[8], 'タグやマクロは複数行に改行して書ける');
			assert.equal(vctToken[9], '[r]');
			assert.equal(vctToken[10], '\n\n');
			assert.equal(vctToken[11],
`[add_lay	;=====
	layer=mes	;=====
class=txt	;======
	;=====
]`);
			assert.equal(vctToken[12], '\n');
			assert.equal(vctToken[13], '\t');
			assert.equal(vctToken[14],
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
	gl_FragColor = texture2D(uSampler, pos);
}
[endlet_ml]`;
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 2);
			assert.equal(vctToken[0],
`[let_ml name=ml]
precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform float tick;

void main(void) {
	vec2 pos = vTextureCoord;
	pos.x = pos.x + tick;
	gl_FragColor = texture2D(uSampler, pos);
}
`);
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], '[endlet_ml]');
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_let_ml_1', ()=> {
			const sScr =
`[let_ml name=ml]
[
	{"fn": "../bgimage/yun_1317.jpg", "dt": "2018/12/18 11:44", "txt": "　ああ、桜の樹の下には屍体が埋まつてゐる！"},
]
[endlet_ml]`;
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 2);
			assert.equal(vctToken[0],
`[let_ml name=ml]
[
	{"fn": "../bgimage/yun_1317.jpg", "dt": "2018/12/18 11:44", "txt": "　ああ、桜の樹の下には屍体が埋まつてゐる！"},
]
`);
			ch = vctToken[0].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], '[endlet_ml]');
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
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
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 2);
			assert.equal(vctToken[0],
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
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], '[endlet_ml]');
			ch = vctToken[1].charAt(0);
			assert.equal(grm.REG_TOKEN_NOTXT.test(ch), true);
		});


		// Main.splitAmpersand
		it('test_mth_splitAmpersand0', ()=> {
			const o = splitAmpersand("pl = 70");
			assert.equal(o['name'], "pl ");
			assert.equal(o['text'], " 70");
			assert.equal(o['cast'], null);
		});
		it('test_mth_splitAmpersand1', ()=> {
			const o = splitAmpersand("text=1+2=int");
			assert.equal(o['name'], "text");
			assert.equal(o['text'], "1+2");
			assert.equal(o['cast'], "int");
		});
		it('test_mth_splitAmpersand2', ()=> {
			const o = splitAmpersand(
				"buf_page.0 = -999");
			assert.equal(o['name'], "buf_page.0 ");
			assert.equal(o['text'], " -999");
			assert.equal(o['cast'], null);
		});
		it('test_mth_splitAmpersand3', ()=> {
			const o = splitAmpersand(
				"b = (1 == 0) = uint");
			assert.equal(o['name'], "b ");
			assert.equal(o['text'], " (1 == 0) ");
			assert.equal(o['cast'], "uint");
		});
		it('test_mth_splitAmpersand4', ()=> {
			const o = splitAmpersand(
				"b = (1 != 0) = int");
			assert.equal(o['name'], "b ");
			assert.equal(o['text'], " (1 != 0) ");
			assert.equal(o['cast'], "int");
		});

		it('test_mth_splitAmpersand_err0', ()=> {
			try {
				splitAmpersand("b=1=0=uint");
				assert.fail("Error:ccc");
			}
			catch (s) {
				assert.equal(s, "「&計算」書式では「=」指定が一つか二つ必要です");
			}
		});
		it('test_mth_splitAmpersand_err1', ()=> {
			try {
				splitAmpersand("text=&1+2=int");
				assert.fail("Error:ccc");
			}
			catch (s) {
				assert.equal(s, "「&計算」書式では「&」指定が不要です");
			}
		});

		it('testAnalyzeScript_escetc', ()=> {
			grm.setEscape('\\');
			const sScr = '\\&\\[\\;\\*\\｜\\《\\\\';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 7);
			assert.equal(vctToken[0], '\\&');
			assert.equal(vctToken[1], '\\[');
			assert.equal(vctToken[2], '\\;');
			assert.equal(vctToken[3], '\\*');
			assert.equal(vctToken[4], '\\｜');
			assert.equal(vctToken[5], '\\《');
			assert.equal(vctToken[6], '\\\\');
		});
		it('testAnalyzeScript_esc¥etc', ()=> {
			grm.setEscape('¥');
			const sScr = '¥&¥[¥;¥*¥｜¥《¥¥';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 7);
			assert.equal(vctToken[0], '¥&');
			assert.equal(vctToken[1], '¥[');
			assert.equal(vctToken[2], '¥;');
			assert.equal(vctToken[3], '¥*');
			assert.equal(vctToken[4], '¥｜');
			assert.equal(vctToken[5], '¥《');
			assert.equal(vctToken[6], '¥¥');
		});
		it('testAnalyzeScript_esc¥etc', ()=> {
			grm.setEscape('\\');
			const sScr = '\\｜｜　論語《ろんごに》\\｜　曰《いはく》';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 4);
			assert.equal(vctToken[0], '\\｜');
			assert.equal(vctToken[1], '｜　論語《ろんごに》');
			assert.equal(vctToken[2], '\\｜');
			assert.equal(vctToken[3], '　曰《いはく》');
		});

		it('testAnalyzeScript_tag_in_string_esc', ()=> {
			grm.setEscape('\\');
			const sScr = '[lay layer="mes" chk_overrow=false over_ins_tag="\\"\\\'\\#\\\n"]\n';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 2);
			assert.equal(vctToken[0], '[lay layer="mes" chk_overrow=false over_ins_tag="\\"\\\'\\#\\\n"]');
			assert.equal(vctToken[1], "\n");
		});
		it('testAnalyzeScript_tag_in_string_esc¥', ()=> {
			grm.setEscape('¥');
			const sScr = '[lay layer="mes" chk_overrow=false over_ins_tag="¥"¥\'¥#¥\n"]\n';
			vctToken = sScr.match(grm.REG_TOKEN);
			if (vctToken === null) {assert('NULL'); return}
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 2);
			assert.equal(vctToken[0], '[lay layer="mes" chk_overrow=false over_ins_tag="¥"¥\'¥#¥\n"]');
			assert.equal(vctToken[1], "\n");
		});

	});

});
