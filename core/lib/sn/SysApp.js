"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SysNode_1 = require("./SysNode");
const CmnLib_1 = require("./CmnLib");
const electron_1 = require("electron");
const Main_1 = require("./Main");
const Store = require('electron-store');
const shell = require('electron').shell;
class SysApp extends SysNode_1.SysNode {
    constructor(hPlg = {}) {
        super(electron_1.remote.app.getAppPath().replace(/\\/g, '/') + '/prj/', hPlg);
        this.hPlg = hPlg;
        this.$path_desktop = electron_1.remote.app.getPath('desktop').replace(/\\/g, '/') + '/';
        this.$path_userdata = electron_1.remote.app.getPath('userData').replace(/\\/g, '/') + '/';
        this.normalize = (src, form) => src.normalize(form);
        this.store = new Store({ cwd: 'storage', name: 'data' });
        this.dsp = electron_1.screen.getPrimaryDisplay();
        this.win = electron_1.remote.getCurrentWindow();
        this.wc = this.win.webContents;
        this.close = () => { this.win.close(); return false; };
        this.navigate_to = (hArg) => {
            const url = hArg.url;
            if (!url)
                throw '[navigate_to] urlは必須です';
            shell.openExternal(url);
            return false;
        };
        this.title = (hArg) => {
            const text = hArg.text;
            if (!text)
                throw '[title] textは必須です';
            this.win.setTitle(text);
            return false;
        };
        this.tgl_full_scr = (hArg) => {
            const key = hArg.key;
            if (key) {
                window.addEventListener('keydown', (e) => {
                    if (e.key != key)
                        return;
                    e.stopPropagation();
                    this.tgl_full_scr({});
                });
                return false;
            }
            this.val.setVal_Nochk('tmp', 'const.sn.displayState', this.win.isFullScreen());
            if (this.win.isFullScreen()) {
                this.win.setFullScreen(true);
                this.win.setSize(CmnLib_1.CmnLib.stageW, CmnLib_1.CmnLib.stageH);
                this.appPixi.view.style.width = CmnLib_1.CmnLib.stageW + 'px';
                this.appPixi.view.style.height = CmnLib_1.CmnLib.stageH + 'px';
                if (CmnLib_1.CmnLib.osName == 'WIN') {
                }
            }
            else {
                const size = electron_1.screen.getPrimaryDisplay().size;
                const ratioWidth = size.width / CmnLib_1.CmnLib.stageW;
                const ratioHeight = size.height / CmnLib_1.CmnLib.stageH;
                const ratio = (ratioWidth < ratioHeight)
                    ? ratioWidth
                    : ratioHeight;
                this.win.setSize(CmnLib_1.CmnLib.stageW * ratio, CmnLib_1.CmnLib.stageH * ratio);
                this.appPixi.view.style.width = (CmnLib_1.CmnLib.stageW * ratio) + 'px';
                this.appPixi.view.style.height = (CmnLib_1.CmnLib.stageH * ratio) + 'px';
                this.win.setFullScreen(false);
            }
            return false;
        };
        this.window = (hArg) => {
            const screenRX = this.dsp.size.width;
            const screenRY = this.dsp.size.height;
            if (CmnLib_1.CmnLib.argChk_Boolean(hArg, 'centering', false)) {
                hArg.x = (screenRX - this.win.getPosition()[0]) * 0.5;
                hArg.y = (screenRY - this.win.getPosition()[1]) * 0.5;
            }
            else {
                hArg.x = CmnLib_1.CmnLib.argChk_Num(hArg, 'x', Number(this.val.getVal('sys:const.sn.nativeWindow.x', 0)));
                hArg.y = CmnLib_1.CmnLib.argChk_Num(hArg, 'y', Number(this.val.getVal('sys:const.sn.nativeWindow.y', 0)));
                if (hArg.x < 0)
                    hArg.x = 0;
                else if (hArg.x > screenRX)
                    hArg.x = 0;
                if (hArg.y < 0)
                    hArg.y = 0;
                else if (hArg.y > screenRY)
                    hArg.y = 0;
            }
            this.win.setPosition(hArg.x, hArg.y);
            this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.x', hArg.x);
            this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.y', hArg.y);
            this.flush();
            return false;
        };
        window.onload = () => new Main_1.Main(this);
    }
    initVal(data, hTmp, comp) {
        if (this.store.size == 0) {
            hTmp['const.sn.isFirstBoot'] = true;
            this.data.sys = data['sys'];
            this.data.mark = data['mark'];
            this.data.kidoku = data['kidoku'];
            this.flush();
        }
        else {
            hTmp['const.sn.isFirstBoot'] = false;
            this.data.sys = this.store.store['sys'];
            this.data.mark = this.store.store['mark'];
            this.data.kidoku = this.store.store['kidoku'];
        }
        comp(this.data);
        hTmp['const.sn.isDebugger'] = false;
        hTmp['const.sn.screenResolutionX'] = this.dsp.size.width;
        hTmp['const.sn.screenResolutionY'] = this.dsp.size.height;
        if (hTmp['const.sn.isFirstBoot']) {
            this.window({ centering: true });
        }
        else {
            this.win.setPosition(Number(this.val.getVal('sys:const.sn.nativeWindow.x', 0)), Number(this.val.getVal('sys:const.sn.nativeWindow.y', 0)));
        }
        this.win.on('moved', () => {
            const p = this.win.getPosition();
            this.window({ x: p[0], y: p[1] });
        });
    }
    flush() { this.store.store = this.data; }
    init(hTag, val, appPixi) {
        super.init(hTag, val, appPixi);
        if (CmnLib_1.CmnLib.devtool)
            this.wc.openDevTools();
        this.win.setContentSize(CmnLib_1.CmnLib.stageW, CmnLib_1.CmnLib.stageH);
    }
}
exports.SysApp = SysApp;
//# sourceMappingURL=SysApp.js.map