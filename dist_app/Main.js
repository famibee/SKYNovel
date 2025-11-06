import { C as S, a as w, S as C, b as L, p as M, A as R, d as P, D as $, e as O, s as G } from "./app2.js";
const B = "userdata:/", D = "downloads:/";
class b extends S {
  constructor(t) {
    super(t), this.sys = t;
  }
  static async generate(t) {
    const e = new b(t), s = t.arg.cur + "prj.json", n = await t.fetch(s);
    if (!n.ok) throw Error(n.statusText);
    const i = await t.dec(s, await n.text());
    return await e.load(JSON.parse(i)), e;
  }
  async load(t) {
    return t.window ??= { width: 300, height: 300 }, w.stageW = t.window.width, w.stageH = t.window.height, w.debugLog = t.debug.debugLog, await w.init(), super.load(t);
  }
  searchPath(t, e = C.DEFAULT) {
    return t.startsWith(D) ? this.sys.path_downloads + t.slice(11) : t.startsWith(B) ? this.sys.path_userdata + "storage/" + t.slice(10) : super.searchPath(t, e);
  }
}
function T(c, t, e = 0, s = 0, n = 0) {
  const a = c.slice(0, t).split(`
`), r = a.length;
  return {
    ln: s + r - 1,
    ch: r < 2 ? n + 1 + e + t : a.at(-1)?.length ?? 0
  };
}
class W {
  // 87 match 2725 step(0.5ms) PCRE2 https://regex101.com/r/aeN57J/1
  /*
  ;[^\n]*
  |	(?<key>[^\s="'#|;]+)
  	(?: \s | ;[^\n]*\n)*
  	=
  	(?: \s | ;[^\n]*\n)*
  	(?:	(?<val> [^\s"'#|;]+)
  	|	(["'#]) (?<val2>.*?) \3 )
  	(?: \|
  		(?: (?<def> [^\s"'#;]+)
  	|	(["'#]) (?<def2>.*?) \6 ) )?
  |	(?<literal>[^\s;]+)
  	*/
  #e = /;[^\n]*|(?<key>[^\s="'#|;]+)(?:\s|;[^\n]*\n)*=(?:\s|;[^\n]*\n)*(?:(?<val>[^\s"'#|;]+)|(["'#])(?<val2>.*?)\3)(?:\|(?:(?<def>[^\s"'#;]+)|(["'#])(?<def2>.*?)\6))?|(?<literal>[^\s;]+)/g;
  // 【属性 = 値 | 省略値】の分析
  parse(t) {
    this.#t = {}, this.#n = !1;
    for (const { groups: e } of t.matchAll(this.#e)) {
      const { key: s, val: n, val2: i, def: a, def2: r, literal: o } = e;
      s ? this.#t[s] = {
        val: n ?? i ?? "",
        def: a ?? r
      } : o && (o === "*" ? this.#n = !0 : this.#t[o] = { val: "1" });
    }
  }
  // 属性と値の位置をまとめて返す
  parseinDetail(t, e, s, n) {
    const i = {}, a = t.slice(1 + e, -1);
    for (const { groups: r, index: o, 0: u } of a.matchAll(this.#e)) {
      if (!o) continue;
      const { key: f, val: d, val2: _ = "", literal: l } = r;
      if (l) {
        if (l.endsWith("=")) {
          const m = l.length - 1, { ch: v } = T(a, o + m, e, s, n);
          i[l.slice(0, -1)] = {
            k_ln: s,
            k_ch: v - m,
            v_ln: s,
            v_ch: v + 1,
            //	v_ch: ch +1+lenNm +literal.length +1,
            v_len: 0
          };
        }
        continue;
      }
      if (!f) continue;
      const { ln: p, ch: g } = T(a, o, e, s, n), { ln: k, ch: h } = T(a, o + u.lastIndexOf(d ?? _) - (d ? 0 : 1), e, s, n);
      i[f] = { k_ln: p, k_ch: g, v_ln: k, v_ch: h, v_len: d ? d.length : _.length + 2 };
    }
    return i;
  }
  #t = {};
  get hPrm() {
    return this.#t;
  }
  #n = !1;
  get isKomeParam() {
    return this.#n;
  }
}
const E = /(?<name>[^\s;\]]+)/;
function A(c) {
  const e = E.exec(c.slice(1, -1))?.groups;
  if (!e) throw `タグ記述【${c}】異常です(タグ解析)`;
  const s = e.name;
  return [s, c.slice(1 + s.length, -1)];
}
function H(c) {
  const e = E.exec(c.slice(1))?.groups;
  if (!e) throw `タグ記述【${c}】異常です(タグ解析)`;
  return e.name;
}
function I(c) {
  const t = c.replaceAll("==", "＝").replaceAll("!=", "≠").split("="), e = t.length;
  if (e < 2 || e > 3) throw "「&計算」書式では「=」指定が一つか二つ必要です";
  const [s, n, i] = t;
  if (n.startsWith("&")) throw "「&計算」書式では「&」指定が不要です";
  return {
    name: s.replaceAll("＝", "==").replaceAll("≠", "!="),
    text: n.replaceAll("＝", "==").replaceAll("≠", "!="),
    cast: e === 3 ? i.trim() : void 0
  };
}
class V {
  constructor(t) {
    this.cfg = t, this.setEscape("");
  }
  #e;
  setEscape(t) {
    if (this.#s && t in this.#s) throw "[エスケープ文字] char【" + t + "】が登録済みの括弧マクロまたは一文字マクロです";
    this.#e = new RegExp(
      (t ? `\\${t}\\S|` : "") + // エスケープシーケンス
      `\\n+|\\t+|\\[let_ml\\s+[^\\]]+\\].+?(?=\\[endlet_ml[\\]\\s])|\\[(?:[^"'#;\\]]+|(["'#]).*?\\1|;[^\\n]*)*?]|;[^\\n]*|&[^&\\n]+&|&&?(?:[^"'#;\\n&]+|(["'#]).*?\\2)+|^\\*[^\\s\\[&;\\\\]+|[^\\n\\t\\[;${t ? `\\${t}` : ""}]+`,
      // 本文
      "gs"
    ), this.#t = new RegExp(`[\\w\\s;[\\]*=&｜《》${t ? `\\${t}` : ""}]`), this.#r = new RegExp(`[\\n\\t;\\[*&${t ? `\\${t}` : ""}]`);
  }
  // 括弧マクロの定義
  bracket2macro(t, e, s, n) {
    const { name: i, text: a } = t;
    if (!i) throw "[bracket2macro] nameは必須です";
    if (!a) throw "[bracket2macro] textは必須です";
    const r = a.at(0);
    if (!r) throw "[bracket2macro] textは必須です";
    if (a.length !== 2) throw "[bracket2macro] textは括弧の前後を示す二文字を指定してください";
    if (!(i in e)) throw `[bracket2macro] 未定義のタグ又はマクロ[${i}]です`;
    this.#s ??= {};
    const o = a.charAt(1);
    if (r in this.#s) throw "[bracket2macro] text【" + r + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (o in this.#s) throw "[bracket2macro] text【" + o + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (this.#t.test(r)) throw "[bracket2macro] text【" + r + "】は括弧マクロに使用できない文字です";
    if (this.#t.test(o)) throw "[bracket2macro] text【" + o + "】は括弧マクロに使用できない文字です";
    this.#s[o] = "0", this.#s[r] = `[${i} text=`, this.addC2M(`\\${r}[^\\${o}]*\\${o}`, `\\${r}\\${o}`), this.#u(s, n);
  }
  // 一文字マクロの定義
  char2macro(t, e, s, n) {
    const { char: i, name: a } = t;
    if (!i) throw "[char2macro] charは必須です";
    if (this.#s ??= {}, i in this.#s) throw "[char2macro] char【" + i + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (this.#t.test(i)) throw "[char2macro] char【" + i + "】は一文字マクロに使用できない文字です";
    if (!a) throw "[char2macro] nameは必須です";
    if (!(a in e)) throw `[char2macro] 未定義のタグ又はマクロ[${a}]です`;
    this.#s[i] = `[${a}]`, this.addC2M(`\\${i}`, `\\${i}`), this.#u(s, n);
  }
  #t;
  #n = new RegExp("");
  #a = "";
  #i = "";
  addC2M(t, e) {
    this.#a += `${t}|`, this.#i += e, this.#n = new RegExp(
      `(${this.#a}[^${this.#i}]+)`,
      "g"
    );
  }
  resolveScript(t) {
    const e = t.replaceAll(/\r\n?/g, `
`).match(this.#e)?.flatMap((n) => {
      if (!this.testTagLetml(n)) return n;
      const i = /^([^\]]+?])(.*)$/s.exec(n);
      if (!i) return n;
      const [, a, r] = i;
      return [a, r];
    }) ?? [], s = { aToken: e, len: e.length, aLNum: [] };
    return this.#u(s), this.#h(s), s;
  }
  #l = /^\[(call|loadplugin)\s/;
  #o = /\bfn\s*=\s*[^\s\]]+/;
  #h(t) {
    for (let e = t.len - 1; e >= 0; --e) {
      const s = t.aToken[e];
      if (!this.#l.test(s)) continue;
      const [n, i] = A(s);
      this.#c.parse(i);
      const a = this.#c.hPrm.fn;
      if (!a) continue;
      const { val: r } = a;
      if (!r.endsWith("*")) continue;
      t.aToken.splice(e, 1, "	", "; " + s), t.aLNum.splice(e, 1, NaN, NaN);
      const o = n === "loadplugin" ? C.CSS : C.SN, u = this.cfg.matchPath("^" + r.slice(0, -1) + ".*", o);
      for (const f of u) {
        const d = s.replace(
          this.#o,
          "fn=" + decodeURIComponent(L(f[o]))
        );
        t.aToken.splice(e, 0, d), t.aLNum.splice(e, 0, NaN);
      }
    }
    t.len = t.aToken.length;
  }
  #c = new W();
  testTagLetml(t) {
    return /^\[let_ml\s/.test(t);
  }
  testTagEndLetml(t) {
    return /^\[endlet_ml\s*]/.test(t);
  }
  #s = void 0;
  #r;
  #u(t, e = 0) {
    if (this.#s) {
      for (let s = t.len - 1; s >= e; --s) {
        const n = t.aToken[s];
        if (this.testNoTxt(n.at(0) ?? `
`)) continue;
        const i = t.aLNum[s], a = n.match(this.#n);
        if (!a) continue;
        let r = 1;
        for (let o = a.length - 1; o >= 0; --o) {
          let u = a[o];
          const f = this.#s[u.at(0) ?? " "];
          f && (u = f + (f.endsWith("]") ? "" : `'${u.slice(1, -1)}']`)), t.aToken.splice(s, r, u), t.aLNum.splice(s, r, i), r = 0;
        }
      }
      t.len = t.aToken.length;
    }
  }
  testNoTxt(t) {
    return this.#r.test(t);
  }
  //4tst
}
const y = "skynovel";
class x {
  constructor(t) {
    this.sys = t;
  }
  static async generate(t) {
    G();
    const e = new x(t);
    return await e.#l().catch((s) => console.error("Main.generate err e:%o", s)), e;
  }
  cvs;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  #e = /* @__PURE__ */ Object.create(null);
  // タグ処理辞書
  #t;
  #n;
  #a;
  #i = [];
  async #l() {
    const t = await b.generate(this.sys);
    this.sys.setMain(this, t);
    const e = {
      width: t.oCfg.window.width,
      height: t.oCfg.window.height,
      backgroundColor: M(String(t.oCfg.init.bg_color)),
      // このString()は後方互換性のため必須
      resolution: globalThis.devicePixelRatio
    }, s = document.getElementById(y);
    if (s) {
      const h = s.cloneNode(!0);
      h.id = y, e.view = s;
      const m = s.parentNode;
      this.#i.unshift(() => m.appendChild(h));
    } else {
      const h = document.createElement("canvas");
      h.id = y, e.view = h, document.body.appendChild(h), this.#i.unshift(() => document.body.removeChild(h));
    }
    const n = new R(e);
    this.#i.unshift(() => {
      P(), this.sys.destroy(), n.destroy(!1);
    }), this.cvs = n.view, this.cvs.id = y + "_act", s || document.body.appendChild(this.cvs);
    const i = document.createElement("canvas").getContext("2d");
    if (!i) throw "#init cc err";
    w.cc4ColorName = i;
    const [{ Variable: a }, { PropParser: r }, { SoundMng: o }, { ScriptIterator: u }, { LayerMng: f }, { EventMng: d }, { Button: _ }] = await Promise.all([
      import("./Variable.js"),
      import("./PropParser.js"),
      import("./SoundMng.js"),
      import("./ScriptIterator.js"),
      import("./LayerMng.js"),
      import("./EventMng.js"),
      import("./Button.js")
    ]);
    _.init(t);
    const l = new a(this.sys, t, this.#e), p = new r(l, t.oCfg.init.escape);
    this.#o = (h, m, v, N) => l.setVal_Nochk(h, m, v, N), this.#s = (h) => p.getValAmpersand(h), this.#r = (h) => p.parse(h), await Promise.allSettled(this.sys.init(this.#e, n, l));
    const g = new o(t, this.#e, l, this, this.sys);
    this.#i.unshift(() => g.destroy()), this.#t = new u(t, this.#e, this, l, p, g, this.sys), this.#i.unshift(() => this.#t.destroy());
    const k = new $(this.sys, this.#e, this.#t);
    this.#i.unshift(() => k.destroy()), this.errScript = (h, m = !0) => {
      if (this.stop(), $.myTrace(h), w.debugLog && console.log("🍜 SKYNovel err!"), m) throw h;
    }, this.#n = new f(t, this.#e, n, l, this, this.#t, this.sys, g, p), this.#i.unshift(() => this.#n.destroy()), this.#a = new d(t, this.#e, n, this, this.#n, l, g, this.#t, this.sys), this.#i.unshift(() => this.#a.destroy()), this.#i.unshift(() => {
      this.stop(), this.#h = !1;
      const h = () => !0;
      for (const m in this.#e) this.#e[m] = h;
    });
  }
  destroy() {
    this.resume = this.destroy = () => {
    }, this.cvs.parentElement?.removeChild(this.cvs);
    for (const t of this.#i) t();
    this.#i = [];
  }
  errScript = (t, e = !0) => {
  };
  resumeByJumpOrCall(t) {
    if (t.url) {
      this.#e.navigate_to(t), this.#t.jumpJustBefore();
      return;
    }
    if (this.#o("tmp", "sn.eventArg", String(t.arg ?? "")), this.#o("tmp", "sn.eventLabel", t.label ?? ""), O(t, "call", !1)) {
      if (this.#t.subIdxToken(), this.#e.call(t)) return;
    } else if (this.#e.clear_event({}), this.#e.jump(t)) return;
    this.resume();
  }
  #o = (t, e, s, n = !1) => {
  };
  resume() {
    this.#n.clearBreak(), this.#t.noticeBreak(!1), this.#a.hideHint(), queueMicrotask(() => {
      this.#c();
    });
  }
  stop = () => {
    this.#t.noticeBreak(!0);
  };
  setLoop(t, e = "") {
    (this.#h = t) ? this.resume() : this.stop(), this.sys.setTitleInfo(e ? ` -- ${e}中` : "");
  }
  // oxlint-disable-next-line no-unused-private-class-members
  #h = !0;
  //MARK: メイン処理（シナリオ解析）
  async #c() {
    let t = "";
    try {
      for (; this.#h; ) {
        let e = this.#t.nextToken();
        if (!e) return;
        const s = e.charCodeAt(0);
        if (s === 9) continue;
        if (s === 10) {
          this.#t.addLineNum(e.length);
          continue;
        }
        if (s === 91) {
          if (t = "タグ開始", this.#t.isBreak(e)) return;
          const [i, a] = A(e);
          t = `[${i}]例外`;
          const r = (e.match(/\n/g) ?? []).length;
          if (r > 0 && this.#t.addLineNum(r), await this.#t.タグ解析(
            i,
            a
          )) {
            this.stop();
            return;
          }
          continue;
        }
        if (s === 38) {
          if (!e.endsWith("&")) {
            if (t = "変数計算", this.#t.isBreak(e)) return;
            const i = I(e.slice(1));
            i.name = this.#s(i.name), i.text = String(this.#r(i.text)), this.#e.let(i);
            continue;
          }
          if (t = "変数操作", e.charAt(1) === "&") throw new Error("「&表示&」書式では「&」指定が不要です");
          e = String(this.#r(e.slice(1, -1)));
        } else {
          if (s === 59) continue;
          if (s === 42 && e.length > 1) continue;
        }
        t = "文字表示", this.#n.setNormalChWait(), this.#n.currentTxtlayForeNeedErr.tagCh(e);
      }
    } catch (e) {
      this.errScript(`${t} ${e instanceof Error ? `mes=${e.message}(${e.name})` : String(e)}`, !1);
    }
  }
  #s = (t) => "";
  #r;
}
const K = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Main: x
}, Symbol.toStringTag, { value: "Module" }));
export {
  W as A,
  V as G,
  K as M,
  B as P,
  A as a,
  D as b,
  H as t
};
//# sourceMappingURL=Main.js.map
