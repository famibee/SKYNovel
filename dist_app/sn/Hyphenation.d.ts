import { HArg } from './Grammar';
import { Rectangle } from 'pixi.js';
export interface IChRect {
    ch: string;
    rect: Rectangle;
    elm: HTMLElement;
}
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
    record(): any;
    playback(hLay: any): void;
    hyph(htmTxt: HTMLSpanElement, cnvRect: (rng: Range, ch: string) => Rectangle, tategaki: boolean, begin: number, bkHtm: string): [IChRect[], number];
    hyph_alg(a: IChRect[], p_i: number, p_ch: string, i: number, ch: string): {
        cont: boolean;
        ins: number;
    };
    hyph_alg_bura(a: IChRect[], p_i: number, p_ch: string, i: number): {
        cont: boolean;
        ins: number;
    };
}
//# sourceMappingURL=Hyphenation.d.ts.map