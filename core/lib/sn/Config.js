"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CmnLib_1 = require("./CmnLib");
class Config {
    constructor(sys, fncLoaded, oCfg4tst) {
        this.sys = sys;
        this.oCfg = {
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
                debugLog: false,
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
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            this.oCfg.save_ns = (_a = oCfg === null || oCfg === void 0 ? void 0 : oCfg.save_ns) !== null && _a !== void 0 ? _a : this.oCfg.save_ns;
            this.oCfg.coder = (_b = oCfg === null || oCfg === void 0 ? void 0 : oCfg.coder) !== null && _b !== void 0 ? _b : this.oCfg.coder;
            CmnLib_1.CmnLib.stageW = this.oCfg.window.width = Number((_d = (_c = oCfg === null || oCfg === void 0 ? void 0 : oCfg.window) === null || _c === void 0 ? void 0 : _c.width) !== null && _d !== void 0 ? _d : this.oCfg.window.width);
            CmnLib_1.CmnLib.stageH = this.oCfg.window.height = Number((_f = (_e = oCfg === null || oCfg === void 0 ? void 0 : oCfg.window) === null || _e === void 0 ? void 0 : _e.height) !== null && _f !== void 0 ? _f : this.oCfg.window.height);
            this.oCfg.book = Object.assign(Object.assign({}, this.oCfg.book), oCfg.book);
            this.oCfg.log.max_len = (_j = (_h = (_g = oCfg.log) === null || _g === void 0 ? void 0 : _g.max_len) === null || _h === void 0 ? void 0 : _h.max_len) !== null && _j !== void 0 ? _j : this.oCfg.log.max_len;
            this.oCfg.init = Object.assign(Object.assign({}, this.oCfg.init), oCfg.init);
            if ('init' in oCfg) {
                for (const n in this.oCfg.init) {
                    const v = String(this.oCfg.init[n]);
                    if (v.charAt(0) == '#')
                        this.oCfg.init[n] = parseInt(v.slice(1), 16);
                }
            }
            this.oCfg.debug = Object.assign(Object.assign({}, this.oCfg.debug), oCfg.debug);
            CmnLib_1.CmnLib.debugLog = this.oCfg.debug.debugLog;
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
        const fn = sys.cur + 'prj.json';
        sys.fetch(fn)
            .then(res => res.text())
            .then(d => sys.pre('json', d))
            .then(s => JSON.parse(s))
            .then(load)
            .catch(e => console.error(`load err fn:prj.json e:%o`, e));
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
Config.EXT_SPRITE = 'png|jpg|jpeg|json|svg|webp|mp4|webm';
Config.EXT_SCRIPT = 'sn';
Config.EXT_FONT = 'woff2|otf|ttf';
Config.EXT_SOUND = 'mp3|m4a|ogg|aac|flac|wav';
Config.EXT_HTML = 'htm|html';
//# sourceMappingURL=Config.js.map