import { a as w, c as bt, C as ut, b as kt, E as yt, j as Et } from "./web2.js";
var D = Object.freeze({
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
      return 1 - D.Bounce.Out(1 - e);
    },
    Out: function(e) {
      return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
    },
    InOut: function(e) {
      return e < 0.5 ? D.Bounce.In(e * 2) * 0.5 : D.Bounce.Out(e * 2 - 1) * 0.5 + 0.5;
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
}), m = function() {
  return performance.now();
}, Tt = (
  /** @class */
  function() {
    function e() {
      this._tweens = {}, this._tweensAddedDuringUpdate = {};
    }
    return e.prototype.getAll = function() {
      var t = this;
      return Object.keys(this._tweens).map(function(i) {
        return t._tweens[i];
      });
    }, e.prototype.removeAll = function() {
      this._tweens = {};
    }, e.prototype.add = function(t) {
      this._tweens[t.getId()] = t, this._tweensAddedDuringUpdate[t.getId()] = t;
    }, e.prototype.remove = function(t) {
      delete this._tweens[t.getId()], delete this._tweensAddedDuringUpdate[t.getId()];
    }, e.prototype.update = function(t, i) {
      t === void 0 && (t = m()), i === void 0 && (i = !1);
      var s = Object.keys(this._tweens);
      if (s.length === 0)
        return !1;
      for (; s.length > 0; ) {
        this._tweensAddedDuringUpdate = {};
        for (var n = 0; n < s.length; n++) {
          var r = this._tweens[s[n]], a = !i;
          r && r.update(t, a) === !1 && !i && delete this._tweens[s[n]];
        }
        s = Object.keys(this._tweensAddedDuringUpdate);
      }
      return !0;
    }, e;
  }()
), X = {
  Linear: function(e, t) {
    var i = e.length - 1, s = i * t, n = Math.floor(s), r = X.Utils.Linear;
    return t < 0 ? r(e[0], e[1], s) : t > 1 ? r(e[i], e[i - 1], i - s) : r(e[n], e[n + 1 > i ? i : n + 1], s - n);
  },
  Utils: {
    Linear: function(e, t, i) {
      return (t - e) * i + e;
    }
  }
}, dt = (
  /** @class */
  function() {
    function e() {
    }
    return e.nextId = function() {
      return e._nextId++;
    }, e._nextId = 0, e;
  }()
), Y = new Tt(), xt = (
  /** @class */
  function() {
    function e(t, i) {
      i === void 0 && (i = Y), this._object = t, this._group = i, this._isPaused = !1, this._pauseStart = 0, this._valuesStart = {}, this._valuesEnd = {}, this._valuesStartRepeat = {}, this._duration = 1e3, this._isDynamic = !1, this._initialRepeat = 0, this._repeat = 0, this._yoyo = !1, this._isPlaying = !1, this._reversed = !1, this._delayTime = 0, this._startTime = 0, this._easingFunction = D.Linear.None, this._interpolationFunction = X.Linear, this._chainedTweens = [], this._onStartCallbackFired = !1, this._onEveryStartCallbackFired = !1, this._id = dt.nextId(), this._isChainStopped = !1, this._propertiesAreSetUp = !1, this._goToEnd = !1;
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
      if (t === void 0 && (t = m()), i === void 0 && (i = !1), this._isPlaying)
        return this;
      if (this._group && this._group.add(this), this._repeat = this._initialRepeat, this._reversed) {
        this._reversed = !1;
        for (var s in this._valuesStartRepeat)
          this._swapEndStartRepeatValues(s), this._valuesStart[s] = this._valuesStartRepeat[s];
      }
      if (this._isPlaying = !0, this._isPaused = !1, this._onStartCallbackFired = !1, this._onEveryStartCallbackFired = !1, this._isChainStopped = !1, this._startTime = t, this._startTime += this._delayTime, !this._propertiesAreSetUp || i) {
        if (this._propertiesAreSetUp = !0, !this._isDynamic) {
          var n = {};
          for (var r in this._valuesEnd)
            n[r] = this._valuesEnd[r];
          this._valuesEnd = n;
        }
        this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat, i);
      }
      return this;
    }, e.prototype.startFromCurrentValues = function(t) {
      return this.start(t, !0);
    }, e.prototype._setupProperties = function(t, i, s, n, r) {
      for (var a in s) {
        var o = t[a], f = Array.isArray(o), T = f ? "array" : typeof o, b = !f && Array.isArray(s[a]);
        if (!(T === "undefined" || T === "function")) {
          if (b) {
            var _ = s[a];
            if (_.length === 0)
              continue;
            for (var C = [o], p = 0, A = _.length; p < A; p += 1) {
              var K = this._handleRelativeValue(o, _[p]);
              if (isNaN(K)) {
                b = !1, console.warn("Found invalid interpolation list. Skipping.");
                break;
              }
              C.push(K);
            }
            b && (s[a] = C);
          }
          if ((T === "object" || f) && o && !b) {
            i[a] = f ? [] : {};
            var R = o;
            for (var I in R)
              i[a][I] = R[I];
            n[a] = f ? [] : {};
            var _ = s[a];
            if (!this._isDynamic) {
              var j = {};
              for (var I in _)
                j[I] = _[I];
              s[a] = _ = j;
            }
            this._setupProperties(R, i[a], _, n[a], r);
          } else
            (typeof i[a] > "u" || r) && (i[a] = o), f || (i[a] *= 1), b ? n[a] = s[a].slice().reverse() : n[a] = i[a] || 0;
        }
      }
    }, e.prototype.stop = function() {
      return this._isChainStopped || (this._isChainStopped = !0, this.stopChainedTweens()), this._isPlaying ? (this._group && this._group.remove(this), this._isPlaying = !1, this._isPaused = !1, this._onStopCallback && this._onStopCallback(this._object), this) : this;
    }, e.prototype.end = function() {
      return this._goToEnd = !0, this.update(1 / 0), this;
    }, e.prototype.pause = function(t) {
      return t === void 0 && (t = m()), this._isPaused || !this._isPlaying ? this : (this._isPaused = !0, this._pauseStart = t, this._group && this._group.remove(this), this);
    }, e.prototype.resume = function(t) {
      return t === void 0 && (t = m()), !this._isPaused || !this._isPlaying ? this : (this._isPaused = !1, this._startTime += t - this._pauseStart, this._pauseStart = 0, this._group && this._group.add(this), this);
    }, e.prototype.stopChainedTweens = function() {
      for (var t = 0, i = this._chainedTweens.length; t < i; t++)
        this._chainedTweens[t].stop();
      return this;
    }, e.prototype.group = function(t) {
      return t === void 0 && (t = Y), this._group = t, this;
    }, e.prototype.delay = function(t) {
      return t === void 0 && (t = 0), this._delayTime = t, this;
    }, e.prototype.repeat = function(t) {
      return t === void 0 && (t = 0), this._initialRepeat = t, this._repeat = t, this;
    }, e.prototype.repeatDelay = function(t) {
      return this._repeatDelayTime = t, this;
    }, e.prototype.yoyo = function(t) {
      return t === void 0 && (t = !1), this._yoyo = t, this;
    }, e.prototype.easing = function(t) {
      return t === void 0 && (t = D.Linear.None), this._easingFunction = t, this;
    }, e.prototype.interpolation = function(t) {
      return t === void 0 && (t = X.Linear), this._interpolationFunction = t, this;
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
      if (t === void 0 && (t = m()), i === void 0 && (i = !0), this._isPaused)
        return !0;
      var r, a = this._startTime + this._duration;
      if (!this._goToEnd && !this._isPlaying) {
        if (t > a)
          return !1;
        i && this.start(t, !0);
      }
      if (this._goToEnd = !1, t < this._startTime)
        return !0;
      this._onStartCallbackFired === !1 && (this._onStartCallback && this._onStartCallback(this._object), this._onStartCallbackFired = !0), this._onEveryStartCallbackFired === !1 && (this._onEveryStartCallback && this._onEveryStartCallback(this._object), this._onEveryStartCallbackFired = !0);
      var o = t - this._startTime, f = this._duration + ((n = this._repeatDelayTime) !== null && n !== void 0 ? n : this._delayTime), T = this._duration + this._repeat * f, b = function() {
        if (s._duration === 0 || o > T)
          return 1;
        var R = Math.trunc(o / f), I = o - R * f, j = Math.min(I / s._duration, 1);
        return j === 0 && o === s._duration ? 1 : j;
      }, _ = b(), C = this._easingFunction(_);
      if (this._updateProperties(this._object, this._valuesStart, this._valuesEnd, C), this._onUpdateCallback && this._onUpdateCallback(this._object, _), this._duration === 0 || o >= this._duration)
        if (this._repeat > 0) {
          var p = Math.min(Math.trunc((o - this._duration) / f) + 1, this._repeat);
          isFinite(this._repeat) && (this._repeat -= p);
          for (r in this._valuesStartRepeat)
            !this._yoyo && typeof this._valuesEnd[r] == "string" && (this._valuesStartRepeat[r] = // eslint-disable-next-line
            // @ts-ignore FIXME?
            this._valuesStartRepeat[r] + parseFloat(this._valuesEnd[r])), this._yoyo && this._swapEndStartRepeatValues(r), this._valuesStart[r] = this._valuesStartRepeat[r];
          return this._yoyo && (this._reversed = !this._reversed), this._startTime += f * p, this._onRepeatCallback && this._onRepeatCallback(this._object), this._onEveryStartCallbackFired = !1, !0;
        } else {
          this._onCompleteCallback && this._onCompleteCallback(this._object);
          for (var A = 0, K = this._chainedTweens.length; A < K; A++)
            this._chainedTweens[A].start(this._startTime + this._duration, !1);
          return this._isPlaying = !1, !1;
        }
      return !0;
    }, e.prototype._updateProperties = function(t, i, s, n) {
      for (var r in s)
        if (i[r] !== void 0) {
          var a = i[r] || 0, o = s[r], f = Array.isArray(t[r]), T = Array.isArray(o), b = !f && T;
          b ? t[r] = this._interpolationFunction(o, n) : typeof o == "object" && o ? this._updateProperties(t[r], a, o, n) : (o = this._handleRelativeValue(a, o), typeof o == "number" && (t[r] = a + (o - a) * n));
        }
    }, e.prototype._handleRelativeValue = function(t, i) {
      return typeof i != "string" ? i : i.charAt(0) === "+" || i.charAt(0) === "-" ? t + parseFloat(i) : parseFloat(i);
    }, e.prototype._swapEndStartRepeatValues = function(t) {
      var i = this._valuesStartRepeat[t], s = this._valuesEnd[t];
      typeof s == "string" ? this._valuesStartRepeat[t] = this._valuesStartRepeat[t] + parseFloat(s) : this._valuesStartRepeat[t] = this._valuesEnd[t], this._valuesEnd[t] = i;
    }, e;
  }()
);
dt.nextId;
var E = Y;
E.getAll.bind(E);
var St = E.removeAll.bind(E);
E.add.bind(E);
var lt = E.remove.bind(E), Ft = E.update.bind(E);
let ct, tt, l, x, g, pt, _t, vt, M, gt = () => {
}, et, ht, W = !0, S = !1, y = !1, O = !1, h = {}, k = {}, d, v = 0, u = 0, $;
const Pt = "color: yellow; text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;";
let Z = [];
function V() {
  W || (W = !0, l.setVal_Nochk("tmp", "sn.tagL.enabled", !0)), y && (y = !1, l.setVal_Nochk("tmp", "sn.skip.enabled", !1)), O && (O = !1, l.setVal_Nochk("tmp", "sn.auto.enabled", !1));
}
function P() {
  F();
}
function Ot() {
  B();
}
let F = () => new q(), B = () => new wt();
function Mt(e, t) {
  d = JSON.parse(e), v = d.length, u >= v && (u = v - 1), $ = t;
}
class ft {
  #t = new yt();
  constructor(t, i) {
    if (y && !S && !g.isNextKidoku && V(), w(t, "canskip", !0)) {
      const s = () => {
        this.destroy(), V(), i();
      };
      this.#t.add(window, "pointerdown", (n) => {
        n.stopPropagation(), s();
      }), this.#t.add(window, "keydown", (n) => {
        n.isComposing || (n.stopPropagation(), s());
      }), gt(this.#t, s);
    }
  }
  destroy() {
    this.#t.clear();
  }
}
class c {
  constructor(t) {
    this.hArg = t, F = () => new q(), B = () => new wt(), ct(this);
  }
  static init(t, i, s, n, r, a, o, f, T, b, _) {
    ct = t, tt = i, l = s, x = n, g = r, pt = a, _t = o, vt = f, M = () => x.goTxt(), gt = T, et = b, ht = _, new q(), l.defTmp("sn.tagL.enabled", () => W), l.defValTrg("tmp:sn.tagL.enabled", (C, p) => W = String(p) !== "false"), l.defTmp("sn.skip.all", () => S), l.defValTrg("tmp:sn.skip.all", (C, p) => S = String(p) !== "false"), l.defTmp("sn.skip.enabled", () => y), l.defValTrg("tmp:sn.skip.enabled", (C, p) => y = String(p) !== "false"), l.defTmp("sn.auto.enabled", () => O), l.defValTrg("tmp:sn.auto.enabled", (C, p) => O = String(p) !== "false"), h = {}, k = {};
  }
  destroy() {
    this.onFinish = () => {
    }, this.onUserAct = () => {
    }, this.#i.destroy();
  }
  get isSkipping() {
    return y;
  }
  static getHtmlElmList(t) {
    const i = t.indexOf(":");
    let s = "";
    if (i >= 0) {
      const n = t.slice(4, i), r = `const.sn.frm.${n}`;
      if (!l.getVal(`tmp:${r}`, 0)) throw `HTML【${n}】が読み込まれていません`;
      const o = document.getElementById(n).contentWindow;
      return s = t.slice(i + 1), { el: o.document.querySelectorAll(s), id: n, sel: s };
    }
    return s = t.slice(4), { el: document.querySelectorAll(s), id: "", sel: s };
  }
  static setEvt2Fnc(t, i, s) {
    t ? k[i] = s : h[i] = s;
  }
  static getEvt2Fnc = (t) => h[t] ?? k[t];
  static clear_eventer(t, i, s) {
    if (!t.startsWith("dom=")) return;
    const n = i ? k[s] : h[s];
    n && c.getHtmlElmList(t).el.forEach((r) => r.removeEventListener("click", n)), i ? delete k[s] : delete h[s];
  }
  static clear_event(t) {
    const i = w(t, "global", !1), s = i ? k : h;
    for (const [n, r] of Object.entries(s))
      n.startsWith("dom=") && c.getHtmlElmList(n).el.forEach((a) => a.removeEventListener("click", r));
    return i ? k = {} : h = {}, !1;
  }
  s(t) {
    return this.#s(), z.go(t);
  }
  wait = (t) => y ? (!S && !g.isNextKidoku && V(), !1) : st.go(t);
  waitclick = (t) => at.go(t);
  waitTxtAndTimer(t, i) {
    return c.#t.once(c.#e, () => {
      if (this.#i.destroy(), t === 0) {
        this.onFinish();
        return;
      }
      const s = new xt({}).to({}, t).onComplete(() => {
        this.#i.destroy(), lt(s), this.onFinish();
      }).start();
      this.waitLimitedEvent(i, () => {
        s.stop(), lt(s), this.onUserAct();
      });
    }), M(), l.saveKidoku(), this.waitLimitedEvent(i, () => {
      c.#t.removeAllListeners(), this.onUserAct();
    });
  }
  static noticeCompTxt() {
    c.#t.emit(c.#e);
  }
  static #t = new bt();
  // static必須
  static #e = "sn:notice_comp_txt";
  static popLocalEvts() {
    const t = h;
    return h = {}, t;
  }
  static pushLocalEvts(t) {
    h = t;
  }
  // 予約イベントの発生待ち
  waitRsvEvent(t, i) {
    if (l.saveKidoku(), t ? h.click = //this.hTag.event({key:'enter', breakout: fnc});
    //hTag.event({key:'down', breakout: fnc});
    //	hTag.event()は内部で使わず、こうする
    h.enter = h.arrowdown = // hTag.event({key:'downwheel', breakout: fnc});
    //	hTag.event()は内部で使わず、こうする
    h["wheel.y>0"] = () => this.onUserAct() : (delete h.click, delete h.enter, delete h.arrowdown, delete h["wheel.y>0"]), c.getEvt2Fnc = i ? (s) => h[s] ?? k[s] : (s) => h[s], g.noticeWait(), ut.debugLog) {
      const s = /* @__PURE__ */ Object.create(null);
      s.local = Object.keys(h), s.global = Object.keys(k), console.log("🎍 wait event... %o", s);
    }
  }
  l(t) {
    if (!W) return !1;
    if (this.#s(!0), O) {
      const i = Number(l.getVal(`sys:sn.auto.msecLineWait${g.isKidoku ? "_Kidoku" : ""}`));
      return G.go(i, t);
    }
    if (y) {
      if (!S && !g.isNextKidoku) return N.go(t);
      if ("ps".includes(l.getVal("sys:sn.skip.mode"))) return G.go(50, t);
    }
    return nt.go(t);
  }
  p(t) {
    if (this.#s(), O) {
      const i = Number(l.getVal(`sys:sn.auto.msecPageWait${g.isKidoku ? "_Kidoku" : ""}`));
      return H.go(i, t);
    }
    if (y) {
      if (!S && !g.isNextKidoku) return U.go(t);
      if (l.getVal("sys:sn.skip.mode") == "s")
        return H.go(50, t);
    }
    return rt.go(t);
  }
  // 予約イベントの発生待ちしない waitRsvEvent()
  // 使う場合、外部要因でキャンセルした際は breakLimitedEvent() で後始末を忘れないこと
  waitLimitedEvent(t, i) {
    return this.#i.destroy(), this.#i = new ft(t, i), !0;
  }
  breakEvent(t) {
    c.evnm === t && (c.evnm = "", this.#i.destroy(), P());
  }
  #i = new ft({}, () => {
  });
  // ':タグ名' は未定義、デバッグ時に無視を
  static evnm = "";
  // 状態保存する変数はすべて static に
  waitEvent(t, i, s) {
    return c.evnm = t, y && !S && !g.isNextKidoku ? Q.go(i, s) : ot.go(i, s);
  }
  onFinish() {
  }
  onUserAct() {
  }
  isWait = !1;
  // 予約イベントの発生待ち中か
  fire(t, i) {
  }
  page(t) {
    if (!("clear" in t || "to" in t || "style" in t)) throw "clear,style,to いずれかは必須です";
    const { style: i } = t;
    if (i)
      return $ = i, l.setVal_Nochk("save", "const.sn.styPaging", i), !1;
    if (w(t, "clear", !1))
      return d = [], v = 0, u = 0, l.setVal_Nochk("sys", "const.sn.aPageLog", "[]"), l.setVal_Nochk("save", "const.sn.styPaging", Pt), !1;
    const { to: s, key: n } = t;
    switch (n && (Z = n.split(",")), s) {
      case "prev":
        if (u = v - 1, v < 2) return !1;
        break;
    }
    return J.go(t);
  }
  #s(t = !1) {
    if (!l.getVal("save:sn.doRecLog")) return;
    const { fn: i, idx: s } = g.nowScrIdx(), n = `${s - 1}:` + i;
    if (d.findIndex((a) => a.key === n) > -1) return;
    d.at(-1)?.week && d.pop();
    const { max_len: r } = ht.oCfg.log;
    d.push({
      key: n,
      week: t,
      fn: l.getVal("save:const.sn.scriptFn", i),
      index: l.getVal("save:const.sn.scriptIdx", 0),
      mark: g.nowMark()
    }) > r && (d = d.slice(-r)), v = d.length, l.setVal_Nochk("sys", "const.sn.aPageLog", JSON.stringify(d));
  }
}
class q extends c {
  constructor() {
    super({}), tt.resume(), et.hidden = !0;
  }
  breakEvent() {
  }
}
class L extends c {
  isWait = !0;
  // 予約イベントの発生待ち中か
  fire(t, i) {
    const s = t.toLowerCase();
    if (ut.debugLog && console.log(`👺 fire<(key:\`${s}\` type:${i.type} e:%o)`, { ...i }), s === "enter") {
      const r = vt.getFocus();
      if (r instanceof Et) {
        r.emit("pointerdown", new Event("pointerdown"));
        return;
      }
    }
    const n = c.getEvt2Fnc(s);
    if (!n) {
      s.startsWith("swipe") && globalThis.scrollBy(
        -i.deltaX || 0,
        // NaN なので ?? ではダメ
        -i.deltaY || 0
      );
      return;
    }
    s.endsWith("wheel") || i.preventDefault?.(), i.stopPropagation(), !(!s.startsWith("dom=") && x.clickTxtLay()) && n(i);
  }
}
class z extends L {
  static go = (t) => (new z(t).waitTxtAndTimer(0, {}), F = () => {
  }, !0);
  breakEvent() {
  }
  onFinish() {
    it.go(this.hArg);
  }
  onUserAct() {
    this.onFinish();
  }
}
class it extends L {
  static go = (t) => {
    V();
    const i = w(t, "global", !0);
    return new it(t).waitRsvEvent(!1, i), F = () => {
    }, !0;
  };
  breakEvent() {
  }
  onFinish() {
  }
  onUserAct() {
  }
}
class st extends c {
  // 文字表示終了待ち→[wait]
  static go = (t) => {
    const i = kt(t, "time", NaN);
    return new st(t).waitTxtAndTimer(i, t);
  };
  onFinish() {
    P();
  }
  onUserAct() {
    this.onFinish();
  }
}
class nt extends c {
  // 文字表示終了待ち（そして[l]）
  static go = (t) => new nt(t).waitTxtAndTimer(0, t);
  breakEvent() {
  }
  onFinish() {
    N.go(this.hArg);
  }
  onUserAct() {
    this.onFinish();
  }
}
class G extends c {
  // 文字表示終了待ち（そして[l]auto/skipウェイト待ち）
  static go = (t, i) => new G(i).waitTxtAndTimer(t, i);
  breakEvent() {
  }
  onFinish() {
    P();
  }
  onUserAct() {
    N.go(this.hArg);
  }
}
class N extends L {
  // [l] クリック待ち
  static go = (t) => {
    w(t, "visible", !0) && x.breakLine(t), M();
    const i = w(t, "global", !0);
    return new N(t).waitRsvEvent(!0, i), !0;
  };
  onFinish() {
    P();
  }
  onUserAct() {
    P();
  }
}
class rt extends c {
  // 文字表示終了待ち（そして[p]）
  static go = (t) => new rt(t).waitTxtAndTimer(0, t);
  breakEvent() {
  }
  onFinish() {
    U.go(this.hArg);
  }
  onUserAct() {
    this.onFinish();
  }
}
class H extends c {
  // 文字表示終了待ち（そして[p]auto/skipウェイト待ち）
  static go = (t, i) => new H(i).waitTxtAndTimer(t, i);
  breakEvent() {
  }
  onFinish() {
    P();
  }
  onUserAct() {
    U.go(this.hArg);
  }
}
class U extends L {
  // [p] クリック待ち
  static go = (t) => {
    w(t, "visible", !0) && x.breakPage(t), M();
    const i = w(t, "global", !0);
    return new U(t).waitRsvEvent(!0, i), !0;
  };
  onFinish() {
    w(this.hArg, "er", !1) && _t.er(this.hArg), pt.clearCache(), P();
  }
  onUserAct() {
    this.onFinish();
  }
}
class at extends L {
  static go = (t) => new at(t).waitTxtAndTimer(0, t);
  onFinish() {
    V();
    const t = w(this.hArg, "global", !0);
    this.waitRsvEvent(!0, t);
  }
  onUserAct() {
    P();
  }
}
class ot extends c {
  constructor(t, i) {
    super(t), this.onIntr = i;
  }
  // 文字表示終了待ち（そして[*]）
  static go = (t, i) => new ot(t, i).waitTxtAndTimer(0, t);
  onFinish() {
    Q.go(this.hArg, this.onIntr);
  }
  onUserAct() {
    this.onFinish();
  }
}
class Q extends L {
  constructor(t, i) {
    super(t), this.onIntr = i;
  }
  // fireがある → イベント受付する
  //class Rs_Any_Wait extends ReadState {	// fireがない → イベント受付しない
  static go = (t, i) => new Q(t, i).waitLimitedEvent(t, i);
  onFinish() {
    P();
  }
  onUserAct() {
    this.onIntr(), this.onFinish();
  }
}
class wt extends c {
  // fireがない → イベント受付しない
  constructor() {
    super({}), F = () => new q(), B = () => {
    };
  }
  breakEvent() {
  }
}
class J extends z {
  constructor(t) {
    super(t), F = () => {
    }, B = () => new Ct();
  }
  get isSkipping() {
    return !d[u]?.week;
  }
  // return true で良いのだが、[l]でページ移動モードになったあと、[l]に戻ってモード終了してから、[p]に至る文字表示が瞬時表示になる対策
  s = (t) => z.go(t);
  wait = () => !1;
  waitclick = () => !1;
  waitTxtAndTimer = () => !1;
  l(t) {
    return u === v - 1 ? (this.#e(), N.go(t)) : (x.setAllStyle2TxtLay($), M(), d[u]?.week ? (w(t, "visible", !0) && x.breakLine(t), this.#t(), !0) : !1);
  }
  #t() {
    this.waitRsvEvent(!1, !0);
    let t = {};
    if (Z.length === 0) t = k;
    else for (const i of Z) {
      const s = k[i];
      s && (t[i] = s);
    }
    c.getEvt2Fnc = (i) => h[i] ?? t[i];
  }
  p(t) {
    return u === v - 1 ? (this.#e(), U.go(t)) : (x.setAllStyle2TxtLay($), M(), w(t, "visible", !0) && x.breakPage(t), this.#t(), !0);
  }
  static go = (t) => (l.setVal_Nochk("tmp", "const.sn.isPaging", !0), new J(t).page(t));
  page(t) {
    const { to: i, style: s, clear: n } = t;
    if (s || n) return !1;
    switch (i) {
      case "prev":
        if (u === 0) return !1;
        --u;
        break;
      case "next":
        if (u === v - 1) return !1;
        ++u;
        break;
      case "exit":
        u = v - 1, this.#e();
        break;
      case "load":
        v = u + 1, d = d.slice(0, v);
        break;
      default:
        throw `属性to「${i}」は異常です`;
    }
    const r = d[u];
    if (!r) throw `[page] posPage異常:${u}`;
    const { fn: a, index: o, mark: f } = r;
    return g.loadFromMark({ fn: a, index: o }, f);
  }
  #e() {
    l.setVal_Nochk("tmp", "const.sn.isPaging", !1);
  }
  onFinish() {
  }
  onUserAct() {
  }
}
class Ct extends c {
  // fireがない → イベント受付しない
  constructor() {
    super({}), F = () => {
      new J({}), tt.resume(), et.hidden = !0;
    }, B = () => {
    };
  }
  breakEvent() {
  }
}
export {
  D as E,
  Pt as I,
  c as R,
  xt as T,
  St as a,
  Ot as d,
  P as e,
  Mt as p,
  lt as r,
  Ft as u
};
//# sourceMappingURL=ReadState.js.map
