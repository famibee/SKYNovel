import { a as RPN_COMP_CHIN, d as getFn, l as argChk_Num, s as argChk_Boolean, t as CmnLib } from "./CmnLib.js";
import { t as creSAVEDATA } from "./CmnInterface.js";
import { c as Loader } from "./pixi.js";
import "./EventListenerCtn.js";
import { n as SEARCH_PATH_ARG_EXT } from "./ConfigBase.js";
import { t as DebugMng } from "./DebugMng.js";
import { n as ReadingState, r as CmnTween, t as Reading } from "./Reading.js";
import { t as RubySpliter } from "./RubySpliter.js";
import { a as AnalyzeTagArg, i as tagToken2Name_Args, r as tagToken2Name, t as Grammar } from "./Grammar.js";
import { n as creCSArg, r as creMP, t as CallStack } from "./CallStack.js";
import { t as BUF_BGM } from "./SndBuf.js";
var BreakState = /* @__PURE__ */ function(e) {
	return e[e.Running = 0] = "Running", e[e.Wait = 1] = "Wait", e[e.Break = 2] = "Break", e[e.Breaking = 3] = "Breaking", e[e.Step = 4] = "Step", e[e.Stepping = 5] = "Stepping", e[e.StepOuting = 6] = "StepOuting", e[e.StepOut = 7] = "StepOut", e;
}(BreakState || {}), SndProcOnLoad = /* @__PURE__ */ function(e) {
	return e[e.MINIMAL_STOP = 0] = "MINIMAL_STOP", e[e.NO_TOUCH = 1] = "NO_TOUCH", e[e.ALL_STOP_AND_PLAY = 2] = "ALL_STOP_AND_PLAY", e;
}(SndProcOnLoad || {}), ScriptIterator = class C {
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
	#o = new AnalyzeTagArg();
	constructor(e, u, d, f, m, h, g) {
		this.cfg = e, this.hTag = u, this.main = d, this.val = f, this.prpPrs = m, this.sndMng = h, this.sys = g, u.let_ml = (e) => this.#k(e), u.endlet_ml = () => !1, u.dump_stack = () => this.#A(), u.dump_script = (e) => this.#M(e), u.else = u.elsif = u.endif = () => this.#z(), u.if = (e) => this.#B(e), u.call = (e) => this.#V(e), u.jump = (e) => this.#U(e), u.pop_stack = (e) => this.#W(e), u.return = (e) => this.#G(e), u.bracket2macro = (e) => this.#fe(e), u.char2macro = (e) => this.#pe(e), u.endmacro = (e) => this.#G(e), u.macro = (e) => this.#he(e), u.load = (e) => this.#ve(e), u.reload_script = (e) => this.#ye(e), u.record_place = () => this.#xe(), u.save = (e) => this.#Se(e), e.oCfg.debug.token && (this.#Z = (e) => {
			e.trim() !== "" && console.log(`🌱 トークン ${this.#t}:${String(this.#r)} (i:${String(this.#n)} cs:${String(this.#i.length)}) %c【${e}】`, "background-color:#350;");
		}), e.oCfg.debug.tag && (this.#S = (e) => console.log(`🌲 タグ解析 ${this.#t}:${String(this.#r)} (i:${String(this.#n)} cs:${String(this.#i.length)}) %c[${e} %o]`, "background-color:#30B;", this.#o.hPrm)), f.defTmp("const.sn.aIfStk.length", () => this.#R.length), f.defTmp("const.sn.vctCallStk.length", () => this.#i.length), this.#a = new Grammar(e);
		let _ = e.oCfg.init.escape;
		if (this.#a.setEscape(_), RubySpliter.setEscape(_), CmnLib.isDbg) {
			this.#c, g.addHook((e, u) => this.#c[e]?.(u)), this.isBreak = (e) => this.#y(e);
			let e = () => this.analyzeInit();
			this.analyzeInit = () => {
				this.analyzeInit = () => {}, this.sys.send2Dbg("hi", {});
			}, this.#c.auth = (u) => {
				let d = u.hBreakpoint.hFn2hLineBP;
				for (let [e, u] of Object.entries(d)) this.#s(e, u);
				C.#_ = {};
				for (let e of u.hBreakpoint.aFunc) C.#_[e.name] = 1;
				if (u.stopOnEntry) {
					let u;
					for (; u = this.nextToken();) {
						let e = u.charCodeAt(0);
						if (e === 91 || e === 38 || e === 42 && u.length === 1) break;
						e === 10 && (this.#r += u.length);
					}
					this.sys.callHook("stopOnEntry", {}), this.analyzeInit = e, this.analyzeInit();
				} else this.noticeWait = () => {
					this.noticeWait = () => {}, this.sys.callHook("stopOnEntry", {});
				}, this.analyzeInit = e, this.analyzeInit();
			};
		} else this.recodeDesign = () => {};
	}
	noticeWait = () => {};
	#s(e, u) {
		C.#g[this.#u(e)] = u;
	}
	destroy() {
		this.isBreak = this.#xe = () => !1;
	}
	#c = {
		auth: () => {},
		disconnect: () => {
			C.#g = {}, C.#_ = {}, this.isBreak = () => !1, this.#c.continue({}), this.#v = BreakState.Running;
		},
		restart: () => {
			this.isBreak = () => !1;
		},
		add_break: (e) => this.#s(e.fn, e.o),
		data_break: (e) => {
			this.#v === BreakState.Running && (this.#v = BreakState.Wait, this.main.setLoop(!1, `変数 ${String(e.dataId)}【${String(e.old_v)}】→【${String(e.new_v)}】データブレーク`), this.sys.callHook("stopOnDataBreakpoint", {}), this.sys.send2Dbg("stopOnDataBreakpoint", {}));
		},
		set_func_break: (e) => {
			C.#_ = {};
			for (let u of e.a) C.#_[u.name] = 1;
			this.sys.send2Dbg(e.ri, {});
		},
		stack: (e) => this.sys.send2Dbg(e.ri, { a: this.#x() }),
		eval: (e) => {
			this.sys.send2Dbg(e.ri, { v: this.prpPrs.parse(e.txt) });
		},
		continue: () => {
			this.#h() || (this.#n -= this.#m, this.#v = BreakState.Breaking, this.main.setLoop(!0), this.main.resume());
		},
		stepover: (e) => this.#d(e),
		stepin: () => {
			if (this.#h()) return;
			let e = this.#e.aToken[this.#n - this.#m];
			this.sys.callHook(`stopOnStep${this.#_e.test(e ?? "") ? "In" : ""}`, {}), this.#n -= this.#m, this.#v = this.#v === BreakState.Wait ? BreakState.Step : BreakState.Stepping, this.main.setLoop(!0), this.main.resume();
		},
		stepout: (e) => {
			this.#h() || (this.#i.length > 0 ? this.#f(!0) : this.#d(e));
		},
		pause: () => {
			this.#v = BreakState.Step, this.main.setLoop(!1, "一時停止"), this.sys.send2Dbg("stopOnStep", {});
		},
		stopOnEntry: () => {
			this.#v = BreakState.Step, this.main.setLoop(!1, "一時停止"), this.sys.send2Dbg("stopOnEntry", {});
		}
	};
	#l = (e) => this.cfg.searchPath(e, SEARCH_PATH_ARG_EXT.SCRIPT);
	#u = (e) => this.sys.pathBaseCnvSnPath4Dbg + this.#l(e);
	#d(e) {
		if (this.#h()) return;
		let u = this.#e.aToken[this.#n - this.#m];
		this.#_e.test(u ?? "") ? this.#f(!1) : (this.sys.callHook("stopOnStep", {}), this.#c.stepin(e));
	}
	#f(e) {
		this.sys.callHook(`stopOnStep${e ? "Out" : ""}`, {}), this.#p = this.#i.length - (e ? 1 : 0), this.#n -= this.#m, this.#v = e ? BreakState.StepOut : BreakState.StepOuting, this.main.setLoop(!0), this.main.resume();
	}
	#p = 0;
	get #m() {
		return this.#v === BreakState.Break || this.#v === BreakState.Step ? 1 : 0;
	}
	#h() {
		return this.#n < this.#e.len ? !1 : (this.sys.callHook("stopOnEntry", {}), this.main.setLoop(!1, "スクリプト終端です isIdxOverLast"), !0);
	}
	static #g = {};
	static #_ = {};
	#v = BreakState.Running;
	isBreak = (e) => !1;
	#y(e) {
		switch (this.#v) {
			case BreakState.StepOuting:
				this.#b(), this.#v = BreakState.StepOut;
				break;
			case BreakState.StepOut:
				if (this.#i.length !== this.#p) break;
				return this.#v = BreakState.Step, this.main.setLoop(!1, "ステップ実行"), this.sys.send2Dbg("stopOnStep", {}), !0;
			case BreakState.Stepping:
				this.#b(), this.#v = BreakState.Step;
				break;
			case BreakState.Step: return this.#b(), this.main.setLoop(!1, "ステップ実行"), this.sys.send2Dbg("stopOnStep", {}), !0;
			case BreakState.Breaking:
				this.#b(), this.#v = BreakState.Running;
				break;
			default:
				if (tagToken2Name(e) in C.#_) return this.#v = BreakState.Break, this.main.setLoop(!1, `関数 ${e} ブレーク`), this.sys.callHook("stopOnBreakpoint", {}), this.sys.send2Dbg("stopOnBreakpoint", {}), !0;
				{
					let e = C.#g[this.#u(this.#t)];
					if (!e) break;
					let u = e[this.#r];
					if (!u) break;
					if (u.condition) {
						if (!this.prpPrs.parse(u.condition)) break;
					} else if ("hitCondition" in u && --u.hitCondition > 0) break;
					let d = this.#v === BreakState.Running;
					this.#v = BreakState.Break, this.main.setLoop(!1, d ? (u.condition ? "条件" : "ヒットカウント") + "ブレーク" : "ステップ実行");
					let f = d ? "stopOnBreakpoint" : "stopOnStep";
					this.sys.callHook(f, {}), this.sys.send2Dbg(f, {});
				}
				return !0;
		}
		return !1;
	}
	#b() {
		let e = C.#g[getFn(this.#t)]?.[this.#r];
		e?.hitCondition && --e.hitCondition;
	}
	#x() {
		let e = this.#v === BreakState.Breaking ? 1 : 0, u = this.#e.aToken[this.#n - 1 + e], d = this.#u(this.#t), f = tagToken2Name(u), p = f ? `[${f}]` : u, m = String(this.val.getVal("mp:const.sn.macro") ?? "{}");
		if (this.#n === 0) return [{
			fn: d,
			ln: 1,
			col: 1,
			nm: p,
			ma: m
		}];
		let h = this.#j(this.#e, this.#n), g = [{
			fn: d,
			ln: h.ln,
			col: h.col_s + 1,
			nm: p,
			ma: m
		}], _ = this.#i.length;
		if (_ === 0) return g;
		for (let e = _ - 1; e >= 0; --e) {
			let u = this.#i[e], d = this.#re[u.fn];
			if (!d) continue;
			let f = d.aToken[u.idx - 1];
			if (!f) continue;
			let p = this.#j(d, u.idx), m = tagToken2Name(f);
			g.push({
				fn: this.#u(u.fn),
				ln: p.ln,
				col: p.col_s + 1,
				nm: m ? `[${m}]` : f,
				ma: u.csArg[":hMp"]["const.sn.macro"]
			});
		}
		return g;
	}
	#S = (e) => {};
	async タグ解析(u, d) {
		let p = this.hTag[u];
		if (!p) throw `未定義のタグ【${u}】です`;
		this.#o.parse(d), this.#S(u);
		let m = this.#o.hPrm;
		if (m.cond) {
			let e = m.cond.val;
			if (!e || e.startsWith("&")) throw "属性condは「&」が不要です";
			let u = this.prpPrs.parse(e), d = String(u);
			if (d === "null" || d === "undefined" || !u) return !1;
		}
		let h = {}, g = this.#i.at(-1)?.csArg ?? creCSArg(), _ = this.#i.length;
		if (this.#o.isKomeParam) {
			if (_ === 0) throw "属性「*」はマクロのみ有効です";
			h = { ...g };
		}
		h[":タグ名"] = u;
		for (let [e, { val: u, def: d }] of Object.entries(m)) {
			let f = u;
			if (u.startsWith("%")) {
				if (_ === 0) throw "属性「%」はマクロ定義内でのみ使用できます（そのマクロの引数を示す簡略文法であるため）";
				let u = g[f.slice(1)];
				if (u) {
					h[e] = u;
					continue;
				}
				if (d === void 0 || d === "null") continue;
				f = d;
			}
			if (f = this.prpPrs.getValAmpersand(f ?? ""), f !== "undefined") {
				h[e] = f;
				continue;
			}
			d !== void 0 && (f = this.prpPrs.getValAmpersand(d), f !== "undefined" && (h[e] = f));
		}
		if (Reading.needGoTxt && this.#C.has(u)) {
			let { promise: u, resolve: d } = Promise.withResolvers();
			Reading.beginProc(RPN_COMP_CHIN, () => d(0), !1, () => d(0)), Reading.goTxt(), this.val.saveKidoku(), await u;
		}
		this.#w.has(u) && (this.#D.hideHint(), CmnTween.stopEndTrans());
		let v = this.#T[u];
		return v && argChk_Boolean(h, "canskip", this.#E[u] ?? !0) && this.#D.isSkipping ? v(h) : p(h);
	}
	#C = new Set([
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
	#w = new Set([
		"finish_trans",
		"trans",
		"quake",
		"stop_quake",
		"add_filter"
	]);
	#T = {
		wt: () => (CmnTween.stopEndTrans(), !1),
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
	setOtherObj(e, u) {
		this.#D = e, this.#O = u;
	}
	#k(e) {
		let { name: u } = e;
		if (!u) throw "nameは必須です";
		let d = "", f = this.#e.len;
		for (; this.#n < f && (d = this.#e.aToken[this.#n], d === ""); ++this.#n);
		return e.text = d, e.cast = "str", this.hTag.let(e), this.#n += 2, this.#r += (d.match(/\n/g) ?? []).length, !1;
	}
	#A() {
		if (this.#n === 0) return console.group(`🥟 [dump_stack] スクリプト現在地 fn:${this.#t} line:1 col:0`), console.groupEnd(), !1;
		let e = this.#j(this.#e, this.#n), u = `スクリプト現在地 fn:${this.#t} line:${String(e.ln)} col:${String(e.col_s + 1)}`;
		console.group(`🥟 [dump_stack] ${u}`);
		let d = this.#i.length;
		if (d > 0) {
			console.info(u);
			for (let e = d - 1; e >= 0; --e) {
				let u = this.#i[e], f = u.csArg[":hMp"], p = f ? f[":タグ名"] : void 0, m = u.csArg[":タグ名"] ?? "", h = this.#j(this.#re[u.fn], u.idx);
				console.info(`${String(d - e)}つ前のコール元 fn:${u.fn} line:${String(h.ln)} col:${String(h.col_s + 1)}${p ? "（[" + p + "]マクロ内）" : " "}で [${m} ...]をコール`);
			}
		}
		return console.groupEnd(), !1;
	}
	#j(e, u) {
		let d = {
			ln: 1,
			col_s: 0,
			col_e: 0
		};
		if (!e) return d;
		let f = u - 1, p = d.ln = e.aLNum[f];
		for (; e.aLNum[f] === p;) {
			let u = e.aToken[f];
			if (!u.startsWith("\n")) {
				let e = u.length;
				d.col_e > 0 && (d.col_s += e), d.col_e += e;
			}
			if (--f < 0) break;
		}
		return d;
	}
	#M(e) {
		let { set_fnc: u, break_fnc: d } = e;
		if (!u) throw "set_fncは必須です";
		if (this.#N = globalThis[u], !this.#N) {
			if (argChk_Boolean(e, "need_err", !0)) throw `HTML内に関数${u}が見つかりません`;
			return this.#N = () => {}, !1;
		}
		if (this.noticeBreak = (e) => {
			this.#F !== this.#t && (this.#F = this.#t, this.#N(this.#I[this.#t] ??= this.#e.aToken.join(""))), this.#P(this.#r, e);
		}, this.noticeBreak(!0), !d) return !1;
		if (this.#P = globalThis[d], !this.#P) {
			if (argChk_Boolean(e, "need_err", !0)) throw `HTML内に関数${d}が見つかりません`;
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
		for (let u = this.#n - 1; u >= 0 && (e = String(this.#e.aToken[u]) + e, !((e.match(/\n/g) ?? []).length >= this.#L)); --u);
		let u = e.split("\n").slice(-this.#L), d = u.length;
		console.group(`🥟 Error line (from ${String(d)} rows before) fn:${this.#t}`);
		let f = String(this.#r).length, p = this.#j(this.#e, this.#n);
		for (let e = 0; e < d; ++e) {
			let m = this.#r - d + e + 1, h = `${String(m).padStart(f, " ")}: %c`, g = u[e], _ = g.length > 75 ? g.slice(0, 75) + "…" : g;
			e === d - 1 ? console.info(h + _.slice(0, p.col_s) + "%c" + _.slice(p.col_s), "color: black; background-color: skyblue;", "color: black; background-color: pink;") : console.info(h + _, "color: black; background-color: skyblue;");
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
		let { exp: u } = e;
		if (!u) throw "expは必須です";
		if (u.startsWith("&")) throw "属性expは「&」が不要です";
		let d = 0, f = this.prpPrs.parse(u) ? this.#n : -1, p = this.#e.aLNum[this.#n], m = this.#r - ((p ?? 0) || 0), h = this.#e.len;
		for (; this.#n < h; ++this.#n) {
			let e = this.#e.aLNum[this.#n];
			this.#e.aLNum[this.#n] = ((e ?? 0) || 0) + m;
			let u = this.#e.aToken[this.#n];
			if (!u) continue;
			let p = u.charCodeAt(0);
			if (p === 10) {
				this.#r += u.length;
				continue;
			}
			if (p !== 91) continue;
			let [h, g] = tagToken2Name_Args(u);
			if (!(h in this.hTag)) throw `未定義のタグ[${h}]です`;
			switch (this.#o.parse(g), h) {
				case "if":
					++d;
					break;
				case "elsif":
					{
						if (d > 0 || f > -1) break;
						let e = this.#o.hPrm.exp?.val;
						if (!e) throw "expは必須です";
						if (e.startsWith("&")) throw "属性expは「&」が不要です";
						this.prpPrs.parse(e) && (f = this.#n + 1);
					}
					break;
				case "else":
					if (d > 0) break;
					f === -1 && (f = this.#n + 1);
					break;
				case "endif":
					if (d > 0) {
						--d;
						break;
					}
					return f === -1 ? (++this.#n, this.#e.aLNum[this.#n] += m) : (this.#R.unshift(this.#n + 1), this.#n = f, this.#r = this.#e.aLNum[this.#n]), !1;
			}
		}
		throw "[endif]がないままスクリプト終端です";
	}
	#V(e) {
		argChk_Boolean(e, "count", !1) || this.#de();
		let { fn: u } = e;
		return u && this.#l(u), this.#H({ ...e }, ReadingState.popLocalEvts()), argChk_Boolean(e, "clear_local_event", !1) && this.hTag.clear_event({}), this.#Y(u, e.label);
	}
	#H(e, u) {
		let d = {
			...e,
			...u ? { ":hEvt1Time": u } : {},
			":hMp": this.val.cloneMp(),
			":lenIfStk": this.#R.length
		};
		this.#e.aLNum[this.#n] = this.#r, this.#K || (d[":resvToken"] = "", this.#q()), this.#i.push(new CallStack(this.#t, this.#n, d)), this.#R.unshift(-1);
	}
	#U(e) {
		return argChk_Boolean(e, "count", !0) || this.#de(), this.#R[0] = -1, this.#Y(e.fn, e.label);
	}
	#W(e) {
		if (argChk_Boolean(e, "clear", !1)) this.#i = [];
		else if (!this.#i.pop()) throw "スタックが空です";
		return this.#q(), this.#R = [-1], this.val.setMp(creMP()), !1;
	}
	#G(e) {
		let u = this.#i.pop();
		if (!u) throw "スタックが空です";
		let d = u.csArg;
		this.#R = this.#R.slice(-d[":lenIfStk"]);
		let f = d[":hMp"];
		f && this.val.setMp(f);
		let p = d[":resvToken"];
		p ? this.nextToken = () => (this.#q(), p) : this.#q(), d[":hEvt1Time"] && ReadingState.pushLocalEvts(d[":hEvt1Time"]);
		let { fn: m, label: h } = e;
		return m || h ? this.#Y(m, h) : u.fn in this.#re ? (this.#ae(u), !1) : this.#Y(u.fn, "", u.idx);
	}
	#K = "";
	#q() {
		this.#K = "", this.nextToken = () => this.#X();
	}
	#J = "";
	#Y(e = "", u = "", d = 0) {
		if (CmnLib.debugLog && console.log(`📜 %c1:jumpWork%c fn:${e} lbl:${u} idx:${String(d)}`, "color:#3B0;", ""), !e && !u && this.main.errScript("[jump系] fnまたはlabelは必須です"), u ? (u.startsWith("*") || this.main.errScript("[jump系] labelは*で始まります"), this.#J = u, this.#J.startsWith("**") || (this.#n = d)) : (this.#J = "", this.#n = d), !e) return this.analyzeInit(), !1;
		if (e.includes("@")) throw "[jump系] fn には文字「@」は禁止です";
		let f = this.#l(e);
		if (e === this.#t) return this.analyzeInit(), !1;
		this.#t = e;
		let m = this.#re[e];
		if (m) return this.#e = m, this.analyzeInit(), !1;
		let g = `jumpWork fn:${e}`;
		Reading.beginProc(g);
		let _ = "", v = new Loader();
		try {
			_ = this.#l(e + "@"), v.add({
				name: e + ":base",
				url: f
			}), v.add({
				name: e,
				url: _
			});
		} catch {
			v.add({
				name: e,
				url: f
			});
		}
		return v.use((e, u) => {
			this.sys.dec(e.extension, e.data).then((d) => {
				e.data = d, u();
			}).catch((d) => {
				this.main.errScript(`[jump系]snロード失敗です fn:${e.name} ${String(d)}`, !1), u();
			});
		}).load((u, d) => {
			if (Reading.endProc(g), _) {
				let u = d[e + ":base"].data, f = d[e].data, p = u.split("\n"), m = f.split("\n"), h = p.length, g = m.length;
				for (let e = 0; e < g && e < h; ++e) m[e] ||= p[e] ?? "";
				d[e].data = m.join("\n"), delete d[e + ":base"];
			}
			this.nextToken = this.#X, this.#r = 1, this.#ie(d[e].data), this.hTag.record_place({}), this.analyzeInit();
		}), !0;
	}
	analyzeInit() {
		CmnLib.debugLog && console.log(`📜 %c9:analyzeInit%c fn:${this.#t} lbl:${this.#J} idx:${String(this.#n)}`, "color:#3B0;", "");
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
	#ne(e, u, d, f, p) {
		let m = e.aToken.length, h = d, g = f;
		if (!g) {
			if (this.#Q()) return {
				idx: p,
				ln: h
			};
			if (e.aLNum[p]) h = e.aLNum[p];
			else {
				h = 1;
				for (let u = 0; u < p; ++u) {
					e.aLNum[u] ||= h;
					let d = e.aToken[u];
					d.startsWith("\n") ? h += d.length : h += (d.match(/\n/g) ?? []).length;
				}
				e.aLNum[p] = h;
			}
			return {
				idx: p,
				ln: h
			};
		}
		e.aLNum[0] = 1;
		let v = g.match(this.#$);
		if (v) {
			g = v[1];
			let d = p;
			switch (v[2]) {
				case "before":
					for (; e.aToken[--d] !== g;) d === 0 && DebugMng.myTrace(`[jump系 無名ラベルbefore] 
						${String(h)} 行目以前で ${u ? "マクロ内に" : ""} ラベル【 ${g} 】がありません`, "ET"), u && e.aToken[d].search(this.#ee) > -1 && DebugMng.myTrace("[jump系 無名ラベルbefore] マクロ内にラベル【" + g + "】がありません", "ET");
					return {
						idx: d + 1,
						ln: e.aLNum[d]
					};
				case "after":
					for (; e.aToken[++d] !== g;) d === m && DebugMng.myTrace(`[jump系 無名ラベルafter] ${String(h)} 行目以後でマクロ内にラベル【${g}】がありません`, "ET"), e.aToken[d].search(this.#te) > -1 && DebugMng.myTrace(`[jump系 無名ラベルafter] ${String(h)} 行目以後でマクロ内にラベル【 ${g} 】がありません`, "ET");
					return {
						idx: d + 1,
						ln: e.aLNum[d]
					};
				default: DebugMng.myTrace("[jump系] 無名ラベル指定【label=" + g + "】が間違っています", "ET");
			}
		}
		h = 1;
		let y = /* @__PURE__ */ RegExp("^" + g.replaceAll("*", "\\*") + "(?=\\s|;|\\[|\\||$)"), b = !1;
		for (let u = 0; u < m; ++u) {
			e.aLNum[u] ||= h;
			let d = e.aToken[u];
			if (b) {
				this.#a.testTagEndLetml(d) ? b = !1 : h += (d.match(/\n/g) ?? []).length;
				continue;
			}
			let f = d.charCodeAt(0);
			if (f === 10) {
				h += d.length;
				continue;
			}
			if (f === 42) {
				if (d.search(y) > -1) return {
					idx: u + 1,
					ln: h
				};
				continue;
			}
			f === 91 && (h += (d.match(/\n/g) ?? []).length, this.#a.testTagLetml(d) && (b = !0));
		}
		throw b ? "[let_ml]の終端・[endlet_ml]がありません" : (DebugMng.myTrace(`[jump系] ラベル【${g}】がありません`, "ET"), "Dummy");
	}
	#re = Object.create(null);
	#ie(e) {
		let u = "";
		try {
			u = "ScriptIterator.resolveScript";
			let d = this.#a.resolveScript(e);
			u = "ScriptIterator.replaceScript_Wildcard", this.#ce(d), this.#re[this.#t] = this.#e = d;
		} catch (e) {
			e instanceof Error ? u += `例外 mes=${e.message}(${e.name})` : u = String(e), this.main.errScript(u, !1);
		}
		this.val.touchAreaKidoku(this.#t);
	}
	#ae(e) {
		this.#t = e.fn, this.#n = e.idx;
		let u = this.#re[this.#t];
		u && (this.#e = u), this.#r = this.#e.aLNum[e.idx];
	}
	#oe = /^\[(call|loadplugin)\s/;
	#se = /\bfn\s*=\s*[^\s\]]+/;
	#ce(e) {
		for (let d = e.len - 1; d >= 0; --d) {
			let f = e.aToken[d];
			if (!this.#oe.test(f)) continue;
			let [p, m] = tagToken2Name_Args(f);
			this.#o.parse(m);
			let h = this.#o.hPrm.fn;
			if (!h) continue;
			let { val: _ } = h;
			if (!_.endsWith("*")) continue;
			e.aToken.splice(d, 1, "	", "; " + f), e.aLNum.splice(d, 1, NaN, NaN);
			let v = p === "loadplugin" ? SEARCH_PATH_ARG_EXT.CSS : SEARCH_PATH_ARG_EXT.SN, y = this.cfg.matchPath("^" + _.slice(0, -1) + ".*", v);
			for (let p of y) {
				let m = f.replace(this.#se, "fn=" + decodeURIComponent(getFn(p[v])));
				e.aToken.splice(d, 0, m), e.aLNum.splice(d, 0, NaN);
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
		let e = this.#t, u = this.#n, d = this.#e.len;
		if (this.#i.length > 0) {
			let f = this.#i[0];
			e = f.fn, u = f.idx;
			let p = this.#re[e];
			p && (d = p.len);
		}
		return u === d ? !1 : this.val.getAreaKidoku(e)?.search(u) ?? !1;
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
		let { name: u } = e;
		if (!u) throw "nameは必須です";
		if (u in this.hTag) throw `[${u}]はタグかすでに定義済みのマクロです`;
		if (this.#me.test(u)) throw `[${u}]はマクロ名として異常です`;
		let d = this.#r, f = new CallStack(this.#t, this.#n);
		for (this.#ge += "|" + u, this.#_e = /* @__PURE__ */ RegExp(`\\[(${this.#ge})\\b`), this.hTag[u] = (u) => (this.#H(u), this.val.setMp({
			...u,
			"const.sn.macro": JSON.stringify({ name: e.name }),
			"const.sn.me_call_scriptFn": this.#t
		}), this.val.setVal_Nochk("mp", "const.sn.me_call_scriptFn", this.#t), this.#r = d, this.#ae(f), !1); this.#n < this.#e.len; ++this.#n) {
			this.#e.aLNum[this.#n] ||= this.#r;
			let e = this.#e.aToken[this.#n];
			if (e.search(this.#te) > -1) return ++this.#n, !1;
			let u = e.charCodeAt(0);
			u === 10 ? this.#r += e.length : u === 91 && (this.#r += (e.match(/\n/g) ?? []).length);
		}
		throw `マクロ[${u}]定義の終端・[endmacro]がありません`;
	}
	#ge = "call";
	#_e = /\[(call)\b/;
	#ve(e) {
		if ("fn" in e != "label" in e) throw "fnとlabelはセットで指定して下さい";
		let u = argChk_Num(e, "place", 0), f = this.val.getMark(u);
		if (!f) throw `place=${String(u)} は存在しません`;
		return this.loadFromMark(e, f, SndProcOnLoad.ALL_STOP_AND_PLAY);
	}
	loadFromMark(e, u, d = SndProcOnLoad.MINIMAL_STOP) {
		this.hTag.clear_event({}), this.val.mark2save(u), this.val.setMp(creMP()), this.#O.recPagebreak();
		let m = [];
		d !== SndProcOnLoad.NO_TOUCH && (m = this.sndMng.playLoopFromSaveObj(d === SndProcOnLoad.ALL_STOP_AND_PLAY)), argChk_Boolean(e, "do_rec", !0) && (this.#be = {
			hSave: this.val.cloneSave(),
			hPages: { ...u.hPages },
			aIfStk: [...u.aIfStk]
		});
		let h = {
			enabled: !!this.val.getVal("save:const.sn.autowc.enabled"),
			text: String(this.val.getVal("save:const.sn.autowc.text")),
			time: Number(this.val.getVal("save:const.sn.autowc.time"))
		};
		this.hTag.autowc(h), this.#R = [...this.#be.aIfStk], this.#i = [], CmnTween.stopAllTw();
		let g = Promise.allSettled([...m, ...this.#O.playback(this.#be.hPages)]).then(() => this.#O.cover(!1)), { index: _, fn: v } = e;
		if (_) return CmnLib.debugLog && console.log(`📜 %cloadFromMark index:${String(_)} move!%c fn:${v ?? ""}`, "color:#3B0;", ""), g.then(() => {
			this.#Y(v, "", _) || this.main.resume();
		}).catch((e) => console.error("loadFromMark e:%o", e)), !0;
		this.#O.cover(!0);
		let b = String(this.val.getVal("save:const.sn.scriptFn")), x = Number(this.val.getVal("save:const.sn.scriptIdx"));
		delete this.#re[b];
		let { label: S } = e;
		return g.then(S ? () => {
			this.#t = b, this.#n = x, this.hTag.call({
				...v ? { fn: v } : {},
				label: S
			}) || this.main.resume();
		} : () => {
			this.#Y(b, "", x) || this.main.resume();
		}).catch((e) => console.error("loadFromMark e:%o", e)), !0;
	}
	#ye(e) {
		let d = this.val.getMark(0);
		if (!d) return !1;
		delete this.#re[getFn(d.hSave["const.sn.scriptFn"])];
		let f = {};
		for (let e in this.#re) try {
			this.#l(e + "@");
		} catch {
			f[e] = this.#re[e];
		}
		return this.#re = f, e.do_rec = !1, this.loadFromMark(e, d, SndProcOnLoad.NO_TOUCH);
	}
	#be = {
		hSave: creSAVEDATA(),
		hPages: {},
		aIfStk: [-1]
	};
	#xe = () => {
		let { fn: e, idx: u } = this.nowScrIdx();
		return this.val.setVal_Nochk("save", "const.sn.scriptFn", e), this.val.setVal_Nochk("save", "const.sn.scriptIdx", u), this.#be = {
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
		let { fn: e, idx: u } = this.nowScrIdx(), d = this.#re[e];
		return {
			fn: e,
			...this.#j(d, u)
		};
	}
	#Se(e) {
		if (!("place" in e)) throw "placeは必須です";
		let u = e.place;
		delete e[":タグ名"], delete e.place, e.text = e.text ?? "", this.#be.json = e, this.val.setMark(u, this.#be);
		let d = Number(this.val.getVal("sys:const.sn.save.place"));
		return u === d && this.val.setVal_Nochk("sys", "const.sn.save.place", d + 1), !1;
	}
	recodeDesign(e) {
		let u = "", d = 0, f = this.#i.length;
		if (e.design_unit && f > 0) {
			let e = this.#i[0];
			u = e.fn, d = e.idx;
		} else u = this.#t, d = this.#n;
		e[":path"] = this.#u(u);
		let p = this.#re[u], m = this.#j(p, d);
		e[":ln"] = m.ln, e[":col_s"] = m.col_s, e[":col_e"] = m.col_e;
		let h = d - 1;
		e[":idx_tkn"] = h, e[":token"] = p.aToken[h] ?? "", this.sys.send2Dbg("_recodeDesign", e);
	}
	replace(e, u) {
		this.#e.aToken[e] = u;
	}
};
export { ScriptIterator };

//# sourceMappingURL=ScriptIterator.js.map