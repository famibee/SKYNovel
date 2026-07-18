import { t as e } from "./CmnLib.js";
import { n as t, t as n } from "./ConfigBase.js";
//#region src/sn/Config.ts
var r = "userdata:/", i = "downloads:/", a = class r extends n {
	sys;
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
		}, e.stageW = t.window.width, e.stageH = t.window.height, e.debugLog = t.debug.debugLog, await e.init(), super.load(t);
	}
	searchPath(e, n = t.DEFAULT) {
		return e.startsWith("downloads:/") ? this.sys.path_downloads + e.slice(11) : e.startsWith("userdata:/") ? this.sys.path_userdata + "storage/" + e.slice(10) : super.searchPath(e, n);
	}
};
//#endregion
export { i as n, r, a as t };

//# sourceMappingURL=Config.js.map