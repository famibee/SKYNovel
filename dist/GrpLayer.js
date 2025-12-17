import { l as argChk_Num, s as argChk_Boolean, t as CmnLib } from "./CmnLib.js";
import { d as RenderTexture, n as AnimatedSprite, o as Sprite } from "./pixi.js";
import "./EventListenerCtn.js";
import "./ConfigBase.js";
import { t as Layer } from "./Layer.js";
import "./DebugMng.js";
import { t as Reading } from "./Reading.js";
import { t as SpritesMng } from "./SpritesMng.js";
var DesignCast = class {
	static init(e, a, o, s, c, l) {}
	static cvsResizeDesign() {}
	constructor(e, a = !1) {
		this.bg_col = e, this.isLay = a;
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
}, GrpLayDesignCast = class extends DesignCast {
	constructor(e, a) {
		super("#29e", !0);
	}
	setSp(e) {}
}, GrpLayer = class d extends Layer {
	static #e;
	static init(e, a, o, s, c, l) {
		d.#e = o, SpritesMng.init(a, l, s, e, c);
	}
	static destroy() {
		SpritesMng.destroy();
	}
	#t = new GrpLayDesignCast(this.ctn, this);
	constructor() {
		super(), CmnLib.isDbg && (this.#n = (e) => this.#t.setSp(e), this.cvsResize = () => {
			super.cvsResize(), this.#t.cvsResize();
		});
	}
	#n = () => {};
	#r = "";
	#i = "";
	#a = "";
	lay = (e) => {
		let a = Reading.procID + `GrpLayer lay name:${this.name_}`, o = this.#o(e, (e) => {
			e && Reading.endProc(a);
		});
		return o && Reading.beginProc(a), o;
	};
	#o(o, s) {
		let { fn: c, face: l = "" } = o;
		if (this.#t.sethArg(o), !c) return super.lay(o), this.ctn.children.length > 0 && this.setPos(o), this.#i = "", this.#r = this.#a = l, s(!1), !1;
		let u = "fn" in o, d = "face" in o;
		return this.clearLay({ clear_filter: argChk_Boolean(o, "clear_filter", !0) }), u && (this.#i = c), d && (this.#a = l), super.lay(o), o.dx = 0, o.dy = 0, this.#s.destroy(), this.#s = new SpritesMng(this.#r = c + (l ? "," + l : ""), this.ctn, (a) => {
			("width" in o || "height" in o) && (a.width = argChk_Num(o, "width", 0), a.height = argChk_Num(o, "height", 0)), this.#c = a.width, this.#l = a.height, Layer.setXY(a, o, this.ctn, !0), Layer.setBlendmode(this.ctn, o), this.#n(a);
		}, (e) => s(e)), this.#s.ret;
	}
	#s = new SpritesMng();
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
		this.#d = new Sprite(this.#u), this.#d.visible = !1, this.ctn.addChildAt(this.#d, 0), this.#d.position.set(-this.ctn.x, -this.ctn.y);
		let a = () => {
			let e = this.ctn.alpha;
			this.ctn.alpha = 1;
			for (let e of this.ctn.children) e.visible = !0;
			this.#d.visible = !1, d.#e.renderer.render(this.ctn, { renderTexture: this.#u }), this.ctn.alpha = e;
			for (let e of this.ctn.children) e.visible = !1;
		};
		if (!this.containMovement) {
			let e = a;
			a = () => {
				a = () => {}, e();
			};
		}
		this.#f = () => {
			a(), this.#d.visible = !0;
		}, d.#e.ticker.add(this.#f);
	}
	#u = RenderTexture.create({
		width: CmnLib.stageW,
		height: CmnLib.stageH
	});
	#d = new Sprite();
	#f = () => {};
	renderEnd() {
		d.#e.ticker.remove(this.#f), this.ctn.removeChild(this.#d);
		for (let e of this.ctn.children) e.visible = !0;
		this.#d.destroy(!0), this.#u = RenderTexture.create({
			width: CmnLib.stageW,
			height: CmnLib.stageH
		});
	}
	setPos(e) {
		Layer.setXY(this.ctn.children[0] ?? this.ctn, e, this.ctn, !0);
	}
	get containMovement() {
		if (this.#r === "") return !1;
		let e = this.ctn.children;
		return this.#r.split(",").some((a, o) => e[o] instanceof AnimatedSprite || SpritesMng.getHFn2VElm(a));
	}
	clearLay(e) {
		super.clearLay(e), this.#s.destroy(), this.#i = "", this.#a = "", this.#r = "";
	}
	record = () => ({
		...super.record(),
		sBkFn: this.#i,
		sBkFace: this.#a
	});
	playback(e, a) {
		if (super.playback(e, a), e.sBkFn === "" && e.sBkFace === "") {
			this.#i = "", this.#a = "";
			return;
		}
		a.push(new Promise((a) => this.#o({
			fn: e.sBkFn,
			face: e.sBkFace,
			left: e.x,
			top: e.y,
			alpha: e.alpha,
			blendmode: Layer.getNum2Blendmode(e.blendMode),
			rotation: e.rotation,
			scale_x: e.scale_x,
			scale_y: e.scale_y
		}, (o) => {
			this.ctn.position.set(e.x, e.y), a();
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
export { GrpLayer, DesignCast as t };

//# sourceMappingURL=GrpLayer.js.map