import { i as __toESM, t as __commonJSMin } from "./chunk.js";
import { l as argChk_Num, s as argChk_Boolean, t as CmnLib, u as getDateStr } from "./CmnLib.js";
import "./CmnInterface.js";
import "./pixi.js";
import "./EventListenerCtn.js";
import "./ConfigBase.js";
import { t as SysBase } from "./SysBase.js";
import { t as Layer } from "./Layer.js";
var require_util = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assign = make_assign();
	module.exports = {
		assign,
		create: make_create(),
		trim: make_trim(),
		bind,
		slice,
		each,
		map,
		pluck,
		isList,
		isFunction,
		isObject,
		Global: typeof window < "u" ? window : global
	};
	function make_assign() {
		return Object.assign ? Object.assign : function(obj, props1, props2, etc) {
			for (var i = 1; i < arguments.length; i++) each(Object(arguments[i]), function(val, key) {
				obj[key] = val;
			});
			return obj;
		};
	}
	function make_create() {
		if (Object.create) return function(obj, assignProps1, assignProps2, etc) {
			var assignArgsList = slice(arguments, 1);
			return assign.apply(this, [Object.create(obj)].concat(assignArgsList));
		};
		{
			function F() {}
			return function(obj, assignProps1, assignProps2, etc) {
				var assignArgsList = slice(arguments, 1);
				return F.prototype = obj, assign.apply(this, [new F()].concat(assignArgsList));
			};
		}
	}
	function make_trim() {
		return String.prototype.trim ? function(str) {
			return String.prototype.trim.call(str);
		} : function(str) {
			return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
		};
	}
	function bind(obj, fn) {
		return function() {
			return fn.apply(obj, Array.prototype.slice.call(arguments, 0));
		};
	}
	function slice(arr, index) {
		return Array.prototype.slice.call(arr, index || 0);
	}
	function each(obj, fn) {
		pluck(obj, function(val, key) {
			return fn(val, key), !1;
		});
	}
	function map(obj, fn) {
		var res = isList(obj) ? [] : {};
		return pluck(obj, function(v, k) {
			return res[k] = fn(v, k), !1;
		}), res;
	}
	function pluck(obj, fn) {
		if (isList(obj)) {
			for (var i = 0; i < obj.length; i++) if (fn(obj[i], i)) return obj[i];
		} else for (var key in obj) if (obj.hasOwnProperty(key) && fn(obj[key], key)) return obj[key];
	}
	function isList(val) {
		return val != null && typeof val != "function" && typeof val.length == "number";
	}
	function isFunction(val) {
		return val && {}.toString.call(val) === "[object Function]";
	}
	function isObject(val) {
		return val && {}.toString.call(val) === "[object Object]";
	}
})), require_store_engine = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var util = require_util(), slice = util.slice, pluck = util.pluck, each = util.each, bind = util.bind, create = util.create, isList = util.isList, isFunction = util.isFunction, isObject = util.isObject;
	module.exports = { createStore };
	var storeAPI = {
		version: "2.0.12",
		enabled: !1,
		get: function(key, optionalDefaultValue) {
			var data = this.storage.read(this._namespacePrefix + key);
			return this._deserialize(data, optionalDefaultValue);
		},
		set: function(key, value) {
			return value === void 0 ? this.remove(key) : (this.storage.write(this._namespacePrefix + key, this._serialize(value)), value);
		},
		remove: function(key) {
			this.storage.remove(this._namespacePrefix + key);
		},
		each: function(callback) {
			var self = this;
			this.storage.each(function(val, namespacedKey) {
				callback.call(self, self._deserialize(val), (namespacedKey || "").replace(self._namespaceRegexp, ""));
			});
		},
		clearAll: function() {
			this.storage.clearAll();
		},
		hasNamespace: function(namespace) {
			return this._namespacePrefix == "__storejs_" + namespace + "_";
		},
		createStore: function() {
			return createStore.apply(this, arguments);
		},
		addPlugin: function(plugin) {
			this._addPlugin(plugin);
		},
		namespace: function(namespace) {
			return createStore(this.storage, this.plugins, namespace);
		}
	};
	function _warn() {
		var _console = typeof console > "u" ? null : console;
		_console && (_console.warn ? _console.warn : _console.log).apply(_console, arguments);
	}
	function createStore(storages, plugins, namespace) {
		namespace ||= "", storages && !isList(storages) && (storages = [storages]), plugins && !isList(plugins) && (plugins = [plugins]);
		var namespacePrefix = namespace ? "__storejs_" + namespace + "_" : "", namespaceRegexp = namespace ? /* @__PURE__ */ RegExp("^" + namespacePrefix) : null;
		if (!/^[a-zA-Z0-9_\-]*$/.test(namespace)) throw Error("store.js namespaces can only have alphanumerics + underscores and dashes");
		var store$1 = create({
			_namespacePrefix: namespacePrefix,
			_namespaceRegexp: namespaceRegexp,
			_testStorage: function(storage) {
				try {
					var testStr = "__storejs__test__";
					storage.write(testStr, testStr);
					var ok = storage.read(testStr) === testStr;
					return storage.remove(testStr), ok;
				} catch {
					return !1;
				}
			},
			_assignPluginFnProp: function(pluginFnProp, propName) {
				var oldFn = this[propName];
				this[propName] = function() {
					var args = slice(arguments, 0), self = this;
					function super_fn() {
						if (oldFn) return each(arguments, function(arg, i) {
							args[i] = arg;
						}), oldFn.apply(self, args);
					}
					var newFnArgs = [super_fn].concat(args);
					return pluginFnProp.apply(self, newFnArgs);
				};
			},
			_serialize: function(obj) {
				return JSON.stringify(obj);
			},
			_deserialize: function(strVal, defaultVal) {
				if (!strVal) return defaultVal;
				var val = "";
				try {
					val = JSON.parse(strVal);
				} catch {
					val = strVal;
				}
				return val === void 0 ? defaultVal : val;
			},
			_addStorage: function(storage) {
				this.enabled || this._testStorage(storage) && (this.storage = storage, this.enabled = !0);
			},
			_addPlugin: function(plugin) {
				var self = this;
				if (isList(plugin)) {
					each(plugin, function(plugin$1) {
						self._addPlugin(plugin$1);
					});
					return;
				}
				if (!pluck(this.plugins, function(seenPlugin) {
					return plugin === seenPlugin;
				})) {
					if (this.plugins.push(plugin), !isFunction(plugin)) throw Error("Plugins must be function values that return objects");
					var pluginProperties = plugin.call(this);
					if (!isObject(pluginProperties)) throw Error("Plugins must return an object of function properties");
					each(pluginProperties, function(pluginFnProp, propName) {
						if (!isFunction(pluginFnProp)) throw Error("Bad plugin property: " + propName + " from plugin " + plugin.name + ". Plugins should only return functions.");
						self._assignPluginFnProp(pluginFnProp, propName);
					});
				}
			},
			addStorage: function(storage) {
				_warn("store.addStorage(storage) is deprecated. Use createStore([storages])"), this._addStorage(storage);
			}
		}, storeAPI, { plugins: [] });
		return store$1.raw = {}, each(store$1, function(prop, propName) {
			isFunction(prop) && (store$1.raw[propName] = bind(store$1, prop));
		}), each(storages, function(storage) {
			store$1._addStorage(storage);
		}), each(plugins, function(plugin) {
			store$1._addPlugin(plugin);
		}), store$1;
	}
})), require_localStorage = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Global = require_util().Global;
	module.exports = {
		name: "localStorage",
		read,
		write,
		each,
		remove,
		clearAll
	};
	function localStorage() {
		return Global.localStorage;
	}
	function read(key) {
		return localStorage().getItem(key);
	}
	function write(key, data) {
		return localStorage().setItem(key, data);
	}
	function each(fn) {
		for (var i = localStorage().length - 1; i >= 0; i--) {
			var key = localStorage().key(i);
			fn(read(key), key);
		}
	}
	function remove(key) {
		return localStorage().removeItem(key);
	}
	function clearAll() {
		return localStorage().clear();
	}
})), require_oldFF_globalStorage = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Global = require_util().Global;
	module.exports = {
		name: "oldFF-globalStorage",
		read,
		write,
		each,
		remove,
		clearAll
	};
	var globalStorage = Global.globalStorage;
	function read(key) {
		return globalStorage[key];
	}
	function write(key, data) {
		globalStorage[key] = data;
	}
	function each(fn) {
		for (var i = globalStorage.length - 1; i >= 0; i--) {
			var key = globalStorage.key(i);
			fn(globalStorage[key], key);
		}
	}
	function remove(key) {
		return globalStorage.removeItem(key);
	}
	function clearAll() {
		each(function(key, _) {
			delete globalStorage[key];
		});
	}
})), require_oldIE_userDataStorage = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Global = require_util().Global;
	module.exports = {
		name: "oldIE-userDataStorage",
		write,
		read,
		each,
		remove,
		clearAll
	};
	var storageName = "storejs", doc = Global.document, _withStorageEl = _makeIEStorageElFunction(), disable = (Global.navigator ? Global.navigator.userAgent : "").match(/ (MSIE 8|MSIE 9|MSIE 10)\./);
	function write(unfixedKey, data) {
		if (!disable) {
			var fixedKey = fixKey(unfixedKey);
			_withStorageEl(function(storageEl) {
				storageEl.setAttribute(fixedKey, data), storageEl.save(storageName);
			});
		}
	}
	function read(unfixedKey) {
		if (!disable) {
			var fixedKey = fixKey(unfixedKey), res = null;
			return _withStorageEl(function(storageEl) {
				res = storageEl.getAttribute(fixedKey);
			}), res;
		}
	}
	function each(callback) {
		_withStorageEl(function(storageEl) {
			for (var attributes = storageEl.XMLDocument.documentElement.attributes, i = attributes.length - 1; i >= 0; i--) {
				var attr = attributes[i];
				callback(storageEl.getAttribute(attr.name), attr.name);
			}
		});
	}
	function remove(unfixedKey) {
		var fixedKey = fixKey(unfixedKey);
		_withStorageEl(function(storageEl) {
			storageEl.removeAttribute(fixedKey), storageEl.save(storageName);
		});
	}
	function clearAll() {
		_withStorageEl(function(storageEl) {
			var attributes = storageEl.XMLDocument.documentElement.attributes;
			storageEl.load(storageName);
			for (var i = attributes.length - 1; i >= 0; i--) storageEl.removeAttribute(attributes[i].name);
			storageEl.save(storageName);
		});
	}
	var forbiddenCharsRegex = RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
	function fixKey(key) {
		return key.replace(/^\d/, "___$&").replace(forbiddenCharsRegex, "___");
	}
	function _makeIEStorageElFunction() {
		if (!doc || !doc.documentElement || !doc.documentElement.addBehavior) return null;
		var scriptTag = "script", storageOwner, storageContainer, storageEl;
		try {
			storageContainer = new ActiveXObject("htmlfile"), storageContainer.open(), storageContainer.write("<" + scriptTag + ">document.w=window</" + scriptTag + "><iframe src=\"/favicon.ico\"></iframe>"), storageContainer.close(), storageOwner = storageContainer.w.frames[0].document, storageEl = storageOwner.createElement("div");
		} catch {
			storageEl = doc.createElement("div"), storageOwner = doc.body;
		}
		return function(storeFunction) {
			var args = [].slice.call(arguments, 0);
			args.unshift(storageEl), storageOwner.appendChild(storageEl), storageEl.addBehavior("#default#userData"), storageEl.load(storageName), storeFunction.apply(this, args), storageOwner.removeChild(storageEl);
		};
	}
})), require_cookieStorage = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var util = require_util(), Global = util.Global, trim = util.trim;
	module.exports = {
		name: "cookieStorage",
		read,
		write,
		each,
		remove,
		clearAll
	};
	var doc = Global.document;
	function read(key) {
		if (!key || !_has(key)) return null;
		var regexpStr = "(?:^|.*;\\s*)" + escape(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*";
		return unescape(doc.cookie.replace(new RegExp(regexpStr), "$1"));
	}
	function each(callback) {
		for (var cookies = doc.cookie.split(/; ?/g), i = cookies.length - 1; i >= 0; i--) if (trim(cookies[i])) {
			var kvp = cookies[i].split("="), key = unescape(kvp[0]);
			callback(unescape(kvp[1]), key);
		}
	}
	function write(key, data) {
		key && (doc.cookie = escape(key) + "=" + escape(data) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/");
	}
	function remove(key) {
		!key || !_has(key) || (doc.cookie = escape(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/");
	}
	function clearAll() {
		each(function(_, key) {
			remove(key);
		});
	}
	function _has(key) {
		return (/* @__PURE__ */ RegExp("(?:^|;\\s*)" + escape(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(doc.cookie);
	}
})), require_sessionStorage = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Global = require_util().Global;
	module.exports = {
		name: "sessionStorage",
		read,
		write,
		each,
		remove,
		clearAll
	};
	function sessionStorage() {
		return Global.sessionStorage;
	}
	function read(key) {
		return sessionStorage().getItem(key);
	}
	function write(key, data) {
		return sessionStorage().setItem(key, data);
	}
	function each(fn) {
		for (var i = sessionStorage().length - 1; i >= 0; i--) {
			var key = sessionStorage().key(i);
			fn(read(key), key);
		}
	}
	function remove(key) {
		return sessionStorage().removeItem(key);
	}
	function clearAll() {
		return sessionStorage().clear();
	}
})), require_memoryStorage = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		name: "memoryStorage",
		read,
		write,
		each,
		remove,
		clearAll
	};
	var memoryStorage = {};
	function read(key) {
		return memoryStorage[key];
	}
	function write(key, data) {
		memoryStorage[key] = data;
	}
	function each(callback) {
		for (var key in memoryStorage) memoryStorage.hasOwnProperty(key) && callback(memoryStorage[key], key);
	}
	function remove(key) {
		delete memoryStorage[key];
	}
	function clearAll(key) {
		memoryStorage = {};
	}
})), require_all = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = [
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
		function f(n) {
			return n < 10 ? "0" + n : n;
		}
		function this_value() {
			return this.valueOf();
		}
		typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function() {
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
		}, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value);
		var gap, indent, meta, rep;
		function quote(string) {
			return rx_escapable.lastIndex = 0, rx_escapable.test(string) ? "\"" + string.replace(rx_escapable, function(a) {
				var c = meta[a];
				return typeof c == "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
			}) + "\"" : "\"" + string + "\"";
		}
		function str(key, holder) {
			var i, k, v, length, mind = gap, partial, value = holder[key];
			switch (value && typeof value == "object" && typeof value.toJSON == "function" && (value = value.toJSON(key)), typeof rep == "function" && (value = rep.call(holder, key, value)), typeof value) {
				case "string": return quote(value);
				case "number": return isFinite(value) ? String(value) : "null";
				case "boolean":
				case "null": return String(value);
				case "object":
					if (!value) return "null";
					if (gap += indent, partial = [], Object.prototype.toString.apply(value) === "[object Array]") {
						for (length = value.length, i = 0; i < length; i += 1) partial[i] = str(i, value) || "null";
						return v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]", gap = mind, v;
					}
					if (rep && typeof rep == "object") for (length = rep.length, i = 0; i < length; i += 1) typeof rep[i] == "string" && (k = rep[i], v = str(k, value), v && partial.push(quote(k) + (gap ? ": " : ":") + v));
					else for (k in value) Object.prototype.hasOwnProperty.call(value, k) && (v = str(k, value), v && partial.push(quote(k) + (gap ? ": " : ":") + v));
					return v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}", gap = mind, v;
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
		}, JSON.stringify = function(value, replacer, space) {
			var i;
			if (gap = "", indent = "", typeof space == "number") for (i = 0; i < space; i += 1) indent += " ";
			else typeof space == "string" && (indent = space);
			if (rep = replacer, replacer && typeof replacer != "function" && (typeof replacer != "object" || typeof replacer.length != "number")) throw Error("JSON.stringify");
			return str("", { "": value });
		}), typeof JSON.parse != "function" && (JSON.parse = function(text, reviver) {
			var j;
			function walk(holder, key) {
				var k, v, value = holder[key];
				if (value && typeof value == "object") for (k in value) Object.prototype.hasOwnProperty.call(value, k) && (v = walk(value, k), v === void 0 ? delete value[k] : value[k] = v);
				return reviver.call(holder, key, value);
			}
			if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function(a) {
				return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
			})), rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({ "": j }, "") : j;
			throw SyntaxError("JSON.parse");
		});
	})();
})), require_json2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = json2Plugin;
	function json2Plugin() {
		return require_json2$1(), {};
	}
})), require_store_legacy = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var engine = require_store_engine(), storages = require_all(), plugins = [require_json2()];
	module.exports = engine.createStore(storages, plugins);
})), import_store_legacy = /* @__PURE__ */ __toESM(require_store_legacy()), devtools = {
	isOpen: !1,
	orientation: void 0
}, threshold = 170, emitEvent = (isOpen, orientation) => {
	globalThis.dispatchEvent(new globalThis.CustomEvent("devtoolschange", { detail: {
		isOpen,
		orientation
	} }));
}, main = ({ emitEvents = !0 } = {}) => {
	let widthThreshold = globalThis.outerWidth - globalThis.innerWidth > threshold, heightThreshold = globalThis.outerHeight - globalThis.innerHeight > threshold, orientation = widthThreshold ? "vertical" : "horizontal";
	!(heightThreshold && widthThreshold) && (globalThis.Firebug && globalThis.Firebug.chrome && globalThis.Firebug.chrome.isInitialized || widthThreshold || heightThreshold) ? ((!devtools.isOpen || devtools.orientation !== orientation) && emitEvents && emitEvent(!0, orientation), devtools.isOpen = !0, devtools.orientation = orientation) : (devtools.isOpen && emitEvents && emitEvent(!1, void 0), devtools.isOpen = !1, devtools.orientation = void 0);
};
main({ emitEvents: !1 }), setInterval(main, 500);
var SysWeb = class extends SysBase {
	#e;
	constructor(...[hPlg = {}, arg = {
		cur: "prj/",
		crypto: !1,
		dip: ""
	}]) {
		super(hPlg, arg);
		let a = arg.cur.split("/");
		this.#e = a.length > 2 ? a.slice(0, -2).join("/") + "/" : "", this.loaded(hPlg, arg);
	}
	async loaded(...[hPlg, arg]) {
		await super.loaded(hPlg, arg), document.querySelectorAll("[data-prj]").forEach((v) => {
			let elm = v.attributes.getNamedItem("data-prj");
			elm && v.addEventListener("click", () => {
				this.runSN(elm.value);
			}, { passive: !0 });
		}), document.querySelectorAll("[data-reload]").forEach((v) => v.addEventListener("click", () => {
			this.run();
		}, { passive: !0 })), arg.dip && (CmnLib.hDip = JSON.parse(arg.dip));
		let sp = new URLSearchParams(location.search), dip = sp.get("dip");
		if (dip && (CmnLib.hDip = {
			...CmnLib.hDip,
			...JSON.parse(dip.replaceAll("%2C", ","))
		}), !argChk_Boolean(CmnLib.hDip, "oninit_run", !0)) return;
		argChk_Boolean(CmnLib.hDip, "dbg", !1) && (CmnLib.isDbg = !0, this.fetch = (url, init) => fetch(url, {
			...init,
			mode: "cors"
		})), this.extPort = argChk_Num(CmnLib.hDip, "port", this.extPort);
		let cur = sp.get("cur");
		cur && (arg.cur = this.#e + cur + "/"), await this.run();
	}
	#t = ":";
	async runSN(prj) {
		this.arg.cur = this.#e + prj + "/", this.#t !== this.arg.cur && (this.#t = this.arg.cur, await this.run());
	}
	async initVal(hTmp, comp) {
		let hn = encodeURIComponent(document.location.hostname);
		hTmp["const.sn.isDebugger"] = hn === "localhost" || hn === "127.0.0.1";
		let ns = this.cfg.headNs;
		this.flushSub = this.arg.crypto ? async () => {
			import_store_legacy.default.set(ns + "sys_", await this.enc(JSON.stringify(this.data.sys))), import_store_legacy.default.set(ns + "mark_", await this.enc(JSON.stringify(this.data.mark))), import_store_legacy.default.set(ns + "kidoku_", await this.enc(JSON.stringify(this.data.kidoku)));
		} : () => {
			import_store_legacy.default.set(ns + "sys", this.data.sys), import_store_legacy.default.set(ns + "mark", this.data.mark), import_store_legacy.default.set(ns + "kidoku", this.data.kidoku);
		};
		let nm = ns + (this.arg.crypto ? "sys_" : "sys");
		if (hTmp["const.sn.isFirstBoot"] = import_store_legacy.default.get(nm) === void 0) {
			this.data.sys = {}, this.data.mark = {}, this.data.kidoku = {}, comp(this.data);
			return;
		}
		if (!this.arg.crypto) {
			this.data.sys = import_store_legacy.default.get(ns + "sys"), this.data.mark = import_store_legacy.default.get(ns + "mark"), this.data.kidoku = import_store_legacy.default.get(ns + "kidoku"), comp(this.data);
			return;
		}
		let mes = "";
		try {
			mes = "sys", this.data.sys = JSON.parse(await this.dec("json", import_store_legacy.default.get(ns + "sys_"))), mes += String(this.val.getVal("sys:TextLayer.Back.Alpha", 1)), mes = "mark", this.data.mark = JSON.parse(await this.dec("json", import_store_legacy.default.get(ns + "mark_"))), mes = "kidoku", this.data.kidoku = JSON.parse(await this.dec("json", import_store_legacy.default.get(ns + "kidoku_")));
		} catch (e) {
			console.error(`セーブデータ（${mes}）が壊れています。一度クリアする必要があります(a) %o`, e);
		}
		comp(this.data);
	}
	init(hTag, appPixi, val) {
		let aP = super.init(hTag, appPixi, val), pCvs = appPixi.view.parentElement;
		if ("requestFullscreen" in document.body) this.tglFlscr_sub = this.isFullScr ? () => document.exitFullscreen() : () => pCvs.requestFullscreen(), this.elc.add(document, "fullscreenchange", () => {
			this.isFullScr = !!document.fullscreenElement;
		});
		else {
			let doc = document;
			this.tglFlscr_sub = this.isFullScr ? () => doc.webkitCancelFullScreen() : () => pCvs.webkitRequestFullscreen(), this.elc.add(document, "fullscreenchange", () => {
				this.isFullScr = !!doc.webkitFullscreenElement;
			});
		}
		return this.cfg.oCfg.debug.devtool || this.elc.add(globalThis, "devtoolschange", (e) => {
			e.detail.isOpen && (console.error("DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。"), this.main?.destroy());
		}, {
			once: !0,
			passive: !0
		}), aP;
	}
	cvsResize() {
		if (super.cvsResize(), !this.isFullScr || !this.main) return;
		let s = this.main.cvs.style;
		s.width = s.height = "";
	}
	pathBaseCnvSnPath4Dbg = "${pathbase}/";
	_export = () => ((async () => {
		let s = JSON.stringify({
			sys: this.data.sys,
			mark: this.data.mark,
			kidoku: this.data.kidoku
		}), s2 = this.arg.crypto ? await this.enc(s) : s, blob = new Blob([s2], { type: "text/json" }), a = document.createElement("a");
		a.href = URL.createObjectURL(blob), a.download = (this.arg.crypto ? "" : "no_crypto_") + this.cfg.headNs + getDateStr("-", "_", "") + ".swpd", a.click(), CmnLib.debugLog && console.log("プレイデータをエクスポートしました"), setTimeout(() => this.fire("sn:exported", new MouseEvent("click")), 10);
	})(), !1);
	_import = () => (new Promise((rs, rj) => {
		let inp = document.createElement("input");
		inp.type = "file", inp.accept = ".swpd, text/plain", inp.onchange = () => {
			let f = inp.files?.[0];
			f ? rs(f) : rj(/* @__PURE__ */ Error("ファイル選択に失敗しました"));
		}, inp.click();
	}).then(async (blob) => {
		let s = await blob.text(), o = JSON.parse(this.arg.crypto ? await this.dec("json", s) : s);
		if (o.sys["const.sn.cfg.ns"] !== this.cfg.oCfg.save_ns) {
			console.error(`別のゲーム【プロジェクト名=${o.sys["const.sn.cfg.ns"]}】のプレイデータです`);
			return;
		}
		this.data.sys = o.sys, this.data.mark = o.mark, this.data.kidoku = o.kidoku, this.flush(), this.val.updateData(o), CmnLib.debugLog && console.log("プレイデータをインポートしました"), this.fire("sn:imported", new MouseEvent("click"));
	}).catch((e) => console.error(`異常なプレイデータです ${String(e)}`)), !1);
	navigate_to = (hArg) => {
		let { url } = hArg;
		if (!url) throw "[navigate_to] urlは必須です";
		return globalThis.open(url, "_blank"), !1;
	};
	titleSub(txt) {
		document.title = txt, document.querySelectorAll("[data-title]").forEach((v) => {
			v.textContent = txt;
		});
	}
	async savePic(path, data_url) {
		let a = document.createElement("a");
		a.href = data_url, a.download = path, a.click(), CmnLib.debugLog && console.log("画像ファイルをダウンロードします");
	}
	#n = {};
	async appendFile(path, data) {
		let txt = (this.#n[path] ?? "") + data;
		this.#n[path] = txt, await this.outputFile(path, txt);
	}
	async outputFile(path, data) {
		let blob = new Blob([data], { type: "text/json" }), a = document.createElement("a");
		a.href = URL.createObjectURL(blob), a.download = path, a.click();
	}
};
export { CmnLib, Layer, SysWeb, argChk_Boolean, argChk_Num };

//# sourceMappingURL=web.js.map