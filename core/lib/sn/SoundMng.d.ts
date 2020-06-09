import { IEvtMng } from './CmnLib';
import { IHTag, IVariable, IMain, HArg } from './CmnInterface';
import { Config } from './Config';
import { SysBase } from './SysBase';
export declare class SoundMng {
    private readonly cfg;
    private readonly val;
    private readonly main;
    private readonly sys;
    private hSndBuf;
    constructor(cfg: Config, hTag: IHTag, val: IVariable, main: IMain, sys: SysBase);
    private evtMng;
    setEvtMng(evtMng: IEvtMng): void;
    private volume;
    private getVol;
    private fadeoutbgm;
    private fadeoutse;
    private fadebgm;
    private fadese;
    private playbgm;
    private static readonly MAX_END_MS;
    private playse;
    private playseSub;
    private initVol;
    private stop_allse;
    private stopbgm;
    private stopse;
    private wb;
    private wf;
    private stopfadese;
    private wl;
    private ws;
    private xchgbuf;
    loadAheadSnd(hArg: HArg): void;
    playLoopFromSaveObj(): void;
    private addLoopPlay;
    private delLoopPlay;
}
//# sourceMappingURL=SoundMng.d.ts.map