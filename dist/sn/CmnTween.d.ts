import { IMain } from './CmnInterface';
import { IEvtMng } from './CmnLib';
import { HArg } from './Grammar';
import { Tween } from '@tweenjs/tween.js';
export interface ITwInf {
    tw: Tween<any> | undefined;
    resume: boolean;
    onEnd?: () => void;
}
export declare class CmnTween {
    #private;
    static init(evtMng: IEvtMng, main: IMain): void;
    static setTwProp(tw: Tween<any>, hArg: HArg): Tween<any>;
    static ease(nm: string | undefined): (k: number) => number;
    static repeat(hArg: HArg): number;
    static readonly hMemberCnt: {
        alpha: number;
        height: number;
        rotation: number;
        scale_x: number;
        scale_y: number;
        pivot_x: number;
        pivot_y: number;
        width: number;
        x: number;
        y: number;
    };
    static cnvTweenArg(hArg: HArg, lay: any): {};
    static stopAllTw(): void;
    static tsy(tw_nm: string, hArg: HArg, hNow: any, onUpdate: () => void, onComplete: () => void, onEnd: () => void): void;
    static wait_tsy(hArg: HArg): boolean;
    static stop_tsy(hArg: HArg): boolean;
    static pause_tsy(hArg: HArg): boolean;
    static resume_tsy(hArg: HArg): boolean;
}
//# sourceMappingURL=CmnTween.d.ts.map