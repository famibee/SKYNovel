/// <reference types="node" />
import { SysBase } from "./SysBase";
import { IConfig, IFn2Path, IData4Vari, IPlugin } from './CmnInterface';
export declare class SysMob extends SysBase {
    protected hPlg: {
        [name: string]: IPlugin;
    };
    protected $cur: string;
    constructor(hPlg?: {
        [name: string]: IPlugin;
    }, $cur?: string);
    loadPathAndVal(hPathFn2Exts: IFn2Path, fncLoaded: () => void, _cfg: IConfig): void;
    fetch: (url: string) => Promise<Response>;
    private sys;
    initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari) => void): void;
    flush(): void;
    readFile: (path: string, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void) => void;
}
