/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Hyphenation, type IChRect} from '../src/sn/Hyphenation';

import {Rectangle} from 'pixi.js';
import {GlobalRegistrator} from '@happy-dom/global-registrator';

GlobalRegistrator.register();

let	hyph	: Hyphenation;
	const sx = 11;
	const sy = 13;
	const w = 5;
	const h = 7;
	const elm = document.createElement('span');
	const eRp = document.createElement('span');	// 親文字
	const eRt = document.createElement('rt');	// ルビ
		eRt.textContent = '☀';
	const eRt3 = document.createElement('rt');	// ルビ
		eRt3.textContent = '☀☁☂';
	const eRuby = document.createElement('ruby');
	eRuby.appendChild(eRp);
	eRuby.appendChild(eRt);
beforeEach(()=> {
	hyph = new Hyphenation;
});

//MARK: ぶら下げなし
it.each(<{
	a	: IChRect[];
	p_i	: number,
	p_ch: string,
	i	: number;	// i >= 2
	ch	: string,
	ret	: {cont: boolean, ins: number,};}[]>[

	// 改行なし
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
	], p_i: 2, p_ch: 'の', i: 3, ch: '春', ret: {cont: true, ins: 3 +1,},},
	// testFnc行末禁則_warning_0_7_8n
	{a: [
		{ch: '【',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '【',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
	], p_i: 2, p_ch: 'の', i: 3, ch: '【', ret: {cont: true, ins: 3 +1,},},
	{a: [
		{ch: '【',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '【',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
	], p_i: 1, p_ch: 'こ', i: 2, ch: 'の', ret: {cont: true, ins: 2 +1,},},
	{a: [
		{ch: '【',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: '【',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
	], p_i: 1, p_ch: 'こ', i: 2, ch: '【', ret: {cont: true, ins: 2 +1,},},

	// 文字領域限界折り返し・自動改行
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 2, p_ch: 'の', i: 3, ch: '春', ret: {cont: true, ins: 3 +1,},},

	// 追い出し（分割禁止）
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: '…',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '…',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 2, p_ch: '…', i: 3, ch: '…', ret: {cont: false, ins: 1 +1,},},
	// 追い出し（分割禁止）＋末尾行末禁則
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: '〈',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: '…',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '…',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 2, p_ch: '…', i: 3, ch: '…', ret: {cont: false, ins: 0 +1,},},
	// 追い出し（分割禁止）＋ルビ
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'ル',	elm: eRp, rect: new Rectangle(sx+0.5*w, sy +1 *h, w, h)},
		{ch: 'ル',	elm: eRt, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: '…',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '…',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 3, p_ch: '…', i: 4, ch: '…', ret: {cont: false, ins: 1 +1,},},

	// 追い出し（行末禁則）
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: '〈',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 2, p_ch: '〈', i: 3, ch: '春', ret: {cont: false, ins: 1 +1,},},
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: '〈',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '〉',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 2, p_ch: '〈', i: 3, ch: '〉', ret: {cont: false, ins: 1 +1,},},
	// 追い出し（行末禁則）＋末尾行末禁則
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: '〈',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: '〈',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 2, p_ch: '〈', i: 3, ch: '春', ret: {cont: false, ins: 0 +1,},},
	// 追い出し（行末禁則）＋ルビ
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'ル',	elm: eRp, rect: new Rectangle(sx+0.5*w, sy +1 *h, w, h)},
		{ch: 'ル',	elm: eRt, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: '〈',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -1 *w, sy +3 *h, w, h)},
	], p_i: 3, p_ch: '〈', i: 4, ch: '春', ret: {cont: false, ins: 1 +1,},},

	// 追い出し（行頭禁則）
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '〉',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 2, p_ch: 'の', i: 3, ch: '〉', ret: {cont: false, ins: 1 +1,},},
	// 追い出し（行頭禁則）x2
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: '〉',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '〉',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 2, p_ch: '〉', i: 3, ch: '〉', ret: {cont: false, ins: 1 +1,},},
	// 追い出し（行頭禁則）＋末尾行末禁則
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: '〈',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '〉',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 2, p_ch: 'こ', i: 3, ch: '〉', ret: {cont: false, ins: 1 +1,},},
	// 追い出し（行頭禁則）＋ルビ
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'ル',	elm: eRp, rect: new Rectangle(sx+0.5*w, sy +2 *h, w, h)},
		{ch: 'ル',	elm: eRt, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '〉',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 2, p_ch: 'ル', i: 4, ch: '〉', ret: {cont: false, ins: 1 +1,},},

])(`$ret`, ({a, i, ch, p_i, p_ch, ret})=> {
	expect(hyph.hyph_alg(a, p_i, p_ch, i, ch)).toStrictEqual(ret);
});

//MARK: ぶら下げあり
it.each(<{
	a	: IChRect[];
	p_i	: number,
	p_ch: string,
	i	: number;	// i >= 2
	ch	: string,
	ret	: {cont: boolean, ins: number,};}[]>[
	// 改行なし
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -0 *w, sy +4 *h, w, h)},
		// (仮改行)
		{ch: 'ら',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
		{ch: '一',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},
		{ch: '年',	elm, rect: new Rectangle(sx -1 *w, sy +2 *h, w, h)},
		{ch: 'に',	elm, rect: new Rectangle(sx -1 *w, sy +3 *h, w, h)},
	], p_i: 4, p_ch: 'か', i: 5, ch: 'ら', ret: {cont: false, ins: 2 +1,},},

	// ぶら下げx1 と (仮改行) の組み合わせ
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -0 *w, sy +4 *h, w, h)},
		{ch: 'ら',	elm, rect: new Rectangle(sx -0 *w, sy +5 *h, w, h)},
		// (仮改行)
		{ch: '。',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},//ぶら
		{ch: '一',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},
		{ch: '年',	elm, rect: new Rectangle(sx -1 *w, sy +2 *h, w, h)},
	], p_i: 5, p_ch: 'ら', i: 6, ch: '。', ret: {cont: false, ins: 3 +1,},},
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -0 *w, sy +4 *h, w, h)},
		{ch: '。',	elm, rect: new Rectangle(sx -0 *w, sy +5 *h, w, h)},//ぶら
		// (仮改行)
		{ch: 'ら',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
		{ch: '一',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},
		{ch: '年',	elm, rect: new Rectangle(sx -1 *w, sy +2 *h, w, h)},
	], p_i: 5, p_ch: '。', i: 6, ch: 'ら', ret: {cont: false, ins: 3 +1,},},
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: '。',	elm, rect: new Rectangle(sx -0 *w, sy +4 *h, w, h)},//ぶら
		{ch: 'か',	elm, rect: new Rectangle(sx -0 *w, sy +5 *h, w, h)},
		// (仮改行)
		{ch: 'ら',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
		{ch: '一',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},
		{ch: '年',	elm, rect: new Rectangle(sx -1 *w, sy +2 *h, w, h)},
	], p_i: 5, p_ch: 'か', i: 6, ch: 'ら', ret: {cont: false, ins: 4 +1,},},

	// ぶら下げx2 と (仮改行) の組み合わせ
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -0 *w, sy +4 *h, w, h)},
		{ch: 'ら',	elm, rect: new Rectangle(sx -0 *w, sy +5 *h, w, h)},
		// (仮改行)
		{ch: 'ぁ',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},//ぶら
		{ch: 'ぃ',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},//ぶら2
		{ch: '　',	elm, rect: new Rectangle(sx -1 *w, sy +2 *h, w, h)},
	], p_i: 5, p_ch: 'ら', i: 6, ch: 'ぁ', ret: {cont: false, ins: 3 +1,},},
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -0 *w, sy +4 *h, w, h)},
		{ch: 'ら',	elm, rect: new Rectangle(sx -0 *w, sy +5 *h, w, h)},
		{ch: 'ぁ',	elm, rect: new Rectangle(sx -0 *w, sy +6 *h, w, h)},//ぶら
		// (仮改行)
		{ch: 'ぃ',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},//ぶら2
		{ch: '　',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},
	], p_i: 6, p_ch: 'ぁ', i: 7, ch: 'ぃ', ret: {cont: false, ins: 4 +1,},},
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -0 *w, sy +4 *h, w, h)},
		{ch: 'ら',	elm, rect: new Rectangle(sx -0 *w, sy +5 *h, w, h)},
		{ch: 'ぁ',	elm, rect: new Rectangle(sx -0 *w, sy +6 *h, w, h)},//ぶら
		{ch: 'ぃ',	elm, rect: new Rectangle(sx -0 *w, sy +7 *h, w, h)},//ぶら2
		// (仮改行)
		{ch: '　',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 7, p_ch: 'ぃ', i: 8, ch: '　', ret: {cont: false, ins: 7 +1,},},

	// ぶら下げx1 と (仮改行) と ぶら下げx1 の組み合わせ
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -0 *w, sy +4 *h, w, h)},
		{ch: 'ら',	elm, rect: new Rectangle(sx -0 *w, sy +5 *h, w, h)},
		// (仮改行)
		{ch: 'ぁ',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},//ぶら
		{ch: 'は',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},//非ぶら
		{ch: 'ぃ',	elm, rect: new Rectangle(sx -1 *w, sy +2 *h, w, h)},//ぶら2
	], p_i: 5, p_ch: 'ら', i: 6, ch: 'ぁ', ret: {cont: false, ins: 3 +1,},},
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -0 *w, sy +4 *h, w, h)},
		{ch: 'ら',	elm, rect: new Rectangle(sx -0 *w, sy +5 *h, w, h)},
		{ch: 'ぁ',	elm, rect: new Rectangle(sx -0 *w, sy +6 *h, w, h)},//ぶら
		// (仮改行)
		{ch: 'は',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},//非ぶら
		{ch: 'ぃ',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},//ぶら2
	], p_i: 6, p_ch: 'ぁ', i: 7, ch: 'は', ret: {cont: false, ins: 4 +1,},},
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -0 *w, sy +4 *h, w, h)},
		{ch: 'ら',	elm, rect: new Rectangle(sx -0 *w, sy +5 *h, w, h)},
		{ch: 'ぁ',	elm, rect: new Rectangle(sx -0 *w, sy +6 *h, w, h)},//ぶら
		{ch: 'は',	elm, rect: new Rectangle(sx -0 *w, sy +7 *h, w, h)},//非ぶら
		// (仮改行)
		{ch: 'ぃ',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},//ぶら2
	], p_i: 7, p_ch: 'は', i: 8, ch: 'ぃ', ret: {cont: false, ins: 6 +1,},},
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -0 *w, sy +4 *h, w, h)},
		{ch: 'ら',	elm, rect: new Rectangle(sx -0 *w, sy +5 *h, w, h)},
		{ch: 'ぁ',	elm, rect: new Rectangle(sx -0 *w, sy +6 *h, w, h)},//ぶら
		{ch: 'は',	elm, rect: new Rectangle(sx -0 *w, sy +7 *h, w, h)},//非ぶら
		{ch: 'ぃ',	elm, rect: new Rectangle(sx -0 *w, sy +8 *h, w, h)},//ぶら2
		// (仮改行)
		{ch: '一',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 8, p_ch: 'ぃ', i: 9, ch: '一', ret: {cont: false, ins: 6 +1,},},


	// ぶら下げx3
	//ぶら3 は三つめ以降、ぶら下げ・行頭禁則諦める
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -0 *w, sy +4 *h, w, h)},
		{ch: 'ら',	elm, rect: new Rectangle(sx -0 *w, sy +5 *h, w, h)},
		// (仮改行)
		{ch: 'ぁ',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},//ぶら
		{ch: 'ぃ',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},//ぶら2
		{ch: 'ぅ',	elm, rect: new Rectangle(sx -1 *w, sy +2 *h, w, h)},//ぶら3
		{ch: '一',	elm, rect: new Rectangle(sx -1 *w, sy +3 *h, w, h)},
		{ch: '年',	elm, rect: new Rectangle(sx -1 *w, sy +4 *h, w, h)},
	], p_i: 5, p_ch: 'ら', i: 6, ch: 'ぁ', ret: {cont: false, ins: 3 +1,},},
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -0 *w, sy +4 *h, w, h)},
		{ch: 'ら',	elm, rect: new Rectangle(sx -0 *w, sy +5 *h, w, h)},
		{ch: 'ぁ',	elm, rect: new Rectangle(sx -0 *w, sy +6 *h, w, h)},//ぶら
		// (仮改行)
		{ch: 'ぃ',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},//ぶら2
		{ch: 'ぅ',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},//ぶら3
		{ch: '一',	elm, rect: new Rectangle(sx -1 *w, sy +2 *h, w, h)},
		{ch: '年',	elm, rect: new Rectangle(sx -1 *w, sy +3 *h, w, h)},
	], p_i: 6, p_ch: 'ぁ', i: 7, ch: 'ぃ', ret: {cont: false, ins: 4 +1,},},
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -0 *w, sy +4 *h, w, h)},
		{ch: 'ら',	elm, rect: new Rectangle(sx -0 *w, sy +5 *h, w, h)},
		{ch: 'ぁ',	elm, rect: new Rectangle(sx -0 *w, sy +6 *h, w, h)},//ぶら
		{ch: 'ぃ',	elm, rect: new Rectangle(sx -0 *w, sy +7 *h, w, h)},//ぶら2
		// (仮改行)
		{ch: 'ぅ',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},//ぶら3
		{ch: '一',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},
		{ch: '年',	elm, rect: new Rectangle(sx -1 *w, sy +2 *h, w, h)},
	], p_i: 7, p_ch: 'ぃ', i: 8, ch: 'ぅ', ret: {cont: false, ins: 7 +1,},},
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -0 *w, sy +4 *h, w, h)},
		{ch: 'ら',	elm, rect: new Rectangle(sx -0 *w, sy +5 *h, w, h)},
		{ch: 'ぁ',	elm, rect: new Rectangle(sx -0 *w, sy +6 *h, w, h)},//ぶら
		{ch: 'ぃ',	elm, rect: new Rectangle(sx -0 *w, sy +7 *h, w, h)},//ぶら2
		{ch: 'ぅ',	elm, rect: new Rectangle(sx -0 *w, sy +8 *h, w, h)},//ぶら3
		// (仮改行)
		{ch: '一',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
		{ch: '年',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},
	], p_i: 8, p_ch: 'ぅ', i: 9, ch: '一', ret: {cont: false, ins: 8 +1,},},


	// 追い出し（分割禁止）
		// 分割禁止文字 != ぶら下げ文字、ぽい。厳守すれば普通に追い出される
	{a: [
		{ch: '…',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: '…',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: '☀',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '☂',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},
	], p_i: 3, p_ch: '☂', i: 4, ch: '春', ret: {cont: false, ins: 1 +1,},},
	{a: [	// 分割禁止
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: '…',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: '…',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '☂',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},
	], p_i: 3, p_ch: '☂', i: 4, ch: '春', ret: {cont: false, ins: 0 +1,},},
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: '☀',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: '…',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '…',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},
	], p_i: 3, p_ch: '…', i: 4, ch: '春', ret: {cont: false, ins: 1 +1,},},
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: '☀',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '…',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: '…',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},
	], p_i: 3, p_ch: '…', i: 4, ch: '…', ret: {cont: false, ins: 1 +1,},},
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: '☀',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: '…',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},
	], p_i: 3, p_ch: 'の', i: 4, ch: '…', ret: {cont: false, ins: 1 +1,},},
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: '☀',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: '…',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
		{ch: '…',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},
	], p_i: 3, p_ch: 'の', i: 4, ch: '…', ret: {cont: false, ins: 1 +1,},},

	// ぶら下げ＋末尾行末禁則は、行末禁則文字 != ぶら下げ文字、なので問題なし

	// 非ぶら下げ＋末尾行末禁則
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: '☀',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: '〈',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +4 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},
	], p_i: 4, p_ch: 'の', i: 5, ch: '春', ret: {cont: false, ins: 1 +1,},},
	{a: [	// 末尾行末禁則が続く場合
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: '『',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: '〈',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +4 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},
	], p_i: 4, p_ch: 'の', i: 5, ch: '春', ret: {cont: false, ins: 0 +1,},},
	{a: [	// 末尾行末禁則が続く場合＋ルビ
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: '『',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'ル',	elm: eRp, rect: new Rectangle(sx+0.5*w, sy +2 *h, w, h)},
		{ch: 'ル',	elm: eRt, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '〈',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +4 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +5 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},
	], p_i: 6, p_ch: 'の', i: 7, ch: '春', ret: {cont: false, ins: 2 +1,},},


])(`p_i:$p_i:$p_ch i:$i:$ch $ret`, ({a, i, ch: _, p_i, p_ch, ret})=> {
	expect(hyph.hyph_alg_bura(a, p_i, p_ch, i)).toStrictEqual(ret);
});

//MARK: ルビ文字と改行
it.each(<{
	a	: IChRect[];
	p_i	: number,
	p_ch: string,
	i	: number;	// i >= 2
	ch	: string,
	ret	: {cont: boolean, ins: number,};}[]>[
	//	字字（仮改行）ル（ル がルビ）
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'ル',	elm: eRp, rect: new Rectangle(sx-0.5*w, sy +0 *h, w, h)},
		{ch: 'ル',	elm: eRt, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 3, p_ch: '春', i: 4, ch: 'ル', ret: {cont: false, ins: 1 +1,},},
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: '〈',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},//末禁
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'ル',	elm: eRp, rect: new Rectangle(sx-0.5*w, sy +0 *h, w, h)},
		{ch: 'ル',	elm: eRt, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 3, p_ch: '春', i: 4, ch: 'ル', ret: {cont: false, ins: 0 +1,},},
	//	字ル（仮改行）字（ル がルビ）
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: 'ビ',	elm: eRp, rect: new Rectangle(sx+0.5*w, sy +3 *h, w, h)},
		{ch: 'ビ',	elm: eRt, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: '〉',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 3, p_ch: 'ビ', i: 5, ch: '〉', ret: {cont: false, ins: 1 +1,},},
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: '〈',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},//末禁
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: 'ビ',	elm: eRp, rect: new Rectangle(sx+0.5*w, sy +3 *h, w, h)},
		{ch: 'ビ',	elm: eRt, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: '〉',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 3, p_ch: 'ビ', i: 5, ch: '〉', ret: {cont: false, ins: 0 +1,},},
	//	字ル（仮改行）ル（ル がルビ）
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: 'ビ',	elm: eRp, rect: new Rectangle(sx+0.5*w, sy +3 *h, w, h)},
		{ch: 'ビ',	elm: eRt, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'ル',	elm: eRp, rect: new Rectangle(sx-0.5*w, sy +0 *h, w, h)},
		{ch: 'ル',	elm: eRt, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 3, p_ch: 'ビ', i: 5, ch: 'ル', ret: {cont: false, ins: 1 +1,},},
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: '〈',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},//末禁
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: 'ビ',	elm: eRp, rect: new Rectangle(sx+0.5*w, sy +3 *h, w, h)},
		{ch: 'ビ',	elm: eRt, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'ル',	elm: eRp, rect: new Rectangle(sx-0.5*w, sy +0 *h, w, h)},
		{ch: 'ル',	elm: eRt, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 3, p_ch: 'ビ', i: 5, ch: 'ル', ret: {cont: false, ins: 0 +1,},},
	//	ル字（仮改行）字（ル がルビ）
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'コ',	elm: eRp, rect: new Rectangle(sx+0.5*w, sy +2 *h, w, h)},
		{ch: 'コ',	elm: eRt, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '末',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: '頭',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 4, p_ch: '末', i: 5, ch: '頭', ret: {cont: false, ins: 1 +1,},},
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: '〈',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},//末禁
		{ch: 'コ',	elm: eRp, rect: new Rectangle(sx+0.5*w, sy +2 *h, w, h)},
		{ch: 'コ',	elm: eRt, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '末',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: '頭',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 4, p_ch: '末', i: 5, ch: '頭', ret: {cont: false, ins: 0 +1,},},
	//	ル字（仮改行）ル（ル がルビ）
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'コ',	elm: eRp, rect: new Rectangle(sx+0.5*w, sy +2 *h, w, h)},
		{ch: 'コ',	elm: eRt, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '末',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'ル',	elm: eRp, rect: new Rectangle(sx-0.5*w, sy +0 *h, w, h)},
		{ch: 'ル',	elm: eRt, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 4, p_ch: '末', i: 5, ch: 'ル', ret: {cont: false, ins: 1 +1,},},
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: '〈',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},//末禁
		{ch: 'コ',	elm: eRp, rect: new Rectangle(sx+0.5*w, sy +2 *h, w, h)},
		{ch: 'コ',	elm: eRt, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '末',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'ル',	elm: eRp, rect: new Rectangle(sx-0.5*w, sy +0 *h, w, h)},
		{ch: 'ル',	elm: eRt, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 4, p_ch: '末', i: 5, ch: 'ル', ret: {cont: false, ins: 0 +1,},},
	//	ルル（仮改行）字（ル がルビ）
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'コ',	elm: eRp, rect: new Rectangle(sx+0.5*w, sy +2 *h, w, h)},
		{ch: 'コ',	elm: eRt, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: 'ビ',	elm: eRp, rect: new Rectangle(sx+0.5*w, sy +3 *h, w, h)},
		{ch: 'ビ',	elm: eRt, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: '頭',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 4, p_ch: 'ビ', i: 6, ch: '頭', ret: {cont: false, ins: 1 +1,},},
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: '〈',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},//末禁
		{ch: 'コ',	elm: eRp, rect: new Rectangle(sx+0.5*w, sy +2 *h, w, h)},
		{ch: 'コ',	elm: eRt, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: 'ビ',	elm: eRp, rect: new Rectangle(sx+0.5*w, sy +3 *h, w, h)},
		{ch: 'ビ',	elm: eRt, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: '頭',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 4, p_ch: 'ビ', i: 6, ch: '頭', ret: {cont: false, ins: 0 +1,},},
	//	ルル（仮改行）ル（ル がルビ）
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'コ',	elm: eRp, rect: new Rectangle(sx+0.5*w, sy +2 *h, w, h)},
		{ch: 'コ',	elm: eRt, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: 'ビ',	elm: eRp, rect: new Rectangle(sx+0.5*w, sy +3 *h, w, h)},
		{ch: 'ビ',	elm: eRt, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'ル',	elm: eRp, rect: new Rectangle(sx-0.5*w, sy +0 *h, w, h)},
		{ch: 'ル',	elm: eRt, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 4, p_ch: 'ビ', i: 6, ch: 'ル', ret: {cont: false, ins: 1 +1,},},
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: '〈',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},//末禁
		{ch: 'コ',	elm: eRp, rect: new Rectangle(sx+0.5*w, sy +2 *h, w, h)},
		{ch: 'コ',	elm: eRt, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: 'ビ',	elm: eRp, rect: new Rectangle(sx+0.5*w, sy +3 *h, w, h)},
		{ch: 'ビ',	elm: eRt, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'ル',	elm: eRp, rect: new Rectangle(sx-0.5*w, sy +0 *h, w, h)},
		{ch: 'ル',	elm: eRt, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 4, p_ch: 'ビ', i: 6, ch: 'ル', ret: {cont: false, ins: 0 +1,},},

/*
	// 2024/06/30 複数文字ルビ
	{a: [
		{ch: '㍿',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'コ',	elm: eRp, rect: new Rectangle(sx+0.5*w, sy +2 *h, w, h)},
		{ch: '☀',  elm: eRt3, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '☁',  elm: eRt3, rect: new Rectangle(sx -0 *w, sy +2.1*h, w, h)},
		{ch: '☂',	elm: eRt3, rect: new Rectangle(sx -0 *w, sy +2.2*h, w, h)},
		{ch: '末',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: '頭',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 6, p_ch: '末', i: 7, ch: '頭', ret: {cont: false, ins: 1 +1,},},
*/

])(`p_i:$p_i:$p_ch i:$i:$ch $ret`, ({a, i, ch: _, p_i, p_ch, ret})=> {
	expect(hyph.hyph_alg_bura(a, p_i, p_ch, i)).toStrictEqual(ret);
});

//MARK: ぶら下げ&設定変更
// def行頭禁則 == defぶら下げ なので、初期値ではテストにならない。少し変えてテスト
it.each(<{
	a	: IChRect[];
	p_i	: number,
	p_ch: string,
	i	: number;	// i >= 2
	ch	: string,
	ret	: {cont: boolean, ins: number,};}[]>[
	// ぶら下げ＋行頭禁則（ぶら下げ）
	{a: [
		{ch: '☀',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		// (仮改行)
		{ch: 'ぁ',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},//ぶら
		{ch: '』',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},//頭禁
		{ch: '　',	elm, rect: new Rectangle(sx -1 *w, sy +2 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -1 *w, sy +3 *h, w, h)},
		{ch: 'ら',	elm, rect: new Rectangle(sx -1 *w, sy +4 *h, w, h)},
	], p_i: 3, p_ch: '春', i: 4, ch: 'ぁ', ret: {cont: false, ins: 1 +1,},},

	// ぶら下げx2 ＋(仮改行)＋ 行頭禁則 ＋ ぶら下げ -> 行頭あきらめる
	{a: [
		{ch: '☀',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'ぁ',	elm, rect: new Rectangle(sx -0 *w, sy +4 *h, w, h)},//ぶら
		{ch: 'ぃ',	elm, rect: new Rectangle(sx -0 *w, sy +5 *h, w, h)},//ぶら2
		// (仮改行)
		{ch: '』',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},//頭禁
		{ch: 'か',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},
		{ch: 'ら',	elm, rect: new Rectangle(sx -1 *w, sy +2 *h, w, h)},
	], p_i: 5, p_ch: 'ぃ', i: 6, ch: '』', ret: {cont: false, ins: 5 +1,},},

	// 非ぶら下げ ＋ ぶら下げ ＋(仮改行)＋ ぶら下げ ＋ 行頭禁則
	{a: [
		{ch: '☀',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		{ch: 'ぁ',	elm, rect: new Rectangle(sx -0 *w, sy +4 *h, w, h)},//ぶら
		// (仮改行)
		{ch: 'ぃ',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},//ぶら2
		{ch: '』',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},//頭禁
		{ch: 'か',	elm, rect: new Rectangle(sx -1 *w, sy +2 *h, w, h)},
		{ch: 'ら',	elm, rect: new Rectangle(sx -1 *w, sy +3 *h, w, h)},
	], p_i: 4, p_ch: 'ぁ', i: 5, ch: 'ぃ', ret: {cont: false, ins: 2 +1,},},

	// 非ぶら下げx2 ＋(仮改行)＋ ぶら下げx2 ＋ 行頭禁則
	{a: [
		{ch: '☀',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: '春',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},
		// (仮改行)
		{ch: 'ぁ',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},//ぶら
		{ch: 'ぃ',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},//ぶら2
		{ch: '』',	elm, rect: new Rectangle(sx -1 *w, sy +2 *h, w, h)},//頭禁
		{ch: 'か',	elm, rect: new Rectangle(sx -1 *w, sy +3 *h, w, h)},
		{ch: 'ら',	elm, rect: new Rectangle(sx -1 *w, sy +4 *h, w, h)},
	], p_i: 3, p_ch: '春', i: 4, ch: 'ぁ', ret: {cont: false, ins: 1 +1,},},

	// ぶら下げ ＋ 非ぶら下げ ＋(仮改行)
	{a: [
		{ch: '☀',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: 'ぁ',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},//ぶら
		{ch: '春',	elm, rect: new Rectangle(sx -0 *w, sy +4 *h, w, h)},
		// (仮改行)
		{ch: 'か',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
	], p_i: 4, p_ch: '春', i: 5, ch: 'か', ret: {cont: false, ins: 3 +1,},},
	// ぶら下げ ＋(仮改行)
	{a: [
		{ch: '☀',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		{ch: 'ぁ',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},//ぶら
		// (仮改行)
		{ch: '春',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},
	], p_i: 3, p_ch: 'ぁ', i: 4, ch: '春', ret: {cont: false, ins: 1 +1,},},
	// (仮改行)＋ ぶら下げ
	{a: [
		{ch: '☀',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},
		// (仮改行)
		{ch: 'ぁ',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},//ぶら
		{ch: '春',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},
		{ch: 'か',	elm, rect: new Rectangle(sx -1 *w, sy +2 *h, w, h)},
	], p_i: 2, p_ch: 'の', i: 3, ch: 'ぁ', ret: {cont: false, ins: 0 +1,},},

	// 非ぶら下げx2 ＋(仮改行)＋ 行頭禁則（ぶら下げ）
	{a: [
		{ch: '☀',	elm, rect: new Rectangle(sx -0 *w, sy +0 *h, w, h)},
		{ch: 'こ',	elm, rect: new Rectangle(sx -0 *w, sy +1 *h, w, h)},
		{ch: 'の',	elm, rect: new Rectangle(sx -0 *w, sy +2 *h, w, h)},//非ぶ
		{ch: '春',	elm, rect: new Rectangle(sx -0 *w, sy +3 *h, w, h)},//非ぶ
		// (仮改行)
		{ch: 'ゞ',	elm, rect: new Rectangle(sx -1 *w, sy +0 *h, w, h)},//頭禁
		{ch: 'か',	elm, rect: new Rectangle(sx -1 *w, sy +1 *h, w, h)},
		{ch: 'ら',	elm, rect: new Rectangle(sx -1 *w, sy +2 *h, w, h)},
		{ch: '☀',	elm, rect: new Rectangle(sx -1 *w, sy +3 *h, w, h)},
	], p_i: 3, p_ch: '春', i: 4, ch: 'ゞ', ret: {cont: false, ins: 1 +1,},},

])(`p_i:$p_i:$p_ch i:$i:$ch $ret`, ({a, i, ch: _, p_i, p_ch, ret})=> {
	hyph.lay({kinsoku_bura: 'ぁぃぅぇぉ'});
	expect(hyph.ぶら下げ).toBe('ぁぃぅぇぉ');

	expect(hyph.hyph_alg_bura(a, p_i, p_ch, i)).toStrictEqual(ret);

});

it('ぶら下げと行末禁則の重複1', ()=> {	// 禁則の競合（ぶら下げ と 行末禁則 の両方に含まれる文字があってはならない）
	hyph.lay({kinsoku_sol: '☀'});
	expect(hyph.行頭禁則).toBe('☀');

	hyph.lay({kinsoku_eol: '【'});
	expect(hyph.行末禁則).toBe('【');

	expect(()=> hyph.lay({kinsoku_eol: '】'}))
	.toThrow(`禁則の競合があります。文字 】 がぶら下げ と 行末禁則 の両方に含まれます`);
	
});
it('ぶら下げと行末禁則の重複2', ()=> {	// 禁則の競合（ぶら下げ と 行末禁則 の両方に含まれる文字があってはならない）
	hyph.lay({kinsoku_dns: '☂'});
	expect(hyph.分割禁止).toBe('☂');

	hyph.lay({kinsoku_bura: '】'});
	expect(hyph.ぶら下げ).toBe('】');

	expect(()=> hyph.lay({kinsoku_bura: '【'}))
	.toThrow(`禁則の競合があります。文字 【 がぶら下げ と 行末禁則 の両方に含まれます`);
	
});

it('ぶら下げと分割禁止の重複1', ()=> {	// 禁則の競合（ぶら下げ と 分割禁止 の両方に含まれる文字があってはならない）
	hyph.lay({kinsoku_dns: '☀'});
	expect(hyph.分割禁止).toBe('☀');

	expect(()=> hyph.lay({kinsoku_dns: '】'}))
	.toThrow(`禁則の競合があります。文字 】 がぶら下げ と 分割禁止 の両方に含まれます`);
	
});
it('ぶら下げと分割禁止の重複2', ()=> {	// 禁則の競合（ぶら下げ と 分割禁止 の両方に含まれる文字があってはならない）
	hyph.lay({kinsoku_bura: '☂'});
	expect(hyph.ぶら下げ).toBe('☂');

	expect(()=> hyph.lay({kinsoku_bura: '─'}))
	.toThrow(`禁則の競合があります。文字 ─ がぶら下げ と 分割禁止 の両方に含まれます`);
	
});
