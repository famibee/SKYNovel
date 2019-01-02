//const StatsPlugin = require('stats-webpack-plugin');
	// npm i -D stats-webpack-plugin
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
	// npm i -D webpack-bundle-analyzer
	// 代替→ Webpack Visualizer https://chrisbateman.github.io/webpack-visualizer/

module.exports = [
	{
		entry: `./engine/tmp/app.js`,
		target: 'electron-renderer',
		output: {
			path: process.cwd() +'/app',
			filename: 'index.js',
//			chunkFilename: '[name].js'
		},
/*		// なぜか起動しなくなる
		optimization: {
			splitChunks: {
				cacheGroups: {
					three: {
						test: /node_modules\/three/,
						name: 'three',
						chunks: 'initial',
						enforce: true
					}
				}
			}
		}
*/
	},
	{
		entry: `./engine/tmp/web.js`,
		target: 'web',
		output: {
			path: process.cwd(),
			filename: 'web.js',
			chunkFilename: 'web.[name].js'
		},
		optimization: {	// この辺の変更は、startタスクから再起動が必要
			splitChunks: {
				cacheGroups: {
					three: {
						test: /node_modules\/three/,
						name: 'three',
						chunks: 'initial',
						enforce: true
					},
				}
			}
		},
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
