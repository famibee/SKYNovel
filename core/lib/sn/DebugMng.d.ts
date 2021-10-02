import { IHTag } from './CmnInterface';
import { SysBase } from './SysBase';
import { ScriptIterator } from './ScriptIterator';
export declare class DebugMng {
    #private;
    private readonly sys;
    constructor(sys: SysBase, hTag: IHTag, scrItr: ScriptIterator);
    destroy(): void;
    static myTrace: typeof DebugMng.__#507@#trace_beforeNew;
}
//# sourceMappingURL=DebugMng.d.ts.map