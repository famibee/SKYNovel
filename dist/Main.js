import { h as parseColor, s as argChk_Boolean, t as CmnLib } from "./CmnLib.js";
import { _ as clearTextureCache, r as Application, y as skipHello } from "./pixi.js";
import "./ConfigBase.js";
import { t as DebugMng } from "./DebugMng.js";
import { t as Config } from "./Config.js";
import { i as tagToken2Name_Args, n as splitAmpersand } from "./Grammar.js";
var SN_ID = "skynovel", Main = class d {
	static async generate(e) {
		skipHello();
		let i = new d(e);
		return await i.#a().catch((e) => console.error("Main.generate err e:%o", e)), i;
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
		let i = await Config.generate(this.sys);
		this.sys.setMain(this, i);
		let c = {
			width: i.oCfg.window.width,
			height: i.oCfg.window.height,
			backgroundColor: parseColor(String(i.oCfg.init.bg_color)),
			resolution: globalThis.devicePixelRatio
		}, l = document.getElementById(SN_ID);
		if (l) {
			let e = l.cloneNode(!0);
			e.id = SN_ID, c.view = l;
			let i = l.parentNode;
			this.#i.unshift(() => i.appendChild(e));
		} else {
			let e = document.createElement("canvas");
			e.id = SN_ID, c.view = e, document.body.appendChild(e), this.#i.unshift(() => document.body.removeChild(e));
		}
		let u = new Application(c);
		this.#i.unshift(() => {
			clearTextureCache(), this.sys.destroy(), u.destroy(!1);
		}), this.cvs = u.view, this.cvs.id = SN_ID + "_act", l || document.body.appendChild(this.cvs);
		let d = document.createElement("canvas").getContext("2d");
		if (!d) throw "#init cc err";
		CmnLib.cc4ColorName = d;
		let [{ Variable: f }, { PropParser: p }, { SoundMng: m }, { ScriptIterator: h }, { LayerMng: g }, { EventMng: _ }, { Button: v }] = await Promise.all([
			import("./Variable.js"),
			import("./PropParser.js"),
			import("./SoundMng.js"),
			import("./ScriptIterator.js"),
			import("./LayerMng.js"),
			import("./EventMng.js"),
			import("./Button.js")
		]);
		v.init(i);
		let y = new f(this.sys, i, this.#e), b = new p(y, i.oCfg.init.escape);
		this.#o = (e, i, a, o) => y.setVal_Nochk(e, i, a, o), this.#l = (e) => b.getValAmpersand(e), this.#u = (e) => b.parse(e), await Promise.allSettled(this.sys.init(this.#e, u, y));
		let x = new m(i, this.#e, y, this, this.sys);
		this.#i.unshift(() => x.destroy()), this.#t = new h(i, this.#e, this, y, b, x, this.sys), this.#i.unshift(() => this.#t.destroy());
		let S = new DebugMng(this.sys, this.#e, this.#t);
		this.#i.unshift(() => S.destroy()), this.errScript = (e, i) => {
			if (this.stop(), DebugMng.myTrace(e), CmnLib.debugLog && console.log("🍜 SKYNovel err!"), i) throw e;
		}, this.#n = new g(i, this.#e, u, y, this, this.#t, this.sys, x, b), this.#i.unshift(() => this.#n.destroy()), this.#r = new _(i, this.#e, u, this, this.#n, y, x, this.#t, this.sys), this.#i.unshift(() => this.#r.destroy()), this.#i.unshift(() => {
			this.stop(), this.#s = !1;
			let e = () => !0;
			for (let i in this.#e) this.#e[i] = e;
		});
	}
	destroy() {
		this.resume = this.destroy = () => {}, this.cvs.parentElement?.removeChild(this.cvs);
		for (let e of this.#i) e();
		this.#i = [];
	}
	errScript = (e, i = !0) => {};
	resumeByJumpOrCall(e) {
		if (e.url) {
			this.#e.navigate_to(e), this.#t.jumpJustBefore();
			return;
		}
		if (this.#o("tmp", "sn.eventArg", String(e.arg ?? "")), this.#o("tmp", "sn.eventLabel", e.label ?? ""), argChk_Boolean(e, "call", !1)) {
			if (this.#t.subIdxToken(), this.#e.call(e)) return;
		} else if (this.#e.clear_event({}), this.#e.jump(e)) return;
		this.resume();
	}
	#o = (e, i, a, o = !1) => {};
	resume() {
		this.#n.clearBreak(), this.#t.noticeBreak(!1), this.#r.hideHint(), queueMicrotask(() => {
			this.#c();
		});
	}
	stop = () => {
		this.#t.noticeBreak(!0);
	};
	setLoop(e, i = "") {
		(this.#s = e) ? this.resume() : this.stop(), this.sys.setTitleInfo(i ? ` -- ${i}中` : "");
	}
	#s = !0;
	async #c() {
		let e = "";
		try {
			for (; this.#s;) {
				let i = this.#t.nextToken();
				if (!i) return;
				let a = i.charCodeAt(0);
				if (a !== 9) {
					if (a === 10) {
						this.#t.addLineNum(i.length);
						continue;
					}
					if (a === 91) {
						if (e = "タグ開始", this.#t.isBreak(i)) return;
						let [a, o] = tagToken2Name_Args(i);
						e = `[${a}]例外`;
						let s = (i.match(/\n/g) ?? []).length;
						if (s > 0 && this.#t.addLineNum(s), await this.#t.タグ解析(a, o)) {
							this.stop();
							return;
						}
						continue;
					}
					if (a === 38) {
						if (!i.endsWith("&")) {
							if (e = "変数計算", this.#t.isBreak(i)) return;
							let a = splitAmpersand(i.slice(1));
							a.name = this.#l(a.name), a.text = String(this.#u(a.text)), this.#e.let(a);
							continue;
						}
						if (e = "変数操作", i.charAt(1) === "&") throw Error("「&表示&」書式では「&」指定が不要です");
						i = String(this.#u(i.slice(1, -1)));
					} else if (a === 59) continue;
					else if (a === 42 && i.length > 1) continue;
					e = "文字表示", this.#n.setNormalChWait(), this.#n.currentTxtlayForeNeedErr.tagCh(i);
				}
			}
		} catch (i) {
			this.errScript(`${e} ${i instanceof Error ? `mes=${i.message}(${i.name})` : String(i)}`, !1);
		}
	}
	#l = (e) => "";
	#u;
};
export { Main };

//# sourceMappingURL=Main.js.map