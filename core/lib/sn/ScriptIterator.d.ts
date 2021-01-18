import { IHTag, IMain, IVariable, IPropParser } from './CmnInterface';
import { Config } from './Config';
import { ICallStackArg } from './CallStack';
import { AnalyzeTagArg } from './AnalyzeTagArg';
import { EventMng } from './EventMng';
import { LayerMng } from './LayerMng';
import { SoundMng } from './SoundMng';
import { SysBase } from './SysBase';
export declare class ScriptIterator {
    private readonly cfg;
    private readonly hTag;
    private readonly main;
    private readonly val;
    private readonly alzTagArg;
    private readonly runAnalyze;
    private readonly prpPrs;
    private readonly sndMng;
    private readonly sys;
    private script;
    private scriptFn_;
    get scriptFn(): string;
    private idxToken_;
    subIdxToken(): void;
    private lineNum_;
    get lineNum(): number;
    readonly addLineNum: (len: number) => number;
    private aCallStk;
    get lenCallStk(): number;
    get lastHArg(): any;
    readonly getCallStk: (idx: number) => ICallStackArg | null;
    private grm;
    constructor(cfg: Config, hTag: IHTag, main: IMain, val: IVariable, alzTagArg: AnalyzeTagArg, runAnalyze: () => void, prpPrs: IPropParser, sndMng: SoundMng, sys: SysBase);
    destroy(): void;
    private readonly hHook;
    private cnvSnPath;
    private cnvSnPath4Dbg;
    private go_stepover;
    private go_stepout;
    private csDepth_macro_esc;
    private get idxDx4Dbg();
    private isIdxOverLast;
    private static hBrkP;
    private static hFuncBP;
    private breakState;
    isBreak: (_token: string) => boolean;
    private isBreak_base;
    private subHitCondition;
    private aStack;
    private procDebugtag;
    private proc4DesignMode;
    タグ解析(tagToken: string): boolean;
    private evtMng;
    private layMng;
    setOtherObj(evtMng: EventMng, layMng: LayerMng): void;
    private let_ml;
    private dump_stack;
    private cnvIdx2lineCol;
    private dump_script;
    private fncSet;
    private fncBreak;
    private fnLastBreak;
    private hScrCache4Dump;
    noticeBreak: (_goto: boolean) => void;
    private dumpErrLine;
    dumpErrForeLine(): void;
    private aIfStk;
    private endif;
    private if;
    private call;
    private callSub;
    private jump;
    private pop_stack;
    private return;
    private resvToken;
    private clearResvToken;
    private skipLabel;
    private jumpWork;
    private analyzeInit;
    nextToken: () => string;
    private nextToken_Proc;
    private dbgToken;
    private errOverScr;
    private readonly REG_NONAME_LABEL;
    private readonly REG_LABEL_ESC;
    private readonly REG_TOKEN_MACRO_BEGIN;
    private readonly REG_TOKEN_MACRO_END;
    private readonly REG_TAG_LET_ML;
    private readonly REG_TAG_ENDLET_ML;
    private seekScript;
    private hScript;
    private resolveScript;
    private jump_light;
    private readonly REG_WILDCARD;
    private readonly REG_WILDCARD2;
    private replaceScript_Wildcard;
    private recordKidoku;
    private isKidoku_;
    get isKidoku(): boolean;
    private eraseKidoku;
    get isNextKidoku(): boolean;
    get normalWait(): number;
    private bracket2macro;
    private char2macro;
    private macro;
    private strStepin;
    private regStepin;
    private load;
    private loadFromMark;
    private reload_script;
    private mark;
    private record_place;
    private save;
}
//# sourceMappingURL=ScriptIterator.d.ts.map