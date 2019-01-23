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
	static	hEase: {[name: string]: (k: number)=> number}	= {
		'Back.In'			: TWEEN.Easing.Back.In,
		'Back.InOut'		: TWEEN.Easing.Back.InOut,
		'Back.Out'			: TWEEN.Easing.Back.Out,
		'Bounce.In'			: TWEEN.Easing.Bounce.In,
		'Bounce.InOut'		: TWEEN.Easing.Bounce.InOut,
		'Bounce.Out'		: TWEEN.Easing.Bounce.Out,
		'Circular.In'		: TWEEN.Easing.Circular.In,
		'Circular.InOut'	: TWEEN.Easing.Circular.InOut,
		'Circular.Out'		: TWEEN.Easing.Circular.Out,
		'Cubic.In'			: TWEEN.Easing.Cubic.In,
		'Cubic.InOut'		: TWEEN.Easing.Cubic.InOut,
		'Cubic.Out'			: TWEEN.Easing.Cubic.Out,
		'Elastic.In'		: TWEEN.Easing.Elastic.In,
		'Elastic.InOut'		: TWEEN.Easing.Elastic.InOut,
		'Elastic.Out'		: TWEEN.Easing.Elastic.Out,
		'Exponential.In'	: TWEEN.Easing.Exponential.In,
		'Exponential.InOut'	: TWEEN.Easing.Exponential.InOut,
		'Exponential.Out'	: TWEEN.Easing.Exponential.Out,
		'Linear.None'		: TWEEN.Easing.Linear.None,
		'Quadratic.In'		: TWEEN.Easing.Quadratic.In,
		'Quadratic.InOut'	: TWEEN.Easing.Quadratic.InOut,
		'Quadratic.Out'		: TWEEN.Easing.Quadratic.Out,
		'Quartic.In'		: TWEEN.Easing.Quartic.In,
		'Quartic.InOut'		: TWEEN.Easing.Quartic.InOut,
		'Quartic.Out'		: TWEEN.Easing.Quartic.Out,
		'Quintic.In'		: TWEEN.Easing.Quintic.In,
		'Quintic.InOut'		: TWEEN.Easing.Quintic.InOut,
		'Quintic.Out'		: TWEEN.Easing.Quintic.Out,
		'Sinusoidal.In'		: TWEEN.Easing.Sinusoidal.In,
		'Sinusoidal.InOut'	: TWEEN.Easing.Sinusoidal.InOut,
		'Sinusoidal.Out'	: TWEEN.Easing.Sinusoidal.Out,
	};

}