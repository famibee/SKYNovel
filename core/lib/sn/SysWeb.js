"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SysBase_1 = require("./SysBase");
const CmnLib_1 = require("./CmnLib");
const Main_1 = require("./Main");
const strLocal = require('store');
class SysWeb extends SysBase_1.SysBase {
    constructor(hPlg = {}, $cur = 'prj/') {
        super(hPlg, $cur);
        this.hPlg = hPlg;
        this.$cur = $cur;
        this.def_prj = 'prj';
        this.getURLQ = (loc) => {
            const arg = {};
            const urlq = loc.search.slice(1);
            if (urlq)
                for (const v of urlq.split('&')) {
                    const elm = v.split('=');
                    arg[elm[0]] = elm[1];
                }
            return arg;
        };
        this.run = (prj) => {
            if (this.main)
                this.main.destroy();
            this.now_prj = prj || this.def_prj;
            const idxEnd = this.$cur.lastIndexOf('/', this.$cur.length - 2) + 1;
            const idxStart = this.$cur.lastIndexOf('/', idxEnd - 2) + 1;
            this.$cur = location.href.slice(0, location.href.lastIndexOf('/') + 1)
                + (idxEnd == 0 ? '' : this.$cur.slice(idxStart, idxEnd))
                + this.now_prj + '/';
            this.main = new Main_1.Main(this);
        };
        this.now_prj = ':';
        this.ns = '';
        this.navigate_to = (hArg) => {
            const url = hArg.url;
            if (!url)
                throw '[navigate_to] urlは必須です';
            window.open(url, '_blank');
            return false;
        };
        this.title = (hArg) => {
            const text = hArg.text;
            if (!text)
                throw '[title] textは必須です';
            document.title = text;
            for (const v of document.querySelectorAll('[data-title]'))
                v.textContent = text;
            return false;
        };
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
        this.savePic = (fn, data_url) => {
            const anchor = document.createElement('a');
            anchor.href = data_url;
            anchor.download = fn;
            const e = document.createEvent('MouseEvent');
            e.initEvent('click');
            anchor.dispatchEvent(e);
            if (CmnLib_1.CmnLib.devtool)
                console.log('画像ファイルをダウンロードします');
        };
        const idxCur = this.$cur.lastIndexOf('/', this.$cur.length - 2);
        this.def_prj = this.$cur.slice(idxCur + 1, -1);
        window.onload = () => {
            for (const v of document.querySelectorAll('[data-prj]')) {
                v.addEventListener('click', () => {
                    const elm = v.attributes.getNamedItem('data-prj');
                    if (!elm)
                        return;
                    const prj = elm.value;
                    if (this.now_prj != prj)
                        this.run(prj);
                });
            }
            for (const v of document.querySelectorAll('[data-reload]')) {
                v.addEventListener('click', () => this.run(this.now_prj));
            }
            this.run(this.getURLQ(location)['cur']);
        };
        if ('webkitFullscreenEnabled' in document) {
            this.tgl_full_scr = o => this.regEvt_FullScr(o, 'webkitRequestFullscreen');
        }
        else if ('mozFullScreenEnabled' in document) {
            this.tgl_full_scr = o => this.regEvt_FullScr(o, 'mozRequestFullScreen');
        }
        else if ('msFullscreenEnabled' in document) {
            this.tgl_full_scr = o => this.regEvt_FullScr(o, 'msRequestFullscreen');
        }
        else if (document['fullscreenEnabled']) {
            this.tgl_full_scr = o => this.regEvt_FullScr(o, 'requestFullscreen');
        }
    }
    loadPathAndVal(hPathFn2Exts, fncLoaded, cfg) {
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
            this.ns = cfg.getNs();
            this.sys = strLocal.get(this.ns + 'sys');
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
            this.data.mark = strLocal.get(this.ns + 'mark');
            this.data.kidoku = strLocal.get(this.ns + 'kidoku');
        }
        comp(this.data);
        const hn = document.location.hostname;
        hTmp['const.sn.isDebugger'] = (hn == 'localhost' || hn == '127.0.0.1');
    }
    flush() {
        strLocal.set(this.ns + 'sys', this.data.sys);
        strLocal.set(this.ns + 'mark', this.data.mark);
        strLocal.set(this.ns + 'kidoku', this.data.kidoku);
    }
    regEvt_FullScr(hArg, to_fnc_name) {
        const cvs = document.getElementById('skynovel');
        const elm = cvs ? cvs : document.body;
        const key = hArg.key;
        if (key) {
            elm.addEventListener('keydown', (e) => {
                if (e.key != key)
                    return;
                e.stopPropagation();
                elm[to_fnc_name]();
            });
            return false;
        }
        return false;
    }
}
exports.SysWeb = SysWeb;
//# sourceMappingURL=SysWeb.js.map