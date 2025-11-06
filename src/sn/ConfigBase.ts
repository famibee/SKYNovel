/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2022-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {int} from './CmnLib';

export const enum SEARCH_PATH_ARG_EXT {	// #searchPath 使用時、第二引数用
	DEFAULT	= '',
	SP_GSM	= 'png|jpg|jpeg|json|svg|webp|mp4|webm',
	SCRIPT	= 'sn|ssn',
	FONT	= 'woff2|woff|otf|ttf',
	SOUND	= 'mp3|m4a|ogg|aac|flac|wav',
	HTML	= 'htm|html',
	CSS		=	'css',
	SN		=	'sn',

	TST_PNGPNG_	= 'png|png_',
	TST_HH		= 'hh',
	TST_EEE		= 'eee',
	TST_GGG		= 'ggg',
	TST_PNGXML	= 'png|xml',
}


export type T_CFG_RAW = {
	book	: {
		title		: string,	// 作品タイトル
		creator		: string,	// 著作者
		cre_url		: string,	// 連絡先URL
		publisher	: string,	// 出版者
		pub_url		: string,	// 出版社URL
		detail		: string,	// 内容紹介
		version		: string,	// version
	},
	save_ns?	: string,
	window?	: {		// アプリケーションウインドウサイズ
		width	: number,
		height	: number,
	},
	log?	: {max_len: number},	// プレイヤーが読んだ文章を読み返せる履歴の長さ
	init	: {
		bg_color			: string | number,	// 背景色
		tagch_msecwait		: number,	// 通常文字表示待ち時間（未読／既読）
		auto_msecpagewait	: number,	// 自動文字表示、行待ち時間（未読／既読）
		escape				: string,	// エスケープ文字
	},
	debug	: {	// デバッグ情報
		devtool		: boolean,
		dumpHtm		: boolean,	// テキストレイヤ：HTML部分をファイル出力するか
		token		: boolean,
		tag			: boolean,
		putCh		: boolean,
		debugLog	: boolean,
		baseTx		: boolean,
		masume		: boolean,	// テキストレイヤ：ガイドマス目を表示するか
		variable	: boolean,
	},
	code	: {[fold_nm: string]: boolean,},	// 暗号化しないフォルダ
	debuger_token	: string,	// デバッガとの接続トークン
}
export type T_CFG = T_CFG_RAW & {
	save_ns		: string,
	window	: {		// アプリケーションウインドウサイズ
		width	: number,
		height	: number,
	},
	log		: {max_len: number},	// プレイヤーが読んだ文章を読み返せる履歴の長さ
}

export function creCFG(): T_CFG {return {
	save_ns		: '',		// 扱うセーブデータを一意に識別するキーワード文字列
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
	log		: {max_len: 64},	// プレイヤーが読んだ文章を読み返せる履歴のページ数
	init	: {
		bg_color			: '#000000',	// 背景色
		tagch_msecwait		: 10,	// 通常文字表示待ち時間（未読／既読）
		auto_msecpagewait	: 3500,	// 自動文字表示、行クリック待ち時間（未読／既読）
		escape				: '',	// エスケープ文字
	},
	debug	: {
		devtool		: false,
		dumpHtm		: false,
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
}}


export type T_Exts = {
	':cnt'?			: number;
} & {
	[ext: string]	: string;	// pp
};
export type T_Fn2Path = { [fn: string]: T_Exts; };

export type T_SEARCHPATH = (fn: string, extptn?: SEARCH_PATH_ARG_EXT)=> string;
export type T_Config = {
	oCfg		: T_CFG;
	headNs		: string;
	searchPath	: T_SEARCHPATH;
	matchPath	: (fnptn: string, extptn?: SEARCH_PATH_ARG_EXT)=> readonly T_Exts[];
	addPath		: (fn: string, h_exts: T_Exts)=> void;
}

export type T_SysRoots = {
	dec(ext: string, tx: string): Promise<string>;
	decAB(ab: ArrayBuffer): Promise<HTMLImageElement | HTMLVideoElement | ArrayBuffer>;

	arg: T_HSysBaseArg;
	fetch(url: string): Promise<Response>;	// ハッシュ値作成ロード用
	hash(str: string): string;
}
export type T_HSysBaseArg = {
	cur		: string;
	crypto	: boolean;
	dip?	: string;
}


export class ConfigBase implements T_Config {
	oCfg	= creCFG();

				userFnTail		= '';	// 4tst public
	protected	hPathFn2Exts	: T_Fn2Path	= {};

	protected	constructor(readonly sys: T_SysRoots) {}

	//	Main.generate() -> Config.generate() -> Config.load() ->
	protected	async load(oCfg: T_CFG_RAW) {
		// this.oCfg = {...this.oCfg, ...oCfg};	// 一階層目でコピーしてしまう
		this.oCfg.save_ns = oCfg.save_ns ?? this.oCfg.save_ns;

		oCfg.window ??= {width: 300, height: 300};
		this.oCfg.window.width = oCfg.window.width;
		this.oCfg.window.height = oCfg.window.height;

		this.oCfg.book = {...this.oCfg.book, ...oCfg.book};

		this.oCfg.log.max_len = oCfg.log?.max_len ?? this.oCfg.log.max_len;

		this.oCfg.init = {...this.oCfg.init, ...oCfg.init};

		this.oCfg.debug = {...this.oCfg.debug, ...oCfg.debug};

		this.oCfg.debuger_token = oCfg.debuger_token;


		// path.json ロード
		const fn = this.sys.arg.cur +'path.json';
		const res = await this.sys.fetch(fn);
		if (! res.ok) throw Error(res.statusText);

		const src = await res.text();
		const oJs = <T_Fn2Path>JSON.parse(await this.sys.dec(fn, src));
		for (const [nm, v] of Object.entries(oJs)) {
			const h = this.hPathFn2Exts[nm] = v;
			for (const [ext, w] of Object.entries(h)) {
				if (ext !== ':cnt') h[ext] = this.sys.arg.cur + <string>w;
			}
		}

		this.#existsBreakline = this.matchPath('^breakline$', SEARCH_PATH_ARG_EXT.SP_GSM).length > 0;
		this.#existsBreakpage = this.matchPath('^breakpage$', SEARCH_PATH_ARG_EXT.SP_GSM).length > 0;

		// ファイル改竄チェック
		const hFn2Ext: {[fn: string]: string}	= {};
		if (this.sys.arg.crypto)
		for (const [fn0, hExts] of Object.entries(this.hPathFn2Exts)) {
			for (const [ext, pp] of Object.entries(hExts)) {
				if (! ext.startsWith(':')) {hFn2Ext[fn0] = ext; continue}
				if (! ext.endsWith(':id')) continue;

				const hp = (<string>pp).slice((<string>pp).lastIndexOf('/') +1);
				const fn = hExts[ext.slice(0, -10)] ?? '';
				const res = await this.sys.fetch(fn);
				const src = await res.text();
				const hf = this.sys.hash(src);
				if (hp !== hf) throw `ファイル改竄エラーです fn:${fn}`;
			}
		}
		// 出力・副作用なしなのでコメントアウト
		// else for (const [fn0, hExts] of Object.entries(this.hPathFn2Exts)) {
		// 	for (const ext of Object.keys(hExts)) {
		// 		if (! ext.startsWith(':')) hFn2Ext[fn0] = ext;
		// 	}
		// }
	}
	#existsBreakline = false;
	get existsBreakline(): boolean {return this.#existsBreakline}
	#existsBreakpage = false;
	get existsBreakpage(): boolean {return this.#existsBreakpage}

	get headNs() {return `skynovel.${this.oCfg.save_ns} - `}

	readonly	#REG_PATH = /([^/\s]+)\.([^\d]\w+)/;
		// 4 match 498 step(~1ms)  https://regex101.com/r/tpVgmI/1
	searchPath(fn: string, extptn: SEARCH_PATH_ARG_EXT = SEARCH_PATH_ARG_EXT.DEFAULT): string {
		if (! fn) throw '[searchPath] fnが空です';
		if (fn.startsWith('http://')) return fn;

		const a = fn.match(this.#REG_PATH);
		let fn0 = a ?a[1] ?? '' :fn;
		const ext = a ?a[2] :'';
		if (this.userFnTail) {
			const utn = fn0 +'@@'+ this.userFnTail;
			if (utn in this.hPathFn2Exts) {
				if (extptn === SEARCH_PATH_ARG_EXT.DEFAULT) fn0 = utn;
				else for (const e3 of Object.keys(this.hPathFn2Exts[utn] ?? {})) {
					if (`|${extptn}|`.includes(`|${e3}|`)) {fn0 = utn; break}
				}
			}
		}
		const h_exts = this.hPathFn2Exts[fn0];
		if (! h_exts) throw `サーチパスに存在しないファイル【${fn}】です`;

		if (! ext) {	// fnに拡張子が含まれていない
			//	extのどれかでサーチ（ファイル名サーチ→拡張子群にextが含まれるか）
			const hcnt = int(h_exts[':cnt']);
			if (extptn === SEARCH_PATH_ARG_EXT.DEFAULT) {
				if (hcnt > 1) throw `指定ファイル【${fn}】が複数マッチします。サーチ対象拡張子群【${extptn}】で絞り込むか、ファイル名を個別にして下さい。`;

				return fn;
			}

			const search_exts = `|${extptn}|`;
			if (hcnt > 1) {
				let cnt = 0;
				for (const e2 of Object.keys(h_exts)) {
					if (! search_exts.includes(`|${e2}|`)) continue;
					if (++cnt > 1) throw `指定ファイル【${fn}】が複数マッチします。サーチ対象拡張子群【${extptn}】で絞り込むか、ファイル名を個別にして下さい。`;
				}
			}
			for (const [ext, pp] of Object.entries(h_exts)) {
				if (search_exts.includes(`|${ext}|`)) return <string>pp;
			}
			throw `サーチ対象拡張子群【${extptn}】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【${fn}】`;
		}

		// fnに拡張子xが含まれている
		//	ファイル名サーチ→拡張子群にxが含まれるか
		if (extptn !== SEARCH_PATH_ARG_EXT.DEFAULT && ! `|${extptn}|`.includes(`|${ext}|`)) {
			throw `指定ファイルの拡張子【${ext}】は、サーチ対象拡張子群【${extptn}】にマッチしません。探索ファイル名=【${fn}】`;
		}

		const ret = h_exts[ext];
		if (! ret) throw `サーチパスに存在しない拡張子【${ext}】です。探索ファイル名=【${fn}】、サーチ対象拡張子群【${extptn}】`;

		return ret;
	}

	matchPath(fnptn: string, extptn: SEARCH_PATH_ARG_EXT = SEARCH_PATH_ARG_EXT.DEFAULT): readonly T_Exts[] {
		const aRet :T_Exts[] = [];
		const regPtn = new RegExp(fnptn);
		const regExt = new RegExp(extptn);
		for (const [fn, h_exts] of Object.entries(this.hPathFn2Exts)) {
			if (fn.search(regPtn) === -1) continue;
			if (extptn === SEARCH_PATH_ARG_EXT.DEFAULT) {aRet.push(h_exts); continue}

			const o :T_Exts = {};
			let isa = false;
			for (const ext of Object.keys(h_exts)) {
				if (ext.search(regExt) === -1) continue;

				o[ext] = fn;
				isa = true;
			}
			if (isa) aRet.push(o);
		}
		return aRet;
	}

	addPath(fn: string, h_exts: T_Exts) {
		const o: T_Exts = {};
		for (const [ext, v] of Object.entries(h_exts)) {
			o[ext] = (ext.startsWith(':') ?'' :this.sys.arg.cur) + String(v);
		}
		this.hPathFn2Exts[fn] = o;
	}

}
