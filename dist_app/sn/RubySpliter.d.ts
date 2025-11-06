import { TArg } from './Grammar';
import { T_PutCh } from './CmnInterface';
export type IAutoPage = (idx: number, str: string) => void;
export declare class RubySpliter {
    #private;
    static setting(hArg: TArg): void;
    static getSesame(): string;
    static destroy(): void;
    init(putCh: T_PutCh): void;
    static setEscape(ce: string): void;
    putTxt(text: string): void;
    putTxtRb(text: string, ruby: string): void;
}
//# sourceMappingURL=RubySpliter.d.ts.map