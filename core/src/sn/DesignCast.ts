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
	protected	static	divHint		= document.createElement('div');
	static	init(appPixi: Application, sys: SysBase, scrItr: ScriptIterator, prpPrs: IPropParser, alzTagArg: AnalyzeTagArg, cfg: Config, hPages: HPage) {
		appPixi.view.insertAdjacentHTML('beforebegin', `<div id="${DesignCast.ID_DESIGNMODE}" style="width: ${CmnLib.stageW *CmnLib.cvsScale}px; height: ${CmnLib.stageH *CmnLib.cvsScale}px; background: rgba(0,0,0,0); position: absolute; touch-action: none; user-select: none; display: none;"></div>`);
		DesignCast.divDesignRoot = document.getElementById(DesignCast.ID_DESIGNMODE) as HTMLDivElement;

		DesignCast.divHint.classList.add('sn_design_hint');
		document.body.appendChild(DesignCast.divHint);

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

.sn_design_hint {
	position: fixed;
	top: 0;
	left: 0;
	padding: 5px;
	border-radius: 5px;
	background: #333;
	z-index: 10;
	color: #fff;
	font-weight: bold;
	font-size: 12px;
	display: none;
	transform: translate(-100%, -100%);
}
`);
		// :before	クロスカーソル.svg
		// :after	トリミングアイコン.svg
	}
	protected	static	setHint(clientX: number, clientY: number, txt: string) {
		DesignCast.divHint.innerHTML = txt;
		DesignCast.divHint.style.cssText = `display: block; transform: translate(${clientX}px, ${clientY - 10}px) translate(-100%, -100%);`;
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
		DesignCast.hId2dc[id_dc] = this;

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
	private	static	cntDesignCast	= 0;
	private	static	hId2dc: {[id_dc: string]: DesignCast}	= {};
	static	enterMode() {
		DesignCast.leaveMode();
		DesignCast.divDesignRoot.style.display = 'inline';

		DesignCast.cntDesignCast = 0;
		DesignCast.hId2dc = {};
	}
	private	static	aDC: DesignCast[] = [];
	static	leaveMode() {
		DesignCast.divDesignRoot.textContent = '';
		DesignCast.divDesignRoot.style.display = 'none';
		DesignCast.aDC.forEach(v=> v.destroy());
		DesignCast.aDC = [];
	}


	cvsResize() {this.resizeDiv(); this.mov?.updateTarget();}	// divでmovを更新
	private	resizeDiv() {
		this.fncLay();
		if (this.div) Object.assign(this.div.style, {
			left: `${this.lx +this.rect.x *CmnLib.cvsScale}px`,
			top: `${this.ly +this.rect.y *CmnLib.cvsScale}px`,
			width: `${this.rect.width *CmnLib.cvsScale}px`,
			height: `${this.rect.height *CmnLib.cvsScale}px`,
			transformOrigin: `${this.pivot.x *CmnLib.cvsScale}px ${
				this.pivot.y *CmnLib.cvsScale}px`,
			transform: `scale(${this.scale.x}, ${this.scale.y}) rotate(${this.rotation}deg)`,
		});
	}
	private fncLay = ()=> {};

	protected	mov		: Moveable | null		= null;
	protected	div		: HTMLDivElement | null = null;
	protected	lx = 0;	// これ以後の this変数スケールは SKYNovel スクリプト値
	protected	ly = 0;
	protected	rect	= Rectangle.EMPTY;	// cvsResizeBaseやhint座標など計算用
	protected	pivot	= new Point(0, 0);
	protected	scale	= new Point(1, 1);
	protected	rotation	= 0;
	protected	oldFn = ()=> '';
	protected	onDragStart() {}
	dspDesignCast() {
		const id_dc = this.hArg[':id_dc'] ?? this.id_tag;
		DesignCast.hId2dc[id_dc] = this;

		const d = this.div = document.createElement('div');
		d.id = DesignCast.ID_DESIGNMODE +'_'+ ++DesignCast.cntDesignCast;
		d.classList.add('sn_design_cast');
		d.dataset.id_dc = id_dc;
		d.style.backgroundColor = `${this.bg_col}`;
		this.rect = this.getRect();
		this.resizeDiv();
		(this.parent
			? document.querySelector(
				`[data-id_dc="${this.parent.id_tag}"]`// 親なので
				) ?? DesignCast.divDesignRoot
			: DesignCast.divDesignRoot
		).appendChild(d);

//console.log(`fn:DesignCast.ts dspDesignCast() [${o.タグ名}] id_tag(${id_tag}) id_dc:(${id_dc}) fn:${o[':path']} ln:${o[':ln']} col_s:${o[':col_s']} col_e:${o[':col_e']} idx_tkn:${o[':idx_tkn']} x:${rect.x} y:${rect.y} w:${rect.width} h:${rect.height} o:%o`, o);		// token:【${o[':token']}】
		const tmp = {	// movがdivを操作する際の雑用。スケールはHTML DOM
			aPos	: [0, 0],
			roDeg	: 0,
			trOrg	: '',
			origin	: [0, 0],
		};
		/*
			// 長押し
			let pressTimer: NodeJS.Timeout;
			const cancelPress = ()=> clearTimeout(pressTimer);
			d.addEventListener('mouseup', cancelPress);
			d.addEventListener('mousedown', ()=> pressTimer = setTimeout(()=> {
				DesignCast.sys.send2Dbg('_focusScript', this.hArg);
			}, 1000));
		*/
		const procStart = ()=> {
			tmp.aPos = [0, 0];
			tmp.roDeg = this.rotation;
			const dpx = this.pivot.x *CmnLib.cvsScale;
			const dpy = this.pivot.y *CmnLib.cvsScale;
			tmp.trOrg = `${dpx}px ${dpy}px`;
			tmp.origin = [dpx, dpy];
			Object.assign(this.mov, {
				verticalGuidelines	: [],
				horizontalGuidelines: [],
			});
		};
		const procEnd = (o: any)=> {
			DesignCast.sys.send2Dbg('_changeCast', {
				...o, ':id_tag': this.id_tag,
			});
			DesignCast.divHint.style.display = 'none';
		};
		this.mov = new Moveable(document.body, {
			target	: d,
			draggable	: true,
			resizable	: true,
			scalable	: true,
			rotatable	: true,
			originDraggable	: true,
			snappable	: true,
		})
		.on('dragStart', ()=> {procStart(); this.onDragStart();})
		.on('drag', e=> {
			const [x, y] = tmp.aPos = e.beforeTranslate;
		//	if (x !== 0 || y !== 0) cancelPress();
			DesignCast.setHint(
				e.left,
				e.top,
`X: ${int(this.rect.x +x /CmnLib.cvsScale)}px<br/>
Y: ${int(this.rect.y +y /CmnLib.cvsScale)}px`);
		})
		.on('dragEnd', ()=> {
			const [x, y] = tmp.aPos;
			const ix = int(this.rect.x += x /CmnLib.cvsScale +this.pivot.x);
			const iy = int(this.rect.y += y /CmnLib.cvsScale +this.pivot.y);
			this.setPos(ix, iy);	// レスポンス改善のため replaceToken より先に
			procEnd(this.getPosArg(ix, iy));
		})
		.on('resizeStart', procStart)
		.on('resize', e=> {
			d.style.width = `${e.width}px`;
			d.style.height = `${e.height}px`;
			tmp.aPos = e.drag.beforeTranslate;

			const w = this.rect.width = e.width /CmnLib.cvsScale;
			const h = this.rect.height = e.height /CmnLib.cvsScale;
			DesignCast.setHint(
				e.drag.left,
				e.drag.top,
`W: ${int(w)}px<br/>
H: ${int(h)}px`);
		})
		.on('resizeEnd', ()=> {
			const [x, y] = tmp.aPos;
			const ix = int(this.rect.x += x /CmnLib.cvsScale +this.pivot.x);
			const iy = int(this.rect.y += y /CmnLib.cvsScale +this.pivot.y);
			this.setPos(ix, iy);	// レスポンス改善のため replaceToken より先に

			const iw = uint(this.rect.width), ih = uint(this.rect.height);
			this.setSize(iw, ih);	// レスポンス改善のため replaceToken より先に

			procEnd({
				...this.getPosArg(ix, iy),
				...this.getSizeArg(iw, ih),
			});
		})
		.on('rotateStart', e=> {procStart(); e.set(tmp.roDeg);})
		.on('rotate', e=> {
			tmp.roDeg = e.beforeRotate;

			DesignCast.setHint(e.drag.left, e.drag.top, int(tmp.roDeg) +'度');
		})
		.on('rotateEnd', ()=> {
			this.rotation = tmp.roDeg;	// rotation反映
			this.setOther({});	// レスポンス改善のため replaceToken より先に

			procEnd({rotation: int(tmp.roDeg)});
		})
		.on('dragOriginStart', ()=> procStart)
		.on('dragOrigin', e=> {
			tmp.trOrg = e.transformOrigin;
			tmp.origin = e.origin;
		})
		.on('dragOriginEnd', ()=> {
			const [dpx, dpy] = tmp.origin;
			tmp.trOrg = `${dpx}px ${dpy}px`;

			const px = this.pivot.x = dpx /CmnLib.cvsScale;
			const py = this.pivot.y = dpy /CmnLib.cvsScale;
			this.setOther({});	// レスポンス改善のため replaceToken より先に

			const ix = int(this.rect.x +px);
			const iy = int(this.rect.y +py);
			this.setPos(ix, iy);	// レスポンス改善のため replaceToken より先に

			procEnd({
				...this.getPosArg(ix, iy),
				pivot_x: int(px),
				pivot_y: int(py),
			});
		})
		.on('render', ()=> {
			const {aPos, roDeg, trOrg} = tmp;
			d.style.transformOrigin = trOrg;
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
		const dc = DesignCast.hId2dc[id_dc];
		const d = <HTMLDivElement>document.querySelector(`div[data-id_dc='${id_dc}']`);
		if (! d || ! dc) return;

		// 青四角移動変更をスクリプト反映したレス（Undoや手変更でも呼ばれる）
		// 内部スクリプト更新
		const token = o[':token'];
		DesignCast.scrItr.replace(o[':idx_tkn'], token);

		// 実ボタン・青四角も移動（Undoや手入力変更時）
		const e = REG_TAG.exec(token);
		const g = e?.groups;
		if (! g) throw `_replaceToken タグ記述【${token}】異常です`;
		if (dc.child) dc.child.hArg[':token'] = dc.hArg[':token'];

		DesignCast.alzTagArg.go(g.args);
		const p = DesignCast.alzTagArg.hPrm;

		// pivot (this)
		if ('pivot_x' in p || 'pivot_y' in p) {
			const px = Number(DesignCast.prpPrs.getValAmpersand(p.pivot_x.val ?? '0'));
			const py = Number(DesignCast.prpPrs.getValAmpersand(p.pivot_y.val ?? '0'));
			if (isNaN(px) || isNaN(py)) DebugMng.myTrace(`pivot_xかpivot_yが数値ではありません\n(fn:${o[':path'].slice(13)} ln:${o[':ln']})\n${token}`, 'F');

			dc.pivot.set(px, py);
		}

		// rect (this)
		if ('left' in p || 'top' in p || 'x' in p || 'y' in p) {
			const x = int(DesignCast.prpPrs.getValAmpersand(p.left.val ?? p.x.val ?? '0'));
			const y = int(DesignCast.prpPrs.getValAmpersand(p.top.val  ?? p.y.val ?? '0'));
			if (isNaN(x) || isNaN(y)) DebugMng.myTrace(`widthかheightが数値ではありません\n(fn:${o[':path'].slice(13)} ln:${o[':ln']})\n${token}`, 'F');

			dc.rect.x = x -dc.pivot.x;	// cssとpixijsの違い吸収
			dc.rect.y = y -dc.pivot.y;
			dc.setPos(x, y);
		}
		if ('width' in p || 'height' in p) {
			const w = int(DesignCast.prpPrs.getValAmpersand(p.width.val ??'0'));
			const h = int(DesignCast.prpPrs.getValAmpersand(p.height.val??'0'));
			if (isNaN(w) || isNaN(h)) DebugMng.myTrace(`widthかheightが数値ではありません\n(fn:${o[':path'].slice(13)} ln:${o[':ln']})\n${token}`, 'F');

			dc.rect.width = w;
			dc.rect.height = h;
			dc.setSize(w, h);
		}

		// scale (this)
		if ('scale_x' in p || 'scale_y' in p) {
			const sx = Number(DesignCast.prpPrs.getValAmpersand(p.scale_x.val ?? '0'));
			const sy = Number(DesignCast.prpPrs.getValAmpersand(p.scale_y.val ?? '0'));
			if (isNaN(sx) || isNaN(sy)) DebugMng.myTrace(`scale_xかscale_yが数値ではありません\n(fn:${o[':path'].slice(13)} ln:${o[':ln']})\n${token}`, 'F');

			dc.scale.set(sx, sy);
			// NOTE: UI 未サポートにつき未作成で保留
		}

		// rotation (this)
		if ('rotation' in p) {
			const r = Number(DesignCast.prpPrs.getValAmpersand(p.rotation.val ?? '0'));
			if (isNaN(r)) DebugMng.myTrace(`rotationが数値ではありません\n(fn:${o[':path'].slice(13)} ln:${o[':ln']})\n${token}`, 'F');

			dc.rotation = r;
		}
		dc.setOther(p);	// rotation「など」反映。なので外

		// rect (div, mov)
		// pivot (div, mov)
		dc.cvsResize();

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
