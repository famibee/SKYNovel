import { IMain, HArg } from './CmnInterface';
import { SysBase } from './SysBase';
export declare class Main implements IMain {
    private readonly sys;
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
    private readonly alzTagArg;
    private inited;
    constructor(sys: SysBase);
    private readonly fncTicker;
    errScript(mes: string, isThrow?: boolean): void;
    private fncresume;
    resume: (fnc?: () => void) => void;
    resumeByJumpOrCall(hArg: HArg): void;
    readonly stop: () => void;
    setLoop(isLoop: boolean, mes?: string): void;
    private isLoop;
    private runAnalyze;
    destroy(ms_late?: number): Promise<void>;
    private destroyed;
    readonly isDestroyed: () => boolean;
    private clone_cvs;
}
//# sourceMappingURL=Main.d.ts.map