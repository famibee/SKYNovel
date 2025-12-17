import { IEvtMng } from './CmnLib';
import { T_Variable, T_Main } from './CmnInterface';
import { Config } from './Config';
import { SysBase } from './SysBase';
import { TArg } from './Grammar';
export declare const BUF_BGM = "BGM";
export declare const BUF_SE = "SE";
export declare function xchgbuf({ buf: buf1, buf2 }: TArg): void;
export declare class SndBuf {
    #private;
    readonly hArg: TArg;
    readonly buf: string;
    readonly fn: string;
    readonly procID: string;
    readonly join: boolean;
    private readonly start_ms;
    private readonly end_ms;
    readonly ret_ms: number;
    readonly loop: boolean;
    private readonly pan;
    static init(cfg: Config, $val: T_Variable, main: T_Main, sys: SysBase, $getSndBuf: (buf: string) => SndBuf | undefined): void;
    static setEvtMng($evtMng: IEvtMng): void;
    static readonly generate: (hArg: TArg, buf: string, join: boolean) => SndBuf;
    stt: ISndState;
    private constructor();
    stopse(): void;
    readonly ws: (hArg: TArg) => boolean;
    readonly fade: (hArg: TArg) => void;
    readonly wf: (hArg: TArg) => boolean;
    get volume(): number;
    set volume(v: number);
}
type ISndState = {
    onend(): void;
    onfade(): void;
    stopse(): void;
    ws(hArg: TArg): boolean;
    fade(hArg: TArg): void;
    wf(hArg: TArg): boolean;
};
export {};
//# sourceMappingURL=SndBuf.d.ts.map