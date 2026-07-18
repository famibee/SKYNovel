import { i as e, m as t, n, o as r, r as i, s as a, t as o } from "./CmnLib.js";
import { _ as s, m as c } from "./pixi.js";
import { t as l } from "./EventListenerCtn.js";
import { n as u } from "./ConfigBase.js";
import { t as d } from "./SysBase.js";
import { n as f, t as p } from "./Reading.js";
import { Button as m } from "./Button.js";
import { TxtLayer as h } from "./TxtLayer.js";
//#region src/sn/FocusMng.ts
var g = class {
	#e = [];
	#t = -1;
	#n = new l();
	constructor(e, t) {
		this.#a = t.isApp ? () => e.focus() : () => globalThis.focus();
	}
	destroy() {
		this.#e = [], this.#t = -1, this.#n.clear();
	}
	add(t, n, r) {
		if (this.#e.findIndex((e) => e.btn === t) >= 0) return;
		if (t instanceof c) {
			t.on("pointerdown", () => {
				for (let e = this.#e.length - 1; e >= 0; --e) if (this.#e[e].btn === t) {
					this.#t = e;
					return;
				}
				this.#t = -1;
			}), this.#e.push({
				btn: t,
				on: n,
				off: r
			});
			return;
		}
		this.#n.add(t, "focus", () => {
			for (let e = this.#e.length - 1; e >= 0; --e) if (this.#e[e].btn === t) {
				this.#t = e;
				return;
			}
			this.#t = -1;
		});
		let i = (e) => {}, a = t.localName === "button" || t.localName === "a" ? (e) => !e.isTrusted && e.key === "Enter" : (e) => e.key === "Enter", o = t;
		switch (o.type ?? "") {
			case "checkbox":
				i = () => {
					o.checked = !o.checked;
				};
				break;
			case "":
				t.querySelectorAll("input[type]").length > 0 && (i = (e) => this.#r(t, e.key), a = () => !1);
				break;
			case "range":
				i = (e) => {
					e.isTrusted || (e.key === "ArrowUp" ? o.stepUp() : o.stepDown());
				};
				break;
			case "text":
			case "textarea":
				i = (e) => {
					if (e.isTrusted) return;
					let t = (o.selectionStart ?? 0) + (e.key === "ArrowUp" ? -1 : 1);
					t < 0 && (t = 0), o.setSelectionRange(t, t);
				};
				break;
		}
		this.#n.add(t, e, (e) => {
			if (!(e.key !== "ArrowUp" && e.key !== "ArrowDown" && e.key !== "Enter")) {
				if (e.stopImmediatePropagation(), a(e)) {
					t.dispatchEvent(new MouseEvent("click"));
					return;
				}
				i(e);
			}
		}, { passive: !0 }), t.hasAttribute("tabindex") || (t.tabIndex = 0), this.#e.push({
			btn: t,
			on: n,
			off: r
		});
	}
	remove(e) {
		let t = this.#e.findIndex((t) => t.btn === e);
		t < 0 || (this.#e.splice(t, 1), this.#e.length === 0 ? this.#t = -1 : t <= this.#t && --this.#t);
	}
	#r(e, t) {
		let n = e.querySelectorAll("input[type]"), r = n.length;
		for (let e = 0; e < r; ++e) if (n[e].checked) {
			n[(e + r + (t === "ArrowUp" ? -1 : 1)) % r].checked = !0;
			break;
		}
	}
	isFocus(e) {
		return this.#t < 0 ? !1 : this.#e[this.#t].btn === e;
	}
	prev() {
		this.#o();
		let e = this.#e.length;
		if (e !== 0) {
			--this.#t < 0 && (this.#t = e - 1);
			for (let t = e; t >= 1; --t) {
				let n = (this.#t + t) % e;
				if (this.#e[n].on()) {
					this.#t = n, this.#i(n);
					return;
				}
			}
			this.#t = -1;
		}
	}
	next() {
		this.#o();
		let e = this.#e.length;
		if (e !== 0) {
			++this.#t >= e && (this.#t = 0);
			for (let t = 0; t < e; ++t) {
				let n = (this.#t + t) % e;
				if (this.#e[n].on()) {
					this.#t = n, this.#i(n);
					return;
				}
			}
			this.#t = -1;
		}
	}
	#i = o.debugLog ? (e) => console.log(`👾 <FocusMng idx:${String(e)} btn:%o`, this.#e[e].btn) : () => {};
	getFocus() {
		if (this.#t < 0) return null;
		this.#o(), this.#t >= this.#e.length && (this.#t = 0);
		let e = this.#e[this.#t];
		return e.on() ? e.btn : null;
	}
	blur() {
		this.#o(), this.#t = -1, this.#a();
	}
	#a = () => {};
	#o() {
		for (let e = this.#e.length - 1; e >= 0; --e) {
			let t = this.#e[e];
			!(t.btn instanceof c) || t.btn.parent ? t.off() : this.#e.splice(e, 1);
		}
	}
}, _ = "bottom", v = "right", y = "left", b = "auto", x = [
	"top",
	_,
	v,
	y
], S = "start", C = "clippingParents", w = "viewport", T = "popper", E = "reference", D = /*#__PURE__*/ x.reduce(function(e, t) {
	return e.concat([t + "-" + S, t + "-end"]);
}, []), O = /*#__PURE__*/ [].concat(x, [b]).reduce(function(e, t) {
	return e.concat([
		t,
		t + "-" + S,
		t + "-end"
	]);
}, []), k = [
	"beforeRead",
	"read",
	"afterRead",
	"beforeMain",
	"main",
	"afterMain",
	"beforeWrite",
	"write",
	"afterWrite"
];
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function A(e) {
	return e ? (e.nodeName || "").toLowerCase() : null;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function j(e) {
	if (e == null) return window;
	if (e.toString() !== "[object Window]") {
		var t = e.ownerDocument;
		return t && t.defaultView || window;
	}
	return e;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function M(e) {
	return e instanceof j(e).Element || e instanceof Element;
}
function N(e) {
	return e instanceof j(e).HTMLElement || e instanceof HTMLElement;
}
function P(e) {
	return typeof ShadowRoot > "u" ? !1 : e instanceof j(e).ShadowRoot || e instanceof ShadowRoot;
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function F(e) {
	var t = e.state;
	Object.keys(t.elements).forEach(function(e) {
		var n = t.styles[e] || {}, r = t.attributes[e] || {}, i = t.elements[e];
		!N(i) || !A(i) || (Object.assign(i.style, n), Object.keys(r).forEach(function(e) {
			var t = r[e];
			t === !1 ? i.removeAttribute(e) : i.setAttribute(e, t === !0 ? "" : t);
		}));
	});
}
function I(e) {
	var t = e.state, n = {
		popper: {
			position: t.options.strategy,
			left: "0",
			top: "0",
			margin: "0"
		},
		arrow: { position: "absolute" },
		reference: {}
	};
	return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function() {
		Object.keys(t.elements).forEach(function(e) {
			var r = t.elements[e], i = t.attributes[e] || {}, a = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce(function(e, t) {
				return e[t] = "", e;
			}, {});
			!N(r) || !A(r) || (Object.assign(r.style, a), Object.keys(i).forEach(function(e) {
				r.removeAttribute(e);
			}));
		});
	};
}
var ee = {
	name: "applyStyles",
	enabled: !0,
	phase: "write",
	fn: F,
	effect: I,
	requires: ["computeStyles"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function L(e) {
	return e.split("-")[0];
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/math.js
var R = Math.max, te = Math.min, z = Math.round;
//#endregion
//#region node_modules/@popperjs/core/lib/utils/userAgent.js
function B() {
	var e = navigator.userAgentData;
	return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(e) {
		return e.brand + "/" + e.version;
	}).join(" ") : navigator.userAgent;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function ne() {
	return !/^((?!chrome|android).)*safari/i.test(B());
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function V(e, t, n) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	var r = e.getBoundingClientRect(), i = 1, a = 1;
	t && N(e) && (i = e.offsetWidth > 0 && z(r.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && z(r.height) / e.offsetHeight || 1);
	var o = (M(e) ? j(e) : window).visualViewport, s = !ne() && n, c = (r.left + (s && o ? o.offsetLeft : 0)) / i, l = (r.top + (s && o ? o.offsetTop : 0)) / a, u = r.width / i, d = r.height / a;
	return {
		width: u,
		height: d,
		top: l,
		right: c + u,
		bottom: l + d,
		left: c,
		x: c,
		y: l
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function re(e) {
	var t = V(e), n = e.offsetWidth, r = e.offsetHeight;
	return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
		x: e.offsetLeft,
		y: e.offsetTop,
		width: n,
		height: r
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/contains.js
function ie(e, t) {
	var n = t.getRootNode && t.getRootNode();
	if (e.contains(t)) return !0;
	if (n && P(n)) {
		var r = t;
		do {
			if (r && e.isSameNode(r)) return !0;
			r = r.parentNode || r.host;
		} while (r);
	}
	return !1;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function H(e) {
	return j(e).getComputedStyle(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function ae(e) {
	return [
		"table",
		"td",
		"th"
	].indexOf(A(e)) >= 0;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function U(e) {
	return ((M(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function W(e) {
	return A(e) === "html" ? e : e.assignedSlot || e.parentNode || (P(e) ? e.host : null) || U(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function oe(e) {
	return !N(e) || H(e).position === "fixed" ? null : e.offsetParent;
}
function se(e) {
	var t = /firefox/i.test(B());
	if (/Trident/i.test(B()) && N(e) && H(e).position === "fixed") return null;
	var n = W(e);
	for (P(n) && (n = n.host); N(n) && ["html", "body"].indexOf(A(n)) < 0;) {
		var r = H(n);
		if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none") return n;
		n = n.parentNode;
	}
	return null;
}
function G(e) {
	for (var t = j(e), n = oe(e); n && ae(n) && H(n).position === "static";) n = oe(n);
	return n && (A(n) === "html" || A(n) === "body" && H(n).position === "static") ? t : n || se(e) || t;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function ce(e) {
	return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/within.js
function K(e, t, n) {
	return R(e, te(t, n));
}
function le(e, t, n) {
	var r = K(e, t, n);
	return r > n ? n : r;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function ue() {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function q(e) {
	return Object.assign({}, ue(), e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function de(e, t) {
	return t.reduce(function(t, n) {
		return t[n] = e, t;
	}, {});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/arrow.js
var fe = function(e, t) {
	return e = typeof e == "function" ? e(Object.assign({}, t.rects, { placement: t.placement })) : e, q(typeof e == "number" ? de(e, x) : e);
};
function pe(e) {
	var t, n = e.state, r = e.name, i = e.options, a = n.elements.arrow, o = n.modifiersData.popperOffsets, s = L(n.placement), c = ce(s), l = ["left", "right"].indexOf(s) >= 0 ? "height" : "width";
	if (!(!a || !o)) {
		var u = fe(i.padding, n), d = re(a), f = c === "y" ? "top" : y, p = c === "y" ? _ : v, m = n.rects.reference[l] + n.rects.reference[c] - o[c] - n.rects.popper[l], h = o[c] - n.rects.reference[c], g = G(a), b = g ? c === "y" ? g.clientHeight || 0 : g.clientWidth || 0 : 0, x = m / 2 - h / 2, S = u[f], C = b - d[l] - u[p], w = b / 2 - d[l] / 2 + x, T = K(S, w, C), E = c;
		n.modifiersData[r] = (t = {}, t[E] = T, t.centerOffset = T - w, t);
	}
}
function me(e) {
	var t = e.state, n = e.options.element, r = n === void 0 ? "[data-popper-arrow]" : n;
	r != null && (typeof r == "string" && (r = t.elements.popper.querySelector(r), !r) || ie(t.elements.popper, r) && (t.elements.arrow = r));
}
var he = {
	name: "arrow",
	enabled: !0,
	phase: "main",
	fn: pe,
	effect: me,
	requires: ["popperOffsets"],
	requiresIfExists: ["preventOverflow"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getVariation.js
function J(e) {
	return e.split("-")[1];
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var ge = {
	top: "auto",
	right: "auto",
	bottom: "auto",
	left: "auto"
};
function _e(e, t) {
	var n = e.x, r = e.y, i = t.devicePixelRatio || 1;
	return {
		x: z(n * i) / i || 0,
		y: z(r * i) / i || 0
	};
}
function Y(e) {
	var t, n = e.popper, r = e.popperRect, i = e.placement, a = e.variation, o = e.offsets, s = e.position, c = e.gpuAcceleration, l = e.adaptive, u = e.roundOffsets, d = e.isFixed, f = o.x, p = f === void 0 ? 0 : f, m = o.y, h = m === void 0 ? 0 : m, g = typeof u == "function" ? u({
		x: p,
		y: h
	}) : {
		x: p,
		y: h
	};
	p = g.x, h = g.y;
	var b = o.hasOwnProperty("x"), x = o.hasOwnProperty("y"), S = y, C = "top", w = window;
	if (l) {
		var T = G(n), E = "clientHeight", D = "clientWidth";
		if (T === j(n) && (T = U(n), H(T).position !== "static" && s === "absolute" && (E = "scrollHeight", D = "scrollWidth")), T = T, i === "top" || (i === "left" || i === "right") && a === "end") {
			C = _;
			var O = d && T === w && w.visualViewport ? w.visualViewport.height : T[E];
			h -= O - r.height, h *= c ? 1 : -1;
		}
		if (i === "left" || (i === "top" || i === "bottom") && a === "end") {
			S = v;
			var k = d && T === w && w.visualViewport ? w.visualViewport.width : T[D];
			p -= k - r.width, p *= c ? 1 : -1;
		}
	}
	var A = Object.assign({ position: s }, l && ge), M = u === !0 ? _e({
		x: p,
		y: h
	}, j(n)) : {
		x: p,
		y: h
	};
	if (p = M.x, h = M.y, c) {
		var N;
		return Object.assign({}, A, (N = {}, N[C] = x ? "0" : "", N[S] = b ? "0" : "", N.transform = (w.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + h + "px)" : "translate3d(" + p + "px, " + h + "px, 0)", N));
	}
	return Object.assign({}, A, (t = {}, t[C] = x ? h + "px" : "", t[S] = b ? p + "px" : "", t.transform = "", t));
}
function ve(e) {
	var t = e.state, n = e.options, r = n.gpuAcceleration, i = r === void 0 || r, a = n.adaptive, o = a === void 0 || a, s = n.roundOffsets, c = s === void 0 || s, l = {
		placement: L(t.placement),
		variation: J(t.placement),
		popper: t.elements.popper,
		popperRect: t.rects.popper,
		gpuAcceleration: i,
		isFixed: t.options.strategy === "fixed"
	};
	t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Y(Object.assign({}, l, {
		offsets: t.modifiersData.popperOffsets,
		position: t.options.strategy,
		adaptive: o,
		roundOffsets: c
	})))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Y(Object.assign({}, l, {
		offsets: t.modifiersData.arrow,
		position: "absolute",
		adaptive: !1,
		roundOffsets: c
	})))), t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-placement": t.placement });
}
var ye = {
	name: "computeStyles",
	enabled: !0,
	phase: "beforeWrite",
	fn: ve,
	data: {}
}, X = { passive: !0 };
function be(e) {
	var t = e.state, n = e.instance, r = e.options, i = r.scroll, a = i === void 0 || i, o = r.resize, s = o === void 0 || o, c = j(t.elements.popper), l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
	return a && l.forEach(function(e) {
		e.addEventListener("scroll", n.update, X);
	}), s && c.addEventListener("resize", n.update, X), function() {
		a && l.forEach(function(e) {
			e.removeEventListener("scroll", n.update, X);
		}), s && c.removeEventListener("resize", n.update, X);
	};
}
var xe = {
	name: "eventListeners",
	enabled: !0,
	phase: "write",
	fn: function() {},
	effect: be,
	data: {}
}, Se = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Z(e) {
	return e.replace(/left|right|bottom|top/g, function(e) {
		return Se[e];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var Ce = {
	start: "end",
	end: "start"
};
function we(e) {
	return e.replace(/start|end/g, function(e) {
		return Ce[e];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function Te(e) {
	var t = j(e);
	return {
		scrollLeft: t.pageXOffset,
		scrollTop: t.pageYOffset
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function Ee(e) {
	return V(U(e)).left + Te(e).scrollLeft;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function De(e, t) {
	var n = j(e), r = U(e), i = n.visualViewport, a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
	if (i) {
		a = i.width, o = i.height;
		var l = ne();
		(l || !l && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
	}
	return {
		width: a,
		height: o,
		x: s + Ee(e),
		y: c
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function Oe(e) {
	var t = U(e), n = Te(e), r = e.ownerDocument?.body, i = R(t.scrollWidth, t.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), a = R(t.scrollHeight, t.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), o = -n.scrollLeft + Ee(e), s = -n.scrollTop;
	return H(r || t).direction === "rtl" && (o += R(t.clientWidth, r ? r.clientWidth : 0) - i), {
		width: i,
		height: a,
		x: o,
		y: s
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function ke(e) {
	var t = H(e), n = t.overflow, r = t.overflowX, i = t.overflowY;
	return /auto|scroll|overlay|hidden/.test(n + i + r);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function Ae(e) {
	return [
		"html",
		"body",
		"#document"
	].indexOf(A(e)) >= 0 ? e.ownerDocument.body : N(e) && ke(e) ? e : Ae(W(e));
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function je(e, t) {
	t === void 0 && (t = []);
	var n = Ae(e), r = n === e.ownerDocument?.body, i = j(n), a = r ? [i].concat(i.visualViewport || [], ke(n) ? n : []) : n, o = t.concat(a);
	return r ? o : o.concat(je(W(a)));
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function Me(e) {
	return Object.assign({}, e, {
		left: e.x,
		top: e.y,
		right: e.x + e.width,
		bottom: e.y + e.height
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function Ne(e, t) {
	var n = V(e, !1, t === "fixed");
	return n.top += e.clientTop, n.left += e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Pe(e, t, n) {
	return t === "viewport" ? Me(De(e, n)) : M(t) ? Ne(t, n) : Me(Oe(U(e)));
}
function Fe(e) {
	var t = je(W(e)), n = ["absolute", "fixed"].indexOf(H(e).position) >= 0 && N(e) ? G(e) : e;
	return M(n) ? t.filter(function(e) {
		return M(e) && ie(e, n) && A(e) !== "body";
	}) : [];
}
function Ie(e, t, n, r) {
	var i = t === "clippingParents" ? Fe(e) : [].concat(t), a = [].concat(i, [n]), o = a[0], s = a.reduce(function(t, n) {
		var i = Pe(e, n, r);
		return t.top = R(i.top, t.top), t.right = te(i.right, t.right), t.bottom = te(i.bottom, t.bottom), t.left = R(i.left, t.left), t;
	}, Pe(e, o, r));
	return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeOffsets.js
function Le(e) {
	var t = e.reference, n = e.element, r = e.placement, i = r ? L(r) : null, a = r ? J(r) : null, o = t.x + t.width / 2 - n.width / 2, s = t.y + t.height / 2 - n.height / 2, c;
	switch (i) {
		case "top":
			c = {
				x: o,
				y: t.y - n.height
			};
			break;
		case _:
			c = {
				x: o,
				y: t.y + t.height
			};
			break;
		case v:
			c = {
				x: t.x + t.width,
				y: s
			};
			break;
		case y:
			c = {
				x: t.x - n.width,
				y: s
			};
			break;
		default: c = {
			x: t.x,
			y: t.y
		};
	}
	var l = i ? ce(i) : null;
	if (l != null) {
		var u = l === "y" ? "height" : "width";
		switch (a) {
			case S:
				c[l] = c[l] - (t[u] / 2 - n[u] / 2);
				break;
			case "end":
				c[l] = c[l] + (t[u] / 2 - n[u] / 2);
				break;
			default:
		}
	}
	return c;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/detectOverflow.js
function Q(e, t) {
	t === void 0 && (t = {});
	var n = t, r = n.placement, i = r === void 0 ? e.placement : r, a = n.strategy, o = a === void 0 ? e.strategy : a, s = n.boundary, c = s === void 0 ? C : s, l = n.rootBoundary, u = l === void 0 ? w : l, d = n.elementContext, f = d === void 0 ? T : d, p = n.altBoundary, m = p !== void 0 && p, h = n.padding, g = h === void 0 ? 0 : h, _ = q(typeof g == "number" ? de(g, x) : g), v = f === "popper" ? E : T, y = e.rects.popper, b = e.elements[m ? v : f], S = Ie(M(b) ? b : b.contextElement || U(e.elements.popper), c, u, o), D = V(e.elements.reference), O = Le({
		reference: D,
		element: y,
		strategy: "absolute",
		placement: i
	}), k = Me(Object.assign({}, y, O)), A = f === "popper" ? k : D, j = {
		top: S.top - A.top + _.top,
		bottom: A.bottom - S.bottom + _.bottom,
		left: S.left - A.left + _.left,
		right: A.right - S.right + _.right
	}, N = e.modifiersData.offset;
	if (f === "popper" && N) {
		var P = N[i];
		Object.keys(j).forEach(function(e) {
			var t = ["right", "bottom"].indexOf(e) >= 0 ? 1 : -1, n = ["top", "bottom"].indexOf(e) >= 0 ? "y" : "x";
			j[e] += P[n] * t;
		});
	}
	return j;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function Re(e, t) {
	t === void 0 && (t = {});
	var n = t, r = n.placement, i = n.boundary, a = n.rootBoundary, o = n.padding, s = n.flipVariations, c = n.allowedAutoPlacements, l = c === void 0 ? O : c, u = J(r), d = u ? s ? D : D.filter(function(e) {
		return J(e) === u;
	}) : x, f = d.filter(function(e) {
		return l.indexOf(e) >= 0;
	});
	f.length === 0 && (f = d);
	var p = f.reduce(function(t, n) {
		return t[n] = Q(e, {
			placement: n,
			boundary: i,
			rootBoundary: a,
			padding: o
		})[L(n)], t;
	}, {});
	return Object.keys(p).sort(function(e, t) {
		return p[e] - p[t];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/flip.js
function ze(e) {
	if (L(e) === "auto") return [];
	var t = Z(e);
	return [
		we(e),
		t,
		we(t)
	];
}
function Be(e) {
	var t = e.state, n = e.options, r = e.name;
	if (!t.modifiersData[r]._skip) {
		for (var i = n.mainAxis, a = i === void 0 || i, o = n.altAxis, s = o === void 0 || o, c = n.fallbackPlacements, l = n.padding, u = n.boundary, d = n.rootBoundary, f = n.altBoundary, p = n.flipVariations, m = p === void 0 || p, h = n.allowedAutoPlacements, g = t.options.placement, b = L(g) === g, x = c || (b || !m ? [Z(g)] : ze(g)), C = [g].concat(x).reduce(function(e, n) {
			return e.concat(L(n) === "auto" ? Re(t, {
				placement: n,
				boundary: u,
				rootBoundary: d,
				padding: l,
				flipVariations: m,
				allowedAutoPlacements: h
			}) : n);
		}, []), w = t.rects.reference, T = t.rects.popper, E = /* @__PURE__ */ new Map(), D = !0, O = C[0], k = 0; k < C.length; k++) {
			var A = C[k], j = L(A), M = J(A) === S, N = ["top", _].indexOf(j) >= 0, P = N ? "width" : "height", F = Q(t, {
				placement: A,
				boundary: u,
				rootBoundary: d,
				altBoundary: f,
				padding: l
			}), I = N ? M ? v : y : M ? _ : "top";
			w[P] > T[P] && (I = Z(I));
			var ee = Z(I), R = [];
			if (a && R.push(F[j] <= 0), s && R.push(F[I] <= 0, F[ee] <= 0), R.every(function(e) {
				return e;
			})) {
				O = A, D = !1;
				break;
			}
			E.set(A, R);
		}
		if (D) for (var te = m ? 3 : 1, z = function(e) {
			var t = C.find(function(t) {
				var n = E.get(t);
				if (n) return n.slice(0, e).every(function(e) {
					return e;
				});
			});
			if (t) return O = t, "break";
		}, B = te; B > 0 && z(B) !== "break"; B--);
		t.placement !== O && (t.modifiersData[r]._skip = !0, t.placement = O, t.reset = !0);
	}
}
var Ve = {
	name: "flip",
	enabled: !0,
	phase: "main",
	fn: Be,
	requiresIfExists: ["offset"],
	data: { _skip: !1 }
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/hide.js
function He(e, t, n) {
	return n === void 0 && (n = {
		x: 0,
		y: 0
	}), {
		top: e.top - t.height - n.y,
		right: e.right - t.width + n.x,
		bottom: e.bottom - t.height + n.y,
		left: e.left - t.width - n.x
	};
}
function Ue(e) {
	return [
		"top",
		v,
		_,
		y
	].some(function(t) {
		return e[t] >= 0;
	});
}
function We(e) {
	var t = e.state, n = e.name, r = t.rects.reference, i = t.rects.popper, a = t.modifiersData.preventOverflow, o = Q(t, { elementContext: "reference" }), s = Q(t, { altBoundary: !0 }), c = He(o, r), l = He(s, i, a), u = Ue(c), d = Ue(l);
	t.modifiersData[n] = {
		referenceClippingOffsets: c,
		popperEscapeOffsets: l,
		isReferenceHidden: u,
		hasPopperEscaped: d
	}, t.attributes.popper = Object.assign({}, t.attributes.popper, {
		"data-popper-reference-hidden": u,
		"data-popper-escaped": d
	});
}
var Ge = {
	name: "hide",
	enabled: !0,
	phase: "main",
	requiresIfExists: ["preventOverflow"],
	fn: We
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/offset.js
function Ke(e, t, n) {
	var r = L(e), i = ["left", "top"].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, t, { placement: e })) : n, o = a[0], s = a[1];
	return o ||= 0, s = (s || 0) * i, ["left", "right"].indexOf(r) >= 0 ? {
		x: s,
		y: o
	} : {
		x: o,
		y: s
	};
}
function qe(e) {
	var t = e.state, n = e.options, r = e.name, i = n.offset, a = i === void 0 ? [0, 0] : i, o = O.reduce(function(e, n) {
		return e[n] = Ke(n, t.rects, a), e;
	}, {}), s = o[t.placement], c = s.x, l = s.y;
	t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += l), t.modifiersData[r] = o;
}
var Je = {
	name: "offset",
	enabled: !0,
	phase: "main",
	requires: ["popperOffsets"],
	fn: qe
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function Ye(e) {
	var t = e.state, n = e.name;
	t.modifiersData[n] = Le({
		reference: t.rects.reference,
		element: t.rects.popper,
		strategy: "absolute",
		placement: t.placement
	});
}
var Xe = {
	name: "popperOffsets",
	enabled: !0,
	phase: "read",
	fn: Ye,
	data: {}
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getAltAxis.js
function Ze(e) {
	return e === "x" ? "y" : "x";
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function Qe(e) {
	var t = e.state, n = e.options, r = e.name, i = n.mainAxis, a = i === void 0 || i, o = n.altAxis, s = o !== void 0 && o, c = n.boundary, l = n.rootBoundary, u = n.altBoundary, d = n.padding, f = n.tether, p = f === void 0 || f, m = n.tetherOffset, h = m === void 0 ? 0 : m, g = Q(t, {
		boundary: c,
		rootBoundary: l,
		padding: d,
		altBoundary: u
	}), b = L(t.placement), x = J(t.placement), S = !x, C = ce(b), w = Ze(C), T = t.modifiersData.popperOffsets, E = t.rects.reference, D = t.rects.popper, O = typeof h == "function" ? h(Object.assign({}, t.rects, { placement: t.placement })) : h, k = typeof O == "number" ? {
		mainAxis: O,
		altAxis: O
	} : Object.assign({
		mainAxis: 0,
		altAxis: 0
	}, O), A = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, j = {
		x: 0,
		y: 0
	};
	if (T) {
		if (a) {
			var M = C === "y" ? "top" : y, N = C === "y" ? _ : v, P = C === "y" ? "height" : "width", F = T[C], I = F + g[M], ee = F - g[N], z = p ? -D[P] / 2 : 0, B = x === "start" ? E[P] : D[P], ne = x === "start" ? -D[P] : -E[P], V = t.elements.arrow, ie = p && V ? re(V) : {
				width: 0,
				height: 0
			}, H = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : ue(), ae = H[M], U = H[N], W = K(0, E[P], ie[P]), oe = S ? E[P] / 2 - z - W - ae - k.mainAxis : B - W - ae - k.mainAxis, se = S ? -E[P] / 2 + z + W + U + k.mainAxis : ne + W + U + k.mainAxis, q = t.elements.arrow && G(t.elements.arrow), de = q ? C === "y" ? q.clientTop || 0 : q.clientLeft || 0 : 0, fe = A?.[C] ?? 0, pe = F + oe - fe - de, me = F + se - fe, he = K(p ? te(I, pe) : I, F, p ? R(ee, me) : ee);
			T[C] = he, j[C] = he - F;
		}
		if (s) {
			var ge = C === "x" ? "top" : y, _e = C === "x" ? _ : v, Y = T[w], ve = w === "y" ? "height" : "width", ye = Y + g[ge], X = Y - g[_e], be = ["top", y].indexOf(b) !== -1, xe = A?.[w] ?? 0, Se = be ? ye : Y - E[ve] - D[ve] - xe + k.altAxis, Z = be ? Y + E[ve] + D[ve] - xe - k.altAxis : X, Ce = p && be ? le(Se, Y, Z) : K(p ? Se : ye, Y, p ? Z : X);
			T[w] = Ce, j[w] = Ce - Y;
		}
		t.modifiersData[r] = j;
	}
}
var $e = {
	name: "preventOverflow",
	enabled: !0,
	phase: "main",
	fn: Qe,
	requiresIfExists: ["offset"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function et(e) {
	return {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function tt(e) {
	return e === j(e) || !N(e) ? Te(e) : et(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function nt(e) {
	var t = e.getBoundingClientRect(), n = z(t.width) / e.offsetWidth || 1, r = z(t.height) / e.offsetHeight || 1;
	return n !== 1 || r !== 1;
}
function rt(e, t, n) {
	n === void 0 && (n = !1);
	var r = N(t), i = N(t) && nt(t), a = U(t), o = V(e, i, n), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = {
		x: 0,
		y: 0
	};
	return (r || !r && !n) && ((A(t) !== "body" || ke(a)) && (s = tt(t)), N(t) ? (c = V(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = Ee(a))), {
		x: o.left + s.scrollLeft - c.x,
		y: o.top + s.scrollTop - c.y,
		width: o.width,
		height: o.height
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/orderModifiers.js
function it(e) {
	var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
	e.forEach(function(e) {
		t.set(e.name, e);
	});
	function i(e) {
		n.add(e.name), [].concat(e.requires || [], e.requiresIfExists || []).forEach(function(e) {
			if (!n.has(e)) {
				var r = t.get(e);
				r && i(r);
			}
		}), r.push(e);
	}
	return e.forEach(function(e) {
		n.has(e.name) || i(e);
	}), r;
}
function at(e) {
	var t = it(e);
	return k.reduce(function(e, n) {
		return e.concat(t.filter(function(e) {
			return e.phase === n;
		}));
	}, []);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/debounce.js
function ot(e) {
	var t;
	return function() {
		return t ||= new Promise(function(n) {
			Promise.resolve().then(function() {
				t = void 0, n(e());
			});
		}), t;
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/mergeByName.js
function st(e) {
	var t = e.reduce(function(e, t) {
		var n = e[t.name];
		return e[t.name] = n ? Object.assign({}, n, t, {
			options: Object.assign({}, n.options, t.options),
			data: Object.assign({}, n.data, t.data)
		}) : t, e;
	}, {});
	return Object.keys(t).map(function(e) {
		return t[e];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/createPopper.js
var ct = {
	placement: "bottom",
	modifiers: [],
	strategy: "absolute"
};
function lt() {
	return ![...arguments].some(function(e) {
		return !(e && typeof e.getBoundingClientRect == "function");
	});
}
function ut(e) {
	e === void 0 && (e = {});
	var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, i = t.defaultOptions, a = i === void 0 ? ct : i;
	return function(e, t, n) {
		n === void 0 && (n = a);
		var i = {
			placement: "bottom",
			orderedModifiers: [],
			options: Object.assign({}, ct, a),
			modifiersData: {},
			elements: {
				reference: e,
				popper: t
			},
			attributes: {},
			styles: {}
		}, o = [], s = !1, c = {
			state: i,
			setOptions: function(n) {
				var o = typeof n == "function" ? n(i.options) : n;
				u(), i.options = Object.assign({}, a, i.options, o), i.scrollParents = {
					reference: M(e) ? je(e) : e.contextElement ? je(e.contextElement) : [],
					popper: je(t)
				};
				var s = at(st([].concat(r, i.options.modifiers)));
				return i.orderedModifiers = s.filter(function(e) {
					return e.enabled;
				}), l(), c.update();
			},
			forceUpdate: function() {
				if (!s) {
					var e = i.elements, t = e.reference, n = e.popper;
					if (lt(t, n)) {
						i.rects = {
							reference: rt(t, G(n), i.options.strategy === "fixed"),
							popper: re(n)
						}, i.reset = !1, i.placement = i.options.placement, i.orderedModifiers.forEach(function(e) {
							return i.modifiersData[e.name] = Object.assign({}, e.data);
						});
						for (var r = 0; r < i.orderedModifiers.length; r++) {
							if (i.reset === !0) {
								i.reset = !1, r = -1;
								continue;
							}
							var a = i.orderedModifiers[r], o = a.fn, l = a.options, u = l === void 0 ? {} : l, d = a.name;
							typeof o == "function" && (i = o({
								state: i,
								options: u,
								name: d,
								instance: c
							}) || i);
						}
					}
				}
			},
			update: ot(function() {
				return new Promise(function(e) {
					c.forceUpdate(), e(i);
				});
			}),
			destroy: function() {
				u(), s = !0;
			}
		};
		if (!lt(e, t)) return c;
		c.setOptions(n).then(function(e) {
			!s && n.onFirstUpdate && n.onFirstUpdate(e);
		});
		function l() {
			i.orderedModifiers.forEach(function(e) {
				var t = e.name, n = e.options, r = n === void 0 ? {} : n, a = e.effect;
				if (typeof a == "function") {
					var s = a({
						state: i,
						name: t,
						instance: c,
						options: r
					});
					o.push(s || function() {});
				}
			});
		}
		function u() {
			o.forEach(function(e) {
				return e();
			}), o = [];
		}
		return c;
	};
}
var dt = /*#__PURE__*/ ut({ defaultModifiers: [
	xe,
	Xe,
	ye,
	ee,
	Je,
	Ve,
	$e,
	he,
	Ge
] }), ft = class e {
	constructor(t, n) {
		this.element = t, this.touch1 = null, this.touch2 = null, this.touchStartX = null, this.touchStartY = null, this.touchEndX = null, this.touchEndY = null, this.touchMove1 = null, this.touchMove2 = null, this.touchMoveX = null, this.touchMoveY = null, this.velocityX = null, this.velocityY = null, this.longPressTimer = null, this.doubleTapTimer = null, this.doubleTapWaiting = !1, this.thresholdX = 0, this.thresholdY = 0, this.disregardVelocityThresholdX = 0, this.disregardVelocityThresholdY = 0, this.swipingHorizontal = !1, this.swipingVertical = !1, this.swipingDirection = null, this.swipedHorizontal = !1, this.swipedVertical = !1, this.originalDistance = null, this.newDistance = null, this.scale = null, this.originalAngle = null, this.newAngle = null, this.rotation = null, this.handlers = {
			panstart: [],
			panmove: [],
			panend: [],
			swipeleft: [],
			swiperight: [],
			swipeup: [],
			swipedown: [],
			tap: [],
			doubletap: [],
			longpress: [],
			pinch: [],
			pinchend: [],
			rotate: [],
			rotateend: []
		}, this._onTouchStart = this.onTouchStart.bind(this), this._onTouchMove = this.onTouchMove.bind(this), this._onTouchEnd = this.onTouchEnd.bind(this), this.opts = Object.assign({}, e.defaults, n), this.element.addEventListener("touchstart", this._onTouchStart, $), this.element.addEventListener("touchmove", this._onTouchMove, $), this.element.addEventListener("touchend", this._onTouchEnd, $), this.opts.mouseSupport && !("ontouchstart" in window) && (this.element.addEventListener("mousedown", this._onTouchStart, $), document.addEventListener("mousemove", this._onTouchMove, $), document.addEventListener("mouseup", this._onTouchEnd, $));
	}
	destroy() {
		this.element.removeEventListener("touchstart", this._onTouchStart), this.element.removeEventListener("touchmove", this._onTouchMove), this.element.removeEventListener("touchend", this._onTouchEnd), this.element.removeEventListener("mousedown", this._onTouchStart), document.removeEventListener("mousemove", this._onTouchMove), document.removeEventListener("mouseup", this._onTouchEnd), clearTimeout(this.longPressTimer ?? void 0), clearTimeout(this.doubleTapTimer ?? void 0);
	}
	on(e, t) {
		if (this.handlers[e]) return this.handlers[e].push(t), {
			type: e,
			fn: t,
			cancel: () => this.off(e, t)
		};
	}
	off(e, t) {
		if (this.handlers[e]) {
			let n = this.handlers[e].indexOf(t);
			n !== -1 && this.handlers[e].splice(n, 1);
		}
	}
	fire(e, t) {
		for (let n = 0; n < this.handlers[e].length; n++) this.handlers[e][n](t);
	}
	onTouchStart(e) {
		let t = !1;
		if (e.type !== "mousedown") {
			if (this.touch1 || (this.touch1 = e.changedTouches[0], t = !0), (t && e.changedTouches.length > 1 || !t) && !this.touch2) {
				this.touch2 = [...e.changedTouches].find((e) => e.identifier !== this.touch1?.identifier) || null, this.originalDistance = Math.sqrt(((this.touch2?.screenX ?? 0) - (this.touchMove1?.screenX ?? this.touch1?.screenX ?? 0)) ** 2 + ((this.touch2?.screenY ?? 0) - (this.touchMove1?.screenY ?? this.touch1?.screenY ?? 0)) ** 2), this.originalAngle = Math.atan2((this.touch2?.screenY ?? 0) - (this.touchMove1?.screenY ?? this.touch1?.screenY ?? 0), (this.touch2?.screenX ?? 0) - (this.touchMove1?.screenX ?? this.touch1?.screenX ?? 0)) / (Math.PI / 180);
				return;
			}
			if (!t) return;
		}
		(t || e.type === "mousedown") && (this.thresholdX = this.opts.threshold("x", this), this.thresholdY = this.opts.threshold("y", this), this.disregardVelocityThresholdX = this.opts.disregardVelocityThreshold("x", this), this.disregardVelocityThresholdY = this.opts.disregardVelocityThreshold("y", this), this.touchStartX = e.type === "mousedown" ? e.screenX : this.touch1?.screenX || 0, this.touchStartY = e.type === "mousedown" ? e.screenY : this.touch1?.screenY || 0, this.touchMoveX = null, this.touchMoveY = null, this.touchEndX = null, this.touchEndY = null, this.swipingDirection = null, this.longPressTimer = setTimeout(() => this.fire("longpress", e), this.opts.longPressTime), this.scale = 1, this.rotation = 0, this.fire("panstart", e));
	}
	onTouchMove(e) {
		if (e.type === "mousemove" && (!this.touchStartX || this.touchEndX !== null)) return;
		let t, n;
		if (e.type !== "mousemove" && (t = [...e.changedTouches].find((e) => e.identifier === this.touch1?.identifier), this.touchMove1 = t || this.touchMove1, n = [...e.changedTouches].find((e) => e.identifier === this.touch2?.identifier), this.touchMove2 = n || this.touchMove2), e.type === "mousemove" || t) {
			let n = (e.type === "mousemove" ? e.screenX : t?.screenX ?? 0) - (this.touchStartX ?? 0);
			this.velocityX = n - (this.touchMoveX ?? 0), this.touchMoveX = n;
			let r = (e.type === "mousemove" ? e.screenY : t?.screenY ?? 0) - (this.touchStartY ?? 0);
			this.velocityY = r - (this.touchMoveY ?? 0), this.touchMoveY = r;
			let i = Math.abs(this.touchMoveX), a = Math.abs(this.touchMoveY);
			this.swipingHorizontal = i > this.thresholdX, this.swipingVertical = a > this.thresholdY, this.swipingDirection = i > a ? this.swipingHorizontal ? "horizontal" : "pre-horizontal" : this.swipingVertical ? "vertical" : "pre-vertical", Math.max(i, a) > this.opts.pressThreshold && clearTimeout(this.longPressTimer ?? void 0), this.fire("panmove", e);
		}
		e.type !== "mousemove" && this.touchMove1 != null && this.touchMove2 != null && (this.newDistance = Math.sqrt((this.touchMove2.screenX - this.touchMove1.screenX) ** 2 + (this.touchMove2.screenY - this.touchMove1.screenY) ** 2), this.scale = this.newDistance / (this.originalDistance ?? 0), this.fire("pinch", e), this.newAngle = Math.atan2((this.touchMove2.screenY ?? 0) - (this.touchMove1.screenY ?? 0), (this.touchMove2.screenX ?? 0) - (this.touchMove1.screenX ?? 0)) / (Math.PI / 180), this.rotation = this.newAngle - (this.originalAngle ?? 0), this.fire("rotate", e));
	}
	onTouchEnd(e) {
		let t;
		if (e.type !== "mouseup" && (t = [...e.changedTouches].find((e) => e.identifier === this.touch1?.identifier), [...e.touches].find((e) => e.identifier === this.touch1?.identifier) || (this.touch1 = null, this.touchMove1 = null), [...e.touches].find((e) => e.identifier === this.touch2?.identifier) || (this.touch2 = null, this.touchMove2 = null)), !(e.type === "mouseup" && (!this.touchStartX || this.touchEndX !== null))) {
			if (e.type === "mouseup" || t) {
				this.touchEndX = e.type === "mouseup" ? e.screenX : t?.screenX ?? 0, this.touchEndY = e.type === "mouseup" ? e.screenY : t?.screenY ?? 0, this.fire("panend", e), clearTimeout(this.longPressTimer ?? void 0);
				let n = this.touchEndX - (this.touchStartX ?? 0), r = Math.abs(n), i = this.touchEndY - (this.touchStartY ?? 0), a = Math.abs(i), o = Math.sqrt(n ** 2 + i ** 2), s = Math.abs(o), c = a / r;
				r > this.thresholdX || a > this.thresholdY || this.opts.diagonalSwipes && (s > this.thresholdX || s > this.thresholdY) ? (this.swipedHorizontal = r > this.thresholdX || this.opts.diagonalSwipes && s > this.thresholdX, this.swipedVertical = a > this.thresholdY || this.opts.diagonalSwipes && s > this.thresholdY, (!this.opts.diagonalSwipes || c < Math.tan((45 - this.opts.diagonalLimit) * Math.PI / 180) || c > Math.tan((45 + this.opts.diagonalLimit) * Math.PI / 180)) && (r >= a && (this.swipedVertical = !1), a > r && (this.swipedHorizontal = !1)), this.swipedHorizontal && (n < 0 ? ((this.velocityX ?? 0) < -this.opts.velocityThreshold || o > this.disregardVelocityThresholdX) && this.fire("swipeleft", e) : ((this.velocityX ?? 0) > this.opts.velocityThreshold || o > this.disregardVelocityThresholdX) && this.fire("swiperight", e)), this.swipedVertical && (i < 0 ? ((this.velocityY ?? 0) < -this.opts.velocityThreshold || o > this.disregardVelocityThresholdY) && this.fire("swipeup", e) : ((this.velocityY ?? 0) > this.opts.velocityThreshold || o > this.disregardVelocityThresholdY) && this.fire("swipedown", e))) : r < this.opts.pressThreshold && a < this.opts.pressThreshold && (this.doubleTapWaiting ? (this.doubleTapWaiting = !1, clearTimeout(this.doubleTapTimer ?? void 0), this.fire("doubletap", e)) : (this.doubleTapWaiting = !0, this.doubleTapTimer = setTimeout(() => this.doubleTapWaiting = !1, this.opts.doubleTapTime), this.fire("tap", e)));
			}
			!this.touch1 && !this.touch2 && (this.fire("pinchend", e), this.fire("rotateend", e), this.originalDistance = null, this.newDistance = null, this.scale = null, this.originalAngle = null, this.newAngle = null, this.rotation = null);
		}
	}
};
ft.defaults = {
	threshold: (e, t) => Math.max(25, Math.floor(.15 * (e === "x" ? window.innerWidth || document.body.clientWidth : window.innerHeight || document.body.clientHeight))),
	velocityThreshold: 10,
	disregardVelocityThreshold: (e, t) => Math.floor(.5 * (e === "x" ? t.element.clientWidth : t.element.clientHeight)),
	pressThreshold: 8,
	diagonalSwipes: !1,
	diagonalLimit: 15,
	longPressTime: 500,
	doubleTapTime: 300,
	mouseSupport: !0
};
var $ = !1;
try {
	window.addEventListener("test", null, Object.defineProperty({}, "passive", { get: function() {
		$ = { passive: !0 };
	} }));
} catch {}
//#endregion
//#region src/sn/EventMng.ts
var pt = class {
	cfg;
	hTag;
	appPixi;
	main;
	layMng;
	val;
	scrItr;
	sys;
	#e = new l();
	#t;
	#n;
	#r = /* @__PURE__ */ new Map([[0, ""], [1, "middle"]]);
	constructor(t, n, i, a, l, u, d, m, _) {
		if (this.cfg = t, this.hTag = n, this.appPixi = i, this.main = a, this.layMng = l, this.val = u, this.scrItr = m, this.sys = _, n.clear_event = (e) => f.clear_event(e), n.event = (e) => this.#_(e), n.set_cancel_skip = () => !1, n.set_focus = (e) => this.#y(e), this.#t = new g(i.view, _), d.setEvtMng(this), m.setOtherObj(this, l), h.setEvtMng(this, _, m), l.setEvtMng(this), p.setFcs(this.#t), _.setFire((e, t) => p.fire(e, t)), o.isDbg) {
			let e = { pause: () => {
				if (!p.isWait) return;
				let e = {};
				m.recodeDesign(e), _.callHook("_enterDesign", e), _.send2Dbg("_enterDesign", e);
			} };
			e.attach = e.stopOnEntry = e.stopOnStep = e.stopOnStepIn = e.stopOnStepOut = e.stopOnBackstep = e.pause, _.addHook((t) => e[t]?.());
		}
		r("\n.sn_hint {\n	background-color: #3c3225;\n	color: white;\n	padding: 4px 8px;\n	border-radius: 4px;\n	font-size: 1.2em;\n	z-index: 10000;\n	pointer-events: none;\n	user-select: none;\n}\n\n.sn_hint_ar,\n.sn_hint_ar::before {\n	position: absolute;\n	width: 8px;\n	height: 8px;\n	background: inherit;\n}\n.sn_hint_ar {\n	visibility: hidden;\n}\n.sn_hint_ar::before {\n	visibility: visible;\n	content: '';\n	transform: rotate(45deg);\n}\n\n.sn_hint[data-popper-placement^='top']		> .sn_hint_ar {bottom: -4px;}\n.sn_hint[data-popper-placement^='bottom']	> .sn_hint_ar {top: -4px;}\n.sn_hint[data-popper-placement^='left']		> .sn_hint_ar {right: -4px;}\n.sn_hint[data-popper-placement^='right']	> .sn_hint_ar {left: -4px;}\n"), a.cvs.parentElement?.insertAdjacentHTML("beforeend", "\n<div class=\"sn_hint\" role=\"tooltip\">\n	<span>Dummy</span>\n	<div class=\"sn_hint_ar\" data-popper-arrow></div>\n</div>"), this.#f = document.querySelector(".sn_hint"), this.#p = this.#f.querySelector("span"), this.#m = dt(this.#d, this.#f), this.#f.hidden = !0, i.stage.interactive = !0, this.#e.add(document.body, e, (e) => this.#a(e)), this.#e.add(document.body, "keyup", () => f.resetFired()), this.#e.add(a.cvs, "contextmenu", (e) => {
			let t = this.#o(e) + "rightclick";
			p.fire(t, e, !0), e.preventDefault();
		});
		let { width: v, height: y } = t.oCfg.window, b = Math.floor(v > y ? y / 3 : v / 3);
		this.#n = new ft(a.cvs, {
			velocityThreshold: 0,
			disregardVelocityThreshold: (e) => Math.floor(b * (e === "x" ? 1 : .5))
		});
		let x = !1;
		this.#n.on("tap", (e) => {
			if (x) return;
			if (e instanceof TouchEvent) {
				p.fire("click", e, !0), f.resetFired();
				return;
			}
			if (e.button > 1) return;
			let t = this.#o(e) + `${this.#r.get(e.button) ?? ""}click`;
			p.fire(t, e, !0), f.resetFired();
		}), this.#e.add(window, "pointerout", () => f.resetFired()), this.#n.on("longpress", (e) => {
			if (x = !0, e instanceof TouchEvent) {
				p.fire("longpress", e, !0);
				return;
			}
			let t = this.#o(e) + `${this.#r.get(e.button) ?? ""}longpress`;
			p.fire(t, e, !0);
		}), this.#n.on("panend", () => {
			x && queueMicrotask(() => {
				x = !1;
			});
		}), [
			"swiperight",
			"swipeleft",
			"swipeup",
			"swipedown"
		].forEach((e) => {
			this.#n.on(e, (t) => {
				if (t instanceof TouchEvent) {
					p.fire(e, t, !0);
					return;
				}
				let n = this.#o(t) + e;
				p.fire(n, t, !0);
			});
		});
		let S = () => u.setVal_Nochk("tmp", "const.sn.navigator.language", navigator.language);
		this.#e.add(globalThis, "languagechange", (e) => {
			S(), p.fire("sn:chgNavLang", e), s();
		}), S();
		let C = (e) => {
			o.isDarkMode = e.matches, u.setVal_Nochk("tmp", "const.sn.isDarkMode", o.isDarkMode);
		}, w = globalThis.matchMedia("(prefers-color-scheme: dark)");
		C(w), this.#e.add(w, "change", (e) => {
			C(e), p.fire("sn:chgDarkMode", e);
		});
		let T = (e, t) => {};
		"WheelEvent" in globalThis && (this.#e.add(a.cvs, "wheel", (e) => this.#s(e), { passive: !0 }), this.#i = (e) => this.#e.add(e, "wheel", (e) => this.#s(e), { passive: !0 }), T = (e, t) => e.add(a.cvs, "wheel", (e) => {
			e.deltaY <= 0 || (e.stopPropagation(), t());
		})), p.init(t, n, a, u, m, l, this, d, T), import("./gamepad.js").then(({ GamepadListener: t }) => {
			let n = new t({
				analog: !1,
				deadZone: .3
			});
			o.debugLog && (n.on("gamepad:connected", ({ detail: e }) => console.log(`👺<'gamepad:connected' index:${String(e.index)} id:${e.gamepad.id}`)), n.on("gamepad:disconnected", ({ detail: e }) => console.log(`👺<'gamepad:disconnected' index:${String(e.index)} id:${e.gamepad.id}`)));
			let r = [
				"",
				"ArrowUp",
				"",
				"ArrowLeft",
				"",
				"ArrowRight",
				"",
				"ArrowDown",
				""
			], i = [0, 0];
			n.on("gamepad:axis", ({ detail: t }) => {
				if (!document.hasFocus()) return;
				i[t.axis] = t.value;
				let [n = 0, a = 0] = i, o = (a + 1) * 3 + (n + 1), s = r[o];
				if (!s) return;
				let l = this.#t.getFocus();
				(!l || l instanceof c ? globalThis : l).dispatchEvent(new KeyboardEvent(e, {
					key: s,
					bubbles: !0
				})), !(!l || l instanceof c) && (p.cancelAutoSkip(), l.getAttribute("type") === "range" && l.dispatchEvent(new InputEvent("input", { bubbles: !0 })));
			}), n.on("gamepad:button", (t) => {
				if (document.hasFocus()) if (t.detail.button % 2 == 0) {
					p.cancelAutoSkip();
					let t = this.#t.getFocus();
					(!t || t instanceof c ? document.body : t).dispatchEvent(new KeyboardEvent(e, {
						key: "Enter",
						bubbles: !0
					}));
				} else p.fire("middleclick", t, !0);
			}), n.start();
		}), this.#e.add(document, "keyup", (e) => {
			e.isComposing || e.key in this.#b && (this.#b[e.key] = 0);
		}), u.defTmp("const.sn.key.alternate", () => this.#b.Alt > 0), u.defTmp("const.sn.key.command", () => this.#b.Meta > 0), u.defTmp("const.sn.key.control", () => this.#b.Control > 0), u.defTmp("const.sn.key.end", () => this.#b.End > 0), u.defTmp("const.sn.key.escape", () => this.#b.Escape > 0), u.defTmp("const.sn.key.back", () => this.#b.GoBack > 0);
	}
	resvFlameEvent(t) {
		this.#e.add(t, e, (e) => this.#a(e)), this.#e.add(t, "contextmenu", (e) => {
			p.fire(this.#o(e) + "rightclick", e, !0), e.preventDefault();
		}), this.#i(t), this.#e.add(t, i, (e) => {
			if (e instanceof TouchEvent) {
				p.fire("click", e, !0);
				return;
			}
			if (e.button > 1) return;
			let t = this.#o(e) + `${this.#r.get(e.button) ?? ""}click`;
			p.fire(t, e, !0);
		}), this.#e.add(t, "pointerup", () => f.resetFired()), this.#e.add(t, "pointerout", () => f.resetFired());
	}
	#i = (e) => {};
	#a(e) {
		e.isComposing || (e.key in this.#b && (this.#b[e.key] = e.repeat ? 2 : 1), e.preventDefault(), p.fire(d.modKey(e) + e.key, e, !0));
	}
	#o(e) {
		return (e.altKey ? "alt+" : "") + (e.ctrlKey ? "ctrl+" : "") + (e.metaKey ? "meta+" : "") + (e.shiftKey ? "shift+" : "");
	}
	#s(e) {
		if (this.#c) {
			this.#l = !0;
			return;
		}
		this.#c = !0, this.#u();
		let t = this.#o(e) + (e.deltaY > 0 ? "downwheel" : "upwheel");
		p.fire(t, e, !0);
	}
	#c = !1;
	#l = !1;
	#u() {
		setTimeout(() => {
			if (this.#l) {
				this.#l = !1, this.#u();
				return;
			}
			this.#c = !1;
		}, 250);
	}
	destroy() {
		for (let e of Array.from(document.getElementsByClassName("sn_hint"))) e.parentElement?.removeChild(e);
		this.#n.destroy(), p.destroy(), this.#t.destroy(), this.#e.clear();
	}
	unButton(e) {
		this.#t.remove(e);
	}
	button(e, t, r, i, s) {
		!e.fn && !e.label && !e.url && this.main.errScript("fnまたはlabelまたはurlは必須です"), e.fn ??= this.scrItr.scriptFn, t.interactive = !0, t.cursor = "pointer";
		let c = e.key?.toLowerCase() ?? " ", l = a(e, "global", !1);
		f.setEvt2Fnc(l, c, () => this.main.resumeByJumpOrCall(e)), t.on(n, (e) => {
			e.preventDefault?.(), p.fire(c, e, !0);
		});
		let d = e.hint ? () => this.#g(e, t) : () => {}, h = () => {
			r(), this.#f.hidden = !0;
		}, g = () => (d(), i());
		if (t.on("pointerover", g), t.on("pointerout", () => {
			this.#t.isFocus(t) ? g() : h();
		}), t.on("pointerdown", () => {
			this.#f.hidden = !0;
			let e = this.#t.getFocus();
			s(), e instanceof m && e.normal();
		}), t.on("pointerup", o.isMobile ? h : () => {
			this.#t.isFocus(t) ? g() : h();
		}), this.#t.add(t, g, h), e.clickse && (e.clicksebuf ??= "SYS", this.cfg.searchPath(e.clickse, u.SOUND), t.on("pointerdown", () => this.hTag.playse({
			fn: e.clickse,
			...e.clicksebuf ? { buf: e.clicksebuf } : {},
			join: !1
		}))), e.enterse && (e.entersebuf ??= "SYS", this.cfg.searchPath(e.enterse, u.SOUND), t.on("pointerover", () => this.hTag.playse({
			fn: e.enterse,
			...e.entersebuf ? { buf: e.entersebuf } : {},
			join: !1
		}))), e.leavese && (e.leavesebuf ??= "SYS", this.cfg.searchPath(e.leavese, u.SOUND), t.on("pointerout", () => this.hTag.playse({
			fn: e.leavese,
			...e.leavesebuf ? { buf: e.leavesebuf } : {},
			join: !1
		}))), e.onenter) {
			let n = c + e.onenter.toLowerCase(), r = {
				fn: e.fn,
				label: e.onenter,
				call: !0,
				key: n
			};
			f.setEvt2Fnc(l, n, () => this.main.resumeByJumpOrCall(r)), t.on("pointerover", (e) => p.fire(n, e));
		}
		if (e.onleave) {
			let n = c + e.onleave.toLowerCase(), r = {
				fn: e.fn,
				label: e.onleave,
				call: !0,
				key: n
			};
			f.setEvt2Fnc(l, n, () => this.main.resumeByJumpOrCall(r)), t.on("pointerout", (e) => p.fire(n, e));
		}
	}
	#d = { getBoundingClientRect: (e = 0, t = 0) => DOMRect.fromRect({
		x: e,
		y: t,
		width: 0,
		height: 0
	}) };
	#f;
	#p;
	#m;
	#h = {
		placement: "bottom",
		modifiers: [{
			name: "flip",
			options: { fallbackPlacements: ["top", "bottom"] }
		}]
	};
	#g(e, n) {
		let r = n instanceof m ? n.getBtnBounds() : n.getBounds();
		if (e[":タグ名"] !== "link") {
			let e = n.parent.parent;
			r.x += e.x, r.y += e.y;
		}
		if (!e.hint) {
			this.#f.hidden = !0;
			return;
		}
		this.#f.style.cssText = `position:${this.#f.style.position}; transform:${this.#f.style.transform};` + (e.hint_style ?? ""), this.#p.style.cssText = "", this.#p.textContent = e.hint ?? "", this.#d.getBoundingClientRect = () => DOMRect.fromRect({
			x: this.sys.ofsLeft4elm + r.x * this.sys.cvsScale,
			y: this.sys.ofsTop4elm + r.y * this.sys.cvsScale,
			width: r.width,
			height: r.height
		}), this.#m.setOptions(e.hint_opt ? {
			...this.#h,
			...JSON.parse(e.hint_opt)
		} : this.#h).then(async () => {
			await this.#m.update(), this.#f.hidden = !1;
		}).catch((n) => console.error(t(e, "hint_opt", `dispHint 引数 hint_opt エラー ${n instanceof SyntaxError ? n.message : ""}`)));
	}
	hideHint() {
		this.#f.hidden = !0;
	}
	cvsResize() {
		this.hideHint();
	}
	#_(t) {
		let n = t.key;
		if (!n) throw "keyは必須です";
		let r = n.toLowerCase(), i = a(t, "call", !1), o = a(t, "global", !1), { fn: s, label: c, url: l } = t;
		if (a(t, "del", !1)) {
			if (s || c || i || l) throw "fn/label/callとdelは同時指定できません";
			return f.clear_eventer(n, o, r), !1;
		}
		if (!s && !c && !l) throw "fn,label,url いずれかは必須です";
		if (t.fn ??= this.scrItr.scriptFn, n.startsWith("dom=")) {
			let r = f.getHtmlElmList(n);
			if (r.el.length === 0) {
				if (a(t, "need_err", !0)) throw `HTML内にセレクタ（${r.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
				return !1;
			}
			let i = ["click", e];
			switch (r.el[0].type ?? "") {
				case "checkbox":
					i = ["input"];
					break;
				case "range":
					i = ["input"];
					break;
				case "text":
				case "textarea":
					i = ["input", "change"];
					break;
			}
			let o = i.length;
			for (let e = 0; e < o; ++e) {
				let t = i[e];
				r.el.forEach((i) => {
					this.#e.add(i, t, (e) => {
						if (!p.isWait || this.layMng.getFrmDisabled(r.id) || t === "keydown" && e.key !== "Enter") return;
						let a = i.dataset;
						for (let [e, t] of Object.entries(a)) this.val.setVal_Nochk("tmp", `sn.event.domdata.${e}`, t);
						p.fire(n, e);
					}), e === 0 && this.#t.add(i, () => this.#v(i) ? (i.focus(), !0) : !1, () => {});
				});
			}
		}
		return f.setEvt2Fnc(o, r, () => this.main.resumeByJumpOrCall(t)), !1;
	}
	#v(e) {
		if (!e || e.offsetParent === null) return !1;
		let t = e;
		do {
			if (getComputedStyle(t).display === "none" || t.dataset.focus === "false" || t?.disabled) return !1;
			t = t.parentElement;
		} while (t);
		return !0;
	}
	#y(e) {
		let { add: t, del: n, to: r } = e;
		if (t?.startsWith("dom=")) {
			let n = f.getHtmlElmList(t);
			if (n.el.length === 0 && a(e, "need_err", !0)) throw `HTML内にセレクタ（${n.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
			return n.el.forEach((e) => this.#t.add(e, () => this.#v(e) ? (e.focus(), !0) : !1, () => {})), !1;
		}
		if (n?.startsWith("dom=")) {
			let t = f.getHtmlElmList(n);
			if (t.el.length === 0 && a(e, "need_err", !0)) throw `HTML内にセレクタ（${t.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
			return t.el.forEach((e) => this.#t.remove(e)), !1;
		}
		if (!r) throw "[set_focus] add か to は必須です";
		switch (r) {
			case "null":
				this.#t.blur();
				break;
			case "next":
				this.#t.next();
				break;
			case "prev":
				this.#t.prev();
				break;
		}
		return !1;
	}
	get isSkipping() {
		return p.isSkipping ? !0 : Object.keys(this.#b).some((e) => this.#b[e] === 2);
	}
	#b = {
		Alt: 0,
		Meta: 0,
		Control: 0,
		ArrowDown: 0,
		End: 0,
		Enter: 0,
		Escape: 0,
		" ": 0,
		GoBack: 0
	};
};
//#endregion
export { pt as EventMng };

//# sourceMappingURL=EventMng.js.map