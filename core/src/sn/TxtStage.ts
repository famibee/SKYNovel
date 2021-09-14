/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2021 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, IEvtMng, argChk_Boolean, argChk_Num} from './CmnLib';
import {HArg} from './CmnInterface';
import {Config} from './Config';
import {CmnTween} from './CmnTween';
import {GrpLayer} from './GrpLayer';
import {DebugMng} from './DebugMng';
import {IMakeDesignCast} from './LayerMng';
import {TxtLayDesignCast, TxtLayPadDesignCast} from './DesignCast';

import {Container, Texture, Sprite, Graphics, Rectangle, Renderer, utils} from 'pixi.js';
import {Tween} from '@tweenjs/tween.js'

export interface IInfTxLay {
	fontsize	: number;
	$width		: number;	// レイヤサイズであり、背景色（画像）サイズ
	$height		: number;
	pad_left	: number;	// paddingLeft（レイヤサイズの内側のスペーサー）
	pad_right	: number;	// paddingRight
	pad_top		: number;	// paddingTop
	pad_bottom	: number;	// paddingBottom
};

interface IChRect {
	ch		: string;
	rect	: Rectangle;
	elm		: HTMLElement;
	cmd?	: string;
	arg?	: string;
	add?	: string;
	tcy?	: string;
}
interface ISpTw {
	sp	: Container;
	tw	: Tween<Container> | null;
//	tw	: Tween | null;
};

export class TxtStage extends Container {
	private	static	cfg		: Config;
	private	static	cvs		: HTMLCanvasElement;
	static	init(cfg: Config): void {
		TxtStage.cfg = cfg;
		TxtStage.cvs = document.getElementById(CmnLib.SN_ID) as HTMLCanvasElement;

		TxtStage.reg行頭禁則	= /[、。，．）］｝〉」』】〕”〟ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ！？!?‼⁉・ーゝゞヽヾ々]/;
		TxtStage.reg行末禁則	= /[［（｛〈「『【〔“〝]/;
		TxtStage.reg分割禁止	= /[─‥…]/;
	}
	private	static	evtMng	: IEvtMng;
	static setEvtMng(evtMng: IEvtMng) {TxtStage.evtMng = evtMng;}

	static	destroy() {
		TxtStage.hWarning = {
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

		TxtStage.hChInStyle		= Object.create(null);
		TxtStage.hChOutStyle	= Object.create(null);

		TxtStage.cntBreak	= new Container;
	}


	private		htmTxt	= document.createElement('span');	// サンプリング元
	private	readonly cntTxt			= new Container;		// サンプリング先
	private	readonly grpDbgMasume	= new Graphics;

	private	readonly	idc		= new TxtLayDesignCast(this.spLay, this);
	private	readonly	idcCh	= new TxtLayPadDesignCast(this);
	getInfTL(): IInfTxLay {return this.infTL}


	constructor(private infTL: IInfTxLay, private readonly spLay: Sprite, private readonly canFocus: ()=> boolean) {
		super();

		this.htmTxt.classList.add('sn_tx');
		this.htmTxt.style.position = 'absolute';
		TxtStage.cvs.parentElement!.appendChild(this.htmTxt);

		this.addChild(this.cntTxt);

		this.addChild(this.grpDbgMasume);
		this.grpDbgMasume.name = 'grpDbgMasume';

		this.idc.adopt(this.idcCh);
	}

	lay(hArg: HArg) {
		const s = this.htmTxt.style;
		if (hArg.style) {
			const cln = document.createElement('span');
			cln.style.cssText = hArg.style;
			const len = cln.style.length;
			for (let i=0; i<len; ++i) {
				const key: any = cln.style[i];
				if (key in TxtStage.hWarning) {
					DebugMng.myTrace(`${key}は指定できません`, 'W');
					continue;
				}
				s[key] = cln.style[key];
			}
			if ((! cln.style.opacity) && ('alpha' in hArg)) s.opacity = String(this.spLay.alpha);
		}
		else if ('alpha' in hArg) s.opacity = String(this.spLay.alpha);

		if ('width' in hArg) s.width = (hArg.width ?? '0') +'px';
		if ('height' in hArg) s.height = (hArg.height ?? '0') +'px';
		if ('pl' in hArg) s.paddingLeft = (hArg.pl ?? '0') +'px';
		if ('pr' in hArg) s.paddingRight = (hArg.pr ?? '0') +'px';
		if ('pt' in hArg) s.paddingTop = (hArg.pt ?? '0') +'px';
		if ('pb' in hArg) s.paddingBottom = (hArg.pb ?? '0') +'px';
		this.lay_sub();
		this.idc.sethArg(hArg);

		// CSS・インラインレイアウトで右や上にはみ出る分の余裕
		this.left = this.spLay.position.x
			-(CmnLib.isSafari && !CmnLib.isMobile && this.isTategaki
				? this.infTL.pad_left +this.infTL.pad_right
				: 0);
		s.transformOrigin = `${this.spLay.pivot.x}px ${this.spLay.pivot.y}px`;
		this.cvsResize();
		s.display = this.spLay.visible ?'inline' :'none';
		s.textShadow = hArg.filter ?? s.textShadow ?? '';

		// パディングキャスト変更時・クリック待ち表示を追従させる（高速再描写）
		if (':redraw' in hArg && this.lenHtmTxt > 0) {
			const aSpan = [
				this.htmTxt.innerHTML.replace(/(animation-delay: )\d+ms/g, '$10ms'),
				`<span class='sn_ch' data-add='{"ch_in_style":"default"}'>　</span>`,
			];
			this.clearText();	// 消去
			this.goTxt(aSpan);	// 高速 goTxt()
		}
	}
	private lay_sub() {
		const s = this.htmTxt.style;
		const fs = parseFloat(s.fontSize || '0');
		this.infTL.fontsize = fs;

		this.infTL.pad_left = parseFloat(s.paddingLeft || '0');
		this.infTL.pad_right = parseFloat(s.paddingRight || '0');
		this.infTL.pad_top = parseFloat(s.paddingTop || '0');
		this.infTL.pad_bottom = parseFloat(s.paddingBottom || '0');
		this.infTL.$width = parseFloat(s.width || '0');
		this.infTL.$height = parseFloat(s.height || '0');
		this.position.set(this.infTL.pad_left, this.infTL.pad_top);

		this.isTategaki = (s.writingMode === 'vertical-rl');

		this.padTx4x = 0;
		this.padTx4y = 0;

		const lh = s.lineHeight ?? '0';
		this.lh_half = this.isTategaki
			? 0
			: (	(lh.slice(-2) === 'px')
				? parseFloat(lh)
				: (fs *parseFloat(lh) -fs)) /2;
			// globalThis.getComputedStyle(this.htmTxt)がチョイチョイ値を返さないので
	}
	cvsResize() {
		const s = this.htmTxt.style;
		s.left = (this.left *CmnLib.cvsScale) +'px';
		s.top = (this.spLay.position.y *CmnLib.cvsScale) +'px';
		s.transform = `rotate(${this.spLay.angle}deg) scale(${this.spLay.scale.x *CmnLib.cvsScale}, ${this.spLay.scale.y *CmnLib.cvsScale}`;

		this.idc.cvsResize();
		this.idcCh.cvsResize();
	}
	private left = 0;
	private isTategaki = false;
	get tategaki() {return this.isTategaki}
	private padTx4x = 0;
	private padTx4y = 0;

	getWidth() {return this.infTL.$width}
	getHeight() {return this.infTL.$height}

	setSize(width: number, height: number) {
		this.infTL.$width = width;
		this.infTL.$height = height;
		this.htmTxt.style.width = this.infTL.$width +'px';
		this.htmTxt.style.height = this.infTL.$height +'px';
	}
	private static	hWarning = {
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


	private htm2tx(fnc: (tx2: any)=> void, hidden = true) {
		// tsayen/dom-to-image: Generates an image from a DOM node using HTML5 canvas https://github.com/tsayen/dom-to-image

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
				const a: StyleSheet[] = [];
				const len = arrayLike.length;
				for (let i=0; i<len; ++i) a.push(arrayLike[i]);
				return a;
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
				return match?.[1] ?? '';
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
							util.asArray(sheet.cssRules || []).forEach(cssRules.push.bind(cssRules));
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

		Promise.resolve(this.htmTxt)
		.then(node=> {	//console.log(`🍇 toSvg`);
			const cln = node.cloneNode(true) as HTMLSpanElement;
			cln.style.padding = '0px';		// ややこしいのでシンプルに
			cln.style.paddingRight = this.padTx4x +'px';
			cln.style.paddingTop = this.padTx4y +'px';
			cln.style.left = '0px';
			cln.style.top = '0px';
			cln.style.width = (this.infTL.$width -this.infTL.pad_left -this.infTL.pad_right) +'px';
			cln.style.height = (this.infTL.$height -this.infTL.pad_top -this.infTL.pad_bottom) +'px';
			//console.log(cln.style.cssText);
			this.htmTxt.hidden = hidden;
			return cln;
		})
		.then(embedFonts)
		.then(node=> {	//console.log(`🍈 makeSvgDataUri`);
			node.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
			const img = new Image;
			//img.crossOrigin = 'Anonymous';	//--いまのとこ不要
			img.src = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${this.infTL.$width
			}px" height="${this.infTL.$height
			}px"><foreignObject x="0" y="0" width="100%" height="100%">${
				new XMLSerializer().serializeToString(node)
				.replaceAll('#', '%23').replaceAll('\n', '%0A')
			}</foreignObject></svg>` // ? + new Date().getTime();
			return new Promise(resolve=> img.onload = ()=> resolve(img));
		})
		.then(img=> new Promise(resolve=> setTimeout(()=> resolve(img) , 100)))
		// 無くすとSafariでテクスチャ取れない場合があった
		.then((img: any)=> {	//console.log(`🍉 toPng`);
			const canvas = document.createElement('canvas');
			canvas.width = this.infTL.$width;
			canvas.height = this.infTL.$height;
			canvas.getContext('2d')!.drawImage(img, 0, 0);
			canvas.toBlob(blob=> {
				const url = URL.createObjectURL(blob);
				(Texture.from(url) as utils.EventEmitter).once('update', (tx2: any)=> {
					fnc(tx2);
					URL.revokeObjectURL(url);
				});
			});
		})
		.catch(err=> DebugMng.myTrace(`goTxt() = ${err}`));
	}

	private ch_filter	: any[] | null;	// 文字にかけるフィルター
	private aSpTw		: ISpTw[]	= [];


	private aRect   : IChRect[]	= [];
	private	lenHtmTxt = 0;
	private	static	reg行頭禁則: RegExp;
	private	static	reg行末禁則: RegExp;
	private	static	reg分割禁止: RegExp;
	goTxt(aSpan: string[]) {
		TxtStage.cntBreak.visible = false;

		const begin = this.aRect.length;
		if (TxtStage.cfg.oCfg.debug.masume && begin === 0) {	// 初回
			if (CmnLib.debugLog) console.log(`🍌 masume ${
				this.name} v:${this.visible} l:${this.x} t:${this.y
				} a:${this.alpha} pl:${this.infTL.pad_left
				} pr:${this.infTL.pad_right
				} pt:${this.infTL.pad_top} pb:${this.infTL.pad_bottom
				} w:${this.infTL.$width} h:${this.infTL.$height}`);

			this.grpDbgMasume.clear();
			this.grpDbgMasume.beginFill(0x33FF00, 0.2);	// 文字レイヤ
			this.grpDbgMasume.lineStyle(1, 0x33FF00, 1);
			this.grpDbgMasume.drawRect(-this.infTL.pad_left, -this.infTL.pad_top, this.infTL.$width, this.infTL.$height);
				// 親の親の cntInsidePadding が padding ぶん水平移動してるので引く。
			this.grpDbgMasume.endFill();

			this.grpDbgMasume.beginFill(0x0033FF, 0.2);	// cntInsidePadding
			this.grpDbgMasume.lineStyle(2, 0x0033FF, 1);
			this.grpDbgMasume.drawRect(0, 0,
			this.infTL.$width -this.infTL.pad_left -this.infTL.pad_right,
			this.infTL.$height -this.infTL.pad_top -this.infTL.pad_bottom);
			this.grpDbgMasume.endFill();
		}

		if (begin === 0) this.htmTxt.innerHTML = [...aSpan].join('');
		else this.htmTxt.insertAdjacentHTML('beforeend', aSpan.slice(this.lenHtmTxt).join(''));
		this.lenHtmTxt = aSpan.length;

		let len = 0;
		let j = 2;	// 本来 1 だがひと文字目の行頭禁則文字を無視したいので
	//	let j_start = 0;
		do {
			const e = this.aRect = this.getChRects(this.htmTxt);
			len = e.length;
			if (CmnLib.cvsScale !== 1) {
				// Resizeを意識してDOM位置をPIXIに変換
				// transform scale を一時的に変更する手もあるが、ややずれるしDOM影響が大きい
				const ox = CmnLib.ofsPadLeft_Dom2PIXI
					+ parseFloat(this.htmTxt.style.left)
						*(1- CmnLib.cvsScale);
				const oy = CmnLib.ofsPadTop_Dom2PIXI
					+ parseFloat(this.htmTxt.style.top)
						*(1- CmnLib.cvsScale);
				for (let i=0; i<len; ++i) {
					const r = e[i].rect;
					r.x -= ox;
					r.y -= oy;	// 次行と前後関係固定で
					r.x /= CmnLib.cvsScale;
					r.y /= CmnLib.cvsScale;
					r.width  /= CmnLib.cvsScale;
					r.height /= CmnLib.cvsScale;
				}
			}
			if (len < 2) break;

			let sl_xy = -Infinity;
			for (; j<len; ++j) {
				const he = e[j];
				if (he.elm.outerHTML.slice(0, 3) === '<rt') continue;

				const xy = this.tategaki ?he.rect.y :he.rect.x;
				if (sl_xy < xy) {sl_xy = xy; continue;}
				sl_xy = -Infinity;	// 改行発生！

				// 追い出し
				if (TxtStage.reg分割禁止.test(e[j -1].ch)
				&& (e[j -1].ch === he.ch)) {
	if (CmnLib.debugLog) console.log(`🎴追い出し（分割禁止）ch:${he.ch}`);
					--j;
				}
				else {
					if (TxtStage.reg行末禁則.test(e[j -1].ch)) {
	if (CmnLib.debugLog) console.log(`🎴追い出し（行末禁則）前ch:${e[j -1].ch}`);
						--j;
					}
					else if (TxtStage.reg行頭禁則.test(he.ch)) {
	if (CmnLib.debugLog) console.log(`🎴追い出し（行頭禁則 A）前ch:${he.ch}`);
						while (j > 0 && TxtStage.reg行頭禁則.test(e[--j].ch)) {
	if (CmnLib.debugLog) console.log(`🎴　　　　（行頭禁則 A）前ch:${e[j].ch}`);
						}
					}
					else continue;	// 追い出しなし

					while (j > 0 && TxtStage.reg行末禁則.test(e[j -1].ch)) {
	if (CmnLib.debugLog) console.log(`🎴追い出し（行末禁則 B）前ch:${e[j -1].ch}`);
						--j;
					}
				}
				const pal = e[j].elm.parentElement!;
				const br = document.createElement('br');
				if (pal.classList.contains('sn_tx')) pal.insertBefore(br, e[j].elm);
				else pal.parentElement!.insertBefore(br, pal);

				// TODO: 追い出し＋前行を均等割付
/*				//=== 前行を<span>で囲むサンプル
				const line = document.createElement('span');
				he.elm.parentElement!.insertBefore(line, e[j -1].elm);
				for (let z=j -2; z>=j_start; --z) {
					if (! e[z].elm.dataset['add']) continue;
					line.insertBefore(
						(e[z].elm.outerHTML.slice(0, 6) === '<ruby ')
							? e[z].elm.parentElement!
							: e[z].elm,
						line.firstChild
					);
				}
				line.insertBefore(document.createElement('br'), null);

				j_start = j;
*/
				j += 2;
				len = -1;	// doループ先頭に戻る
				break;
			}
		} while (len < 0);


		const fncMasumeLog = CmnLib.debugLog
			? (v: IChRect, rct: Rectangle)=> console.log(`🍌 masume ch:${v.ch} x:${rct.x} y:${rct.y} w:${rct.width} h:${rct.height}`)
			: ()=> {};
		const fncMasume = (TxtStage.cfg.oCfg.debug.masume)
			? (v: IChRect, rct: Rectangle)=> {
				fncMasumeLog(v, rct);
				this.grpDbgMasume.beginFill(0x66CCFF, 0.5);
				this.grpDbgMasume.lineStyle(2, 0xFF3300, 1);
				this.grpDbgMasume.drawRect(rct.x, rct.y, rct.width, rct.height);
				this.grpDbgMasume.endFill();
			}
			: ()=> {};
		const ease = CmnTween.ease(this.fi_easing);

		const bcr = this.htmTxt.getBoundingClientRect();
		const sx = bcr.left +globalThis.pageXOffset +this.infTL.pad_left;
		const sy = bcr.top +globalThis.pageYOffset +this.infTL.pad_top;
		for (let i=begin; i<len; ++i) {
			const v = this.aRect[i];
			const rct = v.rect;
			const arg = JSON.parse(v.arg ?? '{"delay": 0}');
			const add = JSON.parse(v.add ?? '{}');
			const cis = TxtStage.hChInStyle[add.ch_in_style];
			rct.x -= sx;
			rct.y -= sy;
			fncMasume(v, rct);
			if (cis) {
				// スマホでインライン画像アスペクト比が変わる対策
				if (this.isTategaki) {
					rct.x += (rct.width -rct.height) /2;
					rct.width = rct.height;
				}
				else {
					rct.y += (rct.height -rct.width) /2;
					rct.height = rct.width;
				}
				this.rctm = rct;	// !cis ならルビ
			}

			switch (v.cmd) {
				case 'grp':
					const cnt = new Container;	// 親コンテナかまし、即spWork()
					this.cntTxt.addChild(cnt);
						// 次のcsv2Spritesが即終わる場合もあるので先に行なう
					GrpLayer.csv2Sprites(arg.pic, cnt, sp=> {
						this.spWork(cnt, arg, add, rct, ease, cis ?? {});
						if (! cnt.parent) cnt.removeChild(sp);
					});
					break;

				case 'link':
					const sp = new Sprite;
					arg.key = `lnk=[${i}] `+ this.name;
					this.spWork(sp, arg, add, rct, ease, cis ?? {});
					arg.hint_tate ??= this.isTategaki;	// hint用
					const style_normal = v.elm.style.cssText;
					const style_hover = arg.style_hover ?? '';
					const style_clicked = arg.style_clicked ?? '';
					const isLinkHead = this.beforeHTMLElm !== v.elm;
					TxtStage.evtMng.button(arg, sp,
						()=> v.elm.style.cssText = style_normal,
						isLinkHead ?()=> {
							if (! this.canFocus()) return false;
							v.elm.style.cssText = style_hover;
							return true;
						}
						: ()=> false,
						()=> v.elm.style.cssText = style_clicked
					);
					this.beforeHTMLElm = v.elm;
					this.cntTxt.addChild(sp);
					break;
			}
		}
		// クリック待ち用ダミー空白を削除
		this.aRect.slice(0, -1);
		--this.lenHtmTxt;
		const clSpan = this.htmTxt.getElementsByTagName('span');
		const lenClSpan = clSpan.length;
		if (lenClSpan > 0) this.htmTxt.removeChild(clSpan[lenClSpan -1]);
			// this.htmTxt.innerHTML = this.htmTxt.innerHTML.replace(/<span [^>]+>　<\/span>$/, '');// だと this.aRect の DOM(.elm)を破壊してしまうので

		// 文字出現演出・開始〜終了
		const chs = this.htmTxt.querySelectorAll('span.sn_ch');
		chs.forEach(v=> v.className = v.className.replace(/sn_ch_in_([^\s"]+)/g, 'go_ch_in_$1'));

		this.isChInIng = true;
		this.fncEndChIn = ()=> {
			this.isChInIng = false;
			chs.forEach(v=> v.className = v.className.replace(/ go_ch_in_[^\s"]+/g, ''));
			TxtStage.cntBreak.position.set(this.rctm.x, this.rctm.y);
			TxtStage.cntBreak.visible = true;
			this.fncEndChIn = ()=> {};
		};
		const len_chs = chs.length;
		if (len_chs === 0) {this.fncEndChIn(); return;}

		// 「animation-duration: 0ms;」だと animationendイベントが発生しないので、文字表示に時間をかける最後の文字を探す
		let le = null;
		for (let i=len_chs -1; i>=0; --i) {
			const v = chs[i];
			if (v.className === 'sn_ch') break;	// 表示済みのみ
			const st = v.getAttribute('style');
			if (! st) {le = v; break;}
			const m = st.match(this.regDs);
			const g = m?.groups;
			if (! g || Number(g.ms) > 0) {le = v; break;}
		}
		if (! le) {this.fncEndChIn(); return;}

		le.addEventListener('animationend', this.fncEndChIn, {once: true, passive: true});	// クリックキャンセル時は発生しない
	}
	private	beforeHTMLElm	: HTMLElement | null	= null;
	private rctm = new Rectangle;
	private readonly regDs = /animation\-duration: (?<ms>\d+)ms;/;
	private	fncEndChIn	= ()=> {};
	private spWork(sp: Container, arg: any, add: any, rct: Rectangle, ease: (k: number)=> number, cis: any) {
		sp.alpha = 0;
		if (arg.x) rct.x = (arg.x.charAt(0) === '=')
			? rct.x +parseInt(arg.x.slice(1))
			: parseInt(arg.x);
		if (arg.y) rct.y = (arg.y.charAt(0) === '=')
			? rct.y +parseInt(arg.y.slice(1))
			: parseInt(arg.y);
		if (arg.width) rct.width = parseInt(arg.width);
		if (arg.height) rct.height = parseInt(arg.height);
		if (arg.wait) cis.wait = parseInt(arg.wait);
		sp.width = rct.width;
		sp.height = rct.height;
		sp.position.set(
			(cis.x.charAt(0) === '=') ?rct.x +sp.width  *cis.nx :cis.nx,
			(cis.y.charAt(0) === '=') ?rct.y +sp.height *cis.ny :cis.ny
		);
		const st: ISpTw = {
			sp: sp,
			tw: new Tween(sp)
				.to({ alpha: 1, x: rct.x, y: rct.y, width: rct.width, height: rct.height, angle: 0 }, cis.wait ?? 0)
				.easing(ease)
				.delay((add.wait ?? 0) +(arg.delay ?? 0))
				.onComplete(()=> {
					st.tw = null;
					//(略)	if (rct.width === 0 || rct.height === 0) return;
					//if (sp instanceof Sprite) sp.cacheAsBitmap = true;
					//　これを有効にすると[snapshot]で文字が出ない
				})
				.start(),
		};
		this.aSpTw.push(st);
	}

	private	isChInIng	= false;
	skipChIn(): boolean {	// true is stay
		let isLiveTw = this.isChInIng;
		this.fncEndChIn();
		this.aSpTw.forEach(st=> {if (st.tw) {st.tw.stop().end(); isLiveTw = true}});
			// Text Skip。stop() と end() は別！
		this.aSpTw = [];
		return isLiveTw;
	}

	private	static	hChInStyle	= Object.create(null);
	private	static	readonly	REG_NG_CHSTYLE_NAME_CHR	= /[\s\.,]/;
	static	initChStyle() {
		TxtStage.hChInStyle = Object.create(null);
		TxtStage.hChOutStyle = Object.create(null);
	}
	static	getChInStyle(name: string) {return TxtStage.hChInStyle[name];}
	static	ch_in_style(hArg: HArg): any {
		const name = hArg.name;
		if (! name) throw 'nameは必須です';
		TxtStage.REG_NG_CHSTYLE_NAME_CHR.lastIndex = 0;
		if (TxtStage.REG_NG_CHSTYLE_NAME_CHR.test(name)) throw `name【${name}】に使えない文字が含まれます`;
		if (name in TxtStage.hChInStyle) throw `name【${name}】はすでにあります`;

		const x = String(hArg.x ?? '=0');
		const y = String(hArg.y ?? '=0');
		return TxtStage.hChInStyle[name] = {
			wait	: argChk_Num(hArg, 'wait', 500),	// アニメ・FI時間
			alpha	: argChk_Num(hArg, 'alpha', 0),
			x		: x,	// 初期x値
			y		: y,	// [tsy]と同様に絶対・相対指定可能
			// {x:500}			X位置を500に
			// {x:'=500'}		現在のX位置に+500加算した位置
			// {x:'=-500'}		現在のX位置に-500加算した位置
			// {x:'250,500'}	+250から＋500までの間でランダムな値をX位置に
			// {x:'=250,500'}	+250から＋500までの間でランダムな値を現在のX位置に加算
			nx		: parseFloat((x.charAt(0) === '=') ? x.slice(1) : x),
			ny		: parseFloat((y.charAt(0) === '=') ? y.slice(1) : y),
			scale_x	: argChk_Num(hArg, 'scale_x', 1),
			scale_y	: argChk_Num(hArg, 'scale_y', 1),
			rotate	: argChk_Num(hArg, 'rotate', 0),
			join	: argChk_Boolean(hArg, 'join', true),
						// 文字を順番に出すか（true）同時か（false）
			ease	: hArg.ease ?? 'ease-out',
		};
	}

	private	static	hChOutStyle: {[nm: string]: {
		wait	: number;
		alpha	: number;
		x		: string;
		y		: string;
		nx		: number;
		ny		: number;
		scale_x	: number;
		scale_y	: number;
		rotate	: number;
		join	: boolean;
		ease	: string;
	}}	= Object.create(null);
	static	getChOutStyle(name: string) {return TxtStage.hChOutStyle[name];}
	static	ch_out_style(hArg: HArg): any {
		const name = hArg.name;
		if (! name) throw 'nameは必須です';
		TxtStage.REG_NG_CHSTYLE_NAME_CHR.lastIndex = 0;
		if (TxtStage.REG_NG_CHSTYLE_NAME_CHR.test(name)) throw `name【${name}】に使えない文字が含まれます`;
		if (name in TxtStage.hChOutStyle) throw `name【${name}】はすでにあります`;

		const x = String(hArg.x ?? '=0');
		const y = String(hArg.y ?? '=0');
		return TxtStage.hChOutStyle[name] = {
			wait	: argChk_Num(hArg, 'wait', 500),	// アニメ・FI時間
			alpha	: argChk_Num(hArg, 'alpha', 0),
			x		: x,	// 初期x値
			y		: y,	// [tsy]と同様に絶対・相対指定可能
			// {x:500}			X位置を500に
			// {x:'=500'}		現在のX位置に+500加算した位置
			// {x:'=-500'}		現在のX位置に-500加算した位置
			// {x:'250,500'}	+250から＋500までの間でランダムな値をX位置に
			// {x:'=250,500'}	+250から＋500までの間でランダムな値を現在のX位置に加算
			nx		: parseFloat((x.charAt(0) === '=') ? x.slice(1) : x),
			ny		: parseFloat((y.charAt(0) === '=') ? y.slice(1) : y),
			scale_x	: argChk_Num(hArg, 'scale_x', 1),
			scale_y	: argChk_Num(hArg, 'scale_y', 1),
			rotate	: argChk_Num(hArg, 'rotate', 0),
			join	: argChk_Boolean(hArg, 'join', false),
						// 文字を順番に出すか（true）同時か（false）
			ease	: hArg.ease ?? 'ease-out',
		};
	}

	private static	cntBreak	= new Container;
	dispBreak(pic: string) {
		const cnt = TxtStage.cntBreak;
		cnt.visible = false;
		this.addChild(cnt);	// 次のcsv2Spritesが即終わる場合もあるので先に行なう
		GrpLayer.csv2Sprites(pic, cnt, sp=> {
			if (! cnt.parent) cnt.removeChild(sp);
		});
	}
	static	delBreak() {
		const cnt = TxtStage.cntBreak;
		if (cnt.parent) {
			cnt.parent.removeChild(cnt);	// 他の文字Layerも想定
			cnt.removeChildren();
		}
		TxtStage.cntBreak = new Container;
	}

	private lh_half		= 0;	// 「g」などで下が欠ける問題対策
	private getChRects(elm: Node): IChRect[] {	// 注意）再帰関数
		const ret: any = [];
		if (elm.nodeType !== elm.TEXT_NODE) {
			elm.childNodes.forEach(v=> ret.push(this.getChRects(v)));
			return Array.prototype.concat.apply([], ret);	// 配列をフラットにする
		}

		const range = elm.ownerDocument!.createRange();
		range.selectNodeContents(elm);
		let pos = 0;
		const end = range.endOffset;
		// できれば一文字ずつ「after-edge - baseline」を調べたいが、暫定手段を取る
		//const styles = globalThis.getComputedStyle(this.htmTxt);
		//console.log('lh:'+ styles.lineHeight +' fs:'+ styles.fontSize);
		while (pos < end) {
			range.setStart(elm, pos);
			range.setEnd(elm, ++pos);
			const r = range.getBoundingClientRect();
			const pe = range.startContainer.parentElement;
			if (! pe) throw `fn:TxtStage.ts pe null`;
			const ch = range.toString();
			const cr :IChRect = {
				ch	: ch,
				rect: new Rectangle(
					r.left +globalThis.pageXOffset,
					r.top  +globalThis.pageYOffset,
					r.width,
					r.height +('gjqy'.includes(ch) ?this.lh_half :0)),
				elm	: pe,
				cmd	: pe.getAttribute('data-cmd') ?? undefined,
				arg	: pe.getAttribute('data-arg') ?? undefined,
				add	: pe.getAttribute('data-add') ?? undefined,
				tcy	: pe.getAttribute('data-tcy') ?? undefined,
			};
			ret.push(cr);
			//console.log('ch:%s rect:%o', cr.ch, cr.rect);
		}
		range.detach();

		return ret;
	}

	private fi_easing	= 'Quadratic.Out';
	private fo_easing	= 'Quadratic.Out';
	private clearText() {
		this.grpDbgMasume.clear();
		this.aRect = [];
		this.lenHtmTxt = 0;

		//utils.clearTextureCache();	// 改ページと思われるこのタイミングで
		this.skipChIn();
		const n = this.htmTxt.cloneNode(true) as HTMLSpanElement;
		//this.htmTxt.innerHTML = '';		以下の方が早いらしい
		n.textContent = '';
		const old = this.htmTxt;
		old.parentElement!.insertBefore(n, old);

		let sum_wait = 0;
		old.querySelectorAll<HTMLElement>('span.sn_ch').forEach(elm=> {
			const add = JSON.parse(
				elm?.getAttribute('data-add') ??				// 通常文字
				elm?.children[0]?.getAttribute('data-add') ??	// ルビ
				elm?.children[0]?.children[0]
					?.getAttribute('data-add') ?? '{}'		// 縦中横
			);
			if (! add.ch_out_style) return;

			const cos = TxtStage.hChOutStyle[add.ch_out_style];
			if (! cos) return;
			if (cos.wait === 0) {elm.style.display = 'none'; return;}

			sum_wait += cos.wait;
			if (! cos.join) elm.style.animationDelay = '0ms';
			elm.classList.add(`go_ch_out_${add.ch_out_style}`);
		});

		const end = ()=> {
			old.parentElement!.removeChild(old);
			this.cntTxt.removeChildren().forEach(c=> c.destroy());
		};
		if (sum_wait === 0) {this.htmTxt.textContent = ''; end();}
		else old.lastElementChild?.addEventListener('animationend', end, {once: true, passive: true});

		this.htmTxt = n;
	}
	reNew(): TxtStage {
		this.clearText();

		const to = new TxtStage(this.infTL, this.spLay, ()=> this.canFocus());
		to.htmTxt.style.cssText = this.htmTxt.style.cssText;
		to.left = this.left;
		to.name = this.name;
		to.lay_sub();
		to.idc.sethArg(this.idc.gethArg());

		to.ch_filter = this.ch_filter;
		to.fi_easing = this.fi_easing;
		to.fo_easing = this.fo_easing;

		this.destroy();

		return to;
	}


	record() {return {
		infTL		: this.infTL,

		cssText		: this.htmTxt.style.cssText,
		left		: this.left,
		idc_hArg	: this.idc.gethArg(),

		ch_filter	: this.ch_filter,
		fi_easing	: this.fi_easing,
		fo_easing	: this.fo_easing,
	}};
	playback(hLay: any) {
		this.infTL	= hLay.infTL;
		this.position.set(this.infTL.pad_left, this.infTL.pad_top);

		this.htmTxt.style.cssText = hLay.cssText;
		this.left = hLay.left;
		this.lay_sub();
		this.idc.sethArg(hLay.idc_hArg);

		this.ch_filter	= hLay.ch_filter;
		this.fi_easing	= hLay.fi_easing;
		this.fo_easing	= hLay.fo_easing;
	}

	private sss :Sprite | null = null;
	snapshot(rnd: Renderer, re: ()=> void) {
		this.htm2tx(tx=> {
			this.sss = new Sprite(tx);	// Safariだけ文字影が映らない
			if (this.isTategaki) {
				this.sss.x += CmnLib.stageW -(this.left +this.infTL.$width)
				- ((CmnLib.isSafari && !CmnLib.isMobile)
					? 0
					: this.infTL.pad_left +this.infTL.pad_right);
			}
			this.sss.y -= this.padTx4y;
			this.sss.texture.frame = new Rectangle(0, 0, this.infTL.$width -this.left, this.infTL.$height);	// これがないと画面サイズを超える
			this.cntTxt.addChild(this.sss);
			rnd.render(this.sss, undefined, false);
			re();
		}, false);
	}
	snapshot_end() {
		if (this.sss) {this.cntTxt.removeChild(this.sss); this.sss = null;}
	}

	makeDesignCast(gdc: IMakeDesignCast) {
		gdc(this.idc);

		const o = this.idc.gethArg();
		this.idcCh.sethArg({...o, ':id_dc': o[':id_tag'] +'_pad'});
		gdc(this.idcCh);
	}
	showDesignCast() {this.idc.visible = true; this.idcCh.visible = true;}

	dump(): string {
		const aStyle: string[] = [];
		const s = this.htmTxt.style;
		const len = s.length;
		for (let i=0; i<len; ++i) {
			const key: any = s[i];
			aStyle.push(`"${key}":"${s[key].replace(/(["\\])/g, '\\$1')}"`);
		}
		return `"txt":"${this.htmTxt.textContent!.replace(/(["\\])/g, '\\$1')
		}", "style":{${aStyle.join(',')}}`;
			// 4Debug。++カウンターし、dump表示させても良さげ
	}

	override destroy() {
		TxtStage.delBreak();
		this.htmTxt.parentElement!.removeChild(this.htmTxt);
		this.removeChild(this.cntTxt);
		this.removeChild(this.grpDbgMasume);
		super.destroy();
	}
}
