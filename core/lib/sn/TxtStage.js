"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pixi_js_1 = require("pixi.js");
const CmnLib_1 = require("./CmnLib");
const LayerMng_1 = require("./LayerMng");
const CmnTween_1 = require("./CmnTween");
const GrpLayer_1 = require("./GrpLayer");
const DebugMng_1 = require("./DebugMng");
const TWEEN = require("@tweenjs/tween.js");
;
;
class TxtStage extends pixi_js_1.Container {
    constructor(infTL, cnt) {
        super();
        this.infTL = infTL;
        this.htmTxt = document.createElement('span');
        this.cntTxt = new pixi_js_1.Container;
        this.grpDbgMasume = new pixi_js_1.Graphics;
        this.isTategaki = false;
        this.padTx4x = 0;
        this.padTx4y = 0;
        this.rctBoundCli = 0;
        this.goTxt2 = (aSpan, layname) => this.goTxt2_htm(aSpan, layname);
        this.cntGoTxtSerializer = 0;
        this.goTxt3 = (tx) => this.goTxt3_tx2sp(tx);
        this.aRect = [];
        this.xz4htm2rect = 0;
        this.aSpTw = [];
        this.rctm = new pixi_js_1.Rectangle;
        this.lh_half = 0;
        this.ch_anime_time_仮 = 500;
        this.fncFi = (sp) => { sp.x += this.infTL.fontsize / 3; };
        this.fi_easing = 'Quadratic.Out';
        this.fo = { alpha: 0, x: `+${this.infTL.fontsize / 3}` };
        this.fo_easing = 'Quadratic.Out';
        if (CmnLib_1.CmnLib.hDip['tx']) {
            this.htmTxt.classList.add('sn_txl');
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
        TxtStage.cvs = document.getElementById('skynovel');
        TxtStage.fncChkSkip = (TxtStage.cfg.oCfg.debug.baseTx)
            ? () => true
            : () => TxtStage.evtMng.isSkipKeyDown();
    }
    static setEvtMng(evtMng) { TxtStage.evtMng = evtMng; }
    lay(hArg) {
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
                this.htmTxt.style[key] = cln.style[key];
            }
        }
        if (CmnLib_1.CmnLib.hDip['tx']) {
            const left = CmnLib_1.CmnLib.argChk_Num(hArg, 'left', 0);
            const top = CmnLib_1.CmnLib.argChk_Num(hArg, 'top', 0);
            this.htmTxt.style.left = left + 'px';
            this.htmTxt.style.top = top + 'px';
        }
        this.htmTxt.style.textShadow = (hArg.filter)
            ? `1px 1px 2px gray, 0 0 1em #000, 0 0 0.2em #000`
            : '';
        this.lay_sub();
    }
    lay_sub() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const fs = parseFloat((_a = this.htmTxt.style.fontSize, (_a !== null && _a !== void 0 ? _a : '0')));
        this.infTL.fontsize = fs;
        this.infTL.pad_left = parseFloat((_b = this.htmTxt.style.paddingLeft, (_b !== null && _b !== void 0 ? _b : '0')));
        this.infTL.pad_right = parseFloat((_c = this.htmTxt.style.paddingRight, (_c !== null && _c !== void 0 ? _c : '0')));
        this.infTL.pad_top = parseFloat((_d = this.htmTxt.style.paddingTop, (_d !== null && _d !== void 0 ? _d : '0')));
        this.infTL.pad_bottom = parseFloat((_e = this.htmTxt.style.paddingBottom, (_e !== null && _e !== void 0 ? _e : '0')));
        this.infTL.$width = parseFloat((_f = this.htmTxt.style.width, (_f !== null && _f !== void 0 ? _f : '0')));
        this.infTL.$height = parseFloat((_g = this.htmTxt.style.height, (_g !== null && _g !== void 0 ? _g : '0')));
        this.parent.position.set(this.infTL.pad_left, this.infTL.pad_top);
        this.isTategaki = (this.htmTxt.style.writingMode == 'vertical-rl');
        const xSlide = TxtStage.cfg.oCfg.debug.slideBaseSpan
            ? document.documentElement.clientWidth - CmnLib_1.CmnLib.stageW
            : 0;
        if (CmnLib_1.CmnLib.hDip['tx']) {
            this.padTx4x = parseFloat(this.htmTxt.style.left) + this.infTL.pad_left;
            this.padTx4y = parseFloat(this.htmTxt.style.top) + this.infTL.pad_top;
            const boundClientRect = this.htmTxt.getBoundingClientRect();
            this.rctBoundCli = boundClientRect.top;
        }
        else {
            this.htmTxt.style.left = xSlide + 'px';
            this.htmTxt.style.top = `0px`;
            this.htmTxt.style.zIndex = '-2';
            if (this.isTategaki) {
                this.padTx4x = fs;
            }
            else {
                this.padTx4y = fs;
            }
        }
        const lh = (_h = this.htmTxt.style.lineHeight, (_h !== null && _h !== void 0 ? _h : '0'));
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
    setSize(width, height) {
        this.infTL.$width = width;
        this.infTL.$height = height;
        this.htmTxt.style.width = this.infTL.$width + 'px';
        this.htmTxt.style.height = this.infTL.$height + 'px';
    }
    goTxt(aSpan, layname) {
        if (aSpan.length == 0)
            return;
        if (++this.cntGoTxtSerializer == 1)
            this.goTxt2(aSpan, layname);
    }
    goTxt2_htm(aSpan, layname) {
        this.name = layname;
        let s = [...aSpan].join('');
        if (s.slice(-5) == '<br/>')
            s = s.slice(0, -5) + `<p style='margin: 0px;'>　</p>`;
        this.htmTxt.innerHTML = s.split('<br/>')
            .map(v => `<p style='margin: 0px;'>${(v == '') ? '　' : v}</p>`)
            .join('');
        this.htmTxt.hidden = false;
        this.htm2tx(tx2 => {
            this.goTxt3(tx2);
            if (--this.cntGoTxtSerializer <= 0) {
                this.cntGoTxtSerializer = 0;
                return;
            }
            this.skipFI();
            this.goTxt2(aSpan, layname);
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
                this.skipFI();
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
                || this.ch_anime_time_仮 == 0 || delay == 0;
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
                this.fncFi(sp);
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
                    tw: new TWEEN.Tween(sp)
                        .to({ alpha: 1, x: rct.x, y: rct.y, width: rct.width, height: rct.height, rotation: 0 }, this.ch_anime_time_仮)
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
    goTxt_next(aSpan, layname, delay) {
        var _a;
        this.name = layname;
        let s = [...aSpan].join('');
        if (s.slice(-5) == '<br/>')
            s = s.slice(0, -5) + `<p style='margin: 0px;'>　</p>`;
        this.htmTxt.innerHTML = s.split('<br/>')
            .map(v => `<p style='margin: 0px;'>${(v == '') ? '　' : v}</p>`)
            .join('');
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
        for (let i = begin; i < len; ++i) {
            const v = this.aRect[i];
            const rct = v.rect;
            rct.x -= this.infTL.fontsize;
            rct.y -= this.infTL.pad_top + this.rctBoundCli;
            fncMasume(v, rct);
            this.rctm = rct;
            const arg = JSON.parse((_a = v.arg, (_a !== null && _a !== void 0 ? _a : '{"delay": 0}')));
            switch (v.cmd) {
                case 'grp':
                    const cnt = new pixi_js_1.Container;
                    this.spWork(cnt, arg, rct, ease);
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
                    this.spWork(sp, arg, rct, ease);
                    TxtStage.evtMng.button(arg, sp);
                    this.cntTxt.addChild(sp);
                    break;
            }
        }
        this.putBreakMark2(delay);
    }
    spWork(sp, arg, rct, ease) {
        var _a;
        sp.alpha = 0;
        sp.position.set(rct.x, rct.y);
        if (arg.width)
            sp.width = arg.width;
        if (arg.height)
            sp.height = arg.height;
        const st = {
            sp: sp,
            tw: new TWEEN.Tween(sp)
                .to({ alpha: 1, x: rct.x, y: rct.y, width: rct.width, height: rct.height, rotation: 0 }, this.ch_anime_time_仮)
                .easing(ease)
                .delay((_a = arg.delay, (_a !== null && _a !== void 0 ? _a : 0)))
                .onComplete(() => {
                st.tw = null;
            })
                .start(),
        };
        this.aSpTw.push(st);
    }
    putBreakMark2(delay) {
        const cnt = TxtStage.cntBreak;
        if (cnt.parent == null)
            return;
        cnt.x = this.rctm.x;
        cnt.y = this.rctm.y;
        if (this.isTategaki) {
            cnt.y += this.rctm.height;
        }
        else {
            cnt.x += this.rctm.width;
        }
        if (delay == 0) {
            cnt.visible = true;
            return;
        }
        cnt.visible = false;
        const st = {
            sp: cnt,
            tw: new TWEEN.Tween(cnt)
                .to({}, 0)
                .delay(delay)
                .onComplete(() => { st.tw = null; st.sp.visible = true; })
                .start(),
        };
        this.aSpTw.push(st);
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
            tw: new TWEEN.Tween(cnt)
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
    skipFI() {
        let isLiveTw = false;
        this.aSpTw.forEach(st => { if (st.tw) {
            st.tw.stop().end();
            isLiveTw = true;
        } });
        this.aSpTw = [];
        return isLiveTw;
    }
    clearText() {
        this.goTxt2 = () => { };
        this.goTxt3 = (_tx) => { };
        this.grpDbgMasume.clear();
        this.aRect = [];
        this.htmTxt.textContent = '';
        this.skipFI();
        if (this.ch_anime_time_仮 == 0) {
            for (const c of this.cntTxt.removeChildren())
                c.removeAllListeners().destroy();
        }
        else {
            const ease = CmnTween_1.CmnTween.ease(this.fo_easing);
            for (const c of this.cntTxt.children) {
                c.removeAllListeners();
                new TWEEN.Tween(c)
                    .to(this.fo, this.ch_anime_time_仮)
                    .easing(ease)
                    .onComplete(o => this.cntTxt.removeChild(o))
                    .start();
            }
        }
    }
    passBaton() {
        this.clearText();
        const to = new TxtStage(this.infTL, this.parent);
        to.htmTxt.style.cssText = this.htmTxt.style.cssText;
        to.lay_sub();
        to.ch_filter = this.ch_filter;
        to.fi_easing = this.fi_easing;
        to.fo = this.fo;
        to.fo_easing = this.fo_easing;
        to.ch_anime_time_仮 = this.ch_anime_time_仮;
        return to;
    }
    record() {
        return {
            infTL: this.infTL,
            cssText: this.htmTxt.style.cssText,
            ch_filter: this.ch_filter,
            fi_easing: this.fi_easing,
            fo: this.fo,
            fo_easing: this.fo_easing,
            ch_anime_time_仮: this.ch_anime_time_仮,
        };
    }
    ;
    playback(hLay) {
        this.infTL = hLay.infTL;
        this.parent.position.set(this.infTL.pad_left, this.infTL.pad_top);
        this.htmTxt.style.cssText = hLay.cssText;
        this.lay_sub();
        this.ch_filter = hLay.ch_filter;
        this.fncFi = (sp) => { sp.x += this.infTL.fontsize / 3; };
        this.fi_easing = hLay.fi_easing;
        this.fo = hLay.fo;
        this.fo_easing = hLay.fo_easing;
        this.ch_anime_time_仮 = hLay.ch_anime_time_仮;
    }
    snapshot(rnd, re) {
        if (!CmnLib_1.CmnLib.hDip['tx']) {
            re();
            return;
        }
        this.htm2tx(tx => {
            const sp = new pixi_js_1.Sprite(tx);
            this.cntTxt.addChild(sp);
            rnd.render(sp, undefined, false);
            this.cntTxt.removeChild(sp);
            re();
        }, false);
    }
    static snapshotBreak(rnd) {
        console.log(`fn:TxtStage.ts line:1098 `);
        rnd.render(TxtStage.cntBreak, undefined, false);
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
TxtStage.cntBreak = new pixi_js_1.Container;
//# sourceMappingURL=TxtStage.js.map