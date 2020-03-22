/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2020 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import { SysBase } from "./SysBase";
import {CmnLib} from './CmnLib';
import {IFn2Path, IConfig} from './CmnInterface';

import m_fs = require('fs-extra');

export class SysNode extends SysBase {
	protected readonly	normalize	= (src: string, _form: string)=> src;	// for test

	loadPathAndVal(hPathFn2Exts: IFn2Path, fncLoaded: ()=> void, _cfg: IConfig): void {
		(async ()=> {
			const fn = this.arg.cur +'path.json';
			const mes = m_fs.readFileSync(fn, {encoding: 'utf8'});
			const json = JSON.parse(await this.pre('json', mes));
			for (const nm in json) {
				const h = hPathFn2Exts[nm] = json[nm];
				for (const ext in h) if (ext != ':cnt') h[ext] = this.arg.cur + h[ext];
			}
			fncLoaded();	// ここでnew Variable、clearsysvar()、次にinitVal()
		})();
	}

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

	readonly	appendFile = m_fs.appendFile;

}
