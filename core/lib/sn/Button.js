"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pixi_js_1 = require("pixi.js");
const CmnLib_1 = require("./CmnLib");
const GrpLayer_1 = require("./GrpLayer");
class Button extends pixi_js_1.Container {
    constructor(main, evtMng, hArg) {
        var _a;
        super();
        this.main = main;
        this.evtMng = evtMng;
        this.isStop = false;
        const enabled = CmnLib_1.CmnLib.argChk_Boolean(hArg, 'enabled', true);
        if (enabled)
            this.evtMng.button(hArg, this);
        if ('text' in hArg) {
            const fontSize = CmnLib_1.uint(hArg.height || 30);
            const style = {
                fill: 'black',
                align: 'center',
                fontFamily: Button.fontFamily,
                fontSize: fontSize,
                padding: 5,
                dropShadow: true,
                dropShadowAlpha: 0.7,
                dropShadowColor: '#ffffff',
                dropShadowBlur: 7,
                dropShadowDistance: 0,
            };
            if (hArg.style)
                Button.s2hStyle(style, hArg.style);
            const txt = new pixi_js_1.Text((_a = hArg.text) !== null && _a !== void 0 ? _a : '', style);
            txt.alpha = CmnLib_1.CmnLib.argChk_Num(hArg, 'alpha', txt.alpha);
            txt.pivot.set(CmnLib_1.CmnLib.argChk_Num(hArg, 'pivot_x', txt.pivot.x), CmnLib_1.CmnLib.argChk_Num(hArg, 'pivot_y', txt.pivot.y));
            txt.rotation = CmnLib_1.CmnLib.argChk_Num(hArg, 'rotation', txt.rotation);
            txt.scale.set(CmnLib_1.CmnLib.argChk_Num(hArg, 'scale_x', txt.scale.x), CmnLib_1.CmnLib.argChk_Num(hArg, 'scale_y', txt.scale.y));
            txt.width = CmnLib_1.uint(hArg.width || 100);
            txt.height = fontSize;
            txt.x = CmnLib_1.uint(hArg.left || 0);
            txt.y = CmnLib_1.uint(hArg.top || 0);
            if (hArg.b_pic) {
                const cnt = new pixi_js_1.Container();
                this.addChild(cnt);
                this.isStop = GrpLayer_1.GrpLayer.csv2Sprites(hArg.b_pic, cnt, sp => {
                    sp.alpha = txt.alpha;
                    sp.rotation = txt.rotation;
                    sp.x = txt.x;
                    sp.y = txt.y;
                    sp.pivot.set((sp.width - txt.width) / 2, (sp.height - txt.height) / 2);
                }, isStop => { if (isStop)
                    this.main.resume(); });
            }
            this.addChild(txt);
            if (!enabled)
                return;
            const normal = () => Object.assign(txt.style, style);
            const style_hover = { ...style };
            if (hArg.style_hover)
                Button.s2hStyle(style_hover, hArg.style_hover);
            else
                style_hover.fill = 'white';
            const hover = () => Object.assign(txt.style, style_hover);
            const style_clicked = { ...style_hover };
            if (hArg.style_clicked)
                Button.s2hStyle(style_clicked, hArg.style_clicked);
            else
                style_clicked.dropShadow = false;
            const clicked = () => Object.assign(txt.style, style_clicked);
            this.on('pointerover', hover);
            this.on('pointerout', normal);
            this.on('pointerdown', clicked);
            this.on('pointerup', CmnLib_1.CmnLib.isMobile ? normal : hover);
            return;
        }
        if (!hArg.pic)
            throw 'textまたはpic属性は必須です';
        this.isStop = GrpLayer_1.GrpLayer.csv2Sprites(hArg.pic, this, sp => {
            sp.alpha = CmnLib_1.CmnLib.argChk_Num(hArg, 'alpha', sp.alpha);
            sp.pivot.set(CmnLib_1.CmnLib.argChk_Num(hArg, 'pivot_x', sp.pivot.x), CmnLib_1.CmnLib.argChk_Num(hArg, 'pivot_y', sp.pivot.y));
            sp.rotation = CmnLib_1.CmnLib.argChk_Num(hArg, 'rotation', sp.rotation);
            sp.scale.set(CmnLib_1.CmnLib.argChk_Num(hArg, 'scale_x', sp.scale.x), CmnLib_1.CmnLib.argChk_Num(hArg, 'scale_y', sp.scale.y));
            sp.x = CmnLib_1.uint(hArg.left || 0);
            sp.y = CmnLib_1.uint(hArg.top || 0);
            const w3 = sp.width / 3;
            const h = sp.height;
            const tx = sp.texture.baseTexture;
            const txNormal = new pixi_js_1.Texture(tx, new pixi_js_1.Rectangle(0, 0, w3, h));
            const txClicked = new pixi_js_1.Texture(tx, new pixi_js_1.Rectangle(w3, 0, w3, h));
            const txHover = new pixi_js_1.Texture(tx, new pixi_js_1.Rectangle(w3 * 2, 0, w3, h));
            const normal = () => sp.texture = txNormal;
            const hover = () => sp.texture = txHover;
            const clicked = () => sp.texture = txClicked;
            this.on('pointerover', hover);
            this.on('pointerout', normal);
            this.on('pointerdown', clicked);
            this.on('pointerup', CmnLib_1.CmnLib.isMobile ? normal : hover);
            normal();
        }, isStop => { if (isStop)
            this.main.resume(); });
    }
    static s2hStyle(hStyle, style) {
        Button.cln = document.createElement('span');
        const s = Button.cln.style;
        s.cssText = style;
        const len = s.length;
        for (let i = 0; i < len; ++i) {
            const nm = s[i];
            hStyle[nm] = s[nm];
        }
    }
}
exports.Button = Button;
Button.fontFamily = "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif";
//# sourceMappingURL=Button.js.map