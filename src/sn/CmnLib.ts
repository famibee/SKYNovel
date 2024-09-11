/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {HArg} from './Grammar';
import {IHEvt2Fnc} from './CmnInterface';

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
	const now = new Date;
	return now.getFullYear()
		+ spl_dd+ String(100 +now.getMonth() +1).slice(1, 3)
		+ spl_dd+ String(100 +now.getDate()).slice(1, 3)
		+ spl_dt+ String(100 +now.getHours()).slice(1, 3)
		+ spl_tt+ String(100 +now.getMinutes()).slice(1, 3)
		+ (spl_ms === '' ?'' :spl_ms+ String(now.getMilliseconds()));
}


const	css_key4del	= '/* SKYNovel */';
export function initStyle() {
	const he = document.getElementsByTagName('head')[0];
	const len = he.children.length;
	for (let i=len -1; i>=0; --i) {
		const v = he.children[i];
		if (! (v instanceof HTMLStyleElement)) continue;
		if (v.innerText.slice(0, 14) !== css_key4del) continue;
		he.removeChild(v);
	}
}
export function addStyle(style: string) {
	const gs = document.createElement('style');
	gs.innerHTML = css_key4del + style;
	document.getElementsByTagName('head')[0].appendChild(gs);
}



// =============== EventMng
import {Container} from 'pixi.js';
export interface IEvtMng {
	button(hArg: HArg, ctnBtn: Container, normal: ()=> void, hover: ()=> boolean, clicked: ()=> void): void;
	unButton(em: Container): void;
	get	isSkipping(): boolean;
	popLocalEvts(): IHEvt2Fnc;
	pushLocalEvts(a: IHEvt2Fnc): void;
	waitEvent(evnm: string, hArg: HArg, onFire: ()=> void): boolean;
	breakEvent(evnm: string): void;
	hideHint(): void;
	cvsResize(): void;

	resvFlameEvent(win: Window): void;
}

export	function argChk_Num(hash: any, name: string, def: number): number {
	const v = hash[name];
	if (! (name in hash)) {
		if (isNaN(def)) throw `[${hash[':タグ名']}]属性 ${name} は必須です`;

		hash[name] = def;
		return def;
	}

	const n = (String(v).slice(0, 2) === '0x')
		? parseInt(v)
		: parseFloat(v);
	if (isNaN(n)) throw `[${hash[':タグ名']}]属性 ${name} の値【${v}】が数値ではありません`;

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


export function parseColor(v: string): number {
	if (v.at(0) === '#') return parseInt(v.slice(1), 16);
	const n = Number(v);
	if (! isNaN(n)) return n;	// 0, 0xffffff

	if (v === 'black') return 0;
	CmnLib.cc4ColorName.fillStyle = v;
	const cc = CmnLib.cc4ColorName.fillStyle;
	if (cc === '#000000') throw `色名前 ${v} が異常です`;

	return parseInt(cc.slice(1), 16);
}
export	function argChk_Color(hash: any, name: string, def: number): number {
	const v = hash[name];
	if (! v) return hash[name] = def;

	return hash[name] = parseColor(String(v));
}


const REG_ERRMES_JSON = /JSON at position (\d+)$/;
	// Unexpected number in JSON at position 
export	function mesErrJSON(hArg: HArg, nm = '', mes = ''): string {
	const col = (mes.match(REG_ERRMES_JSON) ?? ['',''])[1];
	return `[${hArg[':タグ名']}] ${nm} 属性の解析エラー : ${mes}
${(hArg as any)[nm]}${col ?`
${'^'.padStart(Number(col))}` :``}`;
}


const REG_FN	= /^[^\/\.]+$|[^\/]+(?=\.)/;
	// https://regex101.com/r/8sltIm/1
export	function getFn(p: string) {return (p.match(REG_FN) ?? [''])[0]}
const REG_EXT	= /\.([^\.]+)$/;
	// https://regex101.com/r/IULqII/3
export 	function getExt(p: string) {return (p.match(REG_EXT) ?? ['',''])[1]}

import {name, os} from 'platform';
export class CmnLib {
	static	stageW		= 0;
	static	stageH		= 0;
	static	debugLog	= false;
	static	readonly	isSafari	= name === 'Safari';
	static	readonly	isFirefox	= name === 'Firefox';
	static	readonly	isMac		= /OS X/.test(os?.family ?? '');
	static	readonly	isMobile	= ! /(Windows|OS X)/.test(os?.family ?? '');
	static	hDip		: {[name: string]: string}	= {};
	static	isDbg		= false;
	static	isPackaged	= false;

	static	isDarkMode	= false;

	static	cc4ColorName: CanvasRenderingContext2D;

}
