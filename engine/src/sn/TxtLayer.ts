/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Layer} from './Layer';

import {CmnLib, IVariable, IHTag, HArg, IPutCh, IEvtMng, uint, IMain} from './CmnLib';
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
	tw	: TWEEN.Tween;
};

export class TxtLayer extends Layer {
	private	static	val		: IVariable	= null;
	private	static	hNoReplaceDispObj	: {[name: string]: boolean} = {};

	private	static	glbStyle: HTMLStyleElement	= null;
	private	static	cfg		: Config	= null;
	static	init(cfg: Config, hTag: IHTag, val: IVariable): void {
		TxtLayer.cfg = cfg;
		TxtLayer.val = val;

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
		TxtLayer.val = null;
		TxtLayer.evtMng = null;
		RubySpliter.destroy();

		TxtLayer.hNoReplaceDispObj = {};
	}

	private	$width		= 0;
	private	$height		= 0;
	private pad_left	= 0;	// paddingLeft
	private pad_right	= 0;	// paddingRight
	private pad_top		= 0;	// paddingTop
	private pad_bottom	= 0;	// paddingBottom

	// バック
	private b_color			= 0x000000;
	private b_alpha			= 0;
	private b_alpha_isfixed	= false;
	private b_do			: DisplayObject	= null;
	private b_pic			= '';

	// メッセージ
	private htmTxt			= document.createElement('span');	// サンプリング元
	private cntTxt			= new Container;					// サンプリング先
	private grpDbgMasume	= new Graphics;
	private cntInsidePadding= new Container;
	private	fontsize		= 24;

	private	ch_anime_time_仮	= 500;
	private	fncFi			= (sp: DisplayObject)=> {sp.x += this.fontsize /3};
	private fi_easing		= TWEEN.Easing.Quadratic.Out;
	private ch_filter		: any[] | null	= null;
	private fo				= {alpha: 0, x: `+${ this.fontsize /3 }`};
	private fo_easing		= TWEEN.Easing.Quadratic.Out;

	private	rbSpl			= new RubySpliter;

	private cntBtn			= new Container;

	constructor() {
		super();

		const padding = 16 *CmnLib.retinaRate;	// 初期padding
		this.cnt.addChild(this.cntInsidePadding);
		this.cntInsidePadding.position.set(padding, padding);

		this.cntInsidePadding.addChild(this.grpDbgMasume);

		this.rbSpl.init(this.putCh);
		this.cntInsidePadding.addChild(this.cntTxt);

		this.cnt.addChild(this.cntBtn);	// ボタンはpaddingの影響を受けない

		this.lay({style: `width: ${CmnLib.stageW -padding*2}px; height: ${CmnLib.stageH -padding*2}px; font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif; color: white; font-size: 24px; line-height: 36px; padding: ${padding}px;`});

		this.htmTxt.hidden = true;
		document.body.appendChild(this.htmTxt);
	}
	destroy() {
		if (this.b_do) {this.cnt.removeChild(this.b_do).destroy(); this.b_do = null}
		document.body.removeChild(this.htmTxt);

		this.ch_anime_time_仮 = 0;
		this.clearText();
	}

	private	static	evtMng	: IEvtMng	= null;
	static setEvtMng(main: IMain, evtMng: IEvtMng) {
		TxtLayer.evtMng = evtMng;
		Button.init(main, evtMng);
	}

	static addStyle(text) {TxtLayer.glbStyle.innerHTML += text +'\n';}


	lay(hArg: HArg): boolean {
		super.lay(hArg);
		Layer.setXY(this.cnt, hArg, this.cnt);

		this.rbSpl.setting(hArg);

		if ('b_color' in hArg) this.b_color = parseInt(hArg.b_color);
		this.b_alpha = CmnLib.argChk_Num(hArg, 'b_alpha', this.b_alpha);
		this.b_alpha_isfixed = CmnLib.argChk_Boolean(hArg, 'b_alpha_isfixed', this.b_alpha_isfixed);
		if (hArg.style) {
			//console.log('- hArg.style:%s', hArg.style);
			const cln = document.createElement('span');
			cln.style.cssText = hArg.style;
			const len = cln.style.length;
			for (let i=0; i<len; ++i) {
				const key = cln.style[i];
				if (key in this.hWarning) {
					DebugMng.myTrace(`${key}は指定できません`, 'W');
					continue;
				}
				this.htmTxt.style[key] = cln.style[key];
			}
			this.pad_left = parseFloat(this.htmTxt.style.paddingLeft);
			this.pad_right = parseFloat(this.htmTxt.style.paddingRight);
			this.pad_top = parseFloat(this.htmTxt.style.paddingTop);
			this.pad_bottom = parseFloat(this.htmTxt.style.paddingBottom);
			this.fontsize = parseFloat(this.htmTxt.style.fontSize);
			this.$width = parseFloat(this.htmTxt.style.width);
			this.$height = parseFloat(this.htmTxt.style.height);
			this.drawBack(hArg.b_pic);
		}

		if (hArg.b_color || hArg.b_alpha || hArg.b_alpha_isfixed || hArg.b_pic || hArg.back_clear) {
			if (CmnLib.argChk_Boolean(hArg, 'back_clear', false)) {
				this.b_color = 0x000000;
				this.b_alpha = 0;
				this.b_alpha_isfixed = false;
				if (this.b_do) {
					this.cnt.removeChild(this.b_do);
					this.b_do.destroy();
					this.b_do = null;
					this.b_pic = '';
					delete hArg.b_pic;
				}
			}
			else {
				if ('b_color' in hArg) this.b_color = parseInt(hArg.b_color);
				this.b_alpha = CmnLib.argChk_Num(hArg, 'b_alpha', this.b_alpha);
				this.b_alpha_isfixed = CmnLib.argChk_Boolean(hArg, 'b_alpha_isfixed', this.b_alpha_isfixed);
			}
			this.drawBack(hArg.b_pic);
		}

		const xSlide = TxtLayer.cfg.oCfg.debug.slideBaseSpan
			? document.documentElement.clientWidth -CmnLib.stageW
			: 0;
		this.htmTxt.style.position = 'absolute';
		this.htmTxt.style.left = xSlide +'px';
		this.htmTxt.style.top = `0px`;
		this.htmTxt.style.width = this.$width +'px';
		this.htmTxt.style.height = this.$height +'px';
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
			: (	parseFloat(this.htmTxt.style.lineHeight)
				-parseFloat(this.htmTxt.style.fontSize)	) /2;

		return false;
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

	private drawBack($b_pic: string): void {
		const alpha = (this.b_alpha_isfixed
			? 1
			: Number(TxtLayer.val.getVal('sys:TextLayer.Back.Alpha'))
		) *this.b_alpha;

		if ($b_pic) {
			if ($b_pic == 'null') return;
			if ($b_pic == this.b_pic) return;

			this.b_pic = $b_pic;
			if (this.b_do) {
				this.cnt.removeChild(this.b_do);
				this.b_do.destroy();
				this.b_do = null;
			}
			GrpLayer.csv2Sprites(this.b_pic, this.cnt, sp=> {
				this.b_do = sp;
				sp.visible = (alpha > 0);
				sp.alpha = alpha;
				//CmnLib.adjustRetinaSize(this.b_pic, doc);

				this.cnt.setChildIndex(sp, 0);
			});
		}
		else if (alpha > 0) {
			// 透明の時は塗らない。こうしないと透明テキストレイヤ下のボタンが
			// 押せなくなる（透明だが塗りがあるという扱いなので）
			if (this.b_do) {this.cnt.removeChild(this.b_do); this.b_do.destroy();}
			const grp = new Graphics;
			grp.beginFill(this.b_color, alpha);
			grp.lineStyle(undefined);
			grp.drawRect(0, 0, this.$width, this.$height);
			grp.endFill();
			this.b_do = grp;
			this.cnt.addChildAt(grp, 0);
			//this.graphics.cacheAsBitmap = true;
				// これを有効にするとスナップショットが撮れない？？
		}
	}


	tagCh(text: string): void {this.rbSpl.putTxt(text);}
	private	putCh : IPutCh = (text: string, ruby: string)=> {
		if (TxtLayer.cfg.oCfg.debug.putCh) console.log('🖊 文字表示 text:'+ text +' ruby:'+ ruby +':');

		const a_ruby = ruby.split('｜');
		let add_htm = '';
		switch (a_ruby.length) {
		case 1:		// 字or春《はる》
			if (text == '\n') {
				if (this.aSpan_bk) {
					add_htm = this.aSpan_bk[this.aSpan_bk.length -1];
					this.autoCloseSpan();
					this.aSpan.push('<br/>');
					this.aSpan_bk = this.aSpan;
					this.aSpan = [];
					break;
				}
				add_htm = '<br/>';
				break;
			}
			add_htm = (ruby)
				? `<ruby>${text}<rt>${ruby}</rt></ruby>`
				: text;
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

				ndDel.parentElement.removeChild(ndDel);
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
			// <br/>ではなく<p>〜</p>にする。
		this.htmTxt.innerHTML = this.aSpan.join('')
		.split('<br/>').map(v=> `<p style='margin: 0px;'>${v}</p>`).join('');
			// <span>内の絵文字で元ネタDomが壊れる（？マーク）ので
			// insertAdjacentHTML()は使わない
		this.htmTxt.hidden = false;

		// tsayen/dom-to-image: Generates an image from a DOM node using HTML5 canvas https://github.com/tsayen/dom-to-image

		// TODO:いつかのタイミングでコードをキレイにしたい
/*---*/
		const util = {
			escape: string=> string.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1'),
			mimeType: url=> {
				const extension = parseExtension(url).toLowerCase();
				return mimes()[extension] || '';
			},
			dataAsUrl: dataAsUrl,
			isDataUrl: isDataUrl,
			resolveUrl: resolveUrl,
			getAndEncode: getAndEncode,
			asArray: arrayLike=> {
				const array = [];
				const length = arrayLike.length;
				for (let i = 0; i < length; ++i) array.push(arrayLike[i]);
				return array;
			},
		};
			function mimes() {
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


		function embedFonts(node) {
			return fontFaces.resolveAll()
			.then(cssText=> {
				const styleNode = document.createElement('style');
				node.appendChild(styleNode);
				styleNode.appendChild(document.createTextNode(cssText));
			//console.log('cssText:%s:', cssText);	//------------
				return node;
			});
		}


			function parseExtension(url) {
				const match = /\.([^\.\/]*?)$/g.exec(url);
				if (match) return match[1];
				else return '';
			}

			function isDataUrl(url) {
				return url.search(/^(data:)/) !== -1;
			}

			function resolveUrl(url, baseUrl) {
				const doc = document.implementation.createHTMLDocument();
				const base = doc.createElement('base');
				doc.head.appendChild(base);
				const a = doc.createElement('a');
				doc.body.appendChild(a);
				base.href = baseUrl;
				a.href = url;
				return a.href;
			}

			function getAndEncode(url) {
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
							const content = encoder.result.split(/,/)[1];
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

					function fail(message) {
						console.error(message);
						resolve('');
					}
				});
			}

			function dataAsUrl(content, type) {
				return 'data:' + type + ';base64,' + content;
			}


		function newInliner() {
			const URL_REGEX = /url\(['"]?([^'"]+?)['"]?\)/g;

			return {
				inlineAll: inlineAll,
				shouldProcess: shouldProcess,
			};

			function shouldProcess(string) {
				return string.search(URL_REGEX) !== -1;
			}

			function readUrls(string) {
				const result = [];
				let match;
				while ((match = URL_REGEX.exec(string)) !== null) {
					result.push(match[1]);
				}
				return result.filter(function (url) {
					return !util.isDataUrl(url);
				});
			}

			function inline(string, url, baseUrl, get) {
				return Promise.resolve(url)
					.then(url=> baseUrl ? util.resolveUrl(url, baseUrl) : url)
					.then(get || util.getAndEncode)
					.then(data=> util.dataAsUrl(data, util.mimeType(url)))
					.then(dataUrl=> string.replace(urlAsRegex(url), '$1' + dataUrl + '$3'));

				function urlAsRegex(url) {
					return new RegExp('(url\\([\'"]?)(' + util.escape(url) + ')([\'"]?\\))', 'g');
				}
			}

			function inlineAll(string, baseUrl, get?) {
				if (nothingToInline()) return Promise.resolve(string);

				return Promise.resolve(string)
					.then(readUrls)
					.then(urls=> {
						let done = Promise.resolve(string);
						for (const url of urls) {
							done = done.then(string=> {
								return inline(string, url, baseUrl, get);
							});
						}
						return done;
					});

				function nothingToInline() {
					return !shouldProcess(string);
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
					webFonts.map(webFont=> webFont.resolve())
				))
				.then(cssStrings=> cssStrings.join('\n'));
			}

			function readAll() {
				return Promise.resolve(util.asArray(document.styleSheets))
					.then(getCssRules)
					.then(selectWebFontRules)
					.then(rules=> rules.map(newWebFont));
						// console.log('map:%o:', rules) ||

				function selectWebFontRules(cssRules) {
					return cssRules
					.filter(rule=> rule.type === CSSRule.FONT_FACE_RULE)
					.filter(rule=> inliner.shouldProcess(rule.style.getPropertyValue('src')));
				}

				function getCssRules(styleSheets) {
					const cssRules = [];
					for (const sheet of styleSheets) {
					//console.log('1:%o', sheet);	//-------
						try {
							if (sheet.href) continue;
						//console.log(sheet.cssRules);
							util.asArray(sheet.cssRules || []).forEach(cssRules.push.bind(cssRules));
						}
						catch (e) {
							console.error('Error while reading CSS rules from ' + sheet.href, e.toString());
						}
					}

					return cssRules;
				}

				function newWebFont(webFontRule) {
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
				this.paddingmkTx4x = parseFloat(cln.style.fontSize);
				this.paddingmkTx4y = 0;
			}
			else {
				this.paddingmkTx4x = 0;
				this.paddingmkTx4y = parseFloat(cln.style.fontSize);
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
			canvas.getContext('2d').drawImage(img, 0, 0);

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
		this.aRect = aRect;

		for (const cr of this.aRect) cr.rect.y -= this.pad_top;
			// テクスチャ元中間objはpaddingを使わないので

		// [l]後に文字続ける場合、後にくっつく文字によって場所が変わる対応
		for (let i=0; i<lenPutedRect; ++i) {
			const rect = this.aRect[i].rect;
			this.cntTxt.children[i].position.set(rect.x, rect.y);
		}
		let delay = 0;
		let fncDelay = (timAutoWc: number)=> {
			if (timAutoWc) delay = timAutoWc;
			fncDelay = (timAutoWc: number)=> {
				delay += (timAutoWc) ? timAutoWc : LayerMng.msecChWait;
			};
		};
		const len = this.aRect.length;
		if (TxtLayer.cfg.oCfg.debug.masume && lenPutedRect == 0) {
			this.grpDbgMasume.beginFill(0x33FF00, 0.2);
			this.grpDbgMasume.lineStyle(2, 0x33FF00, 1);
			this.grpDbgMasume.drawRect(0, 0, this.$width, this.$height);
			this.grpDbgMasume.endFill();
		}
		for (let i=lenPutedRect; i<len; ++i) {
			const v = this.aRect[i];
			const rct = v.rect;
			const v_rect4ch_tx = rct.clone();
			if (TxtLayer.cfg.oCfg.debug.masume) {	// ガイドマス目（デバッグ用）
				//console.log('🍌 masume ch:%s x:%d y:%d w:%d h:%d', v.ch, rct.x, rct.y, rct.width, rct.height);
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

				const st: ISpTw = {
					sp: sp,
					tw: new TWEEN.Tween(sp)
						.to({ alpha: 1, x: rct.x, y: rct.y, width: rct.width, height: rct.height, rotation: 0 }, this.ch_anime_time_仮)
						.easing(this.fi_easing)
						.delay(delay)
						.onComplete(()=> {
							st.tw = null;
							if (rct.width  == 0 || rct.height == 0) return;
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

				const ctn = new Container;	// コンテナひとつかまし、即時spWork()を
				this.cntTxt.addChild(ctn);
				spWork(ctn, false);
				GrpLayer.csv2Sprites(o.pic, ctn, ()=> {});
				break;

			default:	// 文字
				const tx_c = tx.clone();
				v_rect4ch_tx.x += this.paddingmkTx4x -this.xz4htm2rect;
				v_rect4ch_tx.y += this.paddingmkTx4y;
				tx_c.frame = v_rect4ch_tx;
				if (v_rect4ch_tx.x < 0 || v_rect4ch_tx.y < 0) console.log(`x=${v_rect4ch_tx.x} または y=${v_rect4ch_tx.y} が負の値です。文字「${v.ch}」が表示されない場合があります`);
				const sp = new Sprite(tx_c);
				this.cntTxt.addChild(sp);
				spWork(sp);
				if (v.cmd == 'link') {
					const o: any = JSON.parse(v.arg);
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

		const range = elm.ownerDocument.createRange();
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
			const cr :IChRect = {
				ch	: range.toString(),
				rect: new Rectangle(
					r.left +window.pageXOffset,
					r.top  +window.pageYOffset,
					r.width,
					r.height +this.lh_half),
				cmd	: pe.getAttribute('data-cmd'),
				arg	: pe.getAttribute('data-arg'),
				add	: pe.getAttribute('data-add'),
				tcy	: pe.getAttribute('data-tcy'),
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

		//utils.clearTextureCache();	// 改ページと思われるこのタイミングで
		this.click();
		if (this.ch_anime_time_仮 == 0) {
			for (const c of this.cntTxt.removeChildren()) c.removeAllListeners().destroy();
		}
		else for (const c of this.cntTxt.children) {
			c.removeAllListeners();	// マウスオーバーイベントなど。クリックは別
			new TWEEN.Tween(c)
			.to(this.fo, this.ch_anime_time_仮)
			.easing(this.fo_easing)
			//.delay(i * LayerMng.msecChWait)
			.onComplete(o=> this.cntTxt.removeChild(o))
			.start();
		}
		this.aSpTw = [];
	}
//	recText(txt: string): void {this.sprTlf.recText(txt);}

	get enabled() {return this.cntBtn.interactiveChildren;}
	set enabled(v) {this.cntBtn.interactiveChildren = v;}

	addButton(hArg: HArg): boolean {
		hArg.key = `btn=[${this.cntBtn.children.length}] `+ this.name;
		return new Button().init(hArg, this.cntBtn);
	}


	clearLay(hArg: HArg): void {
		super.clearLay(hArg);

		this.clearText();
		for (const c of this.cntBtn.removeChildren()) c.removeAllListeners().destroy();
		// removeAllListeners()はマウスオーバーイベントなど。クリックは別
	}

	copy(fromLayer: Layer): void {
		super.copy(fromLayer);
		this.clearLay({filter: 'true'});

		const fl = fromLayer as TxtLayer;
		this.htmTxt.style.cssText = fl.htmTxt.style.cssText;

		this.$width		= fl.$width;
		this.$height	= fl.$height;
		this.pad_left	= fl.pad_left;
		this.pad_right	= fl.pad_right;
		this.pad_top	= fl.pad_top;
		this.pad_bottom	= fl.pad_bottom;

		// バック
		this.b_color	= fl.b_color;	// TODO:書き直ししないと
		this.b_alpha	= fl.b_alpha;
		this.b_alpha_isfixed	= fl.b_alpha_isfixed;
		this.b_do		= fl.b_do;
		this.b_pic		= fl.b_pic;
		this.fontsize	= fl.fontsize;

		this.ch_anime_time_仮	= fl.ch_anime_time_仮;
//		this.fncFi	= fl.fncFi;			// TODO:未作成
		this.fi_easing	= fl.fi_easing;
//		this.ch_filter	= fl.ch_filter;	// TODO:未作成
		this.fo	= fl.fo;
		this.fo_easing	= fl.fo_easing;

		this.xz4htm2rect = fl.xz4htm2rect;
	}

	dump(): string {
		return super.dump() +` enabled:${this.enabled}
		style:\`${this.htmTxt.style.cssText}\`
		txt:\`${this.htmTxt.textContent}\``;
	};

	// 文字ごとのウェイト
	private	static doAutoWc		= false;
	private	static hAutoWc	: {[ch: string]: number} = {};
	private static autowc	= hArg=> {
		TxtLayer.doAutoWc = CmnLib.argChk_Boolean(hArg, "enabled", TxtLayer.doAutoWc);

		const ch = hArg.text;
		if (hArg.text == ! hArg.time) throw('[autowc] textとtimeは同時指定必須です');
		if (! hArg.text) {
			if (TxtLayer.doAutoWc && ch == '') throw('[autowc] enabled == false かつ text == "" は許されません');
			return false;
		}

		const len = ch.length;
		if (TxtLayer.doAutoWc && len == 0) throw('[autowc] enabled == false かつ text == "" は許されません');

		const a = hArg.time.split(',');
		if (a.length != len) throw('[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい');
		TxtLayer.hAutoWc = {};
		for (let i=0; i<len; ++i) TxtLayer.hAutoWc[ch[i]] = uint(a[i]);

		return false;
	}

};
