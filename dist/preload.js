"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const c=require("electron"),n=console.error,p={getInfo:()=>c.ipcRenderer.invoke("getInfo").catch(n),existsSync:e=>c.ipcRenderer.invoke("existsSync",e).catch(n),copySync:(e,i)=>c.ipcRenderer.invoke("copySync",e,i).catch(n),removeSync:e=>c.ipcRenderer.invoke("removeSync",e).catch(n),ensureFileSync:e=>c.ipcRenderer.invoke("ensureFileSync",e).catch(n),readFileSync:e=>c.ipcRenderer.invoke("readFileSync",e).catch(n),readFile:(e,i)=>c.ipcRenderer.invoke("readFile",e,i).catch(n),writeFileSync:(e,i,r)=>c.ipcRenderer.invoke("writeFileSync",e,i,r).catch(n),appendFile:(e,i,r)=>c.ipcRenderer.invoke("appendFile",e,i,r).catch(n),win_close:()=>c.ipcRenderer.invoke("win_close").catch(n),win_setTitle:e=>c.ipcRenderer.invoke("win_setTitle",e).catch(n),showMessageBox:e=>c.ipcRenderer.invoke("showMessageBox",e).catch(n),capturePage:(e,i,r)=>c.ipcRenderer.invoke("capturePage",e,i,r).catch(n),navigate_to:e=>c.ipcRenderer.invoke("navigate_to",e).catch(n),openDevTools:()=>c.ipcRenderer.invoke("openDevTools").catch(n),win_ev_devtools_opened:e=>c.ipcRenderer.invoke("win_ev_devtools_opened",e).catch(n),Store:e=>c.ipcRenderer.invoke("Store",e).catch(n),flush:e=>c.ipcRenderer.invoke("flush",e).catch(n),Store_isEmpty:()=>c.ipcRenderer.invoke("Store_isEmpty").catch(n),Store_get:()=>c.ipcRenderer.invoke("Store_get").catch(n),zip:(e,i)=>c.ipcRenderer.invoke("zip",e,i).catch(n),unzip:(e,i)=>c.ipcRenderer.invoke("unzip",e,i).catch(n),isSimpleFullScreen:()=>c.ipcRenderer.invoke("isSimpleFullScreen").catch(n),setSimpleFullScreen:e=>c.ipcRenderer.invoke("setSimpleFullScreen",e).catch(n),window:(e,i,r,o,t)=>c.ipcRenderer.invoke("window",e,i,r,o,t).catch(n),on:(e,i)=>{switch(e){case"save_win_pos":c.ipcRenderer.on(e,(r,o,t)=>i(r,o,t));break;case"fire":c.ipcRenderer.on(e,(r,o)=>i(r,o));break}}};c.contextBridge.exposeInMainWorld("to_app",p);exports.hProc=p;
//# sourceMappingURL=preload.js.map
