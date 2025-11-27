import { SysBase } from './SysBase';
import { Container } from 'pixi.js';
export declare class FocusMng {
    #private;
    constructor(cvs: HTMLCanvasElement, sys: SysBase);
    destroy(): void;
    add(cmp: Container | HTMLElement, on: () => boolean, off: () => void): void;
    remove(cmp: Container | HTMLElement): void;
    isFocus(cmp: Container | HTMLElement): boolean;
    prev(): void;
    next(): void;
    getFocus(): Container | HTMLElement | null;
    blur(): void;
}
//# sourceMappingURL=FocusMng.d.ts.map