import { e as w, S as H, L as F, n as D, l as v, a as x, p as A, G, q as U, E as tt, f as et, r as st, t as it, v as B, w as at, x as q, y as nt, F as rt, u as W, z as Y } from "./web2.js";
import { C as _, T as J, a as P } from "./CmnTween.js";
import { G as X, D as K } from "./GrpLayer.js";
import { S as I } from "./SpritesMng.js";
import { T as $, a as ot } from "./TxtLayer.js";
import { R as ct } from "./RubySpliter.js";
import { P as lt, b as Q } from "./Main.js";
import { a as C } from "./Reading.js";
import { Button as Z } from "./Button.js";
class R {
  constructor(t, e, s, i, n, o, r, l) {
    this.cls = e, this.hArg = n, this.sys = o, this.val = r, this.ret = l;
    const f = o.hFactoryCls[e];
    if (!f) throw `属性 class【${e}】が不正です`;
    const d = f(), h = f();
    d.layname = h.layname = t;
    const p = n[":id_tag"] = `layer:${t} cls:${e} page:`;
    d.ctn.name = d.name = p + "A", h.ctn.name = h.name = p + "B", s.addChild(d.ctn), i.addChild(h.ctn), w(n, "visible", !0), w(n, "visible", !0), l.isWait = d.lay(n) || h.lay(n), this.#e = { fore: d, back: h }, i.visible = !1;
    const c = `const.sn.lay.${t}`;
    r.setVal_Nochk("tmp", c, !0), r.defTmp(c + ".fore.alpha", () => this.#e.fore.alpha), r.defTmp(c + ".back.alpha", () => this.#e.back.alpha), r.defTmp(c + ".fore.height", () => this.#e.fore.height), r.defTmp(c + ".back.height", () => this.#e.back.height), r.defTmp(c + ".fore.visible", () => this.#e.fore.ctn.visible), r.defTmp(c + ".back.visible", () => this.#e.back.ctn.visible), r.defTmp(c + ".fore.width", () => this.#e.fore.width), r.defTmp(c + ".back.width", () => this.#e.back.width), r.defTmp(c + ".fore.x", () => this.#e.fore.x), r.defTmp(c + ".back.x", () => this.#e.back.x), r.defTmp(c + ".fore.y", () => this.#e.fore.y), r.defTmp(c + ".back.y", () => this.#e.back.y);
  }
  #e;
  destroy() {
    this.#e.fore.destroy(), this.#e.back.destroy();
  }
  lay = (t) => this.getPage(t).lay(t);
  getPage = (t) => R.argChk_page(t, "fore") !== "back" ? this.#e.fore : this.#e.back;
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
class u {
  constructor(t, e, s) {
    this.appPixi = e, this.val = s, t.add_frame = (i) => this.#x(i), t.let_frame = (i) => this.#d(i), t.set_frame = (i) => this.#N(i), t.frame = (i) => this.#S(i), t.tsy_frame = (i) => this.#w(i);
  }
  static #e;
  static #t;
  static #i;
  static init(t, e, s) {
    u.#e = t, u.#t = e, u.#i = s;
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
  #x(t) {
    const { id: e, src: s, alpha: i = 1, scale_x: n = 1, scale_y: o = 1, rotate: r = 0 } = t;
    if (!e) throw "idは必須です";
    if (!s) throw "srcは必須です";
    const l = "const.sn.frm." + e;
    if (this.val.getVal(`tmp:${l}`)) throw `frame【${e}】はすでにあります`;
    const f = w(t, "visible", !0), d = t.b_color ? ` background-color: ${t.b_color};` : "", h = this.#b(t);
    u.#i.cvs.insertAdjacentHTML("beforebegin", `<iframe id="${e}" style="opacity: ${i}; ${d} position: absolute; left:${u.#t.ofsLeft4elm + h.x * u.#t.cvsScale}px; top: ${u.#t.ofsTop4elm + h.y * u.#t.cvsScale}px; z-index: 1; border: 0px; overflow: hidden; display: ${f ? "inline" : "none"}; transform: scale(${n}, ${o}) rotate(${r}deg);" width="${h.width * u.#t.cvsScale}" height="${h.height * u.#t.cvsScale}"></iframe>`);
    const p = C.procID + `add_frame id:${e}`;
    C.beginProc(p);
    const c = u.#e.searchPath(s, H.HTML), a = new F().add({ name: s, url: c, xhrType: D.XHR_RESPONSE_TYPE.TEXT });
    return u.#t.arg.crypto && a.use(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      (y, k) => void u.#t.dec(y.extension, y.data).then((b) => {
        y.data = b, k();
      }).catch((b) => {
        u.#i.errScript(`[add_frame]Html ロード失敗です src:${y.name} ${b}`, !1), k();
      })
    ), a.load((y, k) => {
      const b = document.getElementById(e);
      this.#c[e] = b, this.#y[e] = !1;
      const g = c.lastIndexOf("/") + 1, S = c.slice(0, g), j = S.slice(0, g);
      b.srcdoc = String(k[s]?.data).replace("sn_repRes();", "").replaceAll(
        /\s(?:src|href)=(["'])(\S+?)\1/g,
        // 【\s】が大事、data-src弾く
        (m, N, L) => L.startsWith("../") ? j + m.slice(3) : m.replace("./", "").replace(N, N + S)
      ), b.srcdoc.includes("true/*WEBP*/;") && (b.srcdoc = b.srcdoc.replaceAll(
        /data-src="(.+?\.)(?:jpe?g|png)/g,
        (m, N) => `data-src="${N}webp`
      )), b.onload = () => {
        C.endProc(p), this.val.setVal_Nochk("tmp", l, !0), this.val.setVal_Nochk("tmp", l + ".alpha", i), this.val.setVal_Nochk("tmp", l + ".x", h.x), this.val.setVal_Nochk("tmp", l + ".y", h.y), this.val.setVal_Nochk("tmp", l + ".scale_x", n), this.val.setVal_Nochk("tmp", l + ".scale_y", o), this.val.setVal_Nochk("tmp", l + ".rotate", r), this.val.setVal_Nochk("tmp", l + ".width", h.width), this.val.setVal_Nochk("tmp", l + ".height", h.height), this.val.setVal_Nochk("tmp", l + ".visible", f);
        const m = b.contentWindow;
        this.#o.resvFlameEvent(m.document.body), m.sn_repRes?.((N) => u.#_(N.dataset.src ?? "", N));
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
      v(e, "x", 0),
      v(e, "y", 0),
      v(e, "width", x.stageW),
      v(e, "height", x.stageH)
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
    const [o = "", r = ""] = t.split("?"), l = u.#e.searchPath(o, H.SP_GSM), f = new F().add({ name: t, url: l, xhrType: D.XHR_RESPONSE_TYPE.BUFFER });
    u.#t.use4ViteElectron(t, l, f, u.#i) || u.#t.arg.crypto && l.endsWith(".bin") && f.use((d, h) => {
      if (d.extension !== "bin") {
        h();
        return;
      }
      u.#t.decAB(d.data).then((p) => {
        d.data = p, p instanceof HTMLImageElement && (d.type = D.TYPE.IMAGE), h();
      }).catch((p) => {
        u.#i.errScript(`FrameMng loadPic ロード失敗です fn:${d.name} ${p}`, !1), h();
      });
    }), f.load((d, h) => {
      for (const [p, { data: { src: c } }] of Object.entries(h)) {
        const a = this.#f[p] = c + // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        (c.startsWith("blob:") || c.startsWith("data:") ? "" : r ? "?" + r : ""), y = this.#m[p];
        if (y) for (const k of y)
          k.src = a, s && (k.onload = () => s(k));
        delete this.#m[p];
      }
    });
  }
  static #m = {};
  static #f = {};
  cvsResize() {
    for (const [t, e] of Object.entries(this.#c)) {
      const s = "const.sn.frm." + t, i = Number(this.val.getVal(s + ".x")), n = Number(this.val.getVal(s + ".y")), o = Number(this.val.getVal(s + ".width")), r = Number(this.val.getVal(s + ".height"));
      e.style.left = `${u.#t.ofsLeft4elm + i * u.#t.cvsScale}px`, e.style.top = `${u.#t.ofsTop4elm + n * u.#t.cvsScale}px`, e.width = String(o * u.#t.cvsScale), e.height = String(r * u.#t.cvsScale);
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
      w(t, "function", !1) ? r() : r
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
  #S(t) {
    const { id: e } = t;
    if (!e) throw "idは必須です";
    const s = document.getElementById(e);
    if (!s) throw `id【${e}】はフレームではありません`;
    const i = "const.sn.frm." + e;
    if (!this.val.getVal("tmp:" + i)) throw `frame【${e}】が読み込まれていません`;
    const n = s.style;
    if (w(t, "float", !1) ? n.zIndex = `${++this.#n}` : "index" in t ? n.zIndex = `${v(t, "index", 0)}` : t.dive && (n.zIndex = `-${++this.#n}`), "alpha" in t) {
      const r = n.opacity = String(t.alpha);
      this.val.setVal_Nochk("tmp", i + ".alpha", r);
    }
    const o = this.#b(t);
    if (("x" in t || "y" in t) && (n.left = `${u.#t.ofsLeft4elm + o.x * u.#t.cvsScale}px`, n.top = `${u.#t.ofsTop4elm + o.y * u.#t.cvsScale}px`, this.val.setVal_Nochk("tmp", i + ".x", o.x), this.val.setVal_Nochk("tmp", i + ".y", o.y)), "scale_x" in t || "scale_y" in t || "rotate" in t) {
      const r = v(t, "scale_x", 1), l = v(t, "scale_y", 1), f = v(t, "rotate", 0);
      n.transform = `scale(${r}, ${l}) rotate(${f}deg)`, this.val.setVal_Nochk("tmp", i + ".scale_x", r), this.val.setVal_Nochk("tmp", i + ".scale_y", l), this.val.setVal_Nochk("tmp", i + ".rotate", f);
    }
    if ("width" in t && (s.width = String(o.width * u.#t.cvsScale), this.val.setVal_Nochk("tmp", i + ".width", o.width)), "height" in t && (s.height = String(o.height * u.#t.cvsScale), this.val.setVal_Nochk("tmp", i + ".height", o.height)), "visible" in t) {
      const r = w(t, "visible", !0);
      n.display = r ? "inline" : "none", this.val.setVal_Nochk("tmp", i + ".visible", r);
    }
    if ("b_color" in t && (n.backgroundColor = t.b_color), "disabled" in t) {
      const r = this.#y[e] = w(t, "disabled", !0), l = s.contentDocument.body;
      for (const f of [
        ...Array.from(l.getElementsByTagName("input")),
        ...Array.from(l.getElementsByTagName("select"))
      ]) f.disabled = r;
    }
    return !1;
  }
  // フレームをトゥイーン開始
  #w(t) {
    const { id: e, alpha: s, x: i, y: n, scale_x: o, scale_y: r, rotate: l, width: f, height: d } = t;
    if (!e) throw "idは必須です";
    const h = document.getElementById(e);
    if (!h) throw `id【${e}】はフレームではありません`;
    const p = "const.sn.frm." + e;
    if (!this.val.getVal(`tmp:${p}`, 0)) throw `frame【${e}】が読み込まれていません`;
    const c = {};
    s && (c.a = Number(h.style.opacity)), (i || n || o || r || l) && (c.x = Number(this.val.getVal(`tmp:${p}.x`)), c.y = Number(this.val.getVal(`tmp:${p}.y`)), c.sx = Number(this.val.getVal(`tmp:${p}.scale_x`)), c.sy = Number(this.val.getVal(`tmp:${p}.scale_y`)), c.r = Number(this.val.getVal(`tmp:${p}.rotate`))), f && (c.w = Number(this.val.getVal(`tmp:${p}.width`))), d && (c.h = Number(this.val.getVal(`tmp:${p}.height`)));
    const a = _.cnvTweenArg(t, c);
    let y = () => {
    };
    s && (v(a, "alpha", 0), y = () => {
      h.style.opacity = String(c.a), this.val.setVal_Nochk("tmp", "alpha", c.a);
    });
    let k = () => {
    };
    const b = this.#b(a);
    (i || n || o || r || l) && (b.x, b.y, v(a, "scale_x", 1), v(a, "scale_y", 1), v(a, "rotate", 0), k = () => {
      h.style.left = `${// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      u.#t.ofsLeft4elm + c.x * u.#t.cvsScale} px`, h.style.top = `${// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      u.#t.ofsTop4elm + c.y * u.#t.cvsScale} px`, h.style.transform = `scale(${c.sx}, ${c.sy}) rotate(${c.r}deg)`, this.val.setVal_Nochk("tmp", p + ".x", c.x), this.val.setVal_Nochk("tmp", p + ".y", c.y), this.val.setVal_Nochk("tmp", p + ".scale_x", c.sx), this.val.setVal_Nochk("tmp", p + ".scale_y", c.sy), this.val.setVal_Nochk("tmp", p + ".rotate", c.r);
    });
    let g = () => {
    };
    f && (b.width, g = () => {
      h.width = `${c.w * u.#t.cvsScale} px`, this.val.setVal_Nochk("tmp", p + ".width", c.w);
    });
    let S = () => {
    };
    return d && (b.height, S = () => {
      h.height = `${c.h * u.#t.cvsScale} px`, this.val.setVal_Nochk("tmp", p + ".height", c.h);
    }), this.appPixi.stage.interactive = !1, _.tween(`frm
${e}`, t, c, _.cnvTweenArg(t, c), () => {
      y(), k(), g(), S();
    }, () => {
      this.appPixi.stage.interactive = !0;
    }, () => {
    }), !1;
  }
}
class ht {
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
function V(O) {
  return encodeURIComponent(JSON.stringify(O));
}
class M {
  //MARK: コンストラクタ
  constructor(t, e, s, i, n, o, r, l, f) {
    this.cfg = t, this.hTag = e, this.appPixi = s, this.val = i, this.main = n, this.scrItr = o, this.sys = r;
    const d = () => {
      if (r.cvsResize(), this.cvsResizeDesign(), this.#_) for (const a of this.#r)
        this.#s[a].fore.cvsResizeChildren();
      else for (const a of this.#r)
        this.#s[a].fore.cvsResize();
      this.#o.cvsResize(), this.#d.cvsResize();
    };
    if (x.isMobile)
      this.#x.add(globalThis, "orientationchange", d, { passive: !0 });
    else {
      let a;
      this.#x.add(globalThis, "resize", () => {
        a || (a = setTimeout(() => {
          a = void 0, d();
        }, 1e3 / 60 * 10));
      }, { passive: !0 });
    }
    r.cvsResize(), this.#l = new ht(this.cfg.oCfg, e, i), $.init(t, e, i, this.#l, (a) => this.#s[a.layname].fore === a, s), X.init(n, t, s, r, l, i), u.init(t, r, n), this.#o = new u(e, s, i), e.loadplugin = (a) => this.#O(a), e.snapshot = (a) => this.#S(a), this.#w = this.sys.isApp ? (a, y, k, b, g) => this.#B(a, y, k, b, g) : (a, y, k, b, g) => this.#W(a, y, k, b, g), e.add_lay = (a) => this.#j(a), e.clear_lay = (a) => this.#H(a), e.finish_trans = () => !1, e.lay = (a) => this.#z(a), e.trans = (a) => this.#G(a), e.wt = (a) => _.wt(a), e.quake = (a) => this.#q(a), e.stop_quake = e.finish_trans, e.wq = e.wt, e.pause_tsy = (a) => _.pause_tsy(a), e.resume_tsy = (a) => _.resume_tsy(a), e.stop_tsy = (a) => _.stop_tsy(a), e.tsy = (a) => this.#Y(a), e.wait_tsy = (a) => _.wait_tsy(a), e.add_filter = (a) => this.#J(a), e.clear_filter = (a) => this.#X(a), e.enable_filter = (a) => this.#K(a), e.ch = (a) => this.#I(a), e.clear_text = (a) => this.#M(a), e.current = (a) => this.#D(a), e.endlink = (a) => this.#A(a), e.er = (a) => this.#tt(a), e.graph = (a) => this.#et(a), e.link = (a) => this.#st(a), e.r = (a) => this.#it(a), e.ruby2 = (a) => this.#at(a), e.span = (a) => this.#nt(a), e.tcy = (a) => this.#rt(a), e.add_face = (a) => I.add_face(a), e.wv = (a) => I.wv(a), e.dump_lay = (a) => this.#ot(a), e.enable_event = (a) => this.#ct(a), e.button = (a) => this.#lt(a), t.existsBreakline && (this.breakLine = (a) => {
      delete a.visible, a.id = "break", a.pic = "breakline", this.#n("grp｜" + V(a));
    }), t.existsBreakpage && (this.breakPage = (a) => {
      delete a.visible, a.id = "break", a.pic = "breakpage", this.#n("grp｜" + V(a));
    }), this.#c = A(String(t.oCfg.init.bg_color));
    const h = new G();
    h.beginFill(this.#c).lineStyle(0, this.#c).drawRect(0, 0, x.stageW, x.stageH).endFill(), this.#t.addChild(h.clone()), this.#i.addChild(h), this.#i.visible = !1, this.#t.name = "page:A", this.#i.name = "page:B", this.#e = s.stage, this.#e.addChild(this.#i), this.#e.addChild(this.#t), this.#e.addChild(this.#T), this.#e.addChild(this.#a), this.#e.name = "stage";
    const p = (a, y) => {
      this.#N(Number(y));
    };
    p("", i.getVal("sys:TextLayer.Back.Alpha", 1)), i.defValTrg("sys:TextLayer.Back.Alpha", p);
    const c = (a, y) => {
      Z.fontFamily = y;
    };
    c("", i.getVal("tmp:sn.button.fontFamily", Z.fontFamily)), i.defValTrg("tmp:sn.button.fontFamily", c), i.defTmp("const.sn.last_page_text", () => this.currentTxtlayFore?.pageText ?? ""), i.defTmp("const.sn.last_page_plain_text", () => this.currentTxtlayFore?.pagePlainText ?? ""), x.isDbg && (K.init(s, r, o, f, t, this.#s), this.cvsResizeDesign = () => K.cvsResizeDesign(), r.addHook((a, y) => {
      this.#y[a]?.(a, y) && delete this.#y[a];
    }));
  }
  #e;
  #t = new U();
  #i = new U();
  #o;
  #c;
  #l;
  #x = new tt();
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
      (this.#f = new G()).beginFill(e).lineStyle(0, e).drawRect(0, 0, x.stageW, x.stageH).endFill()
    );
  }
  #d;
  setEvtMng(t) {
    this.#d = t, this.#o.setEvtMng(t), I.setEvtMng(t), _.init(t, this.appPixi);
  }
  destroy() {
    for (const t of Object.values(this.#s)) t.destroy();
    this.#x.clear(), X.destroy(), ct.destroy(), ot.destroy(), $.destroy(), this.#o.destroy(), _.destroy(), $.msecChWait = 10;
  }
  // 既存の全文字レイヤの実際のバック不透明度、を再計算
  #N(t) {
    for (const e of this.#r) {
      const { fore: s, back: i } = this.#s[e];
      s instanceof $ && (s.chgBackAlpha(t), i.chgBackAlpha(t));
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
    return this.currentTxtlayFore ? this.#r.map((t) => this.#s[t].fore).some((t) => t instanceof $ && t.click()) : !1;
  }
  //	//	システム
  //MARK: スナップショット
  #S(t) {
    const e = et("-", "_", "", "_"), s = t.fn ? t.fn.startsWith(lt) ? t.fn : `${Q + t.fn + e}.png` : `${Q}snapshot${e}.png`, i = this.cfg.searchPath(s), n = v(t, "width", x.stageW), o = v(t, "height", x.stageH);
    return this.#w(t, i, n, o, `snapshot dt:${e}`);
  }
  #w = () => !1;
  #B({ layer: t }, e, s, i, n) {
    if (this.#o.hideAllFrame(), C.beginProc(n), !t)
      return this.sys.capturePage(e, s, i, () => {
        this.#o.restoreAllFrame(), C.endProc(n);
      }), !0;
    const o = this.#r.map((r) => {
      const { ctn: l } = this.#s[r].fore, f = [l, l.visible];
      return l.visible = !1, f;
    });
    for (const r of this.#p(t)) this.#s[r].fore.ctn.visible = !0;
    return this.sys.capturePage(e, s, i, () => {
      for (const [r, l] of o) r.visible = l;
      this.#o.restoreAllFrame(), C.endProc(n);
    }), !0;
  }
  #W(t, e, s, i, n) {
    C.beginProc(n);
    const o = st(t, "b_color", this.#c), r = it({
      width: s,
      height: i,
      backgroundAlpha: o > 16777216 && e.endsWith(".png") ? 0 : 1,
      antialias: w(t, "smoothing", !1),
      preserveDrawingBuffer: !0,
      backgroundColor: o & 16777215,
      autoDensity: !0
    }), l = t.page !== "back" ? "fore" : "back", { layer: f } = t;
    return Promise.allSettled(
      this.#p(f).map((d) => new Promise(
        (h) => this.#s[d][l].snapshot(r, h)
      ))
    ).then(async () => {
      const d = B.create({ width: r.width, height: r.height });
      r.render(this.#e, { renderTexture: d }), await this.sys.savePic(
        e,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        r.plugins.extract.base64(d)
      ), d.destroy();
      for (const h of this.#p(f)) this.#s[h][l].snapshot_end();
      r.destroy(!0), C.endProc(n);
    }), !0;
  }
  //MARK: プラグインの読み込み
  #O(t) {
    const { fn: e } = t;
    if (!e) throw "fnは必須です";
    if (!e.endsWith(".css")) throw "サポートされない拡張子です";
    const s = w(t, "join", !0), i = C.procID + `loadplugin fn:${e}`;
    return s && C.beginProc(i), (async () => {
      const n = await fetch(e);
      if (!n.ok) throw new Error("Network response was not ok.");
      at(await n.text()), s && C.endProc(i);
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
    switch (this.#s[e] = new R(e, s, this.#t, this.#i, t, this.sys, this.val, i), this.#r.push(e), s) {
      case "txt":
        this.#v || (this.#$ = () => {
        }, this.#h = (n) => this.#Q(n), this.#D = (n) => this.#Z(n), this.hTag.current({ layer: e }), this.goTxt = () => {
          this.#d.isSkipping ? $.msecChWait = 0 : this.setNormalChWait();
          for (const n of this.#r) {
            const o = this.#s[n].fore;
            o instanceof $ && this.#n("gotxt｜", o, !1);
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
    if (w(t, "float", !1))
      this.#i.setChildIndex(i, this.#i.children.length - 1), this.#t.setChildIndex(n, this.#t.children.length - 1), this.#V();
    else if (t.index)
      v(t, "index", 0) && (this.#i.setChildIndex(i, t.index), this.#t.setChildIndex(n, t.index), this.#V());
    else if (t.dive) {
      const { dive: o } = t;
      let r = 0;
      if (e === o) throw "[lay] 属性 layerとdiveが同じ【" + o + "】です";
      const l = this.#s[o];
      if (!l) throw "[lay] 属性 dive【" + o + "】が不正です。レイヤーがありません";
      const f = l.back, d = l.fore, h = this.#i.getChildIndex(f.ctn), p = this.#t.getChildIndex(d.ctn);
      r = h < p ? h : p, r > this.#i.getChildIndex(i) && --r, this.#t.setChildIndex(n, r), this.#i.setChildIndex(i, r), this.#V();
    }
    return t[":id_tag"] = s.fore.name.slice(0, -7), this.scrItr.recodeDesign(t), s.lay(t);
  }
  #V() {
    this.#r = this.#U();
  }
  //MARK: レイヤ設定の消去
  #H(t) {
    return this.#C(t, (e) => {
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
  #L = B.create({
    width: x.stageW,
    height: x.stageH
  });
  #T = new q(this.#L);
  #g = B.create({
    width: x.stageW,
    height: x.stageH
  });
  #a = new q(this.#g);
  //MARK: ページ裏表を交換
  #G(t) {
    const { layer: e } = t, s = /* @__PURE__ */ new Set(), i = this.#p(e).map((m) => (s.add(m), this.#s[m].fore)), n = () => {
      [this.#t, this.#i] = [this.#i, this.#t];
      const m = [];
      for (const [N, L] of Object.entries(this.#s)) {
        if (s.has(N)) {
          L.transPage(m);
          continue;
        }
        const { fore: { ctn: T }, back: { ctn: E } } = L, z = this.#t.getChildIndex(E);
        this.#t.removeChild(E), this.#i.removeChild(T), this.#t.addChildAt(T, z), this.#i.addChildAt(E, z);
      }
      Promise.allSettled(m).then(() => {
        this.#t.visible = !0, this.#i.visible = !1, this.#T.visible = !1, this.#a.visible = !1, C.notifyEndProc(J + P);
      });
    };
    if (this.#a.filters = [], this.#a.alpha = 1, v(t, "time", 0) === 0 || this.#d.isSkipping)
      return C.beginProc(J + P, () => {
      }), queueMicrotask(() => n()), !0;
    const r = [], l = this.#r.map((m) => {
      const { fore: N, back: L } = this.#s[m], T = s.has(m) ? L : N;
      return T.ctn.visible && r.push(T.ctn), T;
    }), { ticker: f, renderer: d } = this.appPixi;
    d.render(this.#i, { renderTexture: this.#L });
    let h = () => {
      for (const m of r) d.render(
        m,
        { renderTexture: this.#L, clear: !1 }
      );
    };
    if (!l.some((m) => m.containMovement)) {
      const m = h;
      h = () => {
        h = () => {
        }, m();
      };
    }
    const p = () => d.render(this.#t, { renderTexture: this.#g });
    p();
    let c = () => {
      this.#t.visible = !0, p(), this.#t.visible = !1;
    };
    if (!i.some((m) => m.containMovement)) {
      const m = c;
      c = () => {
        c = () => {
        }, m();
      };
    }
    const a = () => {
      h(), this.#T.visible = !0, c(), this.#a.visible = !0;
    }, { glsl: y, rule: k } = t, b = () => {
      f.remove(a), n();
    };
    if (!y && !k)
      return _.tween(P, t, this.#a, { alpha: 0 }, () => {
      }, b, () => {
      }), f.add(a), !1;
    const g = {
      rule: nt.EMPTY,
      vague: v(t, "vague", 0.04),
      tick: 0
    };
    this.#a.filters = [new rt(
      void 0,
      y ?? M.#F,
      g
    )];
    const S = _.tween(P, t, g, { tick: 1 }, () => {
    }, b, () => {
    }, !k);
    return k ? new I(k, void 0, (m) => {
      g.rule = m.texture, m.destroy(), S.start(), f.add(a);
    }, (m) => {
      m && this.main.resume();
    }).ret : (f.add(a), !1);
  }
  #p(t = "") {
    return t ? t.split(",") : this.#r;
  }
  #C(t, e) {
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
      s instanceof $ && s.lay({ style: t });
    }
  }
  //MARK: 画面を揺らす
  #q(t) {
    if (v(t, "time", NaN) === 0) return !1;
    const e = this.#p(t.layer).map((d) => this.#s[d].fore.ctn), { renderer: s, ticker: i } = this.appPixi;
    this.#g.resize(x.stageW, x.stageH);
    const n = () => {
      this.#t.visible = !0;
      for (const d of e) s.render(
        d,
        { renderTexture: this.#g, clear: !1 }
      );
      this.#t.visible = !1;
    };
    this.#a.visible = !0, this.#a.alpha = 1;
    const o = W(v(t, "hmax", 10)), r = W(v(t, "vmax", 10)), l = o === 0 ? () => {
    } : () => {
      this.#a.x = Math.round(Math.random() * o * 2) - o;
    }, f = r === 0 ? () => {
    } : () => {
      this.#a.y = Math.round(Math.random() * r * 2) - r;
    };
    return this.#a.filters = [], _.tween(P, t, this.#a, { x: 0, y: 0 }, () => {
      l(), f();
    }, () => {
      i.remove(n), this.#t.visible = !0, this.#a.visible = !1, this.#a.x = 0, this.#a.y = 0;
    }, () => {
    }), i.add(n), !1;
  }
  //MARK: トゥイーン開始
  #Y(t) {
    const { layer: e, render: s, name: i } = t;
    if (!e) throw "layerは必須です";
    const n = this.#s[this.#u(t)], o = n.fore;
    let r = () => {
    };
    s && !this.#d.isSkipping && (o.renderStart(), r = () => o.renderEnd());
    const l = _.cnvTweenArg(t, o), f = w(t, "arrive", !1), d = w(t, "backlay", !1), h = n.back.ctn;
    return _.tween(i ?? e, t, o, _.cnvTweenArg(t, o), () => {
    }, r, () => {
      if (f && Object.assign(o, l), d) for (const p of Object.keys(_.hMemberCnt)) h[p] = o[p];
    }), "filter" in t && (o.ctn.filters = [Y.bldFilters(t)], o.aFltHArg = [t]), !1;
  }
  //MARK: フィルター追加
  #J(t) {
    return this.#C(t, (e) => {
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
    s.filters ??= [], s.filters = [...s.filters, Y.bldFilters(e)], t.aFltHArg.push(e);
  }
  //MARK: フィルター全削除
  #X(t) {
    return this.#C(t, (e) => {
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
    return this.#C(t, (e) => {
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
    const i = W(v(e, "index", 0)), n = s.filters.length;
    if (n <= i) throw `フィルターの個数（${String(n)}）を越えています`;
    t.aFltHArg[i].enabled = s.filters[i].enabled = w(e, "enabled", !0);
  }
  //	// 文字・文字レイヤ
  //MARK: 文字を追加する
  #I(t) {
    const { text: e } = t;
    if (!e) throw "textは必須です";
    const s = this.#h(t);
    delete t.text, this.setNormalChWait(), this.#d.isSkipping ? t.wait = 0 : "wait" in t && v(t, "wait", NaN), this.#n("add｜" + V(t), s);
    const i = w(t, "record", !0), n = this.val.doRecLog();
    return i || this.val.setVal_Nochk("save", "sn.doRecLog", i), s.tagCh(e.replaceAll("[r]", `
`)), this.val.setVal_Nochk("save", "sn.doRecLog", n), this.#n("add_close｜", s), !1;
  }
  #h = (t) => {
    throw this.#$(), 0;
  };
  #Q(t) {
    const e = this.#u(t, this.#v), i = this.#s[e].getPage(t);
    if (!(i instanceof $)) throw e + "はTxtLayerではありません";
    return i;
  }
  setNormalChWait() {
    $.msecChWait = this.scrItr.normalWait;
  }
  //MARK: 操作対象のメッセージレイヤの指定
  #D = (t) => {
    throw this.#$(), 0;
  };
  #Z(t) {
    const { layer: e } = t;
    if (!e) throw "[current] layerは必須です";
    const s = this.#s[e];
    if (!s || !(s.getPage(t) instanceof $)) throw `${e}はTxtLayerではありません`;
    this.#k = s, this.#l.pagebreak(), this.#v = e, this.val.setVal_Nochk("save", "const.sn.mesLayer", e);
    for (const i of this.#r) {
      const { fore: n, back: o } = this.#s[i];
      n instanceof $ && (n.isCur = o.isCur = i === e);
    }
    return !1;
  }
  get currentTxtlayForeNeedErr() {
    return this.#$(), this.currentTxtlayFore;
  }
  get currentTxtlayFore() {
    return this.#k ? this.#k.fore : null;
  }
  #k = void 0;
  // カレントテキストレイヤ
  #$ = () => {
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
    return w(t, "rec_page_break", !0) && this.#l.pagebreak(), this.#k && (this.#k.fore.clearLay(t), this.#k.back.clearLay(t)), !1;
  }
  //MARK: インライン画像表示
  #et(t) {
    if (!t.pic) throw "[graph] picは必須です";
    return this.#n("grp｜" + V(t), this.#h(t)), !1;
  }
  //MARK: ハイパーリンク
  #st(t) {
    if (!t.fn && !t.label && !t.url) throw "fn,label,url いずれかは必須です";
    return t.fn ??= this.scrItr.scriptFn, t.style ??= "background-color: rgba(255,0,0,0.5);", t.style_hover ??= "background-color: rgba(255,0,0,0.9);", t.style_clicked ??= t.style, this.#n("link｜" + V(t), this.#h(t)), !1;
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
    return this.#n("span｜" + V(t), this.#h(t)), !1;
  }
  //MARK: tcy縦中横を表示する
  #rt(t) {
    if (!t.t) throw "[tcy] tは必須です";
    return this.#n("tcy｜" + V(t), this.#h(t)), !1;
  }
  //MARK: レイヤのダンプ
  #ot({ layer: t }) {
    console.group("🥟 [dump_lay]");
    for (const e of this.#p(t)) {
      const { fore: s, back: i } = this.#s[e];
      try {
        console.info(
          `%c${s.name.slice(0, -7)} %o`,
          `color:#${x.isDarkMode ? "49F" : "05A"};`,
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
    const e = this.#u(t, this.#v), s = w(t, "enabled", !0);
    return this.#h(t).enabled = s, this.val.setVal_Nochk("save", "const.sn.layer." + e + ".enabled", s), !1;
  }
  //MARK: ボタンを表示
  #lt(t) {
    return R.argChk_page(t, "back"), t.fn ??= this.scrItr.scriptFn, this.#h(t).addButton(t), this.scrItr.recodeDesign(t), !1;
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
    for (const [n, { fore: o, fore: { idx: r }, back: l, cls: f }] of Object.entries(t)) {
      s.push({ ln: n, idx: r });
      const d = this.#s[n] ??= new R(n, f, this.#t, this.#i, {}, this.sys, this.val, { isWait: !1 });
      d.fore.playback(o, e), d.back.playback(l, e);
    }
    const i = this.#t.children.length;
    return e.push(new Promise((n) => {
      for (const { ln: o, idx: r } of s.sort(({ idx: l }, { idx: f }) => l === f ? 0 : l < f ? -1 : 1)) {
        const l = this.#s[o];
        if (!l) continue;
        const f = i > r ? r : i - 1, { fore: d, back: h } = l;
        this.#t.setChildIndex(d.ctn, f), this.#i.setChildIndex(h.ctn, f);
      }
      n();
    })), e;
  }
}
export {
  M as LayerMng
};
//# sourceMappingURL=LayerMng.js.map
