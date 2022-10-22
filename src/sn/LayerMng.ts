/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2022 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, getDateStr, uint, IEvtMng, cnvTweenArg, hMemberCnt, argChk_Boolean, argChk_Num, getExt, addStyle, argChk_Color, parseColor} from './CmnLib';
import {CmnTween, ITwInf} from './CmnTween';
import {IHTag, HArg} from './Grammar';
import {IVariable, IMain, HIPage, IGetFrm, IPropParser, IRecorder} from './CmnInterface';
import {Pages} from './Pages';
import {Layer} from './Layer';
import {GrpLayer} from './GrpLayer';
import {TxtLayer} from './TxtLayer';
import {RubySpliter} from './RubySpliter';
import {TxtStage} from './TxtStage';
import {Config} from './Config';
import {ScriptIterator} from './ScriptIterator';
import {SysBase} from './SysBase';
import {FrameMng} from './FrameMng';
import {Button} from './Button';
import {SoundMng} from './SoundMng';
import {AnalyzeTagArg} from './AnalyzeTagArg';
import {DesignCast} from './DesignCast';
import {EventListenerCtn} from './EventListenerCtn';

import {Tween, update, removeAll} from '@tweenjs/tween.js'
import {Container, Application, Graphics, Texture, Filter, RenderTexture, Sprite, DisplayObject, autoDetectRenderer} from 'pixi.js';

export interface IMakeDesignCast { (idc	: DesignCast): void; };

export interface HPage {[name: string]: Pages};

export class LayerMng implements IGetFrm, IRecorder {
	readonly	#stage	: Container;
				#fore	= new Container;
				#back	= new Container;

	readonly	#frmMng		: FrameMng;
	readonly	#bg_color	: number;

	readonly	#elc		= new EventListenerCtn;

	constructor(private readonly cfg: Config, private readonly hTag: IHTag, private readonly appPixi: Application, private readonly val: IVariable, private readonly main: IMain, private readonly scrItr: ScriptIterator, private readonly sys: SysBase, readonly sndMng: SoundMng, readonly alzTagArg: AnalyzeTagArg, readonly prpPrs: IPropParser) {
		// レスポンシブや回転・全画面切り替え・DevTools 表示切り替えの対応
		const fncResizeLay = ()=> {
			sys.cvsResize();
			this.cvsResizeDesign();
			if (this.#modeLnSub) for (const layer of this.#aLayName) {
				this.#hPages[layer].fore.cvsResizeChildren();
			}
			else for (const layer of this.#aLayName) {
				this.#hPages[layer].fore.cvsResize();
			}

			this.#frmMng.cvsResize();
			this.#evtMng.cvsResize();
		};
		if (CmnLib.isMobile) {
			this.#elc.add(globalThis, 'orientationchange', fncResizeLay, {passive: true});
		}
		else {
			let tid: NodeJS.Timeout | undefined = undefined;
			this.#elc.add(globalThis, 'resize', ()=> {
				if (tid) return;
				tid = setTimeout(()=> {tid = undefined; fncResizeLay();}, 1000 /60 *10);	// clearTimeout()不要と判断
			}, {passive: true});
		}
		sys.cvsResize();

		TxtLayer.init(cfg, hTag, val, this, (me: TxtLayer)=> this.#hPages[me.layname].fore === me, appPixi);
		GrpLayer.init(main, cfg, appPixi, sys, sndMng, val);
		Button.init(cfg);

		this.#frmMng = new FrameMng(this.cfg, this.hTag, this.appPixi, this.val, main, this.sys, this.#hTwInf);
		sys.hFactoryCls.grp = ()=> new GrpLayer;
		sys.hFactoryCls.txt = ()=> new TxtLayer;

		//	システム
		hTag.loadplugin		= o=> this.#loadplugin(o);	// プラグインの読み込み
		//hTag.set_focus	// EventMng.tsで定義	 	// フォーカス移動
		hTag.snapshot		= o=> this.#snapshot(o);	// スナップショット

		//	レイヤ共通
		hTag.add_lay		= o=> this.#add_lay(o);		// レイヤを追加する
		hTag.clear_lay		= o=> this.#clear_lay(o);	// レイヤ設定の消去
		hTag.finish_trans	= ()=> this.#finish_trans();// トランス強制終了
		hTag.lay			= o=> this.#lay(o);			// レイヤ設定
		hTag.trans			= o=> this.#trans(o);		// ページ裏表を交換
		hTag.wt				= o=> this.#wt(o);			// トランス終了待ち

		hTag.quake			= o=> this.#quake(o);		// 画面を揺らす
		hTag.stop_quake		= o=> hTag.finish_trans(o);	// 画面揺らし中断
		hTag.wq				= o=> hTag.wt(o);			// 画面揺らし終了待ち

		hTag.pause_tsy		= o=> this.#pause_tsy(o);	// 一時停止
		hTag.resume_tsy		= o=> this.#resume_tsy(o);	// 一時停止再開
		hTag.stop_tsy		= o=> this.#stop_tsy(o);	// トゥイーン中断
		hTag.tsy			= o=> this.#tsy(o);			// トゥイーン開始
		hTag.wait_tsy		= o=> this.#wait_tsy(o);	// トゥイーン終了待ち

		//	文字・文字レイヤ
	//	hTag.auto_pager		= o=> this.auto_pager(o);	// 自動改ページの設定
		//hTag.autowc		// TxtLayer.ts で定義		// 文字ごとのウェイト
		hTag.ch				= o=> this.#ch(o);			// 文字を追加する
		//hTag.ch_in_style	// TxtLayer.ts で定義		// 文字出現文字出現演出
		//hTag.ch_out_style	// TxtLayer.ts で定義		// 文字消去文字出現演出
		hTag.clear_text		= o=> this.#clear_text(o);	// 文字消去
		hTag.current		= o=> this.#current(o);		// デフォルト文字レイヤ設定
		hTag.endlink		= o=> this.#endlink(o);		// ハイパーリンクの終了
		hTag.er				= o=> this.#er(o);			// ページ両面の文字消去
		hTag.graph			= o=> this.#graph(o);		// インライン画像表示
		hTag.link			= o=> this.#link(o);		// ハイパーリンク
		hTag.r				= o=> this.#r(o);			// 改行
		hTag.rec_ch			= o=> this.#rec_ch(o);		// 履歴書き込み
		hTag.rec_r			= o=> this.#rec_r(o);		// 履歴改行
		hTag.reset_rec		= o=> this.#reset_rec(o);	// 履歴リセット
		//hTag.ruby			= o=> this.ruby(o);			// 直前一文字のルビ（廃止
			// タグでは無く、「｜＠《》」というスクリプト書き換えで良い
		hTag.ruby2			= o=> this.#ruby2(o);		// 文字列と複数ルビの追加
		hTag.span			= o=> this.#span(o);		// インラインスタイル設定
		hTag.tcy			= o=> this.#tcy(o);			// 縦中横を表示する

		//	画像・画像レイヤ
		hTag.add_face		= o=> GrpLayer.add_face(o);	// 差分名称の定義

		//	ムービーレイヤ
		hTag.wv				= o=> GrpLayer.wv(o);		// ムービー再生終了待ち

		//	デバッグ・その他
		hTag.dump_lay		= o=> this.#dump_lay(o);	// レイヤのダンプ

		//	イベント
		hTag.enable_event	= o=> this.#enable_event(o);// イベント有無の切替

		//	ラベル・ジャンプ
		hTag.button			= o=> this.#button(o);		// ボタンを表示


		if (cfg.existsBreakline) this.breakLine = ()=> this.#cmdTxt('grp｜{"id":"break","pic":"breakline"}');
		if (cfg.existsBreakpage) this.breakPage = ()=> this.#cmdTxt('grp｜{"id":"break","pic":"breakpage"}');

		this.#bg_color = parseColor(String(cfg.oCfg.init.bg_color));
		const grp = new Graphics;
		grp
		.beginFill(this.#bg_color, 1)	// イベントを受け取るためにも塗る
		.lineStyle(0, this.#bg_color)
		.drawRect(0, 0, CmnLib.stageW, CmnLib.stageH)
		.endFill();
		this.#fore.addChild(grp.clone());
		this.#back.addChild(grp);
		this.#back.visible = false;

		this.#stage = this.appPixi.stage;
		this.#stage.addChild(this.#back);
		this.#stage.addChild(this.#fore);
		this.#stage.addChild(this.#spTransBack);
		this.#stage.addChild(this.#spTransFore);

		this.appPixi.ticker.add(this.#fncTicker);	// TWEEN 更新
/*
		console.group('new DispMng info');
		console.info(this.appPixi.renderer);
		console.info('utils.isMobile():'+ utils.isMobile.any);
				// https://github.com/kaimallea/isMobile
		console.info('utils.isWebGLSupported():'+ utils.isWebGLSupported());
		console.info('w:%O: h:%O:', CmnLib.stageW, CmnLib.stageH);
		console.groupEnd();
*/
		const fncTxt_b_alpha = (_name: string, val: any)=> {
			this.#foreachRedrawTxtLayBack(Number(val))
		};
		fncTxt_b_alpha('', val.getVal('sys:TextLayer.Back.Alpha', 1));
		val.defValTrg('sys:TextLayer.Back.Alpha', fncTxt_b_alpha);

		const fncBtnFont = (_name: string, val: any)=> Button.fontFamily = val;
		fncBtnFont('', val.getVal('tmp:sn.button.fontFamily', Button.fontFamily));
		val.defValTrg('tmp:sn.button.fontFamily', fncBtnFont);

		val.defTmp('const.sn.log.json', ()=> JSON.stringify(
			this.#sLastPage
				? [...this.#aTxtLog, {text: this.#sLastPage.replaceAll(`<\/span><span class='sn_ch'>`, '')}]
				: this.#aTxtLog
		));
		val.defTmp('const.sn.last_page_text', ()=> this.currentTxtlayFore?.pageText ?? '');
		if (CmnLib.isDbg) {
			DesignCast.init(this.appPixi, sys, scrItr, prpPrs, alzTagArg, this.cfg, this.#hPages);
			this.cvsResizeDesign = ()=> DesignCast.cvsResizeDesign();
			sys.addHook((type, o)=> {
				if (! this.#hProcDbgRes[type]?.(type, o)) return;
				delete this.#hProcDbgRes[type];
			});
		}
	}
	#fncTicker = ()=> update();
	private	cvsResizeDesign() {}


	readonly	#hProcDbgRes
	: {[type: string]: (type: string, o: any)=> boolean}	= {
		attach		: _=> {DesignCast.leaveMode();	return false;},
		continue	: _=> {DesignCast.leaveMode();	return false;},
		disconnect	: _=> {DesignCast.leaveMode();	return false;},
		_enterDesign: _=> {
			DesignCast.enterMode();
			for (const layer of this.#aLayName) {
				const lay = this.#hPages[layer].fore;
				lay.makeDesignCastChildren(gdc=> gdc.make());
				lay.makeDesignCast(gdc=> gdc.make());
			}

			this.#selectNode(this.#curTxtlay);	return false;
		//	this.selectNode('mes/ボタン');	return false;	// Test用
		//	this.selectNode(this.firstGrplay);	return false;
				// 制作中は普通画像レイヤをいじるのが主なので、これがいい
		},
		_replaceToken: (_, o)=> {DesignCast.replaceToken(o); return false;},
		_selectNode	: (_, o)=> {this.#selectNode(o.node); return false;},
	}
	#modeLn		= '';
	#modeLnSub	= '';
	#selectNode(node: string) {
		[this.#modeLn, this.#modeLnSub = ''] = node.split('/');
		const pages = this.#hPages[this.#modeLn];
		if (! pages) return;

		DesignCast.allHide();
		if (this.#modeLnSub) pages.fore.showDesignCastChildren();
		else pages.fore.showDesignCast();
	}

	getFrmDisabled = (id: string)=> this.#frmMng.getFrmDisabled(id);

	#grpCover : Graphics | undefined = undefined;
	cover(visible: boolean, bg_color = 0x0) {
		if (this.#grpCover) {
			this.#stage.removeChild(this.#grpCover);
			this.#grpCover.destroy();
			this.#grpCover = undefined;
		}
		if (visible) this.#stage.addChild(
			(this.#grpCover = new Graphics)
			.beginFill(bg_color)
			.lineStyle(0, bg_color)
			.drawRect(0, 0, CmnLib.stageW, CmnLib.stageH)
			.endFill()
		);
	}

	#evtMng	: IEvtMng;
	setEvtMng(evtMng: IEvtMng) {
		this.#evtMng = evtMng;
		this.#frmMng.setEvtMng(evtMng);
		GrpLayer.setEvtMng(evtMng);
	}

	before_destroy() {for (const p of Object.values(this.#hPages)) p.destroy();}
	destroy() {
		this.#elc.clear();
		GrpLayer.destroy();
		RubySpliter.destroy();
		TxtStage.destroy();
		TxtLayer.destroy();

		this.#frmMng.destroy();

		this.stopAllTw();
		this.appPixi.ticker.remove(this.#fncTicker);
		LayerMng.#msecChWait = 10;
	}
	// トゥイーン全停止
	stopAllTw() {this.#hTwInf = {}; removeAll();}


	// 既存の全文字レイヤの実際のバック不透明度、を再計算
	#foreachRedrawTxtLayBack(g_alpha: number) {
		for (const name of this.#getLayers()) {
			const pg = this.#hPages[name];
			if (! (pg.fore instanceof TxtLayer)) continue;
			pg.fore.chgBackAlpha(g_alpha);
			(pg.back as TxtLayer).chgBackAlpha(g_alpha);
		}
	}


	#cmdTxt = (cmd: string, tl = this.currentTxtlayForeNeedErr, _record = true)=> tl.tagCh('｜　《'+ cmd +'》');
	goTxt = ()=> {};
	breakLine = ()=> {};
	breakPage = ()=> {};
	clearBreak() {
		if (! this.currentTxtlayFore) return;

		this.clearBreak = ()=> this.#cmdTxt('del｜break');
		this.clearBreak();
	}

	clickTxtLay(): boolean {	// true: 文字出現中だったので、停止する
		if (! this.currentTxtlayFore) return false;

		return this.#getLayers().some(v=> {
			const f = this.#hPages[v].fore;
			return f instanceof TxtLayer && f.click();
		});
	}


//	//	システム
	// スナップショット
	#snapshot(hArg: HArg) {
		const fn0 = hArg.fn
		? hArg.fn.slice(0, 10) === 'userdata:/'
			? hArg.fn
			: `downloads:/${hArg.fn + getDateStr('-', '_', '', '_')}.png`
		: `downloads:/snapshot${getDateStr('-', '_', '', '_')}.png`;
		const fn = this.cfg.searchPath(fn0);
		if (this.sys.canCapturePage(fn)) return false;

		const ext = getExt(fn);
		const b_color = argChk_Color(hArg, 'b_color', this.#bg_color);
		const rnd = autoDetectRenderer({
			width: argChk_Num(hArg, 'width', CmnLib.stageW),
			height: argChk_Num(hArg, 'height', CmnLib.stageH),
			backgroundAlpha: (b_color > 0x1000000) && (ext === 'png') ?0 :1,
			antialias: argChk_Boolean(hArg, 'smoothing', false),
			preserveDrawingBuffer: true,
			backgroundColor: b_color & 0xFFFFFF,
			autoDensity: true,
		});
		const a = [];
		const pg = (hArg.page !== 'back') ?'fore' :'back';
		if (this.#tiTrans.tw) a.push(new Promise<void>(re=> {	// [trans]中
			this.#back.visible = true;
			for (const lay of this.#aBackTransAfter) {
				rnd.render(lay, {clear: false});
			}
			this.#back.visible = false;
			this.#spTransBack.visible = true;

			this.#fore.filters = this.#spTransFore.filters;
			this.#fore.visible = true;
			rnd.render(this.#fore, {clear: false});
			this.#fore.visible = false;
			this.#fore.filters = [];
			re();
		}));
		else for (const v of this.#getLayers(hArg.layer)) a.push(
			new Promise<void>(re=> this.#hPages[v][pg].snapshot(rnd, ()=>re()))
		);
		Promise.allSettled(a).then(async ()=> {
			const renTx = RenderTexture.create({width: rnd.width, height: rnd.height, transform: true});	// はみ出し対策
			rnd.render(this.#stage, {renderTexture: renTx});
			await this.sys.savePic(
				fn,
				rnd.plugins.extract.base64(Sprite.from(renTx)),
			);
			if (! this.#tiTrans.tw) for (const v of this.#getLayers(hArg.layer)) this.#hPages[v][pg].snapshot_end();
			rnd.destroy(true);
		});

		return false;
	}

	// プラグインの読み込み
	#loadplugin(hArg: HArg) {
		const {fn} = hArg;
		if (! fn) throw 'fnは必須です';
		const join = argChk_Boolean(hArg, 'join', true);

		switch (getExt(fn)) {
			case 'css':		// 読み込んで<style>に追加
				(async ()=> {
					const res = await fetch(fn);
					if (! res.ok) throw new Error('Network response was not ok.');

					addStyle(await res.text());
					if (join) this.main.resume();
				})();
				break;

			default:	throw 'サポートされない拡張子です'
		}

		return join;
	}


//	//	レイヤ共通
	// レイヤを追加する
	#add_lay(hArg: HArg) {
		const {layer, class: cls} = hArg;
		if (! layer) throw 'layerは必須です';
		if (layer.includes(',')) throw 'layer名に「,」は使えません';
		if (layer in this.#hPages) throw `layer【${layer}】はすでにあります`;
		if (! cls) throw 'clsは必須です';

		const ret = {isWait: false}
		this.#hPages[layer] = new Pages(layer, cls, this.#fore, this.#back, hArg, this.sys, this.val, ret);
		this.#aLayName.push(layer);
		switch (cls) {
		case 'txt':
			if (! this.#curTxtlay) {
				this.#chkTxtLay = ()=> {};
				this.#getTxtLayer = this.#$getTxtLayer;
				this.#current = this.#$current;
				this.hTag.current({layer: layer});	// hPages更新後でないと呼べない
				this.goTxt = ()=> {
					if (this.val.getVal('sn.skip.enabled')) {
						LayerMng.#msecChWait = 0;
					}
					else this.setNormalChWait();
					for (const name of this.#getLayers()) {
						const f = this.#hPages[name].fore;
						if (f instanceof TxtLayer) this.#cmdTxt('gotxt｜', f, false);
					}
				}
			}

			this.val.setVal_Nochk(
				'save',
				'const.sn.layer.'+ (layer ?? this.#curTxtlay) + '.enabled',
				true);
			break;

		case 'grp':	if (this.#firstGrplay) break;
			this.#firstGrplay = layer;
			break;
		}

		this.scrItr.recodeDesign(hArg);	// hArg[':id_tag'] は new Pages 内で設定

		return ret.isWait;
	}
	#hPages		: HPage		= {};	// しおりLoad時再読込
	#aLayName	: string[]	= [];	// 最適化用
	#curTxtlay	= '';
	#firstGrplay	= '';

	#lay(hArg: HArg): boolean {
		// Trans
		const layer = this.#argChk_layer(hArg);
		const pg = this.#hPages[layer];
		const back = pg.back.spLay;
		const fore = pg.fore.spLay;
		if (argChk_Boolean(hArg, 'float', false)) {
			this.#back.setChildIndex(back, this.#back.children.length -1);
			this.#fore.setChildIndex(fore, this.#fore.children.length -1);
			this.#rebuildLayerRankInfo();
		}
		else if (hArg.index) {
			if (argChk_Num(hArg, 'index', 0)) {
				this.#back.setChildIndex(back, hArg.index);
				this.#fore.setChildIndex(fore, hArg.index);
				this.#rebuildLayerRankInfo();
			}
		}
		else if (hArg.dive) {
			const {dive} = hArg;
			let idx_dive = 0;
			if (layer === dive) throw '[lay] 属性 layerとdiveが同じ【'+ dive +'】です';

			const pg_dive = this.#hPages[dive];
			if (! pg_dive) throw '[lay] 属性 dive【'+ dive +'】が不正です。レイヤーがありません';
			const back_dive = pg_dive.back;
			const fore_dive = pg_dive.fore;
			const idx_back_dive = this.#back.getChildIndex(back_dive.spLay);
			const idx_fore_dive = this.#fore.getChildIndex(fore_dive.spLay);
			idx_dive = (idx_back_dive < idx_fore_dive) ?idx_back_dive :idx_fore_dive;
			if (idx_dive > this.#back.getChildIndex(back)) --idx_dive;	//自分が無くなって下がる分下げる

			this.#fore.setChildIndex(fore, idx_dive);
			this.#back.setChildIndex(back, idx_dive);
			this.#rebuildLayerRankInfo();
		}

		hArg[':id_tag'] = pg.fore.name.slice(0, -7);
		this.scrItr.recodeDesign(hArg);	// 必ず[':id_tag'] を設定すること

		return pg.lay(hArg);
	}
	#rebuildLayerRankInfo() {this.#aLayName = this.#sortLayers();}

	// レイヤ設定の消去
	#clear_lay(hArg: HArg) {
		this.#foreachLayers(hArg, name=> {
			//if (name === this.strTxtlay && hArg.page !== 'back') this.recText('', true);
				// 改ページ
			const pg = this.#hPages[this.#argChk_layer({layer: name})];
			if (hArg.page === 'both') {	// page=both で両面削除
				pg.fore.clearLay(hArg);
				pg.back.clearLay(hArg);
			}
			else {
				pg.getPage(hArg).clearLay(hArg);
			}
		});

		return false;
	}

	readonly	#srcRuleTransFragment = `
precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform sampler2D rule;
uniform float vague;
uniform float tick;

uniform vec4 inputPixel;
uniform highp vec4 outputFrame;
vec2 getUV(vec2 coord) {
	return coord * inputPixel.xy / outputFrame.zw;
}

void main(void) {
	vec4 fg = texture2D(uSampler, vTextureCoord);
	vec4 ru = texture2D(rule, getUV(vTextureCoord));

	float v = ru.r - tick;
	if (abs(v) < vague) {
		float f_a = fg.a *(0.5 +v /vague *0.5);

		gl_FragColor.rgb = fg.rgb *f_a;
		gl_FragColor.a = f_a;
	}
	else {
		gl_FragColor = (v >= 0.0)? fg : vec4(0);
	}
}`;
	#ufRuleTrans = {
		rule : Texture.EMPTY,
		vague : 0.0,
		tick : 0.0,
	};
	#fltRule = new Filter(undefined, this.#srcRuleTransFragment, this.#ufRuleTrans);

	#rtTransBack = RenderTexture.create({
		width: CmnLib.stageW,
		height: CmnLib.stageH,
	});
	#spTransBack = new Sprite(this.#rtTransBack);

	#rtTransFore = RenderTexture.create({
		width	: CmnLib.stageW,
		height	: CmnLib.stageH,
	});
	#spTransFore = new Sprite(this.#rtTransFore);

	#aBackTransAfter	: DisplayObject[] = [];

	// ページ裏表を交換
	#trans(hArg: HArg) {
		this.#finish_trans();

		const {layer} = hArg;
		this.#aBackTransAfter = [];
		const hTarget: {[ley_nm: string]: boolean} = {};
		const aFore: Layer[] = [];
		for (const lay_nm of this.#getLayers(layer)) {
			hTarget[lay_nm] = true;
			aFore.push(this.#hPages[lay_nm].fore);
		}
		const aBack: Layer[] = [];
		for (const lay_nm of this.#getLayers()) {
			const lay = this.#hPages[lay_nm][hTarget[lay_nm] ?'back' :'fore'];
			this.#aBackTransAfter.push(lay.spLay);
			aBack.push(lay);
		}
		this.#rtTransBack.resize(CmnLib.stageW, CmnLib.stageH);
		this.appPixi.renderer.render(this.#back, {renderTexture: this.#rtTransBack});	// clear: true

		let fncRenderBack = ()=> {
			this.#back.visible = true;
			for (const spLay of this.#aBackTransAfter) {
				this.appPixi.renderer.render(spLay, {renderTexture: this.#rtTransBack, clear: false});
			}
			this.#back.visible = false;
		};
		if (! aBack.some(lay=> lay.containMovement)) {
			let oldFnc = fncRenderBack;	// 動きがないなら最初に一度
			fncRenderBack = ()=> {fncRenderBack = ()=> {}; oldFnc();};
		}

		this.#rtTransFore.resize(CmnLib.stageW, CmnLib.stageH);
		this.appPixi.renderer.render(this.#fore, {renderTexture: this.#rtTransFore});	// clear: true
		let fncRenderFore = ()=> {
			this.#fore.visible = true;
			this.appPixi.renderer.render(this.#fore, {renderTexture: this.#rtTransFore});
			this.#fore.visible = false;
		};
		if (! aFore.some(lay=> lay.containMovement)) {
			let oldFnc = fncRenderFore;	// 動きがないなら最初に一度
			fncRenderFore = ()=> {fncRenderFore = ()=> {}; oldFnc();};
		}
		const fncRender = ()=> {
			fncRenderBack();
			this.#spTransBack.visible = true;

			fncRenderFore();
			this.#spTransFore.visible = true;
		};
		// visibleはfncRender()に任せる。でないとちらつく
		//this.back.visible = false;
		//this.fore.visible = false;
		//this.sprRtAtTransBack.visible = true;	// trans中専用back(Render Texture)
		//this.sprRtAtTransFore.visible = true;	// trans中専用fore(Render Texture)
		this.#spTransFore.alpha = 1;
		const comp = ()=> {
			if (this.appPixi.ticker) this.appPixi.ticker.remove(fncRender);
				// transなしでもadd()してなくても走るが、構わないっぽい。
			[this.#fore, this.#back] = [this.#back, this.#fore];
			const aPrm: Promise<void>[] = [];
			for (const [layer, pg] of Object.entries(this.#hPages)) {
				if (hTarget[layer]) {pg.transPage(aPrm); continue;}

				// transしないために交換する
				const {fore: {spLay: f}, back: {spLay: b}} = pg;
				const idx = this.#fore.getChildIndex(b);
				this.#fore.removeChild(b);
				this.#back.removeChild(f);
				this.#fore.addChildAt(f, idx);
				this.#back.addChildAt(b, idx);
			}
			Promise.allSettled(aPrm);

			this.#fore.visible = true;
			this.#back.visible = false;
			this.#spTransBack.visible = false;
			this.#spTransFore.visible = false;
			this.#tiTrans.tw?.stop();
			if (this.#tiTrans.resume) this.main.resume();
			this.#tiTrans = {tw: undefined, resume: false};
		};
		this.#tiTrans = {tw: undefined, resume: false};
		const time = argChk_Num(hArg, 'time', 0);
//		hArg[':id'] = pg.fore.name.slice(0, -7);
//		this.scrItr.getDesignInfo(hArg);	// 必ず[':id'] を設定すること
		if (time === 0 || this.#evtMng.isSkippingByKeyDown()) {comp(); return false;}

		// クロスフェード
		const {ease, glsl, rule} = hArg;
		const nEase = CmnTween.ease(ease);
		if (! glsl && ! rule) {
			this.#spTransFore.filters = [];
			this.#tiTrans.tw = new Tween(this.#spTransFore)
				.to({alpha: 0}, time)
				.delay(argChk_Num(hArg, 'delay', 0))
				.easing(nEase)
				.onComplete(comp)
				.start();
			this.appPixi.ticker.add(fncRender);
			return false;
		}

		// ルール画像、またはGLSL
		const flt = glsl
			? new Filter(undefined, glsl, this.#ufRuleTrans)
			: this.#fltRule;
		flt.uniforms.vague = argChk_Num(hArg, 'vague', 0.04);
		flt.uniforms.tick = 0;
		this.#tiTrans.tw = new Tween(flt.uniforms)
			.to({tick: 1}, time)
			.delay(argChk_Num(hArg, 'delay', 0))
			.easing(nEase)
			.onComplete(comp);
		this.#spTransFore.filters = [flt];
		if (glsl) {
			this.#tiTrans.tw!.start();
			this.appPixi.ticker.add(fncRender);
			return false;
		}

		if (! rule) throw 'ruleが指定されていません';
		GrpLayer.csv2Sprites(rule, undefined, sp=> {
			flt.uniforms.rule = sp.texture;
			sp.destroy();
			this.#tiTrans.tw?.start();
			this.appPixi.ticker.add(fncRender);
		});
		return false;
	}
	#tiTrans : ITwInf = {tw: undefined, resume: false};

	#getLayers(layer = ''): string[] {
		return (layer)? layer.split(',') : this.#aLayName;
	}
	#foreachLayers(hArg: HArg, fnc: (name: string, $pg: Pages)=> void): ReadonlyArray<string> {
		const vct = this.#getLayers(hArg.layer);
		for (const name of vct) {
			if (! name) continue;

			const pg = this.#hPages[name];
			if (! pg) throw '存在しないlayer【'+ name +'】です';

			fnc(name, pg);
		}

		return vct;
	}
	#sortLayers(layers = ''): string[] {
		return this.#getLayers(layers)
		.sort((a, b)=> {
			const ai = this.#fore.getChildIndex(this.#hPages[a].fore.spLay);
			const bi = this.#fore.getChildIndex(this.#hPages[b].fore.spLay);
			if (ai < bi) return -1;
			if (ai > bi) return 1;
			return 0;
		});
	}

	// トランス終了待ち
	#wt(hArg: HArg) {
		if (! this.#tiTrans.tw) return false;

		this.#tiTrans.resume = true;
		return this.#evtMng.waitLimitedEvent(hArg, ()=> this.#finish_trans());
	}

	// レイヤのトランジションの停止
	#finish_trans() {this.#tiTrans.tw?.end(); return false;}


	// 画面を揺らす
	#quake(hArg: HArg) {
		this.#finish_trans();
		const time = argChk_Num(hArg, 'time', NaN);
		if (time === 0) return false;	// skip時でもエラーは出したげたい
		if (this.val.getVal('tmp:sn.skip.enabled')) return false;
		if (this.#evtMng.isSkippingByKeyDown()) return false;

		const {layer, ease} = hArg;
		const aDo: DisplayObject[] = [];
		for (const lay_nm of this.#getLayers(layer)) {
			aDo.push(this.#hPages[lay_nm].fore.spLay);
		}
		this.#rtTransFore.resize(CmnLib.stageW, CmnLib.stageH);
			// NOTE: スマホ回転対応が要るかも？
		const fncRender = ()=> {
			this.#fore.visible = true;
			for (const lay of aDo) this.appPixi.renderer.render(
				lay, {renderTexture: this.#rtTransFore, clear: false}
			);
			this.#fore.visible = false;
		};
		this.#spTransFore.visible = true;
		this.#spTransFore.alpha = 1;

		const h = uint(argChk_Num(hArg, 'hmax', 10));
		const v = uint(argChk_Num(hArg, 'vmax', 10));
		const fncH = (h === 0)
			? ()=> {}
			: ()=> this.#spTransFore.x = Math.round(Math.random()* h*2) -h;
		const fncV = (v === 0)
			? ()=> {}
			: ()=> this.#spTransFore.y = Math.round(Math.random()* v*2) -v;
		this.#spTransFore.filters = [];
		const repeat = argChk_Num(hArg, 'repeat', 1);
		const tw = new Tween(this.#spTransFore)
		.to({x: 0, y: 0}, time)
		.delay(argChk_Num(hArg, 'delay', 0))
		.easing(CmnTween.ease(ease))
		.onUpdate(()=> {fncH(); fncV();})
		.repeat(repeat === 0 ?Infinity :(repeat -1))	// 一度リピート→計二回なので
		.yoyo(argChk_Boolean(hArg, 'yoyo', false))
		.onComplete(()=> {
			this.appPixi.ticker?.remove(fncRender);
				// transなしでもadd()してなくても走るが、構わないっぽい。
			this.#fore.visible = true;
			this.#spTransFore.visible = false;
			this.#spTransFore.x = 0;	// 必須、onUpdateのせいかtoの値にしてくれない
			this.#spTransFore.y = 0;
			this.#tiTrans.tw?.stop();
			if (this.#tiTrans.resume) this.main.resume();
			this.#tiTrans = {tw: undefined, resume: false};
		})
		.start();
		this.#tiTrans = {tw, resume: false};
		this.appPixi.ticker.add(fncRender);

		return false;
	}


	// トゥイーン開始
	#hTwInf	: {[tw_nm: string]: ITwInf}	= {};
	#tsy(hArg: HArg) {
		const {layer, render, path, name, ease, chain} = hArg;
		if (! layer) throw 'layerは必須です';

		const lay = this.#argChk_layer(hArg);
		let hNow = this.#hPages[lay].fore;

		let finishBlendLayer = ()=> {};
		const isSkip = this.#evtMng.isSkippingByKeyDown();
		if (! isSkip && render) {
			hNow.renderStart();
			finishBlendLayer = ()=> hNow.renderEnd();
		}

		const tw_nm = name ?? layer;
		const onComplete = ()=> {
			// この辺は FrameMng.ts tsy_frame()と同様なので、変更時は相互に合わせること
			const ti = this.#hTwInf[tw_nm];
			if (! ti) return;

			finishBlendLayer();
			delete this.#hTwInf[tw_nm];
			ti.tw?.stop();
			if (ti.resume) this.main.resume();
			ti.onEnd?.();
		};
		const hTo = cnvTweenArg(hArg, hNow);
		const dur = argChk_Num(hArg, 'time', NaN) * (
			Boolean(this.val.getVal('tmp:sn.skip.enabled') || isSkip) ?0 :1);
		const nEase = CmnTween.ease(ease);
		const rep = argChk_Num(hArg, 'repeat', 1);
		const repeat = rep === 0 ?Infinity :(rep -1);// 一度リピート→計二回なので
		const yoyo = argChk_Boolean(hArg, 'yoyo', false);
		const delay = argChk_Num(hArg, 'delay', 0);

		const tw = new Tween(hNow)
		.to(hTo, dur).easing(nEase).repeat(repeat).yoyo(yoyo).delay(delay);
		let twLast = tw;
		if (path) {
			if (CmnLib.debugLog) console.group(`🍝 [tsy] path=${path}= start(${hNow.x},${hNow.y},${hNow.alpha})`);
			for (const {groups} of path.matchAll(LayerMng.REG_TSY_PATH)) {
				const {x, x2, y, y2, o, o2, json} = groups!;
				let hArg2: any = {};
				if (json) try {hArg2 = JSON.parse(json);} catch (e) {
					console.error(`🍝 json=${json} `+ e);
					continue;
				}
				else {
					if (x ?? x2) hArg2.x = x ?? x2;
					if (y ?? y2) hArg2.y = y ?? y2;
					if (o ?? o2) hArg2.alpha = o ?? o2;
				}

				const hTo2 = cnvTweenArg(hArg2, hNow);
				if (CmnLib.debugLog) console.info(`🍝 ${
					json ?? `{x:${x} y:${y} o:${o}}`
				} => hTo:${JSON.stringify(hTo2)}`);

				const twNew = new Tween(hNow)	//.delay(delay);
				.to(hTo2, dur).easing(nEase).repeat(repeat).yoyo(yoyo)
				twLast.chain(twNew);

				twLast = twNew;
			}
			if (CmnLib.debugLog) console.groupEnd();
		}
		twLast.onComplete(onComplete);

		if (chain) {	// 指定レイヤのアニメ終了に、このトゥイーンを続ける
			const twFrom = this.#hTwInf[chain ?? ''];
			if (! twFrom?.tw) throw `${chain}は存在しない・または終了したトゥイーンです`;
			delete twFrom.onEnd;
			twFrom.tw.chain(tw);
		}
		else tw.start();

		const arrive = argChk_Boolean(hArg, 'arrive', false);
		const backlay = argChk_Boolean(hArg, 'backlay', false);
		this.#hTwInf[tw_nm] = {tw: twLast, resume: false, onEnd: ()=> {
			if (arrive) Object.assign(hNow, hTo);
			if (backlay) {
				const backCnt: any = this.#hPages[lay].back.spLay;
				for (const nm of Object.keys(hMemberCnt)) backCnt[nm] = (<any>hNow)[nm];
			}
		}}
//		hArg[':id'] = pg.fore.name.slice(0, -7);
//		this.scrItr.getDesignInfo(hArg);	// 必ず[':id'] を設定すること

		return false;
	}
	// 11 match 301 step (0.1ms) PCRE2 https://regex101.com/r/reinpq/1
		// List ${x}${x2}/${y}${y2}/${o}${o2}=${json}\n
/*
\(\s*
(?:	(?<x>[-=\d\.]+)	|	(['"])	(?<x2>.*?)	\2	)?
(?:
	\s*,\s*
	(?:	(?<y>[-=\d\.]+)	|	(['"])	(?<y2>.*?)	\5	)?
	(?:
		\s*,\s*
		(?:	(?<o>[-=\d\.]+)	|	(['"])	(?<o2>.*?)	\8	)

	)?
)?
|
(?<json>\{[^{}]*})
*/
	static	REG_TSY_PATH	= /\(\s*(?:(?<x>[-=\d\.]+)|(['"])(?<x2>.*?)\2)?(?:\s*,\s*(?:(?<y>[-=\d\.]+)|(['"])(?<y2>.*?)\5)?(?:\s*,\s*(?:(?<o>[-=\d\.]+)|(['"])(?<o2>.*?)\8))?)?|(?<json>\{[^{}]*})/g;

	// トゥイーン終了待ち
	#wait_tsy(hArg: HArg) {
		const {layer='', id, name} = hArg;
		const tw_nm = id ?`frm\n${id}` :(name ?? layer);
		if (! tw_nm) throw 'トゥイーンが指定されていません';
		const ti = this.#hTwInf[tw_nm];
		if (! ti?.tw) return false;

		return ti.resume = this.#evtMng.waitEvent(
			()=> ti.tw?.end(),	// stop()とend()は別
			argChk_Boolean(hArg, 'canskip', true),
			argChk_Boolean(hArg, 'global', false),
		);
	}

	// トゥイーン中断
	#stop_tsy(hArg: HArg) {
		const {layer='', id, name} = hArg;
		const tw_nm = id ?`frm\n${id}` :(name ?? layer);
		if (! tw_nm) throw 'トゥイーンが指定されていません';

		this.#hTwInf[tw_nm]?.tw?.end();	// stop()とend()は別

		return false;
	}

	// 一時停止
	#pause_tsy(hArg: HArg) {
		const {layer='', id, name} = hArg;
		const tw_nm = id ?`frm\n${id}` :(name ?? layer);
		if (! tw_nm) throw 'トゥイーンが指定されていません';

		this.#hTwInf[tw_nm]?.tw?.pause();

		return false;
	}

	// 一時停止再開
	#resume_tsy(hArg: HArg) {
		const {layer='', id, name} = hArg;
		const tw_nm = id ?`frm\n${id}` :(name ?? layer);
		if (! tw_nm) throw 'トゥイーンが指定されていません';

		this.#hTwInf[tw_nm]?.tw?.resume();

		return false;
	}


//	// 文字・文字レイヤ
	static		#msecChWait		= 10;
	static get	msecChWait() {return LayerMng.#msecChWait;}
	static set	msecChWait(v) {LayerMng.#msecChWait = v;}
	// 文字を追加する
	#ch(hArg: HArg) {
		const {text} = hArg;
		if (! text) throw 'textは必須です';

		const tl = this.#getTxtLayer(hArg);
		delete hArg.text;	// [graph]時、次行がルビ文法でトラブったので
		if (this.val.getVal('tmp:sn.skip.enabled')) hArg.wait = 0;
		else if ('wait' in hArg) argChk_Num(hArg, 'wait', NaN);

		const sArg = encodeURIComponent(JSON.stringify(hArg));
		this.#cmdTxt('add｜'+ sArg, tl);	// [ch style]用

		const record = argChk_Boolean(hArg, 'record', true);
		const doRecLog = this.val.doRecLog();
		if (! record) this.val.setVal_Nochk('save', 'sn.doRecLog', record);
		tl.tagCh(text.replaceAll('[r]', '\n'));
		this.val.setVal_Nochk('save', 'sn.doRecLog', doRecLog);

		this.#cmdTxt(`add_close｜`, tl);	// [ch style]用

		return false;
	}

	#getTxtLayer = (_hArg: HArg): TxtLayer=> {this.#chkTxtLay(); throw 0};
	#$getTxtLayer(hArg: HArg): TxtLayer {
		const layer = this.#argChk_layer(hArg, this.#curTxtlay);
		const pg = this.#hPages[layer];
		const lay = pg.getPage(hArg);
		if (! (lay instanceof TxtLayer)) throw layer +'はTxtLayerではありません';

		return lay;
	}
	setNormalChWait(): void {LayerMng.#msecChWait = this.scrItr.normalWait}


	// 操作対象のメッセージレイヤの指定
	#current = (_hArg: HArg): boolean=> {this.#chkTxtLay(); throw 0};
	#$current(hArg: HArg) {
		const {layer} = hArg;
		if (! layer) throw '[current] layerは必須です';

		this.#pgTxtlay = this.#hPages[layer];
		if (! (this.#pgTxtlay.getPage(hArg) instanceof TxtLayer)) throw `${layer}はTxtLayerではありません`;

		this.recPagebreak();	// カレント変更前に現在の履歴を保存
		this.#curTxtlay = layer;
		this.val.setVal_Nochk('save', 'const.sn.mesLayer', layer);
		for (const name of this.#getLayers()) {
			const pg = this.#hPages[name];
			if (! (pg.fore instanceof TxtLayer)) continue;
			(pg.fore as TxtLayer).isCur =
			(pg.back as TxtLayer).isCur = (name === layer);
		}

		return false;
	}
	get currentTxtlayForeNeedErr(): TxtLayer {
		this.#chkTxtLay();
		return this.currentTxtlayFore!;
	}
	get currentTxtlayFore(): TxtLayer | undefined {
		if (! this.#pgTxtlay) return undefined;

		return this.#pgTxtlay.fore as TxtLayer;
	}
	#pgTxtlay	: Pages;	// カレントテキストレイヤ
	#chkTxtLay	: ()=> void	= ()=> {throw '文字レイヤーがありません。文字表示や操作する前に、[add_lay layer=（レイヤ名） class=txt]で文字レイヤを追加して下さい'};

	#argChk_layer(hash: any, def = ''): string {
		const v = hash.layer ?? def;
		if (v.includes(',')) throw 'layer名に「,」は使えません';
		if (! (v in this.#hPages)) throw '属性 layer【'+ v +'】が不正です。レイヤーがありません';

		return hash.layer = v;
	}


	#sLastPage	= '';
	#aTxtLog	: {text: string;}[]	= [];
	recText(txt: string) {
		this.#sLastPage = txt;
		this.val.setVal_Nochk('save', 'const.sn.sLog',
			String(this.val.getVal('const.sn.log.json'))	// これを起動したい
		);
	}
	recPagebreak() {
		if (! this.#sLastPage) return;

		const text = this.#sLastPage.replaceAll(`<\/span><span class='sn_ch'>`, '');
		if (this.#aTxtLog.push({text}) > this.cfg.oCfg.log.max_len) this.#aTxtLog = this.#aTxtLog.slice(-this.cfg.oCfg.log.max_len);
		this.#sLastPage = '';
	}


	#clear_text(hArg: HArg) {
		const tf = this.#getTxtLayer(hArg);
		if (hArg.layer === this.#curTxtlay && hArg.page === 'fore') this.recPagebreak();	// 改ページ、クリア前に
		tf.clearText();
		return false;
	}


	// ハイパーリンクの終了
	#endlink(hArg: HArg) {this.#cmdTxt('endlink｜', this.#getTxtLayer(hArg)); return false;}

	// ページ両面の文字消去
	#er(hArg: HArg) {
		if (argChk_Boolean(hArg, 'rec_page_break', true)) this.recPagebreak();	// 改ページ、クリア前に

		if (this.#pgTxtlay) {
			this.#pgTxtlay.fore.clearLay(hArg);
			this.#pgTxtlay.back.clearLay(hArg);
		}

		return false;
	}

	// インライン画像表示
	#graph(hArg: HArg) {
		if (! hArg.pic) throw '[graph] picは必須です';

		const sArg = encodeURIComponent(JSON.stringify(hArg));
		this.#cmdTxt('grp｜'+ sArg, this.#getTxtLayer(hArg));
		return false;
	}

	// ハイパーリンク
	#link(hArg: HArg) {
		hArg.style ??= 'background-color: rgba(255,0,0,0.5);';
		hArg.style_hover ??= 'background-color: rgba(255,0,0,0.9);';
		hArg.style_clicked ??= hArg.style;
		const sArg = encodeURIComponent(JSON.stringify(hArg));
		this.#cmdTxt('link｜'+ sArg, this.#getTxtLayer(hArg));
		return false;
	}

	// 改行
	#r(hArg: HArg) {hArg.text = '\n'; return this.#ch(hArg);}

	// 履歴改行
	#rec_r(hArg: HArg) {return this.#rec_ch({...hArg, text: '[r]'});};

	// 履歴書き込み
	#rec_ch(hArg: HArg) {
		if (! hArg.text) return false;

		hArg.record = true;
		hArg.style ??= '';
		hArg.style += 'display: none;';	// gotxt内で削除し履歴に表示
		hArg.wait = 0;
		return this.#ch(hArg);
	};

	// 履歴リセット
	#reset_rec(hArg: HArg) {
		this.#aTxtLog = [];
		this.#sLastPage = hArg.text ?? '';
		this.val.setVal_Nochk('save', 'const.sn.sLog', 
			hArg.text ?`[{text:"${hArg.text}"}]` : '[]'
		);

		return false;
	}

	// 文字列と複数ルビの追加
	#ruby2(hArg: HArg) {
		const {t, r} = hArg;
		if (! t) throw '[ruby2] tは必須です';
		if (! r) throw '[ruby2] rは必須です';

		hArg.text = '｜'+ encodeURIComponent(t) +'《'+ encodeURIComponent(r) +'》';
		delete hArg.t;
		delete hArg.r;
		return this.#ch(hArg);
	}


	// インラインスタイル設定
	#span(hArg: HArg) {
		const sArg = encodeURIComponent(JSON.stringify(hArg));
		this.#cmdTxt('span｜'+ sArg, this.#getTxtLayer(hArg));
		return false;
	}

	// tcy縦中横を表示する
	#tcy(hArg: HArg) {
		if (! hArg.t) throw '[tcy] tは必須です';

		const sArg = encodeURIComponent(JSON.stringify(hArg));
		this.#cmdTxt('tcy｜'+ sArg, this.#getTxtLayer(hArg));
		return false;
	}


	// レイヤのダンプ
	#dump_lay(hArg: HArg) {
		console.group('🥟 [dump_lay]');
		for (const name of this.#getLayers(hArg.layer)) {
			const pg = this.#hPages[name];
			try {
				console.info(`%c${pg.fore.name.slice(0, -7)} %o`, `color:#${CmnLib.isDarkMode ?'49F' :'05A'};`,
				JSON.parse(`{"back":{${pg.back.dump()}}, "fore":{${pg.fore.dump()}}}`));
			} catch (error) {
				console.error(`dump_lay err:%o`, error);
				console.error(`   back:${pg.back.dump()}`);
				console.error(`   fore:${pg.fore.dump()}`);
			}
		}
		console.groupEnd();

		return false;
	}


	// イベント有無の切替
	#enable_event(hArg: HArg) {
		const layer = this.#argChk_layer(hArg, this.#curTxtlay);
		const v = argChk_Boolean(hArg, 'enabled', true);
		this.#getTxtLayer(hArg).enabled = v;
		this.val.setVal_Nochk('save', 'const.sn.layer.'+ layer +'.enabled', v);

		return false;
	}


	// ボタンを表示
	#button(hArg: HArg) {
		Pages.argChk_page(hArg, 'back');	// チェックしたいというよりデフォルトをbackに
		hArg.clicksebuf ??= 'SYS';
		hArg.entersebuf ??= 'SYS';
		hArg.leavesebuf ??= 'SYS';
		if (! hArg.fn) hArg.fn = this.scrItr.scriptFn;
			// fn省略時、画像ボタンはロード後という後のタイミングで scrItr.scriptFn を
			// 参照してしまうので
		this.#getTxtLayer(hArg).addButton(hArg);	// hArg[':id_tag'] も設定

		this.scrItr.recodeDesign(hArg);	// 必ず[':id_tag'] を設定すること

		return false;
	}


	record(): any {
		const o: any = {};
		for (const layer of this.#aLayName) {
			const pg = this.#hPages[layer];
			o[layer] = {
				cls: pg.cls,
				fore: pg.fore.record(),
				back: pg.back.record(),
			};
		}
		return o;
	}
	playback($hPages: HIPage, fncComp: ()=> void): void {
		// これを先に。save:const.sn.sLog がクリアされてしまう
		this.#aTxtLog = JSON.parse(String(this.val.getVal('save:const.sn.sLog')));
		this.#sLastPage = '';

		const aPrm: Promise<void>[] = [];
		const aSort: {layer: string, idx: number}[] = [];
		for (const [layer, {fore, fore: {idx}, back, cls}] of Object.entries($hPages)) {	// 引数で言及の無いレイヤはそのまま。特に削除しない
			aSort.push({layer, idx});

			const ps = this.#hPages[layer] ??= new Pages(layer, cls, this.#fore, this.#back, {}, this.sys, this.val, {isWait: false});
			ps.fore.playback(fore, aPrm);
			ps.back.playback(back, aPrm);
		}
		const len = this.#fore.children.length;
		Promise.allSettled(aPrm).then(()=> {
			// 若い順にsetChildIndex()
			for (const {layer, idx} of
				aSort.sort(({idx: a}, {idx: b})=> a === b ?0 :a < b ?-1 :1)) {
				const {fore, back} = this.#hPages[layer];
				if (! fore) return;
				const i = len > idx ?idx :len -1;
				this.#fore.setChildIndex(fore.spLay, i);
				this.#back.setChildIndex(back.spLay, i);
			}

			fncComp();
		})
		.catch(e=> console.error(`fn:LayerMng.ts playback e:%o`, e));
	}

}
