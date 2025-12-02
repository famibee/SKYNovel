import { IEvtMng } from './CmnLib';
import { TArg } from './Grammar';
import { Layer } from './Layer';
import { Tween, Group } from '@tweenjs/tween.js';
export declare const TW_NM_TRANS = "trans\n";
export declare class CmnTween {
    #private;
    static init(evtMng: IEvtMng): void;
    static addGrp(g: Group): void;
    static destroy(): void;
    static stopAllTw(): void;
    static setTwProp(tw: Tween<any>, hArg: TArg): Tween<any>;
    static ease(nm: string | undefined): (k: number) => number;
    static readonly aLayerPrpNm: (keyof Layer)[];
    static cnvTweenArg(hArg: TArg, lay: any): TArg;
    static tween(tw_nm: string, hArg: TArg, hNow: any, hTo: any, onUpdate: (d: any) => void, onComplete: () => void, onEnd: () => void, start?: boolean): Tween<any>;
    static wt(_hArg: TArg): boolean;
    static stopEndTrans(): void;
    static wait_tsy(hArg: TArg): boolean;
    static stop_tsy(hArg: TArg): boolean;
    static pause_tsy(hArg: TArg): boolean;
    static resume_tsy(hArg: TArg): boolean;
}
//# sourceMappingURL=CmnTween.d.ts.map