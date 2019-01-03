/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// =============== Global
export interface HArg {
	タグ名?	: string;

	layer?	: string;
	class?	: string;
	index?	: string;
	dive?	: string;
	page?	: string;
	alpha?	: string;
	visible?	: string;

	time?	: string;
	rule?	: string;
	glsl?	: string;
	pos?	: string;
	text?	: string;
	wait?	: string;
	record?	: string;
	pic?	: string;
	clickse?	: string;
	enterse?	: string;
	leavese?	: string;
	clicksebuf?	: string;
	entersebuf?	: string;
	leavesebuf?	: string;
	onenter?	: string;
	onleave?	: string;
	t?	: string;
	r?	: string;
	exp?	: string;
	char?	: string;
	sesame?	: string;
	cast?	: string;
	val?	: string;
	flags?	: string;
	reg?	: string;
	len?	: string;
	url?	: string;
	format?	: string;
	chain?	: string;

	fn?		: string;
	face?	: string;
	label?	: string;
	call?	: string;
	global?	: string;
	name?	: string;
	blendmode?	: string;
	clear_local_event?	: string;

	style?			: string;
	style_hover?	: string;
	style_clicked?	: string;
	fill_hover?	: string;

	b_left?		: string;
	b_top?		: string;
	b_width?	: string;
	b_height?	: string;
	b_color?	: string;
	b_alpha?	: string;
	b_alpha_isfixed?	: string;
	b_pic?		: string;
	back_clear?	: string;

	max_col?	: string;
	max_row?	: string;
	bura_col?	: string;
	chk_overrow?	: string;

	dx?	: number;
	dy?	: number;

	key?	: string;
	em?		: DisplayObject;
	type?	: string;

	breakout?	: Function;
	arg?	: HArg;
	fnc?	: (e: Event)=> void;
	fold?	: boolean;

	filter?	: string;

	ease?	: string;

	centering?	:boolean;
	x?	: number;
	y?	: number;

	id?			: string;
	src?		: string;
	var_name?	: string;

	left?	: string;
	top?	: string;
	width?	: string;
	height?	: string;

	swipe?	: string;
	f2tap?	: string;
	f2move?	: string;
	f3tap?	: string;
}
export interface ITag { (hArg: HArg): boolean; }
export interface IHTag { [name: string]: ITag; }

export interface IMyTrace {
	(txt: string, lvl?: string, fnline?: boolean, adjust_line?: number): void;
}

export function int(o: any): number {return parseInt(String(o), 10)}
export function uint(o: any): number {
	const v = parseInt(String(o), 10);
	return v < 0 ? -v : v;
}
export function trim(s: string): string {return s.replace(/^\s+|\s+$/g,'')}
if (! String.prototype['toInt']) {
	String.prototype['toInt'] = function () { return int(this); };
}
if (! String.prototype['toUint']) {
	String.prototype['toUint'] = function () {
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

export interface ITwInf {
	tw			: TWEEN.Tween;
	resume		: boolean;
	onComplete?	: ()=> void;
};


// =============== Main
export interface IMain {
	errScript(mes: string, isThrow? :boolean): void;
	resume(fnc?: ()=> void): void;
	resumeByJumpOrCall(hArg: HArg): void;
	stop(): void;
};


// =============== SysBase
export interface ISysBase {
	initData(data: IData4Vari, hTmp: object, comp: (data: IData4Vari)=> void): void;
	flush(): void;
};


// =============== Config
export interface IExts { [ext: string]: string; };
export interface IPathFn2Exts { [fn: string]: IExts; };


// =============== Variable
export interface typeProcVal { (): any };
export interface ISetVal { (arg_name: string, val: any, autocast?: boolean): void;};

export interface IVariable {
	setSys(sys: ISysBase): void;
	flush(): void;
	getVal(arg_name: string, def?: number): object;
	setVal_Nochk(scope: string, nm: string, val: any, autocast?: boolean): void;
	defTmp(name: string, fnc: typeProcVal): void;
	defValTrg(name: string, fnc: ISetVal): void;
	cloneMp(): object;
	setMp(mp: object): void;
	setMark(place: number, mp: IMark): void;
	getMark(place: number): IMark;
	cloneSave(): object;
	loadWark(place: number);
};

export interface IData4Vari {
	sys		: {[name: string]: any};
	mark	: {[name: string]: IMark};
	kidoku	: {[name: string]: any};
};

export interface IMark {
	hSave	: {[name: string]: any};
	hPages	: HPage;
	aIfStk	: number[];
	json?	: any;
};


// =============== LayerMng
export type typeLayerClass = 'grp'|'txt'|'3d';

// =============== Pages
export interface HPage {[name: string]: IPage};
export interface IPage {
	cls		: typeLayerClass;
	fore	: {[name: string]: any};
	back	: {[name: string]: any};
};


// =============== RubySpliter
export interface IPutCh {
	(ch: string, ruby: string): void;
};


// =============== EventMng
import { interaction, DisplayObject } from 'pixi.js';
import { EventListenerCtn } from './EventListenerCtn';
export interface IEvt2Fnc {(e: Event): void};
export interface IHEvt2Fnc {[name: string]: IEvt2Fnc;};
export interface IEvtMng {
	button(hArg: HArg, em: DisplayObject);
	isSkipKeyDown(): boolean;
	stdWait(fnc: (e: interaction.InteractionEvent)=> void, stdEvt?: boolean);
	popLocalEvts(): IHEvt2Fnc;
	pushLocalEvts(a: IHEvt2Fnc);
	waitCustomEvent(hArg: HArg, elc: EventListenerCtn, fnc: ()=> void);

	resvFlameEvent(win: any);
};


import m_path = require('path');
import m_xregexp = require('xregexp');
import TWEEN = require('@tweenjs/tween.js');

export class CmnLib {
	static	stageW		= 0;
	static	stageH		= 0;
	static	devtool		= false;
	static	osName		= '';	// ３文字でOS名

	static	isRetina	= false;
	static	retinaRate	= 1;

	static argChk_Num(hash: any, name: string, def: number): number {
		const v = hash[name];
		if (! (name in hash)) {
			if (isNaN(def)) throw('['+ hash['タグ名'] +']属性 '+ name +' は必須です');

			hash[name] = def;
			return def;
		}

		const n = (String(v).substr(0, 2) == '0x')
			? parseInt(v)
			: parseFloat(v);
		if (isNaN(n)) throw('['+ hash['タグ名'] +']属性 '+ name +' の値【'+ v +'】が数値ではありません');

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


	static	hEase	= {
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


	// =============== ScriptIterator
	static	REG_TOKEN		= m_xregexp(	// テスト用にpublic
		`(?: \\[let_ml \\s+ [^\\[\\]]+ \\])`+
			`(?: . | \\s)+?`+	// [let_ml]〜[endlet_ml]間のテキスト
		`(?=\\[endlet_ml \\s* \\])`+
		//		`| (?<= \\[let_ml \\s+ [^\\[\\]]+ \\])`+
		//	Electron、過ぎ去った前を見る肯定後読み「(?<=」使えない。エラーになる
		`| \\[ (?: ([\\"\\'\\#]) .*? \\1 | . ) *? \\]`+	// タグ
		'| \\n+'+			// 改行
		'| \\t+'+			// タブ
		'| &[^&\\n]+&'+		// ＆表示＆
		'| &&?[^;\\n\\t&]+'+// ＆代入
		'| ;[^\\n]+'+		// コメント
		'| ^\\*\\w+'+		// ラベル
		'| [^\\n\\t\\[;]+'	// 本文
		, 'gx');
	static	REG_TOKEN_NOTXT		= /[\n\t;\[*&]/;	// テスト用にpublic


	private	static	REG_MULTILINE_TAG	= m_xregexp(
	`\\[
		([^\\n\\]]+ \\n
			(?:
				(["'#]) .*? \\2
			|	[^\\[\\]]
			)*
		)
	\\]
|	;[^\\n]+`
		, 'gx');
	private	static	REG_MULTILINE_TAG_SPLIT	= m_xregexp(
		`((["'#]).*?\\2|;.*\\n|\\n+|[^\\n"'#;]+)`, 'g');
	static	cnvMultilineTag(txt: string): string {	// テスト用にpublic
		return txt.replace(
			CmnLib.REG_MULTILINE_TAG,
			function (): string {
				if (arguments[0].charAt(0) == ';') return arguments[0];

				let fore = '';
				let back = '';
				for (const v of arguments[1].match(CmnLib.REG_MULTILINE_TAG_SPLIT)) {
					switch (v.substr(-1)) {
						case '\n':	back += v;	break;
						case `"`:
						case `'`:
						case `#`:	fore += v;	break;
						default:	fore += ' '+ trim(v);	break;
					}
				}

				return '['+ trim(fore.slice(1)) +']'+ back;
			}
		);
	}


	static	splitAmpersand(token: string): object {	// テスト用にpublic
		const equa = token.replace(/==/g, '＝').replace(/!=/g, '≠').split('=');
			// != を弾けないので中途半端ではある
		const cnt_equa = equa.length;
		if (cnt_equa < 2 || cnt_equa > 3) throw '「&計算」書式では「=」指定が一つか二つ必要です';
		if (equa[1].charAt(0) == '&') throw '「&計算」書式では「&」指定が不要です';
		return {
			name: equa[0].replace(/＝/g, '==').replace(/≠/g, '!='),
			text: equa[1].replace(/＝/g, '==').replace(/≠/g, '!='),
			cast: ((cnt_equa == 3) ?trim(equa[2]) :null)
		};
	}


	// Unit testの為publicにする
	static	REG_TAG	= m_xregexp(`^\\[ (?<name>\\S*) (\\s+ (?<args>.+) )? ]$`, 'x');


	static	getFn = (path: string)=> m_path.basename(path, m_path.extname(path));
	static	getExt = (path: string)=> m_path.extname(path).slice(1);

}
