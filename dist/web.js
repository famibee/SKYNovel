import { r as __toESM, t as __commonJSMin } from "./rolldown-runtime.js";
import { l as argChk_Num, s as argChk_Boolean, t as CmnLib, u as getDateStr } from "./CmnLib.js";
import { t as SysBase } from "./SysBase.js";
import { t as Layer } from "./Layer.js";
//#region node_modules/store/src/util.js
var require_util = /* @__PURE__ */ __commonJSMin(((e, t) => {
	var n = r();
	t.exports = {
		assign: n,
		create: i(),
		trim: a(),
		bind: o,
		slice: s,
		each: c,
		map: l,
		pluck: u,
		isList: d,
		isFunction: p,
		isObject: m,
		Global: typeof window < "u" ? window : global
	};
	function r() {
		return Object.assign ? Object.assign : function(e, t, n, r) {
			for (var i = 1; i < arguments.length; i++) c(Object(arguments[i]), function(t, n) {
				e[n] = t;
			});
			return e;
		};
	}
	function i() {
		if (Object.create) return function(e, t, r, i) {
			var a = s(arguments, 1);
			return n.apply(this, [Object.create(e)].concat(a));
		};
		{
			function e() {}
			return function(t, r, i, a) {
				var o = s(arguments, 1);
				return e.prototype = t, n.apply(this, [new e()].concat(o));
			};
		}
	}
	function a() {
		return String.prototype.trim ? function(e) {
			return String.prototype.trim.call(e);
		} : function(e) {
			return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
		};
	}
	function o(e, t) {
		return function() {
			return t.apply(e, Array.prototype.slice.call(arguments, 0));
		};
	}
	function s(e, t) {
		return Array.prototype.slice.call(e, t || 0);
	}
	function c(e, t) {
		u(e, function(e, n) {
			return t(e, n), !1;
		});
	}
	function l(e, t) {
		var n = d(e) ? [] : {};
		return u(e, function(e, r) {
			return n[r] = t(e, r), !1;
		}), n;
	}
	function u(e, t) {
		if (d(e)) {
			for (var n = 0; n < e.length; n++) if (t(e[n], n)) return e[n];
		} else for (var r in e) if (e.hasOwnProperty(r) && t(e[r], r)) return e[r];
	}
	function d(e) {
		return e != null && typeof e != "function" && typeof e.length == "number";
	}
	function p(e) {
		return e && {}.toString.call(e) === "[object Function]";
	}
	function m(e) {
		return e && {}.toString.call(e) === "[object Object]";
	}
})), require_store_engine = /* @__PURE__ */ __commonJSMin(((e, t) => {
	var n = require_util(), r = n.slice, i = n.pluck, a = n.each, o = n.bind, s = n.create, c = n.isList, l = n.isFunction, u = n.isObject;
	t.exports = { createStore: m };
	var d = {
		version: "2.0.12",
		enabled: !1,
		get: function(e, t) {
			var n = this.storage.read(this._namespacePrefix + e);
			return this._deserialize(n, t);
		},
		set: function(e, t) {
			return t === void 0 ? this.remove(e) : (this.storage.write(this._namespacePrefix + e, this._serialize(t)), t);
		},
		remove: function(e) {
			this.storage.remove(this._namespacePrefix + e);
		},
		each: function(e) {
			var t = this;
			this.storage.each(function(n, r) {
				e.call(t, t._deserialize(n), (r || "").replace(t._namespaceRegexp, ""));
			});
		},
		clearAll: function() {
			this.storage.clearAll();
		},
		hasNamespace: function(e) {
			return this._namespacePrefix == "__storejs_" + e + "_";
		},
		createStore: function() {
			return m.apply(this, arguments);
		},
		addPlugin: function(e) {
			this._addPlugin(e);
		},
		namespace: function(e) {
			return m(this.storage, this.plugins, e);
		}
	};
	function p() {
		var e = typeof console > "u" ? null : console;
		e && (e.warn ? e.warn : e.log).apply(e, arguments);
	}
	function m(e, t, n) {
		n ||= "", e && !c(e) && (e = [e]), t && !c(t) && (t = [t]);
		var m = n ? "__storejs_" + n + "_" : "", h = n ? RegExp("^" + m) : null;
		if (!/^[a-zA-Z0-9_\-]*$/.test(n)) throw Error("store.js namespaces can only have alphanumerics + underscores and dashes");
		var g = s({
			_namespacePrefix: m,
			_namespaceRegexp: h,
			_testStorage: function(e) {
				try {
					var t = "__storejs__test__";
					e.write(t, t);
					var n = e.read(t) === t;
					return e.remove(t), n;
				} catch {
					return !1;
				}
			},
			_assignPluginFnProp: function(e, t) {
				var n = this[t];
				this[t] = function() {
					var t = r(arguments, 0), i = this;
					function o() {
						if (n) return a(arguments, function(e, n) {
							t[n] = e;
						}), n.apply(i, t);
					}
					var s = [o].concat(t);
					return e.apply(i, s);
				};
			},
			_serialize: function(e) {
				return JSON.stringify(e);
			},
			_deserialize: function(e, t) {
				if (!e) return t;
				var n = "";
				try {
					n = JSON.parse(e);
				} catch {
					n = e;
				}
				return n === void 0 ? t : n;
			},
			_addStorage: function(e) {
				this.enabled || this._testStorage(e) && (this.storage = e, this.enabled = !0);
			},
			_addPlugin: function(e) {
				var t = this;
				if (c(e)) {
					a(e, function(e) {
						t._addPlugin(e);
					});
					return;
				}
				if (!i(this.plugins, function(t) {
					return e === t;
				})) {
					if (this.plugins.push(e), !l(e)) throw Error("Plugins must be function values that return objects");
					var n = e.call(this);
					if (!u(n)) throw Error("Plugins must return an object of function properties");
					a(n, function(n, r) {
						if (!l(n)) throw Error("Bad plugin property: " + r + " from plugin " + e.name + ". Plugins should only return functions.");
						t._assignPluginFnProp(n, r);
					});
				}
			},
			addStorage: function(e) {
				p("store.addStorage(storage) is deprecated. Use createStore([storages])"), this._addStorage(e);
			}
		}, d, { plugins: [] });
		return g.raw = {}, a(g, function(e, t) {
			l(e) && (g.raw[t] = o(g, e));
		}), a(e, function(e) {
			g._addStorage(e);
		}), a(t, function(e) {
			g._addPlugin(e);
		}), g;
	}
})), require_localStorage = /* @__PURE__ */ __commonJSMin(((e, t) => {
	var n = require_util().Global;
	t.exports = {
		name: "localStorage",
		read: i,
		write: a,
		each: o,
		remove: s,
		clearAll: c
	};
	function r() {
		return n.localStorage;
	}
	function i(e) {
		return r().getItem(e);
	}
	function a(e, t) {
		return r().setItem(e, t);
	}
	function o(e) {
		for (var t = r().length - 1; t >= 0; t--) {
			var n = r().key(t);
			e(i(n), n);
		}
	}
	function s(e) {
		return r().removeItem(e);
	}
	function c() {
		return r().clear();
	}
})), require_oldFF_globalStorage = /* @__PURE__ */ __commonJSMin(((e, t) => {
	var n = require_util().Global;
	t.exports = {
		name: "oldFF-globalStorage",
		read: i,
		write: a,
		each: o,
		remove: s,
		clearAll: c
	};
	var r = n.globalStorage;
	function i(e) {
		return r[e];
	}
	function a(e, t) {
		r[e] = t;
	}
	function o(e) {
		for (var t = r.length - 1; t >= 0; t--) {
			var n = r.key(t);
			e(r[n], n);
		}
	}
	function s(e) {
		return r.removeItem(e);
	}
	function c() {
		o(function(e, t) {
			delete r[e];
		});
	}
})), require_oldIE_userDataStorage = /* @__PURE__ */ __commonJSMin(((e, t) => {
	var n = require_util().Global;
	t.exports = {
		name: "oldIE-userDataStorage",
		write: s,
		read: c,
		each: l,
		remove: u,
		clearAll: d
	};
	var r = "storejs", i = n.document, a = h(), o = (n.navigator ? n.navigator.userAgent : "").match(/ (MSIE 8|MSIE 9|MSIE 10)\./);
	function s(e, t) {
		if (!o) {
			var n = m(e);
			a(function(e) {
				e.setAttribute(n, t), e.save(r);
			});
		}
	}
	function c(e) {
		if (!o) {
			var t = m(e), n = null;
			return a(function(e) {
				n = e.getAttribute(t);
			}), n;
		}
	}
	function l(e) {
		a(function(t) {
			for (var n = t.XMLDocument.documentElement.attributes, r = n.length - 1; r >= 0; r--) {
				var i = n[r];
				e(t.getAttribute(i.name), i.name);
			}
		});
	}
	function u(e) {
		var t = m(e);
		a(function(e) {
			e.removeAttribute(t), e.save(r);
		});
	}
	function d() {
		a(function(e) {
			var t = e.XMLDocument.documentElement.attributes;
			e.load(r);
			for (var n = t.length - 1; n >= 0; n--) e.removeAttribute(t[n].name);
			e.save(r);
		});
	}
	var p = /* @__PURE__ */ RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
	function m(e) {
		return e.replace(/^\d/, "___$&").replace(p, "___");
	}
	function h() {
		if (!i || !i.documentElement || !i.documentElement.addBehavior) return null;
		var e = "script", t, n, a;
		try {
			n = new ActiveXObject("htmlfile"), n.open(), n.write("<" + e + ">document.w=window</" + e + "><iframe src=\"/favicon.ico\"></iframe>"), n.close(), t = n.w.frames[0].document, a = t.createElement("div");
		} catch {
			a = i.createElement("div"), t = i.body;
		}
		return function(e) {
			var n = [].slice.call(arguments, 0);
			n.unshift(a), t.appendChild(a), a.addBehavior("#default#userData"), a.load(r), e.apply(this, n), t.removeChild(a);
		};
	}
})), require_cookieStorage = /* @__PURE__ */ __commonJSMin(((e, t) => {
	var n = require_util(), r = n.Global, i = n.trim;
	t.exports = {
		name: "cookieStorage",
		read: o,
		write: c,
		each: s,
		remove: l,
		clearAll: u
	};
	var a = r.document;
	function o(e) {
		if (!e || !d(e)) return null;
		var t = "(?:^|.*;\\s*)" + escape(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*";
		return unescape(a.cookie.replace(new RegExp(t), "$1"));
	}
	function s(e) {
		for (var t = a.cookie.split(/; ?/g), n = t.length - 1; n >= 0; n--) if (i(t[n])) {
			var r = t[n].split("="), o = unescape(r[0]);
			e(unescape(r[1]), o);
		}
	}
	function c(e, t) {
		e && (a.cookie = escape(e) + "=" + escape(t) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/");
	}
	function l(e) {
		!e || !d(e) || (a.cookie = escape(e) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/");
	}
	function u() {
		s(function(e, t) {
			l(t);
		});
	}
	function d(e) {
		return RegExp("(?:^|;\\s*)" + escape(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(a.cookie);
	}
})), require_sessionStorage = /* @__PURE__ */ __commonJSMin(((e, t) => {
	var n = require_util().Global;
	t.exports = {
		name: "sessionStorage",
		read: i,
		write: a,
		each: o,
		remove: s,
		clearAll: c
	};
	function r() {
		return n.sessionStorage;
	}
	function i(e) {
		return r().getItem(e);
	}
	function a(e, t) {
		return r().setItem(e, t);
	}
	function o(e) {
		for (var t = r().length - 1; t >= 0; t--) {
			var n = r().key(t);
			e(i(n), n);
		}
	}
	function s(e) {
		return r().removeItem(e);
	}
	function c() {
		return r().clear();
	}
})), require_memoryStorage = /* @__PURE__ */ __commonJSMin(((e, t) => {
	t.exports = {
		name: "memoryStorage",
		read: r,
		write: i,
		each: a,
		remove: o,
		clearAll: s
	};
	var n = {};
	function r(e) {
		return n[e];
	}
	function i(e, t) {
		n[e] = t;
	}
	function a(e) {
		for (var t in n) n.hasOwnProperty(t) && e(n[t], t);
	}
	function o(e) {
		delete n[e];
	}
	function s(e) {
		n = {};
	}
})), require_all = /* @__PURE__ */ __commonJSMin(((e, t) => {
	t.exports = [
		require_localStorage(),
		require_oldFF_globalStorage(),
		require_oldIE_userDataStorage(),
		require_cookieStorage(),
		require_sessionStorage(),
		require_memoryStorage()
	];
})), require_json2$1 = /* @__PURE__ */ __commonJSMin((() => {
	typeof JSON != "object" && (JSON = {}), (function() {
		var rx_one = /^[\],:{}\s]*$/, rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, rx_four = /(?:^|:|,)(?:\s*\[)+/g, rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
		function f(e) {
			return e < 10 ? "0" + e : e;
		}
		function this_value() {
			return this.valueOf();
		}
		typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function() {
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
		}, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value);
		var gap, indent, meta, rep;
		function quote(e) {
			return rx_escapable.lastIndex = 0, rx_escapable.test(e) ? "\"" + e.replace(rx_escapable, function(e) {
				var t = meta[e];
				return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
			}) + "\"" : "\"" + e + "\"";
		}
		function str(e, t) {
			var n, r, i, a, o = gap, s, c = t[e];
			switch (c && typeof c == "object" && typeof c.toJSON == "function" && (c = c.toJSON(e)), typeof rep == "function" && (c = rep.call(t, e, c)), typeof c) {
				case "string": return quote(c);
				case "number": return isFinite(c) ? String(c) : "null";
				case "boolean":
				case "null": return String(c);
				case "object":
					if (!c) return "null";
					if (gap += indent, s = [], Object.prototype.toString.apply(c) === "[object Array]") {
						for (a = c.length, n = 0; n < a; n += 1) s[n] = str(n, c) || "null";
						return i = s.length === 0 ? "[]" : gap ? "[\n" + gap + s.join(",\n" + gap) + "\n" + o + "]" : "[" + s.join(",") + "]", gap = o, i;
					}
					if (rep && typeof rep == "object") for (a = rep.length, n = 0; n < a; n += 1) typeof rep[n] == "string" && (r = rep[n], i = str(r, c), i && s.push(quote(r) + (gap ? ": " : ":") + i));
					else for (r in c) Object.prototype.hasOwnProperty.call(c, r) && (i = str(r, c), i && s.push(quote(r) + (gap ? ": " : ":") + i));
					return i = s.length === 0 ? "{}" : gap ? "{\n" + gap + s.join(",\n" + gap) + "\n" + o + "}" : "{" + s.join(",") + "}", gap = o, i;
			}
		}
		typeof JSON.stringify != "function" && (meta = {
			"\b": "\\b",
			"	": "\\t",
			"\n": "\\n",
			"\f": "\\f",
			"\r": "\\r",
			"\"": "\\\"",
			"\\": "\\\\"
		}, JSON.stringify = function(e, t, n) {
			var r;
			if (gap = "", indent = "", typeof n == "number") for (r = 0; r < n; r += 1) indent += " ";
			else typeof n == "string" && (indent = n);
			if (rep = t, t && typeof t != "function" && (typeof t != "object" || typeof t.length != "number")) throw Error("JSON.stringify");
			return str("", { "": e });
		}), typeof JSON.parse != "function" && (JSON.parse = function(text, reviver) {
			var j;
			function walk(e, t) {
				var n, r, i = e[t];
				if (i && typeof i == "object") for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), r === void 0 ? delete i[n] : i[n] = r);
				return reviver.call(e, t, i);
			}
			if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function(e) {
				return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
			})), rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({ "": j }, "") : j;
			throw SyntaxError("JSON.parse");
		});
	})();
})), require_json2 = /* @__PURE__ */ __commonJSMin(((e, t) => {
	t.exports = n;
	function n() {
		return require_json2$1(), {};
	}
})), require_store_legacy = /* @__PURE__ */ __commonJSMin(((e, t) => {
	var n = require_store_engine(), r = require_all(), i = [require_json2()];
	t.exports = n.createStore(r, i);
})), import_store_legacy = /* @__PURE__ */ __toESM(require_store_legacy()), devtools = {
	isOpen: !1,
	orientation: void 0
}, threshold = 170, emitEvent = (e, t) => {
	globalThis.dispatchEvent(new globalThis.CustomEvent("devtoolschange", { detail: {
		isOpen: e,
		orientation: t
	} }));
}, main = ({ emitEvents: e = !0 } = {}) => {
	let t = globalThis.outerWidth - globalThis.innerWidth > threshold, n = globalThis.outerHeight - globalThis.innerHeight > threshold, r = t ? "vertical" : "horizontal";
	!(n && t) && (globalThis.Firebug && globalThis.Firebug.chrome && globalThis.Firebug.chrome.isInitialized || t || n) ? ((!devtools.isOpen || devtools.orientation !== r) && e && emitEvent(!0, r), devtools.isOpen = !0, devtools.orientation = r) : (devtools.isOpen && e && emitEvent(!1, void 0), devtools.isOpen = !1, devtools.orientation = void 0);
};
main({ emitEvents: !1 }), setInterval(main, 500);
//#endregion
//#region src/sn/SysWeb.ts
var SysWeb = class extends SysBase {
	#e;
	constructor(...[e = {}, t = {
		cur: "prj/",
		crypto: !1,
		dip: ""
	}]) {
		super(e, t);
		let n = t.cur.split("/");
		this.#e = n.length > 2 ? n.slice(0, -2).join("/") + "/" : "", this.loaded(e, t);
	}
	async loaded(...[e, t]) {
		await super.loaded(e, t), document.querySelectorAll("[data-prj]").forEach((e) => {
			let t = e.attributes.getNamedItem("data-prj");
			t && e.addEventListener("click", () => {
				this.runSN(t.value);
			}, { passive: !0 });
		}), document.querySelectorAll("[data-reload]").forEach((e) => e.addEventListener("click", () => {
			this.run();
		}, { passive: !0 })), t.dip && (CmnLib.hDip = JSON.parse(t.dip));
		let n = new URLSearchParams(location.search), r = n.get("dip");
		if (r && (CmnLib.hDip = {
			...CmnLib.hDip,
			...JSON.parse(r.replaceAll("%2C", ","))
		}), !argChk_Boolean(CmnLib.hDip, "oninit_run", !0)) return;
		argChk_Boolean(CmnLib.hDip, "dbg", !1) && (CmnLib.isDbg = !0, this.fetch = (e, t) => fetch(e, {
			...t,
			mode: "cors"
		})), this.extPort = argChk_Num(CmnLib.hDip, "port", this.extPort);
		let i = n.get("cur");
		i && (t.cur = this.#e + i + "/"), await this.run();
	}
	#t = ":";
	async runSN(e) {
		this.arg.cur = this.#e + e + "/", this.#t !== this.arg.cur && (this.#t = this.arg.cur, await this.run());
	}
	async initVal(e, t) {
		let n = encodeURIComponent(document.location.hostname);
		e["const.sn.isDebugger"] = n === "localhost" || n === "127.0.0.1";
		let r = this.cfg.headNs;
		this.flushSub = this.arg.crypto ? async () => {
			import_store_legacy.default.set(r + "sys_", await this.enc(JSON.stringify(this.data.sys))), import_store_legacy.default.set(r + "mark_", await this.enc(JSON.stringify(this.data.mark))), import_store_legacy.default.set(r + "kidoku_", await this.enc(JSON.stringify(this.data.kidoku)));
		} : () => {
			import_store_legacy.default.set(r + "sys", this.data.sys), import_store_legacy.default.set(r + "mark", this.data.mark), import_store_legacy.default.set(r + "kidoku", this.data.kidoku);
		};
		let i = r + (this.arg.crypto ? "sys_" : "sys");
		if (e["const.sn.isFirstBoot"] = import_store_legacy.default.get(i) === void 0) {
			this.data.sys = {}, this.data.mark = {}, this.data.kidoku = {}, t(this.data);
			return;
		}
		if (!this.arg.crypto) {
			this.data.sys = import_store_legacy.default.get(r + "sys"), this.data.mark = import_store_legacy.default.get(r + "mark"), this.data.kidoku = import_store_legacy.default.get(r + "kidoku"), t(this.data);
			return;
		}
		let a = "";
		try {
			a = "sys", this.data.sys = JSON.parse(await this.dec("json", import_store_legacy.default.get(r + "sys_"))), a += String(this.val.getVal("sys:TextLayer.Back.Alpha", 1)), a = "mark", this.data.mark = JSON.parse(await this.dec("json", import_store_legacy.default.get(r + "mark_"))), a = "kidoku", this.data.kidoku = JSON.parse(await this.dec("json", import_store_legacy.default.get(r + "kidoku_")));
		} catch (e) {
			console.error(`セーブデータ（${a}）が壊れています。一度クリアする必要があります(a) %o`, e);
		}
		t(this.data);
	}
	init(e, t, n) {
		let r = super.init(e, t, n), i = t.view.parentElement;
		if ("requestFullscreen" in document.body) this.tglFlscr_sub = this.isFullScr ? () => document.exitFullscreen() : () => i.requestFullscreen(), this.elc.add(document, "fullscreenchange", () => {
			this.isFullScr = !!document.fullscreenElement;
		});
		else {
			let e = document;
			this.tglFlscr_sub = this.isFullScr ? () => e.webkitCancelFullScreen() : () => i.webkitRequestFullscreen(), this.elc.add(document, "fullscreenchange", () => {
				this.isFullScr = !!e.webkitFullscreenElement;
			});
		}
		return this.cfg.oCfg.debug.devtool || this.elc.add(globalThis, "devtoolschange", (e) => {
			e.detail.isOpen && (console.error("DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。"), this.main?.destroy());
		}, {
			once: !0,
			passive: !0
		}), r;
	}
	cvsResize() {
		if (super.cvsResize(), !this.isFullScr || !this.main) return;
		let e = this.main.cvs.style;
		e.width = e.height = "";
	}
	pathBaseCnvSnPath4Dbg = "${pathbase}/";
	_export = () => ((async () => {
		let e = JSON.stringify({
			sys: this.data.sys,
			mark: this.data.mark,
			kidoku: this.data.kidoku
		}), t = this.arg.crypto ? await this.enc(e) : e, n = new Blob([t], { type: "text/json" }), r = document.createElement("a");
		r.href = URL.createObjectURL(n), r.download = (this.arg.crypto ? "" : "no_crypto_") + this.cfg.headNs + getDateStr("-", "_", "") + ".swpd", r.click(), CmnLib.debugLog && console.log("プレイデータをエクスポートしました"), setTimeout(() => this.fire("sn:exported", new MouseEvent("click")), 10);
	})(), !1);
	_import = () => (new Promise((e, t) => {
		let n = document.createElement("input");
		n.type = "file", n.accept = ".swpd, text/plain", n.onchange = () => {
			let r = n.files?.[0];
			r ? e(r) : t(/* @__PURE__ */ Error("ファイル選択に失敗しました"));
		}, n.click();
	}).then(async (e) => {
		let t = await e.text(), n = JSON.parse(this.arg.crypto ? await this.dec("json", t) : t);
		if (n.sys["const.sn.cfg.ns"] !== this.cfg.oCfg.save_ns) {
			console.error(`別のゲーム【プロジェクト名=${n.sys["const.sn.cfg.ns"]}】のプレイデータです`);
			return;
		}
		this.data.sys = n.sys, this.data.mark = n.mark, this.data.kidoku = n.kidoku, this.flush(), this.val.updateData(n), CmnLib.debugLog && console.log("プレイデータをインポートしました"), this.fire("sn:imported", new MouseEvent("click"));
	}).catch((e) => console.error(`異常なプレイデータです ${String(e)}`)), !1);
	navigate_to = (e) => {
		let { url: t } = e;
		if (!t) throw "[navigate_to] urlは必須です";
		return globalThis.open(t, "_blank"), !1;
	};
	titleSub(e) {
		document.title = e, document.querySelectorAll("[data-title]").forEach((t) => {
			t.textContent = e;
		});
	}
	async savePic(e, t) {
		let n = document.createElement("a");
		n.href = t, n.download = e, n.click(), CmnLib.debugLog && console.log("画像ファイルをダウンロードします");
	}
	#n = {};
	async appendFile(e, t) {
		let n = (this.#n[e] ?? "") + t;
		this.#n[e] = n, await this.outputFile(e, n);
	}
	async outputFile(e, t) {
		let n = new Blob([t], { type: "text/json" }), r = document.createElement("a");
		r.href = URL.createObjectURL(n), r.download = e, r.click();
	}
};
//#endregion
export { CmnLib, Layer, SysWeb, argChk_Boolean, argChk_Num };

//# sourceMappingURL=web.js.map