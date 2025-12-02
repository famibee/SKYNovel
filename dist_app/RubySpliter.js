class o {
  static #s = "ヽ";
  static setting(t) {
    t.sesame && (o.#s = t.sesame);
  }
  static getSesame() {
    return o.#s;
  }
  static destroy() {
    o.#s = "ヽ";
  }
  #t = () => {
  };
  init(t) {
    this.#t = t;
  }
  /*
  		★Unicodeで「漢字」の正規表現 – ものかの http://tama-san.com/kanji-regex/
  		2E80..2FDF	CJK部首補助＋康熙部首
  		3005		々（漢字の踊り字）
  		3007		〇（漢数字のゼロ）
  		303B		〻（漢字の踊り字）
  		3400..4DBF		CJK統合漢字拡張A
  		4E00..9FFF		CJK統合漢字
  		F900..FAFF		CJK互換漢字
  		20000..2FFFF	CJK統合漢字拡張B〜F＋CJK互換漢字追加＋念のためU+2FFFFまで
  
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
  static #n;
  static setEscape(t) {
    o.#n = new RegExp(
      (t ? `(?<ce>\\${t}\\S)|` : "") + "｜(?<str>[^《\\n]+)《(?<ruby>[^》\\n]+)》|(?:(?<kan>[⺀-⿟々〇〻㐀-鿿豈-﫿]+[ぁ-ヿ]*|[^　｜《》\\n])《(?<kan_ruby>[^》\\n]+)》)|(?<txt>[\uD800-\uDBFF][\uDC00-\uDFFF]|[^｜《》]+?|.)",
      "gs"
    );
  }
  putTxt(t) {
    for (const { groups: s } of t.matchAll(o.#n)) {
      if (!s) break;
      const { ruby: c, kan_ruby: e, kan: a = "", ce: i, txt: r = "", str: n = "" } = s;
      if (c) {
        this.putTxtRb(decodeURIComponent(n), c);
        continue;
      }
      if (e) {
        this.putTxtRb(a, e);
        continue;
      }
      if (i) {
        this.#t(i.slice(1), "");
        continue;
      }
      for (const f of Array.from(r)) this.#t(f, "");
    }
  }
  putTxtRb(t, s) {
    if (/^\w+｜{"/.test(s)) {
      this.#t(t, s);
      return;
    }
    const c = Array.from(t), e = c.length;
    if (/^\*.?$/.test(s)) {
      const n = "center｜" + (s === "*" ? o.#s : s.charAt(1));
      for (const f of c) this.#t(f, n);
      return;
    }
    if (e === 1 || !s.includes(" ")) {
      this.#t(t, decodeURIComponent(s));
      return;
    }
    const a = s.split(" "), i = a.length, r = i > e ? i : e;
    for (let n = 0; n < r; ++n) this.#t(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      n < e ? c[n] : "",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      n < i ? decodeURIComponent(a[n]) : ""
    );
  }
}
export {
  o as R
};
//# sourceMappingURL=RubySpliter.js.map
