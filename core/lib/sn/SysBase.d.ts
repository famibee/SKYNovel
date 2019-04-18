/// <reference types="pixi.js" />
/// <reference types="node" />
import { IConfig, IHTag, ITag, IVariable, IFn2Path, ISysBase, IData4Vari, IPlugin, ILayerFactory, IMain } from './CmnInterface';
export declare class SysBase implements ISysBase {
    protected hPlg: {
        [name: string]: IPlugin;
    };
    protected $cur: string;
    hFactoryCls: {
        [name: string]: ILayerFactory;
    };
    constructor(hPlg?: {
        [name: string]: IPlugin;
    }, $cur?: string);
    readonly cur: string;
    fetch: (url: string) => Promise<Response>;
    resolution: number;
    loadPathAndVal(_hPathFn2Exts: IFn2Path, _fncLoaded: () => void, _cfg: IConfig): void;
    protected data: {
        sys: {};
        mark: {};
        kidoku: {};
    };
    initVal(_data: IData4Vari, _hTmp: any, _comp: (data: IData4Vari) => void): void;
    flush(): void;
    protected val: IVariable;
    protected appPixi: PIXI.Application;
    init(cfg: IConfig, hTag: IHTag, val: IVariable, appPixi: PIXI.Application, main: IMain): void;
    protected readonly close: ITag;
    protected readonly navigate_to: ITag;
    protected readonly title: ITag;
    protected tgl_full_scr: ITag;
    protected readonly window: ITag;
    protected readonly isApp: () => boolean;
    protected $path_desktop: string;
    readonly path_desktop: string;
    protected $path_userdata: string;
    readonly path_userdata: string;
    readonly existsSync: (_path: string) => boolean;
    readonly writeFile: (_file: string | number | Buffer, _data: any, _callback: (err: NodeJS.ErrnoException) => void) => void;
    readonly savePic: (_fn: string, _data_url: string) => void;
    readonly isDirectory: (_path: string) => boolean;
    readonly readdirSync: (_path: string, _options?: "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex" | {
        encoding: "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex" | null;
    } | null | undefined) => readonly string[];
    readonly appendFile: (_path: string, _data: any, _callback: (err: NodeJS.ErrnoException) => void) => void;
}
