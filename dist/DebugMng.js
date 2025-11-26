import { a as c, f as o } from "./web2.js";
class t {
  constructor(a, e, s) {
    this.sys = a, t.#s = s, t.#e = e, t.#r = e.title, t.myTrace = t.#i, e.log = (r) => this.#c(r), e.trace = (r) => this.#o(r), t.#t = document.createElement("span"), t.#t.hidden = !0, t.#t.textContent = "", t.#t.style.cssText = `	z-index: ${String(Number.MAX_SAFE_INTEGER)};
			position: absolute; left: 0; top: 0;
			color: black;
			background-color: rgba(255, 255, 255, 0.7);`, document.body.appendChild(t.#t);
  }
  static #s;
  static #e;
  static #r;
  static #t;
  destroy() {
    t.#r = () => !1, document.body.removeChild(t.#t), t.myTrace = t.trace_beforeNew;
  }
  // ログ出力
  #a = !0;
  #c(a) {
    let e = "";
    return this.#a && (this.#a = !1, e = `== ${c.plat_desc} ==
`), this.sys.appendFile(
      this.sys.path_downloads + "log.txt",
      `${e}--- ${o("-", "_", "")} [fn:${t.#s.scriptFn} line:${String(t.#s.lineNum)}] prj:${this.sys.arg.cur}
${a.text || `(text is ${String(a.text)})`}
`
    ), !1;
  }
  #o(a) {
    return t.myTrace(a.text || `(text is ${String(a.text)})`, "I"), !1;
  }
  // private禁止、galleryでエラーになる
  static trace_beforeNew = (a, e = "E") => {
    let s = `{${e}} ` + a, r = "";
    switch (e) {
      case "D":
        r = `color:#${c.isDarkMode ? "49F" : "05A"};`;
        break;
      case "W":
        r = "color:#FF8800;";
        break;
      case "F":
        r = "color:#BB0000;";
        break;
      case "ET":
        throw s;
      case "E":
        console.error("%c" + s, "color:#FF3300;");
        return;
      default:
        r = "color:black;", s = " " + s;
    }
    console.info("%c" + s, r);
  };
  static myTrace = t.trace_beforeNew;
  static strPos = () => t.#s.lineNum > 0 ? `(fn:${t.#s.scriptFn} line:${String(t.#s.lineNum)}) ` : "";
  static #i = (a, e = "E") => {
    let s = `{${e}} ` + t.strPos() + a;
    t.#l(s, e);
    let r = "";
    switch (e) {
      case "D":
        r = `color:#${c.isDarkMode ? "49F" : "05A"};`;
        break;
      case "W":
        r = "color:#F80;";
        break;
      case "F":
        r = "color:#B00;";
        break;
      case "ET":
      case "E":
        if (t.#r({ text: a }), this.#e.dump_lay({}), this.#e.dump_val({}), t.#s.dumpErrForeLine(), this.#e.dump_stack({}), e === "ET") throw s;
        console.error("%c" + s, "color:#F30;");
        return;
      default:
        r = "", s = " " + s;
    }
    console.info("%c" + s, r);
  };
  static #l = (a, e) => {
    let s = "";
    switch (e) {
      case "D":
        s = "color:#05A;";
        break;
      case "W":
        s = "color:#F80;";
        break;
      case "F":
        s = "color:#B00;";
        break;
      case "ET":
      case "E":
        s = "color:#F30;";
        break;
      default:
        s = "";
    }
    t.#t.innerHTML += `<span style='${s}'>${a}</span><br/>`, t.#t.hidden = !1;
  };
}
export {
  t as D
};
//# sourceMappingURL=DebugMng.js.map
