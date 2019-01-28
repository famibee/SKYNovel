"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SysBase_1 = require("./SysBase");
const Main_1 = require("./Main");
class SysMob extends SysBase_1.SysBase {
    constructor(hPlg = {}, $cur = 'prj/') {
        super(hPlg, $cur);
        this.hPlg = hPlg;
        this.$cur = $cur;
        this.readFile = (path, callback) => {
            try {
                (async () => {
                    const res = await fetch(path);
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
            document.addEventListener('pause', () => console.log('onPause()'), false);
            document.addEventListener('resume', () => console.log('onResume()'), false);
            new Main_1.Main(this);
        }, false);
    }
    loadPathAndVal(hPathFn2Exts, fncLoaded, _cfg) {
        (async () => {
            const res = await fetch(this.$cur + 'path.json');
            if (!res.ok)
                throw Error(res.statusText);
            const json = await res.json();
            for (const nm in json) {
                const h = hPathFn2Exts[nm] = json[nm];
                for (const ext in h)
                    if (ext != ':cnt')
                        h[ext] = this.$cur + h[ext];
            }
            fncLoaded();
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