/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Config} from '../src/sn/Config';
import {SEARCH_PATH_ARG_EXT} from '../src/sn/ConfigBase';
import {SysTest} from './SysTest';


let	cfg: Config;
beforeEach(async ()=> {
	const sys = new SysTest({}, {cur: 'test/', crypto: false, dip: ''});
	cfg = await Config.generate(sys);
});

it('testsetSearchPath_0', ()=> {
	expect(cfg.searchPath('http://bbb')).toBe('http://bbb');

	expect(()=> cfg.searchPath('ccc'))
	.toThrow('サーチパスに存在しないファイル【ccc】です');

	expect(cfg.searchPath('update.png')).toBe('test/:dummy dir:/mat/update.png');
	expect(cfg.searchPath('update', SEARCH_PATH_ARG_EXT.TST_PNGPNG_)).toBe('test/:dummy dir:/mat/update.png');

	expect(()=> cfg.searchPath('update', SEARCH_PATH_ARG_EXT.TST_HH))
	.toThrow('サーチ対象拡張子群【hh】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【update】');

	expect(()=> cfg.searchPath('update.ddd', SEARCH_PATH_ARG_EXT.TST_EEE))
	.toThrow('指定ファイルの拡張子【ddd】は、サーチ対象拡張子群【eee】にマッチしません。探索ファイル名=【update.ddd】');

	expect(()=> cfg.searchPath('update.ggg', SEARCH_PATH_ARG_EXT.TST_GGG))
	.toThrow('サーチパスに存在しない拡張子【ggg】です。探索ファイル名=【update.ggg】、サーチ対象拡張子群【ggg】');

	expect(()=> cfg.searchPath('update', SEARCH_PATH_ARG_EXT.TST_PNGXML))
	.toThrow('指定ファイル【update】が複数マッチします。サーチ対象拡張子群【png|xml】で絞り込むか、ファイル名を個別にして下さい。');

	expect(()=> cfg.searchPath('update'))
	.toThrow('指定ファイル【update】が複数マッチします。サーチ対象拡張子群【】で絞り込むか、ファイル名を個別にして下さい。');

	expect(cfg.searchPath('update2.png')).toBe('test/:dummy dir:/mat/update2.png');
	expect(()=> cfg.searchPath('update3.png'))
	.toThrow('サーチパスに存在しないファイル【update3.png】です');

	expect(cfg.searchPath('update2', SEARCH_PATH_ARG_EXT.TST_PNGPNG_)).toBe('test/:dummy dir:/mat/update2.png');
	expect(()=> cfg.searchPath('update3', SEARCH_PATH_ARG_EXT.TST_PNGPNG_))
	.toThrow('サーチパスに存在しないファイル【update3】です');

	expect(cfg.searchPath('update0', SEARCH_PATH_ARG_EXT.SCRIPT)).toBe('test/:dummy dir:/mat/update0.sn');
	expect(cfg.searchPath('update', SEARCH_PATH_ARG_EXT.SCRIPT)).toBe('test/:dummy dir:/mat/update.sn');
});
it('testsetSearchPath_1_userFnTail', ()=> {
	cfg.userFnTail = 'ex';

	expect(cfg.searchPath('http://bbb')).toBe('http://bbb');

	expect(()=> cfg.searchPath('ccc'))
	.toThrow('サーチパスに存在しないファイル【ccc】です');

	expect(cfg.searchPath('update.png')).toBe('test/:dummy dir:/mat/update@@ex.png');
	expect(cfg.searchPath('update', SEARCH_PATH_ARG_EXT.TST_PNGPNG_)).toBe('test/:dummy dir:/mat/update@@ex.png');

	expect(()=> cfg.searchPath('update', SEARCH_PATH_ARG_EXT.TST_HH))
	.toThrow('サーチ対象拡張子群【hh】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【update】');

	expect(()=> cfg.searchPath('update.ddd', SEARCH_PATH_ARG_EXT.TST_EEE))
	.toThrow('指定ファイルの拡張子【ddd】は、サーチ対象拡張子群【eee】にマッチしません。探索ファイル名=【update.ddd】');

	expect(()=> cfg.searchPath('update.ggg', SEARCH_PATH_ARG_EXT.TST_GGG))
	.toThrow('サーチパスに存在しない拡張子【ggg】です。探索ファイル名=【update.ggg】、サーチ対象拡張子群【ggg】');

	expect(()=> cfg.searchPath('update', SEARCH_PATH_ARG_EXT.TST_PNGXML))
	.toThrow('指定ファイル【update】が複数マッチします。サーチ対象拡張子群【png|xml】で絞り込むか、ファイル名を個別にして下さい。');

	expect(()=> cfg.searchPath('update'))
	.toThrow('指定ファイル【update】が複数マッチします。サーチ対象拡張子群【】で絞り込むか、ファイル名を個別にして下さい。');

	expect(cfg.searchPath('update2.png')).toBe('test/:dummy dir:/mat/update2.png');
	expect(cfg.searchPath('update3.png')).toBe('test/:dummy dir:/mat/update3@@ex.png');
	expect(cfg.searchPath('update2', SEARCH_PATH_ARG_EXT.TST_PNGPNG_)).toBe('test/:dummy dir:/mat/update2.png');
	expect(cfg.searchPath('update3', SEARCH_PATH_ARG_EXT.TST_PNGPNG_)).toBe('test/:dummy dir:/mat/update3@@ex.png');


	expect(cfg.searchPath('update0', SEARCH_PATH_ARG_EXT.SCRIPT)).toBe('test/:dummy dir:/mat/update0.sn');
	expect(cfg.searchPath('update', SEARCH_PATH_ARG_EXT.SCRIPT)).toBe('test/:dummy dir:/mat/update.sn');
});

it('test_searchPath_speedtest_0', ()=> {
//	const old_time = (new Date).getTime();
	//for (let i=0; i<1000; ++i) {
		expect(cfg.searchPath('http://bbb')).toBe('http://bbb');

		expect(()=> cfg.searchPath('ccc'))
		.toThrow('サーチパスに存在しないファイル【ccc】です');
	//}
//	const time = (new Date).getTime() - old_time;	// 実行後に測定
	//assert.fail('経過時間:' + time);		// 差
});
it('test_searchPath_speedtest_1', ()=> {
//	const old_time = (new Date).getTime();
	//for (let i=0; i<1000; ++i) {
		expect(cfg.searchPath('update.png')).toBe('test/:dummy dir:/mat/update.png');
		expect(cfg.searchPath('update', SEARCH_PATH_ARG_EXT.TST_PNGPNG_)).toBe('test/:dummy dir:/mat/update.png');

		expect(()=> cfg.searchPath('update', SEARCH_PATH_ARG_EXT.TST_HH))
		.toThrow('サーチ対象拡張子群【hh】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【update】');

		expect(()=> cfg.searchPath('update.ddd', SEARCH_PATH_ARG_EXT.TST_EEE))
		.toThrow('指定ファイルの拡張子【ddd】は、サーチ対象拡張子群【eee】にマッチしません。探索ファイル名=【update.ddd】');
	//}
//	const time = (new Date).getTime() - old_time;	// 実行後に測定
//	assert.fail('経過時間:' + time);		// 差
});
it('test_searchPath_speedtest_2', ()=> {
//	const old_time = (new Date).getTime();
	//for (let i=0; i<1000; ++i) {
	expect(()=> cfg.searchPath('update.ggg', SEARCH_PATH_ARG_EXT.TST_GGG))
	.toThrow('サーチパスに存在しない拡張子【ggg】です。探索ファイル名=【update.ggg】、サーチ対象拡張子群【ggg】');

	expect(()=> cfg.searchPath('update', SEARCH_PATH_ARG_EXT.TST_PNGXML))
	.toThrow('指定ファイル【update】が複数マッチします。サーチ対象拡張子群【png|xml】で絞り込むか、ファイル名を個別にして下さい。');

	expect(()=> cfg.searchPath('update'))
	.toThrow('指定ファイル【update】が複数マッチします。サーチ対象拡張子群【】で絞り込むか、ファイル名を個別にして下さい。');
	//}
//		const time = (new Date).getTime() - old_time;	// 実行後に測定
	//assert.fail('経過時間:' + time);		// 差
});
