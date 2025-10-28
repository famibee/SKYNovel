/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {type IEvtMng, CmnLib, argChk_Boolean, argChk_Num} from './CmnLib';
import type {HArg} from './Grammar';
import {Reading} from './Reading';

import {Tween, Easing, removeAll, update} from '@tweenjs/tween.js'
import type {Application} from 'pixi.js';


type ITwInf = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	tw		: Tween<any> | undefined;
	onEnd?	: ()=> void;
}

export const TW_INT_TRANS = 'trans\n';	// 改行でスクリプトから絶対指定できない値に
export const TMP_TSY_NM	= 'tsy nm:';


// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CmnTween {
	static	#hTwInf	: {[tw_nm: string]: ITwInf}	= {};

	static	#evtMng	: IEvtMng;
	static	#appPixi: Application;
	static	init(evtMng: IEvtMng, appPixi: Application) {
		this.#hTwInf = {};
		this.#evtMng = evtMng;
		this.#appPixi = appPixi;

		this.#appPixi.ticker.add(this.#fncTicker);	// TWEEN 更新
	}
	static	#fncTicker = ()=> update();
	static	destroy() {
		this.stopAllTw();
		this.#appPixi.ticker.remove(this.#fncTicker);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static	setTwProp(tw: Tween<any>, hArg: HArg): Tween<any> {
		const repeat = argChk_Num(hArg, 'repeat', 1);
		return tw.delay(argChk_Num(hArg, 'delay', 0))
		.easing(this.ease(hArg.ease))
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

		const es = this.#hEase[nm];
		if (! es) throw '異常なease指定です';
		return es;
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static cnvTweenArg(hArg: HArg, lay: any): HArg {
		const hTo: {[val_name: string]: number} = {};
		for (const nm of Object.keys(this.hMemberCnt)) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
			const arg = (<any>hArg)[nm];
			if (! arg) continue;

			// {x:500}			X位置を500に
			// {x:'=500'}		現在のX位置に+500加算した位置
			// {x:'=-500'}		現在のX位置に-500加算した位置
			// {x:'250,500'}	+250から＋500までの間でランダムな値をX位置に
			// {x:'=250,500'}	+250から＋500までの間でランダムな値を現在のX位置に加算
			const v = String(arg);
			const hdeq = v.startsWith('=');
			const vx = hdeq ?v.slice(1) :v;
			if (! vx) continue;

			const [v0, v1] = vx.split(',');
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const a0 = hTo[nm] = parseFloat(v0!);

			if (v1) hTo[nm] += Math.round(
				Math.random() * (parseFloat(v1) -a0 +1)
			);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
			if (hdeq) hTo[nm] += parseFloat(lay[nm]);	// 相対に
		}
		return hTo;
	}


	// トゥイーン全停止
	static	stopAllTw() {this.#hTwInf = {}; removeAll()}


	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static	tween(tw_nm: string, hArg: HArg, hNow: any, hTo: any, onUpdate: ()=> void, onComplete: ()=> void, onEnd: ()=> void, start = true): Tween<any> {
		const time = this.#evtMng.isSkipping ?0 :argChk_Num(hArg, 'time', NaN);
		const tw = new Tween(hNow)
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		.to(hTo, time)
		.onUpdate(onUpdate);
		this.setTwProp(tw, hArg);
		this.#hTwInf[tw_nm] = {tw, onEnd};

		const {path} = hArg;
		let twLast = tw;
		if (path) {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
			if (CmnLib.debugLog) console.group(`🍝 [${hArg[':タグ名']}] path=${path}= start(${hNow.x},${hNow.y},${hNow.alpha})`);
			for (const {groups} of path.matchAll(this.#REG_TSY_PATH)) {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const {x, x2, y, y2, o, o2, json} = groups!;
				let hArg2: HArg = {};
				if (json) try {hArg2 = <HArg>JSON.parse(json)} catch (e) {
					console.error(`🍝 json=${json} `+ String(e));
					continue;
				}
				else {
					if (x ?? x2) hArg2.x = x ?? x2;
					if (y ?? y2) hArg2.y = y ?? y2;
					if (o ?? o2) hArg2.alpha = Number(o ?? o2);
				}

				const hTo2 = this.cnvTweenArg(hArg2, hNow);
				if (CmnLib.debugLog) console.info(`🍝 ${
					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
					json ?? `{x:${x} y:${y} o:${o}}`
				} => hTo:${JSON.stringify(hTo2)}`);

				const twNew = new Tween(hNow)
				.to(hTo2, time);
				this.setTwProp(twNew, hArg);
				twLast.chain(twNew);

				twLast = twNew;
			}
			if (CmnLib.debugLog) console.groupEnd();
		}
		twLast.onComplete(()=> {
			const ti = this.#hTwInf[tw_nm];
			if (! ti?.tw) return;
			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete this.#hTwInf[tw_nm];

			ti.tw = undefined;
			tw.stop();
			ti.onEnd?.();

			onComplete();
			Reading.notifyEndProc(TMP_TSY_NM + tw_nm);	// ラストに
		});

		const {chain} = hArg;
		if (chain) {	// 指定レイヤのアニメ終了に、このトゥイーンを続ける
			const twFrom = this.#hTwInf[chain];
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
	static	readonly	#REG_TSY_PATH	= /\(\s*(?:(?<x>[-=\d.]+)|(['"])(?<x2>.*?)\2)?(?:\s*,\s*(?:(?<y>[-=\d.]+)|(['"])(?<y2>.*?)\5)?(?:\s*,\s*(?:(?<o>[-=\d.]+)|(['"])(?<o2>.*?)\8))?)?|(?<json>\{[^{}]*})/g;

	// トランス終了待ち
	static	wt(_hArg: HArg) {
		const ti = this.#hTwInf[TW_INT_TRANS];
		if (! ti?.tw) return false;

		const fnc = ()=> this.#stopEndTrans();
		Reading.beginProc(TMP_TSY_NM + TW_INT_TRANS, fnc, true, fnc);
		return true;
	}

	// レイヤのトランジションの停止
	static	#stopEndTrans() {this.#hTwInf[TW_INT_TRANS]?.tw?.stop().end()}
		// stop()とend()は別
	static	async	closeTrans() {
		const ti = this.#hTwInf[TW_INT_TRANS];
		if (! ti?.tw) return;

		// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
		const {promise, resolve} = Promise.withResolvers<void>();
		Reading.beginProc(TMP_TSY_NM + TW_INT_TRANS, resolve, false, resolve);
		this.#stopEndTrans();	// beginProc後に
		await promise;
	}


	// トゥイーン終了待ち
	static	wait_tsy(hArg: HArg) {
		const tw_nm = this.#tw_nm(hArg);
		const ti = this.#hTwInf[tw_nm];
		if (! ti?.tw) return false;

		const fnc = ()=> ti.tw?.end();	// stop()とend()は別
		Reading.beginProc(TMP_TSY_NM + tw_nm, fnc, true, fnc);
		return true;
	}
		static	#tw_nm(hArg: HArg) {
			const {layer='', id, name} = hArg;
			const tw_nm = id ?`frm\n${id}` :name ?? layer;
			if (! tw_nm) throw 'トゥイーンが指定されていません';

			return tw_nm;
		}

	// トゥイーン中断
	static	stop_tsy(hArg: HArg) {
		const tw_nm = this.#tw_nm(hArg);
		this.#hTwInf[tw_nm]?.tw?.stop().end();	// stop()とend()は別
		return false;
	}

	// 一時停止
	static	pause_tsy(hArg: HArg) {
		const tw_nm = this.#tw_nm(hArg);
		this.#hTwInf[tw_nm]?.tw?.pause();
		return false;
	}

	// 一時停止再開
	static	resume_tsy(hArg: HArg) {
		const tw_nm = this.#tw_nm(hArg);
		this.#hTwInf[tw_nm]?.tw?.resume();
		return false;
	}

}
