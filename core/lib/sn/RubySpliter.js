"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const m_xregexp = require("xregexp");
class RubySpliter {
    constructor() {
        this.putCh = () => { };
    }
    setting(hArg) { if (hArg.sesame)
        RubySpliter.sesame = hArg.sesame; }
    getSesame() { return RubySpliter.sesame; }
    init(putCh) { this.putCh = putCh; }
    static setEscape(ce) {
        RubySpliter.REG_RUBY = m_xregexp(RubySpliter.mkEscReg(ce), 'gsx');
    }
    putTxt(text) {
        var _a, _b, _c;
        let elm = null, pos = 0;
        while (elm = m_xregexp.exec(text, RubySpliter.REG_RUBY, pos)) {
            pos = elm['index'] + elm[0].length;
            const ruby = elm['ruby'];
            if (ruby) {
                this.putTxtRb(elm['str'], ruby);
                continue;
            }
            const kan_ruby = elm['kan_ruby'];
            if (kan_ruby) {
                this.putTxtRb(elm['kan'], kan_ruby);
                continue;
            }
            if (elm['txt4']) {
                this.putCh(elm['txt4'].slice(1), '');
                continue;
            }
            const txt = (_c = (_b = (_a = elm['txt']) !== null && _a !== void 0 ? _a : elm['txt2']) !== null && _b !== void 0 ? _b : elm['txt3']) !== null && _c !== void 0 ? _c : '';
            const a = Array.from(txt);
            const len = a.length;
            for (let i = 0; i < len; ++i)
                this.putCh(a[i], '');
        }
    }
    putTxtRb(text, ruby) {
        const a = Array.from(text);
        const len = a.length;
        if (ruby.charAt(0) == '*' && ruby.length <= 2) {
            const rb_ses = 'center｜'
                + ((ruby == '*') ? RubySpliter.sesame : ruby.charAt(1));
            for (let i = 0; i < len; ++i)
                this.putCh(a[i], rb_ses);
            return;
        }
        if (len == 1 || ruby.indexOf(' ') == -1) {
            this.putCh(text, ruby.replace(RubySpliter.REG_TAB_G, ' '));
            return;
        }
        const aR = ruby.split(' ');
        const lenR = aR.length;
        const len_max = (lenR > len) ? lenR : len;
        for (let i = 0; i < len_max; ++i) {
            this.putCh((i < len) ? a[i] : '', (i < lenR) ? aR[i].replace(RubySpliter.REG_TAB_G, ' ') : '');
        }
    }
    static destroy() { RubySpliter.sesame = 'ヽ'; }
}
exports.RubySpliter = RubySpliter;
RubySpliter.sesame = 'ヽ';
RubySpliter.mkEscReg = (ce) => `(?: ${ce ? `(?<txt4>\\${ce}\\S) |` : ''}
	(?: ｜(?<str>[^《\\n]+)《(?<ruby>[^》\\n]+)》)
|	(?: (?<kan>[⺀-⿟々〇〻㐀-鿿豈-﫿]+[ぁ-ヿ]*
	|	[^　｜》\\n⺀-⿟々〇〻㐀-鿿豈-﫿])《(?<kan_ruby>[^》\\n]+)》)
|	(?: (?<txt>[^　｜《》]*[ぁ-ヿ])(?=[⺀-⿟々〇〻㐀-鿿豈-﫿]+《))
|	(?<txt2>[^｜《》]+(?=｜\\|　))
|	(?<txt3>[\uD800-\uDBFF][\uDC00-\uDFFF]|.)
)`;
RubySpliter.REG_TAB_G = /\t/g;
//# sourceMappingURL=RubySpliter.js.map