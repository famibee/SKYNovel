export interface PRM {
    val: string;
    def?: string;
}
export interface HPRM {
    [key: string]: PRM;
}
export interface PRM_RANGE {
    k_ln: number;
    k_ch: number;
    v_ln: number;
    v_ch: number;
    v_len: number;
}
export declare class AnalyzeTagArg {
    #private;
    parse(args: string): void;
    parseinDetail(token: string, lenNm: number, ln: number, ch: number): {
        [key: string]: PRM_RANGE;
    };
    get hPrm(): HPRM;
    get isKomeParam(): boolean;
}
//# sourceMappingURL=AnalyzeTagArg.d.ts.map