/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Layer} from './Layer';

import {uint, CmnLib, IEvtMng} from './CmnLib';
import {IVariable, IHTag, HArg, IPutCh, IMain} from './CmnInterface';
import {TxtStage, IInfTxLay} from './TxtStage';
import {Config} from './Config';
import {RubySpliter} from './RubySpliter';
import {GrpLayer} from './GrpLayer';
import {Button} from './Button';
import {Sprite, DisplayObject, Graphics, Container} from 'pixi.js';
import {LayerMng} from './LayerMng';

const platform = require('platform');

export class TxtLayer extends Layer {
	private	static	cfg		: Config;
	private	static	val		: IVariable;
	private	static	glbStyle: HTMLStyleElement;
	private	static	recText	: (txt: string)=> void;
	static	init(cfg: Config, hTag: IHTag, val: IVariable, recText: (txt: string)=> void): void {
		TxtLayer.cfg = cfg;
		TxtStage.init(cfg);
		TxtLayer.val = val;
		TxtLayer.recText = recText;

		hTag.autowc			= o=> TxtLayer.autowc(o);	// 文字を追加する
		const o: any = {enabled: 'false', text: '', time: ''};
		hTag.autowc(o);

		TxtLayer.glbStyle = document.createElement('style');
		document.getElementsByTagName('head')[0].appendChild(TxtLayer.glbStyle);
		TxtLayer.glbStyle.type = 'text/css';
		for (const o of cfg.matchPath('.+', Config.EXT_FONT)) {
			for (const key in o) TxtLayer.gs_autoLoadFont += `
@font-face {
	font-family: '${CmnLib.getFn(o[key])}';
	src: url('${o[key]}');
}
`;
		}
		TxtLayer.gs_autoLoadFont += `
.sn_txl {
	pointer-events: none;
	user-select: none;
	-webkit-touch-callout: none;
}
`;

		TxtLayer.setTextFadeStyle(`
.sn_tx {
	opacity: 0;
	position: relative;
	animation: tx_fi 500ms ease-out 0s forwards;
}
@keyframes tx_fi {
	from {left: 0.3em;}
	to {opacity: 1; left: 0;}
}
@keyframes tx_fo {
	from {opacity: 1; left: 0;}
	to {opacity: 0; left: -0.3em;}
}
`		);
/*
	quadraticEaseInOut
	CSS3 : cubic-bezier(0.455, 0.03, 0.515, 0.955)
		・CSS3のtransition-timing-functionの値、cubic-bezier()に関して | KnockKnock http://www.knockknock.jp/archives/184
*/
	}
	private	static	main	: IMain;
	private	static	evtMng	: IEvtMng;
	static setEvtMng(main: IMain, evtMng: IEvtMng) {
		TxtLayer.main = main;
		TxtLayer.evtMng = evtMng;
		TxtStage.setEvtMng(evtMng);
	}

	static setTextFadeStyle(style: string) {
		TxtLayer.gs_textFade = style;
		TxtLayer.glbStyle.innerHTML
			= TxtLayer.gs_autoLoadFont
			+ TxtLayer.gs_textFade
			+ TxtLayer.gs_addStyle;
	}
	private	static	gs_autoLoadFont	= '';
	private	static	gs_textFade		= '';

	static addStyle(style: string) {
		TxtLayer.gs_addStyle += style +'\n';
		TxtLayer.glbStyle.innerHTML
			= TxtLayer.gs_autoLoadFont
			+ TxtLayer.gs_textFade
			+ TxtLayer.gs_addStyle;
	}
	private	static	gs_addStyle		= '';

	// 文字ごとのウェイト
	private	static doAutoWc	= false;
	private	static hAutoWc	: {[ch: string]: number} = Object.create(null);//{}
	private static autowc(hArg: HArg) {
		TxtLayer.doAutoWc = CmnLib.argChk_Boolean(hArg, 'enabled', TxtLayer.doAutoWc);
		TxtLayer.val.setVal_Nochk('save', 'const.sn.autowc.enabled', TxtLayer.doAutoWc);

		const ch = hArg.text;
		if (('text' in hArg) != ('time' in hArg)) throw '[autowc] textとtimeは同時指定必須です';
		TxtLayer.val.setVal_Nochk('save', 'const.sn.autowc.text', ch);
		if (! ch) {
			TxtLayer.val.setVal_Nochk('save', 'const.sn.autowc.time', '');
			return false;
		}

		const len = ch.length;
		if (TxtLayer.doAutoWc && len == 0) throw '[autowc] enabled == false かつ text == "" は許されません';

		const a = String(hArg.time).split(',');
		if (a.length != len) throw '[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい';
		TxtLayer.hAutoWc = Object.create(null);	//{}	// 毎回クリアを仕様とする
		a.forEach((v, i)=> TxtLayer.hAutoWc[ch[i]] = uint(v));
		TxtLayer.val.setVal_Nochk('save', 'const.sn.autowc.time', hArg.time);

		return false;
	}


	private infTL :IInfTxLay = {
		fontsize	: 24,
		$width		: 0,	// レイヤサイズであり、背景色（画像）サイズ
		$height		: 0,
		pad_left	: 0,	// paddingLeft（レイヤサイズの内側のスペーサー）
		pad_right	: 0,	// paddingRight
		pad_top		: 0,	// paddingTop
		pad_bottom	: 0,	// paddingBottom
	}

	// バック
	private b_color			= 0x000000;
	private b_alpha			= 0;
	private b_alpha_isfixed	= false;
	private b_do			: DisplayObject | null	= null;
	private b_pic			= '';	// 背景画像無し（＝単色塗り）

	// メッセージ
	private cntInsidePadding= new Container;
	private	txs				= new TxtStage(this.infTL, this.cntInsidePadding);

	private	rbSpl			= new RubySpliter;

	private cntBtn			= new Container;

	constructor() {
		super();

		const padding = 16 *CmnLib.retinaRate;	// 初期padding
		this.cnt.addChild(this.cntInsidePadding);
		this.cntInsidePadding.name = 'cntInsidePadding';
		this.cntInsidePadding.position.set(padding, padding);

		this.rbSpl.init(this.putCh);

		this.cnt.addChild(this.cntBtn);	// ボタンはpaddingの影響を受けない
		this.cntBtn.name = 'cntBtn';

		this.lay({style: `width: ${CmnLib.stageW}px; height: ${CmnLib.stageH}px; font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif; color: white; font-size: 24px; line-height: 1.5; padding: ${padding}px;`});
	}
	destroy() {
		if (this.b_do) {this.cnt.removeChild(this.b_do).destroy(); this.b_do = null}

		this.clearText();
		this.txs.destroy();
	}


	lay(hArg: HArg): boolean {
		super.lay(hArg);
		Layer.setXY(this.cnt, hArg, this.cnt);

		this.rbSpl.setting(hArg);

		this.txs.lay(hArg);

		return this.drawBack(hArg);
	}

	private drawBack(hArg: HArg): boolean {
		if ('back_clear' in hArg) {
			if (CmnLib.argChk_Boolean(hArg, 'back_clear', false)) {
				this.b_color = 0x000000;
				this.b_alpha = 0;
				this.b_alpha_isfixed = false;
				this.b_pic = '';
			}
			return false;
		}

		this.b_alpha = CmnLib.argChk_Num(hArg, 'b_alpha', this.b_alpha);
		this.b_alpha_isfixed = CmnLib.argChk_Boolean(hArg, 'b_alpha_isfixed', this.b_alpha_isfixed);
		const alpha = (this.b_alpha_isfixed
			? 1
			: Number(TxtLayer.val.getVal('sys:TextLayer.Back.Alpha'))
		) *this.b_alpha;
		if (hArg.b_pic) {
			if (this.b_pic != hArg.b_pic) {
				this.b_pic = hArg.b_pic;
				if (this.b_do) {
					this.cnt.removeChild(this.b_do);
					this.b_do.destroy();
				}
				return GrpLayer.csv2Sprites(this.b_pic, this.cnt, sp=> {
					this.b_do = sp;
					sp.name = 'back(pic)';
					sp.visible = (alpha > 0);
					sp.alpha = alpha;
					//CmnLib.adjustRetinaSize(this.b_pic, sp);
					this.txs.setSize(sp.width, sp.height);
						// ちなみに左上表示位置は本レイヤと同じ
					this.cnt.setChildIndex(sp, 0);
					TxtLayer.main.resume();
				});
			}
		}
		else if ('b_color' in hArg) {
			this.b_color = parseInt(hArg.b_color || '0');
			if (this.b_do) {
				this.cnt.removeChild(this.b_do);
				this.b_do.destroy();
			}
			this.b_pic = '';	// 忘れずクリア
			const grp = this.b_do = new Graphics;
			grp.name = 'back(color)';
			grp.beginFill(this.b_color);
			grp.lineStyle(undefined);
			grp.drawRect(0, 0, this.infTL.$width, this.infTL.$height);
			grp.endFill();
			this.cnt.addChildAt(grp, 0);
			//cacheAsBitmap = true;	// これを有効にするとスナップショットが撮れない？？
		}

		if (this.b_do) {
			this.b_do.visible = (alpha > 0);
				// 透明の時は表示しない。こうしないと透明テキストレイヤ下のボタンが
				// 押せなくなる（透明だが塗りがあるという扱いなので）
			this.b_do.alpha = alpha;
		}

		return false;
	}
	chgBackAlpha(g_alpha: number): void {
		const alpha = this.b_alpha_isfixed
			? this.b_alpha
			: g_alpha * this.b_alpha;
		if (this.b_do instanceof Graphics) {
			if (this.b_do) {
				this.cnt.removeChild(this.b_do);
				this.b_do.destroy();
			}
			const grp = this.b_do = new Graphics;
			grp.name = 'back(color)';
			grp.beginFill(this.b_color);
			grp.lineStyle(undefined);
			grp.drawRect(0, 0, this.infTL.$width, this.infTL.$height);
			grp.endFill();
			this.cnt.addChildAt(grp, 0);
			//cacheAsBitmap = true;	// これを有効にするとスナップショットが撮れない？？
		}
		if (this.b_do) {
			this.b_do.visible = (alpha > 0);
				// 透明の時は表示しない。こうしないと透明テキストレイヤ下のボタンが
				// 押せなくなる（透明だが塗りがあるという扱いなので）
			this.b_do.alpha = alpha;
		}
	}


	tagCh(text: string): void {this.rbSpl.putTxt(text);}
	private	restBuf = false;
	private	putCh : IPutCh = (text: string, ruby: string)=> {
		if (TxtLayer.cfg.oCfg.debug.putCh) console.log(`🖊 文字表示 text:\`${text}\` ruby:\`${ruby}\` name:\`${this.name}\``);
		const isSkip = TxtLayer.evtMng.isSkipKeyDown();

		const a_ruby = ruby.split('｜');
		let add_htm = '';
		switch (a_ruby.length) {
		case 1:		// 字or春《はる》
			this.restBuf = true;
			if (text == '\n') {
				if (this.aSpan_bk) {
					add_htm = this.aSpan_bk.slice(-1)[0];
					this.autoCloseSpan();
					this.aSpan.push('<br/>');
					this.aSpan.push(add_htm);	// ここでaSpan末尾に追加しないと続かない
					this.aSpan_bk = this.aSpan;
					this.aSpan = [];
					return;	// breakではない
				}
				if (this.firstCh) {	// １文字目にルビが無い場合は不可視ルビで、行揃え
					this.firstCh = false;
					add_htm = '<ruby>　<rt>　</rt></ruby><br/>';
				}
				else {
					add_htm = '<br/>';
				}
				this.recText('<br/>');
				break;
			}
			if (this.firstCh) {	// １文字目にルビが無い場合は見えないルビで、行揃え
				this.firstCh = false;
				if (ruby == '') ruby = '　';
			}
			add_htm = (ruby) ?`<ruby>${text}<rt>${ruby}</rt></ruby>` :text;
			if (CmnLib.hDip['tx']) {
				if (isSkip) {
					this.cumDelay = 0;
				}
				else {
					add_htm = `<span class='sn_tx' style='animation-delay: ${this.cumDelay}ms;'>${add_htm}</span>`;
				}
			}
			this.cumDelay += (TxtLayer.doAutoWc)
				? TxtLayer.hAutoWc[text] ?? 0
				: LayerMng.msecChWait;
			this.recText(text);
			break;

		case 2:		// 《grp｜{"id":"break","pic":"breakline"}》
			switch (a_ruby[0]) {
			case 'gotxt':
				this.autoCloseSpan();
//				this.txs.goTxt(this.aSpan, this.name);
				if (CmnLib.hDip['tx']) {
					if (this.restBuf) {
						this.txs.goTxt_next(this.aSpan, this.name, this.cumDelay);
						this.restBuf = false;
						this.cumDelay = 0;
						const len = this.aSpan.length;
						for (let i=0; i<len; ++i) this.aSpan[i] = this.aSpan[i].replace(` class='sn_tx'`, '');
					}
				}
				else this.txs.goTxt(this.aSpan, this.name);
				return;	// breakではない

			case 'add':	// 文字幅を持たない汎用的な命令（必ずadd_closeすること）
				if (this.aSpan_bk) {
					const s = this.aSpan_bk.slice(-1)[0];
					this.autoCloseSpan();

					this.aSpan.push(s.replace(
						/<span( data-add=".+?")?/,	// "を'にしてはいけない
						`<span data-add="${a_ruby[1]}"`));
				}
				else {
					this.aSpan.push(`<span data-add="${a_ruby[1]}">`);
						// "を'にしてはいけない
				}
				this.aSpan_bk = this.aSpan;
				this.aSpan = [];
				return;	// breakではない
			case 'add_close':
				this.autoCloseSpan();
				return;	// breakではない

			case 'grp':	//	画像など 《grp｜{"id":"break","pic":"breakline"}》
				this.restBuf = true;
			{
				if (isSkip) this.cumDelay = 0;
				const arg = (a_ruby[1] ?a_ruby[1].slice(0, -1) +',' :`{`) +`"delay": ${this.cumDelay}}`;
				const o = JSON.parse(arg);
				if (! ('id' in o)) o.id = this.aSpan.length;
				this.cumDelay += (TxtLayer.doAutoWc)
					? 0
					: LayerMng.msecChWait;
				if (o.id == 'break') {
					this.txs.dispBreak(o.pic);
					return;	// breakではない
				}

				add_htm = `<span data-cmd='grp' data-id='${o.id}' data-arg='${arg}'>　</span>`;
				if (this.aSpan.slice(-1)[0] == add_htm) return;	// breakではない
			}
				break;

			case 'del':
				const id_del = a_ruby[1];
				if (id_del != 'break') throw '文字レイヤdelコマンドは、現在id=breakのみサポートします';

				TxtStage.delBreak();
				return;	// breakではない

			case 'span':
				this.autoCloseSpan();
				this.restBuf = true;
				if (a_ruby[1]) {
					this.aSpan.push(`<span style='${a_ruby[1]}'>`);
					this.aSpan_bk = this.aSpan;
					this.aSpan = [];
				}
				return;	// breakではない

			case 'link':
				this.autoCloseSpan();
				this.restBuf = true;
			{
				// b_color, b_alpha, fn, label
				const o = JSON.parse(a_ruby[1]);
				if (CmnLib.hDip['tx']) {
					this.aSpan.push(`<span `+ (isSkip
						? `style='`
						: `class='sn_tx' style='animation-delay: ${this.cumDelay}ms; `) +`${o.style}'>`);
					this.aSpan_link = `data-cmd='link' data-arg='${a_ruby[1]}'`;
				}
				else {
					this.aSpan.push(`<span data-cmd='link' data-arg='${a_ruby[1]}' style='${o.style}'>`);
				}
				this.aSpan_bk = this.aSpan;
				this.aSpan = [];
			}
				return;	// breakではない

			case 'endlink':
				this.restBuf = true;
				if (this.aSpan_bk) {
					const len = this.aSpan.length;
					for (let i=0; i<len; ++i) this.aSpan[i] = this.aSpan[i].replace(`class='sn_tx'`, this.aSpan_link);
				}
				this.autoCloseSpan();	return;	// breakではない

			default:	// ルビあり文字列
				this.restBuf = true;
				add_htm = `<ruby>${text}<rt>${ruby}</rt></ruby>`;
				if (CmnLib.hDip['tx']) {
					if (isSkip) {
						this.cumDelay = 0;
					}
					else {
						add_htm = `<span class='sn_tx' style='animation-delay: ${this.cumDelay}ms;'>${add_htm}</span>`;
					}
				}
				this.cumDelay += (TxtLayer.doAutoWc)
					? TxtLayer.hAutoWc[text.charAt(0)] ?? 0
					: LayerMng.msecChWait;
				this.recText(text);
			}
			break;

		case 3:		// 《tcy｜451｜かし》
			this.restBuf = true;
			switch (a_ruby[0]) {
			case 'tcy':	// ルビ付き縦中横
				// text-orientation: mixed;（デフォルト）和文は縦、英語は横に表示
				// text-combine-upright: all;			縦中横
				// -webkit-text-combine: horizontal;	縦中横(Safari)
				const id_tcy = (a_ruby[1].length > 1)
					? (this.aSpan.length +1)	// 0にならないよう +1
					: '';
				const ruby = (platform.name == 'Safari')
					? a_ruby[2].replace(/[A-Za-z0-9]/g, s=> String.fromCharCode(s.charCodeAt(0) + 65248))	// 英数字を全角に
					// (Safariで縦中横ルビが半角文字だと、選択矩形が横倒しになる不具合対策)
					: a_ruby[2];
				add_htm = ruby
				? `<ruby style='
					text-orientation: upright;
				'><span data-tcy='${id_tcy}' style='
					text-combine-upright: all;
					-webkit-text-combine: horizontal;
				'>${a_ruby[1]}</span><rt>${ruby}</rt></ruby>`
				: `<span data-tcy='${id_tcy}' style='
					text-orientation: upright;
					text-combine-upright: all;
					-webkit-text-combine: horizontal;
				'>${a_ruby[1]}</span>`;
				this.cumDelay += (TxtLayer.doAutoWc)
					? TxtLayer.hAutoWc[text.charAt(0)] ?? 0
					: LayerMng.msecChWait;
				if (CmnLib.hDip['tx']) {
					if (isSkip) {
						this.cumDelay = 0;
					}
					else {
						add_htm = `<span class='sn_tx' style='animation-delay: ${this.cumDelay}ms;'>${add_htm}</span>`;
					}
				}
				break;

			default:
			}
			break;
		}
		this.aSpan.push(add_htm);
	}
	private cumDelay	= 0;
	private firstCh		= true;
	private aSpan		: string[]		= [];
	private aSpan_bk	: any[] | null	= null;
	private aSpan_link	= '';
	private autoCloseSpan() {
		if (! this.aSpan_bk) return;

		this.aSpan_bk.push(this.aSpan, '</span>')
		this.aSpan = Array.prototype.concat.apply([], this.aSpan_bk);
		this.aSpan_bk = null;
	}

	readonly click = ()=> this.txs.skipFI();	// true is stay

	private	log = '';
	private	recText(text: string) {
		if (! TxtLayer.val.getVal('save:sn.doRecLog')) return;

		this.log = this.log + text;
		TxtLayer.recText(this.log);
	}

	clearText(): void {
		const txs = this.txs;
		this.txs = this.txs.passBaton();
		txs.destroy();

		this.cumDelay = 0;
		this.firstCh = true;
		this.aSpan = [];
		this.aSpan_bk = null;
		this.log = '';
	}

	get enabled() {return this.cntBtn.interactiveChildren;}
	set enabled(v) {this.cntBtn.interactiveChildren = v;}

	addButton(hArg: HArg): boolean {
		hArg.key = `btn=[${this.cntBtn.children.length}] `+ this.name;
		const btn = new Button(TxtLayer.main, TxtLayer.evtMng, hArg);
		btn.name = JSON.stringify(hArg);
		this.cntBtn.addChild(btn);
		return btn.isStop;
	}


	clearLay(hArg: HArg): void {
		super.clearLay(hArg);

		this.clearText();
		for (const c of this.cntBtn.removeChildren()) c.removeAllListeners().destroy();	// removeAllListeners()はマウスオーバーイベントなど。クリックは別
	}
	readonly record = ()=> Object.assign(super.record(), {
		enabled	: this.enabled,

		// バック
		b_do	: (this.b_do == null)
					? null
					: (this.b_do instanceof Sprite ?'Sprite' :'Graphics'),
		b_pic	: this.b_pic,
		b_color	: this.b_color,
		b_alpha	: this.b_alpha,
		b_alpha_isfixed	: this.b_alpha_isfixed,

		txs: this.txs.record(),

		btns: this.cntBtn.children.map(btn=> btn.name),
	});
	playback(hLay: any, fncComp: undefined | {(): void} = undefined): boolean {
		super.playback(hLay);
		this.enabled	= hLay.enabled;

		// バック
		this.b_alpha			= hLay.b_alpha;
		this.b_alpha_isfixed	= hLay.b_alpha_isfixed;
		let ret = this.drawBack(
			(hLay.b_do)
			? (hLay.b_do == 'Sprite' ?{b_pic: hLay.b_pic} :{b_color: hLay.b_color})
			: {b_pic: ''}
		);

		this.txs.playback(hLay.txs);

		// addButton(hArg: HArg): boolean
		const aBtn: string[] = hLay.btns;
		aBtn.forEach(v=> ret = ret || this.addButton(JSON.parse(v)));

		if (fncComp != undefined) fncComp();

		return ret;
	}

	dump(): string {
		let aPixiObj: string[] = [];
		const len = this.cnt.children.length;
		for (let i=0; i<len; ++i) {
			const e = this.cnt.children[i];
			const cls = (e instanceof Sprite) ?"Sprite" :(
				(e instanceof Graphics) ?"Graphics" :(
					(e instanceof Container) ?"Container" :"?"
				)
			);
			aPixiObj.push(`{"class":"${cls}", "name":"${e.name}", "alpha":${e.alpha || 1}, "x":${e.x}, "y":${e.y}, "visible":"${
				e.visible}"}`);
		}
		return super.dump() +`, "enabled":"${this.enabled}", ${this.txs.dump()
		}, "b_pic":"${this.b_pic}", "b_color":"${this.b_color
		}", "b_alpha":${this.b_alpha}, "b_alpha_isfixed":"${this.b_alpha_isfixed
		}", "b_width":${this.infTL.$width}, "b_height":${this.infTL.$height
		}, "pixi_obj":[${aPixiObj.join(',')}]`;
	}

};
