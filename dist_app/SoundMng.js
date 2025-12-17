import { l as argChk_Num, s as argChk_Boolean } from "./CmnLib.js";
import "./pixi.js";
import "./EventListenerCtn.js";
import "./ConfigBase.js";
import "./Reading.js";
import { a as require_howler, i as xchgbuf, n as BUF_SE, r as SndBuf, t as BUF_BGM } from "./SndBuf.js";
var import_howler = require_howler(), SoundMng = class {
	#e = {};
	#t(e) {
		return this.#e[e];
	}
	constructor(e, r, i, a, o) {
		this.val = i, r.volume = (e) => this.#r(e), r.fadebgm = (e) => this.#s(e), r.fadeoutbgm = (e) => this.#a(e), r.fadeoutse = (e) => this.#o(e), r.fadese = (e) => this.#c(e), r.playbgm = (e) => this.#l(e), r.playse = (e) => this.#u(e), r.stop_allse = () => this.#f(), r.stopbgm = (e) => this.#p(e), r.stopse = (e) => this.#m(e), r.wb = (e) => this.#h(e), r.wf = (e) => this.#g(e), r.stopfadese = () => !1, r.wl = (e) => this.#_(e), r.ws = (e) => this.#v(e), r.xchgbuf = (e) => this.#y(e), i.setVal_Nochk("save", "const.sn.loopPlaying", "{}");
		let c = {};
		for (let e of "aac,caf,dolby,flac,m4a,m4b,mp3,mp4,mpeg,oga,ogg,opus,wav,weba,webm".split(",")) c[e] = import_howler.Howler.codecs(e);
		i.setVal_Nochk("tmp", "const.sn.sound.codecs", JSON.stringify(c)), SndBuf.init(e, i, a, o, (e) => this.#t(e));
	}
	#n;
	setEvtMng(e) {
		this.#n = e, SndBuf.setEvtMng(e);
	}
	setNoticeChgVolume(e, r) {
		this.val.defValTrg("sys:sn.sound.global_volume", (r, i) => {
			let a = Number(i);
			import_howler.Howler.volume(a), e(a);
		}), this.val.defValTrg("sys:sn.sound.movie_volume", (e, i) => r(Number(i))), this.val.setVal_Nochk("sys", "sn.sound.global_volume", this.val.getVal("sys:sn.sound.global_volume", 1)), this.val.setVal_Nochk("sys", "sn.sound.movie_volume", this.val.getVal("sys:sn.sound.movie_volume", 1));
	}
	#r(e) {
		let { buf: r = "SE" } = e, i = "const.sn.sound." + r + ".volume", a = this.#i(e, 1);
		return Number(this.val.getVal("sys:" + i)) === a ? !1 : (this.val.setVal_Nochk("sys", i, a), this.val.flush(), e.time = 0, e.volume = Number(this.val.getVal("save:" + i)), this.#c(e));
	}
	#i(r, i) {
		let a = argChk_Num(r, "volume", i);
		return a < 0 ? 0 : a > 1 ? 1 : a;
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
		let { buf: r = "SE" } = e;
		return this.#e[r]?.fade(e), !1;
	}
	#l(e) {
		return e.buf = "BGM", e.canskip = !1, argChk_Boolean(e, "loop", !0), this.#u(e);
	}
	#u(e) {
		let { buf: i = "SE" } = e;
		if (this.#m({ buf: i }), argChk_Boolean(e, "canskip", !0) && this.#n.isSkipping) return !1;
		this.#d();
		let a = argChk_Boolean(e, "join", !0);
		return this.#e[i] = SndBuf.generate(e, i, a), a;
	}
	#d = () => {
		import_howler.Howler.volume(Number(this.val.getVal("sys:sn.sound.global_volume", 1))), this.#d = () => {};
	};
	#f() {
		for (let e of Object.keys(this.#e)) this.#m({ buf: e });
		return this.#e = {}, import_howler.Howler.unload(), !1;
	}
	#p(e) {
		return e.buf = "BGM", this.#m(e);
	}
	#m(e) {
		let { buf: r = "SE" } = e;
		return this.#e[r]?.stopse(), !1;
	}
	#h(e) {
		return e.buf = "BGM", this.#g(e);
	}
	#g(e) {
		let { buf: r = "SE" } = e;
		return this.#e[r]?.wf(e) ?? !1;
	}
	#_(e) {
		return e.buf = "BGM", this.#v(e);
	}
	#v(e) {
		let { buf: r = "SE" } = e;
		return this.#e[r]?.ws(e) ?? !1;
	}
	#y(e) {
		let { buf: r = "SE", buf2: i = "SE" } = e;
		if (r === i) return !1;
		let o = this.#e[r], s = this.#e[i];
		return o ? this.#e[i] = o : delete this.#e[i], s ? this.#e[r] = s : delete this.#e[r], xchgbuf(e), !1;
	}
	playLoopFromSaveObj(e) {
		let r = String(this.val.getVal("save:const.sn.loopPlaying", "{}"));
		if (r === "{}") return this.#f(), [];
		let i = JSON.parse(r);
		if (e) this.#f();
		else for (let [e, r] of Object.entries(this.#e)) e in i || r.stopse();
		return Object.entries(i).map(([r, i]) => new Promise((a) => {
			let o = this.#e[r];
			if (!e && o && o.fn === i) {
				a();
				return;
			}
			let s = "save:const.sn.sound." + r + ".", c = {
				fn: i,
				buf: r,
				join: !1,
				loop: !0,
				volume: Number(this.val.getVal(s + "volume")),
				start_ms: Number(this.val.getVal(s + "start_ms")),
				end_ms: Number(this.val.getVal(s + "end_ms")),
				ret_ms: Number(this.val.getVal(s + "ret_ms")),
				fnc: a
			};
			c.buf === "BGM" ? this.#l(c) : this.#u(c);
		}));
	}
	destroy() {
		this.#f();
	}
};
export { SoundMng };

//# sourceMappingURL=SoundMng.js.map