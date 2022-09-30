/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2022 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

export interface PRM {
	val?	: string;
	def?	: string;
};
export interface HPRM {
	[name: string]: PRM,
};

export class AnalyzeTagArg {
	// 72 match 2249 step(~2ms) PCRE2 https://regex101.com/r/yFUkWD/1
	readonly	#REG_TAGARG	= /;[^\n]*|(?<key>\w+)(?:\s|;[^\n]*\n)*=(?:\s|;[^\n]*\n)*(?:(?<val>[^\s"'#|;]+)|(["'#])(?<val2>.*?)\3)(?:\|(?:(?<def>[^\s"'#;]+)|(["'#])(?<def2>.*?)\6))?|(?<literal>[^\s;]+)/g;
	// 【属性 = 値 | 省略値】の分析
	go(args: string) {
		this.#hPrm = {};
		this.#isKomeParam = false;
		if (! args) return;	// undefined も

		let e: RegExpExecArray | null = null;
		// 全ループリセットかかるので不要	.lastIndex = 0;	// /gなので必要
		while (e = this.#REG_TAGARG.exec(args)) {
			const g = e?.groups;
			if (! g) continue;

			const {key, val, val2, def, def2, literal} = g;
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

	#hPrm: HPRM	= {};
	get hPrm() {return this.#hPrm}

	#isKomeParam	= false;
	get isKomeParam() {return this.#isKomeParam}

}
