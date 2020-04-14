/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import m_xregexp = require('xregexp');

export class AnalyzeTagArg {
	private	readonly	REG_TAGARG		= m_xregexp(
`(?<key>\\w+) \\s* = \\s*
(?: (["'#]) (?<val>.*?) \\2
| (?<val2> [^\\s|]+)
	(?: \\| (?: (["'#]) (?<def>.*?) \\5
	| (?<def2> \\S+) ) )? )
| (?<literal>\\S+)`, 'gx');
	// 【属性 = 値 | 省略値】の分析
	go(args: string): boolean {
		this.$hPrm = {};
		this.$isKomeParam = false;
		if (args == null) return true;	// undefined も

		let elm: any = null, pos = 0;
		while (elm = m_xregexp.exec(args, this.REG_TAGARG, pos)) {
			pos = elm.index + elm[0].length;
			this.$literal = elm.literal;
			if (this.$literal == undefined) {
				this.$hPrm[elm.key] = {
					val: elm.val ?? elm.val2,
					def: elm.def ?? elm.def2
				};
				continue;
			}
			if (this.$literal != '*') return false;

			this.$isKomeParam = true;
		}

		return true;
	}

	// 上とは微妙に違って空白を許す
	private	readonly	REG_TAGARG_VAL	= m_xregexp(
`\\s*
(?: (["'#]) (?<val>.*?) \\1 | (?<val2> [^|]+) )
(?: \\|
	(?: (["'#]) (?<def>.*?) \\4 | (?<def2> .+) )
)?`, 'x');
	// 【値 | 省略値】の分析
	goVal(args: string): void {
		const elm: any = m_xregexp.exec(args, this.REG_TAGARG_VAL)
		this.$hPrm = {
			val: elm.val ?? elm.val2,
			def: elm.def ?? elm.def2
		};
	}

	private	$hPrm: any	= {};
	get hPrm() {return this.$hPrm}

	private	$isKomeParam	= false;
	get isKomeParam() {return this.$isKomeParam}

	private	$literal		= '';
	get literal() {return this.$literal}

}
