/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2022 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {BLEND_MODES, DisplayObject, Container, Sprite, Texture, AbstractRenderer} from 'pixi.js';
import {CmnLib, int, argChk_Boolean, argChk_Num} from './CmnLib';
import {HArg} from './CmnInterface';
import {IMakeDesignCast} from './LayerMng';

export class Layer {
				layname	= '';
	protected	name_	= '';
	set name(nm) {this.name_ = nm;}
	get name() {return this.name_;}
	readonly	spLay	= new Sprite(Texture.EMPTY);

	// tsy用
	get	alpha() {return this.spLay.alpha}
	set alpha(v) {this.spLay.alpha = v}
	get	height() {return this.spLay.height}
	get	rotation() {return this.spLay.angle}
	set rotation(v) {this.spLay.angle = v}
	get	scale_x() {return this.spLay.scale.x}
	set scale_x(v) {this.spLay.scale.x = v}
	get	scale_y() {return this.spLay.scale.y}
	set scale_y(v) {this.spLay.scale.y = v}
	get	width() {return this.spLay.width}
	get	x() {return this.spLay.x}
	set x(v) {this.spLay.x = v}
	get	y() {return this.spLay.y}
	set y(v) {this.spLay.y = v}

	destroy() {}

	lay(hArg: HArg): boolean {
		if ('alpha' in hArg) this.spLay.alpha = argChk_Num(hArg, 'alpha', 1);

		Layer.setBlendmode(this.spLay, hArg);

		if ('pivot_x' in hArg || 'pivot_y' in hArg) this.spLay.pivot.set(
			argChk_Num(hArg, 'pivot_x', this.spLay.pivot.x),
			argChk_Num(hArg, 'pivot_y', this.spLay.pivot.y)
		);

		if ('rotation' in hArg) this.spLay.angle = argChk_Num(hArg, 'rotation', 0);
			// flash : rotation is in degrees.
			// pixijs: rotation is in radians, angle is in degrees.

		if ('scale_x' in hArg || 'scale_y' in hArg) this.spLay.scale.set(
			argChk_Num(hArg, 'scale_x', this.spLay.scale.x),
			argChk_Num(hArg, 'scale_y', this.spLay.scale.y)
		);

		if ('visible' in hArg) this.spLay.visible = argChk_Boolean(hArg, 'visible', true);

		return false;
	}

	static	setBlendmode(cnt: Container, hArg: HArg) {
		const {blendmode} = hArg;
		if (! blendmode) return;	// 省略時になにもしない

		const bmn = Layer.getBlendmodeNum(blendmode);
		if (cnt instanceof Sprite) cnt.blendMode = bmn;
		cnt.children.forEach(c=> {
			if (c instanceof Sprite) c.blendMode = bmn;
		});
	}

	static getBlendmodeNum(bm_name: string): number {
		if (! bm_name) return BLEND_MODES.NORMAL;	// 省略時にデフォルトを返す

		const bmn = Layer.#hBlendmode[bm_name];
		if (bmn !== undefined) return bmn;
		throw `${bm_name} はサポートされない blendmode です`;
	}
	static	readonly	#hBlendmode: {[bm_name: string]: number} = {
		'normal'		: BLEND_MODES.NORMAL,
		'add'			: BLEND_MODES.ADD,
		'multiply'		: BLEND_MODES.MULTIPLY,
		'screen'		: BLEND_MODES.SCREEN,
/*
		'overlay'		: BLEND_MODES.OVERLAY,
		'darken'		: BLEND_MODES.DARKEN,
		'lighten'		: BLEND_MODES.LIGHTEN,
		'color_dodge'	: BLEND_MODES.COLOR_DODGE,
		'color_burn'	: BLEND_MODES.COLOR_BURN,
		'hard_light'	: BLEND_MODES.HARD_LIGHT,
		'soft_light'	: BLEND_MODES.SOFT_LIGHT,
		'difference'	: BLEND_MODES.DIFFERENCE,
		'exclusion'		: BLEND_MODES.EXCLUSION,
		'hue'			: BLEND_MODES.HUE,
		'saturation'	: BLEND_MODES.SATURATION,
		'color'			: BLEND_MODES.COLOR,
		'luminosity'	: BLEND_MODES.LUMINOSITY,

		'normal_npm'	: BLEND_MODES.NORMAL_NPM,
		'add_npm'		: BLEND_MODES.ADD_NPM,
		'screen_npm'	: BLEND_MODES.SCREEN_NPM,
		'none'			: BLEND_MODES.NONE,
		'src_in'		: BLEND_MODES.SRC_IN,
		'src_out'		: BLEND_MODES.SRC_OUT,
		'src_atop'		: BLEND_MODES.SRC_ATOP,
		'dst_over'		: BLEND_MODES.DST_OVER,
		'dst_in'		: BLEND_MODES.DST_IN,
		'dst_out'		: BLEND_MODES.DST_OUT,
		'dst_atop'		: BLEND_MODES.DST_ATOP,
		'subtract'		: BLEND_MODES.SUBTRACT,
		'src_over'		: BLEND_MODES.SRC_OVER,
		'erase'			: BLEND_MODES.ERASE,
		'xor'			: BLEND_MODES.XOR,
*/
	};
	static getNum2Blendmode(bmn: number): string {
		return Layer.#hNum2Blendmode[bmn] ?? 'normal';
	}
	static	readonly	#hNum2Blendmode: {[bmn: number]: string} = {
		0	/* NORMAL */		: 'normal',
		1	/* ADD */			: 'add',
		2	/* MULTIPLY */		: 'multiply',
		3	/* SCREEN */		: 'screen',
	}

	// アニメ・動画があるか
	get containMovement(): boolean {return false;}

	renderStart() {}
	renderEnd() {}

	clearLay(hArg: HArg): void {
		this.spLay.alpha = 1;
		this.spLay.blendMode = BLEND_MODES.NORMAL;
		// visibleは触らない
		this.spLay.pivot.set(0, 0);
		this.spLay.angle = 0;
		this.spLay.scale.set(1, 1);
		if (argChk_Boolean(hArg, 'filter', false)) this.spLay.filters = [];
		//transform.colorTransform = nulColTrfm;
	}
	copy(fromLayer: Layer, aPrm: Promise<void>[]): void {
		const org_name = this.name_;
		this.playback(fromLayer.record(), aPrm);
		this.name = org_name;
	}
	record() {return {
		name	: this.name_,
		idx		: this.spLay.parent.getChildIndex(this.spLay),
		alpha	: this.spLay.alpha,
		blendMode	: this.spLay.blendMode,
		rotation	: this.spLay.angle,
		scale_x	: this.spLay.scale.x,
		scale_y	: this.spLay.scale.y,
		pivot_x	: this.spLay.pivot.x,
		pivot_y	: this.spLay.pivot.y,
		x		: this.spLay.x,
		y		: this.spLay.y,
		visible	: this.spLay.visible,
	};}
	playback(hLay: any, _aPrm: Promise<void>[]): void {
		this.name = hLay.name;
		//idx	// コール順に意味があるので親でやる

		this.clearLay({filter: 'true'});
		this.spLay.alpha = hLay.alpha;
		this.spLay.blendMode = hLay.blendMode;
		this.spLay.angle = hLay.rotation;
		this.spLay.scale.set(hLay.scale_x, hLay.scale_y);
		this.spLay.pivot.set(hLay.pivot_x, hLay.pivot_y);
		this.spLay.position.set(hLay.x, hLay.y);
		this.spLay.visible = hLay.visible;
	}

	snapshot(rnd: AbstractRenderer, re: ()=> void) {
		rnd.render(this.spLay, {clear: false});
		re();
	}
	snapshot_end() {}

	makeDesignCast(_gdc: IMakeDesignCast) {}
	makeDesignCastChildren(_gdc: IMakeDesignCast) {}

	showDesignCast() {}
	showDesignCastChildren() {}

	cvsResize() {}
	cvsResizeChildren() {}

	dump(): string {
		return ` "idx":${this.spLay.parent.getChildIndex(this.spLay)}, "visible":"${
			this.spLay.visible}", "left":${this.spLay.x}, "top":${this.spLay.y
			}, "alpha":${this.spLay.alpha}, "rotation":${this.spLay.angle
//			}, "blendMode":${this.spLay.blendMode
			}, "name":"${this.name_}", "scale_x":${this.spLay.scale.x
			}, "scale_y":${this.spLay.scale.y}`;
	}

	static	setXY(base: DisplayObject, hArg: HArg, ret: Container, isGrp = false, isButton = false): void {
		if (hArg.pos) {Layer.setXYByPos(base, hArg.pos, ret); return;}

		const rct_base = base.getBounds();
		const r_absclX	= (ret.scale.x < 0)? -ret.scale.x : ret.scale.x;
		const b_width	= (r_absclX === 1)
						? rct_base.width : rct_base.width *r_absclX;
		const r_absclY	= (ret.scale.y < 0)? -ret.scale.y : ret.scale.y;
		const b_height	= (r_absclY === 1)
						? rct_base.height: rct_base.height*r_absclY;

		// 横位置計算
		let x = ret.x;	// AIRNovelでは 0
		if ('left' in hArg) {
			x = argChk_Num(hArg, 'left', 0);
			if ((x > -1) && (x < 1)) x *= CmnLib.stageW;
		}
		else if ('center' in hArg) {
			x = argChk_Num(hArg, 'center', 0);
			if ((x > -1) && (x < 1)) x *= CmnLib.stageW;
			x = x - (isButton ?b_width/3 :b_width)/2;
		}
		else if ('right' in hArg) {
			x = argChk_Num(hArg, 'right', 0);
			if ((x > -1) && (x < 1)) x *= CmnLib.stageW;
			x = x - (isButton ?b_width/3 :b_width);
		}
		else if ('s_right' in hArg) {
			x = argChk_Num(hArg, 's_right', 0);
			if ((x > -1) && (x < 1)) x *= CmnLib.stageW;
			x = CmnLib.stageW - x
				- (isButton ?b_width/3 :b_width);
		}
		ret.x = int( ((ret.scale.x < 0)
			? x +(isButton ?b_width/3 :b_width)
			: x) );

		// 縦位置計算
		let y = ret.y;	// AIRNovelでは 0
		if ('top' in hArg) {
			y = argChk_Num(hArg, 'top', 0);
			if ((y > -1) && (y < 1)) y *= CmnLib.stageH;
		}
		else if ('middle' in hArg) {
			y = argChk_Num(hArg, 'middle', 0);
			if ((y > -1) && (y < 1)) y *= CmnLib.stageH;
			y = y - b_height/2;
		}
		else if ('bottom' in hArg) {
			y = argChk_Num(hArg, 'bottom', 0);
			if ((y > -1) && (y < 1)) y *= CmnLib.stageH;
			y = y - b_height;
		}
		else if ('s_bottom' in hArg) {
			y = argChk_Num(hArg, 's_bottom', 0);
			if ((y > -1) && (y < 1)) y *= CmnLib.stageH;
			y = CmnLib.stageH - y - b_height;
		}
		ret.y = int( ((ret.scale.y < 0) ?y +b_height :y) );

		if (isGrp) {	// これを上の方に持っていってはいけない。
						// iPhone6など中途半端な画面サイズの際に
						// 縦位置が異常になる（素材が画面外下に）
			if (!('left' in hArg)
			&& !('center' in hArg)
			&& !('right' in hArg)
			&& !('s_right' in hArg)
			&& !('top' in hArg)
			&& !('middle' in hArg)
			&& !('bottom' in hArg)
			&& !('s_bottom' in hArg)) {
				Layer.setXYByPos(base, 'c', ret);
			}
		}
	}

	static	setXYByPos(base: DisplayObject, pos: string, ret: DisplayObject): void {
		if (pos === 'stay') return;
		if (base === undefined) throw 'setXYByPos base === undefined';
		if (ret === undefined) throw 'setXYByPos result === undefined';

		const rct_base = base.getBounds();
		const r_absclX = (ret.scale.x < 0)? -ret.scale.x : ret.scale.x;
		const b_width = (r_absclX === 1)? rct_base.width : rct_base.width *r_absclX;
		const r_absclY = (ret.scale.y < 0)? -ret.scale.y : ret.scale.y;
		const b_height = (r_absclY === 1)? rct_base.height: rct_base.height*r_absclY;

		let c = 0;	// 忘れたけど、プルプルするからintなんだっけ
		if (! pos || pos === 'c') {c = CmnLib.stageW *0.5;}
		else if (pos === 'r') {c = CmnLib.stageW - b_width *0.5;}
		else if (pos === 'l') {c = b_width *0.5;}
		else {c = int(pos);}

		ret.x = int(c -b_width *0.5);
		ret.y = CmnLib.stageH -b_height;

		if (ret.scale.x < 0) ret.x += b_width;
		if (ret.scale.y < 0) ret.y += b_height;
	}

	static	setXYCenter(dsp: DisplayObject): void {
		const rct = dsp.getBounds();
		dsp.x = (CmnLib.stageW - rct.width) *0.5;
		dsp.y = (CmnLib.stageH - rct.height) *0.5;
	}

}
