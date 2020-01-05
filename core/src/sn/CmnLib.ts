/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {HArg} from './CmnInterface';

// =============== Global
export function int(o: any): number {return parseInt(String(o), 10)}
export function uint(o: any): number {
	const v = parseInt(String(o), 10);
	return v < 0 ? -v : v;
}
export function trim(s: string): string {return s.replace(/^\s+|\s+$/g,'')}
if (! ('toInt' in String.prototype)) {
	(String.prototype as any)['toInt'] = function () { return int(this); };
}
if (! ('toUint' in String.prototype)) {
	(String.prototype as any)['toUint'] = function () {
		const v = int(this);
		return v < 0 ? -v : v;
	};
}
if (! String.prototype.trim) {
	String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g,''); };
}

export function getDateStr(spl_dd = '/', spl_dt = ' ', spl_tt = ':', spl_ms = ''): string {
	const now = new Date();
	return now.getFullYear()
		+ spl_dd+ String(100 +now.getMonth() +1).substr(1, 2)
		+ spl_dd+ String(100 +now.getDate()).substr(1, 2)
		+ spl_dt+ String(100 +now.getHours()).substr(1, 2)
		+ spl_tt+ String(100 +now.getMinutes()).substr(1, 2)
		+ (spl_ms == '' ?'' :spl_ms+ String(now.getMilliseconds()));
}


// =============== EventMng
import {interaction, DisplayObject} from 'pixi.js';
import {EventListenerCtn} from './EventListenerCtn';
export interface IEvt2Fnc {(e: Event): void};
export interface IHEvt2Fnc {[name: string]: IEvt2Fnc;};
export interface IEvtMng {
	button(hArg: HArg, em: DisplayObject): void;
	isSkipKeyDown(): boolean;
	stdWait(fnc: (e?: interaction.InteractionEvent)=> void, canskip?: boolean): void;
	popLocalEvts(): IHEvt2Fnc;
	pushLocalEvts(a: IHEvt2Fnc): void;
	waitCustomEvent(hArg: HArg, elc: EventListenerCtn, fnc: ()=> void): void;

	resvFlameEvent(win: Window): void;
}


import m_path = require('path');
const platform = require('platform');

export class CmnLib {
	static	stageW		= 0;
	static	stageH		= 0;
	static	devtool		= false;
	static	platform	= {...platform};
	static	isSafari	= platform.name == 'Safari';
	static	isMac		= process.platform === 'darwin';
	static	hDip		: {[name: string]: string}	= {};

	static	isRetina	= false;
	static	isDarkMode	= false;
	static	retinaRate	= 1;

	static	readonly	sn_id	= 'skynovel';

	static argChk_Num(hash: any, name: string, def: number): number {
		const v = hash[name];
		if (! (name in hash)) {
			if (isNaN(def)) throw '['+ hash['タグ名'] +']属性 '+ name +' は必須です';

			hash[name] = def;
			return def;
		}

		const n = (String(v).substr(0, 2) == '0x')
			? parseInt(v)
			: parseFloat(v);
		if (isNaN(n)) throw '['+ hash['タグ名'] +']属性 '+ name +' の値【'+ v +'】が数値ではありません';

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
	static argChk_Boolean(hash: any, name: string, def: boolean): boolean {
		//	t-r-a-c-e(Boolean(null),Boolean(""),Boolean(undefined),Boolean("0"),Boolean("1"),Boolean("true"),Boolean("false"),Boolean("あい"));
		//	[exec] false false false true true true true true
		/*console.log('%o %o %o %o %o %o %o %o',
			Boolean(null), Boolean(""), Boolean(undefined), Boolean("0"), Boolean("1"),
			Boolean("true"), Boolean("false"), Boolean("あい"));
		*/

		//if (! hArg[name]) return hArg[name] = def;
		if (! (name in hash)) return hash[name] = def;

		const v = hash[name];
		if (v == null) return false;

		const v2 = String(v);
		return hash[name] = (v2 == "false")? false : Boolean(v2);
	}


	static	readonly 	getFn = (path: string)=> m_path.basename(path, m_path.extname(path));
	static	readonly 	getExt = (path: string)=> m_path.extname(path).slice(1);

}
