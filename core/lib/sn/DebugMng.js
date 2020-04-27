"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CmnLib_1 = require("./CmnLib");
const Stats = require('stats.js');
class DebugMng {
    constructor(sys, hTag, scrItr) {
        this.sys = sys;
        this.fncUpd = () => { };
        this.first = true;
        DebugMng.scrItr = scrItr;
        DebugMng.hTag = hTag;
        DebugMng.title = hTag.title;
        DebugMng.myTrace = DebugMng.fncMyTrace;
        hTag.log = o => this.log(o);
        hTag.stats = o => this.stats(o);
        hTag.trace = o => this.trace(o);
        DebugMng.spnDbg = document.createElement('span');
        DebugMng.spnDbg.hidden = true;
        DebugMng.spnDbg.textContent = '';
        DebugMng.spnDbg.style.cssText =
            `	z-index: ${Number.MAX_SAFE_INTEGER};
			position: absolute; left: 0; top: 0;
			color: black;
			background-color: rgba(255, 255, 255, 0.7);`;
        document.body.appendChild(DebugMng.spnDbg);
    }
    destroy() {
        DebugMng.title = () => false;
        document.body.removeChild(DebugMng.spnDbg);
    }
    update() { this.fncUpd(); }
    log(hArg) {
        if (this.first) {
            this.first = false;
            this.sys.appendFile(this.sys.path_downloads + 'log.txt', `== ${CmnLib_1.CmnLib.platform.description} ==`, err => { if (err)
                console.log(err); });
        }
        this.sys.appendFile(this.sys.path_downloads + 'log.txt', `--- ${CmnLib_1.getDateStr('-', '_', '')} [fn:${DebugMng.scrItr.scriptFn} line:${DebugMng.scrItr.lineNum}] prj:${this.sys.cur}\n${hArg.text || `(text is ${hArg.text})`}\n`, err => { if (err)
            console.log(err); });
        return false;
    }
    stats(hArg) {
        if (this._stats) {
            this._stats.dom.style.right = '0px';
            this._stats.dom.style.top = '0px';
            return false;
        }
        this._stats = new Stats();
        this._stats.showPanel(0);
        this._stats.dom.style.position = 'fixed';
        this._stats.dom.style.right = '0px';
        this._stats.dom.style.top = '0px';
        this._stats.dom.style.right = CmnLib_1.CmnLib.argChk_Num(hArg, 'left', CmnLib_1.int(this._stats.dom.style.right)) + 'px';
        this._stats.dom.style.top = CmnLib_1.CmnLib.argChk_Num(hArg, 'top', CmnLib_1.int(this._stats.dom.style.top)) + 'px';
        document.body.appendChild(this._stats.dom);
        this.fncUpd = () => { this._stats.update(); };
        return false;
    }
    trace(hArg) {
        DebugMng.myTrace(hArg.text || `(text is ${hArg.text})`, 'I');
        return false;
    }
    static fncMyTrace(txt, lvl = 'E') {
        let mes = `{${lvl}} `;
        if (DebugMng.scrItr && DebugMng.scrItr.lineNum > 0)
            mes +=
                `(fn:${DebugMng.scrItr.scriptFn} line:${DebugMng.scrItr.lineNum}) `;
        mes += txt;
        DebugMng.dspDbg(mes, lvl);
        let sty = '';
        switch (lvl) {
            case 'D':
                sty = `color:#${CmnLib_1.CmnLib.isDarkMode ? '49F' : '05A'};`;
                break;
            case 'W':
                sty = 'color:#F80;';
                break;
            case 'F':
                sty = 'color:#B00;';
                break;
            case 'ET':
            case 'E':
                DebugMng.title({ text: txt });
                this.hTag.dump_lay({});
                this.hTag.dump_val({});
                DebugMng.scrItr.dumpErrForeLine();
                this.hTag.dump_stack({});
                if (lvl == 'ET')
                    throw mes;
                console.error('%c' + mes, 'color:#F30;');
                return;
            default:
                sty = '';
                mes = ' ' + mes;
        }
        console.info('%c' + mes, sty);
    }
    static dspDbg(mes, lvl) {
        let sty = '';
        switch (lvl) {
            case 'D':
                sty = 'color:#05A;';
                break;
            case 'W':
                sty = 'color:#F80;';
                break;
            case 'F':
                sty = 'color:#B00;';
                break;
            case 'ET':
            case 'E':
                sty = 'color:#F30;';
                break;
            default: sty = '';
        }
        DebugMng.spnDbg.innerHTML += `<span style='${sty}'>${mes}</span><br/>`;
        DebugMng.spnDbg.hidden = false;
    }
    ;
}
exports.DebugMng = DebugMng;
DebugMng.myTrace = (txt, lvl = 'E') => {
    let mes = `{${lvl}} ` + txt;
    let sty = '';
    switch (lvl) {
        case 'D':
            sty = `color:#${CmnLib_1.CmnLib.isDarkMode ? '49F' : '05A'};`;
            break;
        case 'W':
            sty = 'color:#FF8800;';
            break;
        case 'F':
            sty = 'color:#BB0000;';
            break;
        case 'ET': throw mes;
        case 'E':
            console.error('%c' + mes, 'color:#FF3300;');
            return;
        default:
            sty = 'color:black;';
            mes = ' ' + mes;
    }
    console.info('%c' + mes, sty);
};
//# sourceMappingURL=DebugMng.js.map