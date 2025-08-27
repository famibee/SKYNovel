import { b as S, a as T, c as X, J as K, h as j, K as B, M as dt, f as _t, L as yt } from "./web2.js";
import { u as mt, E as f, r as gt, T as Z, a as F, b as bt } from "./Reading.js";
const W = `trans
`, Y = "tsy nm:";
class vt {
  static #t = {};
  static #s;
  static #e;
  static init(t, e) {
    this.#t = {}, this.#s = t, this.#e = e, this.#e.ticker.add(this.#n);
  }
  static #n = () => mt();
  static destroy() {
    this.stopAllTw(), this.#e.ticker.remove(this.#n);
  }
  static setTwProp(t, e) {
    const s = S(e, "repeat", 1);
    return t.delay(S(e, "delay", 0)).easing(this.ease(e.ease)).repeat(s > 0 ? s - 1 : 1 / 0).yoyo(T(e, "yoyo", !1));
  }
  static #o = {
    "Back.In": (t) => f.Back.In(t),
    "Back.InOut": (t) => f.Back.InOut(t),
    "Back.Out": (t) => f.Back.Out(t),
    "Bounce.In": (t) => f.Bounce.In(t),
    "Bounce.InOut": (t) => f.Bounce.InOut(t),
    "Bounce.Out": (t) => f.Bounce.Out(t),
    "Circular.In": (t) => f.Circular.In(t),
    "Circular.InOut": (t) => f.Circular.InOut(t),
    "Circular.Out": (t) => f.Circular.Out(t),
    "Cubic.In": (t) => f.Cubic.In(t),
    "Cubic.InOut": (t) => f.Cubic.InOut(t),
    "Cubic.Out": (t) => f.Cubic.Out(t),
    "Elastic.In": (t) => f.Elastic.In(t),
    "Elastic.InOut": (t) => f.Elastic.InOut(t),
    "Elastic.Out": (t) => f.Elastic.Out(t),
    "Exponential.In": (t) => f.Exponential.In(t),
    "Exponential.InOut": (t) => f.Exponential.InOut(t),
    "Exponential.Out": (t) => f.Exponential.Out(t),
    "Linear.None": (t) => f.Linear.None(t),
    "Quadratic.In": (t) => f.Quadratic.In(t),
    "Quadratic.InOut": (t) => f.Quadratic.InOut(t),
    "Quadratic.Out": (t) => f.Quadratic.Out(t),
    "Quartic.In": (t) => f.Quartic.In(t),
    "Quartic.InOut": (t) => f.Quartic.InOut(t),
    "Quartic.Out": (t) => f.Quartic.Out(t),
    "Quintic.In": (t) => f.Quintic.In(t),
    "Quintic.InOut": (t) => f.Quintic.InOut(t),
    "Quintic.Out": (t) => f.Quintic.Out(t),
    "Sinusoidal.In": (t) => f.Sinusoidal.In(t),
    "Sinusoidal.InOut": (t) => f.Sinusoidal.InOut(t),
    "Sinusoidal.Out": (t) => f.Sinusoidal.Out(t)
  };
  static ease(t) {
    if (!t) return (s) => f.Linear.None(s);
    const e = this.#o[t];
    if (!e) throw "異常なease指定です";
    return e;
  }
  static hMemberCnt = {
    alpha: 0,
    height: 0,
    rotation: 0,
    // rotationX〜Z、scaleZ、zは設定すると
    scale_x: 0,
    // 三次元方向の拡大縮小ルーチンが働き画像がぼやけるので
    scale_y: 0,
    // backlayで設定しない方針
    pivot_x: 0,
    pivot_y: 0,
    width: 0,
    x: 0,
    y: 0
  };
  static cnvTweenArg(t, e) {
    const s = {};
    for (const o of Object.keys(this.hMemberCnt)) {
      const i = t[o];
      if (!i) continue;
      const r = String(i), a = r.startsWith("="), u = a ? r.slice(1) : r;
      if (!u) continue;
      const [c, l] = u.split(","), _ = s[o] = parseFloat(c);
      l && (s[o] += Math.round(
        Math.random() * (parseFloat(l) - _ + 1)
      )), a && (s[o] += parseFloat(e[o]));
    }
    return s;
  }
  // トゥイーン全停止
  static stopAllTw() {
    this.#t = {}, gt();
  }
  static tween(t, e, s, o, i, r, a, u = !0) {
    const c = this.#s.isSkipping ? 0 : S(e, "time", NaN), l = new Z(s).to(o, c).onUpdate(i);
    this.setTwProp(l, e), this.#t[t] = { tw: l, onEnd: a };
    const { path: _ } = e;
    let m = l;
    if (_) {
      X.debugLog && console.group(`🍝 [${e[":タグ名"]}] path=${_}= start(${s.x},${s.y},${s.alpha})`);
      for (const { groups: h } of _.matchAll(this.#r)) {
        const { x: v, x2: A, y: p, y2: P, o: k, o2: O, json: L } = h;
        let E = {};
        if (L) try {
          E = JSON.parse(L);
        } catch (ft) {
          console.error(`🍝 json=${L} ` + ft);
          continue;
        }
        (v ?? A) && (E.x = v ?? A), (p ?? P) && (E.y = p ?? P), (k ?? O) && (E.alpha = k ?? O);
        const U = this.cnvTweenArg(E, s);
        X.debugLog && console.info(`🍝 ${L ?? `{x:${v} y:${p} o:${k}}`} => hTo:${JSON.stringify(U)}`);
        const H = new Z(s).to(U, c);
        this.setTwProp(H, e), m.chain(H), m = H;
      }
      X.debugLog && console.groupEnd();
    }
    m.onComplete(() => {
      const h = this.#t[t];
      h && (delete this.#t[t], h.tw = void 0, l.stop(), F.notifyEndProc(Y + t), h.onEnd?.(), r());
    });
    const { chain: g } = e;
    if (g) {
      const h = this.#t[g];
      if (!h?.tw) throw `${g}は存在しない・または終了したトゥイーンです`;
      delete h.onEnd, h.tw.chain(l);
    } else u && l.start();
    return l;
  }
  // 11 match 301 step (0.1ms) PCRE2 https://regex101.com/r/reinpq/1
  // List ${x}${x2}/${y}${y2}/${o}${o2}=${json}\n
  /*
  \(\s*
  (?:	(?<x>[-=\d\.]+)	|	(['"])	(?<x2>.*?)	\2	)?
  (?:
  	\s*,\s*
  	(?:	(?<y>[-=\d\.]+)	|	(['"])	(?<y2>.*?)	\5	)?
  	(?:
  		\s*,\s*
  		(?:	(?<o>[-=\d\.]+)	|	(['"])	(?<o2>.*?)	\8	)
  
  	)?
  )?
  |
  (?<json>\{[^{}]*})
  */
  static #r = /\(\s*(?:(?<x>[-=\d\.]+)|(['"])(?<x2>.*?)\2)?(?:\s*,\s*(?:(?<y>[-=\d\.]+)|(['"])(?<y2>.*?)\5)?(?:\s*,\s*(?:(?<o>[-=\d\.]+)|(['"])(?<o2>.*?)\8))?)?|(?<json>\{[^{}]*})/g;
  // トランス終了待ち
  static wt(t) {
    if (!this.#t[W]?.tw) return !1;
    const s = () => this.finish_trans();
    return F.beginProc(Y + W, s, !0, s), !0;
  }
  // レイヤのトランジションの停止
  static finish_trans() {
    return this.#t[W]?.tw?.stop().end(), !1;
  }
  // stop()とend()は別
  // トゥイーン終了待ち
  static wait_tsy(t) {
    const e = this.#i(t), s = this.#t[e];
    if (!s?.tw) {
      const { layer: i = "", id: r, name: a } = t;
      if (T(t, "chk_exist_tw", !1)) throw r ? `フレームトゥイーン ${r} が見つかりません。` : `トゥイーン ${e} が見つかりません。(layer:${i} name:${a})`;
      return !1;
    }
    const o = () => s.tw?.end();
    return F.beginProc(Y + e, o, !0, o), !0;
  }
  static #i(t) {
    const { layer: e = "", id: s, name: o } = t, i = s ? `frm
${s}` : o ?? e;
    if (!i) throw "トゥイーンが指定されていません";
    return i;
  }
  // トゥイーン中断
  static stop_tsy(t) {
    const e = this.#i(t);
    return this.#t[e]?.tw?.stop().end(), !1;
  }
  // 一時停止
  static pause_tsy(t) {
    const e = this.#i(t);
    return this.#t[e]?.tw?.pause(), !1;
  }
  // 一時停止再開
  static resume_tsy(t) {
    const e = this.#i(t);
    return this.#t[e]?.tw?.resume(), !1;
  }
}
/*!
 * @pixi/sound - v4.4.1
 * https://github.com/pixijs/pixi-sound
 * Compiled Tue, 15 Aug 2023 19:22:13 UTC
 *
 * @pixi/sound is licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license
 */
var at;
function b() {
  return at;
}
var ut = function(n, t) {
  return (ut = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, s) {
    e.__proto__ = s;
  } || function(e, s) {
    for (var o in s) Object.prototype.hasOwnProperty.call(s, o) && (e[o] = s[o]);
  })(n, t);
};
function x(n, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  function e() {
    this.constructor = n;
  }
  ut(n, t), n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var N = function() {
  return (N = Object.assign || function(n) {
    for (var t, e = 1, s = arguments.length; e < s; e++) for (var o in t = arguments[e]) Object.prototype.hasOwnProperty.call(t, o) && (n[o] = t[o]);
    return n;
  }).apply(this, arguments);
}, ct = ["mp3", "ogg", "oga", "opus", "mpeg", "wav", "m4a", "aiff", "wma", "mid", "caf"], q = {};
function Pt(n) {
  var t = N({ m4a: "audio/mp4", oga: "audio/ogg", opus: 'audio/ogg; codecs="opus"', caf: 'audio/x-caf; codecs="opus"' }, n || {}), e = document.createElement("audio"), s = {}, o = /^no$/;
  ct.forEach(function(i) {
    var r = e.canPlayType("audio/".concat(i)).replace(o, ""), a = t[i] ? e.canPlayType(t[i]).replace(o, "") : "";
    s[i] = !!r || !!a;
  }), Object.assign(q, s);
}
Pt();
var xt = /\.(\{([^\}]+)\})(\?.*)?$/;
function lt(n) {
  var t = xt, e = typeof n == "string" ? n : n.url;
  if (!t.test(e)) return e;
  for (var s = t.exec(e), o = s[2].split(","), i = o[o.length - 1], r = 0, a = o.length; r < a; r++) {
    var u = o[r];
    if (q[u]) {
      i = u;
      break;
    }
  }
  var c = e.replace(s[1], i);
  if (typeof n != "string") {
    var l = n;
    l.extension = i, l.url = c;
  }
  return c;
}
var J = ct.filter(function(n) {
  return q[n];
}), pt = function() {
  function n() {
  }
  return n.add = function() {
    n.setLegacy(b().useLegacy);
  }, n.setLegacy = function(t) {
    t ? J.forEach(function(e) {
      j.setExtensionXhrType(e, j.XHR_RESPONSE_TYPE.DEFAULT), j.setExtensionLoadType(e, j.LOAD_TYPE.AUDIO);
    }) : J.forEach(function(e) {
      j.setExtensionXhrType(e, j.XHR_RESPONSE_TYPE.BUFFER), j.setExtensionLoadType(e, j.LOAD_TYPE.XHR);
    });
  }, n.pre = function(t, e) {
    lt(t), e();
  }, n.use = function(t, e) {
    t.data && J.indexOf(t.extension) > -1 ? t.sound = b().add(t.name, { loaded: e, preload: !0, url: t.url, source: t.data }) : e();
  }, n.extension = "loader", n;
}(), wt = 0, Ot = function(n) {
  function t(e) {
    var s = n.call(this) || this;
    return s.id = wt++, s.init(e), s;
  }
  return x(t, n), t.prototype.set = function(e, s) {
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
    var o = e.volume * (e.muted ? 0 : 1), i = s.volume * (s.muted ? 0 : 1), r = this._volume * (this._muted ? 0 : 1);
    this._source.volume = r * o * i, this._source.playbackRate = this._speed * e.speed * s.speed;
  }, t.prototype.refreshPaused = function() {
    var e = this._media.context, s = this._media.parent, o = this._paused || s.paused || e.paused;
    o !== this._pausedReal && (this._pausedReal = o, o ? (this._internalStop(), this.emit("paused")) : (this.emit("resumed"), this.play({ start: this._source.currentTime, end: this._end, volume: this._volume, speed: this._speed, loop: this._loop })), this.emit("pause", o));
  }, t.prototype.play = function(e) {
    var s = this, o = e.start, i = e.end, r = e.speed, a = e.loop, u = e.volume, c = e.muted;
    this._speed = r, this._volume = u, this._loop = !!a, this._muted = c, this.refresh(), this.loop && i !== null && (this.loop = !1), this._start = o, this._end = i || this._duration, this._start = Math.max(0, this._start - t.PADDING), this._end = Math.min(this._end + t.PADDING, this._duration), this._source.onloadedmetadata = function() {
      s._source && (s._source.currentTime = o, s._source.onloadedmetadata = null, s.emit("progress", o, s._duration), B.shared.add(s._onUpdate, s));
    }, this._source.onended = this._onComplete.bind(this), this._source.play(), this.emit("start");
  }, t.prototype._onUpdate = function() {
    this.emit("progress", this.progress, this._duration), this._source.currentTime >= this._end && !this._source.loop && this._onComplete();
  }, t.prototype._onComplete = function() {
    B.shared.remove(this._onUpdate, this), this._internalStop(), this.emit("progress", 1, this._duration), this.emit("end", this);
  }, t.prototype.destroy = function() {
    B.shared.remove(this._onUpdate, this), this.removeAllListeners();
    var e = this._source;
    e && (e.onended = null, e.onplay = null, e.onpause = null, this._internalStop()), this._source = null, this._speed = 1, this._volume = 1, this._loop = !1, this._end = null, this._start = 0, this._duration = 0, this._playing = !1, this._pausedReal = !1, this._paused = !1, this._muted = !1, this._media && (this._media.context.off("refresh", this.refresh, this), this._media.context.off("refreshPaused", this.refreshPaused, this), this._media = null);
  }, t.prototype.toString = function() {
    return "[HTMLAudioInstance id=".concat(this.id, "]");
  }, t.PADDING = 0.1, t;
}(K), Et = function(n) {
  function t() {
    return n !== null && n.apply(this, arguments) || this;
  }
  return x(t, n), t.prototype.init = function(e) {
    this.parent = e, this._source = e.options.source || new Audio(), e.url && (this._source.src = e.url);
  }, t.prototype.create = function() {
    return new Ot(this);
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
      var i = function() {
        u(), o.isLoaded = !0;
        var l = o.autoPlayStart();
        e && e(null, o, l);
      }, r = function() {
        u(), e && e(new Error("Sound loading has been aborted"));
      }, a = function() {
        u();
        var l = "Failed to load audio element (code: ".concat(s.error.code, ")");
        e && e(new Error(l));
      }, u = function() {
        s.removeEventListener("canplaythrough", i), s.removeEventListener("load", i), s.removeEventListener("abort", r), s.removeEventListener("error", a);
      };
      s.addEventListener("canplaythrough", i, !1), s.addEventListener("load", i, !1), s.addEventListener("abort", r, !1), s.addEventListener("error", a, !1), s.load();
    } else e(new Error("sound.url or sound.source must be set"));
    else {
      o.isLoaded = !0;
      var c = o.autoPlayStart();
      e && setTimeout(function() {
        e(null, o, c);
      }, 0);
    }
  }, t;
}(K), St = function() {
  function n(t, e) {
    this.parent = t, Object.assign(this, e), this.duration = this.end - this.start;
  }
  return n.prototype.play = function(t) {
    return this.parent.play({ complete: t, speed: this.speed || this.parent.speed, end: this.end, start: this.start, loop: this.loop });
  }, n.prototype.destroy = function() {
    this.parent = null;
  }, n;
}(), w = function() {
  function n() {
  }
  return n.setParamValue = function(t, e) {
    if (t.setValueAtTime) {
      var s = b().context;
      t.setValueAtTime(e, s.audioContext.currentTime);
    } else t.value = e;
    return e;
  }, n;
}(), kt = 0, Ft = function(n) {
  function t(e) {
    var s = n.call(this) || this;
    return s.id = kt++, s._media = null, s._paused = !1, s._muted = !1, s._elapsed = 0, s.init(e), s;
  }
  return x(t, n), t.prototype.set = function(e, s) {
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
      var o = e.volume * (e.muted ? 0 : 1), i = s.volume * (s.muted ? 0 : 1), r = this._volume * (this._muted ? 0 : 1);
      w.setParamValue(this._gain.gain, r * i * o), w.setParamValue(this._source.playbackRate, this._speed * s.speed * e.speed), this.applyFilters();
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
    var s = e.start, o = e.end, i = e.speed, r = e.loop, a = e.volume, u = e.muted, c = e.filters;
    this._paused = !1;
    var l = this._media.nodes.cloneBufferSource(), _ = l.source, m = l.gain;
    this._source = _, this._gain = m, this._speed = i, this._volume = a, this._loop = !!r, this._muted = u, this._filters = c, this.refresh();
    var g = this._source.buffer.duration;
    this._duration = g, this._end = o, this._lastUpdate = this._now(), this._elapsed = s, this._source.onended = this._onComplete.bind(this), this._loop ? (this._source.loopEnd = o, this._source.loopStart = s, this._source.start(0, s)) : o ? this._source.start(0, s, o - s) : this._source.start(0, s), this.emit("start"), this._update(!0), this.enableTicker(!0);
  }, t.prototype.enableTicker = function(e) {
    B.shared.remove(this._updateListener, this), e && B.shared.add(this._updateListener, this);
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
        var i = this._source.playbackRate.value;
        this._elapsed += o * i, this._lastUpdate = s;
        var r = this._duration, a = void 0;
        if (this._source.loopStart) {
          var u = this._source.loopEnd - this._source.loopStart;
          a = (this._source.loopStart + this._elapsed % u) / r;
        } else a = this._elapsed % r / r;
        this._progress = a, this.emit("progress", this._progress, r);
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
}(K), ht = function() {
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
}(), Lt = function(n) {
  function t(e) {
    var s = this, o = e.audioContext, i = o.createBufferSource(), r = o.createGain(), a = o.createAnalyser();
    return i.connect(a), a.connect(r), r.connect(e.destination), (s = n.call(this, a, r) || this).context = e, s.bufferSource = i, s.gain = r, s.analyser = a, s;
  }
  return x(t, n), Object.defineProperty(t.prototype, "script", { get: function() {
    return this._script || (this._script = this.context.audioContext.createScriptProcessor(t.BUFFER_SIZE), this._script.connect(this.context.destination)), this._script;
  }, enumerable: !1, configurable: !0 }), t.prototype.destroy = function() {
    n.prototype.destroy.call(this), this.bufferSource.disconnect(), this._script && this._script.disconnect(), this.gain.disconnect(), this.analyser.disconnect(), this.bufferSource = null, this._script = null, this.gain = null, this.analyser = null, this.context = null;
  }, t.prototype.cloneBufferSource = function() {
    var e = this.bufferSource, s = this.context.audioContext.createBufferSource();
    s.buffer = e.buffer, w.setParamValue(s.playbackRate, e.playbackRate.value), s.loop = e.loop;
    var o = this.context.audioContext.createGain();
    return s.connect(o), o.connect(this.destination), { source: s, gain: o };
  }, Object.defineProperty(t.prototype, "bufferSize", { get: function() {
    return this.script.bufferSize;
  }, enumerable: !1, configurable: !0 }), t.BUFFER_SIZE = 0, t;
}(ht), jt = function() {
  function n() {
  }
  return n.prototype.init = function(t) {
    this.parent = t, this._nodes = new Lt(this.context), this._source = this._nodes.bufferSource, this.source = t.options.source;
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
    var s = this, o = function(i, r) {
      if (i) e && e(i);
      else {
        s.parent.isLoaded = !0, s.buffer = r;
        var a = s.parent.autoPlayStart();
        e && e(null, s.parent, a);
      }
    };
    t instanceof AudioBuffer ? o(null, t) : this.parent.context.decode(t, o);
  }, n;
}(), D = function() {
  function n(t, e) {
    this.media = t, this.options = e, this._instances = [], this._sprites = {}, this.media.init(this);
    var s = e.complete;
    this._autoPlayOptions = s ? { complete: s } : null, this.isLoaded = !1, this.isPlaying = !1, this.autoPlay = e.autoPlay, this.singleInstance = e.singleInstance, this.preload = e.preload || this.autoPlay, this.url = e.url, this.speed = e.speed, this.volume = e.volume, this.loop = e.loop, e.sprites && this.addSprites(e.sprites), this.preload && this._preload(e.loaded);
  }
  return n.from = function(t) {
    var e = {};
    return typeof t == "string" ? e.url = t : t instanceof ArrayBuffer || t instanceof AudioBuffer || t instanceof HTMLAudioElement ? e.source = t : e = t, (e = N({ autoPlay: !1, singleInstance: !1, url: null, source: null, preload: !1, volume: 1, speed: 1, complete: null, loaded: null, loop: !1 }, e)).url && (e.url = lt(e.url)), Object.freeze(e), new n(b().useLegacy ? new Et() : new jt(), e);
  }, Object.defineProperty(n.prototype, "context", { get: function() {
    return b().context;
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
    var i = new St(this, e);
    return this._sprites[t] = i, i;
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
    if (typeof t == "string" ? s = { sprite: r = t, loop: this.loop, complete: e } : typeof t == "function" ? (s = {}).complete = t : s = t, (s = N({ complete: null, loaded: null, sprite: null, end: null, start: 0, volume: 1, speed: 1, muted: !1, loop: !1 }, s || {})).sprite) {
      var i = s.sprite, r = this._sprites[i];
      s.start = r.start + (s.start || 0), s.end = r.end, s.speed = r.speed || 1, s.loop = r.loop || s.loop, delete s.sprite;
    }
    if (s.offset && (s.start = s.offset), !this.isLoaded) return new Promise(function(u, c) {
      o.autoPlay = !0, o._autoPlayOptions = s, o._preload(function(l, _, m) {
        l ? c(l) : (s.loaded && s.loaded(l, _, m), u(m));
      });
    });
    (this.singleInstance || s.singleInstance) && this._removeInstances();
    var a = this._createInstance();
    return this._instances.push(a), this.isPlaying = !0, a.once("end", function() {
      s.complete && s.complete(o), o._onComplete(a);
    }), a.once("stop", function() {
      o._onComplete(a);
    }), a.play(s), a;
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
}(), Ct = function(n) {
  function t() {
    var e = n !== null && n.apply(this, arguments) || this;
    return e.speed = 1, e.muted = !1, e.volume = 1, e.paused = !1, e;
  }
  return x(t, n), t.prototype.refresh = function() {
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
}(K), st = function(n) {
  function t() {
    var e = n.call(this, null, null) || this;
    e.autoPause = !0;
    var s = window, o = new t.AudioContext(), i = o.createDynamicsCompressor(), r = o.createAnalyser();
    return r.connect(i), i.connect(o.destination), e._input = r, e._output = o.destination, e._ctx = o, e._offlineCtx = new t.OfflineAudioContext(1, 2, s.OfflineAudioContext ? Math.max(8e3, Math.min(96e3, o.sampleRate)) : 44100), e.compressor = i, e.analyser = r, e.events = new K(), e.volume = 1, e.speed = 1, e.muted = !1, e.paused = !1, e._locked = o.state === "suspended" && ("ontouchstart" in globalThis || "onclick" in globalThis), e._locked && (e._unlock(), e._unlock = e._unlock.bind(e), document.addEventListener("mousedown", e._unlock, !0), document.addEventListener("touchstart", e._unlock, !0), document.addEventListener("touchend", e._unlock, !0)), e.onFocus = e.onFocus.bind(e), e.onBlur = e.onBlur.bind(e), globalThis.addEventListener("focus", e.onFocus), globalThis.addEventListener("blur", e.onBlur), e;
  }
  return x(t, n), t.prototype.onFocus = function() {
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
    var o = function(r) {
      s(new Error(r?.message || "Unable to decode file"));
    }, i = this._offlineCtx.decodeAudioData(e, function(r) {
      s(null, r);
    }, o);
    i && i.catch(o);
  }, t;
}(ht), It = function() {
  function n() {
    this.init();
  }
  return n.prototype.init = function() {
    return this.supported && (this._webAudioContext = new st()), this._htmlAudioContext = new Ct(), this._sounds = {}, this.useLegacy = !this.supported, this;
  }, Object.defineProperty(n.prototype, "context", { get: function() {
    return this._context;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "filtersAll", { get: function() {
    return this.useLegacy ? [] : this._context.filters;
  }, set: function(t) {
    this.useLegacy || (this._context.filters = t);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "supported", { get: function() {
    return st.AudioContext !== null;
  }, enumerable: !1, configurable: !0 }), n.prototype.add = function(t, e) {
    if (typeof t == "object") {
      var s = {};
      for (var o in t) {
        var i = this._getOptions(t[o], e);
        s[o] = this.add(o, i);
      }
      return s;
    }
    if (e instanceof D) return this._sounds[t] = e, e;
    var r = this._getOptions(e), a = D.from(r);
    return this._sounds[t] = a, a;
  }, n.prototype._getOptions = function(t, e) {
    var s;
    return s = typeof t == "string" ? { url: t } : t instanceof ArrayBuffer || t instanceof AudioBuffer || t instanceof HTMLAudioElement ? { source: t } : t, s = N(N({}, s), e || {});
  }, Object.defineProperty(n.prototype, "useLegacy", { get: function() {
    return this._useLegacy;
  }, set: function(t) {
    pt.setLegacy(t), this._useLegacy = t, this._context = !t && this.supported ? this._webAudioContext : this._htmlAudioContext;
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
}(), V = function() {
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
}(), $ = { __proto__: null, EqualizerFilter: function(n) {
  function t(e, s, o, i, r, a, u, c, l, _) {
    e === void 0 && (e = 0), s === void 0 && (s = 0), o === void 0 && (o = 0), i === void 0 && (i = 0), r === void 0 && (r = 0), a === void 0 && (a = 0), u === void 0 && (u = 0), c === void 0 && (c = 0), l === void 0 && (l = 0), _ === void 0 && (_ = 0);
    var m = this;
    if (!b().useLegacy) {
      var g = [{ f: t.F32, type: "lowshelf", gain: e }, { f: t.F64, type: "peaking", gain: s }, { f: t.F125, type: "peaking", gain: o }, { f: t.F250, type: "peaking", gain: i }, { f: t.F500, type: "peaking", gain: r }, { f: t.F1K, type: "peaking", gain: a }, { f: t.F2K, type: "peaking", gain: u }, { f: t.F4K, type: "peaking", gain: c }, { f: t.F8K, type: "peaking", gain: l }, { f: t.F16K, type: "highshelf", gain: _ }].map(function(A) {
        var p = b().context.audioContext.createBiquadFilter();
        return p.type = A.type, w.setParamValue(p.Q, 1), p.frequency.value = A.f, w.setParamValue(p.gain, A.gain), p;
      });
      (m = n.call(this, g[0], g[g.length - 1]) || this).bands = g, m.bandsMap = {};
      for (var h = 0; h < m.bands.length; h++) {
        var v = m.bands[h];
        h > 0 && m.bands[h - 1].connect(v), m.bandsMap[v.frequency.value] = v;
      }
      return m;
    }
    m = n.call(this, null) || this;
  }
  return x(t, n), t.prototype.setGain = function(e, s) {
    if (s === void 0 && (s = 0), !this.bandsMap[e]) throw new Error("No band found for frequency ".concat(e));
    w.setParamValue(this.bandsMap[e].gain, s);
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
      w.setParamValue(e.gain, 0);
    });
  }, t.prototype.destroy = function() {
    this.bands.forEach(function(e) {
      e.disconnect();
    }), this.bands = null, this.bandsMap = null;
  }, t.F32 = 32, t.F64 = 64, t.F125 = 125, t.F250 = 250, t.F500 = 500, t.F1K = 1e3, t.F2K = 2e3, t.F4K = 4e3, t.F8K = 8e3, t.F16K = 16e3, t;
}(V), DistortionFilter: function(n) {
  function t(e) {
    e === void 0 && (e = 0);
    var s = this;
    if (!b().useLegacy) {
      var o = b().context.audioContext.createWaveShaper();
      return (s = n.call(this, o) || this)._distortion = o, s.amount = e, s;
    }
    s = n.call(this, null) || this;
  }
  return x(t, n), Object.defineProperty(t.prototype, "amount", { get: function() {
    return this._amount;
  }, set: function(e) {
    this._amount = e;
    for (var s, o = 1e3 * e, i = 44100, r = new Float32Array(i), a = Math.PI / 180, u = 0; u < i; ++u) s = 2 * u / i - 1, r[u] = (3 + o) * s * 20 * a / (Math.PI + o * Math.abs(s));
    this._distortion.curve = r, this._distortion.oversample = "4x";
  }, enumerable: !1, configurable: !0 }), t.prototype.destroy = function() {
    this._distortion = null, n.prototype.destroy.call(this);
  }, t;
}(V), StereoFilter: function(n) {
  function t(e) {
    e === void 0 && (e = 0);
    var s = this;
    if (!b().useLegacy) {
      var o, i, r, a = b().context.audioContext;
      return a.createStereoPanner ? r = o = a.createStereoPanner() : ((i = a.createPanner()).panningModel = "equalpower", r = i), (s = n.call(this, r) || this)._stereo = o, s._panner = i, s.pan = e, s;
    }
    s = n.call(this, null) || this;
  }
  return x(t, n), Object.defineProperty(t.prototype, "pan", { get: function() {
    return this._pan;
  }, set: function(e) {
    this._pan = e, this._stereo ? w.setParamValue(this._stereo.pan, e) : this._panner.setPosition(e, 0, 1 - Math.abs(e));
  }, enumerable: !1, configurable: !0 }), t.prototype.destroy = function() {
    n.prototype.destroy.call(this), this._stereo = null, this._panner = null;
  }, t;
}(V), ReverbFilter: function(n) {
  function t(e, s, o) {
    e === void 0 && (e = 3), s === void 0 && (s = 2), o === void 0 && (o = !1);
    var i = this;
    if (!b().useLegacy) return (i = n.call(this, null) || this)._seconds = i._clamp(e, 1, 50), i._decay = i._clamp(s, 0, 100), i._reverse = o, i._rebuild(), i;
    i = n.call(this, null) || this;
  }
  return x(t, n), t.prototype._clamp = function(e, s, o) {
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
    for (var e, s = b().context.audioContext, o = s.sampleRate, i = o * this._seconds, r = s.createBuffer(2, i, o), a = r.getChannelData(0), u = r.getChannelData(1), c = 0; c < i; c++) e = this._reverse ? i - c : c, a[c] = (2 * Math.random() - 1) * Math.pow(1 - e / i, this._decay), u[c] = (2 * Math.random() - 1) * Math.pow(1 - e / i, this._decay);
    var l = b().context.audioContext.createConvolver();
    l.buffer = r, this.init(l);
  }, t;
}(V), MonoFilter: function(n) {
  function t() {
    var e = this;
    if (!b().useLegacy) {
      var s = b().context.audioContext, o = s.createChannelSplitter(), i = s.createChannelMerger();
      return i.connect(o), (e = n.call(this, i, o) || this)._merger = i, e;
    }
    e = n.call(this, null) || this;
  }
  return x(t, n), t.prototype.destroy = function() {
    this._merger.disconnect(), this._merger = null, n.prototype.destroy.call(this);
  }, t;
}(V), StreamFilter: function(n) {
  function t() {
    var e = this;
    if (!b().useLegacy) {
      var s = b().context.audioContext, o = s.createMediaStreamDestination(), i = s.createMediaStreamSource(o.stream);
      return (e = n.call(this, o, i) || this)._stream = o.stream, e;
    }
    e = n.call(this, null) || this;
  }
  return x(t, n), Object.defineProperty(t.prototype, "stream", { get: function() {
    return this._stream;
  }, enumerable: !1, configurable: !0 }), t.prototype.destroy = function() {
    this._stream = null, n.prototype.destroy.call(this);
  }, t;
}(V), TelephoneFilter: function(n) {
  function t() {
    if (!b().useLegacy) {
      var e = b().context.audioContext, s = e.createBiquadFilter(), o = e.createBiquadFilter(), i = e.createBiquadFilter(), r = e.createBiquadFilter();
      return s.type = "lowpass", w.setParamValue(s.frequency, 2e3), o.type = "lowpass", w.setParamValue(o.frequency, 2e3), i.type = "highpass", w.setParamValue(i.frequency, 500), r.type = "highpass", w.setParamValue(r.frequency, 500), s.connect(o), o.connect(i), i.connect(r), n.call(this, s, r) || this;
    }
    n.call(this, null);
  }
  return x(t, n), t;
}(V) }, Bt = { __proto__: null, supported: q }, nt = function(n) {
  return at = n, n;
}(new It());
dt.add(pt);
class I {
  constructor(t, e, s, o, i, r, a, u) {
    this.fn = t, this.buf = e, this.start_ms = s, this.end_ms = o, this.ret_ms = i, this.volume = r, this.pan = a, this.snd = u, this.stt = u ? new G(this) : new Tt(), this.#s = F.procID, u && this.addSnd(u);
  }
  static #t = 1;
  stt;
  loop = !1;
  #s;
  get procID() {
    return this.#s;
  }
  addSnd(t) {
    switch (this.loop = t.loop, this.stt.onLoad(this), this.pan !== 0 && (t.filters = [new $.StereoFilter(this.pan)]), this.setVol = (e) => t.volume = e, this.tw = () => new Z(t), this.onPlayEnd = () => {
      this.stt.onPlayEnd(this.buf), this.#e();
    }, this.stop = () => {
      t.stop(), this.#e();
    }, this.destroy = () => t.destroy(), this.buf) {
      // セリフ再生中はBGM音量を絞る
      case rt:
        const e = Number(d.getVal("sys:sn.sound.BGM.vol_mul_talking") ?? 1);
        if (e === 1) break;
        I.#t = e;
        const s = tt[z];
        s && s.setVol(this.volume * I.#t);
        break;
      case z:
        t.volume = this.volume * I.#t;
        break;
    }
  }
  #e = () => {
    if (this.#e = () => {
    }, I.#t === 1 || this.buf !== rt) return;
    I.#t = 1;
    const t = tt[z];
    t && t.setVol(this.volume * I.#t);
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
let ot, d, C, it, tt, Q;
const z = "BGM", R = "SE", rt = "VOICE";
class y {
  constructor(t, e, s) {
    this.hArg = t, this.buf = e, this.fn = s;
    const o = S(t, "start_ms", 0), i = S(t, "end_ms", y.#s), r = S(t, "ret_ms", 0), a = S(t, "pan", 0), u = S(t, "speed", 1);
    if (o < 0) throw `[playse] start_ms:${o} が負の値です`;
    if (r < 0) throw `[playse] ret_ms:${r} が負の値です`;
    if (0 < i) {
      if (i <= o) throw `[playse] start_ms:${o} >= end_ms:${i} は異常値です`;
      if (i <= r) throw `[playse] ret_ms:${r} >= end_ms:${i} は異常値です`;
    }
    const c = "const.sn.sound." + e + ".";
    d.setVal_Nochk("save", c + "fn", s);
    const l = y.getVol(t, 1);
    d.setVal_Nochk("save", c + "volume", l);
    const _ = l * Number(d.getVal("sys:" + c + "volume", 1)), m = T(t, "loop", !1);
    m ? (y.#t[e] = s, d.setVal_Nochk("save", "const.sn.loopPlaying", JSON.stringify(y.#t))) : y.delLoopPlay(e), d.setVal_Nochk("save", c + "start_ms", o), d.setVal_Nochk("save", c + "end_ms", i), d.setVal_Nochk("save", c + "ret_ms", r), d.setVal_Nochk("tmp", c + "playing", !0), d.flush();
    const g = nt.find(s);
    this.#e = new I(
      s,
      e,
      o,
      i,
      r,
      _,
      a,
      g
    );
    const h = {
      loop: m,
      speed: u,
      volume: _,
      loaded: (p, P) => {
        if (!this.#e.stt.isDestroy) {
          if (p) {
            C.errScript(`ロード失敗です SndBuf fn:${s} ${p}`, !1);
            return;
          }
          P && (this.#e.addSnd(P), a !== 0 && (P.filters = [new $.StereoFilter(a)]), t.fnc?.());
        }
      }
    };
    let v = "";
    if (0 < o || i < y.#s) {
      v = `${s};${o};${i};${r}`;
      const p = (h.sprites ??= {})[v] = {
        start: o / 1e3,
        end: i / 1e3
      };
      h.preload = !0;
      const P = h.loaded;
      h.loaded = (k, O) => {
        if (this.#e.stt.isDestroy) return;
        P(k, O);
        const L = O, E = L.duration;
        p.end < 0 && (p.end += E, L.removeSprites(v), L.addSprites(v, p)), p.end <= p.start && C.errScript(`[playse] end_ms:${i}(${p.end * 1e3}) >= start_ms:${o} は異常値です`), p.end * 1e3 <= r && C.errScript(`[playse] end_ms:${i}(${p.end * 1e3}) <= ret_ms:${r} は異常値です`), E <= p.start && C.errScript(`[playse] 音声ファイル再生時間:${E * 1e3} <= start_ms:${o} は異常値です`), i !== y.#s && E <= p.end && C.errScript(`[playse] 音声ファイル再生時間:${E * 1e3} <= end_ms:${i} は異常値です`), L.play(v, (U) => h.complete?.(U));
      };
    } else h.autoPlay = !0;
    if (m ? r !== 0 && (h.loop = !1, h.complete = async (p) => {
      const P = p.duration, k = r / 1e3, O = i / 1e3;
      P <= k && C.errScript(`[playse] 音声ファイル再生時間:${P * 1e3} <=  ret_ms:${r} は異常値です`), await p.play({
        // 一周目はループなし、なのでキャッシュされてる
        ...h,
        start: k,
        end: O < 0 ? O + P : O,
        // 負の値は末尾から
        //	speed,		// 重複
        loop: !0,
        //	volume,		// 重複
        //-	muted?: boolean;
        filters: a !== 0 ? [new $.StereoFilter(a)] : []
        //-	complete?: CompleteCallback;
        //-	loaded?: LoadedCallback;
        //-	singleInstance?: boolean;
      });
    }) : h.complete = () => {
      et(this.#e, e), this.#e.onPlayEnd();
    }, this.#n(), g) {
      if (g.volume = _, v)
        this.#o(s, h), a !== 0 && (g.filters = [new $.StereoFilter(a)]);
      else if (g.isPlayable) {
        const p = g.options.source;
        !(p instanceof ArrayBuffer) || p.byteLength === 0 ? (g.play(h), a !== 0 && (g.filters = [new $.StereoFilter(a)])) : this.#e.addSnd(D.from({
          ...h,
          url: g.options.url,
          source: p
        }));
      }
      this.needLoad = !1;
      return;
    }
    if (this.needLoad = T(t, "join", !0)) {
      const p = this.#e.procID + `loaded buf:${e} fn:${s}`;
      F.beginProc(p);
      const P = h.loaded;
      h.loaded = (k, O) => {
        P(k, O), F.endProc(p);
      };
    }
    this.#o(s, h);
  }
  static #t = {};
  static init(t, e, s, o, i) {
    y.#t = {}, ot = t, d = e, C = s, it = o, tt = i;
  }
  static setEvtMng(t) {
    Q = t;
  }
  static delLoopPlay(t) {
    delete y.#t[t];
    const e = "const.sn.sound." + t + ".";
    d.setVal_Nochk("save", e + "fn", ""), d.setVal_Nochk("save", "const.sn.loopPlaying", JSON.stringify(y.#t)), d.flush();
  }
  static getVol(t, e) {
    const s = S(t, "volume", e);
    return s < 0 ? 0 : s > 1 ? 1 : s;
  }
  static xchgbuf({ buf: t = R, buf2: e = R }) {
    if (t === e) throw `[xchgbuf] buf:${t} が同じ値です`;
    const s = "const.sn.sound." + t + ".", o = Number(d.getVal("save:" + s + "volume")), i = String(d.getVal("save:" + s + "fn")), r = "const.sn.sound." + e + ".", a = Number(d.getVal("save:" + r + "volume")), u = String(d.getVal("save:" + r + "fn"));
    d.setVal_Nochk("save", s + "volume", a), d.setVal_Nochk("save", r + "volume", o), d.setVal_Nochk("save", s + "fn", u), d.setVal_Nochk("save", r + "fn", i), t in y.#t != e in y.#t && (t in y.#t ? (delete y.#t[t], y.#t[e] = i) : (delete y.#t[e], y.#t[t] = u), d.setVal_Nochk("save", "const.sn.loopPlaying", JSON.stringify(y.#t))), d.flush();
  }
  static #s = 999e3;
  #e;
  needLoad;
  #n = () => {
    nt.volumeAll = Number(d.getVal("sys:sn.sound.global_volume", 1)), this.#n = () => {
    };
  };
  #o(t, e) {
    const s = ot.searchPath(t, _t.SOUND);
    if (!s.endsWith(".bin")) {
      e.url = s, D.from(e);
      return;
    }
    new yt().add({ name: t, url: s, xhrType: j.XHR_RESPONSE_TYPE.BUFFER }).use(async (o, i) => {
      try {
        o.data = await it.decAB(o.data);
      } catch (r) {
        C.errScript(`Sound ロード失敗ですc fn:${o.name} ${r}`, !1);
      }
      i();
    }).load((o, i) => {
      e.source = i[t]?.data, D.from(e);
    });
  }
  setVol(t) {
    this.#e.setVol(t);
  }
  ws = (t) => this.#e.stt.ws(this.#e, t);
  stopse({ buf: t = R }) {
    et(this.#e, t), this.#e.stt.stopse(this.#e);
  }
  fade = (t) => this.#e.stt.fade(this.#e, t);
  wf = (t) => this.#e.stt.wf(this.#e, t);
  stopfadese = (t) => this.#e.stt.stopfadese(this.#e, t);
}
function et({ loop: n }, t) {
  if (n) {
    y.delLoopPlay(t);
    return;
  }
  const e = "const.sn.sound." + t + ".";
  d.setVal_Nochk("tmp", e + "playing", !1), d.flush();
}
class Tt {
  onLoad(t) {
    t.stt = new G(t);
  }
  stopse(t) {
    t.stt = new M(t, !1);
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
class G {
  constructor(t) {
    this.si = t;
  }
  onLoad() {
  }
  // ok
  stopse(t) {
    t.stt = new M(t);
  }
  ws(t, e) {
    if (t.loop) return !1;
    t.stt = new At(t);
    const s = T(e, "canskip", !1), o = T(e, "stop", !0);
    if (s && Q.isSkipping)
      return o ? t.stt.stopse(t) : t.stt.onPlayEnd = () => {
      }, !1;
    const { buf: i = R } = e, r = () => {
      et(t, i), t.onPlayEnd(), o ? t.stt.stopse(t) : t.stt.onPlayEnd = () => {
      };
    };
    return F.beginProc(t.procID + "ws", r, !0, s ? r : void 0), !0;
  }
  onPlayEnd() {
  }
  // ok
  fade(t, e) {
    const { buf: s = R } = e, i = "const.sn.sound." + s + "." + "volume", r = y.getVol(e, NaN);
    d.setVal_Nochk("save", i, r);
    const a = r * Number(d.getVal("sys:" + i, 1)), u = T(e, "stop", r === 0);
    u && y.delLoopPlay(s), d.flush();
    const c = S(e, "time", NaN), l = S(e, "delay", 0);
    if (c === 0 && l === 0 || Q.isSkipping) {
      t.setVol(a), t.stt = u ? new M(t) : new G(t);
      return;
    }
    const _ = t.tw();
    _ && (vt.setTwProp(_, e).to({ volume: a }, c).onComplete(() => {
      bt(_), t.stt.compFade(s), t.stt = u ? new M(t) : new G(t);
    }).start(), t.stt = new Vt(_, t));
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
class At {
  constructor(t) {
    this.si = t;
  }
  onLoad() {
  }
  // ok
  stopse(t) {
    t.stt = new M(t);
  }
  ws = () => !1;
  // ok
  onPlayEnd() {
    F.notifyEndProc(this.si.procID + "ws");
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
class Vt {
  constructor(t, e) {
    this.tw = t, this.si = e;
  }
  onLoad() {
  }
  // ok
  stopse(t) {
    this.stopfadese(), t.stt = new M(t);
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
    t.stt = new Mt(t);
    const s = T(e, "canskip", !1);
    if (s && Q.isSkipping)
      return this.stopfadese(), !1;
    const o = () => this.stopfadese();
    return F.beginProc(t.procID + "wf", o, !0, s ? o : void 0), !0;
  }
  compFade() {
  }
  // ok
  stopfadese = () => this.si.stop();
  isDestroy = !1;
}
class Mt {
  constructor(t) {
    this.si = t;
  }
  onLoad() {
  }
  // ok
  stopse(t) {
    this.stopfadese(), t.stt = new M(t);
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
  compFade() {
    F.notifyEndProc(this.si.procID + "wf");
  }
  stopfadese = () => this.si.stop();
  isDestroy = !1;
}
class M {
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
export {
  R as B,
  vt as C,
  Bt as I,
  nt as R,
  y as S,
  W as T,
  z as a,
  Y as b
};
//# sourceMappingURL=SndBuf.js.map
