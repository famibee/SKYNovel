import { SysBase } from "./SysBase";
import { IFn2Path, IConfig } from './CmnInterface';
import { appendFile } from 'fs-extra';
export declare class SysNode extends SysBase {
    protected readonly normalize: (src: string, _form: string) => string;
    loadPathAndVal(hPathFn2Exts: IFn2Path, fncLoaded: () => void, cfg: IConfig): void;
    protected readonly isApp: () => boolean;
    readonly savePic: (fn: string, data_url: string) => void;
    readonly appendFile: typeof appendFile;
    readonly ensureFileSync: (path: string) => void;
}
//# sourceMappingURL=SysNode.d.ts.map