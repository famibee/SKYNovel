import { IHEvt2Fnc, IValMp } from './CmnInterface';
export interface ICallStackArg {
    resvToken?: string;
    hEvt1Time: IHEvt2Fnc;
    hMp: IValMp;
    タグ名?: string;
}
export declare class CallStack {
    private readonly $fn;
    private readonly $idx;
    private readonly $hArg;
    constructor($fn?: string, $idx?: number, $hArg?: ICallStackArg | null);
    get fn(): string;
    get idx(): number;
    get csArg(): ICallStackArg | null;
    readonly toString: () => string;
}
//# sourceMappingURL=CallStack.d.ts.map