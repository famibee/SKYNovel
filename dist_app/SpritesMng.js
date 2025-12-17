import { d as getFn, l as argChk_Num, p as int, s as argChk_Boolean } from "./CmnLib.js";
import { b as BLEND_MODES, c as Loader, f as Texture, g as TextureCache, h as Rectangle, l as LoaderResource, n as AnimatedSprite, o as Sprite } from "./pixi.js";
import { n as SEARCH_PATH_ARG_EXT } from "./ConfigBase.js";
import { t as DebugMng } from "./DebugMng.js";
import { t as Layer } from "./Layer.js";
import { t as Reading } from "./Reading.js";
var SpritesMng = class g {
	static #e;
	static #t;
	static #n;
	static #r;
	static init(e, i, a, o, s) {
		g.#e = e, g.#t = i, g.#n = a, g.#r = o, a.arg.crypto && (g.#f = (e, i, a) => g.#m(e, i, a), g.#g = (e, i, a) => g.#_(e, i, a));
		let c = () => {
			let e = g.#a * g.#i;
			for (let i of Object.values(g.#y)) i.volume = e;
		};
		s.setNoticeChgVolume((e) => {
			g.#a = e, c();
		}, (e) => {
			g.#i = e, c();
		});
	}
	static #i = 1;
	static #a = 1;
	static #o;
	static setEvtMng(e) {
		g.#o = e;
	}
	constructor(e = "", i, a = () => {}, o = () => {}) {
		this.csvFn = e, this.ctn = i, this.fncFirstComp = a, this.fncAllComp = o, e && (this.#s = i ? (e) => {
			i.addChild(e), this.#c.push(e);
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
	static #l(e, i, a, o) {
		if (!e) return !1;
		let l = !1;
		if (e.startsWith("data:")) {
			let s = () => {
				let s = Sprite.from(e);
				o(s), i(s), a(l);
			};
			return e in TextureCache ? s() : (l = !0, new Loader().add(e, e).load(s)), l;
		}
		let d = [], f = new Loader();
		for (let i of e.split(",")) {
			if (!i) throw "face属性に空要素が含まれます";
			let { dx: e, dy: a, blendmode: o, fn: p } = g.#u[i] ?? {
				fn: i,
				dx: 0,
				dy: 0,
				blendmode: BLEND_MODES.NORMAL
			};
			if (d.push({
				fn: p,
				fnc: (i) => {
					i.transform && (i.x = e, i.y = a, i.blendMode = o);
				}
			}), p in g.#d || p in TextureCache || p in Loader.shared.resources) continue;
			l = !0;
			let m = g.#e.searchPath(p, SEARCH_PATH_ARG_EXT.SP_GSM), h = this.#n.arg.crypto ? { xhrType: m.endsWith(".json") ? LoaderResource.XHR_RESPONSE_TYPE.TEXT : LoaderResource.XHR_RESPONSE_TYPE.BUFFER } : {};
			f.add({
				...h,
				name: p,
				url: m
			});
		}
		let m = d.at(0);
		m && (m.fnc = i);
		let h = (e, i) => {
			for (let { fn: e, fnc: a } of d) {
				let s = g.#v(e, i);
				s.name = e, o(s), a(s);
			}
			a(l);
		};
		return l ? f.use((e, i) => {
			try {
				if (e.extension === "json") {
					this.#n.dec("json", e.data).then((a) => g.#g(a, e, i));
					return;
				}
				this.#n.decAB(e.data).then((a) => g.#f(a, e, i));
			} catch (i) {
				let a = `画像/動画ロード失敗です fn:${e.name} ${String(i)}`;
				g.#o.isSkipping ? console.warn(a) : console.error("%c" + a, "color:#FF3300;");
			}
		}).load(h) : queueMicrotask(() => h(0, {})), l;
	}
	static #u = {};
	static #d = {};
	static #f = (e, { type: i, name: a, data: o }, s) => {
		switch (i) {
			case LoaderResource.TYPE.VIDEO: {
				let e = o;
				e.volume = g.#a, g.#y[a] = g.#h(e);
			}
		}
		s();
	};
	static #p(e) {
		let i = /([^\d]+)\d+\.(\w+)/.exec(e[0] ?? "");
		if (!i) return [];
		let [, o = "", s = ""] = i, c = o.length, l = -s.length - 1;
		return e.sort((e, i) => int(e.slice(c, l)) > int(i.slice(c, l)) ? 1 : -1);
	}
	static #m(e, i, a) {
		if (i.data = e, i.extension !== "bin" && a(), e instanceof HTMLImageElement) {
			Texture.fromLoader(e, i.url, i.name).then((o) => {
				i.texture = o, i.type = LoaderResource.TYPE.IMAGE, a(), URL.revokeObjectURL(e.src);
			});
			return;
		}
		e instanceof HTMLVideoElement && (e.volume = g.#a, g.#y[i.name] = g.#h(e), i.type = LoaderResource.TYPE.VIDEO), a();
	}
	static #h(e) {
		return g.#t.getVal("const.sn.needClick2Play") && (DebugMng.trace_beforeNew(`[lay系] ${DebugMng.strPos()}未クリック状態で動画を自動再生します。音声はミュートされます`, "W"), e.muted = !0), e.setAttribute("playsinline", ""), e;
	}
	static #g = (e, { type: i, spritesheet: a, name: o, data: s }, c) => {
		switch (i) {
			case LoaderResource.TYPE.JSON: {
				let e = a._frameKeys;
				g.#p(e), g.#d[o] = {
					aTex: e.map((e) => Texture.from(e)),
					meta: s.meta
				};
			}
		}
		c();
	};
	static #_(i, a, o) {
		let { meta: s, frames: u } = a.data = JSON.parse(i);
		if (a.type = LoaderResource.TYPE.JSON, !s?.image) {
			o();
			return;
		}
		let f = getFn(s.image), p = g.#e.searchPath(f, SEARCH_PATH_ARG_EXT.SP_GSM);
		new Loader().use((e, i) => {
			this.#n.decAB(e.data).then((a) => {
				if (e.data = a, a instanceof HTMLImageElement) {
					e.type = LoaderResource.TYPE.IMAGE, i(), URL.revokeObjectURL(a.src);
					return;
				}
				i();
			}).catch((i) => this.#r.errScript(`画像/動画ロード失敗です dec2res4Cripto fn:${e.name} ${String(i)}`, !1));
		}).add({
			name: f,
			url: p,
			xhrType: LoaderResource.XHR_RESPONSE_TYPE.BUFFER
		}).load((e, i) => {
			for (let { data: i } of Object.values(e.resources)) {
				let { baseTexture: e } = Texture.from(i), o = Object.values(u);
				g.#d[a.name] = {
					aTex: o.map(({ frame: { x: i, y: a, w: o, h: s } }) => new Texture(e, new Rectangle(i, a, o, s))),
					meta: s
				};
			}
			o();
		});
	}
	static #v(e, i) {
		let a = g.#d[e];
		if (a) {
			let e = new AnimatedSprite(a.aTex);
			return e.animationSpeed = a.meta.animationSpeed ?? 1, e.play(), e;
		}
		if (e in TextureCache) return Sprite.from(e);
		let o = g.#y[e];
		if (o) return Sprite.from(o);
		let s = i[e];
		return s ? new Sprite(s.texture) : new Sprite();
	}
	static #y = {};
	static getHFn2VElm(e) {
		return g.#y[e];
	}
	static wv(e) {
		let { fn: i } = e;
		if (!i) throw "fnは必須です";
		let a = g.#y[i];
		if (!a || a.loop) return !1;
		if (g.#o.isSkipping || a.ended) return g.stopVideo(i), !1;
		let s = "wv fn:" + i, c = argChk_Boolean(e, "stop", !0), l = () => {
			c && g.stopVideo(i);
		};
		return Reading.beginProc(s, l, !0, argChk_Boolean(e, "canskip", !0) ? l : void 0), a.addEventListener("ended", () => Reading.notifyEndProc(s), {
			once: !0,
			passive: !0
		}), !0;
	}
	static stopVideo(e) {
		let i = g.#y[e];
		i && (delete g.#y[e], i.pause(), i.currentTime = i.duration);
	}
	static add_face(e) {
		let { name: a } = e;
		if (!a) throw "nameは必須です";
		if (a in g.#u) throw "一つのname（" + a + "）に対して同じ画像を複数割り当てられません";
		let { fn: o = a } = e;
		return g.#u[a] = {
			fn: o,
			dx: argChk_Num(e, "dx", 0),
			dy: argChk_Num(e, "dy", 0),
			blendmode: Layer.getBlendmodeNum(e.blendmode ?? "")
		}, !1;
	}
};
export { SpritesMng as t };

//# sourceMappingURL=SpritesMng.js.map