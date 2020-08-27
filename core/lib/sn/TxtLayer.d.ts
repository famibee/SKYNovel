import { Layer } from './Layer';
import { IEvtMng } from './CmnLib';
import { IVariable, IHTag, HArg, IMain } from './CmnInterface';
import { IInfTxLay } from './TxtStage';
import { Config } from './Config';
import { Renderer } from 'pixi.js';
export declare class TxtLayer extends Layer {
    private static cfg;
    private static val;
    private static recText;
    private static isPageFore;
    static init(cfg: Config, hTag: IHTag, val: IVariable, recText: (txt: string) => void, isPageFore: (me: TxtLayer) => boolean): void;
    private static readonly css_key4del;
    static addStyle(style: string): void;
    private static ch_in_style;
    private static ch_out_style;
    private static main;
    private static evtMng;
    static setEvtMng(main: IMain, evtMng: IEvtMng): void;
    private static doAutoWc;
    private static hAutoWc;
    private static autowc;
    private infTL;
    private b_color;
    private b_alpha;
    private b_alpha_isfixed;
    private b_do;
    private b_pic;
    private cntInsidePadding;
    private txs;
    private rbSpl;
    private cntBtn;
    constructor();
    destroy(): void;
    set name(nm: string);
    get name(): string;
    cvsResize(): void;
    lay(hArg: HArg): boolean;
    private set_ch_in;
    private ch_in_style;
    private ch_in_join;
    private set_ch_out;
    private ch_out_style;
    private drawBack;
    chgBackAlpha(g_alpha: number): void;
    private setFfs;
    private ffs;
    private fncFFSStyle;
    private fncFFSSpan;
    private strNoFFS;
    private regNoFFS;
    static chgDoRec(doRec: boolean): void;
    static rec: (tx: string) => string;
    isCur: boolean;
    private ruby_pd;
    private mkStyle_r_align;
    private r_align;
    private mkStyle_r_align4ff;
    tagCh(text: string): void;
    private needGoTxt;
    private putCh;
    private tagCh_sub;
    private cumDelay;
    private firstCh;
    private aSpan;
    private aSpan_bk;
    private aSpan_link;
    private hSpanBk;
    private beginSpan;
    private autoCloseSpan;
    readonly click: () => boolean;
    clearText(): void;
    private page_text;
    get pageText(): string;
    get enabled(): boolean;
    set enabled(e: boolean);
    addButton(hArg: HArg): boolean;
    canFocus(): boolean;
    clearLay(hArg: HArg): void;
    readonly record: () => {
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
        r_align: string;
        b_do: string | null;
        b_pic: string;
        b_color: number;
        b_alpha: number;
        b_alpha_isfixed: boolean;
        txs: {
            infTL: IInfTxLay;
            cssText: string;
            left: number;
            ch_filter: any[] | null;
            fi_easing: string;
            fo_easing: string;
        };
        ffs: string;
        strNoFFS: string;
        btns: string[];
    };
    playback(hLay: any, fncComp?: undefined | {
        (): void;
    }): boolean;
    snapshot(rnd: Renderer, re: () => void): void;
    snapshot_end(): void;
    dump(): string;
}
//# sourceMappingURL=TxtLayer.d.ts.map