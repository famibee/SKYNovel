function Q(F, z) {
  for (var D = 0; D < z.length; D++) {
    const B = z[D];
    if (typeof B != "string" && !Array.isArray(B)) {
      for (const x in B)
        if (x !== "default" && !(x in F)) {
          const q = Object.getOwnPropertyDescriptor(B, x);
          q && Object.defineProperty(F, x, q.get ? q : {
            enumerable: !0,
            get: () => B[x]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(F, Symbol.toStringTag, { value: "Module" }));
}
var U = { exports: {} }, X = U.exports, W;
function Y() {
  return W || (W = 1, function(F, z) {
    (function(D, B) {
      F.exports = B();
    })(X, () => (() => {
      var D = { 944: function(m) {
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
              if (Array.isArray(u) || (s = O(u)) || c) {
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
            var d, v = !0, h = !1;
            return { s: function() {
              s = s.call(u);
            }, n: function() {
              var p = s.next();
              return v = p.done, p;
            }, e: function(p) {
              h = !0, d = p;
            }, f: function() {
              try {
                v || s.return == null || s.return();
              } finally {
                if (h) throw d;
              }
            } };
          }
          function y(u, c) {
            return function(s) {
              if (Array.isArray(s)) return s;
            }(u) || function(s, i) {
              var f = s == null ? null : typeof Symbol < "u" && s[Symbol.iterator] || s["@@iterator"];
              if (f != null) {
                var d, v, h, p, R = [], V = !0, L = !1;
                try {
                  if (h = (f = f.call(s)).next, i !== 0) for (; !(V = (d = h.call(f)).done) && (R.push(d.value), R.length !== i); V = !0) ;
                } catch (H) {
                  L = !0, v = H;
                } finally {
                  try {
                    if (!V && f.return != null && (p = f.return(), Object(p) !== p)) return;
                  } finally {
                    if (L) throw v;
                  }
                }
                return R;
              }
            }(u, c) || O(u, c) || function() {
              throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
            }();
          }
          function O(u, c) {
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
                var v = y(d, 2), h = v[0], p = v[1];
                return f.defaults.set(h, p);
              }), this;
            } }, { key: "setValidators", value: function(i) {
              var f = this;
              return Object.entries(i).forEach(function(d) {
                var v = y(d, 2), h = v[0], p = v[1];
                return f.validators.set(h, p);
              }), this;
            } }, { key: "setTypes", value: function(i) {
              var f = this;
              return Object.entries(i).forEach(function(d) {
                var v = y(d, 2), h = v[0], p = v[1];
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
                  var v = y(i.value, 2), h = v[0], p = v[1];
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
              var v, h = A(this.required.values());
              try {
                for (h.s(); !(v = h.n()).done; ) {
                  var p = v.value;
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
                var d = this.types.get(i), v = w(f);
                if (v !== d) throw new Error('Wrong value for option "'.concat(i, '": expected type "').concat(d, '", got "').concat(v, '".'));
              }
            } }, { key: "optionExists", value: function(i) {
              return !this.strict || this.defaults.has(i) || this.validators.has(i) || this.optional.has(i) || this.required.has(i) || this.types.has(i);
            } }]) && function(i, f) {
              for (var d = 0; d < f.length; d++) {
                var v = f[d];
                v.enumerable = v.enumerable || !1, v.configurable = !0, "value" in v && (v.writable = !0), Object.defineProperty(i, (h = function(p, R) {
                  if (w(p) !== "object" || p === null) return p;
                  var V = p[Symbol.toPrimitive];
                  if (V !== void 0) {
                    var L = V.call(p, "string");
                    if (w(L) !== "object") return L;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                  }
                  return String(p);
                }(v.key), w(h) === "symbol" ? h : String(h)), v);
              }
              var h;
            }(c.prototype, s), Object.defineProperty(c, "prototype", { writable: !1 }), u;
          }();
          return I.default;
        })(), m.exports = g();
      }, 162: function(m) {
        m.exports = (() => {
          var g = { d: (w, A) => {
            for (var y in A) g.o(A, y) && !g.o(w, y) && Object.defineProperty(w, y, { enumerable: !0, get: A[y] });
          }, o: (w, A) => Object.prototype.hasOwnProperty.call(w, A) }, S = {};
          g.d(S, { default: () => I });
          var I = function() {
            function w() {
              (function(y, O) {
                if (!(y instanceof O)) throw new TypeError("Cannot call a class as a function");
              })(this, w), this._events = {}, this.on = this.addEventListener, this.off = this.removeEventListener;
            }
            var A;
            return (A = [{ key: "emit", value: function(y, O) {
              if (Object.prototype.hasOwnProperty.call(this._events, y)) for (var E = this._events[y], j = { type: y, detail: O }, Z = E.length, u = 0; u < Z; u++) this.handle(E[u], j);
            } }, { key: "handle", value: function(y, O) {
              y(O);
            } }, { key: "addEventListener", value: function(y, O) {
              Object.prototype.hasOwnProperty.call(this._events, y) || (this._events[y] = []), this._events[y].indexOf(O) < 0 && this._events[y].push(O);
            } }, { key: "removeEventListener", value: function(y, O) {
              if (Object.prototype.hasOwnProperty.call(this._events, y)) {
                var E = this._events[y], j = E.indexOf(O);
                j >= 0 && E.splice(j, 1), E.length === 0 && delete this._events[y];
              }
            } }]) && function(y, O) {
              for (var E = 0; E < O.length; E++) {
                var j = O[E];
                j.enumerable = j.enumerable || !1, j.configurable = !0, "value" in j && (j.writable = !0), Object.defineProperty(y, j.key, j);
              }
            }(w.prototype, A), w;
          }();
          return S.default;
        })();
      } }, B = {};
      function x(m) {
        var g = B[m];
        if (g !== void 0) return g.exports;
        var S = B[m] = { exports: {} };
        return D[m].call(S.exports, S, S.exports, x), S.exports;
      }
      x.n = (m) => {
        var g = m && m.__esModule ? () => m.default : () => m;
        return x.d(g, { a: g }), g;
      }, x.d = (m, g) => {
        for (var S in g) x.o(g, S) && !x.o(m, S) && Object.defineProperty(m, S, { enumerable: !0, get: g[S] });
      }, x.o = (m, g) => Object.prototype.hasOwnProperty.call(m, g), x.r = (m) => {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(m, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(m, "__esModule", { value: !0 });
      };
      var q = {};
      return (() => {
        x.r(q), x.d(q, { GamepadHandler: () => i, GamepadListener: () => K });
        var m = x(162), g = x.n(m), S = x(944), I = x.n(S);
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
        function y(a, e) {
          for (var o = 0; o < e.length; o++) {
            var l = e[o];
            l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(a, Z(l.key), l);
          }
        }
        function O(a, e) {
          return O = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, l) {
            return o.__proto__ = l, o;
          }, O(a, e);
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
            n.prototype = Object.create(r && r.prototype, { constructor: { value: n, writable: !0, configurable: !0 } }), Object.defineProperty(n, "prototype", { writable: !1 }), r && O(n, r);
          })(t, a);
          var e, o, l, k, _, C = (k = t, _ = function() {
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
            return A(this, t), (b = C.call(this)).index = n, b.gamepad = r, b.options = b.constructor.resolveOptions(M), b.axes = new Array(r.axes.length).fill(null), b.buttons = new Array(r.buttons.length).fill(null), b.initAxes(), b.initButtons(), b;
          }
          return e = t, l = [{ key: "resolveOptions", value: function(n) {
            var r, b, M, T, P = n.axis, N = n.button;
            return { axis: this.optionResolver.resolve((r = (b = P ?? N) !== null && b !== void 0 ? b : n) !== null && r !== void 0 ? r : {}), button: this.optionResolver.resolve((M = (T = N ?? P) !== null && T !== void 0 ? T : n) !== null && M !== void 0 ? M : {}) };
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
          } }]) && y(e.prototype, o), l && y(e, l), Object.defineProperty(e, "prototype", { writable: !1 }), t;
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
            l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(a, v(l.key), l);
          }
        }
        function v(a) {
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
            l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(a, L(l.key), l);
          }
        }
        function L(a) {
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
        function J(a, e) {
          if (e && (p(e) === "object" || typeof e == "function")) return e;
          if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
          return G(a);
        }
        function G(a) {
          if (a === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return a;
        }
        function $(a) {
          return $ = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }, $(a);
        }
        var K = function(a) {
          (function(t, n) {
            if (typeof n != "function" && n !== null) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(n && n.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), n && H(t, n);
          })(C, a);
          var e, o, l, k, _ = (l = C, k = function() {
            if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
            if (typeof Proxy == "function") return !0;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), !0;
            } catch {
              return !1;
            }
          }(), function() {
            var t, n = $(l);
            if (k) {
              var r = $(this).constructor;
              t = Reflect.construct(n, arguments, r);
            } else t = n.apply(this, arguments);
            return J(this, t);
          });
          function C() {
            var t, n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            if (R(this, C), t = _.call(this), typeof navigator.getGamepads != "function") throw new Error("This browser does not support gamepad API.");
            return t.options = n, t.onAxis = t.onAxis.bind(G(t)), t.update = t.update.bind(G(t)), t.start = t.start.bind(G(t)), t.stop = t.stop.bind(G(t)), t.discover = t.discover.bind(G(t)), t.onButton = t.onButton.bind(G(t)), t.handlers = new Array(4).fill(null), t.loop = new h(t.update), window.addEventListener("error", t.stop), t;
          }
          return e = C, (o = [{ key: "start", value: function() {
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
          } }]) && V(e.prototype, o), Object.defineProperty(e, "prototype", { writable: !1 }), C;
        }(g());
      })(), q;
    })());
  }(U)), U.exports;
}
var ee = Y();
const te = /* @__PURE__ */ Q({
  __proto__: null
}, [ee]);
export {
  te as g
};
//# sourceMappingURL=gamepad.js.map
