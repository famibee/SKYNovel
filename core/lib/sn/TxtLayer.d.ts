import { Layer } from './Layer';
import { IEvtMng } from './CmnLib';
import { IVariable, IHTag, HArg, IMain } from './CmnInterface';
import { Config } from './Config';
export declare class TxtLayer extends Layer {
    private static val;
    private static hNoReplaceDispObj;
    private static glbStyle;
    private static cfg;
    private static recText;
    static init(cfg: Config, hTag: IHTag, val: IVariable, recText: (txt: string) => void): void;
    static destroy(): void;
    private $width;
    private $height;
    private pad_left;
    private pad_right;
    private pad_top;
    private pad_bottom;
    private b_color;
    private b_alpha;
    private b_alpha_isfixed;
    private b_do;
    private b_pic;
    private htmTxt;
    private cntTxt;
    private grpDbgMasume;
    private cntInsidePadding;
    private fontsize;
    private ch_anime_time_仮;
    private fncFi;
    private fi_easing;
    private ch_filter;
    private fo;
    private fo_easing;
    private rbSpl;
    private cntBtn;
    constructor();
    destroy(): void;
    private static main;
    private static evtMng;
    static setEvtMng(main: IMain, evtMng: IEvtMng): void;
    static addStyle(text: string): void;
    lay(hArg: HArg): boolean;
    private xz4htm2rect;
    private hWarning;
    private drawBack;
    chgBackAlpha(g_alpha: number): void;
    tagCh(text: string): void;
    private putCh;
    private firstCh;
    private aSpan;
    private aSpan_bk;
    private autoCloseSpan;
    private goTxt;
    private goTxt2_htm2tx;
    private cntGotxt;
    private paddingmkTx4x;
    private paddingmkTx4y;
    private static readonly REG_SURROGATE;
    private goTxt3_tx2sp;
    private aRect;
    private aSpTw;
    private lh_half;
    private getChRects;
    click(): boolean;
    clearText(): void;
    enabled: boolean;
    addButton(hArg: HArg): boolean;
    clearLay(hArg: HArg): void;
    record: () => {
        name: string;
        idx: number;
        alpha: number;
        blendMode: number;
        rotation: number;
        scale_x: number;
        scale_y: number;
        pivot_x: number;
        pivot_y: number;
        x: number;
        y: number;
        visible: boolean;
    } & {
        enabled: boolean;
        cssText: string;
        b_do: string | null;
        b_pic: string;
        b_color: number;
        b_alpha: number;
        b_alpha_isfixed: boolean;
        ch_anime_time_仮: number;
        fi_easing: string;
        fo: {
            alpha: number;
            x: string;
        };
        fo_easing: string;
        xz4htm2rect: number;
        btns: (string | null)[];
    };
    playback(hLay: any, fncComp?: undefined | {
        (): void;
    }): boolean;
    dump(): string;
    private static doAutoWc;
    private static hAutoWc;
    private static autowc;
}
