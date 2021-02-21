/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2021-2021 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {HArg, IPropParser} from './CmnInterface';
import {uint, int, CmnLib, argChk_Boolean, argChk_Num, getFn, addStyle} from './CmnLib';
import {SysBase} from './SysBase';
import {ScriptIterator} from './ScriptIterator';
import {HPage} from './LayerMng';
import {REG_TAG} from './Grammar';
import {AnalyzeTagArg, HPRM} from './AnalyzeTagArg';
import {DebugMng} from './DebugMng';
import {TxtStage} from './TxtStage';
import {Button} from './Button';
import {GrpLayer} from './GrpLayer';
import {Config} from './Config';

import {Application, Rectangle, Text, Sprite, Point} from 'pixi.js';
import Moveable from 'moveable';

export class DesignCast {
	private		static	divDesignRoot: HTMLDivElement;
	private		static	sys			: SysBase;
	private		static	scrItr		: ScriptIterator;
	protected	static	prpPrs		: IPropParser;
	private		static	alzTagArg	: AnalyzeTagArg;
	private		static	cfg			: Config;
	private		static	hPages		: HPage;
	static	init(appPixi: Application, sys: SysBase, scrItr: ScriptIterator, prpPrs: IPropParser, alzTagArg: AnalyzeTagArg, cfg: Config, hPages: HPage) {
		appPixi.view.insertAdjacentHTML('beforebegin', `<div id="${DesignCast.ID_DESIGNMODE}" style="width: ${CmnLib.stageW *CmnLib.cvsScale}px; height: ${CmnLib.stageH *CmnLib.cvsScale}px; background: rgba(0,0,0,0); position: absolute; touch-action: none; user-select: none; display: none;"></div>`);
		DesignCast.divDesignRoot = document.getElementById(DesignCast.ID_DESIGNMODE) as HTMLDivElement;

		DesignCast.sys = sys;
		DesignCast.scrItr = scrItr;
		DesignCast.prpPrs = prpPrs;
		DesignCast.alzTagArg = alzTagArg;
		DesignCast.cfg = cfg;
		DesignCast.hPages = hPages;

		addStyle(`
.sn_design_cast {
	position: absolute; touch-action: none; user-select: none;
	opacity: 0.6; border-radius: 8px;
}

.sn_design_cast.drag_border {
	line-height: 1.8;
	border: dashed 5px #333;
}
`);
		// :before	クロスカーソル.svg
		// :after	トリミングアイコン.svg
	}
	static	cvsResizeDesign() {
		const s = DesignCast.divDesignRoot.style;
		s.width = `${CmnLib.stageW *CmnLib.cvsScale}px`;
		s.height= `${CmnLib.stageH *CmnLib.cvsScale}px`;
	}


	constructor(readonly bg_col: string, readonly isLay = false) {}

	gethArg(): HArg {return this.hArg}
	protected hArg	: HArg	= {};
	protected id_tag	= '';
	sethArg(hArg: HArg): void {
		if (! this.id_tag) this.id_tag = hArg[':id_tag'] ?? '';
		this.hArg = hArg;

		const id_dc = hArg[':id_dc'] ?? this.id_tag;
		DesignCast.id2gdc[id_dc] = this;

		const layer = this.hArg.layer ?? '';
		this.fncLay = (! this.parent && ! this.child && layer)
		? ()=> {
			const f = DesignCast.hPages[layer].fore;
			this.lx = f.x *CmnLib.cvsScale;
			this.ly = f.y *CmnLib.cvsScale;
		}
		: ()=> {};
	}

	getRect() {return Rectangle.EMPTY}
	getPosArg(_x: number, _y: number): {[name: string]: any} {return {}};
	getSizeArg(_x: number, _y: number): {[name: string]: any} {return {}};
	setPos(_x: number, _y: number) {}
	setSize(_w: number, _h: number) {}
	setOther(_hPrm: HPRM) {}
	child?	: DesignCast;
	parent?	: DesignCast;

	private	static	readonly	ID_DESIGNMODE = 'DesignMode';
	private	static	idDesignCast	= 0;
	private	static	id2gdc: {[idDc: string]: DesignCast}	= {};
	static	enterMode() {
		DesignCast.leaveMode();
		DesignCast.divDesignRoot.style.display = 'inline';

		DesignCast.idDesignCast = 0;
		DesignCast.id2gdc = {};
	}
	private	static	aDC: DesignCast[] = [];
	static	leaveMode() {
		DesignCast.divDesignRoot.textContent = '';
		DesignCast.divDesignRoot.style.display = 'none';
		DesignCast.aDC.forEach(v=> {
			v.d = null;
			v.mov?.destroy();
			v.mov = null;
		});
		DesignCast.aDC = [];
	}


	cvsResize() {this.cvsResizeBase(); this.mov?.updateRect();}
	private	cvsResizeBase() {
		this.fncLay();
		if (this.d) Object.assign(this.d.style, {
			left: `${this.lx +CmnLib.cvsScale *this.rect.x}px`,
			top: `${this.ly +CmnLib.cvsScale *this.rect.y}px`,
			width: `${CmnLib.cvsScale *this.rect.width}px`,
			height: `${CmnLib.cvsScale *this.rect.height}px`,
			transformOrigin: `${this.pivot.x}px ${this.pivot.y}px`,
			transform: `scale(${this.scale.x}, ${this.scale.y}) rotate(${this.rotation}deg)`,
		});
	}
	private fncLay = ()=> {};

	protected	rect	= Rectangle.EMPTY;
	protected	pivot	= new Point(0, 0);
	protected	scale	= new Point(1, 1);
	protected	rotation= 0;
	protected	mov		: Moveable | null		= null;
	protected	d		: HTMLDivElement | null = null;
	private lx = 0;
	private ly = 0;
	dspDesignCast() {
		const id_dc = this.hArg[':id_dc'] ?? this.id_tag;
		DesignCast.id2gdc[id_dc] = this;

		this.rect = this.getRect();

//console.log(`fn:DesignCast.ts dspDesignCast() [${o.タグ名}] id_tag(${id_tag}) id_dc:(${id_dc}) fn:${o[':path']} ln:${o[':ln']} col_s:${o[':col_s']} col_e:${o[':col_e']} idx_tkn:${o[':idx_tkn']} x:${rect.x} y:${rect.y} w:${rect.width} h:${rect.height} o:%o`, o);		// token:【${o[':token']}】

		const d = this.d = document.createElement('div');
		d.id = DesignCast.ID_DESIGNMODE +'_'+ ++DesignCast.idDesignCast;
		d.classList.add('sn_design_cast');
		d.dataset.id_dc = id_dc;
		d.style.backgroundColor = `${this.bg_col}`;
		this.cvsResizeBase();
		(this.parent
			? document.querySelector(
				`[data-id_dc="${this.parent.id_tag}"]`// 親なので
				) ?? DesignCast.divDesignRoot
			: DesignCast.divDesignRoot
		).appendChild(d);

		let oldX_Plus_W = 0;	// 整数化時誤差対応
		let oldY_Plus_H = 0;
		let isResizeLeft = false;
		let isResizetop = false;
		let isResizeWidth = false;
		let isResizeHeight = false;
		const mov = this.mov = new Moveable(document.body, {
			target	: d,
			// If the container is null, the position is fixed. (default: parentElement(document.body))
//			container: document.body,
			draggable	: true,
			resizable	: true,
			scalable	: true,
//			rotatable	: true,
/*
			warpable: true,
			// Enabling pinchable lets you use events that
			// can be used in draggable, resizable, scalable, and rotateable.
			pinchable: true, // ['resizable', 'scalable', 'rotatable']
*/			// Resize, Scale Events at edges.
/*			edge: false,
			throttleDrag: 0,
			throttleResize: 0,
			throttleScale: 0,
			throttleRotate: 0,
*/
		})
		// draggable
		.on('drag', ({delta})=> {
			this.rect.x += delta[0];
			this.rect.y += delta[1];
			this.cvsResizeBase();
		/*
			d.style.left = `${left}px`;	// これだと、replaceTokenでガクッとなる
			d.style.top = `${top}px`;
		*/
		}).on('dragEnd', ()=> {
		/*
			const r = mov.getRect();	// これだと、replaceTokenでガクッとなる
			fncLay();
			this.rect.x = r.left /CmnLib.cvsScale -lx;
			this.rect.y = r.top /CmnLib.cvsScale  -ly;
		*/
			const ix = int(this.rect.x), iy = int(this.rect.y);
			this.setPos(ix, iy);
			DesignCast.sys.send2Dbg('_changeCast', {
				...this.getPosArg(ix, iy),
				':id_tag': this.id_tag,
			});
		})
		// resizable
		.on('resizeStart', ()=> {
			const ix = int(this.rect.x), iy = int(this.rect.y);
			const iw = uint(this.rect.width), ih = uint(this.rect.height);
			isResizeLeft = false;
			isResizetop = false;
			oldX_Plus_W = ix + iw;
			oldY_Plus_H = iy + ih;
			isResizeWidth = false;	// wをノータッチ時にhがずれる対策
			isResizeHeight = false;	// hをノータッチ時にwがずれる対策
		})
		.on('resize', ({width, height, direction, dist})=> {
			if (direction[0] < 0) {
				isResizeLeft = true;
				d.style.left = `${this.lx +CmnLib.cvsScale *this.rect.x -dist[0]}px`;
				isResizeWidth = true;
			}
			else if (direction[0] > 0) isResizeWidth = true;

			if (direction[1] < 0) {
				isResizetop = true;
				d.style.top = `${this.ly +CmnLib.cvsScale *this.rect.y -dist[1]}px`;
				isResizeHeight = true;
			}
			else if (direction[1] > 0) isResizeHeight = true;

			d.style.width = `${width}px`;
			d.style.height = `${height}px`;
		})
		.on('resizeEnd', ()=> {
			const r = mov.getRect()
			this.fncLay();
			if (isResizeWidth) this.rect.width  = r.width  /CmnLib.cvsScale;
			if (isResizeHeight) this.rect.height = r.height /CmnLib.cvsScale;
			const iw = uint(this.rect.width), ih = uint(this.rect.height);
			this.setSize(iw, ih);

			let ix = 0, iy = 0;
			if (isResizeLeft) {	// 整数化処理で誤差が大なのでこの対応
				ix = oldX_Plus_W -iw;	// 右端基準で新横幅戻る
				this.rect.x = ix;
			}
			else ix = int(this.rect.x);	// 変化なしにて初期値
			if (isResizetop) {
				iy = oldY_Plus_H -ih;	// 下端基準で新縦幅上がる
				this.rect.y = iy;
			}
			else iy = int(this.rect.y);	// 変化なしにて初期値
			this.setPos(ix, iy);

			DesignCast.sys.send2Dbg('_changeCast', {
				...this.getPosArg(ix, iy),
				...this.getSizeArg(iw, ih),
				':id_tag': this.id_tag,
			});
		})
		// rotatable
		.on('rotate', ({transform})=> {
			d.style.transform = transform;
		}).on('rotateEnd', ()=> {
			DesignCast.sys.send2Dbg('_changeCast', {
				rotate: 0,
//				rotate: this.mov	// TODO: 作りかけ
				':id_tag': this.id_tag,
			});
		});
		DesignCast.aDC.push(this);

//		.on('hold', ()=> DesignCast.sys.send2Dbg('_focusScript', o));
/*
		.on('tap', e=> {
console.log(`fn:DesignCast.ts line:162 tap btn:${e.button}`);
//				case 0:	this.fire('click', e);	break;
//				case 1:	this.fire('middleclick', e);	break;

			e.preventDefault()
		})
		.on('doubletap', e=> {
console.log(`fn:DesignCast.ts line:163 doubletap`);
			e.preventDefault()
		});
*/


		// ドラッグ＆ドロップ関連
		d.addEventListener('dragenter', ()=> d.classList.add('drag_border'));
		d.addEventListener('dragover', e=> {
			e.stopPropagation();
			e.preventDefault();
			if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
		});
		d.addEventListener('dragleave', ()=> d.classList.remove('drag_border'));
		d.addEventListener('drop', e=> {
			e.stopPropagation();
			e.preventDefault();
			d.classList.remove('drag_border');
			const dt = e.dataTransfer;
			if (! dt || dt.files.length === 0) return;	// VSCodeからは 0

			try {
				const f = dt.files[0];
				DesignCast.sys.send2Dbg('_dropFile', {
					':id_tag': this.id_tag,
					fn	: getFn(f.name),
					url	: DesignCast.scrItr.cnvPath4Dbg(
						DesignCast.cfg.searchPath(f.name, Config.EXT_SPRITE)
					),
				});
			} catch {}
		});
	}


	static replaceToken(o: any) {
		const id_tag = o[':id_tag'];
		const id_dc = id_tag;
		const gdc = DesignCast.id2gdc[id_dc];
		const d = <HTMLDivElement>document.querySelector(`div[data-id_dc='${id_dc}']`);
		if (! d || ! gdc) return;

		// 青四角移動変更をスクリプト反映したレス（Undoや手変更でも呼ばれる）
		// 内部スクリプト更新
		const token = o[':token'];
		DesignCast.scrItr.replace(o[':idx_tkn'], token);
//console.log(`fn:DesignCast.ts replaceToken id_tag(${id_tag}) ${gdc.type} o:%o`,o);

		// 実ボタン・青四角も移動（Undoや手入力変更時）
		const e = REG_TAG.exec(token);
		const g = e?.groups;
		if (! g) throw `_replaceToken タグ記述【${token}】異常です`;
		if (gdc.child) gdc.child.hArg[':token'] = gdc.hArg[':token'];

		DesignCast.alzTagArg.go(g.args);
		const p = DesignCast.alzTagArg.hPrm;
		if ('left' in p || 'top' in p || 'x' in p || 'y' in p) {
			const x = int(DesignCast.prpPrs.getValAmpersand(p.left?.val ?? p.x?.val ?? '0'));
			const y = int(DesignCast.prpPrs.getValAmpersand(p.top?.val  ?? p.y?.val ?? '0'));
			if (isNaN(x) || isNaN(y)) DebugMng.myTrace(`widthかheightが数値ではありません\n(fn:${o[':path'].slice(13)} ln:${o[':ln']})\n${token}`, 'F');

			gdc.rect.x = x;
			gdc.rect.y = y;
			gdc.setPos(x, y);
		}
		if ('width' in p || 'height' in p) {
			const w = int(DesignCast.prpPrs.getValAmpersand(p.width.val ??'0'));
			const h = int(DesignCast.prpPrs.getValAmpersand(p.height.val??'0'));
			if (isNaN(w) || isNaN(h)) DebugMng.myTrace(`widthかheightが数値ではありません\n(fn:${o[':path'].slice(13)} ln:${o[':ln']})\n${token}`, 'F');

			gdc.rect.width = w;
			gdc.rect.height = h;
			gdc.setSize(w, h);
		}

		gdc.pivot.set(
			Number(DesignCast.prpPrs.getValAmpersand(p.pivot_x?.val ?? '0')),
			Number(DesignCast.prpPrs.getValAmpersand(p.pivot_y?.val ?? '0')),
		);
		gdc.scale.set(
			Number(DesignCast.prpPrs.getValAmpersand(p.scale_x?.val ?? '1')),
			Number(DesignCast.prpPrs.getValAmpersand(p.scale_y?.val ?? '1')),
		);
		gdc.rotation = Number(DesignCast.prpPrs.getValAmpersand(p.rotation?.val ?? '0'));
		gdc.setOther(p);
		gdc.cvsResize();
	}
}


// 画像レイヤ
export class GrpLayDesignCast extends DesignCast {
	constructor(private readonly spLay: Sprite, private readonly gl: GrpLayer) {super('#29e', true);}

	private	sp: Sprite;
	setSp(sp: Sprite) {this.sp = sp}

	getRect() {return new Rectangle(this.spLay.x, this.spLay.y, this.sp.width, this.sp.height)}
	getPosArg(left: number, top: number) {return {left, top}}
	getSizeArg(width: number, height: number) {return {width, height}}
	setPos(x: number, y: number) {this.spLay.x = x; this.spLay.y = y;}
	setSize(w: number, h: number) {this.sp.width = w; this.sp.height = h;}
	setOther(hPrm: HPRM) {
		if ('fn' in hPrm) {
			const fn = DesignCast.prpPrs.getValAmpersand(hPrm.fn?.val ?? '');
			this.gl.lay({fn});
		}

		this.spLay.pivot	= this.pivot;
		this.spLay.scale	= this.scale;
		this.spLay.angle	= this.rotation;	// angleにセット
	}
}

// 文字レイヤ
export class TxtLayDesignCast extends DesignCast {
	constructor(private readonly spLay: Sprite, private readonly ts: TxtStage) {
		super('#29e', true);
	}
	getRect() {
		const it = this.ts.getInfTL();
		return new Rectangle(this.spLay.x, this.spLay.y, it.$width, it.$height);
	}
	getPosArg(left: number, top: number) {return {left, top}}
	getSizeArg(width: number, height: number) {return {width, height}}
	setPos(x: number, y: number) {
		this.spLay.position.set(x, y);
		this.ts.lay(this.getPosArg(x, y));
	}
	setSize(w: number, h: number) {
		this.ts.lay(this.getSizeArg(w, h));
	}
	setOther(hPrm: HPRM) {
		this.child?.setOther(hPrm);

		this.spLay.pivot	= this.pivot;
		this.spLay.scale	= this.scale;
		this.spLay.angle	= this.rotation;	// angleにセット
	}
}
// 文字レイヤ・パディング
export class TxtLayPadDesignCast extends DesignCast {
	constructor(private readonly ts: TxtStage) {super('#9e2');}
	getRect() {
		const it = this.ts.getInfTL();
		return new Rectangle(
			it.pad_left,
			it.pad_top,
			it.$width -it.pad_left -it.pad_right,
			it.$height -it.pad_top -it.pad_bottom,
		);
	}
	getPosArg(pl: number, pt: number) {return {pl, pt}}
	getSizeArg(w: number, h: number) {
		const it = this.ts.getInfTL();
		return {
			pr: it.$width -it.pad_left -w,
			pb: it.$height -it.pad_top -h,
		}
	}
	setPos(pl: number, pt: number) {this.ts.lay(this.getPosArg(pl, pt));}
	setSize(w: number, h: number) {this.ts.lay(this.getSizeArg(w, h));}
	setOther(hPrm: HPRM) {
		const id_dc = this.hArg[':id_dc'] ?? this.id_tag;
		const d = <HTMLDivElement>document.querySelector(`div[data-id_dc='${id_dc}']`);
		if ('pl' in hPrm || 'pt' in hPrm) {
			const pl = int(DesignCast.prpPrs.getValAmpersand(hPrm.pl?.val ?? '0'));
			const pt = int(DesignCast.prpPrs.getValAmpersand(hPrm.pt?.val ?? '0'));
			this.setPos(pl, pt);
			Object.assign(d.style, {left: `${pl}px`, top: `${pt}px`});
		}
		if ('pr' in hPrm || 'pb' in hPrm) {
			const pr = int(DesignCast.prpPrs.getValAmpersand(hPrm.pr?.val ?? '0'));
			const pb = int(DesignCast.prpPrs.getValAmpersand(hPrm.pb?.val ?? '0'));
			this.ts.lay({pr, pb});
			const rect = this.getRect();
			Object.assign(d.style, {width: `${rect.width}px`, height: `${rect.height}px`,});
		}
	}
}

// 文字レイヤ・文字ボタン
export class TxtBtnDesignCast extends DesignCast {
	constructor(private readonly btn: Button, readonly hArg: HArg, private readonly txt: Text) {
		super('#e92');
		if (! argChk_Boolean(hArg, 'design', true)) {	// hint用
			this.setPos = ()=> {};
			this.setSize = ()=> {};
		}

		this.pivot.x	= argChk_Num(hArg, 'pivot_x', this.pivot.x);
		this.pivot.y	= argChk_Num(hArg, 'pivot_y', this.pivot.y);
		this.scale.x	= argChk_Num(hArg, 'scale_x', this.scale.x);
		this.scale.y	= argChk_Num(hArg, 'scale_y', this.scale.y);
		this.rotation	= argChk_Num(hArg, 'rotation', this.rotation);
		this.sethArg(hArg);
	}
	getRect() {return new Rectangle(this.btn.x, this.btn.y, this.txt.width, this.txt.height)}
	getPosArg(left: number, top: number) {return {left, top}}
	getSizeArg(width: number, height: number) {return {width, height}}
	setPos(x: number, y: number) {this.btn.x = x; this.btn.y = y;}
	setSize(w: number, h: number) {this.txt.width = w; this.txt.height = h;}
	setOther(hPrm: HPRM) {
		if ('b_pic' in hPrm) {
			const b_pic = DesignCast.prpPrs.getValAmpersand(hPrm.b_pic?.val ?? '');
			this.btn.update_b_pic(b_pic, this.txt);
		}

		this.btn.pivot	= this.pivot;
		this.btn.scale	= this.scale;
		this.btn.angle	= this.rotation;	// angleにセット
	}
}

// 文字レイヤ・画像ボタン
export class PicBtnDesignCast extends DesignCast {
	constructor(private readonly btn: Button, readonly hArg: HArg) {
		super('#e92');
		this.pivot.x	= argChk_Num(hArg, 'pivot_x', this.pivot.x);
		this.pivot.y	= argChk_Num(hArg, 'pivot_y', this.pivot.y);
		this.scale.x	= argChk_Num(hArg, 'scale_x', this.scale.x);
		this.scale.y	= argChk_Num(hArg, 'scale_y', this.scale.y);
		this.rotation	= argChk_Num(hArg, 'rotation', this.rotation);
		this.sethArg(hArg);
	}

	private	sp: Sprite;
	setSp(sp: Sprite) {this.sp = sp}

	getRect() {return new Rectangle(this.btn.x, this.btn.y, this.sp.width, this.sp.height)}
	getPosArg(left: number, top: number) {return {left, top}}
	getSizeArg(width: number, height: number) {return {width, height}}
	setPos(x: number, y: number) {this.btn.x = x; this.btn.y = y;}
	setSize(w: number, h: number) {this.sp.width = w; this.sp.height = h;}
	setOther(hPrm: HPRM) {
		if ('pic' in hPrm) {
			const pic = DesignCast.prpPrs.getValAmpersand(hPrm.pic?.val ?? '');
			this.btn.update_pic(pic, this.sp);
		}

		this.btn.pivot	= this.pivot;
		this.btn.scale	= this.scale;
		this.btn.angle	= this.rotation;	// angleにセット
	}
}
