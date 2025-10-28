import { SysNode } from './SysNode';
import { IHTag, ITag } from './Grammar';
import { IVariable, T_Data4Vari, IMain, T_SysBaseParams, T_SysBaseLoadedParams, T_H_TMP_DATA } from './CmnInterface';
import { Application } from 'pixi.js';
export declare class SysApp extends SysNode {
    #private;
    constructor(...[hPlg, arg]: T_SysBaseParams);
    protected loaded(...[hPlg, arg]: T_SysBaseLoadedParams): Promise<void>;
    fetch: (url: string) => Promise<Response>;
    ensureFile: (path: string) => Promise<void>;
    protected writeFile: (path: string, data: string | NodeJS.ArrayBufferView, o?: object) => Promise<void>;
    appendFile: (path: string, data: string) => Promise<void>;
    outputFile: (path: string, data: string) => Promise<void>;
    protected $path_userdata: string;
    protected $path_downloads: string;
    initVal(data: T_Data4Vari, hTmp: T_H_TMP_DATA, comp: (data: T_Data4Vari) => void): Promise<void>;
    protected run(): Promise<void>;
    init(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): Promise<void>[];
    cvsResize(): void;
    copyBMFolder: (from: number, to: number) => void;
    eraseBMFolder: (place: number) => void;
    protected readonly close: () => boolean;
    protected readonly _export: () => boolean;
    protected readonly _import: () => boolean;
    protected readonly navigate_to: ITag;
    protected titleSub(title: string): void;
    protected readonly tglFlscr_sub: () => Promise<void>;
    protected readonly update_check: ITag;
    protected readonly window: ITag;
    capturePage(path: string, w: number, h: number, fnc: () => void): void;
}
//# sourceMappingURL=SysApp.d.ts.map