import { IHTag } from './Grammar';
import { SysBase } from './SysBase';
import { ScriptIterator } from './ScriptIterator';
export declare class DebugMng {
    #private;
    private readonly sys;
    constructor(sys: SysBase, hTag: IHTag, scrItr: ScriptIterator);
    destroy(): void;
    static trace_beforeNew(txt: string, lvl?: 'D' | 'W' | 'F' | 'E' | 'I' | 'ET'): void;
    static myTrace: typeof DebugMng.trace_beforeNew;
    static strPos: () => string;
}
//# sourceMappingURL=DebugMng.d.ts.map