import { IEvtMng } from './CmnLib';
import { IHTag, HArg } from './Grammar';
import { IVariable, IMain, HIPage, IGetFrm, IPropParser } from './CmnInterface';
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
export declare class LayerMng implements IGetFrm {
    #private;
    private readonly cfg;
    private readonly hTag;
    private readonly appPixi;
    private readonly val;
    private readonly main;
    private readonly scrItr;
    private readonly sys;
    constructor(cfg: Config, hTag: IHTag, appPixi: Application, val: IVariable, main: IMain, scrItr: ScriptIterator, sys: SysBase, sndMng: SoundMng, prpPrs: IPropParser);
    private cvsResizeDesign;
    getFrmDisabled: (id: string) => boolean;
    cover(visible: boolean, bg_color?: number): void;
    setEvtMng(evtMng: IEvtMng): void;
    destroy(): void;
    goTxt: () => void;
    get needGoTxt(): boolean;
    breakLine: (_hArg: HArg) => void;
    breakPage: (_hArg: HArg) => void;
    clearBreak(): void;
    clickTxtLay(): boolean;
    setAllStyle2TxtLay(style: string): void;
    static get msecChWait(): number;
    setNormalChWait(): void;
    get currentTxtlayForeNeedErr(): TxtLayer;
    get currentTxtlayFore(): TxtLayer | null;
    recPagebreak(): void;
    record(): any;
    playback($hPages: HIPage): Promise<void>[];
}
//# sourceMappingURL=LayerMng.d.ts.map