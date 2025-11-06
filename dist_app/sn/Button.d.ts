import { IEvtMng } from './CmnLib';
import { TArg } from './Grammar';
import { Config } from './Config';
import { IMakeDesignCast } from './LayerMng';
import { Container, Rectangle } from 'pixi.js';
export declare class Button extends Container {
    #private;
    private readonly hArg;
    readonly evtMng: IEvtMng;
    readonly resolve: () => void;
    private readonly canFocus;
    static fontFamily: string;
    static init(cfg: Config): void;
    setText(_text: string): void;
    getBtnBounds: () => Rectangle;
    constructor(hArg: TArg, evtMng: IEvtMng, resolve: () => void, canFocus: () => boolean);
    destroy(): void;
    makeDesignCast(_gdc: IMakeDesignCast): void;
    showDesignCast(): void;
    cvsResize(): void;
    normal: () => void;
}
//# sourceMappingURL=Button.d.ts.map