/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import assert = require('power-assert');

import {CmnLib} from '../core/src/sn/CmnLib';

context('class CmnLib & ScriptIterator & Main', ()=>{
	let	vctToken	: string[]	= null;
	let	vctTokenLen				= 0;
/*	let target;
	const jsdomify = require('jsdomify');
	before(()=> {
		jsdomify.create('<!doctype html><html><body><div id="content"></div></body></html>');
		target = document.querySelector('#content');
	});*/
	beforeEach(()=> {
		vctToken = null;
		vctTokenLen= 0;
	});
/*	after(()=> {
		jsdomify.destroy();
	});
*/
	describe('Tst', ()=> {
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

	});

});
