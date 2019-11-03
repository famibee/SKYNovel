/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import TWEEN = require('@tweenjs/tween.js');

// =============== Tween
export interface ITwInf {
	tw			: TWEEN.Tween | null;
	resume		: boolean;
	onComplete?	: ()=> void;
}

export class CmnTween {
	private	static	readonly hEase: {[name: string]: (k: number)=> number}	= {
		'Back.In'			: k=> TWEEN.Easing.Back.In(k),
		'Back.InOut'		: k=> TWEEN.Easing.Back.InOut(k),
		'Back.Out'			: k=> TWEEN.Easing.Back.Out(k),
		'Bounce.In'			: k=> TWEEN.Easing.Bounce.In(k),
		'Bounce.InOut'		: k=> TWEEN.Easing.Bounce.InOut(k),
		'Bounce.Out'		: k=> TWEEN.Easing.Bounce.Out(k),
		'Circular.In'		: k=> TWEEN.Easing.Circular.In(k),
		'Circular.InOut'	: k=> TWEEN.Easing.Circular.InOut(k),
		'Circular.Out'		: k=> TWEEN.Easing.Circular.Out(k),
		'Cubic.In'			: k=> TWEEN.Easing.Cubic.In(k),
		'Cubic.InOut'		: k=> TWEEN.Easing.Cubic.InOut(k),
		'Cubic.Out'			: k=> TWEEN.Easing.Cubic.Out(k),
		'Elastic.In'		: k=> TWEEN.Easing.Elastic.In(k),
		'Elastic.InOut'		: k=> TWEEN.Easing.Elastic.InOut(k),
		'Elastic.Out'		: k=> TWEEN.Easing.Elastic.Out(k),
		'Exponential.In'	: k=> TWEEN.Easing.Exponential.In(k),
		'Exponential.InOut'	: k=> TWEEN.Easing.Exponential.InOut(k),
		'Exponential.Out'	: k=> TWEEN.Easing.Exponential.Out(k),
		'Linear.None'		: k=> TWEEN.Easing.Linear.None(k),
		'Quadratic.In'		: k=> TWEEN.Easing.Quadratic.In(k),
		'Quadratic.InOut'	: k=> TWEEN.Easing.Quadratic.InOut(k),
		'Quadratic.Out'		: k=> TWEEN.Easing.Quadratic.Out(k),
		'Quartic.In'		: k=> TWEEN.Easing.Quartic.In(k),
		'Quartic.InOut'		: k=> TWEEN.Easing.Quartic.InOut(k),
		'Quartic.Out'		: k=> TWEEN.Easing.Quartic.Out(k),
		'Quintic.In'		: k=> TWEEN.Easing.Quintic.In(k),
		'Quintic.InOut'		: k=> TWEEN.Easing.Quintic.InOut(k),
		'Quintic.Out'		: k=> TWEEN.Easing.Quintic.Out(k),
		'Sinusoidal.In'		: k=> TWEEN.Easing.Sinusoidal.In(k),
		'Sinusoidal.InOut'	: k=> TWEEN.Easing.Sinusoidal.InOut(k),
		'Sinusoidal.Out'	: k=> TWEEN.Easing.Sinusoidal.Out(k),
	};
	static	ease(nm: string | undefined): (k: number)=> number {
		if (! nm) return k=> TWEEN.Easing.Linear.None(k);
		if (! (nm in CmnTween.hEase)) throw '異常なease指定です';

		return CmnTween.hEase[nm];
	}

}