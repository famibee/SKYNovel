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
    destroy(): void;
    gethArg(): HArg;
    protected hArg: HArg;
    protected id_tag: string;
    sethArg(hArg: HArg): void;
    protected getRect(): Rectangle;
    protected getPosArg(_x: number, _y: number): {
        [name: string]: any;
    };
    protected getSizeArg(_x: number, _y: number): {
        [name: string]: any;
    };
    protected setPos(_x: number, _y: number): void;
    protected setSize(_w: number, _h: number): void;
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
    protected oldFn: () => string;
    protected mov: Moveable | null;
    protected div: HTMLDivElement | null;
    protected lx: number;
    protected ly: number;
    protected updTrOr: () => void;
    protected onDragStart(): void;
    dspDesignCast(): void;
    static replaceToken(o: any): void;
}
export declare class GrpLayDesignCast extends DesignCast {
    private readonly spLay;
    private readonly gl;
    constructor(spLay: Sprite, gl: GrpLayer);
    private sp;
    setSp(sp: Sprite): void;
    protected getRect(): Rectangle;
    protected getPosArg(left: number, top: number): {
        left: number;
        top: number;
    };
    protected getSizeArg(width: number, height: number): {
        width: number;
        height: number;
    };
    protected setPos(x: number, y: number): void;
    protected setSize(w: number, h: number): void;
    setOther(hPrm: HPRM): void;
    protected oldFn: () => string;
}
export declare class TxtLayDesignCast extends DesignCast {
    private readonly spLay;
    private readonly ts;
    constructor(spLay: Sprite, ts: TxtStage);
    protected getRect(): Rectangle;
    protected getPosArg(left: number, top: number): {
        left: number;
        top: number;
    };
    protected getSizeArg(width: number, height: number): {
        width: number;
        height: number;
    };
    protected setPos(x: number, y: number): void;
    protected setSize(w: number, h: number): void;
    setOther(hPrm: HPRM): void;
}
export declare class TxtLayPadDesignCast extends DesignCast {
    private readonly ts;
    constructor(ts: TxtStage);
    protected getRect(): Rectangle;
    protected getPosArg(pl: number, pt: number): {
        pl: number;
        pt: number;
    };
    protected getSizeArg(w: number, h: number): {
        pr: number;
        pb: number;
    };
    protected setPos(pl: number, pt: number): void;
    protected setSize(w: number, h: number): void;
    setOther(hPrm: HPRM): void;
}
export declare class BtnDesignCast extends DesignCast {
    protected readonly btn: Button;
    readonly hArg: HArg;
    constructor(btn: Button, hArg: HArg);
    protected getPosArg(left: number, top: number): {
        left: number;
        top: number;
    };
    protected getSizeArg(width: number, height: number): {
        width: number;
        height: number;
    };
    protected setPos(x: number, y: number): void;
    setOther(_hPrm: HPRM): void;
    protected onDragStart(): void;
}
export declare class TxtBtnDesignCast extends BtnDesignCast {
    private readonly txt;
    constructor(btn: Button, hArg: HArg, txt: Text);
    protected getRect(): Rectangle;
    protected setSize(w: number, h: number): void;
    setOther(hPrm: HPRM): void;
    protected oldFn: () => string;
}
export declare class PicBtnDesignCast extends BtnDesignCast {
    constructor(btn: Button, hArg: HArg);
    private sp;
    setSp(sp: Sprite): void;
    protected getRect(): Rectangle;
    protected setSize(w: number, h: number): void;
    setOther(hPrm: HPRM): void;
    protected oldFn: () => string;
}
//# sourceMappingURL=DesignCast.d.ts.map