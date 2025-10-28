import { appMain_cmn } from './appMain_cmn';
import { SAVE_WIN_INF } from './preload';
import { BrowserWindow } from 'electron';
export declare class appMain extends appMain_cmn {
    static initRenderer(path_htm: string, version: string, _o: object): BrowserWindow;
    protected sendShutdown(): void;
    protected sendSaveWinInf(arg: SAVE_WIN_INF): void;
}
//# sourceMappingURL=appMain.d.ts.map