import { g as uint, l as argChk_Num, p as int, s as argChk_Boolean, t as CmnLib } from "./CmnLib.js";
import { b as BLEND_MODES, f as Texture, o as Sprite, t as filters } from "./pixi.js";
var { BlurFilter, ColorMatrixFilter, NoiseFilter } = filters, Layer = class c {
	layname = "";
	name_ = "";
	set name(e) {
		this.name_ = e;
	}
	get name() {
		return this.name_;
	}
	ctn = new Sprite(Texture.EMPTY);
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
		return "alpha" in e && (n.alpha = argChk_Num(e, "alpha", 1)), c.setBlendmode(n, e), ("pivot_x" in e || "pivot_y" in e) && n.pivot.set(argChk_Num(e, "pivot_x", n.pivot.x), argChk_Num(e, "pivot_y", n.pivot.y)), "rotation" in e && (n.angle = argChk_Num(e, "rotation", 0)), ("scale_x" in e || "scale_y" in e) && n.scale.set(argChk_Num(e, "scale_x", n.scale.x), argChk_Num(e, "scale_y", n.scale.y)), "visible" in e && (n.visible = argChk_Boolean(e, "visible", !0)), "filter" in e && (n.filters = [c.bldFilters(e)], this.aFltHArg = [e]), !1;
	}
	aFltHArg = [];
	static bldFilters(e) {
		let { filter: t = "" } = e, n = c.hBldFilter[t];
		if (!n) throw "filter が異常です";
		let i = n(e);
		i.enabled = argChk_Boolean(e, "enable_filter", !0);
		let { blendmode: a } = e;
		return a && (i.blendMode = c.getBlendmodeNum(a)), i;
	}
	static hBldFilter = {
		blur: (n) => {
			let i = new BlurFilter(argChk_Num(n, "strength", 8), argChk_Num(n, "quality", 4), "resolution" in n ? argChk_Num(n, "resolution", 0) : void 0, argChk_Num(n, "kernel_size", 5));
			return i.blurX = uint(argChk_Num(n, "blur_x", 2)), i.blurY = uint(argChk_Num(n, "blur_y", 2)), i.repeatEdgePixels = argChk_Boolean(n, "repeat_edge_pixels", !1), i;
		},
		noise: (e) => new NoiseFilter(argChk_Num(e, "noise", .5), "seed" in e ? argChk_Num(e, "seed", 0) : void 0),
		color_matrix: (n) => {
			let r = new ColorMatrixFilter();
			r.alpha = uint(argChk_Num(n, "alpha", 1));
			let { matrix: i = "" } = n;
			if (i) {
				let t = i.split(","), n = t.length;
				if (n !== 20) throw `matrix の個数（${String(n)}）が 20 ではありません`;
				for (let i = 0; i < n; ++i) r.matrix[i] = uint(t[i]);
			} else r.matrix[0] = uint(argChk_Num(n, "rtor", 1)), r.matrix[1] = uint(argChk_Num(n, "gtor", 0)), r.matrix[2] = uint(argChk_Num(n, "btor", 0)), r.matrix[3] = uint(argChk_Num(n, "ator", 0)), r.matrix[4] = uint(argChk_Num(n, "pr", 0)), r.matrix[5] = uint(argChk_Num(n, "rtog", 0)), r.matrix[6] = uint(argChk_Num(n, "gtog", 1)), r.matrix[7] = uint(argChk_Num(n, "btog", 0)), r.matrix[8] = uint(argChk_Num(n, "atog", 0)), r.matrix[9] = uint(argChk_Num(n, "pg", 0)), r.matrix[10] = uint(argChk_Num(n, "rtob", 0)), r.matrix[11] = uint(argChk_Num(n, "gtob", 0)), r.matrix[12] = uint(argChk_Num(n, "btob", 1)), r.matrix[13] = uint(argChk_Num(n, "atob", 0)), r.matrix[14] = uint(argChk_Num(n, "pb", 0)), r.matrix[15] = uint(argChk_Num(n, "rtoa", 0)), r.matrix[16] = uint(argChk_Num(n, "gtoa", 0)), r.matrix[17] = uint(argChk_Num(n, "btoa", 0)), r.matrix[18] = uint(argChk_Num(n, "atoa", 1)), r.matrix[19] = uint(argChk_Num(n, "pa", 0));
			return r;
		},
		black_and_white: (e) => {
			let t = new ColorMatrixFilter();
			return t.blackAndWhite(argChk_Boolean(e, "multiply", !1)), t;
		},
		brightness: (e) => {
			let n = new ColorMatrixFilter();
			return n.brightness(argChk_Num(e, "b", .5), argChk_Boolean(e, "multiply", !1)), n;
		},
		browni: (e) => {
			let t = new ColorMatrixFilter();
			return t.browni(argChk_Boolean(e, "multiply", !0)), t;
		},
		color_tone: (e) => {
			let n = new ColorMatrixFilter();
			return n.colorTone(argChk_Num(e, "desaturation", .5), argChk_Num(e, "toned", .5), argChk_Num(e, "light_color", 16770432), argChk_Num(e, "dark_color", 16770432), argChk_Boolean(e, "multiply", !1)), n;
		},
		contrast: (e) => {
			let n = new ColorMatrixFilter();
			return n.contrast(argChk_Num(e, "amount", .5), argChk_Boolean(e, "multiply", !1)), n;
		},
		grayscale: (e) => {
			let n = new ColorMatrixFilter();
			return n.grayscale(argChk_Num(e, "scale", .5), argChk_Boolean(e, "multiply", !1)), n;
		},
		hue: (e) => {
			let n = new ColorMatrixFilter();
			return n.hue(argChk_Num(e, "f_rotation", 90), argChk_Boolean(e, "multiply", !1)), n;
		},
		kodachrome: (e) => {
			let t = new ColorMatrixFilter();
			return t.kodachrome(argChk_Boolean(e, "multiply", !0)), t;
		},
		lsd: (e) => {
			let t = new ColorMatrixFilter();
			return t.lsd(argChk_Boolean(e, "multiply", !1)), t;
		},
		negative: (e) => {
			let t = new ColorMatrixFilter();
			return t.negative(argChk_Boolean(e, "multiply", !1)), t;
		},
		night: (e) => {
			let n = new ColorMatrixFilter();
			return n.night(argChk_Num(e, "intensity", .5), argChk_Boolean(e, "multiply", !1)), n;
		},
		polaroid: (e) => {
			let t = new ColorMatrixFilter();
			return t.polaroid(argChk_Boolean(e, "multiply", !1)), t;
		},
		predator: (e) => {
			let n = new ColorMatrixFilter();
			return n.predator(argChk_Num(e, "amount", .5), argChk_Boolean(e, "multiply", !1)), n;
		},
		saturate: (e) => {
			let n = new ColorMatrixFilter();
			return n.saturate(argChk_Num(e, "amount", .5), argChk_Boolean(e, "multiply", !1)), n;
		},
		sepia: (e) => {
			let t = new ColorMatrixFilter();
			return t.sepia(argChk_Boolean(e, "multiply", !1)), t;
		},
		technicolor: (e) => {
			let t = new ColorMatrixFilter();
			return t.technicolor(argChk_Boolean(e, "multiply", !0)), t;
		},
		tint: (e) => {
			let n = new ColorMatrixFilter();
			return n.tint(argChk_Num(e, "f_color", 8947848), argChk_Boolean(e, "multiply", !1)), n;
		},
		to_bgr: (e) => {
			let t = new ColorMatrixFilter();
			return t.toBGR(argChk_Boolean(e, "multiply", !1)), t;
		},
		vintage: (e) => {
			let t = new ColorMatrixFilter();
			return t.vintage(argChk_Boolean(e, "multiply", !0)), t;
		}
	};
	static setBlendmode(e, t) {
		let { blendmode: n } = t;
		if (!n) return;
		let r = c.getBlendmodeNum(n);
		e instanceof Sprite && (e.blendMode = r);
		for (let t of e.children) t instanceof Sprite && (t.blendMode = r);
	}
	static getBlendmodeNum(e) {
		if (!e) return BLEND_MODES.NORMAL;
		let t = c.#e[e];
		if (t !== void 0) return t;
		throw `${e} はサポートされない blendmode です`;
	}
	static #e = {
		normal: BLEND_MODES.NORMAL,
		add: BLEND_MODES.ADD,
		multiply: BLEND_MODES.MULTIPLY,
		screen: BLEND_MODES.SCREEN
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
		this.ctn.alpha = 1, this.ctn.blendMode = BLEND_MODES.NORMAL, this.ctn.pivot.set(0, 0), this.ctn.angle = 0, this.ctn.scale.set(1, 1), argChk_Boolean(e, "clear_filter", !1) && (this.ctn.filters = null, this.aFltHArg = []);
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
		"left" in r ? (m = argChk_Num(r, "left", 0), m > -1 && m < 1 && (m *= CmnLib.stageW)) : "center" in r ? (m = argChk_Num(r, "center", 0), m > -1 && m < 1 && (m *= CmnLib.stageW), m -= (s ? d / 3 : d) / 2) : "right" in r ? (m = argChk_Num(r, "right", 0), m > -1 && m < 1 && (m *= CmnLib.stageW), m -= s ? d / 3 : d) : "s_right" in r && (m = argChk_Num(r, "s_right", 0), m > -1 && m < 1 && (m *= CmnLib.stageW), m = CmnLib.stageW - m - (s ? d / 3 : d)), a.x = int(a.scale.x < 0 ? m + (s ? d / 3 : d) : m);
		let h = a.y;
		"top" in r ? (h = argChk_Num(r, "top", 0), h > -1 && h < 1 && (h *= CmnLib.stageH)) : "middle" in r ? (h = argChk_Num(r, "middle", 0), h > -1 && h < 1 && (h *= CmnLib.stageH), h -= p / 2) : "bottom" in r ? (h = argChk_Num(r, "bottom", 0), h > -1 && h < 1 && (h *= CmnLib.stageH), h -= p) : "s_bottom" in r && (h = argChk_Num(r, "s_bottom", 0), h > -1 && h < 1 && (h *= CmnLib.stageH), h = CmnLib.stageH - h - p), a.y = int(a.scale.y < 0 ? h + p : h), o && !("left" in r) && !("center" in r) && !("right" in r) && !("s_right" in r) && !("top" in r) && !("middle" in r) && !("bottom" in r) && !("s_bottom" in r) && c.setXYByPos(e, "c", a);
	}
	static setXYByPos(e, t, r) {
		if (t === "stay") return;
		let a = e.getBounds(), o = r.scale.x < 0 ? -r.scale.x : r.scale.x, s = o === 1 ? a.width : a.width * o, c = r.scale.y < 0 ? -r.scale.y : r.scale.y, l = c === 1 ? a.height : a.height * c, u = 0;
		u = !t || t === "c" ? CmnLib.stageW * .5 : t === "r" ? CmnLib.stageW - s * .5 : t === "l" ? s * .5 : int(t), r.x = int(u - s * .5), r.y = CmnLib.stageH - l, r.scale.x < 0 && (r.x += s), r.scale.y < 0 && (r.y += l);
	}
	static setXYCenter(e) {
		let t = e.getBounds();
		e.x = (CmnLib.stageW - t.width) * .5, e.y = (CmnLib.stageH - t.height) * .5;
	}
};
export { Layer as t };

//# sourceMappingURL=Layer.js.map