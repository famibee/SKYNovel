import { g as e, l as t, p as n, s as r } from "./CmnLib.js";
import { n as i, r as a, t as o } from "./CmnInterface.js";
import { n as s } from "./Reading.js";
import { PropParser as c } from "./PropParser.js";
import { n as l } from "./CallStack.js";
//#region src/sn/Areas.ts
var u = class e {
	#e = {};
	clear() {
		this.#e = {};
	}
	static from(t) {
		let n = new e();
		return n.#e = { ...t }, n;
	}
	val() {
		return { ...this.#e };
	}
	search(e) {
		return Object.entries(this.#e).some(([t, n]) => e >= parseInt(t) && e <= n);
	}
	record(e) {
		if (!this.search(e)) {
			for (let [t, n] of Object.entries(this.#e)) if (n + 1 === e) {
				String(e + 1) in this.#e ? (this.#e[t] = this.#e[e + 1], delete this.#e[e + 1]) : this.#e[t] = e;
				return;
			}
			if (String(e + 1) in this.#e) {
				this.#e[e] = this.#e[e + 1], delete this.#e[e + 1];
				return;
			}
			this.#e[e] = e;
		}
	}
	erase(e) {
		if (this.search(e)) {
			if (String(e) in this.#e) {
				this.#e[e] > e && (this.#e[e + 1] = this.#e[e]), delete this.#e[e];
				return;
			}
			for (let [t, n] of Object.entries(this.#e)) if (!(e < parseInt(t) || n < e)) {
				if (this.#e[t] === e) {
					this.#e[t] = e - 1;
					return;
				}
				this.#e[e + 1] = n, this.#e[t] = e - 1;
				return;
			}
		}
	}
	get count() {
		return Object.keys(this.#e).length;
	}
	toString() {
		let e = "";
		for (let t of Object.keys(this.#e).map((e) => parseInt(e)).sort((e, t) => e - t)) e += t === this.#e[t] ? "," + String(t) : "," + String(t) + "~" + String(this.#e[String(t)]);
		return e;
	}
}, d = class d {
	sys;
	cfg;
	#e = o();
	#t = a();
	#n = {
		sys: {},
		save: this.#e,
		tmp: this.#t,
		mp: {},
		mark: {}
	};
	constructor(t, n, r) {
		this.sys = t, this.cfg = n, r.let = (e) => this.#m(e), r.let_abs = (e) => this.#h(e), r.let_char_at = (e) => this.#g(e), r.let_index_of = (e) => this.#_(e), r.let_length = (e) => this.#v(e), r.let_replace = (e) => this.#y(e), r.let_round = (e) => this.#b(e), r.let_search = (e) => this.#x(e), r.let_substr = (e) => this.#S(e), r.clearsysvar = () => this.#C(), r.clearvar = () => this.#w(), r.dump_val = () => this.#k(), r.copybookmark = (e) => this.#f(e), r.erasebookmark = (e) => this.#p(e), this.defTmp("const.sn.bookmark.json", () => {
			let t = [];
			for (let [n, r] of Object.entries(this.#r.mark)) {
				let i = { ...r.json };
				i.place = e(n), t.push(i);
			}
			return JSON.stringify(t);
		}), this.#t["const.sn.config.window.width"] = n.oCfg.window.width, this.#t["const.sn.config.window.height"] = n.oCfg.window.height, this.#t["const.sn.config.book.title"] = n.oCfg.book.title, this.#t["const.sn.config.book.version"] = n.oCfg.book.version;
	}
	#r = {
		sys: {},
		mark: {},
		kidoku: {}
	};
	#i;
	#a = {};
	#o;
	async init() {
		return this.sys.initVal(this.#t, (e) => {
			this.updateData(e), this.cfg.oCfg.debug.variable ? this.#s(this.sys) : this.flush = () => this.sys.flush(), this.flush(), this.#o = (e, t) => this.sys.callHook(e, t), this.sys.addHook((e, t) => this.#l[e]?.(e, t)), n(this.getVal("sys:sn.tagCh.msecWait", -1)) === -1 && this.#C(!0), this.#j = !!this.getVal("sys:sn.tagCh.doWait"), this.#M = !!this.getVal("sys:sn.tagCh.doWait_Kidoku"), this.#N = n(this.getVal("sys:sn.tagCh.msecWait")), this.#P = n(this.getVal("sys:sn.tagCh.msecWait_Kidoku")), this.#c();
		});
	}
	#s(e) {
		sessionStorage.clear();
		let t = this.cfg.headNs;
		this.flush = () => {
			let r = i();
			for (let [e, t] of Object.entries(this.#i)) t instanceof Function || (r[e] = t);
			sessionStorage[t + "sys"] = JSON.stringify(r);
			let s = o();
			for (let [e, t] of Object.entries(this.#e)) s[e] = t;
			sessionStorage[t + "save"] = JSON.stringify(s);
			let c = a();
			for (let [e, t] of Object.entries(this.#t)) c[e] = t instanceof Function ? t() : t;
			sessionStorage[t + "tmp"] = JSON.stringify(c);
			let u = l();
			for (let [e, t] of Object.entries(this.#n.mp)) u[e] = t;
			sessionStorage[t + "mp"] = JSON.stringify(u);
			let d = {};
			for (let [e, t] of Object.entries(this.#r.mark)) d[n(e)] = t instanceof Function ? t() : t;
			sessionStorage[t + "mark"] = JSON.stringify(d), sessionStorage[t + "kidoku"] = structuredClone(this.#r.kidoku), e.flush();
		};
	}
	#c() {
		s.playbackPage(String(this.getVal("sys:const.sn.aPageLog", "[]")), String(this.getVal("save:const.sn.styPaging", s.INI_STYPAGE)));
	}
	#l = {
		auth: (e, t) => this.#u(t.hBreakpoint.aData),
		var: (e, t) => this.sys.send2Dbg(t.ri, { v: this.#n[t.scope] ?? {} }),
		set_var: (e, t) => {
			try {
				this.#T(t.nm, t.val), this.sys.send2Dbg(t.ri, {});
			} catch {}
		},
		set_data_break: (e, t) => {
			this.#u(t.a), this.sys.send2Dbg(t.ri, {});
		},
		disconnect: (e) => {
			d.#E = {};
		}
	};
	#u(e) {
		d.#E = {};
		for (let t of e) d.#E[t.dataId] = 1;
	}
	updateData(e) {
		this.#r = e, this.#i = this.#n.sys = e.sys, this.#a = {};
		for (let [t, n] of Object.entries(e.kidoku)) this.#a[t] = u.from(n);
	}
	flush = () => {};
	setDoRecProc(e) {
		this.#d = e;
	}
	#d = (e) => {};
	defTmp(e, t) {
		this.#t[e] = t;
	}
	cloneMp() {
		return { ...this.#n.mp };
	}
	setMp(e) {
		this.#n.mp = e;
	}
	setMark(e, t) {
		this.#r.mark[e] = t, this.flush();
	}
	getMark(e) {
		let t = this.#r.mark[e];
		if (!t) throw `place【${String(e)}】は存在しません`;
		return t;
	}
	cloneSave() {
		return { ...this.#n.save };
	}
	mark2save(e) {
		this.#e = this.#n.save = { ...e.hSave }, this.#A = this.#e["sn.doRecLog"];
	}
	touchAreaKidoku(e) {
		return this.#a[e] || (this.#r.kidoku[e] = {}, this.#a[e] = new u());
	}
	getAreaKidoku(e) {
		let t = this.#a[e];
		if (!t) throw `hAreaKidoku${e}】は存在しません`;
		return t;
	}
	saveKidoku() {
		for (let [e, t] of Object.entries(this.#a)) this.#r.kidoku[e] = t.val();
		this.flush();
	}
	#f(e) {
		let n = t(e, "from", NaN), r = t(e, "to", NaN);
		if (n === r) return !1;
		let i = this.#r.mark[n];
		if (!i) throw `from:${String(n)} のセーブデータは存在しません`;
		return this.setMark(r, { ...i }), this.sys.copyBMFolder(n, r), !1;
	}
	#p(e) {
		let n = t(e, "place", NaN);
		return delete this.#r.mark[n], this.flush(), this.sys.eraseBMFolder(n), !1;
	}
	#m(i) {
		if (!i.name) throw "nameは必須です";
		let a = !0;
		if (i.cast) switch (i.cast) {
			case "num":
				t(i, "text", NaN);
				break;
			case "int":
				i.text = String(n(t(i, "text", NaN)));
				break;
			case "uint":
				i.text = String(e(t(i, "text", NaN)));
				break;
			case "bool":
				r(i, "text", !1);
				break;
			case "str":
				a = !1;
				break;
			default: throw "cast【" + i.cast + "】は未定義です";
		}
		return this.#T(i.name, i.text, a), !1;
	}
	#h(e) {
		let n = t(e, "text", 0);
		return e.text = String(n < 0 ? -n : n), this.#m(e), !1;
	}
	#g(e) {
		return e.text = (e.text ?? "").charAt(t(e, "pos", 0)), this.#m(e), !1;
	}
	#_(e) {
		let { val: n } = e;
		if (!n) throw "valは必須です";
		let r = t(e, "start", 0);
		return e.text = String((e.text ?? "").indexOf(n, r)), this.#m(e), !1;
	}
	#v(e) {
		return e.text = String((e.text ?? "").length), this.#m(e), !1;
	}
	#y(e) {
		if (!e.reg) throw "regは必須です";
		let { flags: t } = e, n = t ? new RegExp(e.reg, t) : new RegExp(e.reg);
		return e.text = (e.text ?? "").replace(n, String(e.val)), this.#m(e), !1;
	}
	#b(e) {
		let n = t(e, "text", 0);
		return e.text = String(Math.round(n)), this.#m(e), !1;
	}
	#x(e) {
		if (!e.reg) throw "regは必須です";
		let { flags: t } = e, n = t ? new RegExp(e.reg, t) : new RegExp(e.reg);
		return e.text = String((e.text ?? "").search(n)), this.#m(e), !1;
	}
	#S(e) {
		let r = t(e, "pos", 0);
		return e.text = e.len === "all" ? (e.text ?? "").slice(r) : (e.text ?? "").slice(r, r + n(t(e, "len", 1))), this.#m(e), !1;
	}
	#C(e = !1) {
		let n = this.#i = this.#n.sys = this.#r.sys = i();
		typeof process < "u" || (this.setVal_Nochk("sys", "const.sn.window.x", 0), this.setVal_Nochk("sys", "const.sn.window.y", 0)), this.setVal_Nochk("sys", "sn.tagCh.msecWait", this.cfg.oCfg.init.tagch_msecwait), this.setVal_Nochk("sys", "sn.tagCh.msecWait_Kidoku", this.cfg.oCfg.init.tagch_msecwait), this.setVal_Nochk("sys", "sn.auto.msecPageWait", t(n, "sn.auto.msecPageWait", this.cfg.oCfg.init.auto_msecpagewait)), this.setVal_Nochk("sys", "sn.auto.msecPageWait_Kidoku", t(n, "sn.auto.msecPageWait", this.cfg.oCfg.init.auto_msecpagewait));
		for (let e of Object.values(this.#a)) e.clear();
		return this.#n.mark = this.#r.mark = {}, e || this.#c(), this.flush(), !1;
	}
	#w() {
		let e = this.#e["const.sn.mesLayer"], t = this.#e["sn.doRecLog"], n = this.#e["const.sn.sLog"], r = this.#e["const.sn.styPaging"];
		return this.#e = this.#n.save = o(), this.setVal_Nochk("save", "const.sn.mesLayer", e), this.setVal_Nochk("save", "sn.doRecLog", t), this.setVal_Nochk("save", "const.sn.sLog", n), this.setVal_Nochk("save", "const.sn.styPaging", r), !1;
	}
	#T(e, t, n = !0) {
		if (!e) throw "[変数に値セット] nameは必須です";
		if (t === void 0) throw "[変数に値セット] textは必須です（空文字はOK）";
		let r = c.getValName(e);
		if (!r) throw `[変数参照] name(${e})が変数名として異常です`;
		let { scope: i = "tmp", name: a } = r, o = this.#n[i];
		if (a.startsWith("const.") && a in o) throw `[変数に値セット] 変数【${a}】は書き換え不可です`;
		this.setVal_Nochk(i, a, t, n);
	}
	setVal_Nochk(e, t, n, r = !1) {
		let i = this.#n[e], a = r ? this.#D(n) : n, o = e + ":" + t;
		if (o in d.#E) {
			let e = i[t];
			e != a && this.#o("data_break", {
				dataId: o,
				old_v: e,
				new_v: a
			});
		}
		i[t] = a, this.#F[o]?.(t, a ?? "");
	}
	static #E = {};
	getVal(e, t, n = !1) {
		if (!e) throw "[変数参照] nameは必須です";
		let r = c.getValName(e);
		if (!r) throw "[変数参照] name(" + e + ")が変数名として異常です";
		let { scope: i = "tmp", name: a, at: o } = r, s = this.#n[i], l = s[a];
		if (!(a in s)) {
			if (l = t, n) return s[a] = t, o === "@str" ? l : this.#D(l);
			let e = "", r = a.split("."), i = r.length;
			for (let n = 0; n < i; ++n, e += ".") {
				if (e += r[n], !(e in s)) continue;
				let a = JSON.parse(s[e]);
				if (Object.prototype.toString.call(a) !== "[object Object]") {
					if (n + 1 === i) {
						l = a;
						break;
					}
					continue;
				}
				let o = n;
				for (; ++o < i;) {
					let e = r[o];
					if (!(e in a)) {
						l = t;
						break;
					}
					if (a = a[e], Object.prototype.toString.call(a) !== "[object Object]" || o + 1 === i) {
						l = a;
						break;
					}
				}
				l instanceof Object && (l = JSON.stringify(l));
				break;
			}
		}
		return l instanceof Function && (l = l()), o === "@str" ? l : this.#D(l);
	}
	#D(e) {
		let t = e;
		if (t === "true") return !0;
		if (t === "false") return !1;
		if (t === "null") return null;
		if (t !== "undefined") return this.#O.test(t) ? parseFloat(t) : e;
	}
	#O = /^-?[\d.]+$/;
	#k() {
		let e = {
			tmp: {},
			sys: {},
			save: {},
			mp: {}
		};
		for (let t in e) {
			let n = this.#n[t], r = e[t];
			for (let [e, t] of Object.entries(n)) t instanceof Function || (r[e] = t);
		}
		return console.info("🥟 [dump_val]", e), !1;
	}
	#A = !1;
	doRecLog() {
		return this.#A;
	}
	#j = !1;
	get tagCh_doWait() {
		return this.#j;
	}
	#M = !1;
	get tagCh_doWait_Kidoku() {
		return this.#M;
	}
	#N = 0;
	get tagCh_msecWait() {
		return this.#N;
	}
	#P = 0;
	get tagCh_msecWait_Kidoku() {
		return this.#P;
	}
	#F = {
		"sys:sn.tagCh.doWait": (e) => {
			this.#j = this.#I(e);
		},
		"sys:sn.tagCh.doWait_Kidoku": (e) => {
			this.#M = this.#I(e);
		},
		"sys:sn.tagCh.msecWait": (e) => {
			this.#N = this.#L(e);
		},
		"sys:sn.tagCh.msecWait_Kidoku": (e) => {
			this.#P = this.#R(e);
		},
		"sys:sn.tagCh.canskip": (e) => this.#I(e),
		"sys:sn.auto.msecPageWait": (e) => this.#z(e),
		"sys:sn.auto.msecPageWait_Kidoku": (e) => this.#z(e),
		"sys:sn.auto.msecLineWait": (e) => this.#B(e),
		"sys:sn.auto.msecLineWait_Kidoku": (e) => this.#B(e),
		"save:sn.doRecLog": (e) => {
			this.#d(this.#A = this.#V(e));
		},
		"save:sn.userFnTail": (e, t) => {
			let n = String(t);
			if (n.includes("@")) throw "この変数では文字「@」は禁止です";
			this.cfg.userFnTail = n;
		},
		"tmp:flash.desktop.NativeApplication.nativeApplication.systemIdleMode": () => {}
	};
	defValTrg(e, t) {
		this.#F[e] = t;
	}
	#I = (e) => r(this.#i, e, !0);
	#L = (e) => t(this.#i, e, 10);
	#R = (e) => t(this.#i, e, this.cfg.oCfg.init.tagch_msecwait ?? 10);
	#z = (e) => t(this.#i, e, this.cfg.oCfg.init.auto_msecpagewait ?? 3500);
	#B = (e) => t(this.#i, e, 500);
	#V(e) {
		return r(this.#e, e, !0);
	}
};
//#endregion
export { d as Variable };

//# sourceMappingURL=Variable.js.map