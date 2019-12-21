"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CmnLib_1 = require("./CmnLib");
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
                pack_exc: '',
            },
            log: { max_len: 1024 },
            init: {
                bg_color: 0x000000,
                tagch_msecwait: 10,
                auto_msecpagewait: 3500,
                escape: '',
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
        const load = (oCfg) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
            this.oCfg.first_script = (_b = (_a = oCfg) === null || _a === void 0 ? void 0 : _a.first_script, (_b !== null && _b !== void 0 ? _b : this.oCfg.first_script));
            this.oCfg.coder = (_d = (_c = oCfg) === null || _c === void 0 ? void 0 : _c.coder, (_d !== null && _d !== void 0 ? _d : this.oCfg.coder));
            CmnLib_1.CmnLib.stageW = this.oCfg.window.width = Number((_g = (_f = (_e = oCfg) === null || _e === void 0 ? void 0 : _e.window) === null || _f === void 0 ? void 0 : _f.width, (_g !== null && _g !== void 0 ? _g : this.oCfg.window.width)));
            CmnLib_1.CmnLib.stageH = this.oCfg.window.height = Number((_k = (_j = (_h = oCfg) === null || _h === void 0 ? void 0 : _h.window) === null || _j === void 0 ? void 0 : _j.height, (_k !== null && _k !== void 0 ? _k : this.oCfg.window.height)));
            if ('book' in oCfg) {
                const b = this.oCfg.book;
                for (const nm in b) {
                    if (nm != 'inc') {
                        b[nm] = CmnLib_1.CmnLib.argChk_Boolean(oCfg.book, nm, b[nm]);
                        continue;
                    }
                    for (const v of b[nm]) {
                        if (!sys.existsSync(sys.cur + v.path))
                            continue;
                        b.inc_path[v.path] = true;
                    }
                }
            }
            this.oCfg.log.max_len = (_o = (_m = (_l = oCfg.log) === null || _l === void 0 ? void 0 : _l.max_len) === null || _m === void 0 ? void 0 : _m.max_len, (_o !== null && _o !== void 0 ? _o : this.oCfg.log.max_len));
            if ('init' in oCfg) {
                const i = this.oCfg.init;
                for (const nm in i) {
                    const v = oCfg.init[nm];
                    if (v)
                        i[nm] = (v.charAt(0) == '#')
                            ? parseInt(v.slice(1), 16)
                            : v;
                }
            }
            if ('debug' in oCfg) {
                const d = this.oCfg.debug;
                for (const nm in d) {
                    d[nm] = CmnLib_1.CmnLib.argChk_Boolean(oCfg.debug, nm, d[nm]);
                }
            }
            CmnLib_1.CmnLib.devtool = this.oCfg.debug.devtool;
            sys.loadPathAndVal(this.hPathFn2Exts, () => {
                this.$existsBreakline = this.matchPath('^breakline$', Config.EXT_SPRITE).length > 0;
                this.$existsBreakpage = this.matchPath('^breakpage$', Config.EXT_SPRITE).length > 0;
                fncLoaded();
            }, this);
        };
        if (oCfg4tst) {
            load(oCfg4tst);
            return;
        }
        const fn = sys.cur + 'prj.json' + sys.crypt_;
        sys.fetch(fn)
            .then(res => res.text())
            .then(d => JSON.parse(sys.pre(fn, d)))
            .then(load);
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
                        if (`|${extptn}|`.indexOf(`|${e3}|`) == -1)
                            continue;
                        a.fn = utn;
                        break;
                    }
            }
        }
        const h_exts = this.hPathFn2Exts[a.fn];
        if (!h_exts)
            throw `サーチパスに存在しないファイル【${fn}】です`;
        let ret = '';
        if (!a.ext) {
            const hcnt = CmnLib_1.int(h_exts[':cnt']);
            if (extptn == '') {
                if (hcnt > 1)
                    throw `指定ファイル【${fn}】が複数マッチします。サーチ対象拡張子群【${extptn}】で絞り込むか、ファイル名を個別にして下さい。`;
                return fn;
            }
            const search_exts = `|${extptn}|`;
            if (hcnt > 1) {
                let cnt = 0;
                for (const e2 in h_exts) {
                    if (search_exts.indexOf(`|${e2}|`) == -1)
                        continue;
                    if (++cnt > 1)
                        throw `指定ファイル【${fn}】が複数マッチします。サーチ対象拡張子群【${extptn}】で絞り込むか、ファイル名を個別にして下さい。`;
                }
            }
            for (let e in h_exts) {
                if (search_exts.indexOf(`|${e}|`) == -1)
                    continue;
                return h_exts[e];
            }
            throw `サーチ対象拡張子群【${extptn}】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【${fn}】`;
        }
        if (extptn != '') {
            const search_exts2 = `|${extptn}|`;
            if (search_exts2.indexOf(`|${a.ext}|`) == -1) {
                throw `指定ファイルの拡張子【${a.ext}】は、サーチ対象拡張子群【${extptn}】にマッチしません。探索ファイル名=【${fn}】`;
            }
        }
        ret = h_exts[a.ext];
        if (!ret)
            throw `サーチパスに存在しない拡張子【${a.ext}】です。探索ファイル名=【${fn}】、サーチ対象拡張子群【${extptn}】`;
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
exports.Config = Config;
Config.EXT_SPRITE = 'png_|jpg_|jpeg_|json_|svg_|mp4_|png|jpg|jpeg|svg|json|mp4';
Config.EXT_SCRIPT = 'sn_|sn';
Config.EXT_FONT = 'woff2|otf|ttf';
Config.EXT_SOUND = 'mp3_|mp3|m4a_|m4a|ogg_|ogg|aac_|aac|webm_|webm|flac_|flac|wav';
//# sourceMappingURL=Config.js.map