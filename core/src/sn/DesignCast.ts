/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2021-2021 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {HArg, IPropParser} from './CmnInterface';
import {uint, int, CmnLib} from './CmnLib';
import {SysBase} from './SysBase';
import {ScriptIterator} from './ScriptIterator';
import {HPage} from './LayerMng';
import {REG_TAG} from './Grammar';
import {AnalyzeTagArg, HPRM} from './AnalyzeTagArg';
import {DebugMng} from './DebugMng';
import {TxtStage} from './TxtStage';
import {Button} from './Button';

import {Application, Rectangle, Text, Sprite} from 'pixi.js';
import interact from 'interactjs';

export class DesignCast {
	hArg	: HArg	= {};

	constructor(readonly bg_col: string, readonly isLay = false) {}

	getRect() {return Rectangle.EMPTY}
	getPosArg(_x: number, _y: number): {[name: string]: any} {return {}};
	getSizeArg(_x: number, _y: number): {[name: string]: any} {return {}};
	setPos(_x: number, _y: number) {}
	setSize(_w: number, _h: number) {}
	setOther(_hPrm: HPRM) {}
	child?	: DesignCast;
	parent?	: DesignCast;


	private		static	divDesignRoot: HTMLDivElement;
	private		static	sys			: SysBase;
	private		static	scrItr		: ScriptIterator;
	protected	static	prpPrs		: IPropParser;
	private		static	alzTagArg	: AnalyzeTagArg;
	static	init(appPixi: Application, sys: SysBase, scrItr: ScriptIterator, prpPrs: IPropParser, alzTagArg: AnalyzeTagArg) {
		appPixi.view.insertAdjacentHTML('beforebegin', `<div id="${this.ID_DESIGNMODE}" style="width: ${CmnLib.stageW}px; height: ${CmnLib.stageH}px; background: rgba(0,0,0,0); position: absolute; touch-action: none; user-select: none; display: none;"></div>`);
		DesignCast.divDesignRoot = document.getElementById(DesignCast.ID_DESIGNMODE) as HTMLDivElement;

		DesignCast.sys = sys;
		DesignCast.scrItr = scrItr;
		DesignCast.prpPrs = prpPrs;
		DesignCast.alzTagArg = alzTagArg;
	}

	private	static	readonly	ID_DESIGNMODE = 'DesignMode';
	private	static	idDesignCast	= 0;
	private	static	id2gdc: {[idDc: string]: DesignCast}	= {};
	static	enterMode(node: string, hPages: HPage) {
		const a = node.split('/');
		const lay = hPages[a[0]];
		if (! lay) return;

		DesignCast.divDesignRoot.textContent = '';
		DesignCast.divDesignRoot.style.display = 'inline';
		DesignCast.idDesignCast = 0;
		DesignCast.id2gdc = {};
		if (a.length > 1) lay.fore.drawDesignCastChildren(
			gdc=> gdc.dspDesignCast(hPages)
		);
		else lay.fore.drawDesignCast(gdc=> gdc.dspDesignCast(hPages));
	}
	static	leaveMode() {
		DesignCast.divDesignRoot.textContent = '';
		DesignCast.divDesignRoot.style.display = 'none';
	}
	static	cvsResizeDesign() {
		DesignCast.divDesignRoot.style.width = `${CmnLib.stageW}px`;
		DesignCast.divDesignRoot.style.height= `${CmnLib.stageH}px`;
	}


	dspDesignCast(hPages: HPage) {
		const o = this.hArg;
		const id_tag = o[':id_tag'] ?? '';
		const id_dc = o[':id_dc'] ?? id_tag;
		DesignCast.id2gdc[id_dc] = this;

		let lx = 0, ly = 0;
		if (! this.parent && ! this.child && o.layer) {
			const lay = hPages[o.layer].fore;
			lx = lay.x;
			ly = lay.y;
		}

		const rect = this.getRect();
//console.log(`fn:DesignCast.ts line:55 [${o.タグ名}] id_tag(${id_tag}) id_dc:(${id_dc}) fn:${o[':path']} ln:${o[':ln']} col_s:${o[':col_s']} col_e:${o[':col_e']} idx_tkn:${o[':idx_tkn']} x:${rect.x} y:${rect.y} w:${rect.width} h:${rect.height} o:%o`, o);		// token:【${o[':token']}】
		const d = document.createElement('div');
		d.id = DesignCast.ID_DESIGNMODE +'_'+ ++DesignCast.idDesignCast;
		Object.assign(d.dataset, {idDc: id_dc, x: rect.x, y: rect.y});
		d.setAttribute('style', `
position: absolute; touch-action: none; user-select: none;
left: ${lx +rect.x}px;
top: ${ly +rect.y}px;
height: ${rect.height}px;
width: ${rect.width}px;
background-color: ${this.bg_col}; opacity: 0.6; border-radius: 8px;
`);
		(this.parent
			? document.querySelector(
				`[data-id-dc="${this.parent.hArg[':id_tag'] ?? ''}"]`// 親なので
				) ?? DesignCast.divDesignRoot
			: DesignCast.divDesignRoot
		).appendChild(d);

		const me = this;
		interact('#'+ d.id)
		.draggable({
			listeners: {move (e) {
				const t = e.target;
				let {x=0, y=0} = t.dataset;
				x = parseFloat(x) +e.dx;
				y = parseFloat(y) +e.dy;
				Object.assign(t.style, {left: `${lx +x}px`, top: `${ly +y}px`});
				Object.assign(t.dataset, {x, y});
				const ix = int(x), iy = int(y);
				me.delayChgCast(
					{...me.getPosArg(ix, iy), ':id_tag': id_tag},
					()=> me.setPos(ix, iy)
				);
			},},
			modifiers: [
				// keep the edges inside the parent
				interact.modifiers.restrictRect({restriction: 'parent'}),
			]
		})
		.resizable({
			edges: {left: false, right: true, bottom: true, top: false},
			listeners: {move(e) {
				const t = e.target;
				let {x=0, y=0} = t.dataset;
				x = parseFloat(x) +e.deltaRect.left;
				y = parseFloat(y) +e.deltaRect.top;
				const w = uint(e.rect.width);
				const h = uint(e.rect.height);
				Object.assign(t.style, {
					left	: `${lx +x}px`,
					top		: `${ly +y}px`,
					width	: `${w}px`,
					height	: `${h}px`,
				});
				Object.assign(t.dataset, {x, y});
				me.delayChgCast(
					{...me.getSizeArg(w, h), ':id_tag': id_tag},
					()=> me.setSize(w, h)
				);
			},},
			modifiers: [
				// keep the edges inside the parent
				interact.modifiers.restrictEdges({outer: 'parent'}),
				// minimum size
				interact.modifiers.restrictSize({min: {width: 40, height: 40}}),
			],
		})
		.on('hold', ()=> DesignCast.sys.send2Dbg('_focusScript', o));
/*
		.on('doubletap', e=> {
console.log(`fn:DesignCast.ts line:163 doubletap`);
			e.preventDefault()
		});
*/
	}
	// 遅延で遊びを作る
	private tidDelay	:  NodeJS.Timer | null	= null;
	private	delayChgCast(o: any, onSend: ()=> void) {
		if (this.tidDelay) clearTimeout(this.tidDelay);
		this.tidDelay = setTimeout(()=> {
//console.log(`fn:DesignCast.ts line:175 *** delayChgCast:%o`, o);
			onSend();
			DesignCast.sys.send2Dbg('_changeCast', o);
		}, 500);
	}


	static replaceToken(o: any, hPages: HPage) {
		const id_tag = o[':id_tag'];
		const id_dc = id_tag;
		const gdc = this.id2gdc[id_dc];
		const d = <HTMLDivElement>document.querySelector(`div[data-id-dc='${id_dc}']`);
		if (! d || ! gdc) throw `_replaceToken 存在しないidDc【${id_dc}】です`;

		// 青四角移動変更をスクリプト反映したレス（Undoや手変更でも呼ばれる）
		// 内部スクリプト更新
		const token = o[':token'];
		DesignCast.scrItr.replace(o[':idx_tkn'], token);
//console.log(`fn:DesignCast.ts line:193 RES id_tag(${id_tag}) ${gdc.type} o:%o`,o);

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

			let lx = 0, ly = 0;
			if (! gdc.isLay && gdc.hArg.layer) {
				const lay = hPages[gdc.hArg.layer].fore;
				lx = lay.x;
				ly = lay.y;
			}
			gdc.setPos(x, y);
			Object.assign(d.style, {left: `${lx +x}px`, top: `${ly +y}px`});
			Object.assign(d.dataset, {x, y});
		}
		if ('width' in p || 'height' in p) {
			const w = int(DesignCast.prpPrs.getValAmpersand(p.width.val ??'0'));
			const h = int(DesignCast.prpPrs.getValAmpersand(p.height.val??'0'));
			if (isNaN(w) || isNaN(h)) DebugMng.myTrace(`widthかheightが数値ではありません\n(fn:${o[':path'].slice(13)} ln:${o[':ln']})\n${token}`, 'F');

			gdc.setSize(w, h);
			Object.assign(d.style, {width: `${w}px`, height: `${h}px`,});
		}
		gdc.setOther(p);
	}
}


// 画像レイヤ
export class GrpLayDesignCast extends DesignCast {
	constructor(private readonly spLay: Sprite) {super('#29e', true);}

	private	sp: Sprite;
	setSp(sp: Sprite) {this.sp = sp}

	getRect() {return new Rectangle(this.spLay.x, this.spLay.y, this.sp.width, this.sp.height)}
	getPosArg(left: number, top: number) {return {left, top}}
	getSizeArg(width: number, height: number) {return {width, height}}
	setPos(x: number, y: number) {this.spLay.x = x; this.spLay.y = y;}
	setSize(w: number, h: number) {this.sp.width = w; this.sp.height = h;}
//	setOther(hPrm: HPRM) {this.child?.setOther(hPrm);}
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
	setOther(hPrm: HPRM) {this.child?.setOther(hPrm);}
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
		const id_tag = this.hArg[':id_tag'] ?? '';
		const id_dc = this.hArg[':id_dc'] ?? id_tag;
		const d = <HTMLDivElement>document.querySelector(`div[data-id-dc='${id_dc}']`);
		if ('pl' in hPrm || 'pt' in hPrm) {
			const pl = int(DesignCast.prpPrs.getValAmpersand(hPrm.pl?.val ?? '0'));
			const pt = int(DesignCast.prpPrs.getValAmpersand(hPrm.pt?.val ?? '0'));
//console.log(`fn:DesignCast.ts line:277 == pl:${pl} pt:${pt}`);
			this.setPos(pl, pt);
			Object.assign(d.style, {left: `${pl}px`, top: `${pt}px`});
		}
		if ('pr' in hPrm || 'pb' in hPrm) {
			const pr = int(DesignCast.prpPrs.getValAmpersand(hPrm.pr?.val ?? '0'));
			const pb = int(DesignCast.prpPrs.getValAmpersand(hPrm.pb?.val ?? '0'));
//console.log(`fn:DesignCast.ts line:298 == pr:${pr} pb:${pb}`);
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
		this.hArg = hArg;
	}
	getRect() {return new Rectangle(this.btn.x, this.btn.y, this.txt.width, this.txt.height)}
	getPosArg(left: number, top: number) {return {left, top,}}
	getSizeArg(w: number, h: number) {return {width: w, height: h,}}
	setPos(x: number, y: number) {this.btn.x = x; this.btn.y = y;}
	setSize(w: number, h: number) {this.txt.width = w; this.txt.height = h;}
}

// 文字レイヤ・画像ボタン
export class PicBtnDesignCast extends DesignCast {
	constructor(private readonly btn: Button, readonly hArg: HArg) {
		super('#e92');
		this.hArg = hArg;
	}

	private	sp: Sprite;
	setSp(sp: Sprite) {this.sp = sp}

	getRect() {return new Rectangle(this.btn.x, this.btn.y, this.sp.width, this.sp.height)}
	getPosArg(left: number, top: number) {return {left, top}}
	getSizeArg(width: number, height: number) {return {width, height}}
	setPos(x: number, y: number) {this.btn.x = x; this.btn.y = y;}
	setSize(w: number, h: number) {this.sp.width = w; this.sp.height = h;}
}
