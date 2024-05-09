/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, int, argChk_Boolean, argChk_Num, uint} from './CmnLib';
import {HArg} from './Grammar';
import {IMakeDesignCast} from './LayerMng';

import {BLEND_MODES, DisplayObject, Container, Sprite, Texture, AbstractRenderer, filters, Filter} from 'pixi.js';
const {BlurFilter, ColorMatrixFilter, NoiseFilter} = filters;

export class Layer {
				layname	= '';
	protected	name_	= '';
	set name(nm) {this.name_ = nm}
	get name() {return this.name_}
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
	set x(v) {this.procSetX(v); this.spLay.x = v}
		protected	procSetX(_x: number) {}	// set を override できないので
	get	y() {return this.spLay.y}
	set y(v) {this.procSetY(v); this.spLay.y = v}
		protected	procSetY(_y: number) {}	// set を override できないので

	destroy() {}

	lay(hArg: HArg): boolean {
		const s = this.spLay;
		if ('alpha' in hArg) s.alpha = argChk_Num(hArg, 'alpha', 1);

		Layer.setBlendmode(s, hArg);

		if ('pivot_x' in hArg || 'pivot_y' in hArg) s.pivot.set(
			argChk_Num(hArg, 'pivot_x', s.pivot.x),
			argChk_Num(hArg, 'pivot_y', s.pivot.y)
		);

		if ('rotation' in hArg) s.angle = argChk_Num(hArg, 'rotation', 0);
			// flash : rotation is in degrees.
			// pixijs: rotation is in radians, angle is in degrees.

		if ('scale_x' in hArg || 'scale_y' in hArg) s.scale.set(
			argChk_Num(hArg, 'scale_x', s.scale.x),
			argChk_Num(hArg, 'scale_y', s.scale.y)
		);

		if ('visible' in hArg) s.visible = argChk_Boolean(hArg, 'visible', true);

		if ('filter' in hArg) {
			s.filters = [Layer.bldFilters(hArg)];
			this.aFltHArg = [hArg];
		}

		return false;
	}
	aFltHArg: HArg[]	= [];

	/*
	* 現状未サポート
		* FXAAFilter		geeks3d.com のコードに基づいた基本的な FXAA (高速近似アンチエイリアシング) の実装ですが、WebGL でサポートされていないため、texture2DLod 要素が削除されたという変更が加えられています。
		* 	https://pixijs.download/v6.5.10/docs/PIXI.filters.FXAAFilter.html
		* DisplacementFilter	指定されたテクスチャ (ディスプレイスメント マップと呼ばれる) のピクセル値を使用して、オブジェクトのディスプレイスメントを実行します。
		* 	https://pixijs.download/v6.5.10/docs/PIXI.filters.DisplacementFilter.html
		* 		人形城のヒビキとかのやつ？
	*/
	// フィルター生成
	static	bldFilters(hArg: HArg): Filter {
		const {filter=''} = hArg;
		const fnc = Layer.hBldFilter[filter];
		if (! fnc) throw 'filter が異常です';

		const f = fnc(hArg);
		f.enabled = argChk_Boolean(hArg, 'enable_filter', true);
		const {blendmode} = hArg;	// フィルターのブレンドモード
		if (blendmode) f.blendMode = Layer.getBlendmodeNum(blendmode);
		return f;
	}
	// https://github.com/pixijs/filters
	static	readonly	hBldFilter: {[nm: string]: (hArg: HArg)=> Filter} = {
		// https://pixijs.download/v6.5.10/docs/PIXI.filters.BlurFilter.html
		blur: hArg=> {	// ガウスぼかし
			const f = new BlurFilter(
				argChk_Num(hArg, 'strength', 8),	// 強さ
				argChk_Num(hArg, 'quality', 4),		// 品質
				'resolution' in hArg ?argChk_Num(hArg, 'resolution', 0) :undefined,							// 解像度
				argChk_Num(hArg, 'kernel_size', 5),	// カーネルサイズ。値は 5、7、9、11、13、15。
			);
			f.blurX = uint(argChk_Num(hArg, 'blur_x', 2));	// X強度
			f.blurY = uint(argChk_Num(hArg, 'blur_y', 2));	// Y強度
	//略	f.quality = uint(argChk_Num(hArg, 'quality', 1));
				// ブラーのパス数。パス数が多いほど、ブラーの品質が高くなります。
			f.repeatEdgePixels = argChk_Boolean(hArg, 'repeat_edge_pixels', false);	// true に設定すると、ターゲットのエッジがクランプされます。
			return f;
		},

		// https://pixijs.download/v6.5.10/docs/PIXI.filters.NoiseFilter.html
		noise: hArg=> new NoiseFilter(	// ノイズエフェクト
			argChk_Num(hArg, 'noise', 0.5),
				// 適用するノイズの量。この値は (0, 1] の範囲内
			'seed' in hArg ?argChk_Num(hArg, 'seed', 0) :undefined,
				// ランダム ノイズの生成に適用するシード値。 Math.random() を使用するのが適切な値です。
		),

		// https://pixijs.download/v6.5.10/docs/PIXI.filters.ColorMatrixFilter.html
		color_matrix: hArg=> {	// カラーマトリックス
				// displayObject 上のすべてのピクセルの RGBA カラーとアルファ値に 5x4 マトリックス変換を適用して、新しい RGBA カラーとアルファ値のセットを含む結果を生成できます。 かなり強力ですよ！
			const f = new ColorMatrixFilter;
			f.alpha = uint(argChk_Num(hArg, 'alpha', 1));
			
			const {matrix=''} = hArg;
			if (matrix) {
				const m = matrix.split(',');
				const len = m.length;
				if (len !== 20) throw `matrix の個数（${len}）が 20 ではありません`;
				m.forEach((v, i)=> f.matrix[i] = uint(v));
			}
			else {
				f.matrix[0] = uint(argChk_Num(hArg, 'rtor', 1));
				f.matrix[1] = uint(argChk_Num(hArg, 'gtor', 0));
				f.matrix[2] = uint(argChk_Num(hArg, 'btor', 0));
				f.matrix[3] = uint(argChk_Num(hArg, 'ator', 0));
				f.matrix[4] = uint(argChk_Num(hArg, 'pr', 0));
				f.matrix[5] = uint(argChk_Num(hArg, 'rtog', 0));
				f.matrix[6] = uint(argChk_Num(hArg, 'gtog', 1));
				f.matrix[7] = uint(argChk_Num(hArg, 'btog', 0));
				f.matrix[8] = uint(argChk_Num(hArg, 'atog', 0));
				f.matrix[9] = uint(argChk_Num(hArg, 'pg', 0));
				f.matrix[10] = uint(argChk_Num(hArg, 'rtob', 0));
				f.matrix[11] = uint(argChk_Num(hArg, 'gtob', 0));
				f.matrix[12] = uint(argChk_Num(hArg, 'btob', 1));
				f.matrix[13] = uint(argChk_Num(hArg, 'atob', 0));
				f.matrix[14] = uint(argChk_Num(hArg, 'pb', 0));
				f.matrix[15] = uint(argChk_Num(hArg, 'rtoa', 0));
				f.matrix[16] = uint(argChk_Num(hArg, 'gtoa', 0));
				f.matrix[17] = uint(argChk_Num(hArg, 'btoa', 0));
				f.matrix[18] = uint(argChk_Num(hArg, 'atoa', 1));
				f.matrix[19] = uint(argChk_Num(hArg, 'pa', 0));
			}
			return f;
		},
		black_and_white: hArg=> {	// 白黒
			const f = new ColorMatrixFilter;
			f.blackAndWhite(
				argChk_Boolean(hArg, 'multiply', false),
					// true の場合、現在の行列と行列を乗算
			);
			return f;
		},
		brightness: hArg=> {	// 明るさを調整
			const f = new ColorMatrixFilter;
			f.brightness(
				argChk_Num(hArg, 'b', 0.5),
					// 明るさの値 (0 ～ 1、0 は黒)
				argChk_Boolean(hArg, 'multiply', false),
					// true の場合、現在の行列と行列を乗算
			);
			return f;
		},
		browni: hArg=> {	// おいしいブラウニー
			const f = new ColorMatrixFilter;
			f.browni(
				argChk_Boolean(hArg, 'multiply', true),
					// true の場合、現在の行列と行列を乗算
			);
			return f;
		},
		color_tone: hArg=> {	// カラートーン。グラデーション マップのようなもので、正確に何をするのかはわかりませんが、遊んでみると面白いです。
			const f = new ColorMatrixFilter;
			f.colorTone(
				argChk_Num(hArg, 'desaturation', 0.5),
				argChk_Num(hArg, 'toned', 0.5),
				argChk_Num(hArg, 'light_color', 0xFFE580),
				argChk_Num(hArg, 'dark_color', 0xFFE580),
				argChk_Boolean(hArg, 'multiply', false),
					// true の場合、現在の行列と行列を乗算
			);
			return f;
		},
		contrast: hArg=> {	// コントラスト マトリクスを設定し、暗い部分と明るい部分の分離を増やします。 コントラストを上げる : シャドウをより暗くし、ハイライトをより明るくします。 コントラストを下げる : シャドウを上げ、ハイライトを下げます。
			const f = new ColorMatrixFilter;
			f.contrast(
				argChk_Num(hArg, 'amount', 0.5),
					// コントラストの値 (0-1)
				argChk_Boolean(hArg, 'multiply', false),
					// true の場合、現在の行列と行列を乗算
			);
			return f;
		},
		grayscale: hArg=> {	// グレースケール
			const f = new ColorMatrixFilter;
			f.grayscale(
				argChk_Num(hArg, 'scale', 0.5),
					// グレーの値 (0 ～ 1、0 は黒)
				argChk_Boolean(hArg, 'multiply', false),
					// true の場合、現在の行列と行列を乗算
			);
			return f;
		},
		hue: hArg=> {	// 色相
			const f = new ColorMatrixFilter;
			f.hue(
				argChk_Num(hArg, 'f_rotation', 90),	// 0だと変化なしで分かりづらいので
					// 度単位
				argChk_Boolean(hArg, 'multiply', false),
					// true の場合、現在の行列と行列を乗算
			);
			return f;
		},
		kodachrome: hArg=> {	// コダクローム。1935 年に Eastman Kodak によって導入されたカラー リバーサル フィルム。(Dominic Szablewski に感謝)
			const f = new ColorMatrixFilter;
			f.kodachrome(
				argChk_Boolean(hArg, 'multiply', true),
					// true の場合、現在の行列と行列を乗算
			);
			return f;
		},
		lsd: hArg=> {	// LSD効果、現在の行列を乗算します
			const f = new ColorMatrixFilter;
			f.lsd(
				argChk_Boolean(hArg, 'multiply', false),
					// true の場合、現在の行列と行列を乗算
			);
			return f;
		},
		negative: hArg=> {	// ネガティブ画像 (古典的なRGBマトリックスの逆)
			const f = new ColorMatrixFilter;
			f.negative(
				argChk_Boolean(hArg, 'multiply', false),
					// true の場合、現在の行列と行列を乗算
			);
			return f;
		},
		night: hArg=> {	// ナイトエフェクト
			const f = new ColorMatrixFilter;
			f.night(
				argChk_Num(hArg, 'intensity', 0.5),
					// 夜の効果の強さ
				argChk_Boolean(hArg, 'multiply', false),
					// true の場合、現在の行列と行列を乗算
			);
			return f;
		},
		polaroid: hArg=> {	// ポラロイド
			const f = new ColorMatrixFilter;
			f.polaroid(
				argChk_Boolean(hArg, 'multiply', false),
					// true の場合、現在の行列と行列を乗算
			);
			return f;
		},
		predator: hArg=> {	// 捕食者効果、新しい独立したマトリックスを設定して現在のマトリックスを消去します
			const f = new ColorMatrixFilter;
			f.predator(
				argChk_Num(hArg, 'amount', 0.5),
					// 捕食者は自分の将来の犠牲者をどれほど感じているか
				argChk_Boolean(hArg, 'multiply', false),
					// true の場合、現在の行列と行列を乗算
			);
			return f;
		},
		saturate: hArg=> {	// 彩度。色の間の分離を増やします。 彩度を増やす: コントラスト、明るさ、シャープネスを増やします。
			const f = new ColorMatrixFilter;
			f.saturate(
				argChk_Num(hArg, 'amount', 0.5),
					// 飽和量(0～1)
				argChk_Boolean(hArg, 'multiply', false),
					// true の場合、現在の行列と行列を乗算
			);
			return f;
		},
		sepia: hArg=> {		// セピア
			const f = new ColorMatrixFilter;
			f.sepia(
				argChk_Boolean(hArg, 'multiply', false),
					// true の場合、現在の行列と行列を乗算
			);
			return f;
		},
		technicolor: hArg=> {	// テクニカラー。1916 年に発明されたカラー動画プロセス (Dominic Szablewski に感謝)
			const f = new ColorMatrixFilter;
			f.technicolor(
				argChk_Boolean(hArg, 'multiply', true),
					// true の場合、現在の行列と行列を乗算
			);
			return f;
		},
		tint: hArg=> {	// 色合い。カラー マトリクスの対角線上に各チャネルを設定します。 これを使用すると、スプライト、テキスト、グラフィックス、メッシュなどの一部の表示オブジェクトの色合いフィールドと同様の色合い効果をコンテナ上で実現できます。
			const f = new ColorMatrixFilter;
			f.tint(
				argChk_Num(hArg, 'f_color', 0x888888),
					// 色合いの色。 これは 16 進数値です。
				argChk_Boolean(hArg, 'multiply', false),
					// true の場合、現在の行列と行列を乗算
			);
			return f;
		},
		to_bgr: hArg=> {	// 赤→青、青→赤
			const f = new ColorMatrixFilter;
			f.toBGR(
				argChk_Boolean(hArg, 'multiply', false),
					// true の場合、現在の行列と行列を乗算
			);
			return f;
		},
		vintage: hArg=> {	// ビンテージ
			const f = new ColorMatrixFilter;
			f.vintage(
				argChk_Boolean(hArg, 'multiply', true),
					// true の場合、現在の行列と行列を乗算
			);
			return f;
		},
	};

	static	setBlendmode(cnt: Container, hArg: HArg) {
		const {blendmode} = hArg;
		if (! blendmode) return;	// 省略時になにもしない

		const bmn = Layer.getBlendmodeNum(blendmode);
		if (cnt instanceof Sprite) cnt.blendMode = bmn;
		for (const c of cnt.children) {
			if (c instanceof Sprite) c.blendMode = bmn;
		}
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
	get containMovement(): boolean {return false}

	renderStart() {}
	renderEnd() {}

	clearLay(hArg: HArg): void {
		this.spLay.alpha = 1;
		this.spLay.blendMode = BLEND_MODES.NORMAL;
		// visibleは触らない
		this.spLay.pivot.set(0, 0);
		this.spLay.angle = 0;
		this.spLay.scale.set(1, 1);
		if (argChk_Boolean(hArg, 'clear_filter', false)) {
			this.spLay.filters = null;
			this.aFltHArg = [];
		}
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
		aFltHArg: this.aFltHArg,
	}}
	playback(hLay: any, _aPrm: Promise<void>[]): void {
		this.name = hLay.name;
		//idx	// コール順に意味があるので親でやる

		this.clearLay({clear_filter: true});
		this.spLay.alpha = hLay.alpha;
		this.spLay.blendMode = hLay.blendMode;
		this.spLay.angle = hLay.rotation;
		this.spLay.scale.set(hLay.scale_x, hLay.scale_y);
		this.spLay.pivot.set(hLay.pivot_x, hLay.pivot_y);
		this.spLay.position.set(hLay.x, hLay.y);
		this.spLay.visible = hLay.visible;

		this.aFltHArg = hLay.aFltHArg ?? [];
		this.spLay.filters = (this.aFltHArg.length === 0)
			? null
			: this.aFltHArg.map(f=> Layer.bldFilters(f));
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
		return ` "idx":${this.spLay.parent.getChildIndex(this.spLay)
		}, "visible":"${this.spLay.visible
		}", "left":${this.spLay.x}, "top":${this.spLay.y
		}, "alpha":${this.spLay.alpha}, "rotation":${this.spLay.angle
//		}, "blendMode":${this.spLay.blendMode
		}, "name":"${this.name_}", "scale_x":${this.spLay.scale.x
		}, "scale_y":${this.spLay.scale.y
		}, "filters": [${this.aFltHArg.map(f=> `"${f.filter}"`).join(',')}]`;
	}

	static	setXY(base: DisplayObject, hArg: HArg, ret: Container, isGrp = false, isButton = false): void {
		if (hArg.pos) {Layer.setXYByPos(base, hArg.pos, ret); return}

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
		if (! pos || pos === 'c') {c = CmnLib.stageW *0.5}
		else if (pos === 'r') {c = CmnLib.stageW - b_width *0.5}
		else if (pos === 'l') {c = b_width *0.5}
		else {c = int(pos)}

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
