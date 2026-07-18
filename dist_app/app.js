import { g as e, l as t, s as n, t as r, u as i } from "./CmnLib.js";
import { n as a } from "./CmnInterface.js";
import { t as o } from "./SysBase.js";
import { t as s } from "./DebugMng.js";
import { t as c } from "./Layer.js";
//#region src/sn/SysApp.ts
var { to_app: l } = globalThis, u = class extends o {
	constructor(...[e = {}, t = {
		cur: "prj/",
		crypto: !1,
		dip: ""
	}]) {
		super(e, t), this.loaded(e, t);
	}
	async loaded(...[t, n]) {
		await super.loaded(t, n), this.#e = await l.getInfo(), r.isPackaged = this.#e.isPackaged, this.arg = {
			...n,
			cur: this.#e.getAppPath.replaceAll("\\", "/") + (r.isPackaged ? "/doc/" : "/") + n.cur
		}, l.on("log", (e, t) => console.info("main: %o", t)), this.$path_downloads = this.#e.downloads.replaceAll("\\", "/") + "/", r.isDbg = !!this.#e.env.SKYNOVEL_DBG && !r.isPackaged, r.isDbg && (this.extPort = e(this.#e.env.SKYNOVEL_PORT ?? "3776")), await this.run();
	}
	#e = {
		getAppPath: "",
		isPackaged: !1,
		downloads: "",
		userData: "",
		getVersion: "",
		env: {},
		platform: "",
		arch: ""
	};
	fetch = (e) => fetch(e, { cache: "no-store" });
	ensureFile = l.ensureFile;
	async readFile(e, t) {
		return Promise.resolve("");
	}
	writeFile = l.writeFile;
	appendFile = l.appendFile;
	outputFile = l.outputFile;
	isApp = !0;
	$path_userdata = "";
	$path_downloads = "";
	async initVal(e, n) {
		e["const.sn.isDebugger"] = !1, this.$path_userdata = r.isDbg ? this.#e.getAppPath.slice(0, -3) + ".vscode/" : this.#e.userData.replaceAll("\\", "/") + "/", this.flushSub = () => {
			l.flush(JSON.parse(JSON.stringify(this.data)));
		}, await this.#t();
		let i = e["const.sn.isFirstBoot"] = await l.Store_isEmpty();
		if (i) this.data.sys = a(), this.data.mark = {}, this.data.kidoku = {};
		else {
			let e = await l.Store_get();
			this.data.sys = e.sys, this.data.mark = e.mark, this.data.kidoku = e.kidoku;
		}
		let o = t(this.data.sys, "const.sn.nativeWindow.x", 0), s = t(this.data.sys, "const.sn.nativeWindow.y", 0), c = this.data.sys["const.sn.nativeWindow.w"] || r.stageW, u = this.data.sys["const.sn.nativeWindow.h"] || r.stageH;
		l.on("save_win_inf", (t, { x: r, y: i, w: a, h: o }) => {
			this.data.sys["const.sn.nativeWindow.x"] = r, this.data.sys["const.sn.nativeWindow.y"] = i, this.data.sys["const.sn.nativeWindow.w"] = a, this.data.sys["const.sn.nativeWindow.h"] = o, e["const.sn.screenResolutionX"] = screen.availWidth, e["const.sn.screenResolutionY"] = screen.availHeight, n(this.data);
		}), await l.inited(this.cfg.oCfg, {
			c: i,
			x: o,
			y: s,
			w: c,
			h: u
		});
	}
	#t = () => l.Store({
		cwd: this.$path_userdata + "storage",
		name: this.arg.crypto ? "data_" : "data",
		encryptionKey: this.arg.crypto ? this.stk() : void 0
	});
	init(e, t, n) {
		let r = super.init(e, t, n);
		document.body.style.backgroundColor = "#000", l.on("shutdown", (e) => this.main?.destroy());
		let i = new MouseEvent("click");
		return l.on("fire", (e, t) => this.fire(t, i)), r;
	}
	cvsResize() {
		if (super.cvsResize(), !this.main) return;
		let e = this.main.cvs, t = e.parentElement?.style;
		if (!t) return;
		let n = e.style;
		this.isFullScr ? (t.position = "", t.width = "", t.height = "", n.position = "fixed", n.left = `${String(this.ofsLeft4elm)}px`, n.top = `${String(this.ofsTop4elm)}px`) : (t.position = "relative", t.width = `${String(this.cvsWidth)}px`, t.height = `${String(this.cvsHeight)}px`, n.position = "relative", n.left = "", n.top = "");
	}
	copyBMFolder = (e, t) => {
		let n = `${this.$path_userdata}storage/${String(e)}/`, r = `${this.$path_userdata}storage/${String(t)}/`;
		l.existsSync(n).then(async (e) => {
			e && await l.copy(n, r);
		});
	};
	eraseBMFolder = (e) => {
		l.remove(`${this.$path_userdata}storage/${String(e)}/`);
	};
	close = () => (l.win_close(), !1);
	_export = () => (l.zip(this.$path_userdata + "storage/", this.$path_downloads + (this.arg.crypto ? "" : "no_crypto_") + this.cfg.headNs + i("-", "_", "") + ".spd").then(() => {
		r.debugLog && console.log("プレイデータをエクスポートしました"), this.fire("sn:exported", new MouseEvent("click"));
	}), !1);
	_import = () => (l.showOpenDialog({
		title: "play data import",
		filters: [{
			name: "sn import",
			extensions: ["spd"]
		}],
		properties: ["openFile"]
	}).then(async ({ canceled: e, filePaths: [t] }) => {
		if (e) return;
		let n = () => this.flush();
		this.flush = () => {}, await l.unzip(t, this.$path_userdata + "storage/"), await this.#t();
		let i = await l.Store_get();
		this.data.sys = i.sys, this.data.mark = i.mark, this.data.kidoku = i.kidoku, this.flush = n, this.flush(), this.val.updateData(i), r.debugLog && console.log("プレイデータをインポートしました"), this.fire("sn:imported", new MouseEvent("click"));
	}).catch((e) => console.log(`[import] err: ${String(e)}`)), !1);
	navigate_to = (e) => {
		let { url: t } = e;
		if (!t) throw "[navigate_to] urlは必須です";
		return l.navigate_to(t), !1;
	};
	titleSub(e) {
		l.win_setTitle(e);
	}
	tglFlscr_sub = () => l.isSimpleFullScreen().then(async (e) => {
		this.isFullScr = !e, await l.setSimpleFullScreen(this.isFullScr);
	});
	update_check = (e) => {
		let { url: t } = e;
		if (!t) throw "[update_check] urlは必須です";
		if (!t.endsWith("/")) throw "[update_check] urlの末尾は/にして下さい";
		return r.debugLog && s.myTrace(`[update_check] url=${t}`, "D"), this.fetch(t + "_index.json").then(async (e) => {
			let n = {
				title: "アプリ更新",
				icon: this.#e.getAppPath + "/app/icon.png",
				buttons: ["OK", "Cancel"],
				defaultId: 0,
				cancelId: 1,
				message: `アプリ【${this.cfg.oCfg.book.title}】に更新があります。\nダウンロードしますか？`
			};
			e.ok ? await this.#n(e, t, n) : await this.#r(t, n);
		}).catch((e) => s.myTrace(String(e), "ET")), !1;
	};
	async #n(e, t, n) {
		r.debugLog && s.myTrace("[update_check] _index.jsonを取得しました", "D");
		let i = await e.json();
		if (!await this.#i(i.version, n)) return;
		let a = this.#e.platform + "_" + this.#e.arch, o = i[a];
		if (o) {
			let { cn: e, path: r } = o;
			await this.#a(t, a + "-" + e, r), await this.#o(n);
			return;
		}
		let c = "", u = RegExp("^" + this.#e.platform + "_"), d = Object.entries(i).flatMap(([e, { path: n, cn: r }]) => u.test(e) ? (c += "\n- " + n, this.#a(t, e + "-" + r, n)) : []);
		n.message = `CPU = ${this.#e.arch}\nに対応するファイルが見つかりません。同じOSのファイルをすべてダウンロードしますか？`, n.detail = `${String(d.length)} 個ファイルがあります` + c;
		let { response: f } = await l.showMessageBox(n);
		f > 0 || (await Promise.allSettled(d), await this.#o(n));
	}
	async #r(e, t) {
		let n = await this.fetch(e + `latest${r.isMac ? "-mac" : ""}.yml`);
		if (!n.ok) {
			if (r.debugLog) throw "[update_check] .ymlが見つかりません";
			return;
		}
		r.debugLog && s.myTrace("[update_check] .ymlを取得しました", "D");
		let i = await n.text(), a = /version: (.+)/.exec(i)?.[1];
		if (!a) throw "[update_check] .yml に version が見つかりません";
		if (!await this.#i(a, t)) return;
		let o = /path: (.+)/.exec(i);
		if (!o) throw "[update_check] path が見つかりません";
		let [, c] = o;
		if (!c) throw "[update_check] path が見つかりません.";
		r.debugLog && s.myTrace(`[update_check] path=${c}`, "D");
		let l = /sha512: (.+)/.exec(i);
		if (!l) throw "[update_check] sha512 が見つかりません";
		let [, u] = l;
		r.debugLog && s.myTrace(`[update_check] sha=${u ?? ""}=`, "D");
		let [, d, f] = /(.+)(\.\w+)/.exec(c) ?? [
			"",
			"",
			""
		];
		await this.#a(e, d + "-" + this.#e.arch + f, c), await this.#o(t);
	}
	async #i(e, t) {
		let n = this.#e.getVersion;
		if (r.debugLog && s.myTrace(`[update_check] 現在ver=${n} 新規ver=${e}`, "D"), e === n) return r.debugLog && s.myTrace("[update_check] バージョン更新なし", "I"), !1;
		t.detail = `現在 NOW ver ${n}\n新規 NEW ver ${e}`;
		let { response: i } = await l.showMessageBox(t);
		return i > 0 ? !1 : (r.debugLog && s.myTrace("[update_check] アプリダウンロード開始", "D"), !0);
	}
	async #a(e, t, n) {
		r.debugLog && s.myTrace(`[update_check] アプリファイルDL試行... url=${e + t}`, "D");
		let i = await this.fetch(e + t);
		if (!i.ok) {
			r.debugLog && s.myTrace(`[update_check] アプリファイルが見つかりません url=${e + n}`);
			return;
		}
		let a = this.#e.downloads + "/" + n;
		r.debugLog && s.myTrace(`[update_check] pathDL=${a}`, "D"), await this.writeFile(a, new DataView(await i.arrayBuffer()));
	}
	async #o(e) {
		r.debugLog && s.myTrace("アプリファイルを保存しました", "D"), e.buttons.pop(), e.message = `アプリ【${this.cfg.oCfg.book.title}】の更新パッケージを\nダウンロードしました`, await l.showMessageBox(e);
	}
	window = (e) => {
		let i = t(e, "x", Number(this.val.getVal("sys:const.sn.nativeWindow.x", 0))), a = t(e, "y", Number(this.val.getVal("sys:const.sn.nativeWindow.y", 0))), o = t(e, "w", Number(this.val.getVal("sys:const.sn.nativeWindow.w", r.stageW))), s = t(e, "h", Number(this.val.getVal("sys:const.sn.nativeWindow.h", r.stageH)));
		return l.window(n(e, "centering", !1), i, a, r.stageW, r.stageH), this.val.setVal_Nochk("sys", "const.sn.nativeWindow.x", i), this.val.setVal_Nochk("sys", "const.sn.nativeWindow.y", a), this.val.setVal_Nochk("sys", "const.sn.nativeWindow.w", o), this.val.setVal_Nochk("sys", "const.sn.nativeWindow.h", s), this.flush(), !1;
	};
	capturePage(e, t, n, r) {
		l.capturePage(e, t, n).then(() => r());
	}
	async savePic(e, t) {
		let n = t.slice(t.indexOf(",", 20) + 1);
		await this.ensureFile(e), await this.writeFile(e, n), r.debugLog && console.log(`画像ファイル ${e} を保存しました`);
	}
};
//#endregion
export { r as CmnLib, c as Layer, u as SysApp, n as argChk_Boolean, t as argChk_Num };

//# sourceMappingURL=app.js.map