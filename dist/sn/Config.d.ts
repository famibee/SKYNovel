import { IConfig, IExts, IFn2Path, T_CFG } from './CmnInterface';
import { SysBase } from './SysBase';
export declare class Config implements IConfig {
    #private;
    readonly sys: SysBase;
    oCfg: T_CFG;
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