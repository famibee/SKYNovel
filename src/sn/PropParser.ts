/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {alt, lazy, of, optWhitespace, regex, seq, seqMap, string} from 'parsimmon';
import {int} from './CmnLib';
import {IPropParser, IVariable} from './CmnInterface';

interface IFncCalc { (a: any[]): any;}
interface IHFncCalc { [key: string]: IFncCalc; }

export class PropParser implements IPropParser {
	#parser: any = null;

	constructor(private readonly val: IVariable, ce = '\\') {
		function ope(a: (string | RegExp)[]) {
			const ps: any = [];
			for (const v of a) ps.push(
				((typeof v === 'string') ?string(v) :regex(v))
				.trim(optWhitespace)
			);
			return alt.apply(null, ps);
		}
		function opeH(ops: {[name: string]: string | RegExp}) {
			let keys = Object.keys(ops).sort();
			let ps = keys.map(k=>
				((typeof ops[k] === 'string')
					? string(ops[k] as string) :regex(ops[k] as RegExp))
				.trim(optWhitespace)
				.result(k)
			);
			return alt.apply(null, ps);
		}

		function PREFIX(operatorsParser: any, nextParser: any) {
			const parser: any = lazy(()=> seq(operatorsParser, parser).or(nextParser));
			return parser;
		}
		function POSTFIX(operatorsParser: any, nextParser: any) {
			return seqMap(nextParser, operatorsParser.many(), (x, suffixes: any)=> suffixes.reduce((acc: any, x: any) => [x, acc], x));
		}

		// right. (e.g. 1^2^3 is 1^(2^3) not (1^2)^3)
		function BINARY_RIGHT(operatorsParser: any, nextParser: any) {
			let parser = lazy(
				()=> nextParser.chain(
					(next: any)=> seq(
						operatorsParser,
						of(next),
						parser
					).or(of(next))
				)
			);
			return parser;
		}

		// left. (e.g. 1-2-3 is (1-2)-3 not 1-(2-3))
		function BINARY_LEFT(operatorsParser: any, nextParser: any) {
			return seqMap(
				nextParser,
				seq(operatorsParser, nextParser).many(),
				(first, rest)=> rest.reduce((acc, ch)=> [ch[0], acc, ch[1]], first)
			);
		}

		const Num = alt(
			alt(
				regex(/-?(0|[1-9][0-9]*)\.[0-9]+/),
				regex(/0x[0-9a-fA-F]+/)
			).map(Number),
			alt(
				regex(/-?(0|[1-9][0-9]*)/)
			).map(n=> int(n))
		)
		.map(str=> ['!num!', str])
		.desc('number');

		const NullLiteral = string('null')
		.map(()=> ['!str!', null]);

		const BooleanLiteral = regex(/(true|false)/)
		.map(b=> ['!bool!', b === 'true'])
		.desc('boolean');

		const StringLiteral = regex(new RegExp(`(?:"(?:\\${ce}["'#\\n]|[^"])*"|'(?:\\${ce}["'#\\n]|[^'])*'|\\#(?:\\${ce}["'#\\n]|[^#])*\\#)`))
			// https://regex101.com/r/Fs5wL3/1
			// 15 matches (279 steps, 0.1ms) by PCRE2
		.map(b=> ['!str!', b.slice(1, -1).replaceAll(ce, '')])
		.desc('string');

		const REG_BRACKETS = /\[[^\]]+\]/g;
		const VarLiteral = regex(/-?(?:(?:tmp|sys|save|mp):)?[^\s!-\/:-@[-^`{-~]+(?:\.[^\s!-\/:-@[-^`{-~]+|\[[^\]]+\])*(?:@str)?/)
		.map(b=> {
			//console.log('   👺 VarLiteral:0 b:%O:', b);
			const s = String(b).replaceAll(REG_BRACKETS, v=>
				'.'+ this.parse(v.slice(1, -1))
			);
			const val = this.val.getVal(s);
			//console.log('      👹 s:%O: val:%O:', s, val);
			if (val == null) return ['!str!', val];		// undefined も
			if (typeof val === 'boolean') return ['!bool!', val];

			return (Object.prototype.toString.call(val) === '[object String]')
				? ['!str!', String(val)]
				: ['!num!', Number(val)];
		})
		.desc('string');

		const Basic = lazy(()=> 
			string('(').then(this.#parser).skip(string(')'))
			.or(Num)
			.or(NullLiteral)
			.or(BooleanLiteral)
			.or(StringLiteral)
			.or(VarLiteral)
		);

		const table = [
			// 演算子の優先順位 - JavaScript | MDN https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Operator_precedence
			// 優先順位：18（メンバーへのアクセス、計算値によるメンバーへのアクセス）
				// a.b  a[b]
			{type: PREFIX, ops: ope([/[A-Za-z_][A-Za-z0-9_]*(?=\()/])},

			// 優先順位：16
			{type: POSTFIX, ops: opeH({PostfixInc: '++'})},
			{type: POSTFIX, ops: opeH({PostfixDec: '--'})},
				// 【未サポート】後置インクリメント・デクリメント
			// 優先順位：15
			{type: PREFIX, ops: ope([/!(?!=)|~/])},	// 論理 NOT (!)、ビット単位 NOT (~)
			{type: PREFIX, ops: opeH({PrefixInc: '++'})},
			{type: PREFIX, ops: opeH({PrefixDec: '--'})},
				// 【未サポート】前置インクリメント・デクリメント
		//	{type: PREFIX, ops: opeH({Unaryplus: /\+(?!\+)/})},	// 単項プラス
			{type: PREFIX, ops: opeH({UnaryNegate: /-(?!-)/})},	// 単項マイナス

			// 優先順位：14以下（並びに注意）
			{type: BINARY_RIGHT, ops: ope(['**'])},
			{type: BINARY_LEFT, ops: ope(['*', '/', '¥', '%'])},
			{type: BINARY_LEFT, ops: ope(['+', '-'])},
			{type: BINARY_LEFT, ops: ope([/>>>|<<|>>/])},
			{type: BINARY_LEFT, ops: ope([/<=|<|>=|>/])},
			{type: BINARY_LEFT, ops: ope([/===|!==|==|!=/])},
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
		this.#parser = tableParser.trim(optWhitespace);
	}

	parse(s: string): any {
		//console.log("🌱 Parsimmon'%s'", s);
		const p = this.#parser.parse(s);
		if (! p.status) throw Error('(PropParser)文法エラー【'+ s +'】');

		const a = p.value;
		if (a[0] === '!str!') return this.#procEmbedVar(a[1]);

		return this.#calc(a);
	}
	#calc(a: any[]): object {
		//console.log('🌷 calc%O', {...a});
		const elm = a.shift();
		if (elm instanceof Array) return this.#calc(elm);

		const fnc = this.#hFnc[elm];
		return (fnc) ?fnc(a) :Object(null);
	}
	#hFnc: IHFncCalc = {
		'!num!': a=> a.shift(),
		'!str!': a=> this.#procEmbedVar(a.shift()),
		'!bool!':a=> a.shift(),

		PostfixInc:	_=> {throw Error('(PropParser)後置インクリメントは未サポートです')},
		PostfixDec:	_=> {throw Error('(PropParser)後置デクリメントは未サポートです')},
		PrefixInc:	_=> {throw Error('(PropParser)前置インクリメントは未サポートです')},
		PrefixDec:	_=> {throw Error('(PropParser)前置デクリメントは未サポートです')},

		// 論理 NOT
		'!':	a=> ! this.#hFnc['Boolean'](a),
		// チルダ演算子（ビット反転）
		'~':	a=> ~ Number(this.#calc(a.shift())),

//		UnaryNegate:	a=> - Number(this.#calc(a.shift())),
		UnaryNegate:	a=> - this.#hFnc['Number'](a),
	//	Unaryplus:		a=> this.#hFnc['Number'](a),

		// 乗算、除算、剰余
		'**':	a=> Number(this.#calc(a.shift())) **
					Number(this.#calc(a.shift())),
		'*':	a=> Number(this.#calc(a.shift())) *
					Number(this.#calc(a.shift())),
		'/':	a=> Number(this.#calc(a.shift())) /
					Number(this.#calc(a.shift())),
		'¥':	a=> Math.floor( this.#hFnc['/'](a) ),
		'%':	a=> Number(this.#calc(a.shift())) %
					Number(this.#calc(a.shift())),

		// 加算、減算、文字列の連結
		'+':	a=> {
			const b = this.#calc(a.shift());
			const c = this.#calc(a.shift());
			return (Object.prototype.toString.call(b) === '[object String]'
				|| Object.prototype.toString.call(c) === '[object String]')
					? String(b) + String(c) : Number(b) + Number(c);
		},
		'-':	a=> Number(this.#calc(a.shift())) -
					Number(this.#calc(a.shift())),

		// 関数
		'int':		a=> int(this.#fncSub_ChkNum(a.shift())),
		'parseInt':	a=> int(this.#hFnc['Number'](a)),
		'Number':	a=> {
			const b = this.#calc(a.shift());
			return Object.prototype.toString.call(b) === '[object String]'
				? this.#fncSub_ChkNum(this.#parser.parse(String(b)).value)
				: Number(b);
		},
		'Boolean':	a=> {
			const b = a.shift();
			return (b[0] === '!bool!')
				? Boolean( b[1] )
				: Boolean(this.#calc(b));
		},
		'ceil':		a=> Math.ceil( this.#fncSub_ChkNum(a.shift()) ),
		'floor':	a=> Math.floor( this.#fncSub_ChkNum(a.shift()) ),
		'round':	a=> Math.round( this.#fncSub_ChkNum(a.shift()) ),
		'isNaN':	a=> Number.isNaN( this.#fncSub_ChkNum(a.shift()) ),

		// ビットシフト
		'<<':	a=> Number(this.#calc(a.shift())) <<
					Number(this.#calc(a.shift())),
		'>>':	a=> Number(this.#calc(a.shift())) >>
					Number(this.#calc(a.shift())),
		'>>>':	a=> Number(this.#calc(a.shift())) >>>
					Number(this.#calc(a.shift())),

		// 等値、非等値、厳密等価、厳密非等価
		'<':	a=> Number(this.#calc(a.shift())) <
					Number(this.#calc(a.shift())),
		'<=':	a=> Number(this.#calc(a.shift())) <=
					Number(this.#calc(a.shift())),
		'>':	a=> Number(this.#calc(a.shift())) >
					Number(this.#calc(a.shift())),
		'>=':	a=> Number(this.#calc(a.shift())) >=
					Number(this.#calc(a.shift())),

		// 小なり、以下、大なり、以上
		'==':	a=> {
			const b = this.#calc(a.shift());
			const c = this.#calc(a.shift());
			return ((b == null) && (c == null) && (!b || !c))
				? (b == c) : String(b) === String(c);
		},
		'!=':	a=> ! this.#hFnc['=='](a),
		'===':	a=> {
			const b = this.#calc(a.shift());
			const c = this.#calc(a.shift());
			return (Object.prototype.toString.call(b) !=
					Object.prototype.toString.call(c))
					? false : String(b) === String(c);
		},
		'!==':	a=> ! this.#hFnc['==='](a),

		// ビット演算子
		'&':	a=> Number(this.#calc(a.shift())) &
					Number(this.#calc(a.shift())),
		'^':	a=> Number(this.#calc(a.shift())) ^
					Number(this.#calc(a.shift())),
		'|':	a=> Number(this.#calc(a.shift())) |
					Number(this.#calc(a.shift())),

		// 論理 AND,OR
		'&&':	a=> (String(this.#calc(a.shift())) === 'true') &&
					(String(this.#calc(a.shift())) === 'true'),
		'||':	a=> (String(this.#calc(a.shift())) === 'true') ||
					(String(this.#calc(a.shift())) === 'true'),

		// 条件
		'?':	a=> {
			const cond = this.#hFnc['Boolean'](a);
			const elm2 = a.shift();
			if (elm2[0] !== ':') throw Error('(PropParser)三項演算子の文法エラーです。: が見つかりません');

			return this.#calc(elm2[cond ?1 :2]);
		},
		':':	()=> {throw Error('(PropParser)三項演算子の文法エラーです。? が見つかりません')},
	}
	#fncSub_ChkNum(v: any[]): number {
		const b = this.#calc(v);
		if (Object.prototype.toString.call(b) !== '[object Number]') throw Error('(PropParser)引数【'+ b +'】が数値ではありません');
		return Number(b);
	}

	readonly #REG_EMBEDVAR
		= /(\$((tmp|sys|save|mp):)?[^\s!--\/:-@[-^`{-~]+|\#\{[^\}]+})/g;
	#procEmbedVar(b: object): any {
		if (b == null) return b;	// undefined も

		return String(b).replaceAll(
			this.#REG_EMBEDVAR,
			v=> v.startsWith('$')
				? this.val.getVal(v.slice(1))
				: this.parse(v.slice(2, -1))
		);
	}


	getValAmpersand = (val: string)=> val.startsWith('&')
		? String(this.parse(val.slice(1)))
		: val;


	static	readonly	#REG_VAL
		= /^((?<scope>\w+?):)?(?<name>[^\s :@]+)(?<at>\@str)?$/;
		// 522 match 18413 step(~10ms) https://regex101.com/r/tmCKuE/1
			// →これは改良しようがない。いい意味で改善の余地なし
	static	getValName(arg_name: string): {[name: string]: string} | null {
		const e = this.#REG_VAL.exec(arg_name.trim());
		const g = e?.groups;
		if (! g) return null;

		const {scope='tmp', name, at=''} = g;
		return {
			scope,
			name	: PropParser.#getValName_B2D(name),
			at,
		};
	}

	static	#getValName_B2D(str: string): string {
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
