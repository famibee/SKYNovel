/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import assert = require('power-assert');

import {AnalyzeTagArg} from '../src/sn/AnalyzeTagArg';

context('class AnalyzeTagArg', ()=>{
	let alz;
	beforeEach(() => {
		alz = new AnalyzeTagArg();
	});
	describe('Tst', () => {
		it('Arg0', ()=> {
			assert.equal(alz.go(""), true);
			assert.equal(isHashEmpty(alz.hPrm), true);
			assert.equal(alz.isKomeParam, false);
		});
		function isHashEmpty(h: object): boolean {
				let c = 0, i;
				for (i in h) ++c;
				return c == 0;
			}
		it('Arg1', ()=>{
			assert.equal(alz.go("8"), false);
			assert.equal(alz.literal, "8");
		});


		it('Arg20', ()=> {
			assert.equal(alz.go("*"), true);
			assert.equal(isHashEmpty(alz.hPrm), true);
			assert.equal(alz.isKomeParam, true);
		});
		it('Arg21', ()=> {
			assert.equal(alz.go("* "), true);
			assert.equal(isHashEmpty(alz.hPrm), true);
			assert.equal(alz.isKomeParam, true);
		});


		it('Arg40', ()=> {
			assert.equal(alz.go("a=3"), true);
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['a'].val, "3");
			assert.equal(alz.hPrm['a'].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});
		it('Arg41', ()=> {
			assert.equal(alz.go("a =3"), true);
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['a'].val, "3");
			assert.equal(alz.hPrm['a'].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});
		it('Arg42', ()=> {
			assert.equal(alz.go("a= 3"), true);
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['a'].val, "3");
			assert.equal(alz.hPrm['a'].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});
		it('Arg43', ()=> {
			assert.equal(alz.go("a = 3"), true);
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['a'].val, "3");
			assert.equal(alz.hPrm['a'].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});
		it('Arg44', ()=> {
			assert.equal(alz.go("sys:a=4.5"), true);
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm["sys:a"].val, "4.5");
			assert.equal(alz.hPrm["sys:a"].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});

		it('Arg45', ()=> {
			assert.equal(alz.go("a='2009'"), true);
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['a'].val, "2009");
			assert.equal(alz.hPrm['a'].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});
		it('Arg46', ()=> {
			assert.equal(alz.go('a="2009"'), true);
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['a'].val, "2009");
			assert.equal(alz.hPrm['a'].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});
		it('Arg47', ()=> {
			assert.equal(alz.go("a=#2009#"), true);
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['a'].val, "2009");
			assert.equal(alz.hPrm['a'].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});

		it('Arg50', ()=> {
			assert.equal(alz.go(' name="_submenu.png" visible=false'), true);
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['name'].val, "_submenu.png");
			assert.equal(alz.hPrm['name'].def, undefined);
			assert.equal(alz.hPrm['visible'].val, "false");
			assert.equal(alz.hPrm['visible'].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});


		it('Arg60', ()=> {
			assert.equal(alz.go("a=%bar"), true);
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['a'].val, "%bar");
			assert.equal(alz.hPrm['a'].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});
		it('Arg61', ()=> {
			assert.equal(alz.go("a=%bar|ref"), true);
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['a'].val, "%bar");
			assert.equal(alz.hPrm['a'].def, "ref");
			assert.equal(alz.isKomeParam, false);
		});
		it('Arg62', ()=> {
			assert.equal(alz.go("a=%bar|'うひょー'"), true);
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['a'].val, "%bar");
			assert.equal(alz.hPrm['a'].def, "うひょー");
			assert.equal(alz.isKomeParam, false);
		});
		it('Arg63', ()=> {
			assert.equal(alz.go("a=%bar|'う ひょー'"), true);
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['a'].val, "%bar");
			assert.equal(alz.hPrm['a'].def, "う ひょー");
			assert.equal(alz.isKomeParam, false);
		});

		it('Arg_val60', ()=> {
			alz.goVal("%bar");
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['val'], "%bar");
			assert.equal(alz.hPrm['def'], undefined);
		});
		it('Arg_val61', ()=> {
			alz.goVal("%bar|ref");
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['val'], "%bar");
			assert.equal(alz.hPrm['def'], "ref");
		});
		it('Arg_val62', ()=> {
			alz.goVal("%bar|'うひょー'");
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['val'], "%bar");
			assert.equal(alz.hPrm['def'], "うひょー");
		});
		it('Arg_val63', ()=> {
			alz.goVal("%bar|'う ひょー'");
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['val'], "%bar");
			assert.equal(alz.hPrm['def'], "う ひょー");
		});
		it('Arg_val64', ()=> {
			alz.goVal("mp:h|const.flash.display.Stage.stageHeight -40*2");	// 空白が入っていても許す
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['val'], "mp:h");
			assert.equal(alz.hPrm['def'], "const.flash.display.Stage.stageHeight -40*2");
		});
		it('Arg_val65', ()=> {
			alz.goVal('mp:h|"const.flash.display.Stage.stageHeight -40*2"');
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['val'], "mp:h");
			assert.equal(alz.hPrm['def'], "const.flash.display.Stage.stageHeight -40*2");
		});
		it('Arg_val66', ()=> {
			alz.goVal(' (pos.c + pos.l) /2');
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['val'], "(pos.c + pos.l) /2");
			assert.equal(alz.hPrm['def'], undefined);
		});
		it('Arg_val67', ()=> {
			alz.goVal('""');
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['val'], "");
			assert.equal(alz.hPrm['def'], undefined);
		});
		it('Arg_val68', ()=> {
			alz.goVal("''");
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['val'], "");
			assert.equal(alz.hPrm['def'], undefined);
		});

		it('Arg_val2bug0', ()=> {
			alz.goVal("mp:w|17");
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['val'], "mp:w");
			assert.equal(alz.hPrm['def'], "17");
		});
		it('Arg_val2bug1', ()=> {
			alz.goVal("26|17");
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['val'], "26");
			assert.equal(alz.hPrm['def'], "17");
		});

		it('Arg44_bug0', ()=> {
			assert.equal(alz.go("text=&sys:_album.img.渡り廊下・桜昼"), true);
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm["text"].val, "&sys:_album.img.渡り廊下・桜昼");
			assert.equal(alz.hPrm["text"].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});
		it('Arg44_bug1', ()=> {
			assert.equal(alz.go('* x=0 y=1 pic="渡り廊下・桜昼" cond=sys:_album.img.渡り廊下・桜昼'), true);
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
			assert.equal(alz.go('text=&-const.sn.config.window.width'), true);
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['text'].val, "&-const.sn.config.window.width");
			assert.equal(alz.hPrm['text'].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});


		it('Arg80', ()=> {
			assert.equal(alz.go("a=3 b='1327' "), true);
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['a'].val, "3");
			assert.equal(alz.hPrm['a'].def, undefined);
			assert.equal(alz.hPrm['b'].val, "1327");
			assert.equal(alz.hPrm['b'].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});
		it('Arg81', ()=> {
			assert.equal(alz.go('name="fcol" text=%fcol|&0x000000'), true);
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['name'].val, "fcol");
			assert.equal(alz.hPrm['name'].def, undefined);
			assert.equal(alz.hPrm['text'].val, "%fcol");
			assert.equal(alz.hPrm['text'].def, "&0x000000");
			assert.equal(alz.isKomeParam, false);
		});
		it('Arg82', ()=> {
			assert.equal(alz.go('* layer="mes" page=%page|back visible=%visible|true b_left=&l b_top=0 b_width=&w b_height=&const.flash.display.Stage.stageHeight b_color=%b_color|&0xffffff b_alpha=%b_alpha|&sys:TextLayer.Back.Alpha r_size=12 max_col=25 bura_col=2 max_row=7'), true);
			assert.equal(isHashEmpty(alz.hPrm), false);

			assert.equal(alz.hPrm['layer'].val, "mes");
			assert.equal(alz.hPrm['layer'].def, undefined);
			assert.equal(alz.hPrm['page'].val, "%page");
			assert.equal(alz.hPrm['page'].def, "back");
			assert.equal(alz.hPrm['visible'].val, "%visible");
			assert.equal(alz.hPrm['visible'].def, "true");

			assert.equal(alz.hPrm['b_left'].val, "&l");
			assert.equal(alz.hPrm['b_left'].def, undefined);
			assert.equal(alz.hPrm['b_top'].val, "0");
			assert.equal(alz.hPrm['b_top'].def, undefined);
			assert.equal(alz.hPrm['b_width'].val, "&w");
			assert.equal(alz.hPrm['b_width'].def, undefined);
			assert.equal(alz.hPrm['b_height'].val, "&const.flash.display.Stage.stageHeight");
			assert.equal(alz.hPrm['b_height'].def, undefined);

			assert.equal(alz.hPrm['b_color'].val, "%b_color");
			assert.equal(alz.hPrm['b_color'].def, "&0xffffff");
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
			assert.equal(alz.go("layout=#&'" + 'lineHeight="36" justificationRule="space" columnGap="0" paddingLeft="$pl" paddingTop="$pt" paddingRight="$pr" paddingBottom="$pb" verticalAlign="inherit" blockProgression="rl" lineBreak="explicit" fontLookup="embeddedCFF" renderingMode="cff" fontSize="24" locale="ja" kerning="off" trackingRight="0" color="$fcol" whiteSpaceCollapse="preserve"' + "'#"), true);
			assert.equal(isHashEmpty(alz.hPrm), false);
			assert.equal(alz.hPrm['layout'].val, "&'" + 'lineHeight="36" justificationRule="space" columnGap="0" paddingLeft="$pl" paddingTop="$pt" paddingRight="$pr" paddingBottom="$pb" verticalAlign="inherit" blockProgression="rl" lineBreak="explicit" fontLookup="embeddedCFF" renderingMode="cff" fontSize="24" locale="ja" kerning="off" trackingRight="0" color="$fcol" whiteSpaceCollapse="preserve"' + "'");
			assert.equal(alz.hPrm['layout'].def, undefined);
			assert.equal(alz.isKomeParam, false);
		});


	});

});
