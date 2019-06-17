/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import P = require('parsimmon');
import m_xregexp = require('xregexp');
import {trim, int} from './CmnLib';
import {IVariable} from './CmnInterface';

export interface IParse { (s: string): object; }

interface IFncCalc { (a: any[]): any;}
interface IHFncCalc { [key: string]: IFncCalc; }

export class PropParser {
	private parser: any = null;

	constructor(private readonly val: IVariable) {
		function ope(a: (string | RegExp)[]) {
			const ps: any = [];
			for (const v of a) ps.push(
				((v instanceof RegExp)
					? P.regex(v as RegExp)
					: P.string(v as string))
				.trim(P.optWhitespace)
			);
			return P.alt.apply(null, ps);
		}

		function PREFIX(operatorsParser: any, nextParser: any) {
			const parser: any = P.lazy(()=> {
				return P.seq(operatorsParser, parser).or(nextParser);
			});
			return parser;
		}

		// right. (e.g. 1^2^3 is 1^(2^3) not (1^2)^3)
		function BINARY_RIGHT(operatorsParser: any, nextParser: any) {
			let parser = P.lazy(
				()=> nextParser.chain(
					(next: any)=> P.seq(
						operatorsParser,
						P.of(next),
						parser
					).or(P.of(next))
				)
			);
			return parser;
		}

		// left. (e.g. 1-2-3 is (1-2)-3 not 1-(2-3))
		function BINARY_LEFT(operatorsParser: any, nextParser: any) {
			return P.seqMap(
				nextParser,
				P.seq(operatorsParser, nextParser).many(),
				(first, rest)=> {
					return rest.reduce((acc, ch)=> {
						return [ch[0], acc, ch[1]];
					}, first);
				}
			);
		}

		const Num = P.alt(
			P.alt(
				P.regex(/-?(0|[1-9][0-9]*)\.[0-9]+/),
				P.regex(/0x[0-9a-fA-F]+/)
			).map(Number),
			P.alt(
				P.regex(/-?(0|[1-9][0-9]*)/)
			).map(n=> int(n))
		)
		.map(str=> ['!num!', str])
		.desc('number');

		const NullLiteral = P.string('null')
		.map(()=> ['!str!', null]);

		const BooleanLiteral = P.regex(/(true|false)/)
		.map(b=> ['!bool!', b == 'true'])
		.desc('boolean');

		const StringLiteral = P
		.regex(/("|'|#).*?\1/)
		.map(b=> ['!str!', b.slice(1, -1)])
		.desc('string');

		const REG_BRACKETS = /\[[^\]]+\]/g;
		const VarLiteral = P
		//.regex(/((tmp|sys|save|mp):)?[^\s!-\/:-@[-^`{-~]+(\.[^\s!-\/:-@[-^`{-~]+|\[[^\]]+\])*(@str)?/)
		.regex(/\-?((tmp|sys|save|mp):)?[^\s!-\/:-@[-^`{-~]+(\.[^\s!-\/:-@[-^`{-~]+|\[[^\]]+\])*(@str)?/)
		.map(b=> {
			//console.log('   👺 VarLiteral:0 b:%O:', b);
			const s = String(b).replace(REG_BRACKETS, v=>
				'.'+ this.parse(v.slice(1, -1))
			);
			if (s.charAt(0) == '-') {	// 変数頭に「-」
				const val = this.val.getVal(s.slice(1));
				if (val == null || String(val) == 'null') throw Error('(PropParser)数値以外に-符号がついています');
				return ['!num!', -Number(val)];
			}
			const val = this.val.getVal(s);
			//console.log('      👹 s:%O: val:%O:', s, val);
			if (val == null) return ['!str!', val];		// undefined も
			if (typeof val == 'boolean') return ['!bool!', val];

			return (Object.prototype.toString.call(val) == '[object String]')
				? ['!str!', String(val)]
				: ['!num!', Number(val)];
		})
		.desc('string');

		const Basic = P.lazy(()=> P
			.string('(').then(this.parser).skip(P.string(')'))
			.or(Num)
			.or(NullLiteral)
			.or(BooleanLiteral)
			.or(StringLiteral)
			.or(VarLiteral)
		);

		const table = [
			// 優先順位：19（メンバーへのアクセス、計算値によるメンバーへのアクセス）
				// a.b  a[b]
			{type: PREFIX, ops: ope([/[A-Za-z_][A-Za-z0-9_]*(?=\()/])},
			// ++ --		// 優先順位：17（後置インクリメント・デクリメント）
			{type: PREFIX, ops: ope([/(!(?!=)|~)/])},	// 優先順位：16
			//	{type: PREFIX, ops: ope([/(!(?!=)|++|--)/])},
				// 「n!」階乗演算子は優先順位がよく判らないし、使わない・ミスも考え無いほうが
			//		// 優先順位：16（前置インクリメント・デクリメント）
			{type: BINARY_RIGHT, ops: ope(['**'])},
			{type: BINARY_LEFT, ops: ope(['*', '/', '¥', '%'])},
			{type: BINARY_LEFT, ops: ope(['+', '-'])},
			{type: BINARY_LEFT, ops: ope([/(>>>|<<|>>)/])},
			{type: BINARY_LEFT, ops: ope([/(<=|<|>=|>)/])},
			{type: BINARY_LEFT, ops: ope([/(===|!==|==|!=)/])},
			{type: BINARY_LEFT, ops: ope([/&(?!&)/])},
			{type: BINARY_LEFT, ops: ope(['^'])},
			{type: BINARY_LEFT, ops: ope([/\|(?!\|)/])},
			{type: BINARY_LEFT, ops: ope(['&&'])},
			{type: BINARY_LEFT, ops: ope(['||'])},
			{type: BINARY_RIGHT, ops: ope([':'])},
			{type: BINARY_RIGHT, ops: ope(['?'])},
		];

		const tableParser = table.reduce(
			(acc, level)=> level.type(level.ops, acc),
			Basic
		);
		this.parser = tableParser.trim(P.optWhitespace);
	}

	readonly parse: IParse =s=> {
		//console.log("🌱 Parsimmon'%s'", s);
		const p = this.parser.parse(s);
		if (! p.status) throw Error('(PropParser)文法エラー【'+ s +'】');

		const a = p.value;
		if (a[0] == '!str!') return this.procEmbedVar(a[1]);

		return this.calc(a);
	}
	private calc(a: any[]): object {
		//console.log('🌷 calc%O', a);
		const elm = a.shift();
		if (elm instanceof Array) return this.calc(elm);

		const fnc = this.hFnc[elm];
		return (fnc) ?fnc(a) :Object(null);
	}
	private hFnc: IHFncCalc = {
		'!num!': a=> a.shift(),
		'!str!': a=> this.procEmbedVar(a.shift()),
		'!bool!':a=> a.shift(),

		// 論理 NOT
		'!':	a=> {
			const b = a.shift();
			return (b[0] == '!bool!')
				? ! Boolean( b[1] )
				: ! (String(this.calc(b)) == 'true');
		},
		// チルダ演算子（ビット反転）
		'~':	a=> ~ Number(this.calc(a.shift())),

		// 乗算、除算、剰余
		'**':	a=> Number(this.calc(a.shift())) **
					Number(this.calc(a.shift())),
		'*':	a=> Number(this.calc(a.shift())) *
					Number(this.calc(a.shift())),
		'/':	a=> Number(this.calc(a.shift())) /
					Number(this.calc(a.shift())),
		'¥':	a=> Math.floor( this.hFnc['/'](a) ),
		'%':	a=> Number(this.calc(a.shift())) %
					Number(this.calc(a.shift())),

		// 加算、減算、文字列の連結
		'+':	a=> {
			const b = this.calc(a.shift());
			const c = this.calc(a.shift());
			if (Object.prototype.toString.call(b) == '[object String]'
			|| Object.prototype.toString.call(c) == '[object String]') {
				return String(b) + String(c);
			}
			return Number(b) + Number(c);
		},
		'-':	a=> Number(this.calc(a.shift())) -
					Number(this.calc(a.shift())),

		// 関数
		'int':		a=> int(this.fncSub_ChkNum(a.shift())),
		'parseInt':	a=> int(this.hFnc['Number'](a)),
		'Number':	a=> {
			const b = this.calc(a.shift());
			if (Object.prototype.toString.call(b) != '[object String]') return Number(b);

			return this.fncSub_ChkNum(this.parser.parse(String(b)).value);
		},
		'ceil':		a=> Math.ceil( this.fncSub_ChkNum(a.shift()) ),
		'floor':	a=> Math.floor( this.fncSub_ChkNum(a.shift()) ),
		'round':	a=> Math.round( this.fncSub_ChkNum(a.shift()) ),

		// ビットシフト
		'<<':	a=> Number(this.calc(a.shift())) <<
					Number(this.calc(a.shift())),
		'>>':	a=> Number(this.calc(a.shift())) >>
					Number(this.calc(a.shift())),
		'>>>':	a=> Number(this.calc(a.shift())) >>>
					Number(this.calc(a.shift())),

		// 等値、非等値、厳密等価、厳密非等価
		'<':	a=> Number(this.calc(a.shift())) <
					Number(this.calc(a.shift())),
		'<=':	a=> Number(this.calc(a.shift())) <=
					Number(this.calc(a.shift())),
		'>':	a=> Number(this.calc(a.shift())) >
					Number(this.calc(a.shift())),
		'>=':	a=> Number(this.calc(a.shift())) >=
					Number(this.calc(a.shift())),

		// 小なり、以下、大なり、以上
		'==':	a=> {
			const b = this.calc(a.shift());
			const c = this.calc(a.shift());
			if ((b == null) && (c == null) && (!b || !c)) return (b == c);
				// 一・二項目は undefined も適合。
				// 三項目での falseは、""か 0か falseか undefinedか nullかも
				// ここでは undefined == null でよい。（===では区別する）
			return String(b) == String(c);
		},
		'!=':	a=> ! this.hFnc['=='](a),
		'===':	a=> {
			const b = this.calc(a.shift());
			const c = this.calc(a.shift());
			if (Object.prototype.toString.call(b) !=
				Object.prototype.toString.call(c)) return false;

			return String(b) == String(c);
		},
		'!==':	a=> ! this.hFnc['==='](a),

		// ビット演算子
		'&':	a=> Number(this.calc(a.shift())) &
					Number(this.calc(a.shift())),
		'^':	a=> Number(this.calc(a.shift())) ^
					Number(this.calc(a.shift())),
		'|':	a=> Number(this.calc(a.shift())) |
					Number(this.calc(a.shift())),

		// 論理 AND,OR
		'&&':	a=> (String(this.calc(a.shift())) == 'true') &&
					(String(this.calc(a.shift())) == 'true'),
		'||':	a=> (String(this.calc(a.shift())) == 'true') ||
					(String(this.calc(a.shift())) == 'true'),

		// 条件
		'?':	a=> {
			const b = a.shift();
			let cond = false;
			if (b[0] == '!bool!') {
				cond = Boolean( b[1] );
			}
			else {
				const cond2 = String( this.calc(b) );
				cond = (cond2 != 'true' && cond2 != 'false')
					? (int(cond2) != 0)
					: (cond2 == 'true');
			}

			const elm2 = a.shift();
			if (elm2[0] != ':') throw Error('(PropParser)三項演算子の文法エラーです。: が見つかりません');

			return this.calc(elm2[cond ?1 :2]);
		},
		':':	()=> { throw Error('(PropParser)三項演算子の文法エラーです。? が見つかりません') },
	}
	private fncSub_ChkNum(v: any[]): number {
		const b = this.calc(v);
		if (Object.prototype.toString.call(b) != '[object Number]') throw Error('(PropParser)引数【'+ b +'】が数値ではありません');
		return Number(b);
	}

	private	readonly REG_EMBEDVAR
		= /(\$((tmp|sys|save|mp):)?[^\s!--\/:-@[-^`{-~]+|\#\{[^\}]+})/g;
	private procEmbedVar(b: object): object {
		if (b == null) return b;	// undefined も

		return Object( String(b).replace(this.REG_EMBEDVAR, ($0): string=>{
			return Object(($0.charAt(0) == '$')
				? this.val.getVal($0.slice(1))
				: this.parse($0.slice(2, -1)));
		}) );
	}


	private	static	readonly	REG_VAL
		= m_xregexp('^((?<scope>\\w+?):)?(?<name>[^\\s :@]+)(?<at>\\@str)?$');
	static	getValName(arg_name: string): {[name: string]: string} | undefined {
		const a: any = m_xregexp.exec(trim(arg_name), this.REG_VAL);
		if (! a) return undefined;

		return {
			scope	: a.scope || 'tmp',
			//name	: (a.name || '')
			//			.replace(REG_VALN_B2D, getValName_B2D)
			name	: PropParser.getValName_B2D(a.name || ''),
			at		: a.at || '',
		};
	}

	private static	getValName_B2D(str: string): string {
		let i = 0, e = 0;
		while (true) {
			i = str.indexOf('["');
			if (i < 0) {
				i = str.indexOf("['");
				if (i < 0) break;

				e = str.indexOf("']", i+2);
			}
			else {
				e = str.indexOf('"]', i+2);
			}
			if (e < 0) break;

			str = str.slice(0, i) +'.'+ str.slice(i+2, e)
				+ str.slice(e+2);
			i = e-2;	// -3+1
		}

		return str;
	}

}
