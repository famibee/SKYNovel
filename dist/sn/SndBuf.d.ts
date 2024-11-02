import { IEvtMng } from './CmnLib';
import { IVariable, IMain } from './CmnInterface';
import { Config } from './Config';
import { SysBase } from './SysBase';
import { HArg } from './Grammar';
export interface HSndBuf {
    [buf: string]: SndBuf;
}
export declare const BUF_BGM = "BGM";
export declare const BUF_SE = "SE";
export declare class SndBuf {
    #private;
    readonly hArg: HArg;
    readonly buf: string;
    readonly fn: string;
    static init($cfg: Config, $val: IVariable, $main: IMain, $sys: SysBase, $hSndBuf: HSndBuf): void;
    static setEvtMng($evtMng: IEvtMng): void;
    static delLoopPlay(buf: string): void;
    static getVol(hArg: HArg, def: number): number;
    static xchgbuf({ buf: buf1, buf2 }: HArg): void;
    static generate(hArg: HArg): boolean;
    private constructor();
    setVol(vol: number): void;
    ws: (hArg: HArg) => boolean;
    stopse({ buf }: HArg): void;
    fade: (hArg: HArg) => void;
    wf: (hArg: HArg) => boolean;
    stopfadese: (hArg: HArg) => void;
}
//# sourceMappingURL=SndBuf.d.ts.map