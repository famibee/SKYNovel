import { HArg, IHTag } from './Grammar';
import { IEvt2Fnc, IHEvt2Fnc, IMain, IMark, IVariable } from './CmnInterface';
import { Config } from './Config';
import { ScriptIterator } from './ScriptIterator';
import { LayerMng } from './LayerMng';
import { EventMng } from './EventMng';
import { FocusMng } from './FocusMng';
import { SoundMng } from './SoundMng';
import { EventListenerCtn } from './EventListenerCtn';
interface IPageLog {
    key: string;
    fn: string;
    index: number;
    mark: IMark;
    week: boolean;
}
export declare class ReadingState {
    #private;
    static get rs(): ReadingState;
    constructor();
    static setEvt2Fnc(glb: boolean, key: string, fnc: IEvt2Fnc): void;
    static getEvt2Fnc: (key: string) => IEvt2Fnc | undefined;
    static clear_eventer(rawKeY: string, glb: boolean, key: string): void;
    static popLocalEvts(): IHEvt2Fnc;
    static pushLocalEvts(h: IHEvt2Fnc): void;
    static clear_event(hArg: HArg): boolean;
    static getHtmlElmList(KeY: string): {
        el: NodeListOf<HTMLElement>;
        id: string;
        sel: string;
    };
    static waitRsvEvent(glb: boolean, onUserAct?: () => void): void;
    static waitRsvEvent4Paging(): void;
    fire(rawKeY: string, e: Event): void;
    get isSkipping(): boolean;
    readonly isWait: boolean;
    static isFirstFire(): boolean;
    static resetFired(): void;
    static aPage: IPageLog[];
    static lenPage: number;
    static posPage: number;
    static styPaging: string;
    static readonly INI_STYPAGE = "color: yellow; text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;";
    static aKeysAtPaging: string[];
    static recodePage(week?: boolean): void;
    static playbackPage(saPageLog: string, $styPaging: string): void;
    beginProc(): void;
    endProc(): void;
    l(hArg: HArg): boolean;
    p(hArg: HArg): boolean;
    s(hArg: HArg): boolean;
    wait(hArg: HArg): boolean;
    page(hArg: HArg): boolean;
    static destroy(): void;
}
export declare class Reading {
    #private;
    static beginProc(proc_id: string, onNotify?: () => void, endProc?: boolean, onClickSkip?: () => void): void;
    static notifyEndProc(proc_id: string): void;
    static endProc(proc_id: string): void;
    static get procID(): string;
    static fire(KeY: string, e: Event, cancelAutoSkip?: boolean): void;
    static get isSkipping(): boolean;
    static get isWait(): boolean;
    static tagL_enabled: boolean;
    static skip_all: boolean;
    static skip_enabled: boolean;
    static auto_enabled: boolean;
    static cfg: Config;
    static hTag: IHTag;
    static main: IMain;
    static val: IVariable;
    static scrItr: ScriptIterator;
    static layMng: LayerMng;
    static goTxt: () => void;
    static get needGoTxt(): boolean;
    static evtMng: EventMng;
    static sndMng: SoundMng;
    static procWheel4wle: (elc: EventListenerCtn, onIntr: () => void) => void;
    static fcs: FocusMng;
    static init(cfg: Config, hTag: IHTag, main: IMain, val: IVariable, scrItr: ScriptIterator, layMng: LayerMng, evtMng: EventMng, sndMng: SoundMng, procWheel4wle: (elc: EventListenerCtn, onIntr: () => void) => void): void;
    static setFcs(fcs: FocusMng): void;
    static cancelAutoSkip(): void;
}
export {};
//# sourceMappingURL=Reading.d.ts.map