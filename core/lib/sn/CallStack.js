"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CallStack {
    constructor(_fn = '', _idx = 0, _hArg = null) {
        this._fn = _fn;
        this._idx = _idx;
        this._hArg = _hArg;
    }
    get fn() { return this._fn; }
    get idx() { return this._idx; }
    get hArg() { return this._hArg; }
    toString() { return '[fn:' + this._fn + ', idx:' + this._idx + ', hArg:' + this._hArg + ']'; }
}
exports.CallStack = CallStack;
//# sourceMappingURL=CallStack.js.map