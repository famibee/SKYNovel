import { IEvtMng } from './CmnLib';
import { ITwInf } from './CmnTween';
import { IHTag, IVariable, IMain } from './CmnInterface';
import { Application } from 'pixi.js';
import { SysBase } from './SysBase';
export declare class FrameMng {
    private appPixi;
    private val;
    private main;
    private sys;
    private hTwInf;
    constructor(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain, sys: SysBase, hTwInf: {
        [name: string]: ITwInf;
    });
    private evtMng;
    setEvtMng(evtMng: IEvtMng): void;
    private add_frame;
    private let_frame;
    private set_frame;
    private frame;
    private tsy_frame;
}
