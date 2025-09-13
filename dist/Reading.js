import { a as _, d as p, C as N, h as C, b as R, c as j, E as B } from "./web2.js";
var E = Object.freeze({
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
      return 1 - E.Bounce.Out(1 - e);
    },
    Out: function(e) {
      return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
    },
    InOut: function(e) {
      return e < 0.5 ? E.Bounce.In(e * 2) * 0.5 : E.Bounce.Out(e * 2 - 1) * 0.5 + 0.5;
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
}), y = function() {
  return performance.now();
}, W = (
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
      t === void 0 && (t = y()), i === void 0 && (i = !1);
      var s = Object.keys(this._tweens);
      if (s.length === 0)
        return !1;
      for (; s.length > 0; ) {
        this._tweensAddedDuringUpdate = {};
        for (var r = 0; r < s.length; r++) {
          var o = this._tweens[s[r]], l = !i;
          o && o.update(t, l) === !1 && !i && delete this._tweens[s[r]];
        }
        s = Object.keys(this._tweensAddedDuringUpdate);
      }
      return !0;
    }, e;
  }()
), x = {
  Linear: function(e, t) {
    var i = e.length - 1, s = i * t, r = Math.floor(s), o = x.Utils.Linear;
    return t < 0 ? o(e[0], e[1], s) : t > 1 ? o(e[i], e[i - 1], i - s) : o(e[r], e[r + 1 > i ? i : r + 1], s - r);
  },
  Utils: {
    Linear: function(e, t, i) {
      return (t - e) * i + e;
    }
  }
}, F = (
  /** @class */
  function() {
    function e() {
    }
    return e.nextId = function() {
      return e._nextId++;
    }, e._nextId = 0, e;
  }()
), L = new W(), m = (
  /** @class */
  function() {
    function e(t, i) {
      i === void 0 && (i = L), this._object = t, this._group = i, this._isPaused = !1, this._pauseStart = 0, this._valuesStart = {}, this._valuesEnd = {}, this._valuesStartRepeat = {}, this._duration = 1e3, this._isDynamic = !1, this._initialRepeat = 0, this._repeat = 0, this._yoyo = !1, this._isPlaying = !1, this._reversed = !1, this._delayTime = 0, this._startTime = 0, this._easingFunction = E.Linear.None, this._interpolationFunction = x.Linear, this._chainedTweens = [], this._onStartCallbackFired = !1, this._onEveryStartCallbackFired = !1, this._id = F.nextId(), this._isChainStopped = !1, this._propertiesAreSetUp = !1, this._goToEnd = !1;
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
      if (t === void 0 && (t = y()), i === void 0 && (i = !1), this._isPlaying)
        return this;
      if (this._group && this._group.add(this), this._repeat = this._initialRepeat, this._reversed) {
        this._reversed = !1;
        for (var s in this._valuesStartRepeat)
          this._swapEndStartRepeatValues(s), this._valuesStart[s] = this._valuesStartRepeat[s];
      }
      if (this._isPlaying = !0, this._isPaused = !1, this._onStartCallbackFired = !1, this._onEveryStartCallbackFired = !1, this._isChainStopped = !1, this._startTime = t, this._startTime += this._delayTime, !this._propertiesAreSetUp || i) {
        if (this._propertiesAreSetUp = !0, !this._isDynamic) {
          var r = {};
          for (var o in this._valuesEnd)
            r[o] = this._valuesEnd[o];
          this._valuesEnd = r;
        }
        this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat, i);
      }
      return this;
    }, e.prototype.startFromCurrentValues = function(t) {
      return this.start(t, !0);
    }, e.prototype._setupProperties = function(t, i, s, r, o) {
      for (var l in s) {
        var c = t[l], f = Array.isArray(c), g = f ? "array" : typeof c, h = !f && Array.isArray(s[l]);
        if (!(g === "undefined" || g === "function")) {
          if (h) {
            var u = s[l];
            if (u.length === 0)
              continue;
            for (var S = [c], P = 0, b = u.length; P < b; P += 1) {
              var T = this._handleRelativeValue(c, u[P]);
              if (isNaN(T)) {
                h = !1, console.warn("Found invalid interpolation list. Skipping.");
                break;
              }
              S.push(T);
            }
            h && (s[l] = S);
          }
          if ((g === "object" || f) && c && !h) {
            i[l] = f ? [] : {};
            var k = c;
            for (var v in k)
              i[l][v] = k[v];
            r[l] = f ? [] : {};
            var u = s[l];
            if (!this._isDynamic) {
              var w = {};
              for (var v in u)
                w[v] = u[v];
              s[l] = u = w;
            }
            this._setupProperties(k, i[l], u, r[l], o);
          } else
            (typeof i[l] > "u" || o) && (i[l] = c), f || (i[l] *= 1), h ? r[l] = s[l].slice().reverse() : r[l] = i[l] || 0;
        }
      }
    }, e.prototype.stop = function() {
      return this._isChainStopped || (this._isChainStopped = !0, this.stopChainedTweens()), this._isPlaying ? (this._group && this._group.remove(this), this._isPlaying = !1, this._isPaused = !1, this._onStopCallback && this._onStopCallback(this._object), this) : this;
    }, e.prototype.end = function() {
      return this._goToEnd = !0, this.update(1 / 0), this;
    }, e.prototype.pause = function(t) {
      return t === void 0 && (t = y()), this._isPaused || !this._isPlaying ? this : (this._isPaused = !0, this._pauseStart = t, this._group && this._group.remove(this), this);
    }, e.prototype.resume = function(t) {
      return t === void 0 && (t = y()), !this._isPaused || !this._isPlaying ? this : (this._isPaused = !1, this._startTime += t - this._pauseStart, this._pauseStart = 0, this._group && this._group.add(this), this);
    }, e.prototype.stopChainedTweens = function() {
      for (var t = 0, i = this._chainedTweens.length; t < i; t++)
        this._chainedTweens[t].stop();
      return this;
    }, e.prototype.group = function(t) {
      return t === void 0 && (t = L), this._group = t, this;
    }, e.prototype.delay = function(t) {
      return t === void 0 && (t = 0), this._delayTime = t, this;
    }, e.prototype.repeat = function(t) {
      return t === void 0 && (t = 0), this._initialRepeat = t, this._repeat = t, this;
    }, e.prototype.repeatDelay = function(t) {
      return this._repeatDelayTime = t, this;
    }, e.prototype.yoyo = function(t) {
      return t === void 0 && (t = !1), this._yoyo = t, this;
    }, e.prototype.easing = function(t) {
      return t === void 0 && (t = E.Linear.None), this._easingFunction = t, this;
    }, e.prototype.interpolation = function(t) {
      return t === void 0 && (t = x.Linear), this._interpolationFunction = t, this;
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
      var s = this, r;
      if (t === void 0 && (t = y()), i === void 0 && (i = !0), this._isPaused)
        return !0;
      var o, l = this._startTime + this._duration;
      if (!this._goToEnd && !this._isPlaying) {
        if (t > l)
          return !1;
        i && this.start(t, !0);
      }
      if (this._goToEnd = !1, t < this._startTime)
        return !0;
      this._onStartCallbackFired === !1 && (this._onStartCallback && this._onStartCallback(this._object), this._onStartCallbackFired = !0), this._onEveryStartCallbackFired === !1 && (this._onEveryStartCallback && this._onEveryStartCallback(this._object), this._onEveryStartCallbackFired = !0);
      var c = t - this._startTime, f = this._duration + ((r = this._repeatDelayTime) !== null && r !== void 0 ? r : this._delayTime), g = this._duration + this._repeat * f, h = function() {
        if (s._duration === 0 || c > g)
          return 1;
        var k = Math.trunc(c / f), v = c - k * f, w = Math.min(v / s._duration, 1);
        return w === 0 && c === s._duration ? 1 : w;
      }, u = h(), S = this._easingFunction(u);
      if (this._updateProperties(this._object, this._valuesStart, this._valuesEnd, S), this._onUpdateCallback && this._onUpdateCallback(this._object, u), this._duration === 0 || c >= this._duration)
        if (this._repeat > 0) {
          var P = Math.min(Math.trunc((c - this._duration) / f) + 1, this._repeat);
          isFinite(this._repeat) && (this._repeat -= P);
          for (o in this._valuesStartRepeat)
            !this._yoyo && typeof this._valuesEnd[o] == "string" && (this._valuesStartRepeat[o] = // eslint-disable-next-line
            // @ts-ignore FIXME?
            this._valuesStartRepeat[o] + parseFloat(this._valuesEnd[o])), this._yoyo && this._swapEndStartRepeatValues(o), this._valuesStart[o] = this._valuesStartRepeat[o];
          return this._yoyo && (this._reversed = !this._reversed), this._startTime += f * P, this._onRepeatCallback && this._onRepeatCallback(this._object), this._onEveryStartCallbackFired = !1, !0;
        } else {
          this._onCompleteCallback && this._onCompleteCallback(this._object);
          for (var b = 0, T = this._chainedTweens.length; b < T; b++)
            this._chainedTweens[b].start(this._startTime + this._duration, !1);
          return this._isPlaying = !1, !1;
        }
      return !0;
    }, e.prototype._updateProperties = function(t, i, s, r) {
      for (var o in s)
        if (i[o] !== void 0) {
          var l = i[o] || 0, c = s[o], f = Array.isArray(t[o]), g = Array.isArray(c), h = !f && g;
          h ? t[o] = this._interpolationFunction(c, r) : typeof c == "object" && c ? this._updateProperties(t[o], l, c, r) : (c = this._handleRelativeValue(l, c), typeof c == "number" && (t[o] = l + (c - l) * r));
        }
    }, e.prototype._handleRelativeValue = function(t, i) {
      return typeof i != "string" ? i : i.charAt(0) === "+" || i.charAt(0) === "-" ? t + parseFloat(i) : parseFloat(i);
    }, e.prototype._swapEndStartRepeatValues = function(t) {
      var i = this._valuesStartRepeat[t], s = this._valuesEnd[t];
      typeof s == "string" ? this._valuesStartRepeat[t] = this._valuesStartRepeat[t] + parseFloat(s) : this._valuesStartRepeat[t] = this._valuesEnd[t], this._valuesEnd[t] = i;
    }, e;
  }()
);
F.nextId;
var d = L;
d.getAll.bind(d);
var V = d.removeAll.bind(d);
d.add.bind(d);
var D = d.remove.bind(d), K = d.update.bind(d);
class n {
  static #i;
  static get rs() {
    return this.#i;
  }
  constructor() {
    n.#i = this;
  }
  static #t = {};
  static #e = {};
  static setEvt2Fnc(t, i, s) {
    t ? this.#e[i] = s : this.#t[i] = s;
  }
  static getEvt2Fnc = (t) => this.#t[t] ?? this.#e[t];
  static clear_eventer(t, i, s) {
    if (!t.startsWith("dom=")) return;
    const r = i ? this.#e[s] : this.#t[s];
    r && this.getHtmlElmList(t).el.forEach((o) => o.removeEventListener("click", r)), i ? delete this.#e[s] : delete this.#t[s];
  }
  static popLocalEvts() {
    const t = this.#t;
    return this.#t = {}, t;
  }
  static pushLocalEvts(t) {
    this.#t = t;
  }
  static clear_event(t) {
    const i = _(t, "global", !1), s = i ? this.#e : this.#t;
    for (const [r, o] of Object.entries(s))
      r.startsWith("dom=") && this.getHtmlElmList(r).el.forEach((l) => l.removeEventListener("click", o));
    return i ? this.#e = {} : this.#t = {}, !1;
  }
  static getHtmlElmList(t) {
    const i = t.indexOf(":");
    let s = "";
    if (i >= 0) {
      const r = t.slice(4, i), o = `const.sn.frm.${r}`;
      if (!a.val.getVal(`tmp:${o}`, 0)) throw `HTML【${r}】が読み込まれていません`;
      const c = document.getElementById(r).contentWindow;
      return s = t.slice(i + 1), { el: c.document.querySelectorAll(s), id: r, sel: s };
    }
    return s = t.slice(4), { el: document.querySelectorAll(s), id: "", sel: s };
  }
  // 予約イベントの発生待ち
  static waitRsvEvent(t, i) {
    if (a.val.saveKidoku(), i ? this.#t.click = this.#t.enter = this.#t.arrowdown = // hTag.event({key:'downwheel', breakout: fnc});
    this.#t["wheel.y>0"] = () => i() : (delete this.#t.click, delete this.#t.enter, delete this.#t.arrowdown, delete this.#t["wheel.y>0"]), this.getEvt2Fnc = t ? (s) => this.#t[s] ?? this.#e[s] : (s) => this.#t[s], a.scrItr.noticeWait(), p.debugLog) {
      const s = /* @__PURE__ */ Object.create(null);
      s.local = Object.keys(this.#t), s.global = Object.keys(this.#e), console.log("🎍 wait event... %o", s);
    }
  }
  static waitRsvEvent4Paging() {
    if (this.waitRsvEvent(!0), this.aKeysAtPaging.length === 0) {
      this.getEvt2Fnc = (i) => this.#t[i] ?? this.#e[i];
      return;
    }
    const t = {};
    for (const i of this.aKeysAtPaging) {
      const s = this.#e[i];
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
        if (!n.isFirstFire()) return;
        break;
    }
    if (s === "enter") {
      const o = a.fcs.getFocus();
      if (o instanceof N) {
        o.emit(C, new PointerEvent(C));
        return;
      }
    }
    const r = n.getEvt2Fnc(s);
    r && (i.stopImmediatePropagation(), !(!s.startsWith("dom=") && a.layMng.clickTxtLay()) && r(i));
  }
  get isSkipping() {
    return a.skip_enabled;
  }
  isWait = !1;
  // イベント複数発生回避（ボタンとステージクリックなど）
  static #s = !1;
  static isFirstFire() {
    return n.#s ? !1 : (n.#s = !0, !0);
  }
  static resetFired() {
    n.#s = !1;
  }
  static aPage;
  static lenPage = 0;
  static posPage = 0;
  static styPaging;
  static INI_STYPAGE = "color: yellow; text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;";
  static aKeysAtPaging = [];
  static recodePage(t = !1) {
    if (!a.val.getVal("save:sn.doRecLog")) return;
    const { fn: i, idx: s } = a.scrItr.nowScrIdx(), r = `${s - 1}:` + i;
    if (this.aPage.findIndex((l) => l.key === r) > -1) return;
    p.debugLog && console.log(`📜 %crecodePage === week:${t} lenPage:${this.lenPage} len:${this.aPage.length} POP:${!!this.aPage.at(-1)?.week}`, "color:#3B0;"), this.aPage.at(-1)?.week && this.aPage.pop();
    const { max_len: o } = a.cfg.oCfg.log;
    if (this.aPage.push({
      key: r,
      week: t,
      fn: a.val.getVal("save:const.sn.scriptFn", i),
      index: a.val.getVal("save:const.sn.scriptIdx", 0),
      mark: a.scrItr.nowMark()
    }) > o && (this.aPage = this.aPage.slice(-o)), this.lenPage = this.aPage.length, p.debugLog) {
      const l = a.scrItr.nowMark();
      console.log(`   %clenPage:${this.lenPage} (base=${l.hPages.base.fore.sBkFn} 0=${l.hPages[0].fore.sBkFn} mes=${l.hPages.mes.fore.txs.cssText.match(/color: \w+;/)})%c mark:%o`, "color:#3B0;", "", l), console.table(this.aPage);
    }
    a.val.setVal_Nochk("sys", "const.sn.aPageLog", JSON.stringify(this.aPage));
  }
  static playbackPage(t, i) {
    this.aPage = JSON.parse(t), this.lenPage = this.aPage.length, this.posPage >= this.lenPage && (this.posPage = this.lenPage - 1), this.styPaging = i;
  }
  beginProc() {
    new $();
  }
  endProc() {
    new I();
  }
  // タグ処理
  l(t) {
    if (!a.tagL_enabled) return !1;
    if (n.recodePage(!0), a.auto_enabled)
      return t.time = Number(a.val.getVal(`sys:sn.auto.msecLineWait${a.scrItr.isKidoku ? "_Kidoku" : ""}`)), this.wait(t);
    if (a.skip_enabled) {
      if (!a.skip_all && !a.scrItr.isNextKidoku)
        a.cancelAutoSkip();
      else if ("ps".includes(a.val.getVal("sys:sn.skip.mode")))
        return t.time = 50, this.wait(t);
    }
    return _(t, "visible", !0) && (a.layMng.breakLine(t), a.goTxt()), new M(t), !0;
  }
  p(t) {
    if (n.recodePage(), a.auto_enabled)
      return t.time = Number(a.val.getVal(`sys:sn.auto.msecPageWait${a.scrItr.isKidoku ? "_Kidoku" : ""}`)), this.wait(t);
    if (a.skip_enabled) {
      if (!a.skip_all && !a.scrItr.isNextKidoku)
        a.cancelAutoSkip();
      else if (a.val.getVal("sys:sn.skip.mode") == "s")
        return t.time = 50, this.wait(t);
    }
    return _(t, "visible", !0) && (a.layMng.breakPage(t), a.goTxt()), new M(t), !0;
  }
  s(t) {
    return n.recodePage(), a.cancelAutoSkip(), new M(t), !0;
  }
  wait(t) {
    const i = R(t, "time", NaN);
    if (a.skip_enabled)
      return !a.skip_all && !a.scrItr.isNextKidoku && a.cancelAutoSkip(), !1;
    const s = new m({}), r = "wait", o = () => {
      D(s), a.notifyEndProc(r);
    };
    s.to({}, i).onComplete(o).start();
    const l = _(t, "canskip", !0);
    return a.beginProc(r, o, !0, l ? o : void 0), !0;
  }
  page(t) {
    if (!("clear" in t || "to" in t || "style" in t)) throw "clear,style,to いずれかは必須です";
    const { key: i, style: s } = t;
    return i && (n.aKeysAtPaging = i.split(",")), s ? (n.styPaging = s, a.val.setVal_Nochk("save", "const.sn.styPaging", s), !1) : (_(t, "clear", !1) && (n.aPage = [], n.lenPage = 0, n.posPage = 0, a.val.setVal_Nochk("sys", "const.sn.aPageLog", "[]"), a.val.setVal_Nochk("save", "const.sn.styPaging", n.INI_STYPAGE)), !1);
  }
  static destroy() {
    this.#t = {}, this.#e = {}, this.aPage = [], this.lenPage = 0, this.posPage = 0;
  }
}
class I extends n {
  constructor() {
    super(), p.debugLog && console.log("📖 => %cReadingState_go", "color:#3B0;"), a.main.resume();
  }
  fire(t, i) {
  }
  // システムボタンなど無効化
}
class $ extends n {
  constructor() {
    super(), p.debugLog && console.log("📖 => %cReadingState_proc", "color:#3B0;");
  }
  fire(t, i) {
  }
  // システムボタンなど無効化
}
class M extends n {
  constructor(t) {
    super(), p.debugLog && console.log("📖 => %cReadingState_wait", "color:#3B0;");
    let i = () => {
    };
    const s = _(t, "global", !0);
    switch (t[":タグ名"]) {
      case "wait":
        return;
      // 予約イベント待ち【しない】
      case "s":
        n.waitRsvEvent(s);
        return;
      case "p":
        i = () => {
          _(t, "er", !1) && a.hTag.er(t), a.sndMng.clearCache(), new I();
        };
        break;
      default:
        i = () => new I();
    }
    n.waitRsvEvent(s, i);
  }
  isWait = !0;
  page(t) {
    const i = super.page(t), { to: s } = t;
    if (!s) return i;
    if (n.lenPage < 2) return !1;
    switch (s) {
      case "oldest":
        t.to = "prev", n.posPage = 1;
        break;
      case "newest":
      case "prev":
        t.to = "prev", n.posPage = n.lenPage - 1;
        break;
      // case 'next':		// スルー
      default:
        return !1;
    }
    return O.go(t);
  }
}
class O extends n {
  constructor() {
    super(), p.debugLog && console.log("📖 => %cReadingState_page", "color:#3B0;"), a.val.setVal_Nochk("tmp", "const.sn.isPaging", !0);
  }
  static go(t) {
    return new O().page(t);
  }
  #i = !0;
  get isSkipping() {
    return this.#i;
  }
  isWait = !1;
  beginProc() {
    a.main.stop();
  }
  endProc() {
    a.main.resume();
  }
  // タグ処理
  l(t) {
    return this.#i ? n.posPage === n.lenPage - 1 ? (this.#t(), new I().l(t)) : (_(t, "visible", !0) && a.layMng.breakLine(t), a.layMng.setAllStyle2TxtLay(n.styPaging), a.goTxt(), n.aPage[n.posPage]?.week ? (n.waitRsvEvent4Paging(), !0) : !1) : super.l(t);
  }
  p(t) {
    return this.#i ? n.posPage === n.lenPage - 1 ? (this.#t(), new I().p(t)) : (_(t, "visible", !0) && a.layMng.breakPage(t), a.layMng.setAllStyle2TxtLay(n.styPaging), a.goTxt(), n.waitRsvEvent4Paging(), !0) : super.p(t);
  }
  s(t) {
    return new M(t), !0;
  }
  wait() {
    return !1;
  }
  page(t) {
    const { to: i, style: s, clear: r } = t;
    if (s || r) return !1;
    switch (p.debugLog && console.log(`📜 %cpage() pos:${n.posPage}%c len:${n.lenPage} to:${i}`, "color:#3B0;", ""), i) {
      case "oldest":
        if (n.posPage === 0) return !1;
        n.posPage = 0;
        break;
      case "prev":
        if (n.posPage === 0) return !1;
        --n.posPage;
        break;
      case "next":
        if (n.posPage === n.lenPage - 1) return !1;
        ++n.posPage;
        break;
      case "newest":
        if (n.posPage === n.lenPage - 1) return !1;
        n.posPage = n.lenPage - 1;
        break;
      case "exit":
        n.posPage = n.lenPage - 1;
        break;
      case "load":
        n.lenPage = n.posPage + 1, n.aPage = n.aPage.slice(0, n.lenPage), this.#t();
        break;
      default:
        throw `属性to「${i}」は異常です`;
    }
    n.posPage === n.lenPage - 1 && this.#t();
    const o = n.aPage[n.posPage];
    if (!o) throw `posPage異常:${n.posPage}`;
    const { fn: l, index: c, mark: f } = o;
    if (p.debugLog) {
      const g = a.scrItr.nowMark(), { week: h } = n.aPage[n.posPage] ?? { week: !1 };
      console.log(`   -- fn:${l} i:${c} pos:${n.posPage} (base=%c${g.hPages.base.fore.sBkFn}%c 0=%c${g.hPages[0].fore.sBkFn}%c mes=%c${g.hPages.mes.fore.txs.cssText.match(/color: \w+;/)}%c) week:${h} A:${n.posPage === n.lenPage - 1}
   styPaging=%c${n.styPaging}%c
   mark:%o`, "background-color:#3B0; color:#000;", "", "background-color:#B4F; color:#000;", "", "color:#B68;", "", n.styPaging, "", f);
    }
    return a.scrItr.loadFromMark({ fn: l, index: c }, f);
  }
  #t() {
    a.val.setVal_Nochk("tmp", "const.sn.isPaging", !1), this.#i = !1;
  }
}
class a {
  static beginProc(t, i, s = !0, r) {
    if (p.debugLog && console.log(`📖.beginProc id:%c${t}%c onNotify:${!!i} endProc:${s} onClickSkip:${!!r}`, "color:#3B0;", ""), this.#i(), this.#s = t, i) {
      const { promise: o, resolve: l } = Promise.withResolvers();
      o.then((c) => {
        p.debugLog && console.log(`📖.callBack id:%c${c}%c`, "color:#3B0;", ""), i(), s ? this.endProc(c) : this.#i();
      }), this.#e = l;
    }
    if (r) {
      const o = () => {
        this.cancelAutoSkip(), r(), s && this.endProc(t);
      };
      this.#t.add(this.main.cvs, C, (l) => {
        l.stopPropagation(), o();
      }), this.#t.add(document, j, (l) => {
        l.isComposing || (l.stopPropagation(), o());
      }), this.procWheel4wle(this.#t, o);
    }
    n.rs.beginProc();
  }
  static #i() {
    this.#s = "", this.#e = () => {
    }, this.#t.clear();
  }
  static #t = new B();
  static #e = () => {
  };
  static notifyEndProc(t) {
    p.debugLog && console.log(`📖.notifyEndProc id:%c${t}%c=${this.#s === t}`, "color:#3B0;", ""), this.#s === t && this.#e(t);
  }
  static endProc(t) {
    p.debugLog && console.log(`📖.endProc id:%c${t}%c=${this.#s === t}`, "color:#3B0;", ""), this.#s === t && (n.rs.endProc(), this.#i());
  }
  static #s = "";
  static get procID() {
    return `RP_${this.scrItr.scriptFn}:${this.scrItr.idxToken}_`;
  }
  static fire(t, i, s = !1) {
    s && this.cancelAutoSkip(), n.rs.fire(t, i);
  }
  static get isSkipping() {
    return n.rs.isSkipping;
  }
  static get isWait() {
    return n.rs.isWait;
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
  static init(t, i, s, r, o, l, c, f, g) {
    this.cfg = t, this.hTag = i, this.main = s, this.val = r, this.scrItr = o, this.layMng = l, this.goTxt = () => l.goTxt(), this.evtMng = c, this.sndMng = f, this.procWheel4wle = g, r.defTmp("sn.tagL.enabled", () => this.tagL_enabled), r.defValTrg("tmp:sn.tagL.enabled", (h, u) => this.tagL_enabled = String(u) !== "false"), r.defTmp("sn.skip.all", () => this.skip_all), r.defValTrg("tmp:sn.skip.all", (h, u) => this.skip_all = String(u) !== "false"), r.defTmp("sn.skip.enabled", () => this.skip_enabled), r.defValTrg("tmp:sn.skip.enabled", (h, u) => this.skip_enabled = String(u) !== "false"), r.defTmp("sn.auto.enabled", () => this.auto_enabled), r.defValTrg("tmp:sn.auto.enabled", (h, u) => this.auto_enabled = String(u) !== "false"), i.l = (h) => n.rs.l(h), i.p = (h) => n.rs.p(h), i.s = (h) => n.rs.s(h), i.wait = (h) => n.rs.wait(h), i.waitclick = (h) => n.rs.s(h), i.page = (h) => n.rs.page(h), new $(), i.jump({ fn: "main" });
  }
  static setFcs(t) {
    this.fcs = t;
  }
  static cancelAutoSkip() {
    this.tagL_enabled || (this.tagL_enabled = !0, this.val.setVal_Nochk("tmp", "sn.tagL.enabled", !0)), this.skip_enabled && (this.skip_enabled = !1, this.val.setVal_Nochk("tmp", "sn.skip.enabled", !1)), this.auto_enabled && (this.auto_enabled = !1, this.val.setVal_Nochk("tmp", "sn.auto.enabled", !1));
  }
}
export {
  E,
  n as R,
  m as T,
  a,
  D as b,
  V as r,
  K as u
};
//# sourceMappingURL=Reading.js.map
