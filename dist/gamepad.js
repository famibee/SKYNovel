import { h as K } from "./web2.js";
function Q(F, $) {
  for (var G = 0; G < $.length; G++) {
    const B = $[G];
    if (typeof B != "string" && !Array.isArray(B)) {
      for (const O in B)
        if (O !== "default" && !(O in F)) {
          const L = Object.getOwnPropertyDescriptor(B, O);
          L && Object.defineProperty(F, O, L.get ? L : {
            enumerable: !0,
            get: () => B[O]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(F, Symbol.toStringTag, { value: "Module" }));
}
var N = { exports: {} };
(function(F, $) {
  (function(G, B) {
    F.exports = B();
  })(K, () => (() => {
    var G = { 944: function(m) {
      var g;
      g = () => (() => {
        var S = { d: (u, c) => {
          for (var s in c) S.o(c, s) && !S.o(u, s) && Object.defineProperty(u, s, { enumerable: !0, get: c[s] });
        }, o: (u, c) => Object.prototype.hasOwnProperty.call(u, c) }, I = {};
        function w(u) {
          return w = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(c) {
            return typeof c;
          } : function(c) {
            return c && typeof Symbol == "function" && c.constructor === Symbol && c !== Symbol.prototype ? "symbol" : typeof c;
          }, w(u);
        }
        function A(u, c) {
          var s = typeof Symbol < "u" && u[Symbol.iterator] || u["@@iterator"];
          if (!s) {
            if (Array.isArray(u) || (s = x(u)) || c) {
              s && (u = s);
              var i = 0, f = function() {
              };
              return { s: f, n: function() {
                return i >= u.length ? { done: !0 } : { done: !1, value: u[i++] };
              }, e: function(p) {
                throw p;
              }, f };
            }
            throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }
          var d, y = !0, h = !1;
          return { s: function() {
            s = s.call(u);
          }, n: function() {
            var p = s.next();
            return y = p.done, p;
          }, e: function(p) {
            h = !0, d = p;
          }, f: function() {
            try {
              y || s.return == null || s.return();
            } finally {
              if (h) throw d;
            }
          } };
        }
        function v(u, c) {
          return function(s) {
            if (Array.isArray(s)) return s;
          }(u) || function(s, i) {
            var f = s == null ? null : typeof Symbol < "u" && s[Symbol.iterator] || s["@@iterator"];
            if (f != null) {
              var d, y, h, p, R = [], V = !0, q = !1;
              try {
                if (h = (f = f.call(s)).next, i !== 0) for (; !(V = (d = h.call(f)).done) && (R.push(d.value), R.length !== i); V = !0) ;
              } catch (H) {
                q = !0, y = H;
              } finally {
                try {
                  if (!V && f.return != null && (p = f.return(), Object(p) !== p)) return;
                } finally {
                  if (q) throw y;
                }
              }
              return R;
            }
          }(u, c) || x(u, c) || function() {
            throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }();
        }
        function x(u, c) {
          if (u) {
            if (typeof u == "string") return E(u, c);
            var s = Object.prototype.toString.call(u).slice(8, -1);
            return s === "Object" && u.constructor && (s = u.constructor.name), s === "Map" || s === "Set" ? Array.from(u) : s === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s) ? E(u, c) : void 0;
          }
        }
        function E(u, c) {
          (c == null || c > u.length) && (c = u.length);
          for (var s = 0, i = new Array(c); s < c; s++) i[s] = u[s];
          return i;
        }
        function j(u, c) {
          if (!(u instanceof c)) throw new TypeError("Cannot call a class as a function");
        }
        S.d(I, { default: () => Z });
        var Z = function() {
          function u() {
            var i = !(arguments.length > 0 && arguments[0] !== void 0) || arguments[0];
            j(this, u), this.strict = i, this.defaults = /* @__PURE__ */ new Map(), this.validators = /* @__PURE__ */ new Map(), this.types = /* @__PURE__ */ new Map(), this.optional = /* @__PURE__ */ new Set(), this.required = /* @__PURE__ */ new Set();
          }
          var c, s;
          return c = u, (s = [{ key: "allowExtra", value: function() {
            return this.strict = !1, this;
          } }, { key: "setDefaults", value: function(i) {
            var f = this;
            return Object.entries(i).forEach(function(d) {
              var y = v(d, 2), h = y[0], p = y[1];
              return f.defaults.set(h, p);
            }), this;
          } }, { key: "setValidators", value: function(i) {
            var f = this;
            return Object.entries(i).forEach(function(d) {
              var y = v(d, 2), h = y[0], p = y[1];
              return f.validators.set(h, p);
            }), this;
          } }, { key: "setTypes", value: function(i) {
            var f = this;
            return Object.entries(i).forEach(function(d) {
              var y = v(d, 2), h = y[0], p = y[1];
              return f.types.set(h, p);
            }), this;
          } }, { key: "setOptional", value: function(i) {
            var f = this;
            return i.forEach(function(d) {
              return f.optional.add(d);
            }), this;
          } }, { key: "setRequired", value: function(i) {
            var f = this;
            return i.forEach(function(d) {
              return f.required.add(d);
            }), this;
          } }, { key: "resolve", value: function(i) {
            return this.validate(Object.assign(this.getDefaults(), i));
          } }, { key: "getDefaults", value: function() {
            var i, f = {}, d = A(this.defaults);
            try {
              for (d.s(); !(i = d.n()).done; ) {
                var y = v(i.value, 2), h = y[0], p = y[1];
                f[h] = p;
              }
            } catch (R) {
              d.e(R);
            } finally {
              d.f();
            }
            return f;
          } }, { key: "validate", value: function(i) {
            for (var f in i) this.validators.has(f) && (i[f] = this.validators.get(f)(i[f]));
            for (var d in i) {
              if (!this.optionExists(d)) throw new Error('Unkown option "'.concat(d, '".'));
              this.checkType(d, i[d]);
            }
            var y, h = A(this.required.values());
            try {
              for (h.s(); !(y = h.n()).done; ) {
                var p = y.value;
                if (i[p] === void 0) throw new Error('Option "'.concat(p, '" is required.'));
              }
            } catch (R) {
              h.e(R);
            } finally {
              h.f();
            }
            return i;
          } }, { key: "checkType", value: function(i, f) {
            if (this.types.has(i)) {
              var d = this.types.get(i), y = w(f);
              if (y !== d) throw new Error('Wrong value for option "'.concat(i, '": expected type "').concat(d, '", got "').concat(y, '".'));
            }
          } }, { key: "optionExists", value: function(i) {
            return !this.strict || this.defaults.has(i) || this.validators.has(i) || this.optional.has(i) || this.required.has(i) || this.types.has(i);
          } }]) && function(i, f) {
            for (var d = 0; d < f.length; d++) {
              var y = f[d];
              y.enumerable = y.enumerable || !1, y.configurable = !0, "value" in y && (y.writable = !0), Object.defineProperty(i, (h = function(p, R) {
                if (w(p) !== "object" || p === null) return p;
                var V = p[Symbol.toPrimitive];
                if (V !== void 0) {
                  var q = V.call(p, "string");
                  if (w(q) !== "object") return q;
                  throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(p);
              }(y.key), w(h) === "symbol" ? h : String(h)), y);
            }
            var h;
          }(c.prototype, s), Object.defineProperty(c, "prototype", { writable: !1 }), u;
        }();
        return I.default;
      })(), m.exports = g();
    }, 162: function(m) {
      m.exports = (() => {
        var g = { d: (w, A) => {
          for (var v in A) g.o(A, v) && !g.o(w, v) && Object.defineProperty(w, v, { enumerable: !0, get: A[v] });
        }, o: (w, A) => Object.prototype.hasOwnProperty.call(w, A) }, S = {};
        g.d(S, { default: () => I });
        var I = function() {
          function w() {
            (function(v, x) {
              if (!(v instanceof x)) throw new TypeError("Cannot call a class as a function");
            })(this, w), this._events = {}, this.on = this.addEventListener, this.off = this.removeEventListener;
          }
          var A;
          return (A = [{ key: "emit", value: function(v, x) {
            if (Object.prototype.hasOwnProperty.call(this._events, v)) for (var E = this._events[v], j = { type: v, detail: x }, Z = E.length, u = 0; u < Z; u++) this.handle(E[u], j);
          } }, { key: "handle", value: function(v, x) {
            v(x);
          } }, { key: "addEventListener", value: function(v, x) {
            Object.prototype.hasOwnProperty.call(this._events, v) || (this._events[v] = []), this._events[v].indexOf(x) < 0 && this._events[v].push(x);
          } }, { key: "removeEventListener", value: function(v, x) {
            if (Object.prototype.hasOwnProperty.call(this._events, v)) {
              var E = this._events[v], j = E.indexOf(x);
              j >= 0 && E.splice(j, 1), E.length === 0 && delete this._events[v];
            }
          } }]) && function(v, x) {
            for (var E = 0; E < x.length; E++) {
              var j = x[E];
              j.enumerable = j.enumerable || !1, j.configurable = !0, "value" in j && (j.writable = !0), Object.defineProperty(v, j.key, j);
            }
          }(w.prototype, A), w;
        }();
        return S.default;
      })();
    } }, B = {};
    function O(m) {
      var g = B[m];
      if (g !== void 0) return g.exports;
      var S = B[m] = { exports: {} };
      return G[m].call(S.exports, S, S.exports, O), S.exports;
    }
    O.n = (m) => {
      var g = m && m.__esModule ? () => m.default : () => m;
      return O.d(g, { a: g }), g;
    }, O.d = (m, g) => {
      for (var S in g) O.o(g, S) && !O.o(m, S) && Object.defineProperty(m, S, { enumerable: !0, get: g[S] });
    }, O.o = (m, g) => Object.prototype.hasOwnProperty.call(m, g), O.r = (m) => {
      typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(m, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(m, "__esModule", { value: !0 });
    };
    var L = {};
    return (() => {
      O.r(L), O.d(L, { GamepadHandler: () => i, GamepadListener: () => J });
      var m = O(162), g = O.n(m), S = O(944), I = O.n(S);
      function w(a) {
        return w = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
          return typeof e;
        } : function(e) {
          return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        }, w(a);
      }
      function A(a, e) {
        if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
      }
      function v(a, e) {
        for (var o = 0; o < e.length; o++) {
          var l = e[o];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(a, Z(l.key), l);
        }
      }
      function x(a, e) {
        return x = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, l) {
          return o.__proto__ = l, o;
        }, x(a, e);
      }
      function E(a, e) {
        if (e && (w(e) === "object" || typeof e == "function")) return e;
        if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
        return function(o) {
          if (o === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return o;
        }(a);
      }
      function j(a) {
        return j = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        }, j(a);
      }
      function Z(a) {
        var e = function(o, l) {
          if (w(o) !== "object" || o === null) return o;
          var k = o[Symbol.toPrimitive];
          if (k !== void 0) {
            var _ = k.call(o, "string");
            if (w(_) !== "object") return _;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(o);
        }(a);
        return w(e) === "symbol" ? e : String(e);
      }
      var u, c, s, i = function(a) {
        (function(n, r) {
          if (typeof r != "function" && r !== null) throw new TypeError("Super expression must either be null or a function");
          n.prototype = Object.create(r && r.prototype, { constructor: { value: n, writable: !0, configurable: !0 } }), Object.defineProperty(n, "prototype", { writable: !1 }), r && x(n, r);
        })(t, a);
        var e, o, l, k, _, D = (k = t, _ = function() {
          if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
          if (typeof Proxy == "function") return !0;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            })), !0;
          } catch {
            return !1;
          }
        }(), function() {
          var n, r = j(k);
          if (_) {
            var b = j(this).constructor;
            n = Reflect.construct(r, arguments, b);
          } else n = r.apply(this, arguments);
          return E(this, n);
        });
        function t(n, r) {
          var b, M = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return A(this, t), (b = D.call(this)).index = n, b.gamepad = r, b.options = b.constructor.resolveOptions(M), b.axes = new Array(r.axes.length).fill(null), b.buttons = new Array(r.buttons.length).fill(null), b.initAxes(), b.initButtons(), b;
        }
        return e = t, l = [{ key: "resolveOptions", value: function(n) {
          var r, b, M, T, P = n.axis, z = n.button;
          return { axis: this.optionResolver.resolve((r = (b = P ?? z) !== null && b !== void 0 ? b : n) !== null && r !== void 0 ? r : {}), button: this.optionResolver.resolve((M = (T = z ?? P) !== null && T !== void 0 ? T : n) !== null && M !== void 0 ? M : {}) };
        } }], (o = [{ key: "initAxes", value: function() {
          for (var n = this.axes.length, r = 0; r < n; r++) this.axes[r] = this.resolveAxisValue(r);
        } }, { key: "initButtons", value: function() {
          for (var n = this.buttons.length, r = 0; r < n; r++) this.buttons[r] = this.resolveButtonValue(r);
        } }, { key: "update", value: function(n) {
          this.gamepad = n, this.updateAxis(), this.updateButtons();
        } }, { key: "updateAxis", value: function() {
          for (var n = this.axes.length, r = 0; r < n; r++) this.setAxisValue(r, this.resolveAxisValue(r));
        } }, { key: "updateButtons", value: function() {
          for (var n = this.buttons.length, r = 0; r < n; r++) this.setButtonValue(r, this.resolveButtonValue(r));
        } }, { key: "setAxisValue", value: function(n, r) {
          this.axes[n] !== r && (this.axes[n] = r, this.emit("axis", { gamepad: this.gamepad, index: this.index, axis: n, value: r }));
        } }, { key: "setButtonValue", value: function(n, r) {
          this.buttons[n] !== r && (this.buttons[n] = r, this.emit("button", { gamepad: this.gamepad, index: this.index, button: n, pressed: this.gamepad.buttons[n].pressed, value: r }));
        } }, { key: "resolveAxisValue", value: function(n) {
          var r = this.options.axis, b = r.deadZone, M = r.analog, T = r.precision, P = this.gamepad.axes[n];
          return b && P < b && P > -b ? 0 : M ? T ? Math.round(P * T) / T : P : P > 0 ? 1 : P < 0 ? -1 : 0;
        } }, { key: "resolveButtonValue", value: function(n) {
          var r = this.options.button, b = r.deadZone, M = r.analog, T = r.precision, P = this.gamepad.buttons[n].value;
          return b > 0 && P < b && P > -b ? 0 : M ? T ? Math.round(P * T) / T : P : P === 0 ? 0 : 1;
        } }]) && v(e.prototype, o), l && v(e, l), Object.defineProperty(e, "prototype", { writable: !1 }), t;
      }(g());
      function f(a) {
        return f = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
          return typeof e;
        } : function(e) {
          return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        }, f(a);
      }
      function d(a, e) {
        for (var o = 0; o < e.length; o++) {
          var l = e[o];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(a, y(l.key), l);
        }
      }
      function y(a) {
        var e = function(o, l) {
          if (f(o) !== "object" || o === null) return o;
          var k = o[Symbol.toPrimitive];
          if (k !== void 0) {
            var _ = k.call(o, "string");
            if (f(_) !== "object") return _;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(o);
        }(a);
        return f(e) === "symbol" ? e : String(e);
      }
      u = i, c = "optionResolver", s = new (I())().setDefaults({ analog: !0, deadZone: 0, precision: 0 }).setTypes({ analog: "boolean", deadZone: "number", precision: "number" }).setValidators({ deadZone: function(a) {
        return Math.max(Math.min(a, 1), 0);
      }, precision: function(a) {
        return a > 0 ? Math.pow(10, a) : 0;
      } }), (c = Z(c)) in u ? Object.defineProperty(u, c, { value: s, enumerable: !0, configurable: !0, writable: !0 }) : u[c] = s;
      var h = function() {
        function a(l) {
          (function(k, _) {
            if (!(k instanceof _)) throw new TypeError("Cannot call a class as a function");
          })(this, a), this.callback = l, this.frame = null, this.update = this.update.bind(this);
        }
        var e, o;
        return e = a, (o = [{ key: "setCallback", value: function(l) {
          this.callback = l;
        } }, { key: "start", value: function() {
          this.frame || (this.frame = window.requestAnimationFrame(this.update));
        } }, { key: "stop", value: function() {
          this.frame && (window.cancelAnimationFrame(this.frame), this.frame = null);
        } }, { key: "update", value: function() {
          this.frame = window.requestAnimationFrame(this.update), this.callback();
        } }]) && d(e.prototype, o), Object.defineProperty(e, "prototype", { writable: !1 }), a;
      }();
      function p(a) {
        return p = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
          return typeof e;
        } : function(e) {
          return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        }, p(a);
      }
      function R(a, e) {
        if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
      }
      function V(a, e) {
        for (var o = 0; o < e.length; o++) {
          var l = e[o];
          l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(a, q(l.key), l);
        }
      }
      function q(a) {
        var e = function(o, l) {
          if (p(o) !== "object" || o === null) return o;
          var k = o[Symbol.toPrimitive];
          if (k !== void 0) {
            var _ = k.call(o, "string");
            if (p(_) !== "object") return _;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(o);
        }(a);
        return p(e) === "symbol" ? e : String(e);
      }
      function H(a, e) {
        return H = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, l) {
          return o.__proto__ = l, o;
        }, H(a, e);
      }
      function W(a, e) {
        if (e && (p(e) === "object" || typeof e == "function")) return e;
        if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
        return C(a);
      }
      function C(a) {
        if (a === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return a;
      }
      function U(a) {
        return U = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        }, U(a);
      }
      var J = function(a) {
        (function(t, n) {
          if (typeof n != "function" && n !== null) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(n && n.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), n && H(t, n);
        })(D, a);
        var e, o, l, k, _ = (l = D, k = function() {
          if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
          if (typeof Proxy == "function") return !0;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            })), !0;
          } catch {
            return !1;
          }
        }(), function() {
          var t, n = U(l);
          if (k) {
            var r = U(this).constructor;
            t = Reflect.construct(n, arguments, r);
          } else t = n.apply(this, arguments);
          return W(this, t);
        });
        function D() {
          var t, n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          if (R(this, D), t = _.call(this), typeof navigator.getGamepads != "function") throw new Error("This browser does not support gamepad API.");
          return t.options = n, t.onAxis = t.onAxis.bind(C(t)), t.update = t.update.bind(C(t)), t.start = t.start.bind(C(t)), t.stop = t.stop.bind(C(t)), t.discover = t.discover.bind(C(t)), t.onButton = t.onButton.bind(C(t)), t.handlers = new Array(4).fill(null), t.loop = new h(t.update), window.addEventListener("error", t.stop), t;
        }
        return e = D, (o = [{ key: "start", value: function() {
          this.loop.start();
        } }, { key: "stop", value: function() {
          this.loop.stop();
        } }, { key: "update", value: function() {
          var t = navigator.getGamepads();
          this.discover(t[0], 0), this.discover(t[1], 1), this.discover(t[2], 2), this.discover(t[3], 3);
        } }, { key: "discover", value: function(t, n) {
          t ? (this.handlers[n] === null && this.registerHandler(n, t), this.handlers[n].update(t)) : this.handlers[n] && this.removeGamepad(n);
        } }, { key: "registerHandler", value: function(t, n) {
          var r = new i(t, n, this.options);
          this.handlers[t] = r, r.addEventListener("axis", this.onAxis), r.addEventListener("button", this.onButton), this.emit("gamepad:connected", { index: t, gamepad: n }), this.emit("gamepad:".concat(t, ":connected"), { index: t, gamepad: n });
        } }, { key: "removeGamepad", value: function(t) {
          var n = this.handlers[t];
          n.removeEventListener("axis", this.onAxis), n.removeEventListener("button", this.onButton), this.handlers[t] = null, this.emit("gamepad:disconnected", { index: t }), this.emit("gamepad:".concat(t, ":disconnected"), { index: t });
        } }, { key: "onAxis", value: function(t) {
          var n = t.detail.index;
          this.emit("gamepad:axis", t.detail), this.emit("gamepad:".concat(n, ":axis"), t.detail), this.emit("gamepad:".concat(n, ":axis:").concat(t.detail.axis), t.detail);
        } }, { key: "onButton", value: function(t) {
          var n = t.detail.index;
          this.emit("gamepad:button", t.detail), this.emit("gamepad:".concat(n, ":button"), t.detail), this.emit("gamepad:".concat(n, ":button:").concat(t.detail.button), t.detail);
        } }]) && V(e.prototype, o), Object.defineProperty(e, "prototype", { writable: !1 }), D;
      }(g());
    })(), L;
  })());
})(N);
var X = N.exports;
const ee = /* @__PURE__ */ Q({
  __proto__: null
}, [X]);
export {
  ee as g
};
//# sourceMappingURL=gamepad.js.map
