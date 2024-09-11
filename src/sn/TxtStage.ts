/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, IEvtMng, argChk_Boolean, argChk_Num} from './CmnLib';
import {HArg} from './Grammar';
import {Config} from './Config';
import {CmnTween} from './CmnTween';
import {SpritesMng} from './SpritesMng';
import {DebugMng} from './DebugMng';
import {IMakeDesignCast} from './LayerMng';
//import {TxtLayDesignCast, TxtLayPadDesignCast} from './DesignCast';
import {SysBase} from './SysBase';
import {Hyphenation, IChRect} from './Hyphenation';
import {ScriptIterator} from './ScriptIterator';
import {ReadState} from './ReadState';

import {Container, Texture, Sprite, Graphics, Rectangle, Renderer, Application} from 'pixi.js';
import {Tween} from '@tweenjs/tween.js'

interface IInfTxLay {
	fontsize	: number;
	$width		: number;	// レイヤサイズであり、背景色（画像）サイズ
	$height		: number;
	pad_left	: number;	// paddingLeft（レイヤサイズの内側のスペーサー）
	pad_right	: number;	// paddingRight
	pad_top		: number;	// paddingTop
	pad_bottom	: number;	// paddingBottom
};

interface ISpTw {
	sp	: Container;
	tw	: Tween<Container> | undefined;
};


export class TxtStage extends Container {
	static	#cfg	: Config;
	static	#appPixi: Application;
	static	init(cfg: Config, appPixi: Application): void {
		TxtStage.#cfg = cfg;
		TxtStage.#appPixi = appPixi;
	}
	static	#evtMng	: IEvtMng;
	static	#scrItr	: ScriptIterator;
	static	setEvtMng(evtMng: IEvtMng, scrItr: ScriptIterator) {
		TxtStage.#evtMng = evtMng;
		TxtStage.#scrItr = scrItr;
	}

	static	destroy() {
		TxtStage.#hChInStyle	= Object.create(null);
		TxtStage.#hChOutStyle	= Object.create(null);

		TxtStage.delBreak();
	}


				#htmTxt	= document.createElement('span');	// サンプリング元
	readonly	#cntTxt			= new Container;			// サンプリング先
	readonly	#grpDbgMasume	= new Graphics;
	static	readonly	#hWarnStyle = {
		'background-color'		: 0,
		'border-bottom-width'	: 0,
		'border-left-width'		: 0,
		'border-right-width'	: 0,
		'border-top-width'		: 0,
		'margin-bottom'	: 0,
		'margin-left'	: 0,
		'margin-right'	: 0,
		'margin-top'	: 0,
	};


	#hyph	= new Hyphenation;
	noticeCompTxt	= ()=> {};
	constructor(private readonly spLay: Sprite, private readonly canFocus: ()=> boolean, private readonly sys: SysBase) {
		super();

		this.#htmTxt.classList.add('sn_tx');
		this.#htmTxt.style.position = 'absolute';
		TxtStage.#appPixi.view.parentElement!.appendChild(this.#htmTxt);

		this.addChild(this.#cntTxt);

		this.addChild(this.#grpDbgMasume);
		this.#grpDbgMasume.name = 'grpDbgMasume';

//		this.#idc = new TxtLayDesignCast(this.spLay, this);
//		this.#idc.adopt(this.#idcCh);

		this.noticeCompTxt = sys.isApp && TxtStage.#cfg.oCfg.debug.dumpHtm
		? ()=> {
			ReadState.noticeCompTxt();

			const htm = this.#htmTxt.innerHTML;
			if (htm === '') return;
			const {fn, ln} = TxtStage.#scrItr.nowScrFnLn();
			const id = `dumpHtm ${
				this.spLay.name.slice(0, -7)	// 末尾「 page=B」削り
				.replaceAll(':', '=')			// ファイル名で困る文字
			}(fn=${fn} line=${ln})`;
			sys.outputFile(
				sys.path_downloads + id +'.htm',
`<!doctype html><html><head><meta charset=utf-8><title>${id}</title>
<h1>${id}</h1>${
	htm	// outerHTML からのレイヤ再現などしたいとこだがオーバースペック
	.replaceAll(/ class="sn_ch"|animation-delay: \d+ms; ?| data-add="{&quot;ch_in_style&quot;:&quot;default&quot;, &quot;ch_out_style&quot;:&quot;default&quot;}"/g, '')
	.replaceAll(' style=""', '')	// chromeで警告が出るので
	.replaceAll(/(<\/?ruby>)/g, '\n$1\n')
	.replaceAll(/<(br|\/span)>/g, '<$1>\n')
}`,
			);
		}
		: ()=> ReadState.noticeCompTxt();
	}

//	readonly	#idc	:TxtLayDesignCast;
//	readonly	#idcCh	= new TxtLayPadDesignCast(this);
	#infTL :IInfTxLay = {
		fontsize	: 24,
		$width		: 0,	// レイヤサイズであり、背景色（画像）サイズ
		$height		: 0,
		pad_left	: 0,	// paddingLeft（レイヤサイズの内側のスペーサー）
		pad_right	: 0,	// paddingRight
		pad_top		: 0,	// paddingTop
		pad_bottom	: 0,	// paddingBottom
	}

	lay(hArg: HArg) {
		const s = this.#htmTxt.style;
		if ('style' in hArg) {
			if (hArg.style) {
				const cln = document.createElement('span');
				cln.style.cssText = hArg.style;
				const len = cln.style.length;
				for (let i=0; i<len; ++i) {
					const key: any = cln.style[i];
					if (key in TxtStage.#hWarnStyle) {
						DebugMng.myTrace(`${key}は指定できません`, 'W');
						continue;
					}
					s[key] = cln.style[key];
				}
				if (! cln.style.opacity && 'alpha' in hArg) s.opacity = String(this.spLay.alpha);
			}
			else this.#htmTxt.style.cssText = '';
		}
		else if ('alpha' in hArg) s.opacity = String(this.spLay.alpha);

		if ('width' in hArg) s.width = (hArg.width ?? '0') +'px';
		if ('height' in hArg) s.height = (hArg.height ?? '0') +'px';
		if ('pl' in hArg) s.paddingLeft = (hArg.pl ?? '0') +'px';
		if ('pr' in hArg) s.paddingRight = (hArg.pr ?? '0') +'px';
		if ('pt' in hArg) s.paddingTop = (hArg.pt ?? '0') +'px';
		if ('pb' in hArg) s.paddingBottom = (hArg.pb ?? '0') +'px';
		this.#hyph.lay(hArg);
		this.#lay_sub();
//		this.#idc.sethArg(hArg);

		// CSS・インラインレイアウトで右や上にはみ出る分の余裕
		this.#left = this.spLay.position.x;
			//-(CmnLib.isSafari && !CmnLib.isMobile && this.#isTategaki
			//	? this.#infTL.pad_left +this.#infTL.pad_right
			//	: 0);	// 無効化 2022/02/09
		s.transformOrigin = `${this.spLay.pivot.x}px ${this.spLay.pivot.y}px`;
		this.cvsResize();
		s.display = this.spLay.visible ?'inline' :'none';

		// パディングキャスト変更時・クリック待ち表示を追従させる（高速再描写）
		if (':redraw' in hArg && this.#lenHtmTxt > 0) {
			const aSpan = [
				this.#htmTxt.innerHTML.replaceAll(/(animation-delay: )\d+ms/g, '$10ms'),
				`<span class='sn_ch' data-add='{"ch_in_style":"default"}'>&emsp;</span>`,
			];
			this.#clearText();	// 消去
			this.goTxt(aSpan, true);	// 高速 goTxt()
		}
	}
	#lh_half	= 0;	// 「g」などで下が欠ける問題対策
	#lay_sub() {
		const s = this.#htmTxt.style;
		const fs = parseFloat(s.fontSize || '0');
		this.#infTL.fontsize = fs;

		this.#infTL.pad_left = parseFloat(s.paddingLeft || '0');
		this.#infTL.pad_right = parseFloat(s.paddingRight || '0');
		this.#infTL.pad_top = parseFloat(s.paddingTop || '0');
		this.#infTL.pad_bottom = parseFloat(s.paddingBottom || '0');
		this.#infTL.$width = parseFloat(s.width || '0');
		this.#infTL.$height = parseFloat(s.height || '0');
		this.position.set(this.#infTL.pad_left, this.#infTL.pad_top);

		this.#isTategaki = (s.writingMode === 'vertical-rl');

		this.#padTx4x = 0;
		this.#padTx4y = 0;

		const lh = s.lineHeight ?? '0';
		this.#lh_half = this.#isTategaki
			? 0
			: (	(lh.slice(-2) === 'px')
				? parseFloat(lh)
				: (fs *parseFloat(lh) -fs)) /2;
			// globalThis.getComputedStyle(this.htmTxt)がチョイチョイ値を返さないので
	}
	cvsResize() {
		const s = this.#htmTxt.style;
		const cvsScale = this.sys.cvsScale;
		s.left = `${this.sys.ofsLeft4elm +this.#left *cvsScale}px`;
		s.top = `${this.sys.ofsTop4elm +this.spLay.position.y *cvsScale}px`;
		s.transform = `rotate(${this.spLay.angle}deg) scale(${this.spLay.scale.x *cvsScale}, ${this.spLay.scale.y *cvsScale})`;

//		this.#idc.cvsResize();
//		this.#idcCh.cvsResize();
	}
	#left = 0;
	#isTategaki = false;
	get tategaki() {return this.#isTategaki}
	#padTx4x = 0;
	#padTx4y = 0;

	get	infTL(): IInfTxLay {return this.#infTL}
	get	getWidth() {return this.#infTL.$width}
	get	getHeight() {return this.#infTL.$height}

	setSize(width: number, height: number) {
		this.#infTL.$width = width;
		this.#infTL.$height = height;
		this.#htmTxt.style.width = this.#infTL.$width +'px';
		this.#htmTxt.style.height = this.#infTL.$height +'px';
	}


	#htm2tx(fnc: (tx2: any)=> void, hidden = true) {
		// tsayen/dom-to-image: Generates an image from a DOM node using HTML5 canvas https://github.com/tsayen/dom-to-image

/*---*/
		const util = {
			escape: (str: string)=> str.replaceAll(/([.*+?^${}()|\[\]\/\\])/g, '\\$1'),
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
				//	url += ((/\?/).test(url) ? "&" : "?") + (new Date).getTime();
				//}

				return new Promise(function (resolve) {
					const request = new XMLHttpRequest;

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

						const encoder = new FileReader;
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
						for (const url of urls) done = done.then(string=> inline(string, url, baseUrl, get));
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
				.then(webFonts=> Promise.allSettled(
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
			const reader = new FileReader;
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

		Promise.resolve(this.#htmTxt)
		.then(node=> {	//console.log(`🍇 toSvg`);
			const cln = node.cloneNode(true) as HTMLSpanElement;
			cln.style.padding = '0px';		// ややこしいのでシンプルに
			cln.style.paddingRight = this.#padTx4x +'px';
			cln.style.paddingTop = this.#padTx4y +'px';
			cln.style.left = '0px';
			cln.style.top = '0px';
			cln.style.width = (this.#infTL.$width -this.#infTL.pad_left -this.#infTL.pad_right) +'px';
			cln.style.height = (this.#infTL.$height -this.#infTL.pad_top -this.#infTL.pad_bottom) +'px';
			//console.log(cln.style.cssText);
			this.#htmTxt.hidden = hidden;
			return cln;
		})
		.then(embedFonts)
		.then(node=> {	//console.log(`🍈 makeSvgDataUri`);
			node.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
			const img = new Image;
			//img.crossOrigin = 'Anonymous';	//--いまのとこ不要
			img.src = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${this.#infTL.$width
			}px" height="${this.#infTL.$height
			}px"><foreignObject x="0" y="0" width="100%" height="100%">${
				(new XMLSerializer).serializeToString(node)
				.replaceAll('#', '%23').replaceAll('\n', '%0A')
			}</foreignObject></svg>` // ? + (new Date).getTime();
			return new Promise(re=> img.onload = ()=> re(img));
		})
		.then(img=> new Promise(re=> setTimeout(()=> re(img) , 100)))
			// 無くすとSafariでテクスチャ取れない場合があった
			// clearTimeout()不要と判断
		.then((img: any)=> {	//console.log(`🍉 toPng`);
			const canvas = document.createElement('canvas');
			canvas.width = this.#infTL.$width;
			canvas.height = this.#infTL.$height;
			canvas.getContext('2d')!.drawImage(img, 0, 0);
			canvas.toBlob(blob=> {
				if (! blob) return;
				const url = URL.createObjectURL(blob);
				Texture.from(url).once('update', tx2=> {
					fnc(tx2);
					URL.revokeObjectURL(url);
				});
			});
		})
		.catch(err=> DebugMng.myTrace(`goTxt() = ${err}`));
	}

	#ch_filter	: any[] | undefined = undefined;	// 文字にかけるフィルター
	#aSpTw		: ISpTw[]	= [];


	#aRect		: IChRect[]	= [];
	#lenHtmTxt = 0;
	static	readonly	#SPAN_LAST = `<span class='sn_ch sn_ch_last'>&emsp;</span>`;
	goTxt(aSpan: string[], instant: boolean) {
		TxtStage.#cntBreak.visible = false;

		let begin = this.#aRect.length;
		let bkHtm = '';
		if (begin === 0) {	// 初回
			if (TxtStage.#cfg.oCfg.debug.masume) {
				if (CmnLib.debugLog) console.log(`🍌 masume ${
					this.name} v:${this.visible} l:${this.x} t:${this.y
					} a:${this.alpha} pl:${this.#infTL.pad_left
					} pr:${this.#infTL.pad_right
					} pt:${this.#infTL.pad_top} pb:${this.#infTL.pad_bottom
					} w:${this.#infTL.$width} h:${this.#infTL.$height}`);

				this.#grpDbgMasume.clear()
				.beginFill(0x33FF00, 0.2)	// 文字レイヤ
				.lineStyle(1, 0x33FF00, 1)
				.drawRect(-this.#infTL.pad_left, -this.#infTL.pad_top, this.#infTL.$width, this.#infTL.$height)
					// 親の親の cntInsidePadding が padding ぶん水平移動してるので引く。
				.endFill()

				.beginFill(0x0033FF, 0.2)	// cntInsidePadding
				.lineStyle(2, 0x0033FF, 1)
				.drawRect(0, 0,
				this.#infTL.$width -this.#infTL.pad_left -this.#infTL.pad_right,
				this.#infTL.$height -this.#infTL.pad_top -this.#infTL.pad_bottom)
				.endFill();
			}

			this.#htmTxt.innerHTML = [...aSpan].join('').replaceAll(/[\n\t]/g, '') +TxtStage.#SPAN_LAST;	// 末尾改行削除挙動対策

			if (! this.#hyph.break_fixed) {
				const sty = globalThis.getComputedStyle(this.#htmTxt);
				const rs = parseFloat(sty.fontSize);
				if (this.#isTategaki) {
					this.#hyph.break_fixed_left = (this.#infTL.$width -this.#infTL.pad_left -this.#infTL.pad_right -rs *1.5) *this.sys.cvsScale;
					this.#hyph.break_fixed_top = 0;
				}
				else {
					this.#hyph.break_fixed_left = 0;
					this.#hyph.break_fixed_top = rs /2 *this.sys.cvsScale;
				}
			}
		}
		else {
			bkHtm = this.#htmTxt.innerHTML;
			// 末尾改行削除挙動対策
			--begin;
//console.log(`fn:TxtStage.ts begin:${begin} bkHtm=${bkHtm}=`);
			this.#htmTxt.querySelector('.sn_ch_last')?.remove();
				// 前回の末尾を削除

			this.#htmTxt.querySelectorAll(':scope > br').forEach(e=> e.remove());	// 前回の禁則処理を一度削除
				// :scope - CSS: カスケーディングスタイルシート | MDN https://developer.mozilla.org/ja/docs/Web/CSS/:scope
			this.#htmTxt.insertAdjacentHTML(
				'beforeend',
				aSpan.slice(this.#lenHtmTxt).join('').replaceAll(/[\n\t]/g, '')
				+TxtStage.#SPAN_LAST	// 末尾改行削除挙動対策
			);
		}
			// 後の禁則処理判定で誤判定するので、innerHTML 時にムダな改行やタブは削除
			// [r]は後述コメントのHTMLタグになってるので問題なし

		// ルビ付き文字に背景指定（style='background:'）がある場合、「文字」と「ルビ」と「その二つを含んだ領域」の三つが個別に塗られるが、三つめは背景指定を削除する
		this.#htmTxt.querySelectorAll('.sn_ch:has(> ruby)').forEach((v: HTMLSpanElement)=> v.style.background = '');	// :has直前に空白厳禁

		this.#lenHtmTxt = aSpan.length;
//console.log(`fn:TxtStage.ts === ==${this.#htmTxt.innerHTML.slice(360)}==`);

		// this.#getChRects()使用準備
		const cvsScale = this.sys.cvsScale;
		const bcr = this.#htmTxt.getBoundingClientRect();
		const sx = bcr.left +this.#infTL.pad_left;
		const sy = bcr.top +this.#infTL.pad_top;
		let cnvRect :(rng: Range, ch: string)=> Rectangle;
		if (cvsScale === 1) cnvRect = (rng, ch)=> {
			const r = rng.getBoundingClientRect();
			return new Rectangle(
				r.left -sx,
				r.top  -sy,
				r.width,
				r.height +('gjqy'.includes(ch) ?this.#lh_half :0)
			);
		};
		else {
			// Resizeを意識してDOM位置をPIXIに変換
			// transform scale を一時的に変更する手もあるが、ややずれるしDOM影響大
			const ox = this.sys.ofsPadLeft_Dom2PIXI +bcr.left *(1- cvsScale);
			const oy = this.sys.ofsPadTop_Dom2PIXI +bcr.top *(1- cvsScale);
			cnvRect = (rng, ch)=> {
				const r = rng.getBoundingClientRect();
				return new Rectangle(
					(r.left -ox) /cvsScale -sx,
					(r.top  -oy) /cvsScale -sy,
					r.width /cvsScale,
					(r.height +('gjqy'.includes(ch) ?this.#lh_half :0)) /cvsScale,
				);
			};
		}

		const [a, len] = this.#hyph.hyph(this.#htmTxt, cnvRect, this.#isTategaki, begin, bkHtm);
		this.#aRect = a;


		const fncMasumeLog = CmnLib.debugLog
			? ({ch}: IChRect, {x, y, width, height}: Rectangle)=> console.log(`🍌 masume ch:${ch} x:${x} y:${y} w:${width} h:${height}`)
			: ()=> {};
		const fncMasume = TxtStage.#cfg.oCfg.debug.masume
			? (v: IChRect, rct: Rectangle)=> {
				fncMasumeLog(v, rct);
				this.#grpDbgMasume
				.beginFill(0x66CCFF, 0.5)
				.lineStyle(2, 0xFF3300, 1)
				.drawRect(rct.x, rct.y, rct.width, rct.height)
				.endFill();
			}
			: ()=> {};
		const ease = CmnTween.ease(this.#fi_easing);

		for (let i=begin; i<len; ++i) {
			const c = this.#aRect[i];
			const rct = c.rect;
			const arg = JSON.parse(c.elm.dataset.arg ?? '{"delay": 0}');
			const add = JSON.parse(c.elm.dataset.add ?? '{}');
			const cis = TxtStage.#hChInStyle[add.ch_in_style];
			fncMasume(c, rct);

			if (c.elm.dataset.cmd === 'grp') {
				const cnt = new Container;	// 親コンテナかまし、即spWork()
				this.#cntTxt.addChild(cnt);
					// 次のcsv2Spritesが即終わる場合もあるので先に行なう
				new SpritesMng(arg.pic, cnt, sp=> {
					this.#spWork(cnt, arg, add, rct, ease, cis ?? {});
					if (! cnt.parent) cnt.removeChild(sp);
				});
			}
			if (c.elm.dataset.lnk) {
				const eCh = c.elm.parentElement!.closest('[data-arg]')! as HTMLElement;
				const aLnk = JSON.parse(eCh.dataset.arg ?? '{}');
				aLnk.key = `lnk=[${i}] `+ this.name;
				const sp = new Sprite;
				this.#spWork(sp, aLnk, add, rct, ease, cis ?? {});

				const st_normal = aLnk.style ?? '';
				const st_hover = st_normal +(aLnk.style_hover ?? '');
				const st_clicked = st_normal +(aLnk.style_clicked ?? '');
				const st_r_normal = aLnk.r_style ?? '';
				const st_r_hover = st_r_normal +(aLnk.r_style_hover ?? '');
				const st_r_clicked = st_r_normal +(aLnk.r_style_clicked ?? '');

				const nlRt = [...eCh.getElementsByTagName('rt')];
				nlRt.forEach(e=> e.dataset.st_r_bk = e.style.cssText);
				const st_bk = eCh.style.cssText;
				const fncStyle = (st: string, st_r: string)=> {
					eCh.style.cssText = st_bk + st;
					nlRt.forEach(e=> e.style.cssText = e.dataset.st_r_bk + st_r);
				};

				const enabled = argChk_Boolean(aLnk, 'enabled', true);
				if (enabled) TxtStage.#evtMng.button(aLnk, sp,
					()=> fncStyle(st_normal, st_r_normal),
					()=> {
						if (! this.canFocus()) return false;
						fncStyle(st_hover, st_r_hover);
						return true;
					},
					()=> fncStyle(st_clicked, st_r_clicked)
				);
				else fncStyle(
					st_normal +(aLnk.style_disable ?? 'color: gray;'),
					st_r_normal +(aLnk.r_style_disable ?? 'color: gray;')
				);
				this.#cntTxt.addChild(sp);
			}
		}

		// 文字出現演出・開始〜終了
		const chs = [...this.#htmTxt.getElementsByClassName('sn_ch')];
		this.#fncEndChIn = ()=> {
			this.#fncEndChIn = ()=> false;
			chs.forEach(v=> v.className = v.className.replaceAll(/ go_ch_in_[^\s"]+/g, ''));
			TxtStage.#cntBreak.position.set(
				this.#hyph.break_fixed_left,
				this.#hyph.break_fixed_top,
			);
			TxtStage.#cntBreak.visible = true;
//console.log(`fn:TxtStage.ts // #fncEndChIn`);
			/*
				- これらはセットで確認すること。兼ね合いにより、いずれかが破綻する場合がある
					- 末尾文字表示でカーソルが次行先頭に来てしまうことのないよう
					- 改行→クリック待ち、の後で改行が消えないよう
					- 冒頭クリック待ち＋改行での表示確認
			*/

			this.noticeCompTxt();
			return true;
		};

		chs.forEach(v=> v.className = v.className.replaceAll(/sn_ch_in_([^\s"]+)/g, 'go_ch_in_$1'));
		if (begin > 0) ++begin;	// 末尾改行削除挙動対策

		// 文字表示に時間をかける最後の文字を探す。末尾はダミー（#SPAN_LAST）
		let lastElm: HTMLElement | undefined = undefined;
		for (let i=len -2; i>=0; --i) {		// 末尾の手前から
			const {elm} = this.#aRect[i];
			if (elm.tagName !== 'SPAN') continue;	// ルビ以外

//console.log(`fn:TxtStage.ts txt:${elm.textContent}: i:${i} begin:${begin} len:${len} elm:%o`, elm);
			lastElm = (elm.parentElement?.tagName === 'RUBY')
				? elm.parentElement.parentElement ?? elm	// [tcy]も[graph]も
				: elm;
			break;
		}
		if (! lastElm || instant || begin === len) {this.#fncEndChIn(); return}
			// 「animation-duration: 0ms;」だと animationend が発生しないので
			// === は右クリック戻りで起こる

		lastElm.addEventListener('animationend', ()=> this.#fncEndChIn(), {once: true, passive: true});	// クリックキャンセル時は発生しない
			// 差し替えるので「()=> 」形式のままにすること
	}
	#fncEndChIn: ()=> boolean	= ()=> false;
	#spWork(sp: Container, arg: any, add: any, rct: Rectangle, ease: (k: number)=> number, cis: any) {
		sp.alpha = 0;
		if (arg.x) rct.x = (arg.x.at(0) === '=')
			? rct.x +parseInt(arg.x.slice(1))
			: parseInt(arg.x);
		if (arg.y) rct.y = (arg.y.at(0) === '=')
			? rct.y +parseInt(arg.y.slice(1))
			: parseInt(arg.y);
		if (arg.width) rct.width = parseInt(arg.width);
		if (arg.height) rct.height = parseInt(arg.height);
		if (arg.wait) cis.wait = parseInt(arg.wait);
		sp.width = rct.width;
		sp.height = rct.height;
		if (cis.x) sp.position.set(
			(cis.x.at(0) === '=') ?rct.x +sp.width  *cis.nx :cis.nx,
			(cis.y.at(0) === '=') ?rct.y +sp.height *cis.ny :cis.ny
		);
		else sp.position.set(rct.x, rct.y,);
		const st: ISpTw = {
			sp,
			tw: new Tween(sp)
				.to({ alpha: 1, x: rct.x, y: rct.y, width: rct.width, height: rct.height, angle: 0 }, cis.wait ?? 0)
				.easing(ease)
				.delay((add.wait ?? 0) +(arg.delay ?? 0))
				.onComplete(()=> {
					st.tw = undefined;
					//(略)	if (rct.width === 0 || rct.height === 0) return;
					//if (sp instanceof Sprite) sp.cacheAsBitmap = true;
					// これを有効にすると[snapshot]で文字が出ない
				})
				.start(),
		};
		this.#aSpTw.push(st);
	}

	skipChIn(): boolean {	// true: 文字出現中だったので、停止する
		let wasChInIng = this.#fncEndChIn();
		for (const st of this.#aSpTw) {	// Text Skip。stop() と end() は別！
			if (st.tw) {st.tw.stop().end(); wasChInIng = true}
		}
		this.#aSpTw = [];
		return wasChInIng;
	}

	static	#hChInStyle	= Object.create(null);
	static	readonly	#REG_NG_CHSTYLE_NAME_CHR	= /[\s\.,]/;
	static	initChStyle() {
		TxtStage.#hChInStyle = Object.create(null);
		TxtStage.#hChOutStyle = Object.create(null);
	}
	static	getChInStyle(name: string) {return TxtStage.#hChInStyle[name]}
	static	ch_in_style(hArg: HArg): any {
		const {name} = hArg;
		if (! name) throw 'nameは必須です';
		if (TxtStage.#REG_NG_CHSTYLE_NAME_CHR.test(name)) throw `name【${name}】に使えない文字が含まれます`;
		if (name in TxtStage.#hChInStyle) throw `name【${name}】はすでにあります`;

		const x = String(hArg.x ?? '=0');
		const y = String(hArg.y ?? '=0');
		return TxtStage.#hChInStyle[name] = {
			wait	: argChk_Num(hArg, 'wait', 500),	// アニメ・FI時間
			alpha	: argChk_Num(hArg, 'alpha', 0),
			x		: x,	// 初期x値
			y		: y,	// [tsy]と同様に絶対・相対指定可能
			// {x:500}			X位置を500に
			// {x:'=500'}		現在のX位置に+500加算した位置
			// {x:'=-500'}		現在のX位置に-500加算した位置
			// {x:'250,500'}	+250から＋500までの間でランダムな値をX位置に
			// {x:'=250,500'}	+250から＋500までの間でランダムな値を現在のX位置に加算
			nx		: parseFloat((x.at(0) === '=') ? x.slice(1) : x),
			ny		: parseFloat((y.at(0) === '=') ? y.slice(1) : y),
			scale_x	: argChk_Num(hArg, 'scale_x', 1),
			scale_y	: argChk_Num(hArg, 'scale_y', 1),
			rotate	: argChk_Num(hArg, 'rotate', 0),
			join	: argChk_Boolean(hArg, 'join', true),
						// 文字を順番に出すか（true）同時か（false）
			ease	: hArg.ease ?? 'ease-out',
		};
	}

	static	#hChOutStyle: {[nm: string]: {
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
	static	getChOutStyle(name: string) {return TxtStage.#hChOutStyle[name]}
	static	ch_out_style(hArg: HArg): any {
		const {name} = hArg;
		if (! name) throw 'nameは必須です';
		if (TxtStage.#REG_NG_CHSTYLE_NAME_CHR.test(name)) throw `name【${name}】に使えない文字が含まれます`;
		if (name in TxtStage.#hChOutStyle) throw `name【${name}】はすでにあります`;

		const x = String(hArg.x ?? '=0');
		const y = String(hArg.y ?? '=0');
		return TxtStage.#hChOutStyle[name] = {
			wait	: argChk_Num(hArg, 'wait', 500),	// アニメ・FI時間
			alpha	: argChk_Num(hArg, 'alpha', 0),
			x		: x,	// 初期x値
			y		: y,	// [tsy]と同様に絶対・相対指定可能
			// {x:500}			X位置を500に
			// {x:'=500'}		現在のX位置に+500加算した位置
			// {x:'=-500'}		現在のX位置に-500加算した位置
			// {x:'250,500'}	+250から＋500までの間でランダムな値をX位置に
			// {x:'=250,500'}	+250から＋500までの間でランダムな値を現在のX位置に加算
			nx		: parseFloat((x.at(0) === '=') ? x.slice(1) : x),
			ny		: parseFloat((y.at(0) === '=') ? y.slice(1) : y),
			scale_x	: argChk_Num(hArg, 'scale_x', 1),
			scale_y	: argChk_Num(hArg, 'scale_y', 1),
			rotate	: argChk_Num(hArg, 'rotate', 0),
			join	: argChk_Boolean(hArg, 'join', false),
						// 文字を順番に出すか（true）同時か（false）
			ease	: hArg.ease ?? 'ease-out',
		};
	}

	static	readonly	#cntBreak	= new Container;
	static				#spsBreak	= new SpritesMng;
	dispBreak(o: HArg) {
		TxtStage.delBreak();

		const cnt = TxtStage.#cntBreak;
		cnt.visible = false;
		this.addChild(cnt);	// 次のcsv2Spritesが即終わる場合もあるので先に行なう
		TxtStage.#spsBreak.destroy();
		TxtStage.#spsBreak = new SpritesMng(o.pic, cnt, sp=> {
			if (cnt.parent) {
				sp.x = argChk_Num(o, 'x', 0);
				sp.y = argChk_Num(o, 'y', 0);
				sp.width = argChk_Num(o, 'width', this.#infTL.fontsize);
				sp.height = argChk_Num(o, 'height', this.#infTL.fontsize);
			}
			else cnt.removeChild(sp);
		});
	}
	static	delBreak() {
		const cnt = TxtStage.#cntBreak;
		cnt.parent?.removeChild(cnt);	// 複数メッセージウインドウを想定
		TxtStage.#spsBreak.destroy();
	}

	#fi_easing	= 'Quadratic.Out';
	#fo_easing	= 'Quadratic.Out';
	#clearText() {
		this.#grpDbgMasume.clear();
		this.#aRect = [];
		this.#lenHtmTxt = 0;

		//utils.clearTextureCache();	// 改ページと思われるこのタイミングで
		this.skipChIn();
		const n = this.#htmTxt.cloneNode(true) as HTMLSpanElement;
		//this.htmTxt.innerHTML = '';		以下の方が早いらしい
		n.textContent = '';
		const old = this.#htmTxt;
		old.parentElement!.insertBefore(n, old);

		let sum_wait = 0;
		old.querySelectorAll<HTMLElement>('span.sn_ch').forEach(elm=> {
			const add = JSON.parse(
				elm?.dataset.add ??				// 通常文字
				elm?.children[0]?.getAttribute('data-add') ??	// ルビ
				elm?.children[0]?.children[0]
					?.getAttribute('data-add') ?? '{}'		// 縦中横
			);
			if (! add.ch_out_style) return;

			const cos = TxtStage.#hChOutStyle[add.ch_out_style];
			if (! cos) return;
			if (cos.wait === 0) {elm.style.display = 'none'; return}

			sum_wait += cos.wait;
			if (! cos.join) elm.style.animationDelay = '0ms';
			elm.classList.add(`go_ch_out_${add.ch_out_style}`);
		});

		const end = ()=> {
			old.parentElement!.removeChild(old);
			for (const c of this.#cntTxt.removeChildren()) {
				if (c instanceof Container) TxtStage.#evtMng.unButton(c);
				c.destroy();
			}
		};
		if (sum_wait === 0) {this.#htmTxt.textContent = ''; end()}
		else old.lastElementChild?.addEventListener('animationend', end, {once: true, passive: true});

		this.#htmTxt = n;

		//this.#hyph.clear();	// クリアはしない
	}
	reNew(): TxtStage {
		this.#clearText();

		const to = new TxtStage(this.spLay, ()=> this.canFocus(), this.sys);
		to.#infTL = this.#infTL;
		to.#htmTxt.style.cssText = this.#htmTxt.style.cssText;
		to.#left = this.#left;
		to.name = this.name;
		to.#lay_sub();
//		to.#idc.sethArg(this.#idc.gethArg());

		to.#ch_filter = this.#ch_filter;
		to.#fi_easing = this.#fi_easing;
		to.#fo_easing = this.#fo_easing;

		this.#hyph.reNew(to.#hyph);

		this.destroy();

		return to;
	}


	record() {return {
		infTL		: this.#infTL,

		cssText		: this.#htmTxt.style.cssText,
		left		: this.#left,
//		idc_hArg	: this.#idc.gethArg(),

		ch_filter	: this.#ch_filter,
		fi_easing	: this.#fi_easing,
		fo_easing	: this.#fo_easing,

		hyph		: this.#hyph.record(),
	}};
	playback(hLay: any) {
		this.#infTL = hLay.infTL;
		this.position.set(this.#infTL.pad_left, this.#infTL.pad_top);

		this.#htmTxt.style.cssText = hLay.cssText;
		this.#left = hLay.left;
		this.#lay_sub();
//		this.#idc.sethArg(hLay.idc_hArg);

		this.#ch_filter	= hLay.ch_filter;
		this.#fi_easing	= hLay.fi_easing;
		this.#fo_easing	= hLay.fo_easing;

		this.#hyph.playback(hLay.hyph);
	}

	get cssText() {return this.#htmTxt.style.cssText}
	set cssText(ct: string) {this.#htmTxt.style.cssText = ct}

	#sss :Sprite | undefined = undefined;
	snapshot(rnd: Renderer, re: ()=> void) {
		this.#htm2tx(tx=> {
			this.#sss = new Sprite(tx);	// Safariだけ文字影が映らない
			if (this.#isTategaki) {
				this.#sss.x += CmnLib.stageW -(this.#left +this.#infTL.$width)
				//- ((CmnLib.isSafari && !CmnLib.isMobile)	// 無効化 2022/02/09
				//	? 0
				//	: this.#infTL.pad_left +this.#infTL.pad_right);
			}
			this.#sss.y -= this.#padTx4y;
			this.#sss.texture.frame = new Rectangle(
				0,
				0,
				Math.min(this.#sss.width, this.#infTL.$width -this.#left),
				Math.min(this.#sss.height, this.#infTL.$height),
			);	// これがないと画面サイズを超える
			this.#cntTxt.addChild(this.#sss);
			rnd.render(this.#sss, {clear: false});
			re();
		}, false);
	}
	snapshot_end() {
		if (this.#sss) {this.#cntTxt.removeChild(this.#sss); this.#sss = undefined}
	}

	makeDesignCast(_gdc: IMakeDesignCast) {
//	makeDesignCast(gdc: IMakeDesignCast) {
//		gdc(this.#idc);

//		const o = this.#idc.gethArg();
//		this.#idcCh.sethArg({...o, ':id_dc': o[':id_tag'] +'_pad'});
//		gdc(this.#idcCh);
	}
	showDesignCast() {}
//	showDesignCast() {this.#idc.visible = true; this.#idcCh.visible = true}

	dump(): string {
		const aStyle: string[] = [];
		const s = this.#htmTxt.style;
		const len = s.length;
		for (let i=0; i<len; ++i) {
			const key: any = s[i];
			aStyle.push(`"${key}":"${s[key].replaceAll(/(["\\])/g, '\\$1')}"`);
		}
		return `"txt":"${this.#htmTxt.textContent!.replaceAll(/(["\\])/g, '\\$1')
		}", "style":{${aStyle.join(',')}}`;
			// 4Debug。++カウンターし、dump表示させても良さげ
	}

	override destroy() {
		TxtStage.delBreak();
		this.#htmTxt.parentElement!.removeChild(this.#htmTxt);
		this.removeChild(this.#cntTxt);
		this.removeChild(this.#grpDbgMasume);
		super.destroy();
	}
}
