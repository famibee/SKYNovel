import { DisplayObject, Container, Sprite } from 'pixi.js';
import { HArg } from './CmnInterface';
export declare class Layer {
    name: string;
    readonly cnt: Sprite;
    get alpha(): number;
    set alpha(v: number);
    get height(): number;
    get rotation(): number;
    set rotation(v: number);
    get scale_x(): number;
    set scale_x(v: number);
    get scale_y(): number;
    set scale_y(v: number);
    get width(): number;
    get x(): number;
    set x(v: number);
    get y(): number;
    set y(v: number);
    destroy(): void;
    lay(hArg: HArg): boolean;
    clearLay(hArg: HArg): void;
    copy(fromLayer: Layer): void;
    record(): {
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
    };
    playback(hLay: any, _fncComp?: undefined | {
        (): void;
    }): boolean;
    dump(): string;
    static argChk_BlendmodeAndSet(hash: any, $do: DisplayObject): void;
    static cnvBlendmode(name: string): number;
    static readonly hBlendmode: any;
    static setXY(base: DisplayObject, hArg: HArg, ret: Container, isGrp?: boolean, isButton?: boolean): void;
    static setXYByPos(base: DisplayObject, pos: string, ret: DisplayObject): void;
    static setXYCenter(dsp: DisplayObject): void;
}
