import { IEvtMng } from './CmnLib';
import { IHTag, HArg } from './Grammar';
import { IVariable, IMain, HIPage, IGetFrm, IPropParser, IRecorder } from './CmnInterface';
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
    [ln: string]: Pages;
}
export declare class LayerMng implements IGetFrm, IRecorder {
    #private;
    readonly cfg: Config;
    readonly hTag: IHTag;
    readonly appPixi: Application;
    readonly val: IVariable;
    readonly main: IMain;
    readonly scrItr: ScriptIterator;
    readonly sys: SysBase;
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
    goTxt: () => void;
    breakLine: (_hArg: HArg) => void;
    breakPage: (_hArg: HArg) => void;
    clearBreak(): void;
    clickTxtLay(): boolean;
    setAllStyle2TxtLay(style: string): void;
    static get msecChWait(): number;
    setNormalChWait(): void;
    get currentTxtlayForeNeedErr(): TxtLayer;
    get currentTxtlayFore(): TxtLayer | null;
    recText(text: string): void;
    recPagebreak(): void;
    record(): any;
    playback($hPages: HIPage): Promise<void>[];
}
//# sourceMappingURL=LayerMng.d.ts.map