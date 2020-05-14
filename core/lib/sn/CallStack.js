"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallStack = void 0;
class CallStack {
    constructor($fn = '', $idx = 0, $hArg = null) {
        this.$fn = $fn;
        this.$idx = $idx;
        this.$hArg = $hArg;
        this.toString = () => `[fn:${this.$fn}, idx:${this.$idx}, hArg:${this.$hArg}]`;
    }
    get fn() { return this.$fn; }
    get idx() { return this.$idx; }
    get csArg() { return this.$hArg; }
}
exports.CallStack = CallStack;
//# sourceMappingURL=CallStack.js.map