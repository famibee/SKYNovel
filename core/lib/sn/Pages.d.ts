import { HArg, IVariable } from './CmnInterface';
import { Layer } from './Layer';
import { SysBase } from './SysBase';
import { Container } from 'pixi.js';
export declare class Pages {
    private cls_;
    private pg;
    constructor(layer: string, cls_: string, fore: Container, hArgFore: HArg, back: Container, hArgBack: HArg, sys: SysBase, val: IVariable);
    destroy(): void;
    lay(hArg: HArg): boolean;
    getPage(hArg: HArg): Layer;
    static argChk_page(hash: HArg, def: string): string;
    readonly cls: string;
    readonly fore: Layer;
    readonly back: Layer;
    transPage(): void;
}
