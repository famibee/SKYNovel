/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./core/src/preload.ts":
/*!*****************************!*\
  !*** ./core/src/preload.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.hProc = void 0;\nconst { contextBridge, ipcRenderer } = __webpack_require__(/*! electron */ \"electron\");\nconst fncE = console.error;\nexports.hProc = {\n    getInfo: () => ipcRenderer.invoke('getInfo').catch(fncE),\n    existsSync: path => ipcRenderer.invoke('existsSync', path).catch(fncE),\n    copySync: (path_from, path_to) => ipcRenderer.invoke('copySync', path_from, path_to).catch(fncE),\n    removeSync: path => ipcRenderer.invoke('removeSync', path).catch(fncE),\n    ensureDirSync: path => ipcRenderer.invoke('ensureDirSync', path).catch(fncE),\n    ensureFileSync: path => ipcRenderer.invoke('ensureFileSync', path).catch(fncE),\n    createWriteStream: path => ipcRenderer.invoke('createWriteStream', path).catch(fncE),\n    createReadStream: path => ipcRenderer.invoke('createReadStream', path).catch(fncE),\n    readFileSync: path => ipcRenderer.invoke('readFileSync', path).catch(fncE),\n    readFile: (path, callback) => ipcRenderer.invoke('readFile', path, callback).catch(fncE),\n    writeFileSync: (path, data, o) => ipcRenderer.invoke('writeFileSync', path, data, o).catch(fncE),\n    appendFile: (path, data, callback) => ipcRenderer.invoke('appendFile', path, data, callback).catch(fncE),\n    window: (centering, x, y, w, h) => ipcRenderer.invoke('window', centering, x, y, w, h).catch(fncE),\n    isSimpleFullScreen: () => ipcRenderer.invoke('isSimpleFullScreen').catch(fncE),\n    setSimpleFullScreen: b => ipcRenderer.invoke('setSimpleFullScreen', b).catch(fncE),\n    win_close: () => ipcRenderer.invoke('win_close').catch(fncE),\n    win_setTitle: title => ipcRenderer.invoke('win_setTitle', title).catch(fncE),\n    win_setContentSize: (w, h) => ipcRenderer.invoke('win_setContentSize', w, h).catch(fncE),\n    win_setSize: (w, h) => ipcRenderer.invoke('win_setSize', w, h).catch(fncE),\n    openDevTools: () => ipcRenderer.invoke('openDevTools').catch(fncE),\n    win_ev_devtools_opened: fnc => ipcRenderer.invoke('win_ev_devtools_opened', fnc).catch(fncE),\n    Store: o => ipcRenderer.invoke('Store', o).catch(fncE),\n    flush: o => ipcRenderer.invoke('flush', o).catch(fncE),\n    Store_isEmpty: () => ipcRenderer.invoke('Store_isEmpty').catch(fncE),\n    Store_get: () => ipcRenderer.invoke('Store_get').catch(fncE),\n    tarFs_pack: path => ipcRenderer.invoke('tarFs_pack', path).catch(fncE),\n    tarFs_extract: path => ipcRenderer.invoke('tarFs_extract', path).catch(fncE),\n};\ncontextBridge.exposeInMainWorld('to_app', exports.hProc);\n\n\n//# sourceURL=webpack:///./core/src/preload.ts?");

/***/ }),

/***/ 0:
/*!********************************!*\
  !*** multi ./core/src/preload ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./core/src/preload */\"./core/src/preload.ts\");\n\n\n//# sourceURL=webpack:///multi_./core/src/preload?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron\");\n\n//# sourceURL=webpack:///external_%22electron%22?");

/***/ })

/******/ });