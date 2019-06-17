/// <reference types="node" />
import { SysBase } from "./SysBase";
import { IConfig, HArg, IFn2Path, IData4Vari, IPlugin } from './CmnInterface';
export declare class SysWeb extends SysBase {
    protected readonly hPlg: {
        [name: string]: IPlugin;
    };
    protected arg: {
        cur: string;
    };
    constructor(hPlg?: {
        [name: string]: IPlugin;
    }, arg?: {
        cur: string;
    });
    private def_prj;
    private readonly run;
    private now_prj;
    private main;
    loadPathAndVal(hPathFn2Exts: IFn2Path, fncLoaded: () => void, cfg: IConfig): void;
    private ns;
    private sys;
    initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari) => void): void;
    flush(): void;
    protected readonly navigate_to: (hArg: HArg) => boolean;
    protected readonly title: (hArg: HArg) => boolean;
    private regEvt_FullScr;
    readonly readFile: (path: string, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void) => void;
    readonly savePic: (fn: string, data_url: string) => void;
}
