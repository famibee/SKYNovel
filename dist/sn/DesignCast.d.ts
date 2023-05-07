import { HArg } from './Grammar';
import { IPropParser } from './CmnInterface';
import { SysBase } from './SysBase';
import { ScriptIterator } from './ScriptIterator';
import { HPage } from './LayerMng';
import { AnalyzeTagArg, HPRM } from './AnalyzeTagArg';
import { TxtStage } from './TxtStage';
import { Button } from './Button';
import { GrpLayer } from './GrpLayer';
import { Config } from './Config';
import { Application, Rectangle, Text, Sprite, Point } from 'pixi.js';
export declare class DesignCast {
    #private;
    readonly bg_col: string;
    readonly isLay: boolean;
    protected static sys: SysBase;
    protected static prpPrs: IPropParser;
    protected static hPages: HPage;
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
    includeDesignArg(hArg: HArg): boolean;
    protected readonly hDesignArg: {
        [name: string]: 0;
    };
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
    protected parent?: DesignCast;
    adopt(idcCh: DesignCast): void;
    static enterMode(): void;
    static allHide(): void;
    set visible(v: boolean);
    static leaveMode(): void;
    cvsResize(): void;
    protected fncLay: () => void;
    protected div: HTMLDivElement | undefined;
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
    static replaceToken(o: any): void;
}
export declare class GrpLayDesignCast extends DesignCast {
    #private;
    private readonly spLay;
    private readonly gl;
    constructor(spLay: Sprite, gl: GrpLayer);
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
    protected readonly hDesignArg: {
        [name: string]: 0;
    };
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
}
export declare class BtnDesignCast extends DesignCast {
    protected readonly btn: Button;
    readonly hArg: HArg;
    constructor(btn: Button, hArg: HArg);
    sethArg(hArg: HArg): void;
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
    #private;
    constructor(btn: Button, hArg: HArg);
    setSp(sp: Sprite): void;
    protected getRect(): Rectangle;
    protected setSize(w: number, h: number): void;
    setOther(hPrm: HPRM): void;
    protected oldFn: () => string;
}
//# sourceMappingURL=DesignCast.d.ts.map