/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Layer} from './Layer';
import {uint, CmnLib, IEvtMng, argChk_Boolean, argChk_Num, initStyle, addStyle, argChk_Color} from './CmnLib';
import {IHTag, HArg} from './Grammar';
import {IVariable, IPutCh, IRecorder} from './CmnInterface';
import {TxtStage} from './TxtStage';
import {Config} from './Config';
import {RubySpliter} from './RubySpliter';
import {SpritesMng} from './SpritesMng';
import {Button} from './Button';
import {LayerMng, IMakeDesignCast} from './LayerMng';
import {SysBase} from './SysBase';
import {DebugMng} from './DebugMng';
import {SEARCH_PATH_ARG_EXT} from './ConfigBase';
import {enableEvent, disableEvent} from './ReadState';
import {ScriptIterator} from './ScriptIterator';

import {Sprite, DisplayObject, Graphics, Container, Renderer, Application} from 'pixi.js';


export class TxtLayer extends Layer {
	static	#cfg		: Config;
	static	#val		: IVariable;
	static	#isPageFore	: (me: TxtLayer)=> boolean;
	static	#recorder	: IRecorder;
	static	init(cfg: Config, hTag: IHTag, val: IVariable, recorder: IRecorder, isPageFore: (me: TxtLayer)=> boolean, appPixi: Application): void {
		TxtLayer.#cfg = cfg;
		TxtStage.init(cfg, appPixi);
		TxtLayer.#val = val;
		TxtLayer.#recorder = recorder;
		TxtLayer.#isPageFore = isPageFore;

		val.setDoRecProc(TxtLayer.chgDoRec);

		hTag.autowc			= o=> TxtLayer.#autowc(o);	// 文字を追加する
		hTag.autowc({enabled: false, text: '', time: 0});
		hTag.ch_in_style	= o=> TxtLayer.#ch_in_style(o);	// 文字出現演出
		hTag.ch_out_style	= o=> TxtLayer.#ch_out_style(o);	// 文字消去演出

		// ギャラリーリロード用初期化
		TxtStage.initChStyle();
		initStyle();

		addStyle(
			cfg.matchPath('.+', SEARCH_PATH_ARG_EXT.FONT)
			.flatMap(o=> Object.values(o).map(v=> `
@font-face {
	font-family: '${v}';
	src: url('${this.#cfg.searchPath(v, SEARCH_PATH_ARG_EXT.FONT)}');
}
`)).join('')

			// 文字出現演出関係
			+`
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
`	// 「sn_ch」と「sn_ch_in_〜」の中身が重複しているが、これは必須
		);

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
		const x = (o.x.at(0) === '=') ?`${o.nx *100}%` :`${o.nx}px`;
		const y = (o.y.at(0) === '=') ?`${o.ny *100}%` :`${o.ny}px`;
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
	from {transform: rotate(${o.rotate}deg) scale(${o.scale_x}, ${o.scale_y}) translate(${x}, ${y})}
	to {opacity: 1; transform: none;}
}
`);

		return false;
	}
	// 文字消去演出
	static	#ch_out_style(hArg: HArg) {
		const o = TxtStage.ch_out_style(hArg);
		const x = (o.x.at(0) === '=') ?`${o.nx *100}%` :`${o.nx}px`;
		const y = (o.y.at(0) === '=') ?`${o.ny *100}%` :`${o.ny}px`;
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


	static	#evtMng	: IEvtMng;
	static	#sys	: SysBase;
	static setEvtMng(evtMng: IEvtMng, sys: SysBase, scrItr: ScriptIterator) {
		TxtLayer.#evtMng = evtMng;
		TxtLayer.#sys = sys;
		TxtStage.setEvtMng(evtMng, scrItr);
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

	readonly	#rbSpl	= new RubySpliter;
	readonly	#htmRb	= document.createElement('span');// cssチェック・保存用
	static	readonly	#hWarnR_Style = {
		'text-align'		: 0,
		'text-align-last'	: 0,
		'height'	: 0,
		'width'		: 0,
		'padding-left'		: 0,
		'padding-right'		: 0,
		'padding-top'		: 0,
		'padding-bottom'	: 0,
	};

	readonly	#cntBtn: Container<Button>	= new Container;

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
		if (this.#b_do) {this.spLay.removeChild(this.#b_do).destroy(); this.#b_do = undefined}

		TxtLayer.#recorder.recPagebreak();
		this.#txs.destroy();
	}
	static	destroy() {
		TxtLayer.#doAutoWc = false;
		TxtLayer.#hAutoWc = {};

		TxtLayer.#rec = tx=> tx;
	}
	override set name(nm: string) {this.name_ = nm; this.#txs.name = nm}
	override get name() {return this.name_}	// getは継承しないらしい


	override cvsResize() {this.#txs.cvsResize()}
	override cvsResizeChildren() {
		for (const b of this.#cntBtn.children) b.cvsResize();
	}

	protected	override	procSetX(x: number) {this.#txs.lay({x})}
	protected	override	procSetY(y: number) {this.#txs.lay({y})}

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
		if (CmnLib.isFirefox) this.#mkStyle_r_align = this.#mkStyle_r_align4ff;

		if ('r_style' in hArg) {
			if (hArg.r_style) {
				const cln = document.createElement('span');
				cln.style.cssText = hArg.r_style;
				const len = cln.style.length;
				const s = this.#htmRb.style;
				for (let i=0; i<len; ++i) {
					const key: any = cln.style[i];
					if (key in TxtLayer.#hWarnR_Style) {
						DebugMng.myTrace(`${key}は指定できません`, 'W');
						continue;
					}
					s[key] = cln.style[key];
				}
	//			if ((! cln.style.opacity) && ('alpha' in hArg)) s.opacity = String(this.spLay.alpha);
			}
			else this.#htmRb.style.cssText = '';
		}

		if ('alpha' in hArg) for (const b of this.#cntBtn.children) b.alpha = this.spLay.alpha;

		this.#set_ch_in(hArg);
		this.#set_ch_out(hArg);

		const ret = this.#drawBack(hArg, isStop=> {if (isStop) enableEvent()});
		if (ret) disableEvent();
		return ret;
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

	#sps	= new SpritesMng;
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
					this.spLay.removeChild(this.#b_do);	// Graphics かも
					this.#b_do.destroy();	// Graphics かも
				}
				//this.#sps.destroy();	// Graphics かもなので使用不可
				this.#sps = new SpritesMng(this.#b_pic, this.spLay, sp=> {
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
				return this.#sps.ret;
			}
		}
		else if ('b_color' in hArg) {
			this.#b_color = argChk_Color(hArg, 'b_color', 0x000000);
			if (this.#b_do) {
				this.spLay.removeChild(this.#b_do);	// Graphics かも
				this.#b_do.destroy();	// Graphics かも
				//this.#sps.destroy();	// Graphics かもなので使用不可
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
	#regNoFFS	= /[　]/;
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
	#mkStyle_r_align: (ch: string, rb: string, r_align: string, add_sty?: string)=> string = (ch, rb, r_align, add_sty='')=> {
		if (! r_align) return ` style='${add_sty}'`;

		const len = ch.length *2;
		if (len -rb.length < 0) return ` style='text-align: ${r_align}; ${add_sty}'`;

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
		return ` style='${st} ${add_sty}'`;
	};
	#r_align	= '';
	#mkStyle_r_align4ff(ch: string, rb: string, r_align: string, add_sty=''): string {
		if (! r_align) return ` style='${add_sty}'`;

		const len = ch.length *2;
		if (len -rb.length < 0) return ` style='text-align: ${r_align}; ${add_sty}'`;

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
		return ` style='${st} ${add_sty}'`;
	}

	tagCh(text: string): void {this.#rbSpl.putTxt(text)}
	#needGoTxt = false;
	readonly	#putCh	: IPutCh = (ch, ruby)=> {
		if (TxtLayer.#cfg.oCfg.debug.putCh) console.log(`🖊 文字表示 text:\`${ch}\`(${ch.charCodeAt(0).toString(16)}) ruby:\`${ruby}\` name:\`${this.name_}\``);

		const a_ruby = ruby.split('｜');
		let add_htm = '';
		const [a0, ...a1_] = a_ruby;
		const a1 = a1_.join('｜');
		switch (a_ruby.length) {
		case 1:		// 字or春《はる》
			this.#needGoTxt = true;
			if (ch === '\n') {
				if (this.#firstCh) {// １文字目にルビが無い場合、不可視ルビで行揃え
					this.#firstCh = false;
					add_htm = '<ruby>&emsp;<rt>&emsp;</rt></ruby><br/>';
				}
				else add_htm = '<br/>';
				break;
			}
			if (this.#firstCh) {	// １文字目にルビが無い場合、不可視ルビで行揃え
				this.#firstCh = false;
				if (ruby === '') ruby = '&emsp;';
			}
			add_htm = this.#tagCh_sub(ch, ruby, this.#r_align);
			break;

		default:	// 《grp｜{"id":"break","pic":"breakline"}》
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
				if (this.#needGoTxt) {
					if (this.isCur) TxtLayer.#recorder.recText(
						this.#aSpan.join('')
						.replace(/^<ruby>&emsp;<rt>&emsp;<\/rt><\/ruby>(<br\/>)+/, '')
							// 前方の空行をtrim
						.replaceAll(/style='(anim\S+ \S+?;\s*)+/g, `style='`)
						.replaceAll(/( style=''| data-(add|arg|cmd)='.+?'|\n+|\t+)/g, '')
						.replaceAll(/class='sn_ch .+?'/g, `class='sn_ch'`)
							// 不要情報削除
						.replaceAll(`display: none;`, '')	// 履歴情報可視化
						.replaceAll(`class='offrec'`, `style='display: none;'`)
							// 囲んだ領域は履歴で非表示
					);

					this.#txs.goTxt(this.#aSpan, this.#cumDelay === 0);
					this.#needGoTxt = false;
					this.#cumDelay = 0;
				}
				else if (this.isCur) this.#txs.noticeCompTxt();
			}	return;	// breakではない

			case 'add':{	// 文字幅を持たない汎用的な命令（必ずadd_closeすること）
				const o = JSON.parse(a1);

				const {style='', wait=null} = o;// wait=0にすると背景が最初から出る
				const {cl, sty} = this.#o2domArg(true, wait);
				this.#aSpan.push(`<span${cl} style='${sty} display: inline; ${style}'>`);	// display: inline; がないと前の改行が改行しなくなる
				delete o.style;	// 背景styleなどを[ch]で一塊とする
				this.#pushSpan(o);
			}	return;	// breakではない
			case 'add_close':
				this.#aSpan.push('</span>');
				this.#popSpan();
				return;	// breakではない

			case 'grp':	//	画像など 《grp｜{"id":"break","pic":"breakline"}》
				this.#needGoTxt = true;
			{
				const o = JSON.parse(a1);
				o.id ??= this.#aSpan.length;
				if (o.id === 'break') {this.#txs.dispBreak(o); return}	// breakではない

				this.#firstCh = false;
				o.delay = this.#cumDelay;	// 画像のスライドインで使う
				o.r ??= '';
				o.style ??= '';
				o.r_style ??= '';
				const {cl, sty, lnk} = this.#o2domArg(true, o.wait);
				add_htm = `<span${cl} style='${sty} ${o.style
				}'><ruby><span data-cmd='grp' data-arg='${JSON.stringify(o)
				}'${lnk} style='${sty} display: inline;'>&emsp;</span><rt${lnk}${
					this.#mkStyle_r_align('　', o.r, this.#r_align,
					this.#htmRb.style.cssText	// この並びで上書きされていく
					+ (this.#stkASpan.at(-1)?.o.r_style ?? '')
					+ o.r_style)
				}>${o.r}</rt></ruby></span>`;
			}
				break;

			case 'tcy':	// ルビ付き縦中横
				this.#firstCh = false;
				this.#needGoTxt = true;
			{
				const {t, r='', wait=null, style='', r_style=''} = <{
					t: string, r?: string, wait? :number,
					style? :string, r_style? :string,
				}>JSON.parse(a1);
				if (TxtLayer.#val.doRecLog()) {
					this.#page_text += ch +(ruby ?`《${ruby}》` :'');
					this.#page_plain_text += t;
				}

				const rb = CmnLib.isSafari
					? r.replaceAll(/[A-Za-z0-9]/g, s=> String.fromCharCode(s.charCodeAt(0) + 65248))
						// 英数字を全角に(Safariで縦中横ルビが半角文字だと、
						// 選択矩形が横倒しになる不具合対策)
					: r;
				const {cl, sty, lnk} = this.#o2domArg(true, wait);
				add_htm = `<span${cl} style='${sty}${this.#fncFFSStyle(t)} ${style}'><ruby><span${lnk} style='${sty} display: inline; text-combine-upright: all;'>${t}</span><rt${lnk}${
					this.#mkStyle_r_align(t, rb, this.#r_align,
					this.#htmRb.style.cssText	// この並びで上書きされていく
					+ (this.#stkASpan.at(-1)?.o.r_style ?? '')
					+ r_style)
				}>${rb}</rt></ruby></span>`;
			}
				break;

			case 'del':	//if (a1 !== 'break') throw '文字レイヤdelコマンドは、現在id=breakのみサポートします';
				TxtStage.delBreak();
				return;	// breakではない

			case 'span':
				this.#needGoTxt = true;
				this.#mergePushSpan(JSON.parse(a1));
				return;	// breakではない

			case 'link':
				this.#needGoTxt = true;
			{
				const o = JSON.parse(a1);
				o[':link'] = ` data-lnk='@'`;
				const {cl, sty, curpos} = this.#o2domArg(false, o.wait);
				this.#aSpan.push(`<span${cl} style='${sty} display: inline; ${o.style ?? ''}' ${curpos} data-arg='${a1}'>`);
					// display: inline; を削除するとルビもリンク背景に含まれる
					// ただし当たり判定は文字・ルビ上のみ
				delete o.style;
				this.#mergePushSpan(o);
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
	#tagCh_sub(ch: string, rb: string, r_align: string): string {
		const ht = ch===' ' ?'&nbsp;' :ch==='　' ?'&emsp;' :ch;
		if (TxtLayer.#val.doRecLog()) {
			this.#page_text += ht +(rb ?`《${rb}》` :'');
			if (ch !== ' ') this.#page_plain_text += ch;
		}
		const {cl, sty, lnk} = this.#o2domArg(true, null, ch);

		if (rb) return `<span${cl} style='${sty} ${this.#fncFFSStyle(ch)
		//<ruby style='ruby-position:under;'>	// 下付ルビ
		}'><ruby>${	// 文字個別に出現させるため以下にも ${cl} が必要
			Array.from(ch).map((c, i)=> `<span${cl}${lnk} style='${
				i > 0 ?this.#o2domArg(true, null, ch).sty :sty
			} display: inline;'>${
				c===' ' ?'&nbsp;' :c==='　' ?'&emsp;' :c
			}</span>`).join('')
				// display: inline; がないと[span]区間外のルビが浮く
		}<rt${lnk}${this.#mkStyle_r_align(ch, rb, r_align,
			this.#htmRb.style.cssText	// この並びで上書きされていく
			+ (this.#stkASpan.at(-1)?.o.r_style ?? ''))
		}>${rb}</rt></ruby></span>`;	// <span>に入れないと崩れ一文字ずつ出ない

		return `<span${cl} style='${sty} ${this.#fncFFSStyle(ch)}'${lnk}>${ht}</span>`;
	}
	#o2domArg(isAddWait: boolean, argWait: number | null, ch = '\n') {
		const wait = this.#ch_in_join ?(argWait
			?? this.#stkASpan.at(0)?.o.wait	// 親要素
			?? (TxtLayer.#doAutoWc	// ()は必要
				? TxtLayer.#hAutoWc[ch.at(0) ?? ''] ?? 0
				: LayerMng.msecChWait)) :0;
		if (TxtLayer.#evtMng.isSkipping) this.#cumDelay = 0;
	//	else if (isAddWait && this.#ch_in_join) this.#cumDelay += Number(wait)*5;	// 出現視認テスト用
		else if (isAddWait && this.#ch_in_join) this.#cumDelay += Number(wait);
		const curpos = `data-add='{"ch_in_style":"${this.#$ch_in_style}", "ch_out_style":"${this.#$ch_out_style}"}'`;

		return {
			cl	: ` class='sn_ch sn_ch_in_${this.#$ch_in_style}'`,	// TxtStage.goTxt()はこれ単位で文字出現させる
			sty	: `animation-delay: ${this.#cumDelay}ms;${
				this.#stkASpan.at(-1)?.o.style ?? ''
			}`,		// TxtStage.goTxt()はこれ単位で文字出現させる
			lnk	: (this.#stkASpan.at(0)?.o[':link'] ?? '')+' '+ curpos,
			curpos,
		};
	}
	#cumDelay	= 0;
	#firstCh	= true;
	#aSpan		: string[]	= [];
	#stkASpan	: {
		o		: {
			style?		: string;
			r_style?	: string;
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
	#mergePushSpan(o :any) {
		const stk = this.#stkASpan.at(-1);
		if (! stk) {this.#pushSpan(o); return}

		stk.o = {...stk.o, ...o};
		if (! o.style && ! o.r_style) {stk.o.style = ''; stk.o.r_style = ''}
			// どちらも指定されてなければクリア
		if ('r_align' in o) this.#r_align = o.r_align;
		this.#set_ch_in(o);
		this.#set_ch_out(o);
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
		this.#page_plain_text = '';
		TxtLayer.#recorder.recPagebreak();
	}
	#page_text			= '';
	#page_plain_text	= '';
	get pageText() {return this.#page_text.replace('《&emsp;》', '')}
	get pagePlainText() {return this.#page_plain_text}

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
		for (const b of this.#cntBtn.removeChildren()) b.destroy();
	}
	override readonly record = ()=> {return <any>{...super.record(),
		enabled	: this.enabled,

		r_cssText	: this.#htmRb.style.cssText,
		r_align		: this.#r_align,

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

		btns	: this.#cntBtn.children.map(b=> b.name),
	}};
	override playback(hLay: any, aPrm: Promise<void>[]): void {
		super.playback(hLay, aPrm);

		this.enabled	= hLay.enabled;

		this.#htmRb.style.cssText = hLay.r_cssText;
		this.#r_align	= hLay.r_align;
		this.cvsResize();

		this.#setFfs(hLay);
		this.#txs.playback(hLay.txs);
		// 文字背景サイズは TxtStage を参照するのでこの順で
		this.#b_alpha			= hLay.b_alpha;
		this.#b_alpha_isfixed	= hLay.b_alpha_isfixed;

		aPrm = [
			aPrm,
			new Promise<void>(re=> {
				const h: HArg = (hLay.b_do)
					? (hLay.b_do === 'Sprite'
						? {b_pic: hLay.b_pic}
						: {b_color: hLay.b_color})
					: {b_pic: ''};
				h.b_alpha = hLay.b_alpha;
				h.b_alpha_isfixed = hLay.b_alpha_isfixed;
				if (! this.#drawBack(h, isStop=> {if (isStop) re()})) re();
			}),
			(hLay.btns as string[]).map(b=> new Promise<void>(re=> {
				this.addButton(JSON.parse(b.replaceAll(`'`, '"'))); re()
			})),
		].flat();
	}

	get cssText() {return this.#txs.cssText}
	set cssText(ct: string) {this.#txs.cssText = ct}

	override snapshot(rnd: Renderer, re: ()=> void) {
		rnd.render(this.spLay, {clear: false});
		this.#txs.snapshot(rnd, re);
	}
	override snapshot_end() {this.#txs.snapshot_end()}

	override makeDesignCast(gdc: IMakeDesignCast) {
		if (! this.spLay.visible) return;
		this.#txs.makeDesignCast(gdc);
	}
	override makeDesignCastChildren(gdc: IMakeDesignCast) {
		if (! this.spLay.visible) return;
		for (const b of this.#cntBtn.children) b.makeDesignCast(gdc);
	}

	override showDesignCast() {this.#txs.showDesignCast()}
	override showDesignCastChildren() {
		for (const b of this.#cntBtn.children) b.showDesignCast();
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
			this.#cntBtn.children.map(b=> b.children[0]?.name ?? '{}').join(',')
		}]`;
	}

}
