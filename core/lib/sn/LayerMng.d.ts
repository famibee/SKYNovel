import { IEvtMng } from './CmnLib';
import { IHTag, IVariable, IMain, HIPage, IGetFrm, IPropParser } from './CmnInterface';
import { Pages } from './Pages';
import { TxtLayer } from './TxtLayer';
import { Config } from './Config';
import { ScriptIterator } from './ScriptIterator';
import { SysBase } from './SysBase';
import { SoundMng } from './SoundMng';
import { AnalyzeTagArg } from './AnalyzeTagArg';
import { DesignCast } from './DesignCast';
import { Application } from 'pixi.js';
export interface IMakeDesignCast {
    (idc: DesignCast): void;
}
export interface HPage {
    [name: string]: Pages;
}
export declare class LayerMng implements IGetFrm {
    #private;
    private readonly cfg;
    private readonly hTag;
    private readonly appPixi;
    private readonly val;
    private readonly main;
    private readonly scrItr;
    private readonly sys;
    readonly sndMng: SoundMng;
    readonly alzTagArg: AnalyzeTagArg;
    readonly prpPrs: IPropParser;
    constructor(cfg: Config, hTag: IHTag, appPixi: Application, val: IVariable, main: IMain, scrItr: ScriptIterator, sys: SysBase, sndMng: SoundMng, alzTagArg: AnalyzeTagArg, prpPrs: IPropParser);
    private cvsResizeDesign;
    getFrmDisabled: (id: string) => boolean;
    cover(visible: boolean, bg_color?: number): void;
    setEvtMng(evtMng: IEvtMng): void;
    before_destroy(): void;
    destroy(): void;
    stopAllTw(): void;
    goTxt: () => void;
    breakLine: () => void;
    breakPage: () => void;
    clearBreak(): void;
    clickTxtLay(): void;
    static get msecChWait(): number;
    static set msecChWait(v: number);
    setNormalWaitTxtLayer(): void;
    getCurrentTxtlayForeNeedErr(): TxtLayer;
    getCurrentTxtlayFore(): TxtLayer | undefined;
    recText(txt: string, pagebreak?: boolean): void;
    record(): any;
    playback($hPages: HIPage, fncComp: () => void): void;
}
//# sourceMappingURL=LayerMng.d.ts.map