import { SysBase } from "./SysBase";
import { IFn2Path, IConfig } from './CmnInterface';
export declare class SysNode extends SysBase {
    protected readonly normalize: (src: string, _form: string) => string;
    loadPathAndVal(hPathFn2Exts: IFn2Path, fncLoaded: () => void, cfg: IConfig): void;
    protected readonly isApp: () => boolean;
    readonly savePic: (fn: string, data_url: string) => void;
    readonly appendFile: (_path: string, _data: any, _callback: (err: NodeJS.ErrnoException) => void) => any;
    readonly ensureFileSync: (path: string) => any;
}
//# sourceMappingURL=SysNode.d.ts.map