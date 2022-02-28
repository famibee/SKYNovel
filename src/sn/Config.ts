/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2022 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, int, parseColor} from './CmnLib';
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
		code	: {},	// 暗号化しないフォルダ
		debuger_token	: '',		// デバッガとの接続トークン
	};
	userFnTail	= '';

	hPathFn2Exts	: IFn2Path	= {};
	static	readonly	EXT_SPRITE	= 'png|jpg|jpeg|json|svg|webp|mp4|webm';
		// NOTE: ogvがそもそも再生できないので、ogvのみ保留
	static	readonly	EXT_SCRIPT	= 'sn|ssn';
	static	readonly	EXT_FONT	= 'woff2|woff|otf|ttf';
	static	readonly	EXT_SOUND	= 'mp3|m4a|ogg|aac|flac|wav';
	static	readonly	EXT_HTML	= 'htm|html';

	constructor(readonly sys: SysBase) {}
	static	async	generate(sys: SysBase) {
		const c = new Config(sys);
		const fn = sys.cur +'prj.json';
		const src = await (await sys.fetch(fn)).text();
		const oJs = JSON.parse(sys.decStr(fn, src));
		await c.load(oJs);
		return c;
	}
	async load(oCfg: any) {		// test用に public
		// this.oCfg = {...this.oCfg, ...oCfg};	// 一階層目でコピーしてしまう
		this.oCfg.save_ns = oCfg?.save_ns ?? this.oCfg.save_ns;

		this.oCfg.coder = oCfg?.coder ?? this.oCfg.coder;

		CmnLib.stageW = this.oCfg.window.width = Number(oCfg?.window?.width ?? this.oCfg.window.width);
		CmnLib.stageH = this.oCfg.window.height = Number(oCfg?.window?.height ?? this.oCfg.window.height);

		this.oCfg.book = {...this.oCfg.book, ...oCfg.book};

		this.oCfg.log.max_len = oCfg.log?.max_len?.max_len ?? this.oCfg.log.max_len;

		this.oCfg.init = {...this.oCfg.init, ...oCfg.init};
		this.oCfg.init.bg_color = parseColor(String(this.oCfg.init.bg_color));

		this.oCfg.debug = {...this.oCfg.debug, ...oCfg.debug};
		CmnLib.debugLog = this.oCfg.debug.debugLog;

		this.oCfg.debuger_token = oCfg.debuger_token;

		// これが同期（App）非同期（Web、path.json）混在してるので、
		// （Mainのメンバ変数に入れる→他のクラスに渡す都合により）
		// 当クラスのコンストラクタとload()は分ける
		await this.sys.loadPath(this.hPathFn2Exts, this);

		this.#existsBreakline = this.matchPath('^breakline$', Config.EXT_SPRITE).length > 0;
		this.#existsBreakpage = this.matchPath('^breakpage$', Config.EXT_SPRITE).length > 0;

		if (this.sys.crypto)
		for (const nm in this.hPathFn2Exts) {
			const o = this.hPathFn2Exts[nm];
			for (const ext in o) {
				if (ext.slice(-10) !== ':RIPEMD160') continue;
				const hp = o[ext].slice(o[ext].lastIndexOf('/') +1);
				const fn = o[ext.slice(0, -10)];
				const res = await this.sys.fetch(fn);
				const src = await res.text();
				const hf = this.sys.hash(src);
				if (hp !== hf) throw `ファイル改竄エラーです fn:${fn}`;
			}
		}
	}
	#existsBreakline = false;
	get existsBreakline(): boolean {return this.#existsBreakline}
	#existsBreakpage = false;
	get existsBreakpage(): boolean {return this.#existsBreakpage}

	getNs() {return `skynovel.${this.oCfg.save_ns} - `;}

	readonly	#REG_PATH = /([^\/\s]+)\.([^\d]\w+)/;
		// 4 match 498 step(~1ms)  https://regex101.com/r/tpVgmI/1
	searchPath(path: string, extptn = ''): string {
		if (! path) throw '[searchPath] fnが空です';
		if (path.slice(0, 7) === 'http://') return path;
		if (path.slice(0, 11) === 'downloads:/') {
			const fp = this.sys.path_downloads + path.slice(11);
			this.sys.ensureFileSync(fp);
			return fp;
		}
		if (path.slice(0, 10) === 'userdata:/') {
			const fp = this.sys.path_userdata + 'storage/'+ path.slice(10);
			this.sys.ensureFileSync(fp);
			return fp;
		}

		this.#REG_PATH.lastIndex = 0;
		const a = path.match(this.#REG_PATH);
		let fn = a ?a[1] :path;
		const ext = a ?a[2] :'';
		if (this.userFnTail) {
			const utn = fn +'@@'+ this.userFnTail;
			if (utn in this.hPathFn2Exts) {
				if (extptn === '') fn = utn;
				else for (let e3 in this.hPathFn2Exts[utn]) {
					if (`|${extptn}|`.indexOf(`|${e3}|`) === -1) continue;

					fn = utn;
					break;
				}
			}
		}
		const h_exts = this.hPathFn2Exts[fn];
		if (! h_exts) throw `サーチパスに存在しないファイル【${path}】です`;

		let ret = '';
		if (! ext) {	// fnに拡張子が含まれていない
			//	extのどれかでサーチ（ファイル名サーチ→拡張子群にextが含まれるか）
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
				if (search_exts.indexOf(`|${e}|`) > -1) return h_exts[e];
			}
			throw `サーチ対象拡張子群【${extptn}】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【${path}】`;
		}

		// fnに拡張子xが含まれている
		//	ファイル名サーチ→拡張子群にxが含まれるか
		if (extptn !== '' && `|${extptn}|`.indexOf(`|${ext}|`) === -1) {
			throw `指定ファイルの拡張子【${ext}】は、サーチ対象拡張子群【${extptn}】にマッチしません。探索ファイル名=【${path}】`;
		}

		ret = h_exts[ext];
		if (! ret) throw `サーチパスに存在しない拡張子【${ext}】です。探索ファイル名=【${path}】、サーチ対象拡張子群【${extptn}】`;

		return ret;
	}

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

				o[ext] = fn;
				isa = true;
			}
			if (isa) aRet.push(o);
		}
		return aRet;
	}

	addPath(fn: string, h_exts: IExts) {
		const o: any = {};
		for (const ext in h_exts) {
			o[ext] = (ext.charAt(0) === ':' ?`` :this.sys.cur) + h_exts[ext];
		}
		this.hPathFn2Exts[fn] = o;
	}

}
