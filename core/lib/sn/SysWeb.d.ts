/// <reference types="node" />
import { SysBase } from "./SysBase";
import { IConfig, IHTag, IVariable, IMain, ITag, IFn2Path, IData4Vari } from './CmnInterface';
import { Application } from 'pixi.js';
import 'devtools-detect';
export declare class SysWeb extends SysBase {
    private path_base;
    constructor(hPlg?: {}, arg?: {
        cur: string;
        crypto: boolean;
        dip: string;
    });
    private regEvt_FullScr;
    private resizeFramesWork;
    private readonly isFullScr;
    private now_prj;
    runSN(prj: string): void;
    private readonly run;
    stop(): void;
    private main;
    loadPathAndVal(hPathFn2Exts: IFn2Path, fncLoaded: () => void, cfg: IConfig): void;
    initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari) => void): void;
    init(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): void;
    protected readonly _export: ITag;
    protected readonly _import: ITag;
    protected readonly navigate_to: ITag;
    protected titleSub(txt: string): void;
    readonly readFile: (path: string, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void) => void;
    readonly savePic: (fn: string, data_url: string) => void;
    private readonly hAppendFile;
    readonly appendFile: (path: string, data: any, _callback: (err: NodeJS.ErrnoException) => void) => void;
}
//# sourceMappingURL=SysWeb.d.ts.map