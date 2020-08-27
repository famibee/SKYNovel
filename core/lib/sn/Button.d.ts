import { Container } from 'pixi.js';
import { IEvtMng } from './CmnLib';
import { HArg, IMain } from './CmnInterface';
import { Config } from './Config';
export declare class Button extends Container {
    readonly main: IMain;
    readonly evtMng: IEvtMng;
    readonly hArg: HArg;
    readonly cfg: Config;
    readonly canFocus: () => boolean;
    static fontFamily: string;
    constructor(main: IMain, evtMng: IEvtMng, hArg: HArg, cfg: Config, canFocus: () => boolean);
    isStop: boolean;
}
//# sourceMappingURL=Button.d.ts.map