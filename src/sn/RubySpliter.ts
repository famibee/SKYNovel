/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {HArg} from './Grammar';
import {IPutCh} from './CmnInterface';

export interface IAutoPage { (idx: number, str: string): void; }

export class RubySpliter {
	static	#sesame		= 'ヽ';
	static	setting(hArg: HArg) {if (hArg.sesame) RubySpliter.#sesame = hArg.sesame}
	static	getSesame() {return RubySpliter.#sesame}

	static	destroy() {RubySpliter.#sesame = 'ヽ'}

	#putCh	: IPutCh	= ()=> {};
	init(putCh: IPutCh) {this.#putCh = putCh}

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

		【2022/10/03】ruby正規表現のUnicode プロパティ(とPOSIX文字クラス) - Qiita https://qiita.com/Takayuki_Nakano/items/8d38beaddb84b488d683
			> このHiraganaプロパティ、長音記号は含まれていません。
			> \p{Han}…簡体字や繁体字、韓国語の漢字…ベトナム語の漢字にもマッチ
		
		・Unicode文字一覧表 - instant tools https://tools.m-bsys.com/ex/unicode_table.php
*/
	static	#REG_RUBY	: RegExp;
	static	setEscape(ce: string) {
		// 830 match 11293 step(1.7ms) PCRE2 https://regex101.com/r/BBrQtC/1
		/*
(?<txt4>\\\S)
|	｜(?<str>[^《\n]+)《(?<ruby>[^》\n]+)》
|	(?: (?<kan>[⺀-⿟々〇〻㐀-鿿豈-﫿]+ [ぁ-ヿ]* | [^　｜《》\n])
		《(?<kan_ruby>[^》\n]+)》)
|	(?<txt>
	[\xD800-\xDBFF][\xDC00-\xDFFF]
|	[^｜《》]+?
|	.)
		*/
		RubySpliter.#REG_RUBY = new RegExp(
			`${ce ?`(?<ce>\\${ce}\\S)|` :''}`+
			`｜(?<str>[^《\\n]+)《(?<ruby>[^》\\n]+)》`+
			`|(?:(?<kan>[⺀-⿟々〇〻㐀-鿿豈-﫿]+[ぁ-ヿ]*|[^　｜《》\\n])`+
			`《(?<kan_ruby>[^》\\n]+)》)`+
			`|(?<txt>`+
			`[\uD800-\uDBFF][\uDC00-\uDFFF]`+	// 上位 + 下位サロゲート
			`|[^｜《》]+?`+		// 不要だが細切れにしないほうが後々効率で有利
			`|.)`,
			'gs'
		);
	}

	putTxt(text: string) {
		for (const {groups} of text.matchAll(RubySpliter.#REG_RUBY)) {
			const {ruby, kan_ruby, kan, ce, txt='', str} = groups!;
			if (ruby) {this.putTxtRb(decodeURIComponent(str), ruby); continue}

			if (kan_ruby) {this.putTxtRb(kan, kan_ruby); continue}
			if (ce) {this.#putCh(ce.slice(1), ''); continue}

			for (const v of Array.from(txt as string)) this.#putCh(v, '');
				// txt.split('')や [...txt] はサロゲートペアで問題
		}
	}

	putTxtRb(text: string, ruby: string) {	// テスト用にpublic
		// 自動区切りを行わない（内部的 json文法）
		if (/^\w+｜{"/.test(ruby)) {this.#putCh(text, ruby); return}

		const a: string[] = Array.from(text);
		const len = a.length;
		if (/^\*.?$/.test(ruby)) {	// 傍点文法
			const rb_ses = 'center｜'+ (ruby === '*' ?RubySpliter.#sesame :ruby.charAt(1));
			for (let i=0; i<len; ++i) this.#putCh(a[i], rb_ses);
			return;
		}

		// 自動区切りを行わない（単漢字など）
		if (len === 1 || ! ruby.includes(' ')) {
			this.#putCh(text, decodeURIComponent(ruby));
			return;
		}

		// 空白がある場合はユーザが区切りを指定しているものと見なす
		const aR = ruby.split(' ');
		const lenR = aR.length;
		const len_max = (lenR > len) ?lenR :len;
		for (let i=0; i<len_max; ++i) this.#putCh(
			(i < len) ? a[i] : '',
			(i < lenR) ? decodeURIComponent(aR[i]) : ''
		);
	}

}
