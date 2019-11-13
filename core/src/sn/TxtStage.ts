/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Container, Texture, Sprite, Graphics, DisplayObject, Rectangle} from 'pixi.js';

import {CmnLib, uint, IEvtMng} from './CmnLib';
import {HArg} from './CmnInterface';
import {Config} from './Config';
import {LayerMng} from './LayerMng';
import {CmnTween} from './CmnTween';
import {GrpLayer} from './GrpLayer';
import { DebugMng } from './DebugMng';
import TWEEN = require('@tweenjs/tween.js');

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
	cmd?	: string;
	arg?	: string;
	add?	: string;
	tcy?	: string;
}
interface ISpTw {
	sp	: Container;
	tw	: TWEEN.Tween | null;
};

export class TxtStage extends Container {
	private	static	cfg		: Config;
	private	static	cr		: DOMRect;
	static	init(cfg: Config): void {
		TxtStage.cfg = cfg;
		const cvs = document.getElementById('skynovel') as HTMLCanvasElement;
		TxtStage.cr = cvs.getBoundingClientRect();

		TxtStage.fncChkSkip = (TxtStage.cfg.oCfg.debug.baseTx)
			? ()=> true
			: ()=> TxtStage.evtMng.isSkipKeyDown();
	}
	private	static	evtMng	: IEvtMng;
	static setEvtMng(evtMng: IEvtMng) {TxtStage.evtMng = evtMng;}

	private htmTxt		= document.createElement('span');	// サンプリング元
	private cntTxt		= new Container;			// サンプリング先
	private grpDbgMasume= new Graphics;


	constructor(private infTL: IInfTxLay, cnt: Container) {
		super();

		this.htmTxt.hidden = true;
		document.body.appendChild(this.htmTxt);

		cnt.addChild(this);
		cnt.addChild(this.cntTxt);

		cnt.addChild(this.grpDbgMasume);
		this.grpDbgMasume.name = 'grpDbgMasume';
	}

	lay(hArg: HArg) {
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
				this.htmTxt.style[key] = cln.style[key];
			}
			this.infTL.pad_left = parseFloat(this.htmTxt.style.paddingLeft ?? '0');
			this.infTL.pad_right = parseFloat(this.htmTxt.style.paddingRight ?? '0');
			this.infTL.pad_top = parseFloat(this.htmTxt.style.paddingTop ?? '0');
			this.infTL.pad_bottom = parseFloat(this.htmTxt.style.paddingBottom ?? '0');
			this.infTL.fontsize = parseFloat(this.htmTxt.style.fontSize ?? '0');
			this.infTL.$width = parseFloat(this.htmTxt.style.width ?? '0');
			this.infTL.$height = parseFloat(this.htmTxt.style.height ?? '0');
		}
		this.parent.position.set(this.infTL.pad_left, this.infTL.pad_top);

		const xSlide = TxtStage.cfg.oCfg.debug.slideBaseSpan
			? document.documentElement.clientWidth -CmnLib.stageW
			: 0;
		this.htmTxt.style.position = 'absolute';
		this.htmTxt.style.left = xSlide +'px';
		this.htmTxt.style.top = `0px`;
//		this.htmTxt.style.zIndex = '-2';
		if (! CmnLib.hDip['tx']) this.htmTxt.style.zIndex = '-2';

		this.xz4htm2rect = xSlide
			+ this.infTL.pad_left	// テクスチャ元中間objはpaddingを使わないので
			+ ((this.htmTxt.style.writingMode == 'vertical-rl')
				? this.infTL.pad_left +this.infTL.pad_right
					// 　ｘ文字選択にとってpaddingがないので
				: 0);

		this.htmTxt.style.textShadow = (hArg.filter)
			? `1px 1px 2px gray, 0 0 1em #000, 0 0 0.2em #000`
			: '';

		this.lh_half = (this.htmTxt.style.writingMode == 'vertical-rl')
			? 0
			: (	((this.htmTxt.style.lineHeight ?? '0').slice(-2) == 'px')
				? parseFloat(this.htmTxt.style.lineHeight ?? '0')
				: parseFloat(this.htmTxt.style.fontSize ?? '0')
					* parseFloat(this.htmTxt.style.lineHeight ?? '0')
					// window.getComputedStyle(this.htmTxt)がチョイチョイ値を返さないので
				-parseFloat(this.htmTxt.style.fontSize ?? '0')	) /2;
	}
	setSize(width: number, height: number) {
		this.infTL.$width = width;
		this.infTL.$height = height;
		this.htmTxt.style.width = this.infTL.$width +'px';
		this.htmTxt.style.height = this.infTL.$height +'px';
	}
	private static	readonly	hWarning = {
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


	goTxt(aSpan: string[], layname: string) {
		if (aSpan.length == 0) return;
		this.aSpan1to2 = [...aSpan];
		this.name = layname;	// dump表示などに使用

		//console.log(`🍅 goTxt htmTxt:${this.htmTxt.textContent}`);
		if (++this.cntGoTxtSerializer == 1) this.goTxt2();	// VAL++ == 0
	}
	private aSpan1to2: string[]	= [];	// 非同期の境界を越えるため

	private goTxt2  = ()=> this.goTxt2_htm2tx();
	private cntGoTxtSerializer = 0;
	private aSpan	: string[]	= [];
	private goTxt2_htm2tx() {
		//console.log(`🍆 goTxt2_htm2tx[${this.cntGoTxtSerializer}]`);
		//this.htmTxt.innerHTML = this.aSpan.join('');
		// これだとSafariでgetChRects()内 getBoundingClientRect()で異常な値になる。
		// <br/>ではなく<p>〜</p>にする（ただし空では改行せず、全角空白一文字必要らしい）
		this.aSpan = this.aSpan1to2;
		let sJoinSpan = this.aSpan.join('');

		// 「<br/>」分割を「<p ...></p>」囲みに変換
		if (sJoinSpan.slice(-5) == '<br/>') sJoinSpan = sJoinSpan.slice(0, -5) +`<p style='margin: 0px;'>　</p>`;	// 次行で終端に「　」を追加させない前処理
		const tmp = sJoinSpan.split('<br/>')
		.map(v=>`<p style='margin: 0px;'>${(v == '') ?'　' :v}</p>`)
		.join('');
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

		let padTx4x = 0;
		let padTx4y = 0;
		Promise.resolve(this.htmTxt)
		.then(node=> {	//console.log(`🍇 toSvg`);
			const cln = node.cloneNode(true) as HTMLSpanElement;
			cln.style.padding = '0px';		// ややこしいのでシンプルに
			// CSS・インラインレイアウトで右や上にはみ出る分の余裕
			if (cln.style.writingMode == 'vertical-rl') {
				padTx4x = parseFloat(cln.style.fontSize ?? '0');
			}
			else {
				padTx4y = parseFloat(cln.style.fontSize ?? '0');
			}
			cln.style.paddingRight = padTx4x +'px';
			cln.style.paddingTop = padTx4y +'px';
			cln.style.left = '0px';
			cln.style.top = '0px';
			cln.style.width = (this.infTL.$width -this.infTL.pad_left -this.infTL.pad_right) +'px';
			cln.style.height = (this.infTL.$height -this.infTL.pad_top -this.infTL.pad_bottom) +'px';
			//console.log(cln.style.cssText);
			this.htmTxt.hidden = true;
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
				.replace(/#/g, '%23').replace(/\n/g, '%0A')
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
				Texture.from(url).once('update', (tx2: any)=> {
					this.goTxt3(tx2, padTx4x, padTx4y);
					URL.revokeObjectURL(url);

					if (--this.cntGoTxtSerializer <= 0) {
						this.cntGoTxtSerializer = 0;
						return;
					}
					this.skipFI();
					this.goTxt2();
				});
			});
		})
		.catch(err=> DebugMng.myTrace(`goTxt() = ${err}`));
	}

	private goTxt3  = (tx: Texture, padTx4x: number, padTx4y: number)=> this.goTxt3_tx2sp(tx, padTx4x, padTx4y);
	private static	readonly	REG_SURROGATE	= /[\uDC00-\uDFFF]/;
	private aRect   : IChRect[]	= [];
	private ch_filter	: any[] | null;	// 文字にかけるフィルター
	private xz4htm2rect = 0;
	private aSpTw	: ISpTw[]	= [];
	private	static	fncChkSkip = ()=> false;
	private goTxt3_tx2sp(tx: Texture, padTx4x: number, padTx4y: number) {
		if (TxtStage.fncChkSkip()) {	// 瞬時表示
			const sp = new Sprite(tx);
			sp.x -= padTx4x;
			sp.y -= padTx4y;
			this.cntTxt.addChild(sp);
		//	this.putBreakMark();	// 表示を省略
			return;
		}


		// 以降、個別文字テクスチャを作成・表示
		const lenPutedRect = this.aRect.length;

		this.htmTxt.hidden = false;
		const aRect = this.getChRects(this.htmTxt);
		this.htmTxt.hidden = true;
		// サロゲートペア対策（分割されるので一つに結合）
		for (let i=aRect.length -1; i>0; --i) {	// i==0はなし
			const r2 = aRect[i];
			TxtStage.REG_SURROGATE.lastIndex = 0;
			if (! TxtStage.REG_SURROGATE.test(r2.ch)) continue;

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
				t1.rect.height += t2.rect.height;	// ChromeとSafari動作違い考慮
				t2.rect = t1.rect;			// rectは最後(t1)が常に正しい。が、
											// heightだけは合計する必要がある
				aRect.splice(j, 2, t2);	// 毎回置換
			}
		}
		// テクスチャ元中間objはpaddingを使わないので
		for (const cr of aRect) cr.rect.y -= this.infTL.pad_top;
		// [l]後に文字続ける場合、後にくっつく文字によって場所が変わる対応
		for (let i=0; i<lenPutedRect; ++i) {
			const rect = aRect[i].rect.clone();
			rect.x -= this.xz4htm2rect;
			this.cntTxt.children[i].position.set(rect.x, rect.y);
		}

		// 表示済み文字変更を検知
		let begin = 0;
		if (this.aRect.length == 0) {	// 初回
			if (TxtStage.cfg.oCfg.debug.masume) {
				if (TxtStage.cfg.oCfg.debug.devtool) console.log(`🍌 masume ${
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
		}
		else {
			for (begin=lenPutedRect -1; begin>=0; --begin) {
				if (aRect[begin].ch == this.aRect[begin].ch) continue;

				// 表示済み文字変更発見、まずは旧文字を削除
				//console.log(`!!! begin:${begin} '${aRect[begin].ch}' != '${this.aRect[begin].ch}'`);
				this.skipFI();	// tween停止
				for (const v of this.cntTxt.removeChildren(begin)) {
					v.removeAllListeners().destroy();
				}
				break;
			}
			if (begin < 0) begin = lenPutedRect;	// 変化無し
		}
		this.aRect = aRect;

		// TODO: 仕様策定中。後々文字waitと同じような処理だろう
		const ease = CmnTween.ease(this.fi_easing);

		//console.log(`cnt(%d, %d) cntInsidePadding(%d, %d) cntTxt(%d, %d) grpDbgMasume(%d, %d)`, this.cnt.x, this.cnt.y, this.cntInsidePadding.x, this.cntInsidePadding.y, this.cntTxt.x, this.cntTxt.y, this.grpDbgMasume.x, this.grpDbgMasume.y);
		let delay = 0;
		const len = this.aRect.length;
		for (let i=begin; i<len; ++i) {
			const v = this.aRect[i];
			const rct = v.rect.clone();
			rct.x -= this.xz4htm2rect;
			if (TxtStage.cfg.oCfg.debug.masume) {	// ガイドマス目（デバッグ用）
				if (TxtStage.cfg.oCfg.debug.devtool) console.log(`🍌 masume ch:${v.ch} x:${rct.x} y:${rct.y} w:${rct.width} h:${rct.height}`);
				this.grpDbgMasume.beginFill(0x66CCFF, 0.5);
				this.grpDbgMasume.lineStyle(2, 0xFF3300, 1);
				this.grpDbgMasume.drawRect(rct.x, rct.y, rct.width, rct.height);
				this.grpDbgMasume.endFill();
			}

			delay += (v.add)
				? uint(JSON.parse(v.add.replace(/'/g, '"')).wait)
				: LayerMng.msecChWait;
			const delay_put = (i < lenPutedRect)	// 文字変更時は瞬時差し替え
				|| this.ch_anime_time_仮 == 0 || delay == 0;

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

				//console.log(`spWork i:${i} ch:${v.ch} x:${rct.x} y:${rct.y}`);
				if (delay_put) {
					sp.alpha = 1;
					sp.x = rct.x;
					sp.y = rct.y;
					sp.width = rct.width;
					sp.height = rct.height;
					sp.rotation = 0;
					return;
				}

				const st: ISpTw = {
					sp: sp,
					tw: new TWEEN.Tween(sp)
						.to({ alpha: 1, x: rct.x, y: rct.y, width: rct.width, height: rct.height, rotation: 0 }, this.ch_anime_time_仮)
						.easing(ease)
						.delay(delay)
						.onComplete(()=> {
							st.tw = null;
							//(略)	if (rct.width == 0 || rct.height == 0) return;
							//if (sp instanceof Sprite) sp.cacheAsBitmap = true;
							//　これを有効にすると[snapshot]で文字が出ない
						})
						.start(),
				};
				this.aSpTw.push(st);
			};

			switch (v.cmd) {
			case 'grp':	//	画像など 《grp｜{"id":"break","pic":"breakline"}》
				const cnt = new Container;	// 親コンテナかまし、即時spWork()
				this.cntTxt.addChild(cnt);
				spWork(cnt, false);
				GrpLayer.csv2Sprites(o.pic, cnt, ()=> {
					// ロード完了時にクリアされていた場合はコンテナを空に
					if (! cnt.parent) cnt.removeChildren();
				});
				break;

			default:	// 文字
				const tx_c = tx.clone();
				tx_c.frame = new Rectangle(rct.x +padTx4x, rct.y +padTx4y, rct.width, rct.height);
				if (tx_c.frame.x < 0 || tx_c.frame.y < 0) console.log(`x=${tx_c.frame.x} または y=${tx_c.frame.y} が負の値です。文字「${v.ch}」が表示されない場合があります`);

				const sp = new Sprite(tx_c);
				this.cntTxt.addChild(sp);
				spWork(sp);
				if (v.cmd == 'link') {
					if (! v.arg) throw `fn:TxtStage.ts v.arg null`;
					const o: any = JSON.parse(v.arg);
					o.key = this.name +' link:'+ i;	// 一文字ずつ別ボタン
					TxtStage.evtMng.button(o, sp);
				}
			}
		}
	//	this.putBreakMark(delay + this.ch_anime_time_仮);	// 微妙に遅い気がする
		this.putBreakMark(delay);
	}

	goTxt_next(aSpan: string[], layname: string, delay: number) {
		this.name = layname;	// dump表示などに使用

		this.aSpan = [...aSpan];
		let s = this.aSpan.join('');
		if (s.slice(-5) == '<br/>') s = s.slice(0, -5) +`<p style='margin: 0px;'>　</p>`;	// 次行で終端に「　」を追加させない前処理
		this.htmTxt.innerHTML = s.split('<br/>')
		.map(v=>`<p style='margin: 0px;'>${(v == '') ?'　' :v}</p>`)
		.join('');
			// <span>内の絵文字で元ネタDomが壊れる（？マーク）ので
			// insertAdjacentHTML()は使わない
		this.htmTxt.hidden = false;

		let padTx4x = 0;
		let padTx4y = 0;
		// CSS・インラインレイアウトで右や上にはみ出る分の余裕
		if (this.htmTxt.style.writingMode == 'vertical-rl') {
			padTx4x = parseFloat(this.htmTxt.style.fontSize ?? '0');
		}
		else {
			padTx4y = parseFloat(this.htmTxt.style.fontSize ?? '0');
		}

		const begin = this.aRect.length;
		if (TxtStage.cfg.oCfg.debug.masume && begin == 0) {	// 初回
			if (TxtStage.cfg.oCfg.debug.devtool) console.log(`🍌 masume ${
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

		const aRect = this.getChRects(this.htmTxt);
		// テクスチャ元中間objはpaddingを使わないので
		for (const cr of aRect) cr.rect.y -= this.infTL.pad_top;
		this.aRect = aRect;
		this.putBreakMark(delay);

		const len = this.aRect.length;
		for (let i=begin; i<len; ++i) {
			const v = this.aRect[i];
			const rct = v.rect.clone();
			rct.x -= this.xz4htm2rect;

			const arg = JSON.parse(v.arg ?? '{"delay": 0}');
//if (v.cmd == 'grp') console.log(`fn:TxtStage.ts line:791 i:${i} ch:${v.ch} rct:%o cmd:${v.cmd} arg:${v.arg}`, rct);
			if (TxtStage.cfg.oCfg.debug.masume) {	// ガイドマス目（デバッグ用）
				if (TxtStage.cfg.oCfg.debug.devtool) console.log(`🍌 masume ch:${v.ch} x:${rct.x} y:${rct.y} w:${rct.width} h:${rct.height}`);
				this.grpDbgMasume.beginFill(0x66CCFF, 0.5);
				this.grpDbgMasume.lineStyle(2, 0xFF3300, 1);
				this.grpDbgMasume.drawRect(rct.x, rct.y, rct.width, rct.height);
				this.grpDbgMasume.endFill();
			}

			// TODO: 仕様策定中。後々文字waitと同じような処理だろう
			const ease = CmnTween.ease(this.fi_easing);

			const o = v.arg ?JSON.parse(v.arg) :{};
			const spWork = (sp: Container, arg: any, replace_pos_by_sp = true)=> {
				// 文字表示効果・初期状態変更
				sp.alpha = 0;
				sp.position.set(rct.x, rct.y);
				if (o.width) sp.width = o.width;
				if (o.height) sp.height = o.height;
				if (replace_pos_by_sp) {
					rct.width = sp.width;	// スプライトのサイズを正とする
					rct.height = sp.height;
				}

				const st: ISpTw = {
					sp: sp,
					tw: new TWEEN.Tween(sp)
						.to({ alpha: 1, x: rct.x, y: rct.y, width: rct.width, height: rct.height, rotation: 0 }, this.ch_anime_time_仮)
						.easing(ease)
						.delay(arg.delay ?? 0)
						.onComplete(()=> {
							st.tw = null;
							//(略)	if (rct.width == 0 || rct.height == 0) return;
							//if (sp instanceof Sprite) sp.cacheAsBitmap = true;
							//　これを有効にすると[snapshot]で文字が出ない
						})
						.start(),
				};
				this.aSpTw.push(st);
			};
			switch (v.cmd) {
				case 'grp':
					const cnt = new Container;	// 親コンテナかまし、即時spWork()
					this.cntTxt.addChild(cnt);
					spWork(cnt, arg, false);
					GrpLayer.csv2Sprites(o.pic, cnt, ()=> {
						// ロード完了時にクリアされていた場合はコンテナを空に
						if (! cnt.parent) cnt.removeChildren();
					});

					break;

				default:
					break;
			}
		}

//console.log(`fn:TxtStage.ts line:850 l:${TxtStage.cr.left} t:${TxtStage.cr.top} xx:${this.infTL.pad_left} yy:${this.infTL.pad_top}`);
		this.htmTxt.style.left = TxtStage.cr.left -padTx4x +'px';
		this.htmTxt.style.top = TxtStage.cr.top -padTx4y +6 +'px';

		// TODO: 瞬時表示
//		if (TxtStage.fncChkSkip()) {this.putBreakMark(0); return;}
	}

	private static	cntBreak	= new Container;
	dispBreak(pic: string) {
		const cnt = TxtStage.cntBreak;
		cnt.visible = false;
		this.addChild(cnt);

		GrpLayer.csv2Sprites(pic, cnt, sp=> {
			if (cnt.parent == null) cnt.removeChild(sp);
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
	private putBreakMark(delay = 0) {
		const cnt = TxtStage.cntBreak;	// Tween開始時の Obj を保存
		if (cnt.parent == null) return;

		const rct = this.aRect.slice(-1)[0].rect;
		cnt.position.set(rct.x -this.xz4htm2rect, rct.y);
		if (this.htmTxt.style.writingMode == 'vertical-rl') {
			cnt.y += this.infTL.fontsize;
		}
		else {
			cnt.x += this.infTL.fontsize;
		}
		if (delay == 0) {cnt.visible = true; return;}

		cnt.visible = false;	// trueの場合はdelay後まで消したいので
		const st: ISpTw = {
			sp: cnt,
			tw: new TWEEN.Tween(cnt)
				.to({}, 0)
				.delay(delay)
				.onComplete(()=> {st.tw = null; st.sp.visible = true;})
				.start(),
		};
		this.aSpTw.push(st);
	}

	private lh_half		= 0;	// 「g」などで下が欠ける問題対策
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
			if (! pe) throw `fn:TxtStage.ts pe null`;
			const ch = range.toString();
			const cr :IChRect = {
				ch	: ch,
				rect: new Rectangle(
					r.left +window.pageXOffset,
					r.top  +window.pageYOffset,
					r.width,
					r.height +('gjqy'.includes(ch) ?this.lh_half :0)),
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

	skipFI(): boolean {	// true is stay
		let isLiveTw = false;
		this.aSpTw.forEach(st=> {if (st.tw) {st.tw.stop().end(); isLiveTw = true}});
			// Text Skip。stop() と end() は別！
		this.aSpTw = [];
		return isLiveTw;
	}
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

	private	ch_anime_time_仮	= 500;	// TODO: 未作成
	private	fncFi		= (sp: DisplayObject)=> {sp.x +=this.infTL.fontsize /3};
	private fi_easing	= 'Quadratic.Out';
	private fo			= {alpha: 0, x: `+${ this.infTL.fontsize /3 }`};
	private fo_easing	= 'Quadratic.Out';
	private clearText() {
		this.goTxt2 = ()=> {};
		this.goTxt3  = (_tx: Texture)=> {};

		this.grpDbgMasume.clear();
		this.aRect = [];
		//this.htmTxt.innerHTML = '';		以下の方が早いらしい
		this.htmTxt.textContent = '';

		//utils.clearTextureCache();	// 改ページと思われるこのタイミングで
		this.skipFI();
		if (this.ch_anime_time_仮 == 0) {
			for (const c of this.cntTxt.removeChildren()) c.removeAllListeners().destroy();
		}
		else {
			const ease = CmnTween.ease(this.fo_easing);
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
	}
	passBaton(): TxtStage {
		this.clearText();

		const to = new TxtStage(this.infTL, this.parent);
		to.htmTxt.style.cssText = this.htmTxt.style.cssText;

		to.ch_filter = this.ch_filter;
		to.lh_half = this.lh_half;
		to.fi_easing = this.fi_easing;
		to.fo = this.fo;
		to.fo_easing = this.fo_easing;
		to.ch_anime_time_仮 = this.ch_anime_time_仮;
		to.xz4htm2rect = this.xz4htm2rect;
		return to;
	}


	record() {return {
		infTL		: this.infTL,

		cssText		: this.htmTxt.style.cssText,

		ch_filter	: this.ch_filter,
		lh_half		: this.lh_half,
		//fncFi		: this.fncFi,		// TODO: 未作成
		fi_easing	: this.fi_easing,
		fo			: this.fo,
		fo_easing	: this.fo_easing,
		ch_anime_time_仮	: this.ch_anime_time_仮,
		xz4htm2rect	: this.xz4htm2rect,
	}};
	playback(hLay: any) {
		this.infTL		= hLay.infTL;
		this.parent.position.set(this.infTL.pad_left, this.infTL.pad_top);

		this.htmTxt.style.cssText = hLay.cssText;

		this.ch_filter	= hLay.ch_filter;
		this.lh_half	= hLay.lh_half;
		this.fncFi		= (sp: DisplayObject)=> {sp.x += this.infTL.fontsize/3};
		this.fi_easing	= hLay.fi_easing;
		this.fo			= hLay.fo;
		this.fo_easing	= hLay.fo_easing;
		this.ch_anime_time_仮	= hLay.ch_anime_time_仮;
		this.xz4htm2rect	= hLay.xz4htm2rect;
	}

	dump(): string {
		const aStyle: string[] = [];
		const s = this.htmTxt.style;
		const lenStyle = s.length;
		for (let i=0; i<lenStyle; ++i) {
			const key: any = s[i];
			aStyle.push(`"${key}":"${s[key].replace(/(")/g, '\\$1')}"`);
		}
		return `"txt":"${this.htmTxt.textContent!.replace(/(")/g, '\\$1')
		}", "style":{${aStyle.join(',')}}`;
			// 4Debug。++カウンターし、dump表示させても良さげ
	}

	destroy() {
		document.body.removeChild(this.htmTxt);
		this.parent.removeChild(this);
		this.parent.removeChild(this.cntTxt);
		this.parent.removeChild(this.grpDbgMasume);
		super.destroy();
	}
}
