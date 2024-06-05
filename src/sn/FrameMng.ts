/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, IEvtMng, argChk_Boolean, argChk_Num, getExt} from './CmnLib';
import {CmnTween} from './CmnTween';
import {IHTag, HArg} from './Grammar';
import {IVariable, IMain, IGetFrm} from './CmnInterface';
import {SysBase} from './SysBase';
import {Config} from './Config';
import {SEARCH_PATH_ARG_EXT} from './ConfigBase';
import {Main} from './Main';
import {disableEvent, enableEvent} from './ReadState';

import {Application, Loader, LoaderResource} from 'pixi.js';


export class FrameMng implements IGetFrm {
	static	#cfg	: Config;
	static	#sys	: SysBase;
	static	#main	: IMain;
	static	init(cfg: Config, sys: SysBase, main: IMain): void {
		FrameMng.#cfg = cfg;
		FrameMng.#sys = sys;
		FrameMng.#main = main;
	}

	constructor(hTag: IHTag, private readonly appPixi: Application, private readonly val: IVariable) {
		//	HTMLフレーム
		hTag.add_frame		= o=> this.#add_frame(o);	// フレーム追加
		hTag.let_frame		= o=> this.#let_frame(o);	// フレーム変数を取得
		hTag.set_frame		= o=> this.#set_frame(o);	// フレーム変数に設定
		hTag.frame			= o=> this.#frame(o);		// フレームに設定
		hTag.tsy_frame		= o=> this.#tsy_frame(o);	// フレームをトゥイーン開始
	}

	#evtMng	: IEvtMng;
	setEvtMng(evtMng: IEvtMng) {this.#evtMng = evtMng}

	#hIfrm	: {[id: string]: HTMLIFrameElement} = Object.create(null);
	destroy() {
		for (const f of Object.values(this.#hIfrm)) f.parentElement!.removeChild(f);
		this.#hIfrm = Object.create(null);
	}

	hideAllFrame() {	// （表示・非表示を保存しつつ）すべて非表示に
		for (const [id, {style}] of Object.entries(this.#hIfrm)) {
			this.#hIfrmVisibleBk[id] = style.display !== 'none';
			style.display = 'none';
		}
	}
	#hIfrmVisibleBk: {[id: string]: boolean} = Object.create(null);
	restoreAllFrame() {	// 保存していた表示・非表示を回復
		for (const [id, v] of Object.entries(this.#hIfrmVisibleBk)) {
			this.#hIfrm[id].style.display = v ?'inline' :'none';
		}
		this.#hIfrmVisibleBk = Object.create(null);
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
		// 【sandbox="allow-scripts allow-same-origin"】は必要なのに警告が出るので削除
		Main.cvs.insertAdjacentHTML('beforebegin', `<iframe id="${id}" style="opacity: ${a
		}; position: absolute; left:${FrameMng.#sys.ofsLeft4elm +rct.x *FrameMng.#sys.cvsScale
		}px; top: ${FrameMng.#sys.ofsTop4elm +rct.y *FrameMng.#sys.cvsScale}px; z-index: 1; ${b_color
		} border: 0px; overflow: hidden; display: ${v ?'inline' :'none'
		}; transform: scale(${sx}, ${sy}) rotate(${r}deg);" width="${rct.width *FrameMng.#sys.cvsScale}" height="${rct.height *FrameMng.#sys.cvsScale}"></iframe>`);

		disableEvent();
		const url = FrameMng.#cfg.searchPath(src, SEARCH_PATH_ARG_EXT.HTML);
		const ld = (new Loader)
		.add({name: src, url, xhrType: LoaderResource.XHR_RESPONSE_TYPE.TEXT});
		if (FrameMng.#sys.crypto) ld.use(async (res, next)=> {
			try {
				res.data = await FrameMng.#sys.dec(res.extension, res.data);
			} catch (e) {
				FrameMng.#main.errScript(`[add_frame]Html ロード失敗です src:${res.name} ${e}`, false);
			}
			next();
		});
		ld.load((_ldr, hRes)=> {
			const f = document.getElementById(id) as HTMLIFrameElement;
			this.#hIfrm[id] = f;
			this.#hDisabled[id] = false;

			const path_parent = url.slice(0, url.lastIndexOf('/') +1);
			const path_pa_pa = path_parent.slice(0, url.lastIndexOf('/') +1);
			f.srcdoc = String(hRes[src]?.data)	// .src はふりーむで問題発生
			.replace('sn_repRes();', '')	// これはいずれやめる
			.replaceAll(
				/\s(?:src|href)=(["'])(\S+?)\1/g,	// 【\s】が大事、data-src弾く
				(m, br, v)=> v.slice(0, 3) === '../'
				? m.replace('../', path_pa_pa)
				: m.replace('./', '')	// 「./」は無視
					.replace(br, br + path_parent)
			);
			
			if (f.srcdoc.indexOf('true/*WEBP*/;') >= 0) f.srcdoc = f.srcdoc.replaceAll(
				/data-src="(.+?\.)(?:jpe?g|png)/g,
				(_, p1)=> `data-src="${p1}webp`
			);

			f.onload = ()=> {	// 一度変数に入れてここで設定するのはFirefox対応。ifrm.onloadが二度呼ばれる！
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

				const win = f.contentWindow!;
				this.#evtMng.resvFlameEvent(win);
				// sn_repRes()をコール。引数は画像ロード処理差し替えメソッド
				((win as any).sn_repRes)?.((i: HTMLImageElement)=> FrameMng.#loadPic2Img(i.dataset.src ?? '', i));

				enableEvent();
			};
		});

		return true;
	}
	#hDisabled	: {[id: string]: boolean}	= {};
	getFrmDisabled(id: string): boolean {return this.#hDisabled[id]}
	#rect(hArg: HArg): DOMRect {
		const a = {...hArg};
		const re = FrameMng.#sys.resolution;
		return new DOMRect(
			argChk_Num(a, 'x', 0) *re,
			argChk_Num(a, 'y', 0) *re,
			argChk_Num(a, 'width', CmnLib.stageW) *re,
			argChk_Num(a, 'height', CmnLib.stageH) *re,
		);
	}

	static	#REG_REP_PRM = /\?([^?]+)$/;	// https://regex101.com/r/ZUnoFq/1
	static	#loadPic2Img(src: string, img: HTMLImageElement, onload?: (img2: HTMLImageElement)=> void) {
		const oUrl = this.#hEncImgOUrl[src];
		if (oUrl) {img.src = oUrl; return}

		const aImg = this.#hAEncImg[src];
		if (aImg) {aImg.push(img); return}
		this.#hAEncImg[src] = [img];

		const srcNoPrm = src.replace(FrameMng.#REG_REP_PRM, '');
		const prmSrc = (src === srcNoPrm) ?'' :src.slice(srcNoPrm.length);
		const url2 = FrameMng.#cfg.searchPath(srcNoPrm, SEARCH_PATH_ARG_EXT.SP_GSM);
		const ld2 = (new Loader)
		.add({name: src, url: url2, xhrType: LoaderResource.XHR_RESPONSE_TYPE.BUFFER,});
		if (FrameMng.#sys.crypto && getExt(url2) === 'bin') ld2.use(async (res, next)=> {
			try {
				const r = await FrameMng.#sys.decAB(res.data);
				if (res.extension !== 'bin') {next(); return}

				res.data = r;
				if (r instanceof HTMLImageElement) res.type = LoaderResource.TYPE.IMAGE;
			} catch (e) {
				FrameMng.#main.errScript(`GrpLayer loadPic ロード失敗です fn:${res.name} ${e}`, false)
			}
			next();
		});
		ld2.load((_ldr, hRes)=> {
			for (const [s2, {data: {src}}] of Object.entries(hRes)) {
				const u2 = this.#hEncImgOUrl[s2]
				= src + (src.slice(0, 5) === 'blob:' ?'' :prmSrc);
				for (const i of this.#hAEncImg[s2]) {
					i.src = u2;
					if (onload) i.onload = ()=> onload(i);
				}
				delete this.#hAEncImg[s2];
			//	URL.revokeObjectURL(u2);// 画面遷移で毎回再生成するので
			}
		});
	}
	static	#hAEncImg		: {[src: string]: HTMLImageElement[]}	= {};
	static	#hEncImgOUrl	: {[src: string]: string}				= {};


	cvsResize() {	// NOTE: フォントサイズはどう変更すべきか
		for (const [id, f] of Object.entries(this.#hIfrm)) {
			const vn = 'const.sn.frm.'+ id;
			const x = Number(this.val.getVal(vn +'.x'));
			const y = Number(this.val.getVal(vn +'.y'));
			const w = Number(this.val.getVal(vn +'.width'));
			const h = Number(this.val.getVal(vn +'.height'));
			f.style.left = `${FrameMng.#sys.ofsLeft4elm +x *FrameMng.#sys.cvsScale}px`;
			f.style.top  = `${FrameMng.#sys.ofsTop4elm  +y *FrameMng.#sys.cvsScale}px`;
			f.width = String(w *FrameMng.#sys.cvsScale);
			f.height = String(h *FrameMng.#sys.cvsScale);
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
			s.left = `${FrameMng.#sys.ofsLeft4elm +rct.x *FrameMng.#sys.cvsScale}px`;
			s.top  = `${FrameMng.#sys.ofsTop4elm  +rct.y *FrameMng.#sys.cvsScale}px`;
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
			f.width = String(rct.width *FrameMng.#sys.cvsScale);
			this.val.setVal_Nochk('tmp', vn +'.width', rct.width);
		}
		if ('height' in hArg) {
			f.height = String(rct.height *FrameMng.#sys.cvsScale);
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
			const b = f.contentDocument!.body;
			[
				...b.getElementsByTagName('input'),
				...b.getElementsByTagName('select'),
			].forEach(e=> e.disabled = d);
		}

		return false;
	}

	// フレームをトゥイーン開始
	#tsy_frame(hArg: HArg) {
		const {id, alpha, x, y, scale_x, scale_y, rotate, width, height} = hArg;
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
		const hArg2 = CmnTween.cnvTweenArg(hArg, hNow);

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
				f.style.left = FrameMng.#sys.ofsLeft4elm +hNow.x *FrameMng.#sys.cvsScale +'px';
				f.style.top  = FrameMng.#sys.ofsTop4elm  +hNow.y *FrameMng.#sys.cvsScale +'px';
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
				f.width = hNow.w *FrameMng.#sys.cvsScale +'px';
				this.val.setVal_Nochk('tmp', vn +'.width', hNow.w);
			};
		}
		let fncH = ()=> {};
		if (height) {
			hTo.h = rct.height;
			fncH = ()=> {
				f.height = hNow.h *FrameMng.#sys.cvsScale +'px';
				this.val.setVal_Nochk('tmp', vn +'.height', hNow.h);
			};
		}

		this.appPixi.stage.interactive = false;
		CmnTween.tween(`frm\n${id}`, hArg, hNow, CmnTween.cnvTweenArg(hArg, hNow), ()=> {
			fncA(); fncXYSR(); fncW(); fncH();
		}, ()=> this.appPixi.stage.interactive = true, ()=> {});

		return false;
	}

}
