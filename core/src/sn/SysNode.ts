/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2022 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {SysBase} from "./SysBase";
import {CmnLib} from './CmnLib';
import {IFn2Path, IConfig} from './CmnInterface';

export class SysNode extends SysBase {
	override async loadPath(hPathFn2Exts: IFn2Path, cfg: IConfig) {
		await super.loadPath(hPathFn2Exts, cfg);

		const fn = this.arg.cur +'path.json';
		const src = await this.readFileSync(fn);
		const oJs = JSON.parse(this.decStr(fn, src));
		for (const nm in oJs) {
			const h = hPathFn2Exts[nm] = oJs[nm];
			for (const ext in h) if (ext !== ':cnt') h[ext] = this.arg.cur + h[ext];
		}
	}

	protected override readonly	isApp = true;

	override async savePic(fn: string, data_url: string) {
		const bs64 = data_url.slice(data_url.indexOf(',', 20) +1);
		try {
			await this.writeFileSync(fn, Buffer.from(bs64, 'base64'));
			if (CmnLib.debugLog) console.log(`画像ファイル ${fn} を保存しました`);
		} catch (e) {throw e;}
	};

	protected	async readFileSync(_path: string): Promise<string> {return ''};
	protected	async writeFileSync(_path: string, _data: string | NodeJS.ArrayBufferView, _o?: object) {}

}
