import { a as e, d as t, l as n, s as r, t as i } from "./CmnLib.js";
import { t as a } from "./CmnInterface.js";
import { c as o } from "./pixi.js";
import { n as s } from "./ConfigBase.js";
import { t as c } from "./DebugMng.js";
import { n as l, r as u, t as d } from "./Reading.js";
import { t as f } from "./RubySpliter.js";
import { a as p, i as m, r as h, t as g } from "./Grammar.js";
import { n as _, r as v, t as y } from "./CallStack.js";
import "./SndBuf.js";
//#region src/sn/ScriptIterator.ts
var b = class b {
	cfg;
	hTag;
	main;
	val;
	prpPrs;
	sndMng;
	sys;
	#e = {
		aToken: [""],
		len: 1,
		aLNum: [1]
	};
	#t = "";
	get scriptFn() {
		return this.#t;
	}
	#n = 0;
	get idxToken() {
		return this.#n;
	}
	subIdxToken() {
		--this.#n;
	}
	#r = 0;
	get lineNum() {
		return this.#r;
	}
	addLineNum = (e) => {
		this.#r += e;
	};
	jumpJustBefore() {
		this.#Y(this.#t, "", --this.#n);
	}
	#i = [];
	#a;
	#o = new p();
	constructor(e, t, n, r, a, o, s) {
		this.cfg = e, this.hTag = t, this.main = n, this.val = r, this.prpPrs = a, this.sndMng = o, this.sys = s, t.let_ml = (e) => this.#k(e), t.endlet_ml = () => !1, t.dump_stack = () => this.#A(), t.dump_script = (e) => this.#M(e), t.else = t.elsif = t.endif = () => this.#z(), t.if = (e) => this.#B(e), t.call = (e) => this.#V(e), t.jump = (e) => this.#U(e), t.pop_stack = (e) => this.#W(e), t.return = (e) => this.#G(e), t.bracket2macro = (e) => this.#fe(e), t.char2macro = (e) => this.#pe(e), t.endmacro = (e) => this.#G(e), t.macro = (e) => this.#he(e), t.load = (e) => this.#ve(e), t.reload_script = (e) => this.#ye(e), t.record_place = () => this.#xe(), t.save = (e) => this.#Se(e), e.oCfg.debug.token && (this.#Z = (e) => {
			e.trim() !== "" && console.log(`🌱 トークン ${this.#t}:${String(this.#r)} (i:${String(this.#n)} cs:${String(this.#i.length)}) %c【${e}】`, "background-color:#350;");
		}), e.oCfg.debug.tag && (this.#S = (e) => console.log(`🌲 タグ解析 ${this.#t}:${String(this.#r)} (i:${String(this.#n)} cs:${String(this.#i.length)}) %c[${e} %o]`, "background-color:#30B;", this.#o.hPrm)), r.defTmp("const.sn.aIfStk.length", () => this.#R.length), r.defTmp("const.sn.vctCallStk.length", () => this.#i.length), this.#a = new g(e);
		let c = e.oCfg.init.escape;
		if (this.#a.setEscape(c), f.setEscape(c), i.isDbg) {
			this.#c, s.addHook((e, t) => this.#c[e]?.(t)), this.isBreak = (e) => this.#y(e);
			let e = () => this.analyzeInit();
			this.analyzeInit = () => {
				this.analyzeInit = () => {}, this.sys.send2Dbg("hi", {});
			}, this.#c.auth = (t) => {
				let n = t.hBreakpoint.hFn2hLineBP;
				for (let [e, t] of Object.entries(n)) this.#s(e, t);
				b.#_ = {};
				for (let e of t.hBreakpoint.aFunc) b.#_[e.name] = 1;
				if (t.stopOnEntry) {
					let t;
					for (; t = this.nextToken();) {
						let e = t.charCodeAt(0);
						if (e === 91 || e === 38 || e === 42 && t.length === 1) break;
						e === 10 && (this.#r += t.length);
					}
					this.sys.callHook("stopOnEntry", {}), this.analyzeInit = e, this.analyzeInit();
				} else this.noticeWait = () => {
					this.noticeWait = () => {}, this.sys.callHook("stopOnEntry", {});
				}, this.analyzeInit = e, this.analyzeInit();
			};
		} else this.recodeDesign = () => {};
	}
	noticeWait = () => {};
	#s(e, t) {
		b.#g[this.#u(e)] = t;
	}
	destroy() {
		this.isBreak = this.#xe = () => !1;
	}
	#c = {
		auth: () => {},
		disconnect: () => {
			b.#g = {}, b.#_ = {}, this.isBreak = () => !1, this.#c.continue({}), this.#v = 0;
		},
		restart: () => {
			this.isBreak = () => !1;
		},
		add_break: (e) => this.#s(e.fn, e.o),
		data_break: (e) => {
			this.#v === 0 && (this.#v = 1, this.main.setLoop(!1, `変数 ${String(e.dataId)}【${String(e.old_v)}】→【${String(e.new_v)}】データブレーク`), this.sys.callHook("stopOnDataBreakpoint", {}), this.sys.send2Dbg("stopOnDataBreakpoint", {}));
		},
		set_func_break: (e) => {
			b.#_ = {};
			for (let t of e.a) b.#_[t.name] = 1;
			this.sys.send2Dbg(e.ri, {});
		},
		stack: (e) => this.sys.send2Dbg(e.ri, { a: this.#x() }),
		eval: (e) => {
			this.sys.send2Dbg(e.ri, { v: this.prpPrs.parse(e.txt) });
		},
		continue: () => {
			this.#h() || (this.#n -= this.#m, this.#v = 3, this.main.setLoop(!0), this.main.resume());
		},
		stepover: (e) => this.#d(e),
		stepin: () => {
			if (this.#h()) return;
			let e = this.#e.aToken[this.#n - this.#m];
			this.sys.callHook(`stopOnStep${this.#_e.test(e ?? "") ? "In" : ""}`, {}), this.#n -= this.#m, this.#v = this.#v === 1 ? 4 : 5, this.main.setLoop(!0), this.main.resume();
		},
		stepout: (e) => {
			this.#h() || (this.#i.length > 0 ? this.#f(!0) : this.#d(e));
		},
		pause: () => {
			this.#v = 4, this.main.setLoop(!1, "一時停止"), this.sys.send2Dbg("stopOnStep", {});
		},
		stopOnEntry: () => {
			this.#v = 4, this.main.setLoop(!1, "一時停止"), this.sys.send2Dbg("stopOnEntry", {});
		}
	};
	#l = (e) => this.cfg.searchPath(e, s.SCRIPT);
	#u = (e) => this.sys.pathBaseCnvSnPath4Dbg + this.#l(e);
	#d(e) {
		if (this.#h()) return;
		let t = this.#e.aToken[this.#n - this.#m];
		this.#_e.test(t ?? "") ? this.#f(!1) : (this.sys.callHook("stopOnStep", {}), this.#c.stepin(e));
	}
	#f(e) {
		this.sys.callHook(`stopOnStep${e ? "Out" : ""}`, {}), this.#p = this.#i.length - +!!e, this.#n -= this.#m, this.#v = e ? 7 : 6, this.main.setLoop(!0), this.main.resume();
	}
	#p = 0;
	get #m() {
		return +(this.#v === 2 || this.#v === 4);
	}
	#h() {
		return this.#n < this.#e.len ? !1 : (this.sys.callHook("stopOnEntry", {}), this.main.setLoop(!1, "スクリプト終端です isIdxOverLast"), !0);
	}
	static #g = {};
	static #_ = {};
	#v = 0;
	isBreak = (e) => !1;
	#y(e) {
		switch (this.#v) {
			case 6:
				this.#b(), this.#v = 7;
				break;
			case 7:
				if (this.#i.length !== this.#p) break;
				return this.#v = 4, this.main.setLoop(!1, "ステップ実行"), this.sys.send2Dbg("stopOnStep", {}), !0;
			case 5:
				this.#b(), this.#v = 4;
				break;
			case 4: return this.#b(), this.main.setLoop(!1, "ステップ実行"), this.sys.send2Dbg("stopOnStep", {}), !0;
			case 3:
				this.#b(), this.#v = 0;
				break;
			default:
				if (h(e) in b.#_) return this.#v = 2, this.main.setLoop(!1, `関数 ${e} ブレーク`), this.sys.callHook("stopOnBreakpoint", {}), this.sys.send2Dbg("stopOnBreakpoint", {}), !0;
				{
					let e = b.#g[this.#u(this.#t)];
					if (!e) break;
					let t = e[this.#r];
					if (!t) break;
					if (t.condition) {
						if (!this.prpPrs.parse(t.condition)) break;
					} else if ("hitCondition" in t && --t.hitCondition > 0) break;
					let n = this.#v === 0;
					this.#v = 2, this.main.setLoop(!1, n ? (t.condition ? "条件" : "ヒットカウント") + "ブレーク" : "ステップ実行");
					let r = n ? "stopOnBreakpoint" : "stopOnStep";
					this.sys.callHook(r, {}), this.sys.send2Dbg(r, {});
				}
				return !0;
		}
		return !1;
	}
	#b() {
		let e = b.#g[t(this.#t)]?.[this.#r];
		e?.hitCondition && --e.hitCondition;
	}
	#x() {
		let e = +(this.#v === 3), t = this.#e.aToken[this.#n - 1 + e], n = this.#u(this.#t), r = h(t), i = r ? `[${r}]` : t, a = String(this.val.getVal("mp:const.sn.macro") ?? "{}");
		if (this.#n === 0) return [{
			fn: n,
			ln: 1,
			col: 1,
			nm: i,
			ma: a
		}];
		let o = this.#j(this.#e, this.#n), s = [{
			fn: n,
			ln: o.ln,
			col: o.col_s + 1,
			nm: i,
			ma: a
		}], c = this.#i.length;
		if (c === 0) return s;
		for (let e = c - 1; e >= 0; --e) {
			let t = this.#i[e], n = this.#re[t.fn];
			if (!n) continue;
			let r = n.aToken[t.idx - 1];
			if (!r) continue;
			let i = this.#j(n, t.idx), a = h(r);
			s.push({
				fn: this.#u(t.fn),
				ln: i.ln,
				col: i.col_s + 1,
				nm: a ? `[${a}]` : r,
				ma: t.csArg[":hMp"]["const.sn.macro"]
			});
		}
		return s;
	}
	#S = (e) => {};
	async タグ解析(t, n) {
		let i = this.hTag[t];
		if (!i) throw `未定義のタグ【${t}】です`;
		this.#o.parse(n), this.#S(t);
		let a = this.#o.hPrm;
		if (a.cond) {
			let e = a.cond.val;
			if (!e || e.startsWith("&")) throw "属性condは「&」が不要です";
			let t = this.prpPrs.parse(e), n = String(t);
			if (n === "null" || n === "undefined" || !t) return !1;
		}
		let o = {}, s = this.#i.at(-1)?.csArg ?? _(), c = this.#i.length;
		if (this.#o.isKomeParam) {
			if (c === 0) throw "属性「*」はマクロのみ有効です";
			o = { ...s };
		}
		o[":タグ名"] = t;
		for (let [e, { val: t, def: n }] of Object.entries(a)) {
			let r = t;
			if (t.startsWith("%")) {
				if (c === 0) throw "属性「%」はマクロ定義内でのみ使用できます（そのマクロの引数を示す簡略文法であるため）";
				let t = s[r.slice(1)];
				if (t) {
					o[e] = t;
					continue;
				}
				if (n === void 0 || n === "null") continue;
				r = n;
			}
			if (r = this.prpPrs.getValAmpersand(r ?? ""), r !== "undefined") {
				o[e] = r;
				continue;
			}
			n !== void 0 && (r = this.prpPrs.getValAmpersand(n), r !== "undefined" && (o[e] = r));
		}
		if (d.needGoTxt && this.#C.has(t)) {
			let { promise: t, resolve: n } = Promise.withResolvers();
			d.beginProc(e, () => n(0), !1, () => n(0)), d.goTxt(), this.val.saveKidoku(), await t;
		}
		this.#w.has(t) && (this.#D.hideHint(), u.stopEndTrans());
		let l = this.#T[t];
		return l && r(o, "canskip", this.#E[t] ?? !0) && this.#D.isSkipping ? l(o) : i(o);
	}
	#C = /* @__PURE__ */ new Set([
		"trans",
		"wt",
		"wait_tsy",
		"wv",
		"l",
		"p",
		"s",
		"wait",
		"waitclick",
		"wb",
		"wf",
		"wl",
		"ws",
		"quake",
		"wq"
	]);
	#w = /* @__PURE__ */ new Set([
		"finish_trans",
		"trans",
		"quake",
		"stop_quake",
		"add_filter"
	]);
	#T = {
		wt: () => (u.stopEndTrans(), !1),
		wait_tsy: (e) => this.hTag.stop_tsy(e),
		wait: () => !1,
		wb: () => this.hTag.stopfadese({ buf: "BGM" }),
		wf: (e) => this.hTag.stopfadese(e),
		wq: () => this.hTag.stop_quake({}),
		quake: () => !1
	};
	#E = {
		wt: !0,
		wait_tsy: !0,
		wv: !0,
		wait: !0,
		playbgm: !1,
		playse: !0,
		wb: !1,
		wf: !1,
		ws: !1,
		wq: !0
	};
	#D;
	#O;
	setOtherObj(e, t) {
		this.#D = e, this.#O = t;
	}
	#k(e) {
		let { name: t } = e;
		if (!t) throw "nameは必須です";
		let n = "", r = this.#e.len;
		for (; this.#n < r && (n = this.#e.aToken[this.#n], n === ""); ++this.#n);
		return e.text = n, e.cast = "str", this.hTag.let(e), this.#n += 2, this.#r += (n.match(/\n/g) ?? []).length, !1;
	}
	#A() {
		if (this.#n === 0) return console.group(`🥟 [dump_stack] スクリプト現在地 fn:${this.#t} line:1 col:0`), console.groupEnd(), !1;
		let e = this.#j(this.#e, this.#n), t = `スクリプト現在地 fn:${this.#t} line:${String(e.ln)} col:${String(e.col_s + 1)}`;
		console.group(`🥟 [dump_stack] ${t}`);
		let n = this.#i.length;
		if (n > 0) {
			console.info(t);
			for (let e = n - 1; e >= 0; --e) {
				let t = this.#i[e], r = t.csArg[":hMp"], i = r ? r[":タグ名"] : void 0, a = t.csArg[":タグ名"] ?? "", o = this.#j(this.#re[t.fn], t.idx);
				console.info(`${String(n - e)}つ前のコール元 fn:${t.fn} line:${String(o.ln)} col:${String(o.col_s + 1)}${i ? "（[" + i + "]マクロ内）" : " "}で [${a} ...]をコール`);
			}
		}
		return console.groupEnd(), !1;
	}
	#j(e, t) {
		let n = {
			ln: 1,
			col_s: 0,
			col_e: 0
		};
		if (!e) return n;
		let r = t - 1, i = n.ln = e.aLNum[r];
		for (; e.aLNum[r] === i;) {
			let t = e.aToken[r];
			if (!t.startsWith("\n")) {
				let e = t.length;
				n.col_e > 0 && (n.col_s += e), n.col_e += e;
			}
			if (--r < 0) break;
		}
		return n;
	}
	#M(e) {
		let { set_fnc: t, break_fnc: n } = e;
		if (!t) throw "set_fncは必須です";
		if (this.#N = globalThis[t], !this.#N) {
			if (r(e, "need_err", !0)) throw `HTML内に関数${t}が見つかりません`;
			return this.#N = () => {}, !1;
		}
		if (this.noticeBreak = (e) => {
			this.#F !== this.#t && (this.#F = this.#t, this.#N(this.#I[this.#t] ??= this.#e.aToken.join(""))), this.#P(this.#r, e);
		}, this.noticeBreak(!0), !n) return !1;
		if (this.#P = globalThis[n], !this.#P) {
			if (r(e, "need_err", !0)) throw `HTML内に関数${n}が見つかりません`;
			this.#P = () => {};
		}
		return !1;
	}
	#N = () => {};
	#P = () => {};
	#F = "";
	#I = {};
	noticeBreak = (e) => {};
	#L = 5;
	dumpErrForeLine() {
		if (this.#n === 0) {
			console.group(`🥟 Error line (from 0 rows before) fn:${this.#t}`), console.groupEnd();
			return;
		}
		let e = "";
		for (let t = this.#n - 1; t >= 0 && (e = String(this.#e.aToken[t]) + e, !((e.match(/\n/g) ?? []).length >= this.#L)); --t);
		let t = e.split("\n").slice(-this.#L), n = t.length;
		console.group(`🥟 Error line (from ${String(n)} rows before) fn:${this.#t}`);
		let r = String(this.#r).length, i = this.#j(this.#e, this.#n);
		for (let e = 0; e < n; ++e) {
			let a = this.#r - n + e + 1, o = `${String(a).padStart(r, " ")}: %c`, s = t[e], c = s.length > 75 ? s.slice(0, 75) + "…" : s;
			e === n - 1 ? console.info(o + c.slice(0, i.col_s) + "%c" + c.slice(i.col_s), "color: black; background-color: skyblue;", "color: black; background-color: pink;") : console.info(o + c, "color: black; background-color: skyblue;");
		}
		console.groupEnd();
	}
	#R = [-1];
	#z() {
		let e = this.#R[0];
		if (!e) throw "this.#aIfStk が異常です";
		if (e === -1) throw "ifブロック内ではありません";
		return this.#n = e, this.#R.shift(), !1;
	}
	#B(e) {
		let { exp: t } = e;
		if (!t) throw "expは必須です";
		if (t.startsWith("&")) throw "属性expは「&」が不要です";
		let n = 0, r = this.prpPrs.parse(t) ? this.#n : -1, i = this.#e.aLNum[this.#n], a = this.#r - ((i ?? 0) || 0), o = this.#e.len;
		for (; this.#n < o; ++this.#n) {
			let e = this.#e.aLNum[this.#n];
			this.#e.aLNum[this.#n] = ((e ?? 0) || 0) + a;
			let t = this.#e.aToken[this.#n];
			if (!t) continue;
			let i = t.charCodeAt(0);
			if (i === 10) {
				this.#r += t.length;
				continue;
			}
			if (i !== 91) continue;
			let [o, s] = m(t);
			if (!(o in this.hTag)) throw `未定義のタグ[${o}]です`;
			switch (this.#o.parse(s), o) {
				case "if":
					++n;
					break;
				case "elsif":
					{
						if (n > 0 || r > -1) break;
						let e = this.#o.hPrm.exp?.val;
						if (!e) throw "expは必須です";
						if (e.startsWith("&")) throw "属性expは「&」が不要です";
						this.prpPrs.parse(e) && (r = this.#n + 1);
					}
					break;
				case "else":
					if (n > 0) break;
					r === -1 && (r = this.#n + 1);
					break;
				case "endif":
					if (n > 0) {
						--n;
						break;
					}
					return r === -1 ? (++this.#n, this.#e.aLNum[this.#n] += a) : (this.#R.unshift(this.#n + 1), this.#n = r, this.#r = this.#e.aLNum[this.#n]), !1;
			}
		}
		throw "[endif]がないままスクリプト終端です";
	}
	#V(e) {
		r(e, "count", !1) || this.#de();
		let { fn: t } = e;
		return t && this.#l(t), this.#H({ ...e }, l.popLocalEvts()), r(e, "clear_local_event", !1) && this.hTag.clear_event({}), this.#Y(t, e.label);
	}
	#H(e, t) {
		let n = {
			...e,
			...t ? { ":hEvt1Time": t } : {},
			":hMp": this.val.cloneMp(),
			":lenIfStk": this.#R.length
		};
		this.#e.aLNum[this.#n] = this.#r, this.#K || (n[":resvToken"] = "", this.#q()), this.#i.push(new y(this.#t, this.#n, n)), this.#R.unshift(-1);
	}
	#U(e) {
		return r(e, "count", !0) || this.#de(), this.#R[0] = -1, this.#Y(e.fn, e.label);
	}
	#W(e) {
		if (r(e, "clear", !1)) this.#i = [];
		else if (!this.#i.pop()) throw "スタックが空です";
		return this.#q(), this.#R = [-1], this.val.setMp(v()), !1;
	}
	#G(e) {
		let t = this.#i.pop();
		if (!t) throw "スタックが空です";
		let n = t.csArg;
		this.#R = this.#R.slice(-n[":lenIfStk"]);
		let r = n[":hMp"];
		r && this.val.setMp(r);
		let i = n[":resvToken"];
		i ? this.nextToken = () => (this.#q(), i) : this.#q(), n[":hEvt1Time"] && l.pushLocalEvts(n[":hEvt1Time"]);
		let { fn: a, label: o } = e;
		return a || o ? this.#Y(a, o) : t.fn in this.#re ? (this.#ae(t), !1) : this.#Y(t.fn, "", t.idx);
	}
	#K = "";
	#q() {
		this.#K = "", this.nextToken = () => this.#X();
	}
	#J = "";
	#Y(e = "", t = "", n = 0) {
		if (i.debugLog && console.log(`📜 %c1:jumpWork%c fn:${e} lbl:${t} idx:${String(n)}`, "color:#3B0;", ""), !e && !t && this.main.errScript("[jump系] fnまたはlabelは必須です"), t ? (t.startsWith("*") || this.main.errScript("[jump系] labelは*で始まります"), this.#J = t, this.#J.startsWith("**") || (this.#n = n)) : (this.#J = "", this.#n = n), !e) return this.analyzeInit(), !1;
		if (e.includes("@")) throw "[jump系] fn には文字「@」は禁止です";
		let r = this.#l(e);
		if (e === this.#t) return this.analyzeInit(), !1;
		this.#t = e;
		let a = this.#re[e];
		if (a) return this.#e = a, this.analyzeInit(), !1;
		let s = `jumpWork fn:${e}`;
		d.beginProc(s);
		let c = "", l = new o();
		try {
			c = this.#l(e + "@"), l.add({
				name: e + ":base",
				url: r
			}), l.add({
				name: e,
				url: c
			});
		} catch {
			l.add({
				name: e,
				url: r
			});
		}
		return l.use((e, t) => {
			this.sys.dec(e.extension, e.data).then((n) => {
				e.data = n, t();
			}).catch((n) => {
				this.main.errScript(`[jump系]snロード失敗です fn:${e.name} ${String(n)}`, !1), t();
			});
		}).load((t, n) => {
			if (d.endProc(s), c) {
				let t = n[e + ":base"].data, r = n[e].data, i = t.split("\n"), a = r.split("\n"), o = i.length, s = a.length;
				for (let e = 0; e < s && e < o; ++e) a[e] ||= i[e] ?? "";
				n[e].data = a.join("\n"), delete n[e + ":base"];
			}
			this.nextToken = this.#X, this.#r = 1, this.#ie(n[e].data), this.hTag.record_place({}), this.analyzeInit();
		}), !0;
	}
	analyzeInit() {
		i.debugLog && console.log(`📜 %c9:analyzeInit%c fn:${this.#t} lbl:${this.#J} idx:${String(this.#n)}`, "color:#3B0;", "");
		let e = this.#ne(this.#e, !!this.val.getVal("mp:const.sn.macro.name"), this.#r, this.#J, this.#n);
		this.#n = e.idx, this.#r = e.ln;
	}
	nextToken = () => "";
	#X() {
		if (this.#Q()) return "";
		this.#le(), this.#e.aLNum[this.#n] ||= this.#r;
		let e = this.#e.aToken[this.#n];
		return this.#Z(e), ++this.#n, e;
	}
	#Z = (e) => {};
	#Q() {
		return this.#n < this.#e.len ? !1 : (this.main.errScript("スクリプト終端です errOverScr"), !0);
	}
	#$ = /(\*{2,})([^|]*)/;
	#ee = /^\[macro\s/;
	#te = /^\[endmacro[\s\]]/;
	#ne(e, t, n, r, i) {
		let a = e.aToken.length, o = n, s = r;
		if (!s) {
			if (this.#Q()) return {
				idx: i,
				ln: o
			};
			if (e.aLNum[i]) o = e.aLNum[i];
			else {
				o = 1;
				for (let t = 0; t < i; ++t) {
					e.aLNum[t] ||= o;
					let n = e.aToken[t];
					n.startsWith("\n") ? o += n.length : o += (n.match(/\n/g) ?? []).length;
				}
				e.aLNum[i] = o;
			}
			return {
				idx: i,
				ln: o
			};
		}
		e.aLNum[0] = 1;
		let l = s.match(this.#$);
		if (l) {
			s = l[1];
			let n = i;
			switch (l[2]) {
				case "before":
					for (; e.aToken[--n] !== s;) n === 0 && c.myTrace(`[jump系 無名ラベルbefore] 
						${String(o)} 行目以前で ${t ? "マクロ内に" : ""} ラベル【 ${s} 】がありません`, "ET"), t && e.aToken[n].search(this.#ee) > -1 && c.myTrace("[jump系 無名ラベルbefore] マクロ内にラベル【" + s + "】がありません", "ET");
					return {
						idx: n + 1,
						ln: e.aLNum[n]
					};
				case "after":
					for (; e.aToken[++n] !== s;) n === a && c.myTrace(`[jump系 無名ラベルafter] ${String(o)} 行目以後でマクロ内にラベル【${s}】がありません`, "ET"), e.aToken[n].search(this.#te) > -1 && c.myTrace(`[jump系 無名ラベルafter] ${String(o)} 行目以後でマクロ内にラベル【 ${s} 】がありません`, "ET");
					return {
						idx: n + 1,
						ln: e.aLNum[n]
					};
				default: c.myTrace("[jump系] 無名ラベル指定【label=" + s + "】が間違っています", "ET");
			}
		}
		o = 1;
		let u = RegExp("^" + s.replaceAll("*", "\\*") + "(?=\\s|;|\\[|\\||$)"), d = !1;
		for (let t = 0; t < a; ++t) {
			e.aLNum[t] ||= o;
			let n = e.aToken[t];
			if (d) {
				this.#a.testTagEndLetml(n) ? d = !1 : o += (n.match(/\n/g) ?? []).length;
				continue;
			}
			let r = n.charCodeAt(0);
			if (r === 10) {
				o += n.length;
				continue;
			}
			if (r === 42) {
				if (n.search(u) > -1) return {
					idx: t + 1,
					ln: o
				};
				continue;
			}
			r === 91 && (o += (n.match(/\n/g) ?? []).length, this.#a.testTagLetml(n) && (d = !0));
		}
		throw d ? "[let_ml]の終端・[endlet_ml]がありません" : (c.myTrace(`[jump系] ラベル【${s}】がありません`, "ET"), "Dummy");
	}
	#re = Object.create(null);
	#ie(e) {
		let t = "";
		try {
			t = "ScriptIterator.resolveScript";
			let n = this.#a.resolveScript(e);
			t = "ScriptIterator.replaceScript_Wildcard", this.#ce(n), this.#re[this.#t] = this.#e = n;
		} catch (e) {
			e instanceof Error ? t += `例外 mes=${e.message}(${e.name})` : t = String(e), this.main.errScript(t, !1);
		}
		this.val.touchAreaKidoku(this.#t);
	}
	#ae(e) {
		this.#t = e.fn, this.#n = e.idx;
		let t = this.#re[this.#t];
		t && (this.#e = t), this.#r = this.#e.aLNum[e.idx];
	}
	#oe = /^\[(call|loadplugin)\s/;
	#se = /\bfn\s*=\s*[^\s\]]+/;
	#ce(e) {
		for (let n = e.len - 1; n >= 0; --n) {
			let r = e.aToken[n];
			if (!this.#oe.test(r)) continue;
			let [i, a] = m(r);
			this.#o.parse(a);
			let o = this.#o.hPrm.fn;
			if (!o) continue;
			let { val: c } = o;
			if (!c.endsWith("*")) continue;
			e.aToken.splice(n, 1, "	", "; " + r), e.aLNum.splice(n, 1, NaN, NaN);
			let l = i === "loadplugin" ? s.CSS : s.SN, u = this.cfg.matchPath("^" + c.slice(0, -1) + ".*", l);
			for (let i of u) {
				let a = r.replace(this.#se, "fn=" + decodeURIComponent(t(i[l])));
				e.aToken.splice(n, 0, a), e.aLNum.splice(n, 0, NaN);
			}
		}
		e.len = e.aToken.length;
	}
	#le() {
		let e = this.val.touchAreaKidoku(this.#t);
		if (this.#i.length > 0) {
			e.record(this.#n);
			return;
		}
		this.#ue = e.search(this.#n), this.val.setVal_Nochk("tmp", "const.sn.isKidoku", this.#ue), !this.#ue && e.record(this.#n);
	}
	#ue = !1;
	get isKidoku() {
		return this.#ue;
	}
	#de() {
		this.val.getAreaKidoku(this.#t)?.erase(this.#n), this.#ue = !1;
	}
	get isNextKidoku() {
		let e = this.#t, t = this.#n, n = this.#e.len;
		if (this.#i.length > 0) {
			let r = this.#i[0];
			e = r.fn, t = r.idx;
			let i = this.#re[e];
			i && (n = i.len);
		}
		return t === n ? !1 : this.val.getAreaKidoku(e)?.search(t) ?? !1;
	}
	get normalWait() {
		return this.#ue ? this.val.tagCh_doWait_Kidoku ? this.val.tagCh_msecWait_Kidoku : 0 : this.val.tagCh_doWait ? this.val.tagCh_msecWait : 0;
	}
	#fe(e) {
		return this.#a.bracket2macro(e, this.hTag, this.#e, this.#n), !1;
	}
	#pe(e) {
		return this.#a.char2macro(e, this.hTag, this.#e, this.#n), !1;
	}
	#me = /["'#;\\]　]+/;
	#he(e) {
		let { name: t } = e;
		if (!t) throw "nameは必須です";
		if (t in this.hTag) throw `[${t}]はタグかすでに定義済みのマクロです`;
		if (this.#me.test(t)) throw `[${t}]はマクロ名として異常です`;
		let n = this.#r, r = new y(this.#t, this.#n);
		for (this.#ge += "|" + t, this.#_e = RegExp(`\\[(${this.#ge})\\b`), this.hTag[t] = (t) => (this.#H(t), this.val.setMp({
			...t,
			"const.sn.macro": JSON.stringify({ name: e.name }),
			"const.sn.me_call_scriptFn": this.#t
		}), this.val.setVal_Nochk("mp", "const.sn.me_call_scriptFn", this.#t), this.#r = n, this.#ae(r), !1); this.#n < this.#e.len; ++this.#n) {
			this.#e.aLNum[this.#n] ||= this.#r;
			let e = this.#e.aToken[this.#n];
			if (e.search(this.#te) > -1) return ++this.#n, !1;
			let t = e.charCodeAt(0);
			t === 10 ? this.#r += e.length : t === 91 && (this.#r += (e.match(/\n/g) ?? []).length);
		}
		throw `マクロ[${t}]定義の終端・[endmacro]がありません`;
	}
	#ge = "call";
	#_e = /\[(call)\b/;
	#ve(e) {
		if ("fn" in e != "label" in e) throw "fnとlabelはセットで指定して下さい";
		let t = n(e, "place", 0), r = this.val.getMark(t);
		if (!r) throw `place=${String(t)} は存在しません`;
		return this.loadFromMark(e, r, 2);
	}
	loadFromMark(e, t, n = 0) {
		this.hTag.clear_event({}), this.val.mark2save(t), this.val.setMp(v()), this.#O.recPagebreak();
		let a = [];
		n !== 1 && (a = this.sndMng.playLoopFromSaveObj(n === 2)), r(e, "do_rec", !0) && (this.#be = {
			hSave: this.val.cloneSave(),
			hPages: { ...t.hPages },
			aIfStk: [...t.aIfStk]
		});
		let o = {
			enabled: !!this.val.getVal("save:const.sn.autowc.enabled"),
			text: String(this.val.getVal("save:const.sn.autowc.text")),
			time: Number(this.val.getVal("save:const.sn.autowc.time"))
		};
		this.hTag.autowc(o), this.#R = [...this.#be.aIfStk], this.#i = [], u.stopAllTw();
		let s = Promise.allSettled([...a, ...this.#O.playback(this.#be.hPages)]).then(() => this.#O.cover(!1)), { index: c, fn: l } = e;
		if (c) return i.debugLog && console.log(`📜 %cloadFromMark index:${String(c)} move!%c fn:${l ?? ""}`, "color:#3B0;", ""), s.then(() => {
			this.#Y(l, "", c) || this.main.resume();
		}).catch((e) => console.error("loadFromMark e:%o", e)), !0;
		this.#O.cover(!0);
		let d = String(this.val.getVal("save:const.sn.scriptFn")), f = Number(this.val.getVal("save:const.sn.scriptIdx"));
		delete this.#re[d];
		let { label: p } = e;
		return s.then(p ? () => {
			this.#t = d, this.#n = f, this.hTag.call({
				...l ? { fn: l } : {},
				label: p
			}) || this.main.resume();
		} : () => {
			this.#Y(d, "", f) || this.main.resume();
		}).catch((e) => console.error("loadFromMark e:%o", e)), !0;
	}
	#ye(e) {
		let n = this.val.getMark(0);
		if (!n) return !1;
		delete this.#re[t(n.hSave["const.sn.scriptFn"])];
		let r = {};
		for (let e in this.#re) try {
			this.#l(e + "@");
		} catch {
			r[e] = this.#re[e];
		}
		return this.#re = r, e.do_rec = !1, this.loadFromMark(e, n, 1);
	}
	#be = {
		hSave: a(),
		hPages: {},
		aIfStk: [-1]
	};
	#xe = () => {
		let { fn: e, idx: t } = this.nowScrIdx();
		return this.val.setVal_Nochk("save", "const.sn.scriptFn", e), this.val.setVal_Nochk("save", "const.sn.scriptIdx", t), this.#be = {
			hSave: this.val.cloneSave(),
			hPages: this.#O.record(),
			aIfStk: this.#R.slice(this.#i.length)
		}, !1;
	};
	nowScrIdx() {
		if (this.#i.length === 0) return {
			fn: this.#t,
			idx: this.#n
		};
		let e = this.#i[0];
		return {
			fn: e.fn,
			idx: e.idx
		};
	}
	nowMark() {
		return { ...this.#be };
	}
	nowScrFnLn() {
		let { fn: e, idx: t } = this.nowScrIdx(), n = this.#re[e];
		return {
			fn: e,
			...this.#j(n, t)
		};
	}
	#Se(e) {
		if (!("place" in e)) throw "placeは必須です";
		let t = e.place;
		delete e[":タグ名"], delete e.place, e.text = e.text ?? "", this.#be.json = e, this.val.setMark(t, this.#be);
		let n = Number(this.val.getVal("sys:const.sn.save.place"));
		return t === n && this.val.setVal_Nochk("sys", "const.sn.save.place", n + 1), !1;
	}
	recodeDesign(e) {
		let t = "", n = 0, r = this.#i.length;
		if (e.design_unit && r > 0) {
			let e = this.#i[0];
			t = e.fn, n = e.idx;
		} else t = this.#t, n = this.#n;
		e[":path"] = this.#u(t);
		let i = this.#re[t], a = this.#j(i, n);
		e[":ln"] = a.ln, e[":col_s"] = a.col_s, e[":col_e"] = a.col_e;
		let o = n - 1;
		e[":idx_tkn"] = o, e[":token"] = i.aToken[o] ?? "", this.sys.send2Dbg("_recodeDesign", e);
	}
	replace(e, t) {
		this.#e.aToken[e] = t;
	}
};
//#endregion
export { b as ScriptIterator };

//# sourceMappingURL=ScriptIterator.js.map