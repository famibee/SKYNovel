/// <reference types="node" />
import { WriteStream, ReadStream } from 'fs-extra';
import { Pack, Extract } from 'tar-fs';
export declare type HPROC = {
    getInfo: () => Promise<HINFO>;
    existsSync: (path: string) => Promise<boolean>;
    copySync: (path_from: string, path_to: string) => void;
    removeSync: (path: string) => Promise<void>;
    ensureDirSync: (path: string) => Promise<void>;
    ensureFileSync: (path: string) => Promise<void>;
    createWriteStream: (path: string) => Promise<WriteStream>;
    createReadStream: (path: string) => Promise<ReadStream>;
    readFileSync: (path: string) => Promise<string>;
    readFile: (path: string, callback: (err: NodeJS.ErrnoException, data: Buffer) => void) => void;
    writeFileSync: (path: string, data: Buffer, o?: object) => Promise<void>;
    appendFile: (path: string, data: string, callback: (err: Error) => void) => Promise<void>;
    window: (centering: boolean, x: number, y: number, w: number, h: number) => void;
    isSimpleFullScreen: () => Promise<boolean>;
    setSimpleFullScreen: (b: boolean) => Promise<void>;
    win_close: () => void;
    win_setTitle: (title: string) => void;
    win_setContentSize: (w: number, h: number) => Promise<void>;
    win_setSize: (w: number, h: number) => Promise<void>;
    openDevTools: () => void;
    win_ev_devtools_opened: (fnc: () => void) => void;
    Store: (o: object) => Promise<void>;
    flush: (o: object) => Promise<void>;
    Store_isEmpty: () => Promise<boolean>;
    Store_get: () => Promise<any>;
    tarFs_pack: (path: string) => Promise<Pack>;
    tarFs_extract: (path: string) => Promise<Extract>;
};
export declare type HINFO = {
    getAppPath: string;
    isPackaged: boolean;
    downloads: string;
    userData: string;
    getVersion: string;
    env: {
        [name: string]: any;
    };
    screenResolutionX: number;
    screenResolutionY: number;
};
export declare const hProc: HPROC;
//# sourceMappingURL=preload.d.ts.map