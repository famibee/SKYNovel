import { IConfig, IExts, IFn2Path } from './CmnInterface';
import { SysBase } from './SysBase';
export declare class Config implements IConfig {
    #private;
    readonly sys: SysBase;
    oCfg: {
        save_ns: string;
        coder: {
            len: number;
        };
        window: {
            width: number;
            height: number;
        };
        book: {
            title: string;
            creator: string;
            cre_url: string;
            publisher: string;
            pub_url: string;
            detail: string;
            version: string;
        };
        log: {
            max_len: number;
        };
        init: {
            bg_color: number;
            tagch_msecwait: number;
            auto_msecpagewait: number;
            escape: string;
        };
        debug: {
            devtool: boolean;
            token: boolean;
            tag: boolean;
            putCh: boolean;
            debugLog: boolean;
            baseTx: boolean;
            masume: boolean;
            variable: boolean;
        };
        code: {};
        debuger_token: string;
    };
    userFnTail: string;
    hPathFn2Exts: IFn2Path;
    static readonly EXT_SPRITE = "png|jpg|jpeg|json|svg|webp|mp4|webm";
    static readonly EXT_SCRIPT = "sn|ssn";
    static readonly EXT_FONT = "woff2|woff|otf|ttf";
    static readonly EXT_SOUND = "mp3|m4a|ogg|aac|flac|wav";
    static readonly EXT_HTML = "htm|html";
    constructor(sys: SysBase);
    static generate(sys: SysBase): Promise<Config>;
    load(oCfg: any): Promise<void>;
    get existsBreakline(): boolean;
    get existsBreakpage(): boolean;
    getNs(): string;
    searchPath(path: string, extptn?: string): string;
    matchPath(fnptn: string, extptn?: string): ReadonlyArray<IExts>;
    addPath(fn: string, h_exts: IExts): void;
}
//# sourceMappingURL=Config.d.ts.map