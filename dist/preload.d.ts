import { T_CFG } from './sn/ConfigBase';
import { MessageBoxOptions, MessageBoxReturnValue } from 'electron';
export type TAG_WINDOW = {
    c: boolean;
    x: number;
    y: number;
    w: number;
    h: number;
};
export type SAVE_WIN_INF = {
    x: number;
    y: number;
    w: number;
    h: number;
    scrw: number;
    scrh: number;
};
export type HPROC = {
    openDevTools: () => void;
    getInfo: () => Promise<HINFO>;
    inited: (oCfg: T_CFG, tagW: TAG_WINDOW) => Promise<void>;
    existsSync: (path: string) => Promise<boolean>;
    copySync: (path_from: string, path_to: string) => void;
    removeSync: (path: string) => Promise<void>;
    ensureFileSync: (path: string) => Promise<void>;
    writeFileSync: (path: string, data: string | NodeJS.ArrayBufferView, o?: object) => Promise<void>;
    appendFile: (path: string, data: string) => Promise<void>;
    outputFile: (path: string, data: string) => Promise<void>;
    window: (centering: boolean, x: number, y: number, w: number, h: number) => void;
    isSimpleFullScreen: () => Promise<boolean>;
    setSimpleFullScreen: (b: boolean) => Promise<void>;
    win_close: () => void;
    win_setTitle: (title: string) => void;
    showMessageBox: (o: MessageBoxOptions) => Promise<MessageBoxReturnValue>;
    capturePage: (fn: string, w: number, h: number) => Promise<void>;
    navigate_to: (url: string) => void;
    Store: (o: object) => Promise<void>;
    flush: (o: object) => Promise<void>;
    Store_isEmpty: () => Promise<boolean>;
    Store_get: () => Promise<any>;
    zip: (inp: string, out: string) => void;
    unzip: (inp: string, out: string) => void;
    on: (channel: string, callback: Function) => void;
};
export type HINFO = {
    getAppPath: string;
    isPackaged: boolean;
    downloads: string;
    userData: string;
    getVersion: string;
    env: {
        [name: string]: any;
    };
    platform: string;
    arch: string;
};
export declare const hProc: HPROC;
//# sourceMappingURL=preload.d.ts.map