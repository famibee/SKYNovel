import { l as _, e as $, a as x } from "./web2.js";
import { u as P, E as i, b as L, T as k, a as d } from "./Reading.js";
const h = `trans
`, w = "tsy nm:";
class F {
  static #t = {};
  static #s;
  static #i;
  static init(t, n) {
    this.#t = {}, this.#s = t, this.#i = n, this.#i.ticker.add(this.#e);
  }
  static #e = () => P();
  static destroy() {
    this.stopAllTw(), this.#i.ticker.remove(this.#e);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static setTwProp(t, n) {
    const s = _(n, "repeat", 1);
    return t.delay(_(n, "delay", 0)).easing(this.ease(n.ease)).repeat(s > 0 ? s - 1 : 1 / 0).yoyo($(n, "yoyo", !1));
  }
  static #o = {
    "Back.In": (t) => i.Back.In(t),
    "Back.InOut": (t) => i.Back.InOut(t),
    "Back.Out": (t) => i.Back.Out(t),
    "Bounce.In": (t) => i.Bounce.In(t),
    "Bounce.InOut": (t) => i.Bounce.InOut(t),
    "Bounce.Out": (t) => i.Bounce.Out(t),
    "Circular.In": (t) => i.Circular.In(t),
    "Circular.InOut": (t) => i.Circular.InOut(t),
    "Circular.Out": (t) => i.Circular.Out(t),
    "Cubic.In": (t) => i.Cubic.In(t),
    "Cubic.InOut": (t) => i.Cubic.InOut(t),
    "Cubic.Out": (t) => i.Cubic.Out(t),
    "Elastic.In": (t) => i.Elastic.In(t),
    "Elastic.InOut": (t) => i.Elastic.InOut(t),
    "Elastic.Out": (t) => i.Elastic.Out(t),
    "Exponential.In": (t) => i.Exponential.In(t),
    "Exponential.InOut": (t) => i.Exponential.InOut(t),
    "Exponential.Out": (t) => i.Exponential.Out(t),
    "Linear.None": (t) => i.Linear.None(t),
    "Quadratic.In": (t) => i.Quadratic.In(t),
    "Quadratic.InOut": (t) => i.Quadratic.InOut(t),
    "Quadratic.Out": (t) => i.Quadratic.Out(t),
    "Quartic.In": (t) => i.Quartic.In(t),
    "Quartic.InOut": (t) => i.Quartic.InOut(t),
    "Quartic.Out": (t) => i.Quartic.Out(t),
    "Quintic.In": (t) => i.Quintic.In(t),
    "Quintic.InOut": (t) => i.Quintic.InOut(t),
    "Quintic.Out": (t) => i.Quintic.Out(t),
    "Sinusoidal.In": (t) => i.Sinusoidal.In(t),
    "Sinusoidal.InOut": (t) => i.Sinusoidal.InOut(t),
    "Sinusoidal.Out": (t) => i.Sinusoidal.Out(t)
  };
  static ease(t) {
    if (!t) return (s) => i.Linear.None(s);
    const n = this.#o[t];
    if (!n) throw "異常なease指定です";
    return n;
  }
  static hMemberCnt = {
    alpha: 0,
    height: 0,
    rotation: 0,
    // rotationX〜Z、scaleZ、zは設定すると
    scale_x: 0,
    // 三次元方向の拡大縮小ルーチンが働き画像がぼやけるので
    scale_y: 0,
    // backlayで設定しない方針
    pivot_x: 0,
    pivot_y: 0,
    width: 0,
    x: 0,
    y: 0
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static cnvTweenArg(t, n) {
    const s = {};
    for (const e of Object.keys(this.hMemberCnt)) {
      const c = t[e];
      if (!c) continue;
      const r = String(c), p = r.startsWith("="), f = p ? r.slice(1) : r;
      if (!f) continue;
      const [I, a] = f.split(","), u = s[e] = parseFloat(I);
      a && (s[e] += Math.round(
        Math.random() * (parseFloat(a) - u + 1)
      )), p && (s[e] += parseFloat(n[e]));
    }
    return s;
  }
  // トゥイーン全停止
  static stopAllTw() {
    this.#t = {}, L();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static tween(t, n, s, e, c, r, p, f = !0) {
    const I = this.#s.isSkipping ? 0 : _(n, "time", NaN), a = new k(s).to(e, I).onUpdate(c);
    this.setTwProp(a, n), this.#t[t] = { tw: a, onEnd: p };
    const { path: u } = n;
    let y = a;
    if (u) {
      x.debugLog && console.group(`🍝 [${n[":タグ名"]}] path=${u}= start(${s.x},${s.y},${s.alpha})`);
      for (const { groups: o } of u.matchAll(this.#c)) {
        const { x: T, x2: b, y: g, y2: Q, o: E, o2: v, json: O } = o;
        let l = {};
        if (O) try {
          l = JSON.parse(O);
        } catch (B) {
          console.error(`🍝 json=${O} ` + String(B));
          continue;
        }
        else
          (T ?? b) && (l.x = T ?? b), (g ?? Q) && (l.y = g ?? Q), (E ?? v) && (l.alpha = Number(E ?? v));
        const S = this.cnvTweenArg(l, s);
        x.debugLog && console.info(`🍝 ${// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        O ?? `{x:${T} y:${g} o:${E}}`} => hTo:${JSON.stringify(S)}`);
        const C = new k(s).to(S, I);
        this.setTwProp(C, n), y.chain(C), y = C;
      }
      x.debugLog && console.groupEnd();
    }
    y.onComplete(() => {
      const o = this.#t[t];
      o?.tw && (delete this.#t[t], o.tw = void 0, a.stop(), o.onEnd?.(), r(), d.notifyEndProc(w + t));
    });
    const { chain: m } = n;
    if (m) {
      const o = this.#t[m];
      if (!o?.tw) throw `${m}は存在しない・または終了したトゥイーンです`;
      delete o.onEnd, o.tw.chain(a);
    } else f && a.start();
    return a;
  }
  // 11 match 301 step (0.1ms) PCRE2 https://regex101.com/r/reinpq/1
  // List ${x}${x2}/${y}${y2}/${o}${o2}=${json}\n
  /*
  \(\s*
  (?:	(?<x>[-=\d\.]+)	|	(['"])	(?<x2>.*?)	\2	)?
  (?:
  	\s*,\s*
  	(?:	(?<y>[-=\d\.]+)	|	(['"])	(?<y2>.*?)	\5	)?
  	(?:
  		\s*,\s*
  		(?:	(?<o>[-=\d\.]+)	|	(['"])	(?<o2>.*?)	\8	)
  
  	)?
  )?
  |
  (?<json>\{[^{}]*})
  */
  static #c = /\(\s*(?:(?<x>[-=\d.]+)|(['"])(?<x2>.*?)\2)?(?:\s*,\s*(?:(?<y>[-=\d.]+)|(['"])(?<y2>.*?)\5)?(?:\s*,\s*(?:(?<o>[-=\d.]+)|(['"])(?<o2>.*?)\8))?)?|(?<json>\{[^{}]*})/g;
  // トランス終了待ち
  static wt(t) {
    if (!this.#t[h]?.tw) return !1;
    const s = () => this.#a();
    return d.beginProc(w + h, s, !0, s), !0;
  }
  // レイヤのトランジションの停止
  static #a() {
    this.#t[h]?.tw?.stop().end();
  }
  // stop()とend()は別
  static async closeTrans() {
    if (!this.#t[h]?.tw) return;
    const { promise: n, resolve: s } = Promise.withResolvers();
    d.beginProc(w + h, s, !1, s), this.#a(), await n;
  }
  // トゥイーン終了待ち
  static wait_tsy(t) {
    const n = this.#n(t), s = this.#t[n];
    if (!s?.tw) return !1;
    const e = () => s.tw?.end();
    return d.beginProc(w + n, e, !0, e), !0;
  }
  static #n(t) {
    const { layer: n = "", id: s, name: e } = t, c = s ? `frm
${s}` : e ?? n;
    if (!c) throw "トゥイーンが指定されていません";
    return c;
  }
  // トゥイーン中断
  static stop_tsy(t) {
    const n = this.#n(t);
    return this.#t[n]?.tw?.stop().end(), !1;
  }
  // 一時停止
  static pause_tsy(t) {
    const n = this.#n(t);
    return this.#t[n]?.tw?.pause(), !1;
  }
  // 一時停止再開
  static resume_tsy(t) {
    const n = this.#n(t);
    return this.#t[n]?.tw?.resume(), !1;
  }
}
export {
  F as C,
  w as T,
  h as a
};
//# sourceMappingURL=CmnTween.js.map
