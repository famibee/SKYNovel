/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import assert = require('power-assert');

import {Areas} from '../src/sn/Areas';

context('class AreasTest', ()=>{
	let areas;
	beforeEach(() => {
		areas = new Areas();
	});
	describe('Tst', () => {
		it('test_record_erase_0', ()=> {
			assert.equal(areas.search(-1), false);
			assert.equal(areas.search(0), false);
			assert.equal(areas.search(1), false);
			assert.equal(areas.count, 0);

			areas.record(0);
			assert.equal(areas.search(-1), false);
			assert.equal(areas.search(0), true);
			assert.equal(areas.search(1), false);
			assert.equal(areas.count, 1);

			areas.record(0);
			assert.equal(areas.search(-1), false);
			assert.equal(areas.search(0), true);
			assert.equal(areas.search(1), false);
			assert.equal(areas.count, 1);

			areas.erase(0);
			assert.equal(areas.search(-1), false);
			assert.equal(areas.search(0), false);
			assert.equal(areas.search(1), false);
			assert.equal(areas.count, 0);
		});

		it('test_record', ()=> {
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), false);
			assert.equal(areas.search(10), false);
			assert.equal(areas.search(11), false);
			assert.equal(areas.search(12), false);
			assert.equal(areas.search(13), false);
			assert.equal(areas.search(14), false);
			assert.equal(areas.count, 0);

			areas.record(10);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), false);
			assert.equal(areas.search(10), true);
			assert.equal(areas.search(11), false);
			assert.equal(areas.search(12), false);
			assert.equal(areas.search(13), false);
			assert.equal(areas.search(14), false);
			assert.equal(areas.count, 1);

			areas.record(12);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), false);
			assert.equal(areas.search(10), true);
			assert.equal(areas.search(11), false);
			assert.equal(areas.search(12), true);
			assert.equal(areas.search(13), false);
			assert.equal(areas.search(14), false);
			assert.equal(areas.count, 2);

			areas.record(11);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), false);
			assert.equal(areas.search(10), true);
			assert.equal(areas.search(11), true);
			assert.equal(areas.search(12), true);
			assert.equal(areas.search(13), false);
			assert.equal(areas.search(14), false);
			assert.equal(areas.count, 1);

			areas.record(13);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), false);
			assert.equal(areas.search(10), true);
			assert.equal(areas.search(11), true);
			assert.equal(areas.search(12), true);
			assert.equal(areas.search(13), true);
			assert.equal(areas.search(14), false);
			assert.equal(areas.count, 1);

			areas.record(9);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), true);
			assert.equal(areas.search(10), true);
			assert.equal(areas.search(11), true);
			assert.equal(areas.search(12), true);
			assert.equal(areas.search(13), true);
			assert.equal(areas.search(14), false);
			assert.equal(areas.count, 1);
/*
			import flash.utils.ByteArray;
			const ba:ByteArray = new ByteArray();
			ba.writeObject(areas);
			ba.position = 0;
			const o2:* = ba.readObject();
			assert.equal(o2 is Areas, true);
			
			assert.equal(o2.search(8), false);
			assert.equal(o2.search(9), true);
			assert.equal(o2.search(10), true);
			assert.equal(o2.search(11), true);
			assert.equal(o2.search(12), true);
			assert.equal(o2.search(13), true);
			assert.equal(o2.search(14), false);
			assert.equal(o2.count, 1);
*/
		});

		it('test_replace', ()=> {
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), false);
			assert.equal(areas.search(10), false);
			assert.equal(areas.search(11), false);
			assert.equal(areas.search(12), false);
			assert.equal(areas.count, 0);

			areas.record(9);
			areas.record(10);
			areas.record(11);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), true);
			assert.equal(areas.search(10), true);
			assert.equal(areas.search(11), true);
			assert.equal(areas.search(12), false);
			assert.equal(areas.count, 1);

			areas.record(9);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), true);
			assert.equal(areas.search(10), true);
			assert.equal(areas.search(11), true);
			assert.equal(areas.search(12), false);
			assert.equal(areas.count, 1);

			areas.record(10);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), true);
			assert.equal(areas.search(10), true);
			assert.equal(areas.search(11), true);
			assert.equal(areas.search(12), false);
			assert.equal(areas.count, 1);

			areas.record(11);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), true);
			assert.equal(areas.search(10), true);
			assert.equal(areas.search(11), true);
			assert.equal(areas.search(12), false);
			assert.equal(areas.count, 1);
		});

		it('test_erase_7_8_14', ()=> {
			areas.record(9);
			areas.record(10);
			areas.record(11);
			areas.record(12);
			areas.record(13);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), true);
			assert.equal(areas.search(10), true);
			assert.equal(areas.search(11), true);
			assert.equal(areas.search(12), true);
			assert.equal(areas.search(13), true);
			assert.equal(areas.search(14), false);
			assert.equal(areas.count, 1);

			areas.erase(7);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), true);
			assert.equal(areas.search(10), true);
			assert.equal(areas.search(11), true);
			assert.equal(areas.search(12), true);
			assert.equal(areas.search(13), true);
			assert.equal(areas.search(14), false);
			assert.equal(areas.count, 1);

			areas.erase(8);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), true);
			assert.equal(areas.search(10), true);
			assert.equal(areas.search(11), true);
			assert.equal(areas.search(12), true);
			assert.equal(areas.search(13), true);
			assert.equal(areas.search(14), false);
			assert.equal(areas.count, 1);

			areas.erase(14);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), true);
			assert.equal(areas.search(10), true);
			assert.equal(areas.search(11), true);
			assert.equal(areas.search(12), true);
			assert.equal(areas.search(13), true);
			assert.equal(areas.search(14), false);
			assert.equal(areas.count, 1);
		});
		it('test_erase_9', ()=> {
			areas.record(9);
			areas.record(10);
			areas.record(11);
			areas.record(12);
			areas.record(13);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), true);
			assert.equal(areas.search(10), true);
			assert.equal(areas.search(11), true);
			assert.equal(areas.search(12), true);
			assert.equal(areas.search(13), true);
			assert.equal(areas.search(14), false);
			assert.equal(areas.count, 1);

			areas.erase(9);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), false);
			assert.equal(areas.search(10), true);
			assert.equal(areas.search(11), true);
			assert.equal(areas.search(12), true);
			assert.equal(areas.search(13), true);
			assert.equal(areas.search(14), false);
			assert.equal(areas.count, 1);
		});
		it('test_erase_10_9', ()=> {
			areas.record(9);
			areas.record(10);
			areas.record(11);
			areas.record(12);
			areas.record(13);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), true);
			assert.equal(areas.search(10), true);
			assert.equal(areas.search(11), true);
			assert.equal(areas.search(12), true);
			assert.equal(areas.search(13), true);
			assert.equal(areas.search(14), false);
			assert.equal(areas.count, 1);

			areas.erase(10);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), true);
			assert.equal(areas.search(10), false);
			assert.equal(areas.search(11), true);
			assert.equal(areas.search(12), true);
			assert.equal(areas.search(13), true);
			assert.equal(areas.search(14), false);
			assert.equal(areas.count, 2);

			areas.erase(9);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), false);
			assert.equal(areas.search(10), false);
			assert.equal(areas.search(11), true);
			assert.equal(areas.search(12), true);
			assert.equal(areas.search(13), true);
			assert.equal(areas.search(14), false);
			assert.equal(areas.count, 1);
		});
		it('test_erase_12_13', ()=> {
			areas.record(9);
			areas.record(10);
			areas.record(11);
			areas.record(12);
			areas.record(13);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), true);
			assert.equal(areas.search(10), true);
			assert.equal(areas.search(11), true);
			assert.equal(areas.search(12), true);
			assert.equal(areas.search(13), true);
			assert.equal(areas.search(14), false);
			assert.equal(areas.count, 1);

			areas.erase(12);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), true);
			assert.equal(areas.search(10), true);
			assert.equal(areas.search(11), true);
			assert.equal(areas.search(12), false);
			assert.equal(areas.search(13), true);
			assert.equal(areas.search(14), false);
			assert.equal(areas.count, 2);

			areas.erase(13);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), true);
			assert.equal(areas.search(10), true);
			assert.equal(areas.search(11), true);
			assert.equal(areas.search(12), false);
			assert.equal(areas.search(13), false);
			assert.equal(areas.search(14), false);
			assert.equal(areas.count, 1);
		});
		it('test_erase_13', ()=> {
			areas.record(9);
			areas.record(10);
			areas.record(11);
			areas.record(12);
			areas.record(13);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), true);
			assert.equal(areas.search(10), true);
			assert.equal(areas.search(11), true);
			assert.equal(areas.search(12), true);
			assert.equal(areas.search(13), true);
			assert.equal(areas.search(14), false);
			assert.equal(areas.count, 1);

			areas.erase(13);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), true);
			assert.equal(areas.search(10), true);
			assert.equal(areas.search(11), true);
			assert.equal(areas.search(12), true);
			assert.equal(areas.search(13), false);
			assert.equal(areas.search(14), false);
			assert.equal(areas.count, 1);
		});
		it('test_erase_14', ()=> {
			areas.record(9);
			areas.record(10);
			areas.record(11);
			areas.record(12);
			areas.record(13);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), true);
			assert.equal(areas.search(10), true);
			assert.equal(areas.search(11), true);
			assert.equal(areas.search(12), true);
			assert.equal(areas.search(13), true);
			assert.equal(areas.search(14), false);
			assert.equal(areas.count, 1);

			areas.erase(14);
			assert.equal(areas.search(8), false);
			assert.equal(areas.search(9), true);
			assert.equal(areas.search(10), true);
			assert.equal(areas.search(11), true);
			assert.equal(areas.search(12), true);
			assert.equal(areas.search(13), true);
			assert.equal(areas.search(14), false);
			assert.equal(areas.count, 1);
		});
	});

});
