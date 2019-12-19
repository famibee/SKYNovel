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
        this.ch_in_style = '';
        this.ch_in_join = true;
        this.ch_out_style = '';
        this.isCur = false;
        this.ruby_pd = () => '';
        this.r_align = '';
        this.needGoTxt = false;
        this.putCh = (text, ruby) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (TxtLayer.cfg.oCfg.debug.putCh)
                console.log(`🖊 文字表示 text:\`${text}\` ruby:\`${ruby}\` name:\`${this.name}\``);
            const a_ruby = ruby.split('｜');
            let add_htm = '';
            const isSkip = TxtLayer.evtMng.isSkipKeyDown();
            switch (a_ruby.length) {
                case 1:
                    this.needGoTxt = true;
                    if (text == '\n') {
                        if (this.aSpan_bk) {
                            add_htm = this.aSpan_bk.slice(-1)[0];
                            this.autoCloseSpan();
                            this.aSpan.push(TxtLayer.rec('<br/>'));
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
                        break;
                    }
                    if (this.firstCh) {
                        this.firstCh = false;
                        if (ruby == '')
                            ruby = '　';
                    }
                    add_htm = this.tagCh_sub(text, ruby, isSkip, this.r_align);
                    break;
                case 2:
                    switch (a_ruby[0]) {
                        case 'start':
                        case 'left':
                        case 'center':
                        case 'right':
                        case 'justify':
                        case '121':
                        case 'even':
                        case '1ruby':
                            this.firstCh = false;
                            this.needGoTxt = true;
                            add_htm = this.tagCh_sub(text, a_ruby[1], isSkip, a_ruby[0]);
                            break;
                        case 'gotxt':
                            {
                                this.autoCloseSpan();
                                if (this.isCur)
                                    TxtLayer.recText(this.aSpan.join('')
                                        .replace(/^<ruby>　<rt>　<\/rt><\/ruby>(<br\/>)+/, '')
                                        .replace(/style='(anim\S+ \S+?;\s*)+/g, `style='`)
                                        .replace(/( style=''| data-(add|arg|cmd)='.+?'|\n+|\t+)/g, '')
                                        .replace(/class='sn_ch .+?'/g, `class='sn_ch'`)
                                        .replace(/class='offrec'/g, `style='display: none;'`)
                                        .replace(/`/g, '\\`'));
                                if (!CmnLib_1.CmnLib.hDip['tx']) {
                                    this.txs.goTxt(this.aSpan);
                                    return;
                                }
                                if (!this.needGoTxt)
                                    return;
                                this.txs.goTxt_next([...this.aSpan, this.tagCh_sub('　', '', false, '')]);
                                this.needGoTxt = false;
                                this.cumDelay = 0;
                                return;
                            }
                        case 'add':
                            {
                                const o = JSON.parse(a_ruby[1]);
                                o.style = (_a = o.style, (_a !== null && _a !== void 0 ? _a : ''));
                                this.beginSpan(o);
                                if (this.aSpan_bk) {
                                    const s = this.aSpan_bk.slice(-1)[0];
                                    this.autoCloseSpan();
                                    if (!CmnLib_1.CmnLib.hDip['tx'])
                                        this.aSpan.push(s.replace(/<span( data-add='.+?')?/, `<span data-add='${a_ruby[1]}'`));
                                }
                                else {
                                    if (CmnLib_1.CmnLib.hDip['tx']) {
                                        if (isSkip)
                                            this.cumDelay = 0;
                                        const wait = (_b = o.wait, (_b !== null && _b !== void 0 ? _b : -1));
                                        const sn_ch = (wait == 0)
                                            ? ''
                                            : ` sn_ch_in_${this.ch_in_style}`;
                                        const ad = (wait < 0)
                                            ? ''
                                            : ` animation-duration: ${wait}ms;`;
                                        this.aSpan.push(`<span class='sn_ch${sn_ch}' style='animation-delay: ${this.cumDelay}ms;${ad} ${o.style}' data-add='${JSON.stringify(o)}'>`);
                                    }
                                    else {
                                        this.aSpan.push(`<span style='${o.style}' data-add='${a_ruby[1]}'>`);
                                    }
                                }
                                this.aSpan_bk = this.aSpan;
                                this.aSpan = [];
                            }
                            return;
                        case 'add_close':
                            this.autoCloseSpan();
                            return;
                        case 'grp':
                            this.needGoTxt = true;
                            {
                                if (isSkip)
                                    this.cumDelay = 0;
                                const arg = (a_ruby[1] ? a_ruby[1].slice(0, -1) + ',' : `{`) + `"delay": ${this.cumDelay}}`;
                                if (this.ch_in_join)
                                    this.cumDelay += (TxtLayer.doAutoWc) ? 0 : LayerMng_1.LayerMng.msecChWait;
                                const o = JSON.parse(arg);
                                o.style = (_c = o.style, (_c !== null && _c !== void 0 ? _c : ''));
                                if (!('id' in o))
                                    o.id = this.aSpan.length;
                                if (o.id == 'break') {
                                    this.txs.dispBreak(o.pic);
                                    return;
                                }
                                add_htm = `<span data-cmd='grp' data-id='${o.id}' data-arg='${arg}'`;
                                if (CmnLib_1.CmnLib.hDip['tx']) {
                                    const wait = (_d = o.wait, (_d !== null && _d !== void 0 ? _d : -1));
                                    const sn_ch = (wait == 0)
                                        ? ''
                                        : ` sn_ch_in_${this.ch_in_style}`;
                                    const ad = (wait < 0)
                                        ? ''
                                        : ` animation-duration: ${wait}ms;`;
                                    add_htm += ` class='sn_ch${sn_ch}' style='animation-delay: ${this.cumDelay}ms;${ad} ${o.style}' data-add='{"ch_in_style":"${this.ch_in_style}", "ch_out_style":"${this.ch_out_style}"}'`;
                                }
                                add_htm += `>　</span>`;
                                if (this.firstCh) {
                                    this.firstCh = false;
                                    add_htm = `<ruby>${add_htm}<rt>　</rt></ruby>`;
                                }
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
                            this.needGoTxt = true;
                            {
                                const o = JSON.parse(a_ruby[1]);
                                this.beginSpan(o);
                                if (!o.style)
                                    return;
                                if (CmnLib_1.CmnLib.hDip['tx']) {
                                    if (isSkip)
                                        this.cumDelay = 0;
                                    const wait = (_e = o.wait, (_e !== null && _e !== void 0 ? _e : -1));
                                    const sn_ch = (wait == 0)
                                        ? ''
                                        : ` sn_ch_in_${this.ch_in_style}`;
                                    const ad = (wait < 0)
                                        ? ''
                                        : ` animation-duration: ${wait}ms;`;
                                    this.aSpan.push(`<span class='sn_ch${sn_ch}' style='animation-delay: ${this.cumDelay}ms;${ad} ${o.style}' data-add='{"ch_in_style":"${this.ch_in_style}", "ch_out_style":"${this.ch_out_style}"}'>`);
                                }
                                else {
                                    this.aSpan.push(`<span style='${o.style}'>`);
                                }
                                this.aSpan_bk = this.aSpan;
                                this.aSpan = [];
                            }
                            return;
                        case 'link':
                            this.autoCloseSpan();
                            this.needGoTxt = true;
                            {
                                const o = JSON.parse(a_ruby[1]);
                                o.style = (_f = o.style, (_f !== null && _f !== void 0 ? _f : ''));
                                this.beginSpan(o);
                                if (CmnLib_1.CmnLib.hDip['tx']) {
                                    if (isSkip)
                                        this.cumDelay = 0;
                                    const wait = (_g = o.wait, (_g !== null && _g !== void 0 ? _g : -1));
                                    const sn_ch = (wait == 0)
                                        ? ''
                                        : ` sn_ch_in_${this.ch_in_style}`;
                                    const ad = (wait < 0)
                                        ? ''
                                        : ` animation-duration: ${wait}ms;`;
                                    this.aSpan_link = ` data-cmd='link' data-arg='${a_ruby[1]}'`;
                                    this.aSpan.push(`<span${this.aSpan_link} class='sn_ch${sn_ch}' style='animation-delay: ${this.cumDelay}ms;${ad} ${o.style}' data-add='{"ch_in_style":"${this.ch_in_style}", "ch_out_style":"${this.ch_out_style}"}'>`);
                                }
                                else {
                                    this.aSpan.push(`<span data-cmd='link' data-arg='${a_ruby[1]}' style='${o.style}'>`);
                                }
                                this.aSpan_bk = this.aSpan;
                                this.aSpan = [];
                            }
                            return;
                        case 'endlink':
                            this.needGoTxt = true;
                            if (this.aSpan_bk) {
                                const len = this.aSpan.length;
                                for (let i = 0; i < len; ++i)
                                    this.aSpan[i] = this.aSpan[i].replace(/ data-cmd='linkrsv'/, this.aSpan_link);
                            }
                            this.autoCloseSpan();
                            return;
                        default:
                            this.needGoTxt = true;
                            add_htm = this.tagCh_sub(text, ruby, isSkip, this.r_align);
                    }
                    break;
                case 3:
                    this.firstCh = false;
                    this.needGoTxt = true;
                    switch (a_ruby[0]) {
                        case 'tcy':
                            {
                                if (TxtLayer.val.doRecLog())
                                    this.page_text += text
                                        + (ruby ? `《${ruby}》` : '');
                                const tx = a_ruby[1];
                                const id_tcy = (tx.length > 1)
                                    ? (this.aSpan.length + 1)
                                    : '';
                                const rb = CmnLib_1.CmnLib.isSafari
                                    ? a_ruby[2].replace(/[A-Za-z0-9]/g, s => String.fromCharCode(s.charCodeAt(0) + 65248))
                                    : a_ruby[2];
                                if (CmnLib_1.CmnLib.hDip['tx']) {
                                    if (isSkip)
                                        this.cumDelay = 0;
                                    const rs = this.mkStyle_r_align(tx, rb, this.r_align);
                                    add_htm = rb
                                        ? (this.aSpan_bk
                                            ? (`<ruby style='text-orientation: upright;'>`
                                                + `<span data-tcy='${id_tcy}' style='
									text-combine-upright: all;
									-webkit-text-combine: horizontal;
								' data-add='{"ch_in_style":"${this.ch_in_style}", "ch_out_style":"${this.ch_out_style}"}' data-cmd='linkrsv'>${tx}</span>`
                                                + `<rt${rs}>${rb}</rt></ruby>`)
                                            : (`<span class='sn_ch sn_ch_in_${this.ch_in_style}' style='animation-delay: ${this.cumDelay}ms;'>`
                                                + `<ruby style='text-orientation: upright;'>`
                                                + `<span data-tcy='${id_tcy}' style='
										text-combine-upright: all;
										-webkit-text-combine: horizontal;
									' data-add='{"ch_in_style":"${this.ch_in_style}", "ch_out_style":"${this.ch_out_style}"}'>${tx}</span>`
                                                + `<rt${rs}>${rb}</rt></ruby>`
                                                + `</span>`))
                                        : (this.aSpan_bk
                                            ? (`<span data-tcy='${id_tcy}' style='
								text-orientation: upright;
								text-combine-upright: all;
								-webkit-text-combine: horizontal;
							' data-add='{"ch_in_style":"${this.ch_in_style}", "ch_out_style":"${this.ch_out_style}"}' data-cmd='linkrsv'>${tx}</span>`)
                                            : `<span data-tcy='${id_tcy}' style='
								text-orientation: upright;
								text-combine-upright: all;
								-webkit-text-combine: horizontal;
								animation-delay: ${this.cumDelay}ms;
								height: 1em;
							' class='sn_ch sn_ch_in_${this.ch_in_style}' data-add='{"ch_in_style":"${this.ch_in_style}", "ch_out_style":"${this.ch_out_style}"}'>${tx}</span>`);
                                }
                                else {
                                    add_htm = rb
                                        ? `<ruby style='text-orientation: upright;'>
							<span data-tcy='${id_tcy}' style='
								text-combine-upright: all;
								-webkit-text-combine: horizontal;
							'>${tx}</span>
							<rt>${rb}</rt></ruby>`
                                        : `<span data-tcy='${id_tcy}' style='
							text-orientation: upright;
							text-combine-upright: all;
							-webkit-text-combine: horizontal;
							height: 1em;
						'>${tx}</span>`;
                                }
                                if (this.ch_in_join)
                                    this.cumDelay += (TxtLayer.doAutoWc)
                                        ? (_h = TxtLayer.hAutoWc[text.charAt(0)], (_h !== null && _h !== void 0 ? _h : 0)) : LayerMng_1.LayerMng.msecChWait;
                            }
                            break;
                        default:
                            throw `異常な値です putCh(text: ${text}, ruby: ${ruby})`;
                    }
                    break;
            }
            this.aSpan.push(TxtLayer.rec(add_htm));
        };
        this.cumDelay = 0;
        this.firstCh = true;
        this.aSpan = [];
        this.aSpan_bk = null;
        this.aSpan_link = '';
        this.hSpanBk = {
            ch_in_style: '',
            ch_out_style: '',
            r_align: '',
        };
        this.click = () => {
            if (!this.cntBtn.interactiveChildren || !this.cnt.visible)
                return true;
            return this.txs.skipChIn();
        };
        this.page_text = '';
        this.record = () => Object.assign(super.record(), {
            enabled: this.enabled,
            r_align: this.r_align,
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
        this.lay({ style: `width: ${CmnLib_1.CmnLib.stageW}px; height: ${CmnLib_1.CmnLib.stageH}px; font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif; color: white; font-size: 24px; line-height: 1.5; padding: ${padding}px;`, in_style: 'default', out_style: 'default', back_clear: 'true' });
    }
    static init(cfg, hTag, val, recText) {
        TxtLayer.cfg = cfg;
        TxtStage_1.TxtStage.init(cfg);
        TxtLayer.val = val;
        TxtLayer.recText = recText;
        val.setDoRecProc(TxtLayer.chgDoRec);
        hTag.autowc = o => TxtLayer.autowc(o);
        const o = { enabled: 'false', text: '', time: '' };
        hTag.autowc(o);
        hTag.ch_in_style = o => TxtLayer.ch_in_style(o);
        hTag.ch_out_style = o => TxtLayer.ch_out_style(o);
        TxtStage_1.TxtStage.initChStyle();
        const he = document.getElementsByTagName('head')[0];
        const len = he.children.length;
        for (let i = len - 1; i >= 0; --i) {
            const v = he.children[i];
            if (!(v instanceof HTMLStyleElement))
                continue;
            if (v.innerText.slice(0, 14) != TxtLayer.css_key4del)
                continue;
            he.removeChild(v);
        }
        let font = '';
        for (const o of cfg.matchPath('.+', Config_1.Config.EXT_FONT)) {
            for (const key in o)
                font += `
@font-face {
	font-family: '${CmnLib_1.CmnLib.getFn(o[key])}';
	src: url('${o[key]}');
}
`;
        }
        font += `
.sn_tx {
	pointer-events: none;
	user-select: none;
	-webkit-touch-callout: none;
}
.sn_ch {
	position: relative;
	display: inline-block;
}
`;
        TxtLayer.addStyle(font);
        TxtLayer.ch_in_style({
            name: 'default',
            wait: 500,
            alpha: 0,
            x: '=0.3',
            y: '=0',
            scale_x: 1,
            scale_y: 1,
            rotate: 0,
            join: true,
            ease: 'ease-out',
        });
        TxtLayer.ch_out_style({
            name: 'default',
            wait: 0,
            alpha: 0,
            x: '=0',
            y: '=0',
            scale_x: 1,
            scale_y: 1,
            rotate: 0,
            join: false,
            ease: 'ease-out',
        });
    }
    static addStyle(style) {
        const gs = document.createElement('style');
        gs.type = 'text/css';
        gs.innerHTML = TxtLayer.css_key4del + style;
        document.getElementsByTagName('head')[0].appendChild(gs);
    }
    static ch_in_style(hArg) {
        const o = TxtStage_1.TxtStage.ch_in_style(hArg);
        const x = (o.x.charAt(0) == '=') ? `${o.nx * 100}%` : `${o.nx}px`;
        const y = (o.y.charAt(0) == '=') ? `${o.ny * 100}%` : `${o.ny}px`;
        const name = hArg.name;
        TxtLayer.addStyle(`
.sn_ch_in_${name} {
	position: relative;
	display: inline-block;
}
.go_ch_in_${name} {
	opacity: ${o.alpha};
	position: relative;
	display: inline-block;
	animation: sn_ch_in_${name} ${o.wait}ms ${o.ease} 0s both;
}
@keyframes sn_ch_in_${name} {
	from {transform: rotate(${o.rotate}deg) scale(${o.scale_x}, ${o.scale_y}) translate(${x}, ${y});}
	to {opacity: 1; transform: none;}
}
`);
        return false;
    }
    static ch_out_style(hArg) {
        const o = TxtStage_1.TxtStage.ch_out_style(hArg);
        const x = (o.x.charAt(0) == '=') ? `${o.nx * 100}%` : `${o.nx}px`;
        const y = (o.y.charAt(0) == '=') ? `${o.ny * 100}%` : `${o.ny}px`;
        const name = hArg.name;
        TxtLayer.addStyle(`
.go_ch_out_${name} {
	position: relative;
	display: inline-block;
	animation: go_ch_out_${name} ${o.wait}ms ${o.ease} 0s both;
}
@keyframes go_ch_out_${name} {
	to {
		opacity: ${o.alpha};
		transform: rotate(${o.rotate}deg) scale(${o.scale_x}, ${o.scale_y}) translate(${x}, ${y});
	}
`);
        return false;
    }
    static setEvtMng(main, evtMng) {
        TxtLayer.main = main;
        TxtLayer.evtMng = evtMng;
        TxtStage_1.TxtStage.setEvtMng(evtMng);
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
    set name(nm) { if (this.txs)
        this.txs.name = nm; }
    get name() { return this.txs ? this.txs.name : ''; }
    lay(hArg) {
        var _a;
        super.lay(hArg);
        Layer_1.Layer.setXY(this.cnt, hArg, this.cnt);
        this.rbSpl.setting(hArg);
        this.txs.lay(hArg, this.cnt);
        if ('r_align' in hArg)
            this.r_align = (_a = hArg.r_align, (_a !== null && _a !== void 0 ? _a : ''));
        this.ruby_pd = CmnLib_1.CmnLib.isSafari
            ? this.txs.tategaki
                ? (v, l) => `text-align: start; height: ${l}em; padding-top: ${v}; padding-bottom: ${v};`
                : (v, l) => `text-align: start; width: ${l}em; padding-left: ${v}; padding-right: ${v};`
            : this.txs.tategaki
                ? v => `text-align: justify; text-align-last: justify; padding-top: ${v}; padding-bottom: ${v};`
                : v => `text-align: justify; text-align-last: justify; padding-left: ${v}; padding-right: ${v};`;
        this.set_ch_in(hArg);
        this.set_ch_out(hArg);
        return this.drawBack(hArg);
    }
    set_ch_in(hArg) {
        const ins = hArg.in_style;
        if (!ins)
            return;
        const cis = TxtStage_1.TxtStage.getChInStyle(ins);
        if (!cis)
            throw `存在しないin_style【${ins}】です`;
        this.ch_in_style = ins;
        this.ch_in_join = cis.join;
    }
    set_ch_out(hArg) {
        const outs = hArg.out_style;
        if (!outs)
            return;
        const cos = TxtStage_1.TxtStage.getChOutStyle(outs);
        if (!cos)
            throw `存在しないout_style【${outs}】です`;
        this.ch_out_style = outs;
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
    static chgDoRec(doRec) {
        TxtLayer.rec = doRec
            ? (tx) => tx
            : (tx) => `<span class='offrec'>${tx}</span>`;
    }
    mkStyle_r_align(text, rb, r_align) {
        if (!r_align)
            return '';
        const len = text.length * 2;
        if (len - rb.length < 0)
            return ` style='text-align: ${r_align};'`;
        let st = '';
        switch (r_align) {
            case 'justify':
                st = this.ruby_pd('0', len);
                break;
            case '121':
                st = this.ruby_pd(`calc(${(len - rb.length) / (rb.length * 2)}em)`, len);
                break;
            case 'even':
                st = this.ruby_pd(`calc(${(len - rb.length) / (rb.length + 1)}em)`, len);
                break;
            case '1ruby':
                st = this.ruby_pd('1em', len);
                break;
            default:
                st = `text-align: ${r_align};`;
        }
        return ` style='${st}'`;
    }
    ;
    tagCh(text) { this.rbSpl.putTxt(text); }
    tagCh_sub(text, ruby, isSkip, r_align) {
        var _a;
        if (TxtLayer.val.doRecLog())
            this.page_text += text
                + (ruby ? `《${ruby}》` : '');
        let add_htm = '';
        const rs = this.mkStyle_r_align(text, ruby, r_align);
        if (CmnLib_1.CmnLib.hDip['tx']) {
            if (isSkip)
                this.cumDelay = 0;
            add_htm = ruby
                ? (this.aSpan_bk
                    ? `<ruby data-add='{"ch_in_style":"${this.ch_in_style}", "ch_out_style":"${this.ch_out_style}"}' data-cmd='linkrsv'>${text}<rt${rs}>${ruby}</rt></ruby>`
                    : (`<span class='sn_ch sn_ch_in_${this.ch_in_style}' style='animation-delay: ${this.cumDelay}ms;'>`
                        + `<ruby data-add='{"ch_in_style":"${this.ch_in_style}", "ch_out_style":"${this.ch_out_style}"}'>${text}<rt${rs}>${ruby}</rt></ruby>`
                        + `</span>`))
                : (this.aSpan_bk
                    ? text
                    : `<span class='sn_ch sn_ch_in_${this.ch_in_style}' style='animation-delay: ${this.cumDelay}ms;' data-add='{"ch_in_style":"${this.ch_in_style}", "ch_out_style":"${this.ch_out_style}"}'>${text}</span>`);
        }
        else {
            add_htm = ruby ? `<ruby>${text}<rt${rs}>${ruby}</rt></ruby>` : text;
        }
        if (this.ch_in_join)
            this.cumDelay += (TxtLayer.doAutoWc)
                ? (_a = TxtLayer.hAutoWc[text.charAt(0)], (_a !== null && _a !== void 0 ? _a : 0)) : LayerMng_1.LayerMng.msecChWait;
        return add_htm;
    }
    beginSpan(o) {
        this.hSpanBk.ch_in_style = this.ch_in_style;
        this.set_ch_in(o);
        this.hSpanBk.ch_out_style = this.ch_out_style;
        this.set_ch_out(o);
        this.hSpanBk.r_align = this.r_align;
        if ('r_align' in o)
            this.r_align = o.r_align;
    }
    autoCloseSpan() {
        if (!this.aSpan_bk)
            return;
        this.aSpan_bk.push(this.aSpan, '</span>');
        this.aSpan = Array.prototype.concat.apply([], this.aSpan_bk);
        this.aSpan_bk = null;
        this.set_ch_in({ in_style: this.hSpanBk.ch_in_style });
        this.set_ch_out({ out_style: this.hSpanBk.ch_out_style });
        this.r_align = this.hSpanBk.r_align;
    }
    clearText() {
        const txs = this.txs;
        this.txs = this.txs.passBaton();
        txs.destroy();
        this.cumDelay = 0;
        this.firstCh = true;
        this.aSpan = [];
        this.aSpan_bk = null;
        this.page_text = '';
        TxtLayer.recText('', true);
    }
    get pageText() { return this.page_text; }
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
        this.r_align = hLay.r_align;
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
    snapshot_end() { this.txs.snapshot_end(); }
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
TxtLayer.css_key4del = '/* SKYNovel */';
TxtLayer.doAutoWc = false;
TxtLayer.hAutoWc = Object.create(null);
TxtLayer.rec = (tx) => tx;
//# sourceMappingURL=TxtLayer.js.map