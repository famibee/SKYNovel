import { IHTag } from './Grammar';
import { IVariable, ISetVal, typeProcVal, ISysBase, IData4Vari, IMark, IValMp, Scope } from './CmnInterface';
import { Config } from './Config';
import { Areas } from './Areas';
export declare class Variable implements IVariable {
    #private;
    private readonly cfg;
    constructor(cfg: Config, hTag: IHTag);
    setSys(sys: ISysBase): Promise<void>;
    updateData(data: IData4Vari): void;
    flush(): void;
    setDoRecProc(fnc: (doRec: boolean) => void): void;
    defTmp(name: string, fnc: typeProcVal): void;
    cloneMp(): any;
    setMp(mp: IValMp): void;
    setMark(place: number, mark: IMark): void;
    readonly getMark: (place: number) => IMark;
    cloneSave(): any;
    mark2save(mark: IMark): void;
    touchAreaKidoku(fn: string): Areas;
    readonly getAreaKidoku: (fn: string) => Areas;
    saveKidoku(): void;
    setVal_Nochk(scope: Scope, nm: string, val: any, autocast?: boolean): void;
    readonly getVal: (arg_name: string, def?: number | string) => any;
    doRecLog(): boolean;
    get tagCh_doWait(): boolean;
    get tagCh_doWait_Kidoku(): boolean;
    get tagCh_msecWait(): number;
    get tagCh_msecWait_Kidoku(): number;
    defValTrg(name: string, fnc: ISetVal): void;
}
//# sourceMappingURL=Variable.d.ts.map