/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {IHTag, ITag, IVariable, IPathFn2Exts, ISysBase, IData4Vari} from './CmnLib';
import {Config} from './Config';

export class SysBase implements ISysBase {
	constructor(protected $cur = 'prj/') {}
	get cur() {return this.$cur}

	protected cfg;
	getHPathFn2Exts = (_hPathFn2Exts: IPathFn2Exts, _fncLoaded: ()=> void, _cfg: Config): void=> {}	// 基底定義なので「使ってないパラメーター警告」でも消さないように

	protected	val		: IVariable;
	protected	appPixi	: PIXI.Application;
	init(hTag: IHTag, val: IVariable, appPixi: PIXI.Application): void {
		this.val = val;
		this.appPixi = appPixi;
		this.val.setSys(this);

		//	システム
		// アプリの終了
		hTag.close				= this.close;

//		hTag.export				= this.export;		// プレイデータをエクスポート
//		hTag.import				= this.import;		// プレイデータをインポート
	//	hTag.loadplugin		// LayerMng.ts内で定義	// プラグインの読み込み
//		hTag.mouse				= this.mouse;		// マウスの設定

	//	hTag.plugin			// LayerMng.ts内で定義	// プラグインの設定
	//	hTag.set_focus		// LayerMng.ts内で定義	// フォーカス移動
		hTag.title				= this.title;		// タイトル指定
		hTag.toggle_full_screen = this.toggle_full_screen;	// 全画面状態切替
	//	hTag.unloadplugin	// LayerMng.ts内で定義	// プラグインの破棄
//		hTag.unzip				= this.unzip;			// ネット素材取得
//		hTag.update_check		= this.update_check;	// 更新チェック
		hTag.window				= ()=> false;			// アプリウインドウ設定
		val.setVal_Nochk('sys', 'const.sn.nativeWindow.x', 0);
		val.setVal_Nochk('sys', 'const.sn.nativeWindow.y', 0);
			// AIRNovel の sys:const.flash.display.Stage.nativeWindow.x、.y

		val.setVal_Nochk('tmp', 'const.sn.isApp', this.isApp());
	}
	protected close			: ITag = _hArg=> false;
	protected title			: ITag = _hArg=> false;
	protected toggle_full_screen	: ITag = _hArg=> false;

	protected data		= {sys:{}, mark:{}, kidoku:{}};
	initData(_data: IData4Vari, _hTmp: object, _comp: (data: IData4Vari)=> void) {};
	flush() {}

	protected isApp = ()=> false;
	protected $path_desktop	= '';
	get path_desktop() {return this.$path_desktop};
	protected $path_userdata	= '';
	get path_userdata() {return this.$path_userdata};

	existsSync = (_path: string)=> true;
	//readFileSync = (path: string, options: { encoding: string; flag?: string; } | string)=> '';
	//readFile = (path: string, callback: (err: NodeJS.ErrnoException, data: Buffer) => void)=> {};
	writeFile = (_file: string | Buffer | number, _data: any, _callback: (err: NodeJS.ErrnoException) => void)=> {};
	savePic = (_fn: string, _data_url: string)=> {};

	isDirectory = (_path: string)=> false;
	readdirSync = (_path: string, _options?: { encoding: BufferEncoding | null } | BufferEncoding | null): string[]=> [];

	appendFile = (_path: string, _data: any, _callback: (err: NodeJS.ErrnoException) => void)=> {};

}
