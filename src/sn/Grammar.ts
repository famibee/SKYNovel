/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {AnalyzeTagArg} from './AnalyzeTagArg';
import {getFn} from './CmnLib';
import {type IConfig, SEARCH_PATH_ARG_EXT} from './ConfigBase';


export type HArg = {
	':タグ名'?	: string;
	canskip?	: boolean;

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
	kinsoku_bura?	: string;
	bura?	: boolean;
	break_fixed?		: boolean;
	break_fixed_left?	: number;
	break_fixed_top?	: number;

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
	clear_local_event?	: boolean;

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

	arg?	: HArg;
	fnc?	: ()=> void;

	filter?	: string;
	matrix?	: string;
	clear_filter?	: boolean;
	enable_filter?	: boolean;

	ease?	: string;

	centering?	:boolean;
	x?		: number | string;
	y?		: number | string;

	id?			: string;
	src?		: string;
	var_name?	: string;
	set_fnc?	: string;
	break_fnc?	: string;

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
	stop?	: boolean;

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
	':redraw'?	: boolean;
	design_unit?: boolean;	// デザインモードでこのマクロへの引数変更とするか（内部をサーチさせない）

//	stepin?		: boolean;		// 拡張機能のみ使用：false指定でステップインしない
//	nowarn_unused?	: boolean;	// 拡張機能のみ使用：未使用警告を出さない
}
export type ITag = (hArg: HArg) => boolean;
export type IHTag = {
// 変数操作
	clearsysvar			: ITag;	// システム変数の全消去
	clearvar			: ITag;	// ゲーム変数の全消去
	let_abs				: ITag;	// 絶対値
	let_char_at			: ITag;	// 文字列から一字取りだし
	let_index_of		: ITag;	// 文字列で検索
	let_length			: ITag;	// 文字列の長さ
	let_ml				: ITag;	// インラインテキスト代入
	let_replace			: ITag;	// 正規表現で置換
	let_round			: ITag;	// 四捨五入
	let_search			: ITag;	// 正規表現で検索
	let_substr			: ITag;	// 文字列から抜きだし
	let					: ITag;	// 変数代入・演算

// レイヤ共通
	add_lay				: ITag;	// レイヤを追加する
	clear_lay			: ITag;	// レイヤ設定の消去
	finish_trans		: ITag;	// トランス強制終了
	lay					: ITag;	// レイヤ設定
	trans				: ITag;	// ページ裏表を交換
	wt					: ITag;	// トランス終了待ち
	add_filter			: ITag;	// フィルター追加
	clear_filter		: ITag;	// フィルター全削除
	enable_filter		: ITag;	// フィルター個別切替

// トゥイーンアニメ
	pause_tsy			: ITag;	// 一時停止
	resume_tsy			: ITag;	// 一時停止再開
	stop_tsy			: ITag;	// トゥイーン中断
	tsy					: ITag;	// トゥイーン開始
	wait_tsy			: ITag;	// トゥイーン終了待ち

// 文字・文字レイヤ
	autowc				: ITag;	// 文字ごとのウェイト
	ch					: ITag;	// 文字を追加する
	ch_in_style			: ITag;	// 文字出現演出定義
	ch_out_style		: ITag;	// 文字消去演出定義
	clear_text			: ITag;	// 文字消去
	current				: ITag;	// デフォルト文字レイヤ設定
	endlet_ml			: ITag;	// インラインテキスト代入の終端
	endlink				: ITag;	// ハイパーリンクの終了
	er					: ITag;	// ページ両面の文字消去
	graph				: ITag;	// インライン画像表示
	link				: ITag;	// ハイパーリンク
	r					: ITag;	// 改行
	rec_ch				: ITag;	// 履歴書き込み
	rec_r				: ITag;	// 履歴改行
	reset_rec			: ITag;	// 履歴リセット
	ruby2				: ITag;	// 文字列と複数ルビの追加
	set_focus			: ITag;	// フォーカス移動
	span				: ITag;	// インラインスタイル設定
	tcy					: ITag;	// 縦中横を表示する

// 画像・画像レイヤ
	add_face			: ITag;	// 差分名称の定義
	wv					: ITag;	// 動画再生終了待ち

// HTMLフレーム
	add_frame			: ITag;	// フレーム追加
	frame				: ITag;	// フレームに設定
	let_frame			: ITag;	// フレーム変数を取得
	set_frame			: ITag;	// フレーム変数に設定
	tsy_frame			: ITag;	// フレームをトゥイーン開始

// イベント
	clear_event			: ITag;	// イベントを全消去
	enable_event		: ITag;	// イベント有無の切替
	event				: ITag;	// イベントを予約
	l					: ITag;	// 行末クリック待ち
	p					: ITag;	// 改ページクリック待ち
	s					: ITag;	// 停止する
	set_cancel_skip		: ITag;	// スキップ中断予約
	wait				: ITag;	// ウェイトを入れる
	waitclick			: ITag;	// クリックを待つ

// ＢＧＭ・効果音
	fadebgm				: ITag;	// BGMのフェード
	fadeoutbgm			: ITag;	// BGMのフェードアウト
	fadeoutse			: ITag;	// 効果音のフェードアウト
	fadese				: ITag;	// 効果音のフェード
	playbgm				: ITag;	// BGM の演奏
	playse				: ITag;	// 効果音の再生
	stop_allse			: ITag;	// 全効果音再生の停止
	stopbgm				: ITag;	// BGM 演奏の停止
	stopfadese			: ITag;	// 音声フェードの停止
	stopse				: ITag;	// 効果音再生の停止
	volume				: ITag;	// BGMや効果音の音量を指定
	wb					: ITag;	// BGM フェードの終了待ち
	wf					: ITag;	// 効果音フェードの終了待ち
	wl					: ITag;	// BGM 再生の終了待ち
	ws					: ITag;	// 効果音再生の終了待ち
	xchgbuf				: ITag;		// サウンドバッファの交換

// 条件分岐
	else				: ITag;	// その他ifブロック開始
	elsif				: ITag;	// 別条件のifブロック開始
	endif				: ITag;	// ifブロックの終端
	if					: ITag;	// ifブロックの開始

// ラベル・ジャンプ
	button				: ITag;	// ボタンを表示
	call				: ITag;	// サブルーチンコール
	jump				: ITag;	// シナリオジャンプ
	page				: ITag;	// ページ移動
	pop_stack			: ITag;	// コールスタック破棄
	return				: ITag;	// サブルーチンから戻る

// マクロ
	bracket2macro		: ITag;	// 括弧マクロの定義
	char2macro			: ITag;	// 一文字マクロの定義
	endmacro			: ITag;	// マクロ定義の終了
	macro				: ITag;	// マクロ定義の開始

// しおり
	copybookmark		: ITag;	// しおりの複写
	erasebookmark		: ITag;	// しおりの消去
	load				: ITag;	// しおりの読込
	record_place		: ITag;	// セーブポイント指定
	reload_script		: ITag;	// スクリプト再読込
	save				: ITag;	// しおりの保存

// 画面揺らし
	quake				: ITag;	// 画面を揺らす
	stop_quake			: ITag;	// 画面揺らし中断
	wq					: ITag;	// 画面揺らし終了待ち

// システム
	close				: ITag;	// アプリの終了
	export				: ITag;	// プレイデータをエクスポート
	import				: ITag;	// プレイデータをインポート
	loadplugin			: ITag;	// プラグインの読み込み
	navigate_to			: ITag;	// ＵＲＬを開く
	snapshot			: ITag;	// スナップショット
	title				: ITag;	// タイトル指定
	toggle_full_screen	: ITag;	// 全画面状態切替
	update_check		: ITag;	// 更新チェック機能
	window				: ITag;	// アプリウインドウ設定

// デバッグ・その他
	dump_lay			: ITag;	// レイヤのダンプ
	dump_script			: ITag;	// 外部へスクリプトを表示
	dump_stack			: ITag;	// スタックのダンプ
	dump_val			: ITag;	// 変数のダンプ
	log					: ITag;	// ログ出力
	trace				: ITag;	// デバッグ表示へ出力
}


export type Script = {
	aToken	: string[];		// トークン群
	len		: number;		// トークン数
	aLNum	: number[];		// トークンの行番号
};


export const	REG_TAG	= /(?<name>[^\s;\]]+)/;	// test用にexport
export function	tagToken2Name_Args(token: string): [name: string, args: string] {
	const e = REG_TAG.exec(token.slice(1, -1));
	const g = e?.groups;
	if (! g) throw `タグ記述【${token}】異常です(タグ解析)`;

	const nm = g.name!;
	return [nm, token.slice(1 +nm.length, -1)];
}
export function	tagToken2Name(token: string): string {
	const e = REG_TAG.exec(token.slice(1));
	const g = e?.groups;
	if (! g) throw `タグ記述【${token}】異常です(タグ解析)`;

	return g.name!;
}

export function	splitAmpersand(token: string): {
		name: string;
		text: string;
		cast: string | undefined;
} {	// テスト用にpublic
	const equa = token.replaceAll('==', '＝').replaceAll('!=', '≠').split('=');
		// != を弾けないので中途半端ではある
	const cnt_equa = equa.length;
	if (cnt_equa < 2 || cnt_equa > 3) throw '「&計算」書式では「=」指定が一つか二つ必要です';

	const [e0, e1, e2] = equa;
	if (e1!.startsWith('&')) throw '「&計算」書式では「&」指定が不要です';
	return {
		name: e0!.replaceAll('＝', '==').replaceAll('≠', '!='),
		text: e1!.replaceAll('＝', '==').replaceAll('≠', '!='),
		cast: cnt_equa === 3 ?e2!.trim() :undefined
	};
}


export class Grammar {
	constructor(private readonly cfg: IConfig) {this.setEscape('')}

	#REG_TOKEN	: RegExp;
	setEscape(ce: string) {
		if (this.#hC2M && ce in this.#hC2M) throw '[エスケープ文字] char【'+ ce +'】が登録済みの括弧マクロまたは一文字マクロです';

		// 1083 matches (14577 step, 9.9ms) https://regex101.com/r/dP0tAY/1
		/*
\\\S |
 \n+
| \t+
|	\[let_ml \s+ [^\]]+ ]
	.+? (?=\[endlet_ml [\]\s])
| \[ (?: [^"'#;\]]+
	| (["'#]).*?\1
	| ;[^\n]* ) *? ]
| ;[^\n]*
| &[^&\n]+&
| &&?(?: [^"'#;\n&]+ | (["'#]).*?\2 )+
| ^\*[^\s\[&;\\]+
| [^\n\t\[;\\]+
		*/
/*
	[^"'#;\]]++
	| (["'\#]).*?\1
			++ にしたいところだが、jsは未サポートらしい（2022/10/16）
*/
		// (new RegExp("~")) の場合は、バックスラッシュは２つ必要
			// https://qiita.com/ue5963/items/bd8e32ac9e6b12aa7fab
		this.#REG_TOKEN = new RegExp(
		(ce	?`\\${ce}\\S|` :'')+	// エスケープシーケンス
		'\\n+'+				// 改行
		'|\\t+'+			// タブ文字
		'|\\[let_ml\\s+[^\\]]+\\]'+
			'.+?'+			// [let_ml]〜[endlet_ml]間のテキスト
		'(?=\\[endlet_ml[\\]\\s])'+
		'|\\[(?:'+
			'[^"\'#;\\]]+|'+	// タグ
			'(["\'#]).*?\\1' +
				// . は (?:\\${ ce??'\\' }.|[^\\1]) でなくてよさげ
		'|;[^\\n]*)*?]'+
		'|;[^\\n]*'+		// コメント
		'|&[^&\\n]+&'+		// ＆表示＆
		'|&&?(?:[^"\'#;\\n&]+|(["\'#]).*?\\2)+'+	// ＆代入
		'|^\\*[^\\s\\[&;\\\\]+'+	// ラベル
		`|[^\\n\\t\\[;${ce ?`\\${ce}` :''}]+`,		// 本文
		'gs');
		this.#REG_CANTC2M = new RegExp(`[\\w\\s;[\\]*=&｜《》${ce ?`\\${ce}` :''}]`);
		this.#REG_TOKEN_NOTXT = new RegExp(`[\\n\\t;\\[*&${ce ?`\\${ce}` :''}]`);
	}


	// 括弧マクロの定義
	bracket2macro(hArg: HArg, hTag: IHTag, scr: Script, start_idx: number) {
		const {name, text} = hArg;
		if (! name) throw '[bracket2macro] nameは必須です';
		if (! text) throw '[bracket2macro] textは必須です';
		const op = text.at(0);
		if (! op) throw '[bracket2macro] textは必須です';
		if (text.length !== 2) throw '[bracket2macro] textは括弧の前後を示す二文字を指定してください';
		if (! (name in hTag)) throw `[bracket2macro] 未定義のタグ又はマクロ[${name}]です`;

		this.#hC2M ??= {};
		const cl = text.charAt(1);
		if (op in this.#hC2M) throw '[bracket2macro] text【'+ op +'】が登録済みの括弧マクロまたは一文字マクロです';
		if (cl in this.#hC2M) throw '[bracket2macro] text【'+ cl +'】が登録済みの括弧マクロまたは一文字マクロです';
		if (this.#REG_CANTC2M.test(op)) throw '[bracket2macro] text【'+ op +'】は括弧マクロに使用できない文字です';
		if (this.#REG_CANTC2M.test(cl)) throw '[bracket2macro] text【'+ cl +'】は括弧マクロに使用できない文字です';

		this.#hC2M[cl] = '0';	// チェック用ダミー
		this.#hC2M[op] = `[${name} text=`;

		this.addC2M(`\\${op}[^\\${cl}]*\\${cl}`, `\\${op}\\${cl}`);

		this.#replaceScr_C2M(scr, start_idx);
	}
	// 一文字マクロの定義
	char2macro(hArg: HArg, hTag: IHTag, scr: Script, start_idx: number) {
		const {char, name} = hArg;
		if (! char) throw '[char2macro] charは必須です';
		this.#hC2M ??= {};
		if (char in this.#hC2M) throw '[char2macro] char【'+ char +'】が登録済みの括弧マクロまたは一文字マクロです';
		if (this.#REG_CANTC2M.test(char)) throw '[char2macro] char【'+ char +'】は一文字マクロに使用できない文字です';

		if (! name) throw '[char2macro] nameは必須です';
		if (! (name in hTag)) throw `[char2macro] 未定義のタグ又はマクロ[${name}]です`;

		this.#hC2M[char] = `[${name}]`;

		this.addC2M(`\\${char}`, `\\${char}`);

		this.#replaceScr_C2M(scr, start_idx);
	}
	#REG_CANTC2M	: RegExp;
	#REGC2M			= new RegExp('');
	#regStrC2M		= '';
	#regStrC2M4not	= '';
	addC2M(a: string, b: string) {
		this.#regStrC2M += `${a}|`;
		this.#regStrC2M4not += b;
		this.#REGC2M = new RegExp(
			`(${this.#regStrC2M}[^${this.#regStrC2M4not}]+)`, 'g');
	}


	resolveScript(txt: string): Script {
		const a: string[] = txt
		.replaceAll(/\r\n?/g, '\n')
		.match(this.#REG_TOKEN)
		?.flatMap(tkn=> {
			if (! this.testTagLetml(tkn)) return tkn;

			const r = /^([^\]]+?])(.*)$/s.exec(tkn);
			if (! r) return tkn;
			const [, a, b] = r;
			return [a!, b!];
		}) ?? [];

		const scr = {aToken: a, len: a.length, aLNum: []};
		this.#replaceScr_C2M(scr);

		this.#replaceScript_Wildcard(scr);

		return scr;
	}


	readonly #REG_WILDCARD	= /^\[(call|loadplugin)\s/;
	readonly #REG_WILDCARD2	= /\bfn\s*=\s*[^\s\]]+/;
	#replaceScript_Wildcard(scr: Script) {
		for (let i=scr.len -1; i>=0; --i) {
			const token = scr.aToken[i]!;
			if (! this.#REG_WILDCARD.test(token)) continue;

			const [tag_name, args] = tagToken2Name_Args(token);
			this.#alzTagArg.parse(args);

			const p_fn = this.#alzTagArg.hPrm.fn;
			if (! p_fn) continue;
			const {val: fn} = p_fn;
			if (! fn.endsWith('*')) continue;

			scr.aToken.splice(i, 1, '\t', '; '+ token);
			scr.aLNum.splice(i, 1, NaN, NaN);

			const ext = tag_name === 'loadplugin'
				? SEARCH_PATH_ARG_EXT.CSS
				: SEARCH_PATH_ARG_EXT.SN;
			const a = this.cfg.matchPath('^'+ fn.slice(0, -1) +'.*', ext);
			for (const v of a) {
				const nt = token.replace(
					this.#REG_WILDCARD2,
					'fn='+ decodeURIComponent(getFn(v[ext]!))
				);
				//console.log('\t='+ nt +'=');
				scr.aToken.splice(i, 0, nt);
				scr.aLNum.splice(i, 0, NaN);
			}
		}
		scr.len = scr.aToken.length;
	}
		readonly	#alzTagArg	= new AnalyzeTagArg;


	testTagLetml(tkn: string): boolean {return /^\[let_ml\s/.test(tkn)}
	testTagEndLetml(tkn: string): boolean {return /^\[endlet_ml\s*]/.test(tkn)}


	#hC2M	: {[char: string]: string} | undefined = undefined;
	#REG_TOKEN_NOTXT	: RegExp;
	#replaceScr_C2M(scr: Script, start_idx = 0): void {
		if (! this.#hC2M) return;

		for (let i=scr.len- 1; i >= start_idx; --i) {
			const token = scr.aToken[i]!;
			if (this.testNoTxt(token.at(0) ?? '\n')) continue;
				// 省略時は #REG_TOKEN_NOTXT に引っかかる \n に

			const lnum = scr.aLNum[i]!;
			const a = token.match(this.#REGC2M);
			if (! a) continue;
			let del = 1;
			for (let j=a.length -1; j>=0; --j) {
				let ch = a[j]!;
				const macro = this.#hC2M[ch.at(0) ?? ' '];
					// 省略時は #REG_CANTC2M に引っかかる ' ' に
				if (macro) {
					ch = macro +(macro.endsWith(']')
						? ''
						: `'${ch.slice(1, -1)}']`);
					// 文字列は半角空白を意識して''で囲むが、いずれ変えたい場合がある？
				}
				scr.aToken.splice(i, del, ch);

				scr.aLNum.splice(i, del, lnum);
				del = 0;
			}
		}
		scr.len = scr.aToken.length;
	}
	testNoTxt(ch: string): boolean {return this.#REG_TOKEN_NOTXT.test(ch)}	//4tst

}
