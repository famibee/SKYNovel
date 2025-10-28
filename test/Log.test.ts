/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2025-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {IHTag} from '../src/sn/Grammar';
import {Log} from '../src/sn/Log';
import {SysTest} from './SysTest';
import {Config} from '../src/sn/Config';
import {Variable} from '../src/sn/Variable';
import {ValTest} from './ValTest';
import {GlobalRegistrator} from '@happy-dom/global-registrator';
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (! globalThis.document) GlobalRegistrator.register();


let	cfg	: Config;
let	val	: Variable;
let hTag: IHTag;

let	log	: Log;

let out_ch = '';

beforeEach(async ()=> {
	const sys = new SysTest({}, {cur: 'test/', crypto: false, dip: ''});
	cfg = await Config.generate(sys);
	val = new Variable(cfg, <IHTag>{});

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	hTag = Object.create(null);	// タグ処理辞書

	log = new Log(cfg.oCfg, hTag, val);

	out_ch = '';
	hTag.ch = hArg=> {
		out_ch += hArg.text ?? '';
		if (hArg.record) log.recText(out_ch);
		return false;
	};
});

it('hTag', ()=> {	// タグ登録
	expect(hTag).toHaveProperty('rec_ch', expect.any(Function));
	expect(hTag).toHaveProperty('rec_r', expect.any(Function));
	expect(hTag).toHaveProperty('reset_rec', expect.any(Function));
});

it('defTmp', ()=> {	// 組み込み変数登録
	const val2 = new ValTest;
	const fnc = val2.defTmp = jest.fn();

	new Log(cfg.oCfg, hTag, val2);

	// fncが呼ばれたか
	expect(fnc).toHaveBeenCalledWith(
		'const.sn.log.json',
		expect.any(Function),
	);
});

it('recText', ()=> {
	expect(val.getVal('save:const.sn.sLog', 'def'))
	.toBe('[{"text":""}]');
	expect(val.getVal('const.sn.log.json', 'def'))
	.toBe('[{"text":""}]');


	log.recText('Tucker and Dale vs Evil');

	expect(val.getVal('save:const.sn.sLog', 'def'))
	.toBe('[{"text":"Tucker and Dale vs Evil"}]');
	expect(val.getVal('const.sn.log.json', 'def'))
	.toBe('[{"text":"Tucker and Dale vs Evil"}]');


	log.recText('タッカーとデイル 史上最悪にツイてないヤツら');

	expect(val.getVal('save:const.sn.sLog', 'def'))
	.toBe('[{"text":"タッカーとデイル 史上最悪にツイてないヤツら"}]');
	expect(val.getVal('const.sn.log.json', 'def'))
	.toBe('[{"text":"タッカーとデイル 史上最悪にツイてないヤツら"}]');


	log.recText('');

	expect(val.getVal('save:const.sn.sLog', 'def'))
	.toBe('[{"text":""}]');
	expect(val.getVal('const.sn.log.json', 'def'))
	.toBe('[{"text":""}]');
});

it('rec_ch', ()=> {
	hTag.rec_ch({text: '', record: false, name: '😈'});

	expect(out_ch).toBe('');
	expect(val.getVal('save:const.sn.sLog', 'def'))
	.toBe('[{"text":"","record":false,"name":"😈"}]');
	expect(val.getVal('const.sn.log.json', 'def'))
	.toBe('[{"text":"","record":false,"name":"😈"}]');


	hTag.rec_ch({text: '👺', name: '👼', record: false});

	expect(out_ch).toBe('👺');
	expect(val.getVal('save:const.sn.sLog', 'def'))
	.toBe('[{"text":"👺","name":"👼","record":false}]');
	expect(val.getVal('const.sn.log.json', 'def'))
	.toBe('[{"text":"👺","name":"👼","record":false}]');


	hTag.rec_ch({text: '🎃'});

	expect(out_ch).toBe('👺🎃');
	expect(val.getVal('save:const.sn.sLog', 'def'))
	.toBe('[{"text":"👺🎃"}]');
	expect(val.getVal('const.sn.log.json', 'def'))
	.toBe('[{"text":"👺🎃"}]');


	hTag.rec_ch({text: '🎅', record: true, name: '😎'});
	hTag.rec_ch({text: '⛄'});

	expect(out_ch).toBe('👺🎃🎅⛄');
	expect(val.getVal('save:const.sn.sLog', 'def'))
	.toBe('[{"text":"👺🎃🎅⛄"}]');
	expect(val.getVal('const.sn.log.json', 'def'))
	.toBe('[{"text":"👺🎃🎅⛄"}]');


	// JSON 的に正しいか（文字列比較で弾けるが、一応やっとく）
	expect(JSON.stringify(JSON.parse(String(
		val.getVal('const.sn.log.json', 'def')
	))))
	.toBe('[{"text":"👺🎃🎅⛄"}]');
});
it('rec_ch_badChar', ()=> {
	hTag.rec_ch({name: '👼', text: '"'});

	expect(out_ch).toBe('"');
	expect(val.getVal('save:const.sn.sLog', 'def'))
	.toBe('[{"name":"👼","text":"\\""}]');
	expect(val.getVal('const.sn.log.json', 'def'))
	.toBe('[{"name":"👼","text":"\\""}]');


	hTag.rec_ch({text: '\\', name: '😈'});

	expect(out_ch).toBe('"\\');
	expect(val.getVal('save:const.sn.sLog', 'def'))
	.toBe('[{"text":"\\"\\\\","name":"😈"}]');
	expect(val.getVal('const.sn.log.json', 'def'))
	.toBe('[{"text":"\\"\\\\","name":"😈"}]');
});
it('rec_ch_other_arg', ()=> {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
	hTag.rec_ch(<any>{name:'オーメン', col: '0xD4C', v: true});

	expect(out_ch).toBe('');
	expect(val.getVal('save:const.sn.sLog', 'def'))
	.toBe('[{"name":"オーメン","col":"0xD4C","v":true,"text":""}]');
	expect(val.getVal('const.sn.log.json', 'def'))
	.toBe('[{"name":"オーメン","col":"0xD4C","v":true,"text":""}]');
});

it('rec_r', ()=> {
	hTag.rec_r({});

	expect(out_ch).toBe('[r]');
	expect(val.getVal('save:const.sn.sLog', 'def'))
	.toBe('[{"text":"[r]"}]');
	expect(val.getVal('const.sn.log.json', 'def'))
	.toBe('[{"text":"[r]"}]');


	hTag.rec_ch({text: '👺', visible: false, name: '😎'});

	expect(out_ch).toBe('[r]👺');
	expect(val.getVal('save:const.sn.sLog', 'def'))
	.toBe('[{"text":"[r]👺","visible":false,"name":"😎"}]');
	expect(val.getVal('const.sn.log.json', 'def'))
	.toBe('[{"text":"[r]👺","visible":false,"name":"😎"}]');


	hTag.rec_r({});

	expect(out_ch).toBe('[r]👺[r]');
	expect(val.getVal('save:const.sn.sLog', 'def'))
	.toBe('[{"text":"[r]👺[r]"}]');
	expect(val.getVal('const.sn.log.json', 'def'))
	.toBe('[{"text":"[r]👺[r]"}]');


	// JSON 的に正しいか（文字列比較で弾けるが、一応やっとく）
	expect(JSON.stringify(JSON.parse(String(
		val.getVal('const.sn.log.json', 'def')
	))))
	.toBe('[{"text":"[r]👺[r]"}]');
});

it('reset_rec', ()=> {
	expect(val.getVal('save:const.sn.sLog', 'def'))
	.toBe('[{"text":""}]');
	expect(val.getVal('const.sn.log.json', 'def'))
	.toBe('[{"text":""}]');


	hTag.reset_rec({text: 'タッカーとデイル 史上最悪にツイてないヤツら'});

	expect(val.getVal('save:const.sn.sLog', 'def'))
	.toBe('[{"text":"タッカーとデイル 史上最悪にツイてないヤツら"}]');
	expect(val.getVal('const.sn.log.json', 'def'))
	.toBe('[{"text":"タッカーとデイル 史上最悪にツイてないヤツら"}]');


	hTag.reset_rec({});

	expect(val.getVal('save:const.sn.sLog', 'def'))
	.toBe('[{"text":""}]');
	expect(val.getVal('const.sn.log.json', 'def'))
	.toBe('[{"text":""}]');


	hTag.reset_rec({text: '"'});

	expect(val.getVal('save:const.sn.sLog', 'def'))
	.toBe('[{"text":"\\""}]');
	expect(val.getVal('const.sn.log.json', 'def'))
	.toBe('[{"text":"\\""}]');
});

it('pagebreak', ()=> {
	log.recText('悪魔のいけにえ');

	expect(val.getVal('save:const.sn.sLog', 'def'))
	.toBe('[{"text":"悪魔のいけにえ"}]');
	expect(val.getVal('const.sn.log.json', 'def'))
	.toBe('[{"text":"悪魔のいけにえ"}]');


	log.pagebreak();

	expect(val.getVal('save:const.sn.sLog', 'def'))
	.toBe('[{"text":"悪魔のいけにえ"}]');
	expect(val.getVal('const.sn.log.json', 'def'))
	.toBe('[{"text":"悪魔のいけにえ"},{"text":""}]');


	log.recText('レザーフェイス一家の逆襲');

	expect(val.getVal('save:const.sn.sLog', 'def'))
	.toBe('[{"text":"悪魔のいけにえ"},{"text":"レザーフェイス一家の逆襲"}]');
	expect(val.getVal('const.sn.log.json', 'def'))
	.toBe('[{"text":"悪魔のいけにえ"},{"text":"レザーフェイス一家の逆襲"}]');


	log.pagebreak();

	expect(val.getVal('save:const.sn.sLog', 'def'))
	.toBe('[{"text":"悪魔のいけにえ"},{"text":"レザーフェイス一家の逆襲"}]');
	expect(val.getVal('const.sn.log.json', 'def'))
	.toBe('[{"text":"悪魔のいけにえ"},{"text":"レザーフェイス一家の逆襲"},{"text":""}]');
});

it('playback', ()=> {
	log.recText('ファイナル・デスティネーション');
	val.setVal_Nochk('save', 'const.sn.sLog', '[{"text":"👺🎃🎅⛄"}]');

	expect(val.getVal('save:const.sn.sLog', 'def'))
	.toBe('[{"text":"👺🎃🎅⛄"}]');
	expect(val.getVal('const.sn.log.json', 'def'))
	.toBe('[{"text":"ファイナル・デスティネーション"}]');	// こっちはまだ


	log.playback();

	expect(val.getVal('save:const.sn.sLog', 'def'))
	.toBe('[{"text":"👺🎃🎅⛄"}]');
	expect(val.getVal('const.sn.log.json', 'def'))
	.toBe('[{"text":"👺🎃🎅⛄"},{"text":""}]');

});
