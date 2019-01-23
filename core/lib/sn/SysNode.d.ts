/// <reference types="node" />
import { SysBase } from "./SysBase";
import { IPathFn2Exts } from './CmnInterface';
import { Config } from './Config';
import m_fs = require('fs-extra');
export declare class SysNode extends SysBase {
    protected normalize: (src: string, _form: string) => string;
    loadPathAndVal(hPathFn2Exts: IPathFn2Exts, fncLoaded: () => void, cfg: Config): void;
    private hExtNG;
    private retinaFnTail;
    private hPathFn2Retina;
    protected isApp: () => boolean;
    existsSync: typeof m_fs.existsSync;
    writeFile: typeof m_fs.writeFile;
    savePic: (fn: string, data_url: string) => void;
    isDirectory: (path: string) => boolean;
    readdirSync: typeof m_fs.readdirSync;
    appendFile: typeof m_fs.appendFile;
}
