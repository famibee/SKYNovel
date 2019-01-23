"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CmnLib_1 = require("./CmnLib");
const CmnTween_1 = require("./CmnTween");
const TWEEN = require("@tweenjs/tween.js");
class FrameMng {
    constructor(hTag, appPixi, val, main, sys, hTwInf) {
        this.appPixi = appPixi;
        this.val = val;
        this.main = main;
        this.sys = sys;
        this.hTwInf = hTwInf;
        hTag.add_frame = o => this.add_frame(o);
        hTag.let_frame = o => this.let_frame(o);
        hTag.set_frame = o => this.set_frame(o);
        hTag.frame = o => this.frame(o);
        hTag.tsy_frame = o => this.tsy_frame(o);
    }
    setEvtMng(evtMng) { this.evtMng = evtMng; }
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
        const cvs = this.appPixi.view;
        const rect = cvs.getBoundingClientRect();
        const a = CmnLib_1.CmnLib.argChk_Num(hArg, 'alpha', 1);
        const x = ('x' in hArg) ? hArg.x : rect.left + window.pageYOffset + 'px';
        const y = ('y' in hArg) ? hArg.y : rect.top + window.pageXOffset + 'px';
        const w = ('width' in hArg) ? hArg.width : CmnLib_1.CmnLib.stageW;
        const h = ('height' in hArg) ? hArg.height : CmnLib_1.CmnLib.stageH;
        const sx = CmnLib_1.CmnLib.argChk_Num(hArg, 'scale_x', 1);
        const sy = CmnLib_1.CmnLib.argChk_Num(hArg, 'scale_y', 1);
        const r = CmnLib_1.CmnLib.argChk_Num(hArg, 'rotate', 0);
        const v = CmnLib_1.CmnLib.argChk_Boolean(hArg, 'visible', true);
        cvs.insertAdjacentHTML('beforebegin', `<iframe id="${id}" sandbox="allow-scripts allow-same-origin" src="${this.sys.cur + src}" style="z-index: 1; opacity: ${a}; position: absolute; left:${x}; top: ${y}; border: 0px; overflow: hidden; display: ${v ? 'inline' : 'none'};" width="${w}" height="${h}" transform: scale(${sx}, ${sy}) rotate(${r}deg);></iframe>`);
        const ifrm = document.getElementById(id);
        const win = ifrm.contentWindow;
        win.addEventListener('load', () => {
            this.val.setVal_Nochk('tmp', frmnm, true);
            this.val.setVal_Nochk('tmp', frmnm + '.alpha', a);
            this.val.setVal_Nochk('tmp', frmnm + '.x', x);
            this.val.setVal_Nochk('tmp', frmnm + '.y', y);
            this.val.setVal_Nochk('tmp', frmnm + '.scale_x', sx);
            this.val.setVal_Nochk('tmp', frmnm + '.scale_y', sy);
            this.val.setVal_Nochk('tmp', frmnm + '.rotate', r);
            this.val.setVal_Nochk('tmp', frmnm + '.width', w);
            this.val.setVal_Nochk('tmp', frmnm + '.height', h);
            this.val.setVal_Nochk('tmp', frmnm + '.visible', v);
            this.evtMng.resvFlameEvent(win);
            this.main.resume();
        });
        return true;
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
        const v = win[var_name];
        if (!v)
            throw `frame【${id}】に変数/関数【${var_name}】がありません。変数は var付きにして下さい`;
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
        if ('x' in hArg || 'y' in hArg || 'scale_x' in hArg || 'scale_y' in hArg
            || 'rotate' in hArg) {
            const x = CmnLib_1.CmnLib.argChk_Num(hArg, 'x', 0);
            const y = CmnLib_1.CmnLib.argChk_Num(hArg, 'y', 0);
            const sx = CmnLib_1.CmnLib.argChk_Num(hArg, 'scale_x', 1);
            const sy = CmnLib_1.CmnLib.argChk_Num(hArg, 'scale_y', 1);
            const r = CmnLib_1.CmnLib.argChk_Num(hArg, 'rotate', 0);
            ifrm.style.transform = `matrix(${sx}, 0, 0, ${sy}, ${x}, ${y}) rotate(${r}deg)`;
            this.val.setVal_Nochk('tmp', frmnm + '.x', x);
            this.val.setVal_Nochk('tmp', frmnm + '.y', y);
            this.val.setVal_Nochk('tmp', frmnm + '.scale_x', sx);
            this.val.setVal_Nochk('tmp', frmnm + '.scale_y', sy);
            this.val.setVal_Nochk('tmp', frmnm + '.rotate', r);
        }
        if ('width' in hArg) {
            const w = hArg.width;
            ifrm.style.width = String(w);
            this.val.setVal_Nochk('tmp', frmnm + '.width', w);
        }
        if ('height' in hArg) {
            const h = hArg.height;
            ifrm.style.height = String(h);
            this.val.setVal_Nochk('tmp', frmnm + '.height', h);
        }
        if ('visible' in hArg) {
            const v = CmnLib_1.CmnLib.argChk_Boolean(hArg, 'visible', true);
            ifrm.style.display = v ? 'inline' : 'none';
            this.val.setVal_Nochk('tmp', frmnm + '.visible', v);
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
        const ease = hArg.ease ? CmnTween_1.CmnTween.hEase[hArg.ease] : TWEEN.Easing.Linear.None;
        if (!ease)
            throw '異常なease指定です';
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
        if ('x' in hArg || 'y' in hArg || 'scale_x' in hArg || 'scale_y' in hArg
            || 'rotate' in hArg) {
            hNow.x = this.val.getVal(`tmp:${frmnm}.x`);
            hNow.y = this.val.getVal(`tmp:${frmnm}.y`);
            hNow.sx = this.val.getVal(`tmp:${frmnm}.scale_x`);
            hNow.sy = this.val.getVal(`tmp:${frmnm}.scale_y`);
            hNow.r = this.val.getVal(`tmp:${frmnm}.rotate`);
            hTo.x = CmnLib_1.CmnLib.argChk_Num(hArg, 'x', 0);
            hTo.y = CmnLib_1.CmnLib.argChk_Num(hArg, 'y', 0);
            hTo.sx = CmnLib_1.CmnLib.argChk_Num(hArg, 'scale_x', 1);
            hTo.sy = CmnLib_1.CmnLib.argChk_Num(hArg, 'scale_y', 1);
            hTo.r = CmnLib_1.CmnLib.argChk_Num(hArg, 'rotate', 0);
            fncXYSR = () => {
                ifrm.style.transform = `matrix(${hNow.sx}, 0, 0, ${hNow.sy}, ${hNow.x}, ${hNow.y}) rotate(${hNow.r}deg)`;
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
            hTo.w = CmnLib_1.CmnLib.argChk_Num(hArg, 'width', 0);
            fncW = () => {
                ifrm.style.width = `${hNow.w}px`;
                this.val.setVal_Nochk('tmp', frmnm + '.width', hNow.w);
            };
        }
        let fncH = () => { };
        if ('height' in hArg) {
            hNow.h = this.val.getVal(`tmp:${frmnm}.height`);
            hTo.h = CmnLib_1.CmnLib.argChk_Num(hArg, 'height', 0);
            fncH = () => {
                ifrm.style.height = `${hNow.h}px`;
                this.val.setVal_Nochk('tmp', frmnm + '.height', hNow.h);
            };
        }
        const tw_nm = `frm\n${hArg.id}`;
        const tw = new TWEEN.Tween(hNow)
            .to(hTo, CmnLib_1.CmnLib.argChk_Num(hArg, 'time', NaN)
            * (Boolean(this.val.getVal('tmp:sn.skip.enabled')) ? 0 : 1))
            .delay(CmnLib_1.CmnLib.argChk_Num(hArg, 'delay', 0))
            .easing(ease)
            .repeat(repeat == 0 ? Infinity : (repeat - 1))
            .yoyo(CmnLib_1.CmnLib.argChk_Boolean(hArg, 'yoyo', false))
            .onUpdate(() => { fncA(); fncXYSR(); fncW(); fncH(); })
            .onComplete(() => {
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