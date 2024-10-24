/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {IEvtMng, CmnLib, argChk_Boolean, argChk_Num} from './CmnLib';
import {HArg} from './Grammar';

import {Tween, Easing, removeAll, update} from '@tweenjs/tween.js'
import {Application} from 'pixi.js';

interface ITwInf {
	tw		: Tween<any> | undefined;
	onEnd?	: ()=> void;
}

export class CmnTween {
	static	#hTwInf	: {[tw_nm: string]: ITwInf}	= {};

	static	#evtMng	: IEvtMng;
	static	#appPixi: Application;
	static	init(evtMng: IEvtMng, appPixi: Application) {
		CmnTween.#hTwInf = {};
		CmnTween.#evtMng = evtMng;
		CmnTween.#appPixi = appPixi;

		CmnTween.#appPixi.ticker.add(CmnTween.#fncTicker);	// TWEEN 更新
	}
	static	#fncTicker = ()=> update();
	static	destroy() {
		CmnTween.stopAllTw();
		CmnTween.#appPixi.ticker.remove(CmnTween.#fncTicker);
	}

	static	setTwProp(tw: Tween<any>, hArg: HArg): Tween<any> {
		const repeat = argChk_Num(hArg, 'repeat', 1);
		return tw.delay(argChk_Num(hArg, 'delay', 0))
		.easing(CmnTween.ease(hArg.ease))
		.repeat(repeat > 0 ?repeat -1 :Infinity)	// 一度リピート→計二回なので
		.yoyo(argChk_Boolean(hArg, 'yoyo', false));
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
			const a = (v.startsWith('=') ?v.slice(1) :v).split(',');
			const a0 = hTo[nm] = parseFloat(a[0]);
			if (a.length > 1) hTo[nm] += Math.round(Math.random()
				* (parseFloat(a[1]) -a0 +1));
			if (v.startsWith('=')) hTo[nm] += parseFloat(lay[nm]);	// 相対に
		}
		return hTo;
	}


	// トゥイーン全停止
	static	stopAllTw() {CmnTween.#hTwInf = {}; removeAll()}


	static	tween(tw_nm: string, hArg: HArg, hNow: any, hTo: any, onUpdate: ()=> void, onComplete: ()=> void, onEnd: ()=> void, start = true): Tween<any> {
		const time = this.#evtMng.isSkipping ?0 :argChk_Num(hArg, 'time', NaN);
		const tw = new Tween(hNow)
		.to(hTo, time)
		.onUpdate(onUpdate);
		CmnTween.setTwProp(tw, hArg);
		CmnTween.#hTwInf[tw_nm] = {tw, onEnd};

		const {path} = hArg;
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
				.to(hTo2, time);
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

			ti.tw = undefined;
			tw.stop();
			CmnTween.#evtMng.breakEvent('tsy nm:'+ tw_nm);	// waitEvent 使用者の通常 break 時義務
			ti.onEnd?.();

			onComplete();
		});

		const {chain} = hArg;
		if (chain) {	// 指定レイヤのアニメ終了に、このトゥイーンを続ける
			const twFrom = CmnTween.#hTwInf[chain];
			if (! twFrom?.tw) throw `${chain}は存在しない・または終了したトゥイーンです`;
			delete twFrom.onEnd;
			twFrom.tw.chain(tw);
		}
		else if (start) tw.start();

		return tw;
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

	// トランス終了待ち
	static	wt(hArg: HArg) {
		const ti = CmnTween.#hTwInf[CmnTween.TW_INT_TRANS];
		if (! ti?.tw) return false;

		return CmnTween.#evtMng.waitEvent('tsy nm:'+ CmnTween.TW_INT_TRANS, hArg, ()=> CmnTween.finish_trans());
	}
	static	readonly	TW_INT_TRANS = 'trans\n';	// 改行でスクリプトから絶対指定できない値に

	// レイヤのトランジションの停止
	static	finish_trans(): boolean {CmnTween.#hTwInf[CmnTween.TW_INT_TRANS]?.tw?.stop().end(); return false}	// stop()とend()は別


	// トゥイーン終了待ち
	static	wait_tsy(hArg: HArg) {
		const {layer='', id, name} = hArg;
		const tw_nm = id ?`frm\n${id}` :(name ?? layer);
		if (! tw_nm) throw 'トゥイーンが指定されていません';
		const ti = CmnTween.#hTwInf[tw_nm];
		if (! ti?.tw) {
			if (argChk_Boolean(hArg, 'chk_exist_tw', false)) throw id
			?`フレームトゥイーン ${id} が見つかりません。`
			:`トゥイーン ${tw_nm} が見つかりません。(layer:${layer} name:${name})`;

			return false;
		}

		return CmnTween.#evtMng.waitEvent('tsy nm:'+ tw_nm, hArg, ()=> ti.tw?.end());	// stop()とend()は別
	}

	// トゥイーン中断
	static	stop_tsy(hArg: HArg) {
		const {layer='', id, name} = hArg;
		const tw_nm = id ?`frm\n${id}` :(name ?? layer);
		if (! tw_nm) throw 'トゥイーンが指定されていません';

		CmnTween.#hTwInf[tw_nm]?.tw?.stop().end();	// stop()とend()は別

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
