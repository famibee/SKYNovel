import { g as b, p as v, a as _, u as w, b as r, i as m } from "./web2.js";
import { PropParser as p } from "./PropParser.js";
import { p as S, I as d } from "./ReadState.js";
class y {
  hAreas = /* @__PURE__ */ Object.create(null);
  clear() {
    this.hAreas = {};
  }
  search(t) {
    return Object.entries(this.hAreas).some(([s, e]) => t >= parseInt(s) && t <= e);
  }
  record(t) {
    if (!this.search(t)) {
      for (const [s, e] of Object.entries(this.hAreas))
        if (e + 1 === t) {
          String(t + 1) in this.hAreas ? (this.hAreas[s] = this.hAreas[t + 1], delete this.hAreas[t + 1]) : this.hAreas[s] = t;
          return;
        }
      if (String(t + 1) in this.hAreas) {
        this.hAreas[t] = this.hAreas[t + 1], delete this.hAreas[t + 1];
        return;
      }
      this.hAreas[t] = t;
    }
  }
  erase(t) {
    if (this.search(t)) {
      if (String(t) in this.hAreas) {
        this.hAreas[t] > t && (this.hAreas[t + 1] = this.hAreas[t]), delete this.hAreas[t];
        return;
      }
      for (const [s, e] of Object.entries(this.hAreas))
        if (!(t < parseInt(s) || e < t)) {
          if (this.hAreas[s] === t) {
            this.hAreas[s] = t - 1;
            return;
          }
          this.hAreas[t + 1] = e, this.hAreas[s] = t - 1;
          return;
        }
    }
  }
  get count() {
    return Object.keys(this.hAreas).length;
  }
  // 4tst
  toString() {
    let t = "";
    for (const s of Object.keys(this.hAreas).map((e) => parseInt(e)).sort((e, a) => e - a))
      t += s === this.hAreas[s] ? "," + s : "," + s + "~" + this.hAreas[s];
    return t;
  }
}
class k {
  constructor(t, s) {
    if (this.cfg = t, s.let = (i) => this.#o(i), s.let_abs = (i) => this.#P(i), s.let_char_at = (i) => this.#L(i), s.let_index_of = (i) => this.#F(i), s.let_length = (i) => this.#K(i), s.let_replace = (i) => this.#R(i), s.let_round = (i) => this.#M(i), s.let_search = (i) => this.#x(i), s.let_substr = (i) => this.#D(i), s.clearsysvar = () => this.#c(), s.clearvar = () => this.#v(), s.dump_val = () => this.#B(), s.copybookmark = (i) => this.#O(i), s.erasebookmark = (i) => this.#j(i), this.#i["sn.userFnTail"] = "", this.defTmp("const.sn.bookmark.json", () => {
      const i = [];
      for (const o of Object.keys(this.#e.mark).sort()) {
        const c = { ...this.#e.mark[o].json };
        c.place = o, i.push(c);
      }
      return JSON.stringify(i);
    }), this.#t["const.sn.isFirstBoot"] = !0, this.#t["const.sn.last_page_text"] = "", this.#t["const.sn.last_page_plain_text"] = "", this.#t["const.sn.displayState"] = !1, this.#t["const.Date.getTime"] = () => (/* @__PURE__ */ new Date()).getTime(), this.#t["const.Date.getDateStr"] = () => b(), this.#t["const.sn.platform"] = JSON.stringify(v), this.#c(!0), this.#v(), this.#t["const.sn.config.window.width"] = t.oCfg.window.width, this.#t["const.sn.config.window.height"] = t.oCfg.window.height, this.#t["const.sn.config.book.title"] = t.oCfg.book.title, this.#t["const.sn.config.book.version"] = t.oCfg.book.version, this.#t["const.sn.Math.PI"] = Math.PI, this.#t["const.sn.isPaging"] = !1, typeof window > "u") return;
    const e = window, a = e.AudioContext ?? e.webkitAudioContext;
    this.#t["const.sn.needClick2Play"] = () => new a().state === "suspended";
  }
  #s = { sys: {}, save: {}, tmp: {}, mp: {} };
  #i = this.#s.save;
  #t = this.#s.tmp;
  #n;
  #e = { sys: {}, mark: {}, kidoku: {} };
  #a;
  #h = {};
  #m;
  async setSys(t) {
    this.#n = t, await t.initVal(this.#e, this.#t, (s) => {
      this.updateData(s), sessionStorage.clear();
      const e = this.cfg.getNs();
      this.#y = this.cfg.oCfg.debug.variable ? () => {
        const i = {};
        for (const [h, n] of Object.entries(this.#a))
          i["sys:" + h] = n instanceof Function ? n() : n;
        sessionStorage[e + "sys"] = JSON.stringify(i);
        const o = {};
        for (const [h, n] of Object.entries(this.#i))
          o["save:" + h] = n instanceof Function ? n() : n;
        sessionStorage[e + "save"] = JSON.stringify(o);
        const c = {};
        for (const [h, n] of Object.entries(this.#t))
          c[h] = n instanceof Function ? n() : n;
        sessionStorage[e + "tmp"] = JSON.stringify(c);
        const l = {};
        for (const [h, n] of Object.entries(this.#s.mp))
          l[h] = n instanceof Function ? n() : n;
        sessionStorage[e + "mp"] = JSON.stringify(l);
        const u = {};
        for (const [h, n] of Object.entries(this.#e.mark))
          u[h] = n instanceof Function ? n() : n;
        sessionStorage[e + "mark"] = JSON.stringify(u);
        const f = {};
        for (const [h, n] of Object.entries(this.#e.kidoku))
          f[h] = n instanceof Function ? n() : n;
        sessionStorage[e + "kidoku"] = JSON.stringify(f), t.flush();
      } : () => t.flush(), this.#m = (i, o) => t.callHook(i, o), t.addHook((i, o) => this.#W[i]?.(i, o));
      const a = this.getVal("sys:sn.tagCh.msecWait", -1);
      (this.#t["const.sn.isFirstBoot"] || a === -1) && this.#c(!0), this.#f = this.getVal("sys:sn.tagCh.doWait"), this.#u = this.getVal("sys:sn.tagCh.doWait_Kidoku"), this.#k = this.getVal("sys:sn.tagCh.msecWait"), this.#_ = this.getVal("sys:sn.tagCh.msecWait_Kidoku"), this.#p();
    });
  }
  #p() {
    S(
      this.getVal("sys:const.sn.aPageLog") ?? "[]",
      this.getVal("save:const.sn.styPaging") ?? d
    );
  }
  #W = {
    auth: (t, s) => this.#d(s.hBreakpoint.aData),
    var: (t, s) => this.#n.send2Dbg(s.ri, { v: this.#s[s.scope] ?? {} }),
    set_var: (t, s) => {
      try {
        this.#w(s.nm, s.val), this.#n.send2Dbg(s.ri, {});
      } catch {
      }
    },
    set_data_break: (t, s) => {
      this.#d(s.a), this.#n.send2Dbg(s.ri, {});
    },
    disconnect: (t) => k.#r = {}
  };
  #d(t) {
    k.#r = {};
    for (const s of t) k.#r[s.dataId] = 1;
  }
  updateData(t) {
    this.#e = t, this.#a = this.#s.sys = this.#e.sys, this.#h = {};
    for (const [s, e] of Object.entries(this.#e.kidoku)) {
      const a = new y();
      a.hAreas = { ...e }, this.#h[s] = a;
    }
  }
  #y = () => {
  };
  flush() {
    this.#y();
  }
  // 先にこのメソッドへの参照を配ってしまうので、中身を入れ替える
  setDoRecProc(t) {
    this.#b = t;
  }
  #b = (t) => {
  };
  defTmp(t, s) {
    this.#t[t] = s;
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
  getMark = (t) => {
    const s = this.#e.mark[t];
    if (!s) throw `place【${t}】は存在しません`;
    return s;
  };
  cloneSave() {
    return { ...this.#s.save };
  }
  mark2save(t) {
    this.#i = this.#s.save = { ...t.hSave }, this.#l = this.#i["sn.doRecLog"] ?? !1;
  }
  // 既読系
  touchAreaKidoku(t) {
    return this.#h[t] ??= new y();
  }
  getAreaKidoku = (t) => {
    const s = this.#h[t];
    if (!s) throw `hAreaKidoku${t}】は存在しません`;
    return s;
  };
  saveKidoku() {
    for (const [t, { hAreas: s }] of Object.entries(this.#h))
      this.#e.kidoku[t] = { ...s };
    this.flush();
  }
  //	// しおり
  // しおりの複写
  #O(t) {
    if (!("from" in t)) throw "fromは必須です";
    if (!("to" in t)) throw "toは必須です";
    const s = Number(t.from), e = Number(t.to);
    if (s === e) return !1;
    const a = this.#e.mark[s];
    if (!a) throw `from:${s} のセーブデータは存在しません`;
    return this.setMark(e, { ...a }), this.#n.copyBMFolder(s, e), !1;
  }
  // しおりの消去
  #j(t) {
    const { place: s } = t;
    if (!s) throw "placeは必須です";
    return delete this.#e.mark[s], this.flush(), this.#n.eraseBMFolder(s), !1;
  }
  //	//	変数操作
  // 変数代入・演算
  #o(t) {
    if (!t.name) throw "nameは必須です";
    let s = !0;
    if (t.cast)
      switch (t.cast) {
        case "num":
          r(t, "text", NaN);
          break;
        case "int":
          t.text = String(m(r(t, "text", NaN)));
          break;
        case "uint":
          t.text = String(w(r(t, "text", NaN)));
          break;
        case "bool":
          _(t, "text", !1);
          break;
        case "str":
          s = !1;
          break;
        default:
          throw "cast【" + t.cast + "】は未定義です";
      }
    return this.#w(t.name, t.text, s), !1;
  }
  // 絶対値
  #P(t) {
    const s = r(t, "text", 0);
    return t.text = String(s < 0 ? -s : s), this.#o(t), !1;
  }
  // 文字列から一字取りだし
  #L(t) {
    return t.text = (t.text ?? "").charAt(r(t, "pos", 0)), this.#o(t), !1;
  }
  // 文字列で検索
  #F(t) {
    const { val: s } = t;
    if (!s) throw "valは必須です";
    const e = r(t, "start", 0);
    return t.text = String((t.text ?? "").indexOf(s, e)), this.#o(t), !1;
  }
  // 文字列の長さ
  #K(t) {
    return t.text = String((t.text ?? "").length), this.#o(t), !1;
  }
  // 正規表現で置換
  #R(t) {
    if (!t.reg) throw "regは必須です";
    const { flags: s } = t, e = s ? new RegExp(t.reg, s) : new RegExp(t.reg);
    return t.text = String(t.text ?? "").replace(e, String(t.val)), this.#o(t), !1;
  }
  // 四捨五入
  #M(t) {
    const s = r(t, "text", 0);
    return t.text = String(Math.round(s)), this.#o(t), !1;
  }
  // 正規表現で検索
  #x(t) {
    if (!t.reg) throw "regは必須です";
    const { flags: s } = t, e = s ? new RegExp(t.reg, s) : new RegExp(t.reg);
    return t.text = String((t.text ?? "").search(e)), this.#o(t), !1;
  }
  // 文字列から抜きだし
  #D(t) {
    const s = r(t, "pos", 0);
    return t.text = t.len !== "all" ? (t.text ?? "").slice(s, s + m(r(t, "len", 1))) : (t.text ?? "").slice(s), this.#o(t), !1;
  }
  //	// デバッグ・その他
  // システム変数の全消去
  #c(t = !1) {
    const s = this.#a = this.#s.sys = this.#e.sys = {};
    typeof process < "u" || (this.setVal_Nochk("sys", "const.sn.window.x", 0), this.setVal_Nochk("sys", "const.sn.window.y", 0)), this.setVal_Nochk("sys", "sn.tagCh.doWait", !0), this.setVal_Nochk("sys", "sn.tagCh.doWait_Kidoku", !0), this.setVal_Nochk("sys", "sn.tagCh.msecWait", this.cfg.oCfg.init.tagch_msecwait), this.setVal_Nochk("sys", "sn.tagCh.msecWait_Kidoku", this.cfg.oCfg.init.tagch_msecwait), this.setVal_Nochk("sys", "sn.tagCh.canskip", !0), this.setVal_Nochk("sys", "sn.skip.mode", "s"), this.setVal_Nochk("sys", "sn.auto.msecPageWait", r(s, "sn.auto.msecPageWait", this.cfg.oCfg.init.auto_msecpagewait ?? 3500)), this.setVal_Nochk("sys", "sn.auto.msecPageWait_Kidoku", r(s, "sn.auto.msecPageWait", this.cfg.oCfg.init.auto_msecpagewait ?? 3500)), this.setVal_Nochk("sys", "sn.auto.msecLineWait", 500), this.setVal_Nochk("sys", "sn.auto.msecLineWait_Kidoku", 500), this.setVal_Nochk("sys", "sn.sound.BGM.vol_mul_talking", 1), this.setVal_Nochk("sys", "const.sn.sound.BGM.volume", 1), this.setVal_Nochk("sys", "const.sn.sound.SE.volume", 1), this.setVal_Nochk("sys", "const.sn.sound.SYS.volume", 1);
    for (const [a, i] of Object.entries(this.#e.kidoku))
      i.hAreas = {}, this.#h[a]?.clear();
    return this.setVal_Nochk("sys", "TextLayer.Back.Alpha", 0.5), this.#s.mark = this.#e.mark = {}, this.setVal_Nochk("sys", "const.sn.save.place", 1), this.setVal_Nochk("sys", "const.sn.aPageLog", "[]"), t || this.#p(), this.flush(), !1;
  }
  // ゲーム変数の全消去
  #v() {
    const t = this.#i["const.sn.mesLayer"] ?? "", s = this.#i["sn.doRecLog"] ?? !1, e = this.#i["const.sn.sLog"] ?? "[]", a = this.#i["const.sn.styPaging"] ?? d;
    return this.#i = this.#s.save = {}, this.setVal_Nochk("save", "const.sn.mesLayer", t), this.setVal_Nochk("save", "sn.doRecLog", s), this.setVal_Nochk("save", "const.sn.sLog", e), this.setVal_Nochk("save", "const.sn.styPaging", a), !1;
  }
  #w = (t, s, e = !0) => {
    if (!t) throw "[変数に値セット] nameは必須です";
    if (s == null) throw "[変数に値セット] textは必須です（空文字はOK）";
    const a = p.getValName(t);
    if (!a) throw "[変数参照] name(" + t + ")が変数名として異常です";
    const i = this.#s[a.scope];
    if (!i) throw "[変数に値セット] scopeが異常【" + a.scope + "】です";
    const o = a.name;
    if (o.startsWith("const.") && o in i)
      throw "[変数に値セット] 変数【" + o + "】は書き換え不可です";
    this.setVal_Nochk(a.scope, o, s, e);
  };
  setVal_Nochk(t, s, e, a = !1) {
    const i = this.#s[t];
    a && (e = this.#S(e));
    const o = t + ":" + s;
    if (o in k.#r) {
      const c = i[s], l = e;
      c != l && this.#m("data_break", {
        dataId: o,
        old_v: c,
        new_v: l
      });
    }
    i[s] = e, this.#N[o]?.(s, e);
  }
  // reload 再生成 Main に受け渡すため static
  static #r = {};
  getVal = (t, s) => {
    if (!t) throw "[変数参照] nameは必須です";
    const e = p.getValName(t);
    if (!e) throw "[変数参照] name(" + t + ")が変数名として異常です";
    const a = this.#s[e.scope];
    if (!a) throw "[変数参照] scopeが異常【" + e.scope + "】です";
    const i = e.name;
    let o = a[i];
    if (!(i in a)) {
      o = s;
      let c = "";
      const l = i.split("."), u = l.length;
      for (let f = 0; f < u; ++f, c += ".") {
        if (c += l[f], !(c in a)) continue;
        let h = JSON.parse(a[c]);
        if (Object.prototype.toString.call(h) !== "[object Object]") {
          if (f + 1 === u) {
            o = h;
            break;
          }
          continue;
        }
        let n = f;
        for (; ++n < u; ) {
          const g = l[n];
          if (!(g in h)) {
            o = s;
            break;
          }
          if (h = h[g], Object.prototype.toString.call(h) !== "[object Object]" || n + 1 === u) {
            o = h;
            break;
          }
        }
        o instanceof Object && (o = JSON.stringify(o));
        break;
      }
    }
    return o instanceof Function && (o = o()), e.at === "@str" ? o : this.#S(o);
  };
  #S(t) {
    const s = t;
    if (s === "true") return !0;
    if (s === "false") return !1;
    if (s === "null") return null;
    if (s !== "undefined")
      return this.#I.test(s) ? parseFloat(s) : t;
  }
  #I = /^-?[\d\.]+$/;
  // 変数のダンプ
  #B = () => {
    const t = { tmp: {}, sys: {}, save: {}, mp: {} };
    for (let s in t) {
      const e = this.#s[s], a = t[s];
      for (let [i, o] of Object.entries(e))
        a[i] = Object.prototype.toString.call(o) === "[object Function]" ? o() : o;
    }
    return console.info("🥟 [dump_val]", t), !1;
  };
  #l = !1;
  doRecLog() {
    return this.#l;
  }
  #f = !1;
  get tagCh_doWait() {
    return this.#f;
  }
  #u = !1;
  get tagCh_doWait_Kidoku() {
    return this.#u;
  }
  #k = 0;
  get tagCh_msecWait() {
    return this.#k;
  }
  #_ = 0;
  get tagCh_msecWait_Kidoku() {
    return this.#_;
  }
  #N = {
    // sys
    "sys:sn.tagCh.doWait": (t) => {
      this.#f = this.#g(t);
    },
    "sys:sn.tagCh.doWait_Kidoku": (t) => {
      this.#u = this.#g(t);
    },
    "sys:sn.tagCh.msecWait": (t) => {
      this.#k = this.#E(t);
    },
    "sys:sn.tagCh.msecWait_Kidoku": (t) => {
      this.#_ = this.#J(t);
    },
    "sys:sn.tagCh.canskip": (t) => this.#g(t),
    "sys:sn.auto.msecPageWait": (t) => this.#C(t),
    "sys:sn.auto.msecPageWait_Kidoku": (t) => this.#C(t),
    "sys:sn.auto.msecLineWait": (t) => this.#V(t),
    "sys:sn.auto.msecLineWait_Kidoku": (t) => this.#V(t),
    // save
    "save:sn.doRecLog": (t) => {
      this.#b(
        this.#l = this.#G(t)
      );
    },
    "save:sn.userFnTail": (t, s) => {
      if (s.includes("@")) throw "この変数では文字「@」は禁止です";
      this.cfg.userFnTail = s;
    },
    // tmp
    "tmp:flash.desktop.NativeApplication.nativeApplication.systemIdleMode": () => {
    }
  };
  defValTrg(t, s) {
    this.#N[t] = s;
  }
  #g = (t) => _(this.#a, t, !0);
  #E = (t) => r(this.#a, t, 10);
  #J = (t) => r(
    this.#a,
    t,
    this.cfg.oCfg.init.tagch_msecwait === void 0 ? 10 : this.cfg.oCfg.init.tagch_msecwait
  );
  #C = (t) => r(
    this.#a,
    t,
    this.cfg.oCfg.init.auto_msecpagewait === void 0 ? 3500 : this.cfg.oCfg.init.auto_msecpagewait
  );
  #V = (t) => r(this.#a, t, 500);
  #G(t) {
    return _(this.#i, t, !0);
  }
}
export {
  k as Variable
};
//# sourceMappingURL=Variable.js.map
