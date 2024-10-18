import { T, n as rt, e as ut, L as tt, a as w, i as $, B as at, b as O, c as j, d as ct, f as lt, S as pt, g as ht, C as ft, r as dt } from "./web2.js";
/*!
 * @pixi/sound - v4.4.1
 * https://github.com/pixijs/pixi-sound
 * Compiled Tue, 15 Aug 2023 19:22:13 UTC
 *
 * @pixi/sound is licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license
 */
var et;
function _() {
  return et;
}
var nt = function(s, t) {
  return (nt = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, n) {
    e.__proto__ = n;
  } || function(e, n) {
    for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
  })(s, t);
};
function v(s, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  function e() {
    this.constructor = s;
  }
  nt(s, t), s.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var k = function() {
  return (k = Object.assign || function(s) {
    for (var t, e = 1, n = arguments.length; e < n; e++) for (var o in t = arguments[e]) Object.prototype.hasOwnProperty.call(t, o) && (s[o] = t[o]);
    return s;
  }).apply(this, arguments);
}, Y = ["mp3", "ogg", "oga", "opus", "mpeg", "wav", "m4a", "aiff", "wma", "mid", "caf"], B = {};
function st(s) {
  var t = k({ m4a: "audio/mp4", oga: "audio/ogg", opus: 'audio/ogg; codecs="opus"', caf: 'audio/x-caf; codecs="opus"' }, s || {}), e = document.createElement("audio"), n = {}, o = /^no$/;
  Y.forEach(function(r) {
    var i = e.canPlayType("audio/".concat(r)).replace(o, ""), u = t[r] ? e.canPlayType(t[r]).replace(o, "") : "";
    n[r] = !!i || !!u;
  }), Object.assign(B, n);
}
st();
var _t = /\.(\{([^\}]+)\})(\?.*)?$/;
function J(s) {
  var t = _t, e = typeof s == "string" ? s : s.url;
  if (!t.test(e)) return e;
  for (var n = t.exec(e), o = n[2].split(","), r = o[o.length - 1], i = 0, u = o.length; i < u; i++) {
    var a = o[i];
    if (B[a]) {
      r = a;
      break;
    }
  }
  var c = e.replace(n[1], r);
  if (typeof s != "string") {
    var l = s;
    l.extension = r, l.url = c;
  }
  return c;
}
var K = Y.filter(function(s) {
  return B[s];
}), q = function() {
  function s() {
  }
  return s.add = function() {
    s.setLegacy(_().useLegacy);
  }, s.setLegacy = function(t) {
    t ? K.forEach(function(e) {
      w.setExtensionXhrType(e, w.XHR_RESPONSE_TYPE.DEFAULT), w.setExtensionLoadType(e, w.LOAD_TYPE.AUDIO);
    }) : K.forEach(function(e) {
      w.setExtensionXhrType(e, w.XHR_RESPONSE_TYPE.BUFFER), w.setExtensionLoadType(e, w.LOAD_TYPE.XHR);
    });
  }, s.pre = function(t, e) {
    J(t), e();
  }, s.use = function(t, e) {
    t.data && K.indexOf(t.extension) > -1 ? t.sound = _().add(t.name, { loaded: e, preload: !0, url: t.url, source: t.data }) : e();
  }, s.extension = "loader", s;
}(), yt = 0, mt = function(s) {
  function t(e) {
    var n = s.call(this) || this;
    return n.id = yt++, n.init(e), n;
  }
  return v(t, s), t.prototype.set = function(e, n) {
    if (this[e] === void 0) throw new Error("Property with name ".concat(e, " does not exist."));
    switch (e) {
      case "speed":
        this.speed = n;
        break;
      case "volume":
        this.volume = n;
        break;
      case "paused":
        this.paused = n;
        break;
      case "loop":
        this.loop = n;
        break;
      case "muted":
        this.muted = n;
    }
    return this;
  }, Object.defineProperty(t.prototype, "progress", { get: function() {
    return this._source.currentTime / this._duration;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "paused", { get: function() {
    return this._paused;
  }, set: function(e) {
    this._paused = e, this.refreshPaused();
  }, enumerable: !1, configurable: !0 }), t.prototype._onPlay = function() {
    this._playing = !0;
  }, t.prototype._onPause = function() {
    this._playing = !1;
  }, t.prototype.init = function(e) {
    this._playing = !1, this._duration = e.source.duration;
    var n = this._source = e.source.cloneNode(!1);
    n.src = e.parent.url, n.onplay = this._onPlay.bind(this), n.onpause = this._onPause.bind(this), e.context.on("refresh", this.refresh, this), e.context.on("refreshPaused", this.refreshPaused, this), this._media = e;
  }, t.prototype._internalStop = function() {
    this._source && this._playing && (this._source.onended = null, this._source.pause());
  }, t.prototype.stop = function() {
    this._internalStop(), this._source && this.emit("stop");
  }, Object.defineProperty(t.prototype, "speed", { get: function() {
    return this._speed;
  }, set: function(e) {
    this._speed = e, this.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "volume", { get: function() {
    return this._volume;
  }, set: function(e) {
    this._volume = e, this.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "loop", { get: function() {
    return this._loop;
  }, set: function(e) {
    this._loop = e, this.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "muted", { get: function() {
    return this._muted;
  }, set: function(e) {
    this._muted = e, this.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "filters", { get: function() {
    return null;
  }, set: function(e) {
  }, enumerable: !1, configurable: !0 }), t.prototype.refresh = function() {
    var e = this._media.context, n = this._media.parent;
    this._source.loop = this._loop || n.loop;
    var o = e.volume * (e.muted ? 0 : 1), r = n.volume * (n.muted ? 0 : 1), i = this._volume * (this._muted ? 0 : 1);
    this._source.volume = i * o * r, this._source.playbackRate = this._speed * e.speed * n.speed;
  }, t.prototype.refreshPaused = function() {
    var e = this._media.context, n = this._media.parent, o = this._paused || n.paused || e.paused;
    o !== this._pausedReal && (this._pausedReal = o, o ? (this._internalStop(), this.emit("paused")) : (this.emit("resumed"), this.play({ start: this._source.currentTime, end: this._end, volume: this._volume, speed: this._speed, loop: this._loop })), this.emit("pause", o));
  }, t.prototype.play = function(e) {
    var n = this, o = e.start, r = e.end, i = e.speed, u = e.loop, a = e.volume, c = e.muted;
    this._speed = i, this._volume = a, this._loop = !!u, this._muted = c, this.refresh(), this.loop && r !== null && (this.loop = !1), this._start = o, this._end = r || this._duration, this._start = Math.max(0, this._start - t.PADDING), this._end = Math.min(this._end + t.PADDING, this._duration), this._source.onloadedmetadata = function() {
      n._source && (n._source.currentTime = o, n._source.onloadedmetadata = null, n.emit("progress", o, n._duration), T.shared.add(n._onUpdate, n));
    }, this._source.onended = this._onComplete.bind(this), this._source.play(), this.emit("start");
  }, t.prototype._onUpdate = function() {
    this.emit("progress", this.progress, this._duration), this._source.currentTime >= this._end && !this._source.loop && this._onComplete();
  }, t.prototype._onComplete = function() {
    T.shared.remove(this._onUpdate, this), this._internalStop(), this.emit("progress", 1, this._duration), this.emit("end", this);
  }, t.prototype.destroy = function() {
    T.shared.remove(this._onUpdate, this), this.removeAllListeners();
    var e = this._source;
    e && (e.onended = null, e.onplay = null, e.onpause = null, this._internalStop()), this._source = null, this._speed = 1, this._volume = 1, this._loop = !1, this._end = null, this._start = 0, this._duration = 0, this._playing = !1, this._pausedReal = !1, this._paused = !1, this._muted = !1, this._media && (this._media.context.off("refresh", this.refresh, this), this._media.context.off("refreshPaused", this.refreshPaused, this), this._media = null);
  }, t.prototype.toString = function() {
    return "[HTMLAudioInstance id=".concat(this.id, "]");
  }, t.PADDING = 0.1, t;
}($), bt = function(s) {
  function t() {
    return s !== null && s.apply(this, arguments) || this;
  }
  return v(t, s), t.prototype.init = function(e) {
    this.parent = e, this._source = e.options.source || new Audio(), e.url && (this._source.src = e.url);
  }, t.prototype.create = function() {
    return new mt(this);
  }, Object.defineProperty(t.prototype, "isPlayable", { get: function() {
    return !!this._source && this._source.readyState === 4;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "duration", { get: function() {
    return this._source.duration;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "context", { get: function() {
    return this.parent.context;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "filters", { get: function() {
    return null;
  }, set: function(e) {
  }, enumerable: !1, configurable: !0 }), t.prototype.destroy = function() {
    this.removeAllListeners(), this.parent = null, this._source && (this._source.src = "", this._source.load(), this._source = null);
  }, Object.defineProperty(t.prototype, "source", { get: function() {
    return this._source;
  }, enumerable: !1, configurable: !0 }), t.prototype.load = function(e) {
    var n = this._source, o = this.parent;
    if (n.readyState !== 4) if (o.url) {
      n.src = o.url;
      var r = function() {
        a(), o.isLoaded = !0;
        var l = o.autoPlayStart();
        e && e(null, o, l);
      }, i = function() {
        a(), e && e(new Error("Sound loading has been aborted"));
      }, u = function() {
        a();
        var l = "Failed to load audio element (code: ".concat(n.error.code, ")");
        e && e(new Error(l));
      }, a = function() {
        n.removeEventListener("canplaythrough", r), n.removeEventListener("load", r), n.removeEventListener("abort", i), n.removeEventListener("error", u);
      };
      n.addEventListener("canplaythrough", r, !1), n.addEventListener("load", r, !1), n.addEventListener("abort", i, !1), n.addEventListener("error", u, !1), n.load();
    } else e(new Error("sound.url or sound.source must be set"));
    else {
      o.isLoaded = !0;
      var c = o.autoPlayStart();
      e && setTimeout(function() {
        e(null, o, c);
      }, 0);
    }
  }, t;
}($), vt = function() {
  function s(t, e) {
    this.parent = t, Object.assign(this, e), this.duration = this.end - this.start;
  }
  return s.prototype.play = function(t) {
    return this.parent.play({ complete: t, speed: this.speed || this.parent.speed, end: this.end, start: this.start, loop: this.loop });
  }, s.prototype.destroy = function() {
    this.parent = null;
  }, s;
}(), g = function() {
  function s() {
  }
  return s.setParamValue = function(t, e) {
    if (t.setValueAtTime) {
      var n = _().context;
      t.setValueAtTime(e, n.audioContext.currentTime);
    } else t.value = e;
    return e;
  }, s;
}(), gt = 0, Pt = function(s) {
  function t(e) {
    var n = s.call(this) || this;
    return n.id = gt++, n._media = null, n._paused = !1, n._muted = !1, n._elapsed = 0, n.init(e), n;
  }
  return v(t, s), t.prototype.set = function(e, n) {
    if (this[e] === void 0) throw new Error("Property with name ".concat(e, " does not exist."));
    switch (e) {
      case "speed":
        this.speed = n;
        break;
      case "volume":
        this.volume = n;
        break;
      case "muted":
        this.muted = n;
        break;
      case "loop":
        this.loop = n;
        break;
      case "paused":
        this.paused = n;
    }
    return this;
  }, t.prototype.stop = function() {
    this._source && (this._internalStop(), this.emit("stop"));
  }, Object.defineProperty(t.prototype, "speed", { get: function() {
    return this._speed;
  }, set: function(e) {
    this._speed = e, this.refresh(), this._update(!0);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "volume", { get: function() {
    return this._volume;
  }, set: function(e) {
    this._volume = e, this.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "muted", { get: function() {
    return this._muted;
  }, set: function(e) {
    this._muted = e, this.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "loop", { get: function() {
    return this._loop;
  }, set: function(e) {
    this._loop = e, this.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "filters", { get: function() {
    return this._filters;
  }, set: function(e) {
    var n;
    this._filters && ((n = this._filters) === null || n === void 0 || n.filter(function(o) {
      return o;
    }).forEach(function(o) {
      return o.disconnect();
    }), this._filters = null, this._source.connect(this._gain)), this._filters = e?.length ? e.slice(0) : null, this.refresh();
  }, enumerable: !1, configurable: !0 }), t.prototype.refresh = function() {
    if (this._source) {
      var e = this._media.context, n = this._media.parent;
      this._source.loop = this._loop || n.loop;
      var o = e.volume * (e.muted ? 0 : 1), r = n.volume * (n.muted ? 0 : 1), i = this._volume * (this._muted ? 0 : 1);
      g.setParamValue(this._gain.gain, i * r * o), g.setParamValue(this._source.playbackRate, this._speed * n.speed * e.speed), this.applyFilters();
    }
  }, t.prototype.applyFilters = function() {
    var e;
    if (!((e = this._filters) === null || e === void 0) && e.length) {
      this._source.disconnect();
      var n = this._source;
      this._filters.forEach(function(o) {
        n.connect(o.destination), n = o;
      }), n.connect(this._gain);
    }
  }, t.prototype.refreshPaused = function() {
    var e = this._media.context, n = this._media.parent, o = this._paused || n.paused || e.paused;
    o !== this._pausedReal && (this._pausedReal = o, o ? (this._internalStop(), this.emit("paused")) : (this.emit("resumed"), this.play({ start: this._elapsed % this._duration, end: this._end, speed: this._speed, loop: this._loop, volume: this._volume })), this.emit("pause", o));
  }, t.prototype.play = function(e) {
    var n = e.start, o = e.end, r = e.speed, i = e.loop, u = e.volume, a = e.muted, c = e.filters;
    this._paused = !1;
    var l = this._media.nodes.cloneBufferSource(), b = l.source, d = l.gain;
    this._source = b, this._gain = d, this._speed = r, this._volume = u, this._loop = !!i, this._muted = a, this._filters = c, this.refresh();
    var m = this._source.buffer.duration;
    this._duration = m, this._end = o, this._lastUpdate = this._now(), this._elapsed = n, this._source.onended = this._onComplete.bind(this), this._loop ? (this._source.loopEnd = o, this._source.loopStart = n, this._source.start(0, n)) : o ? this._source.start(0, n, o - n) : this._source.start(0, n), this.emit("start"), this._update(!0), this.enableTicker(!0);
  }, t.prototype.enableTicker = function(e) {
    T.shared.remove(this._updateListener, this), e && T.shared.add(this._updateListener, this);
  }, Object.defineProperty(t.prototype, "progress", { get: function() {
    return this._progress;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "paused", { get: function() {
    return this._paused;
  }, set: function(e) {
    this._paused = e, this.refreshPaused();
  }, enumerable: !1, configurable: !0 }), t.prototype.destroy = function() {
    var e;
    this.removeAllListeners(), this._internalStop(), this._gain && (this._gain.disconnect(), this._gain = null), this._media && (this._media.context.events.off("refresh", this.refresh, this), this._media.context.events.off("refreshPaused", this.refreshPaused, this), this._media = null), (e = this._filters) === null || e === void 0 || e.forEach(function(n) {
      return n.disconnect();
    }), this._filters = null, this._end = null, this._speed = 1, this._volume = 1, this._loop = !1, this._elapsed = 0, this._duration = 0, this._paused = !1, this._muted = !1, this._pausedReal = !1;
  }, t.prototype.toString = function() {
    return "[WebAudioInstance id=".concat(this.id, "]");
  }, t.prototype._now = function() {
    return this._media.context.audioContext.currentTime;
  }, t.prototype._updateListener = function() {
    this._update();
  }, t.prototype._update = function(e) {
    if (e === void 0 && (e = !1), this._source) {
      var n = this._now(), o = n - this._lastUpdate;
      if (o > 0 || e) {
        var r = this._source.playbackRate.value;
        this._elapsed += o * r, this._lastUpdate = n;
        var i = this._duration, u = void 0;
        if (this._source.loopStart) {
          var a = this._source.loopEnd - this._source.loopStart;
          u = (this._source.loopStart + this._elapsed % a) / i;
        } else u = this._elapsed % i / i;
        this._progress = u, this.emit("progress", this._progress, i);
      }
    }
  }, t.prototype.init = function(e) {
    this._media = e, e.context.events.on("refresh", this.refresh, this), e.context.events.on("refreshPaused", this.refreshPaused, this);
  }, t.prototype._internalStop = function() {
    if (this._source) {
      this.enableTicker(!1), this._source.onended = null, this._source.stop(0), this._source.disconnect();
      try {
        this._source.buffer = null;
      } catch {
      }
      this._source = null;
    }
  }, t.prototype._onComplete = function() {
    if (this._source) {
      this.enableTicker(!1), this._source.onended = null, this._source.disconnect();
      try {
        this._source.buffer = null;
      } catch {
      }
    }
    this._source = null, this._progress = 1, this.emit("progress", 1, this._duration), this.emit("end", this);
  }, t;
}($), ot = function() {
  function s(t, e) {
    this._output = e, this._input = t;
  }
  return Object.defineProperty(s.prototype, "destination", { get: function() {
    return this._input;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(s.prototype, "filters", { get: function() {
    return this._filters;
  }, set: function(t) {
    var e = this;
    if (this._filters && (this._filters.forEach(function(o) {
      o && o.disconnect();
    }), this._filters = null, this._input.connect(this._output)), t && t.length) {
      this._filters = t.slice(0), this._input.disconnect();
      var n = null;
      t.forEach(function(o) {
        n === null ? e._input.connect(o.destination) : n.connect(o.destination), n = o;
      }), n.connect(this._output);
    }
  }, enumerable: !1, configurable: !0 }), s.prototype.destroy = function() {
    this.filters = null, this._input = null, this._output = null;
  }, s;
}(), xt = function(s) {
  function t(e) {
    var n = this, o = e.audioContext, r = o.createBufferSource(), i = o.createGain(), u = o.createAnalyser();
    return r.connect(u), u.connect(i), i.connect(e.destination), (n = s.call(this, u, i) || this).context = e, n.bufferSource = r, n.gain = i, n.analyser = u, n;
  }
  return v(t, s), Object.defineProperty(t.prototype, "script", { get: function() {
    return this._script || (this._script = this.context.audioContext.createScriptProcessor(t.BUFFER_SIZE), this._script.connect(this.context.destination)), this._script;
  }, enumerable: !1, configurable: !0 }), t.prototype.destroy = function() {
    s.prototype.destroy.call(this), this.bufferSource.disconnect(), this._script && this._script.disconnect(), this.gain.disconnect(), this.analyser.disconnect(), this.bufferSource = null, this._script = null, this.gain = null, this.analyser = null, this.context = null;
  }, t.prototype.cloneBufferSource = function() {
    var e = this.bufferSource, n = this.context.audioContext.createBufferSource();
    n.buffer = e.buffer, g.setParamValue(n.playbackRate, e.playbackRate.value), n.loop = e.loop;
    var o = this.context.audioContext.createGain();
    return n.connect(o), o.connect(this.destination), { source: n, gain: o };
  }, Object.defineProperty(t.prototype, "bufferSize", { get: function() {
    return this.script.bufferSize;
  }, enumerable: !1, configurable: !0 }), t.BUFFER_SIZE = 0, t;
}(ot), H = function() {
  function s() {
  }
  return s.prototype.init = function(t) {
    this.parent = t, this._nodes = new xt(this.context), this._source = this._nodes.bufferSource, this.source = t.options.source;
  }, s.prototype.destroy = function() {
    this.parent = null, this._nodes.destroy(), this._nodes = null;
    try {
      this._source.buffer = null;
    } catch {
    }
    this._source = null, this.source = null;
  }, s.prototype.create = function() {
    return new Pt(this);
  }, Object.defineProperty(s.prototype, "context", { get: function() {
    return this.parent.context;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(s.prototype, "isPlayable", { get: function() {
    return !!this._source && !!this._source.buffer;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(s.prototype, "filters", { get: function() {
    return this._nodes.filters;
  }, set: function(t) {
    this._nodes.filters = t;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(s.prototype, "duration", { get: function() {
    return this._source.buffer.duration;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(s.prototype, "buffer", { get: function() {
    return this._source.buffer;
  }, set: function(t) {
    this._source.buffer = t;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(s.prototype, "nodes", { get: function() {
    return this._nodes;
  }, enumerable: !1, configurable: !0 }), s.prototype.load = function(t) {
    this.source ? this._decode(this.source, t) : this.parent.url ? this._loadUrl(t) : t && t(new Error("sound.url or sound.source must be set"));
  }, s.prototype._loadUrl = function(t) {
    var e = this, n = new XMLHttpRequest(), o = this.parent.url;
    n.open("GET", o, !0), n.responseType = "arraybuffer", n.onload = function() {
      e.source = n.response, e._decode(n.response, t);
    }, n.send();
  }, s.prototype._decode = function(t, e) {
    var n = this, o = function(r, i) {
      if (r) e && e(r);
      else {
        n.parent.isLoaded = !0, n.buffer = i;
        var u = n.parent.autoPlayStart();
        e && e(null, n.parent, u);
      }
    };
    t instanceof AudioBuffer ? o(null, t) : this.parent.context.decode(t, o);
  }, s;
}(), M = function() {
  function s(t, e) {
    this.media = t, this.options = e, this._instances = [], this._sprites = {}, this.media.init(this);
    var n = e.complete;
    this._autoPlayOptions = n ? { complete: n } : null, this.isLoaded = !1, this.isPlaying = !1, this.autoPlay = e.autoPlay, this.singleInstance = e.singleInstance, this.preload = e.preload || this.autoPlay, this.url = e.url, this.speed = e.speed, this.volume = e.volume, this.loop = e.loop, e.sprites && this.addSprites(e.sprites), this.preload && this._preload(e.loaded);
  }
  return s.from = function(t) {
    var e = {};
    return typeof t == "string" ? e.url = t : t instanceof ArrayBuffer || t instanceof AudioBuffer || t instanceof HTMLAudioElement ? e.source = t : e = t, (e = k({ autoPlay: !1, singleInstance: !1, url: null, source: null, preload: !1, volume: 1, speed: 1, complete: null, loaded: null, loop: !1 }, e)).url && (e.url = J(e.url)), Object.freeze(e), new s(_().useLegacy ? new bt() : new H(), e);
  }, Object.defineProperty(s.prototype, "context", { get: function() {
    return _().context;
  }, enumerable: !1, configurable: !0 }), s.prototype.pause = function() {
    return this.isPlaying = !1, this.paused = !0, this;
  }, s.prototype.resume = function() {
    return this.isPlaying = this._instances.length > 0, this.paused = !1, this;
  }, Object.defineProperty(s.prototype, "paused", { get: function() {
    return this._paused;
  }, set: function(t) {
    this._paused = t, this.refreshPaused();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(s.prototype, "speed", { get: function() {
    return this._speed;
  }, set: function(t) {
    this._speed = t, this.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(s.prototype, "filters", { get: function() {
    return this.media.filters;
  }, set: function(t) {
    this.media.filters = t;
  }, enumerable: !1, configurable: !0 }), s.prototype.addSprites = function(t, e) {
    if (typeof t == "object") {
      var n = {};
      for (var o in t) n[o] = this.addSprites(o, t[o]);
      return n;
    }
    var r = new vt(this, e);
    return this._sprites[t] = r, r;
  }, s.prototype.destroy = function() {
    this._removeInstances(), this.removeSprites(), this.media.destroy(), this.media = null, this._sprites = null, this._instances = null;
  }, s.prototype.removeSprites = function(t) {
    if (t) {
      var e = this._sprites[t];
      e !== void 0 && (e.destroy(), delete this._sprites[t]);
    } else for (var n in this._sprites) this.removeSprites(n);
    return this;
  }, Object.defineProperty(s.prototype, "isPlayable", { get: function() {
    return this.isLoaded && this.media && this.media.isPlayable;
  }, enumerable: !1, configurable: !0 }), s.prototype.stop = function() {
    if (!this.isPlayable) return this.autoPlay = !1, this._autoPlayOptions = null, this;
    this.isPlaying = !1;
    for (var t = this._instances.length - 1; t >= 0; t--) this._instances[t].stop();
    return this;
  }, s.prototype.play = function(t, e) {
    var n, o = this;
    if (typeof t == "string" ? n = { sprite: i = t, loop: this.loop, complete: e } : typeof t == "function" ? (n = {}).complete = t : n = t, (n = k({ complete: null, loaded: null, sprite: null, end: null, start: 0, volume: 1, speed: 1, muted: !1, loop: !1 }, n || {})).sprite) {
      var r = n.sprite, i = this._sprites[r];
      n.start = i.start + (n.start || 0), n.end = i.end, n.speed = i.speed || 1, n.loop = i.loop || n.loop, delete n.sprite;
    }
    if (n.offset && (n.start = n.offset), !this.isLoaded) return new Promise(function(a, c) {
      o.autoPlay = !0, o._autoPlayOptions = n, o._preload(function(l, b, d) {
        l ? c(l) : (n.loaded && n.loaded(l, b, d), a(d));
      });
    });
    (this.singleInstance || n.singleInstance) && this._removeInstances();
    var u = this._createInstance();
    return this._instances.push(u), this.isPlaying = !0, u.once("end", function() {
      n.complete && n.complete(o), o._onComplete(u);
    }), u.once("stop", function() {
      o._onComplete(u);
    }), u.play(n), u;
  }, s.prototype.refresh = function() {
    for (var t = this._instances.length, e = 0; e < t; e++) this._instances[e].refresh();
  }, s.prototype.refreshPaused = function() {
    for (var t = this._instances.length, e = 0; e < t; e++) this._instances[e].refreshPaused();
  }, Object.defineProperty(s.prototype, "volume", { get: function() {
    return this._volume;
  }, set: function(t) {
    this._volume = t, this.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(s.prototype, "muted", { get: function() {
    return this._muted;
  }, set: function(t) {
    this._muted = t, this.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(s.prototype, "loop", { get: function() {
    return this._loop;
  }, set: function(t) {
    this._loop = t, this.refresh();
  }, enumerable: !1, configurable: !0 }), s.prototype._preload = function(t) {
    this.media.load(t);
  }, Object.defineProperty(s.prototype, "instances", { get: function() {
    return this._instances;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(s.prototype, "sprites", { get: function() {
    return this._sprites;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(s.prototype, "duration", { get: function() {
    return this.media.duration;
  }, enumerable: !1, configurable: !0 }), s.prototype.autoPlayStart = function() {
    var t;
    return this.autoPlay && (t = this.play(this._autoPlayOptions)), t;
  }, s.prototype._removeInstances = function() {
    for (var t = this._instances.length - 1; t >= 0; t--) this._poolInstance(this._instances[t]);
    this._instances.length = 0;
  }, s.prototype._onComplete = function(t) {
    if (this._instances) {
      var e = this._instances.indexOf(t);
      e > -1 && this._instances.splice(e, 1), this.isPlaying = this._instances.length > 0;
    }
    this._poolInstance(t);
  }, s.prototype._createInstance = function() {
    if (s._pool.length > 0) {
      var t = s._pool.pop();
      return t.init(this.media), t;
    }
    return this.media.create();
  }, s.prototype._poolInstance = function(t) {
    t.destroy(), s._pool.indexOf(t) < 0 && s._pool.push(t);
  }, s._pool = [], s;
}(), wt = function(s) {
  function t() {
    var e = s !== null && s.apply(this, arguments) || this;
    return e.speed = 1, e.muted = !1, e.volume = 1, e.paused = !1, e;
  }
  return v(t, s), t.prototype.refresh = function() {
    this.emit("refresh");
  }, t.prototype.refreshPaused = function() {
    this.emit("refreshPaused");
  }, Object.defineProperty(t.prototype, "filters", { get: function() {
    return null;
  }, set: function(e) {
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "audioContext", { get: function() {
    return null;
  }, enumerable: !1, configurable: !0 }), t.prototype.toggleMute = function() {
    return this.muted = !this.muted, this.refresh(), this.muted;
  }, t.prototype.togglePause = function() {
    return this.paused = !this.paused, this.refreshPaused(), this.paused;
  }, t.prototype.destroy = function() {
    this.removeAllListeners();
  }, t;
}($), W = function(s) {
  function t() {
    var e = s.call(this, null, null) || this;
    e.autoPause = !0;
    var n = window, o = new t.AudioContext(), r = o.createDynamicsCompressor(), i = o.createAnalyser();
    return i.connect(r), r.connect(o.destination), e._input = i, e._output = o.destination, e._ctx = o, e._offlineCtx = new t.OfflineAudioContext(1, 2, n.OfflineAudioContext ? Math.max(8e3, Math.min(96e3, o.sampleRate)) : 44100), e.compressor = r, e.analyser = i, e.events = new $(), e.volume = 1, e.speed = 1, e.muted = !1, e.paused = !1, e._locked = o.state === "suspended" && ("ontouchstart" in globalThis || "onclick" in globalThis), e._locked && (e._unlock(), e._unlock = e._unlock.bind(e), document.addEventListener("mousedown", e._unlock, !0), document.addEventListener("touchstart", e._unlock, !0), document.addEventListener("touchend", e._unlock, !0)), e.onFocus = e.onFocus.bind(e), e.onBlur = e.onBlur.bind(e), globalThis.addEventListener("focus", e.onFocus), globalThis.addEventListener("blur", e.onBlur), e;
  }
  return v(t, s), t.prototype.onFocus = function() {
    if (this.autoPause) {
      var e = this._ctx.state;
      e !== "suspended" && e !== "interrupted" && this._locked || (this.paused = this._pausedOnBlur, this.refreshPaused());
    }
  }, t.prototype.onBlur = function() {
    this.autoPause && (this._locked || (this._pausedOnBlur = this._paused, this.paused = !0, this.refreshPaused()));
  }, t.prototype._unlock = function() {
    this._locked && (this.playEmptySound(), this._ctx.state === "running" && (document.removeEventListener("mousedown", this._unlock, !0), document.removeEventListener("touchend", this._unlock, !0), document.removeEventListener("touchstart", this._unlock, !0), this._locked = !1));
  }, t.prototype.playEmptySound = function() {
    var e = this._ctx.createBufferSource();
    e.buffer = this._ctx.createBuffer(1, 1, 22050), e.connect(this._ctx.destination), e.start(0, 0, 0), e.context.state === "suspended" && e.context.resume();
  }, Object.defineProperty(t, "AudioContext", { get: function() {
    var e = window;
    return e.AudioContext || e.webkitAudioContext || null;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t, "OfflineAudioContext", { get: function() {
    var e = window;
    return e.OfflineAudioContext || e.webkitOfflineAudioContext || null;
  }, enumerable: !1, configurable: !0 }), t.prototype.destroy = function() {
    s.prototype.destroy.call(this);
    var e = this._ctx;
    e.close !== void 0 && e.close(), globalThis.removeEventListener("focus", this.onFocus), globalThis.removeEventListener("blur", this.onBlur), this.events.removeAllListeners(), this.analyser.disconnect(), this.compressor.disconnect(), this.analyser = null, this.compressor = null, this.events = null, this._offlineCtx = null, this._ctx = null;
  }, Object.defineProperty(t.prototype, "audioContext", { get: function() {
    return this._ctx;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "offlineContext", { get: function() {
    return this._offlineCtx;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "paused", { get: function() {
    return this._paused;
  }, set: function(e) {
    e && this._ctx.state === "running" ? this._ctx.suspend() : e || this._ctx.state !== "suspended" || this._ctx.resume(), this._paused = e;
  }, enumerable: !1, configurable: !0 }), t.prototype.refresh = function() {
    this.events.emit("refresh");
  }, t.prototype.refreshPaused = function() {
    this.events.emit("refreshPaused");
  }, t.prototype.toggleMute = function() {
    return this.muted = !this.muted, this.refresh(), this.muted;
  }, t.prototype.togglePause = function() {
    return this.paused = !this.paused, this.refreshPaused(), this._paused;
  }, t.prototype.decode = function(e, n) {
    var o = function(i) {
      n(new Error(i?.message || "Unable to decode file"));
    }, r = this._offlineCtx.decodeAudioData(e, function(i) {
      n(null, i);
    }, o);
    r && r.catch(o);
  }, t;
}(ot), Ot = function() {
  function s() {
    this.init();
  }
  return s.prototype.init = function() {
    return this.supported && (this._webAudioContext = new W()), this._htmlAudioContext = new wt(), this._sounds = {}, this.useLegacy = !this.supported, this;
  }, Object.defineProperty(s.prototype, "context", { get: function() {
    return this._context;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(s.prototype, "filtersAll", { get: function() {
    return this.useLegacy ? [] : this._context.filters;
  }, set: function(t) {
    this.useLegacy || (this._context.filters = t);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(s.prototype, "supported", { get: function() {
    return W.AudioContext !== null;
  }, enumerable: !1, configurable: !0 }), s.prototype.add = function(t, e) {
    if (typeof t == "object") {
      var n = {};
      for (var o in t) {
        var r = this._getOptions(t[o], e);
        n[o] = this.add(o, r);
      }
      return n;
    }
    if (e instanceof M) return this._sounds[t] = e, e;
    var i = this._getOptions(e), u = M.from(i);
    return this._sounds[t] = u, u;
  }, s.prototype._getOptions = function(t, e) {
    var n;
    return n = typeof t == "string" ? { url: t } : t instanceof ArrayBuffer || t instanceof AudioBuffer || t instanceof HTMLAudioElement ? { source: t } : t, n = k(k({}, n), e || {});
  }, Object.defineProperty(s.prototype, "useLegacy", { get: function() {
    return this._useLegacy;
  }, set: function(t) {
    q.setLegacy(t), this._useLegacy = t, this._context = !t && this.supported ? this._webAudioContext : this._htmlAudioContext;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(s.prototype, "disableAutoPause", { get: function() {
    return !this._webAudioContext.autoPause;
  }, set: function(t) {
    this._webAudioContext.autoPause = !t;
  }, enumerable: !1, configurable: !0 }), s.prototype.remove = function(t) {
    return this.exists(t, !0), this._sounds[t].destroy(), delete this._sounds[t], this;
  }, Object.defineProperty(s.prototype, "volumeAll", { get: function() {
    return this._context.volume;
  }, set: function(t) {
    this._context.volume = t, this._context.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(s.prototype, "speedAll", { get: function() {
    return this._context.speed;
  }, set: function(t) {
    this._context.speed = t, this._context.refresh();
  }, enumerable: !1, configurable: !0 }), s.prototype.togglePauseAll = function() {
    return this._context.togglePause();
  }, s.prototype.pauseAll = function() {
    return this._context.paused = !0, this._context.refreshPaused(), this;
  }, s.prototype.resumeAll = function() {
    return this._context.paused = !1, this._context.refreshPaused(), this;
  }, s.prototype.toggleMuteAll = function() {
    return this._context.toggleMute();
  }, s.prototype.muteAll = function() {
    return this._context.muted = !0, this._context.refresh(), this;
  }, s.prototype.unmuteAll = function() {
    return this._context.muted = !1, this._context.refresh(), this;
  }, s.prototype.removeAll = function() {
    for (var t in this._sounds) this._sounds[t].destroy(), delete this._sounds[t];
    return this;
  }, s.prototype.stopAll = function() {
    for (var t in this._sounds) this._sounds[t].stop();
    return this;
  }, s.prototype.exists = function(t, e) {
    return !!this._sounds[t];
  }, s.prototype.find = function(t) {
    return this.exists(t, !0), this._sounds[t];
  }, s.prototype.play = function(t, e) {
    return this.find(t).play(e);
  }, s.prototype.stop = function(t) {
    return this.find(t).stop();
  }, s.prototype.pause = function(t) {
    return this.find(t).pause();
  }, s.prototype.resume = function(t) {
    return this.find(t).resume();
  }, s.prototype.volume = function(t, e) {
    var n = this.find(t);
    return e !== void 0 && (n.volume = e), n.volume;
  }, s.prototype.speed = function(t, e) {
    var n = this.find(t);
    return e !== void 0 && (n.speed = e), n.speed;
  }, s.prototype.duration = function(t) {
    return this.find(t).duration;
  }, s.prototype.close = function() {
    return this.removeAll(), this._sounds = null, this._webAudioContext && (this._webAudioContext.destroy(), this._webAudioContext = null), this._htmlAudioContext && (this._htmlAudioContext.destroy(), this._htmlAudioContext = null), this._context = null, this;
  }, s;
}(), E = function() {
  function s(t, e) {
    this.init(t, e);
  }
  return s.prototype.init = function(t, e) {
    this.destination = t, this.source = e || t;
  }, s.prototype.connect = function(t) {
    this.source.connect(t);
  }, s.prototype.disconnect = function() {
    this.source.disconnect();
  }, s.prototype.destroy = function() {
    this.disconnect(), this.destination = null, this.source = null;
  }, s;
}(), U = { __proto__: null, Filter: E, EqualizerFilter: function(s) {
  function t(e, n, o, r, i, u, a, c, l, b) {
    e === void 0 && (e = 0), n === void 0 && (n = 0), o === void 0 && (o = 0), r === void 0 && (r = 0), i === void 0 && (i = 0), u === void 0 && (u = 0), a === void 0 && (a = 0), c === void 0 && (c = 0), l === void 0 && (l = 0), b === void 0 && (b = 0);
    var d = this;
    if (!_().useLegacy) {
      var m = [{ f: t.F32, type: "lowshelf", gain: e }, { f: t.F64, type: "peaking", gain: n }, { f: t.F125, type: "peaking", gain: o }, { f: t.F250, type: "peaking", gain: r }, { f: t.F500, type: "peaking", gain: i }, { f: t.F1K, type: "peaking", gain: u }, { f: t.F2K, type: "peaking", gain: a }, { f: t.F4K, type: "peaking", gain: c }, { f: t.F8K, type: "peaking", gain: l }, { f: t.F16K, type: "highshelf", gain: b }].map(function(L) {
        var h = _().context.audioContext.createBiquadFilter();
        return h.type = L.type, g.setParamValue(h.Q, 1), h.frequency.value = L.f, g.setParamValue(h.gain, L.gain), h;
      });
      (d = s.call(this, m[0], m[m.length - 1]) || this).bands = m, d.bandsMap = {};
      for (var y = 0; y < d.bands.length; y++) {
        var x = d.bands[y];
        y > 0 && d.bands[y - 1].connect(x), d.bandsMap[x.frequency.value] = x;
      }
      return d;
    }
    d = s.call(this, null) || this;
  }
  return v(t, s), t.prototype.setGain = function(e, n) {
    if (n === void 0 && (n = 0), !this.bandsMap[e]) throw new Error("No band found for frequency ".concat(e));
    g.setParamValue(this.bandsMap[e].gain, n);
  }, t.prototype.getGain = function(e) {
    if (!this.bandsMap[e]) throw new Error("No band found for frequency ".concat(e));
    return this.bandsMap[e].gain.value;
  }, Object.defineProperty(t.prototype, "f32", { get: function() {
    return this.getGain(t.F32);
  }, set: function(e) {
    this.setGain(t.F32, e);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "f64", { get: function() {
    return this.getGain(t.F64);
  }, set: function(e) {
    this.setGain(t.F64, e);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "f125", { get: function() {
    return this.getGain(t.F125);
  }, set: function(e) {
    this.setGain(t.F125, e);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "f250", { get: function() {
    return this.getGain(t.F250);
  }, set: function(e) {
    this.setGain(t.F250, e);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "f500", { get: function() {
    return this.getGain(t.F500);
  }, set: function(e) {
    this.setGain(t.F500, e);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "f1k", { get: function() {
    return this.getGain(t.F1K);
  }, set: function(e) {
    this.setGain(t.F1K, e);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "f2k", { get: function() {
    return this.getGain(t.F2K);
  }, set: function(e) {
    this.setGain(t.F2K, e);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "f4k", { get: function() {
    return this.getGain(t.F4K);
  }, set: function(e) {
    this.setGain(t.F4K, e);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "f8k", { get: function() {
    return this.getGain(t.F8K);
  }, set: function(e) {
    this.setGain(t.F8K, e);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "f16k", { get: function() {
    return this.getGain(t.F16K);
  }, set: function(e) {
    this.setGain(t.F16K, e);
  }, enumerable: !1, configurable: !0 }), t.prototype.reset = function() {
    this.bands.forEach(function(e) {
      g.setParamValue(e.gain, 0);
    });
  }, t.prototype.destroy = function() {
    this.bands.forEach(function(e) {
      e.disconnect();
    }), this.bands = null, this.bandsMap = null;
  }, t.F32 = 32, t.F64 = 64, t.F125 = 125, t.F250 = 250, t.F500 = 500, t.F1K = 1e3, t.F2K = 2e3, t.F4K = 4e3, t.F8K = 8e3, t.F16K = 16e3, t;
}(E), DistortionFilter: function(s) {
  function t(e) {
    e === void 0 && (e = 0);
    var n = this;
    if (!_().useLegacy) {
      var o = _().context.audioContext.createWaveShaper();
      return (n = s.call(this, o) || this)._distortion = o, n.amount = e, n;
    }
    n = s.call(this, null) || this;
  }
  return v(t, s), Object.defineProperty(t.prototype, "amount", { get: function() {
    return this._amount;
  }, set: function(e) {
    this._amount = e;
    for (var n, o = 1e3 * e, r = 44100, i = new Float32Array(r), u = Math.PI / 180, a = 0; a < r; ++a) n = 2 * a / r - 1, i[a] = (3 + o) * n * 20 * u / (Math.PI + o * Math.abs(n));
    this._distortion.curve = i, this._distortion.oversample = "4x";
  }, enumerable: !1, configurable: !0 }), t.prototype.destroy = function() {
    this._distortion = null, s.prototype.destroy.call(this);
  }, t;
}(E), StereoFilter: function(s) {
  function t(e) {
    e === void 0 && (e = 0);
    var n = this;
    if (!_().useLegacy) {
      var o, r, i, u = _().context.audioContext;
      return u.createStereoPanner ? i = o = u.createStereoPanner() : ((r = u.createPanner()).panningModel = "equalpower", i = r), (n = s.call(this, i) || this)._stereo = o, n._panner = r, n.pan = e, n;
    }
    n = s.call(this, null) || this;
  }
  return v(t, s), Object.defineProperty(t.prototype, "pan", { get: function() {
    return this._pan;
  }, set: function(e) {
    this._pan = e, this._stereo ? g.setParamValue(this._stereo.pan, e) : this._panner.setPosition(e, 0, 1 - Math.abs(e));
  }, enumerable: !1, configurable: !0 }), t.prototype.destroy = function() {
    s.prototype.destroy.call(this), this._stereo = null, this._panner = null;
  }, t;
}(E), ReverbFilter: function(s) {
  function t(e, n, o) {
    e === void 0 && (e = 3), n === void 0 && (n = 2), o === void 0 && (o = !1);
    var r = this;
    if (!_().useLegacy) return (r = s.call(this, null) || this)._seconds = r._clamp(e, 1, 50), r._decay = r._clamp(n, 0, 100), r._reverse = o, r._rebuild(), r;
    r = s.call(this, null) || this;
  }
  return v(t, s), t.prototype._clamp = function(e, n, o) {
    return Math.min(o, Math.max(n, e));
  }, Object.defineProperty(t.prototype, "seconds", { get: function() {
    return this._seconds;
  }, set: function(e) {
    this._seconds = this._clamp(e, 1, 50), this._rebuild();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "decay", { get: function() {
    return this._decay;
  }, set: function(e) {
    this._decay = this._clamp(e, 0, 100), this._rebuild();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "reverse", { get: function() {
    return this._reverse;
  }, set: function(e) {
    this._reverse = e, this._rebuild();
  }, enumerable: !1, configurable: !0 }), t.prototype._rebuild = function() {
    for (var e, n = _().context.audioContext, o = n.sampleRate, r = o * this._seconds, i = n.createBuffer(2, r, o), u = i.getChannelData(0), a = i.getChannelData(1), c = 0; c < r; c++) e = this._reverse ? r - c : c, u[c] = (2 * Math.random() - 1) * Math.pow(1 - e / r, this._decay), a[c] = (2 * Math.random() - 1) * Math.pow(1 - e / r, this._decay);
    var l = _().context.audioContext.createConvolver();
    l.buffer = i, this.init(l);
  }, t;
}(E), MonoFilter: function(s) {
  function t() {
    var e = this;
    if (!_().useLegacy) {
      var n = _().context.audioContext, o = n.createChannelSplitter(), r = n.createChannelMerger();
      return r.connect(o), (e = s.call(this, r, o) || this)._merger = r, e;
    }
    e = s.call(this, null) || this;
  }
  return v(t, s), t.prototype.destroy = function() {
    this._merger.disconnect(), this._merger = null, s.prototype.destroy.call(this);
  }, t;
}(E), StreamFilter: function(s) {
  function t() {
    var e = this;
    if (!_().useLegacy) {
      var n = _().context.audioContext, o = n.createMediaStreamDestination(), r = n.createMediaStreamSource(o.stream);
      return (e = s.call(this, o, r) || this)._stream = o.stream, e;
    }
    e = s.call(this, null) || this;
  }
  return v(t, s), Object.defineProperty(t.prototype, "stream", { get: function() {
    return this._stream;
  }, enumerable: !1, configurable: !0 }), t.prototype.destroy = function() {
    this._stream = null, s.prototype.destroy.call(this);
  }, t;
}(E), TelephoneFilter: function(s) {
  function t() {
    if (!_().useLegacy) {
      var e = _().context.audioContext, n = e.createBiquadFilter(), o = e.createBiquadFilter(), r = e.createBiquadFilter(), i = e.createBiquadFilter();
      return n.type = "lowpass", g.setParamValue(n.frequency, 2e3), o.type = "lowpass", g.setParamValue(o.frequency, 2e3), r.type = "highpass", g.setParamValue(r.frequency, 500), i.type = "highpass", g.setParamValue(i.frequency, 500), n.connect(o), o.connect(r), r.connect(i), s.call(this, n, i) || this;
    }
    s.call(this, null);
  }
  return v(t, s), t;
}(E) }, z = 0, Et = { __proto__: null, playOnce: function(s, t) {
  var e = "alias".concat(z++);
  return _().add(e, { url: s, preload: !0, autoPlay: !0, loaded: function(n) {
    n && (_().remove(e), t && t(n));
  }, complete: function() {
    _().remove(e), t && t(null);
  } }), e;
}, get PLAY_ID() {
  return z;
}, render: function(s, t) {
  var e = document.createElement("canvas");
  t = k({ width: 512, height: 128, fill: "black" }, t || {}), e.width = t.width, e.height = t.height;
  var n = at.from(e);
  if (!(s.media instanceof H)) return n;
  var o = s.media, r = e.getContext("2d");
  r.fillStyle = t.fill;
  for (var i = o.buffer.getChannelData(0), u = Math.ceil(i.length / t.width), a = t.height / 2, c = 0; c < t.width; c++) {
    for (var l = 1, b = -1, d = 0; d < u; d++) {
      var m = i[c * u + d];
      m < l && (l = m), m > b && (b = m);
    }
    r.fillRect(c, (1 + l) * a, 1, Math.max(1, (b - l) * a));
  }
  return n;
}, resolveUrl: J, sineTone: function(s, t) {
  s === void 0 && (s = 200), t === void 0 && (t = 1);
  var e = M.from({ singleInstance: !0 });
  if (!(e.media instanceof H)) return e;
  for (var n = e.media, o = e.context.audioContext.createBuffer(1, 48e3 * t, 48e3), r = o.getChannelData(0), i = 0; i < r.length; i++) {
    var u = s * (i / o.sampleRate) * Math.PI;
    r[i] = 2 * Math.sin(u);
  }
  return n.buffer = o, e.isLoaded = !0, e;
}, validateFormats: st, supported: B, extensions: Y }, N = function(s) {
  return et = s, s;
}(new Ot());
"extensions" in rt ? ut.add(q) : tt.registerPlugin(q);
let Z, p, S, Q, A;
class f {
  static #t = {};
  static init(t, e, n, o) {
    f.#t = {}, Z = t, p = e, S = n, Q = o;
  }
  static setEvtMng(t) {
    A = t;
  }
  static delLoopPlay(t) {
    delete f.#t[t];
    const e = "const.sn.sound." + t + ".";
    p.setVal_Nochk("save", e + "fn", ""), p.setVal_Nochk("save", "const.sn.loopPlaying", JSON.stringify(f.#t)), p.flush();
  }
  static getVol(t, e) {
    const n = O(t, "volume", e);
    return n < 0 ? 0 : n > 1 ? 1 : n;
  }
  static xchgbuf({ buf: t = "SE", buf2: e = "SE" }) {
    if (t === e) throw `[xchgbuf] buf:${t} が同じ値です`;
    const n = "const.sn.sound." + t + ".", o = Number(p.getVal("save:" + n + "volume")), r = String(p.getVal("save:" + n + "fn")), i = "const.sn.sound." + e + ".", u = Number(p.getVal("save:" + i + "volume")), a = String(p.getVal("save:" + i + "fn"));
    p.setVal_Nochk("save", n + "volume", u), p.setVal_Nochk("save", i + "volume", o), p.setVal_Nochk("save", n + "fn", a), p.setVal_Nochk("save", i + "fn", r), t in f.#t != e in f.#t && (t in f.#t ? (delete f.#t[t], f.#t[e] = r) : (delete f.#t[e], f.#t[t] = a), p.setVal_Nochk("save", "const.sn.loopPlaying", JSON.stringify(f.#t))), p.flush();
  }
  #e;
  #s = "";
  get fn() {
    return this.#s;
  }
  static #n = 999e3;
  init(t) {
    const { buf: e = "SE", fn: n = "" } = t;
    this.#s = n;
    const o = O(t, "start_ms", 0), r = O(t, "end_ms", f.#n), i = O(t, "ret_ms", 0), u = O(t, "pan", 0), a = O(t, "speed", 1);
    if (o < 0) throw `[playse] start_ms:${o} が負の値です`;
    if (i < 0) throw `[playse] ret_ms:${i} が負の値です`;
    if (0 < r) {
      if (r <= o) throw `[playse] start_ms:${o} >= end_ms:${r} は異常値です`;
      if (r <= i) throw `[playse] ret_ms:${i} >= end_ms:${r} は異常値です`;
    }
    const c = "const.sn.sound." + e + ".";
    p.setVal_Nochk("save", c + "fn", n);
    const l = f.getVol(t, 1);
    p.setVal_Nochk("save", c + "volume", l);
    const b = l * Number(p.getVal("sys:" + c + "volume", 1)), d = j(t, "loop", !1);
    d ? (f.#t[e] = n, p.setVal_Nochk("save", "const.sn.loopPlaying", JSON.stringify(f.#t))) : f.delLoopPlay(e), p.setVal_Nochk("save", c + "start_ms", o), p.setVal_Nochk("save", c + "end_ms", r), p.setVal_Nochk("save", c + "ret_ms", i), p.setVal_Nochk("tmp", c + "playing", !0), p.flush();
    const m = N.find(n);
    this.#e = {
      fn: n,
      stt: m ? new D() : new St(),
      snd: m,
      loop: d,
      start_ms: o,
      end_ms: r,
      ret_ms: 0,
      pan: u
    };
    const y = {
      loop: d,
      speed: a,
      volume: b,
      loaded: (h, P) => {
        if (!this.#e.stt.isDestroy) {
          if (h) {
            S.errScript(`ロード失敗ですa fn:${n} ${h}`, !1);
            return;
          }
          P && (this.#e.snd = P, this.#e.stt.onLoad(this.#e), u !== 0 && (P.filters = [new U.StereoFilter(u)]), t.fnc?.());
        }
      }
    };
    let x = "";
    if (0 < o || r < f.#n) {
      x = `${n};${o};${r};${i}`;
      const h = (y.sprites ??= {})[x] = {
        start: o / 1e3,
        end: r / 1e3
      };
      y.preload = !0;
      const P = y.loaded;
      y.loaded = (C, V) => {
        if (this.#e.stt.isDestroy) return;
        P(C, V);
        const I = V, G = I.duration;
        h.end < 0 && (h.end += G, I.removeSprites(x), I.addSprites(x, h)), h.end <= h.start && S.errScript(`[playse] end_ms:${r}(${h.end * 1e3}) >= start_ms:${o} は異常値です`), h.end * 1e3 <= i && S.errScript(`[playse] end_ms:${r}(${h.end * 1e3}) <= ret_ms:${i} は異常値です`), G <= h.start && S.errScript(`[playse] 音声ファイル再生時間:${G * 1e3} <= start_ms:${o} は異常値です`), r !== f.#n && G <= h.end && S.errScript(`[playse] 音声ファイル再生時間:${G * 1e3} <= end_ms:${r} は異常値です`), I.play(x, (it) => {
          y.complete?.(it), d || this.#e.stt.onPlayEnd(e);
        });
      };
    } else y.autoPlay = !0;
    if (d ? i !== 0 && (y.loop = !1, y.complete = async (h) => {
      const P = h.duration, C = i / 1e3, V = r / 1e3;
      P <= C && S.errScript(`[playse] 音声ファイル再生時間:${P * 1e3} <=  ret_ms:${i} は異常値です`), await h.play({
        // 一周目はループなし、なのでキャッシュされてる
        ...y,
        start: C,
        end: V < 0 ? V + P : V,
        // 負の値は末尾から
        //	speed,		// 重複
        loop: !0,
        //	volume,		// 重複
        //-	muted?: boolean;
        filters: u !== 0 ? [new U.StereoFilter(u)] : []
        //-	complete?: CompleteCallback;
        //-	loaded?: LoadedCallback;
        //-	singleInstance?: boolean;
      });
    }) : y.complete = () => {
      X(this.#e, e), this.#e.stt.onPlayEnd(e);
    }, this.#o(), m) {
      if (m.volume = b, x) this.#i(n, y);
      else if (m.isPlayable) {
        const h = m.options.source;
        !(h instanceof ArrayBuffer) || h.byteLength === 0 ? m.play(y) : this.#e.snd = M.from({
          ...y,
          url: m.options.url,
          source: h
        }), u !== 0 && (m.filters = [new U.StereoFilter(u)]);
      }
      return !1;
    }
    const L = j(t, "join", !0);
    if (L) {
      ct();
      const h = y.loaded;
      y.loaded = (P, C) => {
        this.#e.stt.isDestroy || h(P, C), lt();
      };
    }
    return this.#i(n, y), L;
  }
  #o = () => {
    N.volumeAll = Number(p.getVal("sys:sn.sound.global_volume", 1)), this.#o = () => {
    };
  };
  #i(t, e) {
    const n = Z.searchPath(t, pt.SOUND);
    if (!n.endsWith(".bin")) {
      e.url = n, M.from(e);
      return;
    }
    new tt().add({ name: t, url: n, xhrType: w.XHR_RESPONSE_TYPE.BUFFER }).use(async (o, r) => {
      try {
        o.data = await Q.decAB(o.data);
      } catch (i) {
        S.errScript(`Sound ロード失敗ですc fn:${o.name} ${i}`, !1);
      }
      r();
    }).load((o, r) => {
      e.source = r[t]?.data, M.from(e);
    });
  }
  ws = (t) => this.#e.stt.ws(this.#e, t);
  stopse({ buf: t = "SE" }) {
    X(this.#e, t), this.#e.stt.stopse(this.#e);
  }
  fade = (t) => this.#e.stt.fade(this.#e, t);
  wf = (t) => this.#e.stt.wf(this.#e, t);
  stopfadese = (t) => this.#e.stt.stopfadese(this.#e, t);
}
function X({ loop: s }, t) {
  if (s) f.delLoopPlay(t);
  else {
    const e = "const.sn.sound." + t + ".";
    p.setVal_Nochk("tmp", e + "playing", !1), p.flush();
  }
}
function R(s) {
  s.stop().end();
}
class St {
  onLoad(t) {
    t.stt = new D();
  }
  stopse(t) {
    t.stt = new F(t, !1);
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
class D {
  onLoad() {
  }
  // ok
  stopse(t) {
    t.stt = new F(t);
  }
  ws(t, e) {
    if (t.loop) return !1;
    const { buf: n = "SE" } = e, o = j(e, "stop", !0);
    return j(e, "canskip", !1), A.waitEvent("buf:" + n, e, () => {
      X(t, n), t.stt.onPlayEnd(n), o ? t.stt.stopse(t) : t.stt.onPlayEnd = () => {
      };
    }) ? (t.stt = new jt(), !0) : !1;
  }
  onPlayEnd() {
  }
  // ok
  fade(t, e) {
    const { buf: n = "SE" } = e, r = "const.sn.sound." + n + "." + "volume", i = f.getVol(e, NaN);
    p.setVal_Nochk("save", r, i);
    const u = i * Number(p.getVal("sys:" + r, 1)), a = j(e, "stop", i === 0);
    a && f.delLoopPlay(n), p.flush();
    const c = O(e, "time", NaN), l = O(e, "delay", 0);
    if (c === 0 && l === 0 || A.isSkipping) {
      t.snd.volume = u, t.stt = a ? new F(t) : new D();
      return;
    }
    const b = new ht(t.snd);
    ft.setTwProp(b, e).to({ volume: u }, c).onComplete(() => {
      dt(b), t.stt.compFade(n), t.stt = a ? new F(t) : new D();
    }).start(), t.stt = new Ft(b);
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
class jt {
  onLoad() {
  }
  // ok
  stopse(t) {
    t.stt = new F(t);
  }
  ws = () => !1;
  // ok
  onPlayEnd(t) {
    A.breakEvent("buf:" + t);
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
class Ft {
  constructor(t) {
    this.tw = t;
  }
  onLoad() {
  }
  // ok
  stopse(t) {
    R(this.tw), t.stt = new F(t);
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
  wf(t, e) {
    const { buf: n = "SE" } = e;
    return j(e, "canskip", !1), A.waitEvent("buf:" + n, e, () => R(this.tw)) ? (t.stt = new kt(this.tw), !0) : !1;
  }
  compFade() {
  }
  // ok
  stopfadese = () => R(this.tw);
  isDestroy = !1;
}
class kt {
  constructor(t) {
    this.tw = t;
  }
  onLoad() {
  }
  // ok
  stopse(t) {
    R(this.tw), t.stt = new F(t);
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
  compFade(t) {
    A.breakEvent("buf:" + t);
  }
  stopfadese = () => R(this.tw);
  isDestroy = !1;
}
class F {
  constructor(t, e = !0) {
    if (this.sb = t, this.stop = e, e) {
      if (t.snd.stop(), !t.loop) return;
      t.snd.destroy(), t.snd.destroy = () => {
      };
    }
  }
  // destroy がないと再生が残るケースが。効果音だと破棄が激しいのでループモノ(BGM)だけにする
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
class Ct {
  constructor(t, e, n, o, r) {
    this.val = n, e.volume = (i) => this.#s(i), e.fadebgm = (i) => this.#l(i), e.fadeoutbgm = (i) => this.#o(i), e.fadeoutse = (i) => this.#i(i), e.fadese = (i) => this.#r(i), e.playbgm = (i) => this.#p(i), e.playse = (i) => this.#c(i), e.stop_allse = () => this.#u(), e.stopbgm = (i) => this.#_(i), e.stopse = (i) => this.#a(i), e.wb = (i) => this.#y(i), e.wf = (i) => this.#h(i), e.stopfadese = (i) => this.#f(i), e.wl = (i) => this.#m(i), e.ws = (i) => this.#d(i), e.xchgbuf = (i) => this.#b(i), n.setVal_Nochk("save", "const.sn.loopPlaying", "{}"), n.setVal_Nochk("tmp", "const.sn.sound.codecs", JSON.stringify(Et.supported)), f.init(t, n, o, r), N.disableAutoPause = !0;
  }
  #t = {};
  #e;
  setEvtMng(t) {
    this.#e = t, f.setEvtMng(t);
  }
  setNoticeChgVolume(t, e) {
    this.val.defValTrg("sys:sn.sound.global_volume", (n, o) => t(N.volumeAll = Number(o))), this.val.defValTrg("sys:sn.sound.movie_volume", (n, o) => e(Number(o))), this.val.setVal_Nochk("sys", "sn.sound.global_volume", this.val.getVal("sys:sn.sound.global_volume", 1)), this.val.setVal_Nochk("sys", "sn.sound.movie_volume", this.val.getVal("sys:sn.sound.movie_volume", 1));
  }
  //MARK: 音量設定（独自拡張）
  #s(t) {
    const { buf: e = "SE" } = t, n = "const.sn.sound." + e + ".volume", o = this.#n(t, 1);
    return Number(this.val.getVal("sys:" + n)) === o ? !1 : (this.val.setVal_Nochk("sys", n, o), this.val.flush(), t.time = 0, t.volume = Number(this.val.getVal("save:" + n)), this.#r(t));
  }
  #n(t, e) {
    const n = O(t, "volume", e);
    return n < 0 ? 0 : n > 1 ? 1 : n;
  }
  //MARK: BGM/効果音のフェードアウト（loadから使うのでマクロ化禁止）
  #o(t) {
    return t.volume = 0, this.#l(t);
  }
  //MARK: 効果音のフェードアウト（loadから使うのでマクロ化禁止）
  #i(t) {
    return t.volume = 0, this.#r(t);
  }
  //MARK: BGMのフェード（loadから使うのでマクロ化禁止）
  #l(t) {
    return t.buf = "BGM", this.#r(t);
  }
  //MARK: 効果音のフェード
  #r(t) {
    const { buf: e = "SE" } = t;
    return this.#f(t), this.#t[e]?.fade(t), !1;
  }
  //MARK: BGM の演奏
  #p(t) {
    return t.buf = "BGM", t.canskip = !1, j(t, "loop", !0), this.#c(t);
  }
  //MARK: 効果音の再生
  #c(t) {
    const { buf: e = "SE", fn: n } = t;
    if (this.#a({ buf: e }), !n) throw `fnは必須です buf:${e}`;
    return j(t, "canskip", !0) && this.#e.isSkipping ? !1 : (this.#t[e] = new f()).init(t);
  }
  clearCache() {
    N.removeAll();
  }
  //MARK: 全効果音再生の停止
  #u() {
    for (const t of Object.keys(this.#t)) this.#a({ buf: t });
    return this.#t = {}, N.stopAll(), !1;
  }
  //MARK: BGM 演奏の停止（loadから使うのでマクロ化禁止）
  #_(t) {
    return t.buf = "BGM", this.#a(t);
  }
  //MARK: 効果音再生の停止
  #a(t) {
    const { buf: e = "SE" } = t;
    return this.#t[e]?.stopse(t), !1;
  }
  //MARK: BGM フェードの終了待ち
  #y(t) {
    return t.buf = "BGM", this.#h(t);
  }
  //MARK: 効果音フェードの終了待ち
  #h(t) {
    const { buf: e = "SE" } = t;
    return this.#t[e]?.wf(t);
  }
  //MARK: 音声フェードの停止
  #f(t) {
    const { buf: e = "SE" } = t;
    return this.#t[e]?.stopfadese(t), !1;
  }
  //MARK: BGM 再生の終了待ち
  #m(t) {
    return t.buf = "BGM", this.#d(t);
  }
  //MARK: 効果音再生の終了待ち
  #d(t) {
    const { buf: e = "SE" } = t;
    return this.#t[e]?.ws(t);
  }
  //MARK: 再生トラックの交換
  #b(t) {
    const { buf: e = "SE", buf2: n = "SE" } = t;
    return e === n || ([this.#t[e], this.#t[n]] = [this.#t[n], this.#t[e]], f.xchgbuf(t)), !1;
  }
  //MARK: しおりの読込（BGM状態復元）
  playLoopFromSaveObj(t) {
    const e = String(this.val.getVal("save:const.sn.loopPlaying", "{}"));
    if (e === "{}")
      return this.#u(), this.clearCache(), [];
    const n = JSON.parse(e);
    if (t)
      this.#u(), this.clearCache();
    else for (const [o, r] of Object.entries(this.#t))
      o in n || r?.stopse({ buf: o });
    return Object.entries(n).map(([o, r]) => new Promise((i) => {
      const u = this.#t[o];
      if (!t && u && u.fn === r) {
        i();
        return;
      }
      const a = "save:const.sn.sound." + o + ".", c = {
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
      c.buf === "BGM" ? this.#p(c) : this.#c(c);
    }));
  }
  destroy() {
    this.#u(), this.clearCache();
  }
}
export {
  Ct as SoundMng
};
//# sourceMappingURL=SoundMng.js.map
