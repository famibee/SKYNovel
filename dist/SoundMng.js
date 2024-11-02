import { T as D, n as ht, e as pt, L as it, a as O, i as I, B as ft, b as E, c as L, d as dt, f as _t, S as yt, g as mt, C as bt, r as vt } from "./web2.js";
/*!
 * @pixi/sound - v4.4.1
 * https://github.com/pixijs/pixi-sound
 * Compiled Tue, 15 Aug 2023 19:22:13 UTC
 *
 * @pixi/sound is licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license
 */
var rt;
function d() {
  return rt;
}
var ut = function(n, t) {
  return (ut = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, s) {
    e.__proto__ = s;
  } || function(e, s) {
    for (var o in s) Object.prototype.hasOwnProperty.call(s, o) && (e[o] = s[o]);
  })(n, t);
};
function g(n, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  function e() {
    this.constructor = n;
  }
  ut(n, t), n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var V = function() {
  return (V = Object.assign || function(n) {
    for (var t, e = 1, s = arguments.length; e < s; e++) for (var o in t = arguments[e]) Object.prototype.hasOwnProperty.call(t, o) && (n[o] = t[o]);
    return n;
  }).apply(this, arguments);
}, Z = ["mp3", "ogg", "oga", "opus", "mpeg", "wav", "m4a", "aiff", "wma", "mid", "caf"], H = {};
function at(n) {
  var t = V({ m4a: "audio/mp4", oga: "audio/ogg", opus: 'audio/ogg; codecs="opus"', caf: 'audio/x-caf; codecs="opus"' }, n || {}), e = document.createElement("audio"), s = {}, o = /^no$/;
  Z.forEach(function(r) {
    var i = e.canPlayType("audio/".concat(r)).replace(o, ""), u = t[r] ? e.canPlayType(t[r]).replace(o, "") : "";
    s[r] = !!i || !!u;
  }), Object.assign(H, s);
}
at();
var gt = /\.(\{([^\}]+)\})(\?.*)?$/;
function Q(n) {
  var t = gt, e = typeof n == "string" ? n : n.url;
  if (!t.test(e)) return e;
  for (var s = t.exec(e), o = s[2].split(","), r = o[o.length - 1], i = 0, u = o.length; i < u; i++) {
    var a = o[i];
    if (H[a]) {
      r = a;
      break;
    }
  }
  var l = e.replace(s[1], r);
  if (typeof n != "string") {
    var c = n;
    c.extension = r, c.url = l;
  }
  return l;
}
var X = Z.filter(function(n) {
  return H[n];
}), Y = function() {
  function n() {
  }
  return n.add = function() {
    n.setLegacy(d().useLegacy);
  }, n.setLegacy = function(t) {
    t ? X.forEach(function(e) {
      O.setExtensionXhrType(e, O.XHR_RESPONSE_TYPE.DEFAULT), O.setExtensionLoadType(e, O.LOAD_TYPE.AUDIO);
    }) : X.forEach(function(e) {
      O.setExtensionXhrType(e, O.XHR_RESPONSE_TYPE.BUFFER), O.setExtensionLoadType(e, O.LOAD_TYPE.XHR);
    });
  }, n.pre = function(t, e) {
    Q(t), e();
  }, n.use = function(t, e) {
    t.data && X.indexOf(t.extension) > -1 ? t.sound = d().add(t.name, { loaded: e, preload: !0, url: t.url, source: t.data }) : e();
  }, n.extension = "loader", n;
}(), Pt = 0, xt = function(n) {
  function t(e) {
    var s = n.call(this) || this;
    return s.id = Pt++, s.init(e), s;
  }
  return g(t, n), t.prototype.set = function(e, s) {
    if (this[e] === void 0) throw new Error("Property with name ".concat(e, " does not exist."));
    switch (e) {
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
    var s = this._source = e.source.cloneNode(!1);
    s.src = e.parent.url, s.onplay = this._onPlay.bind(this), s.onpause = this._onPause.bind(this), e.context.on("refresh", this.refresh, this), e.context.on("refreshPaused", this.refreshPaused, this), this._media = e;
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
    var e = this._media.context, s = this._media.parent;
    this._source.loop = this._loop || s.loop;
    var o = e.volume * (e.muted ? 0 : 1), r = s.volume * (s.muted ? 0 : 1), i = this._volume * (this._muted ? 0 : 1);
    this._source.volume = i * o * r, this._source.playbackRate = this._speed * e.speed * s.speed;
  }, t.prototype.refreshPaused = function() {
    var e = this._media.context, s = this._media.parent, o = this._paused || s.paused || e.paused;
    o !== this._pausedReal && (this._pausedReal = o, o ? (this._internalStop(), this.emit("paused")) : (this.emit("resumed"), this.play({ start: this._source.currentTime, end: this._end, volume: this._volume, speed: this._speed, loop: this._loop })), this.emit("pause", o));
  }, t.prototype.play = function(e) {
    var s = this, o = e.start, r = e.end, i = e.speed, u = e.loop, a = e.volume, l = e.muted;
    this._speed = i, this._volume = a, this._loop = !!u, this._muted = l, this.refresh(), this.loop && r !== null && (this.loop = !1), this._start = o, this._end = r || this._duration, this._start = Math.max(0, this._start - t.PADDING), this._end = Math.min(this._end + t.PADDING, this._duration), this._source.onloadedmetadata = function() {
      s._source && (s._source.currentTime = o, s._source.onloadedmetadata = null, s.emit("progress", o, s._duration), D.shared.add(s._onUpdate, s));
    }, this._source.onended = this._onComplete.bind(this), this._source.play(), this.emit("start");
  }, t.prototype._onUpdate = function() {
    this.emit("progress", this.progress, this._duration), this._source.currentTime >= this._end && !this._source.loop && this._onComplete();
  }, t.prototype._onComplete = function() {
    D.shared.remove(this._onUpdate, this), this._internalStop(), this.emit("progress", 1, this._duration), this.emit("end", this);
  }, t.prototype.destroy = function() {
    D.shared.remove(this._onUpdate, this), this.removeAllListeners();
    var e = this._source;
    e && (e.onended = null, e.onplay = null, e.onpause = null, this._internalStop()), this._source = null, this._speed = 1, this._volume = 1, this._loop = !1, this._end = null, this._start = 0, this._duration = 0, this._playing = !1, this._pausedReal = !1, this._paused = !1, this._muted = !1, this._media && (this._media.context.off("refresh", this.refresh, this), this._media.context.off("refreshPaused", this.refreshPaused, this), this._media = null);
  }, t.prototype.toString = function() {
    return "[HTMLAudioInstance id=".concat(this.id, "]");
  }, t.PADDING = 0.1, t;
}(I), wt = function(n) {
  function t() {
    return n !== null && n.apply(this, arguments) || this;
  }
  return g(t, n), t.prototype.init = function(e) {
    this.parent = e, this._source = e.options.source || new Audio(), e.url && (this._source.src = e.url);
  }, t.prototype.create = function() {
    return new xt(this);
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
    var s = this._source, o = this.parent;
    if (s.readyState !== 4) if (o.url) {
      s.src = o.url;
      var r = function() {
        a(), o.isLoaded = !0;
        var c = o.autoPlayStart();
        e && e(null, o, c);
      }, i = function() {
        a(), e && e(new Error("Sound loading has been aborted"));
      }, u = function() {
        a();
        var c = "Failed to load audio element (code: ".concat(s.error.code, ")");
        e && e(new Error(c));
      }, a = function() {
        s.removeEventListener("canplaythrough", r), s.removeEventListener("load", r), s.removeEventListener("abort", i), s.removeEventListener("error", u);
      };
      s.addEventListener("canplaythrough", r, !1), s.addEventListener("load", r, !1), s.addEventListener("abort", i, !1), s.addEventListener("error", u, !1), s.load();
    } else e(new Error("sound.url or sound.source must be set"));
    else {
      o.isLoaded = !0;
      var l = o.autoPlayStart();
      e && setTimeout(function() {
        e(null, o, l);
      }, 0);
    }
  }, t;
}(I), Ot = function() {
  function n(t, e) {
    this.parent = t, Object.assign(this, e), this.duration = this.end - this.start;
  }
  return n.prototype.play = function(t) {
    return this.parent.play({ complete: t, speed: this.speed || this.parent.speed, end: this.end, start: this.start, loop: this.loop });
  }, n.prototype.destroy = function() {
    this.parent = null;
  }, n;
}(), P = function() {
  function n() {
  }
  return n.setParamValue = function(t, e) {
    if (t.setValueAtTime) {
      var s = d().context;
      t.setValueAtTime(e, s.audioContext.currentTime);
    } else t.value = e;
    return e;
  }, n;
}(), Et = 0, Ft = function(n) {
  function t(e) {
    var s = n.call(this) || this;
    return s.id = Et++, s._media = null, s._paused = !1, s._muted = !1, s._elapsed = 0, s.init(e), s;
  }
  return g(t, n), t.prototype.set = function(e, s) {
    if (this[e] === void 0) throw new Error("Property with name ".concat(e, " does not exist."));
    switch (e) {
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
    var s;
    this._filters && ((s = this._filters) === null || s === void 0 || s.filter(function(o) {
      return o;
    }).forEach(function(o) {
      return o.disconnect();
    }), this._filters = null, this._source.connect(this._gain)), this._filters = e?.length ? e.slice(0) : null, this.refresh();
  }, enumerable: !1, configurable: !0 }), t.prototype.refresh = function() {
    if (this._source) {
      var e = this._media.context, s = this._media.parent;
      this._source.loop = this._loop || s.loop;
      var o = e.volume * (e.muted ? 0 : 1), r = s.volume * (s.muted ? 0 : 1), i = this._volume * (this._muted ? 0 : 1);
      P.setParamValue(this._gain.gain, i * r * o), P.setParamValue(this._source.playbackRate, this._speed * s.speed * e.speed), this.applyFilters();
    }
  }, t.prototype.applyFilters = function() {
    var e;
    if (!((e = this._filters) === null || e === void 0) && e.length) {
      this._source.disconnect();
      var s = this._source;
      this._filters.forEach(function(o) {
        s.connect(o.destination), s = o;
      }), s.connect(this._gain);
    }
  }, t.prototype.refreshPaused = function() {
    var e = this._media.context, s = this._media.parent, o = this._paused || s.paused || e.paused;
    o !== this._pausedReal && (this._pausedReal = o, o ? (this._internalStop(), this.emit("paused")) : (this.emit("resumed"), this.play({ start: this._elapsed % this._duration, end: this._end, speed: this._speed, loop: this._loop, volume: this._volume })), this.emit("pause", o));
  }, t.prototype.play = function(e) {
    var s = e.start, o = e.end, r = e.speed, i = e.loop, u = e.volume, a = e.muted, l = e.filters;
    this._paused = !1;
    var c = this._media.nodes.cloneBufferSource(), m = c.source, y = c.gain;
    this._source = m, this._gain = y, this._speed = r, this._volume = u, this._loop = !!i, this._muted = a, this._filters = l, this.refresh();
    var b = this._source.buffer.duration;
    this._duration = b, this._end = o, this._lastUpdate = this._now(), this._elapsed = s, this._source.onended = this._onComplete.bind(this), this._loop ? (this._source.loopEnd = o, this._source.loopStart = s, this._source.start(0, s)) : o ? this._source.start(0, s, o - s) : this._source.start(0, s), this.emit("start"), this._update(!0), this.enableTicker(!0);
  }, t.prototype.enableTicker = function(e) {
    D.shared.remove(this._updateListener, this), e && D.shared.add(this._updateListener, this);
  }, Object.defineProperty(t.prototype, "progress", { get: function() {
    return this._progress;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(t.prototype, "paused", { get: function() {
    return this._paused;
  }, set: function(e) {
    this._paused = e, this.refreshPaused();
  }, enumerable: !1, configurable: !0 }), t.prototype.destroy = function() {
    var e;
    this.removeAllListeners(), this._internalStop(), this._gain && (this._gain.disconnect(), this._gain = null), this._media && (this._media.context.events.off("refresh", this.refresh, this), this._media.context.events.off("refreshPaused", this.refreshPaused, this), this._media = null), (e = this._filters) === null || e === void 0 || e.forEach(function(s) {
      return s.disconnect();
    }), this._filters = null, this._end = null, this._speed = 1, this._volume = 1, this._loop = !1, this._elapsed = 0, this._duration = 0, this._paused = !1, this._muted = !1, this._pausedReal = !1;
  }, t.prototype.toString = function() {
    return "[WebAudioInstance id=".concat(this.id, "]");
  }, t.prototype._now = function() {
    return this._media.context.audioContext.currentTime;
  }, t.prototype._updateListener = function() {
    this._update();
  }, t.prototype._update = function(e) {
    if (e === void 0 && (e = !1), this._source) {
      var s = this._now(), o = s - this._lastUpdate;
      if (o > 0 || e) {
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
}(I), lt = function() {
  function n(t, e) {
    this._output = e, this._input = t;
  }
  return Object.defineProperty(n.prototype, "destination", { get: function() {
    return this._input;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "filters", { get: function() {
    return this._filters;
  }, set: function(t) {
    var e = this;
    if (this._filters && (this._filters.forEach(function(o) {
      o && o.disconnect();
    }), this._filters = null, this._input.connect(this._output)), t && t.length) {
      this._filters = t.slice(0), this._input.disconnect();
      var s = null;
      t.forEach(function(o) {
        s === null ? e._input.connect(o.destination) : s.connect(o.destination), s = o;
      }), s.connect(this._output);
    }
  }, enumerable: !1, configurable: !0 }), n.prototype.destroy = function() {
    this.filters = null, this._input = null, this._output = null;
  }, n;
}(), jt = function(n) {
  function t(e) {
    var s = this, o = e.audioContext, r = o.createBufferSource(), i = o.createGain(), u = o.createAnalyser();
    return r.connect(u), u.connect(i), i.connect(e.destination), (s = n.call(this, u, i) || this).context = e, s.bufferSource = r, s.gain = i, s.analyser = u, s;
  }
  return g(t, n), Object.defineProperty(t.prototype, "script", { get: function() {
    return this._script || (this._script = this.context.audioContext.createScriptProcessor(t.BUFFER_SIZE), this._script.connect(this.context.destination)), this._script;
  }, enumerable: !1, configurable: !0 }), t.prototype.destroy = function() {
    n.prototype.destroy.call(this), this.bufferSource.disconnect(), this._script && this._script.disconnect(), this.gain.disconnect(), this.analyser.disconnect(), this.bufferSource = null, this._script = null, this.gain = null, this.analyser = null, this.context = null;
  }, t.prototype.cloneBufferSource = function() {
    var e = this.bufferSource, s = this.context.audioContext.createBufferSource();
    s.buffer = e.buffer, P.setParamValue(s.playbackRate, e.playbackRate.value), s.loop = e.loop;
    var o = this.context.audioContext.createGain();
    return s.connect(o), o.connect(this.destination), { source: s, gain: o };
  }, Object.defineProperty(t.prototype, "bufferSize", { get: function() {
    return this.script.bufferSize;
  }, enumerable: !1, configurable: !0 }), t.BUFFER_SIZE = 0, t;
}(lt), J = function() {
  function n() {
  }
  return n.prototype.init = function(t) {
    this.parent = t, this._nodes = new jt(this.context), this._source = this._nodes.bufferSource, this.source = t.options.source;
  }, n.prototype.destroy = function() {
    this.parent = null, this._nodes.destroy(), this._nodes = null;
    try {
      this._source.buffer = null;
    } catch {
    }
    this._source = null, this.source = null;
  }, n.prototype.create = function() {
    return new Ft(this);
  }, Object.defineProperty(n.prototype, "context", { get: function() {
    return this.parent.context;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "isPlayable", { get: function() {
    return !!this._source && !!this._source.buffer;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "filters", { get: function() {
    return this._nodes.filters;
  }, set: function(t) {
    this._nodes.filters = t;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "duration", { get: function() {
    return this._source.buffer.duration;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "buffer", { get: function() {
    return this._source.buffer;
  }, set: function(t) {
    this._source.buffer = t;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "nodes", { get: function() {
    return this._nodes;
  }, enumerable: !1, configurable: !0 }), n.prototype.load = function(t) {
    this.source ? this._decode(this.source, t) : this.parent.url ? this._loadUrl(t) : t && t(new Error("sound.url or sound.source must be set"));
  }, n.prototype._loadUrl = function(t) {
    var e = this, s = new XMLHttpRequest(), o = this.parent.url;
    s.open("GET", o, !0), s.responseType = "arraybuffer", s.onload = function() {
      e.source = s.response, e._decode(s.response, t);
    }, s.send();
  }, n.prototype._decode = function(t, e) {
    var s = this, o = function(r, i) {
      if (r) e && e(r);
      else {
        s.parent.isLoaded = !0, s.buffer = i;
        var u = s.parent.autoPlayStart();
        e && e(null, s.parent, u);
      }
    };
    t instanceof AudioBuffer ? o(null, t) : this.parent.context.decode(t, o);
  }, n;
}(), T = function() {
  function n(t, e) {
    this.media = t, this.options = e, this._instances = [], this._sprites = {}, this.media.init(this);
    var s = e.complete;
    this._autoPlayOptions = s ? { complete: s } : null, this.isLoaded = !1, this.isPlaying = !1, this.autoPlay = e.autoPlay, this.singleInstance = e.singleInstance, this.preload = e.preload || this.autoPlay, this.url = e.url, this.speed = e.speed, this.volume = e.volume, this.loop = e.loop, e.sprites && this.addSprites(e.sprites), this.preload && this._preload(e.loaded);
  }
  return n.from = function(t) {
    var e = {};
    return typeof t == "string" ? e.url = t : t instanceof ArrayBuffer || t instanceof AudioBuffer || t instanceof HTMLAudioElement ? e.source = t : e = t, (e = V({ autoPlay: !1, singleInstance: !1, url: null, source: null, preload: !1, volume: 1, speed: 1, complete: null, loaded: null, loop: !1 }, e)).url && (e.url = Q(e.url)), Object.freeze(e), new n(d().useLegacy ? new wt() : new J(), e);
  }, Object.defineProperty(n.prototype, "context", { get: function() {
    return d().context;
  }, enumerable: !1, configurable: !0 }), n.prototype.pause = function() {
    return this.isPlaying = !1, this.paused = !0, this;
  }, n.prototype.resume = function() {
    return this.isPlaying = this._instances.length > 0, this.paused = !1, this;
  }, Object.defineProperty(n.prototype, "paused", { get: function() {
    return this._paused;
  }, set: function(t) {
    this._paused = t, this.refreshPaused();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "speed", { get: function() {
    return this._speed;
  }, set: function(t) {
    this._speed = t, this.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "filters", { get: function() {
    return this.media.filters;
  }, set: function(t) {
    this.media.filters = t;
  }, enumerable: !1, configurable: !0 }), n.prototype.addSprites = function(t, e) {
    if (typeof t == "object") {
      var s = {};
      for (var o in t) s[o] = this.addSprites(o, t[o]);
      return s;
    }
    var r = new Ot(this, e);
    return this._sprites[t] = r, r;
  }, n.prototype.destroy = function() {
    this._removeInstances(), this.removeSprites(), this.media.destroy(), this.media = null, this._sprites = null, this._instances = null;
  }, n.prototype.removeSprites = function(t) {
    if (t) {
      var e = this._sprites[t];
      e !== void 0 && (e.destroy(), delete this._sprites[t]);
    } else for (var s in this._sprites) this.removeSprites(s);
    return this;
  }, Object.defineProperty(n.prototype, "isPlayable", { get: function() {
    return this.isLoaded && this.media && this.media.isPlayable;
  }, enumerable: !1, configurable: !0 }), n.prototype.stop = function() {
    if (!this.isPlayable) return this.autoPlay = !1, this._autoPlayOptions = null, this;
    this.isPlaying = !1;
    for (var t = this._instances.length - 1; t >= 0; t--) this._instances[t].stop();
    return this;
  }, n.prototype.play = function(t, e) {
    var s, o = this;
    if (typeof t == "string" ? s = { sprite: i = t, loop: this.loop, complete: e } : typeof t == "function" ? (s = {}).complete = t : s = t, (s = V({ complete: null, loaded: null, sprite: null, end: null, start: 0, volume: 1, speed: 1, muted: !1, loop: !1 }, s || {})).sprite) {
      var r = s.sprite, i = this._sprites[r];
      s.start = i.start + (s.start || 0), s.end = i.end, s.speed = i.speed || 1, s.loop = i.loop || s.loop, delete s.sprite;
    }
    if (s.offset && (s.start = s.offset), !this.isLoaded) return new Promise(function(a, l) {
      o.autoPlay = !0, o._autoPlayOptions = s, o._preload(function(c, m, y) {
        c ? l(c) : (s.loaded && s.loaded(c, m, y), a(y));
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
    for (var t = this._instances.length, e = 0; e < t; e++) this._instances[e].refresh();
  }, n.prototype.refreshPaused = function() {
    for (var t = this._instances.length, e = 0; e < t; e++) this._instances[e].refreshPaused();
  }, Object.defineProperty(n.prototype, "volume", { get: function() {
    return this._volume;
  }, set: function(t) {
    this._volume = t, this.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "muted", { get: function() {
    return this._muted;
  }, set: function(t) {
    this._muted = t, this.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "loop", { get: function() {
    return this._loop;
  }, set: function(t) {
    this._loop = t, this.refresh();
  }, enumerable: !1, configurable: !0 }), n.prototype._preload = function(t) {
    this.media.load(t);
  }, Object.defineProperty(n.prototype, "instances", { get: function() {
    return this._instances;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "sprites", { get: function() {
    return this._sprites;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "duration", { get: function() {
    return this.media.duration;
  }, enumerable: !1, configurable: !0 }), n.prototype.autoPlayStart = function() {
    var t;
    return this.autoPlay && (t = this.play(this._autoPlayOptions)), t;
  }, n.prototype._removeInstances = function() {
    for (var t = this._instances.length - 1; t >= 0; t--) this._poolInstance(this._instances[t]);
    this._instances.length = 0;
  }, n.prototype._onComplete = function(t) {
    if (this._instances) {
      var e = this._instances.indexOf(t);
      e > -1 && this._instances.splice(e, 1), this.isPlaying = this._instances.length > 0;
    }
    this._poolInstance(t);
  }, n.prototype._createInstance = function() {
    if (n._pool.length > 0) {
      var t = n._pool.pop();
      return t.init(this.media), t;
    }
    return this.media.create();
  }, n.prototype._poolInstance = function(t) {
    t.destroy(), n._pool.indexOf(t) < 0 && n._pool.push(t);
  }, n._pool = [], n;
}(), kt = function(n) {
  function t() {
    var e = n !== null && n.apply(this, arguments) || this;
    return e.speed = 1, e.muted = !1, e.volume = 1, e.paused = !1, e;
  }
  return g(t, n), t.prototype.refresh = function() {
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
}(I), tt = function(n) {
  function t() {
    var e = n.call(this, null, null) || this;
    e.autoPause = !0;
    var s = window, o = new t.AudioContext(), r = o.createDynamicsCompressor(), i = o.createAnalyser();
    return i.connect(r), r.connect(o.destination), e._input = i, e._output = o.destination, e._ctx = o, e._offlineCtx = new t.OfflineAudioContext(1, 2, s.OfflineAudioContext ? Math.max(8e3, Math.min(96e3, o.sampleRate)) : 44100), e.compressor = r, e.analyser = i, e.events = new I(), e.volume = 1, e.speed = 1, e.muted = !1, e.paused = !1, e._locked = o.state === "suspended" && ("ontouchstart" in globalThis || "onclick" in globalThis), e._locked && (e._unlock(), e._unlock = e._unlock.bind(e), document.addEventListener("mousedown", e._unlock, !0), document.addEventListener("touchstart", e._unlock, !0), document.addEventListener("touchend", e._unlock, !0)), e.onFocus = e.onFocus.bind(e), e.onBlur = e.onBlur.bind(e), globalThis.addEventListener("focus", e.onFocus), globalThis.addEventListener("blur", e.onBlur), e;
  }
  return g(t, n), t.prototype.onFocus = function() {
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
    n.prototype.destroy.call(this);
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
  }, t.prototype.decode = function(e, s) {
    var o = function(i) {
      s(new Error(i?.message || "Unable to decode file"));
    }, r = this._offlineCtx.decodeAudioData(e, function(i) {
      s(null, i);
    }, o);
    r && r.catch(o);
  }, t;
}(lt), St = function() {
  function n() {
    this.init();
  }
  return n.prototype.init = function() {
    return this.supported && (this._webAudioContext = new tt()), this._htmlAudioContext = new kt(), this._sounds = {}, this.useLegacy = !this.supported, this;
  }, Object.defineProperty(n.prototype, "context", { get: function() {
    return this._context;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "filtersAll", { get: function() {
    return this.useLegacy ? [] : this._context.filters;
  }, set: function(t) {
    this.useLegacy || (this._context.filters = t);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "supported", { get: function() {
    return tt.AudioContext !== null;
  }, enumerable: !1, configurable: !0 }), n.prototype.add = function(t, e) {
    if (typeof t == "object") {
      var s = {};
      for (var o in t) {
        var r = this._getOptions(t[o], e);
        s[o] = this.add(o, r);
      }
      return s;
    }
    if (e instanceof T) return this._sounds[t] = e, e;
    var i = this._getOptions(e), u = T.from(i);
    return this._sounds[t] = u, u;
  }, n.prototype._getOptions = function(t, e) {
    var s;
    return s = typeof t == "string" ? { url: t } : t instanceof ArrayBuffer || t instanceof AudioBuffer || t instanceof HTMLAudioElement ? { source: t } : t, s = V(V({}, s), e || {});
  }, Object.defineProperty(n.prototype, "useLegacy", { get: function() {
    return this._useLegacy;
  }, set: function(t) {
    Y.setLegacy(t), this._useLegacy = t, this._context = !t && this.supported ? this._webAudioContext : this._htmlAudioContext;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "disableAutoPause", { get: function() {
    return !this._webAudioContext.autoPause;
  }, set: function(t) {
    this._webAudioContext.autoPause = !t;
  }, enumerable: !1, configurable: !0 }), n.prototype.remove = function(t) {
    return this.exists(t, !0), this._sounds[t].destroy(), delete this._sounds[t], this;
  }, Object.defineProperty(n.prototype, "volumeAll", { get: function() {
    return this._context.volume;
  }, set: function(t) {
    this._context.volume = t, this._context.refresh();
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "speedAll", { get: function() {
    return this._context.speed;
  }, set: function(t) {
    this._context.speed = t, this._context.refresh();
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
    for (var t in this._sounds) this._sounds[t].destroy(), delete this._sounds[t];
    return this;
  }, n.prototype.stopAll = function() {
    for (var t in this._sounds) this._sounds[t].stop();
    return this;
  }, n.prototype.exists = function(t, e) {
    return !!this._sounds[t];
  }, n.prototype.find = function(t) {
    return this.exists(t, !0), this._sounds[t];
  }, n.prototype.play = function(t, e) {
    return this.find(t).play(e);
  }, n.prototype.stop = function(t) {
    return this.find(t).stop();
  }, n.prototype.pause = function(t) {
    return this.find(t).pause();
  }, n.prototype.resume = function(t) {
    return this.find(t).resume();
  }, n.prototype.volume = function(t, e) {
    var s = this.find(t);
    return e !== void 0 && (s.volume = e), s.volume;
  }, n.prototype.speed = function(t, e) {
    var s = this.find(t);
    return e !== void 0 && (s.speed = e), s.speed;
  }, n.prototype.duration = function(t) {
    return this.find(t).duration;
  }, n.prototype.close = function() {
    return this.removeAll(), this._sounds = null, this._webAudioContext && (this._webAudioContext.destroy(), this._webAudioContext = null), this._htmlAudioContext && (this._htmlAudioContext.destroy(), this._htmlAudioContext = null), this._context = null, this;
  }, n;
}(), j = function() {
  function n(t, e) {
    this.init(t, e);
  }
  return n.prototype.init = function(t, e) {
    this.destination = t, this.source = e || t;
  }, n.prototype.connect = function(t) {
    this.source.connect(t);
  }, n.prototype.disconnect = function() {
    this.source.disconnect();
  }, n.prototype.destroy = function() {
    this.disconnect(), this.destination = null, this.source = null;
  }, n;
}(), q = { __proto__: null, Filter: j, EqualizerFilter: function(n) {
  function t(e, s, o, r, i, u, a, l, c, m) {
    e === void 0 && (e = 0), s === void 0 && (s = 0), o === void 0 && (o = 0), r === void 0 && (r = 0), i === void 0 && (i = 0), u === void 0 && (u = 0), a === void 0 && (a = 0), l === void 0 && (l = 0), c === void 0 && (c = 0), m === void 0 && (m = 0);
    var y = this;
    if (!d().useLegacy) {
      var b = [{ f: t.F32, type: "lowshelf", gain: e }, { f: t.F64, type: "peaking", gain: s }, { f: t.F125, type: "peaking", gain: o }, { f: t.F250, type: "peaking", gain: r }, { f: t.F500, type: "peaking", gain: i }, { f: t.F1K, type: "peaking", gain: u }, { f: t.F2K, type: "peaking", gain: a }, { f: t.F4K, type: "peaking", gain: l }, { f: t.F8K, type: "peaking", gain: c }, { f: t.F16K, type: "highshelf", gain: m }].map(function(U) {
        var p = d().context.audioContext.createBiquadFilter();
        return p.type = U.type, P.setParamValue(p.Q, 1), p.frequency.value = U.f, P.setParamValue(p.gain, U.gain), p;
      });
      (y = n.call(this, b[0], b[b.length - 1]) || this).bands = b, y.bandsMap = {};
      for (var _ = 0; _ < y.bands.length; _++) {
        var w = y.bands[_];
        _ > 0 && y.bands[_ - 1].connect(w), y.bandsMap[w.frequency.value] = w;
      }
      return y;
    }
    y = n.call(this, null) || this;
  }
  return g(t, n), t.prototype.setGain = function(e, s) {
    if (s === void 0 && (s = 0), !this.bandsMap[e]) throw new Error("No band found for frequency ".concat(e));
    P.setParamValue(this.bandsMap[e].gain, s);
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
      P.setParamValue(e.gain, 0);
    });
  }, t.prototype.destroy = function() {
    this.bands.forEach(function(e) {
      e.disconnect();
    }), this.bands = null, this.bandsMap = null;
  }, t.F32 = 32, t.F64 = 64, t.F125 = 125, t.F250 = 250, t.F500 = 500, t.F1K = 1e3, t.F2K = 2e3, t.F4K = 4e3, t.F8K = 8e3, t.F16K = 16e3, t;
}(j), DistortionFilter: function(n) {
  function t(e) {
    e === void 0 && (e = 0);
    var s = this;
    if (!d().useLegacy) {
      var o = d().context.audioContext.createWaveShaper();
      return (s = n.call(this, o) || this)._distortion = o, s.amount = e, s;
    }
    s = n.call(this, null) || this;
  }
  return g(t, n), Object.defineProperty(t.prototype, "amount", { get: function() {
    return this._amount;
  }, set: function(e) {
    this._amount = e;
    for (var s, o = 1e3 * e, r = 44100, i = new Float32Array(r), u = Math.PI / 180, a = 0; a < r; ++a) s = 2 * a / r - 1, i[a] = (3 + o) * s * 20 * u / (Math.PI + o * Math.abs(s));
    this._distortion.curve = i, this._distortion.oversample = "4x";
  }, enumerable: !1, configurable: !0 }), t.prototype.destroy = function() {
    this._distortion = null, n.prototype.destroy.call(this);
  }, t;
}(j), StereoFilter: function(n) {
  function t(e) {
    e === void 0 && (e = 0);
    var s = this;
    if (!d().useLegacy) {
      var o, r, i, u = d().context.audioContext;
      return u.createStereoPanner ? i = o = u.createStereoPanner() : ((r = u.createPanner()).panningModel = "equalpower", i = r), (s = n.call(this, i) || this)._stereo = o, s._panner = r, s.pan = e, s;
    }
    s = n.call(this, null) || this;
  }
  return g(t, n), Object.defineProperty(t.prototype, "pan", { get: function() {
    return this._pan;
  }, set: function(e) {
    this._pan = e, this._stereo ? P.setParamValue(this._stereo.pan, e) : this._panner.setPosition(e, 0, 1 - Math.abs(e));
  }, enumerable: !1, configurable: !0 }), t.prototype.destroy = function() {
    n.prototype.destroy.call(this), this._stereo = null, this._panner = null;
  }, t;
}(j), ReverbFilter: function(n) {
  function t(e, s, o) {
    e === void 0 && (e = 3), s === void 0 && (s = 2), o === void 0 && (o = !1);
    var r = this;
    if (!d().useLegacy) return (r = n.call(this, null) || this)._seconds = r._clamp(e, 1, 50), r._decay = r._clamp(s, 0, 100), r._reverse = o, r._rebuild(), r;
    r = n.call(this, null) || this;
  }
  return g(t, n), t.prototype._clamp = function(e, s, o) {
    return Math.min(o, Math.max(s, e));
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
    for (var e, s = d().context.audioContext, o = s.sampleRate, r = o * this._seconds, i = s.createBuffer(2, r, o), u = i.getChannelData(0), a = i.getChannelData(1), l = 0; l < r; l++) e = this._reverse ? r - l : l, u[l] = (2 * Math.random() - 1) * Math.pow(1 - e / r, this._decay), a[l] = (2 * Math.random() - 1) * Math.pow(1 - e / r, this._decay);
    var c = d().context.audioContext.createConvolver();
    c.buffer = i, this.init(c);
  }, t;
}(j), MonoFilter: function(n) {
  function t() {
    var e = this;
    if (!d().useLegacy) {
      var s = d().context.audioContext, o = s.createChannelSplitter(), r = s.createChannelMerger();
      return r.connect(o), (e = n.call(this, r, o) || this)._merger = r, e;
    }
    e = n.call(this, null) || this;
  }
  return g(t, n), t.prototype.destroy = function() {
    this._merger.disconnect(), this._merger = null, n.prototype.destroy.call(this);
  }, t;
}(j), StreamFilter: function(n) {
  function t() {
    var e = this;
    if (!d().useLegacy) {
      var s = d().context.audioContext, o = s.createMediaStreamDestination(), r = s.createMediaStreamSource(o.stream);
      return (e = n.call(this, o, r) || this)._stream = o.stream, e;
    }
    e = n.call(this, null) || this;
  }
  return g(t, n), Object.defineProperty(t.prototype, "stream", { get: function() {
    return this._stream;
  }, enumerable: !1, configurable: !0 }), t.prototype.destroy = function() {
    this._stream = null, n.prototype.destroy.call(this);
  }, t;
}(j), TelephoneFilter: function(n) {
  function t() {
    if (!d().useLegacy) {
      var e = d().context.audioContext, s = e.createBiquadFilter(), o = e.createBiquadFilter(), r = e.createBiquadFilter(), i = e.createBiquadFilter();
      return s.type = "lowpass", P.setParamValue(s.frequency, 2e3), o.type = "lowpass", P.setParamValue(o.frequency, 2e3), r.type = "highpass", P.setParamValue(r.frequency, 500), i.type = "highpass", P.setParamValue(i.frequency, 500), s.connect(o), o.connect(r), r.connect(i), n.call(this, s, i) || this;
    }
    n.call(this, null);
  }
  return g(t, n), t;
}(j) }, et = 0, Lt = { __proto__: null, playOnce: function(n, t) {
  var e = "alias".concat(et++);
  return d().add(e, { url: n, preload: !0, autoPlay: !0, loaded: function(s) {
    s && (d().remove(e), t && t(s));
  }, complete: function() {
    d().remove(e), t && t(null);
  } }), e;
}, get PLAY_ID() {
  return et;
}, render: function(n, t) {
  var e = document.createElement("canvas");
  t = V({ width: 512, height: 128, fill: "black" }, t || {}), e.width = t.width, e.height = t.height;
  var s = ft.from(e);
  if (!(n.media instanceof J)) return s;
  var o = n.media, r = e.getContext("2d");
  r.fillStyle = t.fill;
  for (var i = o.buffer.getChannelData(0), u = Math.ceil(i.length / t.width), a = t.height / 2, l = 0; l < t.width; l++) {
    for (var c = 1, m = -1, y = 0; y < u; y++) {
      var b = i[l * u + y];
      b < c && (c = b), b > m && (m = b);
    }
    r.fillRect(l, (1 + c) * a, 1, Math.max(1, (m - c) * a));
  }
  return s;
}, resolveUrl: Q, sineTone: function(n, t) {
  n === void 0 && (n = 200), t === void 0 && (t = 1);
  var e = T.from({ singleInstance: !0 });
  if (!(e.media instanceof J)) return e;
  for (var s = e.media, o = e.context.audioContext.createBuffer(1, 48e3 * t, 48e3), r = o.getChannelData(0), i = 0; i < r.length; i++) {
    var u = n * (i / o.sampleRate) * Math.PI;
    r[i] = 2 * Math.sin(u);
  }
  return s.buffer = o, e.isLoaded = !0, e;
}, validateFormats: at, supported: H, extensions: Z }, A = function(n) {
  return rt = n, n;
}(new St());
"extensions" in ht ? pt.add(Y) : it.registerPlugin(Y);
class S {
  constructor(t, e, s, o, r, i, u, a) {
    this.fn = t, this.buf = e, this.start_ms = s, this.end_ms = o, this.ret_ms = r, this.volume = i, this.pan = u, this.stt = a ? new B() : new Ct(), a && this.addSnd(a);
  }
  static #t = 1;
  stt;
  loop = !1;
  addSnd(t) {
    switch (this.loop = t.loop, this.stt.onLoad(this), this.pan !== 0 && (t.filters = [new q.StereoFilter(this.pan)]), this.setVol = (e) => t.volume = e, this.tw = () => new mt(t), this.onPlayEnd = () => {
      this.stt.onPlayEnd(this.buf), this.#s();
    }, this.stop = () => {
      t.stop(), this.#s();
    }, this.destroy = () => t.destroy(), this.buf) {
      case ot:
        const e = Number(h.getVal("sys:sn.sound.BGM.vol_mul_talking") ?? 1);
        if (e === 1) break;
        S.#t = e;
        const s = W[F];
        s && s.setVol(this.volume * S.#t);
        break;
      case F:
        t.volume = this.volume * S.#t;
        break;
    }
  }
  #s = () => {
    if (this.#s = () => {
    }, S.#t === 1 || this.buf !== ot) return;
    S.#t = 1;
    const t = W[F];
    t && t.setVol(this.volume * S.#t);
  };
  setVol(t) {
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
let st, h, k, nt, W, G;
const F = "BGM", v = "SE", ot = "VOICE";
class f {
  constructor(t, e, s) {
    this.hArg = t, this.buf = e, this.fn = s;
    const o = E(t, "start_ms", 0), r = E(t, "end_ms", f.#s), i = E(t, "ret_ms", 0), u = E(t, "pan", 0), a = E(t, "speed", 1);
    if (o < 0) throw `[playse] start_ms:${o} が負の値です`;
    if (i < 0) throw `[playse] ret_ms:${i} が負の値です`;
    if (0 < r) {
      if (r <= o) throw `[playse] start_ms:${o} >= end_ms:${r} は異常値です`;
      if (r <= i) throw `[playse] ret_ms:${i} >= end_ms:${r} は異常値です`;
    }
    const l = "const.sn.sound." + e + ".";
    h.setVal_Nochk("save", l + "fn", s);
    const c = f.getVol(t, 1);
    h.setVal_Nochk("save", l + "volume", c);
    const m = c * Number(h.getVal("sys:" + l + "volume", 1)), y = L(t, "loop", !1);
    y ? (f.#t[e] = s, h.setVal_Nochk("save", "const.sn.loopPlaying", JSON.stringify(f.#t))) : f.delLoopPlay(e), h.setVal_Nochk("save", l + "start_ms", o), h.setVal_Nochk("save", l + "end_ms", r), h.setVal_Nochk("save", l + "ret_ms", i), h.setVal_Nochk("tmp", l + "playing", !0), h.flush();
    const b = A.find(s);
    this.#e = new S(
      s,
      e,
      o,
      r,
      i,
      m,
      u,
      b
    );
    const _ = {
      loop: y,
      speed: a,
      volume: m,
      loaded: (p, x) => {
        if (!this.#e.stt.isDestroy) {
          if (p) {
            k.errScript(`ロード失敗です SndBuf fn:${s} ${p}`, !1);
            return;
          }
          x && (this.#e.addSnd(x), u !== 0 && (x.filters = [new q.StereoFilter(u)]), t.fnc?.());
        }
      }
    };
    let w = "";
    if (0 < o || r < f.#s) {
      w = `${s};${o};${r};${i}`;
      const p = (_.sprites ??= {})[w] = {
        start: o / 1e3,
        end: r / 1e3
      };
      _.preload = !0;
      const x = _.loaded;
      _.loaded = (N, M) => {
        if (this.#e.stt.isDestroy) return;
        x(N, M);
        const K = M, R = K.duration;
        p.end < 0 && (p.end += R, K.removeSprites(w), K.addSprites(w, p)), p.end <= p.start && k.errScript(`[playse] end_ms:${r}(${p.end * 1e3}) >= start_ms:${o} は異常値です`), p.end * 1e3 <= i && k.errScript(`[playse] end_ms:${r}(${p.end * 1e3}) <= ret_ms:${i} は異常値です`), R <= p.start && k.errScript(`[playse] 音声ファイル再生時間:${R * 1e3} <= start_ms:${o} は異常値です`), r !== f.#s && R <= p.end && k.errScript(`[playse] 音声ファイル再生時間:${R * 1e3} <= end_ms:${r} は異常値です`), K.play(w, (ct) => _.complete?.(ct));
      };
    } else _.autoPlay = !0;
    if (y ? i !== 0 && (_.loop = !1, _.complete = async (p) => {
      const x = p.duration, N = i / 1e3, M = r / 1e3;
      x <= N && k.errScript(`[playse] 音声ファイル再生時間:${x * 1e3} <=  ret_ms:${i} は異常値です`), await p.play({
        // 一周目はループなし、なのでキャッシュされてる
        ..._,
        start: N,
        end: M < 0 ? M + x : M,
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
    }) : _.complete = () => {
      z(this.#e, e), this.#e.onPlayEnd();
    }, this.#n(), b) {
      if (b.volume = m, w) this.#o(s, _);
      else if (b.isPlayable) {
        const p = b.options.source;
        !(p instanceof ArrayBuffer) || p.byteLength === 0 ? b.play(_) : this.#e.addSnd(T.from({
          ..._,
          url: b.options.url,
          source: p
        })), u !== 0 && (b.filters = [new q.StereoFilter(u)]);
      }
      this.needLoad = !1;
      return;
    }
    if (this.needLoad = L(t, "join", !0)) {
      dt();
      const p = _.loaded;
      _.loaded = (x, N) => {
        this.#e.stt.isDestroy || p(x, N), _t();
      };
    }
    this.#o(s, _);
  }
  static #t = {};
  static init(t, e, s, o, r) {
    f.#t = {}, st = t, h = e, k = s, nt = o, W = r;
  }
  static setEvtMng(t) {
    G = t;
  }
  static delLoopPlay(t) {
    delete f.#t[t];
    const e = "const.sn.sound." + t + ".";
    h.setVal_Nochk("save", e + "fn", ""), h.setVal_Nochk("save", "const.sn.loopPlaying", JSON.stringify(f.#t)), h.flush();
  }
  static getVol(t, e) {
    const s = E(t, "volume", e);
    return s < 0 ? 0 : s > 1 ? 1 : s;
  }
  static xchgbuf({ buf: t = v, buf2: e = v }) {
    if (t === e) throw `[xchgbuf] buf:${t} が同じ値です`;
    const s = "const.sn.sound." + t + ".", o = Number(h.getVal("save:" + s + "volume")), r = String(h.getVal("save:" + s + "fn")), i = "const.sn.sound." + e + ".", u = Number(h.getVal("save:" + i + "volume")), a = String(h.getVal("save:" + i + "fn"));
    h.setVal_Nochk("save", s + "volume", u), h.setVal_Nochk("save", i + "volume", o), h.setVal_Nochk("save", s + "fn", a), h.setVal_Nochk("save", i + "fn", r), t in f.#t != e in f.#t && (t in f.#t ? (delete f.#t[t], f.#t[e] = r) : (delete f.#t[e], f.#t[t] = a), h.setVal_Nochk("save", "const.sn.loopPlaying", JSON.stringify(f.#t))), h.flush();
  }
  static #s = 999e3;
  #e;
  needLoad;
  #n = () => {
    A.volumeAll = Number(h.getVal("sys:sn.sound.global_volume", 1)), this.#n = () => {
    };
  };
  #o(t, e) {
    const s = st.searchPath(t, yt.SOUND);
    if (!s.endsWith(".bin")) {
      e.url = s, T.from(e);
      return;
    }
    new it().add({ name: t, url: s, xhrType: O.XHR_RESPONSE_TYPE.BUFFER }).use(async (o, r) => {
      try {
        o.data = await nt.decAB(o.data);
      } catch (i) {
        k.errScript(`Sound ロード失敗ですc fn:${o.name} ${i}`, !1);
      }
      r();
    }).load((o, r) => {
      e.source = r[t]?.data, T.from(e);
    });
  }
  setVol(t) {
    this.#e.setVol(t);
  }
  ws = (t) => this.#e.stt.ws(this.#e, t);
  stopse({ buf: t = v }) {
    z(this.#e, t), this.#e.stt.stopse(this.#e);
  }
  fade = (t) => this.#e.stt.fade(this.#e, t);
  wf = (t) => this.#e.stt.wf(this.#e, t);
  stopfadese = (t) => this.#e.stt.stopfadese(this.#e, t);
}
function z({ loop: n }, t) {
  if (n) {
    f.delLoopPlay(t);
    return;
  }
  const e = "const.sn.sound." + t + ".";
  h.setVal_Nochk("tmp", e + "playing", !1), h.flush();
}
function $(n) {
  n.stop().end();
}
class Ct {
  onLoad(t) {
    t.stt = new B();
  }
  stopse(t) {
    t.stt = new C(t, !1);
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
  stopse(t) {
    t.stt = new C(t);
  }
  ws(t, e) {
    if (t.loop) return !1;
    const { buf: s = v } = e, o = L(e, "stop", !0);
    return L(e, "canskip", !1), G.waitEvent("buf:" + s, e, () => {
      z(t, s), t.onPlayEnd(), o ? t.stt.stopse(t) : t.stt.onPlayEnd = () => {
      };
    }) ? (t.stt = new Vt(), !0) : !1;
  }
  onPlayEnd() {
  }
  // ok
  fade(t, e) {
    const { buf: s = v } = e, r = "const.sn.sound." + s + "." + "volume", i = f.getVol(e, NaN);
    h.setVal_Nochk("save", r, i);
    const u = i * Number(h.getVal("sys:" + r, 1)), a = L(e, "stop", i === 0);
    a && f.delLoopPlay(s), h.flush();
    const l = E(e, "time", NaN), c = E(e, "delay", 0);
    if (l === 0 && c === 0 || G.isSkipping) {
      t.setVol(u), t.stt = a ? new C(t) : new B();
      return;
    }
    const m = t.tw();
    m && (bt.setTwProp(m, e).to({ volume: u }, l).onComplete(() => {
      vt(m), t.stt.compFade(s), t.stt = a ? new C(t) : new B();
    }).start(), t.stt = new Nt(m));
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
class Vt {
  onLoad() {
  }
  // ok
  stopse(t) {
    t.stt = new C(t);
  }
  ws = () => !1;
  // ok
  onPlayEnd(t) {
    G.breakEvent("buf:" + t);
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
class Nt {
  constructor(t) {
    this.tw = t;
  }
  onLoad() {
  }
  // ok
  stopse(t) {
    $(this.tw), t.stt = new C(t);
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
    const { buf: s = v } = e;
    return L(e, "canskip", !1), G.waitEvent("buf:" + s, e, () => $(this.tw)) ? (t.stt = new Mt(this.tw), !0) : !1;
  }
  compFade() {
  }
  // ok
  stopfadese = () => $(this.tw);
  isDestroy = !1;
}
class Mt {
  constructor(t) {
    this.tw = t;
  }
  onLoad() {
  }
  // ok
  stopse(t) {
    $(this.tw), t.stt = new C(t);
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
    G.breakEvent("buf:" + t);
  }
  stopfadese = () => $(this.tw);
  isDestroy = !1;
}
class C {
  constructor(t, e = !0) {
    this.si = t, this.stop = e, e && (t.stop(), t.loop && (t.destroy(), t.destroy = () => {
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
class Tt {
  constructor(t, e, s, o, r) {
    this.val = s, e.volume = (i) => this.#e(i), e.fadebgm = (i) => this.#l(i), e.fadeoutbgm = (i) => this.#o(i), e.fadeoutse = (i) => this.#d(i), e.fadese = (i) => this.#i(i), e.playbgm = (i) => this.#c(i), e.playse = (i) => this.#a(i), e.stop_allse = () => this.#r(), e.stopbgm = (i) => this.#_(i), e.stopse = (i) => this.#u(i), e.wb = (i) => this.#y(i), e.wf = (i) => this.#h(i), e.stopfadese = (i) => this.#p(i), e.wl = (i) => this.#m(i), e.ws = (i) => this.#f(i), e.xchgbuf = (i) => this.#b(i), s.setVal_Nochk("save", "const.sn.loopPlaying", "{}"), s.setVal_Nochk("tmp", "const.sn.sound.codecs", JSON.stringify(Lt.supported)), f.init(t, s, o, r, this.#t), A.disableAutoPause = !0;
  }
  #t = {};
  #s;
  setEvtMng(t) {
    this.#s = t, f.setEvtMng(t);
  }
  setNoticeChgVolume(t, e) {
    this.val.defValTrg("sys:sn.sound.global_volume", (s, o) => t(A.volumeAll = Number(o))), this.val.defValTrg("sys:sn.sound.movie_volume", (s, o) => e(Number(o))), this.val.setVal_Nochk("sys", "sn.sound.global_volume", this.val.getVal("sys:sn.sound.global_volume", 1)), this.val.setVal_Nochk("sys", "sn.sound.movie_volume", this.val.getVal("sys:sn.sound.movie_volume", 1));
  }
  //MARK: 音量設定（独自拡張）
  #e(t) {
    const { buf: e = v } = t, s = "const.sn.sound." + e + ".volume", o = this.#n(t, 1);
    return Number(this.val.getVal("sys:" + s)) === o ? !1 : (this.val.setVal_Nochk("sys", s, o), this.val.flush(), t.time = 0, t.volume = Number(this.val.getVal("save:" + s)), this.#i(t));
  }
  #n(t, e) {
    const s = E(t, "volume", e);
    return s < 0 ? 0 : s > 1 ? 1 : s;
  }
  //MARK: BGM/効果音のフェードアウト（loadから使うのでマクロ化禁止）
  #o(t) {
    return t.volume = 0, this.#l(t);
  }
  //MARK: 効果音のフェードアウト（loadから使うのでマクロ化禁止）
  #d(t) {
    return t.volume = 0, this.#i(t);
  }
  //MARK: BGMのフェード（loadから使うのでマクロ化禁止）
  #l(t) {
    return t.buf = F, this.#i(t);
  }
  //MARK: 効果音のフェード
  #i(t) {
    const { buf: e = v } = t;
    return this.#p(t), this.#t[e]?.fade(t), !1;
  }
  //MARK: BGM の演奏
  #c(t) {
    return t.buf = F, t.canskip = !1, L(t, "loop", !0), this.#a(t);
  }
  //MARK: 効果音の再生
  #a(t) {
    const { buf: e = v, fn: s } = t;
    if (this.#u({ buf: e }), !s) throw `fnは必須です buf:${e}`;
    return L(t, "canskip", !0) && this.#s.isSkipping ? !1 : (this.#t[e] = new f(t, e, s)).needLoad;
  }
  clearCache() {
    A.removeAll();
  }
  //MARK: 全効果音再生の停止
  #r() {
    for (const t of Object.keys(this.#t)) this.#u({ buf: t });
    return this.#t = {}, A.stopAll(), !1;
  }
  //MARK: BGM 演奏の停止（loadから使うのでマクロ化禁止）
  #_(t) {
    return t.buf = F, this.#u(t);
  }
  //MARK: 効果音再生の停止
  #u(t) {
    const { buf: e = v } = t;
    return this.#t[e]?.stopse(t), !1;
  }
  //MARK: BGM フェードの終了待ち
  #y(t) {
    return t.buf = F, this.#h(t);
  }
  //MARK: 効果音フェードの終了待ち
  #h(t) {
    const { buf: e = v } = t;
    return this.#t[e]?.wf(t);
  }
  //MARK: 音声フェードの停止
  #p(t) {
    const { buf: e = v } = t;
    return this.#t[e]?.stopfadese(t), !1;
  }
  //MARK: BGM 再生の終了待ち
  #m(t) {
    return t.buf = F, this.#f(t);
  }
  //MARK: 効果音再生の終了待ち
  #f(t) {
    const { buf: e = v } = t;
    return this.#t[e]?.ws(t);
  }
  //MARK: 再生トラックの交換
  #b(t) {
    const { buf: e = v, buf2: s = v } = t;
    if (e === s) return !1;
    const o = this.#t[e], r = this.#t[s];
    return o ? this.#t[s] = o : delete this.#t[s], r ? this.#t[e] = r : delete this.#t[e], f.xchgbuf(t), !1;
  }
  //MARK: しおりの読込（BGM状態復元）
  playLoopFromSaveObj(t) {
    const e = String(this.val.getVal("save:const.sn.loopPlaying", "{}"));
    if (e === "{}")
      return this.#r(), this.clearCache(), [];
    const s = JSON.parse(e);
    if (t)
      this.#r(), this.clearCache();
    else for (const [o, r] of Object.entries(this.#t))
      o in s || r?.stopse({ buf: o });
    return Object.entries(s).map(([o, r]) => new Promise((i) => {
      const u = this.#t[o];
      if (!t && u && u.fn === r) {
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
      l.buf === F ? this.#c(l) : this.#a(l);
    }));
  }
  destroy() {
    this.#r(), this.clearCache();
  }
}
export {
  Tt as SoundMng
};
//# sourceMappingURL=SoundMng.js.map
