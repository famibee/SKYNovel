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
    putTxt(text) {
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
            const txt = elm['txt'] || elm['txt2'] || elm['txt3'] || '';
            for (const v of txt)
                this.putCh(v, '');
        }
    }
    putTxtRb(text, ruby) {
        if (ruby.charAt(0) == '*' && ruby.length <= 2) {
            const rb_ses = 'center｜'
                + ((ruby == '*') ? RubySpliter.sesame : ruby.charAt(1));
            for (const v of text)
                this.putCh(v, rb_ses);
            return;
        }
        const len_text = text.length;
        if (len_text == 1 || ruby.indexOf(' ') == -1) {
            this.putCh(text, ruby.replace(RubySpliter.REG_TAB_G, ' '));
            return;
        }
        const vct = ruby.split(' ');
        const len_spl = vct.length;
        const loop_max = (len_spl > len_text) ? len_spl : len_text;
        for (let i = 0; i < loop_max; ++i) {
            this.putCh((i < len_text) ? text.charAt(i) : '', (i < len_spl) ? vct[i].replace(RubySpliter.REG_TAB_G, ' ') : '');
        }
    }
    static destroy() { RubySpliter.sesame = 'ヽ'; }
}
exports.RubySpliter = RubySpliter;
RubySpliter.sesame = 'ヽ';
RubySpliter.REG_RUBY = m_xregexp(`(?:` +
    `	(?: ｜(?<str>[^《\\n]+)《(?<ruby>[^》\\n]+)》)` +
    `|	(?: (?<kan>[⺀-⿟々〇〻㐀-鿿豈-﫿]+[ぁ-ヿ]*` +
    `	|	[^　｜》\\n⺀-⿟々〇〻㐀-鿿豈-﫿])《(?<kan_ruby>[^》\\n]+)》)` +
    `|	(?: (?<txt>[^　｜《》]*[ぁ-ヿ])(?=[⺀-⿟々〇〻㐀-鿿豈-﫿]+《))` +
    `|	(?<txt2>[^｜《》]+(?=｜\\|　))` +
    `|	(?<txt3>.)` +
    `)`, 'gsx');
RubySpliter.REG_TAB_G = /\t/g;
//# sourceMappingURL=RubySpliter.js.map