import { HArg, ITag } from './Grammar';
export interface IMyTrace {
    (txt: string, lvl?: string, fnline?: boolean, adjust_line?: number): void;
}
export interface IPropParser {
    parse(s: string): any;
    getValAmpersand(val: string): string;
}
import { DisplayObject, RenderTexture } from 'pixi.js';
export declare type PLUGIN_PRE_RET = {
    ret: string;
    ext_num: number;
};
export declare type IPluginInitArg = {
    addTag(tag_name: string, tag_fnc: ITag): void;
    addLayCls(cls: string, fnc: ILayerFactory): void;
    searchPath(fn: string, extptn?: string): string;
    getVal(arg_name: string, def?: number | string): object;
    resume(fnc?: () => void): void;
    render(dsp: DisplayObject, renTx?: RenderTexture, clear?: boolean): void;
    setDec(fnc: (ext: string, d: string | ArrayBuffer) => PLUGIN_PRE_RET): void;
    setEnc(fnc: (d: string) => string): void;
    getStK(fnc: () => string): void;
    getHash(fnc: (data: string) => string): void;
};
export interface IPlugin {
    init(pia: IPluginInitArg): Promise<void>;
}
export interface HPlugin {
    [name: string]: IPlugin;
}
import { Layer } from './Layer';
export interface ILayerFactory {
    (): Layer;
}
export declare type HSysBaseArg = {
    cur: string;
    crypto: boolean;
    dip: string;
};
export declare type SYS_DEC_RET = HTMLImageElement | ArrayBuffer | HTMLVideoElement | string;
export interface ISysBase {
    loadPath(hPathFn2Exts: IFn2Path, cfg: IConfig): void;
    initVal(data: IData4Vari, hTmp: object, comp: (data: IData4Vari) => void): void;
    flush(): void;
    decStr(ext: string, d: string): string;
    dec(ext: string, ab: ArrayBuffer): Promise<SYS_DEC_RET>;
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
export declare type T_CFG = {
    book: {
        title: string;
        creator: string;
        cre_url: string;
        publisher: string;
        pub_url: string;
        detail: string;
        version: string;
    };
    save_ns: string;
    window: {
        width: number;
        height: number;
    };
    log: {
        max_len: number;
    };
    init: {
        bg_color: string;
        tagch_msecwait: number;
        auto_msecpagewait: number;
        escape: string;
    };
    debug: {
        devtool: boolean;
        token: boolean;
        tag: boolean;
        putCh: boolean;
        debugLog: boolean;
        baseTx: boolean;
        masume: boolean;
        variable: boolean;
    };
    code: {
        [fold_nm: string]: boolean;
    };
    debuger_token: string;
};
export interface IExts {
    [ext: string]: string;
}
export interface IFn2Path {
    [fn: string]: IExts;
}
export interface IConfig {
    oCfg: T_CFG;
    getNs(): string;
    searchPath(fn: string, extptn?: string): string;
    addPath(fn: string, h_exts: IExts): void;
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
export interface IVariable {
    setSys(sys: ISysBase): void;
    flush(): void;
    setDoRecProc(doRecProc: (doRec: boolean) => void): void;
    getVal(arg_name: string, def?: number | string): any;
    setVal_Nochk(scope: string, nm: string, val: any, autocast?: boolean): void;
    defTmp(name: string, fnc: typeProcVal): void;
    cloneMp(): IValMp;
    setMp(mp: IValMp): void;
    setMark(place: number, mark: IMark): void;
    getMark(place: number): IMark;
    cloneSave(): IValSave;
    mark2save(mark: IMark): void;
    loadScrWork(fn: string): void;
    getAreaKidoku(fn: string): IAreas;
    saveKidoku(): void;
    updateData(data: IData4Vari): void;
    defValTrg(name: string, fnc: ISetVal): void;
    doRecLog(): boolean;
}
export interface IValMp {
    [name: string]: string;
}
export interface IValSave {
    [name: string]: string;
}
export declare type IData4Vari = {
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
export declare type IMark = {
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
export declare type HIPage = {
    [name: string]: IPage;
};
export declare type IPage = {
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