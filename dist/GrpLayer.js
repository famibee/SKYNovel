import { l as e, s as t, t as n } from "./CmnLib.js";
import { d as r, n as i, o as a } from "./pixi.js";
import { t as o } from "./Layer.js";
import { t as s } from "./Reading.js";
import { t as c } from "./SpritesMng.js";
//#region src/sn/DesignCast.ts
var l = class {
	bg_col;
	isLay;
	static init(e, t, n, r, i, a) {}
	static cvsResizeDesign() {}
	constructor(e, t = !1) {
		this.bg_col = e, this.isLay = t;
	}
	destroy() {}
	gethArg() {
		return this.hArg;
	}
	hArg = {};
	sethArg(e) {
		this.hArg = e;
	}
	setOther(e) {}
	adopt(e) {}
	static enterMode() {}
	static allHide() {}
	set visible(e) {}
	static leaveMode() {}
	cvsResize() {}
	make() {}
	static replaceToken(e) {}
}, u = class extends l {
	constructor(e, t) {
		super("#29e", !0);
	}
	setSp(e) {}
}, d = class l extends o {
	static #e;
	static init(e, t, n, r, i, a) {
		l.#e = n, c.init(t, a, r, e, i);
	}
	static destroy() {
		c.destroy();
	}
	#t = new u(this.ctn, this);
	constructor() {
		super(), n.isDbg && (this.#n = (e) => this.#t.setSp(e), this.cvsResize = () => {
			super.cvsResize(), this.#t.cvsResize();
		});
	}
	#n = () => {};
	#r = "";
	#i = "";
	#a = "";
	lay = (e) => {
		let t = s.procID + `GrpLayer lay name:${this.name_}`, n = this.#o(e, (e) => {
			e && s.endProc(t);
		});
		return n && s.beginProc(t), n;
	};
	#o(n, r) {
		let { fn: i, face: a = "" } = n;
		if (this.#t.sethArg(n), !i) return super.lay(n), this.ctn.children.length > 0 && this.setPos(n), this.#i = "", this.#r = this.#a = a, r(!1), !1;
		let s = "fn" in n, l = "face" in n;
		return this.clearLay({ clear_filter: t(n, "clear_filter", !0) }), s && (this.#i = i), l && (this.#a = a), super.lay(n), n.dx = 0, n.dy = 0, this.#s.destroy(), this.#s = new c(this.#r = i + (a ? "," + a : ""), this.ctn, (t) => {
			("width" in n || "height" in n) && (t.width = e(n, "width", 0), t.height = e(n, "height", 0)), this.#c = t.width, this.#l = t.height, o.setXY(t, n, this.ctn, !0), o.setBlendmode(this.ctn, n), this.#n(t);
		}, (e) => r(e)), this.#s.ret;
	}
	#s = new c();
	#c = 0;
	#l = 0;
	get width() {
		return this.#c;
	}
	get height() {
		return this.#l;
	}
	renderStart(e) {
		if (e) {
			let e = this.ctn.alpha;
			this.ctn.alpha = 1, this.ctn.alpha = e;
			return;
		}
		this.#d = new a(this.#u), this.#d.visible = !1, this.ctn.addChildAt(this.#d, 0), this.#d.position.set(-this.ctn.x, -this.ctn.y);
		let t = () => {
			let e = this.ctn.alpha;
			this.ctn.alpha = 1;
			for (let e of this.ctn.children) e.visible = !0;
			this.#d.visible = !1, l.#e.renderer.render(this.ctn, { renderTexture: this.#u }), this.ctn.alpha = e;
			for (let e of this.ctn.children) e.visible = !1;
		};
		if (!this.containMovement) {
			let e = t;
			t = () => {
				t = () => {}, e();
			};
		}
		this.#f = () => {
			t(), this.#d.visible = !0;
		}, l.#e.ticker.add(this.#f);
	}
	#u = r.create({
		width: n.stageW,
		height: n.stageH
	});
	#d = new a();
	#f = () => {};
	renderEnd() {
		l.#e.ticker.remove(this.#f), this.ctn.removeChild(this.#d);
		for (let e of this.ctn.children) e.visible = !0;
		this.#d.destroy(!0), this.#u = r.create({
			width: n.stageW,
			height: n.stageH
		});
	}
	setPos(e) {
		o.setXY(this.ctn.children[0] ?? this.ctn, e, this.ctn, !0);
	}
	get containMovement() {
		if (this.#r === "") return !1;
		let e = this.ctn.children;
		return this.#r.split(",").some((t, n) => e[n] instanceof i || c.getHFn2VElm(t));
	}
	clearLay(e) {
		super.clearLay(e), this.#s.destroy(), this.#i = "", this.#a = "", this.#r = "";
	}
	record = () => ({
		...super.record(),
		sBkFn: this.#i,
		sBkFace: this.#a
	});
	playback(e, t) {
		if (super.playback(e, t), e.sBkFn === "" && e.sBkFace === "") {
			this.#i = "", this.#a = "";
			return;
		}
		t.push(new Promise((t) => this.#o({
			fn: e.sBkFn,
			face: e.sBkFace,
			left: e.x,
			top: e.y,
			alpha: e.alpha,
			blendmode: o.getNum2Blendmode(e.blendMode),
			rotation: e.rotation,
			scale_x: e.scale_x,
			scale_y: e.scale_y
		}, (n) => {
			this.ctn.position.set(e.x, e.y), t();
		})));
	}
	makeDesignCast(e) {
		this.ctn.visible && e(this.#t);
	}
	cvsResize() {
		super.cvsResize();
	}
	showDesignCast() {
		this.#t.visible = !0;
	}
	dump = () => super.dump() + `, "pic":"${this.#r}"`;
};
//#endregion
export { d as GrpLayer, l as t };

//# sourceMappingURL=GrpLayer.js.map