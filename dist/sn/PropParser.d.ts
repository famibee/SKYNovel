import { IPropParser, IVariable, T_VAL_DATA } from './CmnInterface';
export declare class PropParser implements IPropParser {
    #private;
    private readonly val;
    constructor(val: IVariable, ce?: string);
    parse(s: string): T_VAL_DATA;
    getValAmpersand: (val: string) => string;
    static getValName(arg_name: string): {
        [name: string]: string;
    } | null;
}
//# sourceMappingURL=PropParser.d.ts.map