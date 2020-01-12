import { Container, Sprite, Renderer } from 'pixi.js';
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
    private static cvs;
    static init(cfg: Config): void;
    private static evtMng;
    static setEvtMng(evtMng: IEvtMng): void;
    private htmTxt;
    private cntTxt;
    private grpDbgMasume;
    constructor(infTL: IInfTxLay, cnt: Container);
    lay(hArg: HArg, txl: Sprite): void;
    private lay_sub;
    private left;
    private isTategaki;
    get tategaki(): boolean;
    private padTx4x;
    private padTx4y;
    setSize(width: number, height: number): void;
    private static readonly hWarning;
    goTxt(aSpan: string[]): void;
    private goTxt2;
    private cntGoTxtSerializer;
    private goTxt2_htm;
    private htm2tx;
    private goTxt3;
    private static readonly REG_SURROGATE;
    private ch_filter;
    private xz4htm2rect;
    private aSpTw;
    private static fncChkSkip;
    private goTxt3_tx2sp;
    private aRect;
    private lenHtmTxt;
    private static reg行頭禁則;
    private static reg行末禁則;
    private static reg分割禁止;
    goTxt_next(aSpan: string[]): void;
    private rctm;
    private readonly regDs;
    private fncEndChIn;
    private spWork_next;
    private isChInIng;
    skipChIn(): boolean;
    private static hChInStyle;
    private static REG_NG_CHSTYLE_NAME_CHR;
    static initChStyle(): void;
    static getChInStyle(name: string): any;
    static ch_in_style(hArg: HArg): any;
    private static hChOutStyle;
    static getChOutStyle(name: string): any;
    static ch_out_style(hArg: HArg): any;
    private static cntBreak;
    dispBreak(pic: string): void;
    static delBreak(): void;
    private putBreakMark;
    private lh_half;
    private getChRects;
    private ch_slide_x;
    private fi_easing;
    private fo_easing;
    private static gs_chFadeWait;
    private static gs_chFadeDx;
    private clearText;
    passBaton(): TxtStage;
    record(): {
        infTL: IInfTxLay;
        cssText: string;
        left: number;
        ch_filter: any[] | null;
        fi_easing: string;
        fo_easing: string;
    };
    playback(hLay: any): void;
    private sss;
    snapshot(rnd: Renderer, re: () => void): void;
    snapshot_end(): void;
    dump(): string;
    destroy(): void;
}
