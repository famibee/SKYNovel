import { IHTag } from './CmnInterface';
import { SysBase } from './SysBase';
import { ScriptIterator } from './ScriptIterator';
export declare class DebugMng {
    private readonly sys;
    private static scrItr;
    private static hTag;
    private static title;
    private static spnDbg;
    constructor(sys: SysBase, hTag: IHTag, scrItr: ScriptIterator);
    destroy(): void;
    private first;
    private log;
    private trace;
    private static trace_beforeNew;
    static myTrace: typeof DebugMng.trace_beforeNew;
    private static trace;
    private static dspDbg;
}
//# sourceMappingURL=DebugMng.d.ts.map