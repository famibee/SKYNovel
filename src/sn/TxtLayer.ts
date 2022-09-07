/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2022 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Layer} from './Layer';
import {uint, CmnLib, IEvtMng, argChk_Boolean, argChk_Num, initStyle, addStyle, argChk_Color} from './CmnLib';
import {IVariable, IHTag, HArg, IPutCh, IMain} from './CmnInterface';
import {TxtStage} from './TxtStage';
import {Config} from './Config';
import {RubySpliter} from './RubySpliter';
import {GrpLayer} from './GrpLayer';
import {Button} from './Button';
import {LayerMng, IMakeDesignCast} from './LayerMng';
import {SysBase} from './SysBase';

import {Sprite, DisplayObject, Graphics, Container, Renderer, Application} from 'pixi.js';

export class TxtLayer extends Layer {
	static	#cfg		: Config;
	static	#val		: IVariable;
	static	#recText	: (txt: string, pagebreak?: boolean)=> void;
	static	#isPageFore	: (me: TxtLayer)=> boolean;
	static	init(cfg: Config, hTag: IHTag, val: IVariable, recText: (txt: string)=> void, isPageFore: (me: TxtLayer)=> boolean, appPixi: Application): void {
		TxtLayer.#cfg = cfg;
		TxtStage.init(cfg, appPixi);
		TxtLayer.#val = val;
		TxtLayer.#recText = recText;
		TxtLayer.#isPageFore = isPageFore;

		val.setDoRecProc(TxtLayer.chgDoRec);

		hTag.autowc			= o=> TxtLayer.#autowc(o);	// 文字を追加する
		hTag.autowc({enabled: false, text: '', time: 0});
		hTag.ch_in_style	= o=> TxtLayer.#ch_in_style(o);	// 文字出現演出
		hTag.ch_out_style	= o=> TxtLayer.#ch_out_style(o);	// 文字消去演出

		// ギャラリーリロード用初期化
		TxtStage.initChStyle();
		initStyle();

		let font = '';
		cfg.matchPath('.+', Config.EXT_FONT).forEach(o=> {
			for (const key in o) font += `
@font-face {
	font-family: '${o[key]}';
	src: url('${this.#cfg.searchPath(o[key], Config.EXT_FONT)}');
}
`;
		});

		// 文字出現演出関係
		font += `
.sn_tx {
	pointer-events: none;
	user-select: none;
	-webkit-touch-callout: none;
	box-sizing: border-box;
}
.sn_ch {
	position: relative;
	display: inline-block;
}
`;	// 「sn_ch」と「sn_ch_in_〜」の中身が重複しているが、これは必須

		addStyle(font);

		TxtLayer.#ch_in_style({
			name	: 'default',
			wait	: 500,
			alpha	: 0,
			x		: '=0.3',
			y		: '=0',
			scale_x	: 1,
			scale_y	: 1,
			rotate	: 0,
			join	: true,
			ease	: 'ease-out',
		});
		TxtLayer.#ch_out_style({
			name	: 'default',
			wait	: 0,
			alpha	: 0,
			x		: '=0',
			y		: '=0',
			scale_x	: 1,
			scale_y	: 1,
			rotate	: 0,
			join	: false,
			ease	: 'ease-out',
		});
	}

	// 文字出現演出
	static	#ch_in_style(hArg: HArg) {
		const o = TxtStage.ch_in_style(hArg);
		const x = (o.x.charAt(0) === '=') ?`${o.nx *100}%` :`${o.nx}px`;
		const y = (o.y.charAt(0) === '=') ?`${o.ny *100}%` :`${o.ny}px`;
		const {name} = hArg;
		addStyle(`
.sn_ch_in_${name} {
	position: relative;
	display: inline-block;
}
.go_ch_in_${name} {
	opacity: ${o.alpha};
	position: relative;
	display: inline-block;
	animation: sn_ch_in_${name} ${o.wait}ms ${o.ease} 0s both;
}
@keyframes sn_ch_in_${name} {
	from {transform: rotate(${o.rotate}deg) scale(${o.scale_x}, ${o.scale_y}) translate(${x}, ${y});}
	to {opacity: 1; transform: none;}
}
`);

		return false;
	}
	// 文字消去演出
	static	#ch_out_style(hArg: HArg) {
		const o = TxtStage.ch_out_style(hArg);
		const x = (o.x.charAt(0) === '=') ?`${o.nx *100}%` :`${o.nx}px`;
		const y = (o.y.charAt(0) === '=') ?`${o.ny *100}%` :`${o.ny}px`;
		const {name} = hArg;
		addStyle(`
.go_ch_out_${name} {
	position: relative;
	display: inline-block;
	animation: go_ch_out_${name} ${o.wait}ms ${o.ease} 0s both;
}
@keyframes go_ch_out_${name} {
	to {
		opacity: ${o.alpha};
		transform: rotate(${o.rotate}deg) scale(${o.scale_x}, ${o.scale_y}) translate(${x}, ${y});
	}
`);

		return false;
	}


	static	#main	: IMain;
	static	#evtMng	: IEvtMng;
	static	#sys	: SysBase;
	static setEvtMng(main: IMain, evtMng: IEvtMng, sys: SysBase) {
		TxtLayer.#main = main;
		TxtLayer.#evtMng = evtMng;
		TxtLayer.#sys = sys;
		TxtStage.setEvtMng(evtMng);
	}

	// 文字ごとのウェイト
	static #doAutoWc	= false;
	static #hAutoWc	: {[ch: string]: number}	= {};
	static #autowc(hArg: HArg) {
		TxtLayer.#doAutoWc = argChk_Boolean(hArg, 'enabled', TxtLayer.#doAutoWc);
		TxtLayer.#val.setVal_Nochk('save', 'const.sn.autowc.enabled', TxtLayer.#doAutoWc);

		const {text} = hArg;
		if (('text' in hArg) !== ('time' in hArg)) throw '[autowc] textとtimeは同時指定必須です';
		TxtLayer.#val.setVal_Nochk('save', 'const.sn.autowc.text', text);
		if (! text) {
			TxtLayer.#val.setVal_Nochk('save', 'const.sn.autowc.time', '');
			return false;
		}

		const len = text.length;
		if (TxtLayer.#doAutoWc && len === 0) throw '[autowc] enabled === false かつ text === "" は許されません';

		const a = String(hArg.time).split(',');
		if (a.length !== len) throw '[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい';
		TxtLayer.#hAutoWc = {};	// 毎回クリアを仕様とする
		a.forEach((v, i)=> TxtLayer.#hAutoWc[text[i]] = uint(v));
		TxtLayer.#val.setVal_Nochk('save', 'const.sn.autowc.time', hArg.time);

		return false;
	}


	// バック
	#b_color			= 0x000000;
	#b_alpha			= 0;
	#b_alpha_isfixed	= false;
	#b_do			: DisplayObject | undefined	= undefined;
	#b_pic			= '';	// 背景画像無し（＝単色塗り）

	// 文字表示
	#txs	= new TxtStage(this.spLay, ()=> this.canFocus(), TxtLayer.#sys);

	#rbSpl	= new RubySpliter;

	#cntBtn	= new Container;

	constructor() {
		super();

		this.spLay.addChild(this.#txs);

		this.#rbSpl.init(this.#putCh);

		this.spLay.addChild(this.#cntBtn);	// ボタンはpaddingの影響を受けない
		this.#cntBtn.name = 'cntBtn';

		const padding = 16;	// 初期padding
		this.lay({style: `width: ${CmnLib.stageW}px; height: ${CmnLib.stageH}px; font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif; color: white; font-size: 24px; line-height: 1.5; padding: ${padding}px;`, in_style: 'default', out_style: 'default', back_clear: 'true'});
	}
	override destroy() {
		if (this.#b_do) {this.spLay.removeChild(this.#b_do).destroy(); this.#b_do = undefined;}

		this.clearText();
		this.#txs.destroy();
	}
	static	destroy() {
		TxtLayer.#doAutoWc = false;
		TxtLayer.#hAutoWc = {};

		TxtLayer.#rec = tx=> tx;
	}
	override set name(nm: string) {this.name_ = nm; this.#txs.name = nm;}
	override get name() {return this.name_;}	// getは継承しないらしい


	override cvsResize() {this.#txs.cvsResize();}
	override cvsResizeChildren() {this.#cntBtn.children.forEach(b=> (b as Button).cvsResize());}

	override lay(hArg: HArg) {
		super.lay(hArg);
		Layer.setXY(this.spLay, hArg, this.spLay);

		hArg[':id_tag'] = this.name_.slice(0, -7);	// Design用
		RubySpliter.setting(hArg);
		this.#setFfs(hArg);
		this.#txs.lay(hArg);

		if ('r_align' in hArg) this.#r_align = hArg.r_align ?? '';
		this.#ruby_pd = CmnLib.isSafari
		? this.#txs.tategaki		// Safariでは親文字幅 l は疑似値
			? (v, l)=> `text-align: start; height: ${l}em; padding-top: ${v}; padding-bottom: ${v};`
			: (v, l)=> `text-align: start; width: ${l}em; padding-left: ${v}; padding-right: ${v};`
		: this.#txs.tategaki
			? v=> `text-align: justify; text-align-last: justify; padding-top: ${v}; padding-bottom: ${v};`
			: v=> `text-align: justify; text-align-last: justify; padding-left: ${v}; padding-right: ${v};`;
		if (CmnLib.isFirefox) this.mkStyle_r_align = this.#mkStyle_r_align4ff;

		if ('alpha' in hArg) this.#cntBtn.children.forEach(e=> e.alpha = this.spLay.alpha);

		this.#set_ch_in(hArg);
		this.#set_ch_out(hArg);

		return this.#drawBack(hArg, isStop=> {if (isStop) TxtLayer.#main.resume()});
	}
	#set_ch_in(hArg: HArg) {
		const {in_style} = hArg;
		if (! in_style) return;
		const cis = TxtStage.getChInStyle(in_style);
		if (! cis) throw `存在しないin_style【${in_style}】です`;
		this.#$ch_in_style = in_style;
		this.#ch_in_join = cis.join;
	}
	#$ch_in_style	= '';
	#ch_in_join		= true;

	override get	width() {return this.#txs.getWidth}
	override get	height() {return this.#txs.getHeight}

	#set_ch_out(hArg: HArg) {
		const {out_style} = hArg;
		if (! out_style) return;
		const cos = TxtStage.getChOutStyle(out_style);
		if (! cos) throw `存在しないout_style【${out_style}】です`;
		this.#$ch_out_style = out_style;
	}
	#$ch_out_style	= '';

	#drawBack(hArg: HArg, fncComp: (isStop: boolean)=> void): boolean {
		if ('back_clear' in hArg) {
			if (argChk_Boolean(hArg, 'back_clear', false)) {
				this.#b_color = 0x000000;
				this.#b_alpha = 0;
				this.#b_alpha_isfixed = false;
				this.#b_pic = '';
			}
			fncComp(false);
			return false;
		}

		this.#b_alpha = argChk_Num(hArg, 'b_alpha', this.#b_alpha);
		this.#b_alpha_isfixed = argChk_Boolean(hArg, 'b_alpha_isfixed', this.#b_alpha_isfixed);
		const alpha = (this.#b_alpha_isfixed
			? 1
			: Number(TxtLayer.#val.getVal('sys:TextLayer.Back.Alpha'))
		) *this.#b_alpha;
		if (hArg.b_pic) {
			if (this.#b_pic !== hArg.b_pic) {
				this.#b_pic = hArg.b_pic;
				if (this.#b_do) {
					this.spLay.removeChild(this.#b_do);
					this.#b_do.destroy();
				}
				return GrpLayer.csv2Sprites(this.#b_pic, this.spLay, sp=> {
					this.#b_do = sp;
					sp.name = 'back(pic)';
					sp.visible = (alpha > 0);
					sp.alpha = alpha;
					//CmnLib.adjustRetinaSize(this.b_pic, sp);
					this.#txs.setSize(sp.width, sp.height);
						// ちなみに左上表示位置は本レイヤと同じ
					this.spLay.setChildIndex(sp, 0);
					fncComp(true);
				});
			}
		}
		else if ('b_color' in hArg) {
			this.#b_color = argChk_Color(hArg, 'b_color', 0x000000);
			if (this.#b_do) {
				this.spLay.removeChild(this.#b_do);
				this.#b_do.destroy();
			}
			this.#b_pic = '';	// 忘れずクリア
			this.spLay.addChildAt(
				(this.#b_do = new Graphics)
				.beginFill(this.#b_color)
				.lineStyle(undefined)
				.drawRect(0, 0, this.#txs.getWidth, this.#txs.getHeight)
				.endFill(), 0);
			this.#b_do.name = 'back(color)';
			//cacheAsBitmap = true;	// これを有効にするとスナップショットが撮れない？？
		}

		if (this.#b_do) {
			this.#b_do.visible = (alpha > 0);
				// 透明の時は表示しない。こうしないと透明テキストレイヤ下のボタンが
				// 押せなくなる（透明だが塗りがあるという扱いなので）
			this.#b_do.alpha = alpha;
		}
		fncComp(false);

		return false;
	}
	chgBackAlpha(g_alpha: number): void {
		const alpha = this.#b_alpha_isfixed
			? this.#b_alpha
			: g_alpha * this.#b_alpha;
		if (this.#b_do instanceof Graphics) {
			if (this.#b_do) {
				this.spLay.removeChild(this.#b_do);
				this.#b_do.destroy();
			}
			this.spLay.addChildAt(
				(this.#b_do = new Graphics)
				.beginFill(this.#b_color)
				.lineStyle(undefined)
				.drawRect(0, 0, this.#txs.getWidth, this.#txs.getHeight)
				.endFill(), 0);
			this.#b_do.name = 'back(color)';
			//cacheAsBitmap = true;	// これを有効にするとスナップショットが撮れない？？
		}
		if (this.#b_do) {
			this.#b_do.visible = (alpha > 0);
				// 透明の時は表示しない。こうしないと透明テキストレイヤ下のボタンが
				// 押せなくなる（透明だが塗りがあるという扱いなので）
			this.#b_do.alpha = alpha;
		}
	}

	#setFfs(hArg: HArg) {
		if ('noffs' in hArg) {
			this.#strNoFFS = hArg.noffs ?? '';
			this.#regNoFFS = new RegExp(`[　${this.#strNoFFS}]`);
		}
		if (! ('ffs' in hArg)) return;

		this.#ffs ??= '';
		this.#fncFFSStyle = (this.#ffs === '')
			? ()=> ''
			: ch=> this.#regNoFFS.test(ch)
				? ''
				: ` font-feature-settings: ${this.#ffs};`;
	}
	#ffs	= '';
	#fncFFSStyle	= (_ch: string)=> '';
	#strNoFFS	= '';
	#regNoFFS	= new RegExp('[　]');
	// Safariが全体に「font-feature-settings」した後、特定文字の「font-feature-settings: initial;」を受け付けてくれないのでわざわざ一つずつ指定


	static	chgDoRec(doRec: boolean) {
		TxtLayer.#rec = doRec
			? tx=> tx
			: tx=> `<span class='offrec'>${tx}</span>`;
				// 囲んだ領域は履歴で非表示
	}
	static	#rec = (tx: string)=> tx;

	isCur	= false;
	#ruby_pd: (v: string, l: number)=> string = ()=> '';
	private	mkStyle_r_align(ch: string, rb: string, r_align: string): string {
		if (! r_align) return '';

		const len = ch.length *2;
		if (len -rb.length < 0) return ` style='text-align: ${r_align};'`;

		let st = '';
		switch (r_align) {
		case 'justify':
			st = this.#ruby_pd('0', len);	break;
		case '121':
			st = this.#ruby_pd(`calc(${(len -rb.length) /(rb.length *2)}em)`, len);	break;
		case 'even':
			st = this.#ruby_pd(`calc(${(len -rb.length) /(rb.length +1)}em)`, len);	break;
		case '1ruby':
			st = this.#ruby_pd('1em', len);	break;
		default:
			st = `text-align: ${r_align};`;
		}
		return ` style='${st}'`;
	};
	#r_align	= '';
	#mkStyle_r_align4ff(ch: string, rb: string, r_align: string): string {
		if (! r_align) return '';

		const len = ch.length *2;
		if (len -rb.length < 0) return ` style='text-align: ${r_align};'`;

		let st = '';
		switch (r_align) {
			case 'left':	st = `ruby-align: start;`;	break;
			case 'center':	st = `ruby-align: center;`;	break;
			case 'right':	// エレガントにサポートできていない
				st = `ruby-align: start;`;	break;
			case 'justify':	st = `ruby-align: space-between;`;	break;
			case '121':		st = `ruby-align: space-around;`;	break;
			case 'even':
				const ev = (len -rb.length) /(rb.length +1);
				st = `ruby-align: space-between; `+
				(this.#txs.tategaki
					? `padding-top: ${ev}em; padding-bottom: ${ev}em;`
					: `padding-left: ${ev}em; padding-right: ${ev}em;`);
				break;
			case '1ruby':	st = `ruby-align: space-between; `+
				(this.#txs.tategaki
					? `padding-top: 1em; padding-bottom: 1em;`
					: `padding-left: 1em; padding-right: 1em;`);
				break;
			default:		st = `text-align: ${r_align};`;
		}
		return ` style='${st}'`;
	}

	tagCh(text: string): void {this.#rbSpl.putTxt(text);}
	#needGoTxt = false;
	readonly	#putCh	: IPutCh = (ch, ruby)=> {
		if (TxtLayer.#cfg.oCfg.debug.putCh) console.log(`🖊 文字表示 text:\`${ch}\` ruby:\`${ruby}\` name:\`${this.name_}\``);

		const a_ruby = ruby.split('｜');
		let add_htm = '';
		const [a0, a1] = a_ruby;
		switch (a_ruby.length) {
		case 1:		// 字or春《はる》
			this.#needGoTxt = true;
			if (ch === '\n') {
				if (this.#firstCh) {// １文字目にルビが無い場合、不可視ルビで行揃え
					this.#firstCh = false;
					add_htm = '<ruby>　<rt>　</rt></ruby><br/>';
				}
				else add_htm = '<br/>';
				break;
			}
			if (this.#firstCh) {	// １文字目にルビが無い場合、不可視ルビで行揃え
				this.#firstCh = false;
				if (ruby === '') ruby = '　';
			}
			add_htm = this.#tagCh_sub(ch, ruby, this.#r_align);
			break;

		case 2:		// 《grp｜{"id":"break","pic":"breakline"}》
			switch (a0) {	// ルビ揃え指定と同時シリーズ
			case 'start':	// 初期値
			case 'left':	//（肩付き）先頭親文字から、ルビ間は密着
			case 'center':	//（中付き）センター合わせ、〃
			case 'right':	//（右／下揃え）末尾親文字から、〃
			case 'justify':	//（両端揃え）先頭から末尾親文字間に、ルビ間は均等にあける
			case '121':		//（1-2-1(JIS)）ルビの前後を比率1、ルビ間を比率2であける
			case 'even':	//（均等アキ）ルビの前後、ルビ間も均等にあける
			case '1ruby':	//（1ルビ文字アキ）ルビの前後をルビ一文字空け、ルビ間は均等にあける
				this.#firstCh = false;
				this.#needGoTxt = true;
				add_htm = this.#tagCh_sub(ch, a1, a0);
				break;

			case 'gotxt':{
				this.#popSpan();
				if (this.isCur) TxtLayer.#recText(
					this.#aSpan.join('')
					.replace(/^<ruby>　<rt>　<\/rt><\/ruby>(<br\/>)+/, '')
						// 前方の空行をtrim
					.replace(/style='(anim\S+ \S+?;\s*)+/g, `style='`)
					.replace(/( style=''| data-(add|arg|cmd)='.+?'|\n+|\t+)/g, '')
					.replace(/class='sn_ch .+?'/g, `class='sn_ch'`)
						// 不要情報削除
					.replaceAll(`class='offrec'`, `style='display: none;'`)
						// 囲んだ領域は履歴で非表示
					.replaceAll('`', '\\`')
						// JSON対策
				);

				if (this.#needGoTxt) {
					this.#txs.goTxt(this.#aSpan);
					this.#needGoTxt = false;
					this.#cumDelay = 0;
				}
				else if (this.isCur) TxtLayer.#evtMng.noticeCompTxt();
			}	return;	// breakではない

			case 'add':{	// 文字幅を持たない汎用的な命令（必ずadd_closeすること）
				const o = JSON.parse(a1);	// [span]内[tcy]などに影響
				const {cl, sty} = this.#o2domArg(true, o.wait);
				this.#aSpan.push(`<span${cl} style='display: inline;${
					this.#stkASpan.at(-1)?.o.style ?? ''
				}${o.style ?? ''}${sty}'>`);	// "を"にしてはいけない
				delete o.style;
				this.#pushSpan(o);	// 先頭文字と一緒に出す。#cumDelayは触らない
			}	return;	// breakではない
			case 'add_close':
				this.#aSpan.push('</span>');
				this.#popSpan();
				return;	// breakではない

			case 'grp':	//	画像など 《grp｜{"id":"break","pic":"breakline"}》
				this.#needGoTxt = true;
			{
				const o = JSON.parse(a1);
				o.delay = this.#cumDelay;
				o.id ??= this.#aSpan.length;
				if (o.id === 'break') {this.#txs.dispBreak(o.pic); return;}
					// breakではない

				o.style ??= '';
				const {cl, sty, lnk} = this.#o2domArg(true, o.wait);
				add_htm = `<span data-cmd='grp' data-id='${o.id}'${cl} style='${sty} ${o.style ?? ''}'${lnk} data-arg='${JSON.stringify(o)}' data-add='{"ch_in_style":"${this.#$ch_in_style}", "ch_out_style":"${this.#$ch_out_style}"}'>　</span>`;
				if (this.#firstCh) {// １文字目にルビが無い場合、不可視ルビで行揃え
					this.#firstCh = false;
					add_htm = `<ruby>${add_htm}<rt>　</rt></ruby>`;
				}
			}
				break;

			case 'tcy':	// ルビ付き縦中横
				this.#firstCh = false;
				this.#needGoTxt = true;
			{
				if (TxtLayer.#val.doRecLog()) this.#page_text += ch
				+(ruby ?`《${ruby}》` :'');

				const o = JSON.parse(a1);
				const {t, r=''} = o;
				const rb = CmnLib.isSafari
					? (<string>r).replace(/[A-Za-z0-9]/g, s=> String.fromCharCode(s.charCodeAt(0) + 65248))
						// 英数字を全角に(Safariで縦中横ルビが半角文字だと、
						// 選択矩形が横倒しになる不具合対策)
					: r;
				const rs = this.mkStyle_r_align(t, rb, this.#r_align);
				const {cl, sty, lnk} = this.#o2domArg(true, o.wait);
					// text-combine-upright: all;			縦中横
					// -webkit-text-combine: horizontal;	縦中横(Safari)
				add_htm = `<span${cl} style='${sty}${this.#fncFFSStyle(t)} ${o.style ?? ''}'${lnk}><ruby><span style='
text-combine-upright: all;
-webkit-text-combine: horizontal;
				' data-add='{"ch_in_style":"${this.#$ch_in_style}", "ch_out_style":"${this.#$ch_out_style}"}'>${t}</span>
				<rt${rs}>${rb}</rt></ruby></span>`;
			}
				break;

			case 'del':	//if (a1 !== 'break') throw '文字レイヤdelコマンドは、現在id=breakのみサポートします';
				TxtStage.delBreak();
				return;	// breakではない

			case 'span':
				this.#popSpan();
				this.#needGoTxt = true;
			{
				const o = JSON.parse(a1);
				if (o.style) this.#pushSpan(o);
			}	return;	// breakではない

			case 'link':
				this.#popSpan();
				this.#needGoTxt = true;
			{
				const o = JSON.parse(a1);
				o[':link'] = ` data-lnk='@'`;
				const {cl, sty} = this.#o2domArg(false, o.wait);
				this.#aSpan.push(`<span data-arg='${a1}'${cl} style='display: inline; ${sty} ${o.style ?? ''}' data-add='{"ch_in_style":"${this.#$ch_in_style}", "ch_out_style":"${this.#$ch_out_style}"}'}>`);
				delete o.style;
				this.#pushSpan(o);	// 先頭文字と一緒に出す。#cumDelayは触らない
			}	return;	// breakではない

			case 'endlink':
				this.#needGoTxt = true;
				this.#aSpan.push('</span>');
				this.#popSpan();
				return;	// breakではない

			default:	// ルビあり文字列
				this.#needGoTxt = true;
				add_htm = this.#tagCh_sub(ch, ruby, this.#r_align);
			}
			break;
		}
		this.#aSpan.push(TxtLayer.#rec(add_htm));
	}
	#tagCh_sub(ch: string, ruby: string, r_align: string): string {
		if (ch === ' ') ch = '&nbsp;';
		if (TxtLayer.#val.doRecLog()) this.#page_text += ch +(ruby ?`《${ruby}》` :'');

		const {cl, sty, lnk} = this.#o2domArg(true, null, ch);
		const curpos = `${lnk} data-add='{"ch_in_style":"${this.#$ch_in_style}", "ch_out_style":"${this.#$ch_out_style}"}'`;
		const add_htm = `<span${cl} style='${sty}${this.#fncFFSStyle(ch)}'${
			ruby ?'': curpos
		}>${
			ruby ?`<ruby${curpos}>${ch}<rt${
				this.mkStyle_r_align(ch, ruby, r_align)
			}>${ruby}</rt></ruby>` :ch
		}</span>`;	// <span>に入れないと崩れる・一文字ずつ出ない

		return add_htm;
	}
	#o2domArg(isAddWait: boolean, argWait: number | null, ch = '\n') {
		const pWait = this.#stkASpan.at(0)?.o.wait;
		const wait = (! this.#ch_in_join) ?0 :argWait ?? pWait
		?? TxtLayer.#doAutoWc
			? TxtLayer.#hAutoWc[ch.charAt(0)] ?? 0
			: LayerMng.msecChWait;
		if (TxtLayer.#evtMng.isSkippingByKeyDown()) this.#cumDelay = 0;
		else if (isAddWait && this.#ch_in_join) this.#cumDelay += wait;

		return {
			cl	: ` class='sn_ch${
				wait > 0 ?` sn_ch_in_${this.#$ch_in_style}` :''
			}'`,
			sty	: `animation-delay: ${this.#cumDelay}ms;${
				this.#stkASpan.at(-1)?.o?.style ?? ''
			}`,
			lnk	: this.#stkASpan.at(0)?.o[':link'] ?? '',
		};
	}
	#cumDelay	= 0;
	#firstCh	= true;
	#aSpan		: string[]	= [];
	#stkASpan	: {
		o		: {
			style?		: string;
			':link'?	: string;
			wait?		: number;
		};
		r_align			: string;
		ch_in_style		: string;
		ch_out_style	: string;
	}[] = [];

	#pushSpan(o :any) {
		this.#stkASpan.push({
			o,
			r_align			: this.#r_align,
			ch_in_style		: this.#$ch_in_style,
			ch_out_style	: this.#$ch_out_style,
		});
		if ('r_align' in o) this.#r_align = o.r_align;
		this.#set_ch_in(o);
		this.#set_ch_out(o);
	}
	#popSpan() {
		const stk = this.#stkASpan.pop();
		if (! stk) return;

		this.#r_align = stk.r_align;
		this.#set_ch_in({in_style: stk.ch_in_style});
		this.#set_ch_out({out_style: stk.ch_out_style});
	}

	readonly click = ()=> {	// true: 文字出現中だったので、停止する
		if (! this.spLay.interactiveChildren || ! this.spLay.visible) return false;
		return this.#txs.skipChIn();
	}

	clearText(): void {
		this.spLay.addChild(this.#txs = this.#txs.reNew());

		this.#cumDelay = 0;
		this.#firstCh = true;
		this.#aSpan = [];
		this.#page_text = '';
		TxtLayer.#recText('', true);
	}
	#page_text	= '';
	get pageText() {return this.#page_text.replace('《　》', '')}

	get enabled() {return this.spLay.interactiveChildren}
	set enabled(e) {this.spLay.interactiveChildren = e}

	readonly	addButton = (hArg: HArg)=> new Promise<void>(re=> {
		hArg.key = `btn=[${this.#cntBtn.children.length}] `+ this.name_;
		hArg[':id_tag'] = hArg.key.slice(0, -7);	// Design用
		argChk_Boolean(hArg, 'hint_tate', this.#txs.tategaki);	// hint用
		const btn = new Button(hArg, TxtLayer.#evtMng, ()=> re(), ()=> this.canFocus());
		btn.name = JSON.stringify(hArg).replaceAll('"', "'");// playback時に使用
		this.#cntBtn.addChild(btn);
	});
	canFocus(): boolean {
		return (this.spLay.interactiveChildren ?? false) && this.spLay.visible
			&& TxtLayer.#isPageFore(this);
	}


	override clearLay(hArg: HArg): void {
		super.clearLay(hArg);

		this.clearText();
		// 上で呼ばれる this.#evtMng.escapeHint();	// Hintごとdestroyされるのを回避
		this.#cntBtn.removeChildren().forEach(c=> c.destroy());
	}
	override readonly record = ()=> {return <any>{...super.record(),
		enabled	: this.enabled,
		r_align	: this.#r_align,

		// バック
		b_do	: (this.#b_do === undefined)
					? undefined
					: (this.#b_do instanceof Sprite ?'Sprite' :'Graphics'),
		b_pic	: this.#b_pic,
		b_color	: this.#b_color,
		b_alpha	: this.#b_alpha,
		b_alpha_isfixed	: this.#b_alpha_isfixed,

		ffs		: this.#ffs,
		txs		: this.#txs.record(),
		strNoFFS: this.#strNoFFS,

		btns	: this.#cntBtn.children.map(btn=> btn.name),
	}};
	override playback(hLay: any, aPrm: Promise<void>[]): void {
		super.playback(hLay, aPrm);
		this.enabled	= hLay.enabled;
		this.#r_align	= hLay.r_align;
		this.cvsResize();

		this.#setFfs(hLay);
		this.#txs.playback(hLay.txs);
		// 文字背景サイズは TxtStage を参照するのでこの順で
		this.#b_alpha			= hLay.b_alpha;
		this.#b_alpha_isfixed	= hLay.b_alpha_isfixed;
		aPrm.push(new Promise<void>(re=> {
			const h: HArg = (hLay.b_do)
				? (hLay.b_do === 'Sprite'
					? {b_pic: hLay.b_pic}
					: {b_color: hLay.b_color})
				: {b_pic: ''};
			h.b_alpha = hLay.b_alpha;
			h.b_alpha_isfixed = hLay.b_alpha_isfixed;
			if (! this.#drawBack(h, isStop=> {if (isStop) re()})) re();
		}));

		const aBtn: string[] = hLay.btns;
		aPrm = aPrm.concat(aBtn.map(v=> this.addButton(JSON.parse(v.replaceAll(`'`, '"')))));
	}

	override snapshot(rnd: Renderer, re: ()=> void) {
		rnd.render(this.spLay, {clear: false});
		this.#txs.snapshot(rnd, re);
	}
	override snapshot_end() {this.#txs.snapshot_end();}

	override makeDesignCast(gdc: IMakeDesignCast) {
		if (! this.spLay.visible) return;
		this.#txs.makeDesignCast(gdc);
	}
	override makeDesignCastChildren(gdc: IMakeDesignCast) {
		if (! this.spLay.visible) return;
		this.#cntBtn.children.forEach(btn=> (btn as Button).makeDesignCast(gdc));
	}

	override showDesignCast() {this.#txs.showDesignCast();}
	override showDesignCastChildren() {
		this.#cntBtn.children.forEach(btn=> (btn as Button).showDesignCast());
	}

	override dump(): string {
		this.#putCh('', 'gotxt｜');	// バッファの文字を印字してしまう

		return super.dump() +`, "enabled":"${this.enabled}", ${this.#txs.dump()
		}, "b_pic":"${this.#b_pic}", "b_color":"${this.#b_color
		}", "b_alpha":${this.#b_alpha}, "b_alpha_isfixed":"${this.#b_alpha_isfixed
		}", "width":${this.#txs.getWidth}, "height":${this.#txs.getHeight
		}, "pixi_obj":[${
			this.spLay.children.map(e=> `{"class":"${
				(e instanceof Sprite) ?'Sprite' :(
					(e instanceof Graphics) ?'Graphics' :(
						(e instanceof Container) ?'Container' :'?'
					)
				)
			}", "name":"${e.name}", "alpha":${e.alpha}, "x":${e.x}, "y":${e.y}, "visible":"${e.visible}"}`).join(',')
		}], "button":[${
			this.#cntBtn.children.map(d=> (d as Container).children[0].name ?? '{}').join(',')
		}]`;
	}

}
