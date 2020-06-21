/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {HArg, IHEvt2Fnc} from './CmnInterface';

// =============== Global
export function int(o: any): number {return parseInt(String(o), 10)}
export function uint(o: any): number {
	const v = parseInt(String(o), 10);
	return v < 0 ? -v : v;
}
if (! ('toInt' in String.prototype)) {
	(String.prototype as any).toInt = function () { return int(this); };
}
if (! ('toUint' in String.prototype)) {
	(String.prototype as any).toUint = function () {
		const v = int(this);
		return v < 0 ? -v : v;
	};
}

export function getDateStr(spl_dd = '/', spl_dt = ' ', spl_tt = ':', spl_ms = ''): string {
	const now = new Date();
	return now.getFullYear()
		+ spl_dd+ String(100 +now.getMonth() +1).slice(1, 3)
		+ spl_dd+ String(100 +now.getDate()).slice(1, 3)
		+ spl_dt+ String(100 +now.getHours()).slice(1, 3)
		+ spl_tt+ String(100 +now.getMinutes()).slice(1, 3)
		+ (spl_ms === '' ?'' :spl_ms+ String(now.getMilliseconds()));
}

export const hMemberCnt	= {
	alpha		:0,
	height		:0,
	rotation	:0,
	scale_x		:0,
	scale_y		:0,
	width		:0,
	x			:0,
	y			:0,
};			// rotationX〜Z、scaleZ、zは設定すると
			// 三次元方向の拡大縮小ルーチンが働き画像がぼやけるので
			// backlayで設定しない方針
export function cnvTweenArg(hArg: HArg, lay: any): {} {
	const hTo: any = {};
	for (const nm in hMemberCnt) {
		if (! (nm in hArg)) continue;

		// {x:500}			X位置を500に
		// {x:'=500'}		現在のX位置に+500加算した位置
		// {x:'=-500'}		現在のX位置に-500加算した位置
		// {x:'250,500'}	+250から＋500までの間でランダムな値をX位置に
		// {x:'=250,500'}	+250から＋500までの間でランダムな値を現在のX位置に加算
		const v = String((hArg as any)[nm]);
		const a = ((v.charAt(0) === '=') ?v.slice(1) :v).split(',');
		const a0 = hTo[nm] = parseFloat(a[0]);
		if (a.length > 1) hTo[nm] += Math.round(Math.random()
			* (parseFloat(a[1]) -a0 +1));
		if (v.charAt(0) === '=') hTo[nm] += parseFloat(lay[nm]);	// 相対に
	}
	return hTo;
}



// =============== EventMng
import {DisplayObject} from 'pixi.js';
import {EventListenerCtn} from './EventListenerCtn';
export interface IEvtMng {
	button(hArg: HArg, em: DisplayObject): void;
	isSkipKeyDown(): boolean;
	stdWait(fnc: ()=> void, canskip?: boolean): void;
	popLocalEvts(): IHEvt2Fnc;
	pushLocalEvts(a: IHEvt2Fnc): void;
	waitCustomEvent(hArg: HArg, elc: EventListenerCtn, fnc: ()=> void): void;

	resvFlameEvent(win: Window): void;
}

export	function argChk_Num(hash: any, name: string, def: number): number {
	const v = hash[name];
	if (! (name in hash)) {
		if (isNaN(def)) throw `[${hash.タグ名}]属性 ${name} は必須です`;

		hash[name] = def;
		return def;
	}

	const n = (String(v).slice(0, 2) === '0x')
		? parseInt(v)
		: parseFloat(v);
	if (isNaN(n)) throw `[${hash.タグ名}]属性 ${name} の値【${v}】が数値ではありません`;

	return hash[name] = n;
}

/*
	それぞれの型を Boolean 型に変換した場合の値は以下のようになります。

	Undefiend 	false
	Null 		false
	Boolean 	変換前のオブジェクトと同じ
	Number 		0 または NaN は false それ以外の値は true
	String 		空文字列は false  それ以外の値は true
	Object 		true
*/
export	function argChk_Boolean(hash: any, name: string, def: boolean): boolean {
	//	t-r-a-c-e(Boolean(null),Boolean(""),Boolean(undefined),Boolean("0"),Boolean("1"),Boolean("true"),Boolean("false"),Boolean("あい"));
	//	[exec] false false false true true true true true
	/*console.log('%o %o %o %o %o %o %o %o',
		Boolean(null), Boolean(""), Boolean(undefined), Boolean("0"), Boolean("1"),
		Boolean("true"), Boolean("false"), Boolean("あい"));
	*/

	//if (! hArg[name]) return hArg[name] = def;
	if (! (name in hash)) return hash[name] = def;

	const v = hash[name];
	if (v === null) return false;

	const v2 = String(v);
	return hash[name] = (v2 === 'false')? false : Boolean(v2);
}


import {basename, extname} from 'path';
export	function getFn(path: string) {return basename(path, extname(path));}
export 	function getExt(path: string) {return extname(path).slice(1);}

import * as platform from 'platform';

export class CmnLib {
	static	stageW		= 0;
	static	stageH		= 0;
	static	ofsPadLeft_Dom2PIXI	= 0;
	static	ofsPadTop_Dom2PIXI	= 0;
	static	cvsWidth	= 0;
	static	cvsHeight	= 0;
	static	cvsScale	= 1;
	static	debugLog	= false;
	static	platform	= {...platform};
	static	isSafari	= platform.name === 'Safari';
	static	isFirefox	= platform.name === 'Firefox';
	static	isMac		= new RegExp('OS X').test(platform.os?.family ?? '');
	static	isMobile	= ! new RegExp('(Windows|OS X)').test(platform.os?.family ?? '');
	static	hDip		: {[name: string]: string}	= {};

	static	isRetina	= false;
	static	isDarkMode	= false;
	static	retinaRate	= 1;

	static	readonly	SN_ID	= 'skynovel';

	static cvsResize(cvs: HTMLCanvasElement): boolean {
		const bk_cw = CmnLib.cvsWidth;
		const bk_ch = CmnLib.cvsHeight;
		let w = globalThis.innerWidth;
		let h = globalThis.innerHeight;

		const angle = screen.orientation?.angle ?? 0;
		const lp = angle % 180 === 0 ?'p' :'l';	// 4Safari
		if (CmnLib.isMobile &&
			((lp === 'p' && w > h) || (lp === 'l' && w < h))
			) [w, h] = [h, w];
		if (argChk_Boolean(CmnLib.hDip, 'expanding', true) ||
			CmnLib.stageW > w ||
			CmnLib.stageH > h
		) {
			if (CmnLib.stageW /CmnLib.stageH <= w /h) {
				CmnLib.cvsHeight = h;
				CmnLib.cvsWidth = CmnLib.stageW /CmnLib.stageH *h;
			}
			else {
				CmnLib.cvsWidth = w;
				CmnLib.cvsHeight = CmnLib.stageH /CmnLib.stageW	*w;
			}
			CmnLib.cvsScale = CmnLib.cvsWidth /CmnLib.stageW;

			const cr = cvs.getBoundingClientRect();
			CmnLib.ofsPadLeft_Dom2PIXI = (CmnLib.isMobile
				? (globalThis.innerWidth  -CmnLib.cvsWidth) /2
				: cr.left
			)
			*(1- CmnLib.cvsScale);
			CmnLib.ofsPadTop_Dom2PIXI = (CmnLib.isMobile
				? (globalThis.innerHeight -CmnLib.cvsHeight) /2
				: cr.top
			)
			*(1- CmnLib.cvsScale);
				// [left] /CmnLib.cvsScale -[left]
					// PaddingLeft を DOMで引いてPIXIで足すイメージ
		}
		else {
			CmnLib.cvsWidth = CmnLib.stageW;
			CmnLib.cvsHeight = CmnLib.stageH;
			CmnLib.cvsScale = 1;
			CmnLib.ofsPadLeft_Dom2PIXI	= 0;
			CmnLib.ofsPadTop_Dom2PIXI	= 0;
		}
		if (cvs.parentElement) {
			const ps = cvs.parentElement.style;
			ps.position = 'relative';
			const s = cvs.style;
			ps.width = s.width = `${CmnLib.cvsWidth}px`;
			ps.height= s.height= `${CmnLib.cvsHeight}px`;
		}

		return bk_cw !== CmnLib.cvsWidth || bk_ch !== CmnLib.cvsHeight;
	}

}
