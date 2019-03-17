"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CmnLib_1 = require("./CmnLib");
const Config_1 = require("./Config");
const AnalyzeTagArg_1 = require("./AnalyzeTagArg");
const PropParser_1 = require("./PropParser");
const DebugMng_1 = require("./DebugMng");
const Variable_1 = require("./Variable");
const SoundMng_1 = require("./SoundMng");
const LayerMng_1 = require("./LayerMng");
const EventMng_1 = require("./EventMng");
const ScriptIterator_1 = require("./ScriptIterator");
const m_xregexp = require("xregexp");
const pixi_js_1 = require("pixi.js");
class Main {
    constructor(sys) {
        this.sys = sys;
        this.hTag = {};
        this.fncNext = () => { };
        this.alzTagArg = new AnalyzeTagArg_1.AnalyzeTagArg;
        this.fncTicker = () => {
            this.fncNext();
            this.dbgMng.update();
        };
        this.fncresume = (fnc = this.runAnalyze) => {
            if (this.destroyed)
                return;
            this.layMng.clearBreak();
            this.fncNext = fnc;
            this.resume = (fnc = this.runAnalyze) => {
                this.fncNext = fnc;
            };
            this.scrItr.noticeBreak(false);
        };
        this.resume = this.fncresume;
        this.stop = () => {
            this.fncNext = () => { };
            this.resume = this.fncresume;
            this.scrItr.noticeBreak(true);
        };
        this.getValAmpersand = (val) => (val.charAt(0) == '&')
            ? String(this.prpPrs.parse(val.substr(1)))
            : val;
        this.pauseDev = () => this.appPixi.stop();
        this.resumeDev = () => this.appPixi.start();
        this.destroyed = false;
        this.isDestroyed = () => this.destroyed;
        pixi_js_1.utils.skipHello();
        this.cfg = new Config_1.Config(sys, () => {
            const hApp = {
                backgroundColor: ('init' in this.cfg.oCfg)
                    ? this.cfg.oCfg.init.bg_color || 0
                    : 0,
                resolution: sys.resolution,
            };
            const cvs = document.getElementById('skynovel');
            if (cvs) {
                this.clone_cvs = cvs.cloneNode(true);
                this.clone_cvs.id = 'skynovel';
                hApp.view = cvs;
            }
            this.appPixi = new pixi_js_1.Application(this.cfg.oCfg.window.width, this.cfg.oCfg.window.height, hApp);
            if (!cvs)
                document.body.appendChild(this.appPixi.view);
            this.val = new Variable_1.Variable(this.cfg, this.hTag);
            this.prpPrs = new PropParser_1.PropParser(this.val);
            this.sys.init(this.cfg, this.hTag, this.val, this.appPixi, this);
            this.hTag['title']({ text: this.cfg.oCfg.book.title || 'SKYNovel' });
            this.sndMng = new SoundMng_1.SoundMng(this.cfg, this.hTag, this.val, this);
            this.scrItr = new ScriptIterator_1.ScriptIterator(this.cfg, this.hTag, this, this.val, this.alzTagArg, () => this.runAnalyze(), this.prpPrs.parse, this.sndMng);
            this.dbgMng = new DebugMng_1.DebugMng(this.sys, this.hTag, this.scrItr);
            this.layMng = new LayerMng_1.LayerMng(this.cfg, this.hTag, this.appPixi, this.val, this, this.scrItr, this.sys);
            this.evtMng = new EventMng_1.EventMng(this.cfg, this.hTag, this.appPixi, this, this.layMng, this.val, this.sndMng, this.scrItr);
            this.appPixi.ticker.add(this.fncTicker);
            this.resumeByJumpOrCall({ fn: this.cfg.oCfg.first_script });
        });
    }
    errScript(mes, isThrow = true) {
        this.stop();
        DebugMng_1.DebugMng.myTrace(mes);
        if (CmnLib_1.CmnLib.devtool)
            console.log('🍜 SKYNovel err!');
        if (isThrow)
            throw mes;
    }
    resumeByJumpOrCall(hArg) {
        const url = hArg['url'];
        if (url) {
            window.open(url);
            return;
        }
        this.val.setVal_Nochk('tmp', 'sn.eventArg', hArg.arg || '');
        this.val.setVal_Nochk('tmp', 'sn.eventLabel', hArg.label || '');
        if (CmnLib_1.CmnLib.argChk_Boolean(hArg, 'call', false)) {
            this.scrItr.subIdxToken();
            this.resume(() => this.hTag.call(hArg));
        }
        else {
            this.hTag.clear_event({});
            this.resume(() => this.hTag.jump(hArg));
        }
    }
    runAnalyze() {
        while (true) {
            let token = this.scrItr.runAnalyzeSub();
            if (!token)
                continue;
            const uc = token.charCodeAt(0);
            if (this.cfg.oCfg.debug.token)
                console.log(`🌱 トークン fn:${this.scrItr.scriptFn} lnum:${this.scrItr.lineNum} uc:${uc} token<${token}>`);
            if (uc == 9)
                continue;
            if (uc == 10) {
                this.evtMng.cr(token.length);
                continue;
            }
            if (uc == 91) {
                try {
                    if (this.タグ解析(token)) {
                        this.stop();
                        break;
                    }
                    else
                        continue;
                }
                catch (err) {
                    let mes = '';
                    if (err instanceof Error) {
                        const e = err;
                        mes = 'タグ解析中例外 mes=' + e.message + '(' + e.name + ')';
                        const a_tag = CmnLib_1.CmnLib.REG_TAG.exec(token);
                        if (a_tag != null)
                            mes = '[' + a_tag.name + ']' + mes;
                    }
                    else {
                        mes = err;
                    }
                    this.errScript(mes, false);
                    return;
                }
            }
            if (uc == 38) {
                try {
                    if (token.substr(-1) != '&') {
                        const o = CmnLib_1.CmnLib.splitAmpersand(token.slice(1));
                        o.name = this.getValAmpersand(o.name);
                        o.text = String(this.prpPrs.parse(o.text));
                        this.hTag.let(o);
                        continue;
                    }
                    if (token.charAt(1) == '&')
                        throw new Error('「&表示&」書式では「&」指定が不要です');
                    token = String(this.prpPrs.parse(token.slice(1, -1)));
                }
                catch (err) {
                    let mes = '';
                    if (err instanceof Error) {
                        const e = err;
                        mes = '& 変数操作・変数表示 mes=' + e.message + '(' + e.name + ')';
                    }
                    else {
                        mes = err;
                    }
                    this.errScript(mes, false);
                    return;
                }
            }
            else if (uc == 59)
                continue;
            else if ((uc == 42) && (token.length > 1))
                continue;
            try {
                const tl = this.layMng.getCurrentTxtlayForeNeedErr();
                tl.tagCh(token);
            }
            catch (err) {
                let mes = '';
                if (err instanceof Error) {
                    const e = err;
                    mes = '文字表示 mes=' + e.message + '(' + e.name + ')';
                }
                else {
                    mes = err;
                }
                this.errScript(mes, false);
                return;
            }
        }
    }
    タグ解析(tagToken) {
        const a_tag = m_xregexp.exec(tagToken, CmnLib_1.CmnLib.REG_TAG);
        if (a_tag == null)
            throw 'タグ記述[' + tagToken + ']異常です(タグ解析)';
        const tag_name = a_tag['name'];
        const tag_fnc = this.hTag[tag_name];
        if (tag_fnc == null)
            throw '未定義のタグ[' + tag_name + ']です';
        if (!this.alzTagArg.go(a_tag['args']))
            throw '属性「' + this.alzTagArg.literal + '」は異常です';
        if (this.cfg.oCfg.debug.tag)
            console.log(`🌲 タグ解析 fn:${this.scrItr.scriptFn} lnum:${this.scrItr.lineNum} [${tag_name} %O]`, this.alzTagArg.hPrm);
        if (this.alzTagArg.hPrm['cond']) {
            const cond = this.alzTagArg.hPrm['cond'].val;
            if (cond.charAt(0) == '&')
                throw '属性condは「&」が不要です';
            const p = this.prpPrs.parse(cond);
            const ps = String(p);
            if (ps == 'null' || ps == 'undefined')
                return false;
            if (!p)
                return false;
        }
        const hArg = { タグ名: tag_name };
        if (this.alzTagArg.isKomeParam) {
            if (this.scrItr.isEmptyCallStk)
                throw '属性「*」はマクロのみ有効です';
            const hArgDef = this.scrItr.lastHArg;
            if (!hArgDef)
                throw '属性「*」はマクロのみ有効です';
            for (const k in hArgDef)
                hArg[k] = hArgDef[k];
        }
        for (const k in this.alzTagArg.hPrm) {
            let val = this.alzTagArg.hPrm[k].val;
            if (val.charAt(0) == '%') {
                if (this.scrItr.isEmptyCallStk)
                    throw '属性「%」はマクロのみ有効です';
                const mac = this.scrItr.lastHArg[val.substr(1)];
                if (mac) {
                    hArg[k] = mac;
                    continue;
                }
                val = this.alzTagArg.hPrm[k].def;
                if (!val || val == 'null')
                    continue;
            }
            hArg[k] = this.getValAmpersand(val);
        }
        return tag_fnc(hArg);
    }
    async destroy(ms_late = 0) {
        if (this.destroyed)
            return;
        this.destroyed = true;
        await this.layMng.before_destroy();
        if (ms_late > 0)
            await new Promise(r => setTimeout(r, ms_late));
        this.stop();
        this.hTag = {};
        this.evtMng.destroy();
        this.layMng.destroy();
        this.dbgMng.destroy();
        this.appPixi.ticker.remove(this.fncTicker);
        if (this.clone_cvs && this.appPixi) {
            this.appPixi.view.parentElement.insertBefore(this.clone_cvs, this.appPixi.view);
        }
        pixi_js_1.utils.destroyTextureCache();
        this.appPixi.destroy(true);
    }
}
exports.Main = Main;
//# sourceMappingURL=Main.js.map