import { Tween } from '@tweenjs/tween.js';
export interface ITwInf {
    tw: Tween<any> | null;
    resume: boolean;
    onEnd?: () => void;
}
export declare class CmnTween {
    private static readonly hEase;
    static ease(nm: string | undefined): (k: number) => number;
}
//# sourceMappingURL=CmnTween.d.ts.map