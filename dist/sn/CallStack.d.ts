import { IHEvt2Fnc, IValMp } from './CmnInterface';
export interface ICallStackArg {
    ':resvToken'?: string;
    ':hEvt1Time': IHEvt2Fnc;
    ':hMp': IValMp;
    ':タグ名'?: string;
}
export declare class CallStack {
    private readonly $fn;
    private readonly $idx;
    private readonly $csArg;
    constructor($fn?: string, $idx?: number, $csArg?: ICallStackArg);
    get fn(): string;
    get idx(): number;
    get csArg(): ICallStackArg;
    readonly toString: () => string;
}
//# sourceMappingURL=CallStack.d.ts.map