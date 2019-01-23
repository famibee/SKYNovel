"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CmnLib_1 = require("./CmnLib");
class Pages {
    constructor(layer, cls_, fore, hArgFore, back, hArgBack, sys, val) {
        this.cls_ = cls_;
        const fncF = sys.hFactoryCls[cls_];
        if (!fncF)
            throw `属性 class【${cls_}】が不正です`;
        this.pg = { fore: fncF(), back: fncF() };
        this.pg.fore.name = `layer:${layer} cls:${cls_} page:A`;
        this.pg.back.name = `layer:${layer} cls:${cls_} page:B`;
        fore.addChild(this.fore.cnt);
        back.addChild(this.back.cnt);
        CmnLib_1.CmnLib.argChk_Boolean(hArgFore, 'visible', true);
        CmnLib_1.CmnLib.argChk_Boolean(hArgBack, 'visible', true);
        this.fore.lay(hArgFore);
        this.back.lay(hArgBack);
        const valnm = `const.sn.lay.${layer}`;
        val.setVal_Nochk('tmp', valnm, true);
        val.defTmp(valnm + '.fore.alpha', () => this.pg.fore.alpha);
        val.defTmp(valnm + '.back.alpha', () => this.pg.back.alpha);
        val.defTmp(valnm + '.fore.height', () => this.pg.fore.height);
        val.defTmp(valnm + '.back.height', () => this.pg.back.height);
        val.defTmp(valnm + '.fore.visible', () => this.pg.fore.cnt.visible);
        val.defTmp(valnm + '.back.visible', () => this.pg.back.cnt.visible);
        val.defTmp(valnm + '.fore.width', () => this.pg.fore.width);
        val.defTmp(valnm + '.back.width', () => this.pg.back.width);
    }
    destroy() {
        this.pg.fore.destroy();
        this.pg.back.destroy();
    }
    lay(hArg) { return this.getPage(hArg).lay(hArg); }
    getPage(hArg) {
        return (Pages.argChk_page(hArg, 'fore') != 'back')
            ? this.pg.fore
            : this.pg.back;
    }
    static argChk_page(hash, def) {
        const v = hash.page || def;
        if (v == 'fore')
            return hash.page = v;
        if (v == 'back')
            return hash.page = v;
        throw Error('属性 page【' + v + '】が不正です');
    }
    get cls() { return this.cls_; }
    get fore() { return this.pg.fore; }
    get back() { return this.pg.back; }
    transPage() {
        [this.pg.back, this.pg.fore] = [this.pg.fore, this.pg.back];
        this.pg.back.copy(this.pg.fore);
    }
}
exports.Pages = Pages;
//# sourceMappingURL=Pages.js.map