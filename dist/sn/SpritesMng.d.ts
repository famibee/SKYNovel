import { HArg } from './Grammar';
import { SoundMng } from './SoundMng';
import { SysBase } from './SysBase';
import { IMain, IVariable } from './CmnInterface';
import { IEvtMng } from './CmnLib';
import { Config } from './Config';
import { Sprite, Container } from 'pixi.js';

type IFncCompSpr = (sp: Sprite) => void;
export declare class SpritesMng {
    #private;
    readonly csvFn: string;
    readonly spLay?: Container<import('pixi.js').DisplayObject> | undefined;
    private fncFirstComp;
    private fncAllComp;
    static init(cfg: Config, val: IVariable, sys: SysBase, main: IMain, sndMng: SoundMng): void;
    static setEvtMng(evtMng: IEvtMng): void;
    constructor(csvFn?: string, spLay?: Container<import('pixi.js').DisplayObject> | undefined, fncFirstComp?: IFncCompSpr, fncAllComp?: (isStop: boolean) => void);
    readonly ret: boolean;
    destroy(): void;
    static destroy(): void;
    static getHFn2VElm(fn: string): HTMLVideoElement;
    static wv(hArg: HArg): boolean;
    static stopVideo(fn: string): void;
    static add_face(hArg: HArg): boolean;
}
export {};
//# sourceMappingURL=SpritesMng.d.ts.map