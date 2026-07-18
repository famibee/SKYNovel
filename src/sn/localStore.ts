// store.js互換の薄いlocalStorageラッパー（eval不使用・モダンブラウザ専用）
// store.jsは9年更新なし + json2.js内でeval使用のためeval警告が出るので置き換え。
// 単純なget/set（暗号化ケースはJSON文字列を渡すだけ）のみ対応。

export default {
	get(key: string): any {
		const raw = localStorage.getItem(key);
		if (raw == null) return undefined;
		try {
			return JSON.parse(raw);
		}
		catch {
			return undefined;
		}
	},
	set(key: string, value: unknown): void {
		localStorage.setItem(key, JSON.stringify(value));
	},
	remove(key: string): void {
		localStorage.removeItem(key);
	},
};
