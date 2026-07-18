import { v as e } from "./pixi.js";
//#region src/sn/EventListenerCtn.ts
var t = class {
	#e = [];
	add(t, n, r, i = {}) {
		if (t instanceof e.default) {
			t.on(n, r, i), this.#e.push(() => t.off(n, r, i));
			return;
		}
		t.addEventListener(n, r, i), this.#e.push(() => t.removeEventListener(n, r, { capture: i.capture ?? !1 }));
	}
	clear() {
		for (let e of this.#e) e();
		this.#e = [];
	}
	get isEmpty() {
		return this.#e.length === 0;
	}
};
//#endregion
export { t };

//# sourceMappingURL=EventListenerCtn.js.map