import { IHEvt2Fnc, IValMp } from './CmnInterface';
export interface ICallStackArg {
    ':resvToken'?: string;
    ':hEvt1Time': IHEvt2Fnc;
    ':hMp': IValMp;
    ':タグ名'?: string;
    ':lenIfStk': number;
}
export declare class CallStack {
    readonly fn: string;
    readonly idx: number;
    readonly csArg: ICallStackArg;
    constructor(fn?: string, idx?: number, csArg?: ICallStackArg);
    readonly toString: () => string;
}
//# sourceMappingURL=CallStack.d.ts.map