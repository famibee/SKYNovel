import { IEvtMng, IHEvt2Fnc } from './CmnLib';
import { HArg, IHTag, IVariable, IMain } from './CmnInterface';
import { LayerMng } from './LayerMng';
import { ScriptIterator } from './ScriptIterator';
import { EventListenerCtn } from './EventListenerCtn';
import { interaction, DisplayObject, Application } from 'pixi.js';
import { SoundMng } from './SoundMng';
import { Config } from './Config';
export declare class EventMng implements IEvtMng {
    private cfg;
    private hTag;
    private appPixi;
    private main;
    private layMng;
    private val;
    private sndMng;
    private scrItr;
    private elc;
    private enMDownTap;
    private ham;
    private hHamEv;
    constructor(cfg: Config, hTag: IHTag, appPixi: Application, main: IMain, layMng: LayerMng, val: IVariable, sndMng: SoundMng, scrItr: ScriptIterator);
    resvFlameEvent(win: Window): void;
    private ev_keydown;
    private ev_contextmenu;
    private ev_wheel;
    destroy(): void;
    private hLocalEvt2Fnc;
    private hGlobalEvt2Fnc;
    private defEvt2Fnc;
    popLocalEvts(): IHEvt2Fnc;
    pushLocalEvts(a: IHEvt2Fnc): void;
    stdWait(fnc: (e?: interaction.InteractionEvent) => void, canskip?: boolean): void;
    button(hArg: HArg, em: DisplayObject): void;
    waitCustomEvent(hArg: HArg, elc: EventListenerCtn, fnc: () => void): void;
    private clear_event;
    private clear_eventer;
    private event;
    private goTxt;
    private l;
    private p;
    private fncCancelSkip;
    private set_cancel_skip;
    private unregisterClickEvts;
    private wait;
    cr: (len: number) => void;
    isSkipKeyDown(): boolean;
    private hDownKeys;
}