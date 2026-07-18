import { d as e, l as t, p as n, s as r } from "./CmnLib.js";
import { b as i, c as a, f as o, g as s, h as c, l, n as u, o as d } from "./pixi.js";
import { n as f } from "./ConfigBase.js";
import { t as p } from "./DebugMng.js";
import { t as m } from "./Layer.js";
import { t as h } from "./Reading.js";
//#region src/sn/SpritesMng.ts
var g = class g {
	csvFn;
	ctn;
	fncFirstComp;
	fncAllComp;
	static #e;
	static #t;
	static #n;
	static #r;
	static init(e, t, n, r, i) {
		g.#e = e, g.#t = t, g.#n = n, g.#r = r, n.arg.crypto && (g.#f = (e, t, n) => g.#m(e, t, n), g.#g = (e, t, n) => g.#_(e, t, n));
		let a = () => {
			let e = g.#a * g.#i;
			for (let t of Object.values(g.#y)) t.volume = e;
		};
		i.setNoticeChgVolume((e) => {
			g.#a = e, a();
		}, (e) => {
			g.#i = e, a();
		});
	}
	static #i = 1;
	static #a = 1;
	static #o;
	static setEvtMng(e) {
		g.#o = e;
	}
	constructor(e = "", t, n = () => {}, r = () => {}) {
		this.csvFn = e, this.ctn = t, this.fncFirstComp = n, this.fncAllComp = r, e && (this.#s = t ? (e) => {
			t.addChild(e), this.#c.push(e);
		} : () => {}, this.ret = g.#l(e, (e) => this.fncFirstComp(e), (e) => this.fncAllComp(e), (e) => this.#s(e)));
	}
	ret = !1;
	#s;
	#c = [];
	destroy() {
		this.fncFirstComp = () => {}, this.fncAllComp = () => {}, this.#s = (e) => e.destroy();
		for (let e of this.#c) g.stopVideo(e.name), e.parent?.removeChild(e), e.destroy();
		this.#c = [];
	}
	static destroy() {
		g.#u = {}, g.#d = {}, g.#y = {};
	}
	static #l(e, t, n, r) {
		if (!e) return !1;
		let o = !1;
		if (e.startsWith("data:")) {
			let i = () => {
				let i = d.from(e);
				r(i), t(i), n(o);
			};
			return e in s ? i() : (o = !0, new a().add(e, e).load(i)), o;
		}
		let c = [], u = new a();
		for (let t of e.split(",")) {
			if (!t) throw "face属性に空要素が含まれます";
			let { dx: e, dy: n, blendmode: r, fn: d } = g.#u[t] ?? {
				fn: t,
				dx: 0,
				dy: 0,
				blendmode: i.NORMAL
			};
			if (c.push({
				fn: d,
				fnc: (t) => {
					t.transform && (t.x = e, t.y = n, t.blendMode = r);
				}
			}), d in g.#d || d in s || d in a.shared.resources) continue;
			o = !0;
			let p = g.#e.searchPath(d, f.SP_GSM), m = this.#n.arg.crypto ? { xhrType: p.endsWith(".json") ? l.XHR_RESPONSE_TYPE.TEXT : l.XHR_RESPONSE_TYPE.BUFFER } : {};
			u.add({
				...m,
				name: d,
				url: p
			});
		}
		let p = c.at(0);
		p && (p.fnc = t);
		let m = (e, t) => {
			for (let { fn: e, fnc: n } of c) {
				let i = g.#v(e, t);
				i.name = e, r(i), n(i);
			}
			n(o);
		};
		return o ? u.use((e, t) => {
			try {
				if (e.extension === "json") {
					this.#n.dec("json", e.data).then((n) => g.#g(n, e, t));
					return;
				}
				this.#n.decAB(e.data).then((n) => g.#f(n, e, t));
			} catch (t) {
				let n = `画像/動画ロード失敗です fn:${e.name} ${String(t)}`;
				g.#o.isSkipping ? console.warn(n) : console.error("%c" + n, "color:#FF3300;");
			}
		}).load(m) : queueMicrotask(() => m(0, {})), o;
	}
	static #u = {};
	static #d = {};
	static #f = (e, { type: t, name: n, data: r }, i) => {
		switch (t) {
			case l.TYPE.VIDEO: {
				let e = r;
				e.volume = g.#a, g.#y[n] = g.#h(e);
			}
		}
		i();
	};
	static #p(e) {
		let t = /([^\d]+)\d+\.(\w+)/.exec(e[0] ?? "");
		if (!t) return [];
		let [, r = "", i = ""] = t, a = r.length, o = -i.length - 1;
		return e.sort((e, t) => n(e.slice(a, o)) > n(t.slice(a, o)) ? 1 : -1);
	}
	static #m(e, t, n) {
		if (t.data = e, t.extension !== "bin" && n(), e instanceof HTMLImageElement) {
			o.fromLoader(e, t.url, t.name).then((r) => {
				t.texture = r, t.type = l.TYPE.IMAGE, n(), URL.revokeObjectURL(e.src);
			});
			return;
		}
		e instanceof HTMLVideoElement && (e.volume = g.#a, g.#y[t.name] = g.#h(e), t.type = l.TYPE.VIDEO), n();
	}
	static #h(e) {
		return g.#t.getVal("const.sn.needClick2Play") && (p.trace_beforeNew(`[lay系] ${p.strPos()}未クリック状態で動画を自動再生します。音声はミュートされます`, "W"), e.muted = !0), e.setAttribute("playsinline", ""), e;
	}
	static #g = (e, { type: t, spritesheet: n, name: r, data: i }, a) => {
		switch (t) {
			case l.TYPE.JSON: {
				let e = n._frameKeys;
				g.#p(e), g.#d[r] = {
					aTex: e.map((e) => o.from(e)),
					meta: i.meta
				};
			}
		}
		a();
	};
	static #_(t, n, r) {
		let { meta: i, frames: s } = n.data = JSON.parse(t);
		if (n.type = l.TYPE.JSON, !i?.image) {
			r();
			return;
		}
		let u = e(i.image), d = g.#e.searchPath(u, f.SP_GSM);
		new a().use((e, t) => {
			this.#n.decAB(e.data).then((n) => {
				if (e.data = n, n instanceof HTMLImageElement) {
					e.type = l.TYPE.IMAGE, t(), URL.revokeObjectURL(n.src);
					return;
				}
				t();
			}).catch((t) => this.#r.errScript(`画像/動画ロード失敗です dec2res4Cripto fn:${e.name} ${String(t)}`, !1));
		}).add({
			name: u,
			url: d,
			xhrType: l.XHR_RESPONSE_TYPE.BUFFER
		}).load((e, t) => {
			for (let { data: t } of Object.values(e.resources)) {
				let { baseTexture: e } = o.from(t), r = Object.values(s);
				g.#d[n.name] = {
					aTex: r.map(({ frame: { x: t, y: n, w: r, h: i } }) => new o(e, new c(t, n, r, i))),
					meta: i
				};
			}
			r();
		});
	}
	static #v(e, t) {
		let n = g.#d[e];
		if (n) {
			let e = new u(n.aTex);
			return e.animationSpeed = n.meta.animationSpeed ?? 1, e.play(), e;
		}
		if (e in s) return d.from(e);
		let r = g.#y[e];
		if (r) return d.from(r);
		let i = t[e];
		return i ? new d(i.texture) : new d();
	}
	static #y = {};
	static getHFn2VElm(e) {
		return g.#y[e];
	}
	static wv(e) {
		let { fn: t } = e;
		if (!t) throw "fnは必須です";
		let n = g.#y[t];
		if (!n || n.loop) return !1;
		if (g.#o.isSkipping || n.ended) return g.stopVideo(t), !1;
		let i = "wv fn:" + t, a = r(e, "stop", !0), o = () => {
			a && g.stopVideo(t);
		};
		return h.beginProc(i, o, !0, r(e, "canskip", !0) ? o : void 0), n.addEventListener("ended", () => h.notifyEndProc(i), {
			once: !0,
			passive: !0
		}), !0;
	}
	static stopVideo(e) {
		let t = g.#y[e];
		t && (delete g.#y[e], t.pause(), t.currentTime = t.duration);
	}
	static add_face(e) {
		let { name: n } = e;
		if (!n) throw "nameは必須です";
		if (n in g.#u) throw "一つのname（" + n + "）に対して同じ画像を複数割り当てられません";
		let { fn: r = n } = e;
		return g.#u[n] = {
			fn: r,
			dx: t(e, "dx", 0),
			dy: t(e, "dy", 0),
			blendmode: m.getBlendmodeNum(e.blendmode ?? "")
		}, !1;
	}
};
//#endregion
export { g as t };

//# sourceMappingURL=SpritesMng.js.map