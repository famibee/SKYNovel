import { u as b, h as p, i as w, j as f, k as N, l as r, e as S } from "./web2.js";
import { c as O } from "./CallStack.js";
import { PropParser as C } from "./PropParser.js";
import { R as W } from "./CmnTween.js";
class m {
  #t = {};
  clear() {
    this.#t = {};
  }
  static from(t) {
    const s = new m();
    return s.#t = { ...t }, s;
  }
  val() {
    return { ...this.#t };
  }
  search(t) {
    return Object.entries(this.#t).some(([s, e]) => t >= parseInt(s) && t <= e);
  }
  record(t) {
    if (!this.search(t)) {
      for (const [s, e] of Object.entries(this.#t))
        if (e + 1 === t) {
          String(t + 1) in this.#t ? (this.#t[s] = this.#t[t + 1], delete this.#t[t + 1]) : this.#t[s] = t;
          return;
        }
      if (String(t + 1) in this.#t) {
        this.#t[t] = this.#t[t + 1], delete this.#t[t + 1];
        return;
      }
      this.#t[t] = t;
    }
  }
  erase(t) {
    if (this.search(t)) {
      if (String(t) in this.#t) {
        this.#t[t] > t && (this.#t[t + 1] = this.#t[t]), delete this.#t[t];
        return;
      }
      for (const [s, e] of Object.entries(this.#t))
        if (!(t < parseInt(s) || e < t)) {
          if (this.#t[s] === t) {
            this.#t[s] = t - 1;
            return;
          }
          this.#t[t + 1] = e, this.#t[s] = t - 1;
          return;
        }
    }
  }
  get count() {
    return Object.keys(this.#t).length;
  }
  // 4tst
  toString() {
    let t = "";
    for (const s of Object.keys(this.#t).map((e) => parseInt(e)).sort((e, i) => e - i))
      t += s === this.#t[s] ? "," + String(s) : "," + String(s) + "~" + String(this.#t[String(s)]);
    return t;
  }
}
class g {
  constructor(t, s, e) {
    this.sys = t, this.cfg = s, e.let = (i) => this.#i(i), e.let_abs = (i) => this.#V(i), e.let_char_at = (i) => this.#j(i), e.let_index_of = (i) => this.#P(i), e.let_length = (i) => this.#R(i), e.let_replace = (i) => this.#L(i), e.let_round = (i) => this.#K(i), e.let_search = (i) => this.#F(i), e.let_substr = (i) => this.#M(i), e.clearsysvar = () => this.#p(), e.clearvar = () => this.#D(), e.dump_val = () => this.#E(), e.copybookmark = (i) => this.#W(i), e.erasebookmark = (i) => this.#O(i), this.defTmp("const.sn.bookmark.json", () => {
      const i = [];
      for (const [c, n] of Object.entries(this.#e.mark)) {
        const h = { ...n.json };
        h.place = b(c), i.push(h);
      }
      return JSON.stringify(i);
    }), this.#o["const.sn.config.window.width"] = s.oCfg.window.width, this.#o["const.sn.config.window.height"] = s.oCfg.window.height, this.#o["const.sn.config.book.title"] = s.oCfg.book.title, this.#o["const.sn.config.book.version"] = s.oCfg.book.version;
  }
  #t = p();
  #o = w();
  #s = {
    sys: {},
    // clearsysvarを呼ぶので
    save: this.#t,
    tmp: this.#o,
    mp: {},
    mark: {}
  };
  #e = {
    sys: {},
    // clearsysvarを呼ぶので
    mark: {},
    kidoku: {}
  };
  #n;
  #a = {};
  #_;
  async init() {
    return this.sys.initVal(this.#o, (t) => {
      this.updateData(t), this.cfg.oCfg.debug.variable ? this.#N(this.sys) : this.flush = () => this.sys.flush(), this.flush(), this.#_ = (e, i) => this.sys.callHook(e, i), this.sys.addHook((e, i) => this.#C[e]?.(e, i)), f(this.getVal("sys:sn.tagCh.msecWait", -1)) === -1 && this.#p(!0), this.#l = !!this.getVal("sys:sn.tagCh.doWait"), this.#f = !!this.getVal("sys:sn.tagCh.doWait_Kidoku"), this.#u = f(this.getVal("sys:sn.tagCh.msecWait")), this.#g = f(this.getVal("sys:sn.tagCh.msecWait_Kidoku")), this.#m();
    });
  }
  //MARK: SessionStorage で確認できるデバッグ機能
  #N(t) {
    sessionStorage.clear();
    const s = this.cfg.headNs;
    this.flush = () => {
      const e = N();
      for (const [a, o] of Object.entries(this.#n))
        o instanceof Function || (e[a] = o);
      sessionStorage[s + "sys"] = JSON.stringify(e);
      const i = p();
      for (const [a, o] of Object.entries(this.#t))
        i[a] = o;
      sessionStorage[s + "save"] = JSON.stringify(i);
      const c = w();
      for (const [a, o] of Object.entries(this.#o))
        c[a] = o instanceof Function ? o() : o;
      sessionStorage[s + "tmp"] = JSON.stringify(c);
      const n = O();
      for (const [a, o] of Object.entries(this.#s.mp))
        n[a] = o;
      sessionStorage[s + "mp"] = JSON.stringify(n);
      const h = {};
      for (const [a, o] of Object.entries(this.#e.mark))
        h[f(a)] = o instanceof Function ? o() : o;
      sessionStorage[s + "mark"] = JSON.stringify(h), sessionStorage[s + "kidoku"] = structuredClone(this.#e.kidoku), t.flush();
    };
  }
  #m() {
    W.playbackPage(
      String(this.getVal("sys:const.sn.aPageLog", "[]")),
      String(this.getVal("save:const.sn.styPaging", W.INI_STYPAGE))
    );
  }
  #C = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    auth: (t, s) => this.#y(s.hBreakpoint.aData),
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    var: (t, s) => this.sys.send2Dbg(s.ri, { v: this.#s[s.scope] ?? {} }),
    set_var: (t, s) => {
      try {
        this.#S(s.nm, s.val), this.sys.send2Dbg(s.ri, {});
      } catch {
      }
    },
    set_data_break: (t, s) => {
      this.#y(s.a), this.sys.send2Dbg(s.ri, {});
    },
    disconnect: (t) => {
      g.#r = {};
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #y(t) {
    g.#r = {};
    for (const s of t) g.#r[s.dataId] = 1;
  }
  //MARK: 外からのデータで保持データを更新
  //	初期化時やインポートなどで使用
  updateData(t) {
    this.#e = t, this.#n = this.#s.sys = t.sys, this.#a = {};
    for (const [s, e] of Object.entries(t.kidoku))
      this.#a[s] = m.from(e);
  }
  flush = () => {
  };
  setDoRecProc(t) {
    this.#d = t;
  }
  #d = (t) => {
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  defTmp(t, s) {
    this.#o[t] = s;
  }
  cloneMp() {
    return { ...this.#s.mp };
  }
  setMp(t) {
    this.#s.mp = t;
  }
  setMark(t, s) {
    this.#e.mark[t] = s, this.flush();
  }
  getMark(t) {
    const s = this.#e.mark[t];
    if (!s) throw `place【${String(t)}】は存在しません`;
    return s;
  }
  cloneSave() {
    return { ...this.#s.save };
  }
  mark2save(t) {
    this.#t = this.#s.save = { ...t.hSave }, this.#h = this.#t["sn.doRecLog"];
  }
  // 既読系
  touchAreaKidoku(t) {
    const s = this.#a[t];
    return s || (this.#e.kidoku[t] = {}, this.#a[t] = new m());
  }
  getAreaKidoku(t) {
    const s = this.#a[t];
    if (!s) throw `hAreaKidoku${t}】は存在しません`;
    return s;
  }
  saveKidoku() {
    for (const [t, s] of Object.entries(this.#a))
      this.#e.kidoku[t] = s.val();
    this.flush();
  }
  //	// しおり
  // しおりの複写
  #W(t) {
    const s = r(t, "from", NaN), e = r(t, "to", NaN);
    if (s === e) return !1;
    const i = this.#e.mark[s];
    if (!i) throw `from:${String(s)} のセーブデータは存在しません`;
    return this.setMark(e, { ...i }), this.sys.copyBMFolder(s, e), !1;
  }
  // しおりの消去
  #O(t) {
    const s = r(t, "place", NaN);
    return delete this.#e.mark[s], this.flush(), this.sys.eraseBMFolder(s), !1;
  }
  //	//	変数操作
  // 変数代入・演算
  #i(t) {
    if (!t.name) throw "nameは必須です";
    let s = !0;
    if (t.cast)
      switch (t.cast) {
        case "num":
          r(t, "text", NaN);
          break;
        case "int":
          t.text = String(f(r(t, "text", NaN)));
          break;
        case "uint":
          t.text = String(b(r(t, "text", NaN)));
          break;
        case "bool":
          S(t, "text", !1);
          break;
        case "str":
          s = !1;
          break;
        default:
          throw "cast【" + t.cast + "】は未定義です";
      }
    return this.#S(t.name, t.text, s), !1;
  }
  // 絶対値
  #V(t) {
    const s = r(t, "text", 0);
    return t.text = String(s < 0 ? -s : s), this.#i(t), !1;
  }
  // 文字列から一字取りだし
  #j(t) {
    return t.text = (t.text ?? "").charAt(r(t, "pos", 0)), this.#i(t), !1;
  }
  // 文字列で検索
  #P(t) {
    const { val: s } = t;
    if (!s) throw "valは必須です";
    const e = r(t, "start", 0);
    return t.text = String((t.text ?? "").indexOf(s, e)), this.#i(t), !1;
  }
  // 文字列の長さ
  #R(t) {
    return t.text = String((t.text ?? "").length), this.#i(t), !1;
  }
  // 正規表現で置換
  #L(t) {
    if (!t.reg) throw "regは必須です";
    const { flags: s } = t, e = s ? new RegExp(t.reg, s) : new RegExp(t.reg);
    return t.text = (t.text ?? "").replace(e, String(t.val)), this.#i(t), !1;
  }
  // 四捨五入
  #K(t) {
    const s = r(t, "text", 0);
    return t.text = String(Math.round(s)), this.#i(t), !1;
  }
  // 正規表現で検索
  #F(t) {
    if (!t.reg) throw "regは必須です";
    const { flags: s } = t, e = s ? new RegExp(t.reg, s) : new RegExp(t.reg);
    return t.text = String((t.text ?? "").search(e)), this.#i(t), !1;
  }
  // 文字列から抜きだし
  #M(t) {
    const s = r(t, "pos", 0);
    return t.text = t.len !== "all" ? (t.text ?? "").slice(s, s + f(r(t, "len", 1))) : (t.text ?? "").slice(s), this.#i(t), !1;
  }
  //	// デバッグ・その他
  // システム変数の全消去
  #p(t = !1) {
    const s = this.#n = this.#s.sys = this.#e.sys = N();
    typeof process < "u" || (this.setVal_Nochk("sys", "const.sn.window.x", 0), this.setVal_Nochk("sys", "const.sn.window.y", 0)), this.setVal_Nochk("sys", "sn.tagCh.msecWait", this.cfg.oCfg.init.tagch_msecwait), this.setVal_Nochk("sys", "sn.tagCh.msecWait_Kidoku", this.cfg.oCfg.init.tagch_msecwait), this.setVal_Nochk("sys", "sn.auto.msecPageWait", r(s, "sn.auto.msecPageWait", this.cfg.oCfg.init.auto_msecpagewait)), this.setVal_Nochk("sys", "sn.auto.msecPageWait_Kidoku", r(s, "sn.auto.msecPageWait", this.cfg.oCfg.init.auto_msecpagewait));
    for (const i of Object.values(this.#a)) i.clear();
    return this.#s.mark = this.#e.mark = {}, t || this.#m(), this.flush(), !1;
  }
  // ゲーム変数の全消去
  #D() {
    const t = this.#t["const.sn.mesLayer"], s = this.#t["sn.doRecLog"], e = this.#t["const.sn.sLog"], i = this.#t["const.sn.styPaging"];
    return this.#t = this.#s.save = p(), this.setVal_Nochk("save", "const.sn.mesLayer", t), this.setVal_Nochk("save", "sn.doRecLog", s), this.setVal_Nochk("save", "const.sn.sLog", e), this.setVal_Nochk("save", "const.sn.styPaging", i), !1;
  }
  #S(t, s, e = !0) {
    if (!t) throw "[変数に値セット] nameは必須です";
    if (s === void 0) throw "[変数に値セット] textは必須です（空文字はOK）";
    const i = C.getValName(t);
    if (!i) throw `[変数参照] name(${t})が変数名として異常です`;
    const { scope: c, name: n } = i, h = this.#s[c];
    if (n.startsWith("const.") && n in h)
      throw `[変数に値セット] 変数【${n}】は書き換え不可です`;
    this.setVal_Nochk(c, n, s, e);
  }
  setVal_Nochk(t, s, e, i = !1) {
    const c = this.#s[t], n = i ? this.#c(e) : e, h = t + ":" + s;
    if (h in g.#r) {
      const a = c[s];
      a != n && this.#_("data_break", {
        dataId: h,
        old_v: a,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        new_v: n
      });
    }
    c[s] = n, this.#v[h]?.(s, n ?? "");
  }
  // reload 再生成 Main に受け渡すため static
  static #r = {};
  // readonly getVal_save = (arg_name: string, def?: number | string)=> {
  // 	if (! arg_name) throw '[変数参照] nameは必須です';
  getVal(t, s, e = !1) {
    if (!t) throw "[変数参照] nameは必須です";
    const i = C.getValName(t);
    if (!i) throw "[変数参照] name(" + t + ")が変数名として異常です";
    const { scope: c, name: n, at: h } = i, a = this.#s[c];
    let o = a[n];
    if (!(n in a)) {
      if (o = s, e)
        return a[n] = s, h === "@str" ? o : this.#c(o);
      let k = "";
      const y = n.split("."), _ = y.length;
      for (let u = 0; u < _; ++u, k += ".") {
        if (k += y[u], !(k in a)) continue;
        let l = JSON.parse(a[k]);
        if (Object.prototype.toString.call(l) !== "[object Object]") {
          if (u + 1 === _) {
            o = l;
            break;
          }
          continue;
        }
        let d = u;
        for (; ++d < _; ) {
          const v = y[d];
          if (!(v in l)) {
            o = s;
            break;
          }
          if (l = l[v], Object.prototype.toString.call(l) !== "[object Object]" || d + 1 === _) {
            o = l;
            break;
          }
        }
        o instanceof Object && (o = JSON.stringify(o));
        break;
      }
    }
    return o instanceof Function && (o = o()), h === "@str" ? o : this.#c(o);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #c(t) {
    const s = t;
    if (s === "true") return !0;
    if (s === "false") return !1;
    if (s === "null") return null;
    if (s !== "undefined")
      return this.#x.test(s) ? parseFloat(s) : t;
  }
  #x = /^-?[\d.]+$/;
  // 変数のダンプ
  #E() {
    const t = { tmp: {}, sys: {}, save: {}, mp: {} };
    for (const s in t) {
      const e = this.#s[s], i = t[s];
      for (const [c, n] of Object.entries(e))
        n instanceof Function || (i[c] = n);
    }
    return console.info("🥟 [dump_val]", t), !1;
  }
  #h = !1;
  doRecLog() {
    return this.#h;
  }
  #l = !1;
  get tagCh_doWait() {
    return this.#l;
  }
  #f = !1;
  get tagCh_doWait_Kidoku() {
    return this.#f;
  }
  #u = 0;
  get tagCh_msecWait() {
    return this.#u;
  }
  #g = 0;
  get tagCh_msecWait_Kidoku() {
    return this.#g;
  }
  #v = {
    // sys
    "sys:sn.tagCh.doWait": (t) => {
      this.#l = this.#k(t);
    },
    "sys:sn.tagCh.doWait_Kidoku": (t) => {
      this.#f = this.#k(t);
    },
    "sys:sn.tagCh.msecWait": (t) => {
      this.#u = this.#I(t);
    },
    "sys:sn.tagCh.msecWait_Kidoku": (t) => {
      this.#g = this.#B(t);
    },
    "sys:sn.tagCh.canskip": (t) => this.#k(t),
    "sys:sn.auto.msecPageWait": (t) => this.#b(t),
    "sys:sn.auto.msecPageWait_Kidoku": (t) => this.#b(t),
    "sys:sn.auto.msecLineWait": (t) => this.#w(t),
    "sys:sn.auto.msecLineWait_Kidoku": (t) => this.#w(t),
    // save
    "save:sn.doRecLog": (t) => {
      this.#d(
        this.#h = this.#J(t)
      );
    },
    "save:sn.userFnTail": (t, s) => {
      const e = String(s);
      if (e.includes("@")) throw "この変数では文字「@」は禁止です";
      this.cfg.userFnTail = e;
    },
    // tmp
    "tmp:flash.desktop.NativeApplication.nativeApplication.systemIdleMode": () => {
    }
  };
  defValTrg(t, s) {
    this.#v[t] = s;
  }
  #k = (t) => S(this.#n, t, !0);
  #I = (t) => r(this.#n, t, 10);
  #B = (t) => r(
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    this.#n,
    t,
    this.cfg.oCfg.init.tagch_msecwait ?? 10
  );
  #b = (t) => r(
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    this.#n,
    t,
    this.cfg.oCfg.init.auto_msecpagewait ?? 3500
  );
  #w = (t) => r(this.#n, t, 500);
  #J(t) {
    return S(this.#t, t, !0);
  }
}
export {
  g as Variable
};
//# sourceMappingURL=Variable.js.map
