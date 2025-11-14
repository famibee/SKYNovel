import { k as T, e as P, a as g } from "./app2.js";
import { u as L, E as n, b as N, T as B, a as x } from "./Reading.js";
const _ = `trans
`, S = "tsy nm:";
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
    const s = T(i, "repeat", 1);
    return t.delay(T(i, "delay", 0)).easing(this.ease(i.ease)).repeat(s > 0 ? s - 1 : 1 / 0).yoyo(P(i, "yoyo", !1));
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
      const u = String(c), p = u.startsWith("="), h = p ? u.slice(1) : u;
      if (!h) continue;
      const [d = "0", e] = h.split(","), r = s[a] = parseFloat(d);
      e && (s[a] += Math.round(
        Math.random() * (parseFloat(e) - r + 1)
      )), p && (s[a] += parseFloat(i[a]));
    }
    return s;
  }
  // トゥイーン全停止
  static stopAllTw() {
    this.#t = {}, N();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static tween(t, i, s, a, c, u, p, h = !0) {
    const d = this.#s.isSkipping ? 0 : T(i, "time", NaN), e = new B(s).to(a, d).onUpdate(c);
    this.setTwProp(e, i), this.#t[t] = { tw: e, onEnd: p };
    const { path: r } = i;
    let f = e;
    if (r) {
      g.debugLog && console.group(`🍝 [${i[":タグ名"]}] path=${r}= start(${s.x},${s.y},${s.alpha})`);
      for (const { groups: o } of r.matchAll(this.#o)) {
        const { x: w, x2: Q, y, y2: C, o: m, o2: b, json: I } = o;
        let l = {};
        if (I) try {
          l = JSON.parse(I);
        } catch (v) {
          console.error(`🍝 json=${I} ` + String(v));
          continue;
        }
        else
          (w ?? Q) && (l.x = w ?? Q), (y ?? C) && (l.y = y ?? C), (m ?? b) && (l.alpha = Number(m ?? b));
        const k = this.cnvTweenArg(l, s);
        g.debugLog && console.info(`🍝 ${// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        I ?? `{x:${w} y:${y} o:${m}}`} => hTo:${JSON.stringify(k)}`);
        const E = new B(s).to(k, d);
        this.setTwProp(E, i), f.chain(E), f = E;
      }
      g.debugLog && console.groupEnd();
    }
    f.onComplete(() => {
      const o = this.#t[t];
      o?.tw && (delete this.#t[t], o.tw = void 0, e.stop(), o.onEnd?.(), u(), x.notifyEndProc(S + t));
    });
    const { chain: O } = i;
    if (O) {
      const o = this.#t[O];
      if (!o?.tw) throw `${O}は存在しない・または終了したトゥイーンです`;
      delete o.onEnd, o.tw.chain(e);
    } else h && e.start();
    return e;
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
    if (!this.#t[_]?.tw) return !1;
    const s = () => this.stopEndTrans();
    return x.beginProc(_, s, !0, s), !0;
  }
  // レイヤのトランジションの停止
  static stopEndTrans() {
    this.#t[_]?.tw?.stop().end();
  }
  // stop()とend()は別
  // トゥイーン終了待ち
  static wait_tsy(t) {
    const i = this.#n(t), s = this.#t[i];
    if (!s?.tw) return !1;
    const a = () => s.tw?.end();
    return x.beginProc(S + i, a, !0, a), !0;
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
  _ as T
};
//# sourceMappingURL=CmnTween.js.map
