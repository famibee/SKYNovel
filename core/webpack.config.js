const cfg = {
	resolve: {extensions: ['.ts', '.js'],},
	module: {rules: [{test: /\.ts$/, loader: 'ts-loader'},],},
	mode: 'development',
	output: {
		path: process.cwd(),
		filename: '[name].js',
		libraryTarget: 'umd',
	},
};

module.exports = [{
	...cfg,
	entry: {web: ['./core/src/web'],},		// 「./」は必要
	target: 'web',
},{
	...cfg,
	entry: {preload: ['./core/src/preload'],},	// 「./」は必要
	target: 'electron-renderer',
	output: {path: cfg.output.path +'/core/lib/'},
},{
	...cfg,
	entry: {appMain: ['./core/src/appMain'],},	// 「./」は必要
	target: 'electron-main',
},{
	...cfg,
	entry: {app: ['./core/src/app'],},		// 「./」は必要
	target: 'electron-renderer',
	devtool: 'inline-source-map',
/*	output: {
		...cfg.output,
//		libraryTarget: 'commonjs',
//		libraryTarget: 'amd',
//		globalObject: 'this',
	},*/
}];
