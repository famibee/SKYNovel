"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Layer_1 = require("./Layer");
const CmnLib_1 = require("./CmnLib");
const Config_1 = require("./Config");
const pixi_js_1 = require("pixi.js");
const EventListenerCtn_1 = require("./EventListenerCtn");
;
;
;
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
    }
    static init(main, cfg) {
        GrpLayer.main = main;
        GrpLayer.cfg = cfg;
    }
    static destroy() {
        GrpLayer.elc.clear();
        GrpLayer.hFace = {};
        GrpLayer.hFn2ResAniSpr = {};
    }
    lay(hArg) {
        const fn = hArg.fn;
        const face = hArg.face || '';
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
        }, GrpLayer.fncAllComp);
    }
    static csv2Sprites(csv, parent, fncFirstComp, fncAllComp = () => { }) {
        const aComp = [];
        let needLoad = false;
        const ldr = new pixi_js_1.Loader();
        csv.split(',').map((fn, i) => {
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
            needLoad = true;
            ldr.add(f.fn, GrpLayer.cfg.searchPath(f.fn, Config_1.Config.EXT_SPRITE));
        });
        const fncLoaded = (res) => {
            for (const v of aComp) {
                const sp = GrpLayer.mkSprite(v.fn, res);
                parent.addChild(sp);
                v.fnc(sp);
            }
            fncAllComp(needLoad);
        };
        if (needLoad)
            ldr.load((_loader, res) => fncLoaded(res));
        else
            fncLoaded(pixi_js_1.utils.TextureCache);
        return needLoad;
    }
    static mkSprite(fn, res) {
        if (fn in pixi_js_1.utils.TextureCache)
            return new pixi_js_1.Sprite(pixi_js_1.Texture.from(fn));
        if (fn in GrpLayer.hFn2ResAniSpr) {
            const ras = GrpLayer.hFn2ResAniSpr[fn];
            const asp = new pixi_js_1.AnimatedSprite(ras.aTex);
            asp.animationSpeed = ras.meta['animationSpeed'] || 1.0;
            asp.play();
            return asp;
        }
        const r = res[fn];
        if (!r)
            return new pixi_js_1.Sprite;
        switch (r.type) {
            case 1:
                const aFK = r.spritesheet._frameKeys;
                const a_base_name = /([^\d]+)\d+\.(\w+)/.exec(aFK[0]);
                if (a_base_name) {
                    const is = a_base_name[1].length;
                    const ie = -a_base_name[2].length - 1;
                    aFK.sort((a, b) => {
                        return (CmnLib_1.int(a.slice(is, ie)) > CmnLib_1.int(b.slice(is, ie)))
                            ? 1 : -1;
                    });
                }
                const aTex = [];
                for (const v of aFK)
                    aTex.push(pixi_js_1.Texture.from(v));
                GrpLayer.hFn2ResAniSpr[r.name] = { aTex: aTex, meta: r.data.meta };
                return GrpLayer.mkSprite(fn, res);
            case 5:
                return new pixi_js_1.Sprite(pixi_js_1.Texture.from(r.data));
            default:
                return new pixi_js_1.Sprite(r.texture);
        }
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
        const name = hArg.name;
        if (!name)
            throw 'nameは必須です';
        if (name in GrpLayer.hFace)
            throw '一つのname（' + name + '）に対して同じ画像を複数割り当てられません';
        const fn = hArg.fn || name;
        GrpLayer.hFace[name] = {
            fn: fn,
            dx: CmnLib_1.CmnLib.argChk_Num(hArg, 'dx', 0) * CmnLib_1.CmnLib.retinaRate,
            dy: CmnLib_1.CmnLib.argChk_Num(hArg, 'dy', 0) * CmnLib_1.CmnLib.retinaRate,
            blendmode: Layer_1.Layer.cnvBlendmode(hArg.blendmode || '')
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
    dump() { return super.dump() + `, "pic":"${this.csvFn}"`; }
    ;
}
GrpLayer.elc = new EventListenerCtn_1.EventListenerCtn;
GrpLayer.hFace = {};
GrpLayer.hFn2ResAniSpr = {};
GrpLayer.fncDefAllComp = (isStop) => { if (isStop)
    GrpLayer.main.resume(); };
GrpLayer.fncAllComp = GrpLayer.fncDefAllComp;
exports.GrpLayer = GrpLayer;
//# sourceMappingURL=GrpLayer.js.map