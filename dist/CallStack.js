function r() {
  return {
    "const.sn.macro": "{}",
    "const.sn.me_call_scriptFn": ""
  };
}
function c() {
  return {
    ":hEvt1Time": {},
    ":hMp": r(),
    ":lenIfStk": 1
  };
}
class a {
  constructor(t = "", s = 0, n = c()) {
    this.fn = t, this.idx = s, this.csArg = n;
  }
  toString = () => `[fn:${this.fn}, idx:${String(this.idx)}, csArg:${JSON.stringify(this.csArg)}]`;
}
export {
  a as C,
  r as a,
  c
};
//# sourceMappingURL=CallStack.js.map
