import { r as __toDynamicImportESM } from "./chunk.js";
function int(e) {
	return parseInt(String(e), 10);
}
function uint(e) {
	let g = parseInt(String(e), 10);
	return g < 0 ? -g : g;
}
function getDateStr(e = "/", g = " ", _ = ":", v = "") {
	let y = /* @__PURE__ */ new Date();
	return String(y.getFullYear()) + e + String(100 + y.getMonth() + 1).slice(1, 3) + e + String(100 + y.getDate()).slice(1, 3) + g + String(100 + y.getHours()).slice(1, 3) + _ + String(100 + y.getMinutes()).slice(1, 3) + (v === "" ? "" : v + String(y.getMilliseconds()));
}
var css_key4del = "/* SKYNovel */";
function initStyle() {
	let e = document.getElementsByTagName("head")[0], g = e.children.length;
	for (let _ = g - 1; _ >= 0; --_) {
		let g = e.children[_];
		g instanceof HTMLStyleElement && g.innerText.startsWith(css_key4del) && e.removeChild(g);
	}
}
function addStyle(e) {
	let g = document.createElement("style");
	g.innerHTML = css_key4del + e, document.getElementsByTagName("head")[0].appendChild(g);
}
const EVNM_BUTTON = "pointerdown", EVNM_CLICK = "pointerdown", EVNM_KEY = "keydown", RPN_COMP_CHIN = "compChIn";
function argChk_Num(e, g, _) {
	let v = e[g];
	if (!(g in e)) {
		if (isNaN(_)) throw `[${e[":タグ名"] ?? ""}]属性 ${g} は必須です`;
		return e[g] = _, _;
	}
	let y = String(v).startsWith("0x") ? parseInt(v) : parseFloat(v);
	if (isNaN(y)) throw `[${e[":タグ名"] ?? ""}]属性 ${g} の値【${String(v)}】が数値ではありません`;
	return e[g] = y, y;
}
function argChk_Boolean(e, g, _) {
	if (!(g in e)) return e[g] = _, _;
	let v = e[g];
	if (v === null) return !1;
	let y = String(v);
	return e[g] = y === "false" ? !1 : !!y;
}
function parseColor(e) {
	if (e.startsWith("#")) return parseInt(e.slice(1), 16);
	let g = Number(e);
	if (!isNaN(g)) return g;
	if (e === "black") return 0;
	CmnLib.cc4ColorName.fillStyle = e;
	let _ = CmnLib.cc4ColorName.fillStyle;
	if (_ === "#000000") throw `色名前 ${e} が異常です`;
	return parseInt(_.slice(1), 16);
}
function argChk_Color(e, g, _) {
	let v = e[g];
	return v ? e[g] = parseColor(String(v)) : (e[g] = _, _);
}
var REG_ERRMES_JSON = /JSON at position (\d+)$/;
function mesErrJSON(e, g = "", _ = "") {
	let v = (REG_ERRMES_JSON.exec(_) ?? ["", ""])[1];
	return `[${e[":タグ名"] ?? ""}] ${g} 属性の解析エラー : ${_}
${String(e[g])}${v ? `
${"^".padStart(Number(v))}` : ""}`;
}
var REG_FN = /^[^/.]+$|[^/]+(?=\.)/;
function getFn(e) {
	return (REG_FN.exec(e) ?? [""])[0];
}
var CmnLib = class g {
	static async init() {
		let g = await import("./platform.js").then(__toDynamicImportESM());
		this.platform = JSON.stringify(g), this.plat_desc = g.description ?? "", this.isSafari = g.name === "Safari", this.isFirefox = g.name === "Firefox", this.isMac = (g.os?.family ?? "").includes("OS X"), this.isMobile = !/(Windows|OS X)/.test(g.os?.family ?? "");
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
		return "AudioContext" in globalThis ? (g.#e = new globalThis.AudioContext(), g.needClick2Play = () => g.#e.state === "suspended") : g.needClick2Play = () => !1, g.needClick2Play();
	}
	static #e;
	static isDarkMode = !1;
	static cc4ColorName;
};
export { RPN_COMP_CHIN as a, argChk_Color as c, getFn as d, initStyle as f, uint as g, parseColor as h, EVNM_KEY as i, argChk_Num as l, mesErrJSON as m, EVNM_BUTTON as n, addStyle as o, int as p, EVNM_CLICK as r, argChk_Boolean as s, CmnLib as t, getDateStr as u };

//# sourceMappingURL=CmnLib.js.map