export declare const enum SEARCH_PATH_ARG_EXT {
    DEFAULT = "",
    SP_GSM = "png|jpg|jpeg|json|svg|webp|mp4|webm",
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
export type T_CFG = {
    book: {
        title: string;
        creator: string;
        cre_url: string;
        publisher: string;
        pub_url: string;
        detail: string;
        version: string;
    };
    save_ns: string;
    window: {
        width: number;
        height: number;
    };
    log: {
        max_len: number;
    };
    init: {
        bg_color: string;
        tagch_msecwait: number;
        auto_msecpagewait: number;
        escape: string;
    };
    debug: {
        devtool: boolean;
        dumpHtm: boolean;
        token: boolean;
        tag: boolean;
        putCh: boolean;
        debugLog: boolean;
        baseTx: boolean;
        masume: boolean;
        variable: boolean;
    };
    code: {
        [fold_nm: string]: boolean;
    };
    debuger_token: string;
};
export declare const DEF_CFG: T_CFG;
export interface IExts {
    [ext: string]: string;
}
export interface IFn2Path {
    [fn: string]: IExts;
}
export type T_SEARCHPATH = (fn: string, extptn?: SEARCH_PATH_ARG_EXT) => string;
export interface IConfig {
    oCfg: T_CFG;
    getNs(): string;
    searchPath: T_SEARCHPATH;
    matchPath(fnptn: string, extptn?: SEARCH_PATH_ARG_EXT): ReadonlyArray<IExts>;
    addPath(fn: string, h_exts: IExts): void;
}
export interface ISysRoots {
    loadPath(hPathFn2Exts: IFn2Path, cfg: IConfig): Promise<void>;
    dec(ext: string, tx: string): Promise<string>;
    decAB(ab: ArrayBuffer): Promise<HTMLImageElement | HTMLVideoElement | ArrayBuffer>;
    arg: HSysBaseArg;
    fetch(url: string): Promise<Response>;
    hash(str: string): string;
}
export type HSysBaseArg = {
    cur: string;
    crypto: boolean;
    dip: string;
};
export declare class ConfigBase implements IConfig {
    #private;
    readonly sys: ISysRoots;
    oCfg: T_CFG;
    userFnTail: string;
    protected hPathFn2Exts: IFn2Path;
    protected constructor(sys: ISysRoots);
    protected load(oCfg: T_CFG): Promise<void>;
    get existsBreakline(): boolean;
    get existsBreakpage(): boolean;
    getNs(): string;
    searchPath(fn: string, extptn?: SEARCH_PATH_ARG_EXT): string;
    matchPath(fnptn: string, extptn?: SEARCH_PATH_ARG_EXT): ReadonlyArray<IExts>;
    addPath(fn: string, h_exts: IExts): void;
}
//# sourceMappingURL=ConfigBase.d.ts.map