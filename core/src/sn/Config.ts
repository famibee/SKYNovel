/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, int} from './CmnLib';
import {IConfig, IExts, IFn2Path} from './CmnInterface';
import {SysBase} from './SysBase';

export class Config implements IConfig {
	oCfg: any = {
		first_script: 'main',	// 最初に起動するスクリプトファイル
		save_ns		: '',		// 扱うセーブデータを一意に識別するキーワード文字列
		coder		: {len: 0x360},
			// 画像や音声ファイルを前からなんバイト暗号化するか
			// 先頭からの復号化処理対象バイト長。省略時は0、全て復号化
		window	: {		// アプリケーションウインドウサイズ
			width	: 300,
			height	: 300,
		},
		book	: {		// プロジェクトの詳細情報です
			title		: '',	//作品タイトル
			creator		: '',	//著作者。同人ならペンネーム
			cre_url		: '',	//著作者URL。ツイッターやメール、サイトなど
			publisher	: '',	//出版社。同人ならサークル名
			pub_url		: '',	//出版社URL。無ければ省略します
			detail		: '',	// 内容紹介。端的に記入
			version		: '1.0',
			nocode_reg	: 'system/.+.mp3|m4a|config/.+',
			nocode		: '',
			pack_exc	: '',
		},
		log		: {max_len: 1024},	// プレイヤーが読んだ文章を読み返せる履歴の長さ
		init	: {
			bg_color			: 0x000000,	// 背景色
			tagch_msecwait		: 10,		// 通常文字表示待ち時間（未読／既読）
			auto_msecpagewait	: 3500,		// 自動文字表示、行クリック待ち時間（未読／既読）
			escape				: '',		// エスケープ文字
		},
		debug	: {	// デバッグ情報（プレイヤーもONに出来るので注意）
			devtool		: false,
			token		: false,
			tag			: false,
			putCh		: false,
			slideBaseSpan	: false,
			baseTx		: false,
			masume		: false,	// テキストレイヤ：ガイドマス目を表示するか
			variable	: false,
		},
	};
	userFnTail	= '';

	private	hPathFn2Exts	: IFn2Path		= {};
	readonly getJsonSearchPath	= ()=> JSON.stringify(this.hPathFn2Exts);

	static	readonly	EXT_SPRITE	= 'png_|jpg_|jpeg_|json_|svg_|mp4_|png|jpg|jpeg|svg|json|mp4';
	static	readonly	EXT_SCRIPT	= 'sn_|sn';
	static	readonly	EXT_FONT	= 'woff2|otf|ttf';
	static	readonly	EXT_SOUND	= 'mp3_|mp3|m4a_|m4a|ogg_|ogg|aac_|aac|webm_|webm|flac_|flac|wav';

	constructor(private readonly sys: SysBase, fncLoaded: ()=> void, oCfg4tst?: any) {
		const load = (oCfg: any)=> {
			this.oCfg.first_script = oCfg?.first_script ?? this.oCfg.first_script;

			this.oCfg.coder = oCfg?.coder ?? this.oCfg.coder;

			CmnLib.stageW = this.oCfg.window.width = Number(oCfg?.window?.width ?? this.oCfg.window.width);
			CmnLib.stageH = this.oCfg.window.height = Number(oCfg?.window?.height ?? this.oCfg.window.height);

			if ('book' in oCfg) {
				const b = this.oCfg.book;
				for (const nm in b) {
					if (nm != 'inc') {
						b[nm] = CmnLib.argChk_Boolean(oCfg.book, nm, b[nm]);
						continue;
					}
					for (const v of b[nm]) {
						if (! sys.existsSync(sys.cur + v.path)) continue;

						b.inc_path[v.path] = true;
					}
				}
			}

			this.oCfg.log.max_len = oCfg.log?.max_len?.max_len ?? this.oCfg.log.max_len;
			if ('init' in oCfg) {
				const i = this.oCfg.init;
				for (const nm in i) {
					const v: string = oCfg.init[nm];
					if (v) i[nm] = (v.charAt(0) == '#')
						? parseInt(v.slice(1), 16)
						: v;
				}
			}

			if ('debug' in oCfg) {
				const d = this.oCfg.debug;
				for (const nm in d) {
					d[nm] = CmnLib.argChk_Boolean(oCfg.debug, nm, d[nm]);
				}
			}
			CmnLib.devtool = this.oCfg.debug.devtool;

			// これが同期（App）非同期（Web、path.json）混在してるので、
			// （Mainのメンバ変数に入れる→他のクラスに渡す都合により）
			// 当クラスのコンストラクタとload()は分ける
			sys.loadPathAndVal(this.hPathFn2Exts, ()=> {
				this.$existsBreakline = this.matchPath('^breakline$', Config.EXT_SPRITE).length > 0;
				this.$existsBreakpage = this.matchPath('^breakpage$', Config.EXT_SPRITE).length > 0;

				fncLoaded();
			}, this);
		};

		if (oCfg4tst) {load(oCfg4tst); return;}

		// テストで引っかかるのでPromise・async/awaitにしない
		const fn = sys.cur +'prj.json'+ sys.crypt_;
		sys.fetch(fn)
		.then(res=> res.text())
		.then(d=> JSON.parse(sys.pre(fn, d)))
		.then(load)
/*
		try {
			(async ()=> {
				const fn = sys.cur +'prj.json'+ sys.crypt_;
				const res = await this.fetch(fn);
				load(await res.json());
			})();
		} catch (e) {
			DebugMng.myTrace(`load fn=${fn} = %o`, e);
		}
*/
	}
	private $existsBreakline = false;
	get existsBreakline(): boolean {return this.$existsBreakline}
	private $existsBreakpage = false;
	get existsBreakpage(): boolean {return this.$existsBreakpage}

	getNs() {return `skynovel.${this.oCfg.save_ns} - `;}

	searchPath(fn: string, extptn = ''): string {
		if (! fn) throw '[searchPath] fnが空です';
		if (fn.substr(0, 7) == 'http://') return fn;
		if (fn.substr(0, 9) == 'desktop:/') {
			return this.sys.path_desktop + fn.slice(9);
		}
		if (fn.substr(0, 10) == 'userdata:/') {
			return this.sys.path_userdata + fn.slice(10);
		}

		const a = {
			fn:		CmnLib.getFn(fn),
			ext:	CmnLib.getExt(fn)
		};
		if (this.userFnTail) {
			const utn = a.fn +'@@'+ this.userFnTail;
				// ここは%40にしない
			if (utn in this.hPathFn2Exts) {
				if (extptn == '') a.fn = utn;
				else
				for (let e3 in this.hPathFn2Exts[utn]) {
					if (`|${extptn}|`.indexOf(`|${e3}|`) == -1) continue;

					a.fn = utn;
					break;
				}
			}
		}
		const h_exts = this.hPathFn2Exts[a.fn];
		if (! h_exts) throw `サーチパスに存在しないファイル【${fn}】です`;

		let ret = '';
		if (! a.ext) {
			// fnに拡張子が含まれていない
			//	extのどれかでサーチ
			//		（ファイル名サーチ→拡張子群にextが含まれるか）
			const hcnt = int(h_exts[':cnt']);
			if (extptn == '') {
				if (hcnt > 1) throw `指定ファイル【${fn}】が複数マッチします。サーチ対象拡張子群【${extptn}】で絞り込むか、ファイル名を個別にして下さい。`;

				return fn;
			}

			const search_exts = `|${extptn}|`;
			if (hcnt > 1) {
				let cnt = 0;
				for (const e2 in h_exts) {
					if (search_exts.indexOf(`|${e2}|`) == -1) continue;
					if (++cnt > 1) throw `指定ファイル【${fn}】が複数マッチします。サーチ対象拡張子群【${extptn}】で絞り込むか、ファイル名を個別にして下さい。`;
				}
			}
			for (let e in h_exts) {
				if (search_exts.indexOf(`|${e}|`) == -1) continue;

				return h_exts[e];
			}
			throw `サーチ対象拡張子群【${extptn}】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【${fn}】`;
		}

		// fnに拡張子xが含まれている
		//	ファイル名サーチ→拡張子群にxが含まれるか
		if (extptn != '') {
			const search_exts2 = `|${extptn}|`;
			if (search_exts2.indexOf(`|${a.ext}|`) == -1) {
				throw `指定ファイルの拡張子【${a.ext}】は、サーチ対象拡張子群【${extptn}】にマッチしません。探索ファイル名=【${fn}】`;
			}
		}

		ret = h_exts[a.ext];
		if (! ret) throw `サーチパスに存在しない拡張子【${a.ext}】です。探索ファイル名=【${fn}】、サーチ対象拡張子群【${extptn}】`;

		return ret;
	}

	// 戻り値はフルパスなので注意
	matchPath(fnptn: string, extptn = ''): ReadonlyArray<IExts> {
		const aRet :IExts[] = [];
		const regPtn = new RegExp(fnptn);
		const regExt = new RegExp(extptn);
		for (let fn in this.hPathFn2Exts) {
			if (fn.search(regPtn) == -1) continue;

			const h_exts = this.hPathFn2Exts[fn];
			if (extptn == '') {aRet.push(h_exts); continue;}

			const o :IExts = {};
			let isa = false;
			for (const ext in h_exts) {
				if (ext.search(regExt) == -1) continue;

				o[ext] = h_exts[ext];
				isa = true;
			}
			if (isa) aRet.push(o);
		}
		return aRet;
	}

}
