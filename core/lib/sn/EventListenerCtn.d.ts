import { BaseTexture, utils } from "pixi.js";
declare type IEmitter = BaseTexture | utils.EventEmitter | Window | Document | Element;
export declare class EventListenerCtn {
    private vctEvt;
    add(ed: IEmitter, type: string, fnc: (e: any) => void, useCapture?: boolean): void;
    clear(): void;
}
export {};
