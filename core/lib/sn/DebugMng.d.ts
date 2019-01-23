import { IHTag } from './CmnInterface';
import { SysBase } from './SysBase';
import { ScriptIterator } from './ScriptIterator';
export declare class DebugMng {
    private sys;
    private _stats;
    private fncUpd;
    private static scrItr;
    private static hTag;
    private static title;
    constructor(sys: SysBase, hTag: IHTag, scrItr: ScriptIterator);
    destroy(): void;
    update(): void;
    private log;
    private stats;
    private trace;
    static myTrace: (txt: string, lvl?: "D" | "W" | "F" | "E" | "I" | "ET") => void;
    private static fncMyTrace;
}
