import { SysBase } from './SysBase';
import { Config } from './Config';
import { IVariable, IMain, INoticeChgVolume } from './CmnInterface';
import { IHTag } from './Grammar';
import { IEvtMng } from './CmnLib';

export declare class SoundMng {
    #private;
    readonly val: IVariable;
    constructor(cfg: Config, hTag: IHTag, val: IVariable, main: IMain, sys: SysBase);
    setEvtMng(evtMng: IEvtMng): void;
    setNoticeChgVolume(setGlbVol: INoticeChgVolume, setMovVol: INoticeChgVolume): void;
    clearCache(): void;
    playLoopFromSaveObj(): void;
}
//# sourceMappingURL=SoundMng.d.ts.map