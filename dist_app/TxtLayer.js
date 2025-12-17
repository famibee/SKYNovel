import { a as RPN_COMP_CHIN, c as argChk_Color, f as initStyle, g as uint, l as argChk_Num, o as addStyle, s as argChk_Boolean, t as CmnLib } from "./CmnLib.js";
import { f as Texture, h as Rectangle, m as Container, o as Sprite, s as Graphics } from "./pixi.js";
import "./EventListenerCtn.js";
import { n as SEARCH_PATH_ARG_EXT } from "./ConfigBase.js";
import { t as DebugMng } from "./DebugMng.js";
import { t as Layer } from "./Layer.js";
import { a as Group, o as Tween, r as CmnTween, t as Reading } from "./Reading.js";
import { t as SpritesMng } from "./SpritesMng.js";
import { Button } from "./Button.js";
import { t as RubySpliter } from "./RubySpliter.js";
var def行頭禁則 = "、。，．）］｝〉」』】〕”〟ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ！？!?‼⁉・ーゝゞヽヾ々", def行末禁則 = "［（｛〈「『【〔“〝", def分割禁止 = "─‥…", defぶら下げ = def行頭禁則, defReg行頭禁則 = /* @__PURE__ */ RegExp(`[${def行頭禁則}]`), defReg行末禁則 = /* @__PURE__ */ RegExp(`[${def行末禁則}]`), defReg分割禁止 = /* @__PURE__ */ RegExp(`[${def分割禁止}]`), defRegぶら下げ = defReg行頭禁則, Hyphenation = class {
	#e = def行頭禁則;
	#t = def行末禁則;
	#n = def分割禁止;
	#r = defぶら下げ;
	get 行頭禁則() {
		return this.#e;
	}
	get 行末禁則() {
		return this.#t;
	}
	get 分割禁止() {
		return this.#n;
	}
	get ぶら下げ() {
		return this.#r;
	}
	#i = defReg行頭禁則;
	#a = defReg行末禁則;
	#o = defReg分割禁止;
	#s = defRegぶら下げ;
	break_fixed = !1;
	break_fixed_left = 0;
	break_fixed_top = 0;
	bura = !1;
	lay(e) {
		e.kinsoku_sol && (this.#e = e.kinsoku_sol, this.#i = /* @__PURE__ */ RegExp(`[${this.#e}]`)), e.kinsoku_eol && (this.#t = e.kinsoku_eol, this.#c(), this.#a = /* @__PURE__ */ RegExp(`[${this.#t}]`)), e.kinsoku_dns && (this.#n = e.kinsoku_dns, this.#l(), this.#o = /* @__PURE__ */ RegExp(`[${this.#n}]`)), e.kinsoku_bura && (this.#r = e.kinsoku_bura, this.#c(), this.#l(), this.#s = /* @__PURE__ */ RegExp(`[${this.#r}]`)), "bura" in e && (this.bura = argChk_Boolean(e, "bura", !1)), this.break_fixed = argChk_Boolean(e, "break_fixed", this.break_fixed), this.break_fixed_left = argChk_Num(e, "break_fixed_left", this.break_fixed_left), this.break_fixed_top = argChk_Num(e, "break_fixed_top", this.break_fixed_top);
	}
	#c() {
		let e = this.#t.length, p = this.#r.length;
		if (e < p) for (let p = 0; p < e; ++p) {
			let e = this.#t[p];
			if (this.#r.includes(e)) throw `禁則の競合があります。文字 ${String(e)} がぶら下げ と 行末禁則 の両方に含まれます`;
		}
		else for (let e = 0; e < p; ++e) {
			let p = this.#r[e];
			if (this.#t.includes(p)) throw `禁則の競合があります。文字 ${String(p)} がぶら下げ と 行末禁則 の両方に含まれます`;
		}
	}
	#l() {
		let e = this.#n.length, p = this.#r.length;
		if (e < p) for (let p = 0; p < e; ++p) {
			let e = this.#n[p];
			if (this.#r.includes(e)) throw `禁則の競合があります。文字 ${String(e)} がぶら下げ と 分割禁止 の両方に含まれます`;
		}
		else for (let e = 0; e < p; ++e) {
			let p = this.#r[e];
			if (this.#n.includes(p)) throw `禁則の競合があります。文字 ${String(p)} がぶら下げ と 分割禁止 の両方に含まれます`;
		}
	}
	reNew(e) {
		e.#u(this.#e, this.#t, this.#n, this.#r), e.break_fixed = this.break_fixed, e.break_fixed_left = this.break_fixed_left, e.break_fixed_top = this.break_fixed_top, e.bura = this.bura;
	}
	#u(e, p, m, h) {
		this.#e !== e && (this.#e = e, this.#i = /* @__PURE__ */ RegExp(`[${e}]`)), this.#t !== p && (this.#t = p, this.#a = /* @__PURE__ */ RegExp(`[${p}]`)), this.#n !== m && (this.#n = m, this.#o = /* @__PURE__ */ RegExp(`[${m}]`)), this.#r !== h && (this.#r = h, this.#s = /* @__PURE__ */ RegExp(`[${h}]`));
	}
	record() {
		let e = {
			break_fixed: this.break_fixed,
			break_fixed_left: this.break_fixed_left,
			break_fixed_top: this.break_fixed_top,
			bura: this.bura
		};
		return this.#e === def行頭禁則 && (e.行頭禁則 = this.#e), this.#t === def行末禁則 && (e.行末禁則 = this.#t), this.#n === def分割禁止 && (e.分割禁止 = this.#n), this.#r === defぶら下げ && (e.ぶら下げ = this.#r), e;
	}
	playback(e) {
		e && (this.#u(e.行頭禁則 ?? def行頭禁則, e.行末禁則 ?? def行末禁則, e.分割禁止 ?? def分割禁止, e.ぶら下げ ?? defぶら下げ), this.break_fixed = e.break_fixed, this.break_fixed_left = e.break_fixed_left, this.break_fixed_top = e.break_fixed_top, this.bura = e.bura);
	}
	hyph(e, p, m, h, g) {
		let _, v = 0, y = 2, b = (p) => (b = () => !1, h === p ? (h > 0 && (e.innerHTML = g.replaceAll("class=\"sn_ch\"", "class=\"sn_ch sn_ch_in_default\"")), !0) : p < 2);
		do {
			if (_ = this.#f(e, p), v = _.length, b(v)) break;
			let h = -Infinity;
			for (; y < v; ++y) {
				let { elm: e, rect: p, ch: g } = _[y];
				if (e.tagName === "RT") continue;
				let b = m ? p.y : p.x;
				if (h <= b || e.previousElementSibling?.tagName === "SPAN" && e.previousElementSibling?.innerHTML.includes("<br>") || e.parentElement?.previousElementSibling?.tagName === "SPAN" && e.parentElement?.previousElementSibling?.innerHTML.includes("<br>")) {
					h = b, this.break_fixed || (this.break_fixed_left = p.x, this.break_fixed_top = p.y);
					continue;
				}
				let x = this.#d(_, y), { elm: S, rect: C, ch: w } = _[x];
				if (!this.break_fixed) {
					this.break_fixed_left = C.x, this.break_fixed_top = C.y;
					let e = globalThis.getComputedStyle(S), p = parseFloat(e.fontSize);
					m ? this.break_fixed_top += p : this.break_fixed_left += p;
				}
				h = -Infinity;
				let T = y, { cont: E, ins: D } = this.bura ? this.hyph_alg_bura(_, x, w, y) : this.hyph_alg(_, x, w, y, g);
				if (y = D, E) continue;
				let O = _[y].elm, k = O.parentElement, A = document.createElement("br");
				if (k.classList.contains("sn_tx")) k.insertBefore(A, O);
				else {
					let e = k.parentElement;
					e.classList.contains("sn_ch") ? e.parentElement.insertBefore(A, e) : e.insertBefore(A, k);
				}
				y += 2, y < T && (y = T), v = -1;
				break;
			}
		} while (v < 0);
		return [_, v];
	}
	#d(e, p) {
		let m = p - 1, { elm: h } = e[m];
		return h.tagName === "RT" ? m - Array.from(h.textContent).length : m - (h.style.textCombineUpright === "all" ? Array.from(h.textContent).length - 1 : 0);
	}
	#f(e, p) {
		let m = [];
		if (e.nodeType !== e.TEXT_NODE) return Array.from(e.childNodes).map((e) => this.#f(e, p)).flat();
		let h = e.ownerDocument.createRange();
		h.selectNodeContents(e);
		let g = 0, _ = h.endOffset;
		for (; g < _;) {
			h.setStart(e, g), h.setEnd(e, ++g);
			let _ = h.toString();
			m.push({
				ch: _,
				rect: p(h, _),
				elm: h.startContainer.parentElement
			});
		}
		return h.detach(), m;
	}
	hyph_alg(e, p, m, h, g) {
		let _ = h;
		if (!this.#a.test(m)) {
			if (this.#i.test(g)) for (; (_ = this.#d(e, _)) >= 0 && this.#i.test(e[_].ch););
			else if (!(m === g && this.#o.test(m))) return {
				cont: !0,
				ins: _ + 1
			};
		}
		for (_ = p; (_ = this.#d(e, _)) >= 0 && this.#a.test(e[_].ch););
		return {
			cont: !1,
			ins: _ + 1
		};
	}
	hyph_alg_bura(e, p, m, h) {
		let g = this.#d(e, p), { ch: _ } = e[g];
		if (this.#s.test(_) || this.#i.test(_)) {
			let h = p;
			(this.#s.test(m) || this.#i.test(m)) && ++h;
			let g = this.#d(e, h), { ch: _ } = e[g], { ch: v } = e[h];
			if (_ === v && this.#o.test(v)) return {
				cont: !1,
				ins: g
			};
			if (!this.#a.test(_)) return {
				cont: !1,
				ins: h
			};
			h = g;
			do
				if (!this.#a.test(e[h].ch)) break;
			while ((h = this.#d(e, h)) >= 0);
			return {
				cont: !1,
				ins: h + 1
			};
		}
		let v = this.#d(e, g);
		if (h >= 3) {
			let { ch: p } = e[v];
			if (this.#o.test(_) && p === _) return {
				cont: !1,
				ins: v
			};
			if (this.#a.test(p)) {
				let p = v;
				for (; (p = this.#d(e, p)) >= 0 && this.#a.test(e[p].ch););
				return {
					cont: !1,
					ins: p + 1
				};
			}
		}
		return {
			cont: !1,
			ins: g
		};
	}
};
function htm2tx(e, p, m, h, g, _ = !0) {
	let v = {
		escape: (e) => e.replaceAll(/([.*+?^${}()|[\]/\\])/g, "\\$1"),
		mimeType: (e) => {
			let p = w(e).toLowerCase();
			return y()[p] || "";
		},
		dataAsUrl: k,
		isDataUrl: T,
		resolveUrl: D,
		getAndEncode: O,
		asArray: (e) => {
			let p = [], m = e.length;
			for (let h = 0; h < m; ++h) p.push(e[h]);
			return p;
		}
	};
	function y() {
		let e = "application/font-woff", p = "image/jpeg";
		return {
			woff: e,
			woff2: e,
			ttf: "application/font-truetype",
			eot: "application/vnd.ms-fontobject",
			png: "image/png",
			jpg: p,
			jpeg: p,
			gif: "image/gif",
			tiff: "image/tiff",
			svg: "image/svg+xml"
		};
	}
	let x = A(), S = j();
	function C(e) {
		return S.resolveAll().then((p) => {
			let m = document.createElement("style");
			return e.appendChild(m), m.appendChild(document.createTextNode(p)), e;
		});
	}
	function w(e) {
		return /\.([^./]*?)$/g.exec(e)?.[1] ?? "";
	}
	function T(e) {
		return e.search(/^(data:)/) !== -1;
	}
	function D(e, p) {
		let m = document.implementation.createHTMLDocument(), h = m.createElement("base");
		m.head.appendChild(h);
		let g = m.createElement("a");
		return m.body.appendChild(g), h.href = p, g.href = e, g.href;
	}
	function O(e) {
		let p = 3e4;
		return new Promise(function(m) {
			let h = new XMLHttpRequest();
			h.onreadystatechange = g, h.ontimeout = _, h.responseType = "blob", h.timeout = p, h.open("GET", e, !0), h.send();
			function g() {
				if (h.readyState !== 4) return;
				if (h.status !== 200) {
					v("cannot fetch resource: " + e + ", status: " + h.status);
					return;
				}
				let p = new FileReader();
				p.onloadend = function() {
					let e = p.result.toString().split(/,/)[1];
					m(e);
				}, p.readAsDataURL(h.response);
			}
			function _() {
				v("timeout of " + p + "ms occured while fetching resource: " + e);
			}
			function v(e) {
				console.error(e), m("");
			}
		});
	}
	function k(e, p) {
		return "data:" + p + ";base64," + e;
	}
	function A() {
		let e = /url\(['"]?([^'"]+?)['"]?\)/g;
		return {
			inlineAll: g,
			shouldProcess: p
		};
		function p(p) {
			return p.search(e) !== -1;
		}
		function m(p) {
			let m = [], h;
			for (; h = e.exec(p);) m.push(h[1]);
			return m.filter(function(e) {
				return !v.isDataUrl(e);
			});
		}
		function h(e, p, m, h) {
			return Promise.resolve(p).then((e) => m ? v.resolveUrl(e, m) : e).then(h || v.getAndEncode).then((e) => v.dataAsUrl(e, v.mimeType(p))).then((m) => e.replace(g(p), "$1" + m + "$3"));
			function g(e) {
				return RegExp("(url\\(['\"]?)(" + v.escape(e) + ")(['\"]?\\))", "g");
			}
		}
		function g(e, g, _) {
			if (v()) return Promise.resolve(e);
			return Promise.resolve(e).then(m).then((p) => {
				let m = Promise.resolve(e);
				for (let e of p) m = m.then((p) => h(p, e, g, _));
				return m;
			});
			function v() {
				return !p(e);
			}
		}
	}
	function j() {
		return {
			resolveAll: e,
			impl: { readAll: p }
		};
		function e() {
			return p().then((e) => Promise.allSettled(e.map((e) => e.resolve()))).then((e) => e.join("\n"));
		}
		function p() {
			return Promise.resolve(v.asArray(document.styleSheets)).then(p).then(e).then((e) => e.map(m));
			function e(e) {
				return e.filter((e) => e.type === CSSRule.FONT_FACE_RULE).filter((e) => x.shouldProcess(e.style.getPropertyValue("src")));
			}
			function p(e) {
				let p = [];
				for (let m of e) try {
					if (m.href) continue;
					v.asArray(m.cssRules || []).forEach(p.push.bind(p));
				} catch (e) {
					console.error("Error while reading CSS rules from " + m.href, String(e));
				}
				return p;
			}
			function m(e) {
				return {
					resolve: function() {
						let p = (e.parentStyleSheet || {}).href;
						return x.inlineAll(e.cssText, p);
					},
					src() {
						return e.style.getPropertyValue("src");
					}
				};
			}
		}
	}
	Promise.resolve(p).then((e) => {
		let v = e.cloneNode(!0);
		return v.style.padding = "0px", v.style.paddingRight = h + "px", v.style.paddingTop = g + "px", v.style.left = "0px", v.style.top = "0px", v.style.width = m.$width - m.pad_left - m.pad_right + "px", v.style.height = m.$height - m.pad_top - m.pad_bottom + "px", p.hidden = _, v;
	}).then(C).then((e) => {
		e.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
		let p = new Image();
		return p.src = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${String(m.$width)}px" height="${String(m.$height)}px"><foreignObject x="0" y="0" width="100%" height="100%">${new XMLSerializer().serializeToString(e).replaceAll("#", "%23").replaceAll("\n", "%0A")}</foreignObject></svg>`, new Promise((e) => {
			p.onload = () => e(p);
		});
	}).then((e) => new Promise((p) => setTimeout(() => p(e), 100))).then((p) => {
		let h = document.createElement("canvas");
		h.width = m.$width, h.height = m.$height, h.getContext("2d").drawImage(p, 0, 0), e(Texture.from(h));
	}).catch((e) => DebugMng.myTrace(`goTxt() = ${String(e)}`));
}
var TxtStage = class p extends Container {
	static #e;
	static #t;
	static init(e, m) {
		p.#e = e, p.#t = m, CmnTween.addGrp(p.grp);
	}
	static grp = new Group();
	static #n;
	static #r;
	static setEvtMng(e, m) {
		p.#n = e, p.#r = m;
	}
	static destroy() {
		p.grp.removeAll(), p.#T = Object.create(null), p.#D = Object.create(null), p.delBreak();
	}
	#i = document.createElement("span");
	#a = new Container();
	#o = new Graphics();
	static #s = {
		"background-color": 0,
		"border-bottom-width": 0,
		"border-left-width": 0,
		"border-right-width": 0,
		"border-top-width": 0,
		"margin-bottom": 0,
		"margin-left": 0,
		"margin-right": 0,
		"margin-top": 0
	};
	#c = new Hyphenation();
	noticeCompTxt = () => {};
	#l;
	constructor(m, h, g) {
		super(), this.ctn = m, this.canFocus = h, this.sys = g, this.#i.classList.add("sn_tx"), this.#i.style.position = "absolute", p.#t.view.parentElement.appendChild(this.#i), this.addChild(this.#a), this.addChild(this.#o), this.#o.name = "grpDbgMasume";
		let _ = CmnLib.debugLog ? ({ ch: e, rect: { x: p, y: m, width: h, height: g } }) => console.log(`🍌 masume ch:${e} x:${String(p)} y:${String(m)} w:${String(h)} h:${String(g)}`) : () => {};
		this.#l = p.#e.oCfg.debug.masume ? (e) => {
			_(e);
			let { x: p, y: m, width: h, height: g } = e.rect;
			this.#o.beginFill(6737151, .5).lineStyle(2, 16724736, 1).drawRect(p, m, h, g).endFill();
		} : () => {}, this.noticeCompTxt = g.isApp && p.#e.oCfg.debug.dumpHtm ? () => {
			Reading.notifyEndProc(RPN_COMP_CHIN);
			let h = this.#i.innerHTML;
			if (h === "") return;
			let { fn: _, ln: v } = p.#r.nowScrFnLn(), y = `dumpHtm ${m.name.slice(0, -7).replaceAll(":", "=")}(fn=${_} line=${String(v)})`;
			g.outputFile(g.path_downloads + y + ".htm", `<!doctype html><html><head><meta charset=utf-8><title>${y}</title>
<h1>${y}</h1>${h.replaceAll(/ class="sn_ch"|animation-delay: \d+ms; ?| data-add="{&quot;ch_in_style&quot;:&quot;default&quot;, &quot;ch_out_style&quot;:&quot;default&quot;}"/g, "").replaceAll(" style=\"\"", "").replaceAll(/(<\/?ruby>)/g, "\n$1\n").replaceAll(/<(br|\/span)>/g, "<$1>\n")}`);
		} : () => Reading.notifyEndProc(RPN_COMP_CHIN);
	}
	#u = {
		fontsize: 24,
		$width: 0,
		$height: 0,
		pad_left: 0,
		pad_right: 0,
		pad_top: 0,
		pad_bottom: 0
	};
	lay(e) {
		let m = this.#i.style;
		if ("style" in e) if (e.style) {
			let h = document.createElement("span");
			h.style.cssText = e.style;
			let g = h.style.length;
			for (let e = 0; e < g; ++e) {
				let g = h.style[e];
				if (g in p.#s) {
					DebugMng.myTrace(`${String(g)}は指定できません`, "W");
					continue;
				}
				m[g] = h.style[g];
			}
			!h.style.opacity && "alpha" in e && (m.opacity = String(this.ctn.alpha));
		} else this.#i.style.cssText = "";
		else "alpha" in e && (m.opacity = String(this.ctn.alpha));
		if ("width" in e && (m.width = String(e.width ?? "0") + "px"), "height" in e && (m.height = String(e.height ?? "0") + "px"), "pl" in e && (m.paddingLeft = String(e.pl ?? "0") + "px"), "pr" in e && (m.paddingRight = String(e.pr ?? "0") + "px"), "pt" in e && (m.paddingTop = String(e.pt ?? "0") + "px"), "pb" in e && (m.paddingBottom = String(e.pb ?? "0") + "px"), this.#c.lay(e), this.#f(), this.#p = this.ctn.position.x, m.transformOrigin = `${String(this.ctn.pivot.x)}px ${String(this.ctn.pivot.y)}px`, this.cvsResize(), m.display = this.ctn.visible ? "inline" : "none", ":redraw" in e && this.#y > 0) {
			let e = [this.#i.innerHTML.replaceAll(/(animation-delay: )\d+ms/g, "$10ms"), "<span class='sn_ch' data-add='{\"ch_in_style\":\"default\"}'>&emsp;</span>"];
			this.#N(), this.goTxt(e, !0);
		}
	}
	#d = 0;
	#f() {
		let e = this.#i.style, p = parseFloat(e.fontSize || "0");
		this.#u.fontsize = p, this.#u.pad_left = parseFloat(e.paddingLeft || "0"), this.#u.pad_right = parseFloat(e.paddingRight || "0"), this.#u.pad_top = parseFloat(e.paddingTop || "0"), this.#u.pad_bottom = parseFloat(e.paddingBottom || "0"), this.#u.$width = parseFloat(e.width || "0"), this.#u.$height = parseFloat(e.height || "0"), this.position.set(this.#u.pad_left, this.#u.pad_top), this.#m = e.writingMode === "vertical-rl", this.#h = 0, this.#g = 0;
		let m = e.lineHeight ?? "0";
		this.#d = this.#m ? 0 : (m.endsWith("px") ? parseFloat(m) : p * parseFloat(m) - p) / 2;
	}
	cvsResize() {
		let e = this.#i.style, p = this.sys.cvsScale;
		e.left = `${String(this.sys.ofsLeft4elm + this.#p * p)}px`, e.top = `${String(this.sys.ofsTop4elm + this.ctn.position.y * p)}px`, e.transform = `rotate(${String(this.ctn.angle)}deg) scale(${String(this.ctn.scale.x * p)}, ${String(this.ctn.scale.y * p)})`;
	}
	#p = 0;
	#m = !1;
	get tategaki() {
		return this.#m;
	}
	#h = 0;
	#g = 0;
	get infTL() {
		return this.#u;
	}
	get getWidth() {
		return this.#u.$width;
	}
	get getHeight() {
		return this.#u.$height;
	}
	setMySize(e, p) {
		this.#u.$width = e, this.#u.$height = p, this.#i.style.width = String(this.#u.$width) + "px", this.#i.style.height = String(this.#u.$height) + "px";
	}
	#_ = [];
	goTxt(e, p) {
		let m = () => this.#x(e, p);
		this.#_.push(m) === 1 && m();
	}
	#v = [];
	#y = 0;
	static #b = "<span class='sn_ch sn_ch_last'>&emsp;</span>";
	#x(e, m) {
		p.#O.visible = !1;
		let h = this.#v.length, g = "";
		if (h === 0) {
			if (p.#e.oCfg.debug.masume && (CmnLib.debugLog && console.log(`🍌 masume ${this.name} v:${String(this.visible)} l:${String(this.x)} t:${String(this.y)} a:${String(this.alpha)} pl:${String(this.#u.pad_left)} pr:${String(this.#u.pad_right)} pt:${String(this.#u.pad_top)} pb:${String(this.#u.pad_bottom)} w:${String(this.#u.$width)} h:${String(this.#u.$height)}`), this.#o.clear().beginFill(3407616, .2).lineStyle(1, 3407616, 1).drawRect(-this.#u.pad_left, -this.#u.pad_top, this.#u.$width, this.#u.$height).endFill().beginFill(13311, .2).lineStyle(2, 13311, 1).drawRect(0, 0, this.#u.$width - this.#u.pad_left - this.#u.pad_right, this.#u.$height - this.#u.pad_top - this.#u.pad_bottom).endFill()), this.#i.innerHTML = [...e].join("").replaceAll(/[\n\t]/g, "") + p.#b, !this.#c.break_fixed) {
				let e = globalThis.getComputedStyle(this.#i), p = parseFloat(e.fontSize);
				this.#m ? (this.#c.break_fixed_left = (this.#u.$width - this.#u.pad_left - this.#u.pad_right - p * 1.5) * this.sys.cvsScale, this.#c.break_fixed_top = 0) : (this.#c.break_fixed_left = 0, this.#c.break_fixed_top = p / 2 * this.sys.cvsScale);
			}
		} else g = this.#i.innerHTML, --h, this.#i.getElementsByClassName("sn_ch_last").item(0)?.remove(), this.#i.querySelectorAll(":scope > br").forEach((e) => e.remove()), this.#i.insertAdjacentHTML("beforeend", e.slice(this.#y).join("").replaceAll(/[\n\t]/g, "") + p.#b);
		this.#i.querySelectorAll(".sn_ch:has(> ruby)").forEach((e) => {
			e.style.background = "";
		}), this.#y = e.length;
		let _ = this.sys.cvsScale, b = this.#i.getBoundingClientRect(), w = b.left + this.#u.pad_left, T = b.top + this.#u.pad_top, E;
		if (_ === 1) E = (e, p) => {
			let m = e.getBoundingClientRect();
			return new Rectangle(m.left - w, m.top - T, m.width, m.height + ("gjqy".includes(p) ? this.#d : 0));
		};
		else {
			let e = this.sys.ofsPadLeft_Dom2PIXI + b.left * (1 - _), p = this.sys.ofsPadTop_Dom2PIXI + b.top * (1 - _);
			E = (m, h) => {
				let g = m.getBoundingClientRect();
				return new Rectangle((g.left - e) / _ - w, (g.top - p) / _ - T, g.width / _, (g.height + ("gjqy".includes(h) ? this.#d : 0)) / _);
			};
		}
		let [D, O] = this.#c.hyph(this.#i, E, this.#m, h, g);
		this.#v = D;
		let k = CmnTween.ease(this.#A);
		for (let e = h; e < O; ++e) {
			let m = this.#v[e], { elm: { dataset: h, parentElement: g }, rect: _ } = m, y = JSON.parse(h.arg ?? "{\"delay\": 0}"), b = JSON.parse(h.add ?? "{}"), x = p.#T[b.ch_in_style];
			if (this.#l(m), h.cmd === "grp") {
				let e = new Container();
				this.#a.addChild(e), new SpritesMng(y.pic, e, (p) => {
					this.#C(e, y, b, _, k, x ?? {}), e.parent || e.removeChild(p);
				});
			}
			if (h.lnk) {
				let m = g.closest("[data-arg]"), h = JSON.parse(m.dataset.arg ?? "{}");
				h.key = `lnk=[${String(e)}] ` + this.name;
				let y = new Sprite();
				this.#C(y, h, b, _, k, x ?? {});
				let S = h.style ?? "", w = S + (h.style_hover ?? ""), T = S + (h.style_clicked ?? ""), E = h.r_style ?? "", D = E + (h.r_style_hover ?? ""), O = E + (h.r_style_clicked ?? ""), A = Array.from(m.getElementsByTagName("rt"));
				for (let e of A) e.dataset.st_r_bk = e.style.cssText;
				let j = m.style.cssText, M = (e, p) => {
					m.style.cssText = j + e;
					for (let e of A) e.style.cssText = e.dataset.st_r_bk + p;
				};
				argChk_Boolean(h, "enabled", !0) ? p.#n.button(h, y, () => M(S, E), () => this.canFocus() ? (M(w, D), !0) : !1, () => M(T, O)) : M(S + (h.style_disable ?? "color: gray;"), E + (h.r_style_disable ?? "color: gray;")), this.#a.addChild(y);
			}
		}
		let j = Array.from(this.#i.getElementsByClassName("sn_ch_yet"));
		this.#S = () => {
			this.#S = () => !1;
			for (let e of j) e.className = "sn_ch";
			p.#O.position.set(this.#c.break_fixed_left, this.#c.break_fixed_top), p.#O.visible = !0, this.noticeCompTxt();
			let e = this.#_.shift();
			return this.#_.length > 0 && e(), !0;
		};
		for (let e of j) e.className = e.className.replace("sn_ch_yet sn", "go");
		h > 0 && ++h;
		let N;
		for (let e = O - 2; e >= 0; --e) {
			let { elm: p } = this.#v[e];
			if (p.tagName === "SPAN") {
				N = p.parentElement?.tagName === "RUBY" ? p.parentElement.parentElement ?? p : p;
				break;
			}
		}
		if (!N || m || h === O) {
			this.#S();
			return;
		}
		let P = () => {
			N.removeEventListener("animationend", P), this.#S();
		};
		N.addEventListener("animationend", P, {
			once: !0,
			signal: this.#M.signal
		});
	}
	#S = () => !1;
	#C(e, m, h, g, _, v) {
		e.alpha = 0, m.x && (g.x = m.x.startsWith("=") ? g.x + parseInt(m.x.slice(1)) : parseInt(m.x)), m.y && (g.y = m.y.startsWith("=") ? g.y + parseInt(m.y.slice(1)) : parseInt(m.y)), m.width && (g.width = parseInt(m.width)), m.height && (g.height = parseInt(m.height)), m.wait && (v.wait = m.wait), e.width = g.width, e.height = g.height, v.x ? e.position.set(v.x.startsWith("=") ? g.x + e.width * v.nx : v.nx, v.y.startsWith("=") ? g.y + e.height * v.ny : v.ny) : e.position.set(g.x, g.y);
		let y = new Tween(e).to({
			alpha: 1,
			x: g.x,
			y: g.y,
			width: g.width,
			height: g.height,
			angle: 0
		}, v.wait ?? 0).easing(_).delay((h.wait ?? 0) + (m.delay ?? 0)).onComplete(() => {
			b.tw = void 0;
		}).start();
		p.grp.add(y);
		let b = {
			sp: e,
			tw: y
		};
		this.#w.push(b);
	}
	#w = [];
	skipChIn() {
		let e = this.#S();
		for (let p of this.#w) p.tw && (p.tw.stop().end(), e = !0);
		return this.#w = [], e;
	}
	static #T = Object.create(null);
	static #E = /[{\s.,*{]/;
	static initChStyle() {
		p.#T = Object.create(null), p.#D = Object.create(null);
	}
	static getChInStyle(e) {
		return p.#T[e];
	}
	static ch_in_style(e) {
		let { name: m } = e;
		if (!m) throw "nameは必須です";
		if (p.#E.test(m)) throw `name【${m}】に使えない文字が含まれます`;
		if (m in p.#T) throw `name【${m}】はすでにあります`;
		let h = String(e.x ?? "=0"), _ = String(e.y ?? "=0");
		return p.#T[m] = {
			wait: argChk_Num(e, "wait", 500),
			alpha: argChk_Num(e, "alpha", 0),
			x: h,
			y: _,
			nx: parseFloat(h.at(0) === "=" ? h.slice(1) : h),
			ny: parseFloat(_.at(0) === "=" ? _.slice(1) : _),
			scale_x: argChk_Num(e, "scale_x", 1),
			scale_y: argChk_Num(e, "scale_y", 1),
			rotate: argChk_Num(e, "rotate", 0),
			join: argChk_Boolean(e, "join", !0),
			ease: e.ease ?? "ease-out"
		};
	}
	static #D = Object.create(null);
	static getChOutStyle(e) {
		return p.#D[e];
	}
	static ch_out_style(e) {
		let { name: m } = e;
		if (!m) throw "nameは必須です";
		if (p.#E.test(m)) throw `name【${m}】に使えない文字が含まれます`;
		if (m in p.#D) throw `name【${m}】はすでにあります`;
		let h = String(e.x ?? "=0"), _ = String(e.y ?? "=0");
		return p.#D[m] = {
			wait: argChk_Num(e, "wait", 500),
			alpha: argChk_Num(e, "alpha", 0),
			x: h,
			y: _,
			nx: parseFloat(h.at(0) === "=" ? h.slice(1) : h),
			ny: parseFloat(_.at(0) === "=" ? _.slice(1) : _),
			scale_x: argChk_Num(e, "scale_x", 1),
			scale_y: argChk_Num(e, "scale_y", 1),
			rotate: argChk_Num(e, "rotate", 0),
			join: argChk_Boolean(e, "join", !1),
			ease: e.ease ?? "ease-out"
		};
	}
	static #O = new Container();
	static #k = new SpritesMng();
	dispBreak(e) {
		p.delBreak();
		let m = p.#O;
		m.visible = !1, this.addChild(m), p.#k.destroy(), p.#k = new SpritesMng(e.pic, m, (p) => {
			m.parent ? (p.x = argChk_Num(e, "x", 0), p.y = argChk_Num(e, "y", 0), p.width = argChk_Num(e, "width", this.#u.fontsize), p.height = argChk_Num(e, "height", this.#u.fontsize)) : m.removeChild(p);
		});
	}
	static delBreak() {
		let e = p.#O;
		e.parent?.removeChild(e), p.#k.destroy();
	}
	#A = "Quadratic.Out";
	#j = "Quadratic.Out";
	#M = new AbortController();
	#N() {
		this.#o.clear(), this.#v = [], this.#y = 0, this.#_ = [], this.#M.abort(), this.#M = new AbortController(), this.skipChIn();
		let e = document.createElement("span");
		e.style.cssText = this.#i.style.cssText, e.classList.value = this.#i.classList.value;
		let m = this.#i, h = Array.from(m.getElementsByClassName("sn_ch"));
		m.parentElement.insertBefore(e, m);
		let g = 0;
		h.forEach((e) => {
			let m = JSON.parse(e.dataset.add ?? e.children[0]?.getAttribute("data-add") ?? e.children[0]?.children[0]?.getAttribute("data-add") ?? "{}");
			if (!m.ch_out_style) return;
			let h = p.#D[m.ch_out_style];
			if (h) {
				if (h.wait === 0) {
					e.style.display = "none";
					return;
				}
				g += h.wait, h.join || (e.style.animationDelay = "0ms"), e.classList.add(`go_ch_out_${String(m.ch_out_style)}`);
			}
		});
		let _ = () => {
			m.parentElement.removeChild(m);
			for (let e of this.#a.removeChildren()) e instanceof Container && p.#n.unButton(e), e.destroy();
		};
		if (g === 0) this.#i.textContent = "", this.#i = document.createElement("span"), _();
		else {
			let e = m.lastElementChild;
			if (e) {
				let p = () => {
					e.removeEventListener("animationend", p), _();
				};
				e.addEventListener("animationend", p, {
					once: !0,
					signal: this.#M.signal
				});
			} else _();
		}
		this.#i = e;
	}
	reNew() {
		this.#N();
		let e = new p(this.ctn, this.canFocus, this.sys);
		return e.#u = this.#u, e.#i.style.cssText = this.#i.style.cssText, e.#p = this.#p, e.name = this.name, e.#f(), e.#P = this.#P, e.#A = this.#A, e.#j = this.#j, this.#c.reNew(e.#c), this.destroy(), e;
	}
	#P = void 0;
	record() {
		return {
			infTL: this.#u,
			cssText: this.#i.style.cssText,
			left: this.#p,
			ch_filter: this.#P,
			fi_easing: this.#A,
			fo_easing: this.#j,
			hyph: this.#c.record()
		};
	}
	playback(e) {
		this.#u = e.infTL, this.position.set(this.#u.pad_left, this.#u.pad_top), this.#i.style.cssText = e.cssText, this.#p = e.left, this.#f(), this.#P = e.ch_filter, this.#A = e.fi_easing, this.#j = e.fo_easing, this.#c.playback(e.hyph);
	}
	get cssText() {
		return this.#i.style.cssText;
	}
	set cssText(e) {
		this.#i.style.cssText = e;
	}
	#F = void 0;
	snapshot(e, p) {
		htm2tx((m) => {
			this.#F = Sprite.from(m), this.#m && (this.#F.x += CmnLib.stageW - (this.#p + this.#u.$width)), this.#F.y -= this.#g, this.#F.texture.frame = new Rectangle(0, 0, Math.min(this.#F.width, this.#u.$width - this.#p), Math.min(this.#F.height, this.#u.$height)), this.#a.addChild(this.#F), e.render(this.#F, { clear: !1 }), p();
		}, this.#i, this.#u, this.#h, this.#g, !1);
	}
	snapshot_end() {
		this.#F &&= (this.#a.removeChild(this.#F), void 0);
	}
	makeDesignCast(e) {}
	showDesignCast() {}
	dump() {
		let e = [], p = this.#i.style, m = p.length;
		for (let h = 0; h < m; ++h) {
			let m = p[h];
			e.push(`"${String(m)}":"${p[m].replaceAll(/(["\\])/g, "\\$1")}"`);
		}
		return `"txt":"${this.#i.textContent.replaceAll(/(["\\])/g, "\\$1")}", "style":{${e.join(",")}}`;
	}
	destroy() {
		p.delBreak(), this.#i.parentElement.removeChild(this.#i), this.#i = document.createElement("span"), this.removeChild(this.#a), this.removeChild(this.#o), this.#o.clear(), this.#l = () => {}, this.#_ = [], this.#v = [], this.#y = 0, this.#w = [], this.#M.abort(), this.#P = void 0, super.destroy();
	}
}, TxtLayer = class e extends Layer {
	static #e;
	static #t;
	static #n;
	static #r;
	static init(e, p, h, g, v, y) {
		this.#e = e, TxtStage.init(e, y), this.#t = h, this.#r = g, this.#n = v, h.setDoRecProc((e) => this.chgDoRec(e)), p.autowc = (e) => this.#d(e), p.autowc({
			enabled: !1,
			text: "",
			time: 0
		}), p.ch_in_style = (e) => this.#i(e), p.ch_out_style = (e) => this.#a(e), TxtStage.initChStyle(), initStyle(), addStyle(e.matchPath(".+", SEARCH_PATH_ARG_EXT.FONT).flatMap((e) => Object.values(e).map((e) => `
@font-face {
	font-family: '${String(e)}';
	src: url('${this.#e.searchPath(String(e), SEARCH_PATH_ARG_EXT.FONT)}');
}
`)).join("") + "\n.sn_tx {\n	pointer-events: none;\n	user-select: none;\n	-webkit-touch-callout: none;\n	box-sizing: border-box;\n}\n.sn_ch {\n	position: relative;\n	display: inline-block;\n}\n"), this.#i({
			name: "default",
			wait: 500,
			alpha: 0,
			x: "=0.3",
			y: "=0",
			scale_x: 1,
			scale_y: 1,
			rotate: 0,
			join: !0,
			ease: "ease-out"
		}), this.#a({
			name: "default",
			wait: 0,
			alpha: 0,
			x: "=0",
			y: "=0",
			scale_x: 1,
			scale_y: 1,
			rotate: 0,
			join: !1,
			ease: "ease-out"
		});
	}
	static #i(e) {
		let { x: p, y: m, nx: h, ny: g, alpha: v, wait: y, ease: b, rotate: x, scale_x: S, scale_y: C } = TxtStage.ch_in_style(e), w = p.startsWith("=") ? `${String(h * 100)}%` : `${String(h)}px`, T = m.startsWith("=") ? `${String(g * 100)}%` : `${String(g)}px`, { name: E = "" } = e;
		return addStyle(`
.sn_ch_in_${E} {
	position: relative;
	display: inline-block;
}
.go_ch_in_${E} {
	opacity: ${String(v)};
	position: relative;
	display: inline-block;
	animation: sn_ch_in_${E} ${String(y)}ms ${b} 0s both;
}
@keyframes sn_ch_in_${E} {
	from {transform: rotate(${String(x)}deg) scale(${String(S)}, ${String(C)}) translate(${w}, ${T})}
	to {opacity: 1; transform: none;}
}
`), !1;
	}
	static #a(e) {
		let { x: p, y: m, nx: h, ny: g, alpha: v, wait: y, ease: b, rotate: x, scale_x: S, scale_y: C } = TxtStage.ch_out_style(e), w = p.startsWith("=") ? `${String(h * 100)}%` : `${String(h)}px`, T = m.startsWith("=") ? `${String(g * 100)}%` : `${String(g)}px`, { name: E = "" } = e;
		return addStyle(`
.go_ch_out_${E} {
	position: relative;
	display: inline-block;
	animation: go_ch_out_${E} ${String(y)}ms ${b} 0s both;
}
@keyframes go_ch_out_${E} {
	to {
		opacity: ${String(v)};
		transform: rotate(${String(x)}deg) scale(${String(S)}, ${String(C)}) translate(${w}, ${T});
	}
`), !1;
	}
	static #o = 10;
	static set msecChWait(p) {
		e.#o = p;
	}
	static get msecChWait() {
		return e.#o;
	}
	static #s;
	static #c;
	static setEvtMng(e, p, m) {
		this.#s = e, this.#c = p, TxtStage.setEvtMng(e, m);
	}
	static #l = !1;
	static #u = {};
	static #d(e) {
		this.#l = argChk_Boolean(e, "enabled", this.#l), this.#t.setVal_Nochk("save", "const.sn.autowc.enabled", this.#l);
		let { text: p } = e;
		if ("text" in e != "time" in e) throw "[autowc] textとtimeは同時指定必須です";
		if (this.#t.setVal_Nochk("save", "const.sn.autowc.text", p), !p) return this.#t.setVal_Nochk("save", "const.sn.autowc.time", ""), !1;
		let m = p.length;
		if (this.#l && m === 0) throw "[autowc] enabled === false かつ text === \"\" は許されません";
		let g = String(e.time).split(",");
		if (g.length !== m) throw "[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい";
		this.#u = {};
		for (let e = 0; e < m; ++e) this.#u[p[e]] = uint(g[e]);
		return this.#t.setVal_Nochk("save", "const.sn.autowc.time", e.time), !1;
	}
	#f = 0;
	#p = 0;
	#m = !1;
	#h = void 0;
	#g = "";
	#_ = new TxtStage(this.ctn, () => this.canFocus(), e.#c);
	#v = new RubySpliter();
	#y = document.createElement("span");
	static #b = {
		"text-align": 0,
		"text-align-last": 0,
		height: 0,
		width: 0,
		"padding-left": 0,
		"padding-right": 0,
		"padding-top": 0,
		"padding-bottom": 0
	};
	#x = new Container();
	constructor() {
		super(), this.ctn.addChild(this.#_), this.#v.init(this.#B), this.ctn.addChild(this.#x), this.#x.name = "cntBtn", this.lay({
			style: `width: ${String(CmnLib.stageW)}px; height: ${String(CmnLib.stageH)}px; font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif; color: white; font-size: 24px; line-height: 1.5; padding: 16px;`,
			in_style: "default",
			out_style: "default",
			back_clear: "true"
		});
	}
	destroy() {
		this.#h &&= (this.ctn.removeChild(this.#h).destroy(), void 0), e.#r.pagebreak(), this.#_.destroy();
	}
	static destroy() {
		this.#l = !1, this.#u = {}, this.#P = (e) => e;
	}
	set name(e) {
		this.name_ = e, this.#_.name = e;
	}
	get name() {
		return this.name_;
	}
	cvsResize() {
		this.#_.cvsResize();
	}
	cvsResizeChildren() {
		for (let e of this.#x.children) e.cvsResize();
	}
	procSetX(e) {
		this.#_.lay({ x: e });
	}
	procSetY(e) {
		this.#_.lay({ y: e });
	}
	lay(p) {
		if (super.lay(p), Layer.setXY(this.ctn, p, this.ctn), p[":id_tag"] = this.name_.slice(0, -7), RubySpliter.setting(p), this.#k(p), this.#_.lay(p), "r_align" in p && (this.#L = p.r_align ?? ""), this.#F = CmnLib.isSafari ? this.#_.tategaki ? (e, p) => `text-align: start; height: ${String(p)}em; padding-top: ${e}; padding-bottom: ${e};` : (e, p) => `text-align: start; width: ${String(p)}em; padding-left: ${e}; padding-right: ${e};` : this.#_.tategaki ? (e) => `text-align: justify; text-align-last: justify; padding-top: ${e}; padding-bottom: ${e};` : (e) => `text-align: justify; text-align-last: justify; padding-left: ${e}; padding-right: ${e};`, CmnLib.isFirefox && (this.#I = this.#R), "r_style" in p) if (p.r_style) {
			let m = document.createElement("span");
			m.style.cssText = p.r_style;
			let h = m.style.length, g = this.#y.style;
			for (let p = 0; p < h; ++p) {
				let h = m.style[p];
				if (h in e.#b) {
					DebugMng.myTrace(`${String(h)}は指定できません`, "W");
					continue;
				}
				let _ = m.style[h];
				_ && (g[h] = _);
			}
		} else this.#y.style.cssText = "";
		if ("alpha" in p) for (let e of this.#x.children) e.alpha = this.ctn.alpha;
		this.#S(p), this.#T(p);
		let m = Reading.procID + `TxtLayer lay name:${this.name_}`, h = this.#O(p, (e) => {
			e && Reading.endProc(m);
		});
		return h && Reading.beginProc(m), h;
	}
	#S(e) {
		let { in_style: p } = e;
		if (!p) return;
		let m = TxtStage.getChInStyle(p);
		if (!m) throw `存在しないin_style【${p}】です`;
		this.#C = p, this.#w = m.join;
	}
	#C = "";
	#w = !0;
	get width() {
		return this.#_.getWidth;
	}
	get height() {
		return this.#_.getHeight;
	}
	#T(e) {
		let { out_style: p } = e;
		if (p) {
			if (!TxtStage.getChOutStyle(p)) throw `存在しないout_style【${p}】です`;
			this.#E = p;
		}
	}
	#E = "";
	#D = new SpritesMng();
	#O(m, h) {
		if ("back_clear" in m) return argChk_Boolean(m, "back_clear", !1) && (this.#f = 0, this.#p = 0, this.#m = !1, this.#g = ""), h(!1), !1;
		this.#p = argChk_Num(m, "b_alpha", this.#p), this.#m = argChk_Boolean(m, "b_alpha_isfixed", this.#m);
		let _ = (this.#m ? 1 : Number(e.#t.getVal("sys:TextLayer.Back.Alpha"))) * this.#p;
		if (m.b_pic) {
			if (this.#g !== m.b_pic) return this.#g = m.b_pic, this.#h && (this.ctn.removeChild(this.#h), this.#h.destroy()), this.#D = new SpritesMng(this.#g, this.ctn, (e) => {
				this.#h = e, e.name = "back(pic)", e.visible = _ > 0, e.alpha = _, this.#_.setMySize(e.width, e.height), this.ctn.setChildIndex(e, 0), h(!0);
			}), this.#D.ret;
		} else "b_color" in m && (this.#f = argChk_Color(m, "b_color", 0), this.#h && (this.ctn.removeChild(this.#h), this.#h.destroy()), this.#g = "", this.ctn.addChildAt((this.#h = new Graphics()).beginFill(this.#f, _).lineStyle(void 0).drawRect(0, 0, this.#_.getWidth, this.#_.getHeight).endFill(), 0), this.#h.name = "back(color)");
		return this.#h && (this.#h.visible = _ > 0, this.#h.alpha = _), h(!1), !1;
	}
	chgBackAlpha(e) {
		let p = this.#m ? this.#p : e * this.#p;
		this.#h instanceof Graphics && (this.#h && (this.ctn.removeChild(this.#h), this.#h.destroy()), this.ctn.addChildAt((this.#h = new Graphics()).beginFill(this.#f, p).lineStyle(void 0).drawRect(0, 0, this.#_.getWidth, this.#_.getHeight).endFill(), 0), this.#h.name = "back(color)"), this.#h && (this.#h.visible = p > 0, this.#h.alpha = p);
	}
	#k(e) {
		"noffs" in e && (this.#M = e.noffs ?? "", this.#N = /* @__PURE__ */ RegExp(`[　${this.#M}]`)), "ffs" in e && (this.#A ??= "", this.#j = this.#A === "" ? () => "" : (e) => this.#N.test(e) ? "" : ` font-feature-settings: ${this.#A};`);
	}
	#A = "";
	#j = (e) => "";
	#M = "";
	#N = /[　]/;
	static chgDoRec(e) {
		this.#P = e ? (e) => e : (e) => `<span class='offrec'>${e}</span>`;
	}
	static #P = (e) => e;
	isCur = !1;
	#F = () => "";
	#I = (e, p, m, h = "") => {
		if (!m) return ` style='${h}'`;
		let g = e.length * 2;
		if (g - p.length < 0) return ` style='text-align: ${m}; ${h}'`;
		let _ = "";
		switch (m) {
			case "justify":
				_ = this.#F("0", g);
				break;
			case "121":
				_ = this.#F(`calc(${String((g - p.length) / (p.length * 2))}em)`, g);
				break;
			case "even":
				_ = this.#F(`calc(${String((g - p.length) / (p.length + 1))}em)`, g);
				break;
			case "1ruby":
				_ = this.#F("1em", g);
				break;
			default: _ = `text-align: ${m};`;
		}
		return ` style='${_} ${h}'`;
	};
	#L = "";
	#R(e, p, m, h = "") {
		if (!m) return ` style='${h}'`;
		let g = e.length * 2;
		if (g - p.length < 0) return ` style='text-align: ${m}; ${h}'`;
		let _ = "";
		switch (m) {
			case "left":
				_ = "ruby-align: start;";
				break;
			case "center":
				_ = "ruby-align: center;";
				break;
			case "right":
				_ = "ruby-align: start;";
				break;
			case "justify":
				_ = "ruby-align: space-between;";
				break;
			case "121":
				_ = "ruby-align: space-around;";
				break;
			case "even":
				{
					let e = ` ${String((g - p.length) / (p.length + 1))}em;`;
					_ = "ruby-align: space-between; " + (this.#_.tategaki ? `padding-top:${e} padding-bottom:${e}` : `padding-left:${e} padding-right:${e}`);
				}
				break;
			case "1ruby":
				_ = "ruby-align: space-between; " + (this.#_.tategaki ? "padding-top: 1em; padding-bottom: 1em;" : "padding-left: 1em; padding-right: 1em;");
				break;
			default: _ = `text-align: ${m};`;
		}
		return ` style='${_} ${h}'`;
	}
	tagCh(e) {
		this.#v.putTxt(e);
	}
	#z = !1;
	get needGoTxt() {
		return this.#z;
	}
	#B = (p, m) => {
		let g = m;
		e.#e.oCfg.debug.putCh && console.log(`🖊 文字表示 text:\`${p}\`(${p.charCodeAt(0).toString(16)}) ruby:\`${g}\` name:\`${this.name_}\``);
		let _ = g.split("｜"), v = "", [b, ...x] = _, S = x.join("｜");
		switch (_.length) {
			case 1:
				if (this.#z = !0, p === "\n") {
					this.#W ? (this.#W = !1, v = "<ruby>&emsp;<rt>&emsp;</rt></ruby><br/>") : v = "<br/>";
					break;
				}
				this.#W && (this.#W = !1, g === "" && (g = "&emsp;")), v = this.#V(p, g, this.#L);
				break;
			default:
				switch (b) {
					case "start":
					case "left":
					case "center":
					case "right":
					case "justify":
					case "121":
					case "even":
					case "1ruby":
						this.#W = !1, this.#z = !0, v = this.#V(p, S, b);
						break;
					case "gotxt":
						this.#J(), this.#z ? (this.isCur && e.#r.recText(this.#G.join("").replace(/^<ruby>&emsp;<rt>&emsp;<\/rt><\/ruby>(<br\/>)+/, "").replaceAll(/style='(anim\S+ [^;]+;\s*)+/g, "style='").replaceAll(/( style=''| data-(add|arg|cmd)='[^']+'|\n+|\t+)/g, "").replaceAll(/class='sn_ch[^']+/g, "class='sn_ch").replaceAll("display: none;", "").replaceAll("class='offrec'", "style='display: none;'")), this.#_.goTxt(this.#G, this.#U === 0), this.#z = !1, this.#U = 0) : this.isCur && this.#_.noticeCompTxt();
						return;
					case "add":
						{
							let e = JSON.parse(S), { style: p = "", wait: m = null } = e, { cl: g, sty: _ } = this.#H(!0, m ? uint(m) : null);
							this.#G.push(`<span${g} style='${_} display: inline; ${p}'>`), delete e.style, this.#q(e);
						}
						return;
					case "add_close":
						this.#G.push("</span>"), this.#J();
						return;
					case "grp":
						this.#z = !0;
						{
							let e = JSON.parse(S);
							if (e.id ??= String(this.#G.length), e.id === "break") {
								this.#_.dispBreak(e);
								return;
							}
							this.#W = !1, e.delay = this.#U, e.r ??= "", e.style ??= "", e.r_style ??= "";
							let { r: p, wait: m = null, r_style: g } = e, { cl: _, sty: y, lnk: b } = this.#H(!0, m ? uint(m) : null);
							v = `<span${_} style='${y} ${e.style}'><ruby><span data-cmd='grp' data-arg='${JSON.stringify(e)}'${b} style='${y} display: inline;'>&emsp;</span><rt${b}${this.#I("　", p, this.#L, this.#y.style.cssText + (this.#K.at(-1)?.o.r_style ?? "") + g)}>${e.r}</rt></ruby></span>`;
						}
						break;
					case "tcy":
						this.#W = !1, this.#z = !0;
						{
							let { t: m = "", r: _ = "", wait: b = null, style: x = "", r_style: C = "" } = JSON.parse(S);
							e.#t.doRecLog() && (this.#X += p + (g ? `《${g}》` : ""), this.#Z += m);
							let w = CmnLib.isSafari ? _.replaceAll(/[A-Za-z0-9]/g, (e) => String.fromCharCode(e.charCodeAt(0) + 65248)) : _, { cl: T, sty: E, lnk: D } = this.#H(!0, b ? uint(b) : null);
							v = `<span${T} style='${E}${this.#j(m)} ${x}'><ruby><span${D} style='${E} display: inline; text-combine-upright: all;'>${m}</span><rt${D}${this.#I(m, w, this.#L, this.#y.style.cssText + (this.#K.at(-1)?.o.r_style ?? "") + C)}>${w}</rt></ruby></span>`;
						}
						break;
					case "del":
						TxtStage.delBreak();
						return;
					case "span":
						this.#z = !0, this.#Y(JSON.parse(S));
						return;
					case "link":
						this.#z = !0;
						{
							let e = JSON.parse(S);
							e[":link"] = " data-lnk='@'";
							let { cl: p, sty: m, curpos: g } = this.#H(!1, e.wait ? uint(e.wait) : null);
							this.#G.push(`<span${p} style='${m} display: inline; ${e.style ?? ""}' ${g} data-arg='${S}'>`), delete e.style, this.#Y(e);
						}
						return;
					case "endlink":
						this.#z = !0, this.#G.push("</span>"), this.#J();
						return;
					default: this.#z = !0, v = this.#V(p, g, this.#L);
				}
				break;
		}
		this.#G.push(e.#P(v));
	};
	#V(p, m, h) {
		let g = p === " " ? "&nbsp;" : p === "　" ? "&emsp;" : p;
		e.#t.doRecLog() && (this.#X += g + (m ? `《${m}》` : ""), p !== " " && (this.#Z += p));
		let { cl: _, sty: v, lnk: y } = this.#H(!0, null, p);
		return m ? `<span${_} style='${v} ${this.#j(p)}'><ruby>${Array.from(p).map((e, m) => `<span${_}${y} style='${m > 0 ? this.#H(!0, null, p).sty : v} display: inline;'>${e === " " ? "&nbsp;" : e === "　" ? "&emsp;" : e}</span>`).join("")}<rt${y}${this.#I(p, m, h, this.#y.style.cssText + (this.#K.at(-1)?.o.r_style ?? ""))}>${m}</rt></ruby></span>` : `<span${_} style='${v} ${this.#j(p)}'${y}>${g}</span>`;
	}
	#H(p, m, g = "\n") {
		let _ = this.#w ? m ?? this.#K.at(0)?.o.wait ?? (e.#l ? e.#u[g.at(0) ?? ""] ?? 0 : e.msecChWait) : 0;
		e.#s.isSkipping ? this.#U = 0 : p && this.#w && (this.#U += uint(_));
		let v = `data-add='{"ch_in_style":"${this.#C}", "ch_out_style":"${this.#E}"}'`;
		return {
			cl: ` class='sn_ch sn_ch_yet sn_ch_in_${this.#C}'`,
			sty: `animation-delay: ${String(this.#U)}ms;${this.#K.at(-1)?.o.style ?? ""}`,
			lnk: (this.#K.at(0)?.o[":link"] ?? "") + " " + v,
			curpos: v
		};
	}
	#U = 0;
	#W = !0;
	#G = [];
	#K = [];
	#q(e) {
		this.#K.push({
			o: e,
			r_align: this.#L,
			ch_in_style: this.#C,
			ch_out_style: this.#E
		}), e.r_align && (this.#L = e.r_align), this.#S(e), this.#T(e);
	}
	#J() {
		let e = this.#K.pop();
		e && (this.#L = e.r_align, this.#S({ in_style: e.ch_in_style }), this.#T({ out_style: e.ch_out_style }));
	}
	#Y(e) {
		let p = this.#K.at(-1);
		if (!p) {
			this.#q(e);
			return;
		}
		p.o = {
			...p.o,
			...e
		}, !e.style && !e.r_style && (p.o.style = "", p.o.r_style = ""), e.r_align && (this.#L = e.r_align), this.#S(e), this.#T(e);
	}
	click = () => !this.ctn.interactiveChildren || !this.ctn.visible ? !1 : this.#_.skipChIn();
	clearText() {
		this.ctn.removeChild(this.#_), this.ctn.addChild(this.#_ = this.#_.reNew()), this.#U = 0, this.#W = !0, this.#G = [], this.#X = "", this.#Z = "", e.#r.pagebreak();
	}
	#X = "";
	#Z = "";
	get pageText() {
		return this.#X.replace("《&emsp;》", "");
	}
	get pagePlainText() {
		return this.#Z;
	}
	get enabled() {
		return this.ctn.interactiveChildren;
	}
	set enabled(e) {
		this.ctn.interactiveChildren = e;
	}
	addButton = (p) => new Promise((m) => {
		p.key = `btn=[${String(this.#x.children.length)}] ` + this.name_, p[":id_tag"] = p.key.slice(0, -7), argChk_Boolean(p, "hint_tate", this.#_.tategaki);
		let h = new Button(p, e.#s, () => m(), () => this.canFocus());
		h.name = JSON.stringify(p).replaceAll("\"", "'"), this.#x.addChild(h);
	});
	canFocus() {
		return (this.ctn.interactiveChildren ?? !1) && this.ctn.visible && e.#n(this);
	}
	clearLay(e) {
		super.clearLay(e), this.clearText();
		for (let e of this.#x.removeChildren()) e.destroy();
	}
	record = () => ({
		...super.record(),
		enabled: this.enabled,
		r_cssText: this.#y.style.cssText,
		r_align: this.#L,
		b_do: this.#h === void 0 ? void 0 : this.#h instanceof Sprite ? "Sprite" : "Graphics",
		b_pic: this.#g,
		b_color: this.#f,
		b_alpha: this.#p,
		b_alpha_isfixed: this.#m,
		ffs: this.#A,
		txs: this.#_.record(),
		strNoFFS: this.#M,
		btns: this.#x.children.map((e) => e.name)
	});
	playback(e, p) {
		super.playback(e, p), this.enabled = e.enabled, this.#y.style.cssText = e.r_cssText, this.#L = e.r_align, this.cvsResize(), this.#k(e), this.#_.playback(e.txs), this.#p = e.b_alpha, this.#m = e.b_alpha_isfixed, p.push(new Promise((p) => {
			let m = e.b_do ? e.b_do === "Sprite" ? { b_pic: e.b_pic } : { b_color: e.b_color } : { b_pic: "" };
			m.b_alpha = e.b_alpha, m.b_alpha_isfixed = e.b_alpha_isfixed, this.#O(m, (e) => {
				e && p();
			}) || p();
		}), ...e.btns.map((e) => this.addButton(JSON.parse(e.replaceAll("'", "\"")))).flat());
	}
	get cssText() {
		return this.#_.cssText;
	}
	set cssText(e) {
		this.#_.cssText = e;
	}
	snapshot(e, p) {
		e.render(this.ctn, { clear: !1 }), this.#_.snapshot(e, p);
	}
	snapshot_end() {
		this.#_.snapshot_end();
	}
	makeDesignCast(e) {
		this.ctn.visible && this.#_.makeDesignCast(e);
	}
	makeDesignCastChildren(e) {
		if (this.ctn.visible) for (let p of this.#x.children) p.makeDesignCast(e);
	}
	showDesignCast() {
		this.#_.showDesignCast();
	}
	showDesignCastChildren() {
		for (let e of this.#x.children) e.showDesignCast();
	}
	dump() {
		return this.#B("", "gotxt｜"), super.dump() + `, "enabled":"${String(this.enabled)}", ${this.#_.dump()}, "b_pic":"${this.#g}", "b_color":"${String(this.#f)}", "b_alpha":${String(this.#p)}, "b_alpha_isfixed":"${String(this.#m)}", "width":${String(this.#_.getWidth)}, "height":${String(this.#_.getHeight)}, "pixi_obj":[${this.ctn.children.map((e) => `{"class":"${e instanceof Sprite ? "Sprite" : e instanceof Graphics ? "Graphics" : e instanceof Container ? "Container" : "?"}", "name":"${e.name}", "alpha":${String(e.alpha)}, "x":${String(e.x)}, "y":${String(e.y)}, "visible":"${String(e.visible)}"}`).join(",")}], "button":[${this.#x.children.map((e) => e.children[0]?.name ?? "{}").join(",")}]`;
	}
};
export { TxtLayer, TxtStage as t };

//# sourceMappingURL=TxtLayer.js.map