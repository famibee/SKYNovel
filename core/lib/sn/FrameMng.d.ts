import { IEvtMng } from './CmnLib';
import { ITwInf } from './CmnTween';
import { IHTag, IVariable, IMain, IGetFrm } from './CmnInterface';
import { Application } from 'pixi.js';
import { SysBase } from './SysBase';
import { Config } from './Config';
export declare class FrameMng implements IGetFrm {
    private readonly cfg;
    private readonly appPixi;
    private readonly val;
    private readonly main;
    private readonly sys;
    private readonly hTwInf;
    constructor(cfg: Config, hTag: IHTag, appPixi: Application, val: IVariable, main: IMain, sys: SysBase, hTwInf: {
        [name: string]: ITwInf;
    });
    private evtMng;
    setEvtMng(evtMng: IEvtMng): void;
    private hIfrm;
    destroy(): void;
    private add_frame;
    private hDisabled;
    getFrmDisabled(id: string): boolean;
    private hAEncImg;
    private hEncImgOUrl;
    private rect;
    cvsResize(): void;
    private let_frame;
    private set_frame;
    private frame;
    private tsy_frame;
}
//# sourceMappingURL=FrameMng.d.ts.map