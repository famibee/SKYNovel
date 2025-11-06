import { Layer, T_RecordPlayBack_lay } from './Layer';
import { TArg } from './Grammar';
import { T_Main, T_Variable } from './CmnInterface';
import { Config } from './Config';
import { SysBase } from './SysBase';
import { SoundMng } from './SoundMng';
import { IMakeDesignCast } from './LayerMng';
import { Application } from 'pixi.js';
export type T_RP_layGrp = T_RecordPlayBack_lay & {
    sBkFn: string;
    sBkFace: string;
};
export declare class GrpLayer extends Layer {
    #private;
    static init(main: T_Main, cfg: Config, appPixi: Application, sys: SysBase, sndMng: SoundMng, val: T_Variable): void;
    static destroy(): void;
    constructor();
    readonly lay: (hArg: TArg) => boolean;
    get width(): number;
    get height(): number;
    renderStart(): void;
    renderEnd(): void;
    setPos(hArg: TArg): void;
    get containMovement(): boolean;
    clearLay(hArg: TArg): void;
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
        aFltHArg: TArg[];
    };
    playback(hLay: T_RP_layGrp, aPrm: Promise<void>[]): void;
    makeDesignCast(gdc: IMakeDesignCast): void;
    cvsResize(): void;
    showDesignCast(): void;
    readonly dump: () => string;
}
//# sourceMappingURL=GrpLayer.d.ts.map