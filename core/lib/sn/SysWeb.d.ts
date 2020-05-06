/// <reference types="node" />
import { SysBase } from "./SysBase";
import { IConfig, IHTag, IVariable, IMain, ITag, IFn2Path, IData4Vari } from './CmnInterface';
import { Application } from 'pixi.js';
import 'devtools-detect';
export declare class SysWeb extends SysBase {
    constructor(hPlg?: {}, arg?: {
        cur: string;
        crypto: boolean;
        dip: string;
    });
    private def_prj;
    readonly run: (prj: string) => Promise<void>;
    stop(): void;
    private now_prj;
    private main;
    loadPathAndVal(hPathFn2Exts: IFn2Path, fncLoaded: () => void, cfg: IConfig): void;
    initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari) => void): void;
    init(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): void;
    protected readonly _export: ITag;
    protected readonly _import: ITag;
    protected readonly navigate_to: ITag;
    protected readonly title: ITag;
    private readonly isFullScr;
    private regEvt_FullScr;
    private resizeFramesWork;
    readonly readFile: (path: string, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void) => void;
    readonly savePic: (fn: string, data_url: string) => void;
    private readonly hAppendFile;
    readonly appendFile: (path: string, data: any, _callback: (err: NodeJS.ErrnoException) => void) => void;
}
