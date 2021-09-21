// 変更後は「npm run webpack:dev」
const cfg = {
	resolve: {extensions: ['.ts', '.js'],},
	module: {rules: [{test: /\.ts$/, loader: 'ts-loader'},],},
	output: {
		path: process.cwd(),
		filename: '[name].js',
//		library: 'SKYNovel',
//		libraryExport: '',
		libraryTarget: 'umd',
		globalObject: 'this',
	},
	devtool: process.env.NODE_ENV === 'development' ?'inline-source-map' :false,
};

module.exports = [{
	...cfg,
	entry: {web: ['./core/src/web'],},		// 「./」は必要
	target: 'web',
	performance: {	// NOTE: できればimport()化で分割
		maxEntrypointSize: 1500 *1000,
		maxAssetSize: 1500 *1000,
	},
},{
	...cfg,		// 開発中、npm watch ですぐビルドしてほしいので二番手に
	resolve: {extensions: ['.ts', '.js'], fallback: {
		stream: false,
		path: false,
		crypto: false,
	},},
	entry: {app: ['./core/src/app'],},		// 「./」は必要
	target: 'web',	// セキュリティ対策で 'electron-renderer' は使用しない
	performance: {	// NOTE: できればimport()化で分割
		maxEntrypointSize: 1500 *1000,
		maxAssetSize: 1500 *1000,
	},
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
