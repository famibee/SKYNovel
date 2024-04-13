import { Application } from 'pixi.js';
import { Config } from './Config';
import { SysBase } from './SysBase';
import { IVariable, IMain, IGetFrm } from './CmnInterface';
import { IHTag } from './Grammar';
import { IEvtMng } from './CmnLib';

export declare class FrameMng implements IGetFrm {
    #private;
    private readonly cfg;
    private readonly appPixi;
    private readonly val;
    private readonly main;
    private readonly sys;
    static init(cfg: Config, sys: SysBase, main: IMain): void;
    constructor(cfg: Config, hTag: IHTag, appPixi: Application, val: IVariable, main: IMain, sys: SysBase);
    setEvtMng(evtMng: IEvtMng): void;
    destroy(): void;
    getFrmDisabled(id: string): boolean;
    cvsResize(): void;
}
//# sourceMappingURL=FrameMng.d.ts.map