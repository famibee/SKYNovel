module.exports = [{
	entry: `./engine/tmp/app.js`,	// メインとなるJavaScriptファイル（エントリーポイント）
	target: 'electron-renderer',

	output: {	// ファイルの出力設定
		path: process.cwd() +'/app',//  出力ファイルのディレクトリ名
		filename: 'index.js'		// 出力ファイル名
	},
},
{
	entry: `./engine/tmp/web.js`,	// メインとなるJavaScriptファイル（エントリーポイント）
	target: 'web',

	output: {	// ファイルの出力設定
		path: process.cwd(),		//  出力ファイルのディレクトリ名
		filename: 'web.js'			// 出力ファイル名
	},
}];
