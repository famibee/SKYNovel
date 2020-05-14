"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RubySpliter = void 0;
let RubySpliter = (() => {
    class RubySpliter {
        constructor() {
            this.putCh = () => { };
        }
        setting(hArg) { if (hArg.sesame)
            RubySpliter.sesame = hArg.sesame; }
        getSesame() { return RubySpliter.sesame; }
        init(putCh) { this.putCh = putCh; }
        static setEscape(ce) {
            RubySpliter.REG_RUBY = new RegExp(`${ce ? `(?<ce>\\${ce}\\S)|` : ''}` +
                `｜(?<str>[^《\\n]+)《(?<ruby>[^》\\n]+)》` +
                `|(?:(?<kan>[⺀-⿟々〇〻㐀-鿿豈-﫿]+[ぁ-ヿ]*|[^　｜《》\\n])` +
                `《(?<kan_ruby>[^》\\n]+)》)` +
                `|(?<txt>` +
                `[\uD800-\uDBFF][\uDC00-\uDFFF]` +
                `|[^　｜《》]+(?=｜)` +
                `|[^　｜《》]*[ぁ-ヿ](?=[⺀-⿟々〇〻㐀-鿿豈-﫿]+《)` +
                `|.)`, 'gs');
        }
        putTxt(text) {
            var _a;
            let e = null;
            while (e = RubySpliter.REG_RUBY.exec(text)) {
                const g = e === null || e === void 0 ? void 0 : e.groups;
                if (!g)
                    continue;
                const ruby = g.ruby;
                if (ruby) {
                    this.putTxtRb(g.str, ruby);
                    continue;
                }
                const kan_ruby = g.kan_ruby;
                if (kan_ruby) {
                    this.putTxtRb(g.kan, kan_ruby);
                    continue;
                }
                if (g.ce) {
                    this.putCh(g.ce.slice(1), '');
                    continue;
                }
                const txt = (_a = g.txt) !== null && _a !== void 0 ? _a : '';
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
    RubySpliter.sesame = 'ヽ';
    RubySpliter.REG_TAB_G = /\t/g;
    return RubySpliter;
})();
exports.RubySpliter = RubySpliter;
//# sourceMappingURL=RubySpliter.js.map