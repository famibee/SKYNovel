/* ***** BEGIN LICENSE BLOCK *****
Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {argChk_Boolean, argChk_Num} from '../src/sn/CmnLib';

import {beforeEach, it, expect} from 'vitest';

it('argChk_Num0', ()=> {
	expect(argChk_Num(
		{あ:2, い:3.5, う:'0x15', え:'も', ':タグ名':'ぺきゅ'},
		'あ', 13)).toBe(2);
});
it('argChk_Num1', ()=> {
	expect(argChk_Num(
		{あ:2, い:3.5, う:'0x15', え:'も', ':タグ名':'ぺきゅ'},
		'い', 13)).toBe(3.5);
});
it('argChk_Num2', ()=> {
	expect(argChk_Num(
		{あ:2, い:3.5, う:'0x15', え:'も', ':タグ名':'ぺきゅ'},
		'う', 13)).toBe(21);
});
it('argChk_Num5', ()=> {
	expect(argChk_Num(
		{あ:2, い:3.5, う:'0x15', え:'も', ':タグ名':'ぺきゅ'},
		'ぷ', 13)).toBe(13);
});
it('argChk_Num10_err', ()=> {
	expect(()=> argChk_Num(
		{あ:2, い:3.5, う:'0x15', え:'も', ':タグ名':'ぺきゅ'},
		'ぷ', NaN))
	.toThrowError('[ぺきゅ]属性 ぷ は必須です');
});
it('argChk_Num11_err', ()=> {
	expect(()=> argChk_Num(
		{あ:2, い:3.5, う:'0x15', え:'も', ':タグ名':'ぺきゅ'},
		'え', 13))
	.toThrowError('[ぺきゅ]属性 え の値【も】が数値ではありません');
});


it('argChk_Boolean0', ()=> {
	expect(argChk_Boolean(
		{あ:true, い:false}, 'あ', false)).toBe(true);
});
	it('argChk_Boolean1', ()=> {
		expect(argChk_Boolean(
			{あ:true, い:false}, 'い', true)).toBe(false);
	});
	it('argChk_Boolean2', ()=> {
		expect(argChk_Boolean(
			{あ:false, い:false}, 'う', true)).toBe(true);
	});
it('argChk_Boolean10', ()=> {
	expect(argChk_Boolean(	// x多分defになる
		{あ:null, い:true}, 'あ', true)).toBe(false);
});
	it('argChk_Boolean11', ()=> {
		expect(argChk_Boolean(
			{あ:'null', い:true}, 'あ', true)).toBe(true);	// 空文字じゃないので
	});
it('argChk_Boolean20', ()=> {
	expect(argChk_Boolean(
		{あ:500, い:false}, 'あ', false)).toBe(true);
});
	it('argChk_Boolean21', ()=> {
		expect(argChk_Boolean(
			{あ:0, い:false}, 'あ', false)).toBe(true);	// 空文字じゃないので
	});
	it('argChk_Boolean22', ()=> {
		expect(argChk_Boolean(
			{あ:NaN, い:false}, 'あ', false)).toBe(true);	// 空文字じゃないので
	});
it('argChk_Boolean30', ()=> {
	expect(argChk_Boolean(
		{あ:'true', い:false}, 'あ', false)).toBe(true);
});
	it('argChk_Boolean31', ()=> {
		expect(argChk_Boolean(
			{あ:'false', い:true}, 'あ', true)).toBe(false);
	});

/*
it('argChk_BlendmodeAndSet0', ()=> {
	const sp:Sprite = new Sprit
	sp.blendMode = 'add';
	argChk_BlendmodeAndSet({}, sp);
	expect(sp.blendMode, 'add');
});
it('argChk_BlendmodeAndSet1', ()=> {
	const sp:Sprite = new Sprite;
	sp.blendMode = 'add';
	argChk_BlendmodeAndSet({
		'blendmode'	: 'normal'
	}, sp);
	expect(sp.blendMode, 'normal');
});
it('argChk_BlendmodeAndSet2', ()=> {
	const sp:Sprite = new Sprite;
	sp.blendMode = 'add';
	argChk_BlendmodeAndSet({
		'blendmode'	: 'difference'
	}, sp);
	expect(sp.blendMode, 'difference');
});
it('argChk_BlendmodeAndSet3', ()=> {
	const sp:Sprite = new Sprite;
	sp.blendMode = 'add';
	argChk_BlendmodeAndSet({
		'blendmode'	: 'overlay'
	}, sp);
	expect(sp.blendMode, 'overlay');
});
it('argChk_BlendmodeAndSet10', ()=> {
	try {
		const sp:Sprite = new Sprit
		sp.blendMode = 'add';
		argChk_BlendmodeAndSet({
			'blendmode'	: 'alpha'
		}, sp);
		fail('Error:test_argChk_BlendmodeAndSet10 err');
	}
	catch (s) {
		expect(s, 'blendmode=alpha はサポートされません');
	}
});
it('argChk_BlendmodeAndSet11', ()=> {
	try {
		const sp:Sprite = new Sprite;
		sp.blendMode = 'add';
		argChk_BlendmodeAndSet({
			'blendmode'	: 'add_xxx'
		}, sp);
		fail('Error:test_argChk_BlendmodeAndSet11 err');
	}
	catch (s) {
		expect(s, 'blendmode=add_xxx は異常な値です');
	}
});
*/
