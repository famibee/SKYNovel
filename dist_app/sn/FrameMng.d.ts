import { IEvtMng } from './CmnLib';
import { IHTag } from './Grammar';
import { IVariable, IMain, IGetFrm } from './CmnInterface';
import { SysBase } from './SysBase';
import { Config } from './Config';
import { Application } from 'pixi.js';
export declare class FrameMng implements IGetFrm {
    #private;
    private readonly appPixi;
    private readonly val;
    static init(cfg: Config, sys: SysBase, main: IMain): void;
    constructor(hTag: IHTag, appPixi: Application, val: IVariable);
    setEvtMng(evtMng: IEvtMng): void;
    destroy(): void;
    hideAllFrame(): void;
    restoreAllFrame(): void;
    getFrmDisabled(id: string): boolean;
    cvsResize(): void;
}
//# sourceMappingURL=FrameMng.d.ts.map