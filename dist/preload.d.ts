import { T_HINFO } from './appMain_cmn';
import { T_Data4Vari } from './sn/CmnInterface';
import { T_CFG } from './sn/ConfigBase';
import { IpcRendererEvent, MessageBoxOptions, MessageBoxReturnValue, OpenDialogOptions, OpenDialogReturnValue } from 'electron/renderer';
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
};
export type HPROC = {
    openDevTools: () => void;
    getInfo: () => Promise<T_HINFO>;
    inited: (oCfg: T_CFG, tagW: TAG_WINDOW) => Promise<void>;
    existsSync: (path: string) => Promise<boolean>;
    copy: (path_from: string, path_to: string) => Promise<void>;
    remove: (path: string) => Promise<void>;
    ensureFile: (path: string) => Promise<void>;
    writeFile: (path: string, data: string | NodeJS.ArrayBufferView, o?: object) => Promise<void>;
    appendFile: (path: string, data: string) => Promise<void>;
    outputFile: (path: string, data: string) => Promise<void>;
    window: (centering: boolean, x: number, y: number, w: number, h: number) => void;
    isSimpleFullScreen: () => Promise<boolean>;
    setSimpleFullScreen: (b: boolean) => Promise<void>;
    win_close: () => void;
    win_setTitle: (title: string) => void;
    showMessageBox: (o: MessageBoxOptions) => Promise<MessageBoxReturnValue>;
    showOpenDialog: (o: OpenDialogOptions) => Promise<OpenDialogReturnValue>;
    capturePage: (path: string, w: number, h: number) => Promise<void>;
    navigate_to: (url: string) => void;
    Store: (o: object) => Promise<void>;
    flush: (o: any) => Promise<void>;
    Store_isEmpty: () => Promise<boolean>;
    Store_get: () => Promise<T_Data4Vari>;
    zip: (inp: string, out: string) => Promise<void>;
    unzip: (inp: string, out: string) => Promise<void>;
    on: (channel: string, callback: (e: IpcRendererEvent, arg?: any) => void) => void;
};
export declare const hProc: HPROC;
//# sourceMappingURL=preload.d.ts.map