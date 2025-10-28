import { d as b, e as m } from "./web2.js";
import { I as v, S as f, R as r, B as n, a as u } from "./SndBuf.js";
class V {
  constructor(s, t, o, i, l) {
    this.val = o, t.volume = (e) => this.#c(e), t.fadebgm = (e) => this.#n(e), t.fadeoutbgm = (e) => this.#m(e), t.fadeoutse = (e) => this.#b(e), t.fadese = (e) => this.#t(e), t.playbgm = (e) => this.#u(e), t.playse = (e) => this.#i(e), t.stop_allse = () => this.#e(), t.stopbgm = (e) => this.#v(e), t.stopse = (e) => this.#o(e), t.wb = (e) => this.#d(e), t.wf = (e) => this.#a(e), t.stopfadese = (e) => this.#f(e), t.wl = (e) => this.#p(e), t.ws = (e) => this.#r(e), t.xchgbuf = (e) => this.#_(e), o.setVal_Nochk("save", "const.sn.loopPlaying", "{}"), o.setVal_Nochk("tmp", "const.sn.sound.codecs", JSON.stringify(v.supported)), f.init(s, o, i, l, this.#s), r.disableAutoPause = !0;
  }
  #s = {};
  #l;
  setEvtMng(s) {
    this.#l = s, f.setEvtMng(s);
  }
  setNoticeChgVolume(s, t) {
    this.val.defValTrg("sys:sn.sound.global_volume", (o, i) => s(r.volumeAll = Number(i))), this.val.defValTrg("sys:sn.sound.movie_volume", (o, i) => t(Number(i))), this.val.setVal_Nochk("sys", "sn.sound.global_volume", this.val.getVal("sys:sn.sound.global_volume", 1)), this.val.setVal_Nochk("sys", "sn.sound.movie_volume", this.val.getVal("sys:sn.sound.movie_volume", 1));
  }
  //MARK: 音量設定（独自拡張）
  #c(s) {
    const { buf: t = n } = s, o = "const.sn.sound." + t + ".volume", i = this.#h(s, 1);
    return Number(this.val.getVal("sys:" + o)) === i ? !1 : (this.val.setVal_Nochk("sys", o, i), this.val.flush(), s.time = 0, s.volume = Number(this.val.getVal("save:" + o)), this.#t(s));
  }
  #h(s, t) {
    const o = b(s, "volume", t);
    return o < 0 ? 0 : o > 1 ? 1 : o;
  }
  //MARK: BGM/効果音のフェードアウト（loadから使うのでマクロ化禁止）
  #m(s) {
    return s.volume = 0, this.#n(s);
  }
  //MARK: 効果音のフェードアウト（loadから使うのでマクロ化禁止）
  #b(s) {
    return s.volume = 0, this.#t(s);
  }
  //MARK: BGMのフェード（loadから使うのでマクロ化禁止）
  #n(s) {
    return s.buf = u, this.#t(s);
  }
  //MARK: 効果音のフェード
  #t(s) {
    const { buf: t = n } = s;
    return this.#f(s), this.#s[t]?.fade(s), !1;
  }
  //MARK: BGM の演奏
  #u(s) {
    return s.buf = u, s.canskip = !1, m(s, "loop", !0), this.#i(s);
  }
  //MARK: 効果音の再生
  #i(s) {
    const { buf: t = n, fn: o } = s;
    if (this.#o({ buf: t }), !o) throw `fnは必須です buf:${t}`;
    return m(s, "canskip", !0) && this.#l.isSkipping ? !1 : (this.#s[t] = new f(s, t, o)).needLoad;
  }
  clearCache() {
    r.removeAll();
  }
  //MARK: 全効果音再生の停止
  #e() {
    for (const s of Object.keys(this.#s)) this.#o({ buf: s });
    return this.#s = {}, r.stopAll(), !1;
  }
  //MARK: BGM 演奏の停止（loadから使うのでマクロ化禁止）
  #v(s) {
    return s.buf = u, this.#o(s);
  }
  //MARK: 効果音再生の停止
  #o(s) {
    const { buf: t = n } = s;
    return this.#s[t]?.stopse(s), !1;
  }
  //MARK: BGM フェードの終了待ち
  #d(s) {
    return s.buf = u, this.#a(s);
  }
  //MARK: 効果音フェードの終了待ち
  #a(s) {
    const { buf: t = n } = s;
    return this.#s[t]?.wf(s) ?? !1;
  }
  //MARK: 音声フェードの停止
  #f(s) {
    const { buf: t = n } = s;
    return this.#s[t]?.stopfadese(s), !1;
  }
  //MARK: BGM 再生の終了待ち
  #p(s) {
    return s.buf = u, this.#r(s);
  }
  //MARK: 効果音再生の終了待ち
  #r(s) {
    const { buf: t = n } = s;
    return this.#s[t]?.ws(s) ?? !1;
  }
  //MARK: 再生トラックの交換
  #_(s) {
    const { buf: t = n, buf2: o = n } = s;
    if (t === o) return !1;
    const i = this.#s[t], l = this.#s[o];
    return i ? this.#s[o] = i : delete this.#s[o], l ? this.#s[t] = l : delete this.#s[t], f.xchgbuf(s), !1;
  }
  //MARK: しおりの読込（BGM状態復元）
  playLoopFromSaveObj(s) {
    const t = String(this.val.getVal("save:const.sn.loopPlaying", "{}"));
    if (t === "{}")
      return this.#e(), this.clearCache(), [];
    const o = JSON.parse(t);
    if (s)
      this.#e(), this.clearCache();
    else for (const [i, l] of Object.entries(this.#s))
      i in o || l.stopse({ buf: i });
    return Object.entries(o).map(([i, l]) => new Promise((e) => {
      const h = this.#s[i];
      if (!s && h && h.fn === l) {
        e();
        return;
      }
      const a = "save:const.sn.sound." + i + ".", c = {
        fn: l,
        buf: i,
        join: !1,
        loop: !0,
        volume: Number(this.val.getVal(a + "volume")),
        start_ms: Number(this.val.getVal(a + "start_ms")),
        end_ms: Number(this.val.getVal(a + "end_ms")),
        ret_ms: Number(this.val.getVal(a + "ret_ms")),
        fnc: e
        // loaded
      };
      c.buf === u ? this.#u(c) : this.#i(c);
    }));
  }
  destroy() {
    this.#e(), this.clearCache();
  }
}
export {
  V as SoundMng
};
//# sourceMappingURL=SoundMng.js.map
