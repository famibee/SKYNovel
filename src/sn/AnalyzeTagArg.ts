/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

export type PRM = {
	val		: string;
	def?	: string;
}
export type HPRM = {
	[key: string]: PRM,
}

export type PRM_RANGE = {
	k_ln	: number;
	k_ch	: number;
	v_ln	: number;
	v_ch	: number;
	v_len	: number;
}

export function idx2LnCol(sSn: string, idx: number, lenNm = 0, ln = 0, ch = 0): {ln: number; ch: number;} {
	const sBefore = sSn.slice(0, idx);
	const a = sBefore.split('\n');
	const len = a.length;
	return {
		ln	: ln +len -1,
		ch	: len < 2 ?ch +1+lenNm +idx :a.at(-1)?.length ?? 0,
	};
}


export class AnalyzeTagArg {
	// 87 match 2725 step(0.5ms) PCRE2 https://regex101.com/r/aeN57J/1
	/*
;[^\n]*
|	(?<key>[^\s="'#|;]+)
	(?: \s | ;[^\n]*\n)*
	=
	(?: \s | ;[^\n]*\n)*
	(?:	(?<val> [^\s"'#|;]+)
	|	(["'#]) (?<val2>.*?) \3 )
	(?: \|
		(?: (?<def> [^\s"'#;]+)
	|	(["'#]) (?<def2>.*?) \6 ) )?
|	(?<literal>[^\s;]+)
	*/
	readonly	#REG_TAGARG	= /;[^\n]*|(?<key>[^\s="'#|;]+)(?:\s|;[^\n]*\n)*=(?:\s|;[^\n]*\n)*(?:(?<val>[^\s"'#|;]+)|(["'#])(?<val2>.*?)\3)(?:\|(?:(?<def>[^\s"'#;]+)|(["'#])(?<def2>.*?)\6))?|(?<literal>[^\s;]+)/g;

	// 【属性 = 値 | 省略値】の分析
	parse(args: string): void {
		this.#hPrm = {};
		this.#isKomeParam = false;
		for (const {groups} of args.matchAll(this.#REG_TAGARG)) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const {key, val, val2, def, def2, literal} = groups!;
			if (key) this.#hPrm[key] = {
				val: val ?? val2 ?? '',
				def: def ?? def2
			};
			else if (literal) {
				if (literal === '*') this.#isKomeParam = true;
				else this.#hPrm[literal] = {val: '1'};
			}
		}
	}

	// 属性と値の位置をまとめて返す
	parseinDetail(token: string, lenNm: number, ln: number, ch: number): {[key: string]: PRM_RANGE} {
		const hRng: {[key: string]: PRM_RANGE} = {};

		const sSn = token.slice(1+lenNm, -1);
		for (const {groups, index, 0: z} of sSn.matchAll(this.#REG_TAGARG)) {
			if (! index) continue;
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const {key, val, val2='', literal} = groups!;
			if (literal) {
				if (literal.endsWith('=')) {
					const lenVnm = literal.length -1;
					const {ch: k_ch} = idx2LnCol(sSn, index +lenVnm, lenNm, ln, ch);
					hRng[literal.slice(0, -1)] = {
						k_ln: ln,
						k_ch: k_ch -lenVnm,
						v_ln: ln,
						v_ch: k_ch +1,
					//	v_ch: ch +1+lenNm +literal.length +1,
						v_len: 0,
					};
				}
				continue;
			}
			if (! key) continue;

			const {ln: k_ln, ch: k_ch} = idx2LnCol(sSn, index, lenNm, ln, ch);
			const {ln: v_ln, ch: v_ch} = idx2LnCol(sSn, index +z.lastIndexOf(val ?? val2) -(val ?0 :1), lenNm, ln, ch);
			hRng[key] = {k_ln, k_ch, v_ln, v_ch, v_len: val ?val.length :val2.length +2};
		}

		return hRng;
	}

	#hPrm: HPRM	= {};
	get hPrm() {return this.#hPrm}

	#isKomeParam	= false;
	get isKomeParam() {return this.#isKomeParam}

}
