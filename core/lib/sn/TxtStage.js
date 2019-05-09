"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pixi_js_1 = require("pixi.js");
const CmnLib_1 = require("./CmnLib");
const LayerMng_1 = require("./LayerMng");
const CmnTween_1 = require("./CmnTween");
const GrpLayer_1 = require("./GrpLayer");
const DebugMng_1 = require("./DebugMng");
const TWEEN = require("@tweenjs/tween.js");
const pixi_filters_1 = require("pixi-filters");
const TxtLayer_1 = require("./TxtLayer");
;
;
class TxtStage extends pixi_js_1.Container {
    constructor(infTL, cnt) {
        super();
        this.infTL = infTL;
        this.htmTxt = document.createElement('span');
        this.cntTxt = new pixi_js_1.Container;
        this.grpDbgMasume = new pixi_js_1.Graphics;
        this.aSpan1to2 = [];
        this.goTxt2 = () => this.goTxt2_htm2tx();
        this.cntGoTxtSerializer = 0;
        this.aSpan = [];
        this.goTxt3 = (tx, padTx4x, padTx4y) => this.goTxt3_tx2sp(tx, padTx4x, padTx4y);
        this.spSkip = null;
        this.wasSkip = false;
        this.aRect = [];
        this.xz4htm2rect = 0;
        this.aSpTw = [];
        this.lh_half = 0;
        this.ch_anime_time_仮 = 500;
        this.fncFi = (sp) => { sp.x += this.infTL.fontsize / 3; };
        this.fi_easing = 'Quadratic.Out';
        this.fo = { alpha: 0, x: `+${this.infTL.fontsize / 3}` };
        this.fo_easing = 'Quadratic.Out';
        this.htmTxt.hidden = true;
        document.body.appendChild(this.htmTxt);
        cnt.addChild(this);
        cnt.addChild(this.cntTxt);
        cnt.addChild(this.grpDbgMasume);
        this.grpDbgMasume.name = 'grpDbgMasume';
    }
    static init(cfg, hTag, recText) {
        TxtStage.cfg = cfg;
        if (!cfg.existsBreakline)
            TxtStage.hNoReplaceDispObj['breakline'] = true;
        if (!cfg.existsBreakpage)
            TxtStage.hNoReplaceDispObj['breakpage'] = true;
        hTag['autowc'] = o => TxtStage.autowc(o);
        TxtStage.recText = recText;
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
            this.infTL.pad_left = parseFloat(this.htmTxt.style.paddingLeft || '0');
            this.infTL.pad_right = parseFloat(this.htmTxt.style.paddingRight || '0');
            this.infTL.pad_top = parseFloat(this.htmTxt.style.paddingTop || '0');
            this.infTL.pad_bottom = parseFloat(this.htmTxt.style.paddingBottom || '0');
            this.infTL.fontsize = parseFloat(this.htmTxt.style.fontSize || '0');
            this.infTL.$width = parseFloat(this.htmTxt.style.width || '0');
            this.infTL.$height = parseFloat(this.htmTxt.style.height || '0');
        }
        this.parent.position.set(this.infTL.pad_left, this.infTL.pad_top);
        const xSlide = TxtStage.cfg.oCfg.debug.slideBaseSpan
            ? document.documentElement.clientWidth - CmnLib_1.CmnLib.stageW
            : 0;
        this.htmTxt.style.position = 'absolute';
        this.htmTxt.style.left = xSlide + 'px';
        this.htmTxt.style.top = `0px`;
        this.htmTxt.style.zIndex = '-2';
        this.xz4htm2rect = xSlide
            + this.infTL.pad_left
            + ((this.htmTxt.style.writingMode == 'vertical-rl')
                ? this.infTL.pad_left + this.infTL.pad_right
                : 0);
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
        this.lh_half = (this.htmTxt.style.writingMode == 'vertical-rl')
            ? 0
            : (((this.htmTxt.style.lineHeight || '0').slice(-2) == 'px')
                ? parseFloat(this.htmTxt.style.lineHeight || '0')
                : parseFloat(this.htmTxt.style.fontSize || '0')
                    * parseFloat(this.htmTxt.style.lineHeight || '0')
                    - parseFloat(this.htmTxt.style.fontSize || '0')) / 2;
    }
    setSize(width, height) {
        this.infTL.$width = width;
        this.infTL.$height = height;
        this.htmTxt.style.width = this.infTL.$width + 'px';
        this.htmTxt.style.height = this.infTL.$height + 'px';
    }
    goTxt(aSpan) {
        if (aSpan.length == 0)
            return;
        this.aSpan1to2 = [...aSpan];
        if (++this.cntGoTxtSerializer == 1)
            this.goTxt2();
    }
    goTxt2_htm2tx() {
        this.aSpan = this.aSpan1to2;
        let sJoinSpan = this.aSpan.join('');
        TxtStage.recText(sJoinSpan);
        if (sJoinSpan.slice(-5) == '<br/>')
            sJoinSpan = sJoinSpan.slice(0, -5) + `<p style='margin: 0px;'>　</p>`;
        const tmp = sJoinSpan.split('<br/>')
            .map(v => `<p style='margin: 0px;'>${(v == '') ? '　' : v}</p>`)
            .join('');
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
        let padTx4x = 0;
        let padTx4y = 0;
        Promise.resolve(this.htmTxt)
            .then(node => {
            const cln = node.cloneNode(true);
            cln.style.padding = '0px';
            if (cln.style.writingMode == 'vertical-rl') {
                padTx4x = parseFloat(cln.style.fontSize || '0');
            }
            else {
                padTx4y = parseFloat(cln.style.fontSize || '0');
            }
            cln.style.paddingRight = padTx4x + 'px';
            cln.style.paddingTop = padTx4y + 'px';
            cln.style.left = '0px';
            cln.style.top = '0px';
            cln.style.width = (this.infTL.$width - this.infTL.pad_left - this.infTL.pad_right) + 'px';
            cln.style.height = (this.infTL.$height - this.infTL.pad_top - this.infTL.pad_bottom) + 'px';
            this.htmTxt.hidden = true;
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
                    this.goTxt3(tx2, padTx4x, padTx4y);
                    URL.revokeObjectURL(url);
                    if (--this.cntGoTxtSerializer <= 0) {
                        this.cntGoTxtSerializer = 0;
                        return;
                    }
                    this.skipFI();
                    this.goTxt2();
                });
            });
        })
            .catch(err => DebugMng_1.DebugMng.myTrace(`goTxt() = ${err}`));
    }
    goTxt3_tx2sp(tx, padTx4x, padTx4y) {
        if (this.spSkip)
            this.cntTxt.removeChild(this.spSkip);
        if (TxtStage.fncChkSkip()) {
            this.wasSkip = true;
            this.spSkip = new pixi_js_1.Sprite(tx);
            this.spSkip.x -= padTx4x;
            this.spSkip.y -= padTx4y;
            this.cntTxt.addChild(this.spSkip);
            return;
        }
        if (this.wasSkip) {
            this.wasSkip = false;
            return;
        }
        this.wasSkip = false;
        this.spSkip = null;
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
            if (TxtStage.cfg.oCfg.debug.masume) {
                if (TxtStage.cfg.oCfg.debug.devtool)
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
                fncDelay(TxtStage.hAutoWc[v.ch]);
            const o = v.arg ? JSON.parse(v.arg) : {};
            const delay_put = (i < lenPutedRect)
                || delay == 0 || this.ch_anime_time_仮 == 0;
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
                    if (o.pic in TxtStage.hNoReplaceDispObj)
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
                    tx_c.frame = new pixi_js_1.Rectangle(rct.x + padTx4x, rct.y + padTx4y, rct.width, rct.height);
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
    putBreakMark(delay = 0) {
        const cnt = TxtLayer_1.TxtLayer.cntBreak;
        console.log(`fn:TxtStage.ts line:1193 putBreakMark htmTxt:${this.htmTxt.textContent} cnt.parent:${cnt.parent} !cnt.visible:${!cnt.visible} TxtStage.cntLayName:${TxtStage.cntLayName} this.name:${this.name}`);
        if (cnt.parent && !cnt.visible && TxtStage.cntLayName == this.name) {
            cnt.visible = true;
            const fncDisp = () => {
                const rct = this.aRect.slice(-1)[0].rect;
                cnt.position.set(rct.x - this.xz4htm2rect, rct.y);
                console.log(`fn:TxtStage.ts line:778 cnt:%o`, cnt);
                if (this.htmTxt.style.writingMode == 'vertical-rl') {
                    cnt.y += this.infTL.fontsize;
                }
                else {
                    cnt.x += this.infTL.fontsize;
                }
            };
            if (delay == 0)
                return;
            const st = {
                sp: cnt,
                tw: new TWEEN.Tween(cnt)
                    .to({ alpha: 1 }, 0)
                    .delay(delay)
                    .onComplete(() => {
                    st.tw = null;
                    fncDisp();
                })
                    .start(),
            };
            this.aSpTw.push(st);
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
                throw `fn:TxtStage.ts pe null`;
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
    skipFI() {
        let isLiveTw = false;
        this.aSpTw.map(st => { if (st.tw) {
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
            const ease = this.fo_easing
                ? CmnTween_1.CmnTween.hEase[this.fo_easing]
                : TWEEN.Easing.Linear.None;
            if (!ease)
                throw '異常なease指定です';
            for (const c of this.cntTxt.children) {
                c.removeAllListeners();
                new TWEEN.Tween(c)
                    .to(this.fo, TxtStage.evtMng.isSkipKeyDown()
                    ? 100
                    : this.ch_anime_time_仮)
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
        to.name = this.name;
        to.ch_filter = this.ch_filter;
        to.lh_half = this.lh_half;
        to.fi_easing = this.fi_easing;
        to.fo = this.fo;
        to.fo_easing = this.fo_easing;
        to.ch_anime_time_仮 = this.ch_anime_time_仮;
        to.xz4htm2rect = this.xz4htm2rect;
        return to;
    }
    record() {
        return {
            infTL: this.infTL,
            cssText: this.htmTxt.style.cssText,
            ch_filter: this.ch_filter,
            lh_half: this.lh_half,
            fi_easing: this.fi_easing,
            fo: this.fo,
            fo_easing: this.fo_easing,
            ch_anime_time_仮: this.ch_anime_time_仮,
            xz4htm2rect: this.xz4htm2rect,
        };
    }
    ;
    playback(hLay) {
        this.infTL = hLay.infTL;
        this.parent.position.set(this.infTL.pad_left, this.infTL.pad_top);
        this.htmTxt.style.cssText = hLay.cssText;
        this.ch_filter = hLay.ch_filter;
        this.lh_half = hLay.lh_half;
        this.fncFi = (sp) => { sp.x += this.infTL.fontsize / 3; };
        this.fi_easing = hLay.fi_easing;
        this.fo = hLay.fo;
        this.fo_easing = hLay.fo_easing;
        this.ch_anime_time_仮 = hLay.ch_anime_time_仮;
        this.xz4htm2rect = hLay.xz4htm2rect;
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
        document.body.removeChild(this.htmTxt);
        this.parent.removeChild(this);
        this.parent.removeChild(this.cntTxt);
        this.parent.removeChild(this.grpDbgMasume);
        super.destroy();
        TxtStage.hNoReplaceDispObj = {};
    }
}
TxtStage.hNoReplaceDispObj = {};
TxtStage.cntLayName = '';
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
TxtStage.doAutoWc = false;
TxtStage.hAutoWc = {};
TxtStage.autowc = (hArg) => {
    TxtStage.doAutoWc = CmnLib_1.CmnLib.argChk_Boolean(hArg, 'enabled', TxtStage.doAutoWc);
    const ch = hArg.text;
    if (('text' in hArg) != ('time' in hArg))
        throw '[autowc] textとtimeは同時指定必須です';
    if (!hArg.text) {
        if (TxtStage.doAutoWc && ch == '')
            throw '[autowc] enabled == false かつ text == "" は許されません';
        return false;
    }
    const len = ch.length;
    if (TxtStage.doAutoWc && len == 0)
        throw '[autowc] enabled == false かつ text == "" は許されません';
    const a = String(hArg.time).split(',');
    if (a.length != len)
        throw '[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい';
    TxtStage.hAutoWc = {};
    for (let i = 0; i < len; ++i)
        TxtStage.hAutoWc[ch[i]] = CmnLib_1.uint(a[i]);
    return false;
};
exports.TxtStage = TxtStage;
//# sourceMappingURL=TxtStage.js.map