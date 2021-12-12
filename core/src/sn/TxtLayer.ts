/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2021 Famibee (famibee.blog38.fc2.com)

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

import {Sprite, DisplayObject, Graphics, Container, Renderer} from 'pixi.js';

export class TxtLayer extends Layer {
	static	#cfg		: Config;
	static	#val		: IVariable;
	static	#recText	: (txt: string, pagebreak?: boolean)=> void;
	static	#isPageFore	: (me: TxtLayer)=> boolean;
	static	init(cfg: Config, hTag: IHTag, val: IVariable, recText: (txt: string)=> void, isPageFore: (me: TxtLayer)=> boolean): void {
		TxtLayer.#cfg = cfg;
		TxtStage.init(cfg);
		TxtLayer.#val = val;
		TxtLayer.#recText = recText;
		TxtLayer.#isPageFore = isPageFore;

		val.setDoRecProc(TxtLayer.chgDoRec);

		hTag.autowc			= o=> TxtLayer.#autowc(o);	// 文字を追加する
		const o: any = {enabled: 'false', text: '', time: ''};
		hTag.autowc(o);
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
		const name = hArg.name;
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
`		);

		return false;
	}
	// 文字消去演出
	static	#ch_out_style(hArg: HArg) {
		const o = TxtStage.ch_out_style(hArg);
		const x = (o.x.charAt(0) === '=') ?`${o.nx *100}%` :`${o.nx}px`;
		const y = (o.y.charAt(0) === '=') ?`${o.ny *100}%` :`${o.ny}px`;
		const name = hArg.name;
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
	static setEvtMng(main: IMain, evtMng: IEvtMng) {
		TxtLayer.#main = main;
		TxtLayer.#evtMng = evtMng;
		TxtStage.setEvtMng(evtMng);
	}

	// 文字ごとのウェイト
	static #doAutoWc	= false;
	static #hAutoWc	: {[ch: string]: number}	= {};
	static #autowc(hArg: HArg) {
		TxtLayer.#doAutoWc = argChk_Boolean(hArg, 'enabled', TxtLayer.#doAutoWc);
		TxtLayer.#val.setVal_Nochk('save', 'const.sn.autowc.enabled', TxtLayer.#doAutoWc);

		const ch = hArg.text;
		if (('text' in hArg) !== ('time' in hArg)) throw '[autowc] textとtimeは同時指定必須です';
		TxtLayer.#val.setVal_Nochk('save', 'const.sn.autowc.text', ch);
		if (! ch) {
			TxtLayer.#val.setVal_Nochk('save', 'const.sn.autowc.time', '');
			return false;
		}

		const len = ch.length;
		if (TxtLayer.#doAutoWc && len === 0) throw '[autowc] enabled === false かつ text === "" は許されません';

		const a = String(hArg.time).split(',');
		if (a.length !== len) throw '[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい';
		TxtLayer.#hAutoWc = {};	// 毎回クリアを仕様とする
		a.forEach((v, i)=> TxtLayer.#hAutoWc[ch[i]] = uint(v));
		TxtLayer.#val.setVal_Nochk('save', 'const.sn.autowc.time', hArg.time);

		return false;
	}


	// バック
	#b_color			= 0x000000;
	#b_alpha			= 0;
	#b_alpha_isfixed	= false;
	#b_do			: DisplayObject | null	= null;
	#b_pic			= '';	// 背景画像無し（＝単色塗り）

	// 文字表示
	#txs	= new TxtStage(this.spLay, ()=>this.canFocus());

	#rbSpl	= new RubySpliter;

	#cntBtn	= new Container;

	constructor() {
		super();

		this.spLay.addChild(this.#txs);

		this.#rbSpl.init(this.#putCh);

		this.spLay.addChild(this.#cntBtn);	// ボタンはpaddingの影響を受けない
		this.#cntBtn.name = 'cntBtn';

		const padding = 16 *CmnLib.retinaRate;	// 初期padding
		this.lay({style: `width: ${CmnLib.stageW}px; height: ${CmnLib.stageH}px; font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif; color: white; font-size: 24px; line-height: 1.5; padding: ${padding}px;`, in_style: 'default', out_style: 'default', back_clear: 'true'});
	}
	override destroy() {
		if (this.#b_do) {this.spLay.removeChild(this.#b_do).destroy(); this.#b_do = null}

		this.clearText();
		this.#txs.destroy();

		TxtLayer.#doAutoWc = false;
		TxtLayer.#hAutoWc = {};

		TxtLayer.rec = (tx: string)=> tx;
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
		const ins = hArg.in_style;
		if (! ins) return;
		const cis = TxtStage.getChInStyle(ins);
		if (! cis) throw `存在しないin_style【${ins}】です`;
		this.#$ch_in_style = ins;
		this.#ch_in_join = cis.join;
	}
	#$ch_in_style	= '';
	#ch_in_join		= true;

	override get	width() {return this.#txs.getWidth}
	override get	height() {return this.#txs.getHeight}

	#set_ch_out(hArg: HArg) {
		const outs = hArg.out_style;
		if (! outs) return;
		const cos = TxtStage.getChOutStyle(outs);
		if (! cos) throw `存在しないout_style【${outs}】です`;
		this.#$ch_out_style = outs;
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
		if (this.#ffs === '') {
			this.#fncFFSStyle = ()=> '';
			this.#fncFFSSpan = ch=> ch;
		}
		else {
			this.#fncFFSStyle = ch=> this.#regNoFFS.test(ch)
				? ''
				: ` font-feature-settings: ${this.#ffs};`;
			this.#fncFFSSpan = ch=> this.#regNoFFS.test(ch)
				? ch
				: `<span style='font-feature-settings: ${this.#ffs};'>${ch}</span>`;
		}
	}
	#ffs	= '';
	#fncFFSStyle	= (_ch: string)=> '';
	#fncFFSSpan		= (ch: string)=> ch;
	#strNoFFS	= '';
	#regNoFFS	= new RegExp('[　]');
	// Safariが全体に「font-feature-settings」した後、特定文字の「font-feature-settings: initial;」を受け付けてくれないのでわざわざ一つずつ指定


	static	chgDoRec(doRec: boolean) {
		TxtLayer.rec = doRec
			? (tx: string)=> tx
			: (tx: string)=> `<span class='offrec'>${tx}</span>`;
				// 囲んだ領域は履歴で非表示
	}
	static	rec = (tx: string)=> tx;

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
	#putCh	: IPutCh = (ch, ruby)=> {
		if (TxtLayer.#cfg.oCfg.debug.putCh) console.log(`🖊 文字表示 text:\`${ch}\` ruby:\`${ruby}\` name:\`${this.name_}\``);

		const a_ruby = ruby.split('｜');
		let add_htm = '';
		const isSkip = TxtLayer.#evtMng.isSkipKeyDown();
		switch (a_ruby.length) {
		case 1:		// 字or春《はる》
			this.#needGoTxt = true;
			if (ch === '\n') {
				if (this.#aSpan_bk) {
					add_htm = this.#aSpan_bk.slice(-1)[0];
					this.#autoCloseSpan();
					this.#aSpan.push(TxtLayer.rec('<br/>'));
					this.#aSpan.push(add_htm);	// ここでaSpan末尾に追加しないと続かない
					this.#aSpan_bk = this.#aSpan;
					this.#aSpan = [];
					return;	// breakではない
				}
				if (this.#firstCh) {	// １文字目にルビが無い場合は不可視ルビで、行揃え
					this.#firstCh = false;
					add_htm = '<ruby>　<rt>　</rt></ruby><br/>';
				}
				else {
					add_htm = '<br/>';
				}
				break;
			}
			if (this.#firstCh) {	// １文字目にルビが無い場合は見えないルビで、行揃え
				this.#firstCh = false;
				if (ruby === '') ruby = '　';
			}
			add_htm = this.#tagCh_sub(ch, ruby, isSkip, this.#r_align);
			break;

		case 2:		// 《grp｜{"id":"break","pic":"breakline"}》
			switch (a_ruby[0]) {
			// ルビ揃え指定と同時シリーズ
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
				add_htm = this.#tagCh_sub(ch, a_ruby[1], isSkip, a_ruby[0]);
				break;

			case 'gotxt':
			{
				this.#autoCloseSpan();
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

				if (! this.#needGoTxt) return;	// breakではない
				this.#txs.goTxt(	// クリック待ち用ダミー空白を追加
					[...this.#aSpan, this.#tagCh_sub('　', '', false, '')]
				);
				this.#needGoTxt = false;
				this.#cumDelay = 0;
				return;	// breakではない
			}

			case 'add':	// 文字幅を持たない汎用的な命令（必ずadd_closeすること）
			{
				const o = JSON.parse(a_ruby[1]);
				o.style ??= '';
				this.#beginSpan(o);
				if (this.#aSpan_bk) this.#autoCloseSpan();
				else {
					if (isSkip) this.#cumDelay = 0;
					const wait = Number(o.wait ?? -1);
					const sn_ch = (wait === 0)
						? ''
						: ` sn_ch_in_${this.#$ch_in_style}`;
					const ad = (wait < 0)
						? ''
						: ` animation-duration: ${wait}ms;`
					this.#aSpan.push(`<span class='sn_ch${sn_ch}' style='animation-delay: ${this.#cumDelay}ms;${ad} ${o.style}' data-add='${JSON.stringify(o)}'>`);	// "を"にしてはいけない
				}
				this.#aSpan_bk = this.#aSpan;
				this.#aSpan = [];
			}
				return;	// breakではない
			case 'add_close':
				this.#autoCloseSpan();
				return;	// breakではない

			case 'grp':	//	画像など 《grp｜{"id":"break","pic":"breakline"}》
				this.#needGoTxt = true;
			{
				if (isSkip) this.#cumDelay = 0;
				const arg = (a_ruby[1] ?a_ruby[1].slice(0, -1) +',' :`{`) +`"delay": ${this.#cumDelay}}`;
				if (this.#ch_in_join) this.#cumDelay += (TxtLayer.#doAutoWc) ?0 :LayerMng.msecChWait;

				const o = JSON.parse(arg);
				o.style ??= '';
				if (! ('id' in o)) o.id = this.#aSpan.length;
				if (o.id === 'break') {this.#txs.dispBreak(o.pic); return;}
					// breakではない
				add_htm = `<span data-cmd='grp' data-id='${o.id}' data-arg='${arg}'`;
				const wait = Number(o.wait ?? -1);
				const sn_ch = (wait === 0)
					? ''
					: ` sn_ch_in_${this.#$ch_in_style}`;
				const ad = (wait < 0)
					? ''
					: ` animation-duration: ${wait}ms;`
				add_htm += ` class='sn_ch${sn_ch}' style='animation-delay: ${this.#cumDelay}ms;${ad} ${o.style}' data-add='{"ch_in_style":"${this.#$ch_in_style}", "ch_out_style":"${this.#$ch_out_style}"}'>　</span>`;
				if (this.#firstCh) {	// １文字目にルビが無い場合は不可視ルビで、行揃え
					this.#firstCh = false;
					add_htm = `<ruby>${add_htm}<rt>　</rt></ruby>`;
				}
				if (this.#aSpan.slice(-1)[0] === add_htm) return;	// breakではない
			}
				break;

			case 'del':
				const id_del = a_ruby[1];
				if (id_del !== 'break') throw '文字レイヤdelコマンドは、現在id=breakのみサポートします';

				TxtStage.delBreak();
				return;	// breakではない

			case 'span':
				this.#autoCloseSpan();
				this.#needGoTxt = true;
			{
				// style, in_style
				const o = JSON.parse(a_ruby[1]);
			//	o.style ??= '';
				this.#beginSpan(o);
				if (! o.style) return;	// breakではない

				if (isSkip) this.#cumDelay = 0;
				const wait = Number(o.wait ?? -1);
				const sn_ch = (wait === 0)
					? ''
					: ` sn_ch_in_${this.#$ch_in_style}`;
				const ad = (wait < 0)
					? ''
					: ` animation-duration: ${wait}ms;`
				this.#aSpan.push(`<span class='sn_ch${sn_ch}' style='animation-delay: ${this.#cumDelay}ms;${ad} ${o.style}' data-add='{"ch_in_style":"${this.#$ch_in_style}", "ch_out_style":"${this.#$ch_out_style}"}'>`);
				this.#aSpan_bk = this.#aSpan;
				this.#aSpan = [];
			}
				return;	// breakではない

			case 'link':
				this.#autoCloseSpan();
				this.#needGoTxt = true;
			{
				// b_color, b_alpha, fn, label
				const o = JSON.parse(a_ruby[1]);
				o.style ??= '';
				this.#beginSpan(o);
				if (isSkip) this.#cumDelay = 0;
				const wait = Number(o.wait ?? -1);
				const sn_ch = (wait === 0)
					? ''
					: ` sn_ch_in_${this.#$ch_in_style}`;
				const ad = (wait < 0)
					? ''
					: ` animation-duration: ${wait}ms;`
				this.#aSpan_link = ` data-cmd='link' data-arg='${a_ruby[1]}'`;
				this.#aSpan.push(`<span${this.#aSpan_link} class='sn_ch${sn_ch}' style='animation-delay: ${this.#cumDelay}ms;${ad} ${o.style}' data-add='{"ch_in_style":"${this.#$ch_in_style}", "ch_out_style":"${this.#$ch_out_style}"}'>`);
				this.#aSpan_bk = this.#aSpan;
				this.#aSpan = [];
			}
				return;	// breakではない

			case 'endlink':
				this.#needGoTxt = true;
				if (this.#aSpan_bk) this.#aSpan = this.#aSpan.map(
					v=> v.replace(/ data-cmd='linkrsv'/, this.#aSpan_link));
				this.#autoCloseSpan();	return;	// breakではない

			default:	// ルビあり文字列
				this.#needGoTxt = true;
				add_htm = this.#tagCh_sub(ch, ruby, isSkip, this.#r_align);
			}
			break;

		case 3:		// 《tcy｜451｜かし》
			this.#firstCh = false;
			this.#needGoTxt = true;
			switch (a_ruby[0]) {
			case 'tcy':	// ルビ付き縦中横
			{
				if (TxtLayer.#val.doRecLog()) this.#page_text += ch
				+(ruby ?`《${ruby}》` :'');

				// text-combine-upright: all;			縦中横
				// -webkit-text-combine: horizontal;	縦中横(Safari)
				const tx = a_ruby[1];
				const id_tcy = (tx.length > 1)
					? (this.#aSpan.length +1)	// 0にならないよう +1
					: '';
				const rb = CmnLib.isSafari
					? a_ruby[2].replace(/[A-Za-z0-9]/g, s=> String.fromCharCode(s.charCodeAt(0) + 65248))
						// 英数字を全角に(Safariで縦中横ルビが半角文字だと、
						// 選択矩形が横倒しになる不具合対策)
					: a_ruby[2];
				if (isSkip) this.#cumDelay = 0;
				const rs = this.mkStyle_r_align(tx, rb, this.#r_align);
				add_htm = rb
					? (this.#aSpan_bk
						? (`<ruby><span data-tcy='${id_tcy}' style='
								text-combine-upright: all;
								-webkit-text-combine: horizontal;
								${this.#fncFFSStyle(tx)}
							' data-add='{"ch_in_style":"${this.#$ch_in_style}", "ch_out_style":"${this.#$ch_out_style}"}' data-cmd='linkrsv'>${tx}</span>`
							+`<rt${rs}>${rb}</rt></ruby>`)
						: (`<span class='sn_ch sn_ch_in_${this.#$ch_in_style}' style='animation-delay: ${this.#cumDelay}ms;'>`
							+`<ruby><span data-tcy='${id_tcy}' style='
									text-combine-upright: all;
									-webkit-text-combine: horizontal;
									${this.#fncFFSStyle(tx)}
								' data-add='{"ch_in_style":"${this.#$ch_in_style}", "ch_out_style":"${this.#$ch_out_style}"}'>${tx}</span>`
								+`<rt${rs}>${rb}</rt></ruby>`
						+`</span>`))
					: (this.#aSpan_bk
						? (`<span data-tcy='${id_tcy}' style='
							text-combine-upright: all;
							-webkit-text-combine: horizontal;
							${this.#fncFFSStyle(tx)}
						' data-add='{"ch_in_style":"${this.#$ch_in_style}", "ch_out_style":"${this.#$ch_out_style}"}' data-cmd='linkrsv'>${tx}</span>`)
						: `<span data-tcy='${id_tcy}' style='
							text-combine-upright: all;
							-webkit-text-combine: horizontal;
							animation-delay: ${this.#cumDelay}ms;
							height: 1em;
							${this.#fncFFSStyle(tx)}
						' class='sn_ch sn_ch_in_${this.#$ch_in_style}' data-add='{"ch_in_style":"${this.#$ch_in_style}", "ch_out_style":"${this.#$ch_out_style}"}'>${tx}</span>`);
				if (this.#ch_in_join) this.#cumDelay += (TxtLayer.#doAutoWc)
					? TxtLayer.#hAutoWc[ch.charAt(0)] ?? 0
					: LayerMng.msecChWait;
			}
				break;

			default:
				throw `異常な値です putCh(text: ${ch}, ruby: ${ruby})`;
			}
			break;
		}
		this.#aSpan.push(TxtLayer.rec(add_htm));
	}
	#tagCh_sub(ch: string, ruby: string, isSkip: boolean, r_align: string): string {
		if (ch === ' ') ch = '&nbsp;';
		if (TxtLayer.#val.doRecLog()) this.#page_text += ch
		+(ruby ?`《${ruby}》` :'');

		let add_htm = '';
		const rs = this.mkStyle_r_align(ch, ruby, r_align);
		if (isSkip) this.#cumDelay = 0;
		add_htm = ruby
			? (this.#aSpan_bk
				? `<ruby style='${this.#fncFFSStyle(ch)}' data-add='{"ch_in_style":"${this.#$ch_in_style}", "ch_out_style":"${this.#$ch_out_style}"}' data-cmd='linkrsv'>${ch}<rt${rs}>${ruby}</rt></ruby>`
				: (`<span class='sn_ch sn_ch_in_${this.#$ch_in_style}' style='animation-delay: ${this.#cumDelay}ms;${this.#fncFFSStyle(ch)}'>`
					+`<ruby data-add='{"ch_in_style":"${this.#$ch_in_style}", "ch_out_style":"${this.#$ch_out_style}"}'>${ch}<rt${rs}>${ruby}</rt></ruby>`
				+`</span>`))
			: (this.#aSpan_bk
				? this.#fncFFSSpan(ch)
				: `<span class='sn_ch sn_ch_in_${this.#$ch_in_style}' style='animation-delay: ${this.#cumDelay}ms;${this.#fncFFSStyle(ch)}' data-add='{"ch_in_style":"${this.#$ch_in_style}", "ch_out_style":"${this.#$ch_out_style}"}'>${ch}</span>`);
		if (this.#ch_in_join) this.#cumDelay += TxtLayer.#doAutoWc
			? TxtLayer.#hAutoWc[ch.charAt(0)] ?? 0
			: LayerMng.msecChWait;

		return add_htm;
	}
	#cumDelay	= 0;
	#firstCh	= true;
	#aSpan		: string[]		= [];
	#aSpan_bk	: any[] | null	= null;
	#aSpan_link	= '';

	#hSpanBk = {
		ch_in_style	: '',
		ch_out_style: '',
		r_align		: '',
	};
	#beginSpan(o :any) {
		this.#hSpanBk.ch_in_style = this.#$ch_in_style;
		this.#set_ch_in(o);
		this.#hSpanBk.ch_out_style = this.#$ch_out_style;
		this.#set_ch_out(o);
		this.#hSpanBk.r_align = this.#r_align;
		if ('r_align' in o) this.#r_align = o.r_align;
	}
	#autoCloseSpan() {
		if (! this.#aSpan_bk) return;

		this.#aSpan_bk.push(this.#aSpan, '</span>')
		this.#aSpan = Array.prototype.concat.apply([], this.#aSpan_bk);
		this.#aSpan_bk = null;

		this.#set_ch_in({in_style: this.#hSpanBk.ch_in_style});
		this.#set_ch_out({out_style: this.#hSpanBk.ch_out_style});
		this.#r_align = this.#hSpanBk.r_align;
	}

	readonly click = ()=> {
		if (! this.spLay.interactiveChildren || ! this.spLay.visible) return true;
		return this.#txs.skipChIn();	// true is stay
	}

	clearText(): void {
		this.spLay.addChild(this.#txs = this.#txs.reNew());

		this.#cumDelay = 0;
		this.#firstCh = true;
		this.#aSpan = [];
		this.#aSpan_bk = null;
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
	override readonly record = ()=> Object.assign(<any>super.record(), {
		enabled	: this.enabled,
		r_align	: this.#r_align,

		// バック
		b_do	: (this.#b_do === null)
					? null
					: (this.#b_do instanceof Sprite ?'Sprite' :'Graphics'),
		b_pic	: this.#b_pic,
		b_color	: this.#b_color,
		b_alpha	: this.#b_alpha,
		b_alpha_isfixed	: this.#b_alpha_isfixed,

		ffs		: this.#ffs,
		txs		: this.#txs.record(),
		strNoFFS: this.#strNoFFS,

		btns	: this.#cntBtn.children.map(btn=> btn.name),
	});
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
			if (! this.#drawBack(
				(hLay.b_do)
				? (hLay.b_do === 'Sprite'
					? {b_pic: hLay.b_pic}
					: {b_color: hLay.b_color})
				: {b_pic: ''},
				isStop=> {if (isStop) re()}
			)) re();
		}));

		const aBtn: string[] = hLay.btns;
		aPrm = aPrm.concat(aBtn.map(v=> this.addButton(JSON.parse(v.replaceAll(`'`, '"')))));
	}

	override snapshot(rnd: Renderer, re: ()=> void) {
		rnd.render(this.spLay, undefined, false);
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
