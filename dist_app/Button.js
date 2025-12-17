import { g as uint, l as argChk_Num, m as mesErrJSON, s as argChk_Boolean } from "./CmnLib.js";
import { a as TextStyle, f as Texture, h as Rectangle, i as Text, m as Container, s as Graphics } from "./pixi.js";
import "./EventListenerCtn.js";
import "./ConfigBase.js";
import "./DebugMng.js";
import { t as Layer } from "./Layer.js";
import "./Reading.js";
import { t as SpritesMng } from "./SpritesMng.js";
var Button = class f extends Container {
	static fontFamily = "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif";
	static #e = (e, t) => {};
	static #t = (e, t, n, r) => {};
	static init(e) {
		e.oCfg.debug.masume && (f.#e = (e, t) => e.addChild(new Graphics().beginFill(8926088, .2).lineStyle(1, 8926088, 1).drawRect(t.x, t.y, t.width, t.height).endFill()), f.#t = (e, t, n, r) => e.addChild(new Graphics().beginFill(8926088, .2).lineStyle(1, 8926088, 1).drawRect(t.x, t.y, n, r).endFill()));
	}
	setText(e) {}
	getBtnBounds = () => this.#n;
	#n = new Rectangle();
	#r = new SpritesMng();
	#i;
	constructor(a, o, c, l) {
		if (super(), this.hArg = a, this.evtMng = o, this.resolve = c, this.canFocus = l, this.#i = {
			type: "pic",
			enabled: argChk_Boolean(a, "enabled", !0),
			x: this.x = uint(a.left ?? 0),
			y: this.y = uint(a.top ?? 0),
			rotation: this.angle = argChk_Num(a, "rotation", this.angle),
			pivot_x: this.pivot.x = argChk_Num(a, "pivot_x", this.pivot.x),
			pivot_y: this.pivot.y = argChk_Num(a, "pivot_y", this.pivot.y),
			scale_x: this.scale.x = argChk_Num(a, "scale_x", this.scale.x),
			scale_y: this.scale.y = argChk_Num(a, "scale_y", this.scale.y),
			alpha: 1,
			text: "",
			b_pic: "",
			width: 0,
			height: 0
		}, this.getBtnBounds = () => (this.#n.x = this.#i.x, this.#n.y = this.#i.y, this.#n), this.#i.enabled && o.button(a, this, () => this.normal(), () => this.#o(), () => this.#s()), a.pic) {
			this.#i.type = "pic", this.#r = new SpritesMng(a.pic, this, (e) => {
				this.#c(e), this.#n.width = e.width * this.#i.scale_x, this.#n.height = e.height * this.#i.scale_y;
			}, (e) => c());
			return;
		}
		if (!a.text) throw "textまたはpic属性は必須です";
		let p = argChk_Num(a, "height", 30), m = new TextStyle({
			align: "center",
			dropShadow: !0,
			dropShadowAlpha: .7,
			dropShadowColor: "white",
			dropShadowBlur: 7,
			dropShadowDistance: 0,
			fill: this.#i.enabled ? "black" : "gray",
			fontFamily: f.fontFamily,
			fontSize: p,
			padding: 5
		});
		if (a.style) try {
			let e = JSON.parse(a.style);
			for (let [t, n] of Object.entries(e)) m[t] = n;
			this.#i = {
				...this.#i,
				...e
			};
		} catch (e) {
			throw e instanceof SyntaxError ? Error(mesErrJSON(a, "style", e.message)) : "fn:Button.ts style";
		}
		let h = new Text(a.text ?? "", m);
		h.alpha = argChk_Num(a, "alpha", h.alpha), h.width = argChk_Num(a, "width", 100), h.height = a.height = p, this.setText = (e) => {
			h.text = e;
		}, this.#i = {
			...this.#i,
			type: "text",
			alpha: h.alpha,
			text: h.text,
			width: h.width,
			height: h.height
		};
		let g = !1;
		if (this.#i.width = this.width, this.#i.height = this.height, a.b_pic && (this.#i.b_pic = a.b_pic, this.#r = new SpritesMng(a.b_pic, this, (e) => {
			this.#a(e, h), this.#i.width = this.width, this.#i.height = this.height;
		}, (e) => {
			Layer.setBlendmode(this, a), e && c();
		}), g = this.#r.ret), this.addChild(h), this.#n.width = h.width, this.#n.height = h.height, a.b_pic || Layer.setBlendmode(this, a), f.#e(this, h), !this.#i.enabled) {
			g || c();
			return;
		}
		let _ = m.clone();
		if (a.style_hover) try {
			let e = JSON.parse(a.style_hover);
			for (let [t, n] of Object.entries(e)) _[t] = n;
		} catch (e) {
			throw e instanceof SyntaxError ? Error(mesErrJSON(a, "style_hover", e.message)) : "fn:Button.ts style_hover";
		}
		else _.fill = "white";
		let v = _.clone();
		if (a.style_clicked) try {
			let e = JSON.parse(a.style_clicked);
			for (let [t, n] of Object.entries(e)) v[t] = n;
		} catch (e) {
			throw e instanceof SyntaxError ? Error(mesErrJSON(a, "style_clicked", e.message)) : "fn:Button.ts style_clicked";
		}
		else v.dropShadow = !1;
		this.normal = () => {
			h.style = m;
		}, this.#o = () => l() ? (h.style = _, !0) : !1, this.#s = () => {
			h.style = v;
		}, g || c();
	}
	destroy() {
		this.normal = () => {}, this.#o = () => !1, this.#s = () => {}, this.evtMng.unButton(this), this.#r.destroy(), super.destroy();
	}
	makeDesignCast(e) {}
	showDesignCast() {}
	cvsResize() {}
	#a(e, t) {
		this.setChildIndex(e, 0), e.alpha = t.alpha, e.setTransform(t.x, t.y, 1, 1, t.rotation, 0, 0, (e.width - t.width) / 2, (e.height - t.height) / 2), e.name = t.name;
	}
	normal = () => {};
	#o = () => !1;
	#s = () => {};
	#c(n) {
		this.#i.alpha = n.alpha = argChk_Num(this.hArg, "alpha", n.alpha);
		let r = n.width / 3, i = this.#i.enabled ? r : n.width, s = n.height, c = n.texture.baseTexture, l = new Texture(c, new Rectangle(0, 0, r, s)), u = new Texture(c, new Rectangle(r, 0, r, s)), d = new Texture(c, new Rectangle(r * 2, 0, r, s)), p = () => {
			n.texture = l;
		};
		this.#i.enabled && p(), this.normal = p, this.#o = () => this.canFocus() ? (n.texture = d, !0) : !1, this.#s = () => {
			n.texture = u;
		}, "width" in this.hArg ? (this.#i.width = uint(this.hArg.width), this.scale.x *= this.#i.width / i) : this.#i.width = i, "height" in this.hArg ? (this.#i.height = uint(this.hArg.height), this.scale.y *= this.#i.height / s) : this.#i.height = s, f.#t(this, n, i, s);
	}
};
export { Button };

//# sourceMappingURL=Button.js.map