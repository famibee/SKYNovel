import { IEvtMng } from './CmnLib';
import { T_HTag } from './Grammar';
import { T_Variable, T_Main, T_NoticeChgVolume } from './CmnInterface';
import { Config } from './Config';
import { SysBase } from './SysBase';
export declare class SoundMng {
    #private;
    private readonly val;
    constructor(cfg: Config, hTag: T_HTag, val: T_Variable, main: T_Main, sys: SysBase);
    setEvtMng(evtMng: IEvtMng): void;
    setNoticeChgVolume(setGlbVol: T_NoticeChgVolume, setMovVol: T_NoticeChgVolume): void;
    clearCache(): void;
    playLoopFromSaveObj(all_stop_and_play: boolean): Promise<void>[];
    destroy(): void;
}
//# sourceMappingURL=SoundMng.d.ts.map