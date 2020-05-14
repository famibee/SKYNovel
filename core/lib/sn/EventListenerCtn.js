"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventListenerCtn = void 0;
const pixi_js_1 = require("pixi.js");
class EventListenerCtn {
    constructor() {
        this.vctEvt = [];
    }
    add(ed, type, fnc, ctx = {}) {
        if (ed instanceof pixi_js_1.BaseTexture) {
            switch (type) {
                case 'loaded':
                case 'update':
                case 'error':
                case 'dispose':
                    ed.on(type, fnc, ctx);
                    this.vctEvt.push(() => ed.off(type, fnc, ctx));
                    break;
            }
            return;
        }
        if (ed instanceof pixi_js_1.utils.EventEmitter) {
            ed.on(type, fnc, ctx);
            this.vctEvt.push(() => ed.off(type, fnc, ctx));
            return;
        }
        ed.addEventListener(type, fnc, ctx);
        this.vctEvt.push(() => { var _a; return ed.removeEventListener(type, fnc, { capture: (_a = ctx.capture) !== null && _a !== void 0 ? _a : false }); });
    }
    clear() {
        for (const fnc of this.vctEvt)
            fnc();
        this.vctEvt = [];
    }
}
exports.EventListenerCtn = EventListenerCtn;
//# sourceMappingURL=EventListenerCtn.js.map