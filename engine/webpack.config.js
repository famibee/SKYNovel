//const StatsPlugin = require('stats-webpack-plugin');
	// npm i -D stats-webpack-plugin
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
	// npm i -D webpack-bundle-analyzer

module.exports = [
	{
		entry: `./engine/tmp/app.js`,
		target: 'electron-renderer',
		output: {
			path: process.cwd() +'/app',
			filename: 'index.js'
		},
	},
	{
		entry: `./engine/tmp/web.js`,
		target: 'web',
		output: {
			path: process.cwd(),
			filename: 'web.js',
//			chunkFilename: '[name].chunk.js'
		},
/*
		optimization: {
			splitChunks: {
				chunks: 'all',
			}
		},
*/
/*
		plugins: [
			new StatsPlugin('./engine/tmp/stats.json', {
				chunkModules: true,
			}),
//			new BundleAnalyzerPlugin({statsFilename: './engine/tmp/'}),
		],
*/
	}
];
