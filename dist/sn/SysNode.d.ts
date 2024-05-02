import { Application } from 'pixi.js';
import { IHTag } from './Grammar';
import { IVariable, IMain } from './CmnInterface';
import { IFn2Path, IConfig } from './ConfigBase';
import { SysBase } from './SysBase';

export declare class SysNode extends SysBase {
    loadPath(hPathFn2Exts: IFn2Path, cfg: IConfig): Promise<void>;
    init(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): Promise<void>[];
    readonly isApp = true;
    savePic(fn: string, data_url: string): Promise<void>;
    protected readFileSync(_path: string): Promise<string>;
    protected writeFileSync(_path: string, _data: string | NodeJS.ArrayBufferView, _o?: object): Promise<void>;
}
//# sourceMappingURL=SysNode.d.ts.map