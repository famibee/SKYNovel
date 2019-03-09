module.exports = {
	entry: `./docs/local_tst/web4webpack.js`,
	target: 'web',
	mode: 'development',
	output: {
		path: process.cwd() +'/docs',
		filename: 'index.js',
	},

	devServer: {
		contentBase: './docs',
		port: 8082,
		openPage: 'tag.htm#development=1',
		watchContentBase: true,
		open: true
	},
};
