import { Layer } from './Layer';
import { IEvtMng } from './CmnLib';
import { HArg } from './Grammar';
import { IMain, IVariable } from './CmnInterface';
import { Config } from './Config';
import { SysBase } from './SysBase';
import { SoundMng } from './SoundMng';
import { IMakeDesignCast } from './LayerMng';
import { Sprite, Container, Texture, BLEND_MODES, Application } from 'pixi.js';
export type IFncCompSpr = (sp: Sprite) => void;
interface IResAniSpr {
    aTex: Texture[];
    meta: {
        animationSpeed?: number;
    };
}
export declare class GrpLayer extends Layer {
    #private;
    static init(main: IMain, cfg: Config, appPixi: Application, sys: SysBase, sndMng: SoundMng, val: IVariable): void;
    static setEvtMng(evtMng: IEvtMng): void;
    static destroy(): void;
    constructor();
    private setSp;
    static hFn2ResAniSpr: {
        [name: string]: IResAniSpr;
    };
    readonly lay: (hArg: HArg) => boolean;
    private laySub;
    get width(): number;
    get height(): number;
    static csv2Sprites(csv: string, parent: Container | undefined, fncFirstComp: IFncCompSpr, fncAllComp?: (isStop: boolean) => void): boolean;
    static hFn2VElm: {
        [name: string]: HTMLVideoElement;
    };
    static wv(hArg: HArg): boolean;
    renderStart(): void;
    renderEnd(): void;
    static loadPic2Img(src: string, img: HTMLImageElement, onload?: (img2: HTMLImageElement) => void): void;
    setPos(hArg: HArg): void;
    static add_face(hArg: HArg): boolean;
    static clearFace2Name(): void;
    get containMovement(): boolean;
    clearLay(hArg: HArg): void;
    readonly record: () => {
        sBkFn: string;
        sBkFace: string;
        idc_hArg: HArg;
        name: string;
        idx: number;
        alpha: number;
        blendMode: BLEND_MODES;
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
export {};
//# sourceMappingURL=GrpLayer.d.ts.map