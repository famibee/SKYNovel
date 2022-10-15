import { IHTag } from './Grammar';
import { IVariable, ISetVal, typeProcVal, ISysBase, IData4Vari, IMark, IValMp, IValSave } from './CmnInterface';
import { Config } from './Config';
import { Areas } from './Areas';
export declare class Variable implements IVariable {
    #private;
    private readonly cfg;
    constructor(cfg: Config, hTag: IHTag);
    setSys(sys: ISysBase): void;
    updateData(data: IData4Vari): void;
    flush(): void;
    setDoRecProc(fnc: (doRec: boolean) => void): void;
    defTmp(name: string, fnc: typeProcVal): void;
    cloneMp(): IValMp;
    setMp(mp: IValMp): void;
    setMark(place: number, mark: IMark): void;
    readonly getMark: (place: number) => IMark;
    cloneSave(): IValSave;
    mark2save(mark: IMark): void;
    loadScrWork(fn: string): void;
    getAreaKidoku: (fn: string) => Areas;
    saveKidoku(): void;
    setVal_Nochk(scope: string, nm: string, val: any, autocast?: boolean): void;
    readonly getVal: (arg_name: string, def?: number | string) => any;
    doRecLog(): boolean;
    defValTrg(name: string, fnc: ISetVal): void;
}
//# sourceMappingURL=Variable.d.ts.map