/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2021-2021 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {HArg, IPropParser} from './CmnInterface';
import {uint, int, CmnLib, argChk_Boolean, argChk_Num, getFn, getExt, addStyle} from './CmnLib';
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
	destroy() {
		this.div = null;
		this.mov?.destroy();
		this.mov = null;
	}

	gethArg(): HArg {return this.hArg}
	protected	hArg	: HArg	= {};
	protected	id_tag	= '';
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

	protected	getRect() {return Rectangle.EMPTY}
	protected	getPosArg(_x: number, _y: number): {[name: string]: any} {return {}};
	protected	getSizeArg(_x: number, _y: number): {[name: string]: any} {return {}};
	protected	setPos(_x: number, _y: number) {}
	protected	setSize(_w: number, _h: number) {}
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
		DesignCast.aDC.forEach(v=> v.destroy());
		DesignCast.aDC = [];
	}


	cvsResize() {this.cvsResizeBase(); this.mov?.updateRect();}
	private	cvsResizeBase() {
		this.fncLay();
		if (this.div) Object.assign(this.div.style, {
			left: `${this.lx +this.rect.x *CmnLib.cvsScale}px`,
			top: `${this.ly +this.rect.y *CmnLib.cvsScale}px`,
			width: `${this.rect.width *CmnLib.cvsScale}px`,
			height: `${this.rect.height *CmnLib.cvsScale}px`,
			transformOrigin: `${this.pivot.x}px ${this.pivot.y}px`,
			transform: `scale(${this.scale.x}, ${this.scale.y}) rotate(${this.rotation}deg)`,
		});
	}
	private fncLay = ()=> {};

	protected	rect	= Rectangle.EMPTY;
	protected	pivot	= new Point(0, 0);
	protected	scale	= new Point(1, 1);
	protected	rotation	= 0;
	protected	oldFn = ()=> '';
	protected	mov		: Moveable | null		= null;
	protected	div		: HTMLDivElement | null = null;
	protected	lx = 0;
	protected	ly = 0;
	protected	updTrOr = ()=> {};
	protected	onDragStart() {}
	dspDesignCast() {
		const id_dc = this.hArg[':id_dc'] ?? this.id_tag;
		DesignCast.id2gdc[id_dc] = this;

		const d = this.div = document.createElement('div');
		d.id = DesignCast.ID_DESIGNMODE +'_'+ ++DesignCast.idDesignCast;
		d.classList.add('sn_design_cast');
		d.dataset.id_dc = id_dc;
		d.style.backgroundColor = `${this.bg_col}`;
		this.rect = this.getRect();
		this.cvsResizeBase();
		(this.parent
			? document.querySelector(
				`[data-id_dc="${this.parent.id_tag}"]`// 親なので
				) ?? DesignCast.divDesignRoot
			: DesignCast.divDesignRoot
		).appendChild(d);

//console.log(`fn:DesignCast.ts dspDesignCast() [${o.タグ名}] id_tag(${id_tag}) id_dc:(${id_dc}) fn:${o[':path']} ln:${o[':ln']} col_s:${o[':col_s']} col_e:${o[':col_e']} idx_tkn:${o[':idx_tkn']} x:${rect.x} y:${rect.y} w:${rect.width} h:${rect.height} o:%o`, o);		// token:【${o[':token']}】
		const f = {
			aPos	: [0, 0],
			roDeg	: this.rotation,
			trOr	: `${this.pivot.x}px ${this.pivot.y}px`,
			origin	: [0, 0],
		};
		this.updTrOr = ()=> f.trOr = `${this.pivot.x}px ${this.pivot.y}px`;
		/*
			// 長押し
			let pressTimer: NodeJS.Timeout;
			const cancelPress = ()=> clearTimeout(pressTimer);
			d.addEventListener('mouseup', cancelPress);
			d.addEventListener('mousedown', ()=> pressTimer = setTimeout(()=> {
				DesignCast.sys.send2Dbg('_focusScript', this.hArg);
			}, 1000));
		*/
		this.mov = new Moveable(document.body, {
			target	: d,
			draggable	: true,
			resizable	: true,
			scalable	: true,
			rotatable	: true,
			originDraggable	: true,
			snappable	: true,
		})
		.on('dragStart', ()=> {f.aPos = [0, 0]; this.onDragStart();})
		.on('drag', e=> {
			f.aPos = e.beforeTranslate;
		//	if (f.aPos[0] !== 0 || f.aPos[1] !== 0) cancelPress();
		})
		.on('dragEnd', ()=> {
			const [x, y] = f.aPos;
			const ix = int(this.rect.x += x /CmnLib.cvsScale +this.pivot.x);
			const iy = int(this.rect.y += y /CmnLib.cvsScale +this.pivot.y);
			this.setPos(ix, iy);
			DesignCast.sys.send2Dbg('_changeCast', {
				...this.getPosArg(ix, iy),
				':id_tag': this.id_tag,
			});
		})
		.on('resizeStart', ()=> f.aPos = [0, 0])
		.on('resize', e=> {
			d.style.width = `${e.width}px`;
			d.style.height = `${e.height}px`;
			f.aPos = e.drag.beforeTranslate;
		})
		.on('resizeEnd', ()=> {
			const [x, y] = f.aPos;
			const ix = int(this.rect.x += x /CmnLib.cvsScale +this.pivot.x);
			const iy = int(this.rect.y += y /CmnLib.cvsScale +this.pivot.y);
			this.setPos(ix, iy);

			this.rect.width = parseFloat(d.style.width) /CmnLib.cvsScale;
			this.rect.height = parseFloat(d.style.height) /CmnLib.cvsScale;
			const iw = uint(this.rect.width), ih = uint(this.rect.height);
			this.setSize(iw, ih);

			DesignCast.sys.send2Dbg('_changeCast', {
				...this.getPosArg(ix, iy),
				...this.getSizeArg(iw, ih),
				':id_tag': this.id_tag,
			});
		})
		.on('rotateStart', e=> e.set(f.roDeg))
		.on('rotate', e=> f.roDeg = e.beforeRotate)
		.on('rotateEnd', ()=> {
			DesignCast.sys.send2Dbg('_changeCast', {
				rotation: int(f.roDeg),
				':id_tag': this.id_tag,
			});
		})
		.on('dragOriginStart', ()=> f.aPos = [0, 0])
		.on('dragOrigin', e=> {
			f.trOr = e.transformOrigin;
			f.origin = e.origin;
		})
		.on('dragOriginEnd', ()=> {
			const px = this.pivot.x = f.origin[0] /CmnLib.cvsScale;
			const py = this.pivot.y = f.origin[1] /CmnLib.cvsScale;
			this.updTrOr();
			this.setOther({});

			const ix = int(this.rect.x +px);
			const iy = int(this.rect.y +py);
			this.setPos(ix, iy);

			DesignCast.sys.send2Dbg('_changeCast', {
				...this.getPosArg(ix, iy),
				pivot_x: int(px),
				pivot_y: int(py),
				':id_tag': this.id_tag,
			});
		})
		.on('render', ()=> {
			const {aPos, roDeg, trOr} = f;
			d.style.transformOrigin = trOr;
			d.style.transform = `translate(${aPos[0]}px, ${aPos[1]}px) rotate(${roDeg}deg)`;
		});
		DesignCast.aDC.push(this);


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

			const f = dt.files[0];
			const o = {
				':id_tag': this.id_tag,
				fn		: getFn(f.name),
				ext		: getExt(f.name),
				url		: '',
				buf		: new ArrayBuffer(0),
				old_fn	: this.oldFn(),
				old_url	: DesignCast.cfg.searchPath(this.oldFn(), Config.EXT_SPRITE),
			};
			f.arrayBuffer().then(buf=> {
				o.buf = buf;
				try {
					o.url = DesignCast.scrItr.cnvPath4Dbg(
						DesignCast.cfg.searchPath(f.name, Config.EXT_SPRITE)
					);
				} catch {}
				DesignCast.sys.send2Dbg('_dropFile', o);
			})
			.catch(e=> console.error(`drop2dc %o`, e));
		});

		// ダブルクリックで定義先へジャンプ
		d.addEventListener('dblclick', e=> {
			e.preventDefault();
			DesignCast.sys.send2Dbg('_focusScript', this.hArg);

//console.log(`fn:DesignCast.ts line:162 tap btn:${e.button}`);
//				case 0:	this.fire('click', e);	break;
//				case 1:	this.fire('middleclick', e);	break;
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

		// 実ボタン・青四角も移動（Undoや手入力変更時）
		const e = REG_TAG.exec(token);
		const g = e?.groups;
		if (! g) throw `_replaceToken タグ記述【${token}】異常です`;
		if (gdc.child) gdc.child.hArg[':token'] = gdc.hArg[':token'];

		DesignCast.alzTagArg.go(g.args);
		const p = DesignCast.alzTagArg.hPrm;

		gdc.pivot.set(
			Number(DesignCast.prpPrs.getValAmpersand(p.pivot_x?.val ?? '0')),
			Number(DesignCast.prpPrs.getValAmpersand(p.pivot_y?.val ?? '0')),
		);
		gdc.updTrOr();

		if ('left' in p || 'top' in p || 'x' in p || 'y' in p) {
			const x = int(DesignCast.prpPrs.getValAmpersand(p.left?.val ?? p.x?.val ?? '0'));
			const y = int(DesignCast.prpPrs.getValAmpersand(p.top?.val  ?? p.y?.val ?? '0'));
			if (isNaN(x) || isNaN(y)) DebugMng.myTrace(`widthかheightが数値ではありません\n(fn:${o[':path'].slice(13)} ln:${o[':ln']})\n${token}`, 'F');

			gdc.rect.x = x -gdc.pivot.x;
			gdc.rect.y = y -gdc.pivot.y;
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

	protected	getRect() {return new Rectangle(this.spLay.x, this.spLay.y, this.sp.width, this.sp.height)}
	protected	getPosArg(left: number, top: number) {return {left, top}}
	protected	getSizeArg(width: number, height: number) {return {width, height}}
	protected	setPos(x: number, y: number) {this.spLay.x = x; this.spLay.y = y;}
	protected	setSize(w: number, h: number) {this.sp.width = w; this.sp.height = h;}
	setOther(hPrm: HPRM) {
		if ('fn' in hPrm) {
			const fn = DesignCast.prpPrs.getValAmpersand(hPrm.fn?.val ?? '');
			this.gl.lay({fn});
		}

		this.spLay.pivot	= this.pivot;
		this.spLay.scale	= this.scale;
		this.spLay.angle	= this.rotation;	// angleにセット
	}
	protected	oldFn = ()=> this.hArg.fn ?? '';
}

// 文字レイヤ
export class TxtLayDesignCast extends DesignCast {
	constructor(private readonly spLay: Sprite, private readonly ts: TxtStage) {
		super('#29e', true);
	}
	protected	getRect() {
		const it = this.ts.getInfTL();
		return new Rectangle(this.spLay.x, this.spLay.y, it.$width, it.$height);
	}
	protected	getPosArg(left: number, top: number) {return {left, top}}
	protected	getSizeArg(width: number, height: number) {return {width, height}}
	protected	setPos(x: number, y: number) {
		this.spLay.position.set(x, y);
		this.ts.lay(this.getPosArg(x, y));
	}
	protected	setSize(w: number, h: number) {
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
	protected	getRect() {
		const it = this.ts.getInfTL();
		return new Rectangle(
			it.pad_left,
			it.pad_top,
			it.$width -it.pad_left -it.pad_right,
			it.$height -it.pad_top -it.pad_bottom,
		);
	}
	protected	getPosArg(pl: number, pt: number) {return {pl, pt}}
	protected	getSizeArg(w: number, h: number) {
		const it = this.ts.getInfTL();
		return {
			pr: it.$width -it.pad_left -w,
			pb: it.$height -it.pad_top -h,
		}
	}
	protected	setPos(pl: number, pt: number) {this.ts.lay(this.getPosArg(pl, pt));}
	protected	setSize(w: number, h: number) {this.ts.lay(this.getSizeArg(w, h));}
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

// 文字レイヤ・ボタン基本
export class BtnDesignCast extends DesignCast {
	constructor(protected readonly btn: Button, readonly hArg: HArg) {
		super('#e92');
		this.pivot.x	= argChk_Num(hArg, 'pivot_x', this.pivot.x);
		this.pivot.y	= argChk_Num(hArg, 'pivot_y', this.pivot.y);
		this.scale.x	= argChk_Num(hArg, 'scale_x', this.scale.x);
		this.scale.y	= argChk_Num(hArg, 'scale_y', this.scale.y);
		this.rotation	= argChk_Num(hArg, 'rotation', this.rotation);
		this.sethArg(hArg);
	}
	protected	getPosArg(left: number, top: number) {return {left, top}}
	protected	getSizeArg(width: number, height: number) {return {width, height}}
	protected	setPos(x: number, y: number) {this.btn.x = x; this.btn.y = y;}
	setOther(_hPrm: HPRM) {
		this.btn.pivot	= this.pivot;
		this.btn.scale	= this.scale;
		this.btn.angle	= this.rotation;	// angleにセット
	}

	protected	onDragStart() {
		const aBtn = this.btn.parent.children.filter(b=> b !== this.btn);
		Object.assign(this.mov, {
			verticalGuidelines	: aBtn.map(b=> this.lx +b.x *CmnLib.cvsScale),
			horizontalGuidelines: aBtn.map(b=> this.ly +b.y *CmnLib.cvsScale),
		});
	}
}
// 文字レイヤ・文字ボタン
export class TxtBtnDesignCast extends BtnDesignCast {
	constructor(btn: Button, hArg: HArg, private readonly txt: Text) {
		super(btn, hArg);
		if (! argChk_Boolean(hArg, 'design', true)) {	// hint用
			this.setPos = ()=> {};
			this.setSize = ()=> {};
		}
	}
	protected	getRect() {return new Rectangle(this.btn.x, this.btn.y, this.txt.width, this.txt.height)}
	protected	setSize(w: number, h: number) {this.txt.width = w; this.txt.height = h;}
	setOther(hPrm: HPRM) {
		super.setOther(hPrm);
		if ('b_pic' in hPrm) {
			const b_pic = DesignCast.prpPrs.getValAmpersand(hPrm.b_pic?.val ?? '');
			this.btn.update_b_pic(b_pic, this.txt);
		}
	}
	protected	oldFn = ()=> this.hArg.b_pic ?? '';
}

// 文字レイヤ・画像ボタン
export class PicBtnDesignCast extends BtnDesignCast {
	constructor(btn: Button, hArg: HArg) {super(btn, hArg);}

	private	sp: Sprite;
	setSp(sp: Sprite) {this.sp = sp}

	protected	getRect() {return new Rectangle(this.btn.x, this.btn.y, this.sp.width, this.sp.height)}
	protected	setSize(w: number, h: number) {this.sp.width = w; this.sp.height = h;}
	setOther(hPrm: HPRM) {
		super.setOther(hPrm);
		if ('pic' in hPrm) {
			const pic = DesignCast.prpPrs.getValAmpersand(hPrm.pic?.val ?? '');
			this.btn.update_pic(pic, this.sp);
		}
	}
	protected	oldFn = ()=> this.hArg.pic ?? '';
}
