import { IEvtMng } from './CmnLib';
import { HArg } from './Grammar';
import { Config } from './Config';
import { IMakeDesignCast } from './LayerMng';
import { SysBase } from './SysBase';
import { ScriptIterator } from './ScriptIterator';
import { Container, Sprite, Renderer, Application } from 'pixi.js';
interface IInfTxLay {
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
    private readonly spLay;
    private readonly canFocus;
    private readonly sys;
    static init(cfg: Config, appPixi: Application): void;
    static setEvtMng(evtMng: IEvtMng, scrItr: ScriptIterator): void;
    static destroy(): void;
    noticeCompTxt: () => void;
    constructor(spLay: Sprite, canFocus: () => boolean, sys: SysBase);
    lay(hArg: HArg): void;
    cvsResize(): void;
    get tategaki(): boolean;
    get infTL(): IInfTxLay;
    get getWidth(): number;
    get getHeight(): number;
    setSize(width: number, height: number): void;
    goTxt(aSpan: string[], instant: boolean): void;
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
    dispBreak(o: HArg): void;
    static delBreak(): void;
    reNew(): TxtStage;
    record(): {
        infTL: IInfTxLay;
        cssText: string;
        left: number;
        ch_filter: any[] | undefined;
        fi_easing: string;
        fo_easing: string;
        hyph: any;
    };
    playback(hLay: any): void;
    get cssText(): string;
    set cssText(ct: string);
    snapshot(rnd: Renderer, re: () => void): void;
    snapshot_end(): void;
    makeDesignCast(_gdc: IMakeDesignCast): void;
    showDesignCast(): void;
    dump(): string;
    destroy(): void;
}
export {};
//# sourceMappingURL=TxtStage.d.ts.map