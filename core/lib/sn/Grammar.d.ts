import { Script, HArg } from './CmnInterface';
export declare const REG_TAG: RegExp;
export declare function tagToken2Name_Args(token: string): [name: string, args: string];
export declare function tagToken2Name(token: string): string;
export declare function splitAmpersand(token: string): {
    name: string;
    text: string;
    cast: string | null;
};
export declare class Grammar {
    constructor();
    REG_TOKEN: RegExp;
    setEscape(ce: string): void;
    bracket2macro(hArg: HArg, script: Script, idxToken: number): void;
    char2macro(hArg: HArg, hTag: HArg, script: Script, idxToken: number): void;
    private REG_CANTC2M;
    private regC2M;
    private regStrC2M;
    private regStrC2M4not;
    addC2M(a: string, b: string): void;
    private hC2M;
    private REG_TOKEN_NOTXT;
    replaceScr_C2M_And_let_ml: (scr: Script, start_idx?: number) => void;
}
//# sourceMappingURL=Grammar.d.ts.map