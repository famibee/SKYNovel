import { IEvtMng } from './CmnLib';
import { T_HTag, TArg } from './Grammar';
import { T_Variable, T_Main, T_HPage, T_GetFrm, T_PropParser } from './CmnInterface';
import { Pages } from './Pages';
import { TxtLayer } from './TxtLayer';
import { Config } from './Config';
import { ScriptIterator } from './ScriptIterator';
import { SysBase } from './SysBase';
import { SoundMng } from './SoundMng';
import { DesignCast } from './DesignCast';
import { Application } from 'pixi.js';
export type IMakeDesignCast = (idc: DesignCast) => void;
export type HPage = {
    [ln: string]: Pages;
};
export declare class LayerMng implements T_GetFrm {
    #private;
    private readonly cfg;
    private readonly hTag;
    private readonly appPixi;
    private readonly val;
    private readonly main;
    private readonly scrItr;
    private readonly sys;
    constructor(cfg: Config, hTag: T_HTag, appPixi: Application, val: T_Variable, main: T_Main, scrItr: ScriptIterator, sys: SysBase, sndMng: SoundMng, prpPrs: T_PropParser);
    private cvsResizeDesign;
    getFrmDisabled: (id: string) => boolean;
    cover(visible: boolean, bg_color?: number): void;
    setEvtMng(evtMng: IEvtMng): void;
    destroy(): void;
    goTxt: () => void;
    get needGoTxt(): boolean;
    breakLine: (_hArg: TArg) => void;
    breakPage: (_hArg: TArg) => void;
    clearBreak(): void;
    clickTxtLay(): boolean;
    setAllStyle2TxtLay(style: string): void;
    setNormalChWait(): void;
    get currentTxtlayForeNeedErr(): TxtLayer;
    get currentTxtlayFore(): TxtLayer | null;
    recPagebreak(): void;
    record(): any;
    playback($hPages: T_HPage): Promise<void>[];
}
//# sourceMappingURL=LayerMng.d.ts.map