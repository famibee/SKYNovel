import { IVariable, IMain, IHEvt2Fnc, IEvt2Fnc, IMark } from './CmnInterface';
import { HArg, IHTag, ITag } from './Grammar';
import { LayerMng } from './LayerMng';
import { ScriptIterator } from './ScriptIterator';
import { EventListenerCtn } from './EventListenerCtn';
import { SoundMng } from './SoundMng';
import { FocusMng } from './FocusMng';
import { utils } from 'pixi.js';
interface IPageLog {
    key: string;
    fn: string;
    index: number;
    mark: IMark;
    week: boolean;
}
export declare class ReadState {
    #private;
    protected readonly hArg: HArg;
    static init($chgSt: (rs: ReadState) => void, $main: IMain, $val: IVariable, $layMng: LayerMng, $scrItr: ScriptIterator, $sndMng: SoundMng, $hTag: IHTag, $fcs: FocusMng, $procWheel4wle: (elc: EventListenerCtn, onIntr: () => void) => void, $elmHint: HTMLElement): void;
    protected constructor(hArg: HArg);
    get isSkipping(): boolean;
    static getHtmlElmList(KeY: string): {
        el: NodeListOf<HTMLElement>;
        id: string;
        sel: string;
    };
    static setEvt2Fnc(glb: boolean, key: string, fnc: IEvt2Fnc): void;
    static getEvt2Fnc: (key: string) => IEvt2Fnc | undefined;
    static clear_eventer(KeY: string, glb: boolean, key: string): void;
    static clear_event(hArg: HArg): boolean;
    s(hArg: HArg): boolean;
    readonly wait: ITag;
    readonly waitclick: ITag;
    protected waitTxtAndTimer(time: number, hArg: HArg): boolean;
    static noticeCompTxt(): void;
    protected static readonly eeTextBreak: utils.EventEmitter<string | symbol>;
    protected static readonly NOTICE_COMP_TXT = "sn:notice_comp_txt";
    static popLocalEvts(): IHEvt2Fnc;
    static pushLocalEvts(h: IHEvt2Fnc): void;
    protected waitEventBase(canUserAct: boolean, glb: boolean): void;
    waitLimitedEvent(hArg: HArg, onUserAct: () => void): boolean;
    finishLimitedEvent(): void;
    l(hArg: HArg): boolean;
    p(hArg: HArg): boolean;
    protected onFinish(): void;
    protected onUserAct(): void;
    readonly isWait: boolean;
    fire(_KEY: string, _e: Event): void;
    protected static aPage: IPageLog[];
    protected static stylePage: string;
    page(hArg: HArg): boolean;
}
export declare class RsEvtRsv extends ReadState {
    constructor();
}
declare class Rs_S extends ReadState {
    static readonly go: ITag;
    protected onFinish(): void;
    protected onUserAct(): void;
    readonly isWait = true;
    fire(KEY: string, e: Event): void;
}
export declare class Rs_WaitAny extends Rs_S {
    private readonly onFire;
    private constructor();
    static waitEvent(hArg: HArg, onFire: () => void): boolean;
    protected onFinish(): void;
    protected onUserAct(): void;
}
export declare class RsPagination extends Rs_S {
    #private;
    get isSkipping(): boolean;
    s(hArg: HArg): boolean;
    readonly wait: () => boolean;
    readonly waitclick: () => boolean;
    protected readonly waitTxtAndTimer: () => boolean;
    l(hArg: HArg): boolean;
    p(hArg: HArg): boolean;
    static readonly go: ITag;
    page(hArg: HArg): boolean;
    protected onFinish(): void;
    protected onUserAct(): void;
}
export {};
//# sourceMappingURL=ReadState.d.ts.map