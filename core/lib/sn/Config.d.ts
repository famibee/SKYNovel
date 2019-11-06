import { IConfig, IExts } from './CmnInterface';
import { SysBase } from './SysBase';
export declare class Config implements IConfig {
    private readonly sys;
    oCfg: any;
    userFnTail: string;
    private hPathFn2Exts;
    readonly getJsonSearchPath: () => string;
    static readonly EXT_SPRITE = "png_|jpg_|jpeg_|json_|svg_|mp4_|png|jpg|jpeg|svg|json|mp4";
    static readonly EXT_SCRIPT = "sn_|sn";
    static readonly EXT_FONT = "woff2|otf|ttf";
    static readonly EXT_SOUND = "mp3_|mp3|m4a_|m4a|ogg_|ogg|aac_|aac|webm_|webm|flac_|flac|wav";
    constructor(sys: SysBase, fncLoaded: () => void, oCfg4tst?: any);
    private $existsBreakline;
    get existsBreakline(): boolean;
    private $existsBreakpage;
    get existsBreakpage(): boolean;
    getNs(): string;
    searchPath(fn: string, extptn?: string): string;
    matchPath(fnptn: string, extptn?: string): ReadonlyArray<IExts>;
}
