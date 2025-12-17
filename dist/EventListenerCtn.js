import { v as import_eventemitter3 } from "./pixi.js";
var EventListenerCtn = class {
	#e = [];
	add(t, n, r, i = {}) {
		if (t instanceof import_eventemitter3.default) {
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
export { EventListenerCtn as t };

//# sourceMappingURL=EventListenerCtn.js.map