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
const platform = require('platform');
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
}
exports.CmnLib = CmnLib;
CmnLib.stageW = 0;
CmnLib.stageH = 0;
CmnLib.devtool = false;
CmnLib.isSafari = (platform.name == 'Safari');
CmnLib.hDip = {};
CmnLib.isRetina = false;
CmnLib.isDarkMode = false;
CmnLib.retinaRate = 1;
CmnLib.sn_id = 'skynovel';
CmnLib.getFn = (path) => m_path.basename(path, m_path.extname(path));
CmnLib.getExt = (path) => m_path.extname(path).slice(1);
//# sourceMappingURL=CmnLib.js.map