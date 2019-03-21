import { HArg } from './CmnInterface';
export declare function int(o: any): number;
export declare function uint(o: any): number;
export declare function trim(s: string): string;
export declare function getDateStr(spl_dd?: string, spl_dt?: string, spl_tt?: string, spl_ms?: string): string;
import { interaction, DisplayObject } from 'pixi.js';
import { EventListenerCtn } from './EventListenerCtn';
export interface IEvt2Fnc {
    (e: Event): void;
}
export interface IHEvt2Fnc {
    [name: string]: IEvt2Fnc;
}
export interface IEvtMng {
    button(hArg: HArg, em: DisplayObject): void;
    isSkipKeyDown(): boolean;
    stdWait(fnc: (e?: interaction.InteractionEvent) => void, canskip?: boolean): void;
    popLocalEvts(): IHEvt2Fnc;
    pushLocalEvts(a: IHEvt2Fnc): void;
    waitCustomEvent(hArg: HArg, elc: EventListenerCtn, fnc: () => void): void;
    resvFlameEvent(win: Window): void;
}
export declare class CmnLib {
    static stageW: number;
    static stageH: number;
    static devtool: boolean;
    static osName: string;
    static isRetina: boolean;
    static retinaRate: number;
    static argChk_Num(hash: any, name: string, def: number): number;
    static argChk_Boolean(hash: any, name: string, def: boolean): boolean;
    static readonly REG_TOKEN: RegExp;
    static readonly REG_TOKEN_NOTXT: RegExp;
    private static readonly REG_MULTILINE_TAG;
    private static readonly REG_MULTILINE_TAG_SPLIT;
    static cnvMultilineTag(txt: string): string;
    static splitAmpersand(token: string): object;
    static readonly REG_TAG: RegExp;
    static getFn: (path: string) => string;
    static getExt: (path: string) => string;
}
