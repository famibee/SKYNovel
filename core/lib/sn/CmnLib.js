"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmnLib = exports.cnvTweenArg = exports.hMemberCnt = exports.getDateStr = exports.uint = exports.int = void 0;
function int(o) { return parseInt(String(o), 10); }
exports.int = int;
function uint(o) {
    const v = parseInt(String(o), 10);
    return v < 0 ? -v : v;
}
exports.uint = uint;
if (!('toInt' in String.prototype)) {
    String.prototype.toInt = function () { return int(this); };
}
if (!('toUint' in String.prototype)) {
    String.prototype.toUint = function () {
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
exports.hMemberCnt = {
    alpha: 0,
    height: 0,
    rotation: 0,
    scale_x: 0,
    scale_y: 0,
    width: 0,
    x: 0,
    y: 0,
};
function cnvTweenArg(hArg, lay) {
    const hTo = {};
    for (const nm in exports.hMemberCnt) {
        if (!(nm in hArg))
            continue;
        const v = String(hArg[nm]);
        const a = ((v.charAt(0) == '=') ? v.slice(1) : v).split(',');
        const a0 = hTo[nm] = parseFloat(a[0]);
        if (a.length > 1)
            hTo[nm] += Math.round(Math.random()
                * (parseFloat(a[1]) - a0 + 1));
        if (v.charAt(0) == '=')
            hTo[nm] += parseFloat(lay[nm]);
    }
    return hTo;
}
exports.cnvTweenArg = cnvTweenArg;
const m_path = require("path");
const platform = require('platform');
let CmnLib = (() => {
    class CmnLib {
        static argChk_Num(hash, name, def) {
            const v = hash[name];
            if (!(name in hash)) {
                if (isNaN(def))
                    throw `[${hash.タグ名}]属性 ${name} は必須です`;
                hash[name] = def;
                return def;
            }
            const n = (String(v).substr(0, 2) == '0x')
                ? parseInt(v)
                : parseFloat(v);
            if (isNaN(n))
                throw `[${hash.タグ名}]属性 ${name} の値【${v}】が数値ではありません`;
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
        static cvsResize(cvs) {
            var _a;
            const bk_cw = CmnLib.cvsWidth;
            const bk_ch = CmnLib.cvsHeight;
            let wiw = window.innerWidth;
            let wih = window.innerHeight;
            const wi = window;
            const lp = screen.orientation
                ? screen.orientation.type.charAt(0)
                : (((_a = wi.orientation) !== null && _a !== void 0 ? _a : 90) % 180 == 0) ? 'p' : 'l';
            if (CmnLib.isMobile &&
                ((lp == 'p' && wiw > wih) || (lp == 'l' && wiw < wih)))
                [wiw, wih] = [wih, wiw];
            if (CmnLib.argChk_Boolean(CmnLib.hDip, 'expanding', true) ||
                CmnLib.stageW > wiw ||
                CmnLib.stageH > wih) {
                if (CmnLib.stageW / CmnLib.stageH <= wiw / wih) {
                    CmnLib.cvsHeight = wih;
                    CmnLib.cvsWidth = CmnLib.stageW / CmnLib.stageH * wih;
                }
                else {
                    CmnLib.cvsWidth = wiw;
                    CmnLib.cvsHeight = CmnLib.stageH / CmnLib.stageW * wiw;
                }
                CmnLib.cvsScale = CmnLib.cvsWidth / CmnLib.stageW;
                const cr = cvs.getBoundingClientRect();
                CmnLib.ofsPadLeft_Dom2PIXI = (CmnLib.isMobile
                    ? (window.innerWidth - CmnLib.cvsWidth) / 2
                    : cr.left)
                    * (1 - CmnLib.cvsScale);
                CmnLib.ofsPadTop_Dom2PIXI = (CmnLib.isMobile
                    ? (window.innerHeight - CmnLib.cvsHeight) / 2
                    : cr.top)
                    * (1 - CmnLib.cvsScale);
            }
            else {
                CmnLib.cvsWidth = CmnLib.stageW;
                CmnLib.cvsHeight = CmnLib.stageH;
                CmnLib.cvsScale = 1;
                CmnLib.ofsPadLeft_Dom2PIXI = 0;
                CmnLib.ofsPadTop_Dom2PIXI = 0;
            }
            if (cvs.parentElement) {
                const ps = cvs.parentElement.style;
                ps.position = 'relative';
                const s = cvs.style;
                ps.width = s.width = `${CmnLib.cvsWidth}px`;
                ps.height = s.height = `${CmnLib.cvsHeight}px`;
            }
            return bk_cw != CmnLib.cvsWidth || bk_ch != CmnLib.cvsHeight;
        }
    }
    CmnLib.stageW = 0;
    CmnLib.stageH = 0;
    CmnLib.ofsPadLeft_Dom2PIXI = 0;
    CmnLib.ofsPadTop_Dom2PIXI = 0;
    CmnLib.cvsWidth = 0;
    CmnLib.cvsHeight = 0;
    CmnLib.cvsScale = 1;
    CmnLib.debugLog = false;
    CmnLib.platform = { ...platform };
    CmnLib.isSafari = platform.name == 'Safari';
    CmnLib.isFirefox = platform.name == 'Firefox';
    CmnLib.isMac = new RegExp('OS X').test(CmnLib.platform.os.family);
    CmnLib.isMobile = !new RegExp('(Windows|OS X)').test(CmnLib.platform.os.family);
    CmnLib.hDip = {};
    CmnLib.isRetina = false;
    CmnLib.isDarkMode = false;
    CmnLib.retinaRate = 1;
    CmnLib.SN_ID = 'skynovel';
    CmnLib.getFn = (path) => m_path.basename(path, m_path.extname(path));
    CmnLib.getExt = (path) => m_path.extname(path).slice(1);
    return CmnLib;
})();
exports.CmnLib = CmnLib;
//# sourceMappingURL=CmnLib.js.map