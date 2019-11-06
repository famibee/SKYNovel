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
    private readonly $fn;
    private readonly $idx;
    private readonly $hArg;
    constructor($fn?: string, $idx?: number, $hArg?: ICallStackArg | null);
    get fn(): string;
    get idx(): number;
    get hArg(): ICallStackArg | null;
    readonly toString: () => string;
}
