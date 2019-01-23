/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Layer} from './Layer';

import {CmnLib, uint, IEvtMng} from './CmnLib';
import {CmnTween} from './CmnTween';
import {IVariable, IHTag, HArg, IPutCh, IMain} from './CmnInterface';
import {Config} from './Config';
import {RubySpliter} from './RubySpliter';
import {GrpLayer} from './GrpLayer';
import {LayerMng} from './LayerMng';
import {Button} from './Button';
import { Rectangle, Sprite, DisplayObject, Graphics, Texture, Container, utils } from 'pixi.js';
import {GlowFilter} from 'pixi-filters';

import TWEEN = require('@tweenjs/tween.js');
import { DebugMng } from './DebugMng';
const platform = require('platform');

interface IChRect {
	ch		: string;
	rect	: Rectangle;
	cmd?	: string;
	arg?	: string;
	add?	: string;
	tcy?	: string;
}
interface ISpTw {
	sp	: Container;
	tw	: TWEEN.Tween | null;
};

export class TxtLayer extends Layer {
	private	static	val		: IVariable;
	private	static	hNoReplaceDispObj	: {[name: string]: boolean} = {};

	private	static	glbStyle: HTMLStyleElement;
	private	static	cfg		: Config;
	private	static	recText	: (txt: string)=> void;
	static	init(cfg: Config, hTag: IHTag, val: IVariable, recText: (txt: string)=> void): void {
		TxtLayer.cfg = cfg;
		TxtLayer.val = val;
		TxtLayer.recText = recText;

		if (! cfg.existsBreakline) TxtLayer.hNoReplaceDispObj['breakline'] = true;
		if (! cfg.existsBreakpage) TxtLayer.hNoReplaceDispObj['breakpage'] = true;

		hTag['autowc'] = o=> TxtLayer.autowc(o);

		TxtLayer.glbStyle = document.createElement('style');
		document.getElementsByTagName('head')[0].appendChild(TxtLayer.glbStyle);
		TxtLayer.glbStyle.type = 'text/css';
		let autoloadfont = '';
		for (const o of cfg.matchPath('.+', Config.EXT_FONT)) {
			for (const key in o) autoloadfont += `
@font-face {
	font-family: '${CmnLib.getFn(o[key])}';
	src: url('${o[key]}');
}
`;
		}
		TxtLayer.glbStyle.innerHTML = autoloadfont;
	}
	static destroy() {
		RubySpliter.destroy();

		TxtLayer.hNoReplaceDispObj = {};
	}

	private	$width		= 0;	// レイヤサイズであり、背景色（画像）サイズ
	private	$height		= 0;
	private pad_left	= 0;	// paddingLeft（レイヤサイズの内側のスペーサー）
	private pad_right	= 0;	// paddingRight
	private pad_top		= 0;	// paddingTop
	private pad_bottom	= 0;	// paddingBottom

	// バック
	private b_color			= 0x000000;
	private b_alpha			= 0;
	private b_alpha_isfixed	= false;
	private b_do			: DisplayObject | null;
	private b_pic			: string = '';

	// メッセージ
	private htmTxt			= document.createElement('span');	// サンプリング元
	private cntTxt			= new Container;					// サンプリング先
	private grpDbgMasume	= new Graphics;
	private cntInsidePadding= new Container;
	private	fontsize		= 24;

	private	ch_anime_time_仮	= 500;	// TODO: 未作成
	private	fncFi			= (sp: DisplayObject)=> {sp.x += this.fontsize /3};
	private fi_easing		= 'Quadratic.Out';
	private ch_filter		: any[] | null;
	private fo				= {alpha: 0, x: `+${ this.fontsize /3 }`};
	private fo_easing		= 'Quadratic.Out';

	private	rbSpl			= new RubySpliter;

	private cntBtn			= new Container;

	constructor() {
		super();

		const padding = 16 *CmnLib.retinaRate;	// 初期padding
		this.cnt.addChild(this.cntInsidePadding);
		this.cntInsidePadding.name = 'cntInsidePadding';
		this.cntInsidePadding.position.set(padding, padding);

		this.cntInsidePadding.addChild(this.grpDbgMasume);
		this.grpDbgMasume.name = 'grpDbgMasume';

		this.rbSpl.init(this.putCh);
		this.cntInsidePadding.addChild(this.cntTxt);
		this.cntTxt.name = 'cntTxt';

		this.cnt.addChild(this.cntBtn);	// ボタンはpaddingの影響を受けない
		this.cntBtn.name = 'cntBtn';

		this.lay({style: `width: ${CmnLib.stageW}px; height: ${CmnLib.stageH}px; font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif; color: white; font-size: 24px; line-height: 1.5; padding: ${padding}px;`});

		this.htmTxt.hidden = true;
		document.body.appendChild(this.htmTxt);
	}
	destroy() {
		if (this.b_do) {this.cnt.removeChild(this.b_do).destroy(); this.b_do = null}
		document.body.removeChild(this.htmTxt);

		this.ch_anime_time_仮 = 0;
		this.clearText();
	}

	private	static	main	: IMain;
	private	static	evtMng	: IEvtMng;
	static setEvtMng(main: IMain, evtMng: IEvtMng) {
		TxtLayer.main = main;
		TxtLayer.evtMng = evtMng;
	}

	static addStyle(text: string) {TxtLayer.glbStyle.innerHTML += text +'\n';}


	lay(hArg: HArg): boolean {
		super.lay(hArg);
		let ret = false;
		Layer.setXY(this.cnt, hArg, this.cnt);

		this.rbSpl.setting(hArg);

		if (hArg.style) {
			const cln = document.createElement('span');
			cln.style.cssText = hArg.style;
			const len = cln.style.length;
			for (let i=0; i<len; ++i) {
				const key: any = cln.style[i];
				if (key in this.hWarning) {
					DebugMng.myTrace(`${key}は指定できません`, 'W');
					continue;
				}
				this.htmTxt.style[key] = cln.style[key];
			}
			this.pad_left = parseFloat(this.htmTxt.style.paddingLeft || '0');
			this.pad_right = parseFloat(this.htmTxt.style.paddingRight || '0');
			this.pad_top = parseFloat(this.htmTxt.style.paddingTop || '0');
			this.pad_bottom = parseFloat(this.htmTxt.style.paddingBottom || '0');
			this.fontsize = parseFloat(this.htmTxt.style.fontSize || '0');
			this.$width = parseFloat(this.htmTxt.style.width || '0');
			this.$height = parseFloat(this.htmTxt.style.height || '0');
		}

		if (('b_color' in hArg) || ('b_alpha' in hArg) ||('b_alpha_isfixed' in hArg)
		|| ('b_pic' in hArg) || ('back_clear' in hArg)) {
			if (CmnLib.argChk_Boolean(hArg, 'back_clear', false)) {
				this.b_color = 0x000000;
				this.b_alpha = 0;
				this.b_alpha_isfixed = false;
				this.b_pic = '';
				delete hArg.b_pic;
			}
			else {
				if ('b_color' in hArg) this.b_color = parseInt(hArg.b_color || '0');
				this.b_alpha = CmnLib.argChk_Num(hArg, 'b_alpha', this.b_alpha);
				this.b_alpha_isfixed = CmnLib.argChk_Boolean(hArg, 'b_alpha_isfixed', this.b_alpha_isfixed);
			}
			ret = this.drawBack(hArg);
		}

		const xSlide = TxtLayer.cfg.oCfg.debug.slideBaseSpan
			? document.documentElement.clientWidth -CmnLib.stageW
			: 0;
		this.htmTxt.style.position = 'absolute';
		this.htmTxt.style.left = xSlide +'px';
		this.htmTxt.style.top = `0px`;
		this.htmTxt.style.zIndex = '-2';
		if (hArg.filter) switch (hArg.filter) {	// PixiJS Filters Documentation https://pixijs.io/pixi-filters/docs/PIXI.filters.GlowFilter.html
			case 'null':
				this.ch_filter = null;
				break;

			default:
				const f = new GlowFilter(10, 4, 0, 0x000000, 0.5);
				this.ch_filter = [f];
				break;
		}
		this.cntInsidePadding.position.set(this.pad_left, this.pad_top);

		this.xz4htm2rect = xSlide
			+ this.pad_left	// テクスチャ元中間objはpaddingを使わないので
			+ ((this.htmTxt.style.writingMode == 'vertical-rl')
				? this.pad_left +this.pad_right	// 　ｘ文字選択にとってpaddingがないので
				: 0);
		this.lh_half = (this.htmTxt.style.writingMode == 'vertical-rl')
			? 0
			: (	((this.htmTxt.style.lineHeight || '0').slice(-2) == 'px')
				? parseFloat(this.htmTxt.style.lineHeight || '0')
				: parseFloat(this.htmTxt.style.fontSize || '0')
					* parseFloat(this.htmTxt.style.lineHeight || '0')
					// window.getComputedStyle(this.htmTxt)がチョイチョイ値を返さないので
				-parseFloat(this.htmTxt.style.fontSize || '0')	) /2;

		return ret;
	}
	private xz4htm2rect = 0;
	private	hWarning = {
		backgroundColor	: 0,
		borderBottomWidth: 0,
		borderLeftWidth	: 0,
		borderRightWidth: 0,
		borderTopWidth	: 0,
		marginBottom	: 0,
		marginLeft		: 0,
		marginRight		: 0,
		marginTop		: 0,
	};

	private drawBack(hArg: HArg): boolean {
		const alpha = (this.b_alpha_isfixed
			? 1
			: Number(TxtLayer.val.getVal('sys:TextLayer.Back.Alpha'))
		) *this.b_alpha;
		if (hArg.b_pic == 'null') {
			if (this.b_do) {
				this.b_do.visible = (alpha > 0);
				this.b_do.alpha = alpha;
			}
			return false;
		}
		if (this.b_do instanceof Sprite) {
			if ('b_color' in hArg) {}
			else if (!('b_pic' in hArg) || hArg.b_pic == this.b_pic) {
				this.b_do.visible = (alpha > 0);
				this.b_do.alpha = alpha;
				return false;
			}
		}
		if (this.b_do) {
			this.cnt.removeChild(this.b_do);
			this.b_do.destroy();
			this.b_do = null;
			this.b_pic = '';
		}

		if (hArg.b_pic) {
			this.b_pic = hArg.b_pic;
			GrpLayer.csv2Sprites(this.b_pic, this.cnt, sp=> {
				this.b_do = sp;
				sp.name = 'back(pic)';
				sp.visible = (alpha > 0);
				sp.alpha = alpha;
				//CmnLib.adjustRetinaSize(this.b_pic, sp);
				this.$width = sp.width;		// ちなみに左上表示位置は本レイヤと同じ
				this.$height = sp.height;
				this.htmTxt.style.width = this.$width +'px';
				this.htmTxt.style.height = this.$height +'px';
				this.cnt.setChildIndex(sp, 0);
				TxtLayer.main.resume();
			});
			return true;
		}
		if ('b_color' in hArg) this.drawBackSub_b_color(alpha);
		return false;
	}
	private drawBackSub_b_color(alpha: number) {
		if (alpha > 0) {
			// 透明の時は塗らない。こうしないと透明テキストレイヤ下のボタンが
			// 押せなくなる（透明だが塗りがあるという扱いなので）
			const grp = new Graphics;
			this.b_do = grp;
			grp.name = 'back(color)';
			grp.beginFill(this.b_color, alpha);
			grp.lineStyle(undefined);
			grp.drawRect(0, 0, this.$width, this.$height);
			grp.endFill();
			this.cnt.addChildAt(grp, 0);
			//cacheAsBitmap = true;	// これを有効にするとスナップショットが撮れない？？
		}
	}
	reloadLayBack(g_alpha: number): void {
		const alpha = this.b_alpha_isfixed
			? this.b_alpha
			: g_alpha * this.b_alpha;
		if (this.b_do instanceof Sprite) {
			this.b_do.visible = (alpha > 0);
			this.b_do.alpha = alpha;
			return;
		}

		if (this.b_do) {
			this.cnt.removeChild(this.b_do);
			this.b_do.destroy();
			this.b_do = null;
		}
		this.drawBackSub_b_color(alpha);
	}


	tagCh(text: string): void {this.rbSpl.putTxt(text);}
	private	putCh : IPutCh = (text: string, ruby: string)=> {
		if (TxtLayer.cfg.oCfg.debug.putCh) console.log(`🖊 文字表示 text:\`${text}\` ruby:\`${ruby}\` name:\`${this.name}\``);

		const a_ruby = ruby.split('｜');
		let add_htm = '';
		switch (a_ruby.length) {
		case 1:		// 字or春《はる》
			if (text == '\n') {
				if (this.aSpan_bk) {
					add_htm = this.aSpan_bk[this.aSpan_bk.length -1];
					this.autoCloseSpan();
					this.aSpan.push('<br/>');
					this.aSpan.push(add_htm);	// ここでaSpan末尾に追加しないと続かない
					this.aSpan_bk = this.aSpan;
					this.aSpan = [];
					return;	// breakではない
				}
				//add_htm = '<br/>';
				if (this.firstCh) {	// １文字目にルビが無い場合は見えないルビを入れ、行揃え
					this.firstCh = false;
					add_htm = '<ruby>　<rt>　</rt></ruby><br/>';
				}
				else {
					add_htm = '<br/>';
				}
				break;
			}
			if (this.firstCh) {		// １文字目にルビが無い場合は見えないルビを入れ、行揃え
				this.firstCh = false;
				if (ruby == '') ruby = '　';
			}
			add_htm = (ruby) ?`<ruby>${text}<rt>${ruby}</rt></ruby>` :text;
			break;

		case 2:		// 《grp｜{"id":"break","pic":"breakline"}》
			switch (a_ruby[0]) {
			case 'gotxt':	this.goTxt();	return;	// breakではない
			case 'add':
				if (this.aSpan_bk) {
					const s = this.aSpan_bk[this.aSpan_bk.length -1];
					this.autoCloseSpan();

					this.aSpan.push(s.replace(
						/<span( data-add=".+?")?/,
						`<span data-add="${a_ruby[1]}"`));
				}
				else {
					this.aSpan.push(`<span data-add="${a_ruby[1]}">`);
				}
				this.aSpan_bk = this.aSpan;
				this.aSpan = [];
				return;	// breakではない
			case 'add_close':
				this.autoCloseSpan();
				return;	// breakではない

			case 'grp':	//	画像など 《grp｜{"id":"break","pic":"breakline"}》
				const oJsonGrp = JSON.parse(a_ruby[1]);
				if (! ('id' in oJsonGrp)) oJsonGrp.id = this.aSpan.length;
				const ndGrp = this.htmTxt.querySelector(`span[data-cmd="grp"][data-id="${oJsonGrp.id}"]`);
				if (ndGrp) return;	// breakではない

				add_htm = `<span data-cmd='grp' data-id='${oJsonGrp.id}' data-arg='${a_ruby[1]}'>　</span>`;
				if (this.aSpan[this.aSpan.length -1] == add_htm) return;	// breakではない
				break;

			case 'del':
				// runAnalyze()冒頭のresume();により二回呼ばれる可能性
				const len = this.cntTxt.children.length;
				if (len == 0) return;	// breakではない
				const ndDel = this.htmTxt.querySelector(`span:last-child[data-cmd="grp"][data-id="${a_ruby[1]}"]`);
				if (! ndDel) return;	// breakではない

				ndDel.parentElement!.removeChild(ndDel);
				for (const st of this.aSpTw) if (st.tw) st.tw.stop();
				this.aSpTw = [];

				if (this.aRect.length == 0) return;	// breakではない
				const last_rect = this.aRect[this.aRect.length -1];
				if (last_rect.arg == undefined) return;	// breakではない
				const oJsonDel = JSON.parse(last_rect.arg);
				if (last_rect.cmd == 'grp' && oJsonDel.id == a_ruby[1]) {
					this.aSpan.pop();
					this.aRect.pop();
					this.cntTxt.removeChild(this.cntTxt.children[len -1]);
				}
				return;	// breakではない

			case 'span':
				this.autoCloseSpan();
				if (a_ruby[1]) {
					this.aSpan.push(`<span style="${a_ruby[1]}">`);
					this.aSpan_bk = this.aSpan;
					this.aSpan = [];
				}
				return;	// breakではない

			case 'link':
				this.autoCloseSpan();

				// b_color, b_alpha, fn, label
				const oJson2 = JSON.parse(a_ruby[1]);
				this.aSpan.push(`<span style='${oJson2.style}' data-cmd='link' data-arg='${a_ruby[1]}'>`);
				this.aSpan_bk = this.aSpan;
				this.aSpan = [];
				return;	// breakではない

			case 'endlink':	this.autoCloseSpan();	return;	// breakではない

			default:	// ルビあり文字
				add_htm = `<ruby>${text}<rt>${ruby}</rt></ruby>`;
			}
			break;

		case 3:		// 《tcy｜451｜かし》
			switch (a_ruby[0]) {
			case 'tcy':	// ルビ付き縦中横
				// text-orientation: mixed;（デフォルト）和文は縦、英語は横に表示
				// -webkit-								(Safari)
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
					-webkit-text-orientation: upright;
				'><span data-tcy='${id_tcy}' style='
					text-combine-upright: all;
					-webkit-text-combine: horizontal;
				'>${a_ruby[1]}</span><rt>${ruby}</rt></ruby>`
				: `<span data-tcy='${id_tcy}' style='
					text-orientation: upright;
					-webkit-text-orientation: upright;
					text-combine-upright: all;
					-webkit-text-combine: horizontal;
				'>${a_ruby[1]}</span>`;
				break;

			default:
			}
			break;
		}
		this.aSpan.push(add_htm);
	}
	private firstCh	= true;
	private aSpan: any[] = [];
	private aSpan_bk: any[] | null = null;
	private autoCloseSpan() {
		if (! this.aSpan_bk) return;

		this.aSpan_bk.push(this.aSpan, '</span>')
		this.aSpan = Array.prototype.concat.apply([], this.aSpan_bk);
		this.aSpan_bk = null;
	}

	private goTxt() {
		this.autoCloseSpan();
		if (this.aSpan.length == 0) return;

		//console.log(`🍅 goTxt[${this.cntGotxt}]`);
		if (++this.cntGotxt == 1) this.goTxt2_htm2tx();
	}
	private goTxt2_htm2tx() {
		//console.log(`🍆 goTxt2_htm2tx[${this.cntGotxt}]`);
		//this.htmTxt.innerHTML = this.aSpan.join('');
			// これだとSafariでgetChRects()内 getBoundingClientRect()で異常な値になる。
			// <br/>ではなく<p>〜</p>にする。（ただし空では改行せず、全角空白一文字必要らしい）
		let sJoinSpan = this.aSpan.join('');
		TxtLayer.recText(sJoinSpan);
		if (sJoinSpan.slice(-5) == '<br/>') sJoinSpan = sJoinSpan.slice(0, -5) +`<p style='margin: 0px;'>　</p>`;	// 次行の処理で、終端に「　」を追加させない前処理
		const tmp = sJoinSpan.split('<br/>').map(v=> (
			v.includes('</p>')
			? v		// <p>入れ子予防
			: `<p style='margin: 0px;'>${(v == '') ?'　' :v}</p>`
		)).join('');
		//console.log(`OUT=${tmp}=`);
		this.htmTxt.innerHTML = tmp;
			// <span>内の絵文字で元ネタDomが壊れる（？マーク）ので
			// insertAdjacentHTML()は使わない
		this.htmTxt.hidden = false;


		// tsayen/dom-to-image: Generates an image from a DOM node using HTML5 canvas https://github.com/tsayen/dom-to-image

		// TODO: いつかのタイミングでコードをキレイにしたい
/*---*/
		const util = {
			escape: (str: string)=> str.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1'),
			mimeType: (url: any)=> {
				const extension = parseExtension(url).toLowerCase();
				return mimes()[extension] || '';
			},
			dataAsUrl: dataAsUrl,
			isDataUrl: isDataUrl,
			resolveUrl: resolveUrl,
			getAndEncode: getAndEncode,
			asArray: (arrayLike: StyleSheetList)=> {
				const array: StyleSheet[] = [];
				const length = arrayLike.length;
				for (let i = 0; i < length; ++i) array.push(arrayLike[i]);
				return array;
			},
		};
			function mimes(): any {
				// Only WOFF and EOT mime types for fonts are 'real'
				// * see http://www.iana.org/assignments/media-types/media-types.xhtml
				const WOFF = 'application/font-woff';
				const JPEG = 'image/jpeg';

				return {
					'woff': WOFF,
					'woff2': WOFF,
					'ttf': 'application/font-truetype',
					'eot': 'application/vnd.ms-fontobject',
					'png': 'image/png',
					'jpg': JPEG,
					'jpeg': JPEG,
					'gif': 'image/gif',
					'tiff': 'image/tiff',
					'svg': 'image/svg+xml'
				};
			}


		const inliner = newInliner();


		const fontFaces = newFontFaces();


		function embedFonts(node: any) {
			return fontFaces.resolveAll()
			.then(cssText=> {
				const styleNode = document.createElement('style');
				node.appendChild(styleNode);
				styleNode.appendChild(document.createTextNode(cssText));
			//console.log('cssText:%s:', cssText);	//------------
				return node;
			});
		}


			function parseExtension(url: any) {
				const match = /\.([^\.\/]*?)$/g.exec(url);
				if (match) return match[1];
				else return '';
			}

			function isDataUrl(url: any) {
				return url.search(/^(data:)/) !== -1;
			}

			function resolveUrl(url: any, baseUrl: any) {
				const doc = document.implementation.createHTMLDocument();
				const base = doc.createElement('base');
				doc.head.appendChild(base);
				const a = doc.createElement('a');
				doc.body.appendChild(a);
				base.href = baseUrl;
				a.href = url;
				return a.href;
			}

			function getAndEncode(url: any) {
				let TIMEOUT = 30000;
				//if(domtoimage.impl.options.cacheBust) {
					// Cache bypass so we dont have CORS issues with cached images
					// Source: https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
				//	url += ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime();
				//}

				return new Promise(function (resolve) {
					const request = new XMLHttpRequest();

					request.onreadystatechange = done;
					request.ontimeout = timeout;
					request.responseType = 'blob';
					request.timeout = TIMEOUT;
					request.open('GET', url, true);
					request.send();

					//let placeholder;
					//if(domtoimage.impl.options.imagePlaceholder) {
					//	let split = domtoimage.impl.options.imagePlaceholder.split(/,/);
					//	if(split && split[1]) {
					//		placeholder = split[1];
					//	}
					//}

					function done() {
						if (request.readyState !== 4) return;

						if (request.status !== 200) {
						//	if(placeholder) {
						//		resolve(placeholder);
						//	} else {
								fail('cannot fetch resource: ' + url + ', status: ' + request.status);
						//	}

							return;
						}

						const encoder = new FileReader();
						encoder.onloadend = function () {
							const content = encoder.result!.toString().split(/,/)[1];
							resolve(content);
						};
						encoder.readAsDataURL(request.response);
					}

					function timeout() {
					//	if(placeholder) {
					//		resolve(placeholder);
					//	} else {
							fail('timeout of ' + TIMEOUT + 'ms occured while fetching resource: ' + url);
					//	}
					}

					function fail(message: any) {
						console.error(message);
						resolve('');
					}
				});
			}

			function dataAsUrl(content: any, type: any) {
				return 'data:' + type + ';base64,' + content;
			}


		function newInliner() {
			const URL_REGEX = /url\(['"]?([^'"]+?)['"]?\)/g;

			return {
				inlineAll: inlineAll,
				shouldProcess: shouldProcess,
			};

			function shouldProcess(str: any) {
				return str.search(URL_REGEX) !== -1;
			}

			function readUrls(str: any) {
				const result: string[] = [];
				let match: RegExpExecArray | null;
				while ((match = URL_REGEX.exec(str))) {
					result.push(match[1]);
				}
				return result.filter(function (url) {
					return !util.isDataUrl(url);
				});
			}

			function inline(str: any, url: any, baseUrl: any, get: any) {
				return Promise.resolve(url)
					.then(url=> baseUrl ? util.resolveUrl(url, baseUrl) : url)
					.then(get || util.getAndEncode)
					.then(data=> util.dataAsUrl(data, util.mimeType(url)))
					.then(dataUrl=> str.replace(urlAsRegex(url), '$1' + dataUrl + '$3'));

				function urlAsRegex(url: any) {
					return new RegExp('(url\\([\'"]?)(' + util.escape(url) + ')([\'"]?\\))', 'g');
				}
			}

			function inlineAll(str: any, baseUrl: any, get?: any) {
				if (nothingToInline()) return Promise.resolve(str);

				return Promise.resolve(str)
					.then(readUrls)
					.then(urls=> {
						let done = Promise.resolve(str);
						for (const url of urls) {
							done = done.then(string=> {
								return inline(string, url, baseUrl, get);
							});
						}
						return done;
					});

				function nothingToInline() {
					return !shouldProcess(str);
				}
			}
		}

		function newFontFaces() {
			return {
				resolveAll: resolveAll,
				impl: {readAll: readAll}
			};

			function resolveAll() {
				return readAll()
				.then(webFonts=> Promise.all(
					webFonts.map((webFont: any)=> webFont.resolve())
				))
				.then(cssStrings=> cssStrings.join('\n'));
			}

			function readAll() {
				return Promise.resolve(util.asArray(document.styleSheets))
					.then(getCssRules)
					.then(selectWebFontRules)
					.then(rules=> rules.map(newWebFont));
						// console.log('map:%o:', rules) ||

				function selectWebFontRules(cssRules: any) {
					return cssRules
					.filter((rule: any)=> rule.type === CSSRule.FONT_FACE_RULE)
					.filter((rule: any)=> inliner.shouldProcess(rule.style.getPropertyValue('src')));
				}

				function getCssRules(styleSheets: any) {
					const cssRules: any = [];
					for (const sheet of styleSheets) {
					//console.log('1:%o', sheet);	//-------
						try {
							if (sheet.href) continue;
						//console.log(sheet.cssRules);
							util.asArray(sheet.cssRules || []).map(cssRules.push.bind(cssRules));
						}
						catch (e) {
							console.error('Error while reading CSS rules from ' + sheet.href, e.toString());
						}
					}

					return cssRules;
				}

				function newWebFont(webFontRule: any) {
					//console.log('newWebFont:%o:', webFontRule);	//-------
					return {
						resolve: function resolve() {
							const baseUrl = (webFontRule.parentStyleSheet || {}).href;
							return inliner.inlineAll(webFontRule.cssText, baseUrl);
						},
						src: function () {
							return webFontRule.style.getPropertyValue('src');
						}
					};
				}
			}
		}

/*
		fetch('http://localhost:8080/prj/mat/my_himajihoso.woff2')
		.then(response=> {
			if (response.ok) return response.blob();
			throw new Error('Network response was not ok.');
		})
		.then(blob=> new Promise((resolve, reject)=> {
			const reader = new FileReader();
			reader.onloadend = ()=> resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		}))
		.then(dataUrl => {
			// data:application/font-woff2;base64,d09GMk9U
			const css =
			'body { margin: 0px; padding: 0px; overflow: hidden; }\n'+
			'body { line-height: 36px; }\n'+

			`@font-face { font-family: my_himajihoso; src: url("${
				'data:application/font-woff;base64,'+
				String(dataUrl)
				.split(/,/)[1]
		//		.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1')
			}"); }`;

		console.log('css:'+ css);
		console.log('@font-face { font-family: my_himajihoso; src: url("data:application/font-woff;base64,d09GMk9UVE8AAA...bhUAAA=="); }\n');
			this.styleHtmTxt.appendChild(document.createTextNode(css));
*/
		const img = new Image;
		Promise.resolve(this.htmTxt)	// toSvg(node, options) {
		.then(node=> {
			//console.log(`🍇 cloneNode`);
			const cln = node.cloneNode(true) as HTMLSpanElement;
			cln.style.padding = '0px';		// ややこしいのでシンプルに
			// CSS・インラインレイアウトで右や上にはみ出る分の余裕
			if (cln.style.writingMode == 'vertical-rl') {
				this.paddingmkTx4x = parseFloat(cln.style.fontSize || '0');
				this.paddingmkTx4y = 0;
			}
			else {
				this.paddingmkTx4x = 0;
				this.paddingmkTx4y = parseFloat(cln.style.fontSize || '0');
			}
			cln.style.paddingRight = this.paddingmkTx4x +'px';
			cln.style.paddingTop = this.paddingmkTx4y +'px';
			cln.style.left = '0px';
			cln.style.top = '0px';
			cln.style.width = (this.$width -this.pad_left -this.pad_right) +'px';
			cln.style.height = (this.$height -this.pad_top -this.pad_bottom) +'px';
			//console.log(cln.style.cssText);
			this.htmTxt.hidden = true;
			return cln;
		})
		.then(embedFonts)
		.then(node=> {		// makeSvgDataUri()
			//console.log(`🍈 makeSvgDataUri`);
			node.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
			//img.crossOrigin = 'Anonymous';	//--いまのとこ不要
			img.src = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${this.$width
			}px" height="${this.$height
			}px"><foreignObject x="0" y="0" width="100%" height="100%">${
				new XMLSerializer().serializeToString(node)
				.replace(/#/g, '%23').replace(/\n/g, '%0A')
			}</foreignObject></svg>` // ? + new Date().getTime();
			return new Promise(resolve=> img.onload = resolve);
		})
		.then(()=> new Promise(resolve=> setTimeout(resolve, 100)))
		// 無くすとSafariでテクスチャ取れない場合があった
		.then(()=> {	// toPng()
			//console.log(`🍉 toPng[${this.cntGotxt}]`);
			if (this.cntGotxt == 0) return;	// 強制中断用

			const canvas = document.createElement('canvas');
			canvas.width = this.$width;
			canvas.height = this.$height;
			canvas.getContext('2d')!.drawImage(img, 0, 0);

			/*canvas.toBlob(blob=> {	// ゴミが残る気がする
				const url = URL.createObjectURL(blob);
				Texture.fromImage(url).once('update', tx2=> {
					// Texture.fromCanvas()ではダメみたい
					this.goTxt3_tx2sp(tx2);
					img.src = '';
					URL.revokeObjectURL(url);
					if (--this.cntGotxt > 0) this.goTxt2_htm2tx();
				});
			});*/

			const dataUrl = canvas.toDataURL('image/png');
			const tx = utils.TextureCache[dataUrl];	//console.log(`🍊 `+ (tx));
			if (tx) {
				this.goTxt3_tx2sp(tx);
				if (--this.cntGotxt > 0) this.goTxt2_htm2tx();
			}
			else Texture.fromImage(dataUrl).once('update', tx2=> {
				// Texture.fromCanvas()ではダメみたい
				this.goTxt3_tx2sp(tx2);
				if (--this.cntGotxt > 0) this.goTxt2_htm2tx();
			});
		})
		.catch(err=> DebugMng.myTrace(`goTxt2_htm2tx() = ${err}`));
	}
	private cntGotxt = 0;
	private paddingmkTx4x = 0;
	private paddingmkTx4y = 0;

/*
	X=0、左端から文字が吹っ飛んでくる動き、も面白い

	const f_size = this.hLay_txt.fontsize;
	tx.position.set(this.hps +tg_inf.dx *f_size, this.vps +tg_inf.dy *f_size);
	tx.alpha = 0;
	this.addChild(tx);
	if (tg_inf.isRotate) {
		const tx2 = new Text(text, this.tsSpan.clone());
		tx.addChild(tx2);
		tx2.setTransform(tx.height, 0, 1, 1, 90*Math.PI/180, 0, 0, 0, 1);
	}
	const x = tx.x, y = tx.y, w = tx.width, h = tx.height, r = tx.rotation;
	//	tx.width /= 5;	tx.height /= 5;				// 2
	//	tx.width *= 2;	tx.height *= 2;				// 3
	//	tx.x += (w -tx.width)/2;	tx.y += (h -tx.height)/2;	// 2,3
	//	tx.y -= f_size/5;	// 4
	//	tx.y += f_size/3;	// 5
	tx.x -= f_size/3;	// 6
	//	tx.rotation = 45/90;	// 7
	const tw = new TWEEN.Tween(tx)
	//	.to({alpha: 1}, 500)	// 1
	.to({alpha: 1, x: x, y: y, width: w, height: h, rotation: r}, 500)	// 2-7
	.easing(TWEEN.Easing.Quadratic.Out)		// 4,(7)
	//	.easing(TWEEN.Easing.Bounce.Out)		// 5,6
		// Easing Function 早見表 http://easings.net/ja
*/

	private static	REG_SURROGATE	= /[\uDC00-\uDFFF]/;
	private goTxt3_tx2sp(tx: Texture) {
		if (this.cntGotxt == 0) return;
		//console.log(`🍋 goTxt3[${this.cntGotxt}]`);

		// 個別文字テクスチャ制作用の元テクスチャ、瞬時表示で使えるかも
		if (TxtLayer.cfg.oCfg.debug.baseTx) {this.cntTxt.addChild(new Sprite(tx)); return}
		const lenPutedRect = this.aRect.length;

		this.htmTxt.hidden = false;
		const aRect = this.getChRects(this.htmTxt);
		this.htmTxt.hidden = true;
		// サロゲートペア対策（分割されるので一つに結合）
		for (let i=aRect.length -1; i>0; --i) {	// i==0はなし
			const r2 = aRect[i];
			TxtLayer.REG_SURROGATE.lastIndex = 0;
			if (! TxtLayer.REG_SURROGATE.test(r2.ch)) continue;

			const r1 = aRect[i -1];
			r1.ch += r2.ch;
			if (r1.rect.y != r2.rect.y) r1.rect.height += r2.rect.height;
				// SafariとWebkit系で文字選択結果が異なる対応
			aRect.splice(--i, 2, r1);
		}
		// 縦中横結合
		for (let i=aRect.length -1; i>0; --i) {	// i==0はなし
			const t2 = aRect[i];
			if (! t2.tcy) continue;

			for (let j=i-1; j>=0; --j) {
				const t1 = aRect[j];
				if (t1.tcy != t2.tcy) {i = j +1; break;}

				t2.ch = t1.ch + t2.ch;	// 上と違ってt2に集約、二個以上があるので
				t1.rect.height += t2.rect.height;	// ChromeとSafariの動作違い考慮
				t2.rect = t1.rect;					// rectは最後(t1)が常に正しい。が、
													// heightだけは合計する必要がある
				aRect.splice(j, 2, t2);	// 毎回置換
			}
		}
		// テクスチャ元中間objはpaddingを使わないので
		for (const cr of aRect) cr.rect.y -= this.pad_top;
		// [l]後に文字続ける場合、後にくっつく文字によって場所が変わる対応
		for (let i=0; i<lenPutedRect; ++i) {
			const rect = aRect[i].rect.clone();
			rect.x -= this.xz4htm2rect;
			this.cntTxt.children[i].position.set(rect.x, rect.y);
		}

		// 表示済み文字変更を検知
		let begin = 0;
		if (this.aRect.length == 0) {	// 初回
			if (TxtLayer.cfg.oCfg.debug.masume) {
				if (TxtLayer.cfg.oCfg.debug.devtool) console.log(`🍌 masume ${
					this.name} v:${this.cnt.visible} l:${this.cnt.x} t:${this.cnt.y
					} a:${this.cnt.alpha} pl:${this.pad_left} pr:${this.pad_right
					} pt:${this.pad_top} pb:${this.pad_bottom} fs:${this.fontsize
					} w:${this.$width} h:${this.$height}`);

				this.grpDbgMasume.clear();
				this.grpDbgMasume.beginFill(0x33FF00, 0.2);	// 文字レイヤ
				this.grpDbgMasume.lineStyle(1, 0x33FF00, 1);
				this.grpDbgMasume.drawRect(-this.pad_left, -this.pad_top, this.$width, this.$height);
					// 親の親の cntInsidePadding が padding ぶん水平移動してるので引く。
				this.grpDbgMasume.endFill();

				this.grpDbgMasume.beginFill(0x0033FF, 0.2);	// cntInsidePadding
				this.grpDbgMasume.lineStyle(2, 0x0033FF, 1);
				this.grpDbgMasume.drawRect(0, 0, this.$width -this.pad_left -this.pad_right, this.$height -this.pad_top -this.pad_bottom);
				this.grpDbgMasume.endFill();
			}
		}
		else {
			for (begin=lenPutedRect -1; begin>=0; --begin) {
				if (aRect[begin].ch == this.aRect[begin].ch) continue;

				// 表示済み文字変更発見、まずは旧文字を削除
				//console.log(`!!! begin:${begin} '${aRect[begin].ch}' != '${this.aRect[begin].ch}'`);
				this.click();	// tween停止
				for (const v of this.cntTxt.removeChildren(begin)) {
					v.removeAllListeners().destroy();
				}
				break;
			}
			if (begin < 0) begin = lenPutedRect;	// 変化無し
		}
		this.aRect = aRect;

		let delay = 0;
		let fncDelay = (timAutoWc: number)=> {
			if (timAutoWc != null) delay = timAutoWc;
			fncDelay = (timAutoWc: number)=> {
				delay += (timAutoWc != null) ? timAutoWc : LayerMng.msecChWait;
			};
		};
		//console.log(`cnt(%d, %d) cntInsidePadding(%d, %d) cntTxt(%d, %d) grpDbgMasume(%d, %d)`, this.cnt.x, this.cnt.y, this.cntInsidePadding.x, this.cntInsidePadding.y, this.cntTxt.x, this.cntTxt.y, this.grpDbgMasume.x, this.grpDbgMasume.y);
		const len = this.aRect.length;
		for (let i=begin; i<len; ++i) {
			const v = this.aRect[i];
			const rct = v.rect.clone();
			rct.x -= this.xz4htm2rect;
			if (TxtLayer.cfg.oCfg.debug.masume) {	// ガイドマス目（デバッグ用）
				if (TxtLayer.cfg.oCfg.debug.devtool) console.log(`🍌 masume ch:${v.ch} x:${rct.x} y:${rct.y} w:${rct.width} h:${rct.height}`);
				this.grpDbgMasume.beginFill(0x66CCFF, 0.5);
				this.grpDbgMasume.lineStyle(2, 0xFF3300, 1);
				this.grpDbgMasume.drawRect(rct.x, rct.y, rct.width, rct.height);
				this.grpDbgMasume.endFill();
			}

			if (v.add) {
				const oJs: any = JSON.parse(v.add.replace(/'/g, '"'));
				delay += uint(oJs.wait);
			}
			else fncDelay(TxtLayer.hAutoWc[v.ch]);
			const o = v.arg ?JSON.parse(v.arg) :{};
			const already_put = i < lenPutedRect;
			const ease = this.fi_easing
				? CmnTween.hEase[this.fi_easing]
				: TWEEN.Easing.Linear.None;
			if (! ease) throw '異常なease指定です';

			const spWork = (sp: Container, replace_pos_by_sp = true)=> {
				// 文字表示効果・初期状態変更
				sp.alpha = 0;
				sp.position.set(rct.x, rct.y);
				if (o.width) sp.width = o.width;
				if (o.height) sp.height = o.height;
				if (replace_pos_by_sp) {
					rct.width = sp.width;	// スプライトのサイズを正とする
					rct.height = sp.height;
				}
				if (this.ch_filter && v.cmd != 'link') sp.filters = this.ch_filter;
				//Layer.argChk_BlendmodeAndSet(o, sp);
				this.fncFi(sp);

				//console.log(`spWork: i:${i} ch:${v.ch} x:${rct.x} y:${rct.y}`);
				const st: ISpTw = {
					sp: sp,
					tw: new TWEEN.Tween(sp)
						.to({ alpha: 1, x: rct.x, y: rct.y, width: rct.width, height: rct.height, rotation: 0 },
							already_put
							? 0	// 文字変更時は瞬時差し替え
							: this.ch_anime_time_仮
						)
						.easing(ease)
						.delay(delay)
						.onComplete(()=> {
							st.tw = null;
							//(略)	if (rct.width == 0 || rct.height == 0) return;
							//if (sp instanceof Sprite) sp.cacheAsBitmap = true;
							//　これを有効にすると[snapshot]で文字が出ない
						})
						.start()
				};
				this.aSpTw.push(st);
			};

			switch (v.cmd) {
			case 'grp':
				if (o.pic in TxtLayer.hNoReplaceDispObj) break;// 無くて良い場合

				const cnt = new Container;	// コンテナひとつかまし、即時spWork()を
				this.cntTxt.addChild(cnt);
				spWork(cnt, false);
				GrpLayer.csv2Sprites(o.pic, cnt, ()=> {
					// ロード完了時にクリアされていた場合はコンテナを空に
					if (! cnt.parent) cnt.removeChildren();
				});
				break;

			default:	// 文字
				const tx_c = tx.clone();
				tx_c.frame = new Rectangle(
					rct.x +this.paddingmkTx4x,
					rct.y +this.paddingmkTx4y,
					rct.width, rct.height);
				if (tx_c.frame.x < 0 || tx_c.frame.y < 0) console.log(`x=${tx_c.frame.x} または y=${tx_c.frame.y} が負の値です。文字「${v.ch}」が表示されない場合があります`);

				const sp = new Sprite(tx_c);
				this.cntTxt.addChild(sp);
				spWork(sp);
				if (v.cmd == 'link') {
					if (! v.arg) throw `fn:TxtLayer.ts v.arg null`;
					const o: any = JSON.parse(v.arg);
					o.key = this.name +' link:'+ i;	// 一文字ずつ別ボタン
					TxtLayer.evtMng.button(o, sp);
				}
			}
		}
	}
	private aRect : IChRect[] = [];
	private aSpTw : ISpTw[] = [];

	private lh_half = 0;	// 「g」などで下が欠ける問題対策
	private getChRects(elm: Node): IChRect[] {	// 注意）再帰関数
		const ret: any = [];
		if (elm.nodeType != elm.TEXT_NODE) {
			for (const v of elm.childNodes) ret.push(this.getChRects(v));
			return Array.prototype.concat.apply([], ret);	// 配列をフラットにする
		}

		const range = elm.ownerDocument!.createRange();
		range.selectNodeContents(elm);
		let pos = 0;
		const end = range.endOffset;
		// できれば一文字ずつ「after-edge - baseline」を調べたいが、暫定手段を取る
		//const styles = window.getComputedStyle(this.htmTxt);
		//console.log('lh:'+ styles.lineHeight +' fs:'+ styles.fontSize);
		while (pos < end) {
			range.setStart(elm, pos);
			range.setEnd(elm, ++pos);
			const r = range.getBoundingClientRect();
			const pe = range.startContainer.parentElement;
			if (! pe) throw `fn:TxtLayer.ts pe null`;
			const ch = range.toString();
			const cr :IChRect = {
				ch	: ch,
				rect: new Rectangle(
					r.left +window.pageXOffset,
					r.top  +window.pageYOffset,
					r.width,
					r.height +('gjqy'.includes(ch) ?this.lh_half :0)),
				cmd	: pe.getAttribute('data-cmd') || undefined,
				arg	: pe.getAttribute('data-arg') || undefined,
				add	: pe.getAttribute('data-add') || undefined,
				tcy	: pe.getAttribute('data-tcy') || undefined,
			};
			ret.push(cr);
			//console.log('ch:%s rect:%o', cr.ch, cr.rect);
		}
		range.detach();

		return ret;
	}

	click(): boolean {	// true is stay
		let isLiveTw = false;
		for (const st of this.aSpTw) {
			if (st.tw) {st.tw.stop().end(); isLiveTw = true;}	// Text Skip
				// stop() と end() は別！
		}
		this.aSpTw = [];
		return isLiveTw;
	}

	clearText(): void {
		this.cntGotxt = 0;

		this.aRect = [];
		this.grpDbgMasume.clear();
		//this.htmTxt.innerHTML = '';		以下の方が早いらしい
		this.htmTxt.textContent = '';

		this.aSpan = [];
		this.aSpan_bk = null;
		this.firstCh = true;

		//utils.clearTextureCache();	// 改ページと思われるこのタイミングで
		this.click();
		if (this.ch_anime_time_仮 == 0) {
			for (const c of this.cntTxt.removeChildren()) c.removeAllListeners().destroy();
		}
		else {
			const ease = this.fo_easing
				? CmnTween.hEase[this.fo_easing]
				: TWEEN.Easing.Linear.None;
			if (! ease) throw '異常なease指定です';

			for (const c of this.cntTxt.children) {
				c.removeAllListeners();	// マウスオーバーイベントなど。クリックは別
				new TWEEN.Tween(c)
				.to(this.fo, this.ch_anime_time_仮)
				.easing(ease)
				//.delay(i * LayerMng.msecChWait)
				.onComplete(o=> this.cntTxt.removeChild(o))
				.start();
			}
		}
		this.aSpTw = [];
	}
//	recText(txt: string): void {this.sprTlf.recText(txt);}

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
	record = ()=> Object.assign(super.record(), {
		enabled	: this.enabled,
		cssText	: this.htmTxt.style.cssText,

		// バック
		b_do	: (this.b_do == null)
					? null
					: (this.b_do instanceof Sprite ?'Sprite' :'Graphics'),
		b_pic	: this.b_pic,
		b_color	: this.b_color,
		b_alpha	: this.b_alpha,
		b_alpha_isfixed	: this.b_alpha_isfixed,

		ch_anime_time_仮	: this.ch_anime_time_仮,
		//fncFi		: this.fncFi,
		fi_easing	: this.fi_easing,
		//ch_filter	: this.ch_filter,
		fo			: this.fo,
		fo_easing	: this.fo_easing,
		xz4htm2rect : this.xz4htm2rect,

		btns: this.cntBtn.children.map(btn=> btn.name),
	});
	playback(hLay: any, fncComp: undefined | {(): void} = undefined): boolean {
		super.playback(hLay);
		this.enabled	= hLay.enabled;

		// バック
		this.b_alpha_isfixed	= hLay.b_alpha_isfixed;
		let ret = this.drawBack(
			(hLay.b_do)
			? (hLay.b_do == 'Sprite' ?{b_pic: hLay.b_pic} :{b_color: hLay.b_color})
			: {b_pic: ''}
		);

		this.htmTxt.style.cssText = hLay.cssText;
		this.pad_left = parseFloat(this.htmTxt.style.paddingLeft || '0');
		this.pad_right = parseFloat(this.htmTxt.style.paddingRight || '0');
		this.pad_top = parseFloat(this.htmTxt.style.paddingTop || '0');
		this.pad_bottom = parseFloat(this.htmTxt.style.paddingBottom || '0');
		this.fontsize = parseFloat(this.htmTxt.style.fontSize || '0');
		this.$width = parseFloat(this.htmTxt.style.width || '0');
		this.$height = parseFloat(this.htmTxt.style.height || '0');

		this.cntInsidePadding.position.set(this.pad_left, this.pad_top);

		this.ch_anime_time_仮	= hLay.ch_anime_time_仮;
//		this.fncFi	= hLay.fncFi;			// TODO: 未作成
//		this.fncFi		= (sp: DisplayObject)=> {sp.x += this.fontsize /3};
		this.fi_easing	= hLay.fi_easing;
//		this.ch_filter	= hLay.ch_filter;	// TODO: 未作成
		this.fo	= hLay.fo;
		this.fo_easing	= hLay.fo_easing;

		this.xz4htm2rect = hLay.xz4htm2rect;

		// addButton(hArg: HArg): boolean
		const aBtn: string[] = hLay.btns;
		aBtn.map(v=> ret = ret || this.addButton(JSON.parse(v)));

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
			aPixiObj.push(`{"class":"${cls}", "name":"${e.name}", "alpha":${e.alpha}, "x":${e.x}, "y":${e.y}}`);
		}
		return super.dump() +`, "enabled":"${this.enabled
		}", "style":"${this.htmTxt.style.cssText.replace(/(")/g, '\\$1')
		}", "b_pic":"${this.b_pic}", "b_color":"${this.b_color
		}", "b_alpha":${this.b_alpha}, "b_alpha_isfixed":"${this.b_alpha_isfixed
		}", "b_width":${this.$width}, "b_height":${this.$height
		}, "txt":"${this.htmTxt.textContent!.replace(/(")/g, '\\$1')
		}", "pixi_obj":[${aPixiObj.join(',')}]`;
	}

	// 文字ごとのウェイト
	private	static doAutoWc		= false;
	private	static hAutoWc	: {[ch: string]: number} = {};
	private static autowc	= (hArg: HArg)=> {
		TxtLayer.doAutoWc = CmnLib.argChk_Boolean(hArg,'enabled',TxtLayer.doAutoWc);

		const ch = hArg.text;
		if (('text' in hArg) != ('time' in hArg)) throw '[autowc] textとtimeは同時指定必須です';
		if (! hArg.text) {
			if (TxtLayer.doAutoWc && ch == '') throw '[autowc] enabled == false かつ text == "" は許されません';
			return false;
		}

		const len = ch!.length;
		if (TxtLayer.doAutoWc && len == 0) throw '[autowc] enabled == false かつ text == "" は許されません';

		const a = String(hArg.time!).split(',');
		if (a.length != len) throw '[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい';
		TxtLayer.hAutoWc = {};
		for (let i=0; i<len; ++i) TxtLayer.hAutoWc[ch![i]] = uint(a[i]);

		return false;
	}

};
