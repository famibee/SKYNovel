import { l as R, m as O, T as M, n as ue, k as j, e as A, S as ae, L as le } from "./app2.js";
import { C as ce } from "./CmnTween.js";
import { a as L, T as pe, r as he } from "./Reading.js";
var ee;
function _() {
  return ee;
}
var te = function(n, e) {
  return (te = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, s) {
    t.__proto__ = s;
  } || function(t, s) {
    for (var o in s) Object.prototype.hasOwnProperty.call(s, o) && (t[o] = s[o]);
  })(n, e);
};
function b(n, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  function t() {
    this.constructor = n;
  }
  te(n, e), n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var V = function() {
  return (V = Object.assign || function(n) {
    for (var e, t = 1, s = arguments.length; t < s; t++) for (var o in e = arguments[t]) Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o]);
    return n;
  }).apply(this, arguments);
}, se = ["mp3", "ogg", "oga", "opus", "mpeg", "wav", "m4a", "aiff", "wma", "mid", "caf"], K = {};
function fe(n) {
  var e = V({ m4a: "audio/mp4", oga: "audio/ogg", opus: 'audio/ogg; codecs="opus"', caf: 'audio/x-caf; codecs="opus"' }, n || {}), t = document.createElement("audio"), s = {}, o = /^no$/;
  se.forEach(function(i) {
    var r = t.canPlayType("audio/".concat(i)).replace(o, ""), u = e[i] ? t.canPlayType(e[i]).replace(o, "") : "";
    s[i] = !!r || !!u;
  }), Object.assign(K, s);
}
fe();
var de = /\.(\{([^\}]+)\})(\?.*)?$/;
function ne(n) {
  var e = de, t = typeof n == "string" ? n : n.url;
  if (!e.test(t)) return t;
  for (var s = e.exec(t), o = s[2].split(","), i = o[o.length - 1], r = 0, u = o.length; r < u; r++) {
    var a = o[r];
    if (K[a]) {
      i = a;
      break;
    }
  }
  var l = t.replace(s[1], i);
  if (typeof n != "string") {
    var h = n;
    h.extension = i, h.url = l;
  }
  return l;
}
var q = se.filter(function(n) {
  return K[n];
}), oe = function() {
  function n() {
  }
  return n.add = function() {
    n.setLegacy(_().useLegacy);
  }, n.setLegacy = function(e) {
    e ? q.forEach(function(t) {
      O.setExtensionXhrType(t, O.XHR_RESPONSE_TYPE.DEFAULT), O.setExtensionLoadType(t, O.LOAD_TYPE.AUDIO);
    }) : q.forEach(function(t) {
      O.setExtensionXhrType(t, O.XHR_RESPONSE_TYPE.BUFFER), O.setExtensionLoadType(t, O.LOAD_TYPE.XHR);
    });
  }, n.pre = function(e, t) {
    ne(e), t();
  }, n.use = function(e, t) {
    e.data && q.indexOf(e.extension) > -1 ? e.sound = _().add(e.name, { loaded: t, preload: !0, url: e.url, source: e.data }) : t();
  }, n.extension = "loader", n;
}(), _e = 0, ye = function(n) {
  function e(t) {
    var s = n.call(this) || this;
    return s.id = _e++, s.init(t), s;
  }
  return b(e, n), e.prototype.set = function(t, s) {
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
    var o = t.volume * (t.muted ? 0 : 1), i = s.volume * (s.muted ? 0 : 1), r = this._volume * (this._muted ? 0 : 1);
    this._source.volume = r * o * i, this._source.playbackRate = this._speed * t.speed * s.speed;
  }, e.prototype.refreshPaused = function() {
    var t = this._media.context, s = this._media.parent, o = this._paused || s.paused || t.paused;
    o !== this._pausedReal && (this._pausedReal = o, o ? (this._internalStop(), this.emit("paused")) : (this.emit("resumed"), this.play({ start: this._source.currentTime, end: this._end, volume: this._volume, speed: this._speed, loop: this._loop })), this.emit("pause", o));
  }, e.prototype.play = function(t) {
    var s = this, o = t.start, i = t.end, r = t.speed, u = t.loop, a = t.volume, l = t.muted;
    this._speed = r, this._volume = a, this._loop = !!u, this._muted = l, this.refresh(), this.loop && i !== null && (this.loop = !1), this._start = o, this._end = i || this._duration, this._start = Math.max(0, this._start - e.PADDING), this._end = Math.min(this._end + e.PADDING, this._duration), this._source.onloadedmetadata = function() {
      s._source && (s._source.currentTime = o, s._source.onloadedmetadata = null, s.emit("progress", o, s._duration), M.shared.add(s._onUpdate, s));
    }, this._source.onended = this._onComplete.bind(this), this._source.play(), this.emit("start");
  }, e.prototype._onUpdate = function() {
    this.emit("progress", this.progress, this._duration), this._source.currentTime >= this._end && !this._source.loop && this._onComplete();
  }, e.prototype._onComplete = function() {
    M.shared.remove(this._onUpdate, this), this._internalStop(), this.emit("progress", 1, this._duration), this.emit("end", this);
  }, e.prototype.destroy = function() {
    M.shared.remove(this._onUpdate, this), this.removeAllListeners();
    var t = this._source;
    t && (t.onended = null, t.onplay = null, t.onpause = null, this._internalStop()), this._source = null, this._speed = 1, this._volume = 1, this._loop = !1, this._end = null, this._start = 0, this._duration = 0, this._playing = !1, this._pausedReal = !1, this._paused = !1, this._muted = !1, this._media && (this._media.context.off("refresh", this.refresh, this), this._media.context.off("refreshPaused", this.refreshPaused, this), this._media = null);
  }, e.prototype.toString = function() {
    return "[HTMLAudioInstance id=".concat(this.id, "]");
  }, e.PADDING = 0.1, e;
}(R), me = function(n) {
  function e() {
    return n !== null && n.apply(this, arguments) || this;
  }
  return b(e, n), e.prototype.init = function(t) {
    this.parent = t, this._source = t.options.source || new Audio(), t.url && (this._source.src = t.url);
  }, e.prototype.create = function() {
    return new ye(this);
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
      var i = function() {
        a(), o.isLoaded = !0;
        var h = o.autoPlayStart();
        t && t(null, o, h);
      }, r = function() {
        a(), t && t(new Error("Sound loading has been aborted"));
      }, u = function() {
        a();
        var h = "Failed to load audio element (code: ".concat(s.error.code, ")");
        t && t(new Error(h));
      }, a = function() {
        s.removeEventListener("canplaythrough", i), s.removeEventListener("load", i), s.removeEventListener("abort", r), s.removeEventListener("error", u);
      };
      s.addEventListener("canplaythrough", i, !1), s.addEventListener("load", i, !1), s.addEventListener("abort", r, !1), s.addEventListener("error", u, !1), s.load();
    } else t(new Error("sound.url or sound.source must be set"));
    else {
      o.isLoaded = !0;
      var l = o.autoPlayStart();
      t && setTimeout(function() {
        t(null, o, l);
      }, 0);
    }
  }, e;
}(R), ge = function() {
  function n(e, t) {
    this.parent = e, Object.assign(this, t), this.duration = this.end - this.start;
  }
  return n.prototype.play = function(e) {
    return this.parent.play({ complete: e, speed: this.speed || this.parent.speed, end: this.end, start: this.start, loop: this.loop });
  }, n.prototype.destroy = function() {
    this.parent = null;
  }, n;
}(), v = function() {
  function n() {
  }
  return n.setParamValue = function(e, t) {
    if (e.setValueAtTime) {
      var s = _().context;
      e.setValueAtTime(t, s.audioContext.currentTime);
    } else e.value = t;
    return t;
  }, n;
}(), be = 0, ve = function(n) {
  function e(t) {
    var s = n.call(this) || this;
    return s.id = be++, s._media = null, s._paused = !1, s._muted = !1, s._elapsed = 0, s.init(t), s;
  }
  return b(e, n), e.prototype.set = function(t, s) {
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
      var o = t.volume * (t.muted ? 0 : 1), i = s.volume * (s.muted ? 0 : 1), r = this._volume * (this._muted ? 0 : 1);
      v.setParamValue(this._gain.gain, r * i * o), v.setParamValue(this._source.playbackRate, this._speed * s.speed * t.speed), this.applyFilters();
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
    var s = t.start, o = t.end, i = t.speed, r = t.loop, u = t.volume, a = t.muted, l = t.filters;
    this._paused = !1;
    var h = this._media.nodes.cloneBufferSource(), y = h.source, m = h.gain;
    this._source = y, this._gain = m, this._speed = i, this._volume = u, this._loop = !!r, this._muted = a, this._filters = l, this.refresh();
    var g = this._source.buffer.duration;
    this._duration = g, this._end = o, this._lastUpdate = this._now(), this._elapsed = s, this._source.onended = this._onComplete.bind(this), this._loop ? (this._source.loopEnd = o, this._source.loopStart = s, this._source.start(0, s)) : o ? this._source.start(0, s, o - s) : this._source.start(0, s), this.emit("start"), this._update(!0), this.enableTicker(!0);
  }, e.prototype.enableTicker = function(t) {
    M.shared.remove(this._updateListener, this), t && M.shared.add(this._updateListener, this);
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
        var i = this._source.playbackRate.value;
        this._elapsed += o * i, this._lastUpdate = s;
        var r = this._duration, u = void 0;
        if (this._source.loopStart) {
          var a = this._source.loopEnd - this._source.loopStart;
          u = (this._source.loopStart + this._elapsed % a) / r;
        } else u = this._elapsed % r / r;
        this._progress = u, this.emit("progress", this._progress, r);
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
}(R), ie = function() {
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
}(), Pe = function(n) {
  function e(t) {
    var s = this, o = t.audioContext, i = o.createBufferSource(), r = o.createGain(), u = o.createAnalyser();
    return i.connect(u), u.connect(r), r.connect(t.destination), (s = n.call(this, u, r) || this).context = t, s.bufferSource = i, s.gain = r, s.analyser = u, s;
  }
  return b(e, n), Object.defineProperty(e.prototype, "script", { get: function() {
    return this._script || (this._script = this.context.audioContext.createScriptProcessor(e.BUFFER_SIZE), this._script.connect(this.context.destination)), this._script;
  }, enumerable: !1, configurable: !0 }), e.prototype.destroy = function() {
    n.prototype.destroy.call(this), this.bufferSource.disconnect(), this._script && this._script.disconnect(), this.gain.disconnect(), this.analyser.disconnect(), this.bufferSource = null, this._script = null, this.gain = null, this.analyser = null, this.context = null;
  }, e.prototype.cloneBufferSource = function() {
    var t = this.bufferSource, s = this.context.audioContext.createBufferSource();
    s.buffer = t.buffer, v.setParamValue(s.playbackRate, t.playbackRate.value), s.loop = t.loop;
    var o = this.context.audioContext.createGain();
    return s.connect(o), o.connect(this.destination), { source: s, gain: o };
  }, Object.defineProperty(e.prototype, "bufferSize", { get: function() {
    return this.script.bufferSize;
  }, enumerable: !1, configurable: !0 }), e.BUFFER_SIZE = 0, e;
}(ie), xe = function() {
  function n() {
  }
  return n.prototype.init = function(e) {
    this.parent = e, this._nodes = new Pe(this.context), this._source = this._nodes.bufferSource, this.source = e.options.source;
  }, n.prototype.destroy = function() {
    this.parent = null, this._nodes.destroy(), this._nodes = null;
    try {
      this._source.buffer = null;
    } catch {
    }
    this._source = null, this.source = null;
  }, n.prototype.create = function() {
    return new ve(this);
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
    var s = this, o = function(i, r) {
      if (i) t && t(i);
      else {
        s.parent.isLoaded = !0, s.buffer = r;
        var u = s.parent.autoPlayStart();
        t && t(null, s.parent, u);
      }
    };
    e instanceof AudioBuffer ? o(null, e) : this.parent.context.decode(e, o);
  }, n;
}(), N = function() {
  function n(e, t) {
    this.media = e, this.options = t, this._instances = [], this._sprites = {}, this.media.init(this);
    var s = t.complete;
    this._autoPlayOptions = s ? { complete: s } : null, this.isLoaded = !1, this.isPlaying = !1, this.autoPlay = t.autoPlay, this.singleInstance = t.singleInstance, this.preload = t.preload || this.autoPlay, this.url = t.url, this.speed = t.speed, this.volume = t.volume, this.loop = t.loop, t.sprites && this.addSprites(t.sprites), this.preload && this._preload(t.loaded);
  }
  return n.from = function(e) {
    var t = {};
    return typeof e == "string" ? t.url = e : e instanceof ArrayBuffer || e instanceof AudioBuffer || e instanceof HTMLAudioElement ? t.source = e : t = e, (t = V({ autoPlay: !1, singleInstance: !1, url: null, source: null, preload: !1, volume: 1, speed: 1, complete: null, loaded: null, loop: !1 }, t)).url && (t.url = ne(t.url)), Object.freeze(t), new n(_().useLegacy ? new me() : new xe(), t);
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
    var i = new ge(this, t);
    return this._sprites[e] = i, i;
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
    if (typeof e == "string" ? s = { sprite: r = e, loop: this.loop, complete: t } : typeof e == "function" ? (s = {}).complete = e : s = e, (s = V({ complete: null, loaded: null, sprite: null, end: null, start: 0, volume: 1, speed: 1, muted: !1, loop: !1 }, s || {})).sprite) {
      var i = s.sprite, r = this._sprites[i];
      s.start = r.start + (s.start || 0), s.end = r.end, s.speed = r.speed || 1, s.loop = r.loop || s.loop, delete s.sprite;
    }
    if (s.offset && (s.start = s.offset), !this.isLoaded) return new Promise(function(a, l) {
      o.autoPlay = !0, o._autoPlayOptions = s, o._preload(function(h, y, m) {
        h ? l(h) : (s.loaded && s.loaded(h, y, m), a(m));
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
}(), we = function(n) {
  function e() {
    var t = n !== null && n.apply(this, arguments) || this;
    return t.speed = 1, t.muted = !1, t.volume = 1, t.paused = !1, t;
  }
  return b(e, n), e.prototype.refresh = function() {
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
}(R), Y = function(n) {
  function e() {
    var t = n.call(this, null, null) || this;
    t.autoPause = !0;
    var s = window, o = new e.AudioContext(), i = o.createDynamicsCompressor(), r = o.createAnalyser();
    return r.connect(i), i.connect(o.destination), t._input = r, t._output = o.destination, t._ctx = o, t._offlineCtx = new e.OfflineAudioContext(1, 2, s.OfflineAudioContext ? Math.max(8e3, Math.min(96e3, o.sampleRate)) : 44100), t.compressor = i, t.analyser = r, t.events = new R(), t.volume = 1, t.speed = 1, t.muted = !1, t.paused = !1, t._locked = o.state === "suspended" && ("ontouchstart" in globalThis || "onclick" in globalThis), t._locked && (t._unlock(), t._unlock = t._unlock.bind(t), document.addEventListener("mousedown", t._unlock, !0), document.addEventListener("touchstart", t._unlock, !0), document.addEventListener("touchend", t._unlock, !0)), t.onFocus = t.onFocus.bind(t), t.onBlur = t.onBlur.bind(t), globalThis.addEventListener("focus", t.onFocus), globalThis.addEventListener("blur", t.onBlur), t;
  }
  return b(e, n), e.prototype.onFocus = function() {
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
    var o = function(r) {
      s(new Error(r?.message || "Unable to decode file"));
    }, i = this._offlineCtx.decodeAudioData(t, function(r) {
      s(null, r);
    }, o);
    i && i.catch(o);
  }, e;
}(ie), Oe = function() {
  function n() {
    this.init();
  }
  return n.prototype.init = function() {
    return this.supported && (this._webAudioContext = new Y()), this._htmlAudioContext = new we(), this._sounds = {}, this.useLegacy = !this.supported, this;
  }, Object.defineProperty(n.prototype, "context", { get: function() {
    return this._context;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "filtersAll", { get: function() {
    return this.useLegacy ? [] : this._context.filters;
  }, set: function(e) {
    this.useLegacy || (this._context.filters = e);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "supported", { get: function() {
    return Y.AudioContext !== null;
  }, enumerable: !1, configurable: !0 }), n.prototype.add = function(e, t) {
    if (typeof e == "object") {
      var s = {};
      for (var o in e) {
        var i = this._getOptions(e[o], t);
        s[o] = this.add(o, i);
      }
      return s;
    }
    if (t instanceof N) return this._sounds[e] = t, t;
    var r = this._getOptions(t), u = N.from(r);
    return this._sounds[e] = u, u;
  }, n.prototype._getOptions = function(e, t) {
    var s;
    return s = typeof e == "string" ? { url: e } : e instanceof ArrayBuffer || e instanceof AudioBuffer || e instanceof HTMLAudioElement ? { source: e } : e, s = V(V({}, s), t || {});
  }, Object.defineProperty(n.prototype, "useLegacy", { get: function() {
    return this._useLegacy;
  }, set: function(e) {
    oe.setLegacy(e), this._useLegacy = e, this._context = !e && this.supported ? this._webAudioContext : this._htmlAudioContext;
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
}(), k = function() {
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
}(), B = { __proto__: null, EqualizerFilter: function(n) {
  function e(t, s, o, i, r, u, a, l, h, y) {
    t === void 0 && (t = 0), s === void 0 && (s = 0), o === void 0 && (o = 0), i === void 0 && (i = 0), r === void 0 && (r = 0), u === void 0 && (u = 0), a === void 0 && (a = 0), l === void 0 && (l = 0), h === void 0 && (h = 0), y === void 0 && (y = 0);
    var m = this;
    if (!_().useLegacy) {
      var g = [{ f: e.F32, type: "lowshelf", gain: t }, { f: e.F64, type: "peaking", gain: s }, { f: e.F125, type: "peaking", gain: o }, { f: e.F250, type: "peaking", gain: i }, { f: e.F500, type: "peaking", gain: r }, { f: e.F1K, type: "peaking", gain: u }, { f: e.F2K, type: "peaking", gain: a }, { f: e.F4K, type: "peaking", gain: l }, { f: e.F8K, type: "peaking", gain: h }, { f: e.F16K, type: "highshelf", gain: y }].map(function($) {
        var p = _().context.audioContext.createBiquadFilter();
        return p.type = $.type, v.setParamValue(p.Q, 1), p.frequency.value = $.f, v.setParamValue(p.gain, $.gain), p;
      });
      (m = n.call(this, g[0], g[g.length - 1]) || this).bands = g, m.bandsMap = {};
      for (var f = 0; f < m.bands.length; f++) {
        var w = m.bands[f];
        f > 0 && m.bands[f - 1].connect(w), m.bandsMap[w.frequency.value] = w;
      }
      return m;
    }
    m = n.call(this, null) || this;
  }
  return b(e, n), e.prototype.setGain = function(t, s) {
    if (s === void 0 && (s = 0), !this.bandsMap[t]) throw new Error("No band found for frequency ".concat(t));
    v.setParamValue(this.bandsMap[t].gain, s);
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
      v.setParamValue(t.gain, 0);
    });
  }, e.prototype.destroy = function() {
    this.bands.forEach(function(t) {
      t.disconnect();
    }), this.bands = null, this.bandsMap = null;
  }, e.F32 = 32, e.F64 = 64, e.F125 = 125, e.F250 = 250, e.F500 = 500, e.F1K = 1e3, e.F2K = 2e3, e.F4K = 4e3, e.F8K = 8e3, e.F16K = 16e3, e;
}(k), DistortionFilter: function(n) {
  function e(t) {
    t === void 0 && (t = 0);
    var s = this;
    if (!_().useLegacy) {
      var o = _().context.audioContext.createWaveShaper();
      return (s = n.call(this, o) || this)._distortion = o, s.amount = t, s;
    }
    s = n.call(this, null) || this;
  }
  return b(e, n), Object.defineProperty(e.prototype, "amount", { get: function() {
    return this._amount;
  }, set: function(t) {
    this._amount = t;
    for (var s, o = 1e3 * t, i = 44100, r = new Float32Array(i), u = Math.PI / 180, a = 0; a < i; ++a) s = 2 * a / i - 1, r[a] = (3 + o) * s * 20 * u / (Math.PI + o * Math.abs(s));
    this._distortion.curve = r, this._distortion.oversample = "4x";
  }, enumerable: !1, configurable: !0 }), e.prototype.destroy = function() {
    this._distortion = null, n.prototype.destroy.call(this);
  }, e;
}(k), StereoFilter: function(n) {
  function e(t) {
    t === void 0 && (t = 0);
    var s = this;
    if (!_().useLegacy) {
      var o, i, r, u = _().context.audioContext;
      return u.createStereoPanner ? r = o = u.createStereoPanner() : ((i = u.createPanner()).panningModel = "equalpower", r = i), (s = n.call(this, r) || this)._stereo = o, s._panner = i, s.pan = t, s;
    }
    s = n.call(this, null) || this;
  }
  return b(e, n), Object.defineProperty(e.prototype, "pan", { get: function() {
    return this._pan;
  }, set: function(t) {
    this._pan = t, this._stereo ? v.setParamValue(this._stereo.pan, t) : this._panner.setPosition(t, 0, 1 - Math.abs(t));
  }, enumerable: !1, configurable: !0 }), e.prototype.destroy = function() {
    n.prototype.destroy.call(this), this._stereo = null, this._panner = null;
  }, e;
}(k), ReverbFilter: function(n) {
  function e(t, s, o) {
    t === void 0 && (t = 3), s === void 0 && (s = 2), o === void 0 && (o = !1);
    var i = this;
    if (!_().useLegacy) return (i = n.call(this, null) || this)._seconds = i._clamp(t, 1, 50), i._decay = i._clamp(s, 0, 100), i._reverse = o, i._rebuild(), i;
    i = n.call(this, null) || this;
  }
  return b(e, n), e.prototype._clamp = function(t, s, o) {
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
    for (var t, s = _().context.audioContext, o = s.sampleRate, i = o * this._seconds, r = s.createBuffer(2, i, o), u = r.getChannelData(0), a = r.getChannelData(1), l = 0; l < i; l++) t = this._reverse ? i - l : l, u[l] = (2 * Math.random() - 1) * Math.pow(1 - t / i, this._decay), a[l] = (2 * Math.random() - 1) * Math.pow(1 - t / i, this._decay);
    var h = _().context.audioContext.createConvolver();
    h.buffer = r, this.init(h);
  }, e;
}(k), MonoFilter: function(n) {
  function e() {
    var t = this;
    if (!_().useLegacy) {
      var s = _().context.audioContext, o = s.createChannelSplitter(), i = s.createChannelMerger();
      return i.connect(o), (t = n.call(this, i, o) || this)._merger = i, t;
    }
    t = n.call(this, null) || this;
  }
  return b(e, n), e.prototype.destroy = function() {
    this._merger.disconnect(), this._merger = null, n.prototype.destroy.call(this);
  }, e;
}(k), StreamFilter: function(n) {
  function e() {
    var t = this;
    if (!_().useLegacy) {
      var s = _().context.audioContext, o = s.createMediaStreamDestination(), i = s.createMediaStreamSource(o.stream);
      return (t = n.call(this, o, i) || this)._stream = o.stream, t;
    }
    t = n.call(this, null) || this;
  }
  return b(e, n), Object.defineProperty(e.prototype, "stream", { get: function() {
    return this._stream;
  }, enumerable: !1, configurable: !0 }), e.prototype.destroy = function() {
    this._stream = null, n.prototype.destroy.call(this);
  }, e;
}(k), TelephoneFilter: function(n) {
  function e() {
    if (!_().useLegacy) {
      var t = _().context.audioContext, s = t.createBiquadFilter(), o = t.createBiquadFilter(), i = t.createBiquadFilter(), r = t.createBiquadFilter();
      return s.type = "lowpass", v.setParamValue(s.frequency, 2e3), o.type = "lowpass", v.setParamValue(o.frequency, 2e3), i.type = "highpass", v.setParamValue(i.frequency, 500), r.type = "highpass", v.setParamValue(r.frequency, 500), s.connect(o), o.connect(i), i.connect(r), n.call(this, s, r) || this;
    }
    n.call(this, null);
  }
  return b(e, n), e;
}(k) }, Ae = { __proto__: null, supported: K }, z = function(n) {
  return ee = n, n;
}(new Oe());
ue.add(oe);
class S {
  constructor(e, t, s, o, i, r, u, a) {
    this.fn = e, this.buf = t, this.start_ms = s, this.end_ms = o, this.ret_ms = i, this.volume = r, this.pan = u, this.snd = a, this.stt = a ? new G(this) : new Ee(this), this.#s = L.procID, a && this.addSnd(a);
  }
  static #t = 1;
  stt;
  loop = !1;
  #s;
  get procID() {
    return this.#s;
  }
  addSnd(e) {
    switch (this.loop = e.loop, this.stt.onLoad(this), this.pan !== 0 && (e.filters = [new B.StereoFilter(this.pan)]), this.setVol = (t) => {
      e.volume = t;
    }, this.tw = () => new pe(e), this.onPlayEnd = () => {
      this.stt.onPlayEnd(this.buf), this.#e();
    }, this.stop = () => {
      e.stop(), this.#e();
    }, this.destroy = () => e.destroy(), this.buf) {
      // セリフ再生中はBGM音量を絞る
      case Q:
        {
          const t = Number(c.getVal("sys:sn.sound.BGM.vol_mul_talking") ?? 1);
          if (t === 1) break;
          S.#t = t;
          const s = X[H];
          s && s.setVol(this.volume * S.#t);
        }
        break;
      case H:
        e.volume = this.volume * S.#t;
        break;
    }
  }
  #e = () => {
    if (this.#e = () => {
    }, S.#t === 1 || this.buf !== Q) return;
    S.#t = 1;
    const e = X[H];
    e && e.setVol(this.volume * S.#t);
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
let J, c, F, Z, X, U;
const H = "BGM", D = "SE", Q = "VOICE";
class d {
  constructor(e, t, s) {
    this.hArg = e, this.buf = t, this.fn = s;
    const o = j(e, "start_ms", 0), i = j(e, "end_ms", d.#s), r = j(e, "ret_ms", 0), u = j(e, "pan", 0), a = j(e, "speed", 1);
    if (o < 0) throw `[playse] start_ms:${o} が負の値です`;
    if (r < 0) throw `[playse] ret_ms:${r} が負の値です`;
    if (0 < i) {
      if (i <= o) throw `[playse] start_ms:${o} >= end_ms:${i} は異常値です`;
      if (i <= r) throw `[playse] ret_ms:${r} >= end_ms:${i} は異常値です`;
    }
    const l = "const.sn.sound." + t + ".";
    c.setVal_Nochk("save", l + "fn", s);
    const h = d.getVol(e, 1);
    c.setVal_Nochk("save", l + "volume", h);
    const y = h * Number(c.getVal("sys:" + l + "volume", 1, !0)), m = A(e, "loop", !1);
    m ? (d.#t[t] = s, c.setVal_Nochk("save", "const.sn.loopPlaying", JSON.stringify(d.#t))) : d.delLoopPlay(t), c.setVal_Nochk("save", l + "start_ms", o), c.setVal_Nochk("save", l + "end_ms", i), c.setVal_Nochk("save", l + "ret_ms", r), c.setVal_Nochk("tmp", l + "playing", !0), c.flush();
    const g = z.find(s);
    this.#e = new S(
      s,
      t,
      o,
      i,
      r,
      y,
      u,
      g
    );
    const f = {
      loop: m,
      speed: a,
      volume: y,
      loaded: (p, x) => {
        if (!this.#e.stt.isDestroy) {
          if (p) {
            F.errScript(`ロード失敗です SndBuf fn:${s} ${String(p)}`, !1);
            return;
          }
          x && (this.#e.addSnd(x), u !== 0 && (x.filters = [new B.StereoFilter(u)]), e.fnc?.());
        }
      }
    };
    let w = "";
    if (0 < o || i < d.#s) {
      w = `${s};${o};${i};${r}`;
      const p = (f.sprites ??= {})[w] = {
        start: o / 1e3,
        end: i / 1e3
      };
      f.preload = !0;
      const x = f.loaded;
      f.loaded = (C, E) => {
        if (this.#e.stt.isDestroy) return;
        x(C, E);
        const I = E, T = I.duration;
        p.end < 0 && (p.end += T, I.removeSprites(w), I.addSprites(w, p)), p.end <= p.start && F.errScript(`[playse] end_ms:${i}(${p.end * 1e3}) >= start_ms:${o} は異常値です`), p.end * 1e3 <= r && F.errScript(`[playse] end_ms:${i}(${p.end * 1e3}) <= ret_ms:${r} は異常値です`), T <= p.start && F.errScript(`[playse] 音声ファイル再生時間:${T * 1e3} <= start_ms:${o} は異常値です`), i !== d.#s && T <= p.end && F.errScript(`[playse] 音声ファイル再生時間:${T * 1e3} <= end_ms:${i} は異常値です`), I.play(w, (re) => f.complete?.(re));
      };
    } else f.autoPlay = !0;
    if (m ? r !== 0 && (f.loop = !1, f.complete = (p) => {
      const x = p.duration, C = r / 1e3, E = i / 1e3;
      x <= C && F.errScript(`[playse] 音声ファイル再生時間:${x * 1e3} <= ret_ms:${r} は異常値です`), p.play({
        // 一周目はループなし、なのでキャッシュされてる
        ...f,
        start: C,
        end: E < 0 ? E + x : E,
        // 負の値は末尾から
        //	speed,		// 重複
        loop: !0,
        //	volume,		// 重複
        //-	muted?: boolean;
        filters: u !== 0 ? [new B.StereoFilter(u)] : []
        //-	complete?: CompleteCallback;
        //-	loaded?: LoadedCallback;
        //-	singleInstance?: boolean;
      });
    }) : f.complete = () => {
      W(this.#e, t), this.#e.onPlayEnd();
    }, this.#n(), g) {
      if (g.volume = y, w) this.#o(s, f);
      else if (g.isPlayable) {
        const p = g.options.source;
        !(p instanceof ArrayBuffer) || p.byteLength === 0 ? g.play(f) : this.#e.addSnd(N.from({
          ...f,
          url: g.options.url,
          source: p
        }));
      }
      u !== 0 && (g.filters = [new B.StereoFilter(u)]), this.needLoad = !1;
      return;
    }
    if (this.needLoad = A(e, "join", !0)) {
      const p = this.#e.procID + `loaded buf:${t} fn:${s}`;
      L.beginProc(p);
      const x = f.loaded;
      f.loaded = (C, E) => {
        x(C, E), L.endProc(p);
      };
    }
    this.#o(s, f);
  }
  static #t = {};
  static init(e, t, s, o, i) {
    d.#t = {}, J = e, c = t, F = s, Z = o, X = i;
  }
  static setEvtMng(e) {
    U = e;
  }
  static delLoopPlay(e) {
    delete d.#t[e];
    const t = "const.sn.sound." + e + ".";
    c.setVal_Nochk("save", t + "fn", ""), c.setVal_Nochk("save", "const.sn.loopPlaying", JSON.stringify(d.#t)), c.flush();
  }
  static getVol(e, t) {
    const s = j(e, "volume", t);
    return s < 0 ? 0 : s > 1 ? 1 : s;
  }
  static xchgbuf({ buf: e = D, buf2: t = D }) {
    if (e === t) throw `[xchgbuf] buf:${e} が同じ値です`;
    const s = "const.sn.sound." + e + ".", o = Number(c.getVal("save:" + s + "volume")), i = String(c.getVal("save:" + s + "fn")), r = "const.sn.sound." + t + ".", u = Number(c.getVal("save:" + r + "volume")), a = String(c.getVal("save:" + r + "fn"));
    c.setVal_Nochk("save", s + "volume", u), c.setVal_Nochk("save", r + "volume", o), c.setVal_Nochk("save", s + "fn", a), c.setVal_Nochk("save", r + "fn", i), e in d.#t != t in d.#t && (e in d.#t ? (delete d.#t[e], d.#t[t] = i) : (delete d.#t[t], d.#t[e] = a), c.setVal_Nochk("save", "const.sn.loopPlaying", JSON.stringify(d.#t))), c.flush();
  }
  static #s = 999e3;
  #e;
  needLoad;
  #n = () => {
    z.volumeAll = Number(c.getVal("sys:sn.sound.global_volume", 1)), this.#n = () => {
    };
  };
  #o(e, t) {
    const s = J.searchPath(e, ae.SOUND);
    if (!s.endsWith(".bin")) {
      t.url = s, N.from(t);
      return;
    }
    new le().add({ name: e, url: s, xhrType: O.XHR_RESPONSE_TYPE.BUFFER }).use((o, i) => {
      Z.decAB(o.data).then((r) => {
        o.data = r;
      }).catch((r) => F.errScript(`Sound ロード失敗ですc fn:${o.name} ${r}`, !1)).finally(() => i());
    }).load((o, i) => {
      t.source = i[e]?.data, N.from(t);
    });
  }
  setVol(e) {
    this.#e.setVol(e);
  }
  ws = (e) => this.#e.stt.ws(this.#e, e);
  stopse({ buf: e = D }) {
    W(this.#e, e), this.#e.stt.stopse(this.#e);
  }
  fade = (e) => this.#e.stt.fade(this.#e, e);
  wf = (e) => this.#e.stt.wf(this.#e, e);
  stopfadese = (e) => this.#e.stt.stopfadese(this.#e, e);
}
function W({ loop: n }, e) {
  if (n) {
    d.delLoopPlay(e);
    return;
  }
  const t = "const.sn.sound." + e + ".";
  c.setVal_Nochk("tmp", t + "playing", !1), c.flush();
}
class Ee {
  constructor(e) {
    this.si = e;
  }
  onLoad(e) {
    e.stt = new G(e);
  }
  stopse(e) {
    e.stt = new P(e, !1);
  }
  ws = () => !1;
  onPlayEnd() {
    this.si.stt = new P(this.si, !1);
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
class G {
  constructor(e) {
    this.si = e;
  }
  onLoad() {
  }
  // ok
  stopse(e) {
    e.stt = new P(e);
  }
  ws(e, t) {
    if (e.loop) return !1;
    e.stt = new Fe(e);
    const s = A(t, "canskip", !1), o = A(t, "stop", !0);
    if (s && U.isSkipping)
      return o ? e.stt.stopse(e) : e.stt.onPlayEnd = () => {
      }, !1;
    const { buf: i = D } = t, r = () => {
      W(e, i), e.onPlayEnd(), o ? e.stt.stopse(e) : e.stt.onPlayEnd = () => {
      };
    };
    return L.beginProc(e.procID + "ws", r, !0, s ? r : void 0), !0;
  }
  onPlayEnd() {
    this.si.stt = new P(this.si, !1);
  }
  // ok
  fade(e, t) {
    const { buf: s = D } = t, i = "const.sn.sound." + s + "." + "volume", r = d.getVol(t, NaN);
    c.setVal_Nochk("save", i, r);
    const u = r * Number(c.getVal("sys:" + i, 1)), a = A(t, "stop", r === 0);
    a && d.delLoopPlay(s), c.flush();
    const l = j(t, "time", NaN), h = j(t, "delay", 0);
    if (l === 0 && h === 0 || U.isSkipping) {
      e.setVol(u), e.stt = a ? new P(e) : new G(e);
      return;
    }
    const y = e.tw();
    y && (ce.setTwProp(y, t).to({ volume: u }, l).onUpdate(() => {
      e.snd?.isPlaying || (y.stop(), y.onComplete());
    }).onComplete(() => {
      he(y), e.stt.compFade(s), e.stt = a ? new P(e) : new G(e);
    }).start(), e.stt = new je(y, e));
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
class Fe {
  constructor(e) {
    this.si = e;
  }
  onLoad() {
  }
  // ok
  stopse(e) {
    e.stt = new P(e);
  }
  ws = () => !1;
  // ok
  onPlayEnd() {
    this.si.stt = new P(this.si, !1), L.notifyEndProc(this.si.procID + "ws");
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
class je {
  constructor(e, t) {
    this.tw = e, this.si = t;
  }
  onLoad() {
  }
  // ok
  stopse(e) {
    this.stopfadese(), e.stt = new P(e);
  }
  // 順番厳守
  ws = () => !1;
  // ok ?
  onPlayEnd() {
    this.stopfadese(), this.si.stt = new P(this.si, !1);
  }
  // ok
  fade() {
  }
  // ok
  wf(e, t) {
    e.stt = new Se(e);
    const s = A(t, "canskip", !1);
    if (s && U.isSkipping)
      return this.stopfadese(), !1;
    const o = () => this.stopfadese();
    return L.beginProc(e.procID + "wf", o, !0, s ? o : void 0), !0;
  }
  compFade() {
  }
  // ok
  stopfadese = () => this.si.stop();
  isDestroy = !1;
}
class Se {
  constructor(e) {
    this.si = e;
  }
  onLoad() {
  }
  // ok
  stopse(e) {
    this.stopfadese(), e.stt = new P(e);
  }
  ws = () => !1;
  // ok
  onPlayEnd() {
    this.stopfadese(), this.si.stt = new P(this.si, !1);
  }
  // ok
  fade() {
  }
  // ok
  wf = () => !1;
  // ok
  compFade() {
    L.notifyEndProc(this.si.procID + "wf");
  }
  stopfadese = () => this.si.stop();
  isDestroy = !1;
}
class P {
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
export {
  D as B,
  Ae as I,
  z as R,
  d as S,
  H as a
};
//# sourceMappingURL=SndBuf.js.map
