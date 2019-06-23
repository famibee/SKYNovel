"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CmnLib_1 = require("./CmnLib");
const DebugMng_1 = require("./DebugMng");
class Config {
    constructor(sys, fncLoaded, oCfg4tst) {
        this.sys = sys;
        this.oCfg = {
            first_script: 'main',
            save_ns: '',
            coder: { len: 0x360 },
            window: {
                width: 300,
                height: 300,
            },
            book: {
                title: '',
                creator: '',
                cre_url: '',
                publisher: '',
                pub_url: '',
                detail: '',
                version: '1.0',
                nocode_reg: 'system/.+.mp3|m4a|config/.+',
                nocode: '',
                pack_exc: '\.swf\.cache',
            },
            log: { max_len: 1024 },
            init: {
                bg_color: 0x000000,
                tagch_msecwait: 10,
                auto_msecpagewait: 3500,
            },
            debug: {
                devtool: false,
                token: false,
                tag: false,
                putCh: false,
                slideBaseSpan: false,
                baseTx: false,
                masume: false,
                variable: false,
            },
        };
        this.userFnTail = '';
        this.hPathFn2Exts = {};
        this.getJsonSearchPath = () => JSON.stringify(this.hPathFn2Exts);
        this.$existsBreakline = false;
        this.$existsBreakpage = false;
        let err_mes = '';
        const load = (oCfg) => {
            const oIni = Object.assign({}, this.oCfg);
            this.oCfg = oCfg;
            err_mes = 'first_script';
            if (!('first_script' in oCfg))
                this.oCfg.first_script = oIni.first_script;
            err_mes = 'coder';
            if (!('coder' in oCfg))
                this.oCfg.coder = oIni.coder;
            err_mes = 'window';
            if ('window' in oCfg) {
                CmnLib_1.CmnLib.argChk_Num(this.oCfg, 'width', oIni.window.width);
                CmnLib_1.CmnLib.argChk_Num(this.oCfg, 'height', oIni.window.height);
            }
            else {
                this.oCfg.window = oIni.window;
            }
            CmnLib_1.CmnLib.stageW = this.oCfg.window.width;
            CmnLib_1.CmnLib.stageH = this.oCfg.window.height;
            err_mes = 'book';
            if ('book' in oCfg)
                for (const nm in oIni) {
                    if (nm != 'inc') {
                        CmnLib_1.CmnLib.argChk_Boolean(this.oCfg.book, nm, oIni.book[nm]);
                        continue;
                    }
                    for (const v of oIni[nm]) {
                        if (!sys.existsSync(sys.cur + v.path))
                            continue;
                        this.oCfg.book.inc_path[v.path] = true;
                    }
                }
            else
                this.oCfg.book = oIni.book;
            err_mes = 'log';
            if (!('log' in oCfg))
                this.oCfg.log = { max_len: oIni.log.max_len };
            err_mes = 'init';
            if ('init' in oCfg)
                for (const nm in oIni) {
                    const v = oIni.init[nm];
                    if (!v)
                        continue;
                    if (v.charAt(0) == '#')
                        this.oCfg.init[nm] = parseInt(v.slice(1), 16);
                    else
                        CmnLib_1.CmnLib.argChk_Num(this.oCfg, nm, oIni.init[nm]);
                }
            else
                this.oCfg.init = oIni.init;
            err_mes = 'debug';
            if ('debug' in oCfg)
                for (const nm in oIni) {
                    CmnLib_1.CmnLib.argChk_Boolean(this.oCfg.debug, nm, oIni.debug[nm]);
                }
            else
                this.oCfg.debug = oIni.debug;
            CmnLib_1.CmnLib.devtool = this.oCfg.debug.devtool;
            err_mes = 'sys.loadPathAndVal';
            sys.loadPathAndVal(this.hPathFn2Exts, () => {
                this.$existsBreakline = this.matchPath('^breakline$', Config.EXT_SPRITE).length > 0;
                this.$existsBreakpage = this.matchPath('^breakpage$', Config.EXT_SPRITE).length > 0;
                fncLoaded();
            }, this);
        };
        if (oCfg4tst) {
            for (const key in this.oCfg) {
                if (key in oCfg4tst)
                    this.oCfg[key] = oCfg4tst[key];
            }
            load(this.oCfg);
            return;
        }
        sys.fetch(sys.cur + 'prj.json')
            .then(response => {
            if (response.ok)
                return response.json();
            throw new Error(`load prj.json err = ${response.statusText}`);
        })
            .then(load)
            .catch(err => DebugMng_1.DebugMng.myTrace(`load ${sys.cur}prj.json "${err_mes}" = ${err}`));
    }
    get existsBreakline() { return this.$existsBreakline; }
    get existsBreakpage() { return this.$existsBreakpage; }
    getNs() { return `skynovel.${this.oCfg.save_ns} - `; }
    searchPath(fn, extptn = '') {
        if (!fn)
            throw '[searchPath] fnが空です';
        if (fn.substr(0, 7) == 'http://')
            return fn;
        if (fn.substr(0, 9) == 'desktop:/') {
            return this.sys.path_desktop + fn.slice(9);
        }
        if (fn.substr(0, 10) == 'userdata:/') {
            return this.sys.path_userdata + fn.slice(10);
        }
        const a = {
            fn: CmnLib_1.CmnLib.getFn(fn),
            ext: CmnLib_1.CmnLib.getExt(fn)
        };
        if (this.userFnTail) {
            const utn = a.fn + '@@' + this.userFnTail;
            if (utn in this.hPathFn2Exts) {
                if (extptn == '')
                    a.fn = utn;
                else
                    for (let e3 in this.hPathFn2Exts[utn]) {
                        if (('|' + extptn + '|').indexOf('|' + e3 + '|') == -1)
                            continue;
                        a.fn = utn;
                        break;
                    }
            }
        }
        const h_exts = this.hPathFn2Exts[a.fn];
        if (!h_exts)
            throw 'サーチパスに存在しないファイル【' + fn + '】です';
        let ret = '';
        if (!a.ext) {
            const hcnt = CmnLib_1.int(h_exts[':cnt']);
            if (extptn == '') {
                if (hcnt > 1)
                    throw '指定ファイル【' + fn + '】が複数マッチします。サーチ対象拡張子群【' + extptn + '】で絞り込むか、ファイル名を個別にして下さい。';
                return fn;
            }
            const search_exts = '|' + extptn + '|';
            if (hcnt > 1) {
                let cnt = 0;
                for (const e2 in h_exts) {
                    if (search_exts.indexOf('|' + e2 + '|') == -1)
                        continue;
                    if (++cnt > 1)
                        throw '指定ファイル【' + fn + '】が複数マッチします。サーチ対象拡張子群【' + extptn + '】で絞り込むか、ファイル名を個別にして下さい。';
                }
            }
            for (let e in h_exts) {
                if (search_exts.indexOf('|' + e + '|') == -1)
                    continue;
                return h_exts[e];
            }
            throw 'サーチ対象拡張子群【' + extptn + '】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【' + fn + '】';
        }
        if (extptn != '') {
            const search_exts2 = '|' + extptn + '|';
            if (search_exts2.indexOf('|' + a.ext + '|') == -1) {
                throw '指定ファイルの拡張子【' + a.ext + '】は、サーチ対象拡張子群【' + extptn + '】にマッチしません。探索ファイル名=【' + fn + '】';
            }
        }
        ret = h_exts[a.ext];
        if (!ret)
            throw 'サーチパスに存在しない拡張子【' + a.ext + '】です。探索ファイル名=【' + fn + '】、サーチ対象拡張子群【' + extptn + '】';
        return ret;
    }
    matchPath(fnptn, extptn = '') {
        const aRet = [];
        const regPtn = new RegExp(fnptn);
        const regExt = new RegExp(extptn);
        for (let fn in this.hPathFn2Exts) {
            if (fn.search(regPtn) == -1)
                continue;
            const h_exts = this.hPathFn2Exts[fn];
            if (extptn == '') {
                aRet.push(h_exts);
                continue;
            }
            const o = {};
            let isa = false;
            for (const ext in h_exts) {
                if (ext.search(regExt) == -1)
                    continue;
                o[ext] = h_exts[ext];
                isa = true;
            }
            if (isa)
                aRet.push(o);
        }
        return aRet;
    }
}
Config.EXT_SPRITE = 'png_|jpg_|jpeg_|json_|svg_|mp4_|png|jpg|jpeg|svg|json|mp4';
Config.EXT_SCRIPT = 'sn_|sn';
Config.EXT_FONT = 'woff2|otf|ttf';
Config.EXT_SOUND = 'mp3_|mp3|m4a_|m4a|ogg_|ogg|aac_|aac|webm_|webm|flac_|flac|wav';
exports.Config = Config;
//# sourceMappingURL=Config.js.map