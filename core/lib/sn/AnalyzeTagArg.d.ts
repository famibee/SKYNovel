export declare class AnalyzeTagArg {
    private static readonly REG_TAGARG;
    go(args: string): boolean;
    private static readonly REG_TAGARG_VAL;
    goVal(args: string): void;
    private $hPrm;
    get hPrm(): any;
    private $isKomeParam;
    get isKomeParam(): boolean;
    private $literal;
    get literal(): string;
}
