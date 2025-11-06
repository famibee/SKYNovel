import { u as S, h as p, i as v, j as f, k as b, l as c, e as y } from "./web2.js";
import { c as C } from "./CallStack.js";
import { PropParser as w } from "./PropParser.js";
import { R as N } from "./Reading.js";
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
    this.sys = t, this.cfg = s, e.let = (i) => this.#i(i), e.let_abs = (i) => this.#V(i), e.let_char_at = (i) => this.#j(i), e.let_index_of = (i) => this.#P(i), e.let_length = (i) => this.#R(i), e.let_replace = (i) => this.#L(i), e.let_round = (i) => this.#K(i), e.let_search = (i) => this.#F(i), e.let_substr = (i) => this.#M(i), e.clearsysvar = () => this.#d(), e.clearvar = () => this.#D(), e.dump_val = () => this.#E(), e.copybookmark = (i) => this.#W(i), e.erasebookmark = (i) => this.#O(i), this.defTmp("const.sn.bookmark.json", () => {
      const i = [];
      for (const [r, n] of Object.entries(this.#e.mark)) {
        const o = { ...n.json };
        o.place = S(r), i.push(o);
      }
      return JSON.stringify(i);
    }), this.#o["const.sn.config.window.width"] = s.oCfg.window.width, this.#o["const.sn.config.window.height"] = s.oCfg.window.height, this.#o["const.sn.config.book.title"] = s.oCfg.book.title, this.#o["const.sn.config.book.version"] = s.oCfg.book.version;
  }
  #t = p();
  #o = v();
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
  #m;
  async init() {
    return this.sys.initVal(this.#o, (t) => {
      this.updateData(t), this.cfg.oCfg.debug.variable ? this.#N(this.sys) : this.flush = () => this.sys.flush(), this.flush(), this.#m = (e, i) => this.sys.callHook(e, i), this.sys.addHook((e, i) => this.#C[e]?.(e, i)), f(this.getVal("sys:sn.tagCh.msecWait", -1)) === -1 && this.#d(!0), this.#l = !!this.getVal("sys:sn.tagCh.doWait"), this.#f = !!this.getVal("sys:sn.tagCh.doWait_Kidoku"), this.#u = f(this.getVal("sys:sn.tagCh.msecWait")), this.#g = f(this.getVal("sys:sn.tagCh.msecWait_Kidoku")), this.#_();
    });
  }
  //MARK: SessionStorage で確認できるデバッグ機能
  #N(t) {
    sessionStorage.clear();
    const s = this.cfg.headNs;
    this.flush = () => {
      const e = b();
      for (const [h, a] of Object.entries(this.#n))
        a instanceof Function || (e[h] = a);
      sessionStorage[s + "sys"] = JSON.stringify(e);
      const i = p();
      for (const [h, a] of Object.entries(this.#t))
        i[h] = a;
      sessionStorage[s + "save"] = JSON.stringify(i);
      const r = v();
      for (const [h, a] of Object.entries(this.#o))
        r[h] = a instanceof Function ? a() : a;
      sessionStorage[s + "tmp"] = JSON.stringify(r);
      const n = C();
      for (const [h, a] of Object.entries(this.#s.mp))
        n[h] = a;
      sessionStorage[s + "mp"] = JSON.stringify(n);
      const o = {};
      for (const [h, a] of Object.entries(this.#e.mark))
        o[f(h)] = a instanceof Function ? a() : a;
      sessionStorage[s + "mark"] = JSON.stringify(o), sessionStorage[s + "kidoku"] = structuredClone(this.#e.kidoku), t.flush();
    };
  }
  #_() {
    N.playbackPage(
      String(this.getVal("sys:const.sn.aPageLog", "[]")),
      String(this.getVal("save:const.sn.styPaging", N.INI_STYPAGE))
    );
  }
  #C = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    auth: (t, s) => this.#p(s.hBreakpoint.aData),
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    var: (t, s) => this.sys.send2Dbg(s.ri, { v: this.#s[s.scope] ?? {} }),
    set_var: (t, s) => {
      try {
        this.#S(s.nm, s.val), this.sys.send2Dbg(s.ri, {});
      } catch {
      }
    },
    set_data_break: (t, s) => {
      this.#p(s.a), this.sys.send2Dbg(s.ri, {});
    },
    disconnect: (t) => {
      g.#r = {};
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #p(t) {
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
    this.#y = t;
  }
  #y = (t) => {
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
    const s = c(t, "from", NaN), e = c(t, "to", NaN);
    if (s === e) return !1;
    const i = this.#e.mark[s];
    if (!i) throw `from:${String(s)} のセーブデータは存在しません`;
    return this.setMark(e, { ...i }), this.sys.copyBMFolder(s, e), !1;
  }
  // しおりの消去
  #O(t) {
    const s = c(t, "place", NaN);
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
          c(t, "text", NaN);
          break;
        case "int":
          t.text = String(f(c(t, "text", NaN)));
          break;
        case "uint":
          t.text = String(S(c(t, "text", NaN)));
          break;
        case "bool":
          y(t, "text", !1);
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
    const s = c(t, "text", 0);
    return t.text = String(s < 0 ? -s : s), this.#i(t), !1;
  }
  // 文字列から一字取りだし
  #j(t) {
    return t.text = (t.text ?? "").charAt(c(t, "pos", 0)), this.#i(t), !1;
  }
  // 文字列で検索
  #P(t) {
    const { val: s } = t;
    if (!s) throw "valは必須です";
    const e = c(t, "start", 0);
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
    const s = c(t, "text", 0);
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
    const s = c(t, "pos", 0);
    return t.text = t.len !== "all" ? (t.text ?? "").slice(s, s + f(c(t, "len", 1))) : (t.text ?? "").slice(s), this.#i(t), !1;
  }
  //	// デバッグ・その他
  // システム変数の全消去
  #d(t = !1) {
    const s = this.#n = this.#s.sys = this.#e.sys = b();
    typeof process < "u" || (this.setVal_Nochk("sys", "const.sn.window.x", 0), this.setVal_Nochk("sys", "const.sn.window.y", 0)), this.setVal_Nochk("sys", "sn.tagCh.msecWait", this.cfg.oCfg.init.tagch_msecwait), this.setVal_Nochk("sys", "sn.tagCh.msecWait_Kidoku", this.cfg.oCfg.init.tagch_msecwait), this.setVal_Nochk("sys", "sn.auto.msecPageWait", c(s, "sn.auto.msecPageWait", this.cfg.oCfg.init.auto_msecpagewait)), this.setVal_Nochk("sys", "sn.auto.msecPageWait_Kidoku", c(s, "sn.auto.msecPageWait", this.cfg.oCfg.init.auto_msecpagewait));
    for (const i of Object.values(this.#a)) i.clear();
    return this.#s.mark = this.#e.mark = {}, t || this.#_(), this.flush(), !1;
  }
  // ゲーム変数の全消去
  #D() {
    const t = this.#t["const.sn.mesLayer"], s = this.#t["sn.doRecLog"], e = this.#t["const.sn.sLog"], i = this.#t["const.sn.styPaging"];
    return this.#t = this.#s.save = p(), this.setVal_Nochk("save", "const.sn.mesLayer", t), this.setVal_Nochk("save", "sn.doRecLog", s), this.setVal_Nochk("save", "const.sn.sLog", e), this.setVal_Nochk("save", "const.sn.styPaging", i), !1;
  }
  #S(t, s, e = !0) {
    if (!t) throw "[変数に値セット] nameは必須です";
    if (s === void 0) throw "[変数に値セット] textは必須です（空文字はOK）";
    const i = w.getValName(t);
    if (!i) throw `[変数参照] name(${t})が変数名として異常です`;
    const r = this.#s[i.scope];
    if (!r) throw `[変数に値セット] scopeが異常【${String(i.scope)}】です`;
    const n = i.name;
    if (n.startsWith("const.") && n in r)
      throw `[変数に値セット] 変数【${n}】は書き換え不可です`;
    this.setVal_Nochk(i.scope, n, s, e);
  }
  setVal_Nochk(t, s, e, i = !1) {
    const r = this.#s[t], n = i ? this.#c(e) : e, o = t + ":" + s;
    if (o in g.#r) {
      const h = r[s], a = n;
      h != a && this.#m("data_break", {
        dataId: o,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        old_v: h,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        new_v: a
      });
    }
    r[s] = n, this.#v[o]?.(s, n ?? "");
  }
  // reload 再生成 Main に受け渡すため static
  static #r = {};
  // readonly getVal_save = (arg_name: string, def?: number | string)=> {
  // 	if (! arg_name) throw '[変数参照] nameは必須です';
  getVal(t, s, e = !1) {
    if (!t) throw "[変数参照] nameは必須です";
    const i = w.getValName(t);
    if (!i) throw "[変数参照] name(" + t + ")が変数名として異常です";
    const r = this.#s[i.scope];
    if (!r) throw `[変数参照] scopeが異常【${String(i.scope)}】です`;
    const n = i.name;
    let o = r[n];
    if (!(n in r)) {
      if (o = s, e)
        return r[n] = s, i.at === "@str" ? o : this.#c(o);
      let h = "";
      const a = n.split("."), k = a.length;
      for (let u = 0; u < k; ++u, h += ".") {
        if (h += a[u], !(h in r)) continue;
        let l = JSON.parse(r[h]);
        if (Object.prototype.toString.call(l) !== "[object Object]") {
          if (u + 1 === k) {
            o = l;
            break;
          }
          continue;
        }
        let _ = u;
        for (; ++_ < k; ) {
          const d = a[_];
          if (!(d in l)) {
            o = s;
            break;
          }
          if (l = l[d], Object.prototype.toString.call(l) !== "[object Object]" || _ + 1 === k) {
            o = l;
            break;
          }
        }
        o instanceof Object && (o = JSON.stringify(o));
        break;
      }
    }
    return o instanceof Function && (o = o()), i.at === "@str" ? o : this.#c(o);
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
      for (const [r, n] of Object.entries(e))
        n instanceof Function || (i[r] = n);
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
      this.#y(
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
  #k = (t) => y(this.#n, t, !0);
  #I = (t) => c(this.#n, t, 10);
  #B = (t) => c(
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    this.#n,
    t,
    this.cfg.oCfg.init.tagch_msecwait ?? 10
  );
  #b = (t) => c(
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    this.#n,
    t,
    this.cfg.oCfg.init.auto_msecpagewait ?? 3500
  );
  #w = (t) => c(this.#n, t, 500);
  #J(t) {
    return y(this.#t, t, !0);
  }
}
export {
  g as Variable
};
//# sourceMappingURL=Variable.js.map
