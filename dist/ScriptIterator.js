import { y as P, c as w, z as B, f as T, H as y, k as x, a as m, I as S, L as D, D as g, b as I } from "./web2.js";
import { C as $, a as O } from "./SndBuf.js";
import { a as v, R as N } from "./Reading.js";
class E {
  constructor(t = "", s = 0, i = { ":hEvt1Time": {}, ":hMp": {}, ":lenIfStk": 1 }) {
    this.fn = t, this.idx = s, this.csArg = i;
  }
  toString = () => `[fn:${this.fn}, idx:${this.idx}, csArg:${this.csArg}]`;
}
class d {
  static #s = "ヽ";
  static setting(t) {
    t.sesame && (d.#s = t.sesame);
  }
  static getSesame() {
    return d.#s;
  }
  static destroy() {
    d.#s = "ヽ";
  }
  #i = () => {
  };
  init(t) {
    this.#i = t;
  }
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
  static #t;
  static setEscape(t) {
    d.#t = new RegExp(
      `${t ? `(?<ce>\\${t}\\S)|` : ""}｜(?<str>[^《\\n]+)《(?<ruby>[^》\\n]+)》|(?:(?<kan>[⺀-⿟々〇〻㐀-鿿豈-﫿]+[ぁ-ヿ]*|[^　｜《》\\n])《(?<kan_ruby>[^》\\n]+)》)|(?<txt>[\uD800-\uDBFF][\uDC00-\uDFFF]|[^｜《》]+?|.)`,
      "gs"
    );
  }
  putTxt(t) {
    for (const { groups: s } of t.matchAll(d.#t)) {
      const { ruby: i, kan_ruby: e, kan: h = "", ce: a, txt: l = "", str: r = "" } = s;
      if (i) {
        this.putTxtRb(decodeURIComponent(r), i);
        continue;
      }
      if (e) {
        this.putTxtRb(h, e);
        continue;
      }
      if (a) {
        this.#i(a.slice(1), "");
        continue;
      }
      for (const n of Array.from(l)) this.#i(n, "");
    }
  }
  putTxtRb(t, s) {
    if (/^\w+｜{"/.test(s)) {
      this.#i(t, s);
      return;
    }
    const i = Array.from(t), e = i.length;
    if (/^\*.?$/.test(s)) {
      const r = "center｜" + (s === "*" ? d.#s : s.charAt(1));
      for (let n = 0; n < e; ++n) this.#i(i[n], r);
      return;
    }
    if (e === 1 || !s.includes(" ")) {
      this.#i(t, decodeURIComponent(s));
      return;
    }
    const h = s.split(" "), a = h.length, l = a > e ? a : e;
    for (let r = 0; r < l; ++r) this.#i(
      r < e ? i[r] : "",
      r < a ? decodeURIComponent(h[r]) : ""
    );
  }
}
const L = "compChIn";
class p {
  //MARK: コンストラクタ
  constructor(t, s, i, e, h, a, l) {
    this.cfg = t, this.hTag = s, this.main = i, this.val = e, this.prpPrs = h, this.sndMng = a, this.sys = l, s.let_ml = (n) => this.#Z(n), s.endlet_ml = () => !1, s.dump_stack = () => this.#tt(), s.dump_script = (n) => this.#st(n), s.else = // その他ifブロック開始
    s.elsif = // 別条件のifブロック開始
    s.endif = () => this.#et(), s.if = (n) => this.#nt(n), s.call = (n) => this.#ht(n), s.jump = (n) => this.#at(n), s.pop_stack = (n) => this.#ot(n), s.return = (n) => this.#j(n), s.bracket2macro = (n) => this.#kt(n), s.char2macro = (n) => this.#gt(n), s.endmacro = (n) => this.#j(n), s.macro = (n) => this.#vt(n), s.load = (n) => this.#bt(n), s.reload_script = (n) => this.#wt(n), s.record_place = () => this.#U(), s.save = (n) => this.#Tt(n), t.oCfg.debug.token && (this.#W = (n) => {
      n.trim() !== "" && console.log(`🌱 トークン ${this.#i}:${this.#e} (i:${this.#t} cs:${this.#n.length}) %c【${n}】`, "background-color:#350;");
    }), t.oCfg.debug.tag && (this.#B = (n) => console.log(`🌲 タグ解析 ${this.#i}:${this.#e} (i:${this.#t} cs:${this.#n.length}) %c[${n} %o]`, "background-color:#30B;", this.#r.hPrm)), e.defTmp("const.sn.aIfStk.length", () => this.#o.length), e.defTmp("const.sn.vctCallStk.length", () => this.#n.length), this.#c = new P(t);
    const r = t.oCfg.init.escape;
    if (this.#c.setEscape(r), d.setEscape(r), w.isDbg) {
      l.addHook((o, c) => this.#b[o]?.(c)), this.isBreak = this.#A;
      const n = this.analyzeInit;
      this.analyzeInit = () => {
        this.analyzeInit = () => {
        }, this.sys.send2Dbg("hi", {});
      }, this.#b.auth = (o) => {
        const c = o.hBreakpoint.hFn2hLineBP;
        for (const [f, u] of Object.entries(c)) this.#E(f, u);
        p.#p = {};
        for (const f of o.hBreakpoint.aFunc)
          p.#p[f.name] = 1;
        if (o.stopOnEntry) {
          for (; ; ) {
            let f = this.nextToken();
            if (!f) break;
            const u = f.charCodeAt(0);
            if (u === 91 || u === 38 || u === 42 && f.length === 1) break;
            u === 10 && (this.#e += f.length);
          }
          this.sys.callHook("stopOnEntry", {}), this.analyzeInit = n, this.analyzeInit();
        } else
          this.noticeWait = () => {
            this.noticeWait = () => {
            }, this.sys.callHook("stopOnEntry", {});
          }, this.analyzeInit = n, this.analyzeInit();
      };
    } else this.recodeDesign = () => {
    };
  }
  #s = { aToken: [""], len: 1, aLNum: [1] };
  #i = "";
  get scriptFn() {
    return this.#i;
  }
  #t = 0;
  get idxToken() {
    return this.#t;
  }
  subIdxToken() {
    --this.#t;
  }
  #e = 0;
  get lineNum() {
    return this.#e;
  }
  addLineNum = (t) => this.#e += t;
  jumpJustBefore() {
    this.#f(this.#i, "", --this.#t);
  }
  // 直前にジャンプ
  #n = [];
  // FILOバッファ（push/pop）
  #c;
  #r = new B();
  noticeWait = () => {
  };
  #E(t, s) {
    p.#T[this.#g(t)] = s;
  }
  destroy() {
    this.isBreak = this.#U = () => !1;
  }
  #b = {
    //auth: // constructorで
    //launch:	// ここでは冒頭停止に間に合わないのでanalyzeInit()で
    disconnect: () => {
      p.#T = {}, p.#p = {}, this.isBreak = () => !1, this.#b.continue({}), this.#h = 0;
    },
    restart: () => this.isBreak = () => !1,
    // ブレークポイント登録
    add_break: (t) => this.#E(t.fn, t.o),
    data_break: (t) => {
      this.#h === 0 && (this.#h = 1, this.main.setLoop(!1, `変数 ${t.dataId}【${t.old_v}】→【${t.new_v}】データブレーク`), this.sys.callHook("stopOnDataBreakpoint", {}), this.sys.send2Dbg("stopOnDataBreakpoint", {}));
    },
    set_func_break: (t) => {
      p.#p = {};
      for (const s of t.a) p.#p[s.name] = 1;
      this.sys.send2Dbg(t.ri, {});
    },
    // 情報問い合わせ系
    stack: (t) => this.sys.send2Dbg(t.ri, { a: this.#J() }),
    eval: (t) => {
      this.sys.send2Dbg(t.ri, { v: this.prpPrs.parse(t.txt) });
    },
    // デバッガからの操作系
    continue: () => {
      this.#w() || (this.#t -= this.#_, this.#h = 3, this.main.setLoop(!0), this.main.resume());
    },
    stepover: (t) => this.#L(t),
    stepin: () => {
      if (this.#w()) return;
      const t = this.#s.aToken[this.#t - this.#_];
      this.sys.callHook(`stopOnStep${this.#N.test(t ?? "") ? "In" : ""}`, {}), this.#t -= this.#_, this.#h = this.#h === 1 ? 4 : 5, this.main.setLoop(!0), this.main.resume();
    },
    stepout: (t) => {
      this.#w() || (this.#n.length > 0 ? this.#C(!0) : this.#L(t));
    },
    pause: () => {
      this.#h = 4, this.main.setLoop(!1, "一時停止"), this.sys.send2Dbg("stopOnStep", {});
    },
    stopOnEntry: () => {
      this.#h = 4, this.main.setLoop(!1, "一時停止"), this.sys.send2Dbg("stopOnEntry", {});
    }
  };
  #k = (t) => this.cfg.searchPath(t, T.SCRIPT);
  static #q = /(.+)\/crypto_prj\/([^\/]+)\/[^\.]+(\.\w+)/;
  // https://regex101.com/r/Km54EK/1 141 steps (~0ms)
  #g = (t) => (this.sys.pathBaseCnvSnPath4Dbg + this.#k(t)).replace(p.#q, `$1/prj/$2/${this.#i}$3`);
  cnvPath4Dbg = (t) => this.sys.pathBaseCnvSnPath4Dbg + t.replace("/crypto_prj/", "/prj/");
  #L(t) {
    if (this.#w()) return;
    const s = this.#s.aToken[this.#t - this.#_];
    this.#N.test(s ?? "") ? this.#C(!1) : (this.sys.callHook("stopOnStep", {}), this.#b.stepin(t));
  }
  #C(t) {
    this.sys.callHook(`stopOnStep${t ? "Out" : ""}`, {}), this.#P = this.#n.length - (t ? 1 : 0), this.#t -= this.#_, this.#h = t ? 7 : 6, this.main.setLoop(!0), this.main.resume();
  }
  #P = 0;
  get #_() {
    return this.#h === 2 || this.#h === 4 ? 1 : 0;
  }
  #w() {
    return this.#t < this.#s.len ? !1 : (this.sys.callHook("stopOnEntry", {}), this.main.setLoop(!1, "スクリプト終端です isIdxOverLast"), !0);
  }
  // reload 再生成 Main に受け渡すため static
  static #T = {};
  static #p = {};
  #h = 0;
  // https://raw.githubusercontent.com/famibee/SKYNovel-vscode-extension/master/src/doc/BreakStateSMD.pu
  isBreak = (t) => !1;
  #A(t) {
    switch (this.#h) {
      case 6:
        this.#y(), this.#h = 7;
        break;
      case 7:
        if (this.#n.length !== this.#P) break;
        return this.#h = 4, this.main.setLoop(!1, "ステップ実行"), this.sys.send2Dbg("stopOnStep", {}), !0;
      // タグを実行せず、直前停止
      case 5:
        this.#y(), this.#h = 4;
        break;
      case 4:
        return this.#y(), this.main.setLoop(!1, "ステップ実行"), this.sys.send2Dbg("stopOnStep", {}), !0;
      // タグを実行せず、直前停止
      case 3:
        this.#y(), this.#h = 0;
        break;
      default:
        if (y(t) in p.#p)
          return this.#h = 2, this.main.setLoop(!1, `関数 ${t} ブレーク`), this.sys.callHook("stopOnBreakpoint", {}), this.sys.send2Dbg("stopOnBreakpoint", {}), !0;
        {
          const s = p.#T[this.#g(this.#i)];
          if (!s) break;
          const i = s[this.#e];
          if (!i) break;
          if (i.condition) {
            if (!this.prpPrs.parse(i.condition)) break;
          } else if ("hitCondition" in i && --i.hitCondition > 0) break;
          const e = this.#h === 0;
          this.#h = 2, this.main.setLoop(!1, e ? (i.condition ? "条件" : "ヒットカウント") + "ブレーク" : "ステップ実行");
          const h = e ? "stopOnBreakpoint" : "stopOnStep";
          this.sys.callHook(h, {}), this.sys.send2Dbg(h, {});
        }
        return !0;
    }
    return !1;
  }
  #y() {
    const t = p.#T[x(this.#i)]?.[this.#e];
    t?.hitCondition && --t.hitCondition;
  }
  #J() {
    const t = this.#h === 3 ? 1 : 0, s = this.#s.aToken[this.#t - 1 + t], i = this.#g(this.#i), e = y(s), h = e ? `[${e}]` : s, a = this.val.getVal("mp:const.sn.macro") ?? "{}";
    if (this.#t === 0) return [{ fn: i, ln: 1, col: 1, nm: h, ma: a }];
    const l = this.#l(this.#s, this.#t), r = [{ fn: i, ln: l.ln, col: l.col_s + 1, nm: h, ma: a }], n = this.#n.length;
    if (n === 0) return r;
    for (let o = n - 1; o >= 0; --o) {
      const c = this.#n[o], f = this.#a[c.fn];
      if (!f) continue;
      const u = f.aToken[c.idx - 1];
      if (!u) continue;
      const k = this.#l(f, c.idx), b = y(u);
      r.push({
        fn: this.#g(c.fn),
        ln: k.ln,
        col: k.col_s + 1,
        nm: b ? `[${b}]` : u,
        ma: c.csArg[":hMp"]["const.sn.macro"] ?? "{}"
      });
    }
    return r;
  }
  // result = true : waitする  resume()で再開
  #B = (t) => {
  };
  //MARK: タグ解析
  async タグ解析(t, s) {
    const i = this.hTag[t];
    if (!i) throw `未定義のタグ【${t}】です`;
    this.#r.parse(s), this.#B(t);
    const e = this.#r.hPrm;
    if (e.cond) {
      const n = e.cond.val;
      if (!n || n.startsWith("&")) throw "属性condは「&」が不要です";
      const o = this.prpPrs.parse(n), c = String(o);
      if (c === "null" || c === "undefined" || !o) return !1;
    }
    let h = {};
    const a = this.#n.length, l = a === 0 ? {} : this.#n[a - 1].csArg;
    if (this.#r.isKomeParam) {
      if (a === 0) throw "属性「*」はマクロのみ有効です";
      h = { ...l };
    }
    h[":タグ名"] = t;
    for (const [n, { val: o, def: c }] of Object.entries(e)) {
      let f = o;
      if (f?.startsWith("%")) {
        if (a === 0) throw "属性「%」はマクロ定義内でのみ使用できます（そのマクロの引数を示す簡略文法であるため）";
        const u = l[f.slice(1)];
        if (u) {
          h[n] = u;
          continue;
        }
        if (c === void 0 || c === "null") continue;
        f = c;
      }
      if (f = this.prpPrs.getValAmpersand(f ?? ""), f !== "undefined") {
        h[n] = f;
        continue;
      }
      c !== void 0 && (f = this.prpPrs.getValAmpersand(c), f !== "undefined" && (h[n] = f));
    }
    if (v.needGoTxt && this.#X.has(t)) {
      const { promise: n, resolve: o } = Promise.withResolvers();
      v.beginProc(L, o, !1), v.goTxt(), this.val.saveKidoku(), await n;
    }
    const r = this.#Y[t];
    return r && m(h, "canskip", this.#Q[t] ?? !0) && this.#D.isSkipping ? r(e) : i(h);
  }
  // 文字出現演出を待つタグ
  //	ここで列挙せずタグ処理で文字表示を始めたい場合、goTxt()すること
  #X = /* @__PURE__ */ new Set([
    // 変数操作
    // 'clearsysvar',	// システム変数の全消去
    // 'clearvar',		// ゲーム変数の全消去 
    // 'let_abs',		// 絶対値
    // 'let_char_at',	// 文字列から一字取りだし
    // 'let_index_of',	// 文字列で検索
    // 'let_length',	// 文字列の長さ
    // 'let_ml',		// インラインテキスト代入
    // 'let_replace',	// 正規表現で置換
    // 'let_round',		// 四捨五入
    // 'let_search',	// 正規表現で検索
    // 'let_substr',	// 文字列から抜きだし
    // 'let',			// 変数代入・演算
    // レイヤ共通
    // 'add_lay',		// レイヤを追加する
    // 'clear_lay',	// レイヤ設定の消去
    // 'finish_trans',	// トランス強制終了
    // 'lay',	// レイヤ設定
    "trans",
    // ページ裏表を交換
    "wt",
    // トランス終了待ち
    // 'add_filter',	// フィルター追加
    // 'clear_filter',	// フィルター全削除
    // 'enable_filter',// フィルター個別切替
    // トゥイーンアニメ
    // 'pause_tsy',	// 一時停止
    // 'resume_tsy',	// 一時停止再開
    // 'stop_tsy',	// トゥイーン中断
    // 'tsy',		// トゥイーン開始
    "wait_tsy",
    // トゥイーン終了待ち
    // 文字・文字レイヤ
    // 'autowc',	// 文字ごとのウェイト
    // 'ch',		// 文字を追加する
    // 'ch_in_style',	// 文字出現演出定義
    // 'ch_out_style',	// 文字消去演出定義
    // 'clear_text',	// 文字消去
    // 'current',	// デフォルト文字レイヤ設定
    // 'endlet_ml',	// インラインテキスト代入の終端
    // 'endlink',	// ハイパーリンクの終了
    // 'er',		// ページ両面の文字消去
    // 'graph',		// インライン画像表示
    // 'link',		// ハイパーリンク
    // 'r',			// 改行
    // 'rec_ch',	// 履歴書き込み
    // 'rec_r',		// 履歴改行
    // 'reset_rec',	// 履歴リセット
    // 'ruby2',		// 文字列と複数ルビの追加
    // 'set_focus',	// フォーカス移動
    // 'span',		// インラインスタイル設定
    // 'tcy',		// 縦中横を表示する
    // 画像・画像レイヤ
    // 'add_face',	// 差分名称の定義
    "wv",
    // 動画再生終了待ち
    // HTMLフレーム
    // 'add_frame',	// フレーム追加
    // 'frame',	// フレームに設定
    // 'let_frame',	// フレーム変数を取得
    // 'set_frame',	// フレーム変数に設定
    // 'tsy_frame',	// フレームをトゥイーン開始
    // イベント
    // 'clear_event',	// イベントを全消去
    // 'enable_event',	// イベント有無の切替
    // 'event',	// イベントを予約
    "l",
    // 行末クリック待ち
    "p",
    // 改ページクリック待ち
    "s",
    // 停止する
    "wait",
    // ウェイトを入れる
    "waitclick",
    // クリックを待つ
    // ＢＧＭ・効果音
    // 'fadebgm',	// BGMのフェード
    // 'fadeoutbgm',// BGMのフェードアウト
    // 'fadeoutse',	// 効果音のフェードアウト
    // 'fadese',	// 効果音のフェード
    // 'playbgm',	// BGM の演奏
    // 'playse',	// 効果音の再生
    // 'stop_allse',// 全効果音再生の停止
    // 'stopbgm',	// BGM 演奏の停止
    // 'stopfadese',// 音声フェードの停止
    // 'stopse',	// 効果音再生の停止
    // 'volume',	// BGMや効果音の音量を指定
    "wb",
    // BGM フェードの終了待ち
    "wf",
    // 効果音フェードの終了待ち
    "wl",
    // BGM 再生の終了待ち
    "ws",
    // 効果音再生の終了待ち
    // 'xchgbuf',	// サウンドバッファの交換
    // 条件分岐
    // 'else',	// その他ifブロック開始
    // 'elsif',	// 別条件のifブロック開始
    // 'endif',	// ifブロックの終端
    // 'if',	// ifブロックの開始
    // ラベル・ジャンプ
    // 'button',	// ボタンを表示
    // 'call',		// サブルーチンコール
    // 'jump',		// シナリオジャンプ
    // 'page',		// ページ移動
    // 'pop_stack',	// コールスタック破棄
    // 'return',	// サブルーチンから戻る
    // マクロ
    // 'bracket2macro',	// 括弧マクロの定義
    // 'char2macro',	// 一文字マクロの定義
    // 'endmacro',	// マクロ定義の終了
    // 'macro',		// マクロ定義の開始
    // しおり
    // 'copybookmark',	// しおりの複写
    // 'erasebookmark',	// しおりの消去
    // 'load',			// しおりの読込
    // 'record_place',	// セーブポイント指定
    // 'reload_script',	// スクリプト再読込
    // 'save',			// しおりの保存
    // 画面揺らし
    "quake",
    // 画面を揺らす
    // 'stop_quake',// 画面揺らし中断
    "wq"
    // 画面揺らし終了待ち
    // システム
    // 'close',		// アプリの終了
    // 'export',	// プレイデータをエクスポート
    // 'import',	// プレイデータをインポート
    // 'loadplugin',	// プラグインの読み込み
    // 'navigate_to',	// ＵＲＬを開く
    // 'snapshot',		// スナップショット
    // 'title',		// タイトル指定
    // 'toggle_full_screen',	// 全画面状態切替
    // 'update_check',	// 更新チェック機能
    // 'window',	// アプリウインドウ設定
    // デバッグ・その他
    // 'dump_lay',		// レイヤのダンプ
    // 'dump_script',	// 外部へスクリプトを表示
    // 'dump_stack',	// スタックのダンプ
    // 'dump_val',		// 変数のダンプ
    // 'log',		// ログ出力
    // 'trace',		// デバッグ表示へ出力
  ]);
  // キー押しっぱなしスキップで処理せずスルーするタグ
  #Y = {
    wt: () => $.finish_trans(),
    // トランス終了待ち
    wait_tsy: (t) => this.hTag.stop_tsy(t),
    // トゥイーン終了待ち
    // 'wv',		：タグ内部で処理	// 動画再生終了待ち
    wait: () => !1,
    // ウェイトを入れる
    // 'playbgm',	：スルー不可		// BGM の演奏
    // 'playse',	：タグ内部で処理	// 効果音の再生
    wb: () => this.hTag.stopfadese({ buf: O }),
    // BGM フェードの終了待ち
    // 'wf'		：タグ内部で処理	// 効果音フェードの終了待ち
    // 'ws'		：タグ内部で処理	// 効果音再生の終了待ち
    wq: () => this.hTag.stop_quake({}),
    // 画面揺らし終了待ち
    // fade系	：タグ内部で処理
    // 'ch'		：タグ内部で処理	// 文字を追加する
    // 'tsy'	：タグ内部で処理	// トゥイーン開始
    // 'trans'	：タグ内部で処理	// ページ裏表を交換
    quake: () => !1
    // 画面を揺らす
  };
  // タグ処理中にクリックなどで即終わらせられるタグ（canskip 属性がある）
  #Q = {
    // デフォルト値
    wt: !0,
    // [wt]トランス終了待ち
    wait_tsy: !0,
    // [wait_tsy]トゥイーン終了待ち
    wv: !0,
    // [wv]動画再生終了待ち
    wait: !0,
    // [wait]ウェイトを入れる
    playbgm: !1,
    // [playbgm]BGM の演奏
    playse: !0,
    // [playse]効果音の再生
    wb: !1,
    // [wb]BGM フェードの終了待ち
    wf: !1,
    // [wf]効果音フェードの終了待ち
    ws: !1,
    // [ws]効果音再生の終了待ち
    wq: !0
    // [wq]画面揺らし終了待ち
  };
  #D;
  #m;
  setOtherObj(t, s) {
    this.#D = t, this.#m = s;
  }
  //MARK: インラインテキスト代入
  #Z(t) {
    const { name: s } = t;
    if (!s) throw "nameは必須です";
    let i = "";
    const e = this.#s.len;
    for (; this.#t < e && (i = this.#s.aToken[this.#t], i === ""); ++this.#t)
      ;
    return t.text = i, t.cast = "str", this.hTag.let(t), this.#t += 2, this.#e += (i.match(/\n/g) ?? []).length, !1;
  }
  //MARK: スタックのダンプ
  #tt() {
    if (this.#t === 0)
      return console.group(`🥟 [dump_stack] スクリプト現在地 fn:${this.#i} line:1 col:0`), console.groupEnd(), !1;
    const t = this.#l(this.#s, this.#t), s = `スクリプト現在地 fn:${this.#i} line:${t.ln} col:${t.col_s + 1}`;
    console.group(`🥟 [dump_stack] ${s}`);
    const i = this.#n.length;
    if (i > 0) {
      console.info(s);
      for (let e = i - 1; e >= 0; --e) {
        const h = this.#n[e], a = h.csArg[":hMp"], l = a ? a[":タグ名"] : void 0, r = h.csArg[":タグ名"] ?? "", n = this.#l(this.#a[h.fn], h.idx);
        console.info(
          `${i - e}つ前のコール元 fn:${h.fn} line:${n.ln} col:${n.col_s + 1}` + (l ? "（[" + l + "]マクロ内）" : " ") + `で [${r} ...]をコール`
        );
      }
    }
    return console.groupEnd(), !1;
  }
  #l(t, s) {
    const i = { ln: 1, col_s: 0, col_e: 0 };
    if (!t) return i;
    let e = s - 1;
    const h = i.ln = t.aLNum[e];
    for (; t.aLNum[e] === h; ) {
      if (!t.aToken[e].startsWith(`
`)) {
        const a = t.aToken[e].length;
        i.col_e > 0 && (i.col_s += a), i.col_e += a;
      }
      if (--e < 0) break;
    }
    return i;
  }
  //MARK: 外部へスクリプトを表示
  #st(t) {
    const { set_fnc: s, break_fnc: i } = t;
    if (!s) throw "set_fncは必須です";
    if (this.#x = globalThis[s], !this.#x) {
      if (m(t, "need_err", !0)) throw `HTML内に関数${s}が見つかりません`;
      return this.#x = () => {
      }, !1;
    }
    if (this.noticeBreak = (e) => {
      this.#I !== this.#i && (this.#I = this.#i, this.#x(
        this.#it[this.#i] ??= this.#s.aToken.join("")
      )), this.#S(this.#e, e);
    }, this.noticeBreak(!0), !i) return !1;
    if (this.#S = globalThis[i], !this.#S) {
      if (m(t, "need_err", !0)) throw `HTML内に関数${i}が見つかりません`;
      this.#S = () => {
      };
    }
    return !1;
  }
  #x = () => {
  };
  #S = () => {
  };
  #I = "";
  #it = {};
  noticeBreak = (t) => {
  };
  #O = 5;
  dumpErrForeLine() {
    if (this.#t === 0) {
      console.group(`🥟 Error line (from 0 rows before) fn:${this.#i}`), console.groupEnd();
      return;
    }
    let t = "";
    for (let a = this.#t - 1; a >= 0 && (t = this.#s.aToken[a] + t, !((t.match(/\n/g) ?? []).length >= this.#O)); --a)
      ;
    const s = t.split(`
`).slice(-this.#O), i = s.length;
    console.group(`🥟 Error line (from ${i} rows before) fn:${this.#i}`);
    const e = String(this.#e).length, h = this.#l(this.#s, this.#t);
    for (let a = 0; a < i; ++a) {
      const l = this.#e - i + a + 1, r = `${String(l).padStart(e, " ")}: %c`, n = s[a], o = n.length > 75 ? n.slice(0, 75) + "…" : n;
      a === i - 1 ? console.info(
        r + o.slice(0, h.col_s) + "%c" + o.slice(h.col_s),
        "color: black; background-color: skyblue;",
        "color: black; background-color: pink;"
      ) : console.info(r + o, "color: black; background-color: skyblue;");
    }
    console.groupEnd();
  }
  #o = [-1];
  // 先頭に積む FIFOバッファ（unshift / shift）
  //MARK: ifブロックの終端
  #et() {
    const t = this.#o[0];
    if (!t) throw "this.#aIfStk が異常です";
    if (t === -1) throw "ifブロック内ではありません";
    return this.#t = t, this.#o.shift(), !1;
  }
  //MARK: ifブロックの開始
  #nt(t) {
    const { exp: s } = t;
    if (!s) throw "expは必須です";
    if (s.startsWith("&")) throw "属性expは「&」が不要です";
    let i = 0, e = this.prpPrs.parse(s) ? this.#t : -1;
    const h = this.#s.aLNum[this.#t];
    let a = this.#e - (h || 0);
    const l = this.#s.len;
    for (; this.#t < l; ++this.#t) {
      const r = this.#s.aLNum[this.#t];
      this.#s.aLNum[this.#t] = (r || 0) + a;
      const n = this.#s.aToken[this.#t];
      if (!n) continue;
      const o = n.charCodeAt(0);
      if (o === 10) {
        this.#e += n.length;
        continue;
      }
      if (o !== 91) continue;
      const [c, f] = S(n);
      if (!(c in this.hTag)) throw `未定義のタグ[${c}]です`;
      switch (this.#r.parse(f), c) {
        case "if":
          ++i;
          break;
        case "elsif":
          if (i > 0 || e > -1) break;
          const u = this.#r.hPrm.exp?.val;
          if (!u) throw "expは必須です";
          if (u.startsWith("&")) throw "属性expは「&」が不要です";
          this.prpPrs.parse(u) && (e = this.#t + 1);
          break;
        case "else":
          if (i > 0) break;
          e === -1 && (e = this.#t + 1);
          break;
        case "endif":
          if (i > 0) {
            --i;
            break;
          }
          return e === -1 ? (++this.#t, this.#s.aLNum[this.#t] += a) : (this.#o.unshift(this.#t + 1), this.#t = e, this.#e = this.#s.aLNum[this.#t]), !1;
      }
    }
    throw "[endif]がないままスクリプト終端です";
  }
  //MARK: サブルーチンコール
  #ht(t) {
    m(t, "count", !1) || this.#G();
    const { fn: s } = t;
    return s && this.#k(s), this.#M({ ...t, ":hEvt1Time": N.popLocalEvts() }), m(t, "clear_local_event", !1) && this.hTag.clear_event({}), this.#f(s, t.label);
  }
  #M(t) {
    const s = { ...t, ":hMp": this.val.cloneMp(), ":lenIfStk": this.#o.length };
    this.#s.aLNum[this.#t] = this.#e, this.#R || (s[":resvToken"] = "", this.#$()), this.#n.push(new E(this.#i, this.#t, s)), this.#o.unshift(-1);
  }
  //MARK: シナリオジャンプ
  #at(t) {
    return m(t, "count", !0) || this.#G(), this.#o[0] = -1, this.#f(t.fn, t.label);
  }
  //MARK: コールスタック破棄
  #ot(t) {
    if (m(t, "clear", !1)) this.#n = [];
    else if (!this.#n.pop()) throw "スタックが空です";
    return this.#$(), this.#o = [-1], this.val.setMp({}), !1;
  }
  //MARK: サブルーチンから戻る
  #j(t) {
    const s = this.#n.pop();
    if (!s) throw "スタックが空です";
    const i = s.csArg;
    this.#o = this.#o.slice(-i[":lenIfStk"]);
    const e = i[":hMp"];
    e && this.val.setMp(e);
    const h = i[":resvToken"];
    h ? this.nextToken = () => (this.#$(), h) : this.#$(), i[":hEvt1Time"] && N.pushLocalEvts(i[":hEvt1Time"]);
    const { fn: a, label: l } = t;
    return a || l ? this.#f(a, l) : s.fn in this.#a ? (this.#K(s), !1) : this.#f(s.fn, "", s.idx);
  }
  #R = "";
  #$() {
    this.#R = "", this.nextToken = this.#F;
  }
  #v = "";
  #f(t = "", s = "", i = 0) {
    if (w.debugLog && console.log(`📜 %c1:jumpWork%c fn:${t} lbl:${s} idx:${i}`, "color:#3B0;", ""), !t && !s && this.main.errScript("[jump系] fnまたはlabelは必須です"), s ? (s.startsWith("*") || this.main.errScript("[jump系] labelは*で始まります"), this.#v = s, this.#v.startsWith("**") || (this.#t = i)) : (this.#v = "", this.#t = i), !t)
      return this.analyzeInit(), !1;
    if (t.includes("@")) throw "[jump系] fn には文字「@」は禁止です";
    const e = this.#k(t);
    if (t === this.#i)
      return this.analyzeInit(), !1;
    this.#i = t;
    const h = this.#a[t];
    if (h)
      return this.#s = h, this.analyzeInit(), !1;
    const a = `jumpWork fn:${t}`;
    v.beginProc(a);
    let l = "";
    const r = new D();
    try {
      l = this.#k(t + "@"), r.add({ name: t + ":base", url: e }), r.add({ name: t, url: l });
    } catch {
      r.add({ name: t, url: e });
    }
    return r.use(async (n, o) => {
      try {
        n.data = await this.sys.dec(n.extension, n.data);
      } catch (c) {
        this.main.errScript(`[jump系]snロード失敗です fn:${n.name} ${c}`, !1);
      }
      o();
    }).load((n, o) => {
      if (v.endProc(a), l) {
        const c = o[t + ":base"].data, f = o[t].data, u = c.split(`
`), k = f.split(`
`), b = u.length, C = k.length;
        for (let _ = 0; _ < C && _ < b; ++_) k[_] ||= u[_];
        o[t].data = k.join(`
`), delete o[t + ":base"];
      }
      this.nextToken = this.#F, this.#e = 1, this.#ft(o[t].data), this.hTag.record_place({}), this.analyzeInit();
    }), !0;
  }
  analyzeInit() {
    w.debugLog && console.log(`📜 %c9:analyzeInit%c fn:${this.#i} lbl:${this.#v} idx:${this.#t}`, "color:#3B0;", "");
    const t = this.#lt(this.#s, !!this.val.getVal("mp:const.sn.macro.name"), this.#e, this.#v, this.#t);
    this.#t = t.idx, this.#e = t.ln;
  }
  // シナリオ解析処理ループ・冒頭処理
  nextToken = () => "";
  // 初期化前に終了した場合向け
  #F() {
    if (this.#z()) return "";
    this.#dt(), this.#s.aLNum[this.#t] ||= this.#e;
    const t = this.#s.aToken[this.#t];
    return this.#W(t), ++this.#t, t;
  }
  #W = (t) => {
  };
  #z() {
    return this.#t < this.#s.len ? !1 : (this.main.errScript("スクリプト終端です errOverScr"), !0);
  }
  #rt = /(\*{2,})([^\|]*)/;
  #ct = /^\[macro\s/;
  #H = /^\[endmacro[\s\]]/;
  #lt(t, s, i, e, h) {
    const a = t.aToken.length;
    if (!e) {
      if (this.#z()) return { idx: h, ln: i };
      if (t.aLNum[h])
        i = t.aLNum[h];
      else {
        i = 1;
        for (let o = 0; o < h; ++o) {
          t.aLNum[o] ||= i;
          const c = t.aToken[o];
          c.startsWith(`
`) ? i += c.length : i += (c.match(/\n/g) ?? []).length;
        }
        t.aLNum[h] = i;
      }
      return { idx: h, ln: i };
    }
    t.aLNum[0] = 1;
    const l = e.match(this.#rt);
    if (l) {
      e = l[1];
      let o = h;
      switch (l[2]) {
        case "before":
          for (; t.aToken[--o] !== e; )
            o === 0 && g.myTrace("[jump系 無名ラベルbefore] " + i + "行目以前で" + (s ? "マクロ内に" : "") + "ラベル【" + e + "】がありません", "ET"), s && t.aToken[o].search(this.#ct) > -1 && g.myTrace("[jump系 無名ラベルbefore] マクロ内にラベル【" + e + "】がありません", "ET");
          return { idx: o + 1, ln: t.aLNum[o] };
        //	break;
        case "after":
          for (; t.aToken[++o] !== e; )
            o === a && g.myTrace("[jump系 無名ラベルafter] " + i + "行目以後でマクロ内にラベル【" + e + "】がありません", "ET"), t.aToken[o].search(this.#H) > -1 && g.myTrace("[jump系 無名ラベルafter] " + i + "行目以後でマクロ内にラベル【" + e + "】がありません", "ET");
          return { idx: o + 1, ln: t.aLNum[o] };
        //	break;
        default:
          g.myTrace("[jump系] 無名ラベル指定【label=" + e + "】が間違っています", "ET");
      }
    }
    i = 1;
    const r = new RegExp(
      "^" + e.replaceAll("*", "\\*") + "(?=\\s|;|\\[|\\||$)"
    );
    let n = !1;
    for (let o = 0; o < a; ++o) {
      t.aLNum[o] ||= i;
      const c = t.aToken[o];
      if (n) {
        this.#c.testTagEndLetml(c) ? n = !1 : i += (c.match(/\n/g) ?? []).length;
        continue;
      }
      const f = c.charCodeAt(0);
      if (f === 10) {
        i += c.length;
        continue;
      }
      if (f === 42) {
        if (c.search(r) > -1) return { idx: o + 1, ln: i };
        continue;
      }
      f === 91 && (i += (c.match(/\n/g) ?? []).length, this.#c.testTagLetml(c) && (n = !0));
    }
    throw n ? "[let_ml]の終端・[endlet_ml]がありません" : (g.myTrace(`[jump系] ラベル【${e}】がありません`, "ET"), "Dummy");
  }
  #a = /* @__PURE__ */ Object.create(null);
  //{} シナリオキャッシュ
  #ft(t) {
    let s = "";
    try {
      s = "ScriptIterator.resolveScript";
      const i = this.#c.resolveScript(t);
      s = "ScriptIterator.replaceScript_Wildcard", this.#mt(i), this.#a[this.#i] = this.#s = i;
    } catch (i) {
      i instanceof Error ? s += `例外 mes=${i.message}(${i.name})` : s = String(i), this.main.errScript(s, !1);
    }
    this.val.touchAreaKidoku(this.#i);
  }
  #K(t) {
    this.#i = t.fn, this.#t = t.idx;
    const s = this.#a[this.#i];
    s && (this.#s = s), this.#e = this.#s.aLNum[t.idx];
  }
  #ut = /^\[(call|loadplugin)\s/;
  #pt = /\bfn\s*=\s*[^\s\]]+/;
  #mt(t) {
    for (let s = t.len - 1; s >= 0; --s) {
      const i = t.aToken[s];
      if (!this.#ut.test(i)) continue;
      const [e, h] = S(i);
      this.#r.parse(h);
      const a = this.#r.hPrm.fn;
      if (!a) continue;
      const { val: l } = a;
      if (!l || !l.endsWith("*")) continue;
      t.aToken.splice(s, 1, "	", "; " + i), t.aLNum.splice(s, 1, NaN, NaN);
      const r = e === "loadplugin" ? T.CSS : T.SN, n = this.cfg.matchPath("^" + l.slice(0, -1) + ".*", r);
      for (const o of n) {
        const c = i.replace(
          this.#pt,
          "fn=" + decodeURIComponent(x(o[r]))
        );
        t.aToken.splice(s, 0, c), t.aLNum.splice(s, 0, NaN);
      }
    }
    t.len = t.aToken.length;
  }
  #dt() {
    const t = this.val.touchAreaKidoku(this.#i);
    if (this.#n.length > 0) {
      t.record(this.#t);
      return;
    }
    this.#d = t.search(this.#t), this.val.setVal_Nochk("tmp", "const.sn.isKidoku", this.#d), !this.#d && t.record(this.#t);
  }
  #d = !1;
  get isKidoku() {
    return this.#d;
  }
  #G() {
    this.val.getAreaKidoku(this.#i)?.erase(this.#t), this.#d = !1;
  }
  get isNextKidoku() {
    let t = this.#i, s = this.#t, i = this.#s.len;
    if (this.#n.length > 0) {
      const h = this.#n[0];
      t = h.fn, s = h.idx;
      const a = this.#a[t];
      a && (i = a.len);
    }
    const e = this.val.getAreaKidoku(t);
    return s === i ? !1 : e.search(s);
  }
  get normalWait() {
    return this.#d ? this.val.tagCh_doWait_Kidoku ? this.val.tagCh_msecWait_Kidoku : 0 : this.val.tagCh_doWait ? this.val.tagCh_msecWait : 0;
  }
  //MARK: 括弧マクロの定義
  #kt(t) {
    return this.#c.bracket2macro(t, this.hTag, this.#s, this.#t), !1;
  }
  //MARK: 一文字マクロの定義
  #gt(t) {
    return this.#c.char2macro(t, this.hTag, this.#s, this.#t), !1;
  }
  //MARK: マクロ定義の開始
  #_t = /["'#;\\]　]+/;
  #vt(t) {
    const { name: s } = t;
    if (!s) throw "nameは必須です";
    if (s in this.hTag) throw `[${s}]はタグかすでに定義済みのマクロです`;
    if (this.#_t.test(s)) throw `[${s}]はマクロ名として異常です`;
    const i = this.#e, e = new E(this.#i, this.#t);
    for (this.#V += "|" + s, this.#N = new RegExp(`\\[(${this.#V})\\b`), this.hTag[s] = (h) => (h.design_unit = t.design_unit, this.#M(h), this.val.setMp(h), this.val.setVal_Nochk("mp", "const.sn.macro", JSON.stringify({
      name: t.name
    })), this.val.setVal_Nochk("mp", "const.sn.me_call_scriptFn", this.#i), this.#e = i, this.#K(e), !1); this.#t < this.#s.len; ++this.#t) {
      this.#s.aLNum[this.#t] ||= this.#e;
      const h = this.#s.aToken[this.#t];
      if (h.search(this.#H) > -1)
        return ++this.#t, !1;
      const a = h.charCodeAt(0);
      a === 10 ? this.#e += h.length : a === 91 && (this.#e += (h.match(/\n/g) ?? []).length);
    }
    throw `マクロ[${s}]定義の終端・[endmacro]がありません`;
  }
  #V = "call";
  #N = /\[(call)\b/;
  // https://regex101.com/r/Lk9ASK/1
  //MARK: しおりの読込
  #bt(t) {
    if ("fn" in t != "label" in t) throw "fnとlabelはセットで指定して下さい";
    const s = I(t, "place", 0), i = this.val.getMark(s);
    return this.loadFromMark(
      t,
      i,
      2
      /* ALL_STOP_AND_PLAY */
    );
  }
  loadFromMark(t, s, i = 0) {
    this.hTag.clear_event({}), this.val.mark2save(s), this.val.setMp({}), this.#m.recPagebreak();
    let e = [];
    i !== 1 && (e = this.sndMng.playLoopFromSaveObj(
      i === 2
      /* ALL_STOP_AND_PLAY */
    )), m(t, "do_rec", !0) && (this.#u = {
      hSave: this.val.cloneSave(),
      hPages: { ...s.hPages },
      aIfStk: [...s.aIfStk]
    });
    const h = {
      enabled: this.val.getVal("save:const.sn.autowc.enabled"),
      text: this.val.getVal("save:const.sn.autowc.text"),
      time: Number(this.val.getVal("save:const.sn.autowc.time"))
    };
    this.hTag.autowc(h), this.#o = [...this.#u.aIfStk], this.#n = [], $.stopAllTw();
    const a = Promise.allSettled([...e, ...this.#m.playback(this.#u.hPages)]).then(() => this.#m.cover(!1)).catch((f) => console.error("loadFromMark e:%o", f)), { index: l, fn: r } = t;
    if (l)
      return w.debugLog && console.log(`📜 %cloadFromMark index:${l} move!%c fn:${r}`, "color:#3B0;", ""), a.then(() => {
        this.#f(r, "", l) || this.main.resume();
      }), !0;
    this.#m.cover(!0);
    const n = String(this.val.getVal("save:const.sn.scriptFn")), o = Number(this.val.getVal("save:const.sn.scriptIdx"));
    delete this.#a[n];
    const { label: c } = t;
    return c ? a.then(() => {
      this.#i = n, this.#t = o, this.hTag.call({ fn: r, label: c }) || this.main.resume();
    }) : a.then(() => {
      this.#f(n, "", o) || this.main.resume();
    }), !0;
  }
  //MARK: スクリプト再読込
  #wt(t) {
    const s = this.val.getMark(0);
    delete this.#a[x(s.hSave["const.sn.scriptFn"])];
    const i = {};
    for (const e in this.#a)
      try {
        this.#k(e + "@");
      } catch {
        i[e] = this.#a[e];
      }
    return this.#a = i, t.do_rec = !1, this.loadFromMark(
      t,
      s,
      1
      /* NO_TOUCH */
    );
  }
  //MARK: セーブポイント指定
  #u = {
    hSave: {},
    hPages: {},
    aIfStk: [-1]
  };
  #U = () => {
    const { fn: t, idx: s } = this.nowScrIdx();
    return this.val.setVal_Nochk("save", "const.sn.scriptFn", t), this.val.setVal_Nochk("save", "const.sn.scriptIdx", s), this.#u = {
      hSave: this.val.cloneSave(),
      hPages: this.#m.record(),
      aIfStk: this.#o.slice(this.#n.length)
    }, !1;
  };
  nowScrIdx() {
    if (this.#n.length === 0) return {
      fn: this.#i,
      idx: this.#t
    };
    const s = this.#n[0];
    return {
      fn: s.fn,
      idx: s.idx
    };
  }
  nowMark() {
    return { ...this.#u };
  }
  //MARK: スクリプト停止位置（マクロなどなら最上位の呼び元）
  nowScrFnLn() {
    const { fn: t, idx: s } = this.nowScrIdx(), i = this.#a[t], e = this.#l(i, s);
    return { fn: t, ...e };
  }
  //MARK: しおりの保存
  #Tt(t) {
    if (!("place" in t)) throw "placeは必須です";
    const s = Number(t.place);
    delete t[":タグ名"], delete t.place, t.text = t.text ?? "", this.#u.json = t, this.val.setMark(s, this.#u);
    const i = Number(this.val.getVal("sys:const.sn.save.place"));
    return s === i && this.val.setVal_Nochk("sys", "const.sn.save.place", i + 1), !1;
  }
  recodeDesign(t) {
    let s = "", i = 0;
    const e = this.#n.length;
    if (t.design_unit && e > 0) {
      const r = this.#n[0];
      s = r.fn, i = r.idx;
    } else
      s = this.#i, i = this.#t;
    t[":path"] = this.#g(s);
    const h = this.#a[s], a = this.#l(h, i);
    t[":ln"] = a.ln, t[":col_s"] = a.col_s, t[":col_e"] = a.col_e;
    const l = i - 1;
    t[":idx_tkn"] = l, t[":token"] = h.aToken[l], this.sys.send2Dbg("_recodeDesign", t);
  }
  replace(t, s) {
    this.#s.aToken[t] = s;
  }
}
const W = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  RPN_COMP_CHIN: L,
  ScriptIterator: p
}, Symbol.toStringTag, { value: "Module" }));
export {
  L as R,
  W as S,
  d as a
};
//# sourceMappingURL=ScriptIterator.js.map
