import { u as S, c as p, a as v, i as f, b, d as c, e as d } from "./web2.js";
import { c as C } from "./CallStack.js";
import { PropParser as w } from "./PropParser.js";
import { R as N } from "./Reading.js";
class _ {
  #t = {};
  clear() {
    this.#t = {};
  }
  static from(t) {
    const s = new _();
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
  constructor(t, s) {
    this.cfg = t, s.let = (e) => this.#o(e), s.let_abs = (e) => this.#P(e), s.let_char_at = (e) => this.#R(e), s.let_index_of = (e) => this.#L(e), s.let_length = (e) => this.#K(e), s.let_replace = (e) => this.#F(e), s.let_round = (e) => this.#M(e), s.let_search = (e) => this.#D(e), s.let_substr = (e) => this.#x(e), s.clearsysvar = () => this.#l(), s.clearvar = () => this.#E(), s.dump_val = () => this.#B(), s.copybookmark = (e) => this.#V(e), s.erasebookmark = (e) => this.#j(e), this.defTmp("const.sn.bookmark.json", () => {
      const e = [];
      for (const [i, o] of Object.entries(this.#s.mark)) {
        const n = { ...o.json };
        n.place = S(i), e.push(n);
      }
      return JSON.stringify(e);
    }), this.#l(!0), this.#i["const.sn.config.window.width"] = t.oCfg.window.width, this.#i["const.sn.config.window.height"] = t.oCfg.window.height, this.#i["const.sn.config.book.title"] = t.oCfg.book.title, this.#i["const.sn.config.book.version"] = t.oCfg.book.version;
  }
  #t = p();
  #i = v();
  #e = {
    sys: {},
    // clearsysvarを呼ぶので
    save: this.#t,
    tmp: this.#i,
    mp: {},
    mark: {}
  };
  #r;
  #s = {
    sys: {},
    // clearsysvarを呼ぶので
    mark: {},
    kidoku: {}
  };
  #n;
  #a = {};
  #d;
  async setSys(t) {
    this.#r = t, await t.initVal(this.#s, this.#i, (s) => {
      this.updateData(s), this.cfg.oCfg.debug.variable ? this.#W(t) : this.#h = () => t.flush(), this.#d = (i, o) => t.callHook(i, o), t.addHook((i, o) => this.#O[i]?.(i, o));
      const e = f(this.getVal("sys:sn.tagCh.msecWait", -1));
      (this.#i["const.sn.isFirstBoot"] || e === -1) && this.#l(!0), this.#g = !!this.getVal("sys:sn.tagCh.doWait"), this.#k = !!this.getVal("sys:sn.tagCh.doWait_Kidoku"), this.#_ = f(this.getVal("sys:sn.tagCh.msecWait")), this.#m = f(this.getVal("sys:sn.tagCh.msecWait_Kidoku")), this.#y();
    });
  }
  //MARK: SessionStorage で確認できるデバッグ機能
  #W(t) {
    sessionStorage.clear();
    const s = this.cfg.headNs;
    this.#h = () => {
      const e = b();
      for (const [h, r] of Object.entries(this.#n))
        r instanceof Function || (e[h] = r);
      sessionStorage[s + "sys"] = JSON.stringify(e);
      const i = p();
      for (const [h, r] of Object.entries(this.#t))
        i[h] = r;
      sessionStorage[s + "save"] = JSON.stringify(i);
      const o = v();
      for (const [h, r] of Object.entries(this.#i))
        o[h] = r instanceof Function ? r() : r;
      sessionStorage[s + "tmp"] = JSON.stringify(o);
      const n = C();
      for (const [h, r] of Object.entries(this.#e.mp))
        n[h] = r;
      sessionStorage[s + "mp"] = JSON.stringify(n);
      const a = {};
      for (const [h, r] of Object.entries(this.#s.mark))
        a[f(h)] = r instanceof Function ? r() : r;
      sessionStorage[s + "mark"] = JSON.stringify(a), sessionStorage[s + "kidoku"] = structuredClone(this.#s.kidoku), t.flush();
    };
  }
  #y() {
    N.playbackPage(
      String(this.getVal("sys:const.sn.aPageLog", "[]")),
      String(this.getVal("save:const.sn.styPaging", N.INI_STYPAGE))
    );
  }
  #O = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    auth: (t, s) => this.#S(s.hBreakpoint.aData),
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    var: (t, s) => this.#r.send2Dbg(s.ri, { v: this.#e[s.scope] ?? {} }),
    set_var: (t, s) => {
      try {
        this.#b(s.nm, s.val), this.#r.send2Dbg(s.ri, {});
      } catch {
      }
    },
    set_data_break: (t, s) => {
      this.#S(s.a), this.#r.send2Dbg(s.ri, {});
    },
    disconnect: (t) => {
      g.#c = {};
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #S(t) {
    g.#c = {};
    for (const s of t) g.#c[s.dataId] = 1;
  }
  //MARK: 外からのデータで保持データを更新
  //	初期化時やインポートなどで使用
  updateData(t) {
    this.#s = t, this.#n = this.#e.sys = this.#s.sys, this.#a = {};
    for (const [s, e] of Object.entries(this.#s.kidoku))
      this.#a[s] = _.from(e);
  }
  #h = () => {
  };
  flush() {
    this.#h();
  }
  // 先にこのメソッドへの参照を配ってしまうので、中身を入れ替える
  setDoRecProc(t) {
    this.#v = t;
  }
  #v = (t) => {
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  defTmp(t, s) {
    this.#i[t] = s;
  }
  cloneMp() {
    return { ...this.#e.mp };
  }
  setMp(t) {
    this.#e.mp = t;
  }
  setMark(t, s) {
    this.#s.mark[t] = s, this.flush();
  }
  getMark(t) {
    const s = this.#s.mark[t];
    if (!s) throw `place【${String(t)}】は存在しません`;
    return s;
  }
  cloneSave() {
    return { ...this.#e.save };
  }
  mark2save(t) {
    this.#t = this.#e.save = { ...t.hSave }, this.#u = this.#t["sn.doRecLog"];
  }
  // 既読系
  touchAreaKidoku(t) {
    const s = this.#a[t];
    return s || (this.#s.kidoku[t] = {}, this.#a[t] = new _());
  }
  getAreaKidoku(t) {
    const s = this.#a[t];
    if (!s) throw `hAreaKidoku${t}】は存在しません`;
    return s;
  }
  saveKidoku() {
    for (const [t, s] of Object.entries(this.#a))
      this.#s.kidoku[t] = s.val();
    this.flush();
  }
  //	// しおり
  // しおりの複写
  #V(t) {
    const s = c(t, "from", NaN), e = c(t, "to", NaN);
    if (s === e) return !1;
    const i = this.#s.mark[s];
    if (!i) throw `from:${String(s)} のセーブデータは存在しません`;
    return this.setMark(e, { ...i }), this.#r.copyBMFolder(s, e), !1;
  }
  // しおりの消去
  #j(t) {
    const s = c(t, "place", NaN);
    return delete this.#s.mark[s], this.flush(), this.#r.eraseBMFolder(s), !1;
  }
  //	//	変数操作
  // 変数代入・演算
  #o(t) {
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
          d(t, "text", !1);
          break;
        case "str":
          s = !1;
          break;
        default:
          throw "cast【" + t.cast + "】は未定義です";
      }
    return this.#b(t.name, t.text, s), !1;
  }
  // 絶対値
  #P(t) {
    const s = c(t, "text", 0);
    return t.text = String(s < 0 ? -s : s), this.#o(t), !1;
  }
  // 文字列から一字取りだし
  #R(t) {
    return t.text = (t.text ?? "").charAt(c(t, "pos", 0)), this.#o(t), !1;
  }
  // 文字列で検索
  #L(t) {
    const { val: s } = t;
    if (!s) throw "valは必須です";
    const e = c(t, "start", 0);
    return t.text = String((t.text ?? "").indexOf(s, e)), this.#o(t), !1;
  }
  // 文字列の長さ
  #K(t) {
    return t.text = String((t.text ?? "").length), this.#o(t), !1;
  }
  // 正規表現で置換
  #F(t) {
    if (!t.reg) throw "regは必須です";
    const { flags: s } = t, e = s ? new RegExp(t.reg, s) : new RegExp(t.reg);
    return t.text = (t.text ?? "").replace(e, String(t.val)), this.#o(t), !1;
  }
  // 四捨五入
  #M(t) {
    const s = c(t, "text", 0);
    return t.text = String(Math.round(s)), this.#o(t), !1;
  }
  // 正規表現で検索
  #D(t) {
    if (!t.reg) throw "regは必須です";
    const { flags: s } = t, e = s ? new RegExp(t.reg, s) : new RegExp(t.reg);
    return t.text = String((t.text ?? "").search(e)), this.#o(t), !1;
  }
  // 文字列から抜きだし
  #x(t) {
    const s = c(t, "pos", 0);
    return t.text = t.len !== "all" ? (t.text ?? "").slice(s, s + f(c(t, "len", 1))) : (t.text ?? "").slice(s), this.#o(t), !1;
  }
  //	// デバッグ・その他
  // システム変数の全消去
  #l(t = !1) {
    const s = this.#n = this.#e.sys = this.#s.sys = b();
    typeof process < "u" || (this.setVal_Nochk("sys", "const.sn.window.x", 0), this.setVal_Nochk("sys", "const.sn.window.y", 0)), this.setVal_Nochk("sys", "sn.tagCh.msecWait", this.cfg.oCfg.init.tagch_msecwait), this.setVal_Nochk("sys", "sn.tagCh.msecWait_Kidoku", this.cfg.oCfg.init.tagch_msecwait), this.setVal_Nochk("sys", "sn.auto.msecPageWait", c(s, "sn.auto.msecPageWait", this.cfg.oCfg.init.auto_msecpagewait)), this.setVal_Nochk("sys", "sn.auto.msecPageWait_Kidoku", c(s, "sn.auto.msecPageWait", this.cfg.oCfg.init.auto_msecpagewait));
    for (const i of Object.values(this.#a)) i.clear();
    return this.#e.mark = this.#s.mark = {}, t || this.#y(), this.flush(), !1;
  }
  // ゲーム変数の全消去
  #E() {
    const t = this.#t["const.sn.mesLayer"], s = this.#t["sn.doRecLog"], e = this.#t["const.sn.sLog"], i = this.#t["const.sn.styPaging"];
    return this.#t = this.#e.save = p(), this.setVal_Nochk("save", "const.sn.mesLayer", t), this.setVal_Nochk("save", "sn.doRecLog", s), this.setVal_Nochk("save", "const.sn.sLog", e), this.setVal_Nochk("save", "const.sn.styPaging", i), !1;
  }
  #b(t, s, e = !0) {
    if (!t) throw "[変数に値セット] nameは必須です";
    if (s === void 0) throw "[変数に値セット] textは必須です（空文字はOK）";
    const i = w.getValName(t);
    if (!i) throw `[変数参照] name(${t})が変数名として異常です`;
    const o = this.#e[i.scope];
    if (!o) throw `[変数に値セット] scopeが異常【${String(i.scope)}】です`;
    const n = i.name;
    if (n.startsWith("const.") && n in o)
      throw `[変数に値セット] 変数【${n}】は書き換え不可です`;
    this.setVal_Nochk(i.scope, n, s, e);
  }
  setVal_Nochk(t, s, e, i = !1) {
    const o = this.#e[t], n = i ? this.#f(e) : e, a = t + ":" + s;
    if (a in g.#c) {
      const h = o[s], r = n;
      h != r && this.#d("data_break", {
        dataId: a,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        old_v: h,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        new_v: r
      });
    }
    o[s] = n, this.#w[a]?.(s, n ?? "");
  }
  // reload 再生成 Main に受け渡すため static
  static #c = {};
  // readonly getVal_save = (arg_name: string, def?: number | string)=> {
  // 	if (! arg_name) throw '[変数参照] nameは必須です';
  getVal(t, s, e = !1) {
    if (!t) throw "[変数参照] nameは必須です";
    const i = w.getValName(t);
    if (!i) throw "[変数参照] name(" + t + ")が変数名として異常です";
    const o = this.#e[i.scope];
    if (!o) throw `[変数参照] scopeが異常【${String(i.scope)}】です`;
    const n = i.name;
    let a = o[n];
    if (!(n in o)) {
      if (a = s, e)
        return o[n] = s, i.at === "@str" ? a : this.#f(a);
      let h = "";
      const r = n.split("."), k = r.length;
      for (let u = 0; u < k; ++u, h += ".") {
        if (h += r[u], !(h in o)) continue;
        let l = JSON.parse(o[h]);
        if (Object.prototype.toString.call(l) !== "[object Object]") {
          if (u + 1 === k) {
            a = l;
            break;
          }
          continue;
        }
        let m = u;
        for (; ++m < k; ) {
          const y = r[m];
          if (!(y in l)) {
            a = s;
            break;
          }
          if (l = l[y], Object.prototype.toString.call(l) !== "[object Object]" || m + 1 === k) {
            a = l;
            break;
          }
        }
        a instanceof Object && (a = JSON.stringify(a));
        break;
      }
    }
    return a instanceof Function && (a = a()), i.at === "@str" ? a : this.#f(a);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #f(t) {
    const s = t;
    if (s === "true") return !0;
    if (s === "false") return !1;
    if (s === "null") return null;
    if (s !== "undefined")
      return this.#I.test(s) ? parseFloat(s) : t;
  }
  #I = /^-?[\d.]+$/;
  // 変数のダンプ
  #B() {
    const t = { tmp: {}, sys: {}, save: {}, mp: {} };
    for (const s in t) {
      const e = this.#e[s], i = t[s];
      for (const [o, n] of Object.entries(e))
        n instanceof Function || (i[o] = n);
    }
    return console.info("🥟 [dump_val]", t), !1;
  }
  #u = !1;
  doRecLog() {
    return this.#u;
  }
  #g = !1;
  get tagCh_doWait() {
    return this.#g;
  }
  #k = !1;
  get tagCh_doWait_Kidoku() {
    return this.#k;
  }
  #_ = 0;
  get tagCh_msecWait() {
    return this.#_;
  }
  #m = 0;
  get tagCh_msecWait_Kidoku() {
    return this.#m;
  }
  #w = {
    // sys
    "sys:sn.tagCh.doWait": (t) => {
      this.#g = this.#p(t);
    },
    "sys:sn.tagCh.doWait_Kidoku": (t) => {
      this.#k = this.#p(t);
    },
    "sys:sn.tagCh.msecWait": (t) => {
      this.#_ = this.#J(t);
    },
    "sys:sn.tagCh.msecWait_Kidoku": (t) => {
      this.#m = this.#$(t);
    },
    "sys:sn.tagCh.canskip": (t) => this.#p(t),
    "sys:sn.auto.msecPageWait": (t) => this.#N(t),
    "sys:sn.auto.msecPageWait_Kidoku": (t) => this.#N(t),
    "sys:sn.auto.msecLineWait": (t) => this.#C(t),
    "sys:sn.auto.msecLineWait_Kidoku": (t) => this.#C(t),
    // save
    "save:sn.doRecLog": (t) => {
      this.#v(
        this.#u = this.#H(t)
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
    this.#w[t] = s;
  }
  #p = (t) => d(this.#n, t, !0);
  #J = (t) => c(this.#n, t, 10);
  #$ = (t) => c(
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    this.#n,
    t,
    this.cfg.oCfg.init.tagch_msecwait ?? 10
  );
  #N = (t) => c(
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    this.#n,
    t,
    this.cfg.oCfg.init.auto_msecpagewait ?? 3500
  );
  #C = (t) => c(this.#n, t, 500);
  #H(t) {
    return d(this.#t, t, !0);
  }
}
export {
  g as Variable
};
//# sourceMappingURL=Variable.js.map
