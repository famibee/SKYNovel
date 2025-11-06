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
export type T_CFG_RAW = {
    book: {
        title: string;
        creator: string;
        cre_url: string;
        publisher: string;
        pub_url: string;
        detail: string;
        version: string;
    };
    save_ns?: string;
    window?: {
        width: number;
        height: number;
    };
    log?: {
        max_len: number;
    };
    init: {
        bg_color: string | number;
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
export type T_CFG = T_CFG_RAW & {
    save_ns: string;
    window: {
        width: number;
        height: number;
    };
    log: {
        max_len: number;
    };
};
export declare function creCFG(): T_CFG;
export type T_Exts = {
    ':cnt'?: number;
} & {
    [ext: string]: string;
};
export type T_Fn2Path = {
    [fn: string]: T_Exts;
};
export type T_SEARCHPATH = (fn: string, extptn?: SEARCH_PATH_ARG_EXT) => string;
export type T_Config = {
    oCfg: T_CFG;
    headNs: string;
    searchPath: T_SEARCHPATH;
    matchPath: (fnptn: string, extptn?: SEARCH_PATH_ARG_EXT) => readonly T_Exts[];
    addPath: (fn: string, h_exts: T_Exts) => void;
};
export type T_SysRoots = {
    dec(ext: string, tx: string): Promise<string>;
    decAB(ab: ArrayBuffer): Promise<HTMLImageElement | HTMLVideoElement | ArrayBuffer>;
    arg: T_HSysBaseArg;
    fetch(url: string): Promise<Response>;
    hash(str: string): string;
};
export type T_HSysBaseArg = {
    cur: string;
    crypto: boolean;
    dip?: string;
};
export declare class ConfigBase implements T_Config {
    #private;
    readonly sys: T_SysRoots;
    oCfg: T_CFG;
    userFnTail: string;
    protected hPathFn2Exts: T_Fn2Path;
    protected constructor(sys: T_SysRoots);
    protected load(oCfg: T_CFG_RAW): Promise<void>;
    get existsBreakline(): boolean;
    get existsBreakpage(): boolean;
    get headNs(): string;
    searchPath(fn: string, extptn?: SEARCH_PATH_ARG_EXT): string;
    matchPath(fnptn: string, extptn?: SEARCH_PATH_ARG_EXT): readonly T_Exts[];
    addPath(fn: string, h_exts: T_Exts): void;
}
//# sourceMappingURL=ConfigBase.d.ts.map