import { i as e, l as t, r as n, s as r, t as i } from "./CmnLib.js";
import { m as a } from "./pixi.js";
import { t as o } from "./EventListenerCtn.js";
//#region node_modules/@tweenjs/tween.js/dist/tween.esm.js
var s = Object.freeze({
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
			var t = 1.70158;
			return e === 1 ? 1 : e * e * ((t + 1) * e - t);
		},
		Out: function(e) {
			var t = 1.70158;
			return e === 0 ? 0 : --e * e * ((t + 1) * e + t) + 1;
		},
		InOut: function(e) {
			var t = 1.70158 * 1.525;
			return (e *= 2) < 1 ? .5 * (e * e * ((t + 1) * e - t)) : .5 * ((e -= 2) * e * ((t + 1) * e + t) + 2);
		}
	}),
	Bounce: Object.freeze({
		In: function(e) {
			return 1 - s.Bounce.Out(1 - e);
		},
		Out: function(e) {
			return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375;
		},
		InOut: function(e) {
			return e < .5 ? s.Bounce.In(e * 2) * .5 : s.Bounce.Out(e * 2 - 1) * .5 + .5;
		}
	}),
	generatePow: function(e) {
		return e === void 0 && (e = 4), e = e < 2 ** -52 ? 2 ** -52 : e, e = e > 1e4 ? 1e4 : e, {
			In: function(t) {
				return t ** +e;
			},
			Out: function(t) {
				return 1 - (1 - t) ** e;
			},
			InOut: function(t) {
				return t < .5 ? (t * 2) ** e / 2 : (1 - (2 - t * 2) ** e) / 2 + .5;
			}
		};
	}
}), c = function() {
	return performance.now();
}, l = function() {
	function e() {
		var e = [...arguments];
		this._tweens = {}, this._tweensAddedDuringUpdate = {}, this.add.apply(this, e);
	}
	return e.prototype.getAll = function() {
		var e = this;
		return Object.keys(this._tweens).map(function(t) {
			return e._tweens[t];
		});
	}, e.prototype.removeAll = function() {
		this._tweens = {};
	}, e.prototype.add = function() {
		for (var e, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
		for (var r = 0, i = t; r < i.length; r++) {
			var a = i[r];
			(e = a._group) == null || e.remove(a), a._group = this, this._tweens[a.getId()] = a, this._tweensAddedDuringUpdate[a.getId()] = a;
		}
	}, e.prototype.remove = function() {
		for (var e = [...arguments], t = 0, n = e; t < n.length; t++) {
			var r = n[t];
			r._group = void 0, delete this._tweens[r.getId()], delete this._tweensAddedDuringUpdate[r.getId()];
		}
	}, e.prototype.allStopped = function() {
		return this.getAll().every(function(e) {
			return !e.isPlaying();
		});
	}, e.prototype.update = function(e, t) {
		e === void 0 && (e = c()), t === void 0 && (t = !0);
		var n = Object.keys(this._tweens);
		if (n.length !== 0) for (; n.length > 0;) {
			this._tweensAddedDuringUpdate = {};
			for (var r = 0; r < n.length; r++) {
				var i = this._tweens[n[r]], a = !t;
				i && i.update(e, a) === !1 && !t && this.remove(i);
			}
			n = Object.keys(this._tweensAddedDuringUpdate);
		}
	}, e;
}(), u = {
	Linear: function(e, t) {
		var n = e.length - 1, r = n * t, i = Math.floor(r), a = u.Utils.Linear;
		return t < 0 ? a(e[0], e[1], r) : t > 1 ? a(e[n], e[n - 1], n - r) : a(e[i], e[i + 1 > n ? n : i + 1], r - i);
	},
	Bezier: function(e, t) {
		for (var n = 0, r = e.length - 1, i = Math.pow, a = u.Utils.Bernstein, o = 0; o <= r; o++) n += i(1 - t, r - o) * i(t, o) * e[o] * a(r, o);
		return n;
	},
	CatmullRom: function(e, t) {
		var n = e.length - 1, r = n * t, i = Math.floor(r), a = u.Utils.CatmullRom;
		return e[0] === e[n] ? (t < 0 && (i = Math.floor(r = n * (1 + t))), a(e[(i - 1 + n) % n], e[i], e[(i + 1) % n], e[(i + 2) % n], r - i)) : t < 0 ? e[0] - (a(e[0], e[0], e[1], e[1], -r) - e[0]) : t > 1 ? e[n] - (a(e[n], e[n], e[n - 1], e[n - 1], r - n) - e[n]) : a(e[i ? i - 1 : 0], e[i], e[n < i + 1 ? n : i + 1], e[n < i + 2 ? n : i + 2], r - i);
	},
	Utils: {
		Linear: function(e, t, n) {
			return (t - e) * n + e;
		},
		Bernstein: function(e, t) {
			var n = u.Utils.Factorial;
			return n(e) / n(t) / n(e - t);
		},
		Factorial: (function() {
			var e = [1];
			return function(t) {
				var n = 1;
				if (e[t]) return e[t];
				for (var r = t; r > 1; r--) n *= r;
				return e[t] = n, n;
			};
		})(),
		CatmullRom: function(e, t, n, r, i) {
			var a = (n - e) * .5, o = (r - t) * .5, s = i * i, c = i * s;
			return (2 * t - 2 * n + a + o) * c + (-3 * t + 3 * n - 2 * a - o) * s + a * i + t;
		}
	}
}, d = function() {
	function e() {}
	return e.nextId = function() {
		return e._nextId++;
	}, e._nextId = 0, e;
}(), f = new l(), p = function() {
	function e(e, t) {
		this._isPaused = !1, this._pauseStart = 0, this._valuesStart = {}, this._valuesEnd = {}, this._valuesStartRepeat = {}, this._duration = 1e3, this._isDynamic = !1, this._initialRepeat = 0, this._repeat = 0, this._yoyo = !1, this._isPlaying = !1, this._reversed = !1, this._delayTime = 0, this._startTime = 0, this._easingFunction = s.Linear.None, this._interpolationFunction = u.Linear, this._chainedTweens = [], this._onStartCallbackFired = !1, this._onEveryStartCallbackFired = !1, this._id = d.nextId(), this._isChainStopped = !1, this._propertiesAreSetUp = !1, this._goToEnd = !1, this._object = e, typeof t == "object" ? (this._group = t, t.add(this)) : t === !0 && (this._group = f, f.add(this));
	}
	return e.prototype.getId = function() {
		return this._id;
	}, e.prototype.isPlaying = function() {
		return this._isPlaying;
	}, e.prototype.isPaused = function() {
		return this._isPaused;
	}, e.prototype.getDuration = function() {
		return this._duration;
	}, e.prototype.to = function(e, t) {
		if (t === void 0 && (t = 1e3), this._isPlaying) throw Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");
		return this._valuesEnd = e, this._propertiesAreSetUp = !1, this._duration = t < 0 ? 0 : t, this;
	}, e.prototype.duration = function(e) {
		return e === void 0 && (e = 1e3), this._duration = e < 0 ? 0 : e, this;
	}, e.prototype.dynamic = function(e) {
		return e === void 0 && (e = !1), this._isDynamic = e, this;
	}, e.prototype.start = function(e, t) {
		if (e === void 0 && (e = c()), t === void 0 && (t = !1), this._isPlaying) return this;
		if (this._repeat = this._initialRepeat, this._reversed) for (var n in this._reversed = !1, this._valuesStartRepeat) this._swapEndStartRepeatValues(n), this._valuesStart[n] = this._valuesStartRepeat[n];
		if (this._isPlaying = !0, this._isPaused = !1, this._onStartCallbackFired = !1, this._onEveryStartCallbackFired = !1, this._isChainStopped = !1, this._startTime = e, this._startTime += this._delayTime, !this._propertiesAreSetUp || t) {
			if (this._propertiesAreSetUp = !0, !this._isDynamic) {
				var r = {};
				for (var i in this._valuesEnd) r[i] = this._valuesEnd[i];
				this._valuesEnd = r;
			}
			this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat, t);
		}
		return this;
	}, e.prototype.startFromCurrentValues = function(e) {
		return this.start(e, !0);
	}, e.prototype._setupProperties = function(e, t, n, r, i) {
		for (var a in n) {
			var o = e[a], s = Array.isArray(o), c = s ? "array" : typeof o, l = !s && Array.isArray(n[a]);
			if (!(c === "undefined" || c === "function")) {
				if (l) {
					var u = n[a];
					if (u.length === 0) continue;
					for (var d = [o], f = 0, p = u.length; f < p; f += 1) {
						var m = this._handleRelativeValue(o, u[f]);
						if (isNaN(m)) {
							l = !1, console.warn("Found invalid interpolation list. Skipping.");
							break;
						}
						d.push(m);
					}
					l && (n[a] = d);
				}
				if ((c === "object" || s) && o && !l) {
					t[a] = s ? [] : {};
					var h = o;
					for (var g in h) t[a][g] = h[g];
					r[a] = s ? [] : {};
					var u = n[a];
					if (!this._isDynamic) {
						var _ = {};
						for (var g in u) _[g] = u[g];
						n[a] = u = _;
					}
					this._setupProperties(h, t[a], u, r[a], i);
				} else (t[a] === void 0 || i) && (t[a] = o), s || (t[a] *= 1), l ? r[a] = n[a].slice().reverse() : r[a] = t[a] || 0;
			}
		}
	}, e.prototype.stop = function() {
		return this._isChainStopped || (this._isChainStopped = !0, this.stopChainedTweens()), this._isPlaying ? (this._isPlaying = !1, this._isPaused = !1, this._onStopCallback && this._onStopCallback(this._object), this) : this;
	}, e.prototype.end = function() {
		return this._goToEnd = !0, this.update(this._startTime + this._duration), this;
	}, e.prototype.pause = function(e) {
		return e === void 0 && (e = c()), this._isPaused || !this._isPlaying ? this : (this._isPaused = !0, this._pauseStart = e, this);
	}, e.prototype.resume = function(e) {
		return e === void 0 && (e = c()), !this._isPaused || !this._isPlaying ? this : (this._isPaused = !1, this._startTime += e - this._pauseStart, this._pauseStart = 0, this);
	}, e.prototype.stopChainedTweens = function() {
		for (var e = 0, t = this._chainedTweens.length; e < t; e++) this._chainedTweens[e].stop();
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
		return e === void 0 && (e = s.Linear.None), this._easingFunction = e, this;
	}, e.prototype.interpolation = function(e) {
		return e === void 0 && (e = u.Linear), this._interpolationFunction = e, this;
	}, e.prototype.chain = function() {
		var e = [...arguments];
		return this._chainedTweens = e, this;
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
	}, e.prototype.update = function(t, n) {
		var r = this;
		if (t === void 0 && (t = c()), n === void 0 && (n = e.autoStartOnUpdate), this._isPaused) return !0;
		var i;
		if (!this._goToEnd && !this._isPlaying) if (n) this.start(t, !0);
		else return !1;
		if (this._goToEnd = !1, t < this._startTime) return !0;
		this._onStartCallbackFired === !1 && (this._onStartCallback && this._onStartCallback(this._object), this._onStartCallbackFired = !0), this._onEveryStartCallbackFired === !1 && (this._onEveryStartCallback && this._onEveryStartCallback(this._object), this._onEveryStartCallbackFired = !0);
		var a = t - this._startTime, o = this._duration + (this._repeatDelayTime ?? this._delayTime), s = this._duration + this._repeat * o, l = function() {
			if (r._duration === 0 || a > s) return 1;
			var e = a - Math.trunc(a / o) * o, t = Math.min(e / r._duration, 1);
			return t === 0 && a === r._duration ? 1 : t;
		}(), u = this._easingFunction(l);
		if (this._updateProperties(this._object, this._valuesStart, this._valuesEnd, u), this._onUpdateCallback && this._onUpdateCallback(this._object, l), this._duration === 0 || a >= this._duration) if (this._repeat > 0) {
			var d = Math.min(Math.trunc((a - this._duration) / o) + 1, this._repeat);
			for (i in isFinite(this._repeat) && (this._repeat -= d), this._valuesStartRepeat) !this._yoyo && typeof this._valuesEnd[i] == "string" && (this._valuesStartRepeat[i] = this._valuesStartRepeat[i] + parseFloat(this._valuesEnd[i])), this._yoyo && this._swapEndStartRepeatValues(i), this._valuesStart[i] = this._valuesStartRepeat[i];
			return this._yoyo && (this._reversed = !this._reversed), this._startTime += o * d, this._onRepeatCallback && this._onRepeatCallback(this._object), this._onEveryStartCallbackFired = !1, !0;
		} else {
			this._onCompleteCallback && this._onCompleteCallback(this._object);
			for (var f = 0, p = this._chainedTweens.length; f < p; f++) this._chainedTweens[f].start(this._startTime + this._duration, !1);
			return this._isPlaying = !1, !1;
		}
		return !0;
	}, e.prototype._updateProperties = function(e, t, n, r) {
		for (var i in n) if (t[i] !== void 0) {
			var a = t[i] || 0, o = n[i];
			!Array.isArray(e[i]) && Array.isArray(o) ? e[i] = this._interpolationFunction(o, r) : typeof o == "object" && o ? this._updateProperties(e[i], a, o, r) : (o = this._handleRelativeValue(a, o), typeof o == "number" && (e[i] = a + (o - a) * r));
		}
	}, e.prototype._handleRelativeValue = function(e, t) {
		return typeof t == "string" ? t.charAt(0) === "+" || t.charAt(0) === "-" ? e + parseFloat(t) : parseFloat(t) : t;
	}, e.prototype._swapEndStartRepeatValues = function(e) {
		var t = this._valuesStartRepeat[e], n = this._valuesEnd[e];
		typeof n == "string" ? this._valuesStartRepeat[e] = this._valuesStartRepeat[e] + parseFloat(n) : this._valuesStartRepeat[e] = this._valuesEnd[e], this._valuesEnd[e] = t;
	}, e.autoStartOnUpdate = !1, e;
}();
d.nextId;
var m = f;
m.getAll.bind(m), m.removeAll.bind(m), m.add.bind(m), m.remove.bind(m), m.update.bind(m);
//#endregion
//#region src/sn/CmnTween.ts
var h = "trans\n", g = "tsy nm:", _ = class e {
	static #e = {};
	static #t;
	static init(t) {
		e.#e = {}, e.#t = t, e.addGrp(e.#r);
		function n(t) {
			for (let n of e.#i) n.update(t);
			e.#n(n);
		}
		e.#n = (e) => requestAnimationFrame(e), e.#n(n);
	}
	static #n;
	static #r = new l();
	static #i = [];
	static addGrp(t) {
		e.#i.push(t);
	}
	static destroy() {
		e.#r.removeAll(), e.#n = () => 0, e.stopAllTw(), e.#i = [];
	}
	static stopAllTw() {
		e.#e = {};
		for (let t of e.#i) t.removeAll();
	}
	static setTwProp(e, n) {
		let i = t(n, "repeat", 1);
		return e.delay(t(n, "delay", 0)).easing(this.ease(n.ease)).repeat(i > 0 ? i - 1 : Infinity).yoyo(r(n, "yoyo", !1));
	}
	static #a = {
		"Back.In": (e) => s.Back.In(e),
		"Back.InOut": (e) => s.Back.InOut(e),
		"Back.Out": (e) => s.Back.Out(e),
		"Bounce.In": (e) => s.Bounce.In(e),
		"Bounce.InOut": (e) => s.Bounce.InOut(e),
		"Bounce.Out": (e) => s.Bounce.Out(e),
		"Circular.In": (e) => s.Circular.In(e),
		"Circular.InOut": (e) => s.Circular.InOut(e),
		"Circular.Out": (e) => s.Circular.Out(e),
		"Cubic.In": (e) => s.Cubic.In(e),
		"Cubic.InOut": (e) => s.Cubic.InOut(e),
		"Cubic.Out": (e) => s.Cubic.Out(e),
		"Elastic.In": (e) => s.Elastic.In(e),
		"Elastic.InOut": (e) => s.Elastic.InOut(e),
		"Elastic.Out": (e) => s.Elastic.Out(e),
		"Exponential.In": (e) => s.Exponential.In(e),
		"Exponential.InOut": (e) => s.Exponential.InOut(e),
		"Exponential.Out": (e) => s.Exponential.Out(e),
		"Linear.None": (e) => s.Linear.None(e),
		"Quadratic.In": (e) => s.Quadratic.In(e),
		"Quadratic.InOut": (e) => s.Quadratic.InOut(e),
		"Quadratic.Out": (e) => s.Quadratic.Out(e),
		"Quartic.In": (e) => s.Quartic.In(e),
		"Quartic.InOut": (e) => s.Quartic.InOut(e),
		"Quartic.Out": (e) => s.Quartic.Out(e),
		"Quintic.In": (e) => s.Quintic.In(e),
		"Quintic.InOut": (e) => s.Quintic.InOut(e),
		"Quintic.Out": (e) => s.Quintic.Out(e),
		"Sinusoidal.In": (e) => s.Sinusoidal.In(e),
		"Sinusoidal.InOut": (e) => s.Sinusoidal.InOut(e),
		"Sinusoidal.Out": (e) => s.Sinusoidal.Out(e)
	};
	static ease(e) {
		if (!e) return (e) => s.Linear.None(e);
		let t = this.#a[e];
		if (!t) throw "異常なease指定です";
		return t;
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
	static cnvTweenArg(t, n) {
		let r = {};
		for (let i of e.aLayerPrpNm) {
			let e = t[i];
			if (!e) continue;
			let a = String(e), o = a.startsWith("="), s = o ? a.slice(1) : a;
			if (!s) continue;
			let [c = "0", l] = s.split(","), u = r[i] = parseFloat(c);
			l && (r[i] += Math.round(Math.random() * (parseFloat(l) - u + 1))), o && (r[i] += parseFloat(n[i]));
		}
		return r;
	}
	static tween(n, r, a, o, s, c, l, u = !0) {
		let d = this.#t.isSkipping ? 0 : t(r, "time", NaN), f = new p(a).to(o, d).onUpdate((e) => s(e));
		this.setTwProp(f, r), this.#e[n] = {
			tw: f,
			onEnd: l
		}, e.#r.add(f);
		let { path: m } = r, h = f;
		if (m) {
			i.debugLog && console.group(`🍝 [${r[":タグ名"] ?? ""}] path=${m}= start(${String(a.x)},${String(a.y)},${String(a.alpha)})`);
			for (let { groups: e } of m.matchAll(this.#o)) {
				let { x: t, x2: n, y: o, y2: s, o: c, o2: l, json: u } = e, f = {};
				if (u) try {
					f = JSON.parse(u);
				} catch (e) {
					console.error(`🍝 json=${u} ` + String(e));
					continue;
				}
				else {
					let e = t ?? n;
					e && (f.x = e);
					let r = o ?? s;
					r && (f.y = r);
					let i = c ?? l;
					i && (f.alpha = Number(i));
				}
				let m = this.cnvTweenArg(f, a);
				i.debugLog && console.info(`🍝 ${u ?? `{x:${String(t)} y:${String(o)} o:${String(c)}}`} => hTo:${JSON.stringify(m)}`);
				let g = new p(a).to(m, d);
				this.setTwProp(g, r), h.chain(g), h = g;
			}
			i.debugLog && console.groupEnd();
		}
		h.onComplete(() => {
			let e = this.#e[n];
			e?.tw && (delete this.#e[n], e.tw = void 0, f.stop(), e.onEnd?.(), c(), C.notifyEndProc(g + n));
		});
		let { chain: _ } = r;
		if (_) {
			let e = this.#e[_];
			if (!e?.tw) throw `${_}は存在しない・または終了したトゥイーンです`;
			delete e.onEnd, e.tw.chain(f);
		} else u && f.start();
		return f;
	}
	static #o = /\(\s*(?:(?<x>[-=\d.]+)|(['"])(?<x2>.*?)\2)?(?:\s*,\s*(?:(?<y>[-=\d.]+)|(['"])(?<y2>.*?)\5)?(?:\s*,\s*(?:(?<o>[-=\d.]+)|(['"])(?<o2>.*?)\8))?)?|(?<json>\{[^{}]*})/g;
	static wt(e) {
		if (!this.#e["trans\n"]?.tw) return !1;
		let t = () => this.stopEndTrans();
		return C.beginProc(h, t, !0, r(e, "canskip", !0) ? t : void 0), !0;
	}
	static stopEndTrans() {
		this.#e[h]?.tw?.stop().end();
	}
	static wait_tsy(e) {
		let t = this.#s(e), n = this.#e[t]?.tw;
		if (!n) return !1;
		let i = () => n.end();
		return C.beginProc(g + t, i, !0, r(e, "canskip", !0) ? i : void 0), new x(e), !0;
	}
	static #s(e) {
		let { layer: t = "", id: n, name: r } = e, i = n ? `frm\n${n}` : r ?? t;
		if (!i) throw "トゥイーンが指定されていません";
		return i;
	}
	static stop_tsy(e) {
		let t = this.#s(e);
		return this.#e[t]?.tw?.stop().end(), !1;
	}
	static pause_tsy(e) {
		let t = this.#s(e);
		return this.#e[t]?.tw?.pause(), !1;
	}
	static resume_tsy(e) {
		let t = this.#s(e);
		return this.#e[t]?.tw?.resume(), !1;
	}
}, v = class e {
	static #e = new l();
	static init() {
		_.addGrp(e.#e);
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
	static setEvt2Fnc(e, t, n) {
		e ? this.#r[t] = n : this.#n[t] = n;
	}
	static getEvt2Fnc = (e) => this.#n[e] ?? this.#r[e];
	static clear_eventer(e, t, n) {
		if (!e.startsWith("dom=")) return;
		let r = t ? this.#r[n] : this.#n[n];
		r && this.getHtmlElmList(e).el.forEach((e) => e.removeEventListener("click", r)), t ? delete this.#r[n] : delete this.#n[n];
	}
	static popLocalEvts() {
		let e = this.#n;
		return this.#n = {}, e;
	}
	static pushLocalEvts(e) {
		this.#n = e;
	}
	static clear_event(e) {
		let t = r(e, "global", !1), n = t ? this.#r : this.#n;
		for (let [e, t] of Object.entries(n)) e.startsWith("dom=") && this.getHtmlElmList(e).el.forEach((e) => e.removeEventListener("click", t));
		return t ? this.#r = {} : this.#n = {}, !1;
	}
	static getHtmlElmList(e) {
		let t = e.indexOf(":"), n = "";
		if (t >= 0) {
			let r = e.slice(4, t), i = `const.sn.frm.${r}`;
			if (!C.val.getVal(`tmp:${i}`, 0)) throw `HTML【${r}】が読み込まれていません`;
			let a = document.getElementById(r);
			if (!a) throw `HTML【${r}】の要素(id=${r})がありません`;
			let o = a.contentWindow;
			return n = e.slice(t + 1), {
				el: o.document.querySelectorAll(n),
				id: r,
				sel: n
			};
		}
		return n = e.slice(4), {
			el: document.querySelectorAll(n),
			id: "",
			sel: n
		};
	}
	static waitRsvEvent(e, t) {
		C.val.saveKidoku(), t ? this.#n.click = this.#n.enter = this.#n.arrowdown = this.#n["wheel.y>0"] = () => t() : (delete this.#n.click, delete this.#n.enter, delete this.#n.arrowdown, delete this.#n["wheel.y>0"]), this.getEvt2Fnc = e ? (e) => this.#n[e] ?? this.#r[e] : (e) => this.#n[e], C.scrItr.noticeWait(), i.debugLog && console.log("🎍 wait event... %o", {
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
		for (let t of this.aKeysAtPaging) {
			let n = this.#r[t];
			n && (e[t] = n);
		}
		this.getEvt2Fnc = (t) => this.#n[t] ?? e[t];
	}
	fire(t, r) {
		let i = e.#i.exec(t)?.[0] ?? "", o = t.toLowerCase();
		switch (i) {
			case "click":
			case "rightclick":
			case "middleclick":
			case "enter":
			case "arrowdown":
			case "btn":
				if (C.evtMng.isSkipping) break;
				if (!e.isFirstFire()) return;
				break;
		}
		if (i === "enter") {
			let e = C.fcs.getFocus();
			if (e instanceof a) {
				e.emit(n, new PointerEvent(n));
				return;
			}
		}
		let s = e.getEvt2Fnc(o);
		s && (r.stopImmediatePropagation?.(), !(!o.startsWith("dom=") && C.layMng.clickTxtLay()) && s(r));
	}
	static #i = /btn|\w+$/;
	get skip_enabled() {
		return C.skip_enabled;
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
		if (!C.val.getVal("save:sn.doRecLog")) return;
		let { fn: t, idx: n } = C.scrItr.nowScrIdx(), r = `${String(n - 1)}:` + t;
		if (this.aPage.findIndex((e) => e.key === r) > -1) return;
		i.debugLog && console.log(`📜 %crecodePage === week:${String(e)} lenPage:${String(this.lenPage)} len:${String(this.aPage.length)} POP:${String(this.aPage.at(-1)?.week)}`, "color:#3B0;"), this.aPage.at(-1)?.week && this.aPage.pop();
		let { max_len: a } = C.cfg.oCfg.log, o = C.scrItr.nowMark();
		o.hSave["const.sn.sLog"] = "[]", this.aPage.push({
			key: r,
			week: e,
			fn: C.val.getVal("save:const.sn.scriptFn", t),
			index: C.val.getVal("save:const.sn.scriptIdx", 0),
			mark: o
		}) > a && (this.aPage = this.aPage.slice(-a)), this.lenPage = this.aPage.length, i.debugLog && (console.log(`   %clenPage:${String(this.lenPage)} (base=${o.hPages.base.fore.sBkFn} 0=${o.hPages[0].fore.sBkFn} mes=${String(/color: \w+;/.exec((o.hPages.mes?.fore).txs.cssText))})%c mark:%o`, "color:#3B0;", "", o), console.table(this.aPage)), C.val.setVal_Nochk("sys", "const.sn.aPageLog", JSON.stringify(this.aPage));
	}
	static playbackPage(e, t) {
		this.aPage = JSON.parse(e), this.lenPage = this.aPage.length, this.posPage >= this.lenPage && (this.posPage = this.lenPage - 1), this.styPaging = t;
	}
	beginProc() {
		new b();
	}
	endProc() {
		new y();
	}
	l(t) {
		if (!C.tagL_enabled) return !1;
		if (e.recodePage(!0), C.auto_enabled) return t.time = Number(C.val.getVal(`sys:sn.auto.msecLineWait${C.scrItr.isKidoku ? "_Kidoku" : ""}`)), this.wait(t);
		if (C.skip_enabled) {
			if (!C.skip_all && !C.scrItr.isNextKidoku) C.cancelAutoSkip();
			else if ("ps".includes(String(C.val.getVal("sys:sn.skip.mode")))) return t.time = 50, this.wait(t);
		}
		return r(t, "visible", !0) && (C.layMng.breakLine(t), C.goTxt()), new x(t), !0;
	}
	p(t) {
		if (e.recodePage(), C.auto_enabled) return t.time = Number(C.val.getVal(`sys:sn.auto.msecPageWait${C.scrItr.isKidoku ? "_Kidoku" : ""}`)), this.wait(t);
		if (C.skip_enabled) {
			if (!C.skip_all && !C.scrItr.isNextKidoku) C.cancelAutoSkip();
			else if (String(C.val.getVal("sys:sn.skip.mode")) === "s") return t.time = 50, this.wait(t);
		}
		return r(t, "visible", !0) && (C.layMng.breakPage(t), C.goTxt()), new x(t), !0;
	}
	s(t) {
		return e.recodePage(), C.cancelAutoSkip(), new x(t), !0;
	}
	wait(n) {
		let i = t(n, "time", NaN);
		if (C.skip_enabled) return !C.skip_all && !C.scrItr.isNextKidoku && C.cancelAutoSkip(), !1;
		let a = new p({}), o = "wait", s = () => {
			e.#e.remove(a), C.notifyEndProc(o);
		};
		a.to({}, i).onComplete(s).start(), e.#e.add(a);
		let c = r(n, "canskip", !0);
		return C.beginProc(o, s, !0, c ? s : void 0), !0;
	}
	page(t) {
		if (!("clear" in t || "to" in t || "style" in t)) throw "clear,style,to いずれかは必須です";
		let { key: n, style: i } = t;
		return n && (e.aKeysAtPaging = n.split(",")), i ? (e.styPaging = i, C.val.setVal_Nochk("save", "const.sn.styPaging", i), !1) : r(t, "clear", !1) ? (e.aPage = [], e.lenPage = 0, e.posPage = 0, C.val.setVal_Nochk("sys", "const.sn.aPageLog", "[]"), C.val.setVal_Nochk("save", "const.sn.styPaging", e.INI_STYPAGE), !1) : !1;
	}
	static destroy() {
		e.#e.removeAll(), this.#n = {}, this.#r = {}, this.aPage = [], this.lenPage = 0, this.posPage = 0;
	}
}, y = class extends v {
	constructor() {
		super(), i.debugLog && console.log("📖 => %cReadingState_go", "color:#3B0;"), C.main.resume();
	}
	fire(e, t) {}
}, b = class extends v {
	constructor() {
		super(), i.debugLog && console.log("📖 => %cReadingState_proc", "color:#3B0;");
	}
	fire(e, t) {}
}, x = class extends v {
	constructor(e) {
		super(), i.debugLog && console.log("📖 => %cReadingState_wait", "color:#3B0;");
		let t = () => {}, n = r(e, "global", !0);
		switch (e[":タグ名"]) {
			case "wait": return;
			case "s":
				v.waitRsvEvent(n);
				return;
			case "p":
				t = () => {
					r(e, "er", !1) && C.hTag.er(e), new y();
				};
				break;
			default: t = () => new y();
		}
		v.waitRsvEvent(n, t);
	}
	isWait = !0;
	page(e) {
		let t = super.page(e), { to: n } = e;
		if (!n) return t;
		if (v.lenPage < 2) return !1;
		switch (n) {
			case "oldest":
				e.to = "prev", v.posPage = 1;
				break;
			case "newest":
			case "prev":
				e.to = "prev", v.posPage = v.lenPage - 1;
				break;
			default: return !1;
		}
		return S.go(e);
	}
}, S = class e extends v {
	constructor() {
		super(), i.debugLog && console.log("📖 => %cReadingState_page", "color:#3B0;"), C.val.setVal_Nochk("tmp", "const.sn.isPaging", !0);
	}
	static go(t) {
		return new e().page(t);
	}
	#e = !0;
	get skip_enabled() {
		return this.#e;
	}
	isWait = !1;
	beginProc() {
		C.main.stop();
	}
	endProc() {
		C.main.resume();
	}
	l(e) {
		return this.#e ? v.posPage === v.lenPage - 1 ? (this.#t(), new y().l(e)) : (r(e, "visible", !0) && C.layMng.breakLine(e), C.layMng.setAllStyle2TxtLay(v.styPaging), C.goTxt(), v.aPage[v.posPage]?.week ? (v.waitRsvEvent4Paging(), !0) : !1) : super.l(e);
	}
	p(e) {
		return this.#e ? v.posPage === v.lenPage - 1 ? (this.#t(), new y().p(e)) : (r(e, "visible", !0) && C.layMng.breakPage(e), C.layMng.setAllStyle2TxtLay(v.styPaging), C.goTxt(), v.waitRsvEvent4Paging(), !0) : super.p(e);
	}
	s(e) {
		return new x(e), !0;
	}
	wait() {
		return !1;
	}
	page(e) {
		let { to: t, style: n, clear: r } = e;
		if (n || r) return !1;
		switch (i.debugLog && console.log(`📜 %cpage() pos:${String(v.posPage)}%c len:${String(v.lenPage)} to:${String(t)}`, "color:#3B0;", ""), t) {
			case "oldest":
				if (v.posPage === 0) return !1;
				v.posPage = 0;
				break;
			case "prev":
				if (v.posPage === 0) return !1;
				--v.posPage;
				break;
			case "next":
				if (v.posPage === v.lenPage - 1) return !1;
				++v.posPage;
				break;
			case "newest":
				if (v.posPage === v.lenPage - 1) return !1;
				v.posPage = v.lenPage - 1;
				break;
			case "exit":
				v.posPage = v.lenPage - 1;
				break;
			case "load":
				v.lenPage = v.posPage + 1, v.aPage = v.aPage.slice(0, v.lenPage), this.#t();
				break;
			default: throw `属性to「${String(t)}」は異常です`;
		}
		v.posPage === v.lenPage - 1 && this.#t();
		let a = v.aPage[v.posPage];
		if (!a) throw `posPage異常:${String(v.posPage)}`;
		let { fn: o, index: s, mark: c } = a;
		if (i.debugLog) {
			let e = C.scrItr.nowMark(), { week: t } = v.aPage[v.posPage] ?? { week: !1 };
			console.log(`   -- fn:${o} i:${String(s)} pos:${String(v.posPage)} (base=%c${(e.hPages.base?.fore).sBkFn}%c 0=%c${(e.hPages[0]?.fore).sBkFn}%c mes=%c${String(/color: \w+;/.exec((e.hPages.mes?.fore).txs.cssText))}%c) week:${String(t)} A:${String(v.posPage === v.lenPage - 1)}\n   styPaging=%c${v.styPaging}%c\n   mark:%o`, "background-color:#3B0; color:#000;", "", "background-color:#B4F; color:#000;", "", "color:#B68;", "", v.styPaging, "", c);
		}
		return C.scrItr.loadFromMark({
			fn: o,
			index: s
		}, c);
	}
	#t() {
		C.val.setVal_Nochk("tmp", "const.sn.isPaging", !1), this.#e = !1;
	}
}, C = class {
	static beginProc(t, r, a = !0, o) {
		if (i.debugLog && console.log(`📖.beginProc id:%c${t}%c onNotify:${String(r)} endProc:${String(a)} onClickSkip:${String(o)}`, "color:#3B0;", ""), this.#e(), this.#r = t, r) {
			let { promise: e, resolve: t } = Promise.withResolvers();
			e.then((e) => {
				i.debugLog && console.log(`📖.callBack id:%c${e}%c`, "color:#3B0;", ""), r(), a ? this.endProc(e) : this.#e();
			}), this.#n = t;
		}
		if (o) {
			let r = () => {
				this.cancelAutoSkip(), o(), a && this.endProc(t);
			};
			this.#t.add(this.main.cvs, n, (e) => {
				e.stopPropagation(), r();
			}), this.#t.add(document, e, (e) => {
				e.isComposing || (e.stopPropagation(), r());
			}), this.procWheel4wle(this.#t, r);
		}
		v.rs.beginProc();
	}
	static #e() {
		this.#r = "", this.#n = () => {}, this.#t.clear();
	}
	static #t = new o();
	static #n = () => {};
	static notifyEndProc(e) {
		i.debugLog && console.log(`📖.notifyEndProc id:%c${e}%c=${String(this.#r === e)}`, "color:#3B0;", ""), this.#r === e && this.#n(e);
	}
	static endProc(e) {
		i.debugLog && console.log(`📖.endProc id:%c${e}%c=${String(this.#r === e)}`, "color:#3B0;", ""), this.#r === e && (v.rs.endProc(), this.#e());
	}
	static #r = "";
	static get procID() {
		return `RP_${this.scrItr.scriptFn}:${String(this.scrItr.idxToken)}_`;
	}
	static fire(e, t, n = !1) {
		n && this.cancelAutoSkip(), v.rs.fire(e, t);
	}
	static get isSkipping() {
		return v.rs.skip_enabled;
	}
	static get isWait() {
		return v.rs.isWait;
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
	static init(e, t, n, r, i, a, o, s, c) {
		this.cfg = e, this.hTag = t, this.main = n, this.val = r, this.scrItr = i, this.layMng = a, this.goTxt = () => a.goTxt(), this.evtMng = o, this.sndMng = s, this.procWheel4wle = c, r.defTmp("sn.tagL.enabled", () => this.tagL_enabled), r.defValTrg("tmp:sn.tagL.enabled", (e, t) => {
			this.tagL_enabled = String(t) !== "false";
		}), r.defTmp("sn.skip.all", () => this.skip_all), r.defValTrg("tmp:sn.skip.all", (e, t) => {
			this.skip_all = String(t) !== "false";
		}), r.defTmp("sn.skip.enabled", () => this.skip_enabled), r.defValTrg("tmp:sn.skip.enabled", (e, t) => {
			this.skip_enabled = String(t) !== "false";
		}), r.defTmp("sn.auto.enabled", () => this.auto_enabled), r.defValTrg("tmp:sn.auto.enabled", (e, t) => {
			this.auto_enabled = String(t) !== "false";
		}), t.l = (e) => v.rs.l(e), t.p = (e) => v.rs.p(e), t.s = (e) => v.rs.s(e), t.wait = (e) => v.rs.wait(e), t.waitclick = (e) => v.rs.s(e), t.page = (e) => v.rs.page(e), v.init(), new b(), t.jump({ fn: "main" });
	}
	static setFcs(e) {
		this.fcs = e;
	}
	static destroy() {
		v.destroy();
	}
	static cancelAutoSkip() {
		this.tagL_enabled || (this.tagL_enabled = !0, this.val.setVal_Nochk("tmp", "sn.tagL.enabled", !0)), this.skip_enabled && (this.skip_enabled = !1, this.val.setVal_Nochk("tmp", "sn.skip.enabled", !1)), this.auto_enabled && (this.auto_enabled = !1, this.val.setVal_Nochk("tmp", "sn.auto.enabled", !1));
	}
};
//#endregion
export { l as a, h as i, v as n, p as o, _ as r, C as t };

//# sourceMappingURL=Reading.js.map