"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const m_xregexp = require("xregexp");
class AnalyzeTagArg {
    constructor() {
        this.REG_TAGARG = m_xregexp(`(?<key>\\w+) \\s* = \\s*
(?: (["'#]) (?<val>.*?) \\2
| (?<val2> [^\\s|]+)
	(?: \\| (?: (["'#]) (?<def>.*?) \\5
	| (?<def2> \\S+) ) )? )
| (?<literal>\\S+)`, 'gx');
        this.REG_TAGARG_VAL = m_xregexp(`\\s*
(?: (["'#]) (?<val>.*?) \\1 | (?<val2> [^|]+) )
(?: \\|
	(?: (["'#]) (?<def>.*?) \\4 | (?<def2> .+) )
)?`, 'x');
        this.$hPrm = {};
        this.$isKomeParam = false;
        this.$literal = '';
    }
    go(args) {
        var _a, _b;
        this.$hPrm = {};
        this.$isKomeParam = false;
        if (args == null)
            return true;
        let elm = null, pos = 0;
        while (elm = m_xregexp.exec(args, this.REG_TAGARG, pos)) {
            pos = elm.index + elm[0].length;
            this.$literal = elm.literal;
            if (this.$literal == undefined) {
                this.$hPrm[elm.key] = {
                    val: (_a = elm.val) !== null && _a !== void 0 ? _a : elm.val2,
                    def: (_b = elm.def) !== null && _b !== void 0 ? _b : elm.def2
                };
                continue;
            }
            if (this.$literal != '*')
                return false;
            this.$isKomeParam = true;
        }
        return true;
    }
    goVal(args) {
        var _a, _b;
        const elm = m_xregexp.exec(args, this.REG_TAGARG_VAL);
        this.$hPrm = {
            val: (_a = elm.val) !== null && _a !== void 0 ? _a : elm.val2,
            def: (_b = elm.def) !== null && _b !== void 0 ? _b : elm.def2
        };
    }
    get hPrm() { return this.$hPrm; }
    get isKomeParam() { return this.$isKomeParam; }
    get literal() { return this.$literal; }
}
exports.AnalyzeTagArg = AnalyzeTagArg;
//# sourceMappingURL=AnalyzeTagArg.js.map