import { b as E, a as C, C as S, T as je, L as Et, B as As, S as A, c as M, i as cs, d as vt, D as at, e as ge, R as Ot, A as Es, f as Z, h as st, j as he, k as Xt, l as ti, G as ei, m as si, t as Re, n as ls, o as G, q as gt, u as Ct, r as ii, s as _e, v as ni, E as ue, w as Qt, x as ri, g as oi, P as ai, y as hs, z as Os, F as ci, H as Zt, I as li, J as hi, K as ui, M as fi } from "./web2.js";
var L = Object.freeze({
  Linear: Object.freeze({
    None: function(n) {
      return n;
    },
    In: function(n) {
      return n;
    },
    Out: function(n) {
      return n;
    },
    InOut: function(n) {
      return n;
    }
  }),
  Quadratic: Object.freeze({
    In: function(n) {
      return n * n;
    },
    Out: function(n) {
      return n * (2 - n);
    },
    InOut: function(n) {
      return (n *= 2) < 1 ? 0.5 * n * n : -0.5 * (--n * (n - 2) - 1);
    }
  }),
  Cubic: Object.freeze({
    In: function(n) {
      return n * n * n;
    },
    Out: function(n) {
      return --n * n * n + 1;
    },
    InOut: function(n) {
      return (n *= 2) < 1 ? 0.5 * n * n * n : 0.5 * ((n -= 2) * n * n + 2);
    }
  }),
  Quartic: Object.freeze({
    In: function(n) {
      return n * n * n * n;
    },
    Out: function(n) {
      return 1 - --n * n * n * n;
    },
    InOut: function(n) {
      return (n *= 2) < 1 ? 0.5 * n * n * n * n : -0.5 * ((n -= 2) * n * n * n - 2);
    }
  }),
  Quintic: Object.freeze({
    In: function(n) {
      return n * n * n * n * n;
    },
    Out: function(n) {
      return --n * n * n * n * n + 1;
    },
    InOut: function(n) {
      return (n *= 2) < 1 ? 0.5 * n * n * n * n * n : 0.5 * ((n -= 2) * n * n * n * n + 2);
    }
  }),
  Sinusoidal: Object.freeze({
    In: function(n) {
      return 1 - Math.sin((1 - n) * Math.PI / 2);
    },
    Out: function(n) {
      return Math.sin(n * Math.PI / 2);
    },
    InOut: function(n) {
      return 0.5 * (1 - Math.sin(Math.PI * (0.5 - n)));
    }
  }),
  Exponential: Object.freeze({
    In: function(n) {
      return n === 0 ? 0 : Math.pow(1024, n - 1);
    },
    Out: function(n) {
      return n === 1 ? 1 : 1 - Math.pow(2, -10 * n);
    },
    InOut: function(n) {
      return n === 0 ? 0 : n === 1 ? 1 : (n *= 2) < 1 ? 0.5 * Math.pow(1024, n - 1) : 0.5 * (-Math.pow(2, -10 * (n - 1)) + 2);
    }
  }),
  Circular: Object.freeze({
    In: function(n) {
      return 1 - Math.sqrt(1 - n * n);
    },
    Out: function(n) {
      return Math.sqrt(1 - --n * n);
    },
    InOut: function(n) {
      return (n *= 2) < 1 ? -0.5 * (Math.sqrt(1 - n * n) - 1) : 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
    }
  }),
  Elastic: Object.freeze({
    In: function(n) {
      return n === 0 ? 0 : n === 1 ? 1 : -Math.pow(2, 10 * (n - 1)) * Math.sin((n - 1.1) * 5 * Math.PI);
    },
    Out: function(n) {
      return n === 0 ? 0 : n === 1 ? 1 : Math.pow(2, -10 * n) * Math.sin((n - 0.1) * 5 * Math.PI) + 1;
    },
    InOut: function(n) {
      return n === 0 ? 0 : n === 1 ? 1 : (n *= 2, n < 1 ? -0.5 * Math.pow(2, 10 * (n - 1)) * Math.sin((n - 1.1) * 5 * Math.PI) : 0.5 * Math.pow(2, -10 * (n - 1)) * Math.sin((n - 1.1) * 5 * Math.PI) + 1);
    }
  }),
  Back: Object.freeze({
    In: function(n) {
      var t = 1.70158;
      return n === 1 ? 1 : n * n * ((t + 1) * n - t);
    },
    Out: function(n) {
      var t = 1.70158;
      return n === 0 ? 0 : --n * n * ((t + 1) * n + t) + 1;
    },
    InOut: function(n) {
      var t = 2.5949095;
      return (n *= 2) < 1 ? 0.5 * (n * n * ((t + 1) * n - t)) : 0.5 * ((n -= 2) * n * ((t + 1) * n + t) + 2);
    }
  }),
  Bounce: Object.freeze({
    In: function(n) {
      return 1 - L.Bounce.Out(1 - n);
    },
    Out: function(n) {
      return n < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + 0.75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375 : 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
    },
    InOut: function(n) {
      return n < 0.5 ? L.Bounce.In(n * 2) * 0.5 : L.Bounce.Out(n * 2 - 1) * 0.5 + 0.5;
    }
  }),
  generatePow: function(n) {
    return n === void 0 && (n = 4), n = n < Number.EPSILON ? Number.EPSILON : n, n = n > 1e4 ? 1e4 : n, {
      In: function(t) {
        return Math.pow(t, n);
      },
      Out: function(t) {
        return 1 - Math.pow(1 - t, n);
      },
      InOut: function(t) {
        return t < 0.5 ? Math.pow(t * 2, n) / 2 : (1 - Math.pow(2 - t * 2, n)) / 2 + 0.5;
      }
    };
  }
}), qt = function() {
  return performance.now();
}, di = (
  /** @class */
  function() {
    function n() {
      this._tweens = {}, this._tweensAddedDuringUpdate = {};
    }
    return n.prototype.getAll = function() {
      var t = this;
      return Object.keys(this._tweens).map(function(e) {
        return t._tweens[e];
      });
    }, n.prototype.removeAll = function() {
      this._tweens = {};
    }, n.prototype.add = function(t) {
      this._tweens[t.getId()] = t, this._tweensAddedDuringUpdate[t.getId()] = t;
    }, n.prototype.remove = function(t) {
      delete this._tweens[t.getId()], delete this._tweensAddedDuringUpdate[t.getId()];
    }, n.prototype.update = function(t, e) {
      t === void 0 && (t = qt()), e === void 0 && (e = !1);
      var s = Object.keys(this._tweens);
      if (s.length === 0)
        return !1;
      for (; s.length > 0; ) {
        this._tweensAddedDuringUpdate = {};
        for (var i = 0; i < s.length; i++) {
          var r = this._tweens[s[i]], o = !e;
          r && r.update(t, o) === !1 && !e && delete this._tweens[s[i]];
        }
        s = Object.keys(this._tweensAddedDuringUpdate);
      }
      return !0;
    }, n;
  }()
), Be = {
  Linear: function(n, t) {
    var e = n.length - 1, s = e * t, i = Math.floor(s), r = Be.Utils.Linear;
    return t < 0 ? r(n[0], n[1], s) : t > 1 ? r(n[e], n[e - 1], e - s) : r(n[i], n[i + 1 > e ? e : i + 1], s - i);
  },
  Utils: {
    Linear: function(n, t, e) {
      return (t - n) * e + n;
    }
  }
}, Cs = (
  /** @class */
  function() {
    function n() {
    }
    return n.nextId = function() {
      return n._nextId++;
    }, n._nextId = 0, n;
  }()
), Ve = new di(), re = (
  /** @class */
  function() {
    function n(t, e) {
      e === void 0 && (e = Ve), this._object = t, this._group = e, this._isPaused = !1, this._pauseStart = 0, this._valuesStart = {}, this._valuesEnd = {}, this._valuesStartRepeat = {}, this._duration = 1e3, this._isDynamic = !1, this._initialRepeat = 0, this._repeat = 0, this._yoyo = !1, this._isPlaying = !1, this._reversed = !1, this._delayTime = 0, this._startTime = 0, this._easingFunction = L.Linear.None, this._interpolationFunction = Be.Linear, this._chainedTweens = [], this._onStartCallbackFired = !1, this._onEveryStartCallbackFired = !1, this._id = Cs.nextId(), this._isChainStopped = !1, this._propertiesAreSetUp = !1, this._goToEnd = !1;
    }
    return n.prototype.getId = function() {
      return this._id;
    }, n.prototype.isPlaying = function() {
      return this._isPlaying;
    }, n.prototype.isPaused = function() {
      return this._isPaused;
    }, n.prototype.getDuration = function() {
      return this._duration;
    }, n.prototype.to = function(t, e) {
      if (e === void 0 && (e = 1e3), this._isPlaying)
        throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");
      return this._valuesEnd = t, this._propertiesAreSetUp = !1, this._duration = e < 0 ? 0 : e, this;
    }, n.prototype.duration = function(t) {
      return t === void 0 && (t = 1e3), this._duration = t < 0 ? 0 : t, this;
    }, n.prototype.dynamic = function(t) {
      return t === void 0 && (t = !1), this._isDynamic = t, this;
    }, n.prototype.start = function(t, e) {
      if (t === void 0 && (t = qt()), e === void 0 && (e = !1), this._isPlaying)
        return this;
      if (this._group && this._group.add(this), this._repeat = this._initialRepeat, this._reversed) {
        this._reversed = !1;
        for (var s in this._valuesStartRepeat)
          this._swapEndStartRepeatValues(s), this._valuesStart[s] = this._valuesStartRepeat[s];
      }
      if (this._isPlaying = !0, this._isPaused = !1, this._onStartCallbackFired = !1, this._onEveryStartCallbackFired = !1, this._isChainStopped = !1, this._startTime = t, this._startTime += this._delayTime, !this._propertiesAreSetUp || e) {
        if (this._propertiesAreSetUp = !0, !this._isDynamic) {
          var i = {};
          for (var r in this._valuesEnd)
            i[r] = this._valuesEnd[r];
          this._valuesEnd = i;
        }
        this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat, e);
      }
      return this;
    }, n.prototype.startFromCurrentValues = function(t) {
      return this.start(t, !0);
    }, n.prototype._setupProperties = function(t, e, s, i, r) {
      for (var o in s) {
        var a = t[o], c = Array.isArray(a), h = c ? "array" : typeof a, l = !c && Array.isArray(s[o]);
        if (!(h === "undefined" || h === "function")) {
          if (l) {
            var u = s[o];
            if (u.length === 0)
              continue;
            for (var m = [a], p = 0, d = u.length; p < d; p += 1) {
              var y = this._handleRelativeValue(a, u[p]);
              if (isNaN(y)) {
                l = !1, console.warn("Found invalid interpolation list. Skipping.");
                break;
              }
              m.push(y);
            }
            l && (s[o] = m);
          }
          if ((h === "object" || c) && a && !l) {
            e[o] = c ? [] : {};
            var _ = a;
            for (var f in _)
              e[o][f] = _[f];
            i[o] = c ? [] : {};
            var u = s[o];
            if (!this._isDynamic) {
              var v = {};
              for (var f in u)
                v[f] = u[f];
              s[o] = u = v;
            }
            this._setupProperties(_, e[o], u, i[o], r);
          } else
            (typeof e[o] > "u" || r) && (e[o] = a), c || (e[o] *= 1), l ? i[o] = s[o].slice().reverse() : i[o] = e[o] || 0;
        }
      }
    }, n.prototype.stop = function() {
      return this._isChainStopped || (this._isChainStopped = !0, this.stopChainedTweens()), this._isPlaying ? (this._group && this._group.remove(this), this._isPlaying = !1, this._isPaused = !1, this._onStopCallback && this._onStopCallback(this._object), this) : this;
    }, n.prototype.end = function() {
      return this._goToEnd = !0, this.update(1 / 0), this;
    }, n.prototype.pause = function(t) {
      return t === void 0 && (t = qt()), this._isPaused || !this._isPlaying ? this : (this._isPaused = !0, this._pauseStart = t, this._group && this._group.remove(this), this);
    }, n.prototype.resume = function(t) {
      return t === void 0 && (t = qt()), !this._isPaused || !this._isPlaying ? this : (this._isPaused = !1, this._startTime += t - this._pauseStart, this._pauseStart = 0, this._group && this._group.add(this), this);
    }, n.prototype.stopChainedTweens = function() {
      for (var t = 0, e = this._chainedTweens.length; t < e; t++)
        this._chainedTweens[t].stop();
      return this;
    }, n.prototype.group = function(t) {
      return t === void 0 && (t = Ve), this._group = t, this;
    }, n.prototype.delay = function(t) {
      return t === void 0 && (t = 0), this._delayTime = t, this;
    }, n.prototype.repeat = function(t) {
      return t === void 0 && (t = 0), this._initialRepeat = t, this._repeat = t, this;
    }, n.prototype.repeatDelay = function(t) {
      return this._repeatDelayTime = t, this;
    }, n.prototype.yoyo = function(t) {
      return t === void 0 && (t = !1), this._yoyo = t, this;
    }, n.prototype.easing = function(t) {
      return t === void 0 && (t = L.Linear.None), this._easingFunction = t, this;
    }, n.prototype.interpolation = function(t) {
      return t === void 0 && (t = Be.Linear), this._interpolationFunction = t, this;
    }, n.prototype.chain = function() {
      for (var t = [], e = 0; e < arguments.length; e++)
        t[e] = arguments[e];
      return this._chainedTweens = t, this;
    }, n.prototype.onStart = function(t) {
      return this._onStartCallback = t, this;
    }, n.prototype.onEveryStart = function(t) {
      return this._onEveryStartCallback = t, this;
    }, n.prototype.onUpdate = function(t) {
      return this._onUpdateCallback = t, this;
    }, n.prototype.onRepeat = function(t) {
      return this._onRepeatCallback = t, this;
    }, n.prototype.onComplete = function(t) {
      return this._onCompleteCallback = t, this;
    }, n.prototype.onStop = function(t) {
      return this._onStopCallback = t, this;
    }, n.prototype.update = function(t, e) {
      var s = this, i;
      if (t === void 0 && (t = qt()), e === void 0 && (e = !0), this._isPaused)
        return !0;
      var r, o = this._startTime + this._duration;
      if (!this._goToEnd && !this._isPlaying) {
        if (t > o)
          return !1;
        e && this.start(t, !0);
      }
      if (this._goToEnd = !1, t < this._startTime)
        return !0;
      this._onStartCallbackFired === !1 && (this._onStartCallback && this._onStartCallback(this._object), this._onStartCallbackFired = !0), this._onEveryStartCallbackFired === !1 && (this._onEveryStartCallback && this._onEveryStartCallback(this._object), this._onEveryStartCallbackFired = !0);
      var a = t - this._startTime, c = this._duration + ((i = this._repeatDelayTime) !== null && i !== void 0 ? i : this._delayTime), h = this._duration + this._repeat * c, l = function() {
        if (s._duration === 0 || a > h)
          return 1;
        var _ = Math.trunc(a / c), f = a - _ * c, v = Math.min(f / s._duration, 1);
        return v === 0 && a === s._duration ? 1 : v;
      }, u = l(), m = this._easingFunction(u);
      if (this._updateProperties(this._object, this._valuesStart, this._valuesEnd, m), this._onUpdateCallback && this._onUpdateCallback(this._object, u), this._duration === 0 || a >= this._duration)
        if (this._repeat > 0) {
          var p = Math.min(Math.trunc((a - this._duration) / c) + 1, this._repeat);
          isFinite(this._repeat) && (this._repeat -= p);
          for (r in this._valuesStartRepeat)
            !this._yoyo && typeof this._valuesEnd[r] == "string" && (this._valuesStartRepeat[r] = // eslint-disable-next-line
            // @ts-ignore FIXME?
            this._valuesStartRepeat[r] + parseFloat(this._valuesEnd[r])), this._yoyo && this._swapEndStartRepeatValues(r), this._valuesStart[r] = this._valuesStartRepeat[r];
          return this._yoyo && (this._reversed = !this._reversed), this._startTime += c * p, this._onRepeatCallback && this._onRepeatCallback(this._object), this._onEveryStartCallbackFired = !1, !0;
        } else {
          this._onCompleteCallback && this._onCompleteCallback(this._object);
          for (var d = 0, y = this._chainedTweens.length; d < y; d++)
            this._chainedTweens[d].start(this._startTime + this._duration, !1);
          return this._isPlaying = !1, !1;
        }
      return !0;
    }, n.prototype._updateProperties = function(t, e, s, i) {
      for (var r in s)
        if (e[r] !== void 0) {
          var o = e[r] || 0, a = s[r], c = Array.isArray(t[r]), h = Array.isArray(a), l = !c && h;
          l ? t[r] = this._interpolationFunction(a, i) : typeof a == "object" && a ? this._updateProperties(t[r], o, a, i) : (a = this._handleRelativeValue(o, a), typeof a == "number" && (t[r] = o + (a - o) * i));
        }
    }, n.prototype._handleRelativeValue = function(t, e) {
      return typeof e != "string" ? e : e.charAt(0) === "+" || e.charAt(0) === "-" ? t + parseFloat(e) : parseFloat(e);
    }, n.prototype._swapEndStartRepeatValues = function(t) {
      var e = this._valuesStartRepeat[t], s = this._valuesEnd[t];
      typeof s == "string" ? this._valuesStartRepeat[t] = this._valuesStartRepeat[t] + parseFloat(s) : this._valuesStartRepeat[t] = this._valuesEnd[t], this._valuesEnd[t] = e;
    }, n;
  }()
);
Cs.nextId;
var ht = Ve;
ht.getAll.bind(ht);
var pi = ht.removeAll.bind(ht);
ht.add.bind(ht);
var Ss = ht.remove.bind(ht), mi = ht.update.bind(ht);
const jt = `trans
`, be = "tsy nm:";
class B {
  static #e = {};
  static #t;
  static #s;
  static init(t, e) {
    this.#e = {}, this.#t = t, this.#s = e, this.#s.ticker.add(this.#n);
  }
  static #n = () => mi();
  static destroy() {
    this.stopAllTw(), this.#s.ticker.remove(this.#n);
  }
  static setTwProp(t, e) {
    const s = E(e, "repeat", 1);
    return t.delay(E(e, "delay", 0)).easing(this.ease(e.ease)).repeat(s > 0 ? s - 1 : 1 / 0).yoyo(C(e, "yoyo", !1));
  }
  static #i = {
    "Back.In": (t) => L.Back.In(t),
    "Back.InOut": (t) => L.Back.InOut(t),
    "Back.Out": (t) => L.Back.Out(t),
    "Bounce.In": (t) => L.Bounce.In(t),
    "Bounce.InOut": (t) => L.Bounce.InOut(t),
    "Bounce.Out": (t) => L.Bounce.Out(t),
    "Circular.In": (t) => L.Circular.In(t),
    "Circular.InOut": (t) => L.Circular.InOut(t),
    "Circular.Out": (t) => L.Circular.Out(t),
    "Cubic.In": (t) => L.Cubic.In(t),
    "Cubic.InOut": (t) => L.Cubic.InOut(t),
    "Cubic.Out": (t) => L.Cubic.Out(t),
    "Elastic.In": (t) => L.Elastic.In(t),
    "Elastic.InOut": (t) => L.Elastic.InOut(t),
    "Elastic.Out": (t) => L.Elastic.Out(t),
    "Exponential.In": (t) => L.Exponential.In(t),
    "Exponential.InOut": (t) => L.Exponential.InOut(t),
    "Exponential.Out": (t) => L.Exponential.Out(t),
    "Linear.None": (t) => L.Linear.None(t),
    "Quadratic.In": (t) => L.Quadratic.In(t),
    "Quadratic.InOut": (t) => L.Quadratic.InOut(t),
    "Quadratic.Out": (t) => L.Quadratic.Out(t),
    "Quartic.In": (t) => L.Quartic.In(t),
    "Quartic.InOut": (t) => L.Quartic.InOut(t),
    "Quartic.Out": (t) => L.Quartic.Out(t),
    "Quintic.In": (t) => L.Quintic.In(t),
    "Quintic.InOut": (t) => L.Quintic.InOut(t),
    "Quintic.Out": (t) => L.Quintic.Out(t),
    "Sinusoidal.In": (t) => L.Sinusoidal.In(t),
    "Sinusoidal.InOut": (t) => L.Sinusoidal.InOut(t),
    "Sinusoidal.Out": (t) => L.Sinusoidal.Out(t)
  };
  static ease(t) {
    if (!t) return (s) => L.Linear.None(s);
    const e = this.#i[t];
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
    for (const i of Object.keys(this.hMemberCnt)) {
      const r = t[i];
      if (!r) continue;
      const o = String(r), a = o.startsWith("="), c = a ? o.slice(1) : o;
      if (!c) continue;
      const [h, l] = c.split(","), u = s[i] = parseFloat(h);
      l && (s[i] += Math.round(
        Math.random() * (parseFloat(l) - u + 1)
      )), a && (s[i] += parseFloat(e[i]));
    }
    return s;
  }
  // トゥイーン全停止
  static stopAllTw() {
    this.#e = {}, pi();
  }
  static tween(t, e, s, i, r, o, a, c = !0) {
    const h = this.#t.isSkipping ? 0 : E(e, "time", NaN), l = new re(s).to(i, h).onUpdate(r);
    this.setTwProp(l, e), this.#e[t] = { tw: l, onEnd: a };
    const { path: u } = e;
    let m = l;
    if (u) {
      S.debugLog && console.group(`🍝 [${e[":タグ名"]}] path=${u}= start(${s.x},${s.y},${s.alpha})`);
      for (const { groups: d } of u.matchAll(this.#o)) {
        const { x: y, x2: _, y: f, y2: v, o: P, o2: w, json: b } = d;
        let x = {};
        if (b) try {
          x = JSON.parse(b);
        } catch (N) {
          console.error(`🍝 json=${b} ` + N);
          continue;
        }
        (y ?? _) && (x.x = y ?? _), (f ?? v) && (x.y = f ?? v), (P ?? w) && (x.alpha = P ?? w);
        const O = this.cnvTweenArg(x, s);
        S.debugLog && console.info(`🍝 ${b ?? `{x:${y} y:${f} o:${P}}`} => hTo:${JSON.stringify(O)}`);
        const I = new re(s).to(O, h);
        this.setTwProp(I, e), m.chain(I), m = I;
      }
      S.debugLog && console.groupEnd();
    }
    m.onComplete(() => {
      const d = this.#e[t];
      d && (delete this.#e[t], d.tw = void 0, l.stop(), g.notifyEndProc(be + t), d.onEnd?.(), o());
    });
    const { chain: p } = e;
    if (p) {
      const d = this.#e[p];
      if (!d?.tw) throw `${p}は存在しない・または終了したトゥイーンです`;
      delete d.onEnd, d.tw.chain(l);
    } else c && l.start();
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
  static #o = /\(\s*(?:(?<x>[-=\d\.]+)|(['"])(?<x2>.*?)\2)?(?:\s*,\s*(?:(?<y>[-=\d\.]+)|(['"])(?<y2>.*?)\5)?(?:\s*,\s*(?:(?<o>[-=\d\.]+)|(['"])(?<o2>.*?)\8))?)?|(?<json>\{[^{}]*})/g;
  // トランス終了待ち
  static wt(t) {
    if (!this.#e[jt]?.tw) return !1;
    const s = () => this.finish_trans();
    return g.beginProc(be + jt, s, !0, s), !0;
  }
  // レイヤのトランジションの停止
  static finish_trans() {
    return this.#e[jt]?.tw?.stop().end(), !1;
  }
  // stop()とend()は別
  // トゥイーン終了待ち
  static wait_tsy(t) {
    const e = this.#c(t), s = this.#e[e];
    if (!s?.tw) {
      const { layer: r = "", id: o, name: a } = t;
      if (C(t, "chk_exist_tw", !1)) throw o ? `フレームトゥイーン ${o} が見つかりません。` : `トゥイーン ${e} が見つかりません。(layer:${r} name:${a})`;
      return !1;
    }
    const i = () => s.tw?.end();
    return g.beginProc(be + e, i, !0, i), !0;
  }
  static #c(t) {
    const { layer: e = "", id: s, name: i } = t, r = s ? `frm
${s}` : i ?? e;
    if (!r) throw "トゥイーンが指定されていません";
    return r;
  }
  // トゥイーン中断
  static stop_tsy(t) {
    const e = this.#c(t);
    return this.#e[e]?.tw?.stop().end(), !1;
  }
  // 一時停止
  static pause_tsy(t) {
    const e = this.#c(t);
    return this.#e[e]?.tw?.pause(), !1;
  }
  // 一時停止再開
  static resume_tsy(t) {
    const e = this.#c(t);
    return this.#e[e]?.tw?.resume(), !1;
  }
}
class $ {
  constructor(t = "", e, s = () => {
  }, i = () => {
  }) {
    this.csvFn = t, this.ctn = e, this.fncFirstComp = s, this.fncAllComp = i, t && (this.#g = e ? (r) => {
      e.addChild(r), this.#h.push(r);
    } : () => {
    }, this.ret = $.#r(
      t,
      (r) => this.fncFirstComp(r),
      // 差し替え考慮
      (r) => this.fncAllComp(r),
      // 差し替え考慮
      (r) => this.#g(r)
      // 差し替え考慮
    ));
  }
  static #e;
  static #t;
  static #s;
  static #n;
  static init(t, e, s, i, r) {
    $.#e = t, $.#t = e, $.#s = s, $.#n = i, s.arg.crypto && ($.#f = $.#m, $.#l = $.#S);
    const o = () => {
      const a = $.#o * $.#i;
      for (const c of Object.values($.#y)) c.volume = a;
    };
    r.setNoticeChgVolume(
      (a) => {
        $.#o = a, o();
      },
      (a) => {
        $.#i = a, o();
      }
    );
  }
  static #i = 1;
  static #o = 1;
  static #c;
  static setEvtMng(t) {
    $.#c = t;
  }
  ret = !1;
  #g;
  #h = [];
  destroy() {
    this.fncFirstComp = () => {
    }, this.fncAllComp = () => {
    }, this.#g = (t) => t.destroy();
    for (const t of this.#h)
      $.stopVideo(t.name), t.parent?.removeChild(t), t.destroy();
    this.#h = [];
  }
  static destroy() {
    $.#d = {}, $.#u = {}, $.#y = {};
  }
  //static #ldrHFn: {[fn: string]: 1} = {};
  static #r(t, e, s, i) {
    if (!t) return !1;
    let r = !1;
    if (t.startsWith("data:")) {
      const u = () => {
        const m = Z.from(t);
        i(m), e(m), s(r);
      };
      return t in je ? u() : (r = !0, new Et().add(t, t).load(u)), r;
    }
    const o = [], a = new Et(), c = t.split(","), h = c.length;
    for (let u = 0; u < h; ++u) {
      const m = c[u];
      if (!m) throw "face属性に空要素が含まれます";
      const { dx: p, dy: d, blendmode: y, fn: _ } = $.#d[m] || {
        fn: m,
        dx: 0,
        dy: 0,
        blendmode: As.NORMAL
      }, f = u === 0 ? e : (w) => {
        w.transform !== null && (w.x = p, w.y = d, w.blendMode = y);
      };
      if (o.push({ fn: _, fnc: f }), _ in $.#u || _ in je || _ in Et.shared.resources) continue;
      r = !0;
      const v = $.#e.searchPath(_, A.SP_GSM), P = this.#s.arg.crypto ? { xhrType: v.slice(-5) === ".json" ? M.XHR_RESPONSE_TYPE.TEXT : M.XHR_RESPONSE_TYPE.BUFFER } : {};
      a.add({ ...P, name: _, url: v });
    }
    const l = (u, m) => {
      for (const { fn: p, fnc: d } of o) {
        const y = $.#v(p, m);
        y.name = p, i(y), d(y);
      }
      s(r);
    };
    return r ? a.use(async (u, m) => {
      try {
        if (u.extension === "json") {
          const d = await this.#s.dec("json", u.data);
          $.#l(d, u, m);
          return;
        }
        const p = await this.#s.decAB(u.data);
        $.#f(p, u, m);
      } catch (p) {
        const d = `画像/動画ロード失敗です fn:${u.name} ${p}`;
        $.#c.isSkipping ? console.warn(d) : console.error("%c" + d, "color:#FF3300;");
      }
    }).load(l) : queueMicrotask(() => l(0, {})), r;
  }
  static #d = {};
  static #u = {};
  static #f = (t, { type: e, name: s, data: i }, r) => {
    switch (e) {
      case M.TYPE.VIDEO:
        const o = i;
        o.volume = $.#o, $.#y[s] = $.#b(o);
    }
    r();
  };
  static #p(t) {
    const e = /([^\d]+)\d+\.(\w+)/.exec(t[0] ?? "");
    if (!e) return [];
    const s = e[1].length, i = -e[2].length - 1;
    return t.sort((r, o) => cs(r.slice(s, i)) > cs(o.slice(s, i)) ? 1 : -1);
  }
  static async #m(t, e, s) {
    e.data = t, e.extension !== "bin" && s(), t instanceof HTMLImageElement ? (e.texture = await vt.fromLoader(t, e.url, e.name), e.type = M.TYPE.IMAGE) : t instanceof HTMLVideoElement && (t.volume = $.#o, $.#y[e.name] = $.#b(t), e.type = M.TYPE.VIDEO), s();
  }
  static #b(t) {
    return $.#t.getVal("const.sn.needClick2Play") && (at.trace_beforeNew(`[lay系] ${at.strPos()}未クリック状態で動画を自動再生します。音声はミュートされます`, "W"), t.muted = !0), t.setAttribute("playsinline", ""), t;
  }
  static #l = (t, { type: e, spritesheet: s, name: i, data: r }, o) => {
    switch (e) {
      case M.TYPE.JSON:
        const a = s._frameKeys;
        $.#p(a), $.#u[i] = {
          aTex: a.map((c) => vt.from(c)),
          meta: r.meta
        };
    }
    o();
  };
  static #S(t, e, s) {
    const { meta: i, frames: r } = e.data = JSON.parse(t);
    if (e.type = M.TYPE.JSON, !i?.image) {
      s();
      return;
    }
    const o = ge(i.image), a = $.#e.searchPath(o, A.SP_GSM);
    new Et().use((c, h) => {
      this.#s.decAB(c.data).then((l) => {
        c.data = l, l instanceof HTMLImageElement && (c.type = M.TYPE.IMAGE, URL.revokeObjectURL(l.src)), h();
      }).catch((l) => this.#n.errScript(`画像/動画ロード失敗です dec2res4Cripto fn:${c.name} ${l}`, !1));
    }).add({ name: o, url: a, xhrType: M.XHR_RESPONSE_TYPE.BUFFER }).load((c, h) => {
      for (const { data: l } of Object.values(c.resources)) {
        const { baseTexture: u } = vt.from(l), m = Object.values(r);
        $.#u[e.name] = {
          aTex: m.map(({ frame: { x: p, y: d, w: y, h: _ } }) => new vt(
            u,
            new Ot(p, d, y, _)
          )),
          meta: i
        };
      }
      s();
    });
  }
  static #v(t, e) {
    const s = $.#u[t];
    if (s) {
      const o = new Es(s.aTex);
      return o.animationSpeed = s.meta.animationSpeed ?? 1, o.play(), o;
    }
    if (t in je) return Z.from(t);
    const i = $.#y[t];
    if (i) return Z.from(i);
    const r = e[t];
    return r ? new Z(r.texture) : new Z();
  }
  static #y = {};
  static getHFn2VElm(t) {
    return $.#y[t];
  }
  static wv(t) {
    const { fn: e } = t;
    if (!e) throw "fnは必須です";
    const s = $.#y[e];
    if (!s || s.loop) return !1;
    if ($.#c.isSkipping || s.ended)
      return $.stopVideo(e), !1;
    const i = "wv fn:" + e, r = C(t, "stop", !0), o = () => {
      r && $.stopVideo(e);
    };
    return g.beginProc(i, o, !0, o), s.addEventListener("ended", () => g.notifyEndProc(i), { once: !0, passive: !0 }), !0;
  }
  static stopVideo(t) {
    const e = $.#y[t];
    e && (delete $.#y[t], e.pause(), e.currentTime = e.duration);
  }
  static add_face(t) {
    const { name: e } = t;
    if (!e) throw "nameは必須です";
    if (e in $.#d) throw "一つのname（" + e + "）に対して同じ画像を複数割り当てられません";
    const { fn: s = e } = t;
    return $.#d[e] = {
      fn: s,
      dx: E(t, "dx", 0),
      dy: E(t, "dy", 0),
      blendmode: st.getBlendmodeNum(t.blendmode || "")
    }, !1;
  }
  //	static	clearFace2Name(): void {SpritesMng.hFace = {}}
}
const At = "、。，．）］｝〉」』】〕”〟ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ！？!?‼⁉・ーゝゞヽヾ々", we = "［（｛〈「『【〔“〝", ke = "─‥…", Le = At, Ts = new RegExp(`[${At}]`), yi = new RegExp(`[${we}]`), vi = new RegExp(`[${ke}]`), gi = Ts;
class _i {
  #e = At;
  #t = we;
  #s = ke;
  #n = Le;
  get 行頭禁則() {
    return this.#e;
  }
  get 行末禁則() {
    return this.#t;
  }
  get 分割禁止() {
    return this.#s;
  }
  get ぶら下げ() {
    return this.#n;
  }
  #i = Ts;
  #o = yi;
  #c = vi;
  #g = gi;
  break_fixed = !1;
  break_fixed_left = 0;
  break_fixed_top = 0;
  bura = !1;
  lay(t) {
    t.kinsoku_sol && (this.#e = t.kinsoku_sol, this.#i = new RegExp(`[${this.#e}]`)), t.kinsoku_eol && (this.#t = t.kinsoku_eol, this.#h(), this.#o = new RegExp(`[${this.#t}]`)), t.kinsoku_dns && (this.#s = t.kinsoku_dns, this.#r(), this.#c = new RegExp(`[${this.#s}]`)), t.kinsoku_bura && (this.#n = t.kinsoku_bura, this.#h(), this.#r(), this.#g = new RegExp(`[${this.#n}]`)), "bura" in t && (this.bura = C(t, "bura", !1)), this.break_fixed = C(t, "break_fixed", this.break_fixed), this.break_fixed_left = E(t, "break_fixed_left", this.break_fixed_left), this.break_fixed_top = E(t, "break_fixed_top", this.break_fixed_top);
  }
  // 禁則の競合（ぶら下げ と 行末禁則 の両方に含まれる文字があってはならない）
  #h() {
    const t = this.#t.length, e = this.#n.length;
    if (t < e)
      for (let s = 0; s < t; ++s) {
        const i = this.#t[s];
        if (this.#n.includes(i)) throw `禁則の競合があります。文字 ${i} がぶら下げ と 行末禁則 の両方に含まれます`;
      }
    else
      for (let s = 0; s < e; ++s) {
        const i = this.#n[s];
        if (this.#t.includes(i)) throw `禁則の競合があります。文字 ${i} がぶら下げ と 行末禁則 の両方に含まれます`;
      }
  }
  // 禁則の競合（ぶら下げ と 分割禁止 の両方に含まれる文字があってはならない）
  #r() {
    const t = this.#s.length, e = this.#n.length;
    if (t < e)
      for (let s = 0; s < t; ++s) {
        const i = this.#s[s];
        if (this.#n.includes(i)) throw `禁則の競合があります。文字 ${i} がぶら下げ と 分割禁止 の両方に含まれます`;
      }
    else
      for (let s = 0; s < e; ++s) {
        const i = this.#n[s];
        if (this.#s.includes(i)) throw `禁則の競合があります。文字 ${i} がぶら下げ と 分割禁止 の両方に含まれます`;
      }
  }
  reNew(t) {
    t.#d(this.#e, this.#t, this.#s, this.#n), t.break_fixed = this.break_fixed, t.break_fixed_left = this.break_fixed_left, t.break_fixed_top = this.break_fixed_top, t.bura = this.bura;
  }
  #d(t, e, s, i) {
    this.#e != t && (this.#e = t, this.#i = new RegExp(`[${t}]`)), this.#t != e && (this.#t = e, this.#o = new RegExp(`[${e}]`)), this.#s != s && (this.#s = s, this.#c = new RegExp(`[${s}]`)), this.#n != i && (this.#n = i, this.#g = new RegExp(`[${i}]`));
  }
  record() {
    const t = {
      break_fixed: this.break_fixed,
      break_fixed_left: this.break_fixed_left,
      break_fixed_top: this.break_fixed_top,
      bura: this.bura
    };
    return this.#e === At && (t.行頭禁則 = this.#e), this.#t === we && (t.行末禁則 = this.#t), this.#s === ke && (t.分割禁止 = this.#s), this.#n === Le && (t.ぶら下げ = this.#n), t;
  }
  playback(t) {
    t && (this.#d(
      t.行頭禁則 ?? At,
      t.行末禁則 ?? we,
      t.分割禁止 ?? ke,
      t.ぶら下げ ?? Le
    ), this.break_fixed = t.break_fixed, this.break_fixed_left = t.break_fixed_left, this.break_fixed_top = t.break_fixed_top, this.bura = t.bura);
  }
  hyph(t, e, s, i, r) {
    let o, a = 0, c = 2, h = (l) => (h = () => !1, i === l ? (i > 0 && (t.innerHTML = r.replaceAll('class="sn_ch"', 'class="sn_ch sn_ch_in_default"')), !0) : l < 2);
    do {
      if (o = this.#f(t, e), a = o.length, h(a)) break;
      let l = -1 / 0;
      for (; c < a; ++c) {
        const { elm: u, rect: m, ch: p } = o[c];
        if (u.tagName === "RT") continue;
        const d = s ? m.y : m.x;
        if (l <= d || u.previousElementSibling?.tagName === "SPAN" && u.previousElementSibling?.innerHTML.includes("<br>") || u.parentElement?.previousElementSibling?.tagName === "SPAN" && u.parentElement?.previousElementSibling?.innerHTML.includes("<br>")) {
          l = d, this.break_fixed || (this.break_fixed_left = m.x, this.break_fixed_top = m.y);
          continue;
        }
        const y = this.#u(o, c), { elm: _, rect: f, ch: v } = o[y];
        if (!this.break_fixed) {
          this.break_fixed_left = f.x, this.break_fixed_top = f.y;
          const N = globalThis.getComputedStyle(_), R = parseFloat(N.fontSize);
          s ? this.break_fixed_top += R : this.break_fixed_left += R;
        }
        l = -1 / 0;
        const P = c, { cont: w, ins: b } = this.bura ? this.hyph_alg_bura(o, y, v, c) : this.hyph_alg(o, y, v, c, p);
        if (c = b, w) continue;
        const x = o[c].elm, O = x.parentElement, I = document.createElement("br");
        if (O.classList.contains("sn_tx")) O.insertBefore(I, x);
        else {
          const N = O.parentElement;
          N.classList.contains("sn_ch") ? N.parentElement.insertBefore(I, N) : N.insertBefore(I, O);
        }
        c += 2, c < P && (c = P), a = -1;
        break;
      }
    } while (a < 0);
    return [o, a];
  }
  // 一つ前の要素を探す（ルビ対応）
  #u(t, e) {
    const s = e - 1, { elm: i } = t[s];
    return i.tagName !== "RT" ? s - (i.style.textCombineUpright === "all" ? Array.from(i.textContent ?? "").length - 1 : 0) : s - Array.from(i.textContent ?? "").length;
  }
  #f(t, e) {
    const s = [];
    if (t.nodeType !== t.TEXT_NODE) return Array.from(t.childNodes).map((a) => this.#f(a, e)).flat();
    const i = t.ownerDocument.createRange();
    i.selectNodeContents(t);
    let r = 0;
    const o = i.endOffset;
    for (; r < o; ) {
      i.setStart(t, r), i.setEnd(t, ++r);
      const a = i.toString();
      s.push({
        ch: a,
        rect: e(i, a),
        elm: i.startContainer.parentElement
      });
    }
    return i.detach(), s;
  }
  /**
   * 抽象化した禁則処理アルゴリズム
   * @method hyph_alg
   * @param {IChRect[]} a - 文章の抽象化配列
   * @param {number} p_i - 処理要素の一つ前の添字
   * @param {string} p_ch - 処理要素の一つ前の文字
   * @param {number} i - 処理要素の添字
   * @param {string} ch - 処理要素の文字
   * @return {Object} result 戻り値
   * @return {boolean} result.cont - true: 呼び元で改行挿入せず continue
   * @return {number} result.ins - 手前に改行を挿入すべき要素の添字
   */
  hyph_alg(t, e, s, i, r) {
    if (!this.#o.test(s)) {
      if (this.#i.test(r))
        for (; (i = this.#u(t, i)) >= 0 && this.#i.test(t[i].ch); )
          ;
      else if (!(s === r && this.#c.test(s))) return { cont: !0, ins: i + 1 };
    }
    for (i = e; (i = this.#u(t, i)) >= 0 && this.#o.test(t[i].ch); )
      ;
    return { cont: !1, ins: i + 1 };
  }
  /**
   * 抽象化した禁則処理アルゴリズム
   * @method hyph_alg
   * @param {IChRect[]} a - 文章の抽象化配列
   * @param {number} p_i - 処理要素の一つ前の添字
   * @param {string} p_ch - 処理要素の一つ前の文字
   * @param {number} i - 処理要素の添字
   * @return {Object} result 戻り値
   * @return {boolean} result.cont - true: 呼び元で改行挿入せず continue
   * @return {number} result.ins - 手前に改行を挿入すべき要素の添字
   */
  hyph_alg_bura(t, e, s, i) {
    const r = this.#u(t, e), { ch: o } = t[r];
    if (this.#g.test(o) || this.#i.test(o)) {
      let c = e;
      (this.#g.test(s) || this.#i.test(s)) && ++c;
      const h = this.#u(t, c), { ch: l } = t[h], { ch: u } = t[c];
      if (l === u && this.#c.test(u)) return { cont: !1, ins: h };
      if (!this.#o.test(l)) return { cont: !1, ins: c };
      c = h;
      do
        if (!this.#o.test(t[c].ch)) break;
      while ((c = this.#u(t, c)) >= 0);
      return { cont: !1, ins: c + 1 };
    }
    const a = this.#u(t, r);
    if (i >= 3) {
      const { ch: c } = t[a];
      if (this.#c.test(o) && c === o)
        return { cont: !1, ins: a };
      if (this.#o.test(c)) {
        let h = a;
        for (; (h = this.#u(t, h)) >= 0 && this.#o.test(t[h].ch); )
          ;
        return { cont: !1, ins: h + 1 };
      }
    }
    return { cont: !1, ins: r };
  }
}
class us {
  constructor(t = "", e = 0, s = { ":hEvt1Time": {}, ":hMp": {}, ":lenIfStk": 1 }) {
    this.fn = t, this.idx = e, this.csArg = s;
  }
  toString = () => `[fn:${this.fn}, idx:${this.idx}, csArg:${this.csArg}]`;
}
class ct {
  static #e = "ヽ";
  static setting(t) {
    t.sesame && (ct.#e = t.sesame);
  }
  static getSesame() {
    return ct.#e;
  }
  static destroy() {
    ct.#e = "ヽ";
  }
  #t = () => {
  };
  init(t) {
    this.#t = t;
  }
  /*
  		★Unicodeで「漢字」の正規表現 – ものかの http://tama-san.com/kanji-regex/
  		2E80..2FDF CJK部首補助＋康熙部首
  		3005 々（漢字の踊り字）
  		3007 〇（漢数字のゼロ）
  		303B 〻（漢字の踊り字）
  		3400..4DBF CJK統合漢字拡張A
  		4E00..9FFF CJK統合漢字
  		F900..FAFF CJK互換漢字
  		20000..2FFFF CJK統合漢字拡張B〜F＋CJK互換漢字追加＋念のためU+2FFFFまで
  
  		[\x{2E80}-\x{2FDF}々〇〻\x{3400}-\x{4DBF}\x{4E00}-\x{9FFF}\x{F900}-\x{FAFF}\x{20000}-\x{2FFFF}]
  		[\u2E80-\u2FDF々〇〻\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\u20000-\u2FFFF]
  		[⺀-⿟々〇〻㐀-䶿一-鿿豈-﫿\u20000-\u2FFFF]		// 含まれない文字がある
  		[⺀-⿟々〇〻㐀-鿿豈-﫿\u20000-\u2FFFF]			// ヽ--30FD が変に引っかかる。多分\u2000-\u2FFF解釈
  		\\u{20000}-\\u{2FFFF}	// 五桁だとエラー
  
  		【2022/10/03】ruby正規表現のUnicode プロパティ(とPOSIX文字クラス) - Qiita https://qiita.com/Takayuki_Nakano/items/8d38beaddb84b488d683
  			> このHiraganaプロパティ、長音記号は含まれていません。
  			> \p{Han}…簡体字や繁体字、韓国語の漢字…ベトナム語の漢字にもマッチ
  		
  		・Unicode文字一覧表 - instant tools https://tools.m-bsys.com/ex/unicode_table.php
  */
  static #s;
  static setEscape(t) {
    ct.#s = new RegExp(
      `${t ? `(?<ce>\\${t}\\S)|` : ""}｜(?<str>[^《\\n]+)《(?<ruby>[^》\\n]+)》|(?:(?<kan>[⺀-⿟々〇〻㐀-鿿豈-﫿]+[ぁ-ヿ]*|[^　｜《》\\n])《(?<kan_ruby>[^》\\n]+)》)|(?<txt>[\uD800-\uDBFF][\uDC00-\uDFFF]|[^｜《》]+?|.)`,
      "gs"
    );
  }
  putTxt(t) {
    for (const { groups: e } of t.matchAll(ct.#s)) {
      const { ruby: s, kan_ruby: i, kan: r = "", ce: o, txt: a = "", str: c = "" } = e;
      if (s) {
        this.putTxtRb(decodeURIComponent(c), s);
        continue;
      }
      if (i) {
        this.putTxtRb(r, i);
        continue;
      }
      if (o) {
        this.#t(o.slice(1), "");
        continue;
      }
      for (const h of Array.from(a)) this.#t(h, "");
    }
  }
  putTxtRb(t, e) {
    if (/^\w+｜{"/.test(e)) {
      this.#t(t, e);
      return;
    }
    const s = Array.from(t), i = s.length;
    if (/^\*.?$/.test(e)) {
      const c = "center｜" + (e === "*" ? ct.#e : e.charAt(1));
      for (let h = 0; h < i; ++h) this.#t(s[h], c);
      return;
    }
    if (i === 1 || !e.includes(" ")) {
      this.#t(t, decodeURIComponent(e));
      return;
    }
    const r = e.split(" "), o = r.length, a = o > i ? o : i;
    for (let c = 0; c < a; ++c) this.#t(
      c < i ? s[c] : "",
      c < o ? decodeURIComponent(r[c]) : ""
    );
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
var Ns;
function z() {
  return Ns;
}
var Fs = function(n, t) {
  return (Fs = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, s) {
    e.__proto__ = s;
  } || function(e, s) {
    for (var i in s) Object.prototype.hasOwnProperty.call(s, i) && (e[i] = s[i]);
  })(n, t);
};
function Q(n, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  function e() {
    this.constructor = n;
  }
  Fs(n, t), n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var Vt = function() {
  return (Vt = Object.assign || function(n) {
    for (var t, e = 1, s = arguments.length; e < s; e++) for (var i in t = arguments[e]) Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i]);
    return n;
  }).apply(this, arguments);
}, Is = ["mp3", "ogg", "oga", "opus", "mpeg", "wav", "m4a", "aiff", "wma", "mid", "caf"], Se = {};
function bi(n) {
  var t = Vt({ m4a: "audio/mp4", oga: "audio/ogg", opus: 'audio/ogg; codecs="opus"', caf: 'audio/x-caf; codecs="opus"' }, n || {}), e = document.createElement("audio"), s = {}, i = /^no$/;
  Is.forEach(function(r) {
    var o = e.canPlayType("audio/".concat(r)).replace(i, ""), a = t[r] ? e.canPlayType(t[r]).replace(i, "") : "";
    s[r] = !!o || !!a;
  }), Object.assign(Se, s);
}
bi();
var wi = /\.(\{([^\}]+)\})(\?.*)?$/;
function js(n) {
  var t = wi, e = typeof n == "string" ? n : n.url;
  if (!t.test(e)) return e;
  for (var s = t.exec(e), i = s[2].split(","), r = i[i.length - 1], o = 0, a = i.length; o < a; o++) {
    var c = i[o];
    if (Se[c]) {
      r = c;
      break;
    }
  }
  var h = e.replace(s[1], r);
  if (typeof n != "string") {
    var l = n;
    l.extension = r, l.url = h;
  }
  return h;
}
var De = Is.filter(function(n) {
  return Se[n];
}), Rs = function() {
  function n() {
  }
  return n.add = function() {
    n.setLegacy(z().useLegacy);
  }, n.setLegacy = function(t) {
    t ? De.forEach(function(e) {
      M.setExtensionXhrType(e, M.XHR_RESPONSE_TYPE.DEFAULT), M.setExtensionLoadType(e, M.LOAD_TYPE.AUDIO);
    }) : De.forEach(function(e) {
      M.setExtensionXhrType(e, M.XHR_RESPONSE_TYPE.BUFFER), M.setExtensionLoadType(e, M.LOAD_TYPE.XHR);
    });
  }, n.pre = function(t, e) {
    js(t), e();
  }, n.use = function(t, e) {
    t.data && De.indexOf(t.extension) > -1 ? t.sound = z().add(t.name, { loaded: e, preload: !0, url: t.url, source: t.data }) : e();
  }, n.extension = "loader", n;
}(), ki = 0, xi = function(n) {
  function t(e) {
    var s = n.call(this) || this;
    return s.id = ki++, s.init(e), s;
  }
  return Q(t, n), t.prototype.set = function(e, s) {
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
    var i = e.volume * (e.muted ? 0 : 1), r = s.volume * (s.muted ? 0 : 1), o = this._volume * (this._muted ? 0 : 1);
    this._source.volume = o * i * r, this._source.playbackRate = this._speed * e.speed * s.speed;
  }, t.prototype.refreshPaused = function() {
    var e = this._media.context, s = this._media.parent, i = this._paused || s.paused || e.paused;
    i !== this._pausedReal && (this._pausedReal = i, i ? (this._internalStop(), this.emit("paused")) : (this.emit("resumed"), this.play({ start: this._source.currentTime, end: this._end, volume: this._volume, speed: this._speed, loop: this._loop })), this.emit("pause", i));
  }, t.prototype.play = function(e) {
    var s = this, i = e.start, r = e.end, o = e.speed, a = e.loop, c = e.volume, h = e.muted;
    this._speed = o, this._volume = c, this._loop = !!a, this._muted = h, this.refresh(), this.loop && r !== null && (this.loop = !1), this._start = i, this._end = r || this._duration, this._start = Math.max(0, this._start - t.PADDING), this._end = Math.min(this._end + t.PADDING, this._duration), this._source.onloadedmetadata = function() {
      s._source && (s._source.currentTime = i, s._source.onloadedmetadata = null, s.emit("progress", i, s._duration), Xt.shared.add(s._onUpdate, s));
    }, this._source.onended = this._onComplete.bind(this), this._source.play(), this.emit("start");
  }, t.prototype._onUpdate = function() {
    this.emit("progress", this.progress, this._duration), this._source.currentTime >= this._end && !this._source.loop && this._onComplete();
  }, t.prototype._onComplete = function() {
    Xt.shared.remove(this._onUpdate, this), this._internalStop(), this.emit("progress", 1, this._duration), this.emit("end", this);
  }, t.prototype.destroy = function() {
    Xt.shared.remove(this._onUpdate, this), this.removeAllListeners();
    var e = this._source;
    e && (e.onended = null, e.onplay = null, e.onpause = null, this._internalStop()), this._source = null, this._speed = 1, this._volume = 1, this._loop = !1, this._end = null, this._start = 0, this._duration = 0, this._playing = !1, this._pausedReal = !1, this._paused = !1, this._muted = !1, this._media && (this._media.context.off("refresh", this.refresh, this), this._media.context.off("refreshPaused", this.refreshPaused, this), this._media = null);
  }, t.prototype.toString = function() {
    return "[HTMLAudioInstance id=".concat(this.id, "]");
  }, t.PADDING = 0.1, t;
}(he), Pi = function(n) {
  function t() {
    return n !== null && n.apply(this, arguments) || this;
  }
  return Q(t, n), t.prototype.init = function(e) {
    this.parent = e, this._source = e.options.source || new Audio(), e.url && (this._source.src = e.url);
  }, t.prototype.create = function() {
    return new xi(this);
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
    var s = this._source, i = this.parent;
    if (s.readyState !== 4) if (i.url) {
      s.src = i.url;
      var r = function() {
        c(), i.isLoaded = !0;
        var l = i.autoPlayStart();
        e && e(null, i, l);
      }, o = function() {
        c(), e && e(new Error("Sound loading has been aborted"));
      }, a = function() {
        c();
        var l = "Failed to load audio element (code: ".concat(s.error.code, ")");
        e && e(new Error(l));
      }, c = function() {
        s.removeEventListener("canplaythrough", r), s.removeEventListener("load", r), s.removeEventListener("abort", o), s.removeEventListener("error", a);
      };
      s.addEventListener("canplaythrough", r, !1), s.addEventListener("load", r, !1), s.addEventListener("abort", o, !1), s.addEventListener("error", a, !1), s.load();
    } else e(new Error("sound.url or sound.source must be set"));
    else {
      i.isLoaded = !0;
      var h = i.autoPlayStart();
      e && setTimeout(function() {
        e(null, i, h);
      }, 0);
    }
  }, t;
}(he), $i = function() {
  function n(t, e) {
    this.parent = t, Object.assign(this, e), this.duration = this.end - this.start;
  }
  return n.prototype.play = function(t) {
    return this.parent.play({ complete: t, speed: this.speed || this.parent.speed, end: this.end, start: this.start, loop: this.loop });
  }, n.prototype.destroy = function() {
    this.parent = null;
  }, n;
}(), et = function() {
  function n() {
  }
  return n.setParamValue = function(t, e) {
    if (t.setValueAtTime) {
      var s = z().context;
      t.setValueAtTime(e, s.audioContext.currentTime);
    } else t.value = e;
    return e;
  }, n;
}(), Ei = 0, Oi = function(n) {
  function t(e) {
    var s = n.call(this) || this;
    return s.id = Ei++, s._media = null, s._paused = !1, s._muted = !1, s._elapsed = 0, s.init(e), s;
  }
  return Q(t, n), t.prototype.set = function(e, s) {
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
    this._filters && ((s = this._filters) === null || s === void 0 || s.filter(function(i) {
      return i;
    }).forEach(function(i) {
      return i.disconnect();
    }), this._filters = null, this._source.connect(this._gain)), this._filters = e?.length ? e.slice(0) : null, this.refresh();
  }, enumerable: !1, configurable: !0 }), t.prototype.refresh = function() {
    if (this._source) {
      var e = this._media.context, s = this._media.parent;
      this._source.loop = this._loop || s.loop;
      var i = e.volume * (e.muted ? 0 : 1), r = s.volume * (s.muted ? 0 : 1), o = this._volume * (this._muted ? 0 : 1);
      et.setParamValue(this._gain.gain, o * r * i), et.setParamValue(this._source.playbackRate, this._speed * s.speed * e.speed), this.applyFilters();
    }
  }, t.prototype.applyFilters = function() {
    var e;
    if (!((e = this._filters) === null || e === void 0) && e.length) {
      this._source.disconnect();
      var s = this._source;
      this._filters.forEach(function(i) {
        s.connect(i.destination), s = i;
      }), s.connect(this._gain);
    }
  }, t.prototype.refreshPaused = function() {
    var e = this._media.context, s = this._media.parent, i = this._paused || s.paused || e.paused;
    i !== this._pausedReal && (this._pausedReal = i, i ? (this._internalStop(), this.emit("paused")) : (this.emit("resumed"), this.play({ start: this._elapsed % this._duration, end: this._end, speed: this._speed, loop: this._loop, volume: this._volume })), this.emit("pause", i));
  }, t.prototype.play = function(e) {
    var s = e.start, i = e.end, r = e.speed, o = e.loop, a = e.volume, c = e.muted, h = e.filters;
    this._paused = !1;
    var l = this._media.nodes.cloneBufferSource(), u = l.source, m = l.gain;
    this._source = u, this._gain = m, this._speed = r, this._volume = a, this._loop = !!o, this._muted = c, this._filters = h, this.refresh();
    var p = this._source.buffer.duration;
    this._duration = p, this._end = i, this._lastUpdate = this._now(), this._elapsed = s, this._source.onended = this._onComplete.bind(this), this._loop ? (this._source.loopEnd = i, this._source.loopStart = s, this._source.start(0, s)) : i ? this._source.start(0, s, i - s) : this._source.start(0, s), this.emit("start"), this._update(!0), this.enableTicker(!0);
  }, t.prototype.enableTicker = function(e) {
    Xt.shared.remove(this._updateListener, this), e && Xt.shared.add(this._updateListener, this);
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
      var s = this._now(), i = s - this._lastUpdate;
      if (i > 0 || e) {
        var r = this._source.playbackRate.value;
        this._elapsed += i * r, this._lastUpdate = s;
        var o = this._duration, a = void 0;
        if (this._source.loopStart) {
          var c = this._source.loopEnd - this._source.loopStart;
          a = (this._source.loopStart + this._elapsed % c) / o;
        } else a = this._elapsed % o / o;
        this._progress = a, this.emit("progress", this._progress, o);
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
}(he), Ls = function() {
  function n(t, e) {
    this._output = e, this._input = t;
  }
  return Object.defineProperty(n.prototype, "destination", { get: function() {
    return this._input;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "filters", { get: function() {
    return this._filters;
  }, set: function(t) {
    var e = this;
    if (this._filters && (this._filters.forEach(function(i) {
      i && i.disconnect();
    }), this._filters = null, this._input.connect(this._output)), t && t.length) {
      this._filters = t.slice(0), this._input.disconnect();
      var s = null;
      t.forEach(function(i) {
        s === null ? e._input.connect(i.destination) : s.connect(i.destination), s = i;
      }), s.connect(this._output);
    }
  }, enumerable: !1, configurable: !0 }), n.prototype.destroy = function() {
    this.filters = null, this._input = null, this._output = null;
  }, n;
}(), Ci = function(n) {
  function t(e) {
    var s = this, i = e.audioContext, r = i.createBufferSource(), o = i.createGain(), a = i.createAnalyser();
    return r.connect(a), a.connect(o), o.connect(e.destination), (s = n.call(this, a, o) || this).context = e, s.bufferSource = r, s.gain = o, s.analyser = a, s;
  }
  return Q(t, n), Object.defineProperty(t.prototype, "script", { get: function() {
    return this._script || (this._script = this.context.audioContext.createScriptProcessor(t.BUFFER_SIZE), this._script.connect(this.context.destination)), this._script;
  }, enumerable: !1, configurable: !0 }), t.prototype.destroy = function() {
    n.prototype.destroy.call(this), this.bufferSource.disconnect(), this._script && this._script.disconnect(), this.gain.disconnect(), this.analyser.disconnect(), this.bufferSource = null, this._script = null, this.gain = null, this.analyser = null, this.context = null;
  }, t.prototype.cloneBufferSource = function() {
    var e = this.bufferSource, s = this.context.audioContext.createBufferSource();
    s.buffer = e.buffer, et.setParamValue(s.playbackRate, e.playbackRate.value), s.loop = e.loop;
    var i = this.context.audioContext.createGain();
    return s.connect(i), i.connect(this.destination), { source: s, gain: i };
  }, Object.defineProperty(t.prototype, "bufferSize", { get: function() {
    return this.script.bufferSize;
  }, enumerable: !1, configurable: !0 }), t.BUFFER_SIZE = 0, t;
}(Ls), Si = function() {
  function n() {
  }
  return n.prototype.init = function(t) {
    this.parent = t, this._nodes = new Ci(this.context), this._source = this._nodes.bufferSource, this.source = t.options.source;
  }, n.prototype.destroy = function() {
    this.parent = null, this._nodes.destroy(), this._nodes = null;
    try {
      this._source.buffer = null;
    } catch {
    }
    this._source = null, this.source = null;
  }, n.prototype.create = function() {
    return new Oi(this);
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
    var e = this, s = new XMLHttpRequest(), i = this.parent.url;
    s.open("GET", i, !0), s.responseType = "arraybuffer", s.onload = function() {
      e.source = s.response, e._decode(s.response, t);
    }, s.send();
  }, n.prototype._decode = function(t, e) {
    var s = this, i = function(r, o) {
      if (r) e && e(r);
      else {
        s.parent.isLoaded = !0, s.buffer = o;
        var a = s.parent.autoPlayStart();
        e && e(null, s.parent, a);
      }
    };
    t instanceof AudioBuffer ? i(null, t) : this.parent.context.decode(t, i);
  }, n;
}(), te = function() {
  function n(t, e) {
    this.media = t, this.options = e, this._instances = [], this._sprites = {}, this.media.init(this);
    var s = e.complete;
    this._autoPlayOptions = s ? { complete: s } : null, this.isLoaded = !1, this.isPlaying = !1, this.autoPlay = e.autoPlay, this.singleInstance = e.singleInstance, this.preload = e.preload || this.autoPlay, this.url = e.url, this.speed = e.speed, this.volume = e.volume, this.loop = e.loop, e.sprites && this.addSprites(e.sprites), this.preload && this._preload(e.loaded);
  }
  return n.from = function(t) {
    var e = {};
    return typeof t == "string" ? e.url = t : t instanceof ArrayBuffer || t instanceof AudioBuffer || t instanceof HTMLAudioElement ? e.source = t : e = t, (e = Vt({ autoPlay: !1, singleInstance: !1, url: null, source: null, preload: !1, volume: 1, speed: 1, complete: null, loaded: null, loop: !1 }, e)).url && (e.url = js(e.url)), Object.freeze(e), new n(z().useLegacy ? new Pi() : new Si(), e);
  }, Object.defineProperty(n.prototype, "context", { get: function() {
    return z().context;
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
      for (var i in t) s[i] = this.addSprites(i, t[i]);
      return s;
    }
    var r = new $i(this, e);
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
    var s, i = this;
    if (typeof t == "string" ? s = { sprite: o = t, loop: this.loop, complete: e } : typeof t == "function" ? (s = {}).complete = t : s = t, (s = Vt({ complete: null, loaded: null, sprite: null, end: null, start: 0, volume: 1, speed: 1, muted: !1, loop: !1 }, s || {})).sprite) {
      var r = s.sprite, o = this._sprites[r];
      s.start = o.start + (s.start || 0), s.end = o.end, s.speed = o.speed || 1, s.loop = o.loop || s.loop, delete s.sprite;
    }
    if (s.offset && (s.start = s.offset), !this.isLoaded) return new Promise(function(c, h) {
      i.autoPlay = !0, i._autoPlayOptions = s, i._preload(function(l, u, m) {
        l ? h(l) : (s.loaded && s.loaded(l, u, m), c(m));
      });
    });
    (this.singleInstance || s.singleInstance) && this._removeInstances();
    var a = this._createInstance();
    return this._instances.push(a), this.isPlaying = !0, a.once("end", function() {
      s.complete && s.complete(i), i._onComplete(a);
    }), a.once("stop", function() {
      i._onComplete(a);
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
}(), Ti = function(n) {
  function t() {
    var e = n !== null && n.apply(this, arguments) || this;
    return e.speed = 1, e.muted = !1, e.volume = 1, e.paused = !1, e;
  }
  return Q(t, n), t.prototype.refresh = function() {
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
}(he), fs = function(n) {
  function t() {
    var e = n.call(this, null, null) || this;
    e.autoPause = !0;
    var s = window, i = new t.AudioContext(), r = i.createDynamicsCompressor(), o = i.createAnalyser();
    return o.connect(r), r.connect(i.destination), e._input = o, e._output = i.destination, e._ctx = i, e._offlineCtx = new t.OfflineAudioContext(1, 2, s.OfflineAudioContext ? Math.max(8e3, Math.min(96e3, i.sampleRate)) : 44100), e.compressor = r, e.analyser = o, e.events = new he(), e.volume = 1, e.speed = 1, e.muted = !1, e.paused = !1, e._locked = i.state === "suspended" && ("ontouchstart" in globalThis || "onclick" in globalThis), e._locked && (e._unlock(), e._unlock = e._unlock.bind(e), document.addEventListener("mousedown", e._unlock, !0), document.addEventListener("touchstart", e._unlock, !0), document.addEventListener("touchend", e._unlock, !0)), e.onFocus = e.onFocus.bind(e), e.onBlur = e.onBlur.bind(e), globalThis.addEventListener("focus", e.onFocus), globalThis.addEventListener("blur", e.onBlur), e;
  }
  return Q(t, n), t.prototype.onFocus = function() {
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
    var i = function(o) {
      s(new Error(o?.message || "Unable to decode file"));
    }, r = this._offlineCtx.decodeAudioData(e, function(o) {
      s(null, o);
    }, i);
    r && r.catch(i);
  }, t;
}(Ls), Ni = function() {
  function n() {
    this.init();
  }
  return n.prototype.init = function() {
    return this.supported && (this._webAudioContext = new fs()), this._htmlAudioContext = new Ti(), this._sounds = {}, this.useLegacy = !this.supported, this;
  }, Object.defineProperty(n.prototype, "context", { get: function() {
    return this._context;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "filtersAll", { get: function() {
    return this.useLegacy ? [] : this._context.filters;
  }, set: function(t) {
    this.useLegacy || (this._context.filters = t);
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(n.prototype, "supported", { get: function() {
    return fs.AudioContext !== null;
  }, enumerable: !1, configurable: !0 }), n.prototype.add = function(t, e) {
    if (typeof t == "object") {
      var s = {};
      for (var i in t) {
        var r = this._getOptions(t[i], e);
        s[i] = this.add(i, r);
      }
      return s;
    }
    if (e instanceof te) return this._sounds[t] = e, e;
    var o = this._getOptions(e), a = te.from(o);
    return this._sounds[t] = a, a;
  }, n.prototype._getOptions = function(t, e) {
    var s;
    return s = typeof t == "string" ? { url: t } : t instanceof ArrayBuffer || t instanceof AudioBuffer || t instanceof HTMLAudioElement ? { source: t } : t, s = Vt(Vt({}, s), e || {});
  }, Object.defineProperty(n.prototype, "useLegacy", { get: function() {
    return this._useLegacy;
  }, set: function(t) {
    Rs.setLegacy(t), this._useLegacy = t, this._context = !t && this.supported ? this._webAudioContext : this._htmlAudioContext;
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
}(), Ft = function() {
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
}(), Jt = { __proto__: null, EqualizerFilter: function(n) {
  function t(e, s, i, r, o, a, c, h, l, u) {
    e === void 0 && (e = 0), s === void 0 && (s = 0), i === void 0 && (i = 0), r === void 0 && (r = 0), o === void 0 && (o = 0), a === void 0 && (a = 0), c === void 0 && (c = 0), h === void 0 && (h = 0), l === void 0 && (l = 0), u === void 0 && (u = 0);
    var m = this;
    if (!z().useLegacy) {
      var p = [{ f: t.F32, type: "lowshelf", gain: e }, { f: t.F64, type: "peaking", gain: s }, { f: t.F125, type: "peaking", gain: i }, { f: t.F250, type: "peaking", gain: r }, { f: t.F500, type: "peaking", gain: o }, { f: t.F1K, type: "peaking", gain: a }, { f: t.F2K, type: "peaking", gain: c }, { f: t.F4K, type: "peaking", gain: h }, { f: t.F8K, type: "peaking", gain: l }, { f: t.F16K, type: "highshelf", gain: u }].map(function(_) {
        var f = z().context.audioContext.createBiquadFilter();
        return f.type = _.type, et.setParamValue(f.Q, 1), f.frequency.value = _.f, et.setParamValue(f.gain, _.gain), f;
      });
      (m = n.call(this, p[0], p[p.length - 1]) || this).bands = p, m.bandsMap = {};
      for (var d = 0; d < m.bands.length; d++) {
        var y = m.bands[d];
        d > 0 && m.bands[d - 1].connect(y), m.bandsMap[y.frequency.value] = y;
      }
      return m;
    }
    m = n.call(this, null) || this;
  }
  return Q(t, n), t.prototype.setGain = function(e, s) {
    if (s === void 0 && (s = 0), !this.bandsMap[e]) throw new Error("No band found for frequency ".concat(e));
    et.setParamValue(this.bandsMap[e].gain, s);
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
      et.setParamValue(e.gain, 0);
    });
  }, t.prototype.destroy = function() {
    this.bands.forEach(function(e) {
      e.disconnect();
    }), this.bands = null, this.bandsMap = null;
  }, t.F32 = 32, t.F64 = 64, t.F125 = 125, t.F250 = 250, t.F500 = 500, t.F1K = 1e3, t.F2K = 2e3, t.F4K = 4e3, t.F8K = 8e3, t.F16K = 16e3, t;
}(Ft), DistortionFilter: function(n) {
  function t(e) {
    e === void 0 && (e = 0);
    var s = this;
    if (!z().useLegacy) {
      var i = z().context.audioContext.createWaveShaper();
      return (s = n.call(this, i) || this)._distortion = i, s.amount = e, s;
    }
    s = n.call(this, null) || this;
  }
  return Q(t, n), Object.defineProperty(t.prototype, "amount", { get: function() {
    return this._amount;
  }, set: function(e) {
    this._amount = e;
    for (var s, i = 1e3 * e, r = 44100, o = new Float32Array(r), a = Math.PI / 180, c = 0; c < r; ++c) s = 2 * c / r - 1, o[c] = (3 + i) * s * 20 * a / (Math.PI + i * Math.abs(s));
    this._distortion.curve = o, this._distortion.oversample = "4x";
  }, enumerable: !1, configurable: !0 }), t.prototype.destroy = function() {
    this._distortion = null, n.prototype.destroy.call(this);
  }, t;
}(Ft), StereoFilter: function(n) {
  function t(e) {
    e === void 0 && (e = 0);
    var s = this;
    if (!z().useLegacy) {
      var i, r, o, a = z().context.audioContext;
      return a.createStereoPanner ? o = i = a.createStereoPanner() : ((r = a.createPanner()).panningModel = "equalpower", o = r), (s = n.call(this, o) || this)._stereo = i, s._panner = r, s.pan = e, s;
    }
    s = n.call(this, null) || this;
  }
  return Q(t, n), Object.defineProperty(t.prototype, "pan", { get: function() {
    return this._pan;
  }, set: function(e) {
    this._pan = e, this._stereo ? et.setParamValue(this._stereo.pan, e) : this._panner.setPosition(e, 0, 1 - Math.abs(e));
  }, enumerable: !1, configurable: !0 }), t.prototype.destroy = function() {
    n.prototype.destroy.call(this), this._stereo = null, this._panner = null;
  }, t;
}(Ft), ReverbFilter: function(n) {
  function t(e, s, i) {
    e === void 0 && (e = 3), s === void 0 && (s = 2), i === void 0 && (i = !1);
    var r = this;
    if (!z().useLegacy) return (r = n.call(this, null) || this)._seconds = r._clamp(e, 1, 50), r._decay = r._clamp(s, 0, 100), r._reverse = i, r._rebuild(), r;
    r = n.call(this, null) || this;
  }
  return Q(t, n), t.prototype._clamp = function(e, s, i) {
    return Math.min(i, Math.max(s, e));
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
    for (var e, s = z().context.audioContext, i = s.sampleRate, r = i * this._seconds, o = s.createBuffer(2, r, i), a = o.getChannelData(0), c = o.getChannelData(1), h = 0; h < r; h++) e = this._reverse ? r - h : h, a[h] = (2 * Math.random() - 1) * Math.pow(1 - e / r, this._decay), c[h] = (2 * Math.random() - 1) * Math.pow(1 - e / r, this._decay);
    var l = z().context.audioContext.createConvolver();
    l.buffer = o, this.init(l);
  }, t;
}(Ft), MonoFilter: function(n) {
  function t() {
    var e = this;
    if (!z().useLegacy) {
      var s = z().context.audioContext, i = s.createChannelSplitter(), r = s.createChannelMerger();
      return r.connect(i), (e = n.call(this, r, i) || this)._merger = r, e;
    }
    e = n.call(this, null) || this;
  }
  return Q(t, n), t.prototype.destroy = function() {
    this._merger.disconnect(), this._merger = null, n.prototype.destroy.call(this);
  }, t;
}(Ft), StreamFilter: function(n) {
  function t() {
    var e = this;
    if (!z().useLegacy) {
      var s = z().context.audioContext, i = s.createMediaStreamDestination(), r = s.createMediaStreamSource(i.stream);
      return (e = n.call(this, i, r) || this)._stream = i.stream, e;
    }
    e = n.call(this, null) || this;
  }
  return Q(t, n), Object.defineProperty(t.prototype, "stream", { get: function() {
    return this._stream;
  }, enumerable: !1, configurable: !0 }), t.prototype.destroy = function() {
    this._stream = null, n.prototype.destroy.call(this);
  }, t;
}(Ft), TelephoneFilter: function(n) {
  function t() {
    if (!z().useLegacy) {
      var e = z().context.audioContext, s = e.createBiquadFilter(), i = e.createBiquadFilter(), r = e.createBiquadFilter(), o = e.createBiquadFilter();
      return s.type = "lowpass", et.setParamValue(s.frequency, 2e3), i.type = "lowpass", et.setParamValue(i.frequency, 2e3), r.type = "highpass", et.setParamValue(r.frequency, 500), o.type = "highpass", et.setParamValue(o.frequency, 500), s.connect(i), i.connect(r), r.connect(o), n.call(this, s, o) || this;
    }
    n.call(this, null);
  }
  return Q(t, n), t;
}(Ft) }, qn = { __proto__: null, supported: Se }, ds = function(n) {
  return Ns = n, n;
}(new Ni());
ti.add(Rs);
class Pt {
  constructor(t, e, s, i, r, o, a, c) {
    this.fn = t, this.buf = e, this.start_ms = s, this.end_ms = i, this.ret_ms = r, this.volume = o, this.pan = a, this.snd = c, this.stt = c ? new oe(this) : new Fi(), this.#t = g.procID, c && this.addSnd(c);
  }
  static #e = 1;
  stt;
  loop = !1;
  #t;
  get procID() {
    return this.#t;
  }
  addSnd(t) {
    switch (this.loop = t.loop, this.stt.onLoad(this), this.pan !== 0 && (t.filters = [new Jt.StereoFilter(this.pan)]), this.setVol = (e) => t.volume = e, this.tw = () => new re(t), this.onPlayEnd = () => {
      this.stt.onPlayEnd(this.buf), this.#s();
    }, this.stop = () => {
      t.stop(), this.#s();
    }, this.destroy = () => t.destroy(), this.buf) {
      // セリフ再生中はBGM音量を絞る
      case ys:
        const e = Number(D.getVal("sys:sn.sound.BGM.vol_mul_talking") ?? 1);
        if (e === 1) break;
        Pt.#e = e;
        const s = Me[xe];
        s && s.setVol(this.volume * Pt.#e);
        break;
      case xe:
        t.volume = this.volume * Pt.#e;
        break;
    }
  }
  #s = () => {
    if (this.#s = () => {
    }, Pt.#e === 1 || this.buf !== ys) return;
    Pt.#e = 1;
    const t = Me[xe];
    t && t.setVol(this.volume * Pt.#e);
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
let ps, D, xt, ms, Me, $e;
const xe = "BGM", ee = "SE", ys = "VOICE";
class V {
  constructor(t, e, s) {
    this.hArg = t, this.buf = e, this.fn = s;
    const i = E(t, "start_ms", 0), r = E(t, "end_ms", V.#t), o = E(t, "ret_ms", 0), a = E(t, "pan", 0), c = E(t, "speed", 1);
    if (i < 0) throw `[playse] start_ms:${i} が負の値です`;
    if (o < 0) throw `[playse] ret_ms:${o} が負の値です`;
    if (0 < r) {
      if (r <= i) throw `[playse] start_ms:${i} >= end_ms:${r} は異常値です`;
      if (r <= o) throw `[playse] ret_ms:${o} >= end_ms:${r} は異常値です`;
    }
    const h = "const.sn.sound." + e + ".";
    D.setVal_Nochk("save", h + "fn", s);
    const l = V.getVol(t, 1);
    D.setVal_Nochk("save", h + "volume", l);
    const u = l * Number(D.getVal("sys:" + h + "volume", 1)), m = C(t, "loop", !1);
    m ? (V.#e[e] = s, D.setVal_Nochk("save", "const.sn.loopPlaying", JSON.stringify(V.#e))) : V.delLoopPlay(e), D.setVal_Nochk("save", h + "start_ms", i), D.setVal_Nochk("save", h + "end_ms", r), D.setVal_Nochk("save", h + "ret_ms", o), D.setVal_Nochk("tmp", h + "playing", !0), D.flush();
    const p = ds.find(s);
    this.#s = new Pt(
      s,
      e,
      i,
      r,
      o,
      u,
      a,
      p
    );
    const d = {
      loop: m,
      speed: c,
      volume: u,
      loaded: (f, v) => {
        if (!this.#s.stt.isDestroy) {
          if (f) {
            xt.errScript(`ロード失敗です SndBuf fn:${s} ${f}`, !1);
            return;
          }
          v && (this.#s.addSnd(v), a !== 0 && (v.filters = [new Jt.StereoFilter(a)]), t.fnc?.());
        }
      }
    };
    let y = "";
    if (0 < i || r < V.#t) {
      y = `${s};${i};${r};${o}`;
      const f = (d.sprites ??= {})[y] = {
        start: i / 1e3,
        end: r / 1e3
      };
      d.preload = !0;
      const v = d.loaded;
      d.loaded = (P, w) => {
        if (this.#s.stt.isDestroy) return;
        v(P, w);
        const b = w, x = b.duration;
        f.end < 0 && (f.end += x, b.removeSprites(y), b.addSprites(y, f)), f.end <= f.start && xt.errScript(`[playse] end_ms:${r}(${f.end * 1e3}) >= start_ms:${i} は異常値です`), f.end * 1e3 <= o && xt.errScript(`[playse] end_ms:${r}(${f.end * 1e3}) <= ret_ms:${o} は異常値です`), x <= f.start && xt.errScript(`[playse] 音声ファイル再生時間:${x * 1e3} <= start_ms:${i} は異常値です`), r !== V.#t && x <= f.end && xt.errScript(`[playse] 音声ファイル再生時間:${x * 1e3} <= end_ms:${r} は異常値です`), b.play(y, (O) => d.complete?.(O));
      };
    } else d.autoPlay = !0;
    if (m ? o !== 0 && (d.loop = !1, d.complete = async (f) => {
      const v = f.duration, P = o / 1e3, w = r / 1e3;
      v <= P && xt.errScript(`[playse] 音声ファイル再生時間:${v * 1e3} <=  ret_ms:${o} は異常値です`), await f.play({
        // 一周目はループなし、なのでキャッシュされてる
        ...d,
        start: P,
        end: w < 0 ? w + v : w,
        // 負の値は末尾から
        //	speed,		// 重複
        loop: !0,
        //	volume,		// 重複
        //-	muted?: boolean;
        filters: a !== 0 ? [new Jt.StereoFilter(a)] : []
        //-	complete?: CompleteCallback;
        //-	loaded?: LoadedCallback;
        //-	singleInstance?: boolean;
      });
    }) : d.complete = () => {
      We(this.#s, e), this.#s.onPlayEnd();
    }, this.#n(), p) {
      if (p.volume = u, y)
        this.#i(s, d), a !== 0 && (p.filters = [new Jt.StereoFilter(a)]);
      else if (p.isPlayable) {
        const f = p.options.source;
        !(f instanceof ArrayBuffer) || f.byteLength === 0 ? (p.play(d), a !== 0 && (p.filters = [new Jt.StereoFilter(a)])) : this.#s.addSnd(te.from({
          ...d,
          url: p.options.url,
          source: f
        }));
      }
      this.needLoad = !1;
      return;
    }
    if (this.needLoad = C(t, "join", !0)) {
      const f = this.#s.procID + `loaded buf:${e} fn:${s}`;
      g.beginProc(f);
      const v = d.loaded;
      d.loaded = (P, w) => {
        v(P, w), g.endProc(f);
      };
    }
    this.#i(s, d);
  }
  static #e = {};
  static init(t, e, s, i, r) {
    V.#e = {}, ps = t, D = e, xt = s, ms = i, Me = r;
  }
  static setEvtMng(t) {
    $e = t;
  }
  static delLoopPlay(t) {
    delete V.#e[t];
    const e = "const.sn.sound." + t + ".";
    D.setVal_Nochk("save", e + "fn", ""), D.setVal_Nochk("save", "const.sn.loopPlaying", JSON.stringify(V.#e)), D.flush();
  }
  static getVol(t, e) {
    const s = E(t, "volume", e);
    return s < 0 ? 0 : s > 1 ? 1 : s;
  }
  static xchgbuf({ buf: t = ee, buf2: e = ee }) {
    if (t === e) throw `[xchgbuf] buf:${t} が同じ値です`;
    const s = "const.sn.sound." + t + ".", i = Number(D.getVal("save:" + s + "volume")), r = String(D.getVal("save:" + s + "fn")), o = "const.sn.sound." + e + ".", a = Number(D.getVal("save:" + o + "volume")), c = String(D.getVal("save:" + o + "fn"));
    D.setVal_Nochk("save", s + "volume", a), D.setVal_Nochk("save", o + "volume", i), D.setVal_Nochk("save", s + "fn", c), D.setVal_Nochk("save", o + "fn", r), t in V.#e != e in V.#e && (t in V.#e ? (delete V.#e[t], V.#e[e] = r) : (delete V.#e[e], V.#e[t] = c), D.setVal_Nochk("save", "const.sn.loopPlaying", JSON.stringify(V.#e))), D.flush();
  }
  static #t = 999e3;
  #s;
  needLoad;
  #n = () => {
    ds.volumeAll = Number(D.getVal("sys:sn.sound.global_volume", 1)), this.#n = () => {
    };
  };
  #i(t, e) {
    const s = ps.searchPath(t, A.SOUND);
    if (!s.endsWith(".bin")) {
      e.url = s, te.from(e);
      return;
    }
    new Et().add({ name: t, url: s, xhrType: M.XHR_RESPONSE_TYPE.BUFFER }).use(async (i, r) => {
      try {
        i.data = await ms.decAB(i.data);
      } catch (o) {
        xt.errScript(`Sound ロード失敗ですc fn:${i.name} ${o}`, !1);
      }
      r();
    }).load((i, r) => {
      e.source = r[t]?.data, te.from(e);
    });
  }
  setVol(t) {
    this.#s.setVol(t);
  }
  ws = (t) => this.#s.stt.ws(this.#s, t);
  stopse({ buf: t = ee }) {
    We(this.#s, t), this.#s.stt.stopse(this.#s);
  }
  fade = (t) => this.#s.stt.fade(this.#s, t);
  wf = (t) => this.#s.stt.wf(this.#s, t);
  stopfadese = (t) => this.#s.stt.stopfadese(this.#s, t);
}
function We({ loop: n }, t) {
  if (n) {
    V.delLoopPlay(t);
    return;
  }
  const e = "const.sn.sound." + t + ".";
  D.setVal_Nochk("tmp", e + "playing", !1), D.flush();
}
class Fi {
  onLoad(t) {
    t.stt = new oe(t);
  }
  stopse(t) {
    t.stt = new Rt(t, !1);
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
class oe {
  constructor(t) {
    this.si = t;
  }
  onLoad() {
  }
  // ok
  stopse(t) {
    t.stt = new Rt(t);
  }
  ws(t, e) {
    if (t.loop) return !1;
    t.stt = new Ii(t);
    const s = C(e, "canskip", !1), i = C(e, "stop", !0);
    if (s && $e.isSkipping)
      return i ? t.stt.stopse(t) : t.stt.onPlayEnd = () => {
      }, !1;
    const { buf: r = ee } = e, o = () => {
      We(t, r), t.onPlayEnd(), i ? t.stt.stopse(t) : t.stt.onPlayEnd = () => {
      };
    };
    return g.beginProc(t.procID + "ws", o, !0, s ? o : void 0), !0;
  }
  onPlayEnd() {
  }
  // ok
  fade(t, e) {
    const { buf: s = ee } = e, r = "const.sn.sound." + s + "." + "volume", o = V.getVol(e, NaN);
    D.setVal_Nochk("save", r, o);
    const a = o * Number(D.getVal("sys:" + r, 1)), c = C(e, "stop", o === 0);
    c && V.delLoopPlay(s), D.flush();
    const h = E(e, "time", NaN), l = E(e, "delay", 0);
    if (h === 0 && l === 0 || $e.isSkipping) {
      t.setVol(a), t.stt = c ? new Rt(t) : new oe(t);
      return;
    }
    const u = t.tw();
    u && (B.setTwProp(u, e).to({ volume: a }, h).onComplete(() => {
      Ss(u), t.stt.compFade(s), t.stt = c ? new Rt(t) : new oe(t);
    }).start(), t.stt = new ji(u, t));
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
class Ii {
  constructor(t) {
    this.si = t;
  }
  onLoad() {
  }
  // ok
  stopse(t) {
    t.stt = new Rt(t);
  }
  ws = () => !1;
  // ok
  onPlayEnd() {
    g.notifyEndProc(this.si.procID + "ws");
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
class ji {
  constructor(t, e) {
    this.tw = t, this.si = e;
  }
  onLoad() {
  }
  // ok
  stopse(t) {
    this.stopfadese(), t.stt = new Rt(t);
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
    t.stt = new Ri(t);
    const s = C(e, "canskip", !1);
    if (s && $e.isSkipping)
      return this.stopfadese(), !1;
    const i = () => this.stopfadese();
    return g.beginProc(t.procID + "wf", i, !0, s ? i : void 0), !0;
  }
  compFade() {
  }
  // ok
  stopfadese = () => this.si.stop();
  isDestroy = !1;
}
class Ri {
  constructor(t) {
    this.si = t;
  }
  onLoad() {
  }
  // ok
  stopse(t) {
    this.stopfadese(), t.stt = new Rt(t);
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
    g.notifyEndProc(this.si.procID + "wf");
  }
  stopfadese = () => this.si.stop();
  isDestroy = !1;
}
class Rt {
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
const Ee = "compChIn";
class X {
  //MARK: コンストラクタ
  constructor(t, e, s, i, r, o, a) {
    this.cfg = t, this.hTag = e, this.main = s, this.val = i, this.prpPrs = r, this.sndMng = o, this.sys = a, e.let_ml = (h) => this.#B(h), e.endlet_ml = () => !1, e.dump_stack = () => this.#T(), e.dump_script = (h) => this.#J(h), e.else = // その他ifブロック開始
    e.elsif = // 別条件のifブロック開始
    e.endif = () => this.#Q(), e.if = (h) => this.#A(h), e.call = (h) => this.#G(h), e.jump = (h) => this.#L(h), e.pop_stack = (h) => this.#F(h), e.return = (h) => this.#x(h), e.bracket2macro = (h) => this.#dt(h), e.char2macro = (h) => this.#pt(h), e.endmacro = (h) => this.#x(h), e.macro = (h) => this.#_t(h), e.load = (h) => this.#bt(h), e.reload_script = (h) => this.#wt(h), e.record_place = () => this.#gt(), e.save = (h) => this.#kt(h), t.oCfg.debug.token && (this.#U = (h) => {
      h.trim() !== "" && console.log(`🌱 トークン ${this.#t}:${this.#n} (i:${this.#s} cs:${this.#i.length}) %c【${h}】`, "background-color:#350;");
    }), t.oCfg.debug.tag && (this.#M = (h) => console.log(`🌲 タグ解析 ${this.#t}:${this.#n} (i:${this.#s} cs:${this.#i.length}) %c[${h} %o]`, "background-color:#30B;", this.#c.hPrm)), i.defTmp("const.sn.aIfStk.length", () => this.#k.length), i.defTmp("const.sn.vctCallStk.length", () => this.#i.length), this.#o = new ei(t);
    const c = t.oCfg.init.escape;
    if (this.#o.setEscape(c), ct.setEscape(c), S.isDbg) {
      a.addHook((l, u) => this.#h[l]?.(u)), this.isBreak = this.#a;
      const h = this.analyzeInit;
      this.analyzeInit = () => {
        this.analyzeInit = () => {
        }, this.sys.send2Dbg("hi", {});
      }, this.#h.auth = (l) => {
        const u = l.hBreakpoint.hFn2hLineBP;
        for (const [m, p] of Object.entries(u)) this.#g(m, p);
        X.#v = {};
        for (const m of l.hBreakpoint.aFunc)
          X.#v[m.name] = 1;
        if (l.stopOnEntry) {
          for (; ; ) {
            let m = this.nextToken();
            if (!m) break;
            const p = m.charCodeAt(0);
            if (p === 91 || p === 38 || p === 42 && m.length === 1) break;
            p === 10 && (this.#n += m.length);
          }
          this.sys.callHook("stopOnEntry", {}), this.analyzeInit = h, this.analyzeInit();
        } else
          this.noticeWait = () => {
            this.noticeWait = () => {
            }, this.sys.callHook("stopOnEntry", {});
          }, this.analyzeInit = h, this.analyzeInit();
      };
    } else this.recodeDesign = () => {
    };
  }
  #e = { aToken: [""], len: 1, aLNum: [1] };
  #t = "";
  get scriptFn() {
    return this.#t;
  }
  #s = 0;
  get idxToken() {
    return this.#s;
  }
  subIdxToken() {
    --this.#s;
  }
  #n = 0;
  get lineNum() {
    return this.#n;
  }
  addLineNum = (t) => this.#n += t;
  jumpJustBefore() {
    this.#C(this.#t, "", --this.#s);
  }
  // 直前にジャンプ
  #i = [];
  // FILOバッファ（push/pop）
  #o;
  #c = new si();
  noticeWait = () => {
  };
  #g(t, e) {
    X.#S[this.#u(t)] = e;
  }
  destroy() {
    this.isBreak = this.#gt = () => !1;
  }
  #h = {
    //auth: // constructorで
    //launch:	// ここでは冒頭停止に間に合わないのでanalyzeInit()で
    disconnect: () => {
      X.#S = {}, X.#v = {}, this.isBreak = () => !1, this.#h.continue({}), this.#y = 0;
    },
    restart: () => this.isBreak = () => !1,
    // ブレークポイント登録
    add_break: (t) => this.#g(t.fn, t.o),
    data_break: (t) => {
      this.#y === 0 && (this.#y = 1, this.main.setLoop(!1, `変数 ${t.dataId}【${t.old_v}】→【${t.new_v}】データブレーク`), this.sys.callHook("stopOnDataBreakpoint", {}), this.sys.send2Dbg("stopOnDataBreakpoint", {}));
    },
    set_func_break: (t) => {
      X.#v = {};
      for (const e of t.a) X.#v[e.name] = 1;
      this.sys.send2Dbg(t.ri, {});
    },
    // 情報問い合わせ系
    stack: (t) => this.sys.send2Dbg(t.ri, { a: this.#$() }),
    eval: (t) => {
      this.sys.send2Dbg(t.ri, { v: this.prpPrs.parse(t.txt) });
    },
    // デバッガからの操作系
    continue: () => {
      this.#l() || (this.#s -= this.#b, this.#y = 3, this.main.setLoop(!0), this.main.resume());
    },
    stepover: (t) => this.#f(t),
    stepin: () => {
      if (this.#l()) return;
      const t = this.#e.aToken[this.#s - this.#b];
      this.sys.callHook(`stopOnStep${this.#yt.test(t ?? "") ? "In" : ""}`, {}), this.#s -= this.#b, this.#y = this.#y === 1 ? 4 : 5, this.main.setLoop(!0), this.main.resume();
    },
    stepout: (t) => {
      this.#l() || (this.#i.length > 0 ? this.#p(!0) : this.#f(t));
    },
    pause: () => {
      this.#y = 4, this.main.setLoop(!1, "一時停止"), this.sys.send2Dbg("stopOnStep", {});
    },
    stopOnEntry: () => {
      this.#y = 4, this.main.setLoop(!1, "一時停止"), this.sys.send2Dbg("stopOnEntry", {});
    }
  };
  #r = (t) => this.cfg.searchPath(t, A.SCRIPT);
  static #d = /(.+)\/crypto_prj\/([^\/]+)\/[^\.]+(\.\w+)/;
  // https://regex101.com/r/Km54EK/1 141 steps (~0ms)
  #u = (t) => (this.sys.pathBaseCnvSnPath4Dbg + this.#r(t)).replace(X.#d, `$1/prj/$2/${this.#t}$3`);
  cnvPath4Dbg = (t) => this.sys.pathBaseCnvSnPath4Dbg + t.replace("/crypto_prj/", "/prj/");
  #f(t) {
    if (this.#l()) return;
    const e = this.#e.aToken[this.#s - this.#b];
    this.#yt.test(e ?? "") ? this.#p(!1) : (this.sys.callHook("stopOnStep", {}), this.#h.stepin(t));
  }
  #p(t) {
    this.sys.callHook(`stopOnStep${t ? "Out" : ""}`, {}), this.#m = this.#i.length - (t ? 1 : 0), this.#s -= this.#b, this.#y = t ? 7 : 6, this.main.setLoop(!0), this.main.resume();
  }
  #m = 0;
  get #b() {
    return this.#y === 2 || this.#y === 4 ? 1 : 0;
  }
  #l() {
    return this.#s < this.#e.len ? !1 : (this.sys.callHook("stopOnEntry", {}), this.main.setLoop(!1, "スクリプト終端です isIdxOverLast"), !0);
  }
  // reload 再生成 Main に受け渡すため static
  static #S = {};
  static #v = {};
  #y = 0;
  // https://raw.githubusercontent.com/famibee/SKYNovel-vscode-extension/master/src/doc/BreakStateSMD.pu
  isBreak = (t) => !1;
  #a(t) {
    switch (this.#y) {
      case 6:
        this.#E(), this.#y = 7;
        break;
      case 7:
        if (this.#i.length !== this.#m) break;
        return this.#y = 4, this.main.setLoop(!1, "ステップ実行"), this.sys.send2Dbg("stopOnStep", {}), !0;
      // タグを実行せず、直前停止
      case 5:
        this.#E(), this.#y = 4;
        break;
      case 4:
        return this.#E(), this.main.setLoop(!1, "ステップ実行"), this.sys.send2Dbg("stopOnStep", {}), !0;
      // タグを実行せず、直前停止
      case 3:
        this.#E(), this.#y = 0;
        break;
      default:
        if (Re(t) in X.#v)
          return this.#y = 2, this.main.setLoop(!1, `関数 ${t} ブレーク`), this.sys.callHook("stopOnBreakpoint", {}), this.sys.send2Dbg("stopOnBreakpoint", {}), !0;
        {
          const e = X.#S[this.#u(this.#t)];
          if (!e) break;
          const s = e[this.#n];
          if (!s) break;
          if (s.condition) {
            if (!this.prpPrs.parse(s.condition)) break;
          } else if ("hitCondition" in s && --s.hitCondition > 0) break;
          const i = this.#y === 0;
          this.#y = 2, this.main.setLoop(!1, i ? (s.condition ? "条件" : "ヒットカウント") + "ブレーク" : "ステップ実行");
          const r = i ? "stopOnBreakpoint" : "stopOnStep";
          this.sys.callHook(r, {}), this.sys.send2Dbg(r, {});
        }
        return !0;
    }
    return !1;
  }
  #E() {
    const t = X.#S[ge(this.#t)]?.[this.#n];
    t?.hitCondition && --t.hitCondition;
  }
  #$() {
    const t = this.#y === 3 ? 1 : 0, e = this.#e.aToken[this.#s - 1 + t], s = this.#u(this.#t), i = Re(e), r = i ? `[${i}]` : e, o = this.val.getVal("mp:const.sn.macro") ?? "{}";
    if (this.#s === 0) return [{ fn: s, ln: 1, col: 1, nm: r, ma: o }];
    const a = this.#_(this.#e, this.#s), c = [{ fn: s, ln: a.ln, col: a.col_s + 1, nm: r, ma: o }], h = this.#i.length;
    if (h === 0) return c;
    for (let l = h - 1; l >= 0; --l) {
      const u = this.#i[l], m = this.#j[u.fn];
      if (!m) continue;
      const p = m.aToken[u.idx - 1];
      if (!p) continue;
      const d = this.#_(m, u.idx), y = Re(p);
      c.push({
        fn: this.#u(u.fn),
        ln: d.ln,
        col: d.col_s + 1,
        nm: y ? `[${y}]` : p,
        ma: u.csArg[":hMp"]["const.sn.macro"] ?? "{}"
      });
    }
    return c;
  }
  // result = true : waitする  resume()で再開
  #M = (t) => {
  };
  //MARK: タグ解析
  async タグ解析(t, e) {
    const s = this.hTag[t];
    if (!s) throw `未定義のタグ【${t}】です`;
    this.#c.parse(e), this.#M(t);
    const i = this.#c.hPrm;
    if (i.cond) {
      const h = i.cond.val;
      if (!h || h.startsWith("&")) throw "属性condは「&」が不要です";
      const l = this.prpPrs.parse(h), u = String(l);
      if (u === "null" || u === "undefined" || !l) return !1;
    }
    let r = {};
    const o = this.#i.length, a = o === 0 ? {} : this.#i[o - 1].csArg;
    if (this.#c.isKomeParam) {
      if (o === 0) throw "属性「*」はマクロのみ有効です";
      r = { ...a };
    }
    r[":タグ名"] = t;
    for (const [h, { val: l, def: u }] of Object.entries(i)) {
      let m = l;
      if (m?.startsWith("%")) {
        if (o === 0) throw "属性「%」はマクロ定義内でのみ使用できます（そのマクロの引数を示す簡略文法であるため）";
        const p = a[m.slice(1)];
        if (p) {
          r[h] = p;
          continue;
        }
        if (u === void 0 || u === "null") continue;
        m = u;
      }
      if (m = this.prpPrs.getValAmpersand(m ?? ""), m !== "undefined") {
        r[h] = m;
        continue;
      }
      u !== void 0 && (m = this.prpPrs.getValAmpersand(u), m !== "undefined" && (r[h] = m));
    }
    if (g.needGoTxt && this.#W.has(t)) {
      const { promise: h, resolve: l } = Promise.withResolvers();
      g.beginProc(Ee, l, !1), g.goTxt(), this.val.saveKidoku(), await h;
    }
    const c = this.#N[t];
    return c && C(r, "canskip", this.#q[t] ?? !0) && this.#D.isSkipping ? c(i) : s(r);
  }
  // 文字出現演出を待つタグ
  //	ここで列挙せずタグ処理で文字表示を始めたい場合、goTxt()すること
  #W = /* @__PURE__ */ new Set([
    // 変数操作
    // 'clearsysvar',	// システム変数の全消去
    // 'clearvar',		// ゲーム変数の全消去 
    // 'let_abs',		// 絶対値
    // 'let_char_at',	// 文字列から一字取りだし
    // 'let_index_of',	// 文字列で検索
    // 'let_length',	// 文字列の長さ
    // 'let_ml',		// インラインテキスト代入
    // 'let_replace',	// 正規表現で置換
    // 'let_round',		// 四捨五入
    // 'let_search',	// 正規表現で検索
    // 'let_substr',	// 文字列から抜きだし
    // 'let',			// 変数代入・演算
    // レイヤ共通
    // 'add_lay',		// レイヤを追加する
    // 'clear_lay',	// レイヤ設定の消去
    // 'finish_trans',	// トランス強制終了
    // 'lay',	// レイヤ設定
    "trans",
    // ページ裏表を交換
    "wt",
    // トランス終了待ち
    // 'add_filter',	// フィルター追加
    // 'clear_filter',	// フィルター全削除
    // 'enable_filter',// フィルター個別切替
    // トゥイーンアニメ
    // 'pause_tsy',	// 一時停止
    // 'resume_tsy',	// 一時停止再開
    // 'stop_tsy',	// トゥイーン中断
    // 'tsy',		// トゥイーン開始
    "wait_tsy",
    // トゥイーン終了待ち
    // 文字・文字レイヤ
    // 'autowc',	// 文字ごとのウェイト
    // 'ch',		// 文字を追加する
    // 'ch_in_style',	// 文字出現演出定義
    // 'ch_out_style',	// 文字消去演出定義
    // 'clear_text',	// 文字消去
    // 'current',	// デフォルト文字レイヤ設定
    // 'endlet_ml',	// インラインテキスト代入の終端
    // 'endlink',	// ハイパーリンクの終了
    // 'er',		// ページ両面の文字消去
    // 'graph',		// インライン画像表示
    // 'link',		// ハイパーリンク
    // 'r',			// 改行
    // 'rec_ch',	// 履歴書き込み
    // 'rec_r',		// 履歴改行
    // 'reset_rec',	// 履歴リセット
    // 'ruby2',		// 文字列と複数ルビの追加
    // 'set_focus',	// フォーカス移動
    // 'span',		// インラインスタイル設定
    // 'tcy',		// 縦中横を表示する
    // 画像・画像レイヤ
    // 'add_face',	// 差分名称の定義
    "wv",
    // 動画再生終了待ち
    // HTMLフレーム
    // 'add_frame',	// フレーム追加
    // 'frame',	// フレームに設定
    // 'let_frame',	// フレーム変数を取得
    // 'set_frame',	// フレーム変数に設定
    // 'tsy_frame',	// フレームをトゥイーン開始
    // イベント
    // 'clear_event',	// イベントを全消去
    // 'enable_event',	// イベント有無の切替
    // 'event',	// イベントを予約
    "l",
    // 行末クリック待ち
    "p",
    // 改ページクリック待ち
    "s",
    // 停止する
    "wait",
    // ウェイトを入れる
    "waitclick",
    // クリックを待つ
    // ＢＧＭ・効果音
    // 'fadebgm',	// BGMのフェード
    // 'fadeoutbgm',// BGMのフェードアウト
    // 'fadeoutse',	// 効果音のフェードアウト
    // 'fadese',	// 効果音のフェード
    // 'playbgm',	// BGM の演奏
    // 'playse',	// 効果音の再生
    // 'stop_allse',// 全効果音再生の停止
    // 'stopbgm',	// BGM 演奏の停止
    // 'stopfadese',// 音声フェードの停止
    // 'stopse',	// 効果音再生の停止
    // 'volume',	// BGMや効果音の音量を指定
    "wb",
    // BGM フェードの終了待ち
    "wf",
    // 効果音フェードの終了待ち
    "wl",
    // BGM 再生の終了待ち
    "ws",
    // 効果音再生の終了待ち
    // 'xchgbuf',	// サウンドバッファの交換
    // 条件分岐
    // 'else',	// その他ifブロック開始
    // 'elsif',	// 別条件のifブロック開始
    // 'endif',	// ifブロックの終端
    // 'if',	// ifブロックの開始
    // ラベル・ジャンプ
    // 'button',	// ボタンを表示
    // 'call',		// サブルーチンコール
    // 'jump',		// シナリオジャンプ
    // 'page',		// ページ移動
    // 'pop_stack',	// コールスタック破棄
    // 'return',	// サブルーチンから戻る
    // マクロ
    // 'bracket2macro',	// 括弧マクロの定義
    // 'char2macro',	// 一文字マクロの定義
    // 'endmacro',	// マクロ定義の終了
    // 'macro',		// マクロ定義の開始
    // しおり
    // 'copybookmark',	// しおりの複写
    // 'erasebookmark',	// しおりの消去
    // 'load',			// しおりの読込
    // 'record_place',	// セーブポイント指定
    // 'reload_script',	// スクリプト再読込
    // 'save',			// しおりの保存
    // 画面揺らし
    "quake",
    // 画面を揺らす
    // 'stop_quake',// 画面揺らし中断
    "wq"
    // 画面揺らし終了待ち
    // システム
    // 'close',		// アプリの終了
    // 'export',	// プレイデータをエクスポート
    // 'import',	// プレイデータをインポート
    // 'loadplugin',	// プラグインの読み込み
    // 'navigate_to',	// ＵＲＬを開く
    // 'snapshot',		// スナップショット
    // 'title',		// タイトル指定
    // 'toggle_full_screen',	// 全画面状態切替
    // 'update_check',	// 更新チェック機能
    // 'window',	// アプリウインドウ設定
    // デバッグ・その他
    // 'dump_lay',		// レイヤのダンプ
    // 'dump_script',	// 外部へスクリプトを表示
    // 'dump_stack',	// スタックのダンプ
    // 'dump_val',		// 変数のダンプ
    // 'log',		// ログ出力
    // 'trace',		// デバッグ表示へ出力
  ]);
  // キー押しっぱなしスキップで処理せずスルーするタグ
  #N = {
    wt: () => B.finish_trans(),
    // トランス終了待ち
    wait_tsy: (t) => this.hTag.stop_tsy(t),
    // トゥイーン終了待ち
    // 'wv',		：タグ内部で処理	// 動画再生終了待ち
    wait: () => !1,
    // ウェイトを入れる
    // 'playbgm',	：スルー不可		// BGM の演奏
    // 'playse',	：タグ内部で処理	// 効果音の再生
    wb: () => this.hTag.stopfadese({ buf: xe }),
    // BGM フェードの終了待ち
    // 'wf'		：タグ内部で処理	// 効果音フェードの終了待ち
    // 'ws'		：タグ内部で処理	// 効果音再生の終了待ち
    wq: () => this.hTag.stop_quake({}),
    // 画面揺らし終了待ち
    // fade系	：タグ内部で処理
    // 'ch'		：タグ内部で処理	// 文字を追加する
    // 'tsy'	：タグ内部で処理	// トゥイーン開始
    // 'trans'	：タグ内部で処理	// ページ裏表を交換
    quake: () => !1
    // 画面を揺らす
  };
  // タグ処理中にクリックなどで即終わらせられるタグ（canskip 属性がある）
  #q = {
    // デフォルト値
    wt: !0,
    // [wt]トランス終了待ち
    wait_tsy: !0,
    // [wait_tsy]トゥイーン終了待ち
    wv: !0,
    // [wv]動画再生終了待ち
    wait: !0,
    // [wait]ウェイトを入れる
    playbgm: !1,
    // [playbgm]BGM の演奏
    playse: !0,
    // [playse]効果音の再生
    wb: !1,
    // [wb]BGM フェードの終了待ち
    wf: !1,
    // [wf]効果音フェードの終了待ち
    ws: !1,
    // [ws]効果音再生の終了待ち
    wq: !0
    // [wq]画面揺らし終了待ち
  };
  #D;
  #O;
  setOtherObj(t, e) {
    this.#D = t, this.#O = e;
  }
  //MARK: インラインテキスト代入
  #B(t) {
    const { name: e } = t;
    if (!e) throw "nameは必須です";
    let s = "";
    const i = this.#e.len;
    for (; this.#s < i && (s = this.#e.aToken[this.#s], s === ""); ++this.#s)
      ;
    return t.text = s, t.cast = "str", this.hTag.let(t), this.#s += 2, this.#n += (s.match(/\n/g) ?? []).length, !1;
  }
  //MARK: スタックのダンプ
  #T() {
    if (this.#s === 0)
      return console.group(`🥟 [dump_stack] スクリプト現在地 fn:${this.#t} line:1 col:0`), console.groupEnd(), !1;
    const t = this.#_(this.#e, this.#s), e = `スクリプト現在地 fn:${this.#t} line:${t.ln} col:${t.col_s + 1}`;
    console.group(`🥟 [dump_stack] ${e}`);
    const s = this.#i.length;
    if (s > 0) {
      console.info(e);
      for (let i = s - 1; i >= 0; --i) {
        const r = this.#i[i], o = r.csArg[":hMp"], a = o ? o[":タグ名"] : void 0, c = r.csArg[":タグ名"] ?? "", h = this.#_(this.#j[r.fn], r.idx);
        console.info(
          `${s - i}つ前のコール元 fn:${r.fn} line:${h.ln} col:${h.col_s + 1}` + (a ? "（[" + a + "]マクロ内）" : " ") + `で [${c} ...]をコール`
        );
      }
    }
    return console.groupEnd(), !1;
  }
  #_(t, e) {
    const s = { ln: 1, col_s: 0, col_e: 0 };
    if (!t) return s;
    let i = e - 1;
    const r = s.ln = t.aLNum[i];
    for (; t.aLNum[i] === r; ) {
      if (!t.aToken[i].startsWith(`
`)) {
        const o = t.aToken[i].length;
        s.col_e > 0 && (s.col_s += o), s.col_e += o;
      }
      if (--i < 0) break;
    }
    return s;
  }
  //MARK: 外部へスクリプトを表示
  #J(t) {
    const { set_fnc: e, break_fnc: s } = t;
    if (!e) throw "set_fncは必須です";
    if (this.#P = globalThis[e], !this.#P) {
      if (C(t, "need_err", !0)) throw `HTML内に関数${e}が見つかりません`;
      return this.#P = () => {
      }, !1;
    }
    if (this.noticeBreak = (i) => {
      this.#Y !== this.#t && (this.#Y = this.#t, this.#P(
        this.#R[this.#t] ??= this.#e.aToken.join("")
      )), this.#w(this.#n, i);
    }, this.noticeBreak(!0), !s) return !1;
    if (this.#w = globalThis[s], !this.#w) {
      if (C(t, "need_err", !0)) throw `HTML内に関数${s}が見つかりません`;
      this.#w = () => {
      };
    }
    return !1;
  }
  #P = () => {
  };
  #w = () => {
  };
  #Y = "";
  #R = {};
  noticeBreak = (t) => {
  };
  #st = 5;
  dumpErrForeLine() {
    if (this.#s === 0) {
      console.group(`🥟 Error line (from 0 rows before) fn:${this.#t}`), console.groupEnd();
      return;
    }
    let t = "";
    for (let o = this.#s - 1; o >= 0 && (t = this.#e.aToken[o] + t, !((t.match(/\n/g) ?? []).length >= this.#st)); --o)
      ;
    const e = t.split(`
`).slice(-this.#st), s = e.length;
    console.group(`🥟 Error line (from ${s} rows before) fn:${this.#t}`);
    const i = String(this.#n).length, r = this.#_(this.#e, this.#s);
    for (let o = 0; o < s; ++o) {
      const a = this.#n - s + o + 1, c = `${String(a).padStart(i, " ")}: %c`, h = e[o], l = h.length > 75 ? h.slice(0, 75) + "…" : h;
      o === s - 1 ? console.info(
        c + l.slice(0, r.col_s) + "%c" + l.slice(r.col_s),
        "color: black; background-color: skyblue;",
        "color: black; background-color: pink;"
      ) : console.info(c + l, "color: black; background-color: skyblue;");
    }
    console.groupEnd();
  }
  #k = [-1];
  // 先頭に積む FIFOバッファ（unshift / shift）
  //MARK: ifブロックの終端
  #Q() {
    const t = this.#k[0];
    if (!t) throw "this.#aIfStk が異常です";
    if (t === -1) throw "ifブロック内ではありません";
    return this.#s = t, this.#k.shift(), !1;
  }
  //MARK: ifブロックの開始
  #A(t) {
    const { exp: e } = t;
    if (!e) throw "expは必須です";
    if (e.startsWith("&")) throw "属性expは「&」が不要です";
    let s = 0, i = this.prpPrs.parse(e) ? this.#s : -1;
    const r = this.#e.aLNum[this.#s];
    let o = this.#n - (r || 0);
    const a = this.#e.len;
    for (; this.#s < a; ++this.#s) {
      const c = this.#e.aLNum[this.#s];
      this.#e.aLNum[this.#s] = (c || 0) + o;
      const h = this.#e.aToken[this.#s];
      if (!h) continue;
      const l = h.charCodeAt(0);
      if (l === 10) {
        this.#n += h.length;
        continue;
      }
      if (l !== 91) continue;
      const [u, m] = ls(h);
      if (!(u in this.hTag)) throw `未定義のタグ[${u}]です`;
      switch (this.#c.parse(m), u) {
        case "if":
          ++s;
          break;
        case "elsif":
          if (s > 0 || i > -1) break;
          const p = this.#c.hPrm.exp?.val;
          if (!p) throw "expは必須です";
          if (p.startsWith("&")) throw "属性expは「&」が不要です";
          this.prpPrs.parse(p) && (i = this.#s + 1);
          break;
        case "else":
          if (s > 0) break;
          i === -1 && (i = this.#s + 1);
          break;
        case "endif":
          if (s > 0) {
            --s;
            break;
          }
          return i === -1 ? (++this.#s, this.#e.aLNum[this.#s] += o) : (this.#k.unshift(this.#s + 1), this.#s = i, this.#n = this.#e.aLNum[this.#s]), !1;
      }
    }
    throw "[endif]がないままスクリプト終端です";
  }
  //MARK: サブルーチンコール
  #G(t) {
    C(t, "count", !1) || this.#ot();
    const { fn: e } = t;
    return e && this.#r(e), this.#V({ ...t, ":hEvt1Time": k.popLocalEvts() }), C(t, "clear_local_event", !1) && this.hTag.clear_event({}), this.#C(e, t.label);
  }
  #V(t) {
    const e = { ...t, ":hMp": this.val.cloneMp(), ":lenIfStk": this.#k.length };
    this.#e.aLNum[this.#s] = this.#n, this.#tt || (e[":resvToken"] = "", this.#z()), this.#i.push(new us(this.#t, this.#s, e)), this.#k.unshift(-1);
  }
  //MARK: シナリオジャンプ
  #L(t) {
    return C(t, "count", !0) || this.#ot(), this.#k[0] = -1, this.#C(t.fn, t.label);
  }
  //MARK: コールスタック破棄
  #F(t) {
    if (C(t, "clear", !1)) this.#i = [];
    else if (!this.#i.pop()) throw "スタックが空です";
    return this.#z(), this.#k = [-1], this.val.setMp({}), !1;
  }
  //MARK: サブルーチンから戻る
  #x(t) {
    const e = this.#i.pop();
    if (!e) throw "スタックが空です";
    const s = e.csArg;
    this.#k = this.#k.slice(-s[":lenIfStk"]);
    const i = s[":hMp"];
    i && this.val.setMp(i);
    const r = s[":resvToken"];
    r ? this.nextToken = () => (this.#z(), r) : this.#z(), s[":hEvt1Time"] && k.pushLocalEvts(s[":hEvt1Time"]);
    const { fn: o, label: a } = t;
    return o || a ? this.#C(o, a) : e.fn in this.#j ? (this.#nt(e), !1) : this.#C(e.fn, "", e.idx);
  }
  #tt = "";
  #z() {
    this.#tt = "", this.nextToken = this.#H;
  }
  #K = "";
  #C(t = "", e = "", s = 0) {
    if (S.debugLog && console.log(`📜 %c1:jumpWork%c fn:${t} lbl:${e} idx:${s}`, "color:#3B0;", ""), !t && !e && this.main.errScript("[jump系] fnまたはlabelは必須です"), e ? (e.startsWith("*") || this.main.errScript("[jump系] labelは*で始まります"), this.#K = e, this.#K.startsWith("**") || (this.#s = s)) : (this.#K = "", this.#s = s), !t)
      return this.analyzeInit(), !1;
    if (t.includes("@")) throw "[jump系] fn には文字「@」は禁止です";
    const i = this.#r(t);
    if (t === this.#t)
      return this.analyzeInit(), !1;
    this.#t = t;
    const r = this.#j[t];
    if (r)
      return this.#e = r, this.analyzeInit(), !1;
    const o = `jumpWork fn:${t}`;
    g.beginProc(o);
    let a = "";
    const c = new Et();
    try {
      a = this.#r(t + "@"), c.add({ name: t + ":base", url: i }), c.add({ name: t, url: a });
    } catch {
      c.add({ name: t, url: i });
    }
    return c.use(async (h, l) => {
      try {
        h.data = await this.sys.dec(h.extension, h.data);
      } catch (u) {
        this.main.errScript(`[jump系]snロード失敗です fn:${h.name} ${u}`, !1);
      }
      l();
    }).load((h, l) => {
      if (g.endProc(o), a) {
        const u = l[t + ":base"].data, m = l[t].data, p = u.split(`
`), d = m.split(`
`), y = p.length, _ = d.length;
        for (let f = 0; f < _ && f < y; ++f) d[f] ||= p[f];
        l[t].data = d.join(`
`), delete l[t + ":base"];
      }
      this.nextToken = this.#H, this.#n = 1, this.#lt(l[t].data), this.hTag.record_place({}), this.analyzeInit();
    }), !0;
  }
  analyzeInit() {
    S.debugLog && console.log(`📜 %c9:analyzeInit%c fn:${this.#t} lbl:${this.#K} idx:${this.#s}`, "color:#3B0;", "");
    const t = this.#ct(this.#e, !!this.val.getVal("mp:const.sn.macro.name"), this.#n, this.#K, this.#s);
    this.#s = t.idx, this.#n = t.ln;
  }
  // シナリオ解析処理ループ・冒頭処理
  nextToken = () => "";
  // 初期化前に終了した場合向け
  #H() {
    if (this.#I()) return "";
    this.#ft(), this.#e.aLNum[this.#s] ||= this.#n;
    const t = this.#e.aToken[this.#s];
    return this.#U(t), ++this.#s, t;
  }
  #U = (t) => {
  };
  #I() {
    return this.#s < this.#e.len ? !1 : (this.main.errScript("スクリプト終端です errOverScr"), !0);
  }
  #X = /(\*{2,})([^\|]*)/;
  #at = /^\[macro\s/;
  #it = /^\[endmacro[\s\]]/;
  #ct(t, e, s, i, r) {
    const o = t.aToken.length;
    if (!i) {
      if (this.#I()) return { idx: r, ln: s };
      if (t.aLNum[r])
        s = t.aLNum[r];
      else {
        s = 1;
        for (let l = 0; l < r; ++l) {
          t.aLNum[l] ||= s;
          const u = t.aToken[l];
          u.startsWith(`
`) ? s += u.length : s += (u.match(/\n/g) ?? []).length;
        }
        t.aLNum[r] = s;
      }
      return { idx: r, ln: s };
    }
    t.aLNum[0] = 1;
    const a = i.match(this.#X);
    if (a) {
      i = a[1];
      let l = r;
      switch (a[2]) {
        case "before":
          for (; t.aToken[--l] !== i; )
            l === 0 && at.myTrace("[jump系 無名ラベルbefore] " + s + "行目以前で" + (e ? "マクロ内に" : "") + "ラベル【" + i + "】がありません", "ET"), e && t.aToken[l].search(this.#at) > -1 && at.myTrace("[jump系 無名ラベルbefore] マクロ内にラベル【" + i + "】がありません", "ET");
          return { idx: l + 1, ln: t.aLNum[l] };
        //	break;
        case "after":
          for (; t.aToken[++l] !== i; )
            l === o && at.myTrace("[jump系 無名ラベルafter] " + s + "行目以後でマクロ内にラベル【" + i + "】がありません", "ET"), t.aToken[l].search(this.#it) > -1 && at.myTrace("[jump系 無名ラベルafter] " + s + "行目以後でマクロ内にラベル【" + i + "】がありません", "ET");
          return { idx: l + 1, ln: t.aLNum[l] };
        //	break;
        default:
          at.myTrace("[jump系] 無名ラベル指定【label=" + i + "】が間違っています", "ET");
      }
    }
    s = 1;
    const c = new RegExp(
      "^" + i.replaceAll("*", "\\*") + "(?=\\s|;|\\[|\\||$)"
    );
    let h = !1;
    for (let l = 0; l < o; ++l) {
      t.aLNum[l] ||= s;
      const u = t.aToken[l];
      if (h) {
        this.#o.testTagEndLetml(u) ? h = !1 : s += (u.match(/\n/g) ?? []).length;
        continue;
      }
      const m = u.charCodeAt(0);
      if (m === 10) {
        s += u.length;
        continue;
      }
      if (m === 42) {
        if (u.search(c) > -1) return { idx: l + 1, ln: s };
        continue;
      }
      m === 91 && (s += (u.match(/\n/g) ?? []).length, this.#o.testTagLetml(u) && (h = !0));
    }
    throw h ? "[let_ml]の終端・[endlet_ml]がありません" : (at.myTrace(`[jump系] ラベル【${i}】がありません`, "ET"), "Dummy");
  }
  #j = /* @__PURE__ */ Object.create(null);
  //{} シナリオキャッシュ
  #lt(t) {
    let e = "";
    try {
      e = "ScriptIterator.resolveScript";
      const s = this.#o.resolveScript(t);
      e = "ScriptIterator.replaceScript_Wildcard", this.#ut(s), this.#j[this.#t] = this.#e = s;
    } catch (s) {
      s instanceof Error ? e += `例外 mes=${s.message}(${s.name})` : e = String(s), this.main.errScript(e, !1);
    }
    this.val.touchAreaKidoku(this.#t);
  }
  #nt(t) {
    this.#t = t.fn, this.#s = t.idx;
    const e = this.#j[this.#t];
    e && (this.#e = e), this.#n = this.#e.aLNum[t.idx];
  }
  #ht = /^\[(call|loadplugin)\s/;
  #rt = /\bfn\s*=\s*[^\s\]]+/;
  #ut(t) {
    for (let e = t.len - 1; e >= 0; --e) {
      const s = t.aToken[e];
      if (!this.#ht.test(s)) continue;
      const [i, r] = ls(s);
      this.#c.parse(r);
      const o = this.#c.hPrm.fn;
      if (!o) continue;
      const { val: a } = o;
      if (!a || !a.endsWith("*")) continue;
      t.aToken.splice(e, 1, "	", "; " + s), t.aLNum.splice(e, 1, NaN, NaN);
      const c = i === "loadplugin" ? A.CSS : A.SN, h = this.cfg.matchPath("^" + a.slice(0, -1) + ".*", c);
      for (const l of h) {
        const u = s.replace(
          this.#rt,
          "fn=" + decodeURIComponent(ge(l[c]))
        );
        t.aToken.splice(e, 0, u), t.aLNum.splice(e, 0, NaN);
      }
    }
    t.len = t.aToken.length;
  }
  #ft() {
    const t = this.val.touchAreaKidoku(this.#t);
    if (this.#i.length > 0) {
      t.record(this.#s);
      return;
    }
    this.#Z = t.search(this.#s), this.val.setVal_Nochk("tmp", "const.sn.isKidoku", this.#Z), !this.#Z && t.record(this.#s);
  }
  #Z = !1;
  get isKidoku() {
    return this.#Z;
  }
  #ot() {
    this.val.getAreaKidoku(this.#t)?.erase(this.#s), this.#Z = !1;
  }
  get isNextKidoku() {
    let t = this.#t, e = this.#s, s = this.#e.len;
    if (this.#i.length > 0) {
      const r = this.#i[0];
      t = r.fn, e = r.idx;
      const o = this.#j[t];
      o && (s = o.len);
    }
    const i = this.val.getAreaKidoku(t);
    return e === s ? !1 : i.search(e);
  }
  get normalWait() {
    return this.#Z ? this.val.tagCh_doWait_Kidoku ? this.val.tagCh_msecWait_Kidoku : 0 : this.val.tagCh_doWait ? this.val.tagCh_msecWait : 0;
  }
  //MARK: 括弧マクロの定義
  #dt(t) {
    return this.#o.bracket2macro(t, this.hTag, this.#e, this.#s), !1;
  }
  //MARK: 一文字マクロの定義
  #pt(t) {
    return this.#o.char2macro(t, this.hTag, this.#e, this.#s), !1;
  }
  //MARK: マクロ定義の開始
  #mt = /["'#;\\]　]+/;
  #_t(t) {
    const { name: e } = t;
    if (!e) throw "nameは必須です";
    if (e in this.hTag) throw `[${e}]はタグかすでに定義済みのマクロです`;
    if (this.#mt.test(e)) throw `[${e}]はマクロ名として異常です`;
    const s = this.#n, i = new us(this.#t, this.#s);
    for (this.#vt += "|" + e, this.#yt = new RegExp(`\\[(${this.#vt})\\b`), this.hTag[e] = (r) => (r.design_unit = t.design_unit, this.#V(r), this.val.setMp(r), this.val.setVal_Nochk("mp", "const.sn.macro", JSON.stringify({
      name: t.name
    })), this.val.setVal_Nochk("mp", "const.sn.me_call_scriptFn", this.#t), this.#n = s, this.#nt(i), !1); this.#s < this.#e.len; ++this.#s) {
      this.#e.aLNum[this.#s] ||= this.#n;
      const r = this.#e.aToken[this.#s];
      if (r.search(this.#it) > -1)
        return ++this.#s, !1;
      const o = r.charCodeAt(0);
      o === 10 ? this.#n += r.length : o === 91 && (this.#n += (r.match(/\n/g) ?? []).length);
    }
    throw `マクロ[${e}]定義の終端・[endmacro]がありません`;
  }
  #vt = "call";
  #yt = /\[(call)\b/;
  // https://regex101.com/r/Lk9ASK/1
  //MARK: しおりの読込
  #bt(t) {
    if ("fn" in t != "label" in t) throw "fnとlabelはセットで指定して下さい";
    const e = E(t, "place", 0), s = this.val.getMark(e);
    return this.loadFromMark(
      t,
      s,
      2
      /* ALL_STOP_AND_PLAY */
    );
  }
  loadFromMark(t, e, s = 0) {
    this.hTag.clear_event({}), this.val.mark2save(e), this.val.setMp({}), this.#O.recPagebreak();
    let i = [];
    s !== 1 && (i = this.sndMng.playLoopFromSaveObj(
      s === 2
      /* ALL_STOP_AND_PLAY */
    )), C(t, "do_rec", !0) && (this.#et = {
      hSave: this.val.cloneSave(),
      hPages: { ...e.hPages },
      aIfStk: [...e.aIfStk]
    });
    const r = {
      enabled: this.val.getVal("save:const.sn.autowc.enabled"),
      text: this.val.getVal("save:const.sn.autowc.text"),
      time: Number(this.val.getVal("save:const.sn.autowc.time"))
    };
    this.hTag.autowc(r), this.#k = [...this.#et.aIfStk], this.#i = [], B.stopAllTw();
    const o = Promise.allSettled([...i, ...this.#O.playback(this.#et.hPages)]).then(() => this.#O.cover(!1)).catch((m) => console.error("loadFromMark e:%o", m)), { index: a, fn: c } = t;
    if (a)
      return S.debugLog && console.log(`📜 %cloadFromMark index:${a} move!%c fn:${c}`, "color:#3B0;", ""), o.then(() => {
        this.#C(c, "", a) || this.main.resume();
      }), !0;
    this.#O.cover(!0);
    const h = String(this.val.getVal("save:const.sn.scriptFn")), l = Number(this.val.getVal("save:const.sn.scriptIdx"));
    delete this.#j[h];
    const { label: u } = t;
    return u ? o.then(() => {
      this.#t = h, this.#s = l, this.hTag.call({ fn: c, label: u }) || this.main.resume();
    }) : o.then(() => {
      this.#C(h, "", l) || this.main.resume();
    }), !0;
  }
  //MARK: スクリプト再読込
  #wt(t) {
    const e = this.val.getMark(0);
    delete this.#j[ge(e.hSave["const.sn.scriptFn"])];
    const s = {};
    for (const i in this.#j)
      try {
        this.#r(i + "@");
      } catch {
        s[i] = this.#j[i];
      }
    return this.#j = s, t.do_rec = !1, this.loadFromMark(
      t,
      e,
      1
      /* NO_TOUCH */
    );
  }
  //MARK: セーブポイント指定
  #et = {
    hSave: {},
    hPages: {},
    aIfStk: [-1]
  };
  #gt = () => {
    const { fn: t, idx: e } = this.nowScrIdx();
    return this.val.setVal_Nochk("save", "const.sn.scriptFn", t), this.val.setVal_Nochk("save", "const.sn.scriptIdx", e), this.#et = {
      hSave: this.val.cloneSave(),
      hPages: this.#O.record(),
      aIfStk: this.#k.slice(this.#i.length)
    }, !1;
  };
  nowScrIdx() {
    if (this.#i.length === 0) return {
      fn: this.#t,
      idx: this.#s
    };
    const e = this.#i[0];
    return {
      fn: e.fn,
      idx: e.idx
    };
  }
  nowMark() {
    return { ...this.#et };
  }
  //MARK: スクリプト停止位置（マクロなどなら最上位の呼び元）
  nowScrFnLn() {
    const { fn: t, idx: e } = this.nowScrIdx(), s = this.#j[t], i = this.#_(s, e);
    return { fn: t, ...i };
  }
  //MARK: しおりの保存
  #kt(t) {
    if (!("place" in t)) throw "placeは必須です";
    const e = Number(t.place);
    delete t[":タグ名"], delete t.place, t.text = t.text ?? "", this.#et.json = t, this.val.setMark(e, this.#et);
    const s = Number(this.val.getVal("sys:const.sn.save.place"));
    return e === s && this.val.setVal_Nochk("sys", "const.sn.save.place", s + 1), !1;
  }
  recodeDesign(t) {
    let e = "", s = 0;
    const i = this.#i.length;
    if (t.design_unit && i > 0) {
      const c = this.#i[0];
      e = c.fn, s = c.idx;
    } else
      e = this.#t, s = this.#s;
    t[":path"] = this.#u(e);
    const r = this.#j[e], o = this.#_(r, s);
    t[":ln"] = o.ln, t[":col_s"] = o.col_s, t[":col_e"] = o.col_e;
    const a = s - 1;
    t[":idx_tkn"] = a, t[":token"] = r.aToken[a], this.sys.send2Dbg("_recodeDesign", t);
  }
  replace(t, e) {
    this.#e.aToken[t] = e;
  }
}
const Jn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  RPN_COMP_CHIN: Ee,
  ScriptIterator: X
}, Symbol.toStringTag, { value: "Module" }));
class F extends G {
  constructor(t, e, s) {
    super(), this.ctn = t, this.canFocus = e, this.sys = s, this.#i.classList.add("sn_tx"), this.#i.style.position = "absolute", F.#t.view.parentElement.appendChild(this.#i), this.addChild(this.#o), this.addChild(this.#c), this.#c.name = "grpDbgMasume", this.noticeCompTxt = s.isApp && F.#e.oCfg.debug.dumpHtm ? () => {
      g.notifyEndProc(Ee);
      const i = this.#i.innerHTML;
      if (i === "") return;
      const { fn: r, ln: o } = F.#n.nowScrFnLn(), a = `dumpHtm ${t.name.slice(0, -7).replaceAll(":", "=")}(fn=${r} line=${o})`;
      s.outputFile(
        s.path_downloads + a + ".htm",
        `<!doctype html><html><head><meta charset=utf-8><title>${a}</title>
<h1>${a}</h1>${i.replaceAll(/ class="sn_ch"|animation-delay: \d+ms; ?| data-add="{&quot;ch_in_style&quot;:&quot;default&quot;, &quot;ch_out_style&quot;:&quot;default&quot;}"/g, "").replaceAll(' style=""', "").replaceAll(/(<\/?ruby>)/g, `
$1
`).replaceAll(/<(br|\/span)>/g, `<$1>
`)}`
      );
    } : () => g.notifyEndProc(Ee);
  }
  static #e;
  static #t;
  static init(t, e) {
    F.#e = t, F.#t = e;
  }
  static #s;
  static #n;
  static setEvtMng(t, e) {
    F.#s = t, F.#n = e;
  }
  static destroy() {
    F.#N = /* @__PURE__ */ Object.create(null), F.#D = /* @__PURE__ */ Object.create(null), F.delBreak();
  }
  #i = document.createElement("span");
  // サンプリング元
  #o = new G();
  // サンプリング先
  #c = new gt();
  static #g = {
    "background-color": 0,
    "border-bottom-width": 0,
    "border-left-width": 0,
    "border-right-width": 0,
    "border-top-width": 0,
    "margin-bottom": 0,
    "margin-left": 0,
    "margin-right": 0,
    "margin-top": 0
  };
  #h = new _i();
  noticeCompTxt = () => {
  };
  //	readonly	#idc	:TxtLayDesignCast;
  //	readonly	#idcCh	= new TxtLayPadDesignCast(this);
  #r = {
    fontsize: 24,
    $width: 0,
    // レイヤサイズであり、背景色（画像）サイズ
    $height: 0,
    pad_left: 0,
    // paddingLeft（レイヤサイズの内側のスペーサー）
    pad_right: 0,
    // paddingRight
    pad_top: 0,
    // paddingTop
    pad_bottom: 0
    // paddingBottom
  };
  lay(t) {
    const e = this.#i.style;
    if ("style" in t)
      if (t.style) {
        const s = document.createElement("span");
        s.style.cssText = t.style;
        const i = s.style.length;
        for (let r = 0; r < i; ++r) {
          const o = s.style[r];
          if (o in F.#g) {
            at.myTrace(`${o}は指定できません`, "W");
            continue;
          }
          e[o] = s.style[o];
        }
        !s.style.opacity && "alpha" in t && (e.opacity = String(this.ctn.alpha));
      } else this.#i.style.cssText = "";
    else "alpha" in t && (e.opacity = String(this.ctn.alpha));
    if ("width" in t && (e.width = (t.width ?? "0") + "px"), "height" in t && (e.height = (t.height ?? "0") + "px"), "pl" in t && (e.paddingLeft = (t.pl ?? "0") + "px"), "pr" in t && (e.paddingRight = (t.pr ?? "0") + "px"), "pt" in t && (e.paddingTop = (t.pt ?? "0") + "px"), "pb" in t && (e.paddingBottom = (t.pb ?? "0") + "px"), this.#h.lay(t), this.#u(), this.#f = this.ctn.position.x, e.transformOrigin = `${this.ctn.pivot.x}px ${this.ctn.pivot.y}px`, this.cvsResize(), e.display = this.ctn.visible ? "inline" : "none", ":redraw" in t && this.#y > 0) {
      const s = [
        this.#i.innerHTML.replaceAll(/(animation-delay: )\d+ms/g, "$10ms"),
        `<span class='sn_ch' data-add='{"ch_in_style":"default"}'>&emsp;</span>`
      ];
      this.#J(), this.goTxt(s, !0);
    }
  }
  #d = 0;
  // 「g」などで下が欠ける問題対策
  #u() {
    const t = this.#i.style, e = parseFloat(t.fontSize || "0");
    this.#r.fontsize = e, this.#r.pad_left = parseFloat(t.paddingLeft || "0"), this.#r.pad_right = parseFloat(t.paddingRight || "0"), this.#r.pad_top = parseFloat(t.paddingTop || "0"), this.#r.pad_bottom = parseFloat(t.paddingBottom || "0"), this.#r.$width = parseFloat(t.width || "0"), this.#r.$height = parseFloat(t.height || "0"), this.position.set(this.#r.pad_left, this.#r.pad_top), this.#p = t.writingMode === "vertical-rl", this.#m = 0, this.#b = 0;
    const s = t.lineHeight ?? "0";
    this.#d = this.#p ? 0 : (s.endsWith("px") ? parseFloat(s) : e * parseFloat(s) - e) / 2;
  }
  cvsResize() {
    const t = this.#i.style, e = this.sys.cvsScale;
    t.left = `${this.sys.ofsLeft4elm + this.#f * e}px`, t.top = `${this.sys.ofsTop4elm + this.ctn.position.y * e}px`, t.transform = `rotate(${this.ctn.angle}deg) scale(${this.ctn.scale.x * e}, ${this.ctn.scale.y * e})`;
  }
  #f = 0;
  #p = !1;
  get tategaki() {
    return this.#p;
  }
  #m = 0;
  #b = 0;
  get infTL() {
    return this.#r;
  }
  get getWidth() {
    return this.#r.$width;
  }
  get getHeight() {
    return this.#r.$height;
  }
  setMySize(t, e) {
    this.#r.$width = t, this.#r.$height = e, this.#i.style.width = this.#r.$width + "px", this.#i.style.height = this.#r.$height + "px";
  }
  #l(t, e = !0) {
    const s = {
      escape: (y) => y.replaceAll(/([.*+?^${}()|\[\]\/\\])/g, "\\$1"),
      mimeType: (y) => {
        const _ = c(y).toLowerCase();
        return i()[_] || "";
      },
      dataAsUrl: m,
      isDataUrl: h,
      resolveUrl: l,
      getAndEncode: u,
      asArray: (y) => {
        const _ = [], f = y.length;
        for (let v = 0; v < f; ++v) _.push(y[v]);
        return _;
      }
    };
    function i() {
      const y = "application/font-woff", _ = "image/jpeg";
      return {
        woff: y,
        woff2: y,
        ttf: "application/font-truetype",
        eot: "application/vnd.ms-fontobject",
        png: "image/png",
        jpg: _,
        jpeg: _,
        gif: "image/gif",
        tiff: "image/tiff",
        svg: "image/svg+xml"
      };
    }
    const r = p(), o = d();
    function a(y) {
      return o.resolveAll().then((_) => {
        const f = document.createElement("style");
        return y.appendChild(f), f.appendChild(document.createTextNode(_)), y;
      });
    }
    function c(y) {
      return /\.([^\.\/]*?)$/g.exec(y)?.[1] ?? "";
    }
    function h(y) {
      return y.search(/^(data:)/) !== -1;
    }
    function l(y, _) {
      const f = document.implementation.createHTMLDocument(), v = f.createElement("base");
      f.head.appendChild(v);
      const P = f.createElement("a");
      return f.body.appendChild(P), v.href = _, P.href = y, P.href;
    }
    function u(y) {
      let _ = 3e4;
      return new Promise(function(f) {
        const v = new XMLHttpRequest();
        v.onreadystatechange = P, v.ontimeout = w, v.responseType = "blob", v.timeout = _, v.open("GET", y, !0), v.send();
        function P() {
          if (v.readyState !== 4) return;
          if (v.status !== 200) {
            b("cannot fetch resource: " + y + ", status: " + v.status);
            return;
          }
          const x = new FileReader();
          x.onloadend = function() {
            const O = x.result.toString().split(/,/)[1];
            f(O);
          }, x.readAsDataURL(v.response);
        }
        function w() {
          b("timeout of " + _ + "ms occured while fetching resource: " + y);
        }
        function b(x) {
          console.error(x), f("");
        }
      });
    }
    function m(y, _) {
      return "data:" + _ + ";base64," + y;
    }
    function p() {
      const y = /url\(['"]?([^'"]+?)['"]?\)/g;
      return {
        inlineAll: P,
        shouldProcess: _
      };
      function _(w) {
        return w.search(y) !== -1;
      }
      function f(w) {
        const b = [];
        let x;
        for (; x = y.exec(w); )
          b.push(x[1]);
        return b.filter(function(O) {
          return !s.isDataUrl(O);
        });
      }
      function v(w, b, x, O) {
        return Promise.resolve(b).then((N) => x ? s.resolveUrl(N, x) : N).then(O || s.getAndEncode).then((N) => s.dataAsUrl(N, s.mimeType(b))).then((N) => w.replace(I(b), "$1" + N + "$3"));
        function I(N) {
          return new RegExp(`(url\\(['"]?)(` + s.escape(N) + `)(['"]?\\))`, "g");
        }
      }
      function P(w, b, x) {
        if (O()) return Promise.resolve(w);
        return Promise.resolve(w).then(f).then((I) => {
          let N = Promise.resolve(w);
          for (const R of I) N = N.then((W) => v(W, R, b, x));
          return N;
        });
        function O() {
          return !_(w);
        }
      }
    }
    function d() {
      return {
        resolveAll: y,
        impl: { readAll: _ }
      };
      function y() {
        return _().then((f) => Promise.allSettled(
          f.map((v) => v.resolve())
        )).then((f) => f.join(`
`));
      }
      function _() {
        return Promise.resolve(s.asArray(document.styleSheets)).then(v).then(f).then((w) => w.map(P));
        function f(w) {
          return w.filter((b) => b.type === CSSRule.FONT_FACE_RULE).filter((b) => r.shouldProcess(b.style.getPropertyValue("src")));
        }
        function v(w) {
          const b = [];
          for (const x of w)
            try {
              if (x.href) continue;
              s.asArray(x.cssRules || []).forEach(b.push.bind(b));
            } catch (O) {
              console.error("Error while reading CSS rules from " + x.href, String(O));
            }
          return b;
        }
        function P(w) {
          return {
            resolve: function() {
              const x = (w.parentStyleSheet || {}).href;
              return r.inlineAll(w.cssText, x);
            },
            src: function() {
              return w.style.getPropertyValue("src");
            }
          };
        }
      }
    }
    Promise.resolve(this.#i).then((y) => {
      const _ = y.cloneNode(!0);
      return _.style.padding = "0px", _.style.paddingRight = this.#m + "px", _.style.paddingTop = this.#b + "px", _.style.left = "0px", _.style.top = "0px", _.style.width = this.#r.$width - this.#r.pad_left - this.#r.pad_right + "px", _.style.height = this.#r.$height - this.#r.pad_top - this.#r.pad_bottom + "px", this.#i.hidden = e, _;
    }).then(a).then((y) => {
      y.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
      const _ = new Image();
      return _.src = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${this.#r.$width}px" height="${this.#r.$height}px"><foreignObject x="0" y="0" width="100%" height="100%">${new XMLSerializer().serializeToString(y).replaceAll("#", "%23").replaceAll(`
`, "%0A")}</foreignObject></svg>`, new Promise((f) => _.onload = () => f(_));
    }).then((y) => new Promise((_) => setTimeout(() => _(y), 100))).then((y) => {
      const _ = document.createElement("canvas");
      _.width = this.#r.$width, _.height = this.#r.$height, _.getContext("2d").drawImage(y, 0, 0), t(vt.from(_));
    }).catch((y) => at.myTrace(`goTxt() = ${y}`));
  }
  #S = [];
  // FIFO実行バッファ
  goTxt(t, e) {
    const s = () => this.#E(t, e);
    this.#S.push(s) === 1 && s();
  }
  #v = [];
  #y = 0;
  static #a = "<span class='sn_ch sn_ch_last'>&emsp;</span>";
  #E(t, e) {
    F.#O.visible = !1;
    let s = this.#v.length, i = "";
    if (s === 0) {
      if (F.#e.oCfg.debug.masume && (S.debugLog && console.log(`🍌 masume ${this.name} v:${this.visible} l:${this.x} t:${this.y} a:${this.alpha} pl:${this.#r.pad_left} pr:${this.#r.pad_right} pt:${this.#r.pad_top} pb:${this.#r.pad_bottom} w:${this.#r.$width} h:${this.#r.$height}`), this.#c.clear().beginFill(3407616, 0.2).lineStyle(1, 3407616, 1).drawRect(-this.#r.pad_left, -this.#r.pad_top, this.#r.$width, this.#r.$height).endFill().beginFill(13311, 0.2).lineStyle(2, 13311, 1).drawRect(
        0,
        0,
        this.#r.$width - this.#r.pad_left - this.#r.pad_right,
        this.#r.$height - this.#r.pad_top - this.#r.pad_bottom
      ).endFill()), this.#i.innerHTML = [...t].join("").replaceAll(/[\n\t]/g, "") + F.#a, !this.#h.break_fixed) {
        const f = globalThis.getComputedStyle(this.#i), v = parseFloat(f.fontSize);
        this.#p ? (this.#h.break_fixed_left = (this.#r.$width - this.#r.pad_left - this.#r.pad_right - v * 1.5) * this.sys.cvsScale, this.#h.break_fixed_top = 0) : (this.#h.break_fixed_left = 0, this.#h.break_fixed_top = v / 2 * this.sys.cvsScale);
      }
    } else
      i = this.#i.innerHTML, --s, this.#i.getElementsByClassName("sn_ch_last").item(0)?.remove(), this.#i.querySelectorAll(":scope > br").forEach((f) => f.remove()), this.#i.insertAdjacentHTML(
        "beforeend",
        t.slice(this.#y).join("").replaceAll(/[\n\t]/g, "") + F.#a
        // 末尾改行削除挙動対策
      );
    this.#i.querySelectorAll(".sn_ch:has(> ruby)").forEach((f) => f.style.background = ""), this.#y = t.length;
    const r = this.sys.cvsScale, o = this.#i.getBoundingClientRect(), a = o.left + this.#r.pad_left, c = o.top + this.#r.pad_top;
    let h;
    if (r === 1) h = (f, v) => {
      const P = f.getBoundingClientRect();
      return new Ot(
        P.left - a,
        P.top - c,
        P.width,
        P.height + ("gjqy".includes(v) ? this.#d : 0)
      );
    };
    else {
      const f = this.sys.ofsPadLeft_Dom2PIXI + o.left * (1 - r), v = this.sys.ofsPadTop_Dom2PIXI + o.top * (1 - r);
      h = (P, w) => {
        const b = P.getBoundingClientRect();
        return new Ot(
          (b.left - f) / r - a,
          (b.top - v) / r - c,
          b.width / r,
          (b.height + ("gjqy".includes(w) ? this.#d : 0)) / r
        );
      };
    }
    const [l, u] = this.#h.hyph(this.#i, h, this.#p, s, i);
    this.#v = l;
    const m = S.debugLog ? ({ ch: f }, { x: v, y: P, width: w, height: b }) => console.log(`🍌 masume ch:${f} x:${v} y:${P} w:${w} h:${b}`) : () => {
    }, p = F.#e.oCfg.debug.masume ? (f, v) => {
      m(f, v), this.#c.beginFill(6737151, 0.5).lineStyle(2, 16724736, 1).drawRect(v.x, v.y, v.width, v.height).endFill();
    } : () => {
    }, d = B.ease(this.#T);
    for (let f = s; f < u; ++f) {
      const v = this.#v[f], P = v.rect, w = JSON.parse(v.elm.dataset.arg ?? '{"delay": 0}'), b = JSON.parse(v.elm.dataset.add ?? "{}"), x = F.#N[b.ch_in_style];
      if (p(v, P), v.elm.dataset.cmd === "grp") {
        const O = new G();
        this.#o.addChild(O), new $(w.pic, O, (I) => {
          this.#M(O, w, b, P, d, x ?? {}), O.parent || O.removeChild(I);
        });
      }
      if (v.elm.dataset.lnk) {
        const O = v.elm.parentElement.closest("[data-arg]"), I = JSON.parse(O.dataset.arg ?? "{}");
        I.key = `lnk=[${f}] ` + this.name;
        const N = new Z();
        this.#M(N, I, b, P, d, x ?? {});
        const R = I.style ?? "", W = R + (I.style_hover ?? ""), J = R + (I.style_clicked ?? ""), H = I.r_style ?? "", ft = H + (I.r_style_hover ?? ""), dt = H + (I.r_style_clicked ?? ""), U = Array.from(O.getElementsByTagName("rt"));
        for (const mt of U) mt.dataset.st_r_bk = mt.style.cssText;
        const Y = O.style.cssText, pt = (mt, Ut) => {
          O.style.cssText = Y + mt;
          for (const wt of U) wt.style.cssText = wt.dataset.st_r_bk + Ut;
        };
        C(I, "enabled", !0) ? F.#s.button(
          I,
          N,
          () => pt(R, H),
          () => this.canFocus() ? (pt(W, ft), !0) : !1,
          () => pt(J, dt)
        ) : pt(
          R + (I.style_disable ?? "color: gray;"),
          H + (I.r_style_disable ?? "color: gray;")
        ), this.#o.addChild(N);
      }
    }
    const y = Array.from(this.#i.getElementsByClassName("sn_ch_yet"));
    this.#$ = () => {
      this.#$ = () => !1;
      for (const v of y) v.className = "sn_ch";
      F.#O.position.set(
        this.#h.break_fixed_left,
        this.#h.break_fixed_top
      ), F.#O.visible = !0, this.noticeCompTxt();
      const f = this.#S.shift();
      return this.#S.length > 0 && f(), !0;
    };
    for (const f of y) f.className = f.className.replace("sn_ch_yet sn", "go");
    s > 0 && ++s;
    let _;
    for (let f = u - 2; f >= 0; --f) {
      const { elm: v } = this.#v[f];
      if (v.tagName === "SPAN") {
        _ = v.parentElement?.tagName === "RUBY" ? v.parentElement.parentElement ?? v : v;
        break;
      }
    }
    if (!_ || e || s === u) {
      this.#$();
      return;
    }
    _.addEventListener("animationend", () => this.#$(), { once: !0 });
  }
  #$ = () => !1;
  #M(t, e, s, i, r, o) {
    t.alpha = 0, e.x && (i.x = e.x.startsWith("=") ? i.x + parseInt(e.x.slice(1)) : parseInt(e.x)), e.y && (i.y = e.y.startsWith("=") ? i.y + parseInt(e.y.slice(1)) : parseInt(e.y)), e.width && (i.width = parseInt(e.width)), e.height && (i.height = parseInt(e.height)), e.wait && (o.wait = parseInt(e.wait)), t.width = i.width, t.height = i.height, o.x ? t.position.set(
      o.x.startsWith("=") ? i.x + t.width * o.nx : o.nx,
      o.y.startsWith("=") ? i.y + t.height * o.ny : o.ny
    ) : t.position.set(i.x, i.y);
    const a = {
      sp: t,
      tw: new re(t).to({ alpha: 1, x: i.x, y: i.y, width: i.width, height: i.height, angle: 0 }, o.wait ?? 0).easing(r).delay((s.wait ?? 0) + (e.delay ?? 0)).onComplete(() => {
        a.tw = void 0;
      }).start()
    };
    this.#W.push(a);
  }
  #W = [];
  skipChIn() {
    let t = this.#$();
    for (const e of this.#W)
      e.tw && (e.tw.stop().end(), t = !0);
    return this.#W = [], t;
  }
  static #N = /* @__PURE__ */ Object.create(null);
  static #q = /[{\s\.,*\{]/;
  // https://regex101.com/r/APC91I/1
  static initChStyle() {
    F.#N = /* @__PURE__ */ Object.create(null), F.#D = /* @__PURE__ */ Object.create(null);
  }
  static getChInStyle(t) {
    return F.#N[t];
  }
  static ch_in_style(t) {
    const { name: e } = t;
    if (!e) throw "nameは必須です";
    if (F.#q.test(e)) throw `name【${e}】に使えない文字が含まれます`;
    if (e in F.#N) throw `name【${e}】はすでにあります`;
    const s = String(t.x ?? "=0"), i = String(t.y ?? "=0");
    return F.#N[e] = {
      wait: E(t, "wait", 500),
      // アニメ・FI時間
      alpha: E(t, "alpha", 0),
      x: s,
      // 初期x値
      y: i,
      // [tsy]と同様に絶対・相対指定可能
      // {x:500}			X位置を500に
      // {x:'=500'}		現在のX位置に+500加算した位置
      // {x:'=-500'}		現在のX位置に-500加算した位置
      // {x:'250,500'}	+250から＋500までの間でランダムな値をX位置に
      // {x:'=250,500'}	+250から＋500までの間でランダムな値を現在のX位置に加算
      nx: parseFloat(s.at(0) === "=" ? s.slice(1) : s),
      ny: parseFloat(i.at(0) === "=" ? i.slice(1) : i),
      scale_x: E(t, "scale_x", 1),
      scale_y: E(t, "scale_y", 1),
      rotate: E(t, "rotate", 0),
      join: C(t, "join", !0),
      // 文字を順番に出すか（true）同時か（false）
      ease: t.ease ?? "ease-out"
    };
  }
  static #D = /* @__PURE__ */ Object.create(null);
  static getChOutStyle(t) {
    return F.#D[t];
  }
  static ch_out_style(t) {
    const { name: e } = t;
    if (!e) throw "nameは必須です";
    if (F.#q.test(e)) throw `name【${e}】に使えない文字が含まれます`;
    if (e in F.#D) throw `name【${e}】はすでにあります`;
    const s = String(t.x ?? "=0"), i = String(t.y ?? "=0");
    return F.#D[e] = {
      wait: E(t, "wait", 500),
      // アニメ・FI時間
      alpha: E(t, "alpha", 0),
      x: s,
      // 初期x値
      y: i,
      // [tsy]と同様に絶対・相対指定可能
      // {x:500}			X位置を500に
      // {x:'=500'}		現在のX位置に+500加算した位置
      // {x:'=-500'}		現在のX位置に-500加算した位置
      // {x:'250,500'}	+250から＋500までの間でランダムな値をX位置に
      // {x:'=250,500'}	+250から＋500までの間でランダムな値を現在のX位置に加算
      nx: parseFloat(s.at(0) === "=" ? s.slice(1) : s),
      ny: parseFloat(i.at(0) === "=" ? i.slice(1) : i),
      scale_x: E(t, "scale_x", 1),
      scale_y: E(t, "scale_y", 1),
      rotate: E(t, "rotate", 0),
      join: C(t, "join", !1),
      // 文字を順番に出すか（true）同時か（false）
      ease: t.ease ?? "ease-out"
    };
  }
  static #O = new G();
  static #B = new $();
  dispBreak(t) {
    F.delBreak();
    const e = F.#O;
    e.visible = !1, this.addChild(e), F.#B.destroy(), F.#B = new $(t.pic, e, (s) => {
      e.parent ? (s.x = E(t, "x", 0), s.y = E(t, "y", 0), s.width = E(t, "width", this.#r.fontsize), s.height = E(t, "height", this.#r.fontsize)) : e.removeChild(s);
    });
  }
  static delBreak() {
    const t = F.#O;
    t.parent?.removeChild(t), F.#B.destroy();
  }
  #T = "Quadratic.Out";
  #_ = "Quadratic.Out";
  #J() {
    this.#c.clear(), this.#v = [], this.#y = 0, this.#S = [], this.skipChIn();
    const t = this.#i.cloneNode(!0);
    t.textContent = "";
    const e = this.#i;
    e.parentElement.insertBefore(t, e);
    let s = 0;
    Array.from(e.getElementsByClassName("sn_ch")).forEach((r) => {
      const o = JSON.parse(
        r.dataset.add ?? // 通常文字
        r.children[0]?.getAttribute("data-add") ?? // ルビ
        r.children[0]?.children[0]?.getAttribute("data-add") ?? "{}"
        // 縦中横
      );
      if (!o.ch_out_style) return;
      const a = F.#D[o.ch_out_style];
      if (a) {
        if (a.wait === 0) {
          r.style.display = "none";
          return;
        }
        s += a.wait, a.join || (r.style.animationDelay = "0ms"), r.classList.add(`go_ch_out_${o.ch_out_style}`);
      }
    });
    const i = () => {
      e.parentElement.removeChild(e);
      for (const r of this.#o.removeChildren())
        r instanceof G && F.#s.unButton(r), r.destroy();
    };
    s === 0 ? (this.#i.textContent = "", i()) : e.lastElementChild?.addEventListener("animationend", i, { once: !0 }), this.#i = t;
  }
  reNew() {
    this.#J();
    const t = new F(this.ctn, () => this.canFocus(), this.sys);
    return t.#r = this.#r, t.#i.style.cssText = this.#i.style.cssText, t.#f = this.#f, t.name = this.name, t.#u(), t.#P = this.#P, t.#T = this.#T, t.#_ = this.#_, this.#h.reNew(t.#h), this.destroy(), t;
  }
  #P = void 0;
  // 文字にかけるフィルター
  record() {
    return {
      infTL: this.#r,
      cssText: this.#i.style.cssText,
      left: this.#f,
      //		idc_hArg	: this.#idc.gethArg(),
      ch_filter: this.#P,
      fi_easing: this.#T,
      fo_easing: this.#_,
      hyph: this.#h.record()
    };
  }
  playback(t) {
    this.#r = t.infTL, this.position.set(this.#r.pad_left, this.#r.pad_top), this.#i.style.cssText = t.cssText, this.#f = t.left, this.#u(), this.#P = t.ch_filter, this.#T = t.fi_easing, this.#_ = t.fo_easing, this.#h.playback(t.hyph);
  }
  get cssText() {
    return this.#i.style.cssText;
  }
  set cssText(t) {
    this.#i.style.cssText = t;
  }
  #w = void 0;
  snapshot(t, e) {
    this.#l((s) => {
      this.#w = Z.from(s), this.#p && (this.#w.x += S.stageW - (this.#f + this.#r.$width)), this.#w.y -= this.#b, this.#w.texture.frame = new Ot(
        0,
        0,
        Math.min(this.#w.width, this.#r.$width - this.#f),
        Math.min(this.#w.height, this.#r.$height)
      ), this.#o.addChild(this.#w), t.render(this.#w, { clear: !1 }), e();
    }, !1);
  }
  snapshot_end() {
    this.#w && (this.#o.removeChild(this.#w), this.#w = void 0);
  }
  makeDesignCast(t) {
  }
  showDesignCast() {
  }
  //	showDesignCast() {this.#idc.visible = true; this.#idcCh.visible = true}
  dump() {
    const t = [], e = this.#i.style, s = e.length;
    for (let i = 0; i < s; ++i) {
      const r = e[i];
      t.push(`"${r}":"${e[r].replaceAll(/(["\\])/g, "\\$1")}"`);
    }
    return `"txt":"${this.#i.textContent.replaceAll(/(["\\])/g, "\\$1")}", "style":{${t.join(",")}}`;
  }
  destroy() {
    F.delBreak(), this.#i.parentElement.removeChild(this.#i), this.removeChild(this.#o), this.removeChild(this.#c), super.destroy();
  }
}
class it extends G {
  constructor(t, e, s, i) {
    if (super(), this.hArg = t, this.evtMng = e, this.resolve = s, this.canFocus = i, this.#i = {
      type: "pic",
      enabled: C(t, "enabled", !0),
      x: this.x = Ct(t.left ?? 0),
      y: this.y = Ct(t.top ?? 0),
      rotation: this.angle = E(t, "rotation", this.angle),
      // flash : rotation is in degrees.
      // pixijs: rotation is in radians, angle is in degrees.
      pivot_x: this.pivot.x = E(t, "pivot_x", this.pivot.x),
      pivot_y: this.pivot.y = E(t, "pivot_y", this.pivot.y),
      scale_x: this.scale.x = E(t, "scale_x", this.scale.x),
      scale_y: this.scale.y = E(t, "scale_y", this.scale.y),
      alpha: 1,
      text: "",
      b_pic: "",
      width: 0,
      height: 0
    }, this.getBtnBounds = () => (this.#s.x = this.#i.x, this.#s.y = this.#i.y, this.#s), this.#i.enabled && e.button(t, this, () => this.normal(), () => this.#c(), () => this.#g()), t.pic) {
      this.#i.type = "pic", this.#n = new $(
        t.pic,
        this,
        (u) => {
          this.#h(u), this.#s.width = u.width * this.#i.scale_x, this.#s.height = u.height * this.#i.scale_y;
        },
        (u) => s
      );
      return;
    }
    if (!t.text) throw "textまたはpic属性は必須です";
    const r = E(t, "height", 30), o = new ii({
      align: "center",
      dropShadow: !0,
      dropShadowAlpha: 0.7,
      dropShadowColor: "white",
      dropShadowBlur: 7,
      dropShadowDistance: 0,
      fill: this.#i.enabled ? "black" : "gray",
      fontFamily: it.fontFamily,
      fontSize: r,
      padding: 5
    });
    if (t.style) try {
      const u = JSON.parse(t.style);
      for (const [m, p] of Object.entries(u)) o[m] = p;
      this.#i = { ...this.#i, ...u };
    } catch (u) {
      throw u instanceof SyntaxError ? new Error(_e(t, "style", u.message)) : "fn:Button.ts style";
    }
    const a = new ni(t.text ?? "", o);
    a.alpha = E(t, "alpha", a.alpha), a.width = E(t, "width", 100), a.height = t.height = r, this.setText = (u) => a.text = u, this.#i = {
      ...this.#i,
      type: "text",
      // dump用
      alpha: a.alpha,
      text: a.text,
      width: a.width,
      height: a.height
    };
    let c = !1;
    if (this.#i.width = this.width, this.#i.height = this.height, t.b_pic && (this.#i.b_pic = t.b_pic, this.#n = new $(
      t.b_pic,
      this,
      (u) => {
        this.#o(u, a), this.#i.width = this.width, this.#i.height = this.height, a.name = JSON.stringify(this.#i);
      },
      (u) => {
        st.setBlendmode(this, t), u && s();
      }
    ), c = this.#n.ret), a.name = JSON.stringify(this.#i), this.addChild(a), this.#s.width = a.width, this.#s.height = a.height, t.b_pic || st.setBlendmode(this, t), it.#e(this, a), !this.#i.enabled) {
      c || s();
      return;
    }
    const h = o.clone();
    if (t.style_hover) try {
      const u = JSON.parse(t.style_hover);
      for (const [m, p] of Object.entries(u)) h[m] = p;
    } catch (u) {
      throw u instanceof SyntaxError ? new Error(_e(t, "style_hover", u.message)) : "fn:Button.ts style_hover";
    }
    else h.fill = "white";
    const l = h.clone();
    if (t.style_clicked) try {
      const u = JSON.parse(t.style_clicked);
      for (const [m, p] of Object.entries(u)) l[m] = p;
    } catch (u) {
      throw u instanceof SyntaxError ? new Error(_e(t, "style_clicked", u.message)) : "fn:Button.ts style_clicked";
    }
    else l.dropShadow = !1;
    this.normal = () => a.style = o, this.#c = () => i() ? (a.style = h, !0) : !1, this.#g = () => a.style = l, c || s();
  }
  static fontFamily = "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif";
  static #e = (t, e) => {
  };
  static #t = (t, e, s, i) => {
  };
  static init(t) {
    t.oCfg.debug.masume && (it.#e = (e, s) => e.addChild(
      new gt().beginFill(8926088, 0.2).lineStyle(1, 8926088, 1).drawRect(s.x, s.y, s.width, s.height).endFill()
    ), it.#t = (e, s, i, r) => e.addChild(
      new gt().beginFill(8926088, 0.2).lineStyle(1, 8926088, 1).drawRect(s.x, s.y, i, r).endFill()
    ));
  }
  setText(t) {
  }
  getBtnBounds = () => this.#s;
  // 文字ボタンは背景画像を含まない位置指定なので、その当たり判定用
  #s = new Ot();
  #n = new $();
  //	#idc		: DesignCast;
  #i;
  destroy() {
    this.evtMng.unButton(this), this.#n.destroy(), super.destroy();
  }
  makeDesignCast(t) {
  }
  showDesignCast() {
  }
  //	showDesignCast() {this.#idc.visible = true}
  cvsResize() {
  }
  #o(t, e) {
    this.setChildIndex(t, 0), t.alpha = e.alpha, t.setTransform(
      e.x,
      e.y,
      1,
      1,
      e.rotation,
      0,
      0,
      (t.width - e.width) / 2,
      (t.height - e.height) / 2
    ), t.name = e.name;
  }
  normal = () => {
  };
  #c = () => !1;
  #g = () => {
  };
  #h(t) {
    this.#i.alpha = t.alpha = E(this.hArg, "alpha", t.alpha);
    const e = t.width / 3, s = this.#i.enabled ? e : t.width, i = t.height, r = t.texture.baseTexture, o = new vt(r, new Ot(0, 0, e, i)), a = new vt(r, new Ot(e, 0, e, i)), c = new vt(r, new Ot(e * 2, 0, e, i)), h = () => t.texture = o;
    this.#i.enabled && h(), this.normal = h, this.#c = () => this.canFocus() ? (t.texture = c, !0) : !1, this.#g = () => t.texture = a, "width" in this.hArg ? (this.#i.width = Ct(this.hArg.width), this.scale.x *= this.#i.width / s) : this.#i.width = s, "height" in this.hArg ? (this.#i.height = Ct(this.hArg.height), this.scale.y *= this.#i.height / i) : this.#i.height = i, t.name = JSON.stringify(this.#i), it.#t(this, t, s, i);
  }
}
class se {
  constructor(t, e, s, i, r, o, a, c) {
    this.cls = e, this.hArg = r, this.sys = o, this.val = a, this.ret = c;
    const h = o.hFactoryCls[e];
    if (!h) throw `属性 class【${e}】が不正です`;
    const l = h(), u = h();
    l.layname = u.layname = t;
    const m = r[":id_tag"] = `layer:${t} cls:${e} page:`;
    l.ctn.name = l.name = m + "A", u.ctn.name = u.name = m + "B", s.addChild(l.ctn), i.addChild(u.ctn), C(r, "visible", !0), C(r, "visible", !0), c.isWait = l.lay(r) || u.lay(r), this.#e = { fore: l, back: u };
    const p = `const.sn.lay.${t}`;
    a.setVal_Nochk("tmp", p, !0), a.defTmp(p + ".fore.alpha", () => this.#e.fore.alpha), a.defTmp(p + ".back.alpha", () => this.#e.back.alpha), a.defTmp(p + ".fore.height", () => this.#e.fore.height), a.defTmp(p + ".back.height", () => this.#e.back.height), a.defTmp(p + ".fore.visible", () => this.#e.fore.ctn.visible), a.defTmp(p + ".back.visible", () => this.#e.back.ctn.visible), a.defTmp(p + ".fore.width", () => this.#e.fore.width), a.defTmp(p + ".back.width", () => this.#e.back.width), a.defTmp(p + ".fore.x", () => this.#e.fore.x), a.defTmp(p + ".back.x", () => this.#e.back.x), a.defTmp(p + ".fore.y", () => this.#e.fore.y), a.defTmp(p + ".back.y", () => this.#e.back.y);
  }
  #e;
  destroy() {
    this.#e.fore.destroy(), this.#e.back.destroy();
  }
  lay = (t) => this.getPage(t).lay(t);
  getPage = (t) => se.argChk_page(t, "fore") !== "back" ? this.#e.fore : this.#e.back;
  static argChk_page(t, e) {
    const s = t.page ?? e;
    if (s === "fore" || s === "back") return t.page = s;
    throw Error("属性 page【" + s + "】が不正です");
  }
  get fore() {
    return this.#e.fore;
  }
  get back() {
    return this.#e.back;
  }
  transPage(t) {
    [this.#e.back, this.#e.fore] = [this.#e.fore, this.#e.back], this.#e.back.copy(this.#e.fore, t);
  }
}
class He {
  //	static	readonly	#alzTagArg	= new AnalyzeTagArg;
  constructor(t, e = !1) {
    this.bg_col = t, this.isLay = e;
  }
  static init(t, e, s, i, r, o) {
  }
  static cvsResizeDesign() {
  }
  destroy() {
  }
  gethArg() {
    return this.hArg;
  }
  hArg = {};
  sethArg(t) {
    this.hArg = t;
  }
  setOther(t) {
  }
  adopt(t) {
  }
  static enterMode() {
  }
  static allHide() {
  }
  set visible(t) {
  }
  static leaveMode() {
  }
  cvsResize() {
  }
  make() {
  }
  static replaceToken(t) {
  }
}
class Li extends He {
  constructor(t, e) {
    super("#29e", !0);
  }
  setSp(t) {
  }
}
class yt extends st {
  static #e = new ue();
  static #t;
  static init(t, e, s, i, r, o) {
    yt.#t = s, $.init(e, o, i, t, r);
  }
  static destroy() {
    yt.#e.clear(), $.destroy();
  }
  #s = new Li(this.ctn, this);
  constructor() {
    super(), S.isDbg && (this.#n = (t) => this.#s.setSp(t), this.cvsResize = () => {
      super.cvsResize(), this.#s.cvsResize();
    });
  }
  #n = () => {
  };
  #i = "";
  #o = "";
  #c = "";
  lay = (t) => {
    const e = g.procID + `GrpLayer lay name:${this.name_}`, s = this.#g(t, (i) => {
      i && g.endProc(e);
    });
    return s && g.beginProc(e), s;
  };
  #g(t, e) {
    const { fn: s, face: i = "" } = t;
    if (this.#s.sethArg(t), !s)
      return super.lay(t), this.ctn.children.length > 0 && this.setPos(t), this.#o = "", this.#i = this.#c = i, e(!1), !1;
    const r = "fn" in t, o = "face" in t;
    return this.clearLay({ clear_filter: C(t, "clear_filter", !0) }), r && (this.#o = s), o && (this.#c = i), super.lay(t), t.dx = 0, t.dy = 0, this.#h.destroy(), this.#h = new $(
      this.#i = s + (i ? "," + i : ""),
      this.ctn,
      (a) => {
        ("width" in t || "height" in t) && (a.width = E(t, "width", 0), a.height = E(t, "height", 0)), this.#r = a.width, this.#d = a.height, st.setXY(a, t, this.ctn, !0), st.setBlendmode(this.ctn, t), this.#n(a);
      },
      (a) => e(a)
    ), this.#h.ret;
  }
  #h = new $();
  #r = 0;
  #d = 0;
  get width() {
    return this.#r;
  }
  get height() {
    return this.#d;
  }
  renderStart() {
    this.#f = new Z(this.#u), this.#f.visible = !1, this.ctn.addChildAt(this.#f, 0), this.#f.position.set(-this.ctn.x, -this.ctn.y);
    let t = () => {
      const e = this.ctn.alpha;
      this.ctn.alpha = 1;
      for (const s of this.ctn.children) s.visible = !0;
      this.#f.visible = !1, yt.#t.renderer.render(this.ctn, { renderTexture: this.#u }), this.ctn.alpha = e;
      for (const s of this.ctn.children) s.visible = !1;
    };
    if (!this.containMovement) {
      let e = t;
      t = () => {
        t = () => {
        }, e();
      };
    }
    this.#p = () => {
      t(), this.#f.visible = !0;
    }, yt.#t.ticker.add(this.#p);
  }
  #u = Qt.create({
    width: S.stageW,
    height: S.stageH
  });
  #f = new Z();
  #p = () => {
  };
  renderEnd() {
    yt.#t.ticker.remove(this.#p), this.ctn.removeChild(this.#f);
    for (const t of this.ctn.children) t.visible = !0;
    this.#f.destroy(!0), this.#u = Qt.create({
      width: S.stageW,
      height: S.stageH
    });
  }
  setPos(t) {
    st.setXY(
      this.ctn.children[0] ?? this.ctn,
      t,
      this.ctn,
      !0
    );
  }
  // アニメ・動画を含むか
  get containMovement() {
    if (this.#i === "") return !1;
    const t = this.ctn.children;
    return this.#i.split(",").some(
      (e, s) => t[s] instanceof Es || $.getHFn2VElm(e)
    );
  }
  clearLay(t) {
    super.clearLay(t), this.#h.destroy(), this.#o = "", this.#c = "", this.#i = "";
  }
  record = () => ({
    ...super.record(),
    sBkFn: this.#o,
    sBkFace: this.#c
    //		idc_hArg	: this.#idc.gethArg(),
  });
  playback(t, e) {
    if (super.playback(t, e), t.sBkFn === "" && t.sBkFace === "") {
      this.#o = "", this.#c = "";
      return;
    }
    e.push(new Promise((s) => this.#g(
      { fn: t.sBkFn, face: t.sBkFace, left: t.x, top: t.y, alpha: t.alpha, blendmode: st.getNum2Blendmode(t.blendMode), rotation: t.rotation, scale_x: t.scale_x, scale_y: t.scale_y },
      (i) => {
        this.ctn.position.set(t.x, t.y), s();
      }
      // Layer.setXY()の後に再度移動
    )));
  }
  makeDesignCast(t) {
    this.ctn.visible && t(this.#s);
  }
  //makeDesignCastChildren(_gdc: IMakeDesignCast) {}
  cvsResize() {
    super.cvsResize();
  }
  showDesignCast() {
    this.#s.visible = !0;
  }
  //showDesignCastChildren() {}
  dump = () => super.dump() + `, "pic":"${this.#i}"`;
}
class j {
  constructor(t, e, s) {
    this.appPixi = e, this.val = s, t.add_frame = (i) => this.#c(i), t.let_frame = (i) => this.#f(i), t.set_frame = (i) => this.#p(i), t.frame = (i) => this.#b(i), t.tsy_frame = (i) => this.#l(i);
  }
  static #e;
  static #t;
  static #s;
  static init(t, e, s) {
    j.#e = t, j.#t = e, j.#s = s;
  }
  #n;
  setEvtMng(t) {
    this.#n = t;
  }
  #i = /* @__PURE__ */ Object.create(null);
  destroy() {
    for (const t of Object.values(this.#i)) t.parentElement.removeChild(t);
    this.#i = /* @__PURE__ */ Object.create(null);
  }
  hideAllFrame() {
    for (const [t, { style: e }] of Object.entries(this.#i))
      this.#o[t] = e.display !== "none", e.display = "none";
  }
  #o = /* @__PURE__ */ Object.create(null);
  restoreAllFrame() {
    for (const [t, e] of Object.entries(this.#o)) {
      const s = this.#i[t];
      s && (s.style.display = e ? "inline" : "none");
    }
    this.#o = /* @__PURE__ */ Object.create(null);
  }
  //	HTMLフレーム
  // フレーム追加
  #c(t) {
    const { id: e, src: s, alpha: i = 1, scale_x: r = 1, scale_y: o = 1, rotate: a = 0 } = t;
    if (!e) throw "idは必須です";
    if (!s) throw "srcは必須です";
    const c = "const.sn.frm." + e;
    if (this.val.getVal(`tmp:${c}`)) throw `frame【${e}】はすでにあります`;
    const h = C(t, "visible", !0), l = t.b_color ? ` background-color: ${t.b_color};` : "", u = this.#h(t);
    j.#s.cvs.insertAdjacentHTML("beforebegin", `<iframe id="${e}" style="opacity: ${i}; ${l} position: absolute; left:${j.#t.ofsLeft4elm + u.x * j.#t.cvsScale}px; top: ${j.#t.ofsTop4elm + u.y * j.#t.cvsScale}px; z-index: 1; border: 0px; overflow: hidden; display: ${h ? "inline" : "none"}; transform: scale(${r}, ${o}) rotate(${a}deg);" width="${u.width * j.#t.cvsScale}" height="${u.height * j.#t.cvsScale}"></iframe>`);
    const m = g.procID + `add_frame id:${e}`;
    g.beginProc(m);
    const p = j.#e.searchPath(s, A.HTML), d = new Et().add({ name: s, url: p, xhrType: M.XHR_RESPONSE_TYPE.TEXT });
    return j.#t.arg.crypto && d.use(async (y, _) => {
      try {
        y.data = await j.#t.dec(y.extension, y.data);
      } catch (f) {
        j.#s.errScript(`[add_frame]Html ロード失敗です src:${y.name} ${f}`, !1);
      }
      _();
    }), d.load((y, _) => {
      const f = document.getElementById(e);
      this.#i[e] = f, this.#g[e] = !1;
      const v = p.lastIndexOf("/") + 1, P = p.slice(0, v), w = P.slice(0, v);
      f.srcdoc = String(_[s]?.data).replace("sn_repRes();", "").replaceAll(
        /\s(?:src|href)=(["'])(\S+?)\1/g,
        // 【\s】が大事、data-src弾く
        (b, x, O) => O.startsWith("../") ? b.replace("../", w) : b.replace("./", "").replace(x, x + P)
      ), f.srcdoc.includes("true/*WEBP*/;") && (f.srcdoc = f.srcdoc.replaceAll(
        /data-src="(.+?\.)(?:jpe?g|png)/g,
        (b, x) => `data-src="${x}webp`
      )), f.onload = () => {
        g.endProc(m), this.val.setVal_Nochk("tmp", c, !0), this.val.setVal_Nochk("tmp", c + ".alpha", i), this.val.setVal_Nochk("tmp", c + ".x", u.x), this.val.setVal_Nochk("tmp", c + ".y", u.y), this.val.setVal_Nochk("tmp", c + ".scale_x", r), this.val.setVal_Nochk("tmp", c + ".scale_y", o), this.val.setVal_Nochk("tmp", c + ".rotate", a), this.val.setVal_Nochk("tmp", c + ".width", u.width), this.val.setVal_Nochk("tmp", c + ".height", u.height), this.val.setVal_Nochk("tmp", c + ".visible", h);
        const b = f.contentWindow;
        this.#n.resvFlameEvent(b), b.sn_repRes?.((x) => j.#r(x.dataset.src ?? "", x));
      };
    }), !0;
  }
  #g = {};
  getFrmDisabled(t) {
    return this.#g[t];
  }
  #h(t) {
    const e = { ...t }, s = j.#t.resolution;
    return new DOMRect(
      E(e, "x", 0) * s,
      E(e, "y", 0) * s,
      E(e, "width", S.stageW) * s,
      E(e, "height", S.stageH) * s
    );
  }
  static #r(t, e, s) {
    const i = this.#u[t];
    if (i) {
      e.src = i, s && (e.onload = () => s(e));
      return;
    }
    const r = this.#d[t];
    if (r) {
      r.push(e);
      return;
    }
    this.#d[t] = [e];
    const [o = "", a = ""] = t.split("?"), c = j.#e.searchPath(o, A.SP_GSM), h = new Et().add({ name: t, url: c, xhrType: M.XHR_RESPONSE_TYPE.BUFFER });
    j.#t.arg.crypto && c.endsWith(".bin") && h.use(async (l, u) => {
      try {
        const m = await j.#t.decAB(l.data);
        if (l.extension !== "bin") {
          u();
          return;
        }
        l.data = m, m instanceof HTMLImageElement && (l.type = M.TYPE.IMAGE);
      } catch (m) {
        j.#s.errScript(`FrameMng loadPic ロード失敗です fn:${l.name} ${m}`, !1);
      }
      u();
    }), h.load((l, u) => {
      for (const [m, { data: { src: p } }] of Object.entries(u)) {
        const d = this.#u[m] = p + (p.startsWith("blob:") || p.startsWith("data:") ? "" : a ? "?" + a : ""), y = this.#d[m];
        if (y) for (const _ of y)
          _.src = d, s && (_.onload = () => s(_));
        delete this.#d[m];
      }
    });
  }
  static #d = {};
  static #u = {};
  cvsResize() {
    for (const [t, e] of Object.entries(this.#i)) {
      const s = "const.sn.frm." + t, i = Number(this.val.getVal(s + ".x")), r = Number(this.val.getVal(s + ".y")), o = Number(this.val.getVal(s + ".width")), a = Number(this.val.getVal(s + ".height"));
      e.style.left = `${j.#t.ofsLeft4elm + i * j.#t.cvsScale}px`, e.style.top = `${j.#t.ofsTop4elm + r * j.#t.cvsScale}px`, e.width = String(o * j.#t.cvsScale), e.height = String(a * j.#t.cvsScale);
    }
  }
  // フレーム変数を取得
  #f(t) {
    const { id: e, var_name: s } = t;
    if (!e) throw "idは必須です";
    const i = document.getElementById(e);
    if (!i) throw `id【${e}】はフレームではありません`;
    const r = "const.sn.frm." + e;
    if (!this.val.getVal(`tmp:${r}`)) throw `frame【${e}】が読み込まれていません`;
    if (!s) throw "var_nameは必須です";
    const o = i.contentWindow;
    if (!Object.hasOwn(o, s)) throw `frame【${e}】に変数/関数【${s}】がありません。変数は var付きにして下さい`;
    const a = o[s];
    return this.val.setVal_Nochk(
      "tmp",
      r + "." + s,
      C(t, "function", !1) ? a() : a
    ), !1;
  }
  // フレーム変数に設定
  #p(t) {
    const { id: e, var_name: s, text: i } = t;
    if (!e) throw "idは必須です";
    const r = document.getElementById(e);
    if (!r) throw `id【${e}】はフレームではありません`;
    const o = "const.sn.frm." + e;
    if (!this.val.getVal(`tmp:${o}`)) throw `frame【${e}】が読み込まれていません`;
    if (!s) throw "var_nameは必須です";
    if (!i) throw "textは必須です";
    this.val.setVal_Nochk("tmp", o + "." + s, i);
    const a = r.contentWindow;
    return a[s] = i, !1;
  }
  // フレームに設定
  #m = 1;
  #b(t) {
    const { id: e } = t;
    if (!e) throw "idは必須です";
    const s = document.getElementById(e);
    if (!s) throw `id【${e}】はフレームではありません`;
    const i = "const.sn.frm." + e;
    if (!this.val.getVal("tmp:" + i)) throw `frame【${e}】が読み込まれていません`;
    const r = s.style;
    if (C(t, "float", !1) ? r.zIndex = `${++this.#m}` : "index" in t ? r.zIndex = `${E(t, "index", 0)}` : t.dive && (r.zIndex = `-${++this.#m}`), "alpha" in t) {
      const a = r.opacity = String(t.alpha);
      this.val.setVal_Nochk("tmp", i + ".alpha", a);
    }
    const o = this.#h(t);
    if (("x" in t || "y" in t) && (r.left = `${j.#t.ofsLeft4elm + o.x * j.#t.cvsScale}px`, r.top = `${j.#t.ofsTop4elm + o.y * j.#t.cvsScale}px`, this.val.setVal_Nochk("tmp", i + ".x", o.x), this.val.setVal_Nochk("tmp", i + ".y", o.y)), "scale_x" in t || "scale_y" in t || "rotate" in t) {
      const a = E(t, "scale_x", 1), c = E(t, "scale_y", 1), h = E(t, "rotate", 0);
      r.transform = `scale(${a}, ${c}) rotate(${h}deg)`, this.val.setVal_Nochk("tmp", i + ".scale_x", a), this.val.setVal_Nochk("tmp", i + ".scale_y", c), this.val.setVal_Nochk("tmp", i + ".rotate", h);
    }
    if ("width" in t && (s.width = String(o.width * j.#t.cvsScale), this.val.setVal_Nochk("tmp", i + ".width", o.width)), "height" in t && (s.height = String(o.height * j.#t.cvsScale), this.val.setVal_Nochk("tmp", i + ".height", o.height)), "visible" in t) {
      const a = C(t, "visible", !0);
      r.display = a ? "inline" : "none", this.val.setVal_Nochk("tmp", i + ".visible", a);
    }
    if ("b_color" in t && (r.backgroundColor = t.b_color), "disabled" in t) {
      const a = this.#g[e] = C(t, "disabled", !0), c = s.contentDocument.body;
      for (const h of [
        ...Array.from(c.getElementsByTagName("input")),
        ...Array.from(c.getElementsByTagName("select"))
      ]) h.disabled = a;
    }
    return !1;
  }
  // フレームをトゥイーン開始
  #l(t) {
    const { id: e, alpha: s, x: i, y: r, scale_x: o, scale_y: a, rotate: c, width: h, height: l } = t;
    if (!e) throw "idは必須です";
    const u = document.getElementById(e);
    if (!u) throw `id【${e}】はフレームではありません`;
    const m = "const.sn.frm." + e;
    if (!this.val.getVal(`tmp:${m}`, 0)) throw `frame【${e}】が読み込まれていません`;
    const p = {};
    s && (p.a = u.style.opacity), (i || r || o || a || c) && (p.x = Number(this.val.getVal(`tmp:${m}.x`)), p.y = Number(this.val.getVal(`tmp:${m}.y`)), p.sx = Number(this.val.getVal(`tmp:${m}.scale_x`)), p.sy = Number(this.val.getVal(`tmp:${m}.scale_y`)), p.r = Number(this.val.getVal(`tmp:${m}.rotate`))), h && (p.w = this.val.getVal(`tmp:${m}.width`)), l && (p.h = this.val.getVal(`tmp:${m}.height`));
    const d = B.cnvTweenArg(t, p);
    let y = () => {
    };
    s && (E(d, "alpha", 0), y = () => {
      u.style.opacity = p.a, this.val.setVal_Nochk("tmp", "alpha", p.a);
    });
    let _ = () => {
    };
    const f = this.#h(d);
    (i || r || o || a || c) && (f.x, f.y, E(d, "scale_x", 1), E(d, "scale_y", 1), E(d, "rotate", 0), _ = () => {
      u.style.left = j.#t.ofsLeft4elm + p.x * j.#t.cvsScale + "px", u.style.top = j.#t.ofsTop4elm + p.y * j.#t.cvsScale + "px", u.style.transform = `scale(${p.sx}, ${p.sy}) rotate(${p.r}deg)`, this.val.setVal_Nochk("tmp", m + ".x", p.x), this.val.setVal_Nochk("tmp", m + ".y", p.y), this.val.setVal_Nochk("tmp", m + ".scale_x", p.sx), this.val.setVal_Nochk("tmp", m + ".scale_y", p.sy), this.val.setVal_Nochk("tmp", m + ".rotate", p.r);
    });
    let v = () => {
    };
    h && (f.width, v = () => {
      u.width = p.w * j.#t.cvsScale + "px", this.val.setVal_Nochk("tmp", m + ".width", p.w);
    });
    let P = () => {
    };
    return l && (f.height, P = () => {
      u.height = p.h * j.#t.cvsScale + "px", this.val.setVal_Nochk("tmp", m + ".height", p.h);
    }), this.appPixi.stage.interactive = !1, B.tween(`frm
${e}`, t, p, B.cnvTweenArg(t, p), () => {
      y(), _(), v(), P();
    }, () => this.appPixi.stage.interactive = !0, () => {
    }), !1;
  }
}
class $t {
  //MARK: コンストラクタ
  constructor(t, e, s, i, r, o, a, c, h) {
    this.cfg = t, this.hTag = e, this.appPixi = s, this.val = i, this.main = r, this.scrItr = o, this.sys = a, this.sndMng = c, this.prpPrs = h;
    const l = () => {
      if (a.cvsResize(), this.cvsResizeDesign(), this.#h) for (const d of this.#E)
        this.#a[d].fore.cvsResizeChildren();
      else for (const d of this.#E)
        this.#a[d].fore.cvsResize();
      this.#n.cvsResize(), this.#u.cvsResize();
    };
    if (S.isMobile)
      this.#o.add(globalThis, "orientationchange", l, { passive: !0 });
    else {
      let d;
      this.#o.add(globalThis, "resize", () => {
        d || (d = setTimeout(() => {
          d = void 0, l();
        }, 1e3 / 60 * 10));
      }, { passive: !0 });
    }
    a.cvsResize(), T.init(t, e, i, this, (d) => this.#a[d.layname].fore === d, s), yt.init(r, t, s, a, c, i), j.init(t, a, r), it.init(t), this.#n = new j(e, s, i), a.hFactoryCls.grp = () => new yt(), a.hFactoryCls.txt = () => new T(), e.loadplugin = (d) => this.#v(d), e.snapshot = (d) => this.#m(d), this.#b = this.sys.isApp ? this.#l : this.#S, e.add_lay = (d) => this.#y(d), e.clear_lay = (d) => this.#q(d), e.finish_trans = () => B.finish_trans(), e.lay = (d) => this.#W(d), e.trans = (d) => this.#J(d), e.wt = (d) => B.wt(d), e.quake = (d) => this.#R(d), e.stop_quake = e.finish_trans, e.wq = (d) => e.wt(d), e.pause_tsy = (d) => B.pause_tsy(d), e.resume_tsy = (d) => B.resume_tsy(d), e.stop_tsy = (d) => B.stop_tsy(d), e.tsy = (d) => this.#st(d), e.wait_tsy = (d) => B.wait_tsy(d), e.add_filter = (d) => this.#k(d), e.clear_filter = (d) => this.#A(d), e.enable_filter = (d) => this.#G(d), e.ch = (d) => this.#F(d), e.clear_text = (d) => this.#at(d), e.current = (d) => this.#z(d), e.endlink = (d) => this.#it(d), e.er = (d) => this.#ct(d), e.graph = (d) => this.#j(d), e.link = (d) => this.#lt(d), e.r = (d) => this.#nt(d), e.rec_ch = (d) => this.#rt(d), e.rec_r = (d) => this.#ht(d), e.reset_rec = (d) => this.#ut(d), e.ruby2 = (d) => this.#ft(d), e.span = (d) => this.#Z(d), e.tcy = (d) => this.#ot(d), e.add_face = (d) => $.add_face(d), e.wv = (d) => $.wv(d), e.dump_lay = (d) => this.#dt(d), e.enable_event = (d) => this.#pt(d), e.button = (d) => this.#mt(d), t.existsBreakline && (this.breakLine = (d) => {
      delete d.visible, d.id = "break", d.pic = "breakline";
      const y = encodeURIComponent(JSON.stringify(d));
      this.#p("grp｜" + y);
    }), t.existsBreakpage && (this.breakPage = (d) => {
      delete d.visible, d.id = "break", d.pic = "breakpage";
      const y = encodeURIComponent(JSON.stringify(d));
      this.#p("grp｜" + y);
    }), this.#i = ri(String(t.oCfg.init.bg_color));
    const u = new gt();
    u.beginFill(this.#i).lineStyle(0, this.#i).drawRect(0, 0, S.stageW, S.stageH).endFill(), this.#t.addChild(u.clone()), this.#s.addChild(u), this.#s.visible = !1, this.#t.name = "page:A", this.#s.name = "page:B", this.#e = s.stage, this.#e.addChild(this.#s), this.#e.addChild(this.#t), this.#e.addChild(this.#B), this.#e.addChild(this.#_), this.#e.name = "stage";
    const m = (d, y) => {
      this.#f(Number(y));
    };
    m("", i.getVal("sys:TextLayer.Back.Alpha", 1)), i.defValTrg("sys:TextLayer.Back.Alpha", m);
    const p = (d, y) => it.fontFamily = y;
    p("", i.getVal("tmp:sn.button.fontFamily", it.fontFamily)), i.defValTrg("tmp:sn.button.fontFamily", p), i.defTmp("const.sn.log.json", () => JSON.stringify(
      (this.#I.text = this.#I.text?.replaceAll("</span><span class='sn_ch'>", "") ?? "") ? [...this.#X, this.#I] : this.#X
    )), i.defTmp("const.sn.last_page_text", () => this.currentTxtlayFore?.pageText ?? ""), i.defTmp("const.sn.last_page_plain_text", () => this.currentTxtlayFore?.pagePlainText ?? ""), S.isDbg && (He.init(s, a, o, h, t, this.#a), this.cvsResizeDesign = () => He.cvsResizeDesign(), a.addHook((d, y) => {
      this.#c[d]?.(d, y) && delete this.#c[d];
    }));
  }
  #e;
  #t = new G();
  #s = new G();
  #n;
  #i;
  #o = new ue();
  cvsResizeDesign() {
  }
  #c = {
    attach: (t) => !1,
    continue: (t) => !1,
    disconnect: (t) => !1,
    _enterDesign: (t) => {
      for (const e of this.#E) {
        const s = this.#a[e].fore;
        s.makeDesignCastChildren((i) => i.make()), s.makeDesignCast((i) => i.make());
      }
      return this.#r(this.#$), !1;
    },
    _replaceToken: (t, e) => !1,
    _selectNode: (t, e) => (this.#r(e.node), !1)
  };
  #g = "";
  #h = "";
  #r(t) {
    [this.#g = "", this.#h = ""] = t.split("/");
    const e = this.#a[this.#g];
    e && (this.#h ? e.fore.showDesignCastChildren() : e.fore.showDesignCast());
  }
  getFrmDisabled = (t) => this.#n.getFrmDisabled(t);
  #d = void 0;
  cover(t, e = 0) {
    this.#d && (this.#e.removeChild(this.#d), this.#d.destroy(), this.#d = void 0), t && this.#e.addChild(
      (this.#d = new gt()).beginFill(e).lineStyle(0, e).drawRect(0, 0, S.stageW, S.stageH).endFill()
    );
  }
  #u;
  setEvtMng(t) {
    this.#u = t, this.#n.setEvtMng(t), $.setEvtMng(t), B.init(t, this.appPixi);
  }
  destroy() {
    for (const t of Object.values(this.#a)) t.destroy();
    this.#o.clear(), yt.destroy(), ct.destroy(), F.destroy(), T.destroy(), this.#n.destroy(), B.destroy(), $t.#L = 10;
  }
  // 既存の全文字レイヤの実際のバック不透明度、を再計算
  #f(t) {
    for (const { fore: e, back: s } of Object.values(this.#a))
      e instanceof T && (e.chgBackAlpha(t), s.chgBackAlpha(t));
  }
  #p = (t, e = this.currentTxtlayForeNeedErr, s = !0) => e.tagCh("｜&emsp;《" + t + "》");
  goTxt = () => {
  };
  get needGoTxt() {
    return this.currentTxtlayFore?.needGoTxt ?? !1;
  }
  breakLine = (t) => {
  };
  breakPage = (t) => {
  };
  clearBreak() {
    this.currentTxtlayFore && (this.clearBreak = () => this.#p("del｜break"), this.clearBreak());
  }
  clickTxtLay() {
    return this.currentTxtlayFore ? Object.values(this.#a).some((t) => t instanceof T && t.click()) : !1;
  }
  //	//	システム
  //MARK: スナップショット
  #m(t) {
    const e = oi("-", "_", "", "_"), s = t.fn ? t.fn.startsWith(ai) ? t.fn : `${hs + t.fn + e}.png` : `${hs}snapshot${e}.png`, i = this.cfg.searchPath(s), r = E(t, "width", S.stageW), o = E(t, "height", S.stageH);
    return this.#b(t, i, r, o, `snapshot dt:${e}`);
  }
  #b = () => !1;
  #l({ layer: t }, e, s, i, r) {
    if (this.#n.hideAllFrame(), g.beginProc(r), !t)
      return this.sys.capturePage(e, s, i, () => {
        this.#n.restoreAllFrame(), g.endProc(r);
      }), !0;
    const o = Object.values(this.#a).map(({ fore: { ctn: a } }) => {
      const c = [a, a.visible];
      return a.visible = !1, c;
    });
    for (const a of this.#P(t)) this.#a[a].fore.ctn.visible = !0;
    return this.sys.capturePage(e, s, i, () => {
      for (const [a, c] of o) a.visible = c;
      this.#n.restoreAllFrame(), g.endProc(r);
    }), !0;
  }
  #S(t, e, s, i, r) {
    g.beginProc(r);
    const o = Os(t, "b_color", this.#i), a = ci({
      width: s,
      height: i,
      backgroundAlpha: o > 16777216 && e.endsWith(".png") ? 0 : 1,
      antialias: C(t, "smoothing", !1),
      preserveDrawingBuffer: !0,
      backgroundColor: o & 16777215,
      autoDensity: !0
    }), c = t.page !== "back" ? "fore" : "back", { layer: h } = t;
    return Promise.allSettled(
      this.#P(h).map((l) => new Promise(
        (u) => this.#a[l][c].snapshot(a, u)
      ))
    ).then(async () => {
      const l = Qt.create({ width: a.width, height: a.height });
      a.render(this.#e, { renderTexture: l }), await this.sys.savePic(
        e,
        a.plugins.extract.base64(l)
      ), l.destroy();
      for (const u of this.#P(h)) this.#a[u][c].snapshot_end();
      a.destroy(!0), g.endProc(r);
    }), !0;
  }
  //MARK: プラグインの読み込み
  #v(t) {
    const { fn: e } = t;
    if (!e) throw "fnは必須です";
    if (!e.endsWith(".css")) throw "サポートされない拡張子です";
    const s = C(t, "join", !0), i = g.procID + `loadplugin fn:${e}`;
    return s && g.beginProc(i), (async () => {
      const r = await fetch(e);
      if (!r.ok) throw new Error("Network response was not ok.");
      Zt(await r.text()), s && g.endProc(i);
    })(), s;
  }
  //	//	レイヤ共通
  //MARK: レイヤを追加する
  #y(t) {
    const { layer: e, class: s } = t;
    if (!e) throw "layerは必須です";
    if (e.includes(",")) throw "layer名に「,」は使えません";
    if (e in this.#a) throw `layer【${e}】はすでにあります`;
    if (!s) throw "clsは必須です";
    const i = { isWait: !1 };
    switch (this.#a[e] = new se(e, s, this.#t, this.#s, t, this.sys, this.val, i), this.#E.push(e), s) {
      case "txt":
        this.#$ || (this.#H = () => {
        }, this.#x = this.#tt, this.#z = this.#K, this.hTag.current({ layer: e }), this.goTxt = () => {
          this.#u.isSkipping ? $t.#L = 0 : this.setNormalChWait();
          for (const { fore: r } of Object.values(this.#a))
            r instanceof T && this.#p("gotxt｜", r, !1);
        }), this.val.setVal_Nochk(
          "save",
          "const.sn.layer." + (e ?? this.#$) + ".enabled",
          !0
        );
        break;
      case "grp":
        if (this.#M) break;
        this.#M = e;
        break;
    }
    return this.scrItr.recodeDesign(t), i.isWait;
  }
  #a = {};
  // しおりLoad時再読込
  #E = [];
  // 最適化用
  #$ = "";
  #M = "";
  #W(t) {
    const e = this.#U(t), s = this.#a[e], i = s.back.ctn, r = s.fore.ctn;
    if (C(t, "float", !1))
      this.#s.setChildIndex(i, this.#s.children.length - 1), this.#t.setChildIndex(r, this.#t.children.length - 1), this.#N();
    else if (t.index)
      E(t, "index", 0) && (this.#s.setChildIndex(i, t.index), this.#t.setChildIndex(r, t.index), this.#N());
    else if (t.dive) {
      const { dive: o } = t;
      let a = 0;
      if (e === o) throw "[lay] 属性 layerとdiveが同じ【" + o + "】です";
      const c = this.#a[o];
      if (!c) throw "[lay] 属性 dive【" + o + "】が不正です。レイヤーがありません";
      const h = c.back, l = c.fore, u = this.#s.getChildIndex(h.ctn), m = this.#t.getChildIndex(l.ctn);
      a = u < m ? u : m, a > this.#s.getChildIndex(i) && --a, this.#t.setChildIndex(r, a), this.#s.setChildIndex(i, a), this.#N();
    }
    return t[":id_tag"] = s.fore.name.slice(0, -7), this.scrItr.recodeDesign(t), s.lay(t);
  }
  #N() {
    this.#E = this.#Y();
  }
  //MARK: レイヤ設定の消去
  #q(t) {
    return this.#w(t, (e) => {
      const s = this.#a[this.#U({ layer: e })];
      if (t.page === "both") {
        s.fore.clearLay(t), s.back.clearLay(t);
        return;
      }
      s.getPage(t).clearLay(t);
    }), !1;
  }
  //===================================================
  //MARK: WebGL フラグメントシェーダー GLSL
  static #D = (
    /* glsl */
    `
precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform sampler2D rule;
uniform float vague;
uniform float tick;

uniform vec4 inputPixel;
uniform highp vec4 outputFrame;
vec2 getUV(vec2 coord) {
	return coord * inputPixel.xy / outputFrame.zw;
}

void main() {
	vec4 fg = texture2D(uSampler, vTextureCoord);
	vec4 ru = texture2D(rule, getUV(vTextureCoord));

	float v = ru.r - tick;
	gl_FragColor = abs(v) < vague
		? vec4(fg.rgb, 1) *fg.a *(0.5 +v /vague *0.5)
		: 0.0 <= v ? fg : vec4(0);
}`
  );
  /*
  	末尾が読みづらいが、以下のif文を消して三項演算子にしている。
  
  	if (abs(v) < vague) {
  		float f_a = fg.a *(0.5 +v /vague *0.5);
  		gl_FragColor.rgb = fg.rgb *f_a;
  		gl_FragColor.a = f_a;
  		return;
  	}
  	gl_FragColor = v >= 0.0 ? fg : vec4(0);
  
  		★GLSL : don't use "if"｜Nobu note.com/nobuhirosaijo/n/n606a3f5d8e89
  			> if文はあまり使わない方がいいらしい (処理負荷が高い)
  */
  #O = Qt.create({
    width: S.stageW,
    height: S.stageH
  });
  #B = new Z(this.#O);
  #T = Qt.create({
    width: S.stageW,
    height: S.stageH
  });
  #_ = new Z(this.#T);
  //MARK: ページ裏表を交換
  #J(t) {
    B.finish_trans(), this.#u.hideHint();
    const { layer: e } = t, s = /* @__PURE__ */ new Set(), i = this.#P(e).map((b) => (s.add(b), this.#a[b].fore)), r = async () => {
      [this.#t, this.#s] = [this.#s, this.#t];
      const b = [];
      for (const [x, O] of Object.entries(this.#a)) {
        if (s.has(x)) {
          O.transPage(b);
          continue;
        }
        const { fore: { ctn: I }, back: { ctn: N } } = O, R = this.#t.getChildIndex(N);
        this.#t.removeChild(N), this.#s.removeChild(I), this.#t.addChildAt(I, R), this.#s.addChildAt(N, R);
      }
      await Promise.allSettled(b), this.#t.visible = !0, this.#s.visible = !1, this.#B.visible = !1, this.#_.visible = !1, g.notifyEndProc(be + jt);
    };
    if (this.#_.filters = [], this.#_.alpha = 1, E(t, "time", 0) === 0 || this.#u.isSkipping)
      return r(), !1;
    let a = [];
    const c = [];
    for (const [b, x] of Object.entries(this.#a)) {
      const O = s.has(b) ? x.back : x.fore;
      O.ctn.visible && a.push(O.ctn), c.push(O);
    }
    const { ticker: h, renderer: l } = this.appPixi;
    l.render(this.#s, { renderTexture: this.#O });
    let u = () => {
      for (const b of a) l.render(
        b,
        { renderTexture: this.#O, clear: !1 }
      );
    };
    if (!c.some((b) => b.containMovement)) {
      const b = u;
      u = () => {
        u = () => {
        }, b();
      };
    }
    const m = () => l.render(this.#t, { renderTexture: this.#T });
    m();
    let p = () => {
      this.#t.visible = !0, m(), this.#t.visible = !1;
    };
    if (!i.some((b) => b.containMovement)) {
      const b = p;
      p = () => {
        p = () => {
        }, b();
      };
    }
    const d = () => {
      u(), this.#B.visible = !0, p(), this.#_.visible = !0;
    }, { glsl: y, rule: _ } = t, f = async () => {
      h.remove(d), await r();
    };
    if (!y && !_)
      return B.tween(jt, t, this.#_, { alpha: 0 }, () => {
      }, f, () => {
      }), h.add(d), !1;
    const v = {
      rule: vt.EMPTY,
      vague: E(t, "vague", 0.04),
      tick: 0
    };
    this.#_.filters = [new li(
      void 0,
      y ?? $t.#D,
      v
    )];
    const P = B.tween(jt, t, v, { tick: 1 }, () => {
    }, f, () => {
    }, !_);
    if (!_)
      return h.add(d), !1;
    const w = new $(_, void 0, (b) => {
      v.rule = b.texture, b.destroy(), w.destroy(), P.start(), h.add(d);
    });
    return !1;
  }
  #P(t = "") {
    return t ? t.split(",") : this.#E;
  }
  #w(t, e) {
    const s = this.#P(t.layer);
    for (const i of s) {
      const r = this.#a[i];
      if (!r) throw "存在しないlayer【" + i + "】です";
      e(i, r);
    }
    return s;
  }
  #Y(t = "") {
    return this.#P(t).sort((e, s) => {
      const i = this.#t.getChildIndex(this.#a[e].fore.ctn), r = this.#t.getChildIndex(this.#a[s].fore.ctn);
      return i < r ? -1 : i > r ? 1 : 0;
    });
  }
  setAllStyle2TxtLay(t) {
    for (const { fore: e } of Object.values(this.#a))
      e instanceof T && e.lay({ style: t });
  }
  //MARK: 画面を揺らす
  #R(t) {
    if (B.finish_trans(), E(t, "time", NaN) === 0) return !1;
    const e = this.#P(t.layer).map((l) => this.#a[l].fore.ctn), { renderer: s, ticker: i } = this.appPixi;
    this.#T.resize(S.stageW, S.stageH);
    const r = () => {
      this.#t.visible = !0;
      for (const l of e) s.render(
        l,
        { renderTexture: this.#T, clear: !1 }
      );
      this.#t.visible = !1;
    };
    this.#_.visible = !0, this.#_.alpha = 1;
    const o = Ct(E(t, "hmax", 10)), a = Ct(E(t, "vmax", 10)), c = o === 0 ? () => {
    } : () => this.#_.x = Math.round(Math.random() * o * 2) - o, h = a === 0 ? () => {
    } : () => this.#_.y = Math.round(Math.random() * a * 2) - a;
    return this.#_.filters = [], B.tween(jt, t, this.#_, { x: 0, y: 0 }, () => {
      c(), h();
    }, () => {
      i.remove(r), this.#t.visible = !0, this.#_.visible = !1, this.#_.x = 0, this.#_.y = 0;
    }, () => {
    }), i.add(r), !1;
  }
  //MARK: トゥイーン開始
  #st(t) {
    const { layer: e, render: s, name: i } = t;
    if (!e) throw "layerは必須です";
    const r = this.#a[this.#U(t)], o = r.fore;
    let a = () => {
    };
    s && !this.#u.isSkipping && (o.renderStart(), a = () => o.renderEnd());
    const c = B.cnvTweenArg(t, o), h = C(t, "arrive", !1), l = C(t, "backlay", !1), u = r.back.ctn;
    return B.tween(i ?? e, t, o, B.cnvTweenArg(t, o), () => {
    }, a, () => {
      if (h && Object.assign(o, c), l) for (const m of Object.keys(B.hMemberCnt)) u[m] = o[m];
    }), "filter" in t && (o.ctn.filters = [st.bldFilters(t)], o.aFltHArg = [t]), !1;
  }
  //MARK: フィルター追加
  #k(t) {
    return B.finish_trans(), this.#w(t, (e) => {
      const s = this.#a[this.#U({ layer: e })];
      if (t.page === "both") {
        this.#Q(s.fore, t), this.#Q(s.back, t);
        return;
      }
      const i = s.getPage(t);
      this.#Q(i, t);
    }), !1;
  }
  #Q(t, e) {
    const s = t.ctn;
    s.filters ??= [], s.filters = [...s.filters, st.bldFilters(e)], t.aFltHArg.push(e);
  }
  //MARK: フィルター全削除
  #A(t) {
    return this.#w(t, (e) => {
      const s = this.#a[this.#U({ layer: e })];
      if (t.page === "both") {
        const r = s.fore, o = s.back;
        r.ctn.filters = null, o.ctn.filters = null, r.aFltHArg = [], o.aFltHArg = [];
        return;
      }
      const i = s.getPage(t);
      i.ctn.filters = null, i.aFltHArg = [];
    }), !1;
  }
  //MARK: フィルター個別切替
  #G(t) {
    return this.#w(t, (e) => {
      const s = this.#a[this.#U({ layer: e })];
      if (t.page === "both") {
        this.#V(s.fore, t), this.#V(s.back, t);
        return;
      }
      const i = s.getPage(t);
      this.#V(i, t);
    }), !1;
  }
  #V(t, e) {
    const s = t.ctn;
    if (!s.filters) throw "フィルターがありません";
    const i = Ct(E(e, "index", 0)), r = s.filters.length;
    if (r <= i) throw `フィルターの個数（${r}）を越えています`;
    t.aFltHArg[i].enabled = s.filters[i].enabled = C(e, "enabled", !0);
  }
  //	// 文字・文字レイヤ
  static #L = 10;
  static get msecChWait() {
    return $t.#L;
  }
  //MARK: 文字を追加する
  #F(t) {
    const { text: e } = t;
    if (!e) throw "textは必須です";
    const s = this.#x(t);
    delete t.text, this.setNormalChWait(), this.#u.isSkipping ? t.wait = 0 : "wait" in t && E(t, "wait", NaN);
    const i = encodeURIComponent(JSON.stringify(t));
    this.#p("add｜" + i, s);
    const r = C(t, "record", !0), o = this.val.doRecLog();
    return r || this.val.setVal_Nochk("save", "sn.doRecLog", r), s.tagCh(e.replaceAll("[r]", `
`)), this.val.setVal_Nochk("save", "sn.doRecLog", o), this.#p("add_close｜", s), !1;
  }
  #x = (t) => {
    throw this.#H(), 0;
  };
  #tt(t) {
    const e = this.#U(t, this.#$), i = this.#a[e].getPage(t);
    if (!(i instanceof T)) throw e + "はTxtLayerではありません";
    return i;
  }
  setNormalChWait() {
    $t.#L = this.scrItr.normalWait;
  }
  //MARK: 操作対象のメッセージレイヤの指定
  #z = (t) => {
    throw this.#H(), 0;
  };
  #K(t) {
    const { layer: e } = t;
    if (!e) throw "[current] layerは必須です";
    const s = this.#a[e];
    if (!s || !(s.getPage(t) instanceof T)) throw `${e}はTxtLayerではありません`;
    this.#C = s, this.recPagebreak(), this.#$ = e, this.val.setVal_Nochk("save", "const.sn.mesLayer", e);
    for (const [i, { fore: r, back: o }] of Object.entries(this.#a))
      r instanceof T && (r.isCur = o.isCur = i === e);
    return !1;
  }
  get currentTxtlayForeNeedErr() {
    return this.#H(), this.currentTxtlayFore;
  }
  get currentTxtlayFore() {
    return this.#C ? this.#C.fore : null;
  }
  #C;
  // カレントテキストレイヤ
  #H = () => {
    throw "文字レイヤーがありません。文字表示や操作する前に、[add_lay layer=（レイヤ名） class=txt]で文字レイヤを追加して下さい";
  };
  #U(t, e = "") {
    const s = t.layer ?? e;
    if (s.includes(",")) throw "layer名に「,」は使えません";
    if (!(s in this.#a)) throw "属性 layer【" + s + "】が不正です。レイヤーがありません";
    return t.layer = s;
  }
  #I = { text: "" };
  #X = [];
  recText(t) {
    this.#I = { text: t }, this.val.setVal_Nochk(
      "save",
      "const.sn.sLog",
      String(this.val.getVal("const.sn.log.json"))
      // これを起動したい
    );
  }
  recPagebreak() {
    this.#I.text && (this.#I.text = this.#I.text.replaceAll("</span><span class='sn_ch'>", ""), this.#X.push(this.#I) > this.cfg.oCfg.log.max_len && (this.#X = this.#X.slice(-this.cfg.oCfg.log.max_len)), this.#I = { text: "" });
  }
  //MARK: 文字消去
  #at(t) {
    const e = this.#x(t);
    return t.layer === this.#$ && t.page === "fore" && this.recPagebreak(), e.clearText(), !1;
  }
  //MARK: ハイパーリンクの終了
  #it(t) {
    return this.#p("endlink｜", this.#x(t)), !1;
  }
  //MARK: ページ両面の文字消去
  #ct(t) {
    return C(t, "rec_page_break", !0) && this.recPagebreak(), this.#C && (this.#C.fore.clearLay(t), this.#C.back.clearLay(t)), !1;
  }
  //MARK: インライン画像表示
  #j(t) {
    if (!t.pic) throw "[graph] picは必須です";
    const e = encodeURIComponent(JSON.stringify(t));
    return this.#p("grp｜" + e, this.#x(t)), !1;
  }
  //MARK: ハイパーリンク
  #lt(t) {
    if (!t.fn && !t.label && !t.url) throw "fn,label,url いずれかは必須です";
    t.fn ??= this.scrItr.scriptFn, t.style ??= "background-color: rgba(255,0,0,0.5);", t.style_hover ??= "background-color: rgba(255,0,0,0.9);", t.style_clicked ??= t.style;
    const e = encodeURIComponent(JSON.stringify(t));
    return this.#p("link｜" + e, this.#x(t)), !1;
  }
  //MARK: 改行
  #nt(t) {
    return t.text = `
`, this.#F(t);
  }
  //MARK: 履歴改行
  #ht(t) {
    return this.#rt({ ...t, text: "[r]" });
  }
  //MARK: 履歴書き込み
  #rt(t) {
    return this.#I = { ...t, text: this.#I.text }, t.text ? (t.record = !0, t.style ??= "", t.style += "display: none;", t.wait = 0, this.#F(t)) : !1;
  }
  //MARK: 履歴リセット
  #ut(t) {
    return this.#X = [], this.#I = { text: t.text ?? "" }, this.val.setVal_Nochk(
      "save",
      "const.sn.sLog",
      t.text ? `[{text:"${t.text}"}]` : "[]"
    ), !1;
  }
  //MARK: 文字列と複数ルビの追加
  #ft(t) {
    const { t: e, r: s } = t;
    if (!e) throw "[ruby2] tは必須です";
    if (!s) throw "[ruby2] rは必須です";
    return t.text = "｜" + encodeURIComponent(e) + "《" + encodeURIComponent(s) + "》", delete t.t, delete t.r, this.#F(t);
  }
  //MARK: インラインスタイル設定
  #Z(t) {
    const e = encodeURIComponent(JSON.stringify(t));
    return this.#p("span｜" + e, this.#x(t)), !1;
  }
  //MARK: tcy縦中横を表示する
  #ot(t) {
    if (!t.t) throw "[tcy] tは必須です";
    const e = encodeURIComponent(JSON.stringify(t));
    return this.#p("tcy｜" + e, this.#x(t)), !1;
  }
  //MARK: レイヤのダンプ
  #dt({ layer: t }) {
    console.group("🥟 [dump_lay]");
    for (const e of this.#P(t)) {
      const { fore: s, back: i } = this.#a[e];
      try {
        console.info(
          `%c${s.name.slice(0, -7)} %o`,
          `color:#${S.isDarkMode ? "49F" : "05A"};`,
          JSON.parse(`{"back":{${i.dump()}}, "fore":{${s.dump()}}}`)
        );
      } catch (r) {
        console.error("dump_lay err:%o", r), console.error(`   back:${i.dump()}`), console.error(`   fore:${s.dump()}`);
      }
    }
    return console.groupEnd(), !1;
  }
  //MARK: イベント有無の切替
  #pt(t) {
    const e = this.#U(t, this.#$), s = C(t, "enabled", !0);
    return this.#x(t).enabled = s, this.val.setVal_Nochk("save", "const.sn.layer." + e + ".enabled", s), !1;
  }
  //MARK: ボタンを表示
  #mt(t) {
    return se.argChk_page(t, "back"), t.fn ??= this.scrItr.scriptFn, this.#x(t).addButton(t), this.scrItr.recodeDesign(t), !1;
  }
  record() {
    const t = {};
    for (const e of this.#E) {
      const s = this.#a[e];
      t[e] = {
        cls: s.cls,
        fore: s.fore.record(),
        back: s.back.record()
      };
    }
    return t;
  }
  playback(t) {
    this.#X = JSON.parse(String(this.val.getVal("save:const.sn.sLog"))), this.#I = { text: "" };
    const e = [], s = [];
    for (const [r, { fore: o, fore: { idx: a }, back: c, cls: h }] of Object.entries(t)) {
      s.push({ ln: r, idx: a });
      const l = this.#a[r] ??= new se(r, h, this.#t, this.#s, {}, this.sys, this.val, { isWait: !1 });
      l.fore.playback(o, e), l.back.playback(c, e);
    }
    const i = this.#t.children.length;
    return e.push(new Promise((r) => {
      for (const { ln: o, idx: a } of s.sort(({ idx: c }, { idx: h }) => c === h ? 0 : c < h ? -1 : 1)) {
        const { fore: c, back: h } = this.#a[o];
        if (!c) continue;
        const l = i > a ? a : i - 1;
        this.#t.setChildIndex(c.ctn, l), this.#s.setChildIndex(h.ctn, l);
      }
      r();
    })), e;
  }
}
const Yn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LayerMng: $t
}, Symbol.toStringTag, { value: "Module" }));
class T extends st {
  static #e;
  static #t;
  static #s;
  static #n;
  static init(t, e, s, i, r, o) {
    T.#e = t, F.init(t, o), T.#t = s, T.#n = i, T.#s = r, s.setDoRecProc(T.chgDoRec), e.autowc = (a) => T.#d(a), e.autowc({ enabled: !1, text: "", time: 0 }), e.ch_in_style = (a) => T.#i(a), e.ch_out_style = (a) => T.#o(a), F.initChStyle(), hi(), Zt(
      t.matchPath(".+", A.FONT).flatMap((a) => Object.values(a).map((c) => `
@font-face {
	font-family: '${c}';
	src: url('${this.#e.searchPath(c, A.FONT)}');
}
`)).join("") + `
.sn_tx {
	pointer-events: none;
	user-select: none;
	-webkit-touch-callout: none;
	box-sizing: border-box;
}
.sn_ch {
	position: relative;
	display: inline-block;
}
`
      // 「sn_ch」と「sn_ch_in_〜」の中身が重複しているが、これは必須
    ), T.#i({
      name: "default",
      wait: 500,
      alpha: 0,
      x: "=0.3",
      y: "=0",
      scale_x: 1,
      scale_y: 1,
      rotate: 0,
      join: !0,
      ease: "ease-out"
    }), T.#o({
      name: "default",
      wait: 0,
      alpha: 0,
      x: "=0",
      y: "=0",
      scale_x: 1,
      scale_y: 1,
      rotate: 0,
      join: !1,
      ease: "ease-out"
    });
  }
  // 文字出現演出
  static #i(t) {
    const e = F.ch_in_style(t), s = e.x.startsWith("=") ? `${e.nx * 100}%` : `${e.nx}px`, i = e.y.startsWith("=") ? `${e.ny * 100}%` : `${e.ny}px`, { name: r } = t;
    return Zt(`
.sn_ch_in_${r} {
	position: relative;
	display: inline-block;
}
.go_ch_in_${r} {
	opacity: ${e.alpha};
	position: relative;
	display: inline-block;
	animation: sn_ch_in_${r} ${e.wait}ms ${e.ease} 0s both;
}
@keyframes sn_ch_in_${r} {
	from {transform: rotate(${e.rotate}deg) scale(${e.scale_x}, ${e.scale_y}) translate(${s}, ${i})}
	to {opacity: 1; transform: none;}
}
`), !1;
  }
  // 文字消去演出
  static #o(t) {
    const e = F.ch_out_style(t), s = e.x.startsWith("=") ? `${e.nx * 100}%` : `${e.nx}px`, i = e.y.startsWith("=") ? `${e.ny * 100}%` : `${e.ny}px`, { name: r } = t;
    return Zt(`
.go_ch_out_${r} {
	position: relative;
	display: inline-block;
	animation: go_ch_out_${r} ${e.wait}ms ${e.ease} 0s both;
}
@keyframes go_ch_out_${r} {
	to {
		opacity: ${e.alpha};
		transform: rotate(${e.rotate}deg) scale(${e.scale_x}, ${e.scale_y}) translate(${s}, ${i});
	}
`), !1;
  }
  static #c;
  static #g;
  static setEvtMng(t, e, s) {
    T.#c = t, T.#g = e, F.setEvtMng(t, s);
  }
  // 文字ごとのウェイト
  static #h = !1;
  static #r = {};
  static #d(t) {
    T.#h = C(t, "enabled", T.#h), T.#t.setVal_Nochk("save", "const.sn.autowc.enabled", T.#h);
    const { text: e } = t;
    if ("text" in t != "time" in t) throw "[autowc] textとtimeは同時指定必須です";
    if (T.#t.setVal_Nochk("save", "const.sn.autowc.text", e), !e)
      return T.#t.setVal_Nochk("save", "const.sn.autowc.time", ""), !1;
    const s = e.length;
    if (T.#h && s === 0) throw '[autowc] enabled === false かつ text === "" は許されません';
    const i = String(t.time).split(",");
    if (i.length !== s) throw "[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい";
    T.#r = {};
    for (let r = 0; r < s; ++r) T.#r[e[r]] = Ct(i[r]);
    return T.#t.setVal_Nochk("save", "const.sn.autowc.time", t.time), !1;
  }
  // バック
  #u = 0;
  #f = 0;
  #p = !1;
  #m = void 0;
  #b = "";
  // 背景画像無し（＝単色塗り）
  // 文字表示
  #l = new F(this.ctn, () => this.canFocus(), T.#g);
  #S = new ct();
  #v = document.createElement("span");
  // cssチェック・保存用
  static #y = {
    "text-align": 0,
    "text-align-last": 0,
    height: 0,
    width: 0,
    "padding-left": 0,
    "padding-right": 0,
    "padding-top": 0,
    "padding-bottom": 0
  };
  #a = new G();
  constructor() {
    super(), this.ctn.addChild(this.#l), this.#S.init(this.#Q), this.ctn.addChild(this.#a), this.#a.name = "cntBtn", this.lay({ style: `width: ${S.stageW}px; height: ${S.stageH}px; font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif; color: white; font-size: 24px; line-height: 1.5; padding: 16px;`, in_style: "default", out_style: "default", back_clear: "true" });
  }
  destroy() {
    this.#m && (this.ctn.removeChild(this.#m).destroy(), this.#m = void 0), T.#n.recPagebreak(), this.#l.destroy();
  }
  static destroy() {
    T.#h = !1, T.#r = {}, T.#P = (t) => t;
  }
  set name(t) {
    this.name_ = t, this.#l.name = t;
  }
  get name() {
    return this.name_;
  }
  // getは継承しないらしい
  cvsResize() {
    this.#l.cvsResize();
  }
  cvsResizeChildren() {
    for (const t of this.#a.children) t.cvsResize();
  }
  procSetX(t) {
    this.#l.lay({ x: t });
  }
  procSetY(t) {
    this.#l.lay({ y: t });
  }
  lay(t) {
    if (super.lay(t), st.setXY(this.ctn, t, this.ctn), t[":id_tag"] = this.name_.slice(0, -7), ct.setting(t), this.#O(t), this.#l.lay(t), "r_align" in t && (this.#R = t.r_align ?? ""), this.#w = S.isSafari ? this.#l.tategaki ? (i, r) => `text-align: start; height: ${r}em; padding-top: ${i}; padding-bottom: ${i};` : (i, r) => `text-align: start; width: ${r}em; padding-left: ${i}; padding-right: ${i};` : this.#l.tategaki ? (i) => `text-align: justify; text-align-last: justify; padding-top: ${i}; padding-bottom: ${i};` : (i) => `text-align: justify; text-align-last: justify; padding-left: ${i}; padding-right: ${i};`, S.isFirefox && (this.#Y = this.#st), "r_style" in t)
      if (t.r_style) {
        const i = document.createElement("span");
        i.style.cssText = t.r_style;
        const r = i.style.length, o = this.#v.style;
        for (let a = 0; a < r; ++a) {
          const c = i.style[a];
          if (c in T.#y) {
            at.myTrace(`${c}は指定できません`, "W");
            continue;
          }
          const h = i.style[c];
          h && (o[c] = h);
        }
      } else this.#v.style.cssText = "";
    if ("alpha" in t) for (const i of this.#a.children) i.alpha = this.ctn.alpha;
    this.#E(t), this.#W(t);
    const e = g.procID + `TxtLayer lay name:${this.name_}`, s = this.#D(t, (i) => {
      i && g.endProc(e);
    });
    return s && g.beginProc(e), s;
  }
  #E(t) {
    const { in_style: e } = t;
    if (!e) return;
    const s = F.getChInStyle(e);
    if (!s) throw `存在しないin_style【${e}】です`;
    this.#$ = e, this.#M = s.join;
  }
  #$ = "";
  #M = !0;
  get width() {
    return this.#l.getWidth;
  }
  get height() {
    return this.#l.getHeight;
  }
  #W(t) {
    const { out_style: e } = t;
    if (!e) return;
    if (!F.getChOutStyle(e)) throw `存在しないout_style【${e}】です`;
    this.#N = e;
  }
  #N = "";
  #q = new $();
  #D(t, e) {
    if ("back_clear" in t)
      return C(t, "back_clear", !1) && (this.#u = 0, this.#f = 0, this.#p = !1, this.#b = ""), e(!1), !1;
    this.#f = E(t, "b_alpha", this.#f), this.#p = C(t, "b_alpha_isfixed", this.#p);
    const s = (this.#p ? 1 : Number(T.#t.getVal("sys:TextLayer.Back.Alpha"))) * this.#f;
    if (t.b_pic) {
      if (this.#b !== t.b_pic)
        return this.#b = t.b_pic, this.#m && (this.ctn.removeChild(this.#m), this.#m.destroy()), this.#q = new $(this.#b, this.ctn, (i) => {
          this.#m = i, i.name = "back(pic)", i.visible = s > 0, i.alpha = s, this.#l.setMySize(i.width, i.height), this.ctn.setChildIndex(i, 0), e(!0);
        }), this.#q.ret;
    } else "b_color" in t && (this.#u = Os(t, "b_color", 0), this.#m && (this.ctn.removeChild(this.#m), this.#m.destroy()), this.#b = "", this.ctn.addChildAt(
      (this.#m = new gt()).beginFill(this.#u, s).lineStyle(void 0).drawRect(0, 0, this.#l.getWidth, this.#l.getHeight).endFill(),
      0
    ), this.#m.name = "back(color)");
    return this.#m && (this.#m.visible = s > 0, this.#m.alpha = s), e(!1), !1;
  }
  chgBackAlpha(t) {
    const e = this.#p ? this.#f : t * this.#f;
    this.#m instanceof gt && (this.#m && (this.ctn.removeChild(this.#m), this.#m.destroy()), this.ctn.addChildAt(
      (this.#m = new gt()).beginFill(this.#u, e).lineStyle(void 0).drawRect(0, 0, this.#l.getWidth, this.#l.getHeight).endFill(),
      0
    ), this.#m.name = "back(color)"), this.#m && (this.#m.visible = e > 0, this.#m.alpha = e);
  }
  #O(t) {
    "noffs" in t && (this.#_ = t.noffs ?? "", this.#J = new RegExp(`[　${this.#_}]`)), "ffs" in t && (this.#B ??= "", this.#T = this.#B === "" ? () => "" : (e) => this.#J.test(e) ? "" : ` font-feature-settings: ${this.#B};`);
  }
  #B = "";
  #T = (t) => "";
  #_ = "";
  #J = /[　]/;
  // Safariが全体に「font-feature-settings」した後、特定文字の「font-feature-settings: initial;」を受け付けてくれないのでわざわざ一つずつ指定
  static chgDoRec(t) {
    T.#P = t ? (e) => e : (e) => `<span class='offrec'>${e}</span>`;
  }
  static #P = (t) => t;
  isCur = !1;
  #w = () => "";
  #Y = (t, e, s, i = "") => {
    if (!s) return ` style='${i}'`;
    const r = t.length * 2;
    if (r - e.length < 0) return ` style='text-align: ${s}; ${i}'`;
    let o = "";
    switch (s) {
      case "justify":
        o = this.#w("0", r);
        break;
      case "121":
        o = this.#w(`calc(${(r - e.length) / (e.length * 2)}em)`, r);
        break;
      case "even":
        o = this.#w(`calc(${(r - e.length) / (e.length + 1)}em)`, r);
        break;
      case "1ruby":
        o = this.#w("1em", r);
        break;
      default:
        o = `text-align: ${s};`;
    }
    return ` style='${o} ${i}'`;
  };
  #R = "";
  #st(t, e, s, i = "") {
    if (!s) return ` style='${i}'`;
    const r = t.length * 2;
    if (r - e.length < 0) return ` style='text-align: ${s}; ${i}'`;
    let o = "";
    switch (s) {
      case "left":
        o = "ruby-align: start;";
        break;
      case "center":
        o = "ruby-align: center;";
        break;
      case "right":
        o = "ruby-align: start;";
        break;
      case "justify":
        o = "ruby-align: space-between;";
        break;
      case "121":
        o = "ruby-align: space-around;";
        break;
      case "even":
        const a = (r - e.length) / (e.length + 1);
        o = "ruby-align: space-between; " + (this.#l.tategaki ? `padding-top: ${a}em; padding-bottom: ${a}em;` : `padding-left: ${a}em; padding-right: ${a}em;`);
        break;
      case "1ruby":
        o = "ruby-align: space-between; " + (this.#l.tategaki ? "padding-top: 1em; padding-bottom: 1em;" : "padding-left: 1em; padding-right: 1em;");
        break;
      default:
        o = `text-align: ${s};`;
    }
    return ` style='${o} ${i}'`;
  }
  tagCh(t) {
    this.#S.putTxt(t);
  }
  #k = !1;
  get needGoTxt() {
    return this.#k;
  }
  #Q = (t, e) => {
    T.#e.oCfg.debug.putCh && console.log(`🖊 文字表示 text:\`${t}\`(${t.charCodeAt(0).toString(16)}) ruby:\`${e}\` name:\`${this.name_}\``);
    const s = e.split("｜");
    let i = "";
    const [r, ...o] = s, a = o.join("｜");
    switch (s.length) {
      case 1:
        if (this.#k = !0, t === `
`) {
          this.#L ? (this.#L = !1, i = "<ruby>&emsp;<rt>&emsp;</rt></ruby><br/>") : i = "<br/>";
          break;
        }
        this.#L && (this.#L = !1, e === "" && (e = "&emsp;")), i = this.#A(t, e, this.#R);
        break;
      default:
        switch (r) {
          // ルビ揃え指定と同時シリーズ
          case "start":
          // 初期値
          case "left":
          //（肩付き）先頭親文字から、ルビ間は密着
          case "center":
          //（中付き）センター合わせ、〃
          case "right":
          //（右／下揃え）末尾親文字から、〃
          case "justify":
          //（両端揃え）先頭から末尾親文字間に、ルビ間は均等にあける
          case "121":
          //（1-2-1(JIS)）ルビの前後を比率1、ルビ間を比率2であける
          case "even":
          //（均等アキ）ルビの前後、ルビ間も均等にあける
          case "1ruby":
            this.#L = !1, this.#k = !0, i = this.#A(t, a, r);
            break;
          case "gotxt":
            this.#z(), this.#k ? (this.isCur && T.#n.recText(
              this.#F.join("").replace(/^<ruby>&emsp;<rt>&emsp;<\/rt><\/ruby>(<br\/>)+/, "").replaceAll(/style='(anim\S+ [^;]+;\s*)+/g, "style='").replaceAll(/( style=''| data-(add|arg|cmd)='[^']+'|\n+|\t+)/g, "").replaceAll(/class='sn_ch[^']+/g, "class='sn_ch").replaceAll("display: none;", "").replaceAll("class='offrec'", "style='display: none;'")
              // 囲んだ領域は履歴で非表示
            ), this.#l.goTxt(this.#F, this.#V === 0), this.#k = !1, this.#V = 0) : this.isCur && this.#l.noticeCompTxt();
            return;
          // breakではない
          case "add":
            {
              const c = JSON.parse(a), { style: h = "", wait: l = null } = c, { cl: u, sty: m } = this.#G(!0, l);
              this.#F.push(`<span${u} style='${m} display: inline; ${h}'>`), delete c.style, this.#tt(c);
            }
            return;
          // breakではない
          case "add_close":
            this.#F.push("</span>"), this.#z();
            return;
          // breakではない
          case "grp":
            this.#k = !0;
            {
              const c = JSON.parse(a);
              if (c.id ??= this.#F.length, c.id === "break") {
                this.#l.dispBreak(c);
                return;
              }
              this.#L = !1, c.delay = this.#V, c.r ??= "", c.style ??= "", c.r_style ??= "";
              const { cl: h, sty: l, lnk: u } = this.#G(!0, c.wait);
              i = `<span${h} style='${l} ${c.style}'><ruby><span data-cmd='grp' data-arg='${JSON.stringify(c)}'${u} style='${l} display: inline;'>&emsp;</span><rt${u}${this.#Y(
                "　",
                c.r,
                this.#R,
                this.#v.style.cssText + (this.#x.at(-1)?.o.r_style ?? "") + c.r_style
              )}>${c.r}</rt></ruby></span>`;
            }
            break;
          case "tcy":
            this.#L = !1, this.#k = !0;
            {
              const { t: c, r: h = "", wait: l = null, style: u = "", r_style: m = "" } = JSON.parse(a);
              T.#t.doRecLog() && (this.#C += t + (e ? `《${e}》` : ""), this.#H += c);
              const p = S.isSafari ? h.replaceAll(/[A-Za-z0-9]/g, (f) => String.fromCharCode(f.charCodeAt(0) + 65248)) : h, { cl: d, sty: y, lnk: _ } = this.#G(!0, l);
              i = `<span${d} style='${y}${this.#T(c)} ${u}'><ruby><span${_} style='${y} display: inline; text-combine-upright: all;'>${c}</span><rt${_}${this.#Y(
                c,
                p,
                this.#R,
                this.#v.style.cssText + (this.#x.at(-1)?.o.r_style ?? "") + m
              )}>${p}</rt></ruby></span>`;
            }
            break;
          case "del":
            F.delBreak();
            return;
          // breakではない
          case "span":
            this.#k = !0, this.#K(JSON.parse(a));
            return;
          // breakではない
          case "link":
            this.#k = !0;
            {
              const c = JSON.parse(a);
              c[":link"] = " data-lnk='@'";
              const { cl: h, sty: l, curpos: u } = this.#G(!1, c.wait);
              this.#F.push(`<span${h} style='${l} display: inline; ${c.style ?? ""}' ${u} data-arg='${a}'>`), delete c.style, this.#K(c);
            }
            return;
          // breakではない
          case "endlink":
            this.#k = !0, this.#F.push("</span>"), this.#z();
            return;
          // breakではない
          default:
            this.#k = !0, i = this.#A(t, e, this.#R);
        }
        break;
    }
    this.#F.push(T.#P(i));
  };
  #A(t, e, s) {
    const i = t === " " ? "&nbsp;" : t === "　" ? "&emsp;" : t;
    T.#t.doRecLog() && (this.#C += i + (e ? `《${e}》` : ""), t !== " " && (this.#H += t));
    const { cl: r, sty: o, lnk: a } = this.#G(!0, null, t);
    return e ? `<span${r} style='${o} ${this.#T(t)}'><ruby>${// 文字個別に出現させるため以下にも ${cl} が必要
    Array.from(t).map((c, h) => `<span${r}${a} style='${h > 0 ? this.#G(!0, null, t).sty : o} display: inline;'>${c === " " ? "&nbsp;" : c === "　" ? "&emsp;" : c}</span>`).join("")}<rt${a}${this.#Y(
      t,
      e,
      s,
      this.#v.style.cssText + (this.#x.at(-1)?.o.r_style ?? "")
    )}>${e}</rt></ruby></span>` : `<span${r} style='${o} ${this.#T(t)}'${a}>${i}</span>`;
  }
  #G(t, e, s = `
`) {
    const i = this.#M ? e ?? this.#x.at(0)?.o.wait ?? (T.#h ? T.#r[s.at(0) ?? ""] ?? 0 : $t.msecChWait) : 0;
    T.#c.isSkipping ? this.#V = 0 : t && this.#M && (this.#V += Number(i));
    const r = `data-add='{"ch_in_style":"${this.#$}", "ch_out_style":"${this.#N}"}'`;
    return {
      cl: ` class='sn_ch sn_ch_yet sn_ch_in_${this.#$}'`,
      // TxtStage.goTxt()はこれ単位で文字出現させる
      sty: `animation-delay: ${this.#V}ms;${this.#x.at(-1)?.o.style ?? ""}`,
      // TxtStage.goTxt()はこれ単位で文字出現させる
      lnk: (this.#x.at(0)?.o[":link"] ?? "") + " " + r,
      curpos: r
    };
  }
  #V = 0;
  #L = !0;
  #F = [];
  #x = [];
  #tt(t) {
    this.#x.push({
      o: t,
      r_align: this.#R,
      ch_in_style: this.#$,
      ch_out_style: this.#N
    }), "r_align" in t && (this.#R = t.r_align), this.#E(t), this.#W(t);
  }
  #z() {
    const t = this.#x.pop();
    t && (this.#R = t.r_align, this.#E({ in_style: t.ch_in_style }), this.#W({ out_style: t.ch_out_style }));
  }
  #K(t) {
    const e = this.#x.at(-1);
    if (!e) {
      this.#tt(t);
      return;
    }
    e.o = { ...e.o, ...t }, !t.style && !t.r_style && (e.o.style = "", e.o.r_style = ""), "r_align" in t && (this.#R = t.r_align), this.#E(t), this.#W(t);
  }
  click = () => !this.ctn.interactiveChildren || !this.ctn.visible ? !1 : this.#l.skipChIn();
  clearText() {
    this.ctn.addChild(this.#l = this.#l.reNew()), this.#V = 0, this.#L = !0, this.#F = [], this.#C = "", this.#H = "", T.#n.recPagebreak();
  }
  #C = "";
  #H = "";
  get pageText() {
    return this.#C.replace("《&emsp;》", "");
  }
  get pagePlainText() {
    return this.#H;
  }
  get enabled() {
    return this.ctn.interactiveChildren;
  }
  set enabled(t) {
    this.ctn.interactiveChildren = t;
  }
  addButton = (t) => new Promise((e) => {
    t.key = `btn=[${this.#a.children.length}] ` + this.name_, t[":id_tag"] = t.key.slice(0, -7), C(t, "hint_tate", this.#l.tategaki);
    const s = new it(t, T.#c, () => e(), () => this.canFocus());
    s.name = JSON.stringify(t).replaceAll('"', "'"), this.#a.addChild(s);
  });
  canFocus() {
    return (this.ctn.interactiveChildren ?? !1) && this.ctn.visible && T.#s(this);
  }
  clearLay(t) {
    super.clearLay(t), this.clearText();
    for (const e of this.#a.removeChildren()) e.destroy();
  }
  record = () => ({
    ...super.record(),
    enabled: this.enabled,
    r_cssText: this.#v.style.cssText,
    r_align: this.#R,
    // バック
    b_do: this.#m === void 0 ? void 0 : this.#m instanceof Z ? "Sprite" : "Graphics",
    b_pic: this.#b,
    b_color: this.#u,
    b_alpha: this.#f,
    b_alpha_isfixed: this.#p,
    ffs: this.#B,
    txs: this.#l.record(),
    strNoFFS: this.#_,
    btns: this.#a.children.map((t) => t.name)
  });
  playback(t, e) {
    super.playback(t, e), this.enabled = t.enabled, this.#v.style.cssText = t.r_cssText, this.#R = t.r_align, this.cvsResize(), this.#O(t), this.#l.playback(t.txs), this.#f = t.b_alpha, this.#p = t.b_alpha_isfixed, e = [
      e,
      new Promise((s) => {
        const i = t.b_do ? t.b_do === "Sprite" ? { b_pic: t.b_pic } : { b_color: t.b_color } : { b_pic: "" };
        i.b_alpha = t.b_alpha, i.b_alpha_isfixed = t.b_alpha_isfixed, this.#D(i, (r) => {
          r && s();
        }) || s();
      }),
      t.btns.map((s) => new Promise((i) => {
        this.addButton(JSON.parse(s.replaceAll("'", '"'))), i();
      }))
    ].flat();
  }
  get cssText() {
    return this.#l.cssText;
  }
  set cssText(t) {
    this.#l.cssText = t;
  }
  snapshot(t, e) {
    t.render(this.ctn, { clear: !1 }), this.#l.snapshot(t, e);
  }
  snapshot_end() {
    this.#l.snapshot_end();
  }
  makeDesignCast(t) {
    this.ctn.visible && this.#l.makeDesignCast(t);
  }
  makeDesignCastChildren(t) {
    if (this.ctn.visible)
      for (const e of this.#a.children) e.makeDesignCast(t);
  }
  showDesignCast() {
    this.#l.showDesignCast();
  }
  showDesignCastChildren() {
    for (const t of this.#a.children) t.showDesignCast();
  }
  dump() {
    return this.#Q("", "gotxt｜"), super.dump() + `, "enabled":"${this.enabled}", ${this.#l.dump()}, "b_pic":"${this.#b}", "b_color":"${this.#u}", "b_alpha":${this.#f}, "b_alpha_isfixed":"${this.#p}", "width":${this.#l.getWidth}, "height":${this.#l.getHeight}, "pixi_obj":[${this.ctn.children.map((t) => `{"class":"${t instanceof Z ? "Sprite" : t instanceof gt ? "Graphics" : t instanceof G ? "Container" : "?"}", "name":"${t.name}", "alpha":${t.alpha}, "x":${t.x}, "y":${t.y}, "visible":"${t.visible}"}`).join(",")}], "button":[${this.#a.children.map((t) => t.children[0]?.name ?? "{}").join(",")}]`;
  }
}
class Di {
  #e = [];
  #t = -1;
  #s = new ue();
  destroy() {
    this.#e = [], this.#t = -1, this.#s.clear();
  }
  add(t, e, s) {
    if (this.#e.findIndex((a) => a.btn === t) >= 0) return;
    if (t instanceof G) {
      t.on("pointerdown", () => {
        for (let a = this.#e.length - 1; a >= 0; --a)
          if (this.#e[a].btn === t) {
            this.#t = a;
            return;
          }
        this.#t = -1;
      }), this.#e.push({ btn: t, on: e, off: s });
      return;
    }
    this.#s.add(t, "focus", () => {
      for (let a = this.#e.length - 1; a >= 0; --a)
        if (this.#e[a].btn === t) {
          this.#t = a;
          return;
        }
      this.#t = -1;
    });
    let i = (a) => {
    }, r = t.localName === "button" || t.localName === "a" ? (a) => !a.isTrusted && a.key === "Enter" : (a) => a.key === "Enter";
    const o = t;
    switch (o.type ?? "") {
      //	switch (btn.getAttribute('type') ?? '') {	// textareaで''になる
      case "checkbox":
        i = () => o.checked = !o.checked;
        break;
      case "":
        t.querySelectorAll("input[type]").length > 0 && (i = (a) => this.#n(t, a.key), r = () => !1);
        break;
      case "range":
        i = (a) => {
          a.isTrusted || (a.key === "ArrowUp" ? o.stepUp() : o.stepDown());
        };
        break;
      case "text":
      case "textarea":
        i = (a) => {
          if (a.isTrusted) return;
          let c = (o.selectionStart ?? 0) + (a.key === "ArrowUp" ? -1 : 1);
          c < 0 && (c = 0), o.setSelectionRange(c, c);
        };
        break;
    }
    this.#s.add(t, "keydown", (a) => {
      if (!(a.key !== "ArrowUp" && a.key !== "ArrowDown" && a.key !== "Enter")) {
        if (a.stopPropagation(), a.stopImmediatePropagation(), r(a)) {
          t.dispatchEvent(new MouseEvent("click"));
          return;
        }
        i(a);
      }
    }, { passive: !0 }), t.hasAttribute("tabindex") || (t.tabIndex = 0), this.#e.push({ btn: t, on: e, off: s });
  }
  remove(t) {
    const e = this.#e.findIndex((s) => s.btn === t);
    e < 0 || (this.#e.splice(e, 1), this.#e.length === 0 ? this.#t = -1 : e <= this.#t && --this.#t);
  }
  #n(t, e) {
    const s = t.querySelectorAll("input[type]"), i = s.length;
    for (let r = 0; r < i; ++r)
      if (s[r].checked) {
        s[(r + i + (e === "ArrowUp" ? -1 : 1)) % i].checked = !0;
        break;
      }
  }
  isFocus(t) {
    return this.#t < 0 ? !1 : this.#e[this.#t].btn === t;
  }
  prev() {
    this.#o();
    const t = this.#e.length;
    if (t !== 0) {
      --this.#t < 0 && (this.#t = t - 1);
      for (let e = t; e >= 1; --e) {
        const s = (this.#t + e) % t;
        if (this.#e[s].on()) {
          this.#t = s, this.#i(s);
          return;
        }
      }
      this.#t = -1;
    }
  }
  next() {
    this.#o();
    const t = this.#e.length;
    if (t !== 0) {
      ++this.#t >= t && (this.#t = 0);
      for (let e = 0; e < t; ++e) {
        const s = (this.#t + e) % t;
        if (this.#e[s].on()) {
          this.#t = s, this.#i(s);
          return;
        }
      }
      this.#t = -1;
    }
  }
  #i = S.debugLog ? (t) => console.log(`👾 <FocusMng idx:${t} btn:%o`, this.#e[t].btn) : () => {
  };
  getFocus() {
    if (this.#t < 0) return null;
    this.#o(), this.#t >= this.#e.length && (this.#t = 0);
    const t = this.#e[this.#t];
    return t.on() ? t.btn : null;
  }
  blur() {
    this.#o(), this.#t = -1, globalThis.focus();
  }
  #o() {
    for (let t = this.#e.length - 1; t >= 0; --t) {
      const e = this.#e[t];
      !(e.btn instanceof G) || e.btn.parent ? e.off() : this.#e.splice(t, 1);
    }
  }
}
var K = "top", rt = "bottom", ot = "right", q = "left", Ge = "auto", fe = [K, rt, ot, q], Mt = "start", ae = "end", Bi = "clippingParents", Ds = "viewport", Kt = "popper", Vi = "reference", vs = /* @__PURE__ */ fe.reduce(function(n, t) {
  return n.concat([t + "-" + Mt, t + "-" + ae]);
}, []), Bs = /* @__PURE__ */ [].concat(fe, [Ge]).reduce(function(n, t) {
  return n.concat([t, t + "-" + Mt, t + "-" + ae]);
}, []), Mi = "beforeRead", Wi = "read", Hi = "afterRead", zi = "beforeMain", Ui = "main", Gi = "afterMain", Ki = "beforeWrite", qi = "write", Ji = "afterWrite", Yi = [Mi, Wi, Hi, zi, Ui, Gi, Ki, qi, Ji];
function ut(n) {
  return n ? (n.nodeName || "").toLowerCase() : null;
}
function tt(n) {
  if (n == null)
    return window;
  if (n.toString() !== "[object Window]") {
    var t = n.ownerDocument;
    return t && t.defaultView || window;
  }
  return n;
}
function Dt(n) {
  var t = tt(n).Element;
  return n instanceof t || n instanceof Element;
}
function nt(n) {
  var t = tt(n).HTMLElement;
  return n instanceof t || n instanceof HTMLElement;
}
function Ke(n) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = tt(n).ShadowRoot;
  return n instanceof t || n instanceof ShadowRoot;
}
function Xi(n) {
  var t = n.state;
  Object.keys(t.elements).forEach(function(e) {
    var s = t.styles[e] || {}, i = t.attributes[e] || {}, r = t.elements[e];
    !nt(r) || !ut(r) || (Object.assign(r.style, s), Object.keys(i).forEach(function(o) {
      var a = i[o];
      a === !1 ? r.removeAttribute(o) : r.setAttribute(o, a === !0 ? "" : a);
    }));
  });
}
function Qi(n) {
  var t = n.state, e = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, e.popper), t.styles = e, t.elements.arrow && Object.assign(t.elements.arrow.style, e.arrow), function() {
    Object.keys(t.elements).forEach(function(s) {
      var i = t.elements[s], r = t.attributes[s] || {}, o = Object.keys(t.styles.hasOwnProperty(s) ? t.styles[s] : e[s]), a = o.reduce(function(c, h) {
        return c[h] = "", c;
      }, {});
      !nt(i) || !ut(i) || (Object.assign(i.style, a), Object.keys(r).forEach(function(c) {
        i.removeAttribute(c);
      }));
    });
  };
}
const Zi = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Xi,
  effect: Qi,
  requires: ["computeStyles"]
};
function lt(n) {
  return n.split("-")[0];
}
var Lt = Math.max, Oe = Math.min, Wt = Math.round;
function ze() {
  var n = navigator.userAgentData;
  return n != null && n.brands && Array.isArray(n.brands) ? n.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Vs() {
  return !/^((?!chrome|android).)*safari/i.test(ze());
}
function Ht(n, t, e) {
  t === void 0 && (t = !1), e === void 0 && (e = !1);
  var s = n.getBoundingClientRect(), i = 1, r = 1;
  t && nt(n) && (i = n.offsetWidth > 0 && Wt(s.width) / n.offsetWidth || 1, r = n.offsetHeight > 0 && Wt(s.height) / n.offsetHeight || 1);
  var o = Dt(n) ? tt(n) : window, a = o.visualViewport, c = !Vs() && e, h = (s.left + (c && a ? a.offsetLeft : 0)) / i, l = (s.top + (c && a ? a.offsetTop : 0)) / r, u = s.width / i, m = s.height / r;
  return {
    width: u,
    height: m,
    top: l,
    right: h + u,
    bottom: l + m,
    left: h,
    x: h,
    y: l
  };
}
function qe(n) {
  var t = Ht(n), e = n.offsetWidth, s = n.offsetHeight;
  return Math.abs(t.width - e) <= 1 && (e = t.width), Math.abs(t.height - s) <= 1 && (s = t.height), {
    x: n.offsetLeft,
    y: n.offsetTop,
    width: e,
    height: s
  };
}
function Ms(n, t) {
  var e = t.getRootNode && t.getRootNode();
  if (n.contains(t))
    return !0;
  if (e && Ke(e)) {
    var s = t;
    do {
      if (s && n.isSameNode(s))
        return !0;
      s = s.parentNode || s.host;
    } while (s);
  }
  return !1;
}
function _t(n) {
  return tt(n).getComputedStyle(n);
}
function Ai(n) {
  return ["table", "td", "th"].indexOf(ut(n)) >= 0;
}
function St(n) {
  return ((Dt(n) ? n.ownerDocument : (
    // $FlowFixMe[prop-missing]
    n.document
  )) || window.document).documentElement;
}
function Te(n) {
  return ut(n) === "html" ? n : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    n.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    n.parentNode || // DOM Element detected
    (Ke(n) ? n.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    St(n)
  );
}
function gs(n) {
  return !nt(n) || // https://github.com/popperjs/popper-core/issues/837
  _t(n).position === "fixed" ? null : n.offsetParent;
}
function tn(n) {
  var t = /firefox/i.test(ze()), e = /Trident/i.test(ze());
  if (e && nt(n)) {
    var s = _t(n);
    if (s.position === "fixed")
      return null;
  }
  var i = Te(n);
  for (Ke(i) && (i = i.host); nt(i) && ["html", "body"].indexOf(ut(i)) < 0; ) {
    var r = _t(i);
    if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function de(n) {
  for (var t = tt(n), e = gs(n); e && Ai(e) && _t(e).position === "static"; )
    e = gs(e);
  return e && (ut(e) === "html" || ut(e) === "body" && _t(e).position === "static") ? t : e || tn(n) || t;
}
function Je(n) {
  return ["top", "bottom"].indexOf(n) >= 0 ? "x" : "y";
}
function ie(n, t, e) {
  return Lt(n, Oe(t, e));
}
function en(n, t, e) {
  var s = ie(n, t, e);
  return s > e ? e : s;
}
function Ws() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Hs(n) {
  return Object.assign({}, Ws(), n);
}
function zs(n, t) {
  return t.reduce(function(e, s) {
    return e[s] = n, e;
  }, {});
}
var sn = function(t, e) {
  return t = typeof t == "function" ? t(Object.assign({}, e.rects, {
    placement: e.placement
  })) : t, Hs(typeof t != "number" ? t : zs(t, fe));
};
function nn(n) {
  var t, e = n.state, s = n.name, i = n.options, r = e.elements.arrow, o = e.modifiersData.popperOffsets, a = lt(e.placement), c = Je(a), h = [q, ot].indexOf(a) >= 0, l = h ? "height" : "width";
  if (!(!r || !o)) {
    var u = sn(i.padding, e), m = qe(r), p = c === "y" ? K : q, d = c === "y" ? rt : ot, y = e.rects.reference[l] + e.rects.reference[c] - o[c] - e.rects.popper[l], _ = o[c] - e.rects.reference[c], f = de(r), v = f ? c === "y" ? f.clientHeight || 0 : f.clientWidth || 0 : 0, P = y / 2 - _ / 2, w = u[p], b = v - m[l] - u[d], x = v / 2 - m[l] / 2 + P, O = ie(w, x, b), I = c;
    e.modifiersData[s] = (t = {}, t[I] = O, t.centerOffset = O - x, t);
  }
}
function rn(n) {
  var t = n.state, e = n.options, s = e.element, i = s === void 0 ? "[data-popper-arrow]" : s;
  i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || Ms(t.elements.popper, i) && (t.elements.arrow = i));
}
const on = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: nn,
  effect: rn,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function zt(n) {
  return n.split("-")[1];
}
var an = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function cn(n, t) {
  var e = n.x, s = n.y, i = t.devicePixelRatio || 1;
  return {
    x: Wt(e * i) / i || 0,
    y: Wt(s * i) / i || 0
  };
}
function _s(n) {
  var t, e = n.popper, s = n.popperRect, i = n.placement, r = n.variation, o = n.offsets, a = n.position, c = n.gpuAcceleration, h = n.adaptive, l = n.roundOffsets, u = n.isFixed, m = o.x, p = m === void 0 ? 0 : m, d = o.y, y = d === void 0 ? 0 : d, _ = typeof l == "function" ? l({
    x: p,
    y
  }) : {
    x: p,
    y
  };
  p = _.x, y = _.y;
  var f = o.hasOwnProperty("x"), v = o.hasOwnProperty("y"), P = q, w = K, b = window;
  if (h) {
    var x = de(e), O = "clientHeight", I = "clientWidth";
    if (x === tt(e) && (x = St(e), _t(x).position !== "static" && a === "absolute" && (O = "scrollHeight", I = "scrollWidth")), x = x, i === K || (i === q || i === ot) && r === ae) {
      w = rt;
      var N = u && x === b && b.visualViewport ? b.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        x[O]
      );
      y -= N - s.height, y *= c ? 1 : -1;
    }
    if (i === q || (i === K || i === rt) && r === ae) {
      P = ot;
      var R = u && x === b && b.visualViewport ? b.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        x[I]
      );
      p -= R - s.width, p *= c ? 1 : -1;
    }
  }
  var W = Object.assign({
    position: a
  }, h && an), J = l === !0 ? cn({
    x: p,
    y
  }, tt(e)) : {
    x: p,
    y
  };
  if (p = J.x, y = J.y, c) {
    var H;
    return Object.assign({}, W, (H = {}, H[w] = v ? "0" : "", H[P] = f ? "0" : "", H.transform = (b.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + y + "px)" : "translate3d(" + p + "px, " + y + "px, 0)", H));
  }
  return Object.assign({}, W, (t = {}, t[w] = v ? y + "px" : "", t[P] = f ? p + "px" : "", t.transform = "", t));
}
function ln(n) {
  var t = n.state, e = n.options, s = e.gpuAcceleration, i = s === void 0 ? !0 : s, r = e.adaptive, o = r === void 0 ? !0 : r, a = e.roundOffsets, c = a === void 0 ? !0 : a, h = {
    placement: lt(t.placement),
    variation: zt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, _s(Object.assign({}, h, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: o,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, _s(Object.assign({}, h, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const hn = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: ln,
  data: {}
};
var ve = {
  passive: !0
};
function un(n) {
  var t = n.state, e = n.instance, s = n.options, i = s.scroll, r = i === void 0 ? !0 : i, o = s.resize, a = o === void 0 ? !0 : o, c = tt(t.elements.popper), h = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return r && h.forEach(function(l) {
    l.addEventListener("scroll", e.update, ve);
  }), a && c.addEventListener("resize", e.update, ve), function() {
    r && h.forEach(function(l) {
      l.removeEventListener("scroll", e.update, ve);
    }), a && c.removeEventListener("resize", e.update, ve);
  };
}
const fn = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: un,
  data: {}
};
var dn = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Pe(n) {
  return n.replace(/left|right|bottom|top/g, function(t) {
    return dn[t];
  });
}
var pn = {
  start: "end",
  end: "start"
};
function bs(n) {
  return n.replace(/start|end/g, function(t) {
    return pn[t];
  });
}
function Ye(n) {
  var t = tt(n), e = t.pageXOffset, s = t.pageYOffset;
  return {
    scrollLeft: e,
    scrollTop: s
  };
}
function Xe(n) {
  return Ht(St(n)).left + Ye(n).scrollLeft;
}
function mn(n, t) {
  var e = tt(n), s = St(n), i = e.visualViewport, r = s.clientWidth, o = s.clientHeight, a = 0, c = 0;
  if (i) {
    r = i.width, o = i.height;
    var h = Vs();
    (h || !h && t === "fixed") && (a = i.offsetLeft, c = i.offsetTop);
  }
  return {
    width: r,
    height: o,
    x: a + Xe(n),
    y: c
  };
}
function yn(n) {
  var t, e = St(n), s = Ye(n), i = (t = n.ownerDocument) == null ? void 0 : t.body, r = Lt(e.scrollWidth, e.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), o = Lt(e.scrollHeight, e.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), a = -s.scrollLeft + Xe(n), c = -s.scrollTop;
  return _t(i || e).direction === "rtl" && (a += Lt(e.clientWidth, i ? i.clientWidth : 0) - r), {
    width: r,
    height: o,
    x: a,
    y: c
  };
}
function Qe(n) {
  var t = _t(n), e = t.overflow, s = t.overflowX, i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(e + i + s);
}
function Us(n) {
  return ["html", "body", "#document"].indexOf(ut(n)) >= 0 ? n.ownerDocument.body : nt(n) && Qe(n) ? n : Us(Te(n));
}
function ne(n, t) {
  var e;
  t === void 0 && (t = []);
  var s = Us(n), i = s === ((e = n.ownerDocument) == null ? void 0 : e.body), r = tt(s), o = i ? [r].concat(r.visualViewport || [], Qe(s) ? s : []) : s, a = t.concat(o);
  return i ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(ne(Te(o)))
  );
}
function Ue(n) {
  return Object.assign({}, n, {
    left: n.x,
    top: n.y,
    right: n.x + n.width,
    bottom: n.y + n.height
  });
}
function vn(n, t) {
  var e = Ht(n, !1, t === "fixed");
  return e.top = e.top + n.clientTop, e.left = e.left + n.clientLeft, e.bottom = e.top + n.clientHeight, e.right = e.left + n.clientWidth, e.width = n.clientWidth, e.height = n.clientHeight, e.x = e.left, e.y = e.top, e;
}
function ws(n, t, e) {
  return t === Ds ? Ue(mn(n, e)) : Dt(t) ? vn(t, e) : Ue(yn(St(n)));
}
function gn(n) {
  var t = ne(Te(n)), e = ["absolute", "fixed"].indexOf(_t(n).position) >= 0, s = e && nt(n) ? de(n) : n;
  return Dt(s) ? t.filter(function(i) {
    return Dt(i) && Ms(i, s) && ut(i) !== "body";
  }) : [];
}
function _n(n, t, e, s) {
  var i = t === "clippingParents" ? gn(n) : [].concat(t), r = [].concat(i, [e]), o = r[0], a = r.reduce(function(c, h) {
    var l = ws(n, h, s);
    return c.top = Lt(l.top, c.top), c.right = Oe(l.right, c.right), c.bottom = Oe(l.bottom, c.bottom), c.left = Lt(l.left, c.left), c;
  }, ws(n, o, s));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function Gs(n) {
  var t = n.reference, e = n.element, s = n.placement, i = s ? lt(s) : null, r = s ? zt(s) : null, o = t.x + t.width / 2 - e.width / 2, a = t.y + t.height / 2 - e.height / 2, c;
  switch (i) {
    case K:
      c = {
        x: o,
        y: t.y - e.height
      };
      break;
    case rt:
      c = {
        x: o,
        y: t.y + t.height
      };
      break;
    case ot:
      c = {
        x: t.x + t.width,
        y: a
      };
      break;
    case q:
      c = {
        x: t.x - e.width,
        y: a
      };
      break;
    default:
      c = {
        x: t.x,
        y: t.y
      };
  }
  var h = i ? Je(i) : null;
  if (h != null) {
    var l = h === "y" ? "height" : "width";
    switch (r) {
      case Mt:
        c[h] = c[h] - (t[l] / 2 - e[l] / 2);
        break;
      case ae:
        c[h] = c[h] + (t[l] / 2 - e[l] / 2);
        break;
    }
  }
  return c;
}
function ce(n, t) {
  t === void 0 && (t = {});
  var e = t, s = e.placement, i = s === void 0 ? n.placement : s, r = e.strategy, o = r === void 0 ? n.strategy : r, a = e.boundary, c = a === void 0 ? Bi : a, h = e.rootBoundary, l = h === void 0 ? Ds : h, u = e.elementContext, m = u === void 0 ? Kt : u, p = e.altBoundary, d = p === void 0 ? !1 : p, y = e.padding, _ = y === void 0 ? 0 : y, f = Hs(typeof _ != "number" ? _ : zs(_, fe)), v = m === Kt ? Vi : Kt, P = n.rects.popper, w = n.elements[d ? v : m], b = _n(Dt(w) ? w : w.contextElement || St(n.elements.popper), c, l, o), x = Ht(n.elements.reference), O = Gs({
    reference: x,
    element: P,
    placement: i
  }), I = Ue(Object.assign({}, P, O)), N = m === Kt ? I : x, R = {
    top: b.top - N.top + f.top,
    bottom: N.bottom - b.bottom + f.bottom,
    left: b.left - N.left + f.left,
    right: N.right - b.right + f.right
  }, W = n.modifiersData.offset;
  if (m === Kt && W) {
    var J = W[i];
    Object.keys(R).forEach(function(H) {
      var ft = [ot, rt].indexOf(H) >= 0 ? 1 : -1, dt = [K, rt].indexOf(H) >= 0 ? "y" : "x";
      R[H] += J[dt] * ft;
    });
  }
  return R;
}
function bn(n, t) {
  t === void 0 && (t = {});
  var e = t, s = e.placement, i = e.boundary, r = e.rootBoundary, o = e.padding, a = e.flipVariations, c = e.allowedAutoPlacements, h = c === void 0 ? Bs : c, l = zt(s), u = l ? a ? vs : vs.filter(function(d) {
    return zt(d) === l;
  }) : fe, m = u.filter(function(d) {
    return h.indexOf(d) >= 0;
  });
  m.length === 0 && (m = u);
  var p = m.reduce(function(d, y) {
    return d[y] = ce(n, {
      placement: y,
      boundary: i,
      rootBoundary: r,
      padding: o
    })[lt(y)], d;
  }, {});
  return Object.keys(p).sort(function(d, y) {
    return p[d] - p[y];
  });
}
function wn(n) {
  if (lt(n) === Ge)
    return [];
  var t = Pe(n);
  return [bs(n), t, bs(t)];
}
function kn(n) {
  var t = n.state, e = n.options, s = n.name;
  if (!t.modifiersData[s]._skip) {
    for (var i = e.mainAxis, r = i === void 0 ? !0 : i, o = e.altAxis, a = o === void 0 ? !0 : o, c = e.fallbackPlacements, h = e.padding, l = e.boundary, u = e.rootBoundary, m = e.altBoundary, p = e.flipVariations, d = p === void 0 ? !0 : p, y = e.allowedAutoPlacements, _ = t.options.placement, f = lt(_), v = f === _, P = c || (v || !d ? [Pe(_)] : wn(_)), w = [_].concat(P).reduce(function(Bt, kt) {
      return Bt.concat(lt(kt) === Ge ? bn(t, {
        placement: kt,
        boundary: l,
        rootBoundary: u,
        padding: h,
        flipVariations: d,
        allowedAutoPlacements: y
      }) : kt);
    }, []), b = t.rects.reference, x = t.rects.popper, O = /* @__PURE__ */ new Map(), I = !0, N = w[0], R = 0; R < w.length; R++) {
      var W = w[R], J = lt(W), H = zt(W) === Mt, ft = [K, rt].indexOf(J) >= 0, dt = ft ? "width" : "height", U = ce(t, {
        placement: W,
        boundary: l,
        rootBoundary: u,
        altBoundary: m,
        padding: h
      }), Y = ft ? H ? ot : q : H ? rt : K;
      b[dt] > x[dt] && (Y = Pe(Y));
      var pt = Pe(Y), bt = [];
      if (r && bt.push(U[J] <= 0), a && bt.push(U[Y] <= 0, U[pt] <= 0), bt.every(function(Bt) {
        return Bt;
      })) {
        N = W, I = !1;
        break;
      }
      O.set(W, bt);
    }
    if (I)
      for (var mt = d ? 3 : 1, Ut = function(kt) {
        var Gt = w.find(function(me) {
          var Tt = O.get(me);
          if (Tt)
            return Tt.slice(0, kt).every(function(Ne) {
              return Ne;
            });
        });
        if (Gt)
          return N = Gt, "break";
      }, wt = mt; wt > 0; wt--) {
        var pe = Ut(wt);
        if (pe === "break") break;
      }
    t.placement !== N && (t.modifiersData[s]._skip = !0, t.placement = N, t.reset = !0);
  }
}
const xn = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: kn,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function ks(n, t, e) {
  return e === void 0 && (e = {
    x: 0,
    y: 0
  }), {
    top: n.top - t.height - e.y,
    right: n.right - t.width + e.x,
    bottom: n.bottom - t.height + e.y,
    left: n.left - t.width - e.x
  };
}
function xs(n) {
  return [K, ot, rt, q].some(function(t) {
    return n[t] >= 0;
  });
}
function Pn(n) {
  var t = n.state, e = n.name, s = t.rects.reference, i = t.rects.popper, r = t.modifiersData.preventOverflow, o = ce(t, {
    elementContext: "reference"
  }), a = ce(t, {
    altBoundary: !0
  }), c = ks(o, s), h = ks(a, i, r), l = xs(c), u = xs(h);
  t.modifiersData[e] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: h,
    isReferenceHidden: l,
    hasPopperEscaped: u
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": l,
    "data-popper-escaped": u
  });
}
const $n = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Pn
};
function En(n, t, e) {
  var s = lt(n), i = [q, K].indexOf(s) >= 0 ? -1 : 1, r = typeof e == "function" ? e(Object.assign({}, t, {
    placement: n
  })) : e, o = r[0], a = r[1];
  return o = o || 0, a = (a || 0) * i, [q, ot].indexOf(s) >= 0 ? {
    x: a,
    y: o
  } : {
    x: o,
    y: a
  };
}
function On(n) {
  var t = n.state, e = n.options, s = n.name, i = e.offset, r = i === void 0 ? [0, 0] : i, o = Bs.reduce(function(l, u) {
    return l[u] = En(u, t.rects, r), l;
  }, {}), a = o[t.placement], c = a.x, h = a.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += h), t.modifiersData[s] = o;
}
const Cn = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: On
};
function Sn(n) {
  var t = n.state, e = n.name;
  t.modifiersData[e] = Gs({
    reference: t.rects.reference,
    element: t.rects.popper,
    placement: t.placement
  });
}
const Tn = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Sn,
  data: {}
};
function Nn(n) {
  return n === "x" ? "y" : "x";
}
function Fn(n) {
  var t = n.state, e = n.options, s = n.name, i = e.mainAxis, r = i === void 0 ? !0 : i, o = e.altAxis, a = o === void 0 ? !1 : o, c = e.boundary, h = e.rootBoundary, l = e.altBoundary, u = e.padding, m = e.tether, p = m === void 0 ? !0 : m, d = e.tetherOffset, y = d === void 0 ? 0 : d, _ = ce(t, {
    boundary: c,
    rootBoundary: h,
    padding: u,
    altBoundary: l
  }), f = lt(t.placement), v = zt(t.placement), P = !v, w = Je(f), b = Nn(w), x = t.modifiersData.popperOffsets, O = t.rects.reference, I = t.rects.popper, N = typeof y == "function" ? y(Object.assign({}, t.rects, {
    placement: t.placement
  })) : y, R = typeof N == "number" ? {
    mainAxis: N,
    altAxis: N
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, N), W = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, J = {
    x: 0,
    y: 0
  };
  if (x) {
    if (r) {
      var H, ft = w === "y" ? K : q, dt = w === "y" ? rt : ot, U = w === "y" ? "height" : "width", Y = x[w], pt = Y + _[ft], bt = Y - _[dt], mt = p ? -I[U] / 2 : 0, Ut = v === Mt ? O[U] : I[U], wt = v === Mt ? -I[U] : -O[U], pe = t.elements.arrow, Bt = p && pe ? qe(pe) : {
        width: 0,
        height: 0
      }, kt = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Ws(), Gt = kt[ft], me = kt[dt], Tt = ie(0, O[U], Bt[U]), Ne = P ? O[U] / 2 - mt - Tt - Gt - R.mainAxis : Ut - Tt - Gt - R.mainAxis, qs = P ? -O[U] / 2 + mt + Tt + me + R.mainAxis : wt + Tt + me + R.mainAxis, Fe = t.elements.arrow && de(t.elements.arrow), Js = Fe ? w === "y" ? Fe.clientTop || 0 : Fe.clientLeft || 0 : 0, Ae = (H = W?.[w]) != null ? H : 0, Ys = Y + Ne - Ae - Js, Xs = Y + qs - Ae, ts = ie(p ? Oe(pt, Ys) : pt, Y, p ? Lt(bt, Xs) : bt);
      x[w] = ts, J[w] = ts - Y;
    }
    if (a) {
      var es, Qs = w === "x" ? K : q, Zs = w === "x" ? rt : ot, Nt = x[b], ye = b === "y" ? "height" : "width", ss = Nt + _[Qs], is = Nt - _[Zs], Ie = [K, q].indexOf(f) !== -1, ns = (es = W?.[b]) != null ? es : 0, rs = Ie ? ss : Nt - O[ye] - I[ye] - ns + R.altAxis, os = Ie ? Nt + O[ye] + I[ye] - ns - R.altAxis : is, as = p && Ie ? en(rs, Nt, os) : ie(p ? rs : ss, Nt, p ? os : is);
      x[b] = as, J[b] = as - Nt;
    }
    t.modifiersData[s] = J;
  }
}
const In = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Fn,
  requiresIfExists: ["offset"]
};
function jn(n) {
  return {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  };
}
function Rn(n) {
  return n === tt(n) || !nt(n) ? Ye(n) : jn(n);
}
function Ln(n) {
  var t = n.getBoundingClientRect(), e = Wt(t.width) / n.offsetWidth || 1, s = Wt(t.height) / n.offsetHeight || 1;
  return e !== 1 || s !== 1;
}
function Dn(n, t, e) {
  e === void 0 && (e = !1);
  var s = nt(t), i = nt(t) && Ln(t), r = St(t), o = Ht(n, i, e), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (s || !s && !e) && ((ut(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Qe(r)) && (a = Rn(t)), nt(t) ? (c = Ht(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : r && (c.x = Xe(r))), {
    x: o.left + a.scrollLeft - c.x,
    y: o.top + a.scrollTop - c.y,
    width: o.width,
    height: o.height
  };
}
function Bn(n) {
  var t = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Set(), s = [];
  n.forEach(function(r) {
    t.set(r.name, r);
  });
  function i(r) {
    e.add(r.name);
    var o = [].concat(r.requires || [], r.requiresIfExists || []);
    o.forEach(function(a) {
      if (!e.has(a)) {
        var c = t.get(a);
        c && i(c);
      }
    }), s.push(r);
  }
  return n.forEach(function(r) {
    e.has(r.name) || i(r);
  }), s;
}
function Vn(n) {
  var t = Bn(n);
  return Yi.reduce(function(e, s) {
    return e.concat(t.filter(function(i) {
      return i.phase === s;
    }));
  }, []);
}
function Mn(n) {
  var t;
  return function() {
    return t || (t = new Promise(function(e) {
      Promise.resolve().then(function() {
        t = void 0, e(n());
      });
    })), t;
  };
}
function Wn(n) {
  var t = n.reduce(function(e, s) {
    var i = e[s.name];
    return e[s.name] = i ? Object.assign({}, i, s, {
      options: Object.assign({}, i.options, s.options),
      data: Object.assign({}, i.data, s.data)
    }) : s, e;
  }, {});
  return Object.keys(t).map(function(e) {
    return t[e];
  });
}
var Ps = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function $s() {
  for (var n = arguments.length, t = new Array(n), e = 0; e < n; e++)
    t[e] = arguments[e];
  return !t.some(function(s) {
    return !(s && typeof s.getBoundingClientRect == "function");
  });
}
function Hn(n) {
  n === void 0 && (n = {});
  var t = n, e = t.defaultModifiers, s = e === void 0 ? [] : e, i = t.defaultOptions, r = i === void 0 ? Ps : i;
  return function(a, c, h) {
    h === void 0 && (h = r);
    var l = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Ps, r),
      modifiersData: {},
      elements: {
        reference: a,
        popper: c
      },
      attributes: {},
      styles: {}
    }, u = [], m = !1, p = {
      state: l,
      setOptions: function(f) {
        var v = typeof f == "function" ? f(l.options) : f;
        y(), l.options = Object.assign({}, r, l.options, v), l.scrollParents = {
          reference: Dt(a) ? ne(a) : a.contextElement ? ne(a.contextElement) : [],
          popper: ne(c)
        };
        var P = Vn(Wn([].concat(s, l.options.modifiers)));
        return l.orderedModifiers = P.filter(function(w) {
          return w.enabled;
        }), d(), p.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!m) {
          var f = l.elements, v = f.reference, P = f.popper;
          if ($s(v, P)) {
            l.rects = {
              reference: Dn(v, de(P), l.options.strategy === "fixed"),
              popper: qe(P)
            }, l.reset = !1, l.placement = l.options.placement, l.orderedModifiers.forEach(function(R) {
              return l.modifiersData[R.name] = Object.assign({}, R.data);
            });
            for (var w = 0; w < l.orderedModifiers.length; w++) {
              if (l.reset === !0) {
                l.reset = !1, w = -1;
                continue;
              }
              var b = l.orderedModifiers[w], x = b.fn, O = b.options, I = O === void 0 ? {} : O, N = b.name;
              typeof x == "function" && (l = x({
                state: l,
                options: I,
                name: N,
                instance: p
              }) || l);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Mn(function() {
        return new Promise(function(_) {
          p.forceUpdate(), _(l);
        });
      }),
      destroy: function() {
        y(), m = !0;
      }
    };
    if (!$s(a, c))
      return p;
    p.setOptions(h).then(function(_) {
      !m && h.onFirstUpdate && h.onFirstUpdate(_);
    });
    function d() {
      l.orderedModifiers.forEach(function(_) {
        var f = _.name, v = _.options, P = v === void 0 ? {} : v, w = _.effect;
        if (typeof w == "function") {
          var b = w({
            state: l,
            name: f,
            instance: p,
            options: P
          }), x = function() {
          };
          u.push(b || x);
        }
      });
    }
    function y() {
      u.forEach(function(_) {
        return _();
      }), u = [];
    }
    return p;
  };
}
var zn = [fn, Tn, hn, Zi, Cn, xn, In, on, $n], Un = /* @__PURE__ */ Hn({
  defaultModifiers: zn
});
const Ce = "pointerup", It = "keydown";
class Gn {
  constructor(t, e, s, i, r, o, a, c, h) {
    if (this.cfg = t, this.hTag = e, this.appPixi = s, this.main = i, this.layMng = r, this.val = o, this.scrItr = c, this.sys = h, e.clear_event = (f) => k.clear_event(f), e.event = (f) => this.#b(f), e.set_cancel_skip = () => !1, e.set_focus = (f) => this.#S(f), a.setEvtMng(this), c.setOtherObj(this, r), T.setEvtMng(this, h, c), r.setEvtMng(this), g.setFcs(this.#t), h.setFire((f, v) => g.fire(f, v)), S.isDbg) {
      const f = {
        pause: () => {
          if (!g.isWait) return;
          const v = {};
          c.recodeDesign(v), h.callHook("_enterDesign", v), h.send2Dbg("_enterDesign", v);
        }
        //				stopOnBreakpoint		: ()=> this.#isDbgBreak = true,
        //				stopOnDataBreakpoint	: ()=> this.#isDbgBreak = true,
        //				continue				: ()=> this.#isDbgBreak = false,
        //				disconnect				: ()=> this.#isDbgBreak = false,
      };
      f.attach = f.stopOnEntry = f.stopOnStep = f.stopOnStepIn = f.stopOnStepOut = f.stopOnBackstep = f.pause, h.addHook((v) => f[v]?.());
    }
    Zt(`
.sn_hint {
	background-color: #3c3225;
	color: white;
	padding: 4px 8px;
	border-radius: 4px;
	font-size: 1.2em;
	z-index: 10000;
	pointer-events: none;
	user-select: none;
}

.sn_hint_ar,
.sn_hint_ar::before {
	position: absolute;
	width: 8px;
	height: 8px;
	background: inherit;
}
.sn_hint_ar {
	visibility: hidden;
}
.sn_hint_ar::before {
	visibility: visible;
	content: '';
	transform: rotate(45deg);
}

.sn_hint[data-popper-placement^='top']		> .sn_hint_ar {bottom: -4px;}
.sn_hint[data-popper-placement^='bottom']	> .sn_hint_ar {top: -4px;}
.sn_hint[data-popper-placement^='left']		> .sn_hint_ar {right: -4px;}
.sn_hint[data-popper-placement^='right']	> .sn_hint_ar {left: -4px;}
`), this.main.cvs.parentElement?.insertAdjacentHTML("beforeend", `
<div class="sn_hint" role="tooltip">
	<span>Dummy</span>
	<div class="sn_hint_ar" data-popper-arrow></div>
</div>`), this.#d = document.querySelector(".sn_hint"), this.#u = this.#d.querySelector("span"), this.#f = Un(this.#r, this.#d), this.#d.hidden = !0, s.stage.interactive = !0;
    const l = /* @__PURE__ */ new Map([
      [0, ""],
      [1, "middle"],
      [2, "right"]
    ]);
    this.#e.addC(s.stage, Ce, (f) => {
      if (f instanceof TouchEvent) {
        g.fire("click", f);
        return;
      }
      const v = this.#i(f) + `${l.get(f.button) ?? ""}click`;
      console.log(`fn:EventMng.ts -tap- nmEvt:${v} e:%o`, f), g.fire(v, f);
    }), this.#e.add(window, It, (f) => this.#n(f));
    let u = !1;
    const m = new TinyGesture(document.body);
    m.on("tap", (f) => {
      u || console.log("fn:EventMng.ts line:161 click e:%o", f);
    }), m.on("longpress", (f) => {
      if (u = !0, f.stopImmediatePropagation(), f instanceof TouchEvent) {
        g.fire("longpress", f);
        return;
      }
      const v = this.#i(f) + `${l.get(f.button) ?? ""}longpress`;
      g.fire(v, f);
    }), m.on("panend", () => {
      u && queueMicrotask(() => u = !1);
    }), m.on("swipeup", (f) => {
      if (f.stopImmediatePropagation(), f instanceof TouchEvent) {
        g.fire("swipeup", f);
        return;
      }
      const v = this.#i(f) + "swipeup";
      g.fire(v, f);
    }), m.on("swipedown", (f) => {
      if (f.stopImmediatePropagation(), f instanceof TouchEvent) {
        g.fire("swipedown", f);
        return;
      }
      const v = this.#i(f) + "swipedown";
      g.fire(v, f);
    });
    const p = () => o.setVal_Nochk("tmp", "const.sn.navigator.language", navigator.language);
    this.#e.add(window, "languagechange", (f) => {
      p(), g.fire("sn:chgNavLang", f), ui();
    }), p();
    const d = (f) => {
      S.isDarkMode = f.matches, o.setVal_Nochk("tmp", "const.sn.isDarkMode", S.isDarkMode);
    }, y = globalThis.matchMedia("(prefers-color-scheme: dark)");
    d(y), this.#e.add(y, "change", (f) => {
      d(f), g.fire("sn:chgDarkMode", f);
    });
    let _ = (f, v) => {
    };
    "WheelEvent" in window && (this.#e.add(i.cvs, "wheel", (f) => this.#o(f), { passive: !0 }), this.#s = (f) => this.#e.add(f, "wheel", (v) => this.#o(v), { passive: !0 }), _ = (f, v) => f.add(i.cvs, "wheel", (P) => {
      P.isComposing || P.deltaY <= 0 || (P.stopPropagation(), v());
    })), g.init(t, e, i, o, c, r, this, a, _), import("./gamepad.js").then((f) => f.g).then(({ GamepadListener: f }) => {
      const v = new f({
        analog: !1,
        deadZone: 0.3
      });
      S.debugLog && (v.on("gamepad:connected", (b) => console.log(`👺<'gamepad:connected' index:${b.detail.index} id:${b.detail.gamepad.id}`)), v.on("gamepad:disconnected", (b) => console.log(`👺<'gamepad:disconnected' index:${b.detail.index} id:${b.detail.gamepad?.id}`)));
      const P = [
        "",
        "ArrowUp",
        "",
        // '7', '8', '9',
        "ArrowLeft",
        "",
        "ArrowRight",
        // '4', '5', '6',
        "",
        "ArrowDown",
        ""
        // '1', '2', '3',
      ], w = [0, 0];
      v.on("gamepad:axis", (b) => {
        if (!document.hasFocus()) return;
        w[b.detail.axis] = b.detail.value;
        const [x = 0, O = 0] = w, I = (O + 1) * 3 + (x + 1), N = P[I];
        if (!N) return;
        const R = this.#t.getFocus();
        (!R || R instanceof G ? globalThis : R).dispatchEvent(new KeyboardEvent(It, { key: N, bubbles: !0 })), !(!R || R instanceof G) && R.getAttribute("type") === "range" && R.dispatchEvent(new InputEvent("input", { bubbles: !0 }));
      }), v.on("gamepad:button", (b) => {
        if (document.hasFocus())
          if (b.detail.button % 2 === 0) {
            const x = this.#t.getFocus();
            (!x || x instanceof G ? globalThis : x).dispatchEvent(new KeyboardEvent(It, { key: "Enter", bubbles: !0 }));
          } else g.fire("middleclick", b);
      }), v.start();
    }), this.#e.add(window, "keyup", (f) => {
      f.isComposing || f.key in this.#v && (this.#v[f.key] = 0);
    }), o.defTmp(
      "const.sn.key.alternate",
      () => this.#v.Alt > 0
      /* NO_PUSH */
    ), o.defTmp(
      "const.sn.key.command",
      () => this.#v.Meta > 0
      /* NO_PUSH */
    ), o.defTmp(
      "const.sn.key.control",
      () => this.#v.Control > 0
      /* NO_PUSH */
    ), o.defTmp(
      "const.sn.key.end",
      () => this.#v.End > 0
      /* NO_PUSH */
    ), o.defTmp(
      "const.sn.key.escape",
      () => this.#v.Escape > 0
      /* NO_PUSH */
    ), o.defTmp(
      "const.sn.key.back",
      () => this.#v.GoBack > 0
      /* NO_PUSH */
    );
  }
  #e = new ue();
  #t = new Di();
  resvFlameEvent(t) {
    this.#e.add(t, It, (e) => this.#n(e)), this.#e.add(t, "contextmenu", (e) => {
      g.fire(this.#i(e) + "rightclick", e), e.preventDefault();
    }), this.#s(t);
  }
  #s = (t) => {
  };
  #n(t) {
    t.isComposing || (t.key in this.#v && (this.#v[t.key] = t.repeat ? 2 : 1), g.fire(fi.modKey(t) + t.key, t));
  }
  #i(t) {
    return (t.altKey ? "alt+" : "") + (t.ctrlKey ? "ctrl+" : "") + (t.metaKey ? "meta+" : "") + (t.shiftKey ? "shift+" : "");
  }
  // 縦回転ホイール
  #o(t) {
    if (this.#c) {
      this.#g = !0;
      return;
    }
    this.#c = !0, this.#h();
    const e = this.#i(t) + (t.deltaY > 0 ? "downwheel" : "upwheel");
    g.fire(e, t);
  }
  #c = !1;
  #g = !1;
  #h() {
    setTimeout(() => {
      if (this.#g) {
        this.#g = !1, this.#h();
        return;
      }
      this.#c = !1;
    }, 250);
  }
  destroy() {
    for (const t of Array.from(document.getElementsByClassName("sn_hint"))) t.parentElement?.removeChild(t);
    k.destroy(), this.#t.destroy(), this.#e.clear();
  }
  fire(t, e) {
    g.fire(t, e);
  }
  unButton(t) {
    this.#t.remove(t);
  }
  button(t, e, s, i, r) {
    !t.fn && !t.label && !t.url && this.main.errScript("fnまたはlabelまたはurlは必須です"), t.fn ??= this.scrItr.scriptFn, e.interactive = !0, e.cursor = "pointer";
    const o = t.key?.toLowerCase() ?? " ", a = C(t, "global", !1);
    k.setEvt2Fnc(a, o, () => this.main.resumeByJumpOrCall(t)), e.on(Ce, (u) => {
      g.fire(o, u);
    });
    const c = t.hint ? () => this.#m(t, e) : () => {
    }, h = () => {
      s(), this.#d.hidden = !0;
    }, l = () => (c(), i());
    if (e.on("pointerover", l), e.on("pointerout", () => {
      this.#t.isFocus(e) ? l() : h();
    }), e.on("pointerdown", () => {
      this.#d.hidden = !0;
      const u = this.#t.getFocus();
      r(), u instanceof it && u.normal();
    }), e.on(
      "pointerup",
      S.isMobile ? h : () => {
        this.#t.isFocus(e) ? l() : h();
      }
    ), this.#t.add(e, l, h), t.clickse && (t.clicksebuf ??= "SYS", this.cfg.searchPath(t.clickse, A.SOUND), e.on("pointerdown", () => {
      this.hTag.playse({ fn: t.clickse, buf: t.clicksebuf, join: !1 });
    })), t.enterse && (t.entersebuf ??= "SYS", this.cfg.searchPath(t.enterse, A.SOUND), e.on("pointerover", () => {
      this.hTag.playse({ fn: t.enterse, buf: t.entersebuf, join: !1 });
    })), t.leavese && (t.leavesebuf ??= "SYS", this.cfg.searchPath(t.leavese, A.SOUND), e.on("pointerout", () => {
      this.hTag.playse({ fn: t.leavese, buf: t.leavesebuf, join: !1 });
    })), t.onenter) {
      const u = o + t.onenter.toLowerCase(), m = { fn: t.fn, label: t.onenter, call: !0, key: u };
      k.setEvt2Fnc(a, u, () => this.main.resumeByJumpOrCall(m)), e.on("pointerover", (p) => g.fire(u, p));
    }
    if (t.onleave) {
      const u = o + t.onleave.toLowerCase(), m = { fn: t.fn, label: t.onleave, call: !0, key: u };
      k.setEvt2Fnc(a, u, () => this.main.resumeByJumpOrCall(m)), e.on("pointerout", (p) => g.fire(u, p));
    }
  }
  #r = {
    getBoundingClientRect: (t = 0, e = 0) => DOMRect.fromRect({ x: t, y: e, width: 0, height: 0 })
  };
  #d;
  #u;
  #f;
  #p = {
    placement: "bottom",
    modifiers: [
      {
        // Flip | Popper https://popper.js.org/docs/v2/modifiers/flip/
        name: "flip",
        options: {
          fallbackPlacements: ["top", "bottom"]
        }
      }
    ]
  };
  #m(t, e) {
    const s = e instanceof it ? e.getBtnBounds() : e.getBounds();
    if (!(t[":タグ名"] === "link")) {
      const r = e.parent.parent;
      s.x += r.x, s.y += r.y;
    }
    if (!t.hint) {
      this.#d.hidden = !0;
      return;
    }
    this.#d.style.cssText = `position:${this.#d.style.position}; transform:${this.#d.style.transform};` + (t.hint_style ?? ""), this.#u.style.cssText = "", this.#u.textContent = t.hint ?? "";
    try {
      const r = t.hint_opt ? { ...this.#p, ...JSON.parse(t.hint_opt) } : this.#p;
      this.#f.setOptions(r);
    } catch (r) {
      console.error(_e(
        t,
        "hint_opt",
        `dispHint 引数 hint_opt エラー ${r instanceof SyntaxError ? r.message : ""}`
      ));
    }
    this.#r.getBoundingClientRect = () => DOMRect.fromRect({
      x: this.sys.ofsLeft4elm + s.x * this.sys.cvsScale,
      y: this.sys.ofsTop4elm + s.y * this.sys.cvsScale,
      width: s.width,
      height: s.height
    }), this.#f.update(), this.#d.hidden = !1;
  }
  hideHint() {
    this.#d.hidden = !0;
  }
  cvsResize() {
    this.hideHint();
  }
  #b(t) {
    const e = t.key;
    if (!e) throw "keyは必須です";
    const s = e.toLowerCase(), i = C(t, "call", !1), r = C(t, "global", !1);
    if (C(t, "del", !1)) {
      if (t.fn || t.label || i || t.url) throw "fn/label/callとdelは同時指定できません";
      return k.clear_eventer(e, r, s), !1;
    }
    if (!t.fn && !t.label && !t.url) throw "fn,label,url いずれかは必須です";
    if (t.fn ??= this.scrItr.scriptFn, e.startsWith("dom=")) {
      const o = k.getHtmlElmList(e);
      if (o.el.length === 0) {
        if (C(t, "need_err", !0)) throw `HTML内にセレクタ（${o.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
        return !1;
      }
      let a = ["click", It];
      switch (o.el[0].type ?? "") {
        //	switch (g.el[0].getAttribute('type') ?? '') { textareaで''になる
        case "checkbox":
          a = ["input"];
          break;
        case "range":
          a = ["input"];
          break;
        case "text":
        case "textarea":
          a = ["input", "change"];
          break;
      }
      const h = a.length;
      for (let l = 0; l < h; ++l) {
        const u = a[l];
        o.el.forEach((m) => {
          this.#e.add(m, u, (p) => {
            if (!g.isWait || this.layMng.getFrmDisabled(o.id) || u === It && p.key !== "Enter") return;
            const d = m.dataset;
            for (const [y, _] of Object.entries(d)) this.val.setVal_Nochk("tmp", `sn.event.domdata.${y}`, _);
            g.fire(e, p);
          }), l === 0 && this.#t.add(
            m,
            () => this.#l(m) ? (m.focus(), !0) : !1,
            () => {
            }
          );
        });
      }
    }
    return k.setEvt2Fnc(r, s, () => this.main.resumeByJumpOrCall(t)), !1;
  }
  #l(t) {
    if (t.offsetParent === null) return !1;
    let e = t;
    do {
      if (getComputedStyle(e).display === "none" || e.dataset.focus === "false" || e?.disabled) return !1;
      e = e.parentElement;
    } while (e !== null);
    return !0;
  }
  // フォーカス移動
  #S(t) {
    const { add: e, del: s, to: i } = t;
    if (e?.startsWith("dom=")) {
      const r = k.getHtmlElmList(e);
      if (r.el.length === 0 && C(t, "need_err", !0)) throw `HTML内にセレクタ（${r.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
      return r.el.forEach((o) => this.#t.add(
        o,
        () => this.#l(o) ? (o.focus(), !0) : !1,
        () => {
        }
      )), !1;
    }
    if (s?.startsWith("dom=")) {
      const r = k.getHtmlElmList(s);
      if (r.el.length === 0 && C(t, "need_err", !0)) throw `HTML内にセレクタ（${r.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
      return r.el.forEach((o) => this.#t.remove(o)), !1;
    }
    if (!i) throw "[set_focus] add か to は必須です";
    switch (i) {
      case "null":
        this.#t.blur();
        break;
      case "next":
        this.#t.next();
        break;
      case "prev":
        this.#t.prev();
        break;
    }
    return !1;
  }
  // キー押しっぱなしスキップ中か
  get isSkipping() {
    return g.isSkipping ? !0 : Object.keys(this.#v).some(
      (t) => this.#v[t] === 2
      /* PUSH_REPEATING */
    );
  }
  // 0:no push  1:one push  2:push repeating
  #v = {
    Alt: 0,
    Meta: 0,
    // COMMANDキー
    Control: 0,
    ArrowDown: 0,
    End: 0,
    Enter: 0,
    Escape: 0,
    " ": 0,
    GoBack: 0
    /* NO_PUSH */
    // AndroidのBackキーだと思う
  };
}
const Xn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EVNM_CLICK: Ce,
  EVNM_KEY: It,
  EventMng: Gn
}, Symbol.toStringTag, { value: "Module" }));
class k {
  static #e;
  static get rs() {
    return this.#e;
  }
  constructor() {
    k.#e = this;
  }
  static #t = {};
  static #s = {};
  static setEvt2Fnc(t, e, s) {
    t ? this.#s[e] = s : this.#t[e] = s;
  }
  static getEvt2Fnc = (t) => this.#t[t] ?? this.#s[t];
  static clear_eventer(t, e, s) {
    if (!t.startsWith("dom=")) return;
    const i = e ? this.#s[s] : this.#t[s];
    i && this.getHtmlElmList(t).el.forEach((r) => r.removeEventListener("click", i)), e ? delete this.#s[s] : delete this.#t[s];
  }
  static popLocalEvts() {
    const t = this.#t;
    return this.#t = {}, t;
  }
  static pushLocalEvts(t) {
    this.#t = t;
  }
  static clear_event(t) {
    const e = C(t, "global", !1), s = e ? this.#s : this.#t;
    for (const [i, r] of Object.entries(s))
      i.startsWith("dom=") && this.getHtmlElmList(i).el.forEach((o) => o.removeEventListener("click", r));
    return e ? this.#s = {} : this.#t = {}, !1;
  }
  static getHtmlElmList(t) {
    const e = t.indexOf(":");
    let s = "";
    if (e >= 0) {
      const i = t.slice(4, e), r = `const.sn.frm.${i}`;
      if (!g.val.getVal(`tmp:${r}`, 0)) throw `HTML【${i}】が読み込まれていません`;
      const a = document.getElementById(i).contentWindow;
      return s = t.slice(e + 1), { el: a.document.querySelectorAll(s), id: i, sel: s };
    }
    return s = t.slice(4), { el: document.querySelectorAll(s), id: "", sel: s };
  }
  // 予約イベントの発生待ち
  static waitRsvEvent(t, e) {
    if (g.val.saveKidoku(), e ? this.#t.click = this.#t.enter = this.#t.arrowdown = // hTag.event({key:'downwheel', breakout: fnc});
    this.#t["wheel.y>0"] = () => e() : (delete this.#t.click, delete this.#t.enter, delete this.#t.arrowdown, delete this.#t["wheel.y>0"]), this.getEvt2Fnc = t ? (s) => this.#t[s] ?? this.#s[s] : (s) => this.#t[s], g.scrItr.noticeWait(), S.debugLog) {
      const s = /* @__PURE__ */ Object.create(null);
      s.local = Object.keys(this.#t), s.global = Object.keys(this.#s), console.log("🎍 wait event... %o", s);
    }
  }
  static waitRsvEvent4Paging() {
    if (this.waitRsvEvent(!0), this.aKeysAtPaging.length === 0) {
      this.getEvt2Fnc = (e) => this.#t[e] ?? this.#s[e];
      return;
    }
    const t = {};
    for (const e of this.aKeysAtPaging) {
      const s = this.#s[e];
      s && (t[e] = s);
    }
    this.getEvt2Fnc = (e) => this.#t[e] ?? t[e];
  }
  fire(t, e) {
    const s = t.toLowerCase();
    if (S.debugLog && console.log(`👺 fire<(key:\`${s}\` type:${e.type} e:%o)`, { ...e }), s === "enter") {
      const r = g.fcs.getFocus();
      if (r instanceof G) {
        r.emit("pointerdown", new PointerEvent("pointerdown"));
        return;
      }
    }
    const i = k.getEvt2Fnc(s);
    i && (e.stopPropagation(), !(!s.startsWith("dom=") && g.layMng.clickTxtLay()) && i(e));
  }
  get isSkipping() {
    return g.skip_enabled;
  }
  isWait = !1;
  static aPage;
  static lenPage = 0;
  static posPage = 0;
  static styPaging;
  static INI_STYPAGE = "color: yellow; text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;";
  static aKeysAtPaging = [];
  static recodePage(t = !1) {
    if (!g.val.getVal("save:sn.doRecLog")) return;
    const { fn: e, idx: s } = g.scrItr.nowScrIdx(), i = `${s - 1}:` + e;
    if (this.aPage.findIndex((o) => o.key === i) > -1) return;
    S.debugLog && console.log(`📜 %crecodePage === week:${t} lenPage:${this.lenPage} len:${this.aPage.length} POP:${!!this.aPage.at(-1)?.week}`, "color:#3B0;"), this.aPage.at(-1)?.week && this.aPage.pop();
    const { max_len: r } = g.cfg.oCfg.log;
    if (this.aPage.push({
      key: i,
      week: t,
      fn: g.val.getVal("save:const.sn.scriptFn", e),
      index: g.val.getVal("save:const.sn.scriptIdx", 0),
      mark: g.scrItr.nowMark()
    }) > r && (this.aPage = this.aPage.slice(-r)), this.lenPage = this.aPage.length, S.debugLog) {
      const o = g.scrItr.nowMark();
      console.log(`   %clenPage:${this.lenPage} (base=${o.hPages.base.fore.sBkFn} 0=${o.hPages[0].fore.sBkFn} mes=${o.hPages.mes.fore.txs.cssText.match(/color: \w+;/)})%c mark:%o`, "color:#3B0;", "", o), console.table(this.aPage);
    }
    g.val.setVal_Nochk("sys", "const.sn.aPageLog", JSON.stringify(this.aPage));
  }
  static playbackPage(t, e) {
    this.aPage = JSON.parse(t), this.lenPage = this.aPage.length, this.posPage >= this.lenPage && (this.posPage = this.lenPage - 1), this.styPaging = e;
  }
  beginProc() {
    new Ks();
  }
  endProc() {
    new le();
  }
  // タグ処理
  l(t) {
    if (console.log(`fn:Reading.ts line:218 [l] isKidoku:${g.scrItr.isKidoku} isNextKidoku:${g.scrItr.isNextKidoku} A:${g.auto_enabled} B:${g.skip_enabled} C:${g.skip_all}`), !g.tagL_enabled) return !1;
    if (k.recodePage(!0), C(t, "visible", !0) && (g.layMng.breakLine(t), g.goTxt()), g.auto_enabled)
      return t.time = Number(g.val.getVal(`sys:sn.auto.msecLineWait${g.scrItr.isKidoku ? "_Kidoku" : ""}`)), this.wait(t);
    if (g.skip_enabled) {
      if (!g.scrItr.isNextKidoku)
        return g.cancelAutoSkip(), new Yt(t), !0;
      if (!g.skip_all && !g.scrItr.isNextKidoku)
        return this.s(t);
      if ("ps".includes(g.val.getVal("sys:sn.skip.mode")))
        return t.time = 50, this.wait(t);
    }
    return new Yt(t), !0;
  }
  p(t) {
    if (console.log(`fn:Reading.ts line:248 [p] isKidoku:${g.scrItr.isKidoku} isNextKidoku:${g.scrItr.isNextKidoku} A:${g.auto_enabled} B:${g.skip_enabled} C:${g.skip_all}`), k.recodePage(), C(t, "visible", !0) && (g.layMng.breakPage(t), g.goTxt()), g.auto_enabled)
      return t.time = Number(g.val.getVal(`sys:sn.auto.msecPageWait${g.scrItr.isKidoku ? "_Kidoku" : ""}`)), this.wait(t);
    if (g.skip_enabled) {
      if (!g.skip_all && !g.scrItr.isNextKidoku)
        return this.s(t);
      if (g.val.getVal("sys:sn.skip.mode") == "s")
        return t.time = 50, this.wait(t);
    }
    return new Yt(t), !0;
  }
  s(t) {
    return k.recodePage(), g.cancelAutoSkip(), new Yt(t), !0;
  }
  wait(t) {
    const e = E(t, "time", NaN);
    if (g.skip_enabled)
      return !g.skip_all && !g.scrItr.isNextKidoku && g.cancelAutoSkip(), !1;
    const s = new re({}), i = "wait", r = () => {
      Ss(s), g.notifyEndProc(i);
    };
    s.to({}, e).onComplete(r).start();
    const o = C(t, "canskip", !0);
    return g.beginProc(i, r, !0, o ? r : void 0), !0;
  }
  page(t) {
    if (!("clear" in t || "to" in t || "style" in t)) throw "clear,style,to いずれかは必須です";
    const { key: e, style: s } = t;
    return e && (k.aKeysAtPaging = e.split(",")), s ? (k.styPaging = s, g.val.setVal_Nochk("save", "const.sn.styPaging", s), !1) : (C(t, "clear", !1) && (k.aPage = [], k.lenPage = 0, k.posPage = 0, g.val.setVal_Nochk("sys", "const.sn.aPageLog", "[]"), g.val.setVal_Nochk("save", "const.sn.styPaging", k.INI_STYPAGE)), !1);
  }
  static destroy() {
    this.#t = {}, this.#s = {}, this.aPage = [], this.lenPage = 0, this.posPage = 0;
  }
}
class le extends k {
  constructor() {
    super(), S.debugLog && console.log("📖 => %cReadingState_go", "color:#3B0;"), g.main.resume();
  }
  fire(t, e) {
  }
  // システムボタンなど無効化
}
class Ks extends k {
  constructor() {
    super(), S.debugLog && console.log("📖 => %cReadingState_proc", "color:#3B0;");
  }
}
class Yt extends k {
  constructor(t) {
    super(), S.debugLog && console.log("📖 => %cReadingState_wait", "color:#3B0;");
    let e = () => {
    };
    const s = C(t, "global", !0);
    switch (t[":タグ名"]) {
      case "wait":
        return;
      // 予約イベント待ち【しない】
      case "s":
        k.waitRsvEvent(s);
        return;
      case "p":
        e = () => {
          C(t, "er", !1) && g.hTag.er(t), g.sndMng.clearCache(), new le();
        };
        break;
      default:
        e = () => new le();
    }
    k.waitRsvEvent(s, e);
  }
  isWait = !0;
  page(t) {
    const e = super.page(t), { to: s } = t;
    if (!s) return e;
    if (k.lenPage < 2) return !1;
    switch (s) {
      case "oldest":
        t.to = "prev", k.posPage = 1;
        break;
      case "newest":
      case "prev":
        t.to = "prev", k.posPage = k.lenPage - 1;
        break;
      // case 'next':		// スルー
      default:
        return !1;
    }
    return Ze.go(t);
  }
}
class Ze extends k {
  constructor() {
    super(), S.debugLog && console.log("📖 => %cReadingState_page", "color:#3B0;"), g.val.setVal_Nochk("tmp", "const.sn.isPaging", !0);
  }
  static go(t) {
    return new Ze().page(t);
  }
  #e = !0;
  get isSkipping() {
    return this.#e;
  }
  isWait = !1;
  beginProc() {
    g.main.stop();
  }
  endProc() {
    g.main.resume();
  }
  // タグ処理
  l(t) {
    return this.#e ? k.posPage === k.lenPage - 1 ? (this.#t(), new le().l(t)) : (C(t, "visible", !0) && g.layMng.breakLine(t), g.layMng.setAllStyle2TxtLay(k.styPaging), g.goTxt(), k.aPage[k.posPage]?.week ? (k.waitRsvEvent4Paging(), !0) : !1) : super.l(t);
  }
  p(t) {
    return this.#e ? k.posPage === k.lenPage - 1 ? (this.#t(), new le().p(t)) : (C(t, "visible", !0) && g.layMng.breakPage(t), g.layMng.setAllStyle2TxtLay(k.styPaging), g.goTxt(), k.waitRsvEvent4Paging(), !0) : super.p(t);
  }
  s(t) {
    return new Yt(t), !0;
  }
  wait() {
    return !1;
  }
  page(t) {
    const { to: e, style: s, clear: i } = t;
    if (s || i) return !1;
    switch (S.debugLog && console.log(`📜 %cpage() pos:${k.posPage}%c len:${k.lenPage} to:${e}`, "color:#3B0;", ""), e) {
      case "oldest":
        if (k.posPage === 0) return !1;
        k.posPage = 0;
        break;
      case "prev":
        if (k.posPage === 0) return !1;
        --k.posPage;
        break;
      case "next":
        if (k.posPage === k.lenPage - 1) return !1;
        ++k.posPage;
        break;
      case "newest":
        if (k.posPage === k.lenPage - 1) return !1;
        k.posPage = k.lenPage - 1;
        break;
      case "exit":
        k.posPage = k.lenPage - 1;
        break;
      case "load":
        k.lenPage = k.posPage + 1, k.aPage = k.aPage.slice(0, k.lenPage), this.#t();
        break;
      default:
        throw `属性to「${e}」は異常です`;
    }
    k.posPage === k.lenPage - 1 && this.#t();
    const r = k.aPage[k.posPage];
    if (!r) throw `posPage異常:${k.posPage}`;
    const { fn: o, index: a, mark: c } = r;
    if (S.debugLog) {
      const h = g.scrItr.nowMark(), { week: l } = k.aPage[k.posPage] ?? { week: !1 };
      console.log(`   -- fn:${o} i:${a} pos:${k.posPage} (base=%c${h.hPages.base.fore.sBkFn}%c 0=%c${h.hPages[0].fore.sBkFn}%c mes=%c${h.hPages.mes.fore.txs.cssText.match(/color: \w+;/)}%c) week:${l} A:${k.posPage === k.lenPage - 1}
   styPaging=%c${k.styPaging}%c
   mark:%o`, "background-color:#3B0; color:#000;", "", "background-color:#B4F; color:#000;", "", "color:#B68;", "", k.styPaging, "", c);
    }
    return g.scrItr.loadFromMark({ fn: o, index: a }, c);
  }
  #t() {
    g.val.setVal_Nochk("tmp", "const.sn.isPaging", !1), this.#e = !1;
  }
}
class g {
  static beginProc(t, e, s = !0, i) {
    if (S.debugLog && console.log(`📖.beginProc id:%c${t}%c onNotify:${!!e} endProc:${s} onClickSkip:${!!i}`, "color:#3B0;", ""), this.#e(), this.#n = t, e) {
      const { promise: r, resolve: o } = Promise.withResolvers();
      r.then((a) => {
        S.debugLog && console.log(`📖.notifyEndProc id:%c${a}%c`, "color:#3B0;", ""), e(), s ? this.endProc(a) : this.#e();
      }), this.#s = o;
    }
    if (i) {
      const r = () => {
        this.cancelAutoSkip(), i(), s && this.endProc(t);
      };
      this.#t.add(window, Ce, (o) => {
        o.stopPropagation(), r();
      }), this.#t.add(window, "keyup", (o) => {
        o.isComposing || (o.stopPropagation(), r());
      }), this.procWheel4wle(this.#t, r);
    }
    k.rs.beginProc();
  }
  static #e() {
    this.#n = "", this.#s = () => {
    }, this.#t.clear();
  }
  static #t = new ue();
  static #s = () => {
  };
  static notifyEndProc(t) {
    this.#s(t);
  }
  static endProc(t) {
    S.debugLog && console.log(`📖.endProc id:%c${t}%c=${this.#n === t}`, "color:#3B0;", ""), this.#n === t && (k.rs.endProc(), this.#e());
  }
  static #n = "";
  static get procID() {
    return `RP_${this.scrItr.scriptFn}:${this.scrItr.idxToken}_`;
  }
  static fire(t, e) {
    k.rs.fire(t, e);
  }
  static get isSkipping() {
    return k.rs.isSkipping;
  }
  static get isWait() {
    return k.rs.isWait;
  }
  // 予約イベントの発生待ち中か
  static tagL_enabled = !0;
  // 頁末まで一気に読み進むか(l無視)
  static skip_all = !1;
  // falseなら既読のみをスキップ
  static skip_enabled = !1;
  // 次の選択肢(/未読)まで進むが有効か
  static auto_enabled = !1;
  // 自動読みすすみモードかどうか
  static cfg;
  static hTag;
  static main;
  static val;
  static scrItr;
  static layMng;
  static goTxt = () => {
  };
  static get needGoTxt() {
    return this.layMng.needGoTxt;
  }
  static evtMng;
  static sndMng;
  static procWheel4wle;
  static fcs;
  static init(t, e, s, i, r, o, a, c, h) {
    this.cfg = t, this.hTag = e, this.main = s, this.val = i, this.scrItr = r, this.layMng = o, this.goTxt = () => o.goTxt(), this.evtMng = a, this.sndMng = c, this.procWheel4wle = h, i.defTmp("sn.tagL.enabled", () => this.tagL_enabled), i.defValTrg("tmp:sn.tagL.enabled", (l, u) => this.tagL_enabled = String(u) !== "false"), i.defTmp("sn.skip.all", () => this.skip_all), i.defValTrg("tmp:sn.skip.all", (l, u) => this.skip_all = String(u) !== "false"), i.defTmp("sn.skip.enabled", () => this.skip_enabled), i.defValTrg("tmp:sn.skip.enabled", (l, u) => this.skip_enabled = String(u) !== "false"), i.defTmp("sn.auto.enabled", () => this.auto_enabled), i.defValTrg("tmp:sn.auto.enabled", (l, u) => this.auto_enabled = String(u) !== "false"), e.l = (l) => k.rs.l(l), e.p = (l) => k.rs.p(l), e.s = (l) => k.rs.s(l), e.wait = (l) => k.rs.wait(l), e.waitclick = (l) => k.rs.s(l), e.page = (l) => k.rs.page(l), new Ks(), e.jump({ fn: "main" });
  }
  static setFcs(t) {
    this.fcs = t;
  }
  static cancelAutoSkip() {
    this.tagL_enabled || (this.tagL_enabled = !0, this.val.setVal_Nochk("tmp", "sn.tagL.enabled", !0)), this.skip_enabled && (this.skip_enabled = !1, this.val.setVal_Nochk("tmp", "sn.skip.enabled", !1)), this.auto_enabled && (this.auto_enabled = !1, this.val.setVal_Nochk("tmp", "sn.auto.enabled", !1));
  }
}
export {
  ee as B,
  Xn as E,
  qn as I,
  Yn as L,
  k as R,
  V as S,
  ds as a,
  xe as b,
  Jn as c
};
//# sourceMappingURL=Reading.js.map
