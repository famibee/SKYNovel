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
    putTxt(text: string): void;
    putTxtRb(text: string, ruby: string): void;
    private static REG_TAB_G;
    static destroy(): void;
}
