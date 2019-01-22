"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const m_xregexp = require("xregexp");
class AnalyzeTagArg {
    constructor() {
        this.$hPrm = {};
        this.$isKomeParam = false;
        this.$literal = '';
    }
    go(args) {
        this.$hPrm = {};
        this.$isKomeParam = false;
        if (args == null)
            return true;
        let elm = null, pos = 0;
        while (elm = m_xregexp.exec(args, AnalyzeTagArg.REG_TAGARG, pos)) {
            pos = elm['index'] + elm[0].length;
            this.$literal = elm['literal'];
            if (this.$literal == undefined) {
                this.$hPrm[elm['key']] = {
                    val: (elm['val'] == undefined) ? elm['val2'] : elm['val'],
                    def: (elm['def'] == undefined) ? elm['def2'] : elm['def']
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
        const elm = m_xregexp.exec(args, AnalyzeTagArg.REG_TAGARG_VAL);
        this.$hPrm = {
            val: (elm['val'] == undefined) ? elm['val2'] : elm['val'],
            def: (elm['def'] == undefined) ? elm['def2'] : elm['def']
        };
    }
    get hPrm() { return this.$hPrm; }
    get isKomeParam() { return this.$isKomeParam; }
    get literal() { return this.$literal; }
}
AnalyzeTagArg.REG_TAGARG = m_xregexp(`(?: (?<key>[^\\s=]+) \\s* = \\s* (?: (?: ([\\"\\'\\#]) (?<val>.*?) \\2 )` +
    `| (?<val2> [^\\s\\"\\'\\#\\|]+) ) (?: \\| (?: (?: ([\\"\\'\\#]) (?<def>.*?) \\5 )` +
    `| (?<def2> [^\\s\\"\\'\\#\\|]+) ) )? )` +
    '| (?<literal>\\S+)', 'gx');
AnalyzeTagArg.REG_TAGARG_VAL = m_xregexp(`(?: \\s* (?: (?: ([\\"\\'\\#]) (?<val>.*?) \\1 )` +
    `| (?<val2> [^\\"\\'\\#\\|]+) ) (?: \\| (?: (?: ([\\"\\'\\#]) (?<def>.*?) \\4 )` +
    `| (?<def2> [^\\"\\'\\#\\|]+) ) )? )`, 'x');
exports.AnalyzeTagArg = AnalyzeTagArg;
//# sourceMappingURL=AnalyzeTagArg.js.map