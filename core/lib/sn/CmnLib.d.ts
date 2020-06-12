/// <reference types="platform" />
import { HArg, IHEvt2Fnc } from './CmnInterface';
export declare function int(o: any): number;
export declare function uint(o: any): number;
export declare function getDateStr(spl_dd?: string, spl_dt?: string, spl_tt?: string, spl_ms?: string): string;
export declare const hMemberCnt: {
    alpha: number;
    height: number;
    rotation: number;
    scale_x: number;
    scale_y: number;
    width: number;
    x: number;
    y: number;
};
export declare function cnvTweenArg(hArg: HArg, lay: any): {};
import { interaction, DisplayObject } from 'pixi.js';
import { EventListenerCtn } from './EventListenerCtn';
export interface IEvtMng {
    button(hArg: HArg, em: DisplayObject): void;
    isSkipKeyDown(): boolean;
    stdWait(fnc: (e?: interaction.InteractionEvent) => void, canskip?: boolean): void;
    popLocalEvts(): IHEvt2Fnc;
    pushLocalEvts(a: IHEvt2Fnc): void;
    waitCustomEvent(hArg: HArg, elc: EventListenerCtn, fnc: () => void): void;
    resvFlameEvent(win: Window): void;
}
export declare function argChk_Num(hash: any, name: string, def: number): number;
export declare function argChk_Boolean(hash: any, name: string, def: boolean): boolean;
export declare function getFn(path: string): string;
export declare function getExt(path: string): string;
export declare class CmnLib {
    static stageW: number;
    static stageH: number;
    static ofsPadLeft_Dom2PIXI: number;
    static ofsPadTop_Dom2PIXI: number;
    static cvsWidth: number;
    static cvsHeight: number;
    static cvsScale: number;
    static debugLog: boolean;
    static platform: {
        description?: string | undefined;
        layout?: string | undefined;
        manufacturer?: string | undefined;
        name?: string | undefined;
        prerelease?: string | undefined;
        product?: string | undefined;
        ua?: string | undefined;
        version?: string | undefined;
        os?: {
            architecture?: number | undefined;
            family?: string | undefined;
            version?: string | undefined;
            toString(): string;
        } | undefined;
        parse(ua: string): Platform;
        toString(): string;
    };
    static isSafari: boolean;
    static isFirefox: boolean;
    static isMac: boolean;
    static isMobile: boolean;
    static hDip: {
        [name: string]: string;
    };
    static isRetina: boolean;
    static isDarkMode: boolean;
    static retinaRate: number;
    static readonly SN_ID = "skynovel";
    static cvsResize(cvs: HTMLCanvasElement): boolean;
}
//# sourceMappingURL=CmnLib.d.ts.map