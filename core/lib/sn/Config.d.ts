import { IConfig, IExts } from './CmnInterface';
import { SysBase } from './SysBase';
export declare class Config implements IConfig {
    private readonly sys;
    oCfg: any;
    userFnTail: string;
    private hPathFn2Exts;
    readonly getJsonSearchPath: () => string;
    static readonly EXT_SPRITE = "png|jpg|jpeg|json|svg|webp|mp4|webm";
    static readonly EXT_SCRIPT = "sn";
    static readonly EXT_FONT = "woff2|otf|ttf";
    static readonly EXT_SOUND = "mp3|m4a|ogg|aac|flac|wav";
    static readonly EXT_HTML = "htm|html";
    constructor(sys: SysBase, fncLoaded: () => void, oCfg4tst?: any);
    private $existsBreakline;
    get existsBreakline(): boolean;
    private $existsBreakpage;
    get existsBreakpage(): boolean;
    getNs(): string;
    searchPath(fn: string, extptn?: string): string;
    matchPath(fnptn: string, extptn?: string): ReadonlyArray<IExts>;
}
