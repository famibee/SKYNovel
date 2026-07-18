import { l as e, s as t } from "./CmnLib.js";
import { n, r, t as i } from "./SndBuf.js";
//#region src/sn/SoundMng.ts
var a = r(), o = class {
	val;
	#e = {};
	#t(e) {
		return this.#e[e];
	}
	constructor(e, t, n, r, o) {
		this.val = n, t.volume = (e) => this.#r(e), t.fadebgm = (e) => this.#s(e), t.fadeoutbgm = (e) => this.#a(e), t.fadeoutse = (e) => this.#o(e), t.fadese = (e) => this.#c(e), t.playbgm = (e) => this.#l(e), t.playse = (e) => this.#u(e), t.stop_allse = () => this.#f(), t.stopbgm = (e) => this.#p(e), t.stopse = (e) => this.#m(e), t.wb = (e) => this.#h(e), t.wf = (e) => this.#g(e), t.stopfadese = () => !1, t.wl = (e) => this.#_(e), t.ws = (e) => this.#v(e), t.xchgbuf = (e) => this.#y(e), n.setVal_Nochk("save", "const.sn.loopPlaying", "{}");
		let s = {};
		for (let e of "aac,caf,dolby,flac,m4a,m4b,mp3,mp4,mpeg,oga,ogg,opus,wav,weba,webm".split(",")) s[e] = a.Howler.codecs(e);
		n.setVal_Nochk("tmp", "const.sn.sound.codecs", JSON.stringify(s)), i.init(e, n, r, o, (e) => this.#t(e));
	}
	#n;
	setEvtMng(e) {
		this.#n = e, i.setEvtMng(e);
	}
	setNoticeChgVolume(e, t) {
		this.val.defValTrg("sys:sn.sound.global_volume", (t, n) => {
			let r = Number(n);
			a.Howler.volume(r), e(r);
		}), this.val.defValTrg("sys:sn.sound.movie_volume", (e, n) => t(Number(n))), this.val.setVal_Nochk("sys", "sn.sound.global_volume", this.val.getVal("sys:sn.sound.global_volume", 1)), this.val.setVal_Nochk("sys", "sn.sound.movie_volume", this.val.getVal("sys:sn.sound.movie_volume", 1));
	}
	#r(e) {
		let { buf: t = "SE" } = e, n = "const.sn.sound." + t + ".volume", r = this.#i(e, 1);
		return Number(this.val.getVal("sys:" + n)) === r ? !1 : (this.val.setVal_Nochk("sys", n, r), this.val.flush(), e.time = 0, e.volume = Number(this.val.getVal("save:" + n)), this.#c(e));
	}
	#i(t, n) {
		let r = e(t, "volume", n);
		return r < 0 ? 0 : r > 1 ? 1 : r;
	}
	#a(e) {
		return e.volume = 0, this.#s(e);
	}
	#o(e) {
		return e.volume = 0, this.#c(e);
	}
	#s(e) {
		return e.buf = "BGM", this.#c(e);
	}
	#c(e) {
		let { buf: t = "SE" } = e;
		return this.#e[t]?.fade(e), !1;
	}
	#l(e) {
		return e.buf = "BGM", e.canskip = !1, t(e, "loop", !0), this.#u(e);
	}
	#u(e) {
		let { buf: n = "SE" } = e;
		if (this.#m({ buf: n }), t(e, "canskip", !0) && this.#n.isSkipping) return !1;
		this.#d();
		let r = t(e, "join", !0);
		return this.#e[n] = i.generate(e, n, r), r;
	}
	#d = () => {
		a.Howler.volume(Number(this.val.getVal("sys:sn.sound.global_volume", 1))), this.#d = () => {};
	};
	#f() {
		for (let e of Object.keys(this.#e)) this.#m({ buf: e });
		return this.#e = {}, a.Howler.unload(), !1;
	}
	#p(e) {
		return e.buf = "BGM", this.#m(e);
	}
	#m(e) {
		let { buf: t = "SE" } = e;
		return this.#e[t]?.stopse(), !1;
	}
	#h(e) {
		return e.buf = "BGM", this.#g(e);
	}
	#g(e) {
		let { buf: t = "SE" } = e;
		return this.#e[t]?.wf(e) ?? !1;
	}
	#_(e) {
		return e.buf = "BGM", this.#v(e);
	}
	#v(e) {
		let { buf: t = "SE" } = e;
		return this.#e[t]?.ws(e) ?? !1;
	}
	#y(e) {
		let { buf: t = "SE", buf2: r = "SE" } = e;
		if (t === r) return !1;
		let i = this.#e[t], a = this.#e[r];
		return i ? this.#e[r] = i : delete this.#e[r], a ? this.#e[t] = a : delete this.#e[t], n(e), !1;
	}
	playLoopFromSaveObj(e) {
		let t = String(this.val.getVal("save:const.sn.loopPlaying", "{}"));
		if (t === "{}") return this.#f(), [];
		let n = JSON.parse(t);
		if (e) this.#f();
		else for (let [e, t] of Object.entries(this.#e)) e in n || t.stopse();
		return Object.entries(n).map(([t, n]) => new Promise((r) => {
			let i = this.#e[t];
			if (!e && i && i.fn === n) {
				r();
				return;
			}
			let a = "save:const.sn.sound." + t + ".", o = {
				fn: n,
				buf: t,
				join: !1,
				loop: !0,
				volume: Number(this.val.getVal(a + "volume")),
				start_ms: Number(this.val.getVal(a + "start_ms")),
				end_ms: Number(this.val.getVal(a + "end_ms")),
				ret_ms: Number(this.val.getVal(a + "ret_ms")),
				fnc: r
			};
			o.buf === "BGM" ? this.#l(o) : this.#u(o);
		}));
	}
	destroy() {
		this.#f();
	}
};
//#endregion
export { o as SoundMng };

//# sourceMappingURL=SoundMng.js.map