import { IVariable } from './CmnInterface';
export interface IParse {
    (s: string): object;
}
export declare class PropParser {
    private readonly val;
    private parser;
    constructor(val: IVariable);
    readonly parse: IParse;
    private calc;
    private hFnc;
    private fncSub_ChkNum;
    private readonly REG_EMBEDVAR;
    private procEmbedVar;
    private static readonly REG_VAL;
    static getValName(arg_name: string): {
        [name: string]: string;
    } | undefined;
    private static getValName_B2D;
}
