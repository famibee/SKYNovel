/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import assert = require('power-assert');

import {Config} from '../core/src/sn/Config';
import {SysNode} from '../core/src/sn/SysNode';

context('class Config', ()=>{
	let	cfg	= null;
	beforeEach(() => {
		cfg = new Config(new SysNode('test/'), ()=> {}, {
			search	: ["mat"],
		});
	});

	describe('Tst', () => {
		it('testsetSearchPath_0', ()=> {
			assert.equal(cfg.searchPath("http://bbb"), "http://bbb");

			try {
				assert.equal(cfg.searchPath("ccc"), "ccc");
				assert.fail("Error:ccc");
			}
			catch (s) {
				assert.equal(s, "サーチパスに存在しないファイル【ccc】です");
			}

			assert.equal(cfg.searchPath("update.png"),
				//"test/mat/update.png");
				__dirname +"/mat/update.png");
			assert.equal(cfg.searchPath("update", "png|png_"),
				//"test/mat/update.png");
				__dirname +"/mat/update.png");

			try {
				assert.equal(cfg.searchPath("update", "hh"), "ii");
				assert.fail("Error:hh");
			}
			catch (s) {
				assert.equal(s, "サーチ対象拡張子群【hh】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【update】");
			}

			try {
				assert.equal(cfg.searchPath("update.ddd", "eee"), "fff");
				assert.fail("Error:fff");
			}
			catch (s) {
				assert.equal(s, "指定ファイルの拡張子【ddd】は、サーチ対象拡張子群【eee】にマッチしません。探索ファイル名=【update.ddd】");
			}

			try {
				assert.equal(cfg.searchPath("update.ggg", "ggg"), "fff");
				assert.fail("Error:ggg");
			}
			catch (s) {
				assert.equal(s, "サーチパスに存在しない拡張子【ggg】です。探索ファイル名=【update.ggg】、サーチ対象拡張子群【ggg】");
			}

			try {
				assert.equal(cfg.searchPath("update", "png|xml"), "jjj");
				assert.fail("Error:jjj");
			}
			catch (s) {
				assert.equal(s, "指定ファイル【update】が複数マッチします。サーチ対象拡張子群【png|xml】で絞り込むか、ファイル名を個別にして下さい。");
			}
			try {
				assert.equal(cfg.searchPath("update"), "update");
				assert.fail("Error:update2");
			}
			catch (s) {
				assert.equal(s, "指定ファイル【update】が複数マッチします。サーチ対象拡張子群【】で絞り込むか、ファイル名を個別にして下さい。");
			}

			assert.equal(cfg.searchPath("update2.png"),
				//"test/mat/update2.png");
				__dirname +"/mat/update2.png");
			try {
				cfg.searchPath("update3.png");
				assert.fail("Error:kkk");
			}
			catch (s) {
				assert.equal(s, "サーチパスに存在しないファイル【update3.png】です");
			}
			assert.equal(cfg.searchPath("update2", "png|png_"),
				//"test/mat/update2.png");
				__dirname +"/mat/update2.png");
			try {
				cfg.searchPath("update3", "png|png_");
				assert.fail("Error:lll");
			}
			catch (s) {
				assert.equal(s, "サーチパスに存在しないファイル【update3】です");
			}


			assert.equal(cfg.searchPath("update0", Config.EXT_SCRIPT),
				//"test/mat/update0.sn");
				__dirname +"/mat/update0.sn");
			assert.equal(cfg.searchPath("update", Config.EXT_SCRIPT),
				//"test/mat/update.sn");
				__dirname +"/mat/update.sn");
		});
		it('testsetSearchPath_1_userFnTail', ()=> {
			cfg.userFnTail = 'ex';
			cfg.cnv_path = (path: string): string => {
				return path.replace(
					/^app-storage:/
				,	'app-storage')
			};
			/*	保留
			assert.equal(cfg.searchPath("app-storage:/aaa.jpg"), "app-storage:/aaa.jpg");
			assert.equal(cfg.searchPath("app-storage:/aaa.sn"), "app-storage:/aaa.sn");
			assert.equal(cfg.searchPath("app-storage:/update0.png"), "app-storage:/update0%40%40ex.png");*/
				// /Users/[user]/Library/Application Support/com.fc2.blog38.famibee.ANTest/に本当にファイルを置くこと
			assert.equal(cfg.searchPath("http://bbb"), "http://bbb");

			try {
				assert.equal(cfg.searchPath("ccc"), "ccc");
				assert.fail("Error:ccc");
			}
			catch (s) {
				assert.equal(s, "サーチパスに存在しないファイル【ccc】です");
			}

			assert.equal(cfg.searchPath("update.png"),
				//"test/mat/update@@ex.png");
				__dirname +"/mat/update@@ex.png");
			assert.equal(cfg.searchPath("update", "png|png_"),
				//"test/mat/update@@ex.png");
				__dirname +"/mat/update@@ex.png");

			try {
				assert.equal(cfg.searchPath("update", "hh"), "ii");
				assert.fail("Error:hh");
			}
			catch (s) {
				assert.equal(s, "サーチ対象拡張子群【hh】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【update】");
			}

			try {
				assert.equal(cfg.searchPath("update.ddd", "eee"), "fff");
				assert.fail("Error:fff");
			}
			catch (s) {
				assert.equal(s, "指定ファイルの拡張子【ddd】は、サーチ対象拡張子群【eee】にマッチしません。探索ファイル名=【update.ddd】");
			}

			try {
				assert.equal(cfg.searchPath("update.ggg", "ggg"), "fff");
				assert.fail("Error:ggg");
			}
			catch (s) {
				assert.equal(s, "サーチパスに存在しない拡張子【ggg】です。探索ファイル名=【update.ggg】、サーチ対象拡張子群【ggg】");
			}

			try {
				assert.equal(cfg.searchPath("update", "png|xml"), "jjj");
				assert.fail("Error:jjj");
			}
			catch (s) {
				assert.equal(s, "指定ファイル【update】が複数マッチします。サーチ対象拡張子群【png|xml】で絞り込むか、ファイル名を個別にして下さい。");
			}
			try {
				assert.equal(cfg.searchPath("update"), "update");
				assert.fail("Error:update2");
			}
			catch (s) {
				assert.equal(s, "指定ファイル【update】が複数マッチします。サーチ対象拡張子群【】で絞り込むか、ファイル名を個別にして下さい。");
			}

			assert.equal(cfg.searchPath("update2.png"),
				//"test/mat/update2.png");
				__dirname +"/mat/update2.png");
			assert.equal(cfg.searchPath("update3.png"),
				//"test/mat/update3@@ex.png");
				__dirname +"/mat/update3@@ex.png");
			assert.equal(cfg.searchPath("update2", "png|png_"),
				//"test/mat/update2.png");
				__dirname +"/mat/update2.png");
			assert.equal(cfg.searchPath("update3", "png|png_"),
				//"test/mat/update3@@ex.png");
				__dirname +"/mat/update3@@ex.png");


			assert.equal(cfg.searchPath("update0", Config.EXT_SCRIPT),
				//"test/mat/update0.sn");
				__dirname +"/mat/update0.sn");
			try {
				assert.equal(cfg.searchPath("update", Config.EXT_SCRIPT),
					//"test/mat/update.sn");
					__dirname +"/mat/update.sn");
			}
			catch (s) {
				assert.equal(s, "");
			}
		});

		it('test_searchPath_speedtest_0', ()=> {
			const old_time = (new Date()).getTime();
			//for (let i=0; i<1000; ++i) {
				assert.equal(cfg.searchPath("http://bbb"), "http://bbb");

				try {
					assert.equal(cfg.searchPath("ccc"), "ccc");
					assert.fail("Error:ccc");
				}
				catch (s) {
					assert.equal(s, "サーチパスに存在しないファイル【ccc】です");
				}
			//}
			const time = (new Date()).getTime() - old_time;	// 実行後に測定
			//assert.fail("経過時間:" + time);		// 差
		});
		it('test_searchPath_speedtest_1', ()=> {
			const old_time = (new Date()).getTime();
			//for (let i=0; i<1000; ++i) {
				assert.equal(cfg.searchPath("update.png"),
					//test/mat/update.png");
					__dirname +"/mat/update.png");
				assert.equal(cfg.searchPath("update", "png|png_"),
					//"test/mat/update.png");
					__dirname +"/mat/update.png");

				try {
					assert.equal(cfg.searchPath("update", "hh"), "ii");
					assert.fail("Error:hh");
				}
				catch (s) {
					assert.equal(s, "サーチ対象拡張子群【hh】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【update】");
				}

				try {
					assert.equal(cfg.searchPath("update.ddd", "eee"), "fff");
					assert.fail("Error:fff");
				}
				catch (s) {
					assert.equal(s, "指定ファイルの拡張子【ddd】は、サーチ対象拡張子群【eee】にマッチしません。探索ファイル名=【update.ddd】");
				}
			//}
			const time = (new Date()).getTime() - old_time;	// 実行後に測定
			//	assert.fail("経過時間:" + time);		// 差
		});
		it('test_searchPath_speedtest_2', ()=> {
			const old_time = (new Date()).getTime();
			//for (let i=0; i<1000; ++i) {
				try {
					assert.equal(cfg.searchPath("update.ggg", "ggg"), "fff");
					assert.fail("Error:ggg");
				}
				catch (s) {
					assert.equal(s, "サーチパスに存在しない拡張子【ggg】です。探索ファイル名=【update.ggg】、サーチ対象拡張子群【ggg】");
				}
				try {
					assert.equal(cfg.searchPath("update", "png|xml"), "jjj");
					assert.fail("Error:jjj");
				}
				catch (s) {
					assert.equal(s, "指定ファイル【update】が複数マッチします。サーチ対象拡張子群【png|xml】で絞り込むか、ファイル名を個別にして下さい。");
				}
				try {
					assert.equal(cfg.searchPath("update"), "update");
					assert.fail("Error:update2");
				}
				catch (s) {
					assert.equal(s, "指定ファイル【update】が複数マッチします。サーチ対象拡張子群【】で絞り込むか、ファイル名を個別にして下さい。");
				}
			//}
			const time = (new Date()).getTime() - old_time;	// 実行後に測定
			//assert.fail("経過時間:" + time);		// 差
		});


	});

});
