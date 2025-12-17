/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, type IEvtMng, RPN_COMP_CHIN, argChk_Boolean, argChk_Num} from './CmnLib';
import type {TArg} from './Grammar';
import type {Config} from './Config';
import {CmnTween} from './CmnTween';
import {SpritesMng} from './SpritesMng';
import {DebugMng} from './DebugMng';
import type {IMakeDesignCast} from './LayerMng';
//import {TxtLayDesignCast, TxtLayPadDesignCast} from './DesignCast';
import type {SysBase} from './SysBase';
import type {T_RP_Hyphenation, IChRect} from './Hyphenation';
import {Hyphenation} from './Hyphenation';
import type {ScriptIterator} from './ScriptIterator';
import {Reading} from './Reading';
import type {T_cmdTxt_JSON} from './TxtLayer';
import {htm2tx} from './htm2tx';

import {Container, Sprite, Graphics, Rectangle, Renderer, Application} from 'pixi.js';
import {Group, Tween} from '@tweenjs/tween.js'


export type T_InfTxLay = {
	fontsize	: number;
	$width		: number;	// レイヤサイズであり、背景色（画像）サイズ
	$height		: number;
	pad_left	: number;	// paddingLeft（レイヤサイズの内側のスペーサー）
	pad_right	: number;	// paddingRight
	pad_top		: number;	// paddingTop
	pad_bottom	: number;	// paddingBottom
}

type T_SpTw = {
	sp	: Container;
	tw	: Tween<Container> | undefined;
}


export type T_RP_layTxtStage = {
	infTL		: T_InfTxLay;
	cssText		: string;
	left		: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ch_filter	: any[];
	fi_easing	: string;
	fo_easing	: string;
	hyph		: T_RP_Hyphenation;
}

type T_ChInOutStyle = {
	wait	: number;
	alpha	: number;
	x		: string;
	y		: string;
	width?	: string;
	height?	: string;
	nx		: number;
	ny		: number;
	scale_x	: number;
	scale_y	: number;
	rotate	: number;
	join	: boolean;
	ease	: string;
	delay?	: number;
};

export class TxtStage extends Container {
	static	#cfg	: Config;
	static	#appPixi: Application;
	static	init(cfg: Config, appPixi: Application): void {
		TxtStage.#cfg = cfg;
		TxtStage.#appPixi = appPixi;

		CmnTween.addGrp(TxtStage.grp);
	}
	static	readonly	grp = new Group;

	static	#evtMng	: IEvtMng;
	static	#scrItr	: ScriptIterator;
	static	setEvtMng(evtMng: IEvtMng, scrItr: ScriptIterator) {
		TxtStage.#evtMng = evtMng;
		TxtStage.#scrItr = scrItr;
	}

	static	destroy() {
		TxtStage.grp.removeAll();

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		TxtStage.#hChInStyle	= Object.create(null);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
	noticeCompTxt	= ()=> { /* empty */ };

	#fncMasume;


	constructor(private readonly ctn: Sprite, private readonly canFocus: ()=> boolean, private readonly sys: SysBase) {
		super();

		this.#htmTxt.classList.add('sn_tx');
		this.#htmTxt.style.position = 'absolute';
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		TxtStage.#appPixi.view.parentElement!.appendChild(this.#htmTxt);

		this.addChild(this.#cntTxt);

		this.addChild(this.#grpDbgMasume);
		this.#grpDbgMasume.name = 'grpDbgMasume';
		const fncMasumeLog = CmnLib.debugLog
			? ({ch, rect: {x, y, width, height}}: IChRect)=> console.log(`🍌 masume ch:${ch} x:${String(x)} y:${String(y)} w:${String(width)} h:${String(height)}`)
			: ()=> { /* empty */ };
		this.#fncMasume = TxtStage.#cfg.oCfg.debug.masume
			? (cr: IChRect)=> {
				fncMasumeLog(cr);

				const {x, y, width, height} = cr.rect;
				this.#grpDbgMasume
				.beginFill(0x66CCFF, 0.5)
				.lineStyle(2, 0xFF3300, 1)
				.drawRect(x, y, width, height)
				.endFill();
			}
			: ()=> { /* empty */ };

//		this.#idc = new TxtLayDesignCast(ctn, this);
//		this.#idc.adopt(this.#idcCh);

		this.noticeCompTxt = sys.isApp && TxtStage.#cfg.oCfg.debug.dumpHtm
		? ()=> {
			Reading.notifyEndProc(RPN_COMP_CHIN);

			const htm = this.#htmTxt.innerHTML;
			if (htm === '') return;
			const {fn, ln} = TxtStage.#scrItr.nowScrFnLn();
			const id = `dumpHtm ${
				ctn.name.slice(0, -7)	// 末尾「 page=B」削り
				.replaceAll(':', '=')			// ファイル名で困る文字
			}(fn=${fn} line=${String(ln)})`;
			void sys.outputFile(
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
		: ()=> Reading.notifyEndProc(RPN_COMP_CHIN);
	}

//	readonly	#idc	:TxtLayDesignCast;
//	readonly	#idcCh	= new TxtLayPadDesignCast(this);
	#infTL :T_InfTxLay = {
		fontsize	: 24,
		$width		: 0,	// レイヤサイズであり、背景色（画像）サイズ
		$height		: 0,
		pad_left	: 0,	// paddingLeft（レイヤサイズの内側のスペーサー）
		pad_right	: 0,	// paddingRight
		pad_top		: 0,	// paddingTop
		pad_bottom	: 0,	// paddingBottom
	}

	lay(hArg: TArg) {
		const s = this.#htmTxt.style;
		if ('style' in hArg) {
			if (hArg.style) {
				const cln = document.createElement('span');
				cln.style.cssText = hArg.style;
				const len = cln.style.length;
				for (let i=0; i<len; ++i) {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const key: any = cln.style[i];
					if (key in TxtStage.#hWarnStyle) {
						DebugMng.myTrace(`${String(key)}は指定できません`, 'W');
						continue;
					}
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					s[key] = cln.style[key]!;
				}
				if (! cln.style.opacity && 'alpha' in hArg) s.opacity = String(this.ctn.alpha);
			}
			else this.#htmTxt.style.cssText = '';
		}
		else if ('alpha' in hArg) s.opacity = String(this.ctn.alpha);

		if ('width' in hArg) s.width = String(hArg.width ?? '0') +'px';
		if ('height' in hArg) s.height = String(hArg.height ?? '0') +'px';
		if ('pl' in hArg) s.paddingLeft = String(hArg.pl ?? '0') +'px';
		if ('pr' in hArg) s.paddingRight = String(hArg.pr ?? '0') +'px';
		if ('pt' in hArg) s.paddingTop = String(hArg.pt ?? '0') +'px';
		if ('pb' in hArg) s.paddingBottom = String(hArg.pb ?? '0') +'px';
		this.#hyph.lay(hArg);
		this.#lay_sub();
//		this.#idc.sethArg(hArg);

		// CSS・インラインレイアウトで右や上にはみ出る分の余裕
		this.#left = this.ctn.position.x;
			//-(CmnLib.isSafari && !CmnLib.isMobile && this.#isTategaki
			//	? this.#infTL.pad_left +this.#infTL.pad_right
			//	: 0);	// 無効化 2022/02/09
		s.transformOrigin = `${String(this.ctn.pivot.x)}px ${String(this.ctn.pivot.y)}px`;
		this.cvsResize();
		s.display = this.ctn.visible ?'inline' :'none';

		// パディングキャスト変更時・クリック待ち表示を追従させる（高速再描写）
		if (':redraw' in hArg && this.#lenHtmTxt > 0) {
			const aSpan = [
				this.#htmTxt.innerHTML.replaceAll(/(animation-delay: )\d+ms/g, '$10ms'),
				'<span class=\'sn_ch\' data-add=\'{"ch_in_style":"default"}\'>&emsp;</span>',
			];
			this.#clearText();	// 消去
			this.goTxt(aSpan, true);	// 高速 goTxt()
		}
	}
	// oxlint-disable-next-line no-unused-private-class-members
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

		this.#isTategaki = s.writingMode === 'vertical-rl';

		this.#padTx4x = 0;
		this.#padTx4y = 0;

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		const lh = s.lineHeight ?? '0';
		this.#lh_half = this.#isTategaki
			? 0
			: (	lh.endsWith('px')
				? parseFloat(lh)
				: fs *parseFloat(lh) -fs) /2;
			// globalThis.getComputedStyle(this.htmTxt)がチョイチョイ値を返さないので
	}
	cvsResize() {
		const s = this.#htmTxt.style;
		const cvsScale = this.sys.cvsScale;
		s.left = `${String(this.sys.ofsLeft4elm +this.#left *cvsScale)}px`;
		s.top = `${String(this.sys.ofsTop4elm +this.ctn.position.y *cvsScale)}px`;
		s.transform = `rotate(${String(this.ctn.angle)}deg) scale(${String(this.ctn.scale.x *cvsScale)}, ${String(this.ctn.scale.y *cvsScale)})`;

//		this.#idc.cvsResize();
//		this.#idcCh.cvsResize();
	}
	#left = 0;
	#isTategaki = false;
	get tategaki() {return this.#isTategaki}
	#padTx4x = 0;
	#padTx4y = 0;

	get	infTL(): T_InfTxLay {return this.#infTL}
	get	getWidth() {return this.#infTL.$width}
	get	getHeight() {return this.#infTL.$height}

	setMySize(width: number, height: number) {
		this.#infTL.$width = width;
		this.#infTL.$height = height;
		this.#htmTxt.style.width = String(this.#infTL.$width) +'px';
		this.#htmTxt.style.height = String(this.#infTL.$height) +'px';
	}


	#aGoTxt	: (()=> void)[] = [];	// FIFO実行バッファ
	goTxt(aSpan: string[], instant: boolean) {
		const f = ()=> this.#goTxt_Proc(aSpan, instant);
		if (this.#aGoTxt.push(f) === 1) f();	// len=1 で実行中を示す
	}

	#aRect	: IChRect[]	= [];
	#lenHtmTxt = 0;
	static	readonly	#SPAN_LAST = '<span class=\'sn_ch sn_ch_last\'>&emsp;</span>';
	#goTxt_Proc(aSpan: string[], instant: boolean) {
		TxtStage.#cntBreak.visible = false;

		let begin = this.#aRect.length;
		let bkHtm = '';
		if (begin === 0) {	// 初回
			if (TxtStage.#cfg.oCfg.debug.masume) {
				if (CmnLib.debugLog) console.log(`🍌 masume ${this.name
				} v:${String(this.visible)} l:${String(this.x)
				} t:${String(this.y)} a:${String(this.alpha)
				} pl:${String(this.#infTL.pad_left)
				} pr:${String(this.#infTL.pad_right)
				} pt:${String(this.#infTL.pad_top)
				} pb:${String(this.#infTL.pad_bottom)
				} w:${String(this.#infTL.$width)
				} h:${String(this.#infTL.$height)}`);

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
//console.log(`fn:TxtStage.ts nm=${this.name} begin:${begin} bkHtm=${bkHtm}=`);
			this.#htmTxt.getElementsByClassName('sn_ch_last').item(0)?.remove();
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
		this.#htmTxt.querySelectorAll('.sn_ch:has(> ruby)').forEach(v=> {(<HTMLElement>v).style.background = ''});	// :has直前に空白厳禁

		this.#lenHtmTxt = aSpan.length;
//console.log(`fn:TxtStage.ts nm=${this.name} === ==${this.#htmTxt.innerHTML.slice(360)}==`);

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

		const ease = CmnTween.ease(this.#fi_easing);

		for (let i=begin; i<len; ++i) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const cr = this.#aRect[i]!;
			const {elm: {dataset, parentElement}, rect} = cr;
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const arg = JSON.parse(dataset.arg ?? '{"delay": 0}');
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const add = JSON.parse(dataset.add ?? '{}');
			const cis = TxtStage.#hChInStyle[add.ch_in_style];
			this.#fncMasume(cr);

			if (dataset.cmd === 'grp') {
				const cnt = new Container;	// 親コンテナかまし、即spWork()
				this.#cntTxt.addChild(cnt);
					// 次のcsv2Spritesが即終わる場合もあるので先に行なう
				new SpritesMng(arg.pic, cnt, sp=> {
					this.#spWork(cnt, arg, add, rect, ease, cis ?? {});
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
					if (! cnt.parent) cnt.removeChild(sp);
				});
			}
			if (dataset.lnk) {
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, @typescript-eslint/no-non-null-assertion
				const eCh = <HTMLElement>parentElement!.closest('[data-arg]')!;
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const aLnk = JSON.parse(eCh.dataset.arg ?? '{}');
				aLnk.key = `lnk=[${String(i)}] `+ this.name;
				const sp = new Sprite;
				this.#spWork(sp, aLnk, add, rect, ease, cis ?? {});

				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const st_normal = aLnk.style ?? '';
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const st_hover = st_normal +(aLnk.style_hover ?? '');
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const st_clicked = st_normal +(aLnk.style_clicked ?? '');
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const st_r_normal = aLnk.r_style ?? '';
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const st_r_hover = st_r_normal +(aLnk.r_style_hover ?? '');
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const st_r_clicked = st_r_normal +(aLnk.r_style_clicked ?? '');

				const nlRt = Array.from(eCh.getElementsByTagName('rt'));
				for (const e of nlRt) e.dataset.st_r_bk = e.style.cssText;
				const st_bk = eCh.style.cssText;
				const fncStyle = (st: string, st_r: string)=> {
					eCh.style.cssText = st_bk + st;
					for (const e of nlRt) e.style.cssText = e.dataset.st_r_bk + st_r;
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
		const chs = Array.from(<HTMLCollectionOf<HTMLElement>>this.#htmTxt.getElementsByClassName('sn_ch_yet'));
// console.log(`fn:TxtStage.ts nm=${this.name} StartChIn <==`);
		this.#fncEndChIn = ()=> {
// console.log(`fn:TxtStage.ts nm=${this.name} fncEndChIn ==> '${lastElm?.textContent}' cls:${lastElm?.className}:`);

			this.#fncEndChIn = ()=> false;
			for (const v of chs) v.className = 'sn_ch';
			TxtStage.#cntBreak.position.set(
				this.#hyph.break_fixed_left,
				this.#hyph.break_fixed_top,
			);
			TxtStage.#cntBreak.visible = true;
			/*
				これらはセットで確認すること。兼ね合いにより、いずれかが破綻する場合がある
					- 末尾文字表示でカーソルが次行先頭に来てしまうことのないよう
					- 改行→クリック待ち、の後で改行が消えないよう
					- 冒頭クリック待ち＋改行での表示確認
			*/
			this.noticeCompTxt();

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const f = this.#aGoTxt.shift()!;	// 実行中の一個必ず入ってる（clearText注意）
			if (this.#aGoTxt.length > 0) f();	// まだあれば実行待ちなので実行

			return true;
		};

		// アニメ開始（sn_ch を置換しないよう注意）
		for (const v of chs) v.className = v.className.replace('sn_ch_yet sn', 'go');
		if (begin > 0) ++begin;	// 末尾改行削除挙動対策

		// 文字表示に時間をかける最後の文字を探す。末尾はダミー（#SPAN_LAST）
		let lastElm: HTMLElement | undefined = undefined;
		for (let i=len -2; i>=0; --i) {		// 末尾の手前から
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const {elm} = this.#aRect[i]!;
			if (elm.tagName !== 'SPAN') continue;	// ルビ以外

//console.log(`fn:TxtStage.ts nm=${this.name} txt:${elm.textContent}: i:${i} begin:${begin} len:${len} elm:%o`, elm);
			lastElm = elm.parentElement?.tagName === 'RUBY'
				? elm.parentElement.parentElement ?? elm // [tcy]も[graph]も
				: elm;
			break;
		}
		if (! lastElm || instant || begin === len) {this.#fncEndChIn(); return}
			// 「animation-duration: 0ms;」だと animationend が発生しないので。
			// if 三項目の === は右クリック戻りで起こる

		const fnc = ()=> {
			lastElm.removeEventListener('animationend', fnc);
				// {once: true} より、明示的な removeEventListener のほうがサクサク解放するようである。屋上屋を架す事になりにくく、未解放リソースグラフでも低く抑えられる。
			this.#fncEndChIn();
		};
		lastElm.addEventListener('animationend', fnc, {once: true, signal: this.#ac.signal});	// クリックキャンセル時は発生しない
			// 差し替えるので「()=> 」形式のままにすること
	}
	#fncEndChIn: ()=> boolean	= ()=> false;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	#spWork(sp: Container, arg: T_ChInOutStyle, add: any, rct: Rectangle, ease: (k: number)=> number, cis: any) {
		sp.alpha = 0;
		if (arg.x) rct.x = arg.x.startsWith('=')
			? rct.x +parseInt(arg.x.slice(1))
			: parseInt(arg.x);
		if (arg.y) rct.y = arg.y.startsWith('=')
			? rct.y +parseInt(arg.y.slice(1))
			: parseInt(arg.y);
		if (arg.width) rct.width = parseInt(arg.width);
		if (arg.height) rct.height = parseInt(arg.height);
		if (arg.wait) cis.wait = arg.wait;
		sp.width = rct.width;
		sp.height = rct.height;
		if (cis.x) sp.position.set(
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			cis.x.startsWith('=') ?rct.x +sp.width  *cis.nx :cis.nx,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			cis.y.startsWith('=') ?rct.y +sp.height *cis.ny :cis.ny
		);
		else sp.position.set(rct.x, rct.y,);

		const tw = new Tween(sp)
		.to({ alpha: 1, x: rct.x, y: rct.y, width: rct.width, height: rct.height, angle: 0 }, cis.wait ?? 0)
		.easing(ease)
		.delay((add.wait ?? 0) +(arg.delay ?? 0))
		.onComplete(()=> {
			st.tw = undefined;
			//(略)	if (rct.width === 0 || rct.height === 0) return;
			//if (sp instanceof Sprite) sp.cacheAsBitmap = true;
			// これを有効にすると[snapshot]で文字が出ない
		})
		.start();
		TxtStage.grp.add(tw);

		const st: T_SpTw = {sp, tw};
		this.#aSpTw.push(st);
	}
	#aSpTw		: T_SpTw[]	= [];

	skipChIn(): boolean {	// true: 文字出現中だったので、停止する
		let wasChInIng = this.#fncEndChIn();
		for (const st of this.#aSpTw) {	// Text Skip。stop() と end() は別！
			if (st.tw) {st.tw.stop().end(); wasChInIng = true}
		}
		this.#aSpTw = [];
		return wasChInIng;
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	static	#hChInStyle: {[nm: string]: T_ChInOutStyle}	= Object.create(null);
	static	readonly	#REG_NG_CHSTYLE_NAME_CHR	= /[{\s.,*{]/;
		// https://regex101.com/r/APC91I/1
	static	initChStyle() {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		TxtStage.#hChInStyle = Object.create(null);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		TxtStage.#hChOutStyle = Object.create(null);
	}
	static	getChInStyle(name: string) {return TxtStage.#hChInStyle[name]}
	static	ch_in_style(hArg: TArg): T_ChInOutStyle {
		const {name} = hArg;
		if (! name) throw 'nameは必須です';
		if (TxtStage.#REG_NG_CHSTYLE_NAME_CHR.test(name)) throw `name【${name}】に使えない文字が含まれます`;
		if (name in TxtStage.#hChInStyle) throw `name【${name}】はすでにあります`;

		const x = String(hArg.x ?? '=0');
		const y = String(hArg.y ?? '=0');
		const ret = TxtStage.#hChInStyle[name] = {
			wait	: argChk_Num(hArg, 'wait', 500),	// アニメ・FI時間
			alpha	: argChk_Num(hArg, 'alpha', 0),
			x,	// 初期x値
			y,	// [tsy]と同様に絶対・相対指定可能
			// {x:500}			X位置を500に
			// {x:'=500'}		現在のX位置に+500加算した位置
			// {x:'=-500'}		現在のX位置に-500加算した位置
			// {x:'250,500'}	+250から＋500までの間でランダムな値をX位置に
			// {x:'=250,500'}	+250から＋500までの間でランダムな値を現在のX位置に加算
			nx		: parseFloat(x.at(0) === '=' ? x.slice(1) : x),
			ny		: parseFloat(y.at(0) === '=' ? y.slice(1) : y),
			scale_x	: argChk_Num(hArg, 'scale_x', 1),
			scale_y	: argChk_Num(hArg, 'scale_y', 1),
			rotate	: argChk_Num(hArg, 'rotate', 0),
			join	: argChk_Boolean(hArg, 'join', true),
						// 文字を順番に出すか（true）同時か（false）
			ease	: hArg.ease ?? 'ease-out',
		};
		return ret;
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	static	#hChOutStyle: {[nm: string]: T_ChInOutStyle}= Object.create(null);
	static	getChOutStyle(name: string) {return TxtStage.#hChOutStyle[name]}
	static	ch_out_style(hArg: TArg): T_ChInOutStyle {
		const {name} = hArg;
		if (! name) throw 'nameは必須です';
		if (TxtStage.#REG_NG_CHSTYLE_NAME_CHR.test(name)) throw `name【${name}】に使えない文字が含まれます`;
		if (name in TxtStage.#hChOutStyle) throw `name【${name}】はすでにあります`;

		const x = String(hArg.x ?? '=0');
		const y = String(hArg.y ?? '=0');
		const ret = TxtStage.#hChOutStyle[name] = {
			wait	: argChk_Num(hArg, 'wait', 500),	// アニメ・FI時間
			alpha	: argChk_Num(hArg, 'alpha', 0),
			x,	// 初期x値
			y,	// [tsy]と同様に絶対・相対指定可能
			// {x:500}			X位置を500に
			// {x:'=500'}		現在のX位置に+500加算した位置
			// {x:'=-500'}		現在のX位置に-500加算した位置
			// {x:'250,500'}	+250から＋500までの間でランダムな値をX位置に
			// {x:'=250,500'}	+250から＋500までの間でランダムな値を現在のX位置に加算
			nx		: parseFloat(x.at(0) === '=' ? x.slice(1) : x),
			ny		: parseFloat(y.at(0) === '=' ? y.slice(1) : y),
			scale_x	: argChk_Num(hArg, 'scale_x', 1),
			scale_y	: argChk_Num(hArg, 'scale_y', 1),
			rotate	: argChk_Num(hArg, 'rotate', 0),
			join	: argChk_Boolean(hArg, 'join', false),
						// 文字を順番に出すか（true）同時か（false）
			ease	: hArg.ease ?? 'ease-out',
		};
		return ret;
	}

	static	readonly	#cntBreak	= new Container;
	static				#spsBreak	= new SpritesMng;
	dispBreak(o: T_cmdTxt_JSON) {
		TxtStage.delBreak();

		const cnt = TxtStage.#cntBreak;
		cnt.visible = false;
		this.addChild(cnt);	// 次のcsv2Spritesが即終わる場合もあるので先に行なう
		TxtStage.#spsBreak.destroy();
		TxtStage.#spsBreak = new SpritesMng(o.pic, cnt, sp=> {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		cnt.parent?.removeChild(cnt);	// 複数メッセージウインドウを想定
		TxtStage.#spsBreak.destroy();
	}

	#fi_easing	= 'Quadratic.Out';
	#fo_easing	= 'Quadratic.Out';
	#ac = new AbortController;
	#clearText() {
		this.#grpDbgMasume.clear();
		this.#aRect = [];
		this.#lenHtmTxt = 0;
		this.#aGoTxt = [];
		this.#ac.abort();
		this.#ac = new AbortController;

		//utils.clearTextureCache();	// 改ページと思われるこのタイミングで
		this.skipChIn();
		const n = document.createElement('span');
		n.style.cssText = this.#htmTxt.style.cssText;
		n.classList.value = this.#htmTxt.classList.value;
			// 以下よりノード数の最大が下がる
			// const n = <HTMLSpanElement>this.#htmTxt.cloneNode(true);
			// n.textContent = '';
			// // this.htmTxt.innerHTML = '';	// 上記のほうが早いらしい
		const old = this.#htmTxt;
		const a = Array.from(<HTMLCollectionOf<HTMLElement>>old.getElementsByClassName('sn_ch'));
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		old.parentElement!.insertBefore(n, old);

		let sum_wait = 0;
		a.forEach(elm=> {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const add = JSON.parse(
				elm.dataset.add ??				// 通常文字
				elm.children[0]?.getAttribute('data-add') ??	// ルビ
				elm.children[0]?.children[0]
					?.getAttribute('data-add') ?? '{}'		// 縦中横
			);
			if (! add.ch_out_style) return;

			const cos = TxtStage.#hChOutStyle[add.ch_out_style];
			if (! cos) return;
			if (cos.wait === 0) {elm.style.display = 'none'; return}

			sum_wait += cos.wait;
			if (! cos.join) elm.style.animationDelay = '0ms';
			elm.classList.add(`go_ch_out_${String(add.ch_out_style)}`);
		});

		const end = ()=> {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			old.parentElement!.removeChild(old);
			for (const c of this.#cntTxt.removeChildren()) {
				if (c instanceof Container) TxtStage.#evtMng.unButton(c);
				c.destroy();
			}
		};
		if (sum_wait === 0) {
			this.#htmTxt.textContent = '';
			this.#htmTxt = document.createElement('span');
			end();
		}
		else {
			const h = old.lastElementChild;
			if (h) {
				const fnc = ()=> {
					h.removeEventListener('animationend', fnc);
						// {once: true} より、明示的な removeEventListener のほうがサクサク解放するようである。屋上屋を架す事になりにくく、未解放リソースグラフでも低く抑えられる。
					end();
				};
				h.addEventListener('animationend', fnc, {once: true, signal: this.#ac.signal});
			}
			else end();
		}

		this.#htmTxt = n;
	}
	reNew(): TxtStage {
		this.#clearText();

		const to = new TxtStage(this.ctn, this.canFocus, this.sys);
			// ()=> this.canFocus() だとリソースリークになる
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	#ch_filter	: any[] | undefined = undefined;	// 文字にかけるフィルター


	record() {return {
		infTL		: this.#infTL,

		cssText		: this.#htmTxt.style.cssText,
		left		: this.#left,
//		idc_hArg	: this.#idc.gethArg(),

		ch_filter	: this.#ch_filter,
		fi_easing	: this.#fi_easing,
		fo_easing	: this.#fo_easing,

		hyph		: this.#hyph.record(),
	}}
	playback(hLay: T_RP_layTxtStage) {
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
		htm2tx(tx=> {
			this.#sss = Sprite.from(tx);	// Safariだけ文字影が映らない
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
		}, this.#htmTxt, this.#infTL, this.#padTx4x, this.#padTx4y, false);
	}
	snapshot_end() {
		if (! this.#sss) return;
		this.#cntTxt.removeChild(this.#sss);
		this.#sss = undefined;
	}

	makeDesignCast(_gdc: IMakeDesignCast) {
//	makeDesignCast(gdc: IMakeDesignCast) {
//		gdc(this.#idc);

//		const o = this.#idc.gethArg();
//		this.#idcCh.sethArg({...o, ':id_dc': o[':id_tag'] +'_pad'});
//		gdc(this.#idcCh);
	}
	showDesignCast() { /* empty */ }
//	showDesignCast() {this.#idc.visible = true; this.#idcCh.visible = true}

	dump(): string {
		const aStyle: string[] = [];
		const s = this.#htmTxt.style;
		const len = s.length;
		for (let i=0; i<len; ++i) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const key: any = s[i];
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			aStyle.push(`"${String(key)}":"${s[key]!.replaceAll(/(["\\])/g, '\\$1')}"`);
		}
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, @typescript-eslint/no-non-null-assertion
		return `"txt":"${this.#htmTxt.textContent!.replaceAll(/(["\\])/g, '\\$1')
		}", "style":{${aStyle.join(',')}}`;
			// 4Debug。++カウンターし、dump表示させても良さげ
	}

	override destroy() {
		TxtStage.delBreak();

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		this.#htmTxt.parentElement!.removeChild(this.#htmTxt);
		// this.#htmTxt.textContent = '';	// 有効性が逆効果気味
		this.#htmTxt = document.createElement('span');	// リソース解放に有効
		this.removeChild(this.#cntTxt);
		this.removeChild(this.#grpDbgMasume);

		this.#grpDbgMasume.clear();
		this.#fncMasume = ()=> { /* empty */ };	// リソース解放にやや有効？
		this.#aGoTxt = [];
		this.#aRect	= [];
		this.#lenHtmTxt = 0;
		this.#aSpTw = [];	// リソース解放に有効
		this.#ac.abort();	// 有効性が低い、が保険で
		this.#ch_filter = undefined;

		super.destroy();
	}
}
