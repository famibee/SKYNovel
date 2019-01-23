import { IHEvt2Fnc } from './CmnLib';
export interface ICallStackArg {
    csAnalyBf: {
        [name: string]: any;
    };
    strReserveToken?: string;
    hEvt1Time: IHEvt2Fnc;
    hMpVal?: {
        [name: string]: any;
    };
    タグ名?: string;
}
export declare class CallStack {
    private _fn;
    private _idx;
    private _hArg;
    constructor(_fn?: string, _idx?: number, _hArg?: ICallStackArg | null);
    readonly fn: string;
    readonly idx: number;
    readonly hArg: ICallStackArg | null;
    toString(): string;
}
