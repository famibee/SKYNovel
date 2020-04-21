"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CmnLib_1 = require("./CmnLib");
const RubySpliter_1 = require("./RubySpliter");
const m_xregexp = require("xregexp");
class Grammar {
    constructor() {
        this.regC2M = new RegExp('');
        this.regStrC2M = '';
        this.regStrC2M4not = '';
        this.replaceScr_C2M_And_let_ml = (scr, start_idx = 0) => {
            if (!this.hC2M)
                return;
            for (let i = scr.len - 1; i >= start_idx; --i) {
                const token = scr.aToken[i];
                this.REG_TOKEN_NOTXT.lastIndex = 0;
                if (this.REG_TOKEN_NOTXT.test(token.charAt(0)))
                    continue;
                const lnum = scr.aLNum[i];
                const a = token.match(this.regC2M);
                if (!a)
                    continue;
                let del = 1;
                for (let j = a.length - 1; j >= 0; --j) {
                    let ch = a[j];
                    const macro = this.hC2M[ch.charAt(0)];
                    if (macro) {
                        ch = macro + ((macro.substr(-1) == ']')
                            ? ''
                            : (`'${ch.slice(1, -1)}']`));
                    }
                    scr.aToken.splice(i, del, ch);
                    scr.aLNum.splice(i, del, lnum);
                    del = 0;
                }
            }
            scr.len = scr.aToken.length;
        };
        this.setEscape('');
    }
    mkEscape(ce) {
        return m_xregexp((ce ? `\\${ce}\\S |` : '') +
            '	\\n+' +
            '|	\\t+' +
            `|	\\[let_ml \\s+ [^\\]]+ \\]` +
            `.+?` +
            `(?=\\[endlet_ml [\\]\\s])` +
            `|	\\[ (?: [^"'#;\\]]+ | (["'#]) .*? \\1 | ;[^\\n]* ) *? ]` +
            '|	;[^\\n]*' +
            '|	&[^&\\n]+&' +
            '|	&&?[^;\\n\\t&]+' +
            '|	^\\*\\w+' +
            `| [^\\n\\t\\[;${ce ? `\\${ce}` : ''}]+`, 'gxs');
    }
    setEscape(ce) {
        if (this.hC2M && (ce in this.hC2M))
            throw '[エスケープ文字] char【' + ce + '】が登録済みの括弧マクロまたは一文字マクロです';
        this.REG_TOKEN = this.mkEscape(ce);
        RubySpliter_1.RubySpliter.setEscape(ce);
        this.REG_CANTC2M = new RegExp(`[\w\s;[\]*=&｜《》${ce}]`);
        this.REG_TOKEN_NOTXT = new RegExp(`[\n\t;\[*&${ce ? `\\${ce}` : ''}]`);
    }
    bracket2macro(hArg, script, idxToken) {
        var _a;
        const name = hArg.name;
        if (!name)
            throw '[bracket2macro] nameは必須です';
        const text = hArg.text;
        if (!text)
            throw '[bracket2macro] textは必須です';
        if (text.length != 2)
            throw '[bracket2macro] textは括弧の前後を示す二文字を指定してください';
        this.hC2M = (_a = this.hC2M) !== null && _a !== void 0 ? _a : {};
        const op = text.charAt(0);
        const cl = text.charAt(1);
        if (op in this.hC2M)
            throw '[bracket2macro] text【' + op + '】が登録済みの括弧マクロまたは一文字マクロです';
        if (cl in this.hC2M)
            throw '[bracket2macro] text【' + cl + '】が登録済みの括弧マクロまたは一文字マクロです';
        this.REG_CANTC2M.lastIndex = 0;
        if (this.REG_CANTC2M.test(op))
            throw '[bracket2macro] text【' + op + '】は括弧マクロに使用できない文字です';
        this.REG_CANTC2M.lastIndex = 0;
        if (this.REG_CANTC2M.test(cl))
            throw '[bracket2macro] text【' + cl + '】は括弧マクロに使用できない文字です';
        this.hC2M[cl] = '0';
        this.hC2M[op] = '[' + name + ' text=';
        this.addC2M(`\\${op}[^\\${cl}]*\\${cl}`, `\\${op}\\${cl}`);
        this.replaceScr_C2M_And_let_ml(script, idxToken);
    }
    char2macro(hArg, hTag, script, idxToken) {
        var _a;
        const char = hArg.char;
        if (!char)
            throw '[char2macro] charは必須です';
        this.hC2M = (_a = this.hC2M) !== null && _a !== void 0 ? _a : {};
        if (char in this.hC2M)
            throw '[char2macro] char【' + char + '】が登録済みの括弧マクロまたは一文字マクロです';
        this.REG_CANTC2M.lastIndex = 0;
        if (this.REG_CANTC2M.test(char))
            throw '[char2macro] char【' + char + '】は一文字マクロに使用できない文字です';
        const name = hArg.name;
        if (!name)
            throw '[char2macro] nameは必須です';
        if (!(name in hTag))
            throw '[char2macro] 未定義のタグ又はマクロ[' + name + ']です';
        this.hC2M[char] = '[' + name + ']';
        this.addC2M(`\\${char}`, `\\${char}`);
        this.replaceScr_C2M_And_let_ml(script, idxToken);
    }
    addC2M(a, b) {
        this.regStrC2M += `${a}|`;
        this.regStrC2M4not += `${b}`;
        this.regC2M = new RegExp(`(${this.regStrC2M}[^${this.regStrC2M4not}]+)`, 'g');
    }
    static splitAmpersand(token) {
        const equa = token.replace(/==/g, '＝').replace(/!=/g, '≠').split('=');
        const cnt_equa = equa.length;
        if (cnt_equa < 2 || cnt_equa > 3)
            throw '「&計算」書式では「=」指定が一つか二つ必要です';
        if (equa[1].charAt(0) == '&')
            throw '「&計算」書式では「&」指定が不要です';
        return {
            name: equa[0].replace(/＝/g, '==').replace(/≠/g, '!='),
            text: equa[1].replace(/＝/g, '==').replace(/≠/g, '!='),
            cast: ((cnt_equa == 3) ? CmnLib_1.trim(equa[2]) : null)
        };
    }
}
exports.Grammar = Grammar;
Grammar.REG_TAG = m_xregexp(`\\[ (?<name>[^\\s;\\]]+) \\s*
	(?<args> (?: [^"'#\\]]+ | (["'#]) .*? \\3 )*?)
]`, 'x');
//# sourceMappingURL=Grammar.js.map