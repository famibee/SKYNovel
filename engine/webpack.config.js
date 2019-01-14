const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

//const StatsPlugin = require('stats-webpack-plugin');
	// npm i -D stats-webpack-plugin
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
	// npm i -D webpack-bundle-analyzer
	// 代替→ Webpack Visualizer https://chrisbateman.github.io/webpack-visualizer/

// 変更後は「npm run webpack:dev」
module.exports = [
	{
		entry: `./engine/tmp/app.js`,
		target: 'electron-renderer',
		output: {
			path: process.cwd() +'/app',
			filename: 'index.js',
		},
	},
	{
		entry: `./engine/tmp/web.js`,
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
		module: {
			rules: [
				{	// https://ics.media/entry/17376
					test: /\.css/,
					use: [
						'style-loader',
						{loader: 'css-loader', options: {url: false}},
					],
				},
//				{test: /\.css$/, use: ['css-loader']},
//x				{test: /\.css$/, loader: "style!css"},
//x				{test: /\.css$/, use: ['style-loader', 'css-loader']},
//				{test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'],},

			],
		},
		plugins: [
			new MiniCssExtractPlugin({filename: 'web.css'}),
/*
			new StatsPlugin('./engine/tmp/stats.json', {
				chunkModules: true,
			}),
//			new BundleAnalyzerPlugin({statsFilename: './engine/tmp/'}),
*/
			new ImageminPlugin({
				test: /\.(jpe?g|png|gif|svg)$/i,
				pngquant: {quality: '95-100',},
			}),
		],
	}
];
