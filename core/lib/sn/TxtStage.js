"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pixi_js_1 = require("pixi.js");
const CmnLib_1 = require("./CmnLib");
const LayerMng_1 = require("./LayerMng");
const CmnTween_1 = require("./CmnTween");
const GrpLayer_1 = require("./GrpLayer");
const DebugMng_1 = require("./DebugMng");
const TW = require("@tweenjs/tween.js");
const TWEEN = TW;
;
;
class TxtStage extends pixi_js_1.Container {
    constructor(infTL, cnt) {
        super();
        this.infTL = infTL;
        this.htmTxt = document.createElement('span');
        this.cntTxt = new pixi_js_1.Container;
        this.grpDbgMasume = new pixi_js_1.Graphics;
        this.left = 0;
        this.isTategaki = false;
        this.padTx4x = 0;
        this.padTx4y = 0;
        this.goTxt2 = (aSpan) => this.goTxt2_htm(aSpan);
        this.cntGoTxtSerializer = 0;
        this.goTxt3 = (tx) => this.goTxt3_tx2sp(tx);
        this.xz4htm2rect = 0;
        this.aSpTw = [];
        this.aRect = [];
        this.lenHtmTxt = 0;
        this.rctm = new pixi_js_1.Rectangle;
        this.regDs = new RegExp('animation\\-duration: (?<ms>\\d+)ms;');
        this.fncEndChIn = () => { };
        this.lh_half = 0;
        this.isChInIng = false;
        this.ch_slide_x = () => this.infTL.fontsize * TxtStage.gs_chFadeDx;
        this.fi_easing = 'Quadratic.Out';
        this.fo_easing = 'Quadratic.Out';
        this.sss = null;
        if (CmnLib_1.CmnLib.hDip['tx']) {
            this.htmTxt.classList.add('sn_tx');
        }
        else {
            this.htmTxt.hidden = true;
        }
        this.htmTxt.style.position = 'absolute';
        TxtStage.cvs.parentElement.appendChild(this.htmTxt);
        cnt.addChild(this);
        cnt.addChild(this.cntTxt);
        cnt.addChild(this.grpDbgMasume);
        this.grpDbgMasume.name = 'grpDbgMasume';
    }
    static init(cfg) {
        TxtStage.cfg = cfg;
        TxtStage.cvs = document.getElementById(CmnLib_1.CmnLib.sn_id);
        TxtStage.fncChkSkip = (TxtStage.cfg.oCfg.debug.baseTx)
            ? () => true
            : () => TxtStage.evtMng.isSkipKeyDown();
    }
    static setEvtMng(evtMng) { TxtStage.evtMng = evtMng; }
    lay(hArg, txl) {
        var _a, _b;
        const s = this.htmTxt.style;
        if (hArg.style) {
            const cln = document.createElement('span');
            cln.style.cssText = hArg.style;
            const len = cln.style.length;
            for (let i = 0; i < len; ++i) {
                const key = cln.style[i];
                if (key in TxtStage.hWarning) {
                    DebugMng_1.DebugMng.myTrace(`${key}は指定できません`, 'W');
                    continue;
                }
                s[key] = cln.style[key];
            }
        }
        if (CmnLib_1.CmnLib.hDip['tx']) {
            this.isTategaki = (s.writingMode == 'vertical-rl');
            this.left = txl.position.x
                - (CmnLib_1.CmnLib.isSafari && this.isTategaki
                    ? this.infTL.pad_left + this.infTL.pad_right
                    : 0);
            s.left = this.left + 'px';
            s.top = txl.position.y + 'px';
            if (!('alpha' in hArg))
                s.opacity = String(hArg.alpha);
            s.transformOrigin = `${hArg.pivot_x}px ${hArg.pivot_y}px`;
            s.transform = `rotate(${hArg.rotation}deg) scale(${hArg.scale_x}, ${hArg.scale_y}`;
            s.display = Boolean(hArg.visible) ? 'inline' : 'none';
        }
        s.textShadow = (_b = (_a = hArg.filter, (_a !== null && _a !== void 0 ? _a : s.textShadow)), (_b !== null && _b !== void 0 ? _b : ''));
        this.lay_sub();
    }
    lay_sub() {
        var _a;
        const s = this.htmTxt.style;
        const fs = parseFloat(s.fontSize || '0');
        this.infTL.fontsize = fs;
        this.infTL.pad_left = parseFloat(s.paddingLeft || '0');
        this.infTL.pad_right = parseFloat(s.paddingRight || '0');
        this.infTL.pad_top = parseFloat(s.paddingTop || '0');
        this.infTL.pad_bottom = parseFloat(s.paddingBottom || '0');
        this.infTL.$width = parseFloat(s.width || '0');
        this.infTL.$height = parseFloat(s.height || '0');
        this.parent.position.set(this.infTL.pad_left, this.infTL.pad_top);
        this.isTategaki = (s.writingMode == 'vertical-rl');
        const xSlide = TxtStage.cfg.oCfg.debug.slideBaseSpan
            ? document.documentElement.clientWidth - CmnLib_1.CmnLib.stageW
            : 0;
        if (CmnLib_1.CmnLib.hDip['tx']) {
            this.padTx4x = 0;
            this.padTx4y = 0;
        }
        else {
            s.left = xSlide + 'px';
            s.top = `0px`;
            s.zIndex = '-2';
            if (this.isTategaki) {
                this.padTx4x = fs;
            }
            else {
                this.padTx4y = fs;
            }
        }
        const lh = (_a = s.lineHeight, (_a !== null && _a !== void 0 ? _a : '0'));
        this.lh_half = this.isTategaki
            ? 0
            : ((lh.slice(-2) == 'px')
                ? parseFloat(lh)
                : (fs * parseFloat(lh) - fs)) / 2;
        this.xz4htm2rect = xSlide
            + this.infTL.pad_left
            + (this.isTategaki
                ? this.infTL.pad_left + this.infTL.pad_right
                : 0);
    }
    get tategaki() { return this.isTategaki; }
    setSize(width, height) {
        this.infTL.$width = width;
        this.infTL.$height = height;
        this.htmTxt.style.width = this.infTL.$width + 'px';
        this.htmTxt.style.height = this.infTL.$height + 'px';
    }
    goTxt(aSpan) {
        if (aSpan.length == 0)
            return;
        if (++this.cntGoTxtSerializer == 1)
            this.goTxt2(aSpan);
    }
    goTxt2_htm(aSpan) {
        let s = [...aSpan].join('');
        if (s.slice(-5) == '<br/>')
            s = s.slice(0, -5) + `<p style='margin: 0px;'>　</p>`;
        const a = s.split('<br/>');
        const len_a = a.length;
        for (let i = 0; i < len_a; ++i) {
            const v = a[i];
            a[i] = `<p style='margin: 0px;'>${(v == '') ? '　' : v}</p>`;
        }
        this.htmTxt.innerHTML = a.join('');
        this.htmTxt.hidden = false;
        this.htm2tx(tx2 => {
            this.goTxt3(tx2);
            if (--this.cntGoTxtSerializer <= 0) {
                this.cntGoTxtSerializer = 0;
                return;
            }
            this.skipChIn();
            this.goTxt2(aSpan);
        });
    }
    htm2tx(fnc, hidden = true) {
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
                            util.asArray(sheet.cssRules || []).forEach(cssRules.push.bind(cssRules));
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
        Promise.resolve(this.htmTxt)
            .then(node => {
            const cln = node.cloneNode(true);
            cln.style.padding = '0px';
            cln.style.paddingRight = this.padTx4x + 'px';
            cln.style.paddingTop = this.padTx4y + 'px';
            cln.style.left = '0px';
            cln.style.top = '0px';
            cln.style.width = (this.infTL.$width - this.infTL.pad_left - this.infTL.pad_right) + 'px';
            cln.style.height = (this.infTL.$height - this.infTL.pad_top - this.infTL.pad_bottom) + 'px';
            this.htmTxt.hidden = hidden;
            return cln;
        })
            .then(embedFonts)
            .then(node => {
            node.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
            const img = new Image;
            img.src = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${this.infTL.$width}px" height="${this.infTL.$height}px"><foreignObject x="0" y="0" width="100%" height="100%">${new XMLSerializer().serializeToString(node)
                .replace(/#/g, '%23').replace(/\n/g, '%0A')}</foreignObject></svg>`;
            return new Promise(resolve => img.onload = () => resolve(img));
        })
            .then(img => new Promise(resolve => setTimeout(() => resolve(img), 100)))
            .then((img) => {
            const canvas = document.createElement('canvas');
            canvas.width = this.infTL.$width;
            canvas.height = this.infTL.$height;
            canvas.getContext('2d').drawImage(img, 0, 0);
            canvas.toBlob(blob => {
                const url = URL.createObjectURL(blob);
                pixi_js_1.Texture.from(url).once('update', (tx2) => {
                    fnc(tx2);
                    URL.revokeObjectURL(url);
                });
            });
        })
            .catch(err => DebugMng_1.DebugMng.myTrace(`goTxt() = ${err}`));
    }
    goTxt3_tx2sp(tx) {
        if (TxtStage.fncChkSkip()) {
            const sp = new pixi_js_1.Sprite(tx);
            sp.x -= this.padTx4x;
            sp.y -= this.padTx4y;
            this.cntTxt.addChild(sp);
            return;
        }
        const lenPutedRect = this.aRect.length;
        this.htmTxt.hidden = false;
        const aRect = this.getChRects(this.htmTxt);
        this.htmTxt.hidden = true;
        for (let i = aRect.length - 1; i > 0; --i) {
            const r2 = aRect[i];
            TxtStage.REG_SURROGATE.lastIndex = 0;
            if (!TxtStage.REG_SURROGATE.test(r2.ch))
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
            cr.rect.y -= this.infTL.pad_top;
        for (let i = 0; i < lenPutedRect; ++i) {
            const rect = aRect[i].rect.clone();
            rect.x -= this.xz4htm2rect;
            this.cntTxt.children[i].position.set(rect.x, rect.y);
        }
        let begin = 0;
        if (this.aRect.length == 0) {
            if (TxtStage.cfg.oCfg.debug.masume) {
                if (TxtStage.cfg.oCfg.debug.devtool)
                    console.log(`🍌 masume ${this.name} v:${this.visible} l:${this.x} t:${this.y} a:${this.alpha} pl:${this.infTL.pad_left} pr:${this.infTL.pad_right} pt:${this.infTL.pad_top} pb:${this.infTL.pad_bottom} w:${this.infTL.$width} h:${this.infTL.$height}`);
                this.grpDbgMasume.clear();
                this.grpDbgMasume.beginFill(0x33FF00, 0.2);
                this.grpDbgMasume.lineStyle(1, 0x33FF00, 1);
                this.grpDbgMasume.drawRect(-this.infTL.pad_left, -this.infTL.pad_top, this.infTL.$width, this.infTL.$height);
                this.grpDbgMasume.endFill();
                this.grpDbgMasume.beginFill(0x0033FF, 0.2);
                this.grpDbgMasume.lineStyle(2, 0x0033FF, 1);
                this.grpDbgMasume.drawRect(0, 0, this.infTL.$width - this.infTL.pad_left - this.infTL.pad_right, this.infTL.$height - this.infTL.pad_top - this.infTL.pad_bottom);
                this.grpDbgMasume.endFill();
            }
        }
        else {
            for (begin = lenPutedRect - 1; begin >= 0; --begin) {
                if (aRect[begin].ch == this.aRect[begin].ch)
                    continue;
                this.skipChIn();
                for (const v of this.cntTxt.removeChildren(begin)) {
                    v.removeAllListeners().destroy();
                }
                break;
            }
            if (begin < 0)
                begin = lenPutedRect;
        }
        this.aRect = aRect;
        const ease = CmnTween_1.CmnTween.ease(this.fi_easing);
        let delay = 0;
        const len = this.aRect.length;
        for (let i = begin; i < len; ++i) {
            const v = this.aRect[i];
            const rct = v.rect.clone();
            rct.x -= this.xz4htm2rect;
            if (TxtStage.cfg.oCfg.debug.masume) {
                if (TxtStage.cfg.oCfg.debug.devtool)
                    console.log(`🍌 masume ch:${v.ch} x:${rct.x} y:${rct.y} w:${rct.width} h:${rct.height}`);
                this.grpDbgMasume.beginFill(0x66CCFF, 0.5);
                this.grpDbgMasume.lineStyle(2, 0xFF3300, 1);
                this.grpDbgMasume.drawRect(rct.x, rct.y, rct.width, rct.height);
                this.grpDbgMasume.endFill();
            }
            delay += (v.add)
                ? CmnLib_1.uint(JSON.parse(v.add.replace(/'/g, '"')).wait)
                : LayerMng_1.LayerMng.msecChWait;
            const delay_put = (i < lenPutedRect)
                || TxtStage.gs_chFadeWait == 0 || delay == 0;
            const o = v.arg ? JSON.parse(v.arg) : {};
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
                sp.x += this.ch_slide_x();
                if (delay_put) {
                    sp.alpha = 1;
                    sp.x = rct.x;
                    sp.y = rct.y;
                    sp.width = rct.width;
                    sp.height = rct.height;
                    sp.rotation = 0;
                    return;
                }
                const st = {
                    sp: sp,
                    tw: new TWEEN.default.Tween(sp)
                        .to({ alpha: 1, x: rct.x, y: rct.y, width: rct.width, height: rct.height, rotation: 0 }, TxtStage.gs_chFadeWait)
                        .easing(ease)
                        .delay(delay)
                        .onComplete(() => {
                        st.tw = null;
                    })
                        .start(),
                };
                this.aSpTw.push(st);
            };
            switch (v.cmd) {
                case 'grp':
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
                    tx_c.frame = new pixi_js_1.Rectangle(rct.x + this.padTx4x, rct.y + this.padTx4y, rct.width, rct.height);
                    if (tx_c.frame.x < 0 || tx_c.frame.y < 0)
                        console.log(`x=${tx_c.frame.x} または y=${tx_c.frame.y} が負の値です。文字「${v.ch}」が表示されない場合があります`);
                    const sp = new pixi_js_1.Sprite(tx_c);
                    this.cntTxt.addChild(sp);
                    spWork(sp);
                    if (v.cmd == 'link') {
                        if (!v.arg)
                            throw `fn:TxtStage.ts v.arg null`;
                        const o = JSON.parse(v.arg);
                        o.key = this.name + ' link:' + i;
                        TxtStage.evtMng.button(o, sp);
                    }
            }
        }
        this.putBreakMark(delay);
    }
    goTxt_next(aSpan) {
        var _a, _b, _c;
        const begin = this.aRect.length;
        if (TxtStage.cfg.oCfg.debug.masume && begin == 0) {
            if (TxtStage.cfg.oCfg.debug.devtool)
                console.log(`🍌 masume ${this.name} v:${this.visible} l:${this.x} t:${this.y} a:${this.alpha} pl:${this.infTL.pad_left} pr:${this.infTL.pad_right} pt:${this.infTL.pad_top} pb:${this.infTL.pad_bottom} w:${this.infTL.$width} h:${this.infTL.$height}`);
            this.grpDbgMasume.clear();
            this.grpDbgMasume.beginFill(0x33FF00, 0.2);
            this.grpDbgMasume.lineStyle(1, 0x33FF00, 1);
            this.grpDbgMasume.drawRect(-this.infTL.pad_left, -this.infTL.pad_top, this.infTL.$width, this.infTL.$height);
            this.grpDbgMasume.endFill();
            this.grpDbgMasume.beginFill(0x0033FF, 0.2);
            this.grpDbgMasume.lineStyle(2, 0x0033FF, 1);
            this.grpDbgMasume.drawRect(0, 0, this.infTL.$width - this.infTL.pad_left - this.infTL.pad_right, this.infTL.$height - this.infTL.pad_top - this.infTL.pad_bottom);
            this.grpDbgMasume.endFill();
        }
        if (begin == 0) {
            this.htmTxt.innerHTML = [...aSpan].join('');
        }
        else {
            this.htmTxt.insertAdjacentHTML('beforeend', aSpan.slice(this.lenHtmTxt).join(''));
        }
        this.lenHtmTxt = aSpan.length;
        this.aRect = this.getChRects(this.htmTxt);
        const len = this.aRect.length;
        const fncMasumeLog = (TxtStage.cfg.oCfg.debug.devtool)
            ? (v, rct) => console.log(`🍌 masume ch:${v.ch} x:${rct.x} y:${rct.y} w:${rct.width} h:${rct.height}`)
            : () => { };
        const fncMasume = (TxtStage.cfg.oCfg.debug.masume)
            ? (v, rct) => {
                fncMasumeLog(v, rct);
                this.grpDbgMasume.beginFill(0x66CCFF, 0.5);
                this.grpDbgMasume.lineStyle(2, 0xFF3300, 1);
                this.grpDbgMasume.drawRect(rct.x, rct.y, rct.width, rct.height);
                this.grpDbgMasume.endFill();
            }
            : () => { };
        const ease = CmnTween_1.CmnTween.ease(this.fi_easing);
        const bcr = this.htmTxt.getBoundingClientRect();
        const sx = bcr.left + window.pageXOffset + this.infTL.pad_left;
        const sy = bcr.top + window.pageYOffset + this.infTL.pad_top;
        for (let i = begin; i < len; ++i) {
            const v = this.aRect[i];
            const rct = v.rect;
            const arg = JSON.parse((_a = v.arg, (_a !== null && _a !== void 0 ? _a : '{"delay": 0}')));
            const add = JSON.parse((_b = v.add, (_b !== null && _b !== void 0 ? _b : '{}')));
            const cis = TxtStage.hChInStyle[add.ch_in_style];
            rct.x -= sx;
            rct.y -= sy;
            fncMasume(v, rct);
            if (cis)
                this.rctm = rct;
            switch (v.cmd) {
                case 'grp':
                    const cnt = new pixi_js_1.Container;
                    this.spWork_next(cnt, arg, add, rct, ease, (cis !== null && cis !== void 0 ? cis : {}));
                    this.cntTxt.addChild(cnt);
                    GrpLayer_1.GrpLayer.csv2Sprites(arg.pic, cnt, sp => {
                        if (!cnt.parent)
                            cnt.removeChild(sp);
                    });
                    break;
                case 'link':
                    const sp = new pixi_js_1.Sprite;
                    sp.width = rct.width;
                    sp.height = rct.height;
                    arg.key = this.name + ' link:' + i;
                    this.spWork_next(sp, arg, add, rct, ease, (cis !== null && cis !== void 0 ? cis : {}));
                    TxtStage.evtMng.button(arg, sp);
                    this.cntTxt.addChild(sp);
                    break;
            }
        }
        this.aRect.slice(0, -1);
        --this.lenHtmTxt;
        this.htmTxt.innerHTML = this.htmTxt.innerHTML.replace(/<span [^>]+>　<\/span>$/, '');
        const chs = this.htmTxt.querySelectorAll('span.sn_ch');
        const len_chs = chs.length;
        for (let i = 0; i < len_chs; ++i) {
            const v = chs[i];
            v.className = v.className.replace(/sn_ch_in_([^\s"]+)/g, 'go_ch_in_$1');
        }
        this.fncEndChIn = () => {
            for (let i = 0; i < len_chs; ++i) {
                const v = chs[i];
                v.className = v.className.replace(/ go_ch_in_[^\s"]+/g, '');
            }
            TxtStage.cntBreak.position.set(this.rctm.x, this.rctm.y);
            TxtStage.cntBreak.visible = true;
            this.fncEndChIn = () => { };
        };
        if (len_chs == 0) {
            this.fncEndChIn();
            return;
        }
        let le = null;
        for (let i = len_chs - 1; i >= 0; --i) {
            const v = chs[i];
            if (v.className == 'sn_ch')
                continue;
            const m = (_c = v.getAttribute('style')) === null || _c === void 0 ? void 0 : _c.match(this.regDs);
            if (!m || Number(m.groups.ms) > 0) {
                le = v;
                break;
            }
        }
        if (!le) {
            this.fncEndChIn();
            return;
        }
        this.isChInIng = true;
        le.addEventListener('animationend', () => {
            this.isChInIng = false;
            this.fncEndChIn();
        }, { once: true, passive: true });
    }
    spWork_next(sp, arg, add, rct, ease, cis) {
        var _a, _b, _c;
        sp.alpha = 0;
        if (arg.width)
            sp.width = arg.width;
        if (arg.height)
            sp.height = arg.height;
        sp.position.set((cis.x.charAt(0) == '=') ? rct.x + sp.width * cis.nx : cis.nx, (cis.y.charAt(0) == '=') ? rct.y + sp.height * cis.ny : cis.ny);
        const st = {
            sp: sp,
            tw: new TWEEN.default.Tween(sp)
                .to({ alpha: 1, x: rct.x, y: rct.y, width: rct.width, height: rct.height, rotation: 0 }, (_a = cis.wait, (_a !== null && _a !== void 0 ? _a : 0)))
                .easing(ease)
                .delay((_b = add.wait, (_b !== null && _b !== void 0 ? _b : 0)) + (_c = arg.delay, (_c !== null && _c !== void 0 ? _c : 0)))
                .onComplete(() => {
                st.tw = null;
            })
                .start(),
        };
        this.aSpTw.push(st);
    }
    static initChStyle() {
        TxtStage.hChInStyle = Object.create(null);
        TxtStage.hChOutStyle = Object.create(null);
    }
    static getChInStyle(name) { return TxtStage.hChInStyle[name]; }
    static ch_in_style(hArg) {
        var _a, _b, _c;
        const name = hArg.name;
        if (!name)
            throw 'nameは必須です';
        TxtStage.REG_NG_CHSTYLE_NAME_CHR.lastIndex = 0;
        if (TxtStage.REG_NG_CHSTYLE_NAME_CHR.test(name))
            throw `name【${name}】に使えない文字が含まれます`;
        if (name in TxtStage.hChInStyle)
            throw `name【${name}】はすでにあります`;
        const x = String((_a = hArg.x, (_a !== null && _a !== void 0 ? _a : '=0')));
        const y = String((_b = hArg.y, (_b !== null && _b !== void 0 ? _b : '=0')));
        return TxtStage.hChInStyle[name] = {
            wait: CmnLib_1.CmnLib.argChk_Num(hArg, 'wait', 500),
            alpha: CmnLib_1.CmnLib.argChk_Num(hArg, 'alpha', 0),
            x: x,
            y: y,
            nx: parseFloat((x.charAt(0) == '=') ? x.slice(1) : x),
            ny: parseFloat((y.charAt(0) == '=') ? y.slice(1) : y),
            scale_x: CmnLib_1.CmnLib.argChk_Num(hArg, 'scale_x', 1),
            scale_y: CmnLib_1.CmnLib.argChk_Num(hArg, 'scale_y', 1),
            rotate: CmnLib_1.CmnLib.argChk_Num(hArg, 'rotate', 0),
            join: CmnLib_1.CmnLib.argChk_Boolean(hArg, 'join', true),
            ease: (_c = hArg.ease, (_c !== null && _c !== void 0 ? _c : 'ease-out')),
        };
    }
    static getChOutStyle(name) { return TxtStage.hChOutStyle[name]; }
    static ch_out_style(hArg) {
        var _a, _b, _c;
        const name = hArg.name;
        if (!name)
            throw 'nameは必須です';
        TxtStage.REG_NG_CHSTYLE_NAME_CHR.lastIndex = 0;
        if (TxtStage.REG_NG_CHSTYLE_NAME_CHR.test(name))
            throw `name【${name}】に使えない文字が含まれます`;
        if (name in TxtStage.hChOutStyle)
            throw `name【${name}】はすでにあります`;
        const x = String((_a = hArg.x, (_a !== null && _a !== void 0 ? _a : '=0')));
        const y = String((_b = hArg.y, (_b !== null && _b !== void 0 ? _b : '=0')));
        return TxtStage.hChOutStyle[name] = {
            wait: CmnLib_1.CmnLib.argChk_Num(hArg, 'wait', 500),
            alpha: CmnLib_1.CmnLib.argChk_Num(hArg, 'alpha', 0),
            x: x,
            y: y,
            nx: parseFloat((x.charAt(0) == '=') ? x.slice(1) : x),
            ny: parseFloat((y.charAt(0) == '=') ? y.slice(1) : y),
            scale_x: CmnLib_1.CmnLib.argChk_Num(hArg, 'scale_x', 1),
            scale_y: CmnLib_1.CmnLib.argChk_Num(hArg, 'scale_y', 1),
            rotate: CmnLib_1.CmnLib.argChk_Num(hArg, 'rotate', 0),
            join: CmnLib_1.CmnLib.argChk_Boolean(hArg, 'join', false),
            ease: (_c = hArg.ease, (_c !== null && _c !== void 0 ? _c : 'ease-out')),
        };
    }
    dispBreak(pic) {
        const cnt = TxtStage.cntBreak;
        cnt.visible = false;
        this.addChild(cnt);
        GrpLayer_1.GrpLayer.csv2Sprites(pic, cnt, sp => {
            if (!cnt.parent)
                cnt.removeChild(sp);
        });
    }
    static delBreak() {
        const cnt = TxtStage.cntBreak;
        if (cnt.parent) {
            cnt.parent.removeChild(cnt);
            cnt.removeChildren();
        }
        TxtStage.cntBreak = new pixi_js_1.Container;
    }
    putBreakMark(delay = 0) {
        const cnt = TxtStage.cntBreak;
        if (cnt.parent == null)
            return;
        const rct = this.aRect.slice(-1)[0].rect;
        cnt.position.set(rct.x - this.xz4htm2rect, rct.y);
        if (this.isTategaki) {
            cnt.y += this.infTL.fontsize;
        }
        else {
            cnt.x += this.infTL.fontsize;
        }
        if (delay == 0) {
            cnt.visible = true;
            return;
        }
        cnt.visible = false;
        const st = {
            sp: cnt,
            tw: new TWEEN.default.Tween(cnt)
                .to({}, 0)
                .delay(delay)
                .onComplete(() => { st.tw = null; st.sp.visible = true; })
                .start(),
        };
        this.aSpTw.push(st);
    }
    getChRects(elm) {
        var _a, _b, _c, _d;
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
                throw `fn:TxtStage.ts pe null`;
            const ch = range.toString();
            const cr = {
                ch: ch,
                rect: new pixi_js_1.Rectangle(r.left + window.pageXOffset, r.top + window.pageYOffset, r.width, r.height + ('gjqy'.includes(ch) ? this.lh_half : 0)),
                cmd: (_a = pe.getAttribute('data-cmd'), (_a !== null && _a !== void 0 ? _a : undefined)),
                arg: (_b = pe.getAttribute('data-arg'), (_b !== null && _b !== void 0 ? _b : undefined)),
                add: (_c = pe.getAttribute('data-add'), (_c !== null && _c !== void 0 ? _c : undefined)),
                tcy: (_d = pe.getAttribute('data-tcy'), (_d !== null && _d !== void 0 ? _d : undefined)),
            };
            ret.push(cr);
        }
        range.detach();
        return ret;
    }
    skipChIn() {
        let isLiveTw = this.isChInIng;
        if (this.isChInIng)
            this.fncEndChIn();
        this.aSpTw.forEach(st => { if (st.tw) {
            st.tw.stop().end();
            isLiveTw = true;
        } });
        this.aSpTw = [];
        return isLiveTw;
    }
    clearText() {
        var _a, _b, _c, _d;
        this.goTxt2 = () => { };
        this.goTxt3 = (_tx) => { };
        this.grpDbgMasume.clear();
        this.aRect = [];
        this.lenHtmTxt = 0;
        this.skipChIn();
        if (CmnLib_1.CmnLib.hDip['tx']) {
            const n = this.htmTxt.cloneNode(true);
            n.textContent = '';
            const old = this.htmTxt;
            old.parentElement.insertBefore(n, old);
            const chs = old.querySelectorAll('span.sn_ch');
            const len_chs = chs.length;
            let sum_wait = 0;
            for (let i = 0; i < len_chs; ++i) {
                const elm = chs[i];
                const add = JSON.parse((_c = (_b = (_a = elm.getAttribute('data-add'), (_a !== null && _a !== void 0 ? _a : elm.children[0].getAttribute('data-add'))), (_b !== null && _b !== void 0 ? _b : elm.children[0].children[0]
                    .getAttribute('data-add'))), (_c !== null && _c !== void 0 ? _c : '{}')));
                if (!add.ch_out_style)
                    continue;
                const cos = TxtStage.hChOutStyle[add.ch_out_style];
                if (!cos)
                    continue;
                if (cos.wait == 0) {
                    elm.style.display = 'none';
                    continue;
                }
                sum_wait += cos.wait;
                if (!cos.join)
                    elm.style.animationDelay = '0ms';
                elm.classList.add(`go_ch_out_${add.ch_out_style}`);
            }
            const end = () => {
                old.parentElement.removeChild(old);
                for (const c of this.cntTxt.removeChildren())
                    c.removeAllListeners().destroy();
            };
            if (sum_wait == 0) {
                this.htmTxt.textContent = '';
                end();
            }
            else
                (_d = old.lastElementChild) === null || _d === void 0 ? void 0 : _d.addEventListener('animationend', end, { once: true, passive: true });
            this.htmTxt = n;
        }
        else {
            this.htmTxt.textContent = '';
            if (TxtStage.gs_chFadeWait == 0) {
                for (const c of this.cntTxt.removeChildren())
                    c.removeAllListeners().destroy();
            }
            else {
                const ease = CmnTween_1.CmnTween.ease(this.fo_easing);
                for (const c of this.cntTxt.children) {
                    c.removeAllListeners();
                    new TWEEN.default.Tween(c)
                        .to({ alpha: 0, x: `+${this.ch_slide_x()}` }, TxtStage.gs_chFadeWait)
                        .easing(ease)
                        .onComplete((o) => this.cntTxt.removeChild(o))
                        .start();
                }
            }
        }
    }
    passBaton() {
        this.clearText();
        const to = new TxtStage(this.infTL, this.parent);
        to.htmTxt.style.cssText = this.htmTxt.style.cssText;
        to.left = this.left;
        to.name = this.name;
        to.lay_sub();
        to.ch_filter = this.ch_filter;
        to.fi_easing = this.fi_easing;
        to.fo_easing = this.fo_easing;
        return to;
    }
    record() {
        return {
            infTL: this.infTL,
            cssText: this.htmTxt.style.cssText,
            left: this.left,
            ch_filter: this.ch_filter,
            fi_easing: this.fi_easing,
            fo_easing: this.fo_easing,
        };
    }
    ;
    playback(hLay) {
        this.infTL = hLay.infTL;
        this.parent.position.set(this.infTL.pad_left, this.infTL.pad_top);
        this.htmTxt.style.cssText = hLay.cssText;
        this.left = hLay.left;
        this.lay_sub();
        this.ch_filter = hLay.ch_filter;
        this.fi_easing = hLay.fi_easing;
        this.fo_easing = hLay.fo_easing;
    }
    snapshot(rnd, re) {
        if (!CmnLib_1.CmnLib.hDip['tx']) {
            re();
            return;
        }
        this.htm2tx(tx => {
            this.sss = new pixi_js_1.Sprite(tx);
            if (this.isTategaki) {
                this.sss.x += CmnLib_1.CmnLib.stageW - (this.left + this.infTL.$width)
                    - (CmnLib_1.CmnLib.isSafari
                        ? 0
                        : this.infTL.pad_left + this.infTL.pad_right);
            }
            this.sss.y -= this.padTx4y;
            this.sss.texture.frame = new pixi_js_1.Rectangle(0, 0, this.infTL.$width - this.left, this.infTL.$height);
            this.cntTxt.addChild(this.sss);
            rnd.render(this.sss, undefined, false);
            re();
        }, false);
    }
    snapshot_end() {
        if (this.sss) {
            this.cntTxt.removeChild(this.sss);
            this.sss = null;
        }
    }
    dump() {
        const aStyle = [];
        const s = this.htmTxt.style;
        const lenStyle = s.length;
        for (let i = 0; i < lenStyle; ++i) {
            const key = s[i];
            aStyle.push(`"${key}":"${s[key].replace(/(")/g, '\\$1')}"`);
        }
        return `"txt":"${this.htmTxt.textContent.replace(/(")/g, '\\$1')}", "style":{${aStyle.join(',')}}`;
    }
    destroy() {
        TxtStage.delBreak();
        this.htmTxt.parentElement.removeChild(this.htmTxt);
        this.parent.removeChild(this.cntTxt);
        this.parent.removeChild(this.grpDbgMasume);
        this.parent.removeChild(this);
        super.destroy();
    }
}
exports.TxtStage = TxtStage;
TxtStage.hWarning = {
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
TxtStage.REG_SURROGATE = /[\uDC00-\uDFFF]/;
TxtStage.fncChkSkip = () => false;
TxtStage.hChInStyle = Object.create(null);
TxtStage.REG_NG_CHSTYLE_NAME_CHR = /[\s\.,]/;
TxtStage.hChOutStyle = Object.create(null);
TxtStage.cntBreak = new pixi_js_1.Container;
TxtStage.gs_chFadeWait = 500;
TxtStage.gs_chFadeDx = 0.3;
//# sourceMappingURL=TxtStage.js.map