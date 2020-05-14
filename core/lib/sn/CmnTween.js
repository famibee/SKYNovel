"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmnTween = void 0;
const Tween = require('@tweenjs/tween.js').default;
let CmnTween = (() => {
    class CmnTween {
        static ease(nm) {
            if (!nm)
                return k => Tween.Easing.Linear.None(k);
            if (!(nm in CmnTween.hEase))
                throw '異常なease指定です';
            return CmnTween.hEase[nm];
        }
    }
    CmnTween.hEase = {
        'Back.In': k => Tween.Easing.Back.In(k),
        'Back.InOut': k => Tween.Easing.Back.InOut(k),
        'Back.Out': k => Tween.Easing.Back.Out(k),
        'Bounce.In': k => Tween.Easing.Bounce.In(k),
        'Bounce.InOut': k => Tween.Easing.Bounce.InOut(k),
        'Bounce.Out': k => Tween.Easing.Bounce.Out(k),
        'Circular.In': k => Tween.Easing.Circular.In(k),
        'Circular.InOut': k => Tween.Easing.Circular.InOut(k),
        'Circular.Out': k => Tween.Easing.Circular.Out(k),
        'Cubic.In': k => Tween.Easing.Cubic.In(k),
        'Cubic.InOut': k => Tween.Easing.Cubic.InOut(k),
        'Cubic.Out': k => Tween.Easing.Cubic.Out(k),
        'Elastic.In': k => Tween.Easing.Elastic.In(k),
        'Elastic.InOut': k => Tween.Easing.Elastic.InOut(k),
        'Elastic.Out': k => Tween.Easing.Elastic.Out(k),
        'Exponential.In': k => Tween.Easing.Exponential.In(k),
        'Exponential.InOut': k => Tween.Easing.Exponential.InOut(k),
        'Exponential.Out': k => Tween.Easing.Exponential.Out(k),
        'Linear.None': k => Tween.Easing.Linear.None(k),
        'Quadratic.In': k => Tween.Easing.Quadratic.In(k),
        'Quadratic.InOut': k => Tween.Easing.Quadratic.InOut(k),
        'Quadratic.Out': k => Tween.Easing.Quadratic.Out(k),
        'Quartic.In': k => Tween.Easing.Quartic.In(k),
        'Quartic.InOut': k => Tween.Easing.Quartic.InOut(k),
        'Quartic.Out': k => Tween.Easing.Quartic.Out(k),
        'Quintic.In': k => Tween.Easing.Quintic.In(k),
        'Quintic.InOut': k => Tween.Easing.Quintic.InOut(k),
        'Quintic.Out': k => Tween.Easing.Quintic.Out(k),
        'Sinusoidal.In': k => Tween.Easing.Sinusoidal.In(k),
        'Sinusoidal.InOut': k => Tween.Easing.Sinusoidal.InOut(k),
        'Sinusoidal.Out': k => Tween.Easing.Sinusoidal.Out(k),
    };
    return CmnTween;
})();
exports.CmnTween = CmnTween;
//# sourceMappingURL=CmnTween.js.map