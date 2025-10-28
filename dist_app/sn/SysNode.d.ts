import { SysBase } from './SysBase';
import { IFn2Path, IConfig } from './ConfigBase';
import { IVariable, IMain } from './CmnInterface';
import { IHTag } from './Grammar';
import { Application } from 'pixi.js';
import { readFile } from 'fs-extra';
export declare class SysNode extends SysBase {
    loadPath(hPathFn2Exts: IFn2Path, cfg: IConfig): Promise<void>;
    init(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): Promise<void>[];
    readonly isApp = true;
    savePic(path: string, data_url: string): Promise<void>;
    protected readFile(_path: string, _encoding: Parameters<typeof readFile>[1]): Promise<string>;
    protected writeFile(_path: string, _data: string | NodeJS.ArrayBufferView, _o?: object): Promise<void>;
}
//# sourceMappingURL=SysNode.d.ts.map