import { HArg } from './Grammar';
import { IHEvt2Fnc } from './CmnInterface';
import { Container } from 'pixi.js';
export declare function int(o: any): number;
export declare function uint(o: any): number;
export declare function getDateStr(spl_dd?: string, spl_dt?: string, spl_tt?: string, spl_ms?: string): string;
export declare function initStyle(): void;
export declare function addStyle(style: string): void;
export interface IEvtMng {
    button(hArg: HArg, ctnBtn: Container, normal: () => void, hover: () => boolean, clicked: () => void): void;
    unButton(em: Container): void;
    get isSkipping(): boolean;
    popLocalEvts(): IHEvt2Fnc;
    pushLocalEvts(a: IHEvt2Fnc): void;
    waitEvent(evnm: string, hArg: HArg, onFire: () => void): boolean;
    breakEvent(evnm: string): void;
    hideHint(): void;
    cvsResize(): void;
    resvFlameEvent(win: Window): void;
}
export declare function argChk_Num(hash: any, name: string, def: number): number;
export declare function argChk_Boolean(hash: any, name: string, def: boolean): boolean;
export declare function parseColor(v: string): number;
export declare function argChk_Color(hash: any, name: string, def: number): number;
export declare function mesErrJSON(hArg: HArg, nm?: string, mes?: string): string;
export declare function getFn(p: string): string;
export declare function getExt(p: string): string;
export declare class CmnLib {
    static stageW: number;
    static stageH: number;
    static debugLog: boolean;
    static readonly isSafari: boolean;
    static readonly isFirefox: boolean;
    static readonly isMac: boolean;
    static readonly isMobile: boolean;
    static hDip: {
        [name: string]: string;
    };
    static isDbg: boolean;
    static isPackaged: boolean;
    static isDarkMode: boolean;
    static cc4ColorName: CanvasRenderingContext2D;
}
//# sourceMappingURL=CmnLib.d.ts.map