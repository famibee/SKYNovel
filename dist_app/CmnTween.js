import { k as E, e as P, a as T } from "./app2.js";
import { u as L, E as n, b as N, T as k, a as x } from "./Reading.js";
const S = `trans
`, B = "tsy nm:";
class $ {
  static #t = {};
  static #s;
  static #i;
  static init(t, i) {
    this.#t = {}, this.#s = t, this.#i = i, this.#i.ticker.add(this.#a);
  }
  static #a = () => L();
  static destroy() {
    this.stopAllTw(), this.#i.ticker.remove(this.#a);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static setTwProp(t, i) {
    const s = E(i, "repeat", 1);
    return t.delay(E(i, "delay", 0)).easing(this.ease(i.ease)).repeat(s > 0 ? s - 1 : 1 / 0).yoyo(P(i, "yoyo", !1));
  }
  static #e = {
    "Back.In": (t) => n.Back.In(t),
    "Back.InOut": (t) => n.Back.InOut(t),
    "Back.Out": (t) => n.Back.Out(t),
    "Bounce.In": (t) => n.Bounce.In(t),
    "Bounce.InOut": (t) => n.Bounce.InOut(t),
    "Bounce.Out": (t) => n.Bounce.Out(t),
    "Circular.In": (t) => n.Circular.In(t),
    "Circular.InOut": (t) => n.Circular.InOut(t),
    "Circular.Out": (t) => n.Circular.Out(t),
    "Cubic.In": (t) => n.Cubic.In(t),
    "Cubic.InOut": (t) => n.Cubic.InOut(t),
    "Cubic.Out": (t) => n.Cubic.Out(t),
    "Elastic.In": (t) => n.Elastic.In(t),
    "Elastic.InOut": (t) => n.Elastic.InOut(t),
    "Elastic.Out": (t) => n.Elastic.Out(t),
    "Exponential.In": (t) => n.Exponential.In(t),
    "Exponential.InOut": (t) => n.Exponential.InOut(t),
    "Exponential.Out": (t) => n.Exponential.Out(t),
    "Linear.None": (t) => n.Linear.None(t),
    "Quadratic.In": (t) => n.Quadratic.In(t),
    "Quadratic.InOut": (t) => n.Quadratic.InOut(t),
    "Quadratic.Out": (t) => n.Quadratic.Out(t),
    "Quartic.In": (t) => n.Quartic.In(t),
    "Quartic.InOut": (t) => n.Quartic.InOut(t),
    "Quartic.Out": (t) => n.Quartic.Out(t),
    "Quintic.In": (t) => n.Quintic.In(t),
    "Quintic.InOut": (t) => n.Quintic.InOut(t),
    "Quintic.Out": (t) => n.Quintic.Out(t),
    "Sinusoidal.In": (t) => n.Sinusoidal.In(t),
    "Sinusoidal.InOut": (t) => n.Sinusoidal.InOut(t),
    "Sinusoidal.Out": (t) => n.Sinusoidal.Out(t)
  };
  static ease(t) {
    if (!t) return (s) => n.Linear.None(s);
    const i = this.#e[t];
    if (!i) throw "異常なease指定です";
    return i;
  }
  static aLayerPrpNm = [
    "alpha",
    "height",
    "rotation",
    // rotationX〜Z、scaleZ、zは設定すると
    "scale_x",
    // 三次元方向の拡大縮小ルーチンが働き画像がぼやけるので
    "scale_y",
    // backlayで設定しない方針
    "pivot_x",
    "pivot_y",
    "width",
    "x",
    "y"
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static cnvTweenArg(t, i) {
    const s = {};
    for (const a of $.aLayerPrpNm) {
      const c = t[a];
      if (!c) continue;
      const r = String(c), p = r.startsWith("="), h = p ? r.slice(1) : r;
      if (!h) continue;
      const [d = "0", o] = h.split(","), u = s[a] = parseFloat(d);
      o && (s[a] += Math.round(
        Math.random() * (parseFloat(o) - u + 1)
      )), p && (s[a] += parseFloat(i[a]));
    }
    return s;
  }
  // トゥイーン全停止
  static stopAllTw() {
    this.#t = {}, N();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static tween(t, i, s, a, c, r, p, h = !0) {
    const d = this.#s.isSkipping ? 0 : E(i, "time", NaN), o = new k(s).to(a, d).onUpdate((e) => c(e));
    this.setTwProp(o, i), this.#t[t] = { tw: o, onEnd: p };
    const { path: u } = i;
    let f = o;
    if (u) {
      T.debugLog && console.group(`🍝 [${i[":タグ名"] ?? ""}] path=${u}= start(${String(s.x)},${String(s.y)},${String(s.alpha)})`);
      for (const { groups: e } of u.matchAll(this.#o)) {
        const { x: w, x2: _, y, y2: Q, o: g, o2: C, json: I } = e;
        let l = {};
        if (I) try {
          l = JSON.parse(I);
        } catch (v) {
          console.error(`🍝 json=${I} ` + String(v));
          continue;
        }
        else
          (w ?? _) && (l.x = w ?? _), (y ?? Q) && (l.y = y ?? Q), (g ?? C) && (l.alpha = Number(g ?? C));
        const b = this.cnvTweenArg(l, s);
        T.debugLog && console.info(`🍝 ${I ?? `{x:${String(w)} y:${String(y)} o:${String(g)}}`} => hTo:${JSON.stringify(b)}`);
        const m = new k(s).to(b, d);
        this.setTwProp(m, i), f.chain(m), f = m;
      }
      T.debugLog && console.groupEnd();
    }
    f.onComplete(() => {
      const e = this.#t[t];
      e?.tw && (delete this.#t[t], e.tw = void 0, o.stop(), e.onEnd?.(), r(), x.notifyEndProc(B + t));
    });
    const { chain: O } = i;
    if (O) {
      const e = this.#t[O];
      if (!e?.tw) throw `${O}は存在しない・または終了したトゥイーンです`;
      delete e.onEnd, e.tw.chain(o);
    } else h && o.start();
    return o;
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
  static #o = /\(\s*(?:(?<x>[-=\d.]+)|(['"])(?<x2>.*?)\2)?(?:\s*,\s*(?:(?<y>[-=\d.]+)|(['"])(?<y2>.*?)\5)?(?:\s*,\s*(?:(?<o>[-=\d.]+)|(['"])(?<o2>.*?)\8))?)?|(?<json>\{[^{}]*})/g;
  // トランス終了待ち
  static wt(t) {
    if (!this.#t[S]?.tw) return !1;
    const s = () => this.stopEndTrans();
    return x.beginProc(S, s, !0, s), !0;
  }
  // レイヤのトランジションの停止
  static stopEndTrans() {
    this.#t[S]?.tw?.stop().end();
  }
  // stop()とend()は別
  // トゥイーン終了待ち
  static wait_tsy(t) {
    const i = this.#n(t), s = this.#t[i];
    if (!s?.tw) return !1;
    const a = () => s.tw?.end();
    return x.beginProc(B + i, a, !0, a), !0;
  }
  static #n(t) {
    const { layer: i = "", id: s, name: a } = t, c = s ? `frm
${s}` : a ?? i;
    if (!c) throw "トゥイーンが指定されていません";
    return c;
  }
  // トゥイーン中断
  static stop_tsy(t) {
    const i = this.#n(t);
    return this.#t[i]?.tw?.stop().end(), !1;
  }
  // 一時停止
  static pause_tsy(t) {
    const i = this.#n(t);
    return this.#t[i]?.tw?.pause(), !1;
  }
  // 一時停止再開
  static resume_tsy(t) {
    const i = this.#n(t);
    return this.#t[i]?.tw?.resume(), !1;
  }
}
export {
  $ as C,
  S as T
};
//# sourceMappingURL=CmnTween.js.map
