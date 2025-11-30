import { Q as w, L as v, U as N, S as L, n as h, j as x, y as R, b as V, M as A, B as j, x as y, e as k, z as H, l as O } from "./web2.js";
import { D as C } from "./DebugMng.js";
import { a as F } from "./Reading.js";
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
  static #r;
  static #e;
  static #f;
  static init(t, a, c, n, o) {
    e.#n = t, e.#r = a, e.#e = c, e.#f = n, c.arg.crypto && (e.#l = (d, r, u) => e.#T(d, r, u), e.#h = (d, r, u) => e.#P(d, r, u));
    const s = () => {
      const d = e.#o * e.#m;
      for (const r of Object.values(e.#t)) r.volume = d;
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
      return t in w ? i() : (o = !0, new v().add(t, t).load(i)), o;
    }
    const s = [], d = new v();
    for (const i of t.split(",")) {
      if (!i) throw "face属性に空要素が含まれます";
      const { dx: l, dy: f, blendmode: E, fn: m } = e.#c[i] ?? {
        fn: i,
        dx: 0,
        dy: 0,
        blendmode: N.NORMAL
      };
      if (s.push({ fn: m, fnc: (P) => {
        P.transform && (P.x = l, P.y = f, P.blendMode = E);
      } }), m in e.#a || m in w || m in v.shared.resources) continue;
      o = !0;
      const T = e.#n.searchPath(m, L.SP_GSM), b = this.#e.arg.crypto ? { xhrType: T.endsWith(".json") ? h.XHR_RESPONSE_TYPE.TEXT : h.XHR_RESPONSE_TYPE.BUFFER } : {};
      d.add({ ...b, name: m, url: T });
    }
    const r = s.at(0);
    r && (r.fnc = a);
    const u = (i, l) => {
      for (const { fn: f, fnc: E } of s) {
        const m = e.#v(f, l);
        m.name = f, n(m), E(m);
      }
      c(o);
    };
    return o ? d.use((i, l) => {
      try {
        if (i.extension === "json") {
          this.#e.dec("json", i.data).then((f) => e.#h(f, i, l));
          return;
        }
        this.#e.decAB(i.data).then((f) => e.#l(f, i, l));
      } catch (f) {
        const E = `画像/動画ロード失敗です fn:${i.name} ${String(f)}`;
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
    return t.sort((d, r) => x(d.slice(o, s)) > x(r.slice(o, s)) ? 1 : -1);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static #T(t, a, c) {
    if (a.data = t, a.extension !== "bin" && c(), t instanceof HTMLImageElement) {
      R.fromLoader(t, a.url, a.name).then((n) => {
        a.texture = n, a.type = h.TYPE.IMAGE, c(), URL.revokeObjectURL(t.src);
      });
      return;
    }
    t instanceof HTMLVideoElement && (t.volume = e.#o, e.#t[a.name] = e.#u(t), a.type = h.TYPE.VIDEO), c();
  }
  static #u(t) {
    return e.#r.getVal("const.sn.needClick2Play") && (C.trace_beforeNew(`[lay系] ${C.strPos()}未クリック状態で動画を自動再生します。音声はミュートされます`, "W"), t.muted = !0), t.setAttribute("playsinline", ""), t;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static #h = (t, { type: a, spritesheet: c, name: n, data: o }, s) => {
    switch (a) {
      case h.TYPE.JSON: {
        const d = c._frameKeys;
        e.#y(d), e.#a[n] = {
          aTex: d.map((r) => R.from(r)),
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
    const s = V(n.image), d = e.#n.searchPath(s, L.SP_GSM);
    new v().use((r, u) => {
      this.#e.decAB(r.data).then((i) => {
        if (r.data = i, i instanceof HTMLImageElement) {
          r.type = h.TYPE.IMAGE, u(), URL.revokeObjectURL(i.src);
          return;
        }
        u();
      }).catch((i) => this.#f.errScript(`画像/動画ロード失敗です dec2res4Cripto fn:${r.name} ${String(i)}`, !1));
    }).add({ name: s, url: d, xhrType: h.XHR_RESPONSE_TYPE.BUFFER }).load((r, u) => {
      for (const { data: i } of Object.values(r.resources)) {
        const { baseTexture: l } = R.from(i), f = Object.values(o);
        e.#a[a.name] = {
          aTex: f.map(({ frame: { x: E, y: m, w: T, h: b } }) => new R(
            l,
            new A(E, m, T, b)
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
      const s = new j(c.aTex);
      return s.animationSpeed = c.meta.animationSpeed ?? 1, s.play(), s;
    }
    if (t in w) return y.from(t);
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
    const n = "wv fn:" + a, o = k(t, "stop", !0), s = () => {
      o && e.stopVideo(a);
    };
    return F.beginProc(n, s, !0, s), c.addEventListener("ended", () => F.notifyEndProc(n), { once: !0, passive: !0 }), !0;
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
      dx: O(t, "dx", 0),
      dy: O(t, "dy", 0),
      blendmode: H.getBlendmodeNum(t.blendmode ?? "")
    }, !1;
  }
  //	static	clearFace2Name(): void {SpritesMng.hFace = {}}
}
export {
  e as S
};
//# sourceMappingURL=SpritesMng.js.map
