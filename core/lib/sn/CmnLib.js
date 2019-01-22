"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function int(o) { return parseInt(String(o), 10); }
exports.int = int;
function uint(o) {
    const v = parseInt(String(o), 10);
    return v < 0 ? -v : v;
}
exports.uint = uint;
function trim(s) { return s.replace(/^\s+|\s+$/g, ''); }
exports.trim = trim;
if (!('toInt' in String.prototype)) {
    String.prototype['toInt'] = function () { return int(this); };
}
if (!('toUint' in String.prototype)) {
    String.prototype['toUint'] = function () {
        const v = int(this);
        return v < 0 ? -v : v;
    };
}
if (!String.prototype.trim) {
    String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g, ''); };
}
function getDateStr(spl_dd = '/', spl_dt = ' ', spl_tt = ':', spl_ms = '') {
    const now = new Date();
    return now.getFullYear()
        + spl_dd + String(100 + now.getMonth() + 1).substr(1, 2)
        + spl_dd + String(100 + now.getDate()).substr(1, 2)
        + spl_dt + String(100 + now.getHours()).substr(1, 2)
        + spl_tt + String(100 + now.getMinutes()).substr(1, 2)
        + (spl_ms == '' ? '' : spl_ms + String(now.getMilliseconds()));
}
exports.getDateStr = getDateStr;
;
;
const m_path = require("path");
const m_xregexp = require("xregexp");
const TWEEN = require("@tweenjs/tween.js");
class CmnLib {
    static argChk_Num(hash, name, def) {
        const v = hash[name];
        if (!(name in hash)) {
            if (isNaN(def))
                throw '[' + hash['タグ名'] + ']属性 ' + name + ' は必須です';
            hash[name] = def;
            return def;
        }
        const n = (String(v).substr(0, 2) == '0x')
            ? parseInt(v)
            : parseFloat(v);
        if (isNaN(n))
            throw '[' + hash['タグ名'] + ']属性 ' + name + ' の値【' + v + '】が数値ではありません';
        return hash[name] = n;
    }
    static argChk_Boolean(hash, name, def) {
        if (!(name in hash))
            return hash[name] = def;
        const v = hash[name];
        if (v == null)
            return false;
        const v2 = String(v);
        return hash[name] = (v2 == "false") ? false : Boolean(v2);
    }
    static cnvMultilineTag(txt) {
        return txt.replace(CmnLib.REG_MULTILINE_TAG, function () {
            if (arguments[0].charAt(0) == ';')
                return arguments[0];
            let fore = '';
            let back = '';
            for (const v of arguments[1].match(CmnLib.REG_MULTILINE_TAG_SPLIT)) {
                switch (v.substr(-1)) {
                    case '\n':
                        back += v;
                        break;
                    case `"`:
                    case `'`:
                    case `#`:
                        fore += v;
                        break;
                    default:
                        fore += ' ' + trim(v);
                        break;
                }
            }
            return '[' + trim(fore.slice(1)) + ']' + back;
        });
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
            cast: ((cnt_equa == 3) ? trim(equa[2]) : null)
        };
    }
}
CmnLib.stageW = 0;
CmnLib.stageH = 0;
CmnLib.devtool = false;
CmnLib.osName = '';
CmnLib.isRetina = false;
CmnLib.retinaRate = 1;
CmnLib.hEase = {
    'Back.In': TWEEN.Easing.Back.In,
    'Back.InOut': TWEEN.Easing.Back.InOut,
    'Back.Out': TWEEN.Easing.Back.Out,
    'Bounce.In': TWEEN.Easing.Bounce.In,
    'Bounce.InOut': TWEEN.Easing.Bounce.InOut,
    'Bounce.Out': TWEEN.Easing.Bounce.Out,
    'Circular.In': TWEEN.Easing.Circular.In,
    'Circular.InOut': TWEEN.Easing.Circular.InOut,
    'Circular.Out': TWEEN.Easing.Circular.Out,
    'Cubic.In': TWEEN.Easing.Cubic.In,
    'Cubic.InOut': TWEEN.Easing.Cubic.InOut,
    'Cubic.Out': TWEEN.Easing.Cubic.Out,
    'Elastic.In': TWEEN.Easing.Elastic.In,
    'Elastic.InOut': TWEEN.Easing.Elastic.InOut,
    'Elastic.Out': TWEEN.Easing.Elastic.Out,
    'Exponential.In': TWEEN.Easing.Exponential.In,
    'Exponential.InOut': TWEEN.Easing.Exponential.InOut,
    'Exponential.Out': TWEEN.Easing.Exponential.Out,
    'Linear.None': TWEEN.Easing.Linear.None,
    'Quadratic.In': TWEEN.Easing.Quadratic.In,
    'Quadratic.InOut': TWEEN.Easing.Quadratic.InOut,
    'Quadratic.Out': TWEEN.Easing.Quadratic.Out,
    'Quartic.In': TWEEN.Easing.Quartic.In,
    'Quartic.InOut': TWEEN.Easing.Quartic.InOut,
    'Quartic.Out': TWEEN.Easing.Quartic.Out,
    'Quintic.In': TWEEN.Easing.Quintic.In,
    'Quintic.InOut': TWEEN.Easing.Quintic.InOut,
    'Quintic.Out': TWEEN.Easing.Quintic.Out,
    'Sinusoidal.In': TWEEN.Easing.Sinusoidal.In,
    'Sinusoidal.InOut': TWEEN.Easing.Sinusoidal.InOut,
    'Sinusoidal.Out': TWEEN.Easing.Sinusoidal.Out,
};
CmnLib.REG_TOKEN = m_xregexp(`(?: \\[let_ml \\s+ [^\\[\\]]+ \\])` +
    `(?: . | \\s)+?` +
    `(?=\\[endlet_ml \\s* \\])` +
    `| \\[ (?: ([\\"\\'\\#]) .*? \\1 | . ) *? \\]` +
    '| \\n+' +
    '| \\t+' +
    '| &[^&\\n]+&' +
    '| &&?[^;\\n\\t&]+' +
    '| ;[^\\n]+' +
    '| ^\\*\\w+' +
    '| [^\\n\\t\\[;]+', 'gx');
CmnLib.REG_TOKEN_NOTXT = /[\n\t;\[*&]/;
CmnLib.REG_MULTILINE_TAG = m_xregexp(`\\[
		([^\\n\\]]+ \\n
			(?:
				(["'#]) .*? \\2
			|	[^\\[\\]]
			)*
		)
	\\]
|	;[^\\n]+`, 'gx');
CmnLib.REG_MULTILINE_TAG_SPLIT = m_xregexp(`((["'#]).*?\\2|;.*\\n|\\n+|[^\\n"'#;]+)`, 'g');
CmnLib.REG_TAG = m_xregexp(`^\\[ (?<name>\\S*) (\\s+ (?<args>.+) )? ]$`, 'x');
CmnLib.getFn = (path) => m_path.basename(path, m_path.extname(path));
CmnLib.getExt = (path) => m_path.extname(path).slice(1);
exports.CmnLib = CmnLib;
//# sourceMappingURL=CmnLib.js.map