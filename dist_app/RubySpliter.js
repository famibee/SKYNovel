var RubySpliter = class e {
	static #e = "ヽ";
	static setting(t) {
		t.sesame && (e.#e = t.sesame);
	}
	static getSesame() {
		return e.#e;
	}
	static destroy() {
		e.#e = "ヽ";
	}
	#t = () => {};
	init(e) {
		this.#t = e;
	}
	static #n;
	static setEscape(t) {
		e.#n = RegExp((t ? `(?<ce>\\${t}\\S)|` : "") + e.#r, "gs");
	}
	static #r = "｜(?<str>[^《\\n]+)《(?<ruby>[^》\\n]+)》|(?:(?<kan>[⺀-⿟々〇〻㐀-鿿豈-﫿]+[ぁ-ヿ]*|[^　｜《》\\n])《(?<kan_ruby>[^》\\n]+)》)|(?<txt>[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[^｜《》]+?|.)";
	putTxt(t) {
		for (let { groups: n } of t.matchAll(e.#n)) {
			let { ruby: e, kan_ruby: t, kan: r = "", ce: i, txt: a = "", str: o = "" } = n;
			if (e) {
				this.putTxtRb(decodeURIComponent(o), e);
				continue;
			}
			if (t) {
				this.putTxtRb(r, t);
				continue;
			}
			if (i) {
				this.#t(i.slice(1), "");
				continue;
			}
			for (let e of Array.from(a)) this.#t(e, "");
		}
	}
	putTxtRb(t, n) {
		if (/^\w+｜{"/.test(n)) {
			this.#t(t, n);
			return;
		}
		let r = Array.from(t), i = r.length;
		if (/^\*.?$/.test(n)) {
			let t = "center｜" + (n === "*" ? e.#e : n.charAt(1));
			for (let e of r) this.#t(e, t);
			return;
		}
		if (i === 1 || !n.includes(" ")) {
			this.#t(t, decodeURIComponent(n));
			return;
		}
		let a = n.split(" "), o = a.length, s = o > i ? o : i;
		for (let e = 0; e < s; ++e) this.#t(e < i ? r[e] : "", e < o ? decodeURIComponent(a[e]) : "");
	}
};
export { RubySpliter as t };

//# sourceMappingURL=RubySpliter.js.map