import { SysBase } from "./SysBase";
import { IConfig, IPathFn2Exts, IData4Vari, IPlugin } from './CmnInterface';
export declare class SysMob extends SysBase {
    protected hPlg: {
        [name: string]: IPlugin;
    };
    protected $cur: string;
    constructor(hPlg?: {
        [name: string]: IPlugin;
    }, $cur?: string);
    loadPathAndVal(hPathFn2Exts: IPathFn2Exts, fncLoaded: () => void, _cfg: IConfig): void;
    fetch: (url: string) => Promise<Response>;
    private sys;
    initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari) => void): void;
    flush(): void;
    readFile: (path: string, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void) => void;
}
