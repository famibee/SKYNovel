import { TArg } from './Grammar';
import { T_Variable } from './CmnInterface';
import { Layer } from './Layer';
import { SysBase } from './SysBase';
import { Container } from 'pixi.js';
export declare class Pages {
    #private;
    readonly cls: string;
    readonly hArg: TArg;
    readonly sys: SysBase;
    readonly val: T_Variable;
    readonly ret: {
        isWait: boolean;
    };
    constructor(layname: string, cls: string, fore: Container, back: Container, hArg: TArg, sys: SysBase, val: T_Variable, ret: {
        isWait: boolean;
    });
    destroy(): void;
    readonly lay: (hArg: TArg) => boolean;
    readonly getPage: (hArg: TArg) => Layer;
    static argChk_page(hash: TArg, def: string): string;
    get fore(): Layer;
    get back(): Layer;
    transPage(aPrm: Promise<void>[]): void;
}
//# sourceMappingURL=Pages.d.ts.map