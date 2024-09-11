import { IEvtMng } from './CmnLib';
import { IHTag } from './Grammar';
import { IVariable, IMain, INoticeChgVolume } from './CmnInterface';
import { Config } from './Config';
import { SysBase } from './SysBase';
export declare class SoundMng {
    #private;
    readonly val: IVariable;
    constructor(cfg: Config, hTag: IHTag, val: IVariable, main: IMain, sys: SysBase);
    setEvtMng(evtMng: IEvtMng): void;
    setNoticeChgVolume(setGlbVol: INoticeChgVolume, setMovVol: INoticeChgVolume): void;
    clearCache(): void;
    playLoopFromSaveObj(all_stop_and_play: boolean): Promise<void>[];
    destroy(): void;
}
//# sourceMappingURL=SoundMng.d.ts.map