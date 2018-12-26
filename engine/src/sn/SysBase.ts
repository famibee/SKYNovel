/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {IHTag, ITag, IVariable, IPathFn2Exts, ISysBase} from './CmnLib';
import {Config} from './Config';

export class SysBase implements ISysBase {
	constructor(protected $cur = 'prj/') {}
	get cur() {return this.$cur}

	protected cfg		= null;
	getHPathFn2Exts = (hPathFn2Exts: IPathFn2Exts, fncLoaded: ()=> void, cfg: Config): void=> {}	// 基底定義なので「使ってないパラメーター警告」でも消さないように

	protected	val		: IVariable		= null;
	protected	appPixi	: PIXI.Application	= null;
	init(hTag: IHTag, val: IVariable, appPixi: PIXI.Application): void {
		this.val = val;
		this.appPixi = appPixi;
		this.val.setSys(this);

//	システム
		// アプリの終了
		hTag.close				= this.close;

//		hTag.export				= this.export;		// プレイデータをエクスポート
//		hTag.import				= this.import;		// プレイデータをインポート
		//hTag.loadplugin	// LayerMng.ts内で定義	// プラグインの読み込み
//		hTag.mouse				= this.mouse;		// マウスの設定

//		hTag.plugin				= this.plugin;		// プラグインの設定
//		hTag.set_focus		// LayerMng.ts内で定義	// フォーカス移動
		hTag.title				= this.title;		// タイトル指定
		hTag.toggle_full_screen = this.toggle_full_screen;	// 全画面状態切替
/*
		hTag.unloadplugin		= this.unloadplugin;	// プラグインの破棄
		hTag.unzip				= this.unzip;			// ネット素材取得
		hTag.update_check		= this.update_check;	// 更新チェック
*/
		hTag.window				= ()=> false;			// アプリウインドウ設定
		val.setVal_Nochk('sys', 'const.sn.nativeWindow.x', 0);
		val.setVal_Nochk('sys', 'const.sn.nativeWindow.y', 0);
			// AIRNovel の sys:const.flash.display.Stage.nativeWindow.x、.y

		val.setVal_Nochk('tmp', 'const.sn.isApp', this.isApp());
	}
	// 基底定義なので「使ってないパラメーター警告」でも消さないように
	protected close			: ITag = hArg=> false;
	protected title			: ITag = hArg=> false;
	protected toggle_full_screen	: ITag = hArg=> false;

	protected data		= {sys:{}, mark:{}, kidoku:{}};
	initData(data: object, hTmp: object, comp: (data: object)=> void) {};
	flush() {}

	protected isApp = ()=> false;
	protected $path_desktop	= '';
	get path_desktop() {return this.$path_desktop};

	// 基底定義なので「使ってないパラメーター警告」でも消さないように
	existsSync = (path: string)=> true;
	//readFileSync = (path: string, options: { encoding: string; flag?: string; } | string)=> '';
	//readFile = (path: string, callback: (err: NodeJS.ErrnoException, data: Buffer) => void)=> {};
	writeFile = (file: string | Buffer | number, data: any, callback: (err: NodeJS.ErrnoException) => void)=> {};
	savePic = (fn: string, data_url: string)=> {};

	isDirectory = (path: string)=> false;
	readdirSync = (path: string, options?: { encoding: BufferEncoding | null } | BufferEncoding | null): string[]=> [];

	appendFile = (path: string, data: any, callback: (err: NodeJS.ErrnoException) => void)=> {};

}
