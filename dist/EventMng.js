import { E as se, C as ht, f as G, g as it, h as Ee, j as Te, k as Oe, S as ke, e as J, l as _e, m as Lt, n as Me } from "./web2.js";
import { T as Se, B as Jt } from "./LayerMng.js";
import { R as D, a as k } from "./Reading.js";
class De {
  #e = [];
  #t = -1;
  #r = new se();
  destroy() {
    this.#e = [], this.#t = -1, this.#r.clear();
  }
  add(t, e, n) {
    if (this.#e.findIndex((o) => o.btn === t) >= 0) return;
    if (t instanceof ht) {
      t.on("pointerdown", () => {
        for (let o = this.#e.length - 1; o >= 0; --o)
          if (this.#e[o].btn === t) {
            this.#t = o;
            return;
          }
        this.#t = -1;
      }), this.#e.push({ btn: t, on: e, off: n });
      return;
    }
    this.#r.add(t, "focus", () => {
      for (let o = this.#e.length - 1; o >= 0; --o)
        if (this.#e[o].btn === t) {
          this.#t = o;
          return;
        }
      this.#t = -1;
    });
    let r = (o) => {
    }, s = t.localName === "button" || t.localName === "a" ? (o) => !o.isTrusted && o.key === "Enter" : (o) => o.key === "Enter";
    const l = t;
    switch (l.type ?? "") {
      //	switch (btn.getAttribute('type') ?? '') {	// textareaで''になる
      case "checkbox":
        r = () => {
          l.checked = !l.checked;
        };
        break;
      case "":
        t.querySelectorAll("input[type]").length > 0 && (r = (o) => this.#a(t, o.key), s = () => !1);
        break;
      case "range":
        r = (o) => {
          o.isTrusted || (o.key === "ArrowUp" ? l.stepUp() : l.stepDown());
        };
        break;
      case "text":
      case "textarea":
        r = (o) => {
          if (o.isTrusted) return;
          let a = (l.selectionStart ?? 0) + (o.key === "ArrowUp" ? -1 : 1);
          a < 0 && (a = 0), l.setSelectionRange(a, a);
        };
        break;
    }
    this.#r.add(t, G, (o) => {
      if (!(o.key !== "ArrowUp" && o.key !== "ArrowDown" && o.key !== "Enter")) {
        if (o.stopImmediatePropagation(), s(o)) {
          t.dispatchEvent(new MouseEvent("click"));
          return;
        }
        r(o);
      }
    }, { passive: !0 }), t.hasAttribute("tabindex") || (t.tabIndex = 0), this.#e.push({ btn: t, on: e, off: n });
  }
  remove(t) {
    const e = this.#e.findIndex((n) => n.btn === t);
    e < 0 || (this.#e.splice(e, 1), this.#e.length === 0 ? this.#t = -1 : e <= this.#t && --this.#t);
  }
  #a(t, e) {
    const n = t.querySelectorAll("input[type]"), r = n.length;
    for (let s = 0; s < r; ++s)
      if (n[s].checked) {
        n[(s + r + (e === "ArrowUp" ? -1 : 1)) % r].checked = !0;
        break;
      }
  }
  isFocus(t) {
    return this.#t < 0 ? !1 : this.#e[this.#t].btn === t;
  }
  prev() {
    this.#o();
    const t = this.#e.length;
    if (t !== 0) {
      --this.#t < 0 && (this.#t = t - 1);
      for (let e = t; e >= 1; --e) {
        const n = (this.#t + e) % t;
        if (this.#e[n].on()) {
          this.#t = n, this.#l(n);
          return;
        }
      }
      this.#t = -1;
    }
  }
  next() {
    this.#o();
    const t = this.#e.length;
    if (t !== 0) {
      ++this.#t >= t && (this.#t = 0);
      for (let e = 0; e < t; ++e) {
        const n = (this.#t + e) % t;
        if (this.#e[n].on()) {
          this.#t = n, this.#l(n);
          return;
        }
      }
      this.#t = -1;
    }
  }
  #l = it.debugLog ? (t) => console.log(`👾 <FocusMng idx:${String(t)} btn:%o`, this.#e[t].btn) : () => {
  };
  getFocus() {
    if (this.#t < 0) return null;
    this.#o(), this.#t >= this.#e.length && (this.#t = 0);
    const t = this.#e[this.#t];
    return t.on() ? t.btn : null;
  }
  blur() {
    this.#o(), this.#t = -1, globalThis.focus();
  }
  #o() {
    for (let t = this.#e.length - 1; t >= 0; --t) {
      const e = this.#e[t];
      !(e.btn instanceof ht) || e.btn.parent ? e.off() : this.#e.splice(t, 1);
    }
  }
}
var C = "top", R = "bottom", $ = "right", Y = "left", Xt = "auto", vt = [C, R, $, Y], nt = "start", ft = "end", Pe = "clippingParents", ae = "viewport", ct = "popper", Le = "reference", Gt = /* @__PURE__ */ vt.reduce(function(i, t) {
  return i.concat([t + "-" + nt, t + "-" + ft]);
}, []), le = /* @__PURE__ */ [].concat(vt, [Xt]).reduce(function(i, t) {
  return i.concat([t, t + "-" + nt, t + "-" + ft]);
}, []), Ce = "beforeRead", Ye = "read", Xe = "afterRead", je = "beforeMain", He = "main", Re = "afterMain", $e = "beforeWrite", Fe = "write", Ve = "afterWrite", Ae = [Ce, Ye, Xe, je, He, Re, $e, Fe, Ve];
function W(i) {
  return i ? (i.nodeName || "").toLowerCase() : null;
}
function j(i) {
  if (i == null)
    return window;
  if (i.toString() !== "[object Window]") {
    var t = i.ownerDocument;
    return t && t.defaultView || window;
  }
  return i;
}
function tt(i) {
  var t = j(i).Element;
  return i instanceof t || i instanceof Element;
}
function H(i) {
  var t = j(i).HTMLElement;
  return i instanceof t || i instanceof HTMLElement;
}
function jt(i) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = j(i).ShadowRoot;
  return i instanceof t || i instanceof ShadowRoot;
}
function We(i) {
  var t = i.state;
  Object.keys(t.elements).forEach(function(e) {
    var n = t.styles[e] || {}, r = t.attributes[e] || {}, s = t.elements[e];
    !H(s) || !W(s) || (Object.assign(s.style, n), Object.keys(r).forEach(function(l) {
      var o = r[l];
      o === !1 ? s.removeAttribute(l) : s.setAttribute(l, o === !0 ? "" : o);
    }));
  });
}
function Be(i) {
  var t = i.state, e = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, e.popper), t.styles = e, t.elements.arrow && Object.assign(t.elements.arrow.style, e.arrow), function() {
    Object.keys(t.elements).forEach(function(n) {
      var r = t.elements[n], s = t.attributes[n] || {}, l = Object.keys(t.styles.hasOwnProperty(n) ? t.styles[n] : e[n]), o = l.reduce(function(a, u) {
        return a[u] = "", a;
      }, {});
      !H(r) || !W(r) || (Object.assign(r.style, o), Object.keys(s).forEach(function(a) {
        r.removeAttribute(a);
      }));
    });
  };
}
const Ne = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: We,
  effect: Be,
  requires: ["computeStyles"]
};
function A(i) {
  return i.split("-")[0];
}
var Q = Math.max, Ot = Math.min, rt = Math.round;
function Ct() {
  var i = navigator.userAgentData;
  return i != null && i.brands && Array.isArray(i.brands) ? i.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function ce() {
  return !/^((?!chrome|android).)*safari/i.test(Ct());
}
function ot(i, t, e) {
  t === void 0 && (t = !1), e === void 0 && (e = !1);
  var n = i.getBoundingClientRect(), r = 1, s = 1;
  t && H(i) && (r = i.offsetWidth > 0 && rt(n.width) / i.offsetWidth || 1, s = i.offsetHeight > 0 && rt(n.height) / i.offsetHeight || 1);
  var l = tt(i) ? j(i) : window, o = l.visualViewport, a = !ce() && e, u = (n.left + (a && o ? o.offsetLeft : 0)) / r, h = (n.top + (a && o ? o.offsetTop : 0)) / s, p = n.width / r, g = n.height / s;
  return {
    width: p,
    height: g,
    top: h,
    right: u + p,
    bottom: h + g,
    left: u,
    x: u,
    y: h
  };
}
function Ht(i) {
  var t = ot(i), e = i.offsetWidth, n = i.offsetHeight;
  return Math.abs(t.width - e) <= 1 && (e = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: i.offsetLeft,
    y: i.offsetTop,
    width: e,
    height: n
  };
}
function he(i, t) {
  var e = t.getRootNode && t.getRootNode();
  if (i.contains(t))
    return !0;
  if (e && jt(e)) {
    var n = t;
    do {
      if (n && i.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function B(i) {
  return j(i).getComputedStyle(i);
}
function qe(i) {
  return ["table", "td", "th"].indexOf(W(i)) >= 0;
}
function q(i) {
  return ((tt(i) ? i.ownerDocument : (
    // $FlowFixMe[prop-missing]
    i.document
  )) || window.document).documentElement;
}
function kt(i) {
  return W(i) === "html" ? i : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    i.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    i.parentNode || // DOM Element detected
    (jt(i) ? i.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    q(i)
  );
}
function Zt(i) {
  return !H(i) || // https://github.com/popperjs/popper-core/issues/837
  B(i).position === "fixed" ? null : i.offsetParent;
}
function Ie(i) {
  var t = /firefox/i.test(Ct()), e = /Trident/i.test(Ct());
  if (e && H(i)) {
    var n = B(i);
    if (n.position === "fixed")
      return null;
  }
  var r = kt(i);
  for (jt(r) && (r = r.host); H(r) && ["html", "body"].indexOf(W(r)) < 0; ) {
    var s = B(r);
    if (s.transform !== "none" || s.perspective !== "none" || s.contain === "paint" || ["transform", "perspective"].indexOf(s.willChange) !== -1 || t && s.willChange === "filter" || t && s.filter && s.filter !== "none")
      return r;
    r = r.parentNode;
  }
  return null;
}
function mt(i) {
  for (var t = j(i), e = Zt(i); e && qe(e) && B(e).position === "static"; )
    e = Zt(e);
  return e && (W(e) === "html" || W(e) === "body" && B(e).position === "static") ? t : e || Ie(i) || t;
}
function Rt(i) {
  return ["top", "bottom"].indexOf(i) >= 0 ? "x" : "y";
}
function ut(i, t, e) {
  return Q(i, Ot(t, e));
}
function ze(i, t, e) {
  var n = ut(i, t, e);
  return n > e ? e : n;
}
function ue() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function de(i) {
  return Object.assign({}, ue(), i);
}
function fe(i, t) {
  return t.reduce(function(e, n) {
    return e[n] = i, e;
  }, {});
}
var Ue = function(t, e) {
  return t = typeof t == "function" ? t(Object.assign({}, e.rects, {
    placement: e.placement
  })) : t, de(typeof t != "number" ? t : fe(t, vt));
};
function Ke(i) {
  var t, e = i.state, n = i.name, r = i.options, s = e.elements.arrow, l = e.modifiersData.popperOffsets, o = A(e.placement), a = Rt(o), u = [Y, $].indexOf(o) >= 0, h = u ? "height" : "width";
  if (!(!s || !l)) {
    var p = Ue(r.padding, e), g = Ht(s), d = a === "y" ? C : Y, m = a === "y" ? R : $, v = e.rects.reference[h] + e.rects.reference[a] - l[a] - e.rects.popper[h], y = l[a] - e.rects.reference[a], w = mt(s), c = w ? a === "y" ? w.clientHeight || 0 : w.clientWidth || 0 : 0, f = v / 2 - y / 2, b = p[d], E = c - g[h] - p[m], x = c / 2 - g[h] / 2 + f, T = ut(b, x, E), S = a;
    e.modifiersData[n] = (t = {}, t[S] = T, t.centerOffset = T - x, t);
  }
}
function Je(i) {
  var t = i.state, e = i.options, n = e.element, r = n === void 0 ? "[data-popper-arrow]" : n;
  r != null && (typeof r == "string" && (r = t.elements.popper.querySelector(r), !r) || he(t.elements.popper, r) && (t.elements.arrow = r));
}
const Ge = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Ke,
  effect: Je,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function st(i) {
  return i.split("-")[1];
}
var Ze = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Qe(i, t) {
  var e = i.x, n = i.y, r = t.devicePixelRatio || 1;
  return {
    x: rt(e * r) / r || 0,
    y: rt(n * r) / r || 0
  };
}
function Qt(i) {
  var t, e = i.popper, n = i.popperRect, r = i.placement, s = i.variation, l = i.offsets, o = i.position, a = i.gpuAcceleration, u = i.adaptive, h = i.roundOffsets, p = i.isFixed, g = l.x, d = g === void 0 ? 0 : g, m = l.y, v = m === void 0 ? 0 : m, y = typeof h == "function" ? h({
    x: d,
    y: v
  }) : {
    x: d,
    y: v
  };
  d = y.x, v = y.y;
  var w = l.hasOwnProperty("x"), c = l.hasOwnProperty("y"), f = Y, b = C, E = window;
  if (u) {
    var x = mt(e), T = "clientHeight", S = "clientWidth";
    if (x === j(e) && (x = q(e), B(x).position !== "static" && o === "absolute" && (T = "scrollHeight", S = "scrollWidth")), x = x, r === C || (r === Y || r === $) && s === ft) {
      b = R;
      var M = p && x === E && E.visualViewport ? E.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        x[T]
      );
      v -= M - n.height, v *= a ? 1 : -1;
    }
    if (r === Y || (r === C || r === R) && s === ft) {
      f = $;
      var _ = p && x === E && E.visualViewport ? E.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        x[S]
      );
      d -= _ - n.width, d *= a ? 1 : -1;
    }
  }
  var O = Object.assign({
    position: o
  }, u && Ze), P = h === !0 ? Qe({
    x: d,
    y: v
  }, j(e)) : {
    x: d,
    y: v
  };
  if (d = P.x, v = P.y, a) {
    var L;
    return Object.assign({}, O, (L = {}, L[b] = c ? "0" : "", L[f] = w ? "0" : "", L.transform = (E.devicePixelRatio || 1) <= 1 ? "translate(" + d + "px, " + v + "px)" : "translate3d(" + d + "px, " + v + "px, 0)", L));
  }
  return Object.assign({}, O, (t = {}, t[b] = c ? v + "px" : "", t[f] = w ? d + "px" : "", t.transform = "", t));
}
function ti(i) {
  var t = i.state, e = i.options, n = e.gpuAcceleration, r = n === void 0 ? !0 : n, s = e.adaptive, l = s === void 0 ? !0 : s, o = e.roundOffsets, a = o === void 0 ? !0 : o, u = {
    placement: A(t.placement),
    variation: st(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: r,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Qt(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: l,
    roundOffsets: a
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Qt(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: a
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const ei = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: ti,
  data: {}
};
var Et = {
  passive: !0
};
function ii(i) {
  var t = i.state, e = i.instance, n = i.options, r = n.scroll, s = r === void 0 ? !0 : r, l = n.resize, o = l === void 0 ? !0 : l, a = j(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return s && u.forEach(function(h) {
    h.addEventListener("scroll", e.update, Et);
  }), o && a.addEventListener("resize", e.update, Et), function() {
    s && u.forEach(function(h) {
      h.removeEventListener("scroll", e.update, Et);
    }), o && a.removeEventListener("resize", e.update, Et);
  };
}
const ni = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: ii,
  data: {}
};
var ri = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Tt(i) {
  return i.replace(/left|right|bottom|top/g, function(t) {
    return ri[t];
  });
}
var oi = {
  start: "end",
  end: "start"
};
function te(i) {
  return i.replace(/start|end/g, function(t) {
    return oi[t];
  });
}
function $t(i) {
  var t = j(i), e = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: e,
    scrollTop: n
  };
}
function Ft(i) {
  return ot(q(i)).left + $t(i).scrollLeft;
}
function si(i, t) {
  var e = j(i), n = q(i), r = e.visualViewport, s = n.clientWidth, l = n.clientHeight, o = 0, a = 0;
  if (r) {
    s = r.width, l = r.height;
    var u = ce();
    (u || !u && t === "fixed") && (o = r.offsetLeft, a = r.offsetTop);
  }
  return {
    width: s,
    height: l,
    x: o + Ft(i),
    y: a
  };
}
function ai(i) {
  var t, e = q(i), n = $t(i), r = (t = i.ownerDocument) == null ? void 0 : t.body, s = Q(e.scrollWidth, e.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), l = Q(e.scrollHeight, e.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), o = -n.scrollLeft + Ft(i), a = -n.scrollTop;
  return B(r || e).direction === "rtl" && (o += Q(e.clientWidth, r ? r.clientWidth : 0) - s), {
    width: s,
    height: l,
    x: o,
    y: a
  };
}
function Vt(i) {
  var t = B(i), e = t.overflow, n = t.overflowX, r = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(e + r + n);
}
function pe(i) {
  return ["html", "body", "#document"].indexOf(W(i)) >= 0 ? i.ownerDocument.body : H(i) && Vt(i) ? i : pe(kt(i));
}
function dt(i, t) {
  var e;
  t === void 0 && (t = []);
  var n = pe(i), r = n === ((e = i.ownerDocument) == null ? void 0 : e.body), s = j(n), l = r ? [s].concat(s.visualViewport || [], Vt(n) ? n : []) : n, o = t.concat(l);
  return r ? o : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    o.concat(dt(kt(l)))
  );
}
function Yt(i) {
  return Object.assign({}, i, {
    left: i.x,
    top: i.y,
    right: i.x + i.width,
    bottom: i.y + i.height
  });
}
function li(i, t) {
  var e = ot(i, !1, t === "fixed");
  return e.top = e.top + i.clientTop, e.left = e.left + i.clientLeft, e.bottom = e.top + i.clientHeight, e.right = e.left + i.clientWidth, e.width = i.clientWidth, e.height = i.clientHeight, e.x = e.left, e.y = e.top, e;
}
function ee(i, t, e) {
  return t === ae ? Yt(si(i, e)) : tt(t) ? li(t, e) : Yt(ai(q(i)));
}
function ci(i) {
  var t = dt(kt(i)), e = ["absolute", "fixed"].indexOf(B(i).position) >= 0, n = e && H(i) ? mt(i) : i;
  return tt(n) ? t.filter(function(r) {
    return tt(r) && he(r, n) && W(r) !== "body";
  }) : [];
}
function hi(i, t, e, n) {
  var r = t === "clippingParents" ? ci(i) : [].concat(t), s = [].concat(r, [e]), l = s[0], o = s.reduce(function(a, u) {
    var h = ee(i, u, n);
    return a.top = Q(h.top, a.top), a.right = Ot(h.right, a.right), a.bottom = Ot(h.bottom, a.bottom), a.left = Q(h.left, a.left), a;
  }, ee(i, l, n));
  return o.width = o.right - o.left, o.height = o.bottom - o.top, o.x = o.left, o.y = o.top, o;
}
function ve(i) {
  var t = i.reference, e = i.element, n = i.placement, r = n ? A(n) : null, s = n ? st(n) : null, l = t.x + t.width / 2 - e.width / 2, o = t.y + t.height / 2 - e.height / 2, a;
  switch (r) {
    case C:
      a = {
        x: l,
        y: t.y - e.height
      };
      break;
    case R:
      a = {
        x: l,
        y: t.y + t.height
      };
      break;
    case $:
      a = {
        x: t.x + t.width,
        y: o
      };
      break;
    case Y:
      a = {
        x: t.x - e.width,
        y: o
      };
      break;
    default:
      a = {
        x: t.x,
        y: t.y
      };
  }
  var u = r ? Rt(r) : null;
  if (u != null) {
    var h = u === "y" ? "height" : "width";
    switch (s) {
      case nt:
        a[u] = a[u] - (t[h] / 2 - e[h] / 2);
        break;
      case ft:
        a[u] = a[u] + (t[h] / 2 - e[h] / 2);
        break;
    }
  }
  return a;
}
function pt(i, t) {
  t === void 0 && (t = {});
  var e = t, n = e.placement, r = n === void 0 ? i.placement : n, s = e.strategy, l = s === void 0 ? i.strategy : s, o = e.boundary, a = o === void 0 ? Pe : o, u = e.rootBoundary, h = u === void 0 ? ae : u, p = e.elementContext, g = p === void 0 ? ct : p, d = e.altBoundary, m = d === void 0 ? !1 : d, v = e.padding, y = v === void 0 ? 0 : v, w = de(typeof y != "number" ? y : fe(y, vt)), c = g === ct ? Le : ct, f = i.rects.popper, b = i.elements[m ? c : g], E = hi(tt(b) ? b : b.contextElement || q(i.elements.popper), a, h, l), x = ot(i.elements.reference), T = ve({
    reference: x,
    element: f,
    placement: r
  }), S = Yt(Object.assign({}, f, T)), M = g === ct ? S : x, _ = {
    top: E.top - M.top + w.top,
    bottom: M.bottom - E.bottom + w.bottom,
    left: E.left - M.left + w.left,
    right: M.right - E.right + w.right
  }, O = i.modifiersData.offset;
  if (g === ct && O) {
    var P = O[r];
    Object.keys(_).forEach(function(L) {
      var F = [$, R].indexOf(L) >= 0 ? 1 : -1, I = [C, R].indexOf(L) >= 0 ? "y" : "x";
      _[L] += P[I] * F;
    });
  }
  return _;
}
function ui(i, t) {
  t === void 0 && (t = {});
  var e = t, n = e.placement, r = e.boundary, s = e.rootBoundary, l = e.padding, o = e.flipVariations, a = e.allowedAutoPlacements, u = a === void 0 ? le : a, h = st(n), p = h ? o ? Gt : Gt.filter(function(m) {
    return st(m) === h;
  }) : vt, g = p.filter(function(m) {
    return u.indexOf(m) >= 0;
  });
  g.length === 0 && (g = p);
  var d = g.reduce(function(m, v) {
    return m[v] = pt(i, {
      placement: v,
      boundary: r,
      rootBoundary: s,
      padding: l
    })[A(v)], m;
  }, {});
  return Object.keys(d).sort(function(m, v) {
    return d[m] - d[v];
  });
}
function di(i) {
  if (A(i) === Xt)
    return [];
  var t = Tt(i);
  return [te(i), t, te(t)];
}
function fi(i) {
  var t = i.state, e = i.options, n = i.name;
  if (!t.modifiersData[n]._skip) {
    for (var r = e.mainAxis, s = r === void 0 ? !0 : r, l = e.altAxis, o = l === void 0 ? !0 : l, a = e.fallbackPlacements, u = e.padding, h = e.boundary, p = e.rootBoundary, g = e.altBoundary, d = e.flipVariations, m = d === void 0 ? !0 : d, v = e.allowedAutoPlacements, y = t.options.placement, w = A(y), c = w === y, f = a || (c || !m ? [Tt(y)] : di(y)), b = [y].concat(f).reduce(function(et, N) {
      return et.concat(A(N) === Xt ? ui(t, {
        placement: N,
        boundary: h,
        rootBoundary: p,
        padding: u,
        flipVariations: m,
        allowedAutoPlacements: v
      }) : N);
    }, []), E = t.rects.reference, x = t.rects.popper, T = /* @__PURE__ */ new Map(), S = !0, M = b[0], _ = 0; _ < b.length; _++) {
      var O = b[_], P = A(O), L = st(O) === nt, F = [C, R].indexOf(P) >= 0, I = F ? "width" : "height", X = pt(t, {
        placement: O,
        boundary: h,
        rootBoundary: p,
        altBoundary: g,
        padding: u
      }), V = F ? L ? $ : Y : L ? R : C;
      E[I] > x[I] && (V = Tt(V));
      var gt = Tt(V), z = [];
      if (s && z.push(X[P] <= 0), o && z.push(X[V] <= 0, X[gt] <= 0), z.every(function(et) {
        return et;
      })) {
        M = O, S = !1;
        break;
      }
      T.set(O, z);
    }
    if (S)
      for (var yt = m ? 3 : 1, Mt = function(N) {
        var lt = b.find(function(wt) {
          var U = T.get(wt);
          if (U)
            return U.slice(0, N).every(function(St) {
              return St;
            });
        });
        if (lt)
          return M = lt, "break";
      }, at = yt; at > 0; at--) {
        var bt = Mt(at);
        if (bt === "break") break;
      }
    t.placement !== M && (t.modifiersData[n]._skip = !0, t.placement = M, t.reset = !0);
  }
}
const pi = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: fi,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function ie(i, t, e) {
  return e === void 0 && (e = {
    x: 0,
    y: 0
  }), {
    top: i.top - t.height - e.y,
    right: i.right - t.width + e.x,
    bottom: i.bottom - t.height + e.y,
    left: i.left - t.width - e.x
  };
}
function ne(i) {
  return [C, $, R, Y].some(function(t) {
    return i[t] >= 0;
  });
}
function vi(i) {
  var t = i.state, e = i.name, n = t.rects.reference, r = t.rects.popper, s = t.modifiersData.preventOverflow, l = pt(t, {
    elementContext: "reference"
  }), o = pt(t, {
    altBoundary: !0
  }), a = ie(l, n), u = ie(o, r, s), h = ne(a), p = ne(u);
  t.modifiersData[e] = {
    referenceClippingOffsets: a,
    popperEscapeOffsets: u,
    isReferenceHidden: h,
    hasPopperEscaped: p
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": h,
    "data-popper-escaped": p
  });
}
const mi = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: vi
};
function gi(i, t, e) {
  var n = A(i), r = [Y, C].indexOf(n) >= 0 ? -1 : 1, s = typeof e == "function" ? e(Object.assign({}, t, {
    placement: i
  })) : e, l = s[0], o = s[1];
  return l = l || 0, o = (o || 0) * r, [Y, $].indexOf(n) >= 0 ? {
    x: o,
    y: l
  } : {
    x: l,
    y: o
  };
}
function yi(i) {
  var t = i.state, e = i.options, n = i.name, r = e.offset, s = r === void 0 ? [0, 0] : r, l = le.reduce(function(h, p) {
    return h[p] = gi(p, t.rects, s), h;
  }, {}), o = l[t.placement], a = o.x, u = o.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += a, t.modifiersData.popperOffsets.y += u), t.modifiersData[n] = l;
}
const bi = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: yi
};
function wi(i) {
  var t = i.state, e = i.name;
  t.modifiersData[e] = ve({
    reference: t.rects.reference,
    element: t.rects.popper,
    placement: t.placement
  });
}
const xi = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: wi,
  data: {}
};
function Ei(i) {
  return i === "x" ? "y" : "x";
}
function Ti(i) {
  var t = i.state, e = i.options, n = i.name, r = e.mainAxis, s = r === void 0 ? !0 : r, l = e.altAxis, o = l === void 0 ? !1 : l, a = e.boundary, u = e.rootBoundary, h = e.altBoundary, p = e.padding, g = e.tether, d = g === void 0 ? !0 : g, m = e.tetherOffset, v = m === void 0 ? 0 : m, y = pt(t, {
    boundary: a,
    rootBoundary: u,
    padding: p,
    altBoundary: h
  }), w = A(t.placement), c = st(t.placement), f = !c, b = Rt(w), E = Ei(b), x = t.modifiersData.popperOffsets, T = t.rects.reference, S = t.rects.popper, M = typeof v == "function" ? v(Object.assign({}, t.rects, {
    placement: t.placement
  })) : v, _ = typeof M == "number" ? {
    mainAxis: M,
    altAxis: M
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, M), O = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, P = {
    x: 0,
    y: 0
  };
  if (x) {
    if (s) {
      var L, F = b === "y" ? C : Y, I = b === "y" ? R : $, X = b === "y" ? "height" : "width", V = x[b], gt = V + y[F], z = V - y[I], yt = d ? -S[X] / 2 : 0, Mt = c === nt ? T[X] : S[X], at = c === nt ? -S[X] : -T[X], bt = t.elements.arrow, et = d && bt ? Ht(bt) : {
        width: 0,
        height: 0
      }, N = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : ue(), lt = N[F], wt = N[I], U = ut(0, T[X], et[X]), St = f ? T[X] / 2 - yt - U - lt - _.mainAxis : Mt - U - lt - _.mainAxis, me = f ? -T[X] / 2 + yt + U + wt + _.mainAxis : at + U + wt + _.mainAxis, Dt = t.elements.arrow && mt(t.elements.arrow), ge = Dt ? b === "y" ? Dt.clientTop || 0 : Dt.clientLeft || 0 : 0, At = (L = O?.[b]) != null ? L : 0, ye = V + St - At - ge, be = V + me - At, Wt = ut(d ? Ot(gt, ye) : gt, V, d ? Q(z, be) : z);
      x[b] = Wt, P[b] = Wt - V;
    }
    if (o) {
      var Bt, we = b === "x" ? C : Y, xe = b === "x" ? R : $, K = x[E], xt = E === "y" ? "height" : "width", Nt = K + y[we], qt = K - y[xe], Pt = [C, Y].indexOf(w) !== -1, It = (Bt = O?.[E]) != null ? Bt : 0, zt = Pt ? Nt : K - T[xt] - S[xt] - It + _.altAxis, Ut = Pt ? K + T[xt] + S[xt] - It - _.altAxis : qt, Kt = d && Pt ? ze(zt, K, Ut) : ut(d ? zt : Nt, K, d ? Ut : qt);
      x[E] = Kt, P[E] = Kt - K;
    }
    t.modifiersData[n] = P;
  }
}
const Oi = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Ti,
  requiresIfExists: ["offset"]
};
function ki(i) {
  return {
    scrollLeft: i.scrollLeft,
    scrollTop: i.scrollTop
  };
}
function _i(i) {
  return i === j(i) || !H(i) ? $t(i) : ki(i);
}
function Mi(i) {
  var t = i.getBoundingClientRect(), e = rt(t.width) / i.offsetWidth || 1, n = rt(t.height) / i.offsetHeight || 1;
  return e !== 1 || n !== 1;
}
function Si(i, t, e) {
  e === void 0 && (e = !1);
  var n = H(t), r = H(t) && Mi(t), s = q(t), l = ot(i, r, e), o = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (n || !n && !e) && ((W(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Vt(s)) && (o = _i(t)), H(t) ? (a = ot(t, !0), a.x += t.clientLeft, a.y += t.clientTop) : s && (a.x = Ft(s))), {
    x: l.left + o.scrollLeft - a.x,
    y: l.top + o.scrollTop - a.y,
    width: l.width,
    height: l.height
  };
}
function Di(i) {
  var t = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Set(), n = [];
  i.forEach(function(s) {
    t.set(s.name, s);
  });
  function r(s) {
    e.add(s.name);
    var l = [].concat(s.requires || [], s.requiresIfExists || []);
    l.forEach(function(o) {
      if (!e.has(o)) {
        var a = t.get(o);
        a && r(a);
      }
    }), n.push(s);
  }
  return i.forEach(function(s) {
    e.has(s.name) || r(s);
  }), n;
}
function Pi(i) {
  var t = Di(i);
  return Ae.reduce(function(e, n) {
    return e.concat(t.filter(function(r) {
      return r.phase === n;
    }));
  }, []);
}
function Li(i) {
  var t;
  return function() {
    return t || (t = new Promise(function(e) {
      Promise.resolve().then(function() {
        t = void 0, e(i());
      });
    })), t;
  };
}
function Ci(i) {
  var t = i.reduce(function(e, n) {
    var r = e[n.name];
    return e[n.name] = r ? Object.assign({}, r, n, {
      options: Object.assign({}, r.options, n.options),
      data: Object.assign({}, r.data, n.data)
    }) : n, e;
  }, {});
  return Object.keys(t).map(function(e) {
    return t[e];
  });
}
var re = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function oe() {
  for (var i = arguments.length, t = new Array(i), e = 0; e < i; e++)
    t[e] = arguments[e];
  return !t.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Yi(i) {
  i === void 0 && (i = {});
  var t = i, e = t.defaultModifiers, n = e === void 0 ? [] : e, r = t.defaultOptions, s = r === void 0 ? re : r;
  return function(o, a, u) {
    u === void 0 && (u = s);
    var h = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, re, s),
      modifiersData: {},
      elements: {
        reference: o,
        popper: a
      },
      attributes: {},
      styles: {}
    }, p = [], g = !1, d = {
      state: h,
      setOptions: function(w) {
        var c = typeof w == "function" ? w(h.options) : w;
        v(), h.options = Object.assign({}, s, h.options, c), h.scrollParents = {
          reference: tt(o) ? dt(o) : o.contextElement ? dt(o.contextElement) : [],
          popper: dt(a)
        };
        var f = Pi(Ci([].concat(n, h.options.modifiers)));
        return h.orderedModifiers = f.filter(function(b) {
          return b.enabled;
        }), m(), d.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!g) {
          var w = h.elements, c = w.reference, f = w.popper;
          if (oe(c, f)) {
            h.rects = {
              reference: Si(c, mt(f), h.options.strategy === "fixed"),
              popper: Ht(f)
            }, h.reset = !1, h.placement = h.options.placement, h.orderedModifiers.forEach(function(_) {
              return h.modifiersData[_.name] = Object.assign({}, _.data);
            });
            for (var b = 0; b < h.orderedModifiers.length; b++) {
              if (h.reset === !0) {
                h.reset = !1, b = -1;
                continue;
              }
              var E = h.orderedModifiers[b], x = E.fn, T = E.options, S = T === void 0 ? {} : T, M = E.name;
              typeof x == "function" && (h = x({
                state: h,
                options: S,
                name: M,
                instance: d
              }) || h);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Li(function() {
        return new Promise(function(y) {
          d.forceUpdate(), y(h);
        });
      }),
      destroy: function() {
        v(), g = !0;
      }
    };
    if (!oe(o, a))
      return d;
    d.setOptions(u).then(function(y) {
      !g && u.onFirstUpdate && u.onFirstUpdate(y);
    });
    function m() {
      h.orderedModifiers.forEach(function(y) {
        var w = y.name, c = y.options, f = c === void 0 ? {} : c, b = y.effect;
        if (typeof b == "function") {
          var E = b({
            state: h,
            name: w,
            instance: d,
            options: f
          }), x = function() {
          };
          p.push(E || x);
        }
      });
    }
    function v() {
      p.forEach(function(y) {
        return y();
      }), p = [];
    }
    return d;
  };
}
var Xi = [ni, xi, ei, Ne, bi, pi, Oi, Ge, mi], ji = /* @__PURE__ */ Yi({
  defaultModifiers: Xi
});
class _t {
  constructor(t, e) {
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
    }, this._onTouchStart = this.onTouchStart.bind(this), this._onTouchMove = this.onTouchMove.bind(this), this._onTouchEnd = this.onTouchEnd.bind(this), this.opts = Object.assign({}, _t.defaults, e), this.element.addEventListener("touchstart", this._onTouchStart, Z), this.element.addEventListener("touchmove", this._onTouchMove, Z), this.element.addEventListener("touchend", this._onTouchEnd, Z), this.opts.mouseSupport && !("ontouchstart" in window) && (this.element.addEventListener("mousedown", this._onTouchStart, Z), document.addEventListener("mousemove", this._onTouchMove, Z), document.addEventListener("mouseup", this._onTouchEnd, Z));
  }
  destroy() {
    var t, e;
    this.element.removeEventListener("touchstart", this._onTouchStart), this.element.removeEventListener("touchmove", this._onTouchMove), this.element.removeEventListener("touchend", this._onTouchEnd), this.element.removeEventListener("mousedown", this._onTouchStart), document.removeEventListener("mousemove", this._onTouchMove), document.removeEventListener("mouseup", this._onTouchEnd), clearTimeout((t = this.longPressTimer) !== null && t !== void 0 ? t : void 0), clearTimeout((e = this.doubleTapTimer) !== null && e !== void 0 ? e : void 0);
  }
  on(t, e) {
    if (this.handlers[t])
      return this.handlers[t].push(e), {
        type: t,
        fn: e,
        cancel: () => this.off(t, e)
      };
  }
  off(t, e) {
    if (this.handlers[t]) {
      const n = this.handlers[t].indexOf(e);
      n !== -1 && this.handlers[t].splice(n, 1);
    }
  }
  fire(t, e) {
    for (let n = 0; n < this.handlers[t].length; n++)
      this.handlers[t][n](e);
  }
  onTouchStart(t) {
    var e, n, r, s, l, o, a, u, h, p, g, d, m, v, y, w, c, f, b, E, x, T, S, M, _, O;
    let P = !1;
    if (t.type !== "mousedown") {
      if (this.touch1 || (this.touch1 = t.changedTouches[0], P = !0), (P && t.changedTouches.length > 1 || !P) && !this.touch2) {
        this.touch2 = [...t.changedTouches].find((L) => {
          var F;
          return L.identifier !== ((F = this.touch1) === null || F === void 0 ? void 0 : F.identifier);
        }) || null, this.originalDistance = Math.sqrt(Math.pow(((n = (e = this.touch2) === null || e === void 0 ? void 0 : e.screenX) !== null && n !== void 0 ? n : 0) - ((o = (s = (r = this.touchMove1) === null || r === void 0 ? void 0 : r.screenX) !== null && s !== void 0 ? s : (l = this.touch1) === null || l === void 0 ? void 0 : l.screenX) !== null && o !== void 0 ? o : 0), 2) + Math.pow(((u = (a = this.touch2) === null || a === void 0 ? void 0 : a.screenY) !== null && u !== void 0 ? u : 0) - ((d = (p = (h = this.touchMove1) === null || h === void 0 ? void 0 : h.screenY) !== null && p !== void 0 ? p : (g = this.touch1) === null || g === void 0 ? void 0 : g.screenY) !== null && d !== void 0 ? d : 0), 2)), this.originalAngle = Math.atan2(((v = (m = this.touch2) === null || m === void 0 ? void 0 : m.screenY) !== null && v !== void 0 ? v : 0) - ((f = (w = (y = this.touchMove1) === null || y === void 0 ? void 0 : y.screenY) !== null && w !== void 0 ? w : (c = this.touch1) === null || c === void 0 ? void 0 : c.screenY) !== null && f !== void 0 ? f : 0), ((E = (b = this.touch2) === null || b === void 0 ? void 0 : b.screenX) !== null && E !== void 0 ? E : 0) - ((M = (T = (x = this.touchMove1) === null || x === void 0 ? void 0 : x.screenX) !== null && T !== void 0 ? T : (S = this.touch1) === null || S === void 0 ? void 0 : S.screenX) !== null && M !== void 0 ? M : 0)) / (Math.PI / 180);
        return;
      }
      if (!P)
        return;
    }
    (P || t.type === "mousedown") && (this.thresholdX = this.opts.threshold("x", this), this.thresholdY = this.opts.threshold("y", this), this.disregardVelocityThresholdX = this.opts.disregardVelocityThreshold("x", this), this.disregardVelocityThresholdY = this.opts.disregardVelocityThreshold("y", this), this.touchStartX = t.type === "mousedown" ? t.screenX : ((_ = this.touch1) === null || _ === void 0 ? void 0 : _.screenX) || 0, this.touchStartY = t.type === "mousedown" ? t.screenY : ((O = this.touch1) === null || O === void 0 ? void 0 : O.screenY) || 0, this.touchMoveX = null, this.touchMoveY = null, this.touchEndX = null, this.touchEndY = null, this.swipingDirection = null, this.longPressTimer = setTimeout(() => this.fire("longpress", t), this.opts.longPressTime), this.scale = 1, this.rotation = 0, this.fire("panstart", t));
  }
  onTouchMove(t) {
    var e, n, r, s, l, o, a, u, h, p, g, d, m;
    if (t.type === "mousemove" && (!this.touchStartX || this.touchEndX !== null))
      return;
    let v, y;
    if (t.type !== "mousemove" && (v = [...t.changedTouches].find((w) => {
      var c;
      return w.identifier === ((c = this.touch1) === null || c === void 0 ? void 0 : c.identifier);
    }), this.touchMove1 = v || this.touchMove1, y = [...t.changedTouches].find((w) => {
      var c;
      return w.identifier === ((c = this.touch2) === null || c === void 0 ? void 0 : c.identifier);
    }), this.touchMove2 = y || this.touchMove2), t.type === "mousemove" || v) {
      const w = (t.type === "mousemove" ? t.screenX : (e = v?.screenX) !== null && e !== void 0 ? e : 0) - ((n = this.touchStartX) !== null && n !== void 0 ? n : 0);
      this.velocityX = w - ((r = this.touchMoveX) !== null && r !== void 0 ? r : 0), this.touchMoveX = w;
      const c = (t.type === "mousemove" ? t.screenY : (s = v?.screenY) !== null && s !== void 0 ? s : 0) - ((l = this.touchStartY) !== null && l !== void 0 ? l : 0);
      this.velocityY = c - ((o = this.touchMoveY) !== null && o !== void 0 ? o : 0), this.touchMoveY = c;
      const f = Math.abs(this.touchMoveX), b = Math.abs(this.touchMoveY);
      this.swipingHorizontal = f > this.thresholdX, this.swipingVertical = b > this.thresholdY, this.swipingDirection = f > b ? this.swipingHorizontal ? "horizontal" : "pre-horizontal" : this.swipingVertical ? "vertical" : "pre-vertical", Math.max(f, b) > this.opts.pressThreshold && clearTimeout((a = this.longPressTimer) !== null && a !== void 0 ? a : void 0), this.fire("panmove", t);
    }
    t.type !== "mousemove" && this.touchMove1 != null && this.touchMove2 != null && (this.newDistance = Math.sqrt(Math.pow(this.touchMove2.screenX - this.touchMove1.screenX, 2) + Math.pow(this.touchMove2.screenY - this.touchMove1.screenY, 2)), this.scale = this.newDistance / ((u = this.originalDistance) !== null && u !== void 0 ? u : 0), this.fire("pinch", t), this.newAngle = Math.atan2(((h = this.touchMove2.screenY) !== null && h !== void 0 ? h : 0) - ((p = this.touchMove1.screenY) !== null && p !== void 0 ? p : 0), ((g = this.touchMove2.screenX) !== null && g !== void 0 ? g : 0) - ((d = this.touchMove1.screenX) !== null && d !== void 0 ? d : 0)) / (Math.PI / 180), this.rotation = this.newAngle - ((m = this.originalAngle) !== null && m !== void 0 ? m : 0), this.fire("rotate", t));
  }
  onTouchEnd(t) {
    var e, n, r, s, l, o, a, u, h, p;
    let g;
    if (t.type !== "mouseup" && (g = [...t.changedTouches].find((d) => {
      var m;
      return d.identifier === ((m = this.touch1) === null || m === void 0 ? void 0 : m.identifier);
    }), [...t.touches].find((d) => {
      var m;
      return d.identifier === ((m = this.touch1) === null || m === void 0 ? void 0 : m.identifier);
    }) || (this.touch1 = null, this.touchMove1 = null), [...t.touches].find((d) => {
      var m;
      return d.identifier === ((m = this.touch2) === null || m === void 0 ? void 0 : m.identifier);
    }) || (this.touch2 = null, this.touchMove2 = null)), !(t.type === "mouseup" && (!this.touchStartX || this.touchEndX !== null))) {
      if (t.type === "mouseup" || g) {
        this.touchEndX = t.type === "mouseup" ? t.screenX : (e = g?.screenX) !== null && e !== void 0 ? e : 0, this.touchEndY = t.type === "mouseup" ? t.screenY : (n = g?.screenY) !== null && n !== void 0 ? n : 0, this.fire("panend", t), clearTimeout((r = this.longPressTimer) !== null && r !== void 0 ? r : void 0);
        const d = this.touchEndX - ((s = this.touchStartX) !== null && s !== void 0 ? s : 0), m = Math.abs(d), v = this.touchEndY - ((l = this.touchStartY) !== null && l !== void 0 ? l : 0), y = Math.abs(v), w = Math.sqrt(Math.pow(d, 2) + Math.pow(v, 2)), c = Math.abs(w), f = y / m;
        m > this.thresholdX || y > this.thresholdY || this.opts.diagonalSwipes && (c > this.thresholdX || c > this.thresholdY) ? (this.swipedHorizontal = m > this.thresholdX || this.opts.diagonalSwipes && c > this.thresholdX, this.swipedVertical = y > this.thresholdY || this.opts.diagonalSwipes && c > this.thresholdY, (!this.opts.diagonalSwipes || f < Math.tan((45 - this.opts.diagonalLimit) * Math.PI / 180) || f > Math.tan((45 + this.opts.diagonalLimit) * Math.PI / 180)) && (m >= y && (this.swipedVertical = !1), y > m && (this.swipedHorizontal = !1)), this.swipedHorizontal && (d < 0 ? (((o = this.velocityX) !== null && o !== void 0 ? o : 0) < -this.opts.velocityThreshold || w < -this.disregardVelocityThresholdX) && this.fire("swipeleft", t) : (((a = this.velocityX) !== null && a !== void 0 ? a : 0) > this.opts.velocityThreshold || w > this.disregardVelocityThresholdX) && this.fire("swiperight", t)), this.swipedVertical && (v < 0 ? (((u = this.velocityY) !== null && u !== void 0 ? u : 0) < -this.opts.velocityThreshold || w < -this.disregardVelocityThresholdY) && this.fire("swipeup", t) : (((h = this.velocityY) !== null && h !== void 0 ? h : 0) > this.opts.velocityThreshold || w > this.disregardVelocityThresholdY) && this.fire("swipedown", t))) : m < this.opts.pressThreshold && y < this.opts.pressThreshold && (this.doubleTapWaiting ? (this.doubleTapWaiting = !1, clearTimeout((p = this.doubleTapTimer) !== null && p !== void 0 ? p : void 0), this.fire("doubletap", t)) : (this.doubleTapWaiting = !0, this.doubleTapTimer = setTimeout(() => this.doubleTapWaiting = !1, this.opts.doubleTapTime), this.fire("tap", t)));
      }
      !this.touch1 && !this.touch2 && (this.fire("pinchend", t), this.fire("rotateend", t), this.originalDistance = null, this.newDistance = null, this.scale = null, this.originalAngle = null, this.newAngle = null, this.rotation = null);
    }
  }
}
_t.defaults = {
  threshold: (i, t) => Math.max(25, Math.floor(0.15 * (i === "x" ? window.innerWidth || document.body.clientWidth : window.innerHeight || document.body.clientHeight))),
  velocityThreshold: 10,
  disregardVelocityThreshold: (i, t) => Math.floor(0.5 * (i === "x" ? t.element.clientWidth : t.element.clientHeight)),
  pressThreshold: 8,
  diagonalSwipes: !1,
  diagonalLimit: 15,
  longPressTime: 500,
  doubleTapTime: 300,
  mouseSupport: !0
};
let Z = !1;
try {
  window.addEventListener("test", null, Object.defineProperty({}, "passive", {
    get: function() {
      Z = { passive: !0 };
    }
  }));
} catch {
}
class Fi {
  constructor(t, e, n, r, s, l, o, a, u) {
    if (this.cfg = t, this.hTag = e, this.appPixi = n, this.main = r, this.layMng = s, this.val = l, this.scrItr = a, this.sys = u, e.clear_event = (c) => D.clear_event(c), e.event = (c) => this.#b(c), e.set_cancel_skip = () => !1, e.set_focus = (c) => this.#w(c), o.setEvtMng(this), a.setOtherObj(this, s), Se.setEvtMng(this, u, a), s.setEvtMng(this), k.setFcs(this.#t), u.setFire((c, f) => k.fire(c, f)), it.isDbg) {
      const c = {
        pause: () => {
          if (!k.isWait) return;
          const f = {};
          a.recodeDesign(f), u.callHook("_enterDesign", f), u.send2Dbg("_enterDesign", f);
        }
        //				stopOnBreakpoint		: ()=> this.#isDbgBreak = true,
        //				stopOnDataBreakpoint	: ()=> this.#isDbgBreak = true,
        //				continue				: ()=> this.#isDbgBreak = false,
        //				disconnect				: ()=> this.#isDbgBreak = false,
      };
      c.attach = c.stopOnEntry = c.stopOnStep = c.stopOnStepIn = c.stopOnStepOut = c.stopOnBackstep = c.pause, u.addHook((f) => c[f]?.());
    }
    Ee(`
.sn_hint {
	background-color: #3c3225;
	color: white;
	padding: 4px 8px;
	border-radius: 4px;
	font-size: 1.2em;
	z-index: 10000;
	pointer-events: none;
	user-select: none;
}

.sn_hint_ar,
.sn_hint_ar::before {
	position: absolute;
	width: 8px;
	height: 8px;
	background: inherit;
}
.sn_hint_ar {
	visibility: hidden;
}
.sn_hint_ar::before {
	visibility: visible;
	content: '';
	transform: rotate(45deg);
}

.sn_hint[data-popper-placement^='top']		> .sn_hint_ar {bottom: -4px;}
.sn_hint[data-popper-placement^='bottom']	> .sn_hint_ar {top: -4px;}
.sn_hint[data-popper-placement^='left']		> .sn_hint_ar {right: -4px;}
.sn_hint[data-popper-placement^='right']	> .sn_hint_ar {left: -4px;}
`), r.cvs.parentElement?.insertAdjacentHTML("beforeend", `
<div class="sn_hint" role="tooltip">
	<span>Dummy</span>
	<div class="sn_hint_ar" data-popper-arrow></div>
</div>`), this.#i = document.querySelector(".sn_hint"), this.#u = this.#i.querySelector("span"), this.#d = ji(this.#v, this.#i), this.#i.hidden = !0, n.stage.interactive = !0, this.#e.add(document.body, G, (c) => this.#o(c)), this.#e.add(document.body, "keyup", () => D.resetFired()), this.#e.add(r.cvs, "contextmenu", (c) => {
      const f = this.#s(c) + "rightclick";
      k.fire(f, c, !0), c.preventDefault();
    });
    const { width: h, height: p } = t.oCfg.window, g = Math.floor(h > p ? p / 3 : h / 3);
    this.#r = new _t(r.cvs, {
      velocityThreshold: 0,
      disregardVelocityThreshold: (c) => Math.floor(g * (c === "x" ? 1 : 0.5))
    });
    let d = !1;
    this.#r.on("tap", (c) => {
      if (d) return;
      if (c instanceof TouchEvent) {
        k.fire("click", c, !0), D.resetFired();
        return;
      }
      if (c.button > 1) return;
      const f = this.#s(c) + `${this.#a.get(c.button) ?? ""}click`;
      k.fire(f, c, !0), D.resetFired();
    }), this.#e.add(window, "pointerup", () => D.resetFired()), this.#e.add(window, "pointerout", () => D.resetFired()), this.#r.on("longpress", (c) => {
      if (d = !0, c instanceof TouchEvent) {
        k.fire("longpress", c, !0);
        return;
      }
      const f = this.#s(c) + `${this.#a.get(c.button) ?? ""}longpress`;
      k.fire(f, c, !0);
    }), this.#r.on("panend", () => {
      d && queueMicrotask(() => {
        d = !1;
      });
    }), [
      "swiperight",
      "swipeleft",
      "swipeup",
      "swipedown"
    ].forEach((c) => {
      this.#r.on(c, (f) => {
        if (f instanceof TouchEvent) {
          k.fire(c, f, !0);
          return;
        }
        const b = this.#s(f) + c;
        k.fire(b, f, !0);
      });
    });
    const m = () => l.setVal_Nochk("tmp", "const.sn.navigator.language", navigator.language);
    this.#e.add(globalThis, "languagechange", (c) => {
      m(), k.fire("sn:chgNavLang", c), Te();
    }), m();
    const v = (c) => {
      it.isDarkMode = c.matches, l.setVal_Nochk("tmp", "const.sn.isDarkMode", it.isDarkMode);
    }, y = globalThis.matchMedia("(prefers-color-scheme: dark)");
    v(y), this.#e.add(y, "change", (c) => {
      v(c), k.fire("sn:chgDarkMode", c);
    });
    let w = (c, f) => {
    };
    "WheelEvent" in globalThis && (this.#e.add(r.cvs, "wheel", (c) => this.#f(c), { passive: !0 }), this.#l = (c) => this.#e.add(c, "wheel", (f) => this.#f(f), { passive: !0 }), w = (c, f) => c.add(r.cvs, "wheel", (b) => {
      b.deltaY <= 0 || (b.stopPropagation(), f());
    })), k.init(t, e, r, l, a, s, this, o, w), import("./gamepad.js").then((c) => c.g).then(({ GamepadListener: c }) => {
      const f = new c({
        analog: !1,
        deadZone: 0.3
      });
      it.debugLog && (f.on("gamepad:connected", ({ detail: x }) => console.log(`👺<'gamepad:connected' index:${x.index} id:${x.gamepad.id}`)), f.on("gamepad:disconnected", ({ detail: x }) => console.log(`👺<'gamepad:disconnected' index:${x.index} id:${x.gamepad.id}`)));
      const b = [
        "",
        "ArrowUp",
        "",
        // '7', '8', '9',
        "ArrowLeft",
        "",
        "ArrowRight",
        // '4', '5', '6',
        "",
        "ArrowDown",
        ""
        // '1', '2', '3',
      ], E = [0, 0];
      f.on("gamepad:axis", ({ detail: x }) => {
        if (!document.hasFocus()) return;
        E[x.axis] = x.value;
        const [T = 0, S = 0] = E, M = (S + 1) * 3 + (T + 1), _ = b[M];
        if (!_) return;
        const O = this.#t.getFocus();
        (!O || O instanceof ht ? globalThis : O).dispatchEvent(new KeyboardEvent(G, { key: _, bubbles: !0 })), !(!O || O instanceof ht) && (k.cancelAutoSkip(), O.getAttribute("type") === "range" && O.dispatchEvent(new InputEvent("input", { bubbles: !0 })));
      }), f.on("gamepad:button", (x) => {
        if (document.hasFocus())
          if (x.detail.button % 2 === 0) {
            k.cancelAutoSkip();
            const T = this.#t.getFocus();
            (!T || T instanceof ht ? document.body : T).dispatchEvent(new KeyboardEvent(G, { key: "Enter", bubbles: !0 }));
          } else k.fire("middleclick", x, !0);
      }), f.start();
    }), this.#e.add(document, "keyup", (c) => {
      c.isComposing || c.key in this.#n && (this.#n[c.key] = 0);
    }), l.defTmp(
      "const.sn.key.alternate",
      () => this.#n.Alt > 0
      /* NO_PUSH */
    ), l.defTmp(
      "const.sn.key.command",
      () => this.#n.Meta > 0
      /* NO_PUSH */
    ), l.defTmp(
      "const.sn.key.control",
      () => this.#n.Control > 0
      /* NO_PUSH */
    ), l.defTmp(
      "const.sn.key.end",
      () => this.#n.End > 0
      /* NO_PUSH */
    ), l.defTmp(
      "const.sn.key.escape",
      () => this.#n.Escape > 0
      /* NO_PUSH */
    ), l.defTmp(
      "const.sn.key.back",
      () => this.#n.GoBack > 0
      /* NO_PUSH */
    );
  }
  #e = new se();
  #t = new De();
  #r;
  #a = /* @__PURE__ */ new Map([
    [0, ""],
    [1, "middle"]
    // [2, 'right'],
  ]);
  resvFlameEvent(t) {
    this.#e.add(t, G, (e) => this.#o(e)), this.#e.add(t, "contextmenu", (e) => {
      k.fire(this.#s(e) + "rightclick", e, !0), e.preventDefault();
    }), this.#l(t), this.#e.add(t, Oe, (e) => {
      if (e instanceof TouchEvent) {
        k.fire("click", e, !0);
        return;
      }
      if (e.button > 1) return;
      const n = this.#s(e) + `${this.#a.get(e.button) ?? ""}click`;
      k.fire(n, e, !0);
    }), this.#e.add(t, "pointerup", () => D.resetFired()), this.#e.add(t, "pointerout", () => D.resetFired());
  }
  #l = (t) => {
  };
  #o(t) {
    t.isComposing || (t.key in this.#n && (this.#n[t.key] = t.repeat ? 2 : 1), t.preventDefault(), k.fire(ke.modKey(t) + t.key, t, !0));
  }
  #s(t) {
    return (t.altKey ? "alt+" : "") + (t.ctrlKey ? "ctrl+" : "") + (t.metaKey ? "meta+" : "") + (t.shiftKey ? "shift+" : "");
  }
  // 縦回転ホイール
  #f(t) {
    if (this.#c) {
      this.#h = !0;
      return;
    }
    this.#c = !0, this.#p();
    const e = this.#s(t) + (t.deltaY > 0 ? "downwheel" : "upwheel");
    k.fire(e, t, !0);
  }
  #c = !1;
  #h = !1;
  #p() {
    setTimeout(() => {
      if (this.#h) {
        this.#h = !1, this.#p();
        return;
      }
      this.#c = !1;
    }, 250);
  }
  destroy() {
    for (const t of Array.from(document.getElementsByClassName("sn_hint"))) t.parentElement?.removeChild(t);
    this.#r.destroy(), D.destroy(), this.#t.destroy(), this.#e.clear();
  }
  unButton(t) {
    this.#t.remove(t);
  }
  button(t, e, n, r, s) {
    !t.fn && !t.label && !t.url && this.main.errScript("fnまたはlabelまたはurlは必須です"), t.fn ??= this.scrItr.scriptFn, e.interactive = !0, e.cursor = "pointer";
    const l = t.key?.toLowerCase() ?? " ", o = J(t, "global", !1);
    D.setEvt2Fnc(o, l, () => this.main.resumeByJumpOrCall(t)), e.on(_e, ({ data: p }) => {
      const g = p.originalEvent;
      g.preventDefault(), D.isFirstFire() && k.fire(l, g, !0);
    });
    const a = t.hint ? () => this.#y(t, e) : () => {
    }, u = () => {
      n(), this.#i.hidden = !0;
    }, h = () => (a(), r());
    if (e.on("pointerover", h), e.on("pointerout", () => {
      this.#t.isFocus(e) ? h() : u();
    }), e.on("pointerdown", () => {
      this.#i.hidden = !0;
      const p = this.#t.getFocus();
      s(), p instanceof Jt && p.normal();
    }), e.on(
      "pointerup",
      it.isMobile ? u : () => {
        this.#t.isFocus(e) ? h() : u();
      }
    ), this.#t.add(e, h, u), t.clickse && (t.clicksebuf ??= "SYS", this.cfg.searchPath(t.clickse, Lt.SOUND), e.on("pointerdown", () => {
      this.hTag.playse({ fn: t.clickse, buf: t.clicksebuf, join: !1 });
    })), t.enterse && (t.entersebuf ??= "SYS", this.cfg.searchPath(t.enterse, Lt.SOUND), e.on("pointerover", () => {
      this.hTag.playse({ fn: t.enterse, buf: t.entersebuf, join: !1 });
    })), t.leavese && (t.leavesebuf ??= "SYS", this.cfg.searchPath(t.leavese, Lt.SOUND), e.on("pointerout", () => {
      this.hTag.playse({ fn: t.leavese, buf: t.leavesebuf, join: !1 });
    })), t.onenter) {
      const p = l + t.onenter.toLowerCase(), g = { fn: t.fn, label: t.onenter, call: !0, key: p };
      D.setEvt2Fnc(o, p, () => this.main.resumeByJumpOrCall(g)), e.on("pointerover", (d) => k.fire(p, d));
    }
    if (t.onleave) {
      const p = l + t.onleave.toLowerCase(), g = { fn: t.fn, label: t.onleave, call: !0, key: p };
      D.setEvt2Fnc(o, p, () => this.main.resumeByJumpOrCall(g)), e.on("pointerout", (d) => k.fire(p, d));
    }
  }
  #v = {
    getBoundingClientRect: (t = 0, e = 0) => DOMRect.fromRect({ x: t, y: e, width: 0, height: 0 })
  };
  #i;
  #u;
  #d;
  #m = {
    placement: "bottom",
    modifiers: [
      {
        // Flip | Popper https://popper.js.org/docs/v2/modifiers/flip/
        name: "flip",
        options: {
          fallbackPlacements: ["top", "bottom"]
        }
      }
    ]
  };
  #y(t, e) {
    const n = e instanceof Jt ? e.getBtnBounds() : e.getBounds();
    if (!(t[":タグ名"] === "link")) {
      const s = e.parent.parent;
      n.x += s.x, n.y += s.y;
    }
    if (!t.hint) {
      this.#i.hidden = !0;
      return;
    }
    this.#i.style.cssText = `position:${this.#i.style.position}; transform:${this.#i.style.transform};` + (t.hint_style ?? ""), this.#u.style.cssText = "", this.#u.textContent = t.hint ?? "", this.#v.getBoundingClientRect = () => DOMRect.fromRect({
      x: this.sys.ofsLeft4elm + n.x * this.sys.cvsScale,
      y: this.sys.ofsTop4elm + n.y * this.sys.cvsScale,
      width: n.width,
      height: n.height
    }), this.#d.setOptions(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      t.hint_opt ? { ...this.#m, ...JSON.parse(t.hint_opt) } : this.#m
    ).then(async () => {
      await this.#d.update(), this.#i.hidden = !1;
    }).catch((s) => console.error(Me(
      t,
      "hint_opt",
      `dispHint 引数 hint_opt エラー ${s instanceof SyntaxError ? s.message : ""}`
    )));
  }
  hideHint() {
    this.#i.hidden = !0;
  }
  cvsResize() {
    this.hideHint();
  }
  #b(t) {
    const e = t.key;
    if (!e) throw "keyは必須です";
    const n = e.toLowerCase(), r = J(t, "call", !1), s = J(t, "global", !1), { fn: l, label: o, url: a } = t;
    if (J(t, "del", !1)) {
      if (l || o || r || a) throw "fn/label/callとdelは同時指定できません";
      return D.clear_eventer(e, s, n), !1;
    }
    if (!l && !o && !a) throw "fn,label,url いずれかは必須です";
    if (t.fn ??= this.scrItr.scriptFn, e.startsWith("dom=")) {
      const u = D.getHtmlElmList(e);
      if (u.el.length === 0) {
        if (J(t, "need_err", !0)) throw `HTML内にセレクタ（${u.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
        return !1;
      }
      let h = ["click", G];
      switch (u.el[0].type ?? "") {
        //	switch (g.el[0].getAttribute('type') ?? '') { textareaで''になる
        case "checkbox":
          h = ["input"];
          break;
        case "range":
          h = ["input"];
          break;
        case "text":
        case "textarea":
          h = ["input", "change"];
          break;
      }
      const g = h.length;
      for (let d = 0; d < g; ++d) {
        const m = h[d];
        u.el.forEach((v) => {
          this.#e.add(v, m, (y) => {
            if (!k.isWait || this.layMng.getFrmDisabled(u.id) || m === G && y.key !== "Enter") return;
            const w = v.dataset;
            for (const [c, f] of Object.entries(w)) this.val.setVal_Nochk("tmp", `sn.event.domdata.${c}`, f);
            k.fire(e, y);
          }), d === 0 && this.#t.add(
            v,
            () => this.#g(v) ? (v.focus(), !0) : !1,
            () => {
            }
          );
        });
      }
    }
    return D.setEvt2Fnc(s, n, () => this.main.resumeByJumpOrCall(t)), !1;
  }
  #g(t) {
    if (!t || t.offsetParent === null) return !1;
    let e = t;
    do {
      if (getComputedStyle(e).display === "none" || e.dataset.focus === "false" || e?.disabled) return !1;
      e = e.parentElement;
    } while (e);
    return !0;
  }
  // フォーカス移動
  #w(t) {
    const { add: e, del: n, to: r } = t;
    if (e?.startsWith("dom=")) {
      const s = D.getHtmlElmList(e);
      if (s.el.length === 0 && J(t, "need_err", !0)) throw `HTML内にセレクタ（${s.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
      return s.el.forEach((l) => this.#t.add(
        l,
        () => this.#g(l) ? (l.focus(), !0) : !1,
        () => {
        }
      )), !1;
    }
    if (n?.startsWith("dom=")) {
      const s = D.getHtmlElmList(n);
      if (s.el.length === 0 && J(t, "need_err", !0)) throw `HTML内にセレクタ（${s.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
      return s.el.forEach((l) => this.#t.remove(l)), !1;
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
  // キー押しっぱなしスキップ中か
  get isSkipping() {
    return k.isSkipping ? !0 : Object.keys(this.#n).some(
      (t) => this.#n[t] === 2
      /* PUSH_REPEATING */
    );
  }
  // 0:no push  1:one push  2:push repeating
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  #n = {
    Alt: 0,
    Meta: 0,
    // COMMANDキー
    Control: 0,
    ArrowDown: 0,
    End: 0,
    Enter: 0,
    Escape: 0,
    " ": 0,
    GoBack: 0
    /* NO_PUSH */
    // AndroidのBackキーだと思う
  };
}
export {
  Fi as EventMng
};
//# sourceMappingURL=EventMng.js.map
