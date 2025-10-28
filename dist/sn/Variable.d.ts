import { T_H_VAL_MP } from './CallStack';
import { IHTag } from './Grammar';
import { IVariable, T_fncSetVal, typeProcVal, ISysBase, T_Data4Vari, T_Mark, Scope, T_VAL_DATA, T_VAL_BSNU } from './CmnInterface';
import { Config } from './Config';
import { Areas } from './Areas';
export declare class Variable implements IVariable {
    #private;
    private readonly cfg;
    constructor(cfg: Config, hTag: IHTag);
    setSys(sys: ISysBase): Promise<void>;
    updateData(data: T_Data4Vari): void;
    flush(): void;
    setDoRecProc(fnc: (doRec: boolean) => void): void;
    defTmp(name: string, fnc: typeProcVal): void;
    cloneMp(): {
        'const.sn.macro': string;
        'const.sn.me_call_scriptFn': string;
    };
    setMp(mp: T_H_VAL_MP): void;
    setMark(place: number, mark: T_Mark): void;
    getMark(place: number): T_Mark;
    cloneSave(): {
        'sn.userFnTail': string;
        'const.sn.autowc.enabled': boolean;
        'const.sn.autowc.text': string;
        'const.sn.autowc.time': number;
        'const.sn.mesLayer': string;
        'const.sn.styPaging': string;
        'sn.doRecLog': boolean;
        'const.sn.sLog': string;
        'const.sn.loopPlaying': string;
        'const.sn.scriptFn': string;
        'const.sn.scriptIdx': number;
    };
    mark2save(mark: T_Mark): void;
    touchAreaKidoku(fn: string): Areas;
    getAreaKidoku(fn: string): Areas;
    saveKidoku(): void;
    setVal_Nochk(scope: Scope, nm: string, ival: T_VAL_BSNU, autocast?: boolean): void;
    getVal(arg_name: string, def?: number | string, touch?: boolean): T_VAL_DATA;
    doRecLog(): boolean;
    get tagCh_doWait(): boolean;
    get tagCh_doWait_Kidoku(): boolean;
    get tagCh_msecWait(): number;
    get tagCh_msecWait_Kidoku(): number;
    defValTrg(name: string, fnc: T_fncSetVal): void;
}
//# sourceMappingURL=Variable.d.ts.map