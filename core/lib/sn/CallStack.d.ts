import { IHEvt2Fnc } from './CmnLib';
export interface ICallStackArg {
    csAnalyBf: {
        [name: string]: any;
    };
    resvToken?: string;
    hEvt1Time: IHEvt2Fnc;
    hMpVal?: {
        [name: string]: any;
    };
    タグ名?: string;
}
export declare class CallStack {
    private $fn;
    private $idx;
    private $hArg;
    constructor($fn?: string, $idx?: number, $hArg?: ICallStackArg | null);
    readonly fn: string;
    readonly idx: number;
    readonly hArg: ICallStackArg | null;
    readonly toString: () => string;
}
