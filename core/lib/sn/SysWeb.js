"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SysBase_1 = require("./SysBase");
const CmnLib_1 = require("./CmnLib");
const Main_1 = require("./Main");
const strLocal = require('store');
class SysWeb extends SysBase_1.SysBase {
    constructor(hPlg = {}, arg = { cur: 'prj/', crypt: false, dip: '' }) {
        super(hPlg, arg);
        this.def_prj = 'prj';
        this.run = async (prj) => {
            if (this.main) {
                const ms_late = 10;
                this.main.destroy(ms_late);
                await new Promise(r => setTimeout(r, ms_late));
            }
            this.now_prj = prj || this.def_prj;
            const idxEnd = this.arg.cur.lastIndexOf('/', this.arg.cur.length - 2) + 1;
            const idxStart = this.arg.cur.lastIndexOf('/', idxEnd - 2) + 1;
            this.arg.cur = location.href.slice(0, location.href.lastIndexOf('/') + 1)
                + (idxEnd == 0 ? '' : this.arg.cur.slice(idxStart, idxEnd))
                + this.now_prj + '/';
            this.main = new Main_1.Main(this);
        };
        this.now_prj = ':';
        this.ns = '';
        this.flushSub = () => { };
        this.navigate_to = hArg => {
            const url = hArg.url;
            if (!url)
                throw '[navigate_to] urlは必須です';
            window.open(url, '_blank');
            return false;
        };
        this.title = hArg => {
            const text = hArg.text;
            if (!text)
                throw '[title] textは必須です';
            document.title = text;
            for (const v of document.querySelectorAll('[data-title]'))
                v.textContent = text;
            return false;
        };
        this.isFullScr = () => ('mozFullScreen' in document)
            ? document['mozFullScreen']
            : document.fullscreen;
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
        const idxCur = arg.cur.lastIndexOf('/', arg.cur.length - 2);
        this.def_prj = arg.cur.slice(idxCur + 1, -1);
        window.onload = () => {
            var _a;
            for (const v of document.querySelectorAll('[data-prj]')) {
                v.addEventListener('click', () => {
                    const elm = v.attributes.getNamedItem('data-prj');
                    if (!elm)
                        return;
                    const prj = elm.value;
                    if (this.now_prj != prj)
                        this.run(prj);
                }, { passive: true });
            }
            for (const v of document.querySelectorAll('[data-reload]')) {
                v.addEventListener('click', () => this.run(this.now_prj), { passive: true });
            }
            if (arg.dip)
                CmnLib_1.CmnLib.hDip = JSON.parse(arg.dip);
            const sp = new URLSearchParams(location.search);
            const dip = sp.get('dip');
            if (dip)
                CmnLib_1.CmnLib.hDip = Object.assign(Object.assign({}, CmnLib_1.CmnLib.hDip), JSON.parse(dip));
            if (!CmnLib_1.CmnLib.argChk_Boolean(CmnLib_1.CmnLib.hDip, 'oninit_run', true))
                return;
            this.run((_a = sp.get('cur'), (_a !== null && _a !== void 0 ? _a : '')));
        };
        if ('webkitFullscreenEnabled' in document)
            this.tgl_full_scr = o => this.regEvt_FullScr(o, 'webkitRequestFullscreen', 'webkitCancelFullScreen', 'webkitFullscreenElement');
        else if ('mozFullScreenEnabled' in document)
            this.tgl_full_scr = o => this.regEvt_FullScr(o, 'mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement');
        else if ('msFullscreenEnabled' in document)
            this.tgl_full_scr = o => this.regEvt_FullScr(o, 'msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement');
        else if (document['fullscreenEnabled'])
            this.tgl_full_scr = o => this.regEvt_FullScr(o, 'requestFullscreen', 'exitFullscreen', 'fullscreenElement');
    }
    stop() {
        if (!this.main)
            return;
        this.main.destroy();
        this.main = null;
    }
    loadPathAndVal(hPathFn2Exts, fncLoaded, cfg) {
        (async () => {
            const fn = this.arg.cur + 'path.json' + this.crypt_;
            const res = await fetch(fn);
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
            this.ns = cfg.getNs();
            fncLoaded();
        })();
    }
    initVal(data, hTmp, comp) {
        this.flushSub = this.crypt
            ? () => {
                strLocal.set(this.ns + 'sys_', String(this.enc(JSON.stringify(this.data.sys))));
                strLocal.set(this.ns + 'mark_', String(this.enc(JSON.stringify(this.data.mark))));
                strLocal.set(this.ns + 'kidoku_', String(this.enc(JSON.stringify(this.data.kidoku))));
            }
            : () => {
                strLocal.set(this.ns + 'sys', this.data.sys);
                strLocal.set(this.ns + 'mark', this.data.mark);
                strLocal.set(this.ns + 'kidoku', this.data.kidoku);
            };
        if (strLocal.get(this.ns + 'sys' + this.crypt_) == undefined) {
            hTmp['const.sn.isFirstBoot'] = true;
            this.data.sys = data['sys'];
            this.data.mark = data['mark'];
            this.data.kidoku = data['kidoku'];
            this.flush();
        }
        else {
            hTmp['const.sn.isFirstBoot'] = false;
            if (this.crypt) {
                this.data.sys = JSON.parse(this.pre('_', strLocal.get(this.ns + 'sys_')));
                this.data.mark = JSON.parse(this.pre('_', strLocal.get(this.ns + 'mark_')));
                this.data.kidoku = JSON.parse(this.pre('_', strLocal.get(this.ns + 'kidoku_')));
            }
            else {
                this.data.sys = strLocal.get(this.ns + 'sys');
                this.data.mark = strLocal.get(this.ns + 'mark');
                this.data.kidoku = strLocal.get(this.ns + 'kidoku');
            }
        }
        comp(this.data);
        const hn = document.location.hostname;
        hTmp['const.sn.isDebugger'] = (hn == 'localhost' || hn == '127.0.0.1');
        this.val.defTmp('const.sn.displayState', () => this.isFullScr());
    }
    flush() { this.flushSub(); }
    regEvt_FullScr(hArg, go_fnc_name, exit_fnc_name, get_fnc_name) {
        const elm = document.body;
        const doc = document;
        if (!hArg.key) {
            if (doc[get_fnc_name] != null)
                doc[exit_fnc_name]();
            else
                elm[go_fnc_name]();
            this.resizeFramesWork();
            return false;
        }
        const key = hArg.key.toLowerCase();
        doc.addEventListener('keydown', (e) => {
            const key2 = (e.altKey ? (e.key == 'Alt' ? '' : 'alt+') : '')
                + (e.ctrlKey ? (e.key == 'Control' ? '' : 'ctrl+') : '')
                + (e.shiftKey ? (e.key == 'Shift' ? '' : 'shift+') : '')
                + e.key.toLowerCase();
            if (key2 != key)
                return;
            e.stopPropagation();
            if (doc[get_fnc_name] != null)
                doc[exit_fnc_name]();
            else
                elm[go_fnc_name]();
            this.resizeFramesWork();
        }, { passive: true });
        return false;
    }
    resizeFramesWork() {
        const is_fs = this.isFullScr();
        const ratioWidth = screen.width / CmnLib_1.CmnLib.stageW;
        const ratioHeight = screen.height / CmnLib_1.CmnLib.stageH;
        const ratio = (ratioWidth < ratioHeight) ? ratioWidth : ratioHeight;
        this.reso4frame = is_fs ? 1 : ratio;
        this.ofsLeft4frm = is_fs ? 0 : (screen.width - CmnLib_1.CmnLib.stageW * this.reso4frame * CmnLib_1.CmnLib.cvsScale) / 2;
        this.ofsTop4frm = is_fs ? 0 : (screen.height - CmnLib_1.CmnLib.stageH * this.reso4frame * CmnLib_1.CmnLib.cvsScale) / 2;
        this.resizeFrames();
    }
}
exports.SysWeb = SysWeb;
//# sourceMappingURL=SysWeb.js.map