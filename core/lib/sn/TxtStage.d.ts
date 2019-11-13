import { Container } from 'pixi.js';
import { IEvtMng } from './CmnLib';
import { HArg } from './CmnInterface';
import { Config } from './Config';
export interface IInfTxLay {
    fontsize: number;
    $width: number;
    $height: number;
    pad_left: number;
    pad_right: number;
    pad_top: number;
    pad_bottom: number;
}
export declare class TxtStage extends Container {
    private infTL;
    private static cfg;
    private static cr;
    static init(cfg: Config): void;
    private static evtMng;
    static setEvtMng(evtMng: IEvtMng): void;
    private htmTxt;
    private cntTxt;
    private grpDbgMasume;
    constructor(infTL: IInfTxLay, cnt: Container);
    lay(hArg: HArg): void;
    setSize(width: number, height: number): void;
    private static readonly hWarning;
    goTxt(aSpan: string[], layname: string): void;
    private aSpan1to2;
    private goTxt2;
    private cntGoTxtSerializer;
    private aSpan;
    private goTxt2_htm2tx;
    private goTxt3;
    private static readonly REG_SURROGATE;
    private aRect;
    private ch_filter;
    private xz4htm2rect;
    private aSpTw;
    private static fncChkSkip;
    private goTxt3_tx2sp;
    goTxt_next(aSpan: string[], layname: string, delay: number): void;
    private static cntBreak;
    dispBreak(pic: string): void;
    static delBreak(): void;
    private putBreakMark;
    private lh_half;
    private getChRects;
    skipFI(): boolean;
    private ch_anime_time_仮;
    private fncFi;
    private fi_easing;
    private fo;
    private fo_easing;
    private clearText;
    passBaton(): TxtStage;
    record(): {
        infTL: IInfTxLay;
        cssText: string;
        ch_filter: any[] | null;
        lh_half: number;
        fi_easing: string;
        fo: {
            alpha: number;
            x: string;
        };
        fo_easing: string;
        ch_anime_time_仮: number;
        xz4htm2rect: number;
    };
    playback(hLay: any): void;
    dump(): string;
    destroy(): void;
}
