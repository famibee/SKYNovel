import { IEvtMng } from './CmnLib';
import { IHTag, IVariable, IMain } from './CmnInterface';
import { Config } from './Config';
export declare class SoundMng {
    private cfg;
    private val;
    private main;
    private hSndBuf;
    constructor(cfg: Config, hTag: IHTag, val: IVariable, main: IMain);
    private initVol;
    private evtMng;
    setEvtMng(evtMng: IEvtMng): void;
    private volume;
    private getVol;
    private fadeoutbgm;
    private fadeoutse;
    private fadebgm;
    private fadese;
    private playbgm;
    private playse;
    private stop_allse;
    private stopbgm;
    private stopse;
    private wb;
    private wf;
    private stopfadese;
    private wl;
    private ws;
    private xchgbuf;
    loadAheadSnd(_aFn: string[]): void;
    playLoopFromSaveObj(): void;
    private addLoopPlay;
    private delLoopPlay;
}