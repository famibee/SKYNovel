import { Application, Text, Sprite } from 'pixi.js';
import { Config } from './Config';
import { GrpLayer } from './GrpLayer';
import { Button } from './Button';
import { TxtStage } from './TxtStage';
import { AnalyzeTagArg, HPRM } from './AnalyzeTagArg';
import { HPage } from './LayerMng';
import { ScriptIterator } from './ScriptIterator';
import { SysBase } from './SysBase';
import { IPropParser } from './CmnInterface';
import { HArg } from './Grammar';

export declare class DesignCast {
    readonly bg_col: string;
    readonly isLay: boolean;
    static init(_appPixi: Application, _sys: SysBase, _scrItr: ScriptIterator, _prpPrs: IPropParser, _alzTagArg: AnalyzeTagArg, _cfg: Config, _hPages: HPage): void;
    static cvsResizeDesign(): void;
    constructor(bg_col: string, isLay?: boolean);
    destroy(): void;
    gethArg(): HArg;
    protected hArg: HArg;
    sethArg(hArg: HArg): void;
    setOther(_hPrm: HPRM): void;
    adopt(_idcCh: DesignCast): void;
    static enterMode(): void;
    static allHide(): void;
    set visible(_v: boolean);
    static leaveMode(): void;
    cvsResize(): void;
    make(): void;
    static replaceToken(_o: any): void;
}
export declare class GrpLayDesignCast extends DesignCast {
    constructor(_spLay: Sprite, _gl: GrpLayer);
    setSp(_sp: Sprite): void;
}
export declare class TxtLayDesignCast extends DesignCast {
    constructor(_spLay: Sprite, _ts: TxtStage);
}
export declare class TxtLayPadDesignCast extends DesignCast {
    constructor(_ts: TxtStage);
}
export declare class BtnDesignCast extends DesignCast {
    protected readonly btn: Button;
    readonly hArg: HArg;
    constructor(btn: Button, hArg: HArg);
}
export declare class TxtBtnDesignCast extends BtnDesignCast {
    constructor(btn: Button, hArg: HArg, _txt: Text);
}
export declare class PicBtnDesignCast extends BtnDesignCast {
    constructor(btn: Button, hArg: HArg);
    setSp(_sp: Sprite): void;
}
//# sourceMappingURL=DesignCast.d.ts.map