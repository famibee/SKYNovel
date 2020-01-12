/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import assert = require('power-assert');

import {RubySpliter} from '../core/src/sn/RubySpliter';
import {HArg, IPutCh} from '../core/src/sn/CmnInterface';
import { CmnLib } from '../core/src/sn/CmnLib';

context('class RubySpliter', ()=>{
	let	rbSpl	= null;
	let	retText	= '';
	let	retRuby	= '';
	beforeEach(()=> {
		rbSpl = new RubySpliter();
		rbSpl.init(putCh, null);
		RubySpliter.setEscape('');
		retText	= '';
		retRuby	= '';
	});
		let putCh : IPutCh = (ch, ruby)=> {
			retText = retText + '.'+ ch;
			retRuby = retRuby + '.'+ ruby;
		}

	describe('Tst', ()=> {
		// RubySpliter
		it('test_putTxt_1t_0r', ()=> {
			rbSpl.putTxt("雷");
			assert.equal(retText, ".雷");
			assert.equal(retRuby, ".");
		});
		it('test_putTxt_1t_1r', ()=> {
			rbSpl.putTxt("火《ひ》");
			assert.equal(retText, ".火");
			assert.equal(retRuby, ".ひ");
		});
		it('test_putTxt_1t_2r', ()=> {
			rbSpl.putTxt("水《みず》");
			assert.equal(retText, ".水");
			assert.equal(retRuby, ".みず");
		});
		it('test_putTxt_1t_3r', ()=> {
			rbSpl.putTxt("緑《みどり》");
			assert.equal(retText, ".緑");
			assert.equal(retRuby, ".みどり");
		});
		it('test_putTxt_1t_4r', ()=> {
			rbSpl.putTxt("雷《いかずち》");
			assert.equal(retText, ".雷");
			assert.equal(retRuby, ".いかずち");
		});
			it('test_putTxtRb_1t_0r', ()=> {
				rbSpl.putTxtRb("雷", "");
				assert.equal(retText, ".雷");
				assert.equal(retRuby, ".");
			});
			it('test_putTxtRb_1t_1r', ()=> {
				rbSpl.putTxtRb("火", "ひ");
				assert.equal(retText, ".火");
				assert.equal(retRuby, ".ひ");
			});
			it('test_putTxtRb_1t_2r', ()=> {
				rbSpl.putTxtRb("水", "みず");
				assert.equal(retText, ".水");
				assert.equal(retRuby, ".みず");
			});
			it('test_putTxtRb_1t_3r', ()=> {
				rbSpl.putTxtRb("緑", "みどり");
				assert.equal(retText, ".緑");
				assert.equal(retRuby, ".みどり");
			});
			it('test_putTxtRb_1t_4r', ()=> {
				rbSpl.putTxtRb("雷", "いかずち");
				assert.equal(retText, ".雷");
				assert.equal(retRuby, ".いかずち");
			});

		it('test_putTxt_sp_1t_0r', ()=> {
			rbSpl.putTxt("　雷");
			assert.equal(retText, ".　.雷");
			assert.equal(retRuby, "..");
		});
		it('test_putTxt_sp_1t_1r', ()=> {
			rbSpl.putTxt("　火《ひ》");
			assert.equal(retText, ".　.火");
			assert.equal(retRuby, "..ひ");
		});
		it('test_putTxt_sp_1t_2r', ()=> {
			rbSpl.putTxt("　水《みず》");
			assert.equal(retText, ".　.水");
			assert.equal(retRuby, "..みず");
		});
		it('test_putTxt_sp_1t_3r', ()=> {
			rbSpl.putTxt("　緑《みどり》");
			assert.equal(retText, ".　.緑");
			assert.equal(retRuby, "..みどり");
		});
		it('test_putTxt_sp_1t_4r', ()=> {
			rbSpl.putTxt("　雷《いかずち》");
			assert.equal(retText, ".　.雷");
			assert.equal(retRuby, "..いかずち");
		});
			it('test_putTxtRb_sp_1t_0r', ()=> {
				rbSpl.putTxtRb("　雷", "");
				assert.equal(retText, ".　雷");
				assert.equal(retRuby, ".");
			});
			it('test_putTxtRb_sp_1t_1r', ()=> {
				rbSpl.putTxtRb("　火", "ひ");
				assert.equal(retText, ".　火");
				assert.equal(retRuby, ".ひ");
			});
			it('test_putTxtRb_sp_1t_2r', ()=> {
				rbSpl.putTxtRb("　水", "みず");
				assert.equal(retText, ".　水");
				assert.equal(retRuby, ".みず");
			});
			it('test_putTxtRb_sp_1t_3r', ()=> {
				rbSpl.putTxtRb("　緑", "みどり");
				assert.equal(retText, ".　緑");
				assert.equal(retRuby, ".みどり");
			});
			it('test_putTxtRb_sp_1t_4r', ()=> {
				rbSpl.putTxtRb("　雷", "いかずち");
				assert.equal(retText, ".　雷");
				assert.equal(retRuby, ".いかずち");
			});
		it('test_putTxt_sp2_1t_0r', ()=> {
			rbSpl.putTxt("　　雷");
			assert.equal(retText, ".　.　.雷");
			assert.equal(retRuby, "...");
		});
			it('test_putTxtRb_sp2_1t_0r', ()=> {
				rbSpl.putTxtRb("　　雷", "");
				assert.equal(retText, ".　　雷");
				assert.equal(retRuby, ".");
			});


		it('test_putTxt_2t_2r', ()=> {
			rbSpl.putTxt("何時《い つ》");
			assert.equal(retText, ".何.時");
			assert.equal(retRuby, ".い.つ");
		});
		it('test_putTxt_2t_4r', ()=> {
			rbSpl.putTxt("一応《いちおう》");
			assert.equal(retText, ".一応");
			assert.equal(retRuby, ".いちおう");
		});
		it('test_putTxt_2t_6r', ()=> {
			rbSpl.putTxt("夢幻《ゆめまぼろし》");
			assert.equal(retText, ".夢幻");
			assert.equal(retRuby, ".ゆめまぼろし");
		});
			it('test_putTxtRb_2t_2r', ()=> {
				rbSpl.putTxtRb("何時", "い つ");
				assert.equal(retText, ".何.時");
				assert.equal(retRuby, ".い.つ");
			});
			it('test_putTxtRb_2t_4r', ()=> {
				rbSpl.putTxtRb("一応", "いちおう");
				assert.equal(retText, ".一応");
				assert.equal(retRuby, ".いちおう");
			});
			it('test_putTxtRb_2t_6r', ()=> {
				rbSpl.putTxtRb("夢幻", "ゆめまぼろし");
				assert.equal(retText, ".夢幻");
				assert.equal(retRuby, ".ゆめまぼろし");
			});

		it('test_putTxt_sp_2t_2r', ()=> {
			rbSpl.putTxt("　何時《い つ》");
			assert.equal(retText, ".　.何.時");
			assert.equal(retRuby, "..い.つ");
		});
		it('test_putTxt_sp_2t_4r', ()=> {
			rbSpl.putTxt("　一応《いちおう》");
			assert.equal(retText, ".　.一応");
			assert.equal(retRuby, "..いちおう");
		});
		it('test_putTxt_sp_2t_6r', ()=> {
			rbSpl.putTxt("　夢幻《ゆめまぼろし》");
			assert.equal(retText, ".　.夢幻");
			assert.equal(retRuby, "..ゆめまぼろし");
		});
			it('test_putTxtRb_sp_2t_2r', ()=> {
				rbSpl.putTxtRb("　何時", "い つ");
				assert.equal(retText, ".　.何.時");
				assert.equal(retRuby, ".い.つ.");
			});
			it('test_putTxtRb_sp_2t_4r', ()=> {
				rbSpl.putTxtRb("　一応", "いちおう");
				assert.equal(retText, ".　一応");
				assert.equal(retRuby, ".いちおう");
			});
			it('test_putTxtRb_sp_2t_6r', ()=> {
				rbSpl.putTxtRb("　夢幻", "ゆめまぼろし");
				assert.equal(retText, ".　夢幻");
				assert.equal(retRuby, ".ゆめまぼろし");
			});


		// 拡張属性文法
		it('test_putTxt_1t_1r_extension_empty', ()=> {
			rbSpl.putTxt("火《｜ひ》");
			assert.equal(retText, ".火");
			assert.equal(retRuby, ".｜ひ");
		});
		it('test_putTxt_1t_2r_extension_empty', ()=> {
			rbSpl.putTxt("水《｜みず》");
			assert.equal(retText, ".水");
			assert.equal(retRuby, ".｜みず");
		});
		it('test_putTxt_1t_3r_extension_empty', ()=> {
			rbSpl.putTxt("緑《｜みどり》");
			assert.equal(retText, ".緑");
			assert.equal(retRuby, ".｜みどり");
		});
		it('test_putTxt_1t_4r_extension_empty', ()=> {
			rbSpl.putTxt("雷《｜いかずち》");
			assert.equal(retText, ".雷");
			assert.equal(retRuby, ".｜いかずち");
		});
		it('test_putTxt_1t_1r_extension', ()=> {
			rbSpl.putTxt("火《left｜ひ》");
			assert.equal(retText, ".火");
			assert.equal(retRuby, ".left｜ひ");
		});
		it('test_putTxt_1t_2r_extension', ()=> {
			rbSpl.putTxt("水《left｜みず》");
			assert.equal(retText, ".水");
			assert.equal(retRuby, ".left｜みず");
		});
		it('test_putTxt_1t_3r_extension', ()=> {
			rbSpl.putTxt("緑《left｜みどり》");
			assert.equal(retText, ".緑");
			assert.equal(retRuby, ".left｜みどり");
		});
		it('test_putTxt_1t_4r_extension', ()=> {
			rbSpl.putTxt("雷《left｜いかずち》");
			assert.equal(retText, ".雷");
			assert.equal(retRuby, ".left｜いかずち");
		});

		it('test_putTxt_2t_2r_extension_empty', ()=> {
			rbSpl.putTxt("何時《｜い つ》");
			assert.equal(retText, ".何.時");
			assert.equal(retRuby, ".｜い.つ");
		});
		it('test_putTxt_2t_4r_extension_empty', ()=> {
			rbSpl.putTxt("一応《｜いちおう》");
			assert.equal(retText, ".一応");
			assert.equal(retRuby, ".｜いちおう");
		});
		it('test_putTxt_2t_6r_extension_empty', ()=> {
			rbSpl.putTxt("夢幻《｜ゆめまぼろし》");
			assert.equal(retText, ".夢幻");
			assert.equal(retRuby, ".｜ゆめまぼろし");
		});
		it('test_putTxt_2t_2r_extension', ()=> {
			rbSpl.putTxt("何時《left｜い つ》");
			assert.equal(retText, ".何.時");
			assert.equal(retRuby, ".left｜い.つ");
		});
		it('test_putTxt_2t_4r_extension', ()=> {
			rbSpl.putTxt("一応《left｜いちおう》");
			assert.equal(retText, ".一応");
			assert.equal(retRuby, ".left｜いちおう");
		});
		it('test_putTxt_2t_6r_extension', ()=> {
			rbSpl.putTxt("夢幻《left｜ゆめまぼろし》");
			assert.equal(retText, ".夢幻");
			assert.equal(retRuby, ".left｜ゆめまぼろし");
		});

		it('test_putTxt_I_2t_4r_extension', ()=> {
			rbSpl.putTxt("｜剃刀《left｜かみそり》");
			assert.equal(retText, ".剃刀");
			assert.equal(retRuby, ".left｜かみそり");
		});
			it('test_putTxtRb_I_2t_4r_extension', ()=> {
				rbSpl.putTxtRb("剃刀", "left｜かみそり");
				assert.equal(retText, ".剃刀");
				assert.equal(retRuby, ".left｜かみそり");
			});
		it('test_putTxt_I_2t_4r_1_extension', ()=> {
			rbSpl.putTxt("安全｜剃刀《left｜かみそり》を");
			assert.equal(retText, ".安.全.剃刀.を");
			assert.equal(retRuby, "...left｜かみそり.");
		});
		it('test_putTxt_I_3t_5r_extension', ()=> {
			rbSpl.putTxt("｜雷の指《left｜ひげこがし》");
			assert.equal(retText, ".雷の指");
			assert.equal(retRuby, ".left｜ひげこがし");
		});
			it('test_putTxtRb_I_3t_5r_extension', ()=> {
				rbSpl.putTxtRb("雷の指", "left｜ひげこがし");
				assert.equal(retText, ".雷の指");
				assert.equal(retRuby, ".left｜ひげこがし");
			});
		it('test_putTxt_I_3t_5r_1_extension', ()=> {
			rbSpl.putTxt("彼は｜雷の指《left｜ひげこがし》を");
			assert.equal(retText, ".彼.は.雷の指.を");
			assert.equal(retRuby, "...left｜ひげこがし.");
		});
		it('test_putTxt_I_2t_4r_extension_empty', ()=> {
			rbSpl.putTxt("｜剃刀《｜かみそり》");
			assert.equal(retText, ".剃刀");
			assert.equal(retRuby, ".｜かみそり");
		});
			it('test_putTxtRb_I_2t_4r_extension_empty', ()=> {
				rbSpl.putTxtRb("剃刀", "｜かみそり");
				assert.equal(retText, ".剃刀");
				assert.equal(retRuby, ".｜かみそり");
			});
		it('test_putTxt_I_2t_4r_1_extension_empty', ()=> {
			rbSpl.putTxt("安全｜剃刀《｜かみそり》を");
			assert.equal(retText, ".安.全.剃刀.を");
			assert.equal(retRuby, "...｜かみそり.");
		});
		it('test_putTxt_I_3t_5r_extension_empty', ()=> {
			rbSpl.putTxt("｜雷の指《｜ひげこがし》");
			assert.equal(retText, ".雷の指");
			assert.equal(retRuby, ".｜ひげこがし");
		});
			it('test_putTxtRb_I_3t_5r_extension_empty', ()=> {
				rbSpl.putTxtRb("雷の指", "｜ひげこがし");
				assert.equal(retText, ".雷の指");
				assert.equal(retRuby, ".｜ひげこがし");
			});
		it('test_putTxt_I_3t_5r_1_extension_empty', ()=> {
			rbSpl.putTxt("彼は｜雷の指《｜ひげこがし》を");
			assert.equal(retText, ".彼.は.雷の指.を");
			assert.equal(retRuby, "...｜ひげこがし.");
		});


		it('test_putTxt_sesami1', ()=> {
			rbSpl.putTxt("雷《*》");
			assert.equal(retText, ".雷");
			assert.equal(retRuby, ".center｜ヽ");
		});
			it('test_putTxtRb_sesami1', ()=> {
				rbSpl.putTxtRb("雷", "*");
				assert.equal(retText, ".雷");
				assert.equal(retRuby, ".center｜ヽ");
			});
		it('test_putTxt_sesami1_chgmark', ()=> {
			rbSpl.setting({sesame:"点"})
			rbSpl.putTxt("雷《*》");
			assert.equal(retText, ".雷");
			assert.equal(retRuby, ".center｜点");

			rbSpl.setting({sesame:"ヽ"})
		});
		it('test_putTxt_sesami1_1', ()=> {
			rbSpl.putTxt("雷の指《*》を");
			assert.equal(retText, ".雷.の.指.を");
			assert.equal(retRuby, "...center｜ヽ.");
		});
		it('test_putTxt_sesami4', ()=> {
			rbSpl.putTxt("｜だが断る《*》");
			assert.equal(retText, ".だ.が.断.る");
			assert.equal(retRuby, ".center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ");
		});
			it('test_putTxtRb_sesami4', ()=> {
				rbSpl.putTxtRb("だが断る", "*");
				assert.equal(retText, ".だ.が.断.る");
				assert.equal(retRuby, ".center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ");
			});

		it('test_putTxt_sp_sesami1', ()=> {
			rbSpl.putTxt("　雷《*》");
			assert.equal(retText, ".　.雷");
			assert.equal(retRuby, "..center｜ヽ");
		});
			it('test_putTxtRb_sp_sesami1', ()=> {
				rbSpl.putTxtRb("　雷", "*");
				assert.equal(retText, ".　.雷");
				assert.equal(retRuby, ".center｜ヽ.center｜ヽ");
			});
		it('test_putTxt_sp_sesami1_chgmark', ()=> {
			rbSpl.setting({sesame:"点"})
			rbSpl.putTxt("　雷《*》");
			assert.equal(retText, ".　.雷");
			assert.equal(retRuby, "..center｜点");

			rbSpl.setting({sesame:"ヽ"})
		});
		it('test_putTxt_sp_sesami1_1', ()=> {
			rbSpl.putTxt("　雷神指《*》を");
			assert.equal(retText, ".　.雷.神.指.を");
			assert.equal(retRuby, "..center｜ヽ.center｜ヽ.center｜ヽ.");
		});
		it('test_putTxt_sp_sesami4', ()=> {
			rbSpl.putTxt("｜　だが断る《*》");
			assert.equal(retText, ".　.だ.が.断.る");
			assert.equal(retRuby, ".center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ");
		});
			it('test_putTxtRb_sp_sesami4', ()=> {
				rbSpl.putTxtRb("　だが断る", "*");
				assert.equal(retText, ".　.だ.が.断.る");
				assert.equal(retRuby, ".center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ");
			});

		it('test_putTxt_touten_sesami1', ()=> {
			rbSpl.putTxt("、雷《*》");
			assert.equal(retText, ".、.雷");
			assert.equal(retRuby, "..center｜ヽ");
		});
		it('test_putTxt_touten_sesami1_1', ()=> {
			rbSpl.putTxt("、雷神指《*》を");
			assert.equal(retText, ".、.雷.神.指.を");
			assert.equal(retRuby, "..center｜ヽ.center｜ヽ.center｜ヽ.");
		});
		it('test_putTxt_touten_sesami4', ()=> {
			rbSpl.putTxt("｜、だが断る《*》");
			assert.equal(retText, ".、.だ.が.断.る");
			assert.equal(retRuby, ".center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ");
		});
			it('test_putTxtRb_touten_sesami4', ()=> {
				rbSpl.putTxtRb("、だが断る", "*");
				assert.equal(retText, ".、.だ.が.断.る");
				assert.equal(retRuby, ".center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ");
			});

		it('test_putTxt_kuten_sesami1', ()=> {
			rbSpl.putTxt("。雷《*》");
			assert.equal(retText, ".。.雷");
			assert.equal(retRuby, "..center｜ヽ");
		});
		it('test_putTxt_kuten_sesami1_1', ()=> {
			rbSpl.putTxt("。雷神指《*》を");
			assert.equal(retText, ".。.雷.神.指.を");
			assert.equal(retRuby, "..center｜ヽ.center｜ヽ.center｜ヽ.");
		});
		it('test_putTxt_kuten_sesami4', ()=> {
			rbSpl.putTxt("｜。だが断る《*》");
			assert.equal(retText, ".。.だ.が.断.る");
			assert.equal(retRuby, ".center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ");
		});
			it('test_putTxtRb_kuten_sesami4', ()=> {
				rbSpl.putTxtRb("。だが断る", "*");
				assert.equal(retText, ".。.だ.が.断.る");
				assert.equal(retRuby, ".center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ");
			});

		it('test_putTxt_dash_sesami1', ()=> {
			rbSpl.putTxt("─雷《*》");
			assert.equal(retText, ".─.雷");
			assert.equal(retRuby, "..center｜ヽ");
		});
		it('test_putTxt_dash_sesami1_1', ()=> {
			rbSpl.putTxt("─雷神指《*》を");
			assert.equal(retText, ".─.雷.神.指.を");
			assert.equal(retRuby, "..center｜ヽ.center｜ヽ.center｜ヽ.");
		});
		it('test_putTxt_dash_sesami4', ()=> {
			rbSpl.putTxt("｜─だが断る《*》");
			assert.equal(retText, ".─.だ.が.断.る");
			assert.equal(retRuby, ".center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ");
		});
			it('test_putTxtRb_dash_sesami4', ()=> {
				rbSpl.putTxtRb("─だが断る", "*");
				assert.equal(retText, ".─.だ.が.断.る");
				assert.equal(retRuby, ".center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ");
			});

		it('test_putTxt_no_sesami1', ()=> {
			rbSpl.putTxt("雷《*★》");
			assert.equal(retText, ".雷");
			assert.equal(retRuby, ".center｜★");
		});
			it('test_putTxtRb_no_sesami1', ()=> {
				rbSpl.putTxtRb("雷", "*★");
				assert.equal(retText, ".雷");
				assert.equal(retRuby, ".center｜★");
			});
		it('test_putTxt_no_sesami1_chgmark', ()=> {
			rbSpl.setting({sesame:"点"})
			rbSpl.putTxt("雷《*★》");
			assert.equal(retText, ".雷");
			assert.equal(retRuby, ".center｜★");

			rbSpl.setting({sesame:"ヽ"})
		});
		it('test_putTxt_no_sesami1_1', ()=> {
			rbSpl.putTxt("雷の指《*★》を");
			assert.equal(retText, ".雷.の.指.を");
			assert.equal(retRuby, "...center｜★.");
		});
		it('test_putTxt_no_sesami4', ()=> {
			rbSpl.putTxt("｜だが断る《*★》");
			assert.equal(retText, ".だ.が.断.る");
			assert.equal(retRuby, ".center｜★.center｜★.center｜★.center｜★");
		});
			it('test_putTxtRb_no_sesami4', ()=> {
				rbSpl.putTxtRb("だが断る", "*★");
				assert.equal(retText, ".だ.が.断.る");
				assert.equal(retRuby, ".center｜★.center｜★.center｜★.center｜★");
			});
		it('test_putTxt_no_sesami5', ()=> {
			rbSpl.putTxt("｜だが断る《*@》");
			assert.equal(retText, ".だ.が.断.る");
			assert.equal(retRuby, ".center｜@.center｜@.center｜@.center｜@");
		});
			it('test_putTxtRb_no_sesami5', ()=> {
				rbSpl.putTxtRb("だが断る", "*@");
				assert.equal(retText, ".だ.が.断.る");
				assert.equal(retRuby, ".center｜@.center｜@.center｜@.center｜@");
			});


		it('test_putTxt_grp0', ()=> {
			rbSpl.putTxt("一期一会《いち ご いち え》");
			assert.equal(retText, ".一.期.一.会");
			assert.equal(retRuby, ".いち.ご.いち.え");
		});
			it('test_putTxtRb_grp0', ()=> {
				rbSpl.putTxtRb("一期一会", "いち ご いち え");
				assert.equal(retText, ".一.期.一.会");
				assert.equal(retRuby, ".いち.ご.いち.え");
			});
		it('test_putTxt_grp1', ()=> {
			rbSpl.putTxt("一期一会《いち ご いち え》冬虫夏草《とう ちゅう か そう》");
			assert.equal(retText, ".一.期.一.会.冬.虫.夏.草");
			assert.equal(retRuby, ".いち.ご.いち.え.とう.ちゅう.か.そう");
		});

		it('test_putTxt_sp_grp0', ()=> {
			rbSpl.putTxt("　一期一会《いち ご いち え》");
			assert.equal(retText, ".　.一.期.一.会");
			assert.equal(retRuby, "..いち.ご.いち.え");
		});
			it('test_putTxtRb_sp_grp0', ()=> {
				rbSpl.putTxtRb("　一期一会", "いち ご いち え");
				assert.equal(retText, ".　.一.期.一.会");
				assert.equal(retRuby, ".いち.ご.いち.え.");
			});
		it('test_putTxt_sp_grp1', ()=> {
			rbSpl.putTxt("　一期一会《いち ご いち え》　冬虫夏草《とう ちゅう か そう》");
			assert.equal(retText, ".　.一.期.一.会.　.冬.虫.夏.草");
			assert.equal(retRuby, "..いち.ご.いち.え..とう.ちゅう.か.そう");
		});

		it('test_putTxt_sp_grp10', ()=> {
			rbSpl.putTxt("｜未知の無生物だけに作用する力《unrecognized physical power able to effect inanimate bodies》");
			assert.equal(retText, ".未.知.の.無.生.物.だ.け.に.作.用.す.る.力");
			assert.equal(retRuby, ".unrecognized.physical.power.able.to.effect.inanimate.bodies......");
		});
		it('test_putTxt_sp_grp11', ()=> {
			rbSpl.putTxt("｜未知の無生物だけに作用する力《unrecognized	physical	power	able	to	effect	inanimate	bodies》");
			assert.equal(retText, ".未知の無生物だけに作用する力");
			assert.equal(retRuby, ".unrecognized physical power able to effect inanimate bodies");
		});
/*		it('test_putTxt_sp_URLUnEsc', ()=> {
			rs.putTxt("｜未知の無生物だけに作用する力《unrecognized%20physical%20power%20able%20to%20effect%20inanimate%20bodies》");
			assert.equal(retText, ".未知の無生物だけに作用する力");
			assert.equal(retRuby, ".unrecognized physical power able to effect inanimate bodies");
		});
			it('test_putTxt_URLUnEsc', ()=> {
				rs.putTxt("％《%25》縦棒《%ef%bd%9c》二重山括弧《%e3%80%8axxx%e3%80%8b》");
				assert.equal(retText, ".％.縦棒.二重山括弧");
				assert.equal(retRuby, ".%.｜.《xxx》");
			});
		// RubySpliterから外に出したのでテスト不能
*/
		it('test_putTxt_sp_grp12', ()=> {
			rbSpl.putTxt("｜ケセラセラ《Que Sera, Sera》");
			assert.equal(retText, ".ケ.セ.ラ.セ.ラ");
			assert.equal(retRuby, ".Que.Sera,.Sera..");
		});
		it('test_putTxt_sp_grp13', ()=> {
			rbSpl.putTxt("｜ケセラセラ《Que	Sera,	Sera》");
			assert.equal(retText, ".ケセラセラ");
			assert.equal(retRuby, ".Que Sera, Sera");
		});
			it('test_putTxt_sp_grp13_b', ()=> {
				rbSpl.putTxt("｜ケセラセラ《Que\tSera,\tSera》");
				assert.equal(retText, ".ケセラセラ");
				assert.equal(retRuby, ".Que Sera, Sera");
			});
/*		it('test_putTxt_sp_grp14', ()=> {
			rs.putTxt("｜ケセラセラ《Que%20Sera,%20Sera》");
			assert.equal(retText, ".ケセラセラ");
			assert.equal(retRuby, ".Que Sera, Sera");
		});
		// RubySpliterから外に出したのでテスト不能
*/
/*		it('test_putTxt_sp_grp13', ()=> {
			rs.putTxt("｜未知の無生物だけに作用する力《unrecognized\\ physical\\ power\\ able\\ to\\ effect\\ inanimate\\ bodies》");
			assert.equal(retText, ".未知の無生物だけに作用する力");
			assert.equal(retRuby, ".unrecognized physical power able to effect inanimate bodies");
		});
		// まぁいらんか、やめとこ。特殊な文字が増えるし
*/

		it('test_putTxt_I_2t_4r', ()=> {
			rbSpl.putTxt("｜剃刀《かみそり》");
			assert.equal(retText, ".剃刀");
			assert.equal(retRuby, ".かみそり");
		});
			it('test_putTxtRb_I_2t_4r', ()=> {
				rbSpl.putTxtRb("剃刀", "かみそり");
				assert.equal(retText, ".剃刀");
				assert.equal(retRuby, ".かみそり");
			});
		it('test_putTxt_I_2t_4r_1', ()=> {
			rbSpl.putTxt("安全｜剃刀《かみそり》を");
			assert.equal(retText, ".安.全.剃刀.を");
			assert.equal(retRuby, "...かみそり.");
		});

		it('test_putTxt_I_3t_5r', ()=> {
			rbSpl.putTxt("｜雷の指《ひげこがし》");
			assert.equal(retText, ".雷の指");
			assert.equal(retRuby, ".ひげこがし");
		});
			it('test_putTxtRb_I_3t_5r', ()=> {
				rbSpl.putTxtRb("雷の指", "ひげこがし");
				assert.equal(retText, ".雷の指");
				assert.equal(retRuby, ".ひげこがし");
			});
		it('test_putTxt_I_3t_5r_1', ()=> {
			rbSpl.putTxt("彼は｜雷の指《ひげこがし》を");
			assert.equal(retText, ".彼.は.雷の指.を");
			assert.equal(retRuby, "...ひげこがし.");
		});


		it('test_putTxt_sp_I_2t_4rA', ()=> {
			rbSpl.putTxt("　｜剃刀《かみそり》");
			assert.equal(retText, ".　.剃刀");
			assert.equal(retRuby, "..かみそり");
		});
		it('test_putTxt_sp_I_2t_4rB', ()=> {
			rbSpl.putTxt("｜　剃刀《かみそり》");
			assert.equal(retText, ".　剃刀");
			assert.equal(retRuby, ".かみそり");
		});
			it('test_putTxtRb_sp_I_2t_4rB', ()=> {
				rbSpl.putTxtRb("　剃刀", "かみそり");
				assert.equal(retText, ".　剃刀");
				assert.equal(retRuby, ".かみそり");
			});
		it('test_putTxt_sp_I_2t_4rC', ()=> {
			rbSpl.putTxt("｜剃　刀《かみそり》");
			assert.equal(retText, ".剃　刀");
			assert.equal(retRuby, ".かみそり");
		});
			it('test_putTxtRb_sp_I_2t_4rC', ()=> {
				rbSpl.putTxtRb("剃　刀", "かみそり");
				assert.equal(retText, ".剃　刀");
				assert.equal(retRuby, ".かみそり");
			});
		it('test_putTxt_sp_I_2t_4rD', ()=> {
			rbSpl.putTxt("｜剃刀　《かみそり》");
			assert.equal(retText, ".剃刀　");
			assert.equal(retRuby, ".かみそり");
		});
			it('test_putTxtRb_sp_I_2t_4rD', ()=> {
				rbSpl.putTxtRb("剃刀　", "かみそり");
				assert.equal(retText, ".剃刀　");
				assert.equal(retRuby, ".かみそり");
			});
		it('test_putTxt_sp_I_2t_4r_1A', ()=> {
			rbSpl.putTxt("　安全｜剃刀《かみそり》を");
			assert.equal(retText, ".　.安.全.剃刀.を");
			assert.equal(retRuby, "....かみそり.");
		});
		it('test_putTxt_sp_I_2t_4r_1B', ()=> {
			rbSpl.putTxt("安　全｜剃刀《かみそり》を");
			assert.equal(retText, ".安.　.全.剃刀.を");
			assert.equal(retRuby, "....かみそり.");
		});
			it('test_putTxt_sp_I_2t_4r_1B2', ()=> {
				rbSpl.putTxt("あ安　全い｜剃刀《かみそり》を");
				assert.equal(retText, ".あ.安.　.全.い.剃刀.を");
				assert.equal(retRuby, "......かみそり.");
			});
			it('test_putTxt_sp_I_2t_4r_1B3', ()=> {
				rbSpl.putTxt("あ「とある科学　超電磁砲《121｜レールガン》」");
				assert.equal(retText, ".あ.「.と.あ.る.科.学.　.超電磁砲.」");
				assert.equal(retRuby, ".........121｜レールガン.");
			});
		it('test_putTxt_sp_I_2t_4r_1C', ()=> {
			rbSpl.putTxt("安全　｜剃刀《かみそり》を");
			assert.equal(retText, ".安.全.　.剃刀.を");
			assert.equal(retRuby, "....かみそり.");
		});
		it('test_putTxt_sp_I_2t_4r_1D', ()=> {
			rbSpl.putTxt("安全｜　剃刀《かみそり》を");
			assert.equal(retText, ".安.全.　剃刀.を");
			assert.equal(retRuby, "...かみそり.");
		});
		it('test_putTxt_sp_I_2t_4r_1E', ()=> {
			rbSpl.putTxt("安全｜剃　刀《かみそり》を");
			assert.equal(retText, ".安.全.剃　刀.を");
			assert.equal(retRuby, "...かみそり.");
		});
		it('test_putTxt_sp_I_2t_4r_1F', ()=> {
			rbSpl.putTxt("安全｜剃刀　《かみそり》を");
			assert.equal(retText, ".安.全.剃刀　.を");
			assert.equal(retRuby, "...かみそり.");
		});
		it('test_putTxt_sp_I_2t_4r_1G', ()=> {
			rbSpl.putTxt("安　全｜剃　刀《かみそり》を");
			assert.equal(retText, ".安.　.全.剃　刀.を");
			assert.equal(retRuby, "....かみそり.");
		});

		it('test_putTxt_sp_I_3t_5r', ()=> {
			rbSpl.putTxt("　｜雷の指《ひげこがし》");
			assert.equal(retText, ".　.雷の指");
			assert.equal(retRuby, "..ひげこがし");
		});
			it('test_putTxtRb_sp_I_3t_5r', ()=> {
				rbSpl.putTxtRb("　雷の指", "ひげこがし");
				assert.equal(retText, ".　雷の指");
				assert.equal(retRuby, ".ひげこがし");
			});
		it('test_putTxt_sp_I_3t_5r_1', ()=> {
			rbSpl.putTxt("　彼は｜雷の指《ひげこがし》を");
			assert.equal(retText, ".　.彼.は.雷の指.を");
			assert.equal(retRuby, "....ひげこがし.");
		});


		it('test_UnicodeKanji4Future_ベーステスト', ()=> {
			rbSpl.putTxt("彼は雷の指《ひげこがし》を");
			assert.equal(retText, ".彼.は.雷.の.指.を");
			assert.equal(retRuby, ".....ひげこがし.");
		});
		it('test_UnicodeKanji4Future_漢数字ゼロ', ()=> {
			rbSpl.putTxt("彼は雷〇指《ひげこがし》を");
			assert.equal(retText, ".彼.は.雷〇指.を");
			assert.equal(retRuby, "...ひげこがし.");
		});
		it('test_UnicodeKanji4Future_漢数字ゼロ2', ()=> {
			rbSpl.putTxt("彼は雷〇指《ひげこがし》を");
			assert.equal(retText, ".彼.は.雷\u3007指.を");
			assert.equal(retRuby, "...ひげこがし.");
		});
		it('test_UnicodeKanji4Future_CJK統合漢字拡張A', ()=> {
			rbSpl.putTxt("彼は雷㐂指《ひげこがし》を");
			assert.equal(retText, ".彼.は.雷㐂指.を");
			assert.equal(retRuby, "...ひげこがし.");
		});
		it('test_UnicodeKanji4Future_CJK統合漢字', ()=> {
			rbSpl.putTxt("彼は雷一指《ひげこがし》を");
			assert.equal(retText, ".彼.は.雷一指.を");
			assert.equal(retRuby, "...ひげこがし.");
		});
		it('test_UnicodeKanji4Future_CJK互換漢字', ()=> {
			rbSpl.putTxt("彼は雷\uF900指《ひげこがし》を");
			assert.equal(retText, ".彼.は.雷\uF900指.を");
			assert.equal(retRuby, "...ひげこがし.");
		});
		it('test_UnicodeKanji4Future_JK統合漢字拡張B', ()=> {
			rbSpl.putTxt("彼は雷𠀋指《ひげこがし》を");
			assert.equal(retText, ".彼.は.雷𠀋指.を");
			assert.equal(retRuby, "...ひげこがし.");
		});
		it('test_UnicodeKanji4Future_CJK互換漢字補助', ()=> {
			rbSpl.putTxt("彼は雷你指《ひげこがし》を");
			assert.equal(retText, ".彼.は.雷你指.を");
			assert.equal(retRuby, "...ひげこがし.");
		});



		it('test_不具合20101230_0', ()=> {
			rbSpl.putTxt("　御機嫌《ご き げん》｜麗し《うるわ　》ゅう。");
			assert.equal(retText, ".　.御.機.嫌.麗し.ゅ.う.。");
			assert.equal(retRuby, "..ご.き.げん.うるわ　...");
		});
		it('test_不具合20101230_0b', ()=> {
			rbSpl.putTxt("麗し《うるわ　》ゅう。");
			assert.equal(retText, ".麗し.ゅ.う.。");
			assert.equal(retRuby, ".うるわ　...");
		});
		it('test_不具合20101230_1', ()=> {
			rbSpl.putTxt("案内《あない》仕り《つかまつ》");
			assert.equal(retText, ".案内.仕り");
			assert.equal(retRuby, ".あない.つかまつ");
		});

		it('test_不具合20110108_0_ok', ()=> {
			rbSpl.putTxt("｜a《A》｜b《き》");
			assert.equal(retText, ".a.b");
			assert.equal(retRuby, ".A.き");
		});
		it('test_不具合20110108_0', ()=> {
			rbSpl.putTxt("a《A》b《き》");
			assert.equal(retText, ".a.b");
			assert.equal(retRuby, ".A.き");
		});

		it('test_不具合20110108_1', ()=> {
			rbSpl.putTxt("a《A》う《き》");
			assert.equal(retText, ".a.う");
			assert.equal(retRuby, ".A.き");
		});

		it('test_不具合20110108_2_ok', ()=> {
			rbSpl.putTxt("御機嫌《RUBY》");
			assert.equal(retText, ".御機嫌");
			assert.equal(retRuby, ".RUBY");
		});
		it('test_不具合20110108_2', ()=> {
			rbSpl.putTxt("御機嫌《center｜RUBY》");
			assert.equal(retText, ".御機嫌");
			assert.equal(retRuby, ".center｜RUBY");
		});

		it('test_不具合20140103_0_ng', ()=> {
			rbSpl.putTxt("「はい輪島御児《わ じま み こ》神社でございます。はい。初宮参り《はつ みや まい 》のご予約ですね」");
			assert.equal(retText, ".「.は.い.輪.島.御.児.神.社.で.ご.ざ.い.ま.す.。.は.い.。.初.宮.参.り.の.ご.予.約.で.す.ね.」");
			assert.equal(retRuby, "....わ.じま.み.こ.............はつ.みや.まい.........");
		});
		it('test_不具合20140103_1_ok', ()=> {
			rbSpl.putTxt("「はい輪島御児《わ じま み こ》神社でございます。はい。｜初宮参り《はつ みや まい 》のご予約ですね」");
			assert.equal(retText, ".「.は.い.輪.島.御.児.神.社.で.ご.ざ.い.ま.す.。.は.い.。.初.宮.参.り.の.ご.予.約.で.す.ね.」");
			assert.equal(retRuby, "....わ.じま.み.こ.............はつ.みや.まい.........");
		});
		it('test_不具合20140103_2_ng', ()=> {
			rbSpl.putTxt("「初宮参り《はつ みや まい 》」");
			assert.equal(retText, ".「.初.宮.参.り.」");
			assert.equal(retRuby, "..はつ.みや.まい..");
		});
		it('test_不具合20140103_3_ok', ()=> {
			rbSpl.putTxt("「｜初宮参り《はつ みや まい 》」");
			assert.equal(retText, ".「.初.宮.参.り.」");
			assert.equal(retRuby, "..はつ.みや.まい..");
		});

		it('test_不具合20150625_0', ()=> {
			rbSpl.putTxt('鳥山石燕《とりやませきえん》　『｜今昔 《こんじゃく》百鬼拾遺《ひゃっきしゅうい》』下之巻 雨');
			assert.equal(retText, '.鳥山石燕.　.『.今昔 .百鬼拾遺.』.下.之.巻. .雨');
			assert.equal(retRuby, '.とりやませきえん...こんじゃく.ひゃっきしゅうい......');
		});
		it('test_不具合20150625_1', ()=> {
			rbSpl.putTxt("　雷\n");
			assert.equal(retText, ".　.雷.\n");
			assert.equal(retRuby, "...");
		});
		it('test_不具合20150625_2', ()=> {
			rbSpl.putTxt("雷\n雷\n雷\n雷\n");
			assert.equal(retText, ".雷.\n.雷.\n.雷.\n.雷.\n");
			assert.equal(retRuby, "........");
		});
		it('test_不具合20150625_3', ()=> {
			rbSpl.putTxt("雷\n火《ひ》\n");
			assert.equal(retText, ".雷.\n.火.\n");
			assert.equal(retRuby, "...ひ.");
		});

		it('test_不具合20150711_0', ()=> {
			rbSpl.putTxt("｜曰《いはく》");
			assert.equal(retText, ".曰");
			assert.equal(retRuby, ".いはく");
		});
		it('test_不具合20150711_1', ()=> {
			rbSpl.putTxt("｜曰　《いはく》");
			assert.equal(retText, ".曰　");
			assert.equal(retRuby, ".いはく");
		});
		it('test_不具合20150711_2', ()=> {
			rbSpl.putTxt("｜　曰《いはく》");
			assert.equal(retText, ".　曰");
			assert.equal(retRuby, ".いはく");
		});
		it('test_不具合20150711_3', ()=> {
			rbSpl.putTxt("｜曰 《いはく》");
			assert.equal(retText, ".曰 ");
			assert.equal(retRuby, ".いはく");
		});
		it('test_不具合20150711_4', ()=> {
			rbSpl.putTxt("｜ 曰《いはく》");
			assert.equal(retText, ". 曰");
			assert.equal(retRuby, ".いはく");
		});
		it('test_不具合20150711_10', ()=> {
			rbSpl.putTxt('　論語《ろんごに》｜曰 《いはく》「郷人《けうひと》儺朝服而立《のおにやらいにてうふ》');
			assert.equal(retText, '.　.論語.曰 .「.郷人.儺朝服而立');
			assert.equal(retRuby, '..ろんごに.いはく..けうひと.のおにやらいにてうふ');
		});


		it('test_putTxt_Through_2t_2r', ()=> {
			rbSpl.putTxt("《い つ》");
			assert.equal(retText, ".《.い. .つ.》");
			assert.equal(retRuby, ".....");
		});


		it('test_サロゲートペア', ()=> {
			rbSpl.putTxt('🌈');
			assert.equal(retText, '.🌈');
			assert.equal(retRuby, '.');
		});
		it('test_サロゲートペア2', ()=> {
			rbSpl.putTxt('🌈𩸽🌕');
			assert.equal(retText, '.🌈.𩸽.🌕');
			assert.equal(retRuby, '...');
		});
		it('test_サロゲートペア10', ()=> {
			rbSpl.putTxt('　｜🌈《にじ》　');
			assert.equal(retText, '.　.🌈.　');
			assert.equal(retRuby, '..にじ.');
		});
		it('test_サロゲートペア11', ()=> {
			rbSpl.putTxt('　🌈《にじ》');
			assert.equal(retText, '.　.🌈');
			assert.equal(retRuby, '..にじ');
		});
		it('test_サロゲートペア12', ()=> {
			rbSpl.putTxt('｜🌈𩸽🌕《にじ ほっけ まんげつ》');
			assert.equal(retText, '.🌈.𩸽.🌕');
			assert.equal(retRuby, '.にじ.ほっけ.まんげつ');
		});

		it('test_｜｜《》', ()=> {
			rbSpl.putTxt('｜｜　論語《ろんごに》');
			assert.equal(retText, '.｜　論語');
			assert.equal(retRuby, '.ろんごに');
		});
		it('test_｜《《》', ()=> {
			rbSpl.putTxt('｜《　論語《ろんごに》');
			assert.equal(retText, '.｜.《.　.論語');
			assert.equal(retRuby, '....ろんごに');
		});
			it('test_｜｜《《》', ()=> {
				rbSpl.putTxt('｜｜　《論語《ろんごに》');
				assert.equal(retText, '.｜　');
				assert.equal(retRuby, '.論語《ろんごに');
			});
		it('test_esc｜', ()=> {
			rbSpl.putTxt('\\｜｜　論語《ろんごに》');	// 「\\」で一文字
			assert.equal(retText, '.\\.｜　論語');
			assert.equal(retRuby, '..ろんごに');
		});
			it('test_escDefEsc｜', ()=> {
				RubySpliter.setEscape('\\');
				rbSpl.putTxt('\\｜｜　論語《ろんごに》');	// 「\\」で一文字
				assert.equal(retText, '.｜.　論語');
				assert.equal(retRuby, '..ろんごに');
			});
			it('test_escDefEsc¥｜', ()=> {
				RubySpliter.setEscape('¥');
				rbSpl.putTxt('¥｜｜　論語《ろんごに》');	// 「¥」で一文字
				assert.equal(retText, '.｜.　論語');
				assert.equal(retRuby, '..ろんごに');
			});
			it('test_escDefEsc\\2｜', ()=> {
				RubySpliter.setEscape('\\');
				rbSpl.putTxt('\\｜｜　論語《ろんごに》\\｜　曰《いはく》');	// 「\\」で一文字
				assert.equal(retText, '.｜.　論語.｜.　.曰');
				assert.equal(retRuby, '..ろんごに...いはく');
			});
			it('test_escDefEsc\\No¥｜', ()=> {
				RubySpliter.setEscape('\\');
				rbSpl.putTxt('\\｜｜　論語《ろんごに》¥｜　曰《いはく》');	// 「\\」で一文字
				assert.equal(retText, '.｜.　論語.¥.　曰');
				assert.equal(retRuby, '..ろんごに..いはく');
			});
			it('test_escDefEsc¥No\\｜', ()=> {
				RubySpliter.setEscape('¥');
				rbSpl.putTxt('\\｜｜　論語《ろんごに》¥｜　曰《いはく》');	// 「\\」で一文字
				assert.equal(retText, '.\\.｜　論語.｜.　.曰');
				assert.equal(retRuby, '..ろんごに...いはく');
			});
		it('test_esc｜2', ()=> {
			rbSpl.putTxt('\\｜　論語《ろんごに》');
			assert.equal(retText, '.\\.　論語');
			assert.equal(retRuby, '..ろんごに');
		});
			it('test_esc｜2DefEsc', ()=> {
				RubySpliter.setEscape('\\');
				rbSpl.putTxt('\\｜　論語《ろんごに》');
				assert.equal(retText, '.｜.　.論語');
				assert.equal(retRuby, '...ろんごに');
			});
			it('test_esc｜2DefEsc¥', ()=> {
				RubySpliter.setEscape('¥');
				rbSpl.putTxt('¥｜　論語《ろんごに》');
				assert.equal(retText, '.｜.　.論語');
				assert.equal(retRuby, '...ろんごに');
			});
		it('test_｜esc《》', ()=> {
			rbSpl.putTxt('｜\\　論語《ろんごに》');	// 「\\」で一文字
			assert.equal(retText, '.\\　論語');
			assert.equal(retRuby, '.ろんごに');
		});
			it('test_escesc｜《》', ()=> {
				rbSpl.putTxt('\\\\｜　論語《ろんごに》');	// 「\\」で一文字
				assert.equal(retText, '.\\.\\.　論語');
				assert.equal(retRuby, '...ろんごに');
			});
			it('test_escescDefEsc｜《》', ()=> {
				RubySpliter.setEscape('\\');
				rbSpl.putTxt('\\\\｜　論語《ろんごに》');	// 「\\」で一文字
				assert.equal(retText, '.\\.　論語');
				assert.equal(retRuby, '..ろんごに');
			});
			it('test_escescDefEsc¥｜《》', ()=> {
				RubySpliter.setEscape('¥');
				rbSpl.putTxt('¥¥｜　論語《ろんごに》');	// 「¥」で一文字
				assert.equal(retText, '.¥.　論語');
				assert.equal(retRuby, '..ろんごに');
			});

		it('test_esc&｜《》', ()=> {
			rbSpl.putTxt('\\&　論語《ろんごに》');	// 「\\」で一文字
			assert.equal(retText, '.\\.&.　.論語');
			assert.equal(retRuby, '....ろんごに');
		});
		it('test_esc[｜《》', ()=> {
			rbSpl.putTxt('\\[　論語《ろんごに》');	// 「\\」で一文字
			assert.equal(retText, '.\\.[.　.論語');
			assert.equal(retRuby, '....ろんごに');
		});
		it('test_esc;｜《》', ()=> {
			rbSpl.putTxt('\\;　論語《ろんごに》');	// 「\\」で一文字
			assert.equal(retText, '.\\.;.　.論語');
			assert.equal(retRuby, '....ろんごに');
		});
		it('test_esc*｜《》', ()=> {
			rbSpl.putTxt('\\*　論語《ろんごに》');	// 「\\」で一文字
			assert.equal(retText, '.\\.*.　.論語');
			assert.equal(retRuby, '....ろんごに');
		});
		it('test_esc&DefEsc｜《》', ()=> {
			RubySpliter.setEscape('\\');
			rbSpl.putTxt('\\&　論語《ろんごに》');	// 「\\」で一文字
			assert.equal(retText, '.&.　.論語');
			assert.equal(retRuby, '...ろんごに');
		});
		it('test_esc[DefEsc｜《》', ()=> {
			RubySpliter.setEscape('\\');
			rbSpl.putTxt('\\[　論語《ろんごに》');	// 「\\」で一文字
			assert.equal(retText, '.[.　.論語');
			assert.equal(retRuby, '...ろんごに');
		});
		it('test_esc;DefEsc｜《》', ()=> {
			RubySpliter.setEscape('\\');
			rbSpl.putTxt('\\;　論語《ろんごに》');	// 「\\」で一文字
			assert.equal(retText, '.;.　.論語');
			assert.equal(retRuby, '...ろんごに');
		});
		it('test_esc*DefEsc｜《》', ()=> {
			RubySpliter.setEscape('\\');
			rbSpl.putTxt('\\*　論語《ろんごに》');	// 「\\」で一文字
			assert.equal(retText, '.*.　.論語');
			assert.equal(retRuby, '...ろんごに');
		});
		it('test_esc&DefEsc¥｜《》', ()=> {
			RubySpliter.setEscape('¥');
			rbSpl.putTxt('¥&　論語《ろんごに》');
			assert.equal(retText, '.&.　.論語');
			assert.equal(retRuby, '...ろんごに');
		});
		it('test_esc[DefEsc¥｜《》', ()=> {
			RubySpliter.setEscape('¥');
			rbSpl.putTxt('¥[　論語《ろんごに》');
			assert.equal(retText, '.[.　.論語');
			assert.equal(retRuby, '...ろんごに');
		});
		it('test_esc;DefEsc¥｜《》', ()=> {
			RubySpliter.setEscape('¥');
			rbSpl.putTxt('¥;　論語《ろんごに》');
			assert.equal(retText, '.;.　.論語');
			assert.equal(retRuby, '...ろんごに');
		});
		it('test_esc*DefEsc¥｜《》', ()=> {
			RubySpliter.setEscape('¥');
			rbSpl.putTxt('¥*　論語《ろんごに》');
			assert.equal(retText, '.*.　.論語');
			assert.equal(retRuby, '...ろんごに');
		});

	});

});
