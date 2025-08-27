import { a as P, T as ot, L as Y, B as Nt, f as q, h as j, i as ut, j as z, D as Z, k as Et, R as L, A as bt, l as I, n as V, b as g, E as _t, c as R, o as X, C as D, G as J, u as G, q as Rt, m as lt, r as Pt, s as St, d as st, t as wt, v as Tt, g as Ft, P as Ot, w as mt, x as It, F as Bt } from "./web2.js";
import { C as F, T as et, b as jt } from "./SndBuf.js";
import { a as O, T as Vt } from "./Reading.js";
import { R as yt, a as ht } from "./ScriptIterator.js";
class K {
  constructor(t, e, s, i, n, o, a, l) {
    this.cls = e, this.hArg = n, this.sys = o, this.val = a, this.ret = l;
    const c = o.hFactoryCls[e];
    if (!c) throw `属性 class【${e}】が不正です`;
    const d = c(), h = c();
    d.layname = h.layname = t;
    const m = n[":id_tag"] = `layer:${t} cls:${e} page:`;
    d.ctn.name = d.name = m + "A", h.ctn.name = h.name = m + "B", s.addChild(d.ctn), i.addChild(h.ctn), P(n, "visible", !0), P(n, "visible", !0), l.isWait = d.lay(n) || h.lay(n), this.#i = { fore: d, back: h };
    const f = `const.sn.lay.${t}`;
    a.setVal_Nochk("tmp", f, !0), a.defTmp(f + ".fore.alpha", () => this.#i.fore.alpha), a.defTmp(f + ".back.alpha", () => this.#i.back.alpha), a.defTmp(f + ".fore.height", () => this.#i.fore.height), a.defTmp(f + ".back.height", () => this.#i.back.height), a.defTmp(f + ".fore.visible", () => this.#i.fore.ctn.visible), a.defTmp(f + ".back.visible", () => this.#i.back.ctn.visible), a.defTmp(f + ".fore.width", () => this.#i.fore.width), a.defTmp(f + ".back.width", () => this.#i.back.width), a.defTmp(f + ".fore.x", () => this.#i.fore.x), a.defTmp(f + ".back.x", () => this.#i.back.x), a.defTmp(f + ".fore.y", () => this.#i.fore.y), a.defTmp(f + ".back.y", () => this.#i.back.y);
  }
  #i;
  destroy() {
    this.#i.fore.destroy(), this.#i.back.destroy();
  }
  lay = (t) => this.getPage(t).lay(t);
  getPage = (t) => K.argChk_page(t, "fore") !== "back" ? this.#i.fore : this.#i.back;
  static argChk_page(t, e) {
    const s = t.page ?? e;
    if (s === "fore" || s === "back") return t.page = s;
    throw Error("属性 page【" + s + "】が不正です");
  }
  get fore() {
    return this.#i.fore;
  }
  get back() {
    return this.#i.back;
  }
  transPage(t) {
    [this.#i.back, this.#i.fore] = [this.#i.fore, this.#i.back], this.#i.back.copy(this.#i.fore, t);
  }
}
class ct {
  //	static	readonly	#alzTagArg	= new AnalyzeTagArg;
  constructor(t, e = !1) {
    this.bg_col = t, this.isLay = e;
  }
  static init(t, e, s, i, n, o) {
  }
  static cvsResizeDesign() {
  }
  destroy() {
  }
  gethArg() {
    return this.hArg;
  }
  hArg = {};
  sethArg(t) {
    this.hArg = t;
  }
  setOther(t) {
  }
  adopt(t) {
  }
  static enterMode() {
  }
  static allHide() {
  }
  set visible(t) {
  }
  static leaveMode() {
  }
  cvsResize() {
  }
  make() {
  }
  static replaceToken(t) {
  }
}
class Dt extends ct {
  constructor(t, e) {
    super("#29e", !0);
  }
  setSp(t) {
  }
}
class _ {
  constructor(t = "", e, s = () => {
  }, i = () => {
  }) {
    this.csvFn = t, this.ctn = e, this.fncFirstComp = s, this.fncAllComp = i, t && (this.#m = e ? (n) => {
      e.addChild(n), this.#r.push(n);
    } : () => {
    }, this.ret = _.#s(
      t,
      (n) => this.fncFirstComp(n),
      // 差し替え考慮
      (n) => this.fncAllComp(n),
      // 差し替え考慮
      (n) => this.#m(n)
      // 差し替え考慮
    ));
  }
  static #i;
  static #e;
  static #n;
  static #o;
  static init(t, e, s, i, n) {
    _.#i = t, _.#e = e, _.#n = s, _.#o = i, s.arg.crypto && (_.#d = _.#f, _.#l = _.#B);
    const o = () => {
      const a = _.#h * _.#t;
      for (const l of Object.values(_.#g)) l.volume = a;
    };
    n.setNoticeChgVolume(
      (a) => {
        _.#h = a, o();
      },
      (a) => {
        _.#t = a, o();
      }
    );
  }
  static #t = 1;
  static #h = 1;
  static #p;
  static setEvtMng(t) {
    _.#p = t;
  }
  ret = !1;
  #m;
  #r = [];
  destroy() {
    this.fncFirstComp = () => {
    }, this.fncAllComp = () => {
    }, this.#m = (t) => t.destroy();
    for (const t of this.#r)
      _.stopVideo(t.name), t.parent?.removeChild(t), t.destroy();
    this.#r = [];
  }
  static destroy() {
    _.#y = {}, _.#c = {}, _.#g = {};
  }
  //static #ldrHFn: {[fn: string]: 1} = {};
  static #s(t, e, s, i) {
    if (!t) return !1;
    let n = !1;
    if (t.startsWith("data:")) {
      const h = () => {
        const m = I.from(t);
        i(m), e(m), s(n);
      };
      return t in ot ? h() : (n = !0, new Y().add(t, t).load(h)), n;
    }
    const o = [], a = new Y(), l = t.split(","), c = l.length;
    for (let h = 0; h < c; ++h) {
      const m = l[h];
      if (!m) throw "face属性に空要素が含まれます";
      const { dx: f, dy: r, blendmode: p, fn: u } = _.#y[m] || {
        fn: m,
        dx: 0,
        dy: 0,
        blendmode: Nt.NORMAL
      }, y = h === 0 ? e : ($) => {
        $.transform !== null && ($.x = f, $.y = r, $.blendMode = p);
      };
      if (o.push({ fn: u, fnc: y }), u in _.#c || u in ot || u in Y.shared.resources) continue;
      n = !0;
      const b = _.#i.searchPath(u, q.SP_GSM), N = this.#n.arg.crypto ? { xhrType: b.slice(-5) === ".json" ? j.XHR_RESPONSE_TYPE.TEXT : j.XHR_RESPONSE_TYPE.BUFFER } : {};
      a.add({ ...N, name: u, url: b });
    }
    const d = (h, m) => {
      for (const { fn: f, fnc: r } of o) {
        const p = _.#v(f, m);
        p.name = f, i(p), r(p);
      }
      s(n);
    };
    return n ? a.use(async (h, m) => {
      try {
        if (h.extension === "json") {
          const r = await this.#n.dec("json", h.data);
          _.#l(r, h, m);
          return;
        }
        const f = await this.#n.decAB(h.data);
        _.#d(f, h, m);
      } catch (f) {
        const r = `画像/動画ロード失敗です fn:${h.name} ${f}`;
        _.#p.isSkipping ? console.warn(r) : console.error("%c" + r, "color:#FF3300;");
      }
    }).load(d) : queueMicrotask(() => d(0, {})), n;
  }
  static #y = {};
  static #c = {};
  static #d = (t, { type: e, name: s, data: i }, n) => {
    switch (e) {
      case j.TYPE.VIDEO:
        const o = i;
        o.volume = _.#h, _.#g[s] = _.#x(o);
    }
    n();
  };
  static #u(t) {
    const e = /([^\d]+)\d+\.(\w+)/.exec(t[0] ?? "");
    if (!e) return [];
    const s = e[1].length, i = -e[2].length - 1;
    return t.sort((n, o) => ut(n.slice(s, i)) > ut(o.slice(s, i)) ? 1 : -1);
  }
  static async #f(t, e, s) {
    e.data = t, e.extension !== "bin" && s(), t instanceof HTMLImageElement ? (e.texture = await z.fromLoader(t, e.url, e.name), e.type = j.TYPE.IMAGE) : t instanceof HTMLVideoElement && (t.volume = _.#h, _.#g[e.name] = _.#x(t), e.type = j.TYPE.VIDEO), s();
  }
  static #x(t) {
    return _.#e.getVal("const.sn.needClick2Play") && (Z.trace_beforeNew(`[lay系] ${Z.strPos()}未クリック状態で動画を自動再生します。音声はミュートされます`, "W"), t.muted = !0), t.setAttribute("playsinline", ""), t;
  }
  static #l = (t, { type: e, spritesheet: s, name: i, data: n }, o) => {
    switch (e) {
      case j.TYPE.JSON:
        const a = s._frameKeys;
        _.#u(a), _.#c[i] = {
          aTex: a.map((l) => z.from(l)),
          meta: n.meta
        };
    }
    o();
  };
  static #B(t, e, s) {
    const { meta: i, frames: n } = e.data = JSON.parse(t);
    if (e.type = j.TYPE.JSON, !i?.image) {
      s();
      return;
    }
    const o = Et(i.image), a = _.#i.searchPath(o, q.SP_GSM);
    new Y().use((l, c) => {
      this.#n.decAB(l.data).then((d) => {
        l.data = d, d instanceof HTMLImageElement && (l.type = j.TYPE.IMAGE, URL.revokeObjectURL(d.src)), c();
      }).catch((d) => this.#o.errScript(`画像/動画ロード失敗です dec2res4Cripto fn:${l.name} ${d}`, !1));
    }).add({ name: o, url: a, xhrType: j.XHR_RESPONSE_TYPE.BUFFER }).load((l, c) => {
      for (const { data: d } of Object.values(l.resources)) {
        const { baseTexture: h } = z.from(d), m = Object.values(n);
        _.#c[e.name] = {
          aTex: m.map(({ frame: { x: f, y: r, w: p, h: u } }) => new z(
            h,
            new L(f, r, p, u)
          )),
          meta: i
        };
      }
      s();
    });
  }
  static #v(t, e) {
    const s = _.#c[t];
    if (s) {
      const o = new bt(s.aTex);
      return o.animationSpeed = s.meta.animationSpeed ?? 1, o.play(), o;
    }
    if (t in ot) return I.from(t);
    const i = _.#g[t];
    if (i) return I.from(i);
    const n = e[t];
    return n ? new I(n.texture) : new I();
  }
  static #g = {};
  static getHFn2VElm(t) {
    return _.#g[t];
  }
  static wv(t) {
    const { fn: e } = t;
    if (!e) throw "fnは必須です";
    const s = _.#g[e];
    if (!s || s.loop) return !1;
    if (_.#p.isSkipping || s.ended)
      return _.stopVideo(e), !1;
    const i = "wv fn:" + e, n = P(t, "stop", !0), o = () => {
      n && _.stopVideo(e);
    };
    return O.beginProc(i, o, !0, o), s.addEventListener("ended", () => O.notifyEndProc(i), { once: !0, passive: !0 }), !0;
  }
  static stopVideo(t) {
    const e = _.#g[t];
    e && (delete _.#g[t], e.pause(), e.currentTime = e.duration);
  }
  static add_face(t) {
    const { name: e } = t;
    if (!e) throw "nameは必須です";
    if (e in _.#y) throw "一つのname（" + e + "）に対して同じ画像を複数割り当てられません";
    const { fn: s = e } = t;
    return _.#y[e] = {
      fn: s,
      dx: g(t, "dx", 0),
      dy: g(t, "dy", 0),
      blendmode: V.getBlendmodeNum(t.blendmode || "")
    }, !1;
  }
  //	static	clearFace2Name(): void {SpritesMng.hFace = {}}
}
class W extends V {
  static #i = new _t();
  static #e;
  static init(t, e, s, i, n, o) {
    W.#e = s, _.init(e, o, i, t, n);
  }
  static destroy() {
    W.#i.clear(), _.destroy();
  }
  #n = new Dt(this.ctn, this);
  constructor() {
    super(), R.isDbg && (this.#o = (t) => this.#n.setSp(t), this.cvsResize = () => {
      super.cvsResize(), this.#n.cvsResize();
    });
  }
  #o = () => {
  };
  #t = "";
  #h = "";
  #p = "";
  lay = (t) => {
    const e = O.procID + `GrpLayer lay name:${this.name_}`, s = this.#m(t, (i) => {
      i && O.endProc(e);
    });
    return s && O.beginProc(e), s;
  };
  #m(t, e) {
    const { fn: s, face: i = "" } = t;
    if (this.#n.sethArg(t), !s)
      return super.lay(t), this.ctn.children.length > 0 && this.setPos(t), this.#h = "", this.#t = this.#p = i, e(!1), !1;
    const n = "fn" in t, o = "face" in t;
    return this.clearLay({ clear_filter: P(t, "clear_filter", !0) }), n && (this.#h = s), o && (this.#p = i), super.lay(t), t.dx = 0, t.dy = 0, this.#r.destroy(), this.#r = new _(
      this.#t = s + (i ? "," + i : ""),
      this.ctn,
      (a) => {
        ("width" in t || "height" in t) && (a.width = g(t, "width", 0), a.height = g(t, "height", 0)), this.#s = a.width, this.#y = a.height, V.setXY(a, t, this.ctn, !0), V.setBlendmode(this.ctn, t), this.#o(a);
      },
      (a) => e(a)
    ), this.#r.ret;
  }
  #r = new _();
  #s = 0;
  #y = 0;
  get width() {
    return this.#s;
  }
  get height() {
    return this.#y;
  }
  renderStart() {
    this.#d = new I(this.#c), this.#d.visible = !1, this.ctn.addChildAt(this.#d, 0), this.#d.position.set(-this.ctn.x, -this.ctn.y);
    let t = () => {
      const e = this.ctn.alpha;
      this.ctn.alpha = 1;
      for (const s of this.ctn.children) s.visible = !0;
      this.#d.visible = !1, W.#e.renderer.render(this.ctn, { renderTexture: this.#c }), this.ctn.alpha = e;
      for (const s of this.ctn.children) s.visible = !1;
    };
    if (!this.containMovement) {
      let e = t;
      t = () => {
        t = () => {
        }, e();
      };
    }
    this.#u = () => {
      t(), this.#d.visible = !0;
    }, W.#e.ticker.add(this.#u);
  }
  #c = X.create({
    width: R.stageW,
    height: R.stageH
  });
  #d = new I();
  #u = () => {
  };
  renderEnd() {
    W.#e.ticker.remove(this.#u), this.ctn.removeChild(this.#d);
    for (const t of this.ctn.children) t.visible = !0;
    this.#d.destroy(!0), this.#c = X.create({
      width: R.stageW,
      height: R.stageH
    });
  }
  setPos(t) {
    V.setXY(
      this.ctn.children[0] ?? this.ctn,
      t,
      this.ctn,
      !0
    );
  }
  // アニメ・動画を含むか
  get containMovement() {
    if (this.#t === "") return !1;
    const t = this.ctn.children;
    return this.#t.split(",").some(
      (e, s) => t[s] instanceof bt || _.getHFn2VElm(e)
    );
  }
  clearLay(t) {
    super.clearLay(t), this.#r.destroy(), this.#h = "", this.#p = "", this.#t = "";
  }
  record = () => ({
    ...super.record(),
    sBkFn: this.#h,
    sBkFace: this.#p
    //		idc_hArg	: this.#idc.gethArg(),
  });
  playback(t, e) {
    if (super.playback(t, e), t.sBkFn === "" && t.sBkFace === "") {
      this.#h = "", this.#p = "";
      return;
    }
    e.push(new Promise((s) => this.#m(
      { fn: t.sBkFn, face: t.sBkFace, left: t.x, top: t.y, alpha: t.alpha, blendmode: V.getNum2Blendmode(t.blendMode), rotation: t.rotation, scale_x: t.scale_x, scale_y: t.scale_y },
      (i) => {
        this.ctn.position.set(t.x, t.y), s();
      }
      // Layer.setXY()の後に再度移動
    )));
  }
  makeDesignCast(t) {
    this.ctn.visible && t(this.#n);
  }
  //makeDesignCastChildren(_gdc: IMakeDesignCast) {}
  cvsResize() {
    super.cvsResize();
  }
  showDesignCast() {
    this.#n.visible = !0;
  }
  //showDesignCastChildren() {}
  dump = () => super.dump() + `, "pic":"${this.#t}"`;
}
const Q = "、。，．）］｝〉」』】〕”〟ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ！？!?‼⁉・ーゝゞヽヾ々", it = "［（｛〈「『【〔“〝", nt = "─‥…", rt = Q, xt = new RegExp(`[${Q}]`), Ht = new RegExp(`[${it}]`), Wt = new RegExp(`[${nt}]`), zt = xt;
class Jt {
  #i = Q;
  #e = it;
  #n = nt;
  #o = rt;
  get 行頭禁則() {
    return this.#i;
  }
  get 行末禁則() {
    return this.#e;
  }
  get 分割禁止() {
    return this.#n;
  }
  get ぶら下げ() {
    return this.#o;
  }
  #t = xt;
  #h = Ht;
  #p = Wt;
  #m = zt;
  break_fixed = !1;
  break_fixed_left = 0;
  break_fixed_top = 0;
  bura = !1;
  lay(t) {
    t.kinsoku_sol && (this.#i = t.kinsoku_sol, this.#t = new RegExp(`[${this.#i}]`)), t.kinsoku_eol && (this.#e = t.kinsoku_eol, this.#r(), this.#h = new RegExp(`[${this.#e}]`)), t.kinsoku_dns && (this.#n = t.kinsoku_dns, this.#s(), this.#p = new RegExp(`[${this.#n}]`)), t.kinsoku_bura && (this.#o = t.kinsoku_bura, this.#r(), this.#s(), this.#m = new RegExp(`[${this.#o}]`)), "bura" in t && (this.bura = P(t, "bura", !1)), this.break_fixed = P(t, "break_fixed", this.break_fixed), this.break_fixed_left = g(t, "break_fixed_left", this.break_fixed_left), this.break_fixed_top = g(t, "break_fixed_top", this.break_fixed_top);
  }
  // 禁則の競合（ぶら下げ と 行末禁則 の両方に含まれる文字があってはならない）
  #r() {
    const t = this.#e.length, e = this.#o.length;
    if (t < e)
      for (let s = 0; s < t; ++s) {
        const i = this.#e[s];
        if (this.#o.includes(i)) throw `禁則の競合があります。文字 ${i} がぶら下げ と 行末禁則 の両方に含まれます`;
      }
    else
      for (let s = 0; s < e; ++s) {
        const i = this.#o[s];
        if (this.#e.includes(i)) throw `禁則の競合があります。文字 ${i} がぶら下げ と 行末禁則 の両方に含まれます`;
      }
  }
  // 禁則の競合（ぶら下げ と 分割禁止 の両方に含まれる文字があってはならない）
  #s() {
    const t = this.#n.length, e = this.#o.length;
    if (t < e)
      for (let s = 0; s < t; ++s) {
        const i = this.#n[s];
        if (this.#o.includes(i)) throw `禁則の競合があります。文字 ${i} がぶら下げ と 分割禁止 の両方に含まれます`;
      }
    else
      for (let s = 0; s < e; ++s) {
        const i = this.#o[s];
        if (this.#n.includes(i)) throw `禁則の競合があります。文字 ${i} がぶら下げ と 分割禁止 の両方に含まれます`;
      }
  }
  reNew(t) {
    t.#y(this.#i, this.#e, this.#n, this.#o), t.break_fixed = this.break_fixed, t.break_fixed_left = this.break_fixed_left, t.break_fixed_top = this.break_fixed_top, t.bura = this.bura;
  }
  #y(t, e, s, i) {
    this.#i != t && (this.#i = t, this.#t = new RegExp(`[${t}]`)), this.#e != e && (this.#e = e, this.#h = new RegExp(`[${e}]`)), this.#n != s && (this.#n = s, this.#p = new RegExp(`[${s}]`)), this.#o != i && (this.#o = i, this.#m = new RegExp(`[${i}]`));
  }
  record() {
    const t = {
      break_fixed: this.break_fixed,
      break_fixed_left: this.break_fixed_left,
      break_fixed_top: this.break_fixed_top,
      bura: this.bura
    };
    return this.#i === Q && (t.行頭禁則 = this.#i), this.#e === it && (t.行末禁則 = this.#e), this.#n === nt && (t.分割禁止 = this.#n), this.#o === rt && (t.ぶら下げ = this.#o), t;
  }
  playback(t) {
    t && (this.#y(
      t.行頭禁則 ?? Q,
      t.行末禁則 ?? it,
      t.分割禁止 ?? nt,
      t.ぶら下げ ?? rt
    ), this.break_fixed = t.break_fixed, this.break_fixed_left = t.break_fixed_left, this.break_fixed_top = t.break_fixed_top, this.bura = t.bura);
  }
  hyph(t, e, s, i, n) {
    let o, a = 0, l = 2, c = (d) => (c = () => !1, i === d ? (i > 0 && (t.innerHTML = n.replaceAll('class="sn_ch"', 'class="sn_ch sn_ch_in_default"')), !0) : d < 2);
    do {
      if (o = this.#d(t, e), a = o.length, c(a)) break;
      let d = -1 / 0;
      for (; l < a; ++l) {
        const { elm: h, rect: m, ch: f } = o[l];
        if (h.tagName === "RT") continue;
        const r = s ? m.y : m.x;
        if (d <= r || h.previousElementSibling?.tagName === "SPAN" && h.previousElementSibling?.innerHTML.includes("<br>") || h.parentElement?.previousElementSibling?.tagName === "SPAN" && h.parentElement?.previousElementSibling?.innerHTML.includes("<br>")) {
          d = r, this.break_fixed || (this.break_fixed_left = m.x, this.break_fixed_top = m.y);
          continue;
        }
        const p = this.#c(o, l), { elm: u, rect: y, ch: b } = o[p];
        if (!this.break_fixed) {
          this.break_fixed_left = y.x, this.break_fixed_top = y.y;
          const S = globalThis.getComputedStyle(u), B = parseFloat(S.fontSize);
          s ? this.break_fixed_top += B : this.break_fixed_left += B;
        }
        d = -1 / 0;
        const N = l, { cont: $, ins: w } = this.bura ? this.hyph_alg_bura(o, p, b, l) : this.hyph_alg(o, p, b, l, f);
        if (l = w, $) continue;
        const C = o[l].elm, E = C.parentElement, T = document.createElement("br");
        if (E.classList.contains("sn_tx")) E.insertBefore(T, C);
        else {
          const S = E.parentElement;
          S.classList.contains("sn_ch") ? S.parentElement.insertBefore(T, S) : S.insertBefore(T, E);
        }
        l += 2, l < N && (l = N), a = -1;
        break;
      }
    } while (a < 0);
    return [o, a];
  }
  // 一つ前の要素を探す（ルビ対応）
  #c(t, e) {
    const s = e - 1, { elm: i } = t[s];
    return i.tagName !== "RT" ? s - (i.style.textCombineUpright === "all" ? Array.from(i.textContent ?? "").length - 1 : 0) : s - Array.from(i.textContent ?? "").length;
  }
  #d(t, e) {
    const s = [];
    if (t.nodeType !== t.TEXT_NODE) return Array.from(t.childNodes).map((a) => this.#d(a, e)).flat();
    const i = t.ownerDocument.createRange();
    i.selectNodeContents(t);
    let n = 0;
    const o = i.endOffset;
    for (; n < o; ) {
      i.setStart(t, n), i.setEnd(t, ++n);
      const a = i.toString();
      s.push({
        ch: a,
        rect: e(i, a),
        elm: i.startContainer.parentElement
      });
    }
    return i.detach(), s;
  }
  /**
   * 抽象化した禁則処理アルゴリズム
   * @method hyph_alg
   * @param {IChRect[]} a - 文章の抽象化配列
   * @param {number} p_i - 処理要素の一つ前の添字
   * @param {string} p_ch - 処理要素の一つ前の文字
   * @param {number} i - 処理要素の添字
   * @param {string} ch - 処理要素の文字
   * @return {Object} result 戻り値
   * @return {boolean} result.cont - true: 呼び元で改行挿入せず continue
   * @return {number} result.ins - 手前に改行を挿入すべき要素の添字
   */
  hyph_alg(t, e, s, i, n) {
    if (!this.#h.test(s)) {
      if (this.#t.test(n))
        for (; (i = this.#c(t, i)) >= 0 && this.#t.test(t[i].ch); )
          ;
      else if (!(s === n && this.#p.test(s))) return { cont: !0, ins: i + 1 };
    }
    for (i = e; (i = this.#c(t, i)) >= 0 && this.#h.test(t[i].ch); )
      ;
    return { cont: !1, ins: i + 1 };
  }
  /**
   * 抽象化した禁則処理アルゴリズム
   * @method hyph_alg
   * @param {IChRect[]} a - 文章の抽象化配列
   * @param {number} p_i - 処理要素の一つ前の添字
   * @param {string} p_ch - 処理要素の一つ前の文字
   * @param {number} i - 処理要素の添字
   * @return {Object} result 戻り値
   * @return {boolean} result.cont - true: 呼び元で改行挿入せず continue
   * @return {number} result.ins - 手前に改行を挿入すべき要素の添字
   */
  hyph_alg_bura(t, e, s, i) {
    const n = this.#c(t, e), { ch: o } = t[n];
    if (this.#m.test(o) || this.#t.test(o)) {
      let l = e;
      (this.#m.test(s) || this.#t.test(s)) && ++l;
      const c = this.#c(t, l), { ch: d } = t[c], { ch: h } = t[l];
      if (d === h && this.#p.test(h)) return { cont: !1, ins: c };
      if (!this.#h.test(d)) return { cont: !1, ins: l };
      l = c;
      do
        if (!this.#h.test(t[l].ch)) break;
      while ((l = this.#c(t, l)) >= 0);
      return { cont: !1, ins: l + 1 };
    }
    const a = this.#c(t, n);
    if (i >= 3) {
      const { ch: l } = t[a];
      if (this.#p.test(o) && l === o)
        return { cont: !1, ins: a };
      if (this.#h.test(l)) {
        let c = a;
        for (; (c = this.#c(t, c)) >= 0 && this.#h.test(t[c].ch); )
          ;
        return { cont: !1, ins: c + 1 };
      }
    }
    return { cont: !1, ins: n };
  }
}
class k extends D {
  constructor(t, e, s) {
    super(), this.ctn = t, this.canFocus = e, this.sys = s, this.#t.classList.add("sn_tx"), this.#t.style.position = "absolute", k.#e.view.parentElement.appendChild(this.#t), this.addChild(this.#h), this.addChild(this.#p), this.#p.name = "grpDbgMasume", this.noticeCompTxt = s.isApp && k.#i.oCfg.debug.dumpHtm ? () => {
      O.notifyEndProc(yt);
      const i = this.#t.innerHTML;
      if (i === "") return;
      const { fn: n, ln: o } = k.#o.nowScrFnLn(), a = `dumpHtm ${t.name.slice(0, -7).replaceAll(":", "=")}(fn=${n} line=${o})`;
      s.outputFile(
        s.path_downloads + a + ".htm",
        `<!doctype html><html><head><meta charset=utf-8><title>${a}</title>
<h1>${a}</h1>${i.replaceAll(/ class="sn_ch"|animation-delay: \d+ms; ?| data-add="{&quot;ch_in_style&quot;:&quot;default&quot;, &quot;ch_out_style&quot;:&quot;default&quot;}"/g, "").replaceAll(' style=""', "").replaceAll(/(<\/?ruby>)/g, `
$1
`).replaceAll(/<(br|\/span)>/g, `<$1>
`)}`
      );
    } : () => O.notifyEndProc(yt);
  }
  static #i;
  static #e;
  static init(t, e) {
    k.#i = t, k.#e = e;
  }
  static #n;
  static #o;
  static setEvtMng(t, e) {
    k.#n = t, k.#o = e;
  }
  static destroy() {
    k.#E = /* @__PURE__ */ Object.create(null), k.#j = /* @__PURE__ */ Object.create(null), k.delBreak();
  }
  #t = document.createElement("span");
  // サンプリング元
  #h = new D();
  // サンプリング先
  #p = new J();
  static #m = {
    "background-color": 0,
    "border-bottom-width": 0,
    "border-left-width": 0,
    "border-right-width": 0,
    "border-top-width": 0,
    "margin-bottom": 0,
    "margin-left": 0,
    "margin-right": 0,
    "margin-top": 0
  };
  #r = new Jt();
  noticeCompTxt = () => {
  };
  //	readonly	#idc	:TxtLayDesignCast;
  //	readonly	#idcCh	= new TxtLayPadDesignCast(this);
  #s = {
    fontsize: 24,
    $width: 0,
    // レイヤサイズであり、背景色（画像）サイズ
    $height: 0,
    pad_left: 0,
    // paddingLeft（レイヤサイズの内側のスペーサー）
    pad_right: 0,
    // paddingRight
    pad_top: 0,
    // paddingTop
    pad_bottom: 0
    // paddingBottom
  };
  lay(t) {
    const e = this.#t.style;
    if ("style" in t)
      if (t.style) {
        const s = document.createElement("span");
        s.style.cssText = t.style;
        const i = s.style.length;
        for (let n = 0; n < i; ++n) {
          const o = s.style[n];
          if (o in k.#m) {
            Z.myTrace(`${o}は指定できません`, "W");
            continue;
          }
          e[o] = s.style[o];
        }
        !s.style.opacity && "alpha" in t && (e.opacity = String(this.ctn.alpha));
      } else this.#t.style.cssText = "";
    else "alpha" in t && (e.opacity = String(this.ctn.alpha));
    if ("width" in t && (e.width = (t.width ?? "0") + "px"), "height" in t && (e.height = (t.height ?? "0") + "px"), "pl" in t && (e.paddingLeft = (t.pl ?? "0") + "px"), "pr" in t && (e.paddingRight = (t.pr ?? "0") + "px"), "pt" in t && (e.paddingTop = (t.pt ?? "0") + "px"), "pb" in t && (e.paddingBottom = (t.pb ?? "0") + "px"), this.#r.lay(t), this.#c(), this.#d = this.ctn.position.x, e.transformOrigin = `${this.ctn.pivot.x}px ${this.ctn.pivot.y}px`, this.cvsResize(), e.display = this.ctn.visible ? "inline" : "none", ":redraw" in t && this.#g > 0) {
      const s = [
        this.#t.innerHTML.replaceAll(/(animation-delay: )\d+ms/g, "$10ms"),
        `<span class='sn_ch' data-add='{"ch_in_style":"default"}'>&emsp;</span>`
      ];
      this.#G(), this.goTxt(s, !0);
    }
  }
  #y = 0;
  // 「g」などで下が欠ける問題対策
  #c() {
    const t = this.#t.style, e = parseFloat(t.fontSize || "0");
    this.#s.fontsize = e, this.#s.pad_left = parseFloat(t.paddingLeft || "0"), this.#s.pad_right = parseFloat(t.paddingRight || "0"), this.#s.pad_top = parseFloat(t.paddingTop || "0"), this.#s.pad_bottom = parseFloat(t.paddingBottom || "0"), this.#s.$width = parseFloat(t.width || "0"), this.#s.$height = parseFloat(t.height || "0"), this.position.set(this.#s.pad_left, this.#s.pad_top), this.#u = t.writingMode === "vertical-rl", this.#f = 0, this.#x = 0;
    const s = t.lineHeight ?? "0";
    this.#y = this.#u ? 0 : (s.endsWith("px") ? parseFloat(s) : e * parseFloat(s) - e) / 2;
  }
  cvsResize() {
    const t = this.#t.style, e = this.sys.cvsScale;
    t.left = `${this.sys.ofsLeft4elm + this.#d * e}px`, t.top = `${this.sys.ofsTop4elm + this.ctn.position.y * e}px`, t.transform = `rotate(${this.ctn.angle}deg) scale(${this.ctn.scale.x * e}, ${this.ctn.scale.y * e})`;
  }
  #d = 0;
  #u = !1;
  get tategaki() {
    return this.#u;
  }
  #f = 0;
  #x = 0;
  get infTL() {
    return this.#s;
  }
  get getWidth() {
    return this.#s.$width;
  }
  get getHeight() {
    return this.#s.$height;
  }
  setMySize(t, e) {
    this.#s.$width = t, this.#s.$height = e, this.#t.style.width = this.#s.$width + "px", this.#t.style.height = this.#s.$height + "px";
  }
  #l(t, e = !0) {
    const s = {
      escape: (p) => p.replaceAll(/([.*+?^${}()|\[\]\/\\])/g, "\\$1"),
      mimeType: (p) => {
        const u = l(p).toLowerCase();
        return i()[u] || "";
      },
      dataAsUrl: m,
      isDataUrl: c,
      resolveUrl: d,
      getAndEncode: h,
      asArray: (p) => {
        const u = [], y = p.length;
        for (let b = 0; b < y; ++b) u.push(p[b]);
        return u;
      }
    };
    function i() {
      const p = "application/font-woff", u = "image/jpeg";
      return {
        woff: p,
        woff2: p,
        ttf: "application/font-truetype",
        eot: "application/vnd.ms-fontobject",
        png: "image/png",
        jpg: u,
        jpeg: u,
        gif: "image/gif",
        tiff: "image/tiff",
        svg: "image/svg+xml"
      };
    }
    const n = f(), o = r();
    function a(p) {
      return o.resolveAll().then((u) => {
        const y = document.createElement("style");
        return p.appendChild(y), y.appendChild(document.createTextNode(u)), p;
      });
    }
    function l(p) {
      return /\.([^\.\/]*?)$/g.exec(p)?.[1] ?? "";
    }
    function c(p) {
      return p.search(/^(data:)/) !== -1;
    }
    function d(p, u) {
      const y = document.implementation.createHTMLDocument(), b = y.createElement("base");
      y.head.appendChild(b);
      const N = y.createElement("a");
      return y.body.appendChild(N), b.href = u, N.href = p, N.href;
    }
    function h(p) {
      let u = 3e4;
      return new Promise(function(y) {
        const b = new XMLHttpRequest();
        b.onreadystatechange = N, b.ontimeout = $, b.responseType = "blob", b.timeout = u, b.open("GET", p, !0), b.send();
        function N() {
          if (b.readyState !== 4) return;
          if (b.status !== 200) {
            w("cannot fetch resource: " + p + ", status: " + b.status);
            return;
          }
          const C = new FileReader();
          C.onloadend = function() {
            const E = C.result.toString().split(/,/)[1];
            y(E);
          }, C.readAsDataURL(b.response);
        }
        function $() {
          w("timeout of " + u + "ms occured while fetching resource: " + p);
        }
        function w(C) {
          console.error(C), y("");
        }
      });
    }
    function m(p, u) {
      return "data:" + u + ";base64," + p;
    }
    function f() {
      const p = /url\(['"]?([^'"]+?)['"]?\)/g;
      return {
        inlineAll: N,
        shouldProcess: u
      };
      function u($) {
        return $.search(p) !== -1;
      }
      function y($) {
        const w = [];
        let C;
        for (; C = p.exec($); )
          w.push(C[1]);
        return w.filter(function(E) {
          return !s.isDataUrl(E);
        });
      }
      function b($, w, C, E) {
        return Promise.resolve(w).then((S) => C ? s.resolveUrl(S, C) : S).then(E || s.getAndEncode).then((S) => s.dataAsUrl(S, s.mimeType(w))).then((S) => $.replace(T(w), "$1" + S + "$3"));
        function T(S) {
          return new RegExp(`(url\\(['"]?)(` + s.escape(S) + `)(['"]?\\))`, "g");
        }
      }
      function N($, w, C) {
        if (E()) return Promise.resolve($);
        return Promise.resolve($).then(y).then((T) => {
          let S = Promise.resolve($);
          for (const B of T) S = S.then((at) => b(at, B, w, C));
          return S;
        });
        function E() {
          return !u($);
        }
      }
    }
    function r() {
      return {
        resolveAll: p,
        impl: { readAll: u }
      };
      function p() {
        return u().then((y) => Promise.allSettled(
          y.map((b) => b.resolve())
        )).then((y) => y.join(`
`));
      }
      function u() {
        return Promise.resolve(s.asArray(document.styleSheets)).then(b).then(y).then(($) => $.map(N));
        function y($) {
          return $.filter((w) => w.type === CSSRule.FONT_FACE_RULE).filter((w) => n.shouldProcess(w.style.getPropertyValue("src")));
        }
        function b($) {
          const w = [];
          for (const C of $)
            try {
              if (C.href) continue;
              s.asArray(C.cssRules || []).forEach(w.push.bind(w));
            } catch (E) {
              console.error("Error while reading CSS rules from " + C.href, String(E));
            }
          return w;
        }
        function N($) {
          return {
            resolve: function() {
              const C = ($.parentStyleSheet || {}).href;
              return n.inlineAll($.cssText, C);
            },
            src: function() {
              return $.style.getPropertyValue("src");
            }
          };
        }
      }
    }
    Promise.resolve(this.#t).then((p) => {
      const u = p.cloneNode(!0);
      return u.style.padding = "0px", u.style.paddingRight = this.#f + "px", u.style.paddingTop = this.#x + "px", u.style.left = "0px", u.style.top = "0px", u.style.width = this.#s.$width - this.#s.pad_left - this.#s.pad_right + "px", u.style.height = this.#s.$height - this.#s.pad_top - this.#s.pad_bottom + "px", this.#t.hidden = e, u;
    }).then(a).then((p) => {
      p.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
      const u = new Image();
      return u.src = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${this.#s.$width}px" height="${this.#s.$height}px"><foreignObject x="0" y="0" width="100%" height="100%">${new XMLSerializer().serializeToString(p).replaceAll("#", "%23").replaceAll(`
`, "%0A")}</foreignObject></svg>`, new Promise((y) => u.onload = () => y(u));
    }).then((p) => new Promise((u) => setTimeout(() => u(p), 100))).then((p) => {
      const u = document.createElement("canvas");
      u.width = this.#s.$width, u.height = this.#s.$height, u.getContext("2d").drawImage(p, 0, 0), t(z.from(u));
    }).catch((p) => Z.myTrace(`goTxt() = ${p}`));
  }
  #B = [];
  // FIFO実行バッファ
  goTxt(t, e) {
    const s = () => this.#N(t, e);
    this.#B.push(s) === 1 && s();
  }
  #v = [];
  #g = 0;
  static #a = "<span class='sn_ch sn_ch_last'>&emsp;</span>";
  #N(t, e) {
    k.#O.visible = !1;
    let s = this.#v.length, i = "";
    if (s === 0) {
      if (k.#i.oCfg.debug.masume && (R.debugLog && console.log(`🍌 masume ${this.name} v:${this.visible} l:${this.x} t:${this.y} a:${this.alpha} pl:${this.#s.pad_left} pr:${this.#s.pad_right} pt:${this.#s.pad_top} pb:${this.#s.pad_bottom} w:${this.#s.$width} h:${this.#s.$height}`), this.#p.clear().beginFill(3407616, 0.2).lineStyle(1, 3407616, 1).drawRect(-this.#s.pad_left, -this.#s.pad_top, this.#s.$width, this.#s.$height).endFill().beginFill(13311, 0.2).lineStyle(2, 13311, 1).drawRect(
        0,
        0,
        this.#s.$width - this.#s.pad_left - this.#s.pad_right,
        this.#s.$height - this.#s.pad_top - this.#s.pad_bottom
      ).endFill()), this.#t.innerHTML = [...t].join("").replaceAll(/[\n\t]/g, "") + k.#a, !this.#r.break_fixed) {
        const y = globalThis.getComputedStyle(this.#t), b = parseFloat(y.fontSize);
        this.#u ? (this.#r.break_fixed_left = (this.#s.$width - this.#s.pad_left - this.#s.pad_right - b * 1.5) * this.sys.cvsScale, this.#r.break_fixed_top = 0) : (this.#r.break_fixed_left = 0, this.#r.break_fixed_top = b / 2 * this.sys.cvsScale);
      }
    } else
      i = this.#t.innerHTML, --s, this.#t.getElementsByClassName("sn_ch_last").item(0)?.remove(), this.#t.querySelectorAll(":scope > br").forEach((y) => y.remove()), this.#t.insertAdjacentHTML(
        "beforeend",
        t.slice(this.#g).join("").replaceAll(/[\n\t]/g, "") + k.#a
        // 末尾改行削除挙動対策
      );
    this.#t.querySelectorAll(".sn_ch:has(> ruby)").forEach((y) => y.style.background = ""), this.#g = t.length;
    const n = this.sys.cvsScale, o = this.#t.getBoundingClientRect(), a = o.left + this.#s.pad_left, l = o.top + this.#s.pad_top;
    let c;
    if (n === 1) c = (y, b) => {
      const N = y.getBoundingClientRect();
      return new L(
        N.left - a,
        N.top - l,
        N.width,
        N.height + ("gjqy".includes(b) ? this.#y : 0)
      );
    };
    else {
      const y = this.sys.ofsPadLeft_Dom2PIXI + o.left * (1 - n), b = this.sys.ofsPadTop_Dom2PIXI + o.top * (1 - n);
      c = (N, $) => {
        const w = N.getBoundingClientRect();
        return new L(
          (w.left - y) / n - a,
          (w.top - b) / n - l,
          w.width / n,
          (w.height + ("gjqy".includes($) ? this.#y : 0)) / n
        );
      };
    }
    const [d, h] = this.#r.hyph(this.#t, c, this.#u, s, i);
    this.#v = d;
    const m = R.debugLog ? ({ ch: y }, { x: b, y: N, width: $, height: w }) => console.log(`🍌 masume ch:${y} x:${b} y:${N} w:${$} h:${w}`) : () => {
    }, f = k.#i.oCfg.debug.masume ? (y, b) => {
      m(y, b), this.#p.beginFill(6737151, 0.5).lineStyle(2, 16724736, 1).drawRect(b.x, b.y, b.width, b.height).endFill();
    } : () => {
    }, r = F.ease(this.#C);
    for (let y = s; y < h; ++y) {
      const b = this.#v[y], N = b.rect, $ = JSON.parse(b.elm.dataset.arg ?? '{"delay": 0}'), w = JSON.parse(b.elm.dataset.add ?? "{}"), C = k.#E[w.ch_in_style];
      if (f(b, N), b.elm.dataset.cmd === "grp") {
        const E = new D();
        this.#h.addChild(E), new _($.pic, E, (T) => {
          this.#W(E, $, w, N, r, C ?? {}), E.parent || E.removeChild(T);
        });
      }
      if (b.elm.dataset.lnk) {
        const E = b.elm.parentElement.closest("[data-arg]"), T = JSON.parse(E.dataset.arg ?? "{}");
        T.key = `lnk=[${y}] ` + this.name;
        const S = new I();
        this.#W(S, T, w, N, r, C ?? {});
        const B = T.style ?? "", at = B + (T.style_hover ?? ""), gt = B + (T.style_clicked ?? ""), M = T.r_style ?? "", kt = M + (T.r_style_hover ?? ""), vt = M + (T.r_style_clicked ?? ""), ft = Array.from(E.getElementsByTagName("rt"));
        for (const tt of ft) tt.dataset.st_r_bk = tt.style.cssText;
        const $t = E.style.cssText, A = (tt, Ct) => {
          E.style.cssText = $t + tt;
          for (const pt of ft) pt.style.cssText = pt.dataset.st_r_bk + Ct;
        };
        P(T, "enabled", !0) ? k.#n.button(
          T,
          S,
          () => A(B, M),
          () => this.canFocus() ? (A(at, kt), !0) : !1,
          () => A(gt, vt)
        ) : A(
          B + (T.style_disable ?? "color: gray;"),
          M + (T.r_style_disable ?? "color: gray;")
        ), this.#h.addChild(S);
      }
    }
    const p = Array.from(this.#t.getElementsByClassName("sn_ch_yet"));
    this.#k = () => {
      this.#k = () => !1;
      for (const b of p) b.className = "sn_ch";
      k.#O.position.set(
        this.#r.break_fixed_left,
        this.#r.break_fixed_top
      ), k.#O.visible = !0, this.noticeCompTxt();
      const y = this.#B.shift();
      return this.#B.length > 0 && y(), !0;
    };
    for (const y of p) y.className = y.className.replace("sn_ch_yet sn", "go");
    s > 0 && ++s;
    let u;
    for (let y = h - 2; y >= 0; --y) {
      const { elm: b } = this.#v[y];
      if (b.tagName === "SPAN") {
        u = b.parentElement?.tagName === "RUBY" ? b.parentElement.parentElement ?? b : b;
        break;
      }
    }
    if (!u || e || s === h) {
      this.#k();
      return;
    }
    u.addEventListener("animationend", () => this.#k(), { once: !0 });
  }
  #k = () => !1;
  #W(t, e, s, i, n, o) {
    t.alpha = 0, e.x && (i.x = e.x.startsWith("=") ? i.x + parseInt(e.x.slice(1)) : parseInt(e.x)), e.y && (i.y = e.y.startsWith("=") ? i.y + parseInt(e.y.slice(1)) : parseInt(e.y)), e.width && (i.width = parseInt(e.width)), e.height && (i.height = parseInt(e.height)), e.wait && (o.wait = parseInt(e.wait)), t.width = i.width, t.height = i.height, o.x ? t.position.set(
      o.x.startsWith("=") ? i.x + t.width * o.nx : o.nx,
      o.y.startsWith("=") ? i.y + t.height * o.ny : o.ny
    ) : t.position.set(i.x, i.y);
    const a = {
      sp: t,
      tw: new Vt(t).to({ alpha: 1, x: i.x, y: i.y, width: i.width, height: i.height, angle: 0 }, o.wait ?? 0).easing(n).delay((s.wait ?? 0) + (e.delay ?? 0)).onComplete(() => {
        a.tw = void 0;
      }).start()
    };
    this.#H.push(a);
  }
  #H = [];
  skipChIn() {
    let t = this.#k();
    for (const e of this.#H)
      e.tw && (e.tw.stop().end(), t = !0);
    return this.#H = [], t;
  }
  static #E = /* @__PURE__ */ Object.create(null);
  static #L = /[{\s\.,*\{]/;
  // https://regex101.com/r/APC91I/1
  static initChStyle() {
    k.#E = /* @__PURE__ */ Object.create(null), k.#j = /* @__PURE__ */ Object.create(null);
  }
  static getChInStyle(t) {
    return k.#E[t];
  }
  static ch_in_style(t) {
    const { name: e } = t;
    if (!e) throw "nameは必須です";
    if (k.#L.test(e)) throw `name【${e}】に使えない文字が含まれます`;
    if (e in k.#E) throw `name【${e}】はすでにあります`;
    const s = String(t.x ?? "=0"), i = String(t.y ?? "=0");
    return k.#E[e] = {
      wait: g(t, "wait", 500),
      // アニメ・FI時間
      alpha: g(t, "alpha", 0),
      x: s,
      // 初期x値
      y: i,
      // [tsy]と同様に絶対・相対指定可能
      // {x:500}			X位置を500に
      // {x:'=500'}		現在のX位置に+500加算した位置
      // {x:'=-500'}		現在のX位置に-500加算した位置
      // {x:'250,500'}	+250から＋500までの間でランダムな値をX位置に
      // {x:'=250,500'}	+250から＋500までの間でランダムな値を現在のX位置に加算
      nx: parseFloat(s.at(0) === "=" ? s.slice(1) : s),
      ny: parseFloat(i.at(0) === "=" ? i.slice(1) : i),
      scale_x: g(t, "scale_x", 1),
      scale_y: g(t, "scale_y", 1),
      rotate: g(t, "rotate", 0),
      join: P(t, "join", !0),
      // 文字を順番に出すか（true）同時か（false）
      ease: t.ease ?? "ease-out"
    };
  }
  static #j = /* @__PURE__ */ Object.create(null);
  static getChOutStyle(t) {
    return k.#j[t];
  }
  static ch_out_style(t) {
    const { name: e } = t;
    if (!e) throw "nameは必須です";
    if (k.#L.test(e)) throw `name【${e}】に使えない文字が含まれます`;
    if (e in k.#j) throw `name【${e}】はすでにあります`;
    const s = String(t.x ?? "=0"), i = String(t.y ?? "=0");
    return k.#j[e] = {
      wait: g(t, "wait", 500),
      // アニメ・FI時間
      alpha: g(t, "alpha", 0),
      x: s,
      // 初期x値
      y: i,
      // [tsy]と同様に絶対・相対指定可能
      // {x:500}			X位置を500に
      // {x:'=500'}		現在のX位置に+500加算した位置
      // {x:'=-500'}		現在のX位置に-500加算した位置
      // {x:'250,500'}	+250から＋500までの間でランダムな値をX位置に
      // {x:'=250,500'}	+250から＋500までの間でランダムな値を現在のX位置に加算
      nx: parseFloat(s.at(0) === "=" ? s.slice(1) : s),
      ny: parseFloat(i.at(0) === "=" ? i.slice(1) : i),
      scale_x: g(t, "scale_x", 1),
      scale_y: g(t, "scale_y", 1),
      rotate: g(t, "rotate", 0),
      join: P(t, "join", !1),
      // 文字を順番に出すか（true）同時か（false）
      ease: t.ease ?? "ease-out"
    };
  }
  static #O = new D();
  static #I = new _();
  dispBreak(t) {
    k.delBreak();
    const e = k.#O;
    e.visible = !1, this.addChild(e), k.#I.destroy(), k.#I = new _(t.pic, e, (s) => {
      e.parent ? (s.x = g(t, "x", 0), s.y = g(t, "y", 0), s.width = g(t, "width", this.#s.fontsize), s.height = g(t, "height", this.#s.fontsize)) : e.removeChild(s);
    });
  }
  static delBreak() {
    const t = k.#O;
    t.parent?.removeChild(t), k.#I.destroy();
  }
  #C = "Quadratic.Out";
  #b = "Quadratic.Out";
  #G() {
    this.#p.clear(), this.#v = [], this.#g = 0, this.#B = [], this.skipChIn();
    const t = this.#t.cloneNode(!0);
    t.textContent = "";
    const e = this.#t;
    e.parentElement.insertBefore(t, e);
    let s = 0;
    Array.from(e.getElementsByClassName("sn_ch")).forEach((n) => {
      const o = JSON.parse(
        n.dataset.add ?? // 通常文字
        n.children[0]?.getAttribute("data-add") ?? // ルビ
        n.children[0]?.children[0]?.getAttribute("data-add") ?? "{}"
        // 縦中横
      );
      if (!o.ch_out_style) return;
      const a = k.#j[o.ch_out_style];
      if (a) {
        if (a.wait === 0) {
          n.style.display = "none";
          return;
        }
        s += a.wait, a.join || (n.style.animationDelay = "0ms"), n.classList.add(`go_ch_out_${o.ch_out_style}`);
      }
    });
    const i = () => {
      e.parentElement.removeChild(e);
      for (const n of this.#h.removeChildren())
        n instanceof D && k.#n.unButton(n), n.destroy();
    };
    s === 0 ? (this.#t.textContent = "", i()) : e.lastElementChild?.addEventListener("animationend", i, { once: !0 }), this.#t = t;
  }
  reNew() {
    this.#G();
    const t = new k(this.ctn, () => this.canFocus(), this.sys);
    return t.#s = this.#s, t.#t.style.cssText = this.#t.style.cssText, t.#d = this.#d, t.name = this.name, t.#c(), t.#$ = this.#$, t.#C = this.#C, t.#b = this.#b, this.#r.reNew(t.#r), this.destroy(), t;
  }
  #$ = void 0;
  // 文字にかけるフィルター
  record() {
    return {
      infTL: this.#s,
      cssText: this.#t.style.cssText,
      left: this.#d,
      //		idc_hArg	: this.#idc.gethArg(),
      ch_filter: this.#$,
      fi_easing: this.#C,
      fo_easing: this.#b,
      hyph: this.#r.record()
    };
  }
  playback(t) {
    this.#s = t.infTL, this.position.set(this.#s.pad_left, this.#s.pad_top), this.#t.style.cssText = t.cssText, this.#d = t.left, this.#c(), this.#$ = t.ch_filter, this.#C = t.fi_easing, this.#b = t.fo_easing, this.#r.playback(t.hyph);
  }
  get cssText() {
    return this.#t.style.cssText;
  }
  set cssText(t) {
    this.#t.style.cssText = t;
  }
  #_ = void 0;
  snapshot(t, e) {
    this.#l((s) => {
      this.#_ = I.from(s), this.#u && (this.#_.x += R.stageW - (this.#d + this.#s.$width)), this.#_.y -= this.#x, this.#_.texture.frame = new L(
        0,
        0,
        Math.min(this.#_.width, this.#s.$width - this.#d),
        Math.min(this.#_.height, this.#s.$height)
      ), this.#h.addChild(this.#_), t.render(this.#_, { clear: !1 }), e();
    }, !1);
  }
  snapshot_end() {
    this.#_ && (this.#h.removeChild(this.#_), this.#_ = void 0);
  }
  makeDesignCast(t) {
  }
  showDesignCast() {
  }
  //	showDesignCast() {this.#idc.visible = true; this.#idcCh.visible = true}
  dump() {
    const t = [], e = this.#t.style, s = e.length;
    for (let i = 0; i < s; ++i) {
      const n = e[i];
      t.push(`"${n}":"${e[n].replaceAll(/(["\\])/g, "\\$1")}"`);
    }
    return `"txt":"${this.#t.textContent.replaceAll(/(["\\])/g, "\\$1")}", "style":{${t.join(",")}}`;
  }
  destroy() {
    k.delBreak(), this.#t.parentElement.removeChild(this.#t), this.removeChild(this.#h), this.removeChild(this.#p), super.destroy();
  }
}
class H extends D {
  constructor(t, e, s, i) {
    if (super(), this.hArg = t, this.evtMng = e, this.resolve = s, this.canFocus = i, this.#t = {
      type: "pic",
      enabled: P(t, "enabled", !0),
      x: this.x = G(t.left ?? 0),
      y: this.y = G(t.top ?? 0),
      rotation: this.angle = g(t, "rotation", this.angle),
      // flash : rotation is in degrees.
      // pixijs: rotation is in radians, angle is in degrees.
      pivot_x: this.pivot.x = g(t, "pivot_x", this.pivot.x),
      pivot_y: this.pivot.y = g(t, "pivot_y", this.pivot.y),
      scale_x: this.scale.x = g(t, "scale_x", this.scale.x),
      scale_y: this.scale.y = g(t, "scale_y", this.scale.y),
      alpha: 1,
      text: "",
      b_pic: "",
      width: 0,
      height: 0
    }, this.getBtnBounds = () => (this.#n.x = this.#t.x, this.#n.y = this.#t.y, this.#n), this.#t.enabled && e.button(t, this, () => this.normal(), () => this.#p(), () => this.#m()), t.pic) {
      this.#t.type = "pic", this.#o = new _(
        t.pic,
        this,
        (h) => {
          this.#r(h), this.#n.width = h.width * this.#t.scale_x, this.#n.height = h.height * this.#t.scale_y;
        },
        (h) => s
      );
      return;
    }
    if (!t.text) throw "textまたはpic属性は必須です";
    const n = g(t, "height", 30), o = new Rt({
      align: "center",
      dropShadow: !0,
      dropShadowAlpha: 0.7,
      dropShadowColor: "white",
      dropShadowBlur: 7,
      dropShadowDistance: 0,
      fill: this.#t.enabled ? "black" : "gray",
      fontFamily: H.fontFamily,
      fontSize: n,
      padding: 5
    });
    if (t.style) try {
      const h = JSON.parse(t.style);
      for (const [m, f] of Object.entries(h)) o[m] = f;
      this.#t = { ...this.#t, ...h };
    } catch (h) {
      throw h instanceof SyntaxError ? new Error(lt(t, "style", h.message)) : "fn:Button.ts style";
    }
    const a = new Pt(t.text ?? "", o);
    a.alpha = g(t, "alpha", a.alpha), a.width = g(t, "width", 100), a.height = t.height = n, this.setText = (h) => a.text = h, this.#t = {
      ...this.#t,
      type: "text",
      // dump用
      alpha: a.alpha,
      text: a.text,
      width: a.width,
      height: a.height
    };
    let l = !1;
    if (this.#t.width = this.width, this.#t.height = this.height, t.b_pic && (this.#t.b_pic = t.b_pic, this.#o = new _(
      t.b_pic,
      this,
      (h) => {
        this.#h(h, a), this.#t.width = this.width, this.#t.height = this.height, a.name = JSON.stringify(this.#t);
      },
      (h) => {
        V.setBlendmode(this, t), h && s();
      }
    ), l = this.#o.ret), a.name = JSON.stringify(this.#t), this.addChild(a), this.#n.width = a.width, this.#n.height = a.height, t.b_pic || V.setBlendmode(this, t), H.#i(this, a), !this.#t.enabled) {
      l || s();
      return;
    }
    const c = o.clone();
    if (t.style_hover) try {
      const h = JSON.parse(t.style_hover);
      for (const [m, f] of Object.entries(h)) c[m] = f;
    } catch (h) {
      throw h instanceof SyntaxError ? new Error(lt(t, "style_hover", h.message)) : "fn:Button.ts style_hover";
    }
    else c.fill = "white";
    const d = c.clone();
    if (t.style_clicked) try {
      const h = JSON.parse(t.style_clicked);
      for (const [m, f] of Object.entries(h)) d[m] = f;
    } catch (h) {
      throw h instanceof SyntaxError ? new Error(lt(t, "style_clicked", h.message)) : "fn:Button.ts style_clicked";
    }
    else d.dropShadow = !1;
    this.normal = () => a.style = o, this.#p = () => i() ? (a.style = c, !0) : !1, this.#m = () => a.style = d, l || s();
  }
  static fontFamily = "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif";
  static #i = (t, e) => {
  };
  static #e = (t, e, s, i) => {
  };
  static init(t) {
    t.oCfg.debug.masume && (H.#i = (e, s) => e.addChild(
      new J().beginFill(8926088, 0.2).lineStyle(1, 8926088, 1).drawRect(s.x, s.y, s.width, s.height).endFill()
    ), H.#e = (e, s, i, n) => e.addChild(
      new J().beginFill(8926088, 0.2).lineStyle(1, 8926088, 1).drawRect(s.x, s.y, i, n).endFill()
    ));
  }
  setText(t) {
  }
  getBtnBounds = () => this.#n;
  // 文字ボタンは背景画像を含まない位置指定なので、その当たり判定用
  #n = new L();
  #o = new _();
  //	#idc		: DesignCast;
  #t;
  destroy() {
    this.evtMng.unButton(this), this.#o.destroy(), super.destroy();
  }
  makeDesignCast(t) {
  }
  showDesignCast() {
  }
  //	showDesignCast() {this.#idc.visible = true}
  cvsResize() {
  }
  #h(t, e) {
    this.setChildIndex(t, 0), t.alpha = e.alpha, t.setTransform(
      e.x,
      e.y,
      1,
      1,
      e.rotation,
      0,
      0,
      (t.width - e.width) / 2,
      (t.height - e.height) / 2
    ), t.name = e.name;
  }
  normal = () => {
  };
  #p = () => !1;
  #m = () => {
  };
  #r(t) {
    this.#t.alpha = t.alpha = g(this.hArg, "alpha", t.alpha);
    const e = t.width / 3, s = this.#t.enabled ? e : t.width, i = t.height, n = t.texture.baseTexture, o = new z(n, new L(0, 0, e, i)), a = new z(n, new L(e, 0, e, i)), l = new z(n, new L(e * 2, 0, e, i)), c = () => t.texture = o;
    this.#t.enabled && c(), this.normal = c, this.#p = () => this.canFocus() ? (t.texture = l, !0) : !1, this.#m = () => t.texture = a, "width" in this.hArg ? (this.#t.width = G(this.hArg.width), this.scale.x *= this.#t.width / s) : this.#t.width = s, "height" in this.hArg ? (this.#t.height = G(this.hArg.height), this.scale.y *= this.#t.height / i) : this.#t.height = i, t.name = JSON.stringify(this.#t), H.#e(this, t, s, i);
  }
}
class x extends V {
  static #i;
  static #e;
  static #n;
  static #o;
  static init(t, e, s, i, n, o) {
    x.#i = t, k.init(t, o), x.#e = s, x.#o = i, x.#n = n, s.setDoRecProc(x.chgDoRec), e.autowc = (a) => x.#y(a), e.autowc({ enabled: !1, text: "", time: 0 }), e.ch_in_style = (a) => x.#t(a), e.ch_out_style = (a) => x.#h(a), k.initChStyle(), St(), st(
      t.matchPath(".+", q.FONT).flatMap((a) => Object.values(a).map((l) => `
@font-face {
	font-family: '${l}';
	src: url('${this.#i.searchPath(l, q.FONT)}');
}
`)).join("") + `
.sn_tx {
	pointer-events: none;
	user-select: none;
	-webkit-touch-callout: none;
	box-sizing: border-box;
}
.sn_ch {
	position: relative;
	display: inline-block;
}
`
      // 「sn_ch」と「sn_ch_in_〜」の中身が重複しているが、これは必須
    ), x.#t({
      name: "default",
      wait: 500,
      alpha: 0,
      x: "=0.3",
      y: "=0",
      scale_x: 1,
      scale_y: 1,
      rotate: 0,
      join: !0,
      ease: "ease-out"
    }), x.#h({
      name: "default",
      wait: 0,
      alpha: 0,
      x: "=0",
      y: "=0",
      scale_x: 1,
      scale_y: 1,
      rotate: 0,
      join: !1,
      ease: "ease-out"
    });
  }
  // 文字出現演出
  static #t(t) {
    const e = k.ch_in_style(t), s = e.x.startsWith("=") ? `${e.nx * 100}%` : `${e.nx}px`, i = e.y.startsWith("=") ? `${e.ny * 100}%` : `${e.ny}px`, { name: n } = t;
    return st(`
.sn_ch_in_${n} {
	position: relative;
	display: inline-block;
}
.go_ch_in_${n} {
	opacity: ${e.alpha};
	position: relative;
	display: inline-block;
	animation: sn_ch_in_${n} ${e.wait}ms ${e.ease} 0s both;
}
@keyframes sn_ch_in_${n} {
	from {transform: rotate(${e.rotate}deg) scale(${e.scale_x}, ${e.scale_y}) translate(${s}, ${i})}
	to {opacity: 1; transform: none;}
}
`), !1;
  }
  // 文字消去演出
  static #h(t) {
    const e = k.ch_out_style(t), s = e.x.startsWith("=") ? `${e.nx * 100}%` : `${e.nx}px`, i = e.y.startsWith("=") ? `${e.ny * 100}%` : `${e.ny}px`, { name: n } = t;
    return st(`
.go_ch_out_${n} {
	position: relative;
	display: inline-block;
	animation: go_ch_out_${n} ${e.wait}ms ${e.ease} 0s both;
}
@keyframes go_ch_out_${n} {
	to {
		opacity: ${e.alpha};
		transform: rotate(${e.rotate}deg) scale(${e.scale_x}, ${e.scale_y}) translate(${s}, ${i});
	}
`), !1;
  }
  static #p;
  static #m;
  static setEvtMng(t, e, s) {
    x.#p = t, x.#m = e, k.setEvtMng(t, s);
  }
  // 文字ごとのウェイト
  static #r = !1;
  static #s = {};
  static #y(t) {
    x.#r = P(t, "enabled", x.#r), x.#e.setVal_Nochk("save", "const.sn.autowc.enabled", x.#r);
    const { text: e } = t;
    if ("text" in t != "time" in t) throw "[autowc] textとtimeは同時指定必須です";
    if (x.#e.setVal_Nochk("save", "const.sn.autowc.text", e), !e)
      return x.#e.setVal_Nochk("save", "const.sn.autowc.time", ""), !1;
    const s = e.length;
    if (x.#r && s === 0) throw '[autowc] enabled === false かつ text === "" は許されません';
    const i = String(t.time).split(",");
    if (i.length !== s) throw "[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい";
    x.#s = {};
    for (let n = 0; n < s; ++n) x.#s[e[n]] = G(i[n]);
    return x.#e.setVal_Nochk("save", "const.sn.autowc.time", t.time), !1;
  }
  // バック
  #c = 0;
  #d = 0;
  #u = !1;
  #f = void 0;
  #x = "";
  // 背景画像無し（＝単色塗り）
  // 文字表示
  #l = new k(this.ctn, () => this.canFocus(), x.#m);
  #B = new ht();
  #v = document.createElement("span");
  // cssチェック・保存用
  static #g = {
    "text-align": 0,
    "text-align-last": 0,
    height: 0,
    width: 0,
    "padding-left": 0,
    "padding-right": 0,
    "padding-top": 0,
    "padding-bottom": 0
  };
  #a = new D();
  constructor() {
    super(), this.ctn.addChild(this.#l), this.#B.init(this.#X), this.ctn.addChild(this.#a), this.#a.name = "cntBtn", this.lay({ style: `width: ${R.stageW}px; height: ${R.stageH}px; font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif; color: white; font-size: 24px; line-height: 1.5; padding: 16px;`, in_style: "default", out_style: "default", back_clear: "true" });
  }
  destroy() {
    this.#f && (this.ctn.removeChild(this.#f).destroy(), this.#f = void 0), x.#o.recPagebreak(), this.#l.destroy();
  }
  static destroy() {
    x.#r = !1, x.#s = {}, x.#$ = (t) => t;
  }
  set name(t) {
    this.name_ = t, this.#l.name = t;
  }
  get name() {
    return this.name_;
  }
  // getは継承しないらしい
  cvsResize() {
    this.#l.cvsResize();
  }
  cvsResizeChildren() {
    for (const t of this.#a.children) t.cvsResize();
  }
  procSetX(t) {
    this.#l.lay({ x: t });
  }
  procSetY(t) {
    this.#l.lay({ y: t });
  }
  lay(t) {
    if (super.lay(t), V.setXY(this.ctn, t, this.ctn), t[":id_tag"] = this.name_.slice(0, -7), ht.setting(t), this.#O(t), this.#l.lay(t), "r_align" in t && (this.#P = t.r_align ?? ""), this.#_ = R.isSafari ? this.#l.tategaki ? (i, n) => `text-align: start; height: ${n}em; padding-top: ${i}; padding-bottom: ${i};` : (i, n) => `text-align: start; width: ${n}em; padding-left: ${i}; padding-right: ${i};` : this.#l.tategaki ? (i) => `text-align: justify; text-align-last: justify; padding-top: ${i}; padding-bottom: ${i};` : (i) => `text-align: justify; text-align-last: justify; padding-left: ${i}; padding-right: ${i};`, R.isFirefox && (this.#q = this.#A), "r_style" in t)
      if (t.r_style) {
        const i = document.createElement("span");
        i.style.cssText = t.r_style;
        const n = i.style.length, o = this.#v.style;
        for (let a = 0; a < n; ++a) {
          const l = i.style[a];
          if (l in x.#g) {
            Z.myTrace(`${l}は指定できません`, "W");
            continue;
          }
          const c = i.style[l];
          c && (o[l] = c);
        }
      } else this.#v.style.cssText = "";
    if ("alpha" in t) for (const i of this.#a.children) i.alpha = this.ctn.alpha;
    this.#N(t), this.#H(t);
    const e = O.procID + `TxtLayer lay name:${this.name_}`, s = this.#j(t, (i) => {
      i && O.endProc(e);
    });
    return s && O.beginProc(e), s;
  }
  #N(t) {
    const { in_style: e } = t;
    if (!e) return;
    const s = k.getChInStyle(e);
    if (!s) throw `存在しないin_style【${e}】です`;
    this.#k = e, this.#W = s.join;
  }
  #k = "";
  #W = !0;
  get width() {
    return this.#l.getWidth;
  }
  get height() {
    return this.#l.getHeight;
  }
  #H(t) {
    const { out_style: e } = t;
    if (!e) return;
    if (!k.getChOutStyle(e)) throw `存在しないout_style【${e}】です`;
    this.#E = e;
  }
  #E = "";
  #L = new _();
  #j(t, e) {
    if ("back_clear" in t)
      return P(t, "back_clear", !1) && (this.#c = 0, this.#d = 0, this.#u = !1, this.#x = ""), e(!1), !1;
    this.#d = g(t, "b_alpha", this.#d), this.#u = P(t, "b_alpha_isfixed", this.#u);
    const s = (this.#u ? 1 : Number(x.#e.getVal("sys:TextLayer.Back.Alpha"))) * this.#d;
    if (t.b_pic) {
      if (this.#x !== t.b_pic)
        return this.#x = t.b_pic, this.#f && (this.ctn.removeChild(this.#f), this.#f.destroy()), this.#L = new _(this.#x, this.ctn, (i) => {
          this.#f = i, i.name = "back(pic)", i.visible = s > 0, i.alpha = s, this.#l.setMySize(i.width, i.height), this.ctn.setChildIndex(i, 0), e(!0);
        }), this.#L.ret;
    } else "b_color" in t && (this.#c = wt(t, "b_color", 0), this.#f && (this.ctn.removeChild(this.#f), this.#f.destroy()), this.#x = "", this.ctn.addChildAt(
      (this.#f = new J()).beginFill(this.#c, s).lineStyle(void 0).drawRect(0, 0, this.#l.getWidth, this.#l.getHeight).endFill(),
      0
    ), this.#f.name = "back(color)");
    return this.#f && (this.#f.visible = s > 0, this.#f.alpha = s), e(!1), !1;
  }
  chgBackAlpha(t) {
    const e = this.#u ? this.#d : t * this.#d;
    this.#f instanceof J && (this.#f && (this.ctn.removeChild(this.#f), this.#f.destroy()), this.ctn.addChildAt(
      (this.#f = new J()).beginFill(this.#c, e).lineStyle(void 0).drawRect(0, 0, this.#l.getWidth, this.#l.getHeight).endFill(),
      0
    ), this.#f.name = "back(color)"), this.#f && (this.#f.visible = e > 0, this.#f.alpha = e);
  }
  #O(t) {
    "noffs" in t && (this.#b = t.noffs ?? "", this.#G = new RegExp(`[　${this.#b}]`)), "ffs" in t && (this.#I ??= "", this.#C = this.#I === "" ? () => "" : (e) => this.#G.test(e) ? "" : ` font-feature-settings: ${this.#I};`);
  }
  #I = "";
  #C = (t) => "";
  #b = "";
  #G = /[　]/;
  // Safariが全体に「font-feature-settings」した後、特定文字の「font-feature-settings: initial;」を受け付けてくれないのでわざわざ一つずつ指定
  static chgDoRec(t) {
    x.#$ = t ? (e) => e : (e) => `<span class='offrec'>${e}</span>`;
  }
  static #$ = (t) => t;
  isCur = !1;
  #_ = () => "";
  #q = (t, e, s, i = "") => {
    if (!s) return ` style='${i}'`;
    const n = t.length * 2;
    if (n - e.length < 0) return ` style='text-align: ${s}; ${i}'`;
    let o = "";
    switch (s) {
      case "justify":
        o = this.#_("0", n);
        break;
      case "121":
        o = this.#_(`calc(${(n - e.length) / (e.length * 2)}em)`, n);
        break;
      case "even":
        o = this.#_(`calc(${(n - e.length) / (e.length + 1)}em)`, n);
        break;
      case "1ruby":
        o = this.#_("1em", n);
        break;
      default:
        o = `text-align: ${s};`;
    }
    return ` style='${o} ${i}'`;
  };
  #P = "";
  #A(t, e, s, i = "") {
    if (!s) return ` style='${i}'`;
    const n = t.length * 2;
    if (n - e.length < 0) return ` style='text-align: ${s}; ${i}'`;
    let o = "";
    switch (s) {
      case "left":
        o = "ruby-align: start;";
        break;
      case "center":
        o = "ruby-align: center;";
        break;
      case "right":
        o = "ruby-align: start;";
        break;
      case "justify":
        o = "ruby-align: space-between;";
        break;
      case "121":
        o = "ruby-align: space-around;";
        break;
      case "even":
        const a = (n - e.length) / (e.length + 1);
        o = "ruby-align: space-between; " + (this.#l.tategaki ? `padding-top: ${a}em; padding-bottom: ${a}em;` : `padding-left: ${a}em; padding-right: ${a}em;`);
        break;
      case "1ruby":
        o = "ruby-align: space-between; " + (this.#l.tategaki ? "padding-top: 1em; padding-bottom: 1em;" : "padding-left: 1em; padding-right: 1em;");
        break;
      default:
        o = `text-align: ${s};`;
    }
    return ` style='${o} ${i}'`;
  }
  tagCh(t) {
    this.#B.putTxt(t);
  }
  #S = !1;
  get needGoTxt() {
    return this.#S;
  }
  #X = (t, e) => {
    x.#i.oCfg.debug.putCh && console.log(`🖊 文字表示 text:\`${t}\`(${t.charCodeAt(0).toString(16)}) ruby:\`${e}\` name:\`${this.name_}\``);
    const s = e.split("｜");
    let i = "";
    const [n, ...o] = s, a = o.join("｜");
    switch (s.length) {
      case 1:
        if (this.#S = !0, t === `
`) {
          this.#T ? (this.#T = !1, i = "<ruby>&emsp;<rt>&emsp;</rt></ruby><br/>") : i = "<br/>";
          break;
        }
        this.#T && (this.#T = !1, e === "" && (e = "&emsp;")), i = this.#Q(t, e, this.#P);
        break;
      default:
        switch (n) {
          // ルビ揃え指定と同時シリーズ
          case "start":
          // 初期値
          case "left":
          //（肩付き）先頭親文字から、ルビ間は密着
          case "center":
          //（中付き）センター合わせ、〃
          case "right":
          //（右／下揃え）末尾親文字から、〃
          case "justify":
          //（両端揃え）先頭から末尾親文字間に、ルビ間は均等にあける
          case "121":
          //（1-2-1(JIS)）ルビの前後を比率1、ルビ間を比率2であける
          case "even":
          //（均等アキ）ルビの前後、ルビ間も均等にあける
          case "1ruby":
            this.#T = !1, this.#S = !0, i = this.#Q(t, a, n);
            break;
          case "gotxt":
            this.#K(), this.#S ? (this.isCur && x.#o.recText(
              this.#R.join("").replace(/^<ruby>&emsp;<rt>&emsp;<\/rt><\/ruby>(<br\/>)+/, "").replaceAll(/style='(anim\S+ [^;]+;\s*)+/g, "style='").replaceAll(/( style=''| data-(add|arg|cmd)='[^']+'|\n+|\t+)/g, "").replaceAll(/class='sn_ch[^']+/g, "class='sn_ch").replaceAll("display: none;", "").replaceAll("class='offrec'", "style='display: none;'")
              // 囲んだ領域は履歴で非表示
            ), this.#l.goTxt(this.#R, this.#V === 0), this.#S = !1, this.#V = 0) : this.isCur && this.#l.noticeCompTxt();
            return;
          // breakではない
          case "add":
            {
              const l = JSON.parse(a), { style: c = "", wait: d = null } = l, { cl: h, sty: m } = this.#J(!0, d);
              this.#R.push(`<span${h} style='${m} display: inline; ${c}'>`), delete l.style, this.#Z(l);
            }
            return;
          // breakではない
          case "add_close":
            this.#R.push("</span>"), this.#K();
            return;
          // breakではない
          case "grp":
            this.#S = !0;
            {
              const l = JSON.parse(a);
              if (l.id ??= this.#R.length, l.id === "break") {
                this.#l.dispBreak(l);
                return;
              }
              this.#T = !1, l.delay = this.#V, l.r ??= "", l.style ??= "", l.r_style ??= "";
              const { cl: c, sty: d, lnk: h } = this.#J(!0, l.wait);
              i = `<span${c} style='${d} ${l.style}'><ruby><span data-cmd='grp' data-arg='${JSON.stringify(l)}'${h} style='${d} display: inline;'>&emsp;</span><rt${h}${this.#q(
                "　",
                l.r,
                this.#P,
                this.#v.style.cssText + (this.#w.at(-1)?.o.r_style ?? "") + l.r_style
              )}>${l.r}</rt></ruby></span>`;
            }
            break;
          case "tcy":
            this.#T = !1, this.#S = !0;
            {
              const { t: l, r: c = "", wait: d = null, style: h = "", r_style: m = "" } = JSON.parse(a);
              x.#e.doRecLog() && (this.#D += t + (e ? `《${e}》` : ""), this.#z += l);
              const f = R.isSafari ? c.replaceAll(/[A-Za-z0-9]/g, (y) => String.fromCharCode(y.charCodeAt(0) + 65248)) : c, { cl: r, sty: p, lnk: u } = this.#J(!0, d);
              i = `<span${r} style='${p}${this.#C(l)} ${h}'><ruby><span${u} style='${p} display: inline; text-combine-upright: all;'>${l}</span><rt${u}${this.#q(
                l,
                f,
                this.#P,
                this.#v.style.cssText + (this.#w.at(-1)?.o.r_style ?? "") + m
              )}>${f}</rt></ruby></span>`;
            }
            break;
          case "del":
            k.delBreak();
            return;
          // breakではない
          case "span":
            this.#S = !0, this.#M(JSON.parse(a));
            return;
          // breakではない
          case "link":
            this.#S = !0;
            {
              const l = JSON.parse(a);
              l[":link"] = " data-lnk='@'";
              const { cl: c, sty: d, curpos: h } = this.#J(!1, l.wait);
              this.#R.push(`<span${c} style='${d} display: inline; ${l.style ?? ""}' ${h} data-arg='${a}'>`), delete l.style, this.#M(l);
            }
            return;
          // breakではない
          case "endlink":
            this.#S = !0, this.#R.push("</span>"), this.#K();
            return;
          // breakではない
          default:
            this.#S = !0, i = this.#Q(t, e, this.#P);
        }
        break;
    }
    this.#R.push(x.#$(i));
  };
  #Q(t, e, s) {
    const i = t === " " ? "&nbsp;" : t === "　" ? "&emsp;" : t;
    x.#e.doRecLog() && (this.#D += i + (e ? `《${e}》` : ""), t !== " " && (this.#z += t));
    const { cl: n, sty: o, lnk: a } = this.#J(!0, null, t);
    return e ? `<span${n} style='${o} ${this.#C(t)}'><ruby>${// 文字個別に出現させるため以下にも ${cl} が必要
    Array.from(t).map((l, c) => `<span${n}${a} style='${c > 0 ? this.#J(!0, null, t).sty : o} display: inline;'>${l === " " ? "&nbsp;" : l === "　" ? "&emsp;" : l}</span>`).join("")}<rt${a}${this.#q(
      t,
      e,
      s,
      this.#v.style.cssText + (this.#w.at(-1)?.o.r_style ?? "")
    )}>${e}</rt></ruby></span>` : `<span${n} style='${o} ${this.#C(t)}'${a}>${i}</span>`;
  }
  #J(t, e, s = `
`) {
    const i = this.#W ? e ?? this.#w.at(0)?.o.wait ?? (x.#r ? x.#s[s.at(0) ?? ""] ?? 0 : U.msecChWait) : 0;
    x.#p.isSkipping ? this.#V = 0 : t && this.#W && (this.#V += Number(i));
    const n = `data-add='{"ch_in_style":"${this.#k}", "ch_out_style":"${this.#E}"}'`;
    return {
      cl: ` class='sn_ch sn_ch_yet sn_ch_in_${this.#k}'`,
      // TxtStage.goTxt()はこれ単位で文字出現させる
      sty: `animation-delay: ${this.#V}ms;${this.#w.at(-1)?.o.style ?? ""}`,
      // TxtStage.goTxt()はこれ単位で文字出現させる
      lnk: (this.#w.at(0)?.o[":link"] ?? "") + " " + n,
      curpos: n
    };
  }
  #V = 0;
  #T = !0;
  #R = [];
  #w = [];
  #Z(t) {
    this.#w.push({
      o: t,
      r_align: this.#P,
      ch_in_style: this.#k,
      ch_out_style: this.#E
    }), "r_align" in t && (this.#P = t.r_align), this.#N(t), this.#H(t);
  }
  #K() {
    const t = this.#w.pop();
    t && (this.#P = t.r_align, this.#N({ in_style: t.ch_in_style }), this.#H({ out_style: t.ch_out_style }));
  }
  #M(t) {
    const e = this.#w.at(-1);
    if (!e) {
      this.#Z(t);
      return;
    }
    e.o = { ...e.o, ...t }, !t.style && !t.r_style && (e.o.style = "", e.o.r_style = ""), "r_align" in t && (this.#P = t.r_align), this.#N(t), this.#H(t);
  }
  click = () => !this.ctn.interactiveChildren || !this.ctn.visible ? !1 : this.#l.skipChIn();
  clearText() {
    this.ctn.addChild(this.#l = this.#l.reNew()), this.#V = 0, this.#T = !0, this.#R = [], this.#D = "", this.#z = "", x.#o.recPagebreak();
  }
  #D = "";
  #z = "";
  get pageText() {
    return this.#D.replace("《&emsp;》", "");
  }
  get pagePlainText() {
    return this.#z;
  }
  get enabled() {
    return this.ctn.interactiveChildren;
  }
  set enabled(t) {
    this.ctn.interactiveChildren = t;
  }
  addButton = (t) => new Promise((e) => {
    t.key = `btn=[${this.#a.children.length}] ` + this.name_, t[":id_tag"] = t.key.slice(0, -7), P(t, "hint_tate", this.#l.tategaki);
    const s = new H(t, x.#p, () => e(), () => this.canFocus());
    s.name = JSON.stringify(t).replaceAll('"', "'"), this.#a.addChild(s);
  });
  canFocus() {
    return (this.ctn.interactiveChildren ?? !1) && this.ctn.visible && x.#n(this);
  }
  clearLay(t) {
    super.clearLay(t), this.clearText();
    for (const e of this.#a.removeChildren()) e.destroy();
  }
  record = () => ({
    ...super.record(),
    enabled: this.enabled,
    r_cssText: this.#v.style.cssText,
    r_align: this.#P,
    // バック
    b_do: this.#f === void 0 ? void 0 : this.#f instanceof I ? "Sprite" : "Graphics",
    b_pic: this.#x,
    b_color: this.#c,
    b_alpha: this.#d,
    b_alpha_isfixed: this.#u,
    ffs: this.#I,
    txs: this.#l.record(),
    strNoFFS: this.#b,
    btns: this.#a.children.map((t) => t.name)
  });
  playback(t, e) {
    super.playback(t, e), this.enabled = t.enabled, this.#v.style.cssText = t.r_cssText, this.#P = t.r_align, this.cvsResize(), this.#O(t), this.#l.playback(t.txs), this.#d = t.b_alpha, this.#u = t.b_alpha_isfixed, e = [
      e,
      new Promise((s) => {
        const i = t.b_do ? t.b_do === "Sprite" ? { b_pic: t.b_pic } : { b_color: t.b_color } : { b_pic: "" };
        i.b_alpha = t.b_alpha, i.b_alpha_isfixed = t.b_alpha_isfixed, this.#j(i, (n) => {
          n && s();
        }) || s();
      }),
      t.btns.map((s) => new Promise((i) => {
        this.addButton(JSON.parse(s.replaceAll("'", '"'))), i();
      }))
    ].flat();
  }
  get cssText() {
    return this.#l.cssText;
  }
  set cssText(t) {
    this.#l.cssText = t;
  }
  snapshot(t, e) {
    t.render(this.ctn, { clear: !1 }), this.#l.snapshot(t, e);
  }
  snapshot_end() {
    this.#l.snapshot_end();
  }
  makeDesignCast(t) {
    this.ctn.visible && this.#l.makeDesignCast(t);
  }
  makeDesignCastChildren(t) {
    if (this.ctn.visible)
      for (const e of this.#a.children) e.makeDesignCast(t);
  }
  showDesignCast() {
    this.#l.showDesignCast();
  }
  showDesignCastChildren() {
    for (const t of this.#a.children) t.showDesignCast();
  }
  dump() {
    return this.#X("", "gotxt｜"), super.dump() + `, "enabled":"${this.enabled}", ${this.#l.dump()}, "b_pic":"${this.#x}", "b_color":"${this.#c}", "b_alpha":${this.#d}, "b_alpha_isfixed":"${this.#u}", "width":${this.#l.getWidth}, "height":${this.#l.getHeight}, "pixi_obj":[${this.ctn.children.map((t) => `{"class":"${t instanceof I ? "Sprite" : t instanceof J ? "Graphics" : t instanceof D ? "Container" : "?"}", "name":"${t.name}", "alpha":${t.alpha}, "x":${t.x}, "y":${t.y}, "visible":"${t.visible}"}`).join(",")}], "button":[${this.#a.children.map((t) => t.children[0]?.name ?? "{}").join(",")}]`;
  }
}
class v {
  constructor(t, e, s) {
    this.appPixi = e, this.val = s, t.add_frame = (i) => this.#p(i), t.let_frame = (i) => this.#d(i), t.set_frame = (i) => this.#u(i), t.frame = (i) => this.#x(i), t.tsy_frame = (i) => this.#l(i);
  }
  static #i;
  static #e;
  static #n;
  static init(t, e, s) {
    v.#i = t, v.#e = e, v.#n = s;
  }
  #o;
  setEvtMng(t) {
    this.#o = t;
  }
  #t = /* @__PURE__ */ Object.create(null);
  destroy() {
    for (const t of Object.values(this.#t)) t.parentElement.removeChild(t);
    this.#t = /* @__PURE__ */ Object.create(null);
  }
  hideAllFrame() {
    for (const [t, { style: e }] of Object.entries(this.#t))
      this.#h[t] = e.display !== "none", e.display = "none";
  }
  #h = /* @__PURE__ */ Object.create(null);
  restoreAllFrame() {
    for (const [t, e] of Object.entries(this.#h)) {
      const s = this.#t[t];
      s && (s.style.display = e ? "inline" : "none");
    }
    this.#h = /* @__PURE__ */ Object.create(null);
  }
  //	HTMLフレーム
  // フレーム追加
  #p(t) {
    const { id: e, src: s, alpha: i = 1, scale_x: n = 1, scale_y: o = 1, rotate: a = 0 } = t;
    if (!e) throw "idは必須です";
    if (!s) throw "srcは必須です";
    const l = "const.sn.frm." + e;
    if (this.val.getVal(`tmp:${l}`)) throw `frame【${e}】はすでにあります`;
    const c = P(t, "visible", !0), d = t.b_color ? ` background-color: ${t.b_color};` : "", h = this.#r(t);
    v.#n.cvs.insertAdjacentHTML("beforebegin", `<iframe id="${e}" style="opacity: ${i}; ${d} position: absolute; left:${v.#e.ofsLeft4elm + h.x * v.#e.cvsScale}px; top: ${v.#e.ofsTop4elm + h.y * v.#e.cvsScale}px; z-index: 1; border: 0px; overflow: hidden; display: ${c ? "inline" : "none"}; transform: scale(${n}, ${o}) rotate(${a}deg);" width="${h.width * v.#e.cvsScale}" height="${h.height * v.#e.cvsScale}"></iframe>`);
    const m = O.procID + `add_frame id:${e}`;
    O.beginProc(m);
    const f = v.#i.searchPath(s, q.HTML), r = new Y().add({ name: s, url: f, xhrType: j.XHR_RESPONSE_TYPE.TEXT });
    return v.#e.arg.crypto && r.use(async (p, u) => {
      try {
        p.data = await v.#e.dec(p.extension, p.data);
      } catch (y) {
        v.#n.errScript(`[add_frame]Html ロード失敗です src:${p.name} ${y}`, !1);
      }
      u();
    }), r.load((p, u) => {
      const y = document.getElementById(e);
      this.#t[e] = y, this.#m[e] = !1;
      const b = f.lastIndexOf("/") + 1, N = f.slice(0, b), $ = N.slice(0, b);
      y.srcdoc = String(u[s]?.data).replace("sn_repRes();", "").replaceAll(
        /\s(?:src|href)=(["'])(\S+?)\1/g,
        // 【\s】が大事、data-src弾く
        (w, C, E) => E.startsWith("../") ? w.replace("../", $) : w.replace("./", "").replace(C, C + N)
      ), y.srcdoc.includes("true/*WEBP*/;") && (y.srcdoc = y.srcdoc.replaceAll(
        /data-src="(.+?\.)(?:jpe?g|png)/g,
        (w, C) => `data-src="${C}webp`
      )), y.onload = () => {
        O.endProc(m), this.val.setVal_Nochk("tmp", l, !0), this.val.setVal_Nochk("tmp", l + ".alpha", i), this.val.setVal_Nochk("tmp", l + ".x", h.x), this.val.setVal_Nochk("tmp", l + ".y", h.y), this.val.setVal_Nochk("tmp", l + ".scale_x", n), this.val.setVal_Nochk("tmp", l + ".scale_y", o), this.val.setVal_Nochk("tmp", l + ".rotate", a), this.val.setVal_Nochk("tmp", l + ".width", h.width), this.val.setVal_Nochk("tmp", l + ".height", h.height), this.val.setVal_Nochk("tmp", l + ".visible", c);
        const w = y.contentWindow;
        this.#o.resvFlameEvent(w), w.sn_repRes?.((C) => v.#s(C.dataset.src ?? "", C));
      };
    }), !0;
  }
  #m = {};
  getFrmDisabled(t) {
    return this.#m[t];
  }
  #r(t) {
    const e = { ...t }, s = v.#e.resolution;
    return new DOMRect(
      g(e, "x", 0) * s,
      g(e, "y", 0) * s,
      g(e, "width", R.stageW) * s,
      g(e, "height", R.stageH) * s
    );
  }
  static #s(t, e, s) {
    const i = this.#c[t];
    if (i) {
      e.src = i, s && (e.onload = () => s(e));
      return;
    }
    const n = this.#y[t];
    if (n) {
      n.push(e);
      return;
    }
    this.#y[t] = [e];
    const [o = "", a = ""] = t.split("?"), l = v.#i.searchPath(o, q.SP_GSM), c = new Y().add({ name: t, url: l, xhrType: j.XHR_RESPONSE_TYPE.BUFFER });
    v.#e.arg.crypto && l.endsWith(".bin") && c.use(async (d, h) => {
      try {
        const m = await v.#e.decAB(d.data);
        if (d.extension !== "bin") {
          h();
          return;
        }
        d.data = m, m instanceof HTMLImageElement && (d.type = j.TYPE.IMAGE);
      } catch (m) {
        v.#n.errScript(`FrameMng loadPic ロード失敗です fn:${d.name} ${m}`, !1);
      }
      h();
    }), c.load((d, h) => {
      for (const [m, { data: { src: f } }] of Object.entries(h)) {
        const r = this.#c[m] = f + (f.startsWith("blob:") || f.startsWith("data:") ? "" : a ? "?" + a : ""), p = this.#y[m];
        if (p) for (const u of p)
          u.src = r, s && (u.onload = () => s(u));
        delete this.#y[m];
      }
    });
  }
  static #y = {};
  static #c = {};
  cvsResize() {
    for (const [t, e] of Object.entries(this.#t)) {
      const s = "const.sn.frm." + t, i = Number(this.val.getVal(s + ".x")), n = Number(this.val.getVal(s + ".y")), o = Number(this.val.getVal(s + ".width")), a = Number(this.val.getVal(s + ".height"));
      e.style.left = `${v.#e.ofsLeft4elm + i * v.#e.cvsScale}px`, e.style.top = `${v.#e.ofsTop4elm + n * v.#e.cvsScale}px`, e.width = String(o * v.#e.cvsScale), e.height = String(a * v.#e.cvsScale);
    }
  }
  // フレーム変数を取得
  #d(t) {
    const { id: e, var_name: s } = t;
    if (!e) throw "idは必須です";
    const i = document.getElementById(e);
    if (!i) throw `id【${e}】はフレームではありません`;
    const n = "const.sn.frm." + e;
    if (!this.val.getVal(`tmp:${n}`)) throw `frame【${e}】が読み込まれていません`;
    if (!s) throw "var_nameは必須です";
    const o = i.contentWindow;
    if (!Object.hasOwn(o, s)) throw `frame【${e}】に変数/関数【${s}】がありません。変数は var付きにして下さい`;
    const a = o[s];
    return this.val.setVal_Nochk(
      "tmp",
      n + "." + s,
      P(t, "function", !1) ? a() : a
    ), !1;
  }
  // フレーム変数に設定
  #u(t) {
    const { id: e, var_name: s, text: i } = t;
    if (!e) throw "idは必須です";
    const n = document.getElementById(e);
    if (!n) throw `id【${e}】はフレームではありません`;
    const o = "const.sn.frm." + e;
    if (!this.val.getVal(`tmp:${o}`)) throw `frame【${e}】が読み込まれていません`;
    if (!s) throw "var_nameは必須です";
    if (!i) throw "textは必須です";
    this.val.setVal_Nochk("tmp", o + "." + s, i);
    const a = n.contentWindow;
    return a[s] = i, !1;
  }
  // フレームに設定
  #f = 1;
  #x(t) {
    const { id: e } = t;
    if (!e) throw "idは必須です";
    const s = document.getElementById(e);
    if (!s) throw `id【${e}】はフレームではありません`;
    const i = "const.sn.frm." + e;
    if (!this.val.getVal("tmp:" + i)) throw `frame【${e}】が読み込まれていません`;
    const n = s.style;
    if (P(t, "float", !1) ? n.zIndex = `${++this.#f}` : "index" in t ? n.zIndex = `${g(t, "index", 0)}` : t.dive && (n.zIndex = `-${++this.#f}`), "alpha" in t) {
      const a = n.opacity = String(t.alpha);
      this.val.setVal_Nochk("tmp", i + ".alpha", a);
    }
    const o = this.#r(t);
    if (("x" in t || "y" in t) && (n.left = `${v.#e.ofsLeft4elm + o.x * v.#e.cvsScale}px`, n.top = `${v.#e.ofsTop4elm + o.y * v.#e.cvsScale}px`, this.val.setVal_Nochk("tmp", i + ".x", o.x), this.val.setVal_Nochk("tmp", i + ".y", o.y)), "scale_x" in t || "scale_y" in t || "rotate" in t) {
      const a = g(t, "scale_x", 1), l = g(t, "scale_y", 1), c = g(t, "rotate", 0);
      n.transform = `scale(${a}, ${l}) rotate(${c}deg)`, this.val.setVal_Nochk("tmp", i + ".scale_x", a), this.val.setVal_Nochk("tmp", i + ".scale_y", l), this.val.setVal_Nochk("tmp", i + ".rotate", c);
    }
    if ("width" in t && (s.width = String(o.width * v.#e.cvsScale), this.val.setVal_Nochk("tmp", i + ".width", o.width)), "height" in t && (s.height = String(o.height * v.#e.cvsScale), this.val.setVal_Nochk("tmp", i + ".height", o.height)), "visible" in t) {
      const a = P(t, "visible", !0);
      n.display = a ? "inline" : "none", this.val.setVal_Nochk("tmp", i + ".visible", a);
    }
    if ("b_color" in t && (n.backgroundColor = t.b_color), "disabled" in t) {
      const a = this.#m[e] = P(t, "disabled", !0), l = s.contentDocument.body;
      for (const c of [
        ...Array.from(l.getElementsByTagName("input")),
        ...Array.from(l.getElementsByTagName("select"))
      ]) c.disabled = a;
    }
    return !1;
  }
  // フレームをトゥイーン開始
  #l(t) {
    const { id: e, alpha: s, x: i, y: n, scale_x: o, scale_y: a, rotate: l, width: c, height: d } = t;
    if (!e) throw "idは必須です";
    const h = document.getElementById(e);
    if (!h) throw `id【${e}】はフレームではありません`;
    const m = "const.sn.frm." + e;
    if (!this.val.getVal(`tmp:${m}`, 0)) throw `frame【${e}】が読み込まれていません`;
    const f = {};
    s && (f.a = h.style.opacity), (i || n || o || a || l) && (f.x = Number(this.val.getVal(`tmp:${m}.x`)), f.y = Number(this.val.getVal(`tmp:${m}.y`)), f.sx = Number(this.val.getVal(`tmp:${m}.scale_x`)), f.sy = Number(this.val.getVal(`tmp:${m}.scale_y`)), f.r = Number(this.val.getVal(`tmp:${m}.rotate`))), c && (f.w = this.val.getVal(`tmp:${m}.width`)), d && (f.h = this.val.getVal(`tmp:${m}.height`));
    const r = F.cnvTweenArg(t, f);
    let p = () => {
    };
    s && (g(r, "alpha", 0), p = () => {
      h.style.opacity = f.a, this.val.setVal_Nochk("tmp", "alpha", f.a);
    });
    let u = () => {
    };
    const y = this.#r(r);
    (i || n || o || a || l) && (y.x, y.y, g(r, "scale_x", 1), g(r, "scale_y", 1), g(r, "rotate", 0), u = () => {
      h.style.left = v.#e.ofsLeft4elm + f.x * v.#e.cvsScale + "px", h.style.top = v.#e.ofsTop4elm + f.y * v.#e.cvsScale + "px", h.style.transform = `scale(${f.sx}, ${f.sy}) rotate(${f.r}deg)`, this.val.setVal_Nochk("tmp", m + ".x", f.x), this.val.setVal_Nochk("tmp", m + ".y", f.y), this.val.setVal_Nochk("tmp", m + ".scale_x", f.sx), this.val.setVal_Nochk("tmp", m + ".scale_y", f.sy), this.val.setVal_Nochk("tmp", m + ".rotate", f.r);
    });
    let b = () => {
    };
    c && (y.width, b = () => {
      h.width = f.w * v.#e.cvsScale + "px", this.val.setVal_Nochk("tmp", m + ".width", f.w);
    });
    let N = () => {
    };
    return d && (y.height, N = () => {
      h.height = f.h * v.#e.cvsScale + "px", this.val.setVal_Nochk("tmp", m + ".height", f.h);
    }), this.appPixi.stage.interactive = !1, F.tween(`frm
${e}`, t, f, F.cnvTweenArg(t, f), () => {
      p(), u(), b(), N();
    }, () => this.appPixi.stage.interactive = !0, () => {
    }), !1;
  }
}
class U {
  //MARK: コンストラクタ
  constructor(t, e, s, i, n, o, a, l, c) {
    this.cfg = t, this.hTag = e, this.appPixi = s, this.val = i, this.main = n, this.scrItr = o, this.sys = a, this.sndMng = l, this.prpPrs = c;
    const d = () => {
      if (a.cvsResize(), this.cvsResizeDesign(), this.#r) for (const r of this.#N)
        this.#a[r].fore.cvsResizeChildren();
      else for (const r of this.#N)
        this.#a[r].fore.cvsResize();
      this.#o.cvsResize(), this.#c.cvsResize();
    };
    if (R.isMobile)
      this.#h.add(globalThis, "orientationchange", d, { passive: !0 });
    else {
      let r;
      this.#h.add(globalThis, "resize", () => {
        r || (r = setTimeout(() => {
          r = void 0, d();
        }, 1e3 / 60 * 10));
      }, { passive: !0 });
    }
    a.cvsResize(), x.init(t, e, i, this, (r) => this.#a[r.layname].fore === r, s), W.init(n, t, s, a, l, i), v.init(t, a, n), H.init(t), this.#o = new v(e, s, i), a.hFactoryCls.grp = () => new W(), a.hFactoryCls.txt = () => new x(), e.loadplugin = (r) => this.#v(r), e.snapshot = (r) => this.#f(r), this.#x = this.sys.isApp ? this.#l : this.#B, e.add_lay = (r) => this.#g(r), e.clear_lay = (r) => this.#L(r), e.finish_trans = () => F.finish_trans(), e.lay = (r) => this.#H(r), e.trans = (r) => this.#G(r), e.wt = (r) => F.wt(r), e.quake = (r) => this.#P(r), e.stop_quake = e.finish_trans, e.wq = (r) => e.wt(r), e.pause_tsy = (r) => F.pause_tsy(r), e.resume_tsy = (r) => F.resume_tsy(r), e.stop_tsy = (r) => F.stop_tsy(r), e.tsy = (r) => this.#A(r), e.wait_tsy = (r) => F.wait_tsy(r), e.add_filter = (r) => this.#S(r), e.clear_filter = (r) => this.#Q(r), e.enable_filter = (r) => this.#J(r), e.ch = (r) => this.#R(r), e.clear_text = (r) => this.#et(r), e.current = (r) => this.#K(r), e.endlink = (r) => this.#st(r), e.er = (r) => this.#it(r), e.graph = (r) => this.#nt(r), e.link = (r) => this.#at(r), e.r = (r) => this.#ot(r), e.rec_ch = (r) => this.#tt(r), e.rec_r = (r) => this.#lt(r), e.reset_rec = (r) => this.#rt(r), e.ruby2 = (r) => this.#ht(r), e.span = (r) => this.#ct(r), e.tcy = (r) => this.#dt(r), e.add_face = (r) => _.add_face(r), e.wv = (r) => _.wv(r), e.dump_lay = (r) => this.#ft(r), e.enable_event = (r) => this.#pt(r), e.button = (r) => this.#ut(r), t.existsBreakline && (this.breakLine = (r) => {
      delete r.visible, r.id = "break", r.pic = "breakline";
      const p = encodeURIComponent(JSON.stringify(r));
      this.#u("grp｜" + p);
    }), t.existsBreakpage && (this.breakPage = (r) => {
      delete r.visible, r.id = "break", r.pic = "breakpage";
      const p = encodeURIComponent(JSON.stringify(r));
      this.#u("grp｜" + p);
    }), this.#t = Tt(String(t.oCfg.init.bg_color));
    const h = new J();
    h.beginFill(this.#t).lineStyle(0, this.#t).drawRect(0, 0, R.stageW, R.stageH).endFill(), this.#e.addChild(h.clone()), this.#n.addChild(h), this.#n.visible = !1, this.#e.name = "page:A", this.#n.name = "page:B", this.#i = s.stage, this.#i.addChild(this.#n), this.#i.addChild(this.#e), this.#i.addChild(this.#I), this.#i.addChild(this.#b), this.#i.name = "stage";
    const m = (r, p) => {
      this.#d(Number(p));
    };
    m("", i.getVal("sys:TextLayer.Back.Alpha", 1)), i.defValTrg("sys:TextLayer.Back.Alpha", m);
    const f = (r, p) => H.fontFamily = p;
    f("", i.getVal("tmp:sn.button.fontFamily", H.fontFamily)), i.defValTrg("tmp:sn.button.fontFamily", f), i.defTmp("const.sn.log.json", () => JSON.stringify(
      (this.#F.text = this.#F.text?.replaceAll("</span><span class='sn_ch'>", "") ?? "") ? [...this.#Y, this.#F] : this.#Y
    )), i.defTmp("const.sn.last_page_text", () => this.currentTxtlayFore?.pageText ?? ""), i.defTmp("const.sn.last_page_plain_text", () => this.currentTxtlayFore?.pagePlainText ?? ""), R.isDbg && (ct.init(s, a, o, c, t, this.#a), this.cvsResizeDesign = () => ct.cvsResizeDesign(), a.addHook((r, p) => {
      this.#p[r]?.(r, p) && delete this.#p[r];
    }));
  }
  #i;
  #e = new D();
  #n = new D();
  #o;
  #t;
  #h = new _t();
  cvsResizeDesign() {
  }
  #p = {
    attach: (t) => !1,
    continue: (t) => !1,
    disconnect: (t) => !1,
    _enterDesign: (t) => {
      for (const e of this.#N) {
        const s = this.#a[e].fore;
        s.makeDesignCastChildren((i) => i.make()), s.makeDesignCast((i) => i.make());
      }
      return this.#s(this.#k), !1;
    },
    _replaceToken: (t, e) => !1,
    _selectNode: (t, e) => (this.#s(e.node), !1)
  };
  #m = "";
  #r = "";
  #s(t) {
    [this.#m = "", this.#r = ""] = t.split("/");
    const e = this.#a[this.#m];
    e && (this.#r ? e.fore.showDesignCastChildren() : e.fore.showDesignCast());
  }
  getFrmDisabled = (t) => this.#o.getFrmDisabled(t);
  #y = void 0;
  cover(t, e = 0) {
    this.#y && (this.#i.removeChild(this.#y), this.#y.destroy(), this.#y = void 0), t && this.#i.addChild(
      (this.#y = new J()).beginFill(e).lineStyle(0, e).drawRect(0, 0, R.stageW, R.stageH).endFill()
    );
  }
  #c;
  setEvtMng(t) {
    this.#c = t, this.#o.setEvtMng(t), _.setEvtMng(t), F.init(t, this.appPixi);
  }
  destroy() {
    for (const t of Object.values(this.#a)) t.destroy();
    this.#h.clear(), W.destroy(), ht.destroy(), k.destroy(), x.destroy(), this.#o.destroy(), F.destroy(), U.#T = 10;
  }
  // 既存の全文字レイヤの実際のバック不透明度、を再計算
  #d(t) {
    for (const { fore: e, back: s } of Object.values(this.#a))
      e instanceof x && (e.chgBackAlpha(t), s.chgBackAlpha(t));
  }
  #u = (t, e = this.currentTxtlayForeNeedErr, s = !0) => e.tagCh("｜&emsp;《" + t + "》");
  goTxt = () => {
  };
  get needGoTxt() {
    return this.currentTxtlayFore?.needGoTxt ?? !1;
  }
  breakLine = (t) => {
  };
  breakPage = (t) => {
  };
  clearBreak() {
    this.currentTxtlayFore && (this.clearBreak = () => this.#u("del｜break"), this.clearBreak());
  }
  clickTxtLay() {
    return this.currentTxtlayFore ? Object.values(this.#a).some((t) => t instanceof x && t.click()) : !1;
  }
  //	//	システム
  //MARK: スナップショット
  #f(t) {
    const e = Ft("-", "_", "", "_"), s = t.fn ? t.fn.startsWith(Ot) ? t.fn : `${mt + t.fn + e}.png` : `${mt}snapshot${e}.png`, i = this.cfg.searchPath(s), n = g(t, "width", R.stageW), o = g(t, "height", R.stageH);
    return this.#x(t, i, n, o, `snapshot dt:${e}`);
  }
  #x = () => !1;
  #l({ layer: t }, e, s, i, n) {
    if (this.#o.hideAllFrame(), O.beginProc(n), !t)
      return this.sys.capturePage(e, s, i, () => {
        this.#o.restoreAllFrame(), O.endProc(n);
      }), !0;
    const o = Object.values(this.#a).map(({ fore: { ctn: a } }) => {
      const l = [a, a.visible];
      return a.visible = !1, l;
    });
    for (const a of this.#$(t)) this.#a[a].fore.ctn.visible = !0;
    return this.sys.capturePage(e, s, i, () => {
      for (const [a, l] of o) a.visible = l;
      this.#o.restoreAllFrame(), O.endProc(n);
    }), !0;
  }
  #B(t, e, s, i, n) {
    O.beginProc(n);
    const o = wt(t, "b_color", this.#t), a = It({
      width: s,
      height: i,
      backgroundAlpha: o > 16777216 && e.endsWith(".png") ? 0 : 1,
      antialias: P(t, "smoothing", !1),
      preserveDrawingBuffer: !0,
      backgroundColor: o & 16777215,
      autoDensity: !0
    }), l = t.page !== "back" ? "fore" : "back", { layer: c } = t;
    return Promise.allSettled(
      this.#$(c).map((d) => new Promise(
        (h) => this.#a[d][l].snapshot(a, h)
      ))
    ).then(async () => {
      const d = X.create({ width: a.width, height: a.height });
      a.render(this.#i, { renderTexture: d }), await this.sys.savePic(
        e,
        a.plugins.extract.base64(d)
      ), d.destroy();
      for (const h of this.#$(c)) this.#a[h][l].snapshot_end();
      a.destroy(!0), O.endProc(n);
    }), !0;
  }
  //MARK: プラグインの読み込み
  #v(t) {
    const { fn: e } = t;
    if (!e) throw "fnは必須です";
    if (!e.endsWith(".css")) throw "サポートされない拡張子です";
    const s = P(t, "join", !0), i = O.procID + `loadplugin fn:${e}`;
    return s && O.beginProc(i), (async () => {
      const n = await fetch(e);
      if (!n.ok) throw new Error("Network response was not ok.");
      st(await n.text()), s && O.endProc(i);
    })(), s;
  }
  //	//	レイヤ共通
  //MARK: レイヤを追加する
  #g(t) {
    const { layer: e, class: s } = t;
    if (!e) throw "layerは必須です";
    if (e.includes(",")) throw "layer名に「,」は使えません";
    if (e in this.#a) throw `layer【${e}】はすでにあります`;
    if (!s) throw "clsは必須です";
    const i = { isWait: !1 };
    switch (this.#a[e] = new K(e, s, this.#e, this.#n, t, this.sys, this.val, i), this.#N.push(e), s) {
      case "txt":
        this.#k || (this.#z = () => {
        }, this.#w = this.#Z, this.#K = this.#M, this.hTag.current({ layer: e }), this.goTxt = () => {
          this.#c.isSkipping ? U.#T = 0 : this.setNormalChWait();
          for (const { fore: n } of Object.values(this.#a))
            n instanceof x && this.#u("gotxt｜", n, !1);
        }), this.val.setVal_Nochk(
          "save",
          "const.sn.layer." + (e ?? this.#k) + ".enabled",
          !0
        );
        break;
      case "grp":
        if (this.#W) break;
        this.#W = e;
        break;
    }
    return this.scrItr.recodeDesign(t), i.isWait;
  }
  #a = {};
  // しおりLoad時再読込
  #N = [];
  // 最適化用
  #k = "";
  #W = "";
  #H(t) {
    const e = this.#U(t), s = this.#a[e], i = s.back.ctn, n = s.fore.ctn;
    if (P(t, "float", !1))
      this.#n.setChildIndex(i, this.#n.children.length - 1), this.#e.setChildIndex(n, this.#e.children.length - 1), this.#E();
    else if (t.index)
      g(t, "index", 0) && (this.#n.setChildIndex(i, t.index), this.#e.setChildIndex(n, t.index), this.#E());
    else if (t.dive) {
      const { dive: o } = t;
      let a = 0;
      if (e === o) throw "[lay] 属性 layerとdiveが同じ【" + o + "】です";
      const l = this.#a[o];
      if (!l) throw "[lay] 属性 dive【" + o + "】が不正です。レイヤーがありません";
      const c = l.back, d = l.fore, h = this.#n.getChildIndex(c.ctn), m = this.#e.getChildIndex(d.ctn);
      a = h < m ? h : m, a > this.#n.getChildIndex(i) && --a, this.#e.setChildIndex(n, a), this.#n.setChildIndex(i, a), this.#E();
    }
    return t[":id_tag"] = s.fore.name.slice(0, -7), this.scrItr.recodeDesign(t), s.lay(t);
  }
  #E() {
    this.#N = this.#q();
  }
  //MARK: レイヤ設定の消去
  #L(t) {
    return this.#_(t, (e) => {
      const s = this.#a[this.#U({ layer: e })];
      if (t.page === "both") {
        s.fore.clearLay(t), s.back.clearLay(t);
        return;
      }
      s.getPage(t).clearLay(t);
    }), !1;
  }
  //===================================================
  //MARK: WebGL フラグメントシェーダー GLSL
  static #j = (
    /* glsl */
    `
precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform sampler2D rule;
uniform float vague;
uniform float tick;

uniform vec4 inputPixel;
uniform highp vec4 outputFrame;
vec2 getUV(vec2 coord) {
	return coord * inputPixel.xy / outputFrame.zw;
}

void main() {
	vec4 fg = texture2D(uSampler, vTextureCoord);
	vec4 ru = texture2D(rule, getUV(vTextureCoord));

	float v = ru.r - tick;
	gl_FragColor = abs(v) < vague
		? vec4(fg.rgb, 1) *fg.a *(0.5 +v /vague *0.5)
		: 0.0 <= v ? fg : vec4(0);
}`
  );
  /*
  	末尾が読みづらいが、以下のif文を消して三項演算子にしている。
  
  	if (abs(v) < vague) {
  		float f_a = fg.a *(0.5 +v /vague *0.5);
  		gl_FragColor.rgb = fg.rgb *f_a;
  		gl_FragColor.a = f_a;
  		return;
  	}
  	gl_FragColor = v >= 0.0 ? fg : vec4(0);
  
  		★GLSL : don't use "if"｜Nobu note.com/nobuhirosaijo/n/n606a3f5d8e89
  			> if文はあまり使わない方がいいらしい (処理負荷が高い)
  */
  #O = X.create({
    width: R.stageW,
    height: R.stageH
  });
  #I = new I(this.#O);
  #C = X.create({
    width: R.stageW,
    height: R.stageH
  });
  #b = new I(this.#C);
  //MARK: ページ裏表を交換
  #G(t) {
    F.finish_trans(), this.#c.hideHint();
    const { layer: e } = t, s = /* @__PURE__ */ new Set(), i = this.#$(e).map((w) => (s.add(w), this.#a[w].fore)), n = async () => {
      [this.#e, this.#n] = [this.#n, this.#e];
      const w = [];
      for (const [C, E] of Object.entries(this.#a)) {
        if (s.has(C)) {
          E.transPage(w);
          continue;
        }
        const { fore: { ctn: T }, back: { ctn: S } } = E, B = this.#e.getChildIndex(S);
        this.#e.removeChild(S), this.#n.removeChild(T), this.#e.addChildAt(T, B), this.#n.addChildAt(S, B);
      }
      await Promise.allSettled(w), this.#e.visible = !0, this.#n.visible = !1, this.#I.visible = !1, this.#b.visible = !1, O.notifyEndProc(jt + et);
    };
    if (this.#b.filters = [], this.#b.alpha = 1, g(t, "time", 0) === 0 || this.#c.isSkipping)
      return n(), !1;
    let a = [];
    const l = [];
    for (const [w, C] of Object.entries(this.#a)) {
      const E = s.has(w) ? C.back : C.fore;
      E.ctn.visible && a.push(E.ctn), l.push(E);
    }
    const { ticker: c, renderer: d } = this.appPixi;
    d.render(this.#n, { renderTexture: this.#O });
    let h = () => {
      for (const w of a) d.render(
        w,
        { renderTexture: this.#O, clear: !1 }
      );
    };
    if (!l.some((w) => w.containMovement)) {
      const w = h;
      h = () => {
        h = () => {
        }, w();
      };
    }
    const m = () => d.render(this.#e, { renderTexture: this.#C });
    m();
    let f = () => {
      this.#e.visible = !0, m(), this.#e.visible = !1;
    };
    if (!i.some((w) => w.containMovement)) {
      const w = f;
      f = () => {
        f = () => {
        }, w();
      };
    }
    const r = () => {
      h(), this.#I.visible = !0, f(), this.#b.visible = !0;
    }, { glsl: p, rule: u } = t, y = async () => {
      c.remove(r), await n();
    };
    if (!p && !u)
      return F.tween(et, t, this.#b, { alpha: 0 }, () => {
      }, y, () => {
      }), c.add(r), !1;
    const b = {
      rule: z.EMPTY,
      vague: g(t, "vague", 0.04),
      tick: 0
    };
    this.#b.filters = [new Bt(
      void 0,
      p ?? U.#j,
      b
    )];
    const N = F.tween(et, t, b, { tick: 1 }, () => {
    }, y, () => {
    }, !u);
    if (!u)
      return c.add(r), !1;
    const $ = new _(u, void 0, (w) => {
      b.rule = w.texture, w.destroy(), $.destroy(), N.start(), c.add(r);
    });
    return !1;
  }
  #$(t = "") {
    return t ? t.split(",") : this.#N;
  }
  #_(t, e) {
    const s = this.#$(t.layer);
    for (const i of s) {
      const n = this.#a[i];
      if (!n) throw "存在しないlayer【" + i + "】です";
      e(i, n);
    }
    return s;
  }
  #q(t = "") {
    return this.#$(t).sort((e, s) => {
      const i = this.#e.getChildIndex(this.#a[e].fore.ctn), n = this.#e.getChildIndex(this.#a[s].fore.ctn);
      return i < n ? -1 : i > n ? 1 : 0;
    });
  }
  setAllStyle2TxtLay(t) {
    for (const { fore: e } of Object.values(this.#a))
      e instanceof x && e.lay({ style: t });
  }
  //MARK: 画面を揺らす
  #P(t) {
    if (F.finish_trans(), g(t, "time", NaN) === 0) return !1;
    const e = this.#$(t.layer).map((d) => this.#a[d].fore.ctn), { renderer: s, ticker: i } = this.appPixi;
    this.#C.resize(R.stageW, R.stageH);
    const n = () => {
      this.#e.visible = !0;
      for (const d of e) s.render(
        d,
        { renderTexture: this.#C, clear: !1 }
      );
      this.#e.visible = !1;
    };
    this.#b.visible = !0, this.#b.alpha = 1;
    const o = G(g(t, "hmax", 10)), a = G(g(t, "vmax", 10)), l = o === 0 ? () => {
    } : () => this.#b.x = Math.round(Math.random() * o * 2) - o, c = a === 0 ? () => {
    } : () => this.#b.y = Math.round(Math.random() * a * 2) - a;
    return this.#b.filters = [], F.tween(et, t, this.#b, { x: 0, y: 0 }, () => {
      l(), c();
    }, () => {
      i.remove(n), this.#e.visible = !0, this.#b.visible = !1, this.#b.x = 0, this.#b.y = 0;
    }, () => {
    }), i.add(n), !1;
  }
  //MARK: トゥイーン開始
  #A(t) {
    const { layer: e, render: s, name: i } = t;
    if (!e) throw "layerは必須です";
    const n = this.#a[this.#U(t)], o = n.fore;
    let a = () => {
    };
    s && !this.#c.isSkipping && (o.renderStart(), a = () => o.renderEnd());
    const l = F.cnvTweenArg(t, o), c = P(t, "arrive", !1), d = P(t, "backlay", !1), h = n.back.ctn;
    return F.tween(i ?? e, t, o, F.cnvTweenArg(t, o), () => {
    }, a, () => {
      if (c && Object.assign(o, l), d) for (const m of Object.keys(F.hMemberCnt)) h[m] = o[m];
    }), "filter" in t && (o.ctn.filters = [V.bldFilters(t)], o.aFltHArg = [t]), !1;
  }
  //MARK: フィルター追加
  #S(t) {
    return F.finish_trans(), this.#_(t, (e) => {
      const s = this.#a[this.#U({ layer: e })];
      if (t.page === "both") {
        this.#X(s.fore, t), this.#X(s.back, t);
        return;
      }
      const i = s.getPage(t);
      this.#X(i, t);
    }), !1;
  }
  #X(t, e) {
    const s = t.ctn;
    s.filters ??= [], s.filters = [...s.filters, V.bldFilters(e)], t.aFltHArg.push(e);
  }
  //MARK: フィルター全削除
  #Q(t) {
    return this.#_(t, (e) => {
      const s = this.#a[this.#U({ layer: e })];
      if (t.page === "both") {
        const n = s.fore, o = s.back;
        n.ctn.filters = null, o.ctn.filters = null, n.aFltHArg = [], o.aFltHArg = [];
        return;
      }
      const i = s.getPage(t);
      i.ctn.filters = null, i.aFltHArg = [];
    }), !1;
  }
  //MARK: フィルター個別切替
  #J(t) {
    return this.#_(t, (e) => {
      const s = this.#a[this.#U({ layer: e })];
      if (t.page === "both") {
        this.#V(s.fore, t), this.#V(s.back, t);
        return;
      }
      const i = s.getPage(t);
      this.#V(i, t);
    }), !1;
  }
  #V(t, e) {
    const s = t.ctn;
    if (!s.filters) throw "フィルターがありません";
    const i = G(g(e, "index", 0)), n = s.filters.length;
    if (n <= i) throw `フィルターの個数（${n}）を越えています`;
    t.aFltHArg[i].enabled = s.filters[i].enabled = P(e, "enabled", !0);
  }
  //	// 文字・文字レイヤ
  static #T = 10;
  static get msecChWait() {
    return U.#T;
  }
  //MARK: 文字を追加する
  #R(t) {
    const { text: e } = t;
    if (!e) throw "textは必須です";
    const s = this.#w(t);
    delete t.text, this.setNormalChWait(), this.#c.isSkipping ? t.wait = 0 : "wait" in t && g(t, "wait", NaN);
    const i = encodeURIComponent(JSON.stringify(t));
    this.#u("add｜" + i, s);
    const n = P(t, "record", !0), o = this.val.doRecLog();
    return n || this.val.setVal_Nochk("save", "sn.doRecLog", n), s.tagCh(e.replaceAll("[r]", `
`)), this.val.setVal_Nochk("save", "sn.doRecLog", o), this.#u("add_close｜", s), !1;
  }
  #w = (t) => {
    throw this.#z(), 0;
  };
  #Z(t) {
    const e = this.#U(t, this.#k), i = this.#a[e].getPage(t);
    if (!(i instanceof x)) throw e + "はTxtLayerではありません";
    return i;
  }
  setNormalChWait() {
    U.#T = this.scrItr.normalWait;
  }
  //MARK: 操作対象のメッセージレイヤの指定
  #K = (t) => {
    throw this.#z(), 0;
  };
  #M(t) {
    const { layer: e } = t;
    if (!e) throw "[current] layerは必須です";
    const s = this.#a[e];
    if (!s || !(s.getPage(t) instanceof x)) throw `${e}はTxtLayerではありません`;
    this.#D = s, this.recPagebreak(), this.#k = e, this.val.setVal_Nochk("save", "const.sn.mesLayer", e);
    for (const [i, { fore: n, back: o }] of Object.entries(this.#a))
      n instanceof x && (n.isCur = o.isCur = i === e);
    return !1;
  }
  get currentTxtlayForeNeedErr() {
    return this.#z(), this.currentTxtlayFore;
  }
  get currentTxtlayFore() {
    return this.#D ? this.#D.fore : null;
  }
  #D;
  // カレントテキストレイヤ
  #z = () => {
    throw "文字レイヤーがありません。文字表示や操作する前に、[add_lay layer=（レイヤ名） class=txt]で文字レイヤを追加して下さい";
  };
  #U(t, e = "") {
    const s = t.layer ?? e;
    if (s.includes(",")) throw "layer名に「,」は使えません";
    if (!(s in this.#a)) throw "属性 layer【" + s + "】が不正です。レイヤーがありません";
    return t.layer = s;
  }
  #F = { text: "" };
  #Y = [];
  recText(t) {
    this.#F = { text: t }, this.val.setVal_Nochk(
      "save",
      "const.sn.sLog",
      String(this.val.getVal("const.sn.log.json"))
      // これを起動したい
    );
  }
  recPagebreak() {
    this.#F.text && (this.#F.text = this.#F.text.replaceAll("</span><span class='sn_ch'>", ""), this.#Y.push(this.#F) > this.cfg.oCfg.log.max_len && (this.#Y = this.#Y.slice(-this.cfg.oCfg.log.max_len)), this.#F = { text: "" });
  }
  //MARK: 文字消去
  #et(t) {
    const e = this.#w(t);
    return t.layer === this.#k && t.page === "fore" && this.recPagebreak(), e.clearText(), !1;
  }
  //MARK: ハイパーリンクの終了
  #st(t) {
    return this.#u("endlink｜", this.#w(t)), !1;
  }
  //MARK: ページ両面の文字消去
  #it(t) {
    return P(t, "rec_page_break", !0) && this.recPagebreak(), this.#D && (this.#D.fore.clearLay(t), this.#D.back.clearLay(t)), !1;
  }
  //MARK: インライン画像表示
  #nt(t) {
    if (!t.pic) throw "[graph] picは必須です";
    const e = encodeURIComponent(JSON.stringify(t));
    return this.#u("grp｜" + e, this.#w(t)), !1;
  }
  //MARK: ハイパーリンク
  #at(t) {
    if (!t.fn && !t.label && !t.url) throw "fn,label,url いずれかは必須です";
    t.fn ??= this.scrItr.scriptFn, t.style ??= "background-color: rgba(255,0,0,0.5);", t.style_hover ??= "background-color: rgba(255,0,0,0.9);", t.style_clicked ??= t.style;
    const e = encodeURIComponent(JSON.stringify(t));
    return this.#u("link｜" + e, this.#w(t)), !1;
  }
  //MARK: 改行
  #ot(t) {
    return t.text = `
`, this.#R(t);
  }
  //MARK: 履歴改行
  #lt(t) {
    return this.#tt({ ...t, text: "[r]" });
  }
  //MARK: 履歴書き込み
  #tt(t) {
    return this.#F = { ...t, text: this.#F.text }, t.text ? (t.record = !0, t.style ??= "", t.style += "display: none;", t.wait = 0, this.#R(t)) : !1;
  }
  //MARK: 履歴リセット
  #rt(t) {
    return this.#Y = [], this.#F = { text: t.text ?? "" }, this.val.setVal_Nochk(
      "save",
      "const.sn.sLog",
      t.text ? `[{text:"${t.text}"}]` : "[]"
    ), !1;
  }
  //MARK: 文字列と複数ルビの追加
  #ht(t) {
    const { t: e, r: s } = t;
    if (!e) throw "[ruby2] tは必須です";
    if (!s) throw "[ruby2] rは必須です";
    return t.text = "｜" + encodeURIComponent(e) + "《" + encodeURIComponent(s) + "》", delete t.t, delete t.r, this.#R(t);
  }
  //MARK: インラインスタイル設定
  #ct(t) {
    const e = encodeURIComponent(JSON.stringify(t));
    return this.#u("span｜" + e, this.#w(t)), !1;
  }
  //MARK: tcy縦中横を表示する
  #dt(t) {
    if (!t.t) throw "[tcy] tは必須です";
    const e = encodeURIComponent(JSON.stringify(t));
    return this.#u("tcy｜" + e, this.#w(t)), !1;
  }
  //MARK: レイヤのダンプ
  #ft({ layer: t }) {
    console.group("🥟 [dump_lay]");
    for (const e of this.#$(t)) {
      const { fore: s, back: i } = this.#a[e];
      try {
        console.info(
          `%c${s.name.slice(0, -7)} %o`,
          `color:#${R.isDarkMode ? "49F" : "05A"};`,
          JSON.parse(`{"back":{${i.dump()}}, "fore":{${s.dump()}}}`)
        );
      } catch (n) {
        console.error("dump_lay err:%o", n), console.error(`   back:${i.dump()}`), console.error(`   fore:${s.dump()}`);
      }
    }
    return console.groupEnd(), !1;
  }
  //MARK: イベント有無の切替
  #pt(t) {
    const e = this.#U(t, this.#k), s = P(t, "enabled", !0);
    return this.#w(t).enabled = s, this.val.setVal_Nochk("save", "const.sn.layer." + e + ".enabled", s), !1;
  }
  //MARK: ボタンを表示
  #ut(t) {
    return K.argChk_page(t, "back"), t.fn ??= this.scrItr.scriptFn, this.#w(t).addButton(t), this.scrItr.recodeDesign(t), !1;
  }
  record() {
    const t = {};
    for (const e of this.#N) {
      const s = this.#a[e];
      t[e] = {
        cls: s.cls,
        fore: s.fore.record(),
        back: s.back.record()
      };
    }
    return t;
  }
  playback(t) {
    this.#Y = JSON.parse(String(this.val.getVal("save:const.sn.sLog"))), this.#F = { text: "" };
    const e = [], s = [];
    for (const [n, { fore: o, fore: { idx: a }, back: l, cls: c }] of Object.entries(t)) {
      s.push({ ln: n, idx: a });
      const d = this.#a[n] ??= new K(n, c, this.#e, this.#n, {}, this.sys, this.val, { isWait: !1 });
      d.fore.playback(o, e), d.back.playback(l, e);
    }
    const i = this.#e.children.length;
    return e.push(new Promise((n) => {
      for (const { ln: o, idx: a } of s.sort(({ idx: l }, { idx: c }) => l === c ? 0 : l < c ? -1 : 1)) {
        const { fore: l, back: c } = this.#a[o];
        if (!l) continue;
        const d = i > a ? a : i - 1;
        this.#e.setChildIndex(l.ctn, d), this.#n.setChildIndex(c.ctn, d);
      }
      n();
    })), e;
  }
}
const Xt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LayerMng: U
}, Symbol.toStringTag, { value: "Module" }));
export {
  H as B,
  Xt as L,
  x as T
};
//# sourceMappingURL=LayerMng.js.map
