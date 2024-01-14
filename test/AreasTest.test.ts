/* ***** BEGIN LICENSE BLOCK *****
Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Areas} from '../src/sn/Areas';

/*
let startTime = 0;	// 処理時間計測
beforeAll(()=> startTime = performance.now());
afterAll(()=> {
	console.log('Time : ' + (performance.now() - startTime));
});
*/

let areas: Areas;
beforeEach(()=> {
	areas = new Areas;
});

it('test_record_erase_0', ()=> {
	expect(areas.search(-1)).toBe(false);
	expect(areas.search(0)).toBe(false);
	expect(areas.search(1)).toBe(false);
	expect(areas.count).toBe(0);

	areas.record(0);
	expect(areas.search(-1)).toBe(false);
	expect(areas.search(0)).toBe(true);
	expect(areas.search(1)).toBe(false);
	expect(areas.count).toBe(1);

	areas.record(0);
	expect(areas.search(-1)).toBe(false);
	expect(areas.search(0)).toBe(true);
	expect(areas.search(1)).toBe(false);
	expect(areas.count).toBe(1);

	areas.erase(0);
	expect(areas.search(-1)).toBe(false);
	expect(areas.search(0)).toBe(false);
	expect(areas.search(1)).toBe(false);
	expect(areas.count).toBe(0);

	expect(areas.toString()).toBe('');
});

it('test_record', ()=> {
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(false);
	expect(areas.search(10)).toBe(false);
	expect(areas.search(11)).toBe(false);
	expect(areas.search(12)).toBe(false);
	expect(areas.search(13)).toBe(false);
	expect(areas.search(14)).toBe(false);
	expect(areas.count).toBe(0);

	areas.record(10);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(false);
	expect(areas.search(10)).toBe(true);
	expect(areas.search(11)).toBe(false);
	expect(areas.search(12)).toBe(false);
	expect(areas.search(13)).toBe(false);
	expect(areas.search(14)).toBe(false);
	expect(areas.count).toBe(1);

	areas.record(12);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(false);
	expect(areas.search(10)).toBe(true);
	expect(areas.search(11)).toBe(false);
	expect(areas.search(12)).toBe(true);
	expect(areas.search(13)).toBe(false);
	expect(areas.search(14)).toBe(false);
	expect(areas.count).toBe(2);

	areas.record(11);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(false);
	expect(areas.search(10)).toBe(true);
	expect(areas.search(11)).toBe(true);
	expect(areas.search(12)).toBe(true);
	expect(areas.search(13)).toBe(false);
	expect(areas.search(14)).toBe(false);
	expect(areas.count).toBe(1);

	areas.record(13);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(false);
	expect(areas.search(10)).toBe(true);
	expect(areas.search(11)).toBe(true);
	expect(areas.search(12)).toBe(true);
	expect(areas.search(13)).toBe(true);
	expect(areas.search(14)).toBe(false);
	expect(areas.count).toBe(1);

	areas.record(9);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(true);
	expect(areas.search(10)).toBe(true);
	expect(areas.search(11)).toBe(true);
	expect(areas.search(12)).toBe(true);
	expect(areas.search(13)).toBe(true);
	expect(areas.search(14)).toBe(false);
	expect(areas.count).toBe(1);

	expect(areas.toString()).toBe(',9~13');
/*
	import flash.utils.ByteArray;
	const ba:ByteArray = new ByteArray;
	ba.writeObject(areas);
	ba.position = 0;
	const o2:* = ba.readObject();
	expect(o2 is Areas).toBe(true);

	expect(o2.search(8)).toBe(false);
	expect(o2.search(9)).toBe(true);
	expect(o2.search(10)).toBe(true);
	expect(o2.search(11)).toBe(true);
	expect(o2.search(12)).toBe(true);
	expect(o2.search(13)).toBe(true);
	expect(o2.search(14)).toBe(false);
	expect(o2.count).toBe(1);
*/
});

it('test_replace', ()=> {
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(false);
	expect(areas.search(10)).toBe(false);
	expect(areas.search(11)).toBe(false);
	expect(areas.search(12)).toBe(false);
	expect(areas.count).toBe(0);

	areas.record(9);
	areas.record(10);
	areas.record(11);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(true);
	expect(areas.search(10)).toBe(true);
	expect(areas.search(11)).toBe(true);
	expect(areas.search(12)).toBe(false);
	expect(areas.count).toBe(1);

	areas.record(9);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(true);
	expect(areas.search(10)).toBe(true);
	expect(areas.search(11)).toBe(true);
	expect(areas.search(12)).toBe(false);
	expect(areas.count).toBe(1);

	areas.record(10);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(true);
	expect(areas.search(10)).toBe(true);
	expect(areas.search(11)).toBe(true);
	expect(areas.search(12)).toBe(false);
	expect(areas.count).toBe(1);

	areas.record(11);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(true);
	expect(areas.search(10)).toBe(true);
	expect(areas.search(11)).toBe(true);
	expect(areas.search(12)).toBe(false);
	expect(areas.count).toBe(1);

	expect(areas.toString()).toBe(',9~11');
});

it('test_erase_7_8_14', ()=> {
	areas.record(9);
	areas.record(10);
	areas.record(11);
	areas.record(12);
	areas.record(13);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(true);
	expect(areas.search(10)).toBe(true);
	expect(areas.search(11)).toBe(true);
	expect(areas.search(12)).toBe(true);
	expect(areas.search(13)).toBe(true);
	expect(areas.search(14)).toBe(false);
	expect(areas.count).toBe(1);

	areas.erase(7);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(true);
	expect(areas.search(10)).toBe(true);
	expect(areas.search(11)).toBe(true);
	expect(areas.search(12)).toBe(true);
	expect(areas.search(13)).toBe(true);
	expect(areas.search(14)).toBe(false);
	expect(areas.count).toBe(1);

	areas.erase(8);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(true);
	expect(areas.search(10)).toBe(true);
	expect(areas.search(11)).toBe(true);
	expect(areas.search(12)).toBe(true);
	expect(areas.search(13)).toBe(true);
	expect(areas.search(14)).toBe(false);
	expect(areas.count).toBe(1);

	areas.erase(14);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(true);
	expect(areas.search(10)).toBe(true);
	expect(areas.search(11)).toBe(true);
	expect(areas.search(12)).toBe(true);
	expect(areas.search(13)).toBe(true);
	expect(areas.search(14)).toBe(false);
	expect(areas.count).toBe(1);

	expect(areas.toString()).toBe(',9~13');
});
it('test_erase_9', ()=> {
	areas.record(9);
	areas.record(10);
	areas.record(11);
	areas.record(12);
	areas.record(13);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(true);
	expect(areas.search(10)).toBe(true);
	expect(areas.search(11)).toBe(true);
	expect(areas.search(12)).toBe(true);
	expect(areas.search(13)).toBe(true);
	expect(areas.search(14)).toBe(false);
	expect(areas.count).toBe(1);

	areas.erase(9);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(false);
	expect(areas.search(10)).toBe(true);
	expect(areas.search(11)).toBe(true);
	expect(areas.search(12)).toBe(true);
	expect(areas.search(13)).toBe(true);
	expect(areas.search(14)).toBe(false);
	expect(areas.count).toBe(1);

	expect(areas.toString()).toBe(',10~13');
});
it('test_erase_10_9', ()=> {
	areas.record(9);
	areas.record(10);
	areas.record(11);
	areas.record(12);
	areas.record(13);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(true);
	expect(areas.search(10)).toBe(true);
	expect(areas.search(11)).toBe(true);
	expect(areas.search(12)).toBe(true);
	expect(areas.search(13)).toBe(true);
	expect(areas.search(14)).toBe(false);
	expect(areas.count).toBe(1);

	areas.erase(10);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(true);
	expect(areas.search(10)).toBe(false);
	expect(areas.search(11)).toBe(true);
	expect(areas.search(12)).toBe(true);
	expect(areas.search(13)).toBe(true);
	expect(areas.search(14)).toBe(false);
	expect(areas.count).toBe(2);

	areas.erase(9);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(false);
	expect(areas.search(10)).toBe(false);
	expect(areas.search(11)).toBe(true);
	expect(areas.search(12)).toBe(true);
	expect(areas.search(13)).toBe(true);
	expect(areas.search(14)).toBe(false);
	expect(areas.count).toBe(1);

	expect(areas.toString()).toBe(',11~13');
});
it('test_erase_12_13', ()=> {
	areas.record(9);
	areas.record(10);
	areas.record(11);
	areas.record(12);
	areas.record(13);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(true);
	expect(areas.search(10)).toBe(true);
	expect(areas.search(11)).toBe(true);
	expect(areas.search(12)).toBe(true);
	expect(areas.search(13)).toBe(true);
	expect(areas.search(14)).toBe(false);
	expect(areas.count).toBe(1);

	areas.erase(12);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(true);
	expect(areas.search(10)).toBe(true);
	expect(areas.search(11)).toBe(true);
	expect(areas.search(12)).toBe(false);
	expect(areas.search(13)).toBe(true);
	expect(areas.search(14)).toBe(false);
	expect(areas.count).toBe(2);

	areas.erase(13);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(true);
	expect(areas.search(10)).toBe(true);
	expect(areas.search(11)).toBe(true);
	expect(areas.search(12)).toBe(false);
	expect(areas.search(13)).toBe(false);
	expect(areas.search(14)).toBe(false);
	expect(areas.count).toBe(1);

	expect(areas.toString()).toBe(',9~11');
});
it('test_erase_13', ()=> {
	areas.record(9);
	areas.record(10);
	areas.record(11);
	areas.record(12);
	areas.record(13);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(true);
	expect(areas.search(10)).toBe(true);
	expect(areas.search(11)).toBe(true);
	expect(areas.search(12)).toBe(true);
	expect(areas.search(13)).toBe(true);
	expect(areas.search(14)).toBe(false);
	expect(areas.count).toBe(1);

	areas.erase(13);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(true);
	expect(areas.search(10)).toBe(true);
	expect(areas.search(11)).toBe(true);
	expect(areas.search(12)).toBe(true);
	expect(areas.search(13)).toBe(false);
	expect(areas.search(14)).toBe(false);
	expect(areas.count).toBe(1);

	expect(areas.toString()).toBe(',9~12');
});
it('test_erase_14', ()=> {
	areas.record(9);
	areas.record(10);
	areas.record(11);
	areas.record(12);
	areas.record(13);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(true);
	expect(areas.search(10)).toBe(true);
	expect(areas.search(11)).toBe(true);
	expect(areas.search(12)).toBe(true);
	expect(areas.search(13)).toBe(true);
	expect(areas.search(14)).toBe(false);
	expect(areas.count).toBe(1);

	areas.erase(14);
	expect(areas.search(8)).toBe(false);
	expect(areas.search(9)).toBe(true);
	expect(areas.search(10)).toBe(true);
	expect(areas.search(11)).toBe(true);
	expect(areas.search(12)).toBe(true);
	expect(areas.search(13)).toBe(true);
	expect(areas.search(14)).toBe(false);
	expect(areas.count).toBe(1);

	expect(areas.toString()).toBe(',9~13');
});
