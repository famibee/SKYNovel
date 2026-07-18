import { h as e, s as t, t as n } from "./CmnLib.js";
import { _ as r, r as i, y as a } from "./pixi.js";
import { t as o } from "./DebugMng.js";
import { t as s } from "./Config.js";
import { i as c, n as l } from "./Grammar.js";
//#region src/sn/Main.ts
var u = "skynovel", d = class d {
	sys;
	static async generate(e) {
		a();
		let t = new d(e);
		return await t.#a().catch((e) => console.error("Main.generate err e:%o", e)), t;
	}
	cvs;
	#e = Object.create(null);
	#t;
	#n;
	#r;
	#i = [];
	constructor(e) {
		this.sys = e;
	}
	async #a() {
		let t = await s.generate(this.sys);
		this.sys.setMain(this, t);
		let a = {
			width: t.oCfg.window.width,
			height: t.oCfg.window.height,
			backgroundColor: e(String(t.oCfg.init.bg_color)),
			resolution: globalThis.devicePixelRatio
		}, c = document.getElementById(u);
		if (c) {
			let e = c.cloneNode(!0);
			e.id = u, a.view = c;
			let t = c.parentNode;
			this.#i.unshift(() => t.appendChild(e));
		} else {
			let e = document.createElement("canvas");
			e.id = u, a.view = e, document.body.appendChild(e), this.#i.unshift(() => document.body.removeChild(e));
		}
		let l = new i(a);
		this.#i.unshift(() => {
			r(), this.sys.destroy(), l.destroy(!1);
		}), this.cvs = l.view, this.cvs.id = "skynovel_act", c || document.body.appendChild(this.cvs);
		let d = document.createElement("canvas").getContext("2d");
		if (!d) throw "#init cc err";
		n.cc4ColorName = d;
		let [{ Variable: f }, { PropParser: p }, { SoundMng: m }, { ScriptIterator: h }, { LayerMng: g }, { EventMng: _ }, { Button: v }] = await Promise.all([
			import("./Variable.js"),
			import("./PropParser.js"),
			import("./SoundMng.js"),
			import("./ScriptIterator.js"),
			import("./LayerMng.js"),
			import("./EventMng.js"),
			import("./Button.js")
		]);
		v.init(t);
		let y = new f(this.sys, t, this.#e), b = new p(y, t.oCfg.init.escape);
		this.#o = (e, t, n, r) => y.setVal_Nochk(e, t, n, r), this.#l = (e) => b.getValAmpersand(e), this.#u = (e) => b.parse(e), await Promise.allSettled(this.sys.init(this.#e, l, y));
		let x = new m(t, this.#e, y, this, this.sys);
		this.#i.unshift(() => x.destroy()), this.#t = new h(t, this.#e, this, y, b, x, this.sys), this.#i.unshift(() => this.#t.destroy());
		let S = new o(this.sys, this.#e, this.#t);
		this.#i.unshift(() => S.destroy()), this.errScript = (e, t) => {
			if (this.stop(), o.myTrace(e), n.debugLog && console.log("🍜 SKYNovel err!"), t) throw e;
		}, this.#n = new g(t, this.#e, l, y, this, this.#t, this.sys, x, b), this.#i.unshift(() => this.#n.destroy()), this.#r = new _(t, this.#e, l, this, this.#n, y, x, this.#t, this.sys), this.#i.unshift(() => this.#r.destroy()), this.#i.unshift(() => {
			this.stop(), this.#s = !1;
			let e = () => !0;
			for (let t in this.#e) this.#e[t] = e;
		});
	}
	destroy() {
		this.resume = this.destroy = () => {}, this.cvs.parentElement?.removeChild(this.cvs);
		for (let e of this.#i) e();
		this.#i = [];
	}
	errScript = (e, t = !0) => {};
	resumeByJumpOrCall(e) {
		if (e.url) {
			this.#e.navigate_to(e), this.#t.jumpJustBefore();
			return;
		}
		if (this.#o("tmp", "sn.eventArg", String(e.arg ?? "")), this.#o("tmp", "sn.eventLabel", e.label ?? ""), t(e, "call", !1)) {
			if (this.#t.subIdxToken(), this.#e.call(e)) return;
		} else if (this.#e.clear_event({}), this.#e.jump(e)) return;
		this.resume();
	}
	#o = (e, t, n, r = !1) => {};
	resume() {
		this.#n.clearBreak(), this.#t.noticeBreak(!1), this.#r.hideHint(), queueMicrotask(() => {
			this.#c();
		});
	}
	stop = () => {
		this.#t.noticeBreak(!0);
	};
	setLoop(e, t = "") {
		(this.#s = e) ? this.resume() : this.stop(), this.sys.setTitleInfo(t ? ` -- ${t}中` : "");
	}
	#s = !0;
	async #c() {
		let e = "";
		try {
			for (; this.#s;) {
				let t = this.#t.nextToken();
				if (!t) return;
				let n = t.charCodeAt(0);
				if (n !== 9) {
					if (n === 10) {
						this.#t.addLineNum(t.length);
						continue;
					}
					if (n === 91) {
						if (e = "タグ開始", this.#t.isBreak(t)) return;
						let [n, r] = c(t);
						e = `[${n}]例外`;
						let i = (t.match(/\n/g) ?? []).length;
						if (i > 0 && this.#t.addLineNum(i), await this.#t.タグ解析(n, r)) {
							this.stop();
							return;
						}
						continue;
					}
					if (n === 38) {
						if (!t.endsWith("&")) {
							if (e = "変数計算", this.#t.isBreak(t)) return;
							let n = l(t.slice(1));
							n.name = this.#l(n.name), n.text = String(this.#u(n.text)), this.#e.let(n);
							continue;
						}
						if (e = "変数操作", t.charAt(1) === "&") throw Error("「&表示&」書式では「&」指定が不要です");
						t = String(this.#u(t.slice(1, -1)));
					} else if (n === 59) continue;
					else if (n === 42 && t.length > 1) continue;
					e = "文字表示", this.#n.setNormalChWait(), this.#n.currentTxtlayForeNeedErr.tagCh(t);
				}
			}
		} catch (t) {
			this.errScript(`${e} ${t instanceof Error ? `mes=${t.message}(${t.name})` : String(t)}`, !1);
		}
	}
	#l = (e) => "";
	#u;
};
//#endregion
export { d as Main };

//# sourceMappingURL=Main.js.map