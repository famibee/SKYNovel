import { SysBase } from './SysBase';
import { T_HTag, TTag } from './Grammar';
import { T_Variable, T_Data4Vari, T_SysBaseParams, T_SysBaseLoadedParams, T_H_TMP_DATA } from './CmnInterface';
import { Application } from 'pixi.js';
import { readFile } from 'fs-extra';
export declare class SysApp extends SysBase {
    #private;
    constructor(...[hPlg, arg]: T_SysBaseParams);
    protected loaded(...[hPlg, arg]: T_SysBaseLoadedParams): Promise<void>;
    fetch: (url: string) => Promise<Response>;
    ensureFile: (path: string) => Promise<void>;
    protected readFile(_path: string, _encoding: Parameters<typeof readFile>[1]): Promise<string>;
    protected writeFile: (path: string, data: string | NodeJS.ArrayBufferView, o?: object) => Promise<void>;
    appendFile: (path: string, data: string) => Promise<void>;
    outputFile: (path: string, data: string) => Promise<void>;
    readonly isApp = true;
    protected $path_userdata: string;
    protected $path_downloads: string;
    initVal(hTmp: T_H_TMP_DATA, comp: (data: T_Data4Vari) => void): Promise<void>;
    init(hTag: T_HTag, appPixi: Application, val: T_Variable): Promise<void>[];
    cvsResize(): void;
    copyBMFolder: (from: number, to: number) => void;
    eraseBMFolder: (place: number) => void;
    protected readonly close: () => boolean;
    protected readonly _export: () => boolean;
    protected readonly _import: () => boolean;
    protected readonly navigate_to: TTag;
    protected titleSub(title: string): void;
    protected readonly tglFlscr_sub: () => Promise<void>;
    protected readonly update_check: TTag;
    protected readonly window: TTag;
    capturePage(path: string, w: number, h: number, fnc: () => void): void;
    savePic(path: string, data_url: string): Promise<void>;
}
//# sourceMappingURL=SysApp.d.ts.map