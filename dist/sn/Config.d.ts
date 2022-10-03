import { IConfig, IExts, IFn2Path, T_CFG } from './CmnInterface';
import { SysBase } from './SysBase';
export declare const enum SEARCH_PATH_ARG_EXT {
    DEFAULT = "",
    SPRITE = "png|jpg|jpeg|json|svg|webp|mp4|webm",
    SCRIPT = "sn|ssn",
    FONT = "woff2|woff|otf|ttf",
    SOUND = "mp3|m4a|ogg|aac|flac|wav",
    HTML = "htm|html",
    CSS = "css",
    SN = "sn",
    TST_PNGPNG_ = "png|png_",
    TST_HH = "hh",
    TST_EEE = "eee",
    TST_GGG = "ggg",
    TST_PNGXML = "png|xml"
}
export declare class Config implements IConfig {
    #private;
    readonly sys: SysBase;
    oCfg: T_CFG;
    userFnTail: string;
    hPathFn2Exts: IFn2Path;
    constructor(sys: SysBase);
    static generate(sys: SysBase): Promise<Config>;
    load(oCfg: any): Promise<void>;
    get existsBreakline(): boolean;
    get existsBreakpage(): boolean;
    getNs(): string;
    searchPath(path: string, extptn?: SEARCH_PATH_ARG_EXT): string;
    matchPath(fnptn: string, extptn?: SEARCH_PATH_ARG_EXT): ReadonlyArray<IExts>;
    addPath(fn: string, h_exts: IExts): void;
}
//# sourceMappingURL=Config.d.ts.map