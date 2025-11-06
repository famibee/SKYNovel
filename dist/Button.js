import { q as b, l as n, u as f, e as v, O as k, K as m, P as C, z as g, G as S, M as p, y as u } from "./web2.js";
import { S as _ } from "./SpritesMng.js";
class c extends b {
  constructor(t, e, h, a) {
    if (super(), this.hArg = t, this.evtMng = e, this.resolve = h, this.canFocus = a, this.#t = {
      type: "pic",
      enabled: v(t, "enabled", !0),
      x: this.x = f(t.left ?? 0),
      y: this.y = f(t.top ?? 0),
      rotation: this.angle = n(t, "rotation", this.angle),
      // flash : rotation is in degrees.
      // pixijs: rotation is in radians, angle is in degrees.
      pivot_x: this.pivot.x = n(t, "pivot_x", this.pivot.x),
      pivot_y: this.pivot.y = n(t, "pivot_y", this.pivot.y),
      scale_x: this.scale.x = n(t, "scale_x", this.scale.x),
      scale_y: this.scale.y = n(t, "scale_y", this.scale.y),
      alpha: 1,
      text: "",
      b_pic: "",
      width: 0,
      height: 0
    }, this.getBtnBounds = () => (this.#i.x = this.#t.x, this.#i.y = this.#t.y, this.#i), this.#t.enabled && e.button(t, this, () => this.normal(), () => this.#s(), () => this.#h()), t.pic) {
      this.#t.type = "pic", this.#e = new _(
        t.pic,
        this,
        (i) => {
          this.#l(i), this.#i.width = i.width * this.#t.scale_x, this.#i.height = i.height * this.#t.scale_y;
        },
        (i) => h()
      );
      return;
    }
    if (!t.text) throw "textまたはpic属性は必須です";
    const o = n(t, "height", 30), r = new k({
      align: "center",
      dropShadow: !0,
      dropShadowAlpha: 0.7,
      dropShadowColor: "white",
      dropShadowBlur: 7,
      dropShadowDistance: 0,
      fill: this.#t.enabled ? "black" : "gray",
      fontFamily: c.fontFamily,
      fontSize: o,
      padding: 5
    });
    if (t.style) try {
      const i = JSON.parse(t.style);
      for (const [w, y] of Object.entries(i)) r[w] = y;
      this.#t = { ...this.#t, ...i };
    } catch (i) {
      throw i instanceof SyntaxError ? new Error(m(t, "style", i.message)) : "fn:Button.ts style";
    }
    const s = new C(t.text ?? "", r);
    s.alpha = n(t, "alpha", s.alpha), s.width = n(t, "width", 100), s.height = t.height = o, this.setText = (i) => {
      s.text = i;
    }, this.#t = {
      ...this.#t,
      type: "text",
      // dump用
      alpha: s.alpha,
      text: s.text,
      width: s.width,
      height: s.height
    };
    let d = !1;
    if (this.#t.width = this.width, this.#t.height = this.height, t.b_pic && (this.#t.b_pic = t.b_pic, this.#e = new _(
      t.b_pic,
      this,
      (i) => {
        this.#o(i, s), this.#t.width = this.width, this.#t.height = this.height, s.name = JSON.stringify(this.#t);
      },
      (i) => {
        g.setBlendmode(this, t), i && h();
      }
    ), d = this.#e.ret), s.name = JSON.stringify(this.#t), this.addChild(s), this.#i.width = s.width, this.#i.height = s.height, t.b_pic || g.setBlendmode(this, t), c.#a(this, s), !this.#t.enabled) {
      d || h();
      return;
    }
    const l = r.clone();
    if (t.style_hover) try {
      const i = JSON.parse(t.style_hover);
      for (const [w, y] of Object.entries(i)) l[w] = y;
    } catch (i) {
      throw i instanceof SyntaxError ? new Error(m(t, "style_hover", i.message)) : "fn:Button.ts style_hover";
    }
    else l.fill = "white";
    const x = l.clone();
    if (t.style_clicked) try {
      const i = JSON.parse(t.style_clicked);
      for (const [w, y] of Object.entries(i)) x[w] = y;
    } catch (i) {
      throw i instanceof SyntaxError ? new Error(m(t, "style_clicked", i.message)) : "fn:Button.ts style_clicked";
    }
    else x.dropShadow = !1;
    this.normal = () => {
      s.style = r;
    }, this.#s = () => a() ? (s.style = l, !0) : !1, this.#h = () => {
      s.style = x;
    }, d || h();
  }
  static fontFamily = "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif";
  static #a = (t, e) => {
  };
  static #n = (t, e, h, a) => {
  };
  static init(t) {
    t.oCfg.debug.masume && (c.#a = (e, h) => e.addChild(
      new S().beginFill(8926088, 0.2).lineStyle(1, 8926088, 1).drawRect(h.x, h.y, h.width, h.height).endFill()
    ), c.#n = (e, h, a, o) => e.addChild(
      new S().beginFill(8926088, 0.2).lineStyle(1, 8926088, 1).drawRect(h.x, h.y, a, o).endFill()
    ));
  }
  setText(t) {
  }
  getBtnBounds = () => this.#i;
  // 文字ボタンは背景画像を含まない位置指定なので、その当たり判定用
  #i = new p();
  #e = new _();
  //	#idc		: DesignCast;
  #t;
  destroy() {
    this.evtMng.unButton(this), this.#e.destroy(), super.destroy();
  }
  makeDesignCast(t) {
  }
  showDesignCast() {
  }
  //	showDesignCast() {this.#idc.visible = true}
  cvsResize() {
  }
  #o(t, e) {
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
  #s = () => !1;
  #h = () => {
  };
  #l(t) {
    this.#t.alpha = t.alpha = n(this.hArg, "alpha", t.alpha);
    const e = t.width / 3, h = this.#t.enabled ? e : t.width, a = t.height, o = t.texture.baseTexture, r = new u(o, new p(0, 0, e, a)), s = new u(o, new p(e, 0, e, a)), d = new u(o, new p(e * 2, 0, e, a)), l = () => {
      t.texture = r;
    };
    this.#t.enabled && l(), this.normal = l, this.#s = () => this.canFocus() ? (t.texture = d, !0) : !1, this.#h = () => {
      t.texture = s;
    }, "width" in this.hArg ? (this.#t.width = f(this.hArg.width), this.scale.x *= this.#t.width / h) : this.#t.width = h, "height" in this.hArg ? (this.#t.height = f(this.hArg.height), this.scale.y *= this.#t.height / a) : this.#t.height = a, t.name = JSON.stringify(this.#t), c.#n(this, t, h, a);
  }
}
export {
  c as Button
};
//# sourceMappingURL=Button.js.map
