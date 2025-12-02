import { a as v, S, b as w, R as P, e as d, L as B, D as k, k as C, f as D } from "./app2.js";
import { c as O, C as L, a as $ } from "./CallStack.js";
import { G as I, A as M, t as T, a as x } from "./Main.js";
import { R as j } from "./RubySpliter.js";
import { a as _, C as y, R as N } from "./CmnTween.js";
import { a as W } from "./SndBuf.js";
class p {
  //MARK: コンストラクタ
  constructor(t, s, i, h, n, r, a) {
    this.cfg = t, this.hTag = s, this.main = i, this.val = h, this.prpPrs = n, this.sndMng = r, this.sys = a, s.let_ml = (e) => this.#Z(e), s.endlet_ml = () => !1, s.dump_stack = () => this.#tt(), s.dump_script = (e) => this.#st(e), s.else = // その他ifブロック開始
    s.elsif = // 別条件のifブロック開始
    s.endif = () => this.#et(), s.if = (e) => this.#nt(e), s.call = (e) => this.#ht(e), s.jump = (e) => this.#at(e), s.pop_stack = (e) => this.#ot(e), s.return = (e) => this.#j(e), s.bracket2macro = (e) => this.#kt(e), s.char2macro = (e) => this.#gt(e), s.endmacro = (e) => this.#j(e), s.macro = (e) => this.#bt(e), s.load = (e) => this.#vt(e), s.reload_script = (e) => this.#St(e), s.record_place = () => this.#q(), s.save = (e) => this.#wt(e), t.oCfg.debug.token && (this.#F = (e) => {
      e.trim() !== "" && console.log(`🌱 トークン ${this.#i}:${String(this.#e)} (i:${String(this.#t)} cs:${String(this.#n.length)}) %c【${e}】`, "background-color:#350;");
    }), t.oCfg.debug.tag && (this.#D = (e) => console.log(`🌲 タグ解析 ${this.#i}:${String(this.#e)} (i:${String(this.#t)} cs:${String(this.#n.length)}) %c[${e} %o]`, "background-color:#30B;", this.#r.hPrm)), h.defTmp("const.sn.aIfStk.length", () => this.#o.length), h.defTmp("const.sn.vctCallStk.length", () => this.#n.length), this.#l = new I(t);
    const l = t.oCfg.init.escape;
    if (this.#l.setEscape(l), j.setEscape(l), v.isDbg) {
      this.#k, a.addHook((c, f) => this.#k[c]?.(f)), this.isBreak = (c) => this.#A(c);
      const e = () => this.analyzeInit();
      this.analyzeInit = () => {
        this.analyzeInit = () => {
        }, this.sys.send2Dbg("hi", {});
      }, this.#k.auth = (c) => {
        const f = c.hBreakpoint.hFn2hLineBP;
        for (const [o, u] of Object.entries(f)) this.#E(o, u);
        p.#p = {};
        for (const o of c.hBreakpoint.aFunc)
          p.#p[o.name] = 1;
        if (c.stopOnEntry) {
          let o;
          for (; o = this.nextToken(); ) {
            const u = o.charCodeAt(0);
            if (u === 91 || u === 38 || u === 42 && o.length === 1) break;
            u === 10 && (this.#e += o.length);
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
  #l;
  #r = new M();
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
      p.#w = {}, p.#p = {}, this.isBreak = () => !1, this.#k.continue({}), this.#h = 0;
    },
    restart: () => {
      this.isBreak = () => !1;
    },
    // ブレークポイント登録
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    add_break: (t) => this.#E(t.fn, t.o),
    data_break: (t) => {
      this.#h === 0 && (this.#h = 1, this.main.setLoop(!1, `変数 ${String(t.dataId)}【${String(t.old_v)}】→【${String(t.new_v)}】データブレーク`), this.sys.callHook("stopOnDataBreakpoint", {}), this.sys.send2Dbg("stopOnDataBreakpoint", {}));
    },
    set_func_break: (t) => {
      p.#p = {};
      for (const s of t.a) p.#p[s.name] = 1;
      this.sys.send2Dbg(t.ri, {});
    },
    // 情報問い合わせ系
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    stack: (t) => this.sys.send2Dbg(t.ri, { a: this.#J() }),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    eval: (t) => {
      this.sys.send2Dbg(t.ri, { v: this.prpPrs.parse(t.txt) });
    },
    // デバッガからの操作系
    continue: () => {
      this.#S() || (this.#t -= this.#b, this.#h = 3, this.main.setLoop(!0), this.main.resume());
    },
    stepover: (t) => this.#P(t),
    stepin: () => {
      if (this.#S()) return;
      const t = this.#s.aToken[this.#t - this.#b];
      this.sys.callHook(`stopOnStep${this.#N.test(t ?? "") ? "In" : ""}`, {}), this.#t -= this.#b, this.#h = this.#h === 1 ? 4 : 5, this.main.setLoop(!0), this.main.resume();
    },
    stepout: (t) => {
      this.#S() || (this.#n.length > 0 ? this.#B(!0) : this.#P(t));
    },
    pause: () => {
      this.#h = 4, this.main.setLoop(!1, "一時停止"), this.sys.send2Dbg("stopOnStep", {});
    },
    stopOnEntry: () => {
      this.#h = 4, this.main.setLoop(!1, "一時停止"), this.sys.send2Dbg("stopOnEntry", {});
    }
  };
  #g = (t) => this.cfg.searchPath(t, S.SCRIPT);
  #_ = (t) => this.sys.pathBaseCnvSnPath4Dbg + this.#g(t);
  #P(t) {
    if (this.#S()) return;
    const s = this.#s.aToken[this.#t - this.#b];
    this.#N.test(s ?? "") ? this.#B(!1) : (this.sys.callHook("stopOnStep", {}), this.#k.stepin(t));
  }
  #B(t) {
    this.sys.callHook(`stopOnStep${t ? "Out" : ""}`, {}), this.#C = this.#n.length - (t ? 1 : 0), this.#t -= this.#b, this.#h = t ? 7 : 6, this.main.setLoop(!0), this.main.resume();
  }
  #C = 0;
  get #b() {
    return this.#h === 2 || this.#h === 4 ? 1 : 0;
  }
  #S() {
    return this.#t < this.#s.len ? !1 : (this.sys.callHook("stopOnEntry", {}), this.main.setLoop(!1, "スクリプト終端です isIdxOverLast"), !0);
  }
  // reload 再生成 Main に受け渡すため static
  static #w = {};
  static #p = {};
  #h = 0;
  // https://raw.githubusercontent.com/famibee/SKYNovel-vscode-extension/master/src/doc/BreakStateSMD.pu
  isBreak = (t) => !1;
  #A(t) {
    switch (this.#h) {
      case 6:
        this.#T(), this.#h = 7;
        break;
      case 7:
        if (this.#n.length !== this.#C) break;
        return this.#h = 4, this.main.setLoop(!1, "ステップ実行"), this.sys.send2Dbg("stopOnStep", {}), !0;
      // タグを実行せず、直前停止
      case 5:
        this.#T(), this.#h = 4;
        break;
      case 4:
        return this.#T(), this.main.setLoop(!1, "ステップ実行"), this.sys.send2Dbg("stopOnStep", {}), !0;
      // タグを実行せず、直前停止
      case 3:
        this.#T(), this.#h = 0;
        break;
      default:
        if (T(t) in p.#p)
          return this.#h = 2, this.main.setLoop(!1, `関数 ${t} ブレーク`), this.sys.callHook("stopOnBreakpoint", {}), this.sys.send2Dbg("stopOnBreakpoint", {}), !0;
        {
          const s = p.#w[this.#_(this.#i)];
          if (!s) break;
          const i = s[this.#e];
          if (!i) break;
          if (i.condition) {
            if (!this.prpPrs.parse(i.condition)) break;
          } else if ("hitCondition" in i && --i.hitCondition > 0) break;
          const h = this.#h === 0;
          this.#h = 2, this.main.setLoop(!1, h ? (
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            (i.condition ? "条件" : "ヒットカウント") + "ブレーク"
          ) : "ステップ実行");
          const n = h ? "stopOnBreakpoint" : "stopOnStep";
          this.sys.callHook(n, {}), this.sys.send2Dbg(n, {});
        }
        return !0;
    }
    return !1;
  }
  #T() {
    const t = p.#w[w(this.#i)]?.[this.#e];
    t?.hitCondition && --t.hitCondition;
  }
  #J() {
    const t = this.#h === 3 ? 1 : 0, s = this.#s.aToken[this.#t - 1 + t], i = this.#_(this.#i), h = T(s), n = h ? `[${h}]` : s, r = String(this.val.getVal("mp:const.sn.macro") ?? "{}");
    if (this.#t === 0) return [{ fn: i, ln: 1, col: 1, nm: n, ma: r }];
    const a = this.#c(this.#s, this.#t), l = [{ fn: i, ln: a.ln, col: a.col_s + 1, nm: n, ma: r }], e = this.#n.length;
    if (e === 0) return l;
    for (let c = e - 1; c >= 0; --c) {
      const f = this.#n[c], o = this.#a[f.fn];
      if (!o) continue;
      const u = o.aToken[f.idx - 1];
      if (!u) continue;
      const m = this.#c(o, f.idx), b = T(u);
      l.push({
        fn: this.#_(f.fn),
        ln: m.ln,
        col: m.col_s + 1,
        nm: b ? `[${b}]` : u,
        ma: f.csArg[":hMp"]["const.sn.macro"]
      });
    }
    return l;
  }
  // result = true : waitする  resume()で再開
  #D = (t) => {
  };
  //MARK: タグ解析
  async タグ解析(t, s) {
    const i = this.hTag[t];
    if (!i) throw `未定義のタグ【${t}】です`;
    this.#r.parse(s), this.#D(t);
    const h = this.#r.hPrm;
    if (h.cond) {
      const e = h.cond.val;
      if (!e || e.startsWith("&")) throw "属性condは「&」が不要です";
      const c = this.prpPrs.parse(e), f = String(c);
      if (f === "null" || f === "undefined" || !c) return !1;
    }
    let n = {};
    const r = this.#n.at(-1)?.csArg ?? O(), a = this.#n.length;
    if (this.#r.isKomeParam) {
      if (a === 0) throw "属性「*」はマクロのみ有効です";
      n = { ...r };
    }
    n[":タグ名"] = t;
    for (const [e, { val: c, def: f }] of Object.entries(h)) {
      let o = c;
      if (c.startsWith("%")) {
        if (a === 0) throw "属性「%」はマクロ定義内でのみ使用できます（そのマクロの引数を示す簡略文法であるため）";
        const u = r[o.slice(1)];
        if (u) {
          n[e] = u;
          continue;
        }
        if (f === void 0 || f === "null") continue;
        o = f;
      }
      if (o = this.prpPrs.getValAmpersand(o ?? ""), o !== "undefined") {
        n[e] = o;
        continue;
      }
      f !== void 0 && (o = this.prpPrs.getValAmpersand(f), o !== "undefined" && (n[e] = o));
    }
    if (_.needGoTxt && this.#U.has(t)) {
      const { promise: e, resolve: c } = Promise.withResolvers();
      _.beginProc(P, () => c(0), !1, () => c(0)), _.goTxt(), this.val.saveKidoku(), await e;
    }
    this.#X.has(t) && (this.#x.hideHint(), y.stopEndTrans());
    const l = this.#Q[t];
    return l && d(n, "canskip", this.#Y[t] ?? !0) && this.#x.isSkipping ? l(n) : i(n);
  }
  // 文字出現演出を待つタグ
  //	ここで列挙せずタグ処理で文字表示を始めたい場合、goTxt()すること
  #U = /* @__PURE__ */ new Set([
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
  #Q = {
    wt: () => (y.stopEndTrans(), !1),
    // トランス終了待ち
    wait_tsy: (t) => this.hTag.stop_tsy(t),
    // トゥイーン終了待ち
    // 'wv',		：タグ内部で処理	// 動画再生終了待ち
    wait: () => !1,
    // ウェイトを入れる
    // 'playbgm',	：スルー不可		// BGM の演奏
    // 'playse',	：タグ内部で処理	// 効果音の再生
    wb: () => this.hTag.stopfadese({ buf: W }),
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
  #Y = {
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
  #x;
  #m;
  setOtherObj(t, s) {
    this.#x = t, this.#m = s;
  }
  //MARK: インラインテキスト代入
  #Z(t) {
    const { name: s } = t;
    if (!s) throw "nameは必須です";
    let i = "";
    const h = this.#s.len;
    for (; this.#t < h && (i = this.#s.aToken[this.#t], i === ""); ++this.#t)
      ;
    return t.text = i, t.cast = "str", this.hTag.let(t), this.#t += 2, this.#e += (i.match(/\n/g) ?? []).length, !1;
  }
  //MARK: スタックのダンプ
  #tt() {
    if (this.#t === 0)
      return console.group(`🥟 [dump_stack] スクリプト現在地 fn:${this.#i} line:1 col:0`), console.groupEnd(), !1;
    const t = this.#c(this.#s, this.#t), s = `スクリプト現在地 fn:${this.#i} line:${String(t.ln)} col:${String(t.col_s + 1)}`;
    console.group(`🥟 [dump_stack] ${s}`);
    const i = this.#n.length;
    if (i > 0) {
      console.info(s);
      for (let h = i - 1; h >= 0; --h) {
        const n = this.#n[h], r = n.csArg[":hMp"], a = r ? r[":タグ名"] : void 0, l = n.csArg[":タグ名"] ?? "", e = this.#c(this.#a[n.fn], n.idx);
        console.info(
          `${String(i - h)}つ前のコール元 fn:${n.fn} line:${String(e.ln)} col:${String(e.col_s + 1)}${a ? "（[" + a + "]マクロ内）" : " "}で [${l} ...]をコール`
        );
      }
    }
    return console.groupEnd(), !1;
  }
  #c(t, s) {
    const i = { ln: 1, col_s: 0, col_e: 0 };
    if (!t) return i;
    let h = s - 1;
    const n = i.ln = t.aLNum[h];
    for (; t.aLNum[h] === n; ) {
      const r = t.aToken[h];
      if (!r.startsWith(`
`)) {
        const a = r.length;
        i.col_e > 0 && (i.col_s += a), i.col_e += a;
      }
      if (--h < 0) break;
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
    if (this.noticeBreak = (h) => {
      this.#O !== this.#i && (this.#O = this.#i, this.#y(
        this.#it[this.#i] ??= this.#s.aToken.join("")
      )), this.#L(this.#e, h);
    }, this.noticeBreak(!0), !i) return !1;
    if (this.#L = globalThis[i], !this.#L) {
      if (d(t, "need_err", !0)) throw `HTML内に関数${i}が見つかりません`;
      this.#L = () => {
      };
    }
    return !1;
  }
  #y = () => {
  };
  #L = () => {
  };
  #O = "";
  #it = {};
  noticeBreak = (t) => {
  };
  #I = 5;
  dumpErrForeLine() {
    if (this.#t === 0) {
      console.group(`🥟 Error line (from 0 rows before) fn:${this.#i}`), console.groupEnd();
      return;
    }
    let t = "";
    for (let r = this.#t - 1; r >= 0 && (t = String(this.#s.aToken[r]) + t, !((t.match(/\n/g) ?? []).length >= this.#I)); --r)
      ;
    const s = t.split(`
`).slice(-this.#I), i = s.length;
    console.group(`🥟 Error line (from ${String(i)} rows before) fn:${this.#i}`);
    const h = String(this.#e).length, n = this.#c(this.#s, this.#t);
    for (let r = 0; r < i; ++r) {
      const a = this.#e - i + r + 1, l = `${String(a).padStart(h, " ")}: %c`, e = s[r], c = e.length > 75 ? e.slice(0, 75) + "…" : e;
      r === i - 1 ? console.info(
        l + c.slice(0, n.col_s) + "%c" + c.slice(n.col_s),
        "color: black; background-color: skyblue;",
        "color: black; background-color: pink;"
      ) : console.info(l + c, "color: black; background-color: skyblue;");
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
    let i = 0, h = this.prpPrs.parse(s) ? this.#t : -1;
    const n = this.#s.aLNum[this.#t], r = this.#e - ((n ?? 0) || 0), a = this.#s.len;
    for (; this.#t < a; ++this.#t) {
      const l = this.#s.aLNum[this.#t];
      this.#s.aLNum[this.#t] = ((l ?? 0) || 0) + r;
      const e = this.#s.aToken[this.#t];
      if (!e) continue;
      const c = e.charCodeAt(0);
      if (c === 10) {
        this.#e += e.length;
        continue;
      }
      if (c !== 91) continue;
      const [f, o] = x(e);
      if (!(f in this.hTag)) throw `未定義のタグ[${f}]です`;
      switch (this.#r.parse(o), f) {
        case "if":
          ++i;
          break;
        case "elsif":
          {
            if (i > 0 || h > -1) break;
            const u = this.#r.hPrm.exp?.val;
            if (!u) throw "expは必須です";
            if (u.startsWith("&")) throw "属性expは「&」が不要です";
            this.prpPrs.parse(u) && (h = this.#t + 1);
          }
          break;
        case "else":
          if (i > 0) break;
          h === -1 && (h = this.#t + 1);
          break;
        case "endif":
          if (i > 0) {
            --i;
            break;
          }
          return h === -1 ? (++this.#t, this.#s.aLNum[this.#t] += r) : (this.#o.unshift(this.#t + 1), this.#t = h, this.#e = this.#s.aLNum[this.#t]), !1;
      }
    }
    throw "[endif]がないままスクリプト終端です";
  }
  //MARK: サブルーチンコール
  #ht(t) {
    d(t, "count", !1) || this.#V();
    const { fn: s } = t;
    return s && this.#g(s), this.#M({ ...t }, N.popLocalEvts()), d(t, "clear_local_event", !1) && this.hTag.clear_event({}), this.#f(s, t.label);
  }
  #M(t, s) {
    const i = {
      ...t,
      ":hEvt1Time": s,
      ":hMp": this.val.cloneMp(),
      ":lenIfStk": this.#o.length
    };
    this.#s.aLNum[this.#t] = this.#e, this.#W || (i[":resvToken"] = "", this.#$()), this.#n.push(new L(this.#i, this.#t, i)), this.#o.unshift(-1);
  }
  //MARK: シナリオジャンプ
  #at(t) {
    return d(t, "count", !0) || this.#V(), this.#o[0] = -1, this.#f(t.fn, t.label);
  }
  //MARK: コールスタック破棄
  #ot(t) {
    if (d(t, "clear", !1)) this.#n = [];
    else if (!this.#n.pop()) throw "スタックが空です";
    return this.#$(), this.#o = [-1], this.val.setMp($()), !1;
  }
  //MARK: サブルーチンから戻る
  #j(t) {
    const s = this.#n.pop();
    if (!s) throw "スタックが空です";
    const i = s.csArg;
    this.#o = this.#o.slice(-i[":lenIfStk"]);
    const h = i[":hMp"];
    h && this.val.setMp(h);
    const n = i[":resvToken"];
    n ? this.nextToken = () => (this.#$(), n) : this.#$(), i[":hEvt1Time"] && N.pushLocalEvts(i[":hEvt1Time"]);
    const { fn: r, label: a } = t;
    return r || a ? this.#f(r, a) : s.fn in this.#a ? (this.#z(s), !1) : this.#f(s.fn, "", s.idx);
  }
  #W = "";
  #$() {
    this.#W = "", this.nextToken = () => this.#R();
  }
  #v = "";
  #f(t = "", s = "", i = 0) {
    if (v.debugLog && console.log(`📜 %c1:jumpWork%c fn:${t} lbl:${s} idx:${String(i)}`, "color:#3B0;", ""), !t && !s && this.main.errScript("[jump系] fnまたはlabelは必須です"), s ? (s.startsWith("*") || this.main.errScript("[jump系] labelは*で始まります"), this.#v = s, this.#v.startsWith("**") || (this.#t = i)) : (this.#v = "", this.#t = i), !t)
      return this.analyzeInit(), !1;
    if (t.includes("@")) throw "[jump系] fn には文字「@」は禁止です";
    const h = this.#g(t);
    if (t === this.#i)
      return this.analyzeInit(), !1;
    this.#i = t;
    const n = this.#a[t];
    if (n)
      return this.#s = n, this.analyzeInit(), !1;
    const r = `jumpWork fn:${t}`;
    _.beginProc(r);
    let a = "";
    const l = new B();
    try {
      a = this.#g(t + "@"), l.add({ name: t + ":base", url: h }), l.add({ name: t, url: a });
    } catch {
      l.add({ name: t, url: h });
    }
    return l.use((e, c) => {
      this.sys.dec(e.extension, e.data).then((f) => {
        e.data = f, c();
      }).catch((f) => {
        this.main.errScript(`[jump系]snロード失敗です fn:${e.name} ${String(f)}`, !1), c();
      });
    }).load((e, c) => {
      if (_.endProc(r), a) {
        const f = c[t + ":base"].data, o = c[t].data, u = f.split(`
`), m = o.split(`
`), b = u.length, E = m.length;
        for (let g = 0; g < E && g < b; ++g) m[g] ||= u[g] ?? "";
        c[t].data = m.join(`
`), delete c[t + ":base"];
      }
      this.nextToken = this.#R, this.#e = 1, this.#ft(c[t].data), this.hTag.record_place({}), this.analyzeInit();
    }), !0;
  }
  analyzeInit() {
    v.debugLog && console.log(`📜 %c9:analyzeInit%c fn:${this.#i} lbl:${this.#v} idx:${String(this.#t)}`, "color:#3B0;", "");
    const t = this.#ct(this.#s, !!this.val.getVal("mp:const.sn.macro.name"), this.#e, this.#v, this.#t);
    this.#t = t.idx, this.#e = t.ln;
  }
  // シナリオ解析処理ループ・冒頭処理
  nextToken = () => "";
  // 初期化前に終了した場合向け
  #R() {
    if (this.#H()) return "";
    this.#dt(), this.#s.aLNum[this.#t] ||= this.#e;
    const t = this.#s.aToken[this.#t];
    return this.#F(t), ++this.#t, t;
  }
  #F = (t) => {
  };
  #H() {
    return this.#t < this.#s.len ? !1 : (this.main.errScript("スクリプト終端です errOverScr"), !0);
  }
  #rt = /(\*{2,})([^|]*)/;
  #lt = /^\[macro\s/;
  #K = /^\[endmacro[\s\]]/;
  #ct(t, s, i, h, n) {
    const r = t.aToken.length;
    let a = i, l = h;
    if (!l) {
      if (this.#H()) return { idx: n, ln: a };
      if (t.aLNum[n])
        a = t.aLNum[n];
      else {
        a = 1;
        for (let o = 0; o < n; ++o) {
          t.aLNum[o] ||= a;
          const u = t.aToken[o];
          u.startsWith(`
`) ? a += u.length : a += (u.match(/\n/g) ?? []).length;
        }
        t.aLNum[n] = a;
      }
      return { idx: n, ln: a };
    }
    t.aLNum[0] = 1;
    const e = l.match(this.#rt);
    if (e) {
      l = e[1];
      let o = n;
      switch (e[2]) {
        case "before":
          for (; t.aToken[--o] !== l; )
            o === 0 && k.myTrace(`[jump系 無名ラベルbefore] 
						${String(a)} 行目以前で ${s ? "マクロ内に" : ""} ラベル【 ${l} 】がありません`, "ET"), s && t.aToken[o].search(this.#lt) > -1 && k.myTrace("[jump系 無名ラベルbefore] マクロ内にラベル【" + l + "】がありません", "ET");
          return { idx: o + 1, ln: t.aLNum[o] };
        //	break;
        case "after":
          for (; t.aToken[++o] !== l; )
            o === r && k.myTrace(`[jump系 無名ラベルafter] ${String(a)} 行目以後でマクロ内にラベル【${l}】がありません`, "ET"), t.aToken[o].search(this.#K) > -1 && k.myTrace(`[jump系 無名ラベルafter] ${String(a)} 行目以後でマクロ内にラベル【 ${l} 】がありません`, "ET");
          return { idx: o + 1, ln: t.aLNum[o] };
        //	break;
        default:
          k.myTrace("[jump系] 無名ラベル指定【label=" + l + "】が間違っています", "ET");
      }
    }
    a = 1;
    const c = new RegExp(
      "^" + l.replaceAll("*", "\\*") + "(?=\\s|;|\\[|\\||$)"
    );
    let f = !1;
    for (let o = 0; o < r; ++o) {
      t.aLNum[o] ||= a;
      const u = t.aToken[o];
      if (f) {
        this.#l.testTagEndLetml(u) ? f = !1 : a += (u.match(/\n/g) ?? []).length;
        continue;
      }
      const m = u.charCodeAt(0);
      if (m === 10) {
        a += u.length;
        continue;
      }
      if (m === 42) {
        if (u.search(c) > -1) return { idx: o + 1, ln: a };
        continue;
      }
      m === 91 && (a += (u.match(/\n/g) ?? []).length, this.#l.testTagLetml(u) && (f = !0));
    }
    throw f ? "[let_ml]の終端・[endlet_ml]がありません" : (k.myTrace(`[jump系] ラベル【${l}】がありません`, "ET"), "Dummy");
  }
  #a = /* @__PURE__ */ Object.create(null);
  //{} シナリオキャッシュ
  #ft(t) {
    let s = "";
    try {
      s = "ScriptIterator.resolveScript";
      const i = this.#l.resolveScript(t);
      s = "ScriptIterator.replaceScript_Wildcard", this.#mt(i), this.#a[this.#i] = this.#s = i;
    } catch (i) {
      i instanceof Error ? s += `例外 mes=${i.message}(${i.name})` : s = String(i), this.main.errScript(s, !1);
    }
    this.val.touchAreaKidoku(this.#i);
  }
  #z(t) {
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
      const [h, n] = x(i);
      this.#r.parse(n);
      const r = this.#r.hPrm.fn;
      if (!r) continue;
      const { val: a } = r;
      if (!a.endsWith("*")) continue;
      t.aToken.splice(s, 1, "	", "; " + i), t.aLNum.splice(s, 1, NaN, NaN);
      const l = h === "loadplugin" ? S.CSS : S.SN, e = this.cfg.matchPath("^" + a.slice(0, -1) + ".*", l);
      for (const c of e) {
        const f = i.replace(
          this.#pt,
          "fn=" + decodeURIComponent(w(c[l]))
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
      const n = this.#n[0];
      t = n.fn, s = n.idx;
      const r = this.#a[t];
      r && (i = r.len);
    }
    return s === i ? !1 : this.val.getAreaKidoku(t)?.search(s) ?? !1;
  }
  get normalWait() {
    return this.#d ? this.val.tagCh_doWait_Kidoku ? this.val.tagCh_msecWait_Kidoku : 0 : this.val.tagCh_doWait ? this.val.tagCh_msecWait : 0;
  }
  //MARK: 括弧マクロの定義
  #kt(t) {
    return this.#l.bracket2macro(t, this.hTag, this.#s, this.#t), !1;
  }
  //MARK: 一文字マクロの定義
  #gt(t) {
    return this.#l.char2macro(t, this.hTag, this.#s, this.#t), !1;
  }
  //MARK: マクロ定義の開始
  // eslint-disable-next-line no-irregular-whitespace
  #_t = /["'#;\\]　]+/;
  #bt(t) {
    const { name: s } = t;
    if (!s) throw "nameは必須です";
    if (s in this.hTag) throw `[${s}]はタグかすでに定義済みのマクロです`;
    if (this.#_t.test(s)) throw `[${s}]はマクロ名として異常です`;
    const i = this.#e, h = new L(this.#i, this.#t);
    for (this.#G += "|" + s, this.#N = new RegExp(`\\[(${this.#G})\\b`), this.hTag[s] = (n) => (n.design_unit = t.design_unit, this.#M(n), this.val.setMp({
      ...n,
      "const.sn.macro": JSON.stringify({ name: t.name }),
      // ムダに大きいスクリプター用情報を削除、名前だけに
      "const.sn.me_call_scriptFn": this.#i
    }), this.val.setVal_Nochk("mp", "const.sn.me_call_scriptFn", this.#i), this.#e = i, this.#z(h), !1); this.#t < this.#s.len; ++this.#t) {
      this.#s.aLNum[this.#t] ||= this.#e;
      const n = this.#s.aToken[this.#t];
      if (n.search(this.#K) > -1)
        return ++this.#t, !1;
      const r = n.charCodeAt(0);
      r === 10 ? this.#e += n.length : r === 91 && (this.#e += (n.match(/\n/g) ?? []).length);
    }
    throw `マクロ[${s}]定義の終端・[endmacro]がありません`;
  }
  #G = "call";
  #N = /\[(call)\b/;
  // https://regex101.com/r/Lk9ASK/1
  //MARK: しおりの読込
  #vt(t) {
    if ("fn" in t != "label" in t) throw "fnとlabelはセットで指定して下さい";
    const s = C(t, "place", 0), i = this.val.getMark(s);
    if (!i) throw `place=${String(s)} は存在しません`;
    return this.loadFromMark(
      t,
      i,
      2
      /* ALL_STOP_AND_PLAY */
    );
  }
  loadFromMark(t, s, i = 0) {
    this.hTag.clear_event({}), this.val.mark2save(s), this.val.setMp($()), this.#m.recPagebreak();
    let h = [];
    i !== 1 && (h = this.sndMng.playLoopFromSaveObj(
      i === 2
      /* ALL_STOP_AND_PLAY */
    )), d(t, "do_rec", !0) && (this.#u = {
      hSave: this.val.cloneSave(),
      hPages: { ...s.hPages },
      aIfStk: [...s.aIfStk]
    });
    const n = {
      enabled: !!this.val.getVal("save:const.sn.autowc.enabled"),
      text: String(this.val.getVal("save:const.sn.autowc.text")),
      time: Number(this.val.getVal("save:const.sn.autowc.time"))
    };
    this.hTag.autowc(n), this.#o = [...this.#u.aIfStk], this.#n = [], y.stopAllTw();
    const r = Promise.allSettled([...h, ...this.#m.playback(this.#u.hPages)]).then(() => this.#m.cover(!1)), { index: a, fn: l } = t;
    if (a)
      return v.debugLog && console.log(`📜 %cloadFromMark index:${String(a)} move!%c fn:${l ?? ""}`, "color:#3B0;", ""), r.then(() => {
        this.#f(l, "", a) || this.main.resume();
      }).catch((o) => console.error("loadFromMark e:%o", o)), !0;
    this.#m.cover(!0);
    const e = String(this.val.getVal("save:const.sn.scriptFn")), c = Number(this.val.getVal("save:const.sn.scriptIdx"));
    delete this.#a[e];
    const { label: f } = t;
    return r.then(f ? () => {
      this.#i = e, this.#t = c, this.hTag.call({ fn: l, label: f }) || this.main.resume();
    } : () => {
      this.#f(e, "", c) || this.main.resume();
    }).catch((o) => console.error("loadFromMark e:%o", o)), !0;
  }
  //MARK: スクリプト再読込
  #St(t) {
    const s = this.val.getMark(0);
    if (!s) return !1;
    delete this.#a[w(s.hSave["const.sn.scriptFn"])];
    const i = {};
    for (const h in this.#a)
      try {
        this.#g(h + "@");
      } catch {
        i[h] = this.#a[h];
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
    hSave: D(),
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
  // コピーはここでする
  //MARK: スクリプト停止位置（マクロなどなら最上位の呼び元）
  nowScrFnLn() {
    const { fn: t, idx: s } = this.nowScrIdx(), i = this.#a[t], h = this.#c(i, s);
    return { fn: t, ...h };
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
    const h = this.#n.length;
    if (t.design_unit && h > 0) {
      const l = this.#n[0];
      s = l.fn, i = l.idx;
    } else
      s = this.#i, i = this.#t;
    t[":path"] = this.#_(s);
    const n = this.#a[s], r = this.#c(n, i);
    t[":ln"] = r.ln, t[":col_s"] = r.col_s, t[":col_e"] = r.col_e;
    const a = i - 1;
    t[":idx_tkn"] = a, t[":token"] = n.aToken[a], this.sys.send2Dbg("_recodeDesign", t);
  }
  replace(t, s) {
    this.#s.aToken[t] = s;
  }
}
export {
  p as ScriptIterator
};
//# sourceMappingURL=ScriptIterator.js.map
