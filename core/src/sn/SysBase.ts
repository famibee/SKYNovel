/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {IConfig, IHTag, ITag, IVariable, IPathFn2Exts, ISysBase, IData4Vari, IPlugin, ILayerFactory} from './CmnInterface';

export class SysBase implements ISysBase {
	hFactoryCls: {[name: string]: ILayerFactory} = {};

	constructor(protected hPlg: {[name: string]: IPlugin} = {}, protected $cur = 'prj/') {}
	get cur() {return this.$cur}

	loadPathAndVal(_hPathFn2Exts: IPathFn2Exts, _fncLoaded: ()=> void, _cfg: IConfig): void {}

	protected data		= {sys:{}, mark:{}, kidoku:{}};
	initVal(_data: IData4Vari, _hTmp: any, _comp: (data: IData4Vari)=> void) {};
	flush() {}

	protected	val		: IVariable;
	protected	appPixi	: PIXI.Application;
	init(hTag: IHTag, val: IVariable, appPixi: PIXI.Application): void {
		this.val = val;
		this.appPixi = appPixi;
		this.val.setSys(this);

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
			//	cfg	: this.cfg,
			//	val	: val
			});
		}

		//	システム
		hTag.close			= o=> this.close(o);	// アプリの終了
//		hTag.export			= o=> this.export(o);	// プレイデータをエクスポート
//		hTag.import			= o=> this.import(o);	// プレイデータをインポート
	//	hTag.loadplugin		// LayerMng.ts内で定義		// プラグインの読み込み
//		hTag.mouse			= o=> this.mouse(o);	// マウスの設定
		hTag.navigate_to	= o=> this.navigate_to(o);	// ＵＲＬを開く
	//	hTag.plugin			// LayerMng.ts内で定義		// プラグインの設定
	//	hTag.set_focus		// LayerMng.ts内で定義		// フォーカス移動
		hTag.title			= o=> this.title(o);	// タイトル指定
		hTag.toggle_full_screen = o=> this.tgl_full_scr(o);	// 全画面状態切替
	//	hTag.unloadplugin	// LayerMng.ts内で定義		// プラグインの破棄
//		hTag.unzip			= o=> this.unzip(o);	// ネット素材取得
//		hTag.update_check	= o=> this.update_check(o);	// 更新チェック
		hTag.window			= o=> this.window(o);	// アプリウインドウ設定
		val.setVal_Nochk('sys', 'const.sn.nativeWindow.x', 0);
		val.setVal_Nochk('sys', 'const.sn.nativeWindow.y', 0);
			// AIRNovel の sys:const.flash.display.Stage.nativeWindow.x、.y

		val.setVal_Nochk('tmp', 'const.sn.isApp', this.isApp());
	}
	protected close			: ITag = ()=> false;
	protected navigate_to	: ITag = ()=> false;
	protected title			: ITag = ()=> false;
	protected tgl_full_scr	: ITag = ()=> false;
	protected window		: ITag = ()=> false;

	protected isApp = ()=> false;
	protected $path_desktop	= '';
	get path_desktop() {return this.$path_desktop}
	protected $path_userdata	= '';
	get path_userdata() {return this.$path_userdata}

	existsSync = (_path: string)=> true;
	//readFileSync = (path: string, options: { encoding: string; flag?: string; } | string)=> '';
	//readFile = (path: string, callback: (err: NodeJS.ErrnoException, data: Buffer) => void)=> {};
	writeFile = (_file: string | Buffer | number, _data: any, _callback: (err: NodeJS.ErrnoException) => void)=> {};
	savePic = (_fn: string, _data_url: string)=> {};

	isDirectory = (_path: string)=> false;
	readdirSync = (_path: string, _options?: { encoding: BufferEncoding | null } | BufferEncoding | null): string[]=> [];

	appendFile = (_path: string, _data: any, _callback: (err: NodeJS.ErrnoException) => void)=> {};

}
