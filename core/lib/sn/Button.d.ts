import { Container, Text, Rectangle, Sprite, IDestroyOptions } from 'pixi.js';
import { IEvtMng } from './CmnLib';
import { HArg } from './CmnInterface';
import { Config } from './Config';
import { IMakeDesignCast } from './LayerMng';
export declare class Button extends Container {
    #private;
    private readonly hArg;
    private readonly evtMng;
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
    update_b_pic(fn: string, txt: Text): void;
    update_pic(fn: string, sp: Sprite): void;
}
//# sourceMappingURL=Button.d.ts.map