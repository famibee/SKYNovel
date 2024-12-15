import { IHTag } from './Grammar';
import { SysBase } from './SysBase';
import { ScriptIterator } from './ScriptIterator';
export type T_TRACE = (txt: string, lvl?: 'D' | 'W' | 'F' | 'E' | 'I' | 'ET') => void;
export declare class DebugMng {
    #private;
    private readonly sys;
    constructor(sys: SysBase, hTag: IHTag, scrItr: ScriptIterator);
    destroy(): void;
    static readonly trace_beforeNew: T_TRACE;
    static myTrace: T_TRACE;
    static strPos: () => string;
}
//# sourceMappingURL=DebugMng.d.ts.map