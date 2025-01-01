import { E as re, j as st, C as J, k as ge, l as be, m as we, a as K, S as St, o as xe } from "./web2.js";
import { T as ke, B as Yt } from "./LayerMng.js";
import { R as j } from "./ReadState.js";
class Oe {
  #e = [];
  #t = -1;
  #r = new re();
  destroy() {
    this.#e = [], this.#t = -1, this.#r.clear();
  }
  add(t, e, i) {
    if (this.#e.findIndex((o) => o.btn === t) >= 0) return;
    if (t instanceof st) {
      t.on("pointerdown", () => {
        for (let o = this.#e.length - 1; o >= 0; --o)
          if (this.#e[o].btn === t) {
            this.#t = o;
            return;
          }
        this.#t = -1;
      }), this.#e.push({ btn: t, on: e, off: i });
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
    let n = (o) => {
    }, a = t.localName === "button" || t.localName === "a" ? (o) => !o.isTrusted && o.key === "Enter" : (o) => o.key === "Enter";
    const s = t;
    switch (s.type ?? "") {
      //	switch (btn.getAttribute('type') ?? '') {	// textareaで''になる
      case "checkbox":
        n = () => s.checked = !s.checked;
        break;
      case "":
        t.querySelectorAll("input[type]").length > 0 && (n = (o) => this.#s(t, o.key), a = () => !1);
        break;
      case "range":
        n = (o) => {
          o.isTrusted || (o.key === "ArrowUp" ? s.stepUp() : s.stepDown());
        };
        break;
      case "text":
      case "textarea":
        n = (o) => {
          if (o.isTrusted) return;
          let f = (s.selectionStart ?? 0) + (o.key === "ArrowUp" ? -1 : 1);
          f < 0 && (f = 0), s.setSelectionRange(f, f);
        };
        break;
    }
    this.#r.add(t, "keydown", (o) => {
      if (!(o.key !== "ArrowUp" && o.key !== "ArrowDown" && o.key !== "Enter")) {
        if (o.stopPropagation(), o.stopImmediatePropagation(), a(o)) {
          t.dispatchEvent(new MouseEvent("click"));
          return;
        }
        n(o);
      }
    }, { passive: !0 }), t.hasAttribute("tabindex") || (t.tabIndex = 0), this.#e.push({ btn: t, on: e, off: i });
  }
  remove(t) {
    const e = this.#e.findIndex((i) => i.btn === t);
    e < 0 || (this.#e.splice(e, 1), this.#e.length === 0 ? this.#t = -1 : e <= this.#t && --this.#t);
  }
  #s(t, e) {
    const i = t.querySelectorAll("input[type]"), n = i.length;
    for (let a = 0; a < n; ++a)
      if (i[a].checked) {
        i[(a + n + (e === "ArrowUp" ? -1 : 1)) % n].checked = !0;
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
        const i = (this.#t + e) % t;
        if (this.#e[i].on()) {
          this.#t = i, this.#a(i);
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
        const i = (this.#t + e) % t;
        if (this.#e[i].on()) {
          this.#t = i, this.#a(i);
          return;
        }
      }
      this.#t = -1;
    }
  }
  #a = J.debugLog ? (t) => console.log(`👾 <FocusMng idx:${t} btn:%o`, this.#e[t].btn) : () => {
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
      !(e.btn instanceof st) || e.btn.parent ? e.off() : this.#e.splice(t, 1);
    }
  }
}
var _ = "top", M = "bottom", H = "right", L = "left", Lt = "auto", ut = [_, M, H, L], tt = "start", lt = "end", Ee = "clippingParents", ie = "viewport", at = "popper", De = "reference", Xt = /* @__PURE__ */ ut.reduce(function(r, t) {
  return r.concat([t + "-" + tt, t + "-" + lt]);
}, []), ne = /* @__PURE__ */ [].concat(ut, [Lt]).reduce(function(r, t) {
  return r.concat([t, t + "-" + tt, t + "-" + lt]);
}, []), Ce = "beforeRead", Se = "read", Pe = "afterRead", _e = "beforeMain", Le = "main", Re = "afterMain", $e = "beforeWrite", je = "write", Te = "afterWrite", Me = [Ce, Se, Pe, _e, Le, Re, $e, je, Te];
function N(r) {
  return r ? (r.nodeName || "").toLowerCase() : null;
}
function $(r) {
  if (r == null)
    return window;
  if (r.toString() !== "[object Window]") {
    var t = r.ownerDocument;
    return t && t.defaultView || window;
  }
  return r;
}
function Z(r) {
  var t = $(r).Element;
  return r instanceof t || r instanceof Element;
}
function T(r) {
  var t = $(r).HTMLElement;
  return r instanceof t || r instanceof HTMLElement;
}
function Rt(r) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = $(r).ShadowRoot;
  return r instanceof t || r instanceof ShadowRoot;
}
function He(r) {
  var t = r.state;
  Object.keys(t.elements).forEach(function(e) {
    var i = t.styles[e] || {}, n = t.attributes[e] || {}, a = t.elements[e];
    !T(a) || !N(a) || (Object.assign(a.style, i), Object.keys(n).forEach(function(s) {
      var o = n[s];
      o === !1 ? a.removeAttribute(s) : a.setAttribute(s, o === !0 ? "" : o);
    }));
  });
}
function Be(r) {
  var t = r.state, e = {
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
    Object.keys(t.elements).forEach(function(i) {
      var n = t.elements[i], a = t.attributes[i] || {}, s = Object.keys(t.styles.hasOwnProperty(i) ? t.styles[i] : e[i]), o = s.reduce(function(f, p) {
        return f[p] = "", f;
      }, {});
      !T(n) || !N(n) || (Object.assign(n.style, o), Object.keys(a).forEach(function(f) {
        n.removeAttribute(f);
      }));
    });
  };
}
const Fe = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: He,
  effect: Be,
  requires: ["computeStyles"]
};
function W(r) {
  return r.split("-")[0];
}
var G = Math.max, xt = Math.min, et = Math.round;
function Pt() {
  var r = navigator.userAgentData;
  return r != null && r.brands && Array.isArray(r.brands) ? r.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function oe() {
  return !/^((?!chrome|android).)*safari/i.test(Pt());
}
function rt(r, t, e) {
  t === void 0 && (t = !1), e === void 0 && (e = !1);
  var i = r.getBoundingClientRect(), n = 1, a = 1;
  t && T(r) && (n = r.offsetWidth > 0 && et(i.width) / r.offsetWidth || 1, a = r.offsetHeight > 0 && et(i.height) / r.offsetHeight || 1);
  var s = Z(r) ? $(r) : window, o = s.visualViewport, f = !oe() && e, p = (i.left + (f && o ? o.offsetLeft : 0)) / n, l = (i.top + (f && o ? o.offsetTop : 0)) / a, h = i.width / n, m = i.height / a;
  return {
    width: h,
    height: m,
    top: l,
    right: p + h,
    bottom: l + m,
    left: p,
    x: p,
    y: l
  };
}
function $t(r) {
  var t = rt(r), e = r.offsetWidth, i = r.offsetHeight;
  return Math.abs(t.width - e) <= 1 && (e = t.width), Math.abs(t.height - i) <= 1 && (i = t.height), {
    x: r.offsetLeft,
    y: r.offsetTop,
    width: e,
    height: i
  };
}
function ae(r, t) {
  var e = t.getRootNode && t.getRootNode();
  if (r.contains(t))
    return !0;
  if (e && Rt(e)) {
    var i = t;
    do {
      if (i && r.isSameNode(i))
        return !0;
      i = i.parentNode || i.host;
    } while (i);
  }
  return !1;
}
function A(r) {
  return $(r).getComputedStyle(r);
}
function We(r) {
  return ["table", "td", "th"].indexOf(N(r)) >= 0;
}
function q(r) {
  return ((Z(r) ? r.ownerDocument : (
    // $FlowFixMe[prop-missing]
    r.document
  )) || window.document).documentElement;
}
function kt(r) {
  return N(r) === "html" ? r : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    r.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    r.parentNode || // DOM Element detected
    (Rt(r) ? r.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    q(r)
  );
}
function zt(r) {
  return !T(r) || // https://github.com/popperjs/popper-core/issues/837
  A(r).position === "fixed" ? null : r.offsetParent;
}
function Ne(r) {
  var t = /firefox/i.test(Pt()), e = /Trident/i.test(Pt());
  if (e && T(r)) {
    var i = A(r);
    if (i.position === "fixed")
      return null;
  }
  var n = kt(r);
  for (Rt(n) && (n = n.host); T(n) && ["html", "body"].indexOf(N(n)) < 0; ) {
    var a = A(n);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
      return n;
    n = n.parentNode;
  }
  return null;
}
function dt(r) {
  for (var t = $(r), e = zt(r); e && We(e) && A(e).position === "static"; )
    e = zt(e);
  return e && (N(e) === "html" || N(e) === "body" && A(e).position === "static") ? t : e || Ne(r) || t;
}
function jt(r) {
  return ["top", "bottom"].indexOf(r) >= 0 ? "x" : "y";
}
function ft(r, t, e) {
  return G(r, xt(t, e));
}
function Ae(r, t, e) {
  var i = ft(r, t, e);
  return i > e ? e : i;
}
function se() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function fe(r) {
  return Object.assign({}, se(), r);
}
function ce(r, t) {
  return t.reduce(function(e, i) {
    return e[i] = r, e;
  }, {});
}
var Ve = function(t, e) {
  return t = typeof t == "function" ? t(Object.assign({}, e.rects, {
    placement: e.placement
  })) : t, fe(typeof t != "number" ? t : ce(t, ut));
};
function qe(r) {
  var t, e = r.state, i = r.name, n = r.options, a = e.elements.arrow, s = e.modifiersData.popperOffsets, o = W(e.placement), f = jt(o), p = [L, H].indexOf(o) >= 0, l = p ? "height" : "width";
  if (!(!a || !s)) {
    var h = Ve(n.padding, e), m = $t(a), d = f === "y" ? _ : L, c = f === "y" ? M : H, u = e.rects.reference[l] + e.rects.reference[f] - s[f] - e.rects.popper[l], v = s[f] - e.rects.reference[f], k = dt(a), g = k ? f === "y" ? k.clientHeight || 0 : k.clientWidth || 0 : 0, O = u / 2 - v / 2, y = h[d], w = g - m[l] - h[c], b = g / 2 - m[l] / 2 + O, x = ft(y, b, w), C = f;
    e.modifiersData[i] = (t = {}, t[C] = x, t.centerOffset = x - b, t);
  }
}
function Ue(r) {
  var t = r.state, e = r.options, i = e.element, n = i === void 0 ? "[data-popper-arrow]" : i;
  n != null && (typeof n == "string" && (n = t.elements.popper.querySelector(n), !n) || ae(t.elements.popper, n) && (t.elements.arrow = n));
}
const Ie = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: qe,
  effect: Ue,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function it(r) {
  return r.split("-")[1];
}
var Ye = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Xe(r, t) {
  var e = r.x, i = r.y, n = t.devicePixelRatio || 1;
  return {
    x: et(e * n) / n || 0,
    y: et(i * n) / n || 0
  };
}
function Kt(r) {
  var t, e = r.popper, i = r.popperRect, n = r.placement, a = r.variation, s = r.offsets, o = r.position, f = r.gpuAcceleration, p = r.adaptive, l = r.roundOffsets, h = r.isFixed, m = s.x, d = m === void 0 ? 0 : m, c = s.y, u = c === void 0 ? 0 : c, v = typeof l == "function" ? l({
    x: d,
    y: u
  }) : {
    x: d,
    y: u
  };
  d = v.x, u = v.y;
  var k = s.hasOwnProperty("x"), g = s.hasOwnProperty("y"), O = L, y = _, w = window;
  if (p) {
    var b = dt(e), x = "clientHeight", C = "clientWidth";
    if (b === $(e) && (b = q(e), A(b).position !== "static" && o === "absolute" && (x = "scrollHeight", C = "scrollWidth")), b = b, n === _ || (n === L || n === H) && a === lt) {
      y = M;
      var D = h && b === w && w.visualViewport ? w.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        b[x]
      );
      u -= D - i.height, u *= f ? 1 : -1;
    }
    if (n === L || (n === _ || n === M) && a === lt) {
      O = H;
      var E = h && b === w && w.visualViewport ? w.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        b[C]
      );
      d -= E - i.width, d *= f ? 1 : -1;
    }
  }
  var S = Object.assign({
    position: o
  }, p && Ye), B = l === !0 ? Xe({
    x: d,
    y: u
  }, $(e)) : {
    x: d,
    y: u
  };
  if (d = B.x, u = B.y, f) {
    var P;
    return Object.assign({}, S, (P = {}, P[y] = g ? "0" : "", P[O] = k ? "0" : "", P.transform = (w.devicePixelRatio || 1) <= 1 ? "translate(" + d + "px, " + u + "px)" : "translate3d(" + d + "px, " + u + "px, 0)", P));
  }
  return Object.assign({}, S, (t = {}, t[y] = g ? u + "px" : "", t[O] = k ? d + "px" : "", t.transform = "", t));
}
function ze(r) {
  var t = r.state, e = r.options, i = e.gpuAcceleration, n = i === void 0 ? !0 : i, a = e.adaptive, s = a === void 0 ? !0 : a, o = e.roundOffsets, f = o === void 0 ? !0 : o, p = {
    placement: W(t.placement),
    variation: it(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: n,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Kt(Object.assign({}, p, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: f
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Kt(Object.assign({}, p, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: f
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Ke = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: ze,
  data: {}
};
var bt = {
  passive: !0
};
function Je(r) {
  var t = r.state, e = r.instance, i = r.options, n = i.scroll, a = n === void 0 ? !0 : n, s = i.resize, o = s === void 0 ? !0 : s, f = $(t.elements.popper), p = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return a && p.forEach(function(l) {
    l.addEventListener("scroll", e.update, bt);
  }), o && f.addEventListener("resize", e.update, bt), function() {
    a && p.forEach(function(l) {
      l.removeEventListener("scroll", e.update, bt);
    }), o && f.removeEventListener("resize", e.update, bt);
  };
}
const Ge = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Je,
  data: {}
};
var Ze = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function wt(r) {
  return r.replace(/left|right|bottom|top/g, function(t) {
    return Ze[t];
  });
}
var Qe = {
  start: "end",
  end: "start"
};
function Jt(r) {
  return r.replace(/start|end/g, function(t) {
    return Qe[t];
  });
}
function Tt(r) {
  var t = $(r), e = t.pageXOffset, i = t.pageYOffset;
  return {
    scrollLeft: e,
    scrollTop: i
  };
}
function Mt(r) {
  return rt(q(r)).left + Tt(r).scrollLeft;
}
function tr(r, t) {
  var e = $(r), i = q(r), n = e.visualViewport, a = i.clientWidth, s = i.clientHeight, o = 0, f = 0;
  if (n) {
    a = n.width, s = n.height;
    var p = oe();
    (p || !p && t === "fixed") && (o = n.offsetLeft, f = n.offsetTop);
  }
  return {
    width: a,
    height: s,
    x: o + Mt(r),
    y: f
  };
}
function er(r) {
  var t, e = q(r), i = Tt(r), n = (t = r.ownerDocument) == null ? void 0 : t.body, a = G(e.scrollWidth, e.clientWidth, n ? n.scrollWidth : 0, n ? n.clientWidth : 0), s = G(e.scrollHeight, e.clientHeight, n ? n.scrollHeight : 0, n ? n.clientHeight : 0), o = -i.scrollLeft + Mt(r), f = -i.scrollTop;
  return A(n || e).direction === "rtl" && (o += G(e.clientWidth, n ? n.clientWidth : 0) - a), {
    width: a,
    height: s,
    x: o,
    y: f
  };
}
function Ht(r) {
  var t = A(r), e = t.overflow, i = t.overflowX, n = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(e + n + i);
}
function le(r) {
  return ["html", "body", "#document"].indexOf(N(r)) >= 0 ? r.ownerDocument.body : T(r) && Ht(r) ? r : le(kt(r));
}
function ct(r, t) {
  var e;
  t === void 0 && (t = []);
  var i = le(r), n = i === ((e = r.ownerDocument) == null ? void 0 : e.body), a = $(i), s = n ? [a].concat(a.visualViewport || [], Ht(i) ? i : []) : i, o = t.concat(s);
  return n ? o : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    o.concat(ct(kt(s)))
  );
}
function _t(r) {
  return Object.assign({}, r, {
    left: r.x,
    top: r.y,
    right: r.x + r.width,
    bottom: r.y + r.height
  });
}
function rr(r, t) {
  var e = rt(r, !1, t === "fixed");
  return e.top = e.top + r.clientTop, e.left = e.left + r.clientLeft, e.bottom = e.top + r.clientHeight, e.right = e.left + r.clientWidth, e.width = r.clientWidth, e.height = r.clientHeight, e.x = e.left, e.y = e.top, e;
}
function Gt(r, t, e) {
  return t === ie ? _t(tr(r, e)) : Z(t) ? rr(t, e) : _t(er(q(r)));
}
function ir(r) {
  var t = ct(kt(r)), e = ["absolute", "fixed"].indexOf(A(r).position) >= 0, i = e && T(r) ? dt(r) : r;
  return Z(i) ? t.filter(function(n) {
    return Z(n) && ae(n, i) && N(n) !== "body";
  }) : [];
}
function nr(r, t, e, i) {
  var n = t === "clippingParents" ? ir(r) : [].concat(t), a = [].concat(n, [e]), s = a[0], o = a.reduce(function(f, p) {
    var l = Gt(r, p, i);
    return f.top = G(l.top, f.top), f.right = xt(l.right, f.right), f.bottom = xt(l.bottom, f.bottom), f.left = G(l.left, f.left), f;
  }, Gt(r, s, i));
  return o.width = o.right - o.left, o.height = o.bottom - o.top, o.x = o.left, o.y = o.top, o;
}
function pe(r) {
  var t = r.reference, e = r.element, i = r.placement, n = i ? W(i) : null, a = i ? it(i) : null, s = t.x + t.width / 2 - e.width / 2, o = t.y + t.height / 2 - e.height / 2, f;
  switch (n) {
    case _:
      f = {
        x: s,
        y: t.y - e.height
      };
      break;
    case M:
      f = {
        x: s,
        y: t.y + t.height
      };
      break;
    case H:
      f = {
        x: t.x + t.width,
        y: o
      };
      break;
    case L:
      f = {
        x: t.x - e.width,
        y: o
      };
      break;
    default:
      f = {
        x: t.x,
        y: t.y
      };
  }
  var p = n ? jt(n) : null;
  if (p != null) {
    var l = p === "y" ? "height" : "width";
    switch (a) {
      case tt:
        f[p] = f[p] - (t[l] / 2 - e[l] / 2);
        break;
      case lt:
        f[p] = f[p] + (t[l] / 2 - e[l] / 2);
        break;
    }
  }
  return f;
}
function pt(r, t) {
  t === void 0 && (t = {});
  var e = t, i = e.placement, n = i === void 0 ? r.placement : i, a = e.strategy, s = a === void 0 ? r.strategy : a, o = e.boundary, f = o === void 0 ? Ee : o, p = e.rootBoundary, l = p === void 0 ? ie : p, h = e.elementContext, m = h === void 0 ? at : h, d = e.altBoundary, c = d === void 0 ? !1 : d, u = e.padding, v = u === void 0 ? 0 : u, k = fe(typeof v != "number" ? v : ce(v, ut)), g = m === at ? De : at, O = r.rects.popper, y = r.elements[c ? g : m], w = nr(Z(y) ? y : y.contextElement || q(r.elements.popper), f, l, s), b = rt(r.elements.reference), x = pe({
    reference: b,
    element: O,
    strategy: "absolute",
    placement: n
  }), C = _t(Object.assign({}, O, x)), D = m === at ? C : b, E = {
    top: w.top - D.top + k.top,
    bottom: D.bottom - w.bottom + k.bottom,
    left: w.left - D.left + k.left,
    right: D.right - w.right + k.right
  }, S = r.modifiersData.offset;
  if (m === at && S) {
    var B = S[n];
    Object.keys(E).forEach(function(P) {
      var U = [H, M].indexOf(P) >= 0 ? 1 : -1, I = [_, M].indexOf(P) >= 0 ? "y" : "x";
      E[P] += B[I] * U;
    });
  }
  return E;
}
function or(r, t) {
  t === void 0 && (t = {});
  var e = t, i = e.placement, n = e.boundary, a = e.rootBoundary, s = e.padding, o = e.flipVariations, f = e.allowedAutoPlacements, p = f === void 0 ? ne : f, l = it(i), h = l ? o ? Xt : Xt.filter(function(c) {
    return it(c) === l;
  }) : ut, m = h.filter(function(c) {
    return p.indexOf(c) >= 0;
  });
  m.length === 0 && (m = h);
  var d = m.reduce(function(c, u) {
    return c[u] = pt(r, {
      placement: u,
      boundary: n,
      rootBoundary: a,
      padding: s
    })[W(u)], c;
  }, {});
  return Object.keys(d).sort(function(c, u) {
    return d[c] - d[u];
  });
}
function ar(r) {
  if (W(r) === Lt)
    return [];
  var t = wt(r);
  return [Jt(r), t, Jt(t)];
}
function sr(r) {
  var t = r.state, e = r.options, i = r.name;
  if (!t.modifiersData[i]._skip) {
    for (var n = e.mainAxis, a = n === void 0 ? !0 : n, s = e.altAxis, o = s === void 0 ? !0 : s, f = e.fallbackPlacements, p = e.padding, l = e.boundary, h = e.rootBoundary, m = e.altBoundary, d = e.flipVariations, c = d === void 0 ? !0 : d, u = e.allowedAutoPlacements, v = t.options.placement, k = W(v), g = k === v, O = f || (g || !c ? [wt(v)] : ar(v)), y = [v].concat(O).reduce(function(Q, V) {
      return Q.concat(W(V) === Lt ? or(t, {
        placement: V,
        boundary: l,
        rootBoundary: h,
        padding: p,
        flipVariations: c,
        allowedAutoPlacements: u
      }) : V);
    }, []), w = t.rects.reference, b = t.rects.popper, x = /* @__PURE__ */ new Map(), C = !0, D = y[0], E = 0; E < y.length; E++) {
      var S = y[E], B = W(S), P = it(S) === tt, U = [_, M].indexOf(B) >= 0, I = U ? "width" : "height", R = pt(t, {
        placement: S,
        boundary: l,
        rootBoundary: h,
        altBoundary: m,
        padding: p
      }), F = U ? P ? H : L : P ? M : _;
      w[I] > b[I] && (F = wt(F));
      var ht = wt(F), Y = [];
      if (a && Y.push(R[B] <= 0), o && Y.push(R[F] <= 0, R[ht] <= 0), Y.every(function(Q) {
        return Q;
      })) {
        D = S, C = !1;
        break;
      }
      x.set(S, Y);
    }
    if (C)
      for (var vt = c ? 3 : 1, Ot = function(V) {
        var ot = y.find(function(yt) {
          var X = x.get(yt);
          if (X)
            return X.slice(0, V).every(function(Et) {
              return Et;
            });
        });
        if (ot)
          return D = ot, "break";
      }, nt = vt; nt > 0; nt--) {
        var mt = Ot(nt);
        if (mt === "break") break;
      }
    t.placement !== D && (t.modifiersData[i]._skip = !0, t.placement = D, t.reset = !0);
  }
}
const fr = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: sr,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Zt(r, t, e) {
  return e === void 0 && (e = {
    x: 0,
    y: 0
  }), {
    top: r.top - t.height - e.y,
    right: r.right - t.width + e.x,
    bottom: r.bottom - t.height + e.y,
    left: r.left - t.width - e.x
  };
}
function Qt(r) {
  return [_, H, M, L].some(function(t) {
    return r[t] >= 0;
  });
}
function cr(r) {
  var t = r.state, e = r.name, i = t.rects.reference, n = t.rects.popper, a = t.modifiersData.preventOverflow, s = pt(t, {
    elementContext: "reference"
  }), o = pt(t, {
    altBoundary: !0
  }), f = Zt(s, i), p = Zt(o, n, a), l = Qt(f), h = Qt(p);
  t.modifiersData[e] = {
    referenceClippingOffsets: f,
    popperEscapeOffsets: p,
    isReferenceHidden: l,
    hasPopperEscaped: h
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": l,
    "data-popper-escaped": h
  });
}
const lr = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: cr
};
function pr(r, t, e) {
  var i = W(r), n = [L, _].indexOf(i) >= 0 ? -1 : 1, a = typeof e == "function" ? e(Object.assign({}, t, {
    placement: r
  })) : e, s = a[0], o = a[1];
  return s = s || 0, o = (o || 0) * n, [L, H].indexOf(i) >= 0 ? {
    x: o,
    y: s
  } : {
    x: s,
    y: o
  };
}
function ur(r) {
  var t = r.state, e = r.options, i = r.name, n = e.offset, a = n === void 0 ? [0, 0] : n, s = ne.reduce(function(l, h) {
    return l[h] = pr(h, t.rects, a), l;
  }, {}), o = s[t.placement], f = o.x, p = o.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += f, t.modifiersData.popperOffsets.y += p), t.modifiersData[i] = s;
}
const dr = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: ur
};
function hr(r) {
  var t = r.state, e = r.name;
  t.modifiersData[e] = pe({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const vr = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: hr,
  data: {}
};
function mr(r) {
  return r === "x" ? "y" : "x";
}
function yr(r) {
  var t = r.state, e = r.options, i = r.name, n = e.mainAxis, a = n === void 0 ? !0 : n, s = e.altAxis, o = s === void 0 ? !1 : s, f = e.boundary, p = e.rootBoundary, l = e.altBoundary, h = e.padding, m = e.tether, d = m === void 0 ? !0 : m, c = e.tetherOffset, u = c === void 0 ? 0 : c, v = pt(t, {
    boundary: f,
    rootBoundary: p,
    padding: h,
    altBoundary: l
  }), k = W(t.placement), g = it(t.placement), O = !g, y = jt(k), w = mr(y), b = t.modifiersData.popperOffsets, x = t.rects.reference, C = t.rects.popper, D = typeof u == "function" ? u(Object.assign({}, t.rects, {
    placement: t.placement
  })) : u, E = typeof D == "number" ? {
    mainAxis: D,
    altAxis: D
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, D), S = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, B = {
    x: 0,
    y: 0
  };
  if (b) {
    if (a) {
      var P, U = y === "y" ? _ : L, I = y === "y" ? M : H, R = y === "y" ? "height" : "width", F = b[y], ht = F + v[U], Y = F - v[I], vt = d ? -C[R] / 2 : 0, Ot = g === tt ? x[R] : C[R], nt = g === tt ? -C[R] : -x[R], mt = t.elements.arrow, Q = d && mt ? $t(mt) : {
        width: 0,
        height: 0
      }, V = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : se(), ot = V[U], yt = V[I], X = ft(0, x[R], Q[R]), Et = O ? x[R] / 2 - vt - X - ot - E.mainAxis : Ot - X - ot - E.mainAxis, ue = O ? -x[R] / 2 + vt + X + yt + E.mainAxis : nt + X + yt + E.mainAxis, Dt = t.elements.arrow && dt(t.elements.arrow), de = Dt ? y === "y" ? Dt.clientTop || 0 : Dt.clientLeft || 0 : 0, Bt = (P = S?.[y]) != null ? P : 0, he = F + Et - Bt - de, ve = F + ue - Bt, Ft = ft(d ? xt(ht, he) : ht, F, d ? G(Y, ve) : Y);
      b[y] = Ft, B[y] = Ft - F;
    }
    if (o) {
      var Wt, me = y === "x" ? _ : L, ye = y === "x" ? M : H, z = b[w], gt = w === "y" ? "height" : "width", Nt = z + v[me], At = z - v[ye], Ct = [_, L].indexOf(k) !== -1, Vt = (Wt = S?.[w]) != null ? Wt : 0, qt = Ct ? Nt : z - x[gt] - C[gt] - Vt + E.altAxis, Ut = Ct ? z + x[gt] + C[gt] - Vt - E.altAxis : At, It = d && Ct ? Ae(qt, z, Ut) : ft(d ? qt : Nt, z, d ? Ut : At);
      b[w] = It, B[w] = It - z;
    }
    t.modifiersData[i] = B;
  }
}
const gr = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: yr,
  requiresIfExists: ["offset"]
};
function br(r) {
  return {
    scrollLeft: r.scrollLeft,
    scrollTop: r.scrollTop
  };
}
function wr(r) {
  return r === $(r) || !T(r) ? Tt(r) : br(r);
}
function xr(r) {
  var t = r.getBoundingClientRect(), e = et(t.width) / r.offsetWidth || 1, i = et(t.height) / r.offsetHeight || 1;
  return e !== 1 || i !== 1;
}
function kr(r, t, e) {
  e === void 0 && (e = !1);
  var i = T(t), n = T(t) && xr(t), a = q(t), s = rt(r, n, e), o = {
    scrollLeft: 0,
    scrollTop: 0
  }, f = {
    x: 0,
    y: 0
  };
  return (i || !i && !e) && ((N(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Ht(a)) && (o = wr(t)), T(t) ? (f = rt(t, !0), f.x += t.clientLeft, f.y += t.clientTop) : a && (f.x = Mt(a))), {
    x: s.left + o.scrollLeft - f.x,
    y: s.top + o.scrollTop - f.y,
    width: s.width,
    height: s.height
  };
}
function Or(r) {
  var t = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Set(), i = [];
  r.forEach(function(a) {
    t.set(a.name, a);
  });
  function n(a) {
    e.add(a.name);
    var s = [].concat(a.requires || [], a.requiresIfExists || []);
    s.forEach(function(o) {
      if (!e.has(o)) {
        var f = t.get(o);
        f && n(f);
      }
    }), i.push(a);
  }
  return r.forEach(function(a) {
    e.has(a.name) || n(a);
  }), i;
}
function Er(r) {
  var t = Or(r);
  return Me.reduce(function(e, i) {
    return e.concat(t.filter(function(n) {
      return n.phase === i;
    }));
  }, []);
}
function Dr(r) {
  var t;
  return function() {
    return t || (t = new Promise(function(e) {
      Promise.resolve().then(function() {
        t = void 0, e(r());
      });
    })), t;
  };
}
function Cr(r) {
  var t = r.reduce(function(e, i) {
    var n = e[i.name];
    return e[i.name] = n ? Object.assign({}, n, i, {
      options: Object.assign({}, n.options, i.options),
      data: Object.assign({}, n.data, i.data)
    }) : i, e;
  }, {});
  return Object.keys(t).map(function(e) {
    return t[e];
  });
}
var te = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function ee() {
  for (var r = arguments.length, t = new Array(r), e = 0; e < r; e++)
    t[e] = arguments[e];
  return !t.some(function(i) {
    return !(i && typeof i.getBoundingClientRect == "function");
  });
}
function Sr(r) {
  r === void 0 && (r = {});
  var t = r, e = t.defaultModifiers, i = e === void 0 ? [] : e, n = t.defaultOptions, a = n === void 0 ? te : n;
  return function(o, f, p) {
    p === void 0 && (p = a);
    var l = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, te, a),
      modifiersData: {},
      elements: {
        reference: o,
        popper: f
      },
      attributes: {},
      styles: {}
    }, h = [], m = !1, d = {
      state: l,
      setOptions: function(k) {
        var g = typeof k == "function" ? k(l.options) : k;
        u(), l.options = Object.assign({}, a, l.options, g), l.scrollParents = {
          reference: Z(o) ? ct(o) : o.contextElement ? ct(o.contextElement) : [],
          popper: ct(f)
        };
        var O = Er(Cr([].concat(i, l.options.modifiers)));
        return l.orderedModifiers = O.filter(function(y) {
          return y.enabled;
        }), c(), d.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!m) {
          var k = l.elements, g = k.reference, O = k.popper;
          if (ee(g, O)) {
            l.rects = {
              reference: kr(g, dt(O), l.options.strategy === "fixed"),
              popper: $t(O)
            }, l.reset = !1, l.placement = l.options.placement, l.orderedModifiers.forEach(function(E) {
              return l.modifiersData[E.name] = Object.assign({}, E.data);
            });
            for (var y = 0; y < l.orderedModifiers.length; y++) {
              if (l.reset === !0) {
                l.reset = !1, y = -1;
                continue;
              }
              var w = l.orderedModifiers[y], b = w.fn, x = w.options, C = x === void 0 ? {} : x, D = w.name;
              typeof b == "function" && (l = b({
                state: l,
                options: C,
                name: D,
                instance: d
              }) || l);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Dr(function() {
        return new Promise(function(v) {
          d.forceUpdate(), v(l);
        });
      }),
      destroy: function() {
        u(), m = !0;
      }
    };
    if (!ee(o, f))
      return d;
    d.setOptions(p).then(function(v) {
      !m && p.onFirstUpdate && p.onFirstUpdate(v);
    });
    function c() {
      l.orderedModifiers.forEach(function(v) {
        var k = v.name, g = v.options, O = g === void 0 ? {} : g, y = v.effect;
        if (typeof y == "function") {
          var w = y({
            state: l,
            name: k,
            instance: d,
            options: O
          }), b = function() {
          };
          h.push(w || b);
        }
      });
    }
    function u() {
      h.forEach(function(v) {
        return v();
      }), h = [];
    }
    return d;
  };
}
var Pr = [Ge, vr, Ke, Fe, dr, fr, gr, Ie, lr], _r = /* @__PURE__ */ Sr({
  defaultModifiers: Pr
});
class jr {
  constructor(t, e, i, n, a, s, o, f, p) {
    if (this.cfg = t, this.hTag = e, this.appPixi = i, this.main = n, this.layMng = a, this.val = s, this.scrItr = f, this.sys = p, e.clear_event = (c) => j.clear_event(c), e.event = (c) => this.#b(c), e.l = (c) => this.#r.l(c), e.p = (c) => this.#r.p(c), e.s = (c) => this.#r.s(c), e.set_cancel_skip = () => !1, e.set_focus = (c) => this.#w(c), e.wait = (c) => this.#r.wait(c), e.waitclick = (c) => this.#r.waitclick(c), e.page = (c) => this.#r.page(c), o.setEvtMng(this), f.setOtherObj(this, a), ke.setEvtMng(this, p, f), a.setEvtMng(this), p.setFire((c, u) => this.#r.fire(c, u)), J.isDbg) {
      const c = {
        pause: () => {
          if (!this.#r.isWait) return;
          const u = {};
          f.recodeDesign(u), p.callHook("_enterDesign", u), p.send2Dbg("_enterDesign", u);
        }
        //				stopOnBreakpoint		: ()=> this.#isDbgBreak = true,
        //				stopOnDataBreakpoint	: ()=> this.#isDbgBreak = true,
        //				continue				: ()=> this.#isDbgBreak = false,
        //				disconnect				: ()=> this.#isDbgBreak = false,
      };
      c.attach = c.stopOnEntry = c.stopOnStep = c.stopOnStepIn = c.stopOnStepOut = c.stopOnBackstep = c.pause, p.addHook((u) => c[u]?.());
    }
    ge(`
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
`), this.main.cvs.parentElement?.insertAdjacentHTML("beforeend", `
<div class="sn_hint" role="tooltip">
	<span>Dummy</span>
	<div class="sn_hint_ar" data-popper-arrow></div>
</div>`), this.#i = document.querySelector(".sn_hint"), this.#l = this.#i.querySelector("span"), this.#p = _r(this.#v, this.#i), this.#i.hidden = !0, i.stage.interactive = !0, J.isMobile ? this.#e.addC(i.stage, "pointerdown", (c) => this.#r.fire("click", c)) : this.#e.addC(i.stage, "pointerdown", (c) => {
      switch (c.data.button) {
        case 0:
          this.#r.fire("click", c);
          break;
        case 1:
          this.#r.fire("middleclick", c);
          break;
      }
    }), this.#e.add(window, "keydown", (c) => this.#a(c)), this.#e.add(this.main.cvs, "contextmenu", (c) => this.#o(c));
    const l = () => s.setVal_Nochk("tmp", "const.sn.navigator.language", navigator.language);
    this.#e.add(window, "languagechange", (c) => {
      l(), this.#r.fire("sn:chgNavLang", c), be();
    }), l();
    const h = (c) => {
      J.isDarkMode = c.matches, s.setVal_Nochk("tmp", "const.sn.isDarkMode", J.isDarkMode);
    }, m = globalThis.matchMedia("(prefers-color-scheme: dark)");
    h(m), this.#e.add(m, "change", (c) => {
      h(c), this.#r.fire("sn:chgDarkMode", c);
    });
    let d = (c, u) => {
    };
    "WheelEvent" in window && (this.#e.add(this.main.cvs, "wheel", (c) => this.#d(c), { passive: !0 }), this.#s = (c) => this.#e.add(c, "wheel", (u) => this.#d(u), { passive: !0 }), d = (c, u) => c.add(this.main.cvs, "wheel", (v) => {
      v.isComposing || v.deltaY <= 0 || (v.stopPropagation(), u());
    })), j.init((c) => {
      this.#r?.destroy(), this.#r = c;
    }, n, s, a, f, o, e, this.#t, d, this.#i, t), import("./gamepad.js").then((c) => c.g).then(({ GamepadListener: c }) => {
      const u = new c({
        analog: !1,
        deadZone: 0.3
      });
      J.debugLog && (u.on("gamepad:connected", (g) => console.log(`👺<'gamepad:connected' index:${g.detail.index} id:${g.detail.gamepad.id}`)), u.on("gamepad:disconnected", (g) => console.log(`👺<'gamepad:disconnected' index:${g.detail.index} id:${g.detail.gamepad?.id}`)));
      const v = [
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
      ], k = [0, 0];
      u.on("gamepad:axis", (g) => {
        if (!document.hasFocus()) return;
        k[g.detail.axis] = g.detail.value;
        const [O = 0, y = 0] = k, w = (y + 1) * 3 + (O + 1), b = v[w];
        if (!b) return;
        const x = this.#t.getFocus();
        (!x || x instanceof st ? globalThis : x).dispatchEvent(new KeyboardEvent("keydown", { key: b, bubbles: !0 })), !(!x || x instanceof st) && x.getAttribute("type") === "range" && x.dispatchEvent(new InputEvent("input", { bubbles: !0 }));
      }), u.on("gamepad:button", (g) => {
        if (document.hasFocus())
          if (g.detail.button % 2 === 0) {
            const O = this.#t.getFocus();
            (!O || O instanceof st ? globalThis : O).dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: !0 }));
          } else this.main.cvs.dispatchEvent(new Event("contextmenu"));
      }), u.start();
    }), this.#e.add(window, "keyup", (c) => {
      c.isComposing || c.key in this.#n && (this.#n[c.key] = 0);
    }), s.defTmp("const.sn.key.alternate", () => this.#n.Alt > 0), s.defTmp("const.sn.key.command", () => this.#n.Meta > 0), s.defTmp("const.sn.key.control", () => this.#n.Control > 0), s.defTmp("const.sn.key.end", () => this.#n.End > 0), s.defTmp("const.sn.key.escape", () => this.#n.Escape > 0), s.defTmp("const.sn.key.back", () => this.#n.GoBack > 0);
  }
  #e = new re();
  #t = new Oe();
  #r;
  resvFlameEvent(t) {
    this.#e.add(t, "keydown", (e) => this.#a(e)), this.#e.add(t, "contextmenu", (e) => this.#o(e)), this.#s(t);
  }
  #s = (t) => {
  };
  #a(t) {
    t.isComposing || (t.key in this.#n && (this.#n[t.key] = t.repeat ? 2 : 1), this.#r.fire(we.modKey(t) + t.key, t));
  }
  #o(t) {
    this.#r.fire(this.#u(t) + "rightclick", t), t.preventDefault();
  }
  #u(t) {
    return (t.altKey ? "alt+" : "") + (t.ctrlKey ? "ctrl+" : "") + (t.metaKey ? "meta+" : "") + (t.shiftKey ? "shift+" : "");
  }
  #d(t) {
    if (this.#f) {
      this.#c = !0;
      return;
    }
    this.#f = !0, this.#h();
    const e = this.#u(t) + (t.deltaY > 0 ? "downwheel" : "upwheel");
    this.#r.fire(e, t);
  }
  #f = !1;
  #c = !1;
  #h() {
    setTimeout(() => {
      if (this.#c) {
        this.#c = !1, this.#h();
        return;
      }
      this.#f = !1;
    }, 250);
  }
  destroy() {
    for (const t of Array.from(document.getElementsByClassName("sn_hint"))) t.parentElement?.removeChild(t);
    this.#r.destroy(), this.#t.destroy(), this.#e.clear();
  }
  fire(t, e) {
    this.#r.fire(t, e);
  }
  popLocalEvts() {
    return j.popLocalEvts();
  }
  pushLocalEvts(t) {
    j.pushLocalEvts(t);
  }
  unButton(t) {
    this.#t.remove(t);
  }
  button(t, e, i, n, a) {
    !t.fn && !t.label && !t.url && this.main.errScript("fnまたはlabelまたはurlは必須です"), t.fn ??= this.scrItr.scriptFn, e.interactive = !0, e.cursor = "pointer";
    const s = t.key?.toLowerCase() ?? " ", o = K(t, "global", !1);
    j.setEvt2Fnc(o, s, () => this.main.resumeByJumpOrCall(t)), e.on("pointerdown", (h) => this.#r.fire(s, h));
    const f = t.hint ? () => this.#g(t, e) : () => {
    }, p = () => {
      i(), this.#i.hidden = !0;
    }, l = () => (f(), n());
    if (e.on("pointerover", l), e.on("pointerout", () => {
      this.#t.isFocus(e) ? l() : p();
    }), e.on("pointerdown", () => {
      this.#i.hidden = !0;
      const h = this.#t.getFocus();
      a(), h instanceof Yt && h.normal();
    }), e.on(
      "pointerup",
      J.isMobile ? p : () => {
        this.#t.isFocus(e) ? l() : p();
      }
    ), this.#t.add(e, l, p), t.clickse && (t.clicksebuf ??= "SYS", this.cfg.searchPath(t.clickse, St.SOUND), e.on("pointerdown", () => {
      this.hTag.playse({ fn: t.clickse, buf: t.clicksebuf, join: !1 });
    })), t.enterse && (t.entersebuf ??= "SYS", this.cfg.searchPath(t.enterse, St.SOUND), e.on("pointerover", () => {
      this.hTag.playse({ fn: t.enterse, buf: t.entersebuf, join: !1 });
    })), t.leavese && (t.leavesebuf ??= "SYS", this.cfg.searchPath(t.leavese, St.SOUND), e.on("pointerout", () => {
      this.hTag.playse({ fn: t.leavese, buf: t.leavesebuf, join: !1 });
    })), t.onenter) {
      const h = s + t.onenter.toLowerCase(), m = { fn: t.fn, label: t.onenter, call: !0, key: h };
      j.setEvt2Fnc(o, h, () => this.main.resumeByJumpOrCall(m)), e.on("pointerover", (d) => this.#r.fire(h, d));
    }
    if (t.onleave) {
      const h = s + t.onleave.toLowerCase(), m = { fn: t.fn, label: t.onleave, call: !0, key: h };
      j.setEvt2Fnc(o, h, () => this.main.resumeByJumpOrCall(m)), e.on("pointerout", (d) => this.#r.fire(h, d));
    }
  }
  #v = {
    getBoundingClientRect: (t = 0, e = 0) => DOMRect.fromRect({ x: t, y: e, width: 0, height: 0 })
  };
  #i;
  #l;
  #p;
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
  #g(t, e) {
    const i = e instanceof Yt ? e.getBtnBounds() : e.getBounds();
    if (!(t[":タグ名"] === "link")) {
      const a = e.parent.parent;
      i.x += a.x, i.y += a.y;
    }
    if (!t.hint) {
      this.#i.hidden = !0;
      return;
    }
    this.#i.style.cssText = `position:${this.#i.style.position}; transform:${this.#i.style.transform};` + (t.hint_style ?? ""), this.#l.style.cssText = "", this.#l.textContent = t.hint ?? "";
    try {
      const a = t.hint_opt ? { ...this.#m, ...JSON.parse(t.hint_opt) } : this.#m;
      this.#p.setOptions(a);
    } catch (a) {
      console.error(xe(
        t,
        "hint_opt",
        `dispHint 引数 hint_opt エラー ${a instanceof SyntaxError ? a.message : ""}`
      ));
    }
    this.#v.getBoundingClientRect = () => DOMRect.fromRect({
      x: this.sys.ofsLeft4elm + i.x * this.sys.cvsScale,
      y: this.sys.ofsTop4elm + i.y * this.sys.cvsScale,
      width: i.width,
      height: i.height
    }), this.#p.update(), this.#i.hidden = !1;
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
    const i = e.toLowerCase(), n = K(t, "call", !1), a = K(t, "global", !1);
    if (K(t, "del", !1)) {
      if (t.fn || t.label || n || t.url) throw "fn/label/callとdelは同時指定できません";
      return j.clear_eventer(e, a, i), !1;
    }
    if (!t.fn && !t.label && !t.url) throw "fn,label,url いずれかは必須です";
    if (t.fn ??= this.scrItr.scriptFn, e.startsWith("dom=")) {
      const s = j.getHtmlElmList(e);
      if (s.el.length === 0) {
        if (K(t, "need_err", !0)) throw `HTML内にセレクタ（${s.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
        return !1;
      }
      let o = ["click", "keydown"];
      switch (s.el[0].type ?? "") {
        //	switch (g.el[0].getAttribute('type') ?? '') { textareaで''になる
        case "checkbox":
          o = ["input"];
          break;
        case "range":
          o = ["input"];
          break;
        case "text":
        case "textarea":
          o = ["input", "change"];
          break;
      }
      const p = o.length;
      for (let l = 0; l < p; ++l) {
        const h = o[l];
        s.el.forEach((m) => {
          this.#e.add(m, h, (d) => {
            if (!this.#r.isWait || this.layMng.getFrmDisabled(s.id) || h === "keydown" && d.key !== "Enter") return;
            const c = m.dataset;
            for (const [u, v] of Object.entries(c)) this.val.setVal_Nochk("tmp", `sn.event.domdata.${u}`, v);
            this.#r.fire(e, d);
          }), l === 0 && this.#t.add(
            m,
            () => this.#y(m) ? (m.focus(), !0) : !1,
            () => {
            }
          );
        });
      }
    }
    return j.setEvt2Fnc(a, i, () => this.main.resumeByJumpOrCall(t)), !1;
  }
  #y(t) {
    if (t.offsetParent === null) return !1;
    let e = t;
    do {
      if (getComputedStyle(e).display === "none" || e.dataset.focus === "false" || e?.disabled) return !1;
      e = e.parentElement;
    } while (e !== null);
    return !0;
  }
  // フォーカス移動
  #w(t) {
    const { add: e, del: i, to: n } = t;
    if (e?.startsWith("dom=")) {
      const a = j.getHtmlElmList(e);
      if (a.el.length === 0 && K(t, "need_err", !0)) throw `HTML内にセレクタ（${a.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
      return a.el.forEach((s) => this.#t.add(
        s,
        () => this.#y(s) ? (s.focus(), !0) : !1,
        () => {
        }
      )), !1;
    }
    if (i?.startsWith("dom=")) {
      const a = j.getHtmlElmList(i);
      if (a.el.length === 0 && K(t, "need_err", !0)) throw `HTML内にセレクタ（${a.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
      return a.el.forEach((s) => this.#t.remove(s)), !1;
    }
    if (!n) throw "[set_focus] add か to は必須です";
    switch (n) {
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
  // テキスト表示待ちと処理終了待ち（予約イベント受付しない）
  //	waitEvent を使用する場合、通常 break 時は breakLimitedEvent() すること
  waitEvent = (t, e, i) => this.#r.waitEvent(t, e, i);
  breakEvent(t) {
    this.#r.breakEvent(t);
  }
  // キー押下によるスキップ中か
  get isSkipping() {
    return this.#r.isSkipping ? !0 : Object.keys(this.#n).some((t) => this.#n[t] === 2);
  }
  // 0:no push  1:one push  2:push repeating
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
    // AndroidのBackキーだと思う
  };
}
export {
  jr as EventMng
};
//# sourceMappingURL=EventMng.js.map
