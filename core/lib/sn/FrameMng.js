"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CmnLib_1 = require("./CmnLib");
const CmnTween_1 = require("./CmnTween");
const Config_1 = require("./Config");
const Tween = require('@tweenjs/tween.js').default;
const pixi_js_1 = require("pixi.js");
class FrameMng {
    constructor(cfg, hTag, appPixi, val, main, sys, hTwInf) {
        this.cfg = cfg;
        this.appPixi = appPixi;
        this.val = val;
        this.main = main;
        this.sys = sys;
        this.hTwInf = hTwInf;
        this.hIfrm = Object.create(null);
        this.hAEncImg = Object.create(null);
        this.hEncImgOUrl = Object.create(null);
        hTag.add_frame = o => this.add_frame(o);
        hTag.let_frame = o => this.let_frame(o);
        hTag.set_frame = o => this.set_frame(o);
        hTag.frame = o => this.frame(o);
        hTag.tsy_frame = o => this.tsy_frame(o);
    }
    setEvtMng(evtMng) { this.evtMng = evtMng; }
    destroy() {
        for (const n in this.hIfrm) {
            const f = this.hIfrm[n];
            f.parentElement.removeChild(f);
        }
        this.hIfrm = Object.create(null);
    }
    add_frame(hArg) {
        const id = hArg.id;
        if (!id)
            throw 'idは必須です';
        const src = hArg.src;
        if (!src)
            throw 'srcは必須です';
        const frmnm = `const.sn.frm.${id}`;
        if (this.val.getVal(`tmp:${frmnm}`))
            throw `frame【${id}】はすでにあります`;
        const a = CmnLib_1.CmnLib.argChk_Num(hArg, 'alpha', 1);
        const sx = CmnLib_1.CmnLib.argChk_Num(hArg, 'scale_x', 1);
        const sy = CmnLib_1.CmnLib.argChk_Num(hArg, 'scale_y', 1);
        const r = CmnLib_1.CmnLib.argChk_Num(hArg, 'rotate', 0);
        const v = CmnLib_1.CmnLib.argChk_Boolean(hArg, 'visible', true);
        const b_color = hArg.b_color ? ` background-color: ${hArg.b_color};` : '';
        const rct = this.rect(hArg);
        const scale = this.sys.reso4frame * CmnLib_1.CmnLib.cvsScale;
        this.appPixi.view.insertAdjacentHTML('beforebegin', `<iframe id="${id}" sandbox="allow-scripts allow-same-origin" style="z-index: 1; opacity: ${a}; position: absolute; left:${this.sys.ofsLeft4frm + rct.x * scale}px; top: ${this.sys.ofsTop4frm + rct.y * scale}px; border: 0px; overflow: hidden; display: ${v ? 'inline' : 'none'};${b_color}" width="${rct.width * scale}" height="${rct.height * scale}" transform: scale(${sx}, ${sy}) rotate(${r}deg);></iframe>`);
        const ifrm = document.getElementById(id);
        this.hIfrm[id] = ifrm;
        const win = ifrm.contentWindow;
        ifrm.onload = () => {
            this.val.setVal_Nochk('tmp', frmnm, true);
            this.val.setVal_Nochk('tmp', frmnm + '.alpha', a);
            this.val.setVal_Nochk('tmp', frmnm + '.x', rct.x);
            this.val.setVal_Nochk('tmp', frmnm + '.y', rct.y);
            this.val.setVal_Nochk('tmp', frmnm + '.scale_x', sx);
            this.val.setVal_Nochk('tmp', frmnm + '.scale_y', sy);
            this.val.setVal_Nochk('tmp', frmnm + '.rotate', r);
            this.val.setVal_Nochk('tmp', frmnm + '.width', rct.width);
            this.val.setVal_Nochk('tmp', frmnm + '.height', rct.height);
            this.val.setVal_Nochk('tmp', frmnm + '.visible', v);
            this.evtMng.resvFlameEvent(win);
            const setImg = win.sn_repRes;
            if (this.sys.crypto && setImg)
                setImg((i) => {
                    var _a;
                    const src = ((_a = i.dataset.src) !== null && _a !== void 0 ? _a : '').replace(/(.+\/|\..+)/g, '');
                    const oUrl = this.hEncImgOUrl[src];
                    if (oUrl) {
                        i.src = oUrl;
                        return;
                    }
                    const aImg = this.hAEncImg[src];
                    if (aImg) {
                        aImg.push(i);
                        return;
                    }
                    this.hAEncImg[src] = [i];
                    const url = this.cfg.searchPath(src, Config_1.Config.EXT_SPRITE);
                    (new pixi_js_1.Loader()).add(src, url, { xhrType: 'arraybuffer' })
                        .pre((res, next) => res.load(() => {
                        this.sys.pre(res.extension, res.data)
                            .then(r => {
                            if (res.extension != 'bin') {
                                next();
                                return;
                            }
                            res.data = r;
                            if (res.data instanceof HTMLImageElement) {
                                res.type = pixi_js_1.LoaderResource.TYPE.IMAGE;
                                this.hEncImgOUrl[src] = res.data.src;
                            }
                            next();
                        })
                            .catch(e => this.main.errScript(`Graphic ロード失敗です fn:${res.name} ${e}`, false));
                    }))
                        .load((_ldr, hRes) => {
                        for (const src in hRes) {
                            const oUrl = hRes[src].data.src;
                            this.hAEncImg[src].map(v => v.src = oUrl);
                            delete this.hAEncImg[src];
                        }
                    });
                });
            this.main.resume();
        };
        const url = this.cfg.searchPath(src, Config_1.Config.EXT_HTML);
        if (!this.sys.crypto) {
            ifrm.src = url;
            return true;
        }
        (new pixi_js_1.Loader())
            .add(src, url, { xhrType: pixi_js_1.LoaderResource.XHR_RESPONSE_TYPE.TEXT })
            .pre((res, next) => res.load(() => {
            this.sys.pre(res.extension, res.data)
                .then(r => { res.data = r; next(); })
                .catch(e => this.main.errScript(`[add_frame]Html ロード失敗です src:${res.name} ${e}`, false));
        }))
            .load((_ldr, hRes) => {
            var _a;
            const base = url.slice(0, url.lastIndexOf('/') + 1);
            const htm = String((_a = hRes[src]) === null || _a === void 0 ? void 0 : _a.data).replace(/\s(?:src|href)=(["'])(\S+)\1/g, (v, p1, p2) => (p2.slice(0, 3) == '../')
                ? v.replace('../', this.sys.cur)
                : v.replace(p1, p1 + base));
            const blob = new Blob([htm], { type: 'text/html' });
            ifrm.src = URL.createObjectURL(blob);
        });
        return true;
    }
    rect(hArg) {
        const a = Object.assign({}, hArg);
        const re = this.sys.resolution;
        return new DOMRect(CmnLib_1.CmnLib.argChk_Num(a, 'x', 0) * re, CmnLib_1.CmnLib.argChk_Num(a, 'y', 0) * re, CmnLib_1.CmnLib.argChk_Num(a, 'width', CmnLib_1.CmnLib.stageW) * re, CmnLib_1.CmnLib.argChk_Num(a, 'height', CmnLib_1.CmnLib.stageH) * re);
    }
    cvsResize() {
        const scale = this.sys.reso4frame * CmnLib_1.CmnLib.cvsScale;
        for (const n in this.hIfrm) {
            const f = this.hIfrm[n];
            const x = Number(this.val.getVal(`const.sn.frm.${n}.x`));
            const y = Number(this.val.getVal(`const.sn.frm.${n}.y`));
            const w = Number(this.val.getVal(`const.sn.frm.${n}.width`));
            const h = Number(this.val.getVal(`const.sn.frm.${n}.height`));
            f.style.left = this.sys.ofsLeft4frm + x * scale + 'px';
            f.style.top = this.sys.ofsTop4frm + y * scale + 'px';
            f.width = String(w * scale);
            f.height = String(h * scale);
        }
    }
    let_frame(hArg) {
        const id = hArg.id;
        if (!id)
            throw 'idは必須です';
        const frmnm = `const.sn.frm.${id}`;
        if (!this.val.getVal(`tmp:${frmnm}`))
            throw `frame【${id}】が読み込まれていません`;
        const var_name = hArg.var_name;
        if (!var_name)
            throw 'var_nameは必須です';
        const ifrm = document.getElementById(id);
        const win = ifrm.contentWindow;
        if (!win.hasOwnProperty(var_name))
            throw `frame【${id}】に変数/関数【${var_name}】がありません。変数は var付きにして下さい`;
        const v = win[var_name];
        this.val.setVal_Nochk('tmp', frmnm + '.' + var_name, CmnLib_1.CmnLib.argChk_Boolean(hArg, 'function', false) ? v() : v);
        return false;
    }
    set_frame(hArg) {
        const id = hArg.id;
        if (!id)
            throw 'idは必須です';
        const frmnm = `const.sn.frm.${id}`;
        if (!this.val.getVal(`tmp:${frmnm}`))
            throw `frame【${id}】が読み込まれていません`;
        const var_name = hArg.var_name;
        if (!var_name)
            throw 'var_nameは必須です';
        const text = hArg.text;
        if (!text)
            throw 'textは必須です';
        this.val.setVal_Nochk('tmp', frmnm + '.' + var_name, text);
        const ifrm = document.getElementById(id);
        const win = ifrm.contentWindow;
        win[var_name] = text;
        return false;
    }
    frame(hArg) {
        const id = hArg.id;
        if (!id)
            throw 'idは必須です';
        const frmnm = `const.sn.frm.${id}`;
        if (!this.val.getVal(`tmp:${frmnm}`))
            throw `frame【${id}】が読み込まれていません`;
        const ifrm = document.getElementById(id);
        if ('alpha' in hArg) {
            const a = String(hArg.alpha);
            ifrm.style.opacity = a;
            this.val.setVal_Nochk('tmp', frmnm + '.alpha', a);
        }
        const rct = this.rect(hArg);
        const scale = this.sys.reso4frame * CmnLib_1.CmnLib.cvsScale;
        if ('x' in hArg || 'y' in hArg) {
            ifrm.style.left = this.sys.ofsLeft4frm + rct.x * scale + 'px';
            ifrm.style.top = this.sys.ofsTop4frm + rct.y * scale + 'px';
            this.val.setVal_Nochk('tmp', frmnm + '.x', rct.x);
            this.val.setVal_Nochk('tmp', frmnm + '.y', rct.y);
        }
        if ('scale_x' in hArg || 'scale_y' in hArg || 'rotate' in hArg) {
            const sx = CmnLib_1.CmnLib.argChk_Num(hArg, 'scale_x', 1);
            const sy = CmnLib_1.CmnLib.argChk_Num(hArg, 'scale_y', 1);
            const r = CmnLib_1.CmnLib.argChk_Num(hArg, 'rotate', 0);
            ifrm.style.transform = `scale(${sx}, ${sy}) rotate(${r}deg)`;
            this.val.setVal_Nochk('tmp', frmnm + '.scale_x', sx);
            this.val.setVal_Nochk('tmp', frmnm + '.scale_y', sy);
            this.val.setVal_Nochk('tmp', frmnm + '.rotate', r);
        }
        if ('width' in hArg) {
            ifrm.width = String(rct.width * scale);
            this.val.setVal_Nochk('tmp', frmnm + '.width', rct.width);
        }
        if ('height' in hArg) {
            ifrm.height = String(rct.height * scale);
            this.val.setVal_Nochk('tmp', frmnm + '.height', rct.height);
        }
        if ('visible' in hArg) {
            const v = CmnLib_1.CmnLib.argChk_Boolean(hArg, 'visible', true);
            ifrm.style.display = v ? 'inline' : 'none';
            this.val.setVal_Nochk('tmp', frmnm + '.visible', v);
        }
        if ('b_color' in hArg) {
            ifrm.style.backgroundColor = hArg.b_color;
        }
        return false;
    }
    tsy_frame(hArg) {
        const id = hArg.id;
        if (!id)
            throw 'idは必須です';
        const frmnm = `const.sn.frm.${id}`;
        if (!this.val.getVal(`tmp:${frmnm}`, 0))
            throw `frame【${id}】が読み込まれていません`;
        const ease = CmnTween_1.CmnTween.ease(hArg.ease);
        const ifrm = document.getElementById(id);
        const hNow = {};
        const hTo = {};
        const repeat = CmnLib_1.CmnLib.argChk_Num(hArg, 'repeat', 1);
        let fncA = () => { };
        if ('alpha' in hArg) {
            hNow.a = ifrm.style.opacity;
            hTo.a = CmnLib_1.CmnLib.argChk_Num(hArg, 'alpha', 0);
            fncA = () => {
                ifrm.style.opacity = hNow.a;
                this.val.setVal_Nochk('tmp', 'alpha', hNow.a);
            };
        }
        let fncXYSR = () => { };
        const rct = this.rect(hArg);
        const scale = this.sys.reso4frame * CmnLib_1.CmnLib.cvsScale;
        if ('x' in hArg || 'y' in hArg
            || 'scale_x' in hArg || 'scale_y' in hArg || 'rotate' in hArg) {
            hNow.x = Number(this.val.getVal(`tmp:${frmnm}.x`));
            hNow.y = Number(this.val.getVal(`tmp:${frmnm}.y`));
            hNow.sx = Number(this.val.getVal(`tmp:${frmnm}.scale_x`));
            hNow.sy = Number(this.val.getVal(`tmp:${frmnm}.scale_y`));
            hNow.r = Number(this.val.getVal(`tmp:${frmnm}.rotate`));
            hTo.x = rct.x;
            hTo.y = rct.y;
            hTo.sx = CmnLib_1.CmnLib.argChk_Num(hArg, 'scale_x', 1);
            hTo.sy = CmnLib_1.CmnLib.argChk_Num(hArg, 'scale_y', 1);
            hTo.r = CmnLib_1.CmnLib.argChk_Num(hArg, 'rotate', 0);
            fncXYSR = () => {
                ifrm.style.left = this.sys.ofsLeft4frm + hNow.x * scale + 'px';
                ifrm.style.top = this.sys.ofsTop4frm + hNow.y * scale + 'px';
                ifrm.style.transform = `scale(${hNow.sx}, ${hNow.sy}) rotate(${hNow.r}deg)`;
                this.val.setVal_Nochk('tmp', frmnm + '.x', hNow.x);
                this.val.setVal_Nochk('tmp', frmnm + '.y', hNow.y);
                this.val.setVal_Nochk('tmp', frmnm + '.scale_x', hNow.sx);
                this.val.setVal_Nochk('tmp', frmnm + '.scale_y', hNow.sy);
                this.val.setVal_Nochk('tmp', frmnm + '.rotate', hNow.r);
            };
        }
        let fncW = () => { };
        if ('width' in hArg) {
            hNow.w = this.val.getVal(`tmp:${frmnm}.width`);
            hTo.w = rct.width;
            fncW = () => {
                ifrm.width = hNow.w * scale + 'px';
                this.val.setVal_Nochk('tmp', frmnm + '.width', hNow.w);
            };
        }
        let fncH = () => { };
        if ('height' in hArg) {
            hNow.h = this.val.getVal(`tmp:${frmnm}.height`);
            hTo.h = rct.height;
            fncH = () => {
                ifrm.height = hNow.h * scale + 'px';
                this.val.setVal_Nochk('tmp', frmnm + '.height', hNow.h);
            };
        }
        this.appPixi.stage.interactive = false;
        const tw_nm = `frm\n${hArg.id}`;
        const tw = new Tween.Tween(hNow)
            .to(hTo, CmnLib_1.CmnLib.argChk_Num(hArg, 'time', NaN)
            * (Boolean(this.val.getVal('tmp:sn.skip.enabled')) ? 0 : 1))
            .delay(CmnLib_1.CmnLib.argChk_Num(hArg, 'delay', 0))
            .easing(ease)
            .repeat(repeat == 0 ? Infinity : (repeat - 1))
            .yoyo(CmnLib_1.CmnLib.argChk_Boolean(hArg, 'yoyo', false))
            .onUpdate(() => { fncA(); fncXYSR(); fncW(); fncH(); })
            .onComplete(() => {
            this.appPixi.stage.interactive = true;
            const twInf = this.hTwInf[tw_nm];
            if (!twInf)
                return;
            delete this.hTwInf[tw_nm];
            this.evtMng.popLocalEvts();
            if (twInf.resume)
                this.main.resume();
            if (twInf.onComplete)
                twInf.onComplete();
        })
            .start();
        this.hTwInf[tw_nm] = { tw: tw, resume: false, onComplete: () => { } };
        return false;
    }
}
exports.FrameMng = FrameMng;
//# sourceMappingURL=FrameMng.js.map