import { t as __commonJSMin } from "./chunk.js";
var require_gamepad = /* @__PURE__ */ __commonJSMin(((e, t) => {
	(function(n, r) {
		typeof e == "object" && typeof t == "object" ? t.exports = r() : typeof define == "function" && define.amd ? define([], r) : typeof e == "object" ? e.gamepad = r() : n.gamepad = r();
	})(e, (() => (() => {
		var e = {
			944: function(e) {
				e.exports = (() => (() => {
					var e = {
						d: (t, n) => {
							for (var r in n) e.o(n, r) && !e.o(t, r) && Object.defineProperty(t, r, {
								enumerable: !0,
								get: n[r]
							});
						},
						o: (e, t) => Object.prototype.hasOwnProperty.call(e, t)
					}, t = {};
					function n(e) {
						return n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
							return typeof e;
						} : function(e) {
							return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
						}, n(e);
					}
					function r(e, t) {
						var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
						if (!n) {
							if (Array.isArray(e) || (n = a(e)) || t && e && typeof e.length == "number") {
								n && (e = n);
								var r = 0, i = function() {};
								return {
									s: i,
									n: function() {
										return r >= e.length ? { done: !0 } : {
											done: !1,
											value: e[r++]
										};
									},
									e: function(e) {
										throw e;
									},
									f: i
								};
							}
							throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
						}
						var o, s = !0, c = !1;
						return {
							s: function() {
								n = n.call(e);
							},
							n: function() {
								var e = n.next();
								return s = e.done, e;
							},
							e: function(e) {
								c = !0, o = e;
							},
							f: function() {
								try {
									s || n.return == null || n.return();
								} finally {
									if (c) throw o;
								}
							}
						};
					}
					function i(e, t) {
						return function(e) {
							if (Array.isArray(e)) return e;
						}(e) || function(e, t) {
							var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
							if (n != null) {
								var r, i, a, o, s = [], c = !0, l = !1;
								try {
									if (a = (n = n.call(e)).next, t === 0) {
										if (Object(n) !== n) return;
										c = !1;
									} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
								} catch (e) {
									l = !0, i = e;
								} finally {
									try {
										if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
									} finally {
										if (l) throw i;
									}
								}
								return s;
							}
						}(e, t) || a(e, t) || function() {
							throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
						}();
					}
					function a(e, t) {
						if (e) {
							if (typeof e == "string") return o(e, t);
							var n = Object.prototype.toString.call(e).slice(8, -1);
							return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? o(e, t) : void 0;
						}
					}
					function o(e, t) {
						(t == null || t > e.length) && (t = e.length);
						for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
						return r;
					}
					function s(e, t) {
						if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
					}
					e.d(t, { default: () => c });
					var c = function() {
						function e() {
							var t = !(arguments.length > 0 && arguments[0] !== void 0) || arguments[0];
							s(this, e), this.strict = t, this.defaults = /* @__PURE__ */ new Map(), this.validators = /* @__PURE__ */ new Map(), this.types = /* @__PURE__ */ new Map(), this.optional = /* @__PURE__ */ new Set(), this.required = /* @__PURE__ */ new Set();
						}
						var t, a;
						return t = e, (a = [
							{
								key: "allowExtra",
								value: function() {
									return this.strict = !1, this;
								}
							},
							{
								key: "setDefaults",
								value: function(e) {
									var t = this;
									return Object.entries(e).forEach((function(e) {
										var n = i(e, 2), r = n[0], a = n[1];
										return t.defaults.set(r, a);
									})), this;
								}
							},
							{
								key: "setValidators",
								value: function(e) {
									var t = this;
									return Object.entries(e).forEach((function(e) {
										var n = i(e, 2), r = n[0], a = n[1];
										return t.validators.set(r, a);
									})), this;
								}
							},
							{
								key: "setTypes",
								value: function(e) {
									var t = this;
									return Object.entries(e).forEach((function(e) {
										var n = i(e, 2), r = n[0], a = n[1];
										return t.types.set(r, a);
									})), this;
								}
							},
							{
								key: "setOptional",
								value: function(e) {
									var t = this;
									return e.forEach((function(e) {
										return t.optional.add(e);
									})), this;
								}
							},
							{
								key: "setRequired",
								value: function(e) {
									var t = this;
									return e.forEach((function(e) {
										return t.required.add(e);
									})), this;
								}
							},
							{
								key: "resolve",
								value: function(e) {
									return this.validate(Object.assign(this.getDefaults(), e));
								}
							},
							{
								key: "getDefaults",
								value: function() {
									var e, t = {}, n = r(this.defaults);
									try {
										for (n.s(); !(e = n.n()).done;) {
											var a = i(e.value, 2), o = a[0];
											t[o] = a[1];
										}
									} catch (e) {
										n.e(e);
									} finally {
										n.f();
									}
									return t;
								}
							},
							{
								key: "validate",
								value: function(e) {
									for (var t in e) this.validators.has(t) && (e[t] = this.validators.get(t)(e[t]));
									for (var n in e) {
										if (!this.optionExists(n)) throw Error(`Unkown option "${n}".`);
										this.checkType(n, e[n]);
									}
									var i, a = r(this.required.values());
									try {
										for (a.s(); !(i = a.n()).done;) {
											var o = i.value;
											if (e[o] === void 0) throw Error(`Option "${o}" is required.`);
										}
									} catch (e) {
										a.e(e);
									} finally {
										a.f();
									}
									return e;
								}
							},
							{
								key: "checkType",
								value: function(e, t) {
									if (this.types.has(e)) {
										var r = this.types.get(e), i = n(t);
										if (i !== r) throw Error(`Wrong value for option "${e}": expected type "${r}", got "${i}".`);
									}
								}
							},
							{
								key: "optionExists",
								value: function(e) {
									return !this.strict || this.defaults.has(e) || this.validators.has(e) || this.optional.has(e) || this.required.has(e) || this.types.has(e);
								}
							}
						]) && function(e, t) {
							for (var r = 0; r < t.length; r++) {
								var i = t[r];
								i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, (a = function(e, t) {
									if (n(e) !== "object" || e === null) return e;
									var r = e[Symbol.toPrimitive];
									if (r !== void 0) {
										var i = r.call(e, "string");
										if (n(i) !== "object") return i;
										throw TypeError("@@toPrimitive must return a primitive value.");
									}
									return String(e);
								}(i.key), n(a) === "symbol" ? a : String(a)), i);
							}
							var a;
						}(t.prototype, a), Object.defineProperty(t, "prototype", { writable: !1 }), e;
					}();
					return t.default;
				})())();
			},
			162: function(e) {
				e.exports = (() => {
					var e = {
						d: (t, n) => {
							for (var r in n) e.o(n, r) && !e.o(t, r) && Object.defineProperty(t, r, {
								enumerable: !0,
								get: n[r]
							});
						},
						o: (e, t) => Object.prototype.hasOwnProperty.call(e, t)
					}, t = {};
					e.d(t, { default: () => n });
					var n = function() {
						function e() {
							(function(e, t) {
								if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
							})(this, e), this._events = {}, this.on = this.addEventListener, this.off = this.removeEventListener;
						}
						var t;
						return (t = [
							{
								key: "emit",
								value: function(e, t) {
									if (Object.prototype.hasOwnProperty.call(this._events, e)) for (var n = this._events[e], r = {
										type: e,
										detail: t
									}, i = n.length, a = 0; a < i; a++) this.handle(n[a], r);
								}
							},
							{
								key: "handle",
								value: function(e, t) {
									e(t);
								}
							},
							{
								key: "addEventListener",
								value: function(e, t) {
									Object.prototype.hasOwnProperty.call(this._events, e) || (this._events[e] = []), this._events[e].indexOf(t) < 0 && this._events[e].push(t);
								}
							},
							{
								key: "removeEventListener",
								value: function(e, t) {
									if (Object.prototype.hasOwnProperty.call(this._events, e)) {
										var n = this._events[e], r = n.indexOf(t);
										r >= 0 && n.splice(r, 1), n.length === 0 && delete this._events[e];
									}
								}
							}
						]) && function(e, t) {
							for (var n = 0; n < t.length; n++) {
								var r = t[n];
								r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
							}
						}(e.prototype, t), e;
					}();
					return t.default;
				})();
			}
		}, t = {};
		function n(r) {
			var i = t[r];
			if (i !== void 0) return i.exports;
			var a = t[r] = { exports: {} };
			return e[r].call(a.exports, a, a.exports, n), a.exports;
		}
		n.n = (e) => {
			var t = e && e.__esModule ? () => e.default : () => e;
			return n.d(t, { a: t }), t;
		}, n.d = (e, t) => {
			for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {
				enumerable: !0,
				get: t[r]
			});
		}, n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), n.r = (e) => {
			typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
		};
		var r = {};
		return (() => {
			n.r(r), n.d(r, {
				GamepadHandler: () => g,
				GamepadListener: () => k
			});
			var e = n(162), t = n.n(e), i = n(944), a = n.n(i);
			function o(e) {
				return o = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
					return typeof e;
				} : function(e) {
					return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
				}, o(e);
			}
			function s(e, t) {
				if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
			}
			function c(e, t) {
				for (var n = 0; n < t.length; n++) {
					var r = t[n];
					r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, f(r.key), r);
				}
			}
			function l(e, t) {
				return l = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
					return e.__proto__ = t, e;
				}, l(e, t);
			}
			function u(e, t) {
				if (t && (o(t) === "object" || typeof t == "function")) return t;
				if (t !== void 0) throw TypeError("Derived constructors may only return object or undefined");
				return function(e) {
					if (e === void 0) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
					return e;
				}(e);
			}
			function d(e) {
				return d = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
					return e.__proto__ || Object.getPrototypeOf(e);
				}, d(e);
			}
			function f(e) {
				var t = function(e, t) {
					if (o(e) !== "object" || e === null) return e;
					var n = e[Symbol.toPrimitive];
					if (n !== void 0) {
						var r = n.call(e, "string");
						if (o(r) !== "object") return r;
						throw TypeError("@@toPrimitive must return a primitive value.");
					}
					return String(e);
				}(e);
				return o(t) === "symbol" ? t : String(t);
			}
			var p, m, h, g = function(e) {
				(function(e, t) {
					if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function");
					e.prototype = Object.create(t && t.prototype, { constructor: {
						value: e,
						writable: !0,
						configurable: !0
					} }), Object.defineProperty(e, "prototype", { writable: !1 }), t && l(e, t);
				})(f, e);
				var t, n, r, i, a, o = (i = f, a = function() {
					if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
					if (typeof Proxy == "function") return !0;
					try {
						return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0;
					} catch {
						return !1;
					}
				}(), function() {
					var e, t = d(i);
					if (a) {
						var n = d(this).constructor;
						e = Reflect.construct(t, arguments, n);
					} else e = t.apply(this, arguments);
					return u(this, e);
				});
				function f(e, t) {
					var n, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
					return s(this, f), (n = o.call(this)).index = e, n.gamepad = t, n.options = n.constructor.resolveOptions(r), n.axes = Array(t.axes.length).fill(null), n.buttons = Array(t.buttons.length).fill(null), n.initAxes(), n.initButtons(), n;
				}
				return t = f, r = [{
					key: "resolveOptions",
					value: function(e) {
						var t = e.axis, n = e.button;
						return {
							axis: this.optionResolver.resolve(t ?? n ?? e ?? {}),
							button: this.optionResolver.resolve(n ?? t ?? e ?? {})
						};
					}
				}], (n = [
					{
						key: "initAxes",
						value: function() {
							for (var e = this.axes.length, t = 0; t < e; t++) this.axes[t] = this.resolveAxisValue(t);
						}
					},
					{
						key: "initButtons",
						value: function() {
							for (var e = this.buttons.length, t = 0; t < e; t++) this.buttons[t] = this.resolveButtonValue(t);
						}
					},
					{
						key: "update",
						value: function(e) {
							this.gamepad = e, this.updateAxis(), this.updateButtons();
						}
					},
					{
						key: "updateAxis",
						value: function() {
							for (var e = this.axes.length, t = 0; t < e; t++) this.setAxisValue(t, this.resolveAxisValue(t));
						}
					},
					{
						key: "updateButtons",
						value: function() {
							for (var e = this.buttons.length, t = 0; t < e; t++) this.setButtonValue(t, this.resolveButtonValue(t));
						}
					},
					{
						key: "setAxisValue",
						value: function(e, t) {
							this.axes[e] !== t && (this.axes[e] = t, this.emit("axis", {
								gamepad: this.gamepad,
								index: this.index,
								axis: e,
								value: t
							}));
						}
					},
					{
						key: "setButtonValue",
						value: function(e, t) {
							this.buttons[e] !== t && (this.buttons[e] = t, this.emit("button", {
								gamepad: this.gamepad,
								index: this.index,
								button: e,
								pressed: this.gamepad.buttons[e].pressed,
								value: t
							}));
						}
					},
					{
						key: "resolveAxisValue",
						value: function(e) {
							var t = this.options.axis, n = t.deadZone, r = t.analog, i = t.precision, a = this.gamepad.axes[e];
							return n && a < n && a > -n ? 0 : r ? i ? Math.round(a * i) / i : a : a > 0 ? 1 : a < 0 ? -1 : 0;
						}
					},
					{
						key: "resolveButtonValue",
						value: function(e) {
							var t = this.options.button, n = t.deadZone, r = t.analog, i = t.precision, a = this.gamepad.buttons[e].value;
							return n > 0 && a < n && a > -n ? 0 : r ? i ? Math.round(a * i) / i : a : a === 0 ? 0 : 1;
						}
					}
				]) && c(t.prototype, n), r && c(t, r), Object.defineProperty(t, "prototype", { writable: !1 }), f;
			}(t());
			function _(e) {
				return _ = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
					return typeof e;
				} : function(e) {
					return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
				}, _(e);
			}
			function v(e, t) {
				for (var n = 0; n < t.length; n++) {
					var r = t[n];
					r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, y(r.key), r);
				}
			}
			function y(e) {
				var t = function(e, t) {
					if (_(e) !== "object" || e === null) return e;
					var n = e[Symbol.toPrimitive];
					if (n !== void 0) {
						var r = n.call(e, "string");
						if (_(r) !== "object") return r;
						throw TypeError("@@toPrimitive must return a primitive value.");
					}
					return String(e);
				}(e);
				return _(t) === "symbol" ? t : String(t);
			}
			p = g, m = "optionResolver", h = new (a())().setDefaults({
				analog: !0,
				deadZone: 0,
				precision: 0
			}).setTypes({
				analog: "boolean",
				deadZone: "number",
				precision: "number"
			}).setValidators({
				deadZone: function(e) {
					return Math.max(Math.min(e, 1), 0);
				},
				precision: function(e) {
					return e > 0 ? 10 ** e : 0;
				}
			}), (m = f(m)) in p ? Object.defineProperty(p, m, {
				value: h,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}) : p[m] = h;
			var b = function() {
				function e(t) {
					(function(e, t) {
						if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
					})(this, e), this.callback = t, this.frame = null, this.update = this.update.bind(this);
				}
				var t, n;
				return t = e, (n = [
					{
						key: "setCallback",
						value: function(e) {
							this.callback = e;
						}
					},
					{
						key: "start",
						value: function() {
							this.frame ||= window.requestAnimationFrame(this.update);
						}
					},
					{
						key: "stop",
						value: function() {
							this.frame &&= (window.cancelAnimationFrame(this.frame), null);
						}
					},
					{
						key: "update",
						value: function() {
							this.frame = window.requestAnimationFrame(this.update), this.callback();
						}
					}
				]) && v(t.prototype, n), Object.defineProperty(t, "prototype", { writable: !1 }), e;
			}();
			function x(e) {
				return x = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
					return typeof e;
				} : function(e) {
					return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
				}, x(e);
			}
			function S(e, t) {
				if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
			}
			function C(e, t) {
				for (var n = 0; n < t.length; n++) {
					var r = t[n];
					r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, w(r.key), r);
				}
			}
			function w(e) {
				var t = function(e, t) {
					if (x(e) !== "object" || e === null) return e;
					var n = e[Symbol.toPrimitive];
					if (n !== void 0) {
						var r = n.call(e, "string");
						if (x(r) !== "object") return r;
						throw TypeError("@@toPrimitive must return a primitive value.");
					}
					return String(e);
				}(e);
				return x(t) === "symbol" ? t : String(t);
			}
			function T(e, t) {
				return T = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
					return e.__proto__ = t, e;
				}, T(e, t);
			}
			function E(e, t) {
				if (t && (x(t) === "object" || typeof t == "function")) return t;
				if (t !== void 0) throw TypeError("Derived constructors may only return object or undefined");
				return D(e);
			}
			function D(e) {
				if (e === void 0) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
				return e;
			}
			function O(e) {
				return O = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
					return e.__proto__ || Object.getPrototypeOf(e);
				}, O(e);
			}
			var k = function(e) {
				(function(e, t) {
					if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function");
					e.prototype = Object.create(t && t.prototype, { constructor: {
						value: e,
						writable: !0,
						configurable: !0
					} }), Object.defineProperty(e, "prototype", { writable: !1 }), t && T(e, t);
				})(o, e);
				var t, n, r, i, a = (r = o, i = function() {
					if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
					if (typeof Proxy == "function") return !0;
					try {
						return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0;
					} catch {
						return !1;
					}
				}(), function() {
					var e, t = O(r);
					if (i) {
						var n = O(this).constructor;
						e = Reflect.construct(t, arguments, n);
					} else e = t.apply(this, arguments);
					return E(this, e);
				});
				function o() {
					var e, t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
					if (S(this, o), e = a.call(this), typeof navigator.getGamepads != "function") throw Error("This browser does not support gamepad API.");
					return e.options = t, e.onAxis = e.onAxis.bind(D(e)), e.update = e.update.bind(D(e)), e.start = e.start.bind(D(e)), e.stop = e.stop.bind(D(e)), e.discover = e.discover.bind(D(e)), e.onButton = e.onButton.bind(D(e)), e.handlers = [
						,
						,
						,
						,
					].fill(null), e.loop = new b(e.update), window.addEventListener("error", e.stop), e;
				}
				return t = o, (n = [
					{
						key: "start",
						value: function() {
							this.loop.start();
						}
					},
					{
						key: "stop",
						value: function() {
							this.loop.stop();
						}
					},
					{
						key: "update",
						value: function() {
							var e = navigator.getGamepads();
							this.discover(e[0], 0), this.discover(e[1], 1), this.discover(e[2], 2), this.discover(e[3], 3);
						}
					},
					{
						key: "discover",
						value: function(e, t) {
							e ? (this.handlers[t] === null && this.registerHandler(t, e), this.handlers[t].update(e)) : this.handlers[t] && this.removeGamepad(t);
						}
					},
					{
						key: "registerHandler",
						value: function(e, t) {
							var n = new g(e, t, this.options);
							this.handlers[e] = n, n.addEventListener("axis", this.onAxis), n.addEventListener("button", this.onButton), this.emit("gamepad:connected", {
								index: e,
								gamepad: t
							}), this.emit(`gamepad:${e}:connected`, {
								index: e,
								gamepad: t
							});
						}
					},
					{
						key: "removeGamepad",
						value: function(e) {
							var t = this.handlers[e];
							t.removeEventListener("axis", this.onAxis), t.removeEventListener("button", this.onButton), this.handlers[e] = null, this.emit("gamepad:disconnected", { index: e }), this.emit(`gamepad:${e}:disconnected`, { index: e });
						}
					},
					{
						key: "onAxis",
						value: function(e) {
							var t = e.detail.index;
							this.emit("gamepad:axis", e.detail), this.emit(`gamepad:${t}:axis`, e.detail), this.emit(`gamepad:${t}:axis:${e.detail.axis}`, e.detail);
						}
					},
					{
						key: "onButton",
						value: function(e) {
							var t = e.detail.index;
							this.emit("gamepad:button", e.detail), this.emit(`gamepad:${t}:button`, e.detail), this.emit(`gamepad:${t}:button:${e.detail.button}`, e.detail);
						}
					}
				]) && C(t.prototype, n), Object.defineProperty(t, "prototype", { writable: !1 }), o;
			}(t());
		})(), r;
	})()));
}));
export default require_gamepad();

//# sourceMappingURL=gamepad.js.map