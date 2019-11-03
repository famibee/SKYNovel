/// <reference types="tween.js" />
import TWEEN = require('@tweenjs/tween.js');
export interface ITwInf {
    tw: TWEEN.Tween | null;
    resume: boolean;
    onComplete?: () => void;
}
export declare class CmnTween {
    private static readonly hEase;
    static ease(nm: string | undefined): (k: number) => number;
}
