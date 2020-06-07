/// <reference types="node" />
/// <reference types="mocha" />
import { IConfig, IHTag, ITag, IVariable, IFn2Path, ISysBase, IData4Vari, HPlugin, HSysBaseArg, ILayerFactory, IMain, IFire, IFncHook } from './CmnInterface';
import { Application } from 'pixi.js';
export declare class SysBase implements ISysBase {
    protected readonly hPlg: HPlugin;
    protected readonly arg: HSysBaseArg;
    hFactoryCls: {
        [name: string]: ILayerFactory;
    };
    constructor(hPlg: HPlugin, arg: HSysBaseArg);
    get cur(): string;
    get crypto(): boolean;
    fetch: (url: string) => Promise<Response>;
    resolution: number;
    reso4frame: number;
    protected cfg: IConfig;
    loadPathAndVal(_hPathFn2Exts: IFn2Path, _fncLoaded: () => void, cfg: IConfig): void;
    protected readonly data: {
        sys: {};
        mark: {};
        kidoku: {};
    };
    initVal(_data: IData4Vari, _hTmp: any, _comp: (data: IData4Vari) => void): void;
    flush(): void;
    protected val: IVariable;
    protected appPixi: Application;
    init(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): void;
    protected static VALNM_CFG_NS: string;
    protected fire: IFire;
    setFire(fire: IFire): void;
    addHook(_fnc: IFncHook): void;
    callHook: IFncHook;
    sendDbg: IFncHook;
    protected readonly close: ITag;
    protected readonly _export: ITag;
    protected readonly _import: ITag;
    protected readonly navigate_to: ITag;
    protected readonly title: ITag;
    private main_title;
    protected titleSub(_txt: string): void;
    protected tgl_full_scr: ITag;
    protected readonly update_check: ITag;
    protected readonly window: ITag;
    private info_title;
    setTitleInfo(txt: string): void;
    pre: (_ext: string, data: string) => Promise<string>;
    protected enc: (data: string) => Promise<string>;
    protected stk: () => string;
    hash: (_data: string) => string;
    protected readonly isApp: () => boolean;
    protected readonly isPackaged: () => boolean;
    readonly isDbg: () => boolean;
    protected $path_downloads: string;
    get path_downloads(): string;
    protected $path_userdata: string;
    get path_userdata(): string;
    readonly existsSync: (_path: string) => boolean;
    readonly writeFile: (_file: string | Buffer | number, _data: any, _callback: (err: NodeJS.ErrnoException) => void) => void;
    readonly savePic: (_fn: string, _data_url: string) => void;
    readonly appendFile: (_path: string, _data: any, _callback: (err: NodeJS.ErrnoException) => void) => void;
    ofsLeft4frm: number;
    ofsTop4frm: number;
    protected resizeFrames(): void;
}
//# sourceMappingURL=SysBase.d.ts.map