import { IEvtMng } from './CmnLib';
import { IHTag, IVariable, IMain, HArg, INoticeChgVolume } from './CmnInterface';
import { Config } from './Config';
import { SysBase } from './SysBase';
export declare class SoundMng {
    #private;
    private readonly cfg;
    private readonly val;
    private readonly main;
    private readonly sys;
    constructor(cfg: Config, hTag: IHTag, val: IVariable, main: IMain, sys: SysBase);
    setEvtMng(evtMng: IEvtMng): void;
    setNoticeChgVolume(setGlbVol: INoticeChgVolume, setMovVol: INoticeChgVolume): void;
    loadAheadSnd(hArg: HArg): void;
    playLoopFromSaveObj(): void;
}
//# sourceMappingURL=SoundMng.d.ts.map