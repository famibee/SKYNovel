/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import m_xregexp = require('xregexp');

export class AnalyzeTagArg {
	private	readonly	REG_TAGARG		= m_xregexp(
		// 71 match 2662 step(~1ms) https://regex101.com/r/yyenjO/2
`	;.*\\n
|	(?<key>\\w+)
	(?: \\s+ | ;[^\\n]*\\n)*
	=
	(?: \\s+ | ;.*\\n)*
	(?:	(?<val> [^\\s"'#|;]+)
	|	(["'#]) (?<val2>.*?) \\3 )
	(?: \\|
		(?: (?<def> [^\\s"'#;]+)
	|	(["'#]) (?<def2>.*?) \\6 ) )?
|	(?<literal>[^\\s;]+)`, 'gx');
	// 【属性 = 値 | 省略値】の分析
	go(args: string) {
		this.$hPrm = {};
		this.$isKomeParam = false;
		if (args == null) return;	// undefined も

		let elm: any = null, pos = 0;
		while (elm = m_xregexp.exec(args, this.REG_TAGARG, pos)) {
			pos = elm.index + elm[0].length;
			if (elm.key) {
				this.$hPrm[elm.key] = {
					val: elm.val ?? elm.val2,
					def: elm.def ?? elm.def2
				};
				continue;
			}
			if (elm.literal) {
				if (elm.literal == '*') this.$isKomeParam = true;
				else this.$hPrm[elm.literal] = {val: '1'};
			}
		}
	}

	// 上とは微妙に違って空白を許す
	private	readonly	REG_TAGARG_VAL	= m_xregexp(
`\\s*
(?: (["'#]) (?<val>.*?) \\1 | (?<val2> [^|]+) )
(?: \\|
	(?: (["'#]) (?<def>.*?) \\4 | (?<def2> .+) )
)?`, 'x');
	// 【値 | 省略値】の分析
	goVal(args: string) {
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

}
