/// <reference types="node" />
import { SysBase } from "./SysBase";
import { IFn2Path, IConfig } from './CmnInterface';
import m_fs = require('fs-extra');
export declare class SysNode extends SysBase {
    protected readonly normalize: (src: string, _form: string) => string;
    loadPathAndVal(hPathFn2Exts: IFn2Path, fncLoaded: () => void, _cfg: IConfig): void;
    protected readonly isApp: () => boolean;
    readonly existsSync: typeof m_fs.existsSync;
    readonly writeFile: typeof m_fs.writeFile;
    readonly savePic: (fn: string, data_url: string) => void;
    readonly appendFile: typeof m_fs.appendFile;
}
