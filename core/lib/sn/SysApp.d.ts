import { SysNode } from "./SysNode";
import { HArg, IHTag, IVariable, IData4Vari, IPlugin, IConfig, IMain } from './CmnInterface';
import { Application } from 'pixi.js';
export declare class SysApp extends SysNode {
    protected readonly hPlg: {
        [name: string]: IPlugin;
    };
    protected readonly arg: {
        cur: string;
    };
    constructor(hPlg?: {
        [name: string]: IPlugin;
    }, arg?: {
        cur: string;
    });
    protected readonly $path_desktop: string;
    protected readonly $path_userdata: string;
    protected readonly normalize: (src: string, form: string) => string;
    private readonly store;
    initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari) => void): void;
    private readonly dsp;
    flush(): void;
    private readonly win;
    private readonly wc;
    init(cfg: IConfig, hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): void;
    protected readonly close: () => boolean;
    protected readonly navigate_to: (hArg: HArg) => boolean;
    protected readonly title: (hArg: HArg) => boolean;
    protected readonly tgl_full_scr: (hArg: HArg) => boolean;
    protected readonly window: (hArg: HArg) => boolean;
}
