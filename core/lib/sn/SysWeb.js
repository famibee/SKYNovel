"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SysBase_1 = require("./SysBase");
const CmnLib_1 = require("./CmnLib");
const Main_1 = require("./Main");
const strLocal = require('store');
require("devtools-detect");
class SysWeb extends SysBase_1.SysBase {
    constructor(hPlg = {}, arg = { cur: 'prj/', crypto: false, dip: '' }) {
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
        this._export = () => {
            const s = JSON.stringify({
                'sys': this.data.sys,
                'mark': this.data.mark,
                'kidoku': this.data.kidoku,
            });
            const s2 = this.crypto ? String(this.enc(s)) : s;
            const blob = new Blob([s2], { 'type': 'text/json' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = (this.crypto ? '' : 'no_crypto_')
                + this.cfg.getNs() + CmnLib_1.getDateStr('-', '_', '') + '.swpd';
            a.click();
            if (CmnLib_1.CmnLib.debugLog)
                console.log('プレイデータをエクスポートしました');
            setTimeout(() => this.fire('sn:exported', new Event('click')), 10);
            return false;
        };
        this._import = () => {
            new Promise((rs, rj) => {
                const inp = document.createElement('input');
                inp.type = 'file';
                inp.accept = '.swpd, text/plain';
                inp.onchange = (e) => {
                    var _a, _b;
                    const file = (_b = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b[0];
                    if (file)
                        rs(file);
                    else
                        rj();
                };
                inp.click();
            })
                .then((file) => new Promise(rs => {
                const rd = new FileReader();
                rd.readAsText(file);
                rd.onload = () => rs(rd.result);
            }))
                .then(async (s) => {
                const o = JSON.parse(this.crypto ? await this.pre('json', s) : s);
                if (!o.sys || !o.mark || !o.kidoku)
                    throw new Error('異常なプレイデータです');
                if (o.sys[SysBase_1.SysBase.VALNM_CFG_NS] != this.cfg.oCfg.save_ns) {
                    console.error(`別のゲーム【プロジェクト名=${o.sys[SysBase_1.SysBase.VALNM_CFG_NS]}】のプレイデータです`);
                    return;
                }
                this.data.sys = o.sys;
                this.data.mark = o.mark;
                this.data.kidoku = o.kidoku;
                this.flush();
                this.val.updateData(o);
                if (CmnLib_1.CmnLib.debugLog)
                    console.log('プレイデータをインポートしました');
                this.fire('sn:imported', new Event('click'));
            })
                .catch(e => console.error(`異常なプレイデータです ${e.message}`));
            return false;
        };
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
            fetch(path)
                .then(res => {
                if (!res.ok)
                    throw Error(res.statusText);
                callback(null, Buffer.from(res.text()));
            })
                .catch(e => console.error('Error:', e));
        };
        this.savePic = (fn, data_url) => {
            const a = document.createElement('a');
            a.href = data_url;
            a.download = fn;
            a.click();
            if (CmnLib_1.CmnLib.debugLog)
                console.log('画像ファイルをダウンロードします');
        };
        this.hAppendFile = {};
        this.appendFile = (path, data, _callback) => {
            var _a;
            const txt = ((_a = this.hAppendFile[path]) !== null && _a !== void 0 ? _a : '') + data;
            this.hAppendFile[path] = txt;
            const blob = new Blob([txt], { 'type': 'text/json' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = path;
            a.click();
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
                CmnLib_1.CmnLib.hDip = { ...CmnLib_1.CmnLib.hDip, ...JSON.parse(dip) };
            if (!CmnLib_1.CmnLib.argChk_Boolean(CmnLib_1.CmnLib.hDip, 'oninit_run', true))
                return;
            this.run((_a = sp.get('cur')) !== null && _a !== void 0 ? _a : '');
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
        super.loadPathAndVal(hPathFn2Exts, fncLoaded, cfg);
        (async () => {
            const fn = this.arg.cur + 'path.json';
            const res = await fetch(fn);
            if (!res.ok)
                throw Error(res.statusText);
            const mes = await res.text();
            const json = JSON.parse(await this.pre(fn, mes));
            for (const nm in json) {
                const h = hPathFn2Exts[nm] = json[nm];
                for (const ext in h)
                    if (ext != ':cnt')
                        h[ext] = this.arg.cur + h[ext];
            }
            fncLoaded();
        })();
    }
    initVal(data, hTmp, comp) {
        const hn = document.location.hostname;
        hTmp['const.sn.isDebugger'] = (hn == 'localhost' || hn == '127.0.0.1');
        this.val.defTmp('const.sn.displayState', () => this.isFullScr());
        const ns = this.cfg.getNs();
        this.flush = this.crypto
            ? () => {
                strLocal.set(ns + 'sys_', String(this.enc(JSON.stringify(this.data.sys))));
                strLocal.set(ns + 'mark_', String(this.enc(JSON.stringify(this.data.mark))));
                strLocal.set(ns + 'kidoku_', String(this.enc(JSON.stringify(this.data.kidoku))));
            }
            : () => {
                strLocal.set(ns + 'sys', this.data.sys);
                strLocal.set(ns + 'mark', this.data.mark);
                strLocal.set(ns + 'kidoku', this.data.kidoku);
            };
        const nm = ns + (this.arg.crypto ? 'sys_' : 'sys');
        if (hTmp['const.sn.isFirstBoot'] = (strLocal.get(nm) == undefined)) {
            this.data.sys = data.sys;
            this.data.mark = data.mark;
            this.data.kidoku = data.kidoku;
            this.flush();
            comp(this.data);
            return;
        }
        if (!this.crypto) {
            this.data.sys = strLocal.get(ns + 'sys');
            this.data.mark = strLocal.get(ns + 'mark');
            this.data.kidoku = strLocal.get(ns + 'kidoku');
            comp(this.data);
            return;
        }
        (async () => {
            let mes = '';
            try {
                mes = 'sys';
                this.data.sys = JSON.parse(await this.pre('json', strLocal.get(ns + 'sys_')));
                mes += Number(this.val.getVal('sys:TextLayer.Back.Alpha', 1));
                mes = 'mark';
                this.data.mark = JSON.parse(await this.pre('json', strLocal.get(ns + 'mark_')));
                mes = 'kidoku';
                this.data.kidoku = JSON.parse(await this.pre('json', strLocal.get(ns + 'kidoku_')));
            }
            catch (e) {
                console.error(`セーブデータ（${mes}）が壊れています。一度クリアする必要があります %o`, e);
            }
            comp(this.data);
        })();
    }
    init(hTag, appPixi, val, main) {
        super.init(hTag, appPixi, val, main);
        if (!this.cfg.oCfg.debug.devtool)
            window.addEventListener('devtoolschange', e => {
                if (!e.detail.isOpen)
                    return;
                console.error(`DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。`);
                main.destroy();
            }, { once: true, passive: true });
    }
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