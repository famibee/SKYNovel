import { e as g, S as H, L as F, n as B, l as x, a as _, p as M, G, q as U, E as A, f as tt, r as et, t as st, v as W, w as it, x as q, y as at, F as nt, u as O, z as J } from "./web2.js";
import { C as w, T as R } from "./CmnTween.js";
import { G as X, D as Y } from "./GrpLayer.js";
import { S as E } from "./SpritesMng.js";
import { T as N, a as rt } from "./TxtLayer.js";
import { R as ot } from "./RubySpliter.js";
import { P as ct, b as K } from "./Main.js";
import { a as C } from "./Reading.js";
import { Button as Q } from "./Button.js";
class I {
  constructor(t, e, s, i, n, o, r, c) {
    this.cls = e, this.hArg = n, this.sys = o, this.val = r, this.ret = c;
    const h = o.hFactoryCls[e];
    if (!h) throw `属性 class【${e}】が不正です`;
    const f = h(), l = h();
    f.layname = l.layname = t;
    const d = n[":id_tag"] = `layer:${t} cls:${e} page:`;
    f.ctn.name = f.name = d + "A", l.ctn.name = l.name = d + "B", s.addChild(f.ctn), i.addChild(l.ctn), g(n, "visible", !0), g(n, "visible", !0), c.isWait = f.lay(n) || l.lay(n), this.#e = { fore: f, back: l }, i.visible = !1;
    const u = `const.sn.lay.${t}`;
    r.setVal_Nochk("tmp", u, !0), r.defTmp(u + ".fore.alpha", () => this.#e.fore.alpha), r.defTmp(u + ".back.alpha", () => this.#e.back.alpha), r.defTmp(u + ".fore.height", () => this.#e.fore.height), r.defTmp(u + ".back.height", () => this.#e.back.height), r.defTmp(u + ".fore.visible", () => this.#e.fore.ctn.visible), r.defTmp(u + ".back.visible", () => this.#e.back.ctn.visible), r.defTmp(u + ".fore.width", () => this.#e.fore.width), r.defTmp(u + ".back.width", () => this.#e.back.width), r.defTmp(u + ".fore.x", () => this.#e.fore.x), r.defTmp(u + ".back.x", () => this.#e.back.x), r.defTmp(u + ".fore.y", () => this.#e.fore.y), r.defTmp(u + ".back.y", () => this.#e.back.y);
  }
  #e;
  destroy() {
    this.#e.fore.destroy(), this.#e.back.destroy();
  }
  lay = (t) => this.getPage(t).lay(t);
  getPage = (t) => I.argChk_page(t, "fore") !== "back" ? this.#e.fore : this.#e.back;
  static argChk_page(t, e) {
    const s = t.page ?? e;
    if (s === "fore" || s === "back")
      return t.page = s, s;
    throw Error("属性 page【" + s + "】が不正です");
  }
  get fore() {
    return this.#e.fore;
  }
  get back() {
    return this.#e.back;
  }
  transPage(t) {
    [this.#e.back, this.#e.fore] = [this.#e.fore, this.#e.back], this.#e.back.copy(this.#e.fore, t);
  }
}
class p {
  constructor(t, e, s) {
    this.appPixi = e, this.val = s, t.add_frame = (i) => this.#k(i), t.let_frame = (i) => this.#d(i), t.set_frame = (i) => this.#N(i), t.frame = (i) => this.#$(i), t.tsy_frame = (i) => this.#w(i);
  }
  static #e;
  static #t;
  static #i;
  static init(t, e, s) {
    p.#e = t, p.#t = e, p.#i = s;
  }
  #o;
  setEvtMng(t) {
    this.#o = t;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  #c = /* @__PURE__ */ Object.create(null);
  destroy() {
    for (const t of Object.values(this.#c)) t.parentElement.removeChild(t);
    this.#c = /* @__PURE__ */ Object.create(null);
  }
  hideAllFrame() {
    for (const [t, { style: e }] of Object.entries(this.#c))
      this.#l[t] = e.display !== "none", e.display = "none";
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  #l = /* @__PURE__ */ Object.create(null);
  restoreAllFrame() {
    for (const [t, e] of Object.entries(this.#l)) {
      const s = this.#c[t];
      s && (s.style.display = e ? "inline" : "none");
    }
    this.#l = /* @__PURE__ */ Object.create(null);
  }
  //	HTMLフレーム
  // フレーム追加
  #k(t) {
    const { id: e, src: s, alpha: i = 1, scale_x: n = 1, scale_y: o = 1, rotate: r = 0 } = t;
    if (!e) throw "idは必須です";
    if (!s) throw "srcは必須です";
    const c = "const.sn.frm." + e;
    if (this.val.getVal(`tmp:${c}`)) throw `frame【${e}】はすでにあります`;
    const h = g(t, "visible", !0), f = t.b_color ? ` background-color: ${t.b_color};` : "", l = this.#b(t);
    p.#i.cvs.insertAdjacentHTML("beforebegin", `<iframe id="${e}" style="opacity: ${String(i)}; ${f} position: absolute; left:${String(p.#t.ofsLeft4elm + l.x * p.#t.cvsScale)}px; top: ${String(p.#t.ofsTop4elm + l.y * p.#t.cvsScale)}px; z-index: 1; border: 0px; overflow: hidden; display: ${h ? "inline" : "none"}; transform: scale(${String(n)}, ${String(o)}) rotate(${String(r)}deg);" width="${String(l.width * p.#t.cvsScale)}" height="${String(l.height * p.#t.cvsScale)}"></iframe>`);
    const d = C.procID + `add_frame id:${e}`;
    C.beginProc(d);
    const u = p.#e.searchPath(s, H.HTML), a = new F().add({ name: s, url: u, xhrType: B.XHR_RESPONSE_TYPE.TEXT });
    return p.#t.arg.crypto && a.use(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      (b, k) => void p.#t.dec(b.extension, b.data).then((v) => {
        b.data = v, k();
      }).catch((v) => {
        p.#i.errScript(`[add_frame]Html ロード失敗です src:${b.name} ${String(v)}`, !1), k();
      })
    ), a.load((b, k) => {
      const v = document.getElementById(e);
      this.#c[e] = v, this.#y[e] = !1;
      const S = u.lastIndexOf("/") + 1, V = u.slice(0, S), m = V.slice(0, S);
      v.srcdoc = String(k[s]?.data).replace("sn_repRes();", "").replaceAll(
        /\s(?:src|href)=(["'])(\S+?)\1/g,
        // 【\s】が大事、data-src弾く
        (y, $, T) => T.startsWith("../") ? m + y.slice(3) : y.replace("./", "").replace($, $ + V)
      ), v.srcdoc.includes("true/*WEBP*/;") && (v.srcdoc = v.srcdoc.replaceAll(
        /data-src="(.+?\.)(?:jpe?g|png)/g,
        (y, $) => `data-src="${$}webp`
      )), v.onload = () => {
        C.endProc(d), this.val.setVal_Nochk("tmp", c, !0), this.val.setVal_Nochk("tmp", c + ".alpha", i), this.val.setVal_Nochk("tmp", c + ".x", l.x), this.val.setVal_Nochk("tmp", c + ".y", l.y), this.val.setVal_Nochk("tmp", c + ".scale_x", n), this.val.setVal_Nochk("tmp", c + ".scale_y", o), this.val.setVal_Nochk("tmp", c + ".rotate", r), this.val.setVal_Nochk("tmp", c + ".width", l.width), this.val.setVal_Nochk("tmp", c + ".height", l.height), this.val.setVal_Nochk("tmp", c + ".visible", h);
        const y = v.contentWindow;
        this.#o.resvFlameEvent(y.document.body), y.sn_repRes?.(($) => p.#_($.dataset.src ?? "", $));
      };
    }), !0;
  }
  #y = {};
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  getFrmDisabled(t) {
    return this.#y[t];
  }
  #b(t) {
    const e = { ...t };
    return new DOMRect(
      x(e, "x", 0),
      x(e, "y", 0),
      x(e, "width", _.stageW),
      x(e, "height", _.stageH)
    );
  }
  static #_(t, e, s) {
    const i = this.#f[t];
    if (i) {
      e.src = i, s && (e.onload = () => s(e));
      return;
    }
    const n = this.#m[t];
    if (n) {
      n.push(e);
      return;
    }
    this.#m[t] = [e];
    const [o = "", r = ""] = t.split("?"), c = p.#e.searchPath(o, H.SP_GSM), h = new F().add({ name: t, url: c, xhrType: B.XHR_RESPONSE_TYPE.BUFFER });
    p.#t.use4ViteElectron(t, c, h, p.#i) || p.#t.arg.crypto && c.endsWith(".bin") && h.use((f, l) => {
      if (f.extension !== "bin") {
        l();
        return;
      }
      p.#t.decAB(f.data).then((d) => {
        f.data = d, d instanceof HTMLImageElement && (f.type = B.TYPE.IMAGE), l();
      }).catch((d) => {
        p.#i.errScript(`FrameMng loadPic ロード失敗です fn:${f.name} ${String(d)}`, !1), l();
      });
    }), h.load((f, l) => {
      for (const [d, { data: { src: u } }] of Object.entries(l)) {
        const a = this.#f[d] = u + // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        (u.startsWith("blob:") || u.startsWith("data:") ? "" : r ? "?" + r : ""), b = this.#m[d];
        if (b) for (const k of b)
          k.src = a, s && (k.onload = () => s(k));
        delete this.#m[d];
      }
    });
  }
  static #m = {};
  static #f = {};
  cvsResize() {
    for (const [t, e] of Object.entries(this.#c)) {
      const s = "const.sn.frm." + t, i = Number(this.val.getVal(s + ".x")), n = Number(this.val.getVal(s + ".y")), o = Number(this.val.getVal(s + ".width")), r = Number(this.val.getVal(s + ".height"));
      e.style.left = `${String(
        p.#t.ofsLeft4elm + i * p.#t.cvsScale
      )}px`, e.style.top = `${String(
        p.#t.ofsTop4elm + n * p.#t.cvsScale
      )}px`, e.width = String(o * p.#t.cvsScale), e.height = String(r * p.#t.cvsScale);
    }
  }
  // フレーム変数を取得
  #d(t) {
    const { id: e, var_name: s } = t;
    if (!e) throw "idは必須です";
    const i = document.getElementById(e);
    if (!i) throw `id【${e}】はフレームではありません`;
    const n = "const.sn.frm." + e;
    if (!this.val.getVal(`tmp:${n}`)) throw `frame【${e}】が読み込まれていません`;
    if (!s) throw "var_nameは必須です";
    const o = i.contentWindow;
    if (!Object.hasOwn(o, s)) throw `frame【${e}】に変数/関数【${s}】がありません。変数は var付きにして下さい`;
    const r = o[s];
    return this.val.setVal_Nochk(
      "tmp",
      n + "." + s,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
      g(t, "function", !1) ? r() : r
    ), !1;
  }
  // フレーム変数に設定
  #N(t) {
    const { id: e, var_name: s, text: i } = t;
    if (!e) throw "idは必須です";
    const n = document.getElementById(e);
    if (!n) throw `id【${e}】はフレームではありません`;
    const o = "const.sn.frm." + e;
    if (!this.val.getVal(`tmp:${o}`)) throw `frame【${e}】が読み込まれていません`;
    if (!s) throw "var_nameは必須です";
    if (!i) throw "textは必須です";
    this.val.setVal_Nochk("tmp", o + "." + s, i);
    const r = n.contentWindow;
    return r[s] = i, !1;
  }
  // フレームに設定
  #n = 1;
  #$(t) {
    const { id: e } = t;
    if (!e) throw "idは必須です";
    const s = document.getElementById(e);
    if (!s) throw `id【${e}】はフレームではありません`;
    const i = "const.sn.frm." + e;
    if (!this.val.getVal("tmp:" + i)) throw `frame【${e}】が読み込まれていません`;
    const n = s.style;
    if (g(t, "float", !1) ? n.zIndex = String(++this.#n) : "index" in t ? n.zIndex = String(x(t, "index", 0)) : t.dive && (n.zIndex = String(-++this.#n)), "alpha" in t) {
      const r = n.opacity = String(t.alpha);
      this.val.setVal_Nochk("tmp", i + ".alpha", r);
    }
    const o = this.#b(t);
    if (("x" in t || "y" in t) && (n.left = `${String(
      p.#t.ofsLeft4elm + o.x * p.#t.cvsScale
    )}px`, n.top = `${String(
      p.#t.ofsTop4elm + o.y * p.#t.cvsScale
    )}px`, this.val.setVal_Nochk("tmp", i + ".x", o.x), this.val.setVal_Nochk("tmp", i + ".y", o.y)), "scale_x" in t || "scale_y" in t || "rotate" in t) {
      const r = x(t, "scale_x", 1), c = x(t, "scale_y", 1), h = x(t, "rotate", 0);
      n.transform = `scale(${String(r)}, ${String(c)}) rotate(${String(h)}deg)`, this.val.setVal_Nochk("tmp", i + ".scale_x", r), this.val.setVal_Nochk("tmp", i + ".scale_y", c), this.val.setVal_Nochk("tmp", i + ".rotate", h);
    }
    if ("width" in t && (s.width = String(o.width * p.#t.cvsScale), this.val.setVal_Nochk("tmp", i + ".width", o.width)), "height" in t && (s.height = String(o.height * p.#t.cvsScale), this.val.setVal_Nochk("tmp", i + ".height", o.height)), "visible" in t) {
      const r = g(t, "visible", !0);
      n.display = r ? "inline" : "none", this.val.setVal_Nochk("tmp", i + ".visible", r);
    }
    if ("b_color" in t && (n.backgroundColor = t.b_color), "disabled" in t) {
      const r = this.#y[e] = g(t, "disabled", !0), c = s.contentDocument.body;
      for (const h of [
        ...Array.from(c.getElementsByTagName("input")),
        ...Array.from(c.getElementsByTagName("select"))
      ]) h.disabled = r;
    }
    return !1;
  }
  // フレームをトゥイーン開始
  #w(t) {
    const { id: e, alpha: s, x: i, y: n, scale_x: o, scale_y: r, rotate: c, width: h, height: f } = t;
    if (!e) throw "idは必須です";
    const l = document.getElementById(e);
    if (!l) throw `id【${e}】はフレームではありません`;
    const d = "const.sn.frm." + e;
    if (!this.val.getVal(`tmp:${d}`, 0)) throw `frame【${e}】が読み込まれていません`;
    const u = {};
    s && (u.a = Number(l.style.opacity)), (i || n || o || r || c) && (u.x = Number(this.val.getVal(`tmp:${d}.x`)), u.y = Number(this.val.getVal(`tmp:${d}.y`)), u.sx = Number(this.val.getVal(`tmp:${d}.scale_x`)), u.sy = Number(this.val.getVal(`tmp:${d}.scale_y`)), u.r = Number(this.val.getVal(`tmp:${d}.rotate`))), h && (u.w = Number(this.val.getVal(`tmp:${d}.width`))), f && (u.h = Number(this.val.getVal(`tmp:${d}.height`)));
    const a = w.cnvTweenArg(t, u);
    let b = (m) => {
    };
    s && (x(a, "alpha", 0), b = (m) => {
      l.style.opacity = String(m.a), this.val.setVal_Nochk("tmp", "alpha", m.a);
    });
    let k = (m) => {
    };
    const v = this.#b(a);
    (i || n || o || r || c) && (v.x, v.y, x(a, "scale_x", 1), x(a, "scale_y", 1), x(a, "rotate", 0), k = (m) => {
      l.style.left = `${String(
        p.#t.ofsLeft4elm + m.x * p.#t.cvsScale
      )} px`, l.style.top = `${String(
        p.#t.ofsTop4elm + m.y * p.#t.cvsScale
      )} px`, l.style.transform = `scale(${String(m.sx)}, ${String(m.sy)}) rotate(${String(m.r)}deg)`, this.val.setVal_Nochk("tmp", d + ".x", m.x), this.val.setVal_Nochk("tmp", d + ".y", m.y), this.val.setVal_Nochk("tmp", d + ".scale_x", m.sx), this.val.setVal_Nochk("tmp", d + ".scale_y", m.sy), this.val.setVal_Nochk("tmp", d + ".rotate", m.r);
    });
    let S = (m) => {
    };
    h && (v.width, S = (m) => {
      l.width = `${String(m.w * p.#t.cvsScale)} px`, this.val.setVal_Nochk("tmp", d + ".width", m.w);
    });
    let V = (m) => {
    };
    return f && (v.height, V = (m) => {
      l.height = `${String(m.h * p.#t.cvsScale)} px`, this.val.setVal_Nochk("tmp", d + ".height", m.h);
    }), this.appPixi.stage.interactive = !1, w.tween(`frm
${e}`, t, u, w.cnvTweenArg(t, u), (m) => {
      b(m), k(m), S(m), V(m);
    }, () => {
      this.appPixi.stage.interactive = !0;
    }, () => {
    }), !1;
  }
}
class lt {
  // 🍚
  constructor(t, e, s) {
    this.oCfg = t, this.hTag = e, this.val = s, e.rec_ch = (i) => this.#i(i), e.rec_r = (i) => this.#o(i), e.reset_rec = (i) => this.#c(i), s.defTmp("const.sn.log.json", () => {
      this.#e.text = // 🌾
      this.#e.text.replaceAll("</span><span class='sn_ch'>", "");
      const i = [...this.#t, this.#e];
      return JSON.stringify(i);
    }), this.recText("");
  }
  #e = { text: "" };
  // 🌾
  #t = [];
  // [ch] からコールされる
  //	[ch]		// 文字を追加する
  // recText(text: string) コール
  // 	🌾this.#LastLog		= {text};	// 置換でよい
  // 	🍊save:const.sn.sLog = 🦀const.sn.log.json	// これを起動したい
  recText(t) {
    this.#e.text = t, this.val.setVal_Nochk(
      "save",
      "const.sn.sLog",
      // 🍊 リプレイ時の回復用
      String(this.val.getVal("const.sn.log.json"))
      // これを起動したい
    );
  }
  //MARK: 履歴書き込み
  //	🌾this.#LastLog = {...hArg, text: 🌾this.#LastLog.text};
  #i(t) {
    return this.#e = { ...t, text: this.#e.text }, t.text ? (t.record = !0, t.style ??= "", t.style += "display: none;", t.wait = 0, this.hTag.ch(t)) : (this.val.setVal_Nochk(
      "save",
      "const.sn.sLog",
      // 🍊 リプレイ時の回復用
      String(this.val.getVal("const.sn.log.json"))
      // これを起動したい
    ), !1);
  }
  //MARK: 履歴改行
  #o(t) {
    return this.#i({ ...t, text: "[r]" });
  }
  //MARK: 履歴リセット
  //	以下をクリア。text で置き換え値を設定できる
  //	🌾this.#LastLog		= {text: hArg.text ?? ''};
  //	🍚this.#aLog		= []
  //	🍊save:const.sn.sLog= hArg.text ?[{text:"${hArg.text}"}] : []
  #c(t) {
    return this.#t = [], t.text ??= "", this.#e = { text: t.text }, this.val.setVal_Nochk("save", "const.sn.sLog", JSON.stringify([this.#e])), !1;
  }
  //MARK: 履歴改ページ
  pagebreak() {
    this.#e.text = // 🌾
    this.#e.text.replaceAll("</span><span class='sn_ch'>", ""), this.#e.text && (this.#t.push(this.#e) > this.oCfg.log.max_len && (this.#t = this.#t.slice(-this.oCfg.log.max_len)), this.#e = { text: "" });
  }
  //MARK: 履歴回復
  // save:const.sn.sLog からの復帰
  playback() {
    this.#t = JSON.parse(String(this.val.getVal("save:const.sn.sLog"))), this.#e = { text: "" };
  }
}
function L(j) {
  return encodeURIComponent(JSON.stringify(j));
}
class Z {
  //MARK: コンストラクタ
  constructor(t, e, s, i, n, o, r, c, h) {
    this.cfg = t, this.hTag = e, this.appPixi = s, this.val = i, this.main = n, this.scrItr = o, this.sys = r;
    const f = () => {
      if (r.cvsResize(), this.cvsResizeDesign(), this.#_) for (const a of this.#r)
        this.#s[a].fore.cvsResizeChildren();
      else for (const a of this.#r)
        this.#s[a].fore.cvsResize();
      this.#o.cvsResize(), this.#d.cvsResize();
    };
    if (_.isMobile)
      this.#k.add(globalThis, "orientationchange", f, { passive: !0 });
    else {
      let a;
      this.#k.add(globalThis, "resize", () => {
        a || (a = setTimeout(() => {
          a = void 0, f();
        }, 1e3 / 60 * 10));
      }, { passive: !0 });
    }
    r.cvsResize(), this.#l = new lt(this.cfg.oCfg, e, i), N.init(t, e, i, this.#l, (a) => this.#s[a.layname].fore === a, s), X.init(n, t, s, r, c, i), p.init(t, r, n), this.#o = new p(e, s, i), e.loadplugin = (a) => this.#O(a), e.snapshot = (a) => this.#$(a), this.#w = this.sys.isApp ? (a, b, k, v, S) => this.#B(a, b, k, v, S) : (a, b, k, v, S) => this.#W(a, b, k, v, S), e.add_lay = (a) => this.#j(a), e.clear_lay = (a) => this.#H(a), e.finish_trans = () => !1, e.lay = (a) => this.#z(a), e.trans = (a) => this.#G(a), e.wt = (a) => w.wt(a), e.quake = (a) => this.#q(a), e.stop_quake = e.finish_trans, e.wq = e.wt, e.pause_tsy = (a) => w.pause_tsy(a), e.resume_tsy = (a) => w.resume_tsy(a), e.stop_tsy = (a) => w.stop_tsy(a), e.tsy = (a) => this.#J(a), e.wait_tsy = (a) => w.wait_tsy(a), e.add_filter = (a) => this.#X(a), e.clear_filter = (a) => this.#Y(a), e.enable_filter = (a) => this.#K(a), e.ch = (a) => this.#I(a), e.clear_text = (a) => this.#M(a), e.current = (a) => this.#D(a), e.endlink = (a) => this.#A(a), e.er = (a) => this.#tt(a), e.graph = (a) => this.#et(a), e.link = (a) => this.#st(a), e.r = (a) => this.#it(a), e.ruby2 = (a) => this.#at(a), e.span = (a) => this.#nt(a), e.tcy = (a) => this.#rt(a), e.add_face = (a) => E.add_face(a), e.wv = (a) => E.wv(a), e.dump_lay = (a) => this.#ot(a), e.enable_event = (a) => this.#ct(a), e.button = (a) => this.#lt(a), t.existsBreakline && (this.breakLine = (a) => {
      delete a.visible, a.id = "break", a.pic = "breakline", this.#n("grp｜" + L(a));
    }), t.existsBreakpage && (this.breakPage = (a) => {
      delete a.visible, a.id = "break", a.pic = "breakpage", this.#n("grp｜" + L(a));
    }), this.#c = M(String(t.oCfg.init.bg_color));
    const l = new G();
    l.beginFill(this.#c).lineStyle(0, this.#c).drawRect(0, 0, _.stageW, _.stageH).endFill(), this.#t.addChild(l.clone()), this.#i.addChild(l), this.#i.visible = !1, this.#t.name = "page:A", this.#i.name = "page:B", this.#e = s.stage, this.#e.addChild(this.#i), this.#e.addChild(this.#t), this.#e.addChild(this.#T), this.#e.addChild(this.#a), this.#e.name = "stage";
    const d = (a, b) => {
      this.#N(Number(b));
    };
    d("", i.getVal("sys:TextLayer.Back.Alpha", 1)), i.defValTrg("sys:TextLayer.Back.Alpha", d);
    const u = (a, b) => {
      Q.fontFamily = b;
    };
    u("", i.getVal("tmp:sn.button.fontFamily", Q.fontFamily)), i.defValTrg("tmp:sn.button.fontFamily", u), i.defTmp("const.sn.last_page_text", () => this.currentTxtlayFore?.pageText ?? ""), i.defTmp("const.sn.last_page_plain_text", () => this.currentTxtlayFore?.pagePlainText ?? ""), _.isDbg && (Y.init(s, r, o, h, t, this.#s), this.cvsResizeDesign = () => Y.cvsResizeDesign(), r.addHook((a, b) => {
      this.#y[a]?.(a, b) && delete this.#y[a];
    }));
  }
  #e;
  #t = new U();
  #i = new U();
  #o;
  #c;
  #l;
  #k = new A();
  cvsResizeDesign() {
  }
  #y = {
    attach: (t) => !1,
    continue: (t) => !1,
    disconnect: (t) => !1,
    _enterDesign: (t) => {
      for (const e of this.#r) {
        const s = this.#s[e].fore;
        s.makeDesignCastChildren((i) => i.make()), s.makeDesignCast((i) => i.make());
      }
      return this.#m(this.#v), !1;
    },
    _replaceToken: (t, e) => !1,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    _selectNode: (t, e) => (this.#m(e.node), !1)
  };
  #b = "";
  #_ = "";
  #m(t) {
    [this.#b = "", this.#_ = ""] = t.split("/");
    const e = this.#s[this.#b];
    e && (this.#_ ? e.fore.showDesignCastChildren() : e.fore.showDesignCast());
  }
  getFrmDisabled = (t) => this.#o.getFrmDisabled(t);
  #f = void 0;
  cover(t, e = 0) {
    this.#f && (this.#e.removeChild(this.#f), this.#f.destroy(), this.#f = void 0), t && this.#e.addChild(
      (this.#f = new G()).beginFill(e).lineStyle(0, e).drawRect(0, 0, _.stageW, _.stageH).endFill()
    );
  }
  #d;
  setEvtMng(t) {
    this.#d = t, this.#o.setEvtMng(t), E.setEvtMng(t), w.init(t, this.appPixi);
  }
  destroy() {
    for (const t of Object.values(this.#s)) t.destroy();
    this.#k.clear(), X.destroy(), ot.destroy(), rt.destroy(), N.destroy(), this.#o.destroy(), w.destroy(), N.msecChWait = 10;
  }
  // 既存の全文字レイヤの実際のバック不透明度、を再計算
  #N(t) {
    for (const e of this.#r) {
      const { fore: s, back: i } = this.#s[e];
      s instanceof N && (s.chgBackAlpha(t), i.chgBackAlpha(t));
    }
  }
  #n = (t, e = this.currentTxtlayForeNeedErr, s = !0) => e.tagCh("｜&emsp;《" + t + "》");
  goTxt = () => {
  };
  get needGoTxt() {
    return this.currentTxtlayFore?.needGoTxt ?? !1;
  }
  breakLine = (t) => {
  };
  breakPage = (t) => {
  };
  clearBreak() {
    this.currentTxtlayFore && (this.clearBreak = () => this.#n("del｜break"), this.clearBreak());
  }
  clickTxtLay() {
    return this.currentTxtlayFore ? this.#r.map((t) => this.#s[t].fore).some((t) => t instanceof N && t.click()) : !1;
  }
  //	//	システム
  //MARK: スナップショット
  #$(t) {
    const e = tt("-", "_", "", "_"), s = t.fn ? t.fn.startsWith(ct) ? t.fn : `${K + t.fn + e}.png` : `${K}snapshot${e}.png`, i = this.cfg.searchPath(s), n = x(t, "width", _.stageW), o = x(t, "height", _.stageH);
    return this.#w(t, i, n, o, `snapshot dt:${e}`);
  }
  #w = () => !1;
  #B({ layer: t }, e, s, i, n) {
    if (this.#o.hideAllFrame(), C.beginProc(n), !t)
      return this.sys.capturePage(e, s, i, () => {
        this.#o.restoreAllFrame(), C.endProc(n);
      }), !0;
    const o = this.#r.map((r) => {
      const { ctn: c } = this.#s[r].fore, h = [c, c.visible];
      return c.visible = !1, h;
    });
    for (const r of this.#p(t)) this.#s[r].fore.ctn.visible = !0;
    return this.sys.capturePage(e, s, i, () => {
      for (const [r, c] of o) r.visible = c;
      this.#o.restoreAllFrame(), C.endProc(n);
    }), !0;
  }
  #W(t, e, s, i, n) {
    C.beginProc(n);
    const o = et(t, "b_color", this.#c), r = st({
      width: s,
      height: i,
      backgroundAlpha: o > 16777216 && e.endsWith(".png") ? 0 : 1,
      antialias: g(t, "smoothing", !1),
      preserveDrawingBuffer: !0,
      backgroundColor: o & 16777215,
      autoDensity: !0
    }), c = t.page !== "back" ? "fore" : "back", { layer: h } = t;
    return Promise.allSettled(
      this.#p(h).map((f) => new Promise(
        (l) => this.#s[f][c].snapshot(r, l)
      ))
    ).then(async () => {
      const f = W.create({ width: r.width, height: r.height });
      r.render(this.#e, { renderTexture: f }), await this.sys.savePic(
        e,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        r.plugins.extract.base64(f)
      ), f.destroy();
      for (const l of this.#p(h)) this.#s[l][c].snapshot_end();
      r.destroy(!0), C.endProc(n);
    }), !0;
  }
  //MARK: プラグインの読み込み
  #O(t) {
    const { fn: e } = t;
    if (!e) throw "fnは必須です";
    if (!e.endsWith(".css")) throw "サポートされない拡張子です";
    const s = g(t, "join", !0), i = C.procID + `loadplugin fn:${e}`;
    return s && C.beginProc(i), (async () => {
      const n = await fetch(e);
      if (!n.ok) throw new Error("Network response was not ok.");
      it(await n.text()), s && C.endProc(i);
    })(), s;
  }
  //	//	レイヤ共通
  //MARK: レイヤを追加する
  #j(t) {
    const { layer: e, class: s } = t;
    if (!e) throw "layerは必須です";
    if (e.includes(",")) throw "layer名に「,」は使えません";
    if (e in this.#s) throw `layer【${e}】はすでにあります`;
    if (!s) throw "clsは必須です";
    const i = { isWait: !1 };
    switch (this.#s[e] = new I(e, s, this.#t, this.#i, t, this.sys, this.val, i), this.#r.push(e), s) {
      case "txt":
        this.#v || (this.#C = () => {
        }, this.#h = (n) => this.#Q(n), this.#D = (n) => this.#Z(n), this.hTag.current({ layer: e }), this.goTxt = () => {
          this.#d.isSkipping ? N.msecChWait = 0 : this.setNormalChWait();
          for (const n of this.#r) {
            const o = this.#s[n].fore;
            o instanceof N && this.#n("gotxt｜", o, !1);
          }
        }), this.val.setVal_Nochk("save", "const.sn.layer." + e + ".enabled", !0);
        break;
      case "grp":
        if (this.#E) break;
        this.#E = e;
        break;
    }
    return this.scrItr.recodeDesign(t), i.isWait;
  }
  #s = {
    /* empty */
  };
  // しおりLoad時再読込
  #r = [];
  // 最適化用・重なり順つき全レイヤ名
  #v = "";
  #E = "";
  #z(t) {
    const e = this.#u(t), s = this.#s[e], i = s.back.ctn, n = s.fore.ctn;
    if (g(t, "float", !1))
      this.#i.setChildIndex(i, this.#i.children.length - 1), this.#t.setChildIndex(n, this.#t.children.length - 1), this.#V();
    else if (t.index)
      x(t, "index", 0) && (this.#i.setChildIndex(i, t.index), this.#t.setChildIndex(n, t.index), this.#V());
    else if (t.dive) {
      const { dive: o } = t;
      let r = 0;
      if (e === o) throw "[lay] 属性 layerとdiveが同じ【" + o + "】です";
      const c = this.#s[o];
      if (!c) throw "[lay] 属性 dive【" + o + "】が不正です。レイヤーがありません";
      const h = c.back, f = c.fore, l = this.#i.getChildIndex(h.ctn), d = this.#t.getChildIndex(f.ctn);
      r = l < d ? l : d, r > this.#i.getChildIndex(i) && --r, this.#t.setChildIndex(n, r), this.#i.setChildIndex(i, r), this.#V();
    }
    return t[":id_tag"] = s.fore.name.slice(0, -7), this.scrItr.recodeDesign(t), s.lay(t);
  }
  #V() {
    this.#r = this.#U();
  }
  //MARK: レイヤ設定の消去
  #H(t) {
    return this.#S(t, (e) => {
      const s = this.#s[this.#u({ layer: e })];
      if (t.page === "both") {
        s.fore.clearLay(t), s.back.clearLay(t);
        return;
      }
      s.getPage(t).clearLay(t);
    }), !1;
  }
  //===================================================
  //MARK: WebGL フラグメントシェーダー GLSL
  static #F = (
    /* glsl */
    `
precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform sampler2D rule;
uniform float vague;
uniform float tick;

uniform vec4 inputPixel;
uniform highp vec4 outputFrame;
vec2 getUV(vec2 coord) {
	return coord * inputPixel.xy / outputFrame.zw;
}

void main() {
	vec4 fg = texture2D(uSampler, vTextureCoord);
	vec4 ru = texture2D(rule, getUV(vTextureCoord));

	float v = ru.r - tick;
	gl_FragColor = abs(v) < vague
		? vec4(fg.rgb, 1) *fg.a *(0.5 +v /vague *0.5)
		: 0.0 <= v ? fg : vec4(0);
}`
  );
  /*
  	末尾が読みづらいが、以下のif文を消して三項演算子にしている。
  
  	if (abs(v) < vague) {
  		float f_a = fg.a *(0.5 +v /vague *0.5);
  		gl_FragColor.rgb = fg.rgb *f_a;
  		gl_FragColor.a = f_a;
  		return;
  	}
  	gl_FragColor = v >= 0.0 ? fg : vec4(0);
  
  		★GLSL : don't use "if"｜Nobu note.com/nobuhirosaijo/n/n606a3f5d8e89
  			> if文はあまり使わない方がいいらしい (処理負荷が高い)
  */
  #L = W.create({
    width: _.stageW,
    height: _.stageH
  });
  #T = new q(this.#L);
  #g = W.create({
    width: _.stageW,
    height: _.stageH
  });
  #a = new q(this.#g);
  //MARK: ページ裏表を交換
  #G(t) {
    const { layer: e } = t, s = /* @__PURE__ */ new Set(), i = this.#p(e).map((y) => (s.add(y), this.#s[y].fore)), n = () => {
      [this.#t, this.#i] = [this.#i, this.#t];
      const y = [];
      for (const [$, T] of Object.entries(this.#s)) {
        if (s.has($)) {
          T.transPage(y);
          continue;
        }
        const { fore: { ctn: P }, back: { ctn: D } } = T, z = this.#t.getChildIndex(D);
        this.#t.removeChild(D), this.#i.removeChild(P), this.#t.addChildAt(P, z), this.#i.addChildAt(D, z);
      }
      Promise.allSettled(y).then(() => {
        this.#t.visible = !0, this.#i.visible = !1, this.#T.visible = !1, this.#a.visible = !1, C.notifyEndProc(R);
      });
    };
    if (this.#a.filters = [], this.#a.alpha = 1, x(t, "time", 0) === 0 || this.#d.isSkipping)
      return n(), !1;
    const r = [], c = this.#r.map((y) => {
      const { fore: $, back: T } = this.#s[y], P = s.has(y) ? T : $;
      return P.ctn.visible && r.push(P.ctn), P;
    }), { ticker: h, renderer: f } = this.appPixi;
    f.render(this.#i, { renderTexture: this.#L });
    let l = () => {
      for (const y of r) f.render(
        y,
        { renderTexture: this.#L, clear: !1 }
      );
    };
    if (!c.some((y) => y.containMovement)) {
      const y = l;
      l = () => {
        l = () => {
        }, y();
      };
    }
    const d = () => f.render(this.#t, { renderTexture: this.#g });
    d();
    let u = () => {
      this.#t.visible = !0, d(), this.#t.visible = !1;
    };
    if (!i.some((y) => y.containMovement)) {
      const y = u;
      u = () => {
        u = () => {
        }, y();
      };
    }
    const a = () => {
      l(), this.#T.visible = !0, u(), this.#a.visible = !0;
    }, { glsl: b, rule: k } = t, v = () => {
      h.remove(a), n();
    };
    if (!b && !k)
      return w.tween(R, t, this.#a, { alpha: 0 }, () => {
      }, v, () => {
      }), h.add(a), !1;
    const S = {
      rule: at.EMPTY,
      vague: x(t, "vague", 0.04),
      tick: 0
    };
    this.#a.filters = [new nt(
      void 0,
      b ?? Z.#F,
      S
    )];
    const V = w.tween(R, t, S, { tick: 1 }, () => {
    }, v, () => {
    }, !k);
    return k ? new E(k, void 0, (y) => {
      S.rule = y.texture, y.destroy(), V.start(), h.add(a);
    }, (y) => {
      y && this.main.resume();
    }).ret : (h.add(a), !1);
  }
  #p(t = "") {
    return t ? t.split(",") : this.#r;
  }
  #S(t, e) {
    const s = this.#p(t.layer);
    for (const i of s) {
      const n = this.#s[i];
      if (!n) throw `存在しないlayer【${i}】です`;
      e(i, n);
    }
    return s;
  }
  #U(t = "") {
    return this.#p(t).sort((e, s) => {
      const i = this.#t.getChildIndex(this.#s[e].fore.ctn), n = this.#t.getChildIndex(this.#s[s].fore.ctn);
      return i < n ? -1 : i > n ? 1 : 0;
    });
  }
  setAllStyle2TxtLay(t) {
    for (const e of this.#r) {
      const s = this.#s[e].fore;
      s instanceof N && s.lay({ style: t });
    }
  }
  //MARK: 画面を揺らす
  #q(t) {
    if (x(t, "time", NaN) === 0) return !1;
    const e = this.#p(t.layer).map((f) => this.#s[f].fore.ctn), { renderer: s, ticker: i } = this.appPixi;
    this.#g.resize(_.stageW, _.stageH);
    const n = () => {
      this.#t.visible = !0;
      for (const f of e) s.render(
        f,
        { renderTexture: this.#g, clear: !1 }
      );
      this.#t.visible = !1;
    };
    this.#a.visible = !0, this.#a.alpha = 1;
    const o = O(x(t, "hmax", 10)), r = O(x(t, "vmax", 10)), c = o === 0 ? () => {
    } : () => {
      this.#a.x = Math.round(Math.random() * o * 2) - o;
    }, h = r === 0 ? () => {
    } : () => {
      this.#a.y = Math.round(Math.random() * r * 2) - r;
    };
    return this.#a.filters = [], w.tween(R, t, this.#a, { x: 0, y: 0 }, () => {
      c(), h();
    }, () => {
      i.remove(n), this.#t.visible = !0, this.#a.visible = !1, this.#a.x = 0, this.#a.y = 0, C.notifyEndProc(R);
    }, () => {
    }), i.add(n), !1;
  }
  //MARK: トゥイーン開始
  #J(t) {
    const { layer: e, render: s, name: i } = t;
    if (!e) throw "layerは必須です";
    const n = this.#s[this.#u(t)], o = n.fore;
    let r = () => {
    };
    s && (this.#d.isSkipping ? o.renderStart(!0) : (o.renderStart(!1), r = () => o.renderEnd()));
    const c = w.cnvTweenArg(t, o), h = g(t, "arrive", !1), f = g(t, "backlay", !1), l = n.back.ctn;
    return w.tween(i ?? e, t, o, w.cnvTweenArg(t, o), () => {
    }, r, () => {
      if (h && Object.assign(o, c), f) for (const d of w.aLayerPrpNm) l[d] = o[d];
    }), "filter" in t && (o.ctn.filters = [J.bldFilters(t)], o.aFltHArg = [t]), !1;
  }
  //MARK: フィルター追加
  #X(t) {
    return this.#S(t, (e) => {
      const s = this.#s[this.#u({ layer: e })];
      if (t.page === "both") {
        this.#P(s.fore, t), this.#P(s.back, t);
        return;
      }
      const i = s.getPage(t);
      this.#P(i, t);
    }), !1;
  }
  #P(t, e) {
    const s = t.ctn;
    s.filters ??= [], s.filters = [...s.filters, J.bldFilters(e)], t.aFltHArg.push(e);
  }
  //MARK: フィルター全削除
  #Y(t) {
    return this.#S(t, (e) => {
      const s = this.#s[this.#u({ layer: e })];
      if (t.page === "both") {
        const n = s.fore, o = s.back;
        n.ctn.filters = null, o.ctn.filters = null, n.aFltHArg = [], o.aFltHArg = [];
        return;
      }
      const i = s.getPage(t);
      i.ctn.filters = null, i.aFltHArg = [];
    }), !1;
  }
  //MARK: フィルター個別切替
  #K(t) {
    return this.#S(t, (e) => {
      const s = this.#s[this.#u({ layer: e })];
      if (t.page === "both") {
        this.#R(s.fore, t), this.#R(s.back, t);
        return;
      }
      const i = s.getPage(t);
      this.#R(i, t);
    }), !1;
  }
  #R(t, e) {
    const s = t.ctn;
    if (!s.filters) throw "フィルターがありません";
    const i = O(x(e, "index", 0)), n = s.filters.length;
    if (n <= i) throw `フィルターの個数（${String(n)}）を越えています`;
    t.aFltHArg[i].enabled = s.filters[i].enabled = g(e, "enabled", !0);
  }
  //	// 文字・文字レイヤ
  //MARK: 文字を追加する
  #I(t) {
    const { text: e } = t;
    if (!e) throw "textは必須です";
    const s = this.#h(t);
    delete t.text, this.setNormalChWait(), this.#d.isSkipping ? t.wait = 0 : "wait" in t && x(t, "wait", NaN), this.#n("add｜" + L(t), s);
    const i = g(t, "record", !0), n = this.val.doRecLog();
    return i || this.val.setVal_Nochk("save", "sn.doRecLog", i), s.tagCh(e.replaceAll("[r]", `
`)), this.val.setVal_Nochk("save", "sn.doRecLog", n), this.#n("add_close｜", s), !1;
  }
  #h = (t) => {
    throw this.#C(), 0;
  };
  #Q(t) {
    const e = this.#u(t, this.#v), i = this.#s[e].getPage(t);
    if (!(i instanceof N)) throw e + "はTxtLayerではありません";
    return i;
  }
  setNormalChWait() {
    N.msecChWait = this.scrItr.normalWait;
  }
  //MARK: 操作対象のメッセージレイヤの指定
  #D = (t) => {
    throw this.#C(), 0;
  };
  #Z(t) {
    const { layer: e } = t;
    if (!e) throw "[current] layerは必須です";
    const s = this.#s[e];
    if (!s || !(s.getPage(t) instanceof N)) throw `${e}はTxtLayerではありません`;
    this.#x = s, this.#l.pagebreak(), this.#v = e, this.val.setVal_Nochk("save", "const.sn.mesLayer", e);
    for (const i of this.#r) {
      const { fore: n, back: o } = this.#s[i];
      n instanceof N && (n.isCur = o.isCur = i === e);
    }
    return !1;
  }
  get currentTxtlayForeNeedErr() {
    return this.#C(), this.currentTxtlayFore;
  }
  get currentTxtlayFore() {
    return this.#x ? this.#x.fore : null;
  }
  #x = void 0;
  // カレントテキストレイヤ
  #C = () => {
    throw "文字レイヤーがありません。文字表示や操作する前に、[add_lay layer=（レイヤ名） class=txt]で文字レイヤを追加して下さい";
  };
  #u(t, e = "") {
    const s = t.layer ?? e;
    if (s.includes(",")) throw "layer名に「,」は使えません";
    if (!(s in this.#s)) throw "属性 layer【" + s + "】が不正です。レイヤーがありません";
    return t.layer = s, s;
  }
  recPagebreak() {
    this.#l.pagebreak();
  }
  //MARK: 文字消去
  #M(t) {
    const e = this.#h(t);
    return t.layer === this.#v && t.page === "fore" && this.#l.pagebreak(), e.clearText(), !1;
  }
  //MARK: ハイパーリンクの終了
  #A(t) {
    return this.#n("endlink｜", this.#h(t)), !1;
  }
  //MARK: ページ両面の文字消去
  #tt(t) {
    return g(t, "rec_page_break", !0) && this.#l.pagebreak(), this.#x && (this.#x.fore.clearLay(t), this.#x.back.clearLay(t)), !1;
  }
  //MARK: インライン画像表示
  #et(t) {
    if (!t.pic) throw "[graph] picは必須です";
    return this.#n("grp｜" + L(t), this.#h(t)), !1;
  }
  //MARK: ハイパーリンク
  #st(t) {
    if (!t.fn && !t.label && !t.url) throw "fn,label,url いずれかは必須です";
    return t.fn ??= this.scrItr.scriptFn, t.style ??= "background-color: rgba(255,0,0,0.5);", t.style_hover ??= "background-color: rgba(255,0,0,0.9);", t.style_clicked ??= t.style, this.#n("link｜" + L(t), this.#h(t)), !1;
  }
  //MARK: 改行
  #it(t) {
    return this.#I({ ...t, text: `
` });
  }
  //MARK: 文字列と複数ルビの追加
  #at(t) {
    const { t: e, r: s } = t;
    if (!e) throw "[ruby2] tは必須です";
    if (!s) throw "[ruby2] rは必須です";
    return t.text = "｜" + encodeURIComponent(e) + "《" + encodeURIComponent(s) + "》", delete t.t, delete t.r, this.#I(t);
  }
  //MARK: インラインスタイル設定
  #nt(t) {
    return this.#n("span｜" + L(t), this.#h(t)), !1;
  }
  //MARK: tcy縦中横を表示する
  #rt(t) {
    if (!t.t) throw "[tcy] tは必須です";
    return this.#n("tcy｜" + L(t), this.#h(t)), !1;
  }
  //MARK: レイヤのダンプ
  #ot({ layer: t }) {
    console.group("🥟 [dump_lay]");
    for (const e of this.#p(t)) {
      const { fore: s, back: i } = this.#s[e];
      try {
        console.info(
          `%c${s.name.slice(0, -7)} %o`,
          `color:#${_.isDarkMode ? "49F" : "05A"};`,
          JSON.parse(`{"back":{${i.dump()}}, "fore":{${s.dump()}}}`)
        );
      } catch (n) {
        console.error("dump_lay err:%o", n), console.error(`   back:${i.dump()}`), console.error(`   fore:${s.dump()}`);
      }
    }
    return console.groupEnd(), !1;
  }
  //MARK: イベント有無の切替
  #ct(t) {
    const e = this.#u(t, this.#v), s = g(t, "enabled", !0);
    return this.#h(t).enabled = s, this.val.setVal_Nochk("save", "const.sn.layer." + e + ".enabled", s), !1;
  }
  //MARK: ボタンを表示
  #lt(t) {
    return I.argChk_page(t, "back"), t.fn ??= this.scrItr.scriptFn, this.#h(t).addButton(t), this.scrItr.recodeDesign(t), !1;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  record() {
    const t = {};
    for (const e of this.#r) {
      const s = this.#s[e];
      t[e] = {
        cls: s.cls,
        fore: s.fore.record(),
        back: s.back.record()
      };
    }
    return t;
  }
  playback(t) {
    this.#l.playback();
    const e = [], s = [];
    for (const [n, { fore: o, fore: { idx: r }, back: c, cls: h }] of Object.entries(t)) {
      s.push({ ln: n, idx: r });
      const f = this.#s[n] ??= new I(n, h, this.#t, this.#i, {}, this.sys, this.val, { isWait: !1 });
      f.fore.playback(o, e), f.back.playback(c, e);
    }
    const i = this.#t.children.length;
    return e.push(new Promise((n) => {
      for (const { ln: o, idx: r } of s.sort(({ idx: c }, { idx: h }) => c === h ? 0 : c < h ? -1 : 1)) {
        const c = this.#s[o];
        if (!c) continue;
        const h = i > r ? r : i - 1, { fore: f, back: l } = c;
        this.#t.setChildIndex(f.ctn, h), this.#i.setChildIndex(l.ctn, h);
      }
      n();
    })), e;
  }
}
export {
  Z as LayerMng
};
//# sourceMappingURL=LayerMng.js.map
