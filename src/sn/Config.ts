/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib} from './CmnLib';
import {SysBase} from './SysBase';
import {ConfigBase, SEARCH_PATH_ARG_EXT} from './ConfigBase';


export class Config extends ConfigBase {
	static	async	generate(sys: SysBase) {
		const c = new Config(sys);
		const fn = sys.cur +'prj.json';
		const src = await (await sys.fetch(fn)).text();
		const oJs = JSON.parse(await sys.dec(fn, src));
		await c.load(oJs);
		return c;
	}

	constructor(override readonly sys: SysBase) {super(sys)}
	override	async load(oCfg: any) {		// test用に public
		await super.load(oCfg);

		CmnLib.stageW = this.oCfg.window.width;
		CmnLib.stageH = this.oCfg.window.height;
		CmnLib.debugLog = this.oCfg.debug.debugLog;
	}

	override	searchPath(path: string, extptn: SEARCH_PATH_ARG_EXT = SEARCH_PATH_ARG_EXT.DEFAULT): string {
		if (path.slice(0, 11) === 'downloads:/') {
			return this.sys.path_downloads + path.slice(11);
		}
		if (path.slice(0, 10) === 'userdata:/') {
			return this.sys.path_userdata + 'storage/'+ path.slice(10);
		}

		return super.searchPath(path, extptn);
	}

}
