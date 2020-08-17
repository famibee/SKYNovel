import { IEvtMng } from './CmnLib';
import { IHTag, IVariable, IMain, HPage, HArg, IGetFrm } from './CmnInterface';
import { TxtLayer } from './TxtLayer';
import { Config } from './Config';
import { ScriptIterator } from './ScriptIterator';
import { SysBase } from './SysBase';
import { Application } from 'pixi.js';
export declare class LayerMng implements IGetFrm {
    private readonly cfg;
    private readonly hTag;
    private readonly appPixi;
    private readonly val;
    private readonly main;
    private readonly scrItr;
    private readonly sys;
    private stage;
    private fore;
    private back;
    private frmMng;
    constructor(cfg: Config, hTag: IHTag, appPixi: Application, val: IVariable, main: IMain, scrItr: ScriptIterator, sys: SysBase);
    private fncTicker;
    getFrmDisabled(id: string): boolean;
    private grpCover;
    cover(visible: boolean, bg_color?: number): void;
    private evtMng;
    setEvtMng(evtMng: IEvtMng): void;
    before_destroy(): void;
    destroy(): void;
    private foreachRedrawTxtLayBack;
    private cmdTxt;
    goTxt: () => void;
    breakLine: () => void;
    breakPage: () => void;
    clearBreak(): void;
    clickTxtLay(): void;
    private snapshot;
    private loadplugin;
    protected set_focus(hArg: HArg): boolean;
    private add_lay;
    private hPages;
    private aLayName;
    private curTxtlay;
    private lay;
    private rebuildLayerRankInfo;
    private clear_lay;
    private readonly srcRuleTransFragment;
    private ufRuleTrans;
    private fltRule;
    private rtTransBack;
    private spTransBack;
    private rtTransFore;
    private spTransFore;
    private aBackTransAfter;
    private trans;
    private tiTrans;
    private getLayers;
    private foreachLayers;
    private sortLayers;
    private wt;
    private finish_trans;
    private quake;
    private hTwInf;
    private tsy;
    private wait_tsy;
    private stop_tsy;
    private pause_tsy;
    private resume_tsy;
    private static $msecChWait;
    static get msecChWait(): number;
    static set msecChWait(v: number);
    private ch;
    private getTxtLayer;
    private $getTxtLayer;
    setNormalWaitTxtLayer(): void;
    private current;
    private $current;
    getCurrentTxtlayForeNeedErr(): TxtLayer;
    getCurrentTxtlayFore(): TxtLayer | undefined;
    private pgTxtlay;
    private fncChkTxtLay;
    private argChk_layer;
    private oLastPage;
    private aPageLog;
    recText(txt: string, pagebreak?: boolean): void;
    private clear_text;
    private endlink;
    private er;
    private graph;
    private link;
    private r;
    private rec_r;
    private rec_ch;
    private reset_rec;
    private ruby2;
    private span;
    private tcy;
    private dump_lay;
    private enable_event;
    private button;
    record(): any;
    playback($hPages: HPage, fncComp: () => void): void;
}
//# sourceMappingURL=LayerMng.d.ts.map