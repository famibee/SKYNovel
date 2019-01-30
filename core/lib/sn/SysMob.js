"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SysBase_1 = require("./SysBase");
const Main_1 = require("./Main");
class SysMob extends SysBase_1.SysBase {
    constructor(hPlg = {}, $cur = 'prj/') {
        super(hPlg, $cur);
        this.hPlg = hPlg;
        this.$cur = $cur;
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
            document.addEventListener('pause', () => main.pauseDev(), false);
            document.addEventListener('resume', () => main.resumeDev(), false);
        }, false);
    }
    loadPathAndVal(hPathFn2Exts, fncLoaded, _cfg) {
        (async () => {
            const res = await this.fetch(this.$cur + 'path.json');
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
            const cvs = document.getElementById('skynovel');
            if (cvs) {
                const isWidthLongSide = screen.width > screen.height;
                console.log(`fn:SysMob.ts line:45 screen.width:${screen.width} screen.height:${screen.height} isWidthLongSide:${isWidthLongSide}`);
                const wp = (isWidthLongSide ? screen.width : screen.height)
                    / _cfg.oCfg.window.width;
                const hp = (!isWidthLongSide ? screen.width : screen.height)
                    / _cfg.oCfg.window.height;
                console.log(`fn:SysMob.ts line:49 wp:${wp} hp:${hp}`);
                const zoom = isWidthLongSide
                    ? (wp > hp ? wp : hp)
                    : (wp < hp ? wp : hp);
                console.log(`fn:SysMob.ts line:53 zoom:${zoom}`);
                var hasIndexedDB = !!indexedDB;
                console.log(`fn:SysMob.ts line:53 hasIndexedDB:${hasIndexedDB}`);
                cvs.style.zoom = `${zoom * 100}%`;
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