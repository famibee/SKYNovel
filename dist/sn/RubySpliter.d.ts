import { HArg } from './Grammar';
import { IPutCh } from './CmnInterface';
export type IAutoPage = (idx: number, str: string) => void;
export declare class RubySpliter {
    #private;
    static setting(hArg: HArg): void;
    static getSesame(): string;
    static destroy(): void;
    init(putCh: IPutCh): void;
    static setEscape(ce: string): void;
    putTxt(text: string): void;
    putTxtRb(text: string, ruby: string): void;
}
//# sourceMappingURL=RubySpliter.d.ts.map