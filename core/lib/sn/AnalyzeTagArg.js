"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const m_xregexp = require("xregexp");
class AnalyzeTagArg {
    constructor() {
        this.REG_TAGARG = m_xregexp(`	;.*\\n
|	(?<key>\\w+)
	(?: \\s+ | ;[^\\n]*\\n)*
	=
	(?: \\s+ | ;.*\\n)*
	(?:	(?<val> [^\\s"'#|;]+)
	|	(["'#]) (?<val2>.*?) \\3 )
	(?: \\|
		(?: (?<def> [^\\s"'#;]+)
	|	(["'#]) (?<def2>.*?) \\6 ) )?
|	(?<literal>[^\\s;]+)`, 'gx');
        this.REG_TAGARG_VAL = m_xregexp(`\\s*
(?: (["'#]) (?<val>.*?) \\1 | (?<val2> [^|]+) )
(?: \\|
	(?: (["'#]) (?<def>.*?) \\4 | (?<def2> .+) )
)?`, 'x');
        this.$hPrm = {};
        this.$isKomeParam = false;
    }
    go(args) {
        var _a, _b;
        this.$hPrm = {};
        this.$isKomeParam = false;
        if (args == null)
            return;
        let elm = null, pos = 0;
        while (elm = m_xregexp.exec(args, this.REG_TAGARG, pos)) {
            pos = elm.index + elm[0].length;
            if (elm.key) {
                this.$hPrm[elm.key] = {
                    val: (_a = elm.val) !== null && _a !== void 0 ? _a : elm.val2,
                    def: (_b = elm.def) !== null && _b !== void 0 ? _b : elm.def2
                };
                continue;
            }
            if (elm.literal) {
                if (elm.literal == '*')
                    this.$isKomeParam = true;
                else
                    this.$hPrm[elm.literal] = { val: '1' };
            }
        }
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
}
exports.AnalyzeTagArg = AnalyzeTagArg;
//# sourceMappingURL=AnalyzeTagArg.js.map