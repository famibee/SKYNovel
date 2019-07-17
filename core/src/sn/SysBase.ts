/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {IConfig, IHTag, ITag, IVariable, IFn2Path, ISysBase, IData4Vari, IPlugin, ILayerFactory, IMain} from './CmnInterface';
import {Application, DisplayObject, RenderTexture} from 'pixi.js';

export class SysBase implements ISysBase {
	hFactoryCls: {[name: string]: ILayerFactory}	= {};

	constructor(protected readonly hPlg: {[name: string]: IPlugin} = {}, protected readonly arg: {
		cur		: string;
		crypt	: boolean;
	}) {
		const fncPre = hPlg['snsys_pre'];	// prj・path.json_ の為に先読み
		if (fncPre) fncPre.init({
			addTag: ()=> {},
			addLayCls: ()=> {},
			searchPath: ()=> '',
			getVal: ()=> {return {}},
			resume: ()=> {},
			render: ()=> {},
			setPre: fnc=> this.pre = fnc,
		});
	}
	get cur() {return this.arg.cur}
	get crypt() {return this.arg.crypt}
	get crypt_() {return this.arg.crypt ?'_' :''}
	fetch = (url: string)=> fetch(url);

	resolution	= 1;
	reso4frame	= 1;

	loadPathAndVal(_hPathFn2Exts: IFn2Path, _fncLoaded: ()=> void, _cfg: IConfig): void {}

	protected	data	= {sys:{}, mark:{}, kidoku:{}};
	initVal(_data: IData4Vari, _hTmp: any, _comp: (data: IData4Vari)=> void) {}
	flush() {}

	protected	val		: IVariable;
	protected	appPixi	: Application;
	init(cfg: IConfig, hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): void {
		this.val = val;
		this.appPixi = appPixi;
		this.val.setSys(this);

		this.hFactoryCls = {};	// ギャラリーなどで何度も初期化される対策
		for (const nm in this.hPlg) {	// プラグイン初期化
			this.hPlg[nm].init({
				addTag: (name: string, tag_fnc: ITag)=> {
					if (hTag[name]) throw `すでに定義済みのタグ[${name}]です`;
					hTag[name] = tag_fnc;
				},
				addLayCls: (cls: string, fnc: ILayerFactory)=> {
					if (this.hFactoryCls[cls]) throw `すでに定義済みのレイヤcls【${cls}】です`;
					this.hFactoryCls[cls] = fnc;
				},
				searchPath: (fn: string, extptn = '')=>	cfg.searchPath(fn, extptn),
				getVal: val.getVal,
				resume: ()=> main.resume(),
				render: (dsp: DisplayObject, renTx: RenderTexture, clear = false)=> this.appPixi.renderer.render(dsp, renTx, clear),
				setPre: fnc=> this.pre = fnc,
			});
		}

		//	システム
		hTag.close			= o=> this.close(o);	// アプリの終了
//		hTag.export			= o=> this.export(o);	// プレイデータをエクスポート
//		hTag.import			= o=> this.import(o);	// プレイデータをインポート
	//	hTag.loadplugin		// LayerMng.ts内で定義	// cssの読み込み
//		hTag.mouse			= o=> this.mouse(o);	// マウスの設定
		hTag.navigate_to	= o=> this.navigate_to(o);	// ＵＲＬを開く
	//	hTag.plugin			// LayerMng.ts内で定義		// プラグインの設定（廃止
	//	hTag.set_focus		// LayerMng.ts内で定義		// フォーカス移動
		hTag.title			= o=> this.title(o);	// タイトル指定
		hTag.toggle_full_screen = o=> this.tgl_full_scr(o);	// 全画面状態切替
	//	hTag.unloadplugin	// LayerMng.ts内で定義		// プラグインの破棄（廃止
//		hTag.unzip			= o=> this.unzip(o);	// ネット素材取得
		hTag.update_check	= o=> this.update_check(o);	// 更新チェック
		hTag.window			= o=> this.window(o);	// アプリウインドウ設定

		val.setVal_Nochk('tmp', 'const.sn.isApp', this.isApp());
	}
	protected readonly	close			: ITag = ()=> false;
	protected readonly	navigate_to		: ITag = ()=> false;
	protected readonly	title			: ITag = ()=> false;
	protected			tgl_full_scr	: ITag = ()=> false;
	protected readonly	update_check	: ITag = ()=> false;
	protected readonly	window			: ITag = ()=> false;

	pre = (_ext: string, data: string)=> data;

	protected readonly	isApp = ()=> false;
	protected $path_desktop	= '';
	get path_desktop() {return this.$path_desktop}
	protected $path_userdata= '';
	get path_userdata() {return this.$path_userdata}

	readonly	existsSync = (_path: string)=> true;
	//readFileSync = (path: string, options: { encoding: string; flag?: string; } | string)=> '';
	//readFile = (path: string, callback: (err: NodeJS.ErrnoException, data: Buffer) => void)=> {};
	readonly	writeFile = (_file: string | Buffer | number, _data: any, _callback: (err: NodeJS.ErrnoException) => void)=> {};
	readonly	savePic = (_fn: string, _data_url: string)=> {};

	readonly	appendFile = (_path: string, _data: any, _callback: (err: NodeJS.ErrnoException)=> void)=> {};

	// 既存のiframeのサイズと表示位置を調整
	ofsLeft4frm	= 0;
	ofsTop4frm	= 0;
	protected	resizeFrames() {
		const cr = this.appPixi.view.getBoundingClientRect();
		Array.prototype.slice.call(document.getElementsByTagName('iframe'))
		.forEach((it: HTMLIFrameElement)=> {
			const frmnm = `const.sn.frm.${it.id}`;
			it.style.left = this.ofsLeft4frm +cr.left
				+ Number(this.val.getVal(`tmp:${frmnm}.x`)) *this.reso4frame
				+'px';
			it.style.top  = this.ofsTop4frm +cr.top
				+ Number(this.val.getVal(`tmp:${frmnm}.y`)) *this.reso4frame
				+'px';
			it.width  = String(Number(this.val.getVal(`tmp:${frmnm}.width`))
				*this.reso4frame);
			it.height = String(Number(this.val.getVal(`tmp:${frmnm}.height`))
				*this.reso4frame);
		});
	}

}
