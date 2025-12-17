import { r as __toDynamicImportESM } from "./chunk.js";
import { i as EVNM_KEY, m as mesErrJSON, n as EVNM_BUTTON, o as addStyle, r as EVNM_CLICK, s as argChk_Boolean, t as CmnLib } from "./CmnLib.js";
import "./CmnInterface.js";
import { _ as clearTextureCache, m as Container } from "./pixi.js";
import { t as EventListenerCtn } from "./EventListenerCtn.js";
import { n as SEARCH_PATH_ARG_EXT } from "./ConfigBase.js";
import { t as SysBase } from "./SysBase.js";
import "./Layer.js";
import "./DebugMng.js";
import { n as ReadingState, t as Reading } from "./Reading.js";
import "./SpritesMng.js";
import { Button } from "./Button.js";
import { TxtLayer } from "./TxtLayer.js";
var FocusMng = class {
	#e = [];
	#t = -1;
	#n = new EventListenerCtn();
	constructor(e, t) {
		this.#a = t.isApp ? () => e.focus() : () => globalThis.focus();
	}
	destroy() {
		this.#e = [], this.#t = -1, this.#n.clear();
	}
	add(e, n, r) {
		if (this.#e.findIndex((t) => t.btn === e) >= 0) return;
		if (e instanceof Container) {
			e.on("pointerdown", () => {
				for (let t = this.#e.length - 1; t >= 0; --t) if (this.#e[t].btn === e) {
					this.#t = t;
					return;
				}
				this.#t = -1;
			}), this.#e.push({
				btn: e,
				on: n,
				off: r
			});
			return;
		}
		this.#n.add(e, "focus", () => {
			for (let t = this.#e.length - 1; t >= 0; --t) if (this.#e[t].btn === e) {
				this.#t = t;
				return;
			}
			this.#t = -1;
		});
		let i = (e) => {}, a = e.localName === "button" || e.localName === "a" ? (e) => !e.isTrusted && e.key === "Enter" : (e) => e.key === "Enter", o = e;
		switch (o.type ?? "") {
			case "checkbox":
				i = () => {
					o.checked = !o.checked;
				};
				break;
			case "":
				e.querySelectorAll("input[type]").length > 0 && (i = (t) => this.#r(e, t.key), a = () => !1);
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
		this.#n.add(e, EVNM_KEY, (t) => {
			if (!(t.key !== "ArrowUp" && t.key !== "ArrowDown" && t.key !== "Enter")) {
				if (t.stopImmediatePropagation(), a(t)) {
					e.dispatchEvent(new MouseEvent("click"));
					return;
				}
				i(t);
			}
		}, { passive: !0 }), e.hasAttribute("tabindex") || (e.tabIndex = 0), this.#e.push({
			btn: e,
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
	#i = CmnLib.debugLog ? (e) => console.log(`👾 <FocusMng idx:${String(e)} btn:%o`, this.#e[e].btn) : () => {};
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
			!(t.btn instanceof Container) || t.btn.parent ? t.off() : this.#e.splice(e, 1);
		}
	}
}, bottom = "bottom", right = "right", left = "left", auto = "auto", basePlacements = [
	"top",
	bottom,
	right,
	left
], start = "start", clippingParents = "clippingParents", viewport = "viewport", popper = "popper", reference = "reference", variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(e, t) {
	return e.concat([t + "-" + start, t + "-end"]);
}, []), placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(e, t) {
	return e.concat([
		t,
		t + "-" + start,
		t + "-end"
	]);
}, []), modifierPhases = [
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
function getNodeName(e) {
	return e ? (e.nodeName || "").toLowerCase() : null;
}
function getWindow(e) {
	if (e == null) return window;
	if (e.toString() !== "[object Window]") {
		var t = e.ownerDocument;
		return t && t.defaultView || window;
	}
	return e;
}
function isElement(e) {
	return e instanceof getWindow(e).Element || e instanceof Element;
}
function isHTMLElement(e) {
	return e instanceof getWindow(e).HTMLElement || e instanceof HTMLElement;
}
function isShadowRoot(e) {
	return typeof ShadowRoot > "u" ? !1 : e instanceof getWindow(e).ShadowRoot || e instanceof ShadowRoot;
}
function applyStyles(e) {
	var t = e.state;
	Object.keys(t.elements).forEach(function(e) {
		var n = t.styles[e] || {}, r = t.attributes[e] || {}, i = t.elements[e];
		!isHTMLElement(i) || !getNodeName(i) || (Object.assign(i.style, n), Object.keys(r).forEach(function(e) {
			var t = r[e];
			t === !1 ? i.removeAttribute(e) : i.setAttribute(e, t === !0 ? "" : t);
		}));
	});
}
function effect$2(e) {
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
			!isHTMLElement(r) || !getNodeName(r) || (Object.assign(r.style, a), Object.keys(i).forEach(function(e) {
				r.removeAttribute(e);
			}));
		});
	};
}
var applyStyles_default = {
	name: "applyStyles",
	enabled: !0,
	phase: "write",
	fn: applyStyles,
	effect: effect$2,
	requires: ["computeStyles"]
};
function getBasePlacement(e) {
	return e.split("-")[0];
}
var max = Math.max, min = Math.min, round = Math.round;
function getUAString() {
	var e = navigator.userAgentData;
	return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(e) {
		return e.brand + "/" + e.version;
	}).join(" ") : navigator.userAgent;
}
function isLayoutViewport() {
	return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
function getBoundingClientRect(e, t, n) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	var r = e.getBoundingClientRect(), i = 1, a = 1;
	t && isHTMLElement(e) && (i = e.offsetWidth > 0 && round(r.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && round(r.height) / e.offsetHeight || 1);
	var o = (isElement(e) ? getWindow(e) : window).visualViewport, s = !isLayoutViewport() && n, c = (r.left + (s && o ? o.offsetLeft : 0)) / i, l = (r.top + (s && o ? o.offsetTop : 0)) / a, u = r.width / i, d = r.height / a;
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
function getLayoutRect(e) {
	var t = getBoundingClientRect(e), n = e.offsetWidth, r = e.offsetHeight;
	return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
		x: e.offsetLeft,
		y: e.offsetTop,
		width: n,
		height: r
	};
}
function contains(e, t) {
	var n = t.getRootNode && t.getRootNode();
	if (e.contains(t)) return !0;
	if (n && isShadowRoot(n)) {
		var r = t;
		do {
			if (r && e.isSameNode(r)) return !0;
			r = r.parentNode || r.host;
		} while (r);
	}
	return !1;
}
function getComputedStyle$1(e) {
	return getWindow(e).getComputedStyle(e);
}
function isTableElement(e) {
	return [
		"table",
		"td",
		"th"
	].indexOf(getNodeName(e)) >= 0;
}
function getDocumentElement(e) {
	return ((isElement(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function getParentNode(e) {
	return getNodeName(e) === "html" ? e : e.assignedSlot || e.parentNode || (isShadowRoot(e) ? e.host : null) || getDocumentElement(e);
}
function getTrueOffsetParent(e) {
	return !isHTMLElement(e) || getComputedStyle$1(e).position === "fixed" ? null : e.offsetParent;
}
function getContainingBlock(e) {
	var t = /firefox/i.test(getUAString());
	if (/Trident/i.test(getUAString()) && isHTMLElement(e) && getComputedStyle$1(e).position === "fixed") return null;
	var n = getParentNode(e);
	for (isShadowRoot(n) && (n = n.host); isHTMLElement(n) && ["html", "body"].indexOf(getNodeName(n)) < 0;) {
		var r = getComputedStyle$1(n);
		if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none") return n;
		n = n.parentNode;
	}
	return null;
}
function getOffsetParent(e) {
	for (var t = getWindow(e), n = getTrueOffsetParent(e); n && isTableElement(n) && getComputedStyle$1(n).position === "static";) n = getTrueOffsetParent(n);
	return n && (getNodeName(n) === "html" || getNodeName(n) === "body" && getComputedStyle$1(n).position === "static") ? t : n || getContainingBlock(e) || t;
}
function getMainAxisFromPlacement(e) {
	return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function within(e, t, n) {
	return max(e, min(t, n));
}
function withinMaxClamp(e, t, n) {
	var r = within(e, t, n);
	return r > n ? n : r;
}
function getFreshSideObject() {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
}
function mergePaddingObject(e) {
	return Object.assign({}, getFreshSideObject(), e);
}
function expandToHashMap(e, t) {
	return t.reduce(function(t, n) {
		return t[n] = e, t;
	}, {});
}
var toPaddingObject = function(e, t) {
	return e = typeof e == "function" ? e(Object.assign({}, t.rects, { placement: t.placement })) : e, mergePaddingObject(typeof e == "number" ? expandToHashMap(e, basePlacements) : e);
};
function arrow(e) {
	var t, n = e.state, r = e.name, i = e.options, a = n.elements.arrow, o = n.modifiersData.popperOffsets, s = getBasePlacement(n.placement), c = getMainAxisFromPlacement(s), l = ["left", "right"].indexOf(s) >= 0 ? "height" : "width";
	if (!(!a || !o)) {
		var u = toPaddingObject(i.padding, n), d = getLayoutRect(a), f = c === "y" ? "top" : left, p = c === "y" ? bottom : right, m = n.rects.reference[l] + n.rects.reference[c] - o[c] - n.rects.popper[l], h = o[c] - n.rects.reference[c], g = getOffsetParent(a), _ = g ? c === "y" ? g.clientHeight || 0 : g.clientWidth || 0 : 0, x = m / 2 - h / 2, S = u[f], C = _ - d[l] - u[p], w = _ / 2 - d[l] / 2 + x, T = within(S, w, C), E = c;
		n.modifiersData[r] = (t = {}, t[E] = T, t.centerOffset = T - w, t);
	}
}
function effect$1(e) {
	var t = e.state, n = e.options.element, r = n === void 0 ? "[data-popper-arrow]" : n;
	r != null && (typeof r == "string" && (r = t.elements.popper.querySelector(r), !r) || contains(t.elements.popper, r) && (t.elements.arrow = r));
}
var arrow_default = {
	name: "arrow",
	enabled: !0,
	phase: "main",
	fn: arrow,
	effect: effect$1,
	requires: ["popperOffsets"],
	requiresIfExists: ["preventOverflow"]
};
function getVariation(e) {
	return e.split("-")[1];
}
var unsetSides = {
	top: "auto",
	right: "auto",
	bottom: "auto",
	left: "auto"
};
function roundOffsetsByDPR(e, t) {
	var n = e.x, r = e.y, i = t.devicePixelRatio || 1;
	return {
		x: round(n * i) / i || 0,
		y: round(r * i) / i || 0
	};
}
function mapToStyles(e) {
	var t, n = e.popper, r = e.popperRect, i = e.placement, a = e.variation, o = e.offsets, s = e.position, c = e.gpuAcceleration, l = e.adaptive, u = e.roundOffsets, d = e.isFixed, f = o.x, p = f === void 0 ? 0 : f, m = o.y, h = m === void 0 ? 0 : m, g = typeof u == "function" ? u({
		x: p,
		y: h
	}) : {
		x: p,
		y: h
	};
	p = g.x, h = g.y;
	var _ = o.hasOwnProperty("x"), x = o.hasOwnProperty("y"), S = left, C = "top", w = window;
	if (l) {
		var T = getOffsetParent(n), E = "clientHeight", D = "clientWidth";
		if (T === getWindow(n) && (T = getDocumentElement(n), getComputedStyle$1(T).position !== "static" && s === "absolute" && (E = "scrollHeight", D = "scrollWidth")), T = T, i === "top" || (i === "left" || i === "right") && a === "end") {
			C = bottom;
			var O = d && T === w && w.visualViewport ? w.visualViewport.height : T[E];
			h -= O - r.height, h *= c ? 1 : -1;
		}
		if (i === "left" || (i === "top" || i === "bottom") && a === "end") {
			S = right;
			var k = d && T === w && w.visualViewport ? w.visualViewport.width : T[D];
			p -= k - r.width, p *= c ? 1 : -1;
		}
	}
	var A = Object.assign({ position: s }, l && unsetSides), j = u === !0 ? roundOffsetsByDPR({
		x: p,
		y: h
	}, getWindow(n)) : {
		x: p,
		y: h
	};
	if (p = j.x, h = j.y, c) {
		var N;
		return Object.assign({}, A, (N = {}, N[C] = x ? "0" : "", N[S] = _ ? "0" : "", N.transform = (w.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + h + "px)" : "translate3d(" + p + "px, " + h + "px, 0)", N));
	}
	return Object.assign({}, A, (t = {}, t[C] = x ? h + "px" : "", t[S] = _ ? p + "px" : "", t.transform = "", t));
}
function computeStyles(e) {
	var t = e.state, n = e.options, r = n.gpuAcceleration, i = r === void 0 ? !0 : r, a = n.adaptive, o = a === void 0 ? !0 : a, s = n.roundOffsets, c = s === void 0 ? !0 : s, l = {
		placement: getBasePlacement(t.placement),
		variation: getVariation(t.placement),
		popper: t.elements.popper,
		popperRect: t.rects.popper,
		gpuAcceleration: i,
		isFixed: t.options.strategy === "fixed"
	};
	t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, mapToStyles(Object.assign({}, l, {
		offsets: t.modifiersData.popperOffsets,
		position: t.options.strategy,
		adaptive: o,
		roundOffsets: c
	})))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, mapToStyles(Object.assign({}, l, {
		offsets: t.modifiersData.arrow,
		position: "absolute",
		adaptive: !1,
		roundOffsets: c
	})))), t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-placement": t.placement });
}
var computeStyles_default = {
	name: "computeStyles",
	enabled: !0,
	phase: "beforeWrite",
	fn: computeStyles,
	data: {}
}, passive = { passive: !0 };
function effect(e) {
	var t = e.state, n = e.instance, r = e.options, i = r.scroll, a = i === void 0 ? !0 : i, o = r.resize, s = o === void 0 ? !0 : o, c = getWindow(t.elements.popper), l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
	return a && l.forEach(function(e) {
		e.addEventListener("scroll", n.update, passive);
	}), s && c.addEventListener("resize", n.update, passive), function() {
		a && l.forEach(function(e) {
			e.removeEventListener("scroll", n.update, passive);
		}), s && c.removeEventListener("resize", n.update, passive);
	};
}
var eventListeners_default = {
	name: "eventListeners",
	enabled: !0,
	phase: "write",
	fn: function() {},
	effect,
	data: {}
}, hash$1 = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function getOppositePlacement(e) {
	return e.replace(/left|right|bottom|top/g, function(e) {
		return hash$1[e];
	});
}
var hash = {
	start: "end",
	end: "start"
};
function getOppositeVariationPlacement(e) {
	return e.replace(/start|end/g, function(e) {
		return hash[e];
	});
}
function getWindowScroll(e) {
	var t = getWindow(e);
	return {
		scrollLeft: t.pageXOffset,
		scrollTop: t.pageYOffset
	};
}
function getWindowScrollBarX(e) {
	return getBoundingClientRect(getDocumentElement(e)).left + getWindowScroll(e).scrollLeft;
}
function getViewportRect(e, t) {
	var n = getWindow(e), r = getDocumentElement(e), i = n.visualViewport, a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
	if (i) {
		a = i.width, o = i.height;
		var l = isLayoutViewport();
		(l || !l && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
	}
	return {
		width: a,
		height: o,
		x: s + getWindowScrollBarX(e),
		y: c
	};
}
function getDocumentRect(e) {
	var t = getDocumentElement(e), n = getWindowScroll(e), r = e.ownerDocument?.body, i = max(t.scrollWidth, t.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), a = max(t.scrollHeight, t.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), o = -n.scrollLeft + getWindowScrollBarX(e), s = -n.scrollTop;
	return getComputedStyle$1(r || t).direction === "rtl" && (o += max(t.clientWidth, r ? r.clientWidth : 0) - i), {
		width: i,
		height: a,
		x: o,
		y: s
	};
}
function isScrollParent(e) {
	var t = getComputedStyle$1(e), n = t.overflow, r = t.overflowX, i = t.overflowY;
	return /auto|scroll|overlay|hidden/.test(n + i + r);
}
function getScrollParent(e) {
	return [
		"html",
		"body",
		"#document"
	].indexOf(getNodeName(e)) >= 0 ? e.ownerDocument.body : isHTMLElement(e) && isScrollParent(e) ? e : getScrollParent(getParentNode(e));
}
function listScrollParents(e, t) {
	t === void 0 && (t = []);
	var n = getScrollParent(e), r = n === e.ownerDocument?.body, i = getWindow(n), a = r ? [i].concat(i.visualViewport || [], isScrollParent(n) ? n : []) : n, o = t.concat(a);
	return r ? o : o.concat(listScrollParents(getParentNode(a)));
}
function rectToClientRect(e) {
	return Object.assign({}, e, {
		left: e.x,
		top: e.y,
		right: e.x + e.width,
		bottom: e.y + e.height
	});
}
function getInnerBoundingClientRect(e, t) {
	var n = getBoundingClientRect(e, !1, t === "fixed");
	return n.top += e.clientTop, n.left += e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function getClientRectFromMixedType(e, t, n) {
	return t === "viewport" ? rectToClientRect(getViewportRect(e, n)) : isElement(t) ? getInnerBoundingClientRect(t, n) : rectToClientRect(getDocumentRect(getDocumentElement(e)));
}
function getClippingParents(e) {
	var t = listScrollParents(getParentNode(e)), n = ["absolute", "fixed"].indexOf(getComputedStyle$1(e).position) >= 0 && isHTMLElement(e) ? getOffsetParent(e) : e;
	return isElement(n) ? t.filter(function(e) {
		return isElement(e) && contains(e, n) && getNodeName(e) !== "body";
	}) : [];
}
function getClippingRect(e, t, n, r) {
	var i = t === "clippingParents" ? getClippingParents(e) : [].concat(t), a = [].concat(i, [n]), o = a[0], s = a.reduce(function(t, n) {
		var i = getClientRectFromMixedType(e, n, r);
		return t.top = max(i.top, t.top), t.right = min(i.right, t.right), t.bottom = min(i.bottom, t.bottom), t.left = max(i.left, t.left), t;
	}, getClientRectFromMixedType(e, o, r));
	return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
function computeOffsets(e) {
	var t = e.reference, n = e.element, r = e.placement, i = r ? getBasePlacement(r) : null, a = r ? getVariation(r) : null, o = t.x + t.width / 2 - n.width / 2, s = t.y + t.height / 2 - n.height / 2, c;
	switch (i) {
		case "top":
			c = {
				x: o,
				y: t.y - n.height
			};
			break;
		case bottom:
			c = {
				x: o,
				y: t.y + t.height
			};
			break;
		case right:
			c = {
				x: t.x + t.width,
				y: s
			};
			break;
		case left:
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
	var l = i ? getMainAxisFromPlacement(i) : null;
	if (l != null) {
		var u = l === "y" ? "height" : "width";
		switch (a) {
			case start:
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
function detectOverflow(e, t) {
	t === void 0 && (t = {});
	var n = t, r = n.placement, i = r === void 0 ? e.placement : r, a = n.strategy, o = a === void 0 ? e.strategy : a, s = n.boundary, c = s === void 0 ? clippingParents : s, l = n.rootBoundary, u = l === void 0 ? viewport : l, d = n.elementContext, f = d === void 0 ? popper : d, p = n.altBoundary, m = p === void 0 ? !1 : p, h = n.padding, g = h === void 0 ? 0 : h, _ = mergePaddingObject(typeof g == "number" ? expandToHashMap(g, basePlacements) : g), v = f === "popper" ? reference : popper, y = e.rects.popper, b = e.elements[m ? v : f], x = getClippingRect(isElement(b) ? b : b.contextElement || getDocumentElement(e.elements.popper), c, u, o), C = getBoundingClientRect(e.elements.reference), O = computeOffsets({
		reference: C,
		element: y,
		strategy: "absolute",
		placement: i
	}), k = rectToClientRect(Object.assign({}, y, O)), A = f === "popper" ? k : C, j = {
		top: x.top - A.top + _.top,
		bottom: A.bottom - x.bottom + _.bottom,
		left: x.left - A.left + _.left,
		right: A.right - x.right + _.right
	}, M = e.modifiersData.offset;
	if (f === "popper" && M) {
		var P = M[i];
		Object.keys(j).forEach(function(e) {
			var t = ["right", "bottom"].indexOf(e) >= 0 ? 1 : -1, n = ["top", "bottom"].indexOf(e) >= 0 ? "y" : "x";
			j[e] += P[n] * t;
		});
	}
	return j;
}
function computeAutoPlacement(e, t) {
	t === void 0 && (t = {});
	var n = t, r = n.placement, i = n.boundary, a = n.rootBoundary, o = n.padding, s = n.flipVariations, c = n.allowedAutoPlacements, l = c === void 0 ? placements : c, u = getVariation(r), d = u ? s ? variationPlacements : variationPlacements.filter(function(e) {
		return getVariation(e) === u;
	}) : basePlacements, f = d.filter(function(e) {
		return l.indexOf(e) >= 0;
	});
	f.length === 0 && (f = d);
	var p = f.reduce(function(t, n) {
		return t[n] = detectOverflow(e, {
			placement: n,
			boundary: i,
			rootBoundary: a,
			padding: o
		})[getBasePlacement(n)], t;
	}, {});
	return Object.keys(p).sort(function(e, t) {
		return p[e] - p[t];
	});
}
function getExpandedFallbackPlacements(e) {
	if (getBasePlacement(e) === "auto") return [];
	var t = getOppositePlacement(e);
	return [
		getOppositeVariationPlacement(e),
		t,
		getOppositeVariationPlacement(t)
	];
}
function flip(e) {
	var t = e.state, n = e.options, r = e.name;
	if (!t.modifiersData[r]._skip) {
		for (var i = n.mainAxis, a = i === void 0 ? !0 : i, o = n.altAxis, s = o === void 0 ? !0 : o, c = n.fallbackPlacements, l = n.padding, u = n.boundary, d = n.rootBoundary, f = n.altBoundary, p = n.flipVariations, m = p === void 0 ? !0 : p, h = n.allowedAutoPlacements, g = t.options.placement, _ = getBasePlacement(g) === g, x = c || (_ || !m ? [getOppositePlacement(g)] : getExpandedFallbackPlacements(g)), S = [g].concat(x).reduce(function(e, n) {
			return e.concat(getBasePlacement(n) === "auto" ? computeAutoPlacement(t, {
				placement: n,
				boundary: u,
				rootBoundary: d,
				padding: l,
				flipVariations: m,
				allowedAutoPlacements: h
			}) : n);
		}, []), w = t.rects.reference, T = t.rects.popper, E = /* @__PURE__ */ new Map(), D = !0, O = S[0], k = 0; k < S.length; k++) {
			var A = S[k], j = getBasePlacement(A), M = getVariation(A) === start, N = ["top", bottom].indexOf(j) >= 0, P = N ? "width" : "height", F = detectOverflow(t, {
				placement: A,
				boundary: u,
				rootBoundary: d,
				altBoundary: f,
				padding: l
			}), I = N ? M ? right : left : M ? bottom : "top";
			w[P] > T[P] && (I = getOppositePlacement(I));
			var L = getOppositePlacement(I), R = [];
			if (a && R.push(F[j] <= 0), s && R.push(F[I] <= 0, F[L] <= 0), R.every(function(e) {
				return e;
			})) {
				O = A, D = !1;
				break;
			}
			E.set(A, R);
		}
		if (D) for (var rt = m ? 3 : 1, it = function(e) {
			var t = S.find(function(t) {
				var n = E.get(t);
				if (n) return n.slice(0, e).every(function(e) {
					return e;
				});
			});
			if (t) return O = t, "break";
		}, z = rt; z > 0 && it(z) !== "break"; z--);
		t.placement !== O && (t.modifiersData[r]._skip = !0, t.placement = O, t.reset = !0);
	}
}
var flip_default = {
	name: "flip",
	enabled: !0,
	phase: "main",
	fn: flip,
	requiresIfExists: ["offset"],
	data: { _skip: !1 }
};
function getSideOffsets(e, t, n) {
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
function isAnySideFullyClipped(e) {
	return [
		"top",
		right,
		bottom,
		left
	].some(function(t) {
		return e[t] >= 0;
	});
}
function hide(e) {
	var t = e.state, n = e.name, r = t.rects.reference, i = t.rects.popper, a = t.modifiersData.preventOverflow, o = detectOverflow(t, { elementContext: "reference" }), s = detectOverflow(t, { altBoundary: !0 }), c = getSideOffsets(o, r), l = getSideOffsets(s, i, a), u = isAnySideFullyClipped(c), d = isAnySideFullyClipped(l);
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
var hide_default = {
	name: "hide",
	enabled: !0,
	phase: "main",
	requiresIfExists: ["preventOverflow"],
	fn: hide
};
function distanceAndSkiddingToXY(e, t, n) {
	var r = getBasePlacement(e), i = ["left", "top"].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, t, { placement: e })) : n, o = a[0], s = a[1];
	return o ||= 0, s = (s || 0) * i, ["left", "right"].indexOf(r) >= 0 ? {
		x: s,
		y: o
	} : {
		x: o,
		y: s
	};
}
function offset(e) {
	var t = e.state, n = e.options, r = e.name, i = n.offset, a = i === void 0 ? [0, 0] : i, o = placements.reduce(function(e, n) {
		return e[n] = distanceAndSkiddingToXY(n, t.rects, a), e;
	}, {}), s = o[t.placement], c = s.x, l = s.y;
	t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += l), t.modifiersData[r] = o;
}
var offset_default = {
	name: "offset",
	enabled: !0,
	phase: "main",
	requires: ["popperOffsets"],
	fn: offset
};
function popperOffsets(e) {
	var t = e.state, n = e.name;
	t.modifiersData[n] = computeOffsets({
		reference: t.rects.reference,
		element: t.rects.popper,
		strategy: "absolute",
		placement: t.placement
	});
}
var popperOffsets_default = {
	name: "popperOffsets",
	enabled: !0,
	phase: "read",
	fn: popperOffsets,
	data: {}
};
function getAltAxis(e) {
	return e === "x" ? "y" : "x";
}
function preventOverflow(e) {
	var t = e.state, n = e.options, r = e.name, i = n.mainAxis, a = i === void 0 ? !0 : i, o = n.altAxis, s = o === void 0 ? !1 : o, c = n.boundary, l = n.rootBoundary, u = n.altBoundary, d = n.padding, f = n.tether, p = f === void 0 ? !0 : f, m = n.tetherOffset, h = m === void 0 ? 0 : m, g = detectOverflow(t, {
		boundary: c,
		rootBoundary: l,
		padding: d,
		altBoundary: u
	}), _ = getBasePlacement(t.placement), x = getVariation(t.placement), S = !x, C = getMainAxisFromPlacement(_), w = getAltAxis(C), T = t.modifiersData.popperOffsets, E = t.rects.reference, D = t.rects.popper, O = typeof h == "function" ? h(Object.assign({}, t.rects, { placement: t.placement })) : h, k = typeof O == "number" ? {
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
			var M = C === "y" ? "top" : left, N = C === "y" ? bottom : right, P = C === "y" ? "height" : "width", F = T[C], I = F + g[M], L = F - g[N], R = p ? -D[P] / 2 : 0, z = x === "start" ? E[P] : D[P], at = x === "start" ? -D[P] : -E[P], B = t.elements.arrow, ot = p && B ? getLayoutRect(B) : {
				width: 0,
				height: 0
			}, V = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : getFreshSideObject(), H = V[M], U = V[N], W = within(0, E[P], ot[P]), st = S ? E[P] / 2 - R - W - H - k.mainAxis : z - W - H - k.mainAxis, ct = S ? -E[P] / 2 + R + W + U + k.mainAxis : at + W + U + k.mainAxis, G = t.elements.arrow && getOffsetParent(t.elements.arrow), lt = G ? C === "y" ? G.clientTop || 0 : G.clientLeft || 0 : 0, K = A?.[C] ?? 0, ut = F + st - K - lt, dt = F + ct - K, q = within(p ? min(I, ut) : I, F, p ? max(L, dt) : L);
			T[C] = q, j[C] = q - F;
		}
		if (s) {
			var ft = C === "x" ? "top" : left, pt = C === "x" ? bottom : right, J = T[w], Y = w === "y" ? "height" : "width", X = J + g[ft], Z = J - g[pt], Q = ["top", left].indexOf(_) !== -1, $ = A?.[w] ?? 0, mt = Q ? X : J - E[Y] - D[Y] - $ + k.altAxis, ht = Q ? J + E[Y] + D[Y] - $ - k.altAxis : Z, gt = p && Q ? withinMaxClamp(mt, J, ht) : within(p ? mt : X, J, p ? ht : Z);
			T[w] = gt, j[w] = gt - J;
		}
		t.modifiersData[r] = j;
	}
}
var preventOverflow_default = {
	name: "preventOverflow",
	enabled: !0,
	phase: "main",
	fn: preventOverflow,
	requiresIfExists: ["offset"]
};
function getHTMLElementScroll(e) {
	return {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	};
}
function getNodeScroll(e) {
	return e === getWindow(e) || !isHTMLElement(e) ? getWindowScroll(e) : getHTMLElementScroll(e);
}
function isElementScaled(e) {
	var t = e.getBoundingClientRect(), n = round(t.width) / e.offsetWidth || 1, r = round(t.height) / e.offsetHeight || 1;
	return n !== 1 || r !== 1;
}
function getCompositeRect(e, t, n) {
	n === void 0 && (n = !1);
	var r = isHTMLElement(t), i = isHTMLElement(t) && isElementScaled(t), a = getDocumentElement(t), o = getBoundingClientRect(e, i, n), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = {
		x: 0,
		y: 0
	};
	return (r || !r && !n) && ((getNodeName(t) !== "body" || isScrollParent(a)) && (s = getNodeScroll(t)), isHTMLElement(t) ? (c = getBoundingClientRect(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = getWindowScrollBarX(a))), {
		x: o.left + s.scrollLeft - c.x,
		y: o.top + s.scrollTop - c.y,
		width: o.width,
		height: o.height
	};
}
function order(e) {
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
function orderModifiers(e) {
	var t = order(e);
	return modifierPhases.reduce(function(e, n) {
		return e.concat(t.filter(function(e) {
			return e.phase === n;
		}));
	}, []);
}
function debounce(e) {
	var t;
	return function() {
		return t ||= new Promise(function(n) {
			Promise.resolve().then(function() {
				t = void 0, n(e());
			});
		}), t;
	};
}
function mergeByName(e) {
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
var DEFAULT_OPTIONS = {
	placement: "bottom",
	modifiers: [],
	strategy: "absolute"
};
function areValidElements() {
	return ![...arguments].some(function(e) {
		return !(e && typeof e.getBoundingClientRect == "function");
	});
}
function popperGenerator(e) {
	e === void 0 && (e = {});
	var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, i = t.defaultOptions, a = i === void 0 ? DEFAULT_OPTIONS : i;
	return function(e, t, n) {
		n === void 0 && (n = a);
		var i = {
			placement: "bottom",
			orderedModifiers: [],
			options: Object.assign({}, DEFAULT_OPTIONS, a),
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
					reference: isElement(e) ? listScrollParents(e) : e.contextElement ? listScrollParents(e.contextElement) : [],
					popper: listScrollParents(t)
				};
				var s = orderModifiers(mergeByName([].concat(r, i.options.modifiers)));
				return i.orderedModifiers = s.filter(function(e) {
					return e.enabled;
				}), l(), c.update();
			},
			forceUpdate: function() {
				if (!s) {
					var e = i.elements, t = e.reference, n = e.popper;
					if (areValidElements(t, n)) {
						i.rects = {
							reference: getCompositeRect(t, getOffsetParent(n), i.options.strategy === "fixed"),
							popper: getLayoutRect(n)
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
			update: debounce(function() {
				return new Promise(function(e) {
					c.forceUpdate(), e(i);
				});
			}),
			destroy: function() {
				u(), s = !0;
			}
		};
		if (!areValidElements(e, t)) return c;
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
var createPopper = /* @__PURE__ */ popperGenerator({ defaultModifiers: [
	eventListeners_default,
	popperOffsets_default,
	computeStyles_default,
	applyStyles_default,
	offset_default,
	flip_default,
	preventOverflow_default,
	arrow_default,
	hide_default
] }), TinyGesture = class e {
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
		}, this._onTouchStart = this.onTouchStart.bind(this), this._onTouchMove = this.onTouchMove.bind(this), this._onTouchEnd = this.onTouchEnd.bind(this), this.opts = Object.assign({}, e.defaults, n), this.element.addEventListener("touchstart", this._onTouchStart, passiveIfSupported), this.element.addEventListener("touchmove", this._onTouchMove, passiveIfSupported), this.element.addEventListener("touchend", this._onTouchEnd, passiveIfSupported), this.opts.mouseSupport && !("ontouchstart" in window) && (this.element.addEventListener("mousedown", this._onTouchStart, passiveIfSupported), document.addEventListener("mousemove", this._onTouchMove, passiveIfSupported), document.addEventListener("mouseup", this._onTouchEnd, passiveIfSupported));
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
				r > this.thresholdX || a > this.thresholdY || this.opts.diagonalSwipes && (s > this.thresholdX || s > this.thresholdY) ? (this.swipedHorizontal = r > this.thresholdX || this.opts.diagonalSwipes && s > this.thresholdX, this.swipedVertical = a > this.thresholdY || this.opts.diagonalSwipes && s > this.thresholdY, (!this.opts.diagonalSwipes || c < Math.tan((45 - this.opts.diagonalLimit) * Math.PI / 180) || c > Math.tan((45 + this.opts.diagonalLimit) * Math.PI / 180)) && (r >= a && (this.swipedVertical = !1), a > r && (this.swipedHorizontal = !1)), this.swipedHorizontal && (n < 0 ? ((this.velocityX ?? 0) < -this.opts.velocityThreshold || o < -this.disregardVelocityThresholdX) && this.fire("swipeleft", e) : ((this.velocityX ?? 0) > this.opts.velocityThreshold || o > this.disregardVelocityThresholdX) && this.fire("swiperight", e)), this.swipedVertical && (i < 0 ? ((this.velocityY ?? 0) < -this.opts.velocityThreshold || o < -this.disregardVelocityThresholdY) && this.fire("swipeup", e) : ((this.velocityY ?? 0) > this.opts.velocityThreshold || o > this.disregardVelocityThresholdY) && this.fire("swipedown", e))) : r < this.opts.pressThreshold && a < this.opts.pressThreshold && (this.doubleTapWaiting ? (this.doubleTapWaiting = !1, clearTimeout(this.doubleTapTimer ?? void 0), this.fire("doubletap", e)) : (this.doubleTapWaiting = !0, this.doubleTapTimer = setTimeout(() => this.doubleTapWaiting = !1, this.opts.doubleTapTime), this.fire("tap", e)));
			}
			!this.touch1 && !this.touch2 && (this.fire("pinchend", e), this.fire("rotateend", e), this.originalDistance = null, this.newDistance = null, this.scale = null, this.originalAngle = null, this.newAngle = null, this.rotation = null);
		}
	}
};
TinyGesture.defaults = {
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
var TinyGesture_default = TinyGesture, passiveIfSupported = !1;
try {
	window.addEventListener("test", null, Object.defineProperty({}, "passive", { get: function() {
		passiveIfSupported = { passive: !0 };
	} }));
} catch {}
var eDownKeys = /* @__PURE__ */ function(e) {
	return e[e.NO_PUSH = 0] = "NO_PUSH", e[e.ONE_PUSH = 1] = "ONE_PUSH", e[e.PUSH_REPEATING = 2] = "PUSH_REPEATING", e;
}(eDownKeys || {}), EventMng = class {
	#e = new EventListenerCtn();
	#t;
	#n;
	#r = new Map([[0, ""], [1, "middle"]]);
	constructor(n, r, a, o, u, d, f, h, v) {
		if (this.cfg = n, this.hTag = r, this.appPixi = a, this.main = o, this.layMng = u, this.val = d, this.scrItr = h, this.sys = v, r.clear_event = (e) => ReadingState.clear_event(e), r.event = (e) => this.#_(e), r.set_cancel_skip = () => !1, r.set_focus = (e) => this.#y(e), this.#t = new FocusMng(a.view, v), f.setEvtMng(this), h.setOtherObj(this, u), TxtLayer.setEvtMng(this, v, h), u.setEvtMng(this), Reading.setFcs(this.#t), v.setFire((e, t) => Reading.fire(e, t)), CmnLib.isDbg) {
			let e = { pause: () => {
				if (!Reading.isWait) return;
				let e = {};
				h.recodeDesign(e), v.callHook("_enterDesign", e), v.send2Dbg("_enterDesign", e);
			} };
			e.attach = e.stopOnEntry = e.stopOnStep = e.stopOnStepIn = e.stopOnStepOut = e.stopOnBackstep = e.pause, v.addHook((t) => e[t]?.());
		}
		addStyle("\n.sn_hint {\n	background-color: #3c3225;\n	color: white;\n	padding: 4px 8px;\n	border-radius: 4px;\n	font-size: 1.2em;\n	z-index: 10000;\n	pointer-events: none;\n	user-select: none;\n}\n\n.sn_hint_ar,\n.sn_hint_ar::before {\n	position: absolute;\n	width: 8px;\n	height: 8px;\n	background: inherit;\n}\n.sn_hint_ar {\n	visibility: hidden;\n}\n.sn_hint_ar::before {\n	visibility: visible;\n	content: '';\n	transform: rotate(45deg);\n}\n\n.sn_hint[data-popper-placement^='top']		> .sn_hint_ar {bottom: -4px;}\n.sn_hint[data-popper-placement^='bottom']	> .sn_hint_ar {top: -4px;}\n.sn_hint[data-popper-placement^='left']		> .sn_hint_ar {right: -4px;}\n.sn_hint[data-popper-placement^='right']	> .sn_hint_ar {left: -4px;}\n"), o.cvs.parentElement?.insertAdjacentHTML("beforeend", "\n<div class=\"sn_hint\" role=\"tooltip\">\n	<span>Dummy</span>\n	<div class=\"sn_hint_ar\" data-popper-arrow></div>\n</div>"), this.#f = document.querySelector(".sn_hint"), this.#p = this.#f.querySelector("span"), this.#m = createPopper(this.#d, this.#f), this.#f.hidden = !0, a.stage.interactive = !0, this.#e.add(document.body, EVNM_KEY, (e) => this.#a(e)), this.#e.add(document.body, "keyup", () => ReadingState.resetFired()), this.#e.add(o.cvs, "contextmenu", (e) => {
			let t = this.#o(e) + "rightclick";
			Reading.fire(t, e, !0), e.preventDefault();
		});
		let { width: y, height: b } = n.oCfg.window, x = Math.floor(y > b ? b / 3 : y / 3);
		this.#n = new TinyGesture_default(o.cvs, {
			velocityThreshold: 0,
			disregardVelocityThreshold: (e) => Math.floor(x * (e === "x" ? 1 : .5))
		});
		let S = !1;
		this.#n.on("tap", (e) => {
			if (S) return;
			if (e instanceof TouchEvent) {
				Reading.fire("click", e, !0), ReadingState.resetFired();
				return;
			}
			if (e.button > 1) return;
			let t = this.#o(e) + `${this.#r.get(e.button) ?? ""}click`;
			Reading.fire(t, e, !0), ReadingState.resetFired();
		}), this.#e.add(window, "pointerout", () => ReadingState.resetFired()), this.#n.on("longpress", (e) => {
			if (S = !0, e instanceof TouchEvent) {
				Reading.fire("longpress", e, !0);
				return;
			}
			let t = this.#o(e) + `${this.#r.get(e.button) ?? ""}longpress`;
			Reading.fire(t, e, !0);
		}), this.#n.on("panend", () => {
			S && queueMicrotask(() => {
				S = !1;
			});
		}), [
			"swiperight",
			"swipeleft",
			"swipeup",
			"swipedown"
		].forEach((e) => {
			this.#n.on(e, (t) => {
				if (t instanceof TouchEvent) {
					Reading.fire(e, t, !0);
					return;
				}
				let n = this.#o(t) + e;
				Reading.fire(n, t, !0);
			});
		});
		let C = () => d.setVal_Nochk("tmp", "const.sn.navigator.language", navigator.language);
		this.#e.add(globalThis, "languagechange", (e) => {
			C(), Reading.fire("sn:chgNavLang", e), clearTextureCache();
		}), C();
		let w = (e) => {
			CmnLib.isDarkMode = e.matches, d.setVal_Nochk("tmp", "const.sn.isDarkMode", CmnLib.isDarkMode);
		}, T = globalThis.matchMedia("(prefers-color-scheme: dark)");
		w(T), this.#e.add(T, "change", (e) => {
			w(e), Reading.fire("sn:chgDarkMode", e);
		});
		let E = (e, t) => {};
		"WheelEvent" in globalThis && (this.#e.add(o.cvs, "wheel", (e) => this.#s(e), { passive: !0 }), this.#i = (e) => this.#e.add(e, "wheel", (e) => this.#s(e), { passive: !0 }), E = (e, t) => e.add(o.cvs, "wheel", (e) => {
			e.deltaY <= 0 || (e.stopPropagation(), t());
		})), Reading.init(n, r, o, d, h, u, this, f, E), import("./gamepad.js").then(__toDynamicImportESM()).then(({ GamepadListener: e }) => {
			let n = new e({
				analog: !1,
				deadZone: .3
			});
			CmnLib.debugLog && (n.on("gamepad:connected", ({ detail: e }) => console.log(`👺<'gamepad:connected' index:${String(e.index)} id:${e.gamepad.id}`)), n.on("gamepad:disconnected", ({ detail: e }) => console.log(`👺<'gamepad:disconnected' index:${String(e.index)} id:${e.gamepad.id}`)));
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
			n.on("gamepad:axis", ({ detail: e }) => {
				if (!document.hasFocus()) return;
				i[e.axis] = e.value;
				let [n = 0, a = 0] = i, o = r[(a + 1) * 3 + (n + 1)];
				if (!o) return;
				let s = this.#t.getFocus();
				(!s || s instanceof Container ? globalThis : s).dispatchEvent(new KeyboardEvent(EVNM_KEY, {
					key: o,
					bubbles: !0
				})), !(!s || s instanceof Container) && (Reading.cancelAutoSkip(), s.getAttribute("type") === "range" && s.dispatchEvent(new InputEvent("input", { bubbles: !0 })));
			}), n.on("gamepad:button", (e) => {
				if (document.hasFocus()) if (e.detail.button % 2 == 0) {
					Reading.cancelAutoSkip();
					let e = this.#t.getFocus();
					(!e || e instanceof Container ? document.body : e).dispatchEvent(new KeyboardEvent(EVNM_KEY, {
						key: "Enter",
						bubbles: !0
					}));
				} else Reading.fire("middleclick", e, !0);
			}), n.start();
		}), this.#e.add(document, "keyup", (e) => {
			e.isComposing || e.key in this.#b && (this.#b[e.key] = eDownKeys.NO_PUSH);
		}), d.defTmp("const.sn.key.alternate", () => this.#b.Alt > eDownKeys.NO_PUSH), d.defTmp("const.sn.key.command", () => this.#b.Meta > eDownKeys.NO_PUSH), d.defTmp("const.sn.key.control", () => this.#b.Control > eDownKeys.NO_PUSH), d.defTmp("const.sn.key.end", () => this.#b.End > eDownKeys.NO_PUSH), d.defTmp("const.sn.key.escape", () => this.#b.Escape > eDownKeys.NO_PUSH), d.defTmp("const.sn.key.back", () => this.#b.GoBack > eDownKeys.NO_PUSH);
	}
	resvFlameEvent(e) {
		this.#e.add(e, EVNM_KEY, (e) => this.#a(e)), this.#e.add(e, "contextmenu", (e) => {
			Reading.fire(this.#o(e) + "rightclick", e, !0), e.preventDefault();
		}), this.#i(e), this.#e.add(e, EVNM_CLICK, (e) => {
			if (e instanceof TouchEvent) {
				Reading.fire("click", e, !0);
				return;
			}
			if (e.button > 1) return;
			let t = this.#o(e) + `${this.#r.get(e.button) ?? ""}click`;
			Reading.fire(t, e, !0);
		}), this.#e.add(e, "pointerup", () => ReadingState.resetFired()), this.#e.add(e, "pointerout", () => ReadingState.resetFired());
	}
	#i = (e) => {};
	#a(e) {
		e.isComposing || (e.key in this.#b && (this.#b[e.key] = e.repeat ? eDownKeys.PUSH_REPEATING : eDownKeys.ONE_PUSH), e.preventDefault(), Reading.fire(SysBase.modKey(e) + e.key, e, !0));
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
		Reading.fire(t, e, !0);
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
		this.#n.destroy(), Reading.destroy(), this.#t.destroy(), this.#e.clear();
	}
	unButton(e) {
		this.#t.remove(e);
	}
	button(e, t, n, i, a) {
		!e.fn && !e.label && !e.url && this.main.errScript("fnまたはlabelまたはurlは必須です"), e.fn ??= this.scrItr.scriptFn, t.interactive = !0, t.cursor = "pointer";
		let c = e.key?.toLowerCase() ?? " ", l = argChk_Boolean(e, "global", !1);
		ReadingState.setEvt2Fnc(l, c, () => this.main.resumeByJumpOrCall(e)), t.on(EVNM_BUTTON, (e) => {
			e.preventDefault?.(), Reading.fire(c, e, !0);
		});
		let u = e.hint ? () => this.#g(e, t) : () => {}, f = () => {
			n(), this.#f.hidden = !0;
		}, g = () => (u(), i());
		if (t.on("pointerover", g), t.on("pointerout", () => {
			this.#t.isFocus(t) ? g() : f();
		}), t.on("pointerdown", () => {
			this.#f.hidden = !0;
			let e = this.#t.getFocus();
			a(), e instanceof Button && e.normal();
		}), t.on("pointerup", CmnLib.isMobile ? f : () => {
			this.#t.isFocus(t) ? g() : f();
		}), this.#t.add(t, g, f), e.clickse && (e.clicksebuf ??= "SYS", this.cfg.searchPath(e.clickse, SEARCH_PATH_ARG_EXT.SOUND), t.on("pointerdown", () => this.hTag.playse({
			fn: e.clickse,
			...e.clicksebuf ? { buf: e.clicksebuf } : {},
			join: !1
		}))), e.enterse && (e.entersebuf ??= "SYS", this.cfg.searchPath(e.enterse, SEARCH_PATH_ARG_EXT.SOUND), t.on("pointerover", () => this.hTag.playse({
			fn: e.enterse,
			...e.entersebuf ? { buf: e.entersebuf } : {},
			join: !1
		}))), e.leavese && (e.leavesebuf ??= "SYS", this.cfg.searchPath(e.leavese, SEARCH_PATH_ARG_EXT.SOUND), t.on("pointerout", () => this.hTag.playse({
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
			ReadingState.setEvt2Fnc(l, n, () => this.main.resumeByJumpOrCall(r)), t.on("pointerover", (e) => Reading.fire(n, e));
		}
		if (e.onleave) {
			let n = c + e.onleave.toLowerCase(), r = {
				fn: e.fn,
				label: e.onleave,
				call: !0,
				key: n
			};
			ReadingState.setEvt2Fnc(l, n, () => this.main.resumeByJumpOrCall(r)), t.on("pointerout", (e) => Reading.fire(n, e));
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
	#g(e, t) {
		let r = t instanceof Button ? t.getBtnBounds() : t.getBounds();
		if (e[":タグ名"] !== "link") {
			let e = t.parent.parent;
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
		}).catch((t) => console.error(mesErrJSON(e, "hint_opt", `dispHint 引数 hint_opt エラー ${t instanceof SyntaxError ? t.message : ""}`)));
	}
	hideHint() {
		this.#f.hidden = !0;
	}
	cvsResize() {
		this.hideHint();
	}
	#_(e) {
		let n = e.key;
		if (!n) throw "keyは必須です";
		let r = n.toLowerCase(), i = argChk_Boolean(e, "call", !1), a = argChk_Boolean(e, "global", !1), { fn: s, label: c, url: l } = e;
		if (argChk_Boolean(e, "del", !1)) {
			if (s || c || i || l) throw "fn/label/callとdelは同時指定できません";
			return ReadingState.clear_eventer(n, a, r), !1;
		}
		if (!s && !c && !l) throw "fn,label,url いずれかは必須です";
		if (e.fn ??= this.scrItr.scriptFn, n.startsWith("dom=")) {
			let r = ReadingState.getHtmlElmList(n);
			if (r.el.length === 0) {
				if (argChk_Boolean(e, "need_err", !0)) throw `HTML内にセレクタ（${r.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
				return !1;
			}
			let i = ["click", EVNM_KEY];
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
			let a = i.length;
			for (let e = 0; e < a; ++e) {
				let t = i[e];
				r.el.forEach((i) => {
					this.#e.add(i, t, (e) => {
						if (!Reading.isWait || this.layMng.getFrmDisabled(r.id) || t === "keydown" && e.key !== "Enter") return;
						let a = i.dataset;
						for (let [e, t] of Object.entries(a)) this.val.setVal_Nochk("tmp", `sn.event.domdata.${e}`, t);
						Reading.fire(n, e);
					}), e === 0 && this.#t.add(i, () => this.#v(i) ? (i.focus(), !0) : !1, () => {});
				});
			}
		}
		return ReadingState.setEvt2Fnc(a, r, () => this.main.resumeByJumpOrCall(e)), !1;
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
			let n = ReadingState.getHtmlElmList(t);
			if (n.el.length === 0 && argChk_Boolean(e, "need_err", !0)) throw `HTML内にセレクタ（${n.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
			return n.el.forEach((e) => this.#t.add(e, () => this.#v(e) ? (e.focus(), !0) : !1, () => {})), !1;
		}
		if (n?.startsWith("dom=")) {
			let t = ReadingState.getHtmlElmList(n);
			if (t.el.length === 0 && argChk_Boolean(e, "need_err", !0)) throw `HTML内にセレクタ（${t.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
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
		return Reading.isSkipping ? !0 : Object.keys(this.#b).some((e) => this.#b[e] === eDownKeys.PUSH_REPEATING);
	}
	#b = {
		Alt: eDownKeys.NO_PUSH,
		Meta: eDownKeys.NO_PUSH,
		Control: eDownKeys.NO_PUSH,
		ArrowDown: eDownKeys.NO_PUSH,
		End: eDownKeys.NO_PUSH,
		Enter: eDownKeys.NO_PUSH,
		Escape: eDownKeys.NO_PUSH,
		" ": eDownKeys.NO_PUSH,
		GoBack: eDownKeys.NO_PUSH
	};
};
export { EventMng };

//# sourceMappingURL=EventMng.js.map