/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./core/src/preload.ts":
/*!*****************************!*\
  !*** ./core/src/preload.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.hProc = void 0;\nconst { contextBridge, ipcRenderer } = __webpack_require__(/*! electron */ \"electron\");\nconst fncE = console.error;\nexports.hProc = {\n    getInfo: () => ipcRenderer.invoke('getInfo').catch(fncE),\n    existsSync: path => ipcRenderer.invoke('existsSync', path).catch(fncE),\n    copySync: (path_from, path_to) => ipcRenderer.invoke('copySync', path_from, path_to).catch(fncE),\n    removeSync: path => ipcRenderer.invoke('removeSync', path).catch(fncE),\n    ensureDirSync: path => ipcRenderer.invoke('ensureDirSync', path).catch(fncE),\n    ensureFileSync: path => ipcRenderer.invoke('ensureFileSync', path).catch(fncE),\n    createWriteStream: path => ipcRenderer.invoke('createWriteStream', path).catch(fncE),\n    createReadStream: path => ipcRenderer.invoke('createReadStream', path).catch(fncE),\n    readFileSync: path => ipcRenderer.invoke('readFileSync', path).catch(fncE),\n    readFile: (path, callback) => ipcRenderer.invoke('readFile', path, callback).catch(fncE),\n    writeFileSync: (path, data, o) => ipcRenderer.invoke('writeFileSync', path, data, o).catch(fncE),\n    appendFile: (path, data, callback) => ipcRenderer.invoke('appendFile', path, data, callback).catch(fncE),\n    window: (centering, x, y, w, h) => ipcRenderer.invoke('window', centering, x, y, w, h).catch(fncE),\n    isSimpleFullScreen: () => ipcRenderer.invoke('isSimpleFullScreen').catch(fncE),\n    setSimpleFullScreen: b => ipcRenderer.invoke('setSimpleFullScreen', b).catch(fncE),\n    win_close: () => ipcRenderer.invoke('win_close').catch(fncE),\n    win_setTitle: title => ipcRenderer.invoke('win_setTitle', title).catch(fncE),\n    win_setContentSize: (w, h) => ipcRenderer.invoke('win_setContentSize', w, h).catch(fncE),\n    win_setSize: (w, h) => ipcRenderer.invoke('win_setSize', w, h).catch(fncE),\n    openDevTools: () => ipcRenderer.invoke('openDevTools').catch(fncE),\n    win_ev_devtools_opened: fnc => ipcRenderer.invoke('win_ev_devtools_opened', fnc).catch(fncE),\n    Store: o => ipcRenderer.invoke('Store', o).catch(fncE),\n    flush: o => ipcRenderer.invoke('flush', o).catch(fncE),\n    Store_isEmpty: () => ipcRenderer.invoke('Store_isEmpty').catch(fncE),\n    Store_get: () => ipcRenderer.invoke('Store_get').catch(fncE),\n    tarFs_pack: path => ipcRenderer.invoke('tarFs_pack', path).catch(fncE),\n    tarFs_extract: path => ipcRenderer.invoke('tarFs_extract', path).catch(fncE),\n};\ncontextBridge.exposeInMainWorld('to_app', exports.hProc);\n\n\n//# sourceURL=webpack://@famibee/skynovel/./core/src/preload.ts?");

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