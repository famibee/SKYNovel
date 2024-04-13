import { IMakeDesignCast } from './LayerMng';
import { Config } from './Config';
import { HArg } from './Grammar';
import { IEvtMng } from './CmnLib';
import { Container, Rectangle, IDestroyOptions } from 'pixi.js';

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
    constructor(hArg: HArg, evtMng: IEvtMng, resolve: () => void, canFocus: () => boolean);
    destroy(_options?: IDestroyOptions | boolean): void;
    makeDesignCast(_gdc: IMakeDesignCast): void;
    showDesignCast(): void;
    cvsResize(): void;
    normal: () => void;
}
//# sourceMappingURL=Button.d.ts.map