import { c as e, g as t, h as n, l as r, o as i, s as a, t as o, u as s } from "./CmnLib.js";
import { c, d as l, f as u, l as d, m as f, o as p, p as m, s as h, u as g } from "./pixi.js";
import { t as _ } from "./EventListenerCtn.js";
import { n as v } from "./ConfigBase.js";
import { t as y } from "./Layer.js";
import { i as b, r as x, t as S } from "./Reading.js";
import { t as C } from "./SpritesMng.js";
import { Button as w } from "./Button.js";
import { t as T } from "./RubySpliter.js";
import { TxtLayer as E, t as D } from "./TxtLayer.js";
import { GrpLayer as O, t as k } from "./GrpLayer.js";
import { n as A } from "./Config.js";
//#region src/sn/Pages.ts
var j = class e {
	cls;
	hArg;
	sys;
	val;
	ret;
	#e;
	constructor(e, t, n, r, i, o, s, c) {
		this.cls = t, this.hArg = i, this.sys = o, this.val = s, this.ret = c;
		let l = o.hFactoryCls[t];
		if (!l) throw `属性 class【${t}】が不正です`;
		let u = l(), d = l();
		u.layname = d.layname = e;
		let f = i[":id_tag"] = `layer:${e} cls:${t} page:`;
		u.ctn.name = u.name = f + "A", d.ctn.name = d.name = f + "B", n.addChild(u.ctn), r.addChild(d.ctn), a(i, "visible", !0), a(i, "visible", !0), c.isWait = u.lay(i) || d.lay(i), this.#e = {
			fore: u,
			back: d
		}, r.visible = !1;
		let p = `const.sn.lay.${e}`;
		s.setVal_Nochk("tmp", p, !0), s.defTmp(p + ".fore.alpha", () => this.#e.fore.alpha), s.defTmp(p + ".back.alpha", () => this.#e.back.alpha), s.defTmp(p + ".fore.height", () => this.#e.fore.height), s.defTmp(p + ".back.height", () => this.#e.back.height), s.defTmp(p + ".fore.visible", () => this.#e.fore.ctn.visible), s.defTmp(p + ".back.visible", () => this.#e.back.ctn.visible), s.defTmp(p + ".fore.width", () => this.#e.fore.width), s.defTmp(p + ".back.width", () => this.#e.back.width), s.defTmp(p + ".fore.x", () => this.#e.fore.x), s.defTmp(p + ".back.x", () => this.#e.back.x), s.defTmp(p + ".fore.y", () => this.#e.fore.y), s.defTmp(p + ".back.y", () => this.#e.back.y);
	}
	destroy() {
		this.#e.fore.destroy(), this.#e.back.destroy();
	}
	lay = (e) => this.getPage(e).lay(e);
	getPage = (t) => e.argChk_page(t, "fore") === "back" ? this.#e.back : this.#e.fore;
	static argChk_page(e, t) {
		let n = e.page ?? t;
		if (n === "fore" || n === "back") return e.page = n, n;
		throw Error("属性 page【" + n + "】が不正です");
	}
	get fore() {
		return this.#e.fore;
	}
	get back() {
		return this.#e.back;
	}
	transPage(e) {
		[this.#e.back, this.#e.fore] = [this.#e.fore, this.#e.back], this.#e.back.copy(this.#e.fore, e);
	}
}, M = class e {
	appPixi;
	val;
	static #e;
	static #t;
	static #n;
	static init(t, n, r) {
		e.#e = t, e.#t = n, e.#n = r;
	}
	constructor(e, t, n) {
		this.appPixi = t, this.val = n, e.add_frame = (e) => this.#o(e), e.let_frame = (e) => this.#f(e), e.set_frame = (e) => this.#p(e), e.frame = (e) => this.#h(e), e.tsy_frame = (e) => this.#g(e);
	}
	#r;
	setEvtMng(e) {
		this.#r = e;
	}
	#i = Object.create(null);
	destroy() {
		for (let e of Object.values(this.#i)) e.parentElement.removeChild(e);
		this.#i = Object.create(null);
	}
	hideAllFrame() {
		for (let [e, { style: t }] of Object.entries(this.#i)) this.#a[e] = t.display !== "none", t.display = "none";
	}
	#a = Object.create(null);
	restoreAllFrame() {
		for (let [e, t] of Object.entries(this.#a)) {
			let n = this.#i[e];
			n && (n.style.display = t ? "inline" : "none");
		}
		this.#a = Object.create(null);
	}
	#o(t) {
		let { id: n, src: r, alpha: i = 1, scale_x: o = 1, scale_y: s = 1, rotate: l = 0 } = t;
		if (!n) throw "idは必須です";
		if (!r) throw "srcは必須です";
		let u = "const.sn.frm." + n;
		if (this.val.getVal(`tmp:${u}`)) throw `frame【${n}】はすでにあります`;
		let f = a(t, "visible", !0), p = t.b_color ? ` background-color: ${t.b_color};` : "", m = this.#c(t);
		e.#n.cvs.insertAdjacentHTML("beforebegin", `<iframe id="${n}" style="opacity: ${String(i)}; ${p} position: absolute; left:${String(e.#t.ofsLeft4elm + m.x * e.#t.cvsScale)}px; top: ${String(e.#t.ofsTop4elm + m.y * e.#t.cvsScale)}px; z-index: 1; border: 0px; overflow: hidden; display: ${f ? "inline" : "none"}; transform: scale(${String(o)}, ${String(s)}) rotate(${String(l)}deg);" width="${String(m.width * e.#t.cvsScale)}" height="${String(m.height * e.#t.cvsScale)}"></iframe>`);
		let h = S.procID + `add_frame id:${n}`;
		S.beginProc(h);
		let g = e.#e.searchPath(r, v.HTML), _ = new c().add({
			name: r,
			url: g,
			xhrType: d.XHR_RESPONSE_TYPE.TEXT
		});
		return e.#t.arg.crypto && _.use((t, n) => void e.#t.dec(t.extension, t.data).then((e) => {
			t.data = e, n();
		}).catch((r) => {
			e.#n.errScript(`[add_frame]Html ロード失敗です src:${t.name} ${String(r)}`, !1), n();
		})), _.load((t, a) => {
			let c = document.getElementById(n);
			this.#i[n] = c, this.#s[n] = !1;
			let d = g.lastIndexOf("/") + 1, p = g.slice(0, d), _ = p.slice(0, d);
			c.srcdoc = String(a[r]?.data).replace("sn_repRes();", "").replaceAll(/\s(?:src|href)=(["'])(\S+?)\1/g, (e, t, n) => n.startsWith("../") ? _ + e.slice(3) : e.replace("./", "").replace(t, t + p)), c.srcdoc.includes("true/*WEBP*/;") && (c.srcdoc = c.srcdoc.replaceAll(/data-src="(.+?\.)(?:jpe?g|png)/g, (e, t) => `data-src="${t}webp`)), c.onload = () => {
				S.endProc(h), this.val.setVal_Nochk("tmp", u, !0), this.val.setVal_Nochk("tmp", u + ".alpha", i), this.val.setVal_Nochk("tmp", u + ".x", m.x), this.val.setVal_Nochk("tmp", u + ".y", m.y), this.val.setVal_Nochk("tmp", u + ".scale_x", o), this.val.setVal_Nochk("tmp", u + ".scale_y", s), this.val.setVal_Nochk("tmp", u + ".rotate", l), this.val.setVal_Nochk("tmp", u + ".width", m.width), this.val.setVal_Nochk("tmp", u + ".height", m.height), this.val.setVal_Nochk("tmp", u + ".visible", f);
				let t = c.contentWindow;
				this.#r.resvFlameEvent(t.document.body), t.sn_repRes?.((t) => e.#l(t.dataset.src ?? "", t));
			};
		}), !0;
	}
	#s = {};
	getFrmDisabled(e) {
		return this.#s[e];
	}
	#c(e) {
		let t = { ...e };
		return new DOMRect(r(t, "x", 0), r(t, "y", 0), r(t, "width", o.stageW), r(t, "height", o.stageH));
	}
	static #l(t, n, r) {
		let i = this.#d[t];
		if (i) {
			n.src = i, r && (n.onload = () => r(n));
			return;
		}
		let a = this.#u[t];
		if (a) {
			a.push(n);
			return;
		}
		this.#u[t] = [n];
		let [o = "", s = ""] = t.split("?"), l = e.#e.searchPath(o, v.SP_GSM), u = new c().add({
			name: t,
			url: l,
			xhrType: d.XHR_RESPONSE_TYPE.BUFFER
		});
		e.#t.use4ViteElectron(t, l, u, e.#n) || e.#t.arg.crypto && l.endsWith(".bin") && u.use((t, n) => {
			if (t.extension !== "bin") {
				n();
				return;
			}
			e.#t.decAB(t.data).then((e) => {
				t.data = e, e instanceof HTMLImageElement && (t.type = d.TYPE.IMAGE), n();
			}).catch((r) => {
				e.#n.errScript(`FrameMng loadPic ロード失敗です fn:${t.name} ${String(r)}`, !1), n();
			});
		}), u.load((e, t) => {
			for (let [e, { data: { src: n } }] of Object.entries(t)) {
				let t = this.#d[e] = n + (n.startsWith("blob:") || n.startsWith("data:") ? "" : s ? "?" + s : ""), i = this.#u[e];
				if (i) for (let e of i) e.src = t, r && (e.onload = () => r(e));
				delete this.#u[e];
			}
		});
	}
	static #u = {};
	static #d = {};
	cvsResize() {
		for (let [t, n] of Object.entries(this.#i)) {
			let r = "const.sn.frm." + t, i = Number(this.val.getVal(r + ".x")), a = Number(this.val.getVal(r + ".y")), o = Number(this.val.getVal(r + ".width")), s = Number(this.val.getVal(r + ".height"));
			n.style.left = `${String(e.#t.ofsLeft4elm + i * e.#t.cvsScale)}px`, n.style.top = `${String(e.#t.ofsTop4elm + a * e.#t.cvsScale)}px`, n.width = String(o * e.#t.cvsScale), n.height = String(s * e.#t.cvsScale);
		}
	}
	#f(e) {
		let { id: t, var_name: n } = e;
		if (!t) throw "idは必須です";
		let r = document.getElementById(t);
		if (!r) throw `id【${t}】はフレームではありません`;
		let i = "const.sn.frm." + t;
		if (!this.val.getVal(`tmp:${i}`)) throw `frame【${t}】が読み込まれていません`;
		if (!n) throw "var_nameは必須です";
		let o = r.contentWindow;
		if (!Object.hasOwn(o, n)) throw `frame【${t}】に変数/関数【${n}】がありません。変数は var付きにして下さい`;
		let s = o[n];
		return this.val.setVal_Nochk("tmp", i + "." + n, a(e, "function", !1) ? s() : s), !1;
	}
	#p(e) {
		let { id: t, var_name: n, text: r } = e;
		if (!t) throw "idは必須です";
		let i = document.getElementById(t);
		if (!i) throw `id【${t}】はフレームではありません`;
		let a = "const.sn.frm." + t;
		if (!this.val.getVal(`tmp:${a}`)) throw `frame【${t}】が読み込まれていません`;
		if (!n) throw "var_nameは必須です";
		if (!r) throw "textは必須です";
		this.val.setVal_Nochk("tmp", a + "." + n, r);
		let o = i.contentWindow;
		return o[n] = r, !1;
	}
	#m = 1;
	#h(t) {
		let { id: n } = t;
		if (!n) throw "idは必須です";
		let i = document.getElementById(n);
		if (!i) throw `id【${n}】はフレームではありません`;
		let o = "const.sn.frm." + n;
		if (!this.val.getVal("tmp:" + o)) throw `frame【${n}】が読み込まれていません`;
		let s = i.style;
		if (a(t, "float", !1) ? s.zIndex = String(++this.#m) : "index" in t ? s.zIndex = String(r(t, "index", 0)) : t.dive && (s.zIndex = String(-++this.#m)), "alpha" in t) {
			let e = s.opacity = String(t.alpha);
			this.val.setVal_Nochk("tmp", o + ".alpha", e);
		}
		let c = this.#c(t);
		if (("x" in t || "y" in t) && (s.left = `${String(e.#t.ofsLeft4elm + c.x * e.#t.cvsScale)}px`, s.top = `${String(e.#t.ofsTop4elm + c.y * e.#t.cvsScale)}px`, this.val.setVal_Nochk("tmp", o + ".x", c.x), this.val.setVal_Nochk("tmp", o + ".y", c.y)), "scale_x" in t || "scale_y" in t || "rotate" in t) {
			let e = r(t, "scale_x", 1), n = r(t, "scale_y", 1), i = r(t, "rotate", 0);
			s.transform = `scale(${String(e)}, ${String(n)}) rotate(${String(i)}deg)`, this.val.setVal_Nochk("tmp", o + ".scale_x", e), this.val.setVal_Nochk("tmp", o + ".scale_y", n), this.val.setVal_Nochk("tmp", o + ".rotate", i);
		}
		if ("width" in t && (i.width = String(c.width * e.#t.cvsScale), this.val.setVal_Nochk("tmp", o + ".width", c.width)), "height" in t && (i.height = String(c.height * e.#t.cvsScale), this.val.setVal_Nochk("tmp", o + ".height", c.height)), "visible" in t) {
			let e = a(t, "visible", !0);
			s.display = e ? "inline" : "none", this.val.setVal_Nochk("tmp", o + ".visible", e);
		}
		if ("b_color" in t && (s.backgroundColor = t.b_color), "disabled" in t) {
			let e = this.#s[n] = a(t, "disabled", !0), r = i.contentDocument.body;
			for (let t of [...Array.from(r.getElementsByTagName("input")), ...Array.from(r.getElementsByTagName("select"))]) t.disabled = e;
		}
		return !1;
	}
	#g(t) {
		let { id: n, alpha: i, x: a, y: o, scale_x: s, scale_y: c, rotate: l, width: u, height: d } = t;
		if (!n) throw "idは必須です";
		let f = document.getElementById(n);
		if (!f) throw `id【${n}】はフレームではありません`;
		let p = "const.sn.frm." + n;
		if (!this.val.getVal(`tmp:${p}`, 0)) throw `frame【${n}】が読み込まれていません`;
		let m = {};
		i && (m.a = Number(f.style.opacity)), (a || o || s || c || l) && (m.x = Number(this.val.getVal(`tmp:${p}.x`)), m.y = Number(this.val.getVal(`tmp:${p}.y`)), m.sx = Number(this.val.getVal(`tmp:${p}.scale_x`)), m.sy = Number(this.val.getVal(`tmp:${p}.scale_y`)), m.r = Number(this.val.getVal(`tmp:${p}.rotate`))), u && (m.w = Number(this.val.getVal(`tmp:${p}.width`))), d && (m.h = Number(this.val.getVal(`tmp:${p}.height`)));
		let h = x.cnvTweenArg(t, m), g = {}, _ = (e) => {};
		i && (g.a = r(h, "alpha", 0), _ = (e) => {
			f.style.opacity = String(e.a), this.val.setVal_Nochk("tmp", "alpha", e.a);
		});
		let v = (e) => {}, y = this.#c(h);
		(a || o || s || c || l) && (g.x = y.x, g.y = y.y, g.sx = r(h, "scale_x", 1), g.sy = r(h, "scale_y", 1), g.r = r(h, "rotate", 0), v = (t) => {
			f.style.left = `${String(e.#t.ofsLeft4elm + t.x * e.#t.cvsScale)} px`, f.style.top = `${String(e.#t.ofsTop4elm + t.y * e.#t.cvsScale)} px`, f.style.transform = `scale(${String(t.sx)}, ${String(t.sy)}) rotate(${String(t.r)}deg)`, this.val.setVal_Nochk("tmp", p + ".x", t.x), this.val.setVal_Nochk("tmp", p + ".y", t.y), this.val.setVal_Nochk("tmp", p + ".scale_x", t.sx), this.val.setVal_Nochk("tmp", p + ".scale_y", t.sy), this.val.setVal_Nochk("tmp", p + ".rotate", t.r);
		});
		let b = (e) => {};
		u && (g.w = y.width, b = (t) => {
			f.width = `${String(t.w * e.#t.cvsScale)} px`, this.val.setVal_Nochk("tmp", p + ".width", t.w);
		});
		let S = (e) => {};
		return d && (g.h = y.height, S = (t) => {
			f.height = `${String(t.h * e.#t.cvsScale)} px`, this.val.setVal_Nochk("tmp", p + ".height", t.h);
		}), this.appPixi.stage.interactive = !1, x.tween(`frm\n${n}`, t, m, x.cnvTweenArg(t, m), (e) => {
			_(e), v(e), b(e), S(e);
		}, () => {
			this.appPixi.stage.interactive = !0;
		}, () => {}), !1;
	}
}, N = class {
	oCfg;
	hTag;
	val;
	#e = { text: "" };
	#t = [];
	constructor(e, t, n) {
		this.oCfg = e, this.hTag = t, this.val = n, t.rec_ch = (e) => this.#n(e), t.rec_r = (e) => this.#r(e), t.reset_rec = (e) => this.#i(e), n.defTmp("const.sn.log.json", () => {
			this.#e.text = this.#e.text.replaceAll("</span><span class='sn_ch'>", "");
			let e = [...this.#t, this.#e];
			return JSON.stringify(e);
		}), this.recText("");
	}
	recText(e) {
		this.#e.text = e, this.val.setVal_Nochk("save", "const.sn.sLog", String(this.val.getVal("const.sn.log.json")));
	}
	#n(e) {
		return this.#e = {
			...e,
			text: this.#e.text
		}, e.text ? (e.record = !0, e.style ??= "", e.style += "display: none;", e.wait = 0, this.hTag.ch(e)) : (this.val.setVal_Nochk("save", "const.sn.sLog", String(this.val.getVal("const.sn.log.json"))), !1);
	}
	#r(e) {
		return this.#n({
			...e,
			text: "[r]"
		});
	}
	#i(e) {
		return this.#t = [], e.text ??= "", this.#e = { text: e.text }, this.val.setVal_Nochk("save", "const.sn.sLog", JSON.stringify([this.#e])), !1;
	}
	pagebreak() {
		this.#e.text = this.#e.text.replaceAll("</span><span class='sn_ch'>", ""), this.#e.text && (this.#t.push(this.#e) > this.oCfg.log.max_len && (this.#t = this.#t.slice(-this.oCfg.log.max_len)), this.#e = { text: "" });
	}
	playback() {
		this.#t = JSON.parse(String(this.val.getVal("save:const.sn.sLog"))), this.#e = { text: "" };
	}
};
//#endregion
//#region src/sn/LayerMng.ts
function P(e) {
	return encodeURIComponent(JSON.stringify(e));
}
var F = class c {
	cfg;
	hTag;
	appPixi;
	val;
	main;
	scrItr;
	sys;
	#e;
	#t = new f();
	#n = new f();
	#r;
	#i;
	#a;
	#o = new _();
	constructor(e, t, r, i, a, s, c, l, u) {
		this.cfg = e, this.hTag = t, this.appPixi = r, this.val = i, this.main = a, this.scrItr = s, this.sys = c;
		let d = () => {
			if (c.cvsResize(), this.cvsResizeDesign(), this.#l) for (let e of this.#S) this.#x[e].fore.cvsResizeChildren();
			else for (let e of this.#S) this.#x[e].fore.cvsResize();
			this.#r.cvsResize(), this.#f.cvsResize();
		};
		if (o.isMobile) this.#o.add(globalThis, "orientationchange", d, { passive: !0 });
		else {
			let e;
			this.#o.add(globalThis, "resize", () => {
				e ||= setTimeout(() => {
					e = void 0, d();
				}, 1e3 / 60 * 10);
			}, { passive: !0 });
		}
		c.cvsResize(), this.#a = new N(this.cfg.oCfg, t, i), E.init(e, t, i, this.#a, (e) => this.#x[e.layname].fore === e, r), O.init(a, e, r, c, l, i), M.init(e, c, a), this.#r = new M(t, r, i), t.loadplugin = (e) => this.#y(e), t.snapshot = (e) => this.#h(e), this.#g = this.sys.isApp ? (e, t, n, r, i) => this.#_(e, t, n, r, i) : (e, t, n, r, i) => this.#v(e, t, n, r, i), t.add_lay = (e) => this.#b(e), t.clear_lay = (e) => this.#D(e), t.finish_trans = () => !1, t.lay = (e) => this.#T(e), t.trans = (e) => this.#N(e), t.wt = (e) => x.wt(e), t.quake = (e) => this.#L(e), t.stop_quake = t.finish_trans, t.wq = t.wt, t.pause_tsy = (e) => x.pause_tsy(e), t.resume_tsy = (e) => x.resume_tsy(e), t.stop_tsy = (e) => x.stop_tsy(e), t.tsy = (e) => this.#R(e), t.wait_tsy = (e) => x.wait_tsy(e), t.add_filter = (e) => this.#z(e), t.clear_filter = (e) => this.#V(e), t.enable_filter = (e) => this.#H(e), t.ch = (e) => this.#W(e), t.clear_text = (e) => this.#Q(e), t.current = (e) => this.#q(e), t.endlink = (e) => this.#$(e), t.er = (e) => this.#ee(e), t.graph = (e) => this.#te(e), t.link = (e) => this.#ne(e), t.r = (e) => this.#re(e), t.ruby2 = (e) => this.#ie(e), t.span = (e) => this.#ae(e), t.tcy = (e) => this.#oe(e), t.add_face = (e) => C.add_face(e), t.wv = (e) => C.wv(e), t.dump_lay = (e) => this.#se(e), t.enable_event = (e) => this.#ce(e), t.button = (e) => this.#le(e), e.existsBreakline && (this.breakLine = (e) => {
			delete e.visible, e.id = "break", e.pic = "breakline", this.#m("grp｜" + P(e));
		}), e.existsBreakpage && (this.breakPage = (e) => {
			delete e.visible, e.id = "break", e.pic = "breakpage", this.#m("grp｜" + P(e));
		}), this.#i = n(String(e.oCfg.init.bg_color));
		let f = new h();
		f.beginFill(this.#i).lineStyle(0, this.#i).drawRect(0, 0, o.stageW, o.stageH).endFill(), this.#t.addChild(f.clone()), this.#n.addChild(f), this.#n.visible = !1, this.#t.name = "page:A", this.#n.name = "page:B", this.#e = r.stage, this.#e.addChild(this.#n), this.#e.addChild(this.#t), this.#e.addChild(this.#A), this.#e.addChild(this.#M), this.#e.name = "stage";
		let p = (e, t) => {
			this.#p(Number(t));
		};
		p("", i.getVal("sys:TextLayer.Back.Alpha", 1)), i.defValTrg("sys:TextLayer.Back.Alpha", p);
		let m = (e, t) => {
			w.fontFamily = t;
		};
		m("", i.getVal("tmp:sn.button.fontFamily", w.fontFamily)), i.defValTrg("tmp:sn.button.fontFamily", m), i.defTmp("const.sn.last_page_text", () => this.currentTxtlayFore?.pageText ?? ""), i.defTmp("const.sn.last_page_plain_text", () => this.currentTxtlayFore?.pagePlainText ?? ""), o.isDbg && (k.init(r, c, s, u, e, this.#x), this.cvsResizeDesign = () => k.cvsResizeDesign(), c.addHook((e, t) => {
			this.#s[e]?.(e, t) && delete this.#s[e];
		}));
	}
	cvsResizeDesign() {}
	#s = {
		attach: (e) => (k.leaveMode(), !1),
		continue: (e) => (k.leaveMode(), !1),
		disconnect: (e) => (k.leaveMode(), !1),
		_enterDesign: (e) => {
			k.enterMode();
			for (let e of this.#S) {
				let t = this.#x[e].fore;
				t.makeDesignCastChildren((e) => e.make()), t.makeDesignCast((e) => e.make());
			}
			return this.#u(this.#C), !1;
		},
		_replaceToken: (e, t) => (k.replaceToken(t), !1),
		_selectNode: (e, t) => (this.#u(t.node), !1)
	};
	#c = "";
	#l = "";
	#u(e) {
		[this.#c = "", this.#l = ""] = e.split("/");
		let t = this.#x[this.#c];
		t && (k.allHide(), this.#l ? t.fore.showDesignCastChildren() : t.fore.showDesignCast());
	}
	getFrmDisabled = (e) => this.#r.getFrmDisabled(e);
	#d = void 0;
	cover(e, t = 0) {
		this.#d &&= (this.#e.removeChild(this.#d), this.#d.destroy(), void 0), e && this.#e.addChild((this.#d = new h()).beginFill(t).lineStyle(0, t).drawRect(0, 0, o.stageW, o.stageH).endFill());
	}
	#f;
	setEvtMng(e) {
		this.#f = e, this.#r.setEvtMng(e), C.setEvtMng(e), x.init(e);
	}
	destroy() {
		for (let e of Object.values(this.#x)) e.destroy();
		this.#o.clear(), O.destroy(), T.destroy(), D.destroy(), E.destroy(), this.#r.destroy(), x.destroy(), E.msecChWait = 10;
	}
	#p(e) {
		for (let t of this.#S) {
			let { fore: n, back: r } = this.#x[t];
			n instanceof E && (n.chgBackAlpha(e), r.chgBackAlpha(e));
		}
	}
	#m = (e, t = this.currentTxtlayForeNeedErr, n = !0) => t.tagCh("｜&emsp;《" + e + "》");
	goTxt = () => {};
	get needGoTxt() {
		return this.currentTxtlayFore?.needGoTxt ?? !1;
	}
	breakLine = (e) => {};
	breakPage = (e) => {};
	clearBreak() {
		this.currentTxtlayFore && (this.clearBreak = () => this.#m("del｜break"), this.clearBreak());
	}
	clickTxtLay() {
		return this.currentTxtlayFore ? this.#S.map((e) => this.#x[e].fore).some((e) => e instanceof E && e.click()) : !1;
	}
	#h(e) {
		let t = s("-", "_", "", "_"), n = e.fn ? e.fn.startsWith("userdata:/") ? e.fn : `${A + e.fn + t}.png` : `${A}snapshot${t}.png`, i = this.cfg.searchPath(n), a = r(e, "width", o.stageW), c = r(e, "height", o.stageH);
		return this.#g(e, i, a, c, `snapshot dt:${t}`);
	}
	#g = () => !1;
	#_({ layer: e }, t, n, r, i) {
		if (this.#r.hideAllFrame(), S.beginProc(i), !e) return this.sys.capturePage(t, n, r, () => {
			this.#r.restoreAllFrame(), S.endProc(i);
		}), !0;
		let a = this.#S.map((e) => {
			let { ctn: t } = this.#x[e].fore, n = [t, t.visible];
			return t.visible = !1, n;
		});
		for (let t of this.#P(e)) this.#x[t].fore.ctn.visible = !0;
		return this.sys.capturePage(t, n, r, () => {
			for (let [e, t] of a) e.visible = t;
			this.#r.restoreAllFrame(), S.endProc(i);
		}), !0;
	}
	#v(t, n, r, i, o) {
		S.beginProc(o);
		let s = e(t, "b_color", this.#i), c = m({
			width: r,
			height: i,
			backgroundAlpha: s > 16777216 && n.endsWith(".png") ? 0 : 1,
			antialias: a(t, "smoothing", !1),
			preserveDrawingBuffer: !0,
			backgroundColor: s & 16777215,
			autoDensity: !0
		}), u = t.page === "back" ? "back" : "fore", { layer: d } = t;
		return Promise.allSettled(this.#P(d).map((e) => new Promise((t) => this.#x[e][u].snapshot(c, t)))).then(async () => {
			let e = l.create({
				width: c.width,
				height: c.height
			});
			c.render(this.#e, { renderTexture: e }), await this.sys.savePic(n, c.plugins.extract.base64(e)), e.destroy();
			for (let e of this.#P(d)) this.#x[e][u].snapshot_end();
			c.destroy(!0), S.endProc(o);
		}), !0;
	}
	#y(e) {
		let { fn: t } = e;
		if (!t) throw "fnは必須です";
		if (!t.endsWith(".css")) throw "サポートされない拡張子です";
		let n = a(e, "join", !0), r = S.procID + `loadplugin fn:${t}`;
		return n && S.beginProc(r), (async () => {
			let e = await fetch(t);
			if (!e.ok) throw Error("Network response was not ok.");
			i(await e.text()), n && S.endProc(r);
		})(), n;
	}
	#b(e) {
		let { layer: t, class: n } = e;
		if (!t) throw "layerは必須です";
		if (t.includes(",")) throw "layer名に「,」は使えません";
		if (t in this.#x) throw `layer【${t}】はすでにあります`;
		if (!n) throw "clsは必須です";
		let r = { isWait: !1 };
		switch (this.#x[t] = new j(t, n, this.#t, this.#n, e, this.sys, this.val, r), this.#S.push(t), n) {
			case "txt":
				this.#C || (this.#X = () => {}, this.#G = (e) => this.#K(e), this.#q = (e) => this.#J(e), this.hTag.current({ layer: t }), this.goTxt = () => {
					this.#f.isSkipping ? E.msecChWait = 0 : this.setNormalChWait();
					for (let e of this.#S) {
						let t = this.#x[e].fore;
						t instanceof E && this.#m("gotxt｜", t, !1);
					}
				}), this.val.setVal_Nochk("save", "const.sn.layer." + t + ".enabled", !0);
				break;
			case "grp":
				if (this.#w) break;
				this.#w = t;
				break;
		}
		return this.scrItr.recodeDesign(e), r.isWait;
	}
	#x = {};
	#S = [];
	#C = "";
	#w = "";
	#T(e) {
		let t = this.#Z(e), n = this.#x[t], i = n.back.ctn, o = n.fore.ctn;
		if (a(e, "float", !1)) this.#n.setChildIndex(i, this.#n.children.length - 1), this.#t.setChildIndex(o, this.#t.children.length - 1), this.#E();
		else if (e.index) r(e, "index", 0) && (this.#n.setChildIndex(i, e.index), this.#t.setChildIndex(o, e.index), this.#E());
		else if (e.dive) {
			let { dive: n } = e, r = 0;
			if (t === n) throw "[lay] 属性 layerとdiveが同じ【" + n + "】です";
			let a = this.#x[n];
			if (!a) throw "[lay] 属性 dive【" + n + "】が不正です。レイヤーがありません";
			let s = a.back, c = a.fore, l = this.#n.getChildIndex(s.ctn), u = this.#t.getChildIndex(c.ctn);
			r = l < u ? l : u, r > this.#n.getChildIndex(i) && --r, this.#t.setChildIndex(o, r), this.#n.setChildIndex(i, r), this.#E();
		}
		return e[":id_tag"] = n.fore.name.slice(0, -7), this.scrItr.recodeDesign(e), n.lay(e);
	}
	#E() {
		this.#S = this.#I();
	}
	#D(e) {
		return this.#F(e, (t) => {
			let n = this.#x[this.#Z({ layer: t })];
			if (e.page === "both") {
				n.fore.clearLay(e), n.back.clearLay(e);
				return;
			}
			n.getPage(e).clearLay(e);
		}), !1;
	}
	static #O = "\nprecision mediump float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform sampler2D rule;\nuniform float vague;\nuniform float tick;\n\nuniform vec4 inputPixel;\nuniform highp vec4 outputFrame;\nvec2 getUV(vec2 coord) {\n	return coord * inputPixel.xy / outputFrame.zw;\n}\n\nvoid main() {\n	vec4 fg = texture2D(uSampler, vTextureCoord);\n	vec4 ru = texture2D(rule, getUV(vTextureCoord));\n\n	float v = ru.r - tick;\n	gl_FragColor = abs(v) < vague\n		? vec4(fg.rgb, 1) *fg.a *(0.5 +v /vague *0.5)\n		: 0.0 <= v ? fg : vec4(0);\n}";
	#k = l.create({
		width: o.stageW,
		height: o.stageH
	});
	#A = new p(this.#k);
	#j = l.create({
		width: o.stageW,
		height: o.stageH
	});
	#M = new p(this.#j);
	#N(e) {
		let { layer: t } = e, n = /* @__PURE__ */ new Set(), i = this.#P(t).map((e) => (n.add(e), this.#x[e].fore)), a = () => {
			[this.#t, this.#n] = [this.#n, this.#t];
			let e = [];
			for (let [t, r] of Object.entries(this.#x)) {
				if (n.has(t)) {
					r.transPage(e);
					continue;
				}
				let { fore: { ctn: i }, back: { ctn: a } } = r, o = this.#t.getChildIndex(a);
				this.#t.removeChild(a), this.#n.removeChild(i), this.#t.addChildAt(i, o), this.#n.addChildAt(a, o);
			}
			Promise.allSettled(e).then(() => {
				this.#t.visible = !0, this.#n.visible = !1, this.#A.visible = !1, this.#M.visible = !1, S.notifyEndProc(b);
			});
		};
		if (this.#M.filters = [], this.#M.alpha = 1, r(e, "time", 0) === 0 || this.#f.isSkipping) return a(), !1;
		let o = [], s = this.#S.map((e) => {
			let { fore: t, back: r } = this.#x[e], i = n.has(e) ? r : t;
			return i.ctn.visible && o.push(i.ctn), i;
		}), { ticker: l, renderer: d } = this.appPixi;
		d.render(this.#n, { renderTexture: this.#k });
		let f = () => {
			for (let e of o) d.render(e, {
				renderTexture: this.#k,
				clear: !1
			});
		};
		if (!s.some((e) => e.containMovement)) {
			let e = f;
			f = () => {
				f = () => {}, e();
			};
		}
		let p = () => d.render(this.#t, { renderTexture: this.#j });
		p();
		let m = () => {
			this.#t.visible = !0, p(), this.#t.visible = !1;
		};
		if (!i.some((e) => e.containMovement)) {
			let e = m;
			m = () => {
				m = () => {}, e();
			};
		}
		let h = () => {
			f(), this.#A.visible = !0, m(), this.#M.visible = !0;
		}, { glsl: _, rule: v } = e, y = () => {
			l.remove(h), a();
		};
		if (!_ && !v) return x.tween(b, e, this.#M, { alpha: 0 }, () => {}, y, () => {}), l.add(h), !1;
		let w = {
			rule: u.EMPTY,
			vague: r(e, "vague", .04),
			tick: 0
		};
		this.#M.filters = [new g(void 0, _ ?? c.#O, w)];
		let T = x.tween(b, e, w, { tick: 1 }, () => {}, y, () => {}, !v);
		return v ? new C(v, void 0, (e) => {
			w.rule = e.texture, e.destroy(), l.add(h), T.start();
		}, (e) => {
			e && this.main.resume();
		}).ret : (l.add(h), !1);
	}
	#P(e = "") {
		return e ? e.split(",") : this.#S;
	}
	#F(e, t) {
		let n = this.#P(e.layer);
		for (let e of n) {
			let n = this.#x[e];
			if (!n) throw `存在しないlayer【${e}】です`;
			t(e, n);
		}
		return n;
	}
	#I(e = "") {
		return this.#P(e).sort((e, t) => {
			let n = this.#t.getChildIndex(this.#x[e].fore.ctn), r = this.#t.getChildIndex(this.#x[t].fore.ctn);
			return n < r ? -1 : +(n > r);
		});
	}
	setAllStyle2TxtLay(e) {
		for (let t of this.#S) {
			let n = this.#x[t].fore;
			n instanceof E && n.lay({ style: e });
		}
	}
	#L(e) {
		if (r(e, "time", NaN) === 0) return !1;
		let n = this.#P(e.layer).map((e) => this.#x[e].fore.ctn), { renderer: i, ticker: a } = this.appPixi;
		this.#j.resize(o.stageW, o.stageH);
		let s = () => {
			this.#t.visible = !0;
			for (let e of n) i.render(e, {
				renderTexture: this.#j,
				clear: !1
			});
			this.#t.visible = !1;
		};
		this.#M.visible = !0, this.#M.alpha = 1;
		let c = t(r(e, "hmax", 10)), l = t(r(e, "vmax", 10)), u = c === 0 ? () => {} : () => {
			this.#M.x = Math.round(Math.random() * c * 2) - c;
		}, d = l === 0 ? () => {} : () => {
			this.#M.y = Math.round(Math.random() * l * 2) - l;
		};
		return this.#M.filters = [], x.tween(b, e, this.#M, {
			x: 0,
			y: 0
		}, () => {
			u(), d();
		}, () => {
			a.remove(s), this.#t.visible = !0, this.#M.visible = !1, this.#M.x = 0, this.#M.y = 0, S.notifyEndProc(b);
		}, () => {}), a.add(s), !1;
	}
	#R(e) {
		let { layer: t, render: n, name: r } = e;
		if (!t) throw "layerは必須です";
		let i = this.#x[this.#Z(e)], o = i.fore, s = () => {};
		n && (this.#f.isSkipping ? o.renderStart(!0) : (o.renderStart(!1), s = () => o.renderEnd()));
		let c = x.cnvTweenArg(e, o), l = a(e, "arrive", !1), u = a(e, "backlay", !1), d = i.back.ctn;
		return x.tween(r ?? t, e, o, x.cnvTweenArg(e, o), () => {}, s, () => {
			if (l && Object.assign(o, c), u) for (let e of x.aLayerPrpNm) d[e] = o[e];
		}), "filter" in e && (o.ctn.filters = [y.bldFilters(e)], o.aFltHArg = [e]), !1;
	}
	#z(e) {
		return this.#F(e, (t) => {
			let n = this.#x[this.#Z({ layer: t })];
			if (e.page === "both") {
				this.#B(n.fore, e), this.#B(n.back, e);
				return;
			}
			let r = n.getPage(e);
			this.#B(r, e);
		}), !1;
	}
	#B(e, t) {
		let n = e.ctn;
		n.filters ??= [], n.filters = [...n.filters, y.bldFilters(t)], e.aFltHArg.push(t);
	}
	#V(e) {
		return this.#F(e, (t) => {
			let n = this.#x[this.#Z({ layer: t })];
			if (e.page === "both") {
				let e = n.fore, t = n.back;
				e.ctn.filters = null, t.ctn.filters = null, e.aFltHArg = [], t.aFltHArg = [];
				return;
			}
			let r = n.getPage(e);
			r.ctn.filters = null, r.aFltHArg = [];
		}), !1;
	}
	#H(e) {
		return this.#F(e, (t) => {
			let n = this.#x[this.#Z({ layer: t })];
			if (e.page === "both") {
				this.#U(n.fore, e), this.#U(n.back, e);
				return;
			}
			let r = n.getPage(e);
			this.#U(r, e);
		}), !1;
	}
	#U(e, n) {
		let i = e.ctn;
		if (!i.filters) throw "フィルターがありません";
		let o = t(r(n, "index", 0)), s = i.filters.length;
		if (s <= o) throw `フィルターの個数（${String(s)}）を越えています`;
		e.aFltHArg[o].enabled = i.filters[o].enabled = a(n, "enabled", !0);
	}
	#W(e) {
		let { text: t } = e;
		if (!t) throw "textは必須です";
		let n = this.#G(e);
		delete e.text, this.setNormalChWait(), this.#f.isSkipping ? e.wait = 0 : "wait" in e && r(e, "wait", NaN), this.#m("add｜" + P(e), n);
		let i = a(e, "record", !0), o = this.val.doRecLog();
		return i || this.val.setVal_Nochk("save", "sn.doRecLog", i), n.tagCh(t.replaceAll("[r]", "\n")), this.val.setVal_Nochk("save", "sn.doRecLog", o), this.#m("add_close｜", n), !1;
	}
	#G = (e) => {
		throw this.#X(), 0;
	};
	#K(e) {
		let t = this.#Z(e, this.#C), n = this.#x[t].getPage(e);
		if (!(n instanceof E)) throw t + "はTxtLayerではありません";
		return n;
	}
	setNormalChWait() {
		E.msecChWait = this.scrItr.normalWait;
	}
	#q = (e) => {
		throw this.#X(), 0;
	};
	#J(e) {
		let { layer: t } = e;
		if (!t) throw "[current] layerは必須です";
		let n = this.#x[t];
		if (!n || !(n.getPage(e) instanceof E)) throw `${t}はTxtLayerではありません`;
		this.#Y = n, this.#a.pagebreak(), this.#C = t, this.val.setVal_Nochk("save", "const.sn.mesLayer", t);
		for (let e of this.#S) {
			let { fore: n, back: r } = this.#x[e];
			n instanceof E && (n.isCur = r.isCur = e === t);
		}
		return !1;
	}
	get currentTxtlayForeNeedErr() {
		return this.#X(), this.currentTxtlayFore;
	}
	get currentTxtlayFore() {
		return this.#Y ? this.#Y.fore : null;
	}
	#Y = void 0;
	#X = () => {
		throw "文字レイヤーがありません。文字表示や操作する前に、[add_lay layer=（レイヤ名） class=txt]で文字レイヤを追加して下さい";
	};
	#Z(e, t = "") {
		let n = e.layer ?? t;
		if (n.includes(",")) throw "layer名に「,」は使えません";
		if (!(n in this.#x)) throw "属性 layer【" + n + "】が不正です。レイヤーがありません";
		return e.layer = n, n;
	}
	recPagebreak() {
		this.#a.pagebreak();
	}
	#Q(e) {
		let t = this.#G(e);
		return e.layer === this.#C && e.page === "fore" && this.#a.pagebreak(), t.clearText(), !1;
	}
	#$(e) {
		return this.#m("endlink｜", this.#G(e)), !1;
	}
	#ee(e) {
		return a(e, "rec_page_break", !0) && this.#a.pagebreak(), this.#Y && (this.#Y.fore.clearLay(e), this.#Y.back.clearLay(e)), !1;
	}
	#te(e) {
		if (!e.pic) throw "[graph] picは必須です";
		return this.#m("grp｜" + P(e), this.#G(e)), !1;
	}
	#ne(e) {
		if (!e.fn && !e.label && !e.url) throw "fn,label,url いずれかは必須です";
		return e.fn ??= this.scrItr.scriptFn, e.style ??= "background-color: rgba(255,0,0,0.5);", e.style_hover ??= "background-color: rgba(255,0,0,0.9);", e.style_clicked ??= e.style, this.#m("link｜" + P(e), this.#G(e)), !1;
	}
	#re(e) {
		return this.#W({
			...e,
			text: "\n"
		});
	}
	#ie(e) {
		let { t, r: n } = e;
		if (!t) throw "[ruby2] tは必須です";
		if (!n) throw "[ruby2] rは必須です";
		return e.text = "｜" + encodeURIComponent(t) + "《" + encodeURIComponent(n) + "》", delete e.t, delete e.r, this.#W(e);
	}
	#ae(e) {
		return this.#m("span｜" + P(e), this.#G(e)), !1;
	}
	#oe(e) {
		if (!e.t) throw "[tcy] tは必須です";
		return this.#m("tcy｜" + P(e), this.#G(e)), !1;
	}
	#se({ layer: e }) {
		console.group("🥟 [dump_lay]");
		for (let t of this.#P(e)) {
			let { fore: e, back: n } = this.#x[t];
			try {
				console.info(`%c${e.name.slice(0, -7)} %o`, `color:#${o.isDarkMode ? "49F" : "05A"};`, JSON.parse(`{"back":{${n.dump()}}, "fore":{${e.dump()}}}`));
			} catch (t) {
				console.error("dump_lay err:%o", t), console.error(`   back:${n.dump()}`), console.error(`   fore:${e.dump()}`);
			}
		}
		return console.groupEnd(), !1;
	}
	#ce(e) {
		let t = this.#Z(e, this.#C), n = a(e, "enabled", !0);
		return this.#G(e).enabled = n, this.val.setVal_Nochk("save", "const.sn.layer." + t + ".enabled", n), !1;
	}
	#le(e) {
		return j.argChk_page(e, "back"), e.fn ??= this.scrItr.scriptFn, this.#G(e).addButton(e), this.scrItr.recodeDesign(e), !1;
	}
	record() {
		let e = {};
		for (let t of this.#S) {
			let n = this.#x[t];
			e[t] = {
				cls: n.cls,
				fore: n.fore.record(),
				back: n.back.record()
			};
		}
		return e;
	}
	playback(e) {
		this.#a.playback();
		let t = [], n = [];
		for (let [r, { fore: i, fore: { idx: a }, back: o, cls: s }] of Object.entries(e)) {
			n.push({
				ln: r,
				idx: a
			});
			let e = this.#x[r] ??= new j(r, s, this.#t, this.#n, {}, this.sys, this.val, { isWait: !1 });
			e.fore.playback(i, t), e.back.playback(o, t);
		}
		let r = this.#t.children.length;
		return t.push(new Promise((e) => {
			for (let { ln: e, idx: t } of n.sort(({ idx: e }, { idx: t }) => e === t ? 0 : e < t ? -1 : 1)) {
				let n = this.#x[e];
				if (!n) continue;
				let i = r > t ? t : r - 1, { fore: a, back: o } = n;
				this.#t.setChildIndex(a.ctn, i), this.#n.setChildIndex(o.ctn, i);
			}
			e();
		})), t;
	}
};
//#endregion
export { F as LayerMng };

//# sourceMappingURL=LayerMng.js.map