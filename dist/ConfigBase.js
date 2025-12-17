import { p as int } from "./CmnLib.js";
let SEARCH_PATH_ARG_EXT = /* @__PURE__ */ function(e) {
	return e.DEFAULT = "", e.SP_GSM = "png|jpg|jpeg|json|svg|webp|mp4|webm", e.SCRIPT = "sn|ssn", e.FONT = "woff2|woff|otf|ttf", e.SOUND = "mp3|m4a|ogg|aac|flac|wav", e.HTML = "htm|html", e.CSS = "css", e.SN = "sn", e.TST_PNGPNG_ = "png|png_", e.TST_HH = "hh", e.TST_EEE = "eee", e.TST_GGG = "ggg", e.TST_PNGXML = "png|xml", e;
}({});
function creCFG() {
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
var ConfigBase = class {
	oCfg = creCFG();
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
		let n = this.sys.arg.cur + "path.json", r = await this.sys.fetch(n);
		if (!r.ok) throw Error(r.statusText);
		let i = await r.text(), a = JSON.parse(await this.sys.dec(n, i));
		for (let [e, t] of Object.entries(a)) {
			let n = this.hPathFn2Exts[e] = t;
			for (let [e, t] of Object.entries(n)) e !== ":cnt" && (n[e] = this.sys.arg.cur + t);
		}
		this.#e = this.matchPath("^breakline$", SEARCH_PATH_ARG_EXT.SP_GSM).length > 0, this.#t = this.matchPath("^breakpage$", SEARCH_PATH_ARG_EXT.SP_GSM).length > 0;
		let o = {};
		if (this.sys.arg.crypto) for (let [e, t] of Object.entries(this.hPathFn2Exts)) for (let [n, r] of Object.entries(t)) {
			if (!n.startsWith(":")) {
				o[e] = n;
				continue;
			}
			if (!n.endsWith(":id")) continue;
			let i = r.slice(r.lastIndexOf("/") + 1), a = t[n.slice(0, -10)] ?? "", s = await (await this.sys.fetch(a)).text();
			if (i !== this.sys.hash(s)) throw `ファイル改竄エラーです fn:${a}`;
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
	searchPath(n, r = SEARCH_PATH_ARG_EXT.DEFAULT) {
		if (!n) throw "[searchPath] fnが空です";
		if (n.startsWith("http://")) return n;
		let i = n.match(this.#n), a = i ? i[1] ?? "" : n, o = i ? i[2] : "";
		if (this.userFnTail) {
			let e = a + "@@" + this.userFnTail;
			if (e in this.hPathFn2Exts) {
				if (r === SEARCH_PATH_ARG_EXT.DEFAULT) a = e;
				else for (let t of Object.keys(this.hPathFn2Exts[e] ?? {})) if (`|${r}|`.includes(`|${t}|`)) {
					a = e;
					break;
				}
			}
		}
		let s = this.hPathFn2Exts[a];
		if (!s) throw `サーチパスに存在しないファイル【${n}】です`;
		if (!o) {
			let i = int(s[":cnt"]);
			if (r === SEARCH_PATH_ARG_EXT.DEFAULT) {
				if (i > 1) throw `指定ファイル【${n}】が複数マッチします。サーチ対象拡張子群【${r}】で絞り込むか、ファイル名を個別にして下さい。`;
				return n;
			}
			let a = `|${r}|`;
			if (i > 1) {
				let e = 0;
				for (let t of Object.keys(s)) if (a.includes(`|${t}|`) && ++e > 1) throw `指定ファイル【${n}】が複数マッチします。サーチ対象拡張子群【${r}】で絞り込むか、ファイル名を個別にして下さい。`;
			}
			for (let [e, t] of Object.entries(s)) if (a.includes(`|${e}|`)) return t;
			throw `サーチ対象拡張子群【${r}】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【${n}】`;
		}
		if (r !== SEARCH_PATH_ARG_EXT.DEFAULT && !`|${r}|`.includes(`|${o}|`)) throw `指定ファイルの拡張子【${o}】は、サーチ対象拡張子群【${r}】にマッチしません。探索ファイル名=【${n}】`;
		let c = s[o];
		if (!c) throw `サーチパスに存在しない拡張子【${o}】です。探索ファイル名=【${n}】、サーチ対象拡張子群【${r}】`;
		return c;
	}
	matchPath(e, n = SEARCH_PATH_ARG_EXT.DEFAULT) {
		let r = [], i = new RegExp(e), a = new RegExp(n);
		for (let [e, o] of Object.entries(this.hPathFn2Exts)) {
			if (e.search(i) === -1) continue;
			if (n === SEARCH_PATH_ARG_EXT.DEFAULT) {
				r.push(o);
				continue;
			}
			let s = {}, c = !1;
			for (let t of Object.keys(o)) t.search(a) !== -1 && (s[t] = e, c = !0);
			c && r.push(s);
		}
		return r;
	}
	addPath(e, t) {
		let n = {};
		for (let [e, r] of Object.entries(t)) n[e] = (e.startsWith(":") ? "" : this.sys.arg.cur) + String(r);
		this.hPathFn2Exts[e] = n;
	}
};
export { SEARCH_PATH_ARG_EXT as n, ConfigBase as t };

//# sourceMappingURL=ConfigBase.js.map