import { HArg, IPropParser } from './CmnInterface';
import { SysBase } from './SysBase';
import { ScriptIterator } from './ScriptIterator';
import { HPage } from './LayerMng';
import { AnalyzeTagArg, HPRM } from './AnalyzeTagArg';
import { TxtStage } from './TxtStage';
import { Button } from './Button';
import { GrpLayer } from './GrpLayer';
import { Config } from './Config';
import { Application, Rectangle, Text, Sprite, Point } from 'pixi.js';
import Moveable from 'moveable';
export declare class DesignCast {
    readonly bg_col: string;
    readonly isLay: boolean;
    private static divDesignRoot;
    private static sys;
    private static scrItr;
    protected static prpPrs: IPropParser;
    private static alzTagArg;
    private static cfg;
    private static hPages;
    static init(appPixi: Application, sys: SysBase, scrItr: ScriptIterator, prpPrs: IPropParser, alzTagArg: AnalyzeTagArg, cfg: Config, hPages: HPage): void;
    static cvsResizeDesign(): void;
    constructor(bg_col: string, isLay?: boolean);
    gethArg(): HArg;
    protected hArg: HArg;
    protected id_tag: string;
    sethArg(hArg: HArg): void;
    getRect(): Rectangle;
    getPosArg(_x: number, _y: number): {
        [name: string]: any;
    };
    getSizeArg(_x: number, _y: number): {
        [name: string]: any;
    };
    setPos(_x: number, _y: number): void;
    setSize(_w: number, _h: number): void;
    setOther(_hPrm: HPRM): void;
    child?: DesignCast;
    parent?: DesignCast;
    private static readonly ID_DESIGNMODE;
    private static idDesignCast;
    private static id2gdc;
    static enterMode(): void;
    private static aDC;
    static leaveMode(): void;
    cvsResize(): void;
    private cvsResizeBase;
    private fncLay;
    protected rect: Rectangle;
    protected pivot: Point;
    protected scale: Point;
    protected rotation: number;
    protected mov: Moveable | null;
    protected d: HTMLDivElement | null;
    private lx;
    private ly;
    dspDesignCast(): void;
    static replaceToken(o: any): void;
}
export declare class GrpLayDesignCast extends DesignCast {
    private readonly spLay;
    private readonly gl;
    constructor(spLay: Sprite, gl: GrpLayer);
    private sp;
    setSp(sp: Sprite): void;
    getRect(): Rectangle;
    getPosArg(left: number, top: number): {
        left: number;
        top: number;
    };
    getSizeArg(width: number, height: number): {
        width: number;
        height: number;
    };
    setPos(x: number, y: number): void;
    setSize(w: number, h: number): void;
    setOther(hPrm: HPRM): void;
}
export declare class TxtLayDesignCast extends DesignCast {
    private readonly spLay;
    private readonly ts;
    constructor(spLay: Sprite, ts: TxtStage);
    getRect(): Rectangle;
    getPosArg(left: number, top: number): {
        left: number;
        top: number;
    };
    getSizeArg(width: number, height: number): {
        width: number;
        height: number;
    };
    setPos(x: number, y: number): void;
    setSize(w: number, h: number): void;
    setOther(hPrm: HPRM): void;
}
export declare class TxtLayPadDesignCast extends DesignCast {
    private readonly ts;
    constructor(ts: TxtStage);
    getRect(): Rectangle;
    getPosArg(pl: number, pt: number): {
        pl: number;
        pt: number;
    };
    getSizeArg(w: number, h: number): {
        pr: number;
        pb: number;
    };
    setPos(pl: number, pt: number): void;
    setSize(w: number, h: number): void;
    setOther(hPrm: HPRM): void;
}
export declare class TxtBtnDesignCast extends DesignCast {
    private readonly btn;
    readonly hArg: HArg;
    private readonly txt;
    constructor(btn: Button, hArg: HArg, txt: Text);
    getRect(): Rectangle;
    getPosArg(left: number, top: number): {
        left: number;
        top: number;
    };
    getSizeArg(width: number, height: number): {
        width: number;
        height: number;
    };
    setPos(x: number, y: number): void;
    setSize(w: number, h: number): void;
    setOther(hPrm: HPRM): void;
}
export declare class PicBtnDesignCast extends DesignCast {
    private readonly btn;
    readonly hArg: HArg;
    constructor(btn: Button, hArg: HArg);
    private sp;
    setSp(sp: Sprite): void;
    getRect(): Rectangle;
    getPosArg(left: number, top: number): {
        left: number;
        top: number;
    };
    getSizeArg(width: number, height: number): {
        width: number;
        height: number;
    };
    setPos(x: number, y: number): void;
    setSize(w: number, h: number): void;
    setOther(hPrm: HPRM): void;
}
//# sourceMappingURL=DesignCast.d.ts.map