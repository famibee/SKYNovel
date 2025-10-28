/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2025-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {T_InfTxLay} from './TxtStage';
import {DebugMng} from './DebugMng';

import {Texture} from 'pixi.js';


export function htm2tx(fnc: (tx2: any)=> void, htmTxt: HTMLSpanElement, infTL :T_InfTxLay, padTx4x: number, padTx4y: number, hidden = true) {
		// tsayen/dom-to-image: Generates an image from a DOM node using HTML5 canvas https://github.com/tsayen/dom-to-image

/*---*/
		const util = {
			escape: (str: string)=> str.replaceAll(/([.*+?^${}()|[\]/\\])/g, '\\$1'),
			mimeType: (url: any)=> {
				const extension = parseExtension(url).toLowerCase();
				return mimes()[extension] || '';
			},
			dataAsUrl,
			isDataUrl,
			resolveUrl,
			getAndEncode,
			asArray: (arrayLike: StyleSheetList)=> {
				const a: StyleSheet[] = [];
				const len = arrayLike.length;
				for (let i=0; i<len; ++i) a.push(arrayLike[i]!);
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
				const match = /\.([^./]*?)$/g.exec(url);
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
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				base.href = baseUrl;
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				a.href = url;
				return a.href;
			}

			function getAndEncode(url: any) {
				const TIMEOUT = 30000;
				//if(domtoimage.impl.options.cacheBust) {
					// Cache bypass so we dont have CORS issues with cached images
					// Source: https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
				//	url += ((/\?/).test(url) ? "&" : "?") + (new Date).getTime();
				//}

				return new Promise(function(resolve) {
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
						encoder.onloadend = function() {
							// eslint-disable-next-line @typescript-eslint/no-base-to-string
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
				inlineAll,
				shouldProcess,
			};

			function shouldProcess(str: any) {
				return str.search(URL_REGEX) !== -1;
			}

			function readUrls(str: any) {
				const result: string[] = [];
				let match: RegExpExecArray | null;
				// eslint-disable-next-line no-cond-assign
				while (match = URL_REGEX.exec(str)) {
					result.push(match[1]!);
				}
				return result.filter(function(url) {
					return ! util.isDataUrl(url);
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
					return ! shouldProcess(str);
				}
			}
		}

		function newFontFaces() {
			return {
				resolveAll,
				impl: {readAll}
			};

			function resolveAll() {
				return readAll()
				.then(webFonts=> Promise.allSettled(
					webFonts.map((webFont: any)=> webFont.resolve())
				))
				// eslint-disable-next-line @typescript-eslint/no-base-to-string
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
							console.error('Error while reading CSS rules from ' + sheet.href, String(e));
						}
					}

					return cssRules;
				}

				function newWebFont(webFontRule: any) {
					//console.log('newWebFont:%o:', webFontRule);	//-------
					return {
						resolve: function resolve() {
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/prefer-optional-chain
							const baseUrl = (webFontRule.parentStyleSheet || {}).href;
							return inliner.inlineAll(webFontRule.cssText, baseUrl);
						},
						src() {
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

		Promise.resolve(htmTxt)
		.then(node=> {	//console.log(`🍇 toSvg`);
			const cln = <HTMLSpanElement>node.cloneNode(true);
			cln.style.padding = '0px';		// ややこしいのでシンプルに
			cln.style.paddingRight = padTx4x +'px';
			cln.style.paddingTop = padTx4y +'px';
			cln.style.left = '0px';
			cln.style.top = '0px';
			cln.style.width = infTL.$width -infTL.pad_left -infTL.pad_right +'px';
			cln.style.height = infTL.$height -infTL.pad_top -infTL.pad_bottom +'px';
			//console.log(cln.style.cssText);
			htmTxt.hidden = hidden;
			return cln;
		})
		.then(embedFonts)
		.then(node=> {	//console.log(`🍈 makeSvgDataUri`);
			node.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
			const img = new Image;
			//img.crossOrigin = 'Anonymous';	//--いまのとこ不要
			img.src = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${infTL.$width
			}px" height="${infTL.$height
			}px"><foreignObject x="0" y="0" width="100%" height="100%">${
				(new XMLSerializer).serializeToString(node)
				.replaceAll('#', '%23').replaceAll('\n', '%0A')
			}</foreignObject></svg>` // ? + (new Date).getTime();
			return new Promise(re=> {img.onload = ()=> re(img)});
		})
		.then(img=> new Promise(re=> setTimeout(()=> re(img) , 100)))
			// 無くすとSafariでテクスチャ取れない場合があった
			// clearTimeout()不要と判断
		.then((img: any)=> {	//console.log(`🍉 toPng`);
			const canvas = document.createElement('canvas');
			canvas.width = infTL.$width;
			canvas.height = infTL.$height;
			canvas.getContext('2d')!.drawImage(img, 0, 0);
			fnc(Texture.from(canvas));
		})
		.catch((e: unknown)=> DebugMng.myTrace(`goTxt() = ${e}`));
	}
