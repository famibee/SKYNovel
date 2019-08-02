"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CmnLib_1 = require("./CmnLib");
const Areas_1 = require("./Areas");
const PropParser_1 = require("./PropParser");
const platform = require('platform');
class Variable {
    constructor(cfg, hTag) {
        this.cfg = cfg;
        this.hScope = { sys: {}, save: {}, tmp: {}, mp: {} };
        this.hSave = this.hScope.save;
        this.hTmp = this.hScope.tmp;
        this.data = { sys: {}, mark: {}, kidoku: {} };
        this.hAreaKidoku = {};
        this.flush_ = () => { };
        this.getMark = (place) => this.data.mark[place];
        this.getAreaKidoku = (fn) => this.hAreaKidoku[fn];
        this.setVal = (arg_name, val, autocast = true) => {
            if (!arg_name)
                throw '[変数に値セット] nameは必須です';
            if (val == null)
                throw '[変数に値セット] textは必須です（空文字はOK）';
            const o = PropParser_1.PropParser.getValName(arg_name);
            if (o == undefined)
                throw '[変数参照] name(' + arg_name + ')が変数名として異常です';
            const hScope = this.hScope[o.scope];
            if (!hScope)
                throw '[変数に値セット] scopeが異常【' + o.scope + '】です';
            const nm = o['name'];
            if (nm.slice(0, 6) == 'const.' && (nm in hScope)) {
                throw '[変数に値セット] 変数【' + nm + '】は書き換え不可です';
            }
            this.setVal_Nochk(o.scope, nm, val, autocast);
        };
        this.getVal = (arg_name, def) => {
            if (!arg_name)
                throw '[変数参照] nameは必須です';
            const o = PropParser_1.PropParser.getValName(arg_name);
            if (o == undefined)
                throw '[変数参照] name(' + arg_name + ')が変数名として異常です';
            const hScope = this.hScope[o['scope']];
            if (!hScope)
                throw '[変数参照] scopeが異常【' + o['scope'] + '】です';
            const name = o['name'];
            if ((!(name in hScope)) && def != undefined)
                hScope[name] = def;
            let val = hScope[name];
            if (val instanceof Function)
                val = val();
            if (o['at'] == '@str')
                return val;
            return this.castAuto(val);
        };
        this.REG_NUMERICLITERAL = /^-?[\d\.]+$/;
        this.dump_val = () => {
            const val = { tmp: {}, sys: {}, save: {}, mp: {} };
            for (let scope in val) {
                const hVal = this.hScope[scope];
                const hRet = val[scope];
                for (let key in hVal) {
                    const v = hVal[key];
                    if (Object.prototype.toString.call(v) == '[object Function]') {
                        hRet[key] = v();
                    }
                    else
                        hRet[key] = v;
                }
            }
            console.info('🥟 [dump_val]', val);
            return false;
        };
        this.hValTrg = {
            'sys:sn.tagCh.doWait': name => this.runFirst_Bool_hSysVal_true(name),
            'sys:sn.tagCh.doWait_Kidoku': name => this.runFirst_Bool_hSysVal_true(name),
            'sys:sn.tagCh.msecWait': name => this.runFirst_sys_an_tagCh_msecWait(name),
            'sys:sn.tagCh.msecWait_Kidoku': name => this.runFirst_sys_an_tagCh_msecWait_Kidoku(name),
            'sys:sn.tagCh.canskip': name => this.runFirst_Bool_hSysVal_true(name),
            'sys:sn.auto.msecPageWait': name => this.runFirst_sys_an_auto_msecPageWait(name),
            'sys:sn.auto.msecPageWait_Kidoku': name => this.runFirst_sys_an_auto_msecPageWait(name),
            'sys:sn.auto.msecLineWait': name => this.runFirst_sys_an_auto_msecLineWait(name),
            'sys:sn.auto.msecLineWait_Kidoku': name => this.runFirst_sys_an_auto_msecLineWait(name),
            'save:sn.doRecLog': name => this.runFirst_Bool_hSaveVal_true(name),
            'save:sn.userFnTail': (_name, val) => this.cfg.userFnTail = val,
            'tmp:sn.tagL.enabled': name => this.runFirst_Bool_hTmp_true(name),
            'tmp:sn.skip.all': name => this.runFirst_Bool_hTmp_false(name),
            'tmp:sn.skip.enabled': name => this.runFirst_Bool_hTmp_false(name),
            'tmp:sn.auto.enabled': name => this.runFirst_Bool_hTmp_false(name),
            'tmp:flash.desktop.NativeApplication.nativeApplication.systemIdleMode': (() => {
            }),
            'tmp:sn.chkFontMode': () => {
                if (this.hTmp['const.sn.onLauncher'])
                    return;
                if (!this.hTmp['const.sn.isDebugger'])
                    return;
            }
        };
        hTag.let = o => this.let(o);
        hTag.let_abs = o => this.let_abs(o);
        hTag.let_char_at = o => this.let_char_at(o);
        hTag.let_index_of = o => this.let_index_of(o);
        hTag.let_length = o => this.let_length(o);
        hTag.let_replace = o => this.let_replace(o);
        hTag.let_round = o => this.let_round(o);
        hTag.let_search = o => this.let_search(o);
        hTag.let_substr = o => this.let_substr(o);
        hTag.clearsysvar = () => this.clearsysvar();
        hTag.clearvar = () => this.clearvar();
        hTag.dump_val = () => this.dump_val();
        hTag.copybookmark = o => this.copybookmark(o);
        hTag.erasebookmark = o => this.erasebookmark(o);
        this.hSave['sn.userFnTail'] = '';
        this.defTmp('const.sn.bookmark.json', () => {
            const a = [];
            Object.keys(this.data.mark).sort().forEach(k => {
                const o = Object.assign({}, this.data.mark[k].json);
                for (const key in o) {
                    const v = o[key];
                    if (typeof v != 'string')
                        continue;
                    if (v.substr(0, 10) != 'userdata:/')
                        continue;
                    o[key] = cfg.searchPath(v);
                }
                o.place = k;
                a.push(o);
            });
            return JSON.stringify(a);
        });
        this.hTmp['const.sn.isFirstBoot'] = true;
        this.hTmp['sn.tagL.enabled'] = true;
        this.hTmp['sn.skip.all'] = false;
        this.hTmp['sn.skip.enabled'] = false;
        this.hTmp['sn.auto.enabled'] = false;
        this.hTmp['const.sn.last_page_text'] = '';
        this.hTmp['const.sn.displayState'] = false;
        const win = window;
        const ac = win['AudioContext'] || win['webkitAudioContext'];
        this.hTmp['const.sn.needClick2Play'] = () => new ac().state == 'suspended';
        this.hTmp['const.Date.getTime'] = () => (new Date).getTime();
        this.hTmp['const.Date.getDateStr'] = () => CmnLib_1.getDateStr();
        this.hTmp['const.Stage.mouseX'] = () => {
            return 0;
        };
        this.hTmp['const.Stage.mouseY'] = () => {
            return 0;
        };
        this.hTmp['const.sn.platform.os.family'] = platform.os.family;
        this.clearsysvar();
        this.clearvar();
        this.hTmp['const.sn.config.window.width'] = cfg.oCfg.window.width;
        this.hTmp['const.sn.config.window.height'] = cfg.oCfg.window.height;
        this.hTmp['const.sn.config.book.title'] = cfg.oCfg.book.title;
        this.hTmp['const.sn.config.book.version'] = cfg.oCfg.book.version;
        this.hTmp['const.sn.Math.PI'] = Math.PI;
    }
    setSys(sys) {
        sys.initVal(this.data, this.hTmp, data => {
            this.data = data;
            this.hSys = this.hScope.sys = this.data.sys;
            for (const fn in this.data.kidoku) {
                const areas = new Areas_1.Areas();
                areas.hAreas = Object.assign({}, this.data.kidoku[fn]);
                this.hAreaKidoku[fn] = areas;
            }
            sessionStorage.clear();
            this.flush_ = (this.cfg.oCfg.debug.variable)
                ? () => {
                    const oSys = {};
                    Object.keys(this.hSys).forEach(k => {
                        const v = this.hSys[k];
                        oSys['sys:' + k] = (v instanceof Function) ? v() : v;
                    });
                    sessionStorage[this.cfg.getNs() + 'sys'] = JSON.stringify(oSys);
                    const oSave = {};
                    Object.keys(this.hSave).forEach(k => {
                        const v = this.hSave[k];
                        oSave['save:' + k] = (v instanceof Function) ? v() : v;
                    });
                    sessionStorage[this.cfg.getNs() + 'save'] = JSON.stringify(oSave);
                    const oTmp = {};
                    Object.keys(this.hTmp).forEach(k => {
                        const v = this.hTmp[k];
                        oTmp[k] = (v instanceof Function) ? v() : v;
                    });
                    sessionStorage[this.cfg.getNs() + 'tmp'] = JSON.stringify(oTmp);
                    const oMp = {};
                    Object.keys(this.hScope.mp).forEach(k => {
                        const v = this.hScope.mp[k];
                        oMp[k] = (v instanceof Function) ? v() : v;
                    });
                    sessionStorage[this.cfg.getNs() + 'mp'] = JSON.stringify(oMp);
                    const oMark = {};
                    Object.keys(this.data.mark).forEach(k => {
                        const v = this.data.mark[k];
                        oMark[k] = (v instanceof Function) ? v() : v;
                    });
                    sessionStorage[this.cfg.getNs() + 'mark'] = JSON.stringify(oMark);
                    const oKidoku = {};
                    Object.keys(this.data.kidoku).forEach(k => {
                        const v = this.data.kidoku[k];
                        oKidoku[k] = (v instanceof Function) ? v() : v;
                    });
                    sessionStorage[this.cfg.getNs() + 'kidoku'] = JSON.stringify(oKidoku);
                    sys.flush();
                }
                : () => sys.flush();
        });
    }
    flush() { this.flush_(); }
    defTmp(name, fnc) { this.hTmp[name] = fnc; }
    ;
    cloneMp() { return Object.assign({}, this.hScope.mp); }
    setMp(mp) { this.hScope.mp = mp; }
    setMark(place, mark) { this.data.mark[place] = mark; this.flush(); }
    cloneSave() { return Object.assign({}, this.hScope.save); }
    mark2save(mark) {
        this.hSave = this.hScope.save = Object.assign({}, mark.hSave);
        this.hSave['const.sn.sLog'] += '\f';
    }
    loadScrWork(fn) {
        if (!(fn in this.hAreaKidoku))
            this.hAreaKidoku[fn] = new Areas_1.Areas;
    }
    saveKidoku() {
        for (const fn in this.hAreaKidoku) {
            this.data.kidoku[fn] = Object.assign({}, this.hAreaKidoku[fn].hAreas);
        }
        this.flush();
    }
    copybookmark(hArg) {
        if (!('from' in hArg))
            throw 'fromは必須です';
        if (!('to' in hArg))
            throw 'toは必須です';
        const from = Number(hArg.from);
        const to = Number(hArg.to);
        if (from != to)
            this.setMark(to, Object.assign({}, this.data.mark[from]));
        return false;
    }
    erasebookmark(hArg) {
        const place = hArg.place;
        if (!place)
            throw 'placeは必須です';
        delete this.data.mark[place];
        this.flush();
        return false;
    }
    let(hArg) {
        if (!hArg.name)
            throw 'nameは必須です';
        let autocast = true;
        if (hArg.cast) {
            switch (hArg.cast) {
                case 'num':
                    CmnLib_1.CmnLib.argChk_Num(hArg, 'text', NaN);
                    break;
                case 'int':
                    hArg.text = String(CmnLib_1.int(CmnLib_1.CmnLib.argChk_Num(hArg, 'text', NaN)));
                    break;
                case 'uint':
                    hArg.text = String(CmnLib_1.uint(CmnLib_1.CmnLib.argChk_Num(hArg, 'text', NaN)));
                    break;
                case 'bool':
                    CmnLib_1.CmnLib.argChk_Boolean(hArg, 'text', false);
                    break;
                case 'str':
                    autocast = false;
                    break;
                default:
                    throw 'cast【' + hArg.cast + '】は未定義です';
            }
        }
        this.setVal(hArg.name, hArg.text, autocast);
        return false;
    }
    let_abs(hArg) {
        const n = CmnLib_1.CmnLib.argChk_Num(hArg, 'text', 0);
        hArg.text = String((n < 0) ? -n : n);
        this.let(hArg);
        return false;
    }
    let_char_at(hArg) {
        hArg.text = (hArg.text || '').charAt(CmnLib_1.CmnLib.argChk_Num(hArg, 'pos', 0));
        this.let(hArg);
        return false;
    }
    let_index_of(hArg) {
        const val = hArg.val;
        if (!val)
            throw 'valは必須です';
        const start = CmnLib_1.CmnLib.argChk_Num(hArg, 'start', 0);
        hArg.text = String((hArg.text || '').indexOf(val, start));
        this.let(hArg);
        return false;
    }
    let_length(hArg) {
        hArg.text = String((hArg.text || '').length);
        this.let(hArg);
        return false;
    }
    let_replace(hArg) {
        if (!hArg.reg)
            throw 'regは必須です';
        const flags = hArg.flags;
        const reg = (!flags)
            ? new RegExp(hArg.reg)
            : new RegExp(hArg.reg, flags);
        hArg.text = String(hArg.text || '').replace(reg, String(hArg.val));
        this.let(hArg);
        return false;
    }
    let_round(hArg) {
        const n = CmnLib_1.CmnLib.argChk_Num(hArg, 'text', 0);
        hArg.text = String(Math.round(n));
        this.let(hArg);
        return false;
    }
    let_search(hArg) {
        if (!hArg.reg)
            throw 'regは必須です';
        const flags = hArg.flags;
        const reg = (!flags)
            ? new RegExp(hArg.reg)
            : new RegExp(hArg.reg, flags);
        hArg.text = String((hArg.text || '').search(reg));
        this.let(hArg);
        return false;
    }
    let_substr(hArg) {
        const i = CmnLib_1.CmnLib.argChk_Num(hArg, 'pos', 0);
        hArg.text = (hArg.len != 'all')
            ? (hArg.text || '').substr(i, CmnLib_1.int(CmnLib_1.CmnLib.argChk_Num(hArg, 'len', 1)))
            : (hArg.text || '').substr(i);
        this.let(hArg);
        return false;
    }
    clearsysvar() {
        const sys = this.hSys = this.hScope['sys'] = this.data.sys = {};
        const is_nw = (typeof process !== 'undefined');
        if (is_nw) {
        }
        else {
            this.setVal_Nochk('sys', 'const.sn.window.x', 0);
            this.setVal_Nochk('sys', 'const.sn.window.y', 0);
        }
        this.setVal_Nochk('sys', 'sn.tagCh.doWait', true);
        this.setVal_Nochk('sys', 'sn.tagCh.doWait_Kidoku', true);
        this.setVal_Nochk('sys', 'sn.tagCh.msecWait', this.cfg.oCfg.init.tagch_msecwait);
        this.setVal_Nochk('sys', 'sn.tagCh.msecWait_Kidoku', this.cfg.oCfg.init.tagch_msecwait);
        this.setVal_Nochk('sys', 'sn.tagCh.canskip', true);
        this.setVal_Nochk('sys', 'sn.skip.mode', 's');
        this.setVal_Nochk('sys', 'sn.auto.msecPageWait', CmnLib_1.CmnLib.argChk_Num(sys, 'sn.auto.msecPageWait', this.cfg.oCfg.init.auto_msecpagewait || 3500));
        this.setVal_Nochk('sys', 'sn.auto.msecPageWait_Kidoku', CmnLib_1.CmnLib.argChk_Num(sys, 'sn.auto.msecPageWait', this.cfg.oCfg.init.auto_msecpagewait || 3500));
        this.setVal_Nochk('sys', 'sn.auto.msecLineWait', 500);
        this.setVal_Nochk('sys', 'sn.auto.msecLineWait_Kidoku', 500);
        this.setVal_Nochk('sys', 'const.sn.sound.BGM.volume', 1);
        this.setVal_Nochk('sys', 'const.sn.sound.SE.volume', 1);
        this.setVal_Nochk('sys', 'const.sn.sound.SYS.volume', 1);
        for (const fn in this.data.kidoku)
            this.data.kidoku[fn].hAreas = {};
        this.setVal_Nochk('sys', 'TextLayer.Back.Alpha', 0.5);
        this.hScope['mark'] = this.data.mark = {};
        this.setVal_Nochk('sys', 'const.sn.save.place', 1);
        this.flush();
        return false;
    }
    clearvar() {
        const mesLayer = this.hSave['const.sn.mesLayer'] || '';
        const doRecLog = this.hSave['sn.doRecLog'] || false;
        const sLog = this.hSave['const.sn.sLog'] || '';
        this.hSave = this.hScope.save = {};
        this.setVal_Nochk('save', 'const.sn.mesLayer', mesLayer);
        this.setVal_Nochk('save', 'sn.doRecLog', doRecLog);
        this.setVal_Nochk('save', 'const.sn.sLog', sLog);
        return false;
    }
    setVal_Nochk(scope, nm, val, autocast = false) {
        const hScope = this.hScope[scope];
        if (autocast)
            val = this.castAuto(val);
        hScope[nm] = val;
        const trg = this.hValTrg[scope + ':' + nm];
        if (trg != null)
            trg(nm, val);
    }
    castAuto(val) {
        const s_val = val;
        if (s_val == 'true')
            return true;
        if (s_val == 'false')
            return false;
        if (s_val == 'null')
            return null;
        if (s_val == 'undefined')
            return undefined;
        this.REG_NUMERICLITERAL.lastIndex = 0;
        if (this.REG_NUMERICLITERAL.test(s_val))
            return parseFloat(s_val);
        return val;
    }
    defValTrg(name, fnc) { this.hValTrg[name] = fnc; }
    runFirst_Bool_hSysVal_true(name) {
        CmnLib_1.CmnLib.argChk_Boolean(this.hSys, name, true);
    }
    runFirst_sys_an_tagCh_msecWait(name) {
        CmnLib_1.CmnLib.argChk_Num(this.hSys, name, 10);
        if (this.hSys['sn.tagCh.doWait']) {
        }
    }
    runFirst_sys_an_tagCh_msecWait_Kidoku(name) {
        CmnLib_1.CmnLib.argChk_Num(this.hSys, name, (this.cfg.oCfg.init.tagch_msecwait == undefined)
            ? 10
            : this.cfg.oCfg.init.tagch_msecwait);
        if (this.hSys['sn.tagCh.doWait_Kidoku']) {
        }
    }
    runFirst_sys_an_auto_msecPageWait(name) {
        CmnLib_1.CmnLib.argChk_Num(this.hSys, name, (this.cfg.oCfg.init.auto_msecpagewait == undefined)
            ? 3500
            : this.cfg.oCfg.init.auto_msecpagewait);
    }
    runFirst_sys_an_auto_msecLineWait(name) {
        CmnLib_1.CmnLib.argChk_Num(this.hSys, name, 500);
    }
    runFirst_Bool_hSaveVal_true(name) {
        CmnLib_1.CmnLib.argChk_Boolean(this.hSave, name, true);
    }
    runFirst_Bool_hTmp_true(name) {
        CmnLib_1.CmnLib.argChk_Boolean(this.hTmp, name, true);
    }
    runFirst_Bool_hTmp_false(name) {
        CmnLib_1.CmnLib.argChk_Boolean(this.hTmp, name, false);
    }
}
exports.Variable = Variable;
;
//# sourceMappingURL=Variable.js.map