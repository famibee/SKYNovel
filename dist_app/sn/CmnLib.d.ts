import { HArg } from './Grammar';
import { Container } from 'pixi.js';
export declare function int(o: unknown): number;
export declare function uint(o: unknown): number;
export declare function getDateStr(spl_dd?: string, spl_dt?: string, spl_tt?: string, spl_ms?: string): string;
export declare function initStyle(): void;
export declare function addStyle(style: string): void;
export declare const EVNM_BUTTON = "pointerdown";
export declare const EVNM_CLICK = "pointerdown";
export declare const EVNM_KEY = "keydown";
export type IEvtMng = {
    button(hArg: HArg, ctnBtn: Container, normal: () => void, hover: () => boolean, clicked: () => void): void;
    unButton(em: Container): void;
    get isSkipping(): boolean;
    hideHint(): void;
    cvsResize(): void;
    resvFlameEvent(body: HTMLBodyElement): void;
};
type T_HASH_Arg = {
    [name: string]: any;
};
export declare function argChk_Num(hash: T_HASH_Arg, name: string, def: number): number;
export declare function argChk_Boolean(hash: T_HASH_Arg, name: string, def: boolean): boolean;
export declare function parseColor(v: string): number;
export declare function argChk_Color(hash: T_HASH_Arg, name: string, def: number): number;
export declare function mesErrJSON(hArg: HArg, nm?: string, mes?: string): string;
export declare function getFn(p: string): string;
export type T_DIP = {
    [name: string]: string;
};
export declare class CmnLib {
    static stageW: number;
    static stageH: number;
    static debugLog: boolean;
    static readonly isSafari: boolean;
    static readonly isFirefox: boolean;
    static readonly isMac: boolean;
    static readonly isMobile: boolean;
    static hDip: T_DIP;
    static isDbg: boolean;
    static isPackaged: boolean;
    static isDarkMode: boolean;
    static cc4ColorName: CanvasRenderingContext2D;
}
export {};
//# sourceMappingURL=CmnLib.d.ts.map