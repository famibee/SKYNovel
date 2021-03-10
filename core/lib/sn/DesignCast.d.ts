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
import Moveable, { OnDrag, OnResize } from 'moveable';
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
    protected static divHint: HTMLDivElement;
    static init(appPixi: Application, sys: SysBase, scrItr: ScriptIterator, prpPrs: IPropParser, alzTagArg: AnalyzeTagArg, cfg: Config, hPages: HPage): void;
    protected static setHint(txt: string, x: number, y: number, dc: DesignCast): void;
    static cvsResizeDesign(): void;
    constructor(bg_col: string, isLay?: boolean);
    destroy(): void;
    gethArg(): HArg;
    protected hArg: HArg;
    protected id_tag: string;
    sethArg(hArg: HArg): void;
    protected getRect(): Rectangle;
    protected cnvPosArg(_x: number, _y: number): {
        [name: string]: any;
    };
    protected cnvSizeArg(_x: number, _y: number): {
        [name: string]: any;
    };
    protected setPos(_x: number, _y: number): void;
    protected setSize(_w: number, _h: number): void;
    setOther(_hPrm: HPRM): void;
    protected child?: DesignCast;
    private parent?;
    adopt(idcCh: DesignCast): void;
    private static readonly ID_DESIGNMODE;
    private static cntDesignCast;
    private static hId2dc;
    static enterMode(): void;
    private static aDC;
    static allHide(): void;
    set visible(v: boolean);
    static leaveMode(): void;
    cvsResize(): void;
    private resizeDiv;
    private fncLay;
    protected mov: Moveable | null;
    protected div: HTMLDivElement | null;
    protected lx: number;
    protected ly: number;
    protected rect: Rectangle;
    protected pivot: Point;
    protected scale: Point;
    protected rotation: number;
    protected oldFn: () => string;
    protected onDragStart(): void;
    protected readonly rotatable: boolean;
    make(): void;
    protected procDragHint(e: OnDrag, left: number, top: number): void;
    protected procResizeHint(e: OnResize, left: number, top: number): void;
    static replaceToken(o: any): void;
}
export declare class GrpLayDesignCast extends DesignCast {
    private readonly spLay;
    private readonly gl;
    constructor(spLay: Sprite, gl: GrpLayer);
    private sp;
    setSp(sp: Sprite): void;
    protected getRect(): Rectangle;
    protected cnvPosArg(left: number, top: number): {
        left: number;
        top: number;
    };
    protected cnvSizeArg(width: number, height: number): {
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
    protected cnvPosArg(left: number, top: number): {
        left: number;
        top: number;
    };
    protected cnvSizeArg(width: number, height: number): {
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
    protected readonly rotatable = false;
    protected getRect(): Rectangle;
    protected cnvPosArg(pl: number, pt: number): {
        pl: number;
        pt: number;
    };
    protected cnvSizeArg(w: number, h: number): {
        pr: number;
        pb: number;
    };
    protected setPos(x: number, y: number): void;
    protected setSize(w: number, h: number): void;
    setOther(hPrm: HPRM): void;
    protected procDragHint(e: OnDrag, left: number, top: number): void;
    protected procResizeHint(e: OnResize, left: number, top: number): void;
    private procHint;
}
export declare class BtnDesignCast extends DesignCast {
    protected readonly btn: Button;
    readonly hArg: HArg;
    constructor(btn: Button, hArg: HArg);
    protected cnvPosArg(left: number, top: number): {
        left: number;
        top: number;
    };
    protected cnvSizeArg(width: number, height: number): {
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