export declare type HArg = {
    タグ名?: string;
    layer?: string;
    class?: string;
    index?: string;
    dive?: string;
    page?: string;
    alpha?: number;
    pivot_x?: number;
    pivot_y?: number;
    rotation?: number;
    scale_x?: number;
    scale_y?: number;
    visible?: boolean;
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    pl?: number;
    pr?: number;
    pt?: number;
    pb?: number;
    rotate?: number;
    in_style?: string;
    out_style?: string;
    ffs?: string;
    noffs?: string;
    time?: number;
    rule?: string;
    glsl?: string;
    pos?: string;
    text?: string;
    wait?: number;
    record?: boolean;
    pic?: string;
    enabled?: boolean;
    hint?: string;
    hint_tate?: boolean;
    clickse?: string;
    enterse?: string;
    leavese?: string;
    clicksebuf?: string;
    entersebuf?: string;
    leavesebuf?: string;
    onenter?: string;
    onleave?: string;
    t?: string;
    r?: string;
    exp?: string;
    char?: string;
    sesame?: string;
    cast?: string;
    val?: string;
    flags?: string;
    reg?: string;
    len?: string;
    url?: string;
    format?: string;
    chain?: string;
    fn?: string;
    face?: string;
    label?: string;
    call?: boolean;
    global?: boolean;
    name?: string;
    blendmode?: string;
    clear_local_event?: string;
    style?: string;
    style_hover?: string;
    style_clicked?: string;
    b_width?: string;
    b_height?: string;
    b_color?: string;
    b_alpha?: number;
    b_alpha_isfixed?: string;
    b_pic?: string;
    back_clear?: string;
    r_align?: string;
    max_col?: string;
    max_row?: string;
    bura_col?: string;
    chk_overrow?: string;
    dx?: number;
    dy?: number;
    key?: string;
    type?: string;
    breakout?: Function;
    arg?: HArg;
    fnc?: (e: Event) => void;
    fold?: boolean;
    filter?: string;
    ease?: string;
    canskip?: boolean;
    centering?: boolean;
    x?: number | string;
    y?: number | string;
    id?: string;
    src?: string;
    var_name?: string;
    set_fnc?: string;
    break_fnc?: string;
    swipe?: string;
    f2tap?: string;
    f2move?: string;
    f3tap?: string;
    from?: number;
    to?: number | string;
    place?: number;
    add?: string;
    del?: string;
    buf?: string;
    buf2?: string;
    loop?: boolean;
    volume?: number;
    ret_ms?: number;
    end_ms?: number;
    join?: boolean;
    do_rec?: boolean;
    ':id_dc'?: string;
    ':id_tag'?: string;
    ':path'?: string;
    ':ln'?: number;
    ':col_s'?: number;
    ':col_e'?: number;
    ':idx_tkn'?: number;
    ':token'?: string;
    design_unit?: boolean;
};
export interface ITag {
    (hArg: HArg): boolean;
}
export interface IHTag {
    [name: string]: ITag;
}
export interface IMyTrace {
    (txt: string, lvl?: string, fnline?: boolean, adjust_line?: number): void;
}
export declare type Script = {
    aToken: string[];
    len: number;
    aLNum: number[];
};
export interface IPropParser {
    parse(s: string): any;
    getValAmpersand(val: string): string;
}
import { DisplayObject, RenderTexture } from 'pixi.js';
export declare type IPluginInitArg = {
    addTag(tag_name: string, tag_fnc: ITag): void;
    addLayCls(cls: string, fnc: ILayerFactory): void;
    searchPath(fn: string, extptn?: string): string;
    getVal(arg_name: string, def?: number | string): object;
    resume(fnc?: () => void): void;
    render(dsp: DisplayObject, renTx?: RenderTexture, clear?: boolean): void;
    setPre(fnc: (ext: string, data: string) => Promise<string>): void;
    setEnc(fnc: (data: string) => Promise<string>): void;
    getStK(fnc: () => string): void;
    getHash(fnc: (data: string) => string): void;
};
export interface IPlugin {
    init(plgArg: IPluginInitArg): boolean;
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
export interface ISysBase {
    loadPathAndVal(hPathFn2Exts: IFn2Path, fncLoaded: () => void, cfg: IConfig): void;
    initVal(data: IData4Vari, hTmp: object, comp: (data: IData4Vari) => void): void;
    flush(): void;
    pre(ext: string, data: string): Promise<string>;
    addHook(fnc: IFncHook): void;
    callHook: IFncHook;
    send2Dbg: IFncHook;
    copyBMFolder(from: number, to: number): void;
    eraseBMFolder(place: number): void;
}
export interface IFire {
    (KEY: string, e: Event): void;
}
export interface IFncHook {
    (type: string, o: any): void;
}
export interface IExts {
    [ext: string]: string;
}
export interface IFn2Path {
    [fn: string]: IExts;
}
export interface IConfig {
    oCfg: any;
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