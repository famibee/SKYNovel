/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

export type T_H_Areas = {[begin: string]: number};


export class Areas {
	#hAreas	: T_H_Areas	= {};

	clear() {this.#hAreas = {}}
	static	from(new_val: T_H_Areas): Areas {
		const ar = new Areas;
		ar.#hAreas = {...new_val};
		return ar;
	}
	val(): T_H_Areas {return {...this.#hAreas}}

	search(idx: number): boolean {
		return Object.entries(this.#hAreas)
		.some(([begin, v])=> idx >= parseInt(begin) && idx <= v);
	}

	record(idx: number): void {
		if (this.search(idx)) return;

		for (const [begin, v] of Object.entries(this.#hAreas)) {
			// 領域末尾+1とマッチ
			if (v +1 === idx) {
				if (String(idx +1) in this.#hAreas) {
					// 二つの領域がマージできる場合
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					this.#hAreas[begin] = this.#hAreas[idx +1]!;
					// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
					delete this.#hAreas[idx +1]
				}
				else this.#hAreas[begin] = idx;
				return;
			}
		}

		// 領域先頭-1とマッチ
		if (String(idx +1) in this.#hAreas) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			this.#hAreas[idx] = this.#hAreas[idx +1]!;
			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete this.#hAreas[idx +1];
			return;
		}

		this.#hAreas[idx] = idx;
	}

	erase(idx: number): void {
		if (! this.search(idx)) return;

		// 領域先頭とマッチ
		if (String(idx) in this.#hAreas) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			if (this.#hAreas[idx]! > idx) this.#hAreas[idx +1] = this.#hAreas[idx]!;
			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete this.#hAreas[idx];
			return;
		}

		for (const [begin, v] of Object.entries(this.#hAreas)) {
			if (idx < parseInt(begin) || v < idx) continue;

			// 領域末尾とマッチ
			if (this.#hAreas[begin] === idx) {
				this.#hAreas[begin] = idx -1;
				return;
			}

			// 領域内とマッチ、二つの領域に分割
			this.#hAreas[idx +1] = v;
			this.#hAreas[begin] = idx -1;
			return;
		}
	}

	get count(): number {return Object.keys(this.#hAreas).length}	// 4tst

	toString(): string {
		let ret = '';

		for (const k of Object.keys(this.#hAreas)
		.map(k=> parseInt(k))
		.sort((x, y)=> x-y)) {
			ret += k === this.#hAreas[k]
			? ','+ String(k)
			: ','+ String(k) +'~'+ String(this.#hAreas[String(k)]);
		}

		return ret;	// 先頭に , が付いている。削除したいが、修正すると互換性に問題あり凍結
	}

}
