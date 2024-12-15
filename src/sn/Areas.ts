/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {IAreas} from './CmnInterface';

export class Areas implements IAreas {
	hAreas	: {[name: string]: number}	= Object.create(null);

	clear() {this.hAreas = {}}

	search(idx: number): boolean {
		return Object.entries(this.hAreas)
		.some(([begin, v])=> (idx >= parseInt(begin) && idx <= v));
	}

	record(idx: number): void {
		if (this.search(idx)) return;

		for (const [begin, v] of Object.entries(this.hAreas)) {
			// 領域末尾+1とマッチ
			if (v +1 === idx) {
				if (String(idx +1) in this.hAreas) {
					// 二つの領域がマージできる場合
					this.hAreas[begin] = this.hAreas[idx +1]!;
					delete this.hAreas[idx +1]
				}
				else this.hAreas[begin] = idx;
				return;
			}
		}

		// 領域先頭-1とマッチ
		if (String(idx +1) in this.hAreas) {
			this.hAreas[idx] = this.hAreas[idx +1]!;
			delete this.hAreas[idx +1];
			return;
		}

		this.hAreas[idx] = idx;
	}

	erase(idx: number): void {
		if (! this.search(idx)) return;

		// 領域先頭とマッチ
		if (String(idx) in this.hAreas) {
			if (this.hAreas[idx]! > idx) this.hAreas[idx +1] = this.hAreas[idx]!;
			delete this.hAreas[idx];
			return;
		}

		for (const [begin, v] of Object.entries(this.hAreas)) {
			if (idx < parseInt(begin) || v < idx) continue;

			// 領域末尾とマッチ
			if (this.hAreas[begin] === idx) {
				this.hAreas[begin] = idx -1;
				return;
			}

			// 領域内とマッチ、二つの領域に分割
			this.hAreas[idx +1] = v;
			this.hAreas[begin] = idx -1;
			return;
		}
	}

	get count(): number {return Object.keys(this.hAreas).length}	// 4tst

	toString(): string {
		let ret = '';

		for (const k of Object.keys(this.hAreas)
		.map(k=> parseInt(k))
		.sort((x, y)=> x-y)) {
			ret += k === this.hAreas[k]
			? ','+ k
			: ','+ k +'~'+ this.hAreas[k];
		}

		return ret;	// 先頭に , が付いている。削除したいが、修正すると互換性に問題あり凍結
	}

}
