import { SysNode } from "./SysNode";
import { HArg, IHTag, IVariable, IData4Vari, IPlugin, IConfig, IMain } from './CmnInterface';
import { Application } from 'pixi.js';
export declare class SysApp extends SysNode {
    constructor(hPlg?: {
        [name: string]: IPlugin;
    }, arg?: {
        cur: string;
        crypt: boolean;
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
    init(cfg: IConfig, hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): void;
    protected readonly close: () => boolean;
    protected readonly navigate_to: (hArg: HArg) => boolean;
    protected readonly title: (hArg: HArg) => boolean;
    protected readonly tgl_full_scr: (hArg: HArg) => boolean;
    protected readonly tgl_full_scr_sub: () => void;
    protected readonly update_check: (hArg: HArg) => boolean;
    protected readonly window: (hArg: HArg) => boolean;
}
