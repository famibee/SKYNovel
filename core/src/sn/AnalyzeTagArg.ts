/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2021 Famibee (famibee.blog38.fc2.com)

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
	private	readonly	REG_TAGARG	= /;[^\n]*|(?<key>\w+)(?:\s|;[^\n]*\n)*=(?:\s|;[^\n]*\n)*(?:(?<val>[^\s"'#|;]+)|(["'#])(?<val2>.*?)\3)(?:\|(?:(?<def>[^\s"'#;]+)|(["'#])(?<def2>.*?)\6))?|(?<literal>[^\s;]+)/g;
	// 【属性 = 値 | 省略値】の分析
	go(args: string) {
		this.$hPrm = {};
		this.$isKomeParam = false;
		if (! args) return;	// undefined も

		let e: RegExpExecArray | null = null;
		// 全ループリセットかかるので不要	.lastIndex = 0;	// /gなので必要
		while (e = this.REG_TAGARG.exec(args)) {
			const g = e?.groups;
			if (! g) continue;

			if (g.key) this.$hPrm[g.key] = {
				val: g.val ?? g.val2,
				def: g.def ?? g.def2
			};
			else if (g.literal) {
				if (g.literal === '*') this.$isKomeParam = true;
				else this.$hPrm[g.literal] = {val: '1'};
			}
		}
	}

	private	$hPrm: HPRM	= {};
	get hPrm() {return this.$hPrm}

	private	$isKomeParam	= false;
	get isKomeParam() {return this.$isKomeParam}

}
