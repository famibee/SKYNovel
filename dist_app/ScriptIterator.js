import { K as B, g as S, M as D, m as w, N as T, q as y, e as d, O as $, L as I, D as g, d as O, c as M } from "./app2.js";
import { c as j, C as x, a as L } from "./CallStack.js";
import { C as N, a as F } from "./SndBuf.js";
import { a as b, R as E } from "./Reading.js";
class k {
  static #s = "ヽ";
  static setting(t) {
    t.sesame && (k.#s = t.sesame);
  }
  static getSesame() {
    return k.#s;
  }
  static destroy() {
    k.#s = "ヽ";
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
    k.#t = new RegExp(
      (t ? `(?<ce>\\${t}\\S)|` : "") + "｜(?<str>[^《\\n]+)《(?<ruby>[^》\\n]+)》|(?:(?<kan>[⺀-⿟々〇〻㐀-鿿豈-﫿]+[ぁ-ヿ]*|[^　｜《》\\n])《(?<kan_ruby>[^》\\n]+)》)|(?<txt>[\uD800-\uDBFF][\uDC00-\uDFFF]|[^｜《》]+?|.)",
      "gs"
    );
  }
  putTxt(t) {
    for (const { groups: s } of t.matchAll(k.#t)) {
      const { ruby: i, kan_ruby: n, kan: a = "", ce: h, txt: o = "", str: r = "" } = s;
      if (i) {
        this.putTxtRb(decodeURIComponent(r), i);
        continue;
      }
      if (n) {
        this.putTxtRb(a, n);
        continue;
      }
      if (h) {
        this.#i(h.slice(1), "");
        continue;
      }
      for (const e of Array.from(o)) this.#i(e, "");
    }
  }
  putTxtRb(t, s) {
    if (/^\w+｜{"/.test(s)) {
      this.#i(t, s);
      return;
    }
    const i = Array.from(t), n = i.length;
    if (/^\*.?$/.test(s)) {
      const r = "center｜" + (s === "*" ? k.#s : s.charAt(1));
      for (let e = 0; e < n; ++e) this.#i(i[e], r);
      return;
    }
    if (n === 1 || !s.includes(" ")) {
      this.#i(t, decodeURIComponent(s));
      return;
    }
    const a = s.split(" "), h = a.length, o = h > n ? h : n;
    for (let r = 0; r < o; ++r) this.#i(
      r < n ? i[r] : "",
      r < h ? decodeURIComponent(a[r]) : ""
    );
  }
}
const C = "compChIn";
class p {
  //MARK: コンストラクタ
  constructor(t, s, i, n, a, h, o) {
    this.cfg = t, this.hTag = s, this.main = i, this.val = n, this.prpPrs = a, this.sndMng = h, this.sys = o, s.let_ml = (e) => this.#Z(e), s.endlet_ml = () => !1, s.dump_stack = () => this.#tt(), s.dump_script = (e) => this.#st(e), s.else = // その他ifブロック開始
    s.elsif = // 別条件のifブロック開始
    s.endif = () => this.#et(), s.if = (e) => this.#nt(e), s.call = (e) => this.#at(e), s.jump = (e) => this.#ht(e), s.pop_stack = (e) => this.#ot(e), s.return = (e) => this.#j(e), s.bracket2macro = (e) => this.#kt(e), s.char2macro = (e) => this.#gt(e), s.endmacro = (e) => this.#j(e), s.macro = (e) => this.#bt(e), s.load = (e) => this.#vt(e), s.reload_script = (e) => this.#St(e), s.record_place = () => this.#q(), s.save = (e) => this.#wt(e), t.oCfg.debug.token && (this.#W = (e) => {
      e.trim() !== "" && console.log(`🌱 トークン ${this.#i}:${String(this.#e)} (i:${String(this.#t)} cs:${String(this.#n.length)}) %c【${e}】`, "background-color:#350;");
    }), t.oCfg.debug.tag && (this.#D = (e) => console.log(`🌲 タグ解析 ${this.#i}:${String(this.#e)} (i:${String(this.#t)} cs:${String(this.#n.length)}) %c[${e} %o]`, "background-color:#30B;", this.#r.hPrm)), n.defTmp("const.sn.aIfStk.length", () => this.#o.length), n.defTmp("const.sn.vctCallStk.length", () => this.#n.length), this.#c = new B(t);
    const r = t.oCfg.init.escape;
    if (this.#c.setEscape(r), k.setEscape(r), S.isDbg) {
      this.#k, o.addHook((l, f) => this.#k[l]?.(f)), this.isBreak = (l) => this.#U(l);
      const e = () => this.analyzeInit();
      this.analyzeInit = () => {
        this.analyzeInit = () => {
        }, this.sys.send2Dbg("hi", {});
      }, this.#k.auth = (l) => {
        const f = l.hBreakpoint.hFn2hLineBP;
        for (const [c, u] of Object.entries(f)) this.#E(c, u);
        p.#p = {};
        for (const c of l.hBreakpoint.aFunc)
          p.#p[c.name] = 1;
        if (l.stopOnEntry) {
          let c;
          for (; c = this.nextToken(); ) {
            const u = c.charCodeAt(0);
            if (u === 91 || u === 38 || u === 42 && c.length === 1) break;
            u === 10 && (this.#e += c.length);
          }
          this.sys.callHook("stopOnEntry", {}), this.analyzeInit = e, this.analyzeInit();
        } else
          this.noticeWait = () => {
            this.noticeWait = () => {
            }, this.sys.callHook("stopOnEntry", {});
          }, this.analyzeInit = e, this.analyzeInit();
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
  addLineNum = (t) => {
    this.#e += t;
  };
  jumpJustBefore() {
    this.#f(this.#i, "", --this.#t);
  }
  // 直前にジャンプ
  #n = [];
  // FILOバッファ（push/pop）
  #c;
  #r = new D();
  noticeWait = () => {
  };
  #E(t, s) {
    p.#w[this.#_(t)] = s;
  }
  destroy() {
    this.isBreak = this.#q = () => !1;
  }
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  #k = {
    auth: () => {
    },
    // constructorでセット
    //launch:	// ここでは冒頭停止に間に合わないのでanalyzeInit()で
    disconnect: () => {
      p.#w = {}, p.#p = {}, this.isBreak = () => !1, this.#k.continue({}), this.#a = 0;
    },
    restart: () => {
      this.isBreak = () => !1;
    },
    // ブレークポイント登録
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    add_break: (t) => this.#E(t.fn, t.o),
    data_break: (t) => {
      this.#a === 0 && (this.#a = 1, this.main.setLoop(!1, `変数 ${t.dataId}【${t.old_v}】→【${t.new_v}】データブレーク`), this.sys.callHook("stopOnDataBreakpoint", {}), this.sys.send2Dbg("stopOnDataBreakpoint", {}));
    },
    set_func_break: (t) => {
      p.#p = {};
      for (const s of t.a) p.#p[s.name] = 1;
      this.sys.send2Dbg(t.ri, {});
    },
    // 情報問い合わせ系
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    stack: (t) => this.sys.send2Dbg(t.ri, { a: this.#A() }),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    eval: (t) => {
      this.sys.send2Dbg(t.ri, { v: this.prpPrs.parse(t.txt) });
    },
    // デバッガからの操作系
    continue: () => {
      this.#S() || (this.#t -= this.#b, this.#a = 3, this.main.setLoop(!0), this.main.resume());
    },
    stepover: (t) => this.#C(t),
    stepin: () => {
      if (this.#S()) return;
      const t = this.#s.aToken[this.#t - this.#b];
      this.sys.callHook(`stopOnStep${this.#N.test(t ?? "") ? "In" : ""}`, {}), this.#t -= this.#b, this.#a = this.#a === 1 ? 4 : 5, this.main.setLoop(!0), this.main.resume();
    },
    stepout: (t) => {
      this.#S() || (this.#n.length > 0 ? this.#P(!0) : this.#C(t));
    },
    pause: () => {
      this.#a = 4, this.main.setLoop(!1, "一時停止"), this.sys.send2Dbg("stopOnStep", {});
    },
    stopOnEntry: () => {
      this.#a = 4, this.main.setLoop(!1, "一時停止"), this.sys.send2Dbg("stopOnEntry", {});
    }
  };
  #g = (t) => this.cfg.searchPath(t, w.SCRIPT);
  #_ = (t) => this.sys.pathBaseCnvSnPath4Dbg + this.#g(t);
  #C(t) {
    if (this.#S()) return;
    const s = this.#s.aToken[this.#t - this.#b];
    this.#N.test(s ?? "") ? this.#P(!1) : (this.sys.callHook("stopOnStep", {}), this.#k.stepin(t));
  }
  #P(t) {
    this.sys.callHook(`stopOnStep${t ? "Out" : ""}`, {}), this.#B = this.#n.length - (t ? 1 : 0), this.#t -= this.#b, this.#a = t ? 7 : 6, this.main.setLoop(!0), this.main.resume();
  }
  #B = 0;
  get #b() {
    return this.#a === 2 || this.#a === 4 ? 1 : 0;
  }
  #S() {
    return this.#t < this.#s.len ? !1 : (this.sys.callHook("stopOnEntry", {}), this.main.setLoop(!1, "スクリプト終端です isIdxOverLast"), !0);
  }
  // reload 再生成 Main に受け渡すため static
  static #w = {};
  static #p = {};
  #a = 0;
  // https://raw.githubusercontent.com/famibee/SKYNovel-vscode-extension/master/src/doc/BreakStateSMD.pu
  isBreak = (t) => !1;
  #U(t) {
    switch (this.#a) {
      case 6:
        this.#T(), this.#a = 7;
        break;
      case 7:
        if (this.#n.length !== this.#B) break;
        return this.#a = 4, this.main.setLoop(!1, "ステップ実行"), this.sys.send2Dbg("stopOnStep", {}), !0;
      // タグを実行せず、直前停止
      case 5:
        this.#T(), this.#a = 4;
        break;
      case 4:
        return this.#T(), this.main.setLoop(!1, "ステップ実行"), this.sys.send2Dbg("stopOnStep", {}), !0;
      // タグを実行せず、直前停止
      case 3:
        this.#T(), this.#a = 0;
        break;
      default:
        if (T(t) in p.#p)
          return this.#a = 2, this.main.setLoop(!1, `関数 ${t} ブレーク`), this.sys.callHook("stopOnBreakpoint", {}), this.sys.send2Dbg("stopOnBreakpoint", {}), !0;
        {
          const s = p.#w[this.#_(this.#i)];
          if (!s) break;
          const i = s[this.#e];
          if (!i) break;
          if (i.condition) {
            if (!this.prpPrs.parse(i.condition)) break;
          } else if ("hitCondition" in i && --i.hitCondition > 0) break;
          const n = this.#a === 0;
          this.#a = 2, this.main.setLoop(!1, n ? (
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            (i.condition ? "条件" : "ヒットカウント") + "ブレーク"
          ) : "ステップ実行");
          const a = n ? "stopOnBreakpoint" : "stopOnStep";
          this.sys.callHook(a, {}), this.sys.send2Dbg(a, {});
        }
        return !0;
    }
    return !1;
  }
  #T() {
    const t = p.#w[y(this.#i)]?.[this.#e];
    t?.hitCondition && --t.hitCondition;
  }
  #A() {
    const t = this.#a === 3 ? 1 : 0, s = this.#s.aToken[this.#t - 1 + t], i = this.#_(this.#i), n = T(s), a = n ? `[${n}]` : s, h = String(this.val.getVal("mp:const.sn.macro") ?? "{}");
    if (this.#t === 0) return [{ fn: i, ln: 1, col: 1, nm: a, ma: h }];
    const o = this.#l(this.#s, this.#t), r = [{ fn: i, ln: o.ln, col: o.col_s + 1, nm: a, ma: h }], e = this.#n.length;
    if (e === 0) return r;
    for (let l = e - 1; l >= 0; --l) {
      const f = this.#n[l], c = this.#h[f.fn];
      if (!c) continue;
      const u = c.aToken[f.idx - 1];
      if (!u) continue;
      const m = this.#l(c, f.idx), v = T(u);
      r.push({
        fn: this.#_(f.fn),
        ln: m.ln,
        col: m.col_s + 1,
        nm: v ? `[${v}]` : u,
        ma: f.csArg[":hMp"]["const.sn.macro"]
      });
    }
    return r;
  }
  // result = true : waitする  resume()で再開
  #D = (t) => {
  };
  //MARK: タグ解析
  async タグ解析(t, s) {
    const i = this.hTag[t];
    if (!i) throw `未定義のタグ【${t}】です`;
    this.#r.parse(s), this.#D(t);
    const n = this.#r.hPrm;
    if (n.cond) {
      const e = n.cond.val;
      if (!e || e.startsWith("&")) throw "属性condは「&」が不要です";
      const l = this.prpPrs.parse(e), f = String(l);
      if (f === "null" || f === "undefined" || !l) return !1;
    }
    let a = {};
    const h = this.#n.at(-1)?.csArg ?? j(), o = this.#n.length;
    if (this.#r.isKomeParam) {
      if (o === 0) throw "属性「*」はマクロのみ有効です";
      a = { ...h };
    }
    a[":タグ名"] = t;
    for (const [e, { val: l, def: f }] of Object.entries(n)) {
      let c = l;
      if (l.startsWith("%")) {
        if (o === 0) throw "属性「%」はマクロ定義内でのみ使用できます（そのマクロの引数を示す簡略文法であるため）";
        const u = h[c.slice(1)];
        if (u) {
          a[e] = u;
          continue;
        }
        if (f === void 0 || f === "null") continue;
        c = f;
      }
      if (c = this.prpPrs.getValAmpersand(c ?? ""), c !== "undefined") {
        a[e] = c;
        continue;
      }
      f !== void 0 && (c = this.prpPrs.getValAmpersand(f), c !== "undefined" && (a[e] = c));
    }
    if (b.needGoTxt && this.#J.has(t)) {
      const { promise: e, resolve: l } = Promise.withResolvers();
      b.beginProc(C, () => l(0), !1, () => l(0)), b.goTxt(), this.val.saveKidoku(), await e;
    }
    this.#X.has(t) && (this.#L.hideHint(), await N.closeTrans());
    const r = this.#Y[t];
    return r && d(a, "canskip", this.#Q[t] ?? !0) && this.#L.isSkipping ? r(n) : i(a);
  }
  // 文字出現演出を待つタグ
  //	ここで列挙せずタグ処理で文字表示を始めたい場合、goTxt()すること
  #J = /* @__PURE__ */ new Set([
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
    // [set_cancel_skip] スキップ中断予約
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
  #X = /* @__PURE__ */ new Set([
    "finish_trans",
    // トランス強制終了
    "trans",
    // ページ裏表を交換
    "quake",
    // 画面を揺らす
    "stop_quake",
    // 画面揺らし中断
    "add_filter"
    // フィルター追加
  ]);
  // キー押しっぱなしスキップで処理せずスルーするタグ
  #Y = {
    wt: () => !1,
    // トランス終了待ち
    wait_tsy: (t) => this.hTag.stop_tsy(t),
    // トゥイーン終了待ち
    // 'wv',		：タグ内部で処理	// 動画再生終了待ち
    wait: () => !1,
    // ウェイトを入れる
    // 'playbgm',	：スルー不可		// BGM の演奏
    // 'playse',	：タグ内部で処理	// 効果音の再生
    wb: () => this.hTag.stopfadese({ buf: F }),
    // BGM フェードの終了待ち
    wf: (t) => this.hTag.stopfadese(t),
    // 効果音フェードの終了待ち
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
  #L;
  #m;
  setOtherObj(t, s) {
    this.#L = t, this.#m = s;
  }
  //MARK: インラインテキスト代入
  #Z(t) {
    const { name: s } = t;
    if (!s) throw "nameは必須です";
    let i = "";
    const n = this.#s.len;
    for (; this.#t < n && (i = this.#s.aToken[this.#t], i === ""); ++this.#t)
      ;
    return t.text = i, t.cast = "str", this.hTag.let(t), this.#t += 2, this.#e += (i.match(/\n/g) ?? []).length, !1;
  }
  //MARK: スタックのダンプ
  #tt() {
    if (this.#t === 0)
      return console.group(`🥟 [dump_stack] スクリプト現在地 fn:${this.#i} line:1 col:0`), console.groupEnd(), !1;
    const t = this.#l(this.#s, this.#t), s = `スクリプト現在地 fn:${this.#i} line:${String(t.ln)} col:${String(t.col_s + 1)}`;
    console.group(`🥟 [dump_stack] ${s}`);
    const i = this.#n.length;
    if (i > 0) {
      console.info(s);
      for (let n = i - 1; n >= 0; --n) {
        const a = this.#n[n], h = a.csArg[":hMp"], o = h ? h[":タグ名"] : void 0, r = a.csArg[":タグ名"] ?? "", e = this.#l(this.#h[a.fn], a.idx);
        console.info(
          `${String(i - n)}つ前のコール元 fn:${a.fn} line:${String(e.ln)} col:${String(e.col_s + 1)}${o ? "（[" + o + "]マクロ内）" : " "}で [${r} ...]をコール`
        );
      }
    }
    return console.groupEnd(), !1;
  }
  #l(t, s) {
    const i = { ln: 1, col_s: 0, col_e: 0 };
    if (!t) return i;
    let n = s - 1;
    const a = i.ln = t.aLNum[n];
    for (; t.aLNum[n] === a; ) {
      const h = t.aToken[n];
      if (!h.startsWith(`
`)) {
        const o = h.length;
        i.col_e > 0 && (i.col_s += o), i.col_e += o;
      }
      if (--n < 0) break;
    }
    return i;
  }
  //MARK: 外部へスクリプトを表示
  #st(t) {
    const { set_fnc: s, break_fnc: i } = t;
    if (!s) throw "set_fncは必須です";
    if (this.#y = globalThis[s], !this.#y) {
      if (d(t, "need_err", !0)) throw `HTML内に関数${s}が見つかりません`;
      return this.#y = () => {
      }, !1;
    }
    if (this.noticeBreak = (n) => {
      this.#I !== this.#i && (this.#I = this.#i, this.#y(
        this.#it[this.#i] ??= this.#s.aToken.join("")
      )), this.#$(this.#e, n);
    }, this.noticeBreak(!0), !i) return !1;
    if (this.#$ = globalThis[i], !this.#$) {
      if (d(t, "need_err", !0)) throw `HTML内に関数${i}が見つかりません`;
      this.#$ = () => {
      };
    }
    return !1;
  }
  #y = () => {
  };
  #$ = () => {
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
    for (let h = this.#t - 1; h >= 0 && (t = String(this.#s.aToken[h]) + t, !((t.match(/\n/g) ?? []).length >= this.#O)); --h)
      ;
    const s = t.split(`
`).slice(-this.#O), i = s.length;
    console.group(`🥟 Error line (from ${String(i)} rows before) fn:${this.#i}`);
    const n = String(this.#e).length, a = this.#l(this.#s, this.#t);
    for (let h = 0; h < i; ++h) {
      const o = this.#e - i + h + 1, r = `${String(o).padStart(n, " ")}: %c`, e = s[h], l = e.length > 75 ? e.slice(0, 75) + "…" : e;
      h === i - 1 ? console.info(
        r + l.slice(0, a.col_s) + "%c" + l.slice(a.col_s),
        "color: black; background-color: skyblue;",
        "color: black; background-color: pink;"
      ) : console.info(r + l, "color: black; background-color: skyblue;");
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
    let i = 0, n = this.prpPrs.parse(s) ? this.#t : -1;
    const a = this.#s.aLNum[this.#t], h = this.#e - ((a ?? 0) || 0), o = this.#s.len;
    for (; this.#t < o; ++this.#t) {
      const r = this.#s.aLNum[this.#t];
      this.#s.aLNum[this.#t] = ((r ?? 0) || 0) + h;
      const e = this.#s.aToken[this.#t];
      if (!e) continue;
      const l = e.charCodeAt(0);
      if (l === 10) {
        this.#e += e.length;
        continue;
      }
      if (l !== 91) continue;
      const [f, c] = $(e);
      if (!(f in this.hTag)) throw `未定義のタグ[${f}]です`;
      switch (this.#r.parse(c), f) {
        case "if":
          ++i;
          break;
        case "elsif":
          {
            if (i > 0 || n > -1) break;
            const u = this.#r.hPrm.exp?.val;
            if (!u) throw "expは必須です";
            if (u.startsWith("&")) throw "属性expは「&」が不要です";
            this.prpPrs.parse(u) && (n = this.#t + 1);
          }
          break;
        case "else":
          if (i > 0) break;
          n === -1 && (n = this.#t + 1);
          break;
        case "endif":
          if (i > 0) {
            --i;
            break;
          }
          return n === -1 ? (++this.#t, this.#s.aLNum[this.#t] += h) : (this.#o.unshift(this.#t + 1), this.#t = n, this.#e = this.#s.aLNum[this.#t]), !1;
      }
    }
    throw "[endif]がないままスクリプト終端です";
  }
  //MARK: サブルーチンコール
  #at(t) {
    d(t, "count", !1) || this.#V();
    const { fn: s } = t;
    return s && this.#g(s), this.#M({ ...t }, E.popLocalEvts()), d(t, "clear_local_event", !1) && this.hTag.clear_event({}), this.#f(s, t.label);
  }
  #M(t, s) {
    const i = {
      ...t,
      ":hEvt1Time": s,
      ":hMp": this.val.cloneMp(),
      ":lenIfStk": this.#o.length
    };
    this.#s.aLNum[this.#t] = this.#e, this.#F || (i[":resvToken"] = "", this.#x()), this.#n.push(new x(this.#i, this.#t, i)), this.#o.unshift(-1);
  }
  //MARK: シナリオジャンプ
  #ht(t) {
    return d(t, "count", !0) || this.#V(), this.#o[0] = -1, this.#f(t.fn, t.label);
  }
  //MARK: コールスタック破棄
  #ot(t) {
    if (d(t, "clear", !1)) this.#n = [];
    else if (!this.#n.pop()) throw "スタックが空です";
    return this.#x(), this.#o = [-1], this.val.setMp(L()), !1;
  }
  //MARK: サブルーチンから戻る
  #j(t) {
    const s = this.#n.pop();
    if (!s) throw "スタックが空です";
    const i = s.csArg;
    this.#o = this.#o.slice(-i[":lenIfStk"]);
    const n = i[":hMp"];
    n && this.val.setMp(n);
    const a = i[":resvToken"];
    a ? this.nextToken = () => (this.#x(), a) : this.#x(), i[":hEvt1Time"] && E.pushLocalEvts(i[":hEvt1Time"]);
    const { fn: h, label: o } = t;
    return h || o ? this.#f(h, o) : s.fn in this.#h ? (this.#z(s), !1) : this.#f(s.fn, "", s.idx);
  }
  #F = "";
  #x() {
    this.#F = "", this.nextToken = () => this.#R();
  }
  #v = "";
  #f(t = "", s = "", i = 0) {
    if (S.debugLog && console.log(`📜 %c1:jumpWork%c fn:${t} lbl:${s} idx:${String(i)}`, "color:#3B0;", ""), !t && !s && this.main.errScript("[jump系] fnまたはlabelは必須です"), s ? (s.startsWith("*") || this.main.errScript("[jump系] labelは*で始まります"), this.#v = s, this.#v.startsWith("**") || (this.#t = i)) : (this.#v = "", this.#t = i), !t)
      return this.analyzeInit(), !1;
    if (t.includes("@")) throw "[jump系] fn には文字「@」は禁止です";
    const n = this.#g(t);
    if (t === this.#i)
      return this.analyzeInit(), !1;
    this.#i = t;
    const a = this.#h[t];
    if (a)
      return this.#s = a, this.analyzeInit(), !1;
    const h = `jumpWork fn:${t}`;
    b.beginProc(h);
    let o = "";
    const r = new I();
    try {
      o = this.#g(t + "@"), r.add({ name: t + ":base", url: n }), r.add({ name: t, url: o });
    } catch {
      r.add({ name: t, url: n });
    }
    return r.use((e, l) => {
      this.sys.dec(e.extension, e.data).then((f) => {
        e.data = f, l();
      }).catch((f) => {
        this.main.errScript(`[jump系]snロード失敗です fn:${e.name} ${String(f)}`, !1), l();
      });
    }).load((e, l) => {
      if (b.endProc(h), o) {
        const f = l[t + ":base"].data, c = l[t].data, u = f.split(`
`), m = c.split(`
`), v = u.length, P = m.length;
        for (let _ = 0; _ < P && _ < v; ++_) m[_] ||= u[_] ?? "";
        l[t].data = m.join(`
`), delete l[t + ":base"];
      }
      this.nextToken = this.#R, this.#e = 1, this.#ft(l[t].data), this.hTag.record_place({}), this.analyzeInit();
    }), !0;
  }
  analyzeInit() {
    S.debugLog && console.log(`📜 %c9:analyzeInit%c fn:${this.#i} lbl:${this.#v} idx:${String(this.#t)}`, "color:#3B0;", "");
    const t = this.#lt(this.#s, !!this.val.getVal("mp:const.sn.macro.name"), this.#e, this.#v, this.#t);
    this.#t = t.idx, this.#e = t.ln;
  }
  // シナリオ解析処理ループ・冒頭処理
  nextToken = () => "";
  // 初期化前に終了した場合向け
  #R() {
    if (this.#H()) return "";
    this.#dt(), this.#s.aLNum[this.#t] ||= this.#e;
    const t = this.#s.aToken[this.#t];
    return this.#W(t), ++this.#t, t;
  }
  #W = (t) => {
  };
  #H() {
    return this.#t < this.#s.len ? !1 : (this.main.errScript("スクリプト終端です errOverScr"), !0);
  }
  #rt = /(\*{2,})([^|]*)/;
  #ct = /^\[macro\s/;
  #K = /^\[endmacro[\s\]]/;
  #lt(t, s, i, n, a) {
    const h = t.aToken.length;
    let o = i, r = n;
    if (!r) {
      if (this.#H()) return { idx: a, ln: o };
      if (t.aLNum[a])
        o = t.aLNum[a];
      else {
        o = 1;
        for (let c = 0; c < a; ++c) {
          t.aLNum[c] ||= o;
          const u = t.aToken[c];
          u.startsWith(`
`) ? o += u.length : o += (u.match(/\n/g) ?? []).length;
        }
        t.aLNum[a] = o;
      }
      return { idx: a, ln: o };
    }
    t.aLNum[0] = 1;
    const e = r.match(this.#rt);
    if (e) {
      r = e[1];
      let c = a;
      switch (e[2]) {
        case "before":
          for (; t.aToken[--c] !== r; )
            c === 0 && g.myTrace(`[jump系 無名ラベルbefore] 
						${String(o)} 行目以前で ${s ? "マクロ内に" : ""} ラベル【 ${r} 】がありません`, "ET"), s && t.aToken[c].search(this.#ct) > -1 && g.myTrace("[jump系 無名ラベルbefore] マクロ内にラベル【" + r + "】がありません", "ET");
          return { idx: c + 1, ln: t.aLNum[c] };
        //	break;
        case "after":
          for (; t.aToken[++c] !== r; )
            c === h && g.myTrace(`[jump系 無名ラベルafter] ${String(o)} 行目以後でマクロ内にラベル【${r}】がありません`, "ET"), t.aToken[c].search(this.#K) > -1 && g.myTrace(`[jump系 無名ラベルafter] ${String(o)} 行目以後でマクロ内にラベル【 ${r} 】がありません`, "ET");
          return { idx: c + 1, ln: t.aLNum[c] };
        //	break;
        default:
          g.myTrace("[jump系] 無名ラベル指定【label=" + r + "】が間違っています", "ET");
      }
    }
    o = 1;
    const l = new RegExp(
      "^" + r.replaceAll("*", "\\*") + "(?=\\s|;|\\[|\\||$)"
    );
    let f = !1;
    for (let c = 0; c < h; ++c) {
      t.aLNum[c] ||= o;
      const u = t.aToken[c];
      if (f) {
        this.#c.testTagEndLetml(u) ? f = !1 : o += (u.match(/\n/g) ?? []).length;
        continue;
      }
      const m = u.charCodeAt(0);
      if (m === 10) {
        o += u.length;
        continue;
      }
      if (m === 42) {
        if (u.search(l) > -1) return { idx: c + 1, ln: o };
        continue;
      }
      m === 91 && (o += (u.match(/\n/g) ?? []).length, this.#c.testTagLetml(u) && (f = !0));
    }
    throw f ? "[let_ml]の終端・[endlet_ml]がありません" : (g.myTrace(`[jump系] ラベル【${r}】がありません`, "ET"), "Dummy");
  }
  #h = /* @__PURE__ */ Object.create(null);
  //{} シナリオキャッシュ
  #ft(t) {
    let s = "";
    try {
      s = "ScriptIterator.resolveScript";
      const i = this.#c.resolveScript(t);
      s = "ScriptIterator.replaceScript_Wildcard", this.#mt(i), this.#h[this.#i] = this.#s = i;
    } catch (i) {
      i instanceof Error ? s += `例外 mes=${i.message}(${i.name})` : s = String(i), this.main.errScript(s, !1);
    }
    this.val.touchAreaKidoku(this.#i);
  }
  #z(t) {
    this.#i = t.fn, this.#t = t.idx;
    const s = this.#h[this.#i];
    s && (this.#s = s), this.#e = this.#s.aLNum[t.idx];
  }
  #ut = /^\[(call|loadplugin)\s/;
  #pt = /\bfn\s*=\s*[^\s\]]+/;
  #mt(t) {
    for (let s = t.len - 1; s >= 0; --s) {
      const i = t.aToken[s];
      if (!this.#ut.test(i)) continue;
      const [n, a] = $(i);
      this.#r.parse(a);
      const h = this.#r.hPrm.fn;
      if (!h) continue;
      const { val: o } = h;
      if (!o.endsWith("*")) continue;
      t.aToken.splice(s, 1, "	", "; " + i), t.aLNum.splice(s, 1, NaN, NaN);
      const r = n === "loadplugin" ? w.CSS : w.SN, e = this.cfg.matchPath("^" + o.slice(0, -1) + ".*", r);
      for (const l of e) {
        const f = i.replace(
          this.#pt,
          "fn=" + decodeURIComponent(y(l[r]))
        );
        t.aToken.splice(s, 0, f), t.aLNum.splice(s, 0, NaN);
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
  #V() {
    this.val.getAreaKidoku(this.#i)?.erase(this.#t), this.#d = !1;
  }
  get isNextKidoku() {
    let t = this.#i, s = this.#t, i = this.#s.len;
    if (this.#n.length > 0) {
      const a = this.#n[0];
      t = a.fn, s = a.idx;
      const h = this.#h[t];
      h && (i = h.len);
    }
    return s === i ? !1 : this.val.getAreaKidoku(t)?.search(s) ?? !1;
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
  // eslint-disable-next-line no-irregular-whitespace
  #_t = /["'#;\\]　]+/;
  #bt(t) {
    const { name: s } = t;
    if (!s) throw "nameは必須です";
    if (s in this.hTag) throw `[${s}]はタグかすでに定義済みのマクロです`;
    if (this.#_t.test(s)) throw `[${s}]はマクロ名として異常です`;
    const i = this.#e, n = new x(this.#i, this.#t);
    for (this.#G += "|" + s, this.#N = new RegExp(`\\[(${this.#G})\\b`), this.hTag[s] = (a) => (a.design_unit = t.design_unit, this.#M(a), this.val.setMp({
      ...a,
      "const.sn.macro": JSON.stringify({ name: t.name }),
      // ムダに大きいスクリプター用情報を削除、名前だけに
      "const.sn.me_call_scriptFn": this.#i
    }), this.val.setVal_Nochk("mp", "const.sn.me_call_scriptFn", this.#i), this.#e = i, this.#z(n), !1); this.#t < this.#s.len; ++this.#t) {
      this.#s.aLNum[this.#t] ||= this.#e;
      const a = this.#s.aToken[this.#t];
      if (a.search(this.#K) > -1)
        return ++this.#t, !1;
      const h = a.charCodeAt(0);
      h === 10 ? this.#e += a.length : h === 91 && (this.#e += (a.match(/\n/g) ?? []).length);
    }
    throw `マクロ[${s}]定義の終端・[endmacro]がありません`;
  }
  #G = "call";
  #N = /\[(call)\b/;
  // https://regex101.com/r/Lk9ASK/1
  //MARK: しおりの読込
  #vt(t) {
    if ("fn" in t != "label" in t) throw "fnとlabelはセットで指定して下さい";
    const s = O(t, "place", 0), i = this.val.getMark(s);
    if (!i) throw `place=${String(s)} は存在しません`;
    return this.loadFromMark(
      t,
      i,
      2
      /* ALL_STOP_AND_PLAY */
    );
  }
  loadFromMark(t, s, i = 0) {
    this.hTag.clear_event({}), this.val.mark2save(s), this.val.setMp(L()), this.#m.recPagebreak();
    let n = [];
    i !== 1 && (n = this.sndMng.playLoopFromSaveObj(
      i === 2
      /* ALL_STOP_AND_PLAY */
    )), d(t, "do_rec", !0) && (this.#u = {
      hSave: this.val.cloneSave(),
      hPages: { ...s.hPages },
      aIfStk: [...s.aIfStk]
    });
    const a = {
      enabled: !!this.val.getVal("save:const.sn.autowc.enabled"),
      text: String(this.val.getVal("save:const.sn.autowc.text")),
      time: Number(this.val.getVal("save:const.sn.autowc.time"))
    };
    this.hTag.autowc(a), this.#o = [...this.#u.aIfStk], this.#n = [], N.stopAllTw();
    const h = Promise.allSettled([...n, ...this.#m.playback(this.#u.hPages)]).then(() => this.#m.cover(!1)), { index: o, fn: r } = t;
    if (o)
      return S.debugLog && console.log(`📜 %cloadFromMark index:${String(o)} move!%c fn:${r ?? ""}`, "color:#3B0;", ""), h.then(() => {
        this.#f(r, "", o) || this.main.resume();
      }).catch((c) => console.error("loadFromMark e:%o", c)), !0;
    this.#m.cover(!0);
    const e = String(this.val.getVal("save:const.sn.scriptFn")), l = Number(this.val.getVal("save:const.sn.scriptIdx"));
    delete this.#h[e];
    const { label: f } = t;
    return h.then(f ? () => {
      this.#i = e, this.#t = l, this.hTag.call({ fn: r, label: f }) || this.main.resume();
    } : () => {
      this.#f(e, "", l) || this.main.resume();
    }).catch((c) => console.error("loadFromMark e:%o", c)), !0;
  }
  //MARK: スクリプト再読込
  #St(t) {
    const s = this.val.getMark(0);
    if (!s) return !1;
    delete this.#h[y(s.hSave["const.sn.scriptFn"])];
    const i = {};
    for (const n in this.#h)
      try {
        this.#g(n + "@");
      } catch {
        i[n] = this.#h[n];
      }
    return this.#h = i, t.do_rec = !1, this.loadFromMark(
      t,
      s,
      1
      /* NO_TOUCH */
    );
  }
  //MARK: セーブポイント指定
  #u = {
    hSave: M(),
    hPages: {},
    aIfStk: [-1]
  };
  #q = () => {
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
    const { fn: t, idx: s } = this.nowScrIdx(), i = this.#h[t], n = this.#l(i, s);
    return { fn: t, ...n };
  }
  //MARK: しおりの保存
  #wt(t) {
    if (!("place" in t)) throw "placeは必須です";
    const s = Number(t.place);
    delete t[":タグ名"], delete t.place, t.text = t.text ?? "", this.#u.json = t, this.val.setMark(s, this.#u);
    const i = Number(this.val.getVal("sys:const.sn.save.place"));
    return s === i && this.val.setVal_Nochk("sys", "const.sn.save.place", i + 1), !1;
  }
  recodeDesign(t) {
    let s = "", i = 0;
    const n = this.#n.length;
    if (t.design_unit && n > 0) {
      const r = this.#n[0];
      s = r.fn, i = r.idx;
    } else
      s = this.#i, i = this.#t;
    t[":path"] = this.#_(s);
    const a = this.#h[s], h = this.#l(a, i);
    t[":ln"] = h.ln, t[":col_s"] = h.col_s, t[":col_e"] = h.col_e;
    const o = i - 1;
    t[":idx_tkn"] = o, t[":token"] = a.aToken[o], this.sys.send2Dbg("_recodeDesign", t);
  }
  replace(t, s) {
    this.#s.aToken[t] = s;
  }
}
const z = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  RPN_COMP_CHIN: C,
  ScriptIterator: p
}, Symbol.toStringTag, { value: "Module" }));
export {
  C as R,
  z as S,
  k as a
};
//# sourceMappingURL=ScriptIterator.js.map
