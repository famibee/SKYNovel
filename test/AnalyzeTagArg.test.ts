/* ***** BEGIN LICENSE BLOCK *****
Copyright (c) 2018-2022 Famibee (famibee.blog38.fc2.com)

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {AnalyzeTagArg} from '../src/sn/AnalyzeTagArg';

let alz: AnalyzeTagArg;
beforeEach(()=> {
	alz = new AnalyzeTagArg();
});
	function isHashEmpty(h: object): boolean {
		return Object.keys(h).length === 0;
	}

it('Arg0',()=> {
	alz.go("");
	expect(isHashEmpty(alz.hPrm)).toBe(true);
	expect(alz.isKomeParam).toBe(false);
});
it('Arg1',()=> {
	alz.go("8");
	expect(alz.hPrm['8'].val).toBeTruthy();
	expect(alz.hPrm['8'].def).toBeUndefined();
});


it('Arg20',()=> {
	alz.go("*");
	expect(isHashEmpty(alz.hPrm)).toBe(true);
	expect(alz.isKomeParam).toBe(true);
});
it('Arg21',()=> {
	alz.go("* ");
	expect(isHashEmpty(alz.hPrm)).toBe(true);
	expect(alz.isKomeParam).toBe(true);
});


it('Arg40',()=> {
	alz.go("a=3");
	expect(isHashEmpty(alz.hPrm)).toBe(false);
	expect(alz.hPrm['a'].val).toBe("3");
	expect(alz.hPrm['a'].def).toBeUndefined();
	expect(alz.isKomeParam).toBe(false);
});
it('Arg41',()=> {
	alz.go("a =3");
	expect(isHashEmpty(alz.hPrm)).toBe(false);
	expect(alz.hPrm['a'].val).toBe("3");
	expect(alz.hPrm['a'].def).toBeUndefined();
	expect(alz.isKomeParam).toBe(false);
});
it('Arg42',()=> {
	alz.go("a= 3");
	expect(isHashEmpty(alz.hPrm)).toBe(false);
	expect(alz.hPrm['a'].val).toBe("3");
	expect(alz.hPrm['a'].def).toBeUndefined();
	expect(alz.isKomeParam).toBe(false);
});
it('Arg43',()=> {
	alz.go("a = 3");
	expect(isHashEmpty(alz.hPrm)).toBe(false);
	expect(alz.hPrm['a'].val).toBe("3");
	expect(alz.hPrm['a'].def).toBeUndefined();
	expect(alz.isKomeParam).toBe(false);
});
/*it('Arg44',()=> {
	"sys:a=4.5");
	expect(isHashEmpty(alz.hPrm)).toBe(false);
	expect(alz.hPrm["sys:a"].val).toBe("4.5");
	expect(alz.hPrm["sys:a"].def).toBeUndefined();
	expect(alz.isKomeParam).toBe(false);
});*/

it('Arg45',()=> {
	alz.go("a='2009'");
	expect(isHashEmpty(alz.hPrm)).toBe(false);
	expect(alz.hPrm['a'].val).toBe("2009");
	expect(alz.hPrm['a'].def).toBeUndefined();
	expect(alz.isKomeParam).toBe(false);
});
	it('Arg45_empty',()=> {
		alz.go("a=''");
		expect(isHashEmpty(alz.hPrm)).toBe(false);
		expect(alz.hPrm['a'].val).toBe("");
		expect(alz.hPrm['a'].def).toBeUndefined();
		expect(alz.isKomeParam).toBe(false);
	});
	it('Arg45_str_null',()=> {
		alz.go("a='null'");
		expect(isHashEmpty(alz.hPrm)).toBe(false);
		expect(alz.hPrm['a'].val).toBe("null");
		expect(alz.hPrm['a'].def).toBeUndefined();
		expect(alz.isKomeParam).toBe(false);

		// あくまで文字の "null"
		expect(alz.hPrm['a'].val).not.toBeNull();
		expect(alz.hPrm['a'].val).toBeDefined();
	});
	it('Arg45_null',()=> {
		alz.go("a=null");
		expect(isHashEmpty(alz.hPrm)).toBe(false);
		expect(alz.hPrm['a'].val).toBe("null");
		expect(alz.hPrm['a'].def).toBeUndefined();
		expect(alz.isKomeParam).toBe(false);

		// あくまで文字の "null"
		expect(alz.hPrm['a'].val).not.toBeNull();
		expect(alz.hPrm['a'].val).toBeDefined();
	});
	it('Arg45_str_undefined',()=> {
		alz.go("a='undefined'");
		expect(isHashEmpty(alz.hPrm)).toBe(false);
		expect(alz.hPrm['a'].val).toBe("undefined");
		expect(alz.hPrm['a'].def).toBeUndefined();
		expect(alz.isKomeParam).toBe(false);

		// あくまで文字の "undefined"
		expect(alz.hPrm['a'].val).not.toBeNull();
		expect(alz.hPrm['a'].val).toBeDefined();
	});
	it('Arg45_undefined',()=> {
		alz.go("a=undefined");
		expect(isHashEmpty(alz.hPrm)).toBe(false);
		expect(alz.hPrm['a'].val).toBe("undefined");
		expect(alz.hPrm['a'].def).toBeUndefined();
		expect(alz.isKomeParam).toBe(false);

		// あくまで文字の "undefined"
		expect(alz.hPrm['a'].val).not.toBeNull();
		expect(alz.hPrm['a'].val).toBeDefined();
	});
it('Arg46',()=> {
	alz.go('a="2009"');
	expect(isHashEmpty(alz.hPrm)).toBe(false);
	expect(alz.hPrm['a'].val).toBe("2009");
	expect(alz.hPrm['a'].def).toBeUndefined();
	expect(alz.isKomeParam).toBe(false);
});
it('Arg47',()=> {
	alz.go("a=#2009#");
	expect(isHashEmpty(alz.hPrm)).toBe(false);
	expect(alz.hPrm['a'].val).toBe("2009");
	expect(alz.hPrm['a'].def).toBeUndefined();
	expect(alz.isKomeParam).toBe(false);
});

it('Arg50',()=> {
	alz.go(' name="_submenu.png" visible=false');
	expect(isHashEmpty(alz.hPrm)).toBe(false);
	expect(alz.hPrm['name'].val).toBe("_submenu.png");
	expect(alz.hPrm['name'].def).toBeUndefined();
	expect(alz.hPrm['visible'].val).toBe("false");
	expect(alz.hPrm['visible'].def).toBeUndefined();
	expect(alz.isKomeParam).toBe(false);
});


it('Arg60',()=> {
	alz.go("a=%bar");
	expect(isHashEmpty(alz.hPrm)).toBe(false);
	expect(alz.hPrm['a'].val).toBe("%bar");
	expect(alz.hPrm['a'].def).toBeUndefined();
	expect(alz.isKomeParam).toBe(false);
});
it('Arg61',()=> {
	alz.go("a=%bar|ref");
	expect(isHashEmpty(alz.hPrm)).toBe(false);
	expect(alz.hPrm['a'].val).toBe("%bar");
	expect(alz.hPrm['a'].def).toBe("ref");
	expect(alz.isKomeParam).toBe(false);
});
it('Arg62',()=> {
	alz.go("a=%bar|'うひょー'");
	expect(isHashEmpty(alz.hPrm)).toBe(false);
	expect(alz.hPrm['a'].val).toBe("%bar");
	expect(alz.hPrm['a'].def).toBe("うひょー");
	expect(alz.isKomeParam).toBe(false);
});
	it('Arg62_empty',()=> {
		alz.go("a=%bar|''");
		expect(isHashEmpty(alz.hPrm)).toBe(false);
		expect(alz.hPrm['a'].val).toBe("%bar");
		expect(alz.hPrm['a'].def).toBe("");
		expect(alz.isKomeParam).toBe(false);
	});
	it('Arg62_str_null',()=> {
		alz.go("a=%bar|'null'");
		expect(isHashEmpty(alz.hPrm)).toBe(false);
		expect(alz.hPrm['a'].val).toBe("%bar");
		expect(alz.hPrm['a'].def).toBe("null");
		expect(alz.isKomeParam).toBe(false);

		// あくまで文字の "null"
		expect(alz.hPrm['a'].def).not.toBeNull();
		expect(alz.hPrm['a'].def).toBeDefined();
	});
	it('Arg62_null',()=> {
		alz.go("a=%bar|null");
		expect(isHashEmpty(alz.hPrm)).toBe(false);
		expect(alz.hPrm['a'].val).toBe("%bar");
		expect(alz.hPrm['a'].def).toBe("null");
		expect(alz.isKomeParam).toBe(false);

		// あくまで文字の "null"
		expect(alz.hPrm['a'].def).not.toBeNull();
		expect(alz.hPrm['a'].def).toBeDefined();
	});
	it('Arg62_str_undefined',()=> {
		alz.go("a=%bar|'undefined'");
		expect(isHashEmpty(alz.hPrm)).toBe(false);
		expect(alz.hPrm['a'].val).toBe("%bar");
		expect(alz.hPrm['a'].def).toBe("undefined");
		expect(alz.isKomeParam).toBe(false);

		// あくまで文字の "undefined"
		expect(alz.hPrm['a'].def).not.toBeNull();
		expect(alz.hPrm['a'].def).toBeDefined();
	});
	it('Arg62_undefined',()=> {
		alz.go("a=%bar|undefined");
		expect(isHashEmpty(alz.hPrm)).toBe(false);
		expect(alz.hPrm['a'].val).toBe("%bar");
		expect(alz.hPrm['a'].def).toBe("undefined");
		expect(alz.isKomeParam).toBe(false);

		// あくまで文字の "undefined"
		expect(alz.hPrm['a'].def).not.toBeNull();
		expect(alz.hPrm['a'].def).toBeDefined();
	});
it('Arg63',()=> {
	alz.go("a=%bar|'う ひょー'");
	expect(isHashEmpty(alz.hPrm)).toBe(false);
	expect(alz.hPrm['a'].val).toBe("%bar");
	expect(alz.hPrm['a'].def).toBe("う ひょー");
	expect(alz.isKomeParam).toBe(false);
});

it('Arg44_bug0',()=> {
	alz.go("text=&sys:_album.img.渡り廊下・桜昼");
	expect(isHashEmpty(alz.hPrm)).toBe(false);
	expect(alz.hPrm["text"].val).toBe("&sys:_album.img.渡り廊下・桜昼");
	expect(alz.hPrm["text"].def).toBeUndefined();
	expect(alz.isKomeParam).toBe(false);
});
it('Arg44_bug1',()=> {
	alz.go('* x=0 y=1 pic="渡り廊下・桜昼" cond=sys:_album.img.渡り廊下・桜昼');
	expect(isHashEmpty(alz.hPrm)).toBe(false);
	expect(alz.hPrm['x'].val).toBe("0");
	expect(alz.hPrm['x'].def).toBeUndefined();
	expect(alz.hPrm['y'].val).toBe("1");
	expect(alz.hPrm['y'].def).toBeUndefined();
	expect(alz.hPrm['pic'].val).toBe("渡り廊下・桜昼");
	expect(alz.hPrm['pic'].def).toBeUndefined();
	expect(alz.hPrm['cond'].val).toBe("sys:_album.img.渡り廊下・桜昼");
	expect(alz.hPrm['cond'].def).toBeUndefined();
	expect(alz.isKomeParam).toBe(true);
});
it('Arg50_bug0',()=> {
	alz.go('text=&-const.sn.config.window.width');
	expect(isHashEmpty(alz.hPrm)).toBe(false);
	expect(alz.hPrm['text'].val).toBe("&-const.sn.config.window.width");
	expect(alz.hPrm['text'].def).toBeUndefined();
	expect(alz.isKomeParam).toBe(false);
});


it('Arg80',()=> {
	alz.go("a=3 b='1327' ");
	expect(isHashEmpty(alz.hPrm)).toBe(false);
	expect(alz.hPrm['a'].val).toBe("3");
	expect(alz.hPrm['a'].def).toBeUndefined();
	expect(alz.hPrm['b'].val).toBe("1327");
	expect(alz.hPrm['b'].def).toBeUndefined();
	expect(alz.isKomeParam).toBe(false);
});
it('Arg81',()=> {
	alz.go('name="fcol" text=%fcol|&0x000000');
	expect(isHashEmpty(alz.hPrm)).toBe(false);
	expect(alz.hPrm['name'].val).toBe("fcol");
	expect(alz.hPrm['name'].def).toBeUndefined();
	expect(alz.hPrm['text'].val).toBe("%fcol");
	expect(alz.hPrm['text'].def).toBe("&0x000000");
	expect(alz.isKomeParam).toBe(false);
});
it('Arg82',()=> {
	alz.go('* layer="me s" page=%page|back visible=%visible|"tr ue" b_left=&l b_top=0 b_width=&w b_height=&const.flash.display.Stage.stageHeight b_color=%b_color|"0xffffff" b_alpha=%b_alpha|&sys:TextLayer.Back.Alpha r_size=12 max_col=25 bura_col=2 max_row=7');
	expect(isHashEmpty(alz.hPrm)).toBe(false);

	expect(alz.hPrm['layer'].val).toBe("me s");
	expect(alz.hPrm['layer'].def).toBeUndefined();
	expect(alz.hPrm['page'].val).toBe("%page");
	expect(alz.hPrm['page'].def).toBe("back");
	expect(alz.hPrm['visible'].val).toBe("%visible");
	expect(alz.hPrm['visible'].def).toBe("tr ue");

	expect(alz.hPrm['b_left'].val).toBe("&l");
	expect(alz.hPrm['b_left'].def).toBeUndefined();
	expect(alz.hPrm['b_top'].val).toBe("0");
	expect(alz.hPrm['b_top'].def).toBeUndefined();
	expect(alz.hPrm['b_width'].val).toBe("&w");
	expect(alz.hPrm['b_width'].def).toBeUndefined();
	expect(alz.hPrm['b_height'].val).toBe("&const.flash.display.Stage.stageHeight");
	expect(alz.hPrm['b_height'].def).toBeUndefined();

	expect(alz.hPrm['b_color'].val).toBe("%b_color");
	expect(alz.hPrm['b_color'].def).toBe("0xffffff");
	expect(alz.hPrm['b_alpha'].val).toBe("%b_alpha");
	expect(alz.hPrm['b_alpha'].def).toBe("&sys:TextLayer.Back.Alpha");

	expect(alz.hPrm['r_size'].val).toBe("12");
	expect(alz.hPrm['r_size'].def).toBeUndefined();
	expect(alz.hPrm['max_col'].val).toBe("25");
	expect(alz.hPrm['max_col'].def).toBeUndefined();
	expect(alz.hPrm['bura_col'].val).toBe("2");
	expect(alz.hPrm['bura_col'].def).toBeUndefined();
	expect(alz.hPrm['max_row'].val).toBe("7");
	expect(alz.hPrm['max_row'].def).toBeUndefined();

	expect(alz.isKomeParam).toBe(true);
});
it('Arg83',()=> {
	alz.go("layout=#&'" + 'lineHeight="36" justificationRule="space" columnGap="0" paddingLeft="$pl" paddingTop="$pt" paddingRight="$pr" paddingBottom="$pb" verticalAlign="inherit" blockProgression="rl" lineBreak="explicit" fontLookup="embeddedCFF" renderingMode="cff" fontSize="24" locale="ja" kerning="off" trackingRight="0" color="$fcol" whiteSpaceCollapse="preserve"' + "'#");
	expect(isHashEmpty(alz.hPrm)).toBe(false);
	expect(alz.hPrm['layout'].val).toBe("&'" + 'lineHeight="36" justificationRule="space" columnGap="0" paddingLeft="$pl" paddingTop="$pt" paddingRight="$pr" paddingBottom="$pb" verticalAlign="inherit" blockProgression="rl" lineBreak="explicit" fontLookup="embeddedCFF" renderingMode="cff" fontSize="24" locale="ja" kerning="off" trackingRight="0" color="$fcol" whiteSpaceCollapse="preserve"' + "'");
	expect(alz.hPrm['layout'].def).toBeUndefined();
	expect(alz.isKomeParam).toBe(false);
});


it('20200416_test_multiline_arg0',()=> {
	alz.go(
`	page=fore	;===
text="]"

layer=mes
class=txt
abc
def	;=====
ghi;=====
jkl
=
'color="0xaaaaaa"'
;`);
	expect(isHashEmpty(alz.hPrm)).toBe(false);

	expect(alz.hPrm['layer'].val).toBe(`mes`);
	expect(alz.hPrm['layer'].def).toBeUndefined();
	expect(alz.hPrm['page'].val).toBe('fore');
	expect(alz.hPrm['page'].def).toBeUndefined();
	expect(alz.hPrm['text'].val).toBe(`]`);
	expect(alz.hPrm['text'].def).toBeUndefined();
	expect(alz.hPrm['class'].val).toBe(`txt`);
	expect(alz.hPrm['class'].def).toBeUndefined();
	expect(alz.hPrm['abc'].val).toBeTruthy();
	expect(alz.hPrm['abc'].def).toBeUndefined();
	expect(alz.hPrm['def'].val).toBeTruthy();
	expect(alz.hPrm['def'].def).toBeUndefined();
	expect(alz.hPrm['ghi'].val).toBeTruthy();
	expect(alz.hPrm['ghi'].def).toBeUndefined();
	expect(alz.hPrm['jkl'].val).toBe(`color="0xaaaaaa"`);
	expect(alz.hPrm['jkl'].def).toBeUndefined();

	expect(alz.isKomeParam).toBe(false);
});
it('20200416_test_multiline_arg1',()=> {
	alz.go(
`	;=====
layer=mes	;=====
class=txt	;======
;=====
layout;=====
=	;"""""
'color="0xaaaaaa"'	;=====
text=%fcol|&0x000000;=====
txt=%fcol|'&0x000000';=====
a='2009';=====
b='#{fcol}'|true;=====`);
	expect(isHashEmpty(alz.hPrm)).toBe(false);

	expect(alz.hPrm['layer'].val).toBe(`mes`);
	expect(alz.hPrm['layer'].def).toBeUndefined();
	expect(alz.hPrm['class'].val).toBe(`txt`);
	expect(alz.hPrm['class'].def).toBeUndefined();
	expect(alz.hPrm['layout'].val).toBe(`color="0xaaaaaa"`);
	expect(alz.hPrm['layout'].def).toBeUndefined();
	expect(alz.hPrm['text'].val).toBe(`%fcol`);
	expect(alz.hPrm['text'].def).toBe(`&0x000000`);
	expect(alz.hPrm['txt'].val).toBe(`%fcol`);
	expect(alz.hPrm['txt'].def).toBe(`&0x000000`);
	expect(alz.hPrm['a'].val).toBe(`2009`);
	expect(alz.hPrm['a'].def).toBeUndefined();
	expect(alz.hPrm['b'].val).toBe(`#{fcol}`);
	expect(alz.hPrm['b'].def).toBe(`true`);

	expect(alz.isKomeParam).toBe(false);
});

it('20210410_test_multiline_arg1',()=> {
	alz.go(
`	;=====
layer=mes	;=====
b_pic=%b_pic|wafuu1	;=====`);
	expect(isHashEmpty(alz.hPrm)).toBe(false);

	expect(alz.hPrm['layer'].val).toBe(`mes`);
	expect(alz.hPrm['layer'].def).toBeUndefined();
	expect(alz.hPrm['b_pic'].val).toBe(`%b_pic`);
	expect(alz.hPrm['b_pic'].def).toBe(`wafuu1`);
	expect(alz.hPrm['a']).toBeUndefined();

	expect(alz.isKomeParam).toBe(false);
});
it('20210410_test_multiline_arg2',()=> {
	alz.go(
`	;=====
layer=mes	;=====
;	b_pic=%b_pic|wafuu1	;=====`);
	expect(isHashEmpty(alz.hPrm)).toBe(false);

	expect(alz.hPrm['layer'].val).toBe(`mes`);
	expect(alz.hPrm['layer'].def).toBeUndefined();
	expect(alz.hPrm['b_pic']).toBeUndefined();
	expect(alz.hPrm['a']).toBeUndefined();

	expect(alz.isKomeParam).toBe(false);
});

it('20221003_test_multilang_arg',()=> {
	alz.go(
`	;=====
音声=mes	;=====
	%no_voice_stop?='Boolean|false|trueなら改ページ後、音声（バッファ名「音声」の効果音）をフェードアウトしない'

		싱글룸=ハングルシングルルーム
		单人间=簡体字シングルルーム
		單人房=繁体字シングルルーム
		¿Como_esta?=お元気ですか
		أهلا=こんにちは
		𣛠𩙻=飛行機

;	b_pic=%b_pic|wafuu1	;=====`);
	expect(isHashEmpty(alz.hPrm)).toBe(false);

	expect(alz.hPrm['音声'].val).toBe(`mes`);
	expect(alz.hPrm['音声'].def).toBeUndefined();

	expect(alz.hPrm['%no_voice_stop?'].val).toBe(`Boolean|false|trueなら改ページ後、音声（バッファ名「音声」の効果音）をフェードアウトしない`);
	expect(alz.hPrm['%no_voice_stop?'].def).toBeUndefined();

	expect(alz.hPrm['싱글룸'].val).toBe(`ハングルシングルルーム`);
	expect(alz.hPrm['싱글룸'].def).toBeUndefined();
	expect(alz.hPrm['单人间'].val).toBe(`簡体字シングルルーム`);
	expect(alz.hPrm['单人间'].def).toBeUndefined();
	expect(alz.hPrm['單人房'].val).toBe(`繁体字シングルルーム`);
	expect(alz.hPrm['單人房'].def).toBeUndefined();
	expect(alz.hPrm['¿Como_esta?'].val).toBe(`お元気ですか`);
	expect(alz.hPrm['¿Como_esta?'].def).toBeUndefined();
	expect(alz.hPrm['أهلا'].val).toBe(`こんにちは`);
	expect(alz.hPrm['أهلا'].def).toBeUndefined();
	expect(alz.hPrm['𣛠𩙻'].val).toBe(`飛行機`);
	expect(alz.hPrm['𣛠𩙻'].def).toBeUndefined();

	expect(alz.hPrm['b_pic']).toBeUndefined();
	expect(alz.hPrm['a']).toBeUndefined();

	expect(alz.isKomeParam).toBe(false);
});
