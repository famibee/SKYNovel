import { E as it, C as fe, c as ee, d as wt, e as xt, S as Ot, a as J, f as Te, m as kt } from "./app2.js";
import { T as Et, B as Ke } from "./LayerMng.js";
import { R as W, a as D } from "./Reading.js";
class Ct {
  #t = [];
  #e = -1;
  #o = new it();
  destroy() {
    this.#t = [], this.#e = -1, this.#o.clear();
  }
  add(e, t, n) {
    if (this.#t.findIndex((o) => o.btn === e) >= 0) return;
    if (e instanceof fe) {
      e.on("pointerdown", () => {
        for (let o = this.#t.length - 1; o >= 0; --o)
          if (this.#t[o].btn === e) {
            this.#e = o;
            return;
          }
        this.#e = -1;
      }), this.#t.push({ btn: e, on: t, off: n });
      return;
    }
    this.#o.add(e, "focus", () => {
      for (let o = this.#t.length - 1; o >= 0; --o)
        if (this.#t[o].btn === e) {
          this.#e = o;
          return;
        }
      this.#e = -1;
    });
    let i = (o) => {
    }, a = e.localName === "button" || e.localName === "a" ? (o) => !o.isTrusted && o.key === "Enter" : (o) => o.key === "Enter";
    const s = e;
    switch (s.type ?? "") {
      //	switch (btn.getAttribute('type') ?? '') {	// textareaで''になる
      case "checkbox":
        i = () => s.checked = !s.checked;
        break;
      case "":
        e.querySelectorAll("input[type]").length > 0 && (i = (o) => this.#s(e, o.key), a = () => !1);
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
    this.#o.add(e, "keydown", (o) => {
      if (!(o.key !== "ArrowUp" && o.key !== "ArrowDown" && o.key !== "Enter")) {
        if (o.stopPropagation(), o.stopImmediatePropagation(), a(o)) {
          e.dispatchEvent(new MouseEvent("click"));
          return;
        }
        i(o);
      }
    }, { passive: !0 }), e.hasAttribute("tabindex") || (e.tabIndex = 0), this.#t.push({ btn: e, on: t, off: n });
  }
  remove(e) {
    const t = this.#t.findIndex((n) => n.btn === e);
    t < 0 || (this.#t.splice(t, 1), this.#t.length === 0 ? this.#e = -1 : t <= this.#e && --this.#e);
  }
  #s(e, t) {
    const n = e.querySelectorAll("input[type]"), i = n.length;
    for (let a = 0; a < i; ++a)
      if (n[a].checked) {
        n[(a + i + (t === "ArrowUp" ? -1 : 1)) % i].checked = !0;
        break;
      }
  }
  isFocus(e) {
    return this.#e < 0 ? !1 : this.#t[this.#e].btn === e;
  }
  prev() {
    this.#i();
    const e = this.#t.length;
    if (e !== 0) {
      --this.#e < 0 && (this.#e = e - 1);
      for (let t = e; t >= 1; --t) {
        const n = (this.#e + t) % e;
        if (this.#t[n].on()) {
          this.#e = n, this.#a(n);
          return;
        }
      }
      this.#e = -1;
    }
  }
  next() {
    this.#i();
    const e = this.#t.length;
    if (e !== 0) {
      ++this.#e >= e && (this.#e = 0);
      for (let t = 0; t < e; ++t) {
        const n = (this.#e + t) % e;
        if (this.#t[n].on()) {
          this.#e = n, this.#a(n);
          return;
        }
      }
      this.#e = -1;
    }
  }
  #a = ee.debugLog ? (e) => console.log(`👾 <FocusMng idx:${e} btn:%o`, this.#t[e].btn) : () => {
  };
  getFocus() {
    if (this.#e < 0) return null;
    this.#i(), this.#e >= this.#t.length && (this.#e = 0);
    const e = this.#t[this.#e];
    return e.on() ? e.btn : null;
  }
  blur() {
    this.#i(), this.#e = -1, globalThis.focus();
  }
  #i() {
    for (let e = this.#t.length - 1; e >= 0; --e) {
      const t = this.#t[e];
      !(t.btn instanceof fe) || t.btn.parent ? t.off() : this.#t.splice(e, 1);
    }
  }
}
var _ = "top", j = "bottom", H = "right", R = "left", Re = "auto", de = [_, j, H, R], te = "start", pe = "end", Dt = "clippingParents", ot = "viewport", se = "popper", St = "reference", Xe = /* @__PURE__ */ de.reduce(function(r, e) {
  return r.concat([e + "-" + te, e + "-" + pe]);
}, []), at = /* @__PURE__ */ [].concat(de, [Re]).reduce(function(r, e) {
  return r.concat([e, e + "-" + te, e + "-" + pe]);
}, []), Tt = "beforeRead", Pt = "read", _t = "afterRead", Rt = "beforeMain", Mt = "main", $t = "afterMain", Lt = "beforeWrite", jt = "write", Ht = "afterWrite", Bt = [Tt, Pt, _t, Rt, Mt, $t, Lt, jt, Ht];
function A(r) {
  return r ? (r.nodeName || "").toLowerCase() : null;
}
function $(r) {
  if (r == null)
    return window;
  if (r.toString() !== "[object Window]") {
    var e = r.ownerDocument;
    return e && e.defaultView || window;
  }
  return r;
}
function Z(r) {
  var e = $(r).Element;
  return r instanceof e || r instanceof Element;
}
function L(r) {
  var e = $(r).HTMLElement;
  return r instanceof e || r instanceof HTMLElement;
}
function Me(r) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = $(r).ShadowRoot;
  return r instanceof e || r instanceof ShadowRoot;
}
function Ft(r) {
  var e = r.state;
  Object.keys(e.elements).forEach(function(t) {
    var n = e.styles[t] || {}, i = e.attributes[t] || {}, a = e.elements[t];
    !L(a) || !A(a) || (Object.assign(a.style, n), Object.keys(i).forEach(function(s) {
      var o = i[s];
      o === !1 ? a.removeAttribute(s) : a.setAttribute(s, o === !0 ? "" : o);
    }));
  });
}
function Wt(r) {
  var e = r.state, t = {
    popper: {
      position: e.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(e.elements.popper.style, t.popper), e.styles = t, e.elements.arrow && Object.assign(e.elements.arrow.style, t.arrow), function() {
    Object.keys(e.elements).forEach(function(n) {
      var i = e.elements[n], a = e.attributes[n] || {}, s = Object.keys(e.styles.hasOwnProperty(n) ? e.styles[n] : t[n]), o = s.reduce(function(f, p) {
        return f[p] = "", f;
      }, {});
      !L(i) || !A(i) || (Object.assign(i.style, o), Object.keys(a).forEach(function(f) {
        i.removeAttribute(f);
      }));
    });
  };
}
const Nt = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Ft,
  effect: Wt,
  requires: ["computeStyles"]
};
function N(r) {
  return r.split("-")[0];
}
var G = Math.max, Oe = Math.min, re = Math.round;
function Pe() {
  var r = navigator.userAgentData;
  return r != null && r.brands && Array.isArray(r.brands) ? r.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function st() {
  return !/^((?!chrome|android).)*safari/i.test(Pe());
}
function ne(r, e, t) {
  e === void 0 && (e = !1), t === void 0 && (t = !1);
  var n = r.getBoundingClientRect(), i = 1, a = 1;
  e && L(r) && (i = r.offsetWidth > 0 && re(n.width) / r.offsetWidth || 1, a = r.offsetHeight > 0 && re(n.height) / r.offsetHeight || 1);
  var s = Z(r) ? $(r) : window, o = s.visualViewport, f = !st() && t, p = (n.left + (f && o ? o.offsetLeft : 0)) / i, c = (n.top + (f && o ? o.offsetTop : 0)) / a, h = n.width / i, m = n.height / a;
  return {
    width: h,
    height: m,
    top: c,
    right: p + h,
    bottom: c + m,
    left: p,
    x: p,
    y: c
  };
}
function $e(r) {
  var e = ne(r), t = r.offsetWidth, n = r.offsetHeight;
  return Math.abs(e.width - t) <= 1 && (t = e.width), Math.abs(e.height - n) <= 1 && (n = e.height), {
    x: r.offsetLeft,
    y: r.offsetTop,
    width: t,
    height: n
  };
}
function ft(r, e) {
  var t = e.getRootNode && e.getRootNode();
  if (r.contains(e))
    return !0;
  if (t && Me(t)) {
    var n = e;
    do {
      if (n && r.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function V(r) {
  return $(r).getComputedStyle(r);
}
function At(r) {
  return ["table", "td", "th"].indexOf(A(r)) >= 0;
}
function U(r) {
  return ((Z(r) ? r.ownerDocument : (
    // $FlowFixMe[prop-missing]
    r.document
  )) || window.document).documentElement;
}
function ke(r) {
  return A(r) === "html" ? r : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    r.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    r.parentNode || // DOM Element detected
    (Me(r) ? r.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    U(r)
  );
}
function ze(r) {
  return !L(r) || // https://github.com/popperjs/popper-core/issues/837
  V(r).position === "fixed" ? null : r.offsetParent;
}
function Vt(r) {
  var e = /firefox/i.test(Pe()), t = /Trident/i.test(Pe());
  if (t && L(r)) {
    var n = V(r);
    if (n.position === "fixed")
      return null;
  }
  var i = ke(r);
  for (Me(i) && (i = i.host); L(i) && ["html", "body"].indexOf(A(i)) < 0; ) {
    var a = V(i);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || e && a.willChange === "filter" || e && a.filter && a.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function he(r) {
  for (var e = $(r), t = ze(r); t && At(t) && V(t).position === "static"; )
    t = ze(t);
  return t && (A(t) === "html" || A(t) === "body" && V(t).position === "static") ? e : t || Vt(r) || e;
}
function Le(r) {
  return ["top", "bottom"].indexOf(r) >= 0 ? "x" : "y";
}
function ce(r, e, t) {
  return G(r, Oe(e, t));
}
function qt(r, e, t) {
  var n = ce(r, e, t);
  return n > t ? t : n;
}
function ct() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function lt(r) {
  return Object.assign({}, ct(), r);
}
function pt(r, e) {
  return e.reduce(function(t, n) {
    return t[n] = r, t;
  }, {});
}
var Ut = function(e, t) {
  return e = typeof e == "function" ? e(Object.assign({}, t.rects, {
    placement: t.placement
  })) : e, lt(typeof e != "number" ? e : pt(e, de));
};
function It(r) {
  var e, t = r.state, n = r.name, i = r.options, a = t.elements.arrow, s = t.modifiersData.popperOffsets, o = N(t.placement), f = Le(o), p = [R, H].indexOf(o) >= 0, c = p ? "height" : "width";
  if (!(!a || !s)) {
    var h = Ut(i.padding, t), m = $e(a), d = f === "y" ? _ : R, x = f === "y" ? j : H, l = t.rects.reference[c] + t.rects.reference[f] - s[f] - t.rects.popper[c], u = s[f] - t.rects.reference[f], g = he(a), E = g ? f === "y" ? g.clientHeight || 0 : g.clientWidth || 0 : 0, y = l / 2 - u / 2, v = h[d], b = E - m[c] - h[x], w = E / 2 - m[c] / 2 + y, O = ce(v, w, b), k = f;
    t.modifiersData[n] = (e = {}, e[k] = O, e.centerOffset = O - w, e);
  }
}
function Yt(r) {
  var e = r.state, t = r.options, n = t.element, i = n === void 0 ? "[data-popper-arrow]" : n;
  i != null && (typeof i == "string" && (i = e.elements.popper.querySelector(i), !i) || ft(e.elements.popper, i) && (e.elements.arrow = i));
}
const Kt = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: It,
  effect: Yt,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function ie(r) {
  return r.split("-")[1];
}
var Xt = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function zt(r, e) {
  var t = r.x, n = r.y, i = e.devicePixelRatio || 1;
  return {
    x: re(t * i) / i || 0,
    y: re(n * i) / i || 0
  };
}
function Je(r) {
  var e, t = r.popper, n = r.popperRect, i = r.placement, a = r.variation, s = r.offsets, o = r.position, f = r.gpuAcceleration, p = r.adaptive, c = r.roundOffsets, h = r.isFixed, m = s.x, d = m === void 0 ? 0 : m, x = s.y, l = x === void 0 ? 0 : x, u = typeof c == "function" ? c({
    x: d,
    y: l
  }) : {
    x: d,
    y: l
  };
  d = u.x, l = u.y;
  var g = s.hasOwnProperty("x"), E = s.hasOwnProperty("y"), y = R, v = _, b = window;
  if (p) {
    var w = he(t), O = "clientHeight", k = "clientWidth";
    if (w === $(t) && (w = U(t), V(w).position !== "static" && o === "absolute" && (O = "scrollHeight", k = "scrollWidth")), w = w, i === _ || (i === R || i === H) && a === pe) {
      v = j;
      var S = h && w === b && b.visualViewport ? b.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        w[O]
      );
      l -= S - n.height, l *= f ? 1 : -1;
    }
    if (i === R || (i === _ || i === j) && a === pe) {
      y = H;
      var C = h && w === b && b.visualViewport ? b.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        w[k]
      );
      d -= C - n.width, d *= f ? 1 : -1;
    }
  }
  var T = Object.assign({
    position: o
  }, p && Xt), B = c === !0 ? zt({
    x: d,
    y: l
  }, $(t)) : {
    x: d,
    y: l
  };
  if (d = B.x, l = B.y, f) {
    var P;
    return Object.assign({}, T, (P = {}, P[v] = E ? "0" : "", P[y] = g ? "0" : "", P.transform = (b.devicePixelRatio || 1) <= 1 ? "translate(" + d + "px, " + l + "px)" : "translate3d(" + d + "px, " + l + "px, 0)", P));
  }
  return Object.assign({}, T, (e = {}, e[v] = E ? l + "px" : "", e[y] = g ? d + "px" : "", e.transform = "", e));
}
function Jt(r) {
  var e = r.state, t = r.options, n = t.gpuAcceleration, i = n === void 0 ? !0 : n, a = t.adaptive, s = a === void 0 ? !0 : a, o = t.roundOffsets, f = o === void 0 ? !0 : o, p = {
    placement: N(e.placement),
    variation: ie(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: i,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, Je(Object.assign({}, p, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: s,
    roundOffsets: f
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, Je(Object.assign({}, p, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: f
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const Gt = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Jt,
  data: {}
};
var we = {
  passive: !0
};
function Zt(r) {
  var e = r.state, t = r.instance, n = r.options, i = n.scroll, a = i === void 0 ? !0 : i, s = n.resize, o = s === void 0 ? !0 : s, f = $(e.elements.popper), p = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return a && p.forEach(function(c) {
    c.addEventListener("scroll", t.update, we);
  }), o && f.addEventListener("resize", t.update, we), function() {
    a && p.forEach(function(c) {
      c.removeEventListener("scroll", t.update, we);
    }), o && f.removeEventListener("resize", t.update, we);
  };
}
const Qt = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Zt,
  data: {}
};
var er = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function xe(r) {
  return r.replace(/left|right|bottom|top/g, function(e) {
    return er[e];
  });
}
var tr = {
  start: "end",
  end: "start"
};
function Ge(r) {
  return r.replace(/start|end/g, function(e) {
    return tr[e];
  });
}
function je(r) {
  var e = $(r), t = e.pageXOffset, n = e.pageYOffset;
  return {
    scrollLeft: t,
    scrollTop: n
  };
}
function He(r) {
  return ne(U(r)).left + je(r).scrollLeft;
}
function rr(r, e) {
  var t = $(r), n = U(r), i = t.visualViewport, a = n.clientWidth, s = n.clientHeight, o = 0, f = 0;
  if (i) {
    a = i.width, s = i.height;
    var p = st();
    (p || !p && e === "fixed") && (o = i.offsetLeft, f = i.offsetTop);
  }
  return {
    width: a,
    height: s,
    x: o + He(r),
    y: f
  };
}
function nr(r) {
  var e, t = U(r), n = je(r), i = (e = r.ownerDocument) == null ? void 0 : e.body, a = G(t.scrollWidth, t.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), s = G(t.scrollHeight, t.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), o = -n.scrollLeft + He(r), f = -n.scrollTop;
  return V(i || t).direction === "rtl" && (o += G(t.clientWidth, i ? i.clientWidth : 0) - a), {
    width: a,
    height: s,
    x: o,
    y: f
  };
}
function Be(r) {
  var e = V(r), t = e.overflow, n = e.overflowX, i = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(t + i + n);
}
function ut(r) {
  return ["html", "body", "#document"].indexOf(A(r)) >= 0 ? r.ownerDocument.body : L(r) && Be(r) ? r : ut(ke(r));
}
function le(r, e) {
  var t;
  e === void 0 && (e = []);
  var n = ut(r), i = n === ((t = r.ownerDocument) == null ? void 0 : t.body), a = $(n), s = i ? [a].concat(a.visualViewport || [], Be(n) ? n : []) : n, o = e.concat(s);
  return i ? o : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    o.concat(le(ke(s)))
  );
}
function _e(r) {
  return Object.assign({}, r, {
    left: r.x,
    top: r.y,
    right: r.x + r.width,
    bottom: r.y + r.height
  });
}
function ir(r, e) {
  var t = ne(r, !1, e === "fixed");
  return t.top = t.top + r.clientTop, t.left = t.left + r.clientLeft, t.bottom = t.top + r.clientHeight, t.right = t.left + r.clientWidth, t.width = r.clientWidth, t.height = r.clientHeight, t.x = t.left, t.y = t.top, t;
}
function Ze(r, e, t) {
  return e === ot ? _e(rr(r, t)) : Z(e) ? ir(e, t) : _e(nr(U(r)));
}
function or(r) {
  var e = le(ke(r)), t = ["absolute", "fixed"].indexOf(V(r).position) >= 0, n = t && L(r) ? he(r) : r;
  return Z(n) ? e.filter(function(i) {
    return Z(i) && ft(i, n) && A(i) !== "body";
  }) : [];
}
function ar(r, e, t, n) {
  var i = e === "clippingParents" ? or(r) : [].concat(e), a = [].concat(i, [t]), s = a[0], o = a.reduce(function(f, p) {
    var c = Ze(r, p, n);
    return f.top = G(c.top, f.top), f.right = Oe(c.right, f.right), f.bottom = Oe(c.bottom, f.bottom), f.left = G(c.left, f.left), f;
  }, Ze(r, s, n));
  return o.width = o.right - o.left, o.height = o.bottom - o.top, o.x = o.left, o.y = o.top, o;
}
function dt(r) {
  var e = r.reference, t = r.element, n = r.placement, i = n ? N(n) : null, a = n ? ie(n) : null, s = e.x + e.width / 2 - t.width / 2, o = e.y + e.height / 2 - t.height / 2, f;
  switch (i) {
    case _:
      f = {
        x: s,
        y: e.y - t.height
      };
      break;
    case j:
      f = {
        x: s,
        y: e.y + e.height
      };
      break;
    case H:
      f = {
        x: e.x + e.width,
        y: o
      };
      break;
    case R:
      f = {
        x: e.x - t.width,
        y: o
      };
      break;
    default:
      f = {
        x: e.x,
        y: e.y
      };
  }
  var p = i ? Le(i) : null;
  if (p != null) {
    var c = p === "y" ? "height" : "width";
    switch (a) {
      case te:
        f[p] = f[p] - (e[c] / 2 - t[c] / 2);
        break;
      case pe:
        f[p] = f[p] + (e[c] / 2 - t[c] / 2);
        break;
    }
  }
  return f;
}
function ue(r, e) {
  e === void 0 && (e = {});
  var t = e, n = t.placement, i = n === void 0 ? r.placement : n, a = t.strategy, s = a === void 0 ? r.strategy : a, o = t.boundary, f = o === void 0 ? Dt : o, p = t.rootBoundary, c = p === void 0 ? ot : p, h = t.elementContext, m = h === void 0 ? se : h, d = t.altBoundary, x = d === void 0 ? !1 : d, l = t.padding, u = l === void 0 ? 0 : l, g = lt(typeof u != "number" ? u : pt(u, de)), E = m === se ? St : se, y = r.rects.popper, v = r.elements[x ? E : m], b = ar(Z(v) ? v : v.contextElement || U(r.elements.popper), f, c, s), w = ne(r.elements.reference), O = dt({
    reference: w,
    element: y,
    placement: i
  }), k = _e(Object.assign({}, y, O)), S = m === se ? k : w, C = {
    top: b.top - S.top + g.top,
    bottom: S.bottom - b.bottom + g.bottom,
    left: b.left - S.left + g.left,
    right: S.right - b.right + g.right
  }, T = r.modifiersData.offset;
  if (m === se && T) {
    var B = T[i];
    Object.keys(C).forEach(function(P) {
      var I = [H, j].indexOf(P) >= 0 ? 1 : -1, Y = [_, j].indexOf(P) >= 0 ? "y" : "x";
      C[P] += B[Y] * I;
    });
  }
  return C;
}
function sr(r, e) {
  e === void 0 && (e = {});
  var t = e, n = t.placement, i = t.boundary, a = t.rootBoundary, s = t.padding, o = t.flipVariations, f = t.allowedAutoPlacements, p = f === void 0 ? at : f, c = ie(n), h = c ? o ? Xe : Xe.filter(function(x) {
    return ie(x) === c;
  }) : de, m = h.filter(function(x) {
    return p.indexOf(x) >= 0;
  });
  m.length === 0 && (m = h);
  var d = m.reduce(function(x, l) {
    return x[l] = ue(r, {
      placement: l,
      boundary: i,
      rootBoundary: a,
      padding: s
    })[N(l)], x;
  }, {});
  return Object.keys(d).sort(function(x, l) {
    return d[x] - d[l];
  });
}
function fr(r) {
  if (N(r) === Re)
    return [];
  var e = xe(r);
  return [Ge(r), e, Ge(e)];
}
function cr(r) {
  var e = r.state, t = r.options, n = r.name;
  if (!e.modifiersData[n]._skip) {
    for (var i = t.mainAxis, a = i === void 0 ? !0 : i, s = t.altAxis, o = s === void 0 ? !0 : s, f = t.fallbackPlacements, p = t.padding, c = t.boundary, h = t.rootBoundary, m = t.altBoundary, d = t.flipVariations, x = d === void 0 ? !0 : d, l = t.allowedAutoPlacements, u = e.options.placement, g = N(u), E = g === u, y = f || (E || !x ? [xe(u)] : fr(u)), v = [u].concat(y).reduce(function(Q, q) {
      return Q.concat(N(q) === Re ? sr(e, {
        placement: q,
        boundary: c,
        rootBoundary: h,
        padding: p,
        flipVariations: x,
        allowedAutoPlacements: l
      }) : q);
    }, []), b = e.rects.reference, w = e.rects.popper, O = /* @__PURE__ */ new Map(), k = !0, S = v[0], C = 0; C < v.length; C++) {
      var T = v[C], B = N(T), P = ie(T) === te, I = [_, j].indexOf(B) >= 0, Y = I ? "width" : "height", M = ue(e, {
        placement: T,
        boundary: c,
        rootBoundary: h,
        altBoundary: m,
        padding: p
      }), F = I ? P ? H : R : P ? j : _;
      b[Y] > w[Y] && (F = xe(F));
      var ve = xe(F), K = [];
      if (a && K.push(M[B] <= 0), o && K.push(M[F] <= 0, M[ve] <= 0), K.every(function(Q) {
        return Q;
      })) {
        S = T, k = !1;
        break;
      }
      O.set(T, K);
    }
    if (k)
      for (var me = x ? 3 : 1, Ee = function(q) {
        var ae = v.find(function(ge) {
          var X = O.get(ge);
          if (X)
            return X.slice(0, q).every(function(Ce) {
              return Ce;
            });
        });
        if (ae)
          return S = ae, "break";
      }, oe = me; oe > 0; oe--) {
        var ye = Ee(oe);
        if (ye === "break") break;
      }
    e.placement !== S && (e.modifiersData[n]._skip = !0, e.placement = S, e.reset = !0);
  }
}
const lr = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: cr,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Qe(r, e, t) {
  return t === void 0 && (t = {
    x: 0,
    y: 0
  }), {
    top: r.top - e.height - t.y,
    right: r.right - e.width + t.x,
    bottom: r.bottom - e.height + t.y,
    left: r.left - e.width - t.x
  };
}
function et(r) {
  return [_, H, j, R].some(function(e) {
    return r[e] >= 0;
  });
}
function pr(r) {
  var e = r.state, t = r.name, n = e.rects.reference, i = e.rects.popper, a = e.modifiersData.preventOverflow, s = ue(e, {
    elementContext: "reference"
  }), o = ue(e, {
    altBoundary: !0
  }), f = Qe(s, n), p = Qe(o, i, a), c = et(f), h = et(p);
  e.modifiersData[t] = {
    referenceClippingOffsets: f,
    popperEscapeOffsets: p,
    isReferenceHidden: c,
    hasPopperEscaped: h
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": c,
    "data-popper-escaped": h
  });
}
const ur = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: pr
};
function dr(r, e, t) {
  var n = N(r), i = [R, _].indexOf(n) >= 0 ? -1 : 1, a = typeof t == "function" ? t(Object.assign({}, e, {
    placement: r
  })) : t, s = a[0], o = a[1];
  return s = s || 0, o = (o || 0) * i, [R, H].indexOf(n) >= 0 ? {
    x: o,
    y: s
  } : {
    x: s,
    y: o
  };
}
function hr(r) {
  var e = r.state, t = r.options, n = r.name, i = t.offset, a = i === void 0 ? [0, 0] : i, s = at.reduce(function(c, h) {
    return c[h] = dr(h, e.rects, a), c;
  }, {}), o = s[e.placement], f = o.x, p = o.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += f, e.modifiersData.popperOffsets.y += p), e.modifiersData[n] = s;
}
const vr = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: hr
};
function mr(r) {
  var e = r.state, t = r.name;
  e.modifiersData[t] = dt({
    reference: e.rects.reference,
    element: e.rects.popper,
    placement: e.placement
  });
}
const yr = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: mr,
  data: {}
};
function gr(r) {
  return r === "x" ? "y" : "x";
}
function br(r) {
  var e = r.state, t = r.options, n = r.name, i = t.mainAxis, a = i === void 0 ? !0 : i, s = t.altAxis, o = s === void 0 ? !1 : s, f = t.boundary, p = t.rootBoundary, c = t.altBoundary, h = t.padding, m = t.tether, d = m === void 0 ? !0 : m, x = t.tetherOffset, l = x === void 0 ? 0 : x, u = ue(e, {
    boundary: f,
    rootBoundary: p,
    padding: h,
    altBoundary: c
  }), g = N(e.placement), E = ie(e.placement), y = !E, v = Le(g), b = gr(v), w = e.modifiersData.popperOffsets, O = e.rects.reference, k = e.rects.popper, S = typeof l == "function" ? l(Object.assign({}, e.rects, {
    placement: e.placement
  })) : l, C = typeof S == "number" ? {
    mainAxis: S,
    altAxis: S
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, S), T = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, B = {
    x: 0,
    y: 0
  };
  if (w) {
    if (a) {
      var P, I = v === "y" ? _ : R, Y = v === "y" ? j : H, M = v === "y" ? "height" : "width", F = w[v], ve = F + u[I], K = F - u[Y], me = d ? -k[M] / 2 : 0, Ee = E === te ? O[M] : k[M], oe = E === te ? -k[M] : -O[M], ye = e.elements.arrow, Q = d && ye ? $e(ye) : {
        width: 0,
        height: 0
      }, q = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : ct(), ae = q[I], ge = q[Y], X = ce(0, O[M], Q[M]), Ce = y ? O[M] / 2 - me - X - ae - C.mainAxis : Ee - X - ae - C.mainAxis, ht = y ? -O[M] / 2 + me + X + ge + C.mainAxis : oe + X + ge + C.mainAxis, De = e.elements.arrow && he(e.elements.arrow), vt = De ? v === "y" ? De.clientTop || 0 : De.clientLeft || 0 : 0, Fe = (P = T?.[v]) != null ? P : 0, mt = F + Ce - Fe - vt, yt = F + ht - Fe, We = ce(d ? Oe(ve, mt) : ve, F, d ? G(K, yt) : K);
      w[v] = We, B[v] = We - F;
    }
    if (o) {
      var Ne, gt = v === "x" ? _ : R, bt = v === "x" ? j : H, z = w[b], be = b === "y" ? "height" : "width", Ae = z + u[gt], Ve = z - u[bt], Se = [_, R].indexOf(g) !== -1, qe = (Ne = T?.[b]) != null ? Ne : 0, Ue = Se ? Ae : z - O[be] - k[be] - qe + C.altAxis, Ie = Se ? z + O[be] + k[be] - qe - C.altAxis : Ve, Ye = d && Se ? qt(Ue, z, Ie) : ce(d ? Ue : Ae, z, d ? Ie : Ve);
      w[b] = Ye, B[b] = Ye - z;
    }
    e.modifiersData[n] = B;
  }
}
const wr = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: br,
  requiresIfExists: ["offset"]
};
function xr(r) {
  return {
    scrollLeft: r.scrollLeft,
    scrollTop: r.scrollTop
  };
}
function Or(r) {
  return r === $(r) || !L(r) ? je(r) : xr(r);
}
function kr(r) {
  var e = r.getBoundingClientRect(), t = re(e.width) / r.offsetWidth || 1, n = re(e.height) / r.offsetHeight || 1;
  return t !== 1 || n !== 1;
}
function Er(r, e, t) {
  t === void 0 && (t = !1);
  var n = L(e), i = L(e) && kr(e), a = U(e), s = ne(r, i, t), o = {
    scrollLeft: 0,
    scrollTop: 0
  }, f = {
    x: 0,
    y: 0
  };
  return (n || !n && !t) && ((A(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Be(a)) && (o = Or(e)), L(e) ? (f = ne(e, !0), f.x += e.clientLeft, f.y += e.clientTop) : a && (f.x = He(a))), {
    x: s.left + o.scrollLeft - f.x,
    y: s.top + o.scrollTop - f.y,
    width: s.width,
    height: s.height
  };
}
function Cr(r) {
  var e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set(), n = [];
  r.forEach(function(a) {
    e.set(a.name, a);
  });
  function i(a) {
    t.add(a.name);
    var s = [].concat(a.requires || [], a.requiresIfExists || []);
    s.forEach(function(o) {
      if (!t.has(o)) {
        var f = e.get(o);
        f && i(f);
      }
    }), n.push(a);
  }
  return r.forEach(function(a) {
    t.has(a.name) || i(a);
  }), n;
}
function Dr(r) {
  var e = Cr(r);
  return Bt.reduce(function(t, n) {
    return t.concat(e.filter(function(i) {
      return i.phase === n;
    }));
  }, []);
}
function Sr(r) {
  var e;
  return function() {
    return e || (e = new Promise(function(t) {
      Promise.resolve().then(function() {
        e = void 0, t(r());
      });
    })), e;
  };
}
function Tr(r) {
  var e = r.reduce(function(t, n) {
    var i = t[n.name];
    return t[n.name] = i ? Object.assign({}, i, n, {
      options: Object.assign({}, i.options, n.options),
      data: Object.assign({}, i.data, n.data)
    }) : n, t;
  }, {});
  return Object.keys(e).map(function(t) {
    return e[t];
  });
}
var tt = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function rt() {
  for (var r = arguments.length, e = new Array(r), t = 0; t < r; t++)
    e[t] = arguments[t];
  return !e.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Pr(r) {
  r === void 0 && (r = {});
  var e = r, t = e.defaultModifiers, n = t === void 0 ? [] : t, i = e.defaultOptions, a = i === void 0 ? tt : i;
  return function(o, f, p) {
    p === void 0 && (p = a);
    var c = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, tt, a),
      modifiersData: {},
      elements: {
        reference: o,
        popper: f
      },
      attributes: {},
      styles: {}
    }, h = [], m = !1, d = {
      state: c,
      setOptions: function(g) {
        var E = typeof g == "function" ? g(c.options) : g;
        l(), c.options = Object.assign({}, a, c.options, E), c.scrollParents = {
          reference: Z(o) ? le(o) : o.contextElement ? le(o.contextElement) : [],
          popper: le(f)
        };
        var y = Dr(Tr([].concat(n, c.options.modifiers)));
        return c.orderedModifiers = y.filter(function(v) {
          return v.enabled;
        }), x(), d.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!m) {
          var g = c.elements, E = g.reference, y = g.popper;
          if (rt(E, y)) {
            c.rects = {
              reference: Er(E, he(y), c.options.strategy === "fixed"),
              popper: $e(y)
            }, c.reset = !1, c.placement = c.options.placement, c.orderedModifiers.forEach(function(C) {
              return c.modifiersData[C.name] = Object.assign({}, C.data);
            });
            for (var v = 0; v < c.orderedModifiers.length; v++) {
              if (c.reset === !0) {
                c.reset = !1, v = -1;
                continue;
              }
              var b = c.orderedModifiers[v], w = b.fn, O = b.options, k = O === void 0 ? {} : O, S = b.name;
              typeof w == "function" && (c = w({
                state: c,
                options: k,
                name: S,
                instance: d
              }) || c);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Sr(function() {
        return new Promise(function(u) {
          d.forceUpdate(), u(c);
        });
      }),
      destroy: function() {
        l(), m = !0;
      }
    };
    if (!rt(o, f))
      return d;
    d.setOptions(p).then(function(u) {
      !m && p.onFirstUpdate && p.onFirstUpdate(u);
    });
    function x() {
      c.orderedModifiers.forEach(function(u) {
        var g = u.name, E = u.options, y = E === void 0 ? {} : E, v = u.effect;
        if (typeof v == "function") {
          var b = v({
            state: c,
            name: g,
            instance: d,
            options: y
          }), w = function() {
          };
          h.push(b || w);
        }
      });
    }
    function l() {
      h.forEach(function(u) {
        return u();
      }), h = [];
    }
    return d;
  };
}
var _r = [Qt, yr, Gt, Nt, vr, lr, wr, Kt, ur], Rr = /* @__PURE__ */ Pr({
  defaultModifiers: _r
});
const nt = "pointerup";
class jr {
  constructor(e, t, n, i, a, s, o, f, p) {
    if (this.cfg = e, this.hTag = t, this.appPixi = n, this.main = i, this.layMng = a, this.val = s, this.scrItr = f, this.sys = p, t.clear_event = (l) => W.clear_event(l), t.event = (l) => this.#y(l), t.set_cancel_skip = () => !1, t.set_focus = (l) => this.#g(l), o.setEvtMng(this), f.setOtherObj(this, a), Et.setEvtMng(this, p, f), a.setEvtMng(this), D.setFcs(this.#e), p.setFire((l, u) => D.fire(l, u)), ee.isDbg) {
      const l = {
        pause: () => {
          if (!D.isWait) return;
          const u = {};
          f.recodeDesign(u), p.callHook("_enterDesign", u), p.send2Dbg("_enterDesign", u);
        }
        //				stopOnBreakpoint		: ()=> this.#isDbgBreak = true,
        //				stopOnDataBreakpoint	: ()=> this.#isDbgBreak = true,
        //				continue				: ()=> this.#isDbgBreak = false,
        //				disconnect				: ()=> this.#isDbgBreak = false,
      };
      l.attach = l.stopOnEntry = l.stopOnStep = l.stopOnStepIn = l.stopOnStepOut = l.stopOnBackstep = l.pause, p.addHook((u) => l[u]?.());
    }
    wt(`
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
</div>`), this.#r = document.querySelector(".sn_hint"), this.#l = this.#r.querySelector("span"), this.#p = Rr(this.#d, this.#r), this.#r.hidden = !0, n.stage.interactive = !0;
    const c = /* @__PURE__ */ new Map([
      [0, ""],
      [1, "middle"],
      [2, "right"]
    ]);
    this.#t.addC(n.stage, nt, (l) => {
      if (l instanceof TouchEvent) {
        D.fire("click", l);
        return;
      }
      const u = this.#a(l) + `${c.get(l.button) ?? ""}click`;
      D.fire(u, l);
    }), this.#t.add(window, "keydown", (l) => this.#s(l));
    const h = () => s.setVal_Nochk("tmp", "const.sn.navigator.language", navigator.language);
    this.#t.add(window, "languagechange", (l) => {
      h(), D.fire("sn:chgNavLang", l), xt();
    }), h();
    const m = (l) => {
      ee.isDarkMode = l.matches, s.setVal_Nochk("tmp", "const.sn.isDarkMode", ee.isDarkMode);
    }, d = globalThis.matchMedia("(prefers-color-scheme: dark)");
    m(d), this.#t.add(d, "change", (l) => {
      m(l), D.fire("sn:chgDarkMode", l);
    });
    let x = (l, u) => {
    };
    "WheelEvent" in window && (this.#t.add(i.cvs, "wheel", (l) => this.#i(l), { passive: !0 }), this.#o = (l) => this.#t.add(l, "wheel", (u) => this.#i(u), { passive: !0 }), x = (l, u) => l.add(i.cvs, "wheel", (g) => {
      g.isComposing || g.deltaY <= 0 || (g.stopPropagation(), u());
    })), D.init(e, t, i, s, f, a, this, o, x), import("./gamepad.js").then((l) => l.g).then(({ GamepadListener: l }) => {
      const u = new l({
        analog: !1,
        deadZone: 0.3
      });
      ee.debugLog && (u.on("gamepad:connected", (y) => console.log(`👺<'gamepad:connected' index:${y.detail.index} id:${y.detail.gamepad.id}`)), u.on("gamepad:disconnected", (y) => console.log(`👺<'gamepad:disconnected' index:${y.detail.index} id:${y.detail.gamepad?.id}`)));
      const g = [
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
      u.on("gamepad:axis", (y) => {
        if (!document.hasFocus()) return;
        E[y.detail.axis] = y.detail.value;
        const [v = 0, b = 0] = E, w = (b + 1) * 3 + (v + 1), O = g[w];
        if (!O) return;
        const k = this.#e.getFocus();
        (!k || k instanceof fe ? globalThis : k).dispatchEvent(new KeyboardEvent("keydown", { key: O, bubbles: !0 })), !(!k || k instanceof fe) && k.getAttribute("type") === "range" && k.dispatchEvent(new InputEvent("input", { bubbles: !0 }));
      }), u.on("gamepad:button", (y) => {
        if (document.hasFocus())
          if (y.detail.button % 2 === 0) {
            const v = this.#e.getFocus();
            (!v || v instanceof fe ? globalThis : v).dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: !0 }));
          } else D.fire("middleclick", y);
      }), u.start();
    }), this.#t.add(window, "keyup", (l) => {
      l.isComposing || l.key in this.#n && (this.#n[l.key] = 0);
    }), s.defTmp(
      "const.sn.key.alternate",
      () => this.#n.Alt > 0
      /* NO_PUSH */
    ), s.defTmp(
      "const.sn.key.command",
      () => this.#n.Meta > 0
      /* NO_PUSH */
    ), s.defTmp(
      "const.sn.key.control",
      () => this.#n.Control > 0
      /* NO_PUSH */
    ), s.defTmp(
      "const.sn.key.end",
      () => this.#n.End > 0
      /* NO_PUSH */
    ), s.defTmp(
      "const.sn.key.escape",
      () => this.#n.Escape > 0
      /* NO_PUSH */
    ), s.defTmp(
      "const.sn.key.back",
      () => this.#n.GoBack > 0
      /* NO_PUSH */
    );
  }
  #t = new it();
  #e = new Ct();
  resvFlameEvent(e) {
    this.#t.add(e, "keydown", (t) => this.#s(t)), this.#t.add(e, "contextmenu", (t) => {
      D.fire(this.#a(t) + "rightclick", t), t.preventDefault();
    }), this.#o(e);
  }
  #o = (e) => {
  };
  #s(e) {
    e.isComposing || (e.key in this.#n && (this.#n[e.key] = e.repeat ? 2 : 1), D.fire(Ot.modKey(e) + e.key, e));
  }
  #a(e) {
    return (e.altKey ? "alt+" : "") + (e.ctrlKey ? "ctrl+" : "") + (e.metaKey ? "meta+" : "") + (e.shiftKey ? "shift+" : "");
  }
  // 縦回転ホイール
  #i(e) {
    if (this.#f) {
      this.#c = !0;
      return;
    }
    this.#f = !0, this.#u();
    const t = this.#a(e) + (e.deltaY > 0 ? "downwheel" : "upwheel");
    D.fire(t, e);
  }
  #f = !1;
  #c = !1;
  #u() {
    setTimeout(() => {
      if (this.#c) {
        this.#c = !1, this.#u();
        return;
      }
      this.#f = !1;
    }, 250);
  }
  destroy() {
    for (const e of Array.from(document.getElementsByClassName("sn_hint"))) e.parentElement?.removeChild(e);
    W.destroy(), this.#e.destroy(), this.#t.clear();
  }
  fire(e, t) {
    D.fire(e, t);
  }
  unButton(e) {
    this.#e.remove(e);
  }
  button(e, t, n, i, a) {
    !e.fn && !e.label && !e.url && this.main.errScript("fnまたはlabelまたはurlは必須です"), e.fn ??= this.scrItr.scriptFn, t.interactive = !0, t.cursor = "pointer";
    const s = e.key?.toLowerCase() ?? " ", o = J(e, "global", !1);
    W.setEvt2Fnc(o, s, () => this.main.resumeByJumpOrCall(e)), t.on(nt, (h) => {
      console.log("fn:EventMng.ts line:332 BTN"), D.fire(s, h);
    });
    const f = e.hint ? () => this.#m(e, t) : () => {
    }, p = () => {
      n(), this.#r.hidden = !0;
    }, c = () => (f(), i());
    if (t.on("pointerover", c), t.on("pointerout", () => {
      this.#e.isFocus(t) ? c() : p();
    }), t.on("pointerdown", () => {
      this.#r.hidden = !0;
      const h = this.#e.getFocus();
      a(), h instanceof Ke && h.normal();
    }), t.on(
      "pointerup",
      ee.isMobile ? p : () => {
        this.#e.isFocus(t) ? c() : p();
      }
    ), this.#e.add(t, c, p), e.clickse && (e.clicksebuf ??= "SYS", this.cfg.searchPath(e.clickse, Te.SOUND), t.on("pointerdown", () => {
      this.hTag.playse({ fn: e.clickse, buf: e.clicksebuf, join: !1 });
    })), e.enterse && (e.entersebuf ??= "SYS", this.cfg.searchPath(e.enterse, Te.SOUND), t.on("pointerover", () => {
      this.hTag.playse({ fn: e.enterse, buf: e.entersebuf, join: !1 });
    })), e.leavese && (e.leavesebuf ??= "SYS", this.cfg.searchPath(e.leavese, Te.SOUND), t.on("pointerout", () => {
      this.hTag.playse({ fn: e.leavese, buf: e.leavesebuf, join: !1 });
    })), e.onenter) {
      const h = s + e.onenter.toLowerCase(), m = { fn: e.fn, label: e.onenter, call: !0, key: h };
      W.setEvt2Fnc(o, h, () => this.main.resumeByJumpOrCall(m)), t.on("pointerover", (d) => D.fire(h, d));
    }
    if (e.onleave) {
      const h = s + e.onleave.toLowerCase(), m = { fn: e.fn, label: e.onleave, call: !0, key: h };
      W.setEvt2Fnc(o, h, () => this.main.resumeByJumpOrCall(m)), t.on("pointerout", (d) => D.fire(h, d));
    }
  }
  #d = {
    getBoundingClientRect: (e = 0, t = 0) => DOMRect.fromRect({ x: e, y: t, width: 0, height: 0 })
  };
  #r;
  #l;
  #p;
  #h = {
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
  #m(e, t) {
    const n = t instanceof Ke ? t.getBtnBounds() : t.getBounds();
    if (!(e[":タグ名"] === "link")) {
      const a = t.parent.parent;
      n.x += a.x, n.y += a.y;
    }
    if (!e.hint) {
      this.#r.hidden = !0;
      return;
    }
    this.#r.style.cssText = `position:${this.#r.style.position}; transform:${this.#r.style.transform};` + (e.hint_style ?? ""), this.#l.style.cssText = "", this.#l.textContent = e.hint ?? "";
    try {
      const a = e.hint_opt ? { ...this.#h, ...JSON.parse(e.hint_opt) } : this.#h;
      this.#p.setOptions(a);
    } catch (a) {
      console.error(kt(
        e,
        "hint_opt",
        `dispHint 引数 hint_opt エラー ${a instanceof SyntaxError ? a.message : ""}`
      ));
    }
    this.#d.getBoundingClientRect = () => DOMRect.fromRect({
      x: this.sys.ofsLeft4elm + n.x * this.sys.cvsScale,
      y: this.sys.ofsTop4elm + n.y * this.sys.cvsScale,
      width: n.width,
      height: n.height
    }), this.#p.update(), this.#r.hidden = !1;
  }
  hideHint() {
    this.#r.hidden = !0;
  }
  cvsResize() {
    this.hideHint();
  }
  #y(e) {
    const t = e.key;
    if (!t) throw "keyは必須です";
    const n = t.toLowerCase(), i = J(e, "call", !1), a = J(e, "global", !1);
    if (J(e, "del", !1)) {
      if (e.fn || e.label || i || e.url) throw "fn/label/callとdelは同時指定できません";
      return W.clear_eventer(t, a, n), !1;
    }
    if (!e.fn && !e.label && !e.url) throw "fn,label,url いずれかは必須です";
    if (e.fn ??= this.scrItr.scriptFn, t.startsWith("dom=")) {
      const s = W.getHtmlElmList(t);
      if (s.el.length === 0) {
        if (J(e, "need_err", !0)) throw `HTML内にセレクタ（${s.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
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
      for (let c = 0; c < p; ++c) {
        const h = o[c];
        s.el.forEach((m) => {
          this.#t.add(m, h, (d) => {
            if (!D.isWait || this.layMng.getFrmDisabled(s.id) || h === "keydown" && d.key !== "Enter") return;
            const x = m.dataset;
            for (const [l, u] of Object.entries(x)) this.val.setVal_Nochk("tmp", `sn.event.domdata.${l}`, u);
            D.fire(t, d);
          }), c === 0 && this.#e.add(
            m,
            () => this.#v(m) ? (m.focus(), !0) : !1,
            () => {
            }
          );
        });
      }
    }
    return W.setEvt2Fnc(a, n, () => this.main.resumeByJumpOrCall(e)), !1;
  }
  #v(e) {
    if (e.offsetParent === null) return !1;
    let t = e;
    do {
      if (getComputedStyle(t).display === "none" || t.dataset.focus === "false" || t?.disabled) return !1;
      t = t.parentElement;
    } while (t !== null);
    return !0;
  }
  // フォーカス移動
  #g(e) {
    const { add: t, del: n, to: i } = e;
    if (t?.startsWith("dom=")) {
      const a = W.getHtmlElmList(t);
      if (a.el.length === 0 && J(e, "need_err", !0)) throw `HTML内にセレクタ（${a.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
      return a.el.forEach((s) => this.#e.add(
        s,
        () => this.#v(s) ? (s.focus(), !0) : !1,
        () => {
        }
      )), !1;
    }
    if (n?.startsWith("dom=")) {
      const a = W.getHtmlElmList(n);
      if (a.el.length === 0 && J(e, "need_err", !0)) throw `HTML内にセレクタ（${a.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
      return a.el.forEach((s) => this.#e.remove(s)), !1;
    }
    if (!i) throw "[set_focus] add か to は必須です";
    switch (i) {
      case "null":
        this.#e.blur();
        break;
      case "next":
        this.#e.next();
        break;
      case "prev":
        this.#e.prev();
        break;
    }
    return !1;
  }
  // キー押しっぱなしスキップ中か
  get isSkipping() {
    return D.isSkipping ? !0 : Object.keys(this.#n).some(
      (e) => this.#n[e] === 2
      /* PUSH_REPEATING */
    );
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
    /* NO_PUSH */
    // AndroidのBackキーだと思う
  };
}
export {
  nt as EVNM_CLICK,
  jr as EventMng
};
//# sourceMappingURL=EventMng.js.map
