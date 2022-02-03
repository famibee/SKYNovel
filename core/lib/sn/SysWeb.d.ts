/// <reference types="node" />
import { SysBase } from "./SysBase";
import { IConfig, IHTag, IVariable, IMain, ITag, IFn2Path, IData4Vari, HPlugin, HSysBaseArg } from './CmnInterface';
import { Application } from 'pixi.js';
import 'devtools-detect';
export declare class SysWeb extends SysBase {
    #private;
    constructor(hPlg?: {}, arg?: {
        cur: string;
        crypto: boolean;
        dip: string;
    });
    protected loaded(hPlg: HPlugin, arg: HSysBaseArg): Promise<void>;
    runSN(prj: string): void;
    protected run: () => Promise<void>;
    stop(): void;
    loadPath(hPathFn2Exts: IFn2Path, cfg: IConfig): Promise<void>;
    initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari) => void): void;
    init(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): Promise<void>[];
    cvsResize(): boolean;
    pathBaseCnvSnPath4Dbg: string;
    protected readonly _export: ITag;
    protected readonly _import: ITag;
    protected readonly navigate_to: ITag;
    protected titleSub(txt: string): void;
    savePic(fn: string, data_url: string): Promise<void>;
    appendFile(path: string, data: any, _callback: (err: NodeJS.ErrnoException) => void): Promise<void>;
}
//# sourceMappingURL=SysWeb.d.ts.map