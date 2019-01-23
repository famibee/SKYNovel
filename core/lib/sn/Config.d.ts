import { IConfig, IExts } from './CmnInterface';
import { SysBase } from './SysBase';
export declare class Config implements IConfig {
    private sys;
    oCfg: any;
    userFnTail: string;
    private hPathFn2Exts;
    getJsonSearchPath: () => string;
    static EXT_SPRITE: string;
    static EXT_SCRIPT: string;
    static EXT_FONT: string;
    static EXT_SOUND: string;
    constructor(sys: SysBase, fncLoaded: () => void, oCfg4tst?: any);
    private $existsBreakline;
    readonly existsBreakline: boolean;
    private $existsBreakpage;
    readonly existsBreakpage: boolean;
    getNs(): string;
    searchPath(fn: string, extptn?: string): string;
    matchPath(fnptn: string, extptn?: string): IExts[];
}
