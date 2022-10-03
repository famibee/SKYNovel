export interface PRM {
    val: string;
    def?: string;
}
export interface HPRM {
    [name: string]: PRM;
}
export declare class AnalyzeTagArg {
    #private;
    go(args: string): void;
    get hPrm(): HPRM;
    get isKomeParam(): boolean;
}
//# sourceMappingURL=AnalyzeTagArg.d.ts.map