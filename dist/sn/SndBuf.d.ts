import { HArg } from './Grammar';
import { SysBase } from './SysBase';
import { Config } from './Config';
import { IVariable, IMain } from './CmnInterface';
import { IEvtMng } from './CmnLib';

export declare class SndBuf {
    #private;
    static init($cfg: Config, $val: IVariable, $main: IMain, $sys: SysBase): void;
    static setEvtMng($evtMng: IEvtMng): void;
    static delLoopPlay(buf: string): void;
    static getVol(hArg: HArg, def: number): number;
    static xchgbuf(hArg: HArg): void;
    init(hArg: HArg): boolean;
    ws: (hArg: HArg) => boolean;
    stopse(hArg: HArg): void;
    fade(hArg: HArg): void;
    wf: (hArg: HArg) => boolean;
    stopfadese: (hArg: HArg) => void;
}
//# sourceMappingURL=SndBuf.d.ts.map