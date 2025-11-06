import { T_HEvt2Fnc } from './CmnInterface';
import { TArg } from './Grammar';
export type T_H_VAL_MP = {
    'const.sn.macro': string;
    'const.sn.me_call_scriptFn': string;
};
export declare function creMP(): T_H_VAL_MP;
export type ICallStackArg = TArg & {
    ':resvToken'?: string;
    ':hEvt1Time'?: T_HEvt2Fnc;
    ':hMp': T_H_VAL_MP;
    ':タグ名'?: string;
    ':lenIfStk': number;
};
export declare function creCSArg(): ICallStackArg;
export declare class CallStack {
    readonly fn: string;
    readonly idx: number;
    readonly csArg: ICallStackArg;
    constructor(fn?: string, idx?: number, csArg?: ICallStackArg);
    readonly toString: () => string;
}
//# sourceMappingURL=CallStack.d.ts.map