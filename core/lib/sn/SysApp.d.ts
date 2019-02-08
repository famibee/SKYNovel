/// <reference types="pixi.js" />
import { SysNode } from "./SysNode";
import { HArg, IHTag, IVariable, IData4Vari, IPlugin, IConfig, IMain } from './CmnInterface';
export declare class SysApp extends SysNode {
    protected hPlg: {
        [name: string]: IPlugin;
    };
    constructor(hPlg?: {
        [name: string]: IPlugin;
    });
    protected $path_desktop: string;
    protected $path_userdata: string;
    protected normalize: (src: string, form: string) => string;
    private store;
    initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari) => void): void;
    private dsp;
    flush(): void;
    private win;
    private wc;
    init(cfg: IConfig, hTag: IHTag, val: IVariable, appPixi: PIXI.Application, main: IMain): void;
    protected close: () => boolean;
    protected navigate_to: (hArg: HArg) => boolean;
    protected title: (hArg: HArg) => boolean;
    protected tgl_full_scr: (hArg: HArg) => boolean;
    protected window: (hArg: HArg) => boolean;
}
