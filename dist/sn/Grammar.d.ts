import { Script, HArg } from './CmnInterface';
export declare const REG_TAG: RegExp;
export declare function tagToken2Name_Args(token: string): [name: string, args: string];
export declare function tagToken2Name(token: string): string;
export declare function splitAmpersand(token: string): {
    name: string;
    text: string;
    cast: string | undefined;
};
export declare class Grammar {
    #private;
    constructor();
    REG_TOKEN: RegExp;
    setEscape(ce: string): void;
    matchToken(txt: string): RegExpMatchArray;
    bracket2macro(hArg: HArg, script: Script, idxToken: number): void;
    char2macro(hArg: HArg, hTag: HArg, script: Script, idxToken: number): void;
    addC2M(a: string, b: string): void;
    REG_TOKEN_NOTXT: RegExp;
    replaceScr_C2M_And_let_ml: (scr: Script, start_idx?: number) => void;
}
//# sourceMappingURL=Grammar.d.ts.map