/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import { SysBase } from "./SysBase";
import {CmnLib, uint} from './CmnLib';
import {IFn2Path} from './CmnInterface';

import m_fs = require('fs-extra');
import m_path = require('path');

export class SysNode extends SysBase {
	protected readonly	normalize	= (src: string, _form: string)=> src;	// for test
	loadPathAndVal(hFn2Path: IFn2Path, fncLoaded: ()=> void): void {
		const REG_FN_RATE_SPRIT	= /(.+?)(?:%40(\d)x)?(\.\w+)/;
		// ｛ファイル名：｛拡張子：パス｝｝形式で格納。
		//		検索が高速なハッシュ形式。
		//		ここでの「ファイル名」と「拡張子」はスクリプト経由なので
		//		URLエンコードされていない物を想定。
		//		パスのみURLエンコード済みの、File.urlと同様の物を。
		//		あとで実際にロード関数に渡すので。
		this.foldProc(this.arg.cur, ()=> {}, (dir: string)=> {
			const wd = m_path.resolve(this.arg.cur, dir);
			this.foldProc(wd, (url, nm)=> {

				const fo_ext = CmnLib.getExt(nm);
				if (fo_ext in this.hExtNG) return;

				const fo_fn = CmnLib.getFn(nm);
				let h_exts = hFn2Path[fo_fn];
				if (! h_exts) {
					h_exts = hFn2Path[fo_fn] = {':cnt': '1'};
				}
				else if (fo_ext in h_exts) {
					throw Error(`[xmlCfg.search.path] サーチパスにおいてファイル名＋拡張子【${fo_fn}】が重複しています。フォルダを縦断検索するため許されません`);
				}
				else {
					h_exts[':cnt'] = String(uint(h_exts[':cnt']) +1);
				}
				h_exts[fo_ext] = url;
				if (! CmnLib.isRetina) return;

				const oRate = REG_FN_RATE_SPRIT.exec(url);
				if (! oRate) return;
				if (oRate[2]) return;

				// fo_fnが「@無し」のh_extsに「@あり」を代入
				const fn_xga = oRate[1] + this.retinaFnTail + oRate[3];
				if (this.existsSync(fn_xga)) {
					this.hPathFn2Retina[fo_fn] = true;
					h_exts[fo_ext] = fn_xga;
					return;
				}
				h_exts[fo_ext] = url;
			}, ()=> {});
		});

		fncLoaded();
	}

	private readonly	regNoUseSysFile = /^(\..+|.+.db|.+.ini|_notes|Icon\r)$/;
	private foldProc(wd: string, fnc: (url: string, nm: string)=> void, fncFld: (nm: string)=> void) {
		for (const nm of m_fs.readdirSync(wd)) {
			if (this.regNoUseSysFile.test(nm)) continue;
			const url = m_path.resolve(wd, this.normalize(nm, 'NFC'));
			if (m_fs.lstatSync(url).isDirectory()) {fncFld(nm); continue;}

			fnc(url, nm);
		}
	}


	private readonly	hExtNG	= {	// Steam対策
		'db'		:0,
		'ini'		:0,
		'DS_Store'	:0
	};
	private	retinaFnTail	= '';
	private	hPathFn2Retina	: {[name: string]: boolean}	= {};

	protected readonly	isApp = ()=> true;

	readonly	existsSync = m_fs.existsSync;
	//readFileSync = m_fs.readFileSync;
	//readFile = m_fs.readFile;
	readonly	writeFile = m_fs.writeFile;
	readonly	savePic = (fn: string, data_url: string)=> {
		const bs64 = data_url.slice(data_url.indexOf(',', 20) +1);
		this.writeFile(fn, Buffer.from(bs64, 'base64'), err=> {
			if (err) throw err;
			if (CmnLib.devtool) console.log(`画像ファイル ${fn} を保存しました`);
		});
	};

	readonly	isDirectory = (path: string)=> m_fs.lstatSync(path).isDirectory();
	readonly	readdirSync = m_fs.readdirSync;

	readonly	appendFile = m_fs.appendFile;

}
