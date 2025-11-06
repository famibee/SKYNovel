import { z as c, E as m, a as h, e as v, k as p, x as f, v as u, B as _ } from "./app2.js";
import { S as a } from "./SpritesMng.js";
import { a as d } from "./Reading.js";
class b {
  //	static	readonly	#alzTagArg	= new AnalyzeTagArg;
  constructor(t, s = !1) {
    this.bg_col = t, this.isLay = s;
  }
  static init(t, s, e, i, o, l) {
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
class k extends b {
  constructor(t, s) {
    super("#29e", !0);
  }
  setSp(t) {
  }
}
class r extends c {
  static #f = new m();
  static #r;
  static init(t, s, e, i, o, l) {
    r.#r = e, a.init(s, l, i, t, o);
  }
  static destroy() {
    r.#f.clear(), a.destroy();
  }
  #e = new k(this.ctn, this);
  constructor() {
    super(), h.isDbg && (this.#o = (t) => this.#e.setSp(t), this.cvsResize = () => {
      super.cvsResize(), this.#e.cvsResize();
    });
  }
  #o = () => {
  };
  #s = "";
  #i = "";
  #n = "";
  lay = (t) => {
    const s = d.procID + `GrpLayer lay name:${this.name_}`, e = this.#l(t, (i) => {
      i && d.endProc(s);
    });
    return e && d.beginProc(s), e;
  };
  #l(t, s) {
    const { fn: e, face: i = "" } = t;
    if (this.#e.sethArg(t), !e)
      return super.lay(t), this.ctn.children.length > 0 && this.setPos(t), this.#i = "", this.#s = this.#n = i, s(!1), !1;
    const o = "fn" in t, l = "face" in t;
    return this.clearLay({ clear_filter: v(t, "clear_filter", !0) }), o && (this.#i = e), l && (this.#n = i), super.lay(t), t.dx = 0, t.dy = 0, this.#c.destroy(), this.#c = new a(
      this.#s = e + (i ? "," + i : ""),
      this.ctn,
      (n) => {
        ("width" in t || "height" in t) && (n.width = p(t, "width", 0), n.height = p(t, "height", 0)), this.#d = n.width, this.#p = n.height, c.setXY(n, t, this.ctn, !0), c.setBlendmode(this.ctn, t), this.#o(n);
      },
      (n) => s(n)
    ), this.#c.ret;
  }
  #c = new a();
  #d = 0;
  #p = 0;
  get width() {
    return this.#d;
  }
  get height() {
    return this.#p;
  }
  renderStart() {
    this.#t = new f(this.#h), this.#t.visible = !1, this.ctn.addChildAt(this.#t, 0), this.#t.position.set(-this.ctn.x, -this.ctn.y);
    let t = () => {
      const s = this.ctn.alpha;
      this.ctn.alpha = 1;
      for (const e of this.ctn.children) e.visible = !0;
      this.#t.visible = !1, r.#r.renderer.render(this.ctn, { renderTexture: this.#h }), this.ctn.alpha = s;
      for (const e of this.ctn.children) e.visible = !1;
    };
    if (!this.containMovement) {
      const s = t;
      t = () => {
        t = () => {
        }, s();
      };
    }
    this.#a = () => {
      t(), this.#t.visible = !0;
    }, r.#r.ticker.add(this.#a);
  }
  #h = u.create({
    width: h.stageW,
    height: h.stageH
  });
  #t = new f();
  #a = () => {
  };
  renderEnd() {
    r.#r.ticker.remove(this.#a), this.ctn.removeChild(this.#t);
    for (const t of this.ctn.children) t.visible = !0;
    this.#t.destroy(!0), this.#h = u.create({
      width: h.stageW,
      height: h.stageH
    });
  }
  setPos(t) {
    c.setXY(
      this.ctn.children[0] ?? this.ctn,
      t,
      this.ctn,
      !0
    );
  }
  // アニメ・動画を含むか
  get containMovement() {
    if (this.#s === "") return !1;
    const t = this.ctn.children;
    return this.#s.split(",").some(
      (s, e) => t[e] instanceof _ || a.getHFn2VElm(s)
    );
  }
  clearLay(t) {
    super.clearLay(t), this.#c.destroy(), this.#i = "", this.#n = "", this.#s = "";
  }
  record = () => ({
    ...super.record(),
    sBkFn: this.#i,
    sBkFace: this.#n
    //		idc_hArg	: this.#idc.gethArg(),
  });
  playback(t, s) {
    if (super.playback(t, s), t.sBkFn === "" && t.sBkFace === "") {
      this.#i = "", this.#n = "";
      return;
    }
    s.push(new Promise((e) => this.#l(
      { fn: t.sBkFn, face: t.sBkFace, left: t.x, top: t.y, alpha: t.alpha, blendmode: c.getNum2Blendmode(t.blendMode), rotation: t.rotation, scale_x: t.scale_x, scale_y: t.scale_y },
      (i) => {
        this.ctn.position.set(t.x, t.y), e();
      }
      // Layer.setXY()の後に再度移動
    )));
  }
  makeDesignCast(t) {
    this.ctn.visible && t(this.#e);
  }
  //makeDesignCastChildren(_gdc: IMakeDesignCast) {}
  cvsResize() {
    super.cvsResize();
  }
  showDesignCast() {
    this.#e.visible = !0;
  }
  //showDesignCastChildren() {}
  dump = () => super.dump() + `, "pic":"${this.#s}"`;
}
const F = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GrpLayer: r
}, Symbol.toStringTag, { value: "Module" }));
export {
  b as D,
  r as G,
  F as a
};
//# sourceMappingURL=GrpLayer.js.map
