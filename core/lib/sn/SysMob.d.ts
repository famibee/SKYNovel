/// <reference types="node" />
/// <reference types="mocha" />
import { SysBase } from "./SysBase";
import { IConfig, IFn2Path, IData4Vari, IPlugin } from './CmnInterface';
export declare class SysMob extends SysBase {
    constructor(hPlg?: {
        [name: string]: IPlugin;
    }, arg?: {
        cur: string;
        crypto: boolean;
        dip: string;
    });
    loadPathAndVal(hPathFn2Exts: IFn2Path, fncLoaded: () => void, cfg: IConfig): void;
    readonly fetch: (url: string) => Promise<Response>;
    private sys;
    initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari) => void): void;
    flush(): void;
    readonly readFile: (path: string, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void) => void;
}
