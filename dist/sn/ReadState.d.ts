import { IVariable, IMain, IHEvt2Fnc, IEvt2Fnc } from './CmnInterface';
import { HArg, IHTag, ITag } from './Grammar';
import { LayerMng } from './LayerMng';
import { ScriptIterator } from './ScriptIterator';
import { EventListenerCtn } from './EventListenerCtn';
import { SoundMng } from './SoundMng';
import { FocusMng } from './FocusMng';
import { Config } from './Config';
export declare const INI_STYPAGE = "color: yellow; text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;";
export declare function enableEvent(): void;
export declare function disableEvent(): void;
export declare function playbackPage(saPageLog: string, $styPaging: string): void;
export declare class ReadState {
    #private;
    protected readonly hArg: HArg;
    static init($chgSt: (rs: ReadState) => void, $main: IMain, $val: IVariable, $layMng: LayerMng, $scrItr: ScriptIterator, $sndMng: SoundMng, $hTag: IHTag, $fcs: FocusMng, $procWheel4wle: (elc: EventListenerCtn, onIntr: () => void) => void, $elmHint: HTMLElement, $cfg: Config): void;
    protected constructor(hArg: HArg);
    get isSkipping(): boolean;
    static getHtmlElmList(KeY: string): {
        el: NodeListOf<HTMLElement>;
        id: string;
        sel: string;
    };
    static setEvt2Fnc(glb: boolean, key: string, fnc: IEvt2Fnc): void;
    protected static getEvt2Fnc: (key: string) => IEvt2Fnc | undefined;
    static clear_eventer(KeY: string, glb: boolean, key: string): void;
    static clear_event(hArg: HArg): boolean;
    s(hArg: HArg): boolean;
    readonly wait: ITag;
    readonly waitclick: ITag;
    protected waitTxtAndTimer(time: number, hArg: HArg): boolean;
    static noticeCompTxt(): void;
    static popLocalEvts(): IHEvt2Fnc;
    static pushLocalEvts(h: IHEvt2Fnc): void;
    protected waitRsvEvent(canUserAct: boolean, glb: boolean): void;
    l(hArg: HArg): boolean;
    p(hArg: HArg): boolean;
    waitLimitedEvent(hArg: HArg, onIntr: () => void): boolean;
    breakEvent(evnm: string): void;
    protected static evnm: string;
    waitEvent(evnm: string, hArg: HArg, onFire: () => void): boolean;
    protected onFinish(): void;
    protected onUserAct(): void;
    readonly isWait: boolean;
    fire(_KEY: string, _e: Event): void;
    page(hArg: HArg): boolean;
}
declare class Rs_S_fire extends ReadState {
    readonly isWait = true;
    fire(KEY: string, e: Event): void;
}
declare class Rs_S extends Rs_S_fire {
    static readonly go: ITag;
    breakEvent(): void;
    protected onFinish(): void;
    protected onUserAct(): void;
}
export declare class RsPagination extends Rs_S {
    #private;
    constructor(hArg: HArg);
    get isSkipping(): boolean;
    readonly s: ITag;
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