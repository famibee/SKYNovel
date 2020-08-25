/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

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
	alpha?	: number;
	pivot_x?: number;
	pivot_y?: number;
	rotation?	: number;
	scale_x?: number;
	scale_y?: number;
	visible?: boolean;

	left?	: string;
	top?	: string;
	width?	: string;
	height?	: string;

	rotate?	: number;
	in_style?	: string;
	out_style?	: string;
	ffs?	: string;
	noffs?	: string;

	time?	: number;
	rule?	: string;
	glsl?	: string;
	pos?	: string;
	text?	: string;
	wait?	: number;
	record?	: boolean;
	pic?	: string;
	enabled?: boolean;
	hint?	: string;
	hint_tate?	: boolean;	// tooltips用
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

	b_width?	: string;
	b_height?	: string;
	b_color?	: string;
	b_alpha?	: number;
	b_alpha_isfixed?	: string;
	b_pic?		: string;
	back_clear?	: string;

	r_align?	: string;
	max_col?	: string;
	max_row?	: string;
	bura_col?	: string;
	chk_overrow?	: string;

	dx?	: number;
	dy?	: number;

	key?	: string;

	breakout?	: Function;
	arg?	: HArg;
	fnc?	: (e: Event)=> void;
	fold?	: boolean;

	filter?	: string;

	ease?	: string;
	canskip?	:boolean;

	centering?	:boolean;
	x?		: number | string;
	y?		: number | string;

	id?			: string;
	src?		: string;
	var_name?	: string;
	set_fnc?	: string;
	break_fnc?	: string;

	swipe?	: string;
	f2tap?	: string;
	f2move?	: string;
	f3tap?	: string;

	from?	: number;
	to?		: number | string;
	place?	: number;

	buf?	: string;	// 音系
	buf2?	: string;
	loop?	: boolean;
	volume?	: number;
	ret_ms?	: number;
	end_ms?	: number;
	join?	: boolean;
	do_rec?	: boolean;
}
export interface ITag { (hArg: HArg): boolean; }
export interface IHTag { [name: string]: ITag; }

export interface IMyTrace {
	(txt: string, lvl?: string, fnline?: boolean, adjust_line?: number): void;
}


// =============== ScriptIterator
export interface Script {
	aToken	: string[];		// トークン群
	len		: number;		// トークン数
	aLNum	: number[];		// トークンの行番号
};


// =============== PropParser
export interface IPropParser {
	parse(s: string): any;
	getValAmpersand(val: string): string;
}


// =============== Plugin
export interface IPluginInitArg {
	addTag(tag_name: string, tag_fnc: ITag): void;
	addLayCls(cls: string, fnc: ILayerFactory): void;
	searchPath(fn: string, extptn?: string): string;
	getVal(arg_name: string, def?: number | string): object;
	resume(fnc?: ()=> void): void;
	render(dsp: PIXI.DisplayObject, renTx?: PIXI.RenderTexture, clear?: boolean): void;
	setPre(fnc: (ext: string, data: string)=> Promise<string>): void;
	setEnc(fnc: (data: string)=> Promise<string>): void;
	getStK(fnc: ()=> string): void;
	getHash(fnc: (data: string)=> string): void;
}
export interface IPlugin {
	init(plgArg: IPluginInitArg): boolean;
}
export interface HPlugin {[name: string]: IPlugin;}

import { Layer } from './Layer';
export interface ILayerFactory {
	(): Layer;
}


// =============== SysBase
export interface HSysBaseArg {
	cur		: string;
	crypto	: boolean;
	dip		: string;
}

export interface ISysBase {
	loadPathAndVal(hPathFn2Exts: IFn2Path, fncLoaded: ()=> void, cfg: IConfig): void;
	initVal(data: IData4Vari, hTmp: object, comp: (data: IData4Vari)=> void): void;
	flush(): void;
	pre(ext: string, data: string): Promise<string>;

	addHook(fnc: IFncHook): void;
	callHook: IFncHook;
	sendDbg: IFncHook;

	copyBMFolder(from: number, to: number): void;
	eraseBMFolder(place: number): void;
}

export interface IFire {(KEY: string, e: Event): void};
export interface IFncHook {(type: string, o: any): void};


// =============== Config
export interface IExts { [ext: string]: string; };
export interface IFn2Path { [fn: string]: IExts; };

export interface IConfig {
	oCfg: any;
	getNs(): string;
	searchPath(fn: string, extptn?: string): string;
}


// =============== Main
export interface IMain {
	errScript(mes: string, isThrow? :boolean): void;
	resume(fnc?: ()=> void): void;
	resumeByJumpOrCall(hArg: HArg): void;
	stop(): void;
	setLoop(v: boolean, mes?: string): void;
	isDestroyed(): boolean;
	destroy(ms_late?: number): void;
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
	setDoRecProc(doRecProc: (doRec: boolean)=> void): void;

	getVal(arg_name: string, def?: number | string): any;
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
	updateData(data: IData4Vari): void;

	defValTrg(name: string, fnc: ISetVal): void;

	doRecLog(): boolean;
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


// =============== EventMng
export interface IEvt2Fnc {(e: Event): void};
export interface IHEvt2Fnc {[name: string]: IEvt2Fnc;};


// =============== FrameMng, LayerMng
export interface IGetFrm {
	getFrmDisabled	: {(id: string): boolean};
};


// =============== Pages
export interface HPage {[name: string]: IPage};
export interface IPage {
	cls		: string;
	fore	: {[name: string]: any};
	back	: {[name: string]: any};
}


// =============== RubySpliter
export interface IPutCh {
	(ch: string, ruby: string): void;
}

