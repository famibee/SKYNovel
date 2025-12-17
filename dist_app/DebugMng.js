import { t as CmnLib, u as getDateStr } from "./CmnLib.js";
var DebugMng = class n {
	static #e;
	static #t;
	static #n;
	static #r;
	constructor(e, t, r) {
		this.sys = e, n.#e = r, n.#t = t, n.#n = t.title, n.myTrace = n.#s, t.log = (e) => this.#a(e), t.trace = (e) => this.#o(e), n.#r = document.createElement("span"), n.#r.hidden = !0, n.#r.textContent = "", n.#r.style.cssText = `	z-index: ${String(2 ** 53 - 1)};
			position: absolute; left: 0; top: 0;
			color: black;
			background-color: rgba(255, 255, 255, 0.7);`, document.body.appendChild(n.#r);
	}
	destroy() {
		n.#n = () => !1, document.body.removeChild(n.#r), n.myTrace = n.trace_beforeNew;
	}
	#i = !0;
	#a(r) {
		let i = "";
		return this.#i && (this.#i = !1, i = `== ${CmnLib.plat_desc} ==\n`), this.sys.appendFile(this.sys.path_downloads + "log.txt", `${i}--- ${getDateStr("-", "_", "")} [fn:${n.#e.scriptFn} line:${String(n.#e.lineNum)}] prj:${this.sys.arg.cur}\n${r.text || `(text is ${String(r.text)})`}\n`), !1;
	}
	#o(e) {
		return n.myTrace(e.text || `(text is ${String(e.text)})`, "I"), !1;
	}
	static trace_beforeNew = (t, n = "E") => {
		let r = `{${n}} ` + t, i = "";
		switch (n) {
			case "D":
				i = `color:#${CmnLib.isDarkMode ? "49F" : "05A"};`;
				break;
			case "W":
				i = "color:#FF8800;";
				break;
			case "F":
				i = "color:#BB0000;";
				break;
			case "ET": throw r;
			case "E":
				console.error("%c" + r, "color:#FF3300;");
				return;
			default: i = "color:black;", r = " " + r;
		}
		console.info("%c" + r, i);
	};
	static myTrace = n.trace_beforeNew;
	static strPos = () => n.#e.lineNum > 0 ? `(fn:${n.#e.scriptFn} line:${String(n.#e.lineNum)}) ` : "";
	static #s = (t, r = "E") => {
		let i = `{${r}} ` + n.strPos() + t;
		n.#c(i, r);
		let a = "";
		switch (r) {
			case "D":
				a = `color:#${CmnLib.isDarkMode ? "49F" : "05A"};`;
				break;
			case "W":
				a = "color:#F80;";
				break;
			case "F":
				a = "color:#B00;";
				break;
			case "ET":
			case "E":
				if (n.#n({ text: t }), this.#t.dump_lay({}), this.#t.dump_val({}), n.#e.dumpErrForeLine(), this.#t.dump_stack({}), r === "ET") throw i;
				console.error("%c" + i, "color:#F30;");
				return;
			default: a = "", i = " " + i;
		}
		console.info("%c" + i, a);
	};
	static #c = (e, t) => {
		let r = "";
		switch (t) {
			case "D":
				r = "color:#05A;";
				break;
			case "W":
				r = "color:#F80;";
				break;
			case "F":
				r = "color:#B00;";
				break;
			case "ET":
			case "E":
				r = "color:#F30;";
				break;
			default: r = "";
		}
		n.#r.innerHTML += `<span style='${r}'>${e}</span><br/>`, n.#r.hidden = !1;
	};
};
export { DebugMng as t };

//# sourceMappingURL=DebugMng.js.map