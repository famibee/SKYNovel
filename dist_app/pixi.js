import { r as e, t } from "./rolldown-runtime.js";
import { format as n, parse as r, resolve as i } from "url";
//#region node_modules/promise-polyfill/src/finally.js
function a(e) {
	var t = this.constructor;
	return this.then(function(n) {
		return t.resolve(e()).then(function() {
			return n;
		});
	}, function(n) {
		return t.resolve(e()).then(function() {
			return t.reject(n);
		});
	});
}
//#endregion
//#region node_modules/promise-polyfill/src/allSettled.js
function o(e) {
	return new this(function(t, n) {
		if (!(e && e.length !== void 0)) return n(/* @__PURE__ */ TypeError(typeof e + " " + e + " is not iterable(cannot read property Symbol(Symbol.iterator))"));
		var r = Array.prototype.slice.call(e);
		if (r.length === 0) return t([]);
		var i = r.length;
		function a(e, n) {
			if (n && (typeof n == "object" || typeof n == "function")) {
				var o = n.then;
				if (typeof o == "function") {
					o.call(n, function(t) {
						a(e, t);
					}, function(n) {
						r[e] = {
							status: "rejected",
							reason: n
						}, --i === 0 && t(r);
					});
					return;
				}
			}
			r[e] = {
				status: "fulfilled",
				value: n
			}, --i === 0 && t(r);
		}
		for (var o = 0; o < r.length; o++) a(o, r[o]);
	});
}
//#endregion
//#region node_modules/promise-polyfill/src/any.js
function s(e, t) {
	this.name = "AggregateError", this.errors = e, this.message = t || "";
}
s.prototype = Error.prototype;
function c(e) {
	var t = this;
	return new t(function(n, r) {
		if (!(e && e.length !== void 0)) return r(/* @__PURE__ */ TypeError("Promise.any accepts an array"));
		var i = Array.prototype.slice.call(e);
		if (i.length === 0) return r();
		for (var a = [], o = 0; o < i.length; o++) try {
			t.resolve(i[o]).then(n).catch(function(e) {
				a.push(e), a.length === i.length && r(new s(a, "All promises were rejected"));
			});
		} catch (e) {
			r(e);
		}
	});
}
//#endregion
//#region node_modules/promise-polyfill/src/index.js
var l = setTimeout;
function u(e) {
	return !!(e && e.length !== void 0);
}
function d() {}
function f(e, t) {
	return function() {
		e.apply(t, arguments);
	};
}
function p(e) {
	if (!(this instanceof p)) throw TypeError("Promises must be constructed via new");
	if (typeof e != "function") throw TypeError("not a function");
	this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], y(e, this);
}
function m(e, t) {
	for (; e._state === 3;) e = e._value;
	if (e._state === 0) {
		e._deferreds.push(t);
		return;
	}
	e._handled = !0, p._immediateFn(function() {
		var n = e._state === 1 ? t.onFulfilled : t.onRejected;
		if (n === null) {
			(e._state === 1 ? h : g)(t.promise, e._value);
			return;
		}
		var r;
		try {
			r = n(e._value);
		} catch (e) {
			g(t.promise, e);
			return;
		}
		h(t.promise, r);
	});
}
function h(e, t) {
	try {
		if (t === e) throw TypeError("A promise cannot be resolved with itself.");
		if (t && (typeof t == "object" || typeof t == "function")) {
			var n = t.then;
			if (t instanceof p) {
				e._state = 3, e._value = t, _(e);
				return;
			} else if (typeof n == "function") {
				y(f(n, t), e);
				return;
			}
		}
		e._state = 1, e._value = t, _(e);
	} catch (t) {
		g(e, t);
	}
}
function g(e, t) {
	e._state = 2, e._value = t, _(e);
}
function _(e) {
	e._state === 2 && e._deferreds.length === 0 && p._immediateFn(function() {
		e._handled || p._unhandledRejectionFn(e._value);
	});
	for (var t = 0, n = e._deferreds.length; t < n; t++) m(e, e._deferreds[t]);
	e._deferreds = null;
}
function v(e, t, n) {
	this.onFulfilled = typeof e == "function" ? e : null, this.onRejected = typeof t == "function" ? t : null, this.promise = n;
}
function y(e, t) {
	var n = !1;
	try {
		e(function(e) {
			n || (n = !0, h(t, e));
		}, function(e) {
			n || (n = !0, g(t, e));
		});
	} catch (e) {
		if (n) return;
		n = !0, g(t, e);
	}
}
p.prototype.catch = function(e) {
	return this.then(null, e);
}, p.prototype.then = function(e, t) {
	var n = new this.constructor(d);
	return m(this, new v(e, t, n)), n;
}, p.prototype.finally = a, p.all = function(e) {
	return new p(function(t, n) {
		if (!u(e)) return n(/* @__PURE__ */ TypeError("Promise.all accepts an array"));
		var r = Array.prototype.slice.call(e);
		if (r.length === 0) return t([]);
		var i = r.length;
		function a(e, o) {
			try {
				if (o && (typeof o == "object" || typeof o == "function")) {
					var s = o.then;
					if (typeof s == "function") {
						s.call(o, function(t) {
							a(e, t);
						}, n);
						return;
					}
				}
				r[e] = o, --i === 0 && t(r);
			} catch (e) {
				n(e);
			}
		}
		for (var o = 0; o < r.length; o++) a(o, r[o]);
	});
}, p.any = c, p.allSettled = o, p.resolve = function(e) {
	return e && typeof e == "object" && e.constructor === p ? e : new p(function(t) {
		t(e);
	});
}, p.reject = function(e) {
	return new p(function(t, n) {
		n(e);
	});
}, p.race = function(e) {
	return new p(function(t, n) {
		if (!u(e)) return n(/* @__PURE__ */ TypeError("Promise.race accepts an array"));
		for (var r = 0, i = e.length; r < i; r++) p.resolve(e[r]).then(t, n);
	});
}, p._immediateFn = typeof setImmediate == "function" && function(e) {
	setImmediate(e);
} || function(e) {
	l(e, 0);
}, p._unhandledRejectionFn = function(e) {
	typeof console < "u" && console && console.warn("Possible Unhandled Promise Rejection:", e);
};
//#endregion
//#region node_modules/@pixi/polyfill/dist/esm/polyfill.mjs
var b = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
	var n = Object.getOwnPropertySymbols, r = Object.prototype.hasOwnProperty, i = Object.prototype.propertyIsEnumerable;
	function a(e) {
		if (e == null) throw TypeError("Object.assign cannot be called with null or undefined");
		return Object(e);
	}
	function o() {
		try {
			if (!Object.assign) return !1;
			var e = /* @__PURE__ */ new String("abc");
			if (e[5] = "de", Object.getOwnPropertyNames(e)[0] === "5") return !1;
			for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;
			if (Object.getOwnPropertyNames(t).map(function(e) {
				return t[e];
			}).join("") !== "0123456789") return !1;
			var r = {};
			return "abcdefghijklmnopqrst".split("").forEach(function(e) {
				r[e] = e;
			}), Object.keys(Object.assign({}, r)).join("") === "abcdefghijklmnopqrst";
		} catch {
			return !1;
		}
	}
	t.exports = o() ? Object.assign : function(e, t) {
		for (var o, s = a(e), c, l = 1; l < arguments.length; l++) {
			for (var u in o = Object(arguments[l]), o) r.call(o, u) && (s[u] = o[u]);
			if (n) {
				c = n(o);
				for (var d = 0; d < c.length; d++) i.call(o, c[d]) && (s[c[d]] = o[c[d]]);
			}
		}
		return s;
	};
})))(), 1);
typeof globalThis > "u" && (typeof self < "u" ? self.globalThis = self : typeof global < "u" && (global.globalThis = global)), globalThis.Promise || (globalThis.Promise = p), Object.assign || (Object.assign = b.default);
var x = 16;
if (Date.now && Date.prototype.getTime || (Date.now = function() {
	return (/* @__PURE__ */ new Date()).getTime();
}), !(globalThis.performance && globalThis.performance.now)) {
	var S = Date.now();
	globalThis.performance || (globalThis.performance = {}), globalThis.performance.now = function() {
		return Date.now() - S;
	};
}
for (var C = Date.now(), w = [
	"ms",
	"moz",
	"webkit",
	"o"
], T = 0; T < w.length && !globalThis.requestAnimationFrame; ++T) {
	var E = w[T];
	globalThis.requestAnimationFrame = globalThis[E + "RequestAnimationFrame"], globalThis.cancelAnimationFrame = globalThis[E + "CancelAnimationFrame"] || globalThis[E + "CancelRequestAnimationFrame"];
}
globalThis.requestAnimationFrame || (globalThis.requestAnimationFrame = function(e) {
	if (typeof e != "function") throw TypeError(e + "is not a function");
	var t = Date.now(), n = x + C - t;
	return n < 0 && (n = 0), C = t, globalThis.self.setTimeout(function() {
		C = Date.now(), e(performance.now());
	}, n);
}), globalThis.cancelAnimationFrame || (globalThis.cancelAnimationFrame = function(e) {
	return clearTimeout(e);
}), Math.sign || (Math.sign = function(e) {
	return e = Number(e), e === 0 || isNaN(e) ? e : e > 0 ? 1 : -1;
}), Number.isInteger || (Number.isInteger = function(e) {
	return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}), globalThis.ArrayBuffer || (globalThis.ArrayBuffer = Array), globalThis.Float32Array || (globalThis.Float32Array = Array), globalThis.Uint32Array || (globalThis.Uint32Array = Array), globalThis.Uint16Array || (globalThis.Uint16Array = Array), globalThis.Uint8Array || (globalThis.Uint8Array = Array), globalThis.Int32Array || (globalThis.Int32Array = Array);
//#endregion
//#region node_modules/@pixi/constants/dist/esm/constants.mjs
var D;
(function(e) {
	e[e.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", e[e.WEBGL = 1] = "WEBGL", e[e.WEBGL2 = 2] = "WEBGL2";
})(D ||= {});
var O;
(function(e) {
	e[e.UNKNOWN = 0] = "UNKNOWN", e[e.WEBGL = 1] = "WEBGL", e[e.CANVAS = 2] = "CANVAS";
})(O ||= {});
var k;
(function(e) {
	e[e.COLOR = 16384] = "COLOR", e[e.DEPTH = 256] = "DEPTH", e[e.STENCIL = 1024] = "STENCIL";
})(k ||= {});
var A;
(function(e) {
	e[e.NORMAL = 0] = "NORMAL", e[e.ADD = 1] = "ADD", e[e.MULTIPLY = 2] = "MULTIPLY", e[e.SCREEN = 3] = "SCREEN", e[e.OVERLAY = 4] = "OVERLAY", e[e.DARKEN = 5] = "DARKEN", e[e.LIGHTEN = 6] = "LIGHTEN", e[e.COLOR_DODGE = 7] = "COLOR_DODGE", e[e.COLOR_BURN = 8] = "COLOR_BURN", e[e.HARD_LIGHT = 9] = "HARD_LIGHT", e[e.SOFT_LIGHT = 10] = "SOFT_LIGHT", e[e.DIFFERENCE = 11] = "DIFFERENCE", e[e.EXCLUSION = 12] = "EXCLUSION", e[e.HUE = 13] = "HUE", e[e.SATURATION = 14] = "SATURATION", e[e.COLOR = 15] = "COLOR", e[e.LUMINOSITY = 16] = "LUMINOSITY", e[e.NORMAL_NPM = 17] = "NORMAL_NPM", e[e.ADD_NPM = 18] = "ADD_NPM", e[e.SCREEN_NPM = 19] = "SCREEN_NPM", e[e.NONE = 20] = "NONE", e[e.SRC_OVER = 0] = "SRC_OVER", e[e.SRC_IN = 21] = "SRC_IN", e[e.SRC_OUT = 22] = "SRC_OUT", e[e.SRC_ATOP = 23] = "SRC_ATOP", e[e.DST_OVER = 24] = "DST_OVER", e[e.DST_IN = 25] = "DST_IN", e[e.DST_OUT = 26] = "DST_OUT", e[e.DST_ATOP = 27] = "DST_ATOP", e[e.ERASE = 26] = "ERASE", e[e.SUBTRACT = 28] = "SUBTRACT", e[e.XOR = 29] = "XOR";
})(A ||= {});
var j;
(function(e) {
	e[e.POINTS = 0] = "POINTS", e[e.LINES = 1] = "LINES", e[e.LINE_LOOP = 2] = "LINE_LOOP", e[e.LINE_STRIP = 3] = "LINE_STRIP", e[e.TRIANGLES = 4] = "TRIANGLES", e[e.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", e[e.TRIANGLE_FAN = 6] = "TRIANGLE_FAN";
})(j ||= {});
var M;
(function(e) {
	e[e.RGBA = 6408] = "RGBA", e[e.RGB = 6407] = "RGB", e[e.RG = 33319] = "RG", e[e.RED = 6403] = "RED", e[e.RGBA_INTEGER = 36249] = "RGBA_INTEGER", e[e.RGB_INTEGER = 36248] = "RGB_INTEGER", e[e.RG_INTEGER = 33320] = "RG_INTEGER", e[e.RED_INTEGER = 36244] = "RED_INTEGER", e[e.ALPHA = 6406] = "ALPHA", e[e.LUMINANCE = 6409] = "LUMINANCE", e[e.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", e[e.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", e[e.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL";
})(M ||= {});
var N;
(function(e) {
	e[e.TEXTURE_2D = 3553] = "TEXTURE_2D", e[e.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", e[e.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", e[e.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", e[e.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", e[e.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", e[e.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", e[e.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", e[e.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
})(N ||= {});
var P;
(function(e) {
	e[e.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", e[e.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", e[e.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", e[e.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", e[e.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", e[e.UNSIGNED_INT = 5125] = "UNSIGNED_INT", e[e.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", e[e.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", e[e.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", e[e.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", e[e.BYTE = 5120] = "BYTE", e[e.SHORT = 5122] = "SHORT", e[e.INT = 5124] = "INT", e[e.FLOAT = 5126] = "FLOAT", e[e.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", e[e.HALF_FLOAT = 36193] = "HALF_FLOAT";
})(P ||= {});
var ee;
(function(e) {
	e[e.FLOAT = 0] = "FLOAT", e[e.INT = 1] = "INT", e[e.UINT = 2] = "UINT";
})(ee ||= {});
var te;
(function(e) {
	e[e.NEAREST = 0] = "NEAREST", e[e.LINEAR = 1] = "LINEAR";
})(te ||= {});
var ne;
(function(e) {
	e[e.CLAMP = 33071] = "CLAMP", e[e.REPEAT = 10497] = "REPEAT", e[e.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT";
})(ne ||= {});
var re;
(function(e) {
	e[e.OFF = 0] = "OFF", e[e.POW2 = 1] = "POW2", e[e.ON = 2] = "ON", e[e.ON_MANUAL = 3] = "ON_MANUAL";
})(re ||= {});
var ie;
(function(e) {
	e[e.NPM = 0] = "NPM", e[e.UNPACK = 1] = "UNPACK", e[e.PMA = 2] = "PMA", e[e.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", e[e.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", e[e.PREMULTIPLY_ALPHA = 2] = "PREMULTIPLY_ALPHA", e[e.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA";
})(ie ||= {});
var F;
(function(e) {
	e[e.NO = 0] = "NO", e[e.YES = 1] = "YES", e[e.AUTO = 2] = "AUTO", e[e.BLEND = 0] = "BLEND", e[e.CLEAR = 1] = "CLEAR", e[e.BLIT = 2] = "BLIT";
})(F ||= {});
var ae;
(function(e) {
	e[e.AUTO = 0] = "AUTO", e[e.MANUAL = 1] = "MANUAL";
})(ae ||= {});
var oe;
(function(e) {
	e.LOW = "lowp", e.MEDIUM = "mediump", e.HIGH = "highp";
})(oe ||= {});
var I;
(function(e) {
	e[e.NONE = 0] = "NONE", e[e.SCISSOR = 1] = "SCISSOR", e[e.STENCIL = 2] = "STENCIL", e[e.SPRITE = 3] = "SPRITE", e[e.COLOR = 4] = "COLOR";
})(I ||= {});
var se;
(function(e) {
	e[e.RED = 1] = "RED", e[e.GREEN = 2] = "GREEN", e[e.BLUE = 4] = "BLUE", e[e.ALPHA = 8] = "ALPHA";
})(se ||= {});
var L;
(function(e) {
	e[e.NONE = 0] = "NONE", e[e.LOW = 2] = "LOW", e[e.MEDIUM = 4] = "MEDIUM", e[e.HIGH = 8] = "HIGH";
})(L ||= {});
var R;
(function(e) {
	e[e.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", e[e.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", e[e.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER";
})(R ||= {});
//#endregion
//#region node_modules/@pixi/settings/dist/esm/settings.mjs
var z = {
	createCanvas: function(e, t) {
		var n = document.createElement("canvas");
		return n.width = e, n.height = t, n;
	},
	getWebGLRenderingContext: function() {
		return WebGLRenderingContext;
	},
	getNavigator: function() {
		return navigator;
	},
	getBaseUrl: function() {
		return document.baseURI ?? window.location.href;
	},
	fetch: function(e, t) {
		return fetch(e, t);
	}
}, ce = /iPhone/i, le = /iPod/i, B = /iPad/i, ue = /\biOS-universal(?:.+)Mac\b/i, de = /\bAndroid(?:.+)Mobile\b/i, fe = /Android/i, pe = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i, me = /Silk/i, he = /Windows Phone/i, ge = /\bWindows(?:.+)ARM\b/i, _e = /BlackBerry/i, ve = /BB10/i, ye = /Opera Mini/i, be = /\b(CriOS|Chrome)(?:.+)Mobile/i, xe = /Mobile(?:.+)Firefox\b/i, Se = function(e) {
	return e !== void 0 && e.platform === "MacIntel" && typeof e.maxTouchPoints == "number" && e.maxTouchPoints > 1 && typeof MSStream > "u";
};
function Ce(e) {
	return function(t) {
		return t.test(e);
	};
}
function we(e) {
	var t = {
		userAgent: "",
		platform: "",
		maxTouchPoints: 0
	};
	!e && typeof navigator < "u" ? t = {
		userAgent: navigator.userAgent,
		platform: navigator.platform,
		maxTouchPoints: navigator.maxTouchPoints || 0
	} : typeof e == "string" ? t.userAgent = e : e && e.userAgent && (t = {
		userAgent: e.userAgent,
		platform: e.platform,
		maxTouchPoints: e.maxTouchPoints || 0
	});
	var n = t.userAgent, r = n.split("[FBAN");
	r[1] !== void 0 && (n = r[0]), r = n.split("Twitter"), r[1] !== void 0 && (n = r[0]);
	var i = Ce(n), a = {
		apple: {
			phone: i(ce) && !i(he),
			ipod: i(le),
			tablet: !i(ce) && (i(B) || Se(t)) && !i(he),
			universal: i(ue),
			device: (i(ce) || i(le) || i(B) || i(ue) || Se(t)) && !i(he)
		},
		amazon: {
			phone: i(pe),
			tablet: !i(pe) && i(me),
			device: i(pe) || i(me)
		},
		android: {
			phone: !i(he) && i(pe) || !i(he) && i(de),
			tablet: !i(he) && !i(pe) && !i(de) && (i(me) || i(fe)),
			device: !i(he) && (i(pe) || i(me) || i(de) || i(fe)) || i(/\bokhttp\b/i)
		},
		windows: {
			phone: i(he),
			tablet: i(ge),
			device: i(he) || i(ge)
		},
		other: {
			blackberry: i(_e),
			blackberry10: i(ve),
			opera: i(ye),
			firefox: i(xe),
			chrome: i(be),
			device: i(_e) || i(ve) || i(ye) || i(xe) || i(be)
		},
		any: !1,
		phone: !1,
		tablet: !1
	};
	return a.any = a.apple.device || a.android.device || a.windows.device || a.other.device, a.phone = a.apple.phone || a.android.phone || a.windows.phone, a.tablet = a.apple.tablet || a.android.tablet || a.windows.tablet, a;
}
var Te = we(globalThis.navigator);
function Ee() {
	return !Te.apple.device;
}
function De(e) {
	var t = !0;
	if (Te.tablet || Te.phone) {
		if (Te.apple.device) {
			var n = navigator.userAgent.match(/OS (\d+)_(\d+)?/);
			if (n) {
				var r = parseInt(n[1], 10);
				r < 11 && (t = !1);
			}
		}
		if (Te.android.device) {
			var n = navigator.userAgent.match(/Android\s([0-9.]*)/);
			if (n) {
				var r = parseInt(n[1], 10);
				r < 7 && (t = !1);
			}
		}
	}
	return t ? e : 4;
}
var V = {
	ADAPTER: z,
	MIPMAP_TEXTURES: re.POW2,
	ANISOTROPIC_LEVEL: 0,
	RESOLUTION: 1,
	FILTER_RESOLUTION: 1,
	FILTER_MULTISAMPLE: L.NONE,
	SPRITE_MAX_TEXTURES: De(32),
	SPRITE_BATCH_SIZE: 4096,
	RENDER_OPTIONS: {
		view: null,
		width: 800,
		height: 600,
		autoDensity: !1,
		backgroundColor: 0,
		backgroundAlpha: 1,
		useContextAlpha: !0,
		clearBeforeRender: !0,
		antialias: !1,
		preserveDrawingBuffer: !1
	},
	GC_MODE: ae.AUTO,
	GC_MAX_IDLE: 3600,
	GC_MAX_CHECK_COUNT: 600,
	WRAP_MODE: ne.CLAMP,
	SCALE_MODE: te.LINEAR,
	PRECISION_VERTEX: oe.HIGH,
	PRECISION_FRAGMENT: Te.apple.device ? oe.HIGH : oe.MEDIUM,
	CAN_UPLOAD_SAME_BUFFER: Ee(),
	CREATE_IMAGE_BITMAP: !1,
	ROUND_PIXELS: !1
}, Oe = /* @__PURE__ */ t(((e, t) => {
	var n = Object.prototype.hasOwnProperty, r = "~";
	function i() {}
	Object.create && (i.prototype = Object.create(null), new i().__proto__ || (r = !1));
	function a(e, t, n) {
		this.fn = e, this.context = t, this.once = n || !1;
	}
	function o(e, t, n, i, o) {
		if (typeof n != "function") throw TypeError("The listener must be a function");
		var s = new a(n, i || e, o), c = r ? r + t : t;
		return e._events[c] ? e._events[c].fn ? e._events[c] = [e._events[c], s] : e._events[c].push(s) : (e._events[c] = s, e._eventsCount++), e;
	}
	function s(e, t) {
		--e._eventsCount === 0 ? e._events = new i() : delete e._events[t];
	}
	function c() {
		this._events = new i(), this._eventsCount = 0;
	}
	c.prototype.eventNames = function() {
		var e = [], t, i;
		if (this._eventsCount === 0) return e;
		for (i in t = this._events) n.call(t, i) && e.push(r ? i.slice(1) : i);
		return Object.getOwnPropertySymbols ? e.concat(Object.getOwnPropertySymbols(t)) : e;
	}, c.prototype.listeners = function(e) {
		var t = r ? r + e : e, n = this._events[t];
		if (!n) return [];
		if (n.fn) return [n.fn];
		for (var i = 0, a = n.length, o = Array(a); i < a; i++) o[i] = n[i].fn;
		return o;
	}, c.prototype.listenerCount = function(e) {
		var t = r ? r + e : e, n = this._events[t];
		return n ? n.fn ? 1 : n.length : 0;
	}, c.prototype.emit = function(e, t, n, i, a, o) {
		var s = r ? r + e : e;
		if (!this._events[s]) return !1;
		var c = this._events[s], l = arguments.length, u, d;
		if (c.fn) {
			switch (c.once && this.removeListener(e, c.fn, void 0, !0), l) {
				case 1: return c.fn.call(c.context), !0;
				case 2: return c.fn.call(c.context, t), !0;
				case 3: return c.fn.call(c.context, t, n), !0;
				case 4: return c.fn.call(c.context, t, n, i), !0;
				case 5: return c.fn.call(c.context, t, n, i, a), !0;
				case 6: return c.fn.call(c.context, t, n, i, a, o), !0;
			}
			for (d = 1, u = Array(l - 1); d < l; d++) u[d - 1] = arguments[d];
			c.fn.apply(c.context, u);
		} else {
			var f = c.length, p;
			for (d = 0; d < f; d++) switch (c[d].once && this.removeListener(e, c[d].fn, void 0, !0), l) {
				case 1:
					c[d].fn.call(c[d].context);
					break;
				case 2:
					c[d].fn.call(c[d].context, t);
					break;
				case 3:
					c[d].fn.call(c[d].context, t, n);
					break;
				case 4:
					c[d].fn.call(c[d].context, t, n, i);
					break;
				default:
					if (!u) for (p = 1, u = Array(l - 1); p < l; p++) u[p - 1] = arguments[p];
					c[d].fn.apply(c[d].context, u);
			}
		}
		return !0;
	}, c.prototype.on = function(e, t, n) {
		return o(this, e, t, n, !1);
	}, c.prototype.once = function(e, t, n) {
		return o(this, e, t, n, !0);
	}, c.prototype.removeListener = function(e, t, n, i) {
		var a = r ? r + e : e;
		if (!this._events[a]) return this;
		if (!t) return s(this, a), this;
		var o = this._events[a];
		if (o.fn) o.fn === t && (!i || o.once) && (!n || o.context === n) && s(this, a);
		else {
			for (var c = 0, l = [], u = o.length; c < u; c++) (o[c].fn !== t || i && !o[c].once || n && o[c].context !== n) && l.push(o[c]);
			l.length ? this._events[a] = l.length === 1 ? l[0] : l : s(this, a);
		}
		return this;
	}, c.prototype.removeAllListeners = function(e) {
		var t;
		return e ? (t = r ? r + e : e, this._events[t] && s(this, t)) : (this._events = new i(), this._eventsCount = 0), this;
	}, c.prototype.off = c.prototype.removeListener, c.prototype.addListener = c.prototype.on, c.prefixed = r, c.EventEmitter = c, t !== void 0 && (t.exports = c);
})), ke = /* @__PURE__ */ t(((e, t) => {
	t.exports = n, t.exports.default = n;
	function n(e, t, n) {
		n ||= 2;
		var i = t && t.length, o = i ? t[0] * n : e.length, s = r(e, 0, o, n, !0), c = [];
		if (!s || s.next === s.prev) return c;
		var l, d, f, p, m, h, g;
		if (i && (s = u(e, t, s, n)), e.length > 80 * n) {
			l = f = e[0], d = p = e[1];
			for (var _ = n; _ < o; _ += n) m = e[_], h = e[_ + 1], m < l && (l = m), h < d && (d = h), m > f && (f = m), h > p && (p = h);
			g = Math.max(f - l, p - d), g = g === 0 ? 0 : 32767 / g;
		}
		return a(s, c, n, l, d, g, 0), c;
	}
	function r(e, t, n, r, i) {
		var a, o;
		if (i === N(e, t, n, r) > 0) for (a = t; a < n; a += r) o = A(a, e[a], e[a + 1], o);
		else for (a = n - r; a >= t; a -= r) o = A(a, e[a], e[a + 1], o);
		return o && S(o, o.next) && (j(o), o = o.next), o;
	}
	function i(e, t) {
		if (!e) return e;
		t ||= e;
		var n = e, r;
		do
			if (r = !1, !n.steiner && (S(n, n.next) || x(n.prev, n, n.next) === 0)) {
				if (j(n), n = t = n.prev, n === n.next) break;
				r = !0;
			} else n = n.next;
		while (r || n !== t);
		return t;
	}
	function a(e, t, n, r, u, d, f) {
		if (e) {
			!f && d && h(e, r, u, d);
			for (var p = e, m, g; e.prev !== e.next;) {
				if (m = e.prev, g = e.next, d ? s(e, r, u, d) : o(e)) {
					t.push(m.i / n | 0), t.push(e.i / n | 0), t.push(g.i / n | 0), j(e), e = g.next, p = g.next;
					continue;
				}
				if (e = g, e === p) {
					f ? f === 1 ? (e = c(i(e), t, n), a(e, t, n, r, u, d, 2)) : f === 2 && l(e, t, n, r, u, d) : a(i(e), t, n, r, u, d, 1);
					break;
				}
			}
		}
	}
	function o(e) {
		var t = e.prev, n = e, r = e.next;
		if (x(t, n, r) >= 0) return !1;
		for (var i = t.x, a = n.x, o = r.x, s = t.y, c = n.y, l = r.y, u = i < a ? i < o ? i : o : a < o ? a : o, d = s < c ? s < l ? s : l : c < l ? c : l, f = i > a ? i > o ? i : o : a > o ? a : o, p = s > c ? s > l ? s : l : c > l ? c : l, m = r.next; m !== t;) {
			if (m.x >= u && m.x <= f && m.y >= d && m.y <= p && y(i, s, a, c, o, l, m.x, m.y) && x(m.prev, m, m.next) >= 0) return !1;
			m = m.next;
		}
		return !0;
	}
	function s(e, t, n, r) {
		var i = e.prev, a = e, o = e.next;
		if (x(i, a, o) >= 0) return !1;
		for (var s = i.x, c = a.x, l = o.x, u = i.y, d = a.y, f = o.y, p = s < c ? s < l ? s : l : c < l ? c : l, m = u < d ? u < f ? u : f : d < f ? d : f, h = s > c ? s > l ? s : l : c > l ? c : l, g = u > d ? u > f ? u : f : d > f ? d : f, v = _(p, m, t, n, r), b = _(h, g, t, n, r), S = e.prevZ, C = e.nextZ; S && S.z >= v && C && C.z <= b;) {
			if (S.x >= p && S.x <= h && S.y >= m && S.y <= g && S !== i && S !== o && y(s, u, c, d, l, f, S.x, S.y) && x(S.prev, S, S.next) >= 0 || (S = S.prevZ, C.x >= p && C.x <= h && C.y >= m && C.y <= g && C !== i && C !== o && y(s, u, c, d, l, f, C.x, C.y) && x(C.prev, C, C.next) >= 0)) return !1;
			C = C.nextZ;
		}
		for (; S && S.z >= v;) {
			if (S.x >= p && S.x <= h && S.y >= m && S.y <= g && S !== i && S !== o && y(s, u, c, d, l, f, S.x, S.y) && x(S.prev, S, S.next) >= 0) return !1;
			S = S.prevZ;
		}
		for (; C && C.z <= b;) {
			if (C.x >= p && C.x <= h && C.y >= m && C.y <= g && C !== i && C !== o && y(s, u, c, d, l, f, C.x, C.y) && x(C.prev, C, C.next) >= 0) return !1;
			C = C.nextZ;
		}
		return !0;
	}
	function c(e, t, n) {
		var r = e;
		do {
			var a = r.prev, o = r.next.next;
			!S(a, o) && C(a, r, r.next, o) && D(a, o) && D(o, a) && (t.push(a.i / n | 0), t.push(r.i / n | 0), t.push(o.i / n | 0), j(r), j(r.next), r = e = o), r = r.next;
		} while (r !== e);
		return i(r);
	}
	function l(e, t, n, r, o, s) {
		var c = e;
		do {
			for (var l = c.next.next; l !== c.prev;) {
				if (c.i !== l.i && b(c, l)) {
					var u = k(c, l);
					c = i(c, c.next), u = i(u, u.next), a(c, t, n, r, o, s, 0), a(u, t, n, r, o, s, 0);
					return;
				}
				l = l.next;
			}
			c = c.next;
		} while (c !== e);
	}
	function u(e, t, n, i) {
		var a = [], o, s, c, l, u;
		for (o = 0, s = t.length; o < s; o++) c = t[o] * i, l = o < s - 1 ? t[o + 1] * i : e.length, u = r(e, c, l, i, !1), u === u.next && (u.steiner = !0), a.push(v(u));
		for (a.sort(d), o = 0; o < a.length; o++) n = f(a[o], n);
		return n;
	}
	function d(e, t) {
		return e.x - t.x;
	}
	function f(e, t) {
		var n = p(e, t);
		if (!n) return t;
		var r = k(n, e);
		return i(r, r.next), i(n, n.next);
	}
	function p(e, t) {
		var n = t, r = e.x, i = e.y, a = -Infinity, o;
		do {
			if (i <= n.y && i >= n.next.y && n.next.y !== n.y) {
				var s = n.x + (i - n.y) * (n.next.x - n.x) / (n.next.y - n.y);
				if (s <= r && s > a && (a = s, o = n.x < n.next.x ? n : n.next, s === r)) return o;
			}
			n = n.next;
		} while (n !== t);
		if (!o) return null;
		var c = o, l = o.x, u = o.y, d = Infinity, f;
		n = o;
		do
			r >= n.x && n.x >= l && r !== n.x && y(i < u ? r : a, i, l, u, i < u ? a : r, i, n.x, n.y) && (f = Math.abs(i - n.y) / (r - n.x), D(n, e) && (f < d || f === d && (n.x > o.x || n.x === o.x && m(o, n))) && (o = n, d = f)), n = n.next;
		while (n !== c);
		return o;
	}
	function m(e, t) {
		return x(e.prev, e, t.prev) < 0 && x(t.next, e, e.next) < 0;
	}
	function h(e, t, n, r) {
		var i = e;
		do
			i.z === 0 && (i.z = _(i.x, i.y, t, n, r)), i.prevZ = i.prev, i.nextZ = i.next, i = i.next;
		while (i !== e);
		i.prevZ.nextZ = null, i.prevZ = null, g(i);
	}
	function g(e) {
		var t, n, r, i, a, o, s, c, l = 1;
		do {
			for (n = e, e = null, a = null, o = 0; n;) {
				for (o++, r = n, s = 0, t = 0; t < l && (s++, r = r.nextZ, r); t++);
				for (c = l; s > 0 || c > 0 && r;) s !== 0 && (c === 0 || !r || n.z <= r.z) ? (i = n, n = n.nextZ, s--) : (i = r, r = r.nextZ, c--), a ? a.nextZ = i : e = i, i.prevZ = a, a = i;
				n = r;
			}
			a.nextZ = null, l *= 2;
		} while (o > 1);
		return e;
	}
	function _(e, t, n, r, i) {
		return e = (e - n) * i | 0, t = (t - r) * i | 0, e = (e | e << 8) & 16711935, e = (e | e << 4) & 252645135, e = (e | e << 2) & 858993459, e = (e | e << 1) & 1431655765, t = (t | t << 8) & 16711935, t = (t | t << 4) & 252645135, t = (t | t << 2) & 858993459, t = (t | t << 1) & 1431655765, e | t << 1;
	}
	function v(e) {
		var t = e, n = e;
		do
			(t.x < n.x || t.x === n.x && t.y < n.y) && (n = t), t = t.next;
		while (t !== e);
		return n;
	}
	function y(e, t, n, r, i, a, o, s) {
		return (i - o) * (t - s) >= (e - o) * (a - s) && (e - o) * (r - s) >= (n - o) * (t - s) && (n - o) * (a - s) >= (i - o) * (r - s);
	}
	function b(e, t) {
		return e.next.i !== t.i && e.prev.i !== t.i && !E(e, t) && (D(e, t) && D(t, e) && O(e, t) && (x(e.prev, e, t.prev) || x(e, t.prev, t)) || S(e, t) && x(e.prev, e, e.next) > 0 && x(t.prev, t, t.next) > 0);
	}
	function x(e, t, n) {
		return (t.y - e.y) * (n.x - t.x) - (t.x - e.x) * (n.y - t.y);
	}
	function S(e, t) {
		return e.x === t.x && e.y === t.y;
	}
	function C(e, t, n, r) {
		var i = T(x(e, t, n)), a = T(x(e, t, r)), o = T(x(n, r, e)), s = T(x(n, r, t));
		return !!(i !== a && o !== s || i === 0 && w(e, n, t) || a === 0 && w(e, r, t) || o === 0 && w(n, e, r) || s === 0 && w(n, t, r));
	}
	function w(e, t, n) {
		return t.x <= Math.max(e.x, n.x) && t.x >= Math.min(e.x, n.x) && t.y <= Math.max(e.y, n.y) && t.y >= Math.min(e.y, n.y);
	}
	function T(e) {
		return e > 0 ? 1 : e < 0 ? -1 : 0;
	}
	function E(e, t) {
		var n = e;
		do {
			if (n.i !== e.i && n.next.i !== e.i && n.i !== t.i && n.next.i !== t.i && C(n, n.next, e, t)) return !0;
			n = n.next;
		} while (n !== e);
		return !1;
	}
	function D(e, t) {
		return x(e.prev, e, e.next) < 0 ? x(e, t, e.next) >= 0 && x(e, e.prev, t) >= 0 : x(e, t, e.prev) < 0 || x(e, e.next, t) < 0;
	}
	function O(e, t) {
		var n = e, r = !1, i = (e.x + t.x) / 2, a = (e.y + t.y) / 2;
		do
			n.y > a != n.next.y > a && n.next.y !== n.y && i < (n.next.x - n.x) * (a - n.y) / (n.next.y - n.y) + n.x && (r = !r), n = n.next;
		while (n !== e);
		return r;
	}
	function k(e, t) {
		var n = new M(e.i, e.x, e.y), r = new M(t.i, t.x, t.y), i = e.next, a = t.prev;
		return e.next = t, t.prev = e, n.next = i, i.prev = n, r.next = n, n.prev = r, a.next = r, r.prev = a, r;
	}
	function A(e, t, n, r) {
		var i = new M(e, t, n);
		return r ? (i.next = r.next, i.prev = r, r.next.prev = i, r.next = i) : (i.prev = i, i.next = i), i;
	}
	function j(e) {
		e.next.prev = e.prev, e.prev.next = e.next, e.prevZ && (e.prevZ.nextZ = e.nextZ), e.nextZ && (e.nextZ.prevZ = e.prevZ);
	}
	function M(e, t, n) {
		this.i = e, this.x = t, this.y = n, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
	}
	n.deviation = function(e, t, n, r) {
		var i = t && t.length, a = i ? t[0] * n : e.length, o = Math.abs(N(e, 0, a, n));
		if (i) for (var s = 0, c = t.length; s < c; s++) {
			var l = t[s] * n, u = s < c - 1 ? t[s + 1] * n : e.length;
			o -= Math.abs(N(e, l, u, n));
		}
		var d = 0;
		for (s = 0; s < r.length; s += 3) {
			var f = r[s] * n, p = r[s + 1] * n, m = r[s + 2] * n;
			d += Math.abs((e[f] - e[m]) * (e[p + 1] - e[f + 1]) - (e[f] - e[p]) * (e[m + 1] - e[f + 1]));
		}
		return o === 0 && d === 0 ? 0 : Math.abs((d - o) / o);
	};
	function N(e, t, n, r) {
		for (var i = 0, a = t, o = n - r; a < n; a += r) i += (e[o] - e[a]) * (e[a + 1] + e[o + 1]), o = a;
		return i;
	}
	n.flatten = function(e) {
		for (var t = e[0][0].length, n = {
			vertices: [],
			holes: [],
			dimensions: t
		}, r = 0, i = 0; i < e.length; i++) {
			for (var a = 0; a < e[i].length; a++) for (var o = 0; o < t; o++) n.vertices.push(e[i][a][o]);
			i > 0 && (r += e[i - 1].length, n.holes.push(r));
		}
		return n;
	};
})), Ae = /* @__PURE__ */ e(Oe(), 1), je = /* @__PURE__ */ e(ke(), 1), Me = {
	parse: r,
	format: n,
	resolve: i
};
V.RETINA_PREFIX = /@([0-9\.]+)x/, V.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = !1;
var Ne = !1, Pe = "6.5.10";
function Fe() {
	Ne = !0;
}
function Ie(e) {
	var t;
	if (!Ne) {
		if (V.ADAPTER.getNavigator().userAgent.toLowerCase().indexOf("chrome") > -1) {
			var n = [
				"\n %c %c %c PixiJS " + Pe + " - ✰ " + e + " ✰  %c  %c  http://www.pixijs.com/  %c %c ♥%c♥%c♥ \n\n",
				"background: #ff66a5; padding:5px 0;",
				"background: #ff66a5; padding:5px 0;",
				"color: #ff66a5; background: #030307; padding:5px 0;",
				"background: #ff66a5; padding:5px 0;",
				"background: #ffc3dc; padding:5px 0;",
				"background: #ff66a5; padding:5px 0;",
				"color: #ff2424; background: #fff; padding:5px 0;",
				"color: #ff2424; background: #fff; padding:5px 0;",
				"color: #ff2424; background: #fff; padding:5px 0;"
			];
			(t = globalThis.console).log.apply(t, n);
		} else globalThis.console && globalThis.console.log("PixiJS " + Pe + " - " + e + " - http://www.pixijs.com/");
		Ne = !0;
	}
}
var Le;
function Re() {
	return Le === void 0 && (Le = (function() {
		var e = {
			stencil: !0,
			failIfMajorPerformanceCaveat: V.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT
		};
		try {
			if (!V.ADAPTER.getWebGLRenderingContext()) return !1;
			var t = V.ADAPTER.createCanvas(), n = t.getContext("webgl", e) || t.getContext("experimental-webgl", e), r = !!(n && n.getContextAttributes().stencil);
			if (n) {
				var i = n.getExtension("WEBGL_lose_context");
				i && i.loseContext();
			}
			return n = null, r;
		} catch {
			return !1;
		}
	})()), Le;
}
var ze = {
	aliceblue: "#f0f8ff",
	antiquewhite: "#faebd7",
	aqua: "#00ffff",
	aquamarine: "#7fffd4",
	azure: "#f0ffff",
	beige: "#f5f5dc",
	bisque: "#ffe4c4",
	black: "#000000",
	blanchedalmond: "#ffebcd",
	blue: "#0000ff",
	blueviolet: "#8a2be2",
	brown: "#a52a2a",
	burlywood: "#deb887",
	cadetblue: "#5f9ea0",
	chartreuse: "#7fff00",
	chocolate: "#d2691e",
	coral: "#ff7f50",
	cornflowerblue: "#6495ed",
	cornsilk: "#fff8dc",
	crimson: "#dc143c",
	cyan: "#00ffff",
	darkblue: "#00008b",
	darkcyan: "#008b8b",
	darkgoldenrod: "#b8860b",
	darkgray: "#a9a9a9",
	darkgreen: "#006400",
	darkgrey: "#a9a9a9",
	darkkhaki: "#bdb76b",
	darkmagenta: "#8b008b",
	darkolivegreen: "#556b2f",
	darkorange: "#ff8c00",
	darkorchid: "#9932cc",
	darkred: "#8b0000",
	darksalmon: "#e9967a",
	darkseagreen: "#8fbc8f",
	darkslateblue: "#483d8b",
	darkslategray: "#2f4f4f",
	darkslategrey: "#2f4f4f",
	darkturquoise: "#00ced1",
	darkviolet: "#9400d3",
	deeppink: "#ff1493",
	deepskyblue: "#00bfff",
	dimgray: "#696969",
	dimgrey: "#696969",
	dodgerblue: "#1e90ff",
	firebrick: "#b22222",
	floralwhite: "#fffaf0",
	forestgreen: "#228b22",
	fuchsia: "#ff00ff",
	gainsboro: "#dcdcdc",
	ghostwhite: "#f8f8ff",
	goldenrod: "#daa520",
	gold: "#ffd700",
	gray: "#808080",
	green: "#008000",
	greenyellow: "#adff2f",
	grey: "#808080",
	honeydew: "#f0fff0",
	hotpink: "#ff69b4",
	indianred: "#cd5c5c",
	indigo: "#4b0082",
	ivory: "#fffff0",
	khaki: "#f0e68c",
	lavenderblush: "#fff0f5",
	lavender: "#e6e6fa",
	lawngreen: "#7cfc00",
	lemonchiffon: "#fffacd",
	lightblue: "#add8e6",
	lightcoral: "#f08080",
	lightcyan: "#e0ffff",
	lightgoldenrodyellow: "#fafad2",
	lightgray: "#d3d3d3",
	lightgreen: "#90ee90",
	lightgrey: "#d3d3d3",
	lightpink: "#ffb6c1",
	lightsalmon: "#ffa07a",
	lightseagreen: "#20b2aa",
	lightskyblue: "#87cefa",
	lightslategray: "#778899",
	lightslategrey: "#778899",
	lightsteelblue: "#b0c4de",
	lightyellow: "#ffffe0",
	lime: "#00ff00",
	limegreen: "#32cd32",
	linen: "#faf0e6",
	magenta: "#ff00ff",
	maroon: "#800000",
	mediumaquamarine: "#66cdaa",
	mediumblue: "#0000cd",
	mediumorchid: "#ba55d3",
	mediumpurple: "#9370db",
	mediumseagreen: "#3cb371",
	mediumslateblue: "#7b68ee",
	mediumspringgreen: "#00fa9a",
	mediumturquoise: "#48d1cc",
	mediumvioletred: "#c71585",
	midnightblue: "#191970",
	mintcream: "#f5fffa",
	mistyrose: "#ffe4e1",
	moccasin: "#ffe4b5",
	navajowhite: "#ffdead",
	navy: "#000080",
	oldlace: "#fdf5e6",
	olive: "#808000",
	olivedrab: "#6b8e23",
	orange: "#ffa500",
	orangered: "#ff4500",
	orchid: "#da70d6",
	palegoldenrod: "#eee8aa",
	palegreen: "#98fb98",
	paleturquoise: "#afeeee",
	palevioletred: "#db7093",
	papayawhip: "#ffefd5",
	peachpuff: "#ffdab9",
	peru: "#cd853f",
	pink: "#ffc0cb",
	plum: "#dda0dd",
	powderblue: "#b0e0e6",
	purple: "#800080",
	rebeccapurple: "#663399",
	red: "#ff0000",
	rosybrown: "#bc8f8f",
	royalblue: "#4169e1",
	saddlebrown: "#8b4513",
	salmon: "#fa8072",
	sandybrown: "#f4a460",
	seagreen: "#2e8b57",
	seashell: "#fff5ee",
	sienna: "#a0522d",
	silver: "#c0c0c0",
	skyblue: "#87ceeb",
	slateblue: "#6a5acd",
	slategray: "#708090",
	slategrey: "#708090",
	snow: "#fffafa",
	springgreen: "#00ff7f",
	steelblue: "#4682b4",
	tan: "#d2b48c",
	teal: "#008080",
	thistle: "#d8bfd8",
	tomato: "#ff6347",
	turquoise: "#40e0d0",
	violet: "#ee82ee",
	wheat: "#f5deb3",
	white: "#ffffff",
	whitesmoke: "#f5f5f5",
	yellow: "#ffff00",
	yellowgreen: "#9acd32"
};
function Be(e, t) {
	return t === void 0 && (t = []), t[0] = (e >> 16 & 255) / 255, t[1] = (e >> 8 & 255) / 255, t[2] = (e & 255) / 255, t;
}
function Ve(e) {
	var t = e.toString(16);
	return t = "000000".substring(0, 6 - t.length) + t, "#" + t;
}
function He(e) {
	return typeof e == "string" && (e = ze[e.toLowerCase()] || e, e[0] === "#" && (e = e.slice(1))), parseInt(e, 16);
}
function Ue() {
	for (var e = [], t = [], n = 0; n < 32; n++) e[n] = n, t[n] = n;
	e[A.NORMAL_NPM] = A.NORMAL, e[A.ADD_NPM] = A.ADD, e[A.SCREEN_NPM] = A.SCREEN, t[A.NORMAL] = A.NORMAL_NPM, t[A.ADD] = A.ADD_NPM, t[A.SCREEN] = A.SCREEN_NPM;
	var r = [];
	return r.push(t), r.push(e), r;
}
var We = Ue();
function Ge(e, t) {
	return We[+!!t][e];
}
function Ke(e, t, n, r) {
	return n ||= /* @__PURE__ */ new Float32Array(4), r || r === void 0 ? (n[0] = e[0] * t, n[1] = e[1] * t, n[2] = e[2] * t) : (n[0] = e[0], n[1] = e[1], n[2] = e[2]), n[3] = t, n;
}
function qe(e, t) {
	if (t === 1) return (t * 255 << 24) + e;
	if (t === 0) return 0;
	var n = e >> 16 & 255, r = e >> 8 & 255, i = e & 255;
	return n = n * t + .5 | 0, r = r * t + .5 | 0, i = i * t + .5 | 0, (t * 255 << 24) + (n << 16) + (r << 8) + i;
}
function Je(e, t, n, r) {
	return n ||= /* @__PURE__ */ new Float32Array(4), n[0] = (e >> 16 & 255) / 255, n[1] = (e >> 8 & 255) / 255, n[2] = (e & 255) / 255, (r || r === void 0) && (n[0] *= t, n[1] *= t, n[2] *= t), n[3] = t, n;
}
function Ye(e, t) {
	t === void 0 && (t = null);
	var n = e * 6;
	if (t ||= new Uint16Array(n), t.length !== n) throw Error("Out buffer length is incorrect, got " + t.length + " and expected " + n);
	for (var r = 0, i = 0; r < n; r += 6, i += 4) t[r + 0] = i + 0, t[r + 1] = i + 1, t[r + 2] = i + 2, t[r + 3] = i + 0, t[r + 4] = i + 2, t[r + 5] = i + 3;
	return t;
}
function Xe(e) {
	if (e.BYTES_PER_ELEMENT === 4) return e instanceof Float32Array ? "Float32Array" : e instanceof Uint32Array ? "Uint32Array" : "Int32Array";
	if (e.BYTES_PER_ELEMENT === 2) {
		if (e instanceof Uint16Array) return "Uint16Array";
	} else if (e.BYTES_PER_ELEMENT === 1 && e instanceof Uint8Array) return "Uint8Array";
	return null;
}
function Ze(e) {
	return e += +(e === 0), --e, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e + 1;
}
function Qe(e) {
	return !(e & e - 1) && !!e;
}
function $e(e) {
	var t = (e > 65535) << 4;
	e >>>= t;
	var n = (e > 255) << 3;
	return e >>>= n, t |= n, n = (e > 15) << 2, e >>>= n, t |= n, n = (e > 3) << 1, e >>>= n, t |= n, t | e >> 1;
}
function et(e, t, n) {
	var r = e.length, i;
	if (!(t >= r || n === 0)) {
		n = t + n > r ? r - t : n;
		var a = r - n;
		for (i = t; i < a; ++i) e[i] = e[i + n];
		e.length = a;
	}
}
function tt(e) {
	return e === 0 ? 0 : e < 0 ? -1 : 1;
}
var nt = 0;
function rt() {
	return ++nt;
}
var it = {};
function at(e, t, n) {
	if (n === void 0 && (n = 3), !it[t]) {
		var r = (/* @__PURE__ */ Error()).stack;
		r === void 0 ? console.warn("PixiJS Deprecation Warning: ", t + "\nDeprecated since v" + e) : (r = r.split("\n").splice(n).join("\n"), console.groupCollapsed ? (console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", t + "\nDeprecated since v" + e), console.warn(r), console.groupEnd()) : (console.warn("PixiJS Deprecation Warning: ", t + "\nDeprecated since v" + e), console.warn(r))), it[t] = !0;
	}
}
var ot = {}, st = Object.create(null), ct = Object.create(null);
function lt() {
	for (var e in st) delete st[e];
	for (e in ct) delete ct[e];
}
var ut = function() {
	function e(e, t, n) {
		this.canvas = V.ADAPTER.createCanvas(), this.context = this.canvas.getContext("2d"), this.resolution = n || V.RESOLUTION, this.resize(e, t);
	}
	return e.prototype.clear = function() {
		this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}, e.prototype.resize = function(e, t) {
		this.canvas.width = Math.round(e * this.resolution), this.canvas.height = Math.round(t * this.resolution);
	}, e.prototype.destroy = function() {
		this.context = null, this.canvas = null;
	}, Object.defineProperty(e.prototype, "width", {
		get: function() {
			return this.canvas.width;
		},
		set: function(e) {
			this.canvas.width = Math.round(e);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "height", {
		get: function() {
			return this.canvas.height;
		},
		set: function(e) {
			this.canvas.height = Math.round(e);
		},
		enumerable: !1,
		configurable: !0
	}), e;
}();
function dt(e) {
	var t = e.width, n = e.height, r = e.getContext("2d", { willReadFrequently: !0 }), i = r.getImageData(0, 0, t, n).data, a = i.length, o = {
		top: null,
		left: null,
		right: null,
		bottom: null
	}, s = null, c, l, u;
	for (c = 0; c < a; c += 4) i[c + 3] !== 0 && (l = c / 4 % t, u = ~~(c / 4 / t), o.top === null && (o.top = u), (o.left === null || l < o.left) && (o.left = l), (o.right === null || o.right < l) && (o.right = l + 1), (o.bottom === null || o.bottom < u) && (o.bottom = u));
	return o.top !== null && (t = o.right - o.left, n = o.bottom - o.top + 1, s = r.getImageData(o.left, o.top, t, n)), {
		height: n,
		width: t,
		data: s
	};
}
var ft;
function pt(e, t) {
	if (t === void 0 && (t = globalThis.location), e.indexOf("data:") === 0) return "";
	t ||= globalThis.location, ft ||= document.createElement("a"), ft.href = e;
	var n = Me.parse(ft.href), r = !n.port && t.port === "" || n.port === t.port;
	return n.hostname !== t.hostname || !r || n.protocol !== t.protocol ? "anonymous" : "";
}
function mt(e, t) {
	var n = V.RETINA_PREFIX.exec(e);
	return n ? parseFloat(n[1]) : t === void 0 ? 1 : t;
}
//#endregion
//#region node_modules/@pixi/math/dist/esm/math.mjs
var ht = Math.PI * 2, gt = 180 / Math.PI, _t = Math.PI / 180, vt;
(function(e) {
	e[e.POLY = 0] = "POLY", e[e.RECT = 1] = "RECT", e[e.CIRC = 2] = "CIRC", e[e.ELIP = 3] = "ELIP", e[e.RREC = 4] = "RREC";
})(vt ||= {});
var H = function() {
	function e(e, t) {
		e === void 0 && (e = 0), t === void 0 && (t = 0), this.x = 0, this.y = 0, this.x = e, this.y = t;
	}
	return e.prototype.clone = function() {
		return new e(this.x, this.y);
	}, e.prototype.copyFrom = function(e) {
		return this.set(e.x, e.y), this;
	}, e.prototype.copyTo = function(e) {
		return e.set(this.x, this.y), e;
	}, e.prototype.equals = function(e) {
		return e.x === this.x && e.y === this.y;
	}, e.prototype.set = function(e, t) {
		return e === void 0 && (e = 0), t === void 0 && (t = e), this.x = e, this.y = t, this;
	}, e.prototype.toString = function() {
		return "[@pixi/math:Point x=" + this.x + " y=" + this.y + "]";
	}, e;
}(), yt = [
	new H(),
	new H(),
	new H(),
	new H()
], U = function() {
	function e(e, t, n, r) {
		e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0), r === void 0 && (r = 0), this.x = Number(e), this.y = Number(t), this.width = Number(n), this.height = Number(r), this.type = vt.RECT;
	}
	return Object.defineProperty(e.prototype, "left", {
		get: function() {
			return this.x;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "right", {
		get: function() {
			return this.x + this.width;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "top", {
		get: function() {
			return this.y;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "bottom", {
		get: function() {
			return this.y + this.height;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e, "EMPTY", {
		get: function() {
			return new e(0, 0, 0, 0);
		},
		enumerable: !1,
		configurable: !0
	}), e.prototype.clone = function() {
		return new e(this.x, this.y, this.width, this.height);
	}, e.prototype.copyFrom = function(e) {
		return this.x = e.x, this.y = e.y, this.width = e.width, this.height = e.height, this;
	}, e.prototype.copyTo = function(e) {
		return e.x = this.x, e.y = this.y, e.width = this.width, e.height = this.height, e;
	}, e.prototype.contains = function(e, t) {
		return this.width <= 0 || this.height <= 0 ? !1 : e >= this.x && e < this.x + this.width && t >= this.y && t < this.y + this.height;
	}, e.prototype.intersects = function(e, t) {
		if (!t) {
			var n = this.x < e.x ? e.x : this.x;
			if ((this.right > e.right ? e.right : this.right) <= n) return !1;
			var r = this.y < e.y ? e.y : this.y;
			return (this.bottom > e.bottom ? e.bottom : this.bottom) > r;
		}
		var i = this.left, a = this.right, o = this.top, s = this.bottom;
		if (a <= i || s <= o) return !1;
		var c = yt[0].set(e.left, e.top), l = yt[1].set(e.left, e.bottom), u = yt[2].set(e.right, e.top), d = yt[3].set(e.right, e.bottom);
		if (u.x <= c.x || l.y <= c.y) return !1;
		var f = Math.sign(t.a * t.d - t.b * t.c);
		if (f === 0 || (t.apply(c, c), t.apply(l, l), t.apply(u, u), t.apply(d, d), Math.max(c.x, l.x, u.x, d.x) <= i || Math.min(c.x, l.x, u.x, d.x) >= a || Math.max(c.y, l.y, u.y, d.y) <= o || Math.min(c.y, l.y, u.y, d.y) >= s)) return !1;
		var p = f * (l.y - c.y), m = f * (c.x - l.x), h = p * i + m * o, g = p * a + m * o, _ = p * i + m * s, v = p * a + m * s;
		if (Math.max(h, g, _, v) <= p * c.x + m * c.y || Math.min(h, g, _, v) >= p * d.x + m * d.y) return !1;
		var y = f * (c.y - u.y), b = f * (u.x - c.x), x = y * i + b * o, S = y * a + b * o, C = y * i + b * s, w = y * a + b * s;
		return !(Math.max(x, S, C, w) <= y * c.x + b * c.y || Math.min(x, S, C, w) >= y * d.x + b * d.y);
	}, e.prototype.pad = function(e, t) {
		return e === void 0 && (e = 0), t === void 0 && (t = e), this.x -= e, this.y -= t, this.width += e * 2, this.height += t * 2, this;
	}, e.prototype.fit = function(e) {
		var t = Math.max(this.x, e.x), n = Math.min(this.x + this.width, e.x + e.width), r = Math.max(this.y, e.y), i = Math.min(this.y + this.height, e.y + e.height);
		return this.x = t, this.width = Math.max(n - t, 0), this.y = r, this.height = Math.max(i - r, 0), this;
	}, e.prototype.ceil = function(e, t) {
		e === void 0 && (e = 1), t === void 0 && (t = .001);
		var n = Math.ceil((this.x + this.width - t) * e) / e, r = Math.ceil((this.y + this.height - t) * e) / e;
		return this.x = Math.floor((this.x + t) * e) / e, this.y = Math.floor((this.y + t) * e) / e, this.width = n - this.x, this.height = r - this.y, this;
	}, e.prototype.enlarge = function(e) {
		var t = Math.min(this.x, e.x), n = Math.max(this.x + this.width, e.x + e.width), r = Math.min(this.y, e.y), i = Math.max(this.y + this.height, e.y + e.height);
		return this.x = t, this.width = n - t, this.y = r, this.height = i - r, this;
	}, e.prototype.toString = function() {
		return "[@pixi/math:Rectangle x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + "]";
	}, e;
}(), bt = function() {
	function e(e, t, n) {
		e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0), this.x = e, this.y = t, this.radius = n, this.type = vt.CIRC;
	}
	return e.prototype.clone = function() {
		return new e(this.x, this.y, this.radius);
	}, e.prototype.contains = function(e, t) {
		if (this.radius <= 0) return !1;
		var n = this.radius * this.radius, r = this.x - e, i = this.y - t;
		return r *= r, i *= i, r + i <= n;
	}, e.prototype.getBounds = function() {
		return new U(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
	}, e.prototype.toString = function() {
		return "[@pixi/math:Circle x=" + this.x + " y=" + this.y + " radius=" + this.radius + "]";
	}, e;
}(), xt = function() {
	function e(e, t, n, r) {
		e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0), r === void 0 && (r = 0), this.x = e, this.y = t, this.width = n, this.height = r, this.type = vt.ELIP;
	}
	return e.prototype.clone = function() {
		return new e(this.x, this.y, this.width, this.height);
	}, e.prototype.contains = function(e, t) {
		if (this.width <= 0 || this.height <= 0) return !1;
		var n = (e - this.x) / this.width, r = (t - this.y) / this.height;
		return n *= n, r *= r, n + r <= 1;
	}, e.prototype.getBounds = function() {
		return new U(this.x - this.width, this.y - this.height, this.width, this.height);
	}, e.prototype.toString = function() {
		return "[@pixi/math:Ellipse x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + "]";
	}, e;
}(), St = function() {
	function e() {
		for (var e = arguments, t = [], n = 0; n < arguments.length; n++) t[n] = e[n];
		var r = Array.isArray(t[0]) ? t[0] : t;
		if (typeof r[0] != "number") {
			for (var i = [], a = 0, o = r.length; a < o; a++) i.push(r[a].x, r[a].y);
			r = i;
		}
		this.points = r, this.type = vt.POLY, this.closeStroke = !0;
	}
	return e.prototype.clone = function() {
		var t = new e(this.points.slice());
		return t.closeStroke = this.closeStroke, t;
	}, e.prototype.contains = function(e, t) {
		for (var n = !1, r = this.points.length / 2, i = 0, a = r - 1; i < r; a = i++) {
			var o = this.points[i * 2], s = this.points[i * 2 + 1], c = this.points[a * 2], l = this.points[a * 2 + 1];
			s > t != l > t && e < (c - o) * ((t - s) / (l - s)) + o && (n = !n);
		}
		return n;
	}, e.prototype.toString = function() {
		return "[@pixi/math:Polygon" + ("closeStroke=" + this.closeStroke) + ("points=" + this.points.reduce(function(e, t) {
			return e + ", " + t;
		}, "") + "]");
	}, e;
}(), Ct = function() {
	function e(e, t, n, r, i) {
		e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0), r === void 0 && (r = 0), i === void 0 && (i = 20), this.x = e, this.y = t, this.width = n, this.height = r, this.radius = i, this.type = vt.RREC;
	}
	return e.prototype.clone = function() {
		return new e(this.x, this.y, this.width, this.height, this.radius);
	}, e.prototype.contains = function(e, t) {
		if (this.width <= 0 || this.height <= 0) return !1;
		if (e >= this.x && e <= this.x + this.width && t >= this.y && t <= this.y + this.height) {
			var n = Math.max(0, Math.min(this.radius, Math.min(this.width, this.height) / 2));
			if (t >= this.y + n && t <= this.y + this.height - n || e >= this.x + n && e <= this.x + this.width - n) return !0;
			var r = e - (this.x + n), i = t - (this.y + n), a = n * n;
			if (r * r + i * i <= a || (r = e - (this.x + this.width - n), r * r + i * i <= a) || (i = t - (this.y + this.height - n), r * r + i * i <= a) || (r = e - (this.x + n), r * r + i * i <= a)) return !0;
		}
		return !1;
	}, e.prototype.toString = function() {
		return "[@pixi/math:RoundedRectangle x=" + this.x + " y=" + this.y + ("width=" + this.width + " height=" + this.height + " radius=" + this.radius + "]");
	}, e;
}(), wt = function() {
	function e(e, t, n, r) {
		n === void 0 && (n = 0), r === void 0 && (r = 0), this._x = n, this._y = r, this.cb = e, this.scope = t;
	}
	return e.prototype.clone = function(t, n) {
		return t === void 0 && (t = this.cb), n === void 0 && (n = this.scope), new e(t, n, this._x, this._y);
	}, e.prototype.set = function(e, t) {
		return e === void 0 && (e = 0), t === void 0 && (t = e), (this._x !== e || this._y !== t) && (this._x = e, this._y = t, this.cb.call(this.scope)), this;
	}, e.prototype.copyFrom = function(e) {
		return (this._x !== e.x || this._y !== e.y) && (this._x = e.x, this._y = e.y, this.cb.call(this.scope)), this;
	}, e.prototype.copyTo = function(e) {
		return e.set(this._x, this._y), e;
	}, e.prototype.equals = function(e) {
		return e.x === this._x && e.y === this._y;
	}, e.prototype.toString = function() {
		return "[@pixi/math:ObservablePoint x=0 y=0 scope=" + this.scope + "]";
	}, Object.defineProperty(e.prototype, "x", {
		get: function() {
			return this._x;
		},
		set: function(e) {
			this._x !== e && (this._x = e, this.cb.call(this.scope));
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "y", {
		get: function() {
			return this._y;
		},
		set: function(e) {
			this._y !== e && (this._y = e, this.cb.call(this.scope));
		},
		enumerable: !1,
		configurable: !0
	}), e;
}(), W = function() {
	function e(e, t, n, r, i, a) {
		e === void 0 && (e = 1), t === void 0 && (t = 0), n === void 0 && (n = 0), r === void 0 && (r = 1), i === void 0 && (i = 0), a === void 0 && (a = 0), this.array = null, this.a = e, this.b = t, this.c = n, this.d = r, this.tx = i, this.ty = a;
	}
	return e.prototype.fromArray = function(e) {
		this.a = e[0], this.b = e[1], this.c = e[3], this.d = e[4], this.tx = e[2], this.ty = e[5];
	}, e.prototype.set = function(e, t, n, r, i, a) {
		return this.a = e, this.b = t, this.c = n, this.d = r, this.tx = i, this.ty = a, this;
	}, e.prototype.toArray = function(e, t) {
		this.array ||= /* @__PURE__ */ new Float32Array(9);
		var n = t || this.array;
		return e ? (n[0] = this.a, n[1] = this.b, n[2] = 0, n[3] = this.c, n[4] = this.d, n[5] = 0, n[6] = this.tx, n[7] = this.ty, n[8] = 1) : (n[0] = this.a, n[1] = this.c, n[2] = this.tx, n[3] = this.b, n[4] = this.d, n[5] = this.ty, n[6] = 0, n[7] = 0, n[8] = 1), n;
	}, e.prototype.apply = function(e, t) {
		t ||= new H();
		var n = e.x, r = e.y;
		return t.x = this.a * n + this.c * r + this.tx, t.y = this.b * n + this.d * r + this.ty, t;
	}, e.prototype.applyInverse = function(e, t) {
		t ||= new H();
		var n = 1 / (this.a * this.d + this.c * -this.b), r = e.x, i = e.y;
		return t.x = this.d * n * r + -this.c * n * i + (this.ty * this.c - this.tx * this.d) * n, t.y = this.a * n * i + -this.b * n * r + (-this.ty * this.a + this.tx * this.b) * n, t;
	}, e.prototype.translate = function(e, t) {
		return this.tx += e, this.ty += t, this;
	}, e.prototype.scale = function(e, t) {
		return this.a *= e, this.d *= t, this.c *= e, this.b *= t, this.tx *= e, this.ty *= t, this;
	}, e.prototype.rotate = function(e) {
		var t = Math.cos(e), n = Math.sin(e), r = this.a, i = this.c, a = this.tx;
		return this.a = r * t - this.b * n, this.b = r * n + this.b * t, this.c = i * t - this.d * n, this.d = i * n + this.d * t, this.tx = a * t - this.ty * n, this.ty = a * n + this.ty * t, this;
	}, e.prototype.append = function(e) {
		var t = this.a, n = this.b, r = this.c, i = this.d;
		return this.a = e.a * t + e.b * r, this.b = e.a * n + e.b * i, this.c = e.c * t + e.d * r, this.d = e.c * n + e.d * i, this.tx = e.tx * t + e.ty * r + this.tx, this.ty = e.tx * n + e.ty * i + this.ty, this;
	}, e.prototype.setTransform = function(e, t, n, r, i, a, o, s, c) {
		return this.a = Math.cos(o + c) * i, this.b = Math.sin(o + c) * i, this.c = -Math.sin(o - s) * a, this.d = Math.cos(o - s) * a, this.tx = e - (n * this.a + r * this.c), this.ty = t - (n * this.b + r * this.d), this;
	}, e.prototype.prepend = function(e) {
		var t = this.tx;
		if (e.a !== 1 || e.b !== 0 || e.c !== 0 || e.d !== 1) {
			var n = this.a, r = this.c;
			this.a = n * e.a + this.b * e.c, this.b = n * e.b + this.b * e.d, this.c = r * e.a + this.d * e.c, this.d = r * e.b + this.d * e.d;
		}
		return this.tx = t * e.a + this.ty * e.c + e.tx, this.ty = t * e.b + this.ty * e.d + e.ty, this;
	}, e.prototype.decompose = function(e) {
		var t = this.a, n = this.b, r = this.c, i = this.d, a = e.pivot, o = -Math.atan2(-r, i), s = Math.atan2(n, t), c = Math.abs(o + s);
		return c < 1e-5 || Math.abs(ht - c) < 1e-5 ? (e.rotation = s, e.skew.x = e.skew.y = 0) : (e.rotation = 0, e.skew.x = o, e.skew.y = s), e.scale.x = Math.sqrt(t * t + n * n), e.scale.y = Math.sqrt(r * r + i * i), e.position.x = this.tx + (a.x * t + a.y * r), e.position.y = this.ty + (a.x * n + a.y * i), e;
	}, e.prototype.invert = function() {
		var e = this.a, t = this.b, n = this.c, r = this.d, i = this.tx, a = e * r - t * n;
		return this.a = r / a, this.b = -t / a, this.c = -n / a, this.d = e / a, this.tx = (n * this.ty - r * i) / a, this.ty = -(e * this.ty - t * i) / a, this;
	}, e.prototype.identity = function() {
		return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this;
	}, e.prototype.clone = function() {
		var t = new e();
		return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t;
	}, e.prototype.copyTo = function(e) {
		return e.a = this.a, e.b = this.b, e.c = this.c, e.d = this.d, e.tx = this.tx, e.ty = this.ty, e;
	}, e.prototype.copyFrom = function(e) {
		return this.a = e.a, this.b = e.b, this.c = e.c, this.d = e.d, this.tx = e.tx, this.ty = e.ty, this;
	}, e.prototype.toString = function() {
		return "[@pixi/math:Matrix a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + "]";
	}, Object.defineProperty(e, "IDENTITY", {
		get: function() {
			return new e();
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e, "TEMP_MATRIX", {
		get: function() {
			return new e();
		},
		enumerable: !1,
		configurable: !0
	}), e;
}(), Tt = [
	1,
	1,
	0,
	-1,
	-1,
	-1,
	0,
	1,
	1,
	1,
	0,
	-1,
	-1,
	-1,
	0,
	1
], Et = [
	0,
	1,
	1,
	1,
	0,
	-1,
	-1,
	-1,
	0,
	1,
	1,
	1,
	0,
	-1,
	-1,
	-1
], Dt = [
	0,
	-1,
	-1,
	-1,
	0,
	1,
	1,
	1,
	0,
	1,
	1,
	1,
	0,
	-1,
	-1,
	-1
], Ot = [
	1,
	1,
	0,
	-1,
	-1,
	-1,
	0,
	1,
	-1,
	-1,
	0,
	1,
	1,
	1,
	0,
	-1
], kt = [], At = [], jt = Math.sign;
function Mt() {
	for (var e = 0; e < 16; e++) {
		var t = [];
		kt.push(t);
		for (var n = 0; n < 16; n++) for (var r = jt(Tt[e] * Tt[n] + Dt[e] * Et[n]), i = jt(Et[e] * Tt[n] + Ot[e] * Et[n]), a = jt(Tt[e] * Dt[n] + Dt[e] * Ot[n]), o = jt(Et[e] * Dt[n] + Ot[e] * Ot[n]), s = 0; s < 16; s++) if (Tt[s] === r && Et[s] === i && Dt[s] === a && Ot[s] === o) {
			t.push(s);
			break;
		}
	}
	for (var e = 0; e < 16; e++) {
		var c = new W();
		c.set(Tt[e], Et[e], Dt[e], Ot[e], 0, 0), At.push(c);
	}
}
Mt();
var G = {
	E: 0,
	SE: 1,
	S: 2,
	SW: 3,
	W: 4,
	NW: 5,
	N: 6,
	NE: 7,
	MIRROR_VERTICAL: 8,
	MAIN_DIAGONAL: 10,
	MIRROR_HORIZONTAL: 12,
	REVERSE_DIAGONAL: 14,
	uX: function(e) {
		return Tt[e];
	},
	uY: function(e) {
		return Et[e];
	},
	vX: function(e) {
		return Dt[e];
	},
	vY: function(e) {
		return Ot[e];
	},
	inv: function(e) {
		return e & 8 ? e & 15 : -e & 7;
	},
	add: function(e, t) {
		return kt[e][t];
	},
	sub: function(e, t) {
		return kt[e][G.inv(t)];
	},
	rotate180: function(e) {
		return e ^ 4;
	},
	isVertical: function(e) {
		return (e & 3) == 2;
	},
	byDirection: function(e, t) {
		return Math.abs(e) * 2 <= Math.abs(t) ? t >= 0 ? G.S : G.N : Math.abs(t) * 2 <= Math.abs(e) ? e > 0 ? G.E : G.W : t > 0 ? e > 0 ? G.SE : G.SW : e > 0 ? G.NE : G.NW;
	},
	matrixAppendRotationInv: function(e, t, n, r) {
		n === void 0 && (n = 0), r === void 0 && (r = 0);
		var i = At[G.inv(t)];
		i.tx = n, i.ty = r, e.append(i);
	}
}, Nt = function() {
	function e() {
		this.worldTransform = new W(), this.localTransform = new W(), this.position = new wt(this.onChange, this, 0, 0), this.scale = new wt(this.onChange, this, 1, 1), this.pivot = new wt(this.onChange, this, 0, 0), this.skew = new wt(this.updateSkew, this, 0, 0), this._rotation = 0, this._cx = 1, this._sx = 0, this._cy = 0, this._sy = 1, this._localID = 0, this._currentLocalID = 0, this._worldID = 0, this._parentID = 0;
	}
	return e.prototype.onChange = function() {
		this._localID++;
	}, e.prototype.updateSkew = function() {
		this._cx = Math.cos(this._rotation + this.skew.y), this._sx = Math.sin(this._rotation + this.skew.y), this._cy = -Math.sin(this._rotation - this.skew.x), this._sy = Math.cos(this._rotation - this.skew.x), this._localID++;
	}, e.prototype.toString = function() {
		return "[@pixi/math:Transform " + ("position=(" + this.position.x + ", " + this.position.y + ") ") + ("rotation=" + this.rotation + " ") + ("scale=(" + this.scale.x + ", " + this.scale.y + ") ") + ("skew=(" + this.skew.x + ", " + this.skew.y + ") ") + "]";
	}, e.prototype.updateLocalTransform = function() {
		var e = this.localTransform;
		this._localID !== this._currentLocalID && (e.a = this._cx * this.scale.x, e.b = this._sx * this.scale.x, e.c = this._cy * this.scale.y, e.d = this._sy * this.scale.y, e.tx = this.position.x - (this.pivot.x * e.a + this.pivot.y * e.c), e.ty = this.position.y - (this.pivot.x * e.b + this.pivot.y * e.d), this._currentLocalID = this._localID, this._parentID = -1);
	}, e.prototype.updateTransform = function(e) {
		var t = this.localTransform;
		if (this._localID !== this._currentLocalID && (t.a = this._cx * this.scale.x, t.b = this._sx * this.scale.x, t.c = this._cy * this.scale.y, t.d = this._sy * this.scale.y, t.tx = this.position.x - (this.pivot.x * t.a + this.pivot.y * t.c), t.ty = this.position.y - (this.pivot.x * t.b + this.pivot.y * t.d), this._currentLocalID = this._localID, this._parentID = -1), this._parentID !== e._worldID) {
			var n = e.worldTransform, r = this.worldTransform;
			r.a = t.a * n.a + t.b * n.c, r.b = t.a * n.b + t.b * n.d, r.c = t.c * n.a + t.d * n.c, r.d = t.c * n.b + t.d * n.d, r.tx = t.tx * n.a + t.ty * n.c + n.tx, r.ty = t.tx * n.b + t.ty * n.d + n.ty, this._parentID = e._worldID, this._worldID++;
		}
	}, e.prototype.setFromMatrix = function(e) {
		e.decompose(this), this._localID++;
	}, Object.defineProperty(e.prototype, "rotation", {
		get: function() {
			return this._rotation;
		},
		set: function(e) {
			this._rotation !== e && (this._rotation = e, this.updateSkew());
		},
		enumerable: !1,
		configurable: !0
	}), e.IDENTITY = new e(), e;
}();
//#endregion
//#region node_modules/@pixi/display/dist/esm/display.mjs
V.SORTABLE_CHILDREN = !1;
var Pt = function() {
	function e() {
		this.minX = Infinity, this.minY = Infinity, this.maxX = -Infinity, this.maxY = -Infinity, this.rect = null, this.updateID = -1;
	}
	return e.prototype.isEmpty = function() {
		return this.minX > this.maxX || this.minY > this.maxY;
	}, e.prototype.clear = function() {
		this.minX = Infinity, this.minY = Infinity, this.maxX = -Infinity, this.maxY = -Infinity;
	}, e.prototype.getRectangle = function(e) {
		return this.minX > this.maxX || this.minY > this.maxY ? U.EMPTY : (e ||= new U(0, 0, 1, 1), e.x = this.minX, e.y = this.minY, e.width = this.maxX - this.minX, e.height = this.maxY - this.minY, e);
	}, e.prototype.addPoint = function(e) {
		this.minX = Math.min(this.minX, e.x), this.maxX = Math.max(this.maxX, e.x), this.minY = Math.min(this.minY, e.y), this.maxY = Math.max(this.maxY, e.y);
	}, e.prototype.addPointMatrix = function(e, t) {
		var n = e.a, r = e.b, i = e.c, a = e.d, o = e.tx, s = e.ty, c = n * t.x + i * t.y + o, l = r * t.x + a * t.y + s;
		this.minX = Math.min(this.minX, c), this.maxX = Math.max(this.maxX, c), this.minY = Math.min(this.minY, l), this.maxY = Math.max(this.maxY, l);
	}, e.prototype.addQuad = function(e) {
		var t = this.minX, n = this.minY, r = this.maxX, i = this.maxY, a = e[0], o = e[1];
		t = a < t ? a : t, n = o < n ? o : n, r = a > r ? a : r, i = o > i ? o : i, a = e[2], o = e[3], t = a < t ? a : t, n = o < n ? o : n, r = a > r ? a : r, i = o > i ? o : i, a = e[4], o = e[5], t = a < t ? a : t, n = o < n ? o : n, r = a > r ? a : r, i = o > i ? o : i, a = e[6], o = e[7], t = a < t ? a : t, n = o < n ? o : n, r = a > r ? a : r, i = o > i ? o : i, this.minX = t, this.minY = n, this.maxX = r, this.maxY = i;
	}, e.prototype.addFrame = function(e, t, n, r, i) {
		this.addFrameMatrix(e.worldTransform, t, n, r, i);
	}, e.prototype.addFrameMatrix = function(e, t, n, r, i) {
		var a = e.a, o = e.b, s = e.c, c = e.d, l = e.tx, u = e.ty, d = this.minX, f = this.minY, p = this.maxX, m = this.maxY, h = a * t + s * n + l, g = o * t + c * n + u;
		d = h < d ? h : d, f = g < f ? g : f, p = h > p ? h : p, m = g > m ? g : m, h = a * r + s * n + l, g = o * r + c * n + u, d = h < d ? h : d, f = g < f ? g : f, p = h > p ? h : p, m = g > m ? g : m, h = a * t + s * i + l, g = o * t + c * i + u, d = h < d ? h : d, f = g < f ? g : f, p = h > p ? h : p, m = g > m ? g : m, h = a * r + s * i + l, g = o * r + c * i + u, d = h < d ? h : d, f = g < f ? g : f, p = h > p ? h : p, m = g > m ? g : m, this.minX = d, this.minY = f, this.maxX = p, this.maxY = m;
	}, e.prototype.addVertexData = function(e, t, n) {
		for (var r = this.minX, i = this.minY, a = this.maxX, o = this.maxY, s = t; s < n; s += 2) {
			var c = e[s], l = e[s + 1];
			r = c < r ? c : r, i = l < i ? l : i, a = c > a ? c : a, o = l > o ? l : o;
		}
		this.minX = r, this.minY = i, this.maxX = a, this.maxY = o;
	}, e.prototype.addVertices = function(e, t, n, r) {
		this.addVerticesMatrix(e.worldTransform, t, n, r);
	}, e.prototype.addVerticesMatrix = function(e, t, n, r, i, a) {
		i === void 0 && (i = 0), a === void 0 && (a = i);
		for (var o = e.a, s = e.b, c = e.c, l = e.d, u = e.tx, d = e.ty, f = this.minX, p = this.minY, m = this.maxX, h = this.maxY, g = n; g < r; g += 2) {
			var _ = t[g], v = t[g + 1], y = o * _ + c * v + u, b = l * v + s * _ + d;
			f = Math.min(f, y - i), m = Math.max(m, y + i), p = Math.min(p, b - a), h = Math.max(h, b + a);
		}
		this.minX = f, this.minY = p, this.maxX = m, this.maxY = h;
	}, e.prototype.addBounds = function(e) {
		var t = this.minX, n = this.minY, r = this.maxX, i = this.maxY;
		this.minX = e.minX < t ? e.minX : t, this.minY = e.minY < n ? e.minY : n, this.maxX = e.maxX > r ? e.maxX : r, this.maxY = e.maxY > i ? e.maxY : i;
	}, e.prototype.addBoundsMask = function(e, t) {
		var n = e.minX > t.minX ? e.minX : t.minX, r = e.minY > t.minY ? e.minY : t.minY, i = e.maxX < t.maxX ? e.maxX : t.maxX, a = e.maxY < t.maxY ? e.maxY : t.maxY;
		if (n <= i && r <= a) {
			var o = this.minX, s = this.minY, c = this.maxX, l = this.maxY;
			this.minX = n < o ? n : o, this.minY = r < s ? r : s, this.maxX = i > c ? i : c, this.maxY = a > l ? a : l;
		}
	}, e.prototype.addBoundsMatrix = function(e, t) {
		this.addFrameMatrix(t, e.minX, e.minY, e.maxX, e.maxY);
	}, e.prototype.addBoundsArea = function(e, t) {
		var n = e.minX > t.x ? e.minX : t.x, r = e.minY > t.y ? e.minY : t.y, i = e.maxX < t.x + t.width ? e.maxX : t.x + t.width, a = e.maxY < t.y + t.height ? e.maxY : t.y + t.height;
		if (n <= i && r <= a) {
			var o = this.minX, s = this.minY, c = this.maxX, l = this.maxY;
			this.minX = n < o ? n : o, this.minY = r < s ? r : s, this.maxX = i > c ? i : c, this.maxY = a > l ? a : l;
		}
	}, e.prototype.pad = function(e, t) {
		e === void 0 && (e = 0), t === void 0 && (t = e), this.isEmpty() || (this.minX -= e, this.maxX += e, this.minY -= t, this.maxY += t);
	}, e.prototype.addFramePad = function(e, t, n, r, i, a) {
		e -= i, t -= a, n += i, r += a, this.minX = this.minX < e ? this.minX : e, this.maxX = this.maxX > n ? this.maxX : n, this.minY = this.minY < t ? this.minY : t, this.maxY = this.maxY > r ? this.maxY : r;
	}, e;
}(), Ft = function(e, t) {
	return Ft = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, Ft(e, t);
};
function It(e, t) {
	Ft(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var K = function(e) {
	It(t, e);
	function t() {
		var t = e.call(this) || this;
		return t.tempDisplayObjectParent = null, t.transform = new Nt(), t.alpha = 1, t.visible = !0, t.renderable = !0, t.cullable = !1, t.cullArea = null, t.parent = null, t.worldAlpha = 1, t._lastSortedIndex = 0, t._zIndex = 0, t.filterArea = null, t.filters = null, t._enabledFilters = null, t._bounds = new Pt(), t._localBounds = null, t._boundsID = 0, t._boundsRect = null, t._localBoundsRect = null, t._mask = null, t._maskRefCount = 0, t._destroyed = !1, t.isSprite = !1, t.isMask = !1, t;
	}
	return t.mixin = function(e) {
		for (var n = Object.keys(e), r = 0; r < n.length; ++r) {
			var i = n[r];
			Object.defineProperty(t.prototype, i, Object.getOwnPropertyDescriptor(e, i));
		}
	}, Object.defineProperty(t.prototype, "destroyed", {
		get: function() {
			return this._destroyed;
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype._recursivePostUpdateTransform = function() {
		this.parent ? (this.parent._recursivePostUpdateTransform(), this.transform.updateTransform(this.parent.transform)) : this.transform.updateTransform(this._tempDisplayObjectParent.transform);
	}, t.prototype.updateTransform = function() {
		this._boundsID++, this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha;
	}, t.prototype.getBounds = function(e, t) {
		return e || (this.parent ? (this._recursivePostUpdateTransform(), this.updateTransform()) : (this.parent = this._tempDisplayObjectParent, this.updateTransform(), this.parent = null)), this._bounds.updateID !== this._boundsID && (this.calculateBounds(), this._bounds.updateID = this._boundsID), t ||= (this._boundsRect ||= new U(), this._boundsRect), this._bounds.getRectangle(t);
	}, t.prototype.getLocalBounds = function(e) {
		e ||= (this._localBoundsRect ||= new U(), this._localBoundsRect), this._localBounds ||= new Pt();
		var t = this.transform, n = this.parent;
		this.parent = null, this.transform = this._tempDisplayObjectParent.transform;
		var r = this._bounds, i = this._boundsID;
		this._bounds = this._localBounds;
		var a = this.getBounds(!1, e);
		return this.parent = n, this.transform = t, this._bounds = r, this._bounds.updateID += this._boundsID - i, a;
	}, t.prototype.toGlobal = function(e, t, n) {
		return n === void 0 && (n = !1), n || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.apply(e, t);
	}, t.prototype.toLocal = function(e, t, n, r) {
		return t && (e = t.toGlobal(e, n, r)), r || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.applyInverse(e, n);
	}, t.prototype.setParent = function(e) {
		if (!e || !e.addChild) throw Error("setParent: Argument must be a Container");
		return e.addChild(this), e;
	}, t.prototype.setTransform = function(e, t, n, r, i, a, o, s, c) {
		return e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 1), r === void 0 && (r = 1), i === void 0 && (i = 0), a === void 0 && (a = 0), o === void 0 && (o = 0), s === void 0 && (s = 0), c === void 0 && (c = 0), this.position.x = e, this.position.y = t, this.scale.x = n || 1, this.scale.y = r || 1, this.rotation = i, this.skew.x = a, this.skew.y = o, this.pivot.x = s, this.pivot.y = c, this;
	}, t.prototype.destroy = function(e) {
		this.parent && this.parent.removeChild(this), this._destroyed = !0, this.transform = null, this.parent = null, this._bounds = null, this.mask = null, this.cullArea = null, this.filters = null, this.filterArea = null, this.hitArea = null, this.interactive = !1, this.interactiveChildren = !1, this.emit("destroyed"), this.removeAllListeners();
	}, Object.defineProperty(t.prototype, "_tempDisplayObjectParent", {
		get: function() {
			return this.tempDisplayObjectParent === null && (this.tempDisplayObjectParent = new Lt()), this.tempDisplayObjectParent;
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype.enableTempParent = function() {
		var e = this.parent;
		return this.parent = this._tempDisplayObjectParent, e;
	}, t.prototype.disableTempParent = function(e) {
		this.parent = e;
	}, Object.defineProperty(t.prototype, "x", {
		get: function() {
			return this.position.x;
		},
		set: function(e) {
			this.transform.position.x = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "y", {
		get: function() {
			return this.position.y;
		},
		set: function(e) {
			this.transform.position.y = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "worldTransform", {
		get: function() {
			return this.transform.worldTransform;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "localTransform", {
		get: function() {
			return this.transform.localTransform;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "position", {
		get: function() {
			return this.transform.position;
		},
		set: function(e) {
			this.transform.position.copyFrom(e);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "scale", {
		get: function() {
			return this.transform.scale;
		},
		set: function(e) {
			this.transform.scale.copyFrom(e);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "pivot", {
		get: function() {
			return this.transform.pivot;
		},
		set: function(e) {
			this.transform.pivot.copyFrom(e);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "skew", {
		get: function() {
			return this.transform.skew;
		},
		set: function(e) {
			this.transform.skew.copyFrom(e);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "rotation", {
		get: function() {
			return this.transform.rotation;
		},
		set: function(e) {
			this.transform.rotation = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "angle", {
		get: function() {
			return this.transform.rotation * gt;
		},
		set: function(e) {
			this.transform.rotation = e * _t;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "zIndex", {
		get: function() {
			return this._zIndex;
		},
		set: function(e) {
			this._zIndex = e, this.parent && (this.parent.sortDirty = !0);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "worldVisible", {
		get: function() {
			var e = this;
			do {
				if (!e.visible) return !1;
				e = e.parent;
			} while (e);
			return !0;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "mask", {
		get: function() {
			return this._mask;
		},
		set: function(e) {
			if (this._mask !== e) {
				if (this._mask) {
					var t = this._mask.isMaskData ? this._mask.maskObject : this._mask;
					t && (t._maskRefCount--, t._maskRefCount === 0 && (t.renderable = !0, t.isMask = !1));
				}
				if (this._mask = e, this._mask) {
					var t = this._mask.isMaskData ? this._mask.maskObject : this._mask;
					t && (t._maskRefCount === 0 && (t.renderable = !1, t.isMask = !0), t._maskRefCount++);
				}
			}
		},
		enumerable: !1,
		configurable: !0
	}), t;
}(Ae.default), Lt = function(e) {
	It(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.sortDirty = null, t;
	}
	return t;
}(K);
K.prototype.displayObjectUpdateTransform = K.prototype.updateTransform;
function Rt(e, t) {
	return e.zIndex === t.zIndex ? e._lastSortedIndex - t._lastSortedIndex : e.zIndex - t.zIndex;
}
var zt = function(e) {
	It(t, e);
	function t() {
		var t = e.call(this) || this;
		return t.children = [], t.sortableChildren = V.SORTABLE_CHILDREN, t.sortDirty = !1, t;
	}
	return t.prototype.onChildrenChange = function(e) {}, t.prototype.addChild = function() {
		for (var e = arguments, t = [], n = 0; n < arguments.length; n++) t[n] = e[n];
		if (t.length > 1) for (var r = 0; r < t.length; r++) this.addChild(t[r]);
		else {
			var i = t[0];
			i.parent && i.parent.removeChild(i), i.parent = this, this.sortDirty = !0, i.transform._parentID = -1, this.children.push(i), this._boundsID++, this.onChildrenChange(this.children.length - 1), this.emit("childAdded", i, this, this.children.length - 1), i.emit("added", this);
		}
		return t[0];
	}, t.prototype.addChildAt = function(e, t) {
		if (t < 0 || t > this.children.length) throw Error(e + "addChildAt: The index " + t + " supplied is out of bounds " + this.children.length);
		return e.parent && e.parent.removeChild(e), e.parent = this, this.sortDirty = !0, e.transform._parentID = -1, this.children.splice(t, 0, e), this._boundsID++, this.onChildrenChange(t), e.emit("added", this), this.emit("childAdded", e, this, t), e;
	}, t.prototype.swapChildren = function(e, t) {
		if (e !== t) {
			var n = this.getChildIndex(e), r = this.getChildIndex(t);
			this.children[n] = t, this.children[r] = e, this.onChildrenChange(n < r ? n : r);
		}
	}, t.prototype.getChildIndex = function(e) {
		var t = this.children.indexOf(e);
		if (t === -1) throw Error("The supplied DisplayObject must be a child of the caller");
		return t;
	}, t.prototype.setChildIndex = function(e, t) {
		if (t < 0 || t >= this.children.length) throw Error("The index " + t + " supplied is out of bounds " + this.children.length);
		var n = this.getChildIndex(e);
		et(this.children, n, 1), this.children.splice(t, 0, e), this.onChildrenChange(t);
	}, t.prototype.getChildAt = function(e) {
		if (e < 0 || e >= this.children.length) throw Error("getChildAt: Index (" + e + ") does not exist.");
		return this.children[e];
	}, t.prototype.removeChild = function() {
		for (var e = arguments, t = [], n = 0; n < arguments.length; n++) t[n] = e[n];
		if (t.length > 1) for (var r = 0; r < t.length; r++) this.removeChild(t[r]);
		else {
			var i = t[0], a = this.children.indexOf(i);
			if (a === -1) return null;
			i.parent = null, i.transform._parentID = -1, et(this.children, a, 1), this._boundsID++, this.onChildrenChange(a), i.emit("removed", this), this.emit("childRemoved", i, this, a);
		}
		return t[0];
	}, t.prototype.removeChildAt = function(e) {
		var t = this.getChildAt(e);
		return t.parent = null, t.transform._parentID = -1, et(this.children, e, 1), this._boundsID++, this.onChildrenChange(e), t.emit("removed", this), this.emit("childRemoved", t, this, e), t;
	}, t.prototype.removeChildren = function(e, t) {
		e === void 0 && (e = 0), t === void 0 && (t = this.children.length);
		var n = e, r = t, i = r - n, a;
		if (i > 0 && i <= r) {
			a = this.children.splice(n, i);
			for (var o = 0; o < a.length; ++o) a[o].parent = null, a[o].transform && (a[o].transform._parentID = -1);
			this._boundsID++, this.onChildrenChange(e);
			for (var o = 0; o < a.length; ++o) a[o].emit("removed", this), this.emit("childRemoved", a[o], this, o);
			return a;
		} else if (i === 0 && this.children.length === 0) return [];
		throw RangeError("removeChildren: numeric values are outside the acceptable range.");
	}, t.prototype.sortChildren = function() {
		for (var e = !1, t = 0, n = this.children.length; t < n; ++t) {
			var r = this.children[t];
			r._lastSortedIndex = t, !e && r.zIndex !== 0 && (e = !0);
		}
		e && this.children.length > 1 && this.children.sort(Rt), this.sortDirty = !1;
	}, t.prototype.updateTransform = function() {
		this.sortableChildren && this.sortDirty && this.sortChildren(), this._boundsID++, this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha;
		for (var e = 0, t = this.children.length; e < t; ++e) {
			var n = this.children[e];
			n.visible && n.updateTransform();
		}
	}, t.prototype.calculateBounds = function() {
		this._bounds.clear(), this._calculateBounds();
		for (var e = 0; e < this.children.length; e++) {
			var t = this.children[e];
			if (!(!t.visible || !t.renderable)) if (t.calculateBounds(), t._mask) {
				var n = t._mask.isMaskData ? t._mask.maskObject : t._mask;
				n ? (n.calculateBounds(), this._bounds.addBoundsMask(t._bounds, n._bounds)) : this._bounds.addBounds(t._bounds);
			} else t.filterArea ? this._bounds.addBoundsArea(t._bounds, t.filterArea) : this._bounds.addBounds(t._bounds);
		}
		this._bounds.updateID = this._boundsID;
	}, t.prototype.getLocalBounds = function(t, n) {
		n === void 0 && (n = !1);
		var r = e.prototype.getLocalBounds.call(this, t);
		if (!n) for (var i = 0, a = this.children.length; i < a; ++i) {
			var o = this.children[i];
			o.visible && o.updateTransform();
		}
		return r;
	}, t.prototype._calculateBounds = function() {}, t.prototype._renderWithCulling = function(e) {
		var n = e.renderTexture.sourceFrame;
		if (n.width > 0 && n.height > 0) {
			var r, i;
			if (this.cullArea ? (r = this.cullArea, i = this.worldTransform) : this._render !== t.prototype._render && (r = this.getBounds(!0)), r && n.intersects(r, i)) this._render(e);
			else if (this.cullArea) return;
			for (var a = 0, o = this.children.length; a < o; ++a) {
				var s = this.children[a], c = s.cullable;
				s.cullable = c || !this.cullArea, s.render(e), s.cullable = c;
			}
		}
	}, t.prototype.render = function(e) {
		if (!(!this.visible || this.worldAlpha <= 0 || !this.renderable)) if (this._mask || this.filters && this.filters.length) this.renderAdvanced(e);
		else if (this.cullable) this._renderWithCulling(e);
		else {
			this._render(e);
			for (var t = 0, n = this.children.length; t < n; ++t) this.children[t].render(e);
		}
	}, t.prototype.renderAdvanced = function(e) {
		var t = this.filters, n = this._mask;
		if (t) {
			this._enabledFilters ||= [], this._enabledFilters.length = 0;
			for (var r = 0; r < t.length; r++) t[r].enabled && this._enabledFilters.push(t[r]);
		}
		var i = t && this._enabledFilters && this._enabledFilters.length || n && (!n.isMaskData || n.enabled && (n.autoDetect || n.type !== I.NONE));
		if (i && e.batch.flush(), t && this._enabledFilters && this._enabledFilters.length && e.filter.push(this, this._enabledFilters), n && e.mask.push(this, this._mask), this.cullable) this._renderWithCulling(e);
		else {
			this._render(e);
			for (var r = 0, a = this.children.length; r < a; ++r) this.children[r].render(e);
		}
		i && e.batch.flush(), n && e.mask.pop(this), t && this._enabledFilters && this._enabledFilters.length && e.filter.pop();
	}, t.prototype._render = function(e) {}, t.prototype.destroy = function(t) {
		e.prototype.destroy.call(this), this.sortDirty = !1;
		var n = typeof t == "boolean" ? t : t && t.children, r = this.removeChildren(0, this.children.length);
		if (n) for (var i = 0; i < r.length; ++i) r[i].destroy(t);
	}, Object.defineProperty(t.prototype, "width", {
		get: function() {
			return this.scale.x * this.getLocalBounds().width;
		},
		set: function(e) {
			var t = this.getLocalBounds().width;
			t === 0 ? this.scale.x = 1 : this.scale.x = e / t, this._width = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "height", {
		get: function() {
			return this.scale.y * this.getLocalBounds().height;
		},
		set: function(e) {
			var t = this.getLocalBounds().height;
			t === 0 ? this.scale.y = 1 : this.scale.y = e / t, this._height = e;
		},
		enumerable: !1,
		configurable: !0
	}), t;
}(K);
zt.prototype.containerUpdateTransform = zt.prototype.updateTransform;
//#endregion
//#region node_modules/@pixi/extensions/dist/esm/extensions.mjs
var Bt = function() {
	return Bt = Object.assign || function(e) {
		for (var t = arguments, n, r = 1, i = arguments.length; r < i; r++) for (var a in n = t[r], n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
		return e;
	}, Bt.apply(this, arguments);
}, q;
(function(e) {
	e.Application = "application", e.RendererPlugin = "renderer-webgl-plugin", e.CanvasRendererPlugin = "renderer-canvas-plugin", e.Loader = "loader", e.LoadParser = "load-parser", e.ResolveParser = "resolve-parser", e.CacheParser = "cache-parser", e.DetectionParser = "detection-parser";
})(q ||= {});
var Vt = function(e) {
	if (typeof e == "function" || typeof e == "object" && e.extension) {
		if (!e.extension) throw Error("Extension class must have an extension object");
		var t = typeof e.extension == "object" ? e.extension : { type: e.extension };
		e = Bt(Bt({}, t), { ref: e });
	}
	if (typeof e == "object") e = Bt({}, e);
	else throw Error("Invalid extension type");
	return typeof e.type == "string" && (e.type = [e.type]), e;
}, Ht = {
	_addHandlers: null,
	_removeHandlers: null,
	_queue: {},
	remove: function() {
		for (var e = arguments, t = this, n = [], r = 0; r < arguments.length; r++) n[r] = e[r];
		return n.map(Vt).forEach(function(e) {
			e.type.forEach(function(n) {
				var r;
				return (r = t._removeHandlers)[n]?.call(r, e);
			});
		}), this;
	},
	add: function() {
		for (var e = arguments, t = this, n = [], r = 0; r < arguments.length; r++) n[r] = e[r];
		return n.map(Vt).forEach(function(e) {
			e.type.forEach(function(n) {
				var r = t._addHandlers, i = t._queue;
				r[n] ? r[n](e) : (i[n] = i[n] || [], i[n].push(e));
			});
		}), this;
	},
	handle: function(e, t, n) {
		var r = this._addHandlers = this._addHandlers || {}, i = this._removeHandlers = this._removeHandlers || {};
		if (r[e] || i[e]) throw Error("Extension type " + e + " already has a handler");
		r[e] = t, i[e] = n;
		var a = this._queue;
		return a[e] && (a[e].forEach(function(e) {
			return t(e);
		}), delete a[e]), this;
	},
	handleByMap: function(e, t) {
		return this.handle(e, function(e) {
			t[e.name] = e.ref;
		}, function(e) {
			delete t[e.name];
		});
	},
	handleByList: function(e, t) {
		return this.handle(e, function(n) {
			var r, i;
			t.includes(n.ref) || (t.push(n.ref), e === q.Loader && ((i = (r = n.ref).add) == null || i.call(r)));
		}, function(e) {
			var n = t.indexOf(e.ref);
			n !== -1 && t.splice(n, 1);
		});
	}
}, Ut = function() {
	function e(e) {
		this.items = [], this._name = e, this._aliasCount = 0;
	}
	return e.prototype.emit = function(e, t, n, r, i, a, o, s) {
		if (arguments.length > 8) throw Error("max arguments reached");
		var c = this, l = c.name, u = c.items;
		this._aliasCount++;
		for (var d = 0, f = u.length; d < f; d++) u[d][l](e, t, n, r, i, a, o, s);
		return u === this.items && this._aliasCount--, this;
	}, e.prototype.ensureNonAliasedItems = function() {
		this._aliasCount > 0 && this.items.length > 1 && (this._aliasCount = 0, this.items = this.items.slice(0));
	}, e.prototype.add = function(e) {
		return e[this._name] && (this.ensureNonAliasedItems(), this.remove(e), this.items.push(e)), this;
	}, e.prototype.remove = function(e) {
		var t = this.items.indexOf(e);
		return t !== -1 && (this.ensureNonAliasedItems(), this.items.splice(t, 1)), this;
	}, e.prototype.contains = function(e) {
		return this.items.indexOf(e) !== -1;
	}, e.prototype.removeAll = function() {
		return this.ensureNonAliasedItems(), this.items.length = 0, this;
	}, e.prototype.destroy = function() {
		this.removeAll(), this.items = null, this._name = null;
	}, Object.defineProperty(e.prototype, "empty", {
		get: function() {
			return this.items.length === 0;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "name", {
		get: function() {
			return this._name;
		},
		enumerable: !1,
		configurable: !0
	}), e;
}();
//#endregion
//#region node_modules/@pixi/ticker/dist/esm/ticker.mjs
Object.defineProperties(Ut.prototype, {
	dispatch: { value: Ut.prototype.emit },
	run: { value: Ut.prototype.emit }
}), V.TARGET_FPMS = .06;
var Wt;
(function(e) {
	e[e.INTERACTION = 50] = "INTERACTION", e[e.HIGH = 25] = "HIGH", e[e.NORMAL = 0] = "NORMAL", e[e.LOW = -25] = "LOW", e[e.UTILITY = -50] = "UTILITY";
})(Wt ||= {});
var Gt = function() {
	function e(e, t, n, r) {
		t === void 0 && (t = null), n === void 0 && (n = 0), r === void 0 && (r = !1), this.next = null, this.previous = null, this._destroyed = !1, this.fn = e, this.context = t, this.priority = n, this.once = r;
	}
	return e.prototype.match = function(e, t) {
		return t === void 0 && (t = null), this.fn === e && this.context === t;
	}, e.prototype.emit = function(e) {
		this.fn && (this.context ? this.fn.call(this.context, e) : this.fn(e));
		var t = this.next;
		return this.once && this.destroy(!0), this._destroyed && (this.next = null), t;
	}, e.prototype.connect = function(e) {
		this.previous = e, e.next && (e.next.previous = this), this.next = e.next, e.next = this;
	}, e.prototype.destroy = function(e) {
		e === void 0 && (e = !1), this._destroyed = !0, this.fn = null, this.context = null, this.previous && (this.previous.next = this.next), this.next && (this.next.previous = this.previous);
		var t = this.next;
		return this.next = e ? null : t, this.previous = null, t;
	}, e;
}(), Kt = function() {
	function e() {
		var e = this;
		this.autoStart = !1, this.deltaTime = 1, this.lastTime = -1, this.speed = 1, this.started = !1, this._requestId = null, this._maxElapsedMS = 100, this._minElapsedMS = 0, this._protected = !1, this._lastFrame = -1, this._head = new Gt(null, null, Infinity), this.deltaMS = 1 / V.TARGET_FPMS, this.elapsedMS = 1 / V.TARGET_FPMS, this._tick = function(t) {
			e._requestId = null, e.started && (e.update(t), e.started && e._requestId === null && e._head.next && (e._requestId = requestAnimationFrame(e._tick)));
		};
	}
	return e.prototype._requestIfNeeded = function() {
		this._requestId === null && this._head.next && (this.lastTime = performance.now(), this._lastFrame = this.lastTime, this._requestId = requestAnimationFrame(this._tick));
	}, e.prototype._cancelIfNeeded = function() {
		this._requestId !== null && (cancelAnimationFrame(this._requestId), this._requestId = null);
	}, e.prototype._startIfPossible = function() {
		this.started ? this._requestIfNeeded() : this.autoStart && this.start();
	}, e.prototype.add = function(e, t, n) {
		return n === void 0 && (n = Wt.NORMAL), this._addListener(new Gt(e, t, n));
	}, e.prototype.addOnce = function(e, t, n) {
		return n === void 0 && (n = Wt.NORMAL), this._addListener(new Gt(e, t, n, !0));
	}, e.prototype._addListener = function(e) {
		var t = this._head.next, n = this._head;
		if (!t) e.connect(n);
		else {
			for (; t;) {
				if (e.priority > t.priority) {
					e.connect(n);
					break;
				}
				n = t, t = t.next;
			}
			e.previous || e.connect(n);
		}
		return this._startIfPossible(), this;
	}, e.prototype.remove = function(e, t) {
		for (var n = this._head.next; n;) n = n.match(e, t) ? n.destroy() : n.next;
		return this._head.next || this._cancelIfNeeded(), this;
	}, Object.defineProperty(e.prototype, "count", {
		get: function() {
			if (!this._head) return 0;
			for (var e = 0, t = this._head; t = t.next;) e++;
			return e;
		},
		enumerable: !1,
		configurable: !0
	}), e.prototype.start = function() {
		this.started || (this.started = !0, this._requestIfNeeded());
	}, e.prototype.stop = function() {
		this.started && (this.started = !1, this._cancelIfNeeded());
	}, e.prototype.destroy = function() {
		if (!this._protected) {
			this.stop();
			for (var e = this._head.next; e;) e = e.destroy(!0);
			this._head.destroy(), this._head = null;
		}
	}, e.prototype.update = function(e) {
		e === void 0 && (e = performance.now());
		var t;
		if (e > this.lastTime) {
			if (t = this.elapsedMS = e - this.lastTime, t > this._maxElapsedMS && (t = this._maxElapsedMS), t *= this.speed, this._minElapsedMS) {
				var n = e - this._lastFrame | 0;
				if (n < this._minElapsedMS) return;
				this._lastFrame = e - n % this._minElapsedMS;
			}
			this.deltaMS = t, this.deltaTime = this.deltaMS * V.TARGET_FPMS;
			for (var r = this._head, i = r.next; i;) i = i.emit(this.deltaTime);
			r.next || this._cancelIfNeeded();
		} else this.deltaTime = this.deltaMS = this.elapsedMS = 0;
		this.lastTime = e;
	}, Object.defineProperty(e.prototype, "FPS", {
		get: function() {
			return 1e3 / this.elapsedMS;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "minFPS", {
		get: function() {
			return 1e3 / this._maxElapsedMS;
		},
		set: function(e) {
			var t = Math.min(this.maxFPS, e), n = Math.min(Math.max(0, t) / 1e3, V.TARGET_FPMS);
			this._maxElapsedMS = 1 / n;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "maxFPS", {
		get: function() {
			return this._minElapsedMS ? Math.round(1e3 / this._minElapsedMS) : 0;
		},
		set: function(e) {
			if (e === 0) this._minElapsedMS = 0;
			else {
				var t = Math.max(this.minFPS, e);
				this._minElapsedMS = 1 / (t / 1e3);
			}
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e, "shared", {
		get: function() {
			if (!e._shared) {
				var t = e._shared = new e();
				t.autoStart = !0, t._protected = !0;
			}
			return e._shared;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e, "system", {
		get: function() {
			if (!e._system) {
				var t = e._system = new e();
				t.autoStart = !0, t._protected = !0;
			}
			return e._system;
		},
		enumerable: !1,
		configurable: !0
	}), e;
}(), qt = function() {
	function e() {}
	return e.init = function(e) {
		var t = this;
		e = Object.assign({
			autoStart: !0,
			sharedTicker: !1
		}, e), Object.defineProperty(this, "ticker", {
			set: function(e) {
				this._ticker && this._ticker.remove(this.render, this), this._ticker = e, e && e.add(this.render, this, Wt.LOW);
			},
			get: function() {
				return this._ticker;
			}
		}), this.stop = function() {
			t._ticker.stop();
		}, this.start = function() {
			t._ticker.start();
		}, this._ticker = null, this.ticker = e.sharedTicker ? Kt.shared : new Kt(), e.autoStart && this.start();
	}, e.destroy = function() {
		if (this._ticker) {
			var e = this._ticker;
			this.ticker = null, e.destroy();
		}
	}, e.extension = q.Application, e;
}();
V.PREFER_ENV = Te.any ? D.WEBGL : D.WEBGL2, V.STRICT_TEXTURE_CACHE = !1;
var Jt = [];
function Yt(e, t) {
	if (!e) return null;
	var n = "";
	if (typeof e == "string") {
		var r = /\.(\w{3,4})(?:$|\?|#)/i.exec(e);
		r && (n = r[1].toLowerCase());
	}
	for (var i = Jt.length - 1; i >= 0; --i) {
		var a = Jt[i];
		if (a.test && a.test(e, n)) return new a(e, t);
	}
	throw Error("Unrecognized source type to auto-detect Resource");
}
var Xt = function(e, t) {
	return Xt = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, Xt(e, t);
};
function J(e, t) {
	Xt(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var Zt = function() {
	return Zt = Object.assign || function(e) {
		for (var t = arguments, n, r = 1, i = arguments.length; r < i; r++) for (var a in n = t[r], n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
		return e;
	}, Zt.apply(this, arguments);
};
function Qt(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
var $t = function() {
	function e(e, t) {
		e === void 0 && (e = 0), t === void 0 && (t = 0), this._width = e, this._height = t, this.destroyed = !1, this.internal = !1, this.onResize = new Ut("setRealSize"), this.onUpdate = new Ut("update"), this.onError = new Ut("onError");
	}
	return e.prototype.bind = function(e) {
		this.onResize.add(e), this.onUpdate.add(e), this.onError.add(e), (this._width || this._height) && this.onResize.emit(this._width, this._height);
	}, e.prototype.unbind = function(e) {
		this.onResize.remove(e), this.onUpdate.remove(e), this.onError.remove(e);
	}, e.prototype.resize = function(e, t) {
		(e !== this._width || t !== this._height) && (this._width = e, this._height = t, this.onResize.emit(e, t));
	}, Object.defineProperty(e.prototype, "valid", {
		get: function() {
			return !!this._width && !!this._height;
		},
		enumerable: !1,
		configurable: !0
	}), e.prototype.update = function() {
		this.destroyed || this.onUpdate.emit();
	}, e.prototype.load = function() {
		return Promise.resolve(this);
	}, Object.defineProperty(e.prototype, "width", {
		get: function() {
			return this._width;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "height", {
		get: function() {
			return this._height;
		},
		enumerable: !1,
		configurable: !0
	}), e.prototype.style = function(e, t, n) {
		return !1;
	}, e.prototype.dispose = function() {}, e.prototype.destroy = function() {
		this.destroyed || (this.destroyed = !0, this.dispose(), this.onError.removeAll(), this.onError = null, this.onResize.removeAll(), this.onResize = null, this.onUpdate.removeAll(), this.onUpdate = null);
	}, e.test = function(e, t) {
		return !1;
	}, e;
}(), en = function(e) {
	J(t, e);
	function t(t, n) {
		var r = this, i = n || {}, a = i.width, o = i.height;
		if (!a || !o) throw Error("BufferResource width or height invalid");
		return r = e.call(this, a, o) || this, r.data = t, r;
	}
	return t.prototype.upload = function(e, t, n) {
		var r = e.gl;
		r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.alphaMode === ie.UNPACK);
		var i = t.realWidth, a = t.realHeight;
		return n.width === i && n.height === a ? r.texSubImage2D(t.target, 0, 0, 0, i, a, t.format, n.type, this.data) : (n.width = i, n.height = a, r.texImage2D(t.target, 0, n.internalFormat, i, a, 0, t.format, n.type, this.data)), !0;
	}, t.prototype.dispose = function() {
		this.data = null;
	}, t.test = function(e) {
		return e instanceof Float32Array || e instanceof Uint8Array || e instanceof Uint32Array;
	}, t;
}($t), tn = {
	scaleMode: te.NEAREST,
	format: M.RGBA,
	alphaMode: ie.NPM
}, Y = function(e) {
	J(t, e);
	function t(t, n) {
		t === void 0 && (t = null), n === void 0 && (n = null);
		var r = e.call(this) || this;
		n ||= {};
		var i = n.alphaMode, a = n.mipmap, o = n.anisotropicLevel, s = n.scaleMode, c = n.width, l = n.height, u = n.wrapMode, d = n.format, f = n.type, p = n.target, m = n.resolution, h = n.resourceOptions;
		return t && !(t instanceof $t) && (t = Yt(t, h), t.internal = !0), r.resolution = m || V.RESOLUTION, r.width = Math.round((c || 0) * r.resolution) / r.resolution, r.height = Math.round((l || 0) * r.resolution) / r.resolution, r._mipmap = a === void 0 ? V.MIPMAP_TEXTURES : a, r.anisotropicLevel = o === void 0 ? V.ANISOTROPIC_LEVEL : o, r._wrapMode = u || V.WRAP_MODE, r._scaleMode = s === void 0 ? V.SCALE_MODE : s, r.format = d || M.RGBA, r.type = f || P.UNSIGNED_BYTE, r.target = p || N.TEXTURE_2D, r.alphaMode = i === void 0 ? ie.UNPACK : i, r.uid = rt(), r.touched = 0, r.isPowerOfTwo = !1, r._refreshPOT(), r._glTextures = {}, r.dirtyId = 0, r.dirtyStyleId = 0, r.cacheId = null, r.valid = c > 0 && l > 0, r.textureCacheIds = [], r.destroyed = !1, r.resource = null, r._batchEnabled = 0, r._batchLocation = 0, r.parentTextureArray = null, r.setResource(t), r;
	}
	return Object.defineProperty(t.prototype, "realWidth", {
		get: function() {
			return Math.round(this.width * this.resolution);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "realHeight", {
		get: function() {
			return Math.round(this.height * this.resolution);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "mipmap", {
		get: function() {
			return this._mipmap;
		},
		set: function(e) {
			this._mipmap !== e && (this._mipmap = e, this.dirtyStyleId++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "scaleMode", {
		get: function() {
			return this._scaleMode;
		},
		set: function(e) {
			this._scaleMode !== e && (this._scaleMode = e, this.dirtyStyleId++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "wrapMode", {
		get: function() {
			return this._wrapMode;
		},
		set: function(e) {
			this._wrapMode !== e && (this._wrapMode = e, this.dirtyStyleId++);
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype.setStyle = function(e, t) {
		var n;
		return e !== void 0 && e !== this.scaleMode && (this.scaleMode = e, n = !0), t !== void 0 && t !== this.mipmap && (this.mipmap = t, n = !0), n && this.dirtyStyleId++, this;
	}, t.prototype.setSize = function(e, t, n) {
		return n ||= this.resolution, this.setRealSize(e * n, t * n, n);
	}, t.prototype.setRealSize = function(e, t, n) {
		return this.resolution = n || this.resolution, this.width = Math.round(e) / this.resolution, this.height = Math.round(t) / this.resolution, this._refreshPOT(), this.update(), this;
	}, t.prototype._refreshPOT = function() {
		this.isPowerOfTwo = Qe(this.realWidth) && Qe(this.realHeight);
	}, t.prototype.setResolution = function(e) {
		var t = this.resolution;
		return t === e ? this : (this.resolution = e, this.valid && (this.width = Math.round(this.width * t) / e, this.height = Math.round(this.height * t) / e, this.emit("update", this)), this._refreshPOT(), this);
	}, t.prototype.setResource = function(e) {
		if (this.resource === e) return this;
		if (this.resource) throw Error("Resource can be set only once");
		return e.bind(this), this.resource = e, this;
	}, t.prototype.update = function() {
		this.valid ? (this.dirtyId++, this.dirtyStyleId++, this.emit("update", this)) : this.width > 0 && this.height > 0 && (this.valid = !0, this.emit("loaded", this), this.emit("update", this));
	}, t.prototype.onError = function(e) {
		this.emit("error", this, e);
	}, t.prototype.destroy = function() {
		this.resource &&= (this.resource.unbind(this), this.resource.internal && this.resource.destroy(), null), this.cacheId &&= (delete ct[this.cacheId], delete st[this.cacheId], null), this.dispose(), t.removeFromCache(this), this.textureCacheIds = null, this.destroyed = !0;
	}, t.prototype.dispose = function() {
		this.emit("dispose", this);
	}, t.prototype.castToBaseTexture = function() {
		return this;
	}, t.from = function(e, n, r) {
		r === void 0 && (r = V.STRICT_TEXTURE_CACHE);
		var i = typeof e == "string", a = null;
		i ? a = e : (e._pixiId ||= (n && n.pixiIdPrefix || "pixiid") + "_" + rt(), a = e._pixiId);
		var o = ct[a];
		if (i && r && !o) throw Error("The cacheId \"" + a + "\" does not exist in BaseTextureCache.");
		return o || (o = new t(e, n), o.cacheId = a, t.addToCache(o, a)), o;
	}, t.fromBuffer = function(e, n, r, i) {
		e ||= new Float32Array(n * r * 4);
		var a = new en(e, {
			width: n,
			height: r
		}), o = e instanceof Float32Array ? P.FLOAT : P.UNSIGNED_BYTE;
		return new t(a, Object.assign({}, tn, i || {
			width: n,
			height: r,
			type: o
		}));
	}, t.addToCache = function(e, t) {
		t && (e.textureCacheIds.indexOf(t) === -1 && e.textureCacheIds.push(t), ct[t] && console.warn("BaseTexture added to the cache with an id [" + t + "] that already had an entry"), ct[t] = e);
	}, t.removeFromCache = function(e) {
		if (typeof e == "string") {
			var t = ct[e];
			if (t) {
				var n = t.textureCacheIds.indexOf(e);
				return n > -1 && t.textureCacheIds.splice(n, 1), delete ct[e], t;
			}
		} else if (e && e.textureCacheIds) {
			for (var r = 0; r < e.textureCacheIds.length; ++r) delete ct[e.textureCacheIds[r]];
			return e.textureCacheIds.length = 0, e;
		}
		return null;
	}, t._globalBatch = 0, t;
}(Ae.default), nn = function(e) {
	J(t, e);
	function t(t, n) {
		var r = this, i = n || {}, a = i.width, o = i.height;
		r = e.call(this, a, o) || this, r.items = [], r.itemDirtyIds = [];
		for (var s = 0; s < t; s++) {
			var c = new Y();
			r.items.push(c), r.itemDirtyIds.push(-2);
		}
		return r.length = t, r._load = null, r.baseTexture = null, r;
	}
	return t.prototype.initFromArray = function(e, t) {
		for (var n = 0; n < this.length; n++) e[n] && (e[n].castToBaseTexture ? this.addBaseTextureAt(e[n].castToBaseTexture(), n) : e[n] instanceof $t ? this.addResourceAt(e[n], n) : this.addResourceAt(Yt(e[n], t), n));
	}, t.prototype.dispose = function() {
		for (var e = 0, t = this.length; e < t; e++) this.items[e].destroy();
		this.items = null, this.itemDirtyIds = null, this._load = null;
	}, t.prototype.addResourceAt = function(e, t) {
		if (!this.items[t]) throw Error("Index " + t + " is out of bounds");
		return e.valid && !this.valid && this.resize(e.width, e.height), this.items[t].setResource(e), this;
	}, t.prototype.bind = function(t) {
		if (this.baseTexture !== null) throw Error("Only one base texture per TextureArray is allowed");
		e.prototype.bind.call(this, t);
		for (var n = 0; n < this.length; n++) this.items[n].parentTextureArray = t, this.items[n].on("update", t.update, t);
	}, t.prototype.unbind = function(t) {
		e.prototype.unbind.call(this, t);
		for (var n = 0; n < this.length; n++) this.items[n].parentTextureArray = null, this.items[n].off("update", t.update, t);
	}, t.prototype.load = function() {
		var e = this;
		if (this._load) return this._load;
		var t = this.items.map(function(e) {
			return e.resource;
		}).filter(function(e) {
			return e;
		}).map(function(e) {
			return e.load();
		});
		return this._load = Promise.all(t).then(function() {
			var t = e.items[0], n = t.realWidth, r = t.realHeight;
			return e.resize(n, r), Promise.resolve(e);
		}), this._load;
	}, t;
}($t), rn = function(e) {
	J(t, e);
	function t(t, n) {
		var r = this, i = n || {}, a = i.width, o = i.height, s, c;
		return Array.isArray(t) ? (s = t, c = t.length) : c = t, r = e.call(this, c, {
			width: a,
			height: o
		}) || this, s && r.initFromArray(s, n), r;
	}
	return t.prototype.addBaseTextureAt = function(e, t) {
		if (e.resource) this.addResourceAt(e.resource, t);
		else throw Error("ArrayResource does not support RenderTexture");
		return this;
	}, t.prototype.bind = function(t) {
		e.prototype.bind.call(this, t), t.target = N.TEXTURE_2D_ARRAY;
	}, t.prototype.upload = function(e, t, n) {
		var r = this, i = r.length, a = r.itemDirtyIds, o = r.items, s = e.gl;
		n.dirtyId < 0 && s.texImage3D(s.TEXTURE_2D_ARRAY, 0, n.internalFormat, this._width, this._height, i, 0, t.format, n.type, null);
		for (var c = 0; c < i; c++) {
			var l = o[c];
			a[c] < l.dirtyId && (a[c] = l.dirtyId, l.valid && s.texSubImage3D(s.TEXTURE_2D_ARRAY, 0, 0, 0, c, l.resource.width, l.resource.height, 1, t.format, n.type, l.resource.source));
		}
		return !0;
	}, t;
}(nn), an = function(e) {
	J(t, e);
	function t(t) {
		var n = this, r = t, i = r.naturalWidth || r.videoWidth || r.width, a = r.naturalHeight || r.videoHeight || r.height;
		return n = e.call(this, i, a) || this, n.source = t, n.noSubImage = !1, n;
	}
	return t.crossOrigin = function(e, t, n) {
		n === void 0 && t.indexOf("data:") !== 0 ? e.crossOrigin = pt(t) : n !== !1 && (e.crossOrigin = typeof n == "string" ? n : "anonymous");
	}, t.prototype.upload = function(e, t, n, r) {
		var i = e.gl, a = t.realWidth, o = t.realHeight;
		if (r ||= this.source, r instanceof HTMLImageElement) {
			if (!r.complete || r.naturalWidth === 0) return !1;
		} else if (r instanceof HTMLVideoElement && r.readyState <= 1) return !1;
		return i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.alphaMode === ie.UNPACK), !this.noSubImage && t.target === i.TEXTURE_2D && n.width === a && n.height === o ? i.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, t.format, n.type, r) : (n.width = a, n.height = o, i.texImage2D(t.target, 0, n.internalFormat, t.format, n.type, r)), !0;
	}, t.prototype.update = function() {
		if (!this.destroyed) {
			var t = this.source, n = t.naturalWidth || t.videoWidth || t.width, r = t.naturalHeight || t.videoHeight || t.height;
			this.resize(n, r), e.prototype.update.call(this);
		}
	}, t.prototype.dispose = function() {
		this.source = null;
	}, t;
}($t), on = function(e) {
	J(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.test = function(e) {
		var t = globalThis.OffscreenCanvas;
		return t && e instanceof t ? !0 : globalThis.HTMLCanvasElement && e instanceof HTMLCanvasElement;
	}, t;
}(an), sn = function(e) {
	J(t, e);
	function t(n, r) {
		var i = this, a = r || {}, o = a.width, s = a.height, c = a.autoLoad, l = a.linkBaseTexture;
		if (n && n.length !== t.SIDES) throw Error("Invalid length. Got " + n.length + ", expected 6");
		i = e.call(this, 6, {
			width: o,
			height: s
		}) || this;
		for (var u = 0; u < t.SIDES; u++) i.items[u].target = N.TEXTURE_CUBE_MAP_POSITIVE_X + u;
		return i.linkBaseTexture = l !== !1, n && i.initFromArray(n, r), c !== !1 && i.load(), i;
	}
	return t.prototype.bind = function(t) {
		e.prototype.bind.call(this, t), t.target = N.TEXTURE_CUBE_MAP;
	}, t.prototype.addBaseTextureAt = function(e, t, n) {
		if (!this.items[t]) throw Error("Index " + t + " is out of bounds");
		if (!this.linkBaseTexture || e.parentTextureArray || Object.keys(e._glTextures).length > 0) if (e.resource) this.addResourceAt(e.resource, t);
		else throw Error("CubeResource does not support copying of renderTexture.");
		else e.target = N.TEXTURE_CUBE_MAP_POSITIVE_X + t, e.parentTextureArray = this.baseTexture, this.items[t] = e;
		return e.valid && !this.valid && this.resize(e.realWidth, e.realHeight), this.items[t] = e, this;
	}, t.prototype.upload = function(e, n, r) {
		for (var i = this.itemDirtyIds, a = 0; a < t.SIDES; a++) {
			var o = this.items[a];
			(i[a] < o.dirtyId || r.dirtyId < n.dirtyId) && (o.valid && o.resource ? (o.resource.upload(e, o, r), i[a] = o.dirtyId) : i[a] < -1 && (e.gl.texImage2D(o.target, 0, r.internalFormat, n.realWidth, n.realHeight, 0, n.format, r.type, null), i[a] = -1));
		}
		return !0;
	}, t.test = function(e) {
		return Array.isArray(e) && e.length === t.SIDES;
	}, t.SIDES = 6, t;
}(nn), cn = function(e) {
	J(t, e);
	function t(t, n) {
		var r = this;
		if (n ||= {}, !(t instanceof HTMLImageElement)) {
			var i = new Image();
			an.crossOrigin(i, t, n.crossorigin), i.src = t, t = i;
		}
		return r = e.call(this, t) || this, !t.complete && r._width && r._height && (r._width = 0, r._height = 0), r.url = t.src, r._process = null, r.preserveBitmap = !1, r.createBitmap = (n.createBitmap === void 0 ? V.CREATE_IMAGE_BITMAP : n.createBitmap) && !!globalThis.createImageBitmap, r.alphaMode = typeof n.alphaMode == "number" ? n.alphaMode : null, r.bitmap = null, r._load = null, n.autoLoad !== !1 && r.load(), r;
	}
	return t.prototype.load = function(e) {
		var t = this;
		return this._load ? this._load : (e !== void 0 && (this.createBitmap = e), this._load = new Promise(function(e, n) {
			var r = t.source;
			t.url = r.src;
			var i = function() {
				t.destroyed || (r.onload = null, r.onerror = null, t.resize(r.width, r.height), t._load = null, t.createBitmap ? e(t.process()) : e(t));
			};
			r.complete && r.src ? i() : (r.onload = i, r.onerror = function(e) {
				n(e), t.onError.emit(e);
			});
		}), this._load);
	}, t.prototype.process = function() {
		var e = this, t = this.source;
		if (this._process !== null) return this._process;
		if (this.bitmap !== null || !globalThis.createImageBitmap) return Promise.resolve(this);
		var n = globalThis.createImageBitmap, r = !t.crossOrigin || t.crossOrigin === "anonymous";
		return this._process = fetch(t.src, { mode: r ? "cors" : "no-cors" }).then(function(e) {
			return e.blob();
		}).then(function(r) {
			return n(r, 0, 0, t.width, t.height, { premultiplyAlpha: e.alphaMode === null || e.alphaMode === ie.UNPACK ? "premultiply" : "none" });
		}).then(function(t) {
			return e.destroyed ? Promise.reject() : (e.bitmap = t, e.update(), e._process = null, Promise.resolve(e));
		}), this._process;
	}, t.prototype.upload = function(t, n, r) {
		if (typeof this.alphaMode == "number" && (n.alphaMode = this.alphaMode), !this.createBitmap) return e.prototype.upload.call(this, t, n, r);
		if (!this.bitmap && (this.process(), !this.bitmap)) return !1;
		if (e.prototype.upload.call(this, t, n, r, this.bitmap), !this.preserveBitmap) {
			var i = !0, a = n._glTextures;
			for (var o in a) {
				var s = a[o];
				if (s !== r && s.dirtyId !== n.dirtyId) {
					i = !1;
					break;
				}
			}
			i && (this.bitmap.close && this.bitmap.close(), this.bitmap = null);
		}
		return !0;
	}, t.prototype.dispose = function() {
		this.source.onload = null, this.source.onerror = null, e.prototype.dispose.call(this), this.bitmap &&= (this.bitmap.close(), null), this._process = null, this._load = null;
	}, t.test = function(e) {
		return typeof e == "string" || e instanceof HTMLImageElement;
	}, t;
}(an), ln = function(e) {
	J(t, e);
	function t(t, n) {
		var r = this;
		return n ||= {}, r = e.call(this, V.ADAPTER.createCanvas()) || this, r._width = 0, r._height = 0, r.svg = t, r.scale = n.scale || 1, r._overrideWidth = n.width, r._overrideHeight = n.height, r._resolve = null, r._crossorigin = n.crossorigin, r._load = null, n.autoLoad !== !1 && r.load(), r;
	}
	return t.prototype.load = function() {
		var e = this;
		return this._load ||= new Promise(function(n) {
			if (e._resolve = function() {
				e.resize(e.source.width, e.source.height), n(e);
			}, t.SVG_XML.test(e.svg.trim())) {
				if (!btoa) throw Error("Your browser doesn't support base64 conversions.");
				e.svg = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(e.svg)));
			}
			e._loadSvg();
		}), this._load;
	}, t.prototype._loadSvg = function() {
		var e = this, t = new Image();
		an.crossOrigin(t, this.svg, this._crossorigin), t.src = this.svg, t.onerror = function(n) {
			e._resolve && (t.onerror = null, e.onError.emit(n));
		}, t.onload = function() {
			if (e._resolve) {
				var n = t.width, r = t.height;
				if (!n || !r) throw Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
				var i = n * e.scale, a = r * e.scale;
				(e._overrideWidth || e._overrideHeight) && (i = e._overrideWidth || e._overrideHeight / r * n, a = e._overrideHeight || e._overrideWidth / n * r), i = Math.round(i), a = Math.round(a);
				var o = e.source;
				o.width = i, o.height = a, o._pixiId = "canvas_" + rt(), o.getContext("2d").drawImage(t, 0, 0, n, r, 0, 0, i, a), e._resolve(), e._resolve = null;
			}
		};
	}, t.getSize = function(e) {
		var n = t.SVG_SIZE.exec(e), r = {};
		return n && (r[n[1]] = Math.round(parseFloat(n[3])), r[n[5]] = Math.round(parseFloat(n[7]))), r;
	}, t.prototype.dispose = function() {
		e.prototype.dispose.call(this), this._resolve = null, this._crossorigin = null;
	}, t.test = function(e, n) {
		return n === "svg" || typeof e == "string" && e.startsWith("data:image/svg+xml") || typeof e == "string" && t.SVG_XML.test(e);
	}, t.SVG_XML = /^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m, t.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i, t;
}(an), un = function(e) {
	J(t, e);
	function t(n, r) {
		var i = this;
		if (r ||= {}, !(n instanceof HTMLVideoElement)) {
			var a = document.createElement("video");
			a.setAttribute("preload", "auto"), a.setAttribute("webkit-playsinline", ""), a.setAttribute("playsinline", ""), typeof n == "string" && (n = [n]);
			var o = n[0].src || n[0];
			an.crossOrigin(a, o, r.crossorigin);
			for (var s = 0; s < n.length; ++s) {
				var c = document.createElement("source"), l = n[s], u = l.src, d = l.mime;
				u ||= n[s];
				var f = u.split("?").shift().toLowerCase(), p = f.slice(f.lastIndexOf(".") + 1);
				d = d || t.MIME_TYPES[p] || "video/" + p, c.src = u, c.type = d, a.appendChild(c);
			}
			n = a;
		}
		return i = e.call(this, n) || this, i.noSubImage = !0, i._autoUpdate = !0, i._isConnectedToTicker = !1, i._updateFPS = r.updateFPS || 0, i._msToNextUpdate = 0, i.autoPlay = r.autoPlay !== !1, i._load = null, i._resolve = null, i._onCanPlay = i._onCanPlay.bind(i), i._onError = i._onError.bind(i), r.autoLoad !== !1 && i.load(), i;
	}
	return t.prototype.update = function(t) {
		if (!this.destroyed) {
			var n = Kt.shared.elapsedMS * this.source.playbackRate;
			this._msToNextUpdate = Math.floor(this._msToNextUpdate - n), (!this._updateFPS || this._msToNextUpdate <= 0) && (e.prototype.update.call(this), this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0);
		}
	}, t.prototype.load = function() {
		var e = this;
		if (this._load) return this._load;
		var t = this.source;
		return (t.readyState === t.HAVE_ENOUGH_DATA || t.readyState === t.HAVE_FUTURE_DATA) && t.width && t.height && (t.complete = !0), t.addEventListener("play", this._onPlayStart.bind(this)), t.addEventListener("pause", this._onPlayStop.bind(this)), this._isSourceReady() ? this._onCanPlay() : (t.addEventListener("canplay", this._onCanPlay), t.addEventListener("canplaythrough", this._onCanPlay), t.addEventListener("error", this._onError, !0)), this._load = new Promise(function(n) {
			e.valid ? n(e) : (e._resolve = n, t.load());
		}), this._load;
	}, t.prototype._onError = function(e) {
		this.source.removeEventListener("error", this._onError, !0), this.onError.emit(e);
	}, t.prototype._isSourcePlaying = function() {
		var e = this.source;
		return !e.paused && !e.ended && this._isSourceReady();
	}, t.prototype._isSourceReady = function() {
		return this.source.readyState > 2;
	}, t.prototype._onPlayStart = function() {
		this.valid || this._onCanPlay(), this.autoUpdate && !this._isConnectedToTicker && (Kt.shared.add(this.update, this), this._isConnectedToTicker = !0);
	}, t.prototype._onPlayStop = function() {
		this._isConnectedToTicker &&= (Kt.shared.remove(this.update, this), !1);
	}, t.prototype._onCanPlay = function() {
		var e = this.source;
		e.removeEventListener("canplay", this._onCanPlay), e.removeEventListener("canplaythrough", this._onCanPlay);
		var t = this.valid;
		this.resize(e.videoWidth, e.videoHeight), !t && this._resolve && (this._resolve(this), this._resolve = null), this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && e.play();
	}, t.prototype.dispose = function() {
		this._isConnectedToTicker &&= (Kt.shared.remove(this.update, this), !1);
		var t = this.source;
		t && (t.removeEventListener("error", this._onError, !0), t.pause(), t.src = "", t.load()), e.prototype.dispose.call(this);
	}, Object.defineProperty(t.prototype, "autoUpdate", {
		get: function() {
			return this._autoUpdate;
		},
		set: function(e) {
			e !== this._autoUpdate && (this._autoUpdate = e, !this._autoUpdate && this._isConnectedToTicker ? (Kt.shared.remove(this.update, this), this._isConnectedToTicker = !1) : this._autoUpdate && !this._isConnectedToTicker && this._isSourcePlaying() && (Kt.shared.add(this.update, this), this._isConnectedToTicker = !0));
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "updateFPS", {
		get: function() {
			return this._updateFPS;
		},
		set: function(e) {
			e !== this._updateFPS && (this._updateFPS = e);
		},
		enumerable: !1,
		configurable: !0
	}), t.test = function(e, n) {
		return globalThis.HTMLVideoElement && e instanceof HTMLVideoElement || t.TYPES.indexOf(n) > -1;
	}, t.TYPES = [
		"mp4",
		"m4v",
		"webm",
		"ogg",
		"ogv",
		"h264",
		"avi",
		"mov"
	], t.MIME_TYPES = {
		ogv: "video/ogg",
		mov: "video/quicktime",
		m4v: "video/mp4"
	}, t;
}(an), dn = function(e) {
	J(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.test = function(e) {
		return !!globalThis.createImageBitmap && typeof ImageBitmap < "u" && e instanceof ImageBitmap;
	}, t;
}(an);
Jt.push(cn, dn, on, un, ln, en, sn, rn);
var fn = {
	__proto__: null,
	Resource: $t,
	BaseImageResource: an,
	INSTALLED: Jt,
	autoDetectResource: Yt,
	AbstractMultiResource: nn,
	ArrayResource: rn,
	BufferResource: en,
	CanvasResource: on,
	CubeResource: sn,
	ImageResource: cn,
	SVGResource: ln,
	VideoResource: un,
	ImageBitmapResource: dn
}, pn = function(e) {
	J(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.prototype.upload = function(e, t, n) {
		var r = e.gl;
		r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.alphaMode === ie.UNPACK);
		var i = t.realWidth, a = t.realHeight;
		return n.width === i && n.height === a ? r.texSubImage2D(t.target, 0, 0, 0, i, a, t.format, n.type, this.data) : (n.width = i, n.height = a, r.texImage2D(t.target, 0, n.internalFormat, i, a, 0, t.format, n.type, this.data)), !0;
	}, t;
}(en), mn = function() {
	function e(e, t) {
		this.width = Math.round(e || 100), this.height = Math.round(t || 100), this.stencil = !1, this.depth = !1, this.dirtyId = 0, this.dirtyFormat = 0, this.dirtySize = 0, this.depthTexture = null, this.colorTextures = [], this.glFramebuffers = {}, this.disposeRunner = new Ut("disposeFramebuffer"), this.multisample = L.NONE;
	}
	return Object.defineProperty(e.prototype, "colorTexture", {
		get: function() {
			return this.colorTextures[0];
		},
		enumerable: !1,
		configurable: !0
	}), e.prototype.addColorTexture = function(e, t) {
		return e === void 0 && (e = 0), this.colorTextures[e] = t || new Y(null, {
			scaleMode: te.NEAREST,
			resolution: 1,
			mipmap: re.OFF,
			width: this.width,
			height: this.height
		}), this.dirtyId++, this.dirtyFormat++, this;
	}, e.prototype.addDepthTexture = function(e) {
		return this.depthTexture = e || new Y(new pn(null, {
			width: this.width,
			height: this.height
		}), {
			scaleMode: te.NEAREST,
			resolution: 1,
			width: this.width,
			height: this.height,
			mipmap: re.OFF,
			format: M.DEPTH_COMPONENT,
			type: P.UNSIGNED_SHORT
		}), this.dirtyId++, this.dirtyFormat++, this;
	}, e.prototype.enableDepth = function() {
		return this.depth = !0, this.dirtyId++, this.dirtyFormat++, this;
	}, e.prototype.enableStencil = function() {
		return this.stencil = !0, this.dirtyId++, this.dirtyFormat++, this;
	}, e.prototype.resize = function(e, t) {
		if (e = Math.round(e), t = Math.round(t), !(e === this.width && t === this.height)) {
			this.width = e, this.height = t, this.dirtyId++, this.dirtySize++;
			for (var n = 0; n < this.colorTextures.length; n++) {
				var r = this.colorTextures[n], i = r.resolution;
				r.setSize(e / i, t / i);
			}
			if (this.depthTexture) {
				var i = this.depthTexture.resolution;
				this.depthTexture.setSize(e / i, t / i);
			}
		}
	}, e.prototype.dispose = function() {
		this.disposeRunner.emit(this, !1);
	}, e.prototype.destroyDepthTexture = function() {
		this.depthTexture && (this.depthTexture.destroy(), this.depthTexture = null, ++this.dirtyId, ++this.dirtyFormat);
	}, e;
}(), hn = function(e) {
	J(t, e);
	function t(t) {
		t === void 0 && (t = {});
		var n = this;
		return typeof t == "number" && (t = {
			width: arguments[0],
			height: arguments[1],
			scaleMode: arguments[2],
			resolution: arguments[3]
		}), t.width = t.width || 100, t.height = t.height || 100, t.multisample = t.multisample === void 0 ? L.NONE : t.multisample, n = e.call(this, null, t) || this, n.mipmap = re.OFF, n.valid = !0, n.clearColor = [
			0,
			0,
			0,
			0
		], n.framebuffer = new mn(n.realWidth, n.realHeight).addColorTexture(0, n), n.framebuffer.multisample = t.multisample, n.maskStack = [], n.filterStack = [{}], n;
	}
	return t.prototype.resize = function(e, t) {
		this.framebuffer.resize(e * this.resolution, t * this.resolution), this.setRealSize(this.framebuffer.width, this.framebuffer.height);
	}, t.prototype.dispose = function() {
		this.framebuffer.dispose(), e.prototype.dispose.call(this);
	}, t.prototype.destroy = function() {
		e.prototype.destroy.call(this), this.framebuffer.destroyDepthTexture(), this.framebuffer = null;
	}, t;
}(Y), gn = function() {
	function e() {
		this.x0 = 0, this.y0 = 0, this.x1 = 1, this.y1 = 0, this.x2 = 1, this.y2 = 1, this.x3 = 0, this.y3 = 1, this.uvsFloat32 = /* @__PURE__ */ new Float32Array(8);
	}
	return e.prototype.set = function(e, t, n) {
		var r = t.width, i = t.height;
		if (n) {
			var a = e.width / 2 / r, o = e.height / 2 / i, s = e.x / r + a, c = e.y / i + o;
			n = G.add(n, G.NW), this.x0 = s + a * G.uX(n), this.y0 = c + o * G.uY(n), n = G.add(n, 2), this.x1 = s + a * G.uX(n), this.y1 = c + o * G.uY(n), n = G.add(n, 2), this.x2 = s + a * G.uX(n), this.y2 = c + o * G.uY(n), n = G.add(n, 2), this.x3 = s + a * G.uX(n), this.y3 = c + o * G.uY(n);
		} else this.x0 = e.x / r, this.y0 = e.y / i, this.x1 = (e.x + e.width) / r, this.y1 = e.y / i, this.x2 = (e.x + e.width) / r, this.y2 = (e.y + e.height) / i, this.x3 = e.x / r, this.y3 = (e.y + e.height) / i;
		this.uvsFloat32[0] = this.x0, this.uvsFloat32[1] = this.y0, this.uvsFloat32[2] = this.x1, this.uvsFloat32[3] = this.y1, this.uvsFloat32[4] = this.x2, this.uvsFloat32[5] = this.y2, this.uvsFloat32[6] = this.x3, this.uvsFloat32[7] = this.y3;
	}, e.prototype.toString = function() {
		return "[@pixi/core:TextureUvs " + ("x0=" + this.x0 + " y0=" + this.y0 + " ") + ("x1=" + this.x1 + " y1=" + this.y1 + " x2=" + this.x2 + " ") + ("y2=" + this.y2 + " x3=" + this.x3 + " y3=" + this.y3) + "]";
	}, e;
}(), _n = new gn();
function vn(e) {
	e.destroy = function() {}, e.on = function() {}, e.once = function() {}, e.emit = function() {};
}
var X = function(e) {
	J(t, e);
	function t(n, r, i, a, o, s) {
		var c = e.call(this) || this;
		if (c.noFrame = !1, r ||= (c.noFrame = !0, new U(0, 0, 1, 1)), n instanceof t && (n = n.baseTexture), c.baseTexture = n, c._frame = r, c.trim = a, c.valid = !1, c._uvs = _n, c.uvMatrix = null, c.orig = i || r, c._rotate = Number(o || 0), o === !0) c._rotate = 2;
		else if (c._rotate % 2 != 0) throw Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
		return c.defaultAnchor = s ? new H(s.x, s.y) : new H(0, 0), c._updateID = 0, c.textureCacheIds = [], n.valid ? c.noFrame ? n.valid && c.onBaseTextureUpdated(n) : c.frame = r : n.once("loaded", c.onBaseTextureUpdated, c), c.noFrame && n.on("update", c.onBaseTextureUpdated, c), c;
	}
	return t.prototype.update = function() {
		this.baseTexture.resource && this.baseTexture.resource.update();
	}, t.prototype.onBaseTextureUpdated = function(e) {
		if (this.noFrame) {
			if (!this.baseTexture.valid) return;
			this._frame.width = e.width, this._frame.height = e.height, this.valid = !0, this.updateUvs();
		} else this.frame = this._frame;
		this.emit("update", this);
	}, t.prototype.destroy = function(e) {
		if (this.baseTexture) {
			if (e) {
				var n = this.baseTexture.resource;
				n && n.url && st[n.url] && t.removeFromCache(n.url), this.baseTexture.destroy();
			}
			this.baseTexture.off("loaded", this.onBaseTextureUpdated, this), this.baseTexture.off("update", this.onBaseTextureUpdated, this), this.baseTexture = null;
		}
		this._frame = null, this._uvs = null, this.trim = null, this.orig = null, this.valid = !1, t.removeFromCache(this), this.textureCacheIds = null;
	}, t.prototype.clone = function() {
		var e = this._frame.clone(), n = this._frame === this.orig ? e : this.orig.clone(), r = new t(this.baseTexture, !this.noFrame && e, n, this.trim && this.trim.clone(), this.rotate, this.defaultAnchor);
		return this.noFrame && (r._frame = e), r;
	}, t.prototype.updateUvs = function() {
		this._uvs === _n && (this._uvs = new gn()), this._uvs.set(this._frame, this.baseTexture, this.rotate), this._updateID++;
	}, t.from = function(e, n, r) {
		n === void 0 && (n = {}), r === void 0 && (r = V.STRICT_TEXTURE_CACHE);
		var i = typeof e == "string", a = null;
		if (i) a = e;
		else if (e instanceof Y) {
			if (!e.cacheId) {
				var o = n && n.pixiIdPrefix || "pixiid";
				e.cacheId = o + "-" + rt(), Y.addToCache(e, e.cacheId);
			}
			a = e.cacheId;
		} else {
			if (!e._pixiId) {
				var o = n && n.pixiIdPrefix || "pixiid";
				e._pixiId = o + "_" + rt();
			}
			a = e._pixiId;
		}
		var s = st[a];
		if (i && r && !s) throw Error("The cacheId \"" + a + "\" does not exist in TextureCache.");
		return !s && !(e instanceof Y) ? (n.resolution ||= mt(e), s = new t(new Y(e, n)), s.baseTexture.cacheId = a, Y.addToCache(s.baseTexture, a), t.addToCache(s, a)) : !s && e instanceof Y && (s = new t(e), t.addToCache(s, a)), s;
	}, t.fromURL = function(e, n) {
		var r = Object.assign({ autoLoad: !1 }, n?.resourceOptions), i = t.from(e, Object.assign({ resourceOptions: r }, n), !1), a = i.baseTexture.resource;
		return i.baseTexture.valid ? Promise.resolve(i) : a.load().then(function() {
			return Promise.resolve(i);
		});
	}, t.fromBuffer = function(e, n, r, i) {
		return new t(Y.fromBuffer(e, n, r, i));
	}, t.fromLoader = function(e, n, r, i) {
		var a = new Y(e, Object.assign({
			scaleMode: V.SCALE_MODE,
			resolution: mt(n)
		}, i)), o = a.resource;
		o instanceof cn && (o.url = n);
		var s = new t(a);
		return r ||= n, Y.addToCache(s.baseTexture, r), t.addToCache(s, r), r !== n && (Y.addToCache(s.baseTexture, n), t.addToCache(s, n)), s.baseTexture.valid ? Promise.resolve(s) : new Promise(function(e) {
			s.baseTexture.once("loaded", function() {
				return e(s);
			});
		});
	}, t.addToCache = function(e, t) {
		t && (e.textureCacheIds.indexOf(t) === -1 && e.textureCacheIds.push(t), st[t] && console.warn("Texture added to the cache with an id [" + t + "] that already had an entry"), st[t] = e);
	}, t.removeFromCache = function(e) {
		if (typeof e == "string") {
			var t = st[e];
			if (t) {
				var n = t.textureCacheIds.indexOf(e);
				return n > -1 && t.textureCacheIds.splice(n, 1), delete st[e], t;
			}
		} else if (e && e.textureCacheIds) {
			for (var r = 0; r < e.textureCacheIds.length; ++r) st[e.textureCacheIds[r]] === e && delete st[e.textureCacheIds[r]];
			return e.textureCacheIds.length = 0, e;
		}
		return null;
	}, Object.defineProperty(t.prototype, "resolution", {
		get: function() {
			return this.baseTexture.resolution;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "frame", {
		get: function() {
			return this._frame;
		},
		set: function(e) {
			this._frame = e, this.noFrame = !1;
			var t = e.x, n = e.y, r = e.width, i = e.height, a = t + r > this.baseTexture.width, o = n + i > this.baseTexture.height;
			if (a || o) {
				var s = a && o ? "and" : "or", c = "X: " + t + " + " + r + " = " + (t + r) + " > " + this.baseTexture.width, l = "Y: " + n + " + " + i + " = " + (n + i) + " > " + this.baseTexture.height;
				throw Error("Texture Error: frame does not fit inside the base Texture dimensions: " + (c + " " + s + " " + l));
			}
			this.valid = r && i && this.baseTexture.valid, !this.trim && !this.rotate && (this.orig = e), this.valid && this.updateUvs();
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "rotate", {
		get: function() {
			return this._rotate;
		},
		set: function(e) {
			this._rotate = e, this.valid && this.updateUvs();
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "width", {
		get: function() {
			return this.orig.width;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "height", {
		get: function() {
			return this.orig.height;
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype.castToBaseTexture = function() {
		return this.baseTexture;
	}, Object.defineProperty(t, "EMPTY", {
		get: function() {
			return t._EMPTY || (t._EMPTY = new t(new Y()), vn(t._EMPTY), vn(t._EMPTY.baseTexture)), t._EMPTY;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t, "WHITE", {
		get: function() {
			if (!t._WHITE) {
				var e = V.ADAPTER.createCanvas(16, 16), n = e.getContext("2d");
				e.width = 16, e.height = 16, n.fillStyle = "white", n.fillRect(0, 0, 16, 16), t._WHITE = new t(Y.from(e)), vn(t._WHITE), vn(t._WHITE.baseTexture);
			}
			return t._WHITE;
		},
		enumerable: !1,
		configurable: !0
	}), t;
}(Ae.default), yn = function(e) {
	J(t, e);
	function t(t, n) {
		var r = e.call(this, t, n) || this;
		return r.valid = !0, r.filterFrame = null, r.filterPoolKey = null, r.updateUvs(), r;
	}
	return Object.defineProperty(t.prototype, "framebuffer", {
		get: function() {
			return this.baseTexture.framebuffer;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "multisample", {
		get: function() {
			return this.framebuffer.multisample;
		},
		set: function(e) {
			this.framebuffer.multisample = e;
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype.resize = function(e, t, n) {
		n === void 0 && (n = !0);
		var r = this.baseTexture.resolution, i = Math.round(e * r) / r, a = Math.round(t * r) / r;
		this.valid = i > 0 && a > 0, this._frame.width = this.orig.width = i, this._frame.height = this.orig.height = a, n && this.baseTexture.resize(i, a), this.updateUvs();
	}, t.prototype.setResolution = function(e) {
		var t = this.baseTexture;
		t.resolution !== e && (t.setResolution(e), this.resize(t.width, t.height, !1));
	}, t.create = function(e) {
		for (var n = arguments, r = [], i = 1; i < arguments.length; i++) r[i - 1] = n[i];
		return typeof e == "number" && (at("6.0.0", "Arguments (width, height, scaleMode, resolution) have been deprecated."), e = {
			width: e,
			height: r[0],
			scaleMode: r[1],
			resolution: r[2]
		}), new t(new hn(e));
	}, t;
}(X), bn = function() {
	function e(e) {
		this.texturePool = {}, this.textureOptions = e || {}, this.enableFullScreen = !1, this._pixelsWidth = 0, this._pixelsHeight = 0;
	}
	return e.prototype.createTexture = function(e, t, n) {
		return n === void 0 && (n = L.NONE), new yn(new hn(Object.assign({
			width: e,
			height: t,
			resolution: 1,
			multisample: n
		}, this.textureOptions)));
	}, e.prototype.getOptimalTexture = function(e, t, n, r) {
		n === void 0 && (n = 1), r === void 0 && (r = L.NONE);
		var i;
		e = Math.ceil(e * n - 1e-6), t = Math.ceil(t * n - 1e-6), !this.enableFullScreen || e !== this._pixelsWidth || t !== this._pixelsHeight ? (e = Ze(e), t = Ze(t), i = ((e & 65535) << 16 | t & 65535) >>> 0, r > 1 && (i += r * 4294967296)) : i = r > 1 ? -r : -1, this.texturePool[i] || (this.texturePool[i] = []);
		var a = this.texturePool[i].pop();
		return a ||= this.createTexture(e, t, r), a.filterPoolKey = i, a.setResolution(n), a;
	}, e.prototype.getFilterTexture = function(e, t, n) {
		var r = this.getOptimalTexture(e.width, e.height, t || e.resolution, n || L.NONE);
		return r.filterFrame = e.filterFrame, r;
	}, e.prototype.returnTexture = function(e) {
		var t = e.filterPoolKey;
		e.filterFrame = null, this.texturePool[t].push(e);
	}, e.prototype.returnFilterTexture = function(e) {
		this.returnTexture(e);
	}, e.prototype.clear = function(e) {
		if (e = e !== !1, e) for (var t in this.texturePool) {
			var n = this.texturePool[t];
			if (n) for (var r = 0; r < n.length; r++) n[r].destroy(!0);
		}
		this.texturePool = {};
	}, e.prototype.setScreenSize = function(e) {
		if (!(e.width === this._pixelsWidth && e.height === this._pixelsHeight)) {
			for (var t in this.enableFullScreen = e.width > 0 && e.height > 0, this.texturePool) if (Number(t) < 0) {
				var n = this.texturePool[t];
				if (n) for (var r = 0; r < n.length; r++) n[r].destroy(!0);
				this.texturePool[t] = [];
			}
			this._pixelsWidth = e.width, this._pixelsHeight = e.height;
		}
	}, e.SCREEN_KEY = -1, e;
}(), xn = function() {
	function e(e, t, n, r, i, a, o) {
		t === void 0 && (t = 0), n === void 0 && (n = !1), r === void 0 && (r = P.FLOAT), this.buffer = e, this.size = t, this.normalized = n, this.type = r, this.stride = i, this.start = a, this.instance = o;
	}
	return e.prototype.destroy = function() {
		this.buffer = null;
	}, e.from = function(t, n, r, i, a) {
		return new e(t, n, r, i, a);
	}, e;
}(), Sn = 0, Cn = function() {
	function e(e, t, n) {
		t === void 0 && (t = !0), n === void 0 && (n = !1), this.data = e || /* @__PURE__ */ new Float32Array(1), this._glBuffers = {}, this._updateID = 0, this.index = n, this.static = t, this.id = Sn++, this.disposeRunner = new Ut("disposeBuffer");
	}
	return e.prototype.update = function(e) {
		e instanceof Array && (e = new Float32Array(e)), this.data = e || this.data, this._updateID++;
	}, e.prototype.dispose = function() {
		this.disposeRunner.emit(this, !1);
	}, e.prototype.destroy = function() {
		this.dispose(), this.data = null;
	}, Object.defineProperty(e.prototype, "index", {
		get: function() {
			return this.type === R.ELEMENT_ARRAY_BUFFER;
		},
		set: function(e) {
			this.type = e ? R.ELEMENT_ARRAY_BUFFER : R.ARRAY_BUFFER;
		},
		enumerable: !1,
		configurable: !0
	}), e.from = function(t) {
		return t instanceof Array && (t = new Float32Array(t)), new e(t);
	}, e;
}(), wn = {
	Float32Array,
	Uint32Array,
	Int32Array,
	Uint8Array
};
function Tn(e, t) {
	for (var n = 0, r = 0, i = {}, a = 0; a < e.length; a++) r += t[a], n += e[a].length;
	for (var o = /* @__PURE__ */ new ArrayBuffer(n * 4), s = null, c = 0, a = 0; a < e.length; a++) {
		var l = t[a], u = e[a], d = Xe(u);
		i[d] || (i[d] = new wn[d](o)), s = i[d];
		for (var f = 0; f < u.length; f++) {
			var p = (f / l | 0) * r + c, m = f % l;
			s[p + m] = u[f];
		}
		c += l;
	}
	return new Float32Array(o);
}
var En = {
	5126: 4,
	5123: 2,
	5121: 1
}, Dn = 0, On = {
	Float32Array,
	Uint32Array,
	Int32Array,
	Uint8Array,
	Uint16Array
}, kn = function() {
	function e(e, t) {
		e === void 0 && (e = []), t === void 0 && (t = {}), this.buffers = e, this.indexBuffer = null, this.attributes = t, this.glVertexArrayObjects = {}, this.id = Dn++, this.instanced = !1, this.instanceCount = 1, this.disposeRunner = new Ut("disposeGeometry"), this.refCount = 0;
	}
	return e.prototype.addAttribute = function(e, t, n, r, i, a, o, s) {
		if (n === void 0 && (n = 0), r === void 0 && (r = !1), s === void 0 && (s = !1), !t) throw Error("You must pass a buffer when creating an attribute");
		t instanceof Cn || (t instanceof Array && (t = new Float32Array(t)), t = new Cn(t));
		var c = e.split("|");
		if (c.length > 1) {
			for (var l = 0; l < c.length; l++) this.addAttribute(c[l], t, n, r, i);
			return this;
		}
		var u = this.buffers.indexOf(t);
		return u === -1 && (this.buffers.push(t), u = this.buffers.length - 1), this.attributes[e] = new xn(u, n, r, i, a, o, s), this.instanced = this.instanced || s, this;
	}, e.prototype.getAttribute = function(e) {
		return this.attributes[e];
	}, e.prototype.getBuffer = function(e) {
		return this.buffers[this.getAttribute(e).buffer];
	}, e.prototype.addIndex = function(e) {
		return e instanceof Cn || (e instanceof Array && (e = new Uint16Array(e)), e = new Cn(e)), e.type = R.ELEMENT_ARRAY_BUFFER, this.indexBuffer = e, this.buffers.indexOf(e) === -1 && this.buffers.push(e), this;
	}, e.prototype.getIndex = function() {
		return this.indexBuffer;
	}, e.prototype.interleave = function() {
		if (this.buffers.length === 1 || this.buffers.length === 2 && this.indexBuffer) return this;
		var e = [], t = [], n = new Cn(), r;
		for (r in this.attributes) {
			var i = this.attributes[r], a = this.buffers[i.buffer];
			e.push(a.data), t.push(i.size * En[i.type] / 4), i.buffer = 0;
		}
		for (n.data = Tn(e, t), r = 0; r < this.buffers.length; r++) this.buffers[r] !== this.indexBuffer && this.buffers[r].destroy();
		return this.buffers = [n], this.indexBuffer && this.buffers.push(this.indexBuffer), this;
	}, e.prototype.getSize = function() {
		for (var e in this.attributes) {
			var t = this.attributes[e];
			return this.buffers[t.buffer].data.length / (t.stride / 4 || t.size);
		}
		return 0;
	}, e.prototype.dispose = function() {
		this.disposeRunner.emit(this, !1);
	}, e.prototype.destroy = function() {
		this.dispose(), this.buffers = null, this.indexBuffer = null, this.attributes = null;
	}, e.prototype.clone = function() {
		for (var t = new e(), n = 0; n < this.buffers.length; n++) t.buffers[n] = new Cn(this.buffers[n].data.slice(0));
		for (var n in this.attributes) {
			var r = this.attributes[n];
			t.attributes[n] = new xn(r.buffer, r.size, r.normalized, r.type, r.stride, r.start, r.instance);
		}
		return this.indexBuffer && (t.indexBuffer = t.buffers[this.buffers.indexOf(this.indexBuffer)], t.indexBuffer.type = R.ELEMENT_ARRAY_BUFFER), t;
	}, e.merge = function(t) {
		for (var n = new e(), r = [], i = [], a = [], o, s = 0; s < t.length; s++) {
			o = t[s];
			for (var c = 0; c < o.buffers.length; c++) i[c] = i[c] || 0, i[c] += o.buffers[c].data.length, a[c] = 0;
		}
		for (var s = 0; s < o.buffers.length; s++) r[s] = new On[Xe(o.buffers[s].data)](i[s]), n.buffers[s] = new Cn(r[s]);
		for (var s = 0; s < t.length; s++) {
			o = t[s];
			for (var c = 0; c < o.buffers.length; c++) r[c].set(o.buffers[c].data, a[c]), a[c] += o.buffers[c].data.length;
		}
		if (n.attributes = o.attributes, o.indexBuffer) {
			n.indexBuffer = n.buffers[o.buffers.indexOf(o.indexBuffer)], n.indexBuffer.type = R.ELEMENT_ARRAY_BUFFER;
			for (var l = 0, u = 0, d = 0, f = 0, s = 0; s < o.buffers.length; s++) if (o.buffers[s] !== o.indexBuffer) {
				f = s;
				break;
			}
			for (var s in o.attributes) {
				var p = o.attributes[s];
				(p.buffer | 0) === f && (u += p.size * En[p.type] / 4);
			}
			for (var s = 0; s < t.length; s++) {
				for (var m = t[s].indexBuffer.data, c = 0; c < m.length; c++) n.indexBuffer.data[c + d] += l;
				l += t[s].buffers[f].data.length / u, d += m.length;
			}
		}
		return n;
	}, e;
}(), An = function(e) {
	J(t, e);
	function t() {
		var t = e.call(this) || this;
		return t.addAttribute("aVertexPosition", new Float32Array([
			0,
			0,
			1,
			0,
			1,
			1,
			0,
			1
		])).addIndex([
			0,
			1,
			3,
			2
		]), t;
	}
	return t;
}(kn), jn = function(e) {
	J(t, e);
	function t() {
		var t = e.call(this) || this;
		return t.vertices = new Float32Array([
			-1,
			-1,
			1,
			-1,
			1,
			1,
			-1,
			1
		]), t.uvs = new Float32Array([
			0,
			0,
			1,
			0,
			1,
			1,
			0,
			1
		]), t.vertexBuffer = new Cn(t.vertices), t.uvBuffer = new Cn(t.uvs), t.addAttribute("aVertexPosition", t.vertexBuffer).addAttribute("aTextureCoord", t.uvBuffer).addIndex([
			0,
			1,
			2,
			0,
			2,
			3
		]), t;
	}
	return t.prototype.map = function(e, t) {
		var n = 0, r = 0;
		return this.uvs[0] = n, this.uvs[1] = r, this.uvs[2] = n + t.width / e.width, this.uvs[3] = r, this.uvs[4] = n + t.width / e.width, this.uvs[5] = r + t.height / e.height, this.uvs[6] = n, this.uvs[7] = r + t.height / e.height, n = t.x, r = t.y, this.vertices[0] = n, this.vertices[1] = r, this.vertices[2] = n + t.width, this.vertices[3] = r, this.vertices[4] = n + t.width, this.vertices[5] = r + t.height, this.vertices[6] = n, this.vertices[7] = r + t.height, this.invalidate(), this;
	}, t.prototype.invalidate = function() {
		return this.vertexBuffer._updateID++, this.uvBuffer._updateID++, this;
	}, t;
}(kn), Mn = 0, Nn = function() {
	function e(e, t, n) {
		this.group = !0, this.syncUniforms = {}, this.dirtyId = 0, this.id = Mn++, this.static = !!t, this.ubo = !!n, e instanceof Cn ? (this.buffer = e, this.buffer.type = R.UNIFORM_BUFFER, this.autoManage = !1, this.ubo = !0) : (this.uniforms = e, this.ubo && (this.buffer = new Cn(/* @__PURE__ */ new Float32Array(1)), this.buffer.type = R.UNIFORM_BUFFER, this.autoManage = !0));
	}
	return e.prototype.update = function() {
		this.dirtyId++, !this.autoManage && this.buffer && this.buffer.update();
	}, e.prototype.add = function(t, n, r) {
		if (!this.ubo) this.uniforms[t] = new e(n, r);
		else throw Error("[UniformGroup] uniform groups in ubo mode cannot be modified, or have uniform groups nested in them");
	}, e.from = function(t, n, r) {
		return new e(t, n, r);
	}, e.uboFrom = function(t, n) {
		return new e(t, n ?? !0, !0);
	}, e;
}(), Pn = function() {
	function e() {
		this.renderTexture = null, this.target = null, this.legacy = !1, this.resolution = 1, this.multisample = L.NONE, this.sourceFrame = new U(), this.destinationFrame = new U(), this.bindingSourceFrame = new U(), this.bindingDestinationFrame = new U(), this.filters = [], this.transform = null;
	}
	return e.prototype.clear = function() {
		this.target = null, this.filters = null, this.renderTexture = null;
	}, e;
}(), Fn = [
	new H(),
	new H(),
	new H(),
	new H()
], In = new W(), Ln = function() {
	function e(e) {
		this.renderer = e, this.defaultFilterStack = [{}], this.texturePool = new bn(), this.texturePool.setScreenSize(e.view), this.statePool = [], this.quad = new An(), this.quadUv = new jn(), this.tempRect = new U(), this.activeState = {}, this.globalUniforms = new Nn({
			outputFrame: new U(),
			inputSize: /* @__PURE__ */ new Float32Array(4),
			inputPixel: /* @__PURE__ */ new Float32Array(4),
			inputClamp: /* @__PURE__ */ new Float32Array(4),
			resolution: 1,
			filterArea: /* @__PURE__ */ new Float32Array(4),
			filterClamp: /* @__PURE__ */ new Float32Array(4)
		}, !0), this.forceClear = !1, this.useMaxPadding = !1;
	}
	return e.prototype.push = function(e, t) {
		for (var n = this.renderer, r = this.defaultFilterStack, i = this.statePool.pop() || new Pn(), a = this.renderer.renderTexture, o = t[0].resolution, s = t[0].multisample, c = t[0].padding, l = t[0].autoFit, u = t[0].legacy ?? !0, d = 1; d < t.length; d++) {
			var f = t[d];
			o = Math.min(o, f.resolution), s = Math.min(s, f.multisample), c = this.useMaxPadding ? Math.max(c, f.padding) : c + f.padding, l &&= f.autoFit, u ||= f.legacy ?? !0;
		}
		r.length === 1 && (this.defaultFilterStack[0].renderTexture = a.current), r.push(i), i.resolution = o, i.multisample = s, i.legacy = u, i.target = e, i.sourceFrame.copyFrom(e.filterArea || e.getBounds(!0)), i.sourceFrame.pad(c);
		var p = this.tempRect.copyFrom(a.sourceFrame);
		n.projection.transform && this.transformAABB(In.copyFrom(n.projection.transform).invert(), p), l ? (i.sourceFrame.fit(p), (i.sourceFrame.width <= 0 || i.sourceFrame.height <= 0) && (i.sourceFrame.width = 0, i.sourceFrame.height = 0)) : i.sourceFrame.intersects(p) || (i.sourceFrame.width = 0, i.sourceFrame.height = 0), this.roundFrame(i.sourceFrame, a.current ? a.current.resolution : n.resolution, a.sourceFrame, a.destinationFrame, n.projection.transform), i.renderTexture = this.getOptimalFilterTexture(i.sourceFrame.width, i.sourceFrame.height, o, s), i.filters = t, i.destinationFrame.width = i.renderTexture.width, i.destinationFrame.height = i.renderTexture.height;
		var m = this.tempRect;
		m.x = 0, m.y = 0, m.width = i.sourceFrame.width, m.height = i.sourceFrame.height, i.renderTexture.filterFrame = i.sourceFrame, i.bindingSourceFrame.copyFrom(a.sourceFrame), i.bindingDestinationFrame.copyFrom(a.destinationFrame), i.transform = n.projection.transform, n.projection.transform = null, a.bind(i.renderTexture, i.sourceFrame, m), n.framebuffer.clear(0, 0, 0, 0);
	}, e.prototype.pop = function() {
		var e = this.defaultFilterStack, t = e.pop(), n = t.filters;
		this.activeState = t;
		var r = this.globalUniforms.uniforms;
		r.outputFrame = t.sourceFrame, r.resolution = t.resolution;
		var i = r.inputSize, a = r.inputPixel, o = r.inputClamp;
		if (i[0] = t.destinationFrame.width, i[1] = t.destinationFrame.height, i[2] = 1 / i[0], i[3] = 1 / i[1], a[0] = Math.round(i[0] * t.resolution), a[1] = Math.round(i[1] * t.resolution), a[2] = 1 / a[0], a[3] = 1 / a[1], o[0] = .5 * a[2], o[1] = .5 * a[3], o[2] = t.sourceFrame.width * i[2] - .5 * a[2], o[3] = t.sourceFrame.height * i[3] - .5 * a[3], t.legacy) {
			var s = r.filterArea;
			s[0] = t.destinationFrame.width, s[1] = t.destinationFrame.height, s[2] = t.sourceFrame.x, s[3] = t.sourceFrame.y, r.filterClamp = r.inputClamp;
		}
		this.globalUniforms.update();
		var c = e[e.length - 1];
		if (this.renderer.framebuffer.blit(), n.length === 1) n[0].apply(this, t.renderTexture, c.renderTexture, F.BLEND, t), this.returnFilterTexture(t.renderTexture);
		else {
			var l = t.renderTexture, u = this.getOptimalFilterTexture(l.width, l.height, t.resolution);
			u.filterFrame = l.filterFrame;
			var d = 0;
			for (d = 0; d < n.length - 1; ++d) {
				d === 1 && t.multisample > 1 && (u = this.getOptimalFilterTexture(l.width, l.height, t.resolution), u.filterFrame = l.filterFrame), n[d].apply(this, l, u, F.CLEAR, t);
				var f = l;
				l = u, u = f;
			}
			n[d].apply(this, l, c.renderTexture, F.BLEND, t), d > 1 && t.multisample > 1 && this.returnFilterTexture(t.renderTexture), this.returnFilterTexture(l), this.returnFilterTexture(u);
		}
		t.clear(), this.statePool.push(t);
	}, e.prototype.bindAndClear = function(e, t) {
		t === void 0 && (t = F.CLEAR);
		var n = this.renderer, r = n.renderTexture, i = n.state;
		if (e === this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? this.renderer.projection.transform = this.activeState.transform : this.renderer.projection.transform = null, e && e.filterFrame) {
			var a = this.tempRect;
			a.x = 0, a.y = 0, a.width = e.filterFrame.width, a.height = e.filterFrame.height, r.bind(e, e.filterFrame, a);
		} else e === this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? this.renderer.renderTexture.bind(e, this.activeState.bindingSourceFrame, this.activeState.bindingDestinationFrame) : r.bind(e);
		var o = i.stateId & 1 || this.forceClear;
		(t === F.CLEAR || t === F.BLIT && o) && this.renderer.framebuffer.clear(0, 0, 0, 0);
	}, e.prototype.applyFilter = function(e, t, n, r) {
		var i = this.renderer;
		i.state.set(e.state), this.bindAndClear(n, r), e.uniforms.uSampler = t, e.uniforms.filterGlobals = this.globalUniforms, i.shader.bind(e), e.legacy = !!e.program.attributeData.aTextureCoord, e.legacy ? (this.quadUv.map(t._frame, t.filterFrame), i.geometry.bind(this.quadUv), i.geometry.draw(j.TRIANGLES)) : (i.geometry.bind(this.quad), i.geometry.draw(j.TRIANGLE_STRIP));
	}, e.prototype.calculateSpriteMatrix = function(e, t) {
		var n = this.activeState, r = n.sourceFrame, i = n.destinationFrame, a = t._texture.orig, o = e.set(i.width, 0, 0, i.height, r.x, r.y), s = t.worldTransform.copyTo(W.TEMP_MATRIX);
		return s.invert(), o.prepend(s), o.scale(1 / a.width, 1 / a.height), o.translate(t.anchor.x, t.anchor.y), o;
	}, e.prototype.destroy = function() {
		this.renderer = null, this.texturePool.clear(!1);
	}, e.prototype.getOptimalFilterTexture = function(e, t, n, r) {
		return n === void 0 && (n = 1), r === void 0 && (r = L.NONE), this.texturePool.getOptimalTexture(e, t, n, r);
	}, e.prototype.getFilterTexture = function(e, t, n) {
		if (typeof e == "number") {
			var r = e;
			e = t, t = r;
		}
		e ||= this.activeState.renderTexture;
		var i = this.texturePool.getOptimalTexture(e.width, e.height, t || e.resolution, n || L.NONE);
		return i.filterFrame = e.filterFrame, i;
	}, e.prototype.returnFilterTexture = function(e) {
		this.texturePool.returnTexture(e);
	}, e.prototype.emptyPool = function() {
		this.texturePool.clear(!0);
	}, e.prototype.resize = function() {
		this.texturePool.setScreenSize(this.renderer.view);
	}, e.prototype.transformAABB = function(e, t) {
		var n = Fn[0], r = Fn[1], i = Fn[2], a = Fn[3];
		n.set(t.left, t.top), r.set(t.left, t.bottom), i.set(t.right, t.top), a.set(t.right, t.bottom), e.apply(n, n), e.apply(r, r), e.apply(i, i), e.apply(a, a);
		var o = Math.min(n.x, r.x, i.x, a.x), s = Math.min(n.y, r.y, i.y, a.y), c = Math.max(n.x, r.x, i.x, a.x), l = Math.max(n.y, r.y, i.y, a.y);
		t.x = o, t.y = s, t.width = c - o, t.height = l - s;
	}, e.prototype.roundFrame = function(e, t, n, r, i) {
		if (!(e.width <= 0 || e.height <= 0 || n.width <= 0 || n.height <= 0)) {
			if (i) {
				var a = i.a, o = i.b, s = i.c, c = i.d;
				if ((Math.abs(o) > 1e-4 || Math.abs(s) > 1e-4) && (Math.abs(a) > 1e-4 || Math.abs(c) > 1e-4)) return;
			}
			i = i ? In.copyFrom(i) : In.identity(), i.translate(-n.x, -n.y).scale(r.width / n.width, r.height / n.height).translate(r.x, r.y), this.transformAABB(i, e), e.ceil(t), this.transformAABB(i.invert(), e);
		}
	}, e;
}(), Rn = function() {
	function e(e) {
		this.renderer = e;
	}
	return e.prototype.flush = function() {}, e.prototype.destroy = function() {
		this.renderer = null;
	}, e.prototype.start = function() {}, e.prototype.stop = function() {
		this.flush();
	}, e.prototype.render = function(e) {}, e;
}(), zn = function() {
	function e(e) {
		this.renderer = e, this.emptyRenderer = new Rn(e), this.currentRenderer = this.emptyRenderer;
	}
	return e.prototype.setObjectRenderer = function(e) {
		this.currentRenderer !== e && (this.currentRenderer.stop(), this.currentRenderer = e, this.currentRenderer.start());
	}, e.prototype.flush = function() {
		this.setObjectRenderer(this.emptyRenderer);
	}, e.prototype.reset = function() {
		this.setObjectRenderer(this.emptyRenderer);
	}, e.prototype.copyBoundTextures = function(e, t) {
		for (var n = this.renderer.texture.boundTextures, r = t - 1; r >= 0; --r) e[r] = n[r] || null, e[r] && (e[r]._batchLocation = r);
	}, e.prototype.boundArray = function(e, t, n, r) {
		for (var i = e.elements, a = e.ids, o = e.count, s = 0, c = 0; c < o; c++) {
			var l = i[c], u = l._batchLocation;
			if (u >= 0 && u < r && t[u] === l) {
				a[c] = u;
				continue;
			}
			for (; s < r;) {
				var d = t[s];
				if (d && d._batchEnabled === n && d._batchLocation === s) {
					s++;
					continue;
				}
				a[c] = s, l._batchLocation = s, t[s] = l;
				break;
			}
		}
	}, e.prototype.destroy = function() {
		this.renderer = null;
	}, e;
}(), Bn = 0, Vn = function() {
	function e(e) {
		this.renderer = e, this.webGLVersion = 1, this.extensions = {}, this.supports = { uint32Indices: !1 }, this.handleContextLost = this.handleContextLost.bind(this), this.handleContextRestored = this.handleContextRestored.bind(this), e.view.addEventListener("webglcontextlost", this.handleContextLost, !1), e.view.addEventListener("webglcontextrestored", this.handleContextRestored, !1);
	}
	return Object.defineProperty(e.prototype, "isLost", {
		get: function() {
			return !this.gl || this.gl.isContextLost();
		},
		enumerable: !1,
		configurable: !0
	}), e.prototype.contextChange = function(e) {
		this.gl = e, this.renderer.gl = e, this.renderer.CONTEXT_UID = Bn++;
	}, e.prototype.initFromContext = function(e) {
		this.gl = e, this.validateContext(e), this.renderer.gl = e, this.renderer.CONTEXT_UID = Bn++, this.renderer.runners.contextChange.emit(e);
	}, e.prototype.initFromOptions = function(e) {
		var t = this.createContext(this.renderer.view, e);
		this.initFromContext(t);
	}, e.prototype.createContext = function(e, t) {
		var n;
		if (V.PREFER_ENV >= D.WEBGL2 && (n = e.getContext("webgl2", t)), n) this.webGLVersion = 2;
		else if (this.webGLVersion = 1, n = e.getContext("webgl", t) || e.getContext("experimental-webgl", t), !n) throw Error("This browser does not support WebGL. Try using the canvas renderer");
		return this.gl = n, this.getExtensions(), this.gl;
	}, e.prototype.getExtensions = function() {
		var e = this.gl, t = {
			loseContext: e.getExtension("WEBGL_lose_context"),
			anisotropicFiltering: e.getExtension("EXT_texture_filter_anisotropic"),
			floatTextureLinear: e.getExtension("OES_texture_float_linear"),
			s3tc: e.getExtension("WEBGL_compressed_texture_s3tc"),
			s3tc_sRGB: e.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
			etc: e.getExtension("WEBGL_compressed_texture_etc"),
			etc1: e.getExtension("WEBGL_compressed_texture_etc1"),
			pvrtc: e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
			atc: e.getExtension("WEBGL_compressed_texture_atc"),
			astc: e.getExtension("WEBGL_compressed_texture_astc")
		};
		this.webGLVersion === 1 ? Object.assign(this.extensions, t, {
			drawBuffers: e.getExtension("WEBGL_draw_buffers"),
			depthTexture: e.getExtension("WEBGL_depth_texture"),
			vertexArrayObject: e.getExtension("OES_vertex_array_object") || e.getExtension("MOZ_OES_vertex_array_object") || e.getExtension("WEBKIT_OES_vertex_array_object"),
			uint32ElementIndex: e.getExtension("OES_element_index_uint"),
			floatTexture: e.getExtension("OES_texture_float"),
			floatTextureLinear: e.getExtension("OES_texture_float_linear"),
			textureHalfFloat: e.getExtension("OES_texture_half_float"),
			textureHalfFloatLinear: e.getExtension("OES_texture_half_float_linear")
		}) : this.webGLVersion === 2 && Object.assign(this.extensions, t, { colorBufferFloat: e.getExtension("EXT_color_buffer_float") });
	}, e.prototype.handleContextLost = function(e) {
		var t = this;
		e.preventDefault(), setTimeout(function() {
			t.gl.isContextLost() && t.extensions.loseContext && t.extensions.loseContext.restoreContext();
		}, 0);
	}, e.prototype.handleContextRestored = function() {
		this.renderer.runners.contextChange.emit(this.gl);
	}, e.prototype.destroy = function() {
		var e = this.renderer.view;
		this.renderer = null, e.removeEventListener("webglcontextlost", this.handleContextLost), e.removeEventListener("webglcontextrestored", this.handleContextRestored), this.gl.useProgram(null), this.extensions.loseContext && this.extensions.loseContext.loseContext();
	}, e.prototype.postrender = function() {
		this.renderer.renderingToScreen && this.gl.flush();
	}, e.prototype.validateContext = function(e) {
		var t = e.getContextAttributes(), n = "WebGL2RenderingContext" in globalThis && e instanceof globalThis.WebGL2RenderingContext;
		n && (this.webGLVersion = 2), t && !t.stencil && console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");
		var r = n || !!e.getExtension("OES_element_index_uint");
		this.supports.uint32Indices = r, r || console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly");
	}, e;
}(), Hn = function() {
	function e(e) {
		this.framebuffer = e, this.stencil = null, this.dirtyId = -1, this.dirtyFormat = -1, this.dirtySize = -1, this.multisample = L.NONE, this.msaaBuffer = null, this.blitFramebuffer = null, this.mipLevel = 0;
	}
	return e;
}(), Un = new U(), Wn = function() {
	function e(e) {
		this.renderer = e, this.managedFramebuffers = [], this.unknownFramebuffer = new mn(10, 10), this.msaaSamples = null;
	}
	return e.prototype.contextChange = function() {
		this.disposeAll(!0);
		var e = this.gl = this.renderer.gl;
		if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.current = this.unknownFramebuffer, this.viewport = new U(), this.hasMRT = !0, this.writeDepthTexture = !0, this.renderer.context.webGLVersion === 1) {
			var t = this.renderer.context.extensions.drawBuffers, n = this.renderer.context.extensions.depthTexture;
			V.PREFER_ENV === D.WEBGL_LEGACY && (t = null, n = null), t ? e.drawBuffers = function(e) {
				return t.drawBuffersWEBGL(e);
			} : (this.hasMRT = !1, e.drawBuffers = function() {}), n || (this.writeDepthTexture = !1);
		} else this.msaaSamples = e.getInternalformatParameter(e.RENDERBUFFER, e.RGBA8, e.SAMPLES);
	}, e.prototype.bind = function(e, t, n) {
		n === void 0 && (n = 0);
		var r = this.gl;
		if (e) {
			var i = e.glFramebuffers[this.CONTEXT_UID] || this.initFramebuffer(e);
			this.current !== e && (this.current = e, r.bindFramebuffer(r.FRAMEBUFFER, i.framebuffer)), i.mipLevel !== n && (e.dirtyId++, e.dirtyFormat++, i.mipLevel = n), i.dirtyId !== e.dirtyId && (i.dirtyId = e.dirtyId, i.dirtyFormat === e.dirtyFormat ? i.dirtySize !== e.dirtySize && (i.dirtySize = e.dirtySize, this.resizeFramebuffer(e)) : (i.dirtyFormat = e.dirtyFormat, i.dirtySize = e.dirtySize, this.updateFramebuffer(e, n)));
			for (var a = 0; a < e.colorTextures.length; a++) {
				var o = e.colorTextures[a];
				this.renderer.texture.unbind(o.parentTextureArray || o);
			}
			if (e.depthTexture && this.renderer.texture.unbind(e.depthTexture), t) {
				var s = t.width >> n, c = t.height >> n, l = s / t.width;
				this.setViewport(t.x * l, t.y * l, s, c);
			} else {
				var s = e.width >> n, c = e.height >> n;
				this.setViewport(0, 0, s, c);
			}
		} else this.current && (this.current = null, r.bindFramebuffer(r.FRAMEBUFFER, null)), t ? this.setViewport(t.x, t.y, t.width, t.height) : this.setViewport(0, 0, this.renderer.width, this.renderer.height);
	}, e.prototype.setViewport = function(e, t, n, r) {
		var i = this.viewport;
		e = Math.round(e), t = Math.round(t), n = Math.round(n), r = Math.round(r), (i.width !== n || i.height !== r || i.x !== e || i.y !== t) && (i.x = e, i.y = t, i.width = n, i.height = r, this.gl.viewport(e, t, n, r));
	}, Object.defineProperty(e.prototype, "size", {
		get: function() {
			return this.current ? {
				x: 0,
				y: 0,
				width: this.current.width,
				height: this.current.height
			} : {
				x: 0,
				y: 0,
				width: this.renderer.width,
				height: this.renderer.height
			};
		},
		enumerable: !1,
		configurable: !0
	}), e.prototype.clear = function(e, t, n, r, i) {
		i === void 0 && (i = k.COLOR | k.DEPTH);
		var a = this.gl;
		a.clearColor(e, t, n, r), a.clear(i);
	}, e.prototype.initFramebuffer = function(e) {
		var t = this.gl, n = new Hn(t.createFramebuffer());
		return n.multisample = this.detectSamples(e.multisample), e.glFramebuffers[this.CONTEXT_UID] = n, this.managedFramebuffers.push(e), e.disposeRunner.add(this), n;
	}, e.prototype.resizeFramebuffer = function(e) {
		var t = this.gl, n = e.glFramebuffers[this.CONTEXT_UID];
		n.msaaBuffer && (t.bindRenderbuffer(t.RENDERBUFFER, n.msaaBuffer), t.renderbufferStorageMultisample(t.RENDERBUFFER, n.multisample, t.RGBA8, e.width, e.height)), n.stencil && (t.bindRenderbuffer(t.RENDERBUFFER, n.stencil), n.msaaBuffer ? t.renderbufferStorageMultisample(t.RENDERBUFFER, n.multisample, t.DEPTH24_STENCIL8, e.width, e.height) : t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_STENCIL, e.width, e.height));
		var r = e.colorTextures, i = r.length;
		t.drawBuffers || (i = Math.min(i, 1));
		for (var a = 0; a < i; a++) {
			var o = r[a], s = o.parentTextureArray || o;
			this.renderer.texture.bind(s, 0);
		}
		e.depthTexture && this.writeDepthTexture && this.renderer.texture.bind(e.depthTexture, 0);
	}, e.prototype.updateFramebuffer = function(e, t) {
		var n = this.gl, r = e.glFramebuffers[this.CONTEXT_UID], i = e.colorTextures, a = i.length;
		n.drawBuffers || (a = Math.min(a, 1)), r.multisample > 1 && this.canMultisampleFramebuffer(e) ? (r.msaaBuffer = r.msaaBuffer || n.createRenderbuffer(), n.bindRenderbuffer(n.RENDERBUFFER, r.msaaBuffer), n.renderbufferStorageMultisample(n.RENDERBUFFER, r.multisample, n.RGBA8, e.width, e.height), n.framebufferRenderbuffer(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.RENDERBUFFER, r.msaaBuffer)) : r.msaaBuffer && (n.deleteRenderbuffer(r.msaaBuffer), r.msaaBuffer = null, r.blitFramebuffer &&= (r.blitFramebuffer.dispose(), null));
		for (var o = [], s = 0; s < a; s++) {
			var c = i[s], l = c.parentTextureArray || c;
			this.renderer.texture.bind(l, 0), !(s === 0 && r.msaaBuffer) && (n.framebufferTexture2D(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0 + s, c.target, l._glTextures[this.CONTEXT_UID].texture, t), o.push(n.COLOR_ATTACHMENT0 + s));
		}
		if (o.length > 1 && n.drawBuffers(o), e.depthTexture && this.writeDepthTexture) {
			var u = e.depthTexture;
			this.renderer.texture.bind(u, 0), n.framebufferTexture2D(n.FRAMEBUFFER, n.DEPTH_ATTACHMENT, n.TEXTURE_2D, u._glTextures[this.CONTEXT_UID].texture, t);
		}
		(e.stencil || e.depth) && !(e.depthTexture && this.writeDepthTexture) ? (r.stencil = r.stencil || n.createRenderbuffer(), n.bindRenderbuffer(n.RENDERBUFFER, r.stencil), r.msaaBuffer ? n.renderbufferStorageMultisample(n.RENDERBUFFER, r.multisample, n.DEPTH24_STENCIL8, e.width, e.height) : n.renderbufferStorage(n.RENDERBUFFER, n.DEPTH_STENCIL, e.width, e.height), n.framebufferRenderbuffer(n.FRAMEBUFFER, n.DEPTH_STENCIL_ATTACHMENT, n.RENDERBUFFER, r.stencil)) : r.stencil &&= (n.deleteRenderbuffer(r.stencil), null);
	}, e.prototype.canMultisampleFramebuffer = function(e) {
		return this.renderer.context.webGLVersion !== 1 && e.colorTextures.length <= 1 && !e.depthTexture;
	}, e.prototype.detectSamples = function(e) {
		var t = this.msaaSamples, n = L.NONE;
		if (e <= 1 || t === null) return n;
		for (var r = 0; r < t.length; r++) if (t[r] <= e) {
			n = t[r];
			break;
		}
		return n === 1 && (n = L.NONE), n;
	}, e.prototype.blit = function(e, t, n) {
		var r = this, i = r.current, a = r.renderer, o = r.gl, s = r.CONTEXT_UID;
		if (a.context.webGLVersion === 2 && i) {
			var c = i.glFramebuffers[s];
			if (c) {
				if (!e) {
					if (!c.msaaBuffer) return;
					var l = i.colorTextures[0];
					if (!l) return;
					c.blitFramebuffer || (c.blitFramebuffer = new mn(i.width, i.height), c.blitFramebuffer.addColorTexture(0, l)), e = c.blitFramebuffer, e.colorTextures[0] !== l && (e.colorTextures[0] = l, e.dirtyId++, e.dirtyFormat++), (e.width !== i.width || e.height !== i.height) && (e.width = i.width, e.height = i.height, e.dirtyId++, e.dirtySize++);
				}
				t || (t = Un, t.width = i.width, t.height = i.height), n ||= t;
				var u = t.width === n.width && t.height === n.height;
				this.bind(e), o.bindFramebuffer(o.READ_FRAMEBUFFER, c.framebuffer), o.blitFramebuffer(t.left, t.top, t.right, t.bottom, n.left, n.top, n.right, n.bottom, o.COLOR_BUFFER_BIT, u ? o.NEAREST : o.LINEAR);
			}
		}
	}, e.prototype.disposeFramebuffer = function(e, t) {
		var n = e.glFramebuffers[this.CONTEXT_UID], r = this.gl;
		if (n) {
			delete e.glFramebuffers[this.CONTEXT_UID];
			var i = this.managedFramebuffers.indexOf(e);
			i >= 0 && this.managedFramebuffers.splice(i, 1), e.disposeRunner.remove(this), t || (r.deleteFramebuffer(n.framebuffer), n.msaaBuffer && r.deleteRenderbuffer(n.msaaBuffer), n.stencil && r.deleteRenderbuffer(n.stencil)), n.blitFramebuffer && n.blitFramebuffer.dispose();
		}
	}, e.prototype.disposeAll = function(e) {
		var t = this.managedFramebuffers;
		this.managedFramebuffers = [];
		for (var n = 0; n < t.length; n++) this.disposeFramebuffer(t[n], e);
	}, e.prototype.forceStencil = function() {
		var e = this.current;
		if (e) {
			var t = e.glFramebuffers[this.CONTEXT_UID];
			if (!(!t || t.stencil)) {
				e.stencil = !0;
				var n = e.width, r = e.height, i = this.gl, a = i.createRenderbuffer();
				i.bindRenderbuffer(i.RENDERBUFFER, a), t.msaaBuffer ? i.renderbufferStorageMultisample(i.RENDERBUFFER, t.multisample, i.DEPTH24_STENCIL8, n, r) : i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_STENCIL, n, r), t.stencil = a, i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.RENDERBUFFER, a);
			}
		}
	}, e.prototype.reset = function() {
		this.current = this.unknownFramebuffer, this.viewport = new U();
	}, e.prototype.destroy = function() {
		this.renderer = null;
	}, e;
}(), Gn = {
	5126: 4,
	5123: 2,
	5121: 1
}, Kn = function() {
	function e(e) {
		this.renderer = e, this._activeGeometry = null, this._activeVao = null, this.hasVao = !0, this.hasInstance = !0, this.canUseUInt32ElementIndex = !1, this.managedGeometries = {};
	}
	return e.prototype.contextChange = function() {
		this.disposeAll(!0);
		var e = this.gl = this.renderer.gl, t = this.renderer.context;
		if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, t.webGLVersion !== 2) {
			var n = this.renderer.context.extensions.vertexArrayObject;
			V.PREFER_ENV === D.WEBGL_LEGACY && (n = null), n ? (e.createVertexArray = function() {
				return n.createVertexArrayOES();
			}, e.bindVertexArray = function(e) {
				return n.bindVertexArrayOES(e);
			}, e.deleteVertexArray = function(e) {
				return n.deleteVertexArrayOES(e);
			}) : (this.hasVao = !1, e.createVertexArray = function() {
				return null;
			}, e.bindVertexArray = function() {
				return null;
			}, e.deleteVertexArray = function() {
				return null;
			});
		}
		if (t.webGLVersion !== 2) {
			var r = e.getExtension("ANGLE_instanced_arrays");
			r ? (e.vertexAttribDivisor = function(e, t) {
				return r.vertexAttribDivisorANGLE(e, t);
			}, e.drawElementsInstanced = function(e, t, n, i, a) {
				return r.drawElementsInstancedANGLE(e, t, n, i, a);
			}, e.drawArraysInstanced = function(e, t, n, i) {
				return r.drawArraysInstancedANGLE(e, t, n, i);
			}) : this.hasInstance = !1;
		}
		this.canUseUInt32ElementIndex = t.webGLVersion === 2 || !!t.extensions.uint32ElementIndex;
	}, e.prototype.bind = function(e, t) {
		t ||= this.renderer.shader.shader;
		var n = this.gl, r = e.glVertexArrayObjects[this.CONTEXT_UID], i = !1;
		r || (this.managedGeometries[e.id] = e, e.disposeRunner.add(this), e.glVertexArrayObjects[this.CONTEXT_UID] = r = {}, i = !0);
		var a = r[t.program.id] || this.initGeometryVao(e, t, i);
		this._activeGeometry = e, this._activeVao !== a && (this._activeVao = a, this.hasVao ? n.bindVertexArray(a) : this.activateVao(e, t.program)), this.updateBuffers();
	}, e.prototype.reset = function() {
		this.unbind();
	}, e.prototype.updateBuffers = function() {
		for (var e = this._activeGeometry, t = this.renderer.buffer, n = 0; n < e.buffers.length; n++) {
			var r = e.buffers[n];
			t.update(r);
		}
	}, e.prototype.checkCompatibility = function(e, t) {
		var n = e.attributes;
		for (var r in t.attributeData) if (!n[r]) throw Error("shader and geometry incompatible, geometry missing the \"" + r + "\" attribute");
	}, e.prototype.getSignature = function(e, t) {
		var n = e.attributes, r = t.attributeData, i = ["g", e.id];
		for (var a in n) r[a] && i.push(a, r[a].location);
		return i.join("-");
	}, e.prototype.initGeometryVao = function(e, t, n) {
		n === void 0 && (n = !0);
		var r = this.gl, i = this.CONTEXT_UID, a = this.renderer.buffer, o = t.program;
		o.glPrograms[i] || this.renderer.shader.generateProgram(t), this.checkCompatibility(e, o);
		var s = this.getSignature(e, o), c = e.glVertexArrayObjects[this.CONTEXT_UID], l = c[s];
		if (l) return c[o.id] = l, l;
		var u = e.buffers, d = e.attributes, f = {}, p = {};
		for (var m in u) f[m] = 0, p[m] = 0;
		for (var m in d) !d[m].size && o.attributeData[m] ? d[m].size = o.attributeData[m].size : d[m].size || console.warn("PIXI Geometry attribute '" + m + "' size cannot be determined (likely the bound shader does not have the attribute)"), f[d[m].buffer] += d[m].size * Gn[d[m].type];
		for (var m in d) {
			var h = d[m], g = h.size;
			h.stride === void 0 && (f[h.buffer] === g * Gn[h.type] ? h.stride = 0 : h.stride = f[h.buffer]), h.start === void 0 && (h.start = p[h.buffer], p[h.buffer] += g * Gn[h.type]);
		}
		l = r.createVertexArray(), r.bindVertexArray(l);
		for (var _ = 0; _ < u.length; _++) {
			var v = u[_];
			a.bind(v), n && v._glBuffers[i].refCount++;
		}
		return this.activateVao(e, o), this._activeVao = l, c[o.id] = l, c[s] = l, l;
	}, e.prototype.disposeGeometry = function(e, t) {
		if (this.managedGeometries[e.id]) {
			delete this.managedGeometries[e.id];
			var n = e.glVertexArrayObjects[this.CONTEXT_UID], r = this.gl, i = e.buffers, a = this.renderer?.buffer;
			if (e.disposeRunner.remove(this), n) {
				if (a) for (var o = 0; o < i.length; o++) {
					var s = i[o]._glBuffers[this.CONTEXT_UID];
					s && (s.refCount--, s.refCount === 0 && !t && a.dispose(i[o], t));
				}
				if (!t) {
					for (var c in n) if (c[0] === "g") {
						var l = n[c];
						this._activeVao === l && this.unbind(), r.deleteVertexArray(l);
					}
				}
				delete e.glVertexArrayObjects[this.CONTEXT_UID];
			}
		}
	}, e.prototype.disposeAll = function(e) {
		for (var t = Object.keys(this.managedGeometries), n = 0; n < t.length; n++) this.disposeGeometry(this.managedGeometries[t[n]], e);
	}, e.prototype.activateVao = function(e, t) {
		var n = this.gl, r = this.CONTEXT_UID, i = this.renderer.buffer, a = e.buffers, o = e.attributes;
		e.indexBuffer && i.bind(e.indexBuffer);
		var s = null;
		for (var c in o) {
			var l = o[c], u = a[l.buffer], d = u._glBuffers[r];
			if (t.attributeData[c]) {
				s !== d && (i.bind(u), s = d);
				var f = t.attributeData[c].location;
				if (n.enableVertexAttribArray(f), n.vertexAttribPointer(f, l.size, l.type || n.FLOAT, l.normalized, l.stride, l.start), l.instance) if (this.hasInstance) n.vertexAttribDivisor(f, 1);
				else throw Error("geometry error, GPU Instancing is not supported on this device");
			}
		}
	}, e.prototype.draw = function(e, t, n, r) {
		var i = this.gl, a = this._activeGeometry;
		if (a.indexBuffer) {
			var o = a.indexBuffer.data.BYTES_PER_ELEMENT, s = o === 2 ? i.UNSIGNED_SHORT : i.UNSIGNED_INT;
			o === 2 || o === 4 && this.canUseUInt32ElementIndex ? a.instanced ? i.drawElementsInstanced(e, t || a.indexBuffer.data.length, s, (n || 0) * o, r || 1) : i.drawElements(e, t || a.indexBuffer.data.length, s, (n || 0) * o) : console.warn("unsupported index buffer type: uint32");
		} else a.instanced ? i.drawArraysInstanced(e, n, t || a.getSize(), r || 1) : i.drawArrays(e, n, t || a.getSize());
		return this;
	}, e.prototype.unbind = function() {
		this.gl.bindVertexArray(null), this._activeVao = null, this._activeGeometry = null;
	}, e.prototype.destroy = function() {
		this.renderer = null;
	}, e;
}(), qn = function() {
	function e(e) {
		e === void 0 && (e = null), this.type = I.NONE, this.autoDetect = !0, this.maskObject = e || null, this.pooled = !1, this.isMaskData = !0, this.resolution = null, this.multisample = V.FILTER_MULTISAMPLE, this.enabled = !0, this.colorMask = 15, this._filters = null, this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null, this._scissorRectLocal = null, this._colorMask = 15, this._target = null;
	}
	return Object.defineProperty(e.prototype, "filter", {
		get: function() {
			return this._filters ? this._filters[0] : null;
		},
		set: function(e) {
			e ? this._filters ? this._filters[0] = e : this._filters = [e] : this._filters = null;
		},
		enumerable: !1,
		configurable: !0
	}), e.prototype.reset = function() {
		this.pooled && (this.maskObject = null, this.type = I.NONE, this.autoDetect = !0), this._target = null, this._scissorRectLocal = null;
	}, e.prototype.copyCountersOrReset = function(e) {
		e ? (this._stencilCounter = e._stencilCounter, this._scissorCounter = e._scissorCounter, this._scissorRect = e._scissorRect) : (this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null);
	}, e;
}();
function Jn(e, t, n) {
	var r = e.createShader(t);
	return e.shaderSource(r, n), e.compileShader(r), r;
}
function Yn(e, t) {
	var n = e.getShaderSource(t).split("\n").map(function(e, t) {
		return t + ": " + e;
	}), r = e.getShaderInfoLog(t), i = r.split("\n"), a = {}, o = i.map(function(e) {
		return parseFloat(e.replace(/^ERROR\: 0\:([\d]+)\:.*$/, "$1"));
	}).filter(function(e) {
		return e && !a[e] ? (a[e] = !0, !0) : !1;
	}), s = [""];
	o.forEach(function(e) {
		n[e - 1] = "%c" + n[e - 1] + "%c", s.push("background: #FF0000; color:#FFFFFF; font-size: 10px", "font-size: 10px");
	}), s[0] = n.join("\n"), console.error(r), console.groupCollapsed("click to view full shader code"), console.warn.apply(console, s), console.groupEnd();
}
function Xn(e, t, n, r) {
	e.getProgramParameter(t, e.LINK_STATUS) || (e.getShaderParameter(n, e.COMPILE_STATUS) || Yn(e, n), e.getShaderParameter(r, e.COMPILE_STATUS) || Yn(e, r), console.error("PixiJS Error: Could not initialize shader."), e.getProgramInfoLog(t) !== "" && console.warn("PixiJS Warning: gl.getProgramInfoLog()", e.getProgramInfoLog(t)));
}
function Zn(e) {
	for (var t = Array(e), n = 0; n < t.length; n++) t[n] = !1;
	return t;
}
function Qn(e, t) {
	switch (e) {
		case "float": return 0;
		case "vec2": return new Float32Array(2 * t);
		case "vec3": return new Float32Array(3 * t);
		case "vec4": return new Float32Array(4 * t);
		case "int":
		case "uint":
		case "sampler2D":
		case "sampler2DArray": return 0;
		case "ivec2": return new Int32Array(2 * t);
		case "ivec3": return new Int32Array(3 * t);
		case "ivec4": return new Int32Array(4 * t);
		case "uvec2": return new Uint32Array(2 * t);
		case "uvec3": return new Uint32Array(3 * t);
		case "uvec4": return new Uint32Array(4 * t);
		case "bool": return !1;
		case "bvec2": return Zn(2 * t);
		case "bvec3": return Zn(3 * t);
		case "bvec4": return Zn(4 * t);
		case "mat2": return new Float32Array([
			1,
			0,
			0,
			1
		]);
		case "mat3": return new Float32Array([
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			1
		]);
		case "mat4": return new Float32Array([
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1
		]);
	}
	return null;
}
var $n = {}, er = $n;
function tr() {
	if (er === $n || er && er.isContextLost()) {
		var e = V.ADAPTER.createCanvas(), t = void 0;
		V.PREFER_ENV >= D.WEBGL2 && (t = e.getContext("webgl2", {})), t || (t = e.getContext("webgl", {}) || e.getContext("experimental-webgl", {}), t ? t.getExtension("WEBGL_draw_buffers") : t = null), er = t;
	}
	return er;
}
var nr;
function rr() {
	if (!nr) {
		nr = oe.MEDIUM;
		var e = tr();
		e && e.getShaderPrecisionFormat && (nr = e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision ? oe.HIGH : oe.MEDIUM);
	}
	return nr;
}
function ir(e, t, n) {
	if (e.substring(0, 9) !== "precision") {
		var r = t;
		return t === oe.HIGH && n !== oe.HIGH && (r = oe.MEDIUM), "precision " + r + " float;\n" + e;
	} else if (n !== oe.HIGH && e.substring(0, 15) === "precision highp") return e.replace("precision highp", "precision mediump");
	return e;
}
var ar = {
	float: 1,
	vec2: 2,
	vec3: 3,
	vec4: 4,
	int: 1,
	ivec2: 2,
	ivec3: 3,
	ivec4: 4,
	uint: 1,
	uvec2: 2,
	uvec3: 3,
	uvec4: 4,
	bool: 1,
	bvec2: 2,
	bvec3: 3,
	bvec4: 4,
	mat2: 4,
	mat3: 9,
	mat4: 16,
	sampler2D: 1
};
function or(e) {
	return ar[e];
}
var sr = null, cr = {
	FLOAT: "float",
	FLOAT_VEC2: "vec2",
	FLOAT_VEC3: "vec3",
	FLOAT_VEC4: "vec4",
	INT: "int",
	INT_VEC2: "ivec2",
	INT_VEC3: "ivec3",
	INT_VEC4: "ivec4",
	UNSIGNED_INT: "uint",
	UNSIGNED_INT_VEC2: "uvec2",
	UNSIGNED_INT_VEC3: "uvec3",
	UNSIGNED_INT_VEC4: "uvec4",
	BOOL: "bool",
	BOOL_VEC2: "bvec2",
	BOOL_VEC3: "bvec3",
	BOOL_VEC4: "bvec4",
	FLOAT_MAT2: "mat2",
	FLOAT_MAT3: "mat3",
	FLOAT_MAT4: "mat4",
	SAMPLER_2D: "sampler2D",
	INT_SAMPLER_2D: "sampler2D",
	UNSIGNED_INT_SAMPLER_2D: "sampler2D",
	SAMPLER_CUBE: "samplerCube",
	INT_SAMPLER_CUBE: "samplerCube",
	UNSIGNED_INT_SAMPLER_CUBE: "samplerCube",
	SAMPLER_2D_ARRAY: "sampler2DArray",
	INT_SAMPLER_2D_ARRAY: "sampler2DArray",
	UNSIGNED_INT_SAMPLER_2D_ARRAY: "sampler2DArray"
};
function lr(e, t) {
	if (!sr) {
		var n = Object.keys(cr);
		sr = {};
		for (var r = 0; r < n.length; ++r) {
			var i = n[r];
			sr[e[i]] = cr[i];
		}
	}
	return sr[t];
}
var ur = [
	{
		test: function(e) {
			return e.type === "float" && e.size === 1 && !e.isArray;
		},
		code: function(e) {
			return "\n            if(uv[\"" + e + "\"] !== ud[\"" + e + "\"].value)\n            {\n                ud[\"" + e + "\"].value = uv[\"" + e + "\"]\n                gl.uniform1f(ud[\"" + e + "\"].location, uv[\"" + e + "\"])\n            }\n            ";
		}
	},
	{
		test: function(e, t) {
			return (e.type === "sampler2D" || e.type === "samplerCube" || e.type === "sampler2DArray") && e.size === 1 && !e.isArray && (t == null || t.castToBaseTexture !== void 0);
		},
		code: function(e) {
			return "t = syncData.textureCount++;\n\n            renderer.texture.bind(uv[\"" + e + "\"], t);\n\n            if(ud[\"" + e + "\"].value !== t)\n            {\n                ud[\"" + e + "\"].value = t;\n                gl.uniform1i(ud[\"" + e + "\"].location, t);\n; // eslint-disable-line max-len\n            }";
		}
	},
	{
		test: function(e, t) {
			return e.type === "mat3" && e.size === 1 && !e.isArray && t.a !== void 0;
		},
		code: function(e) {
			return "\n            gl.uniformMatrix3fv(ud[\"" + e + "\"].location, false, uv[\"" + e + "\"].toArray(true));\n            ";
		},
		codeUbo: function(e) {
			return "\n                var " + e + "_matrix = uv." + e + ".toArray(true);\n\n                data[offset] = " + e + "_matrix[0];\n                data[offset+1] = " + e + "_matrix[1];\n                data[offset+2] = " + e + "_matrix[2];\n        \n                data[offset + 4] = " + e + "_matrix[3];\n                data[offset + 5] = " + e + "_matrix[4];\n                data[offset + 6] = " + e + "_matrix[5];\n        \n                data[offset + 8] = " + e + "_matrix[6];\n                data[offset + 9] = " + e + "_matrix[7];\n                data[offset + 10] = " + e + "_matrix[8];\n            ";
		}
	},
	{
		test: function(e, t) {
			return e.type === "vec2" && e.size === 1 && !e.isArray && t.x !== void 0;
		},
		code: function(e) {
			return "\n                cv = ud[\"" + e + "\"].value;\n                v = uv[\"" + e + "\"];\n\n                if(cv[0] !== v.x || cv[1] !== v.y)\n                {\n                    cv[0] = v.x;\n                    cv[1] = v.y;\n                    gl.uniform2f(ud[\"" + e + "\"].location, v.x, v.y);\n                }";
		},
		codeUbo: function(e) {
			return "\n                v = uv." + e + ";\n\n                data[offset] = v.x;\n                data[offset+1] = v.y;\n            ";
		}
	},
	{
		test: function(e) {
			return e.type === "vec2" && e.size === 1 && !e.isArray;
		},
		code: function(e) {
			return "\n                cv = ud[\"" + e + "\"].value;\n                v = uv[\"" + e + "\"];\n\n                if(cv[0] !== v[0] || cv[1] !== v[1])\n                {\n                    cv[0] = v[0];\n                    cv[1] = v[1];\n                    gl.uniform2f(ud[\"" + e + "\"].location, v[0], v[1]);\n                }\n            ";
		}
	},
	{
		test: function(e, t) {
			return e.type === "vec4" && e.size === 1 && !e.isArray && t.width !== void 0;
		},
		code: function(e) {
			return "\n                cv = ud[\"" + e + "\"].value;\n                v = uv[\"" + e + "\"];\n\n                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)\n                {\n                    cv[0] = v.x;\n                    cv[1] = v.y;\n                    cv[2] = v.width;\n                    cv[3] = v.height;\n                    gl.uniform4f(ud[\"" + e + "\"].location, v.x, v.y, v.width, v.height)\n                }";
		},
		codeUbo: function(e) {
			return "\n                    v = uv." + e + ";\n\n                    data[offset] = v.x;\n                    data[offset+1] = v.y;\n                    data[offset+2] = v.width;\n                    data[offset+3] = v.height;\n                ";
		}
	},
	{
		test: function(e) {
			return e.type === "vec4" && e.size === 1 && !e.isArray;
		},
		code: function(e) {
			return "\n                cv = ud[\"" + e + "\"].value;\n                v = uv[\"" + e + "\"];\n\n                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n                {\n                    cv[0] = v[0];\n                    cv[1] = v[1];\n                    cv[2] = v[2];\n                    cv[3] = v[3];\n\n                    gl.uniform4f(ud[\"" + e + "\"].location, v[0], v[1], v[2], v[3])\n                }";
		}
	}
], dr = {
	float: "\n    if (cv !== v)\n    {\n        cu.value = v;\n        gl.uniform1f(location, v);\n    }",
	vec2: "\n    if (cv[0] !== v[0] || cv[1] !== v[1])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n\n        gl.uniform2f(location, v[0], v[1])\n    }",
	vec3: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n\n        gl.uniform3f(location, v[0], v[1], v[2])\n    }",
	vec4: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n        cv[3] = v[3];\n\n        gl.uniform4f(location, v[0], v[1], v[2], v[3]);\n    }",
	int: "\n    if (cv !== v)\n    {\n        cu.value = v;\n\n        gl.uniform1i(location, v);\n    }",
	ivec2: "\n    if (cv[0] !== v[0] || cv[1] !== v[1])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n\n        gl.uniform2i(location, v[0], v[1]);\n    }",
	ivec3: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n\n        gl.uniform3i(location, v[0], v[1], v[2]);\n    }",
	ivec4: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n        cv[3] = v[3];\n\n        gl.uniform4i(location, v[0], v[1], v[2], v[3]);\n    }",
	uint: "\n    if (cv !== v)\n    {\n        cu.value = v;\n\n        gl.uniform1ui(location, v);\n    }",
	uvec2: "\n    if (cv[0] !== v[0] || cv[1] !== v[1])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n\n        gl.uniform2ui(location, v[0], v[1]);\n    }",
	uvec3: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n\n        gl.uniform3ui(location, v[0], v[1], v[2]);\n    }",
	uvec4: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n        cv[3] = v[3];\n\n        gl.uniform4ui(location, v[0], v[1], v[2], v[3]);\n    }",
	bool: "\n    if (cv !== v)\n    {\n        cu.value = v;\n        gl.uniform1i(location, v);\n    }",
	bvec2: "\n    if (cv[0] != v[0] || cv[1] != v[1])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n\n        gl.uniform2i(location, v[0], v[1]);\n    }",
	bvec3: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n\n        gl.uniform3i(location, v[0], v[1], v[2]);\n    }",
	bvec4: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n        cv[3] = v[3];\n\n        gl.uniform4i(location, v[0], v[1], v[2], v[3]);\n    }",
	mat2: "gl.uniformMatrix2fv(location, false, v)",
	mat3: "gl.uniformMatrix3fv(location, false, v)",
	mat4: "gl.uniformMatrix4fv(location, false, v)",
	sampler2D: "\n    if (cv !== v)\n    {\n        cu.value = v;\n\n        gl.uniform1i(location, v);\n    }",
	samplerCube: "\n    if (cv !== v)\n    {\n        cu.value = v;\n\n        gl.uniform1i(location, v);\n    }",
	sampler2DArray: "\n    if (cv !== v)\n    {\n        cu.value = v;\n\n        gl.uniform1i(location, v);\n    }"
}, fr = {
	float: "gl.uniform1fv(location, v)",
	vec2: "gl.uniform2fv(location, v)",
	vec3: "gl.uniform3fv(location, v)",
	vec4: "gl.uniform4fv(location, v)",
	mat4: "gl.uniformMatrix4fv(location, false, v)",
	mat3: "gl.uniformMatrix3fv(location, false, v)",
	mat2: "gl.uniformMatrix2fv(location, false, v)",
	int: "gl.uniform1iv(location, v)",
	ivec2: "gl.uniform2iv(location, v)",
	ivec3: "gl.uniform3iv(location, v)",
	ivec4: "gl.uniform4iv(location, v)",
	uint: "gl.uniform1uiv(location, v)",
	uvec2: "gl.uniform2uiv(location, v)",
	uvec3: "gl.uniform3uiv(location, v)",
	uvec4: "gl.uniform4uiv(location, v)",
	bool: "gl.uniform1iv(location, v)",
	bvec2: "gl.uniform2iv(location, v)",
	bvec3: "gl.uniform3iv(location, v)",
	bvec4: "gl.uniform4iv(location, v)",
	sampler2D: "gl.uniform1iv(location, v)",
	samplerCube: "gl.uniform1iv(location, v)",
	sampler2DArray: "gl.uniform1iv(location, v)"
};
function pr(e, t) {
	var n = ["\n        var v = null;\n        var cv = null;\n        var cu = null;\n        var t = 0;\n        var gl = renderer.gl;\n    "];
	for (var r in e.uniforms) {
		var i = t[r];
		if (!i) {
			e.uniforms[r]?.group && (e.uniforms[r].ubo ? n.push("\n                        renderer.shader.syncUniformBufferGroup(uv." + r + ", '" + r + "');\n                    ") : n.push("\n                        renderer.shader.syncUniformGroup(uv." + r + ", syncData);\n                    "));
			continue;
		}
		for (var a = e.uniforms[r], o = !1, s = 0; s < ur.length; s++) if (ur[s].test(i, a)) {
			n.push(ur[s].code(r, a)), o = !0;
			break;
		}
		if (!o) {
			var c = (i.size === 1 && !i.isArray ? dr : fr)[i.type].replace("location", "ud[\"" + r + "\"].location");
			n.push("\n            cu = ud[\"" + r + "\"];\n            cv = cu.value;\n            v = uv[\"" + r + "\"];\n            " + c + ";");
		}
	}
	return Function("ud", "uv", "renderer", "syncData", n.join("\n"));
}
var mr = [
	"precision mediump float;",
	"void main(void){",
	"float test = 0.1;",
	"%forloop%",
	"gl_FragColor = vec4(0.0);",
	"}"
].join("\n");
function hr(e) {
	for (var t = "", n = 0; n < e; ++n) n > 0 && (t += "\nelse "), n < e - 1 && (t += "if(test == " + n + ".0){}");
	return t;
}
function gr(e, t) {
	if (e === 0) throw Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
	for (var n = t.createShader(t.FRAGMENT_SHADER);;) {
		var r = mr.replace(/%forloop%/gi, hr(e));
		if (t.shaderSource(n, r), t.compileShader(n), !t.getShaderParameter(n, t.COMPILE_STATUS)) e = e / 2 | 0;
		else break;
	}
	return e;
}
var _r;
function vr() {
	if (typeof _r == "boolean") return _r;
	try {
		_r = Function("param1", "param2", "param3", "return param1[param2] === param3;")({ a: "b" }, "a", "b") === !0;
	} catch {
		_r = !1;
	}
	return _r;
}
var yr = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor *= texture2D(uSampler, vTextureCoord);\n}", br = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n}\n", xr = 0, Sr = {}, Cr = function() {
	function e(t, n, r) {
		r === void 0 && (r = "pixi-shader"), this.id = xr++, this.vertexSrc = t || e.defaultVertexSrc, this.fragmentSrc = n || e.defaultFragmentSrc, this.vertexSrc = this.vertexSrc.trim(), this.fragmentSrc = this.fragmentSrc.trim(), this.vertexSrc.substring(0, 8) !== "#version" && (r = r.replace(/\s+/g, "-"), Sr[r] ? (Sr[r]++, r += "-" + Sr[r]) : Sr[r] = 1, this.vertexSrc = "#define SHADER_NAME " + r + "\n" + this.vertexSrc, this.fragmentSrc = "#define SHADER_NAME " + r + "\n" + this.fragmentSrc, this.vertexSrc = ir(this.vertexSrc, V.PRECISION_VERTEX, oe.HIGH), this.fragmentSrc = ir(this.fragmentSrc, V.PRECISION_FRAGMENT, rr())), this.glPrograms = {}, this.syncUniforms = null;
	}
	return Object.defineProperty(e, "defaultVertexSrc", {
		get: function() {
			return br;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e, "defaultFragmentSrc", {
		get: function() {
			return yr;
		},
		enumerable: !1,
		configurable: !0
	}), e.from = function(t, n, r) {
		var i = t + n, a = ot[i];
		return a || (ot[i] = a = new e(t, n, r)), a;
	}, e;
}(), wr = function() {
	function e(e, t) {
		this.uniformBindCount = 0, this.program = e, t ? t instanceof Nn ? this.uniformGroup = t : this.uniformGroup = new Nn(t) : this.uniformGroup = new Nn({}), this.disposeRunner = new Ut("disposeShader");
	}
	return e.prototype.checkUniformExists = function(e, t) {
		if (t.uniforms[e]) return !0;
		for (var n in t.uniforms) {
			var r = t.uniforms[n];
			if (r.group && this.checkUniformExists(e, r)) return !0;
		}
		return !1;
	}, e.prototype.destroy = function() {
		this.uniformGroup = null, this.disposeRunner.emit(this), this.disposeRunner.destroy();
	}, Object.defineProperty(e.prototype, "uniforms", {
		get: function() {
			return this.uniformGroup.uniforms;
		},
		enumerable: !1,
		configurable: !0
	}), e.from = function(t, n, r) {
		return new e(Cr.from(t, n), r);
	}, e;
}(), Tr = 0, Er = 1, Dr = 2, Or = 3, kr = 4, Ar = 5, jr = function() {
	function e() {
		this.data = 0, this.blendMode = A.NORMAL, this.polygonOffset = 0, this.blend = !0, this.depthMask = !0;
	}
	return Object.defineProperty(e.prototype, "blend", {
		get: function() {
			return !!(this.data & 1 << Tr);
		},
		set: function(e) {
			!!(this.data & 1 << Tr) !== e && (this.data ^= 1 << Tr);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "offsets", {
		get: function() {
			return !!(this.data & 1 << Er);
		},
		set: function(e) {
			!!(this.data & 1 << Er) !== e && (this.data ^= 1 << Er);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "culling", {
		get: function() {
			return !!(this.data & 1 << Dr);
		},
		set: function(e) {
			!!(this.data & 1 << Dr) !== e && (this.data ^= 1 << Dr);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "depthTest", {
		get: function() {
			return !!(this.data & 1 << Or);
		},
		set: function(e) {
			!!(this.data & 1 << Or) !== e && (this.data ^= 1 << Or);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "depthMask", {
		get: function() {
			return !!(this.data & 1 << Ar);
		},
		set: function(e) {
			!!(this.data & 1 << Ar) !== e && (this.data ^= 1 << Ar);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "clockwiseFrontFace", {
		get: function() {
			return !!(this.data & 1 << kr);
		},
		set: function(e) {
			!!(this.data & 1 << kr) !== e && (this.data ^= 1 << kr);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "blendMode", {
		get: function() {
			return this._blendMode;
		},
		set: function(e) {
			this.blend = e !== A.NONE, this._blendMode = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "polygonOffset", {
		get: function() {
			return this._polygonOffset;
		},
		set: function(e) {
			this.offsets = !!e, this._polygonOffset = e;
		},
		enumerable: !1,
		configurable: !0
	}), e.prototype.toString = function() {
		return "[@pixi/core:State " + ("blendMode=" + this.blendMode + " ") + ("clockwiseFrontFace=" + this.clockwiseFrontFace + " ") + ("culling=" + this.culling + " ") + ("depthMask=" + this.depthMask + " ") + ("polygonOffset=" + this.polygonOffset) + "]";
	}, e.for2d = function() {
		var t = new e();
		return t.depthTest = !1, t.blend = !0, t;
	}, e;
}(), Mr = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n}\n", Nr = "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n", Pr = function(e) {
	J(t, e);
	function t(n, r, i) {
		var a = this, o = Cr.from(n || t.defaultVertexSrc, r || t.defaultFragmentSrc);
		return a = e.call(this, o, i) || this, a.padding = 0, a.resolution = V.FILTER_RESOLUTION, a.multisample = V.FILTER_MULTISAMPLE, a.enabled = !0, a.autoFit = !0, a.state = new jr(), a;
	}
	return t.prototype.apply = function(e, t, n, r, i) {
		e.applyFilter(this, t, n, r);
	}, Object.defineProperty(t.prototype, "blendMode", {
		get: function() {
			return this.state.blendMode;
		},
		set: function(e) {
			this.state.blendMode = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "resolution", {
		get: function() {
			return this._resolution;
		},
		set: function(e) {
			this._resolution = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t, "defaultVertexSrc", {
		get: function() {
			return Nr;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t, "defaultFragmentSrc", {
		get: function() {
			return Mr;
		},
		enumerable: !1,
		configurable: !0
	}), t;
}(wr), Fr = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n", Ir = "varying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform sampler2D mask;\nuniform float alpha;\nuniform float npmAlpha;\nuniform vec4 maskClamp;\n\nvoid main(void)\n{\n    float clip = step(3.5,\n        step(maskClamp.x, vMaskCoord.x) +\n        step(maskClamp.y, vMaskCoord.y) +\n        step(vMaskCoord.x, maskClamp.z) +\n        step(vMaskCoord.y, maskClamp.w));\n\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);\n\n    original *= (alphaMul * masky.r * alpha * clip);\n\n    gl_FragColor = original;\n}\n", Lr = new W(), Rr = function() {
	function e(e, t) {
		this._texture = e, this.mapCoord = new W(), this.uClampFrame = /* @__PURE__ */ new Float32Array(4), this.uClampOffset = /* @__PURE__ */ new Float32Array(2), this._textureID = -1, this._updateID = 0, this.clampOffset = 0, this.clampMargin = t === void 0 ? .5 : t, this.isSimple = !1;
	}
	return Object.defineProperty(e.prototype, "texture", {
		get: function() {
			return this._texture;
		},
		set: function(e) {
			this._texture = e, this._textureID = -1;
		},
		enumerable: !1,
		configurable: !0
	}), e.prototype.multiplyUvs = function(e, t) {
		t === void 0 && (t = e);
		for (var n = this.mapCoord, r = 0; r < e.length; r += 2) {
			var i = e[r], a = e[r + 1];
			t[r] = i * n.a + a * n.c + n.tx, t[r + 1] = i * n.b + a * n.d + n.ty;
		}
		return t;
	}, e.prototype.update = function(e) {
		var t = this._texture;
		if (!t || !t.valid || !e && this._textureID === t._updateID) return !1;
		this._textureID = t._updateID, this._updateID++;
		var n = t._uvs;
		this.mapCoord.set(n.x1 - n.x0, n.y1 - n.y0, n.x3 - n.x0, n.y3 - n.y0, n.x0, n.y0);
		var r = t.orig, i = t.trim;
		i && (Lr.set(r.width / i.width, 0, 0, r.height / i.height, -i.x / i.width, -i.y / i.height), this.mapCoord.append(Lr));
		var a = t.baseTexture, o = this.uClampFrame, s = this.clampMargin / a.resolution, c = this.clampOffset;
		return o[0] = (t._frame.x + s + c) / a.width, o[1] = (t._frame.y + s + c) / a.height, o[2] = (t._frame.x + t._frame.width - s + c) / a.width, o[3] = (t._frame.y + t._frame.height - s + c) / a.height, this.uClampOffset[0] = c / a.realWidth, this.uClampOffset[1] = c / a.realHeight, this.isSimple = t._frame.width === a.width && t._frame.height === a.height && t.rotate === 0, !0;
	}, e;
}(), zr = function(e) {
	J(t, e);
	function t(t, n, r) {
		var i = this, a = null;
		return typeof t != "string" && n === void 0 && r === void 0 && (a = t, t = void 0, n = void 0, r = void 0), i = e.call(this, t || Fr, n || Ir, r) || this, i.maskSprite = a, i.maskMatrix = new W(), i;
	}
	return Object.defineProperty(t.prototype, "maskSprite", {
		get: function() {
			return this._maskSprite;
		},
		set: function(e) {
			this._maskSprite = e, this._maskSprite && (this._maskSprite.renderable = !1);
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype.apply = function(e, t, n, r) {
		var i = this._maskSprite, a = i._texture;
		a.valid && (a.uvMatrix ||= new Rr(a, 0), a.uvMatrix.update(), this.uniforms.npmAlpha = +!a.baseTexture.alphaMode, this.uniforms.mask = a, this.uniforms.otherMatrix = e.calculateSpriteMatrix(this.maskMatrix, i).prepend(a.uvMatrix.mapCoord), this.uniforms.alpha = i.worldAlpha, this.uniforms.maskClamp = a.uvMatrix.uClampFrame, e.applyFilter(this, t, n, r));
	}, t;
}(Pr), Br = function() {
	function e(e) {
		this.renderer = e, this.enableScissor = !0, this.alphaMaskPool = [], this.maskDataPool = [], this.maskStack = [], this.alphaMaskIndex = 0;
	}
	return e.prototype.setMaskStack = function(e) {
		this.maskStack = e, this.renderer.scissor.setMaskStack(e), this.renderer.stencil.setMaskStack(e);
	}, e.prototype.push = function(e, t) {
		var n = t;
		if (!n.isMaskData) {
			var r = this.maskDataPool.pop() || new qn();
			r.pooled = !0, r.maskObject = t, n = r;
		}
		var i = this.maskStack.length === 0 ? null : this.maskStack[this.maskStack.length - 1];
		if (n.copyCountersOrReset(i), n._colorMask = i ? i._colorMask : 15, n.autoDetect && this.detect(n), n._target = e, n.type !== I.SPRITE && this.maskStack.push(n), n.enabled) switch (n.type) {
			case I.SCISSOR:
				this.renderer.scissor.push(n);
				break;
			case I.STENCIL:
				this.renderer.stencil.push(n);
				break;
			case I.SPRITE:
				n.copyCountersOrReset(null), this.pushSpriteMask(n);
				break;
			case I.COLOR:
				this.pushColorMask(n);
				break;
		}
		n.type === I.SPRITE && this.maskStack.push(n);
	}, e.prototype.pop = function(e) {
		var t = this.maskStack.pop();
		if (!(!t || t._target !== e)) {
			if (t.enabled) switch (t.type) {
				case I.SCISSOR:
					this.renderer.scissor.pop(t);
					break;
				case I.STENCIL:
					this.renderer.stencil.pop(t.maskObject);
					break;
				case I.SPRITE:
					this.popSpriteMask(t);
					break;
				case I.COLOR:
					this.popColorMask(t);
					break;
			}
			if (t.reset(), t.pooled && this.maskDataPool.push(t), this.maskStack.length !== 0) {
				var n = this.maskStack[this.maskStack.length - 1];
				n.type === I.SPRITE && n._filters && (n._filters[0].maskSprite = n.maskObject);
			}
		}
	}, e.prototype.detect = function(e) {
		var t = e.maskObject;
		t ? t.isSprite ? e.type = I.SPRITE : this.enableScissor && this.renderer.scissor.testScissor(e) ? e.type = I.SCISSOR : e.type = I.STENCIL : e.type = I.COLOR;
	}, e.prototype.pushSpriteMask = function(e) {
		var t = e.maskObject, n = e._target, r = e._filters;
		r || (r = this.alphaMaskPool[this.alphaMaskIndex], r ||= this.alphaMaskPool[this.alphaMaskIndex] = [new zr()]);
		var i = this.renderer, a = i.renderTexture, o, s;
		if (a.current) {
			var c = a.current;
			o = e.resolution || c.resolution, s = e.multisample ?? c.multisample;
		} else o = e.resolution || i.resolution, s = e.multisample ?? i.multisample;
		r[0].resolution = o, r[0].multisample = s, r[0].maskSprite = t;
		var l = n.filterArea;
		n.filterArea = t.getBounds(!0), i.filter.push(n, r), n.filterArea = l, e._filters || this.alphaMaskIndex++;
	}, e.prototype.popSpriteMask = function(e) {
		this.renderer.filter.pop(), e._filters ? e._filters[0].maskSprite = null : (this.alphaMaskIndex--, this.alphaMaskPool[this.alphaMaskIndex][0].maskSprite = null);
	}, e.prototype.pushColorMask = function(e) {
		var t = e._colorMask, n = e._colorMask = t & e.colorMask;
		n !== t && this.renderer.gl.colorMask((n & 1) != 0, (n & 2) != 0, (n & 4) != 0, (n & 8) != 0);
	}, e.prototype.popColorMask = function(e) {
		var t = e._colorMask, n = this.maskStack.length > 0 ? this.maskStack[this.maskStack.length - 1]._colorMask : 15;
		n !== t && this.renderer.gl.colorMask((n & 1) != 0, (n & 2) != 0, (n & 4) != 0, (n & 8) != 0);
	}, e.prototype.destroy = function() {
		this.renderer = null;
	}, e;
}(), Vr = function() {
	function e(e) {
		this.renderer = e, this.maskStack = [], this.glConst = 0;
	}
	return e.prototype.getStackLength = function() {
		return this.maskStack.length;
	}, e.prototype.setMaskStack = function(e) {
		var t = this.renderer.gl, n = this.getStackLength();
		this.maskStack = e;
		var r = this.getStackLength();
		r !== n && (r === 0 ? t.disable(this.glConst) : (t.enable(this.glConst), this._useCurrent()));
	}, e.prototype._useCurrent = function() {}, e.prototype.destroy = function() {
		this.renderer = null, this.maskStack = null;
	}, e;
}(), Hr = new W(), Ur = [], Wr = function(e) {
	J(t, e);
	function t(t) {
		var n = e.call(this, t) || this;
		return n.glConst = V.ADAPTER.getWebGLRenderingContext().SCISSOR_TEST, n;
	}
	return t.prototype.getStackLength = function() {
		var e = this.maskStack[this.maskStack.length - 1];
		return e ? e._scissorCounter : 0;
	}, t.prototype.calcScissorRect = function(e) {
		if (!e._scissorRectLocal) {
			var t = e._scissorRect, n = e.maskObject, r = this.renderer, i = r.renderTexture, a = n.getBounds(!0, Ur.pop() ?? new U());
			this.roundFrameToPixels(a, i.current ? i.current.resolution : r.resolution, i.sourceFrame, i.destinationFrame, r.projection.transform), t && a.fit(t), e._scissorRectLocal = a;
		}
	}, t.isMatrixRotated = function(e) {
		if (!e) return !1;
		var t = e.a, n = e.b, r = e.c, i = e.d;
		return (Math.abs(n) > 1e-4 || Math.abs(r) > 1e-4) && (Math.abs(t) > 1e-4 || Math.abs(i) > 1e-4);
	}, t.prototype.testScissor = function(e) {
		var n = e.maskObject;
		if (!n.isFastRect || !n.isFastRect() || t.isMatrixRotated(n.worldTransform) || t.isMatrixRotated(this.renderer.projection.transform)) return !1;
		this.calcScissorRect(e);
		var r = e._scissorRectLocal;
		return r.width > 0 && r.height > 0;
	}, t.prototype.roundFrameToPixels = function(e, n, r, i, a) {
		t.isMatrixRotated(a) || (a = a ? Hr.copyFrom(a) : Hr.identity(), a.translate(-r.x, -r.y).scale(i.width / r.width, i.height / r.height).translate(i.x, i.y), this.renderer.filter.transformAABB(a, e), e.fit(i), e.x = Math.round(e.x * n), e.y = Math.round(e.y * n), e.width = Math.round(e.width * n), e.height = Math.round(e.height * n));
	}, t.prototype.push = function(e) {
		e._scissorRectLocal || this.calcScissorRect(e);
		var t = this.renderer.gl;
		e._scissorRect || t.enable(t.SCISSOR_TEST), e._scissorCounter++, e._scissorRect = e._scissorRectLocal, this._useCurrent();
	}, t.prototype.pop = function(e) {
		var t = this.renderer.gl;
		e && Ur.push(e._scissorRectLocal), this.getStackLength() > 0 ? this._useCurrent() : t.disable(t.SCISSOR_TEST);
	}, t.prototype._useCurrent = function() {
		var e = this.maskStack[this.maskStack.length - 1]._scissorRect, t = this.renderer.renderTexture.current ? e.y : this.renderer.height - e.height - e.y;
		this.renderer.gl.scissor(e.x, t, e.width, e.height);
	}, t;
}(Vr), Gr = function(e) {
	J(t, e);
	function t(t) {
		var n = e.call(this, t) || this;
		return n.glConst = V.ADAPTER.getWebGLRenderingContext().STENCIL_TEST, n;
	}
	return t.prototype.getStackLength = function() {
		var e = this.maskStack[this.maskStack.length - 1];
		return e ? e._stencilCounter : 0;
	}, t.prototype.push = function(e) {
		var t = e.maskObject, n = this.renderer.gl, r = e._stencilCounter;
		r === 0 && (this.renderer.framebuffer.forceStencil(), n.clearStencil(0), n.clear(n.STENCIL_BUFFER_BIT), n.enable(n.STENCIL_TEST)), e._stencilCounter++;
		var i = e._colorMask;
		i !== 0 && (e._colorMask = 0, n.colorMask(!1, !1, !1, !1)), n.stencilFunc(n.EQUAL, r, 4294967295), n.stencilOp(n.KEEP, n.KEEP, n.INCR), t.renderable = !0, t.render(this.renderer), this.renderer.batch.flush(), t.renderable = !1, i !== 0 && (e._colorMask = i, n.colorMask((i & 1) != 0, (i & 2) != 0, (i & 4) != 0, (i & 8) != 0)), this._useCurrent();
	}, t.prototype.pop = function(e) {
		var t = this.renderer.gl;
		if (this.getStackLength() === 0) t.disable(t.STENCIL_TEST);
		else {
			var n = this.maskStack.length === 0 ? null : this.maskStack[this.maskStack.length - 1], r = n ? n._colorMask : 15;
			r !== 0 && (n._colorMask = 0, t.colorMask(!1, !1, !1, !1)), t.stencilOp(t.KEEP, t.KEEP, t.DECR), e.renderable = !0, e.render(this.renderer), this.renderer.batch.flush(), e.renderable = !1, r !== 0 && (n._colorMask = r, t.colorMask((r & 1) != 0, (r & 2) != 0, (r & 4) != 0, (r & 8) != 0)), this._useCurrent();
		}
	}, t.prototype._useCurrent = function() {
		var e = this.renderer.gl;
		e.stencilFunc(e.EQUAL, this.getStackLength(), 4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP);
	}, t;
}(Vr), Kr = function() {
	function e(e) {
		this.renderer = e, this.destinationFrame = null, this.sourceFrame = null, this.defaultFrame = null, this.projectionMatrix = new W(), this.transform = null;
	}
	return e.prototype.update = function(e, t, n, r) {
		this.destinationFrame = e || this.destinationFrame || this.defaultFrame, this.sourceFrame = t || this.sourceFrame || e, this.calculateProjection(this.destinationFrame, this.sourceFrame, n, r), this.transform && this.projectionMatrix.append(this.transform);
		var i = this.renderer;
		i.globalUniforms.uniforms.projectionMatrix = this.projectionMatrix, i.globalUniforms.update(), i.shader.shader && i.shader.syncUniformGroup(i.shader.shader.uniforms.globals);
	}, e.prototype.calculateProjection = function(e, t, n, r) {
		var i = this.projectionMatrix, a = r ? -1 : 1;
		i.identity(), i.a = 1 / t.width * 2, i.d = a * (1 / t.height * 2), i.tx = -1 - t.x * i.a, i.ty = -a - t.y * i.d;
	}, e.prototype.setTransform = function(e) {}, e.prototype.destroy = function() {
		this.renderer = null;
	}, e;
}(), qr = new U(), Jr = new U(), Yr = function() {
	function e(e) {
		this.renderer = e, this.clearColor = e._backgroundColorRgba, this.defaultMaskStack = [], this.current = null, this.sourceFrame = new U(), this.destinationFrame = new U(), this.viewportFrame = new U();
	}
	return e.prototype.bind = function(e, t, n) {
		e === void 0 && (e = null);
		var r = this.renderer;
		this.current = e;
		var i, a, o;
		e ? (i = e.baseTexture, o = i.resolution, t ||= (qr.width = e.frame.width, qr.height = e.frame.height, qr), n ||= (Jr.x = e.frame.x, Jr.y = e.frame.y, Jr.width = t.width, Jr.height = t.height, Jr), a = i.framebuffer) : (o = r.resolution, t ||= (qr.width = r.screen.width, qr.height = r.screen.height, qr), n || (n = qr, n.width = t.width, n.height = t.height));
		var s = this.viewportFrame;
		s.x = n.x * o, s.y = n.y * o, s.width = n.width * o, s.height = n.height * o, e || (s.y = r.view.height - (s.y + s.height)), s.ceil(), this.renderer.framebuffer.bind(a, s), this.renderer.projection.update(n, t, o, !a), e ? this.renderer.mask.setMaskStack(i.maskStack) : this.renderer.mask.setMaskStack(this.defaultMaskStack), this.sourceFrame.copyFrom(t), this.destinationFrame.copyFrom(n);
	}, e.prototype.clear = function(e, t) {
		this.current ? e ||= this.current.baseTexture.clearColor : e ||= this.clearColor;
		var n = this.destinationFrame, r = this.current ? this.current.baseTexture : this.renderer.screen, i = n.width !== r.width || n.height !== r.height;
		if (i) {
			var a = this.viewportFrame, o = a.x, s = a.y, c = a.width, l = a.height;
			o = Math.round(o), s = Math.round(s), c = Math.round(c), l = Math.round(l), this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST), this.renderer.gl.scissor(o, s, c, l);
		}
		this.renderer.framebuffer.clear(e[0], e[1], e[2], e[3], t), i && this.renderer.scissor.pop();
	}, e.prototype.resize = function() {
		this.bind(null);
	}, e.prototype.reset = function() {
		this.bind(null);
	}, e.prototype.destroy = function() {
		this.renderer = null;
	}, e;
}();
function Xr(e, t, n, r, i) {
	n.buffer.update(i);
}
var Zr = {
	float: "\n        data[offset] = v;\n    ",
	vec2: "\n        data[offset] = v[0];\n        data[offset+1] = v[1];\n    ",
	vec3: "\n        data[offset] = v[0];\n        data[offset+1] = v[1];\n        data[offset+2] = v[2];\n\n    ",
	vec4: "\n        data[offset] = v[0];\n        data[offset+1] = v[1];\n        data[offset+2] = v[2];\n        data[offset+3] = v[3];\n    ",
	mat2: "\n        data[offset] = v[0];\n        data[offset+1] = v[1];\n\n        data[offset+4] = v[2];\n        data[offset+5] = v[3];\n    ",
	mat3: "\n        data[offset] = v[0];\n        data[offset+1] = v[1];\n        data[offset+2] = v[2];\n\n        data[offset + 4] = v[3];\n        data[offset + 5] = v[4];\n        data[offset + 6] = v[5];\n\n        data[offset + 8] = v[6];\n        data[offset + 9] = v[7];\n        data[offset + 10] = v[8];\n    ",
	mat4: "\n        for(var i = 0; i < 16; i++)\n        {\n            data[offset + i] = v[i];\n        }\n    "
}, Qr = {
	float: 4,
	vec2: 8,
	vec3: 12,
	vec4: 16,
	int: 4,
	ivec2: 8,
	ivec3: 12,
	ivec4: 16,
	uint: 4,
	uvec2: 8,
	uvec3: 12,
	uvec4: 16,
	bool: 4,
	bvec2: 8,
	bvec3: 12,
	bvec4: 16,
	mat2: 32,
	mat3: 48,
	mat4: 64
};
function $r(e) {
	for (var t = e.map(function(e) {
		return {
			data: e,
			offset: 0,
			dataLen: 0,
			dirty: 0
		};
	}), n = 0, r = 0, i = 0, a = 0; a < t.length; a++) {
		var o = t[a];
		if (n = Qr[o.data.type], o.data.size > 1 && (n = Math.max(n, 16) * o.data.size), o.dataLen = n, r % n !== 0 && r < 16) {
			var s = r % n % 16;
			r += s, i += s;
		}
		r + n > 16 ? (i = Math.ceil(i / 16) * 16, o.offset = i, i += n, r = n) : (o.offset = i, r += n, i += n);
	}
	return i = Math.ceil(i / 16) * 16, {
		uboElements: t,
		size: i
	};
}
function ei(e, t) {
	var n = [];
	for (var r in e) t[r] && n.push(t[r]);
	return n.sort(function(e, t) {
		return e.index - t.index;
	}), n;
}
function ti(e, t) {
	if (!e.autoManage) return {
		size: 0,
		syncFunc: Xr
	};
	for (var n = $r(ei(e.uniforms, t)), r = n.uboElements, i = n.size, a = ["\n    var v = null;\n    var v2 = null;\n    var cv = null;\n    var t = 0;\n    var gl = renderer.gl\n    var index = 0;\n    var data = buffer.data;\n    "], o = 0; o < r.length; o++) {
		for (var s = r[o], c = e.uniforms[s.data.name], l = s.data.name, u = !1, d = 0; d < ur.length; d++) {
			var f = ur[d];
			if (f.codeUbo && f.test(s.data, c)) {
				a.push("offset = " + s.offset / 4 + ";", ur[d].codeUbo(s.data.name, c)), u = !0;
				break;
			}
		}
		if (!u) if (s.data.size > 1) {
			var p = or(s.data.type), m = Math.max(Qr[s.data.type] / 16, 1), h = p / m, g = (4 - h % 4) % 4;
			a.push("\n                cv = ud." + l + ".value;\n                v = uv." + l + ";\n                offset = " + s.offset / 4 + ";\n\n                t = 0;\n\n                for(var i=0; i < " + s.data.size * m + "; i++)\n                {\n                    for(var j = 0; j < " + h + "; j++)\n                    {\n                        data[offset++] = v[t++];\n                    }\n                    offset += " + g + ";\n                }\n\n                ");
		} else {
			var _ = Zr[s.data.type];
			a.push("\n                cv = ud." + l + ".value;\n                v = uv." + l + ";\n                offset = " + s.offset / 4 + ";\n                " + _ + ";\n                ");
		}
	}
	return a.push("\n       renderer.buffer.update(buffer);\n    "), {
		size: i,
		syncFunc: Function("ud", "uv", "renderer", "syncData", "buffer", a.join("\n"))
	};
}
var ni = function() {
	function e(e, t) {
		this.program = e, this.uniformData = t, this.uniformGroups = {}, this.uniformDirtyGroups = {}, this.uniformBufferBindings = {};
	}
	return e.prototype.destroy = function() {
		this.uniformData = null, this.uniformGroups = null, this.uniformDirtyGroups = null, this.uniformBufferBindings = null, this.program = null;
	}, e;
}();
function ri(e, t) {
	for (var n = {}, r = t.getProgramParameter(e, t.ACTIVE_ATTRIBUTES), i = 0; i < r; i++) {
		var a = t.getActiveAttrib(e, i);
		if (a.name.indexOf("gl_") !== 0) {
			var o = lr(t, a.type), s = {
				type: o,
				name: a.name,
				size: or(o),
				location: t.getAttribLocation(e, a.name)
			};
			n[a.name] = s;
		}
	}
	return n;
}
function ii(e, t) {
	for (var n = {}, r = t.getProgramParameter(e, t.ACTIVE_UNIFORMS), i = 0; i < r; i++) {
		var a = t.getActiveUniform(e, i), o = a.name.replace(/\[.*?\]$/, ""), s = !!a.name.match(/\[.*?\]$/), c = lr(t, a.type);
		n[o] = {
			name: o,
			index: i,
			type: c,
			size: a.size,
			isArray: s,
			value: Qn(c, a.size)
		};
	}
	return n;
}
function ai(e, t) {
	var n = Jn(e, e.VERTEX_SHADER, t.vertexSrc), r = Jn(e, e.FRAGMENT_SHADER, t.fragmentSrc), i = e.createProgram();
	if (e.attachShader(i, n), e.attachShader(i, r), e.linkProgram(i), e.getProgramParameter(i, e.LINK_STATUS) || Xn(e, i, n, r), t.attributeData = ri(i, e), t.uniformData = ii(i, e), !/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(t.vertexSrc)) {
		var a = Object.keys(t.attributeData);
		a.sort(function(e, t) {
			return e > t ? 1 : -1;
		});
		for (var o = 0; o < a.length; o++) t.attributeData[a[o]].location = o, e.bindAttribLocation(i, o, a[o]);
		e.linkProgram(i);
	}
	e.deleteShader(n), e.deleteShader(r);
	var s = {};
	for (var o in t.uniformData) {
		var c = t.uniformData[o];
		s[o] = {
			location: e.getUniformLocation(i, o),
			value: Qn(c.type, c.size)
		};
	}
	return new ni(i, s);
}
var oi = 0, si = {
	textureCount: 0,
	uboCount: 0
}, ci = function() {
	function e(e) {
		this.destroyed = !1, this.renderer = e, this.systemCheck(), this.gl = null, this.shader = null, this.program = null, this.cache = {}, this._uboCache = {}, this.id = oi++;
	}
	return e.prototype.systemCheck = function() {
		if (!vr()) throw Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.");
	}, e.prototype.contextChange = function(e) {
		this.gl = e, this.reset();
	}, e.prototype.bind = function(e, t) {
		e.disposeRunner.add(this), e.uniforms.globals = this.renderer.globalUniforms;
		var n = e.program, r = n.glPrograms[this.renderer.CONTEXT_UID] || this.generateProgram(e);
		return this.shader = e, this.program !== n && (this.program = n, this.gl.useProgram(r.program)), t || (si.textureCount = 0, si.uboCount = 0, this.syncUniformGroup(e.uniformGroup, si)), r;
	}, e.prototype.setUniforms = function(e) {
		var t = this.shader.program, n = t.glPrograms[this.renderer.CONTEXT_UID];
		t.syncUniforms(n.uniformData, e, this.renderer);
	}, e.prototype.syncUniformGroup = function(e, t) {
		var n = this.getGlProgram();
		(!e.static || e.dirtyId !== n.uniformDirtyGroups[e.id]) && (n.uniformDirtyGroups[e.id] = e.dirtyId, this.syncUniforms(e, n, t));
	}, e.prototype.syncUniforms = function(e, t, n) {
		(e.syncUniforms[this.shader.program.id] || this.createSyncGroups(e))(t.uniformData, e.uniforms, this.renderer, n);
	}, e.prototype.createSyncGroups = function(e) {
		var t = this.getSignature(e, this.shader.program.uniformData, "u");
		return this.cache[t] || (this.cache[t] = pr(e, this.shader.program.uniformData)), e.syncUniforms[this.shader.program.id] = this.cache[t], e.syncUniforms[this.shader.program.id];
	}, e.prototype.syncUniformBufferGroup = function(e, t) {
		var n = this.getGlProgram();
		if (!e.static || e.dirtyId !== 0 || !n.uniformGroups[e.id]) {
			e.dirtyId = 0;
			var r = n.uniformGroups[e.id] || this.createSyncBufferGroup(e, n, t);
			e.buffer.update(), r(n.uniformData, e.uniforms, this.renderer, si, e.buffer);
		}
		this.renderer.buffer.bindBufferBase(e.buffer, n.uniformBufferBindings[t]);
	}, e.prototype.createSyncBufferGroup = function(e, t, n) {
		var r = this.renderer.gl;
		this.renderer.buffer.bind(e.buffer);
		var i = this.gl.getUniformBlockIndex(t.program, n);
		t.uniformBufferBindings[n] = this.shader.uniformBindCount, r.uniformBlockBinding(t.program, i, this.shader.uniformBindCount), this.shader.uniformBindCount++;
		var a = this.getSignature(e, this.shader.program.uniformData, "ubo"), o = this._uboCache[a];
		if (o ||= this._uboCache[a] = ti(e, this.shader.program.uniformData), e.autoManage) {
			var s = new Float32Array(o.size / 4);
			e.buffer.update(s);
		}
		return t.uniformGroups[e.id] = o.syncFunc, t.uniformGroups[e.id];
	}, e.prototype.getSignature = function(e, t, n) {
		var r = e.uniforms, i = [n + "-"];
		for (var a in r) i.push(a), t[a] && i.push(t[a].type);
		return i.join("-");
	}, e.prototype.getGlProgram = function() {
		return this.shader ? this.shader.program.glPrograms[this.renderer.CONTEXT_UID] : null;
	}, e.prototype.generateProgram = function(e) {
		var t = this.gl, n = e.program, r = ai(t, n);
		return n.glPrograms[this.renderer.CONTEXT_UID] = r, r;
	}, e.prototype.reset = function() {
		this.program = null, this.shader = null;
	}, e.prototype.disposeShader = function(e) {
		this.shader === e && (this.shader = null);
	}, e.prototype.destroy = function() {
		this.renderer = null, this.destroyed = !0;
	}, e;
}();
function li(e, t) {
	return t === void 0 && (t = []), t[A.NORMAL] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], t[A.ADD] = [e.ONE, e.ONE], t[A.MULTIPLY] = [
		e.DST_COLOR,
		e.ONE_MINUS_SRC_ALPHA,
		e.ONE,
		e.ONE_MINUS_SRC_ALPHA
	], t[A.SCREEN] = [
		e.ONE,
		e.ONE_MINUS_SRC_COLOR,
		e.ONE,
		e.ONE_MINUS_SRC_ALPHA
	], t[A.OVERLAY] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], t[A.DARKEN] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], t[A.LIGHTEN] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], t[A.COLOR_DODGE] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], t[A.COLOR_BURN] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], t[A.HARD_LIGHT] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], t[A.SOFT_LIGHT] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], t[A.DIFFERENCE] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], t[A.EXCLUSION] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], t[A.HUE] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], t[A.SATURATION] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], t[A.COLOR] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], t[A.LUMINOSITY] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], t[A.NONE] = [0, 0], t[A.NORMAL_NPM] = [
		e.SRC_ALPHA,
		e.ONE_MINUS_SRC_ALPHA,
		e.ONE,
		e.ONE_MINUS_SRC_ALPHA
	], t[A.ADD_NPM] = [
		e.SRC_ALPHA,
		e.ONE,
		e.ONE,
		e.ONE
	], t[A.SCREEN_NPM] = [
		e.SRC_ALPHA,
		e.ONE_MINUS_SRC_COLOR,
		e.ONE,
		e.ONE_MINUS_SRC_ALPHA
	], t[A.SRC_IN] = [e.DST_ALPHA, e.ZERO], t[A.SRC_OUT] = [e.ONE_MINUS_DST_ALPHA, e.ZERO], t[A.SRC_ATOP] = [e.DST_ALPHA, e.ONE_MINUS_SRC_ALPHA], t[A.DST_OVER] = [e.ONE_MINUS_DST_ALPHA, e.ONE], t[A.DST_IN] = [e.ZERO, e.SRC_ALPHA], t[A.DST_OUT] = [e.ZERO, e.ONE_MINUS_SRC_ALPHA], t[A.DST_ATOP] = [e.ONE_MINUS_DST_ALPHA, e.SRC_ALPHA], t[A.XOR] = [e.ONE_MINUS_DST_ALPHA, e.ONE_MINUS_SRC_ALPHA], t[A.SUBTRACT] = [
		e.ONE,
		e.ONE,
		e.ONE,
		e.ONE,
		e.FUNC_REVERSE_SUBTRACT,
		e.FUNC_ADD
	], t;
}
var ui = 0, di = 1, fi = 2, pi = 3, mi = 4, hi = 5, gi = function() {
	function e() {
		this.gl = null, this.stateId = 0, this.polygonOffset = 0, this.blendMode = A.NONE, this._blendEq = !1, this.map = [], this.map[ui] = this.setBlend, this.map[di] = this.setOffset, this.map[fi] = this.setCullFace, this.map[pi] = this.setDepthTest, this.map[mi] = this.setFrontFace, this.map[hi] = this.setDepthMask, this.checks = [], this.defaultState = new jr(), this.defaultState.blend = !0;
	}
	return e.prototype.contextChange = function(e) {
		this.gl = e, this.blendModes = li(e), this.set(this.defaultState), this.reset();
	}, e.prototype.set = function(e) {
		if (e ||= this.defaultState, this.stateId !== e.data) {
			for (var t = this.stateId ^ e.data, n = 0; t;) t & 1 && this.map[n].call(this, !!(e.data & 1 << n)), t >>= 1, n++;
			this.stateId = e.data;
		}
		for (var n = 0; n < this.checks.length; n++) this.checks[n](this, e);
	}, e.prototype.forceState = function(e) {
		e ||= this.defaultState;
		for (var t = 0; t < this.map.length; t++) this.map[t].call(this, !!(e.data & 1 << t));
		for (var t = 0; t < this.checks.length; t++) this.checks[t](this, e);
		this.stateId = e.data;
	}, e.prototype.setBlend = function(t) {
		this.updateCheck(e.checkBlendMode, t), this.gl[t ? "enable" : "disable"](this.gl.BLEND);
	}, e.prototype.setOffset = function(t) {
		this.updateCheck(e.checkPolygonOffset, t), this.gl[t ? "enable" : "disable"](this.gl.POLYGON_OFFSET_FILL);
	}, e.prototype.setDepthTest = function(e) {
		this.gl[e ? "enable" : "disable"](this.gl.DEPTH_TEST);
	}, e.prototype.setDepthMask = function(e) {
		this.gl.depthMask(e);
	}, e.prototype.setCullFace = function(e) {
		this.gl[e ? "enable" : "disable"](this.gl.CULL_FACE);
	}, e.prototype.setFrontFace = function(e) {
		this.gl.frontFace(this.gl[e ? "CW" : "CCW"]);
	}, e.prototype.setBlendMode = function(e) {
		if (e !== this.blendMode) {
			this.blendMode = e;
			var t = this.blendModes[e], n = this.gl;
			t.length === 2 ? n.blendFunc(t[0], t[1]) : n.blendFuncSeparate(t[0], t[1], t[2], t[3]), t.length === 6 ? (this._blendEq = !0, n.blendEquationSeparate(t[4], t[5])) : this._blendEq && (this._blendEq = !1, n.blendEquationSeparate(n.FUNC_ADD, n.FUNC_ADD));
		}
	}, e.prototype.setPolygonOffset = function(e, t) {
		this.gl.polygonOffset(e, t);
	}, e.prototype.reset = function() {
		this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !1), this.forceState(this.defaultState), this._blendEq = !0, this.blendMode = -1, this.setBlendMode(0);
	}, e.prototype.updateCheck = function(e, t) {
		var n = this.checks.indexOf(e);
		t && n === -1 ? this.checks.push(e) : !t && n !== -1 && this.checks.splice(n, 1);
	}, e.checkBlendMode = function(e, t) {
		e.setBlendMode(t.blendMode);
	}, e.checkPolygonOffset = function(e, t) {
		e.setPolygonOffset(1, t.polygonOffset);
	}, e.prototype.destroy = function() {
		this.gl = null;
	}, e;
}(), _i = function() {
	function e(e) {
		this.renderer = e, this.count = 0, this.checkCount = 0, this.maxIdle = V.GC_MAX_IDLE, this.checkCountMax = V.GC_MAX_CHECK_COUNT, this.mode = V.GC_MODE;
	}
	return e.prototype.postrender = function() {
		this.renderer.renderingToScreen && (this.count++, this.mode !== ae.MANUAL && (this.checkCount++, this.checkCount > this.checkCountMax && (this.checkCount = 0, this.run())));
	}, e.prototype.run = function() {
		for (var e = this.renderer.texture, t = e.managedTextures, n = !1, r = 0; r < t.length; r++) {
			var i = t[r];
			!i.framebuffer && this.count - i.touched > this.maxIdle && (e.destroyTexture(i, !0), t[r] = null, n = !0);
		}
		if (n) {
			for (var a = 0, r = 0; r < t.length; r++) t[r] !== null && (t[a++] = t[r]);
			t.length = a;
		}
	}, e.prototype.unload = function(e) {
		var t = this.renderer.texture, n = e._texture;
		n && !n.framebuffer && t.destroyTexture(n);
		for (var r = e.children.length - 1; r >= 0; r--) this.unload(e.children[r]);
	}, e.prototype.destroy = function() {
		this.renderer = null;
	}, e;
}();
function vi(e) {
	var t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S;
	return "WebGL2RenderingContext" in globalThis && e instanceof globalThis.WebGL2RenderingContext ? (t = {}, t[P.UNSIGNED_BYTE] = (n = {}, n[M.RGBA] = e.RGBA8, n[M.RGB] = e.RGB8, n[M.RG] = e.RG8, n[M.RED] = e.R8, n[M.RGBA_INTEGER] = e.RGBA8UI, n[M.RGB_INTEGER] = e.RGB8UI, n[M.RG_INTEGER] = e.RG8UI, n[M.RED_INTEGER] = e.R8UI, n[M.ALPHA] = e.ALPHA, n[M.LUMINANCE] = e.LUMINANCE, n[M.LUMINANCE_ALPHA] = e.LUMINANCE_ALPHA, n), t[P.BYTE] = (r = {}, r[M.RGBA] = e.RGBA8_SNORM, r[M.RGB] = e.RGB8_SNORM, r[M.RG] = e.RG8_SNORM, r[M.RED] = e.R8_SNORM, r[M.RGBA_INTEGER] = e.RGBA8I, r[M.RGB_INTEGER] = e.RGB8I, r[M.RG_INTEGER] = e.RG8I, r[M.RED_INTEGER] = e.R8I, r), t[P.UNSIGNED_SHORT] = (i = {}, i[M.RGBA_INTEGER] = e.RGBA16UI, i[M.RGB_INTEGER] = e.RGB16UI, i[M.RG_INTEGER] = e.RG16UI, i[M.RED_INTEGER] = e.R16UI, i[M.DEPTH_COMPONENT] = e.DEPTH_COMPONENT16, i), t[P.SHORT] = (a = {}, a[M.RGBA_INTEGER] = e.RGBA16I, a[M.RGB_INTEGER] = e.RGB16I, a[M.RG_INTEGER] = e.RG16I, a[M.RED_INTEGER] = e.R16I, a), t[P.UNSIGNED_INT] = (o = {}, o[M.RGBA_INTEGER] = e.RGBA32UI, o[M.RGB_INTEGER] = e.RGB32UI, o[M.RG_INTEGER] = e.RG32UI, o[M.RED_INTEGER] = e.R32UI, o[M.DEPTH_COMPONENT] = e.DEPTH_COMPONENT24, o), t[P.INT] = (s = {}, s[M.RGBA_INTEGER] = e.RGBA32I, s[M.RGB_INTEGER] = e.RGB32I, s[M.RG_INTEGER] = e.RG32I, s[M.RED_INTEGER] = e.R32I, s), t[P.FLOAT] = (c = {}, c[M.RGBA] = e.RGBA32F, c[M.RGB] = e.RGB32F, c[M.RG] = e.RG32F, c[M.RED] = e.R32F, c[M.DEPTH_COMPONENT] = e.DEPTH_COMPONENT32F, c), t[P.HALF_FLOAT] = (l = {}, l[M.RGBA] = e.RGBA16F, l[M.RGB] = e.RGB16F, l[M.RG] = e.RG16F, l[M.RED] = e.R16F, l), t[P.UNSIGNED_SHORT_5_6_5] = (u = {}, u[M.RGB] = e.RGB565, u), t[P.UNSIGNED_SHORT_4_4_4_4] = (d = {}, d[M.RGBA] = e.RGBA4, d), t[P.UNSIGNED_SHORT_5_5_5_1] = (f = {}, f[M.RGBA] = e.RGB5_A1, f), t[P.UNSIGNED_INT_2_10_10_10_REV] = (p = {}, p[M.RGBA] = e.RGB10_A2, p[M.RGBA_INTEGER] = e.RGB10_A2UI, p), t[P.UNSIGNED_INT_10F_11F_11F_REV] = (m = {}, m[M.RGB] = e.R11F_G11F_B10F, m), t[P.UNSIGNED_INT_5_9_9_9_REV] = (h = {}, h[M.RGB] = e.RGB9_E5, h), t[P.UNSIGNED_INT_24_8] = (g = {}, g[M.DEPTH_STENCIL] = e.DEPTH24_STENCIL8, g), t[P.FLOAT_32_UNSIGNED_INT_24_8_REV] = (_ = {}, _[M.DEPTH_STENCIL] = e.DEPTH32F_STENCIL8, _), t) : (v = {}, v[P.UNSIGNED_BYTE] = (y = {}, y[M.RGBA] = e.RGBA, y[M.RGB] = e.RGB, y[M.ALPHA] = e.ALPHA, y[M.LUMINANCE] = e.LUMINANCE, y[M.LUMINANCE_ALPHA] = e.LUMINANCE_ALPHA, y), v[P.UNSIGNED_SHORT_5_6_5] = (b = {}, b[M.RGB] = e.RGB, b), v[P.UNSIGNED_SHORT_4_4_4_4] = (x = {}, x[M.RGBA] = e.RGBA, x), v[P.UNSIGNED_SHORT_5_5_5_1] = (S = {}, S[M.RGBA] = e.RGBA, S), v);
}
var yi = function() {
	function e(e) {
		this.texture = e, this.width = -1, this.height = -1, this.dirtyId = -1, this.dirtyStyleId = -1, this.mipmap = !1, this.wrapMode = 33071, this.type = P.UNSIGNED_BYTE, this.internalFormat = M.RGBA, this.samplerType = 0;
	}
	return e;
}(), bi = function() {
	function e(e) {
		this.renderer = e, this.boundTextures = [], this.currentLocation = -1, this.managedTextures = [], this._unknownBoundTextures = !1, this.unknownTexture = new Y(), this.hasIntegerTextures = !1;
	}
	return e.prototype.contextChange = function() {
		var e = this.gl = this.renderer.gl;
		this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.webGLVersion = this.renderer.context.webGLVersion, this.internalFormats = vi(e);
		var t = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS);
		this.boundTextures.length = t;
		for (var n = 0; n < t; n++) this.boundTextures[n] = null;
		this.emptyTextures = {};
		var r = new yi(e.createTexture());
		e.bindTexture(e.TEXTURE_2D, r.texture), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, /* @__PURE__ */ new Uint8Array(4)), this.emptyTextures[e.TEXTURE_2D] = r, this.emptyTextures[e.TEXTURE_CUBE_MAP] = new yi(e.createTexture()), e.bindTexture(e.TEXTURE_CUBE_MAP, this.emptyTextures[e.TEXTURE_CUBE_MAP].texture);
		for (var n = 0; n < 6; n++) e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + n, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, null);
		e.texParameteri(e.TEXTURE_CUBE_MAP, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_CUBE_MAP, e.TEXTURE_MIN_FILTER, e.LINEAR);
		for (var n = 0; n < this.boundTextures.length; n++) this.bind(null, n);
	}, e.prototype.bind = function(e, t) {
		t === void 0 && (t = 0);
		var n = this.gl;
		if (e = e?.castToBaseTexture(), e && e.valid && !e.parentTextureArray) {
			e.touched = this.renderer.textureGC.count;
			var r = e._glTextures[this.CONTEXT_UID] || this.initTexture(e);
			this.boundTextures[t] !== e && (this.currentLocation !== t && (this.currentLocation = t, n.activeTexture(n.TEXTURE0 + t)), n.bindTexture(e.target, r.texture)), r.dirtyId === e.dirtyId ? r.dirtyStyleId !== e.dirtyStyleId && this.updateTextureStyle(e) : (this.currentLocation !== t && (this.currentLocation = t, n.activeTexture(n.TEXTURE0 + t)), this.updateTexture(e)), this.boundTextures[t] = e;
		} else this.currentLocation !== t && (this.currentLocation = t, n.activeTexture(n.TEXTURE0 + t)), n.bindTexture(n.TEXTURE_2D, this.emptyTextures[n.TEXTURE_2D].texture), this.boundTextures[t] = null;
	}, e.prototype.reset = function() {
		this._unknownBoundTextures = !0, this.hasIntegerTextures = !1, this.currentLocation = -1;
		for (var e = 0; e < this.boundTextures.length; e++) this.boundTextures[e] = this.unknownTexture;
	}, e.prototype.unbind = function(e) {
		var t = this, n = t.gl, r = t.boundTextures;
		if (this._unknownBoundTextures) {
			this._unknownBoundTextures = !1;
			for (var i = 0; i < r.length; i++) r[i] === this.unknownTexture && this.bind(null, i);
		}
		for (var i = 0; i < r.length; i++) r[i] === e && (this.currentLocation !== i && (n.activeTexture(n.TEXTURE0 + i), this.currentLocation = i), n.bindTexture(e.target, this.emptyTextures[e.target].texture), r[i] = null);
	}, e.prototype.ensureSamplerType = function(e) {
		var t = this, n = t.boundTextures, r = t.hasIntegerTextures, i = t.CONTEXT_UID;
		if (r) for (var a = e - 1; a >= 0; --a) {
			var o = n[a];
			o && o._glTextures[i].samplerType !== ee.FLOAT && this.renderer.texture.unbind(o);
		}
	}, e.prototype.initTexture = function(e) {
		var t = new yi(this.gl.createTexture());
		return t.dirtyId = -1, e._glTextures[this.CONTEXT_UID] = t, this.managedTextures.push(e), e.on("dispose", this.destroyTexture, this), t;
	}, e.prototype.initTextureType = function(e, t) {
		t.internalFormat = this.internalFormats[e.type]?.[e.format] ?? e.format, this.webGLVersion === 2 && e.type === P.HALF_FLOAT ? t.type = this.gl.HALF_FLOAT : t.type = e.type;
	}, e.prototype.updateTexture = function(e) {
		var t = e._glTextures[this.CONTEXT_UID];
		if (t) {
			var n = this.renderer;
			if (this.initTextureType(e, t), e.resource && e.resource.upload(n, e, t)) t.samplerType !== ee.FLOAT && (this.hasIntegerTextures = !0);
			else {
				var r = e.realWidth, i = e.realHeight, a = n.gl;
				(t.width !== r || t.height !== i || t.dirtyId < 0) && (t.width = r, t.height = i, a.texImage2D(e.target, 0, t.internalFormat, r, i, 0, e.format, t.type, null));
			}
			e.dirtyStyleId !== t.dirtyStyleId && this.updateTextureStyle(e), t.dirtyId = e.dirtyId;
		}
	}, e.prototype.destroyTexture = function(e, t) {
		var n = this.gl;
		if (e = e.castToBaseTexture(), e._glTextures[this.CONTEXT_UID] && (this.unbind(e), n.deleteTexture(e._glTextures[this.CONTEXT_UID].texture), e.off("dispose", this.destroyTexture, this), delete e._glTextures[this.CONTEXT_UID], !t)) {
			var r = this.managedTextures.indexOf(e);
			r !== -1 && et(this.managedTextures, r, 1);
		}
	}, e.prototype.updateTextureStyle = function(e) {
		var t = e._glTextures[this.CONTEXT_UID];
		t && ((e.mipmap === re.POW2 || this.webGLVersion !== 2) && !e.isPowerOfTwo ? t.mipmap = !1 : t.mipmap = e.mipmap >= 1, this.webGLVersion !== 2 && !e.isPowerOfTwo ? t.wrapMode = ne.CLAMP : t.wrapMode = e.wrapMode, e.resource && e.resource.style(this.renderer, e, t) || this.setStyle(e, t), t.dirtyStyleId = e.dirtyStyleId);
	}, e.prototype.setStyle = function(e, t) {
		var n = this.gl;
		if (t.mipmap && e.mipmap !== re.ON_MANUAL && n.generateMipmap(e.target), n.texParameteri(e.target, n.TEXTURE_WRAP_S, t.wrapMode), n.texParameteri(e.target, n.TEXTURE_WRAP_T, t.wrapMode), t.mipmap) {
			n.texParameteri(e.target, n.TEXTURE_MIN_FILTER, e.scaleMode === te.LINEAR ? n.LINEAR_MIPMAP_LINEAR : n.NEAREST_MIPMAP_NEAREST);
			var r = this.renderer.context.extensions.anisotropicFiltering;
			if (r && e.anisotropicLevel > 0 && e.scaleMode === te.LINEAR) {
				var i = Math.min(e.anisotropicLevel, n.getParameter(r.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
				n.texParameterf(e.target, r.TEXTURE_MAX_ANISOTROPY_EXT, i);
			}
		} else n.texParameteri(e.target, n.TEXTURE_MIN_FILTER, e.scaleMode === te.LINEAR ? n.LINEAR : n.NEAREST);
		n.texParameteri(e.target, n.TEXTURE_MAG_FILTER, e.scaleMode === te.LINEAR ? n.LINEAR : n.NEAREST);
	}, e.prototype.destroy = function() {
		this.renderer = null;
	}, e;
}(), xi = {
	__proto__: null,
	FilterSystem: Ln,
	BatchSystem: zn,
	ContextSystem: Vn,
	FramebufferSystem: Wn,
	GeometrySystem: Kn,
	MaskSystem: Br,
	ScissorSystem: Wr,
	StencilSystem: Gr,
	ProjectionSystem: Kr,
	RenderTextureSystem: Yr,
	ShaderSystem: ci,
	StateSystem: gi,
	TextureGCSystem: _i,
	TextureSystem: bi
}, Si = new W(), Ci = function(e) {
	J(t, e);
	function t(t, n) {
		t === void 0 && (t = O.UNKNOWN);
		var r = e.call(this) || this;
		return n = Object.assign({}, V.RENDER_OPTIONS, n), r.options = n, r.type = t, r.screen = new U(0, 0, n.width, n.height), r.view = n.view || V.ADAPTER.createCanvas(), r.resolution = n.resolution || V.RESOLUTION, r.useContextAlpha = n.useContextAlpha, r.autoDensity = !!n.autoDensity, r.preserveDrawingBuffer = n.preserveDrawingBuffer, r.clearBeforeRender = n.clearBeforeRender, r._backgroundColor = 0, r._backgroundColorRgba = [
			0,
			0,
			0,
			1
		], r._backgroundColorString = "#000000", r.backgroundColor = n.backgroundColor || r._backgroundColor, r.backgroundAlpha = n.backgroundAlpha, n.transparent !== void 0 && (at("6.0.0", "Option transparent is deprecated, please use backgroundAlpha instead."), r.useContextAlpha = n.transparent, r.backgroundAlpha = +!n.transparent), r._lastObjectRendered = null, r.plugins = {}, r;
	}
	return t.prototype.initPlugins = function(e) {
		for (var t in e) this.plugins[t] = new e[t](this);
	}, Object.defineProperty(t.prototype, "width", {
		get: function() {
			return this.view.width;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "height", {
		get: function() {
			return this.view.height;
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype.resize = function(e, t) {
		this.view.width = Math.round(e * this.resolution), this.view.height = Math.round(t * this.resolution);
		var n = this.view.width / this.resolution, r = this.view.height / this.resolution;
		this.screen.width = n, this.screen.height = r, this.autoDensity && (this.view.style.width = n + "px", this.view.style.height = r + "px"), this.emit("resize", n, r);
	}, t.prototype.generateTexture = function(e, t, n, r) {
		t === void 0 && (t = {}), typeof t == "number" && (at("6.1.0", "generateTexture options (scaleMode, resolution, region) are now object options."), t = {
			scaleMode: t,
			resolution: n,
			region: r
		});
		var i = t.region, a = Qt(t, ["region"]);
		r = i || e.getLocalBounds(null, !0), r.width === 0 && (r.width = 1), r.height === 0 && (r.height = 1);
		var o = yn.create(Zt({
			width: r.width,
			height: r.height
		}, a));
		return Si.tx = -r.x, Si.ty = -r.y, this.render(e, {
			renderTexture: o,
			clear: !1,
			transform: Si,
			skipUpdateTransform: !!e.parent
		}), o;
	}, t.prototype.destroy = function(e) {
		for (var t in this.plugins) this.plugins[t].destroy(), this.plugins[t] = null;
		e && this.view.parentNode && this.view.parentNode.removeChild(this.view);
		var n = this;
		n.plugins = null, n.type = O.UNKNOWN, n.view = null, n.screen = null, n._tempDisplayObjectParent = null, n.options = null, this._backgroundColorRgba = null, this._backgroundColorString = null, this._lastObjectRendered = null;
	}, Object.defineProperty(t.prototype, "backgroundColor", {
		get: function() {
			return this._backgroundColor;
		},
		set: function(e) {
			this._backgroundColor = e, this._backgroundColorString = Ve(e), Be(e, this._backgroundColorRgba);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "backgroundAlpha", {
		get: function() {
			return this._backgroundColorRgba[3];
		},
		set: function(e) {
			this._backgroundColorRgba[3] = e;
		},
		enumerable: !1,
		configurable: !0
	}), t;
}(Ae.default), wi = function() {
	function e(e) {
		this.buffer = e || null, this.updateID = -1, this.byteLength = -1, this.refCount = 0;
	}
	return e;
}(), Ti = function() {
	function e(e) {
		this.renderer = e, this.managedBuffers = {}, this.boundBufferBases = {};
	}
	return e.prototype.destroy = function() {
		this.renderer = null;
	}, e.prototype.contextChange = function() {
		this.disposeAll(!0), this.gl = this.renderer.gl, this.CONTEXT_UID = this.renderer.CONTEXT_UID;
	}, e.prototype.bind = function(e) {
		var t = this, n = t.gl, r = t.CONTEXT_UID, i = e._glBuffers[r] || this.createGLBuffer(e);
		n.bindBuffer(e.type, i.buffer);
	}, e.prototype.bindBufferBase = function(e, t) {
		var n = this, r = n.gl, i = n.CONTEXT_UID;
		if (this.boundBufferBases[t] !== e) {
			var a = e._glBuffers[i] || this.createGLBuffer(e);
			this.boundBufferBases[t] = e, r.bindBufferBase(r.UNIFORM_BUFFER, t, a.buffer);
		}
	}, e.prototype.bindBufferRange = function(e, t, n) {
		var r = this, i = r.gl, a = r.CONTEXT_UID;
		n ||= 0;
		var o = e._glBuffers[a] || this.createGLBuffer(e);
		i.bindBufferRange(i.UNIFORM_BUFFER, t || 0, o.buffer, n * 256, 256);
	}, e.prototype.update = function(e) {
		var t = this, n = t.gl, r = t.CONTEXT_UID, i = e._glBuffers[r];
		if (e._updateID !== i.updateID) if (i.updateID = e._updateID, n.bindBuffer(e.type, i.buffer), i.byteLength >= e.data.byteLength) n.bufferSubData(e.type, 0, e.data);
		else {
			var a = e.static ? n.STATIC_DRAW : n.DYNAMIC_DRAW;
			i.byteLength = e.data.byteLength, n.bufferData(e.type, e.data, a);
		}
	}, e.prototype.dispose = function(e, t) {
		if (this.managedBuffers[e.id]) {
			delete this.managedBuffers[e.id];
			var n = e._glBuffers[this.CONTEXT_UID], r = this.gl;
			e.disposeRunner.remove(this), n && (t || r.deleteBuffer(n.buffer), delete e._glBuffers[this.CONTEXT_UID]);
		}
	}, e.prototype.disposeAll = function(e) {
		for (var t = Object.keys(this.managedBuffers), n = 0; n < t.length; n++) this.dispose(this.managedBuffers[t[n]], e);
	}, e.prototype.createGLBuffer = function(e) {
		var t = this, n = t.CONTEXT_UID, r = t.gl;
		return e._glBuffers[n] = new wi(r.createBuffer()), this.managedBuffers[e.id] = e, e.disposeRunner.add(this), e._glBuffers[n];
	}, e;
}(), Ei = function(e) {
	J(t, e);
	function t(n) {
		var r = e.call(this, O.WEBGL, n) || this;
		return n = r.options, r.gl = null, r.CONTEXT_UID = 0, r.runners = {
			destroy: new Ut("destroy"),
			contextChange: new Ut("contextChange"),
			reset: new Ut("reset"),
			update: new Ut("update"),
			postrender: new Ut("postrender"),
			prerender: new Ut("prerender"),
			resize: new Ut("resize")
		}, r.runners.contextChange.add(r), r.globalUniforms = new Nn({ projectionMatrix: new W() }, !0), r.addSystem(Br, "mask").addSystem(Vn, "context").addSystem(gi, "state").addSystem(ci, "shader").addSystem(bi, "texture").addSystem(Ti, "buffer").addSystem(Kn, "geometry").addSystem(Wn, "framebuffer").addSystem(Wr, "scissor").addSystem(Gr, "stencil").addSystem(Kr, "projection").addSystem(_i, "textureGC").addSystem(Ln, "filter").addSystem(Yr, "renderTexture").addSystem(zn, "batch"), r.initPlugins(t.__plugins), r.multisample = void 0, n.context ? r.context.initFromContext(n.context) : r.context.initFromOptions({
			alpha: !!r.useContextAlpha,
			antialias: n.antialias,
			premultipliedAlpha: r.useContextAlpha && r.useContextAlpha !== "notMultiplied",
			stencil: !0,
			preserveDrawingBuffer: n.preserveDrawingBuffer,
			powerPreference: r.options.powerPreference
		}), r.renderingToScreen = !0, Ie(r.context.webGLVersion === 2 ? "WebGL 2" : "WebGL 1"), r.resize(r.options.width, r.options.height), r;
	}
	return t.create = function(e) {
		if (Re()) return new t(e);
		throw Error("WebGL unsupported in this browser, use \"pixi.js-legacy\" for fallback canvas2d support.");
	}, t.prototype.contextChange = function() {
		var e = this.gl, t;
		if (this.context.webGLVersion === 1) {
			var n = e.getParameter(e.FRAMEBUFFER_BINDING);
			e.bindFramebuffer(e.FRAMEBUFFER, null), t = e.getParameter(e.SAMPLES), e.bindFramebuffer(e.FRAMEBUFFER, n);
		} else {
			var n = e.getParameter(e.DRAW_FRAMEBUFFER_BINDING);
			e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), t = e.getParameter(e.SAMPLES), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, n);
		}
		t >= L.HIGH ? this.multisample = L.HIGH : t >= L.MEDIUM ? this.multisample = L.MEDIUM : t >= L.LOW ? this.multisample = L.LOW : this.multisample = L.NONE;
	}, t.prototype.addSystem = function(e, t) {
		var n = new e(this);
		if (this[t]) throw Error("Whoops! The name \"" + t + "\" is already in use");
		for (var r in this[t] = n, this.runners) this.runners[r].add(n);
		return this;
	}, t.prototype.render = function(e, t) {
		var n, r, i, a;
		if (t && (t instanceof yn ? (at("6.0.0", "Renderer#render arguments changed, use options instead."), n = t, r = arguments[2], i = arguments[3], a = arguments[4]) : (n = t.renderTexture, r = t.clear, i = t.transform, a = t.skipUpdateTransform)), this.renderingToScreen = !n, this.runners.prerender.emit(), this.emit("prerender"), this.projection.transform = i, !this.context.isLost) {
			if (n || (this._lastObjectRendered = e), !a) {
				var o = e.enableTempParent();
				e.updateTransform(), e.disableTempParent(o);
			}
			this.renderTexture.bind(n), this.batch.currentRenderer.start(), (r === void 0 ? this.clearBeforeRender : r) && this.renderTexture.clear(), e.render(this), this.batch.currentRenderer.flush(), n && n.baseTexture.update(), this.runners.postrender.emit(), this.projection.transform = null, this.emit("postrender");
		}
	}, t.prototype.generateTexture = function(t, n, r, i) {
		n === void 0 && (n = {});
		var a = e.prototype.generateTexture.call(this, t, n, r, i);
		return this.framebuffer.blit(), a;
	}, t.prototype.resize = function(t, n) {
		e.prototype.resize.call(this, t, n), this.runners.resize.emit(this.screen.height, this.screen.width);
	}, t.prototype.reset = function() {
		return this.runners.reset.emit(), this;
	}, t.prototype.clear = function() {
		this.renderTexture.bind(), this.renderTexture.clear();
	}, t.prototype.destroy = function(t) {
		for (var n in this.runners.destroy.emit(), this.runners) this.runners[n].destroy();
		e.prototype.destroy.call(this, t), this.gl = null;
	}, Object.defineProperty(t.prototype, "extract", {
		get: function() {
			return at("6.0.0", "Renderer#extract has been deprecated, please use Renderer#plugins.extract instead."), this.plugins.extract;
		},
		enumerable: !1,
		configurable: !0
	}), t.registerPlugin = function(e, t) {
		at("6.5.0", "Renderer.registerPlugin() has been deprecated, please use extensions.add() instead."), Ht.add({
			name: e,
			type: q.RendererPlugin,
			ref: t
		});
	}, t.__plugins = {}, t;
}(Ci);
Ht.handleByMap(q.RendererPlugin, Ei.__plugins);
function Di(e) {
	return Ei.create(e);
}
(function() {
	function e(e) {
		at("6.1.0", "System class is deprecated, implemement ISystem interface instead."), this.renderer = e;
	}
	return e.prototype.destroy = function() {
		this.renderer = null;
	}, e;
})();
var Oi = function() {
	function e() {
		this.texArray = null, this.blend = 0, this.type = j.TRIANGLES, this.start = 0, this.size = 0, this.data = null;
	}
	return e;
}(), ki = function() {
	function e() {
		this.elements = [], this.ids = [], this.count = 0;
	}
	return e.prototype.clear = function() {
		for (var e = 0; e < this.count; e++) this.elements[e] = null;
		this.count = 0;
	}, e;
}(), Ai = function() {
	function e(e) {
		typeof e == "number" ? this.rawBinaryData = new ArrayBuffer(e) : e instanceof Uint8Array ? this.rawBinaryData = e.buffer : this.rawBinaryData = e, this.uint32View = new Uint32Array(this.rawBinaryData), this.float32View = new Float32Array(this.rawBinaryData);
	}
	return Object.defineProperty(e.prototype, "int8View", {
		get: function() {
			return this._int8View ||= new Int8Array(this.rawBinaryData), this._int8View;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "uint8View", {
		get: function() {
			return this._uint8View ||= new Uint8Array(this.rawBinaryData), this._uint8View;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "int16View", {
		get: function() {
			return this._int16View ||= new Int16Array(this.rawBinaryData), this._int16View;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "uint16View", {
		get: function() {
			return this._uint16View ||= new Uint16Array(this.rawBinaryData), this._uint16View;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "int32View", {
		get: function() {
			return this._int32View ||= new Int32Array(this.rawBinaryData), this._int32View;
		},
		enumerable: !1,
		configurable: !0
	}), e.prototype.view = function(e) {
		return this[e + "View"];
	}, e.prototype.destroy = function() {
		this.rawBinaryData = null, this._int8View = null, this._uint8View = null, this._int16View = null, this._uint16View = null, this._int32View = null, this.uint32View = null, this.float32View = null;
	}, e.sizeOf = function(e) {
		switch (e) {
			case "int8":
			case "uint8": return 1;
			case "int16":
			case "uint16": return 2;
			case "int32":
			case "uint32":
			case "float32": return 4;
			default: throw Error(e + " isn't a valid view type");
		}
	}, e;
}(), ji = function(e) {
	J(t, e);
	function t(t) {
		var n = e.call(this, t) || this;
		return n.shaderGenerator = null, n.geometryClass = null, n.vertexSize = null, n.state = jr.for2d(), n.size = V.SPRITE_BATCH_SIZE * 4, n._vertexCount = 0, n._indexCount = 0, n._bufferedElements = [], n._bufferedTextures = [], n._bufferSize = 0, n._shader = null, n._packedGeometries = [], n._packedGeometryPoolSize = 2, n._flushId = 0, n._aBuffers = {}, n._iBuffers = {}, n.MAX_TEXTURES = 1, n.renderer.on("prerender", n.onPrerender, n), t.runners.contextChange.add(n), n._dcIndex = 0, n._aIndex = 0, n._iIndex = 0, n._attributeBuffer = null, n._indexBuffer = null, n._tempBoundTextures = [], n;
	}
	return t.prototype.contextChange = function() {
		var e = this.renderer.gl;
		V.PREFER_ENV === D.WEBGL_LEGACY ? this.MAX_TEXTURES = 1 : (this.MAX_TEXTURES = Math.min(e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), V.SPRITE_MAX_TEXTURES), this.MAX_TEXTURES = gr(this.MAX_TEXTURES, e)), this._shader = this.shaderGenerator.generateShader(this.MAX_TEXTURES);
		for (var t = 0; t < this._packedGeometryPoolSize; t++) this._packedGeometries[t] = new this.geometryClass();
		this.initFlushBuffers();
	}, t.prototype.initFlushBuffers = function() {
		for (var e = t._drawCallPool, n = t._textureArrayPool, r = this.size / 4, i = Math.floor(r / this.MAX_TEXTURES) + 1; e.length < r;) e.push(new Oi());
		for (; n.length < i;) n.push(new ki());
		for (var a = 0; a < this.MAX_TEXTURES; a++) this._tempBoundTextures[a] = null;
	}, t.prototype.onPrerender = function() {
		this._flushId = 0;
	}, t.prototype.render = function(e) {
		e._texture.valid && (this._vertexCount + e.vertexData.length / 2 > this.size && this.flush(), this._vertexCount += e.vertexData.length / 2, this._indexCount += e.indices.length, this._bufferedTextures[this._bufferSize] = e._texture.baseTexture, this._bufferedElements[this._bufferSize++] = e);
	}, t.prototype.buildTexturesAndDrawCalls = function() {
		var e = this, n = e._bufferedTextures, r = e.MAX_TEXTURES, i = t._textureArrayPool, a = this.renderer.batch, o = this._tempBoundTextures, s = this.renderer.textureGC.count, c = ++Y._globalBatch, l = 0, u = i[0], d = 0;
		a.copyBoundTextures(o, r);
		for (var f = 0; f < this._bufferSize; ++f) {
			var p = n[f];
			n[f] = null, p._batchEnabled !== c && (u.count >= r && (a.boundArray(u, o, c, r), this.buildDrawCalls(u, d, f), d = f, u = i[++l], ++c), p._batchEnabled = c, p.touched = s, u.elements[u.count++] = p);
		}
		u.count > 0 && (a.boundArray(u, o, c, r), this.buildDrawCalls(u, d, this._bufferSize), ++l, ++c);
		for (var f = 0; f < o.length; f++) o[f] = null;
		Y._globalBatch = c;
	}, t.prototype.buildDrawCalls = function(e, n, r) {
		var i = this, a = i._bufferedElements, o = i._attributeBuffer, s = i._indexBuffer, c = i.vertexSize, l = t._drawCallPool, u = this._dcIndex, d = this._aIndex, f = this._iIndex, p = l[u];
		p.start = this._iIndex, p.texArray = e;
		for (var m = n; m < r; ++m) {
			var h = a[m], g = We[+!!h._texture.baseTexture.alphaMode][h.blendMode];
			a[m] = null, n < m && p.blend !== g && (p.size = f - p.start, n = m, p = l[++u], p.texArray = e, p.start = f), this.packInterleavedGeometry(h, o, s, d, f), d += h.vertexData.length / 2 * c, f += h.indices.length, p.blend = g;
		}
		n < r && (p.size = f - p.start, ++u), this._dcIndex = u, this._aIndex = d, this._iIndex = f;
	}, t.prototype.bindAndClearTexArray = function(e) {
		for (var t = this.renderer.texture, n = 0; n < e.count; n++) t.bind(e.elements[n], e.ids[n]), e.elements[n] = null;
		e.count = 0;
	}, t.prototype.updateGeometry = function() {
		var e = this, t = e._packedGeometries, n = e._attributeBuffer, r = e._indexBuffer;
		V.CAN_UPLOAD_SAME_BUFFER ? (t[this._flushId]._buffer.update(n.rawBinaryData), t[this._flushId]._indexBuffer.update(r), this.renderer.geometry.updateBuffers()) : (this._packedGeometryPoolSize <= this._flushId && (this._packedGeometryPoolSize++, t[this._flushId] = new this.geometryClass()), t[this._flushId]._buffer.update(n.rawBinaryData), t[this._flushId]._indexBuffer.update(r), this.renderer.geometry.bind(t[this._flushId]), this.renderer.geometry.updateBuffers(), this._flushId++);
	}, t.prototype.drawBatches = function() {
		for (var e = this._dcIndex, n = this.renderer, r = n.gl, i = n.state, a = t._drawCallPool, o = null, s = 0; s < e; s++) {
			var c = a[s], l = c.texArray, u = c.type, d = c.size, f = c.start, p = c.blend;
			o !== l && (o = l, this.bindAndClearTexArray(l)), this.state.blendMode = p, i.set(this.state), r.drawElements(u, d, r.UNSIGNED_SHORT, f * 2);
		}
	}, t.prototype.flush = function() {
		this._vertexCount !== 0 && (this._attributeBuffer = this.getAttributeBuffer(this._vertexCount), this._indexBuffer = this.getIndexBuffer(this._indexCount), this._aIndex = 0, this._iIndex = 0, this._dcIndex = 0, this.buildTexturesAndDrawCalls(), this.updateGeometry(), this.drawBatches(), this._bufferSize = 0, this._vertexCount = 0, this._indexCount = 0);
	}, t.prototype.start = function() {
		this.renderer.state.set(this.state), this.renderer.texture.ensureSamplerType(this.MAX_TEXTURES), this.renderer.shader.bind(this._shader), V.CAN_UPLOAD_SAME_BUFFER && this.renderer.geometry.bind(this._packedGeometries[this._flushId]);
	}, t.prototype.stop = function() {
		this.flush();
	}, t.prototype.destroy = function() {
		for (var t = 0; t < this._packedGeometryPoolSize; t++) this._packedGeometries[t] && this._packedGeometries[t].destroy();
		this.renderer.off("prerender", this.onPrerender, this), this._aBuffers = null, this._iBuffers = null, this._packedGeometries = null, this._attributeBuffer = null, this._indexBuffer = null, this._shader &&= (this._shader.destroy(), null), e.prototype.destroy.call(this);
	}, t.prototype.getAttributeBuffer = function(e) {
		var t = Ze(Math.ceil(e / 8)), n = $e(t), r = t * 8;
		this._aBuffers.length <= n && (this._iBuffers.length = n + 1);
		var i = this._aBuffers[r];
		return i || (this._aBuffers[r] = i = new Ai(r * this.vertexSize * 4)), i;
	}, t.prototype.getIndexBuffer = function(e) {
		var t = Ze(Math.ceil(e / 12)), n = $e(t), r = t * 12;
		this._iBuffers.length <= n && (this._iBuffers.length = n + 1);
		var i = this._iBuffers[n];
		return i || (this._iBuffers[n] = i = new Uint16Array(r)), i;
	}, t.prototype.packInterleavedGeometry = function(e, t, n, r, i) {
		for (var a = t.uint32View, o = t.float32View, s = r / this.vertexSize, c = e.uvs, l = e.indices, u = e.vertexData, d = e._texture.baseTexture._batchLocation, f = Math.min(e.worldAlpha, 1), p = f < 1 && e._texture.baseTexture.alphaMode ? qe(e._tintRGB, f) : e._tintRGB + (f * 255 << 24), m = 0; m < u.length; m += 2) o[r++] = u[m], o[r++] = u[m + 1], o[r++] = c[m], o[r++] = c[m + 1], a[r++] = p, o[r++] = d;
		for (var m = 0; m < l.length; m++) n[i++] = s + l[m];
	}, t._drawCallPool = [], t._textureArrayPool = [], t;
}(Rn), Mi = function() {
	function e(e, t) {
		if (this.vertexSrc = e, this.fragTemplate = t, this.programCache = {}, this.defaultGroupCache = {}, t.indexOf("%count%") < 0) throw Error("Fragment template must contain \"%count%\".");
		if (t.indexOf("%forloop%") < 0) throw Error("Fragment template must contain \"%forloop%\".");
	}
	return e.prototype.generateShader = function(e) {
		if (!this.programCache[e]) {
			for (var t = new Int32Array(e), n = 0; n < e; n++) t[n] = n;
			this.defaultGroupCache[e] = Nn.from({ uSamplers: t }, !0);
			var r = this.fragTemplate;
			r = r.replace(/%count%/gi, "" + e), r = r.replace(/%forloop%/gi, this.generateSampleSrc(e)), this.programCache[e] = new Cr(this.vertexSrc, r);
		}
		var i = {
			tint: new Float32Array([
				1,
				1,
				1,
				1
			]),
			translationMatrix: new W(),
			default: this.defaultGroupCache[e]
		};
		return new wr(this.programCache[e], i);
	}, e.prototype.generateSampleSrc = function(e) {
		var t = "";
		t += "\n", t += "\n";
		for (var n = 0; n < e; n++) n > 0 && (t += "\nelse "), n < e - 1 && (t += "if(vTextureId < " + n + ".5)"), t += "\n{", t += "\n	color = texture2D(uSamplers[" + n + "], vTextureCoord);", t += "\n}";
		return t += "\n", t += "\n", t;
	}, e;
}(), Ni = function(e) {
	J(t, e);
	function t(t) {
		t === void 0 && (t = !1);
		var n = e.call(this) || this;
		return n._buffer = new Cn(null, t, !1), n._indexBuffer = new Cn(null, t, !0), n.addAttribute("aVertexPosition", n._buffer, 2, !1, P.FLOAT).addAttribute("aTextureCoord", n._buffer, 2, !1, P.FLOAT).addAttribute("aColor", n._buffer, 4, !0, P.UNSIGNED_BYTE).addAttribute("aTextureId", n._buffer, 1, !0, P.FLOAT).addIndex(n._indexBuffer), n;
	}
	return t;
}(kn), Pi = "precision highp float;\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform vec4 tint;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main(void){\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vTextureId = aTextureId;\n    vColor = aColor * tint;\n}\n", Fi = "varying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\nuniform sampler2D uSamplers[%count%];\n\nvoid main(void){\n    vec4 color;\n    %forloop%\n    gl_FragColor = color * vColor;\n}\n", Ii = function() {
	function e() {}
	return e.create = function(e) {
		var t = Object.assign({
			vertex: Pi,
			fragment: Fi,
			geometryClass: Ni,
			vertexSize: 6
		}, e), n = t.vertex, r = t.fragment, i = t.vertexSize, a = t.geometryClass;
		return function(e) {
			J(t, e);
			function t(t) {
				var o = e.call(this, t) || this;
				return o.shaderGenerator = new Mi(n, r), o.geometryClass = a, o.vertexSize = i, o;
			}
			return t;
		}(ji);
	}, Object.defineProperty(e, "defaultVertexSrc", {
		get: function() {
			return Pi;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e, "defaultFragmentTemplate", {
		get: function() {
			return Fi;
		},
		enumerable: !1,
		configurable: !0
	}), e;
}().create();
Object.assign(Ii, { extension: {
	name: "batch",
	type: q.RendererPlugin
} });
var Li = {}, Ri = function(e) {
	Object.defineProperty(Li, e, { get: function() {
		return at("6.0.0", "PIXI.systems." + e + " has moved to PIXI." + e), fn[e];
	} });
};
for (var zi in fn) Ri(zi);
var Bi = {}, Vi = function(e) {
	Object.defineProperty(Bi, e, { get: function() {
		return at("6.0.0", "PIXI.resources." + e + " has moved to PIXI." + e), xi[e];
	} });
};
for (var zi in xi) Vi(zi);
K.mixin({
	accessible: !1,
	accessibleTitle: null,
	accessibleHint: null,
	tabIndex: 0,
	_accessibleActive: !1,
	_accessibleDiv: null,
	accessibleType: "button",
	accessiblePointerEvents: "auto",
	accessibleChildren: !0,
	renderId: -1
});
var Hi = 9, Ui = 100, Wi = 0, Gi = 0, Ki = 2, qi = 1, Ji = -1e3, Yi = -1e3, Xi = 2, Zi = function() {
	function e(e) {
		this.debug = !1, this._isActive = !1, this._isMobileAccessibility = !1, this.pool = [], this.renderId = 0, this.children = [], this.androidUpdateCount = 0, this.androidUpdateFrequency = 500, this._hookDiv = null, (Te.tablet || Te.phone) && this.createTouchHook();
		var t = document.createElement("div");
		t.style.width = Ui + "px", t.style.height = Ui + "px", t.style.position = "absolute", t.style.top = Wi + "px", t.style.left = Gi + "px", t.style.zIndex = Ki.toString(), this.div = t, this.renderer = e, this._onKeyDown = this._onKeyDown.bind(this), this._onMouseMove = this._onMouseMove.bind(this), globalThis.addEventListener("keydown", this._onKeyDown, !1);
	}
	return Object.defineProperty(e.prototype, "isActive", {
		get: function() {
			return this._isActive;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "isMobileAccessibility", {
		get: function() {
			return this._isMobileAccessibility;
		},
		enumerable: !1,
		configurable: !0
	}), e.prototype.createTouchHook = function() {
		var e = this, t = document.createElement("button");
		t.style.width = qi + "px", t.style.height = qi + "px", t.style.position = "absolute", t.style.top = Ji + "px", t.style.left = Yi + "px", t.style.zIndex = Xi.toString(), t.style.backgroundColor = "#FF0000", t.title = "select to enable accessibility for this content", t.addEventListener("focus", function() {
			e._isMobileAccessibility = !0, e.activate(), e.destroyTouchHook();
		}), document.body.appendChild(t), this._hookDiv = t;
	}, e.prototype.destroyTouchHook = function() {
		this._hookDiv &&= (document.body.removeChild(this._hookDiv), null);
	}, e.prototype.activate = function() {
		var e;
		this._isActive || (this._isActive = !0, globalThis.document.addEventListener("mousemove", this._onMouseMove, !0), globalThis.removeEventListener("keydown", this._onKeyDown, !1), this.renderer.on("postrender", this.update, this), (e = this.renderer.view.parentNode) == null || e.appendChild(this.div));
	}, e.prototype.deactivate = function() {
		var e;
		!this._isActive || this._isMobileAccessibility || (this._isActive = !1, globalThis.document.removeEventListener("mousemove", this._onMouseMove, !0), globalThis.addEventListener("keydown", this._onKeyDown, !1), this.renderer.off("postrender", this.update), (e = this.div.parentNode) == null || e.removeChild(this.div));
	}, e.prototype.updateAccessibleObjects = function(e) {
		if (!(!e.visible || !e.accessibleChildren)) {
			e.accessible && e.interactive && (e._accessibleActive || this.addChild(e), e.renderId = this.renderId);
			var t = e.children;
			if (t) for (var n = 0; n < t.length; n++) this.updateAccessibleObjects(t[n]);
		}
	}, e.prototype.update = function() {
		var e = performance.now();
		if (!(Te.android.device && e < this.androidUpdateCount) && (this.androidUpdateCount = e + this.androidUpdateFrequency, this.renderer.renderingToScreen)) {
			this.renderer._lastObjectRendered && this.updateAccessibleObjects(this.renderer._lastObjectRendered);
			var t = this.renderer.view.getBoundingClientRect(), n = t.left, r = t.top, i = t.width, a = t.height, o = this.renderer, s = o.width, c = o.height, l = o.resolution, u = i / s * l, d = a / c * l, f = this.div;
			f.style.left = n + "px", f.style.top = r + "px", f.style.width = s + "px", f.style.height = c + "px";
			for (var p = 0; p < this.children.length; p++) {
				var m = this.children[p];
				if (m.renderId !== this.renderId) m._accessibleActive = !1, et(this.children, p, 1), this.div.removeChild(m._accessibleDiv), this.pool.push(m._accessibleDiv), m._accessibleDiv = null, p--;
				else {
					f = m._accessibleDiv;
					var h = m.hitArea, g = m.worldTransform;
					m.hitArea ? (f.style.left = (g.tx + h.x * g.a) * u + "px", f.style.top = (g.ty + h.y * g.d) * d + "px", f.style.width = h.width * g.a * u + "px", f.style.height = h.height * g.d * d + "px") : (h = m.getBounds(), this.capHitArea(h), f.style.left = h.x * u + "px", f.style.top = h.y * d + "px", f.style.width = h.width * u + "px", f.style.height = h.height * d + "px", f.title !== m.accessibleTitle && m.accessibleTitle !== null && (f.title = m.accessibleTitle), f.getAttribute("aria-label") !== m.accessibleHint && m.accessibleHint !== null && f.setAttribute("aria-label", m.accessibleHint)), (m.accessibleTitle !== f.title || m.tabIndex !== f.tabIndex) && (f.title = m.accessibleTitle, f.tabIndex = m.tabIndex, this.debug && this.updateDebugHTML(f));
				}
			}
			this.renderId++;
		}
	}, e.prototype.updateDebugHTML = function(e) {
		e.innerHTML = "type: " + e.type + "</br> title : " + e.title + "</br> tabIndex: " + e.tabIndex;
	}, e.prototype.capHitArea = function(e) {
		e.x < 0 && (e.width += e.x, e.x = 0), e.y < 0 && (e.height += e.y, e.y = 0);
		var t = this.renderer, n = t.width, r = t.height;
		e.x + e.width > n && (e.width = n - e.x), e.y + e.height > r && (e.height = r - e.y);
	}, e.prototype.addChild = function(e) {
		var t = this.pool.pop();
		t || (t = document.createElement("button"), t.style.width = Ui + "px", t.style.height = Ui + "px", t.style.backgroundColor = this.debug ? "rgba(255,255,255,0.5)" : "transparent", t.style.position = "absolute", t.style.zIndex = Ki.toString(), t.style.borderStyle = "none", navigator.userAgent.toLowerCase().indexOf("chrome") > -1 ? t.setAttribute("aria-live", "off") : t.setAttribute("aria-live", "polite"), navigator.userAgent.match(/rv:.*Gecko\//) ? t.setAttribute("aria-relevant", "additions") : t.setAttribute("aria-relevant", "text"), t.addEventListener("click", this._onClick.bind(this)), t.addEventListener("focus", this._onFocus.bind(this)), t.addEventListener("focusout", this._onFocusOut.bind(this))), t.style.pointerEvents = e.accessiblePointerEvents, t.type = e.accessibleType, e.accessibleTitle && e.accessibleTitle !== null ? t.title = e.accessibleTitle : (!e.accessibleHint || e.accessibleHint === null) && (t.title = "displayObject " + e.tabIndex), e.accessibleHint && e.accessibleHint !== null && t.setAttribute("aria-label", e.accessibleHint), this.debug && this.updateDebugHTML(t), e._accessibleActive = !0, e._accessibleDiv = t, t.displayObject = e, this.children.push(e), this.div.appendChild(e._accessibleDiv), e._accessibleDiv.tabIndex = e.tabIndex;
	}, e.prototype._onClick = function(e) {
		var t = this.renderer.plugins.interaction, n = e.target.displayObject, r = t.eventData;
		t.dispatchEvent(n, "click", r), t.dispatchEvent(n, "pointertap", r), t.dispatchEvent(n, "tap", r);
	}, e.prototype._onFocus = function(e) {
		e.target.getAttribute("aria-live") || e.target.setAttribute("aria-live", "assertive");
		var t = this.renderer.plugins.interaction, n = e.target.displayObject, r = t.eventData;
		t.dispatchEvent(n, "mouseover", r);
	}, e.prototype._onFocusOut = function(e) {
		e.target.getAttribute("aria-live") || e.target.setAttribute("aria-live", "polite");
		var t = this.renderer.plugins.interaction, n = e.target.displayObject, r = t.eventData;
		t.dispatchEvent(n, "mouseout", r);
	}, e.prototype._onKeyDown = function(e) {
		e.keyCode === Hi && this.activate();
	}, e.prototype._onMouseMove = function(e) {
		e.movementX === 0 && e.movementY === 0 || this.deactivate();
	}, e.prototype.destroy = function() {
		this.destroyTouchHook(), this.div = null, globalThis.document.removeEventListener("mousemove", this._onMouseMove, !0), globalThis.removeEventListener("keydown", this._onKeyDown), this.pool = null, this.children = null, this.renderer = null;
	}, e.extension = {
		name: "accessibility",
		type: [q.RendererPlugin, q.CanvasRendererPlugin]
	}, e;
}(), Qi = function() {
	function e() {
		this.pressure = 0, this.rotationAngle = 0, this.twist = 0, this.tangentialPressure = 0, this.global = new H(), this.target = null, this.originalEvent = null, this.identifier = null, this.isPrimary = !1, this.button = 0, this.buttons = 0, this.width = 0, this.height = 0, this.tiltX = 0, this.tiltY = 0, this.pointerType = null, this.pressure = 0, this.rotationAngle = 0, this.twist = 0, this.tangentialPressure = 0;
	}
	return Object.defineProperty(e.prototype, "pointerId", {
		get: function() {
			return this.identifier;
		},
		enumerable: !1,
		configurable: !0
	}), e.prototype.getLocalPosition = function(e, t, n) {
		return e.worldTransform.applyInverse(n || this.global, t);
	}, e.prototype.copyEvent = function(e) {
		"isPrimary" in e && e.isPrimary && (this.isPrimary = !0), this.button = "button" in e && e.button;
		var t = "buttons" in e && e.buttons;
		this.buttons = Number.isInteger(t) ? t : "which" in e && e.which, this.width = "width" in e && e.width, this.height = "height" in e && e.height, this.tiltX = "tiltX" in e && e.tiltX, this.tiltY = "tiltY" in e && e.tiltY, this.pointerType = "pointerType" in e && e.pointerType, this.pressure = "pressure" in e && e.pressure, this.rotationAngle = "rotationAngle" in e && e.rotationAngle, this.twist = "twist" in e && e.twist || 0, this.tangentialPressure = "tangentialPressure" in e && e.tangentialPressure || 0;
	}, e.prototype.reset = function() {
		this.isPrimary = !1;
	}, e;
}(), $i = function(e, t) {
	return $i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, $i(e, t);
};
function ea(e, t) {
	$i(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var ta = function() {
	function e() {
		this.stopped = !1, this.stopsPropagatingAt = null, this.stopPropagationHint = !1, this.target = null, this.currentTarget = null, this.type = null, this.data = null;
	}
	return e.prototype.stopPropagation = function() {
		this.stopped = !0, this.stopPropagationHint = !0, this.stopsPropagatingAt = this.currentTarget;
	}, e.prototype.reset = function() {
		this.stopped = !1, this.stopsPropagatingAt = null, this.stopPropagationHint = !1, this.currentTarget = null, this.target = null;
	}, e;
}(), na = function() {
	function e(t) {
		this._pointerId = t, this._flags = e.FLAGS.NONE;
	}
	return e.prototype._doSet = function(e, t) {
		t ? this._flags |= e : this._flags &= ~e;
	}, Object.defineProperty(e.prototype, "pointerId", {
		get: function() {
			return this._pointerId;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "flags", {
		get: function() {
			return this._flags;
		},
		set: function(e) {
			this._flags = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "none", {
		get: function() {
			return this._flags === e.FLAGS.NONE;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "over", {
		get: function() {
			return (this._flags & e.FLAGS.OVER) !== 0;
		},
		set: function(t) {
			this._doSet(e.FLAGS.OVER, t);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "rightDown", {
		get: function() {
			return (this._flags & e.FLAGS.RIGHT_DOWN) !== 0;
		},
		set: function(t) {
			this._doSet(e.FLAGS.RIGHT_DOWN, t);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "leftDown", {
		get: function() {
			return (this._flags & e.FLAGS.LEFT_DOWN) !== 0;
		},
		set: function(t) {
			this._doSet(e.FLAGS.LEFT_DOWN, t);
		},
		enumerable: !1,
		configurable: !0
	}), e.FLAGS = Object.freeze({
		NONE: 0,
		OVER: 1,
		LEFT_DOWN: 2,
		RIGHT_DOWN: 4
	}), e;
}(), ra = function() {
	function e() {
		this._tempPoint = new H();
	}
	return e.prototype.recursiveFindHit = function(e, t, n, r, i) {
		if (!t || !t.visible) return !1;
		var a = e.data.global;
		i = t.interactive || i;
		var o = !1, s = i, c = !0;
		if (t.hitArea) r && (t.worldTransform.applyInverse(a, this._tempPoint), t.hitArea.contains(this._tempPoint.x, this._tempPoint.y) ? o = !0 : (r = !1, c = !1)), s = !1;
		else if (t._mask && r) {
			var l = t._mask.isMaskData ? t._mask.maskObject : t._mask;
			l && !l.containsPoint?.call(l, a) && (r = !1);
		}
		if (c && t.interactiveChildren && t.children) for (var u = t.children, d = u.length - 1; d >= 0; d--) {
			var f = u[d], p = this.recursiveFindHit(e, f, n, r, s);
			if (p) {
				if (!f.parent) continue;
				s = !1, p && (e.target && (r = !1), o = !0);
			}
		}
		return i && (r && !e.target && !t.hitArea && t.containsPoint && t.containsPoint(a) && (o = !0), t.interactive && (o && !e.target && (e.target = t), n && n(e, t, !!o))), o;
	}, e.prototype.findHit = function(e, t, n, r) {
		this.recursiveFindHit(e, t, n, r, !1);
	}, e;
}();
K.mixin({
	interactive: !1,
	interactiveChildren: !0,
	hitArea: null,
	get buttonMode() {
		return this.cursor === "pointer";
	},
	set buttonMode(e) {
		e ? this.cursor = "pointer" : this.cursor === "pointer" && (this.cursor = null);
	},
	cursor: null,
	get trackedPointers() {
		return this._trackedPointers === void 0 && (this._trackedPointers = {}), this._trackedPointers;
	},
	_trackedPointers: void 0
});
var ia = 1, aa = {
	target: null,
	data: { global: null }
}, oa = function(e) {
	ea(t, e);
	function t(t, n) {
		var r = e.call(this) || this;
		return n ||= {}, r.renderer = t, r.autoPreventDefault = n.autoPreventDefault === void 0 || n.autoPreventDefault, r.interactionFrequency = n.interactionFrequency || 10, r.mouse = new Qi(), r.mouse.identifier = ia, r.mouse.global.set(-999999), r.activeInteractionData = {}, r.activeInteractionData[ia] = r.mouse, r.interactionDataPool = [], r.eventData = new ta(), r.interactionDOMElement = null, r.moveWhenInside = !1, r.eventsAdded = !1, r.tickerAdded = !1, r.mouseOverRenderer = !("PointerEvent" in globalThis), r.supportsTouchEvents = "ontouchstart" in globalThis, r.supportsPointerEvents = !!globalThis.PointerEvent, r.onPointerUp = r.onPointerUp.bind(r), r.processPointerUp = r.processPointerUp.bind(r), r.onPointerCancel = r.onPointerCancel.bind(r), r.processPointerCancel = r.processPointerCancel.bind(r), r.onPointerDown = r.onPointerDown.bind(r), r.processPointerDown = r.processPointerDown.bind(r), r.onPointerMove = r.onPointerMove.bind(r), r.processPointerMove = r.processPointerMove.bind(r), r.onPointerOut = r.onPointerOut.bind(r), r.processPointerOverOut = r.processPointerOverOut.bind(r), r.onPointerOver = r.onPointerOver.bind(r), r.cursorStyles = {
			default: "inherit",
			pointer: "pointer"
		}, r.currentCursorMode = null, r.cursor = null, r.resolution = 1, r.delayedEvents = [], r.search = new ra(), r._tempDisplayObject = new Lt(), r._eventListenerOptions = {
			capture: !0,
			passive: !1
		}, r._useSystemTicker = n.useSystemTicker === void 0 || n.useSystemTicker, r.setTargetElement(r.renderer.view, r.renderer.resolution), r;
	}
	return Object.defineProperty(t.prototype, "useSystemTicker", {
		get: function() {
			return this._useSystemTicker;
		},
		set: function(e) {
			this._useSystemTicker = e, e ? this.addTickerListener() : this.removeTickerListener();
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "lastObjectRendered", {
		get: function() {
			return this.renderer._lastObjectRendered || this._tempDisplayObject;
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype.hitTest = function(e, t) {
		return aa.target = null, aa.data.global = e, t ||= this.lastObjectRendered, this.processInteractive(aa, t, null, !0), aa.target;
	}, t.prototype.setTargetElement = function(e, t) {
		t === void 0 && (t = 1), this.removeTickerListener(), this.removeEvents(), this.interactionDOMElement = e, this.resolution = t, this.addEvents(), this.addTickerListener();
	}, t.prototype.addTickerListener = function() {
		this.tickerAdded || !this.interactionDOMElement || !this._useSystemTicker || (Kt.system.add(this.tickerUpdate, this, Wt.INTERACTION), this.tickerAdded = !0);
	}, t.prototype.removeTickerListener = function() {
		this.tickerAdded &&= (Kt.system.remove(this.tickerUpdate, this), !1);
	}, t.prototype.addEvents = function() {
		if (!(this.eventsAdded || !this.interactionDOMElement)) {
			var e = this.interactionDOMElement.style;
			globalThis.navigator.msPointerEnabled ? (e.msContentZooming = "none", e.msTouchAction = "none") : this.supportsPointerEvents && (e.touchAction = "none"), this.supportsPointerEvents ? (globalThis.document.addEventListener("pointermove", this.onPointerMove, this._eventListenerOptions), this.interactionDOMElement.addEventListener("pointerdown", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.addEventListener("pointerleave", this.onPointerOut, this._eventListenerOptions), this.interactionDOMElement.addEventListener("pointerover", this.onPointerOver, this._eventListenerOptions), globalThis.addEventListener("pointercancel", this.onPointerCancel, this._eventListenerOptions), globalThis.addEventListener("pointerup", this.onPointerUp, this._eventListenerOptions)) : (globalThis.document.addEventListener("mousemove", this.onPointerMove, this._eventListenerOptions), this.interactionDOMElement.addEventListener("mousedown", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.addEventListener("mouseout", this.onPointerOut, this._eventListenerOptions), this.interactionDOMElement.addEventListener("mouseover", this.onPointerOver, this._eventListenerOptions), globalThis.addEventListener("mouseup", this.onPointerUp, this._eventListenerOptions)), this.supportsTouchEvents && (this.interactionDOMElement.addEventListener("touchstart", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.addEventListener("touchcancel", this.onPointerCancel, this._eventListenerOptions), this.interactionDOMElement.addEventListener("touchend", this.onPointerUp, this._eventListenerOptions), this.interactionDOMElement.addEventListener("touchmove", this.onPointerMove, this._eventListenerOptions)), this.eventsAdded = !0;
		}
	}, t.prototype.removeEvents = function() {
		if (!(!this.eventsAdded || !this.interactionDOMElement)) {
			var e = this.interactionDOMElement.style;
			globalThis.navigator.msPointerEnabled ? (e.msContentZooming = "", e.msTouchAction = "") : this.supportsPointerEvents && (e.touchAction = ""), this.supportsPointerEvents ? (globalThis.document.removeEventListener("pointermove", this.onPointerMove, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("pointerdown", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("pointerleave", this.onPointerOut, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("pointerover", this.onPointerOver, this._eventListenerOptions), globalThis.removeEventListener("pointercancel", this.onPointerCancel, this._eventListenerOptions), globalThis.removeEventListener("pointerup", this.onPointerUp, this._eventListenerOptions)) : (globalThis.document.removeEventListener("mousemove", this.onPointerMove, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("mousedown", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("mouseout", this.onPointerOut, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("mouseover", this.onPointerOver, this._eventListenerOptions), globalThis.removeEventListener("mouseup", this.onPointerUp, this._eventListenerOptions)), this.supportsTouchEvents && (this.interactionDOMElement.removeEventListener("touchstart", this.onPointerDown, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("touchcancel", this.onPointerCancel, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("touchend", this.onPointerUp, this._eventListenerOptions), this.interactionDOMElement.removeEventListener("touchmove", this.onPointerMove, this._eventListenerOptions)), this.interactionDOMElement = null, this.eventsAdded = !1;
		}
	}, t.prototype.tickerUpdate = function(e) {
		this._deltaTime += e, !(this._deltaTime < this.interactionFrequency) && (this._deltaTime = 0, this.update());
	}, t.prototype.update = function() {
		if (this.interactionDOMElement) {
			if (this._didMove) {
				this._didMove = !1;
				return;
			}
			for (var e in this.cursor = null, this.activeInteractionData) if (this.activeInteractionData.hasOwnProperty(e)) {
				var t = this.activeInteractionData[e];
				if (t.originalEvent && t.pointerType !== "touch") {
					var n = this.configureInteractionEventForDOMEvent(this.eventData, t.originalEvent, t);
					this.processInteractive(n, this.lastObjectRendered, this.processPointerOverOut, !0);
				}
			}
			this.setCursorMode(this.cursor);
		}
	}, t.prototype.setCursorMode = function(e) {
		e ||= "default";
		var t = !0;
		if (globalThis.OffscreenCanvas && this.interactionDOMElement instanceof OffscreenCanvas && (t = !1), this.currentCursorMode !== e) {
			this.currentCursorMode = e;
			var n = this.cursorStyles[e];
			if (n) switch (typeof n) {
				case "string":
					t && (this.interactionDOMElement.style.cursor = n);
					break;
				case "function":
					n(e);
					break;
				case "object":
					t && Object.assign(this.interactionDOMElement.style, n);
					break;
			}
			else t && typeof e == "string" && !Object.prototype.hasOwnProperty.call(this.cursorStyles, e) && (this.interactionDOMElement.style.cursor = e);
		}
	}, t.prototype.dispatchEvent = function(e, t, n) {
		(!n.stopPropagationHint || e === n.stopsPropagatingAt) && (n.currentTarget = e, n.type = t, e.emit(t, n), e[t] && e[t](n));
	}, t.prototype.delayDispatchEvent = function(e, t, n) {
		this.delayedEvents.push({
			displayObject: e,
			eventString: t,
			eventData: n
		});
	}, t.prototype.mapPositionToPoint = function(e, t, n) {
		var r = this.interactionDOMElement.parentElement ? this.interactionDOMElement.getBoundingClientRect() : {
			x: 0,
			y: 0,
			width: this.interactionDOMElement.width,
			height: this.interactionDOMElement.height,
			left: 0,
			top: 0
		}, i = 1 / this.resolution;
		e.x = (t - r.left) * (this.interactionDOMElement.width / r.width) * i, e.y = (n - r.top) * (this.interactionDOMElement.height / r.height) * i;
	}, t.prototype.processInteractive = function(e, t, n, r) {
		var i = this.search.findHit(e, t, n, r), a = this.delayedEvents;
		if (!a.length) return i;
		e.stopPropagationHint = !1;
		var o = a.length;
		this.delayedEvents = [];
		for (var s = 0; s < o; s++) {
			var c = a[s], l = c.displayObject, u = c.eventString, d = c.eventData;
			d.stopsPropagatingAt === l && (d.stopPropagationHint = !0), this.dispatchEvent(l, u, d);
		}
		return i;
	}, t.prototype.onPointerDown = function(e) {
		if (!(this.supportsTouchEvents && e.pointerType === "touch")) {
			var t = this.normalizeToPointerData(e);
			this.autoPreventDefault && t[0].isNormalized && (e.cancelable || !("cancelable" in e)) && e.preventDefault();
			for (var n = t.length, r = 0; r < n; r++) {
				var i = t[r], a = this.getInteractionDataForPointerId(i), o = this.configureInteractionEventForDOMEvent(this.eventData, i, a);
				if (o.data.originalEvent = e, this.processInteractive(o, this.lastObjectRendered, this.processPointerDown, !0), this.emit("pointerdown", o), i.pointerType === "touch") this.emit("touchstart", o);
				else if (i.pointerType === "mouse" || i.pointerType === "pen") {
					var s = i.button === 2;
					this.emit(s ? "rightdown" : "mousedown", this.eventData);
				}
			}
		}
	}, t.prototype.processPointerDown = function(e, t, n) {
		var r = e.data, i = e.data.identifier;
		if (n) {
			if (t.trackedPointers[i] || (t.trackedPointers[i] = new na(i)), this.dispatchEvent(t, "pointerdown", e), r.pointerType === "touch") this.dispatchEvent(t, "touchstart", e);
			else if (r.pointerType === "mouse" || r.pointerType === "pen") {
				var a = r.button === 2;
				a ? t.trackedPointers[i].rightDown = !0 : t.trackedPointers[i].leftDown = !0, this.dispatchEvent(t, a ? "rightdown" : "mousedown", e);
			}
		}
	}, t.prototype.onPointerComplete = function(e, t, n) {
		var r = this.normalizeToPointerData(e), i = r.length, a = e.target;
		e.composedPath && e.composedPath().length > 0 && (a = e.composedPath()[0]);
		for (var o = a === this.interactionDOMElement ? "" : "outside", s = 0; s < i; s++) {
			var c = r[s], l = this.getInteractionDataForPointerId(c), u = this.configureInteractionEventForDOMEvent(this.eventData, c, l);
			if (u.data.originalEvent = e, this.processInteractive(u, this.lastObjectRendered, n, t || !o), this.emit(t ? "pointercancel" : "pointerup" + o, u), c.pointerType === "mouse" || c.pointerType === "pen") {
				var d = c.button === 2;
				this.emit(d ? "rightup" + o : "mouseup" + o, u);
			} else c.pointerType === "touch" && (this.emit(t ? "touchcancel" : "touchend" + o, u), this.releaseInteractionDataForPointerId(c.pointerId));
		}
	}, t.prototype.onPointerCancel = function(e) {
		this.supportsTouchEvents && e.pointerType === "touch" || this.onPointerComplete(e, !0, this.processPointerCancel);
	}, t.prototype.processPointerCancel = function(e, t) {
		var n = e.data, r = e.data.identifier;
		t.trackedPointers[r] !== void 0 && (delete t.trackedPointers[r], this.dispatchEvent(t, "pointercancel", e), n.pointerType === "touch" && this.dispatchEvent(t, "touchcancel", e));
	}, t.prototype.onPointerUp = function(e) {
		this.supportsTouchEvents && e.pointerType === "touch" || this.onPointerComplete(e, !1, this.processPointerUp);
	}, t.prototype.processPointerUp = function(e, t, n) {
		var r = e.data, i = e.data.identifier, a = t.trackedPointers[i], o = r.pointerType === "touch", s = r.pointerType === "mouse" || r.pointerType === "pen", c = !1;
		if (s) {
			var l = r.button === 2, u = na.FLAGS, d = l ? u.RIGHT_DOWN : u.LEFT_DOWN, f = a !== void 0 && a.flags & d;
			n ? (this.dispatchEvent(t, l ? "rightup" : "mouseup", e), f && (this.dispatchEvent(t, l ? "rightclick" : "click", e), c = !0)) : f && this.dispatchEvent(t, l ? "rightupoutside" : "mouseupoutside", e), a && (l ? a.rightDown = !1 : a.leftDown = !1);
		}
		n ? (this.dispatchEvent(t, "pointerup", e), o && this.dispatchEvent(t, "touchend", e), a && ((!s || c) && this.dispatchEvent(t, "pointertap", e), o && (this.dispatchEvent(t, "tap", e), a.over = !1))) : a && (this.dispatchEvent(t, "pointerupoutside", e), o && this.dispatchEvent(t, "touchendoutside", e)), a && a.none && delete t.trackedPointers[i];
	}, t.prototype.onPointerMove = function(e) {
		if (!(this.supportsTouchEvents && e.pointerType === "touch")) {
			var t = this.normalizeToPointerData(e);
			(t[0].pointerType === "mouse" || t[0].pointerType === "pen") && (this._didMove = !0, this.cursor = null);
			for (var n = t.length, r = 0; r < n; r++) {
				var i = t[r], a = this.getInteractionDataForPointerId(i), o = this.configureInteractionEventForDOMEvent(this.eventData, i, a);
				o.data.originalEvent = e, this.processInteractive(o, this.lastObjectRendered, this.processPointerMove, !0), this.emit("pointermove", o), i.pointerType === "touch" && this.emit("touchmove", o), (i.pointerType === "mouse" || i.pointerType === "pen") && this.emit("mousemove", o);
			}
			t[0].pointerType === "mouse" && this.setCursorMode(this.cursor);
		}
	}, t.prototype.processPointerMove = function(e, t, n) {
		var r = e.data, i = r.pointerType === "touch", a = r.pointerType === "mouse" || r.pointerType === "pen";
		a && this.processPointerOverOut(e, t, n), (!this.moveWhenInside || n) && (this.dispatchEvent(t, "pointermove", e), i && this.dispatchEvent(t, "touchmove", e), a && this.dispatchEvent(t, "mousemove", e));
	}, t.prototype.onPointerOut = function(e) {
		if (!(this.supportsTouchEvents && e.pointerType === "touch")) {
			var t = this.normalizeToPointerData(e)[0];
			t.pointerType === "mouse" && (this.mouseOverRenderer = !1, this.setCursorMode(null));
			var n = this.getInteractionDataForPointerId(t), r = this.configureInteractionEventForDOMEvent(this.eventData, t, n);
			r.data.originalEvent = t, this.processInteractive(r, this.lastObjectRendered, this.processPointerOverOut, !1), this.emit("pointerout", r), t.pointerType === "mouse" || t.pointerType === "pen" ? this.emit("mouseout", r) : this.releaseInteractionDataForPointerId(n.identifier);
		}
	}, t.prototype.processPointerOverOut = function(e, t, n) {
		var r = e.data, i = e.data.identifier, a = r.pointerType === "mouse" || r.pointerType === "pen", o = t.trackedPointers[i];
		n && !o && (o = t.trackedPointers[i] = new na(i)), o !== void 0 && (n && this.mouseOverRenderer ? (o.over || (o.over = !0, this.delayDispatchEvent(t, "pointerover", e), a && this.delayDispatchEvent(t, "mouseover", e)), a && this.cursor === null && (this.cursor = t.cursor)) : o.over && (o.over = !1, this.dispatchEvent(t, "pointerout", this.eventData), a && this.dispatchEvent(t, "mouseout", e), o.none && delete t.trackedPointers[i]));
	}, t.prototype.onPointerOver = function(e) {
		if (!(this.supportsTouchEvents && e.pointerType === "touch")) {
			var t = this.normalizeToPointerData(e)[0], n = this.getInteractionDataForPointerId(t), r = this.configureInteractionEventForDOMEvent(this.eventData, t, n);
			r.data.originalEvent = t, t.pointerType === "mouse" && (this.mouseOverRenderer = !0), this.emit("pointerover", r), (t.pointerType === "mouse" || t.pointerType === "pen") && this.emit("mouseover", r);
		}
	}, t.prototype.getInteractionDataForPointerId = function(e) {
		var t = e.pointerId, n;
		return t === ia || e.pointerType === "mouse" ? n = this.mouse : this.activeInteractionData[t] ? n = this.activeInteractionData[t] : (n = this.interactionDataPool.pop() || new Qi(), n.identifier = t, this.activeInteractionData[t] = n), n.copyEvent(e), n;
	}, t.prototype.releaseInteractionDataForPointerId = function(e) {
		var t = this.activeInteractionData[e];
		t && (delete this.activeInteractionData[e], t.reset(), this.interactionDataPool.push(t));
	}, t.prototype.configureInteractionEventForDOMEvent = function(e, t, n) {
		return e.data = n, this.mapPositionToPoint(n.global, t.clientX, t.clientY), t.pointerType === "touch" && (t.globalX = n.global.x, t.globalY = n.global.y), n.originalEvent = t, e.reset(), e;
	}, t.prototype.normalizeToPointerData = function(e) {
		var t = [];
		if (this.supportsTouchEvents && e instanceof TouchEvent) for (var n = 0, r = e.changedTouches.length; n < r; n++) {
			var i = e.changedTouches[n];
			i.button === void 0 && (i.button = +!!e.touches.length), i.buttons === void 0 && (i.buttons = +!!e.touches.length), i.isPrimary === void 0 && (i.isPrimary = e.touches.length === 1 && e.type === "touchstart"), i.width === void 0 && (i.width = i.radiusX || 1), i.height === void 0 && (i.height = i.radiusY || 1), i.tiltX === void 0 && (i.tiltX = 0), i.tiltY === void 0 && (i.tiltY = 0), i.pointerType === void 0 && (i.pointerType = "touch"), i.pointerId === void 0 && (i.pointerId = i.identifier || 0), i.pressure === void 0 && (i.pressure = i.force || .5), i.twist === void 0 && (i.twist = 0), i.tangentialPressure === void 0 && (i.tangentialPressure = 0), i.layerX === void 0 && (i.layerX = i.offsetX = i.clientX), i.layerY === void 0 && (i.layerY = i.offsetY = i.clientY), i.isNormalized = !0, t.push(i);
		}
		else if (!globalThis.MouseEvent || e instanceof MouseEvent && (!this.supportsPointerEvents || !(e instanceof globalThis.PointerEvent))) {
			var a = e;
			a.isPrimary === void 0 && (a.isPrimary = !0), a.width === void 0 && (a.width = 1), a.height === void 0 && (a.height = 1), a.tiltX === void 0 && (a.tiltX = 0), a.tiltY === void 0 && (a.tiltY = 0), a.pointerType === void 0 && (a.pointerType = "mouse"), a.pointerId === void 0 && (a.pointerId = ia), a.pressure === void 0 && (a.pressure = .5), a.twist === void 0 && (a.twist = 0), a.tangentialPressure === void 0 && (a.tangentialPressure = 0), a.isNormalized = !0, t.push(a);
		} else t.push(e);
		return t;
	}, t.prototype.destroy = function() {
		this.removeEvents(), this.removeTickerListener(), this.removeAllListeners(), this.renderer = null, this.mouse = null, this.eventData = null, this.interactionDOMElement = null, this.onPointerDown = null, this.processPointerDown = null, this.onPointerUp = null, this.processPointerUp = null, this.onPointerCancel = null, this.processPointerCancel = null, this.onPointerMove = null, this.processPointerMove = null, this.onPointerOut = null, this.processPointerOverOut = null, this.onPointerOver = null, this.search = null;
	}, t.extension = {
		name: "interaction",
		type: [q.RendererPlugin, q.CanvasRendererPlugin]
	}, t;
}(Ae.default), sa = new U(), ca = 4, la = function() {
	function e(e) {
		this.renderer = e;
	}
	return e.prototype.image = function(e, t, n) {
		var r = new Image();
		return r.src = this.base64(e, t, n), r;
	}, e.prototype.base64 = function(e, t, n) {
		return this.canvas(e).toDataURL(t, n);
	}, e.prototype.canvas = function(t, n) {
		var r = this._rawPixels(t, n), i = r.pixels, a = r.width, o = r.height, s = r.flipY, c = new ut(a, o, 1), l = c.context.getImageData(0, 0, a, o);
		if (e.arrayPostDivide(i, l.data), c.context.putImageData(l, 0, 0), s) {
			var u = new ut(c.width, c.height, 1);
			u.context.scale(1, -1), u.context.drawImage(c.canvas, 0, -o), c.destroy(), c = u;
		}
		return c.canvas;
	}, e.prototype.pixels = function(t, n) {
		var r = this._rawPixels(t, n).pixels;
		return e.arrayPostDivide(r, r), r;
	}, e.prototype._rawPixels = function(e, t) {
		var n = this.renderer, r, i = !1, a, o = !1;
		if (e) if (e instanceof yn) a = e;
		else {
			var s = n.context.webGLVersion >= 2 ? n.multisample : L.NONE;
			if (a = this.renderer.generateTexture(e, { multisample: s }), s !== L.NONE) {
				var c = yn.create({
					width: a.width,
					height: a.height
				});
				n.framebuffer.bind(a.framebuffer), n.framebuffer.blit(c.framebuffer), n.framebuffer.bind(null), a.destroy(!0), a = c;
			}
			o = !0;
		}
		a ? (r = a.baseTexture.resolution, t ??= a.frame, i = !1, n.renderTexture.bind(a)) : (r = n.resolution, t || (t = sa, t.width = n.width, t.height = n.height), i = !0, n.renderTexture.bind(null));
		var l = Math.round(t.width * r), u = Math.round(t.height * r), d = new Uint8Array(ca * l * u), f = n.gl;
		return f.readPixels(Math.round(t.x * r), Math.round(t.y * r), l, u, f.RGBA, f.UNSIGNED_BYTE, d), o && a.destroy(!0), {
			pixels: d,
			width: l,
			height: u,
			flipY: i
		};
	}, e.prototype.destroy = function() {
		this.renderer = null;
	}, e.arrayPostDivide = function(e, t) {
		for (var n = 0; n < e.length; n += 4) {
			var r = t[n + 3] = e[n + 3];
			r === 0 ? (t[n] = e[n], t[n + 1] = e[n + 1], t[n + 2] = e[n + 2]) : (t[n] = Math.round(Math.min(e[n] * 255 / r, 255)), t[n + 1] = Math.round(Math.min(e[n + 1] * 255 / r, 255)), t[n + 2] = Math.round(Math.min(e[n + 2] * 255 / r, 255)));
		}
	}, e.extension = {
		name: "extract",
		type: q.RendererPlugin
	}, e;
}(), ua = function() {
	function e(e, t, n) {
		t === void 0 && (t = !1), this._fn = e, this._once = t, this._thisArg = n, this._next = this._prev = this._owner = null;
	}
	return e.prototype.detach = function() {
		return this._owner === null ? !1 : (this._owner.detach(this), !0);
	}, e;
}();
function da(e, t) {
	return e._head ? (e._tail._next = t, t._prev = e._tail, e._tail = t) : (e._head = t, e._tail = t), t._owner = e, t;
}
var fa = function() {
	function e() {
		this._head = this._tail = void 0;
	}
	return e.prototype.handlers = function(e) {
		e === void 0 && (e = !1);
		var t = this._head;
		if (e) return !!t;
		for (var n = []; t;) n.push(t), t = t._next;
		return n;
	}, e.prototype.has = function(e) {
		if (!(e instanceof ua)) throw Error("MiniSignal#has(): First arg must be a SignalBinding object.");
		return e._owner === this;
	}, e.prototype.dispatch = function() {
		for (var e = arguments, t = [], n = 0; n < arguments.length; n++) t[n] = e[n];
		var r = this._head;
		if (!r) return !1;
		for (; r;) r._once && this.detach(r), r._fn.apply(r._thisArg, t), r = r._next;
		return !0;
	}, e.prototype.add = function(e, t) {
		if (t === void 0 && (t = null), typeof e != "function") throw Error("MiniSignal#add(): First arg must be a Function.");
		return da(this, new ua(e, !1, t));
	}, e.prototype.once = function(e, t) {
		if (t === void 0 && (t = null), typeof e != "function") throw Error("MiniSignal#once(): First arg must be a Function.");
		return da(this, new ua(e, !0, t));
	}, e.prototype.detach = function(e) {
		if (!(e instanceof ua)) throw Error("MiniSignal#detach(): First arg must be a SignalBinding object.");
		return e._owner === this ? (e._prev && (e._prev._next = e._next), e._next && (e._next._prev = e._prev), e === this._head ? (this._head = e._next, e._next === null && (this._tail = null)) : e === this._tail && (this._tail = e._prev, this._tail._next = null), e._owner = null, this) : this;
	}, e.prototype.detachAll = function() {
		var e = this._head;
		if (!e) return this;
		for (this._head = this._tail = null; e;) e._owner = null, e = e._next;
		return this;
	}, e;
}();
function pa(e, t) {
	t ||= {};
	for (var n = {
		key: [
			"source",
			"protocol",
			"authority",
			"userInfo",
			"user",
			"password",
			"host",
			"port",
			"relative",
			"path",
			"directory",
			"file",
			"query",
			"anchor"
		],
		q: {
			name: "queryKey",
			parser: /(?:^|&)([^&=]*)=?([^&]*)/g
		},
		parser: {
			strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
			loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
		}
	}, r = n.parser[t.strictMode ? "strict" : "loose"].exec(e), i = {}, a = 14; a--;) i[n.key[a]] = r[a] || "";
	return i[n.q.name] = {}, i[n.key[12]].replace(n.q.parser, function(e, t, r) {
		t && (i[n.q.name][t] = r);
	}), i;
}
var ma, ha = null, ga = 0, _a = 200, va = 204, ya = 1223, ba = 2;
function xa() {}
function Sa(e, t, n) {
	t && t.indexOf(".") === 0 && (t = t.substring(1)), t && (e[t] = n);
}
function Ca(e) {
	return e.toString().replace("object ", "");
}
var Z = function() {
	function e(t, n, r) {
		if (this._dequeue = xa, this._onLoadBinding = null, this._elementTimer = 0, this._boundComplete = null, this._boundOnError = null, this._boundOnProgress = null, this._boundOnTimeout = null, this._boundXhrOnError = null, this._boundXhrOnTimeout = null, this._boundXhrOnAbort = null, this._boundXhrOnLoad = null, typeof t != "string" || typeof n != "string") throw Error("Both name and url are required for constructing a resource.");
		r ||= {}, this._flags = 0, this._setFlag(e.STATUS_FLAGS.DATA_URL, n.indexOf("data:") === 0), this.name = t, this.url = n, this.extension = this._getExtension(), this.data = null, this.crossOrigin = r.crossOrigin === !0 ? "anonymous" : r.crossOrigin, this.timeout = r.timeout || 0, this.loadType = r.loadType || this._determineLoadType(), this.xhrType = r.xhrType, this.metadata = r.metadata || {}, this.error = null, this.xhr = null, this.children = [], this.type = e.TYPE.UNKNOWN, this.progressChunk = 0, this._dequeue = xa, this._onLoadBinding = null, this._elementTimer = 0, this._boundComplete = this.complete.bind(this), this._boundOnError = this._onError.bind(this), this._boundOnProgress = this._onProgress.bind(this), this._boundOnTimeout = this._onTimeout.bind(this), this._boundXhrOnError = this._xhrOnError.bind(this), this._boundXhrOnTimeout = this._xhrOnTimeout.bind(this), this._boundXhrOnAbort = this._xhrOnAbort.bind(this), this._boundXhrOnLoad = this._xhrOnLoad.bind(this), this.onStart = new fa(), this.onProgress = new fa(), this.onComplete = new fa(), this.onAfterMiddleware = new fa();
	}
	return e.setExtensionLoadType = function(t, n) {
		Sa(e._loadTypeMap, t, n);
	}, e.setExtensionXhrType = function(t, n) {
		Sa(e._xhrTypeMap, t, n);
	}, Object.defineProperty(e.prototype, "isDataUrl", {
		get: function() {
			return this._hasFlag(e.STATUS_FLAGS.DATA_URL);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "isComplete", {
		get: function() {
			return this._hasFlag(e.STATUS_FLAGS.COMPLETE);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "isLoading", {
		get: function() {
			return this._hasFlag(e.STATUS_FLAGS.LOADING);
		},
		enumerable: !1,
		configurable: !0
	}), e.prototype.complete = function() {
		this._clearEvents(), this._finish();
	}, e.prototype.abort = function(t) {
		if (!this.error) {
			if (this.error = Error(t), this._clearEvents(), this.xhr) this.xhr.abort();
			else if (this.xdr) this.xdr.abort();
			else if (this.data) if (this.data.src) this.data.src = e.EMPTY_GIF;
			else for (; this.data.firstChild;) this.data.removeChild(this.data.firstChild);
			this._finish();
		}
	}, e.prototype.load = function(t) {
		var n = this;
		if (!this.isLoading) {
			if (this.isComplete) {
				t && setTimeout(function() {
					return t(n);
				}, 1);
				return;
			} else t && this.onComplete.once(t);
			switch (this._setFlag(e.STATUS_FLAGS.LOADING, !0), this.onStart.dispatch(this), (this.crossOrigin === !1 || typeof this.crossOrigin != "string") && (this.crossOrigin = this._determineCrossOrigin(this.url)), this.loadType) {
				case e.LOAD_TYPE.IMAGE:
					this.type = e.TYPE.IMAGE, this._loadElement("image");
					break;
				case e.LOAD_TYPE.AUDIO:
					this.type = e.TYPE.AUDIO, this._loadSourceElement("audio");
					break;
				case e.LOAD_TYPE.VIDEO:
					this.type = e.TYPE.VIDEO, this._loadSourceElement("video");
					break;
				case e.LOAD_TYPE.XHR:
				default:
					ma === void 0 && (ma = !!(globalThis.XDomainRequest && !("withCredentials" in new XMLHttpRequest()))), ma && this.crossOrigin ? this._loadXdr() : this._loadXhr();
					break;
			}
		}
	}, e.prototype._hasFlag = function(e) {
		return (this._flags & e) !== 0;
	}, e.prototype._setFlag = function(e, t) {
		this._flags = t ? this._flags | e : this._flags & ~e;
	}, e.prototype._clearEvents = function() {
		clearTimeout(this._elementTimer), this.data && this.data.removeEventListener && (this.data.removeEventListener("error", this._boundOnError, !1), this.data.removeEventListener("load", this._boundComplete, !1), this.data.removeEventListener("progress", this._boundOnProgress, !1), this.data.removeEventListener("canplaythrough", this._boundComplete, !1)), this.xhr && (this.xhr.removeEventListener ? (this.xhr.removeEventListener("error", this._boundXhrOnError, !1), this.xhr.removeEventListener("timeout", this._boundXhrOnTimeout, !1), this.xhr.removeEventListener("abort", this._boundXhrOnAbort, !1), this.xhr.removeEventListener("progress", this._boundOnProgress, !1), this.xhr.removeEventListener("load", this._boundXhrOnLoad, !1)) : (this.xhr.onerror = null, this.xhr.ontimeout = null, this.xhr.onprogress = null, this.xhr.onload = null));
	}, e.prototype._finish = function() {
		if (this.isComplete) throw Error("Complete called again for an already completed resource.");
		this._setFlag(e.STATUS_FLAGS.COMPLETE, !0), this._setFlag(e.STATUS_FLAGS.LOADING, !1), this.onComplete.dispatch(this);
	}, e.prototype._loadElement = function(e) {
		this.metadata.loadElement ? this.data = this.metadata.loadElement : e === "image" && globalThis.Image !== void 0 ? this.data = new Image() : this.data = document.createElement(e), this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), this.metadata.skipSource || (this.data.src = this.url), this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.timeout && (this._elementTimer = setTimeout(this._boundOnTimeout, this.timeout));
	}, e.prototype._loadSourceElement = function(e) {
		if (this.metadata.loadElement ? this.data = this.metadata.loadElement : e === "audio" && globalThis.Audio !== void 0 ? this.data = new Audio() : this.data = document.createElement(e), this.data === null) {
			this.abort("Unsupported element: " + e);
			return;
		}
		if (this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), !this.metadata.skipSource) if (navigator.isCocoonJS) this.data.src = Array.isArray(this.url) ? this.url[0] : this.url;
		else if (Array.isArray(this.url)) for (var t = this.metadata.mimeType, n = 0; n < this.url.length; ++n) this.data.appendChild(this._createSource(e, this.url[n], Array.isArray(t) ? t[n] : t));
		else {
			var t = this.metadata.mimeType;
			this.data.appendChild(this._createSource(e, this.url, Array.isArray(t) ? t[0] : t));
		}
		this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.data.addEventListener("canplaythrough", this._boundComplete, !1), this.data.load(), this.timeout && (this._elementTimer = setTimeout(this._boundOnTimeout, this.timeout));
	}, e.prototype._loadXhr = function() {
		typeof this.xhrType != "string" && (this.xhrType = this._determineXhrType());
		var t = this.xhr = new XMLHttpRequest();
		this.crossOrigin === "use-credentials" && (t.withCredentials = !0), t.open("GET", this.url, !0), t.timeout = this.timeout, this.xhrType === e.XHR_RESPONSE_TYPE.JSON || this.xhrType === e.XHR_RESPONSE_TYPE.DOCUMENT ? t.responseType = e.XHR_RESPONSE_TYPE.TEXT : t.responseType = this.xhrType, t.addEventListener("error", this._boundXhrOnError, !1), t.addEventListener("timeout", this._boundXhrOnTimeout, !1), t.addEventListener("abort", this._boundXhrOnAbort, !1), t.addEventListener("progress", this._boundOnProgress, !1), t.addEventListener("load", this._boundXhrOnLoad, !1), t.send();
	}, e.prototype._loadXdr = function() {
		typeof this.xhrType != "string" && (this.xhrType = this._determineXhrType());
		var e = this.xhr = new globalThis.XDomainRequest();
		e.timeout = this.timeout || 5e3, e.onerror = this._boundXhrOnError, e.ontimeout = this._boundXhrOnTimeout, e.onprogress = this._boundOnProgress, e.onload = this._boundXhrOnLoad, e.open("GET", this.url, !0), setTimeout(function() {
			return e.send();
		}, 1);
	}, e.prototype._createSource = function(e, t, n) {
		n ||= e + "/" + this._getExtension(t);
		var r = document.createElement("source");
		return r.src = t, r.type = n, r;
	}, e.prototype._onError = function(e) {
		this.abort("Failed to load element using: " + e.target.nodeName);
	}, e.prototype._onProgress = function(e) {
		e && e.lengthComputable && this.onProgress.dispatch(this, e.loaded / e.total);
	}, e.prototype._onTimeout = function() {
		this.abort("Load timed out.");
	}, e.prototype._xhrOnError = function() {
		var e = this.xhr;
		this.abort(Ca(e) + " Request failed. Status: " + e.status + ", text: \"" + e.statusText + "\"");
	}, e.prototype._xhrOnTimeout = function() {
		var e = this.xhr;
		this.abort(Ca(e) + " Request timed out.");
	}, e.prototype._xhrOnAbort = function() {
		var e = this.xhr;
		this.abort(Ca(e) + " Request was aborted by the user.");
	}, e.prototype._xhrOnLoad = function() {
		var t = this.xhr, n = "", r = t.status === void 0 ? _a : t.status;
		if ((t.responseType === "" || t.responseType === "text" || t.responseType === void 0) && (n = t.responseText), r === ga && (n.length > 0 || t.responseType === e.XHR_RESPONSE_TYPE.BUFFER) ? r = _a : r === ya && (r = va), (r / 100 | 0) === ba) if (this.xhrType === e.XHR_RESPONSE_TYPE.TEXT) this.data = n, this.type = e.TYPE.TEXT;
		else if (this.xhrType === e.XHR_RESPONSE_TYPE.JSON) try {
			this.data = JSON.parse(n), this.type = e.TYPE.JSON;
		} catch (e) {
			this.abort("Error trying to parse loaded json: " + e);
			return;
		}
		else if (this.xhrType === e.XHR_RESPONSE_TYPE.DOCUMENT) try {
			if (globalThis.DOMParser) {
				var i = new DOMParser();
				this.data = i.parseFromString(n, "text/xml");
			} else {
				var a = document.createElement("div");
				a.innerHTML = n, this.data = a;
			}
			this.type = e.TYPE.XML;
		} catch (e) {
			this.abort("Error trying to parse loaded xml: " + e);
			return;
		}
		else this.data = t.response || n;
		else {
			this.abort("[" + t.status + "] " + t.statusText + ": " + t.responseURL);
			return;
		}
		this.complete();
	}, e.prototype._determineCrossOrigin = function(e, t) {
		if (e.indexOf("data:") === 0) return "";
		if (globalThis.origin !== globalThis.location.origin) return "anonymous";
		t ||= globalThis.location, ha ||= document.createElement("a"), ha.href = e;
		var n = pa(ha.href, { strictMode: !0 }), r = !n.port && t.port === "" || n.port === t.port, i = n.protocol ? n.protocol + ":" : "";
		return n.host !== t.hostname || !r || i !== t.protocol ? "anonymous" : "";
	}, e.prototype._determineXhrType = function() {
		return e._xhrTypeMap[this.extension] || e.XHR_RESPONSE_TYPE.TEXT;
	}, e.prototype._determineLoadType = function() {
		return e._loadTypeMap[this.extension] || e.LOAD_TYPE.XHR;
	}, e.prototype._getExtension = function(e) {
		e === void 0 && (e = this.url);
		var t = "";
		if (this.isDataUrl) {
			var n = e.indexOf("/");
			t = e.substring(n + 1, e.indexOf(";", n));
		} else {
			var r = e.indexOf("?"), i = e.indexOf("#"), a = Math.min(r > -1 ? r : e.length, i > -1 ? i : e.length);
			e = e.substring(0, a), t = e.substring(e.lastIndexOf(".") + 1);
		}
		return t.toLowerCase();
	}, e.prototype._getMimeFromXhrType = function(t) {
		switch (t) {
			case e.XHR_RESPONSE_TYPE.BUFFER: return "application/octet-binary";
			case e.XHR_RESPONSE_TYPE.BLOB: return "application/blob";
			case e.XHR_RESPONSE_TYPE.DOCUMENT: return "application/xml";
			case e.XHR_RESPONSE_TYPE.JSON: return "application/json";
			case e.XHR_RESPONSE_TYPE.DEFAULT:
			case e.XHR_RESPONSE_TYPE.TEXT:
			default: return "text/plain";
		}
	}, e;
}();
(function(e) {
	(function(e) {
		e[e.NONE = 0] = "NONE", e[e.DATA_URL = 1] = "DATA_URL", e[e.COMPLETE = 2] = "COMPLETE", e[e.LOADING = 4] = "LOADING";
	})(e.STATUS_FLAGS ||= {}), (function(e) {
		e[e.UNKNOWN = 0] = "UNKNOWN", e[e.JSON = 1] = "JSON", e[e.XML = 2] = "XML", e[e.IMAGE = 3] = "IMAGE", e[e.AUDIO = 4] = "AUDIO", e[e.VIDEO = 5] = "VIDEO", e[e.TEXT = 6] = "TEXT";
	})(e.TYPE ||= {}), (function(e) {
		e[e.XHR = 1] = "XHR", e[e.IMAGE = 2] = "IMAGE", e[e.AUDIO = 3] = "AUDIO", e[e.VIDEO = 4] = "VIDEO";
	})(e.LOAD_TYPE ||= {}), (function(e) {
		e.DEFAULT = "text", e.BUFFER = "arraybuffer", e.BLOB = "blob", e.DOCUMENT = "document", e.JSON = "json", e.TEXT = "text";
	})(e.XHR_RESPONSE_TYPE ||= {}), e._loadTypeMap = {
		gif: e.LOAD_TYPE.IMAGE,
		png: e.LOAD_TYPE.IMAGE,
		bmp: e.LOAD_TYPE.IMAGE,
		jpg: e.LOAD_TYPE.IMAGE,
		jpeg: e.LOAD_TYPE.IMAGE,
		tif: e.LOAD_TYPE.IMAGE,
		tiff: e.LOAD_TYPE.IMAGE,
		webp: e.LOAD_TYPE.IMAGE,
		tga: e.LOAD_TYPE.IMAGE,
		avif: e.LOAD_TYPE.IMAGE,
		svg: e.LOAD_TYPE.IMAGE,
		"svg+xml": e.LOAD_TYPE.IMAGE,
		mp3: e.LOAD_TYPE.AUDIO,
		ogg: e.LOAD_TYPE.AUDIO,
		wav: e.LOAD_TYPE.AUDIO,
		mp4: e.LOAD_TYPE.VIDEO,
		webm: e.LOAD_TYPE.VIDEO
	}, e._xhrTypeMap = {
		xhtml: e.XHR_RESPONSE_TYPE.DOCUMENT,
		html: e.XHR_RESPONSE_TYPE.DOCUMENT,
		htm: e.XHR_RESPONSE_TYPE.DOCUMENT,
		xml: e.XHR_RESPONSE_TYPE.DOCUMENT,
		tmx: e.XHR_RESPONSE_TYPE.DOCUMENT,
		svg: e.XHR_RESPONSE_TYPE.DOCUMENT,
		tsx: e.XHR_RESPONSE_TYPE.DOCUMENT,
		gif: e.XHR_RESPONSE_TYPE.BLOB,
		png: e.XHR_RESPONSE_TYPE.BLOB,
		bmp: e.XHR_RESPONSE_TYPE.BLOB,
		jpg: e.XHR_RESPONSE_TYPE.BLOB,
		jpeg: e.XHR_RESPONSE_TYPE.BLOB,
		tif: e.XHR_RESPONSE_TYPE.BLOB,
		tiff: e.XHR_RESPONSE_TYPE.BLOB,
		webp: e.XHR_RESPONSE_TYPE.BLOB,
		tga: e.XHR_RESPONSE_TYPE.BLOB,
		avif: e.XHR_RESPONSE_TYPE.BLOB,
		json: e.XHR_RESPONSE_TYPE.JSON,
		text: e.XHR_RESPONSE_TYPE.TEXT,
		txt: e.XHR_RESPONSE_TYPE.TEXT,
		ttf: e.XHR_RESPONSE_TYPE.BUFFER,
		otf: e.XHR_RESPONSE_TYPE.BUFFER
	}, e.EMPTY_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
})(Z ||= {});
function wa() {}
function Ta(e) {
	return function() {
		for (var t = arguments, n = [], r = 0; r < arguments.length; r++) n[r] = t[r];
		if (e === null) throw Error("Callback was already called.");
		var i = e;
		e = null, i.apply(this, n);
	};
}
var Ea = function() {
	function e(e, t) {
		this.data = e, this.callback = t;
	}
	return e;
}(), Da = function() {
	function e(e, t) {
		var n = this;
		if (t === void 0 && (t = 1), this.workers = 0, this.saturated = wa, this.unsaturated = wa, this.empty = wa, this.drain = wa, this.error = wa, this.started = !1, this.paused = !1, this._tasks = [], this._insert = function(e, t, r) {
			if (r && typeof r != "function") throw Error("task callback must be a function");
			if (n.started = !0, e == null && n.idle()) {
				setTimeout(function() {
					return n.drain();
				}, 1);
				return;
			}
			var i = new Ea(e, typeof r == "function" ? r : wa);
			t ? n._tasks.unshift(i) : n._tasks.push(i), setTimeout(n.process, 1);
		}, this.process = function() {
			for (; !n.paused && n.workers < n.concurrency && n._tasks.length;) {
				var e = n._tasks.shift();
				n._tasks.length === 0 && n.empty(), n.workers += 1, n.workers === n.concurrency && n.saturated(), n._worker(e.data, Ta(n._next(e)));
			}
		}, this._worker = e, t === 0) throw Error("Concurrency must not be zero");
		this.concurrency = t, this.buffer = t / 4;
	}
	return e.prototype._next = function(e) {
		var t = this;
		return function() {
			for (var n = arguments, r = [], i = 0; i < arguments.length; i++) r[i] = n[i];
			--t.workers, e.callback.apply(e, r), r[0] != null && t.error(r[0], e.data), t.workers <= t.concurrency - t.buffer && t.unsaturated(), t.idle() && t.drain(), t.process();
		};
	}, e.prototype.push = function(e, t) {
		this._insert(e, !1, t);
	}, e.prototype.kill = function() {
		this.workers = 0, this.drain = wa, this.started = !1, this._tasks = [];
	}, e.prototype.unshift = function(e, t) {
		this._insert(e, !0, t);
	}, e.prototype.length = function() {
		return this._tasks.length;
	}, e.prototype.running = function() {
		return this.workers;
	}, e.prototype.idle = function() {
		return this._tasks.length + this.workers === 0;
	}, e.prototype.pause = function() {
		this.paused !== !0 && (this.paused = !0);
	}, e.prototype.resume = function() {
		if (this.paused !== !1) {
			this.paused = !1;
			for (var e = 1; e <= this.concurrency; e++) this.process();
		}
	}, e.eachSeries = function(e, t, n, r) {
		var i = 0, a = e.length;
		function o(s) {
			if (s || i === a) {
				n && n(s);
				return;
			}
			r ? setTimeout(function() {
				t(e[i++], o);
			}, 1) : t(e[i++], o);
		}
		o();
	}, e.queue = function(t, n) {
		return new e(t, n);
	}, e;
}(), Oa = 100, ka = /(#[\w-]+)?$/, Aa = function() {
	function e(t, n) {
		var r = this;
		t === void 0 && (t = ""), n === void 0 && (n = 10), this.progress = 0, this.loading = !1, this.defaultQueryString = "", this._beforeMiddleware = [], this._afterMiddleware = [], this._resourcesParsing = [], this._boundLoadResource = function(e, t) {
			return r._loadResource(e, t);
		}, this.resources = {}, this.baseUrl = t, this._beforeMiddleware = [], this._afterMiddleware = [], this._resourcesParsing = [], this._boundLoadResource = function(e, t) {
			return r._loadResource(e, t);
		}, this._queue = Da.queue(this._boundLoadResource, n), this._queue.pause(), this.resources = {}, this.onProgress = new fa(), this.onError = new fa(), this.onLoad = new fa(), this.onStart = new fa(), this.onComplete = new fa();
		for (var i = 0; i < e._plugins.length; ++i) {
			var a = e._plugins[i], o = a.pre, s = a.use;
			o && this.pre(o), s && this.use(s);
		}
		this._protected = !1;
	}
	return e.prototype._add = function(e, t, n, r) {
		if (this.loading && (!n || !n.parentResource)) throw Error("Cannot add resources while the loader is running.");
		if (this.resources[e]) throw Error("Resource named \"" + e + "\" already exists.");
		if (t = this._prepareUrl(t), this.resources[e] = new Z(e, t, n), typeof r == "function" && this.resources[e].onAfterMiddleware.once(r), this.loading) {
			for (var i = n.parentResource, a = [], o = 0; o < i.children.length; ++o) i.children[o].isComplete || a.push(i.children[o]);
			var s = i.progressChunk * (a.length + 1) / (a.length + 2);
			i.children.push(this.resources[e]), i.progressChunk = s;
			for (var o = 0; o < a.length; ++o) a[o].progressChunk = s;
			this.resources[e].progressChunk = s;
		}
		return this._queue.push(this.resources[e]), this;
	}, e.prototype.pre = function(e) {
		return this._beforeMiddleware.push(e), this;
	}, e.prototype.use = function(e) {
		return this._afterMiddleware.push(e), this;
	}, e.prototype.reset = function() {
		for (var e in this.progress = 0, this.loading = !1, this._queue.kill(), this._queue.pause(), this.resources) {
			var t = this.resources[e];
			t._onLoadBinding && t._onLoadBinding.detach(), t.isLoading && t.abort("loader reset");
		}
		return this.resources = {}, this;
	}, e.prototype.load = function(e) {
		if (at("6.5.0", "@pixi/loaders is being replaced with @pixi/assets in the next major release."), typeof e == "function" && this.onComplete.once(e), this.loading) return this;
		if (this._queue.idle()) this._onStart(), this._onComplete();
		else {
			for (var t = Oa / this._queue._tasks.length, n = 0; n < this._queue._tasks.length; ++n) this._queue._tasks[n].data.progressChunk = t;
			this._onStart(), this._queue.resume();
		}
		return this;
	}, Object.defineProperty(e.prototype, "concurrency", {
		get: function() {
			return this._queue.concurrency;
		},
		set: function(e) {
			this._queue.concurrency = e;
		},
		enumerable: !1,
		configurable: !0
	}), e.prototype._prepareUrl = function(e) {
		var t = pa(e, { strictMode: !0 }), n = t.protocol || !t.path || e.indexOf("//") === 0 ? e : this.baseUrl.length && this.baseUrl.lastIndexOf("/") !== this.baseUrl.length - 1 && e.charAt(0) !== "/" ? this.baseUrl + "/" + e : this.baseUrl + e;
		if (this.defaultQueryString) {
			var r = ka.exec(n)[0];
			n = n.slice(0, n.length - r.length), n.indexOf("?") === -1 ? n += "?" + this.defaultQueryString : n += "&" + this.defaultQueryString, n += r;
		}
		return n;
	}, e.prototype._loadResource = function(e, t) {
		var n = this;
		e._dequeue = t, Da.eachSeries(this._beforeMiddleware, function(t, r) {
			t.call(n, e, function() {
				r(e.isComplete ? {} : null);
			});
		}, function() {
			e.isComplete ? n._onLoad(e) : (e._onLoadBinding = e.onComplete.once(n._onLoad, n), e.load());
		}, !0);
	}, e.prototype._onStart = function() {
		this.progress = 0, this.loading = !0, this.onStart.dispatch(this);
	}, e.prototype._onComplete = function() {
		this.progress = Oa, this.loading = !1, this.onComplete.dispatch(this, this.resources);
	}, e.prototype._onLoad = function(e) {
		var t = this;
		e._onLoadBinding = null, this._resourcesParsing.push(e), e._dequeue(), Da.eachSeries(this._afterMiddleware, function(n, r) {
			n.call(t, e, r);
		}, function() {
			e.onAfterMiddleware.dispatch(e), t.progress = Math.min(Oa, t.progress + e.progressChunk), t.onProgress.dispatch(t, e), e.error ? t.onError.dispatch(e.error, t, e) : t.onLoad.dispatch(t, e), t._resourcesParsing.splice(t._resourcesParsing.indexOf(e), 1), t._queue.idle() && t._resourcesParsing.length === 0 && t._onComplete();
		}, !0);
	}, e.prototype.destroy = function() {
		this._protected || this.reset();
	}, Object.defineProperty(e, "shared", {
		get: function() {
			var t = e._shared;
			return t || (t = new e(), t._protected = !0, e._shared = t), t;
		},
		enumerable: !1,
		configurable: !0
	}), e.registerPlugin = function(t) {
		return at("6.5.0", "Loader.registerPlugin() is deprecated, use extensions.add() instead."), Ht.add({
			type: q.Loader,
			ref: t
		}), e;
	}, e._plugins = [], e;
}();
Ht.handleByList(q.Loader, Aa._plugins), Aa.prototype.add = function(e, t, n, r) {
	if (Array.isArray(e)) {
		for (var i = 0; i < e.length; ++i) this.add(e[i]);
		return this;
	}
	if (typeof e == "object" && (n = e, r = t || n.callback || n.onComplete, t = n.url, e = n.name || n.key || n.url), typeof t != "string" && (r = n, n = t, t = e), typeof t != "string") throw Error("No url passed to add resource to loader.");
	return typeof n == "function" && (r = n, n = null), this._add(e, t, n, r);
};
var ja = function() {
	function e() {}
	return e.init = function(e) {
		e = Object.assign({ sharedLoader: !1 }, e), this.loader = e.sharedLoader ? Aa.shared : new Aa();
	}, e.destroy = function() {
		this.loader &&= (this.loader.destroy(), null);
	}, e.extension = q.Application, e;
}(), Ma = function() {
	function e() {}
	return e.add = function() {
		Z.setExtensionLoadType("svg", Z.LOAD_TYPE.XHR), Z.setExtensionXhrType("svg", Z.XHR_RESPONSE_TYPE.TEXT);
	}, e.use = function(e, t) {
		if (e.data && (e.type === Z.TYPE.IMAGE || e.extension === "svg")) {
			var n = e.data, r = e.url, i = e.name, a = e.metadata;
			X.fromLoader(n, r, i, a).then(function(n) {
				e.texture = n, t();
			}).catch(t);
		} else t();
	}, e.extension = q.Loader, e;
}(), Na = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function Pa(e) {
	for (var t = "", n = 0; n < e.length;) {
		for (var r = [
			0,
			0,
			0
		], i = [
			0,
			0,
			0,
			0
		], a = 0; a < r.length; ++a) n < e.length ? r[a] = e.charCodeAt(n++) & 255 : r[a] = 0;
		switch (i[0] = r[0] >> 2, i[1] = (r[0] & 3) << 4 | r[1] >> 4, i[2] = (r[1] & 15) << 2 | r[2] >> 6, i[3] = r[2] & 63, n - (e.length - 1)) {
			case 2:
				i[3] = 64, i[2] = 64;
				break;
			case 1:
				i[3] = 64;
				break;
		}
		for (var a = 0; a < i.length; ++a) t += Na.charAt(i[a]);
	}
	return t;
}
function Fa(e, t) {
	if (!e.data) {
		t();
		return;
	}
	if (e.xhr && e.xhrType === Z.XHR_RESPONSE_TYPE.BLOB) {
		if (!self.Blob || typeof e.data == "string") {
			var n = e.xhr.getResponseHeader("content-type");
			if (n && n.indexOf("image") === 0) {
				e.data = new Image(), e.data.src = "data:" + n + ";base64," + Pa(e.xhr.responseText), e.type = Z.TYPE.IMAGE, e.data.onload = function() {
					e.data.onload = null, t();
				};
				return;
			}
		} else if (e.data.type.indexOf("image") === 0) {
			var r = globalThis.URL || globalThis.webkitURL, i = r.createObjectURL(e.data);
			e.blob = e.data, e.data = new Image(), e.data.src = i, e.type = Z.TYPE.IMAGE, e.data.onload = function() {
				r.revokeObjectURL(i), e.data.onload = null, t();
			};
			return;
		}
	}
	t();
}
var Ia = function() {
	function e() {}
	return e.extension = q.Loader, e.use = Fa, e;
}();
Ht.add(Ma, Ia);
//#endregion
//#region node_modules/@pixi/compressed-textures/dist/esm/compressed-textures.mjs
var Q, $;
(function(e) {
	e[e.COMPRESSED_RGB_S3TC_DXT1_EXT = 33776] = "COMPRESSED_RGB_S3TC_DXT1_EXT", e[e.COMPRESSED_RGBA_S3TC_DXT1_EXT = 33777] = "COMPRESSED_RGBA_S3TC_DXT1_EXT", e[e.COMPRESSED_RGBA_S3TC_DXT3_EXT = 33778] = "COMPRESSED_RGBA_S3TC_DXT3_EXT", e[e.COMPRESSED_RGBA_S3TC_DXT5_EXT = 33779] = "COMPRESSED_RGBA_S3TC_DXT5_EXT", e[e.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT = 35917] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT", e[e.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT = 35918] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT", e[e.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT = 35919] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT", e[e.COMPRESSED_SRGB_S3TC_DXT1_EXT = 35916] = "COMPRESSED_SRGB_S3TC_DXT1_EXT", e[e.COMPRESSED_R11_EAC = 37488] = "COMPRESSED_R11_EAC", e[e.COMPRESSED_SIGNED_R11_EAC = 37489] = "COMPRESSED_SIGNED_R11_EAC", e[e.COMPRESSED_RG11_EAC = 37490] = "COMPRESSED_RG11_EAC", e[e.COMPRESSED_SIGNED_RG11_EAC = 37491] = "COMPRESSED_SIGNED_RG11_EAC", e[e.COMPRESSED_RGB8_ETC2 = 37492] = "COMPRESSED_RGB8_ETC2", e[e.COMPRESSED_RGBA8_ETC2_EAC = 37496] = "COMPRESSED_RGBA8_ETC2_EAC", e[e.COMPRESSED_SRGB8_ETC2 = 37493] = "COMPRESSED_SRGB8_ETC2", e[e.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC = 37497] = "COMPRESSED_SRGB8_ALPHA8_ETC2_EAC", e[e.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37494] = "COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2", e[e.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37495] = "COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2", e[e.COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 35840] = "COMPRESSED_RGB_PVRTC_4BPPV1_IMG", e[e.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 35842] = "COMPRESSED_RGBA_PVRTC_4BPPV1_IMG", e[e.COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 35841] = "COMPRESSED_RGB_PVRTC_2BPPV1_IMG", e[e.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 35843] = "COMPRESSED_RGBA_PVRTC_2BPPV1_IMG", e[e.COMPRESSED_RGB_ETC1_WEBGL = 36196] = "COMPRESSED_RGB_ETC1_WEBGL", e[e.COMPRESSED_RGB_ATC_WEBGL = 35986] = "COMPRESSED_RGB_ATC_WEBGL", e[e.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL = 35986] = "COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL", e[e.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL = 34798] = "COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL", e[e.COMPRESSED_RGBA_ASTC_4x4_KHR = 37808] = "COMPRESSED_RGBA_ASTC_4x4_KHR";
})($ ||= {});
var La = (Q = {}, Q[$.COMPRESSED_RGB_S3TC_DXT1_EXT] = .5, Q[$.COMPRESSED_RGBA_S3TC_DXT1_EXT] = .5, Q[$.COMPRESSED_RGBA_S3TC_DXT3_EXT] = 1, Q[$.COMPRESSED_RGBA_S3TC_DXT5_EXT] = 1, Q[$.COMPRESSED_SRGB_S3TC_DXT1_EXT] = .5, Q[$.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT] = .5, Q[$.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT] = 1, Q[$.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT] = 1, Q[$.COMPRESSED_R11_EAC] = .5, Q[$.COMPRESSED_SIGNED_R11_EAC] = .5, Q[$.COMPRESSED_RG11_EAC] = 1, Q[$.COMPRESSED_SIGNED_RG11_EAC] = 1, Q[$.COMPRESSED_RGB8_ETC2] = .5, Q[$.COMPRESSED_RGBA8_ETC2_EAC] = 1, Q[$.COMPRESSED_SRGB8_ETC2] = .5, Q[$.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC] = 1, Q[$.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2] = .5, Q[$.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2] = .5, Q[$.COMPRESSED_RGB_PVRTC_4BPPV1_IMG] = .5, Q[$.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG] = .5, Q[$.COMPRESSED_RGB_PVRTC_2BPPV1_IMG] = .25, Q[$.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG] = .25, Q[$.COMPRESSED_RGB_ETC1_WEBGL] = .5, Q[$.COMPRESSED_RGB_ATC_WEBGL] = .5, Q[$.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL] = 1, Q[$.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL] = 1, Q[$.COMPRESSED_RGBA_ASTC_4x4_KHR] = 1, Q), Ra = function(e, t) {
	return Ra = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, Ra(e, t);
};
function za(e, t) {
	Ra(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
function Ba(e, t, n, r) {
	function i(e) {
		return e instanceof n ? e : new n(function(t) {
			t(e);
		});
	}
	return new (n ||= Promise)(function(n, a) {
		function o(e) {
			try {
				c(r.next(e));
			} catch (e) {
				a(e);
			}
		}
		function s(e) {
			try {
				c(r.throw(e));
			} catch (e) {
				a(e);
			}
		}
		function c(e) {
			e.done ? n(e.value) : i(e.value).then(o, s);
		}
		c((r = r.apply(e, t || [])).next());
	});
}
function Va(e, t) {
	var n = {
		label: 0,
		sent: function() {
			if (a[0] & 1) throw a[1];
			return a[1];
		},
		trys: [],
		ops: []
	}, r, i, a, o;
	return o = {
		next: s(0),
		throw: s(1),
		return: s(2)
	}, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
		return this;
	}), o;
	function s(e) {
		return function(t) {
			return c([e, t]);
		};
	}
	function c(o) {
		if (r) throw TypeError("Generator is already executing.");
		for (; n;) try {
			if (r = 1, i && (a = o[0] & 2 ? i.return : o[0] ? i.throw || ((a = i.return) && a.call(i), 0) : i.next) && !(a = a.call(i, o[1])).done) return a;
			switch (i = 0, a && (o = [o[0] & 2, a.value]), o[0]) {
				case 0:
				case 1:
					a = o;
					break;
				case 4: return n.label++, {
					value: o[1],
					done: !1
				};
				case 5:
					n.label++, i = o[1], o = [0];
					continue;
				case 7:
					o = n.ops.pop(), n.trys.pop();
					continue;
				default:
					if ((a = n.trys, !(a = a.length > 0 && a[a.length - 1])) && (o[0] === 6 || o[0] === 2)) {
						n = 0;
						continue;
					}
					if (o[0] === 3 && (!a || o[1] > a[0] && o[1] < a[3])) {
						n.label = o[1];
						break;
					}
					if (o[0] === 6 && n.label < a[1]) {
						n.label = a[1], a = o;
						break;
					}
					if (a && n.label < a[2]) {
						n.label = a[2], n.ops.push(o);
						break;
					}
					a[2] && n.ops.pop(), n.trys.pop();
					continue;
			}
			o = t.call(e, n);
		} catch (e) {
			o = [6, e], i = 0;
		} finally {
			r = a = 0;
		}
		if (o[0] & 5) throw o[1];
		return {
			value: o[0] ? o[1] : void 0,
			done: !0
		};
	}
}
var Ha = function(e) {
	za(t, e);
	function t(n, r) {
		var i = e.call(this, n, r) || this;
		return i.format = r.format, i.levels = r.levels || 1, i._width = r.width, i._height = r.height, i._extension = t._formatToExtension(i.format), (r.levelBuffers || i.buffer) && (i._levelBuffers = r.levelBuffers || t._createLevelBuffers(n instanceof Uint8Array ? n : i.buffer.uint8View, i.format, i.levels, 4, 4, i.width, i.height)), i;
	}
	return t.prototype.upload = function(e, t, n) {
		var r = e.gl;
		if (!e.context.extensions[this._extension]) throw Error(this._extension + " textures are not supported on the current machine");
		if (!this._levelBuffers) return !1;
		for (var i = 0, a = this.levels; i < a; i++) {
			var o = this._levelBuffers[i], s = o.levelID, c = o.levelWidth, l = o.levelHeight, u = o.levelBuffer;
			r.compressedTexImage2D(r.TEXTURE_2D, s, this.format, c, l, 0, u);
		}
		return !0;
	}, t.prototype.onBlobLoaded = function() {
		this._levelBuffers = t._createLevelBuffers(this.buffer.uint8View, this.format, this.levels, 4, 4, this.width, this.height);
	}, t._formatToExtension = function(e) {
		if (e >= 33776 && e <= 33779) return "s3tc";
		if (e >= 37488 && e <= 37497) return "etc";
		if (e >= 35840 && e <= 35843) return "pvrtc";
		if (e >= 36196) return "etc1";
		if (e >= 35986 && e <= 34798) return "atc";
		throw Error("Invalid (compressed) texture format given!");
	}, t._createLevelBuffers = function(e, t, n, r, i, a, o) {
		for (var s = Array(n), c = e.byteOffset, l = a, u = o, d = l + r - 1 & ~(r - 1), f = u + i - 1 & ~(i - 1), p = d * f * La[t], m = 0; m < n; m++) s[m] = {
			levelID: m,
			levelWidth: n > 1 ? l : d,
			levelHeight: n > 1 ? u : f,
			levelBuffer: new Uint8Array(e.buffer, c, p)
		}, c += p, l = l >> 1 || 1, u = u >> 1 || 1, d = l + r - 1 & ~(r - 1), f = u + i - 1 & ~(i - 1), p = d * f * La[t];
		return s;
	}, t;
}(function(e) {
	za(t, e);
	function t(t, n) {
		n === void 0 && (n = {
			width: 1,
			height: 1,
			autoLoad: !0
		});
		var r = this, i, a;
		return typeof t == "string" ? (i = t, a = /* @__PURE__ */ new Uint8Array()) : (i = null, a = t), r = e.call(this, a, n) || this, r.origin = i, r.buffer = a ? new Ai(a) : null, r.origin && n.autoLoad !== !1 && r.load(), a && a.length && (r.loaded = !0, r.onBlobLoaded(r.buffer.rawBinaryData)), r;
	}
	return t.prototype.onBlobLoaded = function(e) {}, t.prototype.load = function() {
		return Ba(this, void 0, Promise, function() {
			var e, t, n;
			return Va(this, function(r) {
				switch (r.label) {
					case 0: return [4, fetch(this.origin)];
					case 1: return e = r.sent(), [4, e.blob()];
					case 2: return t = r.sent(), [4, t.arrayBuffer()];
					case 3: return n = r.sent(), this.data = new Uint32Array(n), this.buffer = new Ai(n), this.loaded = !0, this.onBlobLoaded(n), this.update(), [2, this];
				}
			});
		});
	}, t;
}(en)), Ua = function() {
	function e() {}
	return e.use = function(t, n) {
		var r = t.data, i = this;
		if (t.type === Z.TYPE.JSON && r && r.cacheID && r.textures) {
			for (var a = r.textures, o = void 0, s = void 0, c = 0, l = a.length; c < l; c++) {
				var u = a[c], d = u.src, f = u.format;
				if (f || (s = d), e.textureFormats[f]) {
					o = d;
					break;
				}
			}
			if (o ||= s, !o) {
				n(/* @__PURE__ */ Error("Cannot load compressed-textures in " + t.url + ", make sure you provide a fallback"));
				return;
			}
			if (o === t.url) {
				n(/* @__PURE__ */ Error("URL of compressed texture cannot be the same as the manifest's URL"));
				return;
			}
			var p = {
				crossOrigin: t.crossOrigin,
				metadata: t.metadata.imageMetadata,
				parentResource: t
			}, m = Me.resolve(t.url.replace(i.baseUrl, ""), o), h = r.cacheID;
			i.add(h, m, p, function(e) {
				if (e.error) {
					n(e.error);
					return;
				}
				var r = e.texture, i = r === void 0 ? null : r, a = e.textures;
				Object.assign(t, {
					texture: i,
					textures: a === void 0 ? {} : a
				}), n();
			});
		} else n();
	}, Object.defineProperty(e, "textureExtensions", {
		get: function() {
			if (!e._textureExtensions) {
				var t = V.ADAPTER.createCanvas().getContext("webgl");
				if (!t) return console.warn("WebGL not available for compressed textures. Silently failing."), {};
				e._textureExtensions = {
					s3tc: t.getExtension("WEBGL_compressed_texture_s3tc"),
					s3tc_sRGB: t.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
					etc: t.getExtension("WEBGL_compressed_texture_etc"),
					etc1: t.getExtension("WEBGL_compressed_texture_etc1"),
					pvrtc: t.getExtension("WEBGL_compressed_texture_pvrtc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
					atc: t.getExtension("WEBGL_compressed_texture_atc"),
					astc: t.getExtension("WEBGL_compressed_texture_astc")
				};
			}
			return e._textureExtensions;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e, "textureFormats", {
		get: function() {
			if (!e._textureFormats) {
				var t = e.textureExtensions;
				for (var n in e._textureFormats = {}, t) {
					var r = t[n];
					r && Object.assign(e._textureFormats, Object.getPrototypeOf(r));
				}
			}
			return e._textureFormats;
		},
		enumerable: !1,
		configurable: !0
	}), e.extension = q.Loader, e;
}();
function Wa(e, t, n) {
	var r = {
		textures: {},
		texture: null
	};
	return t && t.map(function(e) {
		return new X(new Y(e, Object.assign({
			mipmap: re.OFF,
			alphaMode: ie.NO_PREMULTIPLIED_ALPHA
		}, n)));
	}).forEach(function(t, n) {
		var i = t.baseTexture, a = e + "-" + (n + 1);
		Y.addToCache(i, a), X.addToCache(t, a), n === 0 && (Y.addToCache(i, e), X.addToCache(t, e), r.texture = t), r.textures[a] = t;
	}), r;
}
var Ga, Ka, qa = 4, Ja = 124, Ya = 32, Xa = 20, Za = 542327876, Qa = {
	SIZE: 1,
	FLAGS: 2,
	HEIGHT: 3,
	WIDTH: 4,
	MIPMAP_COUNT: 7,
	PIXEL_FORMAT: 19
}, $a = {
	SIZE: 0,
	FLAGS: 1,
	FOURCC: 2,
	RGB_BITCOUNT: 3,
	R_BIT_MASK: 4,
	G_BIT_MASK: 5,
	B_BIT_MASK: 6,
	A_BIT_MASK: 7
}, eo = {
	DXGI_FORMAT: 0,
	RESOURCE_DIMENSION: 1,
	MISC_FLAG: 2,
	ARRAY_SIZE: 3,
	MISC_FLAGS2: 4
}, to;
(function(e) {
	e[e.DXGI_FORMAT_UNKNOWN = 0] = "DXGI_FORMAT_UNKNOWN", e[e.DXGI_FORMAT_R32G32B32A32_TYPELESS = 1] = "DXGI_FORMAT_R32G32B32A32_TYPELESS", e[e.DXGI_FORMAT_R32G32B32A32_FLOAT = 2] = "DXGI_FORMAT_R32G32B32A32_FLOAT", e[e.DXGI_FORMAT_R32G32B32A32_UINT = 3] = "DXGI_FORMAT_R32G32B32A32_UINT", e[e.DXGI_FORMAT_R32G32B32A32_SINT = 4] = "DXGI_FORMAT_R32G32B32A32_SINT", e[e.DXGI_FORMAT_R32G32B32_TYPELESS = 5] = "DXGI_FORMAT_R32G32B32_TYPELESS", e[e.DXGI_FORMAT_R32G32B32_FLOAT = 6] = "DXGI_FORMAT_R32G32B32_FLOAT", e[e.DXGI_FORMAT_R32G32B32_UINT = 7] = "DXGI_FORMAT_R32G32B32_UINT", e[e.DXGI_FORMAT_R32G32B32_SINT = 8] = "DXGI_FORMAT_R32G32B32_SINT", e[e.DXGI_FORMAT_R16G16B16A16_TYPELESS = 9] = "DXGI_FORMAT_R16G16B16A16_TYPELESS", e[e.DXGI_FORMAT_R16G16B16A16_FLOAT = 10] = "DXGI_FORMAT_R16G16B16A16_FLOAT", e[e.DXGI_FORMAT_R16G16B16A16_UNORM = 11] = "DXGI_FORMAT_R16G16B16A16_UNORM", e[e.DXGI_FORMAT_R16G16B16A16_UINT = 12] = "DXGI_FORMAT_R16G16B16A16_UINT", e[e.DXGI_FORMAT_R16G16B16A16_SNORM = 13] = "DXGI_FORMAT_R16G16B16A16_SNORM", e[e.DXGI_FORMAT_R16G16B16A16_SINT = 14] = "DXGI_FORMAT_R16G16B16A16_SINT", e[e.DXGI_FORMAT_R32G32_TYPELESS = 15] = "DXGI_FORMAT_R32G32_TYPELESS", e[e.DXGI_FORMAT_R32G32_FLOAT = 16] = "DXGI_FORMAT_R32G32_FLOAT", e[e.DXGI_FORMAT_R32G32_UINT = 17] = "DXGI_FORMAT_R32G32_UINT", e[e.DXGI_FORMAT_R32G32_SINT = 18] = "DXGI_FORMAT_R32G32_SINT", e[e.DXGI_FORMAT_R32G8X24_TYPELESS = 19] = "DXGI_FORMAT_R32G8X24_TYPELESS", e[e.DXGI_FORMAT_D32_FLOAT_S8X24_UINT = 20] = "DXGI_FORMAT_D32_FLOAT_S8X24_UINT", e[e.DXGI_FORMAT_R32_FLOAT_X8X24_TYPELESS = 21] = "DXGI_FORMAT_R32_FLOAT_X8X24_TYPELESS", e[e.DXGI_FORMAT_X32_TYPELESS_G8X24_UINT = 22] = "DXGI_FORMAT_X32_TYPELESS_G8X24_UINT", e[e.DXGI_FORMAT_R10G10B10A2_TYPELESS = 23] = "DXGI_FORMAT_R10G10B10A2_TYPELESS", e[e.DXGI_FORMAT_R10G10B10A2_UNORM = 24] = "DXGI_FORMAT_R10G10B10A2_UNORM", e[e.DXGI_FORMAT_R10G10B10A2_UINT = 25] = "DXGI_FORMAT_R10G10B10A2_UINT", e[e.DXGI_FORMAT_R11G11B10_FLOAT = 26] = "DXGI_FORMAT_R11G11B10_FLOAT", e[e.DXGI_FORMAT_R8G8B8A8_TYPELESS = 27] = "DXGI_FORMAT_R8G8B8A8_TYPELESS", e[e.DXGI_FORMAT_R8G8B8A8_UNORM = 28] = "DXGI_FORMAT_R8G8B8A8_UNORM", e[e.DXGI_FORMAT_R8G8B8A8_UNORM_SRGB = 29] = "DXGI_FORMAT_R8G8B8A8_UNORM_SRGB", e[e.DXGI_FORMAT_R8G8B8A8_UINT = 30] = "DXGI_FORMAT_R8G8B8A8_UINT", e[e.DXGI_FORMAT_R8G8B8A8_SNORM = 31] = "DXGI_FORMAT_R8G8B8A8_SNORM", e[e.DXGI_FORMAT_R8G8B8A8_SINT = 32] = "DXGI_FORMAT_R8G8B8A8_SINT", e[e.DXGI_FORMAT_R16G16_TYPELESS = 33] = "DXGI_FORMAT_R16G16_TYPELESS", e[e.DXGI_FORMAT_R16G16_FLOAT = 34] = "DXGI_FORMAT_R16G16_FLOAT", e[e.DXGI_FORMAT_R16G16_UNORM = 35] = "DXGI_FORMAT_R16G16_UNORM", e[e.DXGI_FORMAT_R16G16_UINT = 36] = "DXGI_FORMAT_R16G16_UINT", e[e.DXGI_FORMAT_R16G16_SNORM = 37] = "DXGI_FORMAT_R16G16_SNORM", e[e.DXGI_FORMAT_R16G16_SINT = 38] = "DXGI_FORMAT_R16G16_SINT", e[e.DXGI_FORMAT_R32_TYPELESS = 39] = "DXGI_FORMAT_R32_TYPELESS", e[e.DXGI_FORMAT_D32_FLOAT = 40] = "DXGI_FORMAT_D32_FLOAT", e[e.DXGI_FORMAT_R32_FLOAT = 41] = "DXGI_FORMAT_R32_FLOAT", e[e.DXGI_FORMAT_R32_UINT = 42] = "DXGI_FORMAT_R32_UINT", e[e.DXGI_FORMAT_R32_SINT = 43] = "DXGI_FORMAT_R32_SINT", e[e.DXGI_FORMAT_R24G8_TYPELESS = 44] = "DXGI_FORMAT_R24G8_TYPELESS", e[e.DXGI_FORMAT_D24_UNORM_S8_UINT = 45] = "DXGI_FORMAT_D24_UNORM_S8_UINT", e[e.DXGI_FORMAT_R24_UNORM_X8_TYPELESS = 46] = "DXGI_FORMAT_R24_UNORM_X8_TYPELESS", e[e.DXGI_FORMAT_X24_TYPELESS_G8_UINT = 47] = "DXGI_FORMAT_X24_TYPELESS_G8_UINT", e[e.DXGI_FORMAT_R8G8_TYPELESS = 48] = "DXGI_FORMAT_R8G8_TYPELESS", e[e.DXGI_FORMAT_R8G8_UNORM = 49] = "DXGI_FORMAT_R8G8_UNORM", e[e.DXGI_FORMAT_R8G8_UINT = 50] = "DXGI_FORMAT_R8G8_UINT", e[e.DXGI_FORMAT_R8G8_SNORM = 51] = "DXGI_FORMAT_R8G8_SNORM", e[e.DXGI_FORMAT_R8G8_SINT = 52] = "DXGI_FORMAT_R8G8_SINT", e[e.DXGI_FORMAT_R16_TYPELESS = 53] = "DXGI_FORMAT_R16_TYPELESS", e[e.DXGI_FORMAT_R16_FLOAT = 54] = "DXGI_FORMAT_R16_FLOAT", e[e.DXGI_FORMAT_D16_UNORM = 55] = "DXGI_FORMAT_D16_UNORM", e[e.DXGI_FORMAT_R16_UNORM = 56] = "DXGI_FORMAT_R16_UNORM", e[e.DXGI_FORMAT_R16_UINT = 57] = "DXGI_FORMAT_R16_UINT", e[e.DXGI_FORMAT_R16_SNORM = 58] = "DXGI_FORMAT_R16_SNORM", e[e.DXGI_FORMAT_R16_SINT = 59] = "DXGI_FORMAT_R16_SINT", e[e.DXGI_FORMAT_R8_TYPELESS = 60] = "DXGI_FORMAT_R8_TYPELESS", e[e.DXGI_FORMAT_R8_UNORM = 61] = "DXGI_FORMAT_R8_UNORM", e[e.DXGI_FORMAT_R8_UINT = 62] = "DXGI_FORMAT_R8_UINT", e[e.DXGI_FORMAT_R8_SNORM = 63] = "DXGI_FORMAT_R8_SNORM", e[e.DXGI_FORMAT_R8_SINT = 64] = "DXGI_FORMAT_R8_SINT", e[e.DXGI_FORMAT_A8_UNORM = 65] = "DXGI_FORMAT_A8_UNORM", e[e.DXGI_FORMAT_R1_UNORM = 66] = "DXGI_FORMAT_R1_UNORM", e[e.DXGI_FORMAT_R9G9B9E5_SHAREDEXP = 67] = "DXGI_FORMAT_R9G9B9E5_SHAREDEXP", e[e.DXGI_FORMAT_R8G8_B8G8_UNORM = 68] = "DXGI_FORMAT_R8G8_B8G8_UNORM", e[e.DXGI_FORMAT_G8R8_G8B8_UNORM = 69] = "DXGI_FORMAT_G8R8_G8B8_UNORM", e[e.DXGI_FORMAT_BC1_TYPELESS = 70] = "DXGI_FORMAT_BC1_TYPELESS", e[e.DXGI_FORMAT_BC1_UNORM = 71] = "DXGI_FORMAT_BC1_UNORM", e[e.DXGI_FORMAT_BC1_UNORM_SRGB = 72] = "DXGI_FORMAT_BC1_UNORM_SRGB", e[e.DXGI_FORMAT_BC2_TYPELESS = 73] = "DXGI_FORMAT_BC2_TYPELESS", e[e.DXGI_FORMAT_BC2_UNORM = 74] = "DXGI_FORMAT_BC2_UNORM", e[e.DXGI_FORMAT_BC2_UNORM_SRGB = 75] = "DXGI_FORMAT_BC2_UNORM_SRGB", e[e.DXGI_FORMAT_BC3_TYPELESS = 76] = "DXGI_FORMAT_BC3_TYPELESS", e[e.DXGI_FORMAT_BC3_UNORM = 77] = "DXGI_FORMAT_BC3_UNORM", e[e.DXGI_FORMAT_BC3_UNORM_SRGB = 78] = "DXGI_FORMAT_BC3_UNORM_SRGB", e[e.DXGI_FORMAT_BC4_TYPELESS = 79] = "DXGI_FORMAT_BC4_TYPELESS", e[e.DXGI_FORMAT_BC4_UNORM = 80] = "DXGI_FORMAT_BC4_UNORM", e[e.DXGI_FORMAT_BC4_SNORM = 81] = "DXGI_FORMAT_BC4_SNORM", e[e.DXGI_FORMAT_BC5_TYPELESS = 82] = "DXGI_FORMAT_BC5_TYPELESS", e[e.DXGI_FORMAT_BC5_UNORM = 83] = "DXGI_FORMAT_BC5_UNORM", e[e.DXGI_FORMAT_BC5_SNORM = 84] = "DXGI_FORMAT_BC5_SNORM", e[e.DXGI_FORMAT_B5G6R5_UNORM = 85] = "DXGI_FORMAT_B5G6R5_UNORM", e[e.DXGI_FORMAT_B5G5R5A1_UNORM = 86] = "DXGI_FORMAT_B5G5R5A1_UNORM", e[e.DXGI_FORMAT_B8G8R8A8_UNORM = 87] = "DXGI_FORMAT_B8G8R8A8_UNORM", e[e.DXGI_FORMAT_B8G8R8X8_UNORM = 88] = "DXGI_FORMAT_B8G8R8X8_UNORM", e[e.DXGI_FORMAT_R10G10B10_XR_BIAS_A2_UNORM = 89] = "DXGI_FORMAT_R10G10B10_XR_BIAS_A2_UNORM", e[e.DXGI_FORMAT_B8G8R8A8_TYPELESS = 90] = "DXGI_FORMAT_B8G8R8A8_TYPELESS", e[e.DXGI_FORMAT_B8G8R8A8_UNORM_SRGB = 91] = "DXGI_FORMAT_B8G8R8A8_UNORM_SRGB", e[e.DXGI_FORMAT_B8G8R8X8_TYPELESS = 92] = "DXGI_FORMAT_B8G8R8X8_TYPELESS", e[e.DXGI_FORMAT_B8G8R8X8_UNORM_SRGB = 93] = "DXGI_FORMAT_B8G8R8X8_UNORM_SRGB", e[e.DXGI_FORMAT_BC6H_TYPELESS = 94] = "DXGI_FORMAT_BC6H_TYPELESS", e[e.DXGI_FORMAT_BC6H_UF16 = 95] = "DXGI_FORMAT_BC6H_UF16", e[e.DXGI_FORMAT_BC6H_SF16 = 96] = "DXGI_FORMAT_BC6H_SF16", e[e.DXGI_FORMAT_BC7_TYPELESS = 97] = "DXGI_FORMAT_BC7_TYPELESS", e[e.DXGI_FORMAT_BC7_UNORM = 98] = "DXGI_FORMAT_BC7_UNORM", e[e.DXGI_FORMAT_BC7_UNORM_SRGB = 99] = "DXGI_FORMAT_BC7_UNORM_SRGB", e[e.DXGI_FORMAT_AYUV = 100] = "DXGI_FORMAT_AYUV", e[e.DXGI_FORMAT_Y410 = 101] = "DXGI_FORMAT_Y410", e[e.DXGI_FORMAT_Y416 = 102] = "DXGI_FORMAT_Y416", e[e.DXGI_FORMAT_NV12 = 103] = "DXGI_FORMAT_NV12", e[e.DXGI_FORMAT_P010 = 104] = "DXGI_FORMAT_P010", e[e.DXGI_FORMAT_P016 = 105] = "DXGI_FORMAT_P016", e[e.DXGI_FORMAT_420_OPAQUE = 106] = "DXGI_FORMAT_420_OPAQUE", e[e.DXGI_FORMAT_YUY2 = 107] = "DXGI_FORMAT_YUY2", e[e.DXGI_FORMAT_Y210 = 108] = "DXGI_FORMAT_Y210", e[e.DXGI_FORMAT_Y216 = 109] = "DXGI_FORMAT_Y216", e[e.DXGI_FORMAT_NV11 = 110] = "DXGI_FORMAT_NV11", e[e.DXGI_FORMAT_AI44 = 111] = "DXGI_FORMAT_AI44", e[e.DXGI_FORMAT_IA44 = 112] = "DXGI_FORMAT_IA44", e[e.DXGI_FORMAT_P8 = 113] = "DXGI_FORMAT_P8", e[e.DXGI_FORMAT_A8P8 = 114] = "DXGI_FORMAT_A8P8", e[e.DXGI_FORMAT_B4G4R4A4_UNORM = 115] = "DXGI_FORMAT_B4G4R4A4_UNORM", e[e.DXGI_FORMAT_P208 = 116] = "DXGI_FORMAT_P208", e[e.DXGI_FORMAT_V208 = 117] = "DXGI_FORMAT_V208", e[e.DXGI_FORMAT_V408 = 118] = "DXGI_FORMAT_V408", e[e.DXGI_FORMAT_SAMPLER_FEEDBACK_MIN_MIP_OPAQUE = 119] = "DXGI_FORMAT_SAMPLER_FEEDBACK_MIN_MIP_OPAQUE", e[e.DXGI_FORMAT_SAMPLER_FEEDBACK_MIP_REGION_USED_OPAQUE = 120] = "DXGI_FORMAT_SAMPLER_FEEDBACK_MIP_REGION_USED_OPAQUE", e[e.DXGI_FORMAT_FORCE_UINT = 121] = "DXGI_FORMAT_FORCE_UINT";
})(to ||= {});
var no;
(function(e) {
	e[e.DDS_DIMENSION_TEXTURE1D = 2] = "DDS_DIMENSION_TEXTURE1D", e[e.DDS_DIMENSION_TEXTURE2D = 3] = "DDS_DIMENSION_TEXTURE2D", e[e.DDS_DIMENSION_TEXTURE3D = 6] = "DDS_DIMENSION_TEXTURE3D";
})(no ||= {});
var ro = 1, io = 2, ao = 4, oo = 64, so = 512, co = 131072, lo = 827611204, uo = 861165636, fo = 894720068, po = 808540228, mo = 4, ho = (Ga = {}, Ga[lo] = $.COMPRESSED_RGBA_S3TC_DXT1_EXT, Ga[uo] = $.COMPRESSED_RGBA_S3TC_DXT3_EXT, Ga[fo] = $.COMPRESSED_RGBA_S3TC_DXT5_EXT, Ga), go = (Ka = {}, Ka[to.DXGI_FORMAT_BC1_TYPELESS] = $.COMPRESSED_RGBA_S3TC_DXT1_EXT, Ka[to.DXGI_FORMAT_BC1_UNORM] = $.COMPRESSED_RGBA_S3TC_DXT1_EXT, Ka[to.DXGI_FORMAT_BC2_TYPELESS] = $.COMPRESSED_RGBA_S3TC_DXT3_EXT, Ka[to.DXGI_FORMAT_BC2_UNORM] = $.COMPRESSED_RGBA_S3TC_DXT3_EXT, Ka[to.DXGI_FORMAT_BC3_TYPELESS] = $.COMPRESSED_RGBA_S3TC_DXT5_EXT, Ka[to.DXGI_FORMAT_BC3_UNORM] = $.COMPRESSED_RGBA_S3TC_DXT5_EXT, Ka[to.DXGI_FORMAT_BC1_UNORM_SRGB] = $.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT, Ka[to.DXGI_FORMAT_BC2_UNORM_SRGB] = $.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT, Ka[to.DXGI_FORMAT_BC3_UNORM_SRGB] = $.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT, Ka);
function _o(e) {
	var t = new Uint32Array(e);
	if (t[0] !== Za) throw Error("Invalid DDS file magic word");
	var n = new Uint32Array(e, 0, Ja / Uint32Array.BYTES_PER_ELEMENT), r = n[Qa.HEIGHT], i = n[Qa.WIDTH], a = n[Qa.MIPMAP_COUNT], o = new Uint32Array(e, Qa.PIXEL_FORMAT * Uint32Array.BYTES_PER_ELEMENT, Ya / Uint32Array.BYTES_PER_ELEMENT), s = o[ro];
	if (s & ao) {
		var c = o[$a.FOURCC];
		if (c !== po) {
			var l = ho[c], u = qa + Ja;
			return [new Ha(new Uint8Array(e, u), {
				format: l,
				width: i,
				height: r,
				levels: a
			})];
		}
		var d = qa + Ja, f = new Uint32Array(t.buffer, d, Xa / Uint32Array.BYTES_PER_ELEMENT), p = f[eo.DXGI_FORMAT], m = f[eo.RESOURCE_DIMENSION], h = f[eo.MISC_FLAG], g = f[eo.ARRAY_SIZE], _ = go[p];
		if (_ === void 0) throw Error("DDSParser cannot parse texture data with DXGI format " + p);
		if (h === mo) throw Error("DDSParser does not support cubemap textures");
		if (m === no.DDS_DIMENSION_TEXTURE3D) throw Error("DDSParser does not supported 3D texture data");
		var v = [], y = qa + Ja + Xa;
		if (g === 1) v.push(new Uint8Array(e, y));
		else {
			for (var b = La[_], x = 0, S = i, C = r, w = 0; w < a; w++) {
				var T = Math.max(1, S + 3 & -4) * Math.max(1, C + 3 & -4) * b;
				x += T, S >>>= 1, C >>>= 1;
			}
			for (var E = y, w = 0; w < g; w++) v.push(new Uint8Array(e, E, x)), E += x;
		}
		return v.map(function(e) {
			return new Ha(e, {
				format: _,
				width: i,
				height: r,
				levels: a
			});
		});
	}
	throw s & oo ? Error("DDSParser does not support uncompressed texture data.") : s & so ? Error("DDSParser does not supported YUV uncompressed texture data.") : s & co ? Error("DDSParser does not support single-channel (lumninance) texture data!") : s & io ? Error("DDSParser does not support single-channel (alpha) texture data!") : Error("DDSParser failed to load a texture file due to an unknown reason!");
}
var vo, yo, bo, xo = [
	171,
	75,
	84,
	88,
	32,
	49,
	49,
	187,
	13,
	10,
	26,
	10
], So = 67305985, Co = {
	FILE_IDENTIFIER: 0,
	ENDIANNESS: 12,
	GL_TYPE: 16,
	GL_TYPE_SIZE: 20,
	GL_FORMAT: 24,
	GL_INTERNAL_FORMAT: 28,
	GL_BASE_INTERNAL_FORMAT: 32,
	PIXEL_WIDTH: 36,
	PIXEL_HEIGHT: 40,
	PIXEL_DEPTH: 44,
	NUMBER_OF_ARRAY_ELEMENTS: 48,
	NUMBER_OF_FACES: 52,
	NUMBER_OF_MIPMAP_LEVELS: 56,
	BYTES_OF_KEY_VALUE_DATA: 60
}, wo = 64, To = (vo = {}, vo[P.UNSIGNED_BYTE] = 1, vo[P.UNSIGNED_SHORT] = 2, vo[P.INT] = 4, vo[P.UNSIGNED_INT] = 4, vo[P.FLOAT] = 4, vo[P.HALF_FLOAT] = 8, vo), Eo = (yo = {}, yo[M.RGBA] = 4, yo[M.RGB] = 3, yo[M.RG] = 2, yo[M.RED] = 1, yo[M.LUMINANCE] = 1, yo[M.LUMINANCE_ALPHA] = 2, yo[M.ALPHA] = 1, yo), Do = (bo = {}, bo[P.UNSIGNED_SHORT_4_4_4_4] = 2, bo[P.UNSIGNED_SHORT_5_5_5_1] = 2, bo[P.UNSIGNED_SHORT_5_6_5] = 2, bo);
function Oo(e, t, n) {
	n === void 0 && (n = !1);
	var r = new DataView(t);
	if (!ko(e, r)) return null;
	var i = r.getUint32(Co.ENDIANNESS, !0) === So, a = r.getUint32(Co.GL_TYPE, i), o = r.getUint32(Co.GL_FORMAT, i), s = r.getUint32(Co.GL_INTERNAL_FORMAT, i), c = r.getUint32(Co.PIXEL_WIDTH, i), l = r.getUint32(Co.PIXEL_HEIGHT, i) || 1, u = r.getUint32(Co.PIXEL_DEPTH, i) || 1, d = r.getUint32(Co.NUMBER_OF_ARRAY_ELEMENTS, i) || 1, f = r.getUint32(Co.NUMBER_OF_FACES, i), p = r.getUint32(Co.NUMBER_OF_MIPMAP_LEVELS, i), m = r.getUint32(Co.BYTES_OF_KEY_VALUE_DATA, i);
	if (l === 0 || u !== 1) throw Error("Only 2D textures are supported");
	if (f !== 1) throw Error("CubeTextures are not supported by KTXLoader yet!");
	if (d !== 1) throw Error("WebGL does not support array textures");
	var h = 4, g = 4, _ = c + 3 & -4, v = l + 3 & -4, y = Array(d), b = c * l;
	a === 0 && (b = _ * v);
	var x = a === 0 ? La[s] : To[a] ? To[a] * Eo[o] : Do[a];
	if (x === void 0) throw Error("Unable to resolve the pixel format stored in the *.ktx file!");
	for (var S = n ? jo(r, m, i) : null, C = b * x, w = c, T = l, E = _, D = v, O = wo + m, k = 0; k < p; k++) {
		for (var A = r.getUint32(O, i), j = O + 4, M = 0; M < d; M++) {
			var N = y[M];
			N ||= y[M] = Array(p), N[k] = {
				levelID: k,
				levelWidth: p > 1 || a !== 0 ? w : E,
				levelHeight: p > 1 || a !== 0 ? T : D,
				levelBuffer: new Uint8Array(t, j, C)
			}, j += C;
		}
		O += A + 4, O = O % 4 == 0 ? O : O + 4 - O % 4, w = w >> 1 || 1, T = T >> 1 || 1, E = w + h - 1 & ~(h - 1), D = T + g - 1 & ~(g - 1), C = E * D * x;
	}
	return a === 0 ? {
		compressed: y.map(function(e) {
			return new Ha(null, {
				format: s,
				width: c,
				height: l,
				levels: p,
				levelBuffers: e
			});
		}),
		kvData: S
	} : {
		uncompressed: y.map(function(e) {
			var t = e[0].levelBuffer, n = !1;
			return a === P.FLOAT ? t = new Float32Array(e[0].levelBuffer.buffer, e[0].levelBuffer.byteOffset, e[0].levelBuffer.byteLength / 4) : a === P.UNSIGNED_INT ? (n = !0, t = new Uint32Array(e[0].levelBuffer.buffer, e[0].levelBuffer.byteOffset, e[0].levelBuffer.byteLength / 4)) : a === P.INT && (n = !0, t = new Int32Array(e[0].levelBuffer.buffer, e[0].levelBuffer.byteOffset, e[0].levelBuffer.byteLength / 4)), {
				resource: new en(t, {
					width: e[0].levelWidth,
					height: e[0].levelHeight
				}),
				type: a,
				format: n ? Ao(o) : o
			};
		}),
		kvData: S
	};
}
function ko(e, t) {
	for (var n = 0; n < xo.length; n++) if (t.getUint8(n) !== xo[n]) return console.error(e + " is not a valid *.ktx file!"), !1;
	return !0;
}
function Ao(e) {
	switch (e) {
		case M.RGBA: return M.RGBA_INTEGER;
		case M.RGB: return M.RGB_INTEGER;
		case M.RG: return M.RG_INTEGER;
		case M.RED: return M.RED_INTEGER;
		default: return e;
	}
}
function jo(e, t, n) {
	for (var r = /* @__PURE__ */ new Map(), i = 0; i < t;) {
		var a = e.getUint32(wo + i, n), o = wo + i + 4, s = 3 - (a + 3) % 4;
		if (a === 0 || a > t - i) {
			console.error("KTXLoader: keyAndValueByteSize out of bounds");
			break;
		}
		for (var c = 0; c < a && e.getUint8(o + c) !== 0; c++);
		if (c === -1) {
			console.error("KTXLoader: Failed to find null byte terminating kvData key");
			break;
		}
		var l = new TextDecoder().decode(new Uint8Array(e.buffer, o, c)), u = new DataView(e.buffer, o + c + 1, a - c - 1);
		r.set(l, u), i += 4 + a + s;
	}
	return r;
}
Z.setExtensionXhrType("dds", Z.XHR_RESPONSE_TYPE.BUFFER);
var Mo = function() {
	function e() {}
	return e.use = function(e, t) {
		if (e.extension === "dds" && e.data) try {
			Object.assign(e, Wa(e.name || e.url, _o(e.data), e.metadata));
		} catch (e) {
			t(e);
			return;
		}
		t();
	}, e.extension = q.Loader, e;
}();
Z.setExtensionXhrType("ktx", Z.XHR_RESPONSE_TYPE.BUFFER);
var No = function() {
	function e() {}
	return e.use = function(e, t) {
		if (e.extension === "ktx" && e.data) try {
			var n = e.name || e.url, r = Oo(n, e.data, this.loadKeyValueData), i = r.compressed, a = r.uncompressed, o = r.kvData;
			if (i) {
				var s = Wa(n, i, e.metadata);
				if (o && s.textures) for (var c in s.textures) s.textures[c].baseTexture.ktxKeyValueData = o;
				Object.assign(e, s);
			} else if (a) {
				var l = {};
				a.forEach(function(e, t) {
					var r = new X(new Y(e.resource, {
						mipmap: re.OFF,
						alphaMode: ie.NO_PREMULTIPLIED_ALPHA,
						type: e.type,
						format: e.format
					})), i = n + "-" + (t + 1);
					o && (r.baseTexture.ktxKeyValueData = o), Y.addToCache(r.baseTexture, i), X.addToCache(r, i), t === 0 && (l[n] = r, Y.addToCache(r.baseTexture, n), X.addToCache(r, n)), l[i] = r;
				}), Object.assign(e, { textures: l });
			}
		} catch (e) {
			t(e);
			return;
		}
		t();
	}, e.extension = q.Loader, e.loadKeyValueData = !1, e;
}(), Po = function(e, t) {
	return Po = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, Po(e, t);
};
function Fo(e, t) {
	Po(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
(function(e) {
	Fo(t, e);
	function t(t, n, r, i) {
		t === void 0 && (t = 1500), r === void 0 && (r = 16384), i === void 0 && (i = !1);
		var a = e.call(this) || this, o = 16384;
		return r > o && (r = o), a._properties = [
			!1,
			!0,
			!1,
			!1,
			!1
		], a._maxSize = t, a._batchSize = r, a._buffers = null, a._bufferUpdateIDs = [], a._updateID = 0, a.interactiveChildren = !1, a.blendMode = A.NORMAL, a.autoResize = i, a.roundPixels = !0, a.baseTexture = null, a.setProperties(n), a._tint = 0, a.tintRgb = /* @__PURE__ */ new Float32Array(4), a.tint = 16777215, a;
	}
	return t.prototype.setProperties = function(e) {
		e && (this._properties[0] = "vertices" in e || "scale" in e ? !!e.vertices || !!e.scale : this._properties[0], this._properties[1] = "position" in e ? !!e.position : this._properties[1], this._properties[2] = "rotation" in e ? !!e.rotation : this._properties[2], this._properties[3] = "uvs" in e ? !!e.uvs : this._properties[3], this._properties[4] = "tint" in e || "alpha" in e ? !!e.tint || !!e.alpha : this._properties[4]);
	}, t.prototype.updateTransform = function() {
		this.displayObjectUpdateTransform();
	}, Object.defineProperty(t.prototype, "tint", {
		get: function() {
			return this._tint;
		},
		set: function(e) {
			this._tint = e, Be(e, this.tintRgb);
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype.render = function(e) {
		var t = this;
		!this.visible || this.worldAlpha <= 0 || !this.children.length || !this.renderable || (this.baseTexture || (this.baseTexture = this.children[0]._texture.baseTexture, this.baseTexture.valid || this.baseTexture.once("update", function() {
			return t.onChildrenChange(0);
		})), e.batch.setObjectRenderer(e.plugins.particle), e.plugins.particle.render(this));
	}, t.prototype.onChildrenChange = function(e) {
		for (var t = Math.floor(e / this._batchSize); this._bufferUpdateIDs.length < t;) this._bufferUpdateIDs.push(0);
		this._bufferUpdateIDs[t] = ++this._updateID;
	}, t.prototype.dispose = function() {
		if (this._buffers) {
			for (var e = 0; e < this._buffers.length; ++e) this._buffers[e].destroy();
			this._buffers = null;
		}
	}, t.prototype.destroy = function(t) {
		e.prototype.destroy.call(this, t), this.dispose(), this._properties = null, this._buffers = null, this._bufferUpdateIDs = null;
	}, t;
})(zt);
var Io = function() {
	function e(e, t, n) {
		this.geometry = new kn(), this.indexBuffer = null, this.size = n, this.dynamicProperties = [], this.staticProperties = [];
		for (var r = 0; r < e.length; ++r) {
			var i = e[r];
			i = {
				attributeName: i.attributeName,
				size: i.size,
				uploadFunction: i.uploadFunction,
				type: i.type || P.FLOAT,
				offset: i.offset
			}, t[r] ? this.dynamicProperties.push(i) : this.staticProperties.push(i);
		}
		this.staticStride = 0, this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null, this.dynamicStride = 0, this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this._updateID = 0, this.initBuffers();
	}
	return e.prototype.initBuffers = function() {
		var e = this.geometry, t = 0;
		this.indexBuffer = new Cn(Ye(this.size), !0, !0), e.addIndex(this.indexBuffer), this.dynamicStride = 0;
		for (var n = 0; n < this.dynamicProperties.length; ++n) {
			var r = this.dynamicProperties[n];
			r.offset = t, t += r.size, this.dynamicStride += r.size;
		}
		var i = /* @__PURE__ */ new ArrayBuffer(this.size * this.dynamicStride * 4 * 4);
		this.dynamicData = new Float32Array(i), this.dynamicDataUint32 = new Uint32Array(i), this.dynamicBuffer = new Cn(this.dynamicData, !1, !1);
		var a = 0;
		this.staticStride = 0;
		for (var n = 0; n < this.staticProperties.length; ++n) {
			var r = this.staticProperties[n];
			r.offset = a, a += r.size, this.staticStride += r.size;
		}
		var o = /* @__PURE__ */ new ArrayBuffer(this.size * this.staticStride * 4 * 4);
		this.staticData = new Float32Array(o), this.staticDataUint32 = new Uint32Array(o), this.staticBuffer = new Cn(this.staticData, !0, !1);
		for (var n = 0; n < this.dynamicProperties.length; ++n) {
			var r = this.dynamicProperties[n];
			e.addAttribute(r.attributeName, this.dynamicBuffer, 0, r.type === P.UNSIGNED_BYTE, r.type, this.dynamicStride * 4, r.offset * 4);
		}
		for (var n = 0; n < this.staticProperties.length; ++n) {
			var r = this.staticProperties[n];
			e.addAttribute(r.attributeName, this.staticBuffer, 0, r.type === P.UNSIGNED_BYTE, r.type, this.staticStride * 4, r.offset * 4);
		}
	}, e.prototype.uploadDynamic = function(e, t, n) {
		for (var r = 0; r < this.dynamicProperties.length; r++) {
			var i = this.dynamicProperties[r];
			i.uploadFunction(e, t, n, i.type === P.UNSIGNED_BYTE ? this.dynamicDataUint32 : this.dynamicData, this.dynamicStride, i.offset);
		}
		this.dynamicBuffer._updateID++;
	}, e.prototype.uploadStatic = function(e, t, n) {
		for (var r = 0; r < this.staticProperties.length; r++) {
			var i = this.staticProperties[r];
			i.uploadFunction(e, t, n, i.type === P.UNSIGNED_BYTE ? this.staticDataUint32 : this.staticData, this.staticStride, i.offset);
		}
		this.staticBuffer._updateID++;
	}, e.prototype.destroy = function() {
		this.indexBuffer = null, this.dynamicProperties = null, this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this.staticProperties = null, this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null, this.geometry.destroy();
	}, e;
}(), Lo = "varying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n    vec4 color = texture2D(uSampler, vTextureCoord) * vColor;\n    gl_FragColor = color;\n}", Ro = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nattribute vec2 aPositionCoord;\nattribute float aRotation;\n\nuniform mat3 translationMatrix;\nuniform vec4 uColor;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvoid main(void){\n    float x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);\n    float y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);\n\n    vec2 v = vec2(x, y);\n    v = v + aPositionCoord;\n\n    gl_Position = vec4((translationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vColor = aColor * uColor;\n}\n", zo = function(e) {
	Fo(t, e);
	function t(t) {
		var n = e.call(this, t) || this;
		return n.shader = null, n.properties = null, n.tempMatrix = new W(), n.properties = [
			{
				attributeName: "aVertexPosition",
				size: 2,
				uploadFunction: n.uploadVertices,
				offset: 0
			},
			{
				attributeName: "aPositionCoord",
				size: 2,
				uploadFunction: n.uploadPosition,
				offset: 0
			},
			{
				attributeName: "aRotation",
				size: 1,
				uploadFunction: n.uploadRotation,
				offset: 0
			},
			{
				attributeName: "aTextureCoord",
				size: 2,
				uploadFunction: n.uploadUvs,
				offset: 0
			},
			{
				attributeName: "aColor",
				size: 1,
				type: P.UNSIGNED_BYTE,
				uploadFunction: n.uploadTint,
				offset: 0
			}
		], n.shader = wr.from(Ro, Lo, {}), n.state = jr.for2d(), n;
	}
	return t.prototype.render = function(e) {
		var t = e.children, n = e._maxSize, r = e._batchSize, i = this.renderer, a = t.length;
		if (a !== 0) {
			a > n && !e.autoResize && (a = n);
			var o = e._buffers;
			o ||= e._buffers = this.generateBuffers(e);
			var s = t[0]._texture.baseTexture, c = s.alphaMode > 0;
			this.state.blendMode = Ge(e.blendMode, c), i.state.set(this.state);
			var l = i.gl, u = e.worldTransform.copyTo(this.tempMatrix);
			u.prepend(i.globalUniforms.uniforms.projectionMatrix), this.shader.uniforms.translationMatrix = u.toArray(!0), this.shader.uniforms.uColor = Ke(e.tintRgb, e.worldAlpha, this.shader.uniforms.uColor, c), this.shader.uniforms.uSampler = s, this.renderer.shader.bind(this.shader);
			for (var d = !1, f = 0, p = 0; f < a; f += r, p += 1) {
				var m = a - f;
				m > r && (m = r), p >= o.length && o.push(this._generateOneMoreBuffer(e));
				var h = o[p];
				h.uploadDynamic(t, f, m);
				var g = e._bufferUpdateIDs[p] || 0;
				d ||= h._updateID < g, d && (h._updateID = e._updateID, h.uploadStatic(t, f, m)), i.geometry.bind(h.geometry), l.drawElements(l.TRIANGLES, m * 6, l.UNSIGNED_SHORT, 0);
			}
		}
	}, t.prototype.generateBuffers = function(e) {
		for (var t = [], n = e._maxSize, r = e._batchSize, i = e._properties, a = 0; a < n; a += r) t.push(new Io(this.properties, i, r));
		return t;
	}, t.prototype._generateOneMoreBuffer = function(e) {
		var t = e._batchSize, n = e._properties;
		return new Io(this.properties, n, t);
	}, t.prototype.uploadVertices = function(e, t, n, r, i, a) {
		for (var o = 0, s = 0, c = 0, l = 0, u = 0; u < n; ++u) {
			var d = e[t + u], f = d._texture, p = d.scale.x, m = d.scale.y, h = f.trim, g = f.orig;
			h ? (s = h.x - d.anchor.x * g.width, o = s + h.width, l = h.y - d.anchor.y * g.height, c = l + h.height) : (o = g.width * (1 - d.anchor.x), s = g.width * -d.anchor.x, c = g.height * (1 - d.anchor.y), l = g.height * -d.anchor.y), r[a] = s * p, r[a + 1] = l * m, r[a + i] = o * p, r[a + i + 1] = l * m, r[a + i * 2] = o * p, r[a + i * 2 + 1] = c * m, r[a + i * 3] = s * p, r[a + i * 3 + 1] = c * m, a += i * 4;
		}
	}, t.prototype.uploadPosition = function(e, t, n, r, i, a) {
		for (var o = 0; o < n; o++) {
			var s = e[t + o].position;
			r[a] = s.x, r[a + 1] = s.y, r[a + i] = s.x, r[a + i + 1] = s.y, r[a + i * 2] = s.x, r[a + i * 2 + 1] = s.y, r[a + i * 3] = s.x, r[a + i * 3 + 1] = s.y, a += i * 4;
		}
	}, t.prototype.uploadRotation = function(e, t, n, r, i, a) {
		for (var o = 0; o < n; o++) {
			var s = e[t + o].rotation;
			r[a] = s, r[a + i] = s, r[a + i * 2] = s, r[a + i * 3] = s, a += i * 4;
		}
	}, t.prototype.uploadUvs = function(e, t, n, r, i, a) {
		for (var o = 0; o < n; ++o) {
			var s = e[t + o]._texture._uvs;
			s ? (r[a] = s.x0, r[a + 1] = s.y0, r[a + i] = s.x1, r[a + i + 1] = s.y1, r[a + i * 2] = s.x2, r[a + i * 2 + 1] = s.y2, r[a + i * 3] = s.x3, r[a + i * 3 + 1] = s.y3, a += i * 4) : (r[a] = 0, r[a + 1] = 0, r[a + i] = 0, r[a + i + 1] = 0, r[a + i * 2] = 0, r[a + i * 2 + 1] = 0, r[a + i * 3] = 0, r[a + i * 3 + 1] = 0, a += i * 4);
		}
	}, t.prototype.uploadTint = function(e, t, n, r, i, a) {
		for (var o = 0; o < n; ++o) {
			var s = e[t + o], c = s._texture.baseTexture.alphaMode > 0, l = s.alpha, u = l < 1 && c ? qe(s._tintRGB, l) : s._tintRGB + (l * 255 << 24);
			r[a] = u, r[a + i] = u, r[a + i * 2] = u, r[a + i * 3] = u, a += i * 4;
		}
	}, t.prototype.destroy = function() {
		e.prototype.destroy.call(this), this.shader &&= (this.shader.destroy(), null), this.tempMatrix = null;
	}, t.extension = {
		name: "particle",
		type: q.RendererPlugin
	}, t;
}(Rn), Bo;
(function(e) {
	e.MITER = "miter", e.BEVEL = "bevel", e.ROUND = "round";
})(Bo ||= {});
var Vo;
(function(e) {
	e.BUTT = "butt", e.ROUND = "round", e.SQUARE = "square";
})(Vo ||= {});
var Ho = {
	adaptive: !0,
	maxLength: 10,
	minSegments: 8,
	maxSegments: 2048,
	epsilon: 1e-4,
	_segmentsCount: function(e, t) {
		if (t === void 0 && (t = 20), !this.adaptive || !e || isNaN(e)) return t;
		var n = Math.ceil(e / this.maxLength);
		return n < this.minSegments ? n = this.minSegments : n > this.maxSegments && (n = this.maxSegments), n;
	}
}, Uo = function() {
	function e() {
		this.color = 16777215, this.alpha = 1, this.texture = X.WHITE, this.matrix = null, this.visible = !1, this.reset();
	}
	return e.prototype.clone = function() {
		var t = new e();
		return t.color = this.color, t.alpha = this.alpha, t.texture = this.texture, t.matrix = this.matrix, t.visible = this.visible, t;
	}, e.prototype.reset = function() {
		this.color = 16777215, this.alpha = 1, this.texture = X.WHITE, this.matrix = null, this.visible = !1;
	}, e.prototype.destroy = function() {
		this.texture = null, this.matrix = null;
	}, e;
}(), Wo = function(e, t) {
	return Wo = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, Wo(e, t);
};
function Go(e, t) {
	Wo(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
function Ko(e, t) {
	var n, r;
	t === void 0 && (t = !1);
	var i = e.length;
	if (!(i < 6)) {
		for (var a = 0, o = 0, s = e[i - 2], c = e[i - 1]; o < i; o += 2) {
			var l = e[o], u = e[o + 1];
			a += (l - s) * (u + c), s = l, c = u;
		}
		if (!t && a > 0 || t && a <= 0) for (var d = i / 2, o = d + d % 2; o < i; o += 2) {
			var f = i - o - 2, p = i - o - 1, m = o, h = o + 1;
			n = [e[m], e[f]], e[f] = n[0], e[m] = n[1], r = [e[h], e[p]], e[p] = r[0], e[h] = r[1];
		}
	}
}
var qo = {
	build: function(e) {
		e.points = e.shape.points.slice();
	},
	triangulate: function(e, t) {
		var n = e.points, r = e.holes, i = t.points, a = t.indices;
		if (n.length >= 6) {
			Ko(n, !1);
			for (var o = [], s = 0; s < r.length; s++) {
				var c = r[s];
				Ko(c.points, !0), o.push(n.length / 2), n = n.concat(c.points);
			}
			var l = (0, je.default)(n, o, 2);
			if (!l) return;
			for (var u = i.length / 2, s = 0; s < l.length; s += 3) a.push(l[s] + u), a.push(l[s + 1] + u), a.push(l[s + 2] + u);
			for (var s = 0; s < n.length; s++) i.push(n[s]);
		}
	}
}, Jo = {
	build: function(e) {
		var t = e.points, n, r, i, a, o, s;
		if (e.type === vt.CIRC) {
			var c = e.shape;
			n = c.x, r = c.y, o = s = c.radius, i = a = 0;
		} else if (e.type === vt.ELIP) {
			var l = e.shape;
			n = l.x, r = l.y, o = l.width, s = l.height, i = a = 0;
		} else {
			var u = e.shape, d = u.width / 2, f = u.height / 2;
			n = u.x + d, r = u.y + f, o = s = Math.max(0, Math.min(u.radius, Math.min(d, f))), i = d - o, a = f - s;
		}
		if (!(o >= 0 && s >= 0 && i >= 0 && a >= 0)) {
			t.length = 0;
			return;
		}
		var p = Math.ceil(2.3 * Math.sqrt(o + s)), m = p * 8 + (i ? 4 : 0) + (a ? 4 : 0);
		if (t.length = m, m !== 0) {
			if (p === 0) {
				t.length = 8, t[0] = t[6] = n + i, t[1] = t[3] = r + a, t[2] = t[4] = n - i, t[5] = t[7] = r - a;
				return;
			}
			var h = 0, g = p * 4 + (i ? 2 : 0) + 2, _ = g, v = m, y = i + o, b = a, x = n + y, S = n - y, C = r + b;
			if (t[h++] = x, t[h++] = C, t[--g] = C, t[--g] = S, a) {
				var w = r - b;
				t[_++] = S, t[_++] = w, t[--v] = w, t[--v] = x;
			}
			for (var T = 1; T < p; T++) {
				var E = Math.PI / 2 * (T / p), y = i + Math.cos(E) * o, b = a + Math.sin(E) * s, x = n + y, S = n - y, C = r + b, w = r - b;
				t[h++] = x, t[h++] = C, t[--g] = C, t[--g] = S, t[_++] = S, t[_++] = w, t[--v] = w, t[--v] = x;
			}
			var y = i, b = a + s, x = n + y, S = n - y, C = r + b, w = r - b;
			t[h++] = x, t[h++] = C, t[--v] = w, t[--v] = x, i && (t[h++] = S, t[h++] = C, t[--v] = w, t[--v] = S);
		}
	},
	triangulate: function(e, t) {
		var n = e.points, r = t.points, i = t.indices;
		if (n.length !== 0) {
			var a = r.length / 2, o = a, s, c;
			if (e.type !== vt.RREC) {
				var l = e.shape;
				s = l.x, c = l.y;
			} else {
				var u = e.shape;
				s = u.x + u.width / 2, c = u.y + u.height / 2;
			}
			var d = e.matrix;
			r.push(e.matrix ? d.a * s + d.c * c + d.tx : s, e.matrix ? d.b * s + d.d * c + d.ty : c), a++, r.push(n[0], n[1]);
			for (var f = 2; f < n.length; f += 2) r.push(n[f], n[f + 1]), i.push(a++, o, a);
			i.push(o + 1, o, a);
		}
	}
}, Yo = {
	build: function(e) {
		var t = e.shape, n = t.x, r = t.y, i = t.width, a = t.height, o = e.points;
		o.length = 0, o.push(n, r, n + i, r, n + i, r + a, n, r + a);
	},
	triangulate: function(e, t) {
		var n = e.points, r = t.points, i = r.length / 2;
		r.push(n[0], n[1], n[2], n[3], n[6], n[7], n[4], n[5]), t.indices.push(i, i + 1, i + 2, i + 1, i + 2, i + 3);
	}
};
function Xo(e, t, n) {
	return e + (t - e) * n;
}
function Zo(e, t, n, r, i, a, o) {
	o === void 0 && (o = []);
	for (var s = 20, c = o, l = 0, u = 0, d = 0, f = 0, p = 0, m = 0, h = 0, g = 0; h <= s; ++h) g = h / s, l = Xo(e, n, g), u = Xo(t, r, g), d = Xo(n, i, g), f = Xo(r, a, g), p = Xo(l, d, g), m = Xo(u, f, g), !(h === 0 && c[c.length - 2] === p && c[c.length - 1] === m) && c.push(p, m);
	return c;
}
var Qo = {
	build: function(e) {
		if (vs.nextRoundedRectBehavior) {
			Jo.build(e);
			return;
		}
		var t = e.shape, n = e.points, r = t.x, i = t.y, a = t.width, o = t.height, s = Math.max(0, Math.min(t.radius, Math.min(a, o) / 2));
		n.length = 0, s ? (Zo(r, i + s, r, i, r + s, i, n), Zo(r + a - s, i, r + a, i, r + a, i + s, n), Zo(r + a, i + o - s, r + a, i + o, r + a - s, i + o, n), Zo(r + s, i + o, r, i + o, r, i + o - s, n)) : n.push(r, i, r + a, i, r + a, i + o, r, i + o);
	},
	triangulate: function(e, t) {
		if (vs.nextRoundedRectBehavior) {
			Jo.triangulate(e, t);
			return;
		}
		for (var n = e.points, r = t.points, i = t.indices, a = r.length / 2, o = (0, je.default)(n, null, 2), s = 0, c = o.length; s < c; s += 3) i.push(o[s] + a), i.push(o[s + 1] + a), i.push(o[s + 2] + a);
		for (var s = 0, c = n.length; s < c; s++) r.push(n[s], n[++s]);
	}
};
function $o(e, t, n, r, i, a, o, s) {
	var c = e - n * i, l = t - r * i, u = e + n * a, d = t + r * a, f, p;
	o ? (f = r, p = -n) : (f = -r, p = n);
	var m = c + f, h = l + p, g = u + f, _ = d + p;
	return s.push(m, h), s.push(g, _), 2;
}
function es(e, t, n, r, i, a, o, s) {
	var c = n - e, l = r - t, u = Math.atan2(c, l), d = Math.atan2(i - e, a - t);
	s && u < d ? u += Math.PI * 2 : !s && u > d && (d += Math.PI * 2);
	var f = u, p = d - u, m = Math.abs(p), h = Math.sqrt(c * c + l * l), g = (15 * m * Math.sqrt(h) / Math.PI >> 0) + 1, _ = p / g;
	if (f += _, s) {
		o.push(e, t), o.push(n, r);
		for (var v = 1, y = f; v < g; v++, y += _) o.push(e, t), o.push(e + Math.sin(y) * h, t + Math.cos(y) * h);
		o.push(e, t), o.push(i, a);
	} else {
		o.push(n, r), o.push(e, t);
		for (var v = 1, y = f; v < g; v++, y += _) o.push(e + Math.sin(y) * h, t + Math.cos(y) * h), o.push(e, t);
		o.push(i, a), o.push(e, t);
	}
	return g * 2;
}
function ts(e, t) {
	var n = e.shape, r = e.points || n.points.slice(), i = t.closePointEps;
	if (r.length !== 0) {
		var a = e.lineStyle, o = new H(r[0], r[1]), s = new H(r[r.length - 2], r[r.length - 1]), c = n.type !== vt.POLY || n.closeStroke, l = Math.abs(o.x - s.x) < i && Math.abs(o.y - s.y) < i;
		if (c) {
			r = r.slice(), l && (r.pop(), r.pop(), s.set(r[r.length - 2], r[r.length - 1]));
			var u = (o.x + s.x) * .5, d = (s.y + o.y) * .5;
			r.unshift(u, d), r.push(u, d);
		}
		var f = t.points, p = r.length / 2, m = r.length, h = f.length / 2, g = a.width / 2, _ = g * g, v = a.miterLimit * a.miterLimit, y = r[0], b = r[1], x = r[2], S = r[3], C = 0, w = 0, T = -(b - S), E = y - x, D = 0, O = 0, k = Math.sqrt(T * T + E * E);
		T /= k, E /= k, T *= g, E *= g;
		var A = a.alignment, j = (1 - A) * 2, M = A * 2;
		c || (a.cap === Vo.ROUND ? m += es(y - T * (j - M) * .5, b - E * (j - M) * .5, y - T * j, b - E * j, y + T * M, b + E * M, f, !0) + 2 : a.cap === Vo.SQUARE && (m += $o(y, b, T, E, j, M, !0, f))), f.push(y - T * j, b - E * j), f.push(y + T * M, b + E * M);
		for (var N = 1; N < p - 1; ++N) {
			y = r[(N - 1) * 2], b = r[(N - 1) * 2 + 1], x = r[N * 2], S = r[N * 2 + 1], C = r[(N + 1) * 2], w = r[(N + 1) * 2 + 1], T = -(b - S), E = y - x, k = Math.sqrt(T * T + E * E), T /= k, E /= k, T *= g, E *= g, D = -(S - w), O = x - C, k = Math.sqrt(D * D + O * O), D /= k, O /= k, D *= g, O *= g;
			var P = x - y, ee = b - S, te = x - C, ne = w - S, re = P * te + ee * ne, ie = ee * te - ne * P, F = ie < 0;
			if (Math.abs(ie) < .001 * Math.abs(re)) {
				f.push(x - T * j, S - E * j), f.push(x + T * M, S + E * M), re >= 0 && (a.join === Bo.ROUND ? m += es(x, S, x - T * j, S - E * j, x - D * j, S - O * j, f, !1) + 4 : m += 2, f.push(x - D * M, S - O * M), f.push(x + D * j, S + O * j));
				continue;
			}
			var ae = (-T + y) * (-E + S) - (-T + x) * (-E + b), oe = (-D + C) * (-O + S) - (-D + x) * (-O + w), I = (P * oe - te * ae) / ie, se = (ne * ae - ee * oe) / ie, L = (I - x) * (I - x) + (se - S) * (se - S), R = x + (I - x) * j, z = S + (se - S) * j, ce = x - (I - x) * M, le = S - (se - S) * M, B = Math.min(P * P + ee * ee, te * te + ne * ne), ue = F ? j : M;
			L <= B + ue * ue * _ ? a.join === Bo.BEVEL || L / _ > v ? (F ? (f.push(R, z), f.push(x + T * M, S + E * M), f.push(R, z), f.push(x + D * M, S + O * M)) : (f.push(x - T * j, S - E * j), f.push(ce, le), f.push(x - D * j, S - O * j), f.push(ce, le)), m += 2) : a.join === Bo.ROUND ? F ? (f.push(R, z), f.push(x + T * M, S + E * M), m += es(x, S, x + T * M, S + E * M, x + D * M, S + O * M, f, !0) + 4, f.push(R, z), f.push(x + D * M, S + O * M)) : (f.push(x - T * j, S - E * j), f.push(ce, le), m += es(x, S, x - T * j, S - E * j, x - D * j, S - O * j, f, !1) + 4, f.push(x - D * j, S - O * j), f.push(ce, le)) : (f.push(R, z), f.push(ce, le)) : (f.push(x - T * j, S - E * j), f.push(x + T * M, S + E * M), a.join === Bo.ROUND ? F ? m += es(x, S, x + T * M, S + E * M, x + D * M, S + O * M, f, !0) + 2 : m += es(x, S, x - T * j, S - E * j, x - D * j, S - O * j, f, !1) + 2 : a.join === Bo.MITER && L / _ <= v && (F ? (f.push(ce, le), f.push(ce, le)) : (f.push(R, z), f.push(R, z)), m += 2), f.push(x - D * j, S - O * j), f.push(x + D * M, S + O * M), m += 2);
		}
		y = r[(p - 2) * 2], b = r[(p - 2) * 2 + 1], x = r[(p - 1) * 2], S = r[(p - 1) * 2 + 1], T = -(b - S), E = y - x, k = Math.sqrt(T * T + E * E), T /= k, E /= k, T *= g, E *= g, f.push(x - T * j, S - E * j), f.push(x + T * M, S + E * M), c || (a.cap === Vo.ROUND ? m += es(x - T * (j - M) * .5, S - E * (j - M) * .5, x - T * j, S - E * j, x + T * M, S + E * M, f, !1) + 2 : a.cap === Vo.SQUARE && (m += $o(x, S, T, E, j, M, !1, f)));
		for (var de = t.indices, fe = Ho.epsilon * Ho.epsilon, N = h; N < m + h - 2; ++N) y = f[N * 2], b = f[N * 2 + 1], x = f[(N + 1) * 2], S = f[(N + 1) * 2 + 1], C = f[(N + 2) * 2], w = f[(N + 2) * 2 + 1], !(Math.abs(y * (S - w) + x * (w - b) + C * (b - S)) < fe) && de.push(N, N + 1, N + 2);
	}
}
function ns(e, t) {
	var n = 0, r = e.shape, i = e.points || r.points, a = r.type !== vt.POLY || r.closeStroke;
	if (i.length !== 0) {
		var o = t.points, s = t.indices, c = i.length / 2, l = o.length / 2, u = l;
		for (o.push(i[0], i[1]), n = 1; n < c; n++) o.push(i[n * 2], i[n * 2 + 1]), s.push(u, u + 1), u++;
		a && s.push(u, l);
	}
}
function rs(e, t) {
	e.lineStyle.native ? ns(e, t) : ts(e, t);
}
var is = function() {
	function e() {}
	return e.curveTo = function(e, t, n, r, i, a) {
		var o = a[a.length - 2], s = a[a.length - 1] - t, c = o - e, l = r - t, u = n - e, d = Math.abs(s * u - c * l);
		if (d < 1e-8 || i === 0) return (a[a.length - 2] !== e || a[a.length - 1] !== t) && a.push(e, t), null;
		var f = s * s + c * c, p = l * l + u * u, m = s * l + c * u, h = i * Math.sqrt(f) / d, g = i * Math.sqrt(p) / d, _ = h * m / f, v = g * m / p, y = h * u + g * c, b = h * l + g * s, x = c * (g + _), S = s * (g + _), C = u * (h + v), w = l * (h + v), T = Math.atan2(S - b, x - y), E = Math.atan2(w - b, C - y);
		return {
			cx: y + e,
			cy: b + t,
			radius: i,
			startAngle: T,
			endAngle: E,
			anticlockwise: c * l > u * s
		};
	}, e.arc = function(e, t, n, r, i, a, o, s, c) {
		for (var l = o - a, u = Ho._segmentsCount(Math.abs(l) * i, Math.ceil(Math.abs(l) / ht) * 40), d = l / (u * 2), f = d * 2, p = Math.cos(d), m = Math.sin(d), h = u - 1, g = h % 1 / h, _ = 0; _ <= h; ++_) {
			var v = _ + g * _, y = d + a + f * v, b = Math.cos(y), x = -Math.sin(y);
			c.push((p * b + m * x) * i + n, (p * -x + m * b) * i + r);
		}
	}, e;
}(), as = function() {
	function e() {}
	return e.curveLength = function(e, t, n, r, i, a, o, s) {
		for (var c = 10, l = 0, u = 0, d = 0, f = 0, p = 0, m = 0, h = 0, g = 0, _ = 0, v = 0, y = 0, b = e, x = t, S = 1; S <= c; ++S) u = S / c, d = u * u, f = d * u, p = 1 - u, m = p * p, h = m * p, g = h * e + 3 * m * u * n + 3 * p * d * i + f * o, _ = h * t + 3 * m * u * r + 3 * p * d * a + f * s, v = b - g, y = x - _, b = g, x = _, l += Math.sqrt(v * v + y * y);
		return l;
	}, e.curveTo = function(t, n, r, i, a, o, s) {
		var c = s[s.length - 2], l = s[s.length - 1];
		s.length -= 2;
		var u = Ho._segmentsCount(e.curveLength(c, l, t, n, r, i, a, o)), d = 0, f = 0, p = 0, m = 0, h = 0;
		s.push(c, l);
		for (var g = 1, _ = 0; g <= u; ++g) _ = g / u, d = 1 - _, f = d * d, p = f * d, m = _ * _, h = m * _, s.push(p * c + 3 * f * _ * t + 3 * d * m * r + h * a, p * l + 3 * f * _ * n + 3 * d * m * i + h * o);
	}, e;
}(), os = function() {
	function e() {}
	return e.curveLength = function(e, t, n, r, i, a) {
		var o = e - 2 * n + i, s = t - 2 * r + a, c = 2 * n - 2 * e, l = 2 * r - 2 * t, u = 4 * (o * o + s * s), d = 4 * (o * c + s * l), f = c * c + l * l, p = 2 * Math.sqrt(u + d + f), m = Math.sqrt(u), h = 2 * u * m, g = 2 * Math.sqrt(f), _ = d / m;
		return (h * p + m * d * (p - g) + (4 * f * u - d * d) * Math.log((2 * m + _ + p) / (_ + g))) / (4 * h);
	}, e.curveTo = function(t, n, r, i, a) {
		for (var o = a[a.length - 2], s = a[a.length - 1], c = Ho._segmentsCount(e.curveLength(o, s, t, n, r, i)), l = 0, u = 0, d = 1; d <= c; ++d) {
			var f = d / c;
			l = o + (t - o) * f, u = s + (n - s) * f, a.push(l + (t + (r - t) * f - l) * f, u + (n + (i - n) * f - u) * f);
		}
	}, e;
}(), ss = function() {
	function e() {
		this.reset();
	}
	return e.prototype.begin = function(e, t, n) {
		this.reset(), this.style = e, this.start = t, this.attribStart = n;
	}, e.prototype.end = function(e, t) {
		this.attribSize = t - this.attribStart, this.size = e - this.start;
	}, e.prototype.reset = function() {
		this.style = null, this.size = 0, this.start = 0, this.attribStart = 0, this.attribSize = 0;
	}, e;
}(), cs, ls = (cs = {}, cs[vt.POLY] = qo, cs[vt.CIRC] = Jo, cs[vt.ELIP] = Jo, cs[vt.RECT] = Yo, cs[vt.RREC] = Qo, cs), us = [], ds = [], fs = function() {
	function e(e, t, n, r) {
		t === void 0 && (t = null), n === void 0 && (n = null), r === void 0 && (r = null), this.points = [], this.holes = [], this.shape = e, this.lineStyle = n, this.fillStyle = t, this.matrix = r, this.type = e.type;
	}
	return e.prototype.clone = function() {
		return new e(this.shape, this.fillStyle, this.lineStyle, this.matrix);
	}, e.prototype.destroy = function() {
		this.shape = null, this.holes.length = 0, this.holes = null, this.points.length = 0, this.points = null, this.lineStyle = null, this.fillStyle = null;
	}, e;
}(), ps = new H(), ms = function(e) {
	Go(t, e);
	function t() {
		var t = e.call(this) || this;
		return t.closePointEps = 1e-4, t.boundsPadding = 0, t.uvsFloat32 = null, t.indicesUint16 = null, t.batchable = !1, t.points = [], t.colors = [], t.uvs = [], t.indices = [], t.textureIds = [], t.graphicsData = [], t.drawCalls = [], t.batchDirty = -1, t.batches = [], t.dirty = 0, t.cacheDirty = -1, t.clearDirty = 0, t.shapeIndex = 0, t._bounds = new Pt(), t.boundsDirty = -1, t;
	}
	return Object.defineProperty(t.prototype, "bounds", {
		get: function() {
			return this.updateBatches(), this.boundsDirty !== this.dirty && (this.boundsDirty = this.dirty, this.calculateBounds()), this._bounds;
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype.invalidate = function() {
		this.boundsDirty = -1, this.dirty++, this.batchDirty++, this.shapeIndex = 0, this.points.length = 0, this.colors.length = 0, this.uvs.length = 0, this.indices.length = 0, this.textureIds.length = 0;
		for (var e = 0; e < this.drawCalls.length; e++) this.drawCalls[e].texArray.clear(), ds.push(this.drawCalls[e]);
		this.drawCalls.length = 0;
		for (var e = 0; e < this.batches.length; e++) {
			var t = this.batches[e];
			t.reset(), us.push(t);
		}
		this.batches.length = 0;
	}, t.prototype.clear = function() {
		return this.graphicsData.length > 0 && (this.invalidate(), this.clearDirty++, this.graphicsData.length = 0), this;
	}, t.prototype.drawShape = function(e, t, n, r) {
		t === void 0 && (t = null), n === void 0 && (n = null), r === void 0 && (r = null);
		var i = new fs(e, t, n, r);
		return this.graphicsData.push(i), this.dirty++, this;
	}, t.prototype.drawHole = function(e, t) {
		if (t === void 0 && (t = null), !this.graphicsData.length) return null;
		var n = new fs(e, null, null, t), r = this.graphicsData[this.graphicsData.length - 1];
		return n.lineStyle = r.lineStyle, r.holes.push(n), this.dirty++, this;
	}, t.prototype.destroy = function() {
		e.prototype.destroy.call(this);
		for (var t = 0; t < this.graphicsData.length; ++t) this.graphicsData[t].destroy();
		this.points.length = 0, this.points = null, this.colors.length = 0, this.colors = null, this.uvs.length = 0, this.uvs = null, this.indices.length = 0, this.indices = null, this.indexBuffer.destroy(), this.indexBuffer = null, this.graphicsData.length = 0, this.graphicsData = null, this.drawCalls.length = 0, this.drawCalls = null, this.batches.length = 0, this.batches = null, this._bounds = null;
	}, t.prototype.containsPoint = function(e) {
		for (var t = this.graphicsData, n = 0; n < t.length; ++n) {
			var r = t[n];
			if (r.fillStyle.visible && r.shape && (r.matrix ? r.matrix.applyInverse(e, ps) : ps.copyFrom(e), r.shape.contains(ps.x, ps.y))) {
				var i = !1;
				if (r.holes) {
					for (var a = 0; a < r.holes.length; a++) if (r.holes[a].shape.contains(ps.x, ps.y)) {
						i = !0;
						break;
					}
				}
				if (!i) return !0;
			}
		}
		return !1;
	}, t.prototype.updateBatches = function() {
		if (!this.graphicsData.length) {
			this.batchable = !0;
			return;
		}
		if (this.validateBatching()) {
			this.cacheDirty = this.dirty;
			var e = this.uvs, t = this.graphicsData, n = null, r = null;
			this.batches.length > 0 && (n = this.batches[this.batches.length - 1], r = n.style);
			for (var i = this.shapeIndex; i < t.length; i++) {
				this.shapeIndex++;
				var a = t[i], o = a.fillStyle, s = a.lineStyle;
				ls[a.type].build(a), a.matrix && this.transformPoints(a.points, a.matrix), (o.visible || s.visible) && this.processHoles(a.holes);
				for (var c = 0; c < 2; c++) {
					var l = c === 0 ? o : s;
					if (l.visible) {
						var u = l.texture.baseTexture, d = this.indices.length, f = this.points.length / 2;
						u.wrapMode = ne.REPEAT, c === 0 ? this.processFill(a) : this.processLine(a);
						var p = this.points.length / 2 - f;
						p !== 0 && (n && !this._compareStyles(r, l) && (n.end(d, f), n = null), n || (n = us.pop() || new ss(), n.begin(l, d, f), this.batches.push(n), r = l), this.addUvs(this.points, e, l.texture, f, p, l.matrix));
					}
				}
			}
			var m = this.indices.length, h = this.points.length / 2;
			if (n && n.end(m, h), this.batches.length === 0) {
				this.batchable = !0;
				return;
			}
			var g = h > 65535;
			this.indicesUint16 && this.indices.length === this.indicesUint16.length && g === this.indicesUint16.BYTES_PER_ELEMENT > 2 ? this.indicesUint16.set(this.indices) : this.indicesUint16 = g ? new Uint32Array(this.indices) : new Uint16Array(this.indices), this.batchable = this.isBatchable(), this.batchable ? this.packBatches() : this.buildDrawCalls();
		}
	}, t.prototype._compareStyles = function(e, t) {
		return !(!e || !t || e.texture.baseTexture !== t.texture.baseTexture || e.color + e.alpha !== t.color + t.alpha || !!e.native != !!t.native);
	}, t.prototype.validateBatching = function() {
		if (this.dirty === this.cacheDirty || !this.graphicsData.length) return !1;
		for (var e = 0, t = this.graphicsData.length; e < t; e++) {
			var n = this.graphicsData[e], r = n.fillStyle, i = n.lineStyle;
			if (r && !r.texture.baseTexture.valid || i && !i.texture.baseTexture.valid) return !1;
		}
		return !0;
	}, t.prototype.packBatches = function() {
		this.batchDirty++, this.uvsFloat32 = new Float32Array(this.uvs);
		for (var e = this.batches, t = 0, n = e.length; t < n; t++) for (var r = e[t], i = 0; i < r.size; i++) {
			var a = r.start + i;
			this.indicesUint16[a] = this.indicesUint16[a] - r.attribStart;
		}
	}, t.prototype.isBatchable = function() {
		if (this.points.length > 65535 * 2) return !1;
		for (var e = this.batches, n = 0; n < e.length; n++) if (e[n].style.native) return !1;
		return this.points.length < t.BATCHABLE_SIZE * 2;
	}, t.prototype.buildDrawCalls = function() {
		for (var e = ++Y._globalBatch, t = 0; t < this.drawCalls.length; t++) this.drawCalls[t].texArray.clear(), ds.push(this.drawCalls[t]);
		this.drawCalls.length = 0;
		var n = this.colors, r = this.textureIds, i = ds.pop();
		i || (i = new Oi(), i.texArray = new ki()), i.texArray.count = 0, i.start = 0, i.size = 0, i.type = j.TRIANGLES;
		var a = 0, o = null, s = 0, c = !1, l = j.TRIANGLES, u = 0;
		this.drawCalls.push(i);
		for (var t = 0; t < this.batches.length; t++) {
			var d = this.batches[t], f = 8, p = d.style, m = p.texture.baseTexture;
			c !== !!p.native && (c = !!p.native, l = c ? j.LINES : j.TRIANGLES, o = null, a = f, e++), o !== m && (o = m, m._batchEnabled !== e && (a === f && (e++, a = 0, i.size > 0 && (i = ds.pop(), i || (i = new Oi(), i.texArray = new ki()), this.drawCalls.push(i)), i.start = u, i.size = 0, i.texArray.count = 0, i.type = l), m.touched = 1, m._batchEnabled = e, m._batchLocation = a, m.wrapMode = ne.REPEAT, i.texArray.elements[i.texArray.count++] = m, a++)), i.size += d.size, u += d.size, s = m._batchLocation, this.addColors(n, p.color, p.alpha, d.attribSize, d.attribStart), this.addTextureIds(r, s, d.attribSize, d.attribStart);
		}
		Y._globalBatch = e, this.packAttributes();
	}, t.prototype.packAttributes = function() {
		for (var e = this.points, t = this.uvs, n = this.colors, r = this.textureIds, i = /* @__PURE__ */ new ArrayBuffer(e.length * 3 * 4), a = new Float32Array(i), o = new Uint32Array(i), s = 0, c = 0; c < e.length / 2; c++) a[s++] = e[c * 2], a[s++] = e[c * 2 + 1], a[s++] = t[c * 2], a[s++] = t[c * 2 + 1], o[s++] = n[c], a[s++] = r[c];
		this._buffer.update(i), this._indexBuffer.update(this.indicesUint16);
	}, t.prototype.processFill = function(e) {
		e.holes.length ? qo.triangulate(e, this) : ls[e.type].triangulate(e, this);
	}, t.prototype.processLine = function(e) {
		rs(e, this);
		for (var t = 0; t < e.holes.length; t++) rs(e.holes[t], this);
	}, t.prototype.processHoles = function(e) {
		for (var t = 0; t < e.length; t++) {
			var n = e[t];
			ls[n.type].build(n), n.matrix && this.transformPoints(n.points, n.matrix);
		}
	}, t.prototype.calculateBounds = function() {
		var e = this._bounds;
		e.clear(), e.addVertexData(this.points, 0, this.points.length), e.pad(this.boundsPadding, this.boundsPadding);
	}, t.prototype.transformPoints = function(e, t) {
		for (var n = 0; n < e.length / 2; n++) {
			var r = e[n * 2], i = e[n * 2 + 1];
			e[n * 2] = t.a * r + t.c * i + t.tx, e[n * 2 + 1] = t.b * r + t.d * i + t.ty;
		}
	}, t.prototype.addColors = function(e, t, n, r, i) {
		i === void 0 && (i = 0);
		var a = qe((t >> 16) + (t & 65280) + ((t & 255) << 16), n);
		e.length = Math.max(e.length, i + r);
		for (var o = 0; o < r; o++) e[i + o] = a;
	}, t.prototype.addTextureIds = function(e, t, n, r) {
		r === void 0 && (r = 0), e.length = Math.max(e.length, r + n);
		for (var i = 0; i < n; i++) e[r + i] = t;
	}, t.prototype.addUvs = function(e, t, n, r, i, a) {
		a === void 0 && (a = null);
		for (var o = 0, s = t.length, c = n.frame; o < i;) {
			var l = e[(r + o) * 2], u = e[(r + o) * 2 + 1];
			if (a) {
				var d = a.a * l + a.c * u + a.tx;
				u = a.b * l + a.d * u + a.ty, l = d;
			}
			o++, t.push(l / c.width, u / c.height);
		}
		var f = n.baseTexture;
		(c.width < f.width || c.height < f.height) && this.adjustUvs(t, n, s, i);
	}, t.prototype.adjustUvs = function(e, t, n, r) {
		for (var i = t.baseTexture, a = 1e-6, o = n + r * 2, s = t.frame, c = s.width / i.width, l = s.height / i.height, u = s.x / s.width, d = s.y / s.height, f = Math.floor(e[n] + a), p = Math.floor(e[n + 1] + a), m = n + 2; m < o; m += 2) f = Math.min(f, Math.floor(e[m] + a)), p = Math.min(p, Math.floor(e[m + 1] + a));
		u -= f, d -= p;
		for (var m = n; m < o; m += 2) e[m] = (e[m] + u) * c, e[m + 1] = (e[m + 1] + d) * l;
	}, t.BATCHABLE_SIZE = 100, t;
}(Ni), hs = function(e) {
	Go(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.width = 0, t.alignment = .5, t.native = !1, t.cap = Vo.BUTT, t.join = Bo.MITER, t.miterLimit = 10, t;
	}
	return t.prototype.clone = function() {
		var e = new t();
		return e.color = this.color, e.alpha = this.alpha, e.texture = this.texture, e.matrix = this.matrix, e.visible = this.visible, e.width = this.width, e.alignment = this.alignment, e.native = this.native, e.cap = this.cap, e.join = this.join, e.miterLimit = this.miterLimit, e;
	}, t.prototype.reset = function() {
		e.prototype.reset.call(this), this.color = 0, this.alignment = .5, this.width = 0, this.native = !1;
	}, t;
}(Uo), gs = /* @__PURE__ */ new Float32Array(3), _s = {}, vs = function(e) {
	Go(t, e);
	function t(t) {
		t === void 0 && (t = null);
		var n = e.call(this) || this;
		return n.shader = null, n.pluginName = "batch", n.currentPath = null, n.batches = [], n.batchTint = -1, n.batchDirty = -1, n.vertexData = null, n._fillStyle = new Uo(), n._lineStyle = new hs(), n._matrix = null, n._holeMode = !1, n.state = jr.for2d(), n._geometry = t || new ms(), n._geometry.refCount++, n._transformID = -1, n.tint = 16777215, n.blendMode = A.NORMAL, n;
	}
	return Object.defineProperty(t.prototype, "geometry", {
		get: function() {
			return this._geometry;
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype.clone = function() {
		return this.finishPoly(), new t(this._geometry);
	}, Object.defineProperty(t.prototype, "blendMode", {
		get: function() {
			return this.state.blendMode;
		},
		set: function(e) {
			this.state.blendMode = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "tint", {
		get: function() {
			return this._tint;
		},
		set: function(e) {
			this._tint = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "fill", {
		get: function() {
			return this._fillStyle;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "line", {
		get: function() {
			return this._lineStyle;
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype.lineStyle = function(e, t, n, r, i) {
		return e === void 0 && (e = null), t === void 0 && (t = 0), n === void 0 && (n = 1), r === void 0 && (r = .5), i === void 0 && (i = !1), typeof e == "number" && (e = {
			width: e,
			color: t,
			alpha: n,
			alignment: r,
			native: i
		}), this.lineTextureStyle(e);
	}, t.prototype.lineTextureStyle = function(e) {
		e = Object.assign({
			width: 0,
			texture: X.WHITE,
			color: e && e.texture ? 16777215 : 0,
			alpha: 1,
			matrix: null,
			alignment: .5,
			native: !1,
			cap: Vo.BUTT,
			join: Bo.MITER,
			miterLimit: 10
		}, e), this.currentPath && this.startPoly();
		var t = e.width > 0 && e.alpha > 0;
		return t ? (e.matrix && (e.matrix = e.matrix.clone(), e.matrix.invert()), Object.assign(this._lineStyle, { visible: t }, e)) : this._lineStyle.reset(), this;
	}, t.prototype.startPoly = function() {
		if (this.currentPath) {
			var e = this.currentPath.points, t = this.currentPath.points.length;
			t > 2 && (this.drawShape(this.currentPath), this.currentPath = new St(), this.currentPath.closeStroke = !1, this.currentPath.points.push(e[t - 2], e[t - 1]));
		} else this.currentPath = new St(), this.currentPath.closeStroke = !1;
	}, t.prototype.finishPoly = function() {
		this.currentPath && (this.currentPath.points.length > 2 ? (this.drawShape(this.currentPath), this.currentPath = null) : this.currentPath.points.length = 0);
	}, t.prototype.moveTo = function(e, t) {
		return this.startPoly(), this.currentPath.points[0] = e, this.currentPath.points[1] = t, this;
	}, t.prototype.lineTo = function(e, t) {
		this.currentPath || this.moveTo(0, 0);
		var n = this.currentPath.points, r = n[n.length - 2], i = n[n.length - 1];
		return (r !== e || i !== t) && n.push(e, t), this;
	}, t.prototype._initCurve = function(e, t) {
		e === void 0 && (e = 0), t === void 0 && (t = 0), this.currentPath ? this.currentPath.points.length === 0 && (this.currentPath.points = [e, t]) : this.moveTo(e, t);
	}, t.prototype.quadraticCurveTo = function(e, t, n, r) {
		this._initCurve();
		var i = this.currentPath.points;
		return i.length === 0 && this.moveTo(0, 0), os.curveTo(e, t, n, r, i), this;
	}, t.prototype.bezierCurveTo = function(e, t, n, r, i, a) {
		return this._initCurve(), as.curveTo(e, t, n, r, i, a, this.currentPath.points), this;
	}, t.prototype.arcTo = function(e, t, n, r, i) {
		this._initCurve(e, t);
		var a = this.currentPath.points, o = is.curveTo(e, t, n, r, i, a);
		if (o) {
			var s = o.cx, c = o.cy, l = o.radius, u = o.startAngle, d = o.endAngle, f = o.anticlockwise;
			this.arc(s, c, l, u, d, f);
		}
		return this;
	}, t.prototype.arc = function(e, t, n, r, i, a) {
		if (a === void 0 && (a = !1), r === i || (!a && i <= r ? i += ht : a && r <= i && (r += ht), i - r === 0)) return this;
		var o = e + Math.cos(r) * n, s = t + Math.sin(r) * n, c = this._geometry.closePointEps, l = this.currentPath ? this.currentPath.points : null;
		if (l) {
			var u = Math.abs(l[l.length - 2] - o), d = Math.abs(l[l.length - 1] - s);
			u < c && d < c || l.push(o, s);
		} else this.moveTo(o, s), l = this.currentPath.points;
		return is.arc(o, s, e, t, n, r, i, a, l), this;
	}, t.prototype.beginFill = function(e, t) {
		return e === void 0 && (e = 0), t === void 0 && (t = 1), this.beginTextureFill({
			texture: X.WHITE,
			color: e,
			alpha: t
		});
	}, t.prototype.beginTextureFill = function(e) {
		e = Object.assign({
			texture: X.WHITE,
			color: 16777215,
			alpha: 1,
			matrix: null
		}, e), this.currentPath && this.startPoly();
		var t = e.alpha > 0;
		return t ? (e.matrix && (e.matrix = e.matrix.clone(), e.matrix.invert()), Object.assign(this._fillStyle, { visible: t }, e)) : this._fillStyle.reset(), this;
	}, t.prototype.endFill = function() {
		return this.finishPoly(), this._fillStyle.reset(), this;
	}, t.prototype.drawRect = function(e, t, n, r) {
		return this.drawShape(new U(e, t, n, r));
	}, t.prototype.drawRoundedRect = function(e, t, n, r, i) {
		return this.drawShape(new Ct(e, t, n, r, i));
	}, t.prototype.drawCircle = function(e, t, n) {
		return this.drawShape(new bt(e, t, n));
	}, t.prototype.drawEllipse = function(e, t, n, r) {
		return this.drawShape(new xt(e, t, n, r));
	}, t.prototype.drawPolygon = function() {
		for (var e = arguments, t = [], n = 0; n < arguments.length; n++) t[n] = e[n];
		var r, i = !0, a = t[0];
		a.points ? (i = a.closeStroke, r = a.points) : r = Array.isArray(t[0]) ? t[0] : t;
		var o = new St(r);
		return o.closeStroke = i, this.drawShape(o), this;
	}, t.prototype.drawShape = function(e) {
		return this._holeMode ? this._geometry.drawHole(e, this._matrix) : this._geometry.drawShape(e, this._fillStyle.clone(), this._lineStyle.clone(), this._matrix), this;
	}, t.prototype.clear = function() {
		return this._geometry.clear(), this._lineStyle.reset(), this._fillStyle.reset(), this._boundsID++, this._matrix = null, this._holeMode = !1, this.currentPath = null, this;
	}, t.prototype.isFastRect = function() {
		var e = this._geometry.graphicsData;
		return e.length === 1 && e[0].shape.type === vt.RECT && !e[0].matrix && !e[0].holes.length && !(e[0].lineStyle.visible && e[0].lineStyle.width);
	}, t.prototype._render = function(e) {
		this.finishPoly();
		var t = this._geometry;
		t.updateBatches(), t.batchable ? (this.batchDirty !== t.batchDirty && this._populateBatches(), this._renderBatched(e)) : (e.batch.flush(), this._renderDirect(e));
	}, t.prototype._populateBatches = function() {
		var e = this._geometry, t = this.blendMode, n = e.batches.length;
		this.batchTint = -1, this._transformID = -1, this.batchDirty = e.batchDirty, this.batches.length = n, this.vertexData = new Float32Array(e.points);
		for (var r = 0; r < n; r++) {
			var i = e.batches[r], a = i.style.color, o = new Float32Array(this.vertexData.buffer, i.attribStart * 4 * 2, i.attribSize * 2), s = new Float32Array(e.uvsFloat32.buffer, i.attribStart * 4 * 2, i.attribSize * 2), c = {
				vertexData: o,
				blendMode: t,
				indices: new Uint16Array(e.indicesUint16.buffer, i.start * 2, i.size),
				uvs: s,
				_batchRGB: Be(a),
				_tintRGB: a,
				_texture: i.style.texture,
				alpha: i.style.alpha,
				worldAlpha: 1
			};
			this.batches[r] = c;
		}
	}, t.prototype._renderBatched = function(e) {
		if (this.batches.length) {
			e.batch.setObjectRenderer(e.plugins[this.pluginName]), this.calculateVertices(), this.calculateTints();
			for (var t = 0, n = this.batches.length; t < n; t++) {
				var r = this.batches[t];
				r.worldAlpha = this.worldAlpha * r.alpha, e.plugins[this.pluginName].render(r);
			}
		}
	}, t.prototype._renderDirect = function(e) {
		var t = this._resolveDirectShader(e), n = this._geometry, r = this.tint, i = this.worldAlpha, a = t.uniforms, o = n.drawCalls;
		a.translationMatrix = this.transform.worldTransform, a.tint[0] = (r >> 16 & 255) / 255 * i, a.tint[1] = (r >> 8 & 255) / 255 * i, a.tint[2] = (r & 255) / 255 * i, a.tint[3] = i, e.shader.bind(t), e.geometry.bind(n, t), e.state.set(this.state);
		for (var s = 0, c = o.length; s < c; s++) this._renderDrawCallDirect(e, n.drawCalls[s]);
	}, t.prototype._renderDrawCallDirect = function(e, t) {
		for (var n = t.texArray, r = t.type, i = t.size, a = t.start, o = n.count, s = 0; s < o; s++) e.texture.bind(n.elements[s], s);
		e.geometry.draw(r, i, a);
	}, t.prototype._resolveDirectShader = function(e) {
		var t = this.shader, n = this.pluginName;
		if (!t) {
			if (!_s[n]) {
				for (var r = e.plugins[n].MAX_TEXTURES, i = new Int32Array(r), a = 0; a < r; a++) i[a] = a;
				var o = {
					tint: new Float32Array([
						1,
						1,
						1,
						1
					]),
					translationMatrix: new W(),
					default: Nn.from({ uSamplers: i }, !0)
				}, s = e.plugins[n]._shader.program;
				_s[n] = new wr(s, o);
			}
			t = _s[n];
		}
		return t;
	}, t.prototype._calculateBounds = function() {
		this.finishPoly();
		var e = this._geometry;
		if (e.graphicsData.length) {
			var t = e.bounds, n = t.minX, r = t.minY, i = t.maxX, a = t.maxY;
			this._bounds.addFrame(this.transform, n, r, i, a);
		}
	}, t.prototype.containsPoint = function(e) {
		return this.worldTransform.applyInverse(e, t._TEMP_POINT), this._geometry.containsPoint(t._TEMP_POINT);
	}, t.prototype.calculateTints = function() {
		if (this.batchTint !== this.tint) {
			this.batchTint = this.tint;
			for (var e = Be(this.tint, gs), t = 0; t < this.batches.length; t++) {
				var n = this.batches[t], r = n._batchRGB, i = e[0] * r[0] * 255, a = e[1] * r[1] * 255, o = e[2] * r[2] * 255, s = (i << 16) + (a << 8) + (o | 0);
				n._tintRGB = (s >> 16) + (s & 65280) + ((s & 255) << 16);
			}
		}
	}, t.prototype.calculateVertices = function() {
		var e = this.transform._worldID;
		if (this._transformID !== e) {
			this._transformID = e;
			for (var t = this.transform.worldTransform, n = t.a, r = t.b, i = t.c, a = t.d, o = t.tx, s = t.ty, c = this._geometry.points, l = this.vertexData, u = 0, d = 0; d < c.length; d += 2) {
				var f = c[d], p = c[d + 1];
				l[u++] = n * f + i * p + o, l[u++] = a * p + r * f + s;
			}
		}
	}, t.prototype.closePath = function() {
		var e = this.currentPath;
		return e && (e.closeStroke = !0, this.finishPoly()), this;
	}, t.prototype.setMatrix = function(e) {
		return this._matrix = e, this;
	}, t.prototype.beginHole = function() {
		return this.finishPoly(), this._holeMode = !0, this;
	}, t.prototype.endHole = function() {
		return this.finishPoly(), this._holeMode = !1, this;
	}, t.prototype.destroy = function(t) {
		this._geometry.refCount--, this._geometry.refCount === 0 && this._geometry.dispose(), this._matrix = null, this.currentPath = null, this._lineStyle.destroy(), this._lineStyle = null, this._fillStyle.destroy(), this._fillStyle = null, this._geometry = null, this.shader = null, this.vertexData = null, this.batches.length = 0, this.batches = null, e.prototype.destroy.call(this, t);
	}, t.nextRoundedRectBehavior = !1, t._TEMP_POINT = new H(), t;
}(zt), ys = function(e, t) {
	return ys = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, ys(e, t);
};
function bs(e, t) {
	ys(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var xs = new H(), Ss = new Uint16Array([
	0,
	1,
	2,
	0,
	2,
	3
]), Cs = function(e) {
	bs(t, e);
	function t(t) {
		var n = e.call(this) || this;
		return n._anchor = new wt(n._onAnchorUpdate, n, t ? t.defaultAnchor.x : 0, t ? t.defaultAnchor.y : 0), n._texture = null, n._width = 0, n._height = 0, n._tint = null, n._tintRGB = null, n.tint = 16777215, n.blendMode = A.NORMAL, n._cachedTint = 16777215, n.uvs = null, n.texture = t || X.EMPTY, n.vertexData = /* @__PURE__ */ new Float32Array(8), n.vertexTrimmedData = null, n._transformID = -1, n._textureID = -1, n._transformTrimmedID = -1, n._textureTrimmedID = -1, n.indices = Ss, n.pluginName = "batch", n.isSprite = !0, n._roundPixels = V.ROUND_PIXELS, n;
	}
	return t.prototype._onTextureUpdate = function() {
		this._textureID = -1, this._textureTrimmedID = -1, this._cachedTint = 16777215, this._width && (this.scale.x = tt(this.scale.x) * this._width / this._texture.orig.width), this._height && (this.scale.y = tt(this.scale.y) * this._height / this._texture.orig.height);
	}, t.prototype._onAnchorUpdate = function() {
		this._transformID = -1, this._transformTrimmedID = -1;
	}, t.prototype.calculateVertices = function() {
		var e = this._texture;
		if (!(this._transformID === this.transform._worldID && this._textureID === e._updateID)) {
			this._textureID !== e._updateID && (this.uvs = this._texture._uvs.uvsFloat32), this._transformID = this.transform._worldID, this._textureID = e._updateID;
			var t = this.transform.worldTransform, n = t.a, r = t.b, i = t.c, a = t.d, o = t.tx, s = t.ty, c = this.vertexData, l = e.trim, u = e.orig, d = this._anchor, f = 0, p = 0, m = 0, h = 0;
			if (l ? (p = l.x - d._x * u.width, f = p + l.width, h = l.y - d._y * u.height, m = h + l.height) : (p = -d._x * u.width, f = p + u.width, h = -d._y * u.height, m = h + u.height), c[0] = n * p + i * h + o, c[1] = a * h + r * p + s, c[2] = n * f + i * h + o, c[3] = a * h + r * f + s, c[4] = n * f + i * m + o, c[5] = a * m + r * f + s, c[6] = n * p + i * m + o, c[7] = a * m + r * p + s, this._roundPixels) for (var g = V.RESOLUTION, _ = 0; _ < c.length; ++_) c[_] = Math.round((c[_] * g | 0) / g);
		}
	}, t.prototype.calculateTrimmedVertices = function() {
		if (!this.vertexTrimmedData) this.vertexTrimmedData = /* @__PURE__ */ new Float32Array(8);
		else if (this._transformTrimmedID === this.transform._worldID && this._textureTrimmedID === this._texture._updateID) return;
		this._transformTrimmedID = this.transform._worldID, this._textureTrimmedID = this._texture._updateID;
		var e = this._texture, t = this.vertexTrimmedData, n = e.orig, r = this._anchor, i = this.transform.worldTransform, a = i.a, o = i.b, s = i.c, c = i.d, l = i.tx, u = i.ty, d = -r._x * n.width, f = d + n.width, p = -r._y * n.height, m = p + n.height;
		t[0] = a * d + s * p + l, t[1] = c * p + o * d + u, t[2] = a * f + s * p + l, t[3] = c * p + o * f + u, t[4] = a * f + s * m + l, t[5] = c * m + o * f + u, t[6] = a * d + s * m + l, t[7] = c * m + o * d + u;
	}, t.prototype._render = function(e) {
		this.calculateVertices(), e.batch.setObjectRenderer(e.plugins[this.pluginName]), e.plugins[this.pluginName].render(this);
	}, t.prototype._calculateBounds = function() {
		var e = this._texture.trim, t = this._texture.orig;
		!e || e.width === t.width && e.height === t.height ? (this.calculateVertices(), this._bounds.addQuad(this.vertexData)) : (this.calculateTrimmedVertices(), this._bounds.addQuad(this.vertexTrimmedData));
	}, t.prototype.getLocalBounds = function(t) {
		return this.children.length === 0 ? (this._localBounds ||= new Pt(), this._localBounds.minX = this._texture.orig.width * -this._anchor._x, this._localBounds.minY = this._texture.orig.height * -this._anchor._y, this._localBounds.maxX = this._texture.orig.width * (1 - this._anchor._x), this._localBounds.maxY = this._texture.orig.height * (1 - this._anchor._y), t ||= (this._localBoundsRect ||= new U(), this._localBoundsRect), this._localBounds.getRectangle(t)) : e.prototype.getLocalBounds.call(this, t);
	}, t.prototype.containsPoint = function(e) {
		this.worldTransform.applyInverse(e, xs);
		var t = this._texture.orig.width, n = this._texture.orig.height, r = -t * this.anchor.x, i = 0;
		return xs.x >= r && xs.x < r + t && (i = -n * this.anchor.y, xs.y >= i && xs.y < i + n);
	}, t.prototype.destroy = function(t) {
		if (e.prototype.destroy.call(this, t), this._texture.off("update", this._onTextureUpdate, this), this._anchor = null, typeof t == "boolean" ? t : t && t.texture) {
			var n = typeof t == "boolean" ? t : t && t.baseTexture;
			this._texture.destroy(!!n);
		}
		this._texture = null;
	}, t.from = function(e, n) {
		return new t(e instanceof X ? e : X.from(e, n));
	}, Object.defineProperty(t.prototype, "roundPixels", {
		get: function() {
			return this._roundPixels;
		},
		set: function(e) {
			this._roundPixels !== e && (this._transformID = -1), this._roundPixels = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "width", {
		get: function() {
			return Math.abs(this.scale.x) * this._texture.orig.width;
		},
		set: function(e) {
			var t = tt(this.scale.x) || 1;
			this.scale.x = t * e / this._texture.orig.width, this._width = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "height", {
		get: function() {
			return Math.abs(this.scale.y) * this._texture.orig.height;
		},
		set: function(e) {
			var t = tt(this.scale.y) || 1;
			this.scale.y = t * e / this._texture.orig.height, this._height = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "anchor", {
		get: function() {
			return this._anchor;
		},
		set: function(e) {
			this._anchor.copyFrom(e);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "tint", {
		get: function() {
			return this._tint;
		},
		set: function(e) {
			this._tint = e, this._tintRGB = (e >> 16) + (e & 65280) + ((e & 255) << 16);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "texture", {
		get: function() {
			return this._texture;
		},
		set: function(e) {
			this._texture !== e && (this._texture && this._texture.off("update", this._onTextureUpdate, this), this._texture = e || X.EMPTY, this._cachedTint = 16777215, this._textureID = -1, this._textureTrimmedID = -1, e && (e.baseTexture.valid ? this._onTextureUpdate() : e.once("update", this._onTextureUpdate, this)));
		},
		enumerable: !1,
		configurable: !0
	}), t;
}(zt), ws = function(e, t) {
	return ws = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, ws(e, t);
};
function Ts(e, t) {
	ws(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var Es;
(function(e) {
	e[e.LINEAR_VERTICAL = 0] = "LINEAR_VERTICAL", e[e.LINEAR_HORIZONTAL = 1] = "LINEAR_HORIZONTAL";
})(Es ||= {});
var Ds = {
	align: "left",
	breakWords: !1,
	dropShadow: !1,
	dropShadowAlpha: 1,
	dropShadowAngle: Math.PI / 6,
	dropShadowBlur: 0,
	dropShadowColor: "black",
	dropShadowDistance: 5,
	fill: "black",
	fillGradientType: Es.LINEAR_VERTICAL,
	fillGradientStops: [],
	fontFamily: "Arial",
	fontSize: 26,
	fontStyle: "normal",
	fontVariant: "normal",
	fontWeight: "normal",
	letterSpacing: 0,
	lineHeight: 0,
	lineJoin: "miter",
	miterLimit: 10,
	padding: 0,
	stroke: "black",
	strokeThickness: 0,
	textBaseline: "alphabetic",
	trim: !1,
	whiteSpace: "pre",
	wordWrap: !1,
	wordWrapWidth: 100,
	leading: 0
}, Os = [
	"serif",
	"sans-serif",
	"monospace",
	"cursive",
	"fantasy",
	"system-ui"
], ks = function() {
	function e(e) {
		this.styleID = 0, this.reset(), Ns(this, e, e);
	}
	return e.prototype.clone = function() {
		var t = {};
		return Ns(t, this, Ds), new e(t);
	}, e.prototype.reset = function() {
		Ns(this, Ds, Ds);
	}, Object.defineProperty(e.prototype, "align", {
		get: function() {
			return this._align;
		},
		set: function(e) {
			this._align !== e && (this._align = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "breakWords", {
		get: function() {
			return this._breakWords;
		},
		set: function(e) {
			this._breakWords !== e && (this._breakWords = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "dropShadow", {
		get: function() {
			return this._dropShadow;
		},
		set: function(e) {
			this._dropShadow !== e && (this._dropShadow = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "dropShadowAlpha", {
		get: function() {
			return this._dropShadowAlpha;
		},
		set: function(e) {
			this._dropShadowAlpha !== e && (this._dropShadowAlpha = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "dropShadowAngle", {
		get: function() {
			return this._dropShadowAngle;
		},
		set: function(e) {
			this._dropShadowAngle !== e && (this._dropShadowAngle = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "dropShadowBlur", {
		get: function() {
			return this._dropShadowBlur;
		},
		set: function(e) {
			this._dropShadowBlur !== e && (this._dropShadowBlur = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "dropShadowColor", {
		get: function() {
			return this._dropShadowColor;
		},
		set: function(e) {
			var t = js(e);
			this._dropShadowColor !== t && (this._dropShadowColor = t, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "dropShadowDistance", {
		get: function() {
			return this._dropShadowDistance;
		},
		set: function(e) {
			this._dropShadowDistance !== e && (this._dropShadowDistance = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "fill", {
		get: function() {
			return this._fill;
		},
		set: function(e) {
			var t = js(e);
			this._fill !== t && (this._fill = t, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "fillGradientType", {
		get: function() {
			return this._fillGradientType;
		},
		set: function(e) {
			this._fillGradientType !== e && (this._fillGradientType = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "fillGradientStops", {
		get: function() {
			return this._fillGradientStops;
		},
		set: function(e) {
			Ms(this._fillGradientStops, e) || (this._fillGradientStops = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "fontFamily", {
		get: function() {
			return this._fontFamily;
		},
		set: function(e) {
			this.fontFamily !== e && (this._fontFamily = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "fontSize", {
		get: function() {
			return this._fontSize;
		},
		set: function(e) {
			this._fontSize !== e && (this._fontSize = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "fontStyle", {
		get: function() {
			return this._fontStyle;
		},
		set: function(e) {
			this._fontStyle !== e && (this._fontStyle = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "fontVariant", {
		get: function() {
			return this._fontVariant;
		},
		set: function(e) {
			this._fontVariant !== e && (this._fontVariant = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "fontWeight", {
		get: function() {
			return this._fontWeight;
		},
		set: function(e) {
			this._fontWeight !== e && (this._fontWeight = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "letterSpacing", {
		get: function() {
			return this._letterSpacing;
		},
		set: function(e) {
			this._letterSpacing !== e && (this._letterSpacing = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "lineHeight", {
		get: function() {
			return this._lineHeight;
		},
		set: function(e) {
			this._lineHeight !== e && (this._lineHeight = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "leading", {
		get: function() {
			return this._leading;
		},
		set: function(e) {
			this._leading !== e && (this._leading = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "lineJoin", {
		get: function() {
			return this._lineJoin;
		},
		set: function(e) {
			this._lineJoin !== e && (this._lineJoin = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "miterLimit", {
		get: function() {
			return this._miterLimit;
		},
		set: function(e) {
			this._miterLimit !== e && (this._miterLimit = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "padding", {
		get: function() {
			return this._padding;
		},
		set: function(e) {
			this._padding !== e && (this._padding = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "stroke", {
		get: function() {
			return this._stroke;
		},
		set: function(e) {
			var t = js(e);
			this._stroke !== t && (this._stroke = t, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "strokeThickness", {
		get: function() {
			return this._strokeThickness;
		},
		set: function(e) {
			this._strokeThickness !== e && (this._strokeThickness = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "textBaseline", {
		get: function() {
			return this._textBaseline;
		},
		set: function(e) {
			this._textBaseline !== e && (this._textBaseline = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "trim", {
		get: function() {
			return this._trim;
		},
		set: function(e) {
			this._trim !== e && (this._trim = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "whiteSpace", {
		get: function() {
			return this._whiteSpace;
		},
		set: function(e) {
			this._whiteSpace !== e && (this._whiteSpace = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "wordWrap", {
		get: function() {
			return this._wordWrap;
		},
		set: function(e) {
			this._wordWrap !== e && (this._wordWrap = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "wordWrapWidth", {
		get: function() {
			return this._wordWrapWidth;
		},
		set: function(e) {
			this._wordWrapWidth !== e && (this._wordWrapWidth = e, this.styleID++);
		},
		enumerable: !1,
		configurable: !0
	}), e.prototype.toFontString = function() {
		var e = typeof this.fontSize == "number" ? this.fontSize + "px" : this.fontSize, t = this.fontFamily;
		Array.isArray(this.fontFamily) || (t = this.fontFamily.split(","));
		for (var n = t.length - 1; n >= 0; n--) {
			var r = t[n].trim();
			!/([\"\'])[^\'\"]+\1/.test(r) && Os.indexOf(r) < 0 && (r = "\"" + r + "\""), t[n] = r;
		}
		return this.fontStyle + " " + this.fontVariant + " " + this.fontWeight + " " + e + " " + t.join(",");
	}, e;
}();
function As(e) {
	return typeof e == "number" ? Ve(e) : (typeof e == "string" && e.indexOf("0x") === 0 && (e = e.replace("0x", "#")), e);
}
function js(e) {
	if (Array.isArray(e)) {
		for (var t = 0; t < e.length; ++t) e[t] = As(e[t]);
		return e;
	} else return As(e);
}
function Ms(e, t) {
	if (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length) return !1;
	for (var n = 0; n < e.length; ++n) if (e[n] !== t[n]) return !1;
	return !0;
}
function Ns(e, t, n) {
	for (var r in n) Array.isArray(t[r]) ? e[r] = t[r].slice() : e[r] = t[r];
}
var Ps = { willReadFrequently: !0 }, Fs = function() {
	function e(e, t, n, r, i, a, o, s, c) {
		this.text = e, this.style = t, this.width = n, this.height = r, this.lines = i, this.lineWidths = a, this.lineHeight = o, this.maxLineWidth = s, this.fontProperties = c;
	}
	return e.measureText = function(t, n, r, i) {
		i === void 0 && (i = e._canvas), r ??= n.wordWrap;
		var a = n.toFontString(), o = e.measureFont(a);
		o.fontSize === 0 && (o.fontSize = n.fontSize, o.ascent = n.fontSize);
		var s = i.getContext("2d", Ps);
		s.font = a;
		for (var c = (r ? e.wordWrap(t, n, i) : t).split(/(?:\r\n|\r|\n)/), l = Array(c.length), u = 0, d = 0; d < c.length; d++) {
			var f = s.measureText(c[d]).width + (c[d].length - 1) * n.letterSpacing;
			l[d] = f, u = Math.max(u, f);
		}
		var p = u + n.strokeThickness;
		n.dropShadow && (p += n.dropShadowDistance);
		var m = n.lineHeight || o.fontSize + n.strokeThickness, h = Math.max(m, o.fontSize + n.strokeThickness) + (c.length - 1) * (m + n.leading);
		return n.dropShadow && (h += n.dropShadowDistance), new e(t, n, p, h, c, l, m + n.leading, u, o);
	}, e.wordWrap = function(t, n, r) {
		r === void 0 && (r = e._canvas);
		for (var i = r.getContext("2d", Ps), a = 0, o = "", s = "", c = Object.create(null), l = n.letterSpacing, u = n.whiteSpace, d = e.collapseSpaces(u), f = e.collapseNewlines(u), p = !d, m = n.wordWrapWidth + l, h = e.tokenize(t), g = 0; g < h.length; g++) {
			var _ = h[g];
			if (e.isNewline(_)) {
				if (!f) {
					s += e.addLine(o), p = !d, o = "", a = 0;
					continue;
				}
				_ = " ";
			}
			if (d) {
				var v = e.isBreakingSpace(_), y = e.isBreakingSpace(o[o.length - 1]);
				if (v && y) continue;
			}
			var b = e.getFromCache(_, l, c, i);
			if (b > m) if (o !== "" && (s += e.addLine(o), o = "", a = 0), e.canBreakWords(_, n.breakWords)) for (var x = e.wordWrapSplit(_), S = 0; S < x.length; S++) {
				for (var C = x[S], w = 1; x[S + w];) {
					var T = x[S + w], E = C[C.length - 1];
					if (!e.canBreakChars(E, T, _, S, n.breakWords)) C += T;
					else break;
					w++;
				}
				S += C.length - 1;
				var D = e.getFromCache(C, l, c, i);
				D + a > m && (s += e.addLine(o), p = !1, o = "", a = 0), o += C, a += D;
			}
			else {
				o.length > 0 && (s += e.addLine(o), o = "", a = 0);
				var O = g === h.length - 1;
				s += e.addLine(_, !O), p = !1, o = "", a = 0;
			}
			else b + a > m && (p = !1, s += e.addLine(o), o = "", a = 0), (o.length > 0 || !e.isBreakingSpace(_) || p) && (o += _, a += b);
		}
		return s += e.addLine(o, !1), s;
	}, e.addLine = function(t, n) {
		return n === void 0 && (n = !0), t = e.trimRight(t), t = n ? t + "\n" : t, t;
	}, e.getFromCache = function(e, t, n, r) {
		var i = n[e];
		if (typeof i != "number") {
			var a = e.length * t;
			i = r.measureText(e).width + a, n[e] = i;
		}
		return i;
	}, e.collapseSpaces = function(e) {
		return e === "normal" || e === "pre-line";
	}, e.collapseNewlines = function(e) {
		return e === "normal";
	}, e.trimRight = function(t) {
		if (typeof t != "string") return "";
		for (var n = t.length - 1; n >= 0; n--) {
			var r = t[n];
			if (!e.isBreakingSpace(r)) break;
			t = t.slice(0, -1);
		}
		return t;
	}, e.isNewline = function(t) {
		return typeof t == "string" && e._newlines.indexOf(t.charCodeAt(0)) >= 0;
	}, e.isBreakingSpace = function(t, n) {
		return typeof t == "string" && e._breakingSpaces.indexOf(t.charCodeAt(0)) >= 0;
	}, e.tokenize = function(t) {
		var n = [], r = "";
		if (typeof t != "string") return n;
		for (var i = 0; i < t.length; i++) {
			var a = t[i], o = t[i + 1];
			if (e.isBreakingSpace(a, o) || e.isNewline(a)) {
				r !== "" && (n.push(r), r = ""), n.push(a);
				continue;
			}
			r += a;
		}
		return r !== "" && n.push(r), n;
	}, e.canBreakWords = function(e, t) {
		return t;
	}, e.canBreakChars = function(e, t, n, r, i) {
		return !0;
	}, e.wordWrapSplit = function(e) {
		return e.split("");
	}, e.measureFont = function(t) {
		if (e._fonts[t]) return e._fonts[t];
		var n = {
			ascent: 0,
			descent: 0,
			fontSize: 0
		}, r = e._canvas, i = e._context;
		i.font = t;
		var a = e.METRICS_STRING + e.BASELINE_SYMBOL, o = Math.ceil(i.measureText(a).width), s = Math.ceil(i.measureText(e.BASELINE_SYMBOL).width), c = Math.ceil(e.HEIGHT_MULTIPLIER * s);
		s = s * e.BASELINE_MULTIPLIER | 0, r.width = o, r.height = c, i.fillStyle = "#f00", i.fillRect(0, 0, o, c), i.font = t, i.textBaseline = "alphabetic", i.fillStyle = "#000", i.fillText(a, 0, s);
		var l = i.getImageData(0, 0, o, c).data, u = l.length, d = o * 4, f = 0, p = 0, m = !1;
		for (f = 0; f < s; ++f) {
			for (var h = 0; h < d; h += 4) if (l[p + h] !== 255) {
				m = !0;
				break;
			}
			if (!m) p += d;
			else break;
		}
		for (n.ascent = s - f, p = u - d, m = !1, f = c; f > s; --f) {
			for (var h = 0; h < d; h += 4) if (l[p + h] !== 255) {
				m = !0;
				break;
			}
			if (!m) p -= d;
			else break;
		}
		return n.descent = f - s, n.fontSize = n.ascent + n.descent, e._fonts[t] = n, n;
	}, e.clearMetrics = function(t) {
		t === void 0 && (t = ""), t ? delete e._fonts[t] : e._fonts = {};
	}, Object.defineProperty(e, "_canvas", {
		get: function() {
			if (!e.__canvas) {
				var t = void 0;
				try {
					var n = new OffscreenCanvas(0, 0), r = n.getContext("2d", Ps);
					if (r && r.measureText) return e.__canvas = n, n;
					t = V.ADAPTER.createCanvas();
				} catch {
					t = V.ADAPTER.createCanvas();
				}
				t.width = t.height = 10, e.__canvas = t;
			}
			return e.__canvas;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e, "_context", {
		get: function() {
			return e.__context ||= e._canvas.getContext("2d", Ps), e.__context;
		},
		enumerable: !1,
		configurable: !0
	}), e;
}();
Fs._fonts = {}, Fs.METRICS_STRING = "|ÉqÅ", Fs.BASELINE_SYMBOL = "M", Fs.BASELINE_MULTIPLIER = 1.4, Fs.HEIGHT_MULTIPLIER = 2, Fs._newlines = [10, 13], Fs._breakingSpaces = [
	9,
	32,
	8192,
	8193,
	8194,
	8195,
	8196,
	8197,
	8198,
	8200,
	8201,
	8202,
	8287,
	12288
];
var Is = {
	texture: !0,
	children: !1,
	baseTexture: !0
}, Ls = function(e) {
	Ts(t, e);
	function t(t, n, r) {
		var i = this, a = !1;
		r || (r = V.ADAPTER.createCanvas(), a = !0), r.width = 3, r.height = 3;
		var o = X.from(r);
		return o.orig = new U(), o.trim = new U(), i = e.call(this, o) || this, i._ownCanvas = a, i.canvas = r, i.context = r.getContext("2d", { willReadFrequently: !0 }), i._resolution = V.RESOLUTION, i._autoResolution = !0, i._text = null, i._style = null, i._styleListener = null, i._font = "", i.text = t, i.style = n, i.localStyleID = -1, i;
	}
	return t.prototype.updateText = function(e) {
		var n = this._style;
		if (this.localStyleID !== n.styleID && (this.dirty = !0, this.localStyleID = n.styleID), !(!this.dirty && e)) {
			this._font = this._style.toFontString();
			var r = this.context, i = Fs.measureText(this._text || " ", this._style, this._style.wordWrap, this.canvas), a = i.width, o = i.height, s = i.lines, c = i.lineHeight, l = i.lineWidths, u = i.maxLineWidth, d = i.fontProperties;
			this.canvas.width = Math.ceil(Math.ceil(Math.max(1, a) + n.padding * 2) * this._resolution), this.canvas.height = Math.ceil(Math.ceil(Math.max(1, o) + n.padding * 2) * this._resolution), r.scale(this._resolution, this._resolution), r.clearRect(0, 0, this.canvas.width, this.canvas.height), r.font = this._font, r.lineWidth = n.strokeThickness, r.textBaseline = n.textBaseline, r.lineJoin = n.lineJoin, r.miterLimit = n.miterLimit;
			for (var f, p, m = n.dropShadow ? 2 : 1, h = 0; h < m; ++h) {
				var g = n.dropShadow && h === 0, _ = g ? Math.ceil(Math.max(1, o) + n.padding * 2) : 0, v = _ * this._resolution;
				if (g) {
					r.fillStyle = "black", r.strokeStyle = "black";
					var y = n.dropShadowColor, b = Be(typeof y == "number" ? y : He(y)), x = n.dropShadowBlur * this._resolution, S = n.dropShadowDistance * this._resolution;
					r.shadowColor = "rgba(" + b[0] * 255 + "," + b[1] * 255 + "," + b[2] * 255 + "," + n.dropShadowAlpha + ")", r.shadowBlur = x, r.shadowOffsetX = Math.cos(n.dropShadowAngle) * S, r.shadowOffsetY = Math.sin(n.dropShadowAngle) * S + v;
				} else r.fillStyle = this._generateFillStyle(n, s, i), r.strokeStyle = n.stroke, r.shadowColor = "black", r.shadowBlur = 0, r.shadowOffsetX = 0, r.shadowOffsetY = 0;
				var C = (c - d.fontSize) / 2;
				(!t.nextLineHeightBehavior || c - d.fontSize < 0) && (C = 0);
				for (var w = 0; w < s.length; w++) f = n.strokeThickness / 2, p = n.strokeThickness / 2 + w * c + d.ascent + C, n.align === "right" ? f += u - l[w] : n.align === "center" && (f += (u - l[w]) / 2), n.stroke && n.strokeThickness && this.drawLetterSpacing(s[w], f + n.padding, p + n.padding - _, !0), n.fill && this.drawLetterSpacing(s[w], f + n.padding, p + n.padding - _);
			}
			this.updateTexture();
		}
	}, t.prototype.drawLetterSpacing = function(e, n, r, i) {
		i === void 0 && (i = !1);
		var a = this._style.letterSpacing, o = t.experimentalLetterSpacing && ("letterSpacing" in CanvasRenderingContext2D.prototype || "textLetterSpacing" in CanvasRenderingContext2D.prototype);
		if (a === 0 || o) {
			o && (this.context.letterSpacing = a, this.context.textLetterSpacing = a), i ? this.context.strokeText(e, n, r) : this.context.fillText(e, n, r);
			return;
		}
		for (var s = n, c = Array.from ? Array.from(e) : e.split(""), l = this.context.measureText(e).width, u = 0, d = 0; d < c.length; ++d) {
			var f = c[d];
			i ? this.context.strokeText(f, s, r) : this.context.fillText(f, s, r);
			for (var p = "", m = d + 1; m < c.length; ++m) p += c[m];
			u = this.context.measureText(p).width, s += l - u + a, l = u;
		}
	}, t.prototype.updateTexture = function() {
		var e = this.canvas;
		if (this._style.trim) {
			var t = dt(e);
			t.data && (e.width = t.width, e.height = t.height, this.context.putImageData(t.data, 0, 0));
		}
		var n = this._texture, r = this._style, i = r.trim ? 0 : r.padding, a = n.baseTexture;
		n.trim.width = n._frame.width = e.width / this._resolution, n.trim.height = n._frame.height = e.height / this._resolution, n.trim.x = -i, n.trim.y = -i, n.orig.width = n._frame.width - i * 2, n.orig.height = n._frame.height - i * 2, this._onTextureUpdate(), a.setRealSize(e.width, e.height, this._resolution), n.updateUvs(), this.dirty = !1;
	}, t.prototype._render = function(t) {
		this._autoResolution && this._resolution !== t.resolution && (this._resolution = t.resolution, this.dirty = !0), this.updateText(!0), e.prototype._render.call(this, t);
	}, t.prototype.updateTransform = function() {
		this.updateText(!0), e.prototype.updateTransform.call(this);
	}, t.prototype.getBounds = function(t, n) {
		return this.updateText(!0), this._textureID === -1 && (t = !1), e.prototype.getBounds.call(this, t, n);
	}, t.prototype.getLocalBounds = function(t) {
		return this.updateText(!0), e.prototype.getLocalBounds.call(this, t);
	}, t.prototype._calculateBounds = function() {
		this.calculateVertices(), this._bounds.addQuad(this.vertexData);
	}, t.prototype._generateFillStyle = function(e, t, n) {
		var r = e.fill;
		if (!Array.isArray(r)) return r;
		if (r.length === 1) return r[0];
		var i, a = e.dropShadow ? e.dropShadowDistance : 0, o = e.padding || 0, s = this.canvas.width / this._resolution - a - o * 2, c = this.canvas.height / this._resolution - a - o * 2, l = r.slice(), u = e.fillGradientStops.slice();
		if (!u.length) for (var d = l.length + 1, f = 1; f < d; ++f) u.push(f / d);
		if (l.unshift(r[0]), u.unshift(0), l.push(r[r.length - 1]), u.push(1), e.fillGradientType === Es.LINEAR_VERTICAL) {
			i = this.context.createLinearGradient(s / 2, o, s / 2, c + o);
			for (var p = n.fontProperties.fontSize + e.strokeThickness, f = 0; f < t.length; f++) {
				var m = n.lineHeight * (f - 1) + p, h = n.lineHeight * f, g = h;
				f > 0 && m > h && (g = (h + m) / 2);
				var _ = h + p, v = n.lineHeight * (f + 1), y = _;
				f + 1 < t.length && v < _ && (y = (_ + v) / 2);
				for (var b = (y - g) / c, x = 0; x < l.length; x++) {
					var S = 0;
					S = typeof u[x] == "number" ? u[x] : x / l.length;
					var C = Math.min(1, Math.max(0, g / c + S * b));
					C = Number(C.toFixed(5)), i.addColorStop(C, l[x]);
				}
			}
		} else {
			i = this.context.createLinearGradient(o, c / 2, s + o, c / 2);
			for (var w = l.length + 1, T = 1, f = 0; f < l.length; f++) {
				var E = void 0;
				E = typeof u[f] == "number" ? u[f] : T / w, i.addColorStop(E, l[f]), T++;
			}
		}
		return i;
	}, t.prototype.destroy = function(t) {
		typeof t == "boolean" && (t = { children: t }), t = Object.assign({}, Is, t), e.prototype.destroy.call(this, t), this._ownCanvas && (this.canvas.height = this.canvas.width = 0), this.context = null, this.canvas = null, this._style = null;
	}, Object.defineProperty(t.prototype, "width", {
		get: function() {
			return this.updateText(!0), Math.abs(this.scale.x) * this._texture.orig.width;
		},
		set: function(e) {
			this.updateText(!0);
			var t = tt(this.scale.x) || 1;
			this.scale.x = t * e / this._texture.orig.width, this._width = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "height", {
		get: function() {
			return this.updateText(!0), Math.abs(this.scale.y) * this._texture.orig.height;
		},
		set: function(e) {
			this.updateText(!0);
			var t = tt(this.scale.y) || 1;
			this.scale.y = t * e / this._texture.orig.height, this._height = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "style", {
		get: function() {
			return this._style;
		},
		set: function(e) {
			e ||= {}, e instanceof ks ? this._style = e : this._style = new ks(e), this.localStyleID = -1, this.dirty = !0;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "text", {
		get: function() {
			return this._text;
		},
		set: function(e) {
			e = String(e ?? ""), this._text !== e && (this._text = e, this.dirty = !0);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "resolution", {
		get: function() {
			return this._resolution;
		},
		set: function(e) {
			this._autoResolution = !1, this._resolution !== e && (this._resolution = e, this.dirty = !0);
		},
		enumerable: !1,
		configurable: !0
	}), t.nextLineHeightBehavior = !1, t.experimentalLetterSpacing = !1, t;
}(Cs);
//#endregion
//#region node_modules/@pixi/prepare/dist/esm/prepare.mjs
V.UPLOADS_PER_FRAME = 4;
var Rs = function(e, t) {
	return Rs = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, Rs(e, t);
};
function zs(e, t) {
	Rs(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var Bs = function() {
	function e(e) {
		this.maxItemsPerFrame = e, this.itemsLeft = 0;
	}
	return e.prototype.beginFrame = function() {
		this.itemsLeft = this.maxItemsPerFrame;
	}, e.prototype.allowedToUpload = function() {
		return this.itemsLeft-- > 0;
	}, e;
}();
function Vs(e, t) {
	var n = !1;
	if (e && e._textures && e._textures.length) {
		for (var r = 0; r < e._textures.length; r++) if (e._textures[r] instanceof X) {
			var i = e._textures[r].baseTexture;
			t.indexOf(i) === -1 && (t.push(i), n = !0);
		}
	}
	return n;
}
function Hs(e, t) {
	if (e.baseTexture instanceof Y) {
		var n = e.baseTexture;
		return t.indexOf(n) === -1 && t.push(n), !0;
	}
	return !1;
}
function Us(e, t) {
	if (e._texture && e._texture instanceof X) {
		var n = e._texture.baseTexture;
		return t.indexOf(n) === -1 && t.push(n), !0;
	}
	return !1;
}
function Ws(e, t) {
	return t instanceof Ls ? (t.updateText(!0), !0) : !1;
}
function Gs(e, t) {
	if (t instanceof ks) {
		var n = t.toFontString();
		return Fs.measureFont(n), !0;
	}
	return !1;
}
function Ks(e, t) {
	if (e instanceof Ls) {
		t.indexOf(e.style) === -1 && t.push(e.style), t.indexOf(e) === -1 && t.push(e);
		var n = e._texture.baseTexture;
		return t.indexOf(n) === -1 && t.push(n), !0;
	}
	return !1;
}
function qs(e, t) {
	return e instanceof ks ? (t.indexOf(e) === -1 && t.push(e), !0) : !1;
}
var Js = function() {
	function e(e) {
		var t = this;
		this.limiter = new Bs(V.UPLOADS_PER_FRAME), this.renderer = e, this.uploadHookHelper = null, this.queue = [], this.addHooks = [], this.uploadHooks = [], this.completes = [], this.ticking = !1, this.delayedTick = function() {
			t.queue && t.prepareItems();
		}, this.registerFindHook(Ks), this.registerFindHook(qs), this.registerFindHook(Vs), this.registerFindHook(Hs), this.registerFindHook(Us), this.registerUploadHook(Ws), this.registerUploadHook(Gs);
	}
	return e.prototype.upload = function(e, t) {
		var n = this;
		return typeof e == "function" && (t = e, e = null), t && at("6.5.0", "BasePrepare.upload callback is deprecated, use the return Promise instead."), new Promise(function(r) {
			e && n.add(e);
			var i = function() {
				t?.(), r();
			};
			n.queue.length ? (n.completes.push(i), n.ticking || (n.ticking = !0, Kt.system.addOnce(n.tick, n, Wt.UTILITY))) : i();
		});
	}, e.prototype.tick = function() {
		setTimeout(this.delayedTick, 0);
	}, e.prototype.prepareItems = function() {
		for (this.limiter.beginFrame(); this.queue.length && this.limiter.allowedToUpload();) {
			var e = this.queue[0], t = !1;
			if (e && !e._destroyed) {
				for (var n = 0, r = this.uploadHooks.length; n < r; n++) if (this.uploadHooks[n](this.uploadHookHelper, e)) {
					this.queue.shift(), t = !0;
					break;
				}
			}
			t || this.queue.shift();
		}
		if (this.queue.length) Kt.system.addOnce(this.tick, this, Wt.UTILITY);
		else {
			this.ticking = !1;
			var i = this.completes.slice(0);
			this.completes.length = 0;
			for (var n = 0, r = i.length; n < r; n++) i[n]();
		}
	}, e.prototype.registerFindHook = function(e) {
		return e && this.addHooks.push(e), this;
	}, e.prototype.registerUploadHook = function(e) {
		return e && this.uploadHooks.push(e), this;
	}, e.prototype.add = function(e) {
		for (var t = 0, n = this.addHooks.length; t < n && !this.addHooks[t](e, this.queue); t++);
		if (e instanceof zt) for (var t = e.children.length - 1; t >= 0; t--) this.add(e.children[t]);
		return this;
	}, e.prototype.destroy = function() {
		this.ticking && Kt.system.remove(this.tick, this), this.ticking = !1, this.addHooks = null, this.uploadHooks = null, this.renderer = null, this.completes = null, this.queue = null, this.limiter = null, this.uploadHookHelper = null;
	}, e;
}();
function Ys(e, t) {
	return t instanceof Y ? (t._glTextures[e.CONTEXT_UID] || e.texture.bind(t), !0) : !1;
}
function Xs(e, t) {
	if (!(t instanceof vs)) return !1;
	var n = t.geometry;
	t.finishPoly(), n.updateBatches();
	for (var r = n.batches, i = 0; i < r.length; i++) {
		var a = r[i].style.texture;
		a && Ys(e, a.baseTexture);
	}
	return n.batchable || e.geometry.bind(n, t._resolveDirectShader(e)), !0;
}
function Zs(e, t) {
	return e instanceof vs ? (t.push(e), !0) : !1;
}
var Qs = function(e) {
	zs(t, e);
	function t(t) {
		var n = e.call(this, t) || this;
		return n.uploadHookHelper = n.renderer, n.registerFindHook(Zs), n.registerUploadHook(Ys), n.registerUploadHook(Xs), n;
	}
	return t.extension = {
		name: "prepare",
		type: q.RendererPlugin
	}, t;
}(Js);
(function() {
	function e(e) {
		this.maxMilliseconds = e, this.frameStart = 0;
	}
	return e.prototype.beginFrame = function() {
		this.frameStart = Date.now();
	}, e.prototype.allowedToUpload = function() {
		return Date.now() - this.frameStart < this.maxMilliseconds;
	}, e;
})();
//#endregion
//#region node_modules/@pixi/spritesheet/dist/esm/spritesheet.mjs
var $s = function() {
	function e(e, t, n) {
		n === void 0 && (n = null), this.linkedSheets = [], this._texture = e instanceof X ? e : null, this.baseTexture = e instanceof Y ? e : this._texture.baseTexture, this.textures = {}, this.animations = {}, this.data = t;
		var r = this.baseTexture.resource;
		this.resolution = this._updateResolution(n || (r ? r.url : null)), this._frames = this.data.frames, this._frameKeys = Object.keys(this._frames), this._batchIndex = 0, this._callback = null;
	}
	return e.prototype._updateResolution = function(e) {
		e === void 0 && (e = null);
		var t = this.data.meta.scale, n = mt(e, null);
		return n === null && (n = t === void 0 ? 1 : parseFloat(t)), n !== 1 && this.baseTexture.setResolution(n), n;
	}, e.prototype.parse = function(t) {
		var n = this;
		return t && at("6.5.0", "Spritesheet.parse callback is deprecated, use the return Promise instead."), new Promise(function(r) {
			n._callback = function(e) {
				t?.(e), r(e);
			}, n._batchIndex = 0, n._frameKeys.length <= e.BATCH_SIZE ? (n._processFrames(0), n._processAnimations(), n._parseComplete()) : n._nextBatch();
		});
	}, e.prototype._processFrames = function(t) {
		for (var n = t, r = e.BATCH_SIZE; n - t < r && n < this._frameKeys.length;) {
			var i = this._frameKeys[n], a = this._frames[i], o = a.frame;
			if (o) {
				var s = null, c = null, l = a.trimmed !== !1 && a.sourceSize ? a.sourceSize : a.frame, u = new U(0, 0, Math.floor(l.w) / this.resolution, Math.floor(l.h) / this.resolution);
				s = a.rotated ? new U(Math.floor(o.x) / this.resolution, Math.floor(o.y) / this.resolution, Math.floor(o.h) / this.resolution, Math.floor(o.w) / this.resolution) : new U(Math.floor(o.x) / this.resolution, Math.floor(o.y) / this.resolution, Math.floor(o.w) / this.resolution, Math.floor(o.h) / this.resolution), a.trimmed !== !1 && a.spriteSourceSize && (c = new U(Math.floor(a.spriteSourceSize.x) / this.resolution, Math.floor(a.spriteSourceSize.y) / this.resolution, Math.floor(o.w) / this.resolution, Math.floor(o.h) / this.resolution)), this.textures[i] = new X(this.baseTexture, s, u, c, a.rotated ? 2 : 0, a.anchor), X.addToCache(this.textures[i], i);
			}
			n++;
		}
	}, e.prototype._processAnimations = function() {
		var e = this.data.animations || {};
		for (var t in e) {
			this.animations[t] = [];
			for (var n = 0; n < e[t].length; n++) {
				var r = e[t][n];
				this.animations[t].push(this.textures[r]);
			}
		}
	}, e.prototype._parseComplete = function() {
		var e = this._callback;
		this._callback = null, this._batchIndex = 0, e.call(this, this.textures);
	}, e.prototype._nextBatch = function() {
		var t = this;
		this._processFrames(this._batchIndex * e.BATCH_SIZE), this._batchIndex++, setTimeout(function() {
			t._batchIndex * e.BATCH_SIZE < t._frameKeys.length ? t._nextBatch() : (t._processAnimations(), t._parseComplete());
		}, 0);
	}, e.prototype.destroy = function(e) {
		var t;
		for (var n in e === void 0 && (e = !1), this.textures) this.textures[n].destroy();
		this._frames = null, this._frameKeys = null, this.data = null, this.textures = null, e && ((t = this._texture) == null || t.destroy(), this.baseTexture.destroy()), this._texture = null, this.baseTexture = null, this.linkedSheets = [];
	}, e.BATCH_SIZE = 1e3, e;
}(), ec = function() {
	function e() {}
	return e.use = function(t, n) {
		var r = this, i = t.name + "_image";
		if (!t.data || t.type !== Z.TYPE.JSON || !t.data.frames || r.resources[i]) {
			n();
			return;
		}
		var a = t.data?.meta?.related_multi_packs;
		if (Array.isArray(a)) for (var o = function(e) {
			if (typeof e != "string") return "continue";
			var n = e.replace(".json", ""), i = Me.resolve(t.url.replace(r.baseUrl, ""), e);
			if (r.resources[n] || Object.values(r.resources).some(function(e) {
				return Me.format(Me.parse(e.url)) === i;
			})) return "continue";
			var a = {
				crossOrigin: t.crossOrigin,
				loadType: Z.LOAD_TYPE.XHR,
				xhrType: Z.XHR_RESPONSE_TYPE.JSON,
				parentResource: t,
				metadata: t.metadata
			};
			r.add(n, i, a);
		}, s = 0, c = a; s < c.length; s++) {
			var l = c[s];
			o(l);
		}
		var u = {
			crossOrigin: t.crossOrigin,
			metadata: t.metadata.imageMetadata,
			parentResource: t
		}, d = e.getResourcePath(t, r.baseUrl);
		r.add(i, d, u, function(e) {
			if (e.error) {
				n(e.error);
				return;
			}
			var r = new $s(e.texture, t.data, t.url);
			r.parse().then(function() {
				t.spritesheet = r, t.textures = r.textures, n();
			});
		});
	}, e.getResourcePath = function(e, t) {
		return e.isDataUrl ? e.data.meta.image : Me.resolve(e.url.replace(t, ""), e.data.meta.image);
	}, e.extension = q.Loader, e;
}(), tc = function(e, t) {
	return tc = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, tc(e, t);
};
function nc(e, t) {
	tc(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var rc = new H();
(function(e) {
	nc(t, e);
	function t(t, n, r) {
		n === void 0 && (n = 100), r === void 0 && (r = 100);
		var i = e.call(this, t) || this;
		return i.tileTransform = new Nt(), i._width = n, i._height = r, i.uvMatrix = i.texture.uvMatrix || new Rr(t), i.pluginName = "tilingSprite", i.uvRespectAnchor = !1, i;
	}
	return Object.defineProperty(t.prototype, "clampMargin", {
		get: function() {
			return this.uvMatrix.clampMargin;
		},
		set: function(e) {
			this.uvMatrix.clampMargin = e, this.uvMatrix.update(!0);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "tileScale", {
		get: function() {
			return this.tileTransform.scale;
		},
		set: function(e) {
			this.tileTransform.scale.copyFrom(e);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "tilePosition", {
		get: function() {
			return this.tileTransform.position;
		},
		set: function(e) {
			this.tileTransform.position.copyFrom(e);
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype._onTextureUpdate = function() {
		this.uvMatrix && (this.uvMatrix.texture = this._texture), this._cachedTint = 16777215;
	}, t.prototype._render = function(e) {
		var t = this._texture;
		!t || !t.valid || (this.tileTransform.updateLocalTransform(), this.uvMatrix.update(), e.batch.setObjectRenderer(e.plugins[this.pluginName]), e.plugins[this.pluginName].render(this));
	}, t.prototype._calculateBounds = function() {
		var e = this._width * -this._anchor._x, t = this._height * -this._anchor._y, n = this._width * (1 - this._anchor._x), r = this._height * (1 - this._anchor._y);
		this._bounds.addFrame(this.transform, e, t, n, r);
	}, t.prototype.getLocalBounds = function(t) {
		return this.children.length === 0 ? (this._bounds.minX = this._width * -this._anchor._x, this._bounds.minY = this._height * -this._anchor._y, this._bounds.maxX = this._width * (1 - this._anchor._x), this._bounds.maxY = this._height * (1 - this._anchor._y), t ||= (this._localBoundsRect ||= new U(), this._localBoundsRect), this._bounds.getRectangle(t)) : e.prototype.getLocalBounds.call(this, t);
	}, t.prototype.containsPoint = function(e) {
		this.worldTransform.applyInverse(e, rc);
		var t = this._width, n = this._height, r = -t * this.anchor._x;
		if (rc.x >= r && rc.x < r + t) {
			var i = -n * this.anchor._y;
			if (rc.y >= i && rc.y < i + n) return !0;
		}
		return !1;
	}, t.prototype.destroy = function(t) {
		e.prototype.destroy.call(this, t), this.tileTransform = null, this.uvMatrix = null;
	}, t.from = function(e, n) {
		return new t(e instanceof X ? e : X.from(e, n), n.width, n.height);
	}, Object.defineProperty(t.prototype, "width", {
		get: function() {
			return this._width;
		},
		set: function(e) {
			this._width = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "height", {
		get: function() {
			return this._height;
		},
		set: function(e) {
			this._height = e;
		},
		enumerable: !1,
		configurable: !0
	}), t;
})(Cs);
var ic = "#version 100\n#define SHADER_NAME Tiling-Sprite-Simple-100\n\nprecision lowp float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\n\nvoid main(void)\n{\n    vec4 texSample = texture2D(uSampler, vTextureCoord);\n    gl_FragColor = texSample * uColor;\n}\n", ac = "#version 100\n#define SHADER_NAME Tiling-Sprite-100\n\nprecision lowp float;\n\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n", oc = "#version 100\n#ifdef GL_EXT_shader_texture_lod\n    #extension GL_EXT_shader_texture_lod : enable\n#endif\n#define SHADER_NAME Tiling-Sprite-100\n\nprecision lowp float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\nuniform mat3 uMapCoord;\nuniform vec4 uClampFrame;\nuniform vec2 uClampOffset;\n\nvoid main(void)\n{\n    vec2 coord = vTextureCoord + ceil(uClampOffset - vTextureCoord);\n    coord = (uMapCoord * vec3(coord, 1.0)).xy;\n    vec2 unclamped = coord;\n    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);\n\n    #ifdef GL_EXT_shader_texture_lod\n        vec4 texSample = unclamped == coord\n            ? texture2D(uSampler, coord) \n            : texture2DLodEXT(uSampler, coord, 0);\n    #else\n        vec4 texSample = texture2D(uSampler, coord);\n    #endif\n\n    gl_FragColor = texSample * uColor;\n}\n", sc = "#version 300 es\n#define SHADER_NAME Tiling-Sprite-300\n\nprecision lowp float;\n\nin vec2 aVertexPosition;\nin vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nout vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n", cc = "#version 300 es\n#define SHADER_NAME Tiling-Sprite-100\n\nprecision lowp float;\n\nin vec2 vTextureCoord;\n\nout vec4 fragmentColor;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\nuniform mat3 uMapCoord;\nuniform vec4 uClampFrame;\nuniform vec2 uClampOffset;\n\nvoid main(void)\n{\n    vec2 coord = vTextureCoord + ceil(uClampOffset - vTextureCoord);\n    coord = (uMapCoord * vec3(coord, 1.0)).xy;\n    vec2 unclamped = coord;\n    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);\n\n    vec4 texSample = texture(uSampler, coord, unclamped == coord ? 0.0f : -32.0f);// lod-bias very negative to force lod 0\n\n    fragmentColor = texSample * uColor;\n}\n", lc = new W(), uc = function(e) {
	nc(t, e);
	function t(t) {
		var n = e.call(this, t) || this;
		return t.runners.contextChange.add(n), n.quad = new jn(), n.state = jr.for2d(), n;
	}
	return t.prototype.contextChange = function() {
		var e = this.renderer, t = { globals: e.globalUniforms };
		this.simpleShader = wr.from(ac, ic, t), this.shader = e.context.webGLVersion > 1 ? wr.from(sc, cc, t) : wr.from(ac, oc, t);
	}, t.prototype.render = function(e) {
		var t = this.renderer, n = this.quad, r = n.vertices;
		r[0] = r[6] = e._width * -e.anchor.x, r[1] = r[3] = e._height * -e.anchor.y, r[2] = r[4] = e._width * (1 - e.anchor.x), r[5] = r[7] = e._height * (1 - e.anchor.y);
		var i = e.uvRespectAnchor ? e.anchor.x : 0, a = e.uvRespectAnchor ? e.anchor.y : 0;
		r = n.uvs, r[0] = r[6] = -i, r[1] = r[3] = -a, r[2] = r[4] = 1 - i, r[5] = r[7] = 1 - a, n.invalidate();
		var o = e._texture, s = o.baseTexture, c = s.alphaMode > 0, l = e.tileTransform.localTransform, u = e.uvMatrix, d = s.isPowerOfTwo && o.frame.width === s.width && o.frame.height === s.height;
		d && (s._glTextures[t.CONTEXT_UID] ? d = s.wrapMode !== ne.CLAMP : s.wrapMode === ne.CLAMP && (s.wrapMode = ne.REPEAT));
		var f = d ? this.simpleShader : this.shader, p = o.width, m = o.height, h = e._width, g = e._height;
		lc.set(l.a * p / h, l.b * p / g, l.c * m / h, l.d * m / g, l.tx / h, l.ty / g), lc.invert(), d ? lc.prepend(u.mapCoord) : (f.uniforms.uMapCoord = u.mapCoord.toArray(!0), f.uniforms.uClampFrame = u.uClampFrame, f.uniforms.uClampOffset = u.uClampOffset), f.uniforms.uTransform = lc.toArray(!0), f.uniforms.uColor = Je(e.tint, e.worldAlpha, f.uniforms.uColor, c), f.uniforms.translationMatrix = e.transform.worldTransform.toArray(!0), f.uniforms.uSampler = o, t.shader.bind(f), t.geometry.bind(n), this.state.blendMode = Ge(e.blendMode, c), t.state.set(this.state), t.geometry.draw(this.renderer.gl.TRIANGLES, 6, 0);
	}, t.extension = {
		name: "tilingSprite",
		type: q.RendererPlugin
	}, t;
}(Rn), dc = function(e, t) {
	return dc = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, dc(e, t);
};
function fc(e, t) {
	dc(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var pc = function() {
	function e(e, t) {
		this.uvBuffer = e, this.uvMatrix = t, this.data = null, this._bufferUpdateId = -1, this._textureUpdateId = -1, this._updateID = 0;
	}
	return e.prototype.update = function(e) {
		if (!(!e && this._bufferUpdateId === this.uvBuffer._updateID && this._textureUpdateId === this.uvMatrix._updateID)) {
			this._bufferUpdateId = this.uvBuffer._updateID, this._textureUpdateId = this.uvMatrix._updateID;
			var t = this.uvBuffer.data;
			(!this.data || this.data.length !== t.length) && (this.data = new Float32Array(t.length)), this.uvMatrix.multiplyUvs(t, this.data), this._updateID++;
		}
	}, e;
}(), mc = new H(), hc = new St(), gc = function(e) {
	fc(t, e);
	function t(t, n, r, i) {
		i === void 0 && (i = j.TRIANGLES);
		var a = e.call(this) || this;
		return a.geometry = t, a.shader = n, a.state = r || jr.for2d(), a.drawMode = i, a.start = 0, a.size = 0, a.uvs = null, a.indices = null, a.vertexData = /* @__PURE__ */ new Float32Array(1), a.vertexDirty = -1, a._transformID = -1, a._roundPixels = V.ROUND_PIXELS, a.batchUvs = null, a;
	}
	return Object.defineProperty(t.prototype, "geometry", {
		get: function() {
			return this._geometry;
		},
		set: function(e) {
			this._geometry !== e && (this._geometry && (this._geometry.refCount--, this._geometry.refCount === 0 && this._geometry.dispose()), this._geometry = e, this._geometry && this._geometry.refCount++, this.vertexDirty = -1);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "uvBuffer", {
		get: function() {
			return this.geometry.buffers[1];
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "verticesBuffer", {
		get: function() {
			return this.geometry.buffers[0];
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "material", {
		get: function() {
			return this.shader;
		},
		set: function(e) {
			this.shader = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "blendMode", {
		get: function() {
			return this.state.blendMode;
		},
		set: function(e) {
			this.state.blendMode = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "roundPixels", {
		get: function() {
			return this._roundPixels;
		},
		set: function(e) {
			this._roundPixels !== e && (this._transformID = -1), this._roundPixels = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "tint", {
		get: function() {
			return "tint" in this.shader ? this.shader.tint : null;
		},
		set: function(e) {
			this.shader.tint = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "texture", {
		get: function() {
			return "texture" in this.shader ? this.shader.texture : null;
		},
		set: function(e) {
			this.shader.texture = e;
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype._render = function(e) {
		var n = this.geometry.buffers[0].data;
		this.shader.batchable && this.drawMode === j.TRIANGLES && n.length < t.BATCHABLE_SIZE * 2 ? this._renderToBatch(e) : this._renderDefault(e);
	}, t.prototype._renderDefault = function(e) {
		var t = this.shader;
		t.alpha = this.worldAlpha, t.update && t.update(), e.batch.flush(), t.uniforms.translationMatrix = this.transform.worldTransform.toArray(!0), e.shader.bind(t), e.state.set(this.state), e.geometry.bind(this.geometry, t), e.geometry.draw(this.drawMode, this.size, this.start, this.geometry.instanceCount);
	}, t.prototype._renderToBatch = function(e) {
		var t = this.geometry, n = this.shader;
		n.uvMatrix && (n.uvMatrix.update(), this.calculateUvs()), this.calculateVertices(), this.indices = t.indexBuffer.data, this._tintRGB = n._tintRGB, this._texture = n.texture;
		var r = this.material.pluginName;
		e.batch.setObjectRenderer(e.plugins[r]), e.plugins[r].render(this);
	}, t.prototype.calculateVertices = function() {
		var e = this.geometry.buffers[0], t = e.data, n = e._updateID;
		if (!(n === this.vertexDirty && this._transformID === this.transform._worldID)) {
			this._transformID = this.transform._worldID, this.vertexData.length !== t.length && (this.vertexData = new Float32Array(t.length));
			for (var r = this.transform.worldTransform, i = r.a, a = r.b, o = r.c, s = r.d, c = r.tx, l = r.ty, u = this.vertexData, d = 0; d < u.length / 2; d++) {
				var f = t[d * 2], p = t[d * 2 + 1];
				u[d * 2] = i * f + o * p + c, u[d * 2 + 1] = a * f + s * p + l;
			}
			if (this._roundPixels) for (var m = V.RESOLUTION, d = 0; d < u.length; ++d) u[d] = Math.round((u[d] * m | 0) / m);
			this.vertexDirty = n;
		}
	}, t.prototype.calculateUvs = function() {
		var e = this.geometry.buffers[1], t = this.shader;
		t.uvMatrix.isSimple ? this.uvs = e.data : (this.batchUvs ||= new pc(e, t.uvMatrix), this.batchUvs.update(), this.uvs = this.batchUvs.data);
	}, t.prototype._calculateBounds = function() {
		this.calculateVertices(), this._bounds.addVertexData(this.vertexData, 0, this.vertexData.length);
	}, t.prototype.containsPoint = function(e) {
		if (!this.getBounds().contains(e.x, e.y)) return !1;
		this.worldTransform.applyInverse(e, mc);
		for (var t = this.geometry.getBuffer("aVertexPosition").data, n = hc.points, r = this.geometry.getIndex().data, i = r.length, a = this.drawMode === 4 ? 3 : 1, o = 0; o + 2 < i; o += a) {
			var s = r[o] * 2, c = r[o + 1] * 2, l = r[o + 2] * 2;
			if (n[0] = t[s], n[1] = t[s + 1], n[2] = t[c], n[3] = t[c + 1], n[4] = t[l], n[5] = t[l + 1], hc.contains(mc.x, mc.y)) return !0;
		}
		return !1;
	}, t.prototype.destroy = function(t) {
		e.prototype.destroy.call(this, t), this._cachedTexture &&= (this._cachedTexture.destroy(), null), this.geometry = null, this.shader = null, this.state = null, this.uvs = null, this.indices = null, this.vertexData = null;
	}, t.BATCHABLE_SIZE = 100, t;
}(zt), _c = "varying vec2 vTextureCoord;\nuniform vec4 uColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;\n}\n", vc = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTextureMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;\n}\n", yc = function(e) {
	fc(t, e);
	function t(t, n) {
		var r = this, i = {
			uSampler: t,
			alpha: 1,
			uTextureMatrix: W.IDENTITY,
			uColor: new Float32Array([
				1,
				1,
				1,
				1
			])
		};
		return n = Object.assign({
			tint: 16777215,
			alpha: 1,
			pluginName: "batch"
		}, n), n.uniforms && Object.assign(i, n.uniforms), r = e.call(this, n.program || Cr.from(vc, _c), i) || this, r._colorDirty = !1, r.uvMatrix = new Rr(t), r.batchable = n.program === void 0, r.pluginName = n.pluginName, r.tint = n.tint, r.alpha = n.alpha, r;
	}
	return Object.defineProperty(t.prototype, "texture", {
		get: function() {
			return this.uniforms.uSampler;
		},
		set: function(e) {
			this.uniforms.uSampler !== e && (!this.uniforms.uSampler.baseTexture.alphaMode != !e.baseTexture.alphaMode && (this._colorDirty = !0), this.uniforms.uSampler = e, this.uvMatrix.texture = e);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "alpha", {
		get: function() {
			return this._alpha;
		},
		set: function(e) {
			e !== this._alpha && (this._alpha = e, this._colorDirty = !0);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "tint", {
		get: function() {
			return this._tint;
		},
		set: function(e) {
			e !== this._tint && (this._tint = e, this._tintRGB = (e >> 16) + (e & 65280) + ((e & 255) << 16), this._colorDirty = !0);
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype.update = function() {
		if (this._colorDirty) {
			this._colorDirty = !1;
			var e = this.texture.baseTexture;
			Je(this._tint, this._alpha, this.uniforms.uColor, e.alphaMode);
		}
		this.uvMatrix.update() && (this.uniforms.uTextureMatrix = this.uvMatrix.mapCoord);
	}, t;
}(wr), bc = function(e) {
	fc(t, e);
	function t(t, n, r) {
		var i = e.call(this) || this, a = new Cn(t), o = new Cn(n, !0), s = new Cn(r, !0, !0);
		return i.addAttribute("aVertexPosition", a, 2, !1, P.FLOAT).addAttribute("aTextureCoord", o, 2, !1, P.FLOAT).addIndex(s), i._updateId = -1, i;
	}
	return Object.defineProperty(t.prototype, "vertexDirtyId", {
		get: function() {
			return this.buffers[0]._updateID;
		},
		enumerable: !1,
		configurable: !0
	}), t;
}(kn), xc = function(e, t) {
	return xc = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, xc(e, t);
};
function Sc(e, t) {
	xc(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var Cc = function() {
	function e() {
		this.info = [], this.common = [], this.page = [], this.char = [], this.kerning = [], this.distanceField = [];
	}
	return e;
}(), wc = function() {
	function e() {}
	return e.test = function(e) {
		return typeof e == "string" && e.indexOf("info face=") === 0;
	}, e.parse = function(e) {
		var t = e.match(/^[a-z]+\s+.+$/gm), n = {
			info: [],
			common: [],
			page: [],
			char: [],
			chars: [],
			kerning: [],
			kernings: [],
			distanceField: []
		};
		for (var r in t) {
			var i = t[r].match(/^[a-z]+/gm)[0], a = t[r].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm), o = {};
			for (var s in a) {
				var c = a[s].split("="), l = c[0], u = c[1].replace(/"/gm, ""), d = parseFloat(u);
				o[l] = isNaN(d) ? u : d;
			}
			n[i].push(o);
		}
		var f = new Cc();
		return n.info.forEach(function(e) {
			return f.info.push({
				face: e.face,
				size: parseInt(e.size, 10)
			});
		}), n.common.forEach(function(e) {
			return f.common.push({ lineHeight: parseInt(e.lineHeight, 10) });
		}), n.page.forEach(function(e) {
			return f.page.push({
				id: parseInt(e.id, 10),
				file: e.file
			});
		}), n.char.forEach(function(e) {
			return f.char.push({
				id: parseInt(e.id, 10),
				page: parseInt(e.page, 10),
				x: parseInt(e.x, 10),
				y: parseInt(e.y, 10),
				width: parseInt(e.width, 10),
				height: parseInt(e.height, 10),
				xoffset: parseInt(e.xoffset, 10),
				yoffset: parseInt(e.yoffset, 10),
				xadvance: parseInt(e.xadvance, 10)
			});
		}), n.kerning.forEach(function(e) {
			return f.kerning.push({
				first: parseInt(e.first, 10),
				second: parseInt(e.second, 10),
				amount: parseInt(e.amount, 10)
			});
		}), n.distanceField.forEach(function(e) {
			return f.distanceField.push({
				distanceRange: parseInt(e.distanceRange, 10),
				fieldType: e.fieldType
			});
		}), f;
	}, e;
}(), Tc = function() {
	function e() {}
	return e.test = function(e) {
		return e instanceof XMLDocument && e.getElementsByTagName("page").length && e.getElementsByTagName("info")[0].getAttribute("face") !== null;
	}, e.parse = function(e) {
		for (var t = new Cc(), n = e.getElementsByTagName("info"), r = e.getElementsByTagName("common"), i = e.getElementsByTagName("page"), a = e.getElementsByTagName("char"), o = e.getElementsByTagName("kerning"), s = e.getElementsByTagName("distanceField"), c = 0; c < n.length; c++) t.info.push({
			face: n[c].getAttribute("face"),
			size: parseInt(n[c].getAttribute("size"), 10)
		});
		for (var c = 0; c < r.length; c++) t.common.push({ lineHeight: parseInt(r[c].getAttribute("lineHeight"), 10) });
		for (var c = 0; c < i.length; c++) t.page.push({
			id: parseInt(i[c].getAttribute("id"), 10) || 0,
			file: i[c].getAttribute("file")
		});
		for (var c = 0; c < a.length; c++) {
			var l = a[c];
			t.char.push({
				id: parseInt(l.getAttribute("id"), 10),
				page: parseInt(l.getAttribute("page"), 10) || 0,
				x: parseInt(l.getAttribute("x"), 10),
				y: parseInt(l.getAttribute("y"), 10),
				width: parseInt(l.getAttribute("width"), 10),
				height: parseInt(l.getAttribute("height"), 10),
				xoffset: parseInt(l.getAttribute("xoffset"), 10),
				yoffset: parseInt(l.getAttribute("yoffset"), 10),
				xadvance: parseInt(l.getAttribute("xadvance"), 10)
			});
		}
		for (var c = 0; c < o.length; c++) t.kerning.push({
			first: parseInt(o[c].getAttribute("first"), 10),
			second: parseInt(o[c].getAttribute("second"), 10),
			amount: parseInt(o[c].getAttribute("amount"), 10)
		});
		for (var c = 0; c < s.length; c++) t.distanceField.push({
			fieldType: s[c].getAttribute("fieldType"),
			distanceRange: parseInt(s[c].getAttribute("distanceRange"), 10)
		});
		return t;
	}, e;
}(), Ec = [
	wc,
	Tc,
	function() {
		function e() {}
		return e.test = function(e) {
			if (typeof e == "string" && e.indexOf("<font>") > -1) {
				var t = new globalThis.DOMParser().parseFromString(e, "text/xml");
				return Tc.test(t);
			}
			return !1;
		}, e.parse = function(e) {
			var t = new globalThis.DOMParser().parseFromString(e, "text/xml");
			return Tc.parse(t);
		}, e;
	}()
];
function Dc(e) {
	for (var t = 0; t < Ec.length; t++) if (Ec[t].test(e)) return Ec[t];
	return null;
}
function Oc(e, t, n, r, i, a) {
	var o = n.fill;
	if (!Array.isArray(o)) return o;
	if (o.length === 1) return o[0];
	var s, c = n.dropShadow ? n.dropShadowDistance : 0, l = n.padding || 0, u = e.width / r - c - l * 2, d = e.height / r - c - l * 2, f = o.slice(), p = n.fillGradientStops.slice();
	if (!p.length) for (var m = f.length + 1, h = 1; h < m; ++h) p.push(h / m);
	if (f.unshift(o[0]), p.unshift(0), f.push(o[o.length - 1]), p.push(1), n.fillGradientType === Es.LINEAR_VERTICAL) {
		s = t.createLinearGradient(u / 2, l, u / 2, d + l);
		for (var g = 0, _ = (a.fontProperties.fontSize + n.strokeThickness) / d, h = 0; h < i.length; h++) for (var v = a.lineHeight * h, y = 0; y < f.length; y++) {
			var b = 0;
			b = typeof p[y] == "number" ? p[y] : y / f.length;
			var x = v / d + b * _, S = Math.max(g, x);
			S = Math.min(S, 1), s.addColorStop(S, f[y]), g = S;
		}
	} else {
		s = t.createLinearGradient(l, d / 2, u + l, d / 2);
		for (var C = f.length + 1, w = 1, h = 0; h < f.length; h++) {
			var T = void 0;
			T = typeof p[h] == "number" ? p[h] : w / C, s.addColorStop(T, f[h]), w++;
		}
	}
	return s;
}
function kc(e, t, n, r, i, a, o) {
	var s = n.text, c = n.fontProperties;
	t.translate(r, i), t.scale(a, a);
	var l = o.strokeThickness / 2, u = -(o.strokeThickness / 2);
	if (t.font = o.toFontString(), t.lineWidth = o.strokeThickness, t.textBaseline = o.textBaseline, t.lineJoin = o.lineJoin, t.miterLimit = o.miterLimit, t.fillStyle = Oc(e, t, o, a, [s], n), t.strokeStyle = o.stroke, o.dropShadow) {
		var d = o.dropShadowColor, f = Be(typeof d == "number" ? d : He(d)), p = o.dropShadowBlur * a, m = o.dropShadowDistance * a;
		t.shadowColor = "rgba(" + f[0] * 255 + "," + f[1] * 255 + "," + f[2] * 255 + "," + o.dropShadowAlpha + ")", t.shadowBlur = p, t.shadowOffsetX = Math.cos(o.dropShadowAngle) * m, t.shadowOffsetY = Math.sin(o.dropShadowAngle) * m;
	} else t.shadowColor = "black", t.shadowBlur = 0, t.shadowOffsetX = 0, t.shadowOffsetY = 0;
	o.stroke && o.strokeThickness && t.strokeText(s, l, u + n.lineHeight - c.descent), o.fill && t.fillText(s, l, u + n.lineHeight - c.descent), t.setTransform(1, 0, 0, 1, 0, 0), t.fillStyle = "rgba(0, 0, 0, 0)";
}
function Ac(e) {
	return Array.from ? Array.from(e) : e.split("");
}
function jc(e) {
	typeof e == "string" && (e = [e]);
	for (var t = [], n = 0, r = e.length; n < r; n++) {
		var i = e[n];
		if (Array.isArray(i)) {
			if (i.length !== 2) throw Error("[BitmapFont]: Invalid character range length, expecting 2 got " + i.length + ".");
			var a = i[0].charCodeAt(0), o = i[1].charCodeAt(0);
			if (o < a) throw Error("[BitmapFont]: Invalid character range.");
			for (var s = a, c = o; s <= c; s++) t.push(String.fromCharCode(s));
		} else t.push.apply(t, Ac(i));
	}
	if (t.length === 0) throw Error("[BitmapFont]: Empty set when resolving characters.");
	return t;
}
function Mc(e) {
	return e.codePointAt ? e.codePointAt(0) : e.charCodeAt(0);
}
var Nc = function() {
	function e(e, t, n) {
		var r = e.info[0], i = e.common[0], a = e.page[0], o = e.distanceField[0], s = mt(a.file), c = {};
		this._ownsTextures = n, this.font = r.face, this.size = r.size, this.lineHeight = i.lineHeight / s, this.chars = {}, this.pageTextures = c;
		for (var l = 0; l < e.page.length; l++) {
			var u = e.page[l], d = u.id, f = u.file;
			c[d] = t instanceof Array ? t[l] : t[f], o?.fieldType && o.fieldType !== "none" && (c[d].baseTexture.alphaMode = ie.NO_PREMULTIPLIED_ALPHA, c[d].baseTexture.mipmap = re.OFF);
		}
		for (var l = 0; l < e.char.length; l++) {
			var p = e.char[l], d = p.id, m = p.page, h = e.char[l], g = h.x, _ = h.y, v = h.width, y = h.height, b = h.xoffset, x = h.yoffset, S = h.xadvance;
			g /= s, _ /= s, v /= s, y /= s, b /= s, x /= s, S /= s;
			var C = new U(g + c[m].frame.x / s, _ + c[m].frame.y / s, v, y);
			this.chars[d] = {
				xOffset: b,
				yOffset: x,
				xAdvance: S,
				kerning: {},
				texture: new X(c[m].baseTexture, C),
				page: m
			};
		}
		for (var l = 0; l < e.kerning.length; l++) {
			var w = e.kerning[l], T = w.first, E = w.second, D = w.amount;
			T /= s, E /= s, D /= s, this.chars[E] && (this.chars[E].kerning[T] = D);
		}
		this.distanceFieldRange = o?.distanceRange, this.distanceFieldType = (o?.fieldType)?.toLowerCase() ?? "none";
	}
	return e.prototype.destroy = function() {
		for (var e in this.chars) this.chars[e].texture.destroy(), this.chars[e].texture = null;
		for (var e in this.pageTextures) this._ownsTextures && this.pageTextures[e].destroy(!0), this.pageTextures[e] = null;
		this.chars = null, this.pageTextures = null;
	}, e.install = function(t, n, r) {
		var i;
		if (t instanceof Cc) i = t;
		else {
			var a = Dc(t);
			if (!a) throw Error("Unrecognized data format for font.");
			i = a.parse(t);
		}
		n instanceof X && (n = [n]);
		var o = new e(i, n, r);
		return e.available[o.font] = o, o;
	}, e.uninstall = function(t) {
		var n = e.available[t];
		if (!n) throw Error("No font found named '" + t + "'");
		n.destroy(), delete e.available[t];
	}, e.from = function(t, n, r) {
		if (!t) throw Error("[BitmapFont] Property `name` is required.");
		var i = Object.assign({}, e.defaultOptions, r), a = i.chars, o = i.padding, s = i.resolution, c = i.textureWidth, l = i.textureHeight, u = jc(a), d = n instanceof ks ? n : new ks(n), f = c, p = new Cc();
		p.info[0] = {
			face: d.fontFamily,
			size: d.fontSize
		}, p.common[0] = { lineHeight: d.fontSize };
		for (var m = 0, h = 0, g, _, v, y = 0, b = [], x = 0; x < u.length; x++) {
			g || (g = V.ADAPTER.createCanvas(), g.width = c, g.height = l, _ = g.getContext("2d"), v = new Y(g, { resolution: s }), b.push(new X(v)), p.page.push({
				id: b.length - 1,
				file: ""
			}));
			var S = u[x], C = Fs.measureText(S, d, !1, g), w = C.width, T = Math.ceil(C.height), E = Math.ceil((d.fontStyle === "italic" ? 2 : 1) * w);
			if (h >= l - T * s) {
				if (h === 0) throw Error("[BitmapFont] textureHeight " + l + "px is too small " + ("(fontFamily: '" + d.fontFamily + "', fontSize: " + d.fontSize + "px, char: '" + S + "')"));
				--x, g = null, _ = null, v = null, h = 0, m = 0, y = 0;
				continue;
			}
			if (y = Math.max(T + C.fontProperties.descent, y), E * s + m >= f) {
				if (m === 0) throw Error("[BitmapFont] textureWidth " + c + "px is too small " + ("(fontFamily: '" + d.fontFamily + "', fontSize: " + d.fontSize + "px, char: '" + S + "')"));
				--x, h += y * s, h = Math.ceil(h), m = 0, y = 0;
				continue;
			}
			kc(g, _, C, m, h, s, d);
			var D = Mc(C.text);
			p.char.push({
				id: D,
				page: b.length - 1,
				x: m / s,
				y: h / s,
				width: E,
				height: T,
				xoffset: 0,
				yoffset: 0,
				xadvance: Math.ceil(w - (d.dropShadow ? d.dropShadowDistance : 0) - (d.stroke ? d.strokeThickness : 0))
			}), m += (E + 2 * o) * s, m = Math.ceil(m);
		}
		if (!r?.skipKerning) for (var x = 0, O = u.length; x < O; x++) for (var k = u[x], A = 0; A < O; A++) {
			var j = u[A], M = _.measureText(k).width, N = _.measureText(j).width, P = _.measureText(k + j).width - (M + N);
			P && p.kerning.push({
				first: Mc(k),
				second: Mc(j),
				amount: P
			});
		}
		var ee = new e(p, b, !0);
		return e.available[t] !== void 0 && e.uninstall(t), e.available[t] = ee, ee;
	}, e.ALPHA = [
		["a", "z"],
		["A", "Z"],
		" "
	], e.NUMERIC = [["0", "9"]], e.ALPHANUMERIC = [
		["a", "z"],
		["A", "Z"],
		["0", "9"],
		" "
	], e.ASCII = [[" ", "~"]], e.defaultOptions = {
		resolution: 1,
		textureWidth: 512,
		textureHeight: 512,
		padding: 4,
		chars: e.ALPHANUMERIC
	}, e.available = {}, e;
}(), Pc = "// Pixi texture info\r\nvarying vec2 vTextureCoord;\r\nuniform sampler2D uSampler;\r\n\r\n// Tint\r\nuniform vec4 uColor;\r\n\r\n// on 2D applications fwidth is screenScale / glyphAtlasScale * distanceFieldRange\r\nuniform float uFWidth;\r\n\r\nvoid main(void) {\r\n\r\n  // To stack MSDF and SDF we need a non-pre-multiplied-alpha texture.\r\n  vec4 texColor = texture2D(uSampler, vTextureCoord);\r\n\r\n  // MSDF\r\n  float median = texColor.r + texColor.g + texColor.b -\r\n                  min(texColor.r, min(texColor.g, texColor.b)) -\r\n                  max(texColor.r, max(texColor.g, texColor.b));\r\n  // SDF\r\n  median = min(median, texColor.a);\r\n\r\n  float screenPxDistance = uFWidth * (median - 0.5);\r\n  float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);\r\n  if (median < 0.01) {\r\n    alpha = 0.0;\r\n  } else if (median > 0.99) {\r\n    alpha = 1.0;\r\n  }\r\n\r\n  // NPM Textures, NPM outputs\r\n  gl_FragColor = vec4(uColor.rgb, uColor.a * alpha);\r\n\r\n}\r\n", Fc = "// Mesh material default fragment\r\nattribute vec2 aVertexPosition;\r\nattribute vec2 aTextureCoord;\r\n\r\nuniform mat3 projectionMatrix;\r\nuniform mat3 translationMatrix;\r\nuniform mat3 uTextureMatrix;\r\n\r\nvarying vec2 vTextureCoord;\r\n\r\nvoid main(void)\r\n{\r\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\r\n\r\n    vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;\r\n}\r\n", Ic = [], Lc = [], Rc = [];
(function(e) {
	Sc(t, e);
	function t(n, r) {
		r === void 0 && (r = {});
		var i = e.call(this) || this;
		i._tint = 16777215;
		var a = Object.assign({}, t.styleDefaults, r), o = a.align, s = a.tint, c = a.maxWidth, l = a.letterSpacing, u = a.fontName, d = a.fontSize;
		if (!Nc.available[u]) throw Error("Missing BitmapFont \"" + u + "\"");
		return i._activePagesMeshData = [], i._textWidth = 0, i._textHeight = 0, i._align = o, i._tint = s, i._font = void 0, i._fontName = u, i._fontSize = d, i.text = n, i._maxWidth = c, i._maxLineHeight = 0, i._letterSpacing = l, i._anchor = new wt(function() {
			i.dirty = !0;
		}, i, 0, 0), i._roundPixels = V.ROUND_PIXELS, i.dirty = !0, i._resolution = V.RESOLUTION, i._autoResolution = !0, i._textureCache = {}, i;
	}
	return t.prototype.updateText = function() {
		for (var e = Nc.available[this._fontName], t = this.fontSize, n = t / e.size, r = new H(), i = [], a = [], o = [], s = Ac(this._text.replace(/(?:\r\n|\r)/g, "\n") || " "), c = this._maxWidth * e.size / t, l = e.distanceFieldType === "none" ? Ic : Lc, u = null, d = 0, f = 0, p = 0, m = -1, h = 0, g = 0, _ = 0, v = 0, y = 0; y < s.length; y++) {
			var b = s[y], x = Mc(b);
			if (/(?:\s)/.test(b) && (m = y, h = d, v++), b === "\r" || b === "\n") {
				a.push(d), o.push(-1), f = Math.max(f, d), ++p, ++g, r.x = 0, r.y += e.lineHeight, u = null, v = 0;
				continue;
			}
			var S = e.chars[x];
			if (S) {
				u && S.kerning[u] && (r.x += S.kerning[u]);
				var C = Rc.pop() || {
					texture: X.EMPTY,
					line: 0,
					charCode: 0,
					prevSpaces: 0,
					position: new H()
				};
				C.texture = S.texture, C.line = p, C.charCode = x, C.position.x = r.x + S.xOffset + this._letterSpacing / 2, C.position.y = r.y + S.yOffset, C.prevSpaces = v, i.push(C), d = C.position.x + Math.max(S.xAdvance - S.xOffset, S.texture.orig.width), r.x += S.xAdvance + this._letterSpacing, _ = Math.max(_, S.yOffset + S.texture.height), u = x, m !== -1 && c > 0 && r.x > c && (++g, et(i, 1 + m - g, 1 + y - m), y = m, m = -1, a.push(h), o.push(i.length > 0 ? i[i.length - 1].prevSpaces : 0), f = Math.max(f, h), p++, r.x = 0, r.y += e.lineHeight, u = null, v = 0);
			}
		}
		var w = s[s.length - 1];
		w !== "\r" && w !== "\n" && (/(?:\s)/.test(w) && (d = h), a.push(d), f = Math.max(f, d), o.push(-1));
		for (var T = [], y = 0; y <= p; y++) {
			var E = 0;
			this._align === "right" ? E = f - a[y] : this._align === "center" ? E = (f - a[y]) / 2 : this._align === "justify" && (E = o[y] < 0 ? 0 : (f - a[y]) / o[y]), T.push(E);
		}
		var D = i.length, O = {}, k = [], j = this._activePagesMeshData;
		l.push.apply(l, j);
		for (var y = 0; y < D; y++) {
			var M = i[y].texture, N = M.baseTexture.uid;
			if (!O[N]) {
				var P = l.pop();
				if (!P) {
					var ee = new bc(), te = void 0, ne = void 0;
					e.distanceFieldType === "none" ? (te = new yc(X.EMPTY), ne = A.NORMAL) : (te = new yc(X.EMPTY, {
						program: Cr.from(Fc, Pc),
						uniforms: { uFWidth: 0 }
					}), ne = A.NORMAL_NPM);
					var re = new gc(ee, te);
					re.blendMode = ne, P = {
						index: 0,
						indexCount: 0,
						vertexCount: 0,
						uvsCount: 0,
						total: 0,
						mesh: re,
						vertices: null,
						uvs: null,
						indices: null
					};
				}
				P.index = 0, P.indexCount = 0, P.vertexCount = 0, P.uvsCount = 0, P.total = 0;
				var ie = this._textureCache;
				ie[N] = ie[N] || new X(M.baseTexture), P.mesh.texture = ie[N], P.mesh.tint = this._tint, k.push(P), O[N] = P;
			}
			O[N].total++;
		}
		for (var y = 0; y < j.length; y++) k.indexOf(j[y]) === -1 && this.removeChild(j[y].mesh);
		for (var y = 0; y < k.length; y++) k[y].mesh.parent !== this && this.addChild(k[y].mesh);
		for (var y in this._activePagesMeshData = k, O) {
			var P = O[y], F = P.total;
			if (!(P.indices?.length > 6 * F) || P.vertices.length < gc.BATCHABLE_SIZE * 2) P.vertices = new Float32Array(8 * F), P.uvs = new Float32Array(8 * F), P.indices = new Uint16Array(6 * F);
			else for (var ae = P.total, oe = P.vertices, I = ae * 4 * 2; I < oe.length; I++) oe[I] = 0;
			P.mesh.size = 6 * F;
		}
		for (var y = 0; y < D; y++) {
			var b = i[y], se = b.position.x + T[b.line] * (this._align === "justify" ? b.prevSpaces : 1);
			this._roundPixels && (se = Math.round(se));
			var L = se * n, R = b.position.y * n, M = b.texture, z = O[M.baseTexture.uid], ce = M.frame, le = M._uvs, B = z.index++;
			z.indices[B * 6 + 0] = 0 + B * 4, z.indices[B * 6 + 1] = 1 + B * 4, z.indices[B * 6 + 2] = 2 + B * 4, z.indices[B * 6 + 3] = 0 + B * 4, z.indices[B * 6 + 4] = 2 + B * 4, z.indices[B * 6 + 5] = 3 + B * 4, z.vertices[B * 8 + 0] = L, z.vertices[B * 8 + 1] = R, z.vertices[B * 8 + 2] = L + ce.width * n, z.vertices[B * 8 + 3] = R, z.vertices[B * 8 + 4] = L + ce.width * n, z.vertices[B * 8 + 5] = R + ce.height * n, z.vertices[B * 8 + 6] = L, z.vertices[B * 8 + 7] = R + ce.height * n, z.uvs[B * 8 + 0] = le.x0, z.uvs[B * 8 + 1] = le.y0, z.uvs[B * 8 + 2] = le.x1, z.uvs[B * 8 + 3] = le.y1, z.uvs[B * 8 + 4] = le.x2, z.uvs[B * 8 + 5] = le.y2, z.uvs[B * 8 + 6] = le.x3, z.uvs[B * 8 + 7] = le.y3;
		}
		for (var y in this._textWidth = f * n, this._textHeight = (r.y + e.lineHeight) * n, O) {
			var P = O[y];
			if (this.anchor.x !== 0 || this.anchor.y !== 0) for (var ue = 0, de = this._textWidth * this.anchor.x, fe = this._textHeight * this.anchor.y, pe = 0; pe < P.total; pe++) P.vertices[ue++] -= de, P.vertices[ue++] -= fe, P.vertices[ue++] -= de, P.vertices[ue++] -= fe, P.vertices[ue++] -= de, P.vertices[ue++] -= fe, P.vertices[ue++] -= de, P.vertices[ue++] -= fe;
			this._maxLineHeight = _ * n;
			var me = P.mesh.geometry.getBuffer("aVertexPosition"), he = P.mesh.geometry.getBuffer("aTextureCoord"), ge = P.mesh.geometry.getIndex();
			me.data = P.vertices, he.data = P.uvs, ge.data = P.indices, me.update(), he.update(), ge.update();
		}
		for (var y = 0; y < i.length; y++) Rc.push(i[y]);
		this._font = e, this.dirty = !1;
	}, t.prototype.updateTransform = function() {
		this.validate(), this.containerUpdateTransform();
	}, t.prototype._render = function(t) {
		this._autoResolution && this._resolution !== t.resolution && (this._resolution = t.resolution, this.dirty = !0);
		var n = Nc.available[this._fontName], r = n.distanceFieldRange, i = n.distanceFieldType, a = n.size;
		if (i !== "none") for (var o = this.worldTransform, s = o.a, c = o.b, l = o.c, u = o.d, d = Math.sqrt(s * s + c * c), f = Math.sqrt(l * l + u * u), p = (Math.abs(d) + Math.abs(f)) / 2, m = this.fontSize / a, h = 0, g = this._activePagesMeshData; h < g.length; h++) {
			var _ = g[h];
			_.mesh.shader.uniforms.uFWidth = p * r * m * this._resolution;
		}
		e.prototype._render.call(this, t);
	}, t.prototype.getLocalBounds = function() {
		return this.validate(), e.prototype.getLocalBounds.call(this);
	}, t.prototype.validate = function() {
		var e = Nc.available[this._fontName];
		if (!e) throw Error("Missing BitmapFont \"" + this._fontName + "\"");
		this._font !== e && (this.dirty = !0), this.dirty && this.updateText();
	}, Object.defineProperty(t.prototype, "tint", {
		get: function() {
			return this._tint;
		},
		set: function(e) {
			if (this._tint !== e) {
				this._tint = e;
				for (var t = 0; t < this._activePagesMeshData.length; t++) this._activePagesMeshData[t].mesh.tint = e;
			}
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "align", {
		get: function() {
			return this._align;
		},
		set: function(e) {
			this._align !== e && (this._align = e, this.dirty = !0);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "fontName", {
		get: function() {
			return this._fontName;
		},
		set: function(e) {
			if (!Nc.available[e]) throw Error("Missing BitmapFont \"" + e + "\"");
			this._fontName !== e && (this._fontName = e, this.dirty = !0);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "fontSize", {
		get: function() {
			return this._fontSize ?? Nc.available[this._fontName].size;
		},
		set: function(e) {
			this._fontSize !== e && (this._fontSize = e, this.dirty = !0);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "anchor", {
		get: function() {
			return this._anchor;
		},
		set: function(e) {
			typeof e == "number" ? this._anchor.set(e) : this._anchor.copyFrom(e);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "text", {
		get: function() {
			return this._text;
		},
		set: function(e) {
			e = String(e ?? ""), this._text !== e && (this._text = e, this.dirty = !0);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "maxWidth", {
		get: function() {
			return this._maxWidth;
		},
		set: function(e) {
			this._maxWidth !== e && (this._maxWidth = e, this.dirty = !0);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "maxLineHeight", {
		get: function() {
			return this.validate(), this._maxLineHeight;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "textWidth", {
		get: function() {
			return this.validate(), this._textWidth;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "letterSpacing", {
		get: function() {
			return this._letterSpacing;
		},
		set: function(e) {
			this._letterSpacing !== e && (this._letterSpacing = e, this.dirty = !0);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "roundPixels", {
		get: function() {
			return this._roundPixels;
		},
		set: function(e) {
			e !== this._roundPixels && (this._roundPixels = e, this.dirty = !0);
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "textHeight", {
		get: function() {
			return this.validate(), this._textHeight;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "resolution", {
		get: function() {
			return this._resolution;
		},
		set: function(e) {
			this._autoResolution = !1, this._resolution !== e && (this._resolution = e, this.dirty = !0);
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype.destroy = function(t) {
		var n = this._textureCache, r = Nc.available[this._fontName].distanceFieldType === "none" ? Ic : Lc;
		r.push.apply(r, this._activePagesMeshData);
		for (var i = 0, a = this._activePagesMeshData; i < a.length; i++) {
			var o = a[i];
			this.removeChild(o.mesh);
		}
		for (var s in this._activePagesMeshData = [], r.filter(function(e) {
			return n[e.mesh.texture.baseTexture.uid];
		}).forEach(function(e) {
			e.mesh.texture = X.EMPTY;
		}), n) n[s].destroy(), delete n[s];
		this._font = null, this._textureCache = null, e.prototype.destroy.call(this, t);
	}, t.styleDefaults = {
		align: "left",
		tint: 16777215,
		maxWidth: 0,
		letterSpacing: 0
	}, t;
})(zt);
var zc = function() {
	function e() {}
	return e.add = function() {
		Z.setExtensionXhrType("fnt", Z.XHR_RESPONSE_TYPE.TEXT);
	}, e.use = function(t, n) {
		var r = Dc(t.data);
		if (!r) {
			n();
			return;
		}
		for (var i = e.getBaseUrl(this, t), a = r.parse(t.data), o = {}, s = function(e) {
			o[e.metadata.pageFile] = e.texture, Object.keys(o).length === a.page.length && (t.bitmapFont = Nc.install(a, o, !0), n());
		}, c = 0; c < a.page.length; ++c) {
			var l = a.page[c].file, u = i + l, d = !1;
			for (var f in this.resources) {
				var p = this.resources[f];
				if (p.url === u) {
					p.metadata.pageFile = l, p.texture ? s(p) : p.onAfterMiddleware.add(s), d = !0;
					break;
				}
			}
			if (!d) {
				var m = {
					crossOrigin: t.crossOrigin,
					loadType: Z.LOAD_TYPE.IMAGE,
					metadata: Object.assign({ pageFile: l }, t.metadata.imageMetadata),
					parentResource: t
				};
				this.add(u, m, s);
			}
		}
	}, e.getBaseUrl = function(t, n) {
		var r = n.isDataUrl ? "" : e.dirname(n.url);
		return n.isDataUrl && (r === "." && (r = ""), t.baseUrl && r && t.baseUrl.charAt(t.baseUrl.length - 1) === "/" && (r += "/")), r = r.replace(t.baseUrl, ""), r && r.charAt(r.length - 1) !== "/" && (r += "/"), r;
	}, e.dirname = function(e) {
		var t = e.replace(/\\/g, "/").replace(/\/$/, "").replace(/\/[^\/]*$/, "");
		return t === e ? "." : t === "" ? "/" : t;
	}, e.extension = q.Loader, e;
}(), Bc = function(e, t) {
	return Bc = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, Bc(e, t);
};
function Vc(e, t) {
	Bc(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var Hc = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float uAlpha;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord) * uAlpha;\n}\n", Uc = function(e) {
	Vc(t, e);
	function t(t) {
		t === void 0 && (t = 1);
		var n = e.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", Hc, { uAlpha: 1 }) || this;
		return n.alpha = t, n;
	}
	return Object.defineProperty(t.prototype, "alpha", {
		get: function() {
			return this.uniforms.uAlpha;
		},
		set: function(e) {
			this.uniforms.uAlpha = e;
		},
		enumerable: !1,
		configurable: !0
	}), t;
}(Pr), Wc = function(e, t) {
	return Wc = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, Wc(e, t);
};
function Gc(e, t) {
	Wc(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var Kc = "\n    attribute vec2 aVertexPosition;\n\n    uniform mat3 projectionMatrix;\n\n    uniform float strength;\n\n    varying vec2 vBlurTexCoords[%size%];\n\n    uniform vec4 inputSize;\n    uniform vec4 outputFrame;\n\n    vec4 filterVertexPosition( void )\n    {\n        vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n        return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n    }\n\n    vec2 filterTextureCoord( void )\n    {\n        return aVertexPosition * (outputFrame.zw * inputSize.zw);\n    }\n\n    void main(void)\n    {\n        gl_Position = filterVertexPosition();\n\n        vec2 textureCoord = filterTextureCoord();\n        %blur%\n    }";
function qc(e, t) {
	for (var n = Math.ceil(e / 2), r = Kc, i = "", a = t ? "vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * strength, 0.0);" : "vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * strength);", o = 0; o < e; o++) {
		var s = a.replace("%index%", o.toString());
		s = s.replace("%sampleIndex%", o - (n - 1) + ".0"), i += s, i += "\n";
	}
	return r = r.replace("%blur%", i), r = r.replace("%size%", e.toString()), r;
}
var Jc = {
	5: [
		.153388,
		.221461,
		.250301
	],
	7: [
		.071303,
		.131514,
		.189879,
		.214607
	],
	9: [
		.028532,
		.067234,
		.124009,
		.179044,
		.20236
	],
	11: [
		.0093,
		.028002,
		.065984,
		.121703,
		.175713,
		.198596
	],
	13: [
		.002406,
		.009255,
		.027867,
		.065666,
		.121117,
		.174868,
		.197641
	],
	15: [
		489e-6,
		.002403,
		.009246,
		.02784,
		.065602,
		.120999,
		.174697,
		.197448
	]
}, Yc = [
	"varying vec2 vBlurTexCoords[%size%];",
	"uniform sampler2D uSampler;",
	"void main(void)",
	"{",
	"    gl_FragColor = vec4(0.0);",
	"    %blur%",
	"}"
].join("\n");
function Xc(e) {
	for (var t = Jc[e], n = t.length, r = Yc, i = "", a = "gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;", o, s = 0; s < e; s++) {
		var c = a.replace("%index%", s.toString());
		o = s, s >= n && (o = e - s - 1), c = c.replace("%value%", t[o].toString()), i += c, i += "\n";
	}
	return r = r.replace("%blur%", i), r = r.replace("%size%", e.toString()), r;
}
var Zc = function(e) {
	Gc(t, e);
	function t(t, n, r, i, a) {
		n === void 0 && (n = 8), r === void 0 && (r = 4), i === void 0 && (i = V.FILTER_RESOLUTION), a === void 0 && (a = 5);
		var o = this, s = qc(a, t), c = Xc(a);
		return o = e.call(this, s, c) || this, o.horizontal = t, o.resolution = i, o._quality = 0, o.quality = r, o.blur = n, o;
	}
	return t.prototype.apply = function(e, t, n, r) {
		if (n ? this.horizontal ? this.uniforms.strength = 1 / n.width * (n.width / t.width) : this.uniforms.strength = 1 / n.height * (n.height / t.height) : this.horizontal ? this.uniforms.strength = 1 / e.renderer.width * (e.renderer.width / t.width) : this.uniforms.strength = 1 / e.renderer.height * (e.renderer.height / t.height), this.uniforms.strength *= this.strength, this.uniforms.strength /= this.passes, this.passes === 1) e.applyFilter(this, t, n, r);
		else {
			var i = e.getFilterTexture(), a = e.renderer, o = t, s = i;
			this.state.blend = !1, e.applyFilter(this, o, s, F.CLEAR);
			for (var c = 1; c < this.passes - 1; c++) {
				e.bindAndClear(o, F.BLIT), this.uniforms.uSampler = s;
				var l = s;
				s = o, o = l, a.shader.bind(this), a.geometry.draw(5);
			}
			this.state.blend = !0, e.applyFilter(this, s, n, r), e.returnFilterTexture(i);
		}
	}, Object.defineProperty(t.prototype, "blur", {
		get: function() {
			return this.strength;
		},
		set: function(e) {
			this.padding = 1 + Math.abs(e) * 2, this.strength = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "quality", {
		get: function() {
			return this._quality;
		},
		set: function(e) {
			this._quality = e, this.passes = e;
		},
		enumerable: !1,
		configurable: !0
	}), t;
}(Pr), Qc = function(e) {
	Gc(t, e);
	function t(t, n, r, i) {
		t === void 0 && (t = 8), n === void 0 && (n = 4), r === void 0 && (r = V.FILTER_RESOLUTION), i === void 0 && (i = 5);
		var a = e.call(this) || this;
		return a.blurXFilter = new Zc(!0, t, n, r, i), a.blurYFilter = new Zc(!1, t, n, r, i), a.resolution = r, a.quality = n, a.blur = t, a.repeatEdgePixels = !1, a;
	}
	return t.prototype.apply = function(e, t, n, r) {
		var i = Math.abs(this.blurXFilter.strength), a = Math.abs(this.blurYFilter.strength);
		if (i && a) {
			var o = e.getFilterTexture();
			this.blurXFilter.apply(e, t, o, F.CLEAR), this.blurYFilter.apply(e, o, n, r), e.returnFilterTexture(o);
		} else a ? this.blurYFilter.apply(e, t, n, r) : this.blurXFilter.apply(e, t, n, r);
	}, t.prototype.updatePadding = function() {
		this._repeatEdgePixels ? this.padding = 0 : this.padding = Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength)) * 2;
	}, Object.defineProperty(t.prototype, "blur", {
		get: function() {
			return this.blurXFilter.blur;
		},
		set: function(e) {
			this.blurXFilter.blur = this.blurYFilter.blur = e, this.updatePadding();
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "quality", {
		get: function() {
			return this.blurXFilter.quality;
		},
		set: function(e) {
			this.blurXFilter.quality = this.blurYFilter.quality = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "blurX", {
		get: function() {
			return this.blurXFilter.blur;
		},
		set: function(e) {
			this.blurXFilter.blur = e, this.updatePadding();
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "blurY", {
		get: function() {
			return this.blurYFilter.blur;
		},
		set: function(e) {
			this.blurYFilter.blur = e, this.updatePadding();
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "blendMode", {
		get: function() {
			return this.blurYFilter.blendMode;
		},
		set: function(e) {
			this.blurYFilter.blendMode = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "repeatEdgePixels", {
		get: function() {
			return this._repeatEdgePixels;
		},
		set: function(e) {
			this._repeatEdgePixels = e, this.updatePadding();
		},
		enumerable: !1,
		configurable: !0
	}), t;
}(Pr), $c = function(e, t) {
	return $c = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, $c(e, t);
};
function el(e, t) {
	$c(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var tl = "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float m[20];\nuniform float uAlpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (uAlpha == 0.0) {\n        gl_FragColor = c;\n        return;\n    }\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (c.a > 0.0) {\n      c.rgb /= c.a;\n    }\n\n    vec4 result;\n\n    result.r = (m[0] * c.r);\n        result.r += (m[1] * c.g);\n        result.r += (m[2] * c.b);\n        result.r += (m[3] * c.a);\n        result.r += m[4];\n\n    result.g = (m[5] * c.r);\n        result.g += (m[6] * c.g);\n        result.g += (m[7] * c.b);\n        result.g += (m[8] * c.a);\n        result.g += m[9];\n\n    result.b = (m[10] * c.r);\n       result.b += (m[11] * c.g);\n       result.b += (m[12] * c.b);\n       result.b += (m[13] * c.a);\n       result.b += m[14];\n\n    result.a = (m[15] * c.r);\n       result.a += (m[16] * c.g);\n       result.a += (m[17] * c.b);\n       result.a += (m[18] * c.a);\n       result.a += m[19];\n\n    vec3 rgb = mix(c.rgb, result.rgb, uAlpha);\n\n    // Premultiply alpha again.\n    rgb *= result.a;\n\n    gl_FragColor = vec4(rgb, result.a);\n}\n", nl = function(e) {
	el(t, e);
	function t() {
		var t = this, n = {
			m: new Float32Array([
				1,
				0,
				0,
				0,
				0,
				0,
				1,
				0,
				0,
				0,
				0,
				0,
				1,
				0,
				0,
				0,
				0,
				0,
				1,
				0
			]),
			uAlpha: 1
		};
		return t = e.call(this, "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n", tl, n) || this, t.alpha = 1, t;
	}
	return t.prototype._loadMatrix = function(e, t) {
		t === void 0 && (t = !1);
		var n = e;
		t && (this._multiply(n, this.uniforms.m, e), n = this._colorMatrix(n)), this.uniforms.m = n;
	}, t.prototype._multiply = function(e, t, n) {
		return e[0] = t[0] * n[0] + t[1] * n[5] + t[2] * n[10] + t[3] * n[15], e[1] = t[0] * n[1] + t[1] * n[6] + t[2] * n[11] + t[3] * n[16], e[2] = t[0] * n[2] + t[1] * n[7] + t[2] * n[12] + t[3] * n[17], e[3] = t[0] * n[3] + t[1] * n[8] + t[2] * n[13] + t[3] * n[18], e[4] = t[0] * n[4] + t[1] * n[9] + t[2] * n[14] + t[3] * n[19] + t[4], e[5] = t[5] * n[0] + t[6] * n[5] + t[7] * n[10] + t[8] * n[15], e[6] = t[5] * n[1] + t[6] * n[6] + t[7] * n[11] + t[8] * n[16], e[7] = t[5] * n[2] + t[6] * n[7] + t[7] * n[12] + t[8] * n[17], e[8] = t[5] * n[3] + t[6] * n[8] + t[7] * n[13] + t[8] * n[18], e[9] = t[5] * n[4] + t[6] * n[9] + t[7] * n[14] + t[8] * n[19] + t[9], e[10] = t[10] * n[0] + t[11] * n[5] + t[12] * n[10] + t[13] * n[15], e[11] = t[10] * n[1] + t[11] * n[6] + t[12] * n[11] + t[13] * n[16], e[12] = t[10] * n[2] + t[11] * n[7] + t[12] * n[12] + t[13] * n[17], e[13] = t[10] * n[3] + t[11] * n[8] + t[12] * n[13] + t[13] * n[18], e[14] = t[10] * n[4] + t[11] * n[9] + t[12] * n[14] + t[13] * n[19] + t[14], e[15] = t[15] * n[0] + t[16] * n[5] + t[17] * n[10] + t[18] * n[15], e[16] = t[15] * n[1] + t[16] * n[6] + t[17] * n[11] + t[18] * n[16], e[17] = t[15] * n[2] + t[16] * n[7] + t[17] * n[12] + t[18] * n[17], e[18] = t[15] * n[3] + t[16] * n[8] + t[17] * n[13] + t[18] * n[18], e[19] = t[15] * n[4] + t[16] * n[9] + t[17] * n[14] + t[18] * n[19] + t[19], e;
	}, t.prototype._colorMatrix = function(e) {
		var t = new Float32Array(e);
		return t[4] /= 255, t[9] /= 255, t[14] /= 255, t[19] /= 255, t;
	}, t.prototype.brightness = function(e, t) {
		var n = [
			e,
			0,
			0,
			0,
			0,
			0,
			e,
			0,
			0,
			0,
			0,
			0,
			e,
			0,
			0,
			0,
			0,
			0,
			1,
			0
		];
		this._loadMatrix(n, t);
	}, t.prototype.tint = function(e, t) {
		var n = e >> 16 & 255, r = e >> 8 & 255, i = e & 255, a = [
			n / 255,
			0,
			0,
			0,
			0,
			0,
			r / 255,
			0,
			0,
			0,
			0,
			0,
			i / 255,
			0,
			0,
			0,
			0,
			0,
			1,
			0
		];
		this._loadMatrix(a, t);
	}, t.prototype.greyscale = function(e, t) {
		var n = [
			e,
			e,
			e,
			0,
			0,
			e,
			e,
			e,
			0,
			0,
			e,
			e,
			e,
			0,
			0,
			0,
			0,
			0,
			1,
			0
		];
		this._loadMatrix(n, t);
	}, t.prototype.blackAndWhite = function(e) {
		this._loadMatrix([
			.3,
			.6,
			.1,
			0,
			0,
			.3,
			.6,
			.1,
			0,
			0,
			.3,
			.6,
			.1,
			0,
			0,
			0,
			0,
			0,
			1,
			0
		], e);
	}, t.prototype.hue = function(e, t) {
		e = (e || 0) / 180 * Math.PI;
		var n = Math.cos(e), r = Math.sin(e), i = Math.sqrt, a = 1 / 3, o = i(a), s = [
			n + (1 - n) * a,
			a * (1 - n) - o * r,
			a * (1 - n) + o * r,
			0,
			0,
			a * (1 - n) + o * r,
			n + a * (1 - n),
			a * (1 - n) - o * r,
			0,
			0,
			a * (1 - n) - o * r,
			a * (1 - n) + o * r,
			n + a * (1 - n),
			0,
			0,
			0,
			0,
			0,
			1,
			0
		];
		this._loadMatrix(s, t);
	}, t.prototype.contrast = function(e, t) {
		var n = (e || 0) + 1, r = -.5 * (n - 1), i = [
			n,
			0,
			0,
			0,
			r,
			0,
			n,
			0,
			0,
			r,
			0,
			0,
			n,
			0,
			r,
			0,
			0,
			0,
			1,
			0
		];
		this._loadMatrix(i, t);
	}, t.prototype.saturate = function(e, t) {
		e === void 0 && (e = 0);
		var n = e * 2 / 3 + 1, r = (n - 1) * -.5, i = [
			n,
			r,
			r,
			0,
			0,
			r,
			n,
			r,
			0,
			0,
			r,
			r,
			n,
			0,
			0,
			0,
			0,
			0,
			1,
			0
		];
		this._loadMatrix(i, t);
	}, t.prototype.desaturate = function() {
		this.saturate(-1);
	}, t.prototype.negative = function(e) {
		this._loadMatrix([
			-1,
			0,
			0,
			1,
			0,
			0,
			-1,
			0,
			1,
			0,
			0,
			0,
			-1,
			1,
			0,
			0,
			0,
			0,
			1,
			0
		], e);
	}, t.prototype.sepia = function(e) {
		this._loadMatrix([
			.393,
			.7689999,
			.18899999,
			0,
			0,
			.349,
			.6859999,
			.16799999,
			0,
			0,
			.272,
			.5339999,
			.13099999,
			0,
			0,
			0,
			0,
			0,
			1,
			0
		], e);
	}, t.prototype.technicolor = function(e) {
		this._loadMatrix([
			1.9125277891456083,
			-.8545344976951645,
			-.09155508482755585,
			0,
			11.793603434377337,
			-.3087833385928097,
			1.7658908555458428,
			-.10601743074722245,
			0,
			-70.35205161461398,
			-.231103377548616,
			-.7501899197440212,
			1.847597816108189,
			0,
			30.950940869491138,
			0,
			0,
			0,
			1,
			0
		], e);
	}, t.prototype.polaroid = function(e) {
		this._loadMatrix([
			1.438,
			-.062,
			-.062,
			0,
			0,
			-.122,
			1.378,
			-.122,
			0,
			0,
			-.016,
			-.016,
			1.483,
			0,
			0,
			0,
			0,
			0,
			1,
			0
		], e);
	}, t.prototype.toBGR = function(e) {
		this._loadMatrix([
			0,
			0,
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			1,
			0
		], e);
	}, t.prototype.kodachrome = function(e) {
		this._loadMatrix([
			1.1285582396593525,
			-.3967382283601348,
			-.03992559172921793,
			0,
			63.72958762196502,
			-.16404339962244616,
			1.0835251566291304,
			-.05498805115633132,
			0,
			24.732407896706203,
			-.16786010706155763,
			-.5603416277695248,
			1.6014850761964943,
			0,
			35.62982807460946,
			0,
			0,
			0,
			1,
			0
		], e);
	}, t.prototype.browni = function(e) {
		this._loadMatrix([
			.5997023498159715,
			.34553243048391263,
			-.2708298674538042,
			0,
			47.43192855600873,
			-.037703249837783157,
			.8609577587992641,
			.15059552388459913,
			0,
			-36.96841498319127,
			.24113635128153335,
			-.07441037908422492,
			.44972182064877153,
			0,
			-7.562075277591283,
			0,
			0,
			0,
			1,
			0
		], e);
	}, t.prototype.vintage = function(e) {
		this._loadMatrix([
			.6279345635605994,
			.3202183420819367,
			-.03965408211312453,
			0,
			9.651285835294123,
			.02578397704808868,
			.6441188644374771,
			.03259127616149294,
			0,
			7.462829176470591,
			.0466055556782719,
			-.0851232987247891,
			.5241648018700465,
			0,
			5.159190588235296,
			0,
			0,
			0,
			1,
			0
		], e);
	}, t.prototype.colorTone = function(e, t, n, r, i) {
		e ||= .2, t ||= .15, n ||= 16770432, r ||= 3375104;
		var a = (n >> 16 & 255) / 255, o = (n >> 8 & 255) / 255, s = (n & 255) / 255, c = (r >> 16 & 255) / 255, l = (r >> 8 & 255) / 255, u = (r & 255) / 255, d = [
			.3,
			.59,
			.11,
			0,
			0,
			a,
			o,
			s,
			e,
			0,
			c,
			l,
			u,
			t,
			0,
			a - c,
			o - l,
			s - u,
			0,
			0
		];
		this._loadMatrix(d, i);
	}, t.prototype.night = function(e, t) {
		e ||= .1;
		var n = [
			e * -2,
			-e,
			0,
			0,
			0,
			-e,
			0,
			e,
			0,
			0,
			0,
			e,
			e * 2,
			0,
			0,
			0,
			0,
			0,
			1,
			0
		];
		this._loadMatrix(n, t);
	}, t.prototype.predator = function(e, t) {
		var n = [
			11.224130630493164 * e,
			-4.794486999511719 * e,
			-2.8746118545532227 * e,
			0 * e,
			.40342438220977783 * e,
			-3.6330697536468506 * e,
			9.193157196044922 * e,
			-2.951810836791992 * e,
			0 * e,
			-1.316135048866272 * e,
			-3.2184197902679443 * e,
			-4.2375030517578125 * e,
			7.476448059082031 * e,
			0 * e,
			.8044459223747253 * e,
			0,
			0,
			0,
			1,
			0
		];
		this._loadMatrix(n, t);
	}, t.prototype.lsd = function(e) {
		this._loadMatrix([
			2,
			-.4,
			.5,
			0,
			0,
			-.5,
			2,
			-.4,
			0,
			0,
			-.4,
			-.5,
			3,
			0,
			0,
			0,
			0,
			0,
			1,
			0
		], e);
	}, t.prototype.reset = function() {
		this._loadMatrix([
			1,
			0,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			0,
			1,
			0
		], !1);
	}, Object.defineProperty(t.prototype, "matrix", {
		get: function() {
			return this.uniforms.m;
		},
		set: function(e) {
			this.uniforms.m = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "alpha", {
		get: function() {
			return this.uniforms.uAlpha;
		},
		set: function(e) {
			this.uniforms.uAlpha = e;
		},
		enumerable: !1,
		configurable: !0
	}), t;
}(Pr);
nl.prototype.grayscale = nl.prototype.greyscale;
//#endregion
//#region node_modules/@pixi/filter-displacement/dist/esm/filter-displacement.mjs
var rl = function(e, t) {
	return rl = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, rl(e, t);
};
function il(e, t) {
	rl(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var al = "varying vec2 vFilterCoord;\nvarying vec2 vTextureCoord;\n\nuniform vec2 scale;\nuniform mat2 rotation;\nuniform sampler2D uSampler;\nuniform sampler2D mapSampler;\n\nuniform highp vec4 inputSize;\nuniform vec4 inputClamp;\n\nvoid main(void)\n{\n  vec4 map =  texture2D(mapSampler, vFilterCoord);\n\n  map -= 0.5;\n  map.xy = scale * inputSize.zw * (rotation * map.xy);\n\n  gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), inputClamp.xy, inputClamp.zw));\n}\n", ol = "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\nuniform mat3 filterMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vFilterCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n	gl_Position = filterVertexPosition();\n	vTextureCoord = filterTextureCoord();\n	vFilterCoord = ( filterMatrix * vec3( vTextureCoord, 1.0)  ).xy;\n}\n", sl = function(e) {
	il(t, e);
	function t(t, n) {
		var r = this, i = new W();
		return t.renderable = !1, r = e.call(this, ol, al, {
			mapSampler: t._texture,
			filterMatrix: i,
			scale: {
				x: 1,
				y: 1
			},
			rotation: new Float32Array([
				1,
				0,
				0,
				1
			])
		}) || this, r.maskSprite = t, r.maskMatrix = i, n ??= 20, r.scale = new H(n, n), r;
	}
	return t.prototype.apply = function(e, t, n, r) {
		this.uniforms.filterMatrix = e.calculateSpriteMatrix(this.maskMatrix, this.maskSprite), this.uniforms.scale.x = this.scale.x, this.uniforms.scale.y = this.scale.y;
		var i = this.maskSprite.worldTransform, a = Math.sqrt(i.a * i.a + i.b * i.b), o = Math.sqrt(i.c * i.c + i.d * i.d);
		a !== 0 && o !== 0 && (this.uniforms.rotation[0] = i.a / a, this.uniforms.rotation[1] = i.b / a, this.uniforms.rotation[2] = i.c / o, this.uniforms.rotation[3] = i.d / o), e.applyFilter(this, t, n, r);
	}, Object.defineProperty(t.prototype, "map", {
		get: function() {
			return this.uniforms.mapSampler;
		},
		set: function(e) {
			this.uniforms.mapSampler = e;
		},
		enumerable: !1,
		configurable: !0
	}), t;
}(Pr), cl = function(e, t) {
	return cl = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, cl(e, t);
};
function ll(e, t) {
	cl(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var ul = "\nattribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vFragCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvoid texcoords(vec2 fragCoord, vec2 inverseVP,\n               out vec2 v_rgbNW, out vec2 v_rgbNE,\n               out vec2 v_rgbSW, out vec2 v_rgbSE,\n               out vec2 v_rgbM) {\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void) {\n\n   gl_Position = filterVertexPosition();\n\n   vFragCoord = aVertexPosition * outputFrame.zw;\n\n   texcoords(vFragCoord, inputSize.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}\n", dl = "varying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vFragCoord;\nuniform sampler2D uSampler;\nuniform highp vec4 inputSize;\n\n\n/**\n Basic FXAA implementation based on the code on geeks3d.com with the\n modification that the texture2DLod stuff was removed since it's\n unsupported by WebGL.\n\n --\n\n From:\n https://github.com/mitsuhiko/webgl-meincraft\n\n Copyright (c) 2011 by Armin Ronacher.\n\n Some rights reserved.\n\n Redistribution and use in source and binary forms, with or without\n modification, are permitted provided that the following conditions are\n met:\n\n * Redistributions of source code must retain the above copyright\n notice, this list of conditions and the following disclaimer.\n\n * Redistributions in binary form must reproduce the above\n copyright notice, this list of conditions and the following\n disclaimer in the documentation and/or other materials provided\n with the distribution.\n\n * The names of the contributors may not be used to endorse or\n promote products derived from this software without specific\n prior written permission.\n\n THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n \"AS IS\" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\n LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\n A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\n OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\n DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n */\n\n#ifndef FXAA_REDUCE_MIN\n#define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n#define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n#define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 inverseVP,\n          vec2 v_rgbNW, vec2 v_rgbNE,\n          vec2 v_rgbSW, vec2 v_rgbSE,\n          vec2 v_rgbM) {\n    vec4 color;\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n\n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n\n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n\n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n                  dir * rcpDirMin)) * inverseVP;\n\n    vec3 rgbA = 0.5 * (\n                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n\n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\nvoid main() {\n\n      vec4 color;\n\n      color = fxaa(uSampler, vFragCoord, inputSize.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n      gl_FragColor = color;\n}\n", fl = function(e) {
	ll(t, e);
	function t() {
		return e.call(this, ul, dl) || this;
	}
	return t;
}(Pr), pl = function(e, t) {
	return pl = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, pl(e, t);
};
function ml(e, t) {
	pl(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var hl = "precision highp float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float uNoise;\nuniform float uSeed;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float randomValue = rand(gl_FragCoord.xy * uSeed);\n    float diff = (randomValue - 0.5) * uNoise;\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (color.a > 0.0) {\n        color.rgb /= color.a;\n    }\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    // Premultiply alpha again.\n    color.rgb *= color.a;\n\n    gl_FragColor = color;\n}\n", gl = function(e) {
	ml(t, e);
	function t(t, n) {
		t === void 0 && (t = .5), n === void 0 && (n = Math.random());
		var r = e.call(this, "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n", hl, {
			uNoise: 0,
			uSeed: 0
		}) || this;
		return r.noise = t, r.seed = n, r;
	}
	return Object.defineProperty(t.prototype, "noise", {
		get: function() {
			return this.uniforms.uNoise;
		},
		set: function(e) {
			this.uniforms.uNoise = e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "seed", {
		get: function() {
			return this.uniforms.uSeed;
		},
		set: function(e) {
			this.uniforms.uSeed = e;
		},
		enumerable: !1,
		configurable: !0
	}), t;
}(Pr), _l = new W();
K.prototype._cacheAsBitmap = !1, K.prototype._cacheData = null, K.prototype._cacheAsBitmapResolution = null, K.prototype._cacheAsBitmapMultisample = L.NONE;
var vl = function() {
	function e() {
		this.textureCacheId = null, this.originalRender = null, this.originalRenderCanvas = null, this.originalCalculateBounds = null, this.originalGetLocalBounds = null, this.originalUpdateTransform = null, this.originalDestroy = null, this.originalMask = null, this.originalFilterArea = null, this.originalContainsPoint = null, this.sprite = null;
	}
	return e;
}();
//#endregion
//#region node_modules/@pixi/mixin-get-global-position/dist/esm/mixin-get-global-position.mjs
Object.defineProperties(K.prototype, {
	cacheAsBitmapResolution: {
		get: function() {
			return this._cacheAsBitmapResolution;
		},
		set: function(e) {
			e !== this._cacheAsBitmapResolution && (this._cacheAsBitmapResolution = e, this.cacheAsBitmap &&= (this.cacheAsBitmap = !1, !0));
		}
	},
	cacheAsBitmapMultisample: {
		get: function() {
			return this._cacheAsBitmapMultisample;
		},
		set: function(e) {
			e !== this._cacheAsBitmapMultisample && (this._cacheAsBitmapMultisample = e, this.cacheAsBitmap &&= (this.cacheAsBitmap = !1, !0));
		}
	},
	cacheAsBitmap: {
		get: function() {
			return this._cacheAsBitmap;
		},
		set: function(e) {
			if (this._cacheAsBitmap !== e) {
				this._cacheAsBitmap = e;
				var t;
				e ? (this._cacheData ||= new vl(), t = this._cacheData, t.originalRender = this.render, t.originalRenderCanvas = this.renderCanvas, t.originalUpdateTransform = this.updateTransform, t.originalCalculateBounds = this.calculateBounds, t.originalGetLocalBounds = this.getLocalBounds, t.originalDestroy = this.destroy, t.originalContainsPoint = this.containsPoint, t.originalMask = this._mask, t.originalFilterArea = this.filterArea, this.render = this._renderCached, this.renderCanvas = this._renderCachedCanvas, this.destroy = this._cacheAsBitmapDestroy) : (t = this._cacheData, t.sprite && this._destroyCachedDisplayObject(), this.render = t.originalRender, this.renderCanvas = t.originalRenderCanvas, this.calculateBounds = t.originalCalculateBounds, this.getLocalBounds = t.originalGetLocalBounds, this.destroy = t.originalDestroy, this.updateTransform = t.originalUpdateTransform, this.containsPoint = t.originalContainsPoint, this._mask = t.originalMask, this.filterArea = t.originalFilterArea);
			}
		}
	}
}), K.prototype._renderCached = function(e) {
	!this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObject(e), this._cacheData.sprite.transform._worldID = this.transform._worldID, this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._render(e));
}, K.prototype._initCachedDisplayObject = function(e) {
	if (!(this._cacheData && this._cacheData.sprite)) {
		var t = this.alpha;
		this.alpha = 1, e.batch.flush();
		var n = this.getLocalBounds(null, !0).clone();
		if (this.filters && this.filters.length) {
			var r = this.filters[0].padding;
			n.pad(r);
		}
		n.ceil(V.RESOLUTION);
		var i = e.renderTexture.current, a = e.renderTexture.sourceFrame.clone(), o = e.renderTexture.destinationFrame.clone(), s = e.projection.transform, c = yn.create({
			width: n.width,
			height: n.height,
			resolution: this.cacheAsBitmapResolution || e.resolution,
			multisample: this.cacheAsBitmapMultisample ?? e.multisample
		}), l = "cacheAsBitmap_" + rt();
		this._cacheData.textureCacheId = l, Y.addToCache(c.baseTexture, l), X.addToCache(c, l);
		var u = this.transform.localTransform.copyTo(_l).invert().translate(-n.x, -n.y);
		this.render = this._cacheData.originalRender, e.render(this, {
			renderTexture: c,
			clear: !0,
			transform: u,
			skipUpdateTransform: !1
		}), e.framebuffer.blit(), e.projection.transform = s, e.renderTexture.bind(i, a, o), this.render = this._renderCached, this.updateTransform = this.displayObjectUpdateTransform, this.calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._mask = null, this.filterArea = null, this.alpha = t;
		var d = new Cs(c);
		d.transform.worldTransform = this.transform.worldTransform, d.anchor.x = -(n.x / n.width), d.anchor.y = -(n.y / n.height), d.alpha = t, d._bounds = this._bounds, this._cacheData.sprite = d, this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.enableTempParent(), this.updateTransform(), this.disableTempParent(null)), this.containsPoint = d.containsPoint.bind(d);
	}
}, K.prototype._renderCachedCanvas = function(e) {
	!this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObjectCanvas(e), this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._renderCanvas(e));
}, K.prototype._initCachedDisplayObjectCanvas = function(e) {
	if (!(this._cacheData && this._cacheData.sprite)) {
		var t = this.getLocalBounds(null, !0), n = this.alpha;
		this.alpha = 1;
		var r = e.context, i = e._projTransform;
		t.ceil(V.RESOLUTION);
		var a = yn.create({
			width: t.width,
			height: t.height
		}), o = "cacheAsBitmap_" + rt();
		this._cacheData.textureCacheId = o, Y.addToCache(a.baseTexture, o), X.addToCache(a, o);
		var s = _l;
		this.transform.localTransform.copyTo(s), s.invert(), s.tx -= t.x, s.ty -= t.y, this.renderCanvas = this._cacheData.originalRenderCanvas, e.render(this, {
			renderTexture: a,
			clear: !0,
			transform: s,
			skipUpdateTransform: !1
		}), e.context = r, e._projTransform = i, this.renderCanvas = this._renderCachedCanvas, this.updateTransform = this.displayObjectUpdateTransform, this.calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._mask = null, this.filterArea = null, this.alpha = n;
		var c = new Cs(a);
		c.transform.worldTransform = this.transform.worldTransform, c.anchor.x = -(t.x / t.width), c.anchor.y = -(t.y / t.height), c.alpha = n, c._bounds = this._bounds, this._cacheData.sprite = c, this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.parent = e._tempDisplayObjectParent, this.updateTransform(), this.parent = null), this.containsPoint = c.containsPoint.bind(c);
	}
}, K.prototype._calculateCachedBounds = function() {
	this._bounds.clear(), this._cacheData.sprite.transform._worldID = this.transform._worldID, this._cacheData.sprite._calculateBounds(), this._bounds.updateID = this._boundsID;
}, K.prototype._getCachedLocalBounds = function() {
	return this._cacheData.sprite.getLocalBounds(null);
}, K.prototype._destroyCachedDisplayObject = function() {
	this._cacheData.sprite._texture.destroy(!0), this._cacheData.sprite = null, Y.removeFromCache(this._cacheData.textureCacheId), X.removeFromCache(this._cacheData.textureCacheId), this._cacheData.textureCacheId = null;
}, K.prototype._cacheAsBitmapDestroy = function(e) {
	this.cacheAsBitmap = !1, this.destroy(e);
}, K.prototype.name = null, zt.prototype.getChildByName = function(e, t) {
	for (var n = 0, r = this.children.length; n < r; n++) if (this.children[n].name === e) return this.children[n];
	if (t) for (var n = 0, r = this.children.length; n < r; n++) {
		var i = this.children[n];
		if (i.getChildByName) {
			var a = i.getChildByName(e, !0);
			if (a) return a;
		}
	}
	return null;
}, K.prototype.getGlobalPosition = function(e, t) {
	return e === void 0 && (e = new H()), t === void 0 && (t = !1), this.parent ? this.parent.toGlobal(this.position, e, t) : (e.x = this.position.x, e.y = this.position.y), e;
};
//#endregion
//#region node_modules/@pixi/app/dist/esm/app.mjs
var yl = function() {
	function e() {}
	return e.init = function(e) {
		var t = this;
		Object.defineProperty(this, "resizeTo", {
			set: function(e) {
				globalThis.removeEventListener("resize", this.queueResize), this._resizeTo = e, e && (globalThis.addEventListener("resize", this.queueResize), this.resize());
			},
			get: function() {
				return this._resizeTo;
			}
		}), this.queueResize = function() {
			t._resizeTo && (t.cancelResize(), t._resizeId = requestAnimationFrame(function() {
				return t.resize();
			}));
		}, this.cancelResize = function() {
			t._resizeId &&= (cancelAnimationFrame(t._resizeId), null);
		}, this.resize = function() {
			if (t._resizeTo) {
				t.cancelResize();
				var e, n;
				if (t._resizeTo === globalThis.window) e = globalThis.innerWidth, n = globalThis.innerHeight;
				else {
					var r = t._resizeTo, i = r.clientWidth, a = r.clientHeight;
					e = i, n = a;
				}
				t.renderer.resize(e, n);
			}
		}, this._resizeId = null, this._resizeTo = null, this.resizeTo = e.resizeTo || null;
	}, e.destroy = function() {
		globalThis.removeEventListener("resize", this.queueResize), this.cancelResize(), this.cancelResize = null, this.queueResize = null, this.resizeTo = null, this.resize = null;
	}, e.extension = q.Application, e;
}(), bl = function() {
	function e(t) {
		var n = this;
		this.stage = new zt(), t = Object.assign({ forceCanvas: !1 }, t), this.renderer = Di(t), e._plugins.forEach(function(e) {
			e.init.call(n, t);
		});
	}
	return e.registerPlugin = function(e) {
		at("6.5.0", "Application.registerPlugin() is deprecated, use extensions.add()"), Ht.add({
			type: q.Application,
			ref: e
		});
	}, e.prototype.render = function() {
		this.renderer.render(this.stage);
	}, Object.defineProperty(e.prototype, "view", {
		get: function() {
			return this.renderer.view;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "screen", {
		get: function() {
			return this.renderer.screen;
		},
		enumerable: !1,
		configurable: !0
	}), e.prototype.destroy = function(t, n) {
		var r = this, i = e._plugins.slice(0);
		i.reverse(), i.forEach(function(e) {
			e.destroy.call(r);
		}), this.stage.destroy(n), this.stage = null, this.renderer.destroy(t), this.renderer = null;
	}, e._plugins = [], e;
}();
Ht.handleByList(q.Application, bl._plugins), Ht.add(yl);
//#endregion
//#region node_modules/@pixi/mesh-extras/dist/esm/mesh-extras.mjs
var xl = function(e, t) {
	return xl = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, xl(e, t);
};
function Sl(e, t) {
	xl(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var Cl = function(e) {
	Sl(t, e);
	function t(t, n, r, i) {
		t === void 0 && (t = 100), n === void 0 && (n = 100), r === void 0 && (r = 10), i === void 0 && (i = 10);
		var a = e.call(this) || this;
		return a.segWidth = r, a.segHeight = i, a.width = t, a.height = n, a.build(), a;
	}
	return t.prototype.build = function() {
		for (var e = this.segWidth * this.segHeight, t = [], n = [], r = [], i = this.segWidth - 1, a = this.segHeight - 1, o = this.width / i, s = this.height / a, c = 0; c < e; c++) {
			var l = c % this.segWidth, u = c / this.segWidth | 0;
			t.push(l * o, u * s), n.push(l / i, u / a);
		}
		for (var d = i * a, c = 0; c < d; c++) {
			var f = c % i, p = c / i | 0, m = p * this.segWidth + f, h = p * this.segWidth + f + 1, g = (p + 1) * this.segWidth + f, _ = (p + 1) * this.segWidth + f + 1;
			r.push(m, h, g, h, _, g);
		}
		this.buffers[0].data = new Float32Array(t), this.buffers[1].data = new Float32Array(n), this.indexBuffer.data = new Uint16Array(r), this.buffers[0].update(), this.buffers[1].update(), this.indexBuffer.update();
	}, t;
}(bc), wl = function(e) {
	Sl(t, e);
	function t(t, n, r) {
		t === void 0 && (t = 200), r === void 0 && (r = 0);
		var i = e.call(this, new Float32Array(n.length * 4), new Float32Array(n.length * 4), new Uint16Array((n.length - 1) * 6)) || this;
		return i.points = n, i._width = t, i.textureScale = r, i.build(), i;
	}
	return Object.defineProperty(t.prototype, "width", {
		get: function() {
			return this._width;
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype.build = function() {
		var e = this.points;
		if (e) {
			var t = this.getBuffer("aVertexPosition"), n = this.getBuffer("aTextureCoord"), r = this.getIndex();
			if (!(e.length < 1)) {
				t.data.length / 4 !== e.length && (t.data = new Float32Array(e.length * 4), n.data = new Float32Array(e.length * 4), r.data = new Uint16Array((e.length - 1) * 6));
				var i = n.data, a = r.data;
				i[0] = 0, i[1] = 0, i[2] = 0, i[3] = 1;
				for (var o = 0, s = e[0], c = this._width * this.textureScale, l = e.length, u = 0; u < l; u++) {
					var d = u * 4;
					if (this.textureScale > 0) {
						var f = s.x - e[u].x, p = s.y - e[u].y, m = Math.sqrt(f * f + p * p);
						s = e[u], o += m / c;
					} else o = u / (l - 1);
					i[d] = o, i[d + 1] = 0, i[d + 2] = o, i[d + 3] = 1;
				}
				for (var h = 0, u = 0; u < l - 1; u++) {
					var d = u * 2;
					a[h++] = d, a[h++] = d + 1, a[h++] = d + 2, a[h++] = d + 2, a[h++] = d + 1, a[h++] = d + 3;
				}
				n.update(), r.update(), this.updateVertices();
			}
		}
	}, t.prototype.updateVertices = function() {
		var e = this.points;
		if (!(e.length < 1)) {
			for (var t = e[0], n, r = 0, i = 0, a = this.buffers[0].data, o = e.length, s = 0; s < o; s++) {
				var c = e[s], l = s * 4;
				n = s < e.length - 1 ? e[s + 1] : c, i = -(n.x - t.x), r = n.y - t.y;
				var u = Math.sqrt(r * r + i * i), d = this.textureScale > 0 ? this.textureScale * this._width / 2 : this._width / 2;
				r /= u, i /= u, r *= d, i *= d, a[l] = c.x + r, a[l + 1] = c.y + i, a[l + 2] = c.x - r, a[l + 3] = c.y - i, t = c;
			}
			this.buffers[0].update();
		}
	}, t.prototype.update = function() {
		this.textureScale > 0 ? this.build() : this.updateVertices();
	}, t;
}(bc);
(function(e) {
	Sl(t, e);
	function t(t, n, r) {
		r === void 0 && (r = 0);
		var i = this, a = new wl(t.height, n, r), o = new yc(t);
		return r > 0 && (t.baseTexture.wrapMode = ne.REPEAT), i = e.call(this, a, o) || this, i.autoUpdate = !0, i;
	}
	return t.prototype._render = function(t) {
		var n = this.geometry;
		(this.autoUpdate || n._width !== this.shader.texture.height) && (n._width = this.shader.texture.height, n.update()), e.prototype._render.call(this, t);
	}, t;
})(gc);
var Tl = function(e) {
	Sl(t, e);
	function t(t, n, r) {
		var i = this, a = new Cl(t.width, t.height, n, r), o = new yc(X.WHITE);
		return i = e.call(this, a, o) || this, i.texture = t, i.autoResize = !0, i;
	}
	return t.prototype.textureUpdated = function() {
		this._textureID = this.shader.texture._updateID;
		var e = this.geometry, t = this.shader.texture, n = t.width, r = t.height;
		this.autoResize && (e.width !== n || e.height !== r) && (e.width = this.shader.texture.width, e.height = this.shader.texture.height, e.build());
	}, Object.defineProperty(t.prototype, "texture", {
		get: function() {
			return this.shader.texture;
		},
		set: function(e) {
			this.shader.texture !== e && (this.shader.texture = e, this._textureID = -1, e.baseTexture.valid ? this.textureUpdated() : e.once("update", this.textureUpdated, this));
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype._render = function(t) {
		this._textureID !== this.shader.texture._updateID && this.textureUpdated(), e.prototype._render.call(this, t);
	}, t.prototype.destroy = function(t) {
		this.shader.texture.off("update", this.textureUpdated, this), e.prototype.destroy.call(this, t);
	}, t;
}(gc);
(function(e) {
	Sl(t, e);
	function t(t, n, r, i, a) {
		t === void 0 && (t = X.EMPTY);
		var o = this, s = new bc(n, r, i);
		s.getBuffer("aVertexPosition").static = !1;
		var c = new yc(t);
		return o = e.call(this, s, c, null, a) || this, o.autoUpdate = !0, o;
	}
	return Object.defineProperty(t.prototype, "vertices", {
		get: function() {
			return this.geometry.getBuffer("aVertexPosition").data;
		},
		set: function(e) {
			this.geometry.getBuffer("aVertexPosition").data = e;
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype._render = function(t) {
		this.autoUpdate && this.geometry.getBuffer("aVertexPosition").update(), e.prototype._render.call(this, t);
	}, t;
})(gc);
var El = 10;
(function(e) {
	Sl(t, e);
	function t(t, n, r, i, a) {
		n === void 0 && (n = El), r === void 0 && (r = El), i === void 0 && (i = El), a === void 0 && (a = El);
		var o = e.call(this, X.WHITE, 4, 4) || this;
		return o._origWidth = t.orig.width, o._origHeight = t.orig.height, o._width = o._origWidth, o._height = o._origHeight, o._leftWidth = n, o._rightWidth = i, o._topHeight = r, o._bottomHeight = a, o.texture = t, o;
	}
	return t.prototype.textureUpdated = function() {
		this._textureID = this.shader.texture._updateID, this._refresh();
	}, Object.defineProperty(t.prototype, "vertices", {
		get: function() {
			return this.geometry.getBuffer("aVertexPosition").data;
		},
		set: function(e) {
			this.geometry.getBuffer("aVertexPosition").data = e;
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype.updateHorizontalVertices = function() {
		var e = this.vertices, t = this._getMinScale();
		e[9] = e[11] = e[13] = e[15] = this._topHeight * t, e[17] = e[19] = e[21] = e[23] = this._height - this._bottomHeight * t, e[25] = e[27] = e[29] = e[31] = this._height;
	}, t.prototype.updateVerticalVertices = function() {
		var e = this.vertices, t = this._getMinScale();
		e[2] = e[10] = e[18] = e[26] = this._leftWidth * t, e[4] = e[12] = e[20] = e[28] = this._width - this._rightWidth * t, e[6] = e[14] = e[22] = e[30] = this._width;
	}, t.prototype._getMinScale = function() {
		var e = this._leftWidth + this._rightWidth, t = this._width > e ? 1 : this._width / e, n = this._topHeight + this._bottomHeight, r = this._height > n ? 1 : this._height / n;
		return Math.min(t, r);
	}, Object.defineProperty(t.prototype, "width", {
		get: function() {
			return this._width;
		},
		set: function(e) {
			this._width = e, this._refresh();
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "height", {
		get: function() {
			return this._height;
		},
		set: function(e) {
			this._height = e, this._refresh();
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "leftWidth", {
		get: function() {
			return this._leftWidth;
		},
		set: function(e) {
			this._leftWidth = e, this._refresh();
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "rightWidth", {
		get: function() {
			return this._rightWidth;
		},
		set: function(e) {
			this._rightWidth = e, this._refresh();
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "topHeight", {
		get: function() {
			return this._topHeight;
		},
		set: function(e) {
			this._topHeight = e, this._refresh();
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "bottomHeight", {
		get: function() {
			return this._bottomHeight;
		},
		set: function(e) {
			this._bottomHeight = e, this._refresh();
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype._refresh = function() {
		var e = this.texture, t = this.geometry.buffers[1].data;
		this._origWidth = e.orig.width, this._origHeight = e.orig.height;
		var n = 1 / this._origWidth, r = 1 / this._origHeight;
		t[0] = t[8] = t[16] = t[24] = 0, t[1] = t[3] = t[5] = t[7] = 0, t[6] = t[14] = t[22] = t[30] = 1, t[25] = t[27] = t[29] = t[31] = 1, t[2] = t[10] = t[18] = t[26] = n * this._leftWidth, t[4] = t[12] = t[20] = t[28] = 1 - n * this._rightWidth, t[9] = t[11] = t[13] = t[15] = r * this._topHeight, t[17] = t[19] = t[21] = t[23] = 1 - r * this._bottomHeight, this.updateHorizontalVertices(), this.updateVerticalVertices(), this.geometry.buffers[0].update(), this.geometry.buffers[1].update();
	}, t;
})(Tl);
//#endregion
//#region node_modules/@pixi/sprite-animated/dist/esm/sprite-animated.mjs
var Dl = function(e, t) {
	return Dl = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	}, Dl(e, t);
};
function Ol(e, t) {
	Dl(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var kl = function(e) {
	Ol(t, e);
	function t(t, n) {
		n === void 0 && (n = !0);
		var r = e.call(this, t[0] instanceof X ? t[0] : t[0].texture) || this;
		return r._textures = null, r._durations = null, r._autoUpdate = n, r._isConnectedToTicker = !1, r.animationSpeed = 1, r.loop = !0, r.updateAnchor = !1, r.onComplete = null, r.onFrameChange = null, r.onLoop = null, r._currentTime = 0, r._playing = !1, r._previousFrame = null, r.textures = t, r;
	}
	return t.prototype.stop = function() {
		this._playing && (this._playing = !1, this._autoUpdate && this._isConnectedToTicker && (Kt.shared.remove(this.update, this), this._isConnectedToTicker = !1));
	}, t.prototype.play = function() {
		this._playing || (this._playing = !0, this._autoUpdate && !this._isConnectedToTicker && (Kt.shared.add(this.update, this, Wt.HIGH), this._isConnectedToTicker = !0));
	}, t.prototype.gotoAndStop = function(e) {
		this.stop();
		var t = this.currentFrame;
		this._currentTime = e, t !== this.currentFrame && this.updateTexture();
	}, t.prototype.gotoAndPlay = function(e) {
		var t = this.currentFrame;
		this._currentTime = e, t !== this.currentFrame && this.updateTexture(), this.play();
	}, t.prototype.update = function(e) {
		if (this._playing) {
			var t = this.animationSpeed * e, n = this.currentFrame;
			if (this._durations !== null) {
				var r = this._currentTime % 1 * this._durations[this.currentFrame];
				for (r += t / 60 * 1e3; r < 0;) this._currentTime--, r += this._durations[this.currentFrame];
				var i = Math.sign(this.animationSpeed * e);
				for (this._currentTime = Math.floor(this._currentTime); r >= this._durations[this.currentFrame];) r -= this._durations[this.currentFrame] * i, this._currentTime += i;
				this._currentTime += r / this._durations[this.currentFrame];
			} else this._currentTime += t;
			this._currentTime < 0 && !this.loop ? (this.gotoAndStop(0), this.onComplete && this.onComplete()) : this._currentTime >= this._textures.length && !this.loop ? (this.gotoAndStop(this._textures.length - 1), this.onComplete && this.onComplete()) : n !== this.currentFrame && (this.loop && this.onLoop && (this.animationSpeed > 0 && this.currentFrame < n || this.animationSpeed < 0 && this.currentFrame > n) && this.onLoop(), this.updateTexture());
		}
	}, t.prototype.updateTexture = function() {
		var e = this.currentFrame;
		this._previousFrame !== e && (this._previousFrame = e, this._texture = this._textures[e], this._textureID = -1, this._textureTrimmedID = -1, this._cachedTint = 16777215, this.uvs = this._texture._uvs.uvsFloat32, this.updateAnchor && this._anchor.copyFrom(this._texture.defaultAnchor), this.onFrameChange && this.onFrameChange(this.currentFrame));
	}, t.prototype.destroy = function(t) {
		this.stop(), e.prototype.destroy.call(this, t), this.onComplete = null, this.onFrameChange = null, this.onLoop = null;
	}, t.fromFrames = function(e) {
		for (var n = [], r = 0; r < e.length; ++r) n.push(X.from(e[r]));
		return new t(n);
	}, t.fromImages = function(e) {
		for (var n = [], r = 0; r < e.length; ++r) n.push(X.from(e[r]));
		return new t(n);
	}, Object.defineProperty(t.prototype, "totalFrames", {
		get: function() {
			return this._textures.length;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "textures", {
		get: function() {
			return this._textures;
		},
		set: function(e) {
			if (e[0] instanceof X) this._textures = e, this._durations = null;
			else {
				this._textures = [], this._durations = [];
				for (var t = 0; t < e.length; t++) this._textures.push(e[t].texture), this._durations.push(e[t].time);
			}
			this._previousFrame = null, this.gotoAndStop(0), this.updateTexture();
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "currentFrame", {
		get: function() {
			var e = Math.floor(this._currentTime) % this._textures.length;
			return e < 0 && (e += this._textures.length), e;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "playing", {
		get: function() {
			return this._playing;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "autoUpdate", {
		get: function() {
			return this._autoUpdate;
		},
		set: function(e) {
			e !== this._autoUpdate && (this._autoUpdate = e, !this._autoUpdate && this._isConnectedToTicker ? (Kt.shared.remove(this.update, this), this._isConnectedToTicker = !1) : this._autoUpdate && !this._isConnectedToTicker && this._playing && (Kt.shared.add(this.update, this), this._isConnectedToTicker = !0));
		},
		enumerable: !1,
		configurable: !0
	}), t;
}(Cs);
//#endregion
//#region node_modules/pixi.js/dist/esm/pixi.mjs
Ht.add(Zi, la, oa, zo, Qs, Ii, uc, zc, Ua, Mo, No, ec, qt, ja);
var Al = {
	AlphaFilter: Uc,
	BlurFilter: Qc,
	BlurFilterPass: Zc,
	ColorMatrixFilter: nl,
	DisplacementFilter: sl,
	FXAAFilter: fl,
	NoiseFilter: gl
};
//#endregion
export { lt as _, ks as a, A as b, Aa as c, yn as d, X as f, st as g, U as h, Ls as i, Z as l, zt as m, kl as n, Cs as o, Di as p, bl as r, vs as s, Al as t, Pr as u, Ae as v, Fe as y };

//# sourceMappingURL=pixi.js.map