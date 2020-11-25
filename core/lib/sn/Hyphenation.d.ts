import { IChRect } from './CmnInterface';
export declare class Hyphenation {
    private static reg行頭禁則;
    private static reg行末禁則;
    private static reg分割禁止;
    init4tst(cr: IChRect[]): void;
    private htmTxt;
    private ox;
    private oy;
    private tategaki;
    init(htmTxt: HTMLSpanElement, tategaki: boolean, lh_half: number): void;
    aRect: IChRect[];
    go(): void;
    private getChRects;
    private lh_half;
    set_lh_half(lh_half: number): void;
    private getChRects_base;
}
//# sourceMappingURL=Hyphenation.d.ts.map