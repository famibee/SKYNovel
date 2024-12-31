/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Variable} from '../src/sn/Variable';
import {Config} from '../src/sn/Config';
import {SysTest} from './SysTest';


let	val	: Variable;
beforeEach(async ()=> {
	const sys = new SysTest({}, {cur: 'test/', crypto: false, dip: ''});
	const cfg = await Config.generate(sys);

	val = new Variable(cfg, {});
});

it('getVal_0', ()=> {
	expect(val.getVal('mp:fn', 'def')).toBe('def');	// 516
});
it('getVal_1', ()=> {
	val.setVal_Nochk('mp', 'fn', 'うひひ');
	expect(val.getVal('mp:fn', 'def')).toBe('うひひ');
});
it('getVal_2', ()=> {
	val.setVal_Nochk('tmp', 'ぎょへー', 'もきゅ');
	expect(val.getVal('tmp:ぎょへー', 'def')).toBe('もきゅ');
});
it('getVal_3', ()=> {
	val.setVal_Nochk('tmp', 'hD.数値', '1.20');
	expect(val.getVal('tmp:hD.数値', 'def')).toBe(1.20);
});
it('getVal_4', ()=> {
	val.setVal_Nochk('tmp', 'one_n', 1);
	expect(val.getVal('tmp:one_n', 'def')).toBe(1);
});
it('getVal_4', ()=> {
	val.setVal_Nochk('sys', '_album.img.渡り廊下・桜昼', true);
	expect(val.getVal('sys:_album.img.渡り廊下・桜昼', 'def')).toBe(true);
});

it('getVal_10_fnc', ()=> {
	let c = 0;
	val.defTmp('counter', ()=> ++c);

	expect(val.getVal('counter', 'def')).toBe(1);
	expect(val.getVal('counter', 'def')).toBe(2);
	expect(val.getVal('counter', 'def')).toBe(3);
});

it('getVal_20_json', ()=> {
	val.setVal_Nochk('mp', 'const.sn.sound.codecs', '{"aac": true, "flac": false}');

	expect(val.getVal('mp:const.sn.sound.codecs', 'def')).toBe('{"aac": true, "flac": false}');
	expect(val.getVal('mp:const.sn.sound.codecs.aac', 'def')).toBe(true);
	expect(val.getVal('mp:const.sn.sound.codecs.aac0', 'def')).toBe('def');
});
it('getVal_21_json', ()=> {
	val.setVal_Nochk('tmp', 'const.db', `
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

	expect(val.getVal('tmp:const.db', 'def')).toBe(`
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
	expect(val.getVal('tmp:const.db.紀子', 'def')).toBe(`{"fn":"nori","col":"lightskyblue"}`);
	expect(val.getVal('tmp:const.db["紀子"]', 'def')).toBe(`{"fn":"nori","col":"lightskyblue"}`);
	expect(val.getVal('tmp:const.db.紀子0', 'def')).toBe('def');
	expect(val.getVal('tmp:const.db.梨香', 'def')).toBe('def');
	expect(val.getVal('tmp:const.db.紀子.fn', 'def')).toBe('nori');
	expect(val.getVal('tmp:const.db.紀子.fn0', 'def')).toBe('def');
});
it('getVal_22_json 不具合2021/01/18', ()=> {
	val.setVal_Nochk('mp', 'const.sn.sound', 'true');
	val.setVal_Nochk('mp', 'const.sn.sound.codecs', '{"aac": true, "flac": false}');

	expect(val.getVal('mp:const.sn.sound.codecs', 'def')).toBe('{"aac": true, "flac": false}');
	expect(val.getVal('mp:const.sn.sound.codecs.aac', 'def')).toBe(true);
	expect(val.getVal('mp:const.sn.sound.codecs.aac0', 'def')).toBe('def');

	expect(val.getVal('mp:const.sn.sound', 'def')).toBe(true);
		// TypeError: Cannot use 'in' operator to search for 'codecs' in true
});
