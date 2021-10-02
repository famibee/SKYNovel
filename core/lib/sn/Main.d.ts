import { IMain, HArg } from './CmnInterface';
import { SysBase } from './SysBase';
export declare class Main implements IMain {
    #private;
    private readonly sys;
    constructor(sys: SysBase);
    errScript(mes: string, isThrow?: boolean): void;
    resume: (fnc?: () => void) => void;
    resumeByJumpOrCall(hArg: HArg): void;
    readonly stop: () => void;
    setLoop(isLoop: boolean, mes?: string): void;
    destroy(ms_late?: number): Promise<void>;
    readonly isDestroyed: () => boolean;
}
//# sourceMappingURL=Main.d.ts.map