import { t as __commonJSMin } from "./chunk.js";
import { l as argChk_Num, s as argChk_Boolean, t as CmnLib } from "./CmnLib.js";
import { n as SEARCH_PATH_ARG_EXT } from "./ConfigBase.js";
import { t as Reading } from "./Reading.js";
var require_howler = /* @__PURE__ */ __commonJSMin(((e) => {
	(function() {
		var n = function() {
			this.init();
		};
		n.prototype = {
			init: function() {
				var e = this || r;
				return e._counter = 1e3, e._html5AudioPool = [], e.html5PoolSize = 10, e._codecs = {}, e._howls = [], e._muted = !1, e._volume = 1, e._canPlayEvent = "canplaythrough", e._navigator = typeof window < "u" && window.navigator ? window.navigator : null, e.masterGain = null, e.noAudio = !1, e.usingWebAudio = !0, e.autoSuspend = !0, e.ctx = null, e.autoUnlock = !0, e._setup(), e;
			},
			volume: function(e) {
				var n = this || r;
				if (e = parseFloat(e), n.ctx || d(), e !== void 0 && e >= 0 && e <= 1) {
					if (n._volume = e, n._muted) return n;
					n.usingWebAudio && n.masterGain.gain.setValueAtTime(e, r.ctx.currentTime);
					for (var i = 0; i < n._howls.length; i++) if (!n._howls[i]._webAudio) for (var a = n._howls[i]._getSoundIds(), o = 0; o < a.length; o++) {
						var s = n._howls[i]._soundById(a[o]);
						s && s._node && (s._node.volume = s._volume * e);
					}
					return n;
				}
				return n._volume;
			},
			mute: function(e) {
				var n = this || r;
				n.ctx || d(), n._muted = e, n.usingWebAudio && n.masterGain.gain.setValueAtTime(e ? 0 : n._volume, r.ctx.currentTime);
				for (var i = 0; i < n._howls.length; i++) if (!n._howls[i]._webAudio) for (var a = n._howls[i]._getSoundIds(), o = 0; o < a.length; o++) {
					var s = n._howls[i]._soundById(a[o]);
					s && s._node && (s._node.muted = e ? !0 : s._muted);
				}
				return n;
			},
			stop: function() {
				for (var e = this || r, n = 0; n < e._howls.length; n++) e._howls[n].stop();
				return e;
			},
			unload: function() {
				for (var e = this || r, n = e._howls.length - 1; n >= 0; n--) e._howls[n].unload();
				return e.usingWebAudio && e.ctx && e.ctx.close !== void 0 && (e.ctx.close(), e.ctx = null, d()), e;
			},
			codecs: function(e) {
				return (this || r)._codecs[e.replace(/^x-/, "")];
			},
			_setup: function() {
				var e = this || r;
				if (e.state = e.ctx && e.ctx.state || "suspended", e._autoSuspend(), !e.usingWebAudio) if (typeof Audio < "u") try {
					var n = new Audio();
					n.oncanplaythrough === void 0 && (e._canPlayEvent = "canplay");
				} catch {
					e.noAudio = !0;
				}
				else e.noAudio = !0;
				try {
					var n = new Audio();
					n.muted && (e.noAudio = !0);
				} catch {}
				return e.noAudio || e._setupCodecs(), e;
			},
			_setupCodecs: function() {
				var e = this || r, n = null;
				try {
					n = typeof Audio < "u" ? new Audio() : null;
				} catch {
					return e;
				}
				if (!n || typeof n.canPlayType != "function") return e;
				var i = n.canPlayType("audio/mpeg;").replace(/^no$/, ""), a = e._navigator ? e._navigator.userAgent : "", o = a.match(/OPR\/(\d+)/g), s = o && parseInt(o[0].split("/")[1], 10) < 33, c = a.indexOf("Safari") !== -1 && a.indexOf("Chrome") === -1, l = a.match(/Version\/(.*?) /), u = c && l && parseInt(l[1], 10) < 15;
				return e._codecs = {
					mp3: !!(!s && (i || n.canPlayType("audio/mp3;").replace(/^no$/, ""))),
					mpeg: !!i,
					opus: !!n.canPlayType("audio/ogg; codecs=\"opus\"").replace(/^no$/, ""),
					ogg: !!n.canPlayType("audio/ogg; codecs=\"vorbis\"").replace(/^no$/, ""),
					oga: !!n.canPlayType("audio/ogg; codecs=\"vorbis\"").replace(/^no$/, ""),
					wav: !!(n.canPlayType("audio/wav; codecs=\"1\"") || n.canPlayType("audio/wav")).replace(/^no$/, ""),
					aac: !!n.canPlayType("audio/aac;").replace(/^no$/, ""),
					caf: !!n.canPlayType("audio/x-caf;").replace(/^no$/, ""),
					m4a: !!(n.canPlayType("audio/x-m4a;") || n.canPlayType("audio/m4a;") || n.canPlayType("audio/aac;")).replace(/^no$/, ""),
					m4b: !!(n.canPlayType("audio/x-m4b;") || n.canPlayType("audio/m4b;") || n.canPlayType("audio/aac;")).replace(/^no$/, ""),
					mp4: !!(n.canPlayType("audio/x-mp4;") || n.canPlayType("audio/mp4;") || n.canPlayType("audio/aac;")).replace(/^no$/, ""),
					weba: !!(!u && n.canPlayType("audio/webm; codecs=\"vorbis\"").replace(/^no$/, "")),
					webm: !!(!u && n.canPlayType("audio/webm; codecs=\"vorbis\"").replace(/^no$/, "")),
					dolby: !!n.canPlayType("audio/mp4; codecs=\"ec-3\"").replace(/^no$/, ""),
					flac: !!(n.canPlayType("audio/x-flac;") || n.canPlayType("audio/flac;")).replace(/^no$/, "")
				}, e;
			},
			_unlockAudio: function() {
				var e = this || r;
				if (!(e._audioUnlocked || !e.ctx)) {
					e._audioUnlocked = !1, e.autoUnlock = !1, !e._mobileUnloaded && e.ctx.sampleRate !== 44100 && (e._mobileUnloaded = !0, e.unload()), e._scratchBuffer = e.ctx.createBuffer(1, 1, 22050);
					var n = function(r) {
						for (; e._html5AudioPool.length < e.html5PoolSize;) try {
							var i = new Audio();
							i._unlocked = !0, e._releaseHtml5Audio(i);
						} catch {
							e.noAudio = !0;
							break;
						}
						for (var a = 0; a < e._howls.length; a++) if (!e._howls[a]._webAudio) for (var o = e._howls[a]._getSoundIds(), s = 0; s < o.length; s++) {
							var c = e._howls[a]._soundById(o[s]);
							c && c._node && !c._node._unlocked && (c._node._unlocked = !0, c._node.load());
						}
						e._autoResume();
						var l = e.ctx.createBufferSource();
						l.buffer = e._scratchBuffer, l.connect(e.ctx.destination), l.start === void 0 ? l.noteOn(0) : l.start(0), typeof e.ctx.resume == "function" && e.ctx.resume(), l.onended = function() {
							l.disconnect(0), e._audioUnlocked = !0, document.removeEventListener("touchstart", n, !0), document.removeEventListener("touchend", n, !0), document.removeEventListener("click", n, !0), document.removeEventListener("keydown", n, !0);
							for (var r = 0; r < e._howls.length; r++) e._howls[r]._emit("unlock");
						};
					};
					return document.addEventListener("touchstart", n, !0), document.addEventListener("touchend", n, !0), document.addEventListener("click", n, !0), document.addEventListener("keydown", n, !0), e;
				}
			},
			_obtainHtml5Audio: function() {
				var e = this || r;
				if (e._html5AudioPool.length) return e._html5AudioPool.pop();
				var n = new Audio().play();
				return n && typeof Promise < "u" && (n instanceof Promise || typeof n.then == "function") && n.catch(function() {
					console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.");
				}), new Audio();
			},
			_releaseHtml5Audio: function(e) {
				var n = this || r;
				return e._unlocked && n._html5AudioPool.push(e), n;
			},
			_autoSuspend: function() {
				var e = this;
				if (!(!e.autoSuspend || !e.ctx || e.ctx.suspend === void 0 || !r.usingWebAudio)) {
					for (var n = 0; n < e._howls.length; n++) if (e._howls[n]._webAudio) {
						for (var i = 0; i < e._howls[n]._sounds.length; i++) if (!e._howls[n]._sounds[i]._paused) return e;
					}
					return e._suspendTimer && clearTimeout(e._suspendTimer), e._suspendTimer = setTimeout(function() {
						if (e.autoSuspend) {
							e._suspendTimer = null, e.state = "suspending";
							var n = function() {
								e.state = "suspended", e._resumeAfterSuspend && (delete e._resumeAfterSuspend, e._autoResume());
							};
							e.ctx.suspend().then(n, n);
						}
					}, 3e4), e;
				}
			},
			_autoResume: function() {
				var e = this;
				if (!(!e.ctx || e.ctx.resume === void 0 || !r.usingWebAudio)) return e.state === "running" && e.ctx.state !== "interrupted" && e._suspendTimer ? (clearTimeout(e._suspendTimer), e._suspendTimer = null) : e.state === "suspended" || e.state === "running" && e.ctx.state === "interrupted" ? (e.ctx.resume().then(function() {
					e.state = "running";
					for (var n = 0; n < e._howls.length; n++) e._howls[n]._emit("resume");
				}), e._suspendTimer &&= (clearTimeout(e._suspendTimer), null)) : e.state === "suspending" && (e._resumeAfterSuspend = !0), e;
			}
		};
		var r = new n(), i = function(e) {
			var n = this;
			if (!e.src || e.src.length === 0) {
				console.error("An array of source files must be passed with any new Howl.");
				return;
			}
			n.init(e);
		};
		i.prototype = {
			init: function(e) {
				var n = this;
				return r.ctx || d(), n._autoplay = e.autoplay || !1, n._format = typeof e.format == "string" ? [e.format] : e.format, n._html5 = e.html5 || !1, n._muted = e.mute || !1, n._loop = e.loop || !1, n._pool = e.pool || 5, n._preload = typeof e.preload == "boolean" || e.preload === "metadata" ? e.preload : !0, n._rate = e.rate || 1, n._sprite = e.sprite || {}, n._src = typeof e.src == "string" ? [e.src] : e.src, n._volume = e.volume === void 0 ? 1 : e.volume, n._xhr = {
					method: e.xhr && e.xhr.method ? e.xhr.method : "GET",
					headers: e.xhr && e.xhr.headers ? e.xhr.headers : null,
					withCredentials: e.xhr && e.xhr.withCredentials ? e.xhr.withCredentials : !1
				}, n._duration = 0, n._state = "unloaded", n._sounds = [], n._endTimers = {}, n._queue = [], n._playLock = !1, n._onend = e.onend ? [{ fn: e.onend }] : [], n._onfade = e.onfade ? [{ fn: e.onfade }] : [], n._onload = e.onload ? [{ fn: e.onload }] : [], n._onloaderror = e.onloaderror ? [{ fn: e.onloaderror }] : [], n._onplayerror = e.onplayerror ? [{ fn: e.onplayerror }] : [], n._onpause = e.onpause ? [{ fn: e.onpause }] : [], n._onplay = e.onplay ? [{ fn: e.onplay }] : [], n._onstop = e.onstop ? [{ fn: e.onstop }] : [], n._onmute = e.onmute ? [{ fn: e.onmute }] : [], n._onvolume = e.onvolume ? [{ fn: e.onvolume }] : [], n._onrate = e.onrate ? [{ fn: e.onrate }] : [], n._onseek = e.onseek ? [{ fn: e.onseek }] : [], n._onunlock = e.onunlock ? [{ fn: e.onunlock }] : [], n._onresume = [], n._webAudio = r.usingWebAudio && !n._html5, r.ctx !== void 0 && r.ctx && r.autoUnlock && r._unlockAudio(), r._howls.push(n), n._autoplay && n._queue.push({
					event: "play",
					action: function() {
						n.play();
					}
				}), n._preload && n._preload !== "none" && n.load(), n;
			},
			load: function() {
				var e = this, n = null;
				if (r.noAudio) {
					e._emit("loaderror", null, "No audio support.");
					return;
				}
				typeof e._src == "string" && (e._src = [e._src]);
				for (var i = 0; i < e._src.length; i++) {
					var o, c;
					if (e._format && e._format[i]) o = e._format[i];
					else {
						if (c = e._src[i], typeof c != "string") {
							e._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
							continue;
						}
						o = /^data:audio\/([^;,]+);/i.exec(c), o ||= /\.([^.]+)$/.exec(c.split("?", 1)[0]), o &&= o[1].toLowerCase();
					}
					if (o || console.warn("No file extension was found. Consider using the \"format\" property or specify an extension."), o && r.codecs(o)) {
						n = e._src[i];
						break;
					}
				}
				if (!n) {
					e._emit("loaderror", null, "No codec support for selected audio sources.");
					return;
				}
				return e._src = n, e._state = "loading", window.location.protocol === "https:" && n.slice(0, 5) === "http:" && (e._html5 = !0, e._webAudio = !1), new a(e), e._webAudio && s(e), e;
			},
			play: function(e, n) {
				var i = this, a = null;
				if (typeof e == "number") a = e, e = null;
				else if (typeof e == "string" && i._state === "loaded" && !i._sprite[e]) return null;
				else if (e === void 0 && (e = "__default", !i._playLock)) {
					for (var o = 0, s = 0; s < i._sounds.length; s++) i._sounds[s]._paused && !i._sounds[s]._ended && (o++, a = i._sounds[s]._id);
					o === 1 ? e = null : a = null;
				}
				var c = a ? i._soundById(a) : i._inactiveSound();
				if (!c) return null;
				if (a && !e && (e = c._sprite || "__default"), i._state !== "loaded") {
					c._sprite = e, c._ended = !1;
					var l = c._id;
					return i._queue.push({
						event: "play",
						action: function() {
							i.play(l);
						}
					}), l;
				}
				if (a && !c._paused) return n || i._loadQueue("play"), c._id;
				i._webAudio && r._autoResume();
				var u = Math.max(0, c._seek > 0 ? c._seek : i._sprite[e][0] / 1e3), d = Math.max(0, (i._sprite[e][0] + i._sprite[e][1]) / 1e3 - u), f = d * 1e3 / Math.abs(c._rate), p = i._sprite[e][0] / 1e3, m = (i._sprite[e][0] + i._sprite[e][1]) / 1e3;
				c._sprite = e, c._ended = !1;
				var h = function() {
					c._paused = !1, c._seek = u, c._start = p, c._stop = m, c._loop = !!(c._loop || i._sprite[e][2]);
				};
				if (u >= m) {
					i._ended(c);
					return;
				}
				var g = c._node;
				if (i._webAudio) {
					var _ = function() {
						i._playLock = !1, h(), i._refreshBuffer(c);
						var e = c._muted || i._muted ? 0 : c._volume;
						g.gain.setValueAtTime(e, r.ctx.currentTime), c._playStart = r.ctx.currentTime, g.bufferSource.start === void 0 ? c._loop ? g.bufferSource.noteGrainOn(0, u, 86400) : g.bufferSource.noteGrainOn(0, u, d) : c._loop ? g.bufferSource.start(0, u, 86400) : g.bufferSource.start(0, u, d), f !== Infinity && (i._endTimers[c._id] = setTimeout(i._ended.bind(i, c), f)), n || setTimeout(function() {
							i._emit("play", c._id), i._loadQueue();
						}, 0);
					};
					r.state === "running" && r.ctx.state !== "interrupted" ? _() : (i._playLock = !0, i.once("resume", _), i._clearTimer(c._id));
				} else {
					var v = function() {
						g.currentTime = u, g.muted = c._muted || i._muted || r._muted || g.muted, g.volume = c._volume * r.volume(), g.playbackRate = c._rate;
						try {
							var a = g.play();
							if (a && typeof Promise < "u" && (a instanceof Promise || typeof a.then == "function") ? (i._playLock = !0, h(), a.then(function() {
								i._playLock = !1, g._unlocked = !0, n ? i._loadQueue() : i._emit("play", c._id);
							}).catch(function() {
								i._playLock = !1, i._emit("playerror", c._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."), c._ended = !0, c._paused = !0;
							})) : n || (i._playLock = !1, h(), i._emit("play", c._id)), g.playbackRate = c._rate, g.paused) {
								i._emit("playerror", c._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
								return;
							}
							e !== "__default" || c._loop ? i._endTimers[c._id] = setTimeout(i._ended.bind(i, c), f) : (i._endTimers[c._id] = function() {
								i._ended(c), g.removeEventListener("ended", i._endTimers[c._id], !1);
							}, g.addEventListener("ended", i._endTimers[c._id], !1));
						} catch (e) {
							i._emit("playerror", c._id, e);
						}
					};
					g.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" && (g.src = i._src, g.load());
					var y = window && window.ejecta || !g.readyState && r._navigator.isCocoonJS;
					if (g.readyState >= 3 || y) v();
					else {
						i._playLock = !0, i._state = "loading";
						var b = function() {
							i._state = "loaded", v(), g.removeEventListener(r._canPlayEvent, b, !1);
						};
						g.addEventListener(r._canPlayEvent, b, !1), i._clearTimer(c._id);
					}
				}
				return c._id;
			},
			pause: function(e) {
				var n = this;
				if (n._state !== "loaded" || n._playLock) return n._queue.push({
					event: "pause",
					action: function() {
						n.pause(e);
					}
				}), n;
				for (var r = n._getSoundIds(e), i = 0; i < r.length; i++) {
					n._clearTimer(r[i]);
					var a = n._soundById(r[i]);
					if (a && !a._paused && (a._seek = n.seek(r[i]), a._rateSeek = 0, a._paused = !0, n._stopFade(r[i]), a._node)) if (n._webAudio) {
						if (!a._node.bufferSource) continue;
						a._node.bufferSource.stop === void 0 ? a._node.bufferSource.noteOff(0) : a._node.bufferSource.stop(0), n._cleanBuffer(a._node);
					} else (!isNaN(a._node.duration) || a._node.duration === Infinity) && a._node.pause();
					arguments[1] || n._emit("pause", a ? a._id : null);
				}
				return n;
			},
			stop: function(e, n) {
				var r = this;
				if (r._state !== "loaded" || r._playLock) return r._queue.push({
					event: "stop",
					action: function() {
						r.stop(e);
					}
				}), r;
				for (var i = r._getSoundIds(e), a = 0; a < i.length; a++) {
					r._clearTimer(i[a]);
					var o = r._soundById(i[a]);
					o && (o._seek = o._start || 0, o._rateSeek = 0, o._paused = !0, o._ended = !0, r._stopFade(i[a]), o._node && (r._webAudio ? o._node.bufferSource && (o._node.bufferSource.stop === void 0 ? o._node.bufferSource.noteOff(0) : o._node.bufferSource.stop(0), r._cleanBuffer(o._node)) : (!isNaN(o._node.duration) || o._node.duration === Infinity) && (o._node.currentTime = o._start || 0, o._node.pause(), o._node.duration === Infinity && r._clearSound(o._node))), n || r._emit("stop", o._id));
				}
				return r;
			},
			mute: function(e, n) {
				var i = this;
				if (i._state !== "loaded" || i._playLock) return i._queue.push({
					event: "mute",
					action: function() {
						i.mute(e, n);
					}
				}), i;
				if (n === void 0) if (typeof e == "boolean") i._muted = e;
				else return i._muted;
				for (var a = i._getSoundIds(n), o = 0; o < a.length; o++) {
					var s = i._soundById(a[o]);
					s && (s._muted = e, s._interval && i._stopFade(s._id), i._webAudio && s._node ? s._node.gain.setValueAtTime(e ? 0 : s._volume, r.ctx.currentTime) : s._node && (s._node.muted = r._muted ? !0 : e), i._emit("mute", s._id));
				}
				return i;
			},
			volume: function() {
				var e = this, n = arguments, i, a;
				if (n.length === 0) return e._volume;
				n.length === 1 || n.length === 2 && n[1] === void 0 ? e._getSoundIds().indexOf(n[0]) >= 0 ? a = parseInt(n[0], 10) : i = parseFloat(n[0]) : n.length >= 2 && (i = parseFloat(n[0]), a = parseInt(n[1], 10));
				var o;
				if (i !== void 0 && i >= 0 && i <= 1) {
					if (e._state !== "loaded" || e._playLock) return e._queue.push({
						event: "volume",
						action: function() {
							e.volume.apply(e, n);
						}
					}), e;
					a === void 0 && (e._volume = i), a = e._getSoundIds(a);
					for (var s = 0; s < a.length; s++) o = e._soundById(a[s]), o && (o._volume = i, n[2] || e._stopFade(a[s]), e._webAudio && o._node && !o._muted ? o._node.gain.setValueAtTime(i, r.ctx.currentTime) : o._node && !o._muted && (o._node.volume = i * r.volume()), e._emit("volume", o._id));
				} else return o = a ? e._soundById(a) : e._sounds[0], o ? o._volume : 0;
				return e;
			},
			fade: function(e, n, i, a) {
				var o = this;
				if (o._state !== "loaded" || o._playLock) return o._queue.push({
					event: "fade",
					action: function() {
						o.fade(e, n, i, a);
					}
				}), o;
				e = Math.min(Math.max(0, parseFloat(e)), 1), n = Math.min(Math.max(0, parseFloat(n)), 1), i = parseFloat(i), o.volume(e, a);
				for (var s = o._getSoundIds(a), c = 0; c < s.length; c++) {
					var l = o._soundById(s[c]);
					if (l) {
						if (a || o._stopFade(s[c]), o._webAudio && !l._muted) {
							var u = r.ctx.currentTime, d = u + i / 1e3;
							l._volume = e, l._node.gain.setValueAtTime(e, u), l._node.gain.linearRampToValueAtTime(n, d);
						}
						o._startFadeInterval(l, e, n, i, s[c], a === void 0);
					}
				}
				return o;
			},
			_startFadeInterval: function(e, n, r, i, a, o) {
				var s = this, c = n, l = r - n, u = Math.abs(l / .01), d = Math.max(4, u > 0 ? i / u : i), f = Date.now();
				e._fadeTo = r, e._interval = setInterval(function() {
					var a = (Date.now() - f) / i;
					f = Date.now(), c += l * a, c = Math.round(c * 100) / 100, c = l < 0 ? Math.max(r, c) : Math.min(r, c), s._webAudio ? e._volume = c : s.volume(c, e._id, !0), o && (s._volume = c), (r < n && c <= r || r > n && c >= r) && (clearInterval(e._interval), e._interval = null, e._fadeTo = null, s.volume(r, e._id), s._emit("fade", e._id));
				}, d);
			},
			_stopFade: function(e) {
				var n = this, i = n._soundById(e);
				return i && i._interval && (n._webAudio && i._node.gain.cancelScheduledValues(r.ctx.currentTime), clearInterval(i._interval), i._interval = null, n.volume(i._fadeTo, e), i._fadeTo = null, n._emit("fade", e)), n;
			},
			loop: function() {
				var e = this, n = arguments, r, i, a;
				if (n.length === 0) return e._loop;
				if (n.length === 1) if (typeof n[0] == "boolean") r = n[0], e._loop = r;
				else return a = e._soundById(parseInt(n[0], 10)), a ? a._loop : !1;
				else n.length === 2 && (r = n[0], i = parseInt(n[1], 10));
				for (var o = e._getSoundIds(i), s = 0; s < o.length; s++) a = e._soundById(o[s]), a && (a._loop = r, e._webAudio && a._node && a._node.bufferSource && (a._node.bufferSource.loop = r, r && (a._node.bufferSource.loopStart = a._start || 0, a._node.bufferSource.loopEnd = a._stop, e.playing(o[s]) && (e.pause(o[s], !0), e.play(o[s], !0)))));
				return e;
			},
			rate: function() {
				var e = this, n = arguments, i, a;
				n.length === 0 ? a = e._sounds[0]._id : n.length === 1 ? e._getSoundIds().indexOf(n[0]) >= 0 ? a = parseInt(n[0], 10) : i = parseFloat(n[0]) : n.length === 2 && (i = parseFloat(n[0]), a = parseInt(n[1], 10));
				var o;
				if (typeof i == "number") {
					if (e._state !== "loaded" || e._playLock) return e._queue.push({
						event: "rate",
						action: function() {
							e.rate.apply(e, n);
						}
					}), e;
					a === void 0 && (e._rate = i), a = e._getSoundIds(a);
					for (var s = 0; s < a.length; s++) if (o = e._soundById(a[s]), o) {
						e.playing(a[s]) && (o._rateSeek = e.seek(a[s]), o._playStart = e._webAudio ? r.ctx.currentTime : o._playStart), o._rate = i, e._webAudio && o._node && o._node.bufferSource ? o._node.bufferSource.playbackRate.setValueAtTime(i, r.ctx.currentTime) : o._node && (o._node.playbackRate = i);
						var c = e.seek(a[s]), l = ((e._sprite[o._sprite][0] + e._sprite[o._sprite][1]) / 1e3 - c) * 1e3 / Math.abs(o._rate);
						(e._endTimers[a[s]] || !o._paused) && (e._clearTimer(a[s]), e._endTimers[a[s]] = setTimeout(e._ended.bind(e, o), l)), e._emit("rate", o._id);
					}
				} else return o = e._soundById(a), o ? o._rate : e._rate;
				return e;
			},
			seek: function() {
				var e = this, n = arguments, i, a;
				if (n.length === 0 ? e._sounds.length && (a = e._sounds[0]._id) : n.length === 1 ? e._getSoundIds().indexOf(n[0]) >= 0 ? a = parseInt(n[0], 10) : e._sounds.length && (a = e._sounds[0]._id, i = parseFloat(n[0])) : n.length === 2 && (i = parseFloat(n[0]), a = parseInt(n[1], 10)), a === void 0) return 0;
				if (typeof i == "number" && (e._state !== "loaded" || e._playLock)) return e._queue.push({
					event: "seek",
					action: function() {
						e.seek.apply(e, n);
					}
				}), e;
				var o = e._soundById(a);
				if (o) if (typeof i == "number" && i >= 0) {
					var s = e.playing(a);
					s && e.pause(a, !0), o._seek = i, o._ended = !1, e._clearTimer(a), !e._webAudio && o._node && !isNaN(o._node.duration) && (o._node.currentTime = i);
					var c = function() {
						s && e.play(a, !0), e._emit("seek", a);
					};
					if (s && !e._webAudio) {
						var l = function() {
							e._playLock ? setTimeout(l, 0) : c();
						};
						setTimeout(l, 0);
					} else c();
				} else if (e._webAudio) {
					var u = e.playing(a) ? r.ctx.currentTime - o._playStart : 0, d = o._rateSeek ? o._rateSeek - o._seek : 0;
					return o._seek + (d + u * Math.abs(o._rate));
				} else return o._node.currentTime;
				return e;
			},
			playing: function(e) {
				var n = this;
				if (typeof e == "number") {
					var r = n._soundById(e);
					return r ? !r._paused : !1;
				}
				for (var i = 0; i < n._sounds.length; i++) if (!n._sounds[i]._paused) return !0;
				return !1;
			},
			duration: function(e) {
				var n = this, r = n._duration, i = n._soundById(e);
				return i && (r = n._sprite[i._sprite][1] / 1e3), r;
			},
			state: function() {
				return this._state;
			},
			unload: function() {
				for (var e = this, n = e._sounds, i = 0; i < n.length; i++) n[i]._paused || e.stop(n[i]._id), e._webAudio || (e._clearSound(n[i]._node), n[i]._node.removeEventListener("error", n[i]._errorFn, !1), n[i]._node.removeEventListener(r._canPlayEvent, n[i]._loadFn, !1), n[i]._node.removeEventListener("ended", n[i]._endFn, !1), r._releaseHtml5Audio(n[i]._node)), delete n[i]._node, e._clearTimer(n[i]._id);
				var a = r._howls.indexOf(e);
				a >= 0 && r._howls.splice(a, 1);
				var s = !0;
				for (i = 0; i < r._howls.length; i++) if (r._howls[i]._src === e._src || e._src.indexOf(r._howls[i]._src) >= 0) {
					s = !1;
					break;
				}
				return o && s && delete o[e._src], r.noAudio = !1, e._state = "unloaded", e._sounds = [], e = null, null;
			},
			on: function(e, n, r, i) {
				var a = this, o = a["_on" + e];
				return typeof n == "function" && o.push(i ? {
					id: r,
					fn: n,
					once: i
				} : {
					id: r,
					fn: n
				}), a;
			},
			off: function(e, n, r) {
				var i = this, a = i["_on" + e], o = 0;
				if (typeof n == "number" && (r = n, n = null), n || r) for (o = 0; o < a.length; o++) {
					var s = r === a[o].id;
					if (n === a[o].fn && s || !n && s) {
						a.splice(o, 1);
						break;
					}
				}
				else if (e) i["_on" + e] = [];
				else {
					var c = Object.keys(i);
					for (o = 0; o < c.length; o++) c[o].indexOf("_on") === 0 && Array.isArray(i[c[o]]) && (i[c[o]] = []);
				}
				return i;
			},
			once: function(e, n, r) {
				var i = this;
				return i.on(e, n, r, 1), i;
			},
			_emit: function(e, n, r) {
				for (var i = this, a = i["_on" + e], o = a.length - 1; o >= 0; o--) (!a[o].id || a[o].id === n || e === "load") && (setTimeout(function(e) {
					e.call(this, n, r);
				}.bind(i, a[o].fn), 0), a[o].once && i.off(e, a[o].fn, a[o].id));
				return i._loadQueue(e), i;
			},
			_loadQueue: function(e) {
				var n = this;
				if (n._queue.length > 0) {
					var r = n._queue[0];
					r.event === e && (n._queue.shift(), n._loadQueue()), e || r.action();
				}
				return n;
			},
			_ended: function(e) {
				var n = this, i = e._sprite;
				if (!n._webAudio && e._node && !e._node.paused && !e._node.ended && e._node.currentTime < e._stop) return setTimeout(n._ended.bind(n, e), 100), n;
				var a = !!(e._loop || n._sprite[i][2]);
				if (n._emit("end", e._id), !n._webAudio && a && n.stop(e._id, !0).play(e._id), n._webAudio && a) {
					n._emit("play", e._id), e._seek = e._start || 0, e._rateSeek = 0, e._playStart = r.ctx.currentTime;
					var o = (e._stop - e._start) * 1e3 / Math.abs(e._rate);
					n._endTimers[e._id] = setTimeout(n._ended.bind(n, e), o);
				}
				return n._webAudio && !a && (e._paused = !0, e._ended = !0, e._seek = e._start || 0, e._rateSeek = 0, n._clearTimer(e._id), n._cleanBuffer(e._node), r._autoSuspend()), !n._webAudio && !a && n.stop(e._id, !0), n;
			},
			_clearTimer: function(e) {
				var n = this;
				if (n._endTimers[e]) {
					if (typeof n._endTimers[e] != "function") clearTimeout(n._endTimers[e]);
					else {
						var r = n._soundById(e);
						r && r._node && r._node.removeEventListener("ended", n._endTimers[e], !1);
					}
					delete n._endTimers[e];
				}
				return n;
			},
			_soundById: function(e) {
				for (var n = this, r = 0; r < n._sounds.length; r++) if (e === n._sounds[r]._id) return n._sounds[r];
				return null;
			},
			_inactiveSound: function() {
				var e = this;
				e._drain();
				for (var n = 0; n < e._sounds.length; n++) if (e._sounds[n]._ended) return e._sounds[n].reset();
				return new a(e);
			},
			_drain: function() {
				var e = this, n = e._pool, r = 0, i = 0;
				if (!(e._sounds.length < n)) {
					for (i = 0; i < e._sounds.length; i++) e._sounds[i]._ended && r++;
					for (i = e._sounds.length - 1; i >= 0; i--) {
						if (r <= n) return;
						e._sounds[i]._ended && (e._webAudio && e._sounds[i]._node && e._sounds[i]._node.disconnect(0), e._sounds.splice(i, 1), r--);
					}
				}
			},
			_getSoundIds: function(e) {
				var n = this;
				if (e === void 0) {
					for (var r = [], i = 0; i < n._sounds.length; i++) r.push(n._sounds[i]._id);
					return r;
				} else return [e];
			},
			_refreshBuffer: function(e) {
				var n = this;
				return e._node.bufferSource = r.ctx.createBufferSource(), e._node.bufferSource.buffer = o[n._src], e._panner ? e._node.bufferSource.connect(e._panner) : e._node.bufferSource.connect(e._node), e._node.bufferSource.loop = e._loop, e._loop && (e._node.bufferSource.loopStart = e._start || 0, e._node.bufferSource.loopEnd = e._stop || 0), e._node.bufferSource.playbackRate.setValueAtTime(e._rate, r.ctx.currentTime), n;
			},
			_cleanBuffer: function(e) {
				var n = this, i = r._navigator && r._navigator.vendor.indexOf("Apple") >= 0;
				if (!e.bufferSource) return n;
				if (r._scratchBuffer && e.bufferSource && (e.bufferSource.onended = null, e.bufferSource.disconnect(0), i)) try {
					e.bufferSource.buffer = r._scratchBuffer;
				} catch {}
				return e.bufferSource = null, n;
			},
			_clearSound: function(e) {
				/MSIE |Trident\//.test(r._navigator && r._navigator.userAgent) || (e.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA");
			}
		};
		var a = function(e) {
			this._parent = e, this.init();
		};
		a.prototype = {
			init: function() {
				var e = this, n = e._parent;
				return e._muted = n._muted, e._loop = n._loop, e._volume = n._volume, e._rate = n._rate, e._seek = 0, e._paused = !0, e._ended = !0, e._sprite = "__default", e._id = ++r._counter, n._sounds.push(e), e.create(), e;
			},
			create: function() {
				var e = this, n = e._parent, i = r._muted || e._muted || e._parent._muted ? 0 : e._volume;
				return n._webAudio ? (e._node = r.ctx.createGain === void 0 ? r.ctx.createGainNode() : r.ctx.createGain(), e._node.gain.setValueAtTime(i, r.ctx.currentTime), e._node.paused = !0, e._node.connect(r.masterGain)) : r.noAudio || (e._node = r._obtainHtml5Audio(), e._errorFn = e._errorListener.bind(e), e._node.addEventListener("error", e._errorFn, !1), e._loadFn = e._loadListener.bind(e), e._node.addEventListener(r._canPlayEvent, e._loadFn, !1), e._endFn = e._endListener.bind(e), e._node.addEventListener("ended", e._endFn, !1), e._node.src = n._src, e._node.preload = n._preload === !0 ? "auto" : n._preload, e._node.volume = i * r.volume(), e._node.load()), e;
			},
			reset: function() {
				var e = this, n = e._parent;
				return e._muted = n._muted, e._loop = n._loop, e._volume = n._volume, e._rate = n._rate, e._seek = 0, e._rateSeek = 0, e._paused = !0, e._ended = !0, e._sprite = "__default", e._id = ++r._counter, e;
			},
			_errorListener: function() {
				var e = this;
				e._parent._emit("loaderror", e._id, e._node.error ? e._node.error.code : 0), e._node.removeEventListener("error", e._errorFn, !1);
			},
			_loadListener: function() {
				var e = this, n = e._parent;
				n._duration = Math.ceil(e._node.duration * 10) / 10, Object.keys(n._sprite).length === 0 && (n._sprite = { __default: [0, n._duration * 1e3] }), n._state !== "loaded" && (n._state = "loaded", n._emit("load"), n._loadQueue()), e._node.removeEventListener(r._canPlayEvent, e._loadFn, !1);
			},
			_endListener: function() {
				var e = this, n = e._parent;
				n._duration === Infinity && (n._duration = Math.ceil(e._node.duration * 10) / 10, n._sprite.__default[1] === Infinity && (n._sprite.__default[1] = n._duration * 1e3), n._ended(e)), e._node.removeEventListener("ended", e._endFn, !1);
			}
		};
		var o = {}, s = function(e) {
			var n = e._src;
			if (o[n]) {
				e._duration = o[n].duration, u(e);
				return;
			}
			if (/^data:[^;]+;base64,/.test(n)) {
				for (var r = atob(n.split(",")[1]), i = new Uint8Array(r.length), a = 0; a < r.length; ++a) i[a] = r.charCodeAt(a);
				l(i.buffer, e);
			} else {
				var s = new XMLHttpRequest();
				s.open(e._xhr.method, n, !0), s.withCredentials = e._xhr.withCredentials, s.responseType = "arraybuffer", e._xhr.headers && Object.keys(e._xhr.headers).forEach(function(n) {
					s.setRequestHeader(n, e._xhr.headers[n]);
				}), s.onload = function() {
					var n = (s.status + "")[0];
					if (n !== "0" && n !== "2" && n !== "3") {
						e._emit("loaderror", null, "Failed loading audio file with status: " + s.status + ".");
						return;
					}
					l(s.response, e);
				}, s.onerror = function() {
					e._webAudio && (e._html5 = !0, e._webAudio = !1, e._sounds = [], delete o[n], e.load());
				}, c(s);
			}
		}, c = function(e) {
			try {
				e.send();
			} catch {
				e.onerror();
			}
		}, l = function(e, n) {
			var i = function() {
				n._emit("loaderror", null, "Decoding audio data failed.");
			}, a = function(e) {
				e && n._sounds.length > 0 ? (o[n._src] = e, u(n, e)) : i();
			};
			typeof Promise < "u" && r.ctx.decodeAudioData.length === 1 ? r.ctx.decodeAudioData(e).then(a).catch(i) : r.ctx.decodeAudioData(e, a, i);
		}, u = function(e, n) {
			n && !e._duration && (e._duration = n.duration), Object.keys(e._sprite).length === 0 && (e._sprite = { __default: [0, e._duration * 1e3] }), e._state !== "loaded" && (e._state = "loaded", e._emit("load"), e._loadQueue());
		}, d = function() {
			if (r.usingWebAudio) {
				try {
					typeof AudioContext < "u" ? r.ctx = new AudioContext() : typeof webkitAudioContext < "u" ? r.ctx = new webkitAudioContext() : r.usingWebAudio = !1;
				} catch {
					r.usingWebAudio = !1;
				}
				r.ctx || (r.usingWebAudio = !1);
				var e = /iP(hone|od|ad)/.test(r._navigator && r._navigator.platform), n = r._navigator && r._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), i = n ? parseInt(n[1], 10) : null;
				if (e && i && i < 9) {
					var a = /safari/.test(r._navigator && r._navigator.userAgent.toLowerCase());
					r._navigator && !a && (r.usingWebAudio = !1);
				}
				r.usingWebAudio && (r.masterGain = r.ctx.createGain === void 0 ? r.ctx.createGainNode() : r.ctx.createGain(), r.masterGain.gain.setValueAtTime(r._muted ? 0 : r._volume, r.ctx.currentTime), r.masterGain.connect(r.ctx.destination)), r._setup();
			}
		};
		typeof define == "function" && define.amd && define([], function() {
			return {
				Howler: r,
				Howl: i
			};
		}), e !== void 0 && (e.Howler = r, e.Howl = i), typeof global < "u" ? (global.HowlerGlobal = n, global.Howler = r, global.Howl = i, global.Sound = a) : typeof window < "u" && (window.HowlerGlobal = n, window.Howler = r, window.Howl = i, window.Sound = a);
	})(), (function() {
		HowlerGlobal.prototype._pos = [
			0,
			0,
			0
		], HowlerGlobal.prototype._orientation = [
			0,
			0,
			-1,
			0,
			1,
			0
		], HowlerGlobal.prototype.stereo = function(e) {
			var n = this;
			if (!n.ctx || !n.ctx.listener) return n;
			for (var r = n._howls.length - 1; r >= 0; r--) n._howls[r].stereo(e);
			return n;
		}, HowlerGlobal.prototype.pos = function(e, n, r) {
			var i = this;
			if (!i.ctx || !i.ctx.listener) return i;
			if (n = typeof n == "number" ? n : i._pos[1], r = typeof r == "number" ? r : i._pos[2], typeof e == "number") i._pos = [
				e,
				n,
				r
			], i.ctx.listener.positionX === void 0 ? i.ctx.listener.setPosition(i._pos[0], i._pos[1], i._pos[2]) : (i.ctx.listener.positionX.setTargetAtTime(i._pos[0], Howler.ctx.currentTime, .1), i.ctx.listener.positionY.setTargetAtTime(i._pos[1], Howler.ctx.currentTime, .1), i.ctx.listener.positionZ.setTargetAtTime(i._pos[2], Howler.ctx.currentTime, .1));
			else return i._pos;
			return i;
		}, HowlerGlobal.prototype.orientation = function(e, n, r, i, a, o) {
			var s = this;
			if (!s.ctx || !s.ctx.listener) return s;
			var c = s._orientation;
			if (n = typeof n == "number" ? n : c[1], r = typeof r == "number" ? r : c[2], i = typeof i == "number" ? i : c[3], a = typeof a == "number" ? a : c[4], o = typeof o == "number" ? o : c[5], typeof e == "number") s._orientation = [
				e,
				n,
				r,
				i,
				a,
				o
			], s.ctx.listener.forwardX === void 0 ? s.ctx.listener.setOrientation(e, n, r, i, a, o) : (s.ctx.listener.forwardX.setTargetAtTime(e, Howler.ctx.currentTime, .1), s.ctx.listener.forwardY.setTargetAtTime(n, Howler.ctx.currentTime, .1), s.ctx.listener.forwardZ.setTargetAtTime(r, Howler.ctx.currentTime, .1), s.ctx.listener.upX.setTargetAtTime(i, Howler.ctx.currentTime, .1), s.ctx.listener.upY.setTargetAtTime(a, Howler.ctx.currentTime, .1), s.ctx.listener.upZ.setTargetAtTime(o, Howler.ctx.currentTime, .1));
			else return c;
			return s;
		}, Howl.prototype.init = (function(e) {
			return function(n) {
				var r = this;
				return r._orientation = n.orientation || [
					1,
					0,
					0
				], r._stereo = n.stereo || null, r._pos = n.pos || null, r._pannerAttr = {
					coneInnerAngle: n.coneInnerAngle === void 0 ? 360 : n.coneInnerAngle,
					coneOuterAngle: n.coneOuterAngle === void 0 ? 360 : n.coneOuterAngle,
					coneOuterGain: n.coneOuterGain === void 0 ? 0 : n.coneOuterGain,
					distanceModel: n.distanceModel === void 0 ? "inverse" : n.distanceModel,
					maxDistance: n.maxDistance === void 0 ? 1e4 : n.maxDistance,
					panningModel: n.panningModel === void 0 ? "HRTF" : n.panningModel,
					refDistance: n.refDistance === void 0 ? 1 : n.refDistance,
					rolloffFactor: n.rolloffFactor === void 0 ? 1 : n.rolloffFactor
				}, r._onstereo = n.onstereo ? [{ fn: n.onstereo }] : [], r._onpos = n.onpos ? [{ fn: n.onpos }] : [], r._onorientation = n.onorientation ? [{ fn: n.onorientation }] : [], e.call(this, n);
			};
		})(Howl.prototype.init), Howl.prototype.stereo = function(n, r) {
			var i = this;
			if (!i._webAudio) return i;
			if (i._state !== "loaded") return i._queue.push({
				event: "stereo",
				action: function() {
					i.stereo(n, r);
				}
			}), i;
			var a = Howler.ctx.createStereoPanner === void 0 ? "spatial" : "stereo";
			if (r === void 0) if (typeof n == "number") i._stereo = n, i._pos = [
				n,
				0,
				0
			];
			else return i._stereo;
			for (var o = i._getSoundIds(r), s = 0; s < o.length; s++) {
				var c = i._soundById(o[s]);
				if (c) if (typeof n == "number") c._stereo = n, c._pos = [
					n,
					0,
					0
				], c._node && (c._pannerAttr.panningModel = "equalpower", (!c._panner || !c._panner.pan) && e(c, a), a === "spatial" ? c._panner.positionX === void 0 ? c._panner.setPosition(n, 0, 0) : (c._panner.positionX.setValueAtTime(n, Howler.ctx.currentTime), c._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime), c._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime)) : c._panner.pan.setValueAtTime(n, Howler.ctx.currentTime)), i._emit("stereo", c._id);
				else return c._stereo;
			}
			return i;
		}, Howl.prototype.pos = function(n, r, i, a) {
			var o = this;
			if (!o._webAudio) return o;
			if (o._state !== "loaded") return o._queue.push({
				event: "pos",
				action: function() {
					o.pos(n, r, i, a);
				}
			}), o;
			if (r = typeof r == "number" ? r : 0, i = typeof i == "number" ? i : -.5, a === void 0) if (typeof n == "number") o._pos = [
				n,
				r,
				i
			];
			else return o._pos;
			for (var s = o._getSoundIds(a), c = 0; c < s.length; c++) {
				var l = o._soundById(s[c]);
				if (l) if (typeof n == "number") l._pos = [
					n,
					r,
					i
				], l._node && ((!l._panner || l._panner.pan) && e(l, "spatial"), l._panner.positionX === void 0 ? l._panner.setPosition(n, r, i) : (l._panner.positionX.setValueAtTime(n, Howler.ctx.currentTime), l._panner.positionY.setValueAtTime(r, Howler.ctx.currentTime), l._panner.positionZ.setValueAtTime(i, Howler.ctx.currentTime))), o._emit("pos", l._id);
				else return l._pos;
			}
			return o;
		}, Howl.prototype.orientation = function(n, r, i, a) {
			var o = this;
			if (!o._webAudio) return o;
			if (o._state !== "loaded") return o._queue.push({
				event: "orientation",
				action: function() {
					o.orientation(n, r, i, a);
				}
			}), o;
			if (r = typeof r == "number" ? r : o._orientation[1], i = typeof i == "number" ? i : o._orientation[2], a === void 0) if (typeof n == "number") o._orientation = [
				n,
				r,
				i
			];
			else return o._orientation;
			for (var s = o._getSoundIds(a), c = 0; c < s.length; c++) {
				var l = o._soundById(s[c]);
				if (l) if (typeof n == "number") l._orientation = [
					n,
					r,
					i
				], l._node && (l._panner || (l._pos ||= o._pos || [
					0,
					0,
					-.5
				], e(l, "spatial")), l._panner.orientationX === void 0 ? l._panner.setOrientation(n, r, i) : (l._panner.orientationX.setValueAtTime(n, Howler.ctx.currentTime), l._panner.orientationY.setValueAtTime(r, Howler.ctx.currentTime), l._panner.orientationZ.setValueAtTime(i, Howler.ctx.currentTime))), o._emit("orientation", l._id);
				else return l._orientation;
			}
			return o;
		}, Howl.prototype.pannerAttr = function() {
			var n = this, r = arguments, i, a, o;
			if (!n._webAudio) return n;
			if (r.length === 0) return n._pannerAttr;
			if (r.length === 1) if (typeof r[0] == "object") i = r[0], a === void 0 && (i.pannerAttr ||= {
				coneInnerAngle: i.coneInnerAngle,
				coneOuterAngle: i.coneOuterAngle,
				coneOuterGain: i.coneOuterGain,
				distanceModel: i.distanceModel,
				maxDistance: i.maxDistance,
				refDistance: i.refDistance,
				rolloffFactor: i.rolloffFactor,
				panningModel: i.panningModel
			}, n._pannerAttr = {
				coneInnerAngle: i.pannerAttr.coneInnerAngle === void 0 ? n._coneInnerAngle : i.pannerAttr.coneInnerAngle,
				coneOuterAngle: i.pannerAttr.coneOuterAngle === void 0 ? n._coneOuterAngle : i.pannerAttr.coneOuterAngle,
				coneOuterGain: i.pannerAttr.coneOuterGain === void 0 ? n._coneOuterGain : i.pannerAttr.coneOuterGain,
				distanceModel: i.pannerAttr.distanceModel === void 0 ? n._distanceModel : i.pannerAttr.distanceModel,
				maxDistance: i.pannerAttr.maxDistance === void 0 ? n._maxDistance : i.pannerAttr.maxDistance,
				refDistance: i.pannerAttr.refDistance === void 0 ? n._refDistance : i.pannerAttr.refDistance,
				rolloffFactor: i.pannerAttr.rolloffFactor === void 0 ? n._rolloffFactor : i.pannerAttr.rolloffFactor,
				panningModel: i.pannerAttr.panningModel === void 0 ? n._panningModel : i.pannerAttr.panningModel
			});
			else return o = n._soundById(parseInt(r[0], 10)), o ? o._pannerAttr : n._pannerAttr;
			else r.length === 2 && (i = r[0], a = parseInt(r[1], 10));
			for (var s = n._getSoundIds(a), c = 0; c < s.length; c++) if (o = n._soundById(s[c]), o) {
				var l = o._pannerAttr;
				l = {
					coneInnerAngle: i.coneInnerAngle === void 0 ? l.coneInnerAngle : i.coneInnerAngle,
					coneOuterAngle: i.coneOuterAngle === void 0 ? l.coneOuterAngle : i.coneOuterAngle,
					coneOuterGain: i.coneOuterGain === void 0 ? l.coneOuterGain : i.coneOuterGain,
					distanceModel: i.distanceModel === void 0 ? l.distanceModel : i.distanceModel,
					maxDistance: i.maxDistance === void 0 ? l.maxDistance : i.maxDistance,
					refDistance: i.refDistance === void 0 ? l.refDistance : i.refDistance,
					rolloffFactor: i.rolloffFactor === void 0 ? l.rolloffFactor : i.rolloffFactor,
					panningModel: i.panningModel === void 0 ? l.panningModel : i.panningModel
				};
				var u = o._panner;
				u ||= (o._pos ||= n._pos || [
					0,
					0,
					-.5
				], e(o, "spatial"), o._panner), u.coneInnerAngle = l.coneInnerAngle, u.coneOuterAngle = l.coneOuterAngle, u.coneOuterGain = l.coneOuterGain, u.distanceModel = l.distanceModel, u.maxDistance = l.maxDistance, u.refDistance = l.refDistance, u.rolloffFactor = l.rolloffFactor, u.panningModel = l.panningModel;
			}
			return n;
		}, Sound.prototype.init = (function(e) {
			return function() {
				var n = this, r = n._parent;
				n._orientation = r._orientation, n._stereo = r._stereo, n._pos = r._pos, n._pannerAttr = r._pannerAttr, e.call(this), n._stereo ? r.stereo(n._stereo) : n._pos && r.pos(n._pos[0], n._pos[1], n._pos[2], n._id);
			};
		})(Sound.prototype.init), Sound.prototype.reset = (function(e) {
			return function() {
				var n = this, r = n._parent;
				return n._orientation = r._orientation, n._stereo = r._stereo, n._pos = r._pos, n._pannerAttr = r._pannerAttr, n._stereo ? r.stereo(n._stereo) : n._pos ? r.pos(n._pos[0], n._pos[1], n._pos[2], n._id) : n._panner && (n._panner.disconnect(0), n._panner = void 0, r._refreshBuffer(n)), e.call(this);
			};
		})(Sound.prototype.reset);
		var e = function(e, n) {
			n ||= "spatial", n === "spatial" ? (e._panner = Howler.ctx.createPanner(), e._panner.coneInnerAngle = e._pannerAttr.coneInnerAngle, e._panner.coneOuterAngle = e._pannerAttr.coneOuterAngle, e._panner.coneOuterGain = e._pannerAttr.coneOuterGain, e._panner.distanceModel = e._pannerAttr.distanceModel, e._panner.maxDistance = e._pannerAttr.maxDistance, e._panner.refDistance = e._pannerAttr.refDistance, e._panner.rolloffFactor = e._pannerAttr.rolloffFactor, e._panner.panningModel = e._pannerAttr.panningModel, e._panner.positionX === void 0 ? e._panner.setPosition(e._pos[0], e._pos[1], e._pos[2]) : (e._panner.positionX.setValueAtTime(e._pos[0], Howler.ctx.currentTime), e._panner.positionY.setValueAtTime(e._pos[1], Howler.ctx.currentTime), e._panner.positionZ.setValueAtTime(e._pos[2], Howler.ctx.currentTime)), e._panner.orientationX === void 0 ? e._panner.setOrientation(e._orientation[0], e._orientation[1], e._orientation[2]) : (e._panner.orientationX.setValueAtTime(e._orientation[0], Howler.ctx.currentTime), e._panner.orientationY.setValueAtTime(e._orientation[1], Howler.ctx.currentTime), e._panner.orientationZ.setValueAtTime(e._orientation[2], Howler.ctx.currentTime))) : (e._panner = Howler.ctx.createStereoPanner(), e._panner.pan.setValueAtTime(e._stereo, Howler.ctx.currentTime)), e._panner.connect(e._node), e._paused || e._parent.pause(e._id, !0).play(e._id, !0);
		};
	})();
})), import_howler = require_howler();
const BUF_BGM = "BGM", BUF_SE = "SE";
var BUF_VOICE = "VOICE", MAX_END_MS = 999e3, val, errScript, getSndBuf, evtMng, hLP = {}, vol_mul_talking = 1;
function delLoopPlay(e) {
	delete hLP[e];
	let n = "const.sn.sound." + e + ".";
	val.setVal_Nochk("save", n + "fn", ""), val.setVal_Nochk("save", "const.sn.loopPlaying", JSON.stringify(hLP)), val.flush();
}
function getVol(e, r) {
	let i = argChk_Num(e, "volume", r);
	return i < 0 ? 0 : i > 1 ? 1 : i;
}
function xchgbuf({ buf: e = "SE", buf2: n = "SE" }) {
	if (e === n) throw `[xchgbuf] buf:${e} が同じ値です`;
	let r = "const.sn.sound." + e + ".", i = Number(val.getVal("save:" + r + "volume")), a = String(val.getVal("save:" + r + "fn")), o = "const.sn.sound." + n + ".", s = Number(val.getVal("save:" + o + "volume")), c = String(val.getVal("save:" + o + "fn"));
	val.setVal_Nochk("save", r + "volume", s), val.setVal_Nochk("save", o + "volume", i), val.setVal_Nochk("save", r + "fn", c), val.setVal_Nochk("save", o + "fn", a), e in hLP != n in hLP && (e in hLP ? (delete hLP[e], hLP[n] = a) : (delete hLP[n], hLP[e] = c), val.setVal_Nochk("save", "const.sn.loopPlaying", JSON.stringify(hLP))), val.flush();
}
var SndBuf = class e {
	static #e;
	static #t;
	static init(n, r, i, a, o) {
		hLP = {}, e.#e = n, val = r, errScript = (e, n) => i.errScript(e, n), e.#t = a, getSndBuf = o;
	}
	static setEvtMng(e) {
		evtMng = e;
	}
	static generate = (i, a, s) => new e(i, a, i.fn ?? "", Reading.procID, s, argChk_Num(i, "start_ms", 0), argChk_Num(i, "end_ms", MAX_END_MS), argChk_Num(i, "ret_ms", 0), argChk_Boolean(i, "loop", !1), argChk_Num(i, "pan", 0));
	stt = new StLoading(this);
	constructor(r, i, s, c, l, u, g, x, S, C) {
		if (this.hArg = r, this.buf = i, this.fn = s, this.procID = c, this.join = l, this.start_ms = u, this.end_ms = g, this.ret_ms = x, this.loop = S, this.pan = C, !s) throw `fnは必須です buf:${i}`;
		if (u < 0) throw `[${r[":タグ名"] ?? ""}] start_ms:${String(u)} が負の値です`;
		if (x < 0) throw `[${r[":タグ名"] ?? ""}] ret_ms:${String(x)} が負の値です`;
		if (0 < g) {
			if (g <= u) throw `[${r[":タグ名"] ?? ""}] start_ms:${String(u)} >= end_ms:${String(g)} は異常値です`;
			if (g <= x) throw `[${r[":タグ名"] ?? ""}] ret_ms:${String(x)} >= end_ms:${String(g)} は異常値です`;
		}
		let w = "const.sn.sound." + i + ".";
		val.setVal_Nochk("save", w + "fn", s);
		let T = getVol(r, 1);
		val.setVal_Nochk("save", w + "volume", T);
		let E = T * Number(val.getVal("sys:" + w + "volume", 1, !0));
		switch (i) {
			case BUF_VOICE:
				{
					if ((vol_mul_talking = Number(val.getVal("sys:sn.sound.BGM.vol_mul_talking") ?? 1)) === 1) break;
					let e = getSndBuf("BGM"), n = "const.sn.sound.BGM.volume";
					e && (e.volume = Number(val.getVal("save:" + n, 1)) * Number(val.getVal("sys:" + n, 1, !0)) * vol_mul_talking);
				}
				break;
			case "BGM":
				E *= vol_mul_talking;
				break;
		}
		S ? (hLP[i] = s, val.setVal_Nochk("save", "const.sn.loopPlaying", JSON.stringify(hLP))) : delLoopPlay(i), val.setVal_Nochk("save", w + "start_ms", u), val.setVal_Nochk("save", w + "end_ms", g), val.setVal_Nochk("save", w + "ret_ms", x), val.setVal_Nochk("tmp", w + "playing", !0), val.flush();
		let D = () => {};
		if (l) {
			let e = c + ` loaded buf:${i} fn:${s}`;
			Reading.beginProc(e), D = () => Reading.endProc(e);
		}
		let O = e.#e.searchPath(s, SEARCH_PATH_ARG_EXT.SOUND), k = {
			src: O,
			volume: E,
			html5: !1,
			loop: S,
			autoplay: !0,
			rate: argChk_Num(r, "speed", 1),
			onload: () => {
				D(), r.fnc?.(), this.stt = new StPlaying(this, this.#n);
			},
			onloaderror: (e, n) => {
				D(), errScript(`SndBuf ロード失敗です fn:${s} ${String(n)}`, !1);
			}
		};
		if (S || (k.onend = () => this.stt.onend()), u > 0 || g !== MAX_END_MS || x > 0) {
			k.autoplay = !1;
			let { 一周目: e, 二周目: n } = k.sprite = {
				一周目: [u, g - u],
				二周目: [
					x,
					g - x,
					!0
				]
			}, i = k.onload;
			if (k.onload = (a) => {
				i(a);
				let o = this.#n.duration() * 1e3;
				o <= u && errScript(`[${r[":タグ名"] ?? ""}] 音声ファイル再生時間:${String(o)} <= ret_ms:${String(x)} は異常値です`), g < 0 ? (e[1] = o + g - u, n[1] = o + g - x) : g === MAX_END_MS && (e[1] = o - u, n[1] = o - x);
				let s = e[1] + u;
				s <= u && errScript(`[${r[":タグ名"] ?? ""}] end_ms:${String(g)}(${String(s)}) >= start_ms:${String(u)} は異常値です`), s <= x && errScript(`[${r[":タグ名"] ?? ""}] end_ms:${String(g)}(${String(s)}) <= ret_ms:${String(x)} は異常値です`), o <= u && errScript(`[${r[":タグ名"] ?? ""}] 音声ファイル再生時間:${String(o)} <= start_ms:${String(u)} は異常値です`), g !== MAX_END_MS && o <= s && errScript(`[${r[":タグ名"] ?? ""}] 音声ファイル再生時間:${String(o)} <= end_ms:${String(g)} は異常値です`), this.#n.play("一周目");
			}, S && x > 0) {
				delete k.loop;
				let e = () => {
					e = () => {}, this.#n.play("二周目");
				};
				k.onend = () => e();
			}
		}
		if (!O.endsWith(".bin")) {
			this.#r(k);
			return;
		}
		e.#t.fetch(O).then(async (n) => {
			n.ok || errScript(`SndBuf ロード失敗です d1 fn:${s} ${n.statusText}`, !0);
			let r = await n.arrayBuffer(), i = await e.#t.decAB(r).catch((e) => errScript(`SndBuf ロード失敗です d2 fn:${s} ${String(e)}`, !1)), a = new Uint8Array(i), o = new Blob([a], { type: "music/mp3" }), c = URL.createObjectURL(o);
			k.src = c, k.format = "mp3", k.onplay = () => URL.revokeObjectURL(c), this.#r(k);
		});
	}
	#n;
	#r(e) {
		let n = this.#n = new import_howler.Howl(e);
		this.pan !== 0 && n.stereo(this.pan), !this.loop && CmnLib.needClick2Play() && setTimeout(() => e.onend?.(0), (n.duration() - this.start_ms - (this.end_ms <= 0 ? this.end_ms : this.end_ms === MAX_END_MS ? 0 : n.duration() - this.end_ms)) * 1e3);
	}
	stopse() {
		this.stt.stopse();
	}
	ws = (e) => this.stt.ws(e);
	fade = (e) => this.stt.fade(e);
	wf = (e) => this.stt.wf(e);
	get volume() {
		return this.#n.volume();
	}
	set volume(e) {
		this.#n.volume(e);
	}
}, StLoading = class {
	constructor(e) {
		this.sb = e;
	}
	onend() {
		this.stopse();
	}
	onfade() {}
	stopse() {
		this.sb.stt = new StStop(this.sb);
	}
	ws = () => !1;
	fade() {}
	wf = () => !1;
}, StPlaying = class {
	constructor(e, n) {
		this.sb = e, this.snd = n;
	}
	onend() {
		this.stopse();
	}
	onfade() {}
	stopse() {
		this.sb.stt = new StStop(this.sb, this.snd);
	}
	ws(e) {
		let { sb: n } = this;
		if (n.loop) return !1;
		n.stt = new StWaitingStop(n, this.snd);
		let i = argChk_Boolean(e, "canskip", !1), a = argChk_Boolean(e, "stop", !0) ? () => n.stt.stopse() : () => {};
		return i && evtMng.isSkipping ? (a(), !1) : (Reading.beginProc(n.procID + "ws", a, !0, i ? a : void 0), !0);
	}
	fade(e) {
		let { buf: i = "SE" } = e, a = "const.sn.sound." + i + ".volume", o = getVol(e, NaN);
		val.setVal_Nochk("save", a, o);
		let s = o * Number(val.getVal("sys:" + a, 1)), c = argChk_Boolean(e, "stop", o === 0);
		c && delLoopPlay(i), val.flush();
		let l = argChk_Num(e, "time", NaN), u = argChk_Num(e, "delay", 0), { sb: d, snd: f } = this;
		if (l === 0 && u === 0 || evtMng.isSkipping) {
			f.volume(s), c && (d.stt = new StStop(d, f));
			return;
		}
		f.fade(f.volume(), s, l).once("fade", () => {
			d.stt.onfade(), c && (d.stt = new StStop(d, f));
		}), d.stt = new StFade(d, c, f);
	}
	wf = () => !1;
}, StWaitingStop = class {
	constructor(e, n) {
		this.sb = e, this.snd = n;
	}
	onend() {
		this.stopse();
	}
	onfade() {}
	stopse() {
		this.sb.stt = new StStop(this.sb, this.snd), Reading.notifyEndProc(this.sb.procID + "ws");
	}
	ws = () => !1;
	fade() {}
	wf = () => !1;
}, StFade = class {
	constructor(e, n, r) {
		this.sb = e, this.stopOnFade = n, this.snd = r;
	}
	onend() {
		this.stopse();
	}
	onfade() {
		this.stopOnFade ? this.stopse() : this.sb.stt = new StPlaying(this.sb, this.snd);
	}
	stopse() {
		this.sb.stt = new StStop(this.sb, this.snd);
	}
	ws = () => !1;
	fade() {}
	wf(e) {
		let { sb: n } = this;
		n.stt = new StWaitingFade(n, this.stopOnFade, this.snd);
		let i = argChk_Boolean(e, "canskip", !1);
		if (i && evtMng.isSkipping) return !1;
		let a = () => {};
		return Reading.beginProc(n.procID + "wf", a, !0, i ? a : void 0), !0;
	}
}, StWaitingFade = class {
	constructor(e, n, r) {
		this.sb = e, this.stopOnFade = n, this.snd = r;
	}
	onend() {
		this.stopse();
	}
	onfade() {
		this.stopOnFade ? this.stopse() : this.sb.stt = new StPlaying(this.sb, this.snd), Reading.notifyEndProc(this.sb.procID + "wf");
	}
	stopse() {
		this.sb.stt = new StStop(this.sb, this.snd);
	}
	ws = () => !1;
	fade() {}
	wf = () => !1;
}, StStop = class {
	constructor(e, n) {
		e.loop && delLoopPlay(e.buf);
		let r = "const.sn.sound." + e.buf + ".";
		if (val.setVal_Nochk("tmp", r + "playing", !1), val.flush(), n?.unload(), e.buf !== BUF_VOICE) return;
		let i = getSndBuf("BGM");
		i && (i.volume = Number(val.getVal("save:" + r + "volume", 1, !0)) * Number(val.getVal("sys:" + r + "volume", 1, !0))), vol_mul_talking = 1;
	}
	onend() {}
	onfade() {}
	stopse() {}
	ws = () => !1;
	fade() {}
	wf = () => !1;
};
export { require_howler as a, xchgbuf as i, BUF_SE as n, SndBuf as r, BUF_BGM as t };

//# sourceMappingURL=SndBuf.js.map