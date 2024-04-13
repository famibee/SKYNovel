import { Application } from 'pixi.js';
import { IMakeDesignCast } from './LayerMng';
import { SoundMng } from './SoundMng';
import { SysBase } from './SysBase';
import { Config } from './Config';
import { IMain, IVariable } from './CmnInterface';
import { HArg } from './Grammar';
import { Layer } from './Layer';

export declare class GrpLayer extends Layer {
    #private;
    static init(main: IMain, cfg: Config, appPixi: Application, sys: SysBase, sndMng: SoundMng, val: IVariable): void;
    static destroy(): void;
    constructor();
    readonly lay: (hArg: HArg) => boolean;
    get width(): number;
    get height(): number;
    renderStart(): void;
    renderEnd(): void;
    setPos(hArg: HArg): void;
    get containMovement(): boolean;
    clearLay(hArg: HArg): void;
    readonly record: () => {
        sBkFn: string;
        sBkFace: string;
        idc_hArg: HArg;
        name: string;
        idx: number;
        alpha: number;
        blendMode: import('pixi.js').BLEND_MODES;
        rotation: number;
        scale_x: number;
        scale_y: number;
        pivot_x: number;
        pivot_y: number;
        x: number;
        y: number;
        visible: boolean;
    };
    playback(hLay: any, aPrm: Promise<void>[]): void;
    makeDesignCast(gdc: IMakeDesignCast): void;
    cvsResize(): void;
    showDesignCast(): void;
    readonly dump: () => string;
}
//# sourceMappingURL=GrpLayer.d.ts.map