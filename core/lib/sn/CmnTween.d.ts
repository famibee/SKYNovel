/// <reference types="tween.js" />
import TWEEN = require('@tweenjs/tween.js');
export interface ITwInf {
    tw: TWEEN.Tween | null;
    resume: boolean;
    onComplete?: () => void;
}
export declare class CmnTween {
    static readonly hEase: {
        [name: string]: (k: number) => number;
    };
}
