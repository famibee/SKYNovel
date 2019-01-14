const ImageminPlugin = require('imagemin-webpack-plugin').default;

//const StatsPlugin = require('stats-webpack-plugin');
	// npm i -D stats-webpack-plugin
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
	// npm i -D webpack-bundle-analyzer
	// 代替→ Webpack Visualizer https://chrisbateman.github.io/webpack-visualizer/

// 変更後は「npm run webpack:dev」
module.exports = [
	{
		entry: `./core/tmp/app.js`,
		target: 'electron-renderer',
		output: {
			path: process.cwd() +'/app',
			filename: 'index.js',
		},
	},
	{
		entry: `./core/tmp/web.js`,
		target: 'web',
		output: {
			path: process.cwd() +'/web',
			filename: 'web.js',
			chunkFilename: 'web.[name].js'
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					three: {test: /three/, name: 'three', chunks: 'initial'},
				}
			}
		},
		plugins: [
/*
			new StatsPlugin('./core/tmp/stats.json', {
				chunkModules: true,
			}),
//			new BundleAnalyzerPlugin({statsFilename: './core/tmp/'}),
*/
			new ImageminPlugin({
				disable: process.env.NODE_ENV !== 'production',
				test: /\.(jpe?g|png|gif|svg)$/i,
				pngquant: {quality: '95-100',},
			}),
		],
	}
];
