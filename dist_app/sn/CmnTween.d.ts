import { IEvtMng } from './CmnLib';
import { HArg } from './Grammar';
import { Tween } from '@tweenjs/tween.js';
import { Application } from 'pixi.js';
export declare class CmnTween {
    #private;
    static init(evtMng: IEvtMng, appPixi: Application): void;
    static destroy(): void;
    static setTwProp(tw: Tween<any>, hArg: HArg): Tween<any>;
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
    static cnvTweenArg(hArg: HArg, lay: any): {};
    static stopAllTw(): void;
    static tween(tw_nm: string, hArg: HArg, hNow: any, hTo: any, onUpdate: () => void, onComplete: () => void, onEnd: () => void, start?: boolean): Tween<any>;
    static wt(hArg: HArg): boolean;
    static readonly TW_INT_TRANS = "trans\n";
    static finish_trans(): boolean;
    static wait_tsy(hArg: HArg): boolean;
    static stop_tsy(hArg: HArg): boolean;
    static pause_tsy(hArg: HArg): boolean;
    static resume_tsy(hArg: HArg): boolean;
}
//# sourceMappingURL=CmnTween.d.ts.map