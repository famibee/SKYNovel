/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2022 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

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

	const nm = g.name;
	return [nm, token.slice(1 +nm.length, -1)];
}
export function	tagToken2Name(token: string): string {
	const e = REG_TAG.exec(token.slice(1));
	const g = e?.groups;
	if (! g) throw `タグ記述【${token}】異常です(タグ解析)`;

	return g.name;
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
	if (equa[1].charAt(0) === '&') throw '「&計算」書式では「&」指定が不要です';
	return {
		name: equa[0].replaceAll('＝', '==').replaceAll('≠', '!='),
		text: equa[1].replaceAll('＝', '==').replaceAll('≠', '!='),
		cast: ((cnt_equa === 3) ?equa[2].trim() :undefined)
	};
}


export class Grammar {
	constructor() {this.setEscape('');}

	#REG_TOKEN	: RegExp;
	setEscape(ce: string) {
		if (this.#hC2M && (ce in this.#hC2M)) throw '[エスケープ文字] char【'+ ce +'】が登録済みの括弧マクロまたは一文字マクロです';

		// 1078 match 16468 step (3.0ms) PCRE2 https://regex101.com/r/gVCcus/1
		/*
\\\S |
 \n+
| \t+
|	\[let_ml \s+ [^\]]+ ]
	.+? (?=\[endlet_ml [\]\s])
| \[ (?:
	(?=([^"'#;\]]+))\1
	| (["'\#]).*?\2
	| ;[^\n]* ) *? ]
| ;[^\n]*
| &[^&\n]+&
| &&?[^&;\n\t]+
| ^\*[^\s\[&;\\]+
| [^\n\t\[;\\]+
		*/

/*
	[^"'#;\]]++
	| (["'\#]).*?\1
			++ にしたいところだが、jsは未サポートらしい（2022/10/16）
*/
		this.#REG_TOKEN = new RegExp(
		(ce	?`\\${ce}\\S|` :'')+	// エスケープシーケンス
		'\\n+'+				// 改行
		'|\\t+'+			// タブ
		`|\\[let_ml\\s+[^\\]]+\\]`+
			`.+?`+		// [let_ml]〜[endlet_ml]間のテキスト
		`(?=\\[endlet_ml[\\]\\s])`+
		`|\\[(?:`+
			`(?=([^"'#;\\]]+))\\1|`+	// タグ
			`(["'#]).*?\\2` +
				// . は (?:\\${ ce??'\\' }.|[^\\1]) でなくてよさげ
		`|;[^\\n]*)*?]`+
		'|;[^\\n]*'+		// コメント
		'|&[^&\\n]+&'+			// ＆表示＆
		'|&&?[^&;\\n\\t]+'+		// ＆代入
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
		if (text.length !== 2) throw '[bracket2macro] textは括弧の前後を示す二文字を指定してください';
		if (! (name in hTag)) throw `[bracket2macro] 未定義のタグ又はマクロ[${name}]です`;

		this.#hC2M ??= {};
		const op = text.charAt(0);
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
		this.#regStrC2M4not += `${b}`;
		this.#REGC2M = new RegExp(
			`(${this.#regStrC2M}[^${this.#regStrC2M4not}]+)`, 'g');
	}


	resolveScript(txt: string): Script {
		const a = txt
		.replaceAll(/(\r\n|\r)/g, '\n')
		.match(this.#REG_TOKEN)
		?.flatMap(tkn=> {
			if (! this.testTagLetml(tkn)) return tkn;

			const r = /^([^\]]+?])(.*)$/s.exec(tkn);
			if (! r) return tkn;
			const [, a, b] = r;
			return [a, b];
		}) ?? [];

		const scr = {aToken :a, len :a.length, aLNum :[]};
		this.#replaceScr_C2M(scr);
		return scr;
	}
	testTagLetml(tkn: string): boolean {return /^\[let_ml\s/.test(tkn);};
	testTagEndLetml(tkn: string): boolean {return /^\[endlet_ml\s*]/.test(tkn);};

	analyzToken(token: string): RegExpExecArray | null {	// 4LspWs
		this.#REG_TOKEN.lastIndex = 0;	// /gなので必要
		return this.#REG_TOKEN.exec(token);
	}


	#hC2M	: {[char: string]: string};
	#REG_TOKEN_NOTXT	: RegExp;
	#replaceScr_C2M(scr: Script, start_idx = 0): void {
		if (! this.#hC2M) return;

		for (let i=scr.len- 1; i >= start_idx; --i) {
			const token = scr.aToken[i];
			if (this.testNoTxt(token.charAt(0))) continue;

			const lnum = scr.aLNum[i];
			const a = token.match(this.#REGC2M);
			if (! a) continue;
			let del = 1;
			for (let j=a.length -1; j>=0; --j) {
				let ch = a[j];
				const macro = this.#hC2M[ch.charAt(0)];
				if (macro) {
					ch = macro +((macro.slice(-1) === ']')
						? ''
						: (`'${ch.slice(1, -1)}']`));
					// 文字列は半角空白を意識して''で囲むが、いずれ変えたい場合がある？
				}
				scr.aToken.splice(i, del, ch);

				scr.aLNum.splice(i, del, lnum);
				del = 0;
			}
		}
		scr.len = scr.aToken.length;
	}
	testNoTxt(ch: string): boolean {return this.#REG_TOKEN_NOTXT.test(ch)};	//4tst

}
