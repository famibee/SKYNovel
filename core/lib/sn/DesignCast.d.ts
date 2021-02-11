import { HArg, IPropParser } from './CmnInterface';
import { SysBase } from './SysBase';
import { ScriptIterator } from './ScriptIterator';
import { HPage } from './LayerMng';
import { AnalyzeTagArg, HPRM } from './AnalyzeTagArg';
import { TxtStage } from './TxtStage';
import { Button } from './Button';
import { Application, Rectangle, Text, Sprite } from 'pixi.js';
export declare class DesignCast {
    readonly bg_col: string;
    readonly isLay: boolean;
    hArg: HArg;
    constructor(bg_col: string, isLay?: boolean);
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
    private static divDesignRoot;
    private static sys;
    private static scrItr;
    protected static prpPrs: IPropParser;
    private static alzTagArg;
    static init(appPixi: Application, sys: SysBase, scrItr: ScriptIterator, prpPrs: IPropParser, alzTagArg: AnalyzeTagArg): void;
    private static readonly ID_DESIGNMODE;
    private static idDesignCast;
    private static id2gdc;
    static enterMode(node: string, hPages: HPage): void;
    static leaveMode(): void;
    static cvsResizeDesign(): void;
    dspDesignCast(hPages: HPage): void;
    private tidDelay;
    private delayChgCast;
    static replaceToken(o: any, hPages: HPage): void;
}
export declare class TxtLayDesignCast extends DesignCast {
    private readonly ts;
    private readonly spLay;
    constructor(ts: TxtStage, spLay: Sprite);
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
    getSizeArg(w: number, h: number): {
        width: number;
        height: number;
    };
    setPos(x: number, y: number): void;
    setSize(w: number, h: number): void;
}
export declare class PicBtnDesignCast extends DesignCast {
    private readonly btn;
    readonly hArg: HArg;
    constructor(btn: Button, hArg: HArg);
    private sp;
    setSp(sp: Sprite): void;
    getRect(): Rectangle;
    getPosArg(x: number, y: number): {
        left: number;
        top: number;
    };
    getSizeArg(w: number, h: number): {
        width: number;
        height: number;
    };
    setPos(x: number, y: number): void;
    setSize(w: number, h: number): void;
}
//# sourceMappingURL=DesignCast.d.ts.map