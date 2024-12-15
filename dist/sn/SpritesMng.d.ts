import { Config } from './Config';
import { IEvtMng } from './CmnLib';
import { IMain, IVariable } from './CmnInterface';
import { SysBase } from './SysBase';
import { SoundMng } from './SoundMng';
import { HArg } from './Grammar';
import { Sprite, Container } from 'pixi.js';
type IFncCompSpr = (sp: Sprite) => void;
export declare class SpritesMng {
    #private;
    readonly csvFn: string;
    readonly ctn?: Container | undefined;
    private fncFirstComp;
    private fncAllComp;
    static init(cfg: Config, val: IVariable, sys: SysBase, main: IMain, sndMng: SoundMng): void;
    static setEvtMng(evtMng: IEvtMng): void;
    constructor(csvFn?: string, ctn?: Container | undefined, fncFirstComp?: IFncCompSpr, fncAllComp?: (isStop: boolean) => void);
    readonly ret: boolean;
    destroy(): void;
    static destroy(): void;
    static getHFn2VElm(fn: string): HTMLVideoElement | undefined;
    static wv(hArg: HArg): boolean;
    static stopVideo(fn: string): void;
    static add_face(hArg: HArg): boolean;
}
export {};
//# sourceMappingURL=SpritesMng.d.ts.map