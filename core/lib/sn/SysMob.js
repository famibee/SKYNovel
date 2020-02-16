"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CmnLib_1 = require("./CmnLib");
const SysBase_1 = require("./SysBase");
const Main_1 = require("./Main");
class SysMob extends SysBase_1.SysBase {
    constructor(hPlg = {}, arg = { cur: 'prj/', crypt: false, dip: '' }) {
        super(hPlg, arg);
        this.fetch = (url) => new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest;
            xhr.onload = () => resolve(new Response(xhr.responseText, { status: xhr.status }));
            xhr.onerror = () => reject(new TypeError('Local request failed'));
            xhr.open('GET', url);
            xhr.send(null);
        });
        this.readFile = (path, callback) => {
            try {
                (async () => {
                    const res = await this.fetch(path);
                    if (!res.ok)
                        throw Error(res.statusText);
                    callback(null, new Buffer(await res.text()));
                })();
            }
            catch (e) {
                console.error('Error:', e);
            }
        };
        document.addEventListener('deviceready', () => {
            const main = new Main_1.Main(this);
            document.addEventListener('pause', () => main.pauseDev(), { passive: true });
            document.addEventListener('resume', () => main.resumeDev(), { passive: true });
        }, { once: true, passive: true });
    }
    loadPathAndVal(hPathFn2Exts, fncLoaded, cfg) {
        (async () => {
            const fn = this.arg.cur + 'path.json' + this.crypt_;
            const res = await this.fetch(fn);
            if (!res.ok)
                throw Error(res.statusText);
            const mes = await res.text();
            const json = JSON.parse(this.pre(fn, mes));
            for (const nm in json) {
                const h = hPathFn2Exts[nm] = json[nm];
                for (const ext in h)
                    if (ext != ':cnt')
                        h[ext] = this.arg.cur + h[ext];
            }
            const cvs = document.getElementById(CmnLib_1.CmnLib.sn_id);
            if (cvs) {
                const zoom = (screen.width > screen.height ? screen.height : screen.width) / cfg.oCfg.window.height;
                this.resolution = zoom;
                fncLoaded();
            }
        })();
    }
    initVal(data, hTmp, comp) {
        if (this.sys == undefined) {
            hTmp['const.sn.isFirstBoot'] = true;
            this.data.sys = data['sys'];
            this.data.mark = data['mark'];
            this.data.kidoku = data['kidoku'];
            this.flush();
        }
        else {
            hTmp['const.sn.isFirstBoot'] = false;
            this.data.sys = this.sys;
        }
        comp(this.data);
        const hn = document.location.hostname;
        hTmp['const.sn.isDebugger'] = (hn == 'localhost' || hn == '127.0.0.1');
    }
    flush() {
    }
}
exports.SysMob = SysMob;
//# sourceMappingURL=SysMob.js.map