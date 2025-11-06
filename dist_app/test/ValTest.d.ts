import { T_Variable, T_ProcVal, T_fncSetVal, T_Mark, T_Data4Vari, T_VAL_DATA, T_VAL_BSNU } from '../src/sn/CmnInterface';
import { Areas } from '../src/sn/Areas';
export declare class ValTest implements T_Variable {
    #private;
    init(): Promise<void>;
    flush(): void;
    setDoRecProc(_doRecProc: (doRec: boolean) => void): void;
    getVal(arg_name: string): T_VAL_DATA;
    setVal_Nochk: (_sc: string, _nm: string, _v: T_VAL_BSNU, _ac?: boolean) => void;
    defTmp: (_name: string, _fnc: T_ProcVal) => void;
    cloneMp: () => {
        'const.sn.macro': string;
        'const.sn.me_call_scriptFn': string;
    };
    setMp: () => void;
    setMark(_place: number, _mark: T_Mark): undefined;
    getMark(_place: number): T_Mark;
    cloneSave: () => import('../src/sn/CmnInterface').T_H_SAVE_DATA;
    mark2save(_mark: T_Mark): void;
    touchAreaKidoku: (_fn: string) => Areas;
    getAreaKidoku: (_fn: string) => Areas;
    saveKidoku(): void;
    updateData(_data: T_Data4Vari): void;
    defValTrg(_name: string, _fnc: T_fncSetVal): void;
    doRecLog: () => boolean;
    readonly tagCh_doWait = false;
    readonly tagCh_doWait_Kidoku = false;
    readonly tagCh_msecWait = 0;
    readonly tagCh_msecWait_Kidoku = 0;
}
//# sourceMappingURL=ValTest.d.ts.map