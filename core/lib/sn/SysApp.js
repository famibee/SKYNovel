"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SysNode_1 = require("./SysNode");
const CmnLib_1 = require("./CmnLib");
const Main_1 = require("./Main");
const { remote, shell, ipcRenderer } = require('electron');
const Store = require('electron-store');
class SysApp extends SysNode_1.SysNode {
    constructor(hPlg = {}, arg = { cur: 'prj/', crypt: false }) {
        super(hPlg, { cur: remote.app.getAppPath().replace(/\\/g, '/') + '/' + arg.cur, crypt: arg.crypt });
        this.$path_desktop = remote.app.getPath('desktop').replace(/\\/g, '/') + '/';
        this.$path_userdata = remote.app.getPath('userData').replace(/\\/g, '/') + '/';
        this.normalize = (src, form) => src.normalize(form);
        this.store = new Store({ cwd: 'storage', name: 'data' });
        this.isMovingWin = false;
        this.posMovingWin = [0, 0];
        this.dsp = remote.screen.getPrimaryDisplay();
        this.win = remote.getCurrentWindow();
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
            if (!hArg.key) {
                this.tgl_full_scr_sub();
                return false;
            }
            const key = hArg.key.toLowerCase();
            document.addEventListener('keydown', (e) => {
                const key2 = (e.altKey ? (e.key == 'Alt' ? '' : 'alt+') : '')
                    + (e.ctrlKey ? (e.key == 'Control' ? '' : 'ctrl+') : '')
                    + (e.shiftKey ? (e.key == 'Shift' ? '' : 'shift+') : '')
                    + e.key.toLowerCase();
                if (key2 != key)
                    return;
                e.stopPropagation();
                this.tgl_full_scr_sub();
            });
            return false;
        };
        this.tgl_full_scr_sub = () => {
            if (this.win.isSimpleFullScreen()) {
                this.win.setSimpleFullScreen(false);
                this.win.setSize(CmnLib_1.CmnLib.stageW, CmnLib_1.CmnLib.stageH);
                this.appPixi.view.style.width = CmnLib_1.CmnLib.stageW + 'px';
                this.appPixi.view.style.height = CmnLib_1.CmnLib.stageH + 'px';
                this.appPixi.view.style.marginLeft = '0px';
                this.appPixi.view.style.marginTop = '0px';
                this.window({});
                this.reso4frame = 1;
            }
            else {
                const w = this.dsp.size.width;
                const h = this.dsp.size.height;
                const ratioWidth = w / CmnLib_1.CmnLib.stageW;
                const ratioHeight = h / CmnLib_1.CmnLib.stageH;
                const ratio = (ratioWidth < ratioHeight) ? ratioWidth : ratioHeight;
                this.win.setSize(CmnLib_1.CmnLib.stageW * ratio, CmnLib_1.CmnLib.stageH * ratio);
                this.appPixi.view.style.width = (CmnLib_1.CmnLib.stageW * ratio) + 'px';
                this.appPixi.view.style.height = (CmnLib_1.CmnLib.stageH * ratio) + 'px';
                if (ratioWidth < ratioHeight) {
                    this.appPixi.view.style.marginTop = (h - CmnLib_1.CmnLib.stageH * ratio) / 2 + 'px';
                }
                else {
                    this.appPixi.view.style.marginLeft = (w - CmnLib_1.CmnLib.stageW * ratio) / 2 + 'px';
                }
                this.win.setSimpleFullScreen(true);
                this.win.setContentSize(screen.width, screen.height);
                const cr = this.appPixi.view.getBoundingClientRect();
                this.reso4frame = cr.width / CmnLib_1.CmnLib.stageW;
            }
            this.resizeFrames();
        };
        this.update_check = (hArg) => {
            const url = hArg.url;
            if (!url)
                throw '[update_check] urlは必須です';
            ipcRenderer.send('update_check', JSON.stringify(hArg));
            return false;
        };
        this.window = (hArg) => {
            const screenRX = this.dsp.size.width;
            const screenRY = this.dsp.size.height;
            if (CmnLib_1.CmnLib.argChk_Boolean(hArg, 'centering', false)) {
                const s = this.win.getPosition();
                hArg.x = (screenRX - s[0]) * 0.5;
                hArg.y = (screenRY - s[1]) * 0.5;
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
            this.win.setContentSize(CmnLib_1.CmnLib.stageW, CmnLib_1.CmnLib.stageH);
            const hz = this.win.getContentSize()[1];
            this.win.setContentSize(CmnLib_1.CmnLib.stageW, CmnLib_1.CmnLib.stageH * 2 - hz);
            this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.x', hArg.x);
            this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.y', hArg.y);
            this.flush();
            return false;
        };
        window.addEventListener('DOMContentLoaded', () => new Main_1.Main(this), false);
        ipcRenderer.on('log', (e, arg) => {
            console.log(`fn:SysApp.ts line:23 e:%o arg:%o`, e, arg);
        });
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
        this.val.defTmp('const.sn.displayState', () => this.win.isSimpleFullScreen());
        const fncWin = () => {
            this.window((hTmp['const.sn.isFirstBoot']) ? { centering: true } : {});
            window.removeEventListener('resize', fncWin, false);
        };
        window.addEventListener('resize', fncWin, false);
        this.win.on('move', () => {
            if (this.isMovingWin)
                return;
            this.isMovingWin = true;
            this.posMovingWin = this.win.getPosition();
            setTimeout(() => this.delayWinPos(), 500);
        });
    }
    delayWinPos() {
        if (this.win.isSimpleFullScreen())
            return;
        const p = this.win.getPosition();
        if (this.posMovingWin[0] != p[0] || this.posMovingWin[1] != p[1]) {
            this.posMovingWin = p;
            setTimeout(() => this.delayWinPos(), 500);
            return;
        }
        this.window({ x: p[0], y: p[1] });
        this.isMovingWin = false;
    }
    flush() { this.store.store = this.data; }
    init(cfg, hTag, appPixi, val, main) {
        super.init(cfg, hTag, appPixi, val, main);
        if (CmnLib_1.CmnLib.devtool)
            this.wc.openDevTools();
        this.win.setContentSize(CmnLib_1.CmnLib.stageW, CmnLib_1.CmnLib.stageH);
    }
}
exports.SysApp = SysApp;
//# sourceMappingURL=SysApp.js.map