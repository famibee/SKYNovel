const isDev = process.env.NODE_ENV === 'development';

const cfg = {
	resolve: {extensions: ['.ts', '.js'],},
	module: {rules: [{test: /\.ts$/, loader: 'ts-loader'},],},
	mode: isDev ?'development' :'production',
	output: {
		path: process.cwd(),
		filename: '[name].js',
//		library: 'SKYNovel',
//		libraryExport: '',
		libraryTarget: 'umd',
		globalObject: 'this',
	},
	devtool: isDev ?'inline-source-map' :false,
};

module.exports = [{
	...cfg,
	entry: {web: ['./core/src/web'],},		// 「./」は必要
	target: 'web',
},{
	...cfg,		// 開発中、npm watch ですぐビルドしてほしいので二番手に
	resolve: {extensions: ['.ts', '.js'], fallback: {
		stream: false,
		path: false,
		crypto: false,
	},},
	entry: {app: ['./core/src/app'],},		// 「./」は必要
	target: 'web',	// セキュリティ対策で 'electron-renderer' は使用しない
},{
	...cfg,
	entry: {appMain: ['./core/src/appMain'],},	// 「./」は必要
	target: 'electron-main',
},{
	...cfg,
	entry: {preload: ['./core/src/preload'],},	// 「./」は必要
	target: 'electron-preload',
	output: {path: cfg.output.path +'/core/lib/'},
}];
