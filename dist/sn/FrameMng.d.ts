import { IEvtMng } from './CmnLib';
import { ITwInf } from './CmnTween';
import { IHTag } from './Grammar';
import { IVariable, IMain, IGetFrm } from './CmnInterface';
import { Application } from 'pixi.js';
import { SysBase } from './SysBase';
import { Config } from './Config';
export declare class FrameMng implements IGetFrm {
    #private;
    private readonly cfg;
    private readonly appPixi;
    private readonly val;
    private readonly main;
    private readonly sys;
    private readonly hTwInf;
    constructor(cfg: Config, hTag: IHTag, appPixi: Application, val: IVariable, main: IMain, sys: SysBase, hTwInf: {
        [name: string]: ITwInf;
    });
    setEvtMng(evtMng: IEvtMng): void;
    destroy(): void;
    getFrmDisabled(id: string): boolean;
    cvsResize(): void;
}
//# sourceMappingURL=FrameMng.d.ts.map