import { IEvtMng } from './CmnLib';
import { T_HTag, TArg } from './Grammar';
import { T_Variable, T_Main } from './CmnInterface';
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
    private readonly layMng;
    private readonly val;
    private readonly scrItr;
    private readonly sys;
    constructor(cfg: Config, hTag: T_HTag, appPixi: Application, main: T_Main, layMng: LayerMng, val: T_Variable, sndMng: SoundMng, scrItr: ScriptIterator, sys: SysBase);
    resvFlameEvent(body: HTMLBodyElement): void;
    destroy(): void;
    unButton(ctnBtn: Container): void;
    button(hArg: TArg, ctnBtn: Container, normal: () => void, hover: () => boolean, clicked: () => void): void;
    hideHint(): void;
    cvsResize(): void;
    get isSkipping(): boolean;
}
//# sourceMappingURL=EventMng.d.ts.map