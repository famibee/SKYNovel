import { HArg, IVariable } from './CmnInterface';
import { Layer } from './Layer';
import { SysBase } from './SysBase';
import { Container } from 'pixi.js';
export declare class Pages {
    private readonly cls_;
    private pg;
    constructor(layer: string, cls_: string, fore: Container, back: Container, hArg: HArg, sys: SysBase, val: IVariable, ret: {
        isWait: boolean;
    });
    destroy(): void;
    readonly lay: (hArg: HArg) => boolean;
    readonly getPage: (hArg: HArg) => Layer;
    static argChk_page(hash: HArg, def: string): string;
    get cls(): string;
    get fore(): Layer;
    get back(): Layer;
    transPage(aPrm: Promise<void>[]): void;
}
//# sourceMappingURL=Pages.d.ts.map