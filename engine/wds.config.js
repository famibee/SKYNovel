module.exports = {
	entry: `./engine/tmp/web.js`,	// メインとなるJavaScriptファイル（エントリーポイント）
	target: 'web',

	mode: 'development',

	output: {	// ファイルの出力設定
		path: process.cwd(),		//  出力ファイルのディレクトリ名
		filename: 'web.js',			// 出力ファイル名
	},

	devServer: {
		contentBase: './',
		open: true,
		headers: {
			// 'Access-Control-Allow-Origin': '*'	//--いまのとこ不要
		},
	},
};
