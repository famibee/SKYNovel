import { b, a as N, C as k } from "./app2.js";
import { u as P, E as a, a as R, T as L } from "./ReadState.js";
class i {
  static #t = {};
  static #i;
  static #a;
  static init(t, o) {
    i.#t = {}, i.#i = t, i.#a = o, i.#a.ticker.add(i.#s);
  }
  static #s = () => P();
  static destroy() {
    i.stopAllTw(), i.#a.ticker.remove(i.#s);
  }
  static setTwProp(t, o) {
    const s = b(o, "repeat", 1);
    return t.delay(b(o, "delay", 0)).easing(i.ease(o.ease)).repeat(s > 0 ? s - 1 : 1 / 0).yoyo(N(o, "yoyo", !1));
  }
  static #o = {
    "Back.In": (t) => a.Back.In(t),
    "Back.InOut": (t) => a.Back.InOut(t),
    "Back.Out": (t) => a.Back.Out(t),
    "Bounce.In": (t) => a.Bounce.In(t),
    "Bounce.InOut": (t) => a.Bounce.InOut(t),
    "Bounce.Out": (t) => a.Bounce.Out(t),
    "Circular.In": (t) => a.Circular.In(t),
    "Circular.InOut": (t) => a.Circular.InOut(t),
    "Circular.Out": (t) => a.Circular.Out(t),
    "Cubic.In": (t) => a.Cubic.In(t),
    "Cubic.InOut": (t) => a.Cubic.InOut(t),
    "Cubic.Out": (t) => a.Cubic.Out(t),
    "Elastic.In": (t) => a.Elastic.In(t),
    "Elastic.InOut": (t) => a.Elastic.InOut(t),
    "Elastic.Out": (t) => a.Elastic.Out(t),
    "Exponential.In": (t) => a.Exponential.In(t),
    "Exponential.InOut": (t) => a.Exponential.InOut(t),
    "Exponential.Out": (t) => a.Exponential.Out(t),
    "Linear.None": (t) => a.Linear.None(t),
    "Quadratic.In": (t) => a.Quadratic.In(t),
    "Quadratic.InOut": (t) => a.Quadratic.InOut(t),
    "Quadratic.Out": (t) => a.Quadratic.Out(t),
    "Quartic.In": (t) => a.Quartic.In(t),
    "Quartic.InOut": (t) => a.Quartic.InOut(t),
    "Quartic.Out": (t) => a.Quartic.Out(t),
    "Quintic.In": (t) => a.Quintic.In(t),
    "Quintic.InOut": (t) => a.Quintic.InOut(t),
    "Quintic.Out": (t) => a.Quintic.Out(t),
    "Sinusoidal.In": (t) => a.Sinusoidal.In(t),
    "Sinusoidal.InOut": (t) => a.Sinusoidal.InOut(t),
    "Sinusoidal.Out": (t) => a.Sinusoidal.Out(t)
  };
  static ease(t) {
    if (!t) return (s) => a.Linear.None(s);
    const o = i.#o[t];
    if (!o) throw "異常なease指定です";
    return o;
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
  static cnvTweenArg(t, o) {
    const s = {};
    for (const c of Object.keys(i.hMemberCnt)) {
      const n = t[c];
      if (!n) continue;
      const e = String(n), I = e.startsWith("="), p = I ? e.slice(1) : e;
      if (!p) continue;
      const [O, r] = p.split(","), l = s[c] = parseFloat(O);
      r && (s[c] += Math.round(
        Math.random() * (parseFloat(r) - l + 1)
      )), I && (s[c] += parseFloat(o[c]));
    }
    return s;
  }
  // トゥイーン全停止
  static stopAllTw() {
    i.#t = {}, R();
  }
  static tween(t, o, s, c, n, e, I, p = !0) {
    const O = this.#i.isSkipping ? 0 : b(o, "time", NaN), r = new L(s).to(c, O).onUpdate(n);
    i.setTwProp(r, o), i.#t[t] = { tw: r, onEnd: I };
    const { path: l } = o;
    let y = r;
    if (l) {
      k.debugLog && console.group(`🍝 [${o[":タグ名"]}] path=${l}= start(${s.x},${s.y},${s.alpha})`);
      for (const { groups: u } of l.matchAll(i.#n)) {
        const { x: E, x2: v, y: x, y2: S, o: $, o2: g, json: d } = u;
        let f = {};
        if (d) try {
          f = JSON.parse(d);
        } catch (M) {
          console.error(`🍝 json=${d} ` + M);
          continue;
        }
        else
          (E ?? v) && (f.x = E ?? v), (x ?? S) && (f.y = x ?? S), ($ ?? g) && (f.alpha = $ ?? g);
        const B = i.cnvTweenArg(f, s);
        k.debugLog && console.info(`🍝 ${d ?? `{x:${E} y:${x} o:${$}}`} => hTo:${JSON.stringify(B)}`);
        const Q = new L(s).to(B, O);
        i.setTwProp(Q, o), y.chain(Q), y = Q;
      }
      k.debugLog && console.groupEnd();
    }
    y.onComplete(() => {
      const u = i.#t[t];
      u && (delete i.#t[t], u.tw = void 0, r.stop(), i.#i.breakEvent("tsy nm:" + t), u.onEnd?.(), e());
    });
    const { chain: h } = o;
    if (h) {
      const u = i.#t[h];
      if (!u?.tw) throw `${h}は存在しない・または終了したトゥイーンです`;
      delete u.onEnd, u.tw.chain(r);
    } else p && r.start();
    return r;
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
  static #n = /\(\s*(?:(?<x>[-=\d\.]+)|(['"])(?<x2>.*?)\2)?(?:\s*,\s*(?:(?<y>[-=\d\.]+)|(['"])(?<y2>.*?)\5)?(?:\s*,\s*(?:(?<o>[-=\d\.]+)|(['"])(?<o2>.*?)\8))?)?|(?<json>\{[^{}]*})/g;
  // トランス終了待ち
  static wt(t) {
    return i.#t[i.TW_INT_TRANS]?.tw ? i.#i.waitEvent("tsy nm:" + i.TW_INT_TRANS, t, () => i.finish_trans()) : !1;
  }
  static TW_INT_TRANS = `trans
`;
  // 改行でスクリプトから絶対指定できない値に
  // レイヤのトランジションの停止
  static finish_trans() {
    return i.#t[i.TW_INT_TRANS]?.tw?.stop().end(), !1;
  }
  // stop()とend()は別
  // トゥイーン終了待ち
  static wait_tsy(t) {
    const { layer: o = "", id: s, name: c } = t, n = s ? `frm
${s}` : c ?? o;
    if (!n) throw "トゥイーンが指定されていません";
    const e = i.#t[n];
    if (!e?.tw) {
      if (N(t, "chk_exist_tw", !1)) throw s ? `フレームトゥイーン ${s} が見つかりません。` : `トゥイーン ${n} が見つかりません。(layer:${o} name:${c})`;
      return !1;
    }
    return i.#i.waitEvent("tsy nm:" + n, t, () => e.tw?.end());
  }
  // トゥイーン中断
  static stop_tsy(t) {
    const { layer: o = "", id: s, name: c } = t, n = s ? `frm
${s}` : c ?? o;
    if (!n) throw "トゥイーンが指定されていません";
    return i.#t[n]?.tw?.stop().end(), !1;
  }
  // 一時停止
  static pause_tsy(t) {
    const { layer: o = "", id: s, name: c } = t, n = s ? `frm
${s}` : c ?? o;
    if (!n) throw "トゥイーンが指定されていません";
    return i.#t[n]?.tw?.pause(), !1;
  }
  // 一時停止再開
  static resume_tsy(t) {
    const { layer: o = "", id: s, name: c } = t, n = s ? `frm
${s}` : c ?? o;
    if (!n) throw "トゥイーンが指定されていません";
    return i.#t[n]?.tw?.resume(), !1;
  }
}
export {
  i as C
};
//# sourceMappingURL=CmnTween.js.map
