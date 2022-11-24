import { HArg } from './Grammar';
import { IMain } from './CmnInterface';
import { SysBase } from './SysBase';
export declare class Main implements IMain {
    #private;
    private readonly sys;
    static cvs: HTMLCanvasElement;
    constructor(sys: SysBase);
    errScript(mes: string, isThrow?: boolean): void;
    resume: (fnc?: () => void) => void;
    resumeByJumpOrCall(hArg: HArg): void;
    readonly stop: () => void;
    setLoop(isLoop: boolean, mes?: string): void;
    fire(KEY: string, e: Event): void;
    destroy(ms_late?: number): Promise<void>;
    readonly isDestroyed: () => boolean;
}
//# sourceMappingURL=Main.d.ts.map