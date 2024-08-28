import { BaseTexture, utils } from 'pixi.js';
type IEmitter = BaseTexture | utils.EventEmitter | {
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
};
export declare class EventListenerCtn {
    #private;
    add(ed: IEmitter, type: string, fnc: (e: any) => void, ctx?: any): void;
    clear(): void;
    get isEmpty(): boolean;
}
export {};
//# sourceMappingURL=EventListenerCtn.d.ts.map