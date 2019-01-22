/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// =============== Global
export interface HArg {
	タグ名?	: string;

	layer?	: string;	// レイヤ系
	class?	: string;
	index?	: string;
	dive?	: string;
	page?	: string;
	alpha?	: string;
	visible?: boolean;

	time?	: number;
	rule?	: string;
	glsl?	: string;
	pos?	: string;
	text?	: string;
	wait?	: number;
	record?	: boolean;
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
	call?	: boolean;
	global?	: boolean;
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
	em?		: any;
	type?	: string;

	breakout?	: Function;
	arg?	: HArg;
	fnc?	: (e: Event)=> void;
	fold?	: boolean;

	filter?	: string;

	ease?	: string;
	canskip?	:boolean;

	centering?	:boolean;
	x?	: number;
	y?	: number;

	id?			: string;
	src?		: string;
	var_name?	: string;
	set_fnc?	: string;
	break_fnc?	: string;

	left?	: string;
	top?	: string;
	width?	: string;
	height?	: string;

	swipe?	: string;
	f2tap?	: string;
	f2move?	: string;
	f3tap?	: string;

	from?	: number;
	to?		: number;
	place?	: number;

	buf?	: string;	// 音系
	buf2?	: string;
	loop?	: boolean;
	volume?	: number;
	ret_ms?	: number;
	end_ms?	: number;
	join?	: boolean;
	do_rec?	: boolean;


	dae?	: string;
	celestial_sphere?	: string;
}
export interface ITag { (hArg: HArg): boolean; }
export interface IHTag { [name: string]: ITag; }

export interface IMyTrace {
	(txt: string, lvl?: string, fnline?: boolean, adjust_line?: number): void;
}


// =============== Plugin
export interface IPluginInitArg {
	addTag: (tag_name: string, tag_fnc: ITag)=> void;
}
export interface IPlugin {
	init: (plgArg: IPluginInitArg)=> boolean;
}


// =============== SysBase
export interface ISysBase {
	loadPathAndVal(hPathFn2Exts: IPathFn2Exts, fncLoaded: ()=> void, cfg: IConfig): void;
	initVal(data: IData4Vari, hTmp: object, comp: (data: IData4Vari)=> void): void;
	flush(): void;
}


// =============== Config
export interface IExts { [ext: string]: string; };
export interface IPathFn2Exts { [fn: string]: IExts; };

export interface IConfig {
	getNs(): string;
}


// =============== Main
export interface IMain {
	errScript(mes: string, isThrow? :boolean): void;
	resume(fnc?: ()=> void): void;
	resumeByJumpOrCall(hArg: HArg): void;
	stop(): void;
	isDestroyed(): boolean;
}


// =============== Areas
export interface IAreas {
	search(idx: number): boolean;
	record(idx: number): void;
	erase(idx: number): void;
}


// =============== Variable
export interface typeProcVal { (): any };
export interface ISetVal { (arg_name: string, val: any, autocast?: boolean): void;};

export interface IVariable {
	setSys(sys: ISysBase): void;
	flush(): void;

	getVal(arg_name: string, def?: number | string): object;
	setVal_Nochk(scope: string, nm: string, val: any, autocast?: boolean): void;

	defTmp(name: string, fnc: typeProcVal): void;
	cloneMp(): object;
	setMp(mp: object): void;
	setMark(place: number, mark: IMark): void;
	getMark(place: number): IMark;
	cloneSave(): object;
	mark2save(mark: IMark): void;

	loadScrWork(fn: string): void;
	getAreaKidoku(fn: string): IAreas;
	saveKidoku(): void;

	defValTrg(name: string, fnc: ISetVal): void;
}

export interface IData4Vari {
	sys		: {[name: string]: any};
	mark	: {[name: string]: IMark};
	kidoku	: {[name: string]: any};
}

export interface IMark {
	hSave	: {[name: string]: any};
	hPages	: HPage;
	aIfStk	: number[];
	json?	: any;
}


// =============== LayerMng
export type typeLayerClass = 'grp'|'txt'|'3d';

// =============== Pages
export interface HPage {[name: string]: IPage};
export interface IPage {
	cls		: typeLayerClass;
	fore	: {[name: string]: any};
	back	: {[name: string]: any};
}


// =============== RubySpliter
export interface IPutCh {
	(ch: string, ruby: string): void;
}

