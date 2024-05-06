import { IHTag, HArg } from './Grammar';
import { IMain, IVariable, IMark, IPropParser } from './CmnInterface';
import { Config } from './Config';
import { AnalyzeTagArg } from './AnalyzeTagArg';
import { EventMng } from './EventMng';
import { LayerMng } from './LayerMng';
import { SoundMng } from './SoundMng';
import { SysBase } from './SysBase';

export declare class ScriptIterator {
    #private;
    private readonly cfg;
    private readonly hTag;
    private readonly main;
    private readonly val;
    private readonly alzTagArg;
    private readonly runAnalyze;
    private readonly prpPrs;
    private readonly sndMng;
    private readonly sys;
    get scriptFn(): string;
    subIdxToken(): void;
    get lineNum(): number;
    readonly addLineNum: (len: number) => number;
    jumpJustBefore(): void;
    constructor(cfg: Config, hTag: IHTag, main: IMain, val: IVariable, alzTagArg: AnalyzeTagArg, runAnalyze: () => void, prpPrs: IPropParser, sndMng: SoundMng, sys: SysBase);
    noticeWait: () => void;
    destroy(): void;
    cnvPath4Dbg: (fn: string) => string;
    isBreak: (_token: string) => boolean;
    タグ解析(tagToken: string): boolean;
    setOtherObj(evtMng: EventMng, layMng: LayerMng): void;
    noticeBreak: (_goto: boolean) => void;
    dumpErrForeLine(): void;
    private analyzeInit;
    nextToken: () => string;
    get isKidoku(): boolean;
    get isNextKidoku(): boolean;
    get normalWait(): number;
    loadFromMark(hArg: HArg, mark: IMark, reload_sound?: boolean): boolean;
    nowScrIdx(): {
        fn: string;
        idx: number;
    };
    nowMark(): IMark;
    recodeDesign(hArg: HArg): void;
    replace(idx: number, val: string): void;
}
//# sourceMappingURL=ScriptIterator.d.ts.map