import { Container } from 'pixi.js';
export declare class FocusMng {
    #private;
    private readonly cvs;
    constructor(cvs: HTMLCanvasElement);
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