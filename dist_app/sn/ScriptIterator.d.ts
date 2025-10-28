import { IHTag, HArg } from './Grammar';
import { IMain, IVariable, T_Mark, IPropParser } from './CmnInterface';
import { Config } from './Config';
import { EventMng } from './EventMng';
import { LayerMng } from './LayerMng';
import { SoundMng } from './SoundMng';
import { SysBase } from './SysBase';
declare const enum SndProcOnLoad {
    MINIMAL_STOP = 0,
    NO_TOUCH = 1,
    ALL_STOP_AND_PLAY = 2
}
export declare const RPN_COMP_CHIN = "compChIn";
export declare class ScriptIterator {
    #private;
    private readonly cfg;
    private readonly hTag;
    private readonly main;
    private readonly val;
    private readonly prpPrs;
    private readonly sndMng;
    private readonly sys;
    get scriptFn(): string;
    get idxToken(): number;
    subIdxToken(): void;
    get lineNum(): number;
    readonly addLineNum: (len: number) => void;
    jumpJustBefore(): void;
    constructor(cfg: Config, hTag: IHTag, main: IMain, val: IVariable, prpPrs: IPropParser, sndMng: SoundMng, sys: SysBase);
    noticeWait: () => void;
    destroy(): void;
    isBreak: (_token: string) => boolean;
    タグ解析(tag_name: string, args: string): Promise<boolean>;
    setOtherObj(evtMng: EventMng, layMng: LayerMng): void;
    noticeBreak: (_goto: boolean) => void;
    dumpErrForeLine(): void;
    private analyzeInit;
    nextToken: () => string;
    get isKidoku(): boolean;
    get isNextKidoku(): boolean;
    get normalWait(): number;
    loadFromMark(hArg: HArg, mark: T_Mark, snd?: SndProcOnLoad): boolean;
    nowScrIdx(): {
        fn: string;
        idx: number;
    };
    nowMark(): T_Mark;
    nowScrFnLn(): {
        fn: string;
        ln: number;
        col_s: number;
        col_e: number;
    };
    recodeDesign(hArg: HArg): void;
    replace(idx: number, val: string): void;
}
export {};
//# sourceMappingURL=ScriptIterator.d.ts.map