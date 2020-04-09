"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CmnLib_1 = require("./CmnLib");
const Config_1 = require("./Config");
const CallStack_1 = require("./CallStack");
const Grammar_1 = require("./Grammar");
const m_xregexp = require("xregexp");
const pixi_js_1 = require("pixi.js");
const DebugMng_1 = require("./DebugMng");
;
;
class ScriptIterator {
    constructor(cfg, hTag, main, val, alzTagArg, runAnalyze, parse, sndMng, sys) {
        this.cfg = cfg;
        this.hTag = hTag;
        this.main = main;
        this.val = val;
        this.alzTagArg = alzTagArg;
        this.runAnalyze = runAnalyze;
        this.parse = parse;
        this.sndMng = sndMng;
        this.sys = sys;
        this.script = { aToken: [''], len: 1, aLNum: [1] };
        this.scriptFn_ = '';
        this.idxToken_ = 0;
        this.lineNum_ = 0;
        this.addLineNum = (len) => { this.lineNum_ += len; };
        this.aCallStk = [];
        this.getCallStk = (idx) => this.aCallStk[idx].hArg;
        this.grm = new Grammar_1.Grammar;
        this.fncSet = () => { };
        this.fncBreak = () => { };
        this.fnLastBreak = '';
        this.hScrCache4Dump = {};
        this.noticeBreak = (_set) => { };
        this.dumpErrLine = 5;
        this.aIfStk = [-1];
        this.resvToken = '';
        this.skipLabel = '';
        this.onlyCodeScript = (full_path) => {
            const is_cry = full_path.substr(-1) == '_';
            if (is_cry)
                this.replaceScript_Wildcard_Sub_ext = (nm) => nm == 'loadplugin' ? 'css' : 'sn_';
            this.onlyCodeScript = is_cry
                ? (fp) => (fp.substr(-1) != '_')
                : (_) => false;
            return false;
        };
        this.REG_NONAME_LABEL = /(\*{2,})(.*)/;
        this.REG_LABEL_ESC = /\*/g;
        this.REG_TOKEN_MACRO_BEGIN = /\[macro\s/;
        this.REG_TOKEN_MACRO_END = /\[endmacro[\s\]]/;
        this.REG_TAG_LET_ML = m_xregexp(`^\\[let_ml\\s`, 'g');
        this.REG_TAG_ENDLET_ML = m_xregexp(`^\\[endlet_ml\\s*]`, 'g');
        this.hScript = Object.create(null);
        this.REG_WILDCARD = /^\[(call|loadplugin)\s/;
        this.REG_WILDCARD2 = /\bfn\s*=\s*[^\s\]]+/;
        this.replaceScript_Wildcard = () => {
            for (let i = this.script.len - 1; i >= 0; --i) {
                const token = this.script.aToken[i];
                this.REG_WILDCARD.lastIndex = 0;
                if (!this.REG_WILDCARD.test(token))
                    continue;
                const a_tag = m_xregexp.exec(token, Grammar_1.Grammar.REG_TAG);
                if (!this.alzTagArg.go(a_tag['args']))
                    continue;
                const p_fn = this.alzTagArg.hPrm['fn'];
                if (!p_fn)
                    continue;
                const fn = p_fn.val;
                if (!fn || fn.slice(-1) != '*')
                    continue;
                const ext = this.replaceScript_Wildcard_Sub_ext(a_tag['name']);
                const a = this.cfg.matchPath('^' + fn.slice(0, -1) + '.*', ext);
                this.script.aToken.splice(i, 1, '\t', '; ' + token);
                this.script.aLNum.splice(i, 1, NaN, NaN);
                for (const v of a) {
                    const nt = token.replace(this.REG_WILDCARD2, 'fn=' + decodeURIComponent(CmnLib_1.CmnLib.getFn(v[ext])));
                    this.script.aToken.splice(i, 0, nt);
                    this.script.aLNum.splice(i, 0, NaN);
                }
            }
            this.script.len = this.script.aToken.length;
        };
        this.replaceScript_Wildcard_Sub_ext = (nm) => nm == 'loadplugin' ? 'css' : 'sn';
        this.nextToken = () => '';
        this.isKidoku_ = false;
        this.hTagInf = {};
        this.mark = {
            hSave: {},
            hPages: {},
            aIfStk: [-1],
        };
        hTag.let_ml = o => this.let_ml(o);
        hTag.dump_stack = () => this.dump_stack();
        hTag.dump_script = o => this.dump_script(o);
        hTag['else'] =
            hTag.elsif =
                hTag.endif = () => this.endif();
        hTag['if'] = o => this.if(o);
        hTag.call = o => this.call(o);
        hTag.jump = o => this.jump(o);
        hTag.pop_stack = o => this.pop_stack(o);
        hTag.return = () => this.return();
        hTag.bracket2macro = o => this.bracket2macro(o);
        hTag.break_macro = o => this.break_macro(o);
        hTag.char2macro = o => this.char2macro(o);
        hTag.endmacro = o => this.break_macro(o);
        hTag.macro = o => this.macro(o);
        hTag.load = o => this.load(o);
        hTag.reload_script = o => this.reload_script(o);
        hTag.record_place = () => this.record_place();
        hTag.save = o => this.save(o);
        val.defTmp('const.sn.vctCallStk.length', () => this.aCallStk.length);
        this.grm.setEscape(cfg.oCfg.init.escape);
    }
    get scriptFn() { return this.scriptFn_; }
    ;
    get idxToken() { return this.idxToken_; }
    ;
    subIdxToken() { --this.idxToken_; }
    ;
    get lineNum() { return this.lineNum_; }
    get now_token() { return this.script.aToken[this.idxToken_ - 1]; }
    ;
    get isEmptyCallStk() { return this.aCallStk.length == 0; }
    ;
    get lenCallStk() { return this.aCallStk.length; }
    ;
    get lastHArg() { return this.aCallStk[this.lenCallStk - 1].hArg; }
    ;
    setOtherObj(evtMng, layMng) {
        this.evtMng = evtMng;
        this.layMng = layMng;
    }
    let_ml(hArg) {
        var _a;
        const name = hArg.name;
        if (!name)
            throw 'nameは必須です';
        let ml = '';
        const len = this.script.len;
        for (; this.idxToken_ < len; ++this.idxToken_) {
            ml = this.script.aToken[this.idxToken_];
            if (ml != '')
                break;
        }
        hArg.text = ml;
        hArg.cast = 'str';
        this.hTag['let'](hArg);
        this.idxToken_ += 2;
        this.lineNum_ += ((_a = ml.match(/\n/g)) !== null && _a !== void 0 ? _a : []).length;
        return false;
    }
    dump_stack() {
        if (this.idxToken_ == 0) {
            console.group(`🥟 [dump_stack] スクリプト現在地 fn:${this.scriptFn_} line:${1} col:${0}`);
            console.groupEnd();
            return false;
        }
        const lc0 = this.getScr2lineCol(this.script, this.idxToken_);
        const now = `スクリプト現在地 fn:${this.scriptFn_} line:${lc0.line} col:${lc0.col_s + 1}`;
        console.group(`🥟 [dump_stack] ${now}`);
        const len = this.aCallStk.length;
        if (len > 0) {
            console.info(now);
            for (let i = len - 1; i >= 0; --i) {
                const cs = this.aCallStk[i];
                const lc = this.getScr2lineCol(this.hScript[cs.fn], cs.idx);
                if (!cs.hArg)
                    continue;
                const csa = cs.hArg.hMpVal;
                const from_macro_nm = csa ? csa['タグ名'] : null;
                const call_nm = cs.hArg.タグ名;
                console.info(`${len - i}つ前のコール元 fn:${cs.fn} line:${lc.line} col:${lc.col_s + 1}` + (from_macro_nm ? '（[' + from_macro_nm + ']マクロ内）' : ' ') +
                    `で [${call_nm} ...]をコール`);
            }
        }
        console.groupEnd();
        return false;
    }
    getScr2lineCol(st, idx) {
        const ret = { line: 0, col_s: 0, col_e: 0 };
        if (st == null)
            return ret;
        const lN = ret.line = st.aLNum[idx - 1];
        let col_e = 0;
        let i = idx - 1;
        while (st.aLNum[i] == lN) {
            col_e += st.aToken[i].length;
            if (--i < 0)
                break;
        }
        ret.col_e = col_e;
        ret.col_s = col_e - st.aToken[idx - 1].length;
        return ret;
    }
    dump_script(hArg) {
        const set_fnc = hArg.set_fnc;
        if (!set_fnc)
            throw 'set_fncは必須です';
        this.fncSet = window[set_fnc];
        if (!this.fncSet) {
            if (CmnLib_1.CmnLib.argChk_Boolean(hArg, 'need_err', true))
                throw `HTML内に関数${set_fnc}が見つかりません`;
            this.fncSet = () => { };
            return false;
        }
        this.noticeBreak = (set) => {
            if (this.fnLastBreak != this.scriptFn_) {
                this.fnLastBreak = this.scriptFn_;
                this.fncSet(this.hScrCache4Dump[this.scriptFn_]
                    = this.hScrCache4Dump[this.scriptFn_]
                        || this.script.aToken.join(''));
            }
            this.fncBreak(this.lineNum_, set);
        };
        this.noticeBreak(true);
        const break_fnc = hArg.break_fnc;
        if (!break_fnc)
            return false;
        this.fncBreak = window[break_fnc];
        if (!this.fncBreak) {
            if (CmnLib_1.CmnLib.argChk_Boolean(hArg, 'need_err', true))
                throw `HTML内に関数${break_fnc}が見つかりません`;
            this.fncBreak = () => { };
        }
        return false;
    }
    dumpErrForeLine() {
        var _a;
        if (this.idxToken_ == 0) {
            console.group(`🥟 Error line (from 0 rows before) fn:${this.scriptFn_}`);
            console.groupEnd();
            return;
        }
        let s = '';
        for (let i = this.idxToken_ - 1; i >= 0; --i) {
            s = this.script.aToken[i] + s;
            if (((_a = s.match(/\n/g)) !== null && _a !== void 0 ? _a : []).length >= this.dumpErrLine)
                break;
        }
        const a = s.split('\n').slice(-this.dumpErrLine);
        const len = a.length;
        console.group(`🥟 Error line (from ${len} rows before) fn:${this.scriptFn_}`);
        const ln_txt_width = String(this.lineNum_).length;
        const lc = this.getScr2lineCol(this.script, this.idxToken_);
        for (let i = 0; i < len; ++i) {
            const ln = this.lineNum_ - len + i + 1;
            const mes = `${String(ln).padStart(ln_txt_width, ' ')}: %c`;
            const e = a[i];
            const line = (e.length > 75) ? e.substr(0, 75) + '…' : e;
            if (i == len - 1)
                console.info(mes + line.slice(0, lc.col_s) + '%c' + line.slice(lc.col_s), 'color: black; background-color: skyblue;', 'color: black; background-color: pink;');
            else
                console.info(mes + line, 'color: black; background-color: skyblue;');
        }
        console.groupEnd();
    }
    endif() {
        if (this.aIfStk[0] == -1)
            throw 'ifブロック内ではありません';
        this.idxToken_ = this.aIfStk[0];
        this.lineNum_ = this.script.aLNum[this.idxToken_ - 1];
        this.aIfStk.shift();
        return false;
    }
    if(hArg) {
        const exp = hArg.exp;
        if (!exp)
            throw 'expは必須です';
        if (exp.charAt(0) == '&')
            throw '属性expは「&」が不要です';
        let cntDepth = 0;
        let idxGo = this.parse(exp) ? this.idxToken_ : -1;
        for (; this.idxToken_ < this.script.len; ++this.idxToken_) {
            if (!this.script.aLNum[this.idxToken_])
                this.script.aLNum[this.idxToken_] = this.lineNum_;
            const t = this.script.aToken[this.idxToken_];
            if (!t)
                continue;
            const uc = t.charCodeAt(0);
            if (uc == 10) {
                this.addLineNum(t.length);
                continue;
            }
            if (uc != 91)
                continue;
            const a_tag = m_xregexp.exec(t, Grammar_1.Grammar.REG_TAG);
            if (a_tag == null)
                throw 'タグ記述[' + t + ']異常です(if文)';
            const tag_name = a_tag['name'];
            if (!(tag_name in this.hTag))
                throw '未定義のタグ[' + tag_name + ']です';
            if (!this.alzTagArg.go(a_tag['args']))
                throw '属性「' + this.alzTagArg.literal + '」は異常です';
            switch (tag_name) {
                case 'if':
                    ++cntDepth;
                    break;
                case 'elsif':
                    if (cntDepth > 0)
                        break;
                    if (idxGo > -1)
                        break;
                    const e = this.alzTagArg.hPrm['exp'].val;
                    if (e.charAt() == '&')
                        throw '属性expは「&」が不要です';
                    if (this.parse(e))
                        idxGo = this.idxToken_ + 1;
                    break;
                case 'else':
                    if (cntDepth > 0)
                        break;
                    if (idxGo == -1)
                        idxGo = this.idxToken_ + 1;
                    break;
                case 'endif':
                    if (cntDepth > 0) {
                        --cntDepth;
                        break;
                    }
                    if (idxGo == -1) {
                        ++this.idxToken_;
                        this.script.aLNum[this.idxToken_] = this.lineNum_;
                    }
                    else {
                        this.aIfStk.unshift(this.idxToken_ + 1);
                        this.idxToken_ = idxGo;
                        this.lineNum_ = this.script.aLNum[this.idxToken_];
                    }
                    return false;
            }
        }
        throw '[endif]がないままスクリプト終端です';
    }
    call(hArg) {
        if (!CmnLib_1.CmnLib.argChk_Boolean(hArg, 'count', false))
            this.eraseKidoku();
        const fn = hArg.fn;
        if (fn)
            this.cfg.searchPath(fn, Config_1.Config.EXT_SCRIPT);
        this.script.aLNum[this.idxToken_] = this.lineNum_;
        const hPushArg = {
            csAnalyBf: new CallStack_1.CallStack(this.scriptFn_, this.idxToken_),
            hEvt1Time: this.evtMng.popLocalEvts()
        };
        this.callSub(hPushArg);
        if (CmnLib_1.CmnLib.argChk_Boolean(hArg, 'clear_local_event', false))
            this.hTag.clear_event({});
        this.jumpWork(fn, hArg.label);
        return true;
    }
    callSub(hPushArg) {
        if (!this.resvToken) {
            hPushArg.resvToken = this.resvToken;
            this.clearResvToken();
        }
        this.pushCallStack(hPushArg);
        this.aIfStk.unshift(-1);
    }
    jump(hArg) {
        if (!CmnLib_1.CmnLib.argChk_Boolean(hArg, 'count', true))
            this.eraseKidoku();
        this.aIfStk[0] = -1;
        this.jumpWork(hArg.fn, hArg.label);
        return true;
    }
    pop_stack(hArg) {
        if (CmnLib_1.CmnLib.argChk_Boolean(hArg, 'clear', false)) {
            while (this.aCallStk.length > 0)
                this.aCallStk.pop();
        }
        else {
            if (this.aCallStk.length == 0)
                throw '[pop_stack] スタックが空です';
            this.aCallStk.pop();
        }
        this.clearResvToken();
        this.aIfStk = [-1];
        return false;
    }
    return() {
        if (this.aCallStk.length == 0)
            throw '[return] スタックが空です';
        const cs = this.aCallStk.pop();
        if (!cs || !cs.hArg)
            return false;
        this.aIfStk.shift();
        const after_token = cs.hArg.resvToken;
        if (after_token)
            this.nextToken = () => {
                this.clearResvToken();
                return after_token;
            };
        else
            this.clearResvToken();
        if (cs.hArg.hEvt1Time)
            this.evtMng.pushLocalEvts(cs.hArg.hEvt1Time);
        const oscr = this.hScript[cs.fn];
        if (!oscr) {
            this.jumpWork(cs.fn, '', cs.idx);
            return true;
        }
        this.jump_light(cs.fn, cs.idx);
        return false;
    }
    clearResvToken() {
        this.resvToken = '';
        this.nextToken = this.nextToken_Proc;
    }
    jumpWork(fn = '', label = '', idx = 0) {
        if (!fn && !label)
            this.main.errScript('[jump系] fnまたはlabelは必須です');
        if (label) {
            if (label.charAt(0) != '*')
                this.main.errScript('[jump系] labelは*で始まります');
            this.skipLabel = label;
            if (this.skipLabel.slice(0, 2) != '**')
                this.idxToken_ = idx;
        }
        else {
            this.skipLabel = '';
            this.idxToken_ = idx;
        }
        if (!fn) {
            this.analyzeInit();
            return;
        }
        const full_path = this.cfg.searchPath(fn, Config_1.Config.EXT_SCRIPT);
        if (fn == this.scriptFn_) {
            this.analyzeInit();
            return;
        }
        this.scriptFn_ = fn;
        const st = this.hScript[this.scriptFn_];
        if (st) {
            this.script = st;
            this.analyzeInit();
            return;
        }
        if (this.onlyCodeScript(full_path))
            this.main.errScript('[セキュリティ] 最初のスクリプトが暗号化だったため、以降は暗号化スクリプト以外許されません');
        (new pixi_js_1.Loader()).add(this.scriptFn_, full_path)
            .pre((res, next) => res.load(() => {
            this.sys.pre(res.extension, res.data)
                .then(r => { res.data = r; next(); })
                .catch(e => this.main.errScript(`[jump系]snロード失敗です fn:${res.name} ${e}`, false));
        }))
            .load((_ldr, hRes) => {
            this.nextToken = this.nextToken_Proc;
            this.resolveScript(hRes[fn].data);
            this.hTag.record_place({});
            this.main.resume(() => this.analyzeInit());
        });
        this.main.stop();
    }
    analyzeInit() {
        const o = this.seekScript(this.script, Boolean(this.val.getVal('mp:const.sn.macro_name')), this.lineNum_, this.skipLabel, this.idxToken_);
        this.idxToken_ = o.idx;
        this.lineNum_ = o.lineNum;
        this.runAnalyze();
    }
    seekScript(st, inMacro, ln, skipLabel, idxToken) {
        var _a;
        const len = st.aToken.length;
        if (!skipLabel) {
            if (idxToken >= len)
                DebugMng_1.DebugMng.myTrace('[jump系] 内部エラー idxToken:' + idxToken + ' は、最大トークン数:' + len + 'を越えます', 'ET');
            if (!st.aLNum[idxToken]) {
                ln = 1;
                for (let j = 0; j < idxToken; ++j) {
                    if (!st.aLNum[j])
                        st.aLNum[j] = ln;
                    const token_j = st.aToken[j];
                    if (token_j.charCodeAt(0) == 10) {
                        ln += token_j.length;
                    }
                }
                st.aLNum[idxToken] = ln;
            }
            else {
                ln = st.aLNum[idxToken];
            }
            return {
                idx: idxToken,
                lineNum: ln
            };
        }
        st.aLNum[0] = 1;
        const a_skipLabel = skipLabel.match(this.REG_NONAME_LABEL);
        if (a_skipLabel) {
            skipLabel = a_skipLabel[1];
            let i = idxToken;
            switch (a_skipLabel[2]) {
                case 'before':
                    while (st.aToken[--i] != skipLabel) {
                        if (i == 0)
                            DebugMng_1.DebugMng.myTrace('[jump系 無名ラベルbefore] '
                                + ln + '行目以前で' + (inMacro ? 'マクロ内に' : '')
                                + 'ラベル【' + skipLabel + '】がありません', 'ET');
                        if (inMacro && st.aToken[i].search(this.REG_TOKEN_MACRO_BEGIN) > -1)
                            DebugMng_1.DebugMng.myTrace('[jump系 無名ラベルbefore] マクロ内にラベル【' + skipLabel + '】がありません', 'ET');
                    }
                    return {
                        idx: i + 1,
                        lineNum: st.aLNum[i]
                    };
                case 'after':
                    while (st.aToken[++i] != skipLabel) {
                        if (i == len)
                            DebugMng_1.DebugMng.myTrace('[jump系 無名ラベルafter] '
                                + ln + '行目以後でマクロ内にラベル【' + skipLabel + '】がありません', 'ET');
                        if (st.aToken[i].search(this.REG_TOKEN_MACRO_END) > -1)
                            DebugMng_1.DebugMng.myTrace('[jump系 無名ラベルafter] '
                                + ln + '行目以後でマクロ内にラベル【' + skipLabel + '】がありません', 'ET');
                    }
                    return {
                        idx: i + 1,
                        lineNum: st.aLNum[i]
                    };
                default:
                    DebugMng_1.DebugMng.myTrace('[jump系] 無名ラベル指定【label=' + skipLabel + '】が間違っています', 'ET');
            }
        }
        ln = 1;
        const reLabel = new RegExp('^' + skipLabel.replace(this.REG_LABEL_ESC, '\\*')
            + '(?:\\s|;|\\[|$)');
        let in_let_ml = false;
        for (let i = 0; i < len; ++i) {
            if (!st.aLNum[i])
                st.aLNum[i] = ln;
            const token = st.aToken[i];
            const uc = token.charCodeAt(0);
            if (uc != 42) {
                if (in_let_ml) {
                    this.REG_TAG_ENDLET_ML.lastIndex = 0;
                    if (this.REG_TAG_ENDLET_ML.test(token)) {
                        in_let_ml = false;
                        continue;
                    }
                    ln += ((_a = token.match(/\n/g)) !== null && _a !== void 0 ? _a : []).length;
                }
                else {
                    this.REG_TAG_LET_ML.lastIndex = 0;
                    if (this.REG_TAG_LET_ML.test(token)) {
                        in_let_ml = true;
                        continue;
                    }
                    if (uc == 10)
                        ln += token.length;
                }
                continue;
            }
            if (token.search(reLabel) > -1)
                return {
                    idx: i + 1,
                    lineNum: ln
                };
        }
        if (in_let_ml)
            throw '[let_ml]の終端・[endlet_ml]がありません';
        DebugMng_1.DebugMng.myTrace(`[jump系] ラベル【` + skipLabel + `】がありません`, 'ET');
        throw 'Dummy';
    }
    resolveScript(txt) {
        txt = txt.replace(/(\r\n|\r)/g, '\n');
        const v = this.grm.cnvMultilineTag(txt).match(this.grm.REG_TOKEN);
        if (!v)
            throw 'CmnLib.cnvMultilineTag fail';
        for (let i = v.length - 1; i >= 0; --i) {
            const e = v[i];
            this.REG_TAG_LET_ML.lastIndex = 0;
            if (this.REG_TAG_LET_ML.test(e)) {
                const idx = e.indexOf(']') + 1;
                if (idx == 0)
                    throw '[let_ml]で閉じる【]】がありません';
                const a = e.slice(0, idx);
                const b = e.slice(idx);
                v.splice(i, 1, a, b);
            }
        }
        this.script = { aToken: v, len: v.length, aLNum: [] };
        let mes = '';
        try {
            mes = 'ScriptIterator.replaceScriptChar2macro';
            this.grm.replaceScr_C2M_And_let_ml(this.script);
            mes = 'ScriptIterator.replaceScript_Wildcard';
            this.replaceScript_Wildcard();
        }
        catch (err) {
            if (err instanceof Error) {
                const e = err;
                mes += '例外 mes=' + e.message + '(' + e.name + ')';
            }
            else {
                mes = err;
            }
            this.main.errScript(mes, false);
        }
        this.hScript[this.scriptFn_] = this.script;
        this.val.loadScrWork(this.scriptFn_);
    }
    jump_light(fn, idx) {
        this.scriptFn_ = fn;
        this.idxToken_ = idx;
        const st = this.hScript[this.scriptFn_];
        if (st != null)
            this.script = st;
        this.lineNum_ = this.script.aLNum[idx];
    }
    nextToken_Proc() {
        if (this.idxToken_ == this.script.len)
            this.main.errScript('スクリプト終端です  idxToken:' + this.idxToken_ + ' this.tokens.aToken.length:' + this.script.aToken.length);
        this.recordKidoku();
        if (!this.script.aLNum[this.idxToken_])
            this.script.aLNum[this.idxToken_] = this.lineNum_;
        const token = this.script.aToken[this.idxToken_];
        this.main.stop();
        ++this.idxToken_;
        return token;
    }
    recordKidoku() {
        const areas = this.val.getAreaKidoku(this.scriptFn_);
        if (!areas)
            throw `recordKidoku fn:'${this.scriptFn_}' (areas == null)`;
        if (this.aCallStk.length > 0) {
            areas.record(this.idxToken_);
            return;
        }
        this.isKidoku_ = areas.search(this.idxToken_);
        this.val.setVal_Nochk('tmp', 'const.sn.isKidoku', this.isKidoku_);
        if (this.isKidoku_)
            return;
        areas.record(this.idxToken_);
    }
    get isKidoku() { return this.isKidoku_; }
    ;
    eraseKidoku() {
        const areas = this.val.getAreaKidoku(this.scriptFn_);
        if (areas)
            areas.erase(this.idxToken_);
        this.isKidoku_ = false;
    }
    get isNextKidoku() {
        let fn = this.scriptFn;
        let idx = this.idxToken;
        let len = this.script.len;
        if (this.aCallStk.length > 0) {
            const cs = this.aCallStk[0];
            fn = cs.fn;
            idx = cs.idx;
            const st = this.hScript[fn];
            if (st != null)
                len = st.len;
        }
        const areas = this.val.getAreaKidoku(fn);
        if (!areas)
            return false;
        if (idx == len)
            return false;
        return areas.search(idx);
    }
    pushCallStack(hArg) {
        this.aCallStk.push(new CallStack_1.CallStack(this.scriptFn_, this.idxToken_, hArg));
    }
    get normalWait() {
        return this.isKidoku_
            ? (this.val.getVal('sys:sn.tagCh.doWait_Kidoku')
                ? CmnLib_1.uint(this.val.getVal('sys:sn.tagCh.msecWait_Kidoku'))
                : 0)
            : (this.val.getVal('sys:sn.tagCh.doWait')
                ? CmnLib_1.uint(this.val.getVal('sys:sn.tagCh.msecWait'))
                : 0);
    }
    bracket2macro(hArg) {
        this.grm.bracket2macro(hArg, this.script, this.idxToken_);
        return false;
    }
    break_macro(hArg) {
        const len = this.aCallStk.length;
        if (len == 0)
            throw '[endmacro] マクロ外で呼ばれました';
        const hPopArg = this.aCallStk[len - 1].hArg.hMpVal;
        if (hPopArg)
            this.val.setMp(hPopArg);
        return this.hTag['return'](hArg);
    }
    char2macro(hArg) {
        this.grm.char2macro(hArg, this.hTag, this.script, this.idxToken_);
        return false;
    }
    macro(hArg) {
        var _a;
        const name = hArg.name;
        if (!name)
            throw 'nameは必須です';
        if (name in this.hTag) {
            const o = this.hTagInf[name];
            if (!o)
                throw 'すでに定義済みのタグ[' + name + ']です';
            throw 'すでに ' + o.fn + '.sn にて定義済みのマクロ[' + name + ']です';
        }
        const cs = new CallStack_1.CallStack(this.scriptFn_, this.idxToken_);
        const ln = this.lineNum_;
        this.hTag[name] = hArg => {
            const hPushArg = Object.assign({}, hArg);
            hPushArg.hMpVal = this.val.cloneMp();
            this.callSub(hPushArg);
            this.val.setMp(hArg);
            this.val.setVal_Nochk('mp', 'const.sn.macro_name', name);
            this.val.setVal_Nochk('mp', 'const.sn.me_call_scriptFn', this.scriptFn_);
            this.lineNum_ = ln;
            const keep_cs = cs;
            this.jump_light(keep_cs.fn, keep_cs.idx);
            return false;
        };
        this.hTagInf[name] = { by: 'macro', fn: this.scriptFn_ };
        for (; this.idxToken_ < this.script.len; ++this.idxToken_) {
            if (!this.script.aLNum[this.idxToken_])
                this.script.aLNum[this.idxToken_] = this.lineNum_;
            const token = this.script.aToken[this.idxToken_];
            if (token.search(this.REG_TOKEN_MACRO_END) > -1) {
                ++this.idxToken_;
                return false;
            }
            if (token.charCodeAt(0) == 10)
                this.lineNum_ += ((_a = token.match(/\n/g)) !== null && _a !== void 0 ? _a : []).length;
        }
        throw 'マクロ' + name + '定義の終端・[endmacro]がありません';
    }
    load(hArg) {
        const place = hArg.place;
        if (!place)
            throw 'placeは必須です';
        if (('fn' in hArg) != ('label' in hArg))
            throw 'fnとlabelはセットで指定して下さい';
        const mark = this.val.getMark(place);
        if (!mark)
            throw `place【${place}】は存在しません`;
        return this.loadFromMark(hArg, mark);
    }
    loadFromMark(hArg, mark, reload_sound = true) {
        this.layMng.cover(true);
        this.hTag.clear_event({});
        this.val.mark2save(mark);
        this.layMng.recText('', true);
        if (reload_sound)
            this.sndMng.playLoopFromSaveObj();
        if (CmnLib_1.CmnLib.argChk_Boolean(hArg, 'do_rec', true))
            this.mark = {
                hSave: this.val.cloneSave(),
                hPages: Object.assign({}, mark.hPages),
                aIfStk: [...mark.aIfStk],
            };
        const o = {
            enabled: this.val.getVal('save:const.sn.autowc.enabled'),
            text: String(this.val.getVal('save:const.sn.autowc.text')),
            time: String(this.val.getVal('save:const.sn.autowc.time')),
        };
        this.hTag.autowc(o);
        const fn = String(this.val.getVal('save:const.sn.scriptFn'));
        const idx = Number(this.val.getVal('save:const.sn.scriptIdx'));
        delete this.hScript[fn];
        this.aIfStk = [...this.mark.aIfStk];
        this.aCallStk = [];
        this.layMng.playback(this.mark.hPages, 'label' in hArg
            ? () => {
                this.layMng.cover(false);
                this.scriptFn_ = fn;
                this.idxToken_ = idx;
                this.hTag.call({ fn: hArg.fn, label: hArg.label });
            }
            : () => {
                this.layMng.cover(false);
                this.jumpWork(fn, '', idx);
            });
        return true;
    }
    reload_script(hArg) {
        const mark = this.val.getMark(0);
        delete this.hScript[CmnLib_1.CmnLib.getFn(mark.hSave['const.sn.scriptFn'])];
        hArg.do_rec = false;
        return this.loadFromMark(hArg, mark, false);
    }
    record_place() {
        if (this.main.isDestroyed())
            return false;
        if (this.aCallStk.length == 0) {
            this.val.setVal_Nochk('save', 'const.sn.scriptFn', this.scriptFn);
            this.val.setVal_Nochk('save', 'const.sn.scriptIdx', this.idxToken);
        }
        else {
            this.val.setVal_Nochk('save', 'const.sn.scriptFn', this.aCallStk[0].fn);
            this.val.setVal_Nochk('save', 'const.sn.scriptIdx', this.aCallStk[0].idx);
        }
        this.mark = {
            hSave: this.val.cloneSave(),
            hPages: this.layMng.record(),
            aIfStk: this.aIfStk.slice(this.aCallStk.length),
        };
        return false;
    }
    save(hArg) {
        var _a;
        const place = hArg.place;
        if (!place)
            throw 'placeは必須です';
        delete hArg.タグ名;
        delete hArg.place;
        hArg.text = ((_a = hArg.text) !== null && _a !== void 0 ? _a : '').replace(/^(<br\/>)+/, '');
        this.mark.json = hArg;
        this.val.setMark(place, this.mark);
        const now_sp = Number(this.val.getVal('sys:const.sn.save.place'));
        if (place == now_sp)
            this.val.setVal_Nochk('sys', 'const.sn.save.place', now_sp + 1);
        return false;
    }
}
exports.ScriptIterator = ScriptIterator;
//# sourceMappingURL=ScriptIterator.js.map