export declare class AnalyzeTagArg {
    private readonly REG_TAGARG;
    go(args: string): void;
    private $hPrm;
    get hPrm(): {
        [name: string]: {
            val?: string | undefined;
            def?: string | undefined;
        };
    };
    private $isKomeParam;
    get isKomeParam(): boolean;
}
