import { i as EVNM_KEY, l as argChk_Num, r as EVNM_CLICK, s as argChk_Boolean, t as CmnLib } from "./CmnLib.js";
import { m as Container } from "./pixi.js";
import { t as EventListenerCtn } from "./EventListenerCtn.js";
var Easing = Object.freeze({
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
			return (e *= 2) < 1 ? .5 * e * e : -.5 * (--e * (e - 2) - 1);
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
			return (e *= 2) < 1 ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2);
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
			return (e *= 2) < 1 ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2);
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
			return (e *= 2) < 1 ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2);
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
			return .5 * (1 - Math.sin(Math.PI * (.5 - e)));
		}
	}),
	Exponential: Object.freeze({
		In: function(e) {
			return e === 0 ? 0 : 1024 ** (e - 1);
		},
		Out: function(e) {
			return e === 1 ? 1 : 1 - 2 ** (-10 * e);
		},
		InOut: function(e) {
			return e === 0 ? 0 : e === 1 ? 1 : (e *= 2) < 1 ? .5 * 1024 ** (e - 1) : .5 * (-(2 ** (-10 * (e - 1))) + 2);
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
			return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
		}
	}),
	Elastic: Object.freeze({
		In: function(e) {
			return e === 0 ? 0 : e === 1 ? 1 : -(2 ** (10 * (e - 1))) * Math.sin((e - 1.1) * 5 * Math.PI);
		},
		Out: function(e) {
			return e === 0 ? 0 : e === 1 ? 1 : 2 ** (-10 * e) * Math.sin((e - .1) * 5 * Math.PI) + 1;
		},
		InOut: function(e) {
			return e === 0 ? 0 : e === 1 ? 1 : (e *= 2, e < 1 ? -.5 * 2 ** (10 * (e - 1)) * Math.sin((e - 1.1) * 5 * Math.PI) : .5 * 2 ** (-10 * (e - 1)) * Math.sin((e - 1.1) * 5 * Math.PI) + 1);
		}
	}),
	Back: Object.freeze({
		In: function(e) {
			var s = 1.70158;
			return e === 1 ? 1 : e * e * ((s + 1) * e - s);
		},
		Out: function(e) {
			var s = 1.70158;
			return e === 0 ? 0 : --e * e * ((s + 1) * e + s) + 1;
		},
		InOut: function(e) {
			var s = 1.70158 * 1.525;
			return (e *= 2) < 1 ? .5 * (e * e * ((s + 1) * e - s)) : .5 * ((e -= 2) * e * ((s + 1) * e + s) + 2);
		}
	}),
	Bounce: Object.freeze({
		In: function(e) {
			return 1 - Easing.Bounce.Out(1 - e);
		},
		Out: function(e) {
			return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375;
		},
		InOut: function(e) {
			return e < .5 ? Easing.Bounce.In(e * 2) * .5 : Easing.Bounce.Out(e * 2 - 1) * .5 + .5;
		}
	}),
	generatePow: function(e) {
		return e === void 0 && (e = 4), e = e < 2 ** -52 ? 2 ** -52 : e, e = e > 1e4 ? 1e4 : e, {
			In: function(s) {
				return s ** +e;
			},
			Out: function(s) {
				return 1 - (1 - s) ** e;
			},
			InOut: function(s) {
				return s < .5 ? (s * 2) ** e / 2 : (1 - (2 - s * 2) ** e) / 2 + .5;
			}
		};
	}
}), now = function() {
	return performance.now();
}, Group = function() {
	function e() {
		var e = [...arguments];
		this._tweens = {}, this._tweensAddedDuringUpdate = {}, this.add.apply(this, e);
	}
	return e.prototype.getAll = function() {
		var e = this;
		return Object.keys(this._tweens).map(function(s) {
			return e._tweens[s];
		});
	}, e.prototype.removeAll = function() {
		this._tweens = {};
	}, e.prototype.add = function() {
		for (var e, s = [], c = 0; c < arguments.length; c++) s[c] = arguments[c];
		for (var l = 0, u = s; l < u.length; l++) {
			var d = u[l];
			(e = d._group) == null || e.remove(d), d._group = this, this._tweens[d.getId()] = d, this._tweensAddedDuringUpdate[d.getId()] = d;
		}
	}, e.prototype.remove = function() {
		for (var e = [...arguments], s = 0, c = e; s < c.length; s++) {
			var l = c[s];
			l._group = void 0, delete this._tweens[l.getId()], delete this._tweensAddedDuringUpdate[l.getId()];
		}
	}, e.prototype.allStopped = function() {
		return this.getAll().every(function(e) {
			return !e.isPlaying();
		});
	}, e.prototype.update = function(e, s) {
		e === void 0 && (e = now()), s === void 0 && (s = !0);
		var c = Object.keys(this._tweens);
		if (c.length !== 0) for (; c.length > 0;) {
			this._tweensAddedDuringUpdate = {};
			for (var l = 0; l < c.length; l++) {
				var u = this._tweens[c[l]], d = !s;
				u && u.update(e, d) === !1 && !s && this.remove(u);
			}
			c = Object.keys(this._tweensAddedDuringUpdate);
		}
	}, e;
}(), Interpolation = {
	Linear: function(e, s) {
		var c = e.length - 1, l = c * s, u = Math.floor(l), d = Interpolation.Utils.Linear;
		return s < 0 ? d(e[0], e[1], l) : s > 1 ? d(e[c], e[c - 1], c - l) : d(e[u], e[u + 1 > c ? c : u + 1], l - u);
	},
	Bezier: function(e, s) {
		for (var c = 0, l = e.length - 1, u = Math.pow, d = Interpolation.Utils.Bernstein, f = 0; f <= l; f++) c += u(1 - s, l - f) * u(s, f) * e[f] * d(l, f);
		return c;
	},
	CatmullRom: function(e, s) {
		var c = e.length - 1, l = c * s, u = Math.floor(l), d = Interpolation.Utils.CatmullRom;
		return e[0] === e[c] ? (s < 0 && (u = Math.floor(l = c * (1 + s))), d(e[(u - 1 + c) % c], e[u], e[(u + 1) % c], e[(u + 2) % c], l - u)) : s < 0 ? e[0] - (d(e[0], e[0], e[1], e[1], -l) - e[0]) : s > 1 ? e[c] - (d(e[c], e[c], e[c - 1], e[c - 1], l - c) - e[c]) : d(e[u ? u - 1 : 0], e[u], e[c < u + 1 ? c : u + 1], e[c < u + 2 ? c : u + 2], l - u);
	},
	Utils: {
		Linear: function(e, s, c) {
			return (s - e) * c + e;
		},
		Bernstein: function(e, s) {
			var c = Interpolation.Utils.Factorial;
			return c(e) / c(s) / c(e - s);
		},
		Factorial: (function() {
			var e = [1];
			return function(s) {
				var c = 1;
				if (e[s]) return e[s];
				for (var l = s; l > 1; l--) c *= l;
				return e[s] = c, c;
			};
		})(),
		CatmullRom: function(e, s, c, l, u) {
			var d = (c - e) * .5, f = (l - s) * .5, p = u * u, m = u * p;
			return (2 * s - 2 * c + d + f) * m + (-3 * s + 3 * c - 2 * d - f) * p + d * u + s;
		}
	}
}, Sequence = function() {
	function e() {}
	return e.nextId = function() {
		return e._nextId++;
	}, e._nextId = 0, e;
}(), mainGroup = new Group(), Tween = function() {
	function e(e, s) {
		this._isPaused = !1, this._pauseStart = 0, this._valuesStart = {}, this._valuesEnd = {}, this._valuesStartRepeat = {}, this._duration = 1e3, this._isDynamic = !1, this._initialRepeat = 0, this._repeat = 0, this._yoyo = !1, this._isPlaying = !1, this._reversed = !1, this._delayTime = 0, this._startTime = 0, this._easingFunction = Easing.Linear.None, this._interpolationFunction = Interpolation.Linear, this._chainedTweens = [], this._onStartCallbackFired = !1, this._onEveryStartCallbackFired = !1, this._id = Sequence.nextId(), this._isChainStopped = !1, this._propertiesAreSetUp = !1, this._goToEnd = !1, this._object = e, typeof s == "object" ? (this._group = s, s.add(this)) : s === !0 && (this._group = mainGroup, mainGroup.add(this));
	}
	return e.prototype.getId = function() {
		return this._id;
	}, e.prototype.isPlaying = function() {
		return this._isPlaying;
	}, e.prototype.isPaused = function() {
		return this._isPaused;
	}, e.prototype.getDuration = function() {
		return this._duration;
	}, e.prototype.to = function(e, s) {
		if (s === void 0 && (s = 1e3), this._isPlaying) throw Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");
		return this._valuesEnd = e, this._propertiesAreSetUp = !1, this._duration = s < 0 ? 0 : s, this;
	}, e.prototype.duration = function(e) {
		return e === void 0 && (e = 1e3), this._duration = e < 0 ? 0 : e, this;
	}, e.prototype.dynamic = function(e) {
		return e === void 0 && (e = !1), this._isDynamic = e, this;
	}, e.prototype.start = function(e, s) {
		if (e === void 0 && (e = now()), s === void 0 && (s = !1), this._isPlaying) return this;
		if (this._repeat = this._initialRepeat, this._reversed) for (var c in this._reversed = !1, this._valuesStartRepeat) this._swapEndStartRepeatValues(c), this._valuesStart[c] = this._valuesStartRepeat[c];
		if (this._isPlaying = !0, this._isPaused = !1, this._onStartCallbackFired = !1, this._onEveryStartCallbackFired = !1, this._isChainStopped = !1, this._startTime = e, this._startTime += this._delayTime, !this._propertiesAreSetUp || s) {
			if (this._propertiesAreSetUp = !0, !this._isDynamic) {
				var l = {};
				for (var u in this._valuesEnd) l[u] = this._valuesEnd[u];
				this._valuesEnd = l;
			}
			this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat, s);
		}
		return this;
	}, e.prototype.startFromCurrentValues = function(e) {
		return this.start(e, !0);
	}, e.prototype._setupProperties = function(e, s, c, l, u) {
		for (var d in c) {
			var f = e[d], p = Array.isArray(f), m = p ? "array" : typeof f, h = !p && Array.isArray(c[d]);
			if (!(m === "undefined" || m === "function")) {
				if (h) {
					var g = c[d];
					if (g.length === 0) continue;
					for (var _ = [f], v = 0, y = g.length; v < y; v += 1) {
						var b = this._handleRelativeValue(f, g[v]);
						if (isNaN(b)) {
							h = !1, console.warn("Found invalid interpolation list. Skipping.");
							break;
						}
						_.push(b);
					}
					h && (c[d] = _);
				}
				if ((m === "object" || p) && f && !h) {
					s[d] = p ? [] : {};
					var x = f;
					for (var S in x) s[d][S] = x[S];
					l[d] = p ? [] : {};
					var g = c[d];
					if (!this._isDynamic) {
						var C = {};
						for (var S in g) C[S] = g[S];
						c[d] = g = C;
					}
					this._setupProperties(x, s[d], g, l[d], u);
				} else (s[d] === void 0 || u) && (s[d] = f), p || (s[d] *= 1), h ? l[d] = c[d].slice().reverse() : l[d] = s[d] || 0;
			}
		}
	}, e.prototype.stop = function() {
		return this._isChainStopped || (this._isChainStopped = !0, this.stopChainedTweens()), this._isPlaying ? (this._isPlaying = !1, this._isPaused = !1, this._onStopCallback && this._onStopCallback(this._object), this) : this;
	}, e.prototype.end = function() {
		return this._goToEnd = !0, this.update(this._startTime + this._duration), this;
	}, e.prototype.pause = function(e) {
		return e === void 0 && (e = now()), this._isPaused || !this._isPlaying ? this : (this._isPaused = !0, this._pauseStart = e, this);
	}, e.prototype.resume = function(e) {
		return e === void 0 && (e = now()), !this._isPaused || !this._isPlaying ? this : (this._isPaused = !1, this._startTime += e - this._pauseStart, this._pauseStart = 0, this);
	}, e.prototype.stopChainedTweens = function() {
		for (var e = 0, s = this._chainedTweens.length; e < s; e++) this._chainedTweens[e].stop();
		return this;
	}, e.prototype.group = function(e) {
		return e ? (e.add(this), this) : (console.warn("tween.group() without args has been removed, use group.add(tween) instead."), this);
	}, e.prototype.remove = function() {
		var e;
		return (e = this._group) == null || e.remove(this), this;
	}, e.prototype.delay = function(e) {
		return e === void 0 && (e = 0), this._delayTime = e, this;
	}, e.prototype.repeat = function(e) {
		return e === void 0 && (e = 0), this._initialRepeat = e, this._repeat = e, this;
	}, e.prototype.repeatDelay = function(e) {
		return this._repeatDelayTime = e, this;
	}, e.prototype.yoyo = function(e) {
		return e === void 0 && (e = !1), this._yoyo = e, this;
	}, e.prototype.easing = function(e) {
		return e === void 0 && (e = Easing.Linear.None), this._easingFunction = e, this;
	}, e.prototype.interpolation = function(e) {
		return e === void 0 && (e = Interpolation.Linear), this._interpolationFunction = e, this;
	}, e.prototype.chain = function() {
		return this._chainedTweens = [...arguments], this;
	}, e.prototype.onStart = function(e) {
		return this._onStartCallback = e, this;
	}, e.prototype.onEveryStart = function(e) {
		return this._onEveryStartCallback = e, this;
	}, e.prototype.onUpdate = function(e) {
		return this._onUpdateCallback = e, this;
	}, e.prototype.onRepeat = function(e) {
		return this._onRepeatCallback = e, this;
	}, e.prototype.onComplete = function(e) {
		return this._onCompleteCallback = e, this;
	}, e.prototype.onStop = function(e) {
		return this._onStopCallback = e, this;
	}, e.prototype.update = function(s, c) {
		var l = this;
		if (s === void 0 && (s = now()), c === void 0 && (c = e.autoStartOnUpdate), this._isPaused) return !0;
		var u;
		if (!this._goToEnd && !this._isPlaying) if (c) this.start(s, !0);
		else return !1;
		if (this._goToEnd = !1, s < this._startTime) return !0;
		this._onStartCallbackFired === !1 && (this._onStartCallback && this._onStartCallback(this._object), this._onStartCallbackFired = !0), this._onEveryStartCallbackFired === !1 && (this._onEveryStartCallback && this._onEveryStartCallback(this._object), this._onEveryStartCallbackFired = !0);
		var d = s - this._startTime, f = this._duration + (this._repeatDelayTime ?? this._delayTime), p = this._duration + this._repeat * f, h = function() {
			if (l._duration === 0 || d > p) return 1;
			var e = d - Math.trunc(d / f) * f, s = Math.min(e / l._duration, 1);
			return s === 0 && d === l._duration ? 1 : s;
		}(), g = this._easingFunction(h);
		if (this._updateProperties(this._object, this._valuesStart, this._valuesEnd, g), this._onUpdateCallback && this._onUpdateCallback(this._object, h), this._duration === 0 || d >= this._duration) if (this._repeat > 0) {
			var _ = Math.min(Math.trunc((d - this._duration) / f) + 1, this._repeat);
			for (u in isFinite(this._repeat) && (this._repeat -= _), this._valuesStartRepeat) !this._yoyo && typeof this._valuesEnd[u] == "string" && (this._valuesStartRepeat[u] = this._valuesStartRepeat[u] + parseFloat(this._valuesEnd[u])), this._yoyo && this._swapEndStartRepeatValues(u), this._valuesStart[u] = this._valuesStartRepeat[u];
			return this._yoyo && (this._reversed = !this._reversed), this._startTime += f * _, this._onRepeatCallback && this._onRepeatCallback(this._object), this._onEveryStartCallbackFired = !1, !0;
		} else {
			this._onCompleteCallback && this._onCompleteCallback(this._object);
			for (var v = 0, y = this._chainedTweens.length; v < y; v++) this._chainedTweens[v].start(this._startTime + this._duration, !1);
			return this._isPlaying = !1, !1;
		}
		return !0;
	}, e.prototype._updateProperties = function(e, s, c, l) {
		for (var u in c) if (s[u] !== void 0) {
			var d = s[u] || 0, f = c[u];
			!Array.isArray(e[u]) && Array.isArray(f) ? e[u] = this._interpolationFunction(f, l) : typeof f == "object" && f ? this._updateProperties(e[u], d, f, l) : (f = this._handleRelativeValue(d, f), typeof f == "number" && (e[u] = d + (f - d) * l));
		}
	}, e.prototype._handleRelativeValue = function(e, s) {
		return typeof s == "string" ? s.charAt(0) === "+" || s.charAt(0) === "-" ? e + parseFloat(s) : parseFloat(s) : s;
	}, e.prototype._swapEndStartRepeatValues = function(e) {
		var s = this._valuesStartRepeat[e], c = this._valuesEnd[e];
		typeof c == "string" ? this._valuesStartRepeat[e] = this._valuesStartRepeat[e] + parseFloat(c) : this._valuesStartRepeat[e] = this._valuesEnd[e], this._valuesEnd[e] = s;
	}, e.autoStartOnUpdate = !1, e;
}();
Sequence.nextId;
var TWEEN = mainGroup;
TWEEN.getAll.bind(TWEEN), TWEEN.removeAll.bind(TWEEN), TWEEN.add.bind(TWEEN), TWEEN.remove.bind(TWEEN), TWEEN.update.bind(TWEEN);
const TW_NM_TRANS = "trans\n";
var PID_HD_TW = "tsy nm:", CmnTween = class e {
	static #e = {};
	static #t;
	static init(s) {
		e.#e = {}, e.#t = s, e.addGrp(e.#r);
		function c(s) {
			for (let c of e.#i) c.update(s);
			e.#n(c);
		}
		e.#n = (e) => requestAnimationFrame(e), e.#n(c);
	}
	static #n;
	static #r = new Group();
	static #i = [];
	static addGrp(s) {
		e.#i.push(s);
	}
	static destroy() {
		e.#r.removeAll(), e.#n = () => 0, e.stopAllTw(), e.#i = [];
	}
	static stopAllTw() {
		e.#e = {};
		for (let s of e.#i) s.removeAll();
	}
	static setTwProp(e, c) {
		let u = argChk_Num(c, "repeat", 1);
		return e.delay(argChk_Num(c, "delay", 0)).easing(this.ease(c.ease)).repeat(u > 0 ? u - 1 : Infinity).yoyo(argChk_Boolean(c, "yoyo", !1));
	}
	static #a = {
		"Back.In": (e) => Easing.Back.In(e),
		"Back.InOut": (e) => Easing.Back.InOut(e),
		"Back.Out": (e) => Easing.Back.Out(e),
		"Bounce.In": (e) => Easing.Bounce.In(e),
		"Bounce.InOut": (e) => Easing.Bounce.InOut(e),
		"Bounce.Out": (e) => Easing.Bounce.Out(e),
		"Circular.In": (e) => Easing.Circular.In(e),
		"Circular.InOut": (e) => Easing.Circular.InOut(e),
		"Circular.Out": (e) => Easing.Circular.Out(e),
		"Cubic.In": (e) => Easing.Cubic.In(e),
		"Cubic.InOut": (e) => Easing.Cubic.InOut(e),
		"Cubic.Out": (e) => Easing.Cubic.Out(e),
		"Elastic.In": (e) => Easing.Elastic.In(e),
		"Elastic.InOut": (e) => Easing.Elastic.InOut(e),
		"Elastic.Out": (e) => Easing.Elastic.Out(e),
		"Exponential.In": (e) => Easing.Exponential.In(e),
		"Exponential.InOut": (e) => Easing.Exponential.InOut(e),
		"Exponential.Out": (e) => Easing.Exponential.Out(e),
		"Linear.None": (e) => Easing.Linear.None(e),
		"Quadratic.In": (e) => Easing.Quadratic.In(e),
		"Quadratic.InOut": (e) => Easing.Quadratic.InOut(e),
		"Quadratic.Out": (e) => Easing.Quadratic.Out(e),
		"Quartic.In": (e) => Easing.Quartic.In(e),
		"Quartic.InOut": (e) => Easing.Quartic.InOut(e),
		"Quartic.Out": (e) => Easing.Quartic.Out(e),
		"Quintic.In": (e) => Easing.Quintic.In(e),
		"Quintic.InOut": (e) => Easing.Quintic.InOut(e),
		"Quintic.Out": (e) => Easing.Quintic.Out(e),
		"Sinusoidal.In": (e) => Easing.Sinusoidal.In(e),
		"Sinusoidal.InOut": (e) => Easing.Sinusoidal.InOut(e),
		"Sinusoidal.Out": (e) => Easing.Sinusoidal.Out(e)
	};
	static ease(e) {
		if (!e) return (e) => Easing.Linear.None(e);
		let s = this.#a[e];
		if (!s) throw "異常なease指定です";
		return s;
	}
	static aLayerPrpNm = [
		"alpha",
		"height",
		"rotation",
		"scale_x",
		"scale_y",
		"pivot_x",
		"pivot_y",
		"width",
		"x",
		"y"
	];
	static cnvTweenArg(s, c) {
		let l = {};
		for (let u of e.aLayerPrpNm) {
			let e = s[u];
			if (!e) continue;
			let d = String(e), f = d.startsWith("="), p = f ? d.slice(1) : d;
			if (!p) continue;
			let [m = "0", h] = p.split(","), g = l[u] = parseFloat(m);
			h && (l[u] += Math.round(Math.random() * (parseFloat(h) - g + 1))), f && (l[u] += parseFloat(c[u]));
		}
		return l;
	}
	static tween(c, l, d, f, p, m, h, g = !0) {
		let _ = this.#t.isSkipping ? 0 : argChk_Num(l, "time", NaN), v = new Tween(d).to(f, _).onUpdate((e) => p(e));
		this.setTwProp(v, l), this.#e[c] = {
			tw: v,
			onEnd: h
		}, e.#r.add(v);
		let { path: b } = l, x = v;
		if (b) {
			CmnLib.debugLog && console.group(`🍝 [${l[":タグ名"] ?? ""}] path=${b}= start(${String(d.x)},${String(d.y)},${String(d.alpha)})`);
			for (let { groups: e } of b.matchAll(this.#o)) {
				let { x: s, x2: c, y: f, y2: p, o: m, o2: h, json: g } = e, v = {};
				if (g) try {
					v = JSON.parse(g);
				} catch (e) {
					console.error(`🍝 json=${g} ` + String(e));
					continue;
				}
				else {
					let e = s ?? c;
					e && (v.x = e);
					let l = f ?? p;
					l && (v.y = l);
					let u = m ?? h;
					u && (v.alpha = Number(u));
				}
				let b = this.cnvTweenArg(v, d);
				CmnLib.debugLog && console.info(`🍝 ${g ?? `{x:${String(s)} y:${String(f)} o:${String(m)}}`} => hTo:${JSON.stringify(b)}`);
				let S = new Tween(d).to(b, _);
				this.setTwProp(S, l), x.chain(S), x = S;
			}
			CmnLib.debugLog && console.groupEnd();
		}
		x.onComplete(() => {
			let e = this.#e[c];
			e?.tw && (delete this.#e[c], e.tw = void 0, v.stop(), e.onEnd?.(), m(), Reading.notifyEndProc(PID_HD_TW + c));
		});
		let { chain: C } = l;
		if (C) {
			let e = this.#e[C];
			if (!e?.tw) throw `${C}は存在しない・または終了したトゥイーンです`;
			delete e.onEnd, e.tw.chain(v);
		} else g && v.start();
		return v;
	}
	static #o = /\(\s*(?:(?<x>[-=\d.]+)|(['"])(?<x2>.*?)\2)?(?:\s*,\s*(?:(?<y>[-=\d.]+)|(['"])(?<y2>.*?)\5)?(?:\s*,\s*(?:(?<o>[-=\d.]+)|(['"])(?<o2>.*?)\8))?)?|(?<json>\{[^{}]*})/g;
	static wt(e) {
		if (!this.#e["trans\n"]?.tw) return !1;
		let s = () => this.stopEndTrans();
		return Reading.beginProc(TW_NM_TRANS, s, !0, argChk_Boolean(e, "canskip", !0) ? s : void 0), !0;
	}
	static stopEndTrans() {
		this.#e[TW_NM_TRANS]?.tw?.stop().end();
	}
	static wait_tsy(e) {
		let s = this.#s(e), c = this.#e[s]?.tw;
		if (!c) return !1;
		let u = () => c.end();
		return Reading.beginProc(PID_HD_TW + s, u, !0, argChk_Boolean(e, "canskip", !0) ? u : void 0), new ReadingState_wait4Tag(e), !0;
	}
	static #s(e) {
		let { layer: s = "", id: c, name: l } = e, u = c ? `frm\n${c}` : l ?? s;
		if (!u) throw "トゥイーンが指定されていません";
		return u;
	}
	static stop_tsy(e) {
		let s = this.#s(e);
		return this.#e[s]?.tw?.stop().end(), !1;
	}
	static pause_tsy(e) {
		let s = this.#s(e);
		return this.#e[s]?.tw?.pause(), !1;
	}
	static resume_tsy(e) {
		let s = this.#s(e);
		return this.#e[s]?.tw?.resume(), !1;
	}
}, ReadingState = class e {
	static #e = new Group();
	static init() {
		CmnTween.addGrp(e.#e);
	}
	static #t;
	static get rs() {
		return this.#t;
	}
	constructor() {
		e.#t = this;
	}
	static #n = {};
	static #r = {};
	static setEvt2Fnc(e, s, c) {
		e ? this.#r[s] = c : this.#n[s] = c;
	}
	static getEvt2Fnc = (e) => this.#n[e] ?? this.#r[e];
	static clear_eventer(e, s, c) {
		if (!e.startsWith("dom=")) return;
		let l = s ? this.#r[c] : this.#n[c];
		l && this.getHtmlElmList(e).el.forEach((e) => e.removeEventListener("click", l)), s ? delete this.#r[c] : delete this.#n[c];
	}
	static popLocalEvts() {
		let e = this.#n;
		return this.#n = {}, e;
	}
	static pushLocalEvts(e) {
		this.#n = e;
	}
	static clear_event(e) {
		let s = argChk_Boolean(e, "global", !1), c = s ? this.#r : this.#n;
		for (let [e, s] of Object.entries(c)) e.startsWith("dom=") && this.getHtmlElmList(e).el.forEach((e) => e.removeEventListener("click", s));
		return s ? this.#r = {} : this.#n = {}, !1;
	}
	static getHtmlElmList(e) {
		let s = e.indexOf(":"), c = "";
		if (s >= 0) {
			let l = e.slice(4, s), u = `const.sn.frm.${l}`;
			if (!Reading.val.getVal(`tmp:${u}`, 0)) throw `HTML【${l}】が読み込まれていません`;
			let d = document.getElementById(l);
			if (!d) throw `HTML【${l}】の要素(id=${l})がありません`;
			let f = d.contentWindow;
			return c = e.slice(s + 1), {
				el: f.document.querySelectorAll(c),
				id: l,
				sel: c
			};
		}
		return c = e.slice(4), {
			el: document.querySelectorAll(c),
			id: "",
			sel: c
		};
	}
	static waitRsvEvent(e, s) {
		Reading.val.saveKidoku(), s ? this.#n.click = this.#n.enter = this.#n.arrowdown = this.#n["wheel.y>0"] = () => s() : (delete this.#n.click, delete this.#n.enter, delete this.#n.arrowdown, delete this.#n["wheel.y>0"]), this.getEvt2Fnc = e ? (e) => this.#n[e] ?? this.#r[e] : (e) => this.#n[e], Reading.scrItr.noticeWait(), CmnLib.debugLog && console.log("🎍 wait event... %o", {
			local: Object.keys(this.#n),
			global: Object.keys(this.#r)
		});
	}
	static waitRsvEvent4Paging() {
		if (this.waitRsvEvent(!0), this.aKeysAtPaging.length === 0) {
			this.getEvt2Fnc = (e) => this.#n[e] ?? this.#r[e];
			return;
		}
		let e = {};
		for (let s of this.aKeysAtPaging) {
			let c = this.#r[s];
			c && (e[s] = c);
		}
		this.getEvt2Fnc = (s) => this.#n[s] ?? e[s];
	}
	fire(s, l) {
		let u = e.#i.exec(s)?.[0] ?? "", f = s.toLowerCase();
		switch (u) {
			case "click":
			case "rightclick":
			case "middleclick":
			case "enter":
			case "arrowdown":
			case "btn":
				if (Reading.evtMng.isSkipping) break;
				if (!e.isFirstFire()) return;
				break;
		}
		if (u === "enter") {
			let e = Reading.fcs.getFocus();
			if (e instanceof Container) {
				e.emit(EVNM_CLICK, new PointerEvent(EVNM_CLICK));
				return;
			}
		}
		let p = e.getEvt2Fnc(f);
		p && (l.stopImmediatePropagation?.(), !(!f.startsWith("dom=") && Reading.layMng.clickTxtLay()) && p(l));
	}
	static #i = /btn|\w+$/;
	get skip_enabled() {
		return Reading.skip_enabled;
	}
	isWait = !1;
	static #a = !1;
	static isFirstFire() {
		return e.#a ? !1 : (e.#a = !0, !0);
	}
	static resetFired() {
		e.#a = !1;
	}
	static aPage;
	static lenPage = 0;
	static posPage = 0;
	static styPaging;
	static INI_STYPAGE = "color: yellow; text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;";
	static aKeysAtPaging = [];
	static recodePage(e = !1) {
		if (!Reading.val.getVal("save:sn.doRecLog")) return;
		let { fn: s, idx: c } = Reading.scrItr.nowScrIdx(), l = `${String(c - 1)}:` + s;
		if (this.aPage.findIndex((e) => e.key === l) > -1) return;
		CmnLib.debugLog && console.log(`📜 %crecodePage === week:${String(e)} lenPage:${String(this.lenPage)} len:${String(this.aPage.length)} POP:${String(this.aPage.at(-1)?.week)}`, "color:#3B0;"), this.aPage.at(-1)?.week && this.aPage.pop();
		let { max_len: d } = Reading.cfg.oCfg.log, f = Reading.scrItr.nowMark();
		f.hSave["const.sn.sLog"] = "[]", this.aPage.push({
			key: l,
			week: e,
			fn: Reading.val.getVal("save:const.sn.scriptFn", s),
			index: Reading.val.getVal("save:const.sn.scriptIdx", 0),
			mark: f
		}) > d && (this.aPage = this.aPage.slice(-d)), this.lenPage = this.aPage.length, CmnLib.debugLog && (console.log(`   %clenPage:${String(this.lenPage)} (base=${f.hPages.base.fore.sBkFn} 0=${f.hPages[0].fore.sBkFn} mes=${String(/color: \w+;/.exec((f.hPages.mes?.fore).txs.cssText))})%c mark:%o`, "color:#3B0;", "", f), console.table(this.aPage)), Reading.val.setVal_Nochk("sys", "const.sn.aPageLog", JSON.stringify(this.aPage));
	}
	static playbackPage(e, s) {
		this.aPage = JSON.parse(e), this.lenPage = this.aPage.length, this.posPage >= this.lenPage && (this.posPage = this.lenPage - 1), this.styPaging = s;
	}
	beginProc() {
		new ReadingState_proc();
	}
	endProc() {
		new ReadingState_go();
	}
	l(s) {
		if (!Reading.tagL_enabled) return !1;
		if (e.recodePage(!0), Reading.auto_enabled) return s.time = Number(Reading.val.getVal(`sys:sn.auto.msecLineWait${Reading.scrItr.isKidoku ? "_Kidoku" : ""}`)), this.wait(s);
		if (Reading.skip_enabled) {
			if (!Reading.skip_all && !Reading.scrItr.isNextKidoku) Reading.cancelAutoSkip();
			else if ("ps".includes(String(Reading.val.getVal("sys:sn.skip.mode")))) return s.time = 50, this.wait(s);
		}
		return argChk_Boolean(s, "visible", !0) && (Reading.layMng.breakLine(s), Reading.goTxt()), new ReadingState_wait4Tag(s), !0;
	}
	p(s) {
		if (e.recodePage(), Reading.auto_enabled) return s.time = Number(Reading.val.getVal(`sys:sn.auto.msecPageWait${Reading.scrItr.isKidoku ? "_Kidoku" : ""}`)), this.wait(s);
		if (Reading.skip_enabled) {
			if (!Reading.skip_all && !Reading.scrItr.isNextKidoku) Reading.cancelAutoSkip();
			else if (String(Reading.val.getVal("sys:sn.skip.mode")) === "s") return s.time = 50, this.wait(s);
		}
		return argChk_Boolean(s, "visible", !0) && (Reading.layMng.breakPage(s), Reading.goTxt()), new ReadingState_wait4Tag(s), !0;
	}
	s(s) {
		return e.recodePage(), Reading.cancelAutoSkip(), new ReadingState_wait4Tag(s), !0;
	}
	wait(c) {
		let u = argChk_Num(c, "time", NaN);
		if (Reading.skip_enabled) return !Reading.skip_all && !Reading.scrItr.isNextKidoku && Reading.cancelAutoSkip(), !1;
		let d = new Tween({}), f = "wait", p = () => {
			e.#e.remove(d), Reading.notifyEndProc(f);
		};
		d.to({}, u).onComplete(p).start(), e.#e.add(d);
		let m = argChk_Boolean(c, "canskip", !0);
		return Reading.beginProc(f, p, !0, m ? p : void 0), !0;
	}
	page(s) {
		if (!("clear" in s || "to" in s || "style" in s)) throw "clear,style,to いずれかは必須です";
		let { key: c, style: u } = s;
		return c && (e.aKeysAtPaging = c.split(",")), u ? (e.styPaging = u, Reading.val.setVal_Nochk("save", "const.sn.styPaging", u), !1) : argChk_Boolean(s, "clear", !1) ? (e.aPage = [], e.lenPage = 0, e.posPage = 0, Reading.val.setVal_Nochk("sys", "const.sn.aPageLog", "[]"), Reading.val.setVal_Nochk("save", "const.sn.styPaging", e.INI_STYPAGE), !1) : !1;
	}
	static destroy() {
		e.#e.removeAll(), this.#n = {}, this.#r = {}, this.aPage = [], this.lenPage = 0, this.posPage = 0;
	}
}, ReadingState_go = class extends ReadingState {
	constructor() {
		super(), CmnLib.debugLog && console.log("📖 => %cReadingState_go", "color:#3B0;"), Reading.main.resume();
	}
	fire(e, s) {}
}, ReadingState_proc = class extends ReadingState {
	constructor() {
		super(), CmnLib.debugLog && console.log("📖 => %cReadingState_proc", "color:#3B0;");
	}
	fire(e, s) {}
}, ReadingState_wait4Tag = class extends ReadingState {
	constructor(e) {
		super(), CmnLib.debugLog && console.log("📖 => %cReadingState_wait", "color:#3B0;");
		let s = () => {}, c = argChk_Boolean(e, "global", !0);
		switch (e[":タグ名"]) {
			case "wait": return;
			case "s":
				ReadingState.waitRsvEvent(c);
				return;
			case "p":
				s = () => {
					argChk_Boolean(e, "er", !1) && Reading.hTag.er(e), new ReadingState_go();
				};
				break;
			default: s = () => new ReadingState_go();
		}
		ReadingState.waitRsvEvent(c, s);
	}
	isWait = !0;
	page(e) {
		let s = super.page(e), { to: c } = e;
		if (!c) return s;
		if (ReadingState.lenPage < 2) return !1;
		switch (c) {
			case "oldest":
				e.to = "prev", ReadingState.posPage = 1;
				break;
			case "newest":
			case "prev":
				e.to = "prev", ReadingState.posPage = ReadingState.lenPage - 1;
				break;
			default: return !1;
		}
		return ReadingState_page.go(e);
	}
}, ReadingState_page = class e extends ReadingState {
	constructor() {
		super(), CmnLib.debugLog && console.log("📖 => %cReadingState_page", "color:#3B0;"), Reading.val.setVal_Nochk("tmp", "const.sn.isPaging", !0);
	}
	static go(s) {
		return new e().page(s);
	}
	#e = !0;
	get skip_enabled() {
		return this.#e;
	}
	isWait = !1;
	beginProc() {
		Reading.main.stop();
	}
	endProc() {
		Reading.main.resume();
	}
	l(e) {
		return this.#e ? ReadingState.posPage === ReadingState.lenPage - 1 ? (this.#t(), new ReadingState_go().l(e)) : (argChk_Boolean(e, "visible", !0) && Reading.layMng.breakLine(e), Reading.layMng.setAllStyle2TxtLay(ReadingState.styPaging), Reading.goTxt(), ReadingState.aPage[ReadingState.posPage]?.week ? (ReadingState.waitRsvEvent4Paging(), !0) : !1) : super.l(e);
	}
	p(e) {
		return this.#e ? ReadingState.posPage === ReadingState.lenPage - 1 ? (this.#t(), new ReadingState_go().p(e)) : (argChk_Boolean(e, "visible", !0) && Reading.layMng.breakPage(e), Reading.layMng.setAllStyle2TxtLay(ReadingState.styPaging), Reading.goTxt(), ReadingState.waitRsvEvent4Paging(), !0) : super.p(e);
	}
	s(e) {
		return new ReadingState_wait4Tag(e), !0;
	}
	wait() {
		return !1;
	}
	page(e) {
		let { to: s, style: c, clear: l } = e;
		if (c || l) return !1;
		switch (CmnLib.debugLog && console.log(`📜 %cpage() pos:${String(ReadingState.posPage)}%c len:${String(ReadingState.lenPage)} to:${String(s)}`, "color:#3B0;", ""), s) {
			case "oldest":
				if (ReadingState.posPage === 0) return !1;
				ReadingState.posPage = 0;
				break;
			case "prev":
				if (ReadingState.posPage === 0) return !1;
				--ReadingState.posPage;
				break;
			case "next":
				if (ReadingState.posPage === ReadingState.lenPage - 1) return !1;
				++ReadingState.posPage;
				break;
			case "newest":
				if (ReadingState.posPage === ReadingState.lenPage - 1) return !1;
				ReadingState.posPage = ReadingState.lenPage - 1;
				break;
			case "exit":
				ReadingState.posPage = ReadingState.lenPage - 1;
				break;
			case "load":
				ReadingState.lenPage = ReadingState.posPage + 1, ReadingState.aPage = ReadingState.aPage.slice(0, ReadingState.lenPage), this.#t();
				break;
			default: throw `属性to「${String(s)}」は異常です`;
		}
		ReadingState.posPage === ReadingState.lenPage - 1 && this.#t();
		let d = ReadingState.aPage[ReadingState.posPage];
		if (!d) throw `posPage異常:${String(ReadingState.posPage)}`;
		let { fn: f, index: p, mark: m } = d;
		if (CmnLib.debugLog) {
			let e = Reading.scrItr.nowMark(), { week: s } = ReadingState.aPage[ReadingState.posPage] ?? { week: !1 };
			console.log(`   -- fn:${f} i:${String(p)} pos:${String(ReadingState.posPage)} (base=%c${(e.hPages.base?.fore).sBkFn}%c 0=%c${(e.hPages[0]?.fore).sBkFn}%c mes=%c${String(/color: \w+;/.exec((e.hPages.mes?.fore).txs.cssText))}%c) week:${String(s)} A:${String(ReadingState.posPage === ReadingState.lenPage - 1)}\n   styPaging=%c${ReadingState.styPaging}%c\n   mark:%o`, "background-color:#3B0; color:#000;", "", "background-color:#B4F; color:#000;", "", "color:#B68;", "", ReadingState.styPaging, "", m);
		}
		return Reading.scrItr.loadFromMark({
			fn: f,
			index: p
		}, m);
	}
	#t() {
		Reading.val.setVal_Nochk("tmp", "const.sn.isPaging", !1), this.#e = !1;
	}
}, Reading = class {
	static beginProc(s, l, d = !0, f) {
		if (CmnLib.debugLog && console.log(`📖.beginProc id:%c${s}%c onNotify:${String(l)} endProc:${String(d)} onClickSkip:${String(f)}`, "color:#3B0;", ""), this.#e(), this.#r = s, l) {
			let { promise: e, resolve: s } = Promise.withResolvers();
			e.then((e) => {
				CmnLib.debugLog && console.log(`📖.callBack id:%c${e}%c`, "color:#3B0;", ""), l(), d ? this.endProc(e) : this.#e();
			}), this.#n = s;
		}
		if (f) {
			let l = () => {
				this.cancelAutoSkip(), f(), d && this.endProc(s);
			};
			this.#t.add(this.main.cvs, EVNM_CLICK, (e) => {
				e.stopPropagation(), l();
			}), this.#t.add(document, EVNM_KEY, (e) => {
				e.isComposing || (e.stopPropagation(), l());
			}), this.procWheel4wle(this.#t, l);
		}
		ReadingState.rs.beginProc();
	}
	static #e() {
		this.#r = "", this.#n = () => {}, this.#t.clear();
	}
	static #t = new EventListenerCtn();
	static #n = () => {};
	static notifyEndProc(e) {
		CmnLib.debugLog && console.log(`📖.notifyEndProc id:%c${e}%c=${String(this.#r === e)}`, "color:#3B0;", ""), this.#r === e && this.#n(e);
	}
	static endProc(e) {
		CmnLib.debugLog && console.log(`📖.endProc id:%c${e}%c=${String(this.#r === e)}`, "color:#3B0;", ""), this.#r === e && (ReadingState.rs.endProc(), this.#e());
	}
	static #r = "";
	static get procID() {
		return `RP_${this.scrItr.scriptFn}:${String(this.scrItr.idxToken)}_`;
	}
	static fire(e, s, c = !1) {
		c && this.cancelAutoSkip(), ReadingState.rs.fire(e, s);
	}
	static get isSkipping() {
		return ReadingState.rs.skip_enabled;
	}
	static get isWait() {
		return ReadingState.rs.isWait;
	}
	static tagL_enabled = !0;
	static skip_all = !1;
	static skip_enabled = !1;
	static auto_enabled = !1;
	static cfg;
	static hTag;
	static main;
	static val;
	static scrItr;
	static layMng;
	static goTxt = () => {};
	static get needGoTxt() {
		return this.layMng.needGoTxt;
	}
	static evtMng;
	static sndMng;
	static procWheel4wle;
	static fcs;
	static init(e, s, c, l, u, d, f, p, m) {
		this.cfg = e, this.hTag = s, this.main = c, this.val = l, this.scrItr = u, this.layMng = d, this.goTxt = () => d.goTxt(), this.evtMng = f, this.sndMng = p, this.procWheel4wle = m, l.defTmp("sn.tagL.enabled", () => this.tagL_enabled), l.defValTrg("tmp:sn.tagL.enabled", (e, s) => {
			this.tagL_enabled = String(s) !== "false";
		}), l.defTmp("sn.skip.all", () => this.skip_all), l.defValTrg("tmp:sn.skip.all", (e, s) => {
			this.skip_all = String(s) !== "false";
		}), l.defTmp("sn.skip.enabled", () => this.skip_enabled), l.defValTrg("tmp:sn.skip.enabled", (e, s) => {
			this.skip_enabled = String(s) !== "false";
		}), l.defTmp("sn.auto.enabled", () => this.auto_enabled), l.defValTrg("tmp:sn.auto.enabled", (e, s) => {
			this.auto_enabled = String(s) !== "false";
		}), s.l = (e) => ReadingState.rs.l(e), s.p = (e) => ReadingState.rs.p(e), s.s = (e) => ReadingState.rs.s(e), s.wait = (e) => ReadingState.rs.wait(e), s.waitclick = (e) => ReadingState.rs.s(e), s.page = (e) => ReadingState.rs.page(e), ReadingState.init(), new ReadingState_proc(), s.jump({ fn: "main" });
	}
	static setFcs(e) {
		this.fcs = e;
	}
	static destroy() {
		ReadingState.destroy();
	}
	static cancelAutoSkip() {
		this.tagL_enabled || (this.tagL_enabled = !0, this.val.setVal_Nochk("tmp", "sn.tagL.enabled", !0)), this.skip_enabled && (this.skip_enabled = !1, this.val.setVal_Nochk("tmp", "sn.skip.enabled", !1)), this.auto_enabled && (this.auto_enabled = !1, this.val.setVal_Nochk("tmp", "sn.auto.enabled", !1));
	}
};
export { Group as a, TW_NM_TRANS as i, ReadingState as n, Tween as o, CmnTween as r, Reading as t };

//# sourceMappingURL=Reading.js.map