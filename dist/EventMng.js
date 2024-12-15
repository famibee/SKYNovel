import { E as ne, j as ft, C as J, k as be, M as at, l as we, m as xe, a as K, S as Pt, o as ke } from "./web2.js";
import { T as Oe, B as Xt } from "./LayerMng.js";
import { R as $ } from "./ReadState.js";
class Ee {
  #e = [];
  #t = -1;
  #r = new ne();
  destroy() {
    this.#e = [], this.#t = -1, this.#r.clear();
  }
  add(t, e, n) {
    if (this.#e.findIndex((o) => o.btn === t) >= 0) return;
    if (t instanceof ft) {
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
    let i = (o) => {
    }, a = t.localName === "button" || t.localName === "a" ? (o) => !o.isTrusted && o.key === "Enter" : (o) => o.key === "Enter";
    const s = t;
    switch (s.type ?? "") {
      //	switch (btn.getAttribute('type') ?? '') {	// textareaで''になる
      case "checkbox":
        i = () => s.checked = !s.checked;
        break;
      case "":
        t.querySelectorAll("input[type]").length > 0 && (i = (o) => this.#s(t, o.key), a = () => !1);
        break;
      case "range":
        i = (o) => {
          o.isTrusted || (o.key === "ArrowUp" ? s.stepUp() : s.stepDown());
        };
        break;
      case "text":
      case "textarea":
        i = (o) => {
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
        i(o);
      }
    }, { passive: !0 }), t.hasAttribute("tabindex") || (t.tabIndex = 0), this.#e.push({ btn: t, on: e, off: n });
  }
  remove(t) {
    const e = this.#e.findIndex((n) => n.btn === t);
    e < 0 || (this.#e.splice(e, 1), this.#e.length === 0 ? this.#t = -1 : e <= this.#t && --this.#t);
  }
  #s(t, e) {
    const n = t.querySelectorAll("input[type]"), i = n.length;
    for (let a = 0; a < i; ++a)
      if (n[a].checked) {
        n[(a + i + (e === "ArrowUp" ? -1 : 1)) % i].checked = !0;
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
          this.#t = n, this.#a(n);
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
          this.#t = n, this.#a(n);
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
      !(e.btn instanceof ft) || e.btn.parent ? e.off() : this.#e.splice(t, 1);
    }
  }
}
var _ = "top", T = "bottom", H = "right", L = "left", Rt = "auto", dt = [_, T, H, L], tt = "start", pt = "end", De = "clippingParents", ie = "viewport", st = "popper", Se = "reference", zt = /* @__PURE__ */ dt.reduce(function(r, t) {
  return r.concat([t + "-" + tt, t + "-" + pt]);
}, []), oe = /* @__PURE__ */ [].concat(dt, [Rt]).reduce(function(r, t) {
  return r.concat([t, t + "-" + tt, t + "-" + pt]);
}, []), Ce = "beforeRead", Pe = "read", _e = "afterRead", Le = "beforeMain", Re = "main", Me = "afterMain", $e = "beforeWrite", je = "write", Te = "afterWrite", He = [Ce, Pe, _e, Le, Re, Me, $e, je, Te];
function N(r) {
  return r ? (r.nodeName || "").toLowerCase() : null;
}
function M(r) {
  if (r == null)
    return window;
  if (r.toString() !== "[object Window]") {
    var t = r.ownerDocument;
    return t && t.defaultView || window;
  }
  return r;
}
function Z(r) {
  var t = M(r).Element;
  return r instanceof t || r instanceof Element;
}
function j(r) {
  var t = M(r).HTMLElement;
  return r instanceof t || r instanceof HTMLElement;
}
function Mt(r) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = M(r).ShadowRoot;
  return r instanceof t || r instanceof ShadowRoot;
}
function Be(r) {
  var t = r.state;
  Object.keys(t.elements).forEach(function(e) {
    var n = t.styles[e] || {}, i = t.attributes[e] || {}, a = t.elements[e];
    !j(a) || !N(a) || (Object.assign(a.style, n), Object.keys(i).forEach(function(s) {
      var o = i[s];
      o === !1 ? a.removeAttribute(s) : a.setAttribute(s, o === !0 ? "" : o);
    }));
  });
}
function Fe(r) {
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
    Object.keys(t.elements).forEach(function(n) {
      var i = t.elements[n], a = t.attributes[n] || {}, s = Object.keys(t.styles.hasOwnProperty(n) ? t.styles[n] : e[n]), o = s.reduce(function(f, p) {
        return f[p] = "", f;
      }, {});
      !j(i) || !N(i) || (Object.assign(i.style, o), Object.keys(a).forEach(function(f) {
        i.removeAttribute(f);
      }));
    });
  };
}
const We = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Be,
  effect: Fe,
  requires: ["computeStyles"]
};
function W(r) {
  return r.split("-")[0];
}
var G = Math.max, kt = Math.min, et = Math.round;
function _t() {
  var r = navigator.userAgentData;
  return r != null && r.brands && Array.isArray(r.brands) ? r.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function ae() {
  return !/^((?!chrome|android).)*safari/i.test(_t());
}
function rt(r, t, e) {
  t === void 0 && (t = !1), e === void 0 && (e = !1);
  var n = r.getBoundingClientRect(), i = 1, a = 1;
  t && j(r) && (i = r.offsetWidth > 0 && et(n.width) / r.offsetWidth || 1, a = r.offsetHeight > 0 && et(n.height) / r.offsetHeight || 1);
  var s = Z(r) ? M(r) : window, o = s.visualViewport, f = !ae() && e, p = (n.left + (f && o ? o.offsetLeft : 0)) / i, l = (n.top + (f && o ? o.offsetTop : 0)) / a, h = n.width / i, m = n.height / a;
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
  var t = rt(r), e = r.offsetWidth, n = r.offsetHeight;
  return Math.abs(t.width - e) <= 1 && (e = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: r.offsetLeft,
    y: r.offsetTop,
    width: e,
    height: n
  };
}
function se(r, t) {
  var e = t.getRootNode && t.getRootNode();
  if (r.contains(t))
    return !0;
  if (e && Mt(e)) {
    var n = t;
    do {
      if (n && r.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function A(r) {
  return M(r).getComputedStyle(r);
}
function Ne(r) {
  return ["table", "td", "th"].indexOf(N(r)) >= 0;
}
function q(r) {
  return ((Z(r) ? r.ownerDocument : (
    // $FlowFixMe[prop-missing]
    r.document
  )) || window.document).documentElement;
}
function Ot(r) {
  return N(r) === "html" ? r : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    r.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    r.parentNode || // DOM Element detected
    (Mt(r) ? r.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    q(r)
  );
}
function Kt(r) {
  return !j(r) || // https://github.com/popperjs/popper-core/issues/837
  A(r).position === "fixed" ? null : r.offsetParent;
}
function Ae(r) {
  var t = /firefox/i.test(_t()), e = /Trident/i.test(_t());
  if (e && j(r)) {
    var n = A(r);
    if (n.position === "fixed")
      return null;
  }
  var i = Ot(r);
  for (Mt(i) && (i = i.host); j(i) && ["html", "body"].indexOf(N(i)) < 0; ) {
    var a = A(i);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function ht(r) {
  for (var t = M(r), e = Kt(r); e && Ne(e) && A(e).position === "static"; )
    e = Kt(e);
  return e && (N(e) === "html" || N(e) === "body" && A(e).position === "static") ? t : e || Ae(r) || t;
}
function jt(r) {
  return ["top", "bottom"].indexOf(r) >= 0 ? "x" : "y";
}
function ct(r, t, e) {
  return G(r, kt(t, e));
}
function Ve(r, t, e) {
  var n = ct(r, t, e);
  return n > e ? e : n;
}
function fe() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function ce(r) {
  return Object.assign({}, fe(), r);
}
function le(r, t) {
  return t.reduce(function(e, n) {
    return e[n] = r, e;
  }, {});
}
var qe = function(t, e) {
  return t = typeof t == "function" ? t(Object.assign({}, e.rects, {
    placement: e.placement
  })) : t, ce(typeof t != "number" ? t : le(t, dt));
};
function Ue(r) {
  var t, e = r.state, n = r.name, i = r.options, a = e.elements.arrow, s = e.modifiersData.popperOffsets, o = W(e.placement), f = jt(o), p = [L, H].indexOf(o) >= 0, l = p ? "height" : "width";
  if (!(!a || !s)) {
    var h = qe(i.padding, e), m = $t(a), d = f === "y" ? _ : L, c = f === "y" ? T : H, u = e.rects.reference[l] + e.rects.reference[f] - s[f] - e.rects.popper[l], v = s[f] - e.rects.reference[f], k = ht(a), g = k ? f === "y" ? k.clientHeight || 0 : k.clientWidth || 0 : 0, O = u / 2 - v / 2, y = h[d], w = g - m[l] - h[c], b = g / 2 - m[l] / 2 + O, x = ct(y, b, w), S = f;
    e.modifiersData[n] = (t = {}, t[S] = x, t.centerOffset = x - b, t);
  }
}
function Ie(r) {
  var t = r.state, e = r.options, n = e.element, i = n === void 0 ? "[data-popper-arrow]" : n;
  i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || se(t.elements.popper, i) && (t.elements.arrow = i));
}
const Ye = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Ue,
  effect: Ie,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function nt(r) {
  return r.split("-")[1];
}
var Xe = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function ze(r, t) {
  var e = r.x, n = r.y, i = t.devicePixelRatio || 1;
  return {
    x: et(e * i) / i || 0,
    y: et(n * i) / i || 0
  };
}
function Jt(r) {
  var t, e = r.popper, n = r.popperRect, i = r.placement, a = r.variation, s = r.offsets, o = r.position, f = r.gpuAcceleration, p = r.adaptive, l = r.roundOffsets, h = r.isFixed, m = s.x, d = m === void 0 ? 0 : m, c = s.y, u = c === void 0 ? 0 : c, v = typeof l == "function" ? l({
    x: d,
    y: u
  }) : {
    x: d,
    y: u
  };
  d = v.x, u = v.y;
  var k = s.hasOwnProperty("x"), g = s.hasOwnProperty("y"), O = L, y = _, w = window;
  if (p) {
    var b = ht(e), x = "clientHeight", S = "clientWidth";
    if (b === M(e) && (b = q(e), A(b).position !== "static" && o === "absolute" && (x = "scrollHeight", S = "scrollWidth")), b = b, i === _ || (i === L || i === H) && a === pt) {
      y = T;
      var D = h && b === w && w.visualViewport ? w.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        b[x]
      );
      u -= D - n.height, u *= f ? 1 : -1;
    }
    if (i === L || (i === _ || i === T) && a === pt) {
      O = H;
      var E = h && b === w && w.visualViewport ? w.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        b[S]
      );
      d -= E - n.width, d *= f ? 1 : -1;
    }
  }
  var C = Object.assign({
    position: o
  }, p && Xe), B = l === !0 ? ze({
    x: d,
    y: u
  }, M(e)) : {
    x: d,
    y: u
  };
  if (d = B.x, u = B.y, f) {
    var P;
    return Object.assign({}, C, (P = {}, P[y] = g ? "0" : "", P[O] = k ? "0" : "", P.transform = (w.devicePixelRatio || 1) <= 1 ? "translate(" + d + "px, " + u + "px)" : "translate3d(" + d + "px, " + u + "px, 0)", P));
  }
  return Object.assign({}, C, (t = {}, t[y] = g ? u + "px" : "", t[O] = k ? d + "px" : "", t.transform = "", t));
}
function Ke(r) {
  var t = r.state, e = r.options, n = e.gpuAcceleration, i = n === void 0 ? !0 : n, a = e.adaptive, s = a === void 0 ? !0 : a, o = e.roundOffsets, f = o === void 0 ? !0 : o, p = {
    placement: W(t.placement),
    variation: nt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Jt(Object.assign({}, p, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: f
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Jt(Object.assign({}, p, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: f
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Je = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Ke,
  data: {}
};
var wt = {
  passive: !0
};
function Ge(r) {
  var t = r.state, e = r.instance, n = r.options, i = n.scroll, a = i === void 0 ? !0 : i, s = n.resize, o = s === void 0 ? !0 : s, f = M(t.elements.popper), p = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return a && p.forEach(function(l) {
    l.addEventListener("scroll", e.update, wt);
  }), o && f.addEventListener("resize", e.update, wt), function() {
    a && p.forEach(function(l) {
      l.removeEventListener("scroll", e.update, wt);
    }), o && f.removeEventListener("resize", e.update, wt);
  };
}
const Ze = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Ge,
  data: {}
};
var Qe = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function xt(r) {
  return r.replace(/left|right|bottom|top/g, function(t) {
    return Qe[t];
  });
}
var tr = {
  start: "end",
  end: "start"
};
function Gt(r) {
  return r.replace(/start|end/g, function(t) {
    return tr[t];
  });
}
function Tt(r) {
  var t = M(r), e = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: e,
    scrollTop: n
  };
}
function Ht(r) {
  return rt(q(r)).left + Tt(r).scrollLeft;
}
function er(r, t) {
  var e = M(r), n = q(r), i = e.visualViewport, a = n.clientWidth, s = n.clientHeight, o = 0, f = 0;
  if (i) {
    a = i.width, s = i.height;
    var p = ae();
    (p || !p && t === "fixed") && (o = i.offsetLeft, f = i.offsetTop);
  }
  return {
    width: a,
    height: s,
    x: o + Ht(r),
    y: f
  };
}
function rr(r) {
  var t, e = q(r), n = Tt(r), i = (t = r.ownerDocument) == null ? void 0 : t.body, a = G(e.scrollWidth, e.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), s = G(e.scrollHeight, e.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), o = -n.scrollLeft + Ht(r), f = -n.scrollTop;
  return A(i || e).direction === "rtl" && (o += G(e.clientWidth, i ? i.clientWidth : 0) - a), {
    width: a,
    height: s,
    x: o,
    y: f
  };
}
function Bt(r) {
  var t = A(r), e = t.overflow, n = t.overflowX, i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(e + i + n);
}
function pe(r) {
  return ["html", "body", "#document"].indexOf(N(r)) >= 0 ? r.ownerDocument.body : j(r) && Bt(r) ? r : pe(Ot(r));
}
function lt(r, t) {
  var e;
  t === void 0 && (t = []);
  var n = pe(r), i = n === ((e = r.ownerDocument) == null ? void 0 : e.body), a = M(n), s = i ? [a].concat(a.visualViewport || [], Bt(n) ? n : []) : n, o = t.concat(s);
  return i ? o : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    o.concat(lt(Ot(s)))
  );
}
function Lt(r) {
  return Object.assign({}, r, {
    left: r.x,
    top: r.y,
    right: r.x + r.width,
    bottom: r.y + r.height
  });
}
function nr(r, t) {
  var e = rt(r, !1, t === "fixed");
  return e.top = e.top + r.clientTop, e.left = e.left + r.clientLeft, e.bottom = e.top + r.clientHeight, e.right = e.left + r.clientWidth, e.width = r.clientWidth, e.height = r.clientHeight, e.x = e.left, e.y = e.top, e;
}
function Zt(r, t, e) {
  return t === ie ? Lt(er(r, e)) : Z(t) ? nr(t, e) : Lt(rr(q(r)));
}
function ir(r) {
  var t = lt(Ot(r)), e = ["absolute", "fixed"].indexOf(A(r).position) >= 0, n = e && j(r) ? ht(r) : r;
  return Z(n) ? t.filter(function(i) {
    return Z(i) && se(i, n) && N(i) !== "body";
  }) : [];
}
function or(r, t, e, n) {
  var i = t === "clippingParents" ? ir(r) : [].concat(t), a = [].concat(i, [e]), s = a[0], o = a.reduce(function(f, p) {
    var l = Zt(r, p, n);
    return f.top = G(l.top, f.top), f.right = kt(l.right, f.right), f.bottom = kt(l.bottom, f.bottom), f.left = G(l.left, f.left), f;
  }, Zt(r, s, n));
  return o.width = o.right - o.left, o.height = o.bottom - o.top, o.x = o.left, o.y = o.top, o;
}
function ue(r) {
  var t = r.reference, e = r.element, n = r.placement, i = n ? W(n) : null, a = n ? nt(n) : null, s = t.x + t.width / 2 - e.width / 2, o = t.y + t.height / 2 - e.height / 2, f;
  switch (i) {
    case _:
      f = {
        x: s,
        y: t.y - e.height
      };
      break;
    case T:
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
  var p = i ? jt(i) : null;
  if (p != null) {
    var l = p === "y" ? "height" : "width";
    switch (a) {
      case tt:
        f[p] = f[p] - (t[l] / 2 - e[l] / 2);
        break;
      case pt:
        f[p] = f[p] + (t[l] / 2 - e[l] / 2);
        break;
    }
  }
  return f;
}
function ut(r, t) {
  t === void 0 && (t = {});
  var e = t, n = e.placement, i = n === void 0 ? r.placement : n, a = e.strategy, s = a === void 0 ? r.strategy : a, o = e.boundary, f = o === void 0 ? De : o, p = e.rootBoundary, l = p === void 0 ? ie : p, h = e.elementContext, m = h === void 0 ? st : h, d = e.altBoundary, c = d === void 0 ? !1 : d, u = e.padding, v = u === void 0 ? 0 : u, k = ce(typeof v != "number" ? v : le(v, dt)), g = m === st ? Se : st, O = r.rects.popper, y = r.elements[c ? g : m], w = or(Z(y) ? y : y.contextElement || q(r.elements.popper), f, l, s), b = rt(r.elements.reference), x = ue({
    reference: b,
    element: O,
    strategy: "absolute",
    placement: i
  }), S = Lt(Object.assign({}, O, x)), D = m === st ? S : b, E = {
    top: w.top - D.top + k.top,
    bottom: D.bottom - w.bottom + k.bottom,
    left: w.left - D.left + k.left,
    right: D.right - w.right + k.right
  }, C = r.modifiersData.offset;
  if (m === st && C) {
    var B = C[i];
    Object.keys(E).forEach(function(P) {
      var U = [H, T].indexOf(P) >= 0 ? 1 : -1, I = [_, T].indexOf(P) >= 0 ? "y" : "x";
      E[P] += B[I] * U;
    });
  }
  return E;
}
function ar(r, t) {
  t === void 0 && (t = {});
  var e = t, n = e.placement, i = e.boundary, a = e.rootBoundary, s = e.padding, o = e.flipVariations, f = e.allowedAutoPlacements, p = f === void 0 ? oe : f, l = nt(n), h = l ? o ? zt : zt.filter(function(c) {
    return nt(c) === l;
  }) : dt, m = h.filter(function(c) {
    return p.indexOf(c) >= 0;
  });
  m.length === 0 && (m = h);
  var d = m.reduce(function(c, u) {
    return c[u] = ut(r, {
      placement: u,
      boundary: i,
      rootBoundary: a,
      padding: s
    })[W(u)], c;
  }, {});
  return Object.keys(d).sort(function(c, u) {
    return d[c] - d[u];
  });
}
function sr(r) {
  if (W(r) === Rt)
    return [];
  var t = xt(r);
  return [Gt(r), t, Gt(t)];
}
function fr(r) {
  var t = r.state, e = r.options, n = r.name;
  if (!t.modifiersData[n]._skip) {
    for (var i = e.mainAxis, a = i === void 0 ? !0 : i, s = e.altAxis, o = s === void 0 ? !0 : s, f = e.fallbackPlacements, p = e.padding, l = e.boundary, h = e.rootBoundary, m = e.altBoundary, d = e.flipVariations, c = d === void 0 ? !0 : d, u = e.allowedAutoPlacements, v = t.options.placement, k = W(v), g = k === v, O = f || (g || !c ? [xt(v)] : sr(v)), y = [v].concat(O).reduce(function(Q, V) {
      return Q.concat(W(V) === Rt ? ar(t, {
        placement: V,
        boundary: l,
        rootBoundary: h,
        padding: p,
        flipVariations: c,
        allowedAutoPlacements: u
      }) : V);
    }, []), w = t.rects.reference, b = t.rects.popper, x = /* @__PURE__ */ new Map(), S = !0, D = y[0], E = 0; E < y.length; E++) {
      var C = y[E], B = W(C), P = nt(C) === tt, U = [_, T].indexOf(B) >= 0, I = U ? "width" : "height", R = ut(t, {
        placement: C,
        boundary: l,
        rootBoundary: h,
        altBoundary: m,
        padding: p
      }), F = U ? P ? H : L : P ? T : _;
      w[I] > b[I] && (F = xt(F));
      var vt = xt(F), Y = [];
      if (a && Y.push(R[B] <= 0), o && Y.push(R[F] <= 0, R[vt] <= 0), Y.every(function(Q) {
        return Q;
      })) {
        D = C, S = !1;
        break;
      }
      x.set(C, Y);
    }
    if (S)
      for (var mt = c ? 3 : 1, Et = function(V) {
        var ot = y.find(function(gt) {
          var X = x.get(gt);
          if (X)
            return X.slice(0, V).every(function(Dt) {
              return Dt;
            });
        });
        if (ot)
          return D = ot, "break";
      }, it = mt; it > 0; it--) {
        var yt = Et(it);
        if (yt === "break") break;
      }
    t.placement !== D && (t.modifiersData[n]._skip = !0, t.placement = D, t.reset = !0);
  }
}
const cr = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: fr,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Qt(r, t, e) {
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
function te(r) {
  return [_, H, T, L].some(function(t) {
    return r[t] >= 0;
  });
}
function lr(r) {
  var t = r.state, e = r.name, n = t.rects.reference, i = t.rects.popper, a = t.modifiersData.preventOverflow, s = ut(t, {
    elementContext: "reference"
  }), o = ut(t, {
    altBoundary: !0
  }), f = Qt(s, n), p = Qt(o, i, a), l = te(f), h = te(p);
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
const pr = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: lr
};
function ur(r, t, e) {
  var n = W(r), i = [L, _].indexOf(n) >= 0 ? -1 : 1, a = typeof e == "function" ? e(Object.assign({}, t, {
    placement: r
  })) : e, s = a[0], o = a[1];
  return s = s || 0, o = (o || 0) * i, [L, H].indexOf(n) >= 0 ? {
    x: o,
    y: s
  } : {
    x: s,
    y: o
  };
}
function dr(r) {
  var t = r.state, e = r.options, n = r.name, i = e.offset, a = i === void 0 ? [0, 0] : i, s = oe.reduce(function(l, h) {
    return l[h] = ur(h, t.rects, a), l;
  }, {}), o = s[t.placement], f = o.x, p = o.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += f, t.modifiersData.popperOffsets.y += p), t.modifiersData[n] = s;
}
const hr = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: dr
};
function vr(r) {
  var t = r.state, e = r.name;
  t.modifiersData[e] = ue({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const mr = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: vr,
  data: {}
};
function yr(r) {
  return r === "x" ? "y" : "x";
}
function gr(r) {
  var t = r.state, e = r.options, n = r.name, i = e.mainAxis, a = i === void 0 ? !0 : i, s = e.altAxis, o = s === void 0 ? !1 : s, f = e.boundary, p = e.rootBoundary, l = e.altBoundary, h = e.padding, m = e.tether, d = m === void 0 ? !0 : m, c = e.tetherOffset, u = c === void 0 ? 0 : c, v = ut(t, {
    boundary: f,
    rootBoundary: p,
    padding: h,
    altBoundary: l
  }), k = W(t.placement), g = nt(t.placement), O = !g, y = jt(k), w = yr(y), b = t.modifiersData.popperOffsets, x = t.rects.reference, S = t.rects.popper, D = typeof u == "function" ? u(Object.assign({}, t.rects, {
    placement: t.placement
  })) : u, E = typeof D == "number" ? {
    mainAxis: D,
    altAxis: D
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, D), C = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, B = {
    x: 0,
    y: 0
  };
  if (b) {
    if (a) {
      var P, U = y === "y" ? _ : L, I = y === "y" ? T : H, R = y === "y" ? "height" : "width", F = b[y], vt = F + v[U], Y = F - v[I], mt = d ? -S[R] / 2 : 0, Et = g === tt ? x[R] : S[R], it = g === tt ? -S[R] : -x[R], yt = t.elements.arrow, Q = d && yt ? $t(yt) : {
        width: 0,
        height: 0
      }, V = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : fe(), ot = V[U], gt = V[I], X = ct(0, x[R], Q[R]), Dt = O ? x[R] / 2 - mt - X - ot - E.mainAxis : Et - X - ot - E.mainAxis, de = O ? -x[R] / 2 + mt + X + gt + E.mainAxis : it + X + gt + E.mainAxis, St = t.elements.arrow && ht(t.elements.arrow), he = St ? y === "y" ? St.clientTop || 0 : St.clientLeft || 0 : 0, Ft = (P = C?.[y]) != null ? P : 0, ve = F + Dt - Ft - he, me = F + de - Ft, Wt = ct(d ? kt(vt, ve) : vt, F, d ? G(Y, me) : Y);
      b[y] = Wt, B[y] = Wt - F;
    }
    if (o) {
      var Nt, ye = y === "x" ? _ : L, ge = y === "x" ? T : H, z = b[w], bt = w === "y" ? "height" : "width", At = z + v[ye], Vt = z - v[ge], Ct = [_, L].indexOf(k) !== -1, qt = (Nt = C?.[w]) != null ? Nt : 0, Ut = Ct ? At : z - x[bt] - S[bt] - qt + E.altAxis, It = Ct ? z + x[bt] + S[bt] - qt - E.altAxis : Vt, Yt = d && Ct ? Ve(Ut, z, It) : ct(d ? Ut : At, z, d ? It : Vt);
      b[w] = Yt, B[w] = Yt - z;
    }
    t.modifiersData[n] = B;
  }
}
const br = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: gr,
  requiresIfExists: ["offset"]
};
function wr(r) {
  return {
    scrollLeft: r.scrollLeft,
    scrollTop: r.scrollTop
  };
}
function xr(r) {
  return r === M(r) || !j(r) ? Tt(r) : wr(r);
}
function kr(r) {
  var t = r.getBoundingClientRect(), e = et(t.width) / r.offsetWidth || 1, n = et(t.height) / r.offsetHeight || 1;
  return e !== 1 || n !== 1;
}
function Or(r, t, e) {
  e === void 0 && (e = !1);
  var n = j(t), i = j(t) && kr(t), a = q(t), s = rt(r, i, e), o = {
    scrollLeft: 0,
    scrollTop: 0
  }, f = {
    x: 0,
    y: 0
  };
  return (n || !n && !e) && ((N(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Bt(a)) && (o = xr(t)), j(t) ? (f = rt(t, !0), f.x += t.clientLeft, f.y += t.clientTop) : a && (f.x = Ht(a))), {
    x: s.left + o.scrollLeft - f.x,
    y: s.top + o.scrollTop - f.y,
    width: s.width,
    height: s.height
  };
}
function Er(r) {
  var t = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Set(), n = [];
  r.forEach(function(a) {
    t.set(a.name, a);
  });
  function i(a) {
    e.add(a.name);
    var s = [].concat(a.requires || [], a.requiresIfExists || []);
    s.forEach(function(o) {
      if (!e.has(o)) {
        var f = t.get(o);
        f && i(f);
      }
    }), n.push(a);
  }
  return r.forEach(function(a) {
    e.has(a.name) || i(a);
  }), n;
}
function Dr(r) {
  var t = Er(r);
  return He.reduce(function(e, n) {
    return e.concat(t.filter(function(i) {
      return i.phase === n;
    }));
  }, []);
}
function Sr(r) {
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
  var t = r.reduce(function(e, n) {
    var i = e[n.name];
    return e[n.name] = i ? Object.assign({}, i, n, {
      options: Object.assign({}, i.options, n.options),
      data: Object.assign({}, i.data, n.data)
    }) : n, e;
  }, {});
  return Object.keys(t).map(function(e) {
    return t[e];
  });
}
var ee = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function re() {
  for (var r = arguments.length, t = new Array(r), e = 0; e < r; e++)
    t[e] = arguments[e];
  return !t.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Pr(r) {
  r === void 0 && (r = {});
  var t = r, e = t.defaultModifiers, n = e === void 0 ? [] : e, i = t.defaultOptions, a = i === void 0 ? ee : i;
  return function(o, f, p) {
    p === void 0 && (p = a);
    var l = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, ee, a),
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
          reference: Z(o) ? lt(o) : o.contextElement ? lt(o.contextElement) : [],
          popper: lt(f)
        };
        var O = Dr(Cr([].concat(n, l.options.modifiers)));
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
          if (re(g, O)) {
            l.rects = {
              reference: Or(g, ht(O), l.options.strategy === "fixed"),
              popper: $t(O)
            }, l.reset = !1, l.placement = l.options.placement, l.orderedModifiers.forEach(function(E) {
              return l.modifiersData[E.name] = Object.assign({}, E.data);
            });
            for (var y = 0; y < l.orderedModifiers.length; y++) {
              if (l.reset === !0) {
                l.reset = !1, y = -1;
                continue;
              }
              var w = l.orderedModifiers[y], b = w.fn, x = w.options, S = x === void 0 ? {} : x, D = w.name;
              typeof b == "function" && (l = b({
                state: l,
                options: S,
                name: D,
                instance: d
              }) || l);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Sr(function() {
        return new Promise(function(v) {
          d.forceUpdate(), v(l);
        });
      }),
      destroy: function() {
        u(), m = !0;
      }
    };
    if (!re(o, f))
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
var _r = [Ze, mr, Je, We, hr, cr, br, Ye, pr], Lr = /* @__PURE__ */ Pr({
  defaultModifiers: _r
});
class jr {
  constructor(t, e, n, i, a, s, o, f, p) {
    if (this.cfg = t, this.hTag = e, this.appPixi = n, this.main = i, this.layMng = a, this.val = s, this.scrItr = f, this.sys = p, e.clear_event = (c) => $.clear_event(c), e.event = (c) => this.#b(c), e.l = (c) => this.#r.l(c), e.p = (c) => this.#r.p(c), e.s = (c) => this.#r.s(c), e.set_cancel_skip = () => !1, e.set_focus = (c) => this.#w(c), e.wait = (c) => this.#r.wait(c), e.waitclick = (c) => this.#r.waitclick(c), e.page = (c) => this.#r.page(c), o.setEvtMng(this), f.setOtherObj(this, a), Oe.setEvtMng(this, p, f), a.setEvtMng(this), p.setFire((c, u) => this.#r.fire(c, u)), J.isDbg) {
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
    be(`
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
`);
    for (const c of Array.from(document.getElementsByClassName("sn_hint"))) c.parentElement?.removeChild(c);
    at.cvs.parentElement?.insertAdjacentHTML("beforeend", `
<div class="sn_hint" role="tooltip">
	<span>Dummy</span>
	<div class="sn_hint_ar" data-popper-arrow></div>
</div>`), this.#n = document.querySelector(".sn_hint"), this.#l = this.#n.querySelector("span"), this.#p = Lr(this.#v, this.#n), this.#n.hidden = !0, n.stage.interactive = !0, J.isMobile ? n.stage.on("pointerdown", (c) => this.#r.fire("click", c)) : this.#e.add(n.stage, "pointerdown", (c) => {
      switch (c.data.button) {
        case 0:
          this.#r.fire("click", c);
          break;
        case 1:
          this.#r.fire("middleclick", c);
          break;
      }
    }), this.#e.add(window, "keydown", (c) => this.#a(c)), this.#e.add(at.cvs, "contextmenu", (c) => this.#o(c));
    const l = () => s.setVal_Nochk("tmp", "const.sn.navigator.language", navigator.language);
    this.#e.add(window, "languagechange", (c) => {
      l(), this.#r.fire("sn:chgNavLang", c), we();
    }), l();
    const h = (c) => {
      J.isDarkMode = c.matches, s.setVal_Nochk("tmp", "const.sn.isDarkMode", J.isDarkMode);
    }, m = globalThis.matchMedia("(prefers-color-scheme: dark)");
    h(m), this.#e.add(m, "change", (c) => {
      h(c), this.#r.fire("sn:chgDarkMode", c);
    });
    let d = (c, u) => {
    };
    "WheelEvent" in window && (this.#e.add(at.cvs, "wheel", (c) => this.#d(c), { passive: !0 }), this.#s = (c) => this.#e.add(c, "wheel", (u) => this.#d(u), { passive: !0 }), d = (c, u) => c.add(at.cvs, "wheel", (v) => {
      v.isComposing || v.deltaY <= 0 || (v.stopPropagation(), u());
    })), $.init((c) => {
      this.#r?.destroy(), this.#r = c;
    }, i, s, a, f, o, e, this.#t, d, this.#n, t), import("./gamepad.js").then((c) => c.g).then(({ GamepadListener: c }) => {
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
        (!x || x instanceof ft ? globalThis : x).dispatchEvent(new KeyboardEvent("keydown", { key: b, bubbles: !0 })), !(!x || x instanceof ft) && x.getAttribute("type") === "range" && x.dispatchEvent(new InputEvent("input", { bubbles: !0 }));
      }), u.on("gamepad:button", (g) => {
        if (document.hasFocus())
          if (g.detail.button % 2 === 0) {
            const O = this.#t.getFocus();
            (!O || O instanceof ft ? globalThis : O).dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: !0 }));
          } else at.cvs.dispatchEvent(new Event("contextmenu"));
      }), u.start();
    }), this.#e.add(window, "keyup", (c) => {
      c.isComposing || c.key in this.#i && (this.#i[c.key] = 0);
    }), s.defTmp("const.sn.key.alternate", () => this.#i.Alt > 0), s.defTmp("const.sn.key.command", () => this.#i.Meta > 0), s.defTmp("const.sn.key.control", () => this.#i.Control > 0), s.defTmp("const.sn.key.end", () => this.#i.End > 0), s.defTmp("const.sn.key.escape", () => this.#i.Escape > 0), s.defTmp("const.sn.key.back", () => this.#i.GoBack > 0);
  }
  #e = new ne();
  #t = new Ee();
  #r;
  resvFlameEvent(t) {
    this.#e.add(t, "keydown", (e) => this.#a(e)), this.#e.add(t, "contextmenu", (e) => this.#o(e)), this.#s(t);
  }
  #s = (t) => {
  };
  #a(t) {
    t.isComposing || (t.key in this.#i && (this.#i[t.key] = t.repeat ? 2 : 1), this.#r.fire(xe.modKey(t) + t.key, t));
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
    this.#r.destroy(), this.#t.destroy(), this.#e.clear();
  }
  fire(t, e) {
    this.#r.fire(t, e);
  }
  popLocalEvts() {
    return $.popLocalEvts();
  }
  pushLocalEvts(t) {
    $.pushLocalEvts(t);
  }
  unButton(t) {
    this.#t.remove(t);
  }
  button(t, e, n, i, a) {
    !t.fn && !t.label && !t.url && this.main.errScript("fnまたはlabelまたはurlは必須です"), t.fn ??= this.scrItr.scriptFn, e.interactive = !0, e.cursor = "pointer";
    const s = t.key?.toLowerCase() ?? " ", o = K(t, "global", !1);
    $.setEvt2Fnc(o, s, () => this.main.resumeByJumpOrCall(t)), e.on("pointerdown", (h) => this.#r.fire(s, h));
    const f = t.hint ? () => this.#g(t, e) : () => {
    }, p = () => {
      n(), this.#n.hidden = !0;
    }, l = () => (f(), i());
    if (e.on("pointerover", l), e.on("pointerout", () => {
      this.#t.isFocus(e) ? l() : p();
    }), e.on("pointerdown", () => {
      this.#n.hidden = !0;
      const h = this.#t.getFocus();
      a(), h instanceof Xt && h.normal();
    }), e.on(
      "pointerup",
      J.isMobile ? p : () => {
        this.#t.isFocus(e) ? l() : p();
      }
    ), this.#t.add(e, l, p), t.clickse && (t.clicksebuf ??= "SYS", this.cfg.searchPath(t.clickse, Pt.SOUND), e.on("pointerdown", () => {
      this.hTag.playse({ fn: t.clickse, buf: t.clicksebuf, join: !1 });
    })), t.enterse && (t.entersebuf ??= "SYS", this.cfg.searchPath(t.enterse, Pt.SOUND), e.on("pointerover", () => {
      this.hTag.playse({ fn: t.enterse, buf: t.entersebuf, join: !1 });
    })), t.leavese && (t.leavesebuf ??= "SYS", this.cfg.searchPath(t.leavese, Pt.SOUND), e.on("pointerout", () => {
      this.hTag.playse({ fn: t.leavese, buf: t.leavesebuf, join: !1 });
    })), t.onenter) {
      const h = s + t.onenter.toLowerCase(), m = { fn: t.fn, label: t.onenter, call: !0, key: h };
      $.setEvt2Fnc(o, h, () => this.main.resumeByJumpOrCall(m)), e.on("pointerover", (d) => this.#r.fire(h, d));
    }
    if (t.onleave) {
      const h = s + t.onleave.toLowerCase(), m = { fn: t.fn, label: t.onleave, call: !0, key: h };
      $.setEvt2Fnc(o, h, () => this.main.resumeByJumpOrCall(m)), e.on("pointerout", (d) => this.#r.fire(h, d));
    }
  }
  #v = {
    getBoundingClientRect: (t = 0, e = 0) => DOMRect.fromRect({ x: t, y: e, width: 0, height: 0 })
  };
  #n;
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
    const n = e instanceof Xt ? e.getBtnBounds() : e.getBounds();
    if (!(t[":タグ名"] === "link")) {
      const a = e.parent.parent;
      n.x += a.x, n.y += a.y;
    }
    if (!t.hint) {
      this.#n.hidden = !0;
      return;
    }
    this.#n.style.cssText = `position:${this.#n.style.position}; transform:${this.#n.style.transform};` + (t.hint_style ?? ""), this.#l.style.cssText = "", this.#l.textContent = t.hint ?? "";
    try {
      const a = t.hint_opt ? { ...this.#m, ...JSON.parse(t.hint_opt) } : this.#m;
      this.#p.setOptions(a);
    } catch (a) {
      console.error(ke(
        t,
        "hint_opt",
        `dispHint 引数 hint_opt エラー ${a instanceof SyntaxError ? a.message : ""}`
      ));
    }
    this.#v.getBoundingClientRect = () => DOMRect.fromRect({
      x: this.sys.ofsLeft4elm + n.x * this.sys.cvsScale,
      y: this.sys.ofsTop4elm + n.y * this.sys.cvsScale,
      width: n.width,
      height: n.height
    }), this.#p.update(), this.#n.hidden = !1;
  }
  hideHint() {
    this.#n.hidden = !0;
  }
  cvsResize() {
    this.hideHint();
  }
  #b(t) {
    const e = t.key;
    if (!e) throw "keyは必須です";
    const n = e.toLowerCase(), i = K(t, "call", !1), a = K(t, "global", !1);
    if (K(t, "del", !1)) {
      if (t.fn || t.label || i || t.url) throw "fn/label/callとdelは同時指定できません";
      return $.clear_eventer(e, a, n), !1;
    }
    if (!t.fn && !t.label && !t.url) throw "fn,label,url いずれかは必須です";
    if (t.fn ??= this.scrItr.scriptFn, e.startsWith("dom=")) {
      const s = $.getHtmlElmList(e);
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
    return $.setEvt2Fnc(a, n, () => this.main.resumeByJumpOrCall(t)), !1;
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
    const { add: e, del: n, to: i } = t;
    if (e?.startsWith("dom=")) {
      const a = $.getHtmlElmList(e);
      if (a.el.length === 0 && K(t, "need_err", !0)) throw `HTML内にセレクタ（${a.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
      return a.el.forEach((s) => this.#t.add(
        s,
        () => this.#y(s) ? (s.focus(), !0) : !1,
        () => {
        }
      )), !1;
    }
    if (n?.startsWith("dom=")) {
      const a = $.getHtmlElmList(n);
      if (a.el.length === 0 && K(t, "need_err", !0)) throw `HTML内にセレクタ（${a.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
      return a.el.forEach((s) => this.#t.remove(s)), !1;
    }
    if (!i) throw "[set_focus] add か to は必須です";
    switch (i) {
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
  waitEvent = (t, e, n) => this.#r.waitEvent(t, e, n);
  breakEvent(t) {
    this.#r.breakEvent(t);
  }
  // キー押下によるスキップ中か
  get isSkipping() {
    return this.#r.isSkipping ? !0 : Object.keys(this.#i).some((t) => this.#i[t] === 2);
  }
  // 0:no push  1:one push  2:push repeating
  #i = {
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
