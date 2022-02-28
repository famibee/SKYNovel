/// <reference types="node" />
import { SysBase } from "./SysBase";
import { IFn2Path, IConfig } from './CmnInterface';
export declare class SysNode extends SysBase {
    loadPath(hPathFn2Exts: IFn2Path, cfg: IConfig): Promise<void>;
    protected readonly isApp = true;
    savePic(fn: string, data_url: string): Promise<void>;
    protected readFileSync(_path: string): Promise<string>;
    protected writeFileSync(_path: string, _data: string | NodeJS.ArrayBufferView, _o?: object): Promise<void>;
}
//# sourceMappingURL=SysNode.d.ts.map