import { Layer } from './Layer';
import { HArg } from './Grammar';
import { IMain, IVariable } from './CmnInterface';
import { Config } from './Config';
import { SysBase } from './SysBase';
import { SoundMng } from './SoundMng';
import { IMakeDesignCast } from './LayerMng';
import { Application } from 'pixi.js';
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
        aFltHArg: HArg[];
    };
    playback(hLay: any, aPrm: Promise<void>[]): void;
    makeDesignCast(gdc: IMakeDesignCast): void;
    cvsResize(): void;
    showDesignCast(): void;
    readonly dump: () => string;
}
//# sourceMappingURL=GrpLayer.d.ts.map