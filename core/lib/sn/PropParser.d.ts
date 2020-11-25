import { IPropParser, IVariable } from './CmnInterface';
export declare class PropParser implements IPropParser {
    private readonly val;
    private parser;
    constructor(val: IVariable);
    parse(s: string): any;
    private calc;
    private hFnc;
    private fncSub_ChkNum;
    private readonly REG_EMBEDVAR;
    private procEmbedVar;
    getValAmpersand: (val: string) => string;
    private static readonly REG_VAL;
    static getValName(arg_name: string): {
        [name: string]: string;
    } | undefined;
    private static getValName_B2D;
}
//# sourceMappingURL=PropParser.d.ts.map