import { SysNode } from "./SysNode";
import { ITag, IHTag, IVariable, IData4Vari, IConfig, IMain } from './CmnInterface';
import { Application } from 'pixi.js';
export declare class SysApp extends SysNode {
    constructor(hPlg?: {}, arg?: {
        cur: string;
        crypt: boolean;
        dip: string;
    });
    protected readonly $path_desktop: string;
    protected readonly $path_userdata: string;
    protected readonly normalize: (src: string, form: string) => string;
    private readonly store;
    initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari) => void): void;
    private isMovingWin;
    private posMovingWin;
    private delayWinPos;
    private readonly dsp;
    flush(): void;
    private readonly win;
    private readonly wc;
    private cfg;
    init(cfg: IConfig, hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): void;
    protected readonly close: () => boolean;
    protected readonly navigate_to: ITag;
    protected readonly title: ITag;
    protected readonly tgl_full_scr: ITag;
    protected readonly tgl_full_scr_sub: () => void;
    protected readonly update_check: ITag;
    protected readonly window: ITag;
}
