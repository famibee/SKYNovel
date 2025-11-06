import { IEvtMng } from './CmnLib';
import { TArg } from './Grammar';
import { Tween } from '@tweenjs/tween.js';
import { Application } from 'pixi.js';
export declare const TW_INT_TRANS = "trans\n";
export declare const TMP_TSY_NM = "tsy nm:";
export declare class CmnTween {
    #private;
    static init(evtMng: IEvtMng, appPixi: Application): void;
    static destroy(): void;
    static setTwProp(tw: Tween<any>, hArg: TArg): Tween<any>;
    static ease(nm: string | undefined): (k: number) => number;
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
    static cnvTweenArg(hArg: TArg, lay: any): TArg;
    static stopAllTw(): void;
    static tween(tw_nm: string, hArg: TArg, hNow: any, hTo: any, onUpdate: () => void, onComplete: () => void, onEnd: () => void, start?: boolean): Tween<any>;
    static wt(_hArg: TArg): boolean;
    static closeTrans(): Promise<void>;
    static wait_tsy(hArg: TArg): boolean;
    static stop_tsy(hArg: TArg): boolean;
    static pause_tsy(hArg: TArg): boolean;
    static resume_tsy(hArg: TArg): boolean;
}
//# sourceMappingURL=CmnTween.d.ts.map