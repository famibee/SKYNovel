import { a as S, q as ot, d as Y, B as Et, S as G, L as I, i as ut, r as W, D as M, f as Rt, R as U, s as _t, v as O, w as V, b as g, E as wt, C as E, x as K, j, y as z, u as L, z as St, o as lt, F as Pt, H as Tt, k as st, I as xt, J as Ft, P as Ot, K as mt, g as yt, M as Bt, N as It } from "./web2.js";
import { C as F } from "./CmnTween.js";
import { e as q, d as X, R as bt, T as Vt } from "./ReadState.js";
import { R as ht } from "./RubySpliter.js";
class Q {
  constructor(t, e, s, i, n, o, a, l) {
    this.cls = e, this.hArg = n, this.sys = o, this.val = a, this.ret = l;
    const c = o.hFactoryCls[e];
    if (!c) throw `属性 class【${e}】が不正です`;
    const u = c(), h = c();
    u.layname = h.layname = t;
    const m = n[":id_tag"] = `layer:${t} cls:${e} page:`;
    u.ctn.name = u.name = m + "A", h.ctn.name = h.name = m + "B", s.addChild(u.ctn), i.addChild(h.ctn), S(n, "visible", !0), S(n, "visible", !0), l.isWait = u.lay(n) || h.lay(n), this.#i = { fore: u, back: h };
    const f = `const.sn.lay.${t}`;
    a.setVal_Nochk("tmp", f, !0), a.defTmp(f + ".fore.alpha", () => this.#i.fore.alpha), a.defTmp(f + ".back.alpha", () => this.#i.back.alpha), a.defTmp(f + ".fore.height", () => this.#i.fore.height), a.defTmp(f + ".back.height", () => this.#i.back.height), a.defTmp(f + ".fore.visible", () => this.#i.fore.ctn.visible), a.defTmp(f + ".back.visible", () => this.#i.back.ctn.visible), a.defTmp(f + ".fore.width", () => this.#i.fore.width), a.defTmp(f + ".back.width", () => this.#i.back.width), a.defTmp(f + ".fore.x", () => this.#i.fore.x), a.defTmp(f + ".back.x", () => this.#i.back.x), a.defTmp(f + ".fore.y", () => this.#i.fore.y), a.defTmp(f + ".back.y", () => this.#i.back.y);
  }
  #i;
  destroy() {
    this.#i.fore.destroy(), this.#i.back.destroy();
  }
  lay = (t) => this.getPage(t).lay(t);
  getPage = (t) => Q.argChk_page(t, "fore") !== "back" ? this.#i.fore : this.#i.back;
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
class jt extends ct {
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
    _.#i = t, _.#e = e, _.#n = s, _.#o = i, s.arg.crypto && (_.#f = _.#p, _.#l = _.#B);
    const o = () => {
      const a = _.#c * _.#t;
      for (const l of Object.values(_.#x)) l.volume = a;
    };
    n.setNoticeChgVolume(
      (a) => {
        _.#c = a, o();
      },
      (a) => {
        _.#t = a, o();
      }
    );
  }
  static #t = 1;
  static #c = 1;
  static #d;
  static setEvtMng(t) {
    _.#d = t;
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
    _.#y = {}, _.#h = {}, _.#x = {};
  }
  //static #ldrHFn: {[fn: string]: 1} = {};
  static #s(t, e, s, i) {
    if (!t) return !1;
    let n = !1;
    if (t.startsWith("data:")) {
      const h = () => {
        const m = O.from(t);
        i(m), e(m), s(n);
      };
      return t in ot ? h() : (n = !0, new Y().add(t, t).load(h)), n;
    }
    const o = [], a = new Y(), l = t.split(","), c = l.length;
    for (let h = 0; h < c; ++h) {
      const m = l[h];
      if (!m) throw "face属性に空要素が含まれます";
      const { dx: f, dy: r, blendmode: p, fn: d } = _.#y[m] || {
        fn: m,
        dx: 0,
        dy: 0,
        blendmode: Et.NORMAL
      }, y = h === 0 ? e : (v) => {
        v.x = f, v.y = r, v.blendMode = p;
      };
      if (o.push({ fn: d, fnc: y }), d in _.#h || d in ot || d in Y.shared.resources) break;
      n = !0;
      const b = _.#i.searchPath(d, G.SP_GSM), C = this.#n.arg.crypto ? { xhrType: b.slice(-5) === ".json" ? I.XHR_RESPONSE_TYPE.TEXT : I.XHR_RESPONSE_TYPE.BUFFER } : {};
      a.add({ ...C, name: d, url: b });
    }
    const u = (h, m) => {
      for (const { fn: f, fnc: r } of o) {
        const p = _.#$(f, m);
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
        _.#f(f, h, m);
      } catch (f) {
        const r = `画像/動画ロード失敗です fn:${h.name} ${f}`;
        _.#d.isSkipping ? console.warn(r) : console.error("%c" + r, "color:#FF3300;");
      }
    }).load(u) : queueMicrotask(() => u(0, {})), n;
  }
  static #y = {};
  static #h = {};
  static #f = (t, { type: e, name: s, data: i }, n) => {
    switch (e) {
      case I.TYPE.VIDEO:
        const o = i;
        o.volume = _.#c, _.#x[s] = _.#w(o);
    }
    n();
  };
  static #u(t) {
    const e = /([^\d]+)\d+\.(\w+)/.exec(t[0] ?? "");
    if (!e) return [];
    const s = e[1].length, i = -e[2].length - 1;
    return t.sort((n, o) => ut(n.slice(s, i)) > ut(o.slice(s, i)) ? 1 : -1);
  }
  static async #p(t, e, s) {
    e.data = t, e.extension !== "bin" && s(), t instanceof HTMLImageElement ? (e.texture = await W.fromLoader(t, e.url, e.name), e.type = I.TYPE.IMAGE) : t instanceof HTMLVideoElement && (t.volume = _.#c, _.#x[e.name] = _.#w(t), e.type = I.TYPE.VIDEO), s();
  }
  static #w(t) {
    return _.#e.getVal("const.sn.needClick2Play") && (M.trace_beforeNew(`[lay系] ${M.strPos()}未クリック状態で動画を自動再生します。音声はミュートされます`, "W"), t.muted = !0), t.setAttribute("playsinline", ""), t;
  }
  static #l = (t, { type: e, spritesheet: s, name: i, data: n }, o) => {
    switch (e) {
      case I.TYPE.JSON:
        const a = s._frameKeys;
        _.#u(a), _.#h[i] = {
          aTex: a.map((l) => W.from(l)),
          meta: n.meta
        };
    }
    o();
  };
  static #B(t, e, s) {
    const { meta: i, frames: n } = e.data = JSON.parse(t);
    if (e.type = I.TYPE.JSON, !i?.image) {
      s();
      return;
    }
    const o = Rt(i.image), a = _.#i.searchPath(o, G.SP_GSM);
    new Y().use((l, c) => {
      this.#n.decAB(l.data).then((u) => {
        l.data = u, u instanceof HTMLImageElement && (l.type = I.TYPE.IMAGE, URL.revokeObjectURL(u.src)), c();
      }).catch((u) => this.#o.errScript(`画像/動画ロード失敗です dec2res4Cripto fn:${l.name} ${u}`, !1));
    }).add({ name: o, url: a, xhrType: I.XHR_RESPONSE_TYPE.BUFFER }).load((l, c) => {
      for (const { data: u } of Object.values(l.resources)) {
        const { baseTexture: h } = W.from(u), m = Object.values(n);
        _.#h[e.name] = {
          aTex: m.map(({ frame: { x: f, y: r, w: p, h: d } }) => new W(
            h,
            new U(f, r, p, d)
          )),
          meta: i
        };
      }
      s();
    });
  }
  static #$(t, e) {
    const s = _.#h[t];
    if (s) {
      const o = new _t(s.aTex);
      return o.animationSpeed = s.meta.animationSpeed ?? 1, o.play(), o;
    }
    if (t in ot) return O.from(t);
    const i = _.#x[t];
    if (i) return O.from(i);
    const n = e[t];
    return n ? new O(n.texture) : new O();
  }
  static #x = {};
  static getHFn2VElm(t) {
    return _.#x[t];
  }
  static wv(t) {
    const { fn: e } = t;
    if (!e) throw "fnは必須です";
    const s = _.#x[e];
    if (!s || s.loop) return !1;
    if (_.#d.isSkipping || s.ended)
      return _.stopVideo(e), !1;
    const i = () => _.#d.breakEvent("wv fn:" + e);
    s.addEventListener("ended", i, { once: !0, passive: !0 });
    const n = S(t, "stop", !0);
    return _.#d.waitEvent("wv fn:" + e, t, () => {
      s.removeEventListener("ended", i), n && _.stopVideo(e), i();
    });
  }
  static stopVideo(t) {
    const e = _.#x[t];
    e && (delete _.#x[t], e.pause(), e.currentTime = e.duration);
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
class H extends V {
  static #i = new wt();
  static #e;
  static init(t, e, s, i, n, o) {
    H.#e = s, _.init(e, o, i, t, n);
  }
  static destroy() {
    H.#i.clear(), _.destroy();
  }
  #n = new jt(this.ctn, this);
  constructor() {
    super(), E.isDbg && (this.#o = (t) => this.#n.setSp(t), this.cvsResize = () => {
      super.cvsResize(), this.#n.cvsResize();
    });
  }
  #o = () => {
  };
  #t = "";
  #c = "";
  #d = "";
  lay = (t) => {
    const e = this.#m(t, (s) => {
      s && q();
    });
    return e && X(), e;
  };
  #m(t, e) {
    const { fn: s, face: i = "" } = t;
    if (this.#n.sethArg(t), !s)
      return super.lay(t), this.ctn.children.length > 0 && this.setPos(t), this.#c = "", this.#t = this.#d = i, e(!1), !1;
    const n = "fn" in t, o = "face" in t;
    return this.clearLay({ clear_filter: S(t, "clear_filter", !0) }), n && (this.#c = s), o && (this.#d = i), super.lay(t), t.dx = 0, t.dy = 0, this.#r.destroy(), this.#r = new _(
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
    this.#f = new O(this.#h), this.#f.visible = !1, this.ctn.addChildAt(this.#f, 0), this.#f.position.set(-this.ctn.x, -this.ctn.y);
    let t = () => {
      const e = this.ctn.alpha;
      this.ctn.alpha = 1;
      for (const s of this.ctn.children) s.visible = !0;
      this.#f.visible = !1, H.#e.renderer.render(this.ctn, { renderTexture: this.#h }), this.ctn.alpha = e;
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
      t(), this.#f.visible = !0;
    }, H.#e.ticker.add(this.#u);
  }
  #h = K.create({
    width: E.stageW,
    height: E.stageH
  });
  #f = new O();
  #u = () => {
  };
  renderEnd() {
    H.#e.ticker.remove(this.#u), this.ctn.removeChild(this.#f);
    for (const t of this.ctn.children) t.visible = !0;
    this.#f.destroy(!0), this.#h = K.create({
      width: E.stageW,
      height: E.stageH
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
      (e, s) => t[s] instanceof _t || _.getHFn2VElm(e)
    );
  }
  clearLay(t) {
    super.clearLay(t), this.#r.destroy(), this.#c = "", this.#d = "", this.#t = "";
  }
  record = () => ({
    ...super.record(),
    sBkFn: this.#c,
    sBkFace: this.#d
    //		idc_hArg	: this.#idc.gethArg(),
  });
  playback(t, e) {
    if (super.playback(t, e), t.sBkFn === "" && t.sBkFace === "") {
      this.#c = "", this.#d = "";
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
const Z = "、。，．）］｝〉」』】〕”〟ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ！？!?‼⁉・ーゝゞヽヾ々", it = "［（｛〈「『【〔“〝", nt = "─‥…", rt = Z, gt = new RegExp(`[${Z}]`), Dt = new RegExp(`[${it}]`), Ht = new RegExp(`[${nt}]`), Wt = gt;
class zt {
  #i = Z;
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
  #t = gt;
  #c = Dt;
  #d = Ht;
  #m = Wt;
  break_fixed = !1;
  break_fixed_left = 0;
  break_fixed_top = 0;
  bura = !1;
  lay(t) {
    t.kinsoku_sol && (this.#i = t.kinsoku_sol, this.#t = new RegExp(`[${this.#i}]`)), t.kinsoku_eol && (this.#e = t.kinsoku_eol, this.#r(), this.#c = new RegExp(`[${this.#e}]`)), t.kinsoku_dns && (this.#n = t.kinsoku_dns, this.#s(), this.#d = new RegExp(`[${this.#n}]`)), t.kinsoku_bura && (this.#o = t.kinsoku_bura, this.#r(), this.#s(), this.#m = new RegExp(`[${this.#o}]`)), "bura" in t && (this.bura = S(t, "bura", !1)), this.break_fixed = S(t, "break_fixed", this.break_fixed), this.break_fixed_left = g(t, "break_fixed_left", this.break_fixed_left), this.break_fixed_top = g(t, "break_fixed_top", this.break_fixed_top);
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
    this.#i != t && (this.#i = t, this.#t = new RegExp(`[${t}]`)), this.#e != e && (this.#e = e, this.#c = new RegExp(`[${e}]`)), this.#n != s && (this.#n = s, this.#d = new RegExp(`[${s}]`)), this.#o != i && (this.#o = i, this.#m = new RegExp(`[${i}]`));
  }
  record() {
    const t = {
      break_fixed: this.break_fixed,
      break_fixed_left: this.break_fixed_left,
      break_fixed_top: this.break_fixed_top,
      bura: this.bura
    };
    return this.#i === Z && (t.行頭禁則 = this.#i), this.#e === it && (t.行末禁則 = this.#e), this.#n === nt && (t.分割禁止 = this.#n), this.#o === rt && (t.ぶら下げ = this.#o), t;
  }
  playback(t) {
    t && (this.#y(
      t.行頭禁則 ?? Z,
      t.行末禁則 ?? it,
      t.分割禁止 ?? nt,
      t.ぶら下げ ?? rt
    ), this.break_fixed = t.break_fixed, this.break_fixed_left = t.break_fixed_left, this.break_fixed_top = t.break_fixed_top, this.bura = t.bura);
  }
  hyph(t, e, s, i, n) {
    let o, a = 0, l = 2, c = (u) => (c = () => !1, i === u ? (i > 0 && (t.innerHTML = n.replaceAll('class="sn_ch"', 'class="sn_ch sn_ch_in_default"')), !0) : u < 2);
    do {
      if (o = this.#f(t, e), a = o.length, c(a)) break;
      let u = -1 / 0;
      for (; l < a; ++l) {
        const { elm: h, rect: m, ch: f } = o[l];
        if (h.tagName === "RT") continue;
        const r = s ? m.y : m.x;
        if (u <= r || h.previousElementSibling?.tagName === "SPAN" && h.previousElementSibling?.innerHTML.includes("<br>") || h.parentElement?.previousElementSibling?.tagName === "SPAN" && h.parentElement?.previousElementSibling?.innerHTML.includes("<br>")) {
          u = r, this.break_fixed || (this.break_fixed_left = m.x, this.break_fixed_top = m.y);
          continue;
        }
        const p = this.#h(o, l), { elm: d, rect: y, ch: b } = o[p];
        if (!this.break_fixed) {
          this.break_fixed_left = y.x, this.break_fixed_top = y.y;
          const P = globalThis.getComputedStyle(d), B = parseFloat(P.fontSize);
          s ? this.break_fixed_top += B : this.break_fixed_left += B;
        }
        u = -1 / 0;
        const C = l, { cont: v, ins: w } = this.bura ? this.hyph_alg_bura(o, p, b, l) : this.hyph_alg(o, p, b, l, f);
        if (l = w, v) continue;
        const N = o[l].elm, R = N.parentElement, T = document.createElement("br");
        if (R.classList.contains("sn_tx")) R.insertBefore(T, N);
        else {
          const P = R.parentElement;
          P.classList.contains("sn_ch") ? P.parentElement.insertBefore(T, P) : P.insertBefore(T, R);
        }
        l += 2, l < C && (l = C), a = -1;
        break;
      }
    } while (a < 0);
    return [o, a];
  }
  // 一つ前の要素を探す（ルビ対応）
  #h(t, e) {
    const s = e - 1, { elm: i } = t[s];
    return i.tagName !== "RT" ? s - (i.style.textCombineUpright === "all" ? Array.from(i.textContent ?? "").length - 1 : 0) : s - Array.from(i.textContent ?? "").length;
  }
  #f(t, e) {
    const s = [];
    if (t.nodeType !== t.TEXT_NODE) return Array.from(t.childNodes).map((a) => this.#f(a, e)).flat();
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
    if (!this.#c.test(s)) {
      if (this.#t.test(n))
        for (; (i = this.#h(t, i)) >= 0 && this.#t.test(t[i].ch); )
          ;
      else if (!(s === n && this.#d.test(s))) return { cont: !0, ins: i + 1 };
    }
    for (i = e; (i = this.#h(t, i)) >= 0 && this.#c.test(t[i].ch); )
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
    const n = this.#h(t, e), { ch: o } = t[n];
    if (this.#m.test(o) || this.#t.test(o)) {
      let l = e;
      (this.#m.test(s) || this.#t.test(s)) && ++l;
      const c = this.#h(t, l), { ch: u } = t[c], { ch: h } = t[l];
      if (u === h && this.#d.test(h)) return { cont: !1, ins: c };
      if (!this.#c.test(u)) return { cont: !1, ins: l };
      l = c;
      do
        if (!this.#c.test(t[l].ch)) break;
      while ((l = this.#h(t, l)) >= 0);
      return { cont: !1, ins: l + 1 };
    }
    const a = this.#h(t, n);
    if (i >= 3) {
      const { ch: l } = t[a];
      if (this.#d.test(o) && l === o)
        return { cont: !1, ins: a };
      if (this.#c.test(l)) {
        let c = a;
        for (; (c = this.#h(t, c)) >= 0 && this.#c.test(t[c].ch); )
          ;
        return { cont: !1, ins: c + 1 };
      }
    }
    return { cont: !1, ins: n };
  }
}
class k extends j {
  constructor(t, e, s) {
    super(), this.ctn = t, this.canFocus = e, this.sys = s, this.#t.classList.add("sn_tx"), this.#t.style.position = "absolute", k.#e.view.parentElement.appendChild(this.#t), this.addChild(this.#c), this.addChild(this.#d), this.#d.name = "grpDbgMasume", this.noticeCompTxt = s.isApp && k.#i.oCfg.debug.dumpHtm ? () => {
      bt.noticeCompTxt();
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
    } : () => bt.noticeCompTxt();
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
    k.#S = /* @__PURE__ */ Object.create(null), k.#I = /* @__PURE__ */ Object.create(null), k.delBreak();
  }
  #t = document.createElement("span");
  // サンプリング元
  #c = new j();
  // サンプリング先
  #d = new z();
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
  #r = new zt();
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
            M.myTrace(`${o}は指定できません`, "W");
            continue;
          }
          e[o] = s.style[o];
        }
        !s.style.opacity && "alpha" in t && (e.opacity = String(this.ctn.alpha));
      } else this.#t.style.cssText = "";
    else "alpha" in t && (e.opacity = String(this.ctn.alpha));
    if ("width" in t && (e.width = (t.width ?? "0") + "px"), "height" in t && (e.height = (t.height ?? "0") + "px"), "pl" in t && (e.paddingLeft = (t.pl ?? "0") + "px"), "pr" in t && (e.paddingRight = (t.pr ?? "0") + "px"), "pt" in t && (e.paddingTop = (t.pt ?? "0") + "px"), "pb" in t && (e.paddingBottom = (t.pb ?? "0") + "px"), this.#r.lay(t), this.#h(), this.#f = this.ctn.position.x, e.transformOrigin = `${this.ctn.pivot.x}px ${this.ctn.pivot.y}px`, this.cvsResize(), e.display = this.ctn.visible ? "inline" : "none", ":redraw" in t && this.#a > 0) {
      const s = [
        this.#t.innerHTML.replaceAll(/(animation-delay: )\d+ms/g, "$10ms"),
        `<span class='sn_ch' data-add='{"ch_in_style":"default"}'>&emsp;</span>`
      ];
      this.#b(), this.goTxt(s, !0);
    }
  }
  #y = 0;
  // 「g」などで下が欠ける問題対策
  #h() {
    const t = this.#t.style, e = parseFloat(t.fontSize || "0");
    this.#s.fontsize = e, this.#s.pad_left = parseFloat(t.paddingLeft || "0"), this.#s.pad_right = parseFloat(t.paddingRight || "0"), this.#s.pad_top = parseFloat(t.paddingTop || "0"), this.#s.pad_bottom = parseFloat(t.paddingBottom || "0"), this.#s.$width = parseFloat(t.width || "0"), this.#s.$height = parseFloat(t.height || "0"), this.position.set(this.#s.pad_left, this.#s.pad_top), this.#u = t.writingMode === "vertical-rl", this.#p = 0, this.#w = 0;
    const s = t.lineHeight ?? "0";
    this.#y = this.#u ? 0 : (s.endsWith("px") ? parseFloat(s) : e * parseFloat(s) - e) / 2;
  }
  cvsResize() {
    const t = this.#t.style, e = this.sys.cvsScale;
    t.left = `${this.sys.ofsLeft4elm + this.#f * e}px`, t.top = `${this.sys.ofsTop4elm + this.ctn.position.y * e}px`, t.transform = `rotate(${this.ctn.angle}deg) scale(${this.ctn.scale.x * e}, ${this.ctn.scale.y * e})`;
  }
  #f = 0;
  #u = !1;
  get tategaki() {
    return this.#u;
  }
  #p = 0;
  #w = 0;
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
        const d = l(p).toLowerCase();
        return i()[d] || "";
      },
      dataAsUrl: m,
      isDataUrl: c,
      resolveUrl: u,
      getAndEncode: h,
      asArray: (p) => {
        const d = [], y = p.length;
        for (let b = 0; b < y; ++b) d.push(p[b]);
        return d;
      }
    };
    function i() {
      const p = "application/font-woff", d = "image/jpeg";
      return {
        woff: p,
        woff2: p,
        ttf: "application/font-truetype",
        eot: "application/vnd.ms-fontobject",
        png: "image/png",
        jpg: d,
        jpeg: d,
        gif: "image/gif",
        tiff: "image/tiff",
        svg: "image/svg+xml"
      };
    }
    const n = f(), o = r();
    function a(p) {
      return o.resolveAll().then((d) => {
        const y = document.createElement("style");
        return p.appendChild(y), y.appendChild(document.createTextNode(d)), p;
      });
    }
    function l(p) {
      return /\.([^\.\/]*?)$/g.exec(p)?.[1] ?? "";
    }
    function c(p) {
      return p.search(/^(data:)/) !== -1;
    }
    function u(p, d) {
      const y = document.implementation.createHTMLDocument(), b = y.createElement("base");
      y.head.appendChild(b);
      const C = y.createElement("a");
      return y.body.appendChild(C), b.href = d, C.href = p, C.href;
    }
    function h(p) {
      let d = 3e4;
      return new Promise(function(y) {
        const b = new XMLHttpRequest();
        b.onreadystatechange = C, b.ontimeout = v, b.responseType = "blob", b.timeout = d, b.open("GET", p, !0), b.send();
        function C() {
          if (b.readyState !== 4) return;
          if (b.status !== 200) {
            w("cannot fetch resource: " + p + ", status: " + b.status);
            return;
          }
          const N = new FileReader();
          N.onloadend = function() {
            const R = N.result.toString().split(/,/)[1];
            y(R);
          }, N.readAsDataURL(b.response);
        }
        function v() {
          w("timeout of " + d + "ms occured while fetching resource: " + p);
        }
        function w(N) {
          console.error(N), y("");
        }
      });
    }
    function m(p, d) {
      return "data:" + d + ";base64," + p;
    }
    function f() {
      const p = /url\(['"]?([^'"]+?)['"]?\)/g;
      return {
        inlineAll: C,
        shouldProcess: d
      };
      function d(v) {
        return v.search(p) !== -1;
      }
      function y(v) {
        const w = [];
        let N;
        for (; N = p.exec(v); )
          w.push(N[1]);
        return w.filter(function(R) {
          return !s.isDataUrl(R);
        });
      }
      function b(v, w, N, R) {
        return Promise.resolve(w).then((P) => N ? s.resolveUrl(P, N) : P).then(R || s.getAndEncode).then((P) => s.dataAsUrl(P, s.mimeType(w))).then((P) => v.replace(T(w), "$1" + P + "$3"));
        function T(P) {
          return new RegExp(`(url\\(['"]?)(` + s.escape(P) + `)(['"]?\\))`, "g");
        }
      }
      function C(v, w, N) {
        if (R()) return Promise.resolve(v);
        return Promise.resolve(v).then(y).then((T) => {
          let P = Promise.resolve(v);
          for (const B of T) P = P.then((at) => b(at, B, w, N));
          return P;
        });
        function R() {
          return !d(v);
        }
      }
    }
    function r() {
      return {
        resolveAll: p,
        impl: { readAll: d }
      };
      function p() {
        return d().then((y) => Promise.allSettled(
          y.map((b) => b.resolve())
        )).then((y) => y.join(`
`));
      }
      function d() {
        return Promise.resolve(s.asArray(document.styleSheets)).then(b).then(y).then((v) => v.map(C));
        function y(v) {
          return v.filter((w) => w.type === CSSRule.FONT_FACE_RULE).filter((w) => n.shouldProcess(w.style.getPropertyValue("src")));
        }
        function b(v) {
          const w = [];
          for (const N of v)
            try {
              if (N.href) continue;
              s.asArray(N.cssRules || []).forEach(w.push.bind(w));
            } catch (R) {
              console.error("Error while reading CSS rules from " + N.href, String(R));
            }
          return w;
        }
        function C(v) {
          return {
            resolve: function() {
              const N = (v.parentStyleSheet || {}).href;
              return n.inlineAll(v.cssText, N);
            },
            src: function() {
              return v.style.getPropertyValue("src");
            }
          };
        }
      }
    }
    Promise.resolve(this.#t).then((p) => {
      const d = p.cloneNode(!0);
      return d.style.padding = "0px", d.style.paddingRight = this.#p + "px", d.style.paddingTop = this.#w + "px", d.style.left = "0px", d.style.top = "0px", d.style.width = this.#s.$width - this.#s.pad_left - this.#s.pad_right + "px", d.style.height = this.#s.$height - this.#s.pad_top - this.#s.pad_bottom + "px", this.#t.hidden = e, d;
    }).then(a).then((p) => {
      p.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
      const d = new Image();
      return d.src = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${this.#s.$width}px" height="${this.#s.$height}px"><foreignObject x="0" y="0" width="100%" height="100%">${new XMLSerializer().serializeToString(p).replaceAll("#", "%23").replaceAll(`
`, "%0A")}</foreignObject></svg>`, new Promise((y) => d.onload = () => y(d));
    }).then((p) => new Promise((d) => setTimeout(() => d(p), 100))).then((p) => {
      const d = document.createElement("canvas");
      d.width = this.#s.$width, d.height = this.#s.$height, d.getContext("2d").drawImage(p, 0, 0), t(W.from(d));
    }).catch((p) => M.myTrace(`goTxt() = ${p}`));
  }
  #B = void 0;
  // 文字にかけるフィルター
  #$ = [];
  #x = [];
  #a = 0;
  static #C = "<span class='sn_ch sn_ch_last'>&emsp;</span>";
  goTxt(t, e) {
    k.#H.visible = !1;
    let s = this.#x.length, i = "";
    if (s === 0) {
      if (k.#i.oCfg.debug.masume && (E.debugLog && console.log(`🍌 masume ${this.name} v:${this.visible} l:${this.x} t:${this.y} a:${this.alpha} pl:${this.#s.pad_left} pr:${this.#s.pad_right} pt:${this.#s.pad_top} pb:${this.#s.pad_bottom} w:${this.#s.$width} h:${this.#s.$height}`), this.#d.clear().beginFill(3407616, 0.2).lineStyle(1, 3407616, 1).drawRect(-this.#s.pad_left, -this.#s.pad_top, this.#s.$width, this.#s.$height).endFill().beginFill(13311, 0.2).lineStyle(2, 13311, 1).drawRect(
        0,
        0,
        this.#s.$width - this.#s.pad_left - this.#s.pad_right,
        this.#s.$height - this.#s.pad_top - this.#s.pad_bottom
      ).endFill()), this.#t.innerHTML = [...t].join("").replaceAll(/[\n\t]/g, "") + k.#C, !this.#r.break_fixed) {
        const y = globalThis.getComputedStyle(this.#t), b = parseFloat(y.fontSize);
        this.#u ? (this.#r.break_fixed_left = (this.#s.$width - this.#s.pad_left - this.#s.pad_right - b * 1.5) * this.sys.cvsScale, this.#r.break_fixed_top = 0) : (this.#r.break_fixed_left = 0, this.#r.break_fixed_top = b / 2 * this.sys.cvsScale);
      }
    } else
      i = this.#t.innerHTML, --s, this.#t.querySelector(".sn_ch_last")?.remove(), this.#t.querySelectorAll(":scope > br").forEach((y) => y.remove()), this.#t.insertAdjacentHTML(
        "beforeend",
        t.slice(this.#a).join("").replaceAll(/[\n\t]/g, "") + k.#C
        // 末尾改行削除挙動対策
      );
    this.#t.querySelectorAll(".sn_ch:has(> ruby)").forEach((y) => y.style.background = ""), this.#a = t.length;
    const n = this.sys.cvsScale, o = this.#t.getBoundingClientRect(), a = o.left + this.#s.pad_left, l = o.top + this.#s.pad_top;
    let c;
    if (n === 1) c = (y, b) => {
      const C = y.getBoundingClientRect();
      return new U(
        C.left - a,
        C.top - l,
        C.width,
        C.height + ("gjqy".includes(b) ? this.#y : 0)
      );
    };
    else {
      const y = this.sys.ofsPadLeft_Dom2PIXI + o.left * (1 - n), b = this.sys.ofsPadTop_Dom2PIXI + o.top * (1 - n);
      c = (C, v) => {
        const w = C.getBoundingClientRect();
        return new U(
          (w.left - y) / n - a,
          (w.top - b) / n - l,
          w.width / n,
          (w.height + ("gjqy".includes(v) ? this.#y : 0)) / n
        );
      };
    }
    const [u, h] = this.#r.hyph(this.#t, c, this.#u, s, i);
    this.#x = u;
    const m = E.debugLog ? ({ ch: y }, { x: b, y: C, width: v, height: w }) => console.log(`🍌 masume ch:${y} x:${b} y:${C} w:${v} h:${w}`) : () => {
    }, f = k.#i.oCfg.debug.masume ? (y, b) => {
      m(y, b), this.#d.beginFill(6737151, 0.5).lineStyle(2, 16724736, 1).drawRect(b.x, b.y, b.width, b.height).endFill();
    } : () => {
    }, r = F.ease(this.#N);
    for (let y = s; y < h; ++y) {
      const b = this.#x[y], C = b.rect, v = JSON.parse(b.elm.dataset.arg ?? '{"delay": 0}'), w = JSON.parse(b.elm.dataset.add ?? "{}"), N = k.#S[w.ch_in_style];
      if (f(b, C), b.elm.dataset.cmd === "grp") {
        const R = new j();
        this.#c.addChild(R), new _(v.pic, R, (T) => {
          this.#J(R, v, w, C, r, N ?? {}), R.parent || R.removeChild(T);
        });
      }
      if (b.elm.dataset.lnk) {
        const R = b.elm.parentElement.closest("[data-arg]"), T = JSON.parse(R.dataset.arg ?? "{}");
        T.key = `lnk=[${y}] ` + this.name;
        const P = new O();
        this.#J(P, T, w, C, r, N ?? {});
        const B = T.style ?? "", at = B + (T.style_hover ?? ""), kt = B + (T.style_clicked ?? ""), A = T.r_style ?? "", vt = A + (T.r_style_hover ?? ""), $t = A + (T.r_style_clicked ?? ""), ft = Array.from(R.getElementsByTagName("rt"));
        for (const et of ft) et.dataset.st_r_bk = et.style.cssText;
        const Ct = R.style.cssText, tt = (et, Nt) => {
          R.style.cssText = Ct + et;
          for (const pt of ft) pt.style.cssText = pt.dataset.st_r_bk + Nt;
        };
        S(T, "enabled", !0) ? k.#n.button(
          T,
          P,
          () => tt(B, A),
          () => this.canFocus() ? (tt(at, vt), !0) : !1,
          () => tt(kt, $t)
        ) : tt(
          B + (T.style_disable ?? "color: gray;"),
          A + (T.r_style_disable ?? "color: gray;")
        ), this.#c.addChild(P);
      }
    }
    const p = Array.from(this.#t.getElementsByClassName("sn_ch"));
    this.#k = () => {
      this.#k = () => !1;
      for (const y of p) y.className = y.className.replaceAll(/ go_ch_in_[^\s"]+/g, "");
      return k.#H.position.set(
        this.#r.break_fixed_left,
        this.#r.break_fixed_top
      ), k.#H.visible = !0, this.noticeCompTxt(), !0;
    };
    for (const y of p) y.className = y.className.replaceAll(/sn_ch_in_([^\s"]+)/g, "go_ch_in_$1");
    s > 0 && ++s;
    let d;
    for (let y = h - 2; y >= 0; --y) {
      const { elm: b } = this.#x[y];
      if (b.tagName === "SPAN") {
        d = b.parentElement?.tagName === "RUBY" ? b.parentElement.parentElement ?? b : b;
        break;
      }
    }
    if (!d || e || s === h) {
      this.#k();
      return;
    }
    d.addEventListener("animationend", () => this.#k(), { once: !0, passive: !0 });
  }
  #k = () => !1;
  #J(t, e, s, i, n, o) {
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
    this.#$.push(a);
  }
  skipChIn() {
    let t = this.#k();
    for (const e of this.#$)
      e.tw && (e.tw.stop().end(), t = !0);
    return this.#$ = [], t;
  }
  static #S = /* @__PURE__ */ Object.create(null);
  static #D = /[\s\.,]/;
  static initChStyle() {
    k.#S = /* @__PURE__ */ Object.create(null), k.#I = /* @__PURE__ */ Object.create(null);
  }
  static getChInStyle(t) {
    return k.#S[t];
  }
  static ch_in_style(t) {
    const { name: e } = t;
    if (!e) throw "nameは必須です";
    if (k.#D.test(e)) throw `name【${e}】に使えない文字が含まれます`;
    if (e in k.#S) throw `name【${e}】はすでにあります`;
    const s = String(t.x ?? "=0"), i = String(t.y ?? "=0");
    return k.#S[e] = {
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
      join: S(t, "join", !0),
      // 文字を順番に出すか（true）同時か（false）
      ease: t.ease ?? "ease-out"
    };
  }
  static #I = /* @__PURE__ */ Object.create(null);
  static getChOutStyle(t) {
    return k.#I[t];
  }
  static ch_out_style(t) {
    const { name: e } = t;
    if (!e) throw "nameは必須です";
    if (k.#D.test(e)) throw `name【${e}】に使えない文字が含まれます`;
    if (e in k.#I) throw `name【${e}】はすでにあります`;
    const s = String(t.x ?? "=0"), i = String(t.y ?? "=0");
    return k.#I[e] = {
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
      join: S(t, "join", !1),
      // 文字を順番に出すか（true）同時か（false）
      ease: t.ease ?? "ease-out"
    };
  }
  static #H = new j();
  static #W = new _();
  dispBreak(t) {
    k.delBreak();
    const e = k.#H;
    e.visible = !1, this.addChild(e), k.#W.destroy(), k.#W = new _(t.pic, e, (s) => {
      e.parent ? (s.x = g(t, "x", 0), s.y = g(t, "y", 0), s.width = g(t, "width", this.#s.fontsize), s.height = g(t, "height", this.#s.fontsize)) : e.removeChild(s);
    });
  }
  static delBreak() {
    const t = k.#H;
    t.parent?.removeChild(t), k.#W.destroy();
  }
  #N = "Quadratic.Out";
  #E = "Quadratic.Out";
  #b() {
    this.#d.clear(), this.#x = [], this.#a = 0, this.skipChIn();
    const t = this.#t.cloneNode(!0);
    t.textContent = "";
    const e = this.#t;
    e.parentElement.insertBefore(t, e);
    let s = 0;
    e.querySelectorAll("span.sn_ch").forEach((n) => {
      const o = JSON.parse(
        n?.dataset.add ?? // 通常文字
        n?.children[0]?.getAttribute("data-add") ?? // ルビ
        n?.children[0]?.children[0]?.getAttribute("data-add") ?? "{}"
        // 縦中横
      );
      if (!o.ch_out_style) return;
      const a = k.#I[o.ch_out_style];
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
      for (const n of this.#c.removeChildren())
        n instanceof j && k.#n.unButton(n), n.destroy();
    };
    s === 0 ? (this.#t.textContent = "", i()) : e.lastElementChild?.addEventListener("animationend", i, { once: !0, passive: !0 }), this.#t = t;
  }
  reNew() {
    this.#b();
    const t = new k(this.ctn, () => this.canFocus(), this.sys);
    return t.#s = this.#s, t.#t.style.cssText = this.#t.style.cssText, t.#f = this.#f, t.name = this.name, t.#h(), t.#B = this.#B, t.#N = this.#N, t.#E = this.#E, this.#r.reNew(t.#r), this.destroy(), t;
  }
  record() {
    return {
      infTL: this.#s,
      cssText: this.#t.style.cssText,
      left: this.#f,
      //		idc_hArg	: this.#idc.gethArg(),
      ch_filter: this.#B,
      fi_easing: this.#N,
      fo_easing: this.#E,
      hyph: this.#r.record()
    };
  }
  playback(t) {
    this.#s = t.infTL, this.position.set(this.#s.pad_left, this.#s.pad_top), this.#t.style.cssText = t.cssText, this.#f = t.left, this.#h(), this.#B = t.ch_filter, this.#N = t.fi_easing, this.#E = t.fo_easing, this.#r.playback(t.hyph);
  }
  get cssText() {
    return this.#t.style.cssText;
  }
  set cssText(t) {
    this.#t.style.cssText = t;
  }
  #v = void 0;
  snapshot(t, e) {
    this.#l((s) => {
      this.#v = O.from(s), this.#u && (this.#v.x += E.stageW - (this.#f + this.#s.$width)), this.#v.y -= this.#w, this.#v.texture.frame = new U(
        0,
        0,
        Math.min(this.#v.width, this.#s.$width - this.#f),
        Math.min(this.#v.height, this.#s.$height)
      ), this.#c.addChild(this.#v), t.render(this.#v, { clear: !1 }), e();
    }, !1);
  }
  snapshot_end() {
    this.#v && (this.#c.removeChild(this.#v), this.#v = void 0);
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
    k.delBreak(), this.#t.parentElement.removeChild(this.#t), this.removeChild(this.#c), this.removeChild(this.#d), super.destroy();
  }
}
class D extends j {
  constructor(t, e, s, i) {
    if (super(), this.hArg = t, this.evtMng = e, this.resolve = s, this.canFocus = i, this.#t = {
      type: "pic",
      enabled: S(t, "enabled", !0),
      x: this.x = L(t.left ?? 0),
      y: this.y = L(t.top ?? 0),
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
    }, this.getBtnBounds = () => (this.#n.x = this.#t.x, this.#n.y = this.#t.y, this.#n), this.#t.enabled && e.button(t, this, () => this.normal(), () => this.#d(), () => this.#m()), t.pic) {
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
    const n = g(t, "height", 30), o = new St({
      align: "center",
      dropShadow: !0,
      dropShadowAlpha: 0.7,
      dropShadowColor: "white",
      dropShadowBlur: 7,
      dropShadowDistance: 0,
      fill: this.#t.enabled ? "black" : "gray",
      fontFamily: D.fontFamily,
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
        this.#c(h, a), this.#t.width = this.width, this.#t.height = this.height, a.name = JSON.stringify(this.#t);
      },
      (h) => {
        V.setBlendmode(this, t), h && s();
      }
    ), l = this.#o.ret), a.name = JSON.stringify(this.#t), this.addChild(a), this.#n.width = a.width, this.#n.height = a.height, t.b_pic || V.setBlendmode(this, t), D.#i(this, a), !this.#t.enabled) {
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
    const u = c.clone();
    if (t.style_clicked) try {
      const h = JSON.parse(t.style_clicked);
      for (const [m, f] of Object.entries(h)) u[m] = f;
    } catch (h) {
      throw h instanceof SyntaxError ? new Error(lt(t, "style_clicked", h.message)) : "fn:Button.ts style_clicked";
    }
    else u.dropShadow = !1;
    this.normal = () => a.style = o, this.#d = () => i() ? (a.style = c, !0) : !1, this.#m = () => a.style = u, l || s();
  }
  static fontFamily = "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif";
  static #i = (t, e) => {
  };
  static #e = (t, e, s, i) => {
  };
  static init(t) {
    t.oCfg.debug.masume && (D.#i = (e, s) => e.addChild(
      new z().beginFill(8926088, 0.2).lineStyle(1, 8926088, 1).drawRect(s.x, s.y, s.width, s.height).endFill()
    ), D.#e = (e, s, i, n) => e.addChild(
      new z().beginFill(8926088, 0.2).lineStyle(1, 8926088, 1).drawRect(s.x, s.y, i, n).endFill()
    ));
  }
  setText(t) {
  }
  getBtnBounds = () => this.#n;
  // 文字ボタンは背景画像を含まない位置指定なので、その当たり判定用
  #n = new U();
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
  #c(t, e) {
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
  #d = () => !1;
  #m = () => {
  };
  #r(t) {
    this.#t.alpha = t.alpha = g(this.hArg, "alpha", t.alpha);
    const e = t.width / 3, s = this.#t.enabled ? e : t.width, i = t.height, n = t.texture.baseTexture, o = new W(n, new U(0, 0, e, i)), a = new W(n, new U(e, 0, e, i)), l = new W(n, new U(e * 2, 0, e, i)), c = () => t.texture = o;
    this.#t.enabled && c(), this.normal = c, this.#d = () => this.canFocus() ? (t.texture = l, !0) : !1, this.#m = () => t.texture = a, "width" in this.hArg ? (this.#t.width = L(this.hArg.width), this.scale.x *= this.#t.width / s) : this.#t.width = s, "height" in this.hArg ? (this.#t.height = L(this.hArg.height), this.scale.y *= this.#t.height / i) : this.#t.height = i, t.name = JSON.stringify(this.#t), D.#e(this, t, s, i);
  }
}
class x extends V {
  static #i;
  static #e;
  static #n;
  static #o;
  static init(t, e, s, i, n, o) {
    x.#i = t, k.init(t, o), x.#e = s, x.#o = i, x.#n = n, s.setDoRecProc(x.chgDoRec), e.autowc = (a) => x.#y(a), e.autowc({ enabled: !1, text: "", time: 0 }), e.ch_in_style = (a) => x.#t(a), e.ch_out_style = (a) => x.#c(a), k.initChStyle(), Tt(), st(
      t.matchPath(".+", G.FONT).flatMap((a) => Object.values(a).map((l) => `
@font-face {
	font-family: '${l}';
	src: url('${this.#i.searchPath(l, G.FONT)}');
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
    }), x.#c({
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
  static #c(t) {
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
  static #d;
  static #m;
  static setEvtMng(t, e, s) {
    x.#d = t, x.#m = e, k.setEvtMng(t, s);
  }
  // 文字ごとのウェイト
  static #r = !1;
  static #s = {};
  static #y(t) {
    x.#r = S(t, "enabled", x.#r), x.#e.setVal_Nochk("save", "const.sn.autowc.enabled", x.#r);
    const { text: e } = t;
    if ("text" in t != "time" in t) throw "[autowc] textとtimeは同時指定必須です";
    if (x.#e.setVal_Nochk("save", "const.sn.autowc.text", e), !e)
      return x.#e.setVal_Nochk("save", "const.sn.autowc.time", ""), !1;
    const s = e.length;
    if (x.#r && s === 0) throw '[autowc] enabled === false かつ text === "" は許されません';
    const i = String(t.time).split(",");
    if (i.length !== s) throw "[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい";
    x.#s = {};
    for (let n = 0; n < s; ++n) x.#s[e[n]] = L(i[n]);
    return x.#e.setVal_Nochk("save", "const.sn.autowc.time", t.time), !1;
  }
  // バック
  #h = 0;
  #f = 0;
  #u = !1;
  #p = void 0;
  #w = "";
  // 背景画像無し（＝単色塗り）
  // 文字表示
  #l = new k(this.ctn, () => this.canFocus(), x.#m);
  #B = new ht();
  #$ = document.createElement("span");
  // cssチェック・保存用
  static #x = {
    "text-align": 0,
    "text-align-last": 0,
    height: 0,
    width: 0,
    "padding-left": 0,
    "padding-right": 0,
    "padding-top": 0,
    "padding-bottom": 0
  };
  #a = new j();
  constructor() {
    super(), this.ctn.addChild(this.#l), this.#B.init(this.#G), this.ctn.addChild(this.#a), this.#a.name = "cntBtn", this.lay({ style: `width: ${E.stageW}px; height: ${E.stageH}px; font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif; color: white; font-size: 24px; line-height: 1.5; padding: 16px;`, in_style: "default", out_style: "default", back_clear: "true" });
  }
  destroy() {
    this.#p && (this.ctn.removeChild(this.#p).destroy(), this.#p = void 0), x.#o.recPagebreak(), this.#l.destroy();
  }
  static destroy() {
    x.#r = !1, x.#s = {}, x.#g = (t) => t;
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
    if (super.lay(t), V.setXY(this.ctn, t, this.ctn), t[":id_tag"] = this.name_.slice(0, -7), ht.setting(t), this.#W(t), this.#l.lay(t), "r_align" in t && (this.#P = t.r_align ?? ""), this.#z = E.isSafari ? this.#l.tategaki ? (s, i) => `text-align: start; height: ${i}em; padding-top: ${s}; padding-bottom: ${s};` : (s, i) => `text-align: start; width: ${i}em; padding-left: ${s}; padding-right: ${s};` : this.#l.tategaki ? (s) => `text-align: justify; text-align-last: justify; padding-top: ${s}; padding-bottom: ${s};` : (s) => `text-align: justify; text-align-last: justify; padding-left: ${s}; padding-right: ${s};`, E.isFirefox && (this.#X = this.#A), "r_style" in t)
      if (t.r_style) {
        const s = document.createElement("span");
        s.style.cssText = t.r_style;
        const i = s.style.length, n = this.#$.style;
        for (let o = 0; o < i; ++o) {
          const a = s.style[o];
          if (a in x.#x) {
            M.myTrace(`${a}は指定できません`, "W");
            continue;
          }
          const l = s.style[a];
          l && (n[a] = l);
        }
      } else this.#$.style.cssText = "";
    if ("alpha" in t) for (const s of this.#a.children) s.alpha = this.ctn.alpha;
    this.#C(t), this.#S(t);
    const e = this.#H(t, (s) => {
      s && q();
    });
    return e && X(), e;
  }
  #C(t) {
    const { in_style: e } = t;
    if (!e) return;
    const s = k.getChInStyle(e);
    if (!s) throw `存在しないin_style【${e}】です`;
    this.#k = e, this.#J = s.join;
  }
  #k = "";
  #J = !0;
  get width() {
    return this.#l.getWidth;
  }
  get height() {
    return this.#l.getHeight;
  }
  #S(t) {
    const { out_style: e } = t;
    if (!e) return;
    if (!k.getChOutStyle(e)) throw `存在しないout_style【${e}】です`;
    this.#D = e;
  }
  #D = "";
  #I = new _();
  #H(t, e) {
    if ("back_clear" in t)
      return S(t, "back_clear", !1) && (this.#h = 0, this.#f = 0, this.#u = !1, this.#w = ""), e(!1), !1;
    this.#f = g(t, "b_alpha", this.#f), this.#u = S(t, "b_alpha_isfixed", this.#u);
    const s = (this.#u ? 1 : Number(x.#e.getVal("sys:TextLayer.Back.Alpha"))) * this.#f;
    if (t.b_pic) {
      if (this.#w !== t.b_pic)
        return this.#w = t.b_pic, this.#p && (this.ctn.removeChild(this.#p), this.#p.destroy()), this.#I = new _(this.#w, this.ctn, (i) => {
          this.#p = i, i.name = "back(pic)", i.visible = s > 0, i.alpha = s, this.#l.setMySize(i.width, i.height), this.ctn.setChildIndex(i, 0), e(!0);
        }), this.#I.ret;
    } else "b_color" in t && (this.#h = xt(t, "b_color", 0), this.#p && (this.ctn.removeChild(this.#p), this.#p.destroy()), this.#w = "", this.ctn.addChildAt(
      (this.#p = new z()).beginFill(this.#h).lineStyle(void 0).drawRect(0, 0, this.#l.getWidth, this.#l.getHeight).endFill(),
      0
    ), this.#p.name = "back(color)");
    return this.#p && (this.#p.visible = s > 0, this.#p.alpha = s), e(!1), !1;
  }
  chgBackAlpha(t) {
    const e = this.#u ? this.#f : t * this.#f;
    this.#p instanceof z && (this.#p && (this.ctn.removeChild(this.#p), this.#p.destroy()), this.ctn.addChildAt(
      (this.#p = new z()).beginFill(this.#h).lineStyle(void 0).drawRect(0, 0, this.#l.getWidth, this.#l.getHeight).endFill(),
      0
    ), this.#p.name = "back(color)"), this.#p && (this.#p.visible = e > 0, this.#p.alpha = e);
  }
  #W(t) {
    "noffs" in t && (this.#b = t.noffs ?? "", this.#v = new RegExp(`[　${this.#b}]`)), "ffs" in t && (this.#N ??= "", this.#E = this.#N === "" ? () => "" : (e) => this.#v.test(e) ? "" : ` font-feature-settings: ${this.#N};`);
  }
  #N = "";
  #E = (t) => "";
  #b = "";
  #v = /[　]/;
  // Safariが全体に「font-feature-settings」した後、特定文字の「font-feature-settings: initial;」を受け付けてくれないのでわざわざ一つずつ指定
  static chgDoRec(t) {
    x.#g = t ? (e) => e : (e) => `<span class='offrec'>${e}</span>`;
  }
  static #g = (t) => t;
  isCur = !1;
  #z = () => "";
  #X = (t, e, s, i = "") => {
    if (!s) return ` style='${i}'`;
    const n = t.length * 2;
    if (n - e.length < 0) return ` style='text-align: ${s}; ${i}'`;
    let o = "";
    switch (s) {
      case "justify":
        o = this.#z("0", n);
        break;
      case "121":
        o = this.#z(`calc(${(n - e.length) / (e.length * 2)}em)`, n);
        break;
      case "even":
        o = this.#z(`calc(${(n - e.length) / (e.length + 1)}em)`, n);
        break;
      case "1ruby":
        o = this.#z("1em", n);
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
  #O = !1;
  #G = (t, e) => {
    x.#i.oCfg.debug.putCh && console.log(`🖊 文字表示 text:\`${t}\`(${t.charCodeAt(0).toString(16)}) ruby:\`${e}\` name:\`${this.name_}\``);
    const s = e.split("｜");
    let i = "";
    const [n, ...o] = s, a = o.join("｜");
    switch (s.length) {
      case 1:
        if (this.#O = !0, t === `
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
            this.#T = !1, this.#O = !0, i = this.#Q(t, a, n);
            break;
          case "gotxt":
            this.#K(), this.#O ? (this.isCur && x.#o.recText(
              this.#R.join("").replace(/^<ruby>&emsp;<rt>&emsp;<\/rt><\/ruby>(<br\/>)+/, "").replaceAll(/style='(anim\S+ \S+?;\s*)+/g, "style='").replaceAll(/( style=''| data-(add|arg|cmd)='.+?'|\n+|\t+)/g, "").replaceAll(/class='sn_ch .+?'/g, "class='sn_ch'").replaceAll("display: none;", "").replaceAll("class='offrec'", "style='display: none;'")
              // 囲んだ領域は履歴で非表示
            ), this.#l.goTxt(this.#R, this.#V === 0), this.#O = !1, this.#V = 0) : this.isCur && this.#l.noticeCompTxt();
            return;
          // breakではない
          case "add":
            {
              const l = JSON.parse(a), { style: c = "", wait: u = null } = l, { cl: h, sty: m } = this.#L(!0, u);
              this.#R.push(`<span${h} style='${m} display: inline; ${c}'>`), delete l.style, this.#Z(l);
            }
            return;
          // breakではない
          case "add_close":
            this.#R.push("</span>"), this.#K();
            return;
          // breakではない
          case "grp":
            this.#O = !0;
            {
              const l = JSON.parse(a);
              if (l.id ??= this.#R.length, l.id === "break") {
                this.#l.dispBreak(l);
                return;
              }
              this.#T = !1, l.delay = this.#V, l.r ??= "", l.style ??= "", l.r_style ??= "";
              const { cl: c, sty: u, lnk: h } = this.#L(!0, l.wait);
              i = `<span${c} style='${u} ${l.style}'><ruby><span data-cmd='grp' data-arg='${JSON.stringify(l)}'${h} style='${u} display: inline;'>&emsp;</span><rt${h}${this.#X(
                "　",
                l.r,
                this.#P,
                this.#$.style.cssText + (this.#_.at(-1)?.o.r_style ?? "") + l.r_style
              )}>${l.r}</rt></ruby></span>`;
            }
            break;
          case "tcy":
            this.#T = !1, this.#O = !0;
            {
              const { t: l, r: c = "", wait: u = null, style: h = "", r_style: m = "" } = JSON.parse(a);
              x.#e.doRecLog() && (this.#j += t + (e ? `《${e}》` : ""), this.#U += l);
              const f = E.isSafari ? c.replaceAll(/[A-Za-z0-9]/g, (y) => String.fromCharCode(y.charCodeAt(0) + 65248)) : c, { cl: r, sty: p, lnk: d } = this.#L(!0, u);
              i = `<span${r} style='${p}${this.#E(l)} ${h}'><ruby><span${d} style='${p} display: inline; text-combine-upright: all;'>${l}</span><rt${d}${this.#X(
                l,
                f,
                this.#P,
                this.#$.style.cssText + (this.#_.at(-1)?.o.r_style ?? "") + m
              )}>${f}</rt></ruby></span>`;
            }
            break;
          case "del":
            k.delBreak();
            return;
          // breakではない
          case "span":
            this.#O = !0, this.#M(JSON.parse(a));
            return;
          // breakではない
          case "link":
            this.#O = !0;
            {
              const l = JSON.parse(a);
              l[":link"] = " data-lnk='@'";
              const { cl: c, sty: u, curpos: h } = this.#L(!1, l.wait);
              this.#R.push(`<span${c} style='${u} display: inline; ${l.style ?? ""}' ${h} data-arg='${a}'>`), delete l.style, this.#M(l);
            }
            return;
          // breakではない
          case "endlink":
            this.#O = !0, this.#R.push("</span>"), this.#K();
            return;
          // breakではない
          default:
            this.#O = !0, i = this.#Q(t, e, this.#P);
        }
        break;
    }
    this.#R.push(x.#g(i));
  };
  #Q(t, e, s) {
    const i = t === " " ? "&nbsp;" : t === "　" ? "&emsp;" : t;
    x.#e.doRecLog() && (this.#j += i + (e ? `《${e}》` : ""), t !== " " && (this.#U += t));
    const { cl: n, sty: o, lnk: a } = this.#L(!0, null, t);
    return e ? `<span${n} style='${o} ${this.#E(t)}'><ruby>${// 文字個別に出現させるため以下にも ${cl} が必要
    Array.from(t).map((l, c) => `<span${n}${a} style='${c > 0 ? this.#L(!0, null, t).sty : o} display: inline;'>${l === " " ? "&nbsp;" : l === "　" ? "&emsp;" : l}</span>`).join("")}<rt${a}${this.#X(
      t,
      e,
      s,
      this.#$.style.cssText + (this.#_.at(-1)?.o.r_style ?? "")
    )}>${e}</rt></ruby></span>` : `<span${n} style='${o} ${this.#E(t)}'${a}>${i}</span>`;
  }
  #L(t, e, s = `
`) {
    const i = this.#J ? e ?? this.#_.at(0)?.o.wait ?? (x.#r ? x.#s[s.at(0) ?? ""] ?? 0 : J.msecChWait) : 0;
    x.#d.isSkipping ? this.#V = 0 : t && this.#J && (this.#V += Number(i));
    const n = `data-add='{"ch_in_style":"${this.#k}", "ch_out_style":"${this.#D}"}'`;
    return {
      cl: ` class='sn_ch sn_ch_in_${this.#k}'`,
      // TxtStage.goTxt()はこれ単位で文字出現させる
      sty: `animation-delay: ${this.#V}ms;${this.#_.at(-1)?.o.style ?? ""}`,
      // TxtStage.goTxt()はこれ単位で文字出現させる
      lnk: (this.#_.at(0)?.o[":link"] ?? "") + " " + n,
      curpos: n
    };
  }
  #V = 0;
  #T = !0;
  #R = [];
  #_ = [];
  #Z(t) {
    this.#_.push({
      o: t,
      r_align: this.#P,
      ch_in_style: this.#k,
      ch_out_style: this.#D
    }), "r_align" in t && (this.#P = t.r_align), this.#C(t), this.#S(t);
  }
  #K() {
    const t = this.#_.pop();
    t && (this.#P = t.r_align, this.#C({ in_style: t.ch_in_style }), this.#S({ out_style: t.ch_out_style }));
  }
  #M(t) {
    const e = this.#_.at(-1);
    if (!e) {
      this.#Z(t);
      return;
    }
    e.o = { ...e.o, ...t }, !t.style && !t.r_style && (e.o.style = "", e.o.r_style = ""), "r_align" in t && (this.#P = t.r_align), this.#C(t), this.#S(t);
  }
  click = () => !this.ctn.interactiveChildren || !this.ctn.visible ? !1 : this.#l.skipChIn();
  clearText() {
    this.ctn.addChild(this.#l = this.#l.reNew()), this.#V = 0, this.#T = !0, this.#R = [], this.#j = "", this.#U = "", x.#o.recPagebreak();
  }
  #j = "";
  #U = "";
  get pageText() {
    return this.#j.replace("《&emsp;》", "");
  }
  get pagePlainText() {
    return this.#U;
  }
  get enabled() {
    return this.ctn.interactiveChildren;
  }
  set enabled(t) {
    this.ctn.interactiveChildren = t;
  }
  addButton = (t) => new Promise((e) => {
    t.key = `btn=[${this.#a.children.length}] ` + this.name_, t[":id_tag"] = t.key.slice(0, -7), S(t, "hint_tate", this.#l.tategaki);
    const s = new D(t, x.#d, () => e(), () => this.canFocus());
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
    r_cssText: this.#$.style.cssText,
    r_align: this.#P,
    // バック
    b_do: this.#p === void 0 ? void 0 : this.#p instanceof O ? "Sprite" : "Graphics",
    b_pic: this.#w,
    b_color: this.#h,
    b_alpha: this.#f,
    b_alpha_isfixed: this.#u,
    ffs: this.#N,
    txs: this.#l.record(),
    strNoFFS: this.#b,
    btns: this.#a.children.map((t) => t.name)
  });
  playback(t, e) {
    super.playback(t, e), this.enabled = t.enabled, this.#$.style.cssText = t.r_cssText, this.#P = t.r_align, this.cvsResize(), this.#W(t), this.#l.playback(t.txs), this.#f = t.b_alpha, this.#u = t.b_alpha_isfixed, e = [
      e,
      new Promise((s) => {
        const i = t.b_do ? t.b_do === "Sprite" ? { b_pic: t.b_pic } : { b_color: t.b_color } : { b_pic: "" };
        i.b_alpha = t.b_alpha, i.b_alpha_isfixed = t.b_alpha_isfixed, this.#H(i, (n) => {
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
    return this.#G("", "gotxt｜"), super.dump() + `, "enabled":"${this.enabled}", ${this.#l.dump()}, "b_pic":"${this.#w}", "b_color":"${this.#h}", "b_alpha":${this.#f}, "b_alpha_isfixed":"${this.#u}", "width":${this.#l.getWidth}, "height":${this.#l.getHeight}, "pixi_obj":[${this.ctn.children.map((t) => `{"class":"${t instanceof O ? "Sprite" : t instanceof z ? "Graphics" : t instanceof j ? "Container" : "?"}", "name":"${t.name}", "alpha":${t.alpha}, "x":${t.x}, "y":${t.y}, "visible":"${t.visible}"}`).join(",")}], "button":[${this.#a.children.map((t) => t.children[0]?.name ?? "{}").join(",")}]`;
  }
}
class $ {
  constructor(t, e, s) {
    this.appPixi = e, this.val = s, t.add_frame = (i) => this.#d(i), t.let_frame = (i) => this.#f(i), t.set_frame = (i) => this.#u(i), t.frame = (i) => this.#w(i), t.tsy_frame = (i) => this.#l(i);
  }
  static #i;
  static #e;
  static #n;
  static init(t, e, s) {
    $.#i = t, $.#e = e, $.#n = s;
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
      this.#c[t] = e.display !== "none", e.display = "none";
  }
  #c = /* @__PURE__ */ Object.create(null);
  restoreAllFrame() {
    for (const [t, e] of Object.entries(this.#c)) {
      const s = this.#t[t];
      s && (s.style.display = e ? "inline" : "none");
    }
    this.#c = /* @__PURE__ */ Object.create(null);
  }
  //	HTMLフレーム
  // フレーム追加
  #d(t) {
    const { id: e, src: s, alpha: i = 1, scale_x: n = 1, scale_y: o = 1, rotate: a = 0 } = t;
    if (!e) throw "idは必須です";
    if (!s) throw "srcは必須です";
    const l = "const.sn.frm." + e;
    if (this.val.getVal(`tmp:${l}`)) throw `frame【${e}】はすでにあります`;
    const c = S(t, "visible", !0), u = t.b_color ? ` background-color: ${t.b_color};` : "", h = this.#r(t);
    $.#n.cvs.insertAdjacentHTML("beforebegin", `<iframe id="${e}" style="opacity: ${i}; ${u} position: absolute; left:${$.#e.ofsLeft4elm + h.x * $.#e.cvsScale}px; top: ${$.#e.ofsTop4elm + h.y * $.#e.cvsScale}px; z-index: 1; border: 0px; overflow: hidden; display: ${c ? "inline" : "none"}; transform: scale(${n}, ${o}) rotate(${a}deg);" width="${h.width * $.#e.cvsScale}" height="${h.height * $.#e.cvsScale}"></iframe>`), X();
    const m = $.#i.searchPath(s, G.HTML), f = new Y().add({ name: s, url: m, xhrType: I.XHR_RESPONSE_TYPE.TEXT });
    return $.#e.arg.crypto && f.use(async (r, p) => {
      try {
        r.data = await $.#e.dec(r.extension, r.data);
      } catch (d) {
        $.#n.errScript(`[add_frame]Html ロード失敗です src:${r.name} ${d}`, !1);
      }
      p();
    }), f.load((r, p) => {
      const d = document.getElementById(e);
      this.#t[e] = d, this.#m[e] = !1;
      const y = m.lastIndexOf("/") + 1, b = m.slice(0, y), C = b.slice(0, y);
      d.srcdoc = String(p[s]?.data).replace("sn_repRes();", "").replaceAll(
        /\s(?:src|href)=(["'])(\S+?)\1/g,
        // 【\s】が大事、data-src弾く
        (v, w, N) => N.startsWith("../") ? v.replace("../", C) : v.replace("./", "").replace(w, w + b)
      ), d.srcdoc.includes("true/*WEBP*/;") && (d.srcdoc = d.srcdoc.replaceAll(
        /data-src="(.+?\.)(?:jpe?g|png)/g,
        (v, w) => `data-src="${w}webp`
      )), d.onload = () => {
        this.val.setVal_Nochk("tmp", l, !0), this.val.setVal_Nochk("tmp", l + ".alpha", i), this.val.setVal_Nochk("tmp", l + ".x", h.x), this.val.setVal_Nochk("tmp", l + ".y", h.y), this.val.setVal_Nochk("tmp", l + ".scale_x", n), this.val.setVal_Nochk("tmp", l + ".scale_y", o), this.val.setVal_Nochk("tmp", l + ".rotate", a), this.val.setVal_Nochk("tmp", l + ".width", h.width), this.val.setVal_Nochk("tmp", l + ".height", h.height), this.val.setVal_Nochk("tmp", l + ".visible", c);
        const v = d.contentWindow;
        this.#o.resvFlameEvent(v), v.sn_repRes?.((w) => $.#s(w.dataset.src ?? "", w)), q();
      };
    }), !0;
  }
  #m = {};
  getFrmDisabled(t) {
    return this.#m[t];
  }
  #r(t) {
    const e = { ...t }, s = $.#e.resolution;
    return new DOMRect(
      g(e, "x", 0) * s,
      g(e, "y", 0) * s,
      g(e, "width", E.stageW) * s,
      g(e, "height", E.stageH) * s
    );
  }
  static #s(t, e, s) {
    const i = this.#h[t];
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
    const [o = "", a = ""] = t.split("?"), l = $.#i.searchPath(o, G.SP_GSM), c = new Y().add({ name: t, url: l, xhrType: I.XHR_RESPONSE_TYPE.BUFFER });
    $.#e.arg.crypto && l.endsWith(".bin") && c.use(async (u, h) => {
      try {
        const m = await $.#e.decAB(u.data);
        if (u.extension !== "bin") {
          h();
          return;
        }
        u.data = m, m instanceof HTMLImageElement && (u.type = I.TYPE.IMAGE);
      } catch (m) {
        $.#n.errScript(`FrameMng loadPic ロード失敗です fn:${u.name} ${m}`, !1);
      }
      h();
    }), c.load((u, h) => {
      for (const [m, { data: { src: f } }] of Object.entries(h)) {
        const r = this.#h[m] = f + (f.startsWith("blob:") || f.startsWith("data:") ? "" : a ? "?" + a : ""), p = this.#y[m];
        if (p) for (const d of p)
          d.src = r, s && (d.onload = () => s(d));
        delete this.#y[m];
      }
    });
  }
  static #y = {};
  static #h = {};
  cvsResize() {
    for (const [t, e] of Object.entries(this.#t)) {
      const s = "const.sn.frm." + t, i = Number(this.val.getVal(s + ".x")), n = Number(this.val.getVal(s + ".y")), o = Number(this.val.getVal(s + ".width")), a = Number(this.val.getVal(s + ".height"));
      e.style.left = `${$.#e.ofsLeft4elm + i * $.#e.cvsScale}px`, e.style.top = `${$.#e.ofsTop4elm + n * $.#e.cvsScale}px`, e.width = String(o * $.#e.cvsScale), e.height = String(a * $.#e.cvsScale);
    }
  }
  // フレーム変数を取得
  #f(t) {
    const { id: e, var_name: s } = t;
    if (!e) throw "idは必須です";
    const i = document.getElementById(e);
    if (!i) throw `id【${e}】はフレームではありません`;
    const n = "const.sn.frm." + e;
    if (!this.val.getVal(`tmp:${n}`)) throw `frame【${e}】が読み込まれていません`;
    if (!s) throw "var_nameは必須です";
    const o = i.contentWindow;
    if (!o.hasOwnProperty(s)) throw `frame【${e}】に変数/関数【${s}】がありません。変数は var付きにして下さい`;
    const a = o[s];
    return this.val.setVal_Nochk(
      "tmp",
      n + "." + s,
      S(t, "function", !1) ? a() : a
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
  #p = 1;
  #w(t) {
    const { id: e } = t;
    if (!e) throw "idは必須です";
    const s = document.getElementById(e);
    if (!s) throw `id【${e}】はフレームではありません`;
    const i = "const.sn.frm." + e;
    if (!this.val.getVal("tmp:" + i)) throw `frame【${e}】が読み込まれていません`;
    const n = s.style;
    if (S(t, "float", !1) ? n.zIndex = `${++this.#p}` : "index" in t ? n.zIndex = `${g(t, "index", 0)}` : t.dive && (n.zIndex = `-${++this.#p}`), "alpha" in t) {
      const a = n.opacity = String(t.alpha);
      this.val.setVal_Nochk("tmp", i + ".alpha", a);
    }
    const o = this.#r(t);
    if (("x" in t || "y" in t) && (n.left = `${$.#e.ofsLeft4elm + o.x * $.#e.cvsScale}px`, n.top = `${$.#e.ofsTop4elm + o.y * $.#e.cvsScale}px`, this.val.setVal_Nochk("tmp", i + ".x", o.x), this.val.setVal_Nochk("tmp", i + ".y", o.y)), "scale_x" in t || "scale_y" in t || "rotate" in t) {
      const a = g(t, "scale_x", 1), l = g(t, "scale_y", 1), c = g(t, "rotate", 0);
      n.transform = `scale(${a}, ${l}) rotate(${c}deg)`, this.val.setVal_Nochk("tmp", i + ".scale_x", a), this.val.setVal_Nochk("tmp", i + ".scale_y", l), this.val.setVal_Nochk("tmp", i + ".rotate", c);
    }
    if ("width" in t && (s.width = String(o.width * $.#e.cvsScale), this.val.setVal_Nochk("tmp", i + ".width", o.width)), "height" in t && (s.height = String(o.height * $.#e.cvsScale), this.val.setVal_Nochk("tmp", i + ".height", o.height)), "visible" in t) {
      const a = S(t, "visible", !0);
      n.display = a ? "inline" : "none", this.val.setVal_Nochk("tmp", i + ".visible", a);
    }
    if ("b_color" in t && (n.backgroundColor = t.b_color), "disabled" in t) {
      const a = this.#m[e] = S(t, "disabled", !0), l = s.contentDocument.body;
      for (const c of [
        ...Array.from(l.getElementsByTagName("input")),
        ...Array.from(l.getElementsByTagName("select"))
      ]) c.disabled = a;
    }
    return !1;
  }
  // フレームをトゥイーン開始
  #l(t) {
    const { id: e, alpha: s, x: i, y: n, scale_x: o, scale_y: a, rotate: l, width: c, height: u } = t;
    if (!e) throw "idは必須です";
    const h = document.getElementById(e);
    if (!h) throw `id【${e}】はフレームではありません`;
    const m = "const.sn.frm." + e;
    if (!this.val.getVal(`tmp:${m}`, 0)) throw `frame【${e}】が読み込まれていません`;
    const f = {};
    s && (f.a = h.style.opacity), (i || n || o || a || l) && (f.x = Number(this.val.getVal(`tmp:${m}.x`)), f.y = Number(this.val.getVal(`tmp:${m}.y`)), f.sx = Number(this.val.getVal(`tmp:${m}.scale_x`)), f.sy = Number(this.val.getVal(`tmp:${m}.scale_y`)), f.r = Number(this.val.getVal(`tmp:${m}.rotate`))), c && (f.w = this.val.getVal(`tmp:${m}.width`)), u && (f.h = this.val.getVal(`tmp:${m}.height`));
    const r = F.cnvTweenArg(t, f);
    let p = () => {
    };
    s && (g(r, "alpha", 0), p = () => {
      h.style.opacity = f.a, this.val.setVal_Nochk("tmp", "alpha", f.a);
    });
    let d = () => {
    };
    const y = this.#r(r);
    (i || n || o || a || l) && (y.x, y.y, g(r, "scale_x", 1), g(r, "scale_y", 1), g(r, "rotate", 0), d = () => {
      h.style.left = $.#e.ofsLeft4elm + f.x * $.#e.cvsScale + "px", h.style.top = $.#e.ofsTop4elm + f.y * $.#e.cvsScale + "px", h.style.transform = `scale(${f.sx}, ${f.sy}) rotate(${f.r}deg)`, this.val.setVal_Nochk("tmp", m + ".x", f.x), this.val.setVal_Nochk("tmp", m + ".y", f.y), this.val.setVal_Nochk("tmp", m + ".scale_x", f.sx), this.val.setVal_Nochk("tmp", m + ".scale_y", f.sy), this.val.setVal_Nochk("tmp", m + ".rotate", f.r);
    });
    let b = () => {
    };
    c && (y.width, b = () => {
      h.width = f.w * $.#e.cvsScale + "px", this.val.setVal_Nochk("tmp", m + ".width", f.w);
    });
    let C = () => {
    };
    return u && (y.height, C = () => {
      h.height = f.h * $.#e.cvsScale + "px", this.val.setVal_Nochk("tmp", m + ".height", f.h);
    }), this.appPixi.stage.interactive = !1, F.tween(`frm
${e}`, t, f, F.cnvTweenArg(t, f), () => {
      p(), d(), b(), C();
    }, () => this.appPixi.stage.interactive = !0, () => {
    }), !1;
  }
}
class J {
  //MARK: コンストラクタ
  constructor(t, e, s, i, n, o, a, l, c) {
    this.cfg = t, this.hTag = e, this.appPixi = s, this.val = i, this.main = n, this.scrItr = o, this.sys = a, this.sndMng = l, this.prpPrs = c;
    const u = () => {
      if (a.cvsResize(), this.cvsResizeDesign(), this.#r) for (const r of this.#C)
        this.#a[r].fore.cvsResizeChildren();
      else for (const r of this.#C)
        this.#a[r].fore.cvsResize();
      this.#o.cvsResize(), this.#h.cvsResize();
    };
    if (E.isMobile)
      this.#c.add(globalThis, "orientationchange", u, { passive: !0 });
    else {
      let r;
      this.#c.add(globalThis, "resize", () => {
        r || (r = setTimeout(() => {
          r = void 0, u();
        }, 1e3 / 60 * 10));
      }, { passive: !0 });
    }
    a.cvsResize(), x.init(t, e, i, this, (r) => this.#a[r.layname].fore === r, s), H.init(n, t, s, a, l, i), $.init(t, a, n), D.init(t), this.#o = new $(e, s, i), a.hFactoryCls.grp = () => new H(), a.hFactoryCls.txt = () => new x(), e.loadplugin = (r) => this.#$(r), e.snapshot = (r) => this.#p(r), this.#w = this.sys.isApp ? this.#l : this.#B, e.add_lay = (r) => this.#x(r), e.clear_lay = (r) => this.#I(r), e.finish_trans = () => F.finish_trans(), e.lay = (r) => this.#S(r), e.trans = (r) => this.#v(r), e.wt = (r) => F.wt(r), e.quake = (r) => this.#P(r), e.stop_quake = e.finish_trans, e.wq = (r) => e.wt(r), e.pause_tsy = (r) => F.pause_tsy(r), e.resume_tsy = (r) => F.resume_tsy(r), e.stop_tsy = (r) => F.stop_tsy(r), e.tsy = (r) => this.#A(r), e.wait_tsy = (r) => F.wait_tsy(r), e.add_filter = (r) => this.#O(r), e.clear_filter = (r) => this.#Q(r), e.enable_filter = (r) => this.#L(r), e.ch = (r) => this.#R(r), e.clear_text = (r) => this.#et(r), e.current = (r) => this.#K(r), e.endlink = (r) => this.#st(r), e.er = (r) => this.#it(r), e.graph = (r) => this.#nt(r), e.link = (r) => this.#at(r), e.r = (r) => this.#ot(r), e.rec_ch = (r) => this.#tt(r), e.rec_r = (r) => this.#lt(r), e.reset_rec = (r) => this.#rt(r), e.ruby2 = (r) => this.#ht(r), e.span = (r) => this.#ct(r), e.tcy = (r) => this.#dt(r), e.add_face = (r) => _.add_face(r), e.wv = (r) => _.wv(r), e.dump_lay = (r) => this.#ft(r), e.enable_event = (r) => this.#pt(r), e.button = (r) => this.#ut(r), t.existsBreakline && (this.breakLine = (r) => {
      delete r.visible, r.id = "break", r.pic = "breakline";
      const p = encodeURIComponent(JSON.stringify(r));
      this.#u("grp｜" + p);
    }), t.existsBreakpage && (this.breakPage = (r) => {
      delete r.visible, r.id = "break", r.pic = "breakpage";
      const p = encodeURIComponent(JSON.stringify(r));
      this.#u("grp｜" + p);
    }), this.#t = Ft(String(t.oCfg.init.bg_color));
    const h = new z();
    h.beginFill(this.#t, 1).lineStyle(0, this.#t).drawRect(0, 0, E.stageW, E.stageH).endFill(), this.#e.addChild(h.clone()), this.#n.addChild(h), this.#n.visible = !1, this.#e.name = "page:A", this.#n.name = "page:B", this.#i = s.stage, this.#i.addChild(this.#n), this.#i.addChild(this.#e), this.#i.addChild(this.#N), this.#i.addChild(this.#b), this.#i.name = "stage";
    const m = (r, p) => {
      this.#f(Number(p));
    };
    m("", i.getVal("sys:TextLayer.Back.Alpha", 1)), i.defValTrg("sys:TextLayer.Back.Alpha", m);
    const f = (r, p) => D.fontFamily = p;
    f("", i.getVal("tmp:sn.button.fontFamily", D.fontFamily)), i.defValTrg("tmp:sn.button.fontFamily", f), i.defTmp("const.sn.log.json", () => JSON.stringify(
      (this.#F.text = this.#F.text?.replaceAll("</span><span class='sn_ch'>", "") ?? "") ? [...this.#Y, this.#F] : this.#Y
    )), i.defTmp("const.sn.last_page_text", () => this.currentTxtlayFore?.pageText ?? ""), i.defTmp("const.sn.last_page_plain_text", () => this.currentTxtlayFore?.pagePlainText ?? ""), E.isDbg && (ct.init(s, a, o, c, t, this.#a), this.cvsResizeDesign = () => ct.cvsResizeDesign(), a.addHook((r, p) => {
      this.#d[r]?.(r, p) && delete this.#d[r];
    }));
  }
  #i;
  #e = new j();
  #n = new j();
  #o;
  #t;
  #c = new wt();
  cvsResizeDesign() {
  }
  #d = {
    attach: (t) => !1,
    continue: (t) => !1,
    disconnect: (t) => !1,
    _enterDesign: (t) => {
      for (const e of this.#C) {
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
      (this.#y = new z()).beginFill(e).lineStyle(0, e).drawRect(0, 0, E.stageW, E.stageH).endFill()
    );
  }
  #h;
  setEvtMng(t) {
    this.#h = t, this.#o.setEvtMng(t), _.setEvtMng(t), F.init(t, this.appPixi);
  }
  destroy() {
    for (const t of Object.values(this.#a)) t.destroy();
    this.#c.clear(), H.destroy(), ht.destroy(), k.destroy(), x.destroy(), this.#o.destroy(), F.destroy(), J.#T = 10;
  }
  // 既存の全文字レイヤの実際のバック不透明度、を再計算
  #f(t) {
    for (const e of this.#g()) {
      const s = this.#a[e];
      s.fore instanceof x && (s.fore.chgBackAlpha(t), s.back.chgBackAlpha(t));
    }
  }
  #u = (t, e = this.currentTxtlayForeNeedErr, s = !0) => e.tagCh("｜&emsp;《" + t + "》");
  goTxt = () => {
  };
  breakLine = (t) => {
  };
  breakPage = (t) => {
  };
  clearBreak() {
    this.currentTxtlayFore && (this.clearBreak = () => this.#u("del｜break"), this.clearBreak());
  }
  clickTxtLay() {
    return this.currentTxtlayFore ? this.#g().some((t) => {
      const e = this.#a[t].fore;
      return e instanceof x && e.click();
    }) : !1;
  }
  //	//	システム
  //MARK: スナップショット
  #p(t) {
    const e = t.fn ? t.fn.startsWith(Ot) ? t.fn : `${mt + t.fn + yt("-", "_", "", "_")}.png` : `${mt}snapshot${yt("-", "_", "", "_")}.png`, s = this.cfg.searchPath(e), i = g(t, "width", E.stageW), n = g(t, "height", E.stageH);
    return this.#w(t, s, i, n);
  }
  #w = () => !1;
  #l(t, e, s, i) {
    if (this.#o.hideAllFrame(), X(), !("layer" in t))
      return this.sys.capturePage(e, s, i, () => {
        this.#o.restoreAllFrame(), q();
      }), !0;
    const n = {};
    for (const o of this.#g()) {
      const a = this.#a[o].fore.ctn;
      n[o] = a.visible, a.visible = !1;
    }
    for (const o of this.#g(t.layer)) this.#a[o].fore.ctn.visible = !0;
    return this.sys.capturePage(e, s, i, () => {
      for (const [o, a] of Object.entries(n))
        this.#a[o].fore.ctn.visible = a;
      this.#o.restoreAllFrame(), q();
    }), !0;
  }
  #B(t, e, s, i) {
    X();
    const n = xt(t, "b_color", this.#t), o = Bt({
      width: s,
      height: i,
      backgroundAlpha: n > 16777216 && e.endsWith(".png") ? 0 : 1,
      antialias: S(t, "smoothing", !1),
      preserveDrawingBuffer: !0,
      backgroundColor: n & 16777215,
      autoDensity: !0
    }), a = t.page !== "back" ? "fore" : "back";
    return Promise.allSettled(
      this.#g(t.layer).map((l) => new Promise(
        (c) => this.#a[l][a].snapshot(o, c)
      ))
    ).then(async () => {
      const l = K.create({ width: o.width, height: o.height });
      o.render(this.#i, { renderTexture: l }), await this.sys.savePic(
        e,
        o.plugins.extract.base64(l)
      ), l.destroy();
      for (const c of this.#g(t.layer)) this.#a[c][a].snapshot_end();
      o.destroy(!0), q();
    }), !0;
  }
  //MARK: プラグインの読み込み
  #$(t) {
    const { fn: e } = t;
    if (!e) throw "fnは必須です";
    const s = S(t, "join", !0);
    if (s && X(), e.endsWith(".css"))
      (async () => {
        const i = await fetch(e);
        if (!i.ok) throw new Error("Network response was not ok.");
        st(await i.text()), s && q();
      })();
    else throw "サポートされない拡張子です";
    return s;
  }
  //	//	レイヤ共通
  //MARK: レイヤを追加する
  #x(t) {
    const { layer: e, class: s } = t;
    if (!e) throw "layerは必須です";
    if (e.includes(",")) throw "layer名に「,」は使えません";
    if (e in this.#a) throw `layer【${e}】はすでにあります`;
    if (!s) throw "clsは必須です";
    const i = { isWait: !1 };
    switch (this.#a[e] = new Q(e, s, this.#e, this.#n, t, this.sys, this.val, i), this.#C.push(e), s) {
      case "txt":
        this.#k || (this.#U = () => {
        }, this.#_ = this.#Z, this.#K = this.#M, this.hTag.current({ layer: e }), this.goTxt = () => {
          this.#h.isSkipping ? J.#T = 0 : this.setNormalChWait();
          for (const n of this.#g()) {
            const o = this.#a[n].fore;
            o instanceof x && this.#u("gotxt｜", o, !1);
          }
        }), this.val.setVal_Nochk(
          "save",
          "const.sn.layer." + (e ?? this.#k) + ".enabled",
          !0
        );
        break;
      case "grp":
        if (this.#J) break;
        this.#J = e;
        break;
    }
    return this.scrItr.recodeDesign(t), i.isWait;
  }
  #a = {};
  // しおりLoad時再読込
  #C = [];
  // 最適化用
  #k = "";
  #J = "";
  #S(t) {
    const e = this.#q(t), s = this.#a[e], i = s.back.ctn, n = s.fore.ctn;
    if (S(t, "float", !1))
      this.#n.setChildIndex(i, this.#n.children.length - 1), this.#e.setChildIndex(n, this.#e.children.length - 1), this.#D();
    else if (t.index)
      g(t, "index", 0) && (this.#n.setChildIndex(i, t.index), this.#e.setChildIndex(n, t.index), this.#D());
    else if (t.dive) {
      const { dive: o } = t;
      let a = 0;
      if (e === o) throw "[lay] 属性 layerとdiveが同じ【" + o + "】です";
      const l = this.#a[o];
      if (!l) throw "[lay] 属性 dive【" + o + "】が不正です。レイヤーがありません";
      const c = l.back, u = l.fore, h = this.#n.getChildIndex(c.ctn), m = this.#e.getChildIndex(u.ctn);
      a = h < m ? h : m, a > this.#n.getChildIndex(i) && --a, this.#e.setChildIndex(n, a), this.#n.setChildIndex(i, a), this.#D();
    }
    return t[":id_tag"] = s.fore.name.slice(0, -7), this.scrItr.recodeDesign(t), s.lay(t);
  }
  #D() {
    this.#C = this.#X();
  }
  //MARK: レイヤ設定の消去
  #I(t) {
    return this.#z(t, (e) => {
      const s = this.#a[this.#q({ layer: e })];
      if (t.page === "both") {
        s.fore.clearLay(t), s.back.clearLay(t);
        return;
      }
      s.getPage(t).clearLay(t);
    }), !1;
  }
  //===================================================
  //MARK: WebGL フラグメントシェーダー GLSL
  static #H = (
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
  #W = K.create({
    width: E.stageW,
    height: E.stageH
  });
  #N = new O(this.#W);
  #E = K.create({
    width: E.stageW,
    height: E.stageH
  });
  #b = new O(this.#E);
  //MARK: ページ裏表を交換
  #v(t) {
    F.finish_trans(), this.#h.hideHint();
    const { layer: e } = t, s = /* @__PURE__ */ new Set(), i = [];
    for (const w of this.#g(e))
      s.add(w), i.push(this.#a[w].fore);
    const n = async () => {
      [this.#e, this.#n] = [this.#n, this.#e];
      const w = [];
      for (const [N, R] of Object.entries(this.#a)) {
        if (s.has(N)) {
          R.transPage(w);
          continue;
        }
        const { fore: { ctn: T }, back: { ctn: P } } = R, B = this.#e.getChildIndex(P);
        this.#e.removeChild(P), this.#n.removeChild(T), this.#e.addChildAt(T, B), this.#n.addChildAt(P, B);
      }
      await Promise.allSettled(w), this.#e.visible = !0, this.#n.visible = !1, this.#N.visible = !1, this.#b.visible = !1;
    };
    if (this.#b.filters = [], this.#b.alpha = 1, g(t, "time", 0) === 0 || this.#h.isSkipping)
      return n(), !1;
    let a = [];
    const l = [];
    for (const w of this.#g()) {
      const N = this.#a[w][s.has(w) ? "back" : "fore"];
      N.ctn.visible && a.push(N.ctn), l.push(N);
    }
    const { ticker: c, renderer: u } = this.appPixi;
    u.render(this.#n, { renderTexture: this.#W });
    let h = () => {
      for (const w of a) u.render(
        w,
        { renderTexture: this.#W, clear: !1 }
      );
    };
    if (!l.some((w) => w.containMovement)) {
      const w = h;
      h = () => {
        h = () => {
        }, w();
      };
    }
    const m = () => u.render(this.#e, { renderTexture: this.#E });
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
      h(), this.#N.visible = !0, f(), this.#b.visible = !0;
    }, { glsl: p, rule: d } = t, y = () => {
      c.remove(r), n();
    };
    if (!p && !d)
      return F.tween(F.TW_INT_TRANS, t, this.#b, { alpha: 0 }, () => {
      }, y, () => {
      }), c.add(r), !1;
    const b = {
      rule: W.EMPTY,
      vague: g(t, "vague", 0.04),
      tick: 0
    };
    this.#b.filters = [new It(
      void 0,
      p ?? J.#H,
      b
    )];
    const C = F.tween(F.TW_INT_TRANS, t, b, { tick: 1 }, () => {
    }, y, () => {
    }, !d);
    if (!d)
      return c.add(r), !1;
    const v = new _(d, void 0, (w) => {
      b.rule = w.texture, w.destroy(), v.destroy(), C.start(), c.add(r);
    });
    return !1;
  }
  #g(t = "") {
    return t ? t.split(",") : this.#C;
  }
  #z(t, e) {
    const s = this.#g(t.layer);
    for (const i of s) {
      const n = this.#a[i];
      if (!n) throw "存在しないlayer【" + i + "】です";
      e(i, n);
    }
    return s;
  }
  #X(t = "") {
    return this.#g(t).sort((e, s) => {
      const i = this.#e.getChildIndex(this.#a[e].fore.ctn), n = this.#e.getChildIndex(this.#a[s].fore.ctn);
      return i < n ? -1 : i > n ? 1 : 0;
    });
  }
  setAllStyle2TxtLay(t) {
    const e = this.#g();
    for (const s of e) {
      const i = this.#a[s].fore;
      i instanceof x && i.lay({ style: t });
    }
  }
  //MARK: 画面を揺らす
  #P(t) {
    if (F.finish_trans(), g(t, "time", NaN) === 0 || this.#h.isSkipping) return !1;
    const { layer: s } = t, i = [];
    for (const u of this.#g(s))
      i.push(this.#a[u].fore.ctn);
    this.#E.resize(E.stageW, E.stageH);
    const n = () => {
      this.#e.visible = !0;
      const { renderer: u } = this.appPixi;
      for (const h of i) u.render(
        h,
        { renderTexture: this.#E, clear: !1 }
      );
      this.#e.visible = !1;
    };
    this.#b.visible = !0, this.#b.alpha = 1;
    const o = L(g(t, "hmax", 10)), a = L(g(t, "vmax", 10)), l = o === 0 ? () => {
    } : () => this.#b.x = Math.round(Math.random() * o * 2) - o, c = a === 0 ? () => {
    } : () => this.#b.y = Math.round(Math.random() * a * 2) - a;
    return this.#b.filters = [], F.tween(F.TW_INT_TRANS, t, this.#b, { x: 0, y: 0 }, () => {
      l(), c();
    }, () => {
      this.appPixi.ticker.remove(n), this.#e.visible = !0, this.#b.visible = !1, this.#b.x = 0, this.#b.y = 0;
    }, () => {
    }), this.appPixi.ticker.add(n), !1;
  }
  //MARK: トゥイーン開始
  #A(t) {
    const { layer: e, render: s, name: i } = t;
    if (!e) throw "layerは必須です";
    const n = this.#a[this.#q(t)], o = n.fore;
    let a = () => {
    };
    s && !this.#h.isSkipping && (o.renderStart(), a = () => o.renderEnd());
    const l = F.cnvTweenArg(t, o), c = S(t, "arrive", !1), u = S(t, "backlay", !1), h = n.back.ctn;
    return F.tween(i ?? e, t, o, F.cnvTweenArg(t, o), () => {
    }, a, () => {
      if (c && Object.assign(o, l), u) for (const m of Object.keys(F.hMemberCnt)) h[m] = o[m];
    }), "filter" in t && (o.ctn.filters = [V.bldFilters(t)], o.aFltHArg = [t]), !1;
  }
  //MARK: フィルター追加
  #O(t) {
    return F.finish_trans(), this.#z(t, (e) => {
      const s = this.#a[this.#q({ layer: e })];
      if (t.page === "both") {
        this.#G(s.fore, t), this.#G(s.back, t);
        return;
      }
      const i = s.getPage(t);
      this.#G(i, t);
    }), !1;
  }
  #G(t, e) {
    const s = t.ctn;
    s.filters ??= [], s.filters = [...s.filters, V.bldFilters(e)], t.aFltHArg.push(e);
  }
  //MARK: フィルター全削除
  #Q(t) {
    return this.#z(t, (e) => {
      const s = this.#a[this.#q({ layer: e })];
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
  #L(t) {
    return this.#z(t, (e) => {
      const s = this.#a[this.#q({ layer: e })];
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
    const i = L(g(e, "index", 0)), n = s.filters.length;
    if (n <= i) throw `フィルターの個数（${n}）を越えています`;
    t.aFltHArg[i].enabled = s.filters[i].enabled = S(e, "enabled", !0);
  }
  //	// 文字・文字レイヤ
  static #T = 10;
  static get msecChWait() {
    return J.#T;
  }
  //MARK: 文字を追加する
  #R(t) {
    const { text: e } = t;
    if (!e) throw "textは必須です";
    const s = this.#_(t);
    delete t.text, this.setNormalChWait(), this.#h.isSkipping ? t.wait = 0 : "wait" in t && g(t, "wait", NaN);
    const i = encodeURIComponent(JSON.stringify(t));
    this.#u("add｜" + i, s);
    const n = S(t, "record", !0), o = this.val.doRecLog();
    return n || this.val.setVal_Nochk("save", "sn.doRecLog", n), s.tagCh(e.replaceAll("[r]", `
`)), this.val.setVal_Nochk("save", "sn.doRecLog", o), this.#u("add_close｜", s), !1;
  }
  #_ = (t) => {
    throw this.#U(), 0;
  };
  #Z(t) {
    const e = this.#q(t, this.#k), i = this.#a[e].getPage(t);
    if (!(i instanceof x)) throw e + "はTxtLayerではありません";
    return i;
  }
  setNormalChWait() {
    J.#T = this.scrItr.normalWait;
  }
  //MARK: 操作対象のメッセージレイヤの指定
  #K = (t) => {
    throw this.#U(), 0;
  };
  #M(t) {
    const { layer: e } = t;
    if (!e) throw "[current] layerは必須です";
    const s = this.#a[e];
    if (!s || !(s.getPage(t) instanceof x)) throw `${e}はTxtLayerではありません`;
    this.#j = s, this.recPagebreak(), this.#k = e, this.val.setVal_Nochk("save", "const.sn.mesLayer", e);
    for (const i of this.#g()) {
      const n = this.#a[i];
      n.fore instanceof x && (n.fore.isCur = n.back.isCur = i === e);
    }
    return !1;
  }
  get currentTxtlayForeNeedErr() {
    return this.#U(), this.currentTxtlayFore;
  }
  get currentTxtlayFore() {
    return this.#j ? this.#j.fore : null;
  }
  #j;
  // カレントテキストレイヤ
  #U = () => {
    throw "文字レイヤーがありません。文字表示や操作する前に、[add_lay layer=（レイヤ名） class=txt]で文字レイヤを追加して下さい";
  };
  #q(t, e = "") {
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
    const e = this.#_(t);
    return t.layer === this.#k && t.page === "fore" && this.recPagebreak(), e.clearText(), !1;
  }
  //MARK: ハイパーリンクの終了
  #st(t) {
    return this.#u("endlink｜", this.#_(t)), !1;
  }
  //MARK: ページ両面の文字消去
  #it(t) {
    return S(t, "rec_page_break", !0) && this.recPagebreak(), this.#j && (this.#j.fore.clearLay(t), this.#j.back.clearLay(t)), !1;
  }
  //MARK: インライン画像表示
  #nt(t) {
    if (!t.pic) throw "[graph] picは必須です";
    const e = encodeURIComponent(JSON.stringify(t));
    return this.#u("grp｜" + e, this.#_(t)), !1;
  }
  //MARK: ハイパーリンク
  #at(t) {
    if (!t.fn && !t.label && !t.url) throw "fn,label,url いずれかは必須です";
    t.fn ??= this.scrItr.scriptFn, t.style ??= "background-color: rgba(255,0,0,0.5);", t.style_hover ??= "background-color: rgba(255,0,0,0.9);", t.style_clicked ??= t.style;
    const e = encodeURIComponent(JSON.stringify(t));
    return this.#u("link｜" + e, this.#_(t)), !1;
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
    return this.#u("span｜" + e, this.#_(t)), !1;
  }
  //MARK: tcy縦中横を表示する
  #dt(t) {
    if (!t.t) throw "[tcy] tは必須です";
    const e = encodeURIComponent(JSON.stringify(t));
    return this.#u("tcy｜" + e, this.#_(t)), !1;
  }
  //MARK: レイヤのダンプ
  #ft(t) {
    console.group("🥟 [dump_lay]");
    for (const e of this.#g(t.layer)) {
      const s = this.#a[e];
      try {
        console.info(
          `%c${s.fore.name.slice(0, -7)} %o`,
          `color:#${E.isDarkMode ? "49F" : "05A"};`,
          JSON.parse(`{"back":{${s.back.dump()}}, "fore":{${s.fore.dump()}}}`)
        );
      } catch (i) {
        console.error("dump_lay err:%o", i), console.error(`   back:${s.back.dump()}`), console.error(`   fore:${s.fore.dump()}`);
      }
    }
    return console.groupEnd(), !1;
  }
  //MARK: イベント有無の切替
  #pt(t) {
    const e = this.#q(t, this.#k), s = S(t, "enabled", !0);
    return this.#_(t).enabled = s, this.val.setVal_Nochk("save", "const.sn.layer." + e + ".enabled", s), !1;
  }
  //MARK: ボタンを表示
  #ut(t) {
    return Q.argChk_page(t, "back"), t.fn ??= this.scrItr.scriptFn, this.#_(t).addButton(t), this.scrItr.recodeDesign(t), !1;
  }
  record() {
    const t = {};
    for (const e of this.#C) {
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
      const u = this.#a[n] ??= new Q(n, c, this.#e, this.#n, {}, this.sys, this.val, { isWait: !1 });
      u.fore.playback(o, e), u.back.playback(l, e);
    }
    const i = this.#e.children.length;
    return e.push(new Promise((n) => {
      for (const { ln: o, idx: a } of s.sort(({ idx: l }, { idx: c }) => l === c ? 0 : l < c ? -1 : 1)) {
        const { fore: l, back: c } = this.#a[o];
        if (!l) continue;
        const u = i > a ? a : i - 1;
        this.#e.setChildIndex(l.ctn, u), this.#n.setChildIndex(c.ctn, u);
      }
      n();
    })), e;
  }
}
const Xt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LayerMng: J
}, Symbol.toStringTag, { value: "Module" }));
export {
  D as B,
  Xt as L,
  x as T
};
//# sourceMappingURL=LayerMng.js.map
