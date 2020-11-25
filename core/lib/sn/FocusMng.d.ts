import { Container } from 'pixi.js';
export declare class FocusMng {
    private aBtn;
    private idx;
    destroy(): void;
    add(cmp: Container | HTMLElement, on: () => boolean, off: () => void): void;
    remove(cmp: Container | HTMLElement): void;
    private radio_next;
    isFocus(cmp: Container | HTMLElement): boolean;
    prev(): void;
    next(): void;
    private readonly logFocus;
    getFocus(): Container | HTMLElement | null;
    blur(): void;
    private allOff;
}
//# sourceMappingURL=FocusMng.d.ts.map