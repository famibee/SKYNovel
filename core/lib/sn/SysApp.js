"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SysNode_1 = require("./SysNode");
const CmnLib_1 = require("./CmnLib");
const Main_1 = require("./Main");
const { remote, shell, ipcRenderer } = require('electron');
const Store = require('electron-store');
const { Readable } = require('stream');
const m_fs = require("fs-extra");
const crypto = require('crypto');
class SysApp extends SysNode_1.SysNode {
    constructor(hPlg = {}, arg = { cur: 'prj/', crypt: false, dip: '' }) {
        super(hPlg, { cur: remote.app.getAppPath().replace(/\\/g, '/') + '/' + arg.cur, crypt: arg.crypt, dip: '' });
        this.$path_desktop = remote.app.getPath('desktop').replace(/\\/g, '/') + '/';
        this.$path_userdata = remote.app.getPath('userData').replace(/\\/g, '/') + '/';
        this.normalize = (src, form) => src.normalize(form);
        this.store = new Store({ cwd: 'storage', name: 'data' + this.crypt_ });
        this.isMovingWin = false;
        this.posMovingWin = [0, 0];
        this.dsp = remote.screen.getPrimaryDisplay();
        this.win = remote.getCurrentWindow();
        this.wc = this.win.webContents;
        this.close = () => { this.win.close(); return false; };
        this.navigate_to = hArg => {
            const url = hArg.url;
            if (!url)
                throw '[navigate_to] urlは必須です';
            shell.openExternal(url);
            return false;
        };
        this.title = hArg => {
            const text = hArg.text;
            if (!text)
                throw '[title] textは必須です';
            this.win.setTitle(text);
            return false;
        };
        this.tgl_full_scr = hArg => {
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
            }, { passive: true });
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
        this.update_check = hArg => {
            const url = hArg.url;
            if (!url)
                throw '[update_check] urlは必須です';
            if (url.slice(-1) != '/')
                throw '[update_check] urlの最後は/です';
            (async () => {
                const res = await this.fetch(url + `latest${CmnLib_1.CmnLib.isMac ? '-mac' : ''}.yml`);
                if (!res.ok)
                    return;
                if (CmnLib_1.CmnLib.debugLog)
                    console.log(`[update_check] ymlを取得しました url=${url}`);
                const txt = await res.text();
                const mv = /version: (.+)/.exec(txt);
                if (!mv)
                    throw `[update_check] ファイル内にversionが見つかりません`;
                const netver = mv[1];
                const myver = remote.app.getVersion();
                if (netver == myver) {
                    if (CmnLib_1.CmnLib.debugLog)
                        console.log(`[update_check] バージョン更新なし ver:${myver}`);
                    return;
                }
                if (CmnLib_1.CmnLib.debugLog)
                    console.log(`[update_check] 現在ver=${myver} 新規ver=${netver}`);
                const o = {
                    title: 'アプリ更新',
                    icon: remote.app.getAppPath() + '/app/icon.png',
                    buttons: ['OK', 'Cancel'],
                    defaultId: 0,
                    cancelId: 1,
                    message: `アプリ【${this.cfg.oCfg.book.title}】に更新があります。\nダウンロードしますか？`,
                    detail: `現在ver ${myver}\n新規ver ${netver}`,
                };
                const di = await remote.dialog.showMessageBox(o);
                if (di.response > 0)
                    return;
                if (CmnLib_1.CmnLib.debugLog)
                    console.log(`[update_check] アプリダウンロード開始`);
                const mp = /path: (.+)/.exec(txt);
                if (!mp)
                    throw `[update_check] ファイル内にpathが見つかりません`;
                const fn = mp[1];
                const mc = /sha512: (.+)/.exec(txt);
                if (!mc)
                    throw `[update_check] ファイル内にsha512が見つかりません`;
                const sha = mc[1];
                const res_dl = await this.fetch(url + fn);
                if (!res_dl.ok)
                    return;
                const pathDL = remote.app.getPath('downloads') + '/' + fn;
                const rd_dl = (res) => {
                    const reader = res.body.getReader();
                    const rdb = new Readable();
                    rdb._read = async () => {
                        const { done, value } = await reader.read();
                        if (done) {
                            rdb.push(null);
                            return;
                        }
                        rdb.push(Buffer.from(value));
                    };
                    return rdb;
                };
                const pipe_dl = await rd_dl(res_dl);
                pipe_dl.on('end', () => {
                    if (CmnLib_1.CmnLib.debugLog)
                        console.log(`[update_check] アプリダウンロード完了`);
                    m_fs.readFile(pathDL, (err, data) => {
                        if (err)
                            throw err;
                        const h = crypto.createHash('SHA512');
                        h.update(data);
                        const hash = h.digest('base64');
                        const isOk = sha == hash;
                        if (CmnLib_1.CmnLib.debugLog)
                            console.log(`[update_check] SHA512 Checksum:${isOk}`, sha, hash);
                        if (!isOk)
                            m_fs.unlink(pathDL);
                        o.buttons.pop();
                        o.message = `アプリ【${this.cfg.oCfg.book.title}】の更新パッケージを\nダウンロードしました` + (isOk ? '' : 'が、破損しています。\n開発元に連絡してください');
                        remote.dialog.showMessageBox(o);
                    });
                });
                pipe_dl.pipe(m_fs.createWriteStream(pathDL));
            })();
            return false;
        };
        this.window = hArg => {
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
        window.addEventListener('DOMContentLoaded', () => new Main_1.Main(this), { once: true, passive: true });
        ipcRenderer.on('log', (e, arg) => console.log(`[main log] e:%o arg:%o`, e, arg));
    }
    initVal(data, hTmp, comp) {
        if (this.crypt)
            this.store.encryptionKey = this.stk();
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
        window.addEventListener('resize', () => {
            this.window((hTmp['const.sn.isFirstBoot']) ? { centering: true } : {});
        }, { once: true, passive: true });
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
        this.cfg = cfg;
        if (cfg.oCfg.debug.devtool)
            this.wc.openDevTools();
        else
            this.wc.on('devtools-opened', () => {
                console.error(`DevToolは禁止されています`);
                main.destroy();
            });
        this.win.setContentSize(CmnLib_1.CmnLib.stageW, CmnLib_1.CmnLib.stageH);
    }
}
exports.SysApp = SysApp;
//# sourceMappingURL=SysApp.js.map