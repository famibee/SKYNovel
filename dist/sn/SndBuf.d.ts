import { IEvtMng } from './CmnLib';
import { T_Variable, T_Main } from './CmnInterface';
import { Config } from './Config';
import { SysBase } from './SysBase';
import { TArg } from './Grammar';
export type HSndBuf = {
    [buf: string]: SndBuf;
};
export declare const BUF_BGM = "BGM";
export declare const BUF_SE = "SE";
export declare class SndBuf {
    #private;
    readonly hArg: TArg;
    readonly buf: string;
    readonly fn: string;
    static init($cfg: Config, $val: T_Variable, $main: T_Main, $sys: SysBase, $hSndBuf: HSndBuf): void;
    static setEvtMng($evtMng: IEvtMng): void;
    static delLoopPlay(buf: string): void;
    static getVol(hArg: TArg, def: number): number;
    static xchgbuf({ buf: buf1, buf2 }: TArg): void;
    static readonly MAX_END_MS = 999000;
    readonly needLoad: boolean;
    constructor(hArg: TArg, buf: string, fn: string);
    setVol(vol: number): void;
    ws: (hArg: TArg) => boolean;
    stopse({ buf }: TArg): void;
    fade: (hArg: TArg) => void;
    wf: (hArg: TArg) => boolean;
    stopfadese: (hArg: TArg) => void;
}
//# sourceMappingURL=SndBuf.d.ts.map