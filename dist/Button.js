import { q as S, l as n, u as f, e as v, O as k, K as m, P as C, z as b, G as g, M as p, y as u } from "./web2.js";
import { S as _ } from "./SpritesMng.js";
class r extends S {
  constructor(t, i, h, a) {
    if (super(), this.hArg = t, this.evtMng = i, this.resolve = h, this.canFocus = a, this.#t = {
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
    }, this.getBtnBounds = () => (this.#e.x = this.#t.x, this.#e.y = this.#t.y, this.#e), this.#t.enabled && i.button(t, this, () => this.normal(), () => this.#s(), () => this.#h()), t.pic) {
      this.#t.type = "pic", this.#i = new _(
        t.pic,
        this,
        (e) => {
          this.#l(e), this.#e.width = e.width * this.#t.scale_x, this.#e.height = e.height * this.#t.scale_y;
        },
        (e) => h()
      );
      return;
    }
    if (!t.text) throw "textまたはpic属性は必須です";
    const o = n(t, "height", 30), c = new k({
      align: "center",
      dropShadow: !0,
      dropShadowAlpha: 0.7,
      dropShadowColor: "white",
      dropShadowBlur: 7,
      dropShadowDistance: 0,
      fill: this.#t.enabled ? "black" : "gray",
      fontFamily: r.fontFamily,
      fontSize: o,
      padding: 5
    });
    if (t.style) try {
      const e = JSON.parse(t.style);
      for (const [w, y] of Object.entries(e)) c[w] = y;
      this.#t = { ...this.#t, ...e };
    } catch (e) {
      throw e instanceof SyntaxError ? new Error(m(t, "style", e.message)) : "fn:Button.ts style";
    }
    const s = new C(t.text ?? "", c);
    s.alpha = n(t, "alpha", s.alpha), s.width = n(t, "width", 100), s.height = t.height = o, this.setText = (e) => {
      s.text = e;
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
    if (this.#t.width = this.width, this.#t.height = this.height, t.b_pic && (this.#t.b_pic = t.b_pic, this.#i = new _(
      t.b_pic,
      this,
      (e) => {
        this.#o(e, s), this.#t.width = this.width, this.#t.height = this.height;
      },
      (e) => {
        b.setBlendmode(this, t), e && h();
      }
    ), d = this.#i.ret), this.addChild(s), this.#e.width = s.width, this.#e.height = s.height, t.b_pic || b.setBlendmode(this, t), r.#a(this, s), !this.#t.enabled) {
      d || h();
      return;
    }
    const l = c.clone();
    if (t.style_hover) try {
      const e = JSON.parse(t.style_hover);
      for (const [w, y] of Object.entries(e)) l[w] = y;
    } catch (e) {
      throw e instanceof SyntaxError ? new Error(m(t, "style_hover", e.message)) : "fn:Button.ts style_hover";
    }
    else l.fill = "white";
    const x = l.clone();
    if (t.style_clicked) try {
      const e = JSON.parse(t.style_clicked);
      for (const [w, y] of Object.entries(e)) x[w] = y;
    } catch (e) {
      throw e instanceof SyntaxError ? new Error(m(t, "style_clicked", e.message)) : "fn:Button.ts style_clicked";
    }
    else x.dropShadow = !1;
    this.normal = () => {
      s.style = c;
    }, this.#s = () => a() ? (s.style = l, !0) : !1, this.#h = () => {
      s.style = x;
    }, d || h();
  }
  static fontFamily = "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif";
  static #a = (t, i) => {
  };
  static #n = (t, i, h, a) => {
  };
  static init(t) {
    t.oCfg.debug.masume && (r.#a = (i, h) => i.addChild(
      new g().beginFill(8926088, 0.2).lineStyle(1, 8926088, 1).drawRect(h.x, h.y, h.width, h.height).endFill()
    ), r.#n = (i, h, a, o) => i.addChild(
      new g().beginFill(8926088, 0.2).lineStyle(1, 8926088, 1).drawRect(h.x, h.y, a, o).endFill()
    ));
  }
  setText(t) {
  }
  getBtnBounds = () => this.#e;
  // 文字ボタンは背景画像を含まない位置指定なので、その当たり判定用
  #e = new p();
  #i = new _();
  //	#idc		: DesignCast;
  #t;
  destroy() {
    this.normal = () => {
    }, this.#s = () => !1, this.#h = () => {
    }, this.evtMng.unButton(this), this.#i.destroy(), super.destroy();
  }
  makeDesignCast(t) {
  }
  showDesignCast() {
  }
  //	showDesignCast() {this.#idc.visible = true}
  cvsResize() {
  }
  #o(t, i) {
    this.setChildIndex(t, 0), t.alpha = i.alpha, t.setTransform(
      i.x,
      i.y,
      1,
      1,
      i.rotation,
      0,
      0,
      (t.width - i.width) / 2,
      (t.height - i.height) / 2
    ), t.name = i.name;
  }
  normal = () => {
  };
  #s = () => !1;
  #h = () => {
  };
  #l(t) {
    this.#t.alpha = t.alpha = n(this.hArg, "alpha", t.alpha);
    const i = t.width / 3, h = this.#t.enabled ? i : t.width, a = t.height, o = t.texture.baseTexture, c = new u(o, new p(0, 0, i, a)), s = new u(o, new p(i, 0, i, a)), d = new u(o, new p(i * 2, 0, i, a)), l = () => {
      t.texture = c;
    };
    this.#t.enabled && l(), this.normal = l, this.#s = () => this.canFocus() ? (t.texture = d, !0) : !1, this.#h = () => {
      t.texture = s;
    }, "width" in this.hArg ? (this.#t.width = f(this.hArg.width), this.scale.x *= this.#t.width / h) : this.#t.width = h, "height" in this.hArg ? (this.#t.height = f(this.hArg.height), this.scale.y *= this.#t.height / a) : this.#t.height = a, r.#n(this, t, h, a);
  }
}
export {
  r as Button
};
//# sourceMappingURL=Button.js.map
