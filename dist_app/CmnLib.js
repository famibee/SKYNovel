import { r as e } from "./rolldown-runtime.js";
//#region src/sn/CmnLib.ts
function t(e) {
	return parseInt(String(e), 10);
}
function n(e) {
	let t = parseInt(String(e), 10);
	return t < 0 ? -t : t;
}
function r(e = "/", t = " ", n = ":", r = "") {
	let i = /* @__PURE__ */ new Date();
	return String(i.getFullYear()) + e + String(100 + i.getMonth() + 1).slice(1, 3) + e + String(100 + i.getDate()).slice(1, 3) + t + String(100 + i.getHours()).slice(1, 3) + n + String(100 + i.getMinutes()).slice(1, 3) + (r === "" ? "" : r + String(i.getMilliseconds()));
}
var i = "/* SKYNovel */";
function a() {
	let e = document.getElementsByTagName("head")[0], t = e.children.length;
	for (let n = t - 1; n >= 0; --n) {
		let t = e.children[n];
		t instanceof HTMLStyleElement && t.innerText.startsWith(i) && e.removeChild(t);
	}
}
function o(e) {
	let t = document.createElement("style");
	t.innerHTML = i + e, document.getElementsByTagName("head")[0].appendChild(t);
}
var s = "pointerdown", c = "pointerdown", l = "keydown", u = "compChIn";
function d(e, t, n) {
	let r = e[t];
	if (!(t in e)) {
		if (isNaN(n)) throw `[${e[":タグ名"] ?? ""}]属性 ${t} は必須です`;
		return e[t] = n, n;
	}
	let i = String(r).startsWith("0x") ? parseInt(r) : parseFloat(r);
	if (isNaN(i)) throw `[${e[":タグ名"] ?? ""}]属性 ${t} の値【${String(r)}】が数値ではありません`;
	return e[t] = i, i;
}
function f(e, t, n) {
	if (!(t in e)) return e[t] = n, n;
	let r = e[t];
	if (r === null) return !1;
	let i = String(r);
	return e[t] = i !== "false" && !!i;
}
function p(e) {
	if (e.startsWith("#")) return parseInt(e.slice(1), 16);
	let t = Number(e);
	if (!isNaN(t)) return t;
	if (e === "black") return 0;
	y.cc4ColorName.fillStyle = e;
	let n = y.cc4ColorName.fillStyle;
	if (n === "#000000") throw `色名前 ${e} が異常です`;
	return parseInt(n.slice(1), 16);
}
function m(e, t, n) {
	let r = e[t];
	return r ? e[t] = p(String(r)) : (e[t] = n, n);
}
var h = /JSON at position (\d+)$/;
function g(e, t = "", n = "") {
	let r = (h.exec(n) ?? ["", ""])[1];
	return `[${e[":タグ名"] ?? ""}] ${t} 属性の解析エラー : ${n}
${String(e[t])}${r ? `
${"^".padStart(Number(r))}` : ""}`;
}
var _ = /^[^/.]+$|[^/]+(?=\.)/;
function v(e) {
	return (_.exec(e) ?? [""])[0];
}
var y = class t {
	static async init() {
		let t = await import("./platform.js").then((t) => /* @__PURE__ */ e(t.default));
		this.platform = JSON.stringify(t), this.plat_desc = t.description ?? "", this.isSafari = t.name === "Safari", this.isFirefox = t.name === "Firefox", this.isMac = (t.os?.family ?? "").includes("OS X"), this.isMobile = !/(Windows|OS X)/.test(t.os?.family ?? "");
	}
	static stageW = 0;
	static stageH = 0;
	static debugLog = !1;
	static platform;
	static plat_desc;
	static isSafari;
	static isFirefox;
	static isMac;
	static isMobile;
	static hDip = {};
	static isDbg = !1;
	static isPackaged = !1;
	static needClick2Play() {
		return "AudioContext" in globalThis ? (t.#e = new globalThis.AudioContext(), t.needClick2Play = () => t.#e.state === "suspended") : t.needClick2Play = () => !1, t.needClick2Play();
	}
	static #e;
	static isDarkMode = !1;
	static cc4ColorName;
};
//#endregion
export { u as a, m as c, v as d, a as f, n as g, p as h, l as i, d as l, g as m, s as n, o, t as p, c as r, f as s, y as t, r as u };

//# sourceMappingURL=CmnLib.js.map