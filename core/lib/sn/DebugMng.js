"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CmnLib_1 = require("./CmnLib");
const Stats = require('stats.js');
class DebugMng {
    constructor(sys, hTag, scrItr) {
        this.sys = sys;
        this.fncUpd = () => { };
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
        if (!('text' in hArg))
            throw '[log] textは必須です';
        const dat = '--- ' + CmnLib_1.getDateStr('-', '_', '')
            + ' [fn:' + DebugMng.scrItr.scriptFn
            + ' line:' + DebugMng.scrItr.lineNum + ']'
            + ' os:' + CmnLib_1.CmnLib.osName
            + ' prj:' + this.sys.cur
            + '\n' + hArg.text + '\n';
        this.sys.appendFile(this.sys.path_desktop + 'log.txt', dat, err => { if (err)
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
        DebugMng.myTrace((hArg.text ? hArg.text : `(text is ${String(hArg.text)})`), 'I');
        return false;
    }
    static fncMyTrace(txt, lvl = 'E') {
        let mes = '{' + lvl + '} ';
        if (DebugMng.scrItr)
            mes += `(fn:${DebugMng.scrItr.scriptFn} line:${DebugMng.scrItr.lineNum}) `;
        mes += txt;
        DebugMng.dspDbg(mes, lvl);
        let sty = '';
        switch (lvl) {
            case 'D':
                sty = 'color:#0055AA;';
                break;
            case 'W':
                sty = 'color:#FF8800;';
                break;
            case 'F':
                sty = 'color:#BB0000;';
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
                console.error('%c' + mes, 'color:#FF3300;');
                return;
            default:
                sty = 'color:black;';
                mes = ' ' + mes;
        }
        console.info('%c' + mes, sty);
    }
    static dspDbg(mes, lvl) {
        let sty = '';
        switch (lvl) {
            case 'D':
                sty = '#0055AA';
                break;
            case 'W':
                sty = '#FF8800';
                break;
            case 'F':
                sty = '#BB0000';
                break;
            case 'ET':
            case 'E':
                sty = '#FF3300';
                break;
            default: sty = 'black';
        }
        DebugMng.spnDbg.innerHTML += `<span style='color:${sty};'>${mes}</span><br/>`;
        DebugMng.spnDbg.hidden = false;
    }
    ;
}
DebugMng.title = () => false;
DebugMng.myTrace = (txt, lvl = 'E') => {
    let mes = '{' + lvl + '} ' + txt;
    let sty = '';
    switch (lvl) {
        case 'D':
            sty = 'color:#0055AA;';
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
exports.DebugMng = DebugMng;
//# sourceMappingURL=DebugMng.js.map