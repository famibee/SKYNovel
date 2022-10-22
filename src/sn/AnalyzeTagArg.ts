/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2022 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

export interface PRM {
	val		: string;
	def?	: string;
};
export interface HPRM {
	[key: string]: PRM,
};

export interface PRM_RANGE {
	k_ln	: number;
	k_ch	: number;
	v_ln	: number;
	v_ch	: number;
	v_len	: number;
};

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
			const {key, val, val2, def, def2, literal} = groups!;
			if (key) this.#hPrm[key] = {
				val: val ?? val2,
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

		const args = token.slice(1+lenNm, -1);
		for (const {groups, index, 0: z} of args.matchAll(this.#REG_TAGARG)) {
			if (index === undefined) continue;
			const {key, val, val2, literal} = groups!;
			if (literal) {
				if (literal.slice(-1) === '=') {
					const {ln: k_ln, ch: k_ch} = this.#idx2LnCol(lenNm, ln, ch, args, index);
					hRng[literal.slice(0, -1)] = {k_ln, k_ch, v_ln: ln, v_ch: 1+lenNm +ch +literal.length +1, v_len: 0};
				}
				continue;
			}
			if (! key) continue;

			const {ln: k_ln, ch: k_ch} = this.#idx2LnCol(lenNm, ln, ch, args, index);
			const {ln: v_ln, ch: v_ch} = this.#idx2LnCol(lenNm, ln, ch, args, index +z.lastIndexOf(val ?? val2) -(val ?0 :1));
			hRng[key] = {k_ln, k_ch, v_ln, v_ch, v_len: val ?val.length :val2.length +2};
		}

		return hRng;
	}
		#idx2LnCol(lenNm: number, ln: number, ch: number, args: string, idx: number): {ln: number; ch: number;} {
			const sBefore = args.slice(0, idx);
			const a = sBefore.split('\n');
			const len = a.length;
			return {
				ln	: ln +len -1,
				ch	: len < 2 ?ch +1+lenNm +idx :a.at(-1)!.length,
			};
		}

	#hPrm: HPRM	= {};
	get hPrm() {return this.#hPrm}

	#isKomeParam	= false;
	get isKomeParam() {return this.#isKomeParam}

}
