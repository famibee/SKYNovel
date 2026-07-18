import { l as e, s as t, t as n, u as r } from "./CmnLib.js";
import { t as i } from "./SysBase.js";
import { t as a } from "./Layer.js";
//#region src/sn/localStore.ts
var o = {
	get(e) {
		let t = localStorage.getItem(e);
		if (t != null) try {
			return JSON.parse(t);
		} catch {
			return;
		}
	},
	set(e, t) {
		localStorage.setItem(e, JSON.stringify(t));
	},
	remove(e) {
		localStorage.removeItem(e);
	}
}, s = {
	isOpen: !1,
	orientation: void 0
}, c = 170, l = (e, t) => {
	globalThis.dispatchEvent(new globalThis.CustomEvent("devtoolschange", { detail: {
		isOpen: e,
		orientation: t
	} }));
}, u = ({ emitEvents: e = !0 } = {}) => {
	let t = globalThis.outerWidth - globalThis.innerWidth > c, n = globalThis.outerHeight - globalThis.innerHeight > c, r = t ? "vertical" : "horizontal";
	!(n && t) && (globalThis.Firebug && globalThis.Firebug.chrome && globalThis.Firebug.chrome.isInitialized || t || n) ? ((!s.isOpen || s.orientation !== r) && e && l(!0, r), s.isOpen = !0, s.orientation = r) : (s.isOpen && e && l(!1, void 0), s.isOpen = !1, s.orientation = void 0);
};
u({ emitEvents: !1 }), setInterval(u, 500);
//#endregion
//#region src/sn/SysWeb.ts
var d = class extends i {
	#e;
	constructor(...[e = {}, t = {
		cur: "prj/",
		crypto: !1,
		dip: ""
	}]) {
		super(e, t);
		let n = t.cur.split("/");
		this.#e = n.length > 2 ? n.slice(0, -2).join("/") + "/" : "", this.loaded(e, t);
	}
	async loaded(...[r, i]) {
		await super.loaded(r, i), document.querySelectorAll("[data-prj]").forEach((e) => {
			let t = e.attributes.getNamedItem("data-prj");
			t && e.addEventListener("click", () => {
				this.runSN(t.value);
			}, { passive: !0 });
		}), document.querySelectorAll("[data-reload]").forEach((e) => e.addEventListener("click", () => {
			this.run();
		}, { passive: !0 })), i.dip && (n.hDip = JSON.parse(i.dip));
		let a = new URLSearchParams(location.search), o = a.get("dip");
		if (o && (n.hDip = {
			...n.hDip,
			...JSON.parse(o.replaceAll("%2C", ","))
		}), !t(n.hDip, "oninit_run", !0)) return;
		t(n.hDip, "dbg", !1) && (n.isDbg = !0, this.fetch = (e, t) => fetch(e, {
			...t,
			mode: "cors"
		})), this.extPort = e(n.hDip, "port", this.extPort);
		let s = a.get("cur");
		s && (i.cur = this.#e + s + "/"), await this.run();
	}
	#t = ":";
	async runSN(e) {
		this.arg.cur = this.#e + e + "/", this.#t !== this.arg.cur && (this.#t = this.arg.cur, await this.run());
	}
	async initVal(e, t) {
		let n = encodeURIComponent(document.location.hostname);
		e["const.sn.isDebugger"] = n === "localhost" || n === "127.0.0.1";
		let r = this.cfg.headNs;
		this.flushSub = this.arg.crypto ? async () => {
			o.set(r + "sys_", await this.enc(JSON.stringify(this.data.sys))), o.set(r + "mark_", await this.enc(JSON.stringify(this.data.mark))), o.set(r + "kidoku_", await this.enc(JSON.stringify(this.data.kidoku)));
		} : () => {
			o.set(r + "sys", this.data.sys), o.set(r + "mark", this.data.mark), o.set(r + "kidoku", this.data.kidoku);
		};
		let i = r + (this.arg.crypto ? "sys_" : "sys");
		if (e["const.sn.isFirstBoot"] = o.get(i) === void 0) {
			this.data.sys = {}, this.data.mark = {}, this.data.kidoku = {}, t(this.data);
			return;
		}
		if (!this.arg.crypto) {
			this.data.sys = o.get(r + "sys"), this.data.mark = o.get(r + "mark"), this.data.kidoku = o.get(r + "kidoku"), t(this.data);
			return;
		}
		let a = "";
		try {
			a = "sys", this.data.sys = JSON.parse(await this.dec("json", o.get(r + "sys_"))), a += String(this.val.getVal("sys:TextLayer.Back.Alpha", 1)), a = "mark", this.data.mark = JSON.parse(await this.dec("json", o.get(r + "mark_"))), a = "kidoku", this.data.kidoku = JSON.parse(await this.dec("json", o.get(r + "kidoku_")));
		} catch (e) {
			console.error(`セーブデータ（${a}）が壊れています。一度クリアする必要があります(a) %o`, e);
		}
		t(this.data);
	}
	init(e, t, n) {
		let r = super.init(e, t, n), i = t.view.parentElement;
		if ("requestFullscreen" in document.body) this.tglFlscr_sub = this.isFullScr ? () => document.exitFullscreen() : () => i.requestFullscreen(), this.elc.add(document, "fullscreenchange", () => {
			this.isFullScr = !!document.fullscreenElement;
		});
		else {
			let e = document;
			this.tglFlscr_sub = this.isFullScr ? () => e.webkitCancelFullScreen() : () => i.webkitRequestFullscreen(), this.elc.add(document, "fullscreenchange", () => {
				this.isFullScr = !!e.webkitFullscreenElement;
			});
		}
		return this.cfg.oCfg.debug.devtool || this.elc.add(globalThis, "devtoolschange", (e) => {
			e.detail.isOpen && (console.error("DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。"), this.main?.destroy());
		}, {
			once: !0,
			passive: !0
		}), r;
	}
	cvsResize() {
		if (super.cvsResize(), !this.isFullScr || !this.main) return;
		let e = this.main.cvs.style;
		e.width = e.height = "";
	}
	pathBaseCnvSnPath4Dbg = "${pathbase}/";
	_export = () => ((async () => {
		let e = JSON.stringify({
			sys: this.data.sys,
			mark: this.data.mark,
			kidoku: this.data.kidoku
		}), t = this.arg.crypto ? await this.enc(e) : e, i = new Blob([t], { type: "text/json" }), a = document.createElement("a");
		a.href = URL.createObjectURL(i), a.download = (this.arg.crypto ? "" : "no_crypto_") + this.cfg.headNs + r("-", "_", "") + ".swpd", a.click(), n.debugLog && console.log("プレイデータをエクスポートしました"), setTimeout(() => this.fire("sn:exported", new MouseEvent("click")), 10);
	})(), !1);
	_import = () => (new Promise((e, t) => {
		let n = document.createElement("input");
		n.type = "file", n.accept = ".swpd, text/plain", n.onchange = () => {
			let r = n.files?.[0];
			r ? e(r) : t(/* @__PURE__ */ Error("ファイル選択に失敗しました"));
		}, n.click();
	}).then(async (e) => {
		let t = await e.text(), r = JSON.parse(this.arg.crypto ? await this.dec("json", t) : t);
		if (r.sys["const.sn.cfg.ns"] !== this.cfg.oCfg.save_ns) {
			console.error(`別のゲーム【プロジェクト名=${r.sys["const.sn.cfg.ns"]}】のプレイデータです`);
			return;
		}
		this.data.sys = r.sys, this.data.mark = r.mark, this.data.kidoku = r.kidoku, this.flush(), this.val.updateData(r), n.debugLog && console.log("プレイデータをインポートしました"), this.fire("sn:imported", new MouseEvent("click"));
	}).catch((e) => console.error(`異常なプレイデータです ${String(e)}`)), !1);
	navigate_to = (e) => {
		let { url: t } = e;
		if (!t) throw "[navigate_to] urlは必須です";
		return globalThis.open(t, "_blank"), !1;
	};
	titleSub(e) {
		document.title = e, document.querySelectorAll("[data-title]").forEach((t) => {
			t.textContent = e;
		});
	}
	async savePic(e, t) {
		let r = document.createElement("a");
		r.href = t, r.download = e, r.click(), n.debugLog && console.log("画像ファイルをダウンロードします");
	}
	#n = {};
	async appendFile(e, t) {
		let n = (this.#n[e] ?? "") + t;
		this.#n[e] = n, await this.outputFile(e, n);
	}
	async outputFile(e, t) {
		let n = new Blob([t], { type: "text/json" }), r = document.createElement("a");
		r.href = URL.createObjectURL(n), r.download = e, r.click();
	}
};
//#endregion
export { n as CmnLib, a as Layer, d as SysWeb, t as argChk_Boolean, e as argChk_Num };

//# sourceMappingURL=web.js.map