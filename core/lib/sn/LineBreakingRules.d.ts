import { IPutCh, HArg } from './CmnInterface';
export declare class LineBreakingRules {
    private max_col;
    private bura_col;
    private max_row;
    private putCh;
    init(putCh: IPutCh): void;
    setting(hArg: HArg): void;
    input: IPutCh;
}
