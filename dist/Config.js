import { t as CmnLib } from "./CmnLib.js";
import { n as SEARCH_PATH_ARG_EXT, t as ConfigBase } from "./ConfigBase.js";
const PROTOCOL_USERDATA = "userdata:/", PROTOCOL_DL = "downloads:/";
var Config = class r extends ConfigBase {
	static async generate(e) {
		let t = new r(e), n = e.arg.cur + "prj.json", i = await e.fetch(n);
		if (!i.ok) throw Error(i.statusText);
		let a = await e.dec(n, await i.text());
		return await t.load(JSON.parse(a)), t;
	}
	constructor(e) {
		super(e), this.sys = e;
	}
	async load(t) {
		return t.window ??= {
			width: 300,
			height: 300
		}, CmnLib.stageW = t.window.width, CmnLib.stageH = t.window.height, CmnLib.debugLog = t.debug.debugLog, await CmnLib.init(), super.load(t);
	}
	searchPath(e, n = SEARCH_PATH_ARG_EXT.DEFAULT) {
		return e.startsWith("downloads:/") ? this.sys.path_downloads + e.slice(11) : e.startsWith("userdata:/") ? this.sys.path_userdata + "storage/" + e.slice(10) : super.searchPath(e, n);
	}
};
export { PROTOCOL_DL as n, PROTOCOL_USERDATA as r, Config as t };

//# sourceMappingURL=Config.js.map