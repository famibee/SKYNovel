/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import { SysBase } from "./SysBase";
import {CmnLib, uint} from './CmnLib';
import {IPathFn2Exts} from './CmnInterface';
import {Config} from './Config';

import m_fs = require('fs-extra');
import m_path = require('path');

export class SysNode extends SysBase {
	protected	normalize	= (src: string, _form: string)=> src;	// for test
	loadPathAndVal(hPathFn2Exts: IPathFn2Exts, fncLoaded: ()=> void, cfg: Config): void {
		const REG_FN_RATE_SPRIT	= /(.+?)(?:%40(\d)x)?(\.\w+)/;
		// ｛ファイル名：｛拡張子：パス｝｝形式で格納。
		//		検索が高速なハッシュ形式。
		//		ここでの「ファイル名」と「拡張子」はスクリプト経由なので
		//		URLエンコードされていない物を想定。
		//		パスのみURLエンコード済みの、File.urlと同様の物を。
		//		あとで実際にロード関数に渡すので。
		if (cfg.oCfg.search) for (const dir of cfg.oCfg.search) {
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

		// スプライトシート用json自動生成機能
		// breakline.5x20.png
		for (const o of cfg.matchPath('.+\\.\\d+x\\d+$', 'png|jpg|jpeg')) {
			for (const ext in o) {
				const path = o[ext];
				const fn = CmnLib.getFn(path);
				const fnJs = m_path.dirname(path) + m_path.sep + CmnLib.getFn(fn) +'.json';
				if (this.existsSync(fnJs)) continue;

				const ldr = new PIXI.loaders.Loader();
				ldr.add(fn, path);
				ldr.load((_loader: any, res: any)=> {
					const orig = res[fn].texture.orig;
					const w_pic = orig.width;
					const h_pic = orig.height;

					const idxX = fn.lastIndexOf('x');
					const idxDot = fn.lastIndexOf('.');
					const xLen = uint(fn.slice(idxDot +1, idxX));
					const yLen = uint(fn.slice(idxX +1));
					const basename = fn.slice(0, fn.lastIndexOf('.'));
			//console.log('ext:'+ ext +' path:'+ path +' fn:'+ fn +' basename:'+ basename +' fnJs:'+ fnJs);
					const w = w_pic /xLen;
					const h = h_pic /yLen;
					const oJs :any = {
						frames: {},
						meta: {
							app: 'skynovel',
							version: '1.0',
							image: fn +'.'+ ext,
							format: 'RGBA8888',
							size: {w: w_pic, h :h_pic},
							scale: 1,
							animationSpeed: 1,	// 0.01~1.00
						},
					};
					let cnt = 0;
					for (let ix=0; ix<xLen; ++ix) {
						for (let iy=0; iy<yLen; ++iy) {
							++cnt;
							oJs.frames[basename + ('000'+cnt).slice(-4) +'.'+ ext] = {
								frame: {x: ix *w, y: iy*h, w: w, h :h},
								rotated: false,
								trimmed: false,
								spriteSourceSize: {x: 0, y: 0, w: w_pic, h :h_pic},
								sourceSize: {w: w, h :h},
								pivot: {x: 0.5, y: 0.5},
							};
						}
					}
					this.writeFile(fnJs, JSON.stringify(oJs));
				});
			}
		}

		fncLoaded();

		// path.json自動生成
		if (! this.existsSync(this.cur +'path.json')) this.writeFile(
			this.cur +'path.json',
			cfg.getJsonSearchPath().replace(new RegExp(this.cur, 'g'), '')
		);
	}
	private	hExtNG	= {	// Steam対策
		'db'		:0,
		'ini'		:0,
		'DS_Store'	:0
	};
	private	retinaFnTail	= '';
	private	hPathFn2Retina	: {[name: string]: boolean}	= {};

	protected isApp = ()=> true;

	existsSync = m_fs.existsSync;
	//readFileSync = m_fs.readFileSync;
	//readFile = m_fs.readFile;
	writeFile = m_fs.writeFile;
	savePic = (fn: string, data_url: string)=> {
		const bs64 = data_url.slice(data_url.indexOf(',', 20) +1);
		this.writeFile(fn, Buffer.from(bs64, 'base64'), err=> {
			if (err) throw err;
			if (CmnLib.devtool) console.log(`画像ファイル ${fn} を保存しました`);
		});
	};

	isDirectory = (path: string)=> m_fs.lstatSync(path).isDirectory();
	readdirSync = m_fs.readdirSync;

	appendFile = m_fs.appendFile;

}
