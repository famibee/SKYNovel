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
    pivot_x: number;
    pivot_y: number;
    width: number;
    x: number;
    y: number;
};
export declare function cnvTweenArg(hArg: HArg, lay: any): {};
export declare function initStyle(): void;
export declare function addStyle(style: string): void;
import { DisplayObject } from 'pixi.js';
export interface IEvtMng {
    button(hArg: HArg, em: DisplayObject, normal: () => void, hover: () => boolean, clicked: () => void): void;
    isSkipKeyDown(): boolean;
    waitEvent(fnc: () => void, canskip?: boolean, global?: boolean): boolean;
    popLocalEvts(): IHEvt2Fnc;
    pushLocalEvts(a: IHEvt2Fnc): void;
    waitLimitedEvent(hArg: HArg, fnc: () => void): boolean;
    resvFlameEvent(win: Window): void;
}
export declare function argChk_Num(hash: any, name: string, def: number): number;
export declare function argChk_Boolean(hash: any, name: string, def: boolean): boolean;
export declare function getFn(p: string): string;
export declare function getExt(p: string): string;
export declare class CmnLib {
    static stageW: number;
    static stageH: number;
    static ofsPadLeft_Dom2PIXI: number;
    static ofsPadTop_Dom2PIXI: number;
    static cvsWidth: number;
    static cvsHeight: number;
    static cvsScale: number;
    static debugLog: boolean;
    static isSafari: boolean;
    static isFirefox: boolean;
    static isMac: boolean;
    static isMobile: boolean;
    static hDip: {
        [name: string]: string;
    };
    static isDbg: boolean;
    static isPackaged: boolean;
    static isRetina: boolean;
    static isDarkMode: boolean;
    static retinaRate: number;
    static readonly SN_ID = "skynovel";
    static cvsResize(cvs: HTMLCanvasElement): boolean;
}
//# sourceMappingURL=CmnLib.d.ts.map