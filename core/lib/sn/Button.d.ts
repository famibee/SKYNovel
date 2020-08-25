import { Container } from 'pixi.js';
import { IEvtMng } from './CmnLib';
import { HArg, IMain } from './CmnInterface';
import { Config } from './Config';
export declare class Button extends Container {
    private readonly main;
    private readonly evtMng;
    static fontFamily: string;
    private static cfg;
    static init(cfg: Config): void;
    constructor(main: IMain, evtMng: IEvtMng, hArg: HArg);
    isStop: boolean;
}
//# sourceMappingURL=Button.d.ts.map