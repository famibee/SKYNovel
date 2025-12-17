import { n as __export } from "./chunk.js";
import { i as EVNM_KEY, s as argChk_Boolean, t as CmnLib } from "./CmnLib.js";
import { n as creSYS_DATA } from "./CmnInterface.js";
import { t as EventListenerCtn } from "./EventListenerCtn.js";
import { n as SEARCH_PATH_ARG_EXT } from "./ConfigBase.js";
var PACKET_TYPES = Object.create(null);
PACKET_TYPES.open = "0", PACKET_TYPES.close = "1", PACKET_TYPES.ping = "2", PACKET_TYPES.pong = "3", PACKET_TYPES.message = "4", PACKET_TYPES.upgrade = "5", PACKET_TYPES.noop = "6";
var PACKET_TYPES_REVERSE = Object.create(null);
Object.keys(PACKET_TYPES).forEach((h) => {
	PACKET_TYPES_REVERSE[PACKET_TYPES[h]] = h;
});
var ERROR_PACKET = {
	type: "error",
	data: "parser error"
}, withNativeBlob$1 = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]", withNativeArrayBuffer$2 = typeof ArrayBuffer == "function", isView$1 = (h) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(h) : h && h.buffer instanceof ArrayBuffer, encodePacket = ({ type: h, data: W }, G, K) => withNativeBlob$1 && W instanceof Blob ? G ? K(W) : encodeBlobAsBase64(W, K) : withNativeArrayBuffer$2 && (W instanceof ArrayBuffer || isView$1(W)) ? G ? K(W) : encodeBlobAsBase64(new Blob([W]), K) : K(PACKET_TYPES[h] + (W || "")), encodeBlobAsBase64 = (h, W) => {
	let G = new FileReader();
	return G.onload = function() {
		let h = G.result.split(",")[1];
		W("b" + (h || ""));
	}, G.readAsDataURL(h);
};
function toArray(h) {
	return h instanceof Uint8Array ? h : h instanceof ArrayBuffer ? new Uint8Array(h) : new Uint8Array(h.buffer, h.byteOffset, h.byteLength);
}
var TEXT_ENCODER;
function encodePacketToBinary(h, W) {
	if (withNativeBlob$1 && h.data instanceof Blob) return h.data.arrayBuffer().then(toArray).then(W);
	if (withNativeArrayBuffer$2 && (h.data instanceof ArrayBuffer || isView$1(h.data))) return W(toArray(h.data));
	encodePacket(h, !1, (h) => {
		TEXT_ENCODER ||= new TextEncoder(), W(TEXT_ENCODER.encode(h));
	});
}
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", lookup$1 = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let h = 0; h < 64; h++) lookup$1[chars.charCodeAt(h)] = h;
const decode$1 = (h) => {
	let W = h.length * .75, G = h.length, K, q = 0, J, Y, X, Z;
	h[h.length - 1] === "=" && (W--, h[h.length - 2] === "=" && W--);
	let Q = new ArrayBuffer(W), $ = new Uint8Array(Q);
	for (K = 0; K < G; K += 4) J = lookup$1[h.charCodeAt(K)], Y = lookup$1[h.charCodeAt(K + 1)], X = lookup$1[h.charCodeAt(K + 2)], Z = lookup$1[h.charCodeAt(K + 3)], $[q++] = J << 2 | Y >> 4, $[q++] = (Y & 15) << 4 | X >> 2, $[q++] = (X & 3) << 6 | Z & 63;
	return Q;
};
var withNativeArrayBuffer$1 = typeof ArrayBuffer == "function";
const decodePacket = (h, W) => {
	if (typeof h != "string") return {
		type: "message",
		data: mapBinary(h, W)
	};
	let G = h.charAt(0);
	return G === "b" ? {
		type: "message",
		data: decodeBase64Packet(h.substring(1), W)
	} : PACKET_TYPES_REVERSE[G] ? h.length > 1 ? {
		type: PACKET_TYPES_REVERSE[G],
		data: h.substring(1)
	} : { type: PACKET_TYPES_REVERSE[G] } : ERROR_PACKET;
};
var decodeBase64Packet = (h, W) => withNativeArrayBuffer$1 ? mapBinary(decode$1(h), W) : {
	base64: !0,
	data: h
}, mapBinary = (h, W) => {
	switch (W) {
		case "blob": return h instanceof Blob ? h : new Blob([h]);
		case "arraybuffer":
		default: return h instanceof ArrayBuffer ? h : h.buffer;
	}
}, SEPARATOR = "", encodePayload = (h, W) => {
	let G = h.length, K = Array(G), q = 0;
	h.forEach((h, J) => {
		encodePacket(h, !1, (h) => {
			K[J] = h, ++q === G && W(K.join(SEPARATOR));
		});
	});
}, decodePayload = (h, W) => {
	let G = h.split(SEPARATOR), K = [];
	for (let h = 0; h < G.length; h++) {
		let q = decodePacket(G[h], W);
		if (K.push(q), q.type === "error") break;
	}
	return K;
};
function createPacketEncoderStream() {
	return new TransformStream({ transform(h, W) {
		encodePacketToBinary(h, (G) => {
			let K = G.length, q;
			if (K < 126) q = new Uint8Array(1), new DataView(q.buffer).setUint8(0, K);
			else if (K < 65536) {
				q = new Uint8Array(3);
				let h = new DataView(q.buffer);
				h.setUint8(0, 126), h.setUint16(1, K);
			} else {
				q = new Uint8Array(9);
				let h = new DataView(q.buffer);
				h.setUint8(0, 127), h.setBigUint64(1, BigInt(K));
			}
			h.data && typeof h.data != "string" && (q[0] |= 128), W.enqueue(q), W.enqueue(G);
		});
	} });
}
var TEXT_DECODER;
function totalLength(h) {
	return h.reduce((h, W) => h + W.length, 0);
}
function concatChunks(h, W) {
	if (h[0].length === W) return h.shift();
	let G = new Uint8Array(W), K = 0;
	for (let q = 0; q < W; q++) G[q] = h[0][K++], K === h[0].length && (h.shift(), K = 0);
	return h.length && K < h[0].length && (h[0] = h[0].slice(K)), G;
}
function createPacketDecoderStream(h, W) {
	TEXT_DECODER ||= new TextDecoder();
	let G = [], K = 0, q = -1, J = !1;
	return new TransformStream({ transform(Y, X) {
		for (G.push(Y);;) {
			if (K === 0) {
				if (totalLength(G) < 1) break;
				let h = concatChunks(G, 1);
				J = (h[0] & 128) == 128, q = h[0] & 127, K = q < 126 ? 3 : q === 126 ? 1 : 2;
			} else if (K === 1) {
				if (totalLength(G) < 2) break;
				let h = concatChunks(G, 2);
				q = new DataView(h.buffer, h.byteOffset, h.length).getUint16(0), K = 3;
			} else if (K === 2) {
				if (totalLength(G) < 8) break;
				let h = concatChunks(G, 8), W = new DataView(h.buffer, h.byteOffset, h.length), J = W.getUint32(0);
				if (J > 2 ** 21 - 1) {
					X.enqueue(ERROR_PACKET);
					break;
				}
				q = J * 2 ** 32 + W.getUint32(4), K = 3;
			} else {
				if (totalLength(G) < q) break;
				let h = concatChunks(G, q);
				X.enqueue(decodePacket(J ? h : TEXT_DECODER.decode(h), W)), K = 0;
			}
			if (q === 0 || q > h) {
				X.enqueue(ERROR_PACKET);
				break;
			}
		}
	} });
}
function Emitter(h) {
	if (h) return mixin(h);
}
function mixin(h) {
	for (var W in Emitter.prototype) h[W] = Emitter.prototype[W];
	return h;
}
Emitter.prototype.on = Emitter.prototype.addEventListener = function(h, W) {
	return this._callbacks = this._callbacks || {}, (this._callbacks["$" + h] = this._callbacks["$" + h] || []).push(W), this;
}, Emitter.prototype.once = function(h, W) {
	function G() {
		this.off(h, G), W.apply(this, arguments);
	}
	return G.fn = W, this.on(h, G), this;
}, Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(h, W) {
	if (this._callbacks = this._callbacks || {}, arguments.length == 0) return this._callbacks = {}, this;
	var G = this._callbacks["$" + h];
	if (!G) return this;
	if (arguments.length == 1) return delete this._callbacks["$" + h], this;
	for (var K, q = 0; q < G.length; q++) if (K = G[q], K === W || K.fn === W) {
		G.splice(q, 1);
		break;
	}
	return G.length === 0 && delete this._callbacks["$" + h], this;
}, Emitter.prototype.emit = function(h) {
	this._callbacks = this._callbacks || {};
	for (var W = Array(arguments.length - 1), G = this._callbacks["$" + h], K = 1; K < arguments.length; K++) W[K - 1] = arguments[K];
	if (G) {
		G = G.slice(0);
		for (var K = 0, q = G.length; K < q; ++K) G[K].apply(this, W);
	}
	return this;
}, Emitter.prototype.emitReserved = Emitter.prototype.emit, Emitter.prototype.listeners = function(h) {
	return this._callbacks = this._callbacks || {}, this._callbacks["$" + h] || [];
}, Emitter.prototype.hasListeners = function(h) {
	return !!this.listeners(h).length;
};
const nextTick = (() => typeof Promise == "function" && typeof Promise.resolve == "function" ? (h) => Promise.resolve().then(h) : (h, W) => W(h, 0))(), globalThisShim = (() => typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")())();
function pick(h, ...W) {
	return W.reduce((W, G) => (h.hasOwnProperty(G) && (W[G] = h[G]), W), {});
}
var NATIVE_SET_TIMEOUT = globalThisShim.setTimeout, NATIVE_CLEAR_TIMEOUT = globalThisShim.clearTimeout;
function installTimerFunctions(h, W) {
	W.useNativeTimers ? (h.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim), h.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim)) : (h.setTimeoutFn = globalThisShim.setTimeout.bind(globalThisShim), h.clearTimeoutFn = globalThisShim.clearTimeout.bind(globalThisShim));
}
var BASE64_OVERHEAD = 1.33;
function byteLength(h) {
	return typeof h == "string" ? utf8Length(h) : Math.ceil((h.byteLength || h.size) * BASE64_OVERHEAD);
}
function utf8Length(h) {
	let W = 0, G = 0;
	for (let K = 0, q = h.length; K < q; K++) W = h.charCodeAt(K), W < 128 ? G += 1 : W < 2048 ? G += 2 : W < 55296 || W >= 57344 ? G += 3 : (K++, G += 4);
	return G;
}
function randomString() {
	return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function encode(h) {
	let W = "";
	for (let G in h) h.hasOwnProperty(G) && (W.length && (W += "&"), W += encodeURIComponent(G) + "=" + encodeURIComponent(h[G]));
	return W;
}
function decode(h) {
	let W = {}, G = h.split("&");
	for (let h = 0, K = G.length; h < K; h++) {
		let K = G[h].split("=");
		W[decodeURIComponent(K[0])] = decodeURIComponent(K[1]);
	}
	return W;
}
var TransportError = class extends Error {
	constructor(h, W, G) {
		super(h), this.description = W, this.context = G, this.type = "TransportError";
	}
}, Transport = class extends Emitter {
	constructor(h) {
		super(), this.writable = !1, installTimerFunctions(this, h), this.opts = h, this.query = h.query, this.socket = h.socket, this.supportsBinary = !h.forceBase64;
	}
	onError(h, W, G) {
		return super.emitReserved("error", new TransportError(h, W, G)), this;
	}
	open() {
		return this.readyState = "opening", this.doOpen(), this;
	}
	close() {
		return (this.readyState === "opening" || this.readyState === "open") && (this.doClose(), this.onClose()), this;
	}
	send(h) {
		this.readyState === "open" && this.write(h);
	}
	onOpen() {
		this.readyState = "open", this.writable = !0, super.emitReserved("open");
	}
	onData(h) {
		let W = decodePacket(h, this.socket.binaryType);
		this.onPacket(W);
	}
	onPacket(h) {
		super.emitReserved("packet", h);
	}
	onClose(h) {
		this.readyState = "closed", super.emitReserved("close", h);
	}
	pause(h) {}
	createUri(h, W = {}) {
		return h + "://" + this._hostname() + this._port() + this.opts.path + this._query(W);
	}
	_hostname() {
		let h = this.opts.hostname;
		return h.indexOf(":") === -1 ? h : "[" + h + "]";
	}
	_port() {
		return this.opts.port && (this.opts.secure && Number(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80) ? ":" + this.opts.port : "";
	}
	_query(h) {
		let W = encode(h);
		return W.length ? "?" + W : "";
	}
}, Polling = class extends Transport {
	constructor() {
		super(...arguments), this._polling = !1;
	}
	get name() {
		return "polling";
	}
	doOpen() {
		this._poll();
	}
	pause(h) {
		this.readyState = "pausing";
		let W = () => {
			this.readyState = "paused", h();
		};
		if (this._polling || !this.writable) {
			let h = 0;
			this._polling && (h++, this.once("pollComplete", function() {
				--h || W();
			})), this.writable || (h++, this.once("drain", function() {
				--h || W();
			}));
		} else W();
	}
	_poll() {
		this._polling = !0, this.doPoll(), this.emitReserved("poll");
	}
	onData(h) {
		decodePayload(h, this.socket.binaryType).forEach((h) => {
			if (this.readyState === "opening" && h.type === "open" && this.onOpen(), h.type === "close") return this.onClose({ description: "transport closed by the server" }), !1;
			this.onPacket(h);
		}), this.readyState !== "closed" && (this._polling = !1, this.emitReserved("pollComplete"), this.readyState === "open" && this._poll());
	}
	doClose() {
		let h = () => {
			this.write([{ type: "close" }]);
		};
		this.readyState === "open" ? h() : this.once("open", h);
	}
	write(h) {
		this.writable = !1, encodePayload(h, (h) => {
			this.doWrite(h, () => {
				this.writable = !0, this.emitReserved("drain");
			});
		});
	}
	uri() {
		let h = this.opts.secure ? "https" : "http", W = this.query || {};
		return !1 !== this.opts.timestampRequests && (W[this.opts.timestampParam] = randomString()), !this.supportsBinary && !W.sid && (W.b64 = 1), this.createUri(h, W);
	}
}, value = !1;
try {
	value = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {}
const hasCORS = value;
function empty() {}
var BaseXHR = class extends Polling {
	constructor(h) {
		if (super(h), typeof location < "u") {
			let W = location.protocol === "https:", G = location.port;
			G ||= W ? "443" : "80", this.xd = typeof location < "u" && h.hostname !== location.hostname || G !== h.port;
		}
	}
	doWrite(h, W) {
		let G = this.request({
			method: "POST",
			data: h
		});
		G.on("success", W), G.on("error", (h, W) => {
			this.onError("xhr post error", h, W);
		});
	}
	doPoll() {
		let h = this.request();
		h.on("data", this.onData.bind(this)), h.on("error", (h, W) => {
			this.onError("xhr poll error", h, W);
		}), this.pollXhr = h;
	}
}, Request = class h extends Emitter {
	constructor(h, W, G) {
		super(), this.createRequest = h, installTimerFunctions(this, G), this._opts = G, this._method = G.method || "GET", this._uri = W, this._data = G.data === void 0 ? null : G.data, this._create();
	}
	_create() {
		var W;
		let G = pick(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
		G.xdomain = !!this._opts.xd;
		let K = this._xhr = this.createRequest(G);
		try {
			K.open(this._method, this._uri, !0);
			try {
				if (this._opts.extraHeaders) for (let h in K.setDisableHeaderCheck && K.setDisableHeaderCheck(!0), this._opts.extraHeaders) this._opts.extraHeaders.hasOwnProperty(h) && K.setRequestHeader(h, this._opts.extraHeaders[h]);
			} catch {}
			if (this._method === "POST") try {
				K.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
			} catch {}
			try {
				K.setRequestHeader("Accept", "*/*");
			} catch {}
			(W = this._opts.cookieJar) == null || W.addCookies(K), "withCredentials" in K && (K.withCredentials = this._opts.withCredentials), this._opts.requestTimeout && (K.timeout = this._opts.requestTimeout), K.onreadystatechange = () => {
				var h;
				K.readyState === 3 && ((h = this._opts.cookieJar) == null || h.parseCookies(K.getResponseHeader("set-cookie"))), K.readyState === 4 && (K.status === 200 || K.status === 1223 ? this._onLoad() : this.setTimeoutFn(() => {
					this._onError(typeof K.status == "number" ? K.status : 0);
				}, 0));
			}, K.send(this._data);
		} catch (h) {
			this.setTimeoutFn(() => {
				this._onError(h);
			}, 0);
			return;
		}
		typeof document < "u" && (this._index = h.requestsCount++, h.requests[this._index] = this);
	}
	_onError(h) {
		this.emitReserved("error", h, this._xhr), this._cleanup(!0);
	}
	_cleanup(W) {
		if (!(this._xhr === void 0 || this._xhr === null)) {
			if (this._xhr.onreadystatechange = empty, W) try {
				this._xhr.abort();
			} catch {}
			typeof document < "u" && delete h.requests[this._index], this._xhr = null;
		}
	}
	_onLoad() {
		let h = this._xhr.responseText;
		h !== null && (this.emitReserved("data", h), this.emitReserved("success"), this._cleanup());
	}
	abort() {
		this._cleanup();
	}
};
if (Request.requestsCount = 0, Request.requests = {}, typeof document < "u") {
	if (typeof attachEvent == "function") attachEvent("onunload", unloadHandler);
	else if (typeof addEventListener == "function") {
		let h = "onpagehide" in globalThisShim ? "pagehide" : "unload";
		addEventListener(h, unloadHandler, !1);
	}
}
function unloadHandler() {
	for (let h in Request.requests) Request.requests.hasOwnProperty(h) && Request.requests[h].abort();
}
var hasXHR2 = (function() {
	let h = newRequest({ xdomain: !1 });
	return h && h.responseType !== null;
})(), XHR = class extends BaseXHR {
	constructor(h) {
		super(h);
		let W = h && h.forceBase64;
		this.supportsBinary = hasXHR2 && !W;
	}
	request(h = {}) {
		return Object.assign(h, { xd: this.xd }, this.opts), new Request(newRequest, this.uri(), h);
	}
};
function newRequest(h) {
	let W = h.xdomain;
	try {
		if (typeof XMLHttpRequest < "u" && (!W || hasCORS)) return new XMLHttpRequest();
	} catch {}
	if (!W) try {
		return new globalThisShim[["Active", "Object"].join("X")]("Microsoft.XMLHTTP");
	} catch {}
}
var isReactNative = typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative", BaseWS = class extends Transport {
	get name() {
		return "websocket";
	}
	doOpen() {
		let h = this.uri(), W = this.opts.protocols, G = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
		this.opts.extraHeaders && (G.headers = this.opts.extraHeaders);
		try {
			this.ws = this.createSocket(h, W, G);
		} catch (h) {
			return this.emitReserved("error", h);
		}
		this.ws.binaryType = this.socket.binaryType, this.addEventListeners();
	}
	addEventListeners() {
		this.ws.onopen = () => {
			this.opts.autoUnref && this.ws._socket.unref(), this.onOpen();
		}, this.ws.onclose = (h) => this.onClose({
			description: "websocket connection closed",
			context: h
		}), this.ws.onmessage = (h) => this.onData(h.data), this.ws.onerror = (h) => this.onError("websocket error", h);
	}
	write(h) {
		this.writable = !1;
		for (let W = 0; W < h.length; W++) {
			let G = h[W], K = W === h.length - 1;
			encodePacket(G, this.supportsBinary, (h) => {
				try {
					this.doWrite(G, h);
				} catch {}
				K && nextTick(() => {
					this.writable = !0, this.emitReserved("drain");
				}, this.setTimeoutFn);
			});
		}
	}
	doClose() {
		this.ws !== void 0 && (this.ws.onerror = () => {}, this.ws.close(), this.ws = null);
	}
	uri() {
		let h = this.opts.secure ? "wss" : "ws", W = this.query || {};
		return this.opts.timestampRequests && (W[this.opts.timestampParam] = randomString()), this.supportsBinary || (W.b64 = 1), this.createUri(h, W);
	}
}, WebSocketCtor = globalThisShim.WebSocket || globalThisShim.MozWebSocket;
const transports = {
	websocket: class extends BaseWS {
		createSocket(h, W, G) {
			return isReactNative ? new WebSocketCtor(h, W, G) : W ? new WebSocketCtor(h, W) : new WebSocketCtor(h);
		}
		doWrite(h, W) {
			this.ws.send(W);
		}
	},
	webtransport: class extends Transport {
		get name() {
			return "webtransport";
		}
		doOpen() {
			try {
				this._transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
			} catch (h) {
				return this.emitReserved("error", h);
			}
			this._transport.closed.then(() => {
				this.onClose();
			}).catch((h) => {
				this.onError("webtransport error", h);
			}), this._transport.ready.then(() => {
				this._transport.createBidirectionalStream().then((h) => {
					let W = createPacketDecoderStream(2 ** 53 - 1, this.socket.binaryType), G = h.readable.pipeThrough(W).getReader(), K = createPacketEncoderStream();
					K.readable.pipeTo(h.writable), this._writer = K.writable.getWriter();
					let q = () => {
						G.read().then(({ done: h, value: W }) => {
							h || (this.onPacket(W), q());
						}).catch((h) => {});
					};
					q();
					let J = { type: "open" };
					this.query.sid && (J.data = `{"sid":"${this.query.sid}"}`), this._writer.write(J).then(() => this.onOpen());
				});
			});
		}
		write(h) {
			this.writable = !1;
			for (let W = 0; W < h.length; W++) {
				let G = h[W], K = W === h.length - 1;
				this._writer.write(G).then(() => {
					K && nextTick(() => {
						this.writable = !0, this.emitReserved("drain");
					}, this.setTimeoutFn);
				});
			}
		}
		doClose() {
			var h;
			(h = this._transport) == null || h.close();
		}
	},
	polling: XHR
};
var re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, parts = [
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
];
function parse(h) {
	if (h.length > 8e3) throw "URI too long";
	let W = h, G = h.indexOf("["), K = h.indexOf("]");
	G != -1 && K != -1 && (h = h.substring(0, G) + h.substring(G, K).replace(/:/g, ";") + h.substring(K, h.length));
	let q = re.exec(h || ""), J = {}, Y = 14;
	for (; Y--;) J[parts[Y]] = q[Y] || "";
	return G != -1 && K != -1 && (J.source = W, J.host = J.host.substring(1, J.host.length - 1).replace(/;/g, ":"), J.authority = J.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), J.ipv6uri = !0), J.pathNames = pathNames(J, J.path), J.queryKey = queryKey(J, J.query), J;
}
function pathNames(h, W) {
	let G = W.replace(/\/{2,9}/g, "/").split("/");
	return (W.slice(0, 1) == "/" || W.length === 0) && G.splice(0, 1), W.slice(-1) == "/" && G.splice(G.length - 1, 1), G;
}
function queryKey(h, W) {
	let G = {};
	return W.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(h, W, K) {
		W && (G[W] = K);
	}), G;
}
var withEventListeners = typeof addEventListener == "function" && typeof removeEventListener == "function", OFFLINE_EVENT_LISTENERS = [];
withEventListeners && addEventListener("offline", () => {
	OFFLINE_EVENT_LISTENERS.forEach((h) => h());
}, !1);
var SocketWithoutUpgrade = class h extends Emitter {
	constructor(h, W) {
		if (super(), this.binaryType = "arraybuffer", this.writeBuffer = [], this._prevBufferLen = 0, this._pingInterval = -1, this._pingTimeout = -1, this._maxPayload = -1, this._pingTimeoutTime = Infinity, h && typeof h == "object" && (W = h, h = null), h) {
			let G = parse(h);
			W.hostname = G.host, W.secure = G.protocol === "https" || G.protocol === "wss", W.port = G.port, G.query && (W.query = G.query);
		} else W.host && (W.hostname = parse(W.host).host);
		installTimerFunctions(this, W), this.secure = W.secure == null ? typeof location < "u" && location.protocol === "https:" : W.secure, W.hostname && !W.port && (W.port = this.secure ? "443" : "80"), this.hostname = W.hostname || (typeof location < "u" ? location.hostname : "localhost"), this.port = W.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"), this.transports = [], this._transportsByName = {}, W.transports.forEach((h) => {
			let W = h.prototype.name;
			this.transports.push(W), this._transportsByName[W] = h;
		}), this.opts = Object.assign({
			path: "/engine.io",
			agent: !1,
			withCredentials: !1,
			upgrade: !0,
			timestampParam: "t",
			rememberUpgrade: !1,
			addTrailingSlash: !0,
			rejectUnauthorized: !0,
			perMessageDeflate: { threshold: 1024 },
			transportOptions: {},
			closeOnBeforeunload: !1
		}, W), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = decode(this.opts.query)), withEventListeners && (this.opts.closeOnBeforeunload && (this._beforeunloadEventListener = () => {
			this.transport && (this.transport.removeAllListeners(), this.transport.close());
		}, addEventListener("beforeunload", this._beforeunloadEventListener, !1)), this.hostname !== "localhost" && (this._offlineEventListener = () => {
			this._onClose("transport close", { description: "network connection lost" });
		}, OFFLINE_EVENT_LISTENERS.push(this._offlineEventListener))), this.opts.withCredentials && (this._cookieJar = void 0), this._open();
	}
	createTransport(h) {
		let W = Object.assign({}, this.opts.query);
		W.EIO = 4, W.transport = h, this.id && (W.sid = this.id);
		let G = Object.assign({}, this.opts, {
			query: W,
			socket: this,
			hostname: this.hostname,
			secure: this.secure,
			port: this.port
		}, this.opts.transportOptions[h]);
		return new this._transportsByName[h](G);
	}
	_open() {
		if (this.transports.length === 0) {
			this.setTimeoutFn(() => {
				this.emitReserved("error", "No transports available");
			}, 0);
			return;
		}
		let W = this.opts.rememberUpgrade && h.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
		this.readyState = "opening";
		let G = this.createTransport(W);
		G.open(), this.setTransport(G);
	}
	setTransport(h) {
		this.transport && this.transport.removeAllListeners(), this.transport = h, h.on("drain", this._onDrain.bind(this)).on("packet", this._onPacket.bind(this)).on("error", this._onError.bind(this)).on("close", (h) => this._onClose("transport close", h));
	}
	onOpen() {
		this.readyState = "open", h.priorWebsocketSuccess = this.transport.name === "websocket", this.emitReserved("open"), this.flush();
	}
	_onPacket(h) {
		if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") switch (this.emitReserved("packet", h), this.emitReserved("heartbeat"), h.type) {
			case "open":
				this.onHandshake(JSON.parse(h.data));
				break;
			case "ping":
				this._sendPacket("pong"), this.emitReserved("ping"), this.emitReserved("pong"), this._resetPingTimeout();
				break;
			case "error":
				let W = /* @__PURE__ */ Error("server error");
				W.code = h.data, this._onError(W);
				break;
			case "message":
				this.emitReserved("data", h.data), this.emitReserved("message", h.data);
				break;
		}
	}
	onHandshake(h) {
		this.emitReserved("handshake", h), this.id = h.sid, this.transport.query.sid = h.sid, this._pingInterval = h.pingInterval, this._pingTimeout = h.pingTimeout, this._maxPayload = h.maxPayload, this.onOpen(), this.readyState !== "closed" && this._resetPingTimeout();
	}
	_resetPingTimeout() {
		this.clearTimeoutFn(this._pingTimeoutTimer);
		let h = this._pingInterval + this._pingTimeout;
		this._pingTimeoutTime = Date.now() + h, this._pingTimeoutTimer = this.setTimeoutFn(() => {
			this._onClose("ping timeout");
		}, h), this.opts.autoUnref && this._pingTimeoutTimer.unref();
	}
	_onDrain() {
		this.writeBuffer.splice(0, this._prevBufferLen), this._prevBufferLen = 0, this.writeBuffer.length === 0 ? this.emitReserved("drain") : this.flush();
	}
	flush() {
		if (this.readyState !== "closed" && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
			let h = this._getWritablePackets();
			this.transport.send(h), this._prevBufferLen = h.length, this.emitReserved("flush");
		}
	}
	_getWritablePackets() {
		if (!(this._maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1)) return this.writeBuffer;
		let h = 1;
		for (let W = 0; W < this.writeBuffer.length; W++) {
			let G = this.writeBuffer[W].data;
			if (G && (h += byteLength(G)), W > 0 && h > this._maxPayload) return this.writeBuffer.slice(0, W);
			h += 2;
		}
		return this.writeBuffer;
	}
	_hasPingExpired() {
		if (!this._pingTimeoutTime) return !0;
		let h = Date.now() > this._pingTimeoutTime;
		return h && (this._pingTimeoutTime = 0, nextTick(() => {
			this._onClose("ping timeout");
		}, this.setTimeoutFn)), h;
	}
	write(h, W, G) {
		return this._sendPacket("message", h, W, G), this;
	}
	send(h, W, G) {
		return this._sendPacket("message", h, W, G), this;
	}
	_sendPacket(h, W, G, K) {
		if (typeof W == "function" && (K = W, W = void 0), typeof G == "function" && (K = G, G = null), this.readyState === "closing" || this.readyState === "closed") return;
		G ||= {}, G.compress = !1 !== G.compress;
		let q = {
			type: h,
			data: W,
			options: G
		};
		this.emitReserved("packetCreate", q), this.writeBuffer.push(q), K && this.once("flush", K), this.flush();
	}
	close() {
		let h = () => {
			this._onClose("forced close"), this.transport.close();
		}, W = () => {
			this.off("upgrade", W), this.off("upgradeError", W), h();
		}, G = () => {
			this.once("upgrade", W), this.once("upgradeError", W);
		};
		return (this.readyState === "opening" || this.readyState === "open") && (this.readyState = "closing", this.writeBuffer.length ? this.once("drain", () => {
			this.upgrading ? G() : h();
		}) : this.upgrading ? G() : h()), this;
	}
	_onError(W) {
		if (h.priorWebsocketSuccess = !1, this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening") return this.transports.shift(), this._open();
		this.emitReserved("error", W), this._onClose("transport error", W);
	}
	_onClose(h, W) {
		if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") {
			if (this.clearTimeoutFn(this._pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), withEventListeners && (this._beforeunloadEventListener && removeEventListener("beforeunload", this._beforeunloadEventListener, !1), this._offlineEventListener)) {
				let h = OFFLINE_EVENT_LISTENERS.indexOf(this._offlineEventListener);
				h !== -1 && OFFLINE_EVENT_LISTENERS.splice(h, 1);
			}
			this.readyState = "closed", this.id = null, this.emitReserved("close", h, W), this.writeBuffer = [], this._prevBufferLen = 0;
		}
	}
};
SocketWithoutUpgrade.protocol = 4;
var SocketWithUpgrade = class extends SocketWithoutUpgrade {
	constructor() {
		super(...arguments), this._upgrades = [];
	}
	onOpen() {
		if (super.onOpen(), this.readyState === "open" && this.opts.upgrade) for (let h = 0; h < this._upgrades.length; h++) this._probe(this._upgrades[h]);
	}
	_probe(h) {
		let W = this.createTransport(h), G = !1;
		SocketWithoutUpgrade.priorWebsocketSuccess = !1;
		let K = () => {
			G || (W.send([{
				type: "ping",
				data: "probe"
			}]), W.once("packet", (h) => {
				if (!G) if (h.type === "pong" && h.data === "probe") {
					if (this.upgrading = !0, this.emitReserved("upgrading", W), !W) return;
					SocketWithoutUpgrade.priorWebsocketSuccess = W.name === "websocket", this.transport.pause(() => {
						G || this.readyState !== "closed" && (Q(), this.setTransport(W), W.send([{ type: "upgrade" }]), this.emitReserved("upgrade", W), W = null, this.upgrading = !1, this.flush());
					});
				} else {
					let h = /* @__PURE__ */ Error("probe error");
					h.transport = W.name, this.emitReserved("upgradeError", h);
				}
			}));
		};
		function q() {
			G || (G = !0, Q(), W.close(), W = null);
		}
		let J = (h) => {
			let G = /* @__PURE__ */ Error("probe error: " + h);
			G.transport = W.name, q(), this.emitReserved("upgradeError", G);
		};
		function Y() {
			J("transport closed");
		}
		function X() {
			J("socket closed");
		}
		function Z(h) {
			W && h.name !== W.name && q();
		}
		let Q = () => {
			W.removeListener("open", K), W.removeListener("error", J), W.removeListener("close", Y), this.off("close", X), this.off("upgrading", Z);
		};
		W.once("open", K), W.once("error", J), W.once("close", Y), this.once("close", X), this.once("upgrading", Z), this._upgrades.indexOf("webtransport") !== -1 && h !== "webtransport" ? this.setTimeoutFn(() => {
			G || W.open();
		}, 200) : W.open();
	}
	onHandshake(h) {
		this._upgrades = this._filterUpgrades(h.upgrades), super.onHandshake(h);
	}
	_filterUpgrades(h) {
		let W = [];
		for (let G = 0; G < h.length; G++) ~this.transports.indexOf(h[G]) && W.push(h[G]);
		return W;
	}
}, Socket$1 = class extends SocketWithUpgrade {
	constructor(h, W = {}) {
		let G = typeof h == "object" ? h : W;
		(!G.transports || G.transports && typeof G.transports[0] == "string") && (G.transports = (G.transports || [
			"polling",
			"websocket",
			"webtransport"
		]).map((h) => transports[h]).filter((h) => !!h)), super(h, G);
	}
};
Socket$1.protocol;
function url(h, W = "", G) {
	let K = h;
	G ||= typeof location < "u" && location, h ??= G.protocol + "//" + G.host, typeof h == "string" && (h.charAt(0) === "/" && (h = h.charAt(1) === "/" ? G.protocol + h : G.host + h), /^(https?|wss?):\/\//.test(h) || (h = G === void 0 ? "https://" + h : G.protocol + "//" + h), K = parse(h)), K.port || (/^(http|ws)$/.test(K.protocol) ? K.port = "80" : /^(http|ws)s$/.test(K.protocol) && (K.port = "443")), K.path = K.path || "/";
	let q = K.host.indexOf(":") === -1 ? K.host : "[" + K.host + "]";
	return K.id = K.protocol + "://" + q + ":" + K.port + W, K.href = K.protocol + "://" + q + (G && G.port === K.port ? "" : ":" + K.port), K;
}
var withNativeArrayBuffer = typeof ArrayBuffer == "function", isView = (h) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(h) : h.buffer instanceof ArrayBuffer, toString = Object.prototype.toString, withNativeBlob = typeof Blob == "function" || typeof Blob < "u" && toString.call(Blob) === "[object BlobConstructor]", withNativeFile = typeof File == "function" || typeof File < "u" && toString.call(File) === "[object FileConstructor]";
function isBinary(h) {
	return withNativeArrayBuffer && (h instanceof ArrayBuffer || isView(h)) || withNativeBlob && h instanceof Blob || withNativeFile && h instanceof File;
}
function hasBinary(h, W) {
	if (!h || typeof h != "object") return !1;
	if (Array.isArray(h)) {
		for (let W = 0, G = h.length; W < G; W++) if (hasBinary(h[W])) return !0;
		return !1;
	}
	if (isBinary(h)) return !0;
	if (h.toJSON && typeof h.toJSON == "function" && arguments.length === 1) return hasBinary(h.toJSON(), !0);
	for (let W in h) if (Object.prototype.hasOwnProperty.call(h, W) && hasBinary(h[W])) return !0;
	return !1;
}
function deconstructPacket(h) {
	let W = [], G = h.data, K = h;
	return K.data = _deconstructPacket(G, W), K.attachments = W.length, {
		packet: K,
		buffers: W
	};
}
function _deconstructPacket(h, W) {
	if (!h) return h;
	if (isBinary(h)) {
		let G = {
			_placeholder: !0,
			num: W.length
		};
		return W.push(h), G;
	} else if (Array.isArray(h)) {
		let G = Array(h.length);
		for (let K = 0; K < h.length; K++) G[K] = _deconstructPacket(h[K], W);
		return G;
	} else if (typeof h == "object" && !(h instanceof Date)) {
		let G = {};
		for (let K in h) Object.prototype.hasOwnProperty.call(h, K) && (G[K] = _deconstructPacket(h[K], W));
		return G;
	}
	return h;
}
function reconstructPacket(h, W) {
	return h.data = _reconstructPacket(h.data, W), delete h.attachments, h;
}
function _reconstructPacket(h, W) {
	if (!h) return h;
	if (h && h._placeholder === !0) {
		if (typeof h.num == "number" && h.num >= 0 && h.num < W.length) return W[h.num];
		throw Error("illegal attachments");
	} else if (Array.isArray(h)) for (let G = 0; G < h.length; G++) h[G] = _reconstructPacket(h[G], W);
	else if (typeof h == "object") for (let G in h) Object.prototype.hasOwnProperty.call(h, G) && (h[G] = _reconstructPacket(h[G], W));
	return h;
}
var esm_exports = /* @__PURE__ */ __export({
	Decoder: () => Decoder,
	Encoder: () => Encoder,
	PacketType: () => PacketType,
	protocol: () => 5
}, 1), RESERVED_EVENTS$1 = [
	"connect",
	"connect_error",
	"disconnect",
	"disconnecting",
	"newListener",
	"removeListener"
], PacketType;
(function(h) {
	h[h.CONNECT = 0] = "CONNECT", h[h.DISCONNECT = 1] = "DISCONNECT", h[h.EVENT = 2] = "EVENT", h[h.ACK = 3] = "ACK", h[h.CONNECT_ERROR = 4] = "CONNECT_ERROR", h[h.BINARY_EVENT = 5] = "BINARY_EVENT", h[h.BINARY_ACK = 6] = "BINARY_ACK";
})(PacketType ||= {});
var Encoder = class {
	constructor(h) {
		this.replacer = h;
	}
	encode(h) {
		return (h.type === PacketType.EVENT || h.type === PacketType.ACK) && hasBinary(h) ? this.encodeAsBinary({
			type: h.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
			nsp: h.nsp,
			data: h.data,
			id: h.id
		}) : [this.encodeAsString(h)];
	}
	encodeAsString(h) {
		let W = "" + h.type;
		return (h.type === PacketType.BINARY_EVENT || h.type === PacketType.BINARY_ACK) && (W += h.attachments + "-"), h.nsp && h.nsp !== "/" && (W += h.nsp + ","), h.id != null && (W += h.id), h.data != null && (W += JSON.stringify(h.data, this.replacer)), W;
	}
	encodeAsBinary(h) {
		let W = deconstructPacket(h), G = this.encodeAsString(W.packet), K = W.buffers;
		return K.unshift(G), K;
	}
};
function isObject(h) {
	return Object.prototype.toString.call(h) === "[object Object]";
}
var Decoder = class h extends Emitter {
	constructor(h) {
		super(), this.reviver = h;
	}
	add(h) {
		let W;
		if (typeof h == "string") {
			if (this.reconstructor) throw Error("got plaintext data when reconstructing a packet");
			W = this.decodeString(h);
			let G = W.type === PacketType.BINARY_EVENT;
			G || W.type === PacketType.BINARY_ACK ? (W.type = G ? PacketType.EVENT : PacketType.ACK, this.reconstructor = new BinaryReconstructor(W), W.attachments === 0 && super.emitReserved("decoded", W)) : super.emitReserved("decoded", W);
		} else if (isBinary(h) || h.base64) if (this.reconstructor) W = this.reconstructor.takeBinaryData(h), W && (this.reconstructor = null, super.emitReserved("decoded", W));
		else throw Error("got binary data when not reconstructing a packet");
		else throw Error("Unknown type: " + h);
	}
	decodeString(W) {
		let G = 0, K = { type: Number(W.charAt(0)) };
		if (PacketType[K.type] === void 0) throw Error("unknown packet type " + K.type);
		if (K.type === PacketType.BINARY_EVENT || K.type === PacketType.BINARY_ACK) {
			let h = G + 1;
			for (; W.charAt(++G) !== "-" && G != W.length;);
			let q = W.substring(h, G);
			if (q != Number(q) || W.charAt(G) !== "-") throw Error("Illegal attachments");
			K.attachments = Number(q);
		}
		if (W.charAt(G + 1) === "/") {
			let h = G + 1;
			for (; ++G && !(W.charAt(G) === "," || G === W.length););
			K.nsp = W.substring(h, G);
		} else K.nsp = "/";
		let q = W.charAt(G + 1);
		if (q !== "" && Number(q) == q) {
			let h = G + 1;
			for (; ++G;) {
				let h = W.charAt(G);
				if (h == null || Number(h) != h) {
					--G;
					break;
				}
				if (G === W.length) break;
			}
			K.id = Number(W.substring(h, G + 1));
		}
		if (W.charAt(++G)) {
			let q = this.tryParse(W.substr(G));
			if (h.isPayloadValid(K.type, q)) K.data = q;
			else throw Error("invalid payload");
		}
		return K;
	}
	tryParse(h) {
		try {
			return JSON.parse(h, this.reviver);
		} catch {
			return !1;
		}
	}
	static isPayloadValid(h, W) {
		switch (h) {
			case PacketType.CONNECT: return isObject(W);
			case PacketType.DISCONNECT: return W === void 0;
			case PacketType.CONNECT_ERROR: return typeof W == "string" || isObject(W);
			case PacketType.EVENT:
			case PacketType.BINARY_EVENT: return Array.isArray(W) && (typeof W[0] == "number" || typeof W[0] == "string" && RESERVED_EVENTS$1.indexOf(W[0]) === -1);
			case PacketType.ACK:
			case PacketType.BINARY_ACK: return Array.isArray(W);
		}
	}
	destroy() {
		this.reconstructor &&= (this.reconstructor.finishedReconstruction(), null);
	}
}, BinaryReconstructor = class {
	constructor(h) {
		this.packet = h, this.buffers = [], this.reconPack = h;
	}
	takeBinaryData(h) {
		if (this.buffers.push(h), this.buffers.length === this.reconPack.attachments) {
			let h = reconstructPacket(this.reconPack, this.buffers);
			return this.finishedReconstruction(), h;
		}
		return null;
	}
	finishedReconstruction() {
		this.reconPack = null, this.buffers = [];
	}
};
function on(h, W, G) {
	return h.on(W, G), function() {
		h.off(W, G);
	};
}
var RESERVED_EVENTS = Object.freeze({
	connect: 1,
	connect_error: 1,
	disconnect: 1,
	disconnecting: 1,
	newListener: 1,
	removeListener: 1
}), Socket = class extends Emitter {
	constructor(h, W, G) {
		super(), this.connected = !1, this.recovered = !1, this.receiveBuffer = [], this.sendBuffer = [], this._queue = [], this._queueSeq = 0, this.ids = 0, this.acks = {}, this.flags = {}, this.io = h, this.nsp = W, G && G.auth && (this.auth = G.auth), this._opts = Object.assign({}, G), this.io._autoConnect && this.open();
	}
	get disconnected() {
		return !this.connected;
	}
	subEvents() {
		if (this.subs) return;
		let h = this.io;
		this.subs = [
			on(h, "open", this.onopen.bind(this)),
			on(h, "packet", this.onpacket.bind(this)),
			on(h, "error", this.onerror.bind(this)),
			on(h, "close", this.onclose.bind(this))
		];
	}
	get active() {
		return !!this.subs;
	}
	connect() {
		return this.connected ? this : (this.subEvents(), this.io._reconnecting || this.io.open(), this.io._readyState === "open" && this.onopen(), this);
	}
	open() {
		return this.connect();
	}
	send(...h) {
		return h.unshift("message"), this.emit.apply(this, h), this;
	}
	emit(h, ...W) {
		if (RESERVED_EVENTS.hasOwnProperty(h)) throw Error("\"" + h.toString() + "\" is a reserved event name");
		if (W.unshift(h), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) return this._addToQueue(W), this;
		let G = {
			type: PacketType.EVENT,
			data: W
		};
		if (G.options = {}, G.options.compress = this.flags.compress !== !1, typeof W[W.length - 1] == "function") {
			let h = this.ids++, K = W.pop();
			this._registerAckCallback(h, K), G.id = h;
		}
		let K = this.io.engine?.transport?.writable, q = this.connected && !this.io.engine?._hasPingExpired();
		return this.flags.volatile && !K || (q ? (this.notifyOutgoingListeners(G), this.packet(G)) : this.sendBuffer.push(G)), this.flags = {}, this;
	}
	_registerAckCallback(h, W) {
		let G = this.flags.timeout ?? this._opts.ackTimeout;
		if (G === void 0) {
			this.acks[h] = W;
			return;
		}
		let K = this.io.setTimeoutFn(() => {
			delete this.acks[h];
			for (let W = 0; W < this.sendBuffer.length; W++) this.sendBuffer[W].id === h && this.sendBuffer.splice(W, 1);
			W.call(this, /* @__PURE__ */ Error("operation has timed out"));
		}, G), q = (...h) => {
			this.io.clearTimeoutFn(K), W.apply(this, h);
		};
		q.withError = !0, this.acks[h] = q;
	}
	emitWithAck(h, ...W) {
		return new Promise((G, K) => {
			let q = (h, W) => h ? K(h) : G(W);
			q.withError = !0, W.push(q), this.emit(h, ...W);
		});
	}
	_addToQueue(h) {
		let W;
		typeof h[h.length - 1] == "function" && (W = h.pop());
		let G = {
			id: this._queueSeq++,
			tryCount: 0,
			pending: !1,
			args: h,
			flags: Object.assign({ fromQueue: !0 }, this.flags)
		};
		h.push((h, ...K) => {
			if (G === this._queue[0]) return h === null ? (this._queue.shift(), W && W(null, ...K)) : G.tryCount > this._opts.retries && (this._queue.shift(), W && W(h)), G.pending = !1, this._drainQueue();
		}), this._queue.push(G), this._drainQueue();
	}
	_drainQueue(h = !1) {
		if (!this.connected || this._queue.length === 0) return;
		let W = this._queue[0];
		W.pending && !h || (W.pending = !0, W.tryCount++, this.flags = W.flags, this.emit.apply(this, W.args));
	}
	packet(h) {
		h.nsp = this.nsp, this.io._packet(h);
	}
	onopen() {
		typeof this.auth == "function" ? this.auth((h) => {
			this._sendConnectPacket(h);
		}) : this._sendConnectPacket(this.auth);
	}
	_sendConnectPacket(h) {
		this.packet({
			type: PacketType.CONNECT,
			data: this._pid ? Object.assign({
				pid: this._pid,
				offset: this._lastOffset
			}, h) : h
		});
	}
	onerror(h) {
		this.connected || this.emitReserved("connect_error", h);
	}
	onclose(h, W) {
		this.connected = !1, delete this.id, this.emitReserved("disconnect", h, W), this._clearAcks();
	}
	_clearAcks() {
		Object.keys(this.acks).forEach((h) => {
			if (!this.sendBuffer.some((W) => String(W.id) === h)) {
				let W = this.acks[h];
				delete this.acks[h], W.withError && W.call(this, /* @__PURE__ */ Error("socket has been disconnected"));
			}
		});
	}
	onpacket(h) {
		if (h.nsp === this.nsp) switch (h.type) {
			case PacketType.CONNECT:
				h.data && h.data.sid ? this.onconnect(h.data.sid, h.data.pid) : this.emitReserved("connect_error", /* @__PURE__ */ Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
				break;
			case PacketType.EVENT:
			case PacketType.BINARY_EVENT:
				this.onevent(h);
				break;
			case PacketType.ACK:
			case PacketType.BINARY_ACK:
				this.onack(h);
				break;
			case PacketType.DISCONNECT:
				this.ondisconnect();
				break;
			case PacketType.CONNECT_ERROR:
				this.destroy();
				let W = Error(h.data.message);
				W.data = h.data.data, this.emitReserved("connect_error", W);
				break;
		}
	}
	onevent(h) {
		let W = h.data || [];
		h.id != null && W.push(this.ack(h.id)), this.connected ? this.emitEvent(W) : this.receiveBuffer.push(Object.freeze(W));
	}
	emitEvent(h) {
		if (this._anyListeners && this._anyListeners.length) {
			let W = this._anyListeners.slice();
			for (let G of W) G.apply(this, h);
		}
		super.emit.apply(this, h), this._pid && h.length && typeof h[h.length - 1] == "string" && (this._lastOffset = h[h.length - 1]);
	}
	ack(h) {
		let W = this, G = !1;
		return function(...K) {
			G || (G = !0, W.packet({
				type: PacketType.ACK,
				id: h,
				data: K
			}));
		};
	}
	onack(h) {
		let W = this.acks[h.id];
		typeof W == "function" && (delete this.acks[h.id], W.withError && h.data.unshift(null), W.apply(this, h.data));
	}
	onconnect(h, W) {
		this.id = h, this.recovered = W && this._pid === W, this._pid = W, this.connected = !0, this.emitBuffered(), this.emitReserved("connect"), this._drainQueue(!0);
	}
	emitBuffered() {
		this.receiveBuffer.forEach((h) => this.emitEvent(h)), this.receiveBuffer = [], this.sendBuffer.forEach((h) => {
			this.notifyOutgoingListeners(h), this.packet(h);
		}), this.sendBuffer = [];
	}
	ondisconnect() {
		this.destroy(), this.onclose("io server disconnect");
	}
	destroy() {
		this.subs &&= (this.subs.forEach((h) => h()), void 0), this.io._destroy(this);
	}
	disconnect() {
		return this.connected && this.packet({ type: PacketType.DISCONNECT }), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
	}
	close() {
		return this.disconnect();
	}
	compress(h) {
		return this.flags.compress = h, this;
	}
	get volatile() {
		return this.flags.volatile = !0, this;
	}
	timeout(h) {
		return this.flags.timeout = h, this;
	}
	onAny(h) {
		return this._anyListeners = this._anyListeners || [], this._anyListeners.push(h), this;
	}
	prependAny(h) {
		return this._anyListeners = this._anyListeners || [], this._anyListeners.unshift(h), this;
	}
	offAny(h) {
		if (!this._anyListeners) return this;
		if (h) {
			let W = this._anyListeners;
			for (let G = 0; G < W.length; G++) if (h === W[G]) return W.splice(G, 1), this;
		} else this._anyListeners = [];
		return this;
	}
	listenersAny() {
		return this._anyListeners || [];
	}
	onAnyOutgoing(h) {
		return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.push(h), this;
	}
	prependAnyOutgoing(h) {
		return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.unshift(h), this;
	}
	offAnyOutgoing(h) {
		if (!this._anyOutgoingListeners) return this;
		if (h) {
			let W = this._anyOutgoingListeners;
			for (let G = 0; G < W.length; G++) if (h === W[G]) return W.splice(G, 1), this;
		} else this._anyOutgoingListeners = [];
		return this;
	}
	listenersAnyOutgoing() {
		return this._anyOutgoingListeners || [];
	}
	notifyOutgoingListeners(h) {
		if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
			let W = this._anyOutgoingListeners.slice();
			for (let G of W) G.apply(this, h.data);
		}
	}
};
function Backoff(h) {
	h ||= {}, this.ms = h.min || 100, this.max = h.max || 1e4, this.factor = h.factor || 2, this.jitter = h.jitter > 0 && h.jitter <= 1 ? h.jitter : 0, this.attempts = 0;
}
Backoff.prototype.duration = function() {
	var h = this.ms * this.factor ** + this.attempts++;
	if (this.jitter) {
		var W = Math.random(), G = Math.floor(W * this.jitter * h);
		h = Math.floor(W * 10) & 1 ? h + G : h - G;
	}
	return Math.min(h, this.max) | 0;
}, Backoff.prototype.reset = function() {
	this.attempts = 0;
}, Backoff.prototype.setMin = function(h) {
	this.ms = h;
}, Backoff.prototype.setMax = function(h) {
	this.max = h;
}, Backoff.prototype.setJitter = function(h) {
	this.jitter = h;
};
var Manager = class extends Emitter {
	constructor(h, W) {
		super(), this.nsps = {}, this.subs = [], h && typeof h == "object" && (W = h, h = void 0), W ||= {}, W.path = W.path || "/socket.io", this.opts = W, installTimerFunctions(this, W), this.reconnection(W.reconnection !== !1), this.reconnectionAttempts(W.reconnectionAttempts || Infinity), this.reconnectionDelay(W.reconnectionDelay || 1e3), this.reconnectionDelayMax(W.reconnectionDelayMax || 5e3), this.randomizationFactor(W.randomizationFactor ?? .5), this.backoff = new Backoff({
			min: this.reconnectionDelay(),
			max: this.reconnectionDelayMax(),
			jitter: this.randomizationFactor()
		}), this.timeout(W.timeout == null ? 2e4 : W.timeout), this._readyState = "closed", this.uri = h;
		let G = W.parser || esm_exports;
		this.encoder = new G.Encoder(), this.decoder = new G.Decoder(), this._autoConnect = W.autoConnect !== !1, this._autoConnect && this.open();
	}
	reconnection(h) {
		return arguments.length ? (this._reconnection = !!h, h || (this.skipReconnect = !0), this) : this._reconnection;
	}
	reconnectionAttempts(h) {
		return h === void 0 ? this._reconnectionAttempts : (this._reconnectionAttempts = h, this);
	}
	reconnectionDelay(h) {
		var W;
		return h === void 0 ? this._reconnectionDelay : (this._reconnectionDelay = h, (W = this.backoff) == null || W.setMin(h), this);
	}
	randomizationFactor(h) {
		var W;
		return h === void 0 ? this._randomizationFactor : (this._randomizationFactor = h, (W = this.backoff) == null || W.setJitter(h), this);
	}
	reconnectionDelayMax(h) {
		var W;
		return h === void 0 ? this._reconnectionDelayMax : (this._reconnectionDelayMax = h, (W = this.backoff) == null || W.setMax(h), this);
	}
	timeout(h) {
		return arguments.length ? (this._timeout = h, this) : this._timeout;
	}
	maybeReconnectOnOpen() {
		!this._reconnecting && this._reconnection && this.backoff.attempts === 0 && this.reconnect();
	}
	open(h) {
		if (~this._readyState.indexOf("open")) return this;
		this.engine = new Socket$1(this.uri, this.opts);
		let W = this.engine, G = this;
		this._readyState = "opening", this.skipReconnect = !1;
		let K = on(W, "open", function() {
			G.onopen(), h && h();
		}), q = (W) => {
			this.cleanup(), this._readyState = "closed", this.emitReserved("error", W), h ? h(W) : this.maybeReconnectOnOpen();
		}, J = on(W, "error", q);
		if (!1 !== this._timeout) {
			let h = this._timeout, G = this.setTimeoutFn(() => {
				K(), q(/* @__PURE__ */ Error("timeout")), W.close();
			}, h);
			this.opts.autoUnref && G.unref(), this.subs.push(() => {
				this.clearTimeoutFn(G);
			});
		}
		return this.subs.push(K), this.subs.push(J), this;
	}
	connect(h) {
		return this.open(h);
	}
	onopen() {
		this.cleanup(), this._readyState = "open", this.emitReserved("open");
		let h = this.engine;
		this.subs.push(on(h, "ping", this.onping.bind(this)), on(h, "data", this.ondata.bind(this)), on(h, "error", this.onerror.bind(this)), on(h, "close", this.onclose.bind(this)), on(this.decoder, "decoded", this.ondecoded.bind(this)));
	}
	onping() {
		this.emitReserved("ping");
	}
	ondata(h) {
		try {
			this.decoder.add(h);
		} catch (h) {
			this.onclose("parse error", h);
		}
	}
	ondecoded(h) {
		nextTick(() => {
			this.emitReserved("packet", h);
		}, this.setTimeoutFn);
	}
	onerror(h) {
		this.emitReserved("error", h);
	}
	socket(h, W) {
		let G = this.nsps[h];
		return G ? this._autoConnect && !G.active && G.connect() : (G = new Socket(this, h, W), this.nsps[h] = G), G;
	}
	_destroy(h) {
		let W = Object.keys(this.nsps);
		for (let h of W) if (this.nsps[h].active) return;
		this._close();
	}
	_packet(h) {
		let W = this.encoder.encode(h);
		for (let G = 0; G < W.length; G++) this.engine.write(W[G], h.options);
	}
	cleanup() {
		this.subs.forEach((h) => h()), this.subs.length = 0, this.decoder.destroy();
	}
	_close() {
		this.skipReconnect = !0, this._reconnecting = !1, this.onclose("forced close");
	}
	disconnect() {
		return this._close();
	}
	onclose(h, W) {
		var G;
		this.cleanup(), (G = this.engine) == null || G.close(), this.backoff.reset(), this._readyState = "closed", this.emitReserved("close", h, W), this._reconnection && !this.skipReconnect && this.reconnect();
	}
	reconnect() {
		if (this._reconnecting || this.skipReconnect) return this;
		let h = this;
		if (this.backoff.attempts >= this._reconnectionAttempts) this.backoff.reset(), this.emitReserved("reconnect_failed"), this._reconnecting = !1;
		else {
			let W = this.backoff.duration();
			this._reconnecting = !0;
			let G = this.setTimeoutFn(() => {
				h.skipReconnect || (this.emitReserved("reconnect_attempt", h.backoff.attempts), !h.skipReconnect && h.open((W) => {
					W ? (h._reconnecting = !1, h.reconnect(), this.emitReserved("reconnect_error", W)) : h.onreconnect();
				}));
			}, W);
			this.opts.autoUnref && G.unref(), this.subs.push(() => {
				this.clearTimeoutFn(G);
			});
		}
	}
	onreconnect() {
		let h = this.backoff.attempts;
		this._reconnecting = !1, this.backoff.reset(), this.emitReserved("reconnect", h);
	}
}, cache = {};
function lookup(h, W) {
	typeof h == "object" && (W = h, h = void 0), W ||= {};
	let G = url(h, W.path || "/socket.io"), K = G.source, q = G.id, J = G.path, Y = cache[q] && J in cache[q].nsps, X = W.forceNew || W["force new connection"] || !1 === W.multiplex || Y, Z;
	return X ? Z = new Manager(K, W) : (cache[q] || (cache[q] = new Manager(K, W)), Z = cache[q]), G.query && !W.query && (W.query = G.queryKey), Z.socket(G.path, W);
}
Object.assign(lookup, {
	Manager,
	Socket,
	io: lookup,
	connect: lookup
});
var SysBase = class h {
	elc = new EventListenerCtn();
	hFactoryCls = {};
	constructor(h = {}, W) {
		this.hPlg = h, this.arg = W;
	}
	destroy() {
		this.elc.clear();
	}
	async loaded(...[h]) {
		let W = h.snsys_pre;
		return delete h.snsys_pre, W?.init({
			getInfo: this.#n,
			addTag: () => {},
			addLayCls: () => {},
			searchPath: () => "",
			getVal: () => ({}),
			resume: () => {},
			render: () => {},
			setDec: (h) => {
				this.dec = h;
			},
			setDecAB: (h) => {
				this.#_ = h;
			},
			setEnc: (h) => {
				this.enc = h;
			},
			getStK: (h) => {
				this.stk = h;
			},
			getHash: (h) => {
				this.hash = h;
			}
		});
	}
	main = void 0;
	cfg;
	setMain(h, W) {
		this.main = h, this.cfg = W;
	}
	async run() {
		let [{ Main: h }, { TxtLayer: W }, { GrpLayer: G }] = await Promise.all([
			import("./Main.js"),
			import("./TxtLayer.js"),
			import("./GrpLayer.js")
		]);
		this.hFactoryCls = {
			grp: () => new G(),
			txt: () => new W()
		}, this.run = async () => {
			this.main?.destroy(), this.main = await h.generate(this);
		}, await this.run();
	}
	stop() {
		this.main?.destroy(), this.main = void 0;
	}
	fetch = (h, W) => fetch(h, W);
	data = {
		sys: creSYS_DATA(),
		mark: {},
		kidoku: {}
	};
	async initVal(h, W) {}
	flush() {
		if (this.#e) {
			this.#t = !0;
			return;
		}
		this.flushSub(), this.#e = setTimeout(() => {
			this.#e = void 0, this.#t && (this.#t = !1, this.flush());
		}, 500);
	}
	#e = void 0;
	#t = !1;
	flushSub() {}
	val;
	init(h, W, G) {
		let q = [];
		this.val = G;
		let J = "";
		return q.push(G.init().then(() => {
			J = "sys", J += String(G.getVal("sys:TextLayer.Back.Alpha", 1)), J = "kidoku", G.saveKidoku();
		}).catch((h) => console.error(`セーブデータ（${J}）が壊れています。一度クリアする必要があります(b) %o`, h))), h.close = (h) => this.close(h), h.export = (h) => this._export(h), h.import = (h) => this._import(h), h.navigate_to = (h) => this.navigate_to(h), h.title = (h) => this.title(h), h.toggle_full_screen = (h) => this.#h(h), h.update_check = (h) => this.update_check(h), h.window = (h) => this.window(h), h.title({ text: this.cfg.oCfg.book.title || "SKYNovel" }), G.defTmp("const.sn.isApp", () => this.isApp), G.defTmp("const.sn.isDbg", () => CmnLib.isDbg), G.defTmp("const.sn.isPackaged", () => CmnLib.isPackaged), G.defTmp("const.sn.needClick2Play", () => CmnLib.needClick2Play()), G.defTmp("const.sn.displayState", () => this.isFullScr), G.setVal_Nochk("sys", "const.sn.cfg.ns", this.cfg.oCfg.save_ns), G.flush(), CmnLib.isDbg && this.attach_debug(this.main), [...q, ...Object.values(this.hPlg).map((K) => K.init({
			getInfo: this.#n,
			addTag: (W, G) => {
				if (W in h) throw `すでに定義済みのタグ[${W}]です`;
				h[W] = G;
			},
			addLayCls: (h, W) => {
				if (h in this.hFactoryCls) throw `すでに定義済みのレイヤcls【${h}】です`;
				this.hFactoryCls[h] = W;
			},
			searchPath: (h, W = SEARCH_PATH_ARG_EXT.DEFAULT) => this.cfg.searchPath(h, W),
			getVal: (h, W) => G.getVal(h, W),
			resume: () => this.main?.resume(),
			render: (h, G, K = !1) => W.renderer.render(h, {
				...G ? { renderTexture: G } : {},
				clear: K
			}),
			setDec: () => {},
			setDecAB: () => {},
			setEnc: () => {},
			getStK: () => {},
			getHash: () => {}
		}))];
	}
	#n = () => ({ window: {
		width: CmnLib.stageW,
		height: CmnLib.stageH
	} });
	#r = 0;
	#i = 0;
	#a = 1;
	#o = 0;
	#s = 0;
	#c = 0;
	#l = 0;
	get cvsWidth() {
		return this.#r;
	}
	get cvsHeight() {
		return this.#i;
	}
	get cvsScale() {
		return this.#a;
	}
	get ofsLeft4elm() {
		return this.#o;
	}
	get ofsTop4elm() {
		return this.#s;
	}
	get ofsPadLeft_Dom2PIXI() {
		return this.#c;
	}
	get ofsPadTop_Dom2PIXI() {
		return this.#l;
	}
	isFullScr = !1;
	cvsResize() {
		if (!this.main) return;
		let h = globalThis.innerWidth, W = globalThis.innerHeight, q = this.main.cvs, J = q.parentElement !== document.body;
		if (J) {
			let G = globalThis.getComputedStyle(q);
			h = parseFloat(G.width), W = parseFloat(G.height);
		}
		if (CmnLib.isMobile) {
			let G = screen.orientation.angle % 180 == 0;
			(G && h > W || !G && h < W) && ([h, W] = [W, h]);
		}
		let Y = q.getBoundingClientRect();
		if (argChk_Boolean(CmnLib.hDip, "expanding", !0) || J || CmnLib.stageW > h || CmnLib.stageH > W) if (CmnLib.stageW / CmnLib.stageH <= h / W ? (this.#i = W, this.#r = CmnLib.stageW / CmnLib.stageH * W) : (this.#r = h, this.#i = CmnLib.stageH / CmnLib.stageW * h), this.#a = this.#r / CmnLib.stageW, J) this.#c = 0, this.#l = 0;
		else {
			let G = 1 - this.#a;
			CmnLib.isMobile ? (this.#c = (h - this.#r) / 2 * G, this.#l = (W - this.#i) / 2 * G) : (this.#c = Y.left * G, this.#l = Y.top * G);
		}
		else this.#r = CmnLib.stageW, this.#i = CmnLib.stageH, this.#a = 1, this.#c = 0, this.#l = 0;
		let X = q.parentElement.style;
		J || (X.position = "relative", X.width = `${String(this.#r)}px`, X.height = `${String(this.#i)}px`);
		let Z = q.style;
		Z.width = X.width, Z.height = X.height, J ? (this.#o = Y.left, this.#s = Y.top) : (this.#o = 0, this.#s = 0), this.isFullScr && (this.#o += (h - this.#r) / 2, this.#s += (W - this.#i) / 2);
	}
	use4ViteElectron(h, W, G, K) {
		return !1;
	}
	attach_debug(h) {
		this.attach_debug = () => {};
		let W = document.createElement("style");
		W.innerHTML = "/* SKYNovel Dbg */\n.sn_BounceInOut { animation: sn_kfBounceInOut linear 1.5s; }\n@keyframes sn_kfBounceInOut{\n0%	{opacity: 0;	transform: scaleX(0.30) scaleY(0.30);}\n10%	{opacity: 1;	transform: scaleX(1.10) scaleY(1.10);}\n20%	{				transform: scaleX(0.95) scaleY(0.95);}\n30%	{				transform: scaleX(1.00) scaleY(1.00);}\n70%	{opacity: 1;}\n100%{opacity: 0;}\n}\n.sn_BounceIn { animation: sn_kfBounceIn linear 0.3s; }\n@keyframes sn_kfBounceIn{\n0%	{opacity: 0;	transform: scaleX(0.30) scaleY(0.30);}\n50%	{opacity: 1;	transform: scaleX(1.10) scaleY(1.10);}\n100%{				transform: scaleX(0.95) scaleY(0.95);}\n}\n.sn_HopIn { animation: sn_kfHopIn linear 0.8s; }\n@keyframes sn_kfHopIn{\n0%	{transform:	translate(0px,   0px);}\n15% {transform:	translate(0px, -25px);}\n30% {transform:	translate(0px,   0px);}\n45% {transform:	translate(0px, -15px);}\n60% {transform:	translate(0px,   0px);}\n75% {transform:	translate(0px,  -5px);}\n100%{transform:	translate(0px,   0px);}\n}", document.getElementsByTagName("head")[0].appendChild(W), this.addHook((h, W) => this.#d[h]?.(W)), this.#u = lookup(`http://localhost:${String(this.extPort)}`), this.#u.on("data", (h, W) => {
			this.callHook(h, W);
		}).on("disconnect", () => h.setLoop(!0)), this.callHook = (h, W) => {
			for (let G of this.#p) G(h, W);
		};
	}
	extPort = 3776;
	end() {
		this.#u?.disconnect(), this.#u = void 0;
	}
	#u = void 0;
	#d = {
		auth: (h) => {
			if (h.t !== this.cfg.oCfg.debuger_token) {
				this.end();
				return;
			}
			this.toast("接続");
		},
		continue: () => this.toast("再生"),
		disconnect: () => this.toast("切断"),
		restart: (h) => {
			this.send2Dbg(h?.ri ?? "", {}), this.end(), this.run();
		},
		pause: () => this.toast("一時停止"),
		stopOnEntry: () => this.toast("一時停止"),
		stopOnDataBreakpoint: () => this.toast("注意"),
		stopOnBreakpoint: () => this.toast("注意"),
		stopOnStep: () => this.toast("一歩進む"),
		stopOnStepIn: () => this.toast("ステップイン"),
		stopOnStepOut: () => this.toast("ステップアウト"),
		stopOnBackstep: () => this.toast("一歩戻る"),
		_addPath: (h) => this.cfg.addPath(h.fn, h.o)
	};
	toast(W) {
		if (!this.main) return;
		let G = document.body;
		for (let h of [...Array.from(G.getElementsByClassName("sn_BounceIn")), ...Array.from(G.getElementsByClassName("sn_HopIn"))]) h.remove();
		let q = document.createElement("img"), J = h.#f[W];
		if (!J) throw Error(`toast 名ミス=${W}`);
		q.src = `data:image/svg+xml;base64,${J.dat}`;
		let Y = Math.min(CmnLib.stageW, CmnLib.stageH) / 4 * this.#a;
		q.width = q.height = Y, q.style.cssText = `position: absolute;
left: ${String((CmnLib.stageW - Y) / 2 * this.#a + Y * (J.dx ?? 0))}px;
top: ${String((CmnLib.stageH - Y) / 2 * this.#a + Y * (J.dy ?? 0))}px;`, q.classList.add("sn_toast", J.ease ?? "sn_BounceInOut"), J.ease || q.addEventListener("animationend", () => G.removeChild(q), {
			once: !0,
			passive: !0
		}), G.insertBefore(q, this.main.cvs);
	}
	static #f = {
		接続: {
			dx: -1,
			dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtNjQwIDMyMGMwIDE3Ni43My0xNDMuMjcgMzIwLTMyMCAzMjBzLTMyMC0xNDMuMjctMzIwLTMyMCAxNDMuMjctMzIwIDMyMC0zMjAgMzIwIDE0My4yNyAzMjAgMzIweiIvPjxwYXRoIGlkPSJiIiBkPSJtMCAyOTJ2NTUuODhoMTI3LjEzYzEyLjM3IDQ2IDU0LjEyIDc5Ljg3IDEwNCA3OS44N2g3Ny44N3YtMjE1LjYyYy00Ni43MyAwLTcyLjY4IDAtNzcuODggMC00OS43NCAwLTkxLjYyIDMzLjg3LTEwMy45OSA3OS44Ny0xNi45NSAwLTU5LjMzIDAtMTI3LjEzIDB6Ii8+PHBhdGggaWQ9ImMiIGQ9Im01MTIuODggMjkyYy0xMi4zOC00Ni01NC4xMy03OS44Ny0xMDQtNzkuODctNS4yMSAwLTMxLjIxIDAtNzggMHYyMTUuNzRoNzcuODdjNDkuODggMCA5MS43NS0zMy44NyAxMDQtNzkuODdoMTI3LjI1di01NmMtNzYuMjcgMC0xMTguNjUgMC0xMjcuMTIgMHoiLz48L2RlZnM+PHVzZSBmaWxsPSIjMmUyZTJlIiB4bGluazpocmVmPSIjYSIvPjx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIGZpbGw9IiMzYWFiZDIiIHhsaW5rOmhyZWY9IiNiIi8+PHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjYiIvPjx1c2UgZmlsbD0iIzNhYWJkMiIgeGxpbms6aHJlZj0iI2MiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNjIi8+PC9zdmc+"
		},
		切断: { dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtNjQwIDMyMGMwIDE3Ni43My0xNDMuMjcgMzIwLTMyMCAzMjBzLTMyMC0xNDMuMjctMzIwLTMyMCAxNDMuMjctMzIwIDMyMC0zMjAgMzIwIDE0My4yNyAzMjAgMzIweiIvPjxwYXRoIGlkPSJiIiBkPSJtMTkxLjUzIDIyMS4yNGMtNDUuNjggMC04NC4wMSAzMS4wNC05NS4zIDczLjE2LTYuNDEgMC0zOC40OSAwLTk2LjIzIDB2NTEuMjFoOTYuMjNjMTEuMyA0Mi4xMSA0OS42MyA3My4xNiA5NS4zIDczLjE2aDcxLjMzdi00OC4yNGg1My43OHYtMTAxLjA1aC01My43OHYtNDguMjRjLTQyLjggMC02Ni41NyAwLTcxLjMzIDB6Ii8+PHBhdGggaWQ9ImMiIGQ9Im00NDguNDcgMjIxLjIzYy00Ljc2IDAtMjguNTMgMC03MS4zMyAwdjE5Ny41M2g3MS4zM2M0NS42OCAwIDgzLjk5LTMxLjA0IDk1LjI5LTczLjE1aDk2LjI0di01MS4yMWgtOTYuMjRjLTMzLjA4LTQ4Ljc4LTY0Ljg0LTczLjE3LTk1LjI5LTczLjE3eiIvPjwvZGVmcz48dXNlIGZpbGw9IiMyZTJlMmUiIHhsaW5rOmhyZWY9IiNhIi8+PHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjYSIvPjx1c2UgZmlsbD0iI2RmNTY1NiIgeGxpbms6aHJlZj0iI2IiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNiIi8+PHVzZSBmaWxsPSIjZGY1NjU2IiB4bGluazpocmVmPSIjYyIvPjx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI2MiLz48L3N2Zz4=" },
		再生: { dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjBjMCAxNzYuNzIgMTQzLjI4IDMyMCAzMjAgMzIwczMyMC0xNDMuMjggMzIwLTMyMC0xNDMuMjgtMzIwLTMyMC0zMjAtMzIwIDE0My4yOC0zMjAgMzIwem0yNTguODMgMTExLjA1Yy0xLjI5Ljc5LTIuOTMuODMtNC4yNi4wNC0xLjI5LS43NC0yLjExLTIuMTItMi4xMS0zLjY3IDAtNy4xNiAwLTQyLjk3IDAtMTA3LjQzczAtMTAwLjI3IDAtMTA3LjQzYzAtMS41My44Mi0yLjkzIDIuMTEtMy42OCAxLjMzLS43NiAyLjk3LS43MiA0LjI2LjA0IDE4IDEwLjc1IDE2MiA5Ni43MSAxODAgMTA3LjQ2IDEuMjkuNzMgMi4wNSAyLjE0IDIuMDUgMy42MSAwIDEuNDktLjc2IDIuODgtMi4wNSAzLjYzLTM2IDIxLjQ5LTE2MiA5Ni42OS0xODAgMTA3LjQzeiIvPjwvZGVmcz48cGF0aCBkPSJtMTU0LjU3IDE3MC4xOWgzNDYuMTV2MzA3LjY5aC0zNDYuMTV6IiBmaWxsPSIjZmZmIi8+PHVzZSBmaWxsPSIjMmUyZTJlIiB4bGluazpocmVmPSIjYSIvPjx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI2EiLz48L3N2Zz4=" },
		一時停止: { dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjBjMCAxNzYuNzIgMTQzLjI4IDMyMCAzMjAgMzIwczMyMC0xNDMuMjggMzIwLTMyMC0xNDMuMjgtMzIwLTMyMC0zMjAtMzIwIDE0My4yOC0zMjAgMzIwem0yMDAgMTAwdi0yMDBoODB2MjAwem0xNjAgMHYtMjAwaDgwdjIwMHoiLz48L2RlZnM+PHBhdGggZD0ibTE0Ny40OSAxODAuNDFoMzUyLjR2MjgyLjY5aC0zNTIuNHoiIGZpbGw9IiNmZmYiLz48dXNlIGZpbGw9IiMyZTJlMmUiIHhsaW5rOmhyZWY9IiNhIi8+PHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjYSIvPjwvc3ZnPg==" },
		注意: {
			ease: "sn_HopIn",
			dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMzQzLjM0IDI5LjJjLTEwLjM3LTE3Ljk3LTM2LjMxLTE3Ljk3LTQ2LjY5IDAtMjkuMyA1MC43NS0yNjMuNyA0NTYuNzQtMjkzIDUwNy40OS0xMC4zNyAxNy45NyAyLjU5IDQwLjQ0IDIzLjM0IDQwLjQ0aDU4Ni4wMWMyMC43NSAwIDMzLjcyLTIyLjQ2IDIzLjM1LTQwLjQ0LTU4LjYtMTAxLjUtMjYzLjctNDU2Ljc0LTI5My4wMS01MDcuNDl6bS0yMy4zNCA0ODIuODNjLTE0LjUyIDAtMjYuMjktMi43MS0yNi4yOS02LjA2IDAtNC4yMSAwLTM3Ljg2IDAtNDIuMDcgMC0zLjM1IDExLjc3LTYuMDcgMjYuMjktNi4wN3MyNi4yOSAyLjcyIDI2LjI5IDYuMDd2NDIuMDdjLTcuODQgNC4wNC0xNi42MSA2LjA2LTI2LjI5IDYuMDZ6bTIxLjk5LTEwMy44NGMwIDUuNDMtOS44NSA5LjgzLTIxLjk5IDkuODMtMTIuMTUgMC0yMS45OS00LjQtMjEuOTktOS44MyAwLS4xMy4wNy0uMjUuMDgtLjM4LTEuMzctMTcuNTYtMTIuMy0xNTguMDYtMTMuNjctMTc1LjYyIDAtNS40MyAxNS45My05Ljg0IDM1LjU4LTkuODRzMzUuNTggNC40MSAzNS41OCA5Ljg0Yy0uOTEgMTEuNy01LjQ3IDcwLjI1LTEzLjY3IDE3NS42Mi4wNi4xNi4wOC4yOS4wOC4zOHoiLz48L2RlZnM+PHBhdGggZD0ibTI0MS4yOSAxOTEuNDRoMTQ1LjQ5djM1MS42NmgtMTQ1LjQ5eiIgZmlsbD0iI2ZmZiIvPjx1c2UgZmlsbD0iI2QyYmYzYSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNhIi8+PC9zdmc+"
		},
		一歩進む: {
			ease: "sn_BounceIn",
			dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjBjMCAxNzYuNzIgMTQzLjI4IDMyMCAzMjAgMzIwczMyMC0xNDMuMjggMzIwLTMyMC0xNDMuMjgtMzIwLTMyMC0zMjAtMzIwIDE0My4yOC0zMjAgMzIwem0zNzYuOTMgOTEuOTdjMC01My41MSAwLTgzLjI0IDAtODkuMTktLjE1LjE0LS4yNS4zNC0uNDQuNDUtMTYuMTEgOS42Mi0xNDQuOTUgODYuNTQtMTYxLjA2IDk2LjE1LTEuMTUuNjktMi42Mi43My0zLjgxLjAyLTEuMTUtLjY0LTEuODktMS44OS0xLjg5LTMuMjggMC02LjQxIDAtMzguNDQgMC05Ni4xMSAwLTU3LjY5IDAtODkuNzQgMC05Ni4xNSAwLTEuMzUuNzQtMi42MiAxLjg5LTMuMjkgMS4xOS0uNjggMi42Ni0uNjQgMy44MS4wNCAxNi4xMSA5LjYyIDE0NC45NSA4Ni41NCAxNjEuMDYgOTYuMTYuMTkuMS4yOS4zMS40NC40NSAwLTYuMTMgMC0zNi43NyAwLTkxLjkyaDUzLjMydjE4Ni42N3oiLz48L2RlZnM+PHBhdGggZD0ibTE0Ny40OSAxNTQuMmgzNTIuNHYzMDguOWgtMzUyLjR6IiBmaWxsPSIjZmZmIi8+PHVzZSBmaWxsPSIjMmUyZTJlIiB4bGluazpocmVmPSIjYSIvPjx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI2EiLz48L3N2Zz4="
		},
		一歩戻る: {
			ease: "sn_BounceIn",
			dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjBjMCAxNzYuNzIgMTQzLjI4IDMyMCAzMjAgMzIwczMyMC0xNDMuMjggMzIwLTMyMC0xNDMuMjgtMzIwLTMyMC0zMjAtMzIwIDE0My4yOC0zMjAgMzIwem00MzAuMjcgOTYuMTRjMCAxLjM1LS43NCAyLjYyLTEuODkgMy4yOC0xLjE5LjY5LTIuNjYuNjUtMy44MS0uMDMtMTYuMTEtOS42Mi0xNDQuOTUtODYuNTQtMTYxLjA1LTk2LjE2LS4yLS4xLS4yOS0uMzEtLjQ1LS40NXY5MS45MmgtNTMuMzJ2LTE4Ni42N2g1My4zMnY4OS4xOWMuMTYtLjE0LjI1LS4zNC40NS0uNDUgMTYuMS05LjYyIDE0NC45NC04Ni41NCAxNjEuMDUtOTYuMTYgMS4xNS0uNjggMi42Mi0uNzIgMy44MS0uMDEgMS4xNS42NCAxLjg5IDEuODkgMS44OSAzLjI4djk2LjExeiIvPjwvZGVmcz48cGF0aCBkPSJtMTQ3LjQ5IDE1NC4yaDM1Mi40djMwOC45aC0zNTIuNHoiIGZpbGw9IiNmZmYiLz48dXNlIGZpbGw9IiMyZTJlMmUiIHhsaW5rOmhyZWY9IiNhIi8+PHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjYSIvPjwvc3ZnPg=="
		},
		ステップイン: {
			ease: "sn_BounceIn",
			dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMTkuOTljMCAxNzYuNzQgMTQzLjI3IDMyMC4wMSAzMjAuMDEgMzIwLjAxIDE3Ni43MiAwIDMxOS45OS0xNDMuMjcgMzE5Ljk5LTMyMC4wMSAwLTE3Ni43Mi0xNDMuMjctMzE5Ljk5LTMxOS45OS0zMTkuOTktMTc2Ljc0IDAtMzIwLjAxIDE0My4yNy0zMjAuMDEgMzE5Ljk5em0xNTMuMDUtMjkuNzIgNTUuMTItNTUuMTMgMTExLjg0IDExMS44MiAxMTEuODItMTExLjgyIDU1LjEyIDU1LjEyLTE2Ni45NCAxNjYuOTd6Ii8+PC9kZWZzPjxwYXRoIGQ9Im0xNDcuNDkgMTU0LjJoMzUyLjR2MzA4LjloLTM1Mi40eiIgZmlsbD0iI2ZmZiIvPjx1c2UgZmlsbD0iIzJlMmUyZSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNhIi8+PC9zdmc+"
		},
		ステップアウト: {
			ease: "sn_BounceIn",
			dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjAuMDFjMCAxNzYuNzIgMTQzLjI3IDMxOS45OSAzMTkuOTkgMzE5Ljk5IDE3Ni43NCAwIDMyMC4wMS0xNDMuMjcgMzIwLjAxLTMxOS45OSAwLTE3Ni43NC0xNDMuMjctMzIwLjAxLTMyMC4wMS0zMjAuMDEtMTc2LjcyIDAtMzE5Ljk5IDE0My4yNy0zMTkuOTkgMzIwLjAxem0zMTkuOTktMjYuOTgtMTExLjgyIDExMS44My01NS4xMi01NS4xMyAxNjYuOTQtMTY2Ljk2IDE2Ni45NiAxNjYuOTYtNTUuMTIgNTUuMTN6Ii8+PC9kZWZzPjxwYXRoIGQ9Im0xNDcuNDkgMTU0LjJoMzUyLjR2MzA4LjloLTM1Mi40eiIgZmlsbD0iI2ZmZiIvPjx1c2UgZmlsbD0iIzJlMmUyZSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNhIi8+PC9zdmc+"
		}
	};
	pathBaseCnvSnPath4Dbg = "";
	fire;
	setFire(h) {
		this.fire = h;
	}
	#p = [];
	addHook(h) {
		this.#p.push(h);
	}
	callHook = (h, W) => {};
	send2Dbg = (h, W) => {
		this.#u?.emit("data", h, W);
	};
	copyBMFolder = (h, W) => {};
	eraseBMFolder = (h) => {};
	close = () => !1;
	_export = () => !1;
	_import = () => !1;
	navigate_to = () => !1;
	title = (h) => {
		let { text: W } = h;
		if (!W) throw "[title] textは必須です";
		return this.#m = W, this.titleSub(this.#m + this.#g), !1;
	};
	#m = "";
	titleSub(h) {}
	#h = (G) => {
		if (!G.key) return this.tglFlscr_sub().catch((W) => h.tglFlscr_HdrErr(W)), !1;
		let K = G.key.toLowerCase();
		return this.elc.add(document, EVNM_KEY, (W) => {
			h.modKey(W) + W.key.toLowerCase() === K && (W.stopPropagation(), this.tglFlscr_sub().catch((W) => h.tglFlscr_HdrErr(W)));
		}, { passive: !0 }), !1;
	};
	static tglFlscr_HdrErr(h) {
		h instanceof TypeError && console.error("フルスクリーン化でエラーです。ブラウザ環境でキー入力きっかけでないと発生します"), console.error(`fn:SysBase.ts tglFlscr ${String(h)}`);
	}
	static modKey(h) {
		return (h.altKey ? h.key === "Alt" ? "" : "alt+" : "") + (h.ctrlKey ? h.key === "Control" ? "" : "ctrl+" : "") + (h.metaKey ? h.key === "Meta" ? "" : "meta+" : "") + (h.shiftKey ? h.key === "Shift" ? "" : "shift+" : "");
	}
	async tglFlscr_sub() {}
	update_check = () => !1;
	window = () => !1;
	#g = "";
	setTitleInfo(h) {
		this.#g = h, this.titleSub(this.#m + this.#g);
	}
	#_ = () => Promise.resolve({
		ext_num: 0,
		ab: /* @__PURE__ */ new ArrayBuffer(0)
	});
	dec = (h, W) => Promise.resolve(W);
	async decAB(h) {
		let { ext_num: W, ab: G } = await this.#_(h), K = this.#v[W];
		return K?.fnc ? await K.fnc(G) : G;
	}
	#v = {
		1: {
			ext: "jpeg",
			fnc: (h) => this.#y(h, "image/jpeg")
		},
		2: {
			ext: "png",
			fnc: (h) => this.#y(h, "image/png")
		},
		3: {
			ext: "svg",
			fnc: (h) => this.#y(h, "image/svg+xml")
		},
		4: {
			ext: "webp",
			fnc: (h) => this.#y(h, "image/webp")
		},
		20: {
			ext: "mp4",
			fnc: (h) => this.#b(h, "video/mp4")
		},
		21: {
			ext: "webm",
			fnc: (h) => this.#b(h, "video/webm")
		},
		22: {
			ext: "ogv",
			fnc: (h) => this.#b(h, "video/ogv")
		}
	};
	#y = (h, W) => new Promise((G, K) => {
		let q = new Blob([h], { type: W }), J = new Image();
		J.onload = () => G(J), J.onerror = (h) => K(Error(h instanceof Event ? h.type : h)), J.src = URL.createObjectURL(q);
	});
	#b = (h, W) => new Promise((G, K) => {
		let q = new Blob([h], { type: W }), J = document.createElement("video");
		this.elc.add(J, "error", () => K(Error(J.error?.message ?? ""))), this.elc.add(J, "canplay", () => G(J)), J.src = URL.createObjectURL(q);
	});
	enc = async (h) => h;
	stk = () => "";
	hash = (h) => "";
	isApp = !1;
	$path_downloads = "";
	get path_downloads() {
		return this.$path_downloads;
	}
	$path_userdata = "";
	get path_userdata() {
		return this.$path_userdata;
	}
	capturePage(h, W, G, K) {}
	async savePic(h, W) {}
	async ensureFile(h) {}
	async appendFile(h, W) {}
	async outputFile(h, W) {}
};
export { SysBase as t };

//# sourceMappingURL=SysBase.js.map