import { contextBridge as s, ipcRenderer as c } from "electron";
const n = console.error, r = {
  // console.log は【アプリ】のターミナルに出る
  getInfo: () => c.invoke("getInfo").catch(n),
  inited: (e, o) => c.invoke("inited", e, o).catch(n),
  existsSync: (e) => c.invoke("existsSync", e).catch(n),
  copySync: (e, o) => c.invoke("copySync", e, o).catch(n),
  removeSync: (e) => c.invoke("removeSync", e).catch(n),
  ensureFileSync: (e) => c.invoke("ensureFileSync", e).catch(n),
  readFileSync: (e) => c.invoke("readFileSync", e).catch(n),
  writeFileSync: (e, o, i) => c.invoke("writeFileSync", e, o, i).catch(n),
  appendFile: (e, o) => c.invoke("appendFile", e, o).catch(n),
  outputFile: (e, o) => c.invoke("outputFile", e, o).catch(n),
  win_close: () => c.invoke("win_close").catch(n),
  win_setTitle: (e) => c.invoke("win_setTitle", e).catch(n),
  showMessageBox: (e) => c.invoke("showMessageBox", e).catch(n),
  capturePage: (e, o, i) => c.invoke("capturePage", e, o, i).catch(n),
  navigate_to: (e) => c.invoke("navigate_to", e).catch(n),
  openDevTools: () => c.invoke("openDevTools").catch(n),
  Store: (e) => c.invoke("Store", e).catch(n),
  flush: (e) => c.invoke("flush", e).catch(n),
  Store_isEmpty: () => c.invoke("Store_isEmpty").catch(n),
  Store_get: () => c.invoke("Store_get").catch(n),
  zip: (e, o) => c.invoke("zip", e, o).catch(n),
  unzip: (e, o) => c.invoke("unzip", e, o).catch(n),
  isSimpleFullScreen: () => c.invoke("isSimpleFullScreen").catch(n),
  setSimpleFullScreen: (e) => c.invoke("setSimpleFullScreen", e).catch(n),
  window: (e, o, i, t, a) => c.invoke("window", e, o, i, t, a).catch(n),
  // メイン → レンダラー
  on: (e, o) => {
    switch (e) {
      case "log":
        c.on(e, (i, t) => o(i, t));
        break;
      case "shutdown":
        c.on(e, (i) => o(i));
        break;
      case "save_win_inf":
        c.on(e, (i, t) => o(i, t));
        break;
      case "fire":
        c.on(e, (i, t) => o(i, t));
        break;
    }
  }
};
s.exposeInMainWorld("to_app", r);
export {
  r as hProc
};
//# sourceMappingURL=preload.js.map
