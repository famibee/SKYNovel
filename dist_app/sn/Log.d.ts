import { T_HTag } from './Grammar';
import { T_Variable } from './CmnInterface';
import { T_CFG } from './ConfigBase';
export type T_LOG = {
    recText: (txt: string) => void;
    pagebreak: () => void;
};
export declare class Log implements T_LOG {
    #private;
    private readonly oCfg;
    private readonly hTag;
    private readonly val;
    constructor(oCfg: T_CFG, hTag: T_HTag, val: T_Variable);
    recText(text: string): void;
    pagebreak(): void;
    playback(): void;
}
//# sourceMappingURL=Log.d.ts.map