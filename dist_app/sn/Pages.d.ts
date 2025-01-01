import { HArg } from './Grammar';
import { IVariable } from './CmnInterface';
import { Layer } from './Layer';
import { SysBase } from './SysBase';
import { Container } from 'pixi.js';
export declare class Pages {
    #private;
    readonly cls: string;
    readonly hArg: HArg;
    readonly sys: SysBase;
    readonly val: IVariable;
    readonly ret: {
        isWait: boolean;
    };
    constructor(layname: string, cls: string, fore: Container, back: Container, hArg: HArg, sys: SysBase, val: IVariable, ret: {
        isWait: boolean;
    });
    destroy(): void;
    readonly lay: (hArg: HArg) => boolean;
    readonly getPage: (hArg: HArg) => Layer;
    static argChk_page(hash: HArg, def: string): string;
    get fore(): Layer;
    get back(): Layer;
    transPage(aPrm: Promise<void>[]): void;
}
//# sourceMappingURL=Pages.d.ts.map