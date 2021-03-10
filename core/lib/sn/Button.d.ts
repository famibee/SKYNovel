import { Container, Text, Sprite } from 'pixi.js';
import { IEvtMng } from './CmnLib';
import { HArg } from './CmnInterface';
import { Config } from './Config';
import { IMakeDesignCast } from './LayerMng';
export declare class Button extends Container {
    private readonly hArg;
    private readonly evtMng;
    readonly resolve: () => void;
    private readonly canFocus;
    static fontFamily: string;
    private static procMasume4txt;
    private static procMasume4pic;
    static init(cfg: Config): void;
    private idc;
    private sp_b_pic;
    private sp_pic;
    constructor(hArg: HArg, evtMng: IEvtMng, resolve: () => void, canFocus: () => boolean);
    makeDesignCast(_gdc: IMakeDesignCast): void;
    showDesignCast(): void;
    cvsResize(): void;
    update_b_pic(fn: string, txt: Text): void;
    private loaded_b_pic;
    update_pic(fn: string, sp: Sprite): void;
    private loaded_pic;
}
//# sourceMappingURL=Button.d.ts.map