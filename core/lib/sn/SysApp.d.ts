import { SysNode } from './SysNode';
import { ITag, IHTag, IVariable, IData4Vari, IMain, HPlugin, HSysBaseArg } from './CmnInterface';
import { Application } from 'pixi.js';
export declare class SysApp extends SysNode {
    constructor(hPlg?: {}, arg?: {
        cur: string;
        crypto: boolean;
        dip: string;
    });
    protected loaded(hPlg: HPlugin, arg: HSysBaseArg): Promise<void>;
    private hInfo;
    protected readFileSync: (path: string) => Promise<string>;
    protected writeFileSync: (path: string, data: Buffer, o?: object | undefined) => Promise<void>;
    appendFile: (path: string, data: string, callback: (err: Error) => void) => Promise<void>;
    ensureFileSync: (path: string) => Promise<void>;
    protected $path_userdata: string;
    protected $path_downloads: string;
    initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari) => void): void;
    private main;
    protected run(): Promise<void>;
    init(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): Promise<void>[];
    copyBMFolder: (from: number, to: number) => Promise<void>;
    eraseBMFolder: (place: number) => Promise<void>;
    protected readonly close: () => boolean;
    protected readonly _export: ITag;
    protected readonly _import: ITag;
    protected readonly navigate_to: ITag;
    protected titleSub(title: string): void;
    protected readonly tgl_full_scr: ITag;
    protected readonly tgl_full_scr_sub: () => Promise<void>;
    protected readonly update_check: ITag;
    protected readonly window: ITag;
}
//# sourceMappingURL=SysApp.d.ts.map