"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Layer_1 = require("./Layer");
const CmnLib_1 = require("./CmnLib");
const CmnTween_1 = require("./CmnTween");
const Config_1 = require("./Config");
const RubySpliter_1 = require("./RubySpliter");
const GrpLayer_1 = require("./GrpLayer");
const LayerMng_1 = require("./LayerMng");
const Button_1 = require("./Button");
const pixi_js_1 = require("pixi.js");
const pixi_filters_1 = require("pixi-filters");
const TWEEN = require("@tweenjs/tween.js");
const DebugMng_1 = require("./DebugMng");
const platform = require('platform');
;
class TxtLayer extends Layer_1.Layer {
    constructor() {
        super();
        this.$width = 0;
        this.$height = 0;
        this.pad_left = 0;
        this.pad_right = 0;
        this.pad_top = 0;
        this.pad_bottom = 0;
        this.b_color = 0x000000;
        this.b_alpha = 0;
        this.b_alpha_isfixed = false;
        this.b_pic = '';
        this.htmTxt = document.createElement('span');
        this.cntTxt = new pixi_js_1.Container;
        this.grpDbgMasume = new pixi_js_1.Graphics;
        this.cntInsidePadding = new pixi_js_1.Container;
        this.fontsize = 24;
        this.ch_anime_time_仮 = 500;
        this.fncFi = (sp) => { sp.x += this.fontsize / 3; };
        this.fi_easing = 'Quadratic.Out';
        this.fo = { alpha: 0, x: `+${this.fontsize / 3}` };
        this.fo_easing = 'Quadratic.Out';
        this.rbSpl = new RubySpliter_1.RubySpliter;
        this.cntBtn = new pixi_js_1.Container;
        this.xz4htm2rect = 0;
        this.hWarning = {
            backgroundColor: 0,
            borderBottomWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopWidth: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            marginTop: 0,
        };
        this.putCh = (text, ruby) => {
            if (TxtLayer.cfg.oCfg.debug.putCh)
                console.log(`🖊 文字表示 text:\`${text}\` ruby:\`${ruby}\` name:\`${this.name}\``);
            const a_ruby = ruby.split('｜');
            let add_htm = '';
            switch (a_ruby.length) {
                case 1:
                    if (text == '\n') {
                        if (this.aSpan_bk) {
                            add_htm = this.aSpan_bk[this.aSpan_bk.length - 1];
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
                        break;
                    }
                    if (this.firstCh) {
                        this.firstCh = false;
                        if (ruby == '')
                            ruby = '　';
                    }
                    add_htm = (ruby) ? `<ruby>${text}<rt>${ruby}</rt></ruby>` : text;
                    break;
                case 2:
                    switch (a_ruby[0]) {
                        case 'gotxt':
                            this.goTxt();
                            return;
                        case 'add':
                            if (this.aSpan_bk) {
                                const s = this.aSpan_bk[this.aSpan_bk.length - 1];
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
                            const oJsonGrp = JSON.parse(a_ruby[1]);
                            if (!('id' in oJsonGrp))
                                oJsonGrp.id = this.aSpan.length;
                            const ndGrp = this.htmTxt.querySelector(`span[data-cmd="grp"][data-id="${oJsonGrp.id}"]`);
                            if (ndGrp)
                                return;
                            add_htm = `<span data-cmd='grp' data-id='${oJsonGrp.id}' data-arg='${a_ruby[1]}'>　</span>`;
                            if (this.aSpan[this.aSpan.length - 1] == add_htm)
                                return;
                            break;
                        case 'del':
                            const len = this.cntTxt.children.length;
                            if (len == 0)
                                return;
                            const ndDel = this.htmTxt.querySelector(`span:last-child[data-cmd="grp"][data-id="${a_ruby[1]}"]`);
                            if (!ndDel)
                                return;
                            ndDel.parentElement.removeChild(ndDel);
                            for (const st of this.aSpTw)
                                if (st.tw)
                                    st.tw.stop();
                            this.aSpTw = [];
                            if (this.aRect.length == 0)
                                return;
                            const last_rect = this.aRect[this.aRect.length - 1];
                            if (last_rect.arg == undefined)
                                return;
                            const oJsonDel = JSON.parse(last_rect.arg);
                            if (last_rect.cmd == 'grp' && oJsonDel.id == a_ruby[1]) {
                                this.aSpan.pop();
                                this.aRect.pop();
                                this.cntTxt.removeChild(this.cntTxt.children[len - 1]);
                            }
                            return;
                        case 'span':
                            this.autoCloseSpan();
                            if (a_ruby[1]) {
                                this.aSpan.push(`<span style="${a_ruby[1]}">`);
                                this.aSpan_bk = this.aSpan;
                                this.aSpan = [];
                            }
                            return;
                        case 'link':
                            this.autoCloseSpan();
                            const oJson2 = JSON.parse(a_ruby[1]);
                            this.aSpan.push(`<span style='${oJson2.style}' data-cmd='link' data-arg='${a_ruby[1]}'>`);
                            this.aSpan_bk = this.aSpan;
                            this.aSpan = [];
                            return;
                        case 'endlink':
                            this.autoCloseSpan();
                            return;
                        default:
                            add_htm = `<ruby>${text}<rt>${ruby}</rt></ruby>`;
                    }
                    break;
                case 3:
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
					-webkit-text-orientation: upright;
				'><span data-tcy='${id_tcy}' style='
					text-combine-upright: all;
					-webkit-text-combine: horizontal;
				'>${a_ruby[1]}</span><rt>${ruby}</rt></ruby>`
                                : `<span data-tcy='${id_tcy}' style='
					text-orientation: upright;
					-webkit-text-orientation: upright;
					text-combine-upright: all;
					-webkit-text-combine: horizontal;
				'>${a_ruby[1]}</span>`;
                            break;
                        default:
                    }
                    break;
            }
            this.aSpan.push(add_htm);
        };
        this.firstCh = true;
        this.aSpan = [];
        this.aSpan_bk = null;
        this.cntGotxt = 0;
        this.paddingmkTx4x = 0;
        this.paddingmkTx4y = 0;
        this.aRect = [];
        this.aSpTw = [];
        this.lh_half = 0;
        this.record = () => Object.assign(super.record(), {
            enabled: this.enabled,
            cssText: this.htmTxt.style.cssText,
            b_do: (this.b_do == null)
                ? null
                : (this.b_do instanceof pixi_js_1.Sprite ? 'Sprite' : 'Graphics'),
            b_pic: this.b_pic,
            b_color: this.b_color,
            b_alpha: this.b_alpha,
            b_alpha_isfixed: this.b_alpha_isfixed,
            ch_anime_time_仮: this.ch_anime_time_仮,
            fi_easing: this.fi_easing,
            fo: this.fo,
            fo_easing: this.fo_easing,
            xz4htm2rect: this.xz4htm2rect,
            btns: this.cntBtn.children.map(btn => btn.name),
        });
        const padding = 16 * CmnLib_1.CmnLib.retinaRate;
        this.cnt.addChild(this.cntInsidePadding);
        this.cntInsidePadding.name = 'cntInsidePadding';
        this.cntInsidePadding.position.set(padding, padding);
        this.cntInsidePadding.addChild(this.grpDbgMasume);
        this.grpDbgMasume.name = 'grpDbgMasume';
        this.rbSpl.init(this.putCh);
        this.cntInsidePadding.addChild(this.cntTxt);
        this.cntTxt.name = 'cntTxt';
        this.cnt.addChild(this.cntBtn);
        this.cntBtn.name = 'cntBtn';
        this.lay({ style: `width: ${CmnLib_1.CmnLib.stageW}px; height: ${CmnLib_1.CmnLib.stageH}px; font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif; color: white; font-size: 24px; line-height: 1.5; padding: ${padding}px;` });
        this.htmTxt.hidden = true;
        document.body.appendChild(this.htmTxt);
    }
    static init(cfg, hTag, val, recText) {
        TxtLayer.cfg = cfg;
        TxtLayer.val = val;
        TxtLayer.recText = recText;
        if (!cfg.existsBreakline)
            TxtLayer.hNoReplaceDispObj['breakline'] = true;
        if (!cfg.existsBreakpage)
            TxtLayer.hNoReplaceDispObj['breakpage'] = true;
        hTag['autowc'] = o => TxtLayer.autowc(o);
        TxtLayer.glbStyle = document.createElement('style');
        document.getElementsByTagName('head')[0].appendChild(TxtLayer.glbStyle);
        TxtLayer.glbStyle.type = 'text/css';
        let autoloadfont = '';
        for (const o of cfg.matchPath('.+', Config_1.Config.EXT_FONT)) {
            for (const key in o)
                autoloadfont += `
@font-face {
	font-family: '${CmnLib_1.CmnLib.getFn(o[key])}';
	src: url('${o[key]}');
}
`;
        }
        TxtLayer.glbStyle.innerHTML = autoloadfont;
    }
    static destroy() {
        RubySpliter_1.RubySpliter.destroy();
        TxtLayer.hNoReplaceDispObj = {};
    }
    destroy() {
        if (this.b_do) {
            this.cnt.removeChild(this.b_do).destroy();
            this.b_do = null;
        }
        document.body.removeChild(this.htmTxt);
        this.ch_anime_time_仮 = 0;
        this.clearText();
    }
    static setEvtMng(main, evtMng) {
        TxtLayer.main = main;
        TxtLayer.evtMng = evtMng;
    }
    static addStyle(text) { TxtLayer.glbStyle.innerHTML += text + '\n'; }
    lay(hArg) {
        super.lay(hArg);
        let ret = false;
        Layer_1.Layer.setXY(this.cnt, hArg, this.cnt);
        this.rbSpl.setting(hArg);
        if (hArg.style) {
            const cln = document.createElement('span');
            cln.style.cssText = hArg.style;
            const len = cln.style.length;
            for (let i = 0; i < len; ++i) {
                const key = cln.style[i];
                if (key in this.hWarning) {
                    DebugMng_1.DebugMng.myTrace(`${key}は指定できません`, 'W');
                    continue;
                }
                this.htmTxt.style[key] = cln.style[key];
            }
            this.pad_left = parseFloat(this.htmTxt.style.paddingLeft || '0');
            this.pad_right = parseFloat(this.htmTxt.style.paddingRight || '0');
            this.pad_top = parseFloat(this.htmTxt.style.paddingTop || '0');
            this.pad_bottom = parseFloat(this.htmTxt.style.paddingBottom || '0');
            this.fontsize = parseFloat(this.htmTxt.style.fontSize || '0');
            this.$width = parseFloat(this.htmTxt.style.width || '0');
            this.$height = parseFloat(this.htmTxt.style.height || '0');
        }
        if (('b_color' in hArg) || ('b_alpha' in hArg) || ('b_alpha_isfixed' in hArg)
            || ('b_pic' in hArg) || ('back_clear' in hArg)) {
            if (CmnLib_1.CmnLib.argChk_Boolean(hArg, 'back_clear', false)) {
                this.b_color = 0x000000;
                this.b_alpha = 0;
                this.b_alpha_isfixed = false;
                this.b_pic = '';
                delete hArg.b_pic;
            }
            else {
                if ('b_color' in hArg)
                    this.b_color = parseInt(hArg.b_color || '0');
                this.b_alpha = CmnLib_1.CmnLib.argChk_Num(hArg, 'b_alpha', this.b_alpha);
                this.b_alpha_isfixed = CmnLib_1.CmnLib.argChk_Boolean(hArg, 'b_alpha_isfixed', this.b_alpha_isfixed);
            }
            ret = this.drawBack(hArg);
        }
        const xSlide = TxtLayer.cfg.oCfg.debug.slideBaseSpan
            ? document.documentElement.clientWidth - CmnLib_1.CmnLib.stageW
            : 0;
        this.htmTxt.style.position = 'absolute';
        this.htmTxt.style.left = xSlide + 'px';
        this.htmTxt.style.top = `0px`;
        this.htmTxt.style.zIndex = '-2';
        if (hArg.filter)
            switch (hArg.filter) {
                case 'null':
                    this.ch_filter = null;
                    break;
                default:
                    const f = new pixi_filters_1.GlowFilter(10, 4, 0, 0x000000, 0.5);
                    this.ch_filter = [f];
                    break;
            }
        this.cntInsidePadding.position.set(this.pad_left, this.pad_top);
        this.xz4htm2rect = xSlide
            + this.pad_left
            + ((this.htmTxt.style.writingMode == 'vertical-rl')
                ? this.pad_left + this.pad_right
                : 0);
        this.lh_half = (this.htmTxt.style.writingMode == 'vertical-rl')
            ? 0
            : (((this.htmTxt.style.lineHeight || '0').slice(-2) == 'px')
                ? parseFloat(this.htmTxt.style.lineHeight || '0')
                : parseFloat(this.htmTxt.style.fontSize || '0')
                    * parseFloat(this.htmTxt.style.lineHeight || '0')
                    - parseFloat(this.htmTxt.style.fontSize || '0')) / 2;
        return ret;
    }
    drawBack(hArg) {
        const alpha = (this.b_alpha_isfixed
            ? 1
            : Number(TxtLayer.val.getVal('sys:TextLayer.Back.Alpha'))) * this.b_alpha;
        if (hArg.b_pic == 'null') {
            if (this.b_do) {
                this.b_do.visible = (alpha > 0);
                this.b_do.alpha = alpha;
            }
            return false;
        }
        if (this.b_do instanceof pixi_js_1.Sprite) {
            if ('b_color' in hArg) { }
            else if (!('b_pic' in hArg) || hArg.b_pic == this.b_pic) {
                this.b_do.visible = (alpha > 0);
                this.b_do.alpha = alpha;
                return false;
            }
        }
        if (this.b_do) {
            this.cnt.removeChild(this.b_do);
            this.b_do.destroy();
            this.b_do = null;
            this.b_pic = '';
        }
        if (hArg.b_pic) {
            this.b_pic = hArg.b_pic;
            GrpLayer_1.GrpLayer.csv2Sprites(this.b_pic, this.cnt, sp => {
                this.b_do = sp;
                sp.name = 'back(pic)';
                sp.visible = (alpha > 0);
                sp.alpha = alpha;
                this.$width = sp.width;
                this.$height = sp.height;
                this.htmTxt.style.width = this.$width + 'px';
                this.htmTxt.style.height = this.$height + 'px';
                this.cnt.setChildIndex(sp, 0);
                TxtLayer.main.resume();
            });
            return true;
        }
        if ('b_color' in hArg)
            this.drawBackSub_b_color(alpha);
        return false;
    }
    drawBackSub_b_color(alpha) {
        if (alpha > 0) {
            const grp = new pixi_js_1.Graphics;
            this.b_do = grp;
            grp.name = 'back(color)';
            grp.beginFill(this.b_color, alpha);
            grp.lineStyle(undefined);
            grp.drawRect(0, 0, this.$width, this.$height);
            grp.endFill();
            this.cnt.addChildAt(grp, 0);
        }
    }
    reloadLayBack(g_alpha) {
        const alpha = this.b_alpha_isfixed
            ? this.b_alpha
            : g_alpha * this.b_alpha;
        if (this.b_do instanceof pixi_js_1.Sprite) {
            this.b_do.visible = (alpha > 0);
            this.b_do.alpha = alpha;
            return;
        }
        if (this.b_do) {
            this.cnt.removeChild(this.b_do);
            this.b_do.destroy();
            this.b_do = null;
        }
        this.drawBackSub_b_color(alpha);
    }
    tagCh(text) { this.rbSpl.putTxt(text); }
    autoCloseSpan() {
        if (!this.aSpan_bk)
            return;
        this.aSpan_bk.push(this.aSpan, '</span>');
        this.aSpan = Array.prototype.concat.apply([], this.aSpan_bk);
        this.aSpan_bk = null;
    }
    goTxt() {
        this.autoCloseSpan();
        if (this.aSpan.length == 0)
            return;
        if (++this.cntGotxt == 1)
            this.goTxt2_htm2tx();
    }
    goTxt2_htm2tx() {
        let sJoinSpan = this.aSpan.join('');
        TxtLayer.recText(sJoinSpan);
        if (sJoinSpan.slice(-5) == '<br/>')
            sJoinSpan = sJoinSpan.slice(0, -5) + `<p style='margin: 0px;'>　</p>`;
        const tmp = sJoinSpan.split('<br/>').map(v => (v.includes('</p>')
            ? v
            : `<p style='margin: 0px;'>${(v == '') ? '　' : v}</p>`)).join('');
        this.htmTxt.innerHTML = tmp;
        this.htmTxt.hidden = false;
        const util = {
            escape: (str) => str.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1'),
            mimeType: (url) => {
                const extension = parseExtension(url).toLowerCase();
                return mimes()[extension] || '';
            },
            dataAsUrl: dataAsUrl,
            isDataUrl: isDataUrl,
            resolveUrl: resolveUrl,
            getAndEncode: getAndEncode,
            asArray: (arrayLike) => {
                const array = [];
                const length = arrayLike.length;
                for (let i = 0; i < length; ++i)
                    array.push(arrayLike[i]);
                return array;
            },
        };
        function mimes() {
            const WOFF = 'application/font-woff';
            const JPEG = 'image/jpeg';
            return {
                'woff': WOFF,
                'woff2': WOFF,
                'ttf': 'application/font-truetype',
                'eot': 'application/vnd.ms-fontobject',
                'png': 'image/png',
                'jpg': JPEG,
                'jpeg': JPEG,
                'gif': 'image/gif',
                'tiff': 'image/tiff',
                'svg': 'image/svg+xml'
            };
        }
        const inliner = newInliner();
        const fontFaces = newFontFaces();
        function embedFonts(node) {
            return fontFaces.resolveAll()
                .then(cssText => {
                const styleNode = document.createElement('style');
                node.appendChild(styleNode);
                styleNode.appendChild(document.createTextNode(cssText));
                return node;
            });
        }
        function parseExtension(url) {
            const match = /\.([^\.\/]*?)$/g.exec(url);
            if (match)
                return match[1];
            else
                return '';
        }
        function isDataUrl(url) {
            return url.search(/^(data:)/) !== -1;
        }
        function resolveUrl(url, baseUrl) {
            const doc = document.implementation.createHTMLDocument();
            const base = doc.createElement('base');
            doc.head.appendChild(base);
            const a = doc.createElement('a');
            doc.body.appendChild(a);
            base.href = baseUrl;
            a.href = url;
            return a.href;
        }
        function getAndEncode(url) {
            let TIMEOUT = 30000;
            return new Promise(function (resolve) {
                const request = new XMLHttpRequest();
                request.onreadystatechange = done;
                request.ontimeout = timeout;
                request.responseType = 'blob';
                request.timeout = TIMEOUT;
                request.open('GET', url, true);
                request.send();
                function done() {
                    if (request.readyState !== 4)
                        return;
                    if (request.status !== 200) {
                        fail('cannot fetch resource: ' + url + ', status: ' + request.status);
                        return;
                    }
                    const encoder = new FileReader();
                    encoder.onloadend = function () {
                        const content = encoder.result.toString().split(/,/)[1];
                        resolve(content);
                    };
                    encoder.readAsDataURL(request.response);
                }
                function timeout() {
                    fail('timeout of ' + TIMEOUT + 'ms occured while fetching resource: ' + url);
                }
                function fail(message) {
                    console.error(message);
                    resolve('');
                }
            });
        }
        function dataAsUrl(content, type) {
            return 'data:' + type + ';base64,' + content;
        }
        function newInliner() {
            const URL_REGEX = /url\(['"]?([^'"]+?)['"]?\)/g;
            return {
                inlineAll: inlineAll,
                shouldProcess: shouldProcess,
            };
            function shouldProcess(str) {
                return str.search(URL_REGEX) !== -1;
            }
            function readUrls(str) {
                const result = [];
                let match;
                while ((match = URL_REGEX.exec(str))) {
                    result.push(match[1]);
                }
                return result.filter(function (url) {
                    return !util.isDataUrl(url);
                });
            }
            function inline(str, url, baseUrl, get) {
                return Promise.resolve(url)
                    .then(url => baseUrl ? util.resolveUrl(url, baseUrl) : url)
                    .then(get || util.getAndEncode)
                    .then(data => util.dataAsUrl(data, util.mimeType(url)))
                    .then(dataUrl => str.replace(urlAsRegex(url), '$1' + dataUrl + '$3'));
                function urlAsRegex(url) {
                    return new RegExp('(url\\([\'"]?)(' + util.escape(url) + ')([\'"]?\\))', 'g');
                }
            }
            function inlineAll(str, baseUrl, get) {
                if (nothingToInline())
                    return Promise.resolve(str);
                return Promise.resolve(str)
                    .then(readUrls)
                    .then(urls => {
                    let done = Promise.resolve(str);
                    for (const url of urls) {
                        done = done.then(string => {
                            return inline(string, url, baseUrl, get);
                        });
                    }
                    return done;
                });
                function nothingToInline() {
                    return !shouldProcess(str);
                }
            }
        }
        function newFontFaces() {
            return {
                resolveAll: resolveAll,
                impl: { readAll: readAll }
            };
            function resolveAll() {
                return readAll()
                    .then(webFonts => Promise.all(webFonts.map((webFont) => webFont.resolve())))
                    .then(cssStrings => cssStrings.join('\n'));
            }
            function readAll() {
                return Promise.resolve(util.asArray(document.styleSheets))
                    .then(getCssRules)
                    .then(selectWebFontRules)
                    .then(rules => rules.map(newWebFont));
                function selectWebFontRules(cssRules) {
                    return cssRules
                        .filter((rule) => rule.type === CSSRule.FONT_FACE_RULE)
                        .filter((rule) => inliner.shouldProcess(rule.style.getPropertyValue('src')));
                }
                function getCssRules(styleSheets) {
                    const cssRules = [];
                    for (const sheet of styleSheets) {
                        try {
                            if (sheet.href)
                                continue;
                            util.asArray(sheet.cssRules || []).map(cssRules.push.bind(cssRules));
                        }
                        catch (e) {
                            console.error('Error while reading CSS rules from ' + sheet.href, e.toString());
                        }
                    }
                    return cssRules;
                }
                function newWebFont(webFontRule) {
                    return {
                        resolve: function resolve() {
                            const baseUrl = (webFontRule.parentStyleSheet || {}).href;
                            return inliner.inlineAll(webFontRule.cssText, baseUrl);
                        },
                        src: function () {
                            return webFontRule.style.getPropertyValue('src');
                        }
                    };
                }
            }
        }
        const img = new Image;
        Promise.resolve(this.htmTxt)
            .then(node => {
            const cln = node.cloneNode(true);
            cln.style.padding = '0px';
            if (cln.style.writingMode == 'vertical-rl') {
                this.paddingmkTx4x = parseFloat(cln.style.fontSize || '0');
                this.paddingmkTx4y = 0;
            }
            else {
                this.paddingmkTx4x = 0;
                this.paddingmkTx4y = parseFloat(cln.style.fontSize || '0');
            }
            cln.style.paddingRight = this.paddingmkTx4x + 'px';
            cln.style.paddingTop = this.paddingmkTx4y + 'px';
            cln.style.left = '0px';
            cln.style.top = '0px';
            cln.style.width = (this.$width - this.pad_left - this.pad_right) + 'px';
            cln.style.height = (this.$height - this.pad_top - this.pad_bottom) + 'px';
            this.htmTxt.hidden = true;
            return cln;
        })
            .then(embedFonts)
            .then(node => {
            node.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
            img.src = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${this.$width}px" height="${this.$height}px"><foreignObject x="0" y="0" width="100%" height="100%">${new XMLSerializer().serializeToString(node)
                .replace(/#/g, '%23').replace(/\n/g, '%0A')}</foreignObject></svg>`;
            return new Promise(resolve => img.onload = resolve);
        })
            .then(() => new Promise(resolve => setTimeout(resolve, 100)))
            .then(() => {
            if (this.cntGotxt == 0)
                return;
            const canvas = document.createElement('canvas');
            canvas.width = this.$width;
            canvas.height = this.$height;
            canvas.getContext('2d').drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL('image/png');
            const tx = pixi_js_1.utils.TextureCache[dataUrl];
            if (tx) {
                this.goTxt3_tx2sp(tx);
                if (--this.cntGotxt > 0)
                    this.goTxt2_htm2tx();
            }
            else
                pixi_js_1.Texture.fromImage(dataUrl).once('update', tx2 => {
                    this.goTxt3_tx2sp(tx2);
                    if (--this.cntGotxt > 0)
                        this.goTxt2_htm2tx();
                });
        })
            .catch(err => DebugMng_1.DebugMng.myTrace(`goTxt2_htm2tx() = ${err}`));
    }
    goTxt3_tx2sp(tx) {
        if (this.cntGotxt == 0)
            return;
        if (TxtLayer.cfg.oCfg.debug.baseTx) {
            this.cntTxt.addChild(new pixi_js_1.Sprite(tx));
            return;
        }
        const lenPutedRect = this.aRect.length;
        this.htmTxt.hidden = false;
        const aRect = this.getChRects(this.htmTxt);
        this.htmTxt.hidden = true;
        for (let i = aRect.length - 1; i > 0; --i) {
            const r2 = aRect[i];
            TxtLayer.REG_SURROGATE.lastIndex = 0;
            if (!TxtLayer.REG_SURROGATE.test(r2.ch))
                continue;
            const r1 = aRect[i - 1];
            r1.ch += r2.ch;
            if (r1.rect.y != r2.rect.y)
                r1.rect.height += r2.rect.height;
            aRect.splice(--i, 2, r1);
        }
        for (let i = aRect.length - 1; i > 0; --i) {
            const t2 = aRect[i];
            if (!t2.tcy)
                continue;
            for (let j = i - 1; j >= 0; --j) {
                const t1 = aRect[j];
                if (t1.tcy != t2.tcy) {
                    i = j + 1;
                    break;
                }
                t2.ch = t1.ch + t2.ch;
                t1.rect.height += t2.rect.height;
                t2.rect = t1.rect;
                aRect.splice(j, 2, t2);
            }
        }
        for (const cr of aRect)
            cr.rect.y -= this.pad_top;
        for (let i = 0; i < lenPutedRect; ++i) {
            const rect = aRect[i].rect.clone();
            rect.x -= this.xz4htm2rect;
            this.cntTxt.children[i].position.set(rect.x, rect.y);
        }
        let begin = 0;
        if (this.aRect.length == 0) {
            if (TxtLayer.cfg.oCfg.debug.masume) {
                if (TxtLayer.cfg.oCfg.debug.devtool)
                    console.log(`🍌 masume ${this.name} v:${this.cnt.visible} l:${this.cnt.x} t:${this.cnt.y} a:${this.cnt.alpha} pl:${this.pad_left} pr:${this.pad_right} pt:${this.pad_top} pb:${this.pad_bottom} fs:${this.fontsize} w:${this.$width} h:${this.$height}`);
                this.grpDbgMasume.clear();
                this.grpDbgMasume.beginFill(0x33FF00, 0.2);
                this.grpDbgMasume.lineStyle(1, 0x33FF00, 1);
                this.grpDbgMasume.drawRect(-this.pad_left, -this.pad_top, this.$width, this.$height);
                this.grpDbgMasume.endFill();
                this.grpDbgMasume.beginFill(0x0033FF, 0.2);
                this.grpDbgMasume.lineStyle(2, 0x0033FF, 1);
                this.grpDbgMasume.drawRect(0, 0, this.$width - this.pad_left - this.pad_right, this.$height - this.pad_top - this.pad_bottom);
                this.grpDbgMasume.endFill();
            }
        }
        else {
            for (begin = lenPutedRect - 1; begin >= 0; --begin) {
                if (aRect[begin].ch == this.aRect[begin].ch)
                    continue;
                this.click();
                for (const v of this.cntTxt.removeChildren(begin)) {
                    v.removeAllListeners().destroy();
                }
                break;
            }
            if (begin < 0)
                begin = lenPutedRect;
        }
        this.aRect = aRect;
        let delay = 0;
        let fncDelay = (timAutoWc) => {
            if (timAutoWc != null)
                delay = timAutoWc;
            fncDelay = (timAutoWc) => {
                delay += (timAutoWc != null) ? timAutoWc : LayerMng_1.LayerMng.msecChWait;
            };
        };
        const len = this.aRect.length;
        for (let i = begin; i < len; ++i) {
            const v = this.aRect[i];
            const rct = v.rect.clone();
            rct.x -= this.xz4htm2rect;
            if (TxtLayer.cfg.oCfg.debug.masume) {
                if (TxtLayer.cfg.oCfg.debug.devtool)
                    console.log(`🍌 masume ch:${v.ch} x:${rct.x} y:${rct.y} w:${rct.width} h:${rct.height}`);
                this.grpDbgMasume.beginFill(0x66CCFF, 0.5);
                this.grpDbgMasume.lineStyle(2, 0xFF3300, 1);
                this.grpDbgMasume.drawRect(rct.x, rct.y, rct.width, rct.height);
                this.grpDbgMasume.endFill();
            }
            if (v.add) {
                const oJs = JSON.parse(v.add.replace(/'/g, '"'));
                delay += CmnLib_1.uint(oJs.wait);
            }
            else
                fncDelay(TxtLayer.hAutoWc[v.ch]);
            const o = v.arg ? JSON.parse(v.arg) : {};
            const already_put = i < lenPutedRect;
            const ease = this.fi_easing
                ? CmnTween_1.CmnTween.hEase[this.fi_easing]
                : TWEEN.Easing.Linear.None;
            if (!ease)
                throw '異常なease指定です';
            const spWork = (sp, replace_pos_by_sp = true) => {
                sp.alpha = 0;
                sp.position.set(rct.x, rct.y);
                if (o.width)
                    sp.width = o.width;
                if (o.height)
                    sp.height = o.height;
                if (replace_pos_by_sp) {
                    rct.width = sp.width;
                    rct.height = sp.height;
                }
                if (this.ch_filter && v.cmd != 'link')
                    sp.filters = this.ch_filter;
                this.fncFi(sp);
                const st = {
                    sp: sp,
                    tw: new TWEEN.Tween(sp)
                        .to({ alpha: 1, x: rct.x, y: rct.y, width: rct.width, height: rct.height, rotation: 0 }, already_put
                        ? 0
                        : this.ch_anime_time_仮)
                        .easing(ease)
                        .delay(delay)
                        .onComplete(() => {
                        st.tw = null;
                    })
                        .start()
                };
                this.aSpTw.push(st);
            };
            switch (v.cmd) {
                case 'grp':
                    if (o.pic in TxtLayer.hNoReplaceDispObj)
                        break;
                    const cnt = new pixi_js_1.Container;
                    this.cntTxt.addChild(cnt);
                    spWork(cnt, false);
                    GrpLayer_1.GrpLayer.csv2Sprites(o.pic, cnt, () => {
                        if (!cnt.parent)
                            cnt.removeChildren();
                    });
                    break;
                default:
                    const tx_c = tx.clone();
                    tx_c.frame = new pixi_js_1.Rectangle(rct.x + this.paddingmkTx4x, rct.y + this.paddingmkTx4y, rct.width, rct.height);
                    if (tx_c.frame.x < 0 || tx_c.frame.y < 0)
                        console.log(`x=${tx_c.frame.x} または y=${tx_c.frame.y} が負の値です。文字「${v.ch}」が表示されない場合があります`);
                    const sp = new pixi_js_1.Sprite(tx_c);
                    this.cntTxt.addChild(sp);
                    spWork(sp);
                    if (v.cmd == 'link') {
                        if (!v.arg)
                            throw `fn:TxtLayer.ts v.arg null`;
                        const o = JSON.parse(v.arg);
                        o.key = this.name + ' link:' + i;
                        TxtLayer.evtMng.button(o, sp);
                    }
            }
        }
    }
    getChRects(elm) {
        const ret = [];
        if (elm.nodeType != elm.TEXT_NODE) {
            for (const v of elm.childNodes)
                ret.push(this.getChRects(v));
            return Array.prototype.concat.apply([], ret);
        }
        const range = elm.ownerDocument.createRange();
        range.selectNodeContents(elm);
        let pos = 0;
        const end = range.endOffset;
        while (pos < end) {
            range.setStart(elm, pos);
            range.setEnd(elm, ++pos);
            const r = range.getBoundingClientRect();
            const pe = range.startContainer.parentElement;
            if (!pe)
                throw `fn:TxtLayer.ts pe null`;
            const ch = range.toString();
            const cr = {
                ch: ch,
                rect: new pixi_js_1.Rectangle(r.left + window.pageXOffset, r.top + window.pageYOffset, r.width, r.height + ('gjqy'.includes(ch) ? this.lh_half : 0)),
                cmd: pe.getAttribute('data-cmd') || undefined,
                arg: pe.getAttribute('data-arg') || undefined,
                add: pe.getAttribute('data-add') || undefined,
                tcy: pe.getAttribute('data-tcy') || undefined,
            };
            ret.push(cr);
        }
        range.detach();
        return ret;
    }
    click() {
        let isLiveTw = false;
        for (const st of this.aSpTw) {
            if (st.tw) {
                st.tw.stop().end();
                isLiveTw = true;
            }
        }
        this.aSpTw = [];
        return isLiveTw;
    }
    clearText() {
        this.cntGotxt = 0;
        this.aRect = [];
        this.grpDbgMasume.clear();
        this.htmTxt.textContent = '';
        this.aSpan = [];
        this.aSpan_bk = null;
        this.firstCh = true;
        this.click();
        if (this.ch_anime_time_仮 == 0) {
            for (const c of this.cntTxt.removeChildren())
                c.removeAllListeners().destroy();
        }
        else {
            const ease = this.fo_easing
                ? CmnTween_1.CmnTween.hEase[this.fo_easing]
                : TWEEN.Easing.Linear.None;
            if (!ease)
                throw '異常なease指定です';
            for (const c of this.cntTxt.children) {
                c.removeAllListeners();
                new TWEEN.Tween(c)
                    .to(this.fo, this.ch_anime_time_仮)
                    .easing(ease)
                    .onComplete(o => this.cntTxt.removeChild(o))
                    .start();
            }
        }
        this.aSpTw = [];
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
        this.htmTxt.style.cssText = hLay.cssText;
        this.pad_left = parseFloat(this.htmTxt.style.paddingLeft || '0');
        this.pad_right = parseFloat(this.htmTxt.style.paddingRight || '0');
        this.pad_top = parseFloat(this.htmTxt.style.paddingTop || '0');
        this.pad_bottom = parseFloat(this.htmTxt.style.paddingBottom || '0');
        this.fontsize = parseFloat(this.htmTxt.style.fontSize || '0');
        this.$width = parseFloat(this.htmTxt.style.width || '0');
        this.$height = parseFloat(this.htmTxt.style.height || '0');
        this.cntInsidePadding.position.set(this.pad_left, this.pad_top);
        this.ch_anime_time_仮 = hLay.ch_anime_time_仮;
        this.fi_easing = hLay.fi_easing;
        this.fo = hLay.fo;
        this.fo_easing = hLay.fo_easing;
        this.xz4htm2rect = hLay.xz4htm2rect;
        const aBtn = hLay.btns;
        aBtn.map(v => ret = ret || this.addButton(JSON.parse(v)));
        if (fncComp != undefined)
            fncComp();
        return ret;
    }
    dump() {
        let aPixiObj = [];
        const len = this.cnt.children.length;
        for (let i = 0; i < len; ++i) {
            const e = this.cnt.children[i];
            const cls = (e instanceof pixi_js_1.Sprite) ? "Sprite" : ((e instanceof pixi_js_1.Graphics) ? "Graphics" : ((e instanceof pixi_js_1.Container) ? "Container" : "?"));
            aPixiObj.push(`{"class":"${cls}", "name":"${e.name}", "alpha":${e.alpha}, "x":${e.x}, "y":${e.y}}`);
        }
        return super.dump() + `, "enabled":"${this.enabled}", "style":"${this.htmTxt.style.cssText.replace(/(")/g, '\\$1')}", "b_pic":"${this.b_pic}", "b_color":"${this.b_color}", "b_alpha":${this.b_alpha}, "b_alpha_isfixed":"${this.b_alpha_isfixed}", "b_width":${this.$width}, "b_height":${this.$height}, "txt":"${this.htmTxt.textContent.replace(/(")/g, '\\$1')}", "pixi_obj":[${aPixiObj.join(',')}]`;
    }
}
TxtLayer.hNoReplaceDispObj = {};
TxtLayer.REG_SURROGATE = /[\uDC00-\uDFFF]/;
TxtLayer.doAutoWc = false;
TxtLayer.hAutoWc = {};
TxtLayer.autowc = (hArg) => {
    TxtLayer.doAutoWc = CmnLib_1.CmnLib.argChk_Boolean(hArg, 'enabled', TxtLayer.doAutoWc);
    const ch = hArg.text;
    if (('text' in hArg) != ('time' in hArg))
        throw '[autowc] textとtimeは同時指定必須です';
    if (!hArg.text) {
        if (TxtLayer.doAutoWc && ch == '')
            throw '[autowc] enabled == false かつ text == "" は許されません';
        return false;
    }
    const len = ch.length;
    if (TxtLayer.doAutoWc && len == 0)
        throw '[autowc] enabled == false かつ text == "" は許されません';
    const a = String(hArg.time).split(',');
    if (a.length != len)
        throw '[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい';
    TxtLayer.hAutoWc = {};
    for (let i = 0; i < len; ++i)
        TxtLayer.hAutoWc[ch[i]] = CmnLib_1.uint(a[i]);
    return false;
};
exports.TxtLayer = TxtLayer;
;
//# sourceMappingURL=TxtLayer.js.map