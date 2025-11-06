import { Q as b, L as v, U as O, S as x, n as h, j as L, y as w, b as V, M as A, B as H, x as y, e as Y, z as j, l as C } from "./web2.js";
import { D as F } from "./DebugMng.js";
import { a as N } from "./Reading.js";
class e {
  constructor(t = "", a, c = () => {
  }, n = () => {
  }) {
    this.csvFn = t, this.ctn = a, this.fncFirstComp = c, this.fncAllComp = n, t && (this.#i = a ? (o) => {
      a.addChild(o), this.#d.push(o);
    } : () => {
    }, this.ret = e.#E(
      t,
      (o) => this.fncFirstComp(o),
      // 差し替え考慮
      (o) => this.fncAllComp(o),
      // 差し替え考慮
      (o) => this.#i(o)
      // 差し替え考慮
    ));
  }
  static #n;
  static #f;
  static #e;
  static #r;
  static init(t, a, c, n, o) {
    e.#n = t, e.#f = a, e.#e = c, e.#r = n, c.arg.crypto && (e.#l = (d, f, u) => e.#T(d, f, u), e.#h = (d, f, u) => e.#P(d, f, u));
    const s = () => {
      const d = e.#o * e.#m;
      for (const f of Object.values(e.#t)) f.volume = d;
    };
    o.setNoticeChgVolume(
      (d) => {
        e.#o = d, s();
      },
      (d) => {
        e.#m = d, s();
      }
    );
  }
  static #m = 1;
  static #o = 1;
  static #s;
  static setEvtMng(t) {
    e.#s = t;
  }
  ret = !1;
  #i;
  #d = [];
  destroy() {
    this.fncFirstComp = () => {
    }, this.fncAllComp = () => {
    }, this.#i = (t) => t.destroy();
    for (const t of this.#d)
      e.stopVideo(t.name), t.parent?.removeChild(t), t.destroy();
    this.#d = [];
  }
  static destroy() {
    e.#c = {}, e.#a = {}, e.#t = {};
  }
  //static #ldrHFn: {[fn: string]: 1} = {};
  static #E(t, a, c, n) {
    if (!t) return !1;
    let o = !1;
    if (t.startsWith("data:")) {
      const i = () => {
        const l = y.from(t);
        n(l), a(l), c(o);
      };
      return t in b ? i() : (o = !0, new v().add(t, t).load(i)), o;
    }
    const s = [], d = new v();
    for (const i of t.split(",")) {
      if (!i) throw "face属性に空要素が含まれます";
      const { dx: l, dy: r, blendmode: E, fn: m } = e.#c[i] ?? {
        fn: i,
        dx: 0,
        dy: 0,
        blendmode: O.NORMAL
      };
      if (s.push({ fn: m, fnc: (P) => {
        P.transform && (P.x = l, P.y = r, P.blendMode = E);
      } }), m in e.#a || m in b || m in v.shared.resources) continue;
      o = !0;
      const T = e.#n.searchPath(m, x.SP_GSM), R = this.#e.arg.crypto ? { xhrType: T.endsWith(".json") ? h.XHR_RESPONSE_TYPE.TEXT : h.XHR_RESPONSE_TYPE.BUFFER } : {};
      d.add({ ...R, name: m, url: T });
    }
    const f = s.at(0);
    f && (f.fnc = a);
    const u = (i, l) => {
      for (const { fn: r, fnc: E } of s) {
        const m = e.#v(r, l);
        m.name = r, n(m), E(m);
      }
      c(o);
    };
    return o ? d.use((i, l) => {
      try {
        if (i.extension === "json") {
          this.#e.dec("json", i.data).then((r) => e.#h(r, i, l));
          return;
        }
        this.#e.decAB(i.data).then((r) => e.#l(r, i, l));
      } catch (r) {
        const E = `画像/動画ロード失敗です fn:${i.name} ${String(r)}`;
        e.#s.isSkipping ? console.warn(E) : console.error("%c" + E, "color:#FF3300;");
      }
    }).load(u) : queueMicrotask(() => u(0, {})), o;
  }
  static #c = {};
  static #a = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static #l = (t, { type: a, name: c, data: n }, o) => {
    switch (a) {
      case h.TYPE.VIDEO: {
        const s = n;
        s.volume = e.#o, e.#t[c] = e.#u(s);
      }
    }
    o();
  };
  static #y(t) {
    const a = /([^\d]+)\d+\.(\w+)/.exec(t[0] ?? "");
    if (!a) return [];
    const [, c = "", n = ""] = a, o = c.length, s = -n.length - 1;
    return t.sort((d, f) => L(d.slice(o, s)) > L(f.slice(o, s)) ? 1 : -1);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static #T(t, a, c) {
    if (a.data = t, a.extension !== "bin" && c(), t instanceof HTMLImageElement) {
      w.fromLoader(t, a.url, a.name).then((n) => {
        a.texture = n, a.type = h.TYPE.IMAGE;
      }), c();
      return;
    }
    t instanceof HTMLVideoElement && (t.volume = e.#o, e.#t[a.name] = e.#u(t), a.type = h.TYPE.VIDEO), c();
  }
  static #u(t) {
    return e.#f.getVal("const.sn.needClick2Play") && (F.trace_beforeNew(`[lay系] ${F.strPos()}未クリック状態で動画を自動再生します。音声はミュートされます`, "W"), t.muted = !0), t.setAttribute("playsinline", ""), t;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static #h = (t, { type: a, spritesheet: c, name: n, data: o }, s) => {
    switch (a) {
      case h.TYPE.JSON: {
        const d = c._frameKeys;
        e.#y(d), e.#a[n] = {
          aTex: d.map((f) => w.from(f)),
          meta: o.meta
        };
      }
    }
    s();
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static #P(t, a, c) {
    const { meta: n, frames: o } = a.data = JSON.parse(t);
    if (a.type = h.TYPE.JSON, !n?.image) {
      c();
      return;
    }
    const s = V(n.image), d = e.#n.searchPath(s, x.SP_GSM);
    new v().use((f, u) => {
      this.#e.decAB(f.data).then((i) => {
        f.data = i, i instanceof HTMLImageElement && (f.type = h.TYPE.IMAGE, URL.revokeObjectURL(i.src)), u();
      }).catch((i) => this.#r.errScript(`画像/動画ロード失敗です dec2res4Cripto fn:${f.name} ${String(i)}`, !1));
    }).add({ name: s, url: d, xhrType: h.XHR_RESPONSE_TYPE.BUFFER }).load((f, u) => {
      for (const { data: i } of Object.values(f.resources)) {
        const { baseTexture: l } = w.from(i), r = Object.values(o);
        e.#a[a.name] = {
          aTex: r.map(({ frame: { x: E, y: m, w: T, h: R } }) => new w(
            l,
            new A(E, m, T, R)
          )),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          meta: n
        };
      }
      c();
    });
  }
  static #v(t, a) {
    const c = e.#a[t];
    if (c) {
      const s = new H(c.aTex);
      return s.animationSpeed = c.meta.animationSpeed ?? 1, s.play(), s;
    }
    if (t in b) return y.from(t);
    const n = e.#t[t];
    if (n) return y.from(n);
    const o = a[t];
    return o ? new y(o.texture) : new y();
  }
  static #t = {};
  static getHFn2VElm(t) {
    return e.#t[t];
  }
  static wv(t) {
    const { fn: a } = t;
    if (!a) throw "fnは必須です";
    const c = e.#t[a];
    if (!c || c.loop) return !1;
    if (e.#s.isSkipping || c.ended)
      return e.stopVideo(a), !1;
    const n = "wv fn:" + a, o = Y(t, "stop", !0), s = () => {
      o && e.stopVideo(a);
    };
    return N.beginProc(n, s, !0, s), c.addEventListener("ended", () => N.notifyEndProc(n), { once: !0, passive: !0 }), !0;
  }
  static stopVideo(t) {
    const a = e.#t[t];
    a && (delete e.#t[t], a.pause(), a.currentTime = a.duration);
  }
  static add_face(t) {
    const { name: a } = t;
    if (!a) throw "nameは必須です";
    if (a in e.#c) throw "一つのname（" + a + "）に対して同じ画像を複数割り当てられません";
    const { fn: c = a } = t;
    return e.#c[a] = {
      fn: c,
      dx: C(t, "dx", 0),
      dy: C(t, "dy", 0),
      blendmode: j.getBlendmodeNum(t.blendmode ?? "")
    }, !1;
  }
  //	static	clearFace2Name(): void {SpritesMng.hFace = {}}
}
export {
  e as S
};
//# sourceMappingURL=SpritesMng.js.map
