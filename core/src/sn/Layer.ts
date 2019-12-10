/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {BLEND_MODES, DisplayObject, Container, Sprite, Texture, Renderer} from 'pixi.js';
import {CmnLib, int} from './CmnLib';
import {HArg} from './CmnInterface';

export class Layer {
	name	= '';
	readonly	cnt		= new Sprite(Texture.EMPTY);

	// tsy用
	get	alpha() {return this.cnt.alpha}
	set alpha(v) {this.cnt.alpha = v}
	get	height() {return this.cnt.getBounds().height}
	get	rotation() {return this.cnt.rotation}
	set rotation(v) {this.cnt.rotation = v}
	get	scale_x() {return this.cnt.scale.x}
	set scale_x(v) {this.cnt.scale.x = v}
	get	scale_y() {return this.cnt.scale.y}
	set scale_y(v) {this.cnt.scale.y = v}
	get	width() {return this.cnt.getBounds().width}
	get	x() {return this.cnt.x}
	set x(v) {this.cnt.x = v}
	get	y() {return this.cnt.y}
	set y(v) {this.cnt.y = v}

	destroy() {}

	lay(hArg: HArg): boolean {
		this.cnt.alpha = CmnLib.argChk_Num(hArg, 'alpha', this.cnt.alpha);

		//Layer.argChk_BlendmodeAndSet(hArg, this.ctn);

		this.cnt.pivot.set(
			CmnLib.argChk_Num(hArg, 'pivot_x', this.cnt.pivot.x),
			CmnLib.argChk_Num(hArg, 'pivot_y', this.cnt.pivot.y)
		);
		this.cnt.angle = CmnLib.argChk_Num(hArg, 'rotation', this.cnt.angle);
			// rotation is in radians, angle is in degrees.
		this.cnt.scale.set(
			CmnLib.argChk_Num(hArg, 'scale_x', this.cnt.scale.x),
			CmnLib.argChk_Num(hArg, 'scale_y', this.cnt.scale.y)
		);
		this.cnt.visible = CmnLib.argChk_Boolean(hArg, 'visible', this.cnt.visible);

		return false;
	}
	clearLay(hArg: HArg): void {
		this.cnt.alpha = 1;
		this.cnt.blendMode = BLEND_MODES.NORMAL;
		// visibleは触らない
		this.cnt.pivot.set(0, 0);
		this.cnt.rotation = 0;
		this.cnt.scale.set(1, 1);
		if (CmnLib.argChk_Boolean(hArg, 'filter', false)) this.cnt.filters = [];
		//transform.colorTransform = nulColTrfm;
	}
	copy(fromLayer: Layer): void {
		const org_name = this.name;
		this.playback(fromLayer.record());
		this.name = org_name;
	}
	record() {return {
		name	: this.name,
		idx		: this.cnt.parent.getChildIndex(this.cnt),
		alpha	: this.cnt.alpha,
		blendMode	: this.cnt.blendMode,
		rotation	: this.cnt.rotation,
		scale_x	: this.cnt.scale.x,
		scale_y	: this.cnt.scale.y,
		pivot_x	: this.cnt.pivot.x,
		pivot_y	: this.cnt.pivot.y,
		x		: this.cnt.x,
		y		: this.cnt.y,
		visible	: this.cnt.visible,
	};}
	playback(hLay: any, _fncComp: undefined | {(): void} = undefined): boolean {
		this.name = hLay.name;
		//idx	// コール順に意味があるので親でやる

		this.clearLay({filter: 'true'});
		this.cnt.alpha = hLay.alpha;
		this.cnt.blendMode = hLay.blendMode;
		this.cnt.rotation = hLay.rotation;
		this.cnt.scale.set(hLay.scale_x, hLay.scale_y);
		this.cnt.pivot.set(hLay.pivot_x, hLay.pivot_y);
		this.cnt.position.set(hLay.x, hLay.y);
		this.cnt.visible = hLay.visible;

		return false;
	}

	snapshot(rnd: Renderer, re: ()=> void) {
		rnd.render(this.cnt, undefined, false);
		re();
	}
	snapshot_end() {}

	dump(): string {
		return ` "idx":${this.cnt.parent.getChildIndex(this.cnt)}, "visible":"${
			this.cnt.visible}", "left":${this.cnt.x}, "top":${this.cnt.y
			}, "alpha":${this.cnt.alpha}, "rotation":${this.cnt.rotation
			}, "name":"${this.name}", "scale_x":${this.cnt.scale.x
			}, "scale_y":${this.cnt.scale.y}`;
	}

	static argChk_BlendmodeAndSet(hash: any, $do: DisplayObject):void {
		const v = hash['blendmode'];
		if (! v) return;
		if (! ($do instanceof Sprite)) return;
		const sp = $do as Sprite;

		if (!(v in Layer.hBlendmode)) throw 'blendmode='+ v +' は異常な値です';

		if (! Layer.hBlendmode[v]) throw '（'+ name +'）はサポートされない blendmode です';
		sp.blendMode = v;
	}
	static cnvBlendmode(name: string): number {
		if (! name) return BLEND_MODES.NORMAL;

		const bm = Layer.hBlendmode[name];
		if (bm) return bm;
		throw '（'+ name +'）はサポートされない blendmode です';
	}
	static	readonly	hBlendmode: any = {
		'normal':		BLEND_MODES.NORMAL,
		'add':			BLEND_MODES.ADD,
		'multiply':		BLEND_MODES.MULTIPLY,
		'screen':		BLEND_MODES.SCREEN,
		'overlay':		BLEND_MODES.OVERLAY,
		'darken':		BLEND_MODES.DARKEN,
		'lighten':		BLEND_MODES.LIGHTEN,
		'color_dodge':	BLEND_MODES.COLOR_DODGE,
		'color_burn':	BLEND_MODES.COLOR_BURN,
		'hard_light':	BLEND_MODES.HARD_LIGHT,
		'soft_light':	BLEND_MODES.SOFT_LIGHT,
		'difference':	BLEND_MODES.DIFFERENCE,
		'exclusion':	BLEND_MODES.EXCLUSION,
		'hue':			BLEND_MODES.HUE,
		'saturation':	BLEND_MODES.SATURATION,
		'color':		BLEND_MODES.COLOR,
		'luminosity':	BLEND_MODES.LUMINOSITY,
	}

	static	setXY(base: DisplayObject, hArg: HArg, ret: Container, isGrp = false, isButton = false): void {
		if (hArg.pos) {Layer.setXYByPos(base, hArg.pos, ret); return;}

		const rct_base = base.getBounds();
		const r_absclX	= (ret.scale.x < 0)? -ret.scale.x : ret.scale.x;
		const b_width	= (r_absclX == 1)
						? rct_base.width : rct_base.width *r_absclX;
		const r_absclY	= (ret.scale.y < 0)? -ret.scale.y : ret.scale.y;
		const b_height	= (r_absclY == 1)
						? rct_base.height: rct_base.height*r_absclY;

		// 横位置計算
		let x = ret.x;	// NOTE: AIRNovelでは 0
		if ('left' in hArg) {
			x = CmnLib.argChk_Num(hArg, 'left', 0);
			if ((x > -1) && (x < 1)) x *= CmnLib.stageW;
		}
		else if ('center' in hArg) {
			x = CmnLib.argChk_Num(hArg, 'center', 0);
			if ((x > -1) && (x < 1)) x *= CmnLib.stageW;
			x = x - (isButton ?b_width/3 :b_width)/2;
		}
		else if ('right' in hArg) {
			x = CmnLib.argChk_Num(hArg, 'right', 0);
			if ((x > -1) && (x < 1)) x *= CmnLib.stageW;
			x = x - (isButton ?b_width/3 :b_width);
		}
		else if ('s_right' in hArg) {
			x = CmnLib.argChk_Num(hArg, 's_right', 0);
			if ((x > -1) && (x < 1)) x *= CmnLib.stageW;
			x = CmnLib.stageW - x
				- (isButton ?b_width/3 :b_width);
		}
		ret.x = int( ((ret.scale.x < 0)
			? x +(isButton ?b_width/3 :b_width)
			: x) * CmnLib.retinaRate );

		// 縦位置計算
		let y = ret.y;	// AIRNovelでは 0
		if ('top' in hArg) {
			y = CmnLib.argChk_Num(hArg, 'top', 0);
			if ((y > -1) && (y < 1)) y *= CmnLib.stageH;
		}
		else if ('middle' in hArg) {
			y = CmnLib.argChk_Num(hArg, 'middle', 0);
			if ((y > -1) && (y < 1)) y *= CmnLib.stageH;
			y = y - b_height/2;
		}
		else if ('bottom' in hArg) {
			y = CmnLib.argChk_Num(hArg, 'bottom', 0);
			if ((y > -1) && (y < 1)) y *= CmnLib.stageH;
			y = y - b_height;
		}
		else if ('s_bottom' in hArg) {
			y = CmnLib.argChk_Num(hArg, 's_bottom', 0);
			if ((y > -1) && (y < 1)) y *= CmnLib.stageH;
			y = CmnLib.stageH - y - b_height;
		}
		ret.y = int( ((ret.scale.y < 0) ?y +b_height :y)
			* CmnLib.retinaRate );

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
		if (pos == 'stay') return;
		if (base == null) throw 'setXYByPos base == null';
		if (ret == null) throw 'setXYByPos result == null';

		const rct_base = base.getBounds();
		const r_absclX = (ret.scale.x < 0)? -ret.scale.x : ret.scale.x;
		const b_width = (r_absclX == 1)? rct_base.width : rct_base.width *r_absclX;
		const r_absclY = (ret.scale.y < 0)? -ret.scale.y : ret.scale.y;
		const b_height = (r_absclY == 1)? rct_base.height: rct_base.height*r_absclY;

		let c = 0;	// 忘れたけど、プルプルするからintなんだっけ
		if (! pos || pos == 'c') {c = CmnLib.stageW *0.5;}
		else if (pos == 'r') {c = CmnLib.stageW - b_width *0.5;}
		else if (pos == 'l') {c = b_width *0.5;}
		else {c = int(pos) *CmnLib.retinaRate;}

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
