/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import * as TW from '@tweenjs/tween.js';
const TWEEN: any = TW;

// =============== Tween
export interface ITwInf {
	tw			: TWEEN.Tween | null;
	resume		: boolean;
	onComplete?	: ()=> void;
}

export class CmnTween {
	private	static	readonly hEase: {[name: string]: (k: number)=> number}	= {
		'Back.In'			: k=> TWEEN.default.Easing.Back.In(k),
		'Back.InOut'		: k=> TWEEN.default.Easing.Back.InOut(k),
		'Back.Out'			: k=> TWEEN.default.Easing.Back.Out(k),
		'Bounce.In'			: k=> TWEEN.default.Easing.Bounce.In(k),
		'Bounce.InOut'		: k=> TWEEN.default.Easing.Bounce.InOut(k),
		'Bounce.Out'		: k=> TWEEN.default.Easing.Bounce.Out(k),
		'Circular.In'		: k=> TWEEN.default.Easing.Circular.In(k),
		'Circular.InOut'	: k=> TWEEN.default.Easing.Circular.InOut(k),
		'Circular.Out'		: k=> TWEEN.default.Easing.Circular.Out(k),
		'Cubic.In'			: k=> TWEEN.default.Easing.Cubic.In(k),
		'Cubic.InOut'		: k=> TWEEN.default.Easing.Cubic.InOut(k),
		'Cubic.Out'			: k=> TWEEN.default.Easing.Cubic.Out(k),
		'Elastic.In'		: k=> TWEEN.default.Easing.Elastic.In(k),
		'Elastic.InOut'		: k=> TWEEN.default.Easing.Elastic.InOut(k),
		'Elastic.Out'		: k=> TWEEN.default.Easing.Elastic.Out(k),
		'Exponential.In'	: k=> TWEEN.default.Easing.Exponential.In(k),
		'Exponential.InOut'	: k=> TWEEN.default.Easing.Exponential.InOut(k),
		'Exponential.Out'	: k=> TWEEN.default.Easing.Exponential.Out(k),
		'Linear.None'		: k=> TWEEN.default.Easing.Linear.None(k),
		'Quadratic.In'		: k=> TWEEN.default.Easing.Quadratic.In(k),
		'Quadratic.InOut'	: k=> TWEEN.default.Easing.Quadratic.InOut(k),
		'Quadratic.Out'		: k=> TWEEN.default.Easing.Quadratic.Out(k),
		'Quartic.In'		: k=> TWEEN.default.Easing.Quartic.In(k),
		'Quartic.InOut'		: k=> TWEEN.default.Easing.Quartic.InOut(k),
		'Quartic.Out'		: k=> TWEEN.default.Easing.Quartic.Out(k),
		'Quintic.In'		: k=> TWEEN.default.Easing.Quintic.In(k),
		'Quintic.InOut'		: k=> TWEEN.default.Easing.Quintic.InOut(k),
		'Quintic.Out'		: k=> TWEEN.default.Easing.Quintic.Out(k),
		'Sinusoidal.In'		: k=> TWEEN.default.Easing.Sinusoidal.In(k),
		'Sinusoidal.InOut'	: k=> TWEEN.default.Easing.Sinusoidal.InOut(k),
		'Sinusoidal.Out'	: k=> TWEEN.default.Easing.Sinusoidal.Out(k),
	};
	static	ease(nm: string | undefined): (k: number)=> number {
		if (! nm) return k=> TWEEN.default.Easing.Linear.None(k);
		if (! (nm in CmnTween.hEase)) throw '異常なease指定です';

		return CmnTween.hEase[nm];
	}

}