import { Config } from './Config';
import { IEvtMng } from './CmnLib';
import { T_Main, T_Variable } from './CmnInterface';
import { SysBase } from './SysBase';
import { SoundMng } from './SoundMng';
import { TArg } from './Grammar';
import { Sprite, Container } from 'pixi.js';
type IFncCompSpr = (sp: Sprite) => void;
export declare class SpritesMng {
    #private;
    readonly csvFn: string;
    readonly ctn?: Container | undefined;
    private fncFirstComp;
    private fncAllComp;
    static init(cfg: Config, val: T_Variable, sys: SysBase, main: T_Main, sndMng: SoundMng): void;
    static setEvtMng(evtMng: IEvtMng): void;
    constructor(csvFn?: string, ctn?: Container | undefined, fncFirstComp?: IFncCompSpr, fncAllComp?: (isStop: boolean) => void);
    readonly ret: boolean;
    destroy(): void;
    static destroy(): void;
    static getHFn2VElm(fn: string): HTMLVideoElement | undefined;
    static wv(hArg: TArg): boolean;
    static stopVideo(fn: string): void;
    static add_face(hArg: TArg): boolean;
}
export {};
//# sourceMappingURL=SpritesMng.d.ts.map