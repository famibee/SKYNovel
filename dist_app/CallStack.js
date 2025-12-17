function creMP() {
	return {
		"const.sn.macro": "{}",
		"const.sn.me_call_scriptFn": ""
	};
}
function creCSArg() {
	return {
		":hEvt1Time": {},
		":hMp": creMP(),
		":lenIfStk": 1
	};
}
var CallStack = class {
	constructor(e = "", n = 0, r = creCSArg()) {
		this.fn = e, this.idx = n, this.csArg = r;
	}
	toString = () => `[fn:${this.fn}, idx:${String(this.idx)}, csArg:${JSON.stringify(this.csArg)}]`;
};
export { creCSArg as n, creMP as r, CallStack as t };

//# sourceMappingURL=CallStack.js.map