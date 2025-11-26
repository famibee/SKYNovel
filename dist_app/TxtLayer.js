import { e as F, k as v, y as lt, D as K, o as T, a as j, R as A, G as B, x as G, N as X, z as tt, O as rt, w as V, S as et, u as O, r as ot } from "./app2.js";
import { C as ct } from "./CmnTween.js";
import { S as I } from "./SpritesMng.js";
import { a as W, T as dt } from "./Reading.js";
import { R as st } from "./RubySpliter.js";
import { Button as pt } from "./Button.js";
const H = "、。，．）］｝〉」』】〕”〟ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ！？!?‼⁉・ーゝゞヽヾ々", U = "［（｛〈「『【〔“〝", q = "─‥…", Y = H, it = new RegExp(`[${H}]`), ft = new RegExp(`[${U}]`), ut = new RegExp(`[${q}]`), gt = it;
class _t {
  #c = H;
  #n = U;
  #r = q;
  #a = Y;
  get 行頭禁則() {
    return this.#c;
  }
  get 行末禁則() {
    return this.#n;
  }
  get 分割禁止() {
    return this.#r;
  }
  get ぶら下げ() {
    return this.#a;
  }
  #e = it;
  #h = ft;
  #d = ut;
  #k = gt;
  break_fixed = !1;
  break_fixed_left = 0;
  break_fixed_top = 0;
  bura = !1;
  lay(t) {
    t.kinsoku_sol && (this.#c = t.kinsoku_sol, this.#e = new RegExp(`[${this.#c}]`)), t.kinsoku_eol && (this.#n = t.kinsoku_eol, this.#l(), this.#h = new RegExp(`[${this.#n}]`)), t.kinsoku_dns && (this.#r = t.kinsoku_dns, this.#y(), this.#d = new RegExp(`[${this.#r}]`)), t.kinsoku_bura && (this.#a = t.kinsoku_bura, this.#l(), this.#y(), this.#k = new RegExp(`[${this.#a}]`)), "bura" in t && (this.bura = F(t, "bura", !1)), this.break_fixed = F(t, "break_fixed", this.break_fixed), this.break_fixed_left = v(t, "break_fixed_left", this.break_fixed_left), this.break_fixed_top = v(t, "break_fixed_top", this.break_fixed_top);
  }
  // 禁則の競合（ぶら下げ と 行末禁則 の両方に含まれる文字があってはならない）
  #l() {
    const t = this.#n.length, e = this.#a.length;
    if (t < e)
      for (let s = 0; s < t; ++s) {
        const i = this.#n[s];
        if (this.#a.includes(i)) throw `禁則の競合があります。文字 ${String(i)} がぶら下げ と 行末禁則 の両方に含まれます`;
      }
    else
      for (let s = 0; s < e; ++s) {
        const i = this.#a[s];
        if (this.#n.includes(i)) throw `禁則の競合があります。文字 ${String(i)} がぶら下げ と 行末禁則 の両方に含まれます`;
      }
  }
  // 禁則の競合（ぶら下げ と 分割禁止 の両方に含まれる文字があってはならない）
  #y() {
    const t = this.#r.length, e = this.#a.length;
    if (t < e)
      for (let s = 0; s < t; ++s) {
        const i = this.#r[s];
        if (this.#a.includes(i)) throw `禁則の競合があります。文字 ${String(i)} がぶら下げ と 分割禁止 の両方に含まれます`;
      }
    else
      for (let s = 0; s < e; ++s) {
        const i = this.#a[s];
        if (this.#r.includes(i)) throw `禁則の競合があります。文字 ${String(i)} がぶら下げ と 分割禁止 の両方に含まれます`;
      }
  }
  reNew(t) {
    t.#t(this.#c, this.#n, this.#r, this.#a), t.break_fixed = this.break_fixed, t.break_fixed_left = this.break_fixed_left, t.break_fixed_top = this.break_fixed_top, t.bura = this.bura;
  }
  #t(t, e, s, i) {
    this.#c !== t && (this.#c = t, this.#e = new RegExp(`[${t}]`)), this.#n !== e && (this.#n = e, this.#h = new RegExp(`[${e}]`)), this.#r !== s && (this.#r = s, this.#d = new RegExp(`[${s}]`)), this.#a !== i && (this.#a = i, this.#k = new RegExp(`[${i}]`));
  }
  record() {
    const t = {
      break_fixed: this.break_fixed,
      break_fixed_left: this.break_fixed_left,
      break_fixed_top: this.break_fixed_top,
      bura: this.bura
    };
    return this.#c === H && (t.行頭禁則 = this.#c), this.#n === U && (t.行末禁則 = this.#n), this.#r === q && (t.分割禁止 = this.#r), this.#a === Y && (t.ぶら下げ = this.#a), t;
  }
  playback(t) {
    t && (this.#t(
      t.行頭禁則 ?? H,
      t.行末禁則 ?? U,
      t.分割禁止 ?? q,
      t.ぶら下げ ?? Y
    ), this.break_fixed = t.break_fixed, this.break_fixed_left = t.break_fixed_left, this.break_fixed_top = t.break_fixed_top, this.bura = t.bura);
  }
  hyph(t, e, s, i, a) {
    let n, l = 0, h = 2, r = (b) => (r = () => !1, i === b ? (i > 0 && (t.innerHTML = a.replaceAll('class="sn_ch"', 'class="sn_ch sn_ch_in_default"')), !0) : b < 2);
    do {
      if (n = this.#g(t, e), l = n.length, r(l)) break;
      let b = -1 / 0;
      for (; h < l; ++h) {
        const { elm: _, rect: w, ch: E } = n[h];
        if (_.tagName === "RT") continue;
        const x = s ? w.y : w.x;
        if (b <= x || _.previousElementSibling?.tagName === "SPAN" && _.previousElementSibling?.innerHTML.includes("<br>") || _.parentElement?.previousElementSibling?.tagName === "SPAN" && _.parentElement?.previousElementSibling?.innerHTML.includes("<br>")) {
          b = x, this.break_fixed || (this.break_fixed_left = w.x, this.break_fixed_top = w.y);
          continue;
        }
        const u = this.#u(n, h), { elm: $, rect: S, ch: d } = n[u];
        if (!this.break_fixed) {
          this.break_fixed_left = S.x, this.break_fixed_top = S.y;
          const g = globalThis.getComputedStyle($), C = parseFloat(g.fontSize);
          s ? this.break_fixed_top += C : this.break_fixed_left += C;
        }
        b = -1 / 0;
        const o = h, { cont: m, ins: y } = this.bura ? this.hyph_alg_bura(n, u, d, h) : this.hyph_alg(n, u, d, h, E);
        if (h = y, m) continue;
        const R = n[h].elm, f = R.parentElement, p = document.createElement("br");
        if (f.classList.contains("sn_tx")) f.insertBefore(p, R);
        else {
          const g = f.parentElement;
          g.classList.contains("sn_ch") ? g.parentElement.insertBefore(p, g) : g.insertBefore(p, f);
        }
        h += 2, h < o && (h = o), l = -1;
        break;
      }
    } while (l < 0);
    return [n, l];
  }
  // 一つ前の要素を探す（ルビ対応）
  #u(t, e) {
    const s = e - 1, { elm: i } = t[s];
    return i.tagName !== "RT" ? s - (i.style.textCombineUpright === "all" ? Array.from(i.textContent).length - 1 : 0) : s - Array.from(i.textContent).length;
  }
  #g(t, e) {
    const s = [];
    if (t.nodeType !== t.TEXT_NODE) return Array.from(t.childNodes).map((l) => this.#g(l, e)).flat();
    const i = t.ownerDocument.createRange();
    i.selectNodeContents(t);
    let a = 0;
    const n = i.endOffset;
    for (; a < n; ) {
      i.setStart(t, a), i.setEnd(t, ++a);
      const l = i.toString();
      s.push({
        ch: l,
        rect: e(i, l),
        elm: i.startContainer.parentElement
      });
    }
    return i.detach(), s;
  }
  /**
   * 抽象化した禁則処理アルゴリズム
   * @method hyph_alg
   * @param {IChRect[]} a - 文章の抽象化配列
   * @param {number} p_i - 処理要素の一つ前の添字
   * @param {string} p_ch - 処理要素の一つ前の文字
   * @param {number} i - 処理要素の添字
   * @param {string} ch - 処理要素の文字
   * @return {Object} result 戻り値
   * @return {boolean} result.cont - true: 呼び元で改行挿入せず continue
   * @return {number} result.ins - 手前に改行を挿入すべき要素の添字
   */
  hyph_alg(t, e, s, i, a) {
    let n = i;
    if (!this.#h.test(s)) {
      if (this.#e.test(a))
        for (; (n = this.#u(t, n)) >= 0 && this.#e.test(t[n].ch); )
          ;
      else if (!(s === a && this.#d.test(s))) return { cont: !0, ins: n + 1 };
    }
    for (n = e; (n = this.#u(t, n)) >= 0 && this.#h.test(t[n].ch); )
      ;
    return { cont: !1, ins: n + 1 };
  }
  /**
   * 抽象化した禁則処理アルゴリズム
   * @method hyph_alg
   * @param {IChRect[]} a - 文章の抽象化配列
   * @param {number} p_i - 処理要素の一つ前の添字
   * @param {string} p_ch - 処理要素の一つ前の文字
   * @param {number} i - 処理要素の添字
   * @return {Object} result 戻り値
   * @return {boolean} result.cont - true: 呼び元で改行挿入せず continue
   * @return {number} result.ins - 手前に改行を挿入すべき要素の添字
   */
  hyph_alg_bura(t, e, s, i) {
    const a = this.#u(t, e), { ch: n } = t[a];
    if (this.#k.test(n) || this.#e.test(n)) {
      let h = e;
      (this.#k.test(s) || this.#e.test(s)) && ++h;
      const r = this.#u(t, h), { ch: b } = t[r], { ch: _ } = t[h];
      if (b === _ && this.#d.test(_)) return { cont: !1, ins: r };
      if (!this.#h.test(b)) return { cont: !1, ins: h };
      h = r;
      do
        if (!this.#h.test(t[h].ch)) break;
      while ((h = this.#u(t, h)) >= 0);
      return { cont: !1, ins: h + 1 };
    }
    const l = this.#u(t, a);
    if (i >= 3) {
      const { ch: h } = t[l];
      if (this.#d.test(n) && h === n)
        return { cont: !1, ins: l };
      if (this.#h.test(h)) {
        let r = l;
        for (; (r = this.#u(t, r)) >= 0 && this.#h.test(t[r].ch); )
          ;
        return { cont: !1, ins: r + 1 };
      }
    }
    return { cont: !1, ins: a };
  }
}
function yt(Q, t, e, s, i, a = !0) {
  const n = {
    escape: (d) => d.replaceAll(/([.*+?^${}()|[\]/\\])/g, "\\$1"),
    mimeType: (d) => {
      const o = _(d).toLowerCase();
      return l()[o] || "";
    },
    dataAsUrl: u,
    isDataUrl: w,
    resolveUrl: E,
    getAndEncode: x,
    asArray: (d) => {
      const o = [], m = d.length;
      for (let y = 0; y < m; ++y) o.push(d[y]);
      return o;
    }
  };
  function l() {
    const d = "application/font-woff", o = "image/jpeg";
    return {
      woff: d,
      woff2: d,
      ttf: "application/font-truetype",
      eot: "application/vnd.ms-fontobject",
      png: "image/png",
      jpg: o,
      jpeg: o,
      gif: "image/gif",
      tiff: "image/tiff",
      svg: "image/svg+xml"
    };
  }
  const h = $(), r = S();
  function b(d) {
    return r.resolveAll().then((o) => {
      const m = document.createElement("style");
      return d.appendChild(m), m.appendChild(document.createTextNode(o)), d;
    });
  }
  function _(d) {
    return /\.([^./]*?)$/g.exec(d)?.[1] ?? "";
  }
  function w(d) {
    return d.search(/^(data:)/) !== -1;
  }
  function E(d, o) {
    const m = document.implementation.createHTMLDocument(), y = m.createElement("base");
    m.head.appendChild(y);
    const R = m.createElement("a");
    return m.body.appendChild(R), y.href = o, R.href = d, R.href;
  }
  function x(d) {
    return new Promise(function(m) {
      const y = new XMLHttpRequest();
      y.onreadystatechange = R, y.ontimeout = f, y.responseType = "blob", y.timeout = 3e4, y.open("GET", d, !0), y.send();
      function R() {
        if (y.readyState !== 4) return;
        if (y.status !== 200) {
          p("cannot fetch resource: " + d + ", status: " + y.status);
          return;
        }
        const g = new FileReader();
        g.onloadend = function() {
          const C = g.result.toString().split(/,/)[1];
          m(C);
        }, g.readAsDataURL(y.response);
      }
      function f() {
        p("timeout of 30000ms occured while fetching resource: " + d);
      }
      function p(g) {
        console.error(g), m("");
      }
    });
  }
  function u(d, o) {
    return "data:" + o + ";base64," + d;
  }
  function $() {
    const d = /url\(['"]?([^'"]+?)['"]?\)/g;
    return {
      inlineAll: R,
      shouldProcess: o
    };
    function o(f) {
      return f.search(d) !== -1;
    }
    function m(f) {
      const p = [];
      let g;
      for (; g = d.exec(f); )
        p.push(g[1]);
      return p.filter(function(C) {
        return !n.isDataUrl(C);
      });
    }
    function y(f, p, g, C) {
      return Promise.resolve(p).then((N) => g ? n.resolveUrl(N, g) : N).then(C || n.getAndEncode).then((N) => n.dataAsUrl(N, n.mimeType(p))).then((N) => f.replace(M(p), "$1" + N + "$3"));
      function M(N) {
        return new RegExp(`(url\\(['"]?)(` + n.escape(N) + `)(['"]?\\))`, "g");
      }
    }
    function R(f, p, g) {
      if (C()) return Promise.resolve(f);
      return Promise.resolve(f).then(m).then((M) => {
        let N = Promise.resolve(f);
        for (const P of M) N = N.then((J) => y(J, P, p, g));
        return N;
      });
      function C() {
        return !o(f);
      }
    }
  }
  function S() {
    return {
      resolveAll: d,
      impl: { readAll: o }
    };
    function d() {
      return o().then((m) => Promise.allSettled(
        m.map((y) => y.resolve())
      )).then((m) => m.join(`
`));
    }
    function o() {
      return Promise.resolve(n.asArray(document.styleSheets)).then(y).then(m).then((f) => f.map(R));
      function m(f) {
        return f.filter((p) => p.type === CSSRule.FONT_FACE_RULE).filter((p) => h.shouldProcess(p.style.getPropertyValue("src")));
      }
      function y(f) {
        const p = [];
        for (const g of f)
          try {
            if (g.href) continue;
            n.asArray(g.cssRules || []).forEach(p.push.bind(p));
          } catch (C) {
            console.error("Error while reading CSS rules from " + g.href, String(C));
          }
        return p;
      }
      function R(f) {
        return {
          resolve: function() {
            const g = (f.parentStyleSheet || {}).href;
            return h.inlineAll(f.cssText, g);
          },
          src() {
            return f.style.getPropertyValue("src");
          }
        };
      }
    }
  }
  Promise.resolve(t).then((d) => {
    const o = d.cloneNode(!0);
    return o.style.padding = "0px", o.style.paddingRight = s + "px", o.style.paddingTop = i + "px", o.style.left = "0px", o.style.top = "0px", o.style.width = e.$width - e.pad_left - e.pad_right + "px", o.style.height = e.$height - e.pad_top - e.pad_bottom + "px", t.hidden = a, o;
  }).then(b).then((d) => {
    d.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
    const o = new Image();
    return o.src = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${String(e.$width)}px" height="${String(e.$height)}px"><foreignObject x="0" y="0" width="100%" height="100%">${new XMLSerializer().serializeToString(d).replaceAll("#", "%23").replaceAll(`
`, "%0A")}</foreignObject></svg>`, new Promise((m) => {
      o.onload = () => m(o);
    });
  }).then((d) => new Promise((o) => setTimeout(() => o(d), 100))).then((d) => {
    const o = document.createElement("canvas");
    o.width = e.$width, o.height = e.$height, o.getContext("2d").drawImage(d, 0, 0), Q(lt.from(o));
  }).catch((d) => K.myTrace(`goTxt() = ${String(d)}`));
}
class c extends T {
  constructor(t, e, s) {
    super(), this.ctn = t, this.canFocus = e, this.sys = s, this.#e.classList.add("sn_tx"), this.#e.style.position = "absolute", c.#n.view.parentElement.appendChild(this.#e), this.addChild(this.#h), this.addChild(this.#d), this.#d.name = "grpDbgMasume";
    const i = j.debugLog ? ({ ch: a, rect: { x: n, y: l, width: h, height: r } }) => console.log(`🍌 masume ch:${a} x:${String(n)} y:${String(l)} w:${String(h)} h:${String(r)}`) : () => {
    };
    this.#y = c.#c.oCfg.debug.masume ? (a) => {
      i(a);
      const { x: n, y: l, width: h, height: r } = a.rect;
      this.#d.beginFill(6737151, 0.5).lineStyle(2, 16724736, 1).drawRect(n, l, h, r).endFill();
    } : () => {
    }, this.noticeCompTxt = s.isApp && c.#c.oCfg.debug.dumpHtm ? () => {
      W.notifyEndProc(A);
      const a = this.#e.innerHTML;
      if (a === "") return;
      const { fn: n, ln: l } = c.#a.nowScrFnLn(), h = `dumpHtm ${t.name.slice(0, -7).replaceAll(":", "=")}(fn=${n} line=${String(l)})`;
      s.outputFile(
        s.path_downloads + h + ".htm",
        `<!doctype html><html><head><meta charset=utf-8><title>${h}</title>
<h1>${h}</h1>${a.replaceAll(/ class="sn_ch"|animation-delay: \d+ms; ?| data-add="{&quot;ch_in_style&quot;:&quot;default&quot;, &quot;ch_out_style&quot;:&quot;default&quot;}"/g, "").replaceAll(' style=""', "").replaceAll(/(<\/?ruby>)/g, `
$1
`).replaceAll(/<(br|\/span)>/g, `<$1>
`)}`
      );
    } : () => W.notifyEndProc(A);
  }
  static #c;
  static #n;
  static init(t, e) {
    c.#c = t, c.#n = e;
  }
  static #r;
  static #a;
  static setEvtMng(t, e) {
    c.#r = t, c.#a = e;
  }
  static destroy() {
    c.#$ = /* @__PURE__ */ Object.create(null), c.#v = /* @__PURE__ */ Object.create(null), c.delBreak();
  }
  #e = document.createElement("span");
  // サンプリング元
  #h = new T();
  // サンプリング先
  #d = new B();
  static #k = {
    "background-color": 0,
    "border-bottom-width": 0,
    "border-left-width": 0,
    "border-right-width": 0,
    "border-top-width": 0,
    "margin-bottom": 0,
    "margin-left": 0,
    "margin-right": 0,
    "margin-top": 0
  };
  #l = new _t();
  noticeCompTxt = () => {
  };
  #y;
  //	readonly	#idc	:TxtLayDesignCast;
  //	readonly	#idcCh	= new TxtLayPadDesignCast(this);
  #t = {
    fontsize: 24,
    $width: 0,
    // レイヤサイズであり、背景色（画像）サイズ
    $height: 0,
    pad_left: 0,
    // paddingLeft（レイヤサイズの内側のスペーサー）
    pad_right: 0,
    // paddingRight
    pad_top: 0,
    // paddingTop
    pad_bottom: 0
    // paddingBottom
  };
  lay(t) {
    const e = this.#e.style;
    if ("style" in t)
      if (t.style) {
        const s = document.createElement("span");
        s.style.cssText = t.style;
        const i = s.style.length;
        for (let a = 0; a < i; ++a) {
          const n = s.style[a];
          if (n in c.#k) {
            K.myTrace(`${String(n)}は指定できません`, "W");
            continue;
          }
          e[n] = s.style[n];
        }
        !s.style.opacity && "alpha" in t && (e.opacity = String(this.ctn.alpha));
      } else this.#e.style.cssText = "";
    else "alpha" in t && (e.opacity = String(this.ctn.alpha));
    if ("width" in t && (e.width = String(t.width ?? "0") + "px"), "height" in t && (e.height = String(t.height ?? "0") + "px"), "pl" in t && (e.paddingLeft = String(t.pl ?? "0") + "px"), "pr" in t && (e.paddingRight = String(t.pr ?? "0") + "px"), "pt" in t && (e.paddingTop = String(t.pt ?? "0") + "px"), "pb" in t && (e.paddingBottom = String(t.pb ?? "0") + "px"), this.#l.lay(t), this.#g(), this.#o = this.ctn.position.x, e.transformOrigin = `${String(this.ctn.pivot.x)}px ${String(this.ctn.pivot.y)}px`, this.cvsResize(), e.display = this.ctn.visible ? "inline" : "none", ":redraw" in t && this.#m > 0) {
      const s = [
        this.#e.innerHTML.replaceAll(/(animation-delay: )\d+ms/g, "$10ms"),
        `<span class='sn_ch' data-add='{"ch_in_style":"default"}'>&emsp;</span>`
      ];
      this.#H(), this.goTxt(s, !0);
    }
  }
  // oxlint-disable-next-line no-unused-private-class-members
  #u = 0;
  // 「g」などで下が欠ける問題対策
  #g() {
    const t = this.#e.style, e = parseFloat(t.fontSize || "0");
    this.#t.fontsize = e, this.#t.pad_left = parseFloat(t.paddingLeft || "0"), this.#t.pad_right = parseFloat(t.paddingRight || "0"), this.#t.pad_top = parseFloat(t.paddingTop || "0"), this.#t.pad_bottom = parseFloat(t.paddingBottom || "0"), this.#t.$width = parseFloat(t.width || "0"), this.#t.$height = parseFloat(t.height || "0"), this.position.set(this.#t.pad_left, this.#t.pad_top), this.#p = t.writingMode === "vertical-rl", this.#i = 0, this.#b = 0;
    const s = t.lineHeight ?? "0";
    this.#u = this.#p ? 0 : (s.endsWith("px") ? parseFloat(s) : e * parseFloat(s) - e) / 2;
  }
  cvsResize() {
    const t = this.#e.style, e = this.sys.cvsScale;
    t.left = `${String(this.sys.ofsLeft4elm + this.#o * e)}px`, t.top = `${String(this.sys.ofsTop4elm + this.ctn.position.y * e)}px`, t.transform = `rotate(${String(this.ctn.angle)}deg) scale(${String(this.ctn.scale.x * e)}, ${String(this.ctn.scale.y * e)})`;
  }
  #o = 0;
  #p = !1;
  get tategaki() {
    return this.#p;
  }
  #i = 0;
  #b = 0;
  get infTL() {
    return this.#t;
  }
  get getWidth() {
    return this.#t.$width;
  }
  get getHeight() {
    return this.#t.$height;
  }
  setMySize(t, e) {
    this.#t.$width = t, this.#t.$height = e, this.#e.style.width = String(this.#t.$width) + "px", this.#e.style.height = String(this.#t.$height) + "px";
  }
  #s = [];
  // FIFO実行バッファ
  goTxt(t, e) {
    const s = () => this.#_(t, e);
    this.#s.push(s) === 1 && s();
  }
  #F = [];
  #m = 0;
  static #U = "<span class='sn_ch sn_ch_last'>&emsp;</span>";
  #_(t, e) {
    c.#j.visible = !1;
    let s = this.#F.length, i = "";
    if (s === 0) {
      if (c.#c.oCfg.debug.masume && (j.debugLog && console.log(`🍌 masume ${this.name} v:${String(this.visible)} l:${String(this.x)} t:${String(this.y)} a:${String(this.alpha)} pl:${String(this.#t.pad_left)} pr:${String(this.#t.pad_right)} pt:${String(this.#t.pad_top)} pb:${String(this.#t.pad_bottom)} w:${String(this.#t.$width)} h:${String(this.#t.$height)}`), this.#d.clear().beginFill(3407616, 0.2).lineStyle(1, 3407616, 1).drawRect(-this.#t.pad_left, -this.#t.pad_top, this.#t.$width, this.#t.$height).endFill().beginFill(13311, 0.2).lineStyle(2, 13311, 1).drawRect(
        0,
        0,
        this.#t.$width - this.#t.pad_left - this.#t.pad_right,
        this.#t.$height - this.#t.pad_top - this.#t.pad_bottom
      ).endFill()), this.#e.innerHTML = [...t].join("").replaceAll(/[\n\t]/g, "") + c.#U, !this.#l.break_fixed) {
        const u = globalThis.getComputedStyle(this.#e), $ = parseFloat(u.fontSize);
        this.#p ? (this.#l.break_fixed_left = (this.#t.$width - this.#t.pad_left - this.#t.pad_right - $ * 1.5) * this.sys.cvsScale, this.#l.break_fixed_top = 0) : (this.#l.break_fixed_left = 0, this.#l.break_fixed_top = $ / 2 * this.sys.cvsScale);
      }
    } else
      i = this.#e.innerHTML, --s, this.#e.getElementsByClassName("sn_ch_last").item(0)?.remove(), this.#e.querySelectorAll(":scope > br").forEach((u) => u.remove()), this.#e.insertAdjacentHTML(
        "beforeend",
        t.slice(this.#m).join("").replaceAll(/[\n\t]/g, "") + c.#U
        // 末尾改行削除挙動対策
      );
    this.#e.querySelectorAll(".sn_ch:has(> ruby)").forEach((u) => {
      u.style.background = "";
    }), this.#m = t.length;
    const a = this.sys.cvsScale, n = this.#e.getBoundingClientRect(), l = n.left + this.#t.pad_left, h = n.top + this.#t.pad_top;
    let r;
    if (a === 1) r = (u, $) => {
      const S = u.getBoundingClientRect();
      return new X(
        S.left - l,
        S.top - h,
        S.width,
        S.height + ("gjqy".includes($) ? this.#u : 0)
      );
    };
    else {
      const u = this.sys.ofsPadLeft_Dom2PIXI + n.left * (1 - a), $ = this.sys.ofsPadTop_Dom2PIXI + n.top * (1 - a);
      r = (S, d) => {
        const o = S.getBoundingClientRect();
        return new X(
          (o.left - u) / a - l,
          (o.top - $) / a - h,
          o.width / a,
          (o.height + ("gjqy".includes(d) ? this.#u : 0)) / a
        );
      };
    }
    const [b, _] = this.#l.hyph(this.#e, r, this.#p, s, i);
    this.#F = b;
    const w = ct.ease(this.#C);
    for (let u = s; u < _; ++u) {
      const $ = this.#F[u], { elm: { dataset: S, parentElement: d }, rect: o } = $, m = JSON.parse(S.arg ?? '{"delay": 0}'), y = JSON.parse(S.add ?? "{}"), R = c.#$[y.ch_in_style];
      if (this.#y($), S.cmd === "grp") {
        const f = new T();
        this.#h.addChild(f), new I(m.pic, f, (p) => {
          this.#P(f, m, y, o, w, R ?? {}), f.parent || f.removeChild(p);
        });
      }
      if (S.lnk) {
        const f = d.closest("[data-arg]"), p = JSON.parse(f.dataset.arg ?? "{}");
        p.key = `lnk=[${String(u)}] ` + this.name;
        const g = new G();
        this.#P(g, p, y, o, w, R ?? {});
        const C = p.style ?? "", M = C + (p.style_hover ?? ""), N = C + (p.style_clicked ?? ""), P = p.r_style ?? "", J = P + (p.r_style_hover ?? ""), nt = P + (p.r_style_clicked ?? ""), Z = Array.from(f.getElementsByTagName("rt"));
        for (const z of Z) z.dataset.st_r_bk = z.style.cssText;
        const at = f.style.cssText, D = (z, ht) => {
          f.style.cssText = at + z;
          for (const L of Z) L.style.cssText = L.dataset.st_r_bk + ht;
        };
        F(p, "enabled", !0) ? c.#r.button(
          p,
          g,
          () => D(C, P),
          () => this.canFocus() ? (D(M, J), !0) : !1,
          () => D(N, nt)
        ) : D(
          C + (p.style_disable ?? "color: gray;"),
          P + (p.r_style_disable ?? "color: gray;")
        ), this.#h.addChild(g);
      }
    }
    const E = Array.from(this.#e.getElementsByClassName("sn_ch_yet"));
    this.#S = () => {
      this.#S = () => !1;
      for (const $ of E) $.className = "sn_ch";
      c.#j.position.set(
        this.#l.break_fixed_left,
        this.#l.break_fixed_top
      ), c.#j.visible = !0, this.noticeCompTxt();
      const u = this.#s.shift();
      return this.#s.length > 0 && u(), !0;
    };
    for (const u of E) u.className = u.className.replace("sn_ch_yet sn", "go");
    s > 0 && ++s;
    let x;
    for (let u = _ - 2; u >= 0; --u) {
      const { elm: $ } = this.#F[u];
      if ($.tagName === "SPAN") {
        x = $.parentElement?.tagName === "RUBY" ? $.parentElement.parentElement ?? $ : $;
        break;
      }
    }
    if (!x || e || s === _) {
      this.#S();
      return;
    }
    x.addEventListener("animationend", () => this.#S(), { once: !0 });
  }
  #S = () => !1;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #P(t, e, s, i, a, n) {
    t.alpha = 0, e.x && (i.x = e.x.startsWith("=") ? i.x + parseInt(e.x.slice(1)) : parseInt(e.x)), e.y && (i.y = e.y.startsWith("=") ? i.y + parseInt(e.y.slice(1)) : parseInt(e.y)), e.width && (i.width = parseInt(e.width)), e.height && (i.height = parseInt(e.height)), e.wait && (n.wait = e.wait), t.width = i.width, t.height = i.height, n.x ? t.position.set(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      n.x.startsWith("=") ? i.x + t.width * n.nx : n.nx,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      n.y.startsWith("=") ? i.y + t.height * n.ny : n.ny
    ) : t.position.set(i.x, i.y);
    const l = {
      sp: t,
      tw: new dt(t).to({ alpha: 1, x: i.x, y: i.y, width: i.width, height: i.height, angle: 0 }, n.wait ?? 0).easing(a).delay((s.wait ?? 0) + (e.delay ?? 0)).onComplete(() => {
        l.tw = void 0;
      }).start()
    };
    this.#O.push(l);
  }
  #O = [];
  skipChIn() {
    let t = this.#S();
    for (const e of this.#O)
      e.tw && (e.tw.stop().end(), t = !0);
    return this.#O = [], t;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  static #$ = /* @__PURE__ */ Object.create(null);
  static #I = /[{\s.,*{]/;
  // https://regex101.com/r/APC91I/1
  static initChStyle() {
    c.#$ = /* @__PURE__ */ Object.create(null), c.#v = /* @__PURE__ */ Object.create(null);
  }
  static getChInStyle(t) {
    return c.#$[t];
  }
  static ch_in_style(t) {
    const { name: e } = t;
    if (!e) throw "nameは必須です";
    if (c.#I.test(e)) throw `name【${e}】に使えない文字が含まれます`;
    if (e in c.#$) throw `name【${e}】はすでにあります`;
    const s = String(t.x ?? "=0"), i = String(t.y ?? "=0");
    return c.#$[e] = {
      wait: v(t, "wait", 500),
      // アニメ・FI時間
      alpha: v(t, "alpha", 0),
      x: s,
      // 初期x値
      y: i,
      // [tsy]と同様に絶対・相対指定可能
      // {x:500}			X位置を500に
      // {x:'=500'}		現在のX位置に+500加算した位置
      // {x:'=-500'}		現在のX位置に-500加算した位置
      // {x:'250,500'}	+250から＋500までの間でランダムな値をX位置に
      // {x:'=250,500'}	+250から＋500までの間でランダムな値を現在のX位置に加算
      nx: parseFloat(s.at(0) === "=" ? s.slice(1) : s),
      ny: parseFloat(i.at(0) === "=" ? i.slice(1) : i),
      scale_x: v(t, "scale_x", 1),
      scale_y: v(t, "scale_y", 1),
      rotate: v(t, "rotate", 0),
      join: F(t, "join", !0),
      // 文字を順番に出すか（true）同時か（false）
      ease: t.ease ?? "ease-out"
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  static #v = /* @__PURE__ */ Object.create(null);
  static getChOutStyle(t) {
    return c.#v[t];
  }
  static ch_out_style(t) {
    const { name: e } = t;
    if (!e) throw "nameは必須です";
    if (c.#I.test(e)) throw `name【${e}】に使えない文字が含まれます`;
    if (e in c.#v) throw `name【${e}】はすでにあります`;
    const s = String(t.x ?? "=0"), i = String(t.y ?? "=0");
    return c.#v[e] = {
      wait: v(t, "wait", 500),
      // アニメ・FI時間
      alpha: v(t, "alpha", 0),
      x: s,
      // 初期x値
      y: i,
      // [tsy]と同様に絶対・相対指定可能
      // {x:500}			X位置を500に
      // {x:'=500'}		現在のX位置に+500加算した位置
      // {x:'=-500'}		現在のX位置に-500加算した位置
      // {x:'250,500'}	+250から＋500までの間でランダムな値をX位置に
      // {x:'=250,500'}	+250から＋500までの間でランダムな値を現在のX位置に加算
      nx: parseFloat(s.at(0) === "=" ? s.slice(1) : s),
      ny: parseFloat(i.at(0) === "=" ? i.slice(1) : i),
      scale_x: v(t, "scale_x", 1),
      scale_y: v(t, "scale_y", 1),
      rotate: v(t, "rotate", 0),
      join: F(t, "join", !1),
      // 文字を順番に出すか（true）同時か（false）
      ease: t.ease ?? "ease-out"
    };
  }
  static #j = new T();
  static #W = new I();
  dispBreak(t) {
    c.delBreak();
    const e = c.#j;
    e.visible = !1, this.addChild(e), c.#W.destroy(), c.#W = new I(t.pic, e, (s) => {
      e.parent ? (s.x = v(t, "x", 0), s.y = v(t, "y", 0), s.width = v(t, "width", this.#t.fontsize), s.height = v(t, "height", this.#t.fontsize)) : e.removeChild(s);
    });
  }
  static delBreak() {
    const t = c.#j;
    t.parent?.removeChild(t), c.#W.destroy();
  }
  #C = "Quadratic.Out";
  #E = "Quadratic.Out";
  #H() {
    this.#d.clear(), this.#F = [], this.#m = 0, this.#s = [], this.skipChIn();
    const t = this.#e.cloneNode(!0);
    t.textContent = "";
    const e = this.#e, s = Array.from(e.getElementsByClassName("sn_ch"));
    e.parentElement.insertBefore(t, e);
    let i = 0;
    s.forEach((n) => {
      const l = JSON.parse(
        n.dataset.add ?? // 通常文字
        n.children[0]?.getAttribute("data-add") ?? // ルビ
        n.children[0]?.children[0]?.getAttribute("data-add") ?? "{}"
        // 縦中横
      );
      if (!l.ch_out_style) return;
      const h = c.#v[l.ch_out_style];
      if (h) {
        if (h.wait === 0) {
          n.style.display = "none";
          return;
        }
        i += h.wait, h.join || (n.style.animationDelay = "0ms"), n.classList.add(`go_ch_out_${String(l.ch_out_style)}`);
      }
    });
    const a = () => {
      e.parentElement.removeChild(e);
      for (const n of this.#h.removeChildren())
        n instanceof T && c.#r.unButton(n), n.destroy();
    };
    i === 0 ? (this.#e.textContent = "", a()) : e.lastElementChild?.addEventListener("animationend", a, { once: !0 }), this.#e = t;
  }
  reNew() {
    this.#H();
    const t = new c(this.ctn, () => this.canFocus(), this.sys);
    return t.#t = this.#t, t.#e.style.cssText = this.#e.style.cssText, t.#o = this.#o, t.name = this.name, t.#g(), t.#M = this.#M, t.#C = this.#C, t.#E = this.#E, this.#l.reNew(t.#l), this.destroy(), t;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #M = void 0;
  // 文字にかけるフィルター
  record() {
    return {
      infTL: this.#t,
      cssText: this.#e.style.cssText,
      left: this.#o,
      //		idc_hArg	: this.#idc.gethArg(),
      ch_filter: this.#M,
      fi_easing: this.#C,
      fo_easing: this.#E,
      hyph: this.#l.record()
    };
  }
  playback(t) {
    this.#t = t.infTL, this.position.set(this.#t.pad_left, this.#t.pad_top), this.#e.style.cssText = t.cssText, this.#o = t.left, this.#g(), this.#M = t.ch_filter, this.#C = t.fi_easing, this.#E = t.fo_easing, this.#l.playback(t.hyph);
  }
  get cssText() {
    return this.#e.style.cssText;
  }
  set cssText(t) {
    this.#e.style.cssText = t;
  }
  #f = void 0;
  snapshot(t, e) {
    yt((s) => {
      this.#f = G.from(s), this.#p && (this.#f.x += j.stageW - (this.#o + this.#t.$width)), this.#f.y -= this.#b, this.#f.texture.frame = new X(
        0,
        0,
        Math.min(this.#f.width, this.#t.$width - this.#o),
        Math.min(this.#f.height, this.#t.$height)
      ), this.#h.addChild(this.#f), t.render(this.#f, { clear: !1 }), e();
    }, this.#e, this.#t, this.#i, this.#b, !1);
  }
  snapshot_end() {
    this.#f && (this.#h.removeChild(this.#f), this.#f = void 0);
  }
  makeDesignCast(t) {
  }
  showDesignCast() {
  }
  //	showDesignCast() {this.#idc.visible = true; this.#idcCh.visible = true}
  dump() {
    const t = [], e = this.#e.style, s = e.length;
    for (let i = 0; i < s; ++i) {
      const a = e[i];
      t.push(`"${String(a)}":"${e[a].replaceAll(/(["\\])/g, "\\$1")}"`);
    }
    return `"txt":"${this.#e.textContent.replaceAll(/(["\\])/g, "\\$1")}", "style":{${t.join(",")}}`;
  }
  destroy() {
    c.delBreak(), this.#e.parentElement.removeChild(this.#e), this.removeChild(this.#h), this.removeChild(this.#d), super.destroy();
  }
}
class k extends tt {
  static #c;
  static #n;
  static #r;
  static #a;
  static init(t, e, s, i, a, n) {
    this.#c = t, c.init(t, n), this.#n = s, this.#a = i, this.#r = a, s.setDoRecProc((l) => this.chgDoRec(l)), e.autowc = (l) => this.#u(l), e.autowc({ enabled: !1, text: "", time: 0 }), e.ch_in_style = (l) => this.#e(l), e.ch_out_style = (l) => this.#h(l), c.initChStyle(), rt(), V(
      t.matchPath(".+", et.FONT).flatMap((l) => Object.values(l).map((h) => `
@font-face {
	font-family: '${String(h)}';
	src: url('${this.#c.searchPath(String(h), et.FONT)}');
}
`)).join("") + `
.sn_tx {
	pointer-events: none;
	user-select: none;
	-webkit-touch-callout: none;
	box-sizing: border-box;
}
.sn_ch {
	position: relative;
	display: inline-block;
}
`
      // 「sn_ch」と「sn_ch_in_〜」の中身が重複しているが、これは必須
    ), this.#e({
      name: "default",
      wait: 500,
      alpha: 0,
      x: "=0.3",
      y: "=0",
      scale_x: 1,
      scale_y: 1,
      rotate: 0,
      join: !0,
      ease: "ease-out"
    }), this.#h({
      name: "default",
      wait: 0,
      alpha: 0,
      x: "=0",
      y: "=0",
      scale_x: 1,
      scale_y: 1,
      rotate: 0,
      join: !1,
      ease: "ease-out"
    });
  }
  // 文字出現演出
  static #e(t) {
    const { x: e, y: s, nx: i, ny: a, alpha: n, wait: l, ease: h, rotate: r, scale_x: b, scale_y: _ } = c.ch_in_style(t), w = e.startsWith("=") ? `${String(i * 100)}%` : `${String(i)}px`, E = s.startsWith("=") ? `${String(a * 100)}%` : `${String(a)}px`, { name: x = "" } = t;
    return V(`
.sn_ch_in_${x} {
	position: relative;
	display: inline-block;
}
.go_ch_in_${x} {
	opacity: ${String(n)};
	position: relative;
	display: inline-block;
	animation: sn_ch_in_${x} ${String(l)}ms ${h} 0s both;
}
@keyframes sn_ch_in_${x} {
	from {transform: rotate(${String(r)}deg) scale(${String(b)}, ${String(_)}) translate(${w}, ${E})}
	to {opacity: 1; transform: none;}
}
`), !1;
  }
  // 文字消去演出
  static #h(t) {
    const { x: e, y: s, nx: i, ny: a, alpha: n, wait: l, ease: h, rotate: r, scale_x: b, scale_y: _ } = c.ch_out_style(t), w = e.startsWith("=") ? `${String(i * 100)}%` : `${String(i)}px`, E = s.startsWith("=") ? `${String(a * 100)}%` : `${String(a)}px`, { name: x = "" } = t;
    return V(`
.go_ch_out_${x} {
	position: relative;
	display: inline-block;
	animation: go_ch_out_${x} ${String(l)}ms ${h} 0s both;
}
@keyframes go_ch_out_${x} {
	to {
		opacity: ${String(n)};
		transform: rotate(${String(r)}deg) scale(${String(b)}, ${String(_)}) translate(${w}, ${E});
	}
`), !1;
  }
  static #d = 10;
  static set msecChWait(t) {
    k.#d = t;
  }
  static get msecChWait() {
    return k.#d;
  }
  static #k;
  static #l;
  static setEvtMng(t, e, s) {
    this.#k = t, this.#l = e, c.setEvtMng(t, s);
  }
  // 文字ごとのウェイト
  static #y = !1;
  static #t = {};
  static #u(t) {
    this.#y = F(t, "enabled", this.#y), this.#n.setVal_Nochk("save", "const.sn.autowc.enabled", this.#y);
    const { text: e } = t;
    if ("text" in t != "time" in t) throw "[autowc] textとtimeは同時指定必須です";
    if (this.#n.setVal_Nochk("save", "const.sn.autowc.text", e), !e)
      return this.#n.setVal_Nochk("save", "const.sn.autowc.time", ""), !1;
    const s = e.length;
    if (this.#y && s === 0) throw '[autowc] enabled === false かつ text === "" は許されません';
    const i = String(t.time).split(",");
    if (i.length !== s) throw "[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい";
    this.#t = {};
    for (let a = 0; a < s; ++a) this.#t[e[a]] = O(i[a]);
    return this.#n.setVal_Nochk("save", "const.sn.autowc.time", t.time), !1;
  }
  // バック
  #g = 0;
  #o = 0;
  #p = !1;
  #i = void 0;
  #b = "";
  // 背景画像無し（＝単色塗り）
  // 文字表示
  #s = new c(this.ctn, () => this.canFocus(), k.#l);
  #F = new st();
  #m = document.createElement("span");
  // cssチェック・保存用
  static #U = {
    "text-align": 0,
    "text-align-last": 0,
    height: 0,
    width: 0,
    "padding-left": 0,
    "padding-right": 0,
    "padding-top": 0,
    "padding-bottom": 0
  };
  #_ = new T();
  constructor() {
    super(), this.ctn.addChild(this.#s), this.#F.init(this.#Y), this.ctn.addChild(this.#_), this.#_.name = "cntBtn", this.lay({ style: `width: ${String(j.stageW)}px; height: ${String(j.stageH)}px; font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif; color: white; font-size: 24px; line-height: 1.5; padding: ${String(16)}px;`, in_style: "default", out_style: "default", back_clear: "true" });
  }
  destroy() {
    this.#i && (this.ctn.removeChild(this.#i).destroy(), this.#i = void 0), k.#a.pagebreak(), this.#s.destroy();
  }
  static destroy() {
    this.#y = !1, this.#t = {}, this.#f = (t) => t;
  }
  set name(t) {
    this.name_ = t, this.#s.name = t;
  }
  get name() {
    return this.name_;
  }
  // getは継承しないらしい
  cvsResize() {
    this.#s.cvsResize();
  }
  cvsResizeChildren() {
    for (const t of this.#_.children) t.cvsResize();
  }
  procSetX(t) {
    this.#s.lay({ x: t });
  }
  procSetY(t) {
    this.#s.lay({ y: t });
  }
  lay(t) {
    if (super.lay(t), tt.setXY(this.ctn, t, this.ctn), t[":id_tag"] = this.name_.slice(0, -7), st.setting(t), this.#W(t), this.#s.lay(t), "r_align" in t && (this.#x = t.r_align ?? ""), this.#z = j.isSafari ? this.#s.tategaki ? (i, a) => `text-align: start; height: ${String(a)}em; padding-top: ${i}; padding-bottom: ${i};` : (i, a) => `text-align: start; width: ${String(a)}em; padding-left: ${i}; padding-right: ${i};` : this.#s.tategaki ? (i) => `text-align: justify; text-align-last: justify; padding-top: ${i}; padding-bottom: ${i};` : (i) => `text-align: justify; text-align-last: justify; padding-left: ${i}; padding-right: ${i};`, j.isFirefox && (this.#q = this.#Z), "r_style" in t)
      if (t.r_style) {
        const i = document.createElement("span");
        i.style.cssText = t.r_style;
        const a = i.style.length, n = this.#m.style;
        for (let l = 0; l < a; ++l) {
          const h = i.style[l];
          if (h in k.#U) {
            K.myTrace(`${String(h)}は指定できません`, "W");
            continue;
          }
          const r = i.style[h];
          r && (n[h] = r);
        }
      } else this.#m.style.cssText = "";
    if ("alpha" in t) for (const i of this.#_.children) i.alpha = this.ctn.alpha;
    this.#S(t), this.#$(t);
    const e = W.procID + `TxtLayer lay name:${this.name_}`, s = this.#j(t, (i) => {
      i && W.endProc(e);
    });
    return s && W.beginProc(e), s;
  }
  #S(t) {
    const { in_style: e } = t;
    if (!e) return;
    const s = c.getChInStyle(e);
    if (!s) throw `存在しないin_style【${e}】です`;
    this.#P = e, this.#O = s.join;
  }
  #P = "";
  #O = !0;
  get width() {
    return this.#s.getWidth;
  }
  get height() {
    return this.#s.getHeight;
  }
  #$(t) {
    const { out_style: e } = t;
    if (!e) return;
    if (!c.getChOutStyle(e)) throw `存在しないout_style【${e}】です`;
    this.#I = e;
  }
  #I = "";
  #v = new I();
  #j(t, e) {
    if ("back_clear" in t)
      return F(t, "back_clear", !1) && (this.#g = 0, this.#o = 0, this.#p = !1, this.#b = ""), e(!1), !1;
    this.#o = v(t, "b_alpha", this.#o), this.#p = F(t, "b_alpha_isfixed", this.#p);
    const s = (this.#p ? 1 : Number(k.#n.getVal("sys:TextLayer.Back.Alpha"))) * this.#o;
    if (t.b_pic) {
      if (this.#b !== t.b_pic)
        return this.#b = t.b_pic, this.#i && (this.ctn.removeChild(this.#i), this.#i.destroy()), this.#v = new I(this.#b, this.ctn, (i) => {
          this.#i = i, i.name = "back(pic)", i.visible = s > 0, i.alpha = s, this.#s.setMySize(i.width, i.height), this.ctn.setChildIndex(i, 0), e(!0);
        }), this.#v.ret;
    } else "b_color" in t && (this.#g = ot(t, "b_color", 0), this.#i && (this.ctn.removeChild(this.#i), this.#i.destroy()), this.#b = "", this.ctn.addChildAt(
      (this.#i = new B()).beginFill(this.#g, s).lineStyle(void 0).drawRect(0, 0, this.#s.getWidth, this.#s.getHeight).endFill(),
      0
    ), this.#i.name = "back(color)");
    return this.#i && (this.#i.visible = s > 0, this.#i.alpha = s), e(!1), !1;
  }
  chgBackAlpha(t) {
    const e = this.#p ? this.#o : t * this.#o;
    this.#i instanceof B && (this.#i && (this.ctn.removeChild(this.#i), this.#i.destroy()), this.ctn.addChildAt(
      (this.#i = new B()).beginFill(this.#g, e).lineStyle(void 0).drawRect(0, 0, this.#s.getWidth, this.#s.getHeight).endFill(),
      0
    ), this.#i.name = "back(color)"), this.#i && (this.#i.visible = e > 0, this.#i.alpha = e);
  }
  #W(t) {
    "noffs" in t && (this.#H = t.noffs ?? "", this.#M = new RegExp(`[　${this.#H}]`)), "ffs" in t && (this.#C ??= "", this.#E = this.#C === "" ? () => "" : (e) => this.#M.test(e) ? "" : ` font-feature-settings: ${this.#C};`);
  }
  #C = "";
  #E = (t) => "";
  #H = "";
  // eslint-disable-next-line no-irregular-whitespace
  #M = /[　]/;
  // Safariが全体に「font-feature-settings」した後、特定文字の「font-feature-settings: initial;」を受け付けてくれないのでわざわざ一つずつ指定
  static chgDoRec(t) {
    this.#f = t ? (e) => e : (e) => `<span class='offrec'>${e}</span>`;
  }
  static #f = (t) => t;
  isCur = !1;
  #z = () => "";
  #q = (t, e, s, i = "") => {
    if (!s) return ` style='${i}'`;
    const a = t.length * 2;
    if (a - e.length < 0) return ` style='text-align: ${s}; ${i}'`;
    let n = "";
    switch (s) {
      case "justify":
        n = this.#z("0", a);
        break;
      case "121":
        n = this.#z(`calc(${String((a - e.length) / (e.length * 2))}em)`, a);
        break;
      case "even":
        n = this.#z(`calc(${String((a - e.length) / (e.length + 1))}em)`, a);
        break;
      case "1ruby":
        n = this.#z("1em", a);
        break;
      default:
        n = `text-align: ${s};`;
    }
    return ` style='${n} ${i}'`;
  };
  #x = "";
  #Z(t, e, s, i = "") {
    if (!s) return ` style='${i}'`;
    const a = t.length * 2;
    if (a - e.length < 0) return ` style='text-align: ${s}; ${i}'`;
    let n = "";
    switch (s) {
      case "left":
        n = "ruby-align: start;";
        break;
      case "center":
        n = "ruby-align: center;";
        break;
      case "right":
        n = "ruby-align: start;";
        break;
      case "justify":
        n = "ruby-align: space-between;";
        break;
      case "121":
        n = "ruby-align: space-around;";
        break;
      case "even":
        {
          const l = ` ${String((a - e.length) / (e.length + 1))}em;`;
          n = "ruby-align: space-between; " + (this.#s.tategaki ? `padding-top:${l} padding-bottom:${l}` : `padding-left:${l} padding-right:${l}`);
        }
        break;
      case "1ruby":
        n = "ruby-align: space-between; " + (this.#s.tategaki ? "padding-top: 1em; padding-bottom: 1em;" : "padding-left: 1em; padding-right: 1em;");
        break;
      default:
        n = `text-align: ${s};`;
    }
    return ` style='${n} ${i}'`;
  }
  tagCh(t) {
    this.#F.putTxt(t);
  }
  #w = !1;
  get needGoTxt() {
    return this.#w;
  }
  #Y = (t, e) => {
    let s = e;
    k.#c.oCfg.debug.putCh && console.log(`🖊 文字表示 text:\`${t}\`(${t.charCodeAt(0).toString(16)}) ruby:\`${s}\` name:\`${this.name_}\``);
    const i = s.split("｜");
    let a = "";
    const [n, ...l] = i, h = l.join("｜");
    switch (i.length) {
      case 1:
        if (this.#w = !0, t === `
`) {
          this.#T ? (this.#T = !1, a = "<ruby>&emsp;<rt>&emsp;</rt></ruby><br/>") : a = "<br/>";
          break;
        }
        this.#T && (this.#T = !1, s === "" && (s = "&emsp;")), a = this.#X(t, s, this.#x);
        break;
      default:
        switch (n) {
          // ルビ揃え指定と同時シリーズ
          case "start":
          // 初期値
          case "left":
          //（肩付き）先頭親文字から、ルビ間は密着
          case "center":
          //（中付き）センター合わせ、〃
          case "right":
          //（右／下揃え）末尾親文字から、〃
          case "justify":
          //（両端揃え）先頭から末尾親文字間に、ルビ間は均等にあける
          case "121":
          //（1-2-1(JIS)）ルビの前後を比率1、ルビ間を比率2であける
          case "even":
          //（均等アキ）ルビの前後、ルビ間も均等にあける
          case "1ruby":
            this.#T = !1, this.#w = !0, a = this.#X(t, h, n);
            break;
          case "gotxt":
            this.#V(), this.#w ? (this.isCur && k.#a.recText(
              this.#R.join("").replace(/^<ruby>&emsp;<rt>&emsp;<\/rt><\/ruby>(<br\/>)+/, "").replaceAll(/style='(anim\S+ [^;]+;\s*)+/g, "style='").replaceAll(/( style=''| data-(add|arg|cmd)='[^']+'|\n+|\t+)/g, "").replaceAll(/class='sn_ch[^']+/g, "class='sn_ch").replaceAll("display: none;", "").replaceAll("class='offrec'", "style='display: none;'")
            ), this.#s.goTxt(this.#R, this.#B === 0), this.#w = !1, this.#B = 0) : this.isCur && this.#s.noticeCompTxt();
            return;
          // breakではない
          case "add":
            {
              const r = JSON.parse(h), { style: b = "", wait: _ = null } = r, { cl: w, sty: E } = this.#D(!0, _ ? O(_) : null);
              this.#R.push(`<span${w} style='${E} display: inline; ${b}'>`), delete r.style, this.#K(r);
            }
            return;
          // breakではない
          case "add_close":
            this.#R.push("</span>"), this.#V();
            return;
          // breakではない
          case "grp":
            this.#w = !0;
            {
              const r = JSON.parse(h);
              if (r.id ??= String(this.#R.length), r.id === "break") {
                this.#s.dispBreak(r);
                return;
              }
              this.#T = !1, r.delay = this.#B, r.r ??= "", r.style ??= "", r.r_style ??= "";
              const { r: b, wait: _ = null, r_style: w } = r, { cl: E, sty: x, lnk: u } = this.#D(!0, _ ? O(_) : null);
              a = `<span${E} style='${x} ${r.style}'><ruby><span data-cmd='grp' data-arg='${JSON.stringify(r)}'${u} style='${x} display: inline;'>&emsp;</span><rt${u}${this.#q(
                "　",
                b,
                this.#x,
                this.#m.style.cssText + (this.#N.at(-1)?.o.r_style ?? "") + w
              )}>${r.r}</rt></ruby></span>`;
            }
            break;
          case "tcy":
            this.#T = !1, this.#w = !0;
            {
              const { t: r = "", r: b = "", wait: _ = null, style: w = "", r_style: E = "" } = JSON.parse(h);
              k.#n.doRecLog() && (this.#G += t + (s ? `《${s}》` : ""), this.#J += r);
              const x = j.isSafari ? b.replaceAll(/[A-Za-z0-9]/g, (d) => String.fromCharCode(d.charCodeAt(0) + 65248)) : b, { cl: u, sty: $, lnk: S } = this.#D(!0, _ ? O(_) : null);
              a = `<span${u} style='${$}${this.#E(r)} ${w}'><ruby><span${S} style='${$} display: inline; text-combine-upright: all;'>${r}</span><rt${S}${this.#q(
                r,
                x,
                this.#x,
                this.#m.style.cssText + (this.#N.at(-1)?.o.r_style ?? "") + E
              )}>${x}</rt></ruby></span>`;
            }
            break;
          case "del":
            c.delBreak();
            return;
          // breakではない
          case "span":
            this.#w = !0, this.#Q(JSON.parse(h));
            return;
          // breakではない
          case "link":
            this.#w = !0;
            {
              const r = JSON.parse(h);
              r[":link"] = " data-lnk='@'";
              const { cl: b, sty: _, curpos: w } = this.#D(!1, r.wait ? O(r.wait) : null);
              this.#R.push(`<span${b} style='${_} display: inline; ${r.style ?? ""}' ${w} data-arg='${h}'>`), delete r.style, this.#Q(r);
            }
            return;
          // breakではない
          case "endlink":
            this.#w = !0, this.#R.push("</span>"), this.#V();
            return;
          // breakではない
          default:
            this.#w = !0, a = this.#X(t, s, this.#x);
        }
        break;
    }
    this.#R.push(k.#f(a));
  };
  #X(t, e, s) {
    const i = t === " " ? "&nbsp;" : t === "　" ? "&emsp;" : t;
    k.#n.doRecLog() && (this.#G += i + (e ? `《${e}》` : ""), t !== " " && (this.#J += t));
    const { cl: a, sty: n, lnk: l } = this.#D(!0, null, t);
    return e ? `<span${a} style='${n} ${this.#E(t)}'><ruby>${// 文字個別に出現させるため以下にも ${cl} が必要
    Array.from(t).map((h, r) => `<span${a}${l} style='${r > 0 ? this.#D(!0, null, t).sty : n} display: inline;'>${h === " " ? "&nbsp;" : h === "　" ? "&emsp;" : h}</span>`).join("")}<rt${l}${this.#q(
      t,
      e,
      s,
      this.#m.style.cssText + (this.#N.at(-1)?.o.r_style ?? "")
    )}>${e}</rt></ruby></span>` : `<span${a} style='${n} ${this.#E(t)}'${l}>${i}</span>`;
  }
  #D(t, e, s = `
`) {
    const i = this.#O ? e ?? this.#N.at(0)?.o.wait ?? (k.#y ? k.#t[s.at(0) ?? ""] ?? 0 : k.msecChWait) : 0;
    k.#k.isSkipping ? this.#B = 0 : t && this.#O && (this.#B += O(i));
    const a = `data-add='{"ch_in_style":"${this.#P}", "ch_out_style":"${this.#I}"}'`;
    return {
      cl: ` class='sn_ch sn_ch_yet sn_ch_in_${this.#P}'`,
      // TxtStage.goTxt()はこれ単位で文字出現させる
      sty: `animation-delay: ${String(this.#B)}ms;${this.#N.at(-1)?.o.style ?? ""}`,
      // TxtStage.goTxt()はこれ単位で文字出現させる
      lnk: (this.#N.at(0)?.o[":link"] ?? "") + " " + a,
      curpos: a
    };
  }
  #B = 0;
  #T = !0;
  #R = [];
  #N = [];
  #K(t) {
    this.#N.push({
      o: t,
      r_align: this.#x,
      ch_in_style: this.#P,
      ch_out_style: this.#I
    }), t.r_align && (this.#x = t.r_align), this.#S(t), this.#$(t);
  }
  #V() {
    const t = this.#N.pop();
    t && (this.#x = t.r_align, this.#S({ in_style: t.ch_in_style }), this.#$({ out_style: t.ch_out_style }));
  }
  #Q(t) {
    const e = this.#N.at(-1);
    if (!e) {
      this.#K(t);
      return;
    }
    e.o = { ...e.o, ...t }, !t.style && !t.r_style && (e.o.style = "", e.o.r_style = ""), t.r_align && (this.#x = t.r_align), this.#S(t), this.#$(t);
  }
  click = () => !this.ctn.interactiveChildren || !this.ctn.visible ? !1 : this.#s.skipChIn();
  clearText() {
    this.ctn.addChild(this.#s = this.#s.reNew()), this.#B = 0, this.#T = !0, this.#R = [], this.#G = "", this.#J = "", k.#a.pagebreak();
  }
  #G = "";
  #J = "";
  get pageText() {
    return this.#G.replace("《&emsp;》", "");
  }
  get pagePlainText() {
    return this.#J;
  }
  get enabled() {
    return this.ctn.interactiveChildren;
  }
  set enabled(t) {
    this.ctn.interactiveChildren = t;
  }
  addButton = (t) => new Promise((e) => {
    t.key = `btn=[${String(this.#_.children.length)}] ` + this.name_, t[":id_tag"] = t.key.slice(0, -7), F(t, "hint_tate", this.#s.tategaki);
    const s = new pt(t, k.#k, () => e(), () => this.canFocus());
    s.name = JSON.stringify(t).replaceAll('"', "'"), this.#_.addChild(s);
  });
  canFocus() {
    return (this.ctn.interactiveChildren ?? !1) && this.ctn.visible && k.#r(this);
  }
  clearLay(t) {
    super.clearLay(t), this.clearText();
    for (const e of this.#_.removeChildren()) e.destroy();
  }
  record = () => ({
    ...super.record(),
    enabled: this.enabled,
    r_cssText: this.#m.style.cssText,
    r_align: this.#x,
    // バック
    b_do: this.#i === void 0 ? void 0 : this.#i instanceof G ? "Sprite" : "Graphics",
    b_pic: this.#b,
    b_color: this.#g,
    b_alpha: this.#o,
    b_alpha_isfixed: this.#p,
    ffs: this.#C,
    txs: this.#s.record(),
    strNoFFS: this.#H,
    btns: this.#_.children.map((t) => t.name)
  });
  playback(t, e) {
    super.playback(t, e), this.enabled = t.enabled, this.#m.style.cssText = t.r_cssText, this.#x = t.r_align, this.cvsResize(), this.#W(t), this.#s.playback(t.txs), this.#o = t.b_alpha, this.#p = t.b_alpha_isfixed, e.push(
      new Promise((s) => {
        const i = t.b_do ? t.b_do === "Sprite" ? { b_pic: t.b_pic } : { b_color: t.b_color } : { b_pic: "" };
        i.b_alpha = t.b_alpha, i.b_alpha_isfixed = t.b_alpha_isfixed, this.#j(i, (a) => {
          a && s();
        }) || s();
      }),
      ...t.btns.map((s) => this.addButton(JSON.parse(s.replaceAll("'", '"')))).flat()
    );
  }
  get cssText() {
    return this.#s.cssText;
  }
  set cssText(t) {
    this.#s.cssText = t;
  }
  snapshot(t, e) {
    t.render(this.ctn, { clear: !1 }), this.#s.snapshot(t, e);
  }
  snapshot_end() {
    this.#s.snapshot_end();
  }
  makeDesignCast(t) {
    this.ctn.visible && this.#s.makeDesignCast(t);
  }
  makeDesignCastChildren(t) {
    if (this.ctn.visible)
      for (const e of this.#_.children) e.makeDesignCast(t);
  }
  showDesignCast() {
    this.#s.showDesignCast();
  }
  showDesignCastChildren() {
    for (const t of this.#_.children) t.showDesignCast();
  }
  dump() {
    return this.#Y("", "gotxt｜"), super.dump() + `, "enabled":"${String(this.enabled)}", ${this.#s.dump()}, "b_pic":"${this.#b}", "b_color":"${String(this.#g)}", "b_alpha":${String(this.#o)}, "b_alpha_isfixed":"${String(this.#p)}", "width":${String(this.#s.getWidth)}, "height":${String(this.#s.getHeight)}, "pixi_obj":[${this.ctn.children.map((t) => `{"class":"${t instanceof G ? "Sprite" : t instanceof B ? "Graphics" : t instanceof T ? "Container" : "?"}", "name":"${t.name}", "alpha":${String(t.alpha)}, "x":${String(t.x)}, "y":${String(t.y)}, "visible":"${String(t.visible)}"}`).join(",")}], "button":[${this.#_.children.map((t) => t.children[0]?.name ?? "{}").join(",")}]`;
  }
}
const Ct = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TxtLayer: k
}, Symbol.toStringTag, { value: "Module" }));
export {
  k as T,
  c as a,
  Ct as b
};
//# sourceMappingURL=TxtLayer.js.map
