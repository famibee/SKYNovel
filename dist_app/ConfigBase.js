import { p as e } from "./CmnLib.js";
//#region src/sn/ConfigBase.ts
var t = /* @__PURE__ */ function(e) {
	return e.DEFAULT = "", e.SP_GSM = "png|jpg|jpeg|json|svg|webp|mp4|webm", e.SCRIPT = "sn|ssn", e.FONT = "woff2|woff|otf|ttf", e.SOUND = "mp3|m4a|ogg|aac|flac|wav", e.HTML = "htm|html", e.CSS = "css", e.SN = "sn", e.TST_PNGPNG_ = "png|png_", e.TST_HH = "hh", e.TST_EEE = "eee", e.TST_GGG = "ggg", e.TST_PNGXML = "png|xml", e;
}({});
function n() {
	return {
		save_ns: "",
		window: {
			width: 300,
			height: 300
		},
		book: {
			title: "",
			creator: "",
			cre_url: "",
			publisher: "",
			pub_url: "",
			detail: "",
			version: "1.0"
		},
		log: { max_len: 64 },
		init: {
			bg_color: "#000000",
			tagch_msecwait: 10,
			auto_msecpagewait: 3500,
			escape: ""
		},
		debug: {
			devtool: !1,
			dumpHtm: !1,
			token: !1,
			tag: !1,
			putCh: !1,
			debugLog: !1,
			baseTx: !1,
			masume: !1,
			variable: !1
		},
		code: {},
		debuger_token: ""
	};
}
var r = class {
	sys;
	oCfg = n();
	userFnTail = "";
	hPathFn2Exts = {};
	constructor(e) {
		this.sys = e;
	}
	async load(e) {
		this.oCfg.save_ns = e.save_ns ?? this.oCfg.save_ns, e.window ??= {
			width: 300,
			height: 300
		}, this.oCfg.window.width = e.window.width, this.oCfg.window.height = e.window.height, this.oCfg.book = {
			...this.oCfg.book,
			...e.book
		}, this.oCfg.log.max_len = e.log?.max_len ?? this.oCfg.log.max_len, this.oCfg.init = {
			...this.oCfg.init,
			...e.init
		}, this.oCfg.debug = {
			...this.oCfg.debug,
			...e.debug
		}, this.oCfg.debuger_token = e.debuger_token;
		let t = this.sys.arg.cur + "path.json", n = await this.sys.fetch(t);
		if (!n.ok) throw Error(n.statusText);
		let r = await n.text(), i = JSON.parse(await this.sys.dec(t, r));
		for (let [e, t] of Object.entries(i)) {
			let n = this.hPathFn2Exts[e] = t;
			for (let [e, t] of Object.entries(n)) e !== ":cnt" && (n[e] = this.sys.arg.cur + t);
		}
		this.#e = this.matchPath("^breakline$", "png|jpg|jpeg|json|svg|webp|mp4|webm").length > 0, this.#t = this.matchPath("^breakpage$", "png|jpg|jpeg|json|svg|webp|mp4|webm").length > 0;
		let a = {};
		if (this.sys.arg.crypto) for (let [e, t] of Object.entries(this.hPathFn2Exts)) for (let [n, r] of Object.entries(t)) {
			if (!n.startsWith(":")) {
				a[e] = n;
				continue;
			}
			if (!n.endsWith(":id")) continue;
			let i = r.slice(r.lastIndexOf("/") + 1), o = t[n.slice(0, -10)] ?? "", s = await (await this.sys.fetch(o)).text();
			if (i !== this.sys.hash(s)) throw `ファイル改竄エラーです fn:${o}`;
		}
	}
	#e = !1;
	get existsBreakline() {
		return this.#e;
	}
	#t = !1;
	get existsBreakpage() {
		return this.#t;
	}
	get headNs() {
		return `skynovel.${this.oCfg.save_ns} - `;
	}
	#n = /([^/\s]+)\.([^\d]\w+)/;
	searchPath(t, n = "") {
		if (!t) throw "[searchPath] fnが空です";
		if (t.startsWith("http://")) return t;
		let r = t.match(this.#n), i = r ? r[1] ?? "" : t, a = r ? r[2] : "";
		if (this.userFnTail) {
			let e = i + "@@" + this.userFnTail;
			if (e in this.hPathFn2Exts) {
				if (n === "") i = e;
				else for (let t of Object.keys(this.hPathFn2Exts[e] ?? {})) if (`|${n}|`.includes(`|${t}|`)) {
					i = e;
					break;
				}
			}
		}
		let o = this.hPathFn2Exts[i];
		if (!o) throw `サーチパスに存在しないファイル【${t}】です`;
		if (!a) {
			let r = e(o[":cnt"]);
			if (n === "") {
				if (r > 1) throw `指定ファイル【${t}】が複数マッチします。サーチ対象拡張子群【${n}】で絞り込むか、ファイル名を個別にして下さい。`;
				return t;
			}
			let i = `|${n}|`;
			if (r > 1) {
				let e = 0;
				for (let r of Object.keys(o)) if (i.includes(`|${r}|`) && ++e > 1) throw `指定ファイル【${t}】が複数マッチします。サーチ対象拡張子群【${n}】で絞り込むか、ファイル名を個別にして下さい。`;
			}
			for (let [e, t] of Object.entries(o)) if (i.includes(`|${e}|`)) return t;
			throw `サーチ対象拡張子群【${n}】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【${t}】`;
		}
		if (n !== "" && !`|${n}|`.includes(`|${a}|`)) throw `指定ファイルの拡張子【${a}】は、サーチ対象拡張子群【${n}】にマッチしません。探索ファイル名=【${t}】`;
		let s = o[a];
		if (!s) throw `サーチパスに存在しない拡張子【${a}】です。探索ファイル名=【${t}】、サーチ対象拡張子群【${n}】`;
		return s;
	}
	matchPath(e, t = "") {
		let n = [], r = new RegExp(e), i = new RegExp(t);
		for (let [e, a] of Object.entries(this.hPathFn2Exts)) {
			if (e.search(r) === -1) continue;
			if (t === "") {
				n.push(a);
				continue;
			}
			let o = {}, s = !1;
			for (let t of Object.keys(a)) t.search(i) !== -1 && (o[t] = e, s = !0);
			s && n.push(o);
		}
		return n;
	}
	addPath(e, t) {
		let n = {};
		for (let [e, r] of Object.entries(t)) n[e] = (e.startsWith(":") ? "" : this.sys.arg.cur) + String(r);
		this.hPathFn2Exts[e] = n;
	}
};
//#endregion
export { t as n, r as t };

//# sourceMappingURL=ConfigBase.js.map