/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2022 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// =============== Global
export type HArg = {
	':タグ名'?	: string;

	layer?	: string;	// レイヤ系
	class?	: string;
	index?	: number;
	dive?	: string;
	page?	: string;
	alpha?	: number;
	pivot_x?: number;
	pivot_y?: number;
	rotation?	: number;
	scale_x?: number;
	scale_y?: number;
	visible?: boolean;
	blendmode?	: string;

	left?	: number;
	top?	: number;
	width?	: number;
	height?	: number;
	pl?		: number;
	pr?		: number;
	pt?		: number;
	pb?		: number;

	rotate?	: number;
	in_style?	: string;
	out_style?	: string;
	ffs?	: string;
	noffs?	: string;
	kinsoku_sol?	: string;
	kinsoku_eol?	: string;
	kinsoku_dns?	: string;

	time?	: number;
	rule?	: string;
	glsl?	: string;
	render?	: boolean;

	pos?	: string;
	text?	: string;
	wait?	: number;
	record?	: boolean;
	pic?	: string;
	enabled?: boolean;
	hint?		: string;
	hint_style?	: string;
	hint_opt?	: string;
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
	path?	: string;

	fn?		: string;
	face?	: string;
	label?	: string;
	call?	: boolean;
	global?	: boolean;
	name?	: string;
	clear_local_event?	: string;

	style?			: string;
	style_hover?	: string;
	style_clicked?	: string;
	r_style?		: string;
	r_style_hover?	: string;
	r_style_clicked?: string;
	r_align?	: string;

	b_width?	: string;
	b_height?	: string;
	b_color?	: string;
	b_alpha?	: number;
	b_alpha_isfixed?	: boolean;
	b_pic?		: string;
	back_clear?	: string;

	max_col?	: string;
	max_row?	: string;
	bura_col?	: string;
	chk_overrow?	: string;

	dx?	: number;
	dy?	: number;

	key?	: string;
	type?	: string;	// 3Dレイヤで使用
	camera_target?	: string;

	breakout?	: Function;
	arg?	: HArg;
	fnc?	: (e: Event)=> void;

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
	add?	: string;
	del?	: string;

	buf?	: string;	// 音系
	buf2?	: string;
	loop?	: boolean;
	volume?	: number;
	ret_ms?	: number;
	end_ms?	: number;
	join?	: boolean;
	do_rec?	: boolean;
	pan?	: number;

	clear?	: boolean;

	// デザインモード
	':id_dc'?	: string;
	':id_tag'?	: string;
	':path'?	: string;
	':ln'?		: number;
	':col_s'?	: number;
	':col_e'?	: number;
	':idx_tkn'?	: number;
	':token'?	: string;
	design_unit?: boolean;	// デザインモードでこのマクロへの引数変更とするか（内部をサーチさせない）

//	stepin?		: boolean;		// 拡張機能のみ使用：false指定でステップインしない
//	nowarn_unused?	: boolean;	// 拡張機能のみ使用：未使用警告を出さない
}
export interface ITag { (hArg: HArg): boolean; }
export interface IHTag { [name: string]: ITag; }

export interface IMyTrace {
	(txt: string, lvl?: string, fnline?: boolean, adjust_line?: number): void;
}


// =============== ScriptIterator
export type Script = {
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
import {DisplayObject, RenderTexture} from 'pixi.js';
export type PLUGIN_PRE_RET = {
	ret		: string;
	ext_num	: number;
};
export type IPluginInitArg = {
	addTag(tag_name: string, tag_fnc: ITag): void;
	addLayCls(cls: string, fnc: ILayerFactory): void;
	searchPath(fn: string, extptn?: string): string;
	getVal(arg_name: string, def?: number | string): object;
	resume(fnc?: ()=> void): void;
	render(dsp: DisplayObject, renTx?: RenderTexture, clear?: boolean): void;
	setDec(fnc: (ext: string, d: string | ArrayBuffer)=> PLUGIN_PRE_RET): void;
	setEnc(fnc: (d: string)=> string): void;
	getStK(fnc: ()=> string): void;
	getHash(fnc: (data: string)=> string): void;
}
export interface IPlugin {
	init(pia: IPluginInitArg): Promise<void>;
}
export interface HPlugin {[name: string]: IPlugin;}

import { Layer } from './Layer';
export interface ILayerFactory {
	(): Layer;
}


// =============== SysBase
export type HSysBaseArg = {
	cur		: string;
	crypto	: boolean;
	dip		: string;
}

export type SYS_DEC_RET = HTMLImageElement | ArrayBuffer | HTMLVideoElement | string;
export interface ISysBase {
	loadPath(hPathFn2Exts: IFn2Path, cfg: IConfig): void;
	initVal(data: IData4Vari, hTmp: object, comp: (data: IData4Vari)=> void): void;
	flush(): void;
	decStr(ext: string, d: string): string;
	dec(ext: string, ab: ArrayBuffer): Promise<SYS_DEC_RET>;

	addHook(fnc: IFncHook): void;
	callHook: IFncHook;
	send2Dbg: IFncHook;

	copyBMFolder(from: number, to: number): void;
	eraseBMFolder(place: number): void;

	destroy(): void;
}

export interface IFire {(KEY: string, e: Event): void};
export interface IFncHook {(type: string, o: any): void};


// =============== Config
export type T_CFG = {
	book	: {
		title		: string,	// 作品タイトル
		creator		: string,	// 著作者
		cre_url		: string,	// 連絡先URL
		publisher	: string,	// 出版者
		pub_url		: string,	// 出版社URL
		detail		: string,	// 内容紹介
		version		: string,	// version
	},
	save_ns		: string,
	window	: {		// アプリケーションウインドウサイズ
		width	: number,
		height	: number,
	},
	log		: {max_len: number},	// プレイヤーが読んだ文章を読み返せる履歴の長さ
	init	: {
		bg_color			: string,	// 背景色
		tagch_msecwait		: number,	// 通常文字表示待ち時間（未読／既読）
		auto_msecpagewait	: number,	// 自動文字表示、行待ち時間（未読／既読）
		escape				: string,	// エスケープ文字
	},
	debug	: {	// デバッグ情報
		devtool		: boolean,
		token		: boolean,
		tag			: boolean,
		putCh		: boolean,
		debugLog	: boolean,
		baseTx		: boolean,
		masume		: boolean,	// テキストレイヤ：ガイドマス目を表示するか
		variable	: boolean,
	},
	code	: {[fold_nm: string]: boolean,},	// 暗号化しないフォルダ
	debuger_token	: string,	// デバッガとの接続トークン
}

export interface IExts { [ext: string]: string; };
export interface IFn2Path { [fn: string]: IExts; };

export interface IConfig {
	oCfg: T_CFG;
	getNs(): string;
	searchPath(fn: string, extptn?: string): string;
	addPath(fn: string, h_exts: IExts): void;
}


// =============== Main
export interface IMain {
	errScript(mes: string, isThrow? :boolean): void;
	resume(fnc?: ()=> void): void;
	resumeByJumpOrCall(hArg: HArg): void;
	stop(): void;
	setLoop(v: boolean, mes?: string): void;
	fire(KEY: string, e: Event): void;
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
	cloneMp(): IValMp;
	setMp(mp: IValMp): void;
	setMark(place: number, mark: IMark): void;
	getMark(place: number): IMark;
	cloneSave(): IValSave;
	mark2save(mark: IMark): void;

	loadScrWork(fn: string): void;
	getAreaKidoku(fn: string): IAreas;
	saveKidoku(): void;
	updateData(data: IData4Vari): void;

	defValTrg(name: string, fnc: ISetVal): void;

	doRecLog(): boolean;
}
export interface IValMp {[name: string]: string};
export interface IValSave {[name: string]: string};

export type IData4Vari = {
	sys		: {[name: string]: any};
	mark	: {[name: string]: IMark};
	kidoku	: {[name: string]: any};
}

export type IMark = {
	hSave	: {[name: string]: any};
	hPages	: HIPage;
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

export interface IRecorder {
	recText(txt: string) : void;
	recPagebreak() : void;
};


// =============== Pages
export type HIPage = {[name: string]: IPage};
export type IPage = {
	cls		: string;
	fore	: {[name: string]: any};
	back	: {[name: string]: any};
}


// =============== RubySpliter
export interface IPutCh {
	(ch: string, ruby: string): void;
}


// =============== Volume change event notification (GrpLayer)
export interface INoticeChgVolume {
	(vol: number): void;
}
