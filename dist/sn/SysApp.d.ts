import { SysNode } from './SysNode';
import { IHTag, ITag } from './Grammar';
import { IVariable, IData4Vari, IMain, HPlugin, HSysBaseArg } from './CmnInterface';
import { Application } from 'pixi.js';
export declare class SysApp extends SysNode {
    #private;
    constructor(hPlg?: {}, arg?: {
        cur: string;
        crypto: boolean;
        dip: string;
    });
    protected loaded(hPlg: HPlugin, arg: HSysBaseArg): Promise<void>;
    protected readFileSync: any;
    protected writeFileSync: any;
    appendFile: any;
    ensureFileSync: any;
    protected $path_userdata: string;
    protected $path_downloads: string;
    initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari) => void): void;
    protected run(): Promise<void>;
    init(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): Promise<void>[];
    cvsResize(): void;
    copyBMFolder: (from: number, to: number) => Promise<void>;
    eraseBMFolder: (place: number) => Promise<void>;
    protected readonly close: () => boolean;
    protected readonly _export: () => boolean;
    protected readonly _import: () => boolean;
    protected readonly navigate_to: ITag;
    protected titleSub(title: string): void;
    protected readonly tglFlscr_sub: () => Promise<any>;
    protected readonly update_check: ITag;
    protected readonly window: ITag;
    readonly canCapturePage: (fn: string) => boolean;
}
//# sourceMappingURL=SysApp.d.ts.map