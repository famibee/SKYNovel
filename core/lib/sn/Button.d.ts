import { Container } from "pixi.js";
import { IEvtMng } from "./CmnLib";
import { HArg, IMain } from "./CmnInterface";
export declare class Button extends Container {
    private readonly main;
    private readonly evtMng;
    static fontFamily: string;
    constructor(main: IMain, evtMng: IEvtMng, hArg: HArg);
    isStop: boolean;
    private static cln;
    private static s2hStyle;
}
