import { e as R, T as ct, L as Q, B as St, m as Z, o as D, i as bt, p as J, D as it, q as Rt, R as Y, A as gt, r as j, s as H, d as x, E as kt, g as S, t as tt, C as W, G as U, u as V, v as Tt, n as dt, w as Pt, x as Ft, h as ot, y as vt, z as Ot, F as Bt, P as It, H as _t, I as Vt, J as jt } from "./app2.js";
import { C as B, T as xt, b as A } from "./SndBuf.js";
import { a as F, T as Dt } from "./Reading.js";
import { R as wt, a as pt } from "./ScriptIterator.js";
class et {
  constructor(t, e, s, i, n, a, o, r) {
    this.cls = e, this.hArg = n, this.sys = a, this.val = o, this.ret = r;
    const l = a.hFactoryCls[e];
    if (!l) throw `属性 class【${e}】が不正です`;
    const d = l(), c = l();
    d.layname = c.layname = t;
    const p = n[":id_tag"] = `layer:${t} cls:${e} page:`;
    d.ctn.name = d.name = p + "A", c.ctn.name = c.name = p + "B", s.addChild(d.ctn), i.addChild(c.ctn), R(n, "visible", !0), R(n, "visible", !0), r.isWait = d.lay(n) || c.lay(n), this.#s = { fore: d, back: c }, i.visible = !1;
    const f = `const.sn.lay.${t}`;
    o.setVal_Nochk("tmp", f, !0), o.defTmp(f + ".fore.alpha", () => this.#s.fore.alpha), o.defTmp(f + ".back.alpha", () => this.#s.back.alpha), o.defTmp(f + ".fore.height", () => this.#s.fore.height), o.defTmp(f + ".back.height", () => this.#s.back.height), o.defTmp(f + ".fore.visible", () => this.#s.fore.ctn.visible), o.defTmp(f + ".back.visible", () => this.#s.back.ctn.visible), o.defTmp(f + ".fore.width", () => this.#s.fore.width), o.defTmp(f + ".back.width", () => this.#s.back.width), o.defTmp(f + ".fore.x", () => this.#s.fore.x), o.defTmp(f + ".back.x", () => this.#s.back.x), o.defTmp(f + ".fore.y", () => this.#s.fore.y), o.defTmp(f + ".back.y", () => this.#s.back.y);
  }
  #s;
  destroy() {
    this.#s.fore.destroy(), this.#s.back.destroy();
  }
  lay = (t) => this.getPage(t).lay(t);
  getPage = (t) => et.argChk_page(t, "fore") !== "back" ? this.#s.fore : this.#s.back;
  static argChk_page(t, e) {
    const s = t.page ?? e;
    if (s === "fore" || s === "back")
      return t.page = s, s;
    throw Error("属性 page【" + s + "】が不正です");
  }
  get fore() {
    return this.#s.fore;
  }
  get back() {
    return this.#s.back;
  }
  transPage(t) {
    [this.#s.back, this.#s.fore] = [this.#s.fore, this.#s.back], this.#s.back.copy(this.#s.fore, t);
  }
}
class ut {
  //	static	readonly	#alzTagArg	= new AnalyzeTagArg;
  constructor(t, e = !1) {
    this.bg_col = t, this.isLay = e;
  }
  static init(t, e, s, i, n, a) {
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
class Ht extends ut {
  constructor(t, e) {
    super("#29e", !0);
  }
  setSp(t) {
  }
}
class u {
  constructor(t = "", e, s = () => {
  }, i = () => {
  }) {
    this.csvFn = t, this.ctn = e, this.fncFirstComp = s, this.fncAllComp = i, t && (this.#u = e ? (n) => {
      e.addChild(n), this.#c.push(n);
    } : () => {
    }, this.ret = u.#x(
      t,
      (n) => this.fncFirstComp(n),
      // 差し替え考慮
      (n) => this.fncAllComp(n),
      // 差し替え考慮
      (n) => this.#u(n)
      // 差し替え考慮
    ));
  }
  static #s;
  static #e;
  static #n;
  static #r;
  static init(t, e, s, i, n) {
    u.#s = t, u.#e = e, u.#n = s, u.#r = i, s.arg.crypto && (u.#f = (o, r, l) => u.#a(o, r, l), u.#o = (o, r, l) => u.#I(o, r, l));
    const a = () => {
      const o = u.#l * u.#t;
      for (const r of Object.values(u.#w)) r.volume = o;
    };
    n.setNoticeChgVolume(
      (o) => {
        u.#l = o, a();
      },
      (o) => {
        u.#t = o, a();
      }
    );
  }
  static #t = 1;
  static #l = 1;
  static #p;
  static setEvtMng(t) {
    u.#p = t;
  }
  ret = !1;
  #u;
  #c = [];
  destroy() {
    this.fncFirstComp = () => {
    }, this.fncAllComp = () => {
    }, this.#u = (t) => t.destroy();
    for (const t of this.#c)
      u.stopVideo(t.name), t.parent?.removeChild(t), t.destroy();
    this.#c = [];
  }
  static destroy() {
    u.#i = {}, u.#d = {}, u.#w = {};
  }
  //static #ldrHFn: {[fn: string]: 1} = {};
  static #x(t, e, s, i) {
    if (!t) return !1;
    let n = !1;
    if (t.startsWith("data:")) {
      const d = () => {
        const c = j.from(t);
        i(c), e(c), s(n);
      };
      return t in ct ? d() : (n = !0, new Q().add(t, t).load(d)), n;
    }
    const a = [], o = new Q();
    for (const d of t.split(",")) {
      if (!d) throw "face属性に空要素が含まれます";
      const { dx: c, dy: p, blendmode: f, fn: h } = u.#i[d] ?? {
        fn: d,
        dx: 0,
        dy: 0,
        blendmode: St.NORMAL
      };
      if (a.push({ fn: h, fnc: (k) => {
        k.transform && (k.x = c, k.y = p, k.blendMode = f);
      } }), h in u.#d || h in ct || h in Q.shared.resources) continue;
      n = !0;
      const y = u.#s.searchPath(h, Z.SP_GSM), g = this.#n.arg.crypto ? { xhrType: y.endsWith(".json") ? D.XHR_RESPONSE_TYPE.TEXT : D.XHR_RESPONSE_TYPE.BUFFER } : {};
      o.add({ ...g, name: h, url: y });
    }
    const r = a.at(0);
    r && (r.fnc = e);
    const l = (d, c) => {
      for (const { fn: p, fnc: f } of a) {
        const h = u.#k(p, c);
        h.name = p, i(h), f(h);
      }
      s(n);
    };
    return n ? o.use((d, c) => {
      try {
        if (d.extension === "json") {
          this.#n.dec("json", d.data).then((p) => u.#o(p, d, c));
          return;
        }
        this.#n.decAB(d.data).then((p) => u.#f(p, d, c));
      } catch (p) {
        const f = `画像/動画ロード失敗です fn:${d.name} ${String(p)}`;
        u.#p.isSkipping ? console.warn(f) : console.error("%c" + f, "color:#FF3300;");
      }
    }).load(l) : queueMicrotask(() => l(0, {})), n;
  }
  static #i = {};
  static #d = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static #f = (t, { type: e, name: s, data: i }, n) => {
    switch (e) {
      case D.TYPE.VIDEO: {
        const a = i;
        a.volume = u.#l, u.#w[s] = u.#g(a);
      }
    }
    n();
  };
  static #y(t) {
    const e = /([^\d]+)\d+\.(\w+)/.exec(t[0] ?? "");
    if (!e) return [];
    const [, s = "", i = ""] = e, n = s.length, a = -i.length - 1;
    return t.sort((o, r) => bt(o.slice(n, a)) > bt(r.slice(n, a)) ? 1 : -1);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static #a(t, e, s) {
    if (e.data = t, e.extension !== "bin" && s(), t instanceof HTMLImageElement) {
      J.fromLoader(t, e.url, e.name).then((i) => {
        e.texture = i, e.type = D.TYPE.IMAGE;
      }), s();
      return;
    }
    t instanceof HTMLVideoElement && (t.volume = u.#l, u.#w[e.name] = u.#g(t), e.type = D.TYPE.VIDEO), s();
  }
  static #g(t) {
    return u.#e.getVal("const.sn.needClick2Play") && (it.trace_beforeNew(`[lay系] ${it.strPos()}未クリック状態で動画を自動再生します。音声はミュートされます`, "W"), t.muted = !0), t.setAttribute("playsinline", ""), t;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static #o = (t, { type: e, spritesheet: s, name: i, data: n }, a) => {
    switch (e) {
      case D.TYPE.JSON: {
        const o = s._frameKeys;
        u.#y(o), u.#d[i] = {
          aTex: o.map((r) => J.from(r)),
          meta: n.meta
        };
      }
    }
    a();
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static #I(t, e, s) {
    const { meta: i, frames: n } = e.data = JSON.parse(t);
    if (e.type = D.TYPE.JSON, !i?.image) {
      s();
      return;
    }
    const a = Rt(i.image), o = u.#s.searchPath(a, Z.SP_GSM);
    new Q().use((r, l) => {
      this.#n.decAB(r.data).then((d) => {
        r.data = d, d instanceof HTMLImageElement && (r.type = D.TYPE.IMAGE, URL.revokeObjectURL(d.src)), l();
      }).catch((d) => this.#r.errScript(`画像/動画ロード失敗です dec2res4Cripto fn:${r.name} ${String(d)}`, !1));
    }).add({ name: a, url: o, xhrType: D.XHR_RESPONSE_TYPE.BUFFER }).load((r, l) => {
      for (const { data: d } of Object.values(r.resources)) {
        const { baseTexture: c } = J.from(d), p = Object.values(n);
        u.#d[e.name] = {
          aTex: p.map(({ frame: { x: f, y: h, w: y, h: g } }) => new J(
            c,
            new Y(f, h, y, g)
          )),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          meta: i
        };
      }
      s();
    });
  }
  static #k(t, e) {
    const s = u.#d[t];
    if (s) {
      const a = new gt(s.aTex);
      return a.animationSpeed = s.meta.animationSpeed ?? 1, a.play(), a;
    }
    if (t in ct) return j.from(t);
    const i = u.#w[t];
    if (i) return j.from(i);
    const n = e[t];
    return n ? new j(n.texture) : new j();
  }
  static #w = {};
  static getHFn2VElm(t) {
    return u.#w[t];
  }
  static wv(t) {
    const { fn: e } = t;
    if (!e) throw "fnは必須です";
    const s = u.#w[e];
    if (!s || s.loop) return !1;
    if (u.#p.isSkipping || s.ended)
      return u.stopVideo(e), !1;
    const i = "wv fn:" + e, n = R(t, "stop", !0), a = () => {
      n && u.stopVideo(e);
    };
    return F.beginProc(i, a, !0, a), s.addEventListener("ended", () => F.notifyEndProc(i), { once: !0, passive: !0 }), !0;
  }
  static stopVideo(t) {
    const e = u.#w[t];
    e && (delete u.#w[t], e.pause(), e.currentTime = e.duration);
  }
  static add_face(t) {
    const { name: e } = t;
    if (!e) throw "nameは必須です";
    if (e in u.#i) throw "一つのname（" + e + "）に対して同じ画像を複数割り当てられません";
    const { fn: s = e } = t;
    return u.#i[e] = {
      fn: s,
      dx: x(t, "dx", 0),
      dy: x(t, "dy", 0),
      blendmode: H.getBlendmodeNum(t.blendmode ?? "")
    }, !1;
  }
  //	static	clearFace2Name(): void {SpritesMng.hFace = {}}
}
class L extends H {
  static #s = new kt();
  static #e;
  static init(t, e, s, i, n, a) {
    L.#e = s, u.init(e, a, i, t, n);
  }
  static destroy() {
    L.#s.clear(), u.destroy();
  }
  #n = new Ht(this.ctn, this);
  constructor() {
    super(), S.isDbg && (this.#r = (t) => this.#n.setSp(t), this.cvsResize = () => {
      super.cvsResize(), this.#n.cvsResize();
    });
  }
  #r = () => {
  };
  #t = "";
  #l = "";
  #p = "";
  lay = (t) => {
    const e = F.procID + `GrpLayer lay name:${this.name_}`, s = this.#u(t, (i) => {
      i && F.endProc(e);
    });
    return s && F.beginProc(e), s;
  };
  #u(t, e) {
    const { fn: s, face: i = "" } = t;
    if (this.#n.sethArg(t), !s)
      return super.lay(t), this.ctn.children.length > 0 && this.setPos(t), this.#l = "", this.#t = this.#p = i, e(!1), !1;
    const n = "fn" in t, a = "face" in t;
    return this.clearLay({ clear_filter: R(t, "clear_filter", !0) }), n && (this.#l = s), a && (this.#p = i), super.lay(t), t.dx = 0, t.dy = 0, this.#c.destroy(), this.#c = new u(
      this.#t = s + (i ? "," + i : ""),
      this.ctn,
      (o) => {
        ("width" in t || "height" in t) && (o.width = x(t, "width", 0), o.height = x(t, "height", 0)), this.#x = o.width, this.#i = o.height, H.setXY(o, t, this.ctn, !0), H.setBlendmode(this.ctn, t), this.#r(o);
      },
      (o) => e(o)
    ), this.#c.ret;
  }
  #c = new u();
  #x = 0;
  #i = 0;
  get width() {
    return this.#x;
  }
  get height() {
    return this.#i;
  }
  renderStart() {
    this.#f = new j(this.#d), this.#f.visible = !1, this.ctn.addChildAt(this.#f, 0), this.#f.position.set(-this.ctn.x, -this.ctn.y);
    let t = () => {
      const e = this.ctn.alpha;
      this.ctn.alpha = 1;
      for (const s of this.ctn.children) s.visible = !0;
      this.#f.visible = !1, L.#e.renderer.render(this.ctn, { renderTexture: this.#d }), this.ctn.alpha = e;
      for (const s of this.ctn.children) s.visible = !1;
    };
    if (!this.containMovement) {
      const e = t;
      t = () => {
        t = () => {
        }, e();
      };
    }
    this.#y = () => {
      t(), this.#f.visible = !0;
    }, L.#e.ticker.add(this.#y);
  }
  #d = tt.create({
    width: S.stageW,
    height: S.stageH
  });
  #f = new j();
  #y = () => {
  };
  renderEnd() {
    L.#e.ticker.remove(this.#y), this.ctn.removeChild(this.#f);
    for (const t of this.ctn.children) t.visible = !0;
    this.#f.destroy(!0), this.#d = tt.create({
      width: S.stageW,
      height: S.stageH
    });
  }
  setPos(t) {
    H.setXY(
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
      (e, s) => t[s] instanceof gt || u.getHFn2VElm(e)
    );
  }
  clearLay(t) {
    super.clearLay(t), this.#c.destroy(), this.#l = "", this.#p = "", this.#t = "";
  }
  record = () => ({
    ...super.record(),
    sBkFn: this.#l,
    sBkFace: this.#p
    //		idc_hArg	: this.#idc.gethArg(),
  });
  playback(t, e) {
    if (super.playback(t, e), t.sBkFn === "" && t.sBkFace === "") {
      this.#l = "", this.#p = "";
      return;
    }
    e.push(new Promise((s) => this.#u(
      { fn: t.sBkFn, face: t.sBkFace, left: t.x, top: t.y, alpha: t.alpha, blendmode: H.getNum2Blendmode(t.blendMode), rotation: t.rotation, scale_x: t.scale_x, scale_y: t.scale_y },
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
const st = "、。，．）］｝〉」』】〕”〟ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ！？!?‼⁉・ーゝゞヽヾ々", rt = "［（｛〈「『【〔“〝", ht = "─‥…", ft = st, $t = new RegExp(`[${st}]`), Wt = new RegExp(`[${rt}]`), zt = new RegExp(`[${ht}]`), Lt = $t;
class Jt {
  #s = st;
  #e = rt;
  #n = ht;
  #r = ft;
  get 行頭禁則() {
    return this.#s;
  }
  get 行末禁則() {
    return this.#e;
  }
  get 分割禁止() {
    return this.#n;
  }
  get ぶら下げ() {
    return this.#r;
  }
  #t = $t;
  #l = Wt;
  #p = zt;
  #u = Lt;
  break_fixed = !1;
  break_fixed_left = 0;
  break_fixed_top = 0;
  bura = !1;
  lay(t) {
    t.kinsoku_sol && (this.#s = t.kinsoku_sol, this.#t = new RegExp(`[${this.#s}]`)), t.kinsoku_eol && (this.#e = t.kinsoku_eol, this.#c(), this.#l = new RegExp(`[${this.#e}]`)), t.kinsoku_dns && (this.#n = t.kinsoku_dns, this.#x(), this.#p = new RegExp(`[${this.#n}]`)), t.kinsoku_bura && (this.#r = t.kinsoku_bura, this.#c(), this.#x(), this.#u = new RegExp(`[${this.#r}]`)), "bura" in t && (this.bura = R(t, "bura", !1)), this.break_fixed = R(t, "break_fixed", this.break_fixed), this.break_fixed_left = x(t, "break_fixed_left", this.break_fixed_left), this.break_fixed_top = x(t, "break_fixed_top", this.break_fixed_top);
  }
  // 禁則の競合（ぶら下げ と 行末禁則 の両方に含まれる文字があってはならない）
  #c() {
    const t = this.#e.length, e = this.#r.length;
    if (t < e)
      for (let s = 0; s < t; ++s) {
        const i = this.#e[s];
        if (this.#r.includes(i)) throw `禁則の競合があります。文字 ${i} がぶら下げ と 行末禁則 の両方に含まれます`;
      }
    else
      for (let s = 0; s < e; ++s) {
        const i = this.#r[s];
        if (this.#e.includes(i)) throw `禁則の競合があります。文字 ${i} がぶら下げ と 行末禁則 の両方に含まれます`;
      }
  }
  // 禁則の競合（ぶら下げ と 分割禁止 の両方に含まれる文字があってはならない）
  #x() {
    const t = this.#n.length, e = this.#r.length;
    if (t < e)
      for (let s = 0; s < t; ++s) {
        const i = this.#n[s];
        if (this.#r.includes(i)) throw `禁則の競合があります。文字 ${i} がぶら下げ と 分割禁止 の両方に含まれます`;
      }
    else
      for (let s = 0; s < e; ++s) {
        const i = this.#r[s];
        if (this.#n.includes(i)) throw `禁則の競合があります。文字 ${i} がぶら下げ と 分割禁止 の両方に含まれます`;
      }
  }
  reNew(t) {
    t.#i(this.#s, this.#e, this.#n, this.#r), t.break_fixed = this.break_fixed, t.break_fixed_left = this.break_fixed_left, t.break_fixed_top = this.break_fixed_top, t.bura = this.bura;
  }
  #i(t, e, s, i) {
    this.#s !== t && (this.#s = t, this.#t = new RegExp(`[${t}]`)), this.#e !== e && (this.#e = e, this.#l = new RegExp(`[${e}]`)), this.#n !== s && (this.#n = s, this.#p = new RegExp(`[${s}]`)), this.#r !== i && (this.#r = i, this.#u = new RegExp(`[${i}]`));
  }
  record() {
    const t = {
      break_fixed: this.break_fixed,
      break_fixed_left: this.break_fixed_left,
      break_fixed_top: this.break_fixed_top,
      bura: this.bura
    };
    return this.#s === st && (t.行頭禁則 = this.#s), this.#e === rt && (t.行末禁則 = this.#e), this.#n === ht && (t.分割禁止 = this.#n), this.#r === ft && (t.ぶら下げ = this.#r), t;
  }
  playback(t) {
    t && (this.#i(
      t.行頭禁則 ?? st,
      t.行末禁則 ?? rt,
      t.分割禁止 ?? ht,
      t.ぶら下げ ?? ft
    ), this.break_fixed = t.break_fixed, this.break_fixed_left = t.break_fixed_left, this.break_fixed_top = t.break_fixed_top, this.bura = t.bura);
  }
  hyph(t, e, s, i, n) {
    let a, o = 0, r = 2, l = (d) => (l = () => !1, i === d ? (i > 0 && (t.innerHTML = n.replaceAll('class="sn_ch"', 'class="sn_ch sn_ch_in_default"')), !0) : d < 2);
    do {
      if (a = this.#f(t, e), o = a.length, l(o)) break;
      let d = -1 / 0;
      for (; r < o; ++r) {
        const { elm: c, rect: p, ch: f } = a[r];
        if (c.tagName === "RT") continue;
        const h = s ? p.y : p.x;
        if (d <= h || c.previousElementSibling?.tagName === "SPAN" && c.previousElementSibling?.innerHTML.includes("<br>") || c.parentElement?.previousElementSibling?.tagName === "SPAN" && c.parentElement?.previousElementSibling?.innerHTML.includes("<br>")) {
          d = h, this.break_fixed || (this.break_fixed_left = p.x, this.break_fixed_top = p.y);
          continue;
        }
        const y = this.#d(a, r), { elm: g, rect: k, ch: m } = a[y];
        if (!this.break_fixed) {
          this.break_fixed_left = k.x, this.break_fixed_top = k.y;
          const E = globalThis.getComputedStyle(g), O = parseFloat(E.fontSize);
          s ? this.break_fixed_top += O : this.break_fixed_left += O;
        }
        d = -1 / 0;
        const b = r, { cont: N, ins: _ } = this.bura ? this.hyph_alg_bura(a, y, m, r) : this.hyph_alg(a, y, m, r, f);
        if (r = _, N) continue;
        const T = a[r].elm, $ = T.parentElement, v = document.createElement("br");
        if ($.classList.contains("sn_tx")) $.insertBefore(v, T);
        else {
          const E = $.parentElement;
          E.classList.contains("sn_ch") ? E.parentElement.insertBefore(v, E) : E.insertBefore(v, $);
        }
        r += 2, r < b && (r = b), o = -1;
        break;
      }
    } while (o < 0);
    return [a, o];
  }
  // 一つ前の要素を探す（ルビ対応）
  #d(t, e) {
    const s = e - 1, { elm: i } = t[s];
    return i.tagName !== "RT" ? s - (i.style.textCombineUpright === "all" ? Array.from(i.textContent).length - 1 : 0) : s - Array.from(i.textContent).length;
  }
  #f(t, e) {
    const s = [];
    if (t.nodeType !== t.TEXT_NODE) return Array.from(t.childNodes).map((o) => this.#f(o, e)).flat();
    const i = t.ownerDocument.createRange();
    i.selectNodeContents(t);
    let n = 0;
    const a = i.endOffset;
    for (; n < a; ) {
      i.setStart(t, n), i.setEnd(t, ++n);
      const o = i.toString();
      s.push({
        ch: o,
        rect: e(i, o),
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
    let a = i;
    if (!this.#l.test(s)) {
      if (this.#t.test(n))
        for (; (a = this.#d(t, a)) >= 0 && this.#t.test(t[a].ch); )
          ;
      else if (!(s === n && this.#p.test(s))) return { cont: !0, ins: a + 1 };
    }
    for (a = e; (a = this.#d(t, a)) >= 0 && this.#l.test(t[a].ch); )
      ;
    return { cont: !1, ins: a + 1 };
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
    const n = this.#d(t, e), { ch: a } = t[n];
    if (this.#u.test(a) || this.#t.test(a)) {
      let r = e;
      (this.#u.test(s) || this.#t.test(s)) && ++r;
      const l = this.#d(t, r), { ch: d } = t[l], { ch: c } = t[r];
      if (d === c && this.#p.test(c)) return { cont: !1, ins: l };
      if (!this.#l.test(d)) return { cont: !1, ins: r };
      r = l;
      do
        if (!this.#l.test(t[r].ch)) break;
      while ((r = this.#d(t, r)) >= 0);
      return { cont: !1, ins: r + 1 };
    }
    const o = this.#d(t, n);
    if (i >= 3) {
      const { ch: r } = t[o];
      if (this.#p.test(a) && r === a)
        return { cont: !1, ins: o };
      if (this.#l.test(r)) {
        let l = o;
        for (; (l = this.#d(t, l)) >= 0 && this.#l.test(t[l].ch); )
          ;
        return { cont: !1, ins: l + 1 };
      }
    }
    return { cont: !1, ins: n };
  }
}
function Ut(q, t, e, s, i, n = !0) {
  const a = {
    escape: (m) => m.replaceAll(/([.*+?^${}()|[\]/\\])/g, "\\$1"),
    mimeType: (m) => {
      const b = c(m).toLowerCase();
      return o()[b] || "";
    },
    dataAsUrl: y,
    isDataUrl: p,
    resolveUrl: f,
    getAndEncode: h,
    asArray: (m) => {
      const b = [], N = m.length;
      for (let _ = 0; _ < N; ++_) b.push(m[_]);
      return b;
    }
  };
  function o() {
    const m = "application/font-woff", b = "image/jpeg";
    return {
      woff: m,
      woff2: m,
      ttf: "application/font-truetype",
      eot: "application/vnd.ms-fontobject",
      png: "image/png",
      jpg: b,
      jpeg: b,
      gif: "image/gif",
      tiff: "image/tiff",
      svg: "image/svg+xml"
    };
  }
  const r = g(), l = k();
  function d(m) {
    return l.resolveAll().then((b) => {
      const N = document.createElement("style");
      return m.appendChild(N), N.appendChild(document.createTextNode(b)), m;
    });
  }
  function c(m) {
    return /\.([^./]*?)$/g.exec(m)?.[1] ?? "";
  }
  function p(m) {
    return m.search(/^(data:)/) !== -1;
  }
  function f(m, b) {
    const N = document.implementation.createHTMLDocument(), _ = N.createElement("base");
    N.head.appendChild(_);
    const T = N.createElement("a");
    return N.body.appendChild(T), _.href = b, T.href = m, T.href;
  }
  function h(m) {
    return new Promise(function(N) {
      const _ = new XMLHttpRequest();
      _.onreadystatechange = T, _.ontimeout = $, _.responseType = "blob", _.timeout = 3e4, _.open("GET", m, !0), _.send();
      function T() {
        if (_.readyState !== 4) return;
        if (_.status !== 200) {
          v("cannot fetch resource: " + m + ", status: " + _.status);
          return;
        }
        const E = new FileReader();
        E.onloadend = function() {
          const O = E.result.toString().split(/,/)[1];
          N(O);
        }, E.readAsDataURL(_.response);
      }
      function $() {
        v("timeout of 30000ms occured while fetching resource: " + m);
      }
      function v(E) {
        console.error(E), N("");
      }
    });
  }
  function y(m, b) {
    return "data:" + b + ";base64," + m;
  }
  function g() {
    const m = /url\(['"]?([^'"]+?)['"]?\)/g;
    return {
      inlineAll: T,
      shouldProcess: b
    };
    function b($) {
      return $.search(m) !== -1;
    }
    function N($) {
      const v = [];
      let E;
      for (; E = m.exec($); )
        v.push(E[1]);
      return v.filter(function(O) {
        return !a.isDataUrl(O);
      });
    }
    function _($, v, E, O) {
      return Promise.resolve(v).then((I) => E ? a.resolveUrl(I, E) : I).then(O || a.getAndEncode).then((I) => a.dataAsUrl(I, a.mimeType(v))).then((I) => $.replace(M(v), "$1" + I + "$3"));
      function M(I) {
        return new RegExp(`(url\\(['"]?)(` + a.escape(I) + `)(['"]?\\))`, "g");
      }
    }
    function T($, v, E) {
      if (O()) return Promise.resolve($);
      return Promise.resolve($).then(N).then((M) => {
        let I = Promise.resolve($);
        for (const K of M) I = I.then((lt) => _(lt, K, v, E));
        return I;
      });
      function O() {
        return !b($);
      }
    }
  }
  function k() {
    return {
      resolveAll: m,
      impl: { readAll: b }
    };
    function m() {
      return b().then((N) => Promise.allSettled(
        N.map((_) => _.resolve())
      )).then((N) => N.join(`
`));
    }
    function b() {
      return Promise.resolve(a.asArray(document.styleSheets)).then(_).then(N).then(($) => $.map(T));
      function N($) {
        return $.filter((v) => v.type === CSSRule.FONT_FACE_RULE).filter((v) => r.shouldProcess(v.style.getPropertyValue("src")));
      }
      function _($) {
        const v = [];
        for (const E of $)
          try {
            if (E.href) continue;
            a.asArray(E.cssRules || []).forEach(v.push.bind(v));
          } catch (O) {
            console.error("Error while reading CSS rules from " + E.href, String(O));
          }
        return v;
      }
      function T($) {
        return {
          resolve: function() {
            const E = ($.parentStyleSheet || {}).href;
            return r.inlineAll($.cssText, E);
          },
          src() {
            return $.style.getPropertyValue("src");
          }
        };
      }
    }
  }
  Promise.resolve(t).then((m) => {
    const b = m.cloneNode(!0);
    return b.style.padding = "0px", b.style.paddingRight = s + "px", b.style.paddingTop = i + "px", b.style.left = "0px", b.style.top = "0px", b.style.width = e.$width - e.pad_left - e.pad_right + "px", b.style.height = e.$height - e.pad_top - e.pad_bottom + "px", t.hidden = n, b;
  }).then(d).then((m) => {
    m.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
    const b = new Image();
    return b.src = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${e.$width}px" height="${e.$height}px"><foreignObject x="0" y="0" width="100%" height="100%">${new XMLSerializer().serializeToString(m).replaceAll("#", "%23").replaceAll(`
`, "%0A")}</foreignObject></svg>`, new Promise((N) => {
      b.onload = () => N(b);
    });
  }).then((m) => new Promise((b) => setTimeout(() => b(m), 100))).then((m) => {
    const b = document.createElement("canvas");
    b.width = e.$width, b.height = e.$height, b.getContext("2d").drawImage(m, 0, 0), q(J.from(b));
  }).catch((m) => it.myTrace(`goTxt() = ${m}`));
}
class w extends W {
  constructor(t, e, s) {
    super(), this.ctn = t, this.canFocus = e, this.sys = s, this.#t.classList.add("sn_tx"), this.#t.style.position = "absolute", w.#e.view.parentElement.appendChild(this.#t), this.addChild(this.#l), this.addChild(this.#p), this.#p.name = "grpDbgMasume";
    const i = S.debugLog ? ({ ch: n, rect: { x: a, y: o, width: r, height: l } }) => console.log(`🍌 masume ch:${n} x:${a} y:${o} w:${r} h:${l}`) : () => {
    };
    this.#x = w.#s.oCfg.debug.masume ? (n) => {
      i(n);
      const { x: a, y: o, width: r, height: l } = n.rect;
      this.#p.beginFill(6737151, 0.5).lineStyle(2, 16724736, 1).drawRect(a, o, r, l).endFill();
    } : () => {
    }, this.noticeCompTxt = s.isApp && w.#s.oCfg.debug.dumpHtm ? () => {
      F.notifyEndProc(wt);
      const n = this.#t.innerHTML;
      if (n === "") return;
      const { fn: a, ln: o } = w.#r.nowScrFnLn(), r = `dumpHtm ${t.name.slice(0, -7).replaceAll(":", "=")}(fn=${a} line=${String(o)})`;
      s.outputFile(
        s.path_downloads + r + ".htm",
        `<!doctype html><html><head><meta charset=utf-8><title>${r}</title>
<h1>${r}</h1>${n.replaceAll(/ class="sn_ch"|animation-delay: \d+ms; ?| data-add="{&quot;ch_in_style&quot;:&quot;default&quot;, &quot;ch_out_style&quot;:&quot;default&quot;}"/g, "").replaceAll(' style=""', "").replaceAll(/(<\/?ruby>)/g, `
$1
`).replaceAll(/<(br|\/span)>/g, `<$1>
`)}`
      );
    } : () => F.notifyEndProc(wt);
  }
  static #s;
  static #e;
  static init(t, e) {
    w.#s = t, w.#e = e;
  }
  static #n;
  static #r;
  static setEvtMng(t, e) {
    w.#n = t, w.#r = e;
  }
  static destroy() {
    w.#F = /* @__PURE__ */ Object.create(null), w.#j = /* @__PURE__ */ Object.create(null), w.delBreak();
  }
  #t = document.createElement("span");
  // サンプリング元
  #l = new W();
  // サンプリング先
  #p = new U();
  static #u = {
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
  #c = new Jt();
  noticeCompTxt = () => {
  };
  #x;
  //	readonly	#idc	:TxtLayDesignCast;
  //	readonly	#idcCh	= new TxtLayPadDesignCast(this);
  #i = {
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
          const a = s.style[n];
          if (a in w.#u) {
            it.myTrace(`${String(a)}は指定できません`, "W");
            continue;
          }
          e[a] = s.style[a];
        }
        !s.style.opacity && "alpha" in t && (e.opacity = String(this.ctn.alpha));
      } else this.#t.style.cssText = "";
    else "alpha" in t && (e.opacity = String(this.ctn.alpha));
    if ("width" in t && (e.width = String(t.width ?? "0") + "px"), "height" in t && (e.height = String(t.height ?? "0") + "px"), "pl" in t && (e.paddingLeft = String(t.pl ?? "0") + "px"), "pr" in t && (e.paddingRight = String(t.pr ?? "0") + "px"), "pt" in t && (e.paddingTop = String(t.pt ?? "0") + "px"), "pb" in t && (e.paddingBottom = String(t.pb ?? "0") + "px"), this.#c.lay(t), this.#f(), this.#y = this.ctn.position.x, e.transformOrigin = `${this.ctn.pivot.x}px ${this.ctn.pivot.y}px`, this.cvsResize(), e.display = this.ctn.visible ? "inline" : "none", ":redraw" in t && this.#w > 0) {
      const s = [
        this.#t.innerHTML.replaceAll(/(animation-delay: )\d+ms/g, "$10ms"),
        `<span class='sn_ch' data-add='{"ch_in_style":"default"}'>&emsp;</span>`
      ];
      this.#_(), this.goTxt(s, !0);
    }
  }
  // oxlint-disable-next-line no-unused-private-class-members
  #d = 0;
  // 「g」などで下が欠ける問題対策
  #f() {
    const t = this.#t.style, e = parseFloat(t.fontSize || "0");
    this.#i.fontsize = e, this.#i.pad_left = parseFloat(t.paddingLeft || "0"), this.#i.pad_right = parseFloat(t.paddingRight || "0"), this.#i.pad_top = parseFloat(t.paddingTop || "0"), this.#i.pad_bottom = parseFloat(t.paddingBottom || "0"), this.#i.$width = parseFloat(t.width || "0"), this.#i.$height = parseFloat(t.height || "0"), this.position.set(this.#i.pad_left, this.#i.pad_top), this.#a = t.writingMode === "vertical-rl", this.#g = 0, this.#o = 0;
    const s = t.lineHeight ?? "0";
    this.#d = this.#a ? 0 : (s.endsWith("px") ? parseFloat(s) : e * parseFloat(s) - e) / 2;
  }
  cvsResize() {
    const t = this.#t.style, e = this.sys.cvsScale;
    t.left = `${this.sys.ofsLeft4elm + this.#y * e}px`, t.top = `${this.sys.ofsTop4elm + this.ctn.position.y * e}px`, t.transform = `rotate(${this.ctn.angle}deg) scale(${this.ctn.scale.x * e}, ${this.ctn.scale.y * e})`;
  }
  #y = 0;
  #a = !1;
  get tategaki() {
    return this.#a;
  }
  #g = 0;
  #o = 0;
  get infTL() {
    return this.#i;
  }
  get getWidth() {
    return this.#i.$width;
  }
  get getHeight() {
    return this.#i.$height;
  }
  setMySize(t, e) {
    this.#i.$width = t, this.#i.$height = e, this.#t.style.width = String(this.#i.$width) + "px", this.#t.style.height = String(this.#i.$height) + "px";
  }
  #I = [];
  // FIFO実行バッファ
  goTxt(t, e) {
    const s = () => this.#h(t, e);
    this.#I.push(s) === 1 && s();
  }
  #k = [];
  #w = 0;
  static #v = "<span class='sn_ch sn_ch_last'>&emsp;</span>";
  #h(t, e) {
    w.#H.visible = !1;
    let s = this.#k.length, i = "";
    if (s === 0) {
      if (w.#s.oCfg.debug.masume && (S.debugLog && console.log(`🍌 masume ${// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      this.name} v:${this.visible} l:${this.x} t:${this.y} a:${this.alpha} pl:${this.#i.pad_left} pr:${this.#i.pad_right} pt:${this.#i.pad_top} pb:${this.#i.pad_bottom} w:${this.#i.$width} h:${this.#i.$height}`), this.#p.clear().beginFill(3407616, 0.2).lineStyle(1, 3407616, 1).drawRect(-this.#i.pad_left, -this.#i.pad_top, this.#i.$width, this.#i.$height).endFill().beginFill(13311, 0.2).lineStyle(2, 13311, 1).drawRect(
        0,
        0,
        this.#i.$width - this.#i.pad_left - this.#i.pad_right,
        this.#i.$height - this.#i.pad_top - this.#i.pad_bottom
      ).endFill()), this.#t.innerHTML = [...t].join("").replaceAll(/[\n\t]/g, "") + w.#v, !this.#c.break_fixed) {
        const y = globalThis.getComputedStyle(this.#t), g = parseFloat(y.fontSize);
        this.#a ? (this.#c.break_fixed_left = (this.#i.$width - this.#i.pad_left - this.#i.pad_right - g * 1.5) * this.sys.cvsScale, this.#c.break_fixed_top = 0) : (this.#c.break_fixed_left = 0, this.#c.break_fixed_top = g / 2 * this.sys.cvsScale);
      }
    } else
      i = this.#t.innerHTML, --s, this.#t.getElementsByClassName("sn_ch_last").item(0)?.remove(), this.#t.querySelectorAll(":scope > br").forEach((y) => y.remove()), this.#t.insertAdjacentHTML(
        "beforeend",
        t.slice(this.#w).join("").replaceAll(/[\n\t]/g, "") + w.#v
        // 末尾改行削除挙動対策
      );
    this.#t.querySelectorAll(".sn_ch:has(> ruby)").forEach((y) => {
      y.style.background = "";
    }), this.#w = t.length;
    const n = this.sys.cvsScale, a = this.#t.getBoundingClientRect(), o = a.left + this.#i.pad_left, r = a.top + this.#i.pad_top;
    let l;
    if (n === 1) l = (y, g) => {
      const k = y.getBoundingClientRect();
      return new Y(
        k.left - o,
        k.top - r,
        k.width,
        k.height + ("gjqy".includes(g) ? this.#d : 0)
      );
    };
    else {
      const y = this.sys.ofsPadLeft_Dom2PIXI + a.left * (1 - n), g = this.sys.ofsPadTop_Dom2PIXI + a.top * (1 - n);
      l = (k, m) => {
        const b = k.getBoundingClientRect();
        return new Y(
          (b.left - y) / n - o,
          (b.top - g) / n - r,
          b.width / n,
          (b.height + ("gjqy".includes(m) ? this.#d : 0)) / n
        );
      };
    }
    const [d, c] = this.#c.hyph(this.#t, l, this.#a, s, i);
    this.#k = d;
    const p = B.ease(this.#$);
    for (let y = s; y < c; ++y) {
      const g = this.#k[y], { elm: { dataset: k, parentElement: m }, rect: b } = g, N = JSON.parse(k.arg ?? '{"delay": 0}'), _ = JSON.parse(k.add ?? "{}"), T = w.#F[_.ch_in_style];
      if (this.#x(g), k.cmd === "grp") {
        const $ = new W();
        this.#l.addChild($), new u(N.pic, $, (v) => {
          this.#E($, N, _, b, p, T ?? {}), $.parent || $.removeChild(v);
        });
      }
      if (k.lnk) {
        const $ = m.closest("[data-arg]"), v = JSON.parse($.dataset.arg ?? "{}");
        v.key = `lnk=[${String(y)}] ` + this.name;
        const E = new j();
        this.#E(E, v, _, b, p, T ?? {});
        const O = v.style ?? "", M = O + (v.style_hover ?? ""), I = O + (v.style_clicked ?? ""), K = v.r_style ?? "", lt = K + (v.r_style_hover ?? ""), Ct = K + (v.r_style_clicked ?? ""), yt = Array.from($.getElementsByTagName("rt"));
        for (const at of yt) at.dataset.st_r_bk = at.style.cssText;
        const Et = $.style.cssText, nt = (at, Nt) => {
          $.style.cssText = Et + at;
          for (const mt of yt) mt.style.cssText = mt.dataset.st_r_bk + Nt;
        };
        R(v, "enabled", !0) ? w.#n.button(
          v,
          E,
          () => nt(O, K),
          () => this.canFocus() ? (nt(M, lt), !0) : !1,
          () => nt(I, Ct)
        ) : nt(
          O + (v.style_disable ?? "color: gray;"),
          K + (v.r_style_disable ?? "color: gray;")
        ), this.#l.addChild(E);
      }
    }
    const f = Array.from(this.#t.getElementsByClassName("sn_ch_yet"));
    this.#b = () => {
      this.#b = () => !1;
      for (const g of f) g.className = "sn_ch";
      w.#H.position.set(
        this.#c.break_fixed_left,
        this.#c.break_fixed_top
      ), w.#H.visible = !0, this.noticeCompTxt();
      const y = this.#I.shift();
      return this.#I.length > 0 && y(), !0;
    };
    for (const y of f) y.className = y.className.replace("sn_ch_yet sn", "go");
    s > 0 && ++s;
    let h;
    for (let y = c - 2; y >= 0; --y) {
      const { elm: g } = this.#k[y];
      if (g.tagName === "SPAN") {
        h = g.parentElement?.tagName === "RUBY" ? g.parentElement.parentElement ?? g : g;
        break;
      }
    }
    if (!h || e || s === c) {
      this.#b();
      return;
    }
    h.addEventListener("animationend", () => this.#b(), { once: !0 });
  }
  #b = () => !1;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #E(t, e, s, i, n, a) {
    t.alpha = 0, e.x && (i.x = e.x.startsWith("=") ? i.x + parseInt(e.x.slice(1)) : parseInt(e.x)), e.y && (i.y = e.y.startsWith("=") ? i.y + parseInt(e.y.slice(1)) : parseInt(e.y)), e.width && (i.width = parseInt(e.width)), e.height && (i.height = parseInt(e.height)), e.wait && (a.wait = e.wait), t.width = i.width, t.height = i.height, a.x ? t.position.set(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      a.x.startsWith("=") ? i.x + t.width * a.nx : a.nx,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      a.y.startsWith("=") ? i.y + t.height * a.ny : a.ny
    ) : t.position.set(i.x, i.y);
    const o = {
      sp: t,
      tw: new Dt(t).to({ alpha: 1, x: i.x, y: i.y, width: i.width, height: i.height, angle: 0 }, a.wait ?? 0).easing(n).delay((s.wait ?? 0) + (e.delay ?? 0)).onComplete(() => {
        o.tw = void 0;
      }).start()
    };
    this.#V.push(o);
  }
  #V = [];
  skipChIn() {
    let t = this.#b();
    for (const e of this.#V)
      e.tw && (e.tw.stop().end(), t = !0);
    return this.#V = [], t;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  static #F = /* @__PURE__ */ Object.create(null);
  static #z = /[{\s.,*{]/;
  // https://regex101.com/r/APC91I/1
  static initChStyle() {
    w.#F = /* @__PURE__ */ Object.create(null), w.#j = /* @__PURE__ */ Object.create(null);
  }
  static getChInStyle(t) {
    return w.#F[t];
  }
  static ch_in_style(t) {
    const { name: e } = t;
    if (!e) throw "nameは必須です";
    if (w.#z.test(e)) throw `name【${e}】に使えない文字が含まれます`;
    if (e in w.#F) throw `name【${e}】はすでにあります`;
    const s = String(t.x ?? "=0"), i = String(t.y ?? "=0");
    return w.#F[e] = {
      wait: x(t, "wait", 500),
      // アニメ・FI時間
      alpha: x(t, "alpha", 0),
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
      scale_x: x(t, "scale_x", 1),
      scale_y: x(t, "scale_y", 1),
      rotate: x(t, "rotate", 0),
      join: R(t, "join", !0),
      // 文字を順番に出すか（true）同時か（false）
      ease: t.ease ?? "ease-out"
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  static #j = /* @__PURE__ */ Object.create(null);
  static getChOutStyle(t) {
    return w.#j[t];
  }
  static ch_out_style(t) {
    const { name: e } = t;
    if (!e) throw "nameは必須です";
    if (w.#z.test(e)) throw `name【${e}】に使えない文字が含まれます`;
    if (e in w.#j) throw `name【${e}】はすでにあります`;
    const s = String(t.x ?? "=0"), i = String(t.y ?? "=0");
    return w.#j[e] = {
      wait: x(t, "wait", 500),
      // アニメ・FI時間
      alpha: x(t, "alpha", 0),
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
      scale_x: x(t, "scale_x", 1),
      scale_y: x(t, "scale_y", 1),
      rotate: x(t, "rotate", 0),
      join: R(t, "join", !1),
      // 文字を順番に出すか（true）同時か（false）
      ease: t.ease ?? "ease-out"
    };
  }
  static #H = new W();
  static #O = new u();
  dispBreak(t) {
    w.delBreak();
    const e = w.#H;
    e.visible = !1, this.addChild(e), w.#O.destroy(), w.#O = new u(t.pic, e, (s) => {
      e.parent ? (s.x = x(t, "x", 0), s.y = x(t, "y", 0), s.width = x(t, "width", this.#i.fontsize), s.height = x(t, "height", this.#i.fontsize)) : e.removeChild(s);
    });
  }
  static delBreak() {
    const t = w.#H;
    t.parent?.removeChild(t), w.#O.destroy();
  }
  #$ = "Quadratic.Out";
  #N = "Quadratic.Out";
  #_() {
    this.#p.clear(), this.#k = [], this.#w = 0, this.#I = [], this.skipChIn();
    const t = this.#t.cloneNode(!0);
    t.textContent = "";
    const e = this.#t, s = Array.from(e.getElementsByClassName("sn_ch"));
    e.parentElement.insertBefore(t, e);
    let i = 0;
    s.forEach((a) => {
      const o = JSON.parse(
        a.dataset.add ?? // 通常文字
        a.children[0]?.getAttribute("data-add") ?? // ルビ
        a.children[0]?.children[0]?.getAttribute("data-add") ?? "{}"
        // 縦中横
      );
      if (!o.ch_out_style) return;
      const r = w.#j[o.ch_out_style];
      if (r) {
        if (r.wait === 0) {
          a.style.display = "none";
          return;
        }
        i += r.wait, r.join || (a.style.animationDelay = "0ms"), a.classList.add(`go_ch_out_${String(o.ch_out_style)}`);
      }
    });
    const n = () => {
      e.parentElement.removeChild(e);
      for (const a of this.#l.removeChildren())
        a instanceof W && w.#n.unButton(a), a.destroy();
    };
    i === 0 ? (this.#t.textContent = "", n()) : e.lastElementChild?.addEventListener("animationend", n, { once: !0 }), this.#t = t;
  }
  reNew() {
    this.#_();
    const t = new w(this.ctn, () => this.canFocus(), this.sys);
    return t.#i = this.#i, t.#t.style.cssText = this.#t.style.cssText, t.#y = this.#y, t.name = this.name, t.#f(), t.#W = this.#W, t.#$ = this.#$, t.#N = this.#N, this.#c.reNew(t.#c), this.destroy(), t;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #W = void 0;
  // 文字にかけるフィルター
  record() {
    return {
      infTL: this.#i,
      cssText: this.#t.style.cssText,
      left: this.#y,
      //		idc_hArg	: this.#idc.gethArg(),
      ch_filter: this.#W,
      fi_easing: this.#$,
      fo_easing: this.#N,
      hyph: this.#c.record()
    };
  }
  playback(t) {
    this.#i = t.infTL, this.position.set(this.#i.pad_left, this.#i.pad_top), this.#t.style.cssText = t.cssText, this.#y = t.left, this.#f(), this.#W = t.ch_filter, this.#$ = t.fi_easing, this.#N = t.fo_easing, this.#c.playback(t.hyph);
  }
  get cssText() {
    return this.#t.style.cssText;
  }
  set cssText(t) {
    this.#t.style.cssText = t;
  }
  #m = void 0;
  snapshot(t, e) {
    Ut((s) => {
      this.#m = j.from(s), this.#a && (this.#m.x += S.stageW - (this.#y + this.#i.$width)), this.#m.y -= this.#o, this.#m.texture.frame = new Y(
        0,
        0,
        Math.min(this.#m.width, this.#i.$width - this.#y),
        Math.min(this.#m.height, this.#i.$height)
      ), this.#l.addChild(this.#m), t.render(this.#m, { clear: !1 }), e();
    }, this.#t, this.#i, this.#g, this.#o, !1);
  }
  snapshot_end() {
    this.#m && (this.#l.removeChild(this.#m), this.#m = void 0);
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
      t.push(`"${String(n)}":"${e[n].replaceAll(/(["\\])/g, "\\$1")}"`);
    }
    return `"txt":"${this.#t.textContent.replaceAll(/(["\\])/g, "\\$1")}", "style":{${t.join(",")}}`;
  }
  destroy() {
    w.delBreak(), this.#t.parentElement.removeChild(this.#t), this.removeChild(this.#l), this.removeChild(this.#p), super.destroy();
  }
}
class z extends W {
  constructor(t, e, s, i) {
    if (super(), this.hArg = t, this.evtMng = e, this.resolve = s, this.canFocus = i, this.#t = {
      type: "pic",
      enabled: R(t, "enabled", !0),
      x: this.x = V(t.left ?? 0),
      y: this.y = V(t.top ?? 0),
      rotation: this.angle = x(t, "rotation", this.angle),
      // flash : rotation is in degrees.
      // pixijs: rotation is in radians, angle is in degrees.
      pivot_x: this.pivot.x = x(t, "pivot_x", this.pivot.x),
      pivot_y: this.pivot.y = x(t, "pivot_y", this.pivot.y),
      scale_x: this.scale.x = x(t, "scale_x", this.scale.x),
      scale_y: this.scale.y = x(t, "scale_y", this.scale.y),
      alpha: 1,
      text: "",
      b_pic: "",
      width: 0,
      height: 0
    }, this.getBtnBounds = () => (this.#n.x = this.#t.x, this.#n.y = this.#t.y, this.#n), this.#t.enabled && e.button(t, this, () => this.normal(), () => this.#p(), () => this.#u()), t.pic) {
      this.#t.type = "pic", this.#r = new u(
        t.pic,
        this,
        (c) => {
          this.#c(c), this.#n.width = c.width * this.#t.scale_x, this.#n.height = c.height * this.#t.scale_y;
        },
        (c) => s()
      );
      return;
    }
    if (!t.text) throw "textまたはpic属性は必須です";
    const n = x(t, "height", 30), a = new Tt({
      align: "center",
      dropShadow: !0,
      dropShadowAlpha: 0.7,
      dropShadowColor: "white",
      dropShadowBlur: 7,
      dropShadowDistance: 0,
      fill: this.#t.enabled ? "black" : "gray",
      fontFamily: z.fontFamily,
      fontSize: n,
      padding: 5
    });
    if (t.style) try {
      const c = JSON.parse(t.style);
      for (const [p, f] of Object.entries(c)) a[p] = f;
      this.#t = { ...this.#t, ...c };
    } catch (c) {
      throw c instanceof SyntaxError ? new Error(dt(t, "style", c.message)) : "fn:Button.ts style";
    }
    const o = new Pt(t.text ?? "", a);
    o.alpha = x(t, "alpha", o.alpha), o.width = x(t, "width", 100), o.height = t.height = n, this.setText = (c) => {
      o.text = c;
    }, this.#t = {
      ...this.#t,
      type: "text",
      // dump用
      alpha: o.alpha,
      text: o.text,
      width: o.width,
      height: o.height
    };
    let r = !1;
    if (this.#t.width = this.width, this.#t.height = this.height, t.b_pic && (this.#t.b_pic = t.b_pic, this.#r = new u(
      t.b_pic,
      this,
      (c) => {
        this.#l(c, o), this.#t.width = this.width, this.#t.height = this.height, o.name = JSON.stringify(this.#t);
      },
      (c) => {
        H.setBlendmode(this, t), c && s();
      }
    ), r = this.#r.ret), o.name = JSON.stringify(this.#t), this.addChild(o), this.#n.width = o.width, this.#n.height = o.height, t.b_pic || H.setBlendmode(this, t), z.#s(this, o), !this.#t.enabled) {
      r || s();
      return;
    }
    const l = a.clone();
    if (t.style_hover) try {
      const c = JSON.parse(t.style_hover);
      for (const [p, f] of Object.entries(c)) l[p] = f;
    } catch (c) {
      throw c instanceof SyntaxError ? new Error(dt(t, "style_hover", c.message)) : "fn:Button.ts style_hover";
    }
    else l.fill = "white";
    const d = l.clone();
    if (t.style_clicked) try {
      const c = JSON.parse(t.style_clicked);
      for (const [p, f] of Object.entries(c)) d[p] = f;
    } catch (c) {
      throw c instanceof SyntaxError ? new Error(dt(t, "style_clicked", c.message)) : "fn:Button.ts style_clicked";
    }
    else d.dropShadow = !1;
    this.normal = () => {
      o.style = a;
    }, this.#p = () => i() ? (o.style = l, !0) : !1, this.#u = () => {
      o.style = d;
    }, r || s();
  }
  static fontFamily = "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif";
  static #s = (t, e) => {
  };
  static #e = (t, e, s, i) => {
  };
  static init(t) {
    t.oCfg.debug.masume && (z.#s = (e, s) => e.addChild(
      new U().beginFill(8926088, 0.2).lineStyle(1, 8926088, 1).drawRect(s.x, s.y, s.width, s.height).endFill()
    ), z.#e = (e, s, i, n) => e.addChild(
      new U().beginFill(8926088, 0.2).lineStyle(1, 8926088, 1).drawRect(s.x, s.y, i, n).endFill()
    ));
  }
  setText(t) {
  }
  getBtnBounds = () => this.#n;
  // 文字ボタンは背景画像を含まない位置指定なので、その当たり判定用
  #n = new Y();
  #r = new u();
  //	#idc		: DesignCast;
  #t;
  destroy() {
    this.evtMng.unButton(this), this.#r.destroy(), super.destroy();
  }
  makeDesignCast(t) {
  }
  showDesignCast() {
  }
  //	showDesignCast() {this.#idc.visible = true}
  cvsResize() {
  }
  #l(t, e) {
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
  #u = () => {
  };
  #c(t) {
    this.#t.alpha = t.alpha = x(this.hArg, "alpha", t.alpha);
    const e = t.width / 3, s = this.#t.enabled ? e : t.width, i = t.height, n = t.texture.baseTexture, a = new J(n, new Y(0, 0, e, i)), o = new J(n, new Y(e, 0, e, i)), r = new J(n, new Y(e * 2, 0, e, i)), l = () => {
      t.texture = a;
    };
    this.#t.enabled && l(), this.normal = l, this.#p = () => this.canFocus() ? (t.texture = r, !0) : !1, this.#u = () => {
      t.texture = o;
    }, "width" in this.hArg ? (this.#t.width = V(this.hArg.width), this.scale.x *= this.#t.width / s) : this.#t.width = s, "height" in this.hArg ? (this.#t.height = V(this.hArg.height), this.scale.y *= this.#t.height / i) : this.#t.height = i, t.name = JSON.stringify(this.#t), z.#e(this, t, s, i);
  }
}
class P extends H {
  static #s;
  static #e;
  static #n;
  static #r;
  static init(t, e, s, i, n, a) {
    this.#s = t, w.init(t, a), this.#e = s, this.#r = i, this.#n = n, s.setDoRecProc((o) => this.chgDoRec(o)), e.autowc = (o) => this.#i(o), e.autowc({ enabled: !1, text: "", time: 0 }), e.ch_in_style = (o) => this.#t(o), e.ch_out_style = (o) => this.#l(o), w.initChStyle(), Ft(), ot(
      t.matchPath(".+", Z.FONT).flatMap((o) => Object.values(o).map((r) => `
@font-face {
	font-family: '${r}';
	src: url('${this.#s.searchPath(String(r), Z.FONT)}');
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
    ), this.#t({
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
    }), this.#l({
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
    const e = w.ch_in_style(t), s = e.x.startsWith("=") ? `${e.nx * 100}%` : `${e.nx}px`, i = e.y.startsWith("=") ? `${e.ny * 100}%` : `${e.ny}px`, { name: n } = t;
    return ot(`
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
  static #l(t) {
    const e = w.ch_out_style(t), s = e.x.startsWith("=") ? `${e.nx * 100}%` : `${e.nx}px`, i = e.y.startsWith("=") ? `${e.ny * 100}%` : `${e.ny}px`, { name: n } = t;
    return ot(`
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
  static #u;
  static setEvtMng(t, e, s) {
    this.#p = t, this.#u = e, w.setEvtMng(t, s);
  }
  // 文字ごとのウェイト
  static #c = !1;
  static #x = {};
  static #i(t) {
    this.#c = R(t, "enabled", this.#c), this.#e.setVal_Nochk("save", "const.sn.autowc.enabled", this.#c);
    const { text: e } = t;
    if ("text" in t != "time" in t) throw "[autowc] textとtimeは同時指定必須です";
    if (this.#e.setVal_Nochk("save", "const.sn.autowc.text", e), !e)
      return this.#e.setVal_Nochk("save", "const.sn.autowc.time", ""), !1;
    const s = e.length;
    if (this.#c && s === 0) throw '[autowc] enabled === false かつ text === "" は許されません';
    const i = String(t.time).split(",");
    if (i.length !== s) throw "[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい";
    this.#x = {};
    for (let n = 0; n < s; ++n) this.#x[e[n]] = V(i[n]);
    return this.#e.setVal_Nochk("save", "const.sn.autowc.time", t.time), !1;
  }
  // バック
  #d = 0;
  #f = 0;
  #y = !1;
  #a = void 0;
  #g = "";
  // 背景画像無し（＝単色塗り）
  // 文字表示
  #o = new w(this.ctn, () => this.canFocus(), P.#u);
  #I = new pt();
  #k = document.createElement("span");
  // cssチェック・保存用
  static #w = {
    "text-align": 0,
    "text-align-last": 0,
    height: 0,
    width: 0,
    "padding-left": 0,
    "padding-right": 0,
    "padding-top": 0,
    "padding-bottom": 0
  };
  #v = new W();
  constructor() {
    super(), this.ctn.addChild(this.#o), this.#I.init(this.#Q), this.ctn.addChild(this.#v), this.#v.name = "cntBtn", this.lay({ style: `width: ${S.stageW}px; height: ${S.stageH}px; font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif; color: white; font-size: 24px; line-height: 1.5; padding: 16px;`, in_style: "default", out_style: "default", back_clear: "true" });
  }
  destroy() {
    this.#a && (this.ctn.removeChild(this.#a).destroy(), this.#a = void 0), P.#r.pagebreak(), this.#o.destroy();
  }
  static destroy() {
    this.#c = !1, this.#x = {}, this.#W = (t) => t;
  }
  set name(t) {
    this.name_ = t, this.#o.name = t;
  }
  get name() {
    return this.name_;
  }
  // getは継承しないらしい
  cvsResize() {
    this.#o.cvsResize();
  }
  cvsResizeChildren() {
    for (const t of this.#v.children) t.cvsResize();
  }
  procSetX(t) {
    this.#o.lay({ x: t });
  }
  procSetY(t) {
    this.#o.lay({ y: t });
  }
  lay(t) {
    if (super.lay(t), H.setXY(this.ctn, t, this.ctn), t[":id_tag"] = this.name_.slice(0, -7), pt.setting(t), this.#H(t), this.#o.lay(t), "r_align" in t && (this.#S = t.r_align ?? ""), this.#m = S.isSafari ? this.#o.tategaki ? (i, n) => `text-align: start; height: ${n}em; padding-top: ${i}; padding-bottom: ${i};` : (i, n) => `text-align: start; width: ${n}em; padding-left: ${i}; padding-right: ${i};` : this.#o.tategaki ? (i) => `text-align: justify; text-align-last: justify; padding-top: ${i}; padding-bottom: ${i};` : (i) => `text-align: justify; text-align-last: justify; padding-left: ${i}; padding-right: ${i};`, S.isFirefox && (this.#L = this.#M), "r_style" in t)
      if (t.r_style) {
        const i = document.createElement("span");
        i.style.cssText = t.r_style;
        const n = i.style.length, a = this.#k.style;
        for (let o = 0; o < n; ++o) {
          const r = i.style[o];
          if (r in P.#w) {
            it.myTrace(`${r}は指定できません`, "W");
            continue;
          }
          const l = i.style[r];
          l && (a[r] = l);
        }
      } else this.#k.style.cssText = "";
    if ("alpha" in t) for (const i of this.#v.children) i.alpha = this.ctn.alpha;
    this.#h(t), this.#V(t);
    const e = F.procID + `TxtLayer lay name:${this.name_}`, s = this.#j(t, (i) => {
      i && F.endProc(e);
    });
    return s && F.beginProc(e), s;
  }
  #h(t) {
    const { in_style: e } = t;
    if (!e) return;
    const s = w.getChInStyle(e);
    if (!s) throw `存在しないin_style【${e}】です`;
    this.#b = e, this.#E = s.join;
  }
  #b = "";
  #E = !0;
  get width() {
    return this.#o.getWidth;
  }
  get height() {
    return this.#o.getHeight;
  }
  #V(t) {
    const { out_style: e } = t;
    if (!e) return;
    if (!w.getChOutStyle(e)) throw `存在しないout_style【${e}】です`;
    this.#F = e;
  }
  #F = "";
  #z = new u();
  #j(t, e) {
    if ("back_clear" in t)
      return R(t, "back_clear", !1) && (this.#d = 0, this.#f = 0, this.#y = !1, this.#g = ""), e(!1), !1;
    this.#f = x(t, "b_alpha", this.#f), this.#y = R(t, "b_alpha_isfixed", this.#y);
    const s = (this.#y ? 1 : Number(P.#e.getVal("sys:TextLayer.Back.Alpha"))) * this.#f;
    if (t.b_pic) {
      if (this.#g !== t.b_pic)
        return this.#g = t.b_pic, this.#a && (this.ctn.removeChild(this.#a), this.#a.destroy()), this.#z = new u(this.#g, this.ctn, (i) => {
          this.#a = i, i.name = "back(pic)", i.visible = s > 0, i.alpha = s, this.#o.setMySize(i.width, i.height), this.ctn.setChildIndex(i, 0), e(!0);
        }), this.#z.ret;
    } else "b_color" in t && (this.#d = vt(t, "b_color", 0), this.#a && (this.ctn.removeChild(this.#a), this.#a.destroy()), this.#g = "", this.ctn.addChildAt(
      (this.#a = new U()).beginFill(this.#d, s).lineStyle(void 0).drawRect(0, 0, this.#o.getWidth, this.#o.getHeight).endFill(),
      0
    ), this.#a.name = "back(color)");
    return this.#a && (this.#a.visible = s > 0, this.#a.alpha = s), e(!1), !1;
  }
  chgBackAlpha(t) {
    const e = this.#y ? this.#f : t * this.#f;
    this.#a instanceof U && (this.#a && (this.ctn.removeChild(this.#a), this.#a.destroy()), this.ctn.addChildAt(
      (this.#a = new U()).beginFill(this.#d, e).lineStyle(void 0).drawRect(0, 0, this.#o.getWidth, this.#o.getHeight).endFill(),
      0
    ), this.#a.name = "back(color)"), this.#a && (this.#a.visible = e > 0, this.#a.alpha = e);
  }
  #H(t) {
    "noffs" in t && (this.#N = t.noffs ?? "", this.#_ = new RegExp(`[　${this.#N}]`)), "ffs" in t && (this.#O ??= "", this.#$ = this.#O === "" ? () => "" : (e) => this.#_.test(e) ? "" : ` font-feature-settings: ${this.#O};`);
  }
  #O = "";
  #$ = (t) => "";
  #N = "";
  // eslint-disable-next-line no-irregular-whitespace
  #_ = /[　]/;
  // Safariが全体に「font-feature-settings」した後、特定文字の「font-feature-settings: initial;」を受け付けてくれないのでわざわざ一つずつ指定
  static chgDoRec(t) {
    this.#W = t ? (e) => e : (e) => `<span class='offrec'>${e}</span>`;
  }
  static #W = (t) => t;
  isCur = !1;
  #m = () => "";
  #L = (t, e, s, i = "") => {
    if (!s) return ` style='${i}'`;
    const n = t.length * 2;
    if (n - e.length < 0) return ` style='text-align: ${s}; ${i}'`;
    let a = "";
    switch (s) {
      case "justify":
        a = this.#m("0", n);
        break;
      case "121":
        a = this.#m(`calc(${(n - e.length) / (e.length * 2)}em)`, n);
        break;
      case "even":
        a = this.#m(`calc(${(n - e.length) / (e.length + 1)}em)`, n);
        break;
      case "1ruby":
        a = this.#m("1em", n);
        break;
      default:
        a = `text-align: ${s};`;
    }
    return ` style='${a} ${i}'`;
  };
  #S = "";
  #M(t, e, s, i = "") {
    if (!s) return ` style='${i}'`;
    const n = t.length * 2;
    if (n - e.length < 0) return ` style='text-align: ${s}; ${i}'`;
    let a = "";
    switch (s) {
      case "left":
        a = "ruby-align: start;";
        break;
      case "center":
        a = "ruby-align: center;";
        break;
      case "right":
        a = "ruby-align: start;";
        break;
      case "justify":
        a = "ruby-align: space-between;";
        break;
      case "121":
        a = "ruby-align: space-around;";
        break;
      case "even":
        {
          const o = (n - e.length) / (e.length + 1);
          a = "ruby-align: space-between; " + (this.#o.tategaki ? `padding-top: ${o}em; padding-bottom: ${o}em;` : `padding-left: ${o}em; padding-right: ${o}em;`);
        }
        break;
      case "1ruby":
        a = "ruby-align: space-between; " + (this.#o.tategaki ? "padding-top: 1em; padding-bottom: 1em;" : "padding-left: 1em; padding-right: 1em;");
        break;
      default:
        a = `text-align: ${s};`;
    }
    return ` style='${a} ${i}'`;
  }
  tagCh(t) {
    this.#I.putTxt(t);
  }
  #R = !1;
  get needGoTxt() {
    return this.#R;
  }
  #Q = (t, e) => {
    let s = e;
    P.#s.oCfg.debug.putCh && console.log(`🖊 文字表示 text:\`${t}\`(${t.charCodeAt(0).toString(16)}) ruby:\`${s}\` name:\`${this.name_}\``);
    const i = s.split("｜");
    let n = "";
    const [a, ...o] = i, r = o.join("｜");
    switch (i.length) {
      case 1:
        if (this.#R = !0, t === `
`) {
          this.#B ? (this.#B = !1, n = "<ruby>&emsp;<rt>&emsp;</rt></ruby><br/>") : n = "<br/>";
          break;
        }
        this.#B && (this.#B = !1, s === "" && (s = "&emsp;")), n = this.#Y(t, s, this.#S);
        break;
      default:
        switch (a) {
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
            this.#B = !1, this.#R = !0, n = this.#Y(t, r, a);
            break;
          case "gotxt":
            this.#X(), this.#R ? (this.isCur && P.#r.recText(
              this.#C.join("").replace(/^<ruby>&emsp;<rt>&emsp;<\/rt><\/ruby>(<br\/>)+/, "").replaceAll(/style='(anim\S+ [^;]+;\s*)+/g, "style='").replaceAll(/( style=''| data-(add|arg|cmd)='[^']+'|\n+|\t+)/g, "").replaceAll(/class='sn_ch[^']+/g, "class='sn_ch").replaceAll("display: none;", "").replaceAll("class='offrec'", "style='display: none;'")
            ), this.#o.goTxt(this.#C, this.#J === 0), this.#R = !1, this.#J = 0) : this.isCur && this.#o.noticeCompTxt();
            return;
          // breakではない
          case "add":
            {
              const l = JSON.parse(r), { style: d = "", wait: c = null } = l, { cl: p, sty: f } = this.#U(!0, c ? V(c) : null);
              this.#C.push(`<span${p} style='${f} display: inline; ${d}'>`), delete l.style, this.#P(l);
            }
            return;
          // breakではない
          case "add_close":
            this.#C.push("</span>"), this.#X();
            return;
          // breakではない
          case "grp":
            this.#R = !0;
            {
              const l = JSON.parse(r);
              if (l.id ??= String(this.#C.length), l.id === "break") {
                this.#o.dispBreak(l);
                return;
              }
              this.#B = !1, l.delay = this.#J, l.r ??= "", l.style ??= "", l.r_style ??= "";
              const { r: d, wait: c = null, r_style: p } = l, { cl: f, sty: h, lnk: y } = this.#U(!0, c ? V(c) : null);
              n = `<span${f} style='${h} ${l.style}'><ruby><span data-cmd='grp' data-arg='${JSON.stringify(l)}'${y} style='${h} display: inline;'>&emsp;</span><rt${y}${this.#L(
                "　",
                d,
                this.#S,
                this.#k.style.cssText + (this.#T.at(-1)?.o.r_style ?? "") + p
              )}>${l.r}</rt></ruby></span>`;
            }
            break;
          case "tcy":
            this.#B = !1, this.#R = !0;
            {
              const { t: l = "", r: d = "", wait: c = null, style: p = "", r_style: f = "" } = JSON.parse(r);
              P.#e.doRecLog() && (this.#q += t + (s ? `《${s}》` : ""), this.#D += l);
              const h = S.isSafari ? d.replaceAll(/[A-Za-z0-9]/g, (m) => String.fromCharCode(m.charCodeAt(0) + 65248)) : d, { cl: y, sty: g, lnk: k } = this.#U(!0, c ? V(c) : null);
              n = `<span${y} style='${g}${this.#$(l)} ${p}'><ruby><span${k} style='${g} display: inline; text-combine-upright: all;'>${l}</span><rt${k}${this.#L(
                l,
                h,
                this.#S,
                this.#k.style.cssText + (this.#T.at(-1)?.o.r_style ?? "") + f
              )}>${h}</rt></ruby></span>`;
            }
            break;
          case "del":
            w.delBreak();
            return;
          // breakではない
          case "span":
            this.#R = !0, this.#K(JSON.parse(r));
            return;
          // breakではない
          case "link":
            this.#R = !0;
            {
              const l = JSON.parse(r);
              l[":link"] = " data-lnk='@'";
              const { cl: d, sty: c, curpos: p } = this.#U(!1, l.wait ? V(l.wait) : null);
              this.#C.push(`<span${d} style='${c} display: inline; ${l.style ?? ""}' ${p} data-arg='${r}'>`), delete l.style, this.#K(l);
            }
            return;
          // breakではない
          case "endlink":
            this.#R = !0, this.#C.push("</span>"), this.#X();
            return;
          // breakではない
          default:
            this.#R = !0, n = this.#Y(t, s, this.#S);
        }
        break;
    }
    this.#C.push(P.#W(n));
  };
  #Y(t, e, s) {
    const i = t === " " ? "&nbsp;" : t === "　" ? "&emsp;" : t;
    P.#e.doRecLog() && (this.#q += i + (e ? `《${e}》` : ""), t !== " " && (this.#D += t));
    const { cl: n, sty: a, lnk: o } = this.#U(!0, null, t);
    return e ? `<span${n} style='${a} ${this.#$(t)}'><ruby>${// 文字個別に出現させるため以下にも ${cl} が必要
    Array.from(t).map((r, l) => `<span${n}${o} style='${l > 0 ? this.#U(!0, null, t).sty : a} display: inline;'>${r === " " ? "&nbsp;" : r === "　" ? "&emsp;" : r}</span>`).join("")}<rt${o}${this.#L(
      t,
      e,
      s,
      this.#k.style.cssText + (this.#T.at(-1)?.o.r_style ?? "")
    )}>${e}</rt></ruby></span>` : `<span${n} style='${a} ${this.#$(t)}'${o}>${i}</span>`;
  }
  #U(t, e, s = `
`) {
    const i = this.#E ? e ?? this.#T.at(0)?.o.wait ?? (P.#c ? P.#x[s.at(0) ?? ""] ?? 0 : G.msecChWait) : 0;
    P.#p.isSkipping ? this.#J = 0 : t && this.#E && (this.#J += V(i));
    const n = `data-add='{"ch_in_style":"${this.#b}", "ch_out_style":"${this.#F}"}'`;
    return {
      cl: ` class='sn_ch sn_ch_yet sn_ch_in_${this.#b}'`,
      // TxtStage.goTxt()はこれ単位で文字出現させる
      sty: `animation-delay: ${this.#J}ms;${this.#T.at(-1)?.o.style ?? ""}`,
      // TxtStage.goTxt()はこれ単位で文字出現させる
      lnk: (this.#T.at(0)?.o[":link"] ?? "") + " " + n,
      curpos: n
    };
  }
  #J = 0;
  #B = !0;
  #C = [];
  #T = [];
  #P(t) {
    this.#T.push({
      o: t,
      r_align: this.#S,
      ch_in_style: this.#b,
      ch_out_style: this.#F
    }), t.r_align && (this.#S = t.r_align), this.#h(t), this.#V(t);
  }
  #X() {
    const t = this.#T.pop();
    t && (this.#S = t.r_align, this.#h({ in_style: t.ch_in_style }), this.#V({ out_style: t.ch_out_style }));
  }
  #K(t) {
    const e = this.#T.at(-1);
    if (!e) {
      this.#P(t);
      return;
    }
    e.o = { ...e.o, ...t }, !t.style && !t.r_style && (e.o.style = "", e.o.r_style = ""), t.r_align && (this.#S = t.r_align), this.#h(t), this.#V(t);
  }
  click = () => !this.ctn.interactiveChildren || !this.ctn.visible ? !1 : this.#o.skipChIn();
  clearText() {
    this.ctn.addChild(this.#o = this.#o.reNew()), this.#J = 0, this.#B = !0, this.#C = [], this.#q = "", this.#D = "", P.#r.pagebreak();
  }
  #q = "";
  #D = "";
  get pageText() {
    return this.#q.replace("《&emsp;》", "");
  }
  get pagePlainText() {
    return this.#D;
  }
  get enabled() {
    return this.ctn.interactiveChildren;
  }
  set enabled(t) {
    this.ctn.interactiveChildren = t;
  }
  addButton = (t) => new Promise((e) => {
    t.key = `btn=[${this.#v.children.length}] ` + this.name_, t[":id_tag"] = t.key.slice(0, -7), R(t, "hint_tate", this.#o.tategaki);
    const s = new z(t, P.#p, () => e(), () => this.canFocus());
    s.name = JSON.stringify(t).replaceAll('"', "'"), this.#v.addChild(s);
  });
  canFocus() {
    return (this.ctn.interactiveChildren ?? !1) && this.ctn.visible && P.#n(this);
  }
  clearLay(t) {
    super.clearLay(t), this.clearText();
    for (const e of this.#v.removeChildren()) e.destroy();
  }
  record = () => ({
    ...super.record(),
    enabled: this.enabled,
    r_cssText: this.#k.style.cssText,
    r_align: this.#S,
    // バック
    b_do: this.#a === void 0 ? void 0 : this.#a instanceof j ? "Sprite" : "Graphics",
    b_pic: this.#g,
    b_color: this.#d,
    b_alpha: this.#f,
    b_alpha_isfixed: this.#y,
    ffs: this.#O,
    txs: this.#o.record(),
    strNoFFS: this.#N,
    btns: this.#v.children.map((t) => t.name)
  });
  playback(t, e) {
    super.playback(t, e), this.enabled = t.enabled, this.#k.style.cssText = t.r_cssText, this.#S = t.r_align, this.cvsResize(), this.#H(t), this.#o.playback(t.txs), this.#f = t.b_alpha, this.#y = t.b_alpha_isfixed, e.push(
      new Promise((s) => {
        const i = t.b_do ? t.b_do === "Sprite" ? { b_pic: t.b_pic } : { b_color: t.b_color } : { b_pic: "" };
        i.b_alpha = t.b_alpha, i.b_alpha_isfixed = t.b_alpha_isfixed, this.#j(i, (n) => {
          n && s();
        }) || s();
      }),
      ...t.btns.map((s) => this.addButton(JSON.parse(s.replaceAll("'", '"')))).flat()
    );
  }
  get cssText() {
    return this.#o.cssText;
  }
  set cssText(t) {
    this.#o.cssText = t;
  }
  snapshot(t, e) {
    t.render(this.ctn, { clear: !1 }), this.#o.snapshot(t, e);
  }
  snapshot_end() {
    this.#o.snapshot_end();
  }
  makeDesignCast(t) {
    this.ctn.visible && this.#o.makeDesignCast(t);
  }
  makeDesignCastChildren(t) {
    if (this.ctn.visible)
      for (const e of this.#v.children) e.makeDesignCast(t);
  }
  showDesignCast() {
    this.#o.showDesignCast();
  }
  showDesignCastChildren() {
    for (const t of this.#v.children) t.showDesignCast();
  }
  dump() {
    return this.#Q("", "gotxt｜"), super.dump() + `, "enabled":"${this.enabled}", ${this.#o.dump()}, "b_pic":"${this.#g}", "b_color":"${this.#d}", "b_alpha":${this.#f}, "b_alpha_isfixed":"${this.#y}", "width":${this.#o.getWidth}, "height":${this.#o.getHeight}, "pixi_obj":[${this.ctn.children.map((t) => `{"class":"${t instanceof j ? "Sprite" : t instanceof U ? "Graphics" : t instanceof W ? "Container" : "?"}", "name":"${t.name}", "alpha":${t.alpha}, "x":${t.x}, "y":${t.y}, "visible":"${t.visible}"}`).join(",")}], "button":[${this.#v.children.map((t) => t.children[0]?.name ?? "{}").join(",")}]`;
  }
}
class C {
  constructor(t, e, s) {
    this.appPixi = e, this.val = s, t.add_frame = (i) => this.#p(i), t.let_frame = (i) => this.#f(i), t.set_frame = (i) => this.#y(i), t.frame = (i) => this.#g(i), t.tsy_frame = (i) => this.#o(i);
  }
  static #s;
  static #e;
  static #n;
  static init(t, e, s) {
    C.#s = t, C.#e = e, C.#n = s;
  }
  #r;
  setEvtMng(t) {
    this.#r = t;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  #t = /* @__PURE__ */ Object.create(null);
  destroy() {
    for (const t of Object.values(this.#t)) t.parentElement.removeChild(t);
    this.#t = /* @__PURE__ */ Object.create(null);
  }
  hideAllFrame() {
    for (const [t, { style: e }] of Object.entries(this.#t))
      this.#l[t] = e.display !== "none", e.display = "none";
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  #l = /* @__PURE__ */ Object.create(null);
  restoreAllFrame() {
    for (const [t, e] of Object.entries(this.#l)) {
      const s = this.#t[t];
      s && (s.style.display = e ? "inline" : "none");
    }
    this.#l = /* @__PURE__ */ Object.create(null);
  }
  //	HTMLフレーム
  // フレーム追加
  #p(t) {
    const { id: e, src: s, alpha: i = 1, scale_x: n = 1, scale_y: a = 1, rotate: o = 0 } = t;
    if (!e) throw "idは必須です";
    if (!s) throw "srcは必須です";
    const r = "const.sn.frm." + e;
    if (this.val.getVal(`tmp:${r}`)) throw `frame【${e}】はすでにあります`;
    const l = R(t, "visible", !0), d = t.b_color ? ` background-color: ${t.b_color};` : "", c = this.#c(t);
    C.#n.cvs.insertAdjacentHTML("beforebegin", `<iframe id="${e}" style="opacity: ${i}; ${d} position: absolute; left:${C.#e.ofsLeft4elm + c.x * C.#e.cvsScale}px; top: ${C.#e.ofsTop4elm + c.y * C.#e.cvsScale}px; z-index: 1; border: 0px; overflow: hidden; display: ${l ? "inline" : "none"}; transform: scale(${n}, ${a}) rotate(${o}deg);" width="${c.width * C.#e.cvsScale}" height="${c.height * C.#e.cvsScale}"></iframe>`);
    const p = F.procID + `add_frame id:${e}`;
    F.beginProc(p);
    const f = C.#s.searchPath(s, Z.HTML), h = new Q().add({ name: s, url: f, xhrType: D.XHR_RESPONSE_TYPE.TEXT });
    return C.#e.arg.crypto && h.use(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      (y, g) => void C.#e.dec(y.extension, y.data).then((k) => {
        y.data = k, g();
      }).catch((k) => {
        C.#n.errScript(`[add_frame]Html ロード失敗です src:${y.name} ${k}`, !1), g();
      })
    ), h.load((y, g) => {
      const k = document.getElementById(e);
      this.#t[e] = k, this.#u[e] = !1;
      const m = f.lastIndexOf("/") + 1, b = f.slice(0, m), N = b.slice(0, m);
      k.srcdoc = String(g[s]?.data).replace("sn_repRes();", "").replaceAll(
        /\s(?:src|href)=(["'])(\S+?)\1/g,
        // 【\s】が大事、data-src弾く
        (_, T, $) => $.startsWith("../") ? N + _.slice(3) : _.replace("./", "").replace(T, T + b)
      ), k.srcdoc.includes("true/*WEBP*/;") && (k.srcdoc = k.srcdoc.replaceAll(
        /data-src="(.+?\.)(?:jpe?g|png)/g,
        (_, T) => `data-src="${T}webp`
      )), k.onload = () => {
        F.endProc(p), this.val.setVal_Nochk("tmp", r, !0), this.val.setVal_Nochk("tmp", r + ".alpha", i), this.val.setVal_Nochk("tmp", r + ".x", c.x), this.val.setVal_Nochk("tmp", r + ".y", c.y), this.val.setVal_Nochk("tmp", r + ".scale_x", n), this.val.setVal_Nochk("tmp", r + ".scale_y", a), this.val.setVal_Nochk("tmp", r + ".rotate", o), this.val.setVal_Nochk("tmp", r + ".width", c.width), this.val.setVal_Nochk("tmp", r + ".height", c.height), this.val.setVal_Nochk("tmp", r + ".visible", l);
        const _ = k.contentWindow;
        this.#r.resvFlameEvent(_.document.body), _.sn_repRes?.((T) => C.#x(T.dataset.src ?? "", T));
      };
    }), !0;
  }
  #u = {};
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  getFrmDisabled(t) {
    return this.#u[t];
  }
  #c(t) {
    const e = { ...t }, s = C.#e.resolution;
    return new DOMRect(
      x(e, "x", 0) * s,
      x(e, "y", 0) * s,
      x(e, "width", S.stageW) * s,
      x(e, "height", S.stageH) * s
    );
  }
  static #x(t, e, s) {
    const i = this.#d[t];
    if (i) {
      e.src = i, s && (e.onload = () => s(e));
      return;
    }
    const n = this.#i[t];
    if (n) {
      n.push(e);
      return;
    }
    this.#i[t] = [e];
    const [a = "", o = ""] = t.split("?"), r = C.#s.searchPath(a, Z.SP_GSM), l = new Q().add({ name: t, url: r, xhrType: D.XHR_RESPONSE_TYPE.BUFFER });
    C.#e.use4ViteElectron(t, r, l, C.#n) || C.#e.arg.crypto && r.endsWith(".bin") && l.use((d, c) => {
      if (d.extension !== "bin") {
        c();
        return;
      }
      C.#e.decAB(d.data).then((p) => {
        d.data = p, p instanceof HTMLImageElement && (d.type = D.TYPE.IMAGE), c();
      }).catch((p) => {
        C.#n.errScript(`FrameMng loadPic ロード失敗です fn:${d.name} ${p}`, !1), c();
      });
    }), l.load((d, c) => {
      for (const [p, { data: { src: f } }] of Object.entries(c)) {
        const h = this.#d[p] = f + // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        (f.startsWith("blob:") || f.startsWith("data:") ? "" : o ? "?" + o : ""), y = this.#i[p];
        if (y) for (const g of y)
          g.src = h, s && (g.onload = () => s(g));
        delete this.#i[p];
      }
    });
  }
  static #i = {};
  static #d = {};
  cvsResize() {
    for (const [t, e] of Object.entries(this.#t)) {
      const s = "const.sn.frm." + t, i = Number(this.val.getVal(s + ".x")), n = Number(this.val.getVal(s + ".y")), a = Number(this.val.getVal(s + ".width")), o = Number(this.val.getVal(s + ".height"));
      e.style.left = `${C.#e.ofsLeft4elm + i * C.#e.cvsScale}px`, e.style.top = `${C.#e.ofsTop4elm + n * C.#e.cvsScale}px`, e.width = String(a * C.#e.cvsScale), e.height = String(o * C.#e.cvsScale);
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
    const a = i.contentWindow;
    if (!Object.hasOwn(a, s)) throw `frame【${e}】に変数/関数【${s}】がありません。変数は var付きにして下さい`;
    const o = a[s];
    return this.val.setVal_Nochk(
      "tmp",
      n + "." + s,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
      R(t, "function", !1) ? o() : o
    ), !1;
  }
  // フレーム変数に設定
  #y(t) {
    const { id: e, var_name: s, text: i } = t;
    if (!e) throw "idは必須です";
    const n = document.getElementById(e);
    if (!n) throw `id【${e}】はフレームではありません`;
    const a = "const.sn.frm." + e;
    if (!this.val.getVal(`tmp:${a}`)) throw `frame【${e}】が読み込まれていません`;
    if (!s) throw "var_nameは必須です";
    if (!i) throw "textは必須です";
    this.val.setVal_Nochk("tmp", a + "." + s, i);
    const o = n.contentWindow;
    return o[s] = i, !1;
  }
  // フレームに設定
  #a = 1;
  #g(t) {
    const { id: e } = t;
    if (!e) throw "idは必須です";
    const s = document.getElementById(e);
    if (!s) throw `id【${e}】はフレームではありません`;
    const i = "const.sn.frm." + e;
    if (!this.val.getVal("tmp:" + i)) throw `frame【${e}】が読み込まれていません`;
    const n = s.style;
    if (R(t, "float", !1) ? n.zIndex = `${++this.#a}` : "index" in t ? n.zIndex = `${x(t, "index", 0)}` : t.dive && (n.zIndex = `-${++this.#a}`), "alpha" in t) {
      const o = n.opacity = String(t.alpha);
      this.val.setVal_Nochk("tmp", i + ".alpha", o);
    }
    const a = this.#c(t);
    if (("x" in t || "y" in t) && (n.left = `${C.#e.ofsLeft4elm + a.x * C.#e.cvsScale}px`, n.top = `${C.#e.ofsTop4elm + a.y * C.#e.cvsScale}px`, this.val.setVal_Nochk("tmp", i + ".x", a.x), this.val.setVal_Nochk("tmp", i + ".y", a.y)), "scale_x" in t || "scale_y" in t || "rotate" in t) {
      const o = x(t, "scale_x", 1), r = x(t, "scale_y", 1), l = x(t, "rotate", 0);
      n.transform = `scale(${o}, ${r}) rotate(${l}deg)`, this.val.setVal_Nochk("tmp", i + ".scale_x", o), this.val.setVal_Nochk("tmp", i + ".scale_y", r), this.val.setVal_Nochk("tmp", i + ".rotate", l);
    }
    if ("width" in t && (s.width = String(a.width * C.#e.cvsScale), this.val.setVal_Nochk("tmp", i + ".width", a.width)), "height" in t && (s.height = String(a.height * C.#e.cvsScale), this.val.setVal_Nochk("tmp", i + ".height", a.height)), "visible" in t) {
      const o = R(t, "visible", !0);
      n.display = o ? "inline" : "none", this.val.setVal_Nochk("tmp", i + ".visible", o);
    }
    if ("b_color" in t && (n.backgroundColor = t.b_color), "disabled" in t) {
      const o = this.#u[e] = R(t, "disabled", !0), r = s.contentDocument.body;
      for (const l of [
        ...Array.from(r.getElementsByTagName("input")),
        ...Array.from(r.getElementsByTagName("select"))
      ]) l.disabled = o;
    }
    return !1;
  }
  // フレームをトゥイーン開始
  #o(t) {
    const { id: e, alpha: s, x: i, y: n, scale_x: a, scale_y: o, rotate: r, width: l, height: d } = t;
    if (!e) throw "idは必須です";
    const c = document.getElementById(e);
    if (!c) throw `id【${e}】はフレームではありません`;
    const p = "const.sn.frm." + e;
    if (!this.val.getVal(`tmp:${p}`, 0)) throw `frame【${e}】が読み込まれていません`;
    const f = {};
    s && (f.a = Number(c.style.opacity)), (i || n || a || o || r) && (f.x = Number(this.val.getVal(`tmp:${p}.x`)), f.y = Number(this.val.getVal(`tmp:${p}.y`)), f.sx = Number(this.val.getVal(`tmp:${p}.scale_x`)), f.sy = Number(this.val.getVal(`tmp:${p}.scale_y`)), f.r = Number(this.val.getVal(`tmp:${p}.rotate`))), l && (f.w = Number(this.val.getVal(`tmp:${p}.width`))), d && (f.h = Number(this.val.getVal(`tmp:${p}.height`)));
    const h = B.cnvTweenArg(t, f);
    let y = () => {
    };
    s && (x(h, "alpha", 0), y = () => {
      c.style.opacity = String(f.a), this.val.setVal_Nochk("tmp", "alpha", f.a);
    });
    let g = () => {
    };
    const k = this.#c(h);
    (i || n || a || o || r) && (k.x, k.y, x(h, "scale_x", 1), x(h, "scale_y", 1), x(h, "rotate", 0), g = () => {
      c.style.left = `${// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      C.#e.ofsLeft4elm + f.x * C.#e.cvsScale} px`, c.style.top = `${// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      C.#e.ofsTop4elm + f.y * C.#e.cvsScale} px`, c.style.transform = `scale(${f.sx}, ${f.sy}) rotate(${f.r}deg)`, this.val.setVal_Nochk("tmp", p + ".x", f.x), this.val.setVal_Nochk("tmp", p + ".y", f.y), this.val.setVal_Nochk("tmp", p + ".scale_x", f.sx), this.val.setVal_Nochk("tmp", p + ".scale_y", f.sy), this.val.setVal_Nochk("tmp", p + ".rotate", f.r);
    });
    let m = () => {
    };
    l && (k.width, m = () => {
      c.width = `${f.w * C.#e.cvsScale} px`, this.val.setVal_Nochk("tmp", p + ".width", f.w);
    });
    let b = () => {
    };
    return d && (k.height, b = () => {
      c.height = `${f.h * C.#e.cvsScale} px`, this.val.setVal_Nochk("tmp", p + ".height", f.h);
    }), this.appPixi.stage.interactive = !1, B.tween(`frm
${e}`, t, f, B.cnvTweenArg(t, f), () => {
      y(), g(), m(), b();
    }, () => {
      this.appPixi.stage.interactive = !0;
    }, () => {
    }), !1;
  }
}
class Gt {
  // 🍚
  constructor(t, e, s) {
    this.oCfg = t, this.hTag = e, this.val = s, e.rec_ch = (i) => this.#n(i), e.rec_r = (i) => this.#r(i), e.reset_rec = (i) => this.#t(i), s.defTmp("const.sn.log.json", () => {
      this.#s.text = // 🌾
      this.#s.text.replaceAll("</span><span class='sn_ch'>", "");
      const i = [...this.#e, this.#s];
      return JSON.stringify(i);
    }), this.recText("");
  }
  #s = { text: "" };
  // 🌾
  #e = [];
  // [ch] からコールされる
  //	[ch]		// 文字を追加する
  // recText(text: string) コール
  // 	🌾this.#LastLog		= {text};	// 置換でよい
  // 	🍊save:const.sn.sLog = 🦀const.sn.log.json	// これを起動したい
  recText(t) {
    this.#s.text = t, this.val.setVal_Nochk(
      "save",
      "const.sn.sLog",
      // 🍊 リプレイ時の回復用
      String(this.val.getVal("const.sn.log.json"))
      // これを起動したい
    );
  }
  //MARK: 履歴書き込み
  //	🌾this.#LastLog = {...hArg, text: 🌾this.#LastLog.text};
  #n(t) {
    return this.#s = { ...t, text: this.#s.text }, t.text ? (t.record = !0, t.style ??= "", t.style += "display: none;", t.wait = 0, this.hTag.ch(t)) : (this.val.setVal_Nochk(
      "save",
      "const.sn.sLog",
      // 🍊 リプレイ時の回復用
      String(this.val.getVal("const.sn.log.json"))
      // これを起動したい
    ), !1);
  }
  //MARK: 履歴改行
  #r(t) {
    return this.#n({ ...t, text: "[r]" });
  }
  //MARK: 履歴リセット
  //	以下をクリア。text で置き換え値を設定できる
  //	🌾this.#LastLog		= {text: hArg.text ?? ''};
  //	🍚this.#aLog		= []
  //	🍊save:const.sn.sLog= hArg.text ?[{text:"${hArg.text}"}] : []
  #t(t) {
    return this.#e = [], t.text ??= "", this.#s = { text: t.text }, this.val.setVal_Nochk("save", "const.sn.sLog", JSON.stringify([this.#s])), !1;
  }
  //MARK: 履歴改ページ
  pagebreak() {
    this.#s.text = // 🌾
    this.#s.text.replaceAll("</span><span class='sn_ch'>", ""), this.#s.text && (this.#e.push(this.#s) > this.oCfg.log.max_len && (this.#e = this.#e.slice(-this.oCfg.log.max_len)), this.#s = { text: "" });
  }
  //MARK: 履歴回復
  // save:const.sn.sLog からの復帰
  playback() {
    this.#e = JSON.parse(String(this.val.getVal("save:const.sn.sLog"))), this.#s = { text: "" };
  }
}
function X(q) {
  return encodeURIComponent(JSON.stringify(q));
}
class G {
  //MARK: コンストラクタ
  constructor(t, e, s, i, n, a, o, r, l) {
    this.cfg = t, this.hTag = e, this.appPixi = s, this.val = i, this.main = n, this.scrItr = a, this.sys = o;
    const d = () => {
      if (o.cvsResize(), this.cvsResizeDesign(), this.#x) for (const h of this.#b)
        this.#h[h].fore.cvsResizeChildren();
      else for (const h of this.#b)
        this.#h[h].fore.cvsResize();
      this.#r.cvsResize(), this.#f.cvsResize();
    };
    if (S.isMobile)
      this.#p.add(globalThis, "orientationchange", d, { passive: !0 });
    else {
      let h;
      this.#p.add(globalThis, "resize", () => {
        h || (h = setTimeout(() => {
          h = void 0, d();
        }, 1e3 / 60 * 10));
      }, { passive: !0 });
    }
    o.cvsResize(), this.#l = new Gt(this.cfg.oCfg, e, i), P.init(t, e, i, this.#l, (h) => this.#h[h.layname].fore === h, s), L.init(n, t, s, o, r, i), C.init(t, o, n), z.init(t), this.#r = new C(e, s, i), o.hFactoryCls.grp = () => new L(), o.hFactoryCls.txt = () => new P(), e.loadplugin = (h) => this.#w(h), e.snapshot = (h) => this.#g(h), this.#o = this.sys.isApp ? (h, y, g, k, m) => this.#I(h, y, g, k, m) : (h, y, g, k, m) => this.#k(h, y, g, k, m), e.add_lay = (h) => this.#v(h), e.clear_lay = (h) => this.#j(h), e.finish_trans = () => !1, e.lay = (h) => this.#F(h), e.trans = (h) => this.#W(h), e.wt = (h) => B.wt(h), e.quake = (h) => this.#M(h), e.stop_quake = e.finish_trans, e.wq = e.wt, e.pause_tsy = (h) => B.pause_tsy(h), e.resume_tsy = (h) => B.resume_tsy(h), e.stop_tsy = (h) => B.stop_tsy(h), e.tsy = (h) => this.#R(h), e.wait_tsy = (h) => B.wait_tsy(h), e.add_filter = (h) => this.#Q(h), e.clear_filter = (h) => this.#U(h), e.enable_filter = (h) => this.#J(h), e.ch = (h) => this.#T(h), e.clear_text = (h) => this.#A(h), e.current = (h) => this.#K(h), e.endlink = (h) => this.#tt(h), e.er = (h) => this.#et(h), e.graph = (h) => this.#st(h), e.link = (h) => this.#it(h), e.r = (h) => this.#nt(h), e.ruby2 = (h) => this.#at(h), e.span = (h) => this.#ot(h), e.tcy = (h) => this.#rt(h), e.add_face = (h) => u.add_face(h), e.wv = (h) => u.wv(h), e.dump_lay = (h) => this.#ht(h), e.enable_event = (h) => this.#lt(h), e.button = (h) => this.#ct(h), t.existsBreakline && (this.breakLine = (h) => {
      delete h.visible, h.id = "break", h.pic = "breakline", this.#a("grp｜" + X(h));
    }), t.existsBreakpage && (this.breakPage = (h) => {
      delete h.visible, h.id = "break", h.pic = "breakpage", this.#a("grp｜" + X(h));
    }), this.#t = Ot(String(t.oCfg.init.bg_color));
    const c = new U();
    c.beginFill(this.#t).lineStyle(0, this.#t).drawRect(0, 0, S.stageW, S.stageH).endFill(), this.#e.addChild(c.clone()), this.#n.addChild(c), this.#n.visible = !1, this.#e.name = "page:A", this.#n.name = "page:B", this.#s = s.stage, this.#s.addChild(this.#n), this.#s.addChild(this.#e), this.#s.addChild(this.#$), this.#s.addChild(this.#_), this.#s.name = "stage";
    const p = (h, y) => {
      this.#y(Number(y));
    };
    p("", i.getVal("sys:TextLayer.Back.Alpha", 1)), i.defValTrg("sys:TextLayer.Back.Alpha", p);
    const f = (h, y) => {
      z.fontFamily = y;
    };
    f("", i.getVal("tmp:sn.button.fontFamily", z.fontFamily)), i.defValTrg("tmp:sn.button.fontFamily", f), i.defTmp("const.sn.last_page_text", () => this.currentTxtlayFore?.pageText ?? ""), i.defTmp("const.sn.last_page_plain_text", () => this.currentTxtlayFore?.pagePlainText ?? ""), S.isDbg && (ut.init(s, o, a, l, t, this.#h), this.cvsResizeDesign = () => ut.cvsResizeDesign(), o.addHook((h, y) => {
      this.#u[h]?.(h, y) && delete this.#u[h];
    }));
  }
  #s;
  #e = new W();
  #n = new W();
  #r;
  #t;
  #l;
  #p = new kt();
  cvsResizeDesign() {
  }
  #u = {
    attach: (t) => !1,
    continue: (t) => !1,
    disconnect: (t) => !1,
    _enterDesign: (t) => {
      for (const e of this.#b) {
        const s = this.#h[e].fore;
        s.makeDesignCastChildren((i) => i.make()), s.makeDesignCast((i) => i.make());
      }
      return this.#i(this.#E), !1;
    },
    _replaceToken: (t, e) => !1,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    _selectNode: (t, e) => (this.#i(e.node), !1)
  };
  #c = "";
  #x = "";
  #i(t) {
    [this.#c = "", this.#x = ""] = t.split("/");
    const e = this.#h[this.#c];
    e && (this.#x ? e.fore.showDesignCastChildren() : e.fore.showDesignCast());
  }
  getFrmDisabled = (t) => this.#r.getFrmDisabled(t);
  #d = void 0;
  cover(t, e = 0) {
    this.#d && (this.#s.removeChild(this.#d), this.#d.destroy(), this.#d = void 0), t && this.#s.addChild(
      (this.#d = new U()).beginFill(e).lineStyle(0, e).drawRect(0, 0, S.stageW, S.stageH).endFill()
    );
  }
  #f;
  setEvtMng(t) {
    this.#f = t, this.#r.setEvtMng(t), u.setEvtMng(t), B.init(t, this.appPixi);
  }
  destroy() {
    for (const t of Object.values(this.#h)) t.destroy();
    this.#p.clear(), L.destroy(), pt.destroy(), w.destroy(), P.destroy(), this.#r.destroy(), B.destroy(), G.#C = 10;
  }
  // 既存の全文字レイヤの実際のバック不透明度、を再計算
  #y(t) {
    for (const e of this.#b) {
      const { fore: s, back: i } = this.#h[e];
      s instanceof P && (s.chgBackAlpha(t), i.chgBackAlpha(t));
    }
  }
  #a = (t, e = this.currentTxtlayForeNeedErr, s = !0) => e.tagCh("｜&emsp;《" + t + "》");
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
    this.currentTxtlayFore && (this.clearBreak = () => this.#a("del｜break"), this.clearBreak());
  }
  clickTxtLay() {
    return this.currentTxtlayFore ? this.#b.map((t) => this.#h[t].fore).some((t) => t instanceof P && t.click()) : !1;
  }
  //	//	システム
  //MARK: スナップショット
  #g(t) {
    const e = Bt("-", "_", "", "_"), s = t.fn ? t.fn.startsWith(It) ? t.fn : `${_t + t.fn + e}.png` : `${_t}snapshot${e}.png`, i = this.cfg.searchPath(s), n = x(t, "width", S.stageW), a = x(t, "height", S.stageH);
    return this.#o(t, i, n, a, `snapshot dt:${e}`);
  }
  #o = () => !1;
  #I({ layer: t }, e, s, i, n) {
    if (this.#r.hideAllFrame(), F.beginProc(n), !t)
      return this.sys.capturePage(e, s, i, () => {
        this.#r.restoreAllFrame(), F.endProc(n);
      }), !0;
    const a = this.#b.map((o) => {
      const { ctn: r } = this.#h[o].fore, l = [r, r.visible];
      return r.visible = !1, l;
    });
    for (const o of this.#m(t)) this.#h[o].fore.ctn.visible = !0;
    return this.sys.capturePage(e, s, i, () => {
      for (const [o, r] of a) o.visible = r;
      this.#r.restoreAllFrame(), F.endProc(n);
    }), !0;
  }
  #k(t, e, s, i, n) {
    F.beginProc(n);
    const a = vt(t, "b_color", this.#t), o = Vt({
      width: s,
      height: i,
      backgroundAlpha: a > 16777216 && e.endsWith(".png") ? 0 : 1,
      antialias: R(t, "smoothing", !1),
      preserveDrawingBuffer: !0,
      backgroundColor: a & 16777215,
      autoDensity: !0
    }), r = t.page !== "back" ? "fore" : "back", { layer: l } = t;
    return Promise.allSettled(
      this.#m(l).map((d) => new Promise(
        (c) => this.#h[d][r].snapshot(o, c)
      ))
    ).then(async () => {
      const d = tt.create({ width: o.width, height: o.height });
      o.render(this.#s, { renderTexture: d }), await this.sys.savePic(
        e,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        o.plugins.extract.base64(d)
      ), d.destroy();
      for (const c of this.#m(l)) this.#h[c][r].snapshot_end();
      o.destroy(!0), F.endProc(n);
    }), !0;
  }
  //MARK: プラグインの読み込み
  #w(t) {
    const { fn: e } = t;
    if (!e) throw "fnは必須です";
    if (!e.endsWith(".css")) throw "サポートされない拡張子です";
    const s = R(t, "join", !0), i = F.procID + `loadplugin fn:${e}`;
    return s && F.beginProc(i), (async () => {
      const n = await fetch(e);
      if (!n.ok) throw new Error("Network response was not ok.");
      ot(await n.text()), s && F.endProc(i);
    })(), s;
  }
  //	//	レイヤ共通
  //MARK: レイヤを追加する
  #v(t) {
    const { layer: e, class: s } = t;
    if (!e) throw "layerは必須です";
    if (e.includes(",")) throw "layer名に「,」は使えません";
    if (e in this.#h) throw `layer【${e}】はすでにあります`;
    if (!s) throw "clsは必須です";
    const i = { isWait: !1 };
    switch (this.#h[e] = new et(e, s, this.#e, this.#n, t, this.sys, this.val, i), this.#b.push(e), s) {
      case "txt":
        this.#E || (this.#Z = () => {
        }, this.#P = (n) => this.#X(n), this.#K = (n) => this.#q(n), this.hTag.current({ layer: e }), this.goTxt = () => {
          this.#f.isSkipping ? G.#C = 0 : this.setNormalChWait();
          for (const n of this.#b) {
            const a = this.#h[n].fore;
            a instanceof P && this.#a("gotxt｜", a, !1);
          }
        }), this.val.setVal_Nochk("save", "const.sn.layer." + e + ".enabled", !0);
        break;
      case "grp":
        if (this.#V) break;
        this.#V = e;
        break;
    }
    return this.scrItr.recodeDesign(t), i.isWait;
  }
  #h = {
    /* empty */
  };
  // しおりLoad時再読込
  #b = [];
  // 最適化用・重なり順つき全レイヤ名
  #E = "";
  #V = "";
  #F(t) {
    const e = this.#G(t), s = this.#h[e], i = s.back.ctn, n = s.fore.ctn;
    if (R(t, "float", !1))
      this.#n.setChildIndex(i, this.#n.children.length - 1), this.#e.setChildIndex(n, this.#e.children.length - 1), this.#z();
    else if (t.index)
      x(t, "index", 0) && (this.#n.setChildIndex(i, t.index), this.#e.setChildIndex(n, t.index), this.#z());
    else if (t.dive) {
      const { dive: a } = t;
      let o = 0;
      if (e === a) throw "[lay] 属性 layerとdiveが同じ【" + a + "】です";
      const r = this.#h[a];
      if (!r) throw "[lay] 属性 dive【" + a + "】が不正です。レイヤーがありません";
      const l = r.back, d = r.fore, c = this.#n.getChildIndex(l.ctn), p = this.#e.getChildIndex(d.ctn);
      o = c < p ? c : p, o > this.#n.getChildIndex(i) && --o, this.#e.setChildIndex(n, o), this.#n.setChildIndex(i, o), this.#z();
    }
    return t[":id_tag"] = s.fore.name.slice(0, -7), this.scrItr.recodeDesign(t), s.lay(t);
  }
  #z() {
    this.#b = this.#S();
  }
  //MARK: レイヤ設定の消去
  #j(t) {
    return this.#L(t, (e) => {
      const s = this.#h[this.#G({ layer: e })];
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
  #O = tt.create({
    width: S.stageW,
    height: S.stageH
  });
  #$ = new j(this.#O);
  #N = tt.create({
    width: S.stageW,
    height: S.stageH
  });
  #_ = new j(this.#N);
  //MARK: ページ裏表を交換
  #W(t) {
    const { layer: e } = t, s = /* @__PURE__ */ new Set(), i = this.#m(e).map((_) => (s.add(_), this.#h[_].fore)), n = () => {
      [this.#e, this.#n] = [this.#n, this.#e];
      const _ = [];
      for (const [T, $] of Object.entries(this.#h)) {
        if (s.has(T)) {
          $.transPage(_);
          continue;
        }
        const { fore: { ctn: v }, back: { ctn: E } } = $, O = this.#e.getChildIndex(E);
        this.#e.removeChild(E), this.#n.removeChild(v), this.#e.addChildAt(v, O), this.#n.addChildAt(E, O);
      }
      Promise.allSettled(_).then(() => {
        this.#e.visible = !0, this.#n.visible = !1, this.#$.visible = !1, this.#_.visible = !1, F.notifyEndProc(xt + A);
      });
    };
    if (this.#_.filters = [], this.#_.alpha = 1, x(t, "time", 0) === 0 || this.#f.isSkipping)
      return F.beginProc(xt + A, () => {
      }), queueMicrotask(() => n()), !0;
    const o = [], r = this.#b.map((_) => {
      const { fore: T, back: $ } = this.#h[_], v = s.has(_) ? $ : T;
      return v.ctn.visible && o.push(v.ctn), v;
    }), { ticker: l, renderer: d } = this.appPixi;
    d.render(this.#n, { renderTexture: this.#O });
    let c = () => {
      for (const _ of o) d.render(
        _,
        { renderTexture: this.#O, clear: !1 }
      );
    };
    if (!r.some((_) => _.containMovement)) {
      const _ = c;
      c = () => {
        c = () => {
        }, _();
      };
    }
    const p = () => d.render(this.#e, { renderTexture: this.#N });
    p();
    let f = () => {
      this.#e.visible = !0, p(), this.#e.visible = !1;
    };
    if (!i.some((_) => _.containMovement)) {
      const _ = f;
      f = () => {
        f = () => {
        }, _();
      };
    }
    const h = () => {
      c(), this.#$.visible = !0, f(), this.#_.visible = !0;
    }, { glsl: y, rule: g } = t, k = () => {
      l.remove(h), n();
    };
    if (!y && !g)
      return B.tween(A, t, this.#_, { alpha: 0 }, () => {
      }, k, () => {
      }), l.add(h), !1;
    const m = {
      rule: J.EMPTY,
      vague: x(t, "vague", 0.04),
      tick: 0
    };
    this.#_.filters = [new jt(
      void 0,
      y ?? G.#H,
      m
    )];
    const b = B.tween(A, t, m, { tick: 1 }, () => {
    }, k, () => {
    }, !g);
    return g ? new u(g, void 0, (_) => {
      m.rule = _.texture, _.destroy(), b.start(), l.add(h);
    }, (_) => {
      _ && this.main.resume();
    }).ret : (l.add(h), !1);
  }
  #m(t = "") {
    return t ? t.split(",") : this.#b;
  }
  #L(t, e) {
    const s = this.#m(t.layer);
    for (const i of s) {
      const n = this.#h[i];
      if (!n) throw `存在しないlayer【${i}】です`;
      e(i, n);
    }
    return s;
  }
  #S(t = "") {
    return this.#m(t).sort((e, s) => {
      const i = this.#e.getChildIndex(this.#h[e].fore.ctn), n = this.#e.getChildIndex(this.#h[s].fore.ctn);
      return i < n ? -1 : i > n ? 1 : 0;
    });
  }
  setAllStyle2TxtLay(t) {
    for (const e of this.#b) {
      const s = this.#h[e].fore;
      s instanceof P && s.lay({ style: t });
    }
  }
  //MARK: 画面を揺らす
  #M(t) {
    if (x(t, "time", NaN) === 0) return !1;
    const e = this.#m(t.layer).map((d) => this.#h[d].fore.ctn), { renderer: s, ticker: i } = this.appPixi;
    this.#N.resize(S.stageW, S.stageH);
    const n = () => {
      this.#e.visible = !0;
      for (const d of e) s.render(
        d,
        { renderTexture: this.#N, clear: !1 }
      );
      this.#e.visible = !1;
    };
    this.#_.visible = !0, this.#_.alpha = 1;
    const a = V(x(t, "hmax", 10)), o = V(x(t, "vmax", 10)), r = a === 0 ? () => {
    } : () => {
      this.#_.x = Math.round(Math.random() * a * 2) - a;
    }, l = o === 0 ? () => {
    } : () => {
      this.#_.y = Math.round(Math.random() * o * 2) - o;
    };
    return this.#_.filters = [], B.tween(A, t, this.#_, { x: 0, y: 0 }, () => {
      r(), l();
    }, () => {
      i.remove(n), this.#e.visible = !0, this.#_.visible = !1, this.#_.x = 0, this.#_.y = 0;
    }, () => {
    }), i.add(n), !1;
  }
  //MARK: トゥイーン開始
  #R(t) {
    const { layer: e, render: s, name: i } = t;
    if (!e) throw "layerは必須です";
    const n = this.#h[this.#G(t)], a = n.fore;
    let o = () => {
    };
    s && !this.#f.isSkipping && (a.renderStart(), o = () => a.renderEnd());
    const r = B.cnvTweenArg(t, a), l = R(t, "arrive", !1), d = R(t, "backlay", !1), c = n.back.ctn;
    return B.tween(i ?? e, t, a, B.cnvTweenArg(t, a), () => {
    }, o, () => {
      if (l && Object.assign(a, r), d) for (const p of Object.keys(B.hMemberCnt)) c[p] = a[p];
    }), "filter" in t && (a.ctn.filters = [H.bldFilters(t)], a.aFltHArg = [t]), !1;
  }
  //MARK: フィルター追加
  #Q(t) {
    return this.#L(t, (e) => {
      const s = this.#h[this.#G({ layer: e })];
      if (t.page === "both") {
        this.#Y(s.fore, t), this.#Y(s.back, t);
        return;
      }
      const i = s.getPage(t);
      this.#Y(i, t);
    }), !1;
  }
  #Y(t, e) {
    const s = t.ctn;
    s.filters ??= [], s.filters = [...s.filters, H.bldFilters(e)], t.aFltHArg.push(e);
  }
  //MARK: フィルター全削除
  #U(t) {
    return this.#L(t, (e) => {
      const s = this.#h[this.#G({ layer: e })];
      if (t.page === "both") {
        const n = s.fore, a = s.back;
        n.ctn.filters = null, a.ctn.filters = null, n.aFltHArg = [], a.aFltHArg = [];
        return;
      }
      const i = s.getPage(t);
      i.ctn.filters = null, i.aFltHArg = [];
    }), !1;
  }
  //MARK: フィルター個別切替
  #J(t) {
    return this.#L(t, (e) => {
      const s = this.#h[this.#G({ layer: e })];
      if (t.page === "both") {
        this.#B(s.fore, t), this.#B(s.back, t);
        return;
      }
      const i = s.getPage(t);
      this.#B(i, t);
    }), !1;
  }
  #B(t, e) {
    const s = t.ctn;
    if (!s.filters) throw "フィルターがありません";
    const i = V(x(e, "index", 0)), n = s.filters.length;
    if (n <= i) throw `フィルターの個数（${String(n)}）を越えています`;
    t.aFltHArg[i].enabled = s.filters[i].enabled = R(e, "enabled", !0);
  }
  //	// 文字・文字レイヤ
  static #C = 10;
  static get msecChWait() {
    return G.#C;
  }
  //MARK: 文字を追加する
  #T(t) {
    const { text: e } = t;
    if (!e) throw "textは必須です";
    const s = this.#P(t);
    delete t.text, this.setNormalChWait(), this.#f.isSkipping ? t.wait = 0 : "wait" in t && x(t, "wait", NaN), this.#a("add｜" + X(t), s);
    const i = R(t, "record", !0), n = this.val.doRecLog();
    return i || this.val.setVal_Nochk("save", "sn.doRecLog", i), s.tagCh(e.replaceAll("[r]", `
`)), this.val.setVal_Nochk("save", "sn.doRecLog", n), this.#a("add_close｜", s), !1;
  }
  #P = (t) => {
    throw this.#Z(), 0;
  };
  #X(t) {
    const e = this.#G(t, this.#E), i = this.#h[e].getPage(t);
    if (!(i instanceof P)) throw e + "はTxtLayerではありません";
    return i;
  }
  setNormalChWait() {
    G.#C = this.scrItr.normalWait;
  }
  //MARK: 操作対象のメッセージレイヤの指定
  #K = (t) => {
    throw this.#Z(), 0;
  };
  #q(t) {
    const { layer: e } = t;
    if (!e) throw "[current] layerは必須です";
    const s = this.#h[e];
    if (!s || !(s.getPage(t) instanceof P)) throw `${e}はTxtLayerではありません`;
    this.#D = s, this.#l.pagebreak(), this.#E = e, this.val.setVal_Nochk("save", "const.sn.mesLayer", e);
    for (const i of this.#b) {
      const { fore: n, back: a } = this.#h[i];
      n instanceof P && (n.isCur = a.isCur = i === e);
    }
    return !1;
  }
  get currentTxtlayForeNeedErr() {
    return this.#Z(), this.currentTxtlayFore;
  }
  get currentTxtlayFore() {
    return this.#D ? this.#D.fore : null;
  }
  #D = void 0;
  // カレントテキストレイヤ
  #Z = () => {
    throw "文字レイヤーがありません。文字表示や操作する前に、[add_lay layer=（レイヤ名） class=txt]で文字レイヤを追加して下さい";
  };
  #G(t, e = "") {
    const s = t.layer ?? e;
    if (s.includes(",")) throw "layer名に「,」は使えません";
    if (!(s in this.#h)) throw "属性 layer【" + s + "】が不正です。レイヤーがありません";
    return t.layer = s, s;
  }
  recPagebreak() {
    this.#l.pagebreak();
  }
  //MARK: 文字消去
  #A(t) {
    const e = this.#P(t);
    return t.layer === this.#E && t.page === "fore" && this.#l.pagebreak(), e.clearText(), !1;
  }
  //MARK: ハイパーリンクの終了
  #tt(t) {
    return this.#a("endlink｜", this.#P(t)), !1;
  }
  //MARK: ページ両面の文字消去
  #et(t) {
    return R(t, "rec_page_break", !0) && this.#l.pagebreak(), this.#D && (this.#D.fore.clearLay(t), this.#D.back.clearLay(t)), !1;
  }
  //MARK: インライン画像表示
  #st(t) {
    if (!t.pic) throw "[graph] picは必須です";
    return this.#a("grp｜" + X(t), this.#P(t)), !1;
  }
  //MARK: ハイパーリンク
  #it(t) {
    if (!t.fn && !t.label && !t.url) throw "fn,label,url いずれかは必須です";
    return t.fn ??= this.scrItr.scriptFn, t.style ??= "background-color: rgba(255,0,0,0.5);", t.style_hover ??= "background-color: rgba(255,0,0,0.9);", t.style_clicked ??= t.style, this.#a("link｜" + X(t), this.#P(t)), !1;
  }
  //MARK: 改行
  #nt(t) {
    return this.#T({ ...t, text: `
` });
  }
  //MARK: 文字列と複数ルビの追加
  #at(t) {
    const { t: e, r: s } = t;
    if (!e) throw "[ruby2] tは必須です";
    if (!s) throw "[ruby2] rは必須です";
    return t.text = "｜" + encodeURIComponent(e) + "《" + encodeURIComponent(s) + "》", delete t.t, delete t.r, this.#T(t);
  }
  //MARK: インラインスタイル設定
  #ot(t) {
    return this.#a("span｜" + X(t), this.#P(t)), !1;
  }
  //MARK: tcy縦中横を表示する
  #rt(t) {
    if (!t.t) throw "[tcy] tは必須です";
    return this.#a("tcy｜" + X(t), this.#P(t)), !1;
  }
  //MARK: レイヤのダンプ
  #ht({ layer: t }) {
    console.group("🥟 [dump_lay]");
    for (const e of this.#m(t)) {
      const { fore: s, back: i } = this.#h[e];
      try {
        console.info(
          `%c${s.name.slice(0, -7)} %o`,
          `color:#${S.isDarkMode ? "49F" : "05A"};`,
          JSON.parse(`{"back":{${i.dump()}}, "fore":{${s.dump()}}}`)
        );
      } catch (n) {
        console.error("dump_lay err:%o", n), console.error(`   back:${i.dump()}`), console.error(`   fore:${s.dump()}`);
      }
    }
    return console.groupEnd(), !1;
  }
  //MARK: イベント有無の切替
  #lt(t) {
    const e = this.#G(t, this.#E), s = R(t, "enabled", !0);
    return this.#P(t).enabled = s, this.val.setVal_Nochk("save", "const.sn.layer." + e + ".enabled", s), !1;
  }
  //MARK: ボタンを表示
  #ct(t) {
    return et.argChk_page(t, "back"), t.fn ??= this.scrItr.scriptFn, this.#P(t).addButton(t), this.scrItr.recodeDesign(t), !1;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  record() {
    const t = {};
    for (const e of this.#b) {
      const s = this.#h[e];
      t[e] = {
        cls: s.cls,
        fore: s.fore.record(),
        back: s.back.record()
      };
    }
    return t;
  }
  playback(t) {
    this.#l.playback();
    const e = [], s = [];
    for (const [n, { fore: a, fore: { idx: o }, back: r, cls: l }] of Object.entries(t)) {
      s.push({ ln: n, idx: o });
      const d = this.#h[n] ??= new et(n, l, this.#e, this.#n, {}, this.sys, this.val, { isWait: !1 });
      d.fore.playback(a, e), d.back.playback(r, e);
    }
    const i = this.#e.children.length;
    return e.push(new Promise((n) => {
      for (const { ln: a, idx: o } of s.sort(({ idx: r }, { idx: l }) => r === l ? 0 : r < l ? -1 : 1)) {
        const r = this.#h[a];
        if (!r) continue;
        const l = i > o ? o : i - 1, { fore: d, back: c } = r;
        this.#e.setChildIndex(d.ctn, l), this.#n.setChildIndex(c.ctn, l);
      }
      n();
    })), e;
  }
}
const Zt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LayerMng: G
}, Symbol.toStringTag, { value: "Module" }));
export {
  z as B,
  Zt as L,
  P as T
};
//# sourceMappingURL=LayerMng.js.map
