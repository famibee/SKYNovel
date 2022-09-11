/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2022 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {RubySpliter} from '../src/sn/RubySpliter';
import {IPutCh} from '../src/sn/CmnInterface';

let	rbSpl	: RubySpliter;
let	retText	= '';
let	retRuby	= '';
beforeEach(()=> {
	rbSpl = new RubySpliter();
	rbSpl.init(putCh);
	RubySpliter.setEscape('');
	retText	= '';
	retRuby	= '';
});
	let putCh : IPutCh = (ch, ruby)=> {
		retText = retText + '.'+ ch;
		retRuby = retRuby + '.'+ ruby;
	}


// RubySpliter
it('test_putTxt_1t_0r',()=> {
	rbSpl.putTxt("雷");
	expect(retText).toBe(".雷");
	expect(retRuby).toBe(".");
});
it('test_putTxt_1t_1r',()=> {
	rbSpl.putTxt("火《ひ》");
	expect(retText).toBe(".火");
	expect(retRuby).toBe(".ひ");
});
it('test_putTxt_1t_2r',()=> {
	rbSpl.putTxt("水《みず》");
	expect(retText).toBe(".水");
	expect(retRuby).toBe(".みず");
});
it('test_putTxt_1t_3r',()=> {
	rbSpl.putTxt("緑《みどり》");
	expect(retText).toBe(".緑");
	expect(retRuby).toBe(".みどり");
});
it('test_putTxt_1t_4r',()=> {
	rbSpl.putTxt("雷《いかずち》");
	expect(retText).toBe(".雷");
	expect(retRuby).toBe(".いかずち");
});
	it('test_putTxtRb_1t_0r',()=> {
		rbSpl.putTxtRb("雷", "");
		expect(retText).toBe(".雷");
		expect(retRuby).toBe(".");
	});
	it('test_putTxtRb_1t_1r',()=> {
		rbSpl.putTxtRb("火", "ひ");
		expect(retText).toBe(".火");
		expect(retRuby).toBe(".ひ");
	});
	it('test_putTxtRb_1t_2r',()=> {
		rbSpl.putTxtRb("水", "みず");
		expect(retText).toBe(".水");
		expect(retRuby).toBe(".みず");
	});
	it('test_putTxtRb_1t_3r',()=> {
		rbSpl.putTxtRb("緑", "みどり");
		expect(retText).toBe(".緑");
		expect(retRuby).toBe(".みどり");
	});
	it('test_putTxtRb_1t_4r',()=> {
		rbSpl.putTxtRb("雷", "いかずち");
		expect(retText).toBe(".雷");
		expect(retRuby).toBe(".いかずち");
	});

it('test_putTxt_sp_1t_0r',()=> {
	rbSpl.putTxt("　雷");
	expect(retText).toBe(".　.雷");
	expect(retRuby).toBe("..");
});
it('test_putTxt_sp_1t_1r',()=> {
	rbSpl.putTxt("　火《ひ》");
	expect(retText).toBe(".　.火");
	expect(retRuby).toBe("..ひ");
});
it('test_putTxt_sp_1t_2r',()=> {
	rbSpl.putTxt("　水《みず》");
	expect(retText).toBe(".　.水");
	expect(retRuby).toBe("..みず");
});
it('test_putTxt_sp_1t_3r',()=> {
	rbSpl.putTxt("　緑《みどり》");
	expect(retText).toBe(".　.緑");
	expect(retRuby).toBe("..みどり");
});
it('test_putTxt_sp_1t_4r',()=> {
	rbSpl.putTxt("　雷《いかずち》");
	expect(retText).toBe(".　.雷");
	expect(retRuby).toBe("..いかずち");
});
	it('test_putTxtRb_sp_1t_0r',()=> {
		rbSpl.putTxtRb("　雷", "");
		expect(retText).toBe(".　雷");
		expect(retRuby).toBe(".");
	});
	it('test_putTxtRb_sp_1t_1r',()=> {
		rbSpl.putTxtRb("　火", "ひ");
		expect(retText).toBe(".　火");
		expect(retRuby).toBe(".ひ");
	});
	it('test_putTxtRb_sp_1t_2r',()=> {
		rbSpl.putTxtRb("　水", "みず");
		expect(retText).toBe(".　水");
		expect(retRuby).toBe(".みず");
	});
	it('test_putTxtRb_sp_1t_3r',()=> {
		rbSpl.putTxtRb("　緑", "みどり");
		expect(retText).toBe(".　緑");
		expect(retRuby).toBe(".みどり");
	});
	it('test_putTxtRb_sp_1t_4r',()=> {
		rbSpl.putTxtRb("　雷", "いかずち");
		expect(retText).toBe(".　雷");
		expect(retRuby).toBe(".いかずち");
	});
it('test_putTxt_sp2_1t_0r',()=> {
	rbSpl.putTxt("　　雷");
	expect(retText).toBe(".　.　.雷");
	expect(retRuby).toBe("...");
});
	it('test_putTxtRb_sp2_1t_0r',()=> {
		rbSpl.putTxtRb("　　雷", "");
		expect(retText).toBe(".　　雷");
		expect(retRuby).toBe(".");
	});


it('test_putTxt_2t_2r',()=> {
	rbSpl.putTxt("何時《い つ》");
	expect(retText).toBe(".何.時");
	expect(retRuby).toBe(".い.つ");
});
it('test_putTxt_2t_4r',()=> {
	rbSpl.putTxt("一応《いちおう》");
	expect(retText).toBe(".一応");
	expect(retRuby).toBe(".いちおう");
});
it('test_putTxt_2t_6r',()=> {
	rbSpl.putTxt("夢幻《ゆめまぼろし》");
	expect(retText).toBe(".夢幻");
	expect(retRuby).toBe(".ゆめまぼろし");
});
	it('test_putTxtRb_2t_2r',()=> {
		rbSpl.putTxtRb("何時", "い つ");
		expect(retText).toBe(".何.時");
		expect(retRuby).toBe(".い.つ");
	});
	it('test_putTxtRb_2t_4r',()=> {
		rbSpl.putTxtRb("一応", "いちおう");
		expect(retText).toBe(".一応");
		expect(retRuby).toBe(".いちおう");
	});
	it('test_putTxtRb_2t_6r',()=> {
		rbSpl.putTxtRb("夢幻", "ゆめまぼろし");
		expect(retText).toBe(".夢幻");
		expect(retRuby).toBe(".ゆめまぼろし");
	});

it('test_putTxt_sp_2t_2r',()=> {
	rbSpl.putTxt("　何時《い つ》");
	expect(retText).toBe(".　.何.時");
	expect(retRuby).toBe("..い.つ");
});
it('test_putTxt_sp_2t_4r',()=> {
	rbSpl.putTxt("　一応《いちおう》");
	expect(retText).toBe(".　.一応");
	expect(retRuby).toBe("..いちおう");
});
it('test_putTxt_sp_2t_6r',()=> {
	rbSpl.putTxt("　夢幻《ゆめまぼろし》");
	expect(retText).toBe(".　.夢幻");
	expect(retRuby).toBe("..ゆめまぼろし");
});
	it('test_putTxtRb_sp_2t_2r',()=> {
		rbSpl.putTxtRb("　何時", "い つ");
		expect(retText).toBe(".　.何.時");
		expect(retRuby).toBe(".い.つ.");
	});
	it('test_putTxtRb_sp_2t_4r',()=> {
		rbSpl.putTxtRb("　一応", "いちおう");
		expect(retText).toBe(".　一応");
		expect(retRuby).toBe(".いちおう");
	});
	it('test_putTxtRb_sp_2t_6r',()=> {
		rbSpl.putTxtRb("　夢幻", "ゆめまぼろし");
		expect(retText).toBe(".　夢幻");
		expect(retRuby).toBe(".ゆめまぼろし");
	});


// 拡張属性文法
it('test_putTxt_1t_1r_extension_empty',()=> {
	rbSpl.putTxt("火《｜ひ》");
	expect(retText).toBe(".火");
	expect(retRuby).toBe(".｜ひ");
});
it('test_putTxt_1t_2r_extension_empty',()=> {
	rbSpl.putTxt("水《｜みず》");
	expect(retText).toBe(".水");
	expect(retRuby).toBe(".｜みず");
});
it('test_putTxt_1t_3r_extension_empty',()=> {
	rbSpl.putTxt("緑《｜みどり》");
	expect(retText).toBe(".緑");
	expect(retRuby).toBe(".｜みどり");
});
it('test_putTxt_1t_4r_extension_empty',()=> {
	rbSpl.putTxt("雷《｜いかずち》");
	expect(retText).toBe(".雷");
	expect(retRuby).toBe(".｜いかずち");
});
it('test_putTxt_1t_1r_extension',()=> {
	rbSpl.putTxt("火《left｜ひ》");
	expect(retText).toBe(".火");
	expect(retRuby).toBe(".left｜ひ");
});
it('test_putTxt_1t_2r_extension',()=> {
	rbSpl.putTxt("水《left｜みず》");
	expect(retText).toBe(".水");
	expect(retRuby).toBe(".left｜みず");
});
it('test_putTxt_1t_3r_extension',()=> {
	rbSpl.putTxt("緑《left｜みどり》");
	expect(retText).toBe(".緑");
	expect(retRuby).toBe(".left｜みどり");
});
it('test_putTxt_1t_4r_extension',()=> {
	rbSpl.putTxt("雷《left｜いかずち》");
	expect(retText).toBe(".雷");
	expect(retRuby).toBe(".left｜いかずち");
});

it('test_putTxt_2t_2r_extension_empty',()=> {
	rbSpl.putTxt("何時《｜い つ》");
	expect(retText).toBe(".何.時");
	expect(retRuby).toBe(".｜い.つ");
});
it('test_putTxt_2t_4r_extension_empty',()=> {
	rbSpl.putTxt("一応《｜いちおう》");
	expect(retText).toBe(".一応");
	expect(retRuby).toBe(".｜いちおう");
});
it('test_putTxt_2t_6r_extension_empty',()=> {
	rbSpl.putTxt("夢幻《｜ゆめまぼろし》");
	expect(retText).toBe(".夢幻");
	expect(retRuby).toBe(".｜ゆめまぼろし");
});
it('test_putTxt_2t_2r_extension',()=> {
	rbSpl.putTxt("何時《left｜い つ》");
	expect(retText).toBe(".何.時");
	expect(retRuby).toBe(".left｜い.つ");
});
it('test_putTxt_2t_4r_extension',()=> {
	rbSpl.putTxt("一応《left｜いちおう》");
	expect(retText).toBe(".一応");
	expect(retRuby).toBe(".left｜いちおう");
});
it('test_putTxt_2t_6r_extension',()=> {
	rbSpl.putTxt("夢幻《left｜ゆめまぼろし》");
	expect(retText).toBe(".夢幻");
	expect(retRuby).toBe(".left｜ゆめまぼろし");
});

it('test_putTxt_I_2t_4r_extension',()=> {
	rbSpl.putTxt("｜剃刀《left｜かみそり》");
	expect(retText).toBe(".剃刀");
	expect(retRuby).toBe(".left｜かみそり");
});
	it('test_putTxtRb_I_2t_4r_extension',()=> {
		rbSpl.putTxtRb("剃刀", "left｜かみそり");
		expect(retText).toBe(".剃刀");
		expect(retRuby).toBe(".left｜かみそり");
	});
it('test_putTxt_I_2t_4r_1_extension',()=> {
	rbSpl.putTxt("安全｜剃刀《left｜かみそり》を");
	expect(retText).toBe(".安.全.剃刀.を");
	expect(retRuby).toBe("...left｜かみそり.");
});
it('test_putTxt_I_3t_5r_extension',()=> {
	rbSpl.putTxt("｜雷の指《left｜ひげこがし》");
	expect(retText).toBe(".雷の指");
	expect(retRuby).toBe(".left｜ひげこがし");
});
	it('test_putTxtRb_I_3t_5r_extension',()=> {
		rbSpl.putTxtRb("雷の指", "left｜ひげこがし");
		expect(retText).toBe(".雷の指");
		expect(retRuby).toBe(".left｜ひげこがし");
	});
it('test_putTxt_I_3t_5r_1_extension',()=> {
	rbSpl.putTxt("彼は｜雷の指《left｜ひげこがし》を");
	expect(retText).toBe(".彼.は.雷の指.を");
	expect(retRuby).toBe("...left｜ひげこがし.");
});
it('test_putTxt_I_2t_4r_extension_empty',()=> {
	rbSpl.putTxt("｜剃刀《｜かみそり》");
	expect(retText).toBe(".剃刀");
	expect(retRuby).toBe(".｜かみそり");
});
	it('test_putTxtRb_I_2t_4r_extension_empty',()=> {
		rbSpl.putTxtRb("剃刀", "｜かみそり");
		expect(retText).toBe(".剃刀");
		expect(retRuby).toBe(".｜かみそり");
	});
it('test_putTxt_I_2t_4r_1_extension_empty',()=> {
	rbSpl.putTxt("安全｜剃刀《｜かみそり》を");
	expect(retText).toBe(".安.全.剃刀.を");
	expect(retRuby).toBe("...｜かみそり.");
});
it('test_putTxt_I_3t_5r_extension_empty',()=> {
	rbSpl.putTxt("｜雷の指《｜ひげこがし》");
	expect(retText).toBe(".雷の指");
	expect(retRuby).toBe(".｜ひげこがし");
});
	it('test_putTxtRb_I_3t_5r_extension_empty',()=> {
		rbSpl.putTxtRb("雷の指", "｜ひげこがし");
		expect(retText).toBe(".雷の指");
		expect(retRuby).toBe(".｜ひげこがし");
	});
it('test_putTxt_I_3t_5r_1_extension_empty',()=> {
	rbSpl.putTxt("彼は｜雷の指《｜ひげこがし》を");
	expect(retText).toBe(".彼.は.雷の指.を");
	expect(retRuby).toBe("...｜ひげこがし.");
});


it('test_putTxt_sesami1',()=> {
	rbSpl.putTxt("雷《*》");
	expect(retText).toBe(".雷");
	expect(retRuby).toBe(".center｜ヽ");
});
	it('test_putTxtRb_sesami1',()=> {
		rbSpl.putTxtRb("雷", "*");
		expect(retText).toBe(".雷");
		expect(retRuby).toBe(".center｜ヽ");
	});
it('test_putTxt_sesami1_chgmark',()=> {
	RubySpliter.setting({sesame:"点"})
	rbSpl.putTxt("雷《*》");
	expect(retText).toBe(".雷");
	expect(retRuby).toBe(".center｜点");

	RubySpliter.setting({sesame:"ヽ"})
});
it('test_putTxt_sesami1_1',()=> {
	rbSpl.putTxt("雷の指《*》を");
	expect(retText).toBe(".雷.の.指.を");
	expect(retRuby).toBe("...center｜ヽ.");
});
it('test_putTxt_sesami4',()=> {
	rbSpl.putTxt("｜だが断る《*》");
	expect(retText).toBe(".だ.が.断.る");
	expect(retRuby).toBe(".center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ");
});
	it('test_putTxtRb_sesami4',()=> {
		rbSpl.putTxtRb("だが断る", "*");
		expect(retText).toBe(".だ.が.断.る");
		expect(retRuby).toBe(".center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ");
	});

it('test_putTxt_sp_sesami1',()=> {
	rbSpl.putTxt("　雷《*》");
	expect(retText).toBe(".　.雷");
	expect(retRuby).toBe("..center｜ヽ");
});
	it('test_putTxtRb_sp_sesami1',()=> {
		rbSpl.putTxtRb("　雷", "*");
		expect(retText).toBe(".　.雷");
		expect(retRuby).toBe(".center｜ヽ.center｜ヽ");
	});
it('test_putTxt_sp_sesami1_chgmark',()=> {
	RubySpliter.setting({sesame:"点"})
	rbSpl.putTxt("　雷《*》");
	expect(retText).toBe(".　.雷");
	expect(retRuby).toBe("..center｜点");

	RubySpliter.setting({sesame:"ヽ"})
});
it('test_putTxt_sp_sesami1_1',()=> {
	rbSpl.putTxt("　雷神指《*》を");
	expect(retText).toBe(".　.雷.神.指.を");
	expect(retRuby).toBe("..center｜ヽ.center｜ヽ.center｜ヽ.");
});
it('test_putTxt_sp_sesami4',()=> {
	rbSpl.putTxt("｜　だが断る《*》");
	expect(retText).toBe(".　.だ.が.断.る");
	expect(retRuby).toBe(".center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ");
});
	it('test_putTxtRb_sp_sesami4',()=> {
		rbSpl.putTxtRb("　だが断る", "*");
		expect(retText).toBe(".　.だ.が.断.る");
		expect(retRuby).toBe(".center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ");
	});

it('test_putTxt_touten_sesami1',()=> {
	rbSpl.putTxt("、雷《*》");
	expect(retText).toBe(".、.雷");
	expect(retRuby).toBe("..center｜ヽ");
});
it('test_putTxt_touten_sesami1_1',()=> {
	rbSpl.putTxt("、雷神指《*》を");
	expect(retText).toBe(".、.雷.神.指.を");
	expect(retRuby).toBe("..center｜ヽ.center｜ヽ.center｜ヽ.");
});
it('test_putTxt_touten_sesami4',()=> {
	rbSpl.putTxt("｜、だが断る《*》");
	expect(retText).toBe(".、.だ.が.断.る");
	expect(retRuby).toBe(".center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ");
});
	it('test_putTxtRb_touten_sesami4',()=> {
		rbSpl.putTxtRb("、だが断る", "*");
		expect(retText).toBe(".、.だ.が.断.る");
		expect(retRuby).toBe(".center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ");
	});

it('test_putTxt_kuten_sesami1',()=> {
	rbSpl.putTxt("。雷《*》");
	expect(retText).toBe(".。.雷");
	expect(retRuby).toBe("..center｜ヽ");
});
it('test_putTxt_kuten_sesami1_1',()=> {
	rbSpl.putTxt("。雷神指《*》を");
	expect(retText).toBe(".。.雷.神.指.を");
	expect(retRuby).toBe("..center｜ヽ.center｜ヽ.center｜ヽ.");
});
it('test_putTxt_kuten_sesami4',()=> {
	rbSpl.putTxt("｜。だが断る《*》");
	expect(retText).toBe(".。.だ.が.断.る");
	expect(retRuby).toBe(".center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ");
});
	it('test_putTxtRb_kuten_sesami4',()=> {
		rbSpl.putTxtRb("。だが断る", "*");
		expect(retText).toBe(".。.だ.が.断.る");
		expect(retRuby).toBe(".center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ");
	});

it('test_putTxt_dash_sesami1',()=> {
	rbSpl.putTxt("─雷《*》");
	expect(retText).toBe(".─.雷");
	expect(retRuby).toBe("..center｜ヽ");
});
it('test_putTxt_dash_sesami1_1',()=> {
	rbSpl.putTxt("─雷神指《*》を");
	expect(retText).toBe(".─.雷.神.指.を");
	expect(retRuby).toBe("..center｜ヽ.center｜ヽ.center｜ヽ.");
});
it('test_putTxt_dash_sesami4',()=> {
	rbSpl.putTxt("｜─だが断る《*》");
	expect(retText).toBe(".─.だ.が.断.る");
	expect(retRuby).toBe(".center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ");
});
	it('test_putTxtRb_dash_sesami4',()=> {
		rbSpl.putTxtRb("─だが断る", "*");
		expect(retText).toBe(".─.だ.が.断.る");
		expect(retRuby).toBe(".center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ.center｜ヽ");
	});

it('test_putTxt_no_sesami1',()=> {
	rbSpl.putTxt("雷《*★》");
	expect(retText).toBe(".雷");
	expect(retRuby).toBe(".center｜★");
});
	it('test_putTxtRb_no_sesami1',()=> {
		rbSpl.putTxtRb("雷", "*★");
		expect(retText).toBe(".雷");
		expect(retRuby).toBe(".center｜★");
	});
it('test_putTxt_no_sesami1_chgmark',()=> {
	RubySpliter.setting({sesame:"点"})
	rbSpl.putTxt("雷《*★》");
	expect(retText).toBe(".雷");
	expect(retRuby).toBe(".center｜★");

	RubySpliter.setting({sesame:"ヽ"})
});
it('test_putTxt_no_sesami1_1',()=> {
	rbSpl.putTxt("雷の指《*★》を");
	expect(retText).toBe(".雷.の.指.を");
	expect(retRuby).toBe("...center｜★.");
});
it('test_putTxt_no_sesami4',()=> {
	rbSpl.putTxt("｜だが断る《*★》");
	expect(retText).toBe(".だ.が.断.る");
	expect(retRuby).toBe(".center｜★.center｜★.center｜★.center｜★");
});
	it('test_putTxtRb_no_sesami4',()=> {
		rbSpl.putTxtRb("だが断る", "*★");
		expect(retText).toBe(".だ.が.断.る");
		expect(retRuby).toBe(".center｜★.center｜★.center｜★.center｜★");
	});
it('test_putTxt_no_sesami5',()=> {
	rbSpl.putTxt("｜だが断る《*@》");
	expect(retText).toBe(".だ.が.断.る");
	expect(retRuby).toBe(".center｜@.center｜@.center｜@.center｜@");
});
	it('test_putTxtRb_no_sesami5',()=> {
		rbSpl.putTxtRb("だが断る", "*@");
		expect(retText).toBe(".だ.が.断.る");
		expect(retRuby).toBe(".center｜@.center｜@.center｜@.center｜@");
	});


it('test_putTxt_grp0',()=> {
	rbSpl.putTxt("一期一会《いち ご いち え》");
	expect(retText).toBe(".一.期.一.会");
	expect(retRuby).toBe(".いち.ご.いち.え");
});
	it('test_putTxtRb_grp0',()=> {
		rbSpl.putTxtRb("一期一会", "いち ご いち え");
		expect(retText).toBe(".一.期.一.会");
		expect(retRuby).toBe(".いち.ご.いち.え");
	});
it('test_putTxt_grp1',()=> {
	rbSpl.putTxt("一期一会《いち ご いち え》冬虫夏草《とう ちゅう か そう》");
	expect(retText).toBe(".一.期.一.会.冬.虫.夏.草");
	expect(retRuby).toBe(".いち.ご.いち.え.とう.ちゅう.か.そう");
});

it('test_putTxt_sp_grp0',()=> {
	rbSpl.putTxt("　一期一会《いち ご いち え》");
	expect(retText).toBe(".　.一.期.一.会");
	expect(retRuby).toBe("..いち.ご.いち.え");
});
	it('test_putTxtRb_sp_grp0',()=> {
		rbSpl.putTxtRb("　一期一会", "いち ご いち え");
		expect(retText).toBe(".　.一.期.一.会");
		expect(retRuby).toBe(".いち.ご.いち.え.");
	});
it('test_putTxt_sp_grp1',()=> {
	rbSpl.putTxt("　一期一会《いち ご いち え》　冬虫夏草《とう ちゅう か そう》");
	expect(retText).toBe(".　.一.期.一.会.　.冬.虫.夏.草");
	expect(retRuby).toBe("..いち.ご.いち.え..とう.ちゅう.か.そう");
});

it('test_putTxt_sp_grp10',()=> {
	rbSpl.putTxt("｜未知の無生物だけに作用する力《unrecognized physical power able to effect inanimate bodies》");
	expect(retText).toBe(".未.知.の.無.生.物.だ.け.に.作.用.す.る.力");
	expect(retRuby).toBe(".unrecognized.physical.power.able.to.effect.inanimate.bodies......");
});
it('test_putTxt_sp_URLUnEsc',()=> {
	rbSpl.putTxt("｜未知の無生物だけに作用する力《unrecognized%20physical%20power%20able%20to%20effect%20inanimate%20bodies》");
	expect(retText).toBe(".未知の無生物だけに作用する力");
	expect(retRuby).toBe(".unrecognized physical power able to effect inanimate bodies");
});
	it('test_putTxt_URLUnEsc',()=> {
		rbSpl.putTxt("％《%25》縦棒《%ef%bd%9c》二重山括弧《%e3%80%8axxx%e3%80%8b》");
		expect(retText).toBe(".％.縦棒.二重山括弧");
		expect(retRuby).toBe(".%.｜.《xxx》");
	});
it('test_putTxt_sp_grp14',()=> {
	rbSpl.putTxt("｜ケセラセラ《Que%20Sera,%20Sera》");
	expect(retText).toBe(".ケセラセラ");
	expect(retRuby).toBe(".Que Sera, Sera");
});
	it('test_putTxt_sp_grp14_b',()=> {
		rbSpl.putTxt("｜ケセラセラ《Que%20Sera,%20Sera》");
		expect(retText).toBe(".ケセラセラ");
		expect(retRuby).toBe(".Que Sera, Sera");
	});
/*
it('test_putTxt_sp_grp13',()=> {
	rs.putTxt("｜未知の無生物だけに作用する力《unrecognized\\ physical\\ power\\ able\\ to\\ effect\\ inanimate\\ bodies》");
	expect(retText).toBe(".未知の無生物だけに作用する力");
	expect(retRuby).toBe(".unrecognized physical power able to effect inanimate bodies");
});
// まぁいらんか、やめとこ。特殊な文字が増えるし
*/

it('test_putTxt_sp_grp15',()=> {
	rbSpl.putTxt(`｜　《link｜{":タグ名":"link","fn":"sf_Opening","style":"background-color: black; background-image: linear-gradient(45deg, black 0%, #ffb4b4 14%, white 28%, #b4b4ff 42%, yellow 56%, #ffb4b4 70%, #b4ffb4 84%, white 100%); border-radius: 8px; padding: 0 1rem;","style_hover":"outline: thick dashed red;","hint":"西九条vs奴ら","wait":"0","style_clicked":"background-color: black; background-image: linear-gradient(45deg, black 0%, #ffb4b4 14%, white 28%, #b4b4ff 42%, yellow 56%, #ffb4b4 70%, #b4ffb4 84%, white 100%); border-radius: 8px; padding: 0 1rem;"}》`);
	expect(retText).toBe(".　");
	expect(retRuby).toBe(`.link｜{":タグ名":"link","fn":"sf_Opening","style":"background-color: black; background-image: linear-gradient(45deg, black 0%, #ffb4b4 14%, white 28%, #b4b4ff 42%, yellow 56%, #ffb4b4 70%, #b4ffb4 84%, white 100%); border-radius: 8px; padding: 0 1rem;","style_hover":"outline: thick dashed red;","hint":"西九条vs奴ら","wait":"0","style_clicked":"background-color: black; background-image: linear-gradient(45deg, black 0%, #ffb4b4 14%, white 28%, #b4b4ff 42%, yellow 56%, #ffb4b4 70%, #b4ffb4 84%, white 100%); border-radius: 8px; padding: 0 1rem;"}`);
});


it('test_putTxt_I_2t_4r',()=> {
	rbSpl.putTxt("｜剃刀《かみそり》");
	expect(retText).toBe(".剃刀");
	expect(retRuby).toBe(".かみそり");
});
	it('test_putTxtRb_I_2t_4r',()=> {
		rbSpl.putTxtRb("剃刀", "かみそり");
		expect(retText).toBe(".剃刀");
		expect(retRuby).toBe(".かみそり");
	});
it('test_putTxt_I_2t_4r_1',()=> {
	rbSpl.putTxt("安全｜剃刀《かみそり》を");
	expect(retText).toBe(".安.全.剃刀.を");
	expect(retRuby).toBe("...かみそり.");
});

it('test_putTxt_I_3t_5r',()=> {
	rbSpl.putTxt("｜雷の指《ひげこがし》");
	expect(retText).toBe(".雷の指");
	expect(retRuby).toBe(".ひげこがし");
});
	it('test_putTxtRb_I_3t_5r',()=> {
		rbSpl.putTxtRb("雷の指", "ひげこがし");
		expect(retText).toBe(".雷の指");
		expect(retRuby).toBe(".ひげこがし");
	});
it('test_putTxt_I_3t_5r_1',()=> {
	rbSpl.putTxt("彼は｜雷の指《ひげこがし》を");
	expect(retText).toBe(".彼.は.雷の指.を");
	expect(retRuby).toBe("...ひげこがし.");
});


it('test_putTxt_sp_I_2t_4rA',()=> {
	rbSpl.putTxt("　｜剃刀《かみそり》");
	expect(retText).toBe(".　.剃刀");
	expect(retRuby).toBe("..かみそり");
});
it('test_putTxt_sp_I_2t_4rB',()=> {
	rbSpl.putTxt("｜　剃刀《かみそり》");
	expect(retText).toBe(".　剃刀");
	expect(retRuby).toBe(".かみそり");
});
	it('test_putTxtRb_sp_I_2t_4rB',()=> {
		rbSpl.putTxtRb("　剃刀", "かみそり");
		expect(retText).toBe(".　剃刀");
		expect(retRuby).toBe(".かみそり");
	});
it('test_putTxt_sp_I_2t_4rC',()=> {
	rbSpl.putTxt("｜剃　刀《かみそり》");
	expect(retText).toBe(".剃　刀");
	expect(retRuby).toBe(".かみそり");
});
	it('test_putTxtRb_sp_I_2t_4rC',()=> {
		rbSpl.putTxtRb("剃　刀", "かみそり");
		expect(retText).toBe(".剃　刀");
		expect(retRuby).toBe(".かみそり");
	});
it('test_putTxt_sp_I_2t_4rD',()=> {
	rbSpl.putTxt("｜剃刀　《かみそり》");
	expect(retText).toBe(".剃刀　");
	expect(retRuby).toBe(".かみそり");
});
	it('test_putTxtRb_sp_I_2t_4rD',()=> {
		rbSpl.putTxtRb("剃刀　", "かみそり");
		expect(retText).toBe(".剃刀　");
		expect(retRuby).toBe(".かみそり");
	});
it('test_putTxt_sp_I_2t_4r_1A',()=> {
	rbSpl.putTxt("　安全｜剃刀《かみそり》を");
	expect(retText).toBe(".　.安.全.剃刀.を");
	expect(retRuby).toBe("....かみそり.");
});
it('test_putTxt_sp_I_2t_4r_1B',()=> {
	rbSpl.putTxt("安　全｜剃刀《かみそり》を");
	expect(retText).toBe(".安.　.全.剃刀.を");
	expect(retRuby).toBe("....かみそり.");
});
	it('test_putTxt_sp_I_2t_4r_1B2',()=> {
		rbSpl.putTxt("あ安　全い｜剃刀《かみそり》を");
		expect(retText).toBe(".あ.安.　.全.い.剃刀.を");
		expect(retRuby).toBe("......かみそり.");
	});
	it('test_putTxt_sp_I_2t_4r_1B3',()=> {
		rbSpl.putTxt("あ「とある科学　超電磁砲《121｜レールガン》」");
		expect(retText).toBe(".あ.「.と.あ.る.科.学.　.超電磁砲.」");
		expect(retRuby).toBe(".........121｜レールガン.");
	});
it('test_putTxt_sp_I_2t_4r_1C',()=> {
	rbSpl.putTxt("安全　｜剃刀《かみそり》を");
	expect(retText).toBe(".安.全.　.剃刀.を");
	expect(retRuby).toBe("....かみそり.");
});
it('test_putTxt_sp_I_2t_4r_1D',()=> {
	rbSpl.putTxt("安全｜　剃刀《かみそり》を");
	expect(retText).toBe(".安.全.　剃刀.を");
	expect(retRuby).toBe("...かみそり.");
});
it('test_putTxt_sp_I_2t_4r_1E',()=> {
	rbSpl.putTxt("安全｜剃　刀《かみそり》を");
	expect(retText).toBe(".安.全.剃　刀.を");
	expect(retRuby).toBe("...かみそり.");
});
it('test_putTxt_sp_I_2t_4r_1F',()=> {
	rbSpl.putTxt("安全｜剃刀　《かみそり》を");
	expect(retText).toBe(".安.全.剃刀　.を");
	expect(retRuby).toBe("...かみそり.");
});
it('test_putTxt_sp_I_2t_4r_1G',()=> {
	rbSpl.putTxt("安　全｜剃　刀《かみそり》を");
	expect(retText).toBe(".安.　.全.剃　刀.を");
	expect(retRuby).toBe("....かみそり.");
});

it('test_putTxt_sp_I_3t_5r',()=> {
	rbSpl.putTxt("　｜雷の指《ひげこがし》");
	expect(retText).toBe(".　.雷の指");
	expect(retRuby).toBe("..ひげこがし");
});
	it('test_putTxtRb_sp_I_3t_5r',()=> {
		rbSpl.putTxtRb("　雷の指", "ひげこがし");
		expect(retText).toBe(".　雷の指");
		expect(retRuby).toBe(".ひげこがし");
	});
it('test_putTxt_sp_I_3t_5r_1',()=> {
	rbSpl.putTxt("　彼は｜雷の指《ひげこがし》を");
	expect(retText).toBe(".　.彼.は.雷の指.を");
	expect(retRuby).toBe("....ひげこがし.");
});


it('test_UnicodeKanji4Future_ベーステスト',()=> {
	rbSpl.putTxt("彼は雷の指《ひげこがし》を");
	expect(retText).toBe(".彼.は.雷.の.指.を");
	expect(retRuby).toBe(".....ひげこがし.");
});
it('test_UnicodeKanji4Future_漢数字ゼロ',()=> {
	rbSpl.putTxt("彼は雷〇指《ひげこがし》を");
	expect(retText).toBe(".彼.は.雷〇指.を");
	expect(retRuby).toBe("...ひげこがし.");
});
it('test_UnicodeKanji4Future_漢数字ゼロ2',()=> {
	rbSpl.putTxt("彼は雷〇指《ひげこがし》を");
	expect(retText).toBe(".彼.は.雷\u3007指.を");
	expect(retRuby).toBe("...ひげこがし.");
});
it('test_UnicodeKanji4Future_CJK統合漢字拡張A',()=> {
	rbSpl.putTxt("彼は雷㐂指《ひげこがし》を");
	expect(retText).toBe(".彼.は.雷㐂指.を");
	expect(retRuby).toBe("...ひげこがし.");
});
it('test_UnicodeKanji4Future_CJK統合漢字',()=> {
	rbSpl.putTxt("彼は雷一指《ひげこがし》を");
	expect(retText).toBe(".彼.は.雷一指.を");
	expect(retRuby).toBe("...ひげこがし.");
});
it('test_UnicodeKanji4Future_CJK互換漢字',()=> {
	rbSpl.putTxt("彼は雷\uF900指《ひげこがし》を");
	expect(retText).toBe(".彼.は.雷\uF900指.を");
	expect(retRuby).toBe("...ひげこがし.");
});
it('test_UnicodeKanji4Future_JK統合漢字拡張B',()=> {
	rbSpl.putTxt("彼は雷𠀋指《ひげこがし》を");
	expect(retText).toBe(".彼.は.雷𠀋指.を");
	expect(retRuby).toBe("...ひげこがし.");
});
it('test_UnicodeKanji4Future_CJK互換漢字補助',()=> {
	rbSpl.putTxt("彼は雷你指《ひげこがし》を");
	expect(retText).toBe(".彼.は.雷你指.を");
	expect(retRuby).toBe("...ひげこがし.");
});



it('test_不具合20101230_0',()=> {
	rbSpl.putTxt("　御機嫌《ご き げん》｜麗し《うるわ　》ゅう。");
	expect(retText).toBe(".　.御.機.嫌.麗し.ゅ.う.。");
	expect(retRuby).toBe("..ご.き.げん.うるわ　...");
});
it('test_不具合20101230_0b',()=> {
	rbSpl.putTxt("麗し《うるわ　》ゅう。");
	expect(retText).toBe(".麗し.ゅ.う.。");
	expect(retRuby).toBe(".うるわ　...");
});
it('test_不具合20101230_1',()=> {
	rbSpl.putTxt("案内《あない》仕り《つかまつ》");
	expect(retText).toBe(".案内.仕り");
	expect(retRuby).toBe(".あない.つかまつ");
});

it('test_不具合20110108_0_ok',()=> {
	rbSpl.putTxt("｜a《A》｜b《き》");
	expect(retText).toBe(".a.b");
	expect(retRuby).toBe(".A.き");
});
it('test_不具合20110108_0',()=> {
	rbSpl.putTxt("a《A》b《き》");
	expect(retText).toBe(".a.b");
	expect(retRuby).toBe(".A.き");
});

it('test_不具合20110108_1',()=> {
	rbSpl.putTxt("a《A》う《き》");
	expect(retText).toBe(".a.う");
	expect(retRuby).toBe(".A.き");
});

it('test_不具合20110108_2_ok',()=> {
	rbSpl.putTxt("御機嫌《RUBY》");
	expect(retText).toBe(".御機嫌");
	expect(retRuby).toBe(".RUBY");
});
it('test_不具合20110108_2',()=> {
	rbSpl.putTxt("御機嫌《center｜RUBY》");
	expect(retText).toBe(".御機嫌");
	expect(retRuby).toBe(".center｜RUBY");
});

it('test_不具合20140103_0_ng',()=> {
	rbSpl.putTxt("「はい輪島御児《わ じま み こ》神社でございます。はい。初宮参り《はつ みや まい 》のご予約ですね」");
	expect(retText).toBe(".「.は.い.輪.島.御.児.神.社.で.ご.ざ.い.ま.す.。.は.い.。.初.宮.参.り.の.ご.予.約.で.す.ね.」");
	expect(retRuby).toBe("....わ.じま.み.こ.............はつ.みや.まい.........");
});
it('test_不具合20140103_1_ok',()=> {
	rbSpl.putTxt("「はい輪島御児《わ じま み こ》神社でございます。はい。｜初宮参り《はつ みや まい 》のご予約ですね」");
	expect(retText).toBe(".「.は.い.輪.島.御.児.神.社.で.ご.ざ.い.ま.す.。.は.い.。.初.宮.参.り.の.ご.予.約.で.す.ね.」");
	expect(retRuby).toBe("....わ.じま.み.こ.............はつ.みや.まい.........");
});
it('test_不具合20140103_2_ng',()=> {
	rbSpl.putTxt("「初宮参り《はつ みや まい 》」");
	expect(retText).toBe(".「.初.宮.参.り.」");
	expect(retRuby).toBe("..はつ.みや.まい..");
});
it('test_不具合20140103_3_ok',()=> {
	rbSpl.putTxt("「｜初宮参り《はつ みや まい 》」");
	expect(retText).toBe(".「.初.宮.参.り.」");
	expect(retRuby).toBe("..はつ.みや.まい..");
});

it('test_不具合20150625_0',()=> {
	rbSpl.putTxt('鳥山石燕《とりやませきえん》　『｜今昔 《こんじゃく》百鬼拾遺《ひゃっきしゅうい》』下之巻 雨');
	expect(retText).toBe('.鳥山石燕.　.『.今昔 .百鬼拾遺.』.下.之.巻. .雨');
	expect(retRuby).toBe('.とりやませきえん...こんじゃく.ひゃっきしゅうい......');
});
it('test_不具合20150625_1',()=> {
	rbSpl.putTxt("　雷\n");
	expect(retText).toBe(".　.雷.\n");
	expect(retRuby).toBe("...");
});
it('test_不具合20150625_2',()=> {
	rbSpl.putTxt("雷\n雷\n雷\n雷\n");
	expect(retText).toBe(".雷.\n.雷.\n.雷.\n.雷.\n");
	expect(retRuby).toBe("........");
});
it('test_不具合20150625_3',()=> {
	rbSpl.putTxt("雷\n火《ひ》\n");
	expect(retText).toBe(".雷.\n.火.\n");
	expect(retRuby).toBe("...ひ.");
});

it('test_不具合20150711_0',()=> {
	rbSpl.putTxt("｜曰《いはく》");
	expect(retText).toBe(".曰");
	expect(retRuby).toBe(".いはく");
});
it('test_不具合20150711_1',()=> {
	rbSpl.putTxt("｜曰　《いはく》");
	expect(retText).toBe(".曰　");
	expect(retRuby).toBe(".いはく");
});
it('test_不具合20150711_2',()=> {
	rbSpl.putTxt("｜　曰《いはく》");
	expect(retText).toBe(".　曰");
	expect(retRuby).toBe(".いはく");
});
it('test_不具合20150711_3',()=> {
	rbSpl.putTxt("｜曰 《いはく》");
	expect(retText).toBe(".曰 ");
	expect(retRuby).toBe(".いはく");
});
it('test_不具合20150711_4',()=> {
	rbSpl.putTxt("｜ 曰《いはく》");
	expect(retText).toBe(". 曰");
	expect(retRuby).toBe(".いはく");
});
it('test_不具合20150711_10',()=> {
	rbSpl.putTxt('　論語《ろんごに》｜曰 《いはく》「郷人《けうひと》儺朝服而立《のおにやらいにてうふ》');
	expect(retText).toBe('.　.論語.曰 .「.郷人.儺朝服而立');
	expect(retRuby).toBe('..ろんごに.いはく..けうひと.のおにやらいにてうふ');
});


it('test_putTxt_Through_2t_2r',()=> {
	rbSpl.putTxt("《い つ》");
	expect(retText).toBe(".《.い. .つ.》");
	expect(retRuby).toBe(".....");
});


it('test_サロゲートペア',()=> {
	rbSpl.putTxt('🌈');
	expect(retText).toBe('.🌈');
	expect(retRuby).toBe('.');
});
it('test_サロゲートペア2',()=> {
	rbSpl.putTxt('🌈𩸽🌕');
	expect(retText).toBe('.🌈.𩸽.🌕');
	expect(retRuby).toBe('...');
});
it('test_サロゲートペア10',()=> {
	rbSpl.putTxt('　｜🌈《にじ》　');
	expect(retText).toBe('.　.🌈.　');
	expect(retRuby).toBe('..にじ.');
});
it('test_サロゲートペア11',()=> {
	rbSpl.putTxt('　🌈《にじ》');
	expect(retText).toBe('.　.🌈');
	expect(retRuby).toBe('..にじ');
});
it('test_サロゲートペア12',()=> {
	rbSpl.putTxt('｜🌈𩸽🌕《にじ ほっけ まんげつ》');
	expect(retText).toBe('.🌈.𩸽.🌕');
	expect(retRuby).toBe('.にじ.ほっけ.まんげつ');
});

it('test_｜｜《》',()=> {
	rbSpl.putTxt('｜｜　論語《ろんごに》');
	expect(retText).toBe('.｜　論語');
	expect(retRuby).toBe('.ろんごに');
});
it('test_｜《《》',()=> {
	rbSpl.putTxt('｜《　論語《ろんごに》');
	expect(retText).toBe('.｜.《.　.論語');
	expect(retRuby).toBe('....ろんごに');
});
	it('test_｜｜《《》',()=> {
		rbSpl.putTxt('｜｜　《論語《ろんごに》');
		expect(retText).toBe('.｜　');
		expect(retRuby).toBe('.論語《ろんごに');
	});
it('test_esc｜',()=> {
	rbSpl.putTxt('\\｜｜　論語《ろんごに》');	// 「\\」で一文字
	expect(retText).toBe('.\\.｜　論語');
	expect(retRuby).toBe('..ろんごに');
});
	it('test_escDefEsc｜',()=> {
		RubySpliter.setEscape('\\');
		rbSpl.putTxt('\\｜｜　論語《ろんごに》');	// 「\\」で一文字
		expect(retText).toBe('.｜.　論語');
		expect(retRuby).toBe('..ろんごに');
	});
	it('test_escDefEsc¥｜',()=> {
		RubySpliter.setEscape('¥');
		rbSpl.putTxt('¥｜｜　論語《ろんごに》');	// 「¥」で一文字
		expect(retText).toBe('.｜.　論語');
		expect(retRuby).toBe('..ろんごに');
	});
	it('test_escDefEsc\\2｜',()=> {
		RubySpliter.setEscape('\\');
		rbSpl.putTxt('\\｜｜　論語《ろんごに》\\｜　曰《いはく》');	// 「\\」で一文字
		expect(retText).toBe('.｜.　論語.｜.　.曰');
		expect(retRuby).toBe('..ろんごに...いはく');
	});
	it('test_escDefEsc\\No¥｜',()=> {
		RubySpliter.setEscape('\\');
		rbSpl.putTxt('\\｜｜　論語《ろんごに》¥｜　曰《いはく》');	// 「\\」で一文字
		expect(retText).toBe('.｜.　論語.¥.　曰');
		expect(retRuby).toBe('..ろんごに..いはく');
	});
	it('test_escDefEsc¥No\\｜',()=> {
		RubySpliter.setEscape('¥');
		rbSpl.putTxt('\\｜｜　論語《ろんごに》¥｜　曰《いはく》');	// 「\\」で一文字
		expect(retText).toBe('.\\.｜　論語.｜.　.曰');
		expect(retRuby).toBe('..ろんごに...いはく');
	});
it('test_esc｜2',()=> {
	rbSpl.putTxt('\\｜　論語《ろんごに》');
	expect(retText).toBe('.\\.　論語');
	expect(retRuby).toBe('..ろんごに');
});
	it('test_esc｜2DefEsc',()=> {
		RubySpliter.setEscape('\\');
		rbSpl.putTxt('\\｜　論語《ろんごに》');
		expect(retText).toBe('.｜.　.論語');
		expect(retRuby).toBe('...ろんごに');
	});
	it('test_esc｜2DefEsc¥',()=> {
		RubySpliter.setEscape('¥');
		rbSpl.putTxt('¥｜　論語《ろんごに》');
		expect(retText).toBe('.｜.　.論語');
		expect(retRuby).toBe('...ろんごに');
	});
it('test_｜esc《》',()=> {
	rbSpl.putTxt('｜\\　論語《ろんごに》');	// 「\\」で一文字
	expect(retText).toBe('.\\　論語');
	expect(retRuby).toBe('.ろんごに');
});
	it('test_escesc｜《》',()=> {
		rbSpl.putTxt('\\\\｜　論語《ろんごに》');	// 「\\」で一文字
		expect(retText).toBe('.\\.\\.　論語');
		expect(retRuby).toBe('...ろんごに');
	});
	it('test_escescDefEsc｜《》',()=> {
		RubySpliter.setEscape('\\');
		rbSpl.putTxt('\\\\｜　論語《ろんごに》');	// 「\\」で一文字
		expect(retText).toBe('.\\.　論語');
		expect(retRuby).toBe('..ろんごに');
	});
	it('test_escescDefEsc¥｜《》',()=> {
		RubySpliter.setEscape('¥');
		rbSpl.putTxt('¥¥｜　論語《ろんごに》');	// 「¥」で一文字
		expect(retText).toBe('.¥.　論語');
		expect(retRuby).toBe('..ろんごに');
	});

it('test_esc&｜《》',()=> {
	rbSpl.putTxt('\\&　論語《ろんごに》');	// 「\\」で一文字
	expect(retText).toBe('.\\.&.　.論語');
	expect(retRuby).toBe('....ろんごに');
});
it('test_esc[｜《》',()=> {
	rbSpl.putTxt('\\[　論語《ろんごに》');	// 「\\」で一文字
	expect(retText).toBe('.\\.[.　.論語');
	expect(retRuby).toBe('....ろんごに');
});
it('test_esc;｜《》',()=> {
	rbSpl.putTxt('\\;　論語《ろんごに》');	// 「\\」で一文字
	expect(retText).toBe('.\\.;.　.論語');
	expect(retRuby).toBe('....ろんごに');
});
it('test_esc*｜《》',()=> {
	rbSpl.putTxt('\\*　論語《ろんごに》');	// 「\\」で一文字
	expect(retText).toBe('.\\.*.　.論語');
	expect(retRuby).toBe('....ろんごに');
});
it('test_esc&DefEsc｜《》',()=> {
	RubySpliter.setEscape('\\');
	rbSpl.putTxt('\\&　論語《ろんごに》');	// 「\\」で一文字
	expect(retText).toBe('.&.　.論語');
	expect(retRuby).toBe('...ろんごに');
});
it('test_esc[DefEsc｜《》',()=> {
	RubySpliter.setEscape('\\');
	rbSpl.putTxt('\\[　論語《ろんごに》');	// 「\\」で一文字
	expect(retText).toBe('.[.　.論語');
	expect(retRuby).toBe('...ろんごに');
});
it('test_esc;DefEsc｜《》',()=> {
	RubySpliter.setEscape('\\');
	rbSpl.putTxt('\\;　論語《ろんごに》');	// 「\\」で一文字
	expect(retText).toBe('.;.　.論語');
	expect(retRuby).toBe('...ろんごに');
});
it('test_esc*DefEsc｜《》',()=> {
	RubySpliter.setEscape('\\');
	rbSpl.putTxt('\\*　論語《ろんごに》');	// 「\\」で一文字
	expect(retText).toBe('.*.　.論語');
	expect(retRuby).toBe('...ろんごに');
});
it('test_esc&DefEsc¥｜《》',()=> {
	RubySpliter.setEscape('¥');
	rbSpl.putTxt('¥&　論語《ろんごに》');
	expect(retText).toBe('.&.　.論語');
	expect(retRuby).toBe('...ろんごに');
});
it('test_esc[DefEsc¥｜《》',()=> {
	RubySpliter.setEscape('¥');
	rbSpl.putTxt('¥[　論語《ろんごに》');
	expect(retText).toBe('.[.　.論語');
	expect(retRuby).toBe('...ろんごに');
});
it('test_esc;DefEsc¥｜《》',()=> {
	RubySpliter.setEscape('¥');
	rbSpl.putTxt('¥;　論語《ろんごに》');
	expect(retText).toBe('.;.　.論語');
	expect(retRuby).toBe('...ろんごに');
});
it('test_esc*DefEsc¥｜《》',()=> {
	RubySpliter.setEscape('¥');
	rbSpl.putTxt('¥*　論語《ろんごに》');
	expect(retText).toBe('.*.　.論語');
	expect(retRuby).toBe('...ろんごに');
});
