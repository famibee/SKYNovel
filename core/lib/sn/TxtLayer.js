"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Layer_1 = require("./Layer");
const CmnLib_1 = require("./CmnLib");
const TxtStage_1 = require("./TxtStage");
const Config_1 = require("./Config");
const RubySpliter_1 = require("./RubySpliter");
const GrpLayer_1 = require("./GrpLayer");
const Button_1 = require("./Button");
const pixi_js_1 = require("pixi.js");
const LayerMng_1 = require("./LayerMng");
const platform = require('platform');
class TxtLayer extends Layer_1.Layer {
    constructor() {
        super();
        this.infTL = {
            fontsize: 24,
            $width: 0,
            $height: 0,
            pad_left: 0,
            pad_right: 0,
            pad_top: 0,
            pad_bottom: 0,
        };
        this.b_color = 0x000000;
        this.b_alpha = 0;
        this.b_alpha_isfixed = false;
        this.b_do = null;
        this.b_pic = '';
        this.cntInsidePadding = new pixi_js_1.Container;
        this.txs = new TxtStage_1.TxtStage(this.infTL, this.cntInsidePadding);
        this.rbSpl = new RubySpliter_1.RubySpliter;
        this.cntBtn = new pixi_js_1.Container;
        this.restBuf = false;
        this.putCh = (text, ruby) => {
            var _a, _b, _c, _d;
            if (TxtLayer.cfg.oCfg.debug.putCh)
                console.log(`🖊 文字表示 text:\`${text}\` ruby:\`${ruby}\` name:\`${this.name}\``);
            const isSkip = TxtLayer.evtMng.isSkipKeyDown();
            const a_ruby = ruby.split('｜');
            let add_htm = '';
            switch (a_ruby.length) {
                case 1:
                    this.restBuf = true;
                    if (text == '\n') {
                        if (this.aSpan_bk) {
                            add_htm = this.aSpan_bk.slice(-1)[0];
                            this.autoCloseSpan();
                            this.aSpan.push('<br/>');
                            this.aSpan.push(add_htm);
                            this.aSpan_bk = this.aSpan;
                            this.aSpan = [];
                            return;
                        }
                        if (this.firstCh) {
                            this.firstCh = false;
                            add_htm = '<ruby>　<rt>　</rt></ruby><br/>';
                        }
                        else {
                            add_htm = '<br/>';
                        }
                        this.recText('<br/>');
                        break;
                    }
                    if (this.firstCh) {
                        this.firstCh = false;
                        if (ruby == '')
                            ruby = '　';
                    }
                    add_htm = (ruby) ? `<ruby>${text}<rt>${ruby}</rt></ruby>` : text;
                    if (CmnLib_1.CmnLib.hDip['tx']) {
                        if (isSkip)
                            this.cumDelay = 0;
                        if (!this.aSpan_bk)
                            add_htm = `<span class='sn_tx' style='animation-delay: ${this.cumDelay}ms;'>${add_htm}</span>`;
                    }
                    this.cumDelay += (TxtLayer.doAutoWc)
                        ? (_a = TxtLayer.hAutoWc[text], (_a !== null && _a !== void 0 ? _a : 0)) : LayerMng_1.LayerMng.msecChWait;
                    this.recText(text);
                    break;
                case 2:
                    switch (a_ruby[0]) {
                        case 'gotxt':
                            this.autoCloseSpan();
                            if (CmnLib_1.CmnLib.hDip['tx']) {
                                if (this.restBuf) {
                                    this.txs.goTxt_next(this.aSpan, this.name, this.cumDelay);
                                    this.restBuf = false;
                                    this.cumDelay = 0;
                                    const len = this.aSpan.length;
                                    for (let i = 0; i < len; ++i)
                                        this.aSpan[i] = this.aSpan[i].replace(` class='sn_tx'`, '');
                                }
                            }
                            else
                                this.txs.goTxt(this.aSpan, this.name);
                            return;
                        case 'add':
                            if (this.aSpan_bk) {
                                const s = this.aSpan_bk.slice(-1)[0];
                                this.autoCloseSpan();
                                this.aSpan.push(s.replace(/<span( data-add=".+?")?/, `<span data-add="${a_ruby[1]}"`));
                            }
                            else {
                                this.aSpan.push(`<span data-add="${a_ruby[1]}">`);
                            }
                            this.aSpan_bk = this.aSpan;
                            this.aSpan = [];
                            return;
                        case 'add_close':
                            this.autoCloseSpan();
                            return;
                        case 'grp':
                            this.restBuf = true;
                            {
                                if (isSkip)
                                    this.cumDelay = 0;
                                const arg = (a_ruby[1] ? a_ruby[1].slice(0, -1) + ',' : `{`) + `"delay": ${this.cumDelay}}`;
                                const o = JSON.parse(arg);
                                if (!('id' in o))
                                    o.id = this.aSpan.length;
                                this.cumDelay += (TxtLayer.doAutoWc)
                                    ? 0
                                    : LayerMng_1.LayerMng.msecChWait;
                                if (o.id == 'break') {
                                    this.txs.dispBreak(o.pic);
                                    return;
                                }
                                add_htm = `<span data-cmd='grp' data-id='${o.id}' data-arg='${arg}'>　</span>`;
                                if (CmnLib_1.CmnLib.hDip['tx']) {
                                    if (isSkip)
                                        this.cumDelay = 0;
                                    if (!this.aSpan_bk)
                                        add_htm = `<span class='sn_tx' style='animation-delay: ${this.cumDelay}ms;'>${add_htm}</span>`;
                                }
                                this.cumDelay += (TxtLayer.doAutoWc)
                                    ? (_b = TxtLayer.hAutoWc[text], (_b !== null && _b !== void 0 ? _b : 0)) : LayerMng_1.LayerMng.msecChWait;
                                if (this.aSpan.slice(-1)[0] == add_htm)
                                    return;
                            }
                            break;
                        case 'del':
                            const id_del = a_ruby[1];
                            if (id_del != 'break')
                                throw '文字レイヤdelコマンドは、現在id=breakのみサポートします';
                            TxtStage_1.TxtStage.delBreak();
                            return;
                        case 'span':
                            this.autoCloseSpan();
                            this.restBuf = true;
                            if (a_ruby[1]) {
                                if (CmnLib_1.CmnLib.hDip['tx']) {
                                    if (isSkip)
                                        this.cumDelay = 0;
                                    this.aSpan.push(`<span class='sn_tx' style='animation-delay: ${this.cumDelay}ms; ${a_ruby[1]}'>`);
                                }
                                else {
                                    this.aSpan.push(`<span style='${a_ruby[1]}'>`);
                                }
                                this.aSpan_bk = this.aSpan;
                                this.aSpan = [];
                            }
                            return;
                        case 'link':
                            this.autoCloseSpan();
                            this.restBuf = true;
                            {
                                const o = JSON.parse(a_ruby[1]);
                                if (CmnLib_1.CmnLib.hDip['tx']) {
                                    if (isSkip)
                                        this.cumDelay = 0;
                                    this.aSpan.push(`<span class='sn_tx' style='animation-delay: ${this.cumDelay}ms; ${o.style}'>`);
                                    this.aSpan_link = `data-cmd='link' data-arg='${a_ruby[1]}'`;
                                }
                                else {
                                    this.aSpan.push(`<span data-cmd='link' data-arg='${a_ruby[1]}' style='${o.style}'>`);
                                }
                                this.aSpan_bk = this.aSpan;
                                this.aSpan = [];
                            }
                            return;
                        case 'endlink':
                            this.restBuf = true;
                            if (this.aSpan_bk) {
                                const len = this.aSpan.length;
                                for (let i = 0; i < len; ++i)
                                    this.aSpan[i] = this.aSpan[i].replace(`class='sn_tx'`, this.aSpan_link);
                            }
                            this.autoCloseSpan();
                            return;
                        default:
                            this.restBuf = true;
                            add_htm = `<ruby>${text}<rt>${ruby}</rt></ruby>`;
                            if (CmnLib_1.CmnLib.hDip['tx']) {
                                if (isSkip)
                                    this.cumDelay = 0;
                                if (!this.aSpan_bk)
                                    add_htm = `<span class='sn_tx' style='animation-delay: ${this.cumDelay}ms;'>${add_htm}</span>`;
                            }
                            this.cumDelay += (TxtLayer.doAutoWc)
                                ? (_c = TxtLayer.hAutoWc[text.charAt(0)], (_c !== null && _c !== void 0 ? _c : 0)) : LayerMng_1.LayerMng.msecChWait;
                            this.recText(text);
                    }
                    break;
                case 3:
                    this.restBuf = true;
                    switch (a_ruby[0]) {
                        case 'tcy':
                            const id_tcy = (a_ruby[1].length > 1)
                                ? (this.aSpan.length + 1)
                                : '';
                            const ruby = (platform.name == 'Safari')
                                ? a_ruby[2].replace(/[A-Za-z0-9]/g, s => String.fromCharCode(s.charCodeAt(0) + 65248))
                                : a_ruby[2];
                            add_htm = ruby
                                ? `<ruby style='
					text-orientation: upright;
				'><span data-tcy='${id_tcy}' style='
					text-combine-upright: all;
					-webkit-text-combine: horizontal;
				'>${a_ruby[1]}</span><rt>${ruby}</rt></ruby>`
                                : `<span data-tcy='${id_tcy}' style='
					text-orientation: upright;
					text-combine-upright: all;
					-webkit-text-combine: horizontal;
				'>${a_ruby[1]}</span>`;
                            this.cumDelay += (TxtLayer.doAutoWc)
                                ? (_d = TxtLayer.hAutoWc[text.charAt(0)], (_d !== null && _d !== void 0 ? _d : 0)) : LayerMng_1.LayerMng.msecChWait;
                            if (CmnLib_1.CmnLib.hDip['tx']) {
                                if (isSkip)
                                    this.cumDelay = 0;
                                if (!this.aSpan_bk)
                                    add_htm = `<span class='sn_tx' style='animation-delay: ${this.cumDelay}ms;'>${add_htm}</span>`;
                            }
                            break;
                        default:
                    }
                    break;
            }
            this.aSpan.push(add_htm);
        };
        this.cumDelay = 0;
        this.firstCh = true;
        this.aSpan = [];
        this.aSpan_bk = null;
        this.aSpan_link = '';
        this.click = () => this.txs.skipFI();
        this.log = '';
        this.record = () => Object.assign(super.record(), {
            enabled: this.enabled,
            b_do: (this.b_do == null)
                ? null
                : (this.b_do instanceof pixi_js_1.Sprite ? 'Sprite' : 'Graphics'),
            b_pic: this.b_pic,
            b_color: this.b_color,
            b_alpha: this.b_alpha,
            b_alpha_isfixed: this.b_alpha_isfixed,
            txs: this.txs.record(),
            btns: this.cntBtn.children.map(btn => btn.name),
        });
        const padding = 16 * CmnLib_1.CmnLib.retinaRate;
        this.cnt.addChild(this.cntInsidePadding);
        this.cntInsidePadding.name = 'cntInsidePadding';
        this.cntInsidePadding.position.set(padding, padding);
        this.rbSpl.init(this.putCh);
        this.cnt.addChild(this.cntBtn);
        this.cntBtn.name = 'cntBtn';
        this.lay({ style: `width: ${CmnLib_1.CmnLib.stageW}px; height: ${CmnLib_1.CmnLib.stageH}px; font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif; color: white; font-size: 24px; line-height: 1.5; padding: ${padding}px;` });
    }
    static init(cfg, hTag, val, recText) {
        TxtLayer.cfg = cfg;
        TxtStage_1.TxtStage.init(cfg);
        TxtLayer.val = val;
        TxtLayer.recText = recText;
        hTag.autowc = o => TxtLayer.autowc(o);
        const o = { enabled: 'false', text: '', time: '' };
        hTag.autowc(o);
        TxtLayer.glbStyle = document.createElement('style');
        document.getElementsByTagName('head')[0].appendChild(TxtLayer.glbStyle);
        TxtLayer.glbStyle.type = 'text/css';
        for (const o of cfg.matchPath('.+', Config_1.Config.EXT_FONT)) {
            for (const key in o)
                TxtLayer.gs_autoLoadFont += `
@font-face {
	font-family: '${CmnLib_1.CmnLib.getFn(o[key])}';
	src: url('${o[key]}');
}
`;
        }
        TxtLayer.gs_autoLoadFont += `
.sn_txl {
	pointer-events: none;
	user-select: none;
	-webkit-touch-callout: none;
}
`;
        TxtLayer.setTextFadeStyle(`
.sn_tx {
	opacity: 0;
	position: relative;
	animation: tx_fi 500ms ease-out 0s both;
}
@keyframes tx_fi {
	from {left: 0.3em;}
	to {opacity: 1; left: 0;}
}
@keyframes tx_fo {
	from {opacity: 1; left: 0;}
	to {opacity: 0; left: -0.3em;}
}
`);
    }
    static setEvtMng(main, evtMng) {
        TxtLayer.main = main;
        TxtLayer.evtMng = evtMng;
        TxtStage_1.TxtStage.setEvtMng(evtMng);
    }
    static setTextFadeStyle(style) {
        TxtLayer.gs_textFade = style;
        TxtLayer.glbStyle.innerHTML
            = TxtLayer.gs_autoLoadFont
                + TxtLayer.gs_textFade
                + TxtLayer.gs_addStyle;
    }
    static addStyle(style) {
        TxtLayer.gs_addStyle += style + '\n';
        TxtLayer.glbStyle.innerHTML
            = TxtLayer.gs_autoLoadFont
                + TxtLayer.gs_textFade
                + TxtLayer.gs_addStyle;
    }
    static autowc(hArg) {
        TxtLayer.doAutoWc = CmnLib_1.CmnLib.argChk_Boolean(hArg, 'enabled', TxtLayer.doAutoWc);
        TxtLayer.val.setVal_Nochk('save', 'const.sn.autowc.enabled', TxtLayer.doAutoWc);
        const ch = hArg.text;
        if (('text' in hArg) != ('time' in hArg))
            throw '[autowc] textとtimeは同時指定必須です';
        TxtLayer.val.setVal_Nochk('save', 'const.sn.autowc.text', ch);
        if (!ch) {
            TxtLayer.val.setVal_Nochk('save', 'const.sn.autowc.time', '');
            return false;
        }
        const len = ch.length;
        if (TxtLayer.doAutoWc && len == 0)
            throw '[autowc] enabled == false かつ text == "" は許されません';
        const a = String(hArg.time).split(',');
        if (a.length != len)
            throw '[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい';
        TxtLayer.hAutoWc = Object.create(null);
        a.forEach((v, i) => TxtLayer.hAutoWc[ch[i]] = CmnLib_1.uint(v));
        TxtLayer.val.setVal_Nochk('save', 'const.sn.autowc.time', hArg.time);
        return false;
    }
    destroy() {
        if (this.b_do) {
            this.cnt.removeChild(this.b_do).destroy();
            this.b_do = null;
        }
        this.clearText();
        this.txs.destroy();
    }
    lay(hArg) {
        super.lay(hArg);
        Layer_1.Layer.setXY(this.cnt, hArg, this.cnt);
        this.rbSpl.setting(hArg);
        this.txs.lay(hArg);
        return this.drawBack(hArg);
    }
    drawBack(hArg) {
        if ('back_clear' in hArg) {
            if (CmnLib_1.CmnLib.argChk_Boolean(hArg, 'back_clear', false)) {
                this.b_color = 0x000000;
                this.b_alpha = 0;
                this.b_alpha_isfixed = false;
                this.b_pic = '';
            }
            return false;
        }
        this.b_alpha = CmnLib_1.CmnLib.argChk_Num(hArg, 'b_alpha', this.b_alpha);
        this.b_alpha_isfixed = CmnLib_1.CmnLib.argChk_Boolean(hArg, 'b_alpha_isfixed', this.b_alpha_isfixed);
        const alpha = (this.b_alpha_isfixed
            ? 1
            : Number(TxtLayer.val.getVal('sys:TextLayer.Back.Alpha'))) * this.b_alpha;
        if (hArg.b_pic) {
            if (this.b_pic != hArg.b_pic) {
                this.b_pic = hArg.b_pic;
                if (this.b_do) {
                    this.cnt.removeChild(this.b_do);
                    this.b_do.destroy();
                }
                return GrpLayer_1.GrpLayer.csv2Sprites(this.b_pic, this.cnt, sp => {
                    this.b_do = sp;
                    sp.name = 'back(pic)';
                    sp.visible = (alpha > 0);
                    sp.alpha = alpha;
                    this.txs.setSize(sp.width, sp.height);
                    this.cnt.setChildIndex(sp, 0);
                    TxtLayer.main.resume();
                });
            }
        }
        else if ('b_color' in hArg) {
            this.b_color = parseInt(hArg.b_color || '0');
            if (this.b_do) {
                this.cnt.removeChild(this.b_do);
                this.b_do.destroy();
            }
            this.b_pic = '';
            const grp = this.b_do = new pixi_js_1.Graphics;
            grp.name = 'back(color)';
            grp.beginFill(this.b_color);
            grp.lineStyle(undefined);
            grp.drawRect(0, 0, this.infTL.$width, this.infTL.$height);
            grp.endFill();
            this.cnt.addChildAt(grp, 0);
        }
        if (this.b_do) {
            this.b_do.visible = (alpha > 0);
            this.b_do.alpha = alpha;
        }
        return false;
    }
    chgBackAlpha(g_alpha) {
        const alpha = this.b_alpha_isfixed
            ? this.b_alpha
            : g_alpha * this.b_alpha;
        if (this.b_do instanceof pixi_js_1.Graphics) {
            if (this.b_do) {
                this.cnt.removeChild(this.b_do);
                this.b_do.destroy();
            }
            const grp = this.b_do = new pixi_js_1.Graphics;
            grp.name = 'back(color)';
            grp.beginFill(this.b_color);
            grp.lineStyle(undefined);
            grp.drawRect(0, 0, this.infTL.$width, this.infTL.$height);
            grp.endFill();
            this.cnt.addChildAt(grp, 0);
        }
        if (this.b_do) {
            this.b_do.visible = (alpha > 0);
            this.b_do.alpha = alpha;
        }
    }
    tagCh(text) { this.rbSpl.putTxt(text); }
    autoCloseSpan() {
        if (!this.aSpan_bk)
            return;
        this.aSpan_bk.push(this.aSpan, '</span>');
        this.aSpan = Array.prototype.concat.apply([], this.aSpan_bk);
        this.aSpan_bk = null;
    }
    recText(text) {
        if (!TxtLayer.val.getVal('save:sn.doRecLog'))
            return;
        this.log = this.log + text;
        TxtLayer.recText(this.log);
    }
    clearText() {
        const txs = this.txs;
        this.txs = this.txs.passBaton();
        txs.destroy();
        this.cumDelay = 0;
        this.firstCh = true;
        this.aSpan = [];
        this.aSpan_bk = null;
        this.log = '';
    }
    get enabled() { return this.cntBtn.interactiveChildren; }
    set enabled(v) { this.cntBtn.interactiveChildren = v; }
    addButton(hArg) {
        hArg.key = `btn=[${this.cntBtn.children.length}] ` + this.name;
        const btn = new Button_1.Button(TxtLayer.main, TxtLayer.evtMng, hArg);
        btn.name = JSON.stringify(hArg);
        this.cntBtn.addChild(btn);
        return btn.isStop;
    }
    clearLay(hArg) {
        super.clearLay(hArg);
        this.clearText();
        for (const c of this.cntBtn.removeChildren())
            c.removeAllListeners().destroy();
    }
    playback(hLay, fncComp = undefined) {
        super.playback(hLay);
        this.enabled = hLay.enabled;
        this.b_alpha = hLay.b_alpha;
        this.b_alpha_isfixed = hLay.b_alpha_isfixed;
        let ret = this.drawBack((hLay.b_do)
            ? (hLay.b_do == 'Sprite' ? { b_pic: hLay.b_pic } : { b_color: hLay.b_color })
            : { b_pic: '' });
        this.txs.playback(hLay.txs);
        const aBtn = hLay.btns;
        aBtn.forEach(v => ret = ret || this.addButton(JSON.parse(v)));
        if (fncComp != undefined)
            fncComp();
        return ret;
    }
    snapshot(rnd, re) {
        rnd.render(this.cnt, undefined, false);
        this.txs.snapshot(rnd, re);
    }
    static snapshotBreak(rnd) { TxtStage_1.TxtStage.snapshotBreak(rnd); }
    dump() {
        let aPixiObj = [];
        const len = this.cnt.children.length;
        for (let i = 0; i < len; ++i) {
            const e = this.cnt.children[i];
            const cls = (e instanceof pixi_js_1.Sprite) ? "Sprite" : ((e instanceof pixi_js_1.Graphics) ? "Graphics" : ((e instanceof pixi_js_1.Container) ? "Container" : "?"));
            aPixiObj.push(`{"class":"${cls}", "name":"${e.name}", "alpha":${e.alpha || 1}, "x":${e.x}, "y":${e.y}, "visible":"${e.visible}"}`);
        }
        return super.dump() + `, "enabled":"${this.enabled}", ${this.txs.dump()}, "b_pic":"${this.b_pic}", "b_color":"${this.b_color}", "b_alpha":${this.b_alpha}, "b_alpha_isfixed":"${this.b_alpha_isfixed}", "b_width":${this.infTL.$width}, "b_height":${this.infTL.$height}, "pixi_obj":[${aPixiObj.join(',')}]`;
    }
}
exports.TxtLayer = TxtLayer;
TxtLayer.gs_autoLoadFont = '';
TxtLayer.gs_textFade = '';
TxtLayer.gs_addStyle = '';
TxtLayer.doAutoWc = false;
TxtLayer.hAutoWc = Object.create(null);
//# sourceMappingURL=TxtLayer.js.map