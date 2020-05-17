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
	entry: {app: ['./core/src/app'],},		// 「./」は必要
	target: 'electron-renderer',
	devtool: 'source-map',
}];
