/// <reference types="node" />
import { SysBase } from "./SysBase";
import { IFn2Path } from './CmnInterface';
import { Config } from './Config';
import m_fs = require('fs-extra');
export declare class SysNode extends SysBase {
    protected readonly normalize: (src: string, _form: string) => string;
    loadPathAndVal(hFn2Path: IFn2Path, fncLoaded: () => void, cfg: Config): void;
    private readonly regNoUseSysFile;
    private getHFn2Path;
    private readonly hExtNG;
    private retinaFnTail;
    private hPathFn2Retina;
    protected readonly isApp: () => boolean;
    readonly existsSync: typeof m_fs.existsSync;
    readonly writeFile: typeof m_fs.writeFile;
    readonly savePic: (fn: string, data_url: string) => void;
    readonly isDirectory: (path: string) => boolean;
    readonly readdirSync: typeof m_fs.readdirSync;
    readonly appendFile: typeof m_fs.appendFile;
}
