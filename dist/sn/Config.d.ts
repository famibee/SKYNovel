import { SysBase } from './SysBase';
import { ConfigBase, SEARCH_PATH_ARG_EXT } from './ConfigBase';
export declare class Config extends ConfigBase {
    readonly sys: SysBase;
    static generate(sys: SysBase): Promise<Config>;
    constructor(sys: SysBase);
    load(oCfg: any): Promise<void>;
    searchPath(path: string, extptn?: SEARCH_PATH_ARG_EXT): string;
}
//# sourceMappingURL=Config.d.ts.map