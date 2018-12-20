/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import assert = require('power-assert');

import {CmnLib} from '../src/sn/CmnLib';

context('class CmnLib & ScriptIterator & Main', ()=>{
	let	vctToken	: string[]	= null;
	let	vctTokenLen				= 0;
/*	let target;
	const jsdomify = require('jsdomify');
	before(() => {
		jsdomify.create('<!doctype html><html><body><div id="content"></div></body></html>');
		target = document.querySelector('#content');
	});*/
	beforeEach(() => {
		vctToken = null;
		vctTokenLen= 0;
	});
/*	after(() => {
		jsdomify.destroy();
	});
*/
	describe('Tst', () => {
		it('argChk_Num0', ()=> {
			assert.equal(CmnLib.argChk_Num(
				{あ:2, い:3.5, う:'0x15', え:'も', タグ名:'ぺきゅ'},
				'あ', 13),
				2);
		});
		it('argChk_Num1', ()=> {
			assert.equal(CmnLib.argChk_Num(
				{あ:2, い:3.5, う:'0x15', え:'も', タグ名:'ぺきゅ'},
				'い', 13),
				3.5);
		});
		it('argChk_Num2', ()=> {
			assert.equal(CmnLib.argChk_Num(
				{あ:2, い:3.5, う:'0x15', え:'も', タグ名:'ぺきゅ'},
				'う', 13),
				21);
		});
		it('argChk_Num5', ()=> {
			assert.equal(CmnLib.argChk_Num(
				{あ:2, い:3.5, う:'0x15', え:'も', タグ名:'ぺきゅ'},
				'ぷ', 13),
				13);
		});
		it('argChk_Num10_err', ()=> {
			try {
				assert.equal(CmnLib.argChk_Num(
					{あ:2, い:3.5, う:'0x15', え:'も', タグ名:'ぺきゅ'},
					'ぷ', NaN),
					2);
				assert.equal('fail', '起こるべき例外が起こっていない');
			}
			catch (s) {
				assert.equal(s, "[ぺきゅ]属性 ぷ は必須です");
			}
		});
		it('argChk_Num11_err', ()=> {
			try {
				assert.equal(CmnLib.argChk_Num(
					{あ:2, い:3.5, う:'0x15', え:'も', タグ名:'ぺきゅ'},
					'え', 13),
					2);
				assert.equal('fail', '起こるべき例外が起こっていない');
			}
			catch (s) {
				assert.equal(s, "[ぺきゅ]属性 え の値【も】が数値ではありません");
			}
		});


		it('argChk_Boolean0', ()=> {
			assert.equal(CmnLib.argChk_Boolean(
				{あ:true, い:false}, 'あ', false),
				true);
		});
			it('argChk_Boolean1', ()=> {
				assert.equal(CmnLib.argChk_Boolean(
					{あ:true, い:false}, 'い', true),
					false);
			});
			it('argChk_Boolean2', ()=> {
				assert.equal(CmnLib.argChk_Boolean(
					{あ:false, い:false}, 'う', true),
					true);
			});
		it('argChk_Boolean10', ()=> {
			assert.equal(CmnLib.argChk_Boolean(
				{あ:null, い:true}, 'あ', true),	// x多分defになる
				false);
		});
			it('argChk_Boolean11', ()=> {
				assert.equal(CmnLib.argChk_Boolean(
					{あ:'null', い:true}, 'あ', true),
					true);	// 空文字じゃないので
			});
		it('argChk_Boolean20', ()=> {
			assert.equal(CmnLib.argChk_Boolean(
				{あ:500, い:false}, 'あ', false),
				true);
		});
			it('argChk_Boolean21', ()=> {
				assert.equal(CmnLib.argChk_Boolean(
					{あ:0, い:false}, 'あ', false),
					true);	// 空文字じゃないので
			});
			it('argChk_Boolean22', ()=> {
				assert.equal(CmnLib.argChk_Boolean(
					{あ:NaN, い:false}, 'あ', false),
					true);	// 空文字じゃないので
			});
		it('argChk_Boolean30', ()=> {
			assert.equal(CmnLib.argChk_Boolean(
				{あ:'true', い:false}, 'あ', false),
				true);
		});
			it('argChk_Boolean31', ()=> {
				assert.equal(CmnLib.argChk_Boolean(
					{あ:'false', い:true}, 'あ', true),
					false);
			});

/*
		it('argChk_BlendmodeAndSet0', ()=> {
			const sp:Sprite = new Sprite();
			sp.blendMode = 'add';
			argChk_BlendmodeAndSet({}, sp);
			assert.equal(sp.blendMode, 'add');
		});
		it('argChk_BlendmodeAndSet1', ()=> {
			const sp:Sprite = new Sprite();
			sp.blendMode = 'add';
			argChk_BlendmodeAndSet({
				'blendmode'	: 'normal'
			}, sp);
			assert.equal(sp.blendMode, 'normal');
		});
		it('argChk_BlendmodeAndSet2', ()=> {
			const sp:Sprite = new Sprite();
			sp.blendMode = 'add';
			argChk_BlendmodeAndSet({
				'blendmode'	: 'difference'
			}, sp);
			assert.equal(sp.blendMode, 'difference');
		});
		it('argChk_BlendmodeAndSet3', ()=> {
			const sp:Sprite = new Sprite();
			sp.blendMode = 'add';
			argChk_BlendmodeAndSet({
				'blendmode'	: 'overlay'
			}, sp);
			assert.equal(sp.blendMode, 'overlay');
		});
		it('argChk_BlendmodeAndSet10', ()=> {
			try {
				const sp:Sprite = new Sprite();
				sp.blendMode = 'add';
				argChk_BlendmodeAndSet({
					'blendmode'	: 'alpha'
				}, sp);
				fail('Error:test_argChk_BlendmodeAndSet10 err');
			}
			catch (s) {
				assert.equal(s, 'blendmode=alpha はサポートされません');
			}
		});
		it('argChk_BlendmodeAndSet11', ()=> {
			try {
				const sp:Sprite = new Sprite();
				sp.blendMode = 'add';
				argChk_BlendmodeAndSet({
					'blendmode'	: 'add_xxx'
				}, sp);
				fail('Error:test_argChk_BlendmodeAndSet11 err');
			}
			catch (s) {
				assert.equal(s, 'blendmode=add_xxx は異常な値です');
			}
		});
*/


		it('testAnalyzeScript0', ()=> {
			const sScr = "";
			vctToken = sScr.match(CmnLib.REG_TOKEN);
		//	compile	err	= Vector.<String>(sScr.toLocaleString().match(REG_TOKEN));
			if (vctToken == null) return;
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 0);
		});

		it('testAnalyzeScript_str1', ()=> {
			const sScr = "うひょー";
			vctToken = sScr.match(CmnLib.REG_TOKEN);
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
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], "\n");
		});
		it('testAnalyzeScript_n8', ()=> {
			const sScr = "\n\n\n\n\n\n\n\n";
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], "\n\n\n\n\n\n\n\n");
		});
		it('testAnalyzeScript_n3t2n5', ()=> {
			const sScr = "\n\n\n\t\t\n\n\n\n\n";
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], "\n\n\n");
			assert.equal(vctToken[1], "\t\t");
			assert.equal(vctToken[2], "\n\n\n\n\n");
		});

		it('testAnalyzeScript_ans', ()=> {
			const sScr = '\t[add_lay layer=mes class=txt]\n\t[add_lay layer=upd class=grp]\n\t[lay layer="mes" visible=true b_alpha=0 r_size=12 r_align="121" layout=\'blockProgression="rl" lineHeight="36" paddingTop="15" paddingRight="15" fontSize="24" color="0xffffff"\']\n\n\t[title text="&tmp:const.flash.desktop.NativeApplication.nativeApplication.applicationDescriptor.filename +\'  ver \'+ tmp:const.flash.desktop.NativeApplication.nativeApplication.applicationDescriptor.version"]\n\n\t空気《え あ》小説《のべる》[r]\n\tばい　ふぁみべぇ[r]\n[r]\n\tクリックで更新確認[r]\n\tするよー[p][er]\n\n\t[lay layer=upd fn="update" visible=true left=86 top=86]\n[update_check url="http://ugainovel.ddo.jp/ans/ver.xml" config_fn="update.xml"]\n\t何かあれば[r]\n\t通知します。[r]\n[r][r][r][r]\n\t数秒経っても無反応なら更新はありません。\n*loop\n[l]\n[jump label=*loop]\n';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
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
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 2);
			assert.equal(vctToken[0], '[lay layer="mes" chk_overrow=false over_ins_tag="[plc]"]');
			assert.equal(vctToken[1], "\n");
		});
		it('testAnalyzeScript_bug120904', ()=> {
			const sScr = '; [hoge\n[s]\n[trace text="error"]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
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
			vctToken = sScr.match(CmnLib.REG_TOKEN);
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
			vctToken = sScr.match(CmnLib.REG_TOKEN);
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
			vctToken = sScr.match(CmnLib.REG_TOKEN);
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
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 4);
			assert.equal(vctToken[0], "[a]");
			assert.equal(vctToken[1], "[ab]");
			assert.equal(vctToken[2], "[あ]");
			assert.equal(vctToken[3], "[あい]");

			const a_tag = CmnLib.REG_TAG.exec(sScr);
			if (a_tag == null) assert.fail("Error:bug150603_0");
		});
		it('testAnalyzeScript_bug150603_1', ()=> {
			const sScr = '[あ]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], "[あ]");

			const a_tag = CmnLib.REG_TAG.exec(sScr);
			if (a_tag == null) assert.fail("Error:bug150603_1");
		});
		it('testAnalyzeScript_bug150603_2', ()=> {
			const sScr = '[あい]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], "[あい]");

			const a_tag = CmnLib.REG_TAG.exec(sScr);
			if (a_tag == null) assert.fail("Error:bug150603_2");
		});
		it('testAnalyzeScript_bug150603_3', ()=> {
			const sScr = '[あ a=0]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], "[あ a=0]");

			const a_tag = CmnLib.REG_TAG.exec(sScr);
			if (a_tag == null) assert.fail("Error:bug150603_3");
		});
		it('testAnalyzeScript_bug150603_4', ()=> {
			const sScr = '[あい a=0]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;

			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], "[あい a=0]");

			const a_tag = CmnLib.REG_TAG.exec(sScr);
			if (a_tag == null) assert.fail("Error:bug150603_4");
		});

		it('test_let_expansion_0_cr', ()=> {
			const sScr = '&text=1+2=int\n[tcy t="!!"] あ。/\nあ。/';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 6);
			assert.equal(vctToken[0], '&text=1+2=int');
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\n");
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[3], " あ。/");
			ch = vctToken[3].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), false);

			assert.equal(vctToken[4], "\n");
			ch = vctToken[4].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[5], "あ。/");
			ch = vctToken[5].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), false);
		});
		it('test_let_expansion_0_cr_spc', ()=> {
			const sScr = '&text = 1 + 2 = int\t[tcy t="!!"]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&text = 1 + 2 = int');
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t");
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_let_expansion_0_cr_spc_var', ()=> {
			const sScr = '&text = hA[#ar$BB#]\t[tcy t="!!"]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&text = hA[#ar$BB#]');
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t");
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_let_expansion_1_tab', ()=> {
			const sScr = '&text=1+2=int\t[tcy t="!!"]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&text=1+2=int');
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t");
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_let_expansion_1_tab_spc', ()=> {
			const sScr = '&text = 1 + 2 = int\t[tcy t="!!"]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&text = 1 + 2 = int');
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t");
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_let_expansion_1_tab_spc_var', ()=> {
			const sScr = '&text = hA[#ar$BB#]\t[tcy t="!!"]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&text = hA[#ar$BB#]');
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t");
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_let_expansion_2_spc', ()=> {
			const sScr = '&text=1+2=int [tcy t="!!"]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], '&text=1+2=int [tcy t="!!"]');
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_let_expansion_2_spc2', ()=> {
			const sScr = '&text=1+2=int  [tcy t="!!"]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 1);
			assert.equal(vctToken[0], '&text=1+2=int  [tcy t="!!"]');
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_let_expansion_3_comment', ()=> {
			const sScr = '&text=1+2=int\t; [tcy t="!!"]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&text=1+2=int');
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t");
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '; [tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_let_expansion_3_comment2', ()=> {
			const sScr = '&text=1+2=int\t\t; [tcy t="!!"]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&text=1+2=int');
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t\t");
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '; [tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_let_expansion_4_OperatorEq', ()=> {
			const sScr = '&text=1+2 == null\t\t; [tcy t="!!"]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&text=1+2 == null');
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t\t");
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '; [tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_let_expansion_4_OperatorNotEq', ()=> {
			const sScr = '&text=1+2 != null\t\t; [tcy t="!!"]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&text=1+2 != null');
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t\t");
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '; [tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_let_bug_20120321s_aira', ()=> {
			const sScr = "&&'tex'+0 = 1+2\t[tcy t='!!']";
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], "&&'tex'+0 = 1+2");
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t");
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], "[tcy t='!!']");
			ch = vctToken[2].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});

		it('test_ch_expansion_0_cr', ()=> {
			const sScr = '&test&\n[tcy t="!!"]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&test&');
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\n");
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_ch_expansion_0_cr_spc', ()=> {
			const sScr = '&test cr spc&\n[tcy t="!!"]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&test cr spc&');
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\n");
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_ch_expansion_0_cr_spc_var', ()=> {
			const sScr = '&test hA[#ar$BB#]&\n[tcy t="!!"]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&test hA[#ar$BB#]&');
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\n");
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_ch_expansion_1_tab', ()=> {
			const sScr = '&test&\t[tcy t="!!"]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&test&');
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t");
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_ch_expansion_1_tab_spc', ()=> {
			const sScr = '&test tab spc&\t[tcy t="!!"]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&test tab spc&');
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t");
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_ch_expansion_1_tab_spc_var', ()=> {
			const sScr = '&test hA[#ar$BB#]&\t[tcy t="!!"]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&test hA[#ar$BB#]&');
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t");
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_ch_expansion_2_spc', ()=> {
			const sScr = '&test& [tcy t="!!"]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&test&');
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], " ");
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), false);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_ch_expansion_2_spc2', ()=> {
			const sScr = '&test&  [tcy t="!!"]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&test&');
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "  ");
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), false);

			assert.equal(vctToken[2], '[tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_ch_expansion_2_comment', ()=> {
			const sScr = '&test&\t; [tcy t="!!"]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 3);
			assert.equal(vctToken[0], '&test&');
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\t");
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '; [tcy t="!!"]');
			ch = vctToken[2].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_ch_expansion_miss_0', ()=> {
			const sScr = '&te\nst&\n[tcy t="!!"]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 5);
			assert.equal(vctToken[0], '&te');
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\n");
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], "st&");
			ch = vctToken[2].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), false);

			assert.equal(vctToken[3], "\n");
			ch = vctToken[3].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[4], '[tcy t="!!"]');
			ch = vctToken[4].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_ch_expansion_miss_1', ()=> {
			const sScr = '&te\n\tst&\n[tcy t="!!"]';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 6);
			assert.equal(vctToken[0], '&te');
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], "\n");
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[2], '\t');
			ch = vctToken[2].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[3], 'st&');
			ch = vctToken[3].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), false);

			assert.equal(vctToken[4], "\n");
			ch = vctToken[4].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[5], '[tcy t="!!"]');
			ch = vctToken[5].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});



		it('test_char2macro_0', ()=> {
			const sScr = '[tcy t="!!"] あ。/\nあ。/';
			vctToken = sScr.match(CmnLib.REG_TOKEN);
			vctTokenLen = vctToken.length;
			let ch = "";

			assert.equal(vctTokenLen, 4);
			assert.equal(vctToken[0], '[tcy t="!!"]');
			ch = vctToken[0].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], " あ。/");
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), false);

			assert.equal(vctToken[2], "\n");
			ch = vctToken[2].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[3], "あ。/");
			ch = vctToken[3].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), false);
		});

		it('test_multiline_tag_nochg0', ()=> {
			const sScr = '[r]';
			assert.equal(CmnLib.cnvMultilineTag(sScr), sScr);
		});
		it('test_multiline_tag_nochg1', ()=> {
			const sScr = '[ch]';
			assert.equal(CmnLib.cnvMultilineTag(sScr), sScr);
		});
		it('test_multiline_tag0', ()=> {
			const sScr =
`[r
]`;
			assert.equal(CmnLib.cnvMultilineTag(sScr),
`[r]
`);
		});
		it('test_multiline_tag1', ()=> {
			const sScr =
`[ch
]`;
			assert.equal(CmnLib.cnvMultilineTag(sScr),
`[ch]
`);
		});
		it('test_multiline_tag10', ()=> {
			const sScr =
`[r
a= 0]`;
			assert.equal(CmnLib.cnvMultilineTag(sScr),
`[r a= 0]
`);
		});
		it('test_multiline_tag11', ()=> {
			const sScr =
`[ch
;===
text=""]`;
			assert.equal(CmnLib.cnvMultilineTag(sScr),
`[ch text=""]
;===
`);
		});
		it('test_multiline_tag12', ()=> {
			const sScr =
`[ch
]`;
			assert.equal(CmnLib.cnvMultilineTag(sScr),
`[ch]
`);
		});
		it('test_multiline_tag20', ()=> {
			const sScr =
`[r
]あ[r
a= 0]ん[r]こ[ch
;===
text=""]`;
			assert.equal(CmnLib.cnvMultilineTag(sScr),
`[r]
あ[r a= 0]
ん[r]こ[ch text=""]
;===
`
			);
		});
		it('test_multiline_tag21', ()=> {
			const sScr =
`こ[ch
	page=fore\t;===
	text=""]`;
			assert.equal(CmnLib.cnvMultilineTag(sScr),
`こ[ch page=fore text=""]
;===
`
			);
		});
		it('test_multiline_tag_bug120904', ()=> {
			const sScr =
`; [hoge
[s]
[trace text="error"]`;
			assert.equal(CmnLib.cnvMultilineTag(sScr),
				sScr
			);
		});
		it('test_multiline_tag_bug120904_2', ()=> {
			const sScr =
`め[ch
	page=fore\t;===
	text="["]`;
			assert.equal(CmnLib.cnvMultilineTag(sScr),
`め[ch page=fore text="["]
;===
`
			);
		});
		it('test_multiline_tag_bug120904_3', ()=> {
			const sScr =
`め[ch
	page=fore\t;===
	text="]"]`;
			assert.equal(CmnLib.cnvMultilineTag(sScr),
`め[ch page=fore text="]"]
;===
`
			);
		});
		it('test_multiline_tag_bug140108', ()=> {
			const sScr =
`[let name="sysse_ok1" text="BurstB_11"]


; 立ち絵配置位置定数
;	[lay pos=&pos.l	等として使用。
;	組み込みで「c」という指定が出来る。例：pos=c、pos="c"
[let name="pos.l" text="140"]`;
			assert.equal(CmnLib.cnvMultilineTag(sScr),
				sScr
			);
		});
		it('test_multiline_tag_180623gallery0', ()=> {
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
			assert.equal(CmnLib.cnvMultilineTag(sScr),
`[add_lay layer=mes class=txt]




		multi
	line tag[r]
	[span layout = 'color="0xaaaaaa"']




	タグやマクロは複数行に改行して書ける[r]
	[span]
[s]`);
		});

		it('test_multiline_tag_180731', ()=> {	// 文字列リテラル内の「;」が効く不具合
			const sScr =
`[lay
style="&'color: '+ fcol +'; writing-mode: vertical-rl;'"]`;
			assert.equal(CmnLib.cnvMultilineTag(sScr),
`[lay style="&'color: '+ fcol +'; writing-mode: vertical-rl;'"]
`);
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
			vctToken = sScr.match(CmnLib.REG_TOKEN);
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
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], '[endlet_ml]');
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});
		it('test_let_ml_1', ()=> {
			const sScr =
`[let_ml name=ml]
[
	{"fn": "../bgimage/yun_1317.jpg", "dt": "2018/12/18 11:44", "txt": "　ああ、桜の樹の下には屍体が埋まつてゐる！"},
]
[endlet_ml]`;
			vctToken = sScr.match(CmnLib.REG_TOKEN);
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
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);

			assert.equal(vctToken[1], '[endlet_ml]');
			ch = vctToken[1].charAt(0);
			assert.equal(CmnLib.REG_TOKEN_NOTXT.test(ch), true);
		});



		// Main.splitAmpersand
		it('test_mth_splitAmpersand0', ()=> {
			const o = CmnLib.splitAmpersand("pl = 70");
			assert.equal(o['name'], "pl ");
			assert.equal(o['text'], " 70");
			assert.equal(o['cast'], null);
		});
		it('test_mth_splitAmpersand1', ()=> {
			const o = CmnLib.splitAmpersand("text=1+2=int");
			assert.equal(o['name'], "text");
			assert.equal(o['text'], "1+2");
			assert.equal(o['cast'], "int");
		});
		it('test_mth_splitAmpersand2', ()=> {
			const o = CmnLib.splitAmpersand(
				"buf_page.0 = -999");
			assert.equal(o['name'], "buf_page.0 ");
			assert.equal(o['text'], " -999");
			assert.equal(o['cast'], null);
		});
		it('test_mth_splitAmpersand3', ()=> {
			const o = CmnLib.splitAmpersand(
				"b = (1 == 0) = uint");
			assert.equal(o['name'], "b ");
			assert.equal(o['text'], " (1 == 0) ");
			assert.equal(o['cast'], "uint");
		});
		it('test_mth_splitAmpersand4', ()=> {
			const o = CmnLib.splitAmpersand(
				"b = (1 != 0) = int");
			assert.equal(o['name'], "b ");
			assert.equal(o['text'], " (1 != 0) ");
			assert.equal(o['cast'], "int");
		});

		it('test_mth_splitAmpersand_err0', ()=> {
			try {
				const o
					= CmnLib.splitAmpersand("b=1=0=uint");
				assert.fail("Error:ccc");
			}
			catch (s) {
				assert.equal(s, "「&計算」書式では「=」指定が一つか二つ必要です");
			}
		});
		it('test_mth_splitAmpersand_err1', ()=> {
			try {
				const o
					= CmnLib.splitAmpersand("text=&1+2=int");
				assert.fail("Error:ccc");
			}
			catch (s) {
				assert.equal(s, "「&計算」書式では「&」指定が不要です");
			}
		});




	});

});
