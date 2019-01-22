/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {IAreas} from './CmnInterface';

export class Areas implements IAreas {
	hAreas	: {[name: string]: number}	= {};

	search(idx: number): boolean {
		for (const begin in this.hAreas) {
			if (idx < parseInt(begin)) continue;

			if (idx <= this.hAreas[begin]) return true;
		}

		return false;
	}

	record(idx: number): void {
		if (this.search(idx)) return;

		for (const begin in this.hAreas) {
			// 領域末尾+1とマッチ
			if (this.hAreas[begin] +1 == idx) {
				if ((idx +1) in this.hAreas) {
					// 二つの領域がマージできる場合
					this.hAreas[begin] = this.hAreas[idx +1];
					delete this.hAreas[idx +1]
				}
				else {
					this.hAreas[begin] = idx;
				}
				return;
			}
		}

		// 領域先頭-1とマッチ
		if ((idx +1) in this.hAreas) {
			this.hAreas[idx] = this.hAreas[idx +1];
			delete this.hAreas[idx +1];
			return;
		}

		this.hAreas[idx] = idx;
	}

	erase(idx: number): void {
		if (! this.search(idx)) return;

		// 領域先頭とマッチ
		if (idx in this.hAreas) {
			if (this.hAreas[idx] > idx) this.hAreas[idx +1] = this.hAreas[idx];
			delete this.hAreas[idx];
			return;
		}

		for (const begin in this.hAreas) {
			if (idx < parseInt(begin)) continue;
			if (this.hAreas[begin] < idx) continue;

			// 領域末尾とマッチ
			if (this.hAreas[begin] == idx) {
				this.hAreas[begin] = idx -1;
				return;
			}

			// 領域内とマッチ、二つの領域に分割
			this.hAreas[idx +1] = this.hAreas[begin];
			this.hAreas[begin] = idx -1;
			return;
		}
	}

	get count(): number {return Object.keys(this.hAreas).length;}

	toString(): string {
		let ret = '';

		const aBegin: number[] = [];
		for (const begin in this.hAreas) aBegin.push(parseInt(begin));
		aBegin.sort(function (x: number, y: number): number {return x-y;});

		for (const v of aBegin) {
			ret += ','+ v + (v == this.hAreas[v])
				? ''
				: '~'+ this.hAreas[v];
		}

		if (ret != '') ret = ret.substr(1);

		return ret;
	}

}
