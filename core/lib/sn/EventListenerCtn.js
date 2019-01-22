"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pixi_js_1 = require("pixi.js");
class EventListenerCtn {
    constructor() {
        this.vctEvt = [];
    }
    add(ed, type, fnc, useCapture = false) {
        if (ed instanceof pixi_js_1.BaseTexture) {
            switch (type) {
                case 'loaded':
                case 'update':
                case 'error':
                case 'dispose':
                    ed.on(type, fnc, useCapture);
                    this.vctEvt.push(() => ed.off(type, fnc, useCapture));
                    break;
            }
            return;
        }
        if (ed instanceof pixi_js_1.utils.EventEmitter) {
            ed.on(type, fnc, useCapture);
            this.vctEvt.push(() => ed.off(type, fnc, useCapture));
            return;
        }
        ed.addEventListener(type, fnc, useCapture);
        this.vctEvt.push(() => ed.removeEventListener(type, fnc, useCapture));
    }
    clear() {
        for (const fnc of this.vctEvt)
            fnc();
        this.vctEvt = [];
    }
}
exports.EventListenerCtn = EventListenerCtn;
//# sourceMappingURL=EventListenerCtn.js.map