/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {argChk_Boolean, argChk_Num} from './CmnLib';
import {HArg} from './Grammar';

import {Rectangle} from 'pixi.js';

export interface IChRect {
	ch		: string;
	rect	: Rectangle;
	elm		: HTMLElement;
}

const def行頭禁則	= '、。，．）］｝〉」』】〕”〟ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ！？!?‼⁉・ーゝゞヽヾ々';
const def行末禁則	= '［（｛〈「『【〔“〝';
const def分割禁止	= '─‥…';
const defぶら下げ	= def行頭禁則;

const defReg行頭禁則	= new RegExp(`[${def行頭禁則}]`);
const defReg行末禁則	= new RegExp(`[${def行末禁則}]`);
const defReg分割禁止	= new RegExp(`[${def分割禁止}]`);
const defRegぶら下げ	= defReg行頭禁則;


export class Hyphenation {
	#s行頭禁則		= def行頭禁則;
	#s行末禁則		= def行末禁則;
	#s分割禁止		= def分割禁止;
	#sぶら下げ		= defぶら下げ;
	get 行頭禁則() {return this.#s行頭禁則}
	get 行末禁則() {return this.#s行末禁則}
	get 分割禁止() {return this.#s分割禁止}
	get ぶら下げ() {return this.#sぶら下げ}

	#reg行頭禁則	= defReg行頭禁則;
	#reg行末禁則	= defReg行末禁則;
	#reg分割禁止	= defReg分割禁止;
	#regぶら下げ	= defRegぶら下げ;

	break_fixed		= false;
	break_fixed_left= 0;
	break_fixed_top	= 0;
	bura			= false;
	lay(hArg: HArg) {
		if (hArg.kinsoku_sol) {
			this.#s行頭禁則 = hArg.kinsoku_sol;
			this.#reg行頭禁則 = new RegExp(`[${this.#s行頭禁則}]`);
		}
		if (hArg.kinsoku_eol) {
			this.#s行末禁則 = hArg.kinsoku_eol;
			this.#chk禁則の競合_ぶら行末();
			this.#reg行末禁則 = new RegExp(`[${this.#s行末禁則}]`);
		}
		if (hArg.kinsoku_dns) {
			this.#s分割禁止 = hArg.kinsoku_dns;
			this.#chk禁則の競合_ぶら分禁();
			this.#reg分割禁止 = new RegExp(`[${this.#s分割禁止}]`);
		}
		if (hArg.kinsoku_bura) {
			this.#sぶら下げ = hArg.kinsoku_bura;
			this.#chk禁則の競合_ぶら行末();
			this.#chk禁則の競合_ぶら分禁();
			this.#regぶら下げ = new RegExp(`[${this.#sぶら下げ}]`);
		}
		if ('bura' in hArg) this.bura = argChk_Boolean(hArg, 'bura', false);

		this.break_fixed		= argChk_Boolean(hArg, 'break_fixed', this.break_fixed);
		this.break_fixed_left	= argChk_Num(hArg, 'break_fixed_left', this.break_fixed_left);
		this.break_fixed_top	= argChk_Num(hArg, 'break_fixed_top', this.break_fixed_top);
	}
		// 禁則の競合（ぶら下げ と 行末禁則 の両方に含まれる文字があってはならない）
		#chk禁則の競合_ぶら行末() {
			// 処理速度最適化で主従を変える。長い方をネイティブにやらせる
			const len行末禁則 = this.#s行末禁則.length;
			const lenぶら下げ = this.#sぶら下げ.length;
			if (len行末禁則 < lenぶら下げ) {
				for (let i=0; i<len行末禁則; ++i) {
					const c = this.#s行末禁則[i];
					if (this.#sぶら下げ.includes(c)) throw `禁則の競合があります。文字 ${c} がぶら下げ と 行末禁則 の両方に含まれます`;
				}
			}
			else {
				for (let i=0; i<lenぶら下げ; ++i) {
					const c = this.#sぶら下げ[i];
					if (this.#s行末禁則.includes(c)) throw `禁則の競合があります。文字 ${c} がぶら下げ と 行末禁則 の両方に含まれます`;
				}
			}
		}
		// 禁則の競合（ぶら下げ と 分割禁止 の両方に含まれる文字があってはならない）
		#chk禁則の競合_ぶら分禁() {
			// 処理速度最適化で主従を変える。長い方をネイティブにやらせる
			const len分割禁止 = this.#s分割禁止.length;
			const lenぶら下げ = this.#sぶら下げ.length;
			if (len分割禁止 < lenぶら下げ) {
				for (let i=0; i<len分割禁止; ++i) {
					const c = this.#s分割禁止[i];
					if (this.#sぶら下げ.includes(c)) throw `禁則の競合があります。文字 ${c} がぶら下げ と 分割禁止 の両方に含まれます`;
				}
			}
			else {
				for (let i=0; i<lenぶら下げ; ++i) {
					const c = this.#sぶら下げ[i];
					if (this.#s分割禁止.includes(c)) throw `禁則の競合があります。文字 ${c} がぶら下げ と 分割禁止 の両方に含まれます`;
				}
			}
		}

	reNew(to: Hyphenation) {
		to.#genKinsoku(this.#s行頭禁則, this.#s行末禁則, this.#s分割禁止, this.#sぶら下げ);

		to.break_fixed		= this.break_fixed;
		to.break_fixed_left	= this.break_fixed_left;
		to.break_fixed_top	= this.break_fixed_top;
		to.bura				= this.bura;
	}
		#genKinsoku(s行頭禁則: string, s行末禁則: string, s分割禁止: string, sぶら下げ: string) {
			if (this.#s行頭禁則	!= s行頭禁則) {
				this.#s行頭禁則	= s行頭禁則;
				this.#reg行頭禁則 = new RegExp(`[${s行頭禁則}]`);
			}
			if (this.#s行末禁則	!= s行末禁則) {
				this.#s行末禁則	= s行末禁則;
				this.#reg行末禁則 = new RegExp(`[${s行末禁則}]`);
			}
			if (this.#s分割禁止	!= s分割禁止) {
				this.#s分割禁止	= s分割禁止;
				this.#reg分割禁止 = new RegExp(`[${s分割禁止}]`);
			}
			if (this.#sぶら下げ	!= sぶら下げ) {
				this.#sぶら下げ	= sぶら下げ;
				this.#regぶら下げ = new RegExp(`[${sぶら下げ}]`);
			}
		}
	record() {return {
		行頭禁則	: this.#s行頭禁則,
		行末禁則	: this.#s行末禁則,
		分割禁止	: this.#s分割禁止,
		ぶら下げ	: this.#sぶら下げ,

		break_fixed			: this.break_fixed,
		break_fixed_left	: this.break_fixed_left,
		break_fixed_top		: this.break_fixed_top,
		bura				: this.bura,
	}}
	playback(hLay: any) {
		if (! hLay) return;		// 途中追加なので

		this.#genKinsoku(hLay.行頭禁則, hLay.行末禁則, hLay.分割禁止, hLay.ぶら下げ);

		this.break_fixed		= hLay.break_fixed;
		this.break_fixed_left	= hLay.break_fixed_left;
		this.break_fixed_top	= hLay.break_fixed_top;
		this.bura				= hLay.bura;
	}

	hyph(htmTxt: HTMLSpanElement, cnvRect :(rng: Range, ch: string)=> Rectangle, tategaki: boolean, begin: number, bkHtm: string): [IChRect[], number] {
		let a: IChRect[];
		let len = 0;
		let i = 2;		// 本来 1 だがひと文字目の行頭禁則文字を無視したいので
		let fncFirstChk = (len: number)=> {
			fncFirstChk = ()=> false;

			if (begin === len) {	// 右クリック戻りなどで文字表示が崩れる件の対応
				if (begin > 0) htmTxt.innerHTML = bkHtm.replaceAll('class="sn_ch"', 'class="sn_ch sn_ch_in_default"');
				return true;
			}
			return len < 2;
		};
//console.log(`🎴禁則処理判定ループ begin:${begin}`);
		do {
			a = this.#getChRects(htmTxt, cnvRect);
			len = a.length;
			if (fncFirstChk(len)) break;

			// 禁則処理判定ループ
			let sl_xy = -Infinity;
//console.log(` len:${len}`);
			for (; i<len; ++i) {
				const {elm, rect, ch} = a[i];
				if (elm.tagName === 'RT') continue;	// ルビはスキップ

				const xy = tategaki ?rect.y :rect.x;
//if (sl_xy > 790)
//console.log(`🎴 sl_xy:${sl_xy.toFixed(2)} xy:${xy.toFixed(2)} he.ch:${ch}: he:${JSON.stringify(a[j])}`);
				if (sl_xy <= xy		// 【sl_xy < xy】では[tcy]二文字目を誤判定する
				|| elm.previousElementSibling?.children[0]?.tagName
					=== 'BR'		// [r]による改行後は追い出し処理をしないように
					) {
						sl_xy = xy;
						if (! this.break_fixed) {
							this.break_fixed_left = rect.x;
							this.break_fixed_top = rect.y;
						}
						continue;
					}
/*
	// [r]などの改行はこう。TxtLayer.#tagCh_sub()により <span> に入れられる
	<span class=​"sn_ch" style=​"display:​ inline;​animation-delay:​ 10ms;​">​
		<br>
	​</span>​

	// 禁則処理による自動改行はこう
	<br>
*/

				let p_i = i -1;
				while (a[p_i].elm.tagName === 'RT') --p_i;	// ルビはスキップ
				const {elm: p_elm, rect: p_rect, ch: p_ch} = a[p_i];
//console.log(`🎴 === 自動改行発生！　前文字:${chPrev}: 今文字:${ch}:`);
				if (! this.break_fixed) {
					this.break_fixed_left = p_rect.x;
					this.break_fixed_top = p_rect.y;
					const sty = globalThis.getComputedStyle(p_elm);
					const rs = parseFloat(sty.fontSize);
					if (tategaki) this.break_fixed_top += rs; else this.break_fixed_left += rs;
				}

				sl_xy = -Infinity;	// 自動改行発生！
				const oldI = i;
				const {cont, ins} = this.bura
					? this.hyph_alg_bura(a, len, p_i, p_ch, i, ch)
					: this.hyph_alg(a, p_i, p_ch, i, ch);
				i = ins;
//console.log(`fn:Hyphenation.ts line:204 ins:${ins} cont:${cont} elm2.ch:${a[i].ch}`);
				if (cont) continue;

				// 改行挿入
				const elm2 = a[i].elm;
				const pal = elm2.parentElement!;
				const br = document.createElement('br');
				if (pal.classList.contains('sn_tx')) pal.insertBefore(br, elm2); else {
					const ppal = pal.parentElement!;
					if (ppal.classList.contains('sn_ch')) {
						ppal.parentElement!.insertBefore(br, ppal);
					}
					else ppal.insertBefore(br, pal);
				}

				i += 2;	// 次へ行く +1 と、いま追加した<br>のぶん
				if (i < oldI) i = oldI;	// 永久ループ防御
				len = -1;	// doループ先頭に戻る
				break;
			}
		} while (len < 0);

		return [a, len];
	}

	#getChRects(elm: Node, cnvRect :(range: Range, ch: string)=> Rectangle): IChRect[] {	// 注意）再帰関数
		const ret: IChRect[] = [];
		if (elm.nodeType !== elm.TEXT_NODE) return Array.from(elm.childNodes).map(v=> this.#getChRects(v, cnvRect)).flat();

		const rng = elm.ownerDocument!.createRange();
		rng.selectNodeContents(elm);
		let pos = 0;
		const end = rng.endOffset;
		// できれば一文字ずつ「after-edge - baseline」を調べたいが、暫定手段を取る
		//const styles = globalThis.getComputedStyle(this.htmTxt);
		//console.log('lh:'+ styles.lineHeight +' fs:'+ styles.fontSize);
		while (pos < end) {
			rng.setStart(elm, pos);
			rng.setEnd(elm, ++pos);
			const ch = rng.toString();
			ret.push({
				ch,
				rect: cnvRect(rng, ch),
				elm	: rng.startContainer.parentElement!,
			});
		}
		rng.detach();

		return ret;
	}

	/**
	 * 抽象化した禁則処理アルゴリズム
	 * @method hyph_alg
	 * @param {IChRect[]} a - 文章の抽象化配列
	 * @param {number} p_i - 処理要素の一つ前の添字
	 * @param {string} p_ch - 処理要素の一つ前の文字
	 * @param {number} i - 処理要素の添字
	 * @param {string} ch - 処理要素の文字
	 * @return {Object} result 戻り値
	 * @return {boolean} result.cont - true: 呼び元で改行挿入せず continue
	 * @return {number} result.ins - 手前に改行を挿入すべき要素の添字
	 */
	hyph_alg(	// テスト用にpublic
		a	: IChRect[],
		p_i	: number,
		p_ch: string,
		i	: number,
		ch	: string,
	): {cont: boolean, ins: number} {
		// 追い出し走査
		if (this.#reg行末禁則.test(p_ch)) {}	// 一つ前
		else if (this.#reg行頭禁則.test(ch)) {	//（現在地 -> 前方走査）
			while (i > 0) {
				const {elm, ch} = a[--i];	// 前方走査
				if (elm.tagName === 'RT') continue;	// ルビはスキップ
				if (! this.#reg行頭禁則.test(ch)) break;	// 行頭禁則はスキップ
			}
		}
		else if (p_ch === ch && this.#reg分割禁止.test(p_ch)) {}// 一つ前＆現在地
		else return {cont: true, ins: i +1};	// 追い出しなし

		// 追い出しによる新行末二次判定（一つ前 -> 前方走査）
		i = p_i;
		while (i > 0) {
			const {elm, ch} = a[--i];	// 前方走査
			if (elm.tagName === 'RT') continue;	// ルビはスキップ
			if (! this.#reg行末禁則.test(ch)) break;	// 行末禁則はスキップ
		}
		return {cont: false, ins: i +1};
	}

	/**
	 * 抽象化した禁則処理アルゴリズム
	 * @method hyph_alg
	 * @param {IChRect[]} a - 文章の抽象化配列
	 * @param {number} p_i - 処理要素の一つ前の添字
	 * @param {string} p_ch - 処理要素の一つ前の文字
	 * @param {number} i - 処理要素の添字
	 * @param {string} ch - 処理要素の文字
	 * @return {Object} result 戻り値
	 * @return {boolean} result.cont - true: 呼び元で改行挿入せず continue
	 * @return {number} result.ins - 手前に改行を挿入すべき要素の添字
	 */
	hyph_alg_bura(	// テスト用にpublic
		a	: IChRect[],
		len	: number,
		p_i	: number,
		p_ch: string,
		i	: number,
		ch	: string,
	): {cont: boolean, ins: number} {
		// ぶら下げ走査（二つ前 -> 一つ前）
		if (p_i -1 > 1 && this.#regぶら下げ.test(a[p_i -1].ch)) return {
			cont: false,	// >1 はさすがに冒頭はぶら下げ不要だろうという判断
			ins	: p_i > 0 && this.#regぶら下げ.test(p_ch) ?i :p_i,
		};	// ぶら下げ文字への「ルビはスキップ」、オーバースペックかなと

		// ぶら下げ＆行頭禁則走査（現在地 -> 一つ次）
		if (this.#regぶら下げ.test(ch)
		|| this.#reg行頭禁則.test(ch)) return {	// 後方走査
			cont: false,
			ins: i +1 < len
				&& (this.#regぶら下げ.test(a[i +1].ch)
				|| this.#reg行頭禁則.test(a[i +1].ch))
				?i +2 :i +1,
		};	// ぶら下げ文字への「ルビはスキップ」、オーバースペックかなと

		if (i > 2) {
			const ppp_i = i -3;
			const pp_i = i -2;
				// 分割禁止文字への「ルビはスキップ」、オーバースペックかなと
			const {ch: ppp_ch} = a[ppp_i];
			const {ch: pp_ch} = a[pp_i];
			// 追い出し走査
			if (ppp_ch === pp_ch && this.#reg分割禁止.test(pp_ch)) return {
				cont: false, ins: ppp_i	// 分割禁止
			};
			if (this.#reg行末禁則.test(ppp_ch)) {
				i = ppp_i;
				while (i > 0) {
					const {elm, ch} = a[--i];	// 前方走査
					if (elm.tagName === 'RT') continue;	// ルビはスキップ
					if (! this.#reg行末禁則.test(ch)) break;	// 行末禁則はスキップ
				}
				return {cont: false, ins: i +1};	// 行末禁則
			}

			return {cont: false, ins: pp_i};
		}

		return {cont: false, ins: i +1};
	}

}
