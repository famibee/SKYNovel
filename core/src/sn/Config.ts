/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, int} from './CmnLib';
import {IConfig, IExts, IFn2Path} from './CmnInterface';
import {SysBase} from './SysBase';

export class Config implements IConfig {
	oCfg: any = {
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
		},
		log		: {max_len: 1024},	// プレイヤーが読んだ文章を読み返せる履歴の長さ
		init	: {
			bg_color			: 0x000000,	// 背景色
			tagch_msecwait		: 10,		// 通常文字表示待ち時間（未読／既読）
			auto_msecpagewait	: 3500,		// 自動文字表示、行クリック待ち時間（未読／既読）
			escape				: '',		// エスケープ文字
		},
		debug	: {
			devtool		: false,
			token		: false,
			tag			: false,
			putCh		: false,
			debugLog	: false,
			baseTx		: false,
			masume		: false,	// テキストレイヤ：ガイドマス目を表示するか
			variable	: false,
		},
	};
	userFnTail	= '';

	private	hPathFn2Exts	: IFn2Path		= {};
	readonly getJsonSearchPath	= ()=> JSON.stringify(this.hPathFn2Exts);

	static	readonly	EXT_SPRITE	= 'png|jpg|jpeg|json|svg|webp|mp4|webm';
//	static	readonly	EXT_SPRITE	= 'png|jpg|jpeg|json|svg|webp|mp4|webm|ogv';
		// NOTE: ogvがそもそも再生できないので、ogvのみ保留
	static	readonly	EXT_SCRIPT	= 'sn';
	static	readonly	EXT_FONT	= 'woff2|otf|ttf';
	static	readonly	EXT_SOUND	= 'mp3|m4a|ogg|aac|flac|wav';
	static	readonly	EXT_HTML	= 'htm|html';

	constructor(private readonly sys: SysBase, fncLoaded: ()=> void, oCfg4tst?: any) {
		const load = (oCfg: any)=> {
			// this.oCfg = {...this.oCfg, ...oCfg};	// 一階層目でコピーしてしまう
			this.oCfg.save_ns = oCfg?.save_ns ?? this.oCfg.save_ns;

			this.oCfg.coder = oCfg?.coder ?? this.oCfg.coder;

			CmnLib.stageW = this.oCfg.window.width = Number(oCfg?.window?.width ?? this.oCfg.window.width);
			CmnLib.stageH = this.oCfg.window.height = Number(oCfg?.window?.height ?? this.oCfg.window.height);

			this.oCfg.book = {...this.oCfg.book, ...oCfg.book};

			this.oCfg.log.max_len = oCfg.log?.max_len?.max_len ?? this.oCfg.log.max_len;

			this.oCfg.init = {...this.oCfg.init, ...oCfg.init};
			if ('init' in oCfg) {
				for (const n in this.oCfg.init) {
					const v = String(this.oCfg.init[n]);
					if (v.charAt(0) === '#') this.oCfg.init[n] = parseInt(v.slice(1), 16);
				}
			}

			this.oCfg.debug = {...this.oCfg.debug, ...oCfg.debug};
			CmnLib.debugLog = this.oCfg.debug.debugLog;

			// これが同期（App）非同期（Web、path.json）混在してるので、
			// （Mainのメンバ変数に入れる→他のクラスに渡す都合により）
			// 当クラスのコンストラクタとload()は分ける
			sys.loadPathAndVal(this.hPathFn2Exts, async ()=> {
				this.$existsBreakline = this.matchPath('^breakline$', Config.EXT_SPRITE).length > 0;
				this.$existsBreakpage = this.matchPath('^breakpage$', Config.EXT_SPRITE).length > 0;

				if (this.sys.crypto)
				for (const nm in this.hPathFn2Exts) {
					const o = this.hPathFn2Exts[nm];
					for (const ext in o) {
						if (ext.slice(-10) !== ':RIPEMD160') continue;
						const hp = o[ext].slice(o[ext].lastIndexOf('/') +1);
						const fn = o[ext.slice(0, -10)];
						const res = await sys.fetch(fn);
						const s = await res.text();
						const hf = sys.hash(s);
						if (hp !== hf) throw `ファイル改竄エラーです fn:${fn}`;
					}
				}

				fncLoaded();
			}, this);
		};

		if (oCfg4tst) {load(oCfg4tst); return;}

		// テストで引っかかるのでPromise・async/awaitにしない
		const fn = sys.cur +'prj.json';
		sys.fetch(fn)
		.then(res=> res.text())
		.then(d=> sys.pre('json', d))
		.then(s=> JSON.parse(s))
		.then(load)
		.catch(e=> console.error(`load err fn:prj.json e:%o`, e));
		/*
			(async ()=> {
				const fn = sys.cur +'prj.json';
				const res = await this.fetch(fn);
				load(await res.json());
			})();
		*/
	}
	private $existsBreakline = false;
	get existsBreakline(): boolean {return this.$existsBreakline}
	private $existsBreakpage = false;
	get existsBreakpage(): boolean {return this.$existsBreakpage}

	getNs() {return `skynovel.${this.oCfg.save_ns} - `;}

	private	readonly	regPath = /([^\/\s]+)\.([^\d]\w+)/;
			// 4 match 498 step(~1ms)  https://regex101.com/r/tpVgmI/1
	searchPath(path: string, extptn = ''): string {
		if (! path) throw '[searchPath] fnが空です';
		if (path.substr(0, 7) === 'http://') return path;
		if (path.substr(0, 11) === 'downloads:/') {
			return this.sys.path_downloads + path.slice(11);
		}
		if (path.substr(0, 10) === 'userdata:/') {
			return this.sys.path_userdata + path.slice(10);
		}

		const a = path.match(this.regPath);
		let fn = a ?a[1] :path;
		const ext = a ?a[2] :'';
		if (this.userFnTail) {
			const utn = fn +'@@'+ this.userFnTail;
			if (utn in this.hPathFn2Exts) {
				if (extptn === '') fn = utn;
				else
				for (let e3 in this.hPathFn2Exts[utn]) {
					if (`|${extptn}|`.indexOf(`|${e3}|`) === -1) continue;

					fn = utn;
					break;
				}
			}
		}
		const h_exts = this.hPathFn2Exts[fn];
		if (! h_exts) throw `サーチパスに存在しないファイル【${path}】です`;

		let ret = '';
		if (! ext) {
			// fnに拡張子が含まれていない
			//	extのどれかでサーチ
			//		（ファイル名サーチ→拡張子群にextが含まれるか）
			const hcnt = int(h_exts[':cnt']);
			if (extptn === '') {
				if (hcnt > 1) throw `指定ファイル【${path}】が複数マッチします。サーチ対象拡張子群【${extptn}】で絞り込むか、ファイル名を個別にして下さい。`;

				return path;
			}

			const search_exts = `|${extptn}|`;
			if (hcnt > 1) {
				let cnt = 0;
				for (const e2 in h_exts) {
					if (search_exts.indexOf(`|${e2}|`) === -1) continue;
					if (++cnt > 1) throw `指定ファイル【${path}】が複数マッチします。サーチ対象拡張子群【${extptn}】で絞り込むか、ファイル名を個別にして下さい。`;
				}
			}
			for (let e in h_exts) {
				if (search_exts.indexOf(`|${e}|`) === -1) continue;

				return h_exts[e];
			}
			throw `サーチ対象拡張子群【${extptn}】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【${path}】`;
		}

		// fnに拡張子xが含まれている
		//	ファイル名サーチ→拡張子群にxが含まれるか
		if (extptn !== '') {
			const search_exts2 = `|${extptn}|`;
			if (search_exts2.indexOf(`|${ext}|`) === -1) {
				throw `指定ファイルの拡張子【${ext}】は、サーチ対象拡張子群【${extptn}】にマッチしません。探索ファイル名=【${path}】`;
			}
		}

		ret = h_exts[ext];
		if (! ret) throw `サーチパスに存在しない拡張子【${ext}】です。探索ファイル名=【${path}】、サーチ対象拡張子群【${extptn}】`;

		return ret;
	}

	// 戻り値はフルパスなので注意
	matchPath(fnptn: string, extptn = ''): ReadonlyArray<IExts> {
		const aRet :IExts[] = [];
		const regPtn = new RegExp(fnptn);
		const regExt = new RegExp(extptn);
		for (let fn in this.hPathFn2Exts) {
			if (fn.search(regPtn) === -1) continue;

			const h_exts = this.hPathFn2Exts[fn];
			if (extptn === '') {aRet.push(h_exts); continue;}

			const o :IExts = {};
			let isa = false;
			for (const ext in h_exts) {
				if (ext.search(regExt) === -1) continue;

				o[ext] = h_exts[ext];
				isa = true;
			}
			if (isa) aRet.push(o);
		}
		return aRet;
	}

}
