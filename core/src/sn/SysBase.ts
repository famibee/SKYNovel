/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2021 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {IConfig, IHTag, ITag, IVariable, IFn2Path, ISysBase, IData4Vari, HPlugin, HSysBaseArg, ILayerFactory, IMain, IFire, IFncHook} from './CmnInterface';
import {Application, DisplayObject, RenderTexture} from 'pixi.js';

export class SysBase implements ISysBase {
	hFactoryCls: {[name: string]: ILayerFactory}	= {};

	constructor(protected readonly hPlg: HPlugin = {}, protected readonly arg: HSysBaseArg) {
		const fncPre = hPlg.snsys_pre;	// prj・path.json_ の為に先読み
		fncPre?.init({
			addTag: ()=> {},
			addLayCls: ()=> {},
			searchPath: ()=> '',
			getVal: ()=> {return {}},
			resume: ()=> {},
			render: ()=> {},
			setPre: fnc=> this.pre = fnc,
			setEnc: fnc=> this.enc = fnc,
			getStK: fnc=> this.stk = fnc,
			getHash: fnc=> this.hash = fnc,
		});
	}
	get cur() {return this.arg.cur}
	get crypto() {return this.arg.crypto}
	fetch = (url: string)=> fetch(url);

	resolution	= 1;
	reso4frame	= 1;

	protected	cfg	: IConfig;
	loadPathAndVal(_hPathFn2Exts: IFn2Path, _fncLoaded: ()=> void, cfg: IConfig) {this.cfg = cfg;}

	protected	readonly	data	= {sys:{}, mark:{}, kidoku:{}};
	initVal(_data: IData4Vari, _hTmp: any, _comp: (data: IData4Vari)=> void) {}
	flush() {}

	protected	val		: IVariable;
	protected	appPixi	: Application;
	init(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain) {
		this.val = val;
		this.appPixi = appPixi;
		let mes = '';
		try {
			this.val.setSys(this);

			//l = String(this.val.getVal('save:const.sn.sLog'));
			mes = 'sys';	// tst sys
			mes += Number(this.val.getVal('sys:TextLayer.Back.Alpha', 1));
			mes = 'kidoku';	// tst kidoku
			this.val.saveKidoku();
		//	mes = 'save';	// tst save
		//	mes += String(this.val.getVal('save:sn.doRecLog', 'false'));
		} catch (e) {
			console.error(`セーブデータ（${mes}）が壊れています。一度クリアする必要があります %o`, e);
		}

		this.hFactoryCls = {};	// ギャラリーなどで何度も初期化される対策
		for (const nm in this.hPlg) this.hPlg[nm].init({	// プラグイン初期化
			addTag: (name: string, tag_fnc: ITag)=> {
				if (hTag[name]) throw `すでに定義済みのタグ[${name}]です`;
				hTag[name] = tag_fnc;
			},
			addLayCls: (cls: string, fnc: ILayerFactory)=> {
				if (this.hFactoryCls[cls]) throw `すでに定義済みのレイヤcls【${cls}】です`;
				this.hFactoryCls[cls] = fnc;
			},
			searchPath: (fn, extptn = '')=>	this.cfg.searchPath(fn, extptn),
			getVal: val.getVal,
			resume: ()=> main.resume(),
			render: (dsp: DisplayObject, renTx: RenderTexture, clear = false)=> this.appPixi.renderer.render(dsp, renTx, clear),
			setPre: fnc=> this.pre = fnc,
			setEnc: fnc=> this.enc = fnc,
			getStK: fnc=> this.stk = fnc,
			getHash: fnc=> this.hash = fnc,
		});

		//	システム
		hTag.close			= o=> this.close(o);	// アプリの終了
		hTag.export			= o=> this._export(o);	// プレイデータをエクスポート
		hTag.import			= o=> this._import(o);	// プレイデータをインポート

	//	hTag.loadplugin		// LayerMng.ts内で定義	// cssの読み込み
//		hTag.mouse			= o=> this.mouse(o);	// マウスの設定
		hTag.navigate_to	= o=> this.navigate_to(o);	// ＵＲＬを開く
//		hTag.set_focus		// LayerMng.ts内で定義	// フォーカス移動
	//	hTag.snapshot		// LayerMng.ts内で定義	// スナップショット
		hTag.title			= o=> this.title(o);	// タイトル指定
		hTag.toggle_full_screen = o=> this.tgl_full_scr(o);	// 全画面状態切替
//		hTag.unzip			= o=> this.unzip(o);	// ネット素材取得
		hTag.update_check	= o=> this.update_check(o);	// 更新チェック
		hTag.window			= o=> this.window(o);	// アプリウインドウ設定

		val.setVal_Nochk('tmp', 'const.sn.isApp', this.isApp());
		val.setVal_Nochk('tmp', 'const.sn.isDbg', this.isDbg());
		val.setVal_Nochk('tmp', 'const.sn.isPackaged', this.isPackaged());

		val.setVal_Nochk('sys', SysBase.VALNM_CFG_NS, this.cfg.oCfg.save_ns);
			// [import]時のチェック用
		val.flush();
	}
	protected	static	readonly	VALNM_CFG_NS = 'const.sn.cfg.ns';

	protected fire: IFire;
	setFire(fire: IFire) {this.fire = fire}

	addHook(_fnc: IFncHook) {}
	callHook: IFncHook = ()=> {};
	sendDbg: IFncHook = ()=> {};
	copyBMFolder = (_from: number, _to: number)=> {};
	eraseBMFolder = (_place: number)=> {};


	protected readonly	close			: ITag = ()=> false;
	protected readonly	_export			: ITag = ()=> false;
	protected readonly	_import			: ITag = ()=> false;
	protected readonly	navigate_to		: ITag = ()=> false;
	protected readonly	title			: ITag = hArg=> {
		const text = hArg.text;
		if (! text) throw '[title] textは必須です';

		this.main_title = text;
		this.titleSub(this.main_title + this.info_title);

		return false;
	};
		private main_title	= '';
		protected titleSub(_txt: string) {}
	protected			tgl_full_scr	: ITag = ()=> false;
	protected readonly	update_check	: ITag = ()=> false;
	protected readonly	window			: ITag = ()=> false;

	private info_title	= '';
	setTitleInfo(txt: string) {
		this.info_title = txt;
		this.titleSub(this.main_title + this.info_title);
	}

	pre = async (_ext: string, data: string)=> data;
	protected enc = async (data: string)=> data;
	protected stk = ()=> '';
	hash = (_data: string)=> '';

	protected readonly	isApp = ()=> false;
	protected readonly	isPackaged = ()=> false;
	readonly	isDbg = ()=> false;
	protected $path_downloads	= '';
	get path_downloads() {return this.$path_downloads}
	protected $path_userdata= '';
	get path_userdata() {return this.$path_userdata}

	readonly	savePic = (_fn: string, _data_url: string)=> {};
	readonly	appendFile = (_path: string, _data: any, _callback: (err: NodeJS.ErrnoException)=> void)=> {};
	readonly	ensureFileSync = (_path: string)=> {};

	// 既存のiframeのサイズと表示位置を調整
	ofsLeft4frm	= 0;
	ofsTop4frm	= 0;
	protected	resizeFrames() {
		const cr = this.appPixi.view.getBoundingClientRect();
		const a = document.getElementsByTagName('iframe');
		const len = a.length;
		for (let i=0; i<len; ++i) {
			const it = a[i];
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
		}
	}

}
