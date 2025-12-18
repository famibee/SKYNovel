import { c as argChk_Color, g as uint, h as parseColor, l as argChk_Num, o as addStyle, s as argChk_Boolean, t as CmnLib, u as getDateStr } from "./CmnLib.js";
import { c as Loader, d as RenderTexture, f as Texture, l as LoaderResource, m as Container, o as Sprite, p as autoDetectRenderer, s as Graphics, u as Filter } from "./pixi.js";
import { t as EventListenerCtn } from "./EventListenerCtn.js";
import { n as SEARCH_PATH_ARG_EXT } from "./ConfigBase.js";
import { t as Layer } from "./Layer.js";
import "./DebugMng.js";
import { i as TW_NM_TRANS, r as CmnTween, t as Reading } from "./Reading.js";
import { t as SpritesMng } from "./SpritesMng.js";
import { Button } from "./Button.js";
import { t as RubySpliter } from "./RubySpliter.js";
import { TxtLayer, t as TxtStage } from "./TxtLayer.js";
import { GrpLayer, t as DesignCast } from "./GrpLayer.js";
import { n as PROTOCOL_DL, r as PROTOCOL_USERDATA } from "./Config.js";
var Pages = class e {
	#e;
	constructor(e, m, h, g, _, y, b, x) {
		this.cls = m, this.hArg = _, this.sys = y, this.val = b, this.ret = x;
		let S = y.hFactoryCls[m];
		if (!S) throw `属性 class【${m}】が不正です`;
		let C = S(), w = S();
		C.layname = w.layname = e;
		let T = _[":id_tag"] = `layer:${e} cls:${m} page:`;
		C.ctn.name = C.name = T + "A", w.ctn.name = w.name = T + "B", h.addChild(C.ctn), g.addChild(w.ctn), argChk_Boolean(_, "visible", !0), argChk_Boolean(_, "visible", !0), x.isWait = C.lay(_) || w.lay(_), this.#e = {
			fore: C,
			back: w
		}, g.visible = !1;
		let E = `const.sn.lay.${e}`;
		b.setVal_Nochk("tmp", E, !0), b.defTmp(E + ".fore.alpha", () => this.#e.fore.alpha), b.defTmp(E + ".back.alpha", () => this.#e.back.alpha), b.defTmp(E + ".fore.height", () => this.#e.fore.height), b.defTmp(E + ".back.height", () => this.#e.back.height), b.defTmp(E + ".fore.visible", () => this.#e.fore.ctn.visible), b.defTmp(E + ".back.visible", () => this.#e.back.ctn.visible), b.defTmp(E + ".fore.width", () => this.#e.fore.width), b.defTmp(E + ".back.width", () => this.#e.back.width), b.defTmp(E + ".fore.x", () => this.#e.fore.x), b.defTmp(E + ".back.x", () => this.#e.back.x), b.defTmp(E + ".fore.y", () => this.#e.fore.y), b.defTmp(E + ".back.y", () => this.#e.back.y);
	}
	destroy() {
		this.#e.fore.destroy(), this.#e.back.destroy();
	}
	lay = (e) => this.getPage(e).lay(e);
	getPage = (m) => e.argChk_page(m, "fore") === "back" ? this.#e.back : this.#e.fore;
	static argChk_page(e, m) {
		let h = e.page ?? m;
		if (h === "fore" || h === "back") return e.page = h, h;
		throw Error("属性 page【" + h + "】が不正です");
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
}, FrameMng = class e {
	static #e;
	static #t;
	static #n;
	static init(m, h, g) {
		e.#e = m, e.#t = h, e.#n = g;
	}
	constructor(e, m, h) {
		this.appPixi = m, this.val = h, e.add_frame = (e) => this.#o(e), e.let_frame = (e) => this.#f(e), e.set_frame = (e) => this.#p(e), e.frame = (e) => this.#h(e), e.tsy_frame = (e) => this.#g(e);
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
		for (let [e, { style: m }] of Object.entries(this.#i)) this.#a[e] = m.display !== "none", m.display = "none";
	}
	#a = Object.create(null);
	restoreAllFrame() {
		for (let [e, m] of Object.entries(this.#a)) {
			let h = this.#i[e];
			h && (h.style.display = m ? "inline" : "none");
		}
		this.#a = Object.create(null);
	}
	#o(m) {
		let { id: h, src: g, alpha: _ = 1, scale_x: y = 1, scale_y: b = 1, rotate: S = 0 } = m;
		if (!h) throw "idは必須です";
		if (!g) throw "srcは必須です";
		let C = "const.sn.frm." + h;
		if (this.val.getVal(`tmp:${C}`)) throw `frame【${h}】はすでにあります`;
		let T = argChk_Boolean(m, "visible", !0), E = m.b_color ? ` background-color: ${m.b_color};` : "", D = this.#c(m);
		e.#n.cvs.insertAdjacentHTML("beforebegin", `<iframe id="${h}" style="opacity: ${String(_)}; ${E} position: absolute; left:${String(e.#t.ofsLeft4elm + D.x * e.#t.cvsScale)}px; top: ${String(e.#t.ofsTop4elm + D.y * e.#t.cvsScale)}px; z-index: 1; border: 0px; overflow: hidden; display: ${T ? "inline" : "none"}; transform: scale(${String(y)}, ${String(b)}) rotate(${String(S)}deg);" width="${String(D.width * e.#t.cvsScale)}" height="${String(D.height * e.#t.cvsScale)}"></iframe>`);
		let O = Reading.procID + `add_frame id:${h}`;
		Reading.beginProc(O);
		let k = e.#e.searchPath(g, SEARCH_PATH_ARG_EXT.HTML), A = new Loader().add({
			name: g,
			url: k,
			xhrType: LoaderResource.XHR_RESPONSE_TYPE.TEXT
		});
		return e.#t.arg.crypto && A.use((m, h) => void e.#t.dec(m.extension, m.data).then((e) => {
			m.data = e, h();
		}).catch((g) => {
			e.#n.errScript(`[add_frame]Html ロード失敗です src:${m.name} ${String(g)}`, !1), h();
		})), A.load((m, v) => {
			let x = document.getElementById(h);
			this.#i[h] = x, this.#s[h] = !1;
			let w = k.lastIndexOf("/") + 1, E = k.slice(0, w), A = E.slice(0, w);
			x.srcdoc = String(v[g]?.data).replace("sn_repRes();", "").replaceAll(/\s(?:src|href)=(["'])(\S+?)\1/g, (e, m, h) => h.startsWith("../") ? A + e.slice(3) : e.replace("./", "").replace(m, m + E)), x.srcdoc.includes("true/*WEBP*/;") && (x.srcdoc = x.srcdoc.replaceAll(/data-src="(.+?\.)(?:jpe?g|png)/g, (e, m) => `data-src="${m}webp`)), x.onload = () => {
				Reading.endProc(O), this.val.setVal_Nochk("tmp", C, !0), this.val.setVal_Nochk("tmp", C + ".alpha", _), this.val.setVal_Nochk("tmp", C + ".x", D.x), this.val.setVal_Nochk("tmp", C + ".y", D.y), this.val.setVal_Nochk("tmp", C + ".scale_x", y), this.val.setVal_Nochk("tmp", C + ".scale_y", b), this.val.setVal_Nochk("tmp", C + ".rotate", S), this.val.setVal_Nochk("tmp", C + ".width", D.width), this.val.setVal_Nochk("tmp", C + ".height", D.height), this.val.setVal_Nochk("tmp", C + ".visible", T);
				let m = x.contentWindow;
				this.#r.resvFlameEvent(m.document.body), m.sn_repRes?.((m) => e.#l(m.dataset.src ?? "", m));
			};
		}), !0;
	}
	#s = {};
	getFrmDisabled(e) {
		return this.#s[e];
	}
	#c(e) {
		let m = { ...e };
		return new DOMRect(argChk_Num(m, "x", 0), argChk_Num(m, "y", 0), argChk_Num(m, "width", CmnLib.stageW), argChk_Num(m, "height", CmnLib.stageH));
	}
	static #l(m, h, g) {
		let _ = this.#d[m];
		if (_) {
			h.src = _, g && (h.onload = () => g(h));
			return;
		}
		let v = this.#u[m];
		if (v) {
			v.push(h);
			return;
		}
		this.#u[m] = [h];
		let [y = "", b = ""] = m.split("?"), S = e.#e.searchPath(y, SEARCH_PATH_ARG_EXT.SP_GSM), C = new Loader().add({
			name: m,
			url: S,
			xhrType: LoaderResource.XHR_RESPONSE_TYPE.BUFFER
		});
		e.#t.use4ViteElectron(m, S, C, e.#n) || e.#t.arg.crypto && S.endsWith(".bin") && C.use((m, h) => {
			if (m.extension !== "bin") {
				h();
				return;
			}
			e.#t.decAB(m.data).then((e) => {
				m.data = e, e instanceof HTMLImageElement && (m.type = LoaderResource.TYPE.IMAGE), h();
			}).catch((g) => {
				e.#n.errScript(`FrameMng loadPic ロード失敗です fn:${m.name} ${String(g)}`, !1), h();
			});
		}), C.load((e, m) => {
			for (let [e, { data: { src: h } }] of Object.entries(m)) {
				let m = this.#d[e] = h + (h.startsWith("blob:") || h.startsWith("data:") ? "" : b ? "?" + b : ""), _ = this.#u[e];
				if (_) for (let e of _) e.src = m, g && (e.onload = () => g(e));
				delete this.#u[e];
			}
		});
	}
	static #u = {};
	static #d = {};
	cvsResize() {
		for (let [m, h] of Object.entries(this.#i)) {
			let g = "const.sn.frm." + m, _ = Number(this.val.getVal(g + ".x")), v = Number(this.val.getVal(g + ".y")), y = Number(this.val.getVal(g + ".width")), b = Number(this.val.getVal(g + ".height"));
			h.style.left = `${String(e.#t.ofsLeft4elm + _ * e.#t.cvsScale)}px`, h.style.top = `${String(e.#t.ofsTop4elm + v * e.#t.cvsScale)}px`, h.width = String(y * e.#t.cvsScale), h.height = String(b * e.#t.cvsScale);
		}
	}
	#f(e) {
		let { id: m, var_name: h } = e;
		if (!m) throw "idは必須です";
		let g = document.getElementById(m);
		if (!g) throw `id【${m}】はフレームではありません`;
		let _ = "const.sn.frm." + m;
		if (!this.val.getVal(`tmp:${_}`)) throw `frame【${m}】が読み込まれていません`;
		if (!h) throw "var_nameは必須です";
		let y = g.contentWindow;
		if (!Object.hasOwn(y, h)) throw `frame【${m}】に変数/関数【${h}】がありません。変数は var付きにして下さい`;
		let b = y[h];
		return this.val.setVal_Nochk("tmp", _ + "." + h, argChk_Boolean(e, "function", !1) ? b() : b), !1;
	}
	#p(e) {
		let { id: m, var_name: h, text: g } = e;
		if (!m) throw "idは必須です";
		let _ = document.getElementById(m);
		if (!_) throw `id【${m}】はフレームではありません`;
		let v = "const.sn.frm." + m;
		if (!this.val.getVal(`tmp:${v}`)) throw `frame【${m}】が読み込まれていません`;
		if (!h) throw "var_nameは必須です";
		if (!g) throw "textは必須です";
		this.val.setVal_Nochk("tmp", v + "." + h, g);
		let y = _.contentWindow;
		return y[h] = g, !1;
	}
	#m = 1;
	#h(m) {
		let { id: h } = m;
		if (!h) throw "idは必須です";
		let _ = document.getElementById(h);
		if (!_) throw `id【${h}】はフレームではありません`;
		let y = "const.sn.frm." + h;
		if (!this.val.getVal("tmp:" + y)) throw `frame【${h}】が読み込まれていません`;
		let b = _.style;
		if (argChk_Boolean(m, "float", !1) ? b.zIndex = String(++this.#m) : "index" in m ? b.zIndex = String(argChk_Num(m, "index", 0)) : m.dive && (b.zIndex = String(-++this.#m)), "alpha" in m) {
			let e = b.opacity = String(m.alpha);
			this.val.setVal_Nochk("tmp", y + ".alpha", e);
		}
		let x = this.#c(m);
		if (("x" in m || "y" in m) && (b.left = `${String(e.#t.ofsLeft4elm + x.x * e.#t.cvsScale)}px`, b.top = `${String(e.#t.ofsTop4elm + x.y * e.#t.cvsScale)}px`, this.val.setVal_Nochk("tmp", y + ".x", x.x), this.val.setVal_Nochk("tmp", y + ".y", x.y)), "scale_x" in m || "scale_y" in m || "rotate" in m) {
			let e = argChk_Num(m, "scale_x", 1), h = argChk_Num(m, "scale_y", 1), _ = argChk_Num(m, "rotate", 0);
			b.transform = `scale(${String(e)}, ${String(h)}) rotate(${String(_)}deg)`, this.val.setVal_Nochk("tmp", y + ".scale_x", e), this.val.setVal_Nochk("tmp", y + ".scale_y", h), this.val.setVal_Nochk("tmp", y + ".rotate", _);
		}
		if ("width" in m && (_.width = String(x.width * e.#t.cvsScale), this.val.setVal_Nochk("tmp", y + ".width", x.width)), "height" in m && (_.height = String(x.height * e.#t.cvsScale), this.val.setVal_Nochk("tmp", y + ".height", x.height)), "visible" in m) {
			let e = argChk_Boolean(m, "visible", !0);
			b.display = e ? "inline" : "none", this.val.setVal_Nochk("tmp", y + ".visible", e);
		}
		if ("b_color" in m && (b.backgroundColor = m.b_color), "disabled" in m) {
			let e = this.#s[h] = argChk_Boolean(m, "disabled", !0), g = _.contentDocument.body;
			for (let m of [...Array.from(g.getElementsByTagName("input")), ...Array.from(g.getElementsByTagName("select"))]) m.disabled = e;
		}
		return !1;
	}
	#g(m) {
		let { id: h, alpha: _, x: v, y, scale_x: b, scale_y: x, rotate: S, width: C, height: w } = m;
		if (!h) throw "idは必須です";
		let T = document.getElementById(h);
		if (!T) throw `id【${h}】はフレームではありません`;
		let E = "const.sn.frm." + h;
		if (!this.val.getVal(`tmp:${E}`, 0)) throw `frame【${h}】が読み込まれていません`;
		let D = {};
		_ && (D.a = Number(T.style.opacity)), (v || y || b || x || S) && (D.x = Number(this.val.getVal(`tmp:${E}.x`)), D.y = Number(this.val.getVal(`tmp:${E}.y`)), D.sx = Number(this.val.getVal(`tmp:${E}.scale_x`)), D.sy = Number(this.val.getVal(`tmp:${E}.scale_y`)), D.r = Number(this.val.getVal(`tmp:${E}.rotate`))), C && (D.w = Number(this.val.getVal(`tmp:${E}.width`))), w && (D.h = Number(this.val.getVal(`tmp:${E}.height`)));
		let O = CmnTween.cnvTweenArg(m, D), k = {}, A = (e) => {};
		_ && (k.a = argChk_Num(O, "alpha", 0), A = (e) => {
			T.style.opacity = String(e.a), this.val.setVal_Nochk("tmp", "alpha", e.a);
		});
		let j = (e) => {}, M = this.#c(O);
		(v || y || b || x || S) && (k.x = M.x, k.y = M.y, k.sx = argChk_Num(O, "scale_x", 1), k.sy = argChk_Num(O, "scale_y", 1), k.r = argChk_Num(O, "rotate", 0), j = (m) => {
			T.style.left = `${String(e.#t.ofsLeft4elm + m.x * e.#t.cvsScale)} px`, T.style.top = `${String(e.#t.ofsTop4elm + m.y * e.#t.cvsScale)} px`, T.style.transform = `scale(${String(m.sx)}, ${String(m.sy)}) rotate(${String(m.r)}deg)`, this.val.setVal_Nochk("tmp", E + ".x", m.x), this.val.setVal_Nochk("tmp", E + ".y", m.y), this.val.setVal_Nochk("tmp", E + ".scale_x", m.sx), this.val.setVal_Nochk("tmp", E + ".scale_y", m.sy), this.val.setVal_Nochk("tmp", E + ".rotate", m.r);
		});
		let N = (e) => {};
		C && (k.w = M.width, N = (m) => {
			T.width = `${String(m.w * e.#t.cvsScale)} px`, this.val.setVal_Nochk("tmp", E + ".width", m.w);
		});
		let P = (e) => {};
		return w && (k.h = M.height, P = (m) => {
			T.height = `${String(m.h * e.#t.cvsScale)} px`, this.val.setVal_Nochk("tmp", E + ".height", m.h);
		}), this.appPixi.stage.interactive = !1, CmnTween.tween(`frm\n${h}`, m, D, CmnTween.cnvTweenArg(m, D), (e) => {
			A(e), j(e), N(e), P(e);
		}, () => {
			this.appPixi.stage.interactive = !0;
		}, () => {}), !1;
	}
}, Log = class {
	#e = { text: "" };
	#t = [];
	constructor(e, m, h) {
		this.oCfg = e, this.hTag = m, this.val = h, m.rec_ch = (e) => this.#n(e), m.rec_r = (e) => this.#r(e), m.reset_rec = (e) => this.#i(e), h.defTmp("const.sn.log.json", () => {
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
function cnvSArg(e) {
	return encodeURIComponent(JSON.stringify(e));
}
var LayerMng = class x {
	#e;
	#t = new Container();
	#n = new Container();
	#r;
	#i;
	#a;
	#o = new EventListenerCtn();
	constructor(e, m, g, _, v, b, x, S, C) {
		this.cfg = e, this.hTag = m, this.appPixi = g, this.val = _, this.main = v, this.scrItr = b, this.sys = x;
		let w = () => {
			if (x.cvsResize(), this.cvsResizeDesign(), this.#l) for (let e of this.#S) this.#x[e].fore.cvsResizeChildren();
			else for (let e of this.#S) this.#x[e].fore.cvsResize();
			this.#r.cvsResize(), this.#f.cvsResize();
		};
		if (CmnLib.isMobile) this.#o.add(globalThis, "orientationchange", w, { passive: !0 });
		else {
			let e;
			this.#o.add(globalThis, "resize", () => {
				e ||= setTimeout(() => {
					e = void 0, w();
				}, 1e3 / 60 * 10);
			}, { passive: !0 });
		}
		x.cvsResize(), this.#a = new Log(this.cfg.oCfg, m, _), TxtLayer.init(e, m, _, this.#a, (e) => this.#x[e.layname].fore === e, g), GrpLayer.init(v, e, g, x, S, _), FrameMng.init(e, x, v), this.#r = new FrameMng(m, g, _), m.loadplugin = (e) => this.#y(e), m.snapshot = (e) => this.#h(e), this.#g = this.sys.isApp ? (e, m, h, g, _) => this.#_(e, m, h, g, _) : (e, m, h, g, _) => this.#v(e, m, h, g, _), m.add_lay = (e) => this.#b(e), m.clear_lay = (e) => this.#D(e), m.finish_trans = () => !1, m.lay = (e) => this.#T(e), m.trans = (e) => this.#N(e), m.wt = (e) => CmnTween.wt(e), m.quake = (e) => this.#L(e), m.stop_quake = m.finish_trans, m.wq = m.wt, m.pause_tsy = (e) => CmnTween.pause_tsy(e), m.resume_tsy = (e) => CmnTween.resume_tsy(e), m.stop_tsy = (e) => CmnTween.stop_tsy(e), m.tsy = (e) => this.#R(e), m.wait_tsy = (e) => CmnTween.wait_tsy(e), m.add_filter = (e) => this.#z(e), m.clear_filter = (e) => this.#V(e), m.enable_filter = (e) => this.#H(e), m.ch = (e) => this.#W(e), m.clear_text = (e) => this.#Q(e), m.current = (e) => this.#q(e), m.endlink = (e) => this.#$(e), m.er = (e) => this.#ee(e), m.graph = (e) => this.#te(e), m.link = (e) => this.#ne(e), m.r = (e) => this.#re(e), m.ruby2 = (e) => this.#ie(e), m.span = (e) => this.#ae(e), m.tcy = (e) => this.#oe(e), m.add_face = (e) => SpritesMng.add_face(e), m.wv = (e) => SpritesMng.wv(e), m.dump_lay = (e) => this.#se(e), m.enable_event = (e) => this.#ce(e), m.button = (e) => this.#le(e), e.existsBreakline && (this.breakLine = (e) => {
			delete e.visible, e.id = "break", e.pic = "breakline", this.#m("grp｜" + cnvSArg(e));
		}), e.existsBreakpage && (this.breakPage = (e) => {
			delete e.visible, e.id = "break", e.pic = "breakpage", this.#m("grp｜" + cnvSArg(e));
		}), this.#i = parseColor(String(e.oCfg.init.bg_color));
		let T = new Graphics();
		T.beginFill(this.#i).lineStyle(0, this.#i).drawRect(0, 0, CmnLib.stageW, CmnLib.stageH).endFill(), this.#t.addChild(T.clone()), this.#n.addChild(T), this.#n.visible = !1, this.#t.name = "page:A", this.#n.name = "page:B", this.#e = g.stage, this.#e.addChild(this.#n), this.#e.addChild(this.#t), this.#e.addChild(this.#A), this.#e.addChild(this.#M), this.#e.name = "stage";
		let E = (e, m) => {
			this.#p(Number(m));
		};
		E("", _.getVal("sys:TextLayer.Back.Alpha", 1)), _.defValTrg("sys:TextLayer.Back.Alpha", E);
		let D = (e, m) => {
			Button.fontFamily = m;
		};
		D("", _.getVal("tmp:sn.button.fontFamily", Button.fontFamily)), _.defValTrg("tmp:sn.button.fontFamily", D), _.defTmp("const.sn.last_page_text", () => this.currentTxtlayFore?.pageText ?? ""), _.defTmp("const.sn.last_page_plain_text", () => this.currentTxtlayFore?.pagePlainText ?? ""), CmnLib.isDbg && (DesignCast.init(g, x, b, C, e, this.#x), this.cvsResizeDesign = () => DesignCast.cvsResizeDesign(), x.addHook((e, m) => {
			this.#s[e]?.(e, m) && delete this.#s[e];
		}));
	}
	cvsResizeDesign() {}
	#s = {
		attach: (e) => (DesignCast.leaveMode(), !1),
		continue: (e) => (DesignCast.leaveMode(), !1),
		disconnect: (e) => (DesignCast.leaveMode(), !1),
		_enterDesign: (e) => {
			DesignCast.enterMode();
			for (let e of this.#S) {
				let m = this.#x[e].fore;
				m.makeDesignCastChildren((e) => e.make()), m.makeDesignCast((e) => e.make());
			}
			return this.#u(this.#C), !1;
		},
		_replaceToken: (e, m) => (DesignCast.replaceToken(m), !1),
		_selectNode: (e, m) => (this.#u(m.node), !1)
	};
	#c = "";
	#l = "";
	#u(e) {
		[this.#c = "", this.#l = ""] = e.split("/");
		let m = this.#x[this.#c];
		m && (DesignCast.allHide(), this.#l ? m.fore.showDesignCastChildren() : m.fore.showDesignCast());
	}
	getFrmDisabled = (e) => this.#r.getFrmDisabled(e);
	#d = void 0;
	cover(e, m = 0) {
		this.#d &&= (this.#e.removeChild(this.#d), this.#d.destroy(), void 0), e && this.#e.addChild((this.#d = new Graphics()).beginFill(m).lineStyle(0, m).drawRect(0, 0, CmnLib.stageW, CmnLib.stageH).endFill());
	}
	#f;
	setEvtMng(e) {
		this.#f = e, this.#r.setEvtMng(e), SpritesMng.setEvtMng(e), CmnTween.init(e);
	}
	destroy() {
		for (let e of Object.values(this.#x)) e.destroy();
		this.#o.clear(), GrpLayer.destroy(), RubySpliter.destroy(), TxtStage.destroy(), TxtLayer.destroy(), this.#r.destroy(), CmnTween.destroy(), TxtLayer.msecChWait = 10;
	}
	#p(e) {
		for (let m of this.#S) {
			let { fore: h, back: g } = this.#x[m];
			h instanceof TxtLayer && (h.chgBackAlpha(e), g.chgBackAlpha(e));
		}
	}
	#m = (e, m = this.currentTxtlayForeNeedErr, h = !0) => m.tagCh("｜&emsp;《" + e + "》");
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
		return this.currentTxtlayFore ? this.#S.map((e) => this.#x[e].fore).some((e) => e instanceof TxtLayer && e.click()) : !1;
	}
	#h(e) {
		let m = getDateStr("-", "_", "", "_"), h = e.fn ? e.fn.startsWith("userdata:/") ? e.fn : `${PROTOCOL_DL + e.fn + m}.png` : `${PROTOCOL_DL}snapshot${m}.png`, _ = this.cfg.searchPath(h), v = argChk_Num(e, "width", CmnLib.stageW), x = argChk_Num(e, "height", CmnLib.stageH);
		return this.#g(e, _, v, x, `snapshot dt:${m}`);
	}
	#g = () => !1;
	#_({ layer: e }, m, h, g, _) {
		if (this.#r.hideAllFrame(), Reading.beginProc(_), !e) return this.sys.capturePage(m, h, g, () => {
			this.#r.restoreAllFrame(), Reading.endProc(_);
		}), !0;
		let v = this.#S.map((e) => {
			let { ctn: m } = this.#x[e].fore, h = [m, m.visible];
			return m.visible = !1, h;
		});
		for (let m of this.#P(e)) this.#x[m].fore.ctn.visible = !0;
		return this.sys.capturePage(m, h, g, () => {
			for (let [e, m] of v) e.visible = m;
			this.#r.restoreAllFrame(), Reading.endProc(_);
		}), !0;
	}
	#v(m, h, g, _, y) {
		Reading.beginProc(y);
		let b = argChk_Color(m, "b_color", this.#i), x = autoDetectRenderer({
			width: g,
			height: _,
			backgroundAlpha: b > 16777216 && h.endsWith(".png") ? 0 : 1,
			antialias: argChk_Boolean(m, "smoothing", !1),
			preserveDrawingBuffer: !0,
			backgroundColor: b & 16777215,
			autoDensity: !0
		}), C = m.page === "back" ? "back" : "fore", { layer: w } = m;
		return Promise.allSettled(this.#P(w).map((e) => new Promise((m) => this.#x[e][C].snapshot(x, m)))).then(async () => {
			let e = RenderTexture.create({
				width: x.width,
				height: x.height
			});
			x.render(this.#e, { renderTexture: e }), await this.sys.savePic(h, x.plugins.extract.base64(e)), e.destroy();
			for (let e of this.#P(w)) this.#x[e][C].snapshot_end();
			x.destroy(!0), Reading.endProc(y);
		}), !0;
	}
	#y(e) {
		let { fn: m } = e;
		if (!m) throw "fnは必須です";
		if (!m.endsWith(".css")) throw "サポートされない拡張子です";
		let h = argChk_Boolean(e, "join", !0), g = Reading.procID + `loadplugin fn:${m}`;
		return h && Reading.beginProc(g), (async () => {
			let e = await fetch(m);
			if (!e.ok) throw Error("Network response was not ok.");
			addStyle(await e.text()), h && Reading.endProc(g);
		})(), h;
	}
	#b(e) {
		let { layer: m, class: h } = e;
		if (!m) throw "layerは必須です";
		if (m.includes(",")) throw "layer名に「,」は使えません";
		if (m in this.#x) throw `layer【${m}】はすでにあります`;
		if (!h) throw "clsは必須です";
		let g = { isWait: !1 };
		switch (this.#x[m] = new Pages(m, h, this.#t, this.#n, e, this.sys, this.val, g), this.#S.push(m), h) {
			case "txt":
				this.#C || (this.#X = () => {}, this.#G = (e) => this.#K(e), this.#q = (e) => this.#J(e), this.hTag.current({ layer: m }), this.goTxt = () => {
					this.#f.isSkipping ? TxtLayer.msecChWait = 0 : this.setNormalChWait();
					for (let e of this.#S) {
						let m = this.#x[e].fore;
						m instanceof TxtLayer && this.#m("gotxt｜", m, !1);
					}
				}), this.val.setVal_Nochk("save", "const.sn.layer." + m + ".enabled", !0);
				break;
			case "grp":
				if (this.#w) break;
				this.#w = m;
				break;
		}
		return this.scrItr.recodeDesign(e), g.isWait;
	}
	#x = {};
	#S = [];
	#C = "";
	#w = "";
	#T(e) {
		let m = this.#Z(e), h = this.#x[m], _ = h.back.ctn, y = h.fore.ctn;
		if (argChk_Boolean(e, "float", !1)) this.#n.setChildIndex(_, this.#n.children.length - 1), this.#t.setChildIndex(y, this.#t.children.length - 1), this.#E();
		else if (e.index) argChk_Num(e, "index", 0) && (this.#n.setChildIndex(_, e.index), this.#t.setChildIndex(y, e.index), this.#E());
		else if (e.dive) {
			let { dive: h } = e, g = 0;
			if (m === h) throw "[lay] 属性 layerとdiveが同じ【" + h + "】です";
			let v = this.#x[h];
			if (!v) throw "[lay] 属性 dive【" + h + "】が不正です。レイヤーがありません";
			let b = v.back, x = v.fore, S = this.#n.getChildIndex(b.ctn), C = this.#t.getChildIndex(x.ctn);
			g = S < C ? S : C, g > this.#n.getChildIndex(_) && --g, this.#t.setChildIndex(y, g), this.#n.setChildIndex(_, g), this.#E();
		}
		return e[":id_tag"] = h.fore.name.slice(0, -7), this.scrItr.recodeDesign(e), h.lay(e);
	}
	#E() {
		this.#S = this.#I();
	}
	#D(e) {
		return this.#F(e, (m) => {
			let h = this.#x[this.#Z({ layer: m })];
			if (e.page === "both") {
				h.fore.clearLay(e), h.back.clearLay(e);
				return;
			}
			h.getPage(e).clearLay(e);
		}), !1;
	}
	static #O = "\nprecision mediump float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform sampler2D rule;\nuniform float vague;\nuniform float tick;\n\nuniform vec4 inputPixel;\nuniform highp vec4 outputFrame;\nvec2 getUV(vec2 coord) {\n	return coord * inputPixel.xy / outputFrame.zw;\n}\n\nvoid main() {\n	vec4 fg = texture2D(uSampler, vTextureCoord);\n	vec4 ru = texture2D(rule, getUV(vTextureCoord));\n\n	float v = ru.r - tick;\n	gl_FragColor = abs(v) < vague\n		? vec4(fg.rgb, 1) *fg.a *(0.5 +v /vague *0.5)\n		: 0.0 <= v ? fg : vec4(0);\n}";
	#k = RenderTexture.create({
		width: CmnLib.stageW,
		height: CmnLib.stageH
	});
	#A = new Sprite(this.#k);
	#j = RenderTexture.create({
		width: CmnLib.stageW,
		height: CmnLib.stageH
	});
	#M = new Sprite(this.#j);
	#N(e) {
		let { layer: m } = e, h = /* @__PURE__ */ new Set(), _ = this.#P(m).map((e) => (h.add(e), this.#x[e].fore)), v = () => {
			[this.#t, this.#n] = [this.#n, this.#t];
			let e = [];
			for (let [m, g] of Object.entries(this.#x)) {
				if (h.has(m)) {
					g.transPage(e);
					continue;
				}
				let { fore: { ctn: _ }, back: { ctn: v } } = g, y = this.#t.getChildIndex(v);
				this.#t.removeChild(v), this.#n.removeChild(_), this.#t.addChildAt(_, y), this.#n.addChildAt(v, y);
			}
			Promise.allSettled(e).then(() => {
				this.#t.visible = !0, this.#n.visible = !1, this.#A.visible = !1, this.#M.visible = !1, Reading.notifyEndProc(TW_NM_TRANS);
			});
		};
		if (this.#M.filters = [], this.#M.alpha = 1, argChk_Num(e, "time", 0) === 0 || this.#f.isSkipping) return v(), !1;
		let y = [], b = this.#S.map((e) => {
			let { fore: m, back: g } = this.#x[e], _ = h.has(e) ? g : m;
			return _.ctn.visible && y.push(_.ctn), _;
		}), { ticker: S, renderer: w } = this.appPixi;
		w.render(this.#n, { renderTexture: this.#k });
		let T = () => {
			for (let e of y) w.render(e, {
				renderTexture: this.#k,
				clear: !1
			});
		};
		if (!b.some((e) => e.containMovement)) {
			let e = T;
			T = () => {
				T = () => {}, e();
			};
		}
		let E = () => w.render(this.#t, { renderTexture: this.#j });
		E();
		let D = () => {
			this.#t.visible = !0, E(), this.#t.visible = !1;
		};
		if (!_.some((e) => e.containMovement)) {
			let e = D;
			D = () => {
				D = () => {}, e();
			};
		}
		let O = () => {
			T(), this.#A.visible = !0, D(), this.#M.visible = !0;
		}, { glsl: A, rule: j } = e, M = () => {
			S.remove(O), v();
		};
		if (!A && !j) return CmnTween.tween(TW_NM_TRANS, e, this.#M, { alpha: 0 }, () => {}, M, () => {}), S.add(O), !1;
		let F = {
			rule: Texture.EMPTY,
			vague: argChk_Num(e, "vague", .04),
			tick: 0
		};
		this.#M.filters = [new Filter(void 0, A ?? x.#O, F)];
		let I = CmnTween.tween(TW_NM_TRANS, e, F, { tick: 1 }, () => {}, M, () => {}, !j);
		return j ? new SpritesMng(j, void 0, (e) => {
			F.rule = e.texture, e.destroy(), S.add(O), I.start();
		}, (e) => {
			e && this.main.resume();
		}).ret : (S.add(O), !1);
	}
	#P(e = "") {
		return e ? e.split(",") : this.#S;
	}
	#F(e, m) {
		let h = this.#P(e.layer);
		for (let e of h) {
			let h = this.#x[e];
			if (!h) throw `存在しないlayer【${e}】です`;
			m(e, h);
		}
		return h;
	}
	#I(e = "") {
		return this.#P(e).sort((e, m) => {
			let h = this.#t.getChildIndex(this.#x[e].fore.ctn), g = this.#t.getChildIndex(this.#x[m].fore.ctn);
			return h < g ? -1 : h > g ? 1 : 0;
		});
	}
	setAllStyle2TxtLay(e) {
		for (let m of this.#S) {
			let h = this.#x[m].fore;
			h instanceof TxtLayer && h.lay({ style: e });
		}
	}
	#L(e) {
		if (argChk_Num(e, "time", NaN) === 0) return !1;
		let h = this.#P(e.layer).map((e) => this.#x[e].fore.ctn), { renderer: _, ticker: v } = this.appPixi;
		this.#j.resize(CmnLib.stageW, CmnLib.stageH);
		let b = () => {
			this.#t.visible = !0;
			for (let e of h) _.render(e, {
				renderTexture: this.#j,
				clear: !1
			});
			this.#t.visible = !1;
		};
		this.#M.visible = !0, this.#M.alpha = 1;
		let x = uint(argChk_Num(e, "hmax", 10)), S = uint(argChk_Num(e, "vmax", 10)), C = x === 0 ? () => {} : () => {
			this.#M.x = Math.round(Math.random() * x * 2) - x;
		}, w = S === 0 ? () => {} : () => {
			this.#M.y = Math.round(Math.random() * S * 2) - S;
		};
		return this.#M.filters = [], CmnTween.tween(TW_NM_TRANS, e, this.#M, {
			x: 0,
			y: 0
		}, () => {
			C(), w();
		}, () => {
			v.remove(b), this.#t.visible = !0, this.#M.visible = !1, this.#M.x = 0, this.#M.y = 0, Reading.notifyEndProc(TW_NM_TRANS);
		}, () => {}), v.add(b), !1;
	}
	#R(e) {
		let { layer: m, render: h, name: g } = e;
		if (!m) throw "layerは必須です";
		let _ = this.#x[this.#Z(e)], y = _.fore, b = () => {};
		h && (this.#f.isSkipping ? y.renderStart(!0) : (y.renderStart(!1), b = () => y.renderEnd()));
		let x = CmnTween.cnvTweenArg(e, y), S = argChk_Boolean(e, "arrive", !1), C = argChk_Boolean(e, "backlay", !1), w = _.back.ctn;
		return CmnTween.tween(g ?? m, e, y, CmnTween.cnvTweenArg(e, y), () => {}, b, () => {
			if (S && Object.assign(y, x), C) for (let e of CmnTween.aLayerPrpNm) w[e] = y[e];
		}), "filter" in e && (y.ctn.filters = [Layer.bldFilters(e)], y.aFltHArg = [e]), !1;
	}
	#z(e) {
		return this.#F(e, (m) => {
			let h = this.#x[this.#Z({ layer: m })];
			if (e.page === "both") {
				this.#B(h.fore, e), this.#B(h.back, e);
				return;
			}
			let g = h.getPage(e);
			this.#B(g, e);
		}), !1;
	}
	#B(e, m) {
		let h = e.ctn;
		h.filters ??= [], h.filters = [...h.filters, Layer.bldFilters(m)], e.aFltHArg.push(m);
	}
	#V(e) {
		return this.#F(e, (m) => {
			let h = this.#x[this.#Z({ layer: m })];
			if (e.page === "both") {
				let e = h.fore, m = h.back;
				e.ctn.filters = null, m.ctn.filters = null, e.aFltHArg = [], m.aFltHArg = [];
				return;
			}
			let g = h.getPage(e);
			g.ctn.filters = null, g.aFltHArg = [];
		}), !1;
	}
	#H(e) {
		return this.#F(e, (m) => {
			let h = this.#x[this.#Z({ layer: m })];
			if (e.page === "both") {
				this.#U(h.fore, e), this.#U(h.back, e);
				return;
			}
			let g = h.getPage(e);
			this.#U(g, e);
		}), !1;
	}
	#U(e, h) {
		let _ = e.ctn;
		if (!_.filters) throw "フィルターがありません";
		let y = uint(argChk_Num(h, "index", 0)), b = _.filters.length;
		if (b <= y) throw `フィルターの個数（${String(b)}）を越えています`;
		e.aFltHArg[y].enabled = _.filters[y].enabled = argChk_Boolean(h, "enabled", !0);
	}
	#W(e) {
		let { text: m } = e;
		if (!m) throw "textは必須です";
		let h = this.#G(e);
		delete e.text, this.setNormalChWait(), this.#f.isSkipping ? e.wait = 0 : "wait" in e && argChk_Num(e, "wait", NaN), this.#m("add｜" + cnvSArg(e), h);
		let _ = argChk_Boolean(e, "record", !0), y = this.val.doRecLog();
		return _ || this.val.setVal_Nochk("save", "sn.doRecLog", _), h.tagCh(m.replaceAll("[r]", "\n")), this.val.setVal_Nochk("save", "sn.doRecLog", y), this.#m("add_close｜", h), !1;
	}
	#G = (e) => {
		throw this.#X(), 0;
	};
	#K(e) {
		let m = this.#Z(e, this.#C), h = this.#x[m].getPage(e);
		if (!(h instanceof TxtLayer)) throw m + "はTxtLayerではありません";
		return h;
	}
	setNormalChWait() {
		TxtLayer.msecChWait = this.scrItr.normalWait;
	}
	#q = (e) => {
		throw this.#X(), 0;
	};
	#J(e) {
		let { layer: m } = e;
		if (!m) throw "[current] layerは必須です";
		let h = this.#x[m];
		if (!h || !(h.getPage(e) instanceof TxtLayer)) throw `${m}はTxtLayerではありません`;
		this.#Y = h, this.#a.pagebreak(), this.#C = m, this.val.setVal_Nochk("save", "const.sn.mesLayer", m);
		for (let e of this.#S) {
			let { fore: h, back: g } = this.#x[e];
			h instanceof TxtLayer && (h.isCur = g.isCur = e === m);
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
	#Z(e, m = "") {
		let h = e.layer ?? m;
		if (h.includes(",")) throw "layer名に「,」は使えません";
		if (!(h in this.#x)) throw "属性 layer【" + h + "】が不正です。レイヤーがありません";
		return e.layer = h, h;
	}
	recPagebreak() {
		this.#a.pagebreak();
	}
	#Q(e) {
		let m = this.#G(e);
		return e.layer === this.#C && e.page === "fore" && this.#a.pagebreak(), m.clearText(), !1;
	}
	#$(e) {
		return this.#m("endlink｜", this.#G(e)), !1;
	}
	#ee(e) {
		return argChk_Boolean(e, "rec_page_break", !0) && this.#a.pagebreak(), this.#Y && (this.#Y.fore.clearLay(e), this.#Y.back.clearLay(e)), !1;
	}
	#te(e) {
		if (!e.pic) throw "[graph] picは必須です";
		return this.#m("grp｜" + cnvSArg(e), this.#G(e)), !1;
	}
	#ne(e) {
		if (!e.fn && !e.label && !e.url) throw "fn,label,url いずれかは必須です";
		return e.fn ??= this.scrItr.scriptFn, e.style ??= "background-color: rgba(255,0,0,0.5);", e.style_hover ??= "background-color: rgba(255,0,0,0.9);", e.style_clicked ??= e.style, this.#m("link｜" + cnvSArg(e), this.#G(e)), !1;
	}
	#re(e) {
		return this.#W({
			...e,
			text: "\n"
		});
	}
	#ie(e) {
		let { t: m, r: h } = e;
		if (!m) throw "[ruby2] tは必須です";
		if (!h) throw "[ruby2] rは必須です";
		return e.text = "｜" + encodeURIComponent(m) + "《" + encodeURIComponent(h) + "》", delete e.t, delete e.r, this.#W(e);
	}
	#ae(e) {
		return this.#m("span｜" + cnvSArg(e), this.#G(e)), !1;
	}
	#oe(e) {
		if (!e.t) throw "[tcy] tは必須です";
		return this.#m("tcy｜" + cnvSArg(e), this.#G(e)), !1;
	}
	#se({ layer: e }) {
		console.group("🥟 [dump_lay]");
		for (let m of this.#P(e)) {
			let { fore: e, back: h } = this.#x[m];
			try {
				console.info(`%c${e.name.slice(0, -7)} %o`, `color:#${CmnLib.isDarkMode ? "49F" : "05A"};`, JSON.parse(`{"back":{${h.dump()}}, "fore":{${e.dump()}}}`));
			} catch (m) {
				console.error("dump_lay err:%o", m), console.error(`   back:${h.dump()}`), console.error(`   fore:${e.dump()}`);
			}
		}
		return console.groupEnd(), !1;
	}
	#ce(e) {
		let m = this.#Z(e, this.#C), h = argChk_Boolean(e, "enabled", !0);
		return this.#G(e).enabled = h, this.val.setVal_Nochk("save", "const.sn.layer." + m + ".enabled", h), !1;
	}
	#le(e) {
		return Pages.argChk_page(e, "back"), e.fn ??= this.scrItr.scriptFn, this.#G(e).addButton(e), this.scrItr.recodeDesign(e), !1;
	}
	record() {
		let e = {};
		for (let m of this.#S) {
			let h = this.#x[m];
			e[m] = {
				cls: h.cls,
				fore: h.fore.record(),
				back: h.back.record()
			};
		}
		return e;
	}
	playback(e) {
		this.#a.playback();
		let m = [], h = [];
		for (let [g, { fore: _, fore: { idx: v }, back: y, cls: b }] of Object.entries(e)) {
			h.push({
				ln: g,
				idx: v
			});
			let e = this.#x[g] ??= new Pages(g, b, this.#t, this.#n, {}, this.sys, this.val, { isWait: !1 });
			e.fore.playback(_, m), e.back.playback(y, m);
		}
		let g = this.#t.children.length;
		return m.push(new Promise((e) => {
			for (let { ln: e, idx: m } of h.sort(({ idx: e }, { idx: m }) => e === m ? 0 : e < m ? -1 : 1)) {
				let h = this.#x[e];
				if (!h) continue;
				let _ = g > m ? m : g - 1, { fore: v, back: y } = h;
				this.#t.setChildIndex(v.ctn, _), this.#n.setChildIndex(y.ctn, _);
			}
			e();
		})), m;
	}
};
export { LayerMng };

//# sourceMappingURL=LayerMng.js.map