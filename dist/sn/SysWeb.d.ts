import { SysBase } from './SysBase';
import { T_HTag, TTag } from './Grammar';
import { T_Variable, T_Data4Vari, T_SysBaseParams, T_SysBaseLoadedParams, T_H_TMP_DATA } from './CmnInterface';
import { Application } from 'pixi.js';
export declare class SysWeb extends SysBase {
    #private;
    constructor(...[hPlg, arg]: T_SysBaseParams);
    protected loaded(...[hPlg, arg]: T_SysBaseLoadedParams): Promise<void>;
    runSN(prj: string): Promise<void>;
    initVal(hTmp: T_H_TMP_DATA, comp: (data: T_Data4Vari) => void): Promise<void>;
    init(hTag: T_HTag, appPixi: Application, val: T_Variable): Promise<void>[];
    cvsResize(): void;
    pathBaseCnvSnPath4Dbg: string;
    protected readonly _export: TTag;
    protected readonly _import: TTag;
    protected readonly navigate_to: TTag;
    protected titleSub(txt: string): void;
    savePic(path: string, data_url: string): Promise<void>;
    appendFile(path: string, data: string): Promise<void>;
    outputFile(path: string, data: string): Promise<void>;
}
//# sourceMappingURL=SysWeb.d.ts.map