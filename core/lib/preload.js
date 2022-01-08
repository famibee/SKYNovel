/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./core/src/preload.ts":
/*!*****************************!*\
  !*** ./core/src/preload.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hProc = void 0;
const { contextBridge, ipcRenderer } = __webpack_require__(/*! electron */ "electron");
const fncE = console.error;
exports.hProc = {
    getInfo: () => ipcRenderer.invoke('getInfo').catch(fncE),
    existsSync: path => ipcRenderer.invoke('existsSync', path).catch(fncE),
    copySync: (path_from, path_to) => ipcRenderer.invoke('copySync', path_from, path_to).catch(fncE),
    removeSync: path => ipcRenderer.invoke('removeSync', path).catch(fncE),
    ensureDirSync: path => ipcRenderer.invoke('ensureDirSync', path).catch(fncE),
    ensureFileSync: path => ipcRenderer.invoke('ensureFileSync', path).catch(fncE),
    createWriteStream: path => ipcRenderer.invoke('createWriteStream', path).catch(fncE),
    createReadStream: path => ipcRenderer.invoke('createReadStream', path).catch(fncE),
    readFileSync: path => ipcRenderer.invoke('readFileSync', path).catch(fncE),
    readFile: (path, callback) => ipcRenderer.invoke('readFile', path, callback).catch(fncE),
    writeFileSync: (path, data, o) => ipcRenderer.invoke('writeFileSync', path, data, o).catch(fncE),
    appendFile: (path, data, callback) => ipcRenderer.invoke('appendFile', path, data, callback).catch(fncE),
    window: (centering, x, y, w, h) => ipcRenderer.invoke('window', centering, x, y, w, h).catch(fncE),
    isSimpleFullScreen: () => ipcRenderer.invoke('isSimpleFullScreen').catch(fncE),
    setSimpleFullScreen: (b, w, h) => ipcRenderer.invoke('setSimpleFullScreen', b, w, h).catch(fncE),
    win_close: () => ipcRenderer.invoke('win_close').catch(fncE),
    win_setTitle: title => ipcRenderer.invoke('win_setTitle', title).catch(fncE),
    win_setContentSize: (w, h) => ipcRenderer.invoke('win_setContentSize', w, h).catch(fncE),
    win_setSize: (w, h) => ipcRenderer.invoke('win_setSize', w, h).catch(fncE),
    capturePage: fn => ipcRenderer.invoke('capturePage', fn).catch(fncE),
    navigate_to: url => ipcRenderer.invoke('navigate_to', url).catch(fncE),
    openDevTools: () => ipcRenderer.invoke('openDevTools').catch(fncE),
    win_ev_devtools_opened: fnc => ipcRenderer.invoke('win_ev_devtools_opened', fnc).catch(fncE),
    Store: o => ipcRenderer.invoke('Store', o).catch(fncE),
    flush: o => ipcRenderer.invoke('flush', o).catch(fncE),
    Store_isEmpty: () => ipcRenderer.invoke('Store_isEmpty').catch(fncE),
    Store_get: () => ipcRenderer.invoke('Store_get').catch(fncE),
    tarFs_pack: path => ipcRenderer.invoke('tarFs_pack', path).catch(fncE),
    tarFs_extract: path => ipcRenderer.invoke('tarFs_extract', path).catch(fncE),
};
contextBridge.exposeInMainWorld('to_app', exports.hProc);


/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./core/src/preload.ts");
/******/ 	
/******/ })()
;