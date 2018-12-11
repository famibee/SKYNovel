/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, IHTag, IVariable, IMain, IEvtMng, getDateStr, uint, HArg} from './CmnLib';
import {Pages} from './Pages';
import {GrpLayer} from './GrpLayer';
import {TxtLayer} from './TxtLayer';
import {ThreeDLayer} from './ThreeDLayer';
import {Config} from './Config';
import {ScriptIterator} from './ScriptIterator';
import {SoundMng} from './SoundMng';
import {SysBase} from './SysBase';

import TWEEN = require('@tweenjs/tween.js');
import { Layer } from './Layer';
import { Container, Application, autoDetectRenderer, Graphics, Texture, Filter, RenderTexture, Sprite, DisplayObject } from 'pixi.js';
import { EventListenerCtn } from './EventListenerCtn';

interface ITwInf {
	tw			: TWEEN.Tween;
	resume		: boolean;
	onComplete?	: ()=> void;
};

export class LayerMng {
	private	stage	: Container	= null;
	private fore	= new Container;
	private back	= new Container;

	constructor(private cfg: Config, private hTag: IHTag, private appPixi: Application, private val: IVariable, private main: IMain, private scrItr: ScriptIterator, private soundMng: SoundMng, private sys: SysBase) {
		TxtLayer.init(cfg, hTag, val);
		GrpLayer.init(main, cfg);
		ThreeDLayer.init(cfg);

		//	システム
		hTag.snapshot		= o=> this.snapshot(o);		// スナップショット
		hTag.loadplugin		= o=> this.loadplugin(o);	// プラグインの読み込み
		hTag.set_focus		= o=> this.set_focus(o);	// フォーカス移動

		//	レイヤ共通
		hTag.add_lay		= o=> this.add_lay(o);		// レイヤを追加する
		hTag.lay			= o=> this.lay(o);			// レイヤ設定
		hTag.clear_lay		= o=> this.clear_lay(o);	// レイヤ設定の消去
		hTag.trans			= o=> this.trans(o);		// ページ裏表を交換
		hTag.wt				= o=> this.wt(o);			// トランス終了待ち
		hTag.finish_trans	= ()=> this.finish_trans();	// トランス強制終了

		hTag.quake			= o=> this.quake(o);		// 画面を揺らす
		hTag.wq				= hTag.wt;					// 画面揺らし終了待ち
		hTag.stop_quake		= hTag.finish_trans;		// 画面揺らし中断

		hTag.tsy			= o=> this.tsy(o);			// トゥイーン開始
		hTag.wait_tsy		= o=> this.wait_tsy(o);		// トゥイーン終了待ち
		hTag.stop_tsy		= o=> this.stop_tsy(o);		// トゥイーン中断
		hTag.pause_tsy		= o=> this.pause_tsy(o);	// 一時停止
		hTag.resume_tsy		= o=> this.resume_tsy(o);	// 一時停止再開

		//	文字・文字レイヤ
//		hTag.auto_pager		= o=> this.auto_pager(o);	// 自動改ページの設定
		//hTag.autowc		= o=> this.autowc(o);		// 文字ごとのウェイト
		hTag.ch				= o=> this.ch(o);			// 文字を追加する
		hTag.clear_text		= o=> this.clear_text(o);	// 文字消去
		hTag.current		= o=> this.current(o);		// デフォルト文字レイヤ設定
		hTag.endlink		= ()=> this.endlink();		// ハイパーリンクの終了
		hTag.er				= o=> this.er(o);			// ページ両面の文字消去
		hTag.graph			= o=> this.graph(o);		// インライン画像表示
		hTag.link			= o=> this.link(o);			// ハイパーリンク
		hTag.r				= o=> this.r(o);			// 改行
		hTag.rec_r			= ()=> this.rec_r();		// 履歴改行
		hTag.rec_ch			= o=> this.rec_ch(o);		// 履歴書き込み
		hTag.reset_rec		= o=> this.reset_rec(o);	// 履歴リセット
		//hTag.ruby			= o=> this.ruby(o);			// 直前一文字のルビ設定
			// タグでは無く、「｜＠《》」というスクリプト書き換えで良い
			// というか、廃止で良い。
		hTag.ruby2			= o=> this.ruby2(o);		// 文字列と複数ルビの追加
		hTag.span			= o=> this.span(o);			// インラインスタイル設定
		hTag.tcy			= o=> this.tcy(o);			// 縦中横を表示する

		//	画像・画像レイヤ
		hTag.add_face		= o=> GrpLayer.add_face(o);	// 差分画像の追加
/*		hTag.let_face_frame	= o=> this.let_face_frame(o);
														// 差分SWFの現在フレーム番号
		hTag.let_face_totalframes	= o=> this.let_face_totalframes(o);
														// 差分SWFのフレーム総数
		hTag.play_face		= o=> this.play_face(o);	// 差分SWFの再生開始
		hTag.stop_face		= o=> this.stop_face(o);	// 差分SWFの再生停止
		hTag.wa				= o=> this.wa(o);			// SWFアニメの停止待ち
*/
		//	ムービーレイヤ
//		hTag.wv				= o=> this.wv(o);			// ムービー再生終了待ち

		//	デバッグ・その他
		hTag.dump_lay		= o=> this.dump_lay(o);		// レイヤのダンプ

		//	イベント
		hTag.enable_event	= o=> this.enable_event(o);	// イベント有無の切替

		//	ラベル・ジャンプ
		hTag.button			= o=> this.button(o);		// ボタンを表示


		if (cfg.existsBreakline) this.breakLine = ()=> this.cmdTxt('grp｜{"id":"break","pic":"breakline"}');
		if (cfg.existsBreakpage) this.breakPage = ()=> this.cmdTxt('grp｜{"id":"break","pic":"breakpage"}');

		const grp = new Graphics;
		grp.beginFill(cfg.oCfg.init.bg_color, 1);	// イベントを受け取るためにも塗る
		grp.lineStyle(0, cfg.oCfg.init.bg_color);
		grp.drawRect(0, 0, CmnLib.stageW, CmnLib.stageH);
		grp.endFill();
		this.fore.addChild(grp.clone());
		this.back.addChild(grp);
		this.back.visible = false;

		this.stage = this.appPixi.stage;
		this.stage.addChild(this.back);
		this.stage.addChild(this.fore);
		this.stage.addChild(this.spTransBack);
		this.stage.addChild(this.spTransFore);

		this.appPixi.ticker.add(this.fncTicker);	// TWEEN 更新
/*
		console.group('new DispMng info');
		console.info(this.appPixi.renderer);
		console.info('utils.isMobile():'+ utils.isMobile.any);
				// https://github.com/kaimallea/isMobile
		console.info('utils.isWebGLSupported():'+ utils.isWebGLSupported());
		console.info('w:%O: h:%O:', CmnLib.stageW, CmnLib.stageH);
		console.groupEnd();
*/
	}
	private fncTicker = ()=> {TWEEN.update()};

	private evtMng	: IEvtMng	= null;
	setEvtMng(evtMng: IEvtMng) {this.evtMng = evtMng;}

	destroy() {
		GrpLayer.destroy();
		TxtLayer.destroy();

		TWEEN.removeAll();
		this.appPixi.ticker.remove(this.fncTicker);
		this.stage = null;
		this.evtMng = null;
		LayerMng.$msecChWait = 10;
		for (const pg in this.hPages) this.hPages[pg].destroy();
	}


	recordAMF(hArg :HArg, o: any) {
///
		;
	}


	private cmdTxt(cmd: string, $tl: TxtLayer = undefined, record = true): void {
		const tl = $tl || this.getCurrentTxtlayForeNeedErr();
		if (! tl) return;
		tl.tagCh('｜　《'+ cmd +'》');

		// TODO: record
	}
	goTxt = ()=> {};
	breakLine = ()=> {};
	breakPage = ()=> {};
	clearBreak() {
		const tl = this.getCurrentTxtlayFore();
		if (! tl) return;

		this.clearBreak = ()=> this.cmdTxt('del｜break');
		this.clearBreak();
	}

	clickTxtLay(): boolean {	// true is stay
		const tl = this.getCurrentTxtlayFore();
		if (! tl) return true;

		return tl.click();
	}


//	//	システム
	private snapshot(hArg) {
		// qualityはない？
		// pathdlg 保存場所をGUIで選べるダイアログを表示するか
		const ext = hArg.format || 'jpg';
		const b_color = hArg.b_color || this.cfg.oCfg.init.bg_color;
		const renderer = autoDetectRenderer(
			CmnLib.argChk_Num(hArg, 'width', CmnLib.stageW),
			CmnLib.argChk_Num(hArg, 'height', CmnLib.stageH),
			{
				transparent: (b_color > 0x1000000) && (ext == 'png'),
				antialias: CmnLib.argChk_Boolean(hArg, 'smoothing', false),
				preserveDrawingBuffer: true,
				backgroundColor: uint(b_color) & 0xFFFFFF,
			}
		);
		if (this.twInfTrans.tw != null) {	// [trans]中
			this.back.visible = true;
			for (const lay of this.aBackTransAfter) {
				renderer.render(lay, undefined, false);
			}
			this.back.visible = false;
			this.spTransBack.visible = true;

			this.fore.filters = this.spTransFore.filters;
			this.fore.visible = true;
			renderer.render(this.fore, undefined, false);
			this.fore.visible = false;
			this.fore.filters = [];
		}
		else for (const v of this.getLayers(hArg.layer)) renderer.render(
			this.hPages[v][(hArg.page != 'back') ?'fore' :'back'].cnt,
			undefined, false
		);
		this.sys.savePic(
			this.sys.path_desktop + (hArg.fn || 'snapshot'+ getDateStr('-', '_', '', '_'))+ '.'+ ext,
			renderer.view.toDataURL('image/'+ (ext == 'png' ?'png' :'jpeg'))
		);
		renderer.destroy(true);

		return false;
	};

	// プラグインの読み込み
	private loadplugin(hArg) {
		const fn = hArg.fn;
		if (! fn) throw('fnは必須です');
		const join = CmnLib.argChk_Boolean(hArg, 'join', true);

		switch (CmnLib.getExt(fn)) {
			case 'css':		// 読み込んで<style>に追加
				fetch(fn)
				.then(response=> {
					if (response.ok) return response.text();
					throw new Error('Network response was not ok.');
				})
				.then(text=> {
					TxtLayer.addStyle(text);
					if (join) this.main.resume();
				});
				break;

			default:	throw 'サポートされない拡張子です'
		}

	//	[loadplugin fn=plg*]のようにワイルドカードをサポート。
	//	マッチするプラグインを順不同に読み込む。読み込み済みなら無視。

		return join;
	}

	protected set_focus(hArg) {	// フォーカス移動
		const to = hArg.to;
		if (! to) throw '[set_focus] toは必須です';
return false;	//=====
		if (to == 'null') {
//			stage.focus = stage;
			return false;
		}
/*
		const vct:Vector.<InteractiveObject>
			= new Vector.<InteractiveObject>;
		trans.foreachLayers(hArg, function (name:String, pg:Pages):void {
			const tf:TxtLayer = pg.getPage(hArg) as TxtLayer;
			if (! tf) return;
			if (! tf._visible) return;
			if (! tf.enabled) return;

			const vct_tl:Vector.<InteractiveObject> = tf.getButton();
			const len_tl:uint = vct_tl.length;
			for (var j:uint=0; j<len_tl; ++j) vct.push(vct_tl[j]);
		});

		const len = vct.length;
		if (len == 0) return false;

		if (stage.focus == stage) {
			stage.focus = vct[0];
			return false;
		}

		if (to == 'next' || to == 'prev') {
			for (var i:uint=0; i<len; ++i) {
				if (stage.focus != vct[i]) continue;
				stage.focus = vct[(i +(to == 'next' ?1 :len-1))% len];
				break;
			}

			return false;
		}

		var numTo:Number = parseInt(to);
		if (isNaN(numTo)) return false;
		numTo = uint(numTo);
		if (numTo < 0 || numTo >= len) return false;

		stage.focus = vct[numTo];
*/
		return false;
	}


//	//	レイヤ共通
	// レイヤを追加する
	private add_lay(hArg) {
		const layer = hArg.layer;
		if (! layer) throw 'layerは必須です';
		if (layer.indexOf(',') != -1) throw 'layer名に「,」は使えません';
		if (layer in this.hPages) throw 'layer【'+ layer+'】は定義済みです';
		this.aLayName.push(layer);

		const cls = hArg.class;
		if (! cls) throw 'classは必須です';
		//console.log(`[add_lay] layer:${layer}: cls:${cls}:`);
		let fore: Layer | null = null;
		let back: Layer | null = null;
		switch (cls) {
		case 'grp':	fore = new GrpLayer;	back = new GrpLayer;	break;
		case 'txt':	fore = new TxtLayer;	back = new TxtLayer;	break;
		case '3d':	fore = new ThreeDLayer;	back = new ThreeDLayer;	break;
		default:	throw '属性 class【'+ cls +'】が不正です';
		}
		const pg = this.hPages[layer] = new Pages(layer, cls, {fore: fore, back: back});
		this.fore.addChild(fore.cnt);
		this.back.addChild(back.cnt);
		fore.cnt.visible =
		back.cnt.visible = CmnLib.argChk_Boolean(hArg, 'visible', true);
			// SKYNovelでは基本 visible = true とする。
		fore.name = `layer:${layer} cls:${cls} page:A`;
		back.name = `layer:${layer} cls:${cls} page:B`;
		switch (cls) {
		case 'txt':
			if (! this.strTxtlay) {
				this.fncChkTxtLay = ()=> {};
				this.hTag.current({layer: layer});	// hPages更新後でないと呼べない
				this.goTxt = ()=> {
					if (this.val.getVal('tmp:sn.skip.enabled')) {
						LayerMng.$msecChWait = 0;
					}
					else {
						this.setNormalWaitTxtLayer();
					}
					for (const name of this.getLayers()) {
						const pg = this.hPages[name];
						if (! (pg.fore instanceof TxtLayer)) continue;
						this.cmdTxt('gotxt｜', pg.fore as TxtLayer, false);
					}
				}
			}

			this.val.setVal_Nochk(
				'save',
				'const.sn.layer.'+ (layer || this.strTxtlay) + '.enabled',
				true);
			break;
		}
/*
		fncLetAs(hArg);
		fncReCover();
*/
		// 組み込み変数
		const valnm = `const.sn.lay.${layer}`;
		this.val.setVal_Nochk('tmp', valnm, true);
		this.val.defTmp(valnm +'.fore.alpha', ()=> pg.fore.alpha);
		this.val.defTmp(valnm +'.back.alpha', ()=> pg.back.alpha);
		this.val.defTmp(valnm +'.fore.height', ()=> pg.fore.height);
		this.val.defTmp(valnm +'.back.height', ()=> pg.back.height);
		this.val.defTmp(valnm +'.fore.visible', ()=> pg.fore.cnt.visible);
		this.val.defTmp(valnm +'.back.visible', ()=> pg.back.cnt.visible);
		this.val.defTmp(valnm +'.fore.width', ()=> pg.fore.width);
		this.val.defTmp(valnm +'.back.width', ()=> pg.back.width);

		return false;
	}
	private hPages		: {[name: string]: Pages} = {};	// しおりLoad時再読込
	private aLayName	: string[]	= [];	// 最適化用
	private strTxtlay = '';

	private lay(hArg): boolean {
		// Trans
		const layer = this.argChk_layer(hArg);
		const pg = this.hPages[layer];
		const back = pg.back.cnt;
		const fore = pg.fore.cnt;
		if (CmnLib.argChk_Boolean(hArg, 'float', false)) {
			this.back.setChildIndex(back, this.back.children.length -1);
			this.fore.setChildIndex(fore, this.fore.children.length -1);
			this.rebuildLayerRankInfo();
		}
		else if (hArg.index) {
			if (CmnLib.argChk_Num(hArg, 'index', 0)) {
				this.back.setChildIndex(back, uint(hArg.index));
				this.fore.setChildIndex(fore, uint(hArg.index));
				this.rebuildLayerRankInfo();
			}
		}
		else if (hArg.dive) {
			const dive = hArg.dive;
			let idx_dive = 0;
			if (layer == dive) throw('[lay] 属性 layerとdiveが同じ【'+ dive +'】です');

			const pg_dive = this.hPages[dive];
			if (! pg_dive) throw('[lay] 属性 dive【'+ dive +'】が不正です。レイヤーがありません');
			const back_dive = pg_dive.back;
			const fore_dive = pg_dive.fore;
			const idx_back_dive = this.back.getChildIndex(back_dive.cnt);
			const idx_fore_dive = this.fore.getChildIndex(fore_dive.cnt);
			idx_dive = (idx_back_dive < idx_fore_dive) ?idx_back_dive :idx_fore_dive;
			if (idx_dive > this.back.getChildIndex(back)) --idx_dive;	//自分が無くなって下がる分下げる

			this.fore.setChildIndex(fore, idx_dive);
			this.back.setChildIndex(back, idx_dive);
			this.rebuildLayerRankInfo();
		}

		return pg.lay(hArg);
	}
	private rebuildLayerRankInfo() {this.aLayName = this.sortLayers();}

	// レイヤ設定の消去
	private clear_lay(hArg) {
		this.foreachLayers(hArg, name=> {
			//if (name == this.strTxtlay && hArg.page != 'back') this.recText('\f');
				// 改ページ
			const pg = this.hPages[this.argChk_layer({layer: name})];
			if (hArg.page == 'both') {	// page=both で両面削除
				pg.fore.clearLay(hArg);
				pg.back.clearLay(hArg);
			}
			else {
				pg.getPage(hArg).clearLay(hArg);
			}
		});

		return false;
	}

	private	srcRuleTransFragment = `
precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform sampler2D rule;
uniform float vague;
uniform float tick;

void main(void) {
	vec4 fg = texture2D(uSampler, vTextureCoord);
	vec4 ru = texture2D(rule, vTextureCoord);

	float v = ru.r - tick;
	if (abs(v) < vague) {
		float grd = 0.5 -v /vague *0.5;
		float f_a = fg.a *(1.0 -grd);

		gl_FragColor.rgb = fg.rgb *f_a;
		gl_FragColor.a = f_a;
	}
	else {
		gl_FragColor = (v >= 0.0)? fg : vec4(0);
	}
}`;
	private ufRuleTrans = {
//		back : {type: 'sampler2D', value: Texture.EMPTY},
		rule : {type: 'sampler2D', value: Texture.EMPTY},
		vague : {type: '1f', value: 0.0},
		tick : {type: '1f', value: 0.0},
		resolution : {type: '2f', value: [0, 0]},
	};
	private fltRule = new Filter(undefined, this.srcRuleTransFragment, this.ufRuleTrans);

	private rtTransBack = RenderTexture.create(CmnLib.stageW, CmnLib.stageH);
	private spTransBack = new Sprite(this.rtTransBack);

	private rtTransFore = RenderTexture.create(CmnLib.stageW, CmnLib.stageH);
	private spTransFore = new Sprite(this.rtTransFore);

	private aBackTransAfter	: DisplayObject[] = [];

	// ページ裏表を交換
	private trans(hArg) {
		this.finish_trans();

		const ease = hArg.ease ?CmnLib.hEase[hArg.ease]: TWEEN.Easing.Linear.None;
		if (! ease) throw '異常なease指定です';

		this.aBackTransAfter = [];
		const hTarget: {[ley_nm: string]: boolean} = {};
		for (const v of this.getLayers(hArg.layer)) hTarget[v] = true;
		for (const lay_nm of this.getLayers()) this.aBackTransAfter.push(
			this.hPages[lay_nm][hTarget[lay_nm] ?'back' :'fore'].cnt
		);
		this.rtTransBack.resize(CmnLib.stageW, CmnLib.stageH);
		this.appPixi.renderer.render(this.back, this.rtTransBack);	// clear
		this.rtTransFore.resize(CmnLib.stageW, CmnLib.stageH);
		this.appPixi.renderer.render(this.fore, this.rtTransFore);	// clear
			// ========= スマホ回転対応が要るかも？
		const fncRender = ()=> {
			this.back.visible = true;
			for (const lay of this.aBackTransAfter) {
				this.appPixi.renderer.render(lay, this.rtTransBack, false);
			}
			this.back.visible = false;
			this.spTransBack.visible = true;

			this.fore.visible = true;
			this.appPixi.renderer.render(this.fore, this.rtTransFore);
			this.fore.visible = false;
			this.spTransFore.visible = true;
		};
		// visibleはfncRender()に任せる。でないとちらつく
		//this.back.visible = false;
		//this.fore.visible = false;
		//this.sprRtAtTransBack.visible = true;	// trans中専用back(Render Texture)
		//this.sprRtAtTransFore.visible = true;	// trans中専用fore(Render Texture)
		this.spTransFore.alpha = 1;
		const closeTrans = ()=> {
			this.appPixi.ticker.remove(fncRender);
				// transなしでもadd()してなくても走るが、構わないっぽい。
			this.elcTrans.clear();
			[this.fore, this.back] = [this.back, this.fore];
			for (const lay_name in this.hPages) {
				const pg = this.hPages[lay_name];
				if (hTarget[lay_name]) {pg.transPage(); continue;}

				// transしないために交換する
				const idx = this.fore.getChildIndex(pg.back.cnt);
				this.fore.removeChild(pg.back.cnt);
				this.back.removeChild(pg.fore.cnt);
				this.fore.addChildAt(pg.fore.cnt, idx);
				this.back.addChildAt(pg.back.cnt, idx);
			}
			this.fore.visible = true;
			this.back.visible = false;
			this.spTransBack.visible = false;
			this.spTransFore.visible = false;
			if (this.twInfTrans.resume) this.main.resume();
			this.twInfTrans = {tw: null, resume: false};
		};
		const time = CmnLib.argChk_Num(hArg, 'time', 0);
		if (time == 0 || this.evtMng.isSkipKeyDown()) {closeTrans(); return false;}

		// クロスフェード
		this.twInfTrans = {tw: null, resume: false};
		const is_glsl = 'glsl' in hArg;
		if ((! is_glsl) && ! ('rule' in hArg)) {
			this.spTransFore.filters = [];
			this.twInfTrans.tw = new TWEEN.Tween(this.spTransFore)
				.to({alpha: 0}, time)
				.delay(CmnLib.argChk_Num(hArg, 'delay', 0))
				.easing(ease)
				.onComplete(closeTrans)
				.start();
			this.appPixi.ticker.add(fncRender);
			return false;
		}

		// ルール画像、またはGLSL
		const flt = is_glsl
			? new Filter(undefined, hArg.glsl, this.ufRuleTrans)
			: this.fltRule;
//		flt.uniforms.back = this.rtAtTransBack;
		flt.uniforms.vague = CmnLib.argChk_Num(hArg, 'vague', 0.04);
		flt.uniforms.tick = 0;
		flt.uniforms.resolution = [CmnLib.stageW, CmnLib.stageH];
		this.twInfTrans.tw = new TWEEN.Tween(flt.uniforms)
			.to({tick: 1}, time)
			.delay(CmnLib.argChk_Num(hArg, 'delay', 0))
			.easing(ease)
			.onComplete(closeTrans);
		this.spTransFore.filters = [flt];
		if (is_glsl) {
			this.twInfTrans.tw.start();
			this.appPixi.ticker.add(fncRender);
			return false;
		}

		GrpLayer.ldPic(hArg.rule, tx=> {
			flt.uniforms.rule = tx;
			this.twInfTrans.tw.start();
			this.appPixi.ticker.add(fncRender);
		});
		return false;
	}
	private twInfTrans : ITwInf = {tw: null, resume: false};

	private getLayers(layer = ''): string[] {
		return (layer)? layer.split(',') : this.aLayName;
	}
	private foreachLayers(hArg, fnc: (name: string, $pg: Pages)=> void): string[] {
		const vct = this.getLayers(hArg['layer']);
		for (const name of vct) {
			if (! name) continue;

			const pg = this.hPages[name];
			if (pg == null) throw '存在しないlayer【'+ name +'】です';

			fnc(name, pg);
		}

		return vct;
	}
	private sortLayers(layers = ''): string[] {
		const a = this.getLayers(layers);
		a.sort((a, b)=> {
			const ai = this.fore.getChildIndex(this.hPages[a].fore.cnt);
			const bi = this.fore.getChildIndex(this.hPages[b].fore.cnt);
			if (ai < bi) return -1;
			if (ai > bi) return 1;
			return 0;
		});

		return a;
	}

	private wt(hArg) {
		if (! this.twInfTrans.tw) return false;

		this.twInfTrans.resume = true;
		this.evtMng.waitCustomEvent(hArg, this.elcTrans, ()=> this.finish_trans());
		return true;
	}
	private	elcTrans	= new EventListenerCtn;

	// レイヤのトランジションの停止
	private finish_trans() {
		if (this.twInfTrans.tw) this.twInfTrans.tw.stop().end();
			// stop()とend()は別
		return false;
	}


	// 画面を揺らす
	private quake(hArg) {
		this.finish_trans();
		if (this.val.getVal('tmp:sn.skip.enabled')) return false;
		if (this.evtMng.isSkipKeyDown()) return false;

		const aDo: DisplayObject[] = [];
		for (const lay_nm of this.getLayers(hArg.layer)) {
			aDo.push(this.hPages[lay_nm].fore.cnt);
		}
		this.rtTransFore.resize(CmnLib.stageW, CmnLib.stageH);
			// ========= スマホ回転対応が要るかも？
		const fncRender = ()=> {
			this.fore.visible = true;
			for (const lay of aDo) {
				this.appPixi.renderer.render(lay, this.rtTransFore, false);
			}
			this.fore.visible = false;
		};
		this.spTransFore.visible = true;
		this.spTransFore.alpha = 1;
		const closeTrans = ()=> {
			this.appPixi.ticker.remove(fncRender);
				// transなしでもadd()してなくても走るが、構わないっぽい。
			this.fore.visible = true;
			this.spTransFore.visible = false;
			if (this.twInfTrans.resume) this.main.resume();
			this.twInfTrans = {tw: null, resume: false};
		};

		const ease = hArg.ease ?CmnLib.hEase[hArg.ease]: TWEEN.Easing.Linear.None;
		if (! ease) throw '異常なease指定です';
		const h = uint(CmnLib.argChk_Num(hArg, 'hmax', 10));
		const v = uint(CmnLib.argChk_Num(hArg, 'vmax', 10));
		const fncH = (h == 0)
			? ()=> {}
			: ()=> this.spTransFore.x = Math.round(Math.random()* h*2) -h;
		const fncV = (v == 0)
			? ()=> {}
			: ()=> this.spTransFore.y = Math.round(Math.random()* v*2) -v;
		this.spTransFore.filters = [];
		const repeat = CmnLib.argChk_Num(hArg, 'repeat', 1);
		this.twInfTrans = {tw: null, resume: false};
		this.twInfTrans.tw = new TWEEN.Tween(this.spTransFore)
			.to({x: 0, y: 0}, CmnLib.argChk_Num(hArg, 'time', NaN))
			.delay(CmnLib.argChk_Num(hArg, 'delay', 0))
			.easing(ease)
			.onUpdate(()=> {fncH(); fncV();})
			.repeat(repeat == 0 ?Infinity :(repeat -1))	// 一度リピート→計二回なので
			.yoyo(CmnLib.argChk_Boolean(hArg, 'yoyo', false))
			.onComplete(closeTrans)
			.start();
		this.appPixi.ticker.add(fncRender);

		return false;
	}


	// トゥイーン開始
	private	hMemberCnt	= {
		alpha		:0,
		height		:0,
		rotation	:0,
		scale_x		:0,
		scale_y		:0,
		width		:0,
		x			:0,
		y			:0,
	};			// rotationX〜Z、scaleZ、zは設定すると
				// 三次元方向の拡大縮小ルーチンが働き画像がぼやけるので
				// backlayで設定しない方針
	private	hTwInf	: {[name: string]: ITwInf}	= {};
	private tsy(hArg) {
		if (! hArg.layer) throw('layerは必須です');
		const layer = this.argChk_layer(hArg);
		const foreLay = this.hPages[layer].fore;
		const ease = hArg.ease ?CmnLib.hEase[hArg.ease]: TWEEN.Easing.Linear.None;
		if (! ease) throw '異常なease指定です';

		const hTo = {};
		for (const nm in this.hMemberCnt) {
			if (! (nm in hArg)) continue;

			// {x:500}			X位置を500に
			// {x:'=500'}		現在のX位置に+500加算した位置
			// {x:'=-500'}		現在のX位置に-500加算した位置
			// {x:'250,500'}	+250から＋500までの間でランダムな値をX位置に
			// {x:'=250,500'}	+250から＋500までの間でランダムな値を現在のX位置に加算
			const v = String(hArg[nm]);
			const a = ((v.charAt(0) == '=') ?v.slice(1) :v).split(',');
			const a0 = hTo[nm] = parseFloat(a[0]);
			if (a.length > 1) hTo[nm] += Math.round(Math.random()
				* (parseFloat(a[1]) -a0 +1));
			if (v.charAt(0) == '=') hTo[nm] += parseFloat(foreLay[nm]);	// 相対に
		}

		const repeat = CmnLib.argChk_Num(hArg, 'repeat', 1);
		const tw_nm = hArg.name || hArg.layer;
		const tw = new TWEEN.Tween(foreLay)
			.to(hTo, CmnLib.argChk_Num(hArg, 'time', NaN)
				* (Boolean(this.val.getVal('tmp:sn.skip.enabled')) ?0 :1))
			.delay(CmnLib.argChk_Num(hArg, 'delay', 0))
			.easing(ease)
			.repeat(repeat == 0 ?Infinity :(repeat -1))	// 一度リピート→計二回なので
			.yoyo(CmnLib.argChk_Boolean(hArg, 'yoyo', false))
			.onComplete(()=> {
				const twInf = this.hTwInf[tw_nm];
				if (! twInf) return;
				delete this.hTwInf[tw_nm];
				this.evtMng.popLocalEvts();	// [wait_tsy]したのにキャンセルされなかった場合向け
				if (twInf.resume) this.main.resume();
				if ('onComplete' in twInf) twInf.onComplete();
			});

		if ('chain' in hArg) {
			const twFrom = this.hTwInf[hArg.chain];
			if (! twFrom) throw `${hArg.chain}は存在しない・または終了したトゥイーンです`;
			twFrom.onComplete = ()=> {};
			twFrom.tw.chain(tw);
		}
		else tw.start();

		const arrive = CmnLib.argChk_Boolean(hArg, 'arrive', false);
		const backlay = CmnLib.argChk_Boolean(hArg, 'backlay', false);
		this.hTwInf[tw_nm] = {tw: tw, resume: false, onComplete: ()=> {
			if (arrive) for (const nm in hTo) foreLay[nm] = hTo[nm];
			if (backlay) {
				const backCnt = this.hPages[layer].back.cnt;
				for (const nm in this.hMemberCnt) backCnt[nm] = foreLay[nm];
			}
		}}

		return false;
	}

	// トゥイーン終了待ち
	private wait_tsy(hArg) {
		const twInf = this.hTwInf[hArg.name || hArg.layer];
		if (! twInf) return false;

		twInf.resume = true;
		this.evtMng.stdWait(
			()=> twInf.tw.stop().end(),	// stop()とend()は別
			CmnLib.argChk_Boolean(hArg, 'canskip', true)
		);
		return true;
	}

	// トゥイーン中断
	private stop_tsy(hArg) {
		const twInf = this.hTwInf[hArg.name || hArg.layer];
		if (! twInf) return false;

		twInf.tw.stop().end();	// stop()とend()は別

		return false;
	}

	// 一時停止
	private pause_tsy(hArg) {
		const twInf = this.hTwInf[hArg.name || hArg.layer];
		if (! twInf) return false;

		twInf.tw.stop();

		return false;
	}

	// 一時停止再開
	private resume_tsy(hArg) {
		const twInf = this.hTwInf[hArg.name || hArg.layer];
		if (! twInf) return false;

		twInf.tw.start();

		return false;
	}


	// 文字・文字レイヤ
	private static	$msecChWait		= 10;
	static get msecChWait() {return LayerMng.$msecChWait;}
	static set msecChWait(v) {LayerMng.$msecChWait = v;}
	// 文字を追加する
	private ch(hArg) {
		if (! hArg.text) throw('[ch] textは必須です');

		const tl = this.getTxtLayer(hArg) as TxtLayer;
		const wait = (this.val.getVal('tmp:sn.skip.enabled'))
			? 0
			: CmnLib.argChk_Num(hArg, 'wait', -1);
		if (wait >= 0) this.cmdTxt(`add｜{'wait': ${wait}}`, tl);

		tl.tagCh(hArg.text.replace(/\[r]/g, '\n'));

		if (wait >= 0) this.cmdTxt(`add_close｜`, tl);

		return false;
	};

	private getTxtLayer(hArg): TxtLayer {
		this.fncChkTxtLay();
		const layer = this.argChk_layer(hArg, this.strTxtlay);
		const pg = this.hPages[layer];
		const lay = pg.getPage(hArg);
		const tf = lay as TxtLayer;
		if (! tf) throw layer +'はTxtLayerではありません';

		return tf;
	}
	setNormalWaitTxtLayer(): void {LayerMng.$msecChWait = this.scrItr.normalWait}


	// 操作対象のメッセージレイヤの指定
	private current(hArg) {
		this.fncChkTxtLay();
		const layer = hArg.layer;
		if (! layer) throw('[current] layerは必須です');

		this.pgTxtlay = this.hPages[layer];
		const tf = this.pgTxtlay.getPage(hArg) as TxtLayer;
		if (! tf) throw ''+ layer +'はTxtLayerではありません';

		this.val.setVal_Nochk('save', 'const.sn.mesLayer', this.strTxtlay = layer);

		return false;
	}
	getCurrentTxtlayForeNeedErr(): TxtLayer | undefined {
		this.fncChkTxtLay();
		return this.getCurrentTxtlayFore();
	}
	getCurrentTxtlayFore(): TxtLayer | undefined {
		if (! this.pgTxtlay) return undefined;

		return this.pgTxtlay.fore as TxtLayer;
	}
	private	pgTxtlay: Pages | null	= null;	// カレントテキストレイヤ
	private fncChkTxtLay	: ()=> void	= ()=> {throw '文字レイヤーがありません。文字表示や操作する前に、[add_lay layer=（レイヤ名） class=txt]で文字レイヤを追加して下さい';};

	private argChk_layer(hash, def = ''): string {
		//console.log('[argChk_layer] layer:'+ hash['layer']);
		const v = hash.layer || def;
		if (v.indexOf(',') != -1) throw('layer名に「,」は使えません');
		if (! (v in this.hPages)) throw '属性 layer【'+ v +'】が不正です。レイヤーがありません';

		return hash.layer = v;
	}


	private recText(txt: string): void {
		if (! this.val.getVal('save:sn.doRecLog')) return;

		const sLog = this.recTextSub(
			this.MaxLogLen,
			String(this.val.getVal('save:const.sn.sLog')),
			txt
		);
		this.val.setVal_Nochk('save', 'const.sn.sLog', sLog);
	}
	private	MaxLogLen	= 8192;
	recTextSub(MaxLogLen: number, sLog: string, txt: string): string {
		const ret = (sLog + txt)
			.replace(this.REG_RECTEXTSUB3, '$2')
			.slice(-MaxLogLen)
			.replace(this.REG_RECTEXTSUB2, '');
		const a = ret.match(this.REG_RECTEXTSUB0);
		if (a && (a[0] != '《endlink｜》')) {
			if (ret.search(this.REG_RECTEXTSUB0_B)== -1 ||
				a[0].search(this.REG_RECTEXTSUB0_C)> -1) return ret;

			return ret.replace(this.REG_RECTEXTSUB0_D, '');
		}

		return ret.replace(this.REG_RECTEXTSUB1, '')
	}
	private REG_RECTEXTSUB0		= /《[^》]+?》/;
	private REG_RECTEXTSUB0_B	= /^[《\*]/;
	private REG_RECTEXTSUB0_C	= /^《(grp｜|span｜|del｜)/;
	private REG_RECTEXTSUB0_D	= /^[^》]+?》(\s*\f+)?/;
	private REG_RECTEXTSUB1		= /^(.*?《endlink｜|[^《]*?)》(\s*\f+)?/;
	private REG_RECTEXTSUB2		= /^\s*\f+/;
	private REG_RECTEXTSUB3		= /(｜　《span｜fontFamily="[^\"]*"》)+(｜　《span｜fontFamily="[^\"]*"》)/g;

	public REG_RECTEXT_LAST		= /[^\f]+$/;


	private clear_text(hArg) {
		const tf = this.getTxtLayer(hArg);
		if (hArg.layer == this.strTxtlay && hArg.page == 'fore') this.recText('\f');	// 改ページ、クリア前に
		tf.clearText();
		return false;
	}


	// ハイパーリンクの終了
	private endlink() {this.cmdTxt('endlink｜'); return false;}

	// ページ両面の文字消去
	private er(hArg) {
		if (CmnLib.argChk_Boolean(hArg, 'rec_page_break', true)) this.recText('\f');	// 改ページ、クリア前に

		if (this.pgTxtlay) {
			this.pgTxtlay.fore.clearLay(hArg);
			this.pgTxtlay.back.clearLay(hArg);
		}

		return false;
	}

	// インライン画像表示
	private graph(hArg) {
		if (! ('pic' in hArg)) throw('[graph] picは必須です');

		hArg.text = '｜　《grp｜'+ JSON.stringify(hArg) +'》';
		return this.hTag.ch(hArg);
	};

	// ハイパーリンク
	private link(hArg) {
		// レスポンス向上のため音声ファイルを先読み。結果再生時にjoin不要
		this.soundMng.loadAheadSnd([
			hArg.clickse || '',
			hArg.enterse || '',
			hArg.leavese || '']);

		if (! hArg.style) hArg.style = 'background-color: rgba(255,0,0,0.5);';
		this.cmdTxt('link｜'+ JSON.stringify(hArg));
		return false;
	}

	// 改行
	private r(hArg) {
		this.hTag.ch({text: '\n'});
		if (hArg.layer == this.strTxtlay) this.recText('\n');
		return false;
	}

	// 履歴改行
	private rec_r() {this.recText('\n'); return false;};

	// 履歴書き込み
	private rec_ch(hArg) {
		if (! hArg.text) throw('[rec_ch] textは必須です');

		this.recText(hArg.text);
		if (CmnLib.argChk_Boolean(hArg, 'r', true)) this.recText('\n');

		return false;
	};

	// 履歴リセット
	private reset_rec(hArg) {
		this.val.setVal_Nochk('save', 'const.sn.sLog', hArg.text || '');
		return false;
	}

	// 文字列と複数ルビの追加
	private ruby2(hArg) {
		const t = hArg.t;
		if (! t) throw('[ruby2] tは必須です');
		const r = hArg.r;
		if (! r) throw('[ruby2] rは必須です');

		hArg.text = '｜'+ t +'《'+ r +'》';
		this.hTag.ch(hArg);
		return false;
	}


	// インラインスタイル設定
	private span(hArg) {
		this.cmdTxt(`span｜${hArg.style || ''}`);
		return false;
	}

	// tcy縦中横を表示する
	private tcy(hArg) {
		if (! hArg.t) throw('[tcy] tは必須です');
		hArg.text = '｜　｜《tcy｜'+ hArg.t +'｜'+ (hArg.r || '') +'》';
		this.hTag.ch(hArg);
		return false;
	};


	// レイヤのダンプ
	private dump_lay(hArg) {
		console.group('🥟 [dump_lay]');
		for (const name of this.getLayers(hArg.layer)) {
			const pg = this.hPages[name];
			console.groupCollapsed('{'+ pg.fore.name.slice(0, -7) +'}');
			console.info('%c\tback'+ pg.back.dump(), 'color:#0055AA;');
			console.info('%c\tfore'+ pg.fore.dump(), 'color:#0055AA;');
			console.groupEnd();
		}
		console.groupEnd();

		return false;
	}


	// イベント有無の切替
	private enable_event(hArg) {
		this.fncChkTxtLay();
		const layer = this.argChk_layer(hArg, this.strTxtlay);
		const enb
			= this.getTxtLayer(hArg).enabled
			= CmnLib.argChk_Boolean(hArg, 'enabled', true);
		this.val.setVal_Nochk('save', 'const.sn.layer.'+ layer +'.enabled', enb);

		return false;
	}


	// ボタンを表示
	private button(hArg) {
		Pages.argChk_page(hArg, 'back');	// チェックしたいというよりデフォルトをbackに
		hArg.clicksebuf = hArg.clicksebuf || 'SYS';
		hArg.entersebuf = hArg.entersebuf || 'SYS';
		hArg.leavesebuf = hArg.leavesebuf || 'SYS';
		return this.getTxtLayer(hArg).addButton(hArg);
	}


};
