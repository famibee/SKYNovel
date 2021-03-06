/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2021 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Script, HArg} from './CmnInterface';
import {RubySpliter} from './RubySpliter';

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
		cast: string | null;
} {	// テスト用にpublic
	const equa = token.replace(/==/g, '＝').replace(/!=/g, '≠').split('=');
		// != を弾けないので中途半端ではある
	const cnt_equa = equa.length;
	if (cnt_equa < 2 || cnt_equa > 3) throw '「&計算」書式では「=」指定が一つか二つ必要です';
	if (equa[1].charAt(0) === '&') throw '「&計算」書式では「&」指定が不要です';
	return {
		name: equa[0].replace(/＝/g, '==').replace(/≠/g, '!='),
		text: equa[1].replace(/＝/g, '==').replace(/≠/g, '!='),
		cast: ((cnt_equa === 3) ?equa[2].trim() :null)
	};
}

export class Grammar {
	constructor() {this.setEscape('');}

	REG_TOKEN	: RegExp;
	setEscape(ce: string) {
		if (this.hC2M && (ce in this.hC2M)) throw '[エスケープ文字] char【'+ ce +'】が登録済みの括弧マクロまたは一文字マクロです';

		// 1059 match 13935 step (8ms) https://regex101.com/r/ygXx16/6
		this.REG_TOKEN = new RegExp(
		(ce	?`\\${ce}\\S|`:'')+	// エスケープシーケンス
		'\\n+'+				// 改行
		'|\\t+'+			// タブ
		`|\\[let_ml\\s+[^\\]]+\\]`+
			`.+?`+		// [let_ml]〜[endlet_ml]間のテキスト
		`(?=\\[endlet_ml[\\]\\s])`+
		`|\\[(?:[^"'#;\\]]+|(["'#]).*?\\1|;[^\\n]*)*?]`+	// タグ
		'|;[^\\n]*'+		// コメント
		'|&[^&\\n]+&'+		// ＆表示＆
		'|&&?[^;\\n\\t&]+'+	// ＆代入
		'|^\\*\\w+'+		// ラベル
		`|[^\\n\\t\\[;${ce?`\\${ce}`:''}]+`,	// 本文
		'gs');
		RubySpliter.setEscape(ce);
		this.REG_CANTC2M = new RegExp(`[\\w\\s;[\\]*=&｜《》${ce ?`\\${ce}` :''}]`);
		this.REG_TOKEN_NOTXT = new RegExp(`[\\n\\t;\\[*&${ce ?`\\${ce}` :''}]`);
	}


	// 括弧マクロの定義
	bracket2macro(hArg: HArg, script: Script, idxToken: number) {
		const name = hArg.name;
		if (! name) throw '[bracket2macro] nameは必須です';
		const text = hArg.text;
		if (! text) throw '[bracket2macro] textは必須です';
		if (text.length !== 2) throw '[bracket2macro] textは括弧の前後を示す二文字を指定してください';

		this.hC2M ??= {};
		const op = text.charAt(0);
		const cl = text.charAt(1);
		if (op in this.hC2M) throw '[bracket2macro] text【'+ op +'】が登録済みの括弧マクロまたは一文字マクロです';
		if (cl in this.hC2M) throw '[bracket2macro] text【'+ cl +'】が登録済みの括弧マクロまたは一文字マクロです';
		this.REG_CANTC2M.lastIndex = 0;
		if (this.REG_CANTC2M.test(op)) throw '[bracket2macro] text【'+ op +'】は括弧マクロに使用できない文字です';
		this.REG_CANTC2M.lastIndex = 0;
		if (this.REG_CANTC2M.test(cl)) throw '[bracket2macro] text【'+ cl +'】は括弧マクロに使用できない文字です';

		this.hC2M[cl] = '0';	// チェック用ダミー
		this.hC2M[op] = `[${name} text=`;

		this.addC2M(`\\${op}[^\\${cl}]*\\${cl}`, `\\${op}\\${cl}`);

		this.replaceScr_C2M_And_let_ml(script, idxToken);
	}
	// 一文字マクロの定義
	char2macro(hArg: HArg, hTag: HArg, script: Script, idxToken: number) {
		const char = hArg.char;
		if (! char) throw '[char2macro] charは必須です';
		this.hC2M ??= {};
		if (char in this.hC2M) throw '[char2macro] char【'+ char +'】が登録済みの括弧マクロまたは一文字マクロです';
		this.REG_CANTC2M.lastIndex = 0;
		if (this.REG_CANTC2M.test(char)) throw '[char2macro] char【'+ char +'】は一文字マクロに使用できない文字です';

		const name = hArg.name;
		if (! name) throw '[char2macro] nameは必須です';
		if (! (name in hTag)) throw `[char2macro] 未定義のタグ又はマクロ[${name}]です`;

		this.hC2M[char] = `[${name}]`;

		this.addC2M(`\\${char}`, `\\${char}`);

		this.replaceScr_C2M_And_let_ml(script, idxToken);
	}
	private	REG_CANTC2M		: RegExp;
	private regC2M			= new RegExp('');
	private regStrC2M		= '';
	private regStrC2M4not	= '';
	addC2M(a: string, b: string) {
		this.regStrC2M += `${a}|`;
		this.regStrC2M4not += `${b}`;
		this.regC2M = new RegExp(
			`(${this.regStrC2M}[^${this.regStrC2M4not}]+)`, 'g');
	}

	private	hC2M	: {[char: string]: string};
	private	REG_TOKEN_NOTXT	: RegExp;
	replaceScr_C2M_And_let_ml = (scr: Script, start_idx = 0)=> {
		if (! this.hC2M) return;

		for (let i=scr.len- 1; i >= start_idx; --i) {
			const token = scr.aToken[i];
			this.REG_TOKEN_NOTXT.lastIndex = 0;
			if (this.REG_TOKEN_NOTXT.test(token.charAt(0))) continue;

			const lnum = scr.aLNum[i];
			const a = token.match(this.regC2M);
			if (! a) continue;
			let del = 1;
			for (let j=a.length -1; j>=0; --j) {
				let ch = a[j];
				const macro = this.hC2M[ch.charAt(0)];
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

}
