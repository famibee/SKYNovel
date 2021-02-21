/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2021 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import assert = require('power-assert');

import {AnalyzeTagArg} from '../core/src/sn/AnalyzeTagArg';

context('class AnalyzeTagArg', ()=>{
	let alz;
	beforeEach(()=> {
		alz = new AnalyzeTagArg();
	});
	describe('Tst', ()=> {
		it('Arg0', ()=> {
			alz.go("");
			assert.equal(isHashEmpty(alz.hPrm), true);
			assert.equal(alz.isKomeParam, false);
		});
		function isHashEmpty(h: object): boolean {
				let c = 0, i;
				for (i in h) ++c;
				return c === 0;
			}
		it('Arg1', ()=>{
			alz.go("8");
			assert.equal(alz.hPrm['8'].val, true);
			assert.equal(alz.hPrm['8'].def, undefined);
		});


		it('Arg20', ()=> {
			alz.go("*");
			assert.equal(isHashEmpty(alz.hPrm), true);
			assert.equal(alz.isKomeParam, true);
		});
		it('Arg21', ()=> {
			alz.go("* ");
			assert.equal(isHashEmpty(alz.hPrm), true);
			assert.equal(alz.isKomeParam, true);
		});


		it('Arg40', ()=> {
			alz.go("a=3");
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['a'].val, "3");
			assert.equal(alz.hPrm['a'].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});
		it('Arg41', ()=> {
			alz.go("a =3");
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['a'].val, "3");
			assert.equal(alz.hPrm['a'].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});
		it('Arg42', ()=> {
			alz.go("a= 3");
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['a'].val, "3");
			assert.equal(alz.hPrm['a'].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});
		it('Arg43', ()=> {
			alz.go("a = 3");
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['a'].val, "3");
			assert.equal(alz.hPrm['a'].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});
	/*	it('Arg44', ()=> {
			"sys:a=4.5");
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm["sys:a"].val, "4.5");
			assert.equal(alz.hPrm["sys:a"].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});*/

		it('Arg45', ()=> {
			alz.go("a='2009'");
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['a'].val, "2009");
			assert.equal(alz.hPrm['a'].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});
		it('Arg46', ()=> {
			alz.go('a="2009"');
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['a'].val, "2009");
			assert.equal(alz.hPrm['a'].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});
		it('Arg47', ()=> {
			alz.go("a=#2009#");
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['a'].val, "2009");
			assert.equal(alz.hPrm['a'].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});

		it('Arg50', ()=> {
			alz.go(' name="_submenu.png" visible=false');
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['name'].val, "_submenu.png");
			assert.equal(alz.hPrm['name'].def, undefined);
			assert.equal(alz.hPrm['visible'].val, "false");
			assert.equal(alz.hPrm['visible'].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});


		it('Arg60', ()=> {
			alz.go("a=%bar");
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['a'].val, "%bar");
			assert.equal(alz.hPrm['a'].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});
		it('Arg61', ()=> {
			alz.go("a=%bar|ref");
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['a'].val, "%bar");
			assert.equal(alz.hPrm['a'].def, "ref");
			assert.equal(alz.isKomeParam, false);
		});
		it('Arg62', ()=> {
			alz.go("a=%bar|'うひょー'");
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['a'].val, "%bar");
			assert.equal(alz.hPrm['a'].def, "うひょー");
			assert.equal(alz.isKomeParam, false);
		});
		it('Arg63', ()=> {
			alz.go("a=%bar|'う ひょー'");
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['a'].val, "%bar");
			assert.equal(alz.hPrm['a'].def, "う ひょー");
			assert.equal(alz.isKomeParam, false);
		});

		it('Arg44_bug0', ()=> {
			alz.go("text=&sys:_album.img.渡り廊下・桜昼");
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm["text"].val, "&sys:_album.img.渡り廊下・桜昼");
			assert.equal(alz.hPrm["text"].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});
		it('Arg44_bug1', ()=> {
			alz.go('* x=0 y=1 pic="渡り廊下・桜昼" cond=sys:_album.img.渡り廊下・桜昼');
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['x'].val, "0");
			assert.equal(alz.hPrm['x'].def, undefined);
			assert.equal(alz.hPrm['y'].val, "1");
			assert.equal(alz.hPrm['y'].def, undefined);
			assert.equal(alz.hPrm['pic'].val, "渡り廊下・桜昼");
			assert.equal(alz.hPrm['pic'].def, undefined);
			assert.equal(alz.hPrm['cond'].val, "sys:_album.img.渡り廊下・桜昼");
			assert.equal(alz.hPrm['cond'].def, undefined);
			assert.equal(alz.isKomeParam, true);
		});
		it('Arg50_bug0', ()=> {
			alz.go('text=&-const.sn.config.window.width');
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['text'].val, "&-const.sn.config.window.width");
			assert.equal(alz.hPrm['text'].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});


		it('Arg80', ()=> {
			alz.go("a=3 b='1327' ");
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['a'].val, "3");
			assert.equal(alz.hPrm['a'].def, undefined);
			assert.equal(alz.hPrm['b'].val, "1327");
			assert.equal(alz.hPrm['b'].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});
		it('Arg81', ()=> {
			alz.go('name="fcol" text=%fcol|&0x000000');
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['name'].val, "fcol");
			assert.equal(alz.hPrm['name'].def, undefined);
			assert.equal(alz.hPrm['text'].val, "%fcol");
			assert.equal(alz.hPrm['text'].def, "&0x000000");
			assert.equal(alz.isKomeParam, false);
		});
		it('Arg82', ()=> {
			alz.go('* layer="me s" page=%page|back visible=%visible|"tr ue" b_left=&l b_top=0 b_width=&w b_height=&const.flash.display.Stage.stageHeight b_color=%b_color|"0xffffff" b_alpha=%b_alpha|&sys:TextLayer.Back.Alpha r_size=12 max_col=25 bura_col=2 max_row=7');
			assert.equal(isHashEmpty(alz.hPrm), false);

			assert.equal(alz.hPrm['layer'].val, "me s");
			assert.equal(alz.hPrm['layer'].def, undefined);
			assert.equal(alz.hPrm['page'].val, "%page");
			assert.equal(alz.hPrm['page'].def, "back");
			assert.equal(alz.hPrm['visible'].val, "%visible");
			assert.equal(alz.hPrm['visible'].def, "tr ue");

			assert.equal(alz.hPrm['b_left'].val, "&l");
			assert.equal(alz.hPrm['b_left'].def, undefined);
			assert.equal(alz.hPrm['b_top'].val, "0");
			assert.equal(alz.hPrm['b_top'].def, undefined);
			assert.equal(alz.hPrm['b_width'].val, "&w");
			assert.equal(alz.hPrm['b_width'].def, undefined);
			assert.equal(alz.hPrm['b_height'].val, "&const.flash.display.Stage.stageHeight");
			assert.equal(alz.hPrm['b_height'].def, undefined);

			assert.equal(alz.hPrm['b_color'].val, "%b_color");
			assert.equal(alz.hPrm['b_color'].def, "0xffffff");
			assert.equal(alz.hPrm['b_alpha'].val, "%b_alpha");
			assert.equal(alz.hPrm['b_alpha'].def, "&sys:TextLayer.Back.Alpha");

			assert.equal(alz.hPrm['r_size'].val, "12");
			assert.equal(alz.hPrm['r_size'].def, undefined);
			assert.equal(alz.hPrm['max_col'].val, "25");
			assert.equal(alz.hPrm['max_col'].def, undefined);
			assert.equal(alz.hPrm['bura_col'].val, "2");
			assert.equal(alz.hPrm['bura_col'].def, undefined);
			assert.equal(alz.hPrm['max_row'].val, "7");
			assert.equal(alz.hPrm['max_row'].def, undefined);

			assert.equal(alz.isKomeParam, true);
		});
		it('Arg83', ()=> {
			alz.go("layout=#&'" + 'lineHeight="36" justificationRule="space" columnGap="0" paddingLeft="$pl" paddingTop="$pt" paddingRight="$pr" paddingBottom="$pb" verticalAlign="inherit" blockProgression="rl" lineBreak="explicit" fontLookup="embeddedCFF" renderingMode="cff" fontSize="24" locale="ja" kerning="off" trackingRight="0" color="$fcol" whiteSpaceCollapse="preserve"' + "'#");
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['layout'].val, "&'" + 'lineHeight="36" justificationRule="space" columnGap="0" paddingLeft="$pl" paddingTop="$pt" paddingRight="$pr" paddingBottom="$pb" verticalAlign="inherit" blockProgression="rl" lineBreak="explicit" fontLookup="embeddedCFF" renderingMode="cff" fontSize="24" locale="ja" kerning="off" trackingRight="0" color="$fcol" whiteSpaceCollapse="preserve"' + "'");
			assert.equal(alz.hPrm['layout'].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});


		it('20200416_test_multiline_arg0', ()=> {
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
			assert.equal(isHashEmpty(alz.hPrm), false);

			assert.equal(alz.hPrm['layer'].val, `mes`);
			assert.equal(alz.hPrm['layer'].def, undefined);
			assert.equal(alz.hPrm['page'].val, 'fore');
			assert.equal(alz.hPrm['page'].def, undefined);
			assert.equal(alz.hPrm['text'].val, `]`);
			assert.equal(alz.hPrm['text'].def, undefined);
			assert.equal(alz.hPrm['class'].val, `txt`);
			assert.equal(alz.hPrm['class'].def, undefined);
			assert.equal(alz.hPrm['abc'].val, true);
			assert.equal(alz.hPrm['abc'].def, undefined);
			assert.equal(alz.hPrm['def'].val, true);
			assert.equal(alz.hPrm['def'].def, undefined);
			assert.equal(alz.hPrm['ghi'].val, true);
			assert.equal(alz.hPrm['ghi'].def, undefined);
			assert.equal(alz.hPrm['jkl'].val, `color="0xaaaaaa"`);
			assert.equal(alz.hPrm['jkl'].def, undefined);

			assert.equal(alz.isKomeParam, false);
		});
		it('20200416_test_multiline_arg1', ()=> {
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
			assert.equal(isHashEmpty(alz.hPrm), false);

			assert.equal(alz.hPrm['layer'].val, `mes`);
			assert.equal(alz.hPrm['layer'].def, undefined);
			assert.equal(alz.hPrm['class'].val, `txt`);
			assert.equal(alz.hPrm['class'].def, undefined);
			assert.equal(alz.hPrm['layout'].val, `color="0xaaaaaa"`);
			assert.equal(alz.hPrm['layout'].def, undefined);
			assert.equal(alz.hPrm['text'].val, `%fcol`);
			assert.equal(alz.hPrm['text'].def, `&0x000000`);
			assert.equal(alz.hPrm['txt'].val, `%fcol`);
			assert.equal(alz.hPrm['txt'].def, `&0x000000`);
			assert.equal(alz.hPrm['a'].val, `2009`);
			assert.equal(alz.hPrm['a'].def, undefined);
			assert.equal(alz.hPrm['b'].val, `#{fcol}`);
			assert.equal(alz.hPrm['b'].def, `true`);

			assert.equal(alz.isKomeParam, false);
		});


	});

});
