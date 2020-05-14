import { SysNode } from "./SysNode";
import { ITag, IHTag, IVariable, IData4Vari, IMain } from './CmnInterface';
import { Application } from 'pixi.js';
export declare class SysApp extends SysNode {
    constructor(hPlg?: {}, arg?: {
        cur: string;
        crypto: boolean;
        dip: string;
    });
    protected readonly $path_userdata: string;
    protected readonly $path_downloads: string;
    protected readonly normalize: (src: string, form: string) => string;
    initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari) => void): void;
    private isMovingWin;
    private posMovingWin;
    private delayWinPos;
    private readonly dsp;
    private readonly win;
    private readonly wc;
    init(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): void;
    protected readonly isPackaged: () => any;
    protected readonly close: () => boolean;
    protected readonly _export: ITag;
    protected readonly _import: ITag;
    protected readonly navigate_to: ITag;
    protected readonly title: ITag;
    protected readonly tgl_full_scr: ITag;
    protected readonly tgl_full_scr_sub: () => void;
    protected readonly update_check: ITag;
    protected readonly window: ITag;
}
