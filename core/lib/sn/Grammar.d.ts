import { Script, HArg } from './CmnInterface';
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
    static splitAmpersand(token: string): object;
    static readonly REG_TAG: RegExp;
}
