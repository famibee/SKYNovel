"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CmnLib_1 = require("./CmnLib");
const TxtLayer_1 = require("./TxtLayer");
const EventListenerCtn_1 = require("./EventListenerCtn");
const TW = require("@tweenjs/tween.js");
const TWEEN = TW;
const Config_1 = require("./Config");
const Hammer = require("hammerjs");
class EventMng {
    constructor(cfg, hTag, appPixi, main, layMng, val, sndMng, scrItr) {
        this.cfg = cfg;
        this.hTag = hTag;
        this.appPixi = appPixi;
        this.main = main;
        this.layMng = layMng;
        this.val = val;
        this.scrItr = scrItr;
        this.elc = new EventListenerCtn_1.EventListenerCtn;
        this.hHamEv = {
            tap2: null,
            press: null,
            swipeleft: null,
            swiperight: null,
            swipeup: null,
            swipedown: null,
        };
        this.resvFlameEvent4Wheel = (_win) => { };
        this.wheeling = false;
        this.extend_wheel = false;
        this.hLocalEvt2Fnc = {};
        this.hGlobalEvt2Fnc = {};
        this.isStop = false;
        this.waitCustomEvent4Wheel = (_elc, _fnc) => { };
        this.goTxt = () => this.layMng.goTxt();
        this.fncCancelSkip = () => { };
        this.cr = (len) => this.scrItr.addLineNum(len);
        this.hDownKeys = {
            'Alt': 0,
            'Meta': 0,
            'Control': 0,
            'ArrowDown': 0,
            'End': 0,
            'Enter': 0,
            'Escape': 0,
            ' ': 0,
            'GoBack': 0,
        };
        sndMng.setEvtMng(this);
        scrItr.setOtherObj(this, layMng);
        TxtLayer_1.TxtLayer.setEvtMng(main, this);
        layMng.setEvtMng(this);
        hTag.clear_event = o => this.clear_event(o);
        hTag.event = o => this.event(o);
        hTag.l = o => this.l(o);
        hTag.p = o => this.p(o);
        hTag.s = () => { this.stdWait(() => { }, false); return true; };
        hTag.set_cancel_skip = () => this.set_cancel_skip();
        hTag.wait = o => this.wait(o);
        hTag.waitclick = () => { this.stdWait(() => main.resume()); return true; };
        this.ham = new Hammer(appPixi.view, { recognizers: [
                [Hammer.Press],
                [Hammer.Swipe, { direction: Hammer.DIRECTION_ALL }],
            ] });
        this.hHamEv.tap2 = null;
        for (const key in this.hHamEv) {
            const fnc = this.hHamEv[key] = (e) => {
                val.defTmp('sn.eventArg.type', e.type);
                val.defTmp('sn.eventArg.pointers', e.pointers);
                this.defEvt2Fnc(e, e.type);
            };
            this.ham.on(key, fnc);
        }
        appPixi.stage.interactive = true;
        if (CmnLib_1.CmnLib.isMobile)
            appPixi.stage.on('pointerdown', (e) => this.defEvt2Fnc(e, 'click'));
        else
            this.elc.add(appPixi.stage, 'pointerdown', e => {
                switch (e.data.button) {
                    case 0:
                        this.defEvt2Fnc(e, 'click');
                        break;
                    case 1:
                        this.defEvt2Fnc(e, 'middleclick');
                        break;
                }
            });
        this.elc.add(window, 'keydown', e => this.ev_keydown(e));
        this.elc.add(appPixi.view, 'contextmenu', e => this.ev_contextmenu(e));
        if ('WheelEvent' in window) {
            this.elc.add(appPixi.view, 'wheel', e => this.ev_wheel(e), { passive: true });
            this.resvFlameEvent4Wheel = (win) => win.addEventListener('wheel', e => this.ev_wheel(e), { passive: true });
            this.waitCustomEvent4Wheel = (elc, fnc) => elc.add(this.appPixi.view, 'wheel', (e) => {
                if (e['isComposing'])
                    return;
                if (e.deltaY <= 0)
                    return;
                e.stopPropagation();
                fnc();
            });
        }
        this.elc.add(window, 'gamepadconnected', (e) => {
            if (CmnLib_1.CmnLib.devtool)
                console.log('👺 Gamepad connected at index %d: %s. %d buttons, %d axes.', e['gamepad'].index, e['gamepad'].id, e['gamepad'].buttons.length, e['gamepad'].axes.length);
            const key = e.type;
            this.defEvt2Fnc(e, key);
        });
        this.elc.add(window, 'gamepaddisconnected', (e) => {
            if (CmnLib_1.CmnLib.devtool)
                console.log('👺 Gamepad disconnected from index %d: %s', e['gamepad'].index, e['gamepad'].id);
            const key = e.type;
            this.defEvt2Fnc(e, key);
        });
        this.elc.add(window, 'keyup', (e) => {
            if (e['isComposing'])
                return;
            if (e.key in this.hDownKeys)
                this.hDownKeys[e.key] = 0;
        });
        val.defTmp('const.sn.key.alternate', () => (this.hDownKeys['Alt'] > 0));
        val.defTmp('const.sn.key.command', () => (this.hDownKeys['Meta'] > 0));
        val.defTmp('const.sn.key.control', () => (this.hDownKeys['Control'] > 0));
        val.defTmp('const.sn.key.end', () => (this.hDownKeys['End'] > 0));
        val.defTmp('const.sn.key.escape', () => (this.hDownKeys['Escape'] > 0));
        val.defTmp('const.sn.key.back', () => (this.hDownKeys['GoBack'] > 0));
    }
    resvFlameEvent(win) {
        win.addEventListener('keydown', e => this.ev_keydown(e));
        win.addEventListener('contextmenu', e => this.ev_contextmenu(e));
        this.resvFlameEvent4Wheel(win);
    }
    ev_keydown(e) {
        if (e['isComposing'])
            return;
        if (e.key in this.hDownKeys)
            this.hDownKeys[e.key] = e.repeat ? 2 : 1;
        const key = (e.altKey ? (e.key == 'Alt' ? '' : 'alt+') : '')
            + (e.ctrlKey ? (e.key == 'Control' ? '' : 'ctrl+') : '')
            + (e.shiftKey ? (e.key == 'Shift' ? '' : 'shift+') : '')
            + e.key;
        this.defEvt2Fnc(e, key);
    }
    ev_contextmenu(e) {
        const key = (e.altKey ? (e.key == 'Alt' ? '' : 'alt+') : '')
            + (e.ctrlKey ? (e.key == 'Control' ? '' : 'ctrl+') : '')
            + (e.shiftKey ? (e.key == 'Shift' ? '' : 'shift+') : '')
            + 'rightclick';
        this.defEvt2Fnc(e, key);
        e.preventDefault();
    }
    ev_wheel(e) {
        if (e['isComposing'])
            return;
        if (this.wheeling) {
            this.extend_wheel = true;
            return;
        }
        this.wheeling = true;
        this.ev_wheel_waitstop();
        const key = (e.altKey ? 'alt+' : '')
            + (e.ctrlKey ? 'ctrl+' : '')
            + (e.shiftKey ? 'shift+' : '')
            + (e.deltaY > 0 ? 'downwheel' : 'upwheel');
        this.defEvt2Fnc(e, key);
    }
    ev_wheel_waitstop() {
        setTimeout(() => {
            if (this.extend_wheel) {
                this.extend_wheel = false;
                this.ev_wheel_waitstop();
                return;
            }
            this.wheeling = false;
        }, 250);
    }
    destroy() {
        this.elc.clear();
        for (const key in this.hHamEv) {
            this.ham.off(key);
        }
        this.ham.destroy();
    }
    defEvt2Fnc(e, KEY) {
        var _a, _b;
        const key = KEY.toLowerCase();
        const ke = this.hLocalEvt2Fnc[key]
            || this.hGlobalEvt2Fnc[key];
        if (!ke) {
            if (key.slice(0, 5) == 'swipe') {
                const esw = e;
                window.scrollBy(-((_a = esw.deltaX) !== null && _a !== void 0 ? _a : 0), -((_b = esw.deltaY) !== null && _b !== void 0 ? _b : 0));
            }
            return;
        }
        if ((key.slice(-5) != 'wheel') && ('preventDefault' in e))
            e.preventDefault();
        e.stopPropagation();
        if (key.slice(0, 4) != 'dom=' && this.layMng.clickTxtLay())
            return;
        if (!this.isStop)
            return;
        this.isStop = false;
        ke(e);
    }
    popLocalEvts() {
        if (this.isStop)
            return {};
        const ret = this.hLocalEvt2Fnc;
        this.hLocalEvt2Fnc = {};
        return ret;
    }
    pushLocalEvts(h) { this.hLocalEvt2Fnc = h; }
    stdWait(fnc, canskip = true) {
        this.goTxt();
        if (canskip) {
            const fncKey = () => fnc();
            this.hLocalEvt2Fnc['click'] = fncKey;
            this.hLocalEvt2Fnc['enter'] = fncKey;
            this.hLocalEvt2Fnc['arrowdown'] = fncKey;
            this.hLocalEvt2Fnc['wheel.y>0'] = fncKey;
        }
        else {
            delete this.hLocalEvt2Fnc['click'];
            delete this.hLocalEvt2Fnc['enter'];
            delete this.hLocalEvt2Fnc['arrowdown'];
            delete this.hLocalEvt2Fnc['wheel.y>0'];
        }
        this.val.saveKidoku();
        this.fncCancelSkip();
        this.isStop = true;
    }
    button(hArg, em) {
        var _a;
        if (!hArg.fn && !hArg.label)
            this.main.errScript('fnまたはlabelは必須です');
        em.interactive = em.buttonMode = true;
        const key = ((_a = hArg.key) !== null && _a !== void 0 ? _a : ' ').toLowerCase();
        if (!hArg.fn)
            hArg.fn = this.scrItr.scriptFn;
        const glb = CmnLib_1.CmnLib.argChk_Boolean(hArg, 'global', false);
        if (glb)
            this.hGlobalEvt2Fnc[key] = () => this.main.resumeByJumpOrCall(hArg);
        else
            this.hLocalEvt2Fnc[key] = () => this.main.resumeByJumpOrCall(hArg);
        em.on('pointerdown', (e) => this.defEvt2Fnc(e, key));
        if (hArg.clickse) {
            this.cfg.searchPath(hArg.clickse, Config_1.Config.EXT_SOUND);
            em.on('pointerdown', () => {
                const o = { fn: hArg.clickse, join: false };
                if (hArg.clicksebuf)
                    o.buf = hArg.clicksebuf;
                this.hTag.playse(o);
            });
        }
        if (hArg.enterse) {
            this.cfg.searchPath(hArg.enterse, Config_1.Config.EXT_SOUND);
            em.on('pointerover', () => {
                const o = { fn: hArg.enterse, join: false };
                if (hArg.entersebuf)
                    o.buf = hArg.entersebuf;
                this.hTag.playse(o);
            });
        }
        if (hArg.leavese) {
            this.cfg.searchPath(hArg.leavese, Config_1.Config.EXT_SOUND);
            em.on('pointerout', () => {
                const o = { fn: hArg.leavese, join: false };
                if (hArg.leavesebuf)
                    o.buf = hArg.leavesebuf;
                this.hTag.playse(o);
            });
        }
        if (hArg.onenter) {
            const key2 = key + hArg.onenter.toLowerCase();
            const o = { fn: hArg.fn, label: hArg.onenter, call: true, key: key2 };
            if (glb)
                this.hGlobalEvt2Fnc[key2] = () => this.main.resumeByJumpOrCall(o);
            else
                this.hLocalEvt2Fnc[key2] = () => this.main.resumeByJumpOrCall(o);
            em.on('pointerover', (e) => this.defEvt2Fnc(e, key2));
        }
        if (hArg.onleave) {
            const key2 = key + hArg.onleave.toLowerCase();
            const o = { fn: hArg.fn, label: hArg.onleave, call: true, key: key2 };
            if (glb)
                this.hGlobalEvt2Fnc[key2] = () => this.main.resumeByJumpOrCall(o);
            else
                this.hLocalEvt2Fnc[key2] = () => this.main.resumeByJumpOrCall(o);
            em.on('pointerout', (e) => this.defEvt2Fnc(e, key2));
        }
    }
    waitCustomEvent(hArg, elc, fnc) {
        this.goTxt();
        if (!CmnLib_1.CmnLib.argChk_Boolean(hArg, 'canskip', true))
            return;
        elc.add(window, 'pointerdown', (e) => {
            e.stopPropagation();
            this.fncCancelSkip();
            fnc();
        });
        elc.add(window, 'keydown', (e) => {
            if (e['isComposing'])
                return;
            e.stopPropagation();
            this.fncCancelSkip();
            fnc();
        });
        this.waitCustomEvent4Wheel(elc, fnc);
    }
    clear_event(hArg) {
        const glb = CmnLib_1.CmnLib.argChk_Boolean(hArg, 'global', false);
        const h = glb ? this.hGlobalEvt2Fnc : this.hLocalEvt2Fnc;
        for (const nm in h)
            this.clear_eventer(nm, h[nm]);
        if (glb)
            this.hGlobalEvt2Fnc = {};
        else
            this.hLocalEvt2Fnc = {};
        return false;
    }
    clear_eventer(key, e2f) {
        if (key.slice(0, 4) != 'dom=')
            return;
        for (const v of document.querySelectorAll(key.slice(4))) {
            v.removeEventListener('click', e2f);
        }
    }
    event(hArg) {
        const KEY = hArg.key;
        if (!KEY)
            throw 'keyは必須です';
        const key = KEY.toLowerCase();
        const call = CmnLib_1.CmnLib.argChk_Boolean(hArg, 'call', false);
        const h = CmnLib_1.CmnLib.argChk_Boolean(hArg, 'global', false)
            ? this.hGlobalEvt2Fnc
            : this.hLocalEvt2Fnc;
        if (CmnLib_1.CmnLib.argChk_Boolean(hArg, 'del', false)) {
            if (hArg.fn || hArg.label || call)
                throw 'fn/label/callとdelは同時指定できません';
            this.clear_eventer(KEY, h[key]);
            delete h[key];
            return false;
        }
        hArg.fn = hArg.fn || this.scrItr.scriptFn;
        if (KEY.slice(0, 4) == 'dom=') {
            let elmlist;
            const idx = KEY.indexOf(':');
            let sel = '';
            if (idx >= 0) {
                const name = KEY.slice(4, idx);
                const frmnm = `const.sn.frm.${name}`;
                if (!this.val.getVal(`tmp:${frmnm}`, 0))
                    throw `HTML【${name}】が読み込まれていません`;
                const ifrm = document.getElementById(name);
                const win = ifrm.contentWindow;
                sel = KEY.slice(idx + 1);
                elmlist = win.document.querySelectorAll(sel);
            }
            else {
                sel = KEY.slice(4);
                elmlist = document.querySelectorAll(sel);
            }
            const need_err = CmnLib_1.CmnLib.argChk_Boolean(hArg, 'need_err', true);
            if (elmlist.length == 0 && need_err)
                throw `HTML内にセレクタ（${sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
            const ie = elmlist[0];
            const type = (ie) ? ie.type : '';
            ((type == 'range' || type == 'checkbox' || type == 'text' || type == 'textarea')
                ? ['input', 'change']
                : ['click'])
                .forEach(v => {
                for (const elm of elmlist)
                    this.elc.add(elm, v, e => {
                        const e2 = elm.dataset;
                        for (const key in e2) {
                            if (e2.hasOwnProperty(key))
                                this.val.setVal_Nochk('tmp', `sn.event.domdata.${key}`, e2[key]);
                        }
                        this.defEvt2Fnc(e, KEY);
                    });
            });
            for (const elm of elmlist)
                this.elc.add(elm, 'mouseleave', e => {
                    if (e.which != 1)
                        return;
                    this.defEvt2Fnc(e, KEY);
                });
        }
        h[key] = () => this.main.resumeByJumpOrCall(hArg);
        return false;
    }
    l(hArg) {
        if (!this.val.getVal('tmp:sn.tagL.enabled')) {
            this.goTxt();
            return false;
        }
        if (this.val.getVal('tmp:sn.skip.enabled') && !this.val.getVal('tmp:sn.skip.all')
            && !this.scrItr.isNextKidoku) {
            this.fncCancelSkip();
            this.val.setVal_Nochk('tmp', 'sn.skip.enabled', false);
        }
        if (this.val.getVal('tmp:sn.skip.enabled') && ('ps'.includes(String(this.val.getVal('sys:sn.skip.mode')))))
            return false;
        if (this.val.getVal('tmp:sn.auto.enabled')) {
            return this.wait({
                time: Number(this.scrItr.isKidoku
                    ? this.val.getVal('sys:sn.auto.msecLineWait_Kidoku')
                    : this.val.getVal('sys:sn.auto.msecLineWait'))
            });
        }
        if (CmnLib_1.CmnLib.argChk_Boolean(hArg, 'visible', true))
            this.layMng.breakLine();
        this.stdWait(() => this.main.resume());
        return true;
    }
    p(hArg) {
        if (this.val.getVal('tmp:sn.skip.enabled') && !this.val.getVal('tmp:sn.skip.all')
            && !this.scrItr.isNextKidoku) {
            this.fncCancelSkip();
            this.val.setVal_Nochk('tmp', 'sn.skip.enabled', false);
        }
        if (this.val.getVal('tmp:sn.skip.enabled') && ('s' == String(this.val.getVal('sys:sn.skip.mode')))) {
            this.goTxt();
            return false;
        }
        if (this.val.getVal('tmp:sn.auto.enabled')) {
            return this.wait({
                time: Number(this.scrItr.isKidoku
                    ? this.val.getVal('sys:sn.auto.msecPageWait_Kidoku')
                    : this.val.getVal('sys:sn.auto.msecPageWait'))
            });
        }
        if (CmnLib_1.CmnLib.argChk_Boolean(hArg, 'visible', true))
            this.layMng.breakPage();
        this.stdWait(this.layMng.getCurrentTxtlayFore()
            && CmnLib_1.CmnLib.argChk_Boolean(hArg, 'er', false)
            ? () => { this.hTag.er(hArg); this.main.resume(); }
            : () => this.main.resume());
        return true;
    }
    set_cancel_skip() {
        this.fncCancelSkip = () => {
            this.fncCancelSkip = () => { };
            this.val.setVal_Nochk('tmp', 'sn.tagL.enabled', true);
            this.val.setVal_Nochk('tmp', 'sn.skip.enabled', false);
            this.val.setVal_Nochk('tmp', 'sn.auto.enabled', false);
            this.layMng.setNormalWaitTxtLayer();
        };
        this.unregisterClickEvts();
        return false;
    }
    unregisterClickEvts() {
        const len = this.scrItr.lenCallStk;
        for (let i = 0; i < len; ++i) {
            const cs = this.scrItr.getCallStk(i);
            if (!cs)
                continue;
            const hE1T = cs.hEvt1Time;
            if (!hE1T)
                continue;
            delete hE1T['Click'];
            delete hE1T['Enter'];
            delete hE1T['ArrowDown'];
            delete hE1T['wheel.y>0'];
        }
    }
    wait(hArg) {
        this.val.saveKidoku();
        const twSleep = new TWEEN.default.Tween(this)
            .to({}, CmnLib_1.uint(CmnLib_1.CmnLib.argChk_Num(hArg, 'time', NaN)))
            .onComplete(() => this.main.resume())
            .start();
        this.stdWait(() => twSleep.stop().end(), CmnLib_1.CmnLib.argChk_Boolean(hArg, 'canskip', true));
        return true;
    }
    isSkipKeyDown() {
        for (const v in this.hDownKeys)
            if (this.hDownKeys[v] == 2)
                return true;
        return false;
    }
}
exports.EventMng = EventMng;
//# sourceMappingURL=EventMng.js.map