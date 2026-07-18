import { a as e, c as t, f as n, g as r, l as i, o as a, s as o, t as s } from "./CmnLib.js";
import { f as c, h as l, m as u, o as d, s as f } from "./pixi.js";
import { n as p } from "./ConfigBase.js";
import { t as m } from "./DebugMng.js";
import { t as h } from "./Layer.js";
import { a as g, o as _, r as v, t as y } from "./Reading.js";
import { t as b } from "./SpritesMng.js";
import { Button as x } from "./Button.js";
import { t as S } from "./RubySpliter.js";
//#region src/sn/Hyphenation.ts
var C = "、。，．）］｝〉」』】〕”〟ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ！？!?‼⁉・ーゝゞヽヾ々", w = "［（｛〈「『【〔“〝", T = "─‥…", E = C, D = RegExp(`[${C}]`), O = RegExp(`[${w}]`), k = RegExp(`[${T}]`), A = D, j = class {
	#e = C;
	#t = w;
	#n = T;
	#r = E;
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
	#i = D;
	#a = O;
	#o = k;
	#s = A;
	break_fixed = !1;
	break_fixed_left = 0;
	break_fixed_top = 0;
	bura = !1;
	lay(e) {
		e.kinsoku_sol && (this.#e = e.kinsoku_sol, this.#i = RegExp(`[${this.#e}]`)), e.kinsoku_eol && (this.#t = e.kinsoku_eol, this.#c(), this.#a = RegExp(`[${this.#t}]`)), e.kinsoku_dns && (this.#n = e.kinsoku_dns, this.#l(), this.#o = RegExp(`[${this.#n}]`)), e.kinsoku_bura && (this.#r = e.kinsoku_bura, this.#c(), this.#l(), this.#s = RegExp(`[${this.#r}]`)), "bura" in e && (this.bura = o(e, "bura", !1)), this.break_fixed = o(e, "break_fixed", this.break_fixed), this.break_fixed_left = i(e, "break_fixed_left", this.break_fixed_left), this.break_fixed_top = i(e, "break_fixed_top", this.break_fixed_top);
	}
	#c() {
		let e = this.#t.length, t = this.#r.length;
		if (e < t) for (let t = 0; t < e; ++t) {
			let e = this.#t[t];
			if (this.#r.includes(e)) throw `禁則の競合があります。文字 ${String(e)} がぶら下げ と 行末禁則 の両方に含まれます`;
		}
		else for (let e = 0; e < t; ++e) {
			let t = this.#r[e];
			if (this.#t.includes(t)) throw `禁則の競合があります。文字 ${String(t)} がぶら下げ と 行末禁則 の両方に含まれます`;
		}
	}
	#l() {
		let e = this.#n.length, t = this.#r.length;
		if (e < t) for (let t = 0; t < e; ++t) {
			let e = this.#n[t];
			if (this.#r.includes(e)) throw `禁則の競合があります。文字 ${String(e)} がぶら下げ と 分割禁止 の両方に含まれます`;
		}
		else for (let e = 0; e < t; ++e) {
			let t = this.#r[e];
			if (this.#n.includes(t)) throw `禁則の競合があります。文字 ${String(t)} がぶら下げ と 分割禁止 の両方に含まれます`;
		}
	}
	reNew(e) {
		e.#u(this.#e, this.#t, this.#n, this.#r), e.break_fixed = this.break_fixed, e.break_fixed_left = this.break_fixed_left, e.break_fixed_top = this.break_fixed_top, e.bura = this.bura;
	}
	#u(e, t, n, r) {
		this.#e !== e && (this.#e = e, this.#i = RegExp(`[${e}]`)), this.#t !== t && (this.#t = t, this.#a = RegExp(`[${t}]`)), this.#n !== n && (this.#n = n, this.#o = RegExp(`[${n}]`)), this.#r !== r && (this.#r = r, this.#s = RegExp(`[${r}]`));
	}
	record() {
		let e = {
			break_fixed: this.break_fixed,
			break_fixed_left: this.break_fixed_left,
			break_fixed_top: this.break_fixed_top,
			bura: this.bura
		};
		return this.#e === C && (e.行頭禁則 = this.#e), this.#t === w && (e.行末禁則 = this.#t), this.#n === T && (e.分割禁止 = this.#n), this.#r === E && (e.ぶら下げ = this.#r), e;
	}
	playback(e) {
		e && (this.#u(e.行頭禁則 ?? C, e.行末禁則 ?? w, e.分割禁止 ?? T, e.ぶら下げ ?? E), this.break_fixed = e.break_fixed, this.break_fixed_left = e.break_fixed_left, this.break_fixed_top = e.break_fixed_top, this.bura = e.bura);
	}
	hyph(e, t, n, r, i) {
		let a, o = 0, s = 2, c = (t) => (c = () => !1, r === t ? (r > 0 && (e.innerHTML = i.replaceAll("class=\"sn_ch\"", "class=\"sn_ch sn_ch_in_default\"")), !0) : t < 2);
		do {
			if (a = this.#f(e, t), o = a.length, c(o)) break;
			let r = -Infinity;
			for (; s < o; ++s) {
				let { elm: e, rect: t, ch: i } = a[s];
				if (e.tagName === "RT") continue;
				let c = n ? t.y : t.x;
				if (r <= c || e.previousElementSibling?.tagName === "SPAN" && e.previousElementSibling?.innerHTML.includes("<br>") || e.parentElement?.previousElementSibling?.tagName === "SPAN" && e.parentElement?.previousElementSibling?.innerHTML.includes("<br>")) {
					r = c, this.break_fixed || (this.break_fixed_left = t.x, this.break_fixed_top = t.y);
					continue;
				}
				let l = this.#d(a, s), { elm: u, rect: d, ch: f } = a[l];
				if (!this.break_fixed) {
					this.break_fixed_left = d.x, this.break_fixed_top = d.y;
					let e = globalThis.getComputedStyle(u), t = parseFloat(e.fontSize);
					n ? this.break_fixed_top += t : this.break_fixed_left += t;
				}
				r = -Infinity;
				let p = s, { cont: m, ins: h } = this.bura ? this.hyph_alg_bura(a, l, f, s) : this.hyph_alg(a, l, f, s, i);
				if (s = h, m) continue;
				let g = a[s].elm, _ = g.parentElement, v = document.createElement("br");
				if (_.classList.contains("sn_tx")) _.insertBefore(v, g);
				else {
					let e = _.parentElement;
					e.classList.contains("sn_ch") ? e.parentElement.insertBefore(v, e) : e.insertBefore(v, _);
				}
				s += 2, s < p && (s = p), o = -1;
				break;
			}
		} while (o < 0);
		return [a, o];
	}
	#d(e, t) {
		let n = t - 1, { elm: r } = e[n];
		return r.tagName === "RT" ? n - Array.from(r.textContent).length : n - (r.style.textCombineUpright === "all" ? Array.from(r.textContent).length - 1 : 0);
	}
	#f(e, t) {
		let n = [];
		if (e.nodeType !== e.TEXT_NODE) return Array.from(e.childNodes).map((e) => this.#f(e, t)).flat();
		let r = e.ownerDocument.createRange();
		r.selectNodeContents(e);
		let i = 0, a = r.endOffset;
		for (; i < a;) {
			r.setStart(e, i), r.setEnd(e, ++i);
			let a = r.toString();
			n.push({
				ch: a,
				rect: t(r, a),
				elm: r.startContainer.parentElement
			});
		}
		return r.detach(), n;
	}
	hyph_alg(e, t, n, r, i) {
		let a = r;
		if (!this.#a.test(n)) {
			if (this.#i.test(i)) for (; (a = this.#d(e, a)) >= 0 && this.#i.test(e[a].ch););
			else if (!(n === i && this.#o.test(n))) return {
				cont: !0,
				ins: a + 1
			};
		}
		for (a = t; (a = this.#d(e, a)) >= 0 && this.#a.test(e[a].ch););
		return {
			cont: !1,
			ins: a + 1
		};
	}
	hyph_alg_bura(e, t, n, r) {
		let i = this.#d(e, t), { ch: a } = e[i];
		if (this.#s.test(a) || this.#i.test(a)) {
			let r = t;
			(this.#s.test(n) || this.#i.test(n)) && ++r;
			let i = this.#d(e, r), { ch: a } = e[i], { ch: o } = e[r];
			if (a === o && this.#o.test(o)) return {
				cont: !1,
				ins: i
			};
			if (!this.#a.test(a)) return {
				cont: !1,
				ins: r
			};
			r = i;
			do
				if (!this.#a.test(e[r].ch)) break;
			while ((r = this.#d(e, r)) >= 0);
			return {
				cont: !1,
				ins: r + 1
			};
		}
		let o = this.#d(e, i);
		if (r >= 3) {
			let { ch: t } = e[o];
			if (this.#o.test(a) && t === a) return {
				cont: !1,
				ins: o
			};
			if (this.#a.test(t)) {
				let t = o;
				for (; (t = this.#d(e, t)) >= 0 && this.#a.test(e[t].ch););
				return {
					cont: !1,
					ins: t + 1
				};
			}
		}
		return {
			cont: !1,
			ins: i
		};
	}
};
//#endregion
//#region src/sn/htm2tx.ts
function M(e, t, n, r, i, a = !0) {
	let o = {
		escape: (e) => e.replaceAll(/([.*+?^${}()|[\]/\\])/g, "\\$1"),
		mimeType: (e) => {
			let t = f(e).toLowerCase();
			return s()[t] || "";
		},
		dataAsUrl: _,
		isDataUrl: p,
		resolveUrl: h,
		getAndEncode: g,
		asArray: (e) => {
			let t = [], n = e.length;
			for (let r = 0; r < n; ++r) t.push(e[r]);
			return t;
		}
	};
	function s() {
		let e = "application/font-woff", t = "image/jpeg";
		return {
			woff: e,
			woff2: e,
			ttf: "application/font-truetype",
			eot: "application/vnd.ms-fontobject",
			png: "image/png",
			jpg: t,
			jpeg: t,
			gif: "image/gif",
			tiff: "image/tiff",
			svg: "image/svg+xml"
		};
	}
	let l = v(), u = y();
	function d(e) {
		return u.resolveAll().then((t) => {
			let n = document.createElement("style");
			return e.appendChild(n), n.appendChild(document.createTextNode(t)), e;
		});
	}
	function f(e) {
		return /\.([^./]*?)$/g.exec(e)?.[1] ?? "";
	}
	function p(e) {
		return e.search(/^(data:)/) !== -1;
	}
	function h(e, t) {
		let n = document.implementation.createHTMLDocument(), r = n.createElement("base");
		n.head.appendChild(r);
		let i = n.createElement("a");
		return n.body.appendChild(i), r.href = t, i.href = e, i.href;
	}
	function g(e) {
		return new Promise(function(t) {
			let n = new XMLHttpRequest();
			n.onreadystatechange = r, n.ontimeout = i, n.responseType = "blob", n.timeout = 3e4, n.open("GET", e, !0), n.send();
			function r() {
				if (n.readyState !== 4) return;
				if (n.status !== 200) {
					a("cannot fetch resource: " + e + ", status: " + n.status);
					return;
				}
				let r = new FileReader();
				r.onloadend = function() {
					let e = r.result.toString().split(/,/)[1];
					t(e);
				}, r.readAsDataURL(n.response);
			}
			function i() {
				a("timeout of 30000ms occured while fetching resource: " + e);
			}
			function a(e) {
				console.error(e), t("");
			}
		});
	}
	function _(e, t) {
		return "data:" + t + ";base64," + e;
	}
	function v() {
		let e = /url\(['"]?([^'"]+?)['"]?\)/g;
		return {
			inlineAll: i,
			shouldProcess: t
		};
		function t(t) {
			return t.search(e) !== -1;
		}
		function n(t) {
			let n = [], r;
			for (; r = e.exec(t);) n.push(r[1]);
			return n.filter(function(e) {
				return !o.isDataUrl(e);
			});
		}
		function r(e, t, n, r) {
			return Promise.resolve(t).then((e) => n ? o.resolveUrl(e, n) : e).then(r || o.getAndEncode).then((e) => o.dataAsUrl(e, o.mimeType(t))).then((n) => e.replace(i(t), "$1" + n + "$3"));
			function i(e) {
				return RegExp("(url\\(['\"]?)(" + o.escape(e) + ")(['\"]?\\))", "g");
			}
		}
		function i(e, i, a) {
			if (o()) return Promise.resolve(e);
			return Promise.resolve(e).then(n).then((t) => {
				let n = Promise.resolve(e);
				for (let e of t) n = n.then((t) => r(t, e, i, a));
				return n;
			});
			function o() {
				return !t(e);
			}
		}
	}
	function y() {
		return {
			resolveAll: e,
			impl: { readAll: t }
		};
		function e() {
			return t().then((e) => Promise.allSettled(e.map((e) => e.resolve()))).then((e) => e.join("\n"));
		}
		function t() {
			return Promise.resolve(o.asArray(document.styleSheets)).then(t).then(e).then((e) => e.map(n));
			function e(e) {
				return e.filter((e) => e.type === CSSRule.FONT_FACE_RULE).filter((e) => l.shouldProcess(e.style.getPropertyValue("src")));
			}
			function t(e) {
				let t = [];
				for (let n of e) try {
					if (n.href) continue;
					o.asArray(n.cssRules || []).forEach(t.push.bind(t));
				} catch (e) {
					console.error("Error while reading CSS rules from " + n.href, String(e));
				}
				return t;
			}
			function n(e) {
				return {
					resolve: function() {
						let t = (e.parentStyleSheet || {}).href;
						return l.inlineAll(e.cssText, t);
					},
					src() {
						return e.style.getPropertyValue("src");
					}
				};
			}
		}
	}
	Promise.resolve(t).then((e) => {
		let o = e.cloneNode(!0);
		return o.style.padding = "0px", o.style.paddingRight = r + "px", o.style.paddingTop = i + "px", o.style.left = "0px", o.style.top = "0px", o.style.width = n.$width - n.pad_left - n.pad_right + "px", o.style.height = n.$height - n.pad_top - n.pad_bottom + "px", t.hidden = a, o;
	}).then(d).then((e) => {
		e.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
		let t = new Image();
		return t.src = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${String(n.$width)}px" height="${String(n.$height)}px"><foreignObject x="0" y="0" width="100%" height="100%">${new XMLSerializer().serializeToString(e).replaceAll("#", "%23").replaceAll("\n", "%0A")}</foreignObject></svg>`, new Promise((e) => {
			t.onload = () => e(t);
		});
	}).then((e) => new Promise((t) => setTimeout(() => t(e), 100))).then((t) => {
		let r = document.createElement("canvas");
		r.width = n.$width, r.height = n.$height, r.getContext("2d").drawImage(t, 0, 0), e(c.from(r));
	}).catch((e) => m.myTrace(`goTxt() = ${String(e)}`));
}
//#endregion
//#region src/sn/TxtStage.ts
var N = class t extends u {
	ctn;
	canFocus;
	sys;
	static #e;
	static #t;
	static init(e, n) {
		t.#e = e, t.#t = n, v.addGrp(t.grp);
	}
	static grp = new g();
	static #n;
	static #r;
	static setEvtMng(e, n) {
		t.#n = e, t.#r = n;
	}
	static destroy() {
		t.grp.removeAll(), t.#T = Object.create(null), t.#D = Object.create(null), t.delBreak();
	}
	#i = document.createElement("span");
	#a = new u();
	#o = new f();
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
	#c = new j();
	noticeCompTxt = () => {};
	#l;
	constructor(n, r, i) {
		super(), this.ctn = n, this.canFocus = r, this.sys = i, this.#i.classList.add("sn_tx"), this.#i.style.position = "absolute", t.#t.view.parentElement.appendChild(this.#i), this.addChild(this.#a), this.addChild(this.#o), this.#o.name = "grpDbgMasume";
		let a = s.debugLog ? ({ ch: e, rect: { x: t, y: n, width: r, height: i } }) => console.log(`🍌 masume ch:${e} x:${String(t)} y:${String(n)} w:${String(r)} h:${String(i)}`) : () => {};
		this.#l = t.#e.oCfg.debug.masume ? (e) => {
			a(e);
			let { x: t, y: n, width: r, height: i } = e.rect;
			this.#o.beginFill(6737151, .5).lineStyle(2, 16724736, 1).drawRect(t, n, r, i).endFill();
		} : () => {}, this.noticeCompTxt = i.isApp && t.#e.oCfg.debug.dumpHtm ? () => {
			y.notifyEndProc(e);
			let r = this.#i.innerHTML;
			if (r === "") return;
			let { fn: a, ln: o } = t.#r.nowScrFnLn(), s = `dumpHtm ${n.name.slice(0, -7).replaceAll(":", "=")}(fn=${a} line=${String(o)})`;
			i.outputFile(i.path_downloads + s + ".htm", `<!doctype html><html><head><meta charset=utf-8><title>${s}</title>
<h1>${s}</h1>${r.replaceAll(/ class="sn_ch"|animation-delay: \d+ms; ?| data-add="{&quot;ch_in_style&quot;:&quot;default&quot;, &quot;ch_out_style&quot;:&quot;default&quot;}"/g, "").replaceAll(" style=\"\"", "").replaceAll(/(<\/?ruby>)/g, "\n$1\n").replaceAll(/<(br|\/span)>/g, "<$1>\n")}`);
		} : () => y.notifyEndProc(e);
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
		let n = this.#i.style;
		if ("style" in e) if (e.style) {
			let r = document.createElement("span");
			r.style.cssText = e.style;
			let i = r.style.length;
			for (let e = 0; e < i; ++e) {
				let i = r.style[e];
				if (i in t.#s) {
					m.myTrace(`${String(i)}は指定できません`, "W");
					continue;
				}
				n[i] = r.style[i];
			}
			!r.style.opacity && "alpha" in e && (n.opacity = String(this.ctn.alpha));
		} else this.#i.style.cssText = "";
		else "alpha" in e && (n.opacity = String(this.ctn.alpha));
		if ("width" in e && (n.width = String(e.width ?? "0") + "px"), "height" in e && (n.height = String(e.height ?? "0") + "px"), "pl" in e && (n.paddingLeft = String(e.pl ?? "0") + "px"), "pr" in e && (n.paddingRight = String(e.pr ?? "0") + "px"), "pt" in e && (n.paddingTop = String(e.pt ?? "0") + "px"), "pb" in e && (n.paddingBottom = String(e.pb ?? "0") + "px"), this.#c.lay(e), this.#f(), this.#p = this.ctn.position.x, n.transformOrigin = `${String(this.ctn.pivot.x)}px ${String(this.ctn.pivot.y)}px`, this.cvsResize(), n.display = this.ctn.visible ? "inline" : "none", ":redraw" in e && this.#y > 0) {
			let e = [this.#i.innerHTML.replaceAll(/(animation-delay: )\d+ms/g, "$10ms"), "<span class='sn_ch' data-add='{\"ch_in_style\":\"default\"}'>&emsp;</span>"];
			this.#N(), this.goTxt(e, !0);
		}
	}
	#d = 0;
	#f() {
		let e = this.#i.style, t = parseFloat(e.fontSize || "0");
		this.#u.fontsize = t, this.#u.pad_left = parseFloat(e.paddingLeft || "0"), this.#u.pad_right = parseFloat(e.paddingRight || "0"), this.#u.pad_top = parseFloat(e.paddingTop || "0"), this.#u.pad_bottom = parseFloat(e.paddingBottom || "0"), this.#u.$width = parseFloat(e.width || "0"), this.#u.$height = parseFloat(e.height || "0"), this.position.set(this.#u.pad_left, this.#u.pad_top), this.#m = e.writingMode === "vertical-rl", this.#h = 0, this.#g = 0;
		let n = e.lineHeight ?? "0";
		this.#d = this.#m ? 0 : (n.endsWith("px") ? parseFloat(n) : t * parseFloat(n) - t) / 2;
	}
	cvsResize() {
		let e = this.#i.style, t = this.sys.cvsScale;
		e.left = `${String(this.sys.ofsLeft4elm + this.#p * t)}px`, e.top = `${String(this.sys.ofsTop4elm + this.ctn.position.y * t)}px`, e.transform = `rotate(${String(this.ctn.angle)}deg) scale(${String(this.ctn.scale.x * t)}, ${String(this.ctn.scale.y * t)})`;
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
	setMySize(e, t) {
		this.#u.$width = e, this.#u.$height = t, this.#i.style.width = String(this.#u.$width) + "px", this.#i.style.height = String(this.#u.$height) + "px";
	}
	#_ = [];
	goTxt(e, t) {
		let n = () => this.#x(e, t);
		this.#_.push(n) === 1 && n();
	}
	#v = [];
	#y = 0;
	static #b = "<span class='sn_ch sn_ch_last'>&emsp;</span>";
	#x(e, n) {
		t.#O.visible = !1;
		let r = this.#v.length, i = "";
		if (r === 0) {
			if (t.#e.oCfg.debug.masume && (s.debugLog && console.log(`🍌 masume ${this.name} v:${String(this.visible)} l:${String(this.x)} t:${String(this.y)} a:${String(this.alpha)} pl:${String(this.#u.pad_left)} pr:${String(this.#u.pad_right)} pt:${String(this.#u.pad_top)} pb:${String(this.#u.pad_bottom)} w:${String(this.#u.$width)} h:${String(this.#u.$height)}`), this.#o.clear().beginFill(3407616, .2).lineStyle(1, 3407616, 1).drawRect(-this.#u.pad_left, -this.#u.pad_top, this.#u.$width, this.#u.$height).endFill().beginFill(13311, .2).lineStyle(2, 13311, 1).drawRect(0, 0, this.#u.$width - this.#u.pad_left - this.#u.pad_right, this.#u.$height - this.#u.pad_top - this.#u.pad_bottom).endFill()), this.#i.innerHTML = [...e].join("").replaceAll(/[\n\t]/g, "") + t.#b, !this.#c.break_fixed) {
				let e = globalThis.getComputedStyle(this.#i), t = parseFloat(e.fontSize);
				this.#m ? (this.#c.break_fixed_left = (this.#u.$width - this.#u.pad_left - this.#u.pad_right - t * 1.5) * this.sys.cvsScale, this.#c.break_fixed_top = 0) : (this.#c.break_fixed_left = 0, this.#c.break_fixed_top = t / 2 * this.sys.cvsScale);
			}
		} else i = this.#i.innerHTML, --r, this.#i.getElementsByClassName("sn_ch_last").item(0)?.remove(), this.#i.querySelectorAll(":scope > br").forEach((e) => e.remove()), this.#i.insertAdjacentHTML("beforeend", e.slice(this.#y).join("").replaceAll(/[\n\t]/g, "") + t.#b);
		this.#i.querySelectorAll(".sn_ch:has(> ruby)").forEach((e) => {
			e.style.background = "";
		}), this.#y = e.length;
		let a = this.sys.cvsScale, c = this.#i.getBoundingClientRect(), f = c.left + this.#u.pad_left, p = c.top + this.#u.pad_top, m;
		if (a === 1) m = (e, t) => {
			let n = e.getBoundingClientRect();
			return new l(n.left - f, n.top - p, n.width, n.height + ("gjqy".includes(t) ? this.#d : 0));
		};
		else {
			let e = this.sys.ofsPadLeft_Dom2PIXI + c.left * (1 - a), t = this.sys.ofsPadTop_Dom2PIXI + c.top * (1 - a);
			m = (n, r) => {
				let i = n.getBoundingClientRect();
				return new l((i.left - e) / a - f, (i.top - t) / a - p, i.width / a, (i.height + ("gjqy".includes(r) ? this.#d : 0)) / a);
			};
		}
		let [h, g] = this.#c.hyph(this.#i, m, this.#m, r, i);
		this.#v = h;
		let _ = v.ease(this.#A);
		for (let e = r; e < g; ++e) {
			let n = this.#v[e], { elm: { dataset: r, parentElement: i }, rect: a } = n, s = JSON.parse(r.arg ?? "{\"delay\": 0}"), c = JSON.parse(r.add ?? "{}"), l = t.#T[c.ch_in_style];
			if (this.#l(n), r.cmd === "grp") {
				let e = new u();
				this.#a.addChild(e), new b(s.pic, e, (t) => {
					this.#C(e, s, c, a, _, l ?? {}), e.parent || e.removeChild(t);
				});
			}
			if (r.lnk) {
				let n = i.closest("[data-arg]"), r = JSON.parse(n.dataset.arg ?? "{}");
				r.key = `lnk=[${String(e)}] ` + this.name;
				let s = new d();
				this.#C(s, r, c, a, _, l ?? {});
				let u = r.style ?? "", f = u + (r.style_hover ?? ""), p = u + (r.style_clicked ?? ""), m = r.r_style ?? "", h = m + (r.r_style_hover ?? ""), g = m + (r.r_style_clicked ?? ""), v = Array.from(n.getElementsByTagName("rt"));
				for (let e of v) e.dataset.st_r_bk = e.style.cssText;
				let y = n.style.cssText, b = (e, t) => {
					n.style.cssText = y + e;
					for (let e of v) e.style.cssText = e.dataset.st_r_bk + t;
				};
				o(r, "enabled", !0) ? t.#n.button(r, s, () => b(u, m), () => this.canFocus() ? (b(f, h), !0) : !1, () => b(p, g)) : b(u + (r.style_disable ?? "color: gray;"), m + (r.r_style_disable ?? "color: gray;")), this.#a.addChild(s);
			}
		}
		let y = Array.from(this.#i.getElementsByClassName("sn_ch_yet"));
		this.#S = () => {
			this.#S = () => !1;
			for (let e of y) e.className = "sn_ch";
			t.#O.position.set(this.#c.break_fixed_left, this.#c.break_fixed_top), t.#O.visible = !0, this.noticeCompTxt();
			let e = this.#_.shift();
			return this.#_.length > 0 && e(), !0;
		};
		for (let e of y) e.className = e.className.replace("sn_ch_yet sn", "go");
		r > 0 && ++r;
		let x;
		for (let e = g - 2; e >= 0; --e) {
			let { elm: t } = this.#v[e];
			if (t.tagName === "SPAN") {
				x = t.parentElement?.tagName === "RUBY" ? t.parentElement.parentElement ?? t : t;
				break;
			}
		}
		if (!x || n || r === g) {
			this.#S();
			return;
		}
		let S = () => {
			x.removeEventListener("animationend", S), this.#S();
		};
		x.addEventListener("animationend", S, {
			once: !0,
			signal: this.#M.signal
		});
	}
	#S = () => !1;
	#C(e, n, r, i, a, o) {
		e.alpha = 0, n.x && (i.x = n.x.startsWith("=") ? i.x + parseInt(n.x.slice(1)) : parseInt(n.x)), n.y && (i.y = n.y.startsWith("=") ? i.y + parseInt(n.y.slice(1)) : parseInt(n.y)), n.width && (i.width = parseInt(n.width)), n.height && (i.height = parseInt(n.height)), n.wait && (o.wait = n.wait), e.width = i.width, e.height = i.height, o.x ? e.position.set(o.x.startsWith("=") ? i.x + e.width * o.nx : o.nx, o.y.startsWith("=") ? i.y + e.height * o.ny : o.ny) : e.position.set(i.x, i.y);
		let s = new _(e).to({
			alpha: 1,
			x: i.x,
			y: i.y,
			width: i.width,
			height: i.height,
			angle: 0
		}, o.wait ?? 0).easing(a).delay((r.wait ?? 0) + (n.delay ?? 0)).onComplete(() => {
			c.tw = void 0;
		}).start();
		t.grp.add(s);
		let c = {
			sp: e,
			tw: s
		};
		this.#w.push(c);
	}
	#w = [];
	skipChIn() {
		let e = this.#S();
		for (let t of this.#w) t.tw && (t.tw.stop().end(), e = !0);
		return this.#w = [], e;
	}
	static #T = Object.create(null);
	static #E = /[{\s.,*{]/;
	static initChStyle() {
		t.#T = Object.create(null), t.#D = Object.create(null);
	}
	static getChInStyle(e) {
		return t.#T[e];
	}
	static ch_in_style(e) {
		let { name: n } = e;
		if (!n) throw "nameは必須です";
		if (t.#E.test(n)) throw `name【${n}】に使えない文字が含まれます`;
		if (n in t.#T) throw `name【${n}】はすでにあります`;
		let r = String(e.x ?? "=0"), a = String(e.y ?? "=0");
		return t.#T[n] = {
			wait: i(e, "wait", 500),
			alpha: i(e, "alpha", 0),
			x: r,
			y: a,
			nx: parseFloat(r.at(0) === "=" ? r.slice(1) : r),
			ny: parseFloat(a.at(0) === "=" ? a.slice(1) : a),
			scale_x: i(e, "scale_x", 1),
			scale_y: i(e, "scale_y", 1),
			rotate: i(e, "rotate", 0),
			join: o(e, "join", !0),
			ease: e.ease ?? "ease-out"
		};
	}
	static #D = Object.create(null);
	static getChOutStyle(e) {
		return t.#D[e];
	}
	static ch_out_style(e) {
		let { name: n } = e;
		if (!n) throw "nameは必須です";
		if (t.#E.test(n)) throw `name【${n}】に使えない文字が含まれます`;
		if (n in t.#D) throw `name【${n}】はすでにあります`;
		let r = String(e.x ?? "=0"), a = String(e.y ?? "=0");
		return t.#D[n] = {
			wait: i(e, "wait", 500),
			alpha: i(e, "alpha", 0),
			x: r,
			y: a,
			nx: parseFloat(r.at(0) === "=" ? r.slice(1) : r),
			ny: parseFloat(a.at(0) === "=" ? a.slice(1) : a),
			scale_x: i(e, "scale_x", 1),
			scale_y: i(e, "scale_y", 1),
			rotate: i(e, "rotate", 0),
			join: o(e, "join", !1),
			ease: e.ease ?? "ease-out"
		};
	}
	static #O = new u();
	static #k = new b();
	dispBreak(e) {
		t.delBreak();
		let n = t.#O;
		n.visible = !1, this.addChild(n), t.#k.destroy(), t.#k = new b(e.pic, n, (t) => {
			n.parent ? (t.x = i(e, "x", 0), t.y = i(e, "y", 0), t.width = i(e, "width", this.#u.fontsize), t.height = i(e, "height", this.#u.fontsize)) : n.removeChild(t);
		});
	}
	static delBreak() {
		let e = t.#O;
		e.parent?.removeChild(e), t.#k.destroy();
	}
	#A = "Quadratic.Out";
	#j = "Quadratic.Out";
	#M = new AbortController();
	#N() {
		this.#o.clear(), this.#v = [], this.#y = 0, this.#_ = [], this.#M.abort(), this.#M = new AbortController(), this.skipChIn();
		let e = document.createElement("span");
		e.style.cssText = this.#i.style.cssText, e.classList.value = this.#i.classList.value;
		let n = this.#i, r = Array.from(n.getElementsByClassName("sn_ch"));
		n.parentElement.insertBefore(e, n);
		let i = 0;
		r.forEach((e) => {
			let n = JSON.parse(e.dataset.add ?? e.children[0]?.getAttribute("data-add") ?? e.children[0]?.children[0]?.getAttribute("data-add") ?? "{}");
			if (!n.ch_out_style) return;
			let r = t.#D[n.ch_out_style];
			if (r) {
				if (r.wait === 0) {
					e.style.display = "none";
					return;
				}
				i += r.wait, r.join || (e.style.animationDelay = "0ms"), e.classList.add(`go_ch_out_${String(n.ch_out_style)}`);
			}
		});
		let a = () => {
			n.parentElement.removeChild(n);
			for (let e of this.#a.removeChildren()) e instanceof u && t.#n.unButton(e), e.destroy();
		};
		if (i === 0) this.#i.textContent = "", this.#i = document.createElement("span"), a();
		else {
			let e = n.lastElementChild;
			if (e) {
				let t = () => {
					e.removeEventListener("animationend", t), a();
				};
				e.addEventListener("animationend", t, {
					once: !0,
					signal: this.#M.signal
				});
			} else a();
		}
		this.#i = e;
	}
	reNew() {
		this.#N();
		let e = new t(this.ctn, this.canFocus, this.sys);
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
	snapshot(e, t) {
		M((n) => {
			this.#F = d.from(n), this.#m && (this.#F.x += s.stageW - (this.#p + this.#u.$width)), this.#F.y -= this.#g, this.#F.texture.frame = new l(0, 0, Math.min(this.#F.width, this.#u.$width - this.#p), Math.min(this.#F.height, this.#u.$height)), this.#a.addChild(this.#F), e.render(this.#F, { clear: !1 }), t();
		}, this.#i, this.#u, this.#h, this.#g, !1);
	}
	snapshot_end() {
		this.#F &&= (this.#a.removeChild(this.#F), void 0);
	}
	makeDesignCast(e) {}
	showDesignCast() {}
	dump() {
		let e = [], t = this.#i.style, n = t.length;
		for (let r = 0; r < n; ++r) {
			let n = t[r];
			e.push(`"${String(n)}":"${t[n].replaceAll(/(["\\])/g, "\\$1")}"`);
		}
		return `"txt":"${this.#i.textContent.replaceAll(/(["\\])/g, "\\$1")}", "style":{${e.join(",")}}`;
	}
	destroy() {
		t.delBreak(), this.#i.parentElement.removeChild(this.#i), this.#i = document.createElement("span"), this.removeChild(this.#a), this.removeChild(this.#o), this.#o.clear(), this.#l = () => {}, this.#_ = [], this.#v = [], this.#y = 0, this.#w = [], this.#M.abort(), this.#P = void 0, super.destroy();
	}
}, P = class e extends h {
	static #e;
	static #t;
	static #n;
	static #r;
	static init(e, t, r, i, o, s) {
		this.#e = e, N.init(e, s), this.#t = r, this.#r = i, this.#n = o, r.setDoRecProc((e) => this.chgDoRec(e)), t.autowc = (e) => this.#d(e), t.autowc({
			enabled: !1,
			text: "",
			time: 0
		}), t.ch_in_style = (e) => this.#i(e), t.ch_out_style = (e) => this.#a(e), N.initChStyle(), n(), a(e.matchPath(".+", p.FONT).flatMap((e) => Object.values(e).map((e) => `
@font-face {
	font-family: '${String(e)}';
	src: url('${this.#e.searchPath(String(e), p.FONT)}');
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
		let { x: t, y: n, nx: r, ny: i, alpha: o, wait: s, ease: c, rotate: l, scale_x: u, scale_y: d } = N.ch_in_style(e), f = t.startsWith("=") ? `${String(r * 100)}%` : `${String(r)}px`, p = n.startsWith("=") ? `${String(i * 100)}%` : `${String(i)}px`, { name: m = "" } = e;
		return a(`
.sn_ch_in_${m} {
	position: relative;
	display: inline-block;
}
.go_ch_in_${m} {
	opacity: ${String(o)};
	position: relative;
	display: inline-block;
	animation: sn_ch_in_${m} ${String(s)}ms ${c} 0s both;
}
@keyframes sn_ch_in_${m} {
	from {transform: rotate(${String(l)}deg) scale(${String(u)}, ${String(d)}) translate(${f}, ${p})}
	to {opacity: 1; transform: none;}
}
`), !1;
	}
	static #a(e) {
		let { x: t, y: n, nx: r, ny: i, alpha: o, wait: s, ease: c, rotate: l, scale_x: u, scale_y: d } = N.ch_out_style(e), f = t.startsWith("=") ? `${String(r * 100)}%` : `${String(r)}px`, p = n.startsWith("=") ? `${String(i * 100)}%` : `${String(i)}px`, { name: m = "" } = e;
		return a(`
.go_ch_out_${m} {
	position: relative;
	display: inline-block;
	animation: go_ch_out_${m} ${String(s)}ms ${c} 0s both;
}
@keyframes go_ch_out_${m} {
	to {
		opacity: ${String(o)};
		transform: rotate(${String(l)}deg) scale(${String(u)}, ${String(d)}) translate(${f}, ${p});
	}
`), !1;
	}
	static #o = 10;
	static set msecChWait(t) {
		e.#o = t;
	}
	static get msecChWait() {
		return e.#o;
	}
	static #s;
	static #c;
	static setEvtMng(e, t, n) {
		this.#s = e, this.#c = t, N.setEvtMng(e, n);
	}
	static #l = !1;
	static #u = {};
	static #d(e) {
		this.#l = o(e, "enabled", this.#l), this.#t.setVal_Nochk("save", "const.sn.autowc.enabled", this.#l);
		let { text: t } = e;
		if ("text" in e != "time" in e) throw "[autowc] textとtimeは同時指定必須です";
		if (this.#t.setVal_Nochk("save", "const.sn.autowc.text", t), !t) return this.#t.setVal_Nochk("save", "const.sn.autowc.time", ""), !1;
		let n = t.length;
		if (this.#l && n === 0) throw "[autowc] enabled === false かつ text === \"\" は許されません";
		let i = String(e.time).split(",");
		if (i.length !== n) throw "[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい";
		this.#u = {};
		for (let e = 0; e < n; ++e) this.#u[t[e]] = r(i[e]);
		return this.#t.setVal_Nochk("save", "const.sn.autowc.time", e.time), !1;
	}
	#f = 0;
	#p = 0;
	#m = !1;
	#h = void 0;
	#g = "";
	#_ = new N(this.ctn, () => this.canFocus(), e.#c);
	#v = new S();
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
	#x = new u();
	constructor() {
		super(), this.ctn.addChild(this.#_), this.#v.init(this.#B), this.ctn.addChild(this.#x), this.#x.name = "cntBtn", this.lay({
			style: `width: ${String(s.stageW)}px; height: ${String(s.stageH)}px; font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif; color: white; font-size: 24px; line-height: 1.5; padding: 16px;`,
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
	lay(t) {
		if (super.lay(t), h.setXY(this.ctn, t, this.ctn), t[":id_tag"] = this.name_.slice(0, -7), S.setting(t), this.#k(t), this.#_.lay(t), "r_align" in t && (this.#L = t.r_align ?? ""), this.#F = s.isSafari ? this.#_.tategaki ? (e, t) => `text-align: start; height: ${String(t)}em; padding-top: ${e}; padding-bottom: ${e};` : (e, t) => `text-align: start; width: ${String(t)}em; padding-left: ${e}; padding-right: ${e};` : this.#_.tategaki ? (e) => `text-align: justify; text-align-last: justify; padding-top: ${e}; padding-bottom: ${e};` : (e) => `text-align: justify; text-align-last: justify; padding-left: ${e}; padding-right: ${e};`, s.isFirefox && (this.#I = this.#R), "r_style" in t) if (t.r_style) {
			let n = document.createElement("span");
			n.style.cssText = t.r_style;
			let r = n.style.length, i = this.#y.style;
			for (let t = 0; t < r; ++t) {
				let r = n.style[t];
				if (r in e.#b) {
					m.myTrace(`${String(r)}は指定できません`, "W");
					continue;
				}
				let a = n.style[r];
				a && (i[r] = a);
			}
		} else this.#y.style.cssText = "";
		if ("alpha" in t) for (let e of this.#x.children) e.alpha = this.ctn.alpha;
		this.#S(t), this.#T(t);
		let n = y.procID + `TxtLayer lay name:${this.name_}`, r = this.#O(t, (e) => {
			e && y.endProc(n);
		});
		return r && y.beginProc(n), r;
	}
	#S(e) {
		let { in_style: t } = e;
		if (!t) return;
		let n = N.getChInStyle(t);
		if (!n) throw `存在しないin_style【${t}】です`;
		this.#C = t, this.#w = n.join;
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
		let { out_style: t } = e;
		if (t) {
			if (!N.getChOutStyle(t)) throw `存在しないout_style【${t}】です`;
			this.#E = t;
		}
	}
	#E = "";
	#D = new b();
	#O(n, r) {
		if ("back_clear" in n) return o(n, "back_clear", !1) && (this.#f = 0, this.#p = 0, this.#m = !1, this.#g = ""), r(!1), !1;
		this.#p = i(n, "b_alpha", this.#p), this.#m = o(n, "b_alpha_isfixed", this.#m);
		let a = (this.#m ? 1 : Number(e.#t.getVal("sys:TextLayer.Back.Alpha"))) * this.#p;
		if (n.b_pic) {
			if (this.#g !== n.b_pic) return this.#g = n.b_pic, this.#h && (this.ctn.removeChild(this.#h), this.#h.destroy()), this.#D = new b(this.#g, this.ctn, (e) => {
				this.#h = e, e.name = "back(pic)", e.visible = a > 0, e.alpha = a, this.#_.setMySize(e.width, e.height), this.ctn.setChildIndex(e, 0), r(!0);
			}), this.#D.ret;
		} else "b_color" in n && (this.#f = t(n, "b_color", 0), this.#h && (this.ctn.removeChild(this.#h), this.#h.destroy()), this.#g = "", this.ctn.addChildAt((this.#h = new f()).beginFill(this.#f, a).lineStyle(void 0).drawRect(0, 0, this.#_.getWidth, this.#_.getHeight).endFill(), 0), this.#h.name = "back(color)");
		return this.#h && (this.#h.visible = a > 0, this.#h.alpha = a), r(!1), !1;
	}
	chgBackAlpha(e) {
		let t = this.#m ? this.#p : e * this.#p;
		this.#h instanceof f && (this.#h && (this.ctn.removeChild(this.#h), this.#h.destroy()), this.ctn.addChildAt((this.#h = new f()).beginFill(this.#f, t).lineStyle(void 0).drawRect(0, 0, this.#_.getWidth, this.#_.getHeight).endFill(), 0), this.#h.name = "back(color)"), this.#h && (this.#h.visible = t > 0, this.#h.alpha = t);
	}
	#k(e) {
		"noffs" in e && (this.#M = e.noffs ?? "", this.#N = RegExp(`[　${this.#M}]`)), "ffs" in e && (this.#A ??= "", this.#j = this.#A === "" ? () => "" : (e) => this.#N.test(e) ? "" : ` font-feature-settings: ${this.#A};`);
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
	#I = (e, t, n, r = "") => {
		if (!n) return ` style='${r}'`;
		let i = e.length * 2;
		if (i - t.length < 0) return ` style='text-align: ${n}; ${r}'`;
		let a = "";
		switch (n) {
			case "justify":
				a = this.#F("0", i);
				break;
			case "121":
				a = this.#F(`calc(${String((i - t.length) / (t.length * 2))}em)`, i);
				break;
			case "even":
				a = this.#F(`calc(${String((i - t.length) / (t.length + 1))}em)`, i);
				break;
			case "1ruby":
				a = this.#F("1em", i);
				break;
			default: a = `text-align: ${n};`;
		}
		return ` style='${a} ${r}'`;
	};
	#L = "";
	#R(e, t, n, r = "") {
		if (!n) return ` style='${r}'`;
		let i = e.length * 2;
		if (i - t.length < 0) return ` style='text-align: ${n}; ${r}'`;
		let a = "";
		switch (n) {
			case "left":
				a = "ruby-align: start;";
				break;
			case "center":
				a = "ruby-align: center;";
				break;
			case "right":
				a = "ruby-align: start;";
				break;
			case "justify":
				a = "ruby-align: space-between;";
				break;
			case "121":
				a = "ruby-align: space-around;";
				break;
			case "even":
				{
					let e = ` ${String((i - t.length) / (t.length + 1))}em;`;
					a = "ruby-align: space-between; " + (this.#_.tategaki ? `padding-top:${e} padding-bottom:${e}` : `padding-left:${e} padding-right:${e}`);
				}
				break;
			case "1ruby":
				a = "ruby-align: space-between; " + (this.#_.tategaki ? "padding-top: 1em; padding-bottom: 1em;" : "padding-left: 1em; padding-right: 1em;");
				break;
			default: a = `text-align: ${n};`;
		}
		return ` style='${a} ${r}'`;
	}
	tagCh(e) {
		this.#v.putTxt(e);
	}
	#z = !1;
	get needGoTxt() {
		return this.#z;
	}
	#B = (t, n) => {
		let i = n;
		e.#e.oCfg.debug.putCh && console.log(`🖊 文字表示 text:\`${t}\`(${t.charCodeAt(0).toString(16)}) ruby:\`${i}\` name:\`${this.name_}\``);
		let a = i.split("｜"), o = "", [c, ...l] = a, u = l.join("｜");
		switch (a.length) {
			case 1:
				if (this.#z = !0, t === "\n") {
					this.#W ? (this.#W = !1, o = "<ruby>&emsp;<rt>&emsp;</rt></ruby><br/>") : o = "<br/>";
					break;
				}
				this.#W && (this.#W = !1, i === "" && (i = "&emsp;")), o = this.#V(t, i, this.#L);
				break;
			default:
				switch (c) {
					case "start":
					case "left":
					case "center":
					case "right":
					case "justify":
					case "121":
					case "even":
					case "1ruby":
						this.#W = !1, this.#z = !0, o = this.#V(t, u, c);
						break;
					case "gotxt":
						this.#J(), this.#z ? (this.isCur && e.#r.recText(this.#G.join("").replace(/^<ruby>&emsp;<rt>&emsp;<\/rt><\/ruby>(<br\/>)+/, "").replaceAll(/style='(anim\S+ [^;]+;\s*)+/g, "style='").replaceAll(/( style=''| data-(add|arg|cmd)='[^']+'|\n+|\t+)/g, "").replaceAll(/class='sn_ch[^']+/g, "class='sn_ch").replaceAll("display: none;", "").replaceAll("class='offrec'", "style='display: none;'")), this.#_.goTxt(this.#G, this.#U === 0), this.#z = !1, this.#U = 0) : this.isCur && this.#_.noticeCompTxt();
						return;
					case "add":
						{
							let e = JSON.parse(u), { style: t = "", wait: n = null } = e, { cl: i, sty: a } = this.#H(!0, n ? r(n) : null);
							this.#G.push(`<span${i} style='${a} display: inline; ${t}'>`), delete e.style, this.#q(e);
						}
						return;
					case "add_close":
						this.#G.push("</span>"), this.#J();
						return;
					case "grp":
						this.#z = !0;
						{
							let e = JSON.parse(u);
							if (e.id ??= String(this.#G.length), e.id === "break") {
								this.#_.dispBreak(e);
								return;
							}
							this.#W = !1, e.delay = this.#U, e.r ??= "", e.style ??= "", e.r_style ??= "";
							let { r: t, wait: n = null, r_style: i } = e, { cl: a, sty: s, lnk: c } = this.#H(!0, n ? r(n) : null);
							o = `<span${a} style='${s} ${e.style}'><ruby><span data-cmd='grp' data-arg='${JSON.stringify(e)}'${c} style='${s} display: inline;'>&emsp;</span><rt${c}${this.#I("　", t, this.#L, this.#y.style.cssText + (this.#K.at(-1)?.o.r_style ?? "") + i)}>${e.r}</rt></ruby></span>`;
						}
						break;
					case "tcy":
						this.#W = !1, this.#z = !0;
						{
							let { t: n = "", r: a = "", wait: c = null, style: l = "", r_style: d = "" } = JSON.parse(u);
							e.#t.doRecLog() && (this.#X += t + (i ? `《${i}》` : ""), this.#Z += n);
							let f = s.isSafari ? a.replaceAll(/[A-Za-z0-9]/g, (e) => String.fromCharCode(e.charCodeAt(0) + 65248)) : a, { cl: p, sty: m, lnk: h } = this.#H(!0, c ? r(c) : null);
							o = `<span${p} style='${m}${this.#j(n)} ${l}'><ruby><span${h} style='${m} display: inline; text-combine-upright: all;'>${n}</span><rt${h}${this.#I(n, f, this.#L, this.#y.style.cssText + (this.#K.at(-1)?.o.r_style ?? "") + d)}>${f}</rt></ruby></span>`;
						}
						break;
					case "del":
						N.delBreak();
						return;
					case "span":
						this.#z = !0, this.#Y(JSON.parse(u));
						return;
					case "link":
						this.#z = !0;
						{
							let e = JSON.parse(u);
							e[":link"] = " data-lnk='@'";
							let { cl: t, sty: n, curpos: i } = this.#H(!1, e.wait ? r(e.wait) : null);
							this.#G.push(`<span${t} style='${n} display: inline; ${e.style ?? ""}' ${i} data-arg='${u}'>`), delete e.style, this.#Y(e);
						}
						return;
					case "endlink":
						this.#z = !0, this.#G.push("</span>"), this.#J();
						return;
					default: this.#z = !0, o = this.#V(t, i, this.#L);
				}
				break;
		}
		this.#G.push(e.#P(o));
	};
	#V(t, n, r) {
		let i = t === " " ? "&nbsp;" : t === "　" ? "&emsp;" : t;
		e.#t.doRecLog() && (this.#X += i + (n ? `《${n}》` : ""), t !== " " && (this.#Z += t));
		let { cl: a, sty: o, lnk: s } = this.#H(!0, null, t);
		return n ? `<span${a} style='${o} ${this.#j(t)}'><ruby>${Array.from(t).map((e, n) => `<span${a}${s} style='${n > 0 ? this.#H(!0, null, t).sty : o} display: inline;'>${e === " " ? "&nbsp;" : e === "　" ? "&emsp;" : e}</span>`).join("")}<rt${s}${this.#I(t, n, r, this.#y.style.cssText + (this.#K.at(-1)?.o.r_style ?? ""))}>${n}</rt></ruby></span>` : `<span${a} style='${o} ${this.#j(t)}'${s}>${i}</span>`;
	}
	#H(t, n, i = "\n") {
		let a = this.#w ? n ?? this.#K.at(0)?.o.wait ?? (e.#l ? e.#u[i.at(0) ?? ""] ?? 0 : e.msecChWait) : 0;
		e.#s.isSkipping ? this.#U = 0 : t && this.#w && (this.#U += r(a));
		let o = `data-add='{"ch_in_style":"${this.#C}", "ch_out_style":"${this.#E}"}'`;
		return {
			cl: ` class='sn_ch sn_ch_yet sn_ch_in_${this.#C}'`,
			sty: `animation-delay: ${String(this.#U)}ms;${this.#K.at(-1)?.o.style ?? ""}`,
			lnk: (this.#K.at(0)?.o[":link"] ?? "") + " " + o,
			curpos: o
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
		let t = this.#K.at(-1);
		if (!t) {
			this.#q(e);
			return;
		}
		t.o = {
			...t.o,
			...e
		}, !e.style && !e.r_style && (t.o.style = "", t.o.r_style = ""), e.r_align && (this.#L = e.r_align), this.#S(e), this.#T(e);
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
	addButton = (t) => new Promise((n) => {
		t.key = `btn=[${String(this.#x.children.length)}] ` + this.name_, t[":id_tag"] = t.key.slice(0, -7), o(t, "hint_tate", this.#_.tategaki);
		let r = new x(t, e.#s, () => n(), () => this.canFocus());
		r.name = JSON.stringify(t).replaceAll("\"", "'"), this.#x.addChild(r);
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
		b_do: this.#h === void 0 ? void 0 : this.#h instanceof d ? "Sprite" : "Graphics",
		b_pic: this.#g,
		b_color: this.#f,
		b_alpha: this.#p,
		b_alpha_isfixed: this.#m,
		ffs: this.#A,
		txs: this.#_.record(),
		strNoFFS: this.#M,
		btns: this.#x.children.map((e) => e.name)
	});
	playback(e, t) {
		super.playback(e, t), this.enabled = e.enabled, this.#y.style.cssText = e.r_cssText, this.#L = e.r_align, this.cvsResize(), this.#k(e), this.#_.playback(e.txs), this.#p = e.b_alpha, this.#m = e.b_alpha_isfixed, t.push(new Promise((t) => {
			let n = e.b_do ? e.b_do === "Sprite" ? { b_pic: e.b_pic } : { b_color: e.b_color } : { b_pic: "" };
			n.b_alpha = e.b_alpha, n.b_alpha_isfixed = e.b_alpha_isfixed, this.#O(n, (e) => {
				e && t();
			}) || t();
		}), ...e.btns.map((e) => this.addButton(JSON.parse(e.replaceAll("'", "\"")))).flat());
	}
	get cssText() {
		return this.#_.cssText;
	}
	set cssText(e) {
		this.#_.cssText = e;
	}
	snapshot(e, t) {
		e.render(this.ctn, { clear: !1 }), this.#_.snapshot(e, t);
	}
	snapshot_end() {
		this.#_.snapshot_end();
	}
	makeDesignCast(e) {
		this.ctn.visible && this.#_.makeDesignCast(e);
	}
	makeDesignCastChildren(e) {
		if (this.ctn.visible) for (let t of this.#x.children) t.makeDesignCast(e);
	}
	showDesignCast() {
		this.#_.showDesignCast();
	}
	showDesignCastChildren() {
		for (let e of this.#x.children) e.showDesignCast();
	}
	dump() {
		return this.#B("", "gotxt｜"), super.dump() + `, "enabled":"${String(this.enabled)}", ${this.#_.dump()}, "b_pic":"${this.#g}", "b_color":"${String(this.#f)}", "b_alpha":${String(this.#p)}, "b_alpha_isfixed":"${String(this.#m)}", "width":${String(this.#_.getWidth)}, "height":${String(this.#_.getHeight)}, "pixi_obj":[${this.ctn.children.map((e) => `{"class":"${e instanceof d ? "Sprite" : e instanceof f ? "Graphics" : e instanceof u ? "Container" : "?"}", "name":"${e.name}", "alpha":${String(e.alpha)}, "x":${String(e.x)}, "y":${String(e.y)}, "visible":"${String(e.visible)}"}`).join(",")}], "button":[${this.#x.children.map((e) => e.children[0]?.name ?? "{}").join(",")}]`;
	}
};
//#endregion
export { P as TxtLayer, N as t };

//# sourceMappingURL=TxtLayer.js.map