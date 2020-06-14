/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, IEvtMng, cnvTweenArg, argChk_Boolean, argChk_Num} from './CmnLib';
import {ITwInf, CmnTween} from './CmnTween';
import {IHTag, IVariable, IMain, HArg} from './CmnInterface';
import {Application} from 'pixi.js';
import {SysBase} from './SysBase';
import {Config} from './Config';

const Tween = require('@tweenjs/tween.js').default;
import {Loader, LoaderResource} from 'pixi.js';

export class FrameMng {
	constructor(private readonly cfg: Config, hTag: IHTag, private readonly appPixi: Application, private readonly val: IVariable, private readonly main: IMain, private readonly sys: SysBase, private readonly hTwInf: {[name: string]: ITwInf}) {
		//	HTMLフレーム
		hTag.add_frame		= o=> this.add_frame(o);	// フレーム追加
		hTag.let_frame		= o=> this.let_frame(o);	// フレーム変数を取得
		hTag.set_frame		= o=> this.set_frame(o);	// フレーム変数に設定
		hTag.frame			= o=> this.frame(o);		// フレームに設定
		hTag.tsy_frame		= o=> this.tsy_frame(o);	// フレームをトゥイーン開始
	}

	private evtMng	: IEvtMng;
	setEvtMng(evtMng: IEvtMng) {this.evtMng = evtMng;}

	private	hIfrm	: {[name: string]: HTMLIFrameElement} = Object.create(null);
	destroy() {
		for (const n in this.hIfrm) {
			const f = this.hIfrm[n];
			f.parentElement!.removeChild(f);
		}
		this.hIfrm = Object.create(null);
	}

	//	HTMLフレーム
	// フレーム追加
	private add_frame(hArg: HArg) {
		const id = hArg.id;
		if (! id) throw 'idは必須です';
		const src = hArg.src;
		if (! src) throw 'srcは必須です';
		const frmnm = `const.sn.frm.${id}`;
		if (this.val.getVal(`tmp:${frmnm}`)) throw `frame【${id}】はすでにあります`;

		const a = argChk_Num(hArg, 'alpha', 1);
		const sx = argChk_Num(hArg, 'scale_x', 1);
		const sy = argChk_Num(hArg, 'scale_y', 1);
		const r = argChk_Num(hArg, 'rotate', 0);
		const v = argChk_Boolean(hArg, 'visible', true);
		const b_color = hArg.b_color ?` background-color: ${hArg.b_color};` :'';
		const rct = this.rect(hArg);
		const scale = this.sys.reso4frame *CmnLib.cvsScale;
		this.appPixi.view.insertAdjacentHTML('beforebegin', `<iframe id="${id
		}" sandbox="allow-scripts allow-same-origin" style="z-index: 1; opacity: ${a}; position: absolute; left:${
			this.sys.ofsLeft4frm +rct.x *scale
		}px; top: ${
			this.sys.ofsTop4frm  +rct.y *scale
		}px; border: 0px; overflow: hidden; display: ${v ?'inline' :'none'
		};${b_color}" width="${rct.width *scale}" height="${rct.height *scale
		}" transform: scale(${sx}, ${sy}) rotate(${r}deg);></iframe>`);

		const ifrm = document.getElementById(id) as HTMLIFrameElement;
		this.hIfrm[id] = ifrm;
		const win: Window = ifrm.contentWindow!;
		ifrm.onload = ()=> {
			// 組み込み変数
			this.val.setVal_Nochk('tmp', frmnm, true);
			this.val.setVal_Nochk('tmp', frmnm +'.alpha', a);
			this.val.setVal_Nochk('tmp', frmnm +'.x', rct.x);
			this.val.setVal_Nochk('tmp', frmnm +'.y', rct.y);
			this.val.setVal_Nochk('tmp', frmnm +'.scale_x', sx);
			this.val.setVal_Nochk('tmp', frmnm +'.scale_y', sy);
			this.val.setVal_Nochk('tmp', frmnm +'.rotate', r);
			this.val.setVal_Nochk('tmp', frmnm +'.width', rct.width);
			this.val.setVal_Nochk('tmp', frmnm +'.height', rct.height);
			this.val.setVal_Nochk('tmp', frmnm +'.visible', v);

			this.evtMng.resvFlameEvent(win);

			const repRes: Function = (win as any).sn_repRes;
			if (this.sys.crypto && repRes) repRes((i: HTMLImageElement)=> {
				const src = (i.dataset.src ?? '').replace(/(.+\/|\..+)/g, '');
				const oUrl = this.hEncImgOUrl[src];
				if (oUrl) {i.src = oUrl; return}

				const aImg = this.hAEncImg[src];
				if (aImg) {aImg.push(i); return}
				this.hAEncImg[src] = [i];

				const url = this.cfg.searchPath(src, Config.EXT_SPRITE);
				(new Loader()).add(src, url, {xhrType: 'arraybuffer'})
				.pre((res: LoaderResource, next: Function)=> res.load(()=> {
					this.sys.pre(res.extension, res.data)
					.then(r=> {
						if (res.extension !== 'bin') {next(); return;}
						res.data = r;
						if (res.data instanceof HTMLImageElement) {
							res.type = LoaderResource.TYPE.IMAGE;
							this.hEncImgOUrl[src] = res.data.src;
						}
						next();
					})
					.catch(e=> this.main.errScript(`Graphic ロード失敗です fn:${res.name} ${e}`, false));
				}))
				.load((_ldr: any, hRes: any)=> {
					for (const src in hRes) {
						const oUrl = hRes[src].data.src;
						this.hAEncImg[src].map(v=> v.src = oUrl);
						delete this.hAEncImg[src];
					//	URL.revokeObjectURL(oUrl);	// 画面遷移で毎回再生成するので
					}
				});
			});

			this.main.resume();
		};

		const url = this.cfg.searchPath(src, Config.EXT_HTML);
		if (! this.sys.crypto) {ifrm.src = url; return true}

		(new Loader())
		.add(src, url, {xhrType: LoaderResource.XHR_RESPONSE_TYPE.TEXT})
		.pre((res: LoaderResource, next: Function)=> res.load(()=> {
			this.sys.pre(res.extension, res.data)
			.then(r=> {res.data = r; next();})
			.catch(e=> this.main.errScript(`[add_frame]Html ロード失敗です src:${res.name} ${e}`, false));
		}))
		.load((_ldr, hRes)=> ifrm.srcdoc = String(hRes[src]?.data)
		.replace('sn_repRes();', '')
		.replace(
			/\s(?:src|href)=(["'])(\S+)\1/g,
			(v, p1, p2)=> (p2.slice(0, 3) === '../')
				? v.replace('../', this.sys.cur)
				: v.replace(p1, p1 + url.slice(0, url.lastIndexOf('/') +1))
		));

		return true;
	}
	private	hAEncImg	: {[name: string]: HTMLImageElement[]}	= Object.create(null);
	private	hEncImgOUrl	: {[name: string]: string}		= Object.create(null);
	private rect(hArg: HArg): DOMRect {
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
		const scale = this.sys.reso4frame *CmnLib.cvsScale;
		for (const n in this.hIfrm) {
			const f = this.hIfrm[n];
			const x = Number(this.val.getVal(`const.sn.frm.${n}.x`));
			const y = Number(this.val.getVal(`const.sn.frm.${n}.y`));
			const w = Number(this.val.getVal(`const.sn.frm.${n}.width`));
			const h = Number(this.val.getVal(`const.sn.frm.${n}.height`));
			f.style.left = this.sys.ofsLeft4frm +x *scale +'px';
			f.style.top  = this.sys.ofsTop4frm  +y *scale +'px';
			f.width = String(w *scale);
			f.height = String(h *scale);
		}
	}

	// フレーム変数を取得
	private let_frame(hArg: HArg) {
		const id = hArg.id;
		if (! id) throw 'idは必須です';
		const ifrm = document.getElementById(id) as HTMLIFrameElement;
		if (! ifrm) throw `id【${id}】はフレームではありません`;
		const frmnm = `const.sn.frm.${id}`;
		if (! this.val.getVal(`tmp:${frmnm}`)) throw `frame【${id}】が読み込まれていません`;
		const var_name = hArg.var_name;
		if (! var_name) throw 'var_nameは必須です';

		const win: Window = ifrm.contentWindow!;
		if (! win.hasOwnProperty(var_name)) throw `frame【${id}】に変数/関数【${var_name}】がありません。変数は var付きにして下さい`;

		const v = (win as any)[var_name];
		// var変数 / 関数実行の戻り値 -> 組み込み変数
		this.val.setVal_Nochk(
			'tmp',
			frmnm +'.'+ var_name,
			argChk_Boolean(hArg, 'function', false) ?v() :v
		);

		return false;
	}

	// フレーム変数に設定
	private set_frame(hArg: HArg) {
		const id = hArg.id;
		if (! id) throw 'idは必須です';
		const ifrm = document.getElementById(id) as HTMLIFrameElement;
		if (! ifrm) throw `id【${id}】はフレームではありません`;
		const frmnm = `const.sn.frm.${id}`;
		if (! this.val.getVal(`tmp:${frmnm}`)) throw `frame【${id}】が読み込まれていません`;
		const var_name = hArg.var_name;
		if (! var_name) throw 'var_nameは必須です';
		const text = hArg.text;
		if (! text) throw 'textは必須です';

		// -> 組み込み変数
		this.val.setVal_Nochk('tmp', frmnm +'.'+ var_name, text);

		// -> var変数に設定
		const win: any = ifrm.contentWindow!;
		win[var_name] = text;

		return false;
	}

	// フレームに設定
	private frame(hArg: HArg) {
		const id = hArg.id;
		if (! id) throw 'idは必須です';
		const ifrm = document.getElementById(id) as HTMLIFrameElement;
		if (! ifrm) throw `id【${id}】はフレームではありません`;
		const frmnm = `const.sn.frm.${id}`;
		if (! this.val.getVal(`tmp:${frmnm}`)) throw `frame【${id}】が読み込まれていません`;

		if ('alpha' in hArg) {
			const a = String(hArg.alpha);
			ifrm.style.opacity = a;
			this.val.setVal_Nochk('tmp', frmnm +'.alpha', a);
		}
		const rct = this.rect(hArg);
		const scale = this.sys.reso4frame *CmnLib.cvsScale;
		if ('x' in hArg || 'y' in hArg) {
			ifrm.style.left = this.sys.ofsLeft4frm +rct.x *scale +'px';
			ifrm.style.top  = this.sys.ofsTop4frm  +rct.y *scale +'px';
			this.val.setVal_Nochk('tmp', frmnm +'.x', rct.x);
			this.val.setVal_Nochk('tmp', frmnm +'.y', rct.y);
		}
		if ('scale_x' in hArg || 'scale_y' in hArg || 'rotate' in hArg) {
			const sx = argChk_Num(hArg, 'scale_x', 1);
			const sy = argChk_Num(hArg, 'scale_y', 1);
			const r = argChk_Num(hArg, 'rotate', 0);
			ifrm.style.transform = `scale(${sx}, ${sy}) rotate(${r}deg)`;
			this.val.setVal_Nochk('tmp', frmnm +'.scale_x', sx);
			this.val.setVal_Nochk('tmp', frmnm +'.scale_y', sy);
			this.val.setVal_Nochk('tmp', frmnm +'.rotate', r);
		}
		if ('width' in hArg) {
			ifrm.width = String(rct.width *scale);
			this.val.setVal_Nochk('tmp', frmnm +'.width', rct.width);
		}
		if ('height' in hArg) {
			ifrm.height = String(rct.height *scale);
			this.val.setVal_Nochk('tmp', frmnm +'.height', rct.height);
		}
		if ('visible' in hArg) {
			const v = argChk_Boolean(hArg, 'visible', true);
			ifrm.style.display = v ?'inline' :'none';
			this.val.setVal_Nochk('tmp', frmnm +'.visible', v);
		}
		if ('b_color' in hArg) {
			ifrm.style.backgroundColor = hArg.b_color!;
		}

		return false;
	}

	// フレームをトゥイーン開始
	private tsy_frame(hArg: HArg) {
		const id = hArg.id;
		if (! id) throw 'idは必須です';
		const ifrm = document.getElementById(id) as HTMLIFrameElement;
		if (! ifrm) throw `id【${id}】はフレームではありません`;
		const frmnm = `const.sn.frm.${id}`;
		if (! this.val.getVal(`tmp:${frmnm}`, 0)) throw `frame【${id}】が読み込まれていません`;

		const hNow: any = {};
		if ('alpha' in hArg) hNow.a = ifrm.style.opacity;
		if ('x' in hArg || 'y' in hArg
		|| 'scale_x' in hArg || 'scale_y' in hArg || 'rotate' in hArg) {
			hNow.x = Number(this.val.getVal(`tmp:${frmnm}.x`));
			hNow.y = Number(this.val.getVal(`tmp:${frmnm}.y`));
			hNow.sx = Number(this.val.getVal(`tmp:${frmnm}.scale_x`));
			hNow.sy = Number(this.val.getVal(`tmp:${frmnm}.scale_y`));
			hNow.r = Number(this.val.getVal(`tmp:${frmnm}.rotate`));
		}
		if ('width' in hArg) hNow.w = this.val.getVal(`tmp:${frmnm}.width`);
		if ('height' in hArg) hNow.h = this.val.getVal(`tmp:${frmnm}.height`);
		const hArg2 = cnvTweenArg(hArg, hNow);

		const hTo: any = {};
		const repeat = argChk_Num(hArg, 'repeat', 1);
		let fncA = ()=> {};
		if ('alpha' in hArg) {
			hTo.a = argChk_Num(hArg2, 'alpha', 0);
			fncA = ()=> {
				ifrm.style.opacity = hNow.a;
				this.val.setVal_Nochk('tmp', 'alpha', hNow.a);
			};
		}
		let fncXYSR = ()=> {};
		const rct = this.rect(hArg2);
		const scale = this.sys.reso4frame *CmnLib.cvsScale;
		if ('x' in hArg || 'y' in hArg
		|| 'scale_x' in hArg || 'scale_y' in hArg || 'rotate' in hArg) {
			hTo.x = rct.x;
			hTo.y = rct.y;
			hTo.sx = argChk_Num(hArg2, 'scale_x', 1);
			hTo.sy = argChk_Num(hArg2, 'scale_y', 1);
			hTo.r = argChk_Num(hArg2, 'rotate', 0);
			fncXYSR = ()=> {
				ifrm.style.left = this.sys.ofsLeft4frm +hNow.x *scale +'px';
				ifrm.style.top  = this.sys.ofsTop4frm  +hNow.y *scale +'px';
				ifrm.style.transform = `scale(${hNow.sx}, ${hNow.sy}) rotate(${hNow.r}deg)`;
				this.val.setVal_Nochk('tmp', frmnm +'.x', hNow.x);
				this.val.setVal_Nochk('tmp', frmnm +'.y', hNow.y);
				this.val.setVal_Nochk('tmp', frmnm +'.scale_x', hNow.sx);
				this.val.setVal_Nochk('tmp', frmnm +'.scale_y', hNow.sy);
				this.val.setVal_Nochk('tmp', frmnm +'.rotate', hNow.r);
			};
		}
		let fncW = ()=> {};
		if ('width' in hArg) {
			hTo.w = rct.width;
			fncW = ()=> {
				ifrm.width = hNow.w *scale +'px';
				this.val.setVal_Nochk('tmp', frmnm +'.width', hNow.w);
			};
		}
		let fncH = ()=> {};
		if ('height' in hArg) {
			hTo.h = rct.height;
			fncH = ()=> {
				ifrm.height = hNow.h *scale +'px';
				this.val.setVal_Nochk('tmp', frmnm +'.height', hNow.h);
			};
		}

		this.appPixi.stage.interactive = false;
		const tw_nm = `frm\n${hArg.id}`;
		const tw = new Tween.Tween(hNow)
		.to(hTo, argChk_Num(hArg, 'time', NaN)
			* (Boolean(this.val.getVal('tmp:sn.skip.enabled')) ?0 :1))
		.delay(argChk_Num(hArg, 'delay', 0))
		.easing(CmnTween.ease(hArg.ease))
		.repeat(repeat === 0 ?Infinity :(repeat -1))	// 一度リピート→計二回なので
		.yoyo(argChk_Boolean(hArg, 'yoyo', false))
		.onUpdate(()=> {fncA(); fncXYSR(); fncW(); fncH();})
		.onComplete(()=> {
			this.appPixi.stage.interactive = true;
			const twInf = this.hTwInf[tw_nm];
			if (! twInf) return;

			delete this.hTwInf[tw_nm];
			this.evtMng.popLocalEvts();	// [wait_tsy]したのにキャンセルされなかった場合向け
			if (twInf.resume) this.main.resume();
			if (twInf.onComplete) twInf.onComplete();
		});

		if ('chain' in hArg) {
			const twFrom = this.hTwInf[hArg.chain ?? ''];
			if (! twFrom || ! twFrom.tw) throw `${hArg.chain}は存在しない・または終了したトゥイーンです`;
			twFrom.onComplete = ()=> {};
			twFrom.tw.chain(tw);
		}
		else tw.start();

		this.hTwInf[tw_nm] = {tw: tw, resume: false, onComplete: ()=> {}}

		return false;
	}

}
