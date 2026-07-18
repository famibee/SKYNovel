import { g as e, l as t, p as n, s as r, t as i } from "./CmnLib.js";
import { b as a, f as o, o as s, t as c } from "./pixi.js";
//#region src/sn/Layer.ts
var { BlurFilter: l, ColorMatrixFilter: u, NoiseFilter: d } = c, f = class c {
	layname = "";
	name_ = "";
	set name(e) {
		this.name_ = e;
	}
	get name() {
		return this.name_;
	}
	ctn = new s(o.EMPTY);
	get alpha() {
		return this.ctn.alpha;
	}
	set alpha(e) {
		this.ctn.alpha = e;
	}
	get height() {
		return this.ctn.height;
	}
	get rotation() {
		return this.ctn.angle;
	}
	set rotation(e) {
		this.ctn.angle = e;
	}
	get scale_x() {
		return this.ctn.scale.x;
	}
	set scale_x(e) {
		this.ctn.scale.x = e;
	}
	get scale_y() {
		return this.ctn.scale.y;
	}
	set scale_y(e) {
		this.ctn.scale.y = e;
	}
	get width() {
		return this.ctn.width;
	}
	get x() {
		return this.ctn.x;
	}
	set x(e) {
		this.procSetX(e), this.ctn.x = e;
	}
	procSetX(e) {}
	get y() {
		return this.ctn.y;
	}
	set y(e) {
		this.procSetY(e), this.ctn.y = e;
	}
	procSetY(e) {}
	destroy() {}
	lay(e) {
		let n = this.ctn;
		return "alpha" in e && (n.alpha = t(e, "alpha", 1)), c.setBlendmode(n, e), ("pivot_x" in e || "pivot_y" in e) && n.pivot.set(t(e, "pivot_x", n.pivot.x), t(e, "pivot_y", n.pivot.y)), "rotation" in e && (n.angle = t(e, "rotation", 0)), ("scale_x" in e || "scale_y" in e) && n.scale.set(t(e, "scale_x", n.scale.x), t(e, "scale_y", n.scale.y)), "visible" in e && (n.visible = r(e, "visible", !0)), "filter" in e && (n.filters = [c.bldFilters(e)], this.aFltHArg = [e]), !1;
	}
	aFltHArg = [];
	static bldFilters(e) {
		let { filter: t = "" } = e, n = c.hBldFilter[t];
		if (!n) throw "filter が異常です";
		let i = n(e);
		i.enabled = r(e, "enable_filter", !0);
		let { blendmode: a } = e;
		return a && (i.blendMode = c.getBlendmodeNum(a)), i;
	}
	static hBldFilter = {
		blur: (n) => {
			let i = new l(t(n, "strength", 8), t(n, "quality", 4), "resolution" in n ? t(n, "resolution", 0) : void 0, t(n, "kernel_size", 5));
			return i.blurX = e(t(n, "blur_x", 2)), i.blurY = e(t(n, "blur_y", 2)), i.repeatEdgePixels = r(n, "repeat_edge_pixels", !1), i;
		},
		noise: (e) => new d(t(e, "noise", .5), "seed" in e ? t(e, "seed", 0) : void 0),
		color_matrix: (n) => {
			let r = new u();
			r.alpha = e(t(n, "alpha", 1));
			let { matrix: i = "" } = n;
			if (i) {
				let t = i.split(","), n = t.length;
				if (n !== 20) throw `matrix の個数（${String(n)}）が 20 ではありません`;
				for (let i = 0; i < n; ++i) r.matrix[i] = e(t[i]);
			} else r.matrix[0] = e(t(n, "rtor", 1)), r.matrix[1] = e(t(n, "gtor", 0)), r.matrix[2] = e(t(n, "btor", 0)), r.matrix[3] = e(t(n, "ator", 0)), r.matrix[4] = e(t(n, "pr", 0)), r.matrix[5] = e(t(n, "rtog", 0)), r.matrix[6] = e(t(n, "gtog", 1)), r.matrix[7] = e(t(n, "btog", 0)), r.matrix[8] = e(t(n, "atog", 0)), r.matrix[9] = e(t(n, "pg", 0)), r.matrix[10] = e(t(n, "rtob", 0)), r.matrix[11] = e(t(n, "gtob", 0)), r.matrix[12] = e(t(n, "btob", 1)), r.matrix[13] = e(t(n, "atob", 0)), r.matrix[14] = e(t(n, "pb", 0)), r.matrix[15] = e(t(n, "rtoa", 0)), r.matrix[16] = e(t(n, "gtoa", 0)), r.matrix[17] = e(t(n, "btoa", 0)), r.matrix[18] = e(t(n, "atoa", 1)), r.matrix[19] = e(t(n, "pa", 0));
			return r;
		},
		black_and_white: (e) => {
			let t = new u();
			return t.blackAndWhite(r(e, "multiply", !1)), t;
		},
		brightness: (e) => {
			let n = new u();
			return n.brightness(t(e, "b", .5), r(e, "multiply", !1)), n;
		},
		browni: (e) => {
			let t = new u();
			return t.browni(r(e, "multiply", !0)), t;
		},
		color_tone: (e) => {
			let n = new u();
			return n.colorTone(t(e, "desaturation", .5), t(e, "toned", .5), t(e, "light_color", 16770432), t(e, "dark_color", 16770432), r(e, "multiply", !1)), n;
		},
		contrast: (e) => {
			let n = new u();
			return n.contrast(t(e, "amount", .5), r(e, "multiply", !1)), n;
		},
		grayscale: (e) => {
			let n = new u();
			return n.grayscale(t(e, "scale", .5), r(e, "multiply", !1)), n;
		},
		hue: (e) => {
			let n = new u();
			return n.hue(t(e, "f_rotation", 90), r(e, "multiply", !1)), n;
		},
		kodachrome: (e) => {
			let t = new u();
			return t.kodachrome(r(e, "multiply", !0)), t;
		},
		lsd: (e) => {
			let t = new u();
			return t.lsd(r(e, "multiply", !1)), t;
		},
		negative: (e) => {
			let t = new u();
			return t.negative(r(e, "multiply", !1)), t;
		},
		night: (e) => {
			let n = new u();
			return n.night(t(e, "intensity", .5), r(e, "multiply", !1)), n;
		},
		polaroid: (e) => {
			let t = new u();
			return t.polaroid(r(e, "multiply", !1)), t;
		},
		predator: (e) => {
			let n = new u();
			return n.predator(t(e, "amount", .5), r(e, "multiply", !1)), n;
		},
		saturate: (e) => {
			let n = new u();
			return n.saturate(t(e, "amount", .5), r(e, "multiply", !1)), n;
		},
		sepia: (e) => {
			let t = new u();
			return t.sepia(r(e, "multiply", !1)), t;
		},
		technicolor: (e) => {
			let t = new u();
			return t.technicolor(r(e, "multiply", !0)), t;
		},
		tint: (e) => {
			let n = new u();
			return n.tint(t(e, "f_color", 8947848), r(e, "multiply", !1)), n;
		},
		to_bgr: (e) => {
			let t = new u();
			return t.toBGR(r(e, "multiply", !1)), t;
		},
		vintage: (e) => {
			let t = new u();
			return t.vintage(r(e, "multiply", !0)), t;
		}
	};
	static setBlendmode(e, t) {
		let { blendmode: n } = t;
		if (!n) return;
		let r = c.getBlendmodeNum(n);
		e instanceof s && (e.blendMode = r);
		for (let t of e.children) t instanceof s && (t.blendMode = r);
	}
	static getBlendmodeNum(e) {
		if (!e) return a.NORMAL;
		let t = c.#e[e];
		if (t !== void 0) return t;
		throw `${e} はサポートされない blendmode です`;
	}
	static #e = {
		normal: a.NORMAL,
		add: a.ADD,
		multiply: a.MULTIPLY,
		screen: a.SCREEN
	};
	static getNum2Blendmode(e) {
		return c.#t[e] ?? "normal";
	}
	static #t = {
		0: "normal",
		1: "add",
		2: "multiply",
		3: "screen"
	};
	get containMovement() {
		return !1;
	}
	renderStart(e) {}
	renderEnd() {}
	clearLay(e) {
		this.ctn.alpha = 1, this.ctn.blendMode = a.NORMAL, this.ctn.pivot.set(0, 0), this.ctn.angle = 0, this.ctn.scale.set(1, 1), r(e, "clear_filter", !1) && (this.ctn.filters = null, this.aFltHArg = []);
	}
	copy(e, t) {
		let n = this.name_;
		this.playback(e.record(), t), this.name = n;
	}
	record() {
		return {
			name: this.name_,
			idx: this.ctn.parent.getChildIndex(this.ctn),
			alpha: this.ctn.alpha,
			blendMode: this.ctn.blendMode,
			rotation: this.ctn.angle,
			scale_x: this.ctn.scale.x,
			scale_y: this.ctn.scale.y,
			pivot_x: this.ctn.pivot.x,
			pivot_y: this.ctn.pivot.y,
			x: this.ctn.x,
			y: this.ctn.y,
			visible: this.ctn.visible,
			aFltHArg: this.aFltHArg
		};
	}
	playback(e, t) {
		this.name = e.name, this.clearLay({ clear_filter: !0 }), this.ctn.alpha = e.alpha, this.ctn.blendMode = e.blendMode, this.ctn.angle = e.rotation, this.ctn.scale.set(e.scale_x, e.scale_y), this.ctn.pivot.set(e.pivot_x, e.pivot_y), this.ctn.position.set(e.x, e.y), this.ctn.visible = e.visible, this.aFltHArg = e.aFltHArg ?? [], this.ctn.filters = this.aFltHArg.length === 0 ? null : this.aFltHArg.map((e) => c.bldFilters(e));
	}
	snapshot(e, t) {
		e.render(this.ctn, { clear: !1 }), t();
	}
	snapshot_end() {}
	makeDesignCast(e) {}
	makeDesignCastChildren(e) {}
	showDesignCast() {}
	showDesignCastChildren() {}
	cvsResize() {}
	cvsResizeChildren() {}
	dump() {
		return ` "idx":${String(this.ctn.parent.getChildIndex(this.ctn))}, "visible":"${String(this.ctn.visible)}", "left":${String(this.ctn.x)}, "top":${String(this.ctn.y)}, "alpha":${String(this.ctn.alpha)}, "rotation":${String(this.ctn.angle)}, "name":"${this.name_}", "scale_x":${String(this.ctn.scale.x)}, "scale_y":${String(this.ctn.scale.y)}, "filters": [${this.aFltHArg.map((e) => `"${e.filter ?? ""}"`).join(",")}]`;
	}
	static setXY(e, r, a, o = !1, s = !1) {
		if (r.pos) {
			c.setXYByPos(e, r.pos, a);
			return;
		}
		let l = e.getBounds(), u = a.scale.x < 0 ? -a.scale.x : a.scale.x, d = u === 1 ? l.width : l.width * u, f = a.scale.y < 0 ? -a.scale.y : a.scale.y, p = f === 1 ? l.height : l.height * f, m = a.x;
		"left" in r ? (m = t(r, "left", 0), m > -1 && m < 1 && (m *= i.stageW)) : "center" in r ? (m = t(r, "center", 0), m > -1 && m < 1 && (m *= i.stageW), m -= (s ? d / 3 : d) / 2) : "right" in r ? (m = t(r, "right", 0), m > -1 && m < 1 && (m *= i.stageW), m -= s ? d / 3 : d) : "s_right" in r && (m = t(r, "s_right", 0), m > -1 && m < 1 && (m *= i.stageW), m = i.stageW - m - (s ? d / 3 : d)), a.x = n(a.scale.x < 0 ? m + (s ? d / 3 : d) : m);
		let h = a.y;
		"top" in r ? (h = t(r, "top", 0), h > -1 && h < 1 && (h *= i.stageH)) : "middle" in r ? (h = t(r, "middle", 0), h > -1 && h < 1 && (h *= i.stageH), h -= p / 2) : "bottom" in r ? (h = t(r, "bottom", 0), h > -1 && h < 1 && (h *= i.stageH), h -= p) : "s_bottom" in r && (h = t(r, "s_bottom", 0), h > -1 && h < 1 && (h *= i.stageH), h = i.stageH - h - p), a.y = n(a.scale.y < 0 ? h + p : h), o && !("left" in r) && !("center" in r) && !("right" in r) && !("s_right" in r) && !("top" in r) && !("middle" in r) && !("bottom" in r) && !("s_bottom" in r) && c.setXYByPos(e, "c", a);
	}
	static setXYByPos(e, t, r) {
		if (t === "stay") return;
		let a = e.getBounds(), o = r.scale.x < 0 ? -r.scale.x : r.scale.x, s = o === 1 ? a.width : a.width * o, c = r.scale.y < 0 ? -r.scale.y : r.scale.y, l = c === 1 ? a.height : a.height * c, u = 0;
		u = !t || t === "c" ? i.stageW * .5 : t === "r" ? i.stageW - s * .5 : t === "l" ? s * .5 : n(t), r.x = n(u - s * .5), r.y = i.stageH - l, r.scale.x < 0 && (r.x += s), r.scale.y < 0 && (r.y += l);
	}
	static setXYCenter(e) {
		let t = e.getBounds();
		e.x = (i.stageW - t.width) * .5, e.y = (i.stageH - t.height) * .5;
	}
};
//#endregion
export { f as t };

//# sourceMappingURL=Layer.js.map