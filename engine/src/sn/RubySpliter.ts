/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {HArg, IPutCh} from './CmnLib';
import m_xregexp = require('xregexp');

export interface IAutoPage { (idx: number, str: string): void; }

export class RubySpliter {
	private static	sesame		= 'ヽ';
	setting(hArg: HArg): void {if (hArg.sesame) RubySpliter.sesame = hArg.sesame;}
	getSesame() {return RubySpliter.sesame;}

	private putCh	: IPutCh	= ()=> {};
	init(putCh: IPutCh): void {this.putCh = putCh;}


/*
		★Unicodeで「漢字」の正規表現 – ものかの http://tama-san.com/kanji-regex/
		2E80..2FDF CJK部首補助＋康熙部首
		3005 々（漢字の踊り字）
		3007 〇（漢数字のゼロ）
		303B 〻（漢字の踊り字）
		3400..4DBF CJK統合漢字拡張A
		4E00..9FFF CJK統合漢字
		F900..FAFF CJK互換漢字
		20000..2FFFF CJK統合漢字拡張B〜F＋CJK互換漢字追加＋念のためU+2FFFFまで

		[\x{2E80}-\x{2FDF}々〇〻\x{3400}-\x{4DBF}\x{4E00}-\x{9FFF}\x{F900}-\x{FAFF}\x{20000}-\x{2FFFF}]
		[\u2E80-\u2FDF々〇〻\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\u20000-\u2FFFF]
		[⺀-⿟々〇〻㐀-䶿一-鿿豈-﫿\u20000-\u2FFFF]		// 含まれない文字がある
		[⺀-⿟々〇〻㐀-鿿豈-﫿\u20000-\u2FFFF]			// ヽ--30FD が変に引っかかる。多分\u2000-\u2FFF解釈
		\\u{20000}-\\u{2FFFF}	// 五桁だとエラー
*/
	private static	REG_RUBY	= m_xregexp(
		`(?:`+
		`	(?: ｜(?<str>[^《\\n]+)《(?<ruby>[^》\\n]+)》)`+
		// AIRNovel時代
	//	`|	(?: (?<kan>[々〇㐀-鿿豈-﫿]+[ぁ-ヿ]*`+
	//	`	|	[^　｜》\\n々〇㐀-鿿豈-﫿])《(?<kan_ruby>[^》\\n]+)》)`+
	//	`|	(?: (?<txt>[^　｜《》]*[ぁ-ヿ])(?=[々〇㐀-鿿豈-﫿]+《))`+
		`|	(?: (?<kan>[⺀-⿟々〇〻㐀-鿿豈-﫿]+[ぁ-ヿ]*`+
		`	|	[^　｜》\\n⺀-⿟々〇〻㐀-鿿豈-﫿])《(?<kan_ruby>[^》\\n]+)》)`+
		`|	(?: (?<txt>[^　｜《》]*[ぁ-ヿ])(?=[⺀-⿟々〇〻㐀-鿿豈-﫿]+《))`+
		`|	(?<txt2>[^｜《》]+(?=｜\\|　))`+
		`|	(?<txt3>.)`+
		`)`, 'gsx');

	putTxt(text: string): void {
		let elm: any = null, pos = 0;
		while (elm = m_xregexp.exec(text, RubySpliter.REG_RUBY, pos)) {
			pos = elm['index'] + elm[0].length;
			const ruby: string = elm['ruby'];
			if (ruby) {
				this.putTxtRb(elm['str'], ruby);
				continue;
			}

			const kan_ruby: string = elm['kan_ruby'];
			if (kan_ruby) {
				this.putTxtRb(elm['kan'], kan_ruby);
				continue;
			}

			const txt = elm['txt'] || elm['txt2'] || elm['txt3'] || '';
			for (const v of txt) this.putCh(v, '');
		}
	}

	putTxtRb(text: string, ruby: string): void {
		if (ruby.charAt(0) == '*' && ruby.length<=2) {
			const rb_ses
				= 'center｜'
				+ ((ruby == '*') ? RubySpliter.sesame : ruby.charAt(1));
			for (const v of text) this.putCh(v, rb_ses);
			return;
		}

		// 自動区切りを行わない
		const len_text = text.length;
		if (len_text == 1 || ! ruby.includes(' ')) {
			this.putCh(text, ruby.replace(RubySpliter.REG_TAB_G, ' '));
			return;
		}

		// 空白がある場合はユーザが区切りを指定しているものと見なす
		const vct = ruby.split(' ');
		const len_spl = vct.length;
		const loop_max = (len_spl > len_text) ? len_spl : len_text;
		for (let i=0; i<loop_max; ++i) {
			this.putCh(
				(i < len_text) ? text.charAt(i) : '',
				(i < len_spl) ? vct[i].replace(RubySpliter.REG_TAB_G,' ') : ''
			);
		}
	}
	private	static	REG_TAB_G	= /\t/g;

	static	destroy() {RubySpliter.sesame = 'ヽ';}

}
