export interface PRM {
    val?: string;
    def?: string;
}
export interface HPRM {
    [name: string]: PRM;
}
export declare class AnalyzeTagArg {
    private readonly REG_TAGARG;
    go(args: string): void;
    private $hPrm;
    get hPrm(): HPRM;
    private $isKomeParam;
    get isKomeParam(): boolean;
}
//# sourceMappingURL=AnalyzeTagArg.d.ts.map