import { Container } from 'pixi.js';
import { IEvtMng } from './CmnLib';
import { HArg } from './CmnInterface';
import { Config } from './Config';
import { IGenerateDesignCast } from './LayerMng';
export declare class Button extends Container {
    readonly hArg: HArg;
    readonly evtMng: IEvtMng;
    readonly resolve: () => void;
    readonly canFocus: () => boolean;
    static fontFamily: string;
    private static procMasume4txt;
    private static procMasume4pic;
    static init(cfg: Config): void;
    private idc;
    constructor(hArg: HArg, evtMng: IEvtMng, resolve: () => void, canFocus: () => boolean);
    drawDesignCast(gdc: IGenerateDesignCast): void;
}
//# sourceMappingURL=Button.d.ts.map