import { Container } from 'pixi.js';
import { IEvtMng } from './CmnLib';
import { HArg } from './CmnInterface';
import { Config } from './Config';
export declare class Button extends Container {
    readonly hArg: HArg;
    readonly evtMng: IEvtMng;
    readonly cfg: Config;
    readonly resolve: () => void;
    readonly canFocus: () => boolean;
    static fontFamily: string;
    constructor(hArg: HArg, evtMng: IEvtMng, cfg: Config, resolve: () => void, canFocus: () => boolean);
}
//# sourceMappingURL=Button.d.ts.map