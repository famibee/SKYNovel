"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CmnLib_1 = require("./CmnLib");
const CmnTween_1 = require("./CmnTween");
const Config_1 = require("./Config");
const PSnd = require('pixi-sound').default;
const pixi_js_1 = require("pixi.js");
const Tween = require('@tweenjs/tween.js').default;
;
class SoundMng {
    constructor(cfg, hTag, val, main, sys) {
        this.cfg = cfg;
        this.val = val;
        this.main = main;
        this.sys = sys;
        this.hSndBuf = {};
        this.initVol = () => {
            PSnd.sound.volumeAll = Number(this.val.getVal('sys:sn.sound.global_volume', 1));
            this.initVol = () => { };
        };
        hTag.volume = o => this.volume(o);
        hTag.fadebgm = o => this.fadebgm(o);
        hTag.fadeoutbgm = o => this.fadeoutbgm(o);
        hTag.fadeoutse = o => this.fadeoutse(o);
        hTag.fadese = o => this.fadese(o);
        hTag.playbgm = o => this.playbgm(o);
        hTag.playse = o => this.playse(o);
        hTag.stop_allse = () => this.stop_allse();
        hTag.stopbgm = o => this.stopbgm(o);
        hTag.stopse = o => this.stopse(o);
        hTag.wb = o => this.wb(o);
        hTag.wf = o => this.wf(o);
        hTag.stopfadese = o => this.stopfadese(o);
        hTag.wl = o => this.wl(o);
        hTag.ws = o => this.ws(o);
        hTag.xchgbuf = o => this.xchgbuf(o);
        val.defValTrg('sys:sn.sound.global_volume', (_name, val) => PSnd.sound.volumeAll = Number(val));
        this.val.setVal_Nochk('save', 'const.sn.loopPlaying', '{}');
        val.setVal_Nochk('tmp', 'const.sn.sound.codecs', JSON.stringify(PSnd.utils.supported));
    }
    setEvtMng(evtMng) { this.evtMng = evtMng; }
    volume(hArg) {
        var _a;
        const buf = (_a = hArg.buf) !== null && _a !== void 0 ? _a : 'SE';
        const bvn = 'const.sn.sound.' + buf + '.volume';
        const arg_vol = this.getVol(hArg, 1);
        if (Number(this.val.getVal('sys:' + bvn)) == arg_vol)
            return false;
        this.val.setVal_Nochk('sys', bvn, arg_vol);
        this.val.flush();
        hArg.time = 0;
        hArg.volume = Number(this.val.getVal('save:' + bvn));
        return this.fadese(hArg);
    }
    getVol(hArg, def) {
        const vol = CmnLib_1.CmnLib.argChk_Num(hArg, 'volume', def);
        if (vol < 0)
            return 0;
        if (vol > 1)
            return 1;
        return vol;
    }
    fadeoutbgm(hArg) { hArg.volume = 0; return this.fadebgm(hArg); }
    fadeoutse(hArg) { hArg.volume = 0; return this.fadese(hArg); }
    fadebgm(hArg) { hArg.buf = 'BGM'; return this.fadese(hArg); }
    fadese(hArg) {
        var _a;
        this.stopfadese(hArg);
        const buf = (_a = hArg.buf) !== null && _a !== void 0 ? _a : 'SE';
        const oSb = this.hSndBuf[buf];
        if (!oSb || !oSb.playing())
            return false;
        const bvn = 'const.sn.sound.' + buf + '.volume';
        const savevol = this.getVol(hArg, NaN);
        this.val.setVal_Nochk('save', bvn, savevol);
        const vol = savevol * Number(this.val.getVal('sys:' + bvn, 1));
        const stop = CmnLib_1.CmnLib.argChk_Boolean(hArg, 'stop', (hArg.volume == 0));
        if (stop) {
            this.delLoopPlay(buf);
            this.val.setVal_Nochk('save', 'const.sn.sound.' + buf + '.fn', '');
        }
        this.val.flush();
        if (CmnLib_1.CmnLib.argChk_Num(hArg, 'time', NaN) == 0) {
            oSb.snd.volume = vol;
            if (stop) {
                if (buf == 'BGM')
                    this.stopbgm(hArg);
                else
                    this.stopse(hArg);
            }
            return false;
        }
        const ease = CmnTween_1.CmnTween.ease(hArg.ease);
        const repeat = CmnLib_1.CmnLib.argChk_Num(hArg, 'repeat', 1);
        oSb.twFade = new Tween.Tween({ v: oSb.snd.volume })
            .to({ v: vol }, CmnLib_1.CmnLib.argChk_Num(hArg, 'time', NaN))
            .delay(CmnLib_1.CmnLib.argChk_Num(hArg, 'delay', 0))
            .easing(ease)
            .repeat(repeat == 0 ? Infinity : (repeat - 1))
            .yoyo(CmnLib_1.CmnLib.argChk_Boolean(hArg, 'yoyo', false))
            .onUpdate((o) => { if (oSb.playing())
            oSb.snd.volume = o.v; })
            .onComplete(() => {
            const oSb = this.hSndBuf[buf];
            if (!oSb || !oSb.twFade)
                return;
            delete oSb.twFade;
            if (stop) {
                if (buf == 'BGM')
                    this.stopbgm(hArg);
                else
                    this.stopse(hArg);
            }
            if (oSb.resumeFade) {
                this.evtMng.popLocalEvts();
                this.main.resume();
            }
            if (oSb.onCompleteFade)
                oSb.onCompleteFade();
        });
        oSb.twFade.start();
        return false;
    }
    playbgm(hArg) {
        hArg.buf = 'BGM';
        hArg.canskip = false;
        CmnLib_1.CmnLib.argChk_Boolean(hArg, 'loop', true);
        return this.playse(hArg);
    }
    playse(hArg) {
        var _a;
        const buf = (_a = hArg.buf) !== null && _a !== void 0 ? _a : 'SE';
        this.stopse({ buf: buf });
        const fn = hArg.fn;
        if (!fn)
            throw '[playse] fnは必須です(buf=' + buf + ')';
        if (CmnLib_1.CmnLib.argChk_Boolean(hArg, 'canskip', true)
            && this.evtMng.isSkipKeyDown())
            return false;
        const loop = CmnLib_1.CmnLib.argChk_Boolean(hArg, 'loop', false);
        this.addLoopPlay(buf, loop);
        const nm = 'const.sn.sound.' + buf + '.';
        this.val.setVal_Nochk('save', nm + 'fn', fn);
        const savevol = this.getVol(hArg, 1);
        this.val.setVal_Nochk('save', nm + 'volume', savevol);
        const vol = savevol * Number(this.val.getVal('sys:' + nm + 'volume', 1));
        const ret_ms = CmnLib_1.CmnLib.argChk_Num(hArg, 'ret_ms', 0);
        this.val.setVal_Nochk('save', nm + 'ret_ms', ret_ms);
        const end_ms = CmnLib_1.CmnLib.argChk_Num(hArg, 'end_ms', 0);
        this.val.setVal_Nochk('save', nm + 'end_ms', end_ms);
        this.val.flush();
        const o = {
            autoPlay: true,
            loop: loop,
            volume: vol,
            speed: CmnLib_1.CmnLib.argChk_Num(hArg, 'speed', 1),
            loaded: (e, snd) => {
                if (e) {
                    this.main.errScript(`Sound ロード失敗です fn:${fn} ${e}`, false);
                    return;
                }
                const oSb = this.hSndBuf[buf];
                if (oSb)
                    oSb.snd = snd;
            },
        };
        if (!loop)
            o.complete = () => {
                const oSb = this.hSndBuf[buf];
                if (oSb) {
                    oSb.playing = () => false;
                    oSb.onend();
                }
            };
        const snd = PSnd.find(fn);
        this.hSndBuf[buf] = {
            snd: snd,
            loop: loop,
            ret_ms: ret_ms,
            end_ms: end_ms,
            resume: false,
            playing: () => true,
            onend: () => {
                const oSb = this.hSndBuf[buf];
                if (!oSb)
                    return;
                this.stopfadese(hArg);
                if (oSb.resume) {
                    this.evtMng.popLocalEvts();
                    this.main.resume();
                }
            },
        };
        if (snd) {
            snd.volume = vol;
            snd.play(o);
            return false;
        }
        const join = CmnLib_1.CmnLib.argChk_Boolean(hArg, 'join', true);
        if (join) {
            const old = o.loaded;
            o.loaded = (e, snd) => { this.main.resume(); old(e, snd); };
        }
        this.playseSub(fn, o);
        this.initVol();
        return join;
    }
    playseSub(fn, o) {
        const url = this.cfg.searchPath(fn, Config_1.Config.EXT_SOUND);
        if (url.slice(-4) != '.bin') {
            o.url = url;
            PSnd.add(fn, o);
            return;
        }
        (new pixi_js_1.Loader()).add(fn, url, { xhrType: 'arraybuffer' })
            .pre((res, next) => res.load(() => {
            this.sys.pre(res.extension, res.data)
                .then(r => { res.data = r; next(); })
                .catch(e => this.main.errScript(`Sound ロード失敗です fn:${res.name} ${e}`, false));
        }))
            .load((_ldr, hRes) => { var _a; o.source = (_a = hRes[fn]) === null || _a === void 0 ? void 0 : _a.data; PSnd.add(fn, o); });
    }
    stop_allse() {
        for (const buf in this.hSndBuf)
            this.stopse({ buf: buf });
        this.hSndBuf = {};
        return false;
    }
    stopbgm(hArg) { hArg.buf = 'BGM'; return this.stopse(hArg); }
    stopse(hArg) {
        var _a;
        const buf = (_a = hArg.buf) !== null && _a !== void 0 ? _a : 'SE';
        this.stopfadese(hArg);
        this.delLoopPlay(buf);
        const oSb = this.hSndBuf[buf];
        if (oSb)
            oSb.snd.stop();
        return false;
    }
    wb(hArg) { hArg.buf = 'BGM'; return this.wf(hArg); }
    wf(hArg) {
        var _a;
        const buf = (_a = hArg.buf) !== null && _a !== void 0 ? _a : 'SE';
        const oSb = this.hSndBuf[buf];
        if (!oSb || !oSb.twFade)
            return false;
        if (!oSb.playing())
            return false;
        oSb.resumeFade = true;
        this.evtMng.stdWait(() => { this.stopfadese(hArg); }, CmnLib_1.CmnLib.argChk_Boolean(hArg, 'canskip', true));
        return true;
    }
    stopfadese(hArg) {
        var _a;
        const buf = (_a = hArg.buf) !== null && _a !== void 0 ? _a : 'SE';
        const oSb = this.hSndBuf[buf];
        if (!oSb || !oSb.twFade)
            return false;
        oSb.twFade.stop().end();
        return false;
    }
    wl(hArg) { hArg.buf = 'BGM'; return this.ws(hArg); }
    ws(hArg) {
        var _a;
        const buf = (_a = hArg.buf) !== null && _a !== void 0 ? _a : 'SE';
        const oSb = this.hSndBuf[buf];
        if (!oSb || !oSb.playing() || oSb.loop)
            return false;
        oSb.resume = true;
        this.evtMng.stdWait(() => {
            this.stopse(hArg);
            const oSb = this.hSndBuf[buf];
            if (!oSb || !oSb.playing() || oSb.loop)
                return;
            oSb.onend();
        }, CmnLib_1.CmnLib.argChk_Boolean(hArg, 'canskip', false));
        return true;
    }
    xchgbuf(hArg) {
        var _a, _b;
        const buf = (_a = hArg.buf) !== null && _a !== void 0 ? _a : 'SE';
        const buf2 = (_b = hArg.buf2) !== null && _b !== void 0 ? _b : 'SE';
        [this.hSndBuf[buf], this.hSndBuf[buf2]] = [this.hSndBuf[buf2], this.hSndBuf[buf]];
        return false;
    }
    loadAheadSnd(hArg) {
        [hArg.clickse, hArg.enterse, hArg.leavese].forEach(fn => {
            if (!fn || PSnd.exists(fn))
                return;
            this.playseSub(fn, { preload: true, autoPlay: false });
        });
    }
    playLoopFromSaveObj() {
        const loopPlaying = String(this.val.getVal('save:const.sn.loopPlaying', '{}'));
        this.val.flush();
        if (loopPlaying == '{}') {
            this.stop_allse();
            return;
        }
        const aFnc = [];
        const hBuf = JSON.parse(loopPlaying);
        for (const buf in hBuf) {
            const nm = 'save:const.sn.sound.' + buf + '.';
            const hArg = {
                fn: String(this.val.getVal(nm + 'fn')),
                buf: buf,
                join: false,
                loop: true,
                volume: Number(this.val.getVal(nm + 'volume')),
                ret_ms: Number(this.val.getVal(nm + 'ret_ms')),
                end_ms: Number(this.val.getVal(nm + 'end_ms')),
            };
            aFnc.push(() => {
                if (hArg.buf == 'BGM')
                    this.playbgm(hArg);
                else
                    this.playse(hArg);
            });
        }
        this.stop_allse();
        aFnc.forEach(f => f());
    }
    addLoopPlay(buf, is_loop) {
        if (!is_loop) {
            this.delLoopPlay(buf);
            return;
        }
        const hBuf = JSON.parse(String(this.val.getVal('save:const.sn.loopPlaying', '{}')));
        hBuf[buf] = 0;
        this.val.setVal_Nochk('save', 'const.sn.loopPlaying', JSON.stringify(hBuf));
        this.val.flush();
    }
    delLoopPlay(buf) {
        const hBuf = JSON.parse(String(this.val.getVal('save:const.sn.loopPlaying', '{}')));
        delete hBuf[buf];
        this.val.setVal_Nochk('save', 'const.sn.loopPlaying', JSON.stringify(hBuf));
        this.val.flush();
    }
}
exports.SoundMng = SoundMng;
//# sourceMappingURL=SoundMng.js.map