/// <reference types="node" />
import { SysBase } from "./SysBase";
import { IConfig, ITag, IFn2Path, IData4Vari, IPlugin } from './CmnInterface';
export declare class SysWeb extends SysBase {
    constructor(hPlg?: {
        [name: string]: IPlugin;
    }, arg?: {
        cur: string;
        crypt: boolean;
        dip: string;
    });
    private def_prj;
    private readonly run;
    private now_prj;
    private main;
    loadPathAndVal(hPathFn2Exts: IFn2Path, fncLoaded: () => void, cfg: IConfig): void;
    private ns;
    initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari) => void): void;
    private flushSub;
    flush(): void;
    protected readonly navigate_to: ITag;
    protected readonly title: ITag;
    private readonly isFullScr;
    private regEvt_FullScr;
    private resizeFramesWork;
    readonly readFile: (path: string, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void) => void;
    readonly savePic: (fn: string, data_url: string) => void;
}
