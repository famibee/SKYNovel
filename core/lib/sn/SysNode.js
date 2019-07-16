"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SysBase_1 = require("./SysBase");
const CmnLib_1 = require("./CmnLib");
const m_fs = require("fs-extra");
class SysNode extends SysBase_1.SysBase {
    constructor() {
        super(...arguments);
        this.normalize = (src, _form) => src;
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
        this.appendFile = m_fs.appendFile;
    }
    loadPathAndVal(hPathFn2Exts, fncLoaded, _cfg) {
        (async () => {
            const fn = this.arg.cur + 'path.json' + this.crypt_;
            const mes = m_fs.readFileSync(fn, { encoding: 'utf8' });
            const json = JSON.parse(this.pre(fn, mes));
            for (const nm in json) {
                const h = hPathFn2Exts[nm] = json[nm];
                for (const ext in h)
                    if (ext != ':cnt')
                        h[ext] = this.arg.cur + h[ext];
            }
            fncLoaded();
        })();
    }
}
exports.SysNode = SysNode;
//# sourceMappingURL=SysNode.js.map