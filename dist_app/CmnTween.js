import { a as _, I as B, H as A, E as q, e as y, o as H, k as M } from "./app2.js";
var h = Object.freeze({
  Linear: Object.freeze({
    None: function(e) {
      return e;
    },
    In: function(e) {
      return e;
    },
    Out: function(e) {
      return e;
    },
    InOut: function(e) {
      return e;
    }
  }),
  Quadratic: Object.freeze({
    In: function(e) {
      return e * e;
    },
    Out: function(e) {
      return e * (2 - e);
    },
    InOut: function(e) {
      return (e *= 2) < 1 ? 0.5 * e * e : -0.5 * (--e * (e - 2) - 1);
    }
  }),
  Cubic: Object.freeze({
    In: function(e) {
      return e * e * e;
    },
    Out: function(e) {
      return --e * e * e + 1;
    },
    InOut: function(e) {
      return (e *= 2) < 1 ? 0.5 * e * e * e : 0.5 * ((e -= 2) * e * e + 2);
    }
  }),
  Quartic: Object.freeze({
    In: function(e) {
      return e * e * e * e;
    },
    Out: function(e) {
      return 1 - --e * e * e * e;
    },
    InOut: function(e) {
      return (e *= 2) < 1 ? 0.5 * e * e * e * e : -0.5 * ((e -= 2) * e * e * e - 2);
    }
  }),
  Quintic: Object.freeze({
    In: function(e) {
      return e * e * e * e * e;
    },
    Out: function(e) {
      return --e * e * e * e * e + 1;
    },
    InOut: function(e) {
      return (e *= 2) < 1 ? 0.5 * e * e * e * e * e : 0.5 * ((e -= 2) * e * e * e * e + 2);
    }
  }),
  Sinusoidal: Object.freeze({
    In: function(e) {
      return 1 - Math.sin((1 - e) * Math.PI / 2);
    },
    Out: function(e) {
      return Math.sin(e * Math.PI / 2);
    },
    InOut: function(e) {
      return 0.5 * (1 - Math.sin(Math.PI * (0.5 - e)));
    }
  }),
  Exponential: Object.freeze({
    In: function(e) {
      return e === 0 ? 0 : Math.pow(1024, e - 1);
    },
    Out: function(e) {
      return e === 1 ? 1 : 1 - Math.pow(2, -10 * e);
    },
    InOut: function(e) {
      return e === 0 ? 0 : e === 1 ? 1 : (e *= 2) < 1 ? 0.5 * Math.pow(1024, e - 1) : 0.5 * (-Math.pow(2, -10 * (e - 1)) + 2);
    }
  }),
  Circular: Object.freeze({
    In: function(e) {
      return 1 - Math.sqrt(1 - e * e);
    },
    Out: function(e) {
      return Math.sqrt(1 - --e * e);
    },
    InOut: function(e) {
      return (e *= 2) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
    }
  }),
  Elastic: Object.freeze({
    In: function(e) {
      return e === 0 ? 0 : e === 1 ? 1 : -Math.pow(2, 10 * (e - 1)) * Math.sin((e - 1.1) * 5 * Math.PI);
    },
    Out: function(e) {
      return e === 0 ? 0 : e === 1 ? 1 : Math.pow(2, -10 * e) * Math.sin((e - 0.1) * 5 * Math.PI) + 1;
    },
    InOut: function(e) {
      return e === 0 ? 0 : e === 1 ? 1 : (e *= 2, e < 1 ? -0.5 * Math.pow(2, 10 * (e - 1)) * Math.sin((e - 1.1) * 5 * Math.PI) : 0.5 * Math.pow(2, -10 * (e - 1)) * Math.sin((e - 1.1) * 5 * Math.PI) + 1);
    }
  }),
  Back: Object.freeze({
    In: function(e) {
      var t = 1.70158;
      return e === 1 ? 1 : e * e * ((t + 1) * e - t);
    },
    Out: function(e) {
      var t = 1.70158;
      return e === 0 ? 0 : --e * e * ((t + 1) * e + t) + 1;
    },
    InOut: function(e) {
      var t = 2.5949095;
      return (e *= 2) < 1 ? 0.5 * (e * e * ((t + 1) * e - t)) : 0.5 * ((e -= 2) * e * ((t + 1) * e + t) + 2);
    }
  }),
  Bounce: Object.freeze({
    In: function(e) {
      return 1 - h.Bounce.Out(1 - e);
    },
    Out: function(e) {
      return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
    },
    InOut: function(e) {
      return e < 0.5 ? h.Bounce.In(e * 2) * 0.5 : h.Bounce.Out(e * 2 - 1) * 0.5 + 0.5;
    }
  }),
  generatePow: function(e) {
    return e === void 0 && (e = 4), e = e < Number.EPSILON ? Number.EPSILON : e, e = e > 1e4 ? 1e4 : e, {
      In: function(t) {
        return Math.pow(t, e);
      },
      Out: function(t) {
        return 1 - Math.pow(1 - t, e);
      },
      InOut: function(t) {
        return t < 0.5 ? Math.pow(t * 2, e) / 2 : (1 - Math.pow(2 - t * 2, e)) / 2 + 0.5;
      }
    };
  }
}), x = function() {
  return performance.now();
}, Q = (
  /** @class */
  function() {
    function e() {
      for (var t = [], i = 0; i < arguments.length; i++)
        t[i] = arguments[i];
      this._tweens = {}, this._tweensAddedDuringUpdate = {}, this.add.apply(this, t);
    }
    return e.prototype.getAll = function() {
      var t = this;
      return Object.keys(this._tweens).map(function(i) {
        return t._tweens[i];
      });
    }, e.prototype.removeAll = function() {
      this._tweens = {};
    }, e.prototype.add = function() {
      for (var t, i = [], s = 0; s < arguments.length; s++)
        i[s] = arguments[s];
      for (var n = 0, o = i; n < o.length; n++) {
        var a = o[n];
        (t = a._group) === null || t === void 0 || t.remove(a), a._group = this, this._tweens[a.getId()] = a, this._tweensAddedDuringUpdate[a.getId()] = a;
      }
    }, e.prototype.remove = function() {
      for (var t = [], i = 0; i < arguments.length; i++)
        t[i] = arguments[i];
      for (var s = 0, n = t; s < n.length; s++) {
        var o = n[s];
        o._group = void 0, delete this._tweens[o.getId()], delete this._tweensAddedDuringUpdate[o.getId()];
      }
    }, e.prototype.allStopped = function() {
      return this.getAll().every(function(t) {
        return !t.isPlaying();
      });
    }, e.prototype.update = function(t, i) {
      t === void 0 && (t = x()), i === void 0 && (i = !0);
      var s = Object.keys(this._tweens);
      if (s.length !== 0)
        for (; s.length > 0; ) {
          this._tweensAddedDuringUpdate = {};
          for (var n = 0; n < s.length; n++) {
            var o = this._tweens[s[n]], a = !i;
            o && o.update(t, a) === !1 && !i && this.remove(o);
          }
          s = Object.keys(this._tweensAddedDuringUpdate);
        }
    }, e;
  }()
), j = {
  Linear: function(e, t) {
    var i = e.length - 1, s = i * t, n = Math.floor(s), o = j.Utils.Linear;
    return t < 0 ? o(e[0], e[1], s) : t > 1 ? o(e[i], e[i - 1], i - s) : o(e[n], e[n + 1 > i ? i : n + 1], s - n);
  },
  Utils: {
    Linear: function(e, t, i) {
      return (t - e) * i + e;
    }
  }
}, V = (
  /** @class */
  function() {
    function e() {
    }
    return e.nextId = function() {
      return e._nextId++;
    }, e._nextId = 0, e;
  }()
), R = new Q(), m = (
  /** @class */
  function() {
    function e(t, i) {
      this._isPaused = !1, this._pauseStart = 0, this._valuesStart = {}, this._valuesEnd = {}, this._valuesStartRepeat = {}, this._duration = 1e3, this._isDynamic = !1, this._initialRepeat = 0, this._repeat = 0, this._yoyo = !1, this._isPlaying = !1, this._reversed = !1, this._delayTime = 0, this._startTime = 0, this._easingFunction = h.Linear.None, this._interpolationFunction = j.Linear, this._chainedTweens = [], this._onStartCallbackFired = !1, this._onEveryStartCallbackFired = !1, this._id = V.nextId(), this._isChainStopped = !1, this._propertiesAreSetUp = !1, this._goToEnd = !1, this._object = t, typeof i == "object" ? (this._group = i, i.add(this)) : i === !0 && (this._group = R, R.add(this));
    }
    return e.prototype.getId = function() {
      return this._id;
    }, e.prototype.isPlaying = function() {
      return this._isPlaying;
    }, e.prototype.isPaused = function() {
      return this._isPaused;
    }, e.prototype.getDuration = function() {
      return this._duration;
    }, e.prototype.to = function(t, i) {
      if (i === void 0 && (i = 1e3), this._isPlaying)
        throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");
      return this._valuesEnd = t, this._propertiesAreSetUp = !1, this._duration = i < 0 ? 0 : i, this;
    }, e.prototype.duration = function(t) {
      return t === void 0 && (t = 1e3), this._duration = t < 0 ? 0 : t, this;
    }, e.prototype.dynamic = function(t) {
      return t === void 0 && (t = !1), this._isDynamic = t, this;
    }, e.prototype.start = function(t, i) {
      if (t === void 0 && (t = x()), i === void 0 && (i = !1), this._isPlaying)
        return this;
      if (this._repeat = this._initialRepeat, this._reversed) {
        this._reversed = !1;
        for (var s in this._valuesStartRepeat)
          this._swapEndStartRepeatValues(s), this._valuesStart[s] = this._valuesStartRepeat[s];
      }
      if (this._isPlaying = !0, this._isPaused = !1, this._onStartCallbackFired = !1, this._onEveryStartCallbackFired = !1, this._isChainStopped = !1, this._startTime = t, this._startTime += this._delayTime, !this._propertiesAreSetUp || i) {
        if (this._propertiesAreSetUp = !0, !this._isDynamic) {
          var n = {};
          for (var o in this._valuesEnd)
            n[o] = this._valuesEnd[o];
          this._valuesEnd = n;
        }
        this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat, i);
      }
      return this;
    }, e.prototype.startFromCurrentValues = function(t) {
      return this.start(t, !0);
    }, e.prototype._setupProperties = function(t, i, s, n, o) {
      for (var a in s) {
        var l = t[a], g = Array.isArray(l), d = g ? "array" : typeof l, u = !g && Array.isArray(s[a]);
        if (!(d === "undefined" || d === "function")) {
          if (u) {
            var f = s[a];
            if (f.length === 0)
              continue;
            for (var w = [l], b = 0, v = f.length; b < v; b += 1) {
              var I = this._handleRelativeValue(l, f[b]);
              if (isNaN(I)) {
                u = !1, console.warn("Found invalid interpolation list. Skipping.");
                break;
              }
              w.push(I);
            }
            u && (s[a] = w);
          }
          if ((d === "object" || g) && l && !u) {
            i[a] = g ? [] : {};
            var S = l;
            for (var P in S)
              i[a][P] = S[P];
            n[a] = g ? [] : {};
            var f = s[a];
            if (!this._isDynamic) {
              var O = {};
              for (var P in f)
                O[P] = f[P];
              s[a] = f = O;
            }
            this._setupProperties(S, i[a], f, n[a], o);
          } else
            (typeof i[a] > "u" || o) && (i[a] = l), g || (i[a] *= 1), u ? n[a] = s[a].slice().reverse() : n[a] = i[a] || 0;
        }
      }
    }, e.prototype.stop = function() {
      return this._isChainStopped || (this._isChainStopped = !0, this.stopChainedTweens()), this._isPlaying ? (this._isPlaying = !1, this._isPaused = !1, this._onStopCallback && this._onStopCallback(this._object), this) : this;
    }, e.prototype.end = function() {
      return this._goToEnd = !0, this.update(this._startTime + this._duration), this;
    }, e.prototype.pause = function(t) {
      return t === void 0 && (t = x()), this._isPaused || !this._isPlaying ? this : (this._isPaused = !0, this._pauseStart = t, this);
    }, e.prototype.resume = function(t) {
      return t === void 0 && (t = x()), !this._isPaused || !this._isPlaying ? this : (this._isPaused = !1, this._startTime += t - this._pauseStart, this._pauseStart = 0, this);
    }, e.prototype.stopChainedTweens = function() {
      for (var t = 0, i = this._chainedTweens.length; t < i; t++)
        this._chainedTweens[t].stop();
      return this;
    }, e.prototype.group = function(t) {
      return t ? (t.add(this), this) : (console.warn("tween.group() without args has been removed, use group.add(tween) instead."), this);
    }, e.prototype.remove = function() {
      var t;
      return (t = this._group) === null || t === void 0 || t.remove(this), this;
    }, e.prototype.delay = function(t) {
      return t === void 0 && (t = 0), this._delayTime = t, this;
    }, e.prototype.repeat = function(t) {
      return t === void 0 && (t = 0), this._initialRepeat = t, this._repeat = t, this;
    }, e.prototype.repeatDelay = function(t) {
      return this._repeatDelayTime = t, this;
    }, e.prototype.yoyo = function(t) {
      return t === void 0 && (t = !1), this._yoyo = t, this;
    }, e.prototype.easing = function(t) {
      return t === void 0 && (t = h.Linear.None), this._easingFunction = t, this;
    }, e.prototype.interpolation = function(t) {
      return t === void 0 && (t = j.Linear), this._interpolationFunction = t, this;
    }, e.prototype.chain = function() {
      for (var t = [], i = 0; i < arguments.length; i++)
        t[i] = arguments[i];
      return this._chainedTweens = t, this;
    }, e.prototype.onStart = function(t) {
      return this._onStartCallback = t, this;
    }, e.prototype.onEveryStart = function(t) {
      return this._onEveryStartCallback = t, this;
    }, e.prototype.onUpdate = function(t) {
      return this._onUpdateCallback = t, this;
    }, e.prototype.onRepeat = function(t) {
      return this._onRepeatCallback = t, this;
    }, e.prototype.onComplete = function(t) {
      return this._onCompleteCallback = t, this;
    }, e.prototype.onStop = function(t) {
      return this._onStopCallback = t, this;
    }, e.prototype.update = function(t, i) {
      var s = this, n;
      if (t === void 0 && (t = x()), i === void 0 && (i = e.autoStartOnUpdate), this._isPaused)
        return !0;
      var o;
      if (!this._goToEnd && !this._isPlaying)
        if (i)
          this.start(t, !0);
        else
          return !1;
      if (this._goToEnd = !1, t < this._startTime)
        return !0;
      this._onStartCallbackFired === !1 && (this._onStartCallback && this._onStartCallback(this._object), this._onStartCallbackFired = !0), this._onEveryStartCallbackFired === !1 && (this._onEveryStartCallback && this._onEveryStartCallback(this._object), this._onEveryStartCallbackFired = !0);
      var a = t - this._startTime, l = this._duration + ((n = this._repeatDelayTime) !== null && n !== void 0 ? n : this._delayTime), g = this._duration + this._repeat * l, d = function() {
        if (s._duration === 0 || a > g)
          return 1;
        var I = Math.trunc(a / l), S = a - I * l, P = Math.min(S / s._duration, 1);
        return P === 0 && a === s._duration ? 1 : P;
      }, u = d(), f = this._easingFunction(u);
      if (this._updateProperties(this._object, this._valuesStart, this._valuesEnd, f), this._onUpdateCallback && this._onUpdateCallback(this._object, u), this._duration === 0 || a >= this._duration)
        if (this._repeat > 0) {
          var w = Math.min(Math.trunc((a - this._duration) / l) + 1, this._repeat);
          isFinite(this._repeat) && (this._repeat -= w);
          for (o in this._valuesStartRepeat)
            !this._yoyo && typeof this._valuesEnd[o] == "string" && (this._valuesStartRepeat[o] = // eslint-disable-next-line
            // @ts-ignore FIXME?
            this._valuesStartRepeat[o] + parseFloat(this._valuesEnd[o])), this._yoyo && this._swapEndStartRepeatValues(o), this._valuesStart[o] = this._valuesStartRepeat[o];
          return this._yoyo && (this._reversed = !this._reversed), this._startTime += l * w, this._onRepeatCallback && this._onRepeatCallback(this._object), this._onEveryStartCallbackFired = !1, !0;
        } else {
          this._onCompleteCallback && this._onCompleteCallback(this._object);
          for (var b = 0, v = this._chainedTweens.length; b < v; b++)
            this._chainedTweens[b].start(this._startTime + this._duration, !1);
          return this._isPlaying = !1, !1;
        }
      return !0;
    }, e.prototype._updateProperties = function(t, i, s, n) {
      for (var o in s)
        if (i[o] !== void 0) {
          var a = i[o] || 0, l = s[o], g = Array.isArray(t[o]), d = Array.isArray(l), u = !g && d;
          u ? t[o] = this._interpolationFunction(l, n) : typeof l == "object" && l ? this._updateProperties(t[o], a, l, n) : (l = this._handleRelativeValue(a, l), typeof l == "number" && (t[o] = a + (l - a) * n));
        }
    }, e.prototype._handleRelativeValue = function(t, i) {
      return typeof i != "string" ? i : i.charAt(0) === "+" || i.charAt(0) === "-" ? t + parseFloat(i) : parseFloat(i);
    }, e.prototype._swapEndStartRepeatValues = function(t) {
      var i = this._valuesStartRepeat[t], s = this._valuesEnd[t];
      typeof s == "string" ? this._valuesStartRepeat[t] = this._valuesStartRepeat[t] + parseFloat(s) : this._valuesStartRepeat[t] = this._valuesEnd[t], this._valuesEnd[t] = i;
    }, e.autoStartOnUpdate = !1, e;
  }()
);
V.nextId;
var k = R;
k.getAll.bind(k);
k.removeAll.bind(k);
k.add.bind(k);
k.remove.bind(k);
k.update.bind(k);
class r {
  static #e = new Q();
  static init() {
    p.addGrp(r.#e);
  }
  static #s;
  static get rs() {
    return this.#s;
  }
  constructor() {
    r.#s = this;
  }
  static #t = {};
  static #i = {};
  static setEvt2Fnc(t, i, s) {
    t ? this.#i[i] = s : this.#t[i] = s;
  }
  static getEvt2Fnc = (t) => this.#t[t] ?? this.#i[t];
  static clear_eventer(t, i, s) {
    if (!t.startsWith("dom=")) return;
    const n = i ? this.#i[s] : this.#t[s];
    n && this.getHtmlElmList(t).el.forEach((o) => o.removeEventListener("click", n)), i ? delete this.#i[s] : delete this.#t[s];
  }
  static popLocalEvts() {
    const t = this.#t;
    return this.#t = {}, t;
  }
  static pushLocalEvts(t) {
    this.#t = t;
  }
  static clear_event(t) {
    const i = y(t, "global", !1), s = i ? this.#i : this.#t;
    for (const [n, o] of Object.entries(s))
      n.startsWith("dom=") && this.getHtmlElmList(n).el.forEach((a) => a.removeEventListener("click", o));
    return i ? this.#i = {} : this.#t = {}, !1;
  }
  static getHtmlElmList(t) {
    const i = t.indexOf(":");
    let s = "";
    if (i >= 0) {
      const n = t.slice(4, i), o = `const.sn.frm.${n}`;
      if (!c.val.getVal(`tmp:${o}`, 0)) throw `HTML【${n}】が読み込まれていません`;
      const a = document.getElementById(n);
      if (!a) throw `HTML【${n}】の要素(id=${n})がありません`;
      const l = a.contentWindow;
      return s = t.slice(i + 1), { el: l.document.querySelectorAll(s), id: n, sel: s };
    }
    return s = t.slice(4), { el: document.querySelectorAll(s), id: "", sel: s };
  }
  // 予約イベントの発生待ち
  static waitRsvEvent(t, i) {
    c.val.saveKidoku(), i ? this.#t.click = this.#t.enter = this.#t.arrowdown = // hTag.event({key:'downwheel', breakout: fnc});
    this.#t["wheel.y>0"] = () => i() : (delete this.#t.click, delete this.#t.enter, delete this.#t.arrowdown, delete this.#t["wheel.y>0"]), this.getEvt2Fnc = t ? (s) => this.#t[s] ?? this.#i[s] : (s) => this.#t[s], c.scrItr.noticeWait(), _.debugLog && console.log("🎍 wait event... %o", {
      local: Object.keys(this.#t),
      global: Object.keys(this.#i)
    });
  }
  static waitRsvEvent4Paging() {
    if (this.waitRsvEvent(!0), this.aKeysAtPaging.length === 0) {
      this.getEvt2Fnc = (i) => this.#t[i] ?? this.#i[i];
      return;
    }
    const t = {};
    for (const i of this.aKeysAtPaging) {
      const s = this.#i[i];
      s && (t[i] = s);
    }
    this.getEvt2Fnc = (i) => this.#t[i] ?? t[i];
  }
  fire(t, i) {
    const s = t.toLowerCase();
    switch (s) {
      case "click":
      case "rightclick":
      // 右クリックメニューに入って出られない
      case "middleclick":
      // 〃
      case "enter":
      case "arrowdown":
        if (c.evtMng.isSkipping) break;
        if (!r.isFirstFire()) return;
        break;
    }
    if (s === "enter") {
      const o = c.fcs.getFocus();
      if (o instanceof H) {
        o.emit(B, new PointerEvent(B));
        return;
      }
    }
    const n = r.getEvt2Fnc(s);
    n && (i.stopImmediatePropagation?.(), !(!s.startsWith("dom=") && c.layMng.clickTxtLay()) && n(i));
  }
  get skip_enabled() {
    return c.skip_enabled;
  }
  isWait = !1;
  // イベント複数発生回避（ボタンとステージクリックなど）
  static #n = !1;
  static isFirstFire() {
    return r.#n ? !1 : (r.#n = !0, !0);
  }
  static resetFired() {
    r.#n = !1;
  }
  static aPage;
  static lenPage = 0;
  static posPage = 0;
  static styPaging;
  static INI_STYPAGE = "color: yellow; text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;";
  static aKeysAtPaging = [];
  static recodePage(t = !1) {
    if (!c.val.getVal("save:sn.doRecLog")) return;
    const { fn: i, idx: s } = c.scrItr.nowScrIdx(), n = `${String(s - 1)}:` + i;
    if (this.aPage.findIndex((l) => l.key === n) > -1) return;
    _.debugLog && console.log(`📜 %crecodePage === week:${String(t)} lenPage:${String(this.lenPage)} len:${String(this.aPage.length)} POP:${String(this.aPage.at(-1)?.week)}`, "color:#3B0;"), this.aPage.at(-1)?.week && this.aPage.pop();
    const { max_len: o } = c.cfg.oCfg.log, a = c.scrItr.nowMark();
    a.hSave["const.sn.sLog"] = "[]", this.aPage.push({
      key: n,
      week: t,
      fn: c.val.getVal("save:const.sn.scriptFn", i),
      index: c.val.getVal("save:const.sn.scriptIdx", 0),
      mark: a
    }) > o && (this.aPage = this.aPage.slice(-o)), this.lenPage = this.aPage.length, _.debugLog && (console.log(`   %clenPage:${String(this.lenPage)} (base=${a.hPages.base.fore.sBkFn} 0=${a.hPages[0].fore.sBkFn} mes=${String(
      /color: \w+;/.exec((a.hPages.mes?.fore).txs.cssText)
    )})%c mark:%o`, "color:#3B0;", "", a), console.table(this.aPage)), c.val.setVal_Nochk("sys", "const.sn.aPageLog", JSON.stringify(this.aPage));
  }
  static playbackPage(t, i) {
    this.aPage = JSON.parse(t), this.lenPage = this.aPage.length, this.posPage >= this.lenPage && (this.posPage = this.lenPage - 1), this.styPaging = i;
  }
  beginProc() {
    new K();
  }
  endProc() {
    new T();
  }
  // タグ処理
  l(t) {
    if (!c.tagL_enabled) return !1;
    if (r.recodePage(!0), c.auto_enabled)
      return t.time = Number(c.val.getVal(`sys:sn.auto.msecLineWait${c.scrItr.isKidoku ? "_Kidoku" : ""}`)), this.wait(t);
    if (c.skip_enabled) {
      if (!c.skip_all && !c.scrItr.isNextKidoku)
        c.cancelAutoSkip();
      else if ("ps".includes(String(c.val.getVal("sys:sn.skip.mode"))))
        return t.time = 50, this.wait(t);
    }
    return y(t, "visible", !0) && (c.layMng.breakLine(t), c.goTxt()), new $(t), !0;
  }
  p(t) {
    if (r.recodePage(), c.auto_enabled)
      return t.time = Number(c.val.getVal(`sys:sn.auto.msecPageWait${c.scrItr.isKidoku ? "_Kidoku" : ""}`)), this.wait(t);
    if (c.skip_enabled) {
      if (!c.skip_all && !c.scrItr.isNextKidoku)
        c.cancelAutoSkip();
      else if (String(c.val.getVal("sys:sn.skip.mode")) === "s")
        return t.time = 50, this.wait(t);
    }
    return y(t, "visible", !0) && (c.layMng.breakPage(t), c.goTxt()), new $(t), !0;
  }
  s(t) {
    return r.recodePage(), c.cancelAutoSkip(), new $(t), !0;
  }
  wait(t) {
    const i = M(t, "time", NaN);
    if (c.skip_enabled)
      return !c.skip_all && !c.scrItr.isNextKidoku && c.cancelAutoSkip(), !1;
    const s = new m({}), n = "wait", o = () => {
      r.#e.remove(s), c.notifyEndProc(n);
    };
    s.to({}, i).onComplete(o).start(), r.#e.add(s);
    const a = y(t, "canskip", !0);
    return c.beginProc(n, o, !0, a ? o : void 0), !0;
  }
  page(t) {
    if (!("clear" in t || "to" in t || "style" in t)) throw "clear,style,to いずれかは必須です";
    const { key: i, style: s } = t;
    return i && (r.aKeysAtPaging = i.split(",")), s ? (r.styPaging = s, c.val.setVal_Nochk("save", "const.sn.styPaging", s), !1) : (y(t, "clear", !1) && (r.aPage = [], r.lenPage = 0, r.posPage = 0, c.val.setVal_Nochk("sys", "const.sn.aPageLog", "[]"), c.val.setVal_Nochk("save", "const.sn.styPaging", r.INI_STYPAGE)), !1);
  }
  static destroy() {
    this.#t = {}, this.#i = {}, this.aPage = [], this.lenPage = 0, this.posPage = 0;
  }
}
class T extends r {
  constructor() {
    super(), _.debugLog && console.log("📖 => %cReadingState_go", "color:#3B0;"), c.main.resume();
  }
  fire(t, i) {
  }
  // システムボタンなど無効化
}
class K extends r {
  constructor() {
    super(), _.debugLog && console.log("📖 => %cReadingState_proc", "color:#3B0;");
  }
  fire(t, i) {
  }
  // システムボタンなど無効化
}
class $ extends r {
  constructor(t) {
    super(), _.debugLog && console.log("📖 => %cReadingState_wait", "color:#3B0;");
    let i = () => {
    };
    const s = y(t, "global", !0);
    switch (t[":タグ名"]) {
      case "wait":
        return;
      // 予約イベント待ち【しない】
      case "s":
        r.waitRsvEvent(s);
        return;
      case "p":
        i = () => {
          y(t, "er", !1) && c.hTag.er(t), c.sndMng.clearCache(), new T();
        };
        break;
      default:
        i = () => new T();
    }
    r.waitRsvEvent(s, i);
  }
  isWait = !0;
  page(t) {
    const i = super.page(t), { to: s } = t;
    if (!s) return i;
    if (r.lenPage < 2) return !1;
    switch (s) {
      case "oldest":
        t.to = "prev", r.posPage = 1;
        break;
      case "newest":
      case "prev":
        t.to = "prev", r.posPage = r.lenPage - 1;
        break;
      // case 'next':		// スルー
      default:
        return !1;
    }
    return W.go(t);
  }
}
class W extends r {
  constructor() {
    super(), _.debugLog && console.log("📖 => %cReadingState_page", "color:#3B0;"), c.val.setVal_Nochk("tmp", "const.sn.isPaging", !0);
  }
  static go(t) {
    return new W().page(t);
  }
  #e = !0;
  get skip_enabled() {
    return this.#e;
  }
  isWait = !1;
  beginProc() {
    c.main.stop();
  }
  endProc() {
    c.main.resume();
  }
  // タグ処理
  l(t) {
    return this.#e ? r.posPage === r.lenPage - 1 ? (this.#s(), new T().l(t)) : (y(t, "visible", !0) && c.layMng.breakLine(t), c.layMng.setAllStyle2TxtLay(r.styPaging), c.goTxt(), r.aPage[r.posPage]?.week ? (r.waitRsvEvent4Paging(), !0) : !1) : super.l(t);
  }
  p(t) {
    return this.#e ? r.posPage === r.lenPage - 1 ? (this.#s(), new T().p(t)) : (y(t, "visible", !0) && c.layMng.breakPage(t), c.layMng.setAllStyle2TxtLay(r.styPaging), c.goTxt(), r.waitRsvEvent4Paging(), !0) : super.p(t);
  }
  s(t) {
    return new $(t), !0;
  }
  wait() {
    return !1;
  }
  page(t) {
    const { to: i, style: s, clear: n } = t;
    if (s || n) return !1;
    switch (_.debugLog && console.log(`📜 %cpage() pos:${String(r.posPage)}%c len:${String(r.lenPage)} to:${String(i)}`, "color:#3B0;", ""), i) {
      case "oldest":
        if (r.posPage === 0) return !1;
        r.posPage = 0;
        break;
      case "prev":
        if (r.posPage === 0) return !1;
        --r.posPage;
        break;
      case "next":
        if (r.posPage === r.lenPage - 1) return !1;
        ++r.posPage;
        break;
      case "newest":
        if (r.posPage === r.lenPage - 1) return !1;
        r.posPage = r.lenPage - 1;
        break;
      case "exit":
        r.posPage = r.lenPage - 1;
        break;
      case "load":
        r.lenPage = r.posPage + 1, r.aPage = r.aPage.slice(0, r.lenPage), this.#s();
        break;
      default:
        throw `属性to「${String(i)}」は異常です`;
    }
    r.posPage === r.lenPage - 1 && this.#s();
    const o = r.aPage[r.posPage];
    if (!o) throw `posPage異常:${String(r.posPage)}`;
    const { fn: a, index: l, mark: g } = o;
    if (_.debugLog) {
      const d = c.scrItr.nowMark(), { week: u } = r.aPage[r.posPage] ?? { week: !1 };
      console.log(`   -- fn:${a} i:${String(l)} pos:${String(r.posPage)} (base=%c${(d.hPages.base?.fore).sBkFn}%c 0=%c${(d.hPages[0]?.fore).sBkFn}%c mes=%c${String(
        /color: \w+;/.exec((d.hPages.mes?.fore).txs.cssText)
      )}%c) week:${String(u)} A:${String(
        r.posPage === r.lenPage - 1
      )}
   styPaging=%c${r.styPaging}%c
   mark:%o`, "background-color:#3B0; color:#000;", "", "background-color:#B4F; color:#000;", "", "color:#B68;", "", r.styPaging, "", g);
    }
    return c.scrItr.loadFromMark({ fn: a, index: l }, g);
  }
  #s() {
    c.val.setVal_Nochk("tmp", "const.sn.isPaging", !1), this.#e = !1;
  }
}
class c {
  static beginProc(t, i, s = !0, n) {
    if (_.debugLog && console.log(`📖.beginProc id:%c${t}%c onNotify:${String(i)} endProc:${String(s)} onClickSkip:${String(n)}`, "color:#3B0;", ""), this.#e(), this.#i = t, i) {
      const { promise: o, resolve: a } = Promise.withResolvers();
      o.then((l) => {
        _.debugLog && console.log(`📖.callBack id:%c${l}%c`, "color:#3B0;", ""), i(), s ? this.endProc(l) : this.#e();
      }), this.#t = a;
    }
    if (n) {
      const o = () => {
        this.cancelAutoSkip(), n(), s && this.endProc(t);
      };
      this.#s.add(this.main.cvs, B, (a) => {
        a.stopPropagation(), o();
      }), this.#s.add(document, A, (a) => {
        a.isComposing || (a.stopPropagation(), o());
      }), this.procWheel4wle(this.#s, o);
    }
    r.rs.beginProc();
  }
  static #e() {
    this.#i = "", this.#t = () => {
    }, this.#s.clear();
  }
  static #s = new q();
  static #t = () => {
  };
  static notifyEndProc(t) {
    _.debugLog && console.log(`📖.notifyEndProc id:%c${t}%c=${String(this.#i === t)}`, "color:#3B0;", ""), this.#i === t && this.#t(t);
  }
  static endProc(t) {
    _.debugLog && console.log(`📖.endProc id:%c${t}%c=${String(this.#i === t)}`, "color:#3B0;", ""), this.#i === t && (r.rs.endProc(), this.#e());
  }
  static #i = "";
  static get procID() {
    return `RP_${this.scrItr.scriptFn}:${String(this.scrItr.idxToken)}_`;
  }
  static fire(t, i, s = !1) {
    s && this.cancelAutoSkip(), r.rs.fire(t, i);
  }
  static get isSkipping() {
    return r.rs.skip_enabled;
  }
  static get isWait() {
    return r.rs.isWait;
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
  static init(t, i, s, n, o, a, l, g, d) {
    this.cfg = t, this.hTag = i, this.main = s, this.val = n, this.scrItr = o, this.layMng = a, this.goTxt = () => a.goTxt(), this.evtMng = l, this.sndMng = g, this.procWheel4wle = d, n.defTmp("sn.tagL.enabled", () => this.tagL_enabled), n.defValTrg("tmp:sn.tagL.enabled", (u, f) => {
      this.tagL_enabled = String(f) !== "false";
    }), n.defTmp("sn.skip.all", () => this.skip_all), n.defValTrg("tmp:sn.skip.all", (u, f) => {
      this.skip_all = String(f) !== "false";
    }), n.defTmp("sn.skip.enabled", () => this.skip_enabled), n.defValTrg("tmp:sn.skip.enabled", (u, f) => {
      this.skip_enabled = String(f) !== "false";
    }), n.defTmp("sn.auto.enabled", () => this.auto_enabled), n.defValTrg("tmp:sn.auto.enabled", (u, f) => {
      this.auto_enabled = String(f) !== "false";
    }), i.l = (u) => r.rs.l(u), i.p = (u) => r.rs.p(u), i.s = (u) => r.rs.s(u), i.wait = (u) => r.rs.wait(u), i.waitclick = (u) => r.rs.s(u), i.page = (u) => r.rs.page(u), r.init(), new K(), i.jump({ fn: "main" });
  }
  static setFcs(t) {
    this.fcs = t;
  }
  static cancelAutoSkip() {
    this.tagL_enabled || (this.tagL_enabled = !0, this.val.setVal_Nochk("tmp", "sn.tagL.enabled", !0)), this.skip_enabled && (this.skip_enabled = !1, this.val.setVal_Nochk("tmp", "sn.skip.enabled", !1)), this.auto_enabled && (this.auto_enabled = !1, this.val.setVal_Nochk("tmp", "sn.auto.enabled", !1));
  }
}
const N = `trans
`, G = "tsy nm:";
class p {
  static #e = {};
  static #s;
  static init(t) {
    p.#e = {}, p.#s = t, p.addGrp(p.#i);
    function i(s) {
      for (const n of p.#n) n.update(s);
      p.#t(i);
    }
    p.#t(i);
  }
  static #t = (t) => requestAnimationFrame(t);
  static #i = new Q();
  static #n = [];
  static addGrp(t) {
    p.#n.push(t);
  }
  static destroy() {
    p.#t = () => 0, p.stopAllTw();
  }
  // トゥイーン全停止
  static stopAllTw() {
    p.#e = {};
    for (const t of p.#n) t.removeAll();
    p.#n = [];
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static setTwProp(t, i) {
    const s = M(i, "repeat", 1);
    return t.delay(M(i, "delay", 0)).easing(this.ease(i.ease)).repeat(s > 0 ? s - 1 : 1 / 0).yoyo(y(i, "yoyo", !1));
  }
  static #a = {
    "Back.In": (t) => h.Back.In(t),
    "Back.InOut": (t) => h.Back.InOut(t),
    "Back.Out": (t) => h.Back.Out(t),
    "Bounce.In": (t) => h.Bounce.In(t),
    "Bounce.InOut": (t) => h.Bounce.InOut(t),
    "Bounce.Out": (t) => h.Bounce.Out(t),
    "Circular.In": (t) => h.Circular.In(t),
    "Circular.InOut": (t) => h.Circular.InOut(t),
    "Circular.Out": (t) => h.Circular.Out(t),
    "Cubic.In": (t) => h.Cubic.In(t),
    "Cubic.InOut": (t) => h.Cubic.InOut(t),
    "Cubic.Out": (t) => h.Cubic.Out(t),
    "Elastic.In": (t) => h.Elastic.In(t),
    "Elastic.InOut": (t) => h.Elastic.InOut(t),
    "Elastic.Out": (t) => h.Elastic.Out(t),
    "Exponential.In": (t) => h.Exponential.In(t),
    "Exponential.InOut": (t) => h.Exponential.InOut(t),
    "Exponential.Out": (t) => h.Exponential.Out(t),
    "Linear.None": (t) => h.Linear.None(t),
    "Quadratic.In": (t) => h.Quadratic.In(t),
    "Quadratic.InOut": (t) => h.Quadratic.InOut(t),
    "Quadratic.Out": (t) => h.Quadratic.Out(t),
    "Quartic.In": (t) => h.Quartic.In(t),
    "Quartic.InOut": (t) => h.Quartic.InOut(t),
    "Quartic.Out": (t) => h.Quartic.Out(t),
    "Quintic.In": (t) => h.Quintic.In(t),
    "Quintic.InOut": (t) => h.Quintic.InOut(t),
    "Quintic.Out": (t) => h.Quintic.Out(t),
    "Sinusoidal.In": (t) => h.Sinusoidal.In(t),
    "Sinusoidal.InOut": (t) => h.Sinusoidal.InOut(t),
    "Sinusoidal.Out": (t) => h.Sinusoidal.Out(t)
  };
  static ease(t) {
    if (!t) return (s) => h.Linear.None(s);
    const i = this.#a[t];
    if (!i) throw "異常なease指定です";
    return i;
  }
  static aLayerPrpNm = [
    "alpha",
    "height",
    "rotation",
    // rotationX〜Z、scaleZ、zは設定すると
    "scale_x",
    // 三次元方向の拡大縮小ルーチンが働き画像がぼやけるので
    "scale_y",
    // backlayで設定しない方針
    "pivot_x",
    "pivot_y",
    "width",
    "x",
    "y"
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static cnvTweenArg(t, i) {
    const s = {};
    for (const n of p.aLayerPrpNm) {
      const o = t[n];
      if (!o) continue;
      const a = String(o), l = a.startsWith("="), g = l ? a.slice(1) : a;
      if (!g) continue;
      const [d = "0", u] = g.split(","), f = s[n] = parseFloat(d);
      u && (s[n] += Math.round(
        Math.random() * (parseFloat(u) - f + 1)
      )), l && (s[n] += parseFloat(i[n]));
    }
    return s;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static tween(t, i, s, n, o, a, l, g = !0) {
    const d = this.#s.isSkipping ? 0 : M(i, "time", NaN), u = new m(s).to(n, d).onUpdate((v) => o(v));
    this.setTwProp(u, i), this.#e[t] = { tw: u, onEnd: l }, p.#i.add(u);
    const { path: f } = i;
    let w = u;
    if (f) {
      _.debugLog && console.group(`🍝 [${i[":タグ名"] ?? ""}] path=${f}= start(${String(s.x)},${String(s.y)},${String(s.alpha)})`);
      for (const { groups: v } of f.matchAll(this.#o)) {
        const { x: I, x2: S, y: P, y2: O, o: C, o2: D, json: L } = v;
        let E = {};
        if (L) try {
          E = JSON.parse(L);
        } catch (z) {
          console.error(`🍝 json=${L} ` + String(z));
          continue;
        }
        else
          (I ?? S) && (E.x = I ?? S), (P ?? O) && (E.y = P ?? O), (C ?? D) && (E.alpha = Number(C ?? D));
        const U = this.cnvTweenArg(E, s);
        _.debugLog && console.info(`🍝 ${L ?? `{x:${String(I)} y:${String(P)} o:${String(C)}}`} => hTo:${JSON.stringify(U)}`);
        const F = new m(s).to(U, d);
        this.setTwProp(F, i), w.chain(F), w = F;
      }
      _.debugLog && console.groupEnd();
    }
    w.onComplete(() => {
      const v = this.#e[t];
      v?.tw && (delete this.#e[t], v.tw = void 0, u.stop(), v.onEnd?.(), a(), c.notifyEndProc(G + t));
    });
    const { chain: b } = i;
    if (b) {
      const v = this.#e[b];
      if (!v?.tw) throw `${b}は存在しない・または終了したトゥイーンです`;
      delete v.onEnd, v.tw.chain(u);
    } else g && u.start();
    return u;
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
  static #o = /\(\s*(?:(?<x>[-=\d.]+)|(['"])(?<x2>.*?)\2)?(?:\s*,\s*(?:(?<y>[-=\d.]+)|(['"])(?<y2>.*?)\5)?(?:\s*,\s*(?:(?<o>[-=\d.]+)|(['"])(?<o2>.*?)\8))?)?|(?<json>\{[^{}]*})/g;
  // トランス終了待ち
  static wt(t) {
    if (!this.#e[N]?.tw) return !1;
    const s = () => this.stopEndTrans();
    return c.beginProc(N, s, !0, s), !0;
  }
  // レイヤのトランジションの停止
  static stopEndTrans() {
    this.#e[N]?.tw?.stop().end();
  }
  // stop()とend()は別
  // トゥイーン終了待ち
  static wait_tsy(t) {
    const i = this.#r(t), s = this.#e[i];
    if (!s?.tw) return !1;
    const n = () => s.tw?.end();
    return c.beginProc(G + i, n, !0, n), !0;
  }
  static #r(t) {
    const { layer: i = "", id: s, name: n } = t, o = s ? `frm
${s}` : n ?? i;
    if (!o) throw "トゥイーンが指定されていません";
    return o;
  }
  // トゥイーン中断
  static stop_tsy(t) {
    const i = this.#r(t);
    return this.#e[i]?.tw?.stop().end(), !1;
  }
  // 一時停止
  static pause_tsy(t) {
    const i = this.#r(t);
    return this.#e[i]?.tw?.pause(), !1;
  }
  // 一時停止再開
  static resume_tsy(t) {
    const i = this.#r(t);
    return this.#e[i]?.tw?.resume(), !1;
  }
}
export {
  p as C,
  Q as G,
  r as R,
  m as T,
  c as a,
  N as b
};
//# sourceMappingURL=CmnTween.js.map
