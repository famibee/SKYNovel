import { HArg, ITag } from './Grammar';
import { DisplayObject, RenderTexture } from 'pixi.js';
import { Layer } from './Layer';
export interface IMyTrace {
    (txt: string, lvl?: string, fnline?: boolean, adjust_line?: number): void;
}
export interface IPropParser {
    parse(s: string): any;
    getValAmpersand(val: string): string;
}
export type PLUGIN_DECAB_RET = {
    ext_num: number;
    ab: ArrayBuffer;
};
export type T_PLUGIN_INFO = {
    window: {
        width: number;
        height: number;
    };
};
export type IPluginInitArg = {
    getInfo(): T_PLUGIN_INFO;
    addTag(tag_name: string, tag_fnc: ITag): void;
    addLayCls(cls: string, fnc: ILayerFactory): void;
    searchPath(fn: string, extptn?: string): string;
    getVal(arg_name: string, def?: number | string): object;
    resume(fnc?: () => void): void;
    render(dsp: DisplayObject, renTx?: RenderTexture, clear?: boolean): void;
    setDec(fnc: (ext: string, tx: string) => Promise<string>): void;
    setDecAB(fnc: (ab: ArrayBuffer) => Promise<PLUGIN_DECAB_RET>): void;
    setEnc(fnc: (tx: string) => Promise<string>): void;
    getStK(fnc: () => string): void;
    getHash(fnc: (str: string) => string): void;
};
export interface IPlugin {
    init(pia: IPluginInitArg): Promise<void>;
}
export interface HPlugin {
    [name: string]: IPlugin;
}
export interface ILayerFactory {
    (): Layer;
}
export type HSysBaseArg = {
    cur: string;
    crypto: boolean;
    dip: string;
};
export type SYS_DEC_RET = HTMLImageElement | HTMLVideoElement | ArrayBuffer;
export interface ISysBase {
    initVal(data: IData4Vari, hTmp: object, comp: (data: IData4Vari) => void): Promise<void>;
    flush(): void;
    dec(ext: string, tx: string): Promise<string>;
    decAB(ab: ArrayBuffer): Promise<SYS_DEC_RET>;
    addHook(fnc: IFncHook): void;
    callHook: IFncHook;
    send2Dbg: IFncHook;
    copyBMFolder(from: number, to: number): void;
    eraseBMFolder(place: number): void;
    destroy(): void;
}
export interface IFire {
    (KEY: string, e: Event): void;
}
export interface IFncHook {
    (type: string, o: any): void;
}
export interface IMain {
    errScript(mes: string, isThrow?: boolean): void;
    resume(fnc?: () => void): void;
    resumeByJumpOrCall(hArg: HArg): void;
    stop(): void;
    setLoop(v: boolean, mes?: string): void;
    fire(KEY: string, e: Event): void;
    isDestroyed(): boolean;
    destroy(ms_late?: number): void;
}
export interface IAreas {
    search(idx: number): boolean;
    record(idx: number): void;
    erase(idx: number): void;
}
export interface typeProcVal {
    (): any;
}
export interface ISetVal {
    (arg_name: string, val: any, autocast?: boolean): void;
}
export type Scope = 'tmp' | 'save' | 'sys' | 'mp';
export interface IVariable {
    setSys(sys: ISysBase): void;
    flush(): void;
    setDoRecProc(doRecProc: (doRec: boolean) => void): void;
    getVal(arg_name: string, def?: number | string): any;
    setVal_Nochk(scope: Scope, nm: string, val: any, autocast?: boolean): void;
    defTmp(name: string, fnc: typeProcVal): void;
    cloneMp(): IValMp;
    setMp(mp: IValMp): void;
    setMark(place: number, mark: IMark): void;
    getMark(place: number): IMark;
    cloneSave(): IValSave;
    mark2save(mark: IMark): void;
    touchAreaKidoku(fn: string): IAreas;
    getAreaKidoku(fn: string): IAreas;
    saveKidoku(): void;
    updateData(data: IData4Vari): void;
    defValTrg(name: string, fnc: ISetVal): void;
    doRecLog(): boolean;
    get tagCh_doWait(): boolean;
    get tagCh_doWait_Kidoku(): boolean;
    get tagCh_msecWait(): number;
    get tagCh_msecWait_Kidoku(): number;
}
export interface IValMp {
    [name: string]: string;
}
export interface IValSave {
    [name: string]: string;
}
export type IData4Vari = {
    sys: {
        [name: string]: any;
    };
    mark: {
        [name: string]: IMark;
    };
    kidoku: {
        [name: string]: any;
    };
};
export type IMark = {
    hSave: {
        [name: string]: any;
    };
    hPages: HIPage;
    aIfStk: number[];
    json?: any;
};
export interface IEvt2Fnc {
    (e: Event): void;
}
export interface IHEvt2Fnc {
    [name: string]: IEvt2Fnc;
}
export interface IGetFrm {
    getFrmDisabled: {
        (id: string): boolean;
    };
}
export interface IRecorder {
    recText(txt: string): void;
    recPagebreak(): void;
}
export type HIPage = {
    [name: string]: IPage;
};
export type IPage = {
    cls: string;
    fore: {
        [name: string]: any;
    };
    back: {
        [name: string]: any;
    };
};
export interface IPutCh {
    (ch: string, ruby: string): void;
}
export interface INoticeChgVolume {
    (vol: number): void;
}
//# sourceMappingURL=CmnInterface.d.ts.map