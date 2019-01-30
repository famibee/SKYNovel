import { IMain, HArg } from './CmnInterface';
import { SysBase } from './SysBase';
export declare class Main implements IMain {
    private sys;
    private cfg;
    private appPixi;
    private hTag;
    private val;
    private prpPrs;
    private sndMng;
    private scrItr;
    private dbgMng;
    private layMng;
    private evtMng;
    private fncNext;
    private alzTagArg;
    constructor(sys: SysBase);
    private fncTicker;
    errScript(mes: string, isThrow?: boolean): void;
    private fncresume;
    resume: (fnc?: () => void) => void;
    resumeByJumpOrCall(hArg: HArg): void;
    stop: () => void;
    private runAnalyze;
    private タグ解析;
    private getValAmpersand;
    pauseDev: () => void;
    resumeDev: () => void;
    destroy(): void;
    private destroyed;
    isDestroyed: () => boolean;
    private clone_cvs;
}