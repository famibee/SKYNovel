/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {SysBase} from './SysBase';
import {CmnLib} from './CmnLib';
import type {IFn2Path, IConfig} from './ConfigBase';
import type {IVariable, IMain} from './CmnInterface';
import type {IHTag} from './Grammar';

import type {Application} from 'pixi.js';


export class SysNode extends SysBase {
	override async loadPath(hPathFn2Exts: IFn2Path, cfg: IConfig) {
		await super.loadPath(hPathFn2Exts, cfg);

		const fn = this.arg.cur +'path.json';
		const src = await (await this.fetch(fn)).text();
		const oJs = JSON.parse(await this.dec(fn, src));
		for (const [nm, v] of Object.entries(oJs)) {
			const h = hPathFn2Exts[nm] = <any>v;
			for (const [ext, w] of Object.entries(h)) {
				if (ext !== ':cnt') h[ext] = this.arg.cur + w;
			}
		}
	}


	override init(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): Promise<void>[] {
		const ret = super.init(hTag, appPixi, val, main);
		document.body.style.backgroundColor = '#000';
		return ret;
	}

	override readonly	isApp = true;

	override async savePic(fn: string, data_url: string) {
		const bs64 = data_url.slice(data_url.indexOf(',', 20) +1);
		try {
			this.ensureFileSync(fn);
			await this.writeFileSync(fn, bs64);
			if (CmnLib.debugLog) console.log(`画像ファイル ${fn} を保存しました`);
		} catch (e) {throw e}
	};

	protected	async writeFileSync(_path: string, _data: string | NodeJS.ArrayBufferView, _o?: object) {}

}
