// core/webpack.config.js に統合すると、
// 直接関係ない大量のコンパイルを待つことになるので別個とする
module.exports = {
	entry: `./docs/local_tst/web4webpack.js`,
	target: 'web',
	mode: 'development',
	output: {
		path: process.cwd() +'/docs',
		filename: 'index.js',
	},

	devServer: {
		static: {directory: './docs'},
		open: 'tag.htm#development=1',
		port: 8083,
	},
};
