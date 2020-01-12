"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CmnLib_1 = require("./CmnLib");
class LineBreakingRules {
    constructor() {
        this.max_col = 7;
        this.bura_col = 2;
        this.max_row = 0;
        this.putCh = () => { };
        this.input = (ch, ruby) => {
            console.log(`LBR  text:${ch}: ruby:${ruby}:`);
            if (ch == '、')
                this.putCh('\n', '');
            this.putCh(ch, ruby);
            if (ch == '組')
                this.putCh('\n', '');
        };
    }
    init(putCh) { this.putCh = putCh; }
    setting(hArg) {
        this.max_col = CmnLib_1.CmnLib.argChk_Num(hArg, 'max_col', this.max_col);
        this.bura_col = CmnLib_1.CmnLib.argChk_Num(hArg, 'bura_col', this.bura_col);
        this.max_row = CmnLib_1.CmnLib.argChk_Num(hArg, 'max_row', this.max_row);
    }
}
exports.LineBreakingRules = LineBreakingRules;
//# sourceMappingURL=LineBreakingRules.js.map