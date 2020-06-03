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
    static myTrace: (txt: string, lvl?: 'D' | 'W' | 'F' | 'E' | 'I' | 'ET') => void;
    private static fncMyTrace;
    private static dspDbg;
}
//# sourceMappingURL=DebugMng.d.ts.map