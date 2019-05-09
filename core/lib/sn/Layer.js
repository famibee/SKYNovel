"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pixi_js_1 = require("pixi.js");
const CmnLib_1 = require("./CmnLib");
class Layer {
    constructor() {
        this.name = '';
        this.cnt = new pixi_js_1.Sprite(PIXI.Texture.EMPTY);
    }
    get alpha() { return this.cnt.alpha; }
    set alpha(v) { this.cnt.alpha = v; }
    get height() { return this.cnt.getBounds().height; }
    get rotation() { return this.cnt.rotation; }
    set rotation(v) { this.cnt.rotation = v; }
    get scale_x() { return this.cnt.scale.x; }
    set scale_x(v) { this.cnt.scale.x = v; }
    get scale_y() { return this.cnt.scale.y; }
    set scale_y(v) { this.cnt.scale.y = v; }
    get width() { return this.cnt.getBounds().width; }
    get x() { return this.cnt.x; }
    set x(v) { this.cnt.x = v; }
    get y() { return this.cnt.y; }
    set y(v) { this.cnt.y = v; }
    destroy() { }
    lay(hArg) {
        this.cnt.alpha = CmnLib_1.CmnLib.argChk_Num(hArg, 'alpha', this.cnt.alpha);
        this.cnt.pivot.set(CmnLib_1.CmnLib.argChk_Num(hArg, 'pivot_x', this.cnt.pivot.x), CmnLib_1.CmnLib.argChk_Num(hArg, 'pivot_y', this.cnt.pivot.y));
        this.cnt.rotation = CmnLib_1.CmnLib.argChk_Num(hArg, 'rotation', this.cnt.rotation);
        this.cnt.scale.set(CmnLib_1.CmnLib.argChk_Num(hArg, 'scale_x', this.cnt.scale.x), CmnLib_1.CmnLib.argChk_Num(hArg, 'scale_y', this.cnt.scale.y));
        this.cnt.visible = CmnLib_1.CmnLib.argChk_Boolean(hArg, 'visible', this.cnt.visible);
        return false;
    }
    clearLay(hArg) {
        this.cnt.alpha = 1;
        this.cnt.blendMode = pixi_js_1.BLEND_MODES.NORMAL;
        this.cnt.pivot.set(0, 0);
        this.cnt.rotation = 0;
        this.cnt.scale.set(1, 1);
        if (CmnLib_1.CmnLib.argChk_Boolean(hArg, 'filter', false))
            this.cnt.filters = [];
    }
    copy(fromLayer) {
        const org_name = this.name;
        this.playback(fromLayer.record());
        this.name = org_name;
    }
    record() {
        return {
            name: this.name,
            idx: this.cnt.parent.getChildIndex(this.cnt),
            alpha: this.cnt.alpha,
            blendMode: this.cnt.blendMode,
            rotation: this.cnt.rotation,
            scale_x: this.cnt.scale.x,
            scale_y: this.cnt.scale.y,
            pivot_x: this.cnt.pivot.x,
            pivot_y: this.cnt.pivot.y,
            x: this.cnt.x,
            y: this.cnt.y,
            visible: this.cnt.visible,
        };
    }
    playback(hLay, _fncComp = undefined) {
        this.name = hLay.name;
        this.clearLay({ filter: 'true' });
        this.cnt.alpha = hLay.alpha;
        this.cnt.blendMode = hLay.blendMode;
        this.cnt.rotation = hLay.rotation;
        this.cnt.scale.set(hLay.scale_x, hLay.scale_y);
        this.cnt.pivot.set(hLay.pivot_x, hLay.pivot_y);
        this.cnt.position.set(hLay.x, hLay.y);
        this.cnt.visible = hLay.visible;
        return false;
    }
    dump() {
        return ` "idx":${this.cnt.parent.getChildIndex(this.cnt)}, "visible":"${this.cnt.visible}", "left":${this.cnt.x}, "top":${this.cnt.y}, "alpha":${this.cnt.alpha}, "rotation":${this.cnt.rotation}, "name":"${this.name}", "scale_x":${this.cnt.scale.x}, "scale_y":${this.cnt.scale.y}`;
    }
    static argChk_BlendmodeAndSet(hash, $do) {
        const v = hash['blendmode'];
        if (!v)
            return;
        if (!($do instanceof pixi_js_1.Sprite))
            return;
        const sp = $do;
        if (!(v in Layer.hBlendmode))
            throw 'blendmode=' + v + ' は異常な値です';
        if (!Layer.hBlendmode[v])
            throw '（' + name + '）はサポートされない blendmode です';
        sp.blendMode = v;
    }
    static cnvBlendmode(name) {
        if (!name)
            return pixi_js_1.BLEND_MODES.NORMAL;
        const bm = Layer.hBlendmode[name];
        if (bm)
            return bm;
        throw '（' + name + '）はサポートされない blendmode です';
    }
    static setXY(base, hArg, ret, isGrp = false, isButton = false) {
        if (hArg.pos) {
            Layer.setXYByPos(base, hArg.pos, ret);
            return;
        }
        const rct_base = base.getBounds();
        const r_absclX = (ret.scale.x < 0) ? -ret.scale.x : ret.scale.x;
        const b_width = (r_absclX == 1)
            ? rct_base.width : rct_base.width * r_absclX;
        const r_absclY = (ret.scale.y < 0) ? -ret.scale.y : ret.scale.y;
        const b_height = (r_absclY == 1)
            ? rct_base.height : rct_base.height * r_absclY;
        let x = ret.x;
        if ('left' in hArg) {
            x = CmnLib_1.CmnLib.argChk_Num(hArg, 'left', 0);
            if ((x > -1) && (x < 1))
                x *= CmnLib_1.CmnLib.stageW;
        }
        else if ('center' in hArg) {
            x = CmnLib_1.CmnLib.argChk_Num(hArg, 'center', 0);
            if ((x > -1) && (x < 1))
                x *= CmnLib_1.CmnLib.stageW;
            x = x - (isButton ? b_width / 3 : b_width) / 2;
        }
        else if ('right' in hArg) {
            x = CmnLib_1.CmnLib.argChk_Num(hArg, 'right', 0);
            if ((x > -1) && (x < 1))
                x *= CmnLib_1.CmnLib.stageW;
            x = x - (isButton ? b_width / 3 : b_width);
        }
        else if ('s_right' in hArg) {
            x = CmnLib_1.CmnLib.argChk_Num(hArg, 's_right', 0);
            if ((x > -1) && (x < 1))
                x *= CmnLib_1.CmnLib.stageW;
            x = CmnLib_1.CmnLib.stageW - x
                - (isButton ? b_width / 3 : b_width);
        }
        ret.x = CmnLib_1.int(((ret.scale.x < 0)
            ? x + (isButton ? b_width / 3 : b_width)
            : x) * CmnLib_1.CmnLib.retinaRate);
        let y = ret.y;
        if ('top' in hArg) {
            y = CmnLib_1.CmnLib.argChk_Num(hArg, 'top', 0);
            if ((y > -1) && (y < 1))
                y *= CmnLib_1.CmnLib.stageH;
        }
        else if ('middle' in hArg) {
            y = CmnLib_1.CmnLib.argChk_Num(hArg, 'middle', 0);
            if ((y > -1) && (y < 1))
                y *= CmnLib_1.CmnLib.stageH;
            y = y - b_height / 2;
        }
        else if ('bottom' in hArg) {
            y = CmnLib_1.CmnLib.argChk_Num(hArg, 'bottom', 0);
            if ((y > -1) && (y < 1))
                y *= CmnLib_1.CmnLib.stageH;
            y = y - b_height;
        }
        else if ('s_bottom' in hArg) {
            y = CmnLib_1.CmnLib.argChk_Num(hArg, 's_bottom', 0);
            if ((y > -1) && (y < 1))
                y *= CmnLib_1.CmnLib.stageH;
            y = CmnLib_1.CmnLib.stageH - y - b_height;
        }
        ret.y = CmnLib_1.int(((ret.scale.y < 0) ? y + b_height : y)
            * CmnLib_1.CmnLib.retinaRate);
        if (isGrp) {
            if (!('left' in hArg)
                && !('center' in hArg)
                && !('right' in hArg)
                && !('s_right' in hArg)
                && !('top' in hArg)
                && !('middle' in hArg)
                && !('bottom' in hArg)
                && !('s_bottom' in hArg)) {
                Layer.setXYByPos(base, 'c', ret);
            }
        }
    }
    static setXYByPos(base, pos, ret) {
        if (pos == 'stay')
            return;
        if (base == null)
            throw 'setXYByPos base == null';
        if (ret == null)
            throw 'setXYByPos result == null';
        const rct_base = base.getBounds();
        const r_absclX = (ret.scale.x < 0) ? -ret.scale.x : ret.scale.x;
        const b_width = (r_absclX == 1) ? rct_base.width : rct_base.width * r_absclX;
        const r_absclY = (ret.scale.y < 0) ? -ret.scale.y : ret.scale.y;
        const b_height = (r_absclY == 1) ? rct_base.height : rct_base.height * r_absclY;
        let c = 0;
        if (!pos || pos == 'c') {
            c = CmnLib_1.CmnLib.stageW * 0.5;
        }
        else if (pos == 'r') {
            c = CmnLib_1.CmnLib.stageW - b_width * 0.5;
        }
        else if (pos == 'l') {
            c = b_width * 0.5;
        }
        else {
            c = CmnLib_1.int(pos) * CmnLib_1.CmnLib.retinaRate;
        }
        ret.x = CmnLib_1.int(c - b_width * 0.5);
        ret.y = CmnLib_1.CmnLib.stageH - b_height;
        if (ret.scale.x < 0)
            ret.x += b_width;
        if (ret.scale.y < 0)
            ret.y += b_height;
    }
    static setXYCenter(dsp) {
        const rct = dsp.getBounds();
        dsp.x = (CmnLib_1.CmnLib.stageW - rct.width) * 0.5;
        dsp.y = (CmnLib_1.CmnLib.stageH - rct.height) * 0.5;
    }
}
Layer.hBlendmode = {
    'normal': pixi_js_1.BLEND_MODES.NORMAL,
    'add': pixi_js_1.BLEND_MODES.ADD,
    'multiply': pixi_js_1.BLEND_MODES.MULTIPLY,
    'screen': pixi_js_1.BLEND_MODES.SCREEN,
    'overlay': pixi_js_1.BLEND_MODES.OVERLAY,
    'darken': pixi_js_1.BLEND_MODES.DARKEN,
    'lighten': pixi_js_1.BLEND_MODES.LIGHTEN,
    'color_dodge': pixi_js_1.BLEND_MODES.COLOR_DODGE,
    'color_burn': pixi_js_1.BLEND_MODES.COLOR_BURN,
    'hard_light': pixi_js_1.BLEND_MODES.HARD_LIGHT,
    'soft_light': pixi_js_1.BLEND_MODES.SOFT_LIGHT,
    'difference': pixi_js_1.BLEND_MODES.DIFFERENCE,
    'exclusion': pixi_js_1.BLEND_MODES.EXCLUSION,
    'hue': pixi_js_1.BLEND_MODES.HUE,
    'saturation': pixi_js_1.BLEND_MODES.SATURATION,
    'color': pixi_js_1.BLEND_MODES.COLOR,
    'luminosity': pixi_js_1.BLEND_MODES.LUMINOSITY,
};
exports.Layer = Layer;
//# sourceMappingURL=Layer.js.map