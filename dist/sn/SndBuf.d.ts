import { IEvtMng } from './CmnLib';
import { IVariable, IMain } from './CmnInterface';
import { Config } from './Config';
import { SysBase } from './SysBase';
import { HArg } from './Grammar';
export declare class SndBuf {
    #private;
    static init($cfg: Config, $val: IVariable, $main: IMain, $sys: SysBase): void;
    static delLoopPlay(buf: string): void;
    static getVol(hArg: HArg, def: number): number;
    static xchgbuf(hArg: HArg): void;
    init(hArg: HArg): boolean;
    ws: (hArg: HArg, evtMng: IEvtMng) => boolean;
    stopse(hArg: HArg): void;
    fade(hArg: HArg, evtMng: IEvtMng): void;
    wf: (hArg: HArg, evtMng: IEvtMng) => boolean;
    stopfadese: (hArg: HArg) => void;
}
//# sourceMappingURL=SndBuf.d.ts.map