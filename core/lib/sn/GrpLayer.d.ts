import { Layer } from './Layer';
import { IEvtMng } from './CmnLib';
import { HArg, IMain } from './CmnInterface';
import { Config } from './Config';
import { SysBase } from './SysBase';
import { Sprite, Container, Texture } from 'pixi.js';
export interface IFncCompSpr {
    (sp: Sprite): void;
}
interface IResAniSpr {
    aTex: Texture[];
    meta: {
        animationSpeed?: number;
    };
}
export declare class GrpLayer extends Layer {
    private static readonly elc;
    private static hFace;
    private static main;
    private static cfg;
    private static sys;
    static init(main: IMain, cfg: Config, sys: SysBase): void;
    private static evtMng;
    static setEvtMng(evtMng: IEvtMng): void;
    static destroy(): void;
    private csvFn;
    private sBkFn;
    private sBkFace;
    static hFn2ResAniSpr: {
        [name: string]: IResAniSpr;
    };
    lay(hArg: HArg): boolean;
    private compOneAtMultiLD;
    private static ldrHFn;
    static csv2Sprites(csv: string, parent: Container | null, fncFirstComp: IFncCompSpr, fncAllComp?: (isStop: boolean) => void): boolean;
    private static preThen;
    private static preThen4Cripto;
    private static im2Base64;
    private static mkSprite;
    static fn2Video: {
        [name: string]: HTMLVideoElement;
    };
    static wv(hArg: HArg): boolean;
    setPos(hArg: HArg): void;
    static add_face(hArg: HArg): boolean;
    static clearFace2Name(): void;
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
        sBkFn: string;
        sBkFace: string;
    };
    playback(hLay: any, fncComp?: undefined | {
        (): void;
    }): boolean;
    readonly dump: () => string;
}
export {};
//# sourceMappingURL=GrpLayer.d.ts.map