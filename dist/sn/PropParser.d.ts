import { T_PropParser, T_Variable, T_VAL_DATA } from './CmnInterface';
export declare class PropParser implements T_PropParser {
    #private;
    private readonly val;
    constructor(val: T_Variable, ce?: string);
    parse(s: string): T_VAL_DATA;
    getValAmpersand: (val: string) => string;
    static getValName(arg_name: string): {
        [name: string]: string;
    } | null;
}
//# sourceMappingURL=PropParser.d.ts.map