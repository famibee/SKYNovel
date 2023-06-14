/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2023 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import { IMain } from './CmnInterface';
import {IEvtMng, CmnLib, argChk_Boolean, argChk_Num} from './CmnLib';
import {HArg} from './Grammar';

import {Tween, Easing, removeAll} from '@tweenjs/tween.js'

export interface ITwInf {
	tw		: Tween<any> | undefined;
	resume	: boolean;
	onEnd?	: ()=> void;
}

export class CmnTween {
	static	#hTwInf	: {[tw_nm: string]: ITwInf}	= {};

	static	#evtMng	: IEvtMng;
	static	#main	: IMain;
	static	init(evtMng: IEvtMng, main: IMain) {
		CmnTween.#hTwInf = {};
		CmnTween.#evtMng = evtMng;
		CmnTween.#main = main;
	}

	static	setTwProp(tw: Tween<any>, hArg: HArg): Tween<any> {
		tw.delay(argChk_Num(hArg, 'delay', 0))
		.easing(CmnTween.ease(hArg.ease))
		.repeat(CmnTween.repeat(hArg))
		.yoyo(argChk_Boolean(hArg, 'yoyo', false));
		return tw;
	}
	static	readonly #hEase: {[name: string]: (k: number)=> number}	= {
		'Back.In'			: k=> Easing.Back.In(k),
		'Back.InOut'		: k=> Easing.Back.InOut(k),
		'Back.Out'			: k=> Easing.Back.Out(k),
		'Bounce.In'			: k=> Easing.Bounce.In(k),
		'Bounce.InOut'		: k=> Easing.Bounce.InOut(k),
		'Bounce.Out'		: k=> Easing.Bounce.Out(k),
		'Circular.In'		: k=> Easing.Circular.In(k),
		'Circular.InOut'	: k=> Easing.Circular.InOut(k),
		'Circular.Out'		: k=> Easing.Circular.Out(k),
		'Cubic.In'			: k=> Easing.Cubic.In(k),
		'Cubic.InOut'		: k=> Easing.Cubic.InOut(k),
		'Cubic.Out'			: k=> Easing.Cubic.Out(k),
		'Elastic.In'		: k=> Easing.Elastic.In(k),
		'Elastic.InOut'		: k=> Easing.Elastic.InOut(k),
		'Elastic.Out'		: k=> Easing.Elastic.Out(k),
		'Exponential.In'	: k=> Easing.Exponential.In(k),
		'Exponential.InOut'	: k=> Easing.Exponential.InOut(k),
		'Exponential.Out'	: k=> Easing.Exponential.Out(k),
		'Linear.None'		: k=> Easing.Linear.None(k),
		'Quadratic.In'		: k=> Easing.Quadratic.In(k),
		'Quadratic.InOut'	: k=> Easing.Quadratic.InOut(k),
		'Quadratic.Out'		: k=> Easing.Quadratic.Out(k),
		'Quartic.In'		: k=> Easing.Quartic.In(k),
		'Quartic.InOut'		: k=> Easing.Quartic.InOut(k),
		'Quartic.Out'		: k=> Easing.Quartic.Out(k),
		'Quintic.In'		: k=> Easing.Quintic.In(k),
		'Quintic.InOut'		: k=> Easing.Quintic.InOut(k),
		'Quintic.Out'		: k=> Easing.Quintic.Out(k),
		'Sinusoidal.In'		: k=> Easing.Sinusoidal.In(k),
		'Sinusoidal.InOut'	: k=> Easing.Sinusoidal.InOut(k),
		'Sinusoidal.Out'	: k=> Easing.Sinusoidal.Out(k),
	};
	static	ease(nm: string | undefined): (k: number)=> number {
		if (! nm) return k=> Easing.Linear.None(k);
		if (! (nm in CmnTween.#hEase)) throw '異常なease指定です';

		return CmnTween.#hEase[nm];
	}

	static	repeat(hArg: HArg): number {
		const repeat = argChk_Num(hArg, 'repeat', 1);
		return repeat > 0 ?repeat -1 :Infinity;	// 一度リピート→計二回なので
	}

	static readonly hMemberCnt	= {
		alpha		: 0,
		height		: 0,
		rotation	: 0,	// rotationX〜Z、scaleZ、zは設定すると
		scale_x		: 0,	// 三次元方向の拡大縮小ルーチンが働き画像がぼやけるので
		scale_y		: 0,	// backlayで設定しない方針
		pivot_x		: 0,
		pivot_y		: 0,
		width		: 0,
		x			: 0,
		y			: 0,
	};
	static cnvTweenArg(hArg: HArg, lay: any): {} {
		const hTo: any = {};
		for (const nm of Object.keys(CmnTween.hMemberCnt)) {
			if (! (nm in hArg)) continue;
	
			// {x:500}			X位置を500に
			// {x:'=500'}		現在のX位置に+500加算した位置
			// {x:'=-500'}		現在のX位置に-500加算した位置
			// {x:'250,500'}	+250から＋500までの間でランダムな値をX位置に
			// {x:'=250,500'}	+250から＋500までの間でランダムな値を現在のX位置に加算
			const v = String((hArg as any)[nm]);
			const a = ((v.at(0) === '=') ?v.slice(1) :v).split(',');
			const a0 = hTo[nm] = parseFloat(a[0]);
			if (a.length > 1) hTo[nm] += Math.round(Math.random()
				* (parseFloat(a[1]) -a0 +1));
			if (v.at(0) === '=') hTo[nm] += parseFloat(lay[nm]);	// 相対に
		}
		return hTo;
	}


	// トゥイーン全停止
	static	stopAllTw() {CmnTween.#hTwInf = {}; removeAll()}

	static	tsy(tw_nm: string, hArg: HArg, hNow: any, onUpdate: ()=> void, onComplete: ()=> void, onEnd: ()=> void): void {
		const hTo = CmnTween.cnvTweenArg(hArg, hNow);
		const dur = this.#evtMng.isSkipping() ?0 :argChk_Num(hArg, 'time', NaN);
		const tw = new Tween(hNow)
		.to(hTo, dur)
		.onUpdate(onUpdate);
		CmnTween.setTwProp(tw, hArg);

		const {path, chain} = hArg;
		let twLast = tw;
		if (path) {
			if (CmnLib.debugLog) console.group(`🍝 [${hArg[':タグ名']}] path=${path}= start(${hNow.x},${hNow.y},${hNow.alpha})`);
			for (const {groups} of path.matchAll(CmnTween.#REG_TSY_PATH)) {
				const {x, x2, y, y2, o, o2, json} = groups!;
				let hArg2: any = {};
				if (json) try {hArg2 = JSON.parse(json)} catch (e) {
					console.error(`🍝 json=${json} `+ e);
					continue;
				}
				else {
					if (x ?? x2) hArg2.x = x ?? x2;
					if (y ?? y2) hArg2.y = y ?? y2;
					if (o ?? o2) hArg2.alpha = o ?? o2;
				}

				const hTo2 = CmnTween.cnvTweenArg(hArg2, hNow);
				if (CmnLib.debugLog) console.info(`🍝 ${
					json ?? `{x:${x} y:${y} o:${o}}`
				} => hTo:${JSON.stringify(hTo2)}`);

				const twNew = new Tween(hNow)
				.to(hTo2, dur);
				CmnTween.setTwProp(twNew, hArg);
				twLast.chain(twNew);

				twLast = twNew;
			}
			if (CmnLib.debugLog) console.groupEnd();
		}
		twLast.onComplete(()=> {
			const ti = CmnTween.#hTwInf[tw_nm];
			if (! ti) return;
			delete CmnTween.#hTwInf[tw_nm];

			ti.tw?.stop();
			if (ti.resume) CmnTween.#main.resume();
			ti.onEnd?.();

			onComplete();
		});

		if (chain) {	// 指定レイヤのアニメ終了に、このトゥイーンを続ける
			const twFrom = CmnTween.#hTwInf[chain ?? ''];
			if (! twFrom?.tw) throw `${chain}は存在しない・または終了したトゥイーンです`;
			delete twFrom.onEnd;
			twFrom.tw.chain(tw);
		}
		else tw.start();

		CmnTween.#hTwInf[tw_nm] = {tw, resume: false, onEnd};
	}
	// 11 match 301 step (0.1ms) PCRE2 https://regex101.com/r/reinpq/1
		// List ${x}${x2}/${y}${y2}/${o}${o2}=${json}\n
/*
\(\s*
(?:	(?<x>[-=\d\.]+)	|	(['"])	(?<x2>.*?)	\2	)?
(?:
	\s*,\s*
	(?:	(?<y>[-=\d\.]+)	|	(['"])	(?<y2>.*?)	\5	)?
	(?:
		\s*,\s*
		(?:	(?<o>[-=\d\.]+)	|	(['"])	(?<o2>.*?)	\8	)

	)?
)?
|
(?<json>\{[^{}]*})
*/
	static	readonly	#REG_TSY_PATH	= /\(\s*(?:(?<x>[-=\d\.]+)|(['"])(?<x2>.*?)\2)?(?:\s*,\s*(?:(?<y>[-=\d\.]+)|(['"])(?<y2>.*?)\5)?(?:\s*,\s*(?:(?<o>[-=\d\.]+)|(['"])(?<o2>.*?)\8))?)?|(?<json>\{[^{}]*})/g;

	// トゥイーン終了待ち
	static	wait_tsy(hArg: HArg) {
		const {layer='', id, name} = hArg;
		const tw_nm = id ?`frm\n${id}` :(name ?? layer);
		if (! tw_nm) throw 'トゥイーンが指定されていません';
		const ti = CmnTween.#hTwInf[tw_nm];
		if (! ti?.tw) return false;

		return ti.resume = CmnTween.#evtMng.waitEvent(hArg, ()=> ti.tw?.end());	// stop()とend()は別
	}

	// トゥイーン中断
	static	stop_tsy(hArg: HArg) {
		const {layer='', id, name} = hArg;
		const tw_nm = id ?`frm\n${id}` :(name ?? layer);
		if (! tw_nm) throw 'トゥイーンが指定されていません';

		CmnTween.#hTwInf[tw_nm]?.tw?.end();	// stop()とend()は別

		return false;
	}

	// 一時停止
	static	pause_tsy(hArg: HArg) {
		const {layer='', id, name} = hArg;
		const tw_nm = id ?`frm\n${id}` :(name ?? layer);
		if (! tw_nm) throw 'トゥイーンが指定されていません';

		CmnTween.#hTwInf[tw_nm]?.tw?.pause();

		return false;
	}

	// 一時停止再開
	static	resume_tsy(hArg: HArg) {
		const {layer='', id, name} = hArg;
		const tw_nm = id ?`frm\n${id}` :(name ?? layer);
		if (! tw_nm) throw 'トゥイーンが指定されていません';

		CmnTween.#hTwInf[tw_nm]?.tw?.resume();

		return false;
	}

}
