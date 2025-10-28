import { HArg } from './Grammar';
import { Rectangle } from 'pixi.js';
export type IChRect = {
    ch: string;
    rect: Rectangle;
    elm: HTMLElement;
};
export type T_RP_Hyphenation = {
    行頭禁則?: string;
    行末禁則?: string;
    分割禁止?: string;
    ぶら下げ?: string;
    break_fixed: boolean;
    break_fixed_left: number;
    break_fixed_top: number;
    bura: boolean;
};
export declare class Hyphenation {
    #private;
    get 行頭禁則(): string;
    get 行末禁則(): string;
    get 分割禁止(): string;
    get ぶら下げ(): string;
    break_fixed: boolean;
    break_fixed_left: number;
    break_fixed_top: number;
    bura: boolean;
    lay(hArg: HArg): void;
    reNew(to: Hyphenation): void;
    record(): T_RP_Hyphenation;
    playback(hLay?: T_RP_Hyphenation): void;
    hyph(htmTxt: HTMLSpanElement, cnvRect: (rng: Range, ch: string) => Rectangle, tategaki: boolean, begin: number, bkHtm: string): [IChRect[], number];
    hyph_alg(a: IChRect[], p_i: number, p_ch: string, ii: number, ch: string): {
        cont: boolean;
        ins: number;
    };
    hyph_alg_bura(a: IChRect[], p_i: number, p_ch: string, i: number): {
        cont: boolean;
        ins: number;
    };
}
//# sourceMappingURL=Hyphenation.d.ts.map