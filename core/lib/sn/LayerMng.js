"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CmnLib_1 = require("./CmnLib");
const CmnTween_1 = require("./CmnTween");
const Pages_1 = require("./Pages");
const GrpLayer_1 = require("./GrpLayer");
const TxtLayer_1 = require("./TxtLayer");
const FrameMng_1 = require("./FrameMng");
const TWEEN = require("@tweenjs/tween.js");
const pixi_js_1 = require("pixi.js");
const EventListenerCtn_1 = require("./EventListenerCtn");
class LayerMng {
    constructor(cfg, hTag, appPixi, val, main, scrItr, sys) {
        this.cfg = cfg;
        this.hTag = hTag;
        this.appPixi = appPixi;
        this.val = val;
        this.main = main;
        this.scrItr = scrItr;
        this.sys = sys;
        this.fore = new pixi_js_1.Container;
        this.back = new pixi_js_1.Container;
        this.fncTicker = () => TWEEN.update();
        this.grpCover = null;
        this.cmdTxt = (cmd, tl = this.getCurrentTxtlayForeNeedErr(), _record = true) => tl.tagCh('｜　《' + cmd + '》');
        this.goTxt = () => { };
        this.breakLine = () => { };
        this.breakPage = () => { };
        this.hPages = {};
        this.aLayName = [];
        this.strTxtlay = '';
        this.srcRuleTransFragment = `
precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform sampler2D rule;
uniform float vague;
uniform float tick;

void main(void) {
	vec4 fg = texture2D(uSampler, vTextureCoord);
	vec4 ru = texture2D(rule, vTextureCoord);

	float v = ru.r - tick;
	if (abs(v) < vague) {
		float grd = 0.5 -v /vague *0.5;
		float f_a = fg.a *(1.0 -grd);

		gl_FragColor.rgb = fg.rgb *f_a;
		gl_FragColor.a = f_a;
	}
	else {
		gl_FragColor = (v >= 0.0)? fg : vec4(0);
	}
}`;
        this.ufRuleTrans = {
            rule: { type: 'sampler2D', value: pixi_js_1.Texture.EMPTY },
            vague: { type: '1f', value: 0.0 },
            tick: { type: '1f', value: 0.0 },
        };
        this.fltRule = new pixi_js_1.Filter(undefined, this.srcRuleTransFragment, this.ufRuleTrans);
        this.rtTransBack = pixi_js_1.RenderTexture.create(CmnLib_1.CmnLib.stageW, CmnLib_1.CmnLib.stageH);
        this.spTransBack = new pixi_js_1.Sprite(this.rtTransBack);
        this.rtTransFore = pixi_js_1.RenderTexture.create(CmnLib_1.CmnLib.stageW, CmnLib_1.CmnLib.stageH);
        this.spTransFore = new pixi_js_1.Sprite(this.rtTransFore);
        this.aBackTransAfter = [];
        this.twInfTrans = { tw: null, resume: false };
        this.elcTrans = new EventListenerCtn_1.EventListenerCtn;
        this.hMemberCnt = {
            alpha: 0,
            height: 0,
            rotation: 0,
            scale_x: 0,
            scale_y: 0,
            width: 0,
            x: 0,
            y: 0,
        };
        this.hTwInf = {};
        this.fncChkTxtLay = () => { throw '文字レイヤーがありません。文字表示や操作する前に、[add_lay layer=（レイヤ名） class=txt]で文字レイヤを追加して下さい'; };
        TxtLayer_1.TxtLayer.init(cfg, hTag, val, (txt) => this.recText(txt));
        GrpLayer_1.GrpLayer.init(main, cfg);
        this.frmMng = new FrameMng_1.FrameMng(this.hTag, this.appPixi, this.val, main, this.sys, this.hTwInf);
        sys.hFactoryCls['grp'] = () => new GrpLayer_1.GrpLayer;
        sys.hFactoryCls['txt'] = () => new TxtLayer_1.TxtLayer;
        hTag.snapshot = o => this.snapshot(o);
        hTag.loadplugin = o => this.loadplugin(o);
        hTag.set_focus = o => this.set_focus(o);
        hTag.add_lay = o => this.add_lay(o);
        hTag.lay = o => this.lay(o);
        hTag.clear_lay = o => this.clear_lay(o);
        hTag.trans = o => this.trans(o);
        hTag.wt = o => this.wt(o);
        hTag.finish_trans = () => this.finish_trans();
        hTag.quake = o => this.quake(o);
        hTag.wq = o => hTag.wt(o);
        hTag.stop_quake = o => hTag.finish_trans(o);
        hTag.tsy = o => this.tsy(o);
        hTag.wait_tsy = o => this.wait_tsy(o);
        hTag.stop_tsy = o => this.stop_tsy(o);
        hTag.pause_tsy = o => this.pause_tsy(o);
        hTag.resume_tsy = o => this.resume_tsy(o);
        hTag.ch = o => this.ch(o);
        hTag.clear_text = o => this.clear_text(o);
        hTag.current = o => this.current(o);
        hTag.endlink = () => this.endlink();
        hTag.er = o => this.er(o);
        hTag.graph = o => this.graph(o);
        hTag.link = o => this.link(o);
        hTag.r = o => this.r(o);
        hTag.rec_r = () => this.rec_r();
        hTag.rec_ch = o => this.rec_ch(o);
        hTag.reset_rec = o => this.reset_rec(o);
        hTag.ruby2 = o => this.ruby2(o);
        hTag.span = o => this.span(o);
        hTag.tcy = o => this.tcy(o);
        hTag.add_face = o => GrpLayer_1.GrpLayer.add_face(o);
        hTag.dump_lay = o => this.dump_lay(o);
        hTag.enable_event = o => this.enable_event(o);
        hTag.button = o => this.button(o);
        if (cfg.existsBreakline)
            this.breakLine = () => this.cmdTxt('grp｜{"id":"break","pic":"breakline"}');
        if (cfg.existsBreakpage)
            this.breakPage = () => this.cmdTxt('grp｜{"id":"break","pic":"breakpage"}');
        const grp = new pixi_js_1.Graphics;
        grp.beginFill(cfg.oCfg.init.bg_color, 1);
        grp.lineStyle(0, cfg.oCfg.init.bg_color);
        grp.drawRect(0, 0, CmnLib_1.CmnLib.stageW, CmnLib_1.CmnLib.stageH);
        grp.endFill();
        this.fore.addChild(grp.clone());
        this.back.addChild(grp);
        this.back.visible = false;
        this.stage = this.appPixi.stage;
        this.stage.addChild(this.back);
        this.stage.addChild(this.fore);
        this.stage.addChild(this.spTransBack);
        this.stage.addChild(this.spTransFore);
        this.appPixi.ticker.add(this.fncTicker);
        const fncTxt_b_alpha = (_name, val) => {
            this.foreachRedrawTxtLayBack(Number(val));
        };
        fncTxt_b_alpha('', val.getVal('sys:TextLayer.Back.Alpha', 1));
        val.defValTrg('sys:TextLayer.Back.Alpha', fncTxt_b_alpha);
        val.defTmp('const.sn.sLog', () => {
            return JSON.stringify((String(this.val.getVal('save:const.sn.sLog') + '\f' +
                String(this.val.getVal('tmp:const.sn.last_page_text')))
                .replace(/^\f/g, '')
                .split('\f')
                .map(v => { return { txt: v }; })));
        });
    }
    cover(visible, bg_color = 0x0) {
        if (this.grpCover) {
            this.stage.removeChild(this.grpCover);
            this.grpCover.destroy();
            this.grpCover = null;
        }
        if (visible) {
            this.grpCover = new pixi_js_1.Graphics;
            this.grpCover.beginFill(bg_color);
            this.grpCover.lineStyle(0, bg_color);
            this.grpCover.drawRect(0, 0, CmnLib_1.CmnLib.stageW, CmnLib_1.CmnLib.stageH);
            this.grpCover.endFill();
            this.stage.addChild(this.grpCover);
        }
    }
    setEvtMng(evtMng) { this.evtMng = evtMng; this.frmMng.setEvtMng(evtMng); }
    destroy() {
        GrpLayer_1.GrpLayer.destroy();
        TxtLayer_1.TxtLayer.destroy();
        TWEEN.removeAll();
        this.appPixi.ticker.remove(this.fncTicker);
        LayerMng.$msecChWait = 10;
        for (const pg in this.hPages)
            this.hPages[pg].destroy();
    }
    foreachRedrawTxtLayBack(g_alpha) {
        const vct = this.getLayers();
        const len = vct.length;
        for (let i = 0; i < len; ++i) {
            const name = vct[i];
            const pg = this.hPages[name];
            if (!(pg.fore instanceof TxtLayer_1.TxtLayer))
                continue;
            const pTxt = pg.fore;
            pTxt.reloadLayBack(g_alpha);
            pg.back.reloadLayBack(g_alpha);
        }
    }
    clearBreak() {
        if (!this.getCurrentTxtlayFore())
            return;
        this.clearBreak = () => this.cmdTxt('del｜break');
        this.clearBreak();
    }
    clickTxtLay() {
        const tl = this.getCurrentTxtlayFore();
        if (!tl)
            return true;
        return tl.click();
    }
    snapshot(hArg) {
        const fn = hArg.fn || 'desktop:/snapshot' + CmnLib_1.getDateStr('-', '_', '', '_') + '.jpg';
        const ext = CmnLib_1.CmnLib.getExt(fn);
        const b_color = hArg.b_color || this.cfg.oCfg.init.bg_color;
        const renderer = pixi_js_1.autoDetectRenderer(CmnLib_1.CmnLib.argChk_Num(hArg, 'width', CmnLib_1.CmnLib.stageW), CmnLib_1.CmnLib.argChk_Num(hArg, 'height', CmnLib_1.CmnLib.stageH), {
            transparent: (b_color > 0x1000000) && (ext == 'png'),
            antialias: CmnLib_1.CmnLib.argChk_Boolean(hArg, 'smoothing', false),
            preserveDrawingBuffer: true,
            backgroundColor: CmnLib_1.uint(b_color) & 0xFFFFFF,
        });
        if (this.twInfTrans.tw != null) {
            this.back.visible = true;
            for (const lay of this.aBackTransAfter) {
                renderer.render(lay, undefined, false);
            }
            this.back.visible = false;
            this.spTransBack.visible = true;
            this.fore.filters = this.spTransFore.filters;
            this.fore.visible = true;
            renderer.render(this.fore, undefined, false);
            this.fore.visible = false;
            this.fore.filters = [];
        }
        else
            for (const v of this.getLayers(hArg.layer))
                renderer.render(this.hPages[v][(hArg.page != 'back') ? 'fore' : 'back'].cnt, undefined, false);
        this.sys.savePic(this.cfg.searchPath(fn), renderer.view.toDataURL('image/' + (ext == 'png' ? 'png' : 'jpeg')));
        renderer.destroy(true);
        return false;
    }
    loadplugin(hArg) {
        const fn = hArg.fn;
        if (!fn)
            throw 'fnは必須です';
        const join = CmnLib_1.CmnLib.argChk_Boolean(hArg, 'join', true);
        switch (CmnLib_1.CmnLib.getExt(fn)) {
            case 'css':
                (async () => {
                    const res = await fetch(fn);
                    if (!res.ok)
                        throw new Error('Network response was not ok.');
                    TxtLayer_1.TxtLayer.addStyle(await res.text());
                    if (join)
                        this.main.resume();
                })();
                break;
            default: throw 'サポートされない拡張子です';
        }
        return join;
    }
    set_focus(hArg) {
        const to = hArg.to;
        if (!to)
            throw '[set_focus] toは必須です';
        return false;
    }
    add_lay(hArg) {
        const layer = hArg.layer;
        if (!layer)
            throw 'layerは必須です';
        if (layer.includes(','))
            throw 'layer名に「,」は使えません';
        if (layer in this.hPages)
            throw `layer【${layer}】はすでにあります`;
        const cls = hArg.class;
        if (!cls)
            throw 'clsは必須です';
        this.hPages[layer] = new Pages_1.Pages(layer, cls, this.fore, hArg, this.back, hArg, this.sys, this.val);
        switch (cls) {
            case 'txt':
                if (!this.strTxtlay) {
                    this.fncChkTxtLay = () => { };
                    this.hTag.current({ layer: layer });
                    this.goTxt = () => {
                        if (this.val.getVal('sn.skip.enabled')) {
                            LayerMng.$msecChWait = 0;
                        }
                        else {
                            this.setNormalWaitTxtLayer();
                        }
                        for (const name of this.getLayers()) {
                            const pg = this.hPages[name];
                            if (!(pg.fore instanceof TxtLayer_1.TxtLayer))
                                continue;
                            this.cmdTxt('gotxt｜', pg.fore, false);
                        }
                    };
                }
                this.val.setVal_Nochk('save', 'const.sn.layer.' + (layer || this.strTxtlay) + '.enabled', true);
                break;
        }
        this.aLayName.push(layer);
        return false;
    }
    lay(hArg) {
        const layer = this.argChk_layer(hArg);
        const pg = this.hPages[layer];
        const back = pg.back.cnt;
        const fore = pg.fore.cnt;
        if (CmnLib_1.CmnLib.argChk_Boolean(hArg, 'float', false)) {
            this.back.setChildIndex(back, this.back.children.length - 1);
            this.fore.setChildIndex(fore, this.fore.children.length - 1);
            this.rebuildLayerRankInfo();
        }
        else if (hArg.index) {
            if (CmnLib_1.CmnLib.argChk_Num(hArg, 'index', 0)) {
                this.back.setChildIndex(back, CmnLib_1.uint(hArg.index));
                this.fore.setChildIndex(fore, CmnLib_1.uint(hArg.index));
                this.rebuildLayerRankInfo();
            }
        }
        else if (hArg.dive) {
            const dive = hArg.dive;
            let idx_dive = 0;
            if (layer == dive)
                throw '[lay] 属性 layerとdiveが同じ【' + dive + '】です';
            const pg_dive = this.hPages[dive];
            if (!pg_dive)
                throw '[lay] 属性 dive【' + dive + '】が不正です。レイヤーがありません';
            const back_dive = pg_dive.back;
            const fore_dive = pg_dive.fore;
            const idx_back_dive = this.back.getChildIndex(back_dive.cnt);
            const idx_fore_dive = this.fore.getChildIndex(fore_dive.cnt);
            idx_dive = (idx_back_dive < idx_fore_dive) ? idx_back_dive : idx_fore_dive;
            if (idx_dive > this.back.getChildIndex(back))
                --idx_dive;
            this.fore.setChildIndex(fore, idx_dive);
            this.back.setChildIndex(back, idx_dive);
            this.rebuildLayerRankInfo();
        }
        return pg.lay(hArg);
    }
    rebuildLayerRankInfo() { this.aLayName = this.sortLayers(); }
    clear_lay(hArg) {
        this.foreachLayers(hArg, name => {
            const pg = this.hPages[this.argChk_layer({ layer: name })];
            if (hArg.page == 'both') {
                pg.fore.clearLay(hArg);
                pg.back.clearLay(hArg);
            }
            else {
                pg.getPage(hArg).clearLay(hArg);
            }
        });
        return false;
    }
    trans(hArg) {
        this.finish_trans();
        const ease = hArg.ease ? CmnTween_1.CmnTween.hEase[hArg.ease] : TWEEN.Easing.Linear.None;
        if (!ease)
            throw '異常なease指定です';
        this.aBackTransAfter = [];
        const hTarget = {};
        for (const v of this.getLayers(hArg.layer))
            hTarget[v] = true;
        for (const lay_nm of this.getLayers())
            this.aBackTransAfter.push(this.hPages[lay_nm][hTarget[lay_nm] ? 'back' : 'fore'].cnt);
        this.rtTransBack.resize(CmnLib_1.CmnLib.stageW, CmnLib_1.CmnLib.stageH);
        this.appPixi.renderer.render(this.back, this.rtTransBack);
        this.rtTransFore.resize(CmnLib_1.CmnLib.stageW, CmnLib_1.CmnLib.stageH);
        this.appPixi.renderer.render(this.fore, this.rtTransFore);
        const fncRender = () => {
            this.back.visible = true;
            for (const lay of this.aBackTransAfter) {
                this.appPixi.renderer.render(lay, this.rtTransBack, false);
            }
            this.back.visible = false;
            this.spTransBack.visible = true;
            this.fore.visible = true;
            this.appPixi.renderer.render(this.fore, this.rtTransFore);
            this.fore.visible = false;
            this.spTransFore.visible = true;
        };
        this.spTransFore.alpha = 1;
        const closeTrans = () => {
            this.appPixi.ticker.remove(fncRender);
            this.elcTrans.clear();
            [this.fore, this.back] = [this.back, this.fore];
            for (const lay_name in this.hPages) {
                const pg = this.hPages[lay_name];
                if (hTarget[lay_name]) {
                    pg.transPage();
                    continue;
                }
                const idx = this.fore.getChildIndex(pg.back.cnt);
                this.fore.removeChild(pg.back.cnt);
                this.back.removeChild(pg.fore.cnt);
                this.fore.addChildAt(pg.fore.cnt, idx);
                this.back.addChildAt(pg.back.cnt, idx);
            }
            this.fore.visible = true;
            this.back.visible = false;
            this.spTransBack.visible = false;
            this.spTransFore.visible = false;
            if (this.twInfTrans.resume)
                this.main.resume();
            this.twInfTrans = { tw: null, resume: false };
        };
        const time = CmnLib_1.CmnLib.argChk_Num(hArg, 'time', 0);
        if (time == 0 || this.evtMng.isSkipKeyDown()) {
            closeTrans();
            return false;
        }
        this.twInfTrans = { tw: null, resume: false };
        const is_glsl = 'glsl' in hArg;
        if ((!is_glsl) && !('rule' in hArg)) {
            this.spTransFore.filters = [];
            this.twInfTrans.tw = new TWEEN.Tween(this.spTransFore)
                .to({ alpha: 0 }, time)
                .delay(CmnLib_1.CmnLib.argChk_Num(hArg, 'delay', 0))
                .easing(ease)
                .onComplete(closeTrans)
                .start();
            this.appPixi.ticker.add(fncRender);
            return false;
        }
        const flt = is_glsl
            ? new pixi_js_1.Filter(undefined, hArg.glsl, this.ufRuleTrans)
            : this.fltRule;
        flt.uniforms.vague = CmnLib_1.CmnLib.argChk_Num(hArg, 'vague', 0.04);
        flt.uniforms.tick = 0;
        this.twInfTrans.tw = new TWEEN.Tween(flt.uniforms)
            .to({ tick: 1 }, time)
            .delay(CmnLib_1.CmnLib.argChk_Num(hArg, 'delay', 0))
            .easing(ease)
            .onComplete(closeTrans);
        this.spTransFore.filters = [flt];
        if (is_glsl) {
            this.twInfTrans.tw.start();
            this.appPixi.ticker.add(fncRender);
            return false;
        }
        if (!hArg.rule)
            throw 'ruleが指定されていません';
        GrpLayer_1.GrpLayer.ldPic(hArg.rule, tx => {
            flt.uniforms.rule = tx;
            if (this.twInfTrans.tw)
                this.twInfTrans.tw.start();
            this.appPixi.ticker.add(fncRender);
        });
        return false;
    }
    getLayers(layer = '') {
        return (layer) ? layer.split(',') : this.aLayName;
    }
    foreachLayers(hArg, fnc) {
        const vct = this.getLayers(hArg['layer']);
        for (const name of vct) {
            if (!name)
                continue;
            const pg = this.hPages[name];
            if (pg == null)
                throw '存在しないlayer【' + name + '】です';
            fnc(name, pg);
        }
        return vct;
    }
    sortLayers(layers = '') {
        const a = this.getLayers(layers);
        a.sort((a, b) => {
            const ai = this.fore.getChildIndex(this.hPages[a].fore.cnt);
            const bi = this.fore.getChildIndex(this.hPages[b].fore.cnt);
            if (ai < bi)
                return -1;
            if (ai > bi)
                return 1;
            return 0;
        });
        return a;
    }
    wt(hArg) {
        if (!this.twInfTrans.tw)
            return false;
        this.twInfTrans.resume = true;
        this.evtMng.waitCustomEvent(hArg, this.elcTrans, () => this.finish_trans());
        return true;
    }
    finish_trans() {
        if (this.twInfTrans.tw)
            this.twInfTrans.tw.stop().end();
        return false;
    }
    quake(hArg) {
        this.finish_trans();
        if (this.val.getVal('tmp:sn.skip.enabled'))
            return false;
        if (this.evtMng.isSkipKeyDown())
            return false;
        const aDo = [];
        for (const lay_nm of this.getLayers(hArg.layer)) {
            aDo.push(this.hPages[lay_nm].fore.cnt);
        }
        this.rtTransFore.resize(CmnLib_1.CmnLib.stageW, CmnLib_1.CmnLib.stageH);
        const fncRender = () => {
            this.fore.visible = true;
            for (const lay of aDo) {
                this.appPixi.renderer.render(lay, this.rtTransFore, false);
            }
            this.fore.visible = false;
        };
        this.spTransFore.visible = true;
        this.spTransFore.alpha = 1;
        const closeTrans = () => {
            this.appPixi.ticker.remove(fncRender);
            this.fore.visible = true;
            this.spTransFore.visible = false;
            if (this.twInfTrans.resume)
                this.main.resume();
            this.twInfTrans = { tw: null, resume: false };
        };
        const ease = hArg.ease ? CmnTween_1.CmnTween.hEase[hArg.ease] : TWEEN.Easing.Linear.None;
        if (!ease)
            throw '異常なease指定です';
        const h = CmnLib_1.uint(CmnLib_1.CmnLib.argChk_Num(hArg, 'hmax', 10));
        const v = CmnLib_1.uint(CmnLib_1.CmnLib.argChk_Num(hArg, 'vmax', 10));
        const fncH = (h == 0)
            ? () => { }
            : () => this.spTransFore.x = Math.round(Math.random() * h * 2) - h;
        const fncV = (v == 0)
            ? () => { }
            : () => this.spTransFore.y = Math.round(Math.random() * v * 2) - v;
        this.spTransFore.filters = [];
        const repeat = CmnLib_1.CmnLib.argChk_Num(hArg, 'repeat', 1);
        this.twInfTrans = { tw: null, resume: false };
        this.twInfTrans.tw = new TWEEN.Tween(this.spTransFore)
            .to({ x: 0, y: 0 }, CmnLib_1.CmnLib.argChk_Num(hArg, 'time', NaN))
            .delay(CmnLib_1.CmnLib.argChk_Num(hArg, 'delay', 0))
            .easing(ease)
            .onUpdate(() => { fncH(); fncV(); })
            .repeat(repeat == 0 ? Infinity : (repeat - 1))
            .yoyo(CmnLib_1.CmnLib.argChk_Boolean(hArg, 'yoyo', false))
            .onComplete(closeTrans)
            .start();
        this.appPixi.ticker.add(fncRender);
        return false;
    }
    tsy(hArg) {
        if (!hArg.layer)
            throw 'layerは必須です';
        const layer = this.argChk_layer(hArg);
        const foreLay = this.hPages[layer].fore;
        const ease = hArg.ease ? CmnTween_1.CmnTween.hEase[hArg.ease] : TWEEN.Easing.Linear.None;
        if (!ease)
            throw '異常なease指定です';
        const hTo = {};
        for (const nm in this.hMemberCnt) {
            if (!(nm in hArg))
                continue;
            const v = String(hArg[nm]);
            const a = ((v.charAt(0) == '=') ? v.slice(1) : v).split(',');
            const a0 = hTo[nm] = parseFloat(a[0]);
            if (a.length > 1)
                hTo[nm] += Math.round(Math.random()
                    * (parseFloat(a[1]) - a0 + 1));
            if (v.charAt(0) == '=')
                hTo[nm] += parseFloat(foreLay[nm]);
        }
        const repeat = CmnLib_1.CmnLib.argChk_Num(hArg, 'repeat', 1);
        const tw_nm = hArg.name || hArg.layer;
        const tw = new TWEEN.Tween(foreLay)
            .to(hTo, CmnLib_1.CmnLib.argChk_Num(hArg, 'time', NaN)
            * (Boolean(this.val.getVal('tmp:sn.skip.enabled')) ? 0 : 1))
            .delay(CmnLib_1.CmnLib.argChk_Num(hArg, 'delay', 0))
            .easing(ease)
            .repeat(repeat == 0 ? Infinity : (repeat - 1))
            .yoyo(CmnLib_1.CmnLib.argChk_Boolean(hArg, 'yoyo', false))
            .onComplete(() => {
            const twInf = this.hTwInf[tw_nm];
            if (!twInf)
                return;
            delete this.hTwInf[tw_nm];
            this.evtMng.popLocalEvts();
            if (twInf.resume)
                this.main.resume();
            if (twInf.onComplete)
                twInf.onComplete();
        });
        if ('chain' in hArg) {
            const twFrom = this.hTwInf[hArg.chain || ''];
            if (!twFrom || !twFrom.tw)
                throw `${hArg.chain}は存在しない・または終了したトゥイーンです`;
            twFrom.onComplete = () => { };
            twFrom.tw.chain(tw);
        }
        else
            tw.start();
        const arrive = CmnLib_1.CmnLib.argChk_Boolean(hArg, 'arrive', false);
        const backlay = CmnLib_1.CmnLib.argChk_Boolean(hArg, 'backlay', false);
        this.hTwInf[tw_nm] = { tw: tw, resume: false, onComplete: () => {
                if (arrive)
                    Object.assign(foreLay, hTo);
                if (backlay) {
                    const backCnt = this.hPages[layer].back.cnt;
                    for (const nm in this.hMemberCnt)
                        backCnt[nm] = foreLay[nm];
                }
            } };
        return false;
    }
    wait_tsy(hArg) {
        const tw_nm = ('id' in hArg) ? `frm\n${hArg.id}` : (hArg.name || hArg.layer);
        if (!tw_nm)
            throw 'トゥイーンが指定されていません';
        const twInf = this.hTwInf[tw_nm];
        if (!twInf || !twInf.tw)
            return false;
        twInf.resume = true;
        this.evtMng.stdWait(() => { if (twInf.tw)
            twInf.tw.stop().end(); }, CmnLib_1.CmnLib.argChk_Boolean(hArg, 'canskip', true));
        return true;
    }
    stop_tsy(hArg) {
        const tw_nm = ('id' in hArg) ? `frm\n${hArg.id}` : (hArg.name || hArg.layer);
        if (!tw_nm)
            throw 'トゥイーンが指定されていません';
        const twInf = this.hTwInf[tw_nm];
        if (!twInf || !twInf.tw)
            return false;
        twInf.tw.stop().end();
        return false;
    }
    pause_tsy(hArg) {
        const tw_nm = ('id' in hArg) ? `frm\n${hArg.id}` : (hArg.name || hArg.layer);
        if (!tw_nm)
            throw 'トゥイーンが指定されていません';
        const twInf = this.hTwInf[tw_nm];
        if (!twInf || !twInf.tw)
            return false;
        twInf.tw.stop();
        return false;
    }
    resume_tsy(hArg) {
        const tw_nm = ('id' in hArg) ? `frm\n${hArg.id}` : (hArg.name || hArg.layer);
        if (!tw_nm)
            throw 'トゥイーンが指定されていません';
        const twInf = this.hTwInf[tw_nm];
        if (!twInf || !twInf.tw)
            return false;
        twInf.tw.start();
        return false;
    }
    static get msecChWait() { return LayerMng.$msecChWait; }
    static set msecChWait(v) { LayerMng.$msecChWait = v; }
    ch(hArg) {
        if (!hArg.text)
            throw '[ch] textは必須です';
        const tl = this.getTxtLayer(hArg);
        const wait = (this.val.getVal('tmp:sn.skip.enabled'))
            ? 0
            : CmnLib_1.CmnLib.argChk_Num(hArg, 'wait', -1);
        if (wait >= 0)
            this.cmdTxt(`add｜{'wait': ${wait}}`, tl);
        tl.tagCh(hArg.text.replace(/\[r]/g, '\n'));
        if (wait >= 0)
            this.cmdTxt(`add_close｜`, tl);
        return false;
    }
    getTxtLayer(hArg) {
        this.fncChkTxtLay();
        const layer = this.argChk_layer(hArg, this.strTxtlay);
        const pg = this.hPages[layer];
        const lay = pg.getPage(hArg);
        if (!(lay instanceof TxtLayer_1.TxtLayer))
            throw layer + 'はTxtLayerではありません';
        const tf = lay;
        return tf;
    }
    setNormalWaitTxtLayer() { LayerMng.$msecChWait = this.scrItr.normalWait; }
    current(hArg) {
        this.fncChkTxtLay();
        const layer = hArg.layer;
        if (!layer)
            throw '[current] layerは必須です';
        this.pgTxtlay = this.hPages[layer];
        if (!(this.pgTxtlay.getPage(hArg) instanceof TxtLayer_1.TxtLayer))
            throw '' + layer + 'はTxtLayerではありません';
        this.val.setVal_Nochk('save', 'const.sn.mesLayer', this.strTxtlay = layer);
        return false;
    }
    getCurrentTxtlayForeNeedErr() {
        this.fncChkTxtLay();
        return this.getCurrentTxtlayFore();
    }
    getCurrentTxtlayFore() {
        if (!this.pgTxtlay)
            return undefined;
        return this.pgTxtlay.fore;
    }
    argChk_layer(hash, def = '') {
        const v = hash.layer || def;
        if (v.includes(','))
            throw 'layer名に「,」は使えません';
        if (!(v in this.hPages))
            throw '属性 layer【' + v + '】が不正です。レイヤーがありません';
        return hash.layer = v;
    }
    recText(txt) {
        if (!this.val.getVal('save:sn.doRecLog'))
            return;
        if (txt != '\f') {
            this.val.setVal_Nochk('tmp', 'const.sn.last_page_text', txt);
            return;
        }
        this.val.setVal_Nochk('save', 'const.sn.sLog', (String(this.val.getVal('save:const.sn.sLog')) + '\f' +
            String(this.val.getVal('tmp:const.sn.last_page_text')))
            .replace(/^\f|^<br\/>|\f(?=\f)/g, '')
            .replace(/\f<br\/>/g, '\f')
            .split('\f').slice(-this.cfg.oCfg.log.max_len).join('\f'));
        this.val.setVal_Nochk('tmp', 'const.sn.last_page_text', '');
    }
    clear_text(hArg) {
        const tf = this.getTxtLayer(hArg);
        if (hArg.layer == this.strTxtlay && hArg.page == 'fore')
            this.recText('\f');
        tf.clearText();
        return false;
    }
    endlink() { this.cmdTxt('endlink｜'); return false; }
    er(hArg) {
        if (CmnLib_1.CmnLib.argChk_Boolean(hArg, 'rec_page_break', true))
            this.recText('\f');
        if (this.pgTxtlay) {
            this.pgTxtlay.fore.clearLay(hArg);
            this.pgTxtlay.back.clearLay(hArg);
        }
        return false;
    }
    graph(hArg) {
        if (!('pic' in hArg))
            throw '[graph] picは必須です';
        hArg.text = '｜　《grp｜' + JSON.stringify(hArg) + '》';
        return this.hTag.ch(hArg);
    }
    ;
    link(hArg) {
        if (!hArg.style)
            hArg.style = 'background-color: rgba(255,0,0,0.5);';
        this.cmdTxt('link｜' + JSON.stringify(hArg));
        return false;
    }
    r(hArg) {
        this.hTag.ch({ text: '\n' });
        if (hArg.layer == this.strTxtlay)
            this.recText('\n');
        return false;
    }
    rec_r() { this.recText('\n'); return false; }
    ;
    rec_ch(hArg) {
        if (!hArg.text)
            throw '[rec_ch] textは必須です';
        this.recText(hArg.text);
        if (CmnLib_1.CmnLib.argChk_Boolean(hArg, 'r', true))
            this.recText('\n');
        return false;
    }
    ;
    reset_rec(hArg) {
        this.val.setVal_Nochk('save', 'const.sn.sLog', hArg.text || '');
        return false;
    }
    ruby2(hArg) {
        const t = hArg.t;
        if (!t)
            throw '[ruby2] tは必須です';
        const r = hArg.r;
        if (!r)
            throw '[ruby2] rは必須です';
        hArg.text = '｜' + t + '《' + r + '》';
        this.hTag.ch(hArg);
        return false;
    }
    span(hArg) {
        this.cmdTxt(`span｜${hArg.style || ''}`);
        return false;
    }
    tcy(hArg) {
        if (!hArg.t)
            throw '[tcy] tは必須です';
        hArg.text = '｜　｜《tcy｜' + hArg.t + '｜' + (hArg.r || '') + '》';
        this.hTag.ch(hArg);
        return false;
    }
    ;
    dump_lay(hArg) {
        console.group('🥟 [dump_lay]');
        for (const name of this.getLayers(hArg.layer)) {
            const pg = this.hPages[name];
            console.info(`%c${pg.fore.name.slice(0, -7)} %o`, 'color:#0055AA;', JSON.parse(`{"back":{${pg.back.dump()}}, "fore":{${pg.fore.dump()}}}`));
        }
        console.groupEnd();
        return false;
    }
    enable_event(hArg) {
        this.fncChkTxtLay();
        const layer = this.argChk_layer(hArg, this.strTxtlay);
        const enb = this.getTxtLayer(hArg).enabled
            = CmnLib_1.CmnLib.argChk_Boolean(hArg, 'enabled', true);
        this.val.setVal_Nochk('save', 'const.sn.layer.' + layer + '.enabled', enb);
        return false;
    }
    button(hArg) {
        Pages_1.Pages.argChk_page(hArg, 'back');
        hArg.clicksebuf = hArg.clicksebuf || 'SYS';
        hArg.entersebuf = hArg.entersebuf || 'SYS';
        hArg.leavesebuf = hArg.leavesebuf || 'SYS';
        return this.getTxtLayer(hArg).addButton(hArg);
    }
    record() {
        const o = {};
        this.aLayName.map(layer => {
            const pg = this.hPages[layer];
            o[layer] = {
                cls: pg.cls,
                fore: pg.fore.record(),
                back: pg.back.record(),
            };
        });
        return o;
    }
    playback($hPages, fncComp) {
        const aPromise = [];
        const aSort = [];
        for (const layer in $hPages) {
            const $pg = $hPages[layer];
            aSort.push({ layer: layer, idx: $pg.fore.idx });
            const pg = this.hPages[layer] || new Pages_1.Pages(layer, $pg.cls, this.fore, {}, this.back, {}, this.sys, this.val);
            this.hPages[layer] = pg;
            aPromise.push(new Promise(re => pg.fore.playback($pg.fore, re)));
            aPromise.push(new Promise(re => pg.back.playback($pg.back, re)));
        }
        Promise.all(aPromise).then(() => {
            aSort.sort(function (a, b) {
                if (a.idx < b.idx)
                    return -1;
                if (a.idx > b.idx)
                    return 1;
                return 0;
            });
            aSort.map(o => {
                const pg = this.hPages[o.layer];
                if (!pg)
                    return;
                this.fore.setChildIndex(pg.fore.cnt, o.idx);
                this.back.setChildIndex(pg.back.cnt, o.idx);
            });
            fncComp();
        })
            .catch(e => console.error(`fn:LayerMng.ts playback e:%o`, e));
    }
}
LayerMng.$msecChWait = 10;
exports.LayerMng = LayerMng;
//# sourceMappingURL=LayerMng.js.map