import { HArg } from './Grammar';
import { IMakeDesignCast } from './LayerMng';
import { BLEND_MODES, DisplayObject, Container, Sprite, AbstractRenderer, Filter } from 'pixi.js';

export declare class Layer {
    #private;
    layname: string;
    protected name_: string;
    set name(nm: string);
    get name(): string;
    readonly spLay: Sprite;
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
    protected procSetX(_x: number): void;
    get y(): number;
    set y(v: number);
    protected procSetY(_y: number): void;
    destroy(): void;
    lay(hArg: HArg): boolean;
    aFltHArg: HArg[];
    static bldFilters(hArg: HArg): Filter;
    static readonly hBldFilter: {
        [nm: string]: (hArg: HArg) => Filter;
    };
    static setBlendmodeParentOnly(cnt: Container, hArg: HArg): void;
    static setBlendmode(cnt: Container, hArg: HArg): void;
    static getBlendmodeNum(bm_name: string): number;
    static getNum2Blendmode(bmn: number): string;
    get containMovement(): boolean;
    renderStart(): void;
    renderEnd(): void;
    clearLay(hArg: HArg): void;
    copy(fromLayer: Layer, aPrm: Promise<void>[]): void;
    record(): {
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
        aFltHArg: HArg[];
    };
    playback(hLay: any, _aPrm: Promise<void>[]): void;
    snapshot(rnd: AbstractRenderer, re: () => void): void;
    snapshot_end(): void;
    makeDesignCast(_gdc: IMakeDesignCast): void;
    makeDesignCastChildren(_gdc: IMakeDesignCast): void;
    showDesignCast(): void;
    showDesignCastChildren(): void;
    cvsResize(): void;
    cvsResizeChildren(): void;
    dump(): string;
    static setXY(base: DisplayObject, hArg: HArg, ret: Container, isGrp?: boolean, isButton?: boolean): void;
    static setXYByPos(base: DisplayObject, pos: string, ret: DisplayObject): void;
    static setXYCenter(dsp: DisplayObject): void;
}
//# sourceMappingURL=Layer.d.ts.map