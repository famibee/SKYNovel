import { IHTag } from './CmnInterface';
import { SysBase } from './SysBase';
import { ScriptIterator } from './ScriptIterator';
export declare class DebugMng {
    private readonly sys;
    private static scrItr;
    private static hTag;
    private static title;
    private static spnDbg;
    private _stats;
    private fncUpd;
    constructor(sys: SysBase, hTag: IHTag, scrItr: ScriptIterator);
    destroy(): void;
    update(): void;
    private first;
    private log;
    private stats;
    private trace;
    static myTrace: (txt: string, lvl?: "D" | "E" | "F" | "I" | "W" | "ET") => void;
    private static fncMyTrace;
    private static dspDbg;
}
