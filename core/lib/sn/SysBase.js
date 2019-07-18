"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SysBase {
    constructor(hPlg = {}, arg) {
        this.hPlg = hPlg;
        this.arg = arg;
        this.hFactoryCls = {};
        this.fetch = (url) => fetch(url);
        this.resolution = 1;
        this.reso4frame = 1;
        this.data = { sys: {}, mark: {}, kidoku: {} };
        this.close = () => false;
        this.navigate_to = () => false;
        this.title = () => false;
        this.tgl_full_scr = () => false;
        this.update_check = () => false;
        this.window = () => false;
        this.pre = (_ext, data) => data;
        this.enc = (data) => data;
        this.stk = () => '';
        this.isApp = () => false;
        this.$path_desktop = '';
        this.$path_userdata = '';
        this.existsSync = (_path) => true;
        this.writeFile = (_file, _data, _callback) => { };
        this.savePic = (_fn, _data_url) => { };
        this.appendFile = (_path, _data, _callback) => { };
        this.ofsLeft4frm = 0;
        this.ofsTop4frm = 0;
        const fncPre = hPlg['snsys_pre'];
        if (fncPre)
            fncPre.init({
                addTag: () => { },
                addLayCls: () => { },
                searchPath: () => '',
                getVal: () => { return {}; },
                resume: () => { },
                render: () => { },
                setPre: fnc => this.pre = fnc,
                setEnc: fnc => this.enc = fnc,
                getStK: fnc => this.stk = fnc,
            });
    }
    get cur() { return this.arg.cur; }
    get crypt() { return this.arg.crypt; }
    get crypt_() { return this.arg.crypt ? '_' : ''; }
    loadPathAndVal(_hPathFn2Exts, _fncLoaded, _cfg) { }
    initVal(_data, _hTmp, _comp) { }
    flush() { }
    init(cfg, hTag, appPixi, val, main) {
        this.val = val;
        this.appPixi = appPixi;
        this.val.setSys(this);
        this.hFactoryCls = {};
        for (const nm in this.hPlg) {
            this.hPlg[nm].init({
                addTag: (name, tag_fnc) => {
                    if (hTag[name])
                        throw `すでに定義済みのタグ[${name}]です`;
                    hTag[name] = tag_fnc;
                },
                addLayCls: (cls, fnc) => {
                    if (this.hFactoryCls[cls])
                        throw `すでに定義済みのレイヤcls【${cls}】です`;
                    this.hFactoryCls[cls] = fnc;
                },
                searchPath: (fn, extptn = '') => cfg.searchPath(fn, extptn),
                getVal: val.getVal,
                resume: () => main.resume(),
                render: (dsp, renTx, clear = false) => this.appPixi.renderer.render(dsp, renTx, clear),
                setPre: fnc => this.pre = fnc,
                setEnc: fnc => this.enc = fnc,
                getStK: fnc => this.stk = fnc,
            });
        }
        hTag.close = o => this.close(o);
        hTag.navigate_to = o => this.navigate_to(o);
        hTag.title = o => this.title(o);
        hTag.toggle_full_screen = o => this.tgl_full_scr(o);
        hTag.update_check = o => this.update_check(o);
        hTag.window = o => this.window(o);
        val.setVal_Nochk('tmp', 'const.sn.isApp', this.isApp());
    }
    get path_desktop() { return this.$path_desktop; }
    get path_userdata() { return this.$path_userdata; }
    resizeFrames() {
        const cr = this.appPixi.view.getBoundingClientRect();
        Array.prototype.slice.call(document.getElementsByTagName('iframe'))
            .forEach((it) => {
            const frmnm = `const.sn.frm.${it.id}`;
            it.style.left = this.ofsLeft4frm + cr.left
                + Number(this.val.getVal(`tmp:${frmnm}.x`)) * this.reso4frame
                + 'px';
            it.style.top = this.ofsTop4frm + cr.top
                + Number(this.val.getVal(`tmp:${frmnm}.y`)) * this.reso4frame
                + 'px';
            it.width = String(Number(this.val.getVal(`tmp:${frmnm}.width`))
                * this.reso4frame);
            it.height = String(Number(this.val.getVal(`tmp:${frmnm}.height`))
                * this.reso4frame);
        });
    }
}
exports.SysBase = SysBase;
//# sourceMappingURL=SysBase.js.map