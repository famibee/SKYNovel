/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2021 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {HArg, IPutCh} from './CmnInterface';

export interface IAutoPage { (idx: number, str: string): void; }

export class RubySpliter {
	private static	sesame		= 'ヽ';
	static	setting(hArg: HArg) {if (hArg.sesame) RubySpliter.sesame = hArg.sesame;}
	static	getSesame() {return RubySpliter.sesame;}

	static	destroy() {RubySpliter.sesame = 'ヽ';}

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
		// 577 match 14303 step(~10ms) 	https://regex101.com/r/YmT3m1/2
		RubySpliter.REG_RUBY = new RegExp(
			`${ce ?`(?<ce>\\${ce}\\S)|` :''}`+
			`｜(?<str>[^《\\n]+)《(?<ruby>[^》\\n]+)》`+
			`|(?:(?<kan>[⺀-⿟々〇〻㐀-鿿豈-﫿]+[ぁ-ヿ]*|[^　｜《》\\n])`+
			`《(?<kan_ruby>[^》\\n]+)》)`+
			`|(?<txt>`+
			`[\uD800-\uDBFF][\uDC00-\uDFFF]`+
			`|[^　｜《》]+(?=｜)`+
			`|[^　｜《》]*[ぁ-ヿ](?=[⺀-⿟々〇〻㐀-鿿豈-﫿]+《)`+
			`|.)`,
			'gs'
		);
	}

	putTxt(text: string) {
		let e: any = null;
		// 全ループリセットかかるので不要	.lastIndex = 0;	// /gなので必要
		while (e = RubySpliter.REG_RUBY.exec(text)) {
			const g = e?.groups;
			if (! g) continue;
			const ruby: string = g.ruby;
			if (ruby) {this.putTxtRb(g.str, ruby); continue;}

			const kan_ruby: string = g.kan_ruby;
			if (kan_ruby) {this.putTxtRb(g.kan, kan_ruby); continue;}
			if (g.ce) {this.putCh(g.ce.slice(1), ''); continue}

			(Array.from(g.txt ?? '')as string[]).forEach(v=> this.putCh(v, ''));
				// txt.split('')や [...txt] はサロゲートペアで問題
		}
	}

	private	putTxtRb(text: string, ruby: string) {
		const a: string[] = Array.from(text);
		const len = a.length;
		if (ruby.charAt(0) === '*' && ruby.length <= 2) {
			const rb_ses
				= 'center｜'
				+ ((ruby === '*') ? RubySpliter.sesame : ruby.charAt(1));
			for (let i=0; i<len; ++i) this.putCh(a[i], rb_ses);
			return;
		}

		// 自動区切りを行わない
		if (len === 1 || ruby.indexOf(' ') === -1) {
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

}
