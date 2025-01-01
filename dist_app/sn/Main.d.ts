import { HArg } from './Grammar';
import { IMain } from './CmnInterface';
import { SysBase } from './SysBase';
export declare class Main implements IMain {
    #private;
    private readonly sys;
    cvs: HTMLCanvasElement;
    constructor(sys: SysBase);
    destroy(): void;
    readonly isDestroyed: () => boolean;
    errScript: (_mes: string, _isThrow?: boolean) => void;
    resumeByJumpOrCall(hArg: HArg): void;
    resume(): void;
    readonly stop: () => void;
    setLoop(isLoop: boolean, mes?: string): void;
}
//# sourceMappingURL=Main.d.ts.map