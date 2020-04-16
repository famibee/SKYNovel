"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const P = require("parsimmon");
const m_xregexp = require("xregexp");
const CmnLib_1 = require("./CmnLib");
class PropParser {
    constructor(val) {
        this.val = val;
        this.parser = null;
        this.hFnc = {
            '!num!': a => a.shift(),
            '!str!': a => this.procEmbedVar(a.shift()),
            '!bool!': a => a.shift(),
            '!': a => {
                const b = a.shift();
                return (b[0] == '!bool!')
                    ? !Boolean(b[1])
                    : !(String(this.calc(b)) == 'true');
            },
            '~': a => ~Number(this.calc(a.shift())),
            '**': a => Number(this.calc(a.shift())) **
                Number(this.calc(a.shift())),
            '*': a => Number(this.calc(a.shift())) *
                Number(this.calc(a.shift())),
            '/': a => Number(this.calc(a.shift())) /
                Number(this.calc(a.shift())),
            '¥': a => Math.floor(this.hFnc['/'](a)),
            '%': a => Number(this.calc(a.shift())) %
                Number(this.calc(a.shift())),
            '+': a => {
                const b = this.calc(a.shift());
                const c = this.calc(a.shift());
                if (Object.prototype.toString.call(b) == '[object String]'
                    || Object.prototype.toString.call(c) == '[object String]') {
                    return String(b) + String(c);
                }
                return Number(b) + Number(c);
            },
            '-': a => Number(this.calc(a.shift())) -
                Number(this.calc(a.shift())),
            'int': a => CmnLib_1.int(this.fncSub_ChkNum(a.shift())),
            'parseInt': a => CmnLib_1.int(this.hFnc['Number'](a)),
            'Number': a => {
                const b = this.calc(a.shift());
                if (Object.prototype.toString.call(b) != '[object String]')
                    return Number(b);
                return this.fncSub_ChkNum(this.parser.parse(String(b)).value);
            },
            'ceil': a => Math.ceil(this.fncSub_ChkNum(a.shift())),
            'floor': a => Math.floor(this.fncSub_ChkNum(a.shift())),
            'round': a => Math.round(this.fncSub_ChkNum(a.shift())),
            '<<': a => Number(this.calc(a.shift())) <<
                Number(this.calc(a.shift())),
            '>>': a => Number(this.calc(a.shift())) >>
                Number(this.calc(a.shift())),
            '>>>': a => Number(this.calc(a.shift())) >>>
                Number(this.calc(a.shift())),
            '<': a => Number(this.calc(a.shift())) <
                Number(this.calc(a.shift())),
            '<=': a => Number(this.calc(a.shift())) <=
                Number(this.calc(a.shift())),
            '>': a => Number(this.calc(a.shift())) >
                Number(this.calc(a.shift())),
            '>=': a => Number(this.calc(a.shift())) >=
                Number(this.calc(a.shift())),
            '==': a => {
                const b = this.calc(a.shift());
                const c = this.calc(a.shift());
                if ((b == null) && (c == null) && (!b || !c))
                    return (b == c);
                return String(b) == String(c);
            },
            '!=': a => !this.hFnc['=='](a),
            '===': a => {
                const b = this.calc(a.shift());
                const c = this.calc(a.shift());
                if (Object.prototype.toString.call(b) !=
                    Object.prototype.toString.call(c))
                    return false;
                return String(b) == String(c);
            },
            '!==': a => !this.hFnc['==='](a),
            '&': a => Number(this.calc(a.shift())) &
                Number(this.calc(a.shift())),
            '^': a => Number(this.calc(a.shift())) ^
                Number(this.calc(a.shift())),
            '|': a => Number(this.calc(a.shift())) |
                Number(this.calc(a.shift())),
            '&&': a => (String(this.calc(a.shift())) == 'true') &&
                (String(this.calc(a.shift())) == 'true'),
            '||': a => (String(this.calc(a.shift())) == 'true') ||
                (String(this.calc(a.shift())) == 'true'),
            '?': a => {
                const b = a.shift();
                let cond = false;
                if (b[0] == '!bool!') {
                    cond = Boolean(b[1]);
                }
                else {
                    const cond2 = String(this.calc(b));
                    cond = (cond2 != 'true' && cond2 != 'false')
                        ? (CmnLib_1.int(cond2) != 0)
                        : (cond2 == 'true');
                }
                const elm2 = a.shift();
                if (elm2[0] != ':')
                    throw Error('(PropParser)三項演算子の文法エラーです。: が見つかりません');
                return this.calc(elm2[cond ? 1 : 2]);
            },
            ':': () => { throw Error('(PropParser)三項演算子の文法エラーです。? が見つかりません'); },
        };
        this.REG_EMBEDVAR = /(\$((tmp|sys|save|mp):)?[^\s!--\/:-@[-^`{-~]+|\#\{[^\}]+})/g;
        this.getValAmpersand = (val) => (val.charAt(0) == '&')
            ? String(this.parse(val.substr(1)))
            : val;
        function ope(a) {
            const ps = [];
            for (const v of a)
                ps.push(((v instanceof RegExp)
                    ? P.regex(v)
                    : P.string(v))
                    .trim(P.optWhitespace));
            return P.alt.apply(null, ps);
        }
        function PREFIX(operatorsParser, nextParser) {
            const parser = P.lazy(() => {
                return P.seq(operatorsParser, parser).or(nextParser);
            });
            return parser;
        }
        function BINARY_RIGHT(operatorsParser, nextParser) {
            let parser = P.lazy(() => nextParser.chain((next) => P.seq(operatorsParser, P.of(next), parser).or(P.of(next))));
            return parser;
        }
        function BINARY_LEFT(operatorsParser, nextParser) {
            return P.seqMap(nextParser, P.seq(operatorsParser, nextParser).many(), (first, rest) => {
                return rest.reduce((acc, ch) => {
                    return [ch[0], acc, ch[1]];
                }, first);
            });
        }
        const Num = P.alt(P.alt(P.regex(/-?(0|[1-9][0-9]*)\.[0-9]+/), P.regex(/0x[0-9a-fA-F]+/)).map(Number), P.alt(P.regex(/-?(0|[1-9][0-9]*)/)).map(n => CmnLib_1.int(n)))
            .map(str => ['!num!', str])
            .desc('number');
        const NullLiteral = P.string('null')
            .map(() => ['!str!', null]);
        const BooleanLiteral = P.regex(/(true|false)/)
            .map(b => ['!bool!', b == 'true'])
            .desc('boolean');
        const StringLiteral = P
            .regex(/("|'|#).*?\1/)
            .map(b => ['!str!', b.slice(1, -1)])
            .desc('string');
        const REG_BRACKETS = /\[[^\]]+\]/g;
        const VarLiteral = P
            .regex(/\-?((tmp|sys|save|mp):)?[^\s!-\/:-@[-^`{-~]+(\.[^\s!-\/:-@[-^`{-~]+|\[[^\]]+\])*(@str)?/)
            .map(b => {
            const s = String(b).replace(REG_BRACKETS, v => '.' + this.parse(v.slice(1, -1)));
            if (s.charAt(0) == '-') {
                const val = this.val.getVal(s.slice(1));
                if (val == null || String(val) == 'null')
                    throw Error('(PropParser)数値以外に-符号がついています');
                return ['!num!', -Number(val)];
            }
            const val = this.val.getVal(s);
            if (val == null)
                return ['!str!', val];
            if (typeof val == 'boolean')
                return ['!bool!', val];
            return (Object.prototype.toString.call(val) == '[object String]')
                ? ['!str!', String(val)]
                : ['!num!', Number(val)];
        })
            .desc('string');
        const Basic = P.lazy(() => P
            .string('(').then(this.parser).skip(P.string(')'))
            .or(Num)
            .or(NullLiteral)
            .or(BooleanLiteral)
            .or(StringLiteral)
            .or(VarLiteral));
        const table = [
            { type: PREFIX, ops: ope([/[A-Za-z_][A-Za-z0-9_]*(?=\()/]) },
            { type: PREFIX, ops: ope([/(!(?!=)|~)/]) },
            { type: BINARY_RIGHT, ops: ope(['**']) },
            { type: BINARY_LEFT, ops: ope(['*', '/', '¥', '%']) },
            { type: BINARY_LEFT, ops: ope(['+', '-']) },
            { type: BINARY_LEFT, ops: ope([/(>>>|<<|>>)/]) },
            { type: BINARY_LEFT, ops: ope([/(<=|<|>=|>)/]) },
            { type: BINARY_LEFT, ops: ope([/(===|!==|==|!=)/]) },
            { type: BINARY_LEFT, ops: ope([/&(?!&)/]) },
            { type: BINARY_LEFT, ops: ope(['^']) },
            { type: BINARY_LEFT, ops: ope([/\|(?!\|)/]) },
            { type: BINARY_LEFT, ops: ope(['&&']) },
            { type: BINARY_LEFT, ops: ope(['||']) },
            { type: BINARY_RIGHT, ops: ope([':']) },
            { type: BINARY_RIGHT, ops: ope(['?']) },
        ];
        const tableParser = table.reduce((acc, level) => level.type(level.ops, acc), Basic);
        this.parser = tableParser.trim(P.optWhitespace);
    }
    parse(s) {
        const p = this.parser.parse(s);
        if (!p.status)
            throw Error('(PropParser)文法エラー【' + s + '】');
        const a = p.value;
        if (a[0] == '!str!')
            return this.procEmbedVar(a[1]);
        return this.calc(a);
    }
    calc(a) {
        const elm = a.shift();
        if (elm instanceof Array)
            return this.calc(elm);
        const fnc = this.hFnc[elm];
        return (fnc) ? fnc(a) : Object(null);
    }
    fncSub_ChkNum(v) {
        const b = this.calc(v);
        if (Object.prototype.toString.call(b) != '[object Number]')
            throw Error('(PropParser)引数【' + b + '】が数値ではありません');
        return Number(b);
    }
    procEmbedVar(b) {
        if (b == null)
            return b;
        return String(b).replace(this.REG_EMBEDVAR, v => {
            return (v.charAt(0) == '$')
                ? this.val.getVal(v.slice(1))
                : this.parse(v.slice(2, -1));
        });
    }
    static getValName(arg_name) {
        var _a;
        const a = m_xregexp.exec(CmnLib_1.trim(arg_name), this.REG_VAL);
        if (!a)
            return undefined;
        return {
            scope: a.scope || 'tmp',
            name: PropParser.getValName_B2D(a.name),
            at: (_a = a.at) !== null && _a !== void 0 ? _a : '',
        };
    }
    static getValName_B2D(str) {
        let i = 0, e = 0;
        while (true) {
            i = str.indexOf('["');
            if (i < 0) {
                i = str.indexOf("['");
                if (i < 0)
                    break;
                e = str.indexOf("']", i + 2);
            }
            else {
                e = str.indexOf('"]', i + 2);
            }
            if (e < 0)
                break;
            str = str.slice(0, i) + '.' + str.slice(i + 2, e)
                + str.slice(e + 2);
            i = e - 2;
        }
        return str;
    }
}
exports.PropParser = PropParser;
PropParser.REG_VAL = m_xregexp('^((?<scope>\\w+?):)?(?<name>[^\\s :@]+)(?<at>\\@str)?$');
//# sourceMappingURL=PropParser.js.map