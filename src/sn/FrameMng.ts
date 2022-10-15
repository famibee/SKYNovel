/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2022 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, IEvtMng, cnvTweenArg, argChk_Boolean, argChk_Num} from './CmnLib';
import {ITwInf, CmnTween} from './CmnTween';
import {IHTag, HArg} from './Grammar';
import {IVariable, IMain, IGetFrm} from './CmnInterface';
import {Application} from 'pixi.js';
import {SysBase} from './SysBase';
import {Config, SEARCH_PATH_ARG_EXT} from './Config';
import {GrpLayer} from './GrpLayer';

import {Tween} from '@tweenjs/tween.js'
import {Loader, LoaderResource} from 'pixi.js';
import { LayerMng } from './LayerMng';

export class FrameMng implements IGetFrm {
	constructor(private readonly cfg: Config, hTag: IHTag, private readonly appPixi: Application, private readonly val: IVariable, private readonly main: IMain, private readonly sys: SysBase, private readonly hTwInf: {[name: string]: ITwInf}) {
		//	HTMLフレーム
		hTag.add_frame		= o=> this.#add_frame(o);	// フレーム追加
		hTag.let_frame		= o=> this.#let_frame(o);	// フレーム変数を取得
		hTag.set_frame		= o=> this.#set_frame(o);	// フレーム変数に設定
		hTag.frame			= o=> this.#frame(o);		// フレームに設定
		hTag.tsy_frame		= o=> this.#tsy_frame(o);	// フレームをトゥイーン開始
	}

	#evtMng	: IEvtMng;
	setEvtMng(evtMng: IEvtMng) {this.#evtMng = evtMng;}

	#hIfrm	: {[id: string]: HTMLIFrameElement} = Object.create(null);
	destroy() {
		for (const f of Object.values(this.#hIfrm)) f.parentElement!.removeChild(f);
		this.#hIfrm = Object.create(null);
	}

	//	HTMLフレーム
	// フレーム追加
	#add_frame(hArg: HArg) {
		const {id, src, alpha: a=1, scale_x: sx=1, scale_y: sy=1, rotate: r=0,} = hArg;
		if (! id) throw 'idは必須です';
		if (! src) throw 'srcは必須です';
		const vn = 'const.sn.frm.'+ id;
		if (this.val.getVal(`tmp:${vn}`)) throw `frame【${id}】はすでにあります`;

		const v = argChk_Boolean(hArg, 'visible', true);
		const b_color = hArg.b_color ?` background-color: ${hArg.b_color};` :'';
		const rct = this.#rect(hArg);
		this.appPixi.view.insertAdjacentHTML('beforebegin', `<iframe id="${id
		}" sandbox="allow-scripts allow-same-origin" style="opacity: ${a
		}; position: absolute; left:${this.sys.ofsLeft4elm +rct.x *this.sys.cvsScale
		}px; top: ${this.sys.ofsTop4elm +rct.y *this.sys.cvsScale}px; z-index: 1; ${b_color
		} border: 0px; overflow: hidden; display: ${v ?'inline' :'none'
		}; transform: scale(${sx}, ${sy}) rotate(${r}deg);" width="${rct.width *this.sys.cvsScale}" height="${rct.height *this.sys.cvsScale}"></iframe>`);

		const url = this.cfg.searchPath(src, SEARCH_PATH_ARG_EXT.HTML);
		const ld = (new Loader())
		.add({name: src, url, xhrType: LoaderResource.XHR_RESPONSE_TYPE.TEXT});
		if (this.sys.crypto) ld.use((res, next)=> {
			try {
				res.data = this.sys.decStr(res.extension, res.data);
			} catch (e) {
				this.main.errScript(`[add_frame]Html ロード失敗です src:${res.name} ${e}`, false);
			}
			next?.();
		});
		ld.load((_ldr, hRes)=> {
			const ifrm = document.getElementById(id) as HTMLIFrameElement;
			this.#hIfrm[id] = ifrm;
			this.#hDisabled[id] = false;
			ifrm.srcdoc = String(hRes[src]?.data)	// .src はふりーむで問題発生
			.replace('sn_repRes();', '')
			.replaceAll(
				/\s(?:src|href)=(["'])(\S+)\1/g,
				(v, p1, p2)=> (p2.slice(0, 3) === '../')
					? this.sys.cur + p2.slice(4)
					: v.replace(p1, p1 + url.slice(0, url.lastIndexOf('/') +1))
			);
			// 一度変数に入れてここで設定するのはFirefox対応。ifrm.onloadが二度呼ばれる！
			ifrm.onload = ()=> {
				// 組み込み変数
				this.val.setVal_Nochk('tmp', vn, true);
				this.val.setVal_Nochk('tmp', vn +'.alpha', a);
				this.val.setVal_Nochk('tmp', vn +'.x', rct.x);
				this.val.setVal_Nochk('tmp', vn +'.y', rct.y);
				this.val.setVal_Nochk('tmp', vn +'.scale_x', sx);
				this.val.setVal_Nochk('tmp', vn +'.scale_y', sy);
				this.val.setVal_Nochk('tmp', vn +'.rotate', r);
				this.val.setVal_Nochk('tmp', vn +'.width', rct.width);
				this.val.setVal_Nochk('tmp', vn +'.height', rct.height);
				this.val.setVal_Nochk('tmp', vn +'.visible', v);

				const win = ifrm.contentWindow!;
				this.#evtMng.resvFlameEvent(win);
				((win as any).sn_repRes)?.((img: HTMLImageElement)=>
				GrpLayer.loadPic2Img((img.dataset.src ?? ''), img));

				this.main.resume();
			};
		});

		return true;
	}
	#hDisabled	: {[id: string]: boolean}	= {};
	getFrmDisabled(id: string): boolean {return this.#hDisabled[id]}
	#rect(hArg: HArg): DOMRect {
		const a = {...hArg};
		const re = this.sys.resolution;
		return new DOMRect(
			argChk_Num(a, 'x', 0) *re,
			argChk_Num(a, 'y', 0) *re,
			argChk_Num(a, 'width', CmnLib.stageW) *re,
			argChk_Num(a, 'height', CmnLib.stageH) *re,
		);
	}

	cvsResize() {	// NOTE: フォントサイズはどう変更すべきか
		for (const [id, f] of Object.entries(this.#hIfrm)) {
			const vn = 'const.sn.frm.'+ id;
			const x = Number(this.val.getVal(vn +'.x'));
			const y = Number(this.val.getVal(vn +'.y'));
			const w = Number(this.val.getVal(vn +'.width'));
			const h = Number(this.val.getVal(vn +'.height'));
			f.style.left = `${this.sys.ofsLeft4elm +x *this.sys.cvsScale}px`;
			f.style.top  = `${this.sys.ofsTop4elm  +y *this.sys.cvsScale}px`;
			f.width = String(w *this.sys.cvsScale);
			f.height = String(h *this.sys.cvsScale);
		}
	}

	// フレーム変数を取得
	#let_frame(hArg: HArg) {
		const {id, var_name} = hArg;
		if (! id) throw 'idは必須です';
		const f = document.getElementById(id) as HTMLIFrameElement;
		if (! f) throw `id【${id}】はフレームではありません`;
		const vn = 'const.sn.frm.'+ id;
		if (! this.val.getVal(`tmp:${vn}`)) throw `frame【${id}】が読み込まれていません`;
		if (! var_name) throw 'var_nameは必須です';

		const win: Window = f.contentWindow!;
		if (! win.hasOwnProperty(var_name)) throw `frame【${id}】に変数/関数【${var_name}】がありません。変数は var付きにして下さい`;

		const v = (win as any)[var_name];
		// var変数 / 関数実行の戻り値 -> 組み込み変数
		this.val.setVal_Nochk(
			'tmp',
			vn +'.'+ var_name,
			argChk_Boolean(hArg, 'function', false) ?v() :v
		);

		return false;
	}

	// フレーム変数に設定
	#set_frame(hArg: HArg) {
		const {id, var_name, text} = hArg;
		if (! id) throw 'idは必須です';
		const f = document.getElementById(id) as HTMLIFrameElement;
		if (! f) throw `id【${id}】はフレームではありません`;
		const vn = 'const.sn.frm.'+ id;
		if (! this.val.getVal(`tmp:${vn}`)) throw `frame【${id}】が読み込まれていません`;
		if (! var_name) throw 'var_nameは必須です';
		if (! text) throw 'textは必須です';

		// -> 組み込み変数
		this.val.setVal_Nochk('tmp', vn +'.'+ var_name, text);

		// -> var変数に設定
		const win: any = f.contentWindow!;
		win[var_name] = text;

		return false;
	}

	// フレームに設定
	#zIdx = 1;
	#frame(hArg: HArg) {
		const {id} = hArg;
		if (! id) throw 'idは必須です';
		const f = document.getElementById(id) as HTMLIFrameElement;
		if (! f) throw `id【${id}】はフレームではありません`;
		const vn = 'const.sn.frm.'+ id;
		if (! this.val.getVal('tmp:'+ vn)) throw `frame【${id}】が読み込まれていません`;

		const s = f.style;
		if (argChk_Boolean(hArg, 'float', false)) s.zIndex = `${++this.#zIdx}`;
		else if ('index' in hArg) s.zIndex = `${argChk_Num(hArg, 'index', 0)}`;
		else if (hArg.dive) s.zIndex = `-${++this.#zIdx}`;

		if ('alpha' in hArg) {
			const a = s.opacity = String(hArg.alpha);
			this.val.setVal_Nochk('tmp', vn +'.alpha', a);
		}
		const rct = this.#rect(hArg);
		if ('x' in hArg || 'y' in hArg) {
			s.left = `${this.sys.ofsLeft4elm +rct.x *this.sys.cvsScale}px`;
			s.top  = `${this.sys.ofsTop4elm  +rct.y *this.sys.cvsScale}px`;
			this.val.setVal_Nochk('tmp', vn +'.x', rct.x);
			this.val.setVal_Nochk('tmp', vn +'.y', rct.y);
		}
		if ('scale_x' in hArg || 'scale_y' in hArg || 'rotate' in hArg) {
			const sx = argChk_Num(hArg, 'scale_x', 1);
			const sy = argChk_Num(hArg, 'scale_y', 1);
			const r = argChk_Num(hArg, 'rotate', 0);
			s.transform = `scale(${sx}, ${sy}) rotate(${r}deg)`;
			this.val.setVal_Nochk('tmp', vn +'.scale_x', sx);
			this.val.setVal_Nochk('tmp', vn +'.scale_y', sy);
			this.val.setVal_Nochk('tmp', vn +'.rotate', r);
		}
		if ('width' in hArg) {
			f.width = String(rct.width *this.sys.cvsScale);
			this.val.setVal_Nochk('tmp', vn +'.width', rct.width);
		}
		if ('height' in hArg) {
			f.height = String(rct.height *this.sys.cvsScale);
			this.val.setVal_Nochk('tmp', vn +'.height', rct.height);
		}
		if ('visible' in hArg) {
			const v = argChk_Boolean(hArg, 'visible', true);
			s.display = v ?'inline' :'none';
			this.val.setVal_Nochk('tmp', vn +'.visible', v);
		}
		if ('b_color' in hArg) s.backgroundColor = hArg.b_color!;
		if ('disabled' in hArg) {
			const d = this.#hDisabled[id] = argChk_Boolean(hArg, 'disabled', true);
			const il: NodeListOf<HTMLInputElement | HTMLSelectElement> = f.contentDocument!.body.querySelectorAll('input,select');
			il.forEach(v=> v.disabled = d);
		}

		return false;
	}

	// フレームをトゥイーン開始
	#tsy_frame(hArg: HArg) {
		const {id, alpha, x, y, scale_x, scale_y, rotate, width, height, ease, path, chain} = hArg;
		if (! id) throw 'idは必須です';
		const f = document.getElementById(id) as HTMLIFrameElement;
		if (! f) throw `id【${id}】はフレームではありません`;
		const vn = `const.sn.frm.`+ id;
		if (! this.val.getVal(`tmp:${vn}`, 0)) throw `frame【${id}】が読み込まれていません`;

		const hNow: any = {};
		if (alpha) hNow.a = f.style.opacity;
		if (x || y || scale_x || scale_y || rotate) {
			hNow.x = Number(this.val.getVal(`tmp:${vn}.x`));
			hNow.y = Number(this.val.getVal(`tmp:${vn}.y`));
			hNow.sx = Number(this.val.getVal(`tmp:${vn}.scale_x`));
			hNow.sy = Number(this.val.getVal(`tmp:${vn}.scale_y`));
			hNow.r = Number(this.val.getVal(`tmp:${vn}.rotate`));
		}
		if (width) hNow.w = this.val.getVal(`tmp:${vn}.width`);
		if (height) hNow.h = this.val.getVal(`tmp:${vn}.height`);
		const hArg2 = cnvTweenArg(hArg, hNow);

		const hTo: any = {};
		let fncA = ()=> {};
		if (alpha) {
			hTo.a = argChk_Num(hArg2, 'alpha', 0);
			fncA = ()=> {
				f.style.opacity = hNow.a;
				this.val.setVal_Nochk('tmp', 'alpha', hNow.a);
			};
		}
		let fncXYSR = ()=> {};
		const rct = this.#rect(hArg2);
		if (x || y || scale_x || scale_y || rotate) {
			hTo.x = rct.x;
			hTo.y = rct.y;
			hTo.sx = argChk_Num(hArg2, 'scale_x', 1);
			hTo.sy = argChk_Num(hArg2, 'scale_y', 1);
			hTo.r = argChk_Num(hArg2, 'rotate', 0);
			fncXYSR = ()=> {
				f.style.left = this.sys.ofsLeft4elm +hNow.x *this.sys.cvsScale +'px';
				f.style.top  = this.sys.ofsTop4elm  +hNow.y *this.sys.cvsScale +'px';
				f.style.transform = `scale(${hNow.sx}, ${hNow.sy}) rotate(${hNow.r}deg)`;
				this.val.setVal_Nochk('tmp', vn +'.x', hNow.x);
				this.val.setVal_Nochk('tmp', vn +'.y', hNow.y);
				this.val.setVal_Nochk('tmp', vn +'.scale_x', hNow.sx);
				this.val.setVal_Nochk('tmp', vn +'.scale_y', hNow.sy);
				this.val.setVal_Nochk('tmp', vn +'.rotate', hNow.r);
			};
		}
		let fncW = ()=> {};
		if (width) {
			hTo.w = rct.width;
			fncW = ()=> {
				f.width = hNow.w *this.sys.cvsScale +'px';
				this.val.setVal_Nochk('tmp', vn +'.width', hNow.w);
			};
		}
		let fncH = ()=> {};
		if (height) {
			hTo.h = rct.height;
			fncH = ()=> {
				f.height = hNow.h *this.sys.cvsScale +'px';
				this.val.setVal_Nochk('tmp', vn +'.height', hNow.h);
			};
		}

		this.appPixi.stage.interactive = false;
		const tw_nm = `frm\n${id}`;
		const onComplete = ()=> {
			this.appPixi.stage.interactive = true;
			// この辺は LayerMng.ts tsy()と同様なので、変更時は相互に合わせること
			const ti = this.hTwInf[tw_nm];
			if (! ti) return;

			delete this.hTwInf[tw_nm];
			ti.tw?.stop();
			if (ti.resume) this.main.resume();
			ti.onEnd?.();
		};
		const dur = argChk_Num(hArg, 'time', NaN) * (
			Boolean(this.val.getVal('tmp:sn.skip.enabled')
			|| this.#evtMng.isSkippingByKeyDown()) ?0 :1);
		const nEase = CmnTween.ease(ease);
		const rep = argChk_Num(hArg, 'repeat', 1);
		const repeat = rep === 0 ?Infinity :(rep -1);// 一度リピート→計二回なので
		const yoyo = argChk_Boolean(hArg, 'yoyo', false);
		const delay = argChk_Num(hArg, 'delay', 0);

		const tw = new Tween(hNow)
		.to(hTo, dur).easing(nEase).repeat(repeat).yoyo(yoyo).delay(delay)
		.onUpdate(()=> {fncA(); fncXYSR(); fncW(); fncH();});
		let twLast = tw;
		if (path) {
			if (CmnLib.debugLog) console.group(`🍝 [tsy_frame] path=${path}= start(${hNow.x},${hNow.y},${hNow.alpha})`);
			for (const {groups} of path.matchAll(LayerMng.REG_TSY_PATH)) {
				const {x, x2, y, y2, o, o2, json} = groups!;
				let hArg2: any = {};
				if (json) try {hArg2 = JSON.parse(json);} catch (e) {
					console.error(`🍝 json=${json} `+ e);
					continue;
				}
				else {
					if (x ?? x2) hArg2.x = x ?? x2;
					if (y ?? y2) hArg2.y = y ?? y2;
					if (o ?? o2) hArg2.alpha = o ?? o2;
				}

				const hTo2 = cnvTweenArg(hArg2, hNow);
				if (CmnLib.debugLog) console.info(`🍝 {x:${x} y:${y} o:${o}} => hTo:${JSON.stringify(hTo2)}`);

				const twNew = new Tween(hNow)	//.delay(delay)
				.to(hTo2, dur).easing(nEase).repeat(repeat).yoyo(yoyo)
				twLast.chain(twNew);

				twLast = twNew;
			}
			if (CmnLib.debugLog) console.groupEnd();
		}
		twLast.onComplete(onComplete);

		if (chain) {
			const twFrom = this.hTwInf[chain ?? ''];
			if (! twFrom || ! twFrom.tw) throw `${chain}は存在しない・または終了したトゥイーンです`;
			delete twFrom.onEnd;
			twFrom.tw.chain(tw);
		}
		else tw.start();

		this.hTwInf[tw_nm] = {tw: twLast, resume: false};

		return false;
	}

}
