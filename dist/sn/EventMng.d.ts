import { IEvtMng } from './CmnLib';
import { IHTag, HArg } from './Grammar';
import { IVariable, IMain, IHEvt2Fnc } from './CmnInterface';
import { LayerMng } from './LayerMng';
import { ScriptIterator } from './ScriptIterator';
import { SoundMng } from './SoundMng';
import { Config } from './Config';
import { SysBase } from './SysBase';
import { Container, Application } from 'pixi.js';
export declare class EventMng implements IEvtMng {
    #private;
    private readonly cfg;
    private readonly hTag;
    readonly appPixi: Application;
    private readonly main;
    readonly layMng: LayerMng;
    readonly val: IVariable;
    private readonly scrItr;
    readonly sys: SysBase;
    constructor(cfg: Config, hTag: IHTag, appPixi: Application, main: IMain, layMng: LayerMng, val: IVariable, sndMng: SoundMng, scrItr: ScriptIterator, sys: SysBase);
    resvFlameEvent(win: Window): void;
    destroy(): void;
    fire(KEY: string, e: Event): void;
    popLocalEvts(): IHEvt2Fnc;
    pushLocalEvts(h: IHEvt2Fnc): void;
    unButton(ctnBtn: Container): void;
    button(hArg: HArg, ctnBtn: Container, normal: () => void, hover: () => boolean, clicked: () => void): void;
    hideHint(): void;
    cvsResize(): void;
    readonly waitEvent: (hArg: HArg, onIntr: () => void) => boolean;
    finishLimitedEvent(): void;
    noticeCompTxt(): void;
    isSkipping(): boolean;
}
//# sourceMappingURL=EventMng.d.ts.map