"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SysBase_1 = require("./SysBase");
const CmnLib_1 = require("./CmnLib");
const m_fs = require("fs-extra");
const m_path = require("path");
class SysNode extends SysBase_1.SysBase {
    constructor() {
        super(...arguments);
        this.normalize = (src, _form) => src;
        this.regNoUseSysFile = /^(\..+|.+.db|.+.ini|_notes|Icon\r)$/;
        this.hExtNG = {
            'db': 0,
            'ini': 0,
            'DS_Store': 0
        };
        this.retinaFnTail = '';
        this.hPathFn2Retina = {};
        this.isApp = () => true;
        this.existsSync = m_fs.existsSync;
        this.writeFile = m_fs.writeFile;
        this.savePic = (fn, data_url) => {
            const bs64 = data_url.slice(data_url.indexOf(',', 20) + 1);
            this.writeFile(fn, Buffer.from(bs64, 'base64'), err => {
                if (err)
                    throw err;
                if (CmnLib_1.CmnLib.devtool)
                    console.log(`画像ファイル ${fn} を保存しました`);
            });
        };
        this.isDirectory = (path) => m_fs.lstatSync(path).isDirectory();
        this.readdirSync = m_fs.readdirSync;
        this.appendFile = m_fs.appendFile;
    }
    loadPathAndVal(hFn2Path, fncLoaded) {
        const REG_FN_RATE_SPRIT = /(.+?)(?:%40(\d)x)?(\.\w+)/;
        this.foldProc(this.arg.cur, () => { }, (dir) => {
            const wd = m_path.resolve(this.arg.cur, dir);
            this.foldProc(wd, (url, nm) => {
                const fo_ext = CmnLib_1.CmnLib.getExt(nm);
                if (fo_ext in this.hExtNG)
                    return;
                const fo_fn = CmnLib_1.CmnLib.getFn(nm);
                let h_exts = hFn2Path[fo_fn];
                if (!h_exts) {
                    h_exts = hFn2Path[fo_fn] = { ':cnt': '1' };
                }
                else if (fo_ext in h_exts) {
                    throw Error(`[xmlCfg.search.path] サーチパスにおいてファイル名＋拡張子【${fo_fn}】が重複しています。フォルダを縦断検索するため許されません`);
                }
                else {
                    h_exts[':cnt'] = String(CmnLib_1.uint(h_exts[':cnt']) + 1);
                }
                h_exts[fo_ext] = url;
                if (!CmnLib_1.CmnLib.isRetina)
                    return;
                const oRate = REG_FN_RATE_SPRIT.exec(url);
                if (!oRate)
                    return;
                if (oRate[2])
                    return;
                const fn_xga = oRate[1] + this.retinaFnTail + oRate[3];
                if (this.existsSync(fn_xga)) {
                    this.hPathFn2Retina[fo_fn] = true;
                    h_exts[fo_ext] = fn_xga;
                    return;
                }
                h_exts[fo_ext] = url;
            }, () => { });
        });
        fncLoaded();
    }
    foldProc(wd, fnc, fncFld) {
        for (const nm of m_fs.readdirSync(wd)) {
            if (this.regNoUseSysFile.test(nm))
                continue;
            const url = m_path.resolve(wd, this.normalize(nm, 'NFC'));
            if (m_fs.lstatSync(url).isDirectory()) {
                fncFld(nm);
                continue;
            }
            fnc(url, nm);
        }
    }
}
exports.SysNode = SysNode;
//# sourceMappingURL=SysNode.js.map