/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2021 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {SysBase} from "./SysBase";
import {CmnLib} from './CmnLib';
import {IFn2Path, IConfig} from './CmnInterface';

export class SysNode extends SysBase {
	protected readonly	normalize	= (src: string, _form: string)=> src;	// for test

	loadPathAndVal(hPathFn2Exts: IFn2Path, fncLoaded: ()=> void, cfg: IConfig) {
		super.loadPathAndVal(hPathFn2Exts, fncLoaded, cfg);
		(async ()=> {
			const fn = this.arg.cur +'path.json';
			const mes = await this.readFileSync(fn);
			const json = JSON.parse(await this.pre('json', mes));
			for (const nm in json) {
				const h = hPathFn2Exts[nm] = json[nm];
				for (const ext in h) if (ext !== ':cnt') h[ext] = this.arg.cur + h[ext];
			}
			fncLoaded();	// ここでnew Variable、clearsysvar()、次にinitVal()
		})();
	}

	protected readonly	isApp = true;

	async savePic(fn: string, data_url: string) {
		const bs64 = data_url.slice(data_url.indexOf(',', 20) +1);
		try {
			await this.writeFileSync(fn, Buffer.from(bs64, 'base64'));
			if (CmnLib.debugLog) console.log(`画像ファイル ${fn} を保存しました`);
		} catch (e) {throw e;}
	};

	protected	async readFileSync(_path: string): Promise<string> {return ''};
	protected	async writeFileSync(_path: string, _data: Buffer, _o?: object) {}

}
