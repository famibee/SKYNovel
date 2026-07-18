//#region node_modules/gamepad.js/dist/gamepad.js
var e = class {
	constructor(e, t) {
		this.type = e, this.detail = t;
	}
}, t = class {
	#e = /* @__PURE__ */ new Map();
	constructor() {
		this.addEventListener = this.addEventListener.bind(this), this.removeEventListener = this.removeEventListener.bind(this), this.on = this.addEventListener, this.off = this.removeEventListener;
	}
	emit(t, n) {
		if (!this.#e.has(t)) return;
		let r = this.#e.get(t), i = new e(t, n), { length: a } = r;
		for (let e = 0; e < a; e++) r[e](i);
	}
	addEventListener(e, t) {
		let n = this.#t(e);
		n.indexOf(t) < 0 && n.push(t);
	}
	removeEventListener(e, t) {
		if (!this.#e.has(e)) return;
		let n = this.#e.get(e), r = n.indexOf(t);
		r >= 0 && n.splice(r, 1), n.length === 0 && this.#e.delete(e);
	}
	countEventListeners() {
		return this.#e.size;
	}
	removeAllEventListeners() {
		this.#e.clear();
	}
	#t(e) {
		if (this.#e.has(e)) return this.#e.get(e);
		let t = [];
		return this.#e.set(e, t), t;
	}
};
function n(e) {
	return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var r = { exports: {} }, i = r.exports, a;
function o() {
	return a || (a = 1, (function(e, t) {
		(function(t, n) {
			e.exports = n();
		})(i, (() => (() => {
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
					if (Array.isArray(e) || (n = a(e)) || t) {
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
				return (function(e) {
					if (Array.isArray(e)) return e;
				})(e) || (function(e, t) {
					var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
					if (n != null) {
						var r, i, a, o, s = [], c = !0, l = !1;
						try {
							if (a = (n = n.call(e)).next, t !== 0) for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
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
				})(e, t) || a(e, t) || (function() {
					throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
				})();
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
			function c(e, t) {
				for (var r = 0; r < t.length; r++) {
					var i = t[r];
					i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, (a = (function(e, t) {
						if (n(e) !== "object" || e === null) return e;
						var r = e[Symbol.toPrimitive];
						if (r !== void 0) {
							var i = r.call(e, "string");
							if (n(i) !== "object") return i;
							throw TypeError("@@toPrimitive must return a primitive value.");
						}
						return String(e);
					})(i.key), n(a) === "symbol" ? a : String(a)), i);
				}
				var a;
			}
			e.d(t, { default: () => l });
			var l = (function() {
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
				]) && c(t.prototype, a), Object.defineProperty(t, "prototype", { writable: !1 }), e;
			})();
			return t.default;
		})()));
	})(r)), r.exports;
}
var s = /* @__PURE__ */ n(o()), c = class extends t {
	static optionResolver = new s().setDefaults({
		analog: !0,
		deadZone: 0,
		precision: 0
	}).setTypes({
		analog: "boolean",
		deadZone: "number",
		precision: "number"
	}).setValidators({
		deadZone: (e) => Math.max(Math.min(e, 1), 0),
		precision: (e) => e > 0 ? 10 ** e : 0
	});
	constructor(e, t, n = {}, r = null) {
		super(), this.index = e, this.gamepad = t, this.mapping = r, this.options = this.constructor.resolveOptions(n), this.axes = Array(t.axes.length).fill(null), this.buttons = Array(t.buttons.length).fill(null), this.initAxes(), this.initButtons();
	}
	static resolveOptions(e) {
		let { axis: t, button: n } = e;
		return {
			axis: this.optionResolver.resolve(t ?? n ?? e ?? {}),
			button: this.optionResolver.resolve(n ?? t ?? e ?? {})
		};
	}
	initAxes() {
		let { length: e } = this.axes;
		for (let t = 0; t < e; t++) this.axes[t] = this.resolveAxisValue(t);
	}
	initButtons() {
		let { length: e } = this.buttons;
		for (let t = 0; t < e; t++) this.buttons[t] = this.resolveButtonValue(t);
	}
	update(e) {
		this.gamepad = e, this.updateAxis(), this.updateButtons();
	}
	updateAxis() {
		let { length: e } = this.axes;
		for (let t = 0; t < e; t++) this.setAxisValue(t, this.resolveAxisValue(t));
	}
	updateButtons() {
		let { length: e } = this.buttons;
		for (let t = 0; t < e; t++) this.setButtonValue(t, this.resolveButtonValue(t));
	}
	setAxisValue(e, t) {
		this.axes[e] !== t && (this.axes[e] = t, this.emit("axis", {
			gamepad: this.gamepad,
			index: this.index,
			axis: e,
			label: this.mapping?.getAxis(e) || `Axis ${e}`,
			value: t
		}));
	}
	setButtonValue(e, t) {
		this.buttons[e] !== t && (this.buttons[e] = t, this.emit("button", {
			gamepad: this.gamepad,
			index: this.index,
			button: e,
			pressed: this.gamepad.buttons[e].pressed,
			label: this.mapping?.getButton(e) || `Button ${e}`,
			value: t
		}));
	}
	resolveAxisValue(e) {
		let { deadZone: t, analog: n, precision: r } = this.options.axis, i = this.gamepad.axes[e];
		return t && i < t && i > -t ? 0 : n ? r ? Math.round(i * r) / r : i : i > 0 ? 1 : i < 0 ? -1 : 0;
	}
	resolveButtonValue(e) {
		let { deadZone: t, analog: n, precision: r } = this.options.button, { value: i } = this.gamepad.buttons[e];
		return t > 0 && i < t && i > -t ? 0 : n ? r ? Math.round(i * r) / r : i : i === 0 ? 0 : 1;
	}
}, l = class {
	constructor(e, t) {
		this.type = e, this.detail = t;
	}
}, u = class {
	#e = /* @__PURE__ */ new Map();
	constructor() {
		this.addEventListener = this.addEventListener.bind(this), this.removeEventListener = this.removeEventListener.bind(this), this.on = this.addEventListener, this.off = this.removeEventListener;
	}
	emit(e, t) {
		if (!this.#e.has(e)) return;
		let n = this.#e.get(e), r = new l(e, t), { length: i } = n;
		for (let e = 0; e < i; e++) n[e](r);
	}
	addEventListener(e, t) {
		let n = this.#t(e);
		n.indexOf(t) < 0 && n.push(t);
	}
	removeEventListener(e, t) {
		if (!this.#e.has(e)) return;
		let n = this.#e.get(e), r = n.indexOf(t);
		r >= 0 && n.splice(r, 1), n.length === 0 && this.#e.delete(e);
	}
	countEventListeners() {
		return this.#e.size;
	}
	removeAllEventListeners() {
		this.#e.clear();
	}
	#t(e) {
		if (this.#e.has(e)) return this.#e.get(e);
		let t = [];
		return this.#e.set(e, t), t;
	}
}, d = class {
	constructor(e) {
		this.callback = e, this.frame = null, this.update = this.update.bind(this);
	}
	setCallback(e) {
		this.callback = e;
	}
	start() {
		this.frame ||= window.requestAnimationFrame(this.update);
	}
	stop() {
		this.frame &&= (window.cancelAnimationFrame(this.frame), null);
	}
	update() {
		this.frame = window.requestAnimationFrame(this.update), this.callback();
	}
}, f = class extends u {
	constructor(e = {}, t = []) {
		if (super(), typeof navigator.getGamepads != "function") throw Error("This browser does not support gamepad API.");
		this.options = e, this.mappings = t, this.onAxis = this.onAxis.bind(this), this.update = this.update.bind(this), this.start = this.start.bind(this), this.stop = this.stop.bind(this), this.discover = this.discover.bind(this), this.onButton = this.onButton.bind(this), this.handlers = [
			,
			,
			,
			,
		].fill(null), this.loop = new d(this.update), window.addEventListener("error", this.stop);
	}
	start() {
		this.loop.start();
	}
	stop() {
		this.loop.stop();
	}
	update() {
		let e = navigator.getGamepads();
		this.discover(e[0], 0), this.discover(e[1], 1), this.discover(e[2], 2), this.discover(e[3], 3);
	}
	discover(e, t) {
		e ? (this.handlers[t] === null && this.registerHandler(t, e), this.handlers[t].update(e)) : this.handlers[t] && this.removeGamepad(t);
	}
	registerHandler(e, t) {
		let n = this.getMapping(t), r = new c(e, t, this.options, n);
		this.handlers[e] = r, r.addEventListener("axis", this.onAxis), r.addEventListener("button", this.onButton);
		let i = {
			index: e,
			gamepad: t,
			mapping: n?.name || null
		};
		this.emit("gamepad:connected", i), this.emit(`gamepad:${e}:connected`, i);
	}
	getMapping(e) {
		return this.mappings.find((t) => t?.match(e)) || null;
	}
	removeGamepad(e) {
		let t = this.handlers[e];
		t.removeEventListener("axis", this.onAxis), t.removeEventListener("button", this.onButton), this.handlers[e] = null, this.emit("gamepad:disconnected", { index: e }), this.emit(`gamepad:${e}:disconnected`, { index: e });
	}
	onAxis(e) {
		let { index: t } = e.detail;
		this.emit("gamepad:axis", e.detail), this.emit(`gamepad:${t}:axis`, e.detail), this.emit(`gamepad:${t}:axis:${e.detail.axis}`, e.detail);
	}
	onButton(e) {
		let { index: t } = e.detail;
		this.emit("gamepad:button", e.detail), this.emit(`gamepad:${t}:button`, e.detail), this.emit(`gamepad:${t}:button:${e.detail.button}`, e.detail);
	}
};
//#endregion
export { f as GamepadListener };

//# sourceMappingURL=gamepad.js.map