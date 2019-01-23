import { DisplayObject, Container, Sprite } from 'pixi.js';
import { HArg } from './CmnInterface';
export declare class Layer {
    name: string;
    cnt: Sprite;
    alpha: number;
    readonly height: number;
    rotation: number;
    scale_x: number;
    scale_y: number;
    readonly width: number;
    x: number;
    y: number;
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
    static hBlendmode: any;
    static setXY(base: DisplayObject, hArg: HArg, ret: Container, isGrp?: boolean, isButton?: boolean): void;
    static setXYByPos(base: DisplayObject, pos: string, ret: DisplayObject): void;
    static setXYCenter(dsp: DisplayObject): void;
}
