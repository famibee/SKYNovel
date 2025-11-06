/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {T_HSysBaseArg, T_SEARCHPATH} from './ConfigBase';
import type {TArg, TTag} from './Grammar';
import type {Areas, T_H_Areas} from './Areas';
import type {T_H_VAL_MP} from './CallStack';
import type {Layer, T_RecordPlayBack_lay} from './Layer';
import {CmnLib, getDateStr} from './CmnLib';

import type {DisplayObject, RenderTexture} from 'pixi.js';


export type T_MyTrace = (txt: string, lvl?: string, fnline?: boolean, adjust_line?: number)=> void


// =============== PropParser
export type T_PropParser = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	parse(s: string): any;
	getValAmpersand(val: string): string;
}


// =============== Plugin
export type T_PLUGIN_DECAB_RET = {
	ext_num	: number;
	ab		: ArrayBuffer;
};
export type T_PLUGIN_INFO = {
	window: {
		width	: number;
		height	: number;
	},
}
export type T_PluginInitArg = {
	getInfo(): T_PLUGIN_INFO;
	addTag(tag_name: string, tag_fnc: TTag): void;
	addLayCls(cls: string, fnc: T_LayerFactory): void;
	searchPath: T_SEARCHPATH;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getVal(arg_name: string, def?: number | string): any;
	resume(fnc?: ()=> void): void;
	render(dsp: DisplayObject, renTx?: RenderTexture, clear?: boolean): void;
	setDec(fnc: (ext: string, tx: string)=> Promise<string>): void;
	setDecAB(fnc: (ab: ArrayBuffer)=> Promise<T_PLUGIN_DECAB_RET>): void;
	setEnc(fnc: (tx: string)=> Promise<string>): void;
	getStK(fnc: ()=> string): void;
	getHash(fnc: (str: string)=> string): void;
}
export type T_Plugin = {
	init(pia: T_PluginInitArg): Promise<void>;
}
export type T_HPlugin = {[name: string]: T_Plugin;}

export type T_LayerFactory = ()=> Layer


// =============== SysBase
export type T_SysBaseParams = [
	hPlg	: T_HPlugin,
	arg?	: T_HSysBaseArg,
];
export type T_SysBaseLoadedParams = [
	hPlg	: T_HPlugin,
	arg		: T_HSysBaseArg,
];


export type SYS_DEC_RET = HTMLImageElement | HTMLVideoElement | ArrayBuffer;
export type T_SysBase = {
	initVal(hTmp: T_H_TMP_DATA, comp: (data: T_Data4Vari)=> void): Promise<void>;
	flush(): void;

	addHook(fnc: T_FncHook): void;
	callHook: T_FncHook;
	send2Dbg: T_FncHook;

	copyBMFolder(from: number, to: number): void;
	eraseBMFolder(place: number): void;

	destroy(): void;
}

export type T_Fire = (KEY: string, e: Event)=> void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type T_FncHook = (type: string, o: any)=> void;


// =============== Main
export type T_Main = {
	errScript(mes: string, isThrow? :boolean): void;
	cvs			: HTMLCanvasElement;
	resume(fnc?: ()=> void): void;
	resumeByJumpOrCall(hArg: TArg): void;
	stop(): void;
	setLoop(v: boolean, mes?: string): void;
	destroy(): void;
}


// =============== Variable
export type T_VAL_BSN = boolean | string | number;
export type T_VAL_BSNU = T_VAL_BSN | undefined;


// 汎用的に変数
export type T_VAL_DATA = T_VAL_BSNU | null | typeof NaN;
export type T_VAL_DATA_FNC = T_VAL_DATA | (()=> boolean) | (()=> string) | (()=> number)
export type T_H_VAL_DATA =  {[val_name: string]: T_VAL_DATA_FNC}

// セーブ変数(save:)
export type T_H_SAVE_DATA = {
	'sn.userFnTail'		: string;

	'const.sn.autowc.enabled'	: boolean;
	'const.sn.autowc.text'		: string;
	'const.sn.autowc.time'		: number;
	'const.sn.mesLayer'		: string;
	// 'const.sn.sound.【buf】.fn'		: string;
	// 'const.sn.sound.【buf】.volume'	: number;
	'const.sn.styPaging'	: string;
	'sn.doRecLog'			: boolean;
	'const.sn.sLog'		: string;
	'const.sn.loopPlaying'	: string;
	'const.sn.scriptFn'	: string;
	'const.sn.scriptIdx'	: number;
	// 'const.sn.layer.（文字レイヤ名）.enabled'	: boolean;

	// [val_name: string]: T_VAL_DATA;
}
export function creSAVEDATA(): T_H_SAVE_DATA {return {
	'sn.userFnTail'		: '',

	'const.sn.autowc.enabled': false,// （文字ごとのウェイト）enabled属性で指定した値。
	'const.sn.autowc.text'	: '',	// （文字ごとのウェイト）同名属性で指定した値。
	'const.sn.autowc.time'	: 0,	// textとtimeは常に同数にすること
	'const.sn.mesLayer'	: '',	// デフォルト文字レイヤ
	// 'const.sn.sound.【buf】.fn'	: '',	// サウンドバッファの再生ファイル名
	// 'const.sn.sound.【buf】.volume'	: 1,// サウンドバッファの目標音量
	'const.sn.styPaging'	: 'color: yellow; text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;',
		// ページ遷移中 CSS スタイル
	'sn.doRecLog'		: false,	// テキストを履歴に記録するか
	'const.sn.sLog'	: '[]',	// 履歴テキスト（JSON文字列）
	'const.sn.loopPlaying'	: '{}',	// ループ中のサウンドバッファ
	'const.sn.scriptFn'	: '',	// 最後に[record_place]したスクリプト名
	'const.sn.scriptIdx'	: 0,	// 最後に[record_place]したスクリプトインデックス（行番号ではなく内部トークン単位）
	// 'const.sn.layer.（文字レイヤ名）.enabled'	: true,	// 文字レイヤのenabled値
}}


// システム変数(sys:)
export type T_H_SYS_DATA = {
	'const.sn.cfg.ns'			: string;	// [import]時のチェック用

	'const.sn.aPageLog'			: string;	// ページ遷移用情報（JSON文字列）
	'const.sn.nativeWindow.x'	: number;	// 実数；横座標
	'const.sn.nativeWindow.y'	: number;	// 実数；縦座標
	'const.sn.nativeWindow.w'	: number;	// 実数；横幅
	'const.sn.nativeWindow.h'	: number;	// 実数；縦幅
	'const.sn.save.place'		: number;	// 次のセーブplaceを示す
	'const.sn.sound.BGM.volume'	: number;	// BGMの基準音量（buf="BGM"の効果音）
	'const.sn.sound.SE.volume'	: number;	// 効果音の基準音量（buf="SE"の効果音）
	'const.sn.sound.SYS.volume'	: number;	// システムの基準音量（buf="SYS"の効果音）
	// 'const.sn.sound.【buf】.volume'	: number;	// システムの基準音量（buf="【buf】"の効果音）
	'sn.auto.msecLineWait'		: number;	// 未読テキストの改行待ち時間（ミリ秒）
	'sn.auto.msecLineWait_Kidoku': number;	// 既読テキストの改行待ち時間（ミリ秒）
	'sn.auto.msecPageWait'		: number;	// 未読テキストの改ページ待ち時間（ミリ秒）
	'sn.auto.msecPageWait_Kidoku': number;	// 既読テキストの改ページ待ち時間（ミリ秒）
	'sn.skip.mode'				: string;	// スキップモード。
	'sn.sound.BGM.vol_mul_talking': number;	// ボイス（VOICEバッファの音声）再生中のBGM音量への乗数
	'sn.sound.global_volume'	: T_fncSetVal;	// 全体的な音量を設定する
	'sn.sound.movie_volume'		: T_fncSetVal;	// ムービー音量を設定する
	'sn.tagCh.canskip'			: boolean;	// テキストをクリックなどでスキップ可能か
	'sn.tagCh.doWait'			: boolean;	// 未読テキストにウェイトを掛けるか
	'sn.tagCh.doWait_Kidoku'	: boolean;	// 既読テキストにウェイトを掛けるか
	'sn.tagCh.msecWait'			: number;	// 未読テキスト待ち時間（ミリ秒）
	'sn.tagCh.msecWait_Kidoku'	: number;	// 既読テキスト待ち時間（ミリ秒）
	'TextLayer.Back.Alpha'		: number;	// バック不透明度。テキストウインドウの背景の濃

	// [val_name: string]		: T_VAL_DATA;
}
export function creSYS_DATA(): T_H_SYS_DATA {return {
	'const.sn.cfg.ns'			: '',	// [import]時のチェック用

	'const.sn.aPageLog'			: '[]',	// ページ遷移用情報（JSON文字列）
	'const.sn.nativeWindow.x'	: 0,	// 実数；横座標
	'const.sn.nativeWindow.y'	: 0,	// 実数；縦座標
	'const.sn.nativeWindow.w'	: CmnLib.stageW,	// 実数；横幅
	'const.sn.nativeWindow.h'	: CmnLib.stageH,	// 実数；縦幅
	'const.sn.save.place'		: 1,	// 次のセーブplaceを示す
	'const.sn.sound.BGM.volume'	: 1,	// BGMの基準音量（buf="BGM"の効果音）
	'const.sn.sound.SE.volume'	: 1,	// 効果音の基準音量（buf="SE"の効果音）
	'const.sn.sound.SYS.volume'	: 1,	// システムの基準音量（buf="SYS"の効果音）
	// 'const.sn.sound.【buf】.volume': 1,	// システムの基準音量（buf="【buf】"の効果音）
	'sn.auto.msecLineWait'		: 500,	// 未読テキストの改行待ち時間（ミリ秒）
	'sn.auto.msecLineWait_Kidoku': 500,	// 既読テキストの改行待ち時間（ミリ秒）
	'sn.auto.msecPageWait'		: 3500,	// 未読テキストの改ページ待ち時間（ミリ秒）
	'sn.auto.msecPageWait_Kidoku': 3500,// 既読テキストの改ページ待ち時間（ミリ秒）
	'sn.skip.mode'				: 's',	// スキップモード。
	'sn.sound.BGM.vol_mul_talking': 1.0,// ボイス（VOICEバッファの音声）再生中のBGM音量への乗数
	'sn.sound.global_volume'	: (_, _2)=> 1,	// 全体的な音量を設定する
	'sn.sound.movie_volume'		: (_, _2)=> 1,	// ムービー音量を設定する
	'sn.tagCh.canskip'			: true,	// テキストをクリックなどでスキップ可能か
	'sn.tagCh.doWait'			: true,	// 未読テキストにウェイトを掛けるか
	'sn.tagCh.doWait_Kidoku'	: true,	// 既読テキストにウェイトを掛けるか
	'sn.tagCh.msecWait'			: 10,	// 未読テキスト待ち時間（ミリ秒）
	'sn.tagCh.msecWait_Kidoku'	: 10,	// 既読テキスト待ち時間（ミリ秒）
	'TextLayer.Back.Alpha'		: 0.5,	// バック不透明度。テキストウインドウの背景の濃度。0.0で透明、1.0で不透明
}}


// 雑用変数(tmp:)
export type T_H_TMP_DATA = {
	'const.Date.getDateStr'		: ()=> string;
	'const.Date.getTime'		: ()=> number;
	'const.sn.bookmark.json'	: string;

	// 'const.sn.config.（略）'		: string;
	'const.sn.config.window.width'	: number;
	'const.sn.config.window.height'	: number;
	'const.sn.config.book.title'	: string;
	'const.sn.config.book.version'	: string;

	'const.sn.displayState'	: boolean;
			// const.flash.display.Stage.displayState

	// 'const.sn.frm.（フレーム名）'	: boolean;
	// 'const.sn.frm.（フレーム名）.alpha'		: number;
	// 'const.sn.frm.（フレーム名）.x'		: number;
	// 'const.sn.frm.（フレーム名）.y'		: number;
	// 'const.sn.frm.（フレーム名）.scale_x'		: number;
	// 'const.sn.frm.（フレーム名）.scale_y'		: number;
	// 'const.sn.frm.（フレーム名）.rotate'		: number;
	// 'const.sn.frm.（フレーム名）.width'		: number;
	// 'const.sn.frm.（フレーム名）.height'		: number;
	// 'const.sn.frm.（フレーム名）.visible'	: boolean;

	'const.sn.isApp'	: boolean;
	'const.sn.isDbg'	: boolean;
	'const.sn.isPackaged'	: boolean;
	'const.sn.isPaging'		: boolean;
	'const.sn.isDarkMode'	: boolean;
	'const.sn.isDebugger'	: boolean;
	'const.sn.isFirstBoot'	: boolean;
	'const.sn.isKidoku'		: boolean;
	'const.sn.key.alternate': boolean;
	'const.sn.key.back'		: boolean;
	'const.sn.key.command'	: boolean;
	'const.sn.key.control'	: boolean;
	'const.sn.key.end'		: boolean;
	'const.sn.key.escape'	: boolean;
	'const.sn.last_page_plain_text'	: string;
	'const.sn.last_page_text'		: string;
	// 'const.sn.lay.（レイヤ名）'						: boolean;
	// 'const.sn.lay.（レイヤ名）.（foreかback）.alpha'	: number;
	// 'const.sn.lay.（レイヤ名）.（foreかback）.width'	: number;
	// 'const.sn.lay.（レイヤ名）.（foreかback）.height'	: number;
	// 'const.sn.lay.（レイヤ名）.（foreかback）.visible'	: boolean;
	// 'const.sn.lay.（レイヤ名）.（foreかback）.x'		: number;
	// 'const.sn.lay.（レイヤ名）.（foreかback）.y'		: number;
	'const.sn.Math.PI'		: number;
	'const.sn.navigator.language'	: string;
	'const.sn.needClick2Play'		: ()=> boolean;
	'const.sn.platform'				: string;
	'const.sn.screenResolutionX'	: number;
	'const.sn.screenResolutionY'	: number;
	'const.sn.sound.codecs'			: string;
	// 'const.sn.sound.【buf】.playing': boolean;
	'const.sn.aIfStk.length'		: number;
	'const.sn.vctCallStk.length'	: number;
	'sn.auto.enabled'		: boolean;
	'sn.button.fontFamily'	: string;
	// 'sn.event.domdata.（任意）'	: string;
	'sn.eventArg'		: string;
	'sn.eventLabel'		: string;
	'sn.skip.all'		: boolean;
	'sn.skip.enabled'	: boolean;
	'sn.tagL.enabled'	: boolean;
}
export function creTMP_DATA(): T_H_TMP_DATA {return {
	'const.Date.getDateStr'		: ()=> getDateStr(),	// 変数参照時の日時を返す
	'const.Date.getTime'		: ()=> (new Date).getTime(),
	'const.sn.bookmark.json'	: '[]',	// SKYNovel内部によるsave:の管理用

	// 'const.sn.config.（略）'	: ,	// prj.jsonの内容を返す
	'const.sn.config.window.width'	: 0,
	'const.sn.config.window.height'	: 0,
	'const.sn.config.book.title'	: '',
	'const.sn.config.book.version'	: '',

	'const.sn.displayState'		: false,	// ウインドウ・フルスクリーン状態。trueならフルスクリーン

	// 'const.sn.frm.（フレーム名）'	: true,	// [add_frame]でロードされた id属性が存在するか
	// 'const.sn.frm.（フレーム名）.alpha'	: 1,	// フレームの不透明度
	// 'const.sn.frm.（フレーム名）.x'		: 0,	// フレームの座標。画面左上を(0, 0)とする座標。leftやtopでないことに注意
	// 'const.sn.frm.（フレーム名）.y'		: 0,	// 実数；縦座標
	// 'const.sn.frm.（フレーム名）.scale_x'	: 1,	// cssでのtransform: scaleの値
	// 'const.sn.frm.（フレーム名）.scale_y'	: 1,	// cssでのtransform: scaleの値
	// 'const.sn.frm.（フレーム名）.rotate'	: 0,	// cssでのrotate、回転角度（単位：deg 度）、正の値は時計回り
	// 'const.sn.frm.（フレーム名）.width'		: prjのアプリ横幅画面サイズ,	// フレームの横幅
	// 'const.sn.frm.（フレーム名）.height'	: prjのアプリ縦幅画面サイズ,	// フレームの縦幅
	// 'const.sn.frm.（フレーム名）.visible'	: true,	// フレームが表示されているか。visible属性の値を返す

	'const.sn.isApp'		: false,	// アプリ版か
	'const.sn.isDbg'		: false,	// デバッグモードか
	'const.sn.isPackaged'	: false,	// パッケージされたアプリか(Electron API - app.isPackaged)
	'const.sn.isPaging'		: false,	// ページ遷移状態か
	'const.sn.isDarkMode'	: false,	// ダークモードか
	'const.sn.isDebugger'	: true,	// ブラウザ実行、それもVSCode・npmによる「起動：ブラウザ版」上での実行か
	'const.sn.isFirstBoot'	: true,		// ゲームがインストールされてから、初めての起動か（起動されるまでデータが空だったか）
	'const.sn.isKidoku'		: true,	// この変数を参照した位置は既読か。参照「後」必ず既読になる点に注意
	'const.sn.key.alternate': false,	// ALTキー（MacならOptionキー）が押されているか
	'const.sn.key.back'		: false,	// back 〃
	'const.sn.key.command'	: false,	// command 〃
	'const.sn.key.control'	: false,	// control 〃
	'const.sn.key.end'		: false,	// end 〃
	'const.sn.key.escape'	: false,	// escape 〃
	'const.sn.last_page_plain_text'	: '',	// そのページの履歴テキスト（《》文法とルビを含まない）
	'const.sn.last_page_text'		: '',	// そのページの履歴テキスト（《》文法もそのまま）
	// 'const.sn.lay.（レイヤ名）'		: true,	// レイヤが[add_lay]され存在するか
	// 'const.sn.lay.（レイヤ名）.（foreかback）.alpha'		: 0.0〜1.0,	// レイヤの不透明度
	// 'const.sn.lay.（レイヤ名）.（foreかback）.width'		: 1,	// レイヤの横幅。ただし文字レイヤの場合は1、画像レイヤの場合、画像読込後でないと0
	// 'const.sn.lay.（レイヤ名）.（foreかback）.height'		: 1,	// レイヤの縦幅。ただし文字レイヤの場合は1、画像レイヤの場合、画像読込後でないと0
	// 'const.sn.lay.（レイヤ名）.（foreかback）.visible'		: true,	// レイヤが表示されているか。visible属性の値を返す
	// 'const.sn.lay.（レイヤ名）.（foreかback）.x'		: 0,	// 実数；横座標</td><td rowspan="2">レイヤの座標。画面左上を(0, 0)とする座標。leftやtopでないことに注意
	// 'const.sn.lay.（レイヤ名）.（foreかback）.y'		: 0,	// 実数；縦座標
	'const.sn.Math.PI'		: Math.PI,	// 円周率
	'const.sn.navigator.language': 'jp',	// ユーザーが最優先に設定している言語設定
	'const.sn.needClick2Play'	: typeof globalThis === 'undefined'
		? ()=> false
		: ()=> (new globalThis.AudioContext).state === 'suspended',
		// ブラウザ実行で、クリックされるまで音声再生が差し止められている状態か。なにかクリックされれば falseになる
	'const.sn.platform'			: CmnLib.platform,	// 環境による

	'const.sn.screenResolutionX': screen.availWidth,	// 画面の最大水平解像度
	'const.sn.screenResolutionY': screen.availHeight,	// 画面の最大垂直解像度
		// ここでは正確な値は分からない。保存していた前回終了時の位置にウインドウを動かしてから、そのディスプレイののサイズを取得するまでは。

	'const.sn.sound.codecs'		: '',	// ゲーム実行環境がどのコーデックをサポートしているか
	// 'const.sn.sound.【buf】.playing'		: 再生状態による,	// サウンドバッファが再生中か<br/>
	'const.sn.aIfStk.length'	: 1,	// IFスタックの深さ（[if]するたびに増）
	'const.sn.vctCallStk.length': 0,	// コールスタックの深さ（[call]するたびに増）
	'sn.auto.enabled'		: false,	// 自動読みすすみモードかどうか
	'sn.button.fontFamily'	: '\'Hiragino Sans\', \'Hiragino Kaku Gothic ProN\', \'游ゴシック Medium\', meiryo, sans-serif',	// 文字ボタンフォントを指定
	// 'sn.event.domdata.（任意）'		: ''[event]でフレーム内のHTML要素に登録したイベントで、そのイベント発生時、HTML要素のdata-（任意）属性で指定された値。使い道は開発者が自由に決めていい
	'sn.eventArg'		: '',	// [button]等のイベント発生時、そのボタンタグのarg属性で指定された値。使い道は開発者が自由に決めていい
	'sn.eventLabel'		: '',	// [button]等のイベント発生時、そのボタンタグのlabel属性で指定された値。使い道は開発者が自由に決めていい
	'sn.skip.all'		: false,	// false（初期値）なら既読のみをスキップ
	'sn.skip.enabled'	: false,	// 次の選択肢(/未読)まで進む が有効か
	'sn.tagL.enabled'	: true,		// 頁末まで一気に読み進むか(l無視)
}}


export type Scope = 'tmp'|'save'|'sys'|'mp';

export type T_ProcVal = ()=> T_VAL_BSN;

export type T_fncSetVal = (arg_name: string, val: T_VAL_BSN, autocast?: boolean)=> void;

export type T_Variable = {
	init(): Promise<void>;
	flush(): void;
	setDoRecProc(doRecProc: (doRec: boolean)=> void): void;

	getVal(arg_name: string, def?: number | string, touch?: boolean): T_VAL_DATA;
	setVal_Nochk(scope: Scope, nm: string, val: T_VAL_BSNU, autocast?: boolean): void;

	defTmp(name: string, fnc: T_ProcVal): void;
	cloneMp(): T_H_VAL_MP;
	setMp(mp: T_H_VAL_MP): void;
	setMark(place: number, mark: T_Mark): void;
	getMark(place: number): T_Mark | undefined;
	cloneSave(): T_H_SAVE_DATA;
	mark2save(mark: T_Mark): void;

	touchAreaKidoku(fn: string): Areas;
	getAreaKidoku(fn: string): Areas | undefined;
	saveKidoku(): void;
	updateData(data: T_Data4Vari): void;

	defValTrg(name: string, fnc: T_fncSetVal): void;

	doRecLog(): boolean;

	get tagCh_doWait(): boolean;
	get tagCh_doWait_Kidoku(): boolean;
	get tagCh_msecWait(): number;
	get tagCh_msecWait_Kidoku(): number;
}

export type T_H_VAL_MARK	= {[place: number]: T_Mark};
export type T_H_VAL_KIDOKU	= {[fn: string]: T_H_Areas};


export type T_Data4Vari = {
	sys		: T_H_SYS_DATA;
	mark	: T_H_VAL_MARK;
	kidoku	: T_H_VAL_KIDOKU;
}

export type T_Mark = {
	hSave	: T_H_SAVE_DATA;
	hPages	: T_HPage;
	aIfStk	: number[];
	json?	: TArg;
}


// =============== EventMng
export type T_Evt2Fnc	= (e: Event)=> void;
export type T_HEvt2Fnc	= {[name: string]: T_Evt2Fnc;};


// =============== FrameMng, LayerMng
export type T_GetFrm = {
	getFrmDisabled	: (id: string)=> boolean;
};


// =============== Pages
export type T_HPage = {[name: string]: T_Page};
export type T_Page = {
	cls		: string;
	fore	: T_RecordPlayBack_lay;
	back	: T_RecordPlayBack_lay;
}


// =============== RubySpliter
export type T_PutCh = (ch: string, ruby: string)=> void


// =============== Volume change event notification (GrpLayer)
export type T_NoticeChgVolume = (vol: number)=> void
