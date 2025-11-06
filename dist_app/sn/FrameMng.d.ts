import { IEvtMng } from './CmnLib';
import { T_HTag } from './Grammar';
import { T_Variable, T_Main, T_GetFrm } from './CmnInterface';
import { SysBase } from './SysBase';
import { Config } from './Config';
import { Application } from 'pixi.js';
export declare class FrameMng implements T_GetFrm {
    #private;
    private readonly appPixi;
    private readonly val;
    static init(cfg: Config, sys: SysBase, main: T_Main): void;
    constructor(hTag: T_HTag, appPixi: Application, val: T_Variable);
    setEvtMng(evtMng: IEvtMng): void;
    destroy(): void;
    hideAllFrame(): void;
    restoreAllFrame(): void;
    getFrmDisabled(id: string): boolean;
    cvsResize(): void;
}
//# sourceMappingURL=FrameMng.d.ts.map