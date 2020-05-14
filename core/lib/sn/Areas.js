"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Areas = void 0;
class Areas {
    constructor() {
        this.hAreas = {};
    }
    search(idx) {
        for (const begin in this.hAreas) {
            if (idx < parseInt(begin))
                continue;
            if (idx <= this.hAreas[begin])
                return true;
        }
        return false;
    }
    record(idx) {
        if (this.search(idx))
            return;
        for (const begin in this.hAreas) {
            if (this.hAreas[begin] + 1 == idx) {
                if ((idx + 1) in this.hAreas) {
                    this.hAreas[begin] = this.hAreas[idx + 1];
                    delete this.hAreas[idx + 1];
                }
                else {
                    this.hAreas[begin] = idx;
                }
                return;
            }
        }
        if ((idx + 1) in this.hAreas) {
            this.hAreas[idx] = this.hAreas[idx + 1];
            delete this.hAreas[idx + 1];
            return;
        }
        this.hAreas[idx] = idx;
    }
    erase(idx) {
        if (!this.search(idx))
            return;
        if (idx in this.hAreas) {
            if (this.hAreas[idx] > idx)
                this.hAreas[idx + 1] = this.hAreas[idx];
            delete this.hAreas[idx];
            return;
        }
        for (const begin in this.hAreas) {
            if (idx < parseInt(begin))
                continue;
            if (this.hAreas[begin] < idx)
                continue;
            if (this.hAreas[begin] == idx) {
                this.hAreas[begin] = idx - 1;
                return;
            }
            this.hAreas[idx + 1] = this.hAreas[begin];
            this.hAreas[begin] = idx - 1;
            return;
        }
    }
    get count() { return Object.keys(this.hAreas).length; }
    toString() {
        let ret = '';
        const aBegin = [];
        for (const begin in this.hAreas)
            aBegin.push(parseInt(begin));
        aBegin.sort(function (x, y) { return x - y; });
        for (const v of aBegin) {
            ret += ',' + v + (v == this.hAreas[v])
                ? ''
                : '~' + this.hAreas[v];
        }
        if (ret != '')
            ret = ret.substr(1);
        return ret;
    }
}
exports.Areas = Areas;
//# sourceMappingURL=Areas.js.map