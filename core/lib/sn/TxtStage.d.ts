import { IEvtMng } from './CmnLib';
import { HArg } from './CmnInterface';
import { Config } from './Config';
import { IMakeDesignCast } from './LayerMng';
import { Container, Sprite, Renderer } from 'pixi.js';
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
    #private;
    private infTL;
    private readonly spLay;
    private readonly canFocus;
    static init(cfg: Config): void;
    static setEvtMng(evtMng: IEvtMng): void;
    static destroy(): void;
    getInfTL(): IInfTxLay;
    constructor(infTL: IInfTxLay, spLay: Sprite, canFocus: () => boolean);
    lay(hArg: HArg): void;
    cvsResize(): void;
    get tategaki(): boolean;
    getWidth(): number;
    getHeight(): number;
    setSize(width: number, height: number): void;
    goTxt(aSpan: string[]): void;
    skipChIn(): boolean;
    static initChStyle(): void;
    static getChInStyle(name: string): any;
    static ch_in_style(hArg: HArg): any;
    static getChOutStyle(name: string): {
        wait: number;
        alpha: number;
        x: string;
        y: string;
        nx: number;
        ny: number;
        scale_x: number;
        scale_y: number;
        rotate: number;
        join: boolean;
        ease: string;
    };
    static ch_out_style(hArg: HArg): any;
    dispBreak(pic: string): void;
    static delBreak(): void;
    reNew(): TxtStage;
    record(): {
        infTL: IInfTxLay;
        cssText: string;
        left: number;
        idc_hArg: HArg;
        ch_filter: any[] | null;
        fi_easing: string;
        fo_easing: string;
    };
    playback(hLay: any): void;
    snapshot(rnd: Renderer, re: () => void): void;
    snapshot_end(): void;
    makeDesignCast(gdc: IMakeDesignCast): void;
    showDesignCast(): void;
    dump(): string;
    destroy(): void;
}
//# sourceMappingURL=TxtStage.d.ts.map