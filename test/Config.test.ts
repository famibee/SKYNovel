/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {ConfigBase, SEARCH_PATH_ARG_EXT} from '../src/sn/ConfigBase';
import {SysNode} from '../src/sn/SysNode';

import {beforeEach, it, expect} from 'vitest';

//===== Test Class =====
import {readFileSync, writeFileSync, appendFile, ensureFileSync} from 'fs-extra';
export class SysTest extends SysNode {
	override ensureFileSync = async (path: string)=> ensureFileSync(path);
	protected	override readFileSync = async (path: string)=> readFileSync(path, {encoding: 'utf8'});
	protected	override writeFileSync = async (path: string, data: Buffer, o?: object)=> writeFileSync(path, data, o);
	override appendFile = async (path: string, data: string)=> appendFile(path, data).catch(err=> {throw err});
}
//===== Test Class =====

let	cfg: ConfigBase;
beforeEach(async ()=> {
	cfg = new ConfigBase(new SysTest({}, {cur: 'test/', crypto: false, dip: ''}));
	await cfg.load({search: ['mat']});
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
