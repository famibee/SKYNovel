import { HArg, IPutCh } from './CmnInterface';
export interface IAutoPage {
    (idx: number, str: string): void;
}
export declare class RubySpliter {
    private static sesame;
    setting(hArg: HArg): void;
    getSesame(): string;
    private putCh;
    init(putCh: IPutCh): void;
    private static REG_RUBY;
    static setEscape(ce: string): void;
    putTxt(text: string): void;
    private putTxtRb;
    private static readonly REG_TAB_G;
    static destroy(): void;
}
//# sourceMappingURL=RubySpliter.d.ts.map