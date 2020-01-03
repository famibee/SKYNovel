/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {HArg, IPutCh} from './CmnInterface';
import m_xregexp = require('xregexp');

export interface IAutoPage { (idx: number, str: string): void; }

export class RubySpliter {
	private static	sesame		= 'ヽ';
	setting(hArg: HArg) {if (hArg.sesame) RubySpliter.sesame = hArg.sesame;}
	getSesame() {return RubySpliter.sesame;}

	private putCh	: IPutCh	= ()=> {};
	init(putCh: IPutCh) {this.putCh = putCh;}

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
	private static	REG_RUBY	: RegExp;
	static	setEscape(ce: string) {
		RubySpliter.REG_RUBY = m_xregexp(RubySpliter.mkEscReg(ce), 'gsx');
	}
	private	static	mkEscReg = (ce: string)=>
`(?: ${ce ? `(?<txt4>\\${ce}\\S) |` :''}
	(?: ｜(?<str>[^《\\n]+)《(?<ruby>[^》\\n]+)》)
|	(?: (?<kan>[⺀-⿟々〇〻㐀-鿿豈-﫿]+[ぁ-ヿ]*
	|	[^　｜》\\n⺀-⿟々〇〻㐀-鿿豈-﫿])《(?<kan_ruby>[^》\\n]+)》)
|	(?: (?<txt>[^　｜《》]*[ぁ-ヿ])(?=[⺀-⿟々〇〻㐀-鿿豈-﫿]+《))
|	(?<txt2>[^｜《》]+(?=｜\\|　))
|	(?<txt3>[\uD800-\uDBFF][\uDC00-\uDFFF]|.)
)`;

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

			if (elm['txt4']) {this.putCh(elm['txt4'].slice(1), ''); continue}

			const txt = elm['txt'] ?? elm['txt2'] ?? elm['txt3'] ?? '';
			const a: string[] = Array.from(txt);
				// txt.split('')や [...txt] はサロゲートペアで問題
			const len = a.length;
			for (let i=0; i<len; ++i) this.putCh(a[i], '');
		}
	}

	putTxtRb(text: string, ruby: string): void {
		const a: string[] = Array.from(text);
		const len = a.length;
		if (ruby.charAt(0) == '*' && ruby.length <= 2) {
			const rb_ses
				= 'center｜'
				+ ((ruby == '*') ? RubySpliter.sesame : ruby.charAt(1));
			for (let i=0; i<len; ++i) this.putCh(a[i], rb_ses);
			return;
		}

		// 自動区切りを行わない
		if (len == 1 || ruby.indexOf(' ') == -1) {
			this.putCh(text, ruby.replace(RubySpliter.REG_TAB_G, ' '));
			return;
		}

		// 空白がある場合はユーザが区切りを指定しているものと見なす
		const aR = ruby.split(' ');
		const lenR = aR.length;
		const len_max = (lenR > len) ?lenR :len;
		for (let i=0; i<len_max; ++i) {
			this.putCh(
				(i < len) ? a[i] : '',
				(i < lenR) ? aR[i].replace(RubySpliter.REG_TAB_G,' ') : ''
			);
		}
	}
	private	static	readonly	REG_TAB_G	= /\t/g;

	static	destroy() {RubySpliter.sesame = 'ヽ';}

}
