import { t as CmnLib, u as getDateStr } from "./CmnLib.js";
function creSAVEDATA() {
	return {
		"sn.userFnTail": "",
		"const.sn.autowc.enabled": !1,
		"const.sn.autowc.text": "",
		"const.sn.autowc.time": 0,
		"const.sn.mesLayer": "",
		"const.sn.styPaging": "color: yellow; text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;",
		"sn.doRecLog": !1,
		"const.sn.sLog": "[]",
		"const.sn.loopPlaying": "{}",
		"const.sn.scriptFn": "",
		"const.sn.scriptIdx": 0
	};
}
function creSYS_DATA() {
	return {
		"const.sn.cfg.ns": "",
		"const.sn.aPageLog": "[]",
		"const.sn.nativeWindow.x": 0,
		"const.sn.nativeWindow.y": 0,
		"const.sn.nativeWindow.w": CmnLib.stageW,
		"const.sn.nativeWindow.h": CmnLib.stageH,
		"const.sn.save.place": 1,
		"const.sn.sound.BGM.volume": 1,
		"const.sn.sound.SE.volume": 1,
		"const.sn.sound.SYS.volume": 1,
		"sn.auto.msecLineWait": 500,
		"sn.auto.msecLineWait_Kidoku": 500,
		"sn.auto.msecPageWait": 3500,
		"sn.auto.msecPageWait_Kidoku": 3500,
		"sn.skip.mode": "s",
		"sn.sound.BGM.vol_mul_talking": 1,
		"sn.sound.global_volume": (e, i) => 1,
		"sn.sound.movie_volume": (e, i) => 1,
		"sn.tagCh.canskip": !0,
		"sn.tagCh.doWait": !0,
		"sn.tagCh.doWait_Kidoku": !0,
		"sn.tagCh.msecWait": 10,
		"sn.tagCh.msecWait_Kidoku": 10,
		"TextLayer.Back.Alpha": .5
	};
}
function creTMP_DATA() {
	return {
		"const.Date.getDateStr": () => getDateStr(),
		"const.Date.getTime": () => (/* @__PURE__ */ new Date()).getTime(),
		"const.sn.bookmark.json": "[]",
		"const.sn.config.window.width": 0,
		"const.sn.config.window.height": 0,
		"const.sn.config.book.title": "",
		"const.sn.config.book.version": "",
		"const.sn.displayState": !1,
		"const.sn.isApp": !1,
		"const.sn.isDbg": !1,
		"const.sn.isPackaged": !1,
		"const.sn.isPaging": !1,
		"const.sn.isDarkMode": !1,
		"const.sn.isDebugger": !0,
		"const.sn.isFirstBoot": !0,
		"const.sn.isKidoku": !0,
		"const.sn.key.alternate": !1,
		"const.sn.key.back": !1,
		"const.sn.key.command": !1,
		"const.sn.key.control": !1,
		"const.sn.key.end": !1,
		"const.sn.key.escape": !1,
		"const.sn.last_page_plain_text": "",
		"const.sn.last_page_text": "",
		"const.sn.Math.PI": Math.PI,
		"const.sn.navigator.language": "jp",
		"const.sn.needClick2Play": !1,
		"const.sn.platform": CmnLib.platform,
		"const.sn.screenResolutionX": screen.availWidth,
		"const.sn.screenResolutionY": screen.availHeight,
		"const.sn.sound.codecs": "",
		"const.sn.aIfStk.length": 1,
		"const.sn.vctCallStk.length": 0,
		"sn.auto.enabled": !1,
		"sn.button.fontFamily": "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif",
		"sn.eventArg": "",
		"sn.eventLabel": "",
		"sn.skip.all": !1,
		"sn.skip.enabled": !1,
		"sn.tagL.enabled": !0
	};
}
export { creSYS_DATA as n, creTMP_DATA as r, creSAVEDATA as t };

//# sourceMappingURL=CmnInterface.js.map