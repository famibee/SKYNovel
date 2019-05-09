import { Layer } from './Layer';
import { HArg, IMain } from './CmnInterface';
import { Config } from './Config';
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
    private static ldr;
    static init(main: IMain, cfg: Config): void;
    static destroy(): void;
    private csvFn;
    private sBkFn;
    private sBkFace;
    static hFn2ResAniSpr: {
        [name: string]: IResAniSpr;
    };
    lay(hArg: HArg): boolean;
    private static fncDefAllComp;
    private static fncAllComp;
    static csv2Sprites(csv: string, parent: Container, fncFirstComp: IFncCompSpr, fncAllComp?: (isStop: boolean) => void): boolean;
    private static mkSprite;
    static ldPic(fn: string, fnc: (tx: Texture) => void): void;
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
    dump(): string;
}
export {};
