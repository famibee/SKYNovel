/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib} from './CmnLib';
import type {SysBase} from './SysBase';
import {ConfigBase, SEARCH_PATH_ARG_EXT, type T_CFG} from './ConfigBase';

export const PROTOCOL_USERDATA	= 'userdata:/';
export const PROTOCOL_DL		= 'downloads:/';


export class Config extends ConfigBase {
	static	async	generate(sys: SysBase) {
		const c = new Config(sys);
		const fn = sys.arg.cur +'prj.json';
		const res = await sys.fetch(fn);
		if (! res.ok) throw Error(res.statusText);

		const dec = await sys.dec(fn, await res.text());
		await c.load(JSON.parse(dec));
		return c;
	}

	protected	constructor(override readonly sys: SysBase) {super(sys)}
	protected	override	async load(oCfg: T_CFG) {
		await super.load(oCfg);

		CmnLib.stageW = oCfg.window.width;
		CmnLib.stageH = oCfg.window.height;
		CmnLib.debugLog = oCfg.debug.debugLog;
	}

	override	searchPath(fn: string, extptn: SEARCH_PATH_ARG_EXT = SEARCH_PATH_ARG_EXT.DEFAULT): string {
		if (fn.startsWith(PROTOCOL_DL)) {
			return this.sys.path_downloads + fn.slice(11);
		}
		if (fn.startsWith(PROTOCOL_USERDATA)) {
			return this.sys.path_userdata + 'storage/'+ fn.slice(10);
		}

		return super.searchPath(fn, extptn);
	}

}
