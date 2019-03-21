/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import { SysBase } from "./SysBase";
import {CmnLib, uint} from './CmnLib';
import {IFn2Path} from './CmnInterface';
import {Config} from './Config';

import m_fs = require('fs-extra');
import m_path = require('path');

export class SysNode extends SysBase {
	protected	readonly	normalize	= (src: string, _form: string)=> src;	// for test
	loadPathAndVal(hFn2Path: IFn2Path, fncLoaded: ()=> void, cfg: Config): void {
		this.getHFn2Path(hFn2Path, cfg.oCfg);

		fncLoaded();

		// path.json自動生成
		if (! this.existsSync(this.cur +'path.json')) this.writeFile(
			this.cur +'path.json',
			cfg.getJsonSearchPath().replace(new RegExp(this.cur, 'g'), '')
		);
	}
	private getHFn2Path(hPathFn2Exts: IFn2Path, oCfg: any) {
		const REG_FN_RATE_SPRIT	= /(.+?)(?:%40(\d)x)?(\.\w+)/;
		// ｛ファイル名：｛拡張子：パス｝｝形式で格納。
		//		検索が高速なハッシュ形式。
		//		ここでの「ファイル名」と「拡張子」はスクリプト経由なので
		//		URLエンコードされていない物を想定。
		//		パスのみURLエンコード済みの、File.urlと同様の物を。
		//		あとで実際にロード関数に渡すので。
		if (oCfg.search) for (const dir of oCfg.search) {
			const wd = m_path.resolve(this.$cur, dir);
			if (! this.existsSync(wd)) continue;

			for (const nm_base of this.readdirSync(wd)) {
				const nm = this.normalize(nm_base, 'NFC');
				if (nm.charAt(0) == '.' || nm == 'Thumbs.db'
					|| nm == 'Desktop.ini' || nm == '_notes'
					|| nm == 'Icon\r') continue;
				const fo_url = m_path.resolve(wd, nm);
				if (this.isDirectory(fo_url)) continue;
				const fo_ext = CmnLib.getExt(nm);
				if (fo_ext in this.hExtNG) continue;

				const fo_fn = CmnLib.getFn(nm);
				let h_exts = hPathFn2Exts[fo_fn];
				if (! h_exts) {
					h_exts = hPathFn2Exts[fo_fn] = {':cnt': '1'};
				}
				else if (fo_ext in h_exts) {
					throw Error(`[xmlCfg.search.path] サーチパスにおいてファイル名＋拡張子【${fo_fn}】が重複しています。フォルダを縦断検索するため許されません`);
				}
				else {
					h_exts[':cnt'] = String(uint(h_exts[':cnt']) +1);
				}
				h_exts[fo_ext] = fo_url;
				if (! CmnLib.isRetina) continue;

				const oRate = REG_FN_RATE_SPRIT.exec(fo_url);
				if (! oRate) continue;
				if (oRate[2]) continue;

				// fo_fnが「@無し」のh_extsに「@あり」を代入
				const fn_xga = oRate[1] + this.retinaFnTail + oRate[3];
				if (this.existsSync(fn_xga)) {
					this.hPathFn2Retina[fo_fn] = true;
					h_exts[fo_ext] = fn_xga;
					continue;
				}
				h_exts[fo_ext] = fo_url;
			}
		}
	}


	private	readonly	hExtNG	= {	// Steam対策
		'db'		:0,
		'ini'		:0,
		'DS_Store'	:0
	};
	private	retinaFnTail	= '';
	private	hPathFn2Retina	: {[name: string]: boolean}	= {};

	protected	readonly isApp = ()=> true;

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
