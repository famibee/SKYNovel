import { IHTag, ITag } from './Grammar';
import { IVariable, ISysBase, IData4Vari, HPlugin, HSysBaseArg, ILayerFactory, IMain, IFire, IFncHook } from './CmnInterface';
import { EventListenerCtn } from './EventListenerCtn';
import { Application } from 'pixi.js';
import { IConfig, IFn2Path, ISysRoots } from './ConfigBase';

export declare class SysBase implements ISysRoots, ISysBase {
    #private;
    readonly hPlg: HPlugin;
    protected arg: HSysBaseArg;
    hFactoryCls: {
        [name: string]: ILayerFactory;
    };
    protected readonly elc: EventListenerCtn;
    constructor(hPlg: HPlugin, arg: HSysBaseArg);
    protected loaded(hPlg: HPlugin, _arg: HSysBaseArg): Promise<void>;
    get cur(): string;
    get crypto(): boolean;
    fetch: (url: string) => Promise<Response>;
    destroy(): void;
    resolution: number;
    protected cfg: IConfig;
    loadPath(_hPathFn2Exts: IFn2Path, cfg: IConfig): Promise<void>;
    protected readonly data: {
        sys: {};
        mark: {};
        kidoku: {};
    };
    initVal(_data: IData4Vari, _hTmp: any, _comp: (data: IData4Vari) => void): Promise<void>;
    flush(): void;
    protected flushSub(): void;
    protected run(): Promise<void>;
    protected val: IVariable;
    init(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): Promise<void>[];
    protected static readonly VALNM_CFG_NS = "const.sn.cfg.ns";
    get cvsWidth(): number;
    get cvsHeight(): number;
    get cvsScale(): number;
    get ofsLeft4elm(): number;
    get ofsTop4elm(): number;
    get ofsPadLeft_Dom2PIXI(): number;
    get ofsPadTop_Dom2PIXI(): number;
    protected isFullScr: boolean;
    cvsResize(): void;
    attach_debug(main: IMain): void;
    protected extPort: number;
    end(): void;
    protected toast(nm: string): void;
    pathBaseCnvSnPath4Dbg: string;
    protected fire: IFire;
    setFire(fire: IFire): void;
    addHook(fnc: IFncHook): void;
    callHook: IFncHook;
    send2Dbg: IFncHook;
    copyBMFolder: (_from: number, _to: number) => void;
    eraseBMFolder: (_place: number) => void;
    protected readonly close: ITag;
    protected readonly _export: ITag;
    protected readonly _import: ITag;
    protected readonly navigate_to: ITag;
    protected readonly title: ITag;
    protected titleSub(_txt: string): void;
    protected tglFlscr_sub(): void;
    protected readonly update_check: ITag;
    protected readonly window: ITag;
    setTitleInfo(txt: string): void;
    dec: (_ext: string, tx: string) => Promise<string>;
    decAB(iab: ArrayBuffer): Promise<ArrayBuffer | HTMLImageElement | HTMLVideoElement>;
    protected enc: (tx: string) => Promise<string>;
    protected stk: () => string;
    hash: (_str: string) => string;
    readonly isApp: boolean;
    protected $path_downloads: string;
    get path_downloads(): string;
    protected $path_userdata: string;
    get path_userdata(): string;
    capturePage(_fn: string, _w: number, _h: number, _fnc: () => void): void;
    savePic(_fn: string, _data_url: string): Promise<void>;
    ensureFileSync(_path: string): Promise<void>;
    appendFile(_path: string, _data: string): Promise<void>;
    outputFile(_path: string, _data: string): Promise<void>;
}
//# sourceMappingURL=SysBase.d.ts.map