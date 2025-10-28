import { SAVE_WIN_INF } from './preload';
import { BrowserWindow } from 'electron/main';
export type T_ipc_appMain_cmn = {
    handle(channel: string, listener: (e: unknown, ...args: any[]) => any | Promise<any>): void;
    on(channel: string, listener: (e: unknown, ...args: any[]) => void): void;
};
export type T_HINFO = {
    getAppPath: string;
    isPackaged: boolean;
    downloads: string;
    userData: string;
    getVersion: string;
    env: {
        SKYNOVEL_DBG?: string;
        SKYNOVEL_PORT?: string;
    };
    platform: string;
    arch: string;
};
export declare class appMain_cmn {
    #private;
    protected readonly bw: BrowserWindow;
    readonly version: string;
    static init(ipc: T_ipc_appMain_cmn): void;
    constructor(bw: BrowserWindow, version: string);
    protected sendShutdown(): void;
    protected sendSaveWinInf(_arg: SAVE_WIN_INF): void;
    openDevTools: () => void;
}
//# sourceMappingURL=appMain_cmn.d.ts.map