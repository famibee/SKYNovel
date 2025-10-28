import { HSysBaseArg, T_SEARCHPATH } from './ConfigBase';
import { HArg, ITag } from './Grammar';
import { Areas, T_H_Areas } from './Areas';
import { T_H_VAL_MP } from './CallStack';
import { Layer, T_RecordPlayBack_lay } from './Layer';
import { DisplayObject, RenderTexture } from 'pixi.js';
export type IMyTrace = (txt: string, lvl?: string, fnline?: boolean, adjust_line?: number) => void;
export type IPropParser = {
    parse(s: string): any;
    getValAmpersand(val: string): string;
};
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
    searchPath: T_SEARCHPATH;
    getVal(arg_name: string, def?: number | string): any;
    resume(fnc?: () => void): void;
    render(dsp: DisplayObject, renTx?: RenderTexture, clear?: boolean): void;
    setDec(fnc: (ext: string, tx: string) => Promise<string>): void;
    setDecAB(fnc: (ab: ArrayBuffer) => Promise<PLUGIN_DECAB_RET>): void;
    setEnc(fnc: (tx: string) => Promise<string>): void;
    getStK(fnc: () => string): void;
    getHash(fnc: (str: string) => string): void;
};
export type IPlugin = {
    init(pia: IPluginInitArg): Promise<void>;
};
export type HPlugin = {
    [name: string]: IPlugin;
};
export type ILayerFactory = () => Layer;
export type T_SysBaseParams = [
    hPlg: HPlugin,
    arg?: HSysBaseArg
];
export type T_SysBaseLoadedParams = [
    hPlg: HPlugin,
    arg: HSysBaseArg
];
export type SYS_DEC_RET = HTMLImageElement | HTMLVideoElement | ArrayBuffer;
export type ISysBase = {
    initVal(data: T_Data4Vari, hTmp: T_H_TMP_DATA, comp: (data: T_Data4Vari) => void): Promise<void>;
    flush(): void;
    dec(ext: string, tx: string): Promise<string>;
    decAB(ab: ArrayBuffer): Promise<SYS_DEC_RET>;
    addHook(fnc: IFncHook): void;
    callHook: IFncHook;
    send2Dbg: IFncHook;
    copyBMFolder(from: number, to: number): void;
    eraseBMFolder(place: number): void;
    destroy(): void;
};
export type IFire = (KEY: string, e: Event) => void;
export type IFncHook = (type: string, o: any) => void;
export type IMain = {
    errScript(mes: string, isThrow?: boolean): void;
    cvs: HTMLCanvasElement;
    resume(fnc?: () => void): void;
    resumeByJumpOrCall(hArg: HArg): void;
    stop(): void;
    setLoop(v: boolean, mes?: string): void;
    destroy(): void;
};
export type T_VAL_BSN = boolean | string | number;
export type T_VAL_BSNU = T_VAL_BSN | undefined;
export type T_VAL_DATA = T_VAL_BSNU | null | typeof NaN;
export type T_VAL_DATA_FNC = T_VAL_DATA | (() => boolean) | (() => string) | (() => number);
export type T_H_VAL_DATA = {
    [val_name: string]: T_VAL_DATA_FNC;
};
export type T_H_SAVE_DATA = {
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
export declare function creSAVEDATA(): T_H_SAVE_DATA;
export type T_H_SYS_DATA = {
    'const.sn.cfg.ns': string;
    'const.sn.aPageLog': string;
    'const.sn.nativeWindow.x': number;
    'const.sn.nativeWindow.y': number;
    'const.sn.nativeWindow.w': number;
    'const.sn.nativeWindow.h': number;
    'const.sn.save.place': number;
    'const.sn.sound.BGM.volume': number;
    'const.sn.sound.SE.volume': number;
    'const.sn.sound.SYS.volume': number;
    'sn.auto.msecLineWait': number;
    'sn.auto.msecLineWait_Kidoku': number;
    'sn.auto.msecPageWait': number;
    'sn.auto.msecPageWait_Kidoku': number;
    'sn.skip.mode': string;
    'sn.sound.BGM.vol_mul_talking': number;
    'sn.sound.global_volume': T_fncSetVal;
    'sn.sound.movie_volume': T_fncSetVal;
    'sn.tagCh.canskip': boolean;
    'sn.tagCh.doWait': boolean;
    'sn.tagCh.doWait_Kidoku': boolean;
    'sn.tagCh.msecWait': number;
    'sn.tagCh.msecWait_Kidoku': number;
    'TextLayer.Back.Alpha': number;
};
export declare function creSYS_DATA(): T_H_SYS_DATA;
export type T_H_TMP_DATA = {
    'const.Date.getDateStr': () => string;
    'const.Date.getTime': () => number;
    'const.sn.bookmark.json': string;
    'const.sn.config.window.width': number;
    'const.sn.config.window.height': number;
    'const.sn.config.book.title': string;
    'const.sn.config.book.version': string;
    'const.sn.displayState': boolean;
    'const.sn.isApp': boolean;
    'const.sn.isDbg': boolean;
    'const.sn.isPackaged': boolean;
    'const.sn.isPaging': boolean;
    'const.sn.isDarkMode': boolean;
    'const.sn.isDebugger': boolean;
    'const.sn.isFirstBoot': boolean;
    'const.sn.isKidoku': boolean;
    'const.sn.key.alternate': boolean;
    'const.sn.key.back': boolean;
    'const.sn.key.command': boolean;
    'const.sn.key.control': boolean;
    'const.sn.key.end': boolean;
    'const.sn.key.escape': boolean;
    'const.sn.last_page_plain_text': string;
    'const.sn.last_page_text': string;
    'const.sn.Math.PI': number;
    'const.sn.navigator.language': string;
    'const.sn.needClick2Play': () => boolean;
    'const.sn.platform': string;
    'const.sn.screenResolutionX': number;
    'const.sn.screenResolutionY': number;
    'const.sn.sound.codecs': string;
    'const.sn.aIfStk.length': number;
    'const.sn.vctCallStk.length': number;
    'sn.auto.enabled': boolean;
    'sn.button.fontFamily': string;
    'sn.eventArg': string;
    'sn.eventLabel': string;
    'sn.skip.all': boolean;
    'sn.skip.enabled': boolean;
    'sn.tagL.enabled': boolean;
};
export declare function creTMP_DATA(): T_H_TMP_DATA;
export type Scope = 'tmp' | 'save' | 'sys' | 'mp';
export type typeProcVal = () => T_VAL_BSN;
export type T_fncSetVal = (arg_name: string, val: T_VAL_BSN, autocast?: boolean) => void;
export type IVariable = {
    setSys(sys: ISysBase): Promise<void>;
    flush(): void;
    setDoRecProc(doRecProc: (doRec: boolean) => void): void;
    getVal(arg_name: string, def?: number | string, touch?: boolean): T_VAL_DATA;
    setVal_Nochk(scope: Scope, nm: string, val: T_VAL_BSNU, autocast?: boolean): void;
    defTmp(name: string, fnc: typeProcVal): void;
    cloneMp(): T_H_VAL_MP;
    setMp(mp: T_H_VAL_MP): void;
    setMark(place: number, mark: T_Mark): void;
    getMark(place: number): T_Mark | undefined;
    cloneSave(): T_H_SAVE_DATA;
    mark2save(mark: T_Mark): void;
    touchAreaKidoku(fn: string): Areas;
    getAreaKidoku(fn: string): Areas | undefined;
    saveKidoku(): void;
    updateData(data: T_Data4Vari): void;
    defValTrg(name: string, fnc: T_fncSetVal): void;
    doRecLog(): boolean;
    get tagCh_doWait(): boolean;
    get tagCh_doWait_Kidoku(): boolean;
    get tagCh_msecWait(): number;
    get tagCh_msecWait_Kidoku(): number;
};
export type T_H_VAL_MARK = {
    [place: number]: T_Mark;
};
export type T_H_VAL_KIDOKU = {
    [fn: string]: T_H_Areas;
};
export type T_Data4Vari = {
    sys: T_H_SYS_DATA;
    mark: T_H_VAL_MARK;
    kidoku: T_H_VAL_KIDOKU;
};
export type T_Mark = {
    hSave: T_H_SAVE_DATA;
    hPages: HIPage;
    aIfStk: number[];
    json?: HArg;
};
export type T_Evt2Fnc = (e: Event) => void;
export type T_HEvt2Fnc = {
    [name: string]: T_Evt2Fnc;
};
export type IGetFrm = {
    getFrmDisabled: (id: string) => boolean;
};
export type HIPage = {
    [name: string]: IPage;
};
export type IPage = {
    cls: string;
    fore: T_RecordPlayBack_lay;
    back: T_RecordPlayBack_lay;
};
export type IPutCh = (ch: string, ruby: string) => void;
export type INoticeChgVolume = (vol: number) => void;
//# sourceMappingURL=CmnInterface.d.ts.map