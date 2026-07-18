//#region src/sn/CallStack.ts
function e() {
	return {
		"const.sn.macro": "{}",
		"const.sn.me_call_scriptFn": ""
	};
}
function t() {
	return {
		":hEvt1Time": {},
		":hMp": e(),
		":lenIfStk": 1
	};
}
var n = class {
	fn;
	idx;
	csArg;
	constructor(e = "", n = 0, r = t()) {
		this.fn = e, this.idx = n, this.csArg = r;
	}
	toString = () => `[fn:${this.fn}, idx:${String(this.idx)}, csArg:${JSON.stringify(this.csArg)}]`;
};
//#endregion
export { t as n, e as r, n as t };

//# sourceMappingURL=CallStack.js.map