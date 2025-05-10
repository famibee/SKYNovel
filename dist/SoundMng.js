import { c as I, L as O, T as R, n as ae, e as le, d as te, b as E, a as S, S as ce } from "./web2.js";
import { C as fe } from "./CmnTween.js";
import { d as pe, e as he, T as de, r as _e } from "./ReadState.js";
/*!
 * @pixi/sound - v4.4.1
 * https://github.com/pixijs/pixi-sound
 * Compiled Tue, 15 Aug 2023 19:22:13 UTC
 *
 * @pixi/sound is licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license
 */
var se;
function _() {
  return se;
}
var ne = function(n, e) {
  return (ne = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, s) {
    t.__proto__ = s;
  } || function(t, s) {
    for (var o in s) Object.prototype.hasOwnProperty.call(s, o) && (t[o] = s[o]);
  })(n, e);
};
function g(n, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  function t() {
    this.constructor = n;
  }
  ne(n, e), n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var A = function() {
  return (A = Object.assign || function(n) {
    for (var e, t = 1, s = arguments.length; t < s; t++) for (var o in e = arguments[t]) Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o]);
    return n;
  }).apply(this, arguments);
}, oe = ["mp3", "ogg", "oga", "opus", "mpeg", "wav", "m4a", "aiff", "wma", "mid", "caf"], H = {};
function ye(n) {
  var e = A({ m4a: "audio/mp4", oga: "audio/ogg", opus: 'audio/ogg; codecs="opus"', caf: 'audio/x-caf; codecs="opus"' }, n || {}), t = document.createElement("audio"), s = {}, o = /^no$/;
  oe.forEach(function(r) {
    var i = t.canPlayType("audio/".concat(r)).replace(o, ""), u = e[r] ? t.canPlayType(e[r]).replace(o, "") : "";
    s[r] = !!i || !!u;
  }), Object.assign(H, s);
}
ye();
var me = /\.(\{([^\}]+)\})(\?.*)?$/;
function ie(n) {
  var e = me, t = typeof n == "string" ? n : n.url;
  if (!e.test(t)) return t;
  for (var s = e.exec(t), o = s[2].split(","), r = o[o.length - 1], i = 0, u = o.length; i < u; i++) {
    var a = o[i];
    if (H[a]) {
      r = a;
      break;
    }
  }
  var l = t.replace(s[1], r);
  if (typeof n != "string") {
    var h = n;
    h.extension = r, h.url = l;
  }
  return l;
}
var X = oe.filter(function(n) {
  return H[n];
}), J = function() {
  function n() {
  }
  return n.add = function() {
    n.setLegacy(_().useLegacy);
  }, n.setLegacy = function(e) {
    e ? X.forEach(function(t) {
      O.setExtensionXhrType(t, O.XHR_RESPONSE_TYPE.DEFAULT), O.setExtensionLoadType(t, O.LOAD_TYPE.AUDIO);
    }) : X.forEach(function(t) {
      O.setExtensionXhrType(t, O.XHR_RESPONSE_TYPE.BUFFER), O.setExtensionLoadType(t, O.LOAD_TYPE.XHR);
    });
  }, n.pre = function(e, t) {
    ie(e), t();
  }, n.use = function(e, t) {
    e.data && X.indexOf(e.extension) > -1 ? e.sound = _().add(e.name, { loaded: t, preload: !0, url: e.url, source: e.data }) : t();
  }, n.extension = "loader", n;
}(), be = 0, ve = function(n) {
  function e(t) {
    var s = n.call(this) || this;
    return s.id = be++, s.init(t), s;
  }
  return g(e, n), e.prototype.set = function(t, s) {
    if (this[t] === void 0) throw new Error("Property with name ".concat(t, " does not exist."));
    switch (t) {
      case "speed":
        this.speed = s;
        break;
      case "volume":
        this.volume = s;
        break;
      case "paused":
        this.paused = s;
        break;
      case "loop":
        this.loop = s;
        break;
      case "muted":
        this.muted = s;
    }
    return this;
  }, Object.defineProperty(e.prototype, "progress", { get: function() {
    return this._source.currentTime / this._duration;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "paused", { get: function() {
    return this._paused;
  }, set: function(t) {
    this._paused = t, this.refreshPaused();
  }, enumerable: !1, configurable: !0 }), e.prototype._onPlay = function() {
    this._playing = !0;
  }, e.prototype._onPause = function() {
    this._playing = !1;
  }, e.prototype.init = function(t) {
    this._playing = !1, this._duration = t.source.duration;
    var s = this._source = t.source.cloneNode(!1);
    s.src = t.parent.url, s.onplay = this._onPlay.bind(this), s.onpause = this._onPause.bind(this), t.context.on("refresh", this.refresh, this), t.context.on("refreshPaused", this.refreshPaused, this), this._media = t;
  }, e.prototype._internalStop = function() {
    this._source && this._playing && (this._source.onended = null, this._source.pause());
  }, e.prototype.stop = function() {
    this._internalStop(), this._source && this.emit("stop");
  }, Object.defineProperty(e.prototype, "speed", { get: function() {
    return this._speed;
  }, set: function(t) {
    this._speed = t, this.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "volume", { get: function() {
    return this._volume;
  }, set: function(t) {
    this._volume = t, this.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "loop", { get: function() {
    return this._loop;
  }, set: function(t) {
    this._loop = t, this.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "muted", { get: function() {
    return this._muted;
  }, set: function(t) {
    this._muted = t, this.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "filters", { get: function() {
    return null;
  }, set: function(t) {
  }, enumerable: !1, configurable: !0 }), e.prototype.refresh = function() {
    var t = this._media.context, s = this._media.parent;
    this._source.loop = this._loop || s.loop;
    var o = t.volume * (t.muted ? 0 : 1), r = s.volume * (s.muted ? 0 : 1), i = this._volume * (this._muted ? 0 : 1);
    this._source.volume = i * o * r, this._source.playbackRate = this._speed * t.speed * s.speed;
  }, e.prototype.refreshPaused = function() {
    var t = this._media.context, s = this._media.parent, o = this._paused || s.paused || t.paused;
    o !== this._pausedReal && (this._pausedReal = o, o ? (this._internalStop(), this.emit("paused")) : (this.emit("resumed"), this.play({ start: this._source.currentTime, end: this._end, volume: this._volume, speed: this._speed, loop: this._loop })), this.emit("pause", o));
  }, e.prototype.play = function(t) {
    var s = this, o = t.start, r = t.end, i = t.speed, u = t.loop, a = t.volume, l = t.muted;
    this._speed = i, this._volume = a, this._loop = !!u, this._muted = l, this.refresh(), this.loop && r !== null && (this.loop = !1), this._start = o, this._end = r || this._duration, this._start = Math.max(0, this._start - e.PADDING), this._end = Math.min(this._end + e.PADDING, this._duration), this._source.onloadedmetadata = function() {
      s._source && (s._source.currentTime = o, s._source.onloadedmetadata = null, s.emit("progress", o, s._duration), R.shared.add(s._onUpdate, s));
    }, this._source.onended = this._onComplete.bind(this), this._source.play(), this.emit("start");
  }, e.prototype._onUpdate = function() {
    this.emit("progress", this.progress, this._duration), this._source.currentTime >= this._end && !this._source.loop && this._onComplete();
  }, e.prototype._onComplete = function() {
    R.shared.remove(this._onUpdate, this), this._internalStop(), this.emit("progress", 1, this._duration), this.emit("end", this);
  }, e.prototype.destroy = function() {
    R.shared.remove(this._onUpdate, this), this.removeAllListeners();
    var t = this._source;
    t && (t.onended = null, t.onplay = null, t.onpause = null, this._internalStop()), this._source = null, this._speed = 1, this._volume = 1, this._loop = !1, this._end = null, this._start = 0, this._duration = 0, this._playing = !1, this._pausedReal = !1, this._paused = !1, this._muted = !1, this._media && (this._media.context.off("refresh", this.refresh, this), this._media.context.off("refreshPaused", this.refreshPaused, this), this._media = null);
  }, e.prototype.toString = function() {
    return "[HTMLAudioInstance id=".concat(this.id, "]");
  }, e.PADDING = 0.1, e;
}(I), ge = function(n) {
  function e() {
    return n !== null && n.apply(this, arguments) || this;
  }
  return g(e, n), e.prototype.init = function(t) {
    this.parent = t, this._source = t.options.source || new Audio(), t.url && (this._source.src = t.url);
  }, e.prototype.create = function() {
    return new ve(this);
  }, Object.defineProperty(e.prototype, "isPlayable", { get: function() {
    return !!this._source && this._source.readyState === 4;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "duration", { get: function() {
    return this._source.duration;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "context", { get: function() {
    return this.parent.context;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "filters", { get: function() {
    return null;
  }, set: function(t) {
  }, enumerable: !1, configurable: !0 }), e.prototype.destroy = function() {
    this.removeAllListeners(), this.parent = null, this._source && (this._source.src = "", this._source.load(), this._source = null);
  }, Object.defineProperty(e.prototype, "source", { get: function() {
    return this._source;
  }, enumerable: !1, configurable: !0 }), e.prototype.load = function(t) {
    var s = this._source, o = this.parent;
    if (s.readyState !== 4) if (o.url) {
      s.src = o.url;
      var r = function() {
        a(), o.isLoaded = !0;
        var h = o.autoPlayStart();
        t && t(null, o, h);
      }, i = function() {
        a(), t && t(new Error("Sound loading has been aborted"));
      }, u = function() {
        a();
        var h = "Failed to load audio element (code: ".concat(s.error.code, ")");
        t && t(new Error(h));
      }, a = function() {
        s.removeEventListener("canplaythrough", r), s.removeEventListener("load", r), s.removeEventListener("abort", i), s.removeEventListener("error", u);
      };
      s.addEventListener("canplaythrough", r, !1), s.addEventListener("load", r, !1), s.addEventListener("abort", i, !1), s.addEventListener("error", u, !1), s.load();
    } else t(new Error("sound.url or sound.source must be set"));
    else {
      o.isLoaded = !0;
      var l = o.autoPlayStart();
      t && setTimeout(function() {
        t(null, o, l);
      }, 0);
    }
  }, e;
}(I), Pe = function() {
  function n(e, t) {
    this.parent = e, Object.assign(this, t), this.duration = this.end - this.start;
  }
  return n.prototype.play = function(e) {
    return this.parent.play({ complete: e, speed: this.speed || this.parent.speed, end: this.end, start: this.start, loop: this.loop });
  }, n.prototype.destroy = function() {
    this.parent = null;
  }, n;
}(), P = function() {
  function n() {
  }
  return n.setParamValue = function(e, t) {
    if (e.setValueAtTime) {
      var s = _().context;
      e.setValueAtTime(t, s.audioContext.currentTime);
    } else e.value = t;
    return t;
  }, n;
}(), xe = 0, we = function(n) {
  function e(t) {
    var s = n.call(this) || this;
    return s.id = xe++, s._media = null, s._paused = !1, s._muted = !1, s._elapsed = 0, s.init(t), s;
  }
  return g(e, n), e.prototype.set = function(t, s) {
    if (this[t] === void 0) throw new Error("Property with name ".concat(t, " does not exist."));
    switch (t) {
      case "speed":
        this.speed = s;
        break;
      case "volume":
        this.volume = s;
        break;
      case "muted":
        this.muted = s;
        break;
      case "loop":
        this.loop = s;
        break;
      case "paused":
        this.paused = s;
    }
    return this;
  }, e.prototype.stop = function() {
    this._source && (this._internalStop(), this.emit("stop"));
  }, Object.defineProperty(e.prototype, "speed", { get: function() {
    return this._speed;
  }, set: function(t) {
    this._speed = t, this.refresh(), this._update(!0);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "volume", { get: function() {
    return this._volume;
  }, set: function(t) {
    this._volume = t, this.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "muted", { get: function() {
    return this._muted;
  }, set: function(t) {
    this._muted = t, this.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "loop", { get: function() {
    return this._loop;
  }, set: function(t) {
    this._loop = t, this.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "filters", { get: function() {
    return this._filters;
  }, set: function(t) {
    var s;
    this._filters && ((s = this._filters) === null || s === void 0 || s.filter(function(o) {
      return o;
    }).forEach(function(o) {
      return o.disconnect();
    }), this._filters = null, this._source.connect(this._gain)), this._filters = t?.length ? t.slice(0) : null, this.refresh();
  }, enumerable: !1, configurable: !0 }), e.prototype.refresh = function() {
    if (this._source) {
      var t = this._media.context, s = this._media.parent;
      this._source.loop = this._loop || s.loop;
      var o = t.volume * (t.muted ? 0 : 1), r = s.volume * (s.muted ? 0 : 1), i = this._volume * (this._muted ? 0 : 1);
      P.setParamValue(this._gain.gain, i * r * o), P.setParamValue(this._source.playbackRate, this._speed * s.speed * t.speed), this.applyFilters();
    }
  }, e.prototype.applyFilters = function() {
    var t;
    if (!((t = this._filters) === null || t === void 0) && t.length) {
      this._source.disconnect();
      var s = this._source;
      this._filters.forEach(function(o) {
        s.connect(o.destination), s = o;
      }), s.connect(this._gain);
    }
  }, e.prototype.refreshPaused = function() {
    var t = this._media.context, s = this._media.parent, o = this._paused || s.paused || t.paused;
    o !== this._pausedReal && (this._pausedReal = o, o ? (this._internalStop(), this.emit("paused")) : (this.emit("resumed"), this.play({ start: this._elapsed % this._duration, end: this._end, speed: this._speed, loop: this._loop, volume: this._volume })), this.emit("pause", o));
  }, e.prototype.play = function(t) {
    var s = t.start, o = t.end, r = t.speed, i = t.loop, u = t.volume, a = t.muted, l = t.filters;
    this._paused = !1;
    var h = this._media.nodes.cloneBufferSource(), m = h.source, y = h.gain;
    this._source = m, this._gain = y, this._speed = r, this._volume = u, this._loop = !!i, this._muted = a, this._filters = l, this.refresh();
    var b = this._source.buffer.duration;
    this._duration = b, this._end = o, this._lastUpdate = this._now(), this._elapsed = s, this._source.onended = this._onComplete.bind(this), this._loop ? (this._source.loopEnd = o, this._source.loopStart = s, this._source.start(0, s)) : o ? this._source.start(0, s, o - s) : this._source.start(0, s), this.emit("start"), this._update(!0), this.enableTicker(!0);
  }, e.prototype.enableTicker = function(t) {
    R.shared.remove(this._updateListener, this), t && R.shared.add(this._updateListener, this);
  }, Object.defineProperty(e.prototype, "progress", { get: function() {
    return this._progress;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "paused", { get: function() {
    return this._paused;
  }, set: function(t) {
    this._paused = t, this.refreshPaused();
  }, enumerable: !1, configurable: !0 }), e.prototype.destroy = function() {
    var t;
    this.removeAllListeners(), this._internalStop(), this._gain && (this._gain.disconnect(), this._gain = null), this._media && (this._media.context.events.off("refresh", this.refresh, this), this._media.context.events.off("refreshPaused", this.refreshPaused, this), this._media = null), (t = this._filters) === null || t === void 0 || t.forEach(function(s) {
      return s.disconnect();
    }), this._filters = null, this._end = null, this._speed = 1, this._volume = 1, this._loop = !1, this._elapsed = 0, this._duration = 0, this._paused = !1, this._muted = !1, this._pausedReal = !1;
  }, e.prototype.toString = function() {
    return "[WebAudioInstance id=".concat(this.id, "]");
  }, e.prototype._now = function() {
    return this._media.context.audioContext.currentTime;
  }, e.prototype._updateListener = function() {
    this._update();
  }, e.prototype._update = function(t) {
    if (t === void 0 && (t = !1), this._source) {
      var s = this._now(), o = s - this._lastUpdate;
      if (o > 0 || t) {
        var r = this._source.playbackRate.value;
        this._elapsed += o * r, this._lastUpdate = s;
        var i = this._duration, u = void 0;
        if (this._source.loopStart) {
          var a = this._source.loopEnd - this._source.loopStart;
          u = (this._source.loopStart + this._elapsed % a) / i;
        } else u = this._elapsed % i / i;
        this._progress = u, this.emit("progress", this._progress, i);
      }
    }
  }, e.prototype.init = function(t) {
    this._media = t, t.context.events.on("refresh", this.refresh, this), t.context.events.on("refreshPaused", this.refreshPaused, this);
  }, e.prototype._internalStop = function() {
    if (this._source) {
      this.enableTicker(!1), this._source.onended = null, this._source.stop(0), this._source.disconnect();
      try {
        this._source.buffer = null;
      } catch {
      }
      this._source = null;
    }
  }, e.prototype._onComplete = function() {
    if (this._source) {
      this.enableTicker(!1), this._source.onended = null, this._source.disconnect();
      try {
        this._source.buffer = null;
      } catch {
      }
    }
    this._source = null, this._progress = 1, this.emit("progress", 1, this._duration), this.emit("end", this);
  }, e;
}(I), re = function() {
  function n(e, t) {
    this._output = t, this._input = e;
  }
  return Object.defineProperty(n.prototype, "destination", { get: function() {
    return this._input;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "filters", { get: function() {
    return this._filters;
  }, set: function(e) {
    var t = this;
    if (this._filters && (this._filters.forEach(function(o) {
      o && o.disconnect();
    }), this._filters = null, this._input.connect(this._output)), e && e.length) {
      this._filters = e.slice(0), this._input.disconnect();
      var s = null;
      e.forEach(function(o) {
        s === null ? t._input.connect(o.destination) : s.connect(o.destination), s = o;
      }), s.connect(this._output);
    }
  }, enumerable: !1, configurable: !0 }), n.prototype.destroy = function() {
    this.filters = null, this._input = null, this._output = null;
  }, n;
}(), Oe = function(n) {
  function e(t) {
    var s = this, o = t.audioContext, r = o.createBufferSource(), i = o.createGain(), u = o.createAnalyser();
    return r.connect(u), u.connect(i), i.connect(t.destination), (s = n.call(this, u, i) || this).context = t, s.bufferSource = r, s.gain = i, s.analyser = u, s;
  }
  return g(e, n), Object.defineProperty(e.prototype, "script", { get: function() {
    return this._script || (this._script = this.context.audioContext.createScriptProcessor(e.BUFFER_SIZE), this._script.connect(this.context.destination)), this._script;
  }, enumerable: !1, configurable: !0 }), e.prototype.destroy = function() {
    n.prototype.destroy.call(this), this.bufferSource.disconnect(), this._script && this._script.disconnect(), this.gain.disconnect(), this.analyser.disconnect(), this.bufferSource = null, this._script = null, this.gain = null, this.analyser = null, this.context = null;
  }, e.prototype.cloneBufferSource = function() {
    var t = this.bufferSource, s = this.context.audioContext.createBufferSource();
    s.buffer = t.buffer, P.setParamValue(s.playbackRate, t.playbackRate.value), s.loop = t.loop;
    var o = this.context.audioContext.createGain();
    return s.connect(o), o.connect(this.destination), { source: s, gain: o };
  }, Object.defineProperty(e.prototype, "bufferSize", { get: function() {
    return this.script.bufferSize;
  }, enumerable: !1, configurable: !0 }), e.BUFFER_SIZE = 0, e;
}(re), Ee = function() {
  function n() {
  }
  return n.prototype.init = function(e) {
    this.parent = e, this._nodes = new Oe(this.context), this._source = this._nodes.bufferSource, this.source = e.options.source;
  }, n.prototype.destroy = function() {
    this.parent = null, this._nodes.destroy(), this._nodes = null;
    try {
      this._source.buffer = null;
    } catch {
    }
    this._source = null, this.source = null;
  }, n.prototype.create = function() {
    return new we(this);
  }, Object.defineProperty(n.prototype, "context", { get: function() {
    return this.parent.context;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "isPlayable", { get: function() {
    return !!this._source && !!this._source.buffer;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "filters", { get: function() {
    return this._nodes.filters;
  }, set: function(e) {
    this._nodes.filters = e;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "duration", { get: function() {
    return this._source.buffer.duration;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "buffer", { get: function() {
    return this._source.buffer;
  }, set: function(e) {
    this._source.buffer = e;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "nodes", { get: function() {
    return this._nodes;
  }, enumerable: !1, configurable: !0 }), n.prototype.load = function(e) {
    this.source ? this._decode(this.source, e) : this.parent.url ? this._loadUrl(e) : e && e(new Error("sound.url or sound.source must be set"));
  }, n.prototype._loadUrl = function(e) {
    var t = this, s = new XMLHttpRequest(), o = this.parent.url;
    s.open("GET", o, !0), s.responseType = "arraybuffer", s.onload = function() {
      t.source = s.response, t._decode(s.response, e);
    }, s.send();
  }, n.prototype._decode = function(e, t) {
    var s = this, o = function(r, i) {
      if (r) t && t(r);
      else {
        s.parent.isLoaded = !0, s.buffer = i;
        var u = s.parent.autoPlayStart();
        t && t(null, s.parent, u);
      }
    };
    e instanceof AudioBuffer ? o(null, e) : this.parent.context.decode(e, o);
  }, n;
}(), $ = function() {
  function n(e, t) {
    this.media = e, this.options = t, this._instances = [], this._sprites = {}, this.media.init(this);
    var s = t.complete;
    this._autoPlayOptions = s ? { complete: s } : null, this.isLoaded = !1, this.isPlaying = !1, this.autoPlay = t.autoPlay, this.singleInstance = t.singleInstance, this.preload = t.preload || this.autoPlay, this.url = t.url, this.speed = t.speed, this.volume = t.volume, this.loop = t.loop, t.sprites && this.addSprites(t.sprites), this.preload && this._preload(t.loaded);
  }
  return n.from = function(e) {
    var t = {};
    return typeof e == "string" ? t.url = e : e instanceof ArrayBuffer || e instanceof AudioBuffer || e instanceof HTMLAudioElement ? t.source = e : t = e, (t = A({ autoPlay: !1, singleInstance: !1, url: null, source: null, preload: !1, volume: 1, speed: 1, complete: null, loaded: null, loop: !1 }, t)).url && (t.url = ie(t.url)), Object.freeze(t), new n(_().useLegacy ? new ge() : new Ee(), t);
  }, Object.defineProperty(n.prototype, "context", { get: function() {
    return _().context;
  }, enumerable: !1, configurable: !0 }), n.prototype.pause = function() {
    return this.isPlaying = !1, this.paused = !0, this;
  }, n.prototype.resume = function() {
    return this.isPlaying = this._instances.length > 0, this.paused = !1, this;
  }, Object.defineProperty(n.prototype, "paused", { get: function() {
    return this._paused;
  }, set: function(e) {
    this._paused = e, this.refreshPaused();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "speed", { get: function() {
    return this._speed;
  }, set: function(e) {
    this._speed = e, this.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "filters", { get: function() {
    return this.media.filters;
  }, set: function(e) {
    this.media.filters = e;
  }, enumerable: !1, configurable: !0 }), n.prototype.addSprites = function(e, t) {
    if (typeof e == "object") {
      var s = {};
      for (var o in e) s[o] = this.addSprites(o, e[o]);
      return s;
    }
    var r = new Pe(this, t);
    return this._sprites[e] = r, r;
  }, n.prototype.destroy = function() {
    this._removeInstances(), this.removeSprites(), this.media.destroy(), this.media = null, this._sprites = null, this._instances = null;
  }, n.prototype.removeSprites = function(e) {
    if (e) {
      var t = this._sprites[e];
      t !== void 0 && (t.destroy(), delete this._sprites[e]);
    } else for (var s in this._sprites) this.removeSprites(s);
    return this;
  }, Object.defineProperty(n.prototype, "isPlayable", { get: function() {
    return this.isLoaded && this.media && this.media.isPlayable;
  }, enumerable: !1, configurable: !0 }), n.prototype.stop = function() {
    if (!this.isPlayable) return this.autoPlay = !1, this._autoPlayOptions = null, this;
    this.isPlaying = !1;
    for (var e = this._instances.length - 1; e >= 0; e--) this._instances[e].stop();
    return this;
  }, n.prototype.play = function(e, t) {
    var s, o = this;
    if (typeof e == "string" ? s = { sprite: i = e, loop: this.loop, complete: t } : typeof e == "function" ? (s = {}).complete = e : s = e, (s = A({ complete: null, loaded: null, sprite: null, end: null, start: 0, volume: 1, speed: 1, muted: !1, loop: !1 }, s || {})).sprite) {
      var r = s.sprite, i = this._sprites[r];
      s.start = i.start + (s.start || 0), s.end = i.end, s.speed = i.speed || 1, s.loop = i.loop || s.loop, delete s.sprite;
    }
    if (s.offset && (s.start = s.offset), !this.isLoaded) return new Promise(function(a, l) {
      o.autoPlay = !0, o._autoPlayOptions = s, o._preload(function(h, m, y) {
        h ? l(h) : (s.loaded && s.loaded(h, m, y), a(y));
      });
    });
    (this.singleInstance || s.singleInstance) && this._removeInstances();
    var u = this._createInstance();
    return this._instances.push(u), this.isPlaying = !0, u.once("end", function() {
      s.complete && s.complete(o), o._onComplete(u);
    }), u.once("stop", function() {
      o._onComplete(u);
    }), u.play(s), u;
  }, n.prototype.refresh = function() {
    for (var e = this._instances.length, t = 0; t < e; t++) this._instances[t].refresh();
  }, n.prototype.refreshPaused = function() {
    for (var e = this._instances.length, t = 0; t < e; t++) this._instances[t].refreshPaused();
  }, Object.defineProperty(n.prototype, "volume", { get: function() {
    return this._volume;
  }, set: function(e) {
    this._volume = e, this.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "muted", { get: function() {
    return this._muted;
  }, set: function(e) {
    this._muted = e, this.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "loop", { get: function() {
    return this._loop;
  }, set: function(e) {
    this._loop = e, this.refresh();
  }, enumerable: !1, configurable: !0 }), n.prototype._preload = function(e) {
    this.media.load(e);
  }, Object.defineProperty(n.prototype, "instances", { get: function() {
    return this._instances;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "sprites", { get: function() {
    return this._sprites;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "duration", { get: function() {
    return this.media.duration;
  }, enumerable: !1, configurable: !0 }), n.prototype.autoPlayStart = function() {
    var e;
    return this.autoPlay && (e = this.play(this._autoPlayOptions)), e;
  }, n.prototype._removeInstances = function() {
    for (var e = this._instances.length - 1; e >= 0; e--) this._poolInstance(this._instances[e]);
    this._instances.length = 0;
  }, n.prototype._onComplete = function(e) {
    if (this._instances) {
      var t = this._instances.indexOf(e);
      t > -1 && this._instances.splice(t, 1), this.isPlaying = this._instances.length > 0;
    }
    this._poolInstance(e);
  }, n.prototype._createInstance = function() {
    if (n._pool.length > 0) {
      var e = n._pool.pop();
      return e.init(this.media), e;
    }
    return this.media.create();
  }, n.prototype._poolInstance = function(e) {
    e.destroy(), n._pool.indexOf(e) < 0 && n._pool.push(e);
  }, n._pool = [], n;
}(), je = function(n) {
  function e() {
    var t = n !== null && n.apply(this, arguments) || this;
    return t.speed = 1, t.muted = !1, t.volume = 1, t.paused = !1, t;
  }
  return g(e, n), e.prototype.refresh = function() {
    this.emit("refresh");
  }, e.prototype.refreshPaused = function() {
    this.emit("refreshPaused");
  }, Object.defineProperty(e.prototype, "filters", { get: function() {
    return null;
  }, set: function(t) {
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "audioContext", { get: function() {
    return null;
  }, enumerable: !1, configurable: !0 }), e.prototype.toggleMute = function() {
    return this.muted = !this.muted, this.refresh(), this.muted;
  }, e.prototype.togglePause = function() {
    return this.paused = !this.paused, this.refreshPaused(), this.paused;
  }, e.prototype.destroy = function() {
    this.removeAllListeners();
  }, e;
}(I), z = function(n) {
  function e() {
    var t = n.call(this, null, null) || this;
    t.autoPause = !0;
    var s = window, o = new e.AudioContext(), r = o.createDynamicsCompressor(), i = o.createAnalyser();
    return i.connect(r), r.connect(o.destination), t._input = i, t._output = o.destination, t._ctx = o, t._offlineCtx = new e.OfflineAudioContext(1, 2, s.OfflineAudioContext ? Math.max(8e3, Math.min(96e3, o.sampleRate)) : 44100), t.compressor = r, t.analyser = i, t.events = new I(), t.volume = 1, t.speed = 1, t.muted = !1, t.paused = !1, t._locked = o.state === "suspended" && ("ontouchstart" in globalThis || "onclick" in globalThis), t._locked && (t._unlock(), t._unlock = t._unlock.bind(t), document.addEventListener("mousedown", t._unlock, !0), document.addEventListener("touchstart", t._unlock, !0), document.addEventListener("touchend", t._unlock, !0)), t.onFocus = t.onFocus.bind(t), t.onBlur = t.onBlur.bind(t), globalThis.addEventListener("focus", t.onFocus), globalThis.addEventListener("blur", t.onBlur), t;
  }
  return g(e, n), e.prototype.onFocus = function() {
    if (this.autoPause) {
      var t = this._ctx.state;
      t !== "suspended" && t !== "interrupted" && this._locked || (this.paused = this._pausedOnBlur, this.refreshPaused());
    }
  }, e.prototype.onBlur = function() {
    this.autoPause && (this._locked || (this._pausedOnBlur = this._paused, this.paused = !0, this.refreshPaused()));
  }, e.prototype._unlock = function() {
    this._locked && (this.playEmptySound(), this._ctx.state === "running" && (document.removeEventListener("mousedown", this._unlock, !0), document.removeEventListener("touchend", this._unlock, !0), document.removeEventListener("touchstart", this._unlock, !0), this._locked = !1));
  }, e.prototype.playEmptySound = function() {
    var t = this._ctx.createBufferSource();
    t.buffer = this._ctx.createBuffer(1, 1, 22050), t.connect(this._ctx.destination), t.start(0, 0, 0), t.context.state === "suspended" && t.context.resume();
  }, Object.defineProperty(e, "AudioContext", { get: function() {
    var t = window;
    return t.AudioContext || t.webkitAudioContext || null;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e, "OfflineAudioContext", { get: function() {
    var t = window;
    return t.OfflineAudioContext || t.webkitOfflineAudioContext || null;
  }, enumerable: !1, configurable: !0 }), e.prototype.destroy = function() {
    n.prototype.destroy.call(this);
    var t = this._ctx;
    t.close !== void 0 && t.close(), globalThis.removeEventListener("focus", this.onFocus), globalThis.removeEventListener("blur", this.onBlur), this.events.removeAllListeners(), this.analyser.disconnect(), this.compressor.disconnect(), this.analyser = null, this.compressor = null, this.events = null, this._offlineCtx = null, this._ctx = null;
  }, Object.defineProperty(e.prototype, "audioContext", { get: function() {
    return this._ctx;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "offlineContext", { get: function() {
    return this._offlineCtx;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "paused", { get: function() {
    return this._paused;
  }, set: function(t) {
    t && this._ctx.state === "running" ? this._ctx.suspend() : t || this._ctx.state !== "suspended" || this._ctx.resume(), this._paused = t;
  }, enumerable: !1, configurable: !0 }), e.prototype.refresh = function() {
    this.events.emit("refresh");
  }, e.prototype.refreshPaused = function() {
    this.events.emit("refreshPaused");
  }, e.prototype.toggleMute = function() {
    return this.muted = !this.muted, this.refresh(), this.muted;
  }, e.prototype.togglePause = function() {
    return this.paused = !this.paused, this.refreshPaused(), this._paused;
  }, e.prototype.decode = function(t, s) {
    var o = function(i) {
      s(new Error(i?.message || "Unable to decode file"));
    }, r = this._offlineCtx.decodeAudioData(t, function(i) {
      s(null, i);
    }, o);
    r && r.catch(o);
  }, e;
}(re), ke = function() {
  function n() {
    this.init();
  }
  return n.prototype.init = function() {
    return this.supported && (this._webAudioContext = new z()), this._htmlAudioContext = new je(), this._sounds = {}, this.useLegacy = !this.supported, this;
  }, Object.defineProperty(n.prototype, "context", { get: function() {
    return this._context;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "filtersAll", { get: function() {
    return this.useLegacy ? [] : this._context.filters;
  }, set: function(e) {
    this.useLegacy || (this._context.filters = e);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "supported", { get: function() {
    return z.AudioContext !== null;
  }, enumerable: !1, configurable: !0 }), n.prototype.add = function(e, t) {
    if (typeof e == "object") {
      var s = {};
      for (var o in e) {
        var r = this._getOptions(e[o], t);
        s[o] = this.add(o, r);
      }
      return s;
    }
    if (t instanceof $) return this._sounds[e] = t, t;
    var i = this._getOptions(t), u = $.from(i);
    return this._sounds[e] = u, u;
  }, n.prototype._getOptions = function(e, t) {
    var s;
    return s = typeof e == "string" ? { url: e } : e instanceof ArrayBuffer || e instanceof AudioBuffer || e instanceof HTMLAudioElement ? { source: e } : e, s = A(A({}, s), t || {});
  }, Object.defineProperty(n.prototype, "useLegacy", { get: function() {
    return this._useLegacy;
  }, set: function(e) {
    J.setLegacy(e), this._useLegacy = e, this._context = !e && this.supported ? this._webAudioContext : this._htmlAudioContext;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "disableAutoPause", { get: function() {
    return !this._webAudioContext.autoPause;
  }, set: function(e) {
    this._webAudioContext.autoPause = !e;
  }, enumerable: !1, configurable: !0 }), n.prototype.remove = function(e) {
    return this.exists(e, !0), this._sounds[e].destroy(), delete this._sounds[e], this;
  }, Object.defineProperty(n.prototype, "volumeAll", { get: function() {
    return this._context.volume;
  }, set: function(e) {
    this._context.volume = e, this._context.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "speedAll", { get: function() {
    return this._context.speed;
  }, set: function(e) {
    this._context.speed = e, this._context.refresh();
  }, enumerable: !1, configurable: !0 }), n.prototype.togglePauseAll = function() {
    return this._context.togglePause();
  }, n.prototype.pauseAll = function() {
    return this._context.paused = !0, this._context.refreshPaused(), this;
  }, n.prototype.resumeAll = function() {
    return this._context.paused = !1, this._context.refreshPaused(), this;
  }, n.prototype.toggleMuteAll = function() {
    return this._context.toggleMute();
  }, n.prototype.muteAll = function() {
    return this._context.muted = !0, this._context.refresh(), this;
  }, n.prototype.unmuteAll = function() {
    return this._context.muted = !1, this._context.refresh(), this;
  }, n.prototype.removeAll = function() {
    for (var e in this._sounds) this._sounds[e].destroy(), delete this._sounds[e];
    return this;
  }, n.prototype.stopAll = function() {
    for (var e in this._sounds) this._sounds[e].stop();
    return this;
  }, n.prototype.exists = function(e, t) {
    return !!this._sounds[e];
  }, n.prototype.find = function(e) {
    return this.exists(e, !0), this._sounds[e];
  }, n.prototype.play = function(e, t) {
    return this.find(e).play(t);
  }, n.prototype.stop = function(e) {
    return this.find(e).stop();
  }, n.prototype.pause = function(e) {
    return this.find(e).pause();
  }, n.prototype.resume = function(e) {
    return this.find(e).resume();
  }, n.prototype.volume = function(e, t) {
    var s = this.find(e);
    return t !== void 0 && (s.volume = t), s.volume;
  }, n.prototype.speed = function(e, t) {
    var s = this.find(e);
    return t !== void 0 && (s.speed = t), s.speed;
  }, n.prototype.duration = function(e) {
    return this.find(e).duration;
  }, n.prototype.close = function() {
    return this.removeAll(), this._sounds = null, this._webAudioContext && (this._webAudioContext.destroy(), this._webAudioContext = null), this._htmlAudioContext && (this._htmlAudioContext.destroy(), this._htmlAudioContext = null), this._context = null, this;
  }, n;
}(), L = function() {
  function n(e, t) {
    this.init(e, t);
  }
  return n.prototype.init = function(e, t) {
    this.destination = e, this.source = t || e;
  }, n.prototype.connect = function(e) {
    this.source.connect(e);
  }, n.prototype.disconnect = function() {
    this.source.disconnect();
  }, n.prototype.destroy = function() {
    this.disconnect(), this.destination = null, this.source = null;
  }, n;
}(), q = { __proto__: null, EqualizerFilter: function(n) {
  function e(t, s, o, r, i, u, a, l, h, m) {
    t === void 0 && (t = 0), s === void 0 && (s = 0), o === void 0 && (o = 0), r === void 0 && (r = 0), i === void 0 && (i = 0), u === void 0 && (u = 0), a === void 0 && (a = 0), l === void 0 && (l = 0), h === void 0 && (h = 0), m === void 0 && (m = 0);
    var y = this;
    if (!_().useLegacy) {
      var b = [{ f: e.F32, type: "lowshelf", gain: t }, { f: e.F64, type: "peaking", gain: s }, { f: e.F125, type: "peaking", gain: o }, { f: e.F250, type: "peaking", gain: r }, { f: e.F500, type: "peaking", gain: i }, { f: e.F1K, type: "peaking", gain: u }, { f: e.F2K, type: "peaking", gain: a }, { f: e.F4K, type: "peaking", gain: l }, { f: e.F8K, type: "peaking", gain: h }, { f: e.F16K, type: "highshelf", gain: m }].map(function(K) {
        var f = _().context.audioContext.createBiquadFilter();
        return f.type = K.type, P.setParamValue(f.Q, 1), f.frequency.value = K.f, P.setParamValue(f.gain, K.gain), f;
      });
      (y = n.call(this, b[0], b[b.length - 1]) || this).bands = b, y.bandsMap = {};
      for (var d = 0; d < y.bands.length; d++) {
        var w = y.bands[d];
        d > 0 && y.bands[d - 1].connect(w), y.bandsMap[w.frequency.value] = w;
      }
      return y;
    }
    y = n.call(this, null) || this;
  }
  return g(e, n), e.prototype.setGain = function(t, s) {
    if (s === void 0 && (s = 0), !this.bandsMap[t]) throw new Error("No band found for frequency ".concat(t));
    P.setParamValue(this.bandsMap[t].gain, s);
  }, e.prototype.getGain = function(t) {
    if (!this.bandsMap[t]) throw new Error("No band found for frequency ".concat(t));
    return this.bandsMap[t].gain.value;
  }, Object.defineProperty(e.prototype, "f32", { get: function() {
    return this.getGain(e.F32);
  }, set: function(t) {
    this.setGain(e.F32, t);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "f64", { get: function() {
    return this.getGain(e.F64);
  }, set: function(t) {
    this.setGain(e.F64, t);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "f125", { get: function() {
    return this.getGain(e.F125);
  }, set: function(t) {
    this.setGain(e.F125, t);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "f250", { get: function() {
    return this.getGain(e.F250);
  }, set: function(t) {
    this.setGain(e.F250, t);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "f500", { get: function() {
    return this.getGain(e.F500);
  }, set: function(t) {
    this.setGain(e.F500, t);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "f1k", { get: function() {
    return this.getGain(e.F1K);
  }, set: function(t) {
    this.setGain(e.F1K, t);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "f2k", { get: function() {
    return this.getGain(e.F2K);
  }, set: function(t) {
    this.setGain(e.F2K, t);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "f4k", { get: function() {
    return this.getGain(e.F4K);
  }, set: function(t) {
    this.setGain(e.F4K, t);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "f8k", { get: function() {
    return this.getGain(e.F8K);
  }, set: function(t) {
    this.setGain(e.F8K, t);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "f16k", { get: function() {
    return this.getGain(e.F16K);
  }, set: function(t) {
    this.setGain(e.F16K, t);
  }, enumerable: !1, configurable: !0 }), e.prototype.reset = function() {
    this.bands.forEach(function(t) {
      P.setParamValue(t.gain, 0);
    });
  }, e.prototype.destroy = function() {
    this.bands.forEach(function(t) {
      t.disconnect();
    }), this.bands = null, this.bandsMap = null;
  }, e.F32 = 32, e.F64 = 64, e.F125 = 125, e.F250 = 250, e.F500 = 500, e.F1K = 1e3, e.F2K = 2e3, e.F4K = 4e3, e.F8K = 8e3, e.F16K = 16e3, e;
}(L), DistortionFilter: function(n) {
  function e(t) {
    t === void 0 && (t = 0);
    var s = this;
    if (!_().useLegacy) {
      var o = _().context.audioContext.createWaveShaper();
      return (s = n.call(this, o) || this)._distortion = o, s.amount = t, s;
    }
    s = n.call(this, null) || this;
  }
  return g(e, n), Object.defineProperty(e.prototype, "amount", { get: function() {
    return this._amount;
  }, set: function(t) {
    this._amount = t;
    for (var s, o = 1e3 * t, r = 44100, i = new Float32Array(r), u = Math.PI / 180, a = 0; a < r; ++a) s = 2 * a / r - 1, i[a] = (3 + o) * s * 20 * u / (Math.PI + o * Math.abs(s));
    this._distortion.curve = i, this._distortion.oversample = "4x";
  }, enumerable: !1, configurable: !0 }), e.prototype.destroy = function() {
    this._distortion = null, n.prototype.destroy.call(this);
  }, e;
}(L), StereoFilter: function(n) {
  function e(t) {
    t === void 0 && (t = 0);
    var s = this;
    if (!_().useLegacy) {
      var o, r, i, u = _().context.audioContext;
      return u.createStereoPanner ? i = o = u.createStereoPanner() : ((r = u.createPanner()).panningModel = "equalpower", i = r), (s = n.call(this, i) || this)._stereo = o, s._panner = r, s.pan = t, s;
    }
    s = n.call(this, null) || this;
  }
  return g(e, n), Object.defineProperty(e.prototype, "pan", { get: function() {
    return this._pan;
  }, set: function(t) {
    this._pan = t, this._stereo ? P.setParamValue(this._stereo.pan, t) : this._panner.setPosition(t, 0, 1 - Math.abs(t));
  }, enumerable: !1, configurable: !0 }), e.prototype.destroy = function() {
    n.prototype.destroy.call(this), this._stereo = null, this._panner = null;
  }, e;
}(L), ReverbFilter: function(n) {
  function e(t, s, o) {
    t === void 0 && (t = 3), s === void 0 && (s = 2), o === void 0 && (o = !1);
    var r = this;
    if (!_().useLegacy) return (r = n.call(this, null) || this)._seconds = r._clamp(t, 1, 50), r._decay = r._clamp(s, 0, 100), r._reverse = o, r._rebuild(), r;
    r = n.call(this, null) || this;
  }
  return g(e, n), e.prototype._clamp = function(t, s, o) {
    return Math.min(o, Math.max(s, t));
  }, Object.defineProperty(e.prototype, "seconds", { get: function() {
    return this._seconds;
  }, set: function(t) {
    this._seconds = this._clamp(t, 1, 50), this._rebuild();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "decay", { get: function() {
    return this._decay;
  }, set: function(t) {
    this._decay = this._clamp(t, 0, 100), this._rebuild();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "reverse", { get: function() {
    return this._reverse;
  }, set: function(t) {
    this._reverse = t, this._rebuild();
  }, enumerable: !1, configurable: !0 }), e.prototype._rebuild = function() {
    for (var t, s = _().context.audioContext, o = s.sampleRate, r = o * this._seconds, i = s.createBuffer(2, r, o), u = i.getChannelData(0), a = i.getChannelData(1), l = 0; l < r; l++) t = this._reverse ? r - l : l, u[l] = (2 * Math.random() - 1) * Math.pow(1 - t / r, this._decay), a[l] = (2 * Math.random() - 1) * Math.pow(1 - t / r, this._decay);
    var h = _().context.audioContext.createConvolver();
    h.buffer = i, this.init(h);
  }, e;
}(L), MonoFilter: function(n) {
  function e() {
    var t = this;
    if (!_().useLegacy) {
      var s = _().context.audioContext, o = s.createChannelSplitter(), r = s.createChannelMerger();
      return r.connect(o), (t = n.call(this, r, o) || this)._merger = r, t;
    }
    t = n.call(this, null) || this;
  }
  return g(e, n), e.prototype.destroy = function() {
    this._merger.disconnect(), this._merger = null, n.prototype.destroy.call(this);
  }, e;
}(L), StreamFilter: function(n) {
  function e() {
    var t = this;
    if (!_().useLegacy) {
      var s = _().context.audioContext, o = s.createMediaStreamDestination(), r = s.createMediaStreamSource(o.stream);
      return (t = n.call(this, o, r) || this)._stream = o.stream, t;
    }
    t = n.call(this, null) || this;
  }
  return g(e, n), Object.defineProperty(e.prototype, "stream", { get: function() {
    return this._stream;
  }, enumerable: !1, configurable: !0 }), e.prototype.destroy = function() {
    this._stream = null, n.prototype.destroy.call(this);
  }, e;
}(L), TelephoneFilter: function(n) {
  function e() {
    if (!_().useLegacy) {
      var t = _().context.audioContext, s = t.createBiquadFilter(), o = t.createBiquadFilter(), r = t.createBiquadFilter(), i = t.createBiquadFilter();
      return s.type = "lowpass", P.setParamValue(s.frequency, 2e3), o.type = "lowpass", P.setParamValue(o.frequency, 2e3), r.type = "highpass", P.setParamValue(r.frequency, 500), i.type = "highpass", P.setParamValue(i.frequency, 500), s.connect(o), o.connect(r), r.connect(i), n.call(this, s, i) || this;
    }
    n.call(this, null);
  }
  return g(e, n), e;
}(L) }, Fe = { __proto__: null, supported: H }, M = function(n) {
  return se = n, n;
}(new ke());
"extensions" in ae ? le.add(J) : te.registerPlugin(J);
class F {
  constructor(e, t, s, o, r, i, u, a) {
    this.fn = e, this.buf = t, this.start_ms = s, this.end_ms = o, this.ret_ms = r, this.volume = i, this.pan = u, this.stt = a ? new B() : new Se(), a && this.addSnd(a);
  }
  static #e = 1;
  stt;
  loop = !1;
  addSnd(e) {
    switch (this.loop = e.loop, this.stt.onLoad(this), this.pan !== 0 && (e.filters = [new q.StereoFilter(this.pan)]), this.setVol = (t) => e.volume = t, this.tw = () => new de(e), this.onPlayEnd = () => {
      this.stt.onPlayEnd(this.buf), this.#s();
    }, this.stop = () => {
      e.stop(), this.#s();
    }, this.destroy = () => e.destroy(), this.buf) {
      // セリフ再生中はBGM音量を絞る
      case ee:
        const t = Number(c.getVal("sys:sn.sound.BGM.vol_mul_talking") ?? 1);
        if (t === 1) break;
        F.#e = t;
        const s = W[j];
        s && s.setVol(this.volume * F.#e);
        break;
      case j:
        e.volume = this.volume * F.#e;
        break;
    }
  }
  #s = () => {
    if (this.#s = () => {
    }, F.#e === 1 || this.buf !== ee) return;
    F.#e = 1;
    const e = W[j];
    e && e.setVol(this.volume * F.#e);
  };
  setVol(e) {
  }
  tw() {
  }
  onPlayEnd() {
  }
  stop() {
  }
  destroy() {
  }
}
let Z, c, k, Q, W, T;
const j = "BGM", v = "SE", ee = "VOICE";
class p {
  constructor(e, t, s) {
    this.hArg = e, this.buf = t, this.fn = s;
    const o = E(e, "start_ms", 0), r = E(e, "end_ms", p.#s), i = E(e, "ret_ms", 0), u = E(e, "pan", 0), a = E(e, "speed", 1);
    if (o < 0) throw `[playse] start_ms:${o} が負の値です`;
    if (i < 0) throw `[playse] ret_ms:${i} が負の値です`;
    if (0 < r) {
      if (r <= o) throw `[playse] start_ms:${o} >= end_ms:${r} は異常値です`;
      if (r <= i) throw `[playse] ret_ms:${i} >= end_ms:${r} は異常値です`;
    }
    const l = "const.sn.sound." + t + ".";
    c.setVal_Nochk("save", l + "fn", s);
    const h = p.getVol(e, 1);
    c.setVal_Nochk("save", l + "volume", h);
    const m = h * Number(c.getVal("sys:" + l + "volume", 1)), y = S(e, "loop", !1);
    y ? (p.#e[t] = s, c.setVal_Nochk("save", "const.sn.loopPlaying", JSON.stringify(p.#e))) : p.delLoopPlay(t), c.setVal_Nochk("save", l + "start_ms", o), c.setVal_Nochk("save", l + "end_ms", r), c.setVal_Nochk("save", l + "ret_ms", i), c.setVal_Nochk("tmp", l + "playing", !0), c.flush();
    const b = M.find(s);
    this.#t = new F(
      s,
      t,
      o,
      r,
      i,
      m,
      u,
      b
    );
    const d = {
      loop: y,
      speed: a,
      volume: m,
      loaded: (f, x) => {
        if (!this.#t.stt.isDestroy) {
          if (f) {
            k.errScript(`ロード失敗です SndBuf fn:${s} ${f}`, !1);
            return;
          }
          x && (this.#t.addSnd(x), u !== 0 && (x.filters = [new q.StereoFilter(u)]), e.fnc?.());
        }
      }
    };
    let w = "";
    if (0 < o || r < p.#s) {
      w = `${s};${o};${r};${i}`;
      const f = (d.sprites ??= {})[w] = {
        start: o / 1e3,
        end: r / 1e3
      };
      d.preload = !0;
      const x = d.loaded;
      d.loaded = (V, N) => {
        if (this.#t.stt.isDestroy) return;
        x(V, N);
        const U = N, G = U.duration;
        f.end < 0 && (f.end += G, U.removeSprites(w), U.addSprites(w, f)), f.end <= f.start && k.errScript(`[playse] end_ms:${r}(${f.end * 1e3}) >= start_ms:${o} は異常値です`), f.end * 1e3 <= i && k.errScript(`[playse] end_ms:${r}(${f.end * 1e3}) <= ret_ms:${i} は異常値です`), G <= f.start && k.errScript(`[playse] 音声ファイル再生時間:${G * 1e3} <= start_ms:${o} は異常値です`), r !== p.#s && G <= f.end && k.errScript(`[playse] 音声ファイル再生時間:${G * 1e3} <= end_ms:${r} は異常値です`), U.play(w, (ue) => d.complete?.(ue));
      };
    } else d.autoPlay = !0;
    if (y ? i !== 0 && (d.loop = !1, d.complete = async (f) => {
      const x = f.duration, V = i / 1e3, N = r / 1e3;
      x <= V && k.errScript(`[playse] 音声ファイル再生時間:${x * 1e3} <=  ret_ms:${i} は異常値です`), await f.play({
        // 一周目はループなし、なのでキャッシュされてる
        ...d,
        start: V,
        end: N < 0 ? N + x : N,
        // 負の値は末尾から
        //	speed,		// 重複
        loop: !0,
        //	volume,		// 重複
        //-	muted?: boolean;
        filters: u !== 0 ? [new q.StereoFilter(u)] : []
        //-	complete?: CompleteCallback;
        //-	loaded?: LoadedCallback;
        //-	singleInstance?: boolean;
      });
    }) : d.complete = () => {
      Y(this.#t, t), this.#t.onPlayEnd();
    }, this.#n(), b) {
      if (b.volume = m, w) this.#o(s, d);
      else if (b.isPlayable) {
        const f = b.options.source;
        !(f instanceof ArrayBuffer) || f.byteLength === 0 ? b.play(d) : this.#t.addSnd($.from({
          ...d,
          url: b.options.url,
          source: f
        })), u !== 0 && (b.filters = [new q.StereoFilter(u)]);
      }
      this.needLoad = !1;
      return;
    }
    if (this.needLoad = S(e, "join", !0)) {
      pe();
      const f = d.loaded;
      d.loaded = (x, V) => {
        this.#t.stt.isDestroy || f(x, V), he();
      };
    }
    this.#o(s, d);
  }
  static #e = {};
  static init(e, t, s, o, r) {
    p.#e = {}, Z = e, c = t, k = s, Q = o, W = r;
  }
  static setEvtMng(e) {
    T = e;
  }
  static delLoopPlay(e) {
    delete p.#e[e];
    const t = "const.sn.sound." + e + ".";
    c.setVal_Nochk("save", t + "fn", ""), c.setVal_Nochk("save", "const.sn.loopPlaying", JSON.stringify(p.#e)), c.flush();
  }
  static getVol(e, t) {
    const s = E(e, "volume", t);
    return s < 0 ? 0 : s > 1 ? 1 : s;
  }
  static xchgbuf({ buf: e = v, buf2: t = v }) {
    if (e === t) throw `[xchgbuf] buf:${e} が同じ値です`;
    const s = "const.sn.sound." + e + ".", o = Number(c.getVal("save:" + s + "volume")), r = String(c.getVal("save:" + s + "fn")), i = "const.sn.sound." + t + ".", u = Number(c.getVal("save:" + i + "volume")), a = String(c.getVal("save:" + i + "fn"));
    c.setVal_Nochk("save", s + "volume", u), c.setVal_Nochk("save", i + "volume", o), c.setVal_Nochk("save", s + "fn", a), c.setVal_Nochk("save", i + "fn", r), e in p.#e != t in p.#e && (e in p.#e ? (delete p.#e[e], p.#e[t] = r) : (delete p.#e[t], p.#e[e] = a), c.setVal_Nochk("save", "const.sn.loopPlaying", JSON.stringify(p.#e))), c.flush();
  }
  static #s = 999e3;
  #t;
  needLoad;
  #n = () => {
    M.volumeAll = Number(c.getVal("sys:sn.sound.global_volume", 1)), this.#n = () => {
    };
  };
  #o(e, t) {
    const s = Z.searchPath(e, ce.SOUND);
    if (!s.endsWith(".bin")) {
      t.url = s, $.from(t);
      return;
    }
    new te().add({ name: e, url: s, xhrType: O.XHR_RESPONSE_TYPE.BUFFER }).use(async (o, r) => {
      try {
        o.data = await Q.decAB(o.data);
      } catch (i) {
        k.errScript(`Sound ロード失敗ですc fn:${o.name} ${i}`, !1);
      }
      r();
    }).load((o, r) => {
      t.source = r[e]?.data, $.from(t);
    });
  }
  setVol(e) {
    this.#t.setVol(e);
  }
  ws = (e) => this.#t.stt.ws(this.#t, e);
  stopse({ buf: e = v }) {
    Y(this.#t, e), this.#t.stt.stopse(this.#t);
  }
  fade = (e) => this.#t.stt.fade(this.#t, e);
  wf = (e) => this.#t.stt.wf(this.#t, e);
  stopfadese = (e) => this.#t.stt.stopfadese(this.#t, e);
}
function Y({ loop: n }, e) {
  if (n) {
    p.delLoopPlay(e);
    return;
  }
  const t = "const.sn.sound." + e + ".";
  c.setVal_Nochk("tmp", t + "playing", !1), c.flush();
}
function D(n) {
  n.stop().end();
}
class Se {
  onLoad(e) {
    e.stt = new B();
  }
  stopse(e) {
    e.stt = new C(e, !1);
  }
  ws = () => !1;
  onPlayEnd() {
  }
  // ok
  fade() {
  }
  // ok
  wf = () => !1;
  // ok
  compFade() {
  }
  // ok
  stopfadese() {
  }
  // ok
  isDestroy = !1;
}
class B {
  onLoad() {
  }
  // ok
  stopse(e) {
    e.stt = new C(e);
  }
  ws(e, t) {
    if (e.loop) return !1;
    const { buf: s = v } = t, o = S(t, "stop", !0);
    return S(t, "canskip", !1), T.waitEvent("buf:" + s, t, () => {
      Y(e, s), e.onPlayEnd(), o ? e.stt.stopse(e) : e.stt.onPlayEnd = () => {
      };
    }) ? (e.stt = new Le(), !0) : !1;
  }
  onPlayEnd() {
  }
  // ok
  fade(e, t) {
    const { buf: s = v } = t, r = "const.sn.sound." + s + "." + "volume", i = p.getVol(t, NaN);
    c.setVal_Nochk("save", r, i);
    const u = i * Number(c.getVal("sys:" + r, 1)), a = S(t, "stop", i === 0);
    a && p.delLoopPlay(s), c.flush();
    const l = E(t, "time", NaN), h = E(t, "delay", 0);
    if (l === 0 && h === 0 || T.isSkipping) {
      e.setVol(u), e.stt = a ? new C(e) : new B();
      return;
    }
    const m = e.tw();
    m && (fe.setTwProp(m, t).to({ volume: u }, l).onComplete(() => {
      _e(m), e.stt.compFade(s), e.stt = a ? new C(e) : new B();
    }).start(), e.stt = new Ce(m));
  }
  wf = () => !1;
  // ok
  compFade() {
  }
  // ok
  stopfadese() {
  }
  // ok
  isDestroy = !1;
}
class Le {
  onLoad() {
  }
  // ok
  stopse(e) {
    e.stt = new C(e);
  }
  ws = () => !1;
  // ok
  onPlayEnd(e) {
    T.breakEvent("buf:" + e);
  }
  fade() {
  }
  // ok
  wf = () => !1;
  // ok
  compFade() {
  }
  // ok
  stopfadese() {
  }
  // ok
  isDestroy = !1;
}
class Ce {
  constructor(e) {
    this.tw = e;
  }
  onLoad() {
  }
  // ok
  stopse(e) {
    D(this.tw), e.stt = new C(e);
  }
  // 順番厳守
  ws = () => !1;
  // ok ?
  onPlayEnd() {
  }
  // ok
  fade() {
  }
  // ok
  wf(e, t) {
    const { buf: s = v } = t;
    return S(t, "canskip", !1), T.waitEvent("buf:" + s, t, () => D(this.tw)) ? (e.stt = new Ve(this.tw), !0) : !1;
  }
  compFade() {
  }
  // ok
  stopfadese = () => D(this.tw);
  isDestroy = !1;
}
class Ve {
  constructor(e) {
    this.tw = e;
  }
  onLoad() {
  }
  // ok
  stopse(e) {
    D(this.tw), e.stt = new C(e);
  }
  ws = () => !1;
  // ok
  onPlayEnd() {
  }
  // ok
  fade() {
  }
  // ok
  wf = () => !1;
  // ok
  compFade(e) {
    T.breakEvent("buf:" + e);
  }
  stopfadese = () => D(this.tw);
  isDestroy = !1;
}
class C {
  constructor(e, t = !0) {
    this.si = e, this.stop = t, t && (e.stop(), e.loop && (e.destroy(), e.destroy = () => {
    }));
  }
  onLoad() {
  }
  // ok
  stopse() {
  }
  // ok
  ws = () => !1;
  // ok
  onPlayEnd() {
  }
  // ok
  fade() {
  }
  // ok
  wf = () => !1;
  // ok
  compFade() {
  }
  // ok
  stopfadese() {
  }
  // ok
  isDestroy = !0;
}
class Te {
  constructor(e, t, s, o, r) {
    this.val = s, t.volume = (i) => this.#t(i), t.fadebgm = (i) => this.#l(i), t.fadeoutbgm = (i) => this.#o(i), t.fadeoutse = (i) => this.#d(i), t.fadese = (i) => this.#i(i), t.playbgm = (i) => this.#c(i), t.playse = (i) => this.#a(i), t.stop_allse = () => this.#r(), t.stopbgm = (i) => this.#_(i), t.stopse = (i) => this.#u(i), t.wb = (i) => this.#y(i), t.wf = (i) => this.#f(i), t.stopfadese = (i) => this.#p(i), t.wl = (i) => this.#m(i), t.ws = (i) => this.#h(i), t.xchgbuf = (i) => this.#b(i), s.setVal_Nochk("save", "const.sn.loopPlaying", "{}"), s.setVal_Nochk("tmp", "const.sn.sound.codecs", JSON.stringify(Fe.supported)), p.init(e, s, o, r, this.#e), M.disableAutoPause = !0;
  }
  #e = {};
  #s;
  setEvtMng(e) {
    this.#s = e, p.setEvtMng(e);
  }
  setNoticeChgVolume(e, t) {
    this.val.defValTrg("sys:sn.sound.global_volume", (s, o) => e(M.volumeAll = Number(o))), this.val.defValTrg("sys:sn.sound.movie_volume", (s, o) => t(Number(o))), this.val.setVal_Nochk("sys", "sn.sound.global_volume", this.val.getVal("sys:sn.sound.global_volume", 1)), this.val.setVal_Nochk("sys", "sn.sound.movie_volume", this.val.getVal("sys:sn.sound.movie_volume", 1));
  }
  //MARK: 音量設定（独自拡張）
  #t(e) {
    const { buf: t = v } = e, s = "const.sn.sound." + t + ".volume", o = this.#n(e, 1);
    return Number(this.val.getVal("sys:" + s)) === o ? !1 : (this.val.setVal_Nochk("sys", s, o), this.val.flush(), e.time = 0, e.volume = Number(this.val.getVal("save:" + s)), this.#i(e));
  }
  #n(e, t) {
    const s = E(e, "volume", t);
    return s < 0 ? 0 : s > 1 ? 1 : s;
  }
  //MARK: BGM/効果音のフェードアウト（loadから使うのでマクロ化禁止）
  #o(e) {
    return e.volume = 0, this.#l(e);
  }
  //MARK: 効果音のフェードアウト（loadから使うのでマクロ化禁止）
  #d(e) {
    return e.volume = 0, this.#i(e);
  }
  //MARK: BGMのフェード（loadから使うのでマクロ化禁止）
  #l(e) {
    return e.buf = j, this.#i(e);
  }
  //MARK: 効果音のフェード
  #i(e) {
    const { buf: t = v } = e;
    return this.#p(e), this.#e[t]?.fade(e), !1;
  }
  //MARK: BGM の演奏
  #c(e) {
    return e.buf = j, e.canskip = !1, S(e, "loop", !0), this.#a(e);
  }
  //MARK: 効果音の再生
  #a(e) {
    const { buf: t = v, fn: s } = e;
    if (this.#u({ buf: t }), !s) throw `fnは必須です buf:${t}`;
    return S(e, "canskip", !0) && this.#s.isSkipping ? !1 : (this.#e[t] = new p(e, t, s)).needLoad;
  }
  clearCache() {
    M.removeAll();
  }
  //MARK: 全効果音再生の停止
  #r() {
    for (const e of Object.keys(this.#e)) this.#u({ buf: e });
    return this.#e = {}, M.stopAll(), !1;
  }
  //MARK: BGM 演奏の停止（loadから使うのでマクロ化禁止）
  #_(e) {
    return e.buf = j, this.#u(e);
  }
  //MARK: 効果音再生の停止
  #u(e) {
    const { buf: t = v } = e;
    return this.#e[t]?.stopse(e), !1;
  }
  //MARK: BGM フェードの終了待ち
  #y(e) {
    return e.buf = j, this.#f(e);
  }
  //MARK: 効果音フェードの終了待ち
  #f(e) {
    const { buf: t = v } = e;
    return this.#e[t]?.wf(e);
  }
  //MARK: 音声フェードの停止
  #p(e) {
    const { buf: t = v } = e;
    return this.#e[t]?.stopfadese(e), !1;
  }
  //MARK: BGM 再生の終了待ち
  #m(e) {
    return e.buf = j, this.#h(e);
  }
  //MARK: 効果音再生の終了待ち
  #h(e) {
    const { buf: t = v } = e;
    return this.#e[t]?.ws(e);
  }
  //MARK: 再生トラックの交換
  #b(e) {
    const { buf: t = v, buf2: s = v } = e;
    if (t === s) return !1;
    const o = this.#e[t], r = this.#e[s];
    return o ? this.#e[s] = o : delete this.#e[s], r ? this.#e[t] = r : delete this.#e[t], p.xchgbuf(e), !1;
  }
  //MARK: しおりの読込（BGM状態復元）
  playLoopFromSaveObj(e) {
    const t = String(this.val.getVal("save:const.sn.loopPlaying", "{}"));
    if (t === "{}")
      return this.#r(), this.clearCache(), [];
    const s = JSON.parse(t);
    if (e)
      this.#r(), this.clearCache();
    else for (const [o, r] of Object.entries(this.#e))
      o in s || r?.stopse({ buf: o });
    return Object.entries(s).map(([o, r]) => new Promise((i) => {
      const u = this.#e[o];
      if (!e && u && u.fn === r) {
        i();
        return;
      }
      const a = "save:const.sn.sound." + o + ".", l = {
        fn: r,
        buf: o,
        join: !1,
        loop: !0,
        volume: Number(this.val.getVal(a + "volume")),
        start_ms: Number(this.val.getVal(a + "start_ms")),
        end_ms: Number(this.val.getVal(a + "end_ms")),
        ret_ms: Number(this.val.getVal(a + "ret_ms")),
        fnc: i
        // loaded
      };
      l.buf === j ? this.#c(l) : this.#a(l);
    }));
  }
  destroy() {
    this.#r(), this.clearCache();
  }
}
export {
  Te as SoundMng
};
//# sourceMappingURL=SoundMng.js.map
