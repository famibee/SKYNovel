import { d as getFn } from "./CmnLib.js";
import { n as SEARCH_PATH_ARG_EXT } from "./ConfigBase.js";
function idx2LnCol(e, t, n = 0, r = 0, i = 0) {
	let a = e.slice(0, t).split("\n"), o = a.length;
	return {
		ln: r + o - 1,
		ch: o < 2 ? i + 1 + n + t : a.at(-1)?.length ?? 0
	};
}
var AnalyzeTagArg = class {
	#e = /;[^\n]*|(?<key>[^\s="'#|;]+)(?:\s|;[^\n]*\n)*=(?:\s|;[^\n]*\n)*(?:(?<val>[^\s"'#|;]+)|(["'#])(?<val2>.*?)\3)(?:\|(?:(?<def>[^\s"'#;]+)|(["'#])(?<def2>.*?)\6))?|(?<literal>[^\s;]+)/g;
	parse(e) {
		this.#t = {}, this.#n = !1;
		for (let { groups: t } of e.matchAll(this.#e)) {
			let { key: e, val: n, val2: r, def: i, def2: a, literal: o } = t;
			e ? this.#t[e] = {
				val: n ?? r ?? "",
				def: i ?? a
			} : o && (o === "*" ? this.#n = !0 : this.#t[o] = {
				val: "1",
				def: void 0
			});
		}
	}
	parseinDetail(e, t, r, i) {
		let a = {}, o = e.slice(1 + t, -1);
		for (let { groups: e, index: s, 0: c } of o.matchAll(this.#e)) {
			if (!s) continue;
			let { key: l, val: u, val2: d = "", literal: f } = e;
			if (f) {
				if (f.endsWith("=")) {
					let e = f.length - 1, { ch: c } = idx2LnCol(o, s + e, t, r, i);
					a[f.slice(0, -1)] = {
						k_ln: r,
						k_ch: c - e,
						v_ln: r,
						v_ch: c + 1,
						v_len: 0
					};
				}
				continue;
			}
			if (!l) continue;
			let { ln: p, ch: m } = idx2LnCol(o, s, t, r, i), { ln: h, ch: g } = idx2LnCol(o, s + c.lastIndexOf(u ?? d) - (u ? 0 : 1), t, r, i);
			a[l] = {
				k_ln: p,
				k_ch: m,
				v_ln: h,
				v_ch: g,
				v_len: u ? u.length : d.length + 2
			};
		}
		return a;
	}
	#t = {};
	get hPrm() {
		return this.#t;
	}
	#n = !1;
	get isKomeParam() {
		return this.#n;
	}
};
const REG_TAG = /(?<name>[^\s;\]]+)/;
function tagToken2Name_Args(e) {
	let t = REG_TAG.exec(e.slice(1, -1))?.groups;
	if (!t) throw `タグ記述【${e}】異常です(タグ解析)`;
	let n = t.name;
	return [n, e.slice(1 + n.length, -1)];
}
function tagToken2Name(e) {
	let t = REG_TAG.exec(e.slice(1))?.groups;
	if (!t) throw `タグ記述【${e}】異常です(タグ解析)`;
	return t.name;
}
function splitAmpersand(e) {
	let t = e.replaceAll("==", "＝").replaceAll("!=", "≠").split("="), n = t.length;
	if (n < 2 || n > 3) throw "「&計算」書式では「=」指定が一つか二つ必要です";
	let [r, i, a] = t;
	if (i.startsWith("&")) throw "「&計算」書式では「&」指定が不要です";
	return {
		name: r.replaceAll("＝", "==").replaceAll("≠", "!="),
		text: i.replaceAll("＝", "==").replaceAll("≠", "!="),
		...n === 3 ? { cast: a.trim() } : {}
	};
}
var Grammar = class {
	constructor(e) {
		this.cfg = e, this.setEscape("");
	}
	#e;
	setEscape(e) {
		if (this.#l && e in this.#l) throw "[エスケープ文字] char【" + e + "】が登録済みの括弧マクロまたは一文字マクロです";
		this.#e = RegExp((e ? `\\${e}\\S|` : "") + `\\n+|\\t+|\\[let_ml\\s+[^\\]]+\\].+?(?=\\[endlet_ml[\\]\\s])|\\[(?:[^"'#;\\]]+|(["'#]).*?\\1|;[^\\n]*)*?]|;[^\\n]*|&[^&\\n]+&|&&?(?:[^"'#;\\n&]+|(["'#]).*?\\2)+|^\\*[^\\s\\[&;\\\\]+|[^\\n\\t\\[;${e ? `\\${e}` : ""}]+`, "gs"), this.#t = /* @__PURE__ */ RegExp(`[\\w\\s;[\\]*=&｜《》${e ? `\\${e}` : ""}]`), this.#u = /* @__PURE__ */ RegExp(`[\\n\\t;\\[*&${e ? `\\${e}` : ""}]`);
	}
	bracket2macro(e, t, n, r) {
		let { name: i, text: a } = e;
		if (!i) throw "[bracket2macro] nameは必須です";
		if (!a) throw "[bracket2macro] textは必須です";
		let o = a.at(0);
		if (!o) throw "[bracket2macro] textは必須です";
		if (a.length !== 2) throw "[bracket2macro] textは括弧の前後を示す二文字を指定してください";
		if (!(i in t)) throw `[bracket2macro] 未定義のタグ又はマクロ[${i}]です`;
		this.#l ??= {};
		let s = a.charAt(1);
		if (o in this.#l) throw "[bracket2macro] text【" + o + "】が登録済みの括弧マクロまたは一文字マクロです";
		if (s in this.#l) throw "[bracket2macro] text【" + s + "】が登録済みの括弧マクロまたは一文字マクロです";
		if (this.#t.test(o)) throw "[bracket2macro] text【" + o + "】は括弧マクロに使用できない文字です";
		if (this.#t.test(s)) throw "[bracket2macro] text【" + s + "】は括弧マクロに使用できない文字です";
		this.#l[s] = "0", this.#l[o] = `[${i} text=`, this.addC2M(`\\${o}[^\\${s}]*\\${s}`, `\\${o}\\${s}`), this.#d(n, r);
	}
	char2macro(e, t, n, r) {
		let { char: i, name: a } = e;
		if (!i) throw "[char2macro] charは必須です";
		if (this.#l ??= {}, i in this.#l) throw "[char2macro] char【" + i + "】が登録済みの括弧マクロまたは一文字マクロです";
		if (this.#t.test(i)) throw "[char2macro] char【" + i + "】は一文字マクロに使用できない文字です";
		if (!a) throw "[char2macro] nameは必須です";
		if (!(a in t)) throw `[char2macro] 未定義のタグ又はマクロ[${a}]です`;
		this.#l[i] = `[${a}]`, this.addC2M(`\\${i}`, `\\${i}`), this.#d(n, r);
	}
	#t;
	#n = /* @__PURE__ */ RegExp("");
	#r = "";
	#i = "";
	addC2M(e, t) {
		this.#r += `${e}|`, this.#i += t, this.#n = RegExp(`(${this.#r}[^${this.#i}]+)`, "g");
	}
	resolveScript(e) {
		let t = e.replaceAll(/\r\n?/g, "\n").match(this.#e)?.flatMap((e) => {
			if (!this.testTagLetml(e)) return e;
			let t = /^([^\]]+?])(.*)$/s.exec(e);
			if (!t) return e;
			let [, n, r] = t;
			return [n, r];
		}) ?? [], n = {
			aToken: t,
			len: t.length,
			aLNum: []
		};
		return this.#d(n), this.#s(n), n;
	}
	#a = /^\[(call|loadplugin)\s/;
	#o = /\bfn\s*=\s*[^\s\]]+/;
	#s(n) {
		for (let r = n.len - 1; r >= 0; --r) {
			let i = n.aToken[r];
			if (!this.#a.test(i)) continue;
			let [o, s] = tagToken2Name_Args(i);
			this.#c.parse(s);
			let c = this.#c.hPrm.fn;
			if (!c) continue;
			let { val: l } = c;
			if (!l.endsWith("*")) continue;
			n.aToken.splice(r, 1, "	", "; " + i), n.aLNum.splice(r, 1, NaN, NaN);
			let u = o === "loadplugin" ? SEARCH_PATH_ARG_EXT.CSS : SEARCH_PATH_ARG_EXT.SN, d = this.cfg.matchPath("^" + l.slice(0, -1) + ".*", u);
			for (let t of d) {
				let a = i.replace(this.#o, "fn=" + decodeURIComponent(getFn(t[u])));
				n.aToken.splice(r, 0, a), n.aLNum.splice(r, 0, NaN);
			}
		}
		n.len = n.aToken.length;
	}
	#c = new AnalyzeTagArg();
	testTagLetml(e) {
		return /^\[let_ml\s/.test(e);
	}
	testTagEndLetml(e) {
		return /^\[endlet_ml\s*]/.test(e);
	}
	#l = void 0;
	#u;
	#d(e, t = 0) {
		if (this.#l) {
			for (let n = e.len - 1; n >= t; --n) {
				let t = e.aToken[n];
				if (this.testNoTxt(t.at(0) ?? "\n")) continue;
				let r = e.aLNum[n], i = t.match(this.#n);
				if (!i) continue;
				let a = 1;
				for (let t = i.length - 1; t >= 0; --t) {
					let o = i[t], s = this.#l[o.at(0) ?? " "];
					s && (o = s + (s.endsWith("]") ? "" : `'${o.slice(1, -1)}']`)), e.aToken.splice(n, a, o), e.aLNum.splice(n, a, r), a = 0;
				}
			}
			e.len = e.aToken.length;
		}
	}
	testNoTxt(e) {
		return this.#u.test(e);
	}
};
export { AnalyzeTagArg as a, tagToken2Name_Args as i, splitAmpersand as n, tagToken2Name as r, Grammar as t };

//# sourceMappingURL=Grammar.js.map