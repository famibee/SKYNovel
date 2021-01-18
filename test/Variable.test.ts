/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import assert = require('power-assert');

import {Variable} from '../core/src/sn/Variable';

import {Config} from '../core/src/sn/Config';
import {SysNode} from '../core/src/sn/SysNode';
import {IHTag} from '../core/src/sn/CmnInterface';

context('class Variable', ()=>{
	let	val	= null;
	beforeEach(()=> {
		const cfg = new Config(new SysNode({}, {cur: 'test/', crypto: false, dip: ''}), ()=> {}, {
			search	: ["mat"],
		});
		const hTag: IHTag = {};
		val = new Variable(cfg, hTag);
	});

	describe('Tst', ()=> {
		it('getVal_0', ()=> {
			assert.equal(val.getVal('mp:fn', 'def'), 'def');	// 516
		});
		it('getVal_1', ()=> {
			val.setVal_Nochk('mp', 'fn', 'うひひ');
			assert.equal(val.getVal('mp:fn', 'def'), 'うひひ');
		});
		it('getVal_2', ()=> {
			val.setVal_Nochk('tmp', 'ぎょへー', 'もきゅ');
			assert.equal(val.getVal('tmp:ぎょへー', 'def'), 'もきゅ');
		});
		it('getVal_3', ()=> {
			val.setVal_Nochk('tmp', 'hD.数値', '1.20');
			assert.equal(val.getVal('tmp:hD.数値', 'def'), '1.20');
		});
		it('getVal_4', ()=> {
			val.setVal_Nochk('tmp', 'one_n', 1);
			assert.equal(val.getVal('tmp:one_n', 'def'), 1);
		});
		it('getVal_4', ()=> {
			val.setVal_Nochk('sys', '_album.img.渡り廊下・桜昼', true);
			assert.equal(val.getVal('sys:_album.img.渡り廊下・桜昼', 'def'), true);
		});

		it('getVal_10_fnc', ()=> {
			let c = 0;
			val.defTmp('counter', ()=> ++c);

			assert.equal(val.getVal('counter', 'def'), 1);
			assert.equal(val.getVal('counter', 'def'), 2);
			assert.equal(val.getVal('counter', 'def'), 3);
		});

		it('getVal_20_json', ()=> {
			val.setVal_Nochk('mp', 'const.sn.sound.codecs', '{"aac": true, "flac": false}');

			assert.equal(val.getVal('mp:const.sn.sound.codecs', 'def'), '{"aac": true, "flac": false}');
			assert.equal(val.getVal('mp:const.sn.sound.codecs.aac', 'def'), true);
			assert.equal(val.getVal('mp:const.sn.sound.codecs.aac0', 'def'), 'def');
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

			assert.equal(val.getVal('tmp:const.db', 'def'), `
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
			assert.equal(val.getVal('tmp:const.db.紀子', 'def'),
			`{"fn":"nori","col":"lightskyblue"}`);
			assert.equal(val.getVal('tmp:const.db["紀子"]', 'def'),
			`{"fn":"nori","col":"lightskyblue"}`);
			assert.equal(val.getVal('tmp:const.db.紀子0', 'def'), 'def');
			assert.equal(val.getVal('tmp:const.db.梨香', 'def'), 'def');
			assert.equal(val.getVal('tmp:const.db.紀子.fn', 'def'), 'nori');
			assert.equal(val.getVal('tmp:const.db.紀子.fn0', 'def'), 'def');
		});
		it('getVal_22_json 不具合2021/01/18', ()=> {
			val.setVal_Nochk('mp', 'const.sn.sound', 'true');
			val.setVal_Nochk('mp', 'const.sn.sound.codecs', '{"aac": true, "flac": false}');

			assert.equal(val.getVal('mp:const.sn.sound.codecs', 'def'), '{"aac": true, "flac": false}');
			assert.equal(val.getVal('mp:const.sn.sound.codecs.aac', 'def'), true);
			assert.equal(val.getVal('mp:const.sn.sound.codecs.aac0', 'def'), 'def');

			assert.equal(val.getVal('mp:const.sn.sound', 'def'), true);
				// TypeError: Cannot use 'in' operator to search for 'codecs' in true
		});

	});

});
