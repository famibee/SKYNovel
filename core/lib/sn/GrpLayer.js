"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpLayer = void 0;
const Layer_1 = require("./Layer");
const CmnLib_1 = require("./CmnLib");
const Config_1 = require("./Config");
const pixi_js_1 = require("pixi.js");
const EventListenerCtn_1 = require("./EventListenerCtn");
;
;
;
let GrpLayer = (() => {
    class GrpLayer extends Layer_1.Layer {
        constructor() {
            super(...arguments);
            this.csvFn = '';
            this.sBkFn = '';
            this.sBkFace = '';
            this.record = () => Object.assign(super.record(), {
                sBkFn: this.sBkFn,
                sBkFace: this.sBkFace,
            });
            this.dump = () => super.dump() + `, "pic":"${this.csvFn}"`;
        }
        static init(main, cfg, sys) {
            GrpLayer.main = main;
            GrpLayer.cfg = cfg;
            GrpLayer.sys = sys;
            if (GrpLayer.sys.crypto)
                GrpLayer.preThen = GrpLayer.preThen4Cripto;
        }
        static setEvtMng(evtMng) { GrpLayer.evtMng = evtMng; }
        static destroy() {
            GrpLayer.elc.clear();
            GrpLayer.hFace = {};
            GrpLayer.hFn2ResAniSpr = {};
        }
        lay(hArg) {
            var _a;
            const fn = hArg.fn;
            const face = (_a = hArg.face) !== null && _a !== void 0 ? _a : '';
            if (!fn) {
                super.lay(hArg);
                if (this.cnt.children.length > 0)
                    this.setPos(hArg);
                this.sBkFn = '';
                this.csvFn = this.sBkFace = face;
                return false;
            }
            const inFn = 'fn' in hArg;
            const inFace = 'face' in hArg;
            this.clearLay({ filter: 'true' });
            if (inFn)
                this.sBkFn = fn;
            if (inFace)
                this.sBkFace = face;
            super.lay(hArg);
            hArg.dx = 0;
            hArg.dy = 0;
            return GrpLayer.csv2Sprites(this.csvFn = fn + (face ? ',' + face : ''), this.cnt, sp => {
                Layer_1.Layer.setXY(sp, hArg, this.cnt, true);
            }, isStop => {
                Layer_1.Layer.setBlendmode(this.cnt, hArg);
                GrpLayer.fncAllComp(isStop);
            });
        }
        static csv2Sprites(csv, parent, fncFirstComp, fncAllComp = () => { }) {
            const aComp = [];
            let needLoad = false;
            const ldr = new pixi_js_1.Loader();
            csv.split(',').forEach((fn, i) => {
                if (!fn)
                    throw 'face属性に空要素が含まれます';
                const f = GrpLayer.hFace[fn] || {
                    fn: fn,
                    dx: 0,
                    dy: 0,
                    blendmode: pixi_js_1.BLEND_MODES.NORMAL
                };
                const fnc = (i == 0) ? fncFirstComp : (sp) => {
                    sp.x = f.dx;
                    sp.y = f.dy;
                    sp.blendMode = f.blendmode;
                };
                aComp.push({ fn: f.fn, fnc: fnc });
                if (f.fn in GrpLayer.hFn2ResAniSpr)
                    return;
                if (f.fn in pixi_js_1.utils.TextureCache)
                    return;
                if (f.fn in pixi_js_1.Loader.shared.resources)
                    return;
                if (f.fn in GrpLayer.ldrHFn)
                    return;
                GrpLayer.ldrHFn[f.fn] = 0;
                needLoad = true;
                const path = GrpLayer.cfg.searchPath(f.fn, Config_1.Config.EXT_SPRITE);
                const xt = this.sys.crypto
                    ? { xhrType: (path.slice(-5) == '.json')
                            ? pixi_js_1.LoaderResource.XHR_RESPONSE_TYPE.TEXT
                            : pixi_js_1.LoaderResource.XHR_RESPONSE_TYPE.BUFFER }
                    : {};
                ldr.add(f.fn, path, xt);
            });
            const fncLoaded = (res) => {
                for (const v of aComp) {
                    const sp = GrpLayer.mkSprite(v.fn, res);
                    parent.addChild(sp);
                    v.fnc(sp);
                }
                fncAllComp(needLoad);
            };
            if (needLoad) {
                ldr.pre((res, next) => res.load(() => {
                    this.sys.pre(res.extension, res.data)
                        .then(r => GrpLayer.preThen(r, res, next))
                        .catch(e => this.main.errScript(`Graphic ロード失敗です fn:${res.name} ${e}`, false));
                }))
                    .load((_ldr, hRes) => fncLoaded(hRes));
            }
            else
                fncLoaded(pixi_js_1.utils.TextureCache);
            return needLoad;
        }
        static preThen4Cripto(r, res, next) {
            var _a;
            res.data = r;
            if (res.extension == 'bin') {
                if (res.data instanceof HTMLImageElement) {
                    res.type = pixi_js_1.LoaderResource.TYPE.IMAGE;
                    URL.revokeObjectURL(res.data.src);
                }
                else if (res.data instanceof HTMLVideoElement) {
                    res.type = pixi_js_1.LoaderResource.TYPE.VIDEO;
                    URL.revokeObjectURL(res.data.src);
                }
            }
            if (res.extension != 'json') {
                next();
                return;
            }
            const o = res.data = JSON.parse(r);
            res.type = pixi_js_1.LoaderResource.TYPE.JSON;
            if (!((_a = o.meta) === null || _a === void 0 ? void 0 : _a.image)) {
                next();
                return;
            }
            const fn = CmnLib_1.CmnLib.getFn(o.meta.image);
            const url = GrpLayer.cfg.searchPath(fn, Config_1.Config.EXT_SPRITE);
            (new pixi_js_1.Loader())
                .pre((res2, next2) => res2.load(() => {
                this.sys.pre(res2.extension, res2.data)
                    .then(r => {
                    res2.data = r;
                    if (res2.data instanceof HTMLImageElement) {
                        res2.type = pixi_js_1.LoaderResource.TYPE.IMAGE;
                        const mime = `image/${CmnLib_1.CmnLib.getExt(o.meta.image)}`;
                        o.meta.image = GrpLayer.im2Base64(res2.data, mime);
                        res2.data = o.meta.image;
                    }
                    next2();
                })
                    .catch(e => this.main.errScript(`Graphic ロード失敗です fn:${res2.name} ${e}`, false));
            }))
                .add(fn, url, { xhrType: pixi_js_1.LoaderResource.XHR_RESPONSE_TYPE.BUFFER })
                .load(() => next());
        }
        static im2Base64(img, mime) {
            const cvs = document.createElement('canvas');
            cvs.width = img.width;
            cvs.height = img.height;
            const ctx = cvs.getContext('2d');
            ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, 0, 0);
            return cvs.toDataURL(mime);
        }
        static mkSprite(fn, res) {
            var _a;
            if (fn in pixi_js_1.utils.TextureCache)
                return new pixi_js_1.Sprite(pixi_js_1.Texture.from(fn));
            const ras = GrpLayer.hFn2ResAniSpr[fn];
            if (ras) {
                const asp = new pixi_js_1.AnimatedSprite(ras.aTex);
                asp.animationSpeed = (_a = ras.meta.animationSpeed) !== null && _a !== void 0 ? _a : 1.0;
                asp.play();
                return asp;
            }
            const r = res[fn];
            if (!r)
                return new pixi_js_1.Sprite;
            switch (r.type) {
                case pixi_js_1.LoaderResource.TYPE.JSON:
                    const aFK = r.spritesheet._frameKeys;
                    const a_base_name = /([^\d]+)\d+\.(\w+)/.exec(aFK[0]);
                    if (a_base_name) {
                        const is = a_base_name[1].length;
                        const ie = -a_base_name[2].length - 1;
                        aFK.sort((a, b) => (CmnLib_1.int(a.slice(is, ie)) > CmnLib_1.int(b.slice(is, ie))) ? 1 : -1);
                    }
                    const aTex = [];
                    for (const v of aFK)
                        aTex.push(pixi_js_1.Texture.from(v));
                    GrpLayer.hFn2ResAniSpr[r.name] = { aTex: aTex, meta: r.data.meta };
                    return GrpLayer.mkSprite(fn, res);
                case pixi_js_1.LoaderResource.TYPE.VIDEO:
                    const hve = r.data;
                    GrpLayer.fn2Video[fn] = hve;
                    return new pixi_js_1.Sprite(pixi_js_1.Texture.from(r.data));
                default: return new pixi_js_1.Sprite(r.texture);
            }
        }
        static wv(hArg) {
            const fn = hArg.fn;
            if (!fn)
                throw 'fnは必須です';
            const hve = GrpLayer.fn2Video[fn];
            if (!hve)
                return false;
            if (hve.ended) {
                delete GrpLayer.fn2Video[fn];
                return false;
            }
            const fnc = () => {
                hve.removeEventListener('ended', fnc);
                delete GrpLayer.fn2Video[fn];
                this.main.resume();
            };
            hve.addEventListener('ended', fnc, { once: true, passive: true });
            GrpLayer.evtMng.stdWait(() => { hve.pause(); fnc(); }, CmnLib_1.CmnLib.argChk_Boolean(hArg, 'canskip', true));
            return true;
        }
        static ldPic(fn, fnc) {
            const url = GrpLayer.cfg.searchPath(fn, Config_1.Config.EXT_SPRITE);
            const tx = pixi_js_1.utils.TextureCache[url];
            if (tx) {
                fnc(tx);
                return;
            }
            const tx2 = pixi_js_1.Texture.from(url);
            GrpLayer.elc.add(tx2.baseTexture, 'loaded', () => fnc(tx2));
        }
        setPos(hArg) {
            Layer_1.Layer.setXY((this.cnt.children.length == 0) ? this.cnt : this.cnt.children[0], hArg, this.cnt, true);
        }
        static add_face(hArg) {
            var _a;
            const name = hArg.name;
            if (!name)
                throw 'nameは必須です';
            if (name in GrpLayer.hFace)
                throw '一つのname（' + name + '）に対して同じ画像を複数割り当てられません';
            const fn = (_a = hArg.fn) !== null && _a !== void 0 ? _a : name;
            GrpLayer.hFace[name] = {
                fn: fn,
                dx: CmnLib_1.CmnLib.argChk_Num(hArg, 'dx', 0) * CmnLib_1.CmnLib.retinaRate,
                dy: CmnLib_1.CmnLib.argChk_Num(hArg, 'dy', 0) * CmnLib_1.CmnLib.retinaRate,
                blendmode: Layer_1.Layer.getBlendmodeNum(hArg.blendmode || '')
            };
            return false;
        }
        static clearFace2Name() { GrpLayer.hFace = {}; }
        clearLay(hArg) {
            super.clearLay(hArg);
            for (const c of this.cnt.removeChildren())
                c.destroy();
            this.sBkFn = '';
            this.sBkFace = '';
            this.csvFn = '';
        }
        playback(hLay, fncComp = undefined) {
            super.playback(hLay);
            if (hLay.sBkFn == '' && hLay.sBkFace == '') {
                this.sBkFn = hLay.sBkFn;
                this.sBkFace = hLay.sBkFace;
                if (fncComp != undefined)
                    fncComp();
                return false;
            }
            if (fncComp != undefined)
                GrpLayer.fncAllComp = () => {
                    GrpLayer.fncAllComp = GrpLayer.fncDefAllComp;
                    fncComp();
                };
            return this.lay({ fn: hLay.sBkFn, face: hLay.sBkFace, left: hLay.x, top: hLay.y });
        }
    }
    GrpLayer.elc = new EventListenerCtn_1.EventListenerCtn;
    GrpLayer.hFace = {};
    GrpLayer.hFn2ResAniSpr = {};
    GrpLayer.fncDefAllComp = (isStop) => { if (isStop)
        GrpLayer.main.resume(); };
    GrpLayer.fncAllComp = GrpLayer.fncDefAllComp;
    GrpLayer.ldrHFn = {};
    GrpLayer.preThen = (_r, _res, next) => next();
    GrpLayer.fn2Video = {};
    return GrpLayer;
})();
exports.GrpLayer = GrpLayer;
//# sourceMappingURL=GrpLayer.js.map